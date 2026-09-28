// Design audit S7-PM-5 / ACC-2 · the module workspace's search-and-filter rail
// stays on screen at any depth of the table section, with and without an
// active filter, on a desktop and on a phone. Scrolls the page to the table,
// then 900 / 2500 / 6000px deeper (clamped to the document), and at every
// stop checks the rail's box is inside the viewport; then presses the first
// filter in the rail and repeats, also checking the pressed chip is visible.
// Prints JSON; exits 1 on a failure.
//   NEO_BASE=http://localhost:4195 node scripts/qa/sticky-depth-check.mjs
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = {}; let fail = 0;
for (const [kind, opts] of [["desktop", { viewport: { width: 1363, height: 936 } }], ["phone", { viewport: { width: 390, height: 844 }, userAgent: PHONE_UA, isMobile: true, hasTouch: true }]]) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage();
  const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  await page.goto(base + "/neo/pm/", { waitUntil: "networkidle" }); await page.waitForTimeout(500);
  const scroller = () => page.evaluate(() => { const m = document.getElementById("main"); const cs = m ? getComputedStyle(m) : null; return m && cs && /auto|scroll/.test(cs.overflowY) && m.scrollHeight > m.clientHeight ? "main" : "window"; });
  const sc = await scroller();
  const toTable = () => page.evaluate((sc) => { const t = document.getElementById("nw-tbl"); if (!t) return null; const top = t.getBoundingClientRect().top; if (sc === "main") document.getElementById("main").scrollBy(0, top); else window.scrollBy(0, top); return true; }, sc);
  const by = (px) => page.evaluate(({ sc, px }) => { if (sc === "main") document.getElementById("main").scrollBy(0, px); else window.scrollBy(0, px); }, { sc, px });
  const measure = () => page.evaluate(() => {
    const r = document.querySelector(".nw-rail"); if (!r) return { rail: null };
    const b = r.getBoundingClientRect(); const vh = window.innerHeight;
    const pressed = r.querySelector('[aria-pressed="true"]'); const pb = pressed ? pressed.getBoundingClientRect() : null;
    const t = document.getElementById("nw-tbl"); const tb = t ? t.getBoundingClientRect() : null;
    return { rail: { top: Math.round(b.top), bottom: Math.round(b.bottom), onScreen: b.bottom > 0 && b.top < vh * 0.6 }, tableTop: tb ? Math.round(tb.top) : null, tableBottom: tb ? Math.round(tb.bottom) : null, pressed: pb ? { text: pressed.textContent.trim().slice(0, 30), onScreen: pb.top >= 0 && pb.bottom <= vh } : null };
  });
  const run = async (label) => {
    const steps = [];
    await toTable(); await page.waitForTimeout(250); steps.push({ at: "table-top", ...(await measure()) });
    for (const px of [900, 2500, 6000]) { await by(px); await page.waitForTimeout(250); const m = await measure(); steps.push({ at: `+${px}`, ...m }); }
    return steps;
  };
  const noFilter = await run("no-filter");
  // press the first filter in the rail (an S/4 or shared toggle), then repeat
  const chip = page.locator('.nw-rail [aria-pressed="false"]').first();
  const chipText = (await chip.textContent().catch(() => "")) || "";
  await chip.click().catch(() => {}); await page.waitForTimeout(400);
  const withFilter = await run("filter");
  const ok = [...noFilter, ...withFilter].every((s) => s.rail && (s.tableBottom === null || s.tableBottom < 0 || s.rail.onScreen)) && withFilter.every((s) => !s.pressed || s.pressed.onScreen || s.tableBottom < 0) && errs.length === 0;
  if (!ok) fail++;
  out[kind] = { scroller: sc, noFilter, filterPressed: chipText.trim().slice(0, 30), withFilter, consoleErrors: errs.length, ok };
  console.log(`${ok ? "OK  " : "FAIL"} ${kind}: scroller=${sc} rail@[${noFilter.map((s) => s.rail?.top).join(",")}] withFilter@[${withFilter.map((s) => s.rail?.top).join(",")}] pressedVisible=${withFilter.map((s) => s.pressed ? (s.pressed.onScreen ? "y" : "n") : "-").join("")} errs=${errs.length}`);
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
process.exit(fail ? 1 : 0);
