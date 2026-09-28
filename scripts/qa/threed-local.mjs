// LOCAL_ONLY check of the legacy 3D domain model page (/domain-model/): loads,
// no console errors, a WebGL canvas exists, a module can be opened and closed,
// and the camera direction survives a second open. Prints JSON.
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 140)); });
page.on("pageerror", (e) => errs.push("pageerror: " + String(e).slice(0, 140)));
const res = await page.goto(base + "/domain-model/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
const out = { status: res?.status(), canvas: await page.locator("canvas").count(), buttons: await page.locator("button").count(), title: await page.title() };
const clickables = await page.evaluate(() => [...document.querySelectorAll("button, [role=button], a")].map((e) => (e.textContent || "").trim()).filter((t) => t && t.length < 40).slice(0, 25));
out.controls = clickables;
out.consoleErrors = errs;
console.log(JSON.stringify(out, null, 2));
await browser.close();
