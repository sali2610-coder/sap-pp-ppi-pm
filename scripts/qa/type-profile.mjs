// Design audit S4-1: what sizes does a screen really render? For each audited
// route: the h1 (px + class), the body size that carries most of the visible
// prose (weighted by character count over p/li/td/dd/span blocks with >= 40
// characters), the share of prose characters rendered below 13px, and the
// smallest size any >= 20-character text is set in. Prints a table; OUT=json.
//   NEO_BASE=http://localhost:4195 OUT=<json> node scripts/qa/type-profile.mjs
import { chromium } from "playwright-core";
import fs from "node:fs";
const base = process.env.NEO_BASE || "http://localhost:4195";
const OUT = process.env.OUT || "";
const VW = Number(process.env.VW || 1363);
const ROUTES = ["/neo/", "/neo/pm/", "/neo/pp-pi/", "/neo/domain-model/", "/neo/domain/pm-functional-locations/", "/neo/s4hana/", "/neo/s4-readiness/", "/neo/migration-cockpit/", "/neo/erd/", "/neo/studio/", "/neo/tables/", "/neo/tables/AFKO/", "/neo/object/MARA/", "/neo/transactions/", "/neo/transactions/IP30/", "/neo/bapi/", "/neo/bapi/BAPI_ALM_CONF_CREATE/", "/neo/idoc/", "/neo/cds/", "/neo/fiori-apps/", "/neo/enhancements/", "/neo/books/", "/neo/read/book2/", "/neo/ai/", "/neo/chat/", "/neo/knowledge/", "/neo/academy/", "/neo/certification/", "/neo/incidents/cogi-stuck/", "/neo/centers/", "/neo/best-practices/"];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: VW, height: 936 } });
const rows = [];
for (const url of ROUTES) {
  try { await page.goto(base + url, { waitUntil: "networkidle", timeout: 60000 }); } catch (e) { rows.push({ url, error: e.message.slice(0, 60) }); continue; }
  await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const vis = (el) => { const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden") return false; const b = el.getBoundingClientRect(); return b.width > 0 && b.height > 0; };
    const h1 = document.querySelector("h1");
    const h1px = h1 ? parseFloat(getComputedStyle(h1).fontSize) : null;
    const h1cls = h1 ? (h1.className || "").toString().split(" ").slice(0, 2).join(".") : null;
    const buckets = new Map(); let total = 0, small = 0, min = 99; const smallCls = new Map();
    for (const el of document.querySelectorAll("p, li, td, dd, dt, span, em, b, a, summary, label, figcaption, blockquote")) {
      if (!vis(el)) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      // own text only (direct text nodes), so nested spans are not counted twice
      let own = ""; for (const n of el.childNodes) if (n.nodeType === 3) own += n.textContent;
      own = own.replace(/\s+/g, " ").trim();
      if (own.length < 20) continue;
      const px = Math.round(parseFloat(getComputedStyle(el).fontSize) * 10) / 10;
      buckets.set(px, (buckets.get(px) || 0) + own.length);
      total += own.length; if (px < min) min = px;
      if (px < 13) { small += own.length; const c = (el.className || "").toString().split(" ").slice(0, 2).join(".") || el.tagName.toLowerCase(); smallCls.set(c, (smallCls.get(c) || 0) + own.length); }
    }
    const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]);
    const smallTop = [...smallCls.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([c, n]) => `${c}(${n})`).join(" ");
    return { h1px, h1cls, smallTop, body: sorted[0]?.[0] ?? null, bodyShare: total ? Math.round((sorted[0][1] / total) * 100) : 0, small: total ? Math.round((small / total) * 100) : 0, min: min === 99 ? null : min, dist: sorted.slice(0, 4).map(([px, n]) => `${px}:${Math.round((n / total) * 100)}%`).join(" ") };
  });
  rows.push({ url, ...r });
  console.log(`${url.padEnd(40)} h1=${r.h1px}px(${r.h1cls})  body=${r.body}px(${r.bodyShare}%)  <13px:${r.small}%  min=${r.min}px  ${r.dist}  small: ${r.smallTop}`);
}
await browser.close();
if (OUT) fs.writeFileSync(OUT, JSON.stringify({ base, viewport: VW, measuredAt: new Date().toISOString(), rows }, null, 2));
