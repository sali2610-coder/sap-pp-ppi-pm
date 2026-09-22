// Round 6 checks for design audit S7-CAT-2/3/5/6/7 and S7-TBL-1/4, against a
// served out/ at 1363x936. Prints JSON, exits 1 on a failure.
//   NEO_BASE=http://localhost:4195 SHOTS=<dir> node scripts/qa/catalog-cards-check.mjs
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
const base = process.env.NEO_BASE || "http://localhost:4195";
const SHOTS = process.env.SHOTS || ""; if (SHOTS) mkdirSync(SHOTS, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
const shot = async (n) => { if (SHOTS) await page.screenshot({ path: `${SHOTS}/${n}.png` }); };
const out = {};
// CAT-2 · transaction rows: status + depth + at most one topic + fiori door; no reference-count chip
await page.goto(base + "/neo/transactions/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
out.cat2 = await page.evaluate(() => { const rows = [...document.querySelectorAll(".nxd-row")].slice(0, 30); const chips = rows.map((r) => r.querySelectorAll(".nxd-nums .nu-chip").length); return { rows: rows.length, maxChips: Math.max(...chips), avgChips: Math.round(chips.reduce((a, b) => a + b, 0) / chips.length * 10) / 10, statusPills: rows.filter((r) => r.querySelector(".nxd-nums .nu-status[data-status]")).length, popChip: rows.some((r) => /הפניות מתוך המאגר/.test(r.textContent)) }; });
out.cat2.ok = out.cat2.rows > 0 && out.cat2.maxChips <= 2 && !out.cat2.popChip && out.cat2.statusPills === out.cat2.rows;
await page.locator(".nxd-row").first().scrollIntoViewIfNeeded(); await shot("cat2-tx-rows");
// CAT-3 · function rows: operation chip and COMMIT chip where the record states it
await page.goto(base + "/neo/bapi/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
out.cat3 = await page.evaluate(() => { const rows = [...document.querySelectorAll(".nxr-row")]; const withOp = rows.filter((r) => [...r.querySelectorAll(".nxd-nums .nu-chip")].some((c) => /סוג פעולה/.test(c.textContent))).length; const withCommit = rows.filter((r) => /דורש COMMIT/.test(r.textContent)).length; const sample = rows.find((r) => /דורש COMMIT/.test(r.textContent)); return { rows: rows.length, withOp, withCommit, sample: sample ? [...sample.querySelectorAll(".nxd-nums .nu-chip")].map((c) => c.textContent.trim()).join(" | ") : null }; });
out.cat3.ok = out.cat3.withOp > 0 && out.cat3.withCommit > 0;
await shot("cat3-bapi-rows");
// CAT-6 · Fiori rows lead with the business action; the page title is the name
await page.goto(base + "/neo/fiori-apps/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
out.cat6 = await page.evaluate(() => { const rows = [...document.querySelectorAll(".nxr-row")]; const lead = rows.filter((r) => r.querySelector(".nxd-id[data-lead='name'] .nxd-lead")).length; const first = rows[0]; return { rows: rows.length, leadRows: lead, first: first ? { lead: first.querySelector(".nxd-lead")?.textContent, code: first.querySelector(".nxd-mods .is-sap")?.textContent, body: first.querySelector(".nxd-he")?.textContent, href: first.getAttribute("href") } : null }; });
await shot("cat6-fiori-rows");
if (out.cat6.first?.href) { await page.goto(base + out.cat6.first.href, { waitUntil: "networkidle" }); await page.waitForTimeout(400); out.cat6.detail = await page.evaluate(() => ({ h1: document.querySelector("h1.nxt-lead")?.textContent, code: document.querySelector(".nxt-code--sub")?.textContent, copy: !!document.querySelector(".nxt-codeline .nx-copy") })); await shot("cat6-fiori-detail"); }
out.cat6.ok = out.cat6.leadRows === out.cat6.rows && !!out.cat6.detail?.h1 && !!out.cat6.detail?.code;
// CAT-5 · CDS chain and copyable code
await page.goto(base + "/neo/cds/", { waitUntil: "networkidle" }); await page.waitForTimeout(400);
const cdsHref = await page.evaluate(() => [...document.querySelectorAll(".nxr-row")].map((r) => r.getAttribute("href")).find(Boolean));
out.cat5 = { list: cdsHref };
await page.goto(base + cdsHref, { waitUntil: "networkidle" }); await page.waitForTimeout(400);
out.cat5.detail = await page.evaluate(() => ({ chain: !!document.querySelector(".nxr-chain"), from: document.querySelectorAll(".nxr-chain-col:first-child .nxr-chain-c").length, via: document.querySelector(".nxr-chain-via b")?.textContent, to: document.querySelectorAll(".nxr-chain-col:last-of-type .nxr-chain-c").length, preCopy: document.querySelectorAll(".nxr-pre-w .nx-copy").length, pre: document.querySelectorAll(".nxr-pre").length }));
await page.locator(".nxr-chain").scrollIntoViewIfNeeded().catch(() => {}); await shot("cat5-cds-chain");
out.cat5.ok = out.cat5.detail.chain && out.cat5.detail.from > 0 && out.cat5.detail.preCopy === out.cat5.detail.pre;
// CAT-7 · enhancements comparison table
await page.goto(base + "/neo/enhancements/", { waitUntil: "networkidle" }); await page.waitForTimeout(400);
await page.locator(".nxr-compare > summary").click(); await page.waitForTimeout(300);
out.cat7 = await page.evaluate(() => ({ open: document.querySelector(".nxr-compare")?.open, rows: document.querySelectorAll(".nxr-compare-t tbody tr").length, cols: document.querySelectorAll(".nxr-compare-t thead th").length, pills: document.querySelectorAll(".nxr-compare-t .nu-status[data-status]").length, links: document.querySelectorAll(".nxr-compare-t tbody th a").length, overflowX: getComputedStyle(document.querySelector(".nxr-compare-w")).overflowX }));
await page.locator(".nxr-compare").scrollIntoViewIfNeeded(); await shot("cat7-enh-compare");
// 13 techniques in data/enhancements.ts (the 40 named exits are their examples, not techniques)
out.cat7.ok = out.cat7.open && out.cat7.rows >= 10 && out.cat7.cols === 6 && out.cat7.pills === out.cat7.rows && out.cat7.links === out.cat7.rows;
// TBL-1 / TBL-4 · AFKO: fields section start, header status before the evidence block
await page.goto(base + "/neo/tables/AFKO/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
out.tbl = await page.evaluate(() => { const top = (id) => { const el = document.getElementById(id); return el ? Math.round(el.getBoundingClientRect().top + (document.getElementById("main")?.scrollTop || 0)) : null; }; const headPill = document.querySelector(".nxb-head .nu-status[data-status]"); const nev = document.querySelector(".nev"); return { fieldsTop: top("nxb-fields"), relTop: top("nxb-rel"), s4Top: top("nxb-s4"), screens: Math.round((top("nxb-fields") / 936) * 100) / 100, headerStatus: headPill?.textContent?.trim(), headerStatusTop: headPill ? Math.round(headPill.getBoundingClientRect().top) : null, evidenceTop: nev ? Math.round(nev.getBoundingClientRect().top) : null, navOrder: [...document.querySelectorAll(".nxs a, .nxs button")].map((a) => a.textContent.trim()).slice(0, 5) }; });
out.tbl.ok = out.tbl.screens <= 1.5 && !!out.tbl.headerStatus && out.tbl.headerStatusTop < out.tbl.evidenceTop;
await shot("tbl1-afko-top");
await browser.close();
out.consoleErrors = errs.length;
const ok = out.cat2.ok && out.cat3.ok && out.cat5.ok && out.cat6.ok && out.cat7.ok && out.tbl.ok && errs.length === 0;
console.log(JSON.stringify(out, null, 2)); console.log(ok ? "CATALOG-CARDS OK" : "CATALOG-CARDS FAIL");
process.exit(ok ? 0 : 1);
