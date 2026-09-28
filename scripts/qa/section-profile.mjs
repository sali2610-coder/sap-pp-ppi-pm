// Height profile of a NEO page: every top-level block inside the canvas with its
// rendered height, so a long page can be shortened where it is actually long.
//   NEO_BASE=http://localhost:4195 node scripts/qa/section-profile.mjs /neo/pm/
import { chromium } from "playwright-core";
const base = process.env.NEO_BASE || "http://localhost:4195";
const route = process.argv[2] || "/neo/pm/";
const browser = await chromium.launch({ executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage({ viewport: { width: 1363, height: 936 } });
await page.goto(base + route, { waitUntil: "networkidle" });
const rows = await page.evaluate(() => {
  const root = document.querySelector(".nx-canvas > *") || document.body;
  const out = [];
  const walk = (el, depth) => {
    for (const c of el.children) {
      const r = c.getBoundingClientRect();
      if (r.height < 40) continue;
      const id = c.id ? `#${c.id}` : "";
      const cls = (c.className && typeof c.className === "string") ? "." + c.className.split(/\s+/).slice(0, 2).join(".") : "";
      out.push({ depth, tag: c.tagName.toLowerCase() + id + cls, h: Math.round(r.height) });
      if (depth < 1 && r.height > 1500) walk(c, depth + 1);
    }
  };
  walk(root, 0);
  return { total: Math.round(document.documentElement.scrollHeight), rows: out };
});
console.log(route, "total", rows.total);
for (const r of rows.rows) console.log(`${"  ".repeat(r.depth)}${r.h.toString().padStart(6)}  ${r.tag}`);
await browser.close();
