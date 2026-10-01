// vercel.json is validated by Vercel before anything builds: a redirect with a
// property Vercel does not know fails the deployment at creation. A compiled-
// pattern cache (`_c`) once leaked into 50 rules and the Preview failed in the
// same second it was created (2026-10-01). This pins the file's shape.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const vercel = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const REDIRECT_KEYS = new Set(["source", "destination", "permanent", "statusCode", "has", "missing"]);

test("every redirect carries only the fields Vercel accepts", () => {
  const bad = (vercel.redirects as Record<string, unknown>[]).flatMap((r, i) =>
    Object.keys(r).filter((k) => !REDIRECT_KEYS.has(k)).map((k) => `redirects[${i}].${k}`));
  assert.deepEqual(bad, []);
});

test("every redirect has a string source starting with / and a string destination", () => {
  for (const r of vercel.redirects as { source: unknown; destination: unknown }[]) {
    assert.equal(typeof r.source, "string");
    assert.ok((r.source as string).startsWith("/"), `source ${String(r.source)}`);
    assert.equal(typeof r.destination, "string");
  }
});

test("the redirect list stays under Vercel's 2,048-route limit", () => {
  assert.ok(vercel.redirects.length < 2048, `${vercel.redirects.length} redirects`);
});
