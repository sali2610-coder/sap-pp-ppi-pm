// The canvas label floor (P0, 2026-10-01): on the ERD and the Architecture
// Studio every label that is DRAWN reads at 12px or more, at every camera the
// page arrives with, and every node a finger aims at is 44px or more where the
// geometry allows it.
//
// Per profile it opens the module map (/neo/erd/), one module (/neo/erd/#AUFK
// opens PM on AUFK), the studio (/neo/studio/) and a record's relation map
// (/neo/object/AUFK/), waits for the camera to settle and measures:
//   drawn      SVG/HTML labels that are visible (visibility visible, opacity
//              above .05 up the tree): their font size times the canvas scale
//   hidden     labels the level of detail is not drawing at this zoom
//   under12    drawn labels under 12px: must be 0
//   targets    node boxes on screen: the smallest height and how many are
//              under 44px
// One browser, one context, one page at a time.
//   NEO_BASE=http://localhost:4300 OUT=<json> node scripts/qa/erd-label-floor.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = process.env.NEO_BASE || "http://localhost:4300";
const OUT = process.env.OUT || "erd-label-floor.json";
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const PROFILES = [
  ["1440x900", { viewport: { width: 1440, height: 900 } }],
  ["1920x1080", { viewport: { width: 1920, height: 1080 } }],
  ["1280x800", { viewport: { width: 1280, height: 800 } }],
  ["682x468", { viewport: { width: 682, height: 468 } }],
  ["390-phone", { viewport: { width: 390, height: 844 }, userAgent: IPHONE, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
];
const ROUTES = ["/neo/erd/", "/neo/erd/#AUFK", "/neo/studio/", "/neo/object/AUFK/"];

const probe = () => {
  const shown = (el) => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === "none" || +cs.opacity <= 0.05) return false;
      if (n === el && cs.visibility !== "visible") return false;
    }
    return true;
  };
  const erd = document.querySelector(".ne-world");
  const out = { kind: erd ? "erd" : "studio", drawn: 0, hidden: 0, under12: 0, min: null, worst: [], targets: { n: 0, minH: null, under44: 0 }, lod: null, k: null };
  const eff = [];
  if (erd) {
    const st = document.querySelector(".ne-stage");
    out.lod = st?.dataset.lod ?? null;
    out.k = +(erd.getScreenCTM()?.a ?? 1).toFixed(3);
    for (const t of erd.querySelectorAll("text")) {
      const size = parseFloat(getComputedStyle(t).fontSize) * (t.getScreenCTM()?.a ?? 1);
      const r = t.getBoundingClientRect();
      if (!r.width || !(t.textContent || "").trim()) continue;
      if (!shown(t)) { out.hidden++; continue; }
      // on screen only: a label panned out of the stage is not being read
      const sr = st.getBoundingClientRect();
      if (r.right < sr.left || r.left > sr.right || r.bottom < sr.top || r.top > sr.bottom) continue;
      eff.push([size, t.getAttribute("class") || "text", (t.textContent || "").trim().slice(0, 24)]);
    }
    for (const g of erd.querySelectorAll(".ne-node .ne-node-r")) {
      const r = g.getBoundingClientRect(); const sr = st.getBoundingClientRect();
      if (!r.width || !r.height || !sr.width || !sr.height) continue; // a hidden canvas has no targets
      if (r.bottom < sr.top || r.top > sr.bottom || r.right < sr.left || r.left > sr.right) continue;
      out.targets.n++; const h = Math.min(r.height, r.width);
      out.targets.minH = out.targets.minH === null ? h : Math.min(out.targets.minH, h);
      if (h < 44) out.targets.under44++;
    }
  } else if (document.querySelector(".nol-stage svg")) {
    // the relation map: an SVG scaled to its box, text in viewBox units
    out.kind = "lanes";
    const svg = document.querySelector(".nol-stage svg");
    const k = svg.getScreenCTM()?.a ?? 1;
    out.k = +k.toFixed(3);
    for (const t of svg.querySelectorAll("text")) {
      const r = t.getBoundingClientRect();
      if (!r.width || !(t.textContent || "").trim()) continue;
      if (!shown(t)) { out.hidden++; continue; }
      eff.push([parseFloat(getComputedStyle(t).fontSize) * k, t.getAttribute("class") || "text", (t.textContent || "").trim().slice(0, 24)]);
    }
    for (const g of svg.querySelectorAll(".nol-n[role='button']")) {
      const r = (g.querySelector(".nol-hit") || g).getBoundingClientRect();
      out.targets.n++; const h = Math.min(r.height, r.width);
      out.targets.minH = out.targets.minH === null ? h : Math.min(out.targets.minH, h);
      if (h < 44) out.targets.under44++;
    }
  } else {
    const stage = document.querySelector(".nst-stage");
    if (!stage) return { kind: "none" };
    out.lod = stage.dataset.lod ?? null;
    const m = new DOMMatrix(getComputedStyle(stage).transform);
    out.k = +m.a.toFixed(3);
    const wrap = stage.parentElement.getBoundingClientRect();
    for (const t of stage.querySelectorAll(".nst-node b, .nst-node span")) {
      const r = t.getBoundingClientRect();
      if (!r.width || !(t.textContent || "").trim()) continue;
      if (!shown(t)) { out.hidden++; continue; }
      if (r.right < wrap.left || r.left > wrap.right || r.bottom < wrap.top || r.top > wrap.bottom) continue;
      eff.push([parseFloat(getComputedStyle(t).fontSize) * m.a, t.tagName.toLowerCase(), (t.textContent || "").trim().slice(0, 24)]);
    }
    for (const b of stage.querySelectorAll(".nst-node")) {
      const r = b.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.bottom < wrap.top || r.top > wrap.bottom || r.right < wrap.left || r.left > wrap.right) continue;
      out.targets.n++; const h = Math.min(r.height, r.width);
      out.targets.minH = out.targets.minH === null ? h : Math.min(out.targets.minH, h);
      if (h < 44) out.targets.under44++;
    }
  }
  out.drawn = eff.length;
  out.under12 = eff.filter((e) => e[0] < 11.95).length;
  out.min = eff.length ? +Math.min(...eff.map((e) => e[0])).toFixed(1) : null;
  out.worst = eff.sort((a, b) => a[0] - b[0]).slice(0, 4).map(([s, c, t]) => `${s.toFixed(1)}px ${c} "${t}"`);
  if (out.targets.minH !== null) out.targets.minH = +out.targets.minH.toFixed(1);
  return out;
};

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const rows = [];
for (const [name, opts] of PROFILES) {
  const ctx = await browser.newContext({ ...opts, locale: "he-IL", serviceWorkers: "block", reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      await page.goto(BASE + "/neo/", { waitUntil: "networkidle", timeout: 90000 });
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90000 });
      await page.waitForTimeout(2200);
      const m = await page.evaluate(probe);
      rows.push({ profile: name, route, ...m });
      console.log(`${name.padEnd(10)} ${route.padEnd(14)} k=${m.k} lod=${m.lod} drawn ${m.drawn} hidden ${m.hidden} under12 ${m.under12} min ${m.min}px · targets ${m.targets?.n} min ${m.targets?.minH}px under44 ${m.targets?.under44}`);
      // Beyond arrival (gate 7, round 3): focus mode on the deep link and the
      // studio presenting, the two states the arrival-only check missed.
      const state = name === "390-phone" ? null
        : route === "/neo/erd/#AUFK" ? ["focus", "סידור סביב הנבחרת"]
        : route === "/neo/studio/" ? ["present", /^מצב הצגה/] : null;
      if (state) {
        await page.getByRole("button", { name: state[1] }).first().click();
        await page.waitForTimeout(2200);
        const f = await page.evaluate(probe);
        rows.push({ profile: name, route: `${route} + ${state[0]}`, ...f });
        console.log(`${name.padEnd(10)} ${(route + " +" + state[0]).padEnd(14)} k=${f.k} lod=${f.lod} drawn ${f.drawn} hidden ${f.hidden} under12 ${f.under12} min ${f.min}px · targets ${f.targets?.n} min ${f.targets?.minH}px under44 ${f.targets?.under44}`);
      }
    } catch (e) {
      rows.push({ profile: name, route, fatal: String(e).slice(0, 160) });
      console.log(`${name} ${route} FATAL ${String(e).slice(0, 120)}`);
    }
  }
  await ctx.close();
}
await browser.close();
// A drawn label under 12px or a drawn target under 44px fails the run.
const fail = rows.filter((r) => r.fatal || r.under12 > 0 || (r.targets?.under44 || 0) > 0).length;
fs.writeFileSync(OUT, JSON.stringify({ base: BASE, at: new Date().toISOString(), rows }, null, 1));
console.log(`states with a drawn label under 12px or a target under 44px: ${fail}`);
process.exit(fail ? 1 : 0);
