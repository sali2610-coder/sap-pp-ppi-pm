// Clipping check, stricter than overflow. An element that reaches past the
// canvas edge and is not inside a horizontal scroller is either overflowing
// (ux-measure.mjs counts that) or cut off by an overflow:hidden ancestor, which
// no overflow metric sees. Skipped: visually hidden content (the sr-only
// pattern) and aria-hidden decoration, whose bleed is by design (the home
// hero's network layer, the workspace light), and the Architecture Studio's
// pan/zoom canvas, which clips nodes by design until the reader pans (the
// keyboard sweep found no off-screen focus there). Routes default to the
// ux-measure.mjs list, read from that file so the two can never drift, and are
// never passed through a shell variable.
//   NEO_BASE=http://localhost:4195 OUT=<json> VW=320 UA=phone [ROUTES_FILE=<one route per line>] node scripts/qa/clip-check.mjs [route ...]
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const BASE = process.env.NEO_BASE || "http://localhost:4195", OUT = process.env.OUT;
const VW = Number(process.env.VW || 1363);
const ROUTES = process.env.ROUTES_FILE ? readFileSync(process.env.ROUTES_FILE, "utf8").split("\n").map((l) => l.trim()).filter(Boolean).map((r) => r.split("/").map(encodeURIComponent).join("/"))
  : process.argv.length > 2 ? process.argv.slice(2)
  : [...readFileSync(new URL("./ux-measure.mjs", import.meta.url), "utf8").matchAll(/"(\/neo\/[^"]*)"/g)].map((m) => m[1]);
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await b.newContext({
  viewport: { width: VW, height: 900 }, reducedMotion: "reduce",
  ...(process.env.UA === "phone" ? { userAgent: PHONE_UA, isMobile: true, hasTouch: true } : {}),
});
if (process.env.THEME === "dark") await ctx.addInitScript(() => { try { localStorage.setItem("neo:theme", "dark"); } catch {} });
const p = await ctx.newPage();
const results = [];
for (const url of ROUTES) {
  const r = await p.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(600);
  const clipped = await p.evaluate(() => {
    const canvas = document.querySelector(".nx-canvas") || document.documentElement;
    const cb = canvas.getBoundingClientRect();
    const hidden = (el) => { if (el.closest('[aria-hidden="true"], .nst-canvas')) return true; for (let a = el; a; a = a.parentElement) { const s = getComputedStyle(a); if ((s.clipPath !== "none" || s.clip !== "auto") && a.getBoundingClientRect().width <= 1) return true; } return false; };
    const name = (el) => (typeof el.className === "string" && el.className ? el.className.split(" ")[0] : el.tagName);
    const out = {};
    for (const el of canvas.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (!r.width || Math.max(cb.left - r.left, r.right - cb.right) < 2 || hidden(el)) continue;
      let how = "OVERFLOW";
      for (let a = el.parentElement; a && a !== canvas.parentElement; a = a.parentElement) {
        const s = getComputedStyle(a);
        if (/(auto|scroll)/.test(s.overflowX)) { how = null; break; }
        if (/(hidden|clip)/.test(s.overflowX)) { const ar = a.getBoundingClientRect(); if (ar.right <= cb.right + 1 && ar.left >= cb.left - 1) { how = "CLIPPED-by:" + name(a); break; } }
      }
      if (how) { const k = how + " " + name(el); out[k] = (out[k] || 0) + 1; }
    }
    return out;
  });
  const n = Object.values(clipped).reduce((a, c) => a + c, 0);
  results.push({ url, status: r ? r.status() : 0, clipped: n, sample: clipped });
  console.log(url, r ? r.status() : 0, n ? JSON.stringify(clipped) : "0");
}
if (OUT) writeFileSync(OUT, JSON.stringify({ viewport: VW, ua: process.env.UA || "desktop", routes: results.length, results }, null, 1));
await b.close();
