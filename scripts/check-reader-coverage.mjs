// Every book route must exist, and every section it promises must have content.
//
// Was scripts/compare-v2.mjs, which measured the platform reader against the
// eleven bespoke routes. Those routes are gone — the reader now answers at their
// URLs — so a comparison has nothing to compare against. What still earns its
// keep is the coverage half: a section counted on the shelf but with no body in
// any shard renders as "no content", and nothing else would catch it.
//
// Read-only. Run after `npm run build`.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const BOOKS = path.join(ROOT, "data", "books");
const SHARDS = path.join(ROOT, "public", "books");

if (!existsSync(OUT)) { console.error("out/ missing — run `npm run build` first"); process.exit(1); }

const kb = (b) => Math.round(b / 1024);

/** HTML plus every chunk it references — what the browser actually fetches. */
function firstLoad(dir) {
  const html = path.join(OUT, dir, "index.html");
  if (!existsSync(html)) return null;
  const src = readFileSync(html, "utf8");
  let total = statSync(html).size;
  const seen = new Set();
  for (const m of src.matchAll(/\/_next\/static\/chunks\/[A-Za-z0-9_.\-]+\.js/g)) {
    if (seen.has(m[0])) continue;
    seen.add(m[0]);
    const f = path.join(OUT, m[0]);
    if (existsSync(f)) total += statSync(f).size;
  }
  return total;
}

const rows = [];
let missing = 0;

for (const file of readdirSync(BOOKS).filter((f) => f.endsWith(".json")).sort()) {
  const id = file.replace(/\.json$/, "");
  const book = JSON.parse(readFileSync(path.join(BOOKS, file), "utf8"));
  const sections = book.chapters.reduce((n, c) => n + c.sections.length, 0);

  const have = new Set();
  const sdir = path.join(SHARDS, id);
  if (existsSync(sdir)) {
    for (const f of readdirSync(sdir).filter((x) => x.startsWith("ch"))) {
      for (const k of Object.keys(JSON.parse(readFileSync(path.join(sdir, f), "utf8")))) have.add(k);
    }
  }
  let withBody = 0;
  for (const c of book.chapters) for (const s of c.sections) if (have.has(s.id)) withBody++;

  const bytes = firstLoad(path.join("library", id));
  if (bytes == null) missing++;

  rows.push({ id, module: book.meta.module, ch: book.chapters.length, sections, withBody,
    pct: sections ? Math.round((withBody / sections) * 100) : 0,
    kb: bytes == null ? null : kb(bytes) });
}

console.log(`\nREADER COVERAGE\n${"─".repeat(70)}`);
console.log("  book      module     ch    sec   with-content   first-load");
for (const r of rows) {
  console.log(`  ${r.id.padEnd(9)}${String(r.module).padEnd(10)}${String(r.ch).padStart(4)}` +
    `${String(r.sections).padStart(7)}${(r.withBody + " (" + r.pct + "%)").padStart(15)}` +
    `${(r.kb == null ? "ROUTE MISSING" : r.kb + "KB").padStart(13)}`);
}
console.log("─".repeat(70));
console.log(`  ${rows.length} books · ${rows.reduce((n, r) => n + r.sections, 0)} sections`);

const thin = rows.filter((r) => r.pct < 100);
console.log(`\nSECTIONS WITHOUT CONTENT`);
console.log(thin.length
  ? thin.map((r) => `  ${r.id}: ${r.sections - r.withBody} of ${r.sections}`).join("\n")
  : "  none");
console.log(`\nMISSING ROUTES: ${missing}`);
process.exit(missing || thin.length ? 1 : 0);
