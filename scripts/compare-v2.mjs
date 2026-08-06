// Phase 5 of docs/LIBRARY-PLATFORM.md: compare the platform reader against the
// eleven hand-maintained routes it is meant to replace, before anything is
// swapped.
//
// Two things are checked, because either alone is misleading:
//   COVERAGE — does v2 render the same chapters and sections?
//   WEIGHT   — what does a reader actually download to open the page?
//
// Weight counts the HTML *and* every JS chunk the page references. Measuring
// HTML alone made v2 look heavier than the page it replaces, when in fact the
// old page pulls a 4 MB chunk of inlined prose that never appears in its HTML.
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
function firstLoad(pageDir) {
  const html = path.join(OUT, pageDir, "index.html");
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
let coverageErrors = 0;

for (const file of readdirSync(BOOKS).filter((f) => f.endsWith(".json")).sort()) {
  const id = file.replace(/\.json$/, "");
  const book = JSON.parse(readFileSync(path.join(BOOKS, file), "utf8"));

  const chapters = book.chapters.length;
  const sections = book.chapters.reduce((n, c) => n + c.sections.length, 0);

  // Every section the spine promises must have somewhere to get content from,
  // or the reader shows "no content" for a section the shelf counted.
  let withBody = 0;
  const sdir = path.join(SHARDS, id);
  if (existsSync(sdir)) {
    const have = new Set();
    for (const f of readdirSync(sdir)) {
      const o = JSON.parse(readFileSync(path.join(sdir, f), "utf8"));
      for (const k of Object.keys(o)) have.add(k);
    }
    for (const c of book.chapters) for (const s of c.sections) if (have.has(s.id)) withBody++;
  }

  const v2 = firstLoad(path.join("library", "v2", id));
  const old = firstLoad(path.join("library", id));

  if (v2 == null) { coverageErrors++; }

  rows.push({
    id, chapters, sections, withBody,
    pct: sections ? Math.round((withBody / sections) * 100) : 0,
    v2: v2 == null ? null : kb(v2),
    old: old == null ? null : kb(old),
  });
}

console.log(`\nPLATFORM READER vs EXISTING ROUTES\n${"─".repeat(78)}`);
console.log("  book      ch    sec   with-content    v2      existing   change");
for (const r of rows) {
  const delta = r.v2 != null && r.old != null
    ? (r.old === 0 ? "—" : `${r.v2 <= r.old ? "-" : "+"}${Math.abs(Math.round(((r.v2 - r.old) / r.old) * 100))}%`)
    : "n/a";
  console.log(
    `  ${r.id.padEnd(8)}${String(r.chapters).padStart(4)}${String(r.sections).padStart(7)}` +
    `${(r.withBody + " (" + r.pct + "%)").padStart(15)}` +
    `${(r.v2 == null ? "MISSING" : r.v2 + "KB").padStart(9)}` +
    `${(r.old == null ? "—" : r.old + "KB").padStart(11)}${delta.padStart(9)}`,
  );
}
console.log("─".repeat(78));

const withOld = rows.filter((r) => r.v2 != null && r.old != null);
const sum = (k) => withOld.reduce((n, r) => n + r[k], 0);
console.log(`  ${rows.length} books · v2 total ${sum("v2")}KB vs existing ${sum("old")}KB`);

const thin = rows.filter((r) => r.pct < 100);
console.log(`\nSECTIONS WITHOUT CONTENT`);
console.log(thin.length
  ? thin.map((r) => `  ${r.id}: ${r.sections - r.withBody} of ${r.sections}`).join("\n")
  : "  none — every section has a body or a snippet");

console.log(`\nROUTES MISSING FROM v2: ${coverageErrors}`);
process.exit(coverageErrors ? 1 : 0);
