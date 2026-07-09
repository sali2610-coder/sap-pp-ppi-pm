// M2 — dead-link gate. Pure Node (no deps). Crawls the built static export in
// out/ and fails (exit 1) if any internal <a href> points to a route that was
// not generated. Encoding-correct: decodes %2F so slash-bearing routes
// (e.g. /tcode/V%2F06/) compare against their on-disk directories.
//
// Run: node scripts/crawl-dead-links.mjs   (after `next build`)
import { readdirSync, statSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = "out";
if (!existsSync(ROOT)) { console.error("crawl-dead-links: out/ not found — run `next build` first."); process.exit(2); }

const htmlFiles = [];
const valid = new Set();
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (name === "index.html") {
      let rel = "/" + relative(ROOT, dir).replaceAll("\\", "/");
      if (rel === "/.") rel = "/";
      valid.add(decodeURIComponent(rel === "/" ? "/" : rel.replace(/\/$/, "") + "/"));
      htmlFiles.push(p);
    } else if (name.endsWith(".html")) {
      valid.add(decodeURIComponent("/" + relative(ROOT, p).replaceAll("\\", "/")));
      htmlFiles.push(p);
    }
  }
})(ROOT);

const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&#x2F;/gi, "/").replace(/&#47;/g, "/");
const norm = (h) => {
  let x = unescape(h);
  try { x = decodeURIComponent(x); } catch { /* keep */ }
  x = x.split("#")[0].split("?")[0];
  if (!x || !x.startsWith("/")) return null;
  return x === "/" ? "/" : (x.endsWith("/") ? x : x + "/");
};

const HREF = /href="([^"]+)"/g;
const ASSET = /\.(png|svg|ico|txt|xml|json|webmanifest)\/$/i;
let dead = 0;
const examples = [];
for (const fp of htmlFiles) {
  const src = "/" + relative(ROOT, fp).replaceAll("\\", "/");
  const html = readFileSync(fp, "utf8");
  const seen = new Set();
  let m;
  while ((m = HREF.exec(html))) {
    const n = norm(m[1]);
    if (!n || seen.has(n)) continue;
    seen.add(n);
    if (n.startsWith("/_next/") || ASSET.test(n)) continue;
    if (valid.has(n) || valid.has(n.replace(/\/$/, "") + ".html")) continue;
    dead++;
    if (examples.length < 20) examples.push(`  ${n}  <-  ${src}`);
  }
}

console.log(`crawl-dead-links: pages=${htmlFiles.length} validRoutes=${valid.size} DEAD_LINKS=${dead}`);
if (dead) { console.error("DEAD LINKS FOUND:\n" + examples.join("\n")); process.exit(1); }
console.log("OK — no dead internal links.");
