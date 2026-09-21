// Round 3 interactive checks: module workspace topic CTA + sticky filter rail,
// domains hub filter, catalog empty state wording. Prints JSON, exits 1 on a failure.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 }, locale: "he-IL" });
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
const out = {};
// 1. module workspace: topic CTA appears after choosing a topic and jumps to the table
await page.goto(base + "/neo/pm/", { waitUntil: "networkidle" });
await page.locator(".nw-rankrow").first().click();
await page.waitForTimeout(300);
const cta = page.locator(".nw-rank-go");
out.topicCta = { visible: await cta.count(), text: (await cta.count()) ? (await cta.first().textContent())?.trim() : null };
if (await cta.count()) { await cta.first().click(); await page.waitForTimeout(700); }
out.afterCtaTableTop = await page.evaluate(() => { const t = document.getElementById("nw-tbl"); return t ? Math.round(t.getBoundingClientRect().top) : null; });
// 2. sticky rail: scroll deep into the table, the search/filter rail must still be on screen
await page.evaluate(() => { const t = document.getElementById("nw-tbl"); if (t) window.scrollBy(0, t.getBoundingClientRect().top + 900); });
await page.waitForTimeout(400);
out.railSticky = await page.evaluate(() => { const r = document.querySelector(".nw-rail"); if (!r) return null; const b = r.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), onScreen: b.top >= 0 && b.top < window.innerHeight / 2 }; });
// 3. domains hub filter
await page.goto(base + "/neo/domain-model/", { waitUntil: "networkidle" });
let before = 0, after = 0, count = null, empty = null;
try {
before = await page.locator(".ndm-card").count();
await page.fill('input[aria-label="חיפוש בתחומים העסקיים"]', "ציוד");
await page.waitForTimeout(300);
after = await page.locator(".ndm-card").count();
count = (await page.locator(".ndm-count").textContent())?.trim();
await page.fill('input[aria-label="חיפוש בתחומים העסקיים"]', "zzzz-none");
await page.waitForTimeout(300);
empty = (await page.locator(".ndm-none").count()) ? (await page.locator(".ndm-none p").first().textContent())?.trim() : null;
} catch (e) { out.domainsError = String(e).slice(0, 120); }
out.domains = { before, afterQuery: after, countLine: count, emptyText: empty };
// 4. tables catalog empty wording
await page.goto(base + "/neo/tables/", { waitUntil: "networkidle" });
await page.fill('input[aria-label="חיפוש בטבלאות SAP"]', "zzzz-none");
await page.waitForTimeout(400);
out.tablesEmpty = (await page.locator(".nxd-none p").first().textContent())?.trim();
out.consoleErrors = errs.length;
console.log(JSON.stringify(out, null, 2));
await browser.close();
const ok = out.topicCta.visible > 0 && out.railSticky?.onScreen && out.domains.afterQuery < out.domains.before && !!out.domains.emptyText && (out.tablesEmpty || "").includes("נסה חיפוש אחר") && errs.length === 0;
process.exit(ok ? 0 : 1);
