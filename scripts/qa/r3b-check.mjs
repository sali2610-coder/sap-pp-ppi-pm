// Round 3 batch 3 checks: collapsible workspace chapters (closed by default,
// opened by anchor), S/4 catalogue filter + grouped details + actions, cockpit
// wave → card anchors opening a closed wave with :target highlight.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 }, locale: "he-IL" });
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
const out = {};
await page.goto(base + "/neo/pm/", { waitUntil: "networkidle" });
out.pm = await page.evaluate(() => ({
  closed: document.querySelectorAll('section[data-collapsed="closed"]').length,
  open: document.querySelectorAll('section[data-collapsed="open"]').length,
  canvasH: Math.round(document.querySelector(".nx-canvas")?.scrollHeight || 0),
}));
await page.goto(base + "/neo/pm/#nw-if", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
out.pmAnchor = await page.evaluate(() => document.getElementById("nw-if")?.getAttribute("data-collapsed"));
await page.goto(base + "/neo/s4hana/", { waitUntil: "networkidle" });
out.s4 = await page.evaluate(() => ({
  tools: !!document.querySelector(".ns4-tools"),
  groups: [...document.querySelectorAll(".ns4-group-d")].map((d) => (d.querySelector("summary")?.textContent || "").trim().slice(0, 6) + ":" + (d.open ? "open" : "closed")),
  actions: document.querySelectorAll(".ns4-act").length,
  canvasH: Math.round(document.querySelector(".nx-canvas")?.scrollHeight || 0),
}));
await page.click('.ns4-chipsrow button:has-text("השתנה")');
await page.waitForTimeout(300);
out.s4Filtered = (await page.locator(".ns4-count").textContent())?.trim().slice(0, 60);
await page.goto(base + "/neo/migration-cockpit/", { waitUntil: "networkidle" });
const target = await page.evaluate(() => { const d = [...document.querySelectorAll(".ns4-group-d")].find((x) => !x.open); const a = d?.querySelector("article.ns4-obj"); return a ? a.id : null; });
out.cockpit = { closedWaveTarget: target, canvasH: await page.evaluate(() => Math.round(document.querySelector(".nx-canvas")?.scrollHeight || 0)) };
if (target) {
  await page.goto(base + "/neo/migration-cockpit/#" + target, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  out.cockpitAnchor = await page.evaluate((id) => { const a = document.getElementById(id); const d = a?.closest("details"); return { detailsOpen: d ? d.open : null, isTarget: a ? a.matches(":target") : null, top: a ? Math.round(a.getBoundingClientRect().top) : null }; }, target);
}
out.consoleErrors = errs.length;
console.log(JSON.stringify(out, null, 2));
await browser.close();
const ok = out.pm.closed >= 4 && out.pmAnchor === "open" && out.s4.tools && out.s4.actions > 0 && out.cockpitAnchor?.detailsOpen && out.cockpitAnchor?.isTarget && errs.length === 0;
process.exit(ok ? 0 : 1);
