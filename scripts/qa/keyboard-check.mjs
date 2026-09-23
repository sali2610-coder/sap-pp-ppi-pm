// Keyboard sweep: Tab through the first N stops of every tab-sweep route and
// flag focus that lands outside the viewport (an off-screen control), focus
// with no visible indicator (no style change between focused and blurred), and focus that
// stops moving (a trap). Routes are read from ux-measure.mjs.
//   NEO_BASE=http://localhost:4195 OUT=<json> [VW=1363] [UA=phone] [N=40] node scripts/qa/keyboard-check.mjs
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const BASE = process.env.NEO_BASE || "http://localhost:4195", OUT = process.env.OUT;
const VW = Number(process.env.VW || 1363), N = Number(process.env.N || 40);
const ROUTES = [...readFileSync(new URL("./ux-measure.mjs", import.meta.url), "utf8").matchAll(/"(\/neo\/[^"]*)"/g)].map((m) => m[1]);
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const ctx = await b.newContext({ viewport: { width: VW, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const results = [];
for (const url of ROUTES) {
  await p.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(500);
  const stops = [];
  let same = 0, prev = null;
  for (let i = 0; i < N; i++) {
    await p.keyboard.press("Tab");
    await p.waitForTimeout(40);
    const s = await p.evaluate(() => {
      const e = document.activeElement;
      if (!e || e === document.body) return null;
      const r = e.getBoundingClientRect();
      const inView = r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
      // A ring is a visible CHANGE on focus: compare the focused look with the
      // blurred one (a resting box-shadow is elevation, not an indicator).
      const look = () => { const c = getComputedStyle(e); return [c.outlineStyle, c.outlineWidth, c.outlineColor, c.boxShadow, c.backgroundColor, c.borderColor, c.textDecorationLine, c.color].join("|"); };
      const focused = look(); e.blur(); const blurred = look(); e.focus({ preventScroll: true });
      const ring = focused !== blurred;
      const label = (e.getAttribute("aria-label") || e.textContent || e.tagName).trim().replace(/\s+/g, " ").slice(0, 40);
      const key = e.tagName + "|" + label + "|" + Math.round(r.top) + "|" + Math.round(r.left);
      return { key, tag: e.tagName, label, inView, ring };
    });
    if (!s) continue;
    same = prev === s.key ? same + 1 : 0;
    prev = s.key;
    stops.push(s);
    if (same >= 3) break;
  }
  const offscreen = stops.filter((s) => !s.inView), noRing = stops.filter((s) => s.inView && !s.ring);
  results.push({ url, stops: stops.length, trapped: same >= 3, offscreen: offscreen.map((s) => `${s.tag} ${s.label}`), noRing: noRing.map((s) => `${s.tag} ${s.label}`) });
  console.log(url, stops.length, same >= 3 ? "TRAP" : "", offscreen.length ? `offscreen=${offscreen.length}` : "", noRing.length ? `noRing=${noRing.length}` : "");
}
if (OUT) writeFileSync(OUT, JSON.stringify({ viewport: VW, tabsPerRoute: N, results }, null, 1));
await b.close();
