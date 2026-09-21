// UX measurement at the design audit's window (1363x936) against a served out/.
// Per route: page and canvas horizontal overflow (with the widest offenders),
// content height, revealed elements still below full opacity although their
// top sits >=160px inside the viewport, the ERD/Studio zoom label, console
// errors, and a screenshot. Baseline: audit/ux-2026-09/before-measurements.json.
//   NEO_BASE=http://localhost:PORT OUT=<json> SHOTS=<dir> node scripts/qa/ux-measure.mjs
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const BASE = process.env.NEO_BASE, OUT = process.env.OUT, SHOTS = process.env.SHOTS;
mkdirSync(SHOTS, { recursive: true });
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROUTES = [
  ["home", "/neo/"], ["pm", "/neo/pm/"], ["pp-pi", "/neo/pp-pi/"],
  ["domains", "/neo/domain/"], ["domain-floc", "/neo/domain/pm-functional-locations/"],
  ["s4-center", "/neo/s4hana/"], ["readiness", "/neo/s4-readiness/"], ["cockpit", "/neo/migration-cockpit/"],
  ["erd", "/neo/erd/"], ["studio", "/neo/studio/"],
  ["tables", "/neo/tables/"], ["table-afko", "/neo/tables/AFKO/"], ["object-mara", "/neo/object/MARA/"],
  ["transactions", "/neo/transactions/"], ["bapis", "/neo/bapi/"], ["bapi-alm-conf", "/neo/bapi/BAPI_ALM_CONF_CREATE/"],
  ["idocs", "/neo/idoc/"], ["cds", "/neo/cds/"], ["fiori", "/neo/fiori-apps/"], ["enhancements", "/neo/enhancements/"],
  ["books", "/neo/books/"], ["reader", "/neo/read/book2/"], ["ask-library", "/neo/ai/"], ["chat", "/neo/chat/"],
  ["knowledge", "/neo/knowledge/"], ["academy", "/neo/academy/"], ["certification", "/neo/certification/"],
  ["incident-cogi", "/neo/incidents/cogi-stuck/"], ["centers", "/neo/centers/"], ["best-practices", "/neo/best-practices/"],
];
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 } });
const page = await ctx.newPage();
const errs = []; page.on("pageerror", (e) => errs.push(e.message)); page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
const results = [];
for (const [id, url] of ROUTES) {
  errs.length = 0;
  let status = 0;
  try { const r = await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 }); status = r ? r.status() : 0; } catch (e) { results.push({ id, url, error: e.message.slice(0, 120) }); continue; }
  await page.waitForTimeout(700);
  const m = await page.evaluate(() => {
    const doc = document.documentElement;
    const canvas = document.querySelector(".nx-canvas") || doc;
    const cb = canvas.getBoundingClientRect();
    const pageOverflow = doc.scrollWidth - doc.clientWidth;
    const canvasOverflow = canvas.scrollWidth - canvas.clientWidth;
    // offenders: elements whose box extends beyond the canvas box horizontally
    const off = [];
    const all = canvas.querySelectorAll("*");
    for (const el of all) {
      if (off.length > 400) break;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const over = Math.max(cb.left - r.left, r.right - cb.right);
      if (over > 2) {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") continue;
        off.push({ over: Math.round(over), w: Math.round(r.width), tag: el.tagName.toLowerCase(), cls: (el.className && typeof el.className === "string") ? el.className.split(" ").slice(0, 3).join(".") : "" });
      }
    }
    off.sort((a, b) => b.over - a.over);
    // low-opacity visible text
    const vh = window.innerHeight; let minOp = 1, dim = 0, sample = "";
    for (const el of document.querySelectorAll(".nm-rise, .nm-fade")) {
      const r = el.getBoundingClientRect();
      if (r.top < vh - 160 && r.bottom > 0 && (el.textContent || "").trim().length > 20) {
        const op = parseFloat(getComputedStyle(el).opacity);
        if (op < 0.98) { dim++; if (op < minOp) { minOp = op; sample = (el.className || "").toString().slice(0, 60) + " :: " + (el.textContent || "").trim().slice(0, 50); } }
      }
    }
    const zoomEl = [...document.querySelectorAll("button, span, output, div")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()));
    const h1 = document.querySelector("h1")?.textContent?.trim().slice(0, 60);
    return { h1, pageOverflow, canvasOverflow, canvasW: Math.round(cb.width), contentH: canvas.scrollHeight, offenders: off.slice(0, 4), dimVisible: dim, minVisibleOpacity: Math.round(minOp * 100) / 100, dimSample: sample, zoom: zoomEl ? zoomEl.textContent.trim() : null };
  });
  await page.screenshot({ path: path.join(SHOTS, `${id}.png`) });
  results.push({ id, url, status, consoleErrors: errs.length, ...m });
  console.log(`${id}: http=${status} pageOv=${m.pageOverflow} canvasOv=${m.canvasOverflow} canvasW=${m.canvasW} h=${m.contentH} dim=${m.dimVisible}(min ${m.minVisibleOpacity}) zoom=${m.zoom ?? "-"} errs=${errs.length}${m.offenders[0] ? " :: " + m.offenders[0].tag + "." + m.offenders[0].cls + " +" + m.offenders[0].over : ""}`);
}
await browser.close();
writeFileSync(OUT, JSON.stringify({ viewport: "1363x936", base: BASE, measuredAt: new Date().toISOString(), results }, null, 2));
