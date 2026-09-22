// Design audit S4-3: identifiers, code and SQL stay LTR inside the Hebrew UI,
// and no blanket direction flip. This scans the audit's routes for visible
// elements whose own text is purely Latin/digits/punctuation (a SAP identifier,
// a code, a path) and that render in RTL direction without an LTR-isolating
// ancestor (dir="ltr", unicode-bidi isolate/plaintext/embed, or .nx-sap).
// Prints per-route counts and samples; exits 0 (a report, not a gate).
//   NEO_BASE=http://localhost:4195 OUT=<json> node scripts/qa/bidi-scan.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";
const base = process.env.NEO_BASE || "http://localhost:4195";
const OUT = process.env.OUT || "";
const ROUTES = ["/neo/", "/neo/pm/", "/neo/pp-pi/", "/neo/domain/", "/neo/domain/pm-functional-locations/", "/neo/s4hana/", "/neo/s4-readiness/", "/neo/migration-cockpit/", "/neo/erd/", "/neo/studio/", "/neo/tables/", "/neo/tables/AFKO/", "/neo/object/MARA/", "/neo/transactions/", "/neo/transactions/IP30/", "/neo/bapi/", "/neo/bapi/BAPI_ALM_CONF_CREATE/", "/neo/idoc/", "/neo/cds/", "/neo/fiori-apps/", "/neo/enhancements/", "/neo/books/", "/neo/read/book2/", "/neo/ai/", "/neo/chat/", "/neo/knowledge/", "/neo/knowledge/table/", "/neo/academy/", "/neo/certification/", "/neo/incidents/cogi-stuck/", "/neo/centers/", "/neo/best-practices/"];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
const report = [];
for (const url of ROUTES) {
  try { await page.goto(base + url, { waitUntil: "networkidle", timeout: 60000 }); } catch (e) { report.push({ url, error: e.message.slice(0, 80) }); continue; }
  await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    // text that reads as an identifier: Latin letters/digits/_ - / . : with at
    // least one letter and no Hebrew; mixed-script strings are excluded on
    // purpose (they are prose, and a blanket flip is what the audit forbids).
    const ID = /^[A-Za-z0-9_\-/.:()%+*#@ ·|→←›‹]{3,}$/;
    const HAS_LETTER = /[A-Za-z]/;
    const isolated = (el) => {
      for (let e = el; e && e !== document.body; e = e.parentElement) {
        if (e.getAttribute && e.getAttribute("dir") === "ltr") return true;
        if (e.classList && (e.classList.contains("nx-sap") || e.classList.contains("nb-sap"))) return true;
        const cs = getComputedStyle(e);
        if (cs.direction === "ltr") return true;
        if (/isolate|plaintext|embed|bidi-override/.test(cs.unicodeBidi)) return true;
        if (e.tagName === "CODE" || e.tagName === "PRE" || e.tagName === "KBD") return true;
      }
      return false;
    };
    const hits = []; let candidates = 0, nonIsolated = 0; const loose = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const t = (n.textContent || "").trim();
      if (!t || t.length < 3 || !ID.test(t) || !HAS_LETTER.test(t)) continue;
      const el = n.parentElement;
      if (!el) continue;
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (el.closest('[aria-hidden="true"], script, style, template')) continue;
      candidates++;
      if (isolated(el)) continue;
      nonIsolated++;
      if (loose.length < 8) loose.push({ t: t.slice(0, 40), cls: (el.className && typeof el.className === "string") ? el.className.split(" ").slice(0, 2).join(".") : el.tagName.toLowerCase() });
      // punctuation-free single tokens read the same in either direction; keep
      // only strings where order can visibly flip (a space, a slash, a dash, a
      // dot, a colon or a bracket inside them)
      if (!/[ \/\-.:()+·|→←›‹]/.test(t)) continue;
      const cls = (el.className && typeof el.className === "string") ? el.className.split(" ").slice(0, 2).join(".") : el.tagName.toLowerCase();
      hits.push({ t: t.slice(0, 40), cls });
    }
    return { hits, candidates, nonIsolated, loose };
  });
  const { candidates, nonIsolated, loose } = r; const hitsArr = r.hits;
  const byCls = {};
  for (const h of hitsArr) byCls[h.cls] = (byCls[h.cls] || 0) + 1;
  report.push({ url, candidates, nonIsolated, hits: hitsArr.length, byCls, samples: hitsArr.slice(0, 6), looseSamples: loose });
  console.log(`${url}: latin=${candidates} nonIsolated=${nonIsolated} orderSensitive=${hitsArr.length}${hitsArr.length ? "  :: " + Object.entries(byCls).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([k, v]) => `${k}×${v}`).join(", ") + "  e.g. " + hitsArr.slice(0, 2).map((x) => JSON.stringify(x.t)).join(" ") : nonIsolated ? "  e.g. " + loose.slice(0, 3).map((x) => JSON.stringify(x.t) + "@" + x.cls).join(" ") : ""}`);
}
await browser.close();
if (OUT) fs.writeFileSync(OUT, JSON.stringify({ base, scannedAt: new Date().toISOString(), report }, null, 2));
