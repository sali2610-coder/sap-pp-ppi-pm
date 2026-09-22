// Design audit S7-ERD-4: selected relations are emphasised, the others
// dimmed. Opens the ERD on a table (hash), reads the computed opacity and
// stroke width of the edges touching the selected table against the rest, at
// 1363 and at 390 (phone UA). Exits 1 unless the selected edges are opaque and
// thicker than the dimmed ones.
//   NEO_BASE=http://localhost:4195 node scripts/qa/erd-selection-check.mjs
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = {}; let fail = 0;
for (const [kind, opts] of [["desktop", { viewport: { width: 1363, height: 936 } }], ["phone", { viewport: { width: 390, height: 844 }, userAgent: PHONE_UA, isMobile: true, hasTouch: true }]]) {
  const ctx = await browser.newContext(opts); const page = await ctx.newPage();
  const errs = []; page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
  for (const t of ["AFKO", "EQUI"]) {
    await page.goto(base + "/neo/erd/#" + t, { waitUntil: "networkidle" }); await page.waitForTimeout(1500);
    const m = await page.evaluate((name) => {
      const ne = document.querySelector(".ne");
      const edges = [...document.querySelectorAll(".ne-edge")];
      const read = (e) => { const p = e.querySelector(".ne-edge-p") || e.querySelector("path, line"); const cs = p ? getComputedStyle(p) : null; return cs ? { op: parseFloat(cs.opacity) * parseFloat(getComputedStyle(e).opacity || "1"), sw: parseFloat(cs.strokeWidth) } : null; };
      const sel = edges.filter((e) => e.getAttribute("data-lvl") === "1").map(read).filter(Boolean);
      const other = edges.filter((e) => e.getAttribute("data-lvl") !== "1").map(read).filter(Boolean);
      const avg = (a, k) => a.length ? Math.round((a.reduce((s, x) => s + x[k], 0) / a.length) * 100) / 100 : null;
      return { level: ne?.getAttribute("data-level"), sel: ne?.getAttribute("data-sel"), edges: edges.length, selected: sel.length, selOpacity: avg(sel, "op"), selStroke: avg(sel, "sw"), otherOpacity: avg(other, "op"), otherStroke: avg(other, "sw"), name };
    }, t);
    const ok = m.sel === "1" && m.selected > 0 && m.selOpacity !== null && m.otherOpacity !== null && m.selOpacity > m.otherOpacity && m.selStroke > m.otherStroke;
    if (!ok) fail++;
    out[`${kind}:${t}`] = { ...m, ok };
    console.log(`${ok ? "OK  " : "FAIL"} ${kind} ${t}: level=${m.level} edges=${m.edges} selected=${m.selected} sel(op ${m.selOpacity}, sw ${m.selStroke}) vs other(op ${m.otherOpacity}, sw ${m.otherStroke})`);
  }
  out[`${kind}:consoleErrors`] = errs.length; if (errs.length) fail++;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
process.exit(fail ? 1 : 0);
