// Motion at rest (brief §16; P1 2026-10-01): two seconds after a page settles,
// nothing should still be animating forever. Lists every running animation
// with infinite iterations, per route, day theme, desktop and phone, and the
// same with prefers-reduced-motion (where nothing may run at all, finite or
// not, once the entrance is over). A loading indicator during real work is
// not "at rest" and is not on these routes. A scroll-driven animation (a
// reading-progress bar on a scroll timeline) moves only while the reader
// scrolls and reports position; it is listed apart as "scroll-linked", not as
// motion at rest.
//   NEO_BASE=http://localhost:4300 OUT=<json> [ROUTES=/a/,/b/] node scripts/qa/motion-rest-check.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.NEO_BASE || "http://localhost:4300";
const OUT = process.env.OUT || "motion-rest.json";
const ROUTES = (process.env.ROUTES || "/neo/,/neo/pm/,/neo/pp-pi/,/neo/tables/,/neo/tables/AFKO/,/neo/bapi/,/neo/transactions/,/neo/erd/,/neo/erd/#AUFK,/neo/studio/,/neo/object/AUFK/,/neo/read/book9/,/neo/books/,/neo/academy/,/neo/knowledge/,/neo/s4hana/,/neo/s4-readiness/,/neo/migration-cockpit/,/neo/ai/,/neo/centers/").split(",");
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const PROFILES = [
  ["desktop", { viewport: { width: 1440, height: 900 } }, "no-preference"],
  ["phone", { viewport: { width: 390, height: 844 }, userAgent: IPHONE, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }, "no-preference"],
  ["desktop-reduced", { viewport: { width: 1440, height: 900 } }, "reduce"],
];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const rows = [];
for (const [name, opts, rm] of PROFILES) {
  const ctx = await browser.newContext({ ...opts, locale: "he-IL", serviceWorkers: "block", reducedMotion: rm });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(2000);
      const m = await page.evaluate((reduced) => {
        const out = [];
        for (const a of document.getAnimations()) {
          if (a.playState !== "running") continue;
          const t = a.effect?.getComputedTiming?.();
          const forever = t && t.iterations === Infinity;
          const scrollLinked = !!a.timeline && /Scroll|View/.test(a.timeline.constructor?.name || "");
          if (!forever && !reduced) continue;
          const el = a.effect?.target;
          const who = el ? `${el.tagName?.toLowerCase()}.${String(el.className?.baseVal ?? el.className ?? "").split(" ")[0]}` : "?";
          out.push({ name: a.animationName || a.transitionProperty || a.constructor.name, who, forever: !!forever, scrollLinked });
        }
        return out;
      }, rm === "reduce");
      const moving = m.filter((x) => !x.scrollLinked), linked = m.filter((x) => x.scrollLinked);
      rows.push({ profile: name, route, running: moving, scrollLinked: linked });
      console.log(`${name.padEnd(16)} ${route.padEnd(28)} ${moving.length ? moving.map((x) => `${x.name}@${x.who}${x.forever ? "∞" : ""}`).join(", ") : "still"}${linked.length ? ` · scroll-linked: ${linked.map((x) => x.name).join(", ")}` : ""}`);
    } catch (e) {
      rows.push({ profile: name, route, fatal: String(e).slice(0, 160) });
      console.log(`${name} ${route} FATAL ${String(e).slice(0, 100)}`);
    }
  }
  await ctx.close();
}
await browser.close();
const bad = rows.filter((r) => r.fatal || (r.running && r.running.length)).length;
fs.writeFileSync(OUT, JSON.stringify({ base: BASE, at: new Date().toISOString(), rows }, null, 1));
console.log(`routes still moving at rest: ${bad}`);
process.exit(bad ? 1 : 0);
