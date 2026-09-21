// The dock after the display-menu change (design audit §3): two bar controls
// (display, ask NEO), the display panel holds the appearance radiogroup, font
// faces and sizes; the bar button names the resolved theme. Prints JSON.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await page.goto(base + "/neo/tables/", { waitUntil: "networkidle" });
const bar = await page.evaluate(() => [...document.querySelectorAll(".nxk > button")].map((b) => (b.textContent || "").trim()));
await page.click(".nxk-b--display");
await page.waitForTimeout(300);
const panel = await page.evaluate(() => { const p = document.querySelector(".nxk-p--type"); return p ? { title: p.querySelector("h2")?.textContent?.trim(), theme: !!p.querySelector(".nxk-theme"), faces: p.querySelectorAll(".nxk-face-n").length, sizes: p.querySelectorAll(".nxk-sizes button").length } : null; });
await page.click('.nxk-theme-b:has-text("לילה")');
await page.waitForTimeout(300);
const after = await page.evaluate(() => ({ theme: document.documentElement.getAttribute("data-theme"), barState: document.querySelector(".nxk-b-state")?.textContent?.trim() }));
console.log(JSON.stringify({ bar, panel, after, consoleErrors: errs.length }, null, 2));
await browser.close();
process.exit(bar.length === 2 && panel?.theme && after.theme === "dark" && after.barState === "לילה" && errs.length === 0 ? 0 : 1);
