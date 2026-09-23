// axe-core sweep over the tab-sweep routes. axe-core is already in the tree
// (eslint-plugin-jsx-a11y's dependency); nothing is installed for this.
//   NEO_BASE=http://localhost:4195 OUT=<json> [VW=] [THEME=dark] node scripts/qa/axe-sweep.mjs [route ...]
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright-core");
const AXE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = process.env.NEO_BASE || "http://localhost:4195", OUT = process.env.OUT;
const ROUTES = process.argv.length > 2 ? process.argv.slice(2)
  : [...readFileSync(new URL("./ux-measure.mjs", import.meta.url), "utf8").matchAll(/"(\/neo\/[^"]*)"/g)].map((m) => m[1]);
const b = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
// reduced motion: a static scan must not read elements mid scroll-reveal
const ctx = await b.newContext({ viewport: { width: Number(process.env.VW || 1363), height: 936 }, reducedMotion: "reduce" });
if (process.env.THEME === "dark") await ctx.addInitScript(() => { try { localStorage.setItem("neo:theme", "dark"); } catch {} });
const p = await ctx.newPage();
const results = [];
for (const url of ROUTES) {
  await p.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 }); await p.waitForTimeout(700);
  await p.evaluate(AXE);
  const r = await p.evaluate(async () => {
    const res = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
    return res.violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, sample: v.nodes.slice(0, 4).map((x) => ({ t: x.target.join(" "), html: x.html.slice(0, 160), why: (x.any[0] || x.all[0] || x.none[0] || {}).message })) }));
  });
  results.push({ url, violations: r });
  console.log(url, r.length ? r.map((v) => `${v.id}(${v.impact})x${v.n}`).join(" ") : "0");
}
writeFileSync(OUT, JSON.stringify({ axe: require("axe-core/package.json").version, results }, null, 1));
await b.close();
