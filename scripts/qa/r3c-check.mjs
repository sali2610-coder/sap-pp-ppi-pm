// Round 3 batch 4 checks: ERD status words on nodes + inspector canonical line +
// mode chip + narrower overview panel; focus mode on ERD, reader and Studio
// (shell hidden while on, restored on exit / Escape). Prints JSON; exit 1 on failure.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 }, locale: "he-IL" });
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
const out = {};
const shell = () => page.evaluate(() => { const app = document.querySelector(".nx-app"); const rail = document.querySelector(".nx-rail"); const dock = document.querySelector(".nxk"); const top = document.querySelector(".nx-topbar"); const vis = (el) => !!el && getComputedStyle(el).display !== "none"; return { focus: app?.getAttribute("data-focus"), rail: vis(rail), dock: vis(dock), top: vis(top) }; });

await page.goto(base + "/neo/erd/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
out.erdOverview = await page.evaluate(() => {
  const ne = document.querySelector(".ne");
  const insp = document.querySelector(".ne-insp");
  return { level: ne?.getAttribute("data-level"), inspW: insp ? Math.round(insp.getBoundingClientRect().width) : null, modeChip: document.querySelector(".ne-modechip")?.textContent?.trim() };
});
// enter a module (first module card) and read the badges
const mod = page.locator(".ne-node.ne-mod").first();
try { if (await mod.count()) await mod.click({ timeout: 5000 }); } catch { /* fall through */ }
out.urlAfterModuleClick = page.url();
await page.waitForTimeout(1200);
out.erdModule = await page.evaluate(() => {
  const words = [...document.querySelectorAll(".ne-node-s4 text")].map((t) => t.textContent?.trim()).filter(Boolean);
  const count = words.reduce((a, w) => (a[w] = (a[w] || 0) + 1, a), {});
  return { level: document.querySelector(".ne")?.getAttribute("data-level"), badges: count, modeChip: document.querySelector(".ne-modechip")?.textContent?.trim(), hasS4Only: words.includes("S/4"), canon: document.querySelector(".ne-s4-canon")?.textContent?.trim().slice(0, 60) || null };
});
// focus mode on the ERD
out.shellBefore = await shell();
out.focusButtons = await page.locator('button[aria-label^="מצב מיקוד"]').count();
await page.locator('button[aria-label^="מצב מיקוד"]').first().click({ timeout: 10000 });
await page.waitForTimeout(300);
out.shellFocusOn = await shell();
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
out.shellAfterEsc = await shell();
// reader focus
await page.goto(base + "/neo/read/book2/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const fb = page.locator('button[aria-pressed]:has-text("מיקוד")').first();
if (await fb.count()) { await fb.click(); await page.waitForTimeout(300); out.readerFocusOn = await shell(); await page.locator(".nr-unfocus").click(); await page.waitForTimeout(300); out.readerFocusOff = await shell(); }
// studio focus
await page.goto(base + "/neo/studio/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.click('button[title="מצב מיקוד"]');
await page.waitForTimeout(300);
out.studioFocusOn = await shell();
await page.click(".nx-focus-exit");
await page.waitForTimeout(300);
out.studioFocusOff = await shell();
out.consoleErrors = errs.length;
console.log(JSON.stringify(out, null, 2));
await browser.close();
const ok = out.erdOverview.inspW && out.erdOverview.inspW <= 310 && !!out.erdOverview.modeChip && out.shellFocusOn.focus === "1" && !out.shellFocusOn.rail && !out.shellFocusOn.dock && out.shellAfterEsc.focus == null && out.shellAfterEsc.rail && out.studioFocusOn.focus === "1" && out.studioFocusOff.focus == null && !out.erdModule.hasS4Only && errs.length === 0;
process.exit(ok ? 0 : 1);
