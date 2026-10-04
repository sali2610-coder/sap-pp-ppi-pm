import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const source = readFileSync(new URL("../public/sw.js", import.meta.url), "utf8");
const origin = "https://sapbysali.app";
const response = (body: string, type: string, status = 200) =>
  new Response(body, { status, headers: { "Content-Type": type } });

function worker(network: () => Promise<Response>, denyStorage = false) {
  type RequestLike = { url: string; mode: string; method: string };
  type FetchEvent = {
    request: RequestLike;
    respondWith: (value: Promise<Response>) => void;
    waitUntil: (value: Promise<unknown>) => void;
  };
  const handlers = new Map<string, (event: FetchEvent) => void>();
  const entries = new Map<string, Response>();
  const key = (r: RequestLike | string) => typeof r === "string" ? new URL(r, origin).href : r.url;
  runInNewContext(source, {
    URL, Request, Response,
    self: { location: { origin }, addEventListener: (name: string, fn: (event: FetchEvent) => void) => handlers.set(name, fn) },
    fetch: network,
    caches: {
      match: async (r: RequestLike | string) => {
        if (denyStorage) throw new Error("Storage policy");
        return entries.get(key(r))?.clone();
      },
      open: async () => {
        if (denyStorage) throw new Error("Storage policy");
        return { put: async (r: RequestLike, value: Response) => { entries.set(key(r), value); } };
      },
    },
  });
  return {
    entries,
    async request(path: string, navigate = false) {
      let result: Promise<Response> | undefined;
      const pending: Promise<unknown>[] = [];
      handlers.get("fetch")!({
        request: { url: origin + path, method: "GET", mode: navigate ? "navigate" : "cors" },
        respondWith: (value) => { result = value; },
        waitUntil: (value) => { pending.push(value); },
      });
      const res = await result!;
      // Background refreshes may enqueue a cache write as they resolve.
      for (let i = 0; i < pending.length; i++) await pending[i];
      return res;
    },
  };
}

test("a transient JS error never becomes an immutable cached asset", async () => {
  let calls = 0;
  const w = worker(async () => ++calls === 1
    ? response("Unavailable", "text/plain", 503) : response("ok()", "application/javascript"));
  const path = "/_next/static/chunks/app.js";
  assert.equal((await w.request(path)).status, 503);
  assert.equal(w.entries.size, 0);
  assert.equal(await (await w.request(path)).text(), "ok()");
  assert.equal(w.entries.size, 1);
  await w.request(path);
  assert.equal(calls, 2);
});

test("previously cached HTTP errors and HTML in place of CSS/JS are ignored and repaired", async () => {
  for (const [path, type] of [["/_next/static/a.css", "text/css"], ["/_next/static/a.js", "text/javascript"]]) {
    for (const bad of [response("Error", "text/plain", 502), response("<h1>Sign in</h1>", "text/html")]) {
      const w = worker(async () => response("correct asset", type));
      w.entries.set(origin + path, bad);
      assert.equal(await (await w.request(path)).text(), "correct asset");
      assert.equal(await w.entries.get(origin + path)!.text(), "correct asset");
    }
  }
});

test("a 200 HTML intermediary page is not saved as CSS, JS, a font or an image", async () => {
  for (const path of ["/_next/static/a.css", "/_next/static/a.js", "/font.woff2", "/logo.png"]) {
    const w = worker(async () => response("<h1>Intermediary</h1>", "text/html; charset=utf-8"));
    await w.request(path);
    assert.equal(w.entries.size, 0, path);
  }
});

test("valid assets and visited HTML remain available offline", async () => {
  const w = worker(async () => { throw new Error("offline"); });
  w.entries.set(origin + "/_next/static/a.css", response("body{}", "text/css"));
  w.entries.set(origin + "/neo/", response("saved knowledge", "text/html"));
  w.entries.set(origin + "/offline/", response("offline shell", "text/html"));
  assert.equal(await (await w.request("/_next/static/a.css")).text(), "body{}");
  assert.equal(await (await w.request("/neo/", true)).text(), "saved knowledge");
  assert.equal(await (await w.request("/unvisited/", true)).text(), "offline shell");
  assert.equal(w.entries.size, 3);
});

test("a failed navigation does not replace good saved content or conceal a policy denial", async () => {
  const w = worker(async () => response("Denied", "text/html", 403));
  w.entries.set(origin + "/neo/", response("saved knowledge", "text/html"));
  assert.equal((await w.request("/neo/", true)).status, 403);
  assert.equal(await w.entries.get(origin + "/neo/")!.text(), "saved knowledge");
});

test("storage policy failures do not interrupt successful online responses", async () => {
  for (const [path, type, navigation] of [["/_next/static/a.css", "text/css", false], ["/neo/", "text/html", true]] as const) {
    const w = worker(async () => response("online", type), true);
    assert.equal(await (await w.request(path, navigation)).text(), "online");
  }
});

test("an uncached offline navigation always returns a response", async () => {
  const w = worker(async () => { throw new Error("offline"); }, true);
  assert.equal((await w.request("/neo/", true)).status, 503);
});

test("image revalidation completes without replacing a cached image with an error", async () => {
  const w = worker(async () => response("bad gateway", "text/html", 502));
  w.entries.set(origin + "/logo.png", response("image", "image/png"));
  assert.equal(await (await w.request("/logo.png")).text(), "image");
  assert.equal(await w.entries.get(origin + "/logo.png")!.text(), "image");
});
