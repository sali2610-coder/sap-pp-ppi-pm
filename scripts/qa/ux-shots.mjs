// Full-viewport screenshots of named routes against a served export, for audit
// evidence. Usage:
//   NEO_BASE=http://localhost:4195 SHOTS=audit/ux-2026-09/shots/after-r2 \
//   PAGES="/neo/transactions/IP30/@sap-ip30@[id=evidence],/neo/idoc/BOMMAT/@bommat" node scripts/qa/ux-shots.mjs
// Each PAGES entry is route@filename[@selector-to-scroll-into-view]. Console
// errors are counted per page and printed; the exit code is 1 if any page had one.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const out = process.env.SHOTS || "audit/ux-2026-09/shots";
const pages = (process.env.PAGES || "").split(",").map((s) => s.trim()).filter(Boolean);
const width = Number(process.env.W || 1363), height = Number(process.env.H || 936);
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width, height }, locale: "he-IL" });
let bad = 0;
for (const p of pages) {
  const [route, name, sel] = p.split("@");
  const page = await ctx.newPage();
  const errs = [];
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await page.goto(base + route, { waitUntil: "networkidle" });
  if (sel) { const el = await page.$(sel); if (el) await el.scrollIntoViewIfNeeded(); await page.waitForTimeout(400); }
  await page.screenshot({ path: `${out}/${name}.png` });
  if (errs.length) bad++;
  console.log(`${name}: ${route} console errors=${errs.length}`);
  await page.close();
}
await browser.close();
process.exit(bad ? 1 : 0);
