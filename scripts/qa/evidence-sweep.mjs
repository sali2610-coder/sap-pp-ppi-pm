// Evidence-block browser sweep. Needs out/ built + `python3 scripts/serve-out.py` (:4173).
//   node scripts/qa/evidence-sweep.mjs [outDir]
// Renders representative detail pages per catalog at desktop light/dark and phone
// dark, asserts 0 console errors, 0 horizontal overflow, the evidence block
// present, and screenshots into <outDir> (default: scratchpad/shots/evidence).
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const BASE = process.env.NEO_BASE || "http://localhost:4173";
const OUT = process.argv[2] || path.join(process.env.SCRATCH || ".", "shots", "evidence");
mkdirSync(OUT, { recursive: true });
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";

const ROUTES = [
  ["table-marc", "/neo/tables/MARC/"],
  ["table-mseg", "/neo/tables/MSEG/"],
  ["object-aufk", "/neo/object/AUFK/"],
  ["tx-mb01", "/neo/transactions/MB01/"],
  ["tx-iw31", "/neo/transactions/IW31/"],
  ["fm-alm-order", "/neo/bapi/BAPI_ALM_ORDER_MAINTAIN/"],
  ["idoc-matmas", "/neo/idoc/MATMAS/"],
  ["cds-matdocitem", "/neo/cds/I_MaterialDocumentItem/"],
  ["cds-prodorder", "/neo/cds/I_ProductionOrder/"],
  ["fiori-f2731", "/neo/fiori-apps/manage-maintenance-orders/"],
  ["enh-customer-exit", "/neo/enhancements/customer-exit/"],
  ["bp-catalog", "/neo/best-practices/"],
  ["bp-commit", "/neo/best-practices/bapi-commit-discipline/"],
];
const PROFILES = [
  ["desktop", { width: 1440, height: 900 }, null, "dark"],
  ["desktop-light", { width: 1440, height: 900 }, null, "light"],
  ["phone", { width: 390, height: 844 }, IPHONE, "dark"],
];

let fails = 0;
const note = (ok, msg) => { if (!ok) fails++; console.log(`${ok ? "PASS" : "FAIL"} ${msg}`); };
const browser = await chromium.launch({ executablePath: CHROME, headless: true });
for (const [prof, vp, ua, theme] of PROFILES) {
  const ctx = await browser.newContext({ viewport: vp, userAgent: ua || undefined, hasTouch: !!ua, isMobile: !!ua });
  await ctx.addInitScript((t) => { try { localStorage.setItem("neo:theme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  for (const [id, url] of ROUTES) {
    errs.length = 0;
    let status = 0;
    try {
      const resp = await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 45000 });
      status = resp ? resp.status() : 0;
    } catch (e) { note(false, `${id} ${prof} goto ${e.message.slice(0, 80)}`); continue; }
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      const doc = document.documentElement;
      const ev = document.querySelector('[aria-label="אימות ומקורות"]');
      if (ev) ev.scrollIntoView({ block: "center" });
      const pill = ev ? (ev.querySelector(".nev-status, [data-status]")?.textContent || "").trim().slice(0, 40) : "";
      return { overflow: doc.scrollWidth - doc.clientWidth, hasBlock: !!ev, pill, h1: document.querySelector("h1")?.textContent?.trim().slice(0, 50) };
    });
    await page.waitForTimeout(200);
    const expectBlock = !id.startsWith("bp-catalog");
    const ok = status === 200 && errs.length === 0 && r.overflow <= 1 && (!expectBlock || r.hasBlock);
    note(ok, `${id} ${prof} http=${status} block=${r.hasBlock} overflow=${r.overflow} errs=${errs.length} h1="${r.h1}"${r.pill ? " pill=" + r.pill : ""}${errs[0] ? " :: " + errs[0].slice(0, 100) : ""}`);
    await page.screenshot({ path: path.join(OUT, `${id}-${prof}.png`) });
  }
  await ctx.close();
}
await browser.close();
console.log(fails === 0 ? "ALL PASS" : `${fails} FAILURES`);
process.exit(fails === 0 ? 0 : 1);
