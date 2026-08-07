// Does the platform reader actually RENDER? (phases 4-6 gate)
//
// Everything about the reader was verified structurally — routes emit, shards
// resolve, 4,314/4,314 sections have content — but the reader loads its prose
// client-side, so none of that proves a single word reaches the screen. This
// drives the real exported build in a real browser and asserts on what painted.
//
// Uses the system Chrome through playwright-core, so no browser is downloaded
// and nothing but a ~2 MB library is added to the repo.
//
// Usage: node scripts/verify-reader.mjs [--shots]
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const SHOTS = path.join(ROOT, "screenshots");
const PORT = 4178;
const WANT_SHOTS = process.argv.includes("--shots");

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
].find((p) => existsSync(p));

if (!existsSync(OUT)) { console.error("out/ missing — run `npm run build` first"); process.exit(1); }
if (!CHROME) { console.error("no system Chrome found"); process.exit(1); }

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".ico": "image/x-icon", ".webp": "image/webp", ".jpg": "image/jpeg" };

// Mirrors the host's trailing-slash routing: /a/b/ serves out/a/b/index.html.
const server = createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    let file = path.join(OUT, url);
    if (url.endsWith("/")) file = path.join(file, "index.html");
    if (!existsSync(file)) file = path.join(OUT, url, "index.html");
    if (!existsSync(file)) { res.writeHead(404).end("not found"); return; }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(500).end("error"); }
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch({ executablePath: CHROME });
const results = [];
const fail = (name, detail) => results.push({ ok: false, name, detail });
const pass = (name, detail = "") => results.push({ ok: true, name, detail });

async function check(page, name, fn) {
  try { const d = await fn(); d === false ? fail(name, "assertion false") : pass(name, typeof d === "string" ? d : ""); }
  catch (e) { fail(name, String(e.message).slice(0, 90)); }
}

/**
 * The shell picks its layout from `data-device`, which lib/device.ts derives
 * from the USER AGENT — not from viewport width. Resizing alone therefore keeps
 * the desktop shell and produces a squeezed 118px column that looks like a
 * broken mobile layout but is only a broken test. Each profile carries a real
 * device UA so the shell resolves the way it does on the actual hardware.
 */
const UA = {
  phone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  tablet: "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
};

const VIEWPORTS = [
  { label: "desktop", width: 1440, height: 900, expect: "desktop" },
  { label: "tablet", width: 834, height: 1112, touch: true, ua: UA.tablet, expect: "tablet" },
  { label: "mobile", width: 390, height: 844, touch: true, ua: UA.phone, expect: "phone" },
];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    locale: "he-IL",
    hasTouch: Boolean(vp.touch),
    isMobile: Boolean(vp.touch),
    deviceScaleFactor: vp.touch ? 3 : 1,
    ...(vp.ua ? { userAgent: vp.ua } : {}),
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 120)));

  for (const book of ["book1", "book8"]) {
    const url = `http://localhost:${PORT}/library/${book}/`;
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });

    await check(page, `${vp.label}/${book}: shell resolved to ${vp.expect}`, async () => {
      const d = await page.evaluate(() => document.documentElement.getAttribute("data-device"));
      return d === vp.expect ? "" : `got ${d}`;
    });

    await check(page, `${vp.label}/${book}: main fills the viewport`, async () => {
      const { main, win } = await page.evaluate(() => ({
        main: Math.round(document.querySelector("main")?.getBoundingClientRect().width ?? 0),
        win: window.innerWidth,
      }));
      // Desktop keeps a sidebar; touch layouts must use the full width.
      const ok = vp.expect === "desktop" ? main > win * 0.6 : main > win * 0.9;
      return ok ? `${main}px of ${win}px` : `${main}px of ${win}px`;
    });

    await check(page, `${vp.label}/${book}: chapter nav rendered`, async () =>
      (await page.locator('nav[aria-label="פרקי הספר"] button').count()) > 0);

    await check(page, `${vp.label}/${book}: sections rendered`, async () => {
      const n = await page.locator('article[id^="s-"]').count();
      return n > 0 ? `${n} sections` : false;
    });

    // The point of the whole exercise: prose is fetched, so this is the only
    // assertion that proves the shard actually reached the screen.
    await check(page, `${vp.label}/${book}: CONTENT painted (not just headings)`, async () => {
      const txt = await page.locator("article").first().innerText();
      const empty = txt.includes("אין תוכן מורחב לסעיף זה");
      return !empty && txt.trim().length > 80 ? `${txt.trim().length} chars` : false;
    });

    if (book === "book8") {
      // book8 is the only academy-format book; nothing else exercises facets.
      await check(page, `${vp.label}/book8: academy facets rendered`, async () => {
        const heads = await page.locator("article h4").allInnerTexts();
        const known = heads.filter((h) => /תקציר מנהלים|זווית היועץ|למתחילים|מטרה|תרחיש/.test(h));
        return known.length > 0 ? known.slice(0, 3).join(", ") : false;
      });

      // Nine of the fourteen facets are LISTS holding about half of book8's
      // content. Asserting only on the prose facets is what let a 307k-character
      // drop pass as "100% coverage".
      await check(page, `${vp.label}/book8: list facets rendered`, async () => {
        const heads = await page.locator("article h4").allInnerTexts();
        const listy = heads.filter((h) => /טעויות נפוצות|שאלות ראיון|קונפיגורציה|נתוני-אב|ניווט|שיטות עבודה/.test(h));
        const items = await page.locator("article h4 + ul li").count();
        return listy.length > 0 && items > 0 ? `${listy.length} list facets, ${items} items` : false;
      });
    }

    // The assertion that caught `delay={120}`: content can be present, correct
    // and completely invisible. Structural checks cannot see this.
    await check(page, `${vp.label}/${book}: nothing in view is invisible`, async () => {
      const n = await page.evaluate(() => [...document.querySelectorAll("div")].filter((e) => {
        const r = e.getBoundingClientRect();
        return parseFloat(getComputedStyle(e).opacity) === 0 && r.height > 5
          && r.top < window.innerHeight && r.top > -50;
      }).length);
      return n === 0 ? "" : false;
    });

    await check(page, `${vp.label}/${book}: no horizontal overflow`, async () => {
      const over = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      return over <= 2 ? "" : false;
    });

    if (WANT_SHOTS) {
      await mkdir(SHOTS, { recursive: true });
      await page.screenshot({ path: path.join(SHOTS, `reader-${book}-${vp.label}.png`), fullPage: false });
    }
  }

  // The AI chat, at every viewport — the other surface never screenshotted.
  await page.goto(`http://localhost:${PORT}/ai/`, { waitUntil: "networkidle", timeout: 30_000 });
  await check(page, `${vp.label}/ai: composer present`, async () =>
    (await page.locator("textarea, input[type=text]").count()) > 0);
  await check(page, `${vp.label}/ai: no horizontal overflow`, async () => {
    const over = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    return over <= 2 ? "" : false;
  });
  if (WANT_SHOTS) {
    await mkdir(SHOTS, { recursive: true });
    await page.screenshot({ path: path.join(SHOTS, `ai-${vp.label}.png`), fullPage: false });
  }

  if (errors.length) fail(`${vp.label}: no uncaught page errors`, errors.slice(0, 2).join(" | "));
  else pass(`${vp.label}: no uncaught page errors`);

  await ctx.close();
}

await browser.close();
server.close();

console.log(`\nPLATFORM READER — RENDER VERIFICATION\n${"─".repeat(72)}`);
for (const r of results) console.log(`  ${r.ok ? "ok  " : "FAIL"} ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
const failed = results.filter((r) => !r.ok);
console.log("─".repeat(72));
console.log(`  ${results.length - failed.length}/${results.length} passed`);
if (WANT_SHOTS) console.log(`  screenshots -> screenshots/`);
process.exit(failed.length ? 1 : 0);
