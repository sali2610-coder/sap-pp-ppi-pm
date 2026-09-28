// Verifies the rail shelf collapses to one line on a fresh browser and expands
// once an object has been opened (design audit §3). Prints JSON.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 }, locale: "he-IL" });
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
const probe = async () => page.evaluate(() => {
  const s = document.querySelector(".nx-shelf");
  if (!s) return null;
  const r = s.getBoundingClientRect();
  return { empty: s.getAttribute("data-empty"), h: Math.round(r.height), text: (s.textContent || "").trim().slice(0, 60), tabsVisible: !!s.querySelector(".nx-shelf-tabs") && getComputedStyle(s.querySelector(".nx-shelf-tabs")).display !== "none" };
});
await page.goto(base + "/neo/", { waitUntil: "networkidle" });
const fresh = await probe();
await page.goto(base + "/neo/tables/AFKO/", { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.goto(base + "/neo/", { waitUntil: "networkidle" });
const after = await probe();
console.log(JSON.stringify({ fresh, afterOpeningAFKO: after, consoleErrors: errs.length }, null, 2));
await browser.close();
