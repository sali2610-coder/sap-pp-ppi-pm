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
// UA=phone: an iPhone, so the app serves its phone shell (it detects devices by
// user agent and pointer, not width); the header promised this, the code did not.
const PHONE = process.env.UA === "phone";
const ctx = await b.newContext(PHONE
  ? { viewport: { width: VW, height: 844 }, reducedMotion: "reduce", isMobile: true, hasTouch: true, deviceScaleFactor: 2,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1" }
  : { viewport: { width: VW, height: 900 }, reducedMotion: "reduce" });
const p = await ctx.newPage();
const results = [];
for (const url of ROUTES) {
  await p.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 });
  // End states only: a focus indicator that fades in (the rail's ::before, 160ms)
  // read 40ms after Tab was still transparent and counted as "no ring".
  await p.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
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
      // The indicator may be drawn by a pseudo-element (the rail items' ring is
      // on ::before), so their look counts too.
      const pseudo = (ps) => { const c = getComputedStyle(e, ps); return [c.content, c.opacity, c.boxShadow, c.outlineStyle, c.backgroundColor].join("|"); };
      // …and so may the wrapper (a search input rings its field box through
      // :focus-within), a direct child (the home search button rings its field
      // box, its second child) or an SVG node's first rect (the object graph's nodes).
      const box = (el) => { if (!el) return ""; const c = getComputedStyle(el); return [c.outlineStyle, c.boxShadow, c.borderColor, c.stroke, c.strokeWidth].join("|"); };
      const look = () => { const c = getComputedStyle(e); return [c.outlineStyle, c.outlineWidth, c.outlineColor, c.boxShadow, c.backgroundColor, c.borderColor, c.textDecorationLine, c.color, pseudo("::before"), pseudo("::after"), box(e.parentElement), ...[...e.children].slice(0, 6).map(box), box(e.querySelector("rect"))].join("|"); };
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
