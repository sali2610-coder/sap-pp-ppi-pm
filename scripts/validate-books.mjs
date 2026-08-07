// The Library Platform gate.
//
// One rule set every current and future book must satisfy. Run in CI; a book
// that breaks the standard fails the build rather than reaching a surface and
// behaving differently from its neighbours.
//
// Read-only. Exits non-zero on any error.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "data", "books");
const SHARDS = path.join(ROOT, "public", "books");

const MODULES = new Set(["PM", "PP", "PP-PI", "QM", "MM", "EWM", "PP/DS", "S&OP", "Fiori", "S/4HANA"]);
const KINDS = new Set(["sap-press", "configuration", "business-user", "reference", "foundation", "academy"]);
const STRUCTURES = new Set(["narrative", "catalogue", "reference"]);

const HEB = /[\u0590-\u05FF]/;

const errors = [];
const warns = [];
const rows = [];
const E = (b, k, d) => errors.push({ b, k, d });
const W = (b, k, d) => warns.push({ b, k, d });

if (!existsSync(DIR)) {
  console.error("data/books does not exist — run: node scripts/migrate-books.mjs");
  process.exit(1);
}

const files = readdirSync(DIR).filter((f) => f.endsWith(".json")).sort();
const idSets = new Map();

for (const file of files) {
  const id = file.replace(/\.json$/, "");
  let book;
  try { book = JSON.parse(readFileSync(path.join(DIR, file), "utf8")); }
  catch (e) { E(id, "PARSE", e.message.slice(0, 60)); continue; }

  // ---- envelope ----
  if (book.schemaVersion !== 1) E(id, "SCHEMA_VERSION", `expected 1, got ${book.schemaVersion}`);
  if (book.id !== id) E(id, "ID_MISMATCH", `file says ${id}, body says ${book.id}`);

  const m = book.meta ?? {};
  if (!m.title?.en) E(id, "NO_TITLE", "meta.title.en is required");
  if (!MODULES.has(m.module)) E(id, "BAD_MODULE", `"${m.module}" is not a known module`);
  if (!KINDS.has(m.kind)) E(id, "BAD_KIND", `"${m.kind}" is not a known kind`);
  if (!STRUCTURES.has(m.structure)) E(id, "BAD_STRUCTURE", `"${m.structure}" is not a known structure`);
  if (m.pages == null) W(id, "NO_PAGES", "page count missing");

  const chapters = book.chapters ?? [];
  if (!chapters.length) { E(id, "NO_CHAPTERS", "a book must have at least one chapter"); continue; }

  // ---- chapters ----
  const nums = chapters.map((c) => Number(c.n));
  if (nums[0] !== 1) E(id, "STARTS_MID_HIERARCHY", `first chapter is ${nums[0]}`);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) E(id, "CHAPTER_ORDER", `${nums[i - 1]} then ${nums[i]}`);
  }
  for (let n = 1; n <= nums[nums.length - 1]; n++) {
    if (!nums.includes(n)) E(id, "MISSING_CHAPTER", `chapter ${n} absent`);
  }
  const untitled = chapters.filter((c) => !String(c.title?.en ?? "").trim()).length;
  if (untitled) W(id, "CHAPTER_UNTITLED", `${untitled} chapter(s) have no title`);

  // ---- sections ----
  const seen = new Map();
  let heTitle = 0, heBody = 0, total = 0, misfiled = 0, crossListed = 0;

  // Prose lives in per-chapter shards under public/. Load them here so the
  // Hebrew gate still measures real text — if the validator only saw the spine
  // it would report every book as untranslated the moment sharding landed.
  const prose = new Map();
  const sdir = path.join(SHARDS, id);
  if (existsSync(sdir)) {
    for (const f of readdirSync(sdir).filter((x) => x.endsWith(".json"))) {
      try {
        const o = JSON.parse(readFileSync(path.join(sdir, f), "utf8"));
        for (const [sid, b] of Object.entries(o)) prose.set(sid, b);
      } catch (e) { E(id, "SHARD_PARSE", `${f}: ${e.message.slice(0, 40)}`); }
    }
  }

  for (const c of chapters) {
    if (!c.sections?.length) { E(id, "EMPTY_CHAPTER", `chapter ${c.n}`); continue; }
    for (const s of c.sections) {
      total++;
      if (!s.id) { E(id, "SECTION_NO_ID", `chapter ${c.n}`); continue; }
      // Two different things, previously conflated. Ten books carry a translated
      // BODY under an English heading; book8 carries translated HEADINGS and no
      // body. Counting them as one number reported the string "true" as a
      // Hebrew title and every book as fully translated.
      if (HEB.test(String(s.title?.he ?? ""))) heTitle++;
      // A section carries Hebrew prose either as a translated paragraph or, in
      // an academy book, across its named facets. Checking only `he` reported
      // the richest book in the library as having no content at all.
      const b = prose.get(s.id);
      if (b && (b.format === "academy"
        ? Object.values(b.facets ?? {}).some((t) => HEB.test(Array.isArray(t) ? t.join(" ") : String(t)))
        : HEB.test(String(b.he ?? "")))) heBody++;
      if (!String(s.title?.en ?? "").trim() && !String(s.title?.he ?? "").trim()) {
        E(id, "SECTION_UNTITLED", `${s.id} has no title in either language`);
      }

      // A narrative book files 3.2 under chapter 3. A catalogue does not
      // number hierarchically, so the rule does not apply to it.
      if (m.structure === "narrative") {
        const lead = Number(String(s.id).split(".")[0]);
        if (Number.isFinite(lead) && lead !== Number(c.n)) {
          misfiled++;
          if (misfiled <= 2) E(id, "SECTION_MISFILED", `${s.id} under chapter ${c.n}`);
        }
      }

      const prev = seen.get(s.id);
      if (prev !== undefined) {
        // A catalogue lists the same app under several categories, and the
        // publisher does not always spell the name identically ("Manage Product
        // Master" vs "Manage Product Master Data"). That is the source book's
        // data, not a defect, so it is reported rather than failed. In a
        // narrative book a repeated id is still an error.
        if (m.structure === "catalogue") {
          crossListed++;
          if (prev !== String(s.title?.en ?? "")) {
            W(id, "CROSS_LISTED_RENAMED", `${s.id}: "${prev}" / "${s.title?.en ?? ""}"`);
          }
        } else E(id, "DUPLICATE_ID", `${s.id} appears twice with differing titles`);
      } else seen.set(s.id, String(s.title?.en ?? ""));
    }
  }
  if (misfiled > 2) E(id, "SECTION_MISFILED", `…and ${misfiled - 2} more`);

  // The spine and the shards are written by one script but read by different
  // code paths, which is exactly where drift starts. Check they still agree.
  const orphaned = [...prose.keys()].filter((k) => !seen.has(k)).length;
  if (orphaned) W(id, "ORPHAN_PROSE", `${orphaned} shard entries have no section in the spine`);
  if (crossListed) W(id, "CROSS_LISTED", `${crossListed} entries appear under two chapters (expected for a catalogue)`);

  // Hebrew-first is a platform requirement, but a book satisfies it by
  // translating either its headings or its prose. Demanding both would fail
  // every book in the library for the wrong reason.
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);
  const titlePct = pct(heTitle), bodyPct = pct(heBody);
  const hePct = Math.max(titlePct, bodyPct);
  if (hePct === 0) E(id, "NO_HEBREW", "neither headings nor bodies carry Hebrew");
  else if (hePct < 90) W(id, "PARTIAL_HEBREW", `titles ${titlePct}%, bodies ${bodyPct}%`);

  idSets.set(id, new Set([...seen.keys()]));
  rows.push({ id, module: m.module, structure: m.structure, ch: chapters.length, sec: total, titlePct, bodyPct, title: String(m.title?.en ?? "").slice(0, 34) });
}

// ---- dataset overlap: reported as evidence, never judged ----
const overlaps = [];
const ids = [...idSets.keys()];
for (let i = 0; i < ids.length; i++) {
  for (let j = i + 1; j < ids.length; j++) {
    const a = idSets.get(ids[i]), b = idSets.get(ids[j]);
    const shared = [...a].filter((x) => b.has(x)).length;
    const pct = Math.round((shared / Math.min(a.size, b.size)) * 100);
    if (pct >= 90) overlaps.push(`${ids[i]} and ${ids[j]} share ${shared} ids (${pct}%)`);
  }
}

// ------------------------------------------------------------------ report
console.log(`\nLIBRARY PLATFORM VALIDATION\n${"─".repeat(88)}`);
console.log("  book     module    structure   ch   sec  he-ttl  he-body  title");
for (const r of rows) {
  console.log(`  ${r.id.padEnd(8)} ${String(r.module).padEnd(9)} ${r.structure.padEnd(11)}${String(r.ch).padStart(3)}${String(r.sec).padStart(6)}${String(r.titlePct + "%").padStart(7)}${String(r.bodyPct + "%").padStart(8)}   ${r.title}`);
}
console.log(`${"─".repeat(88)}`);
console.log(`  ${rows.length} books · ${rows.reduce((n, r) => n + r.ch, 0)} chapters · ${rows.reduce((n, r) => n + r.sec, 0)} sections`);

for (const [label, list] of [["ERRORS", errors], ["WARNINGS", warns]]) {
  console.log(`\n${label}: ${list.length}`);
  if (!list.length) { console.log("  none"); continue; }
  const g = new Map();
  for (const x of list) { if (!g.has(x.k)) g.set(x.k, []); g.get(x.k).push(x); }
  for (const [k, items] of g) {
    console.log(`  ${k} (${items.length})`);
    for (const it of items.slice(0, 5)) console.log(`    ${it.b}: ${it.d}`);
    if (items.length > 5) console.log(`    …and ${items.length - 5} more`);
  }
}

console.log(`\nDATASET OVERLAP (evidence for a human, not a verdict)`);
console.log(overlaps.length ? overlaps.map((o) => `  ${o}`).join("\n") : "  none — every book is an independent dataset");

process.exit(errors.length ? 1 : 0);
