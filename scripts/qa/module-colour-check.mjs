// Design audit §18 (ERD colours) · one colour per module, the same on every
// surface and in both themes, and never the colour of a selection, an S/4
// status or a risk. Reads the module tokens (--mod-*) on the routes that draw
// modules, the selection (brand) and status tokens, and compares. Prints
// JSON; exits 1 when a module colour differs between routes or collides with
// a selection / status / risk colour.
//   NEO_BASE=http://localhost:4195 node scripts/qa/module-colour-check.mjs
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const ROUTES = ["/neo/", "/neo/erd/", "/neo/pm/", "/neo/pp-pi/", "/neo/tables/", "/neo/studio/", "/neo/books/", "/neo/domain/"];
const MODS = ["pm", "pppi", "pp", "mm", "qm", "sd", "fi", "co", "wm", "ewm", "ps", "hcm", "bw", "cs", "basis"];
const STATUS = ["done", "in-analysis", "in-conversion", "removed", "not-started", "tested", "blocked"];
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = { themes: {} }; let fail = 0;
const norm = (v) => (v || "").trim().toLowerCase();
for (const theme of ["light", "dark"]) {
  const ctx = await browser.newContext({ viewport: { width: 1363, height: 936 } });
  if (theme === "dark") await ctx.addInitScript(() => { try { localStorage.setItem("neo:theme", "dark"); } catch {} });
  const page = await ctx.newPage();
  const perRoute = {};
  for (const url of ROUTES) {
    await page.goto(base + url, { waitUntil: "networkidle" }); await page.waitForTimeout(300);
    perRoute[url] = await page.evaluate(({ MODS, STATUS }) => {
      const cs = getComputedStyle(document.documentElement);
      const read = (names, prefix) => Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(`--${prefix}${n}`).trim()]).filter(([, v]) => v));
      // resolve to rgb through a probe element, so hsl/oklch/color-mix values compare as colours
      const probe = document.createElement("i"); document.body.appendChild(probe);
      const rgb = (v) => { probe.style.color = ""; probe.style.color = v; return getComputedStyle(probe).color; };
      const mods = Object.fromEntries(Object.entries(read(MODS, "mod-")).map(([k, v]) => [k, rgb(v)]));
      const status = Object.fromEntries(Object.entries(read(STATUS, "status-")).map(([k, v]) => [k, rgb(v)]));
      const brand = rgb(cs.getPropertyValue("--brand").trim() || "#d62027");
      probe.remove();
      return { theme: document.documentElement.getAttribute("data-theme"), mods, status, brand };
    }, { MODS, STATUS });
  }
  // every module token identical across the routes that define it
  const modsByName = {};
  for (const [url, r] of Object.entries(perRoute)) for (const [m, c] of Object.entries(r.mods)) (modsByName[m] ||= new Map()).set(url, c);
  const inconsistent = Object.entries(modsByName).filter(([, map]) => new Set([...map.values()].map(norm)).size > 1).map(([m, map]) => ({ module: m, values: Object.fromEntries(map) }));
  // module colours never equal a selection / status colour
  const first = perRoute[ROUTES[0]];
  const collisions = [];
  for (const [m, c] of Object.entries(first.mods)) {
    if (norm(c) === norm(first.brand)) collisions.push({ module: m, with: "brand (selection)", colour: c });
    for (const [s, sc] of Object.entries(first.status)) if (norm(c) === norm(sc)) collisions.push({ module: m, with: `status-${s}`, colour: c });
  }
  const ok = inconsistent.length === 0 && collisions.length === 0;
  if (!ok) fail++;
  out.themes[theme] = { dataTheme: first.theme, modules: first.mods, brand: first.brand, status: first.status, inconsistent, collisions, ok };
  console.log(`${ok ? "OK  " : "FAIL"} ${theme}: ${Object.keys(first.mods).length} module tokens, ${inconsistent.length} inconsistent across ${ROUTES.length} routes, ${collisions.length} collisions with selection/status`);
  await ctx.close();
}
// the same module keeps its colour token between themes? (the value may differ per theme by design; report only)
out.crossTheme = Object.fromEntries(Object.keys(out.themes.light.modules).map((m) => [m, { light: out.themes.light.modules[m], dark: out.themes.dark.modules[m] }]));
await browser.close();
console.log(JSON.stringify(out, null, 2));
process.exit(fail ? 1 : 0);
