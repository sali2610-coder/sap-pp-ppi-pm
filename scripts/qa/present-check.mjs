// Round 6 checks for design audit S6-3 (presentation mode), S7-STU-1 (layered
// start) and S7-HOME-4 (actionable gate metrics), against a served out/ at
// 1363x936. Prints JSON, exits 1 on a failure.
//   NEO_BASE=http://localhost:4195 node scripts/qa/present-check.mjs
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 }, locale: "he-IL" });
const page = await ctx.newPage();
const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); }); page.on("pageerror", (e) => errs.push(e.message));
const zoomLabel = () => page.evaluate(() => [...document.querySelectorAll("button, span, output, div, b")].find((e) => /^\d{2,3}%$/.test((e.textContent || "").trim()))?.textContent?.trim() ?? null);
const out = {};

/* ---- ERD presentation mode */
await page.goto(base + "/neo/erd/", { waitUntil: "networkidle" }); await page.waitForTimeout(800);
const erd = { before: { zoom: await zoomLabel(), xs: await page.evaluate(() => getComputedStyle(document.querySelector(".ne")).getPropertyValue("--t-xs").trim()) } };
await page.locator('button[aria-label^="מצב הצגה"]').first().click(); await page.waitForTimeout(900);
erd.on = await page.evaluate(() => ({
  present: document.querySelector(".ne")?.getAttribute("data-present"),
  focus: document.querySelector(".nx-app")?.getAttribute("data-focus"),
  legend: !!document.querySelector(".ne-legend"),
  legendItems: document.querySelectorAll(".ne-legend-i").length,
  legendText: document.querySelector(".ne-legend")?.textContent?.trim().slice(0, 80),
  miniHidden: !document.querySelector(".ne-mini") || getComputedStyle(document.querySelector(".ne-mini")).display === "none",
  xs: getComputedStyle(document.querySelector(".ne")).getPropertyValue("--t-xs").trim(),
  railHidden: !document.querySelector(".nx-rail") || getComputedStyle(document.querySelector(".nx-rail")).display === "none" || document.querySelector(".nx-rail").getBoundingClientRect().width === 0,
  fullscreen: !!document.fullscreenElement,
}));
erd.on.zoom = await zoomLabel();
await page.screenshot({ path: process.env.SHOTS ? process.env.SHOTS + "/present-erd.png" : "/tmp/present-erd.png" });
await page.keyboard.press("Escape"); await page.waitForTimeout(500);
erd.after = await page.evaluate(() => ({ present: document.querySelector(".ne")?.getAttribute("data-present"), focus: document.querySelector(".nx-app")?.getAttribute("data-focus"), legend: !!document.querySelector(".ne-legend") }));
erd.ok = erd.on.present === "1" && erd.on.focus === "1" && erd.on.legend && erd.on.legendItems >= 4 && erd.on.miniHidden && parseFloat(erd.on.xs) > parseFloat(erd.before.xs) && parseInt(erd.on.zoom) >= 100 && erd.after.present === "0" && !erd.after.legend;
out.erd = erd;

/* ---- Studio: layered start + presentation */
await page.goto(base + "/neo/studio/", { waitUntil: "networkidle" }); await page.waitForTimeout(900);
const st = { start: await page.evaluate(() => {
  const nodes = [...document.querySelectorAll(".nst-node")];
  const px = nodes.length ? Math.min(...nodes.map((n) => parseFloat(getComputedStyle(n.querySelector("b")).fontSize))) : null;
  const k = parseFloat(document.querySelector(".nst-k")?.textContent || "0") / 100;
  return { nodes: nodes.length, layer: document.querySelector(".nst-layer-t")?.textContent?.trim(), role: document.querySelector(".nst-role")?.textContent?.trim().slice(0, 60), zoom: document.querySelector(".nst-k")?.textContent?.trim(), labelPx: px, labelOnScreen: px && k ? Math.round(px * k * 10) / 10 : null, pressedZones: document.querySelectorAll('.nst-zone[aria-pressed="true"]').length };
}) };
await page.getByRole("button", { name: /^הוספת השכבה הבאה/ }).click().catch(() => {}); await page.waitForTimeout(600);
st.next = await page.evaluate(() => ({ nodes: document.querySelectorAll(".nst-node").length, zoom: document.querySelector(".nst-k")?.textContent?.trim(), layer: document.querySelector(".nst-layer-t")?.textContent?.trim() }));
await page.getByRole("button", { name: "הצגת כל השכבות" }).click(); await page.waitForTimeout(600);
st.all = await page.evaluate(() => ({ nodes: document.querySelectorAll(".nst-node").length, zoom: document.querySelector(".nst-k")?.textContent?.trim(), layer: document.querySelector(".nst-layer-t")?.textContent?.trim() }));
await page.locator('button[aria-label^="מצב הצגה"]').first().click(); await page.waitForTimeout(800);
st.present = await page.evaluate(() => ({ present: document.querySelector(".nst")?.getAttribute("data-present"), focus: document.querySelector(".nx-app")?.getAttribute("data-focus"), zoom: document.querySelector(".nst-k")?.textContent?.trim(), xs: getComputedStyle(document.querySelector(".nst")).getPropertyValue("--t-xs").trim() }));
await page.screenshot({ path: process.env.SHOTS ? process.env.SHOTS + "/present-studio.png" : "/tmp/present-studio.png" });
await page.keyboard.press("Escape"); await page.waitForTimeout(400);
st.exit = await page.evaluate(() => document.querySelector(".nst")?.getAttribute("data-present"));
st.ok = st.start.pressedZones === 1 && st.start.nodes > 0 && st.start.nodes < st.all.nodes && (st.start.labelOnScreen ?? 0) >= 11 && st.present.present === "1" && st.present.focus === "1" && parseInt(st.present.zoom) >= 90 && st.exit === "0";
out.studio = st;

/* ---- Home: three actionable metrics */
await page.goto(base + "/neo/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
out.home = await page.evaluate(() => {
  const s = [...document.querySelectorAll(".nh-stat")];
  return { count: s.length, links: s.filter((e) => e.tagName === "A").length, items: s.map((e) => ({ n: e.querySelector("b")?.textContent, l: e.querySelector("em")?.textContent, href: e.getAttribute("href") })) };
});
out.home.ok = out.home.count === 3 && out.home.links === 3 && out.home.items.every((i) => i.href);

await browser.close();
out.consoleErrors = errs.length; out.errs = errs.slice(0, 3);
const ok = out.erd.ok && out.studio.ok && out.home.ok && errs.length === 0;
console.log(JSON.stringify(out, null, 2));
console.log(ok ? "PRESENT-CHECK OK" : "PRESENT-CHECK FAIL");
process.exit(ok ? 0 : 1);
