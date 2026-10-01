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
  // THE PALETTE, where its entrance runs (gate 6, round 3, R3-3): opened with
  // Ctrl+K on the home page. Right after the key the entrance is recorded (it
  // must run, except under reduced motion); 600ms later, well past --dur-base,
  // nothing may still run on the panel and it must be fully opaque and
  // untransformed. The phone's panel is the sheet (nxc-in-up). Escape closes it.
  try {
    await page.goto(BASE + "/neo/", { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(500);
    await page.keyboard.press("Control+KeyK");
    await page.waitForSelector(".nxc-panel", { timeout: 5000 });
    const early = await page.evaluate(() => [...document.querySelector(".nxc-panel").getAnimations()].map((a) => a.animationName));
    await page.waitForTimeout(600);
    const pal = await page.evaluate(() => {
      const p = document.querySelector(".nxc-panel");
      const cs = getComputedStyle(p);
      return { anim: cs.animationName, running: p.getAnimations().filter((a) => a.playState === "running").map((a) => a.animationName), opacity: cs.opacity, transform: cs.transform };
    });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100);
    const closed = await page.evaluate(() => !document.querySelector(".nxc-panel"));
    const want = rm === "reduce" ? "none" : name === "phone" ? "nxc-in-up" : "nxc-in";
    const fails = [];
    if (pal.anim !== want) fails.push(`animation ${pal.anim}, expected ${want}`);
    if (rm === "reduce" ? early.length : !early.length) fails.push(`entrance on open: [${early.join(", ")}]`);
    if (pal.running.length) fails.push(`still running: ${pal.running.join(", ")}`);
    // A finished entrance with fill-mode "both" keeps its last keyframe, and
    // Chrome reports the interpolated `none` as the identity matrix: no
    // visible transform, so it counts as none.
    const still = pal.transform === "none" || /^matrix\(1, 0, 0, 1, 0, 0\)$/.test(pal.transform);
    if (pal.opacity !== "1" || !still) fails.push(`at rest opacity ${pal.opacity}, transform ${pal.transform}`);
    if (!closed) fails.push("Escape left the panel open");
    rows.push({ profile: name, route: "palette (Ctrl+K on /neo/)", palette: { early, ...pal, closed }, running: fails.map((f) => ({ name: f, who: "div.nxc-panel" })), scrollLinked: [] });
    console.log(`${name.padEnd(16)} ${"palette (Ctrl+K)".padEnd(28)} ${fails.length ? fails.join("; ") : `entrance [${early.join(", ") || "none"}] → still, opacity 1, no transform; Escape closes`}`);
  } catch (e) {
    rows.push({ profile: name, route: "palette (Ctrl+K on /neo/)", fatal: String(e).slice(0, 160) });
    console.log(`${name} palette FATAL ${String(e).slice(0, 100)}`);
  }
  await ctx.close();
}
await browser.close();
const bad = rows.filter((r) => r.fatal || (r.running && r.running.length)).length;
fs.writeFileSync(OUT, JSON.stringify({ base: BASE, at: new Date().toISOString(), rows }, null, 1));
console.log(`routes still moving at rest: ${bad}`);
process.exit(bad ? 1 : 0);
