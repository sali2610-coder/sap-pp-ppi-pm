// Converts the four scattered descriptions of a book into one authored file.
//
// Today a book lives in data/library.ts (shelf), N-full.json (reader),
// N-index.json (search) and ai-tree/N.json (AI). Nothing enforced that they
// agree, which is how the AI came to label chapters with their first section's
// heading and how book8's Hebrew was silently dropped by every consumer that
// assumed one field schema.
//
// Output: data/books/<bookId>.json — the shape defined in docs/LIBRARY-PLATFORM.md.
// Additive and non-destructive: nothing reads these yet.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIB = path.join(ROOT, "data", "library");
const OUT = path.join(ROOT, "data", "books");
const SHARDS = path.join(ROOT, "public", "books");
mkdirSync(OUT, { recursive: true });
mkdirSync(SHARDS, { recursive: true });

// Identity is declared once, here, and mirrors lib/book-identity.ts.
const META = {
  book1:  { module: "PM",      kind: "configuration", structure: "narrative", publisher: "SAP PRESS" },
  book2:  { module: "PP",      kind: "sap-press",     structure: "narrative", publisher: "SAP PRESS" },
  book3:  { module: "MM",      kind: "sap-press",     structure: "narrative", publisher: "SAP PRESS" },
  book4:  { module: "PP/DS",   kind: "sap-press",     structure: "narrative", publisher: "SAP PRESS" },
  book5:  { module: "QM",      kind: "sap-press",     structure: "narrative", publisher: "SAP PRESS" },
  book6:  { module: "EWM",     kind: "sap-press",     structure: "narrative", publisher: "SAP PRESS" },
  // A catalogue of Fiori apps: ids are app codes, the same app legitimately
  // appears under two categories, and numbering is not hierarchical.
  book7:  { module: "Fiori",   kind: "reference",     structure: "catalogue", publisher: "SAP PRESS" },
  book8:  { module: "PM",      kind: "business-user", structure: "narrative", publisher: "SAP PRESS" },
  book9:  { module: "PM",      kind: "business-user", structure: "narrative", publisher: "SAP PRESS" },
  book10: { module: "S&OP",    kind: "sap-press",     structure: "narrative", publisher: "SAP PRESS" },
  book11: { module: "S/4HANA", kind: "foundation",    structure: "narrative", publisher: "ZaranTech" },
};

const HEB = /[\u0590-\u05FF]/;

/**
 * Books disagree on field names AND on what the field means.
 *
 * Most books use {title, he} where `he` is a BOOLEAN — "a Hebrew translation of
 * the body exists" — while book8 uses {titleEn, titleHe} where the Hebrew field
 * is an actual heading. Coercing both with String() turned `true` into the
 * string "true" and handed every consumer a Hebrew title of "true", which then
 * passed a validator that only asked whether the field was non-empty. Ten books
 * were reported 100% translated on the strength of that.
 *
 * So: a Hebrew title exists only when the source holds Hebrew characters.
 * Anything else is not a title, whatever its truthiness.
 */
const en = (e) => String(e.title ?? e.titleEn ?? "").trim();
const he = (e) => {
  const v = e.he ?? e.titleHe;
  if (typeof v !== "string") return "";          // booleans are flags, not text
  const t = v.trim();
  return HEB.test(t) ? t : "";                   // and neither is romanised text
};


/**
 * Two genuinely different book formats, not two spellings of one.
 *
 * Ten books are PROSE: a section is {en, he} — a paragraph and its translation.
 *
 * book8 is ACADEMY: a section is sixteen named Hebrew facets (executive summary,
 * beginner, consultant, common mistakes, interview questions, …) plus structured
 * references (tables, tcodes, fiori, flow, depth). Reading only {en, he} found
 * neither field and dropped the entire book, which then validated as "titles
 * only, no prose" — a book with more content than any other in the library
 * reported as having none.
 */
// Nine of these are ARRAYS in the source, not strings, and they hold roughly
// half of book8's content. Reading only strings captured the five prose facets
// and silently dropped ~307k characters of the structured ones — which then
// validated as "100% body coverage" because the five that survived were the
// ones the check looked at.
const FACETS = [
  "exec", "beginner", "consultant", "purpose", "processExample", "scenario",
  "nav", "config", "masterData", "mistakes", "troubleshoot", "bestPractice",
  "interview", "takeaways", "related", "summary", "why",
];
const REFS = ["tables", "tcodes", "fiori", "flow"];

function sectionBody(s) {
  // prose form
  const en = String(s.en ?? "").trim();
  const he = String(s.he ?? "").trim();
  if (en || he) return { format: "prose", ...(en ? { en } : {}), ...(he ? { he } : {}) };

  // academy form
  const facets = {};
  for (const f of FACETS) {
    const v = s[`${f}He`];
    if (typeof v === "string" && v.trim()) facets[f] = v.trim();
    else if (Array.isArray(v)) {
      const items = v.map((x) => (typeof x === "string" ? x.trim() : String(x ?? "").trim())).filter(Boolean);
      if (items.length) facets[f] = items;
    }
  }
  const refs = {};
  for (const r of REFS) {
    const v = s[r];
    if (Array.isArray(v) ? v.length : v != null && v !== "") refs[r] = v;
  }
  if (!Object.keys(facets).length && !Object.keys(refs).length) return null;
  return {
    format: "academy",
    ...(Object.keys(facets).length ? { facets } : {}),
    ...(Object.keys(refs).length ? { refs } : {}),
    ...(s.depth != null ? { depth: s.depth } : {}),
  };
}

let books = 0, chapters = 0, sections = 0;
const report = [];

for (let i = 1; i <= 11; i++) {
  const id = `book${i}`;
  const idxFile = path.join(LIB, `${id}-index.json`);
  const fullFile = path.join(LIB, `${id}-full.json`);
  if (!existsSync(idxFile)) { report.push([id, "SKIP", "no index"]); continue; }

  const idx = JSON.parse(readFileSync(idxFile, "utf8"));
  const full = existsSync(fullFile) ? JSON.parse(readFileSync(fullFile, "utf8")) : null;

  // Figures are per-chapter page scans, keyed by chapter number. They are
  // sidecar metadata, not part of the spine: the reader only needs the current
  // chapter's, and seven of the eleven books have none at all.
  const figFile = path.join(LIB, `${id}-figures.json`);
  const figures = existsSync(figFile) ? JSON.parse(readFileSync(figFile, "utf8")) : null;

  // The reader owns chapter titles. The tree used to invent them from the first
  // section, which is exactly the drift this file removes.
  const chapterTitle = new Map();
  const chapterSections = new Map();
  // The reader holds the prose. For ten of the eleven books this is where the
  // Hebrew actually is — a translated body under a still-English heading.
  const body = new Map();
  for (const c of full?.chapters ?? []) {
    const n = Number(c.n);
    if (!Number.isFinite(n)) continue;
    if (String(c.title ?? "").trim()) chapterTitle.set(n, String(c.title).trim());
    chapterSections.set(n, c.sections ?? []);
    for (const s of c.sections ?? []) {
      if (!s?.id) continue;
      const b = sectionBody(s);
      if (b) body.set(String(s.id), b);
    }
  }

  const snippets = new Map();
  for (const e of idx) if (e.snippet) snippets.set(String(e.id), String(e.snippet));

  /**
   * Seed every chapter the source declares, before the index is walked.
   *
   * `byChapter` was built purely from `idx`, so a chapter with no index entries
   * never got a key and silently vanished from the migrated book. Exactly one
   * chapter in the corpus is affected — book7 ch12 "Additional Resources", which
   * has 0 sections — but it WAS shown to readers before the migration: the
   * bespoke book7 page passed `DATA.chapters` through unfiltered and reported
   * "chapters translated /12".
   *
   * Dropping it silently changed that book's visible chapter count from 12 to
   * 11. An empty chapter is an editorial state, not an error, and removing one
   * is not this script's decision to make.
   */
  const byChapter = new Map();
  for (const c of full?.chapters ?? []) {
    const n = Number(c.n);
    if (Number.isFinite(n)) byChapter.set(n, []);
  }
  for (const e of idx) {
    const n = Number(e.ch);
    if (!byChapter.has(n)) byChapter.set(n, []);
    const b = body.get(String(e.id));
    byChapter.get(n).push({
      id: String(e.id),
      title: { en: en(e), he: he(e) },
      ...(e.page != null ? { page: Number(e.page) } : {}),
      ...(b ? { body: b } : {}),   // stripped into a shard below
    });
  }

  const chapterList = [...byChapter.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([n, secs]) => ({
      n,
      title: { en: chapterTitle.get(n) || "", he: "" },
      ...(chapterSections.get(n)?.[0]?.page != null ? { startPage: Number(chapterSections.get(n)[0].page) } : {}),
      sections: secs,
    }));

  const m = META[id] ?? { module: "SAP", kind: "reference", structure: "narrative", publisher: "" };
  const book = {
    id,
    schemaVersion: 1,
    meta: {
      title: { en: String(full?.book ?? id), he: "" },
      module: m.module,
      kind: m.kind,
      structure: m.structure,
      publisher: m.publisher,
      ...(full?.pages != null ? { pages: Number(full.pages) } : {}),
    },
    chapters: chapterList,
  };

  // Bodies are sharded per chapter and served from public/, not inlined into
  // the book file. The reader needs one chapter at a time; the shelf, the nav
  // and Ask AI never need prose at all. Inlining it is why the current book7
  // route ships ~3.9 MB to open a page the user may only scroll two screens of.
  const shardDir = path.join(SHARDS, id);
  mkdirSync(shardDir, { recursive: true });
  for (const c of chapterList) {
    const prose = {};
    for (const sec of c.sections) {
      const snip = snippets.get(sec.id);
      if (sec.body || snip) {
        // The snippet is content, not structure: it is a preview of the section,
        // and for a catalogue entry it may be the only text there is. Keeping it
        // in the spine put 429 KB of book7's prose into the page payload of a
        // reader that had not opened a chapter yet.
        prose[sec.id] = { ...(sec.body ?? { format: "prose" }), ...(snip ? { snippet: snip } : {}) };
        delete sec.body;
      }
    }
    if (Object.keys(prose).length) {
      writeFileSync(path.join(shardDir, `ch${c.n}.json`), JSON.stringify(prose));
    }
  }

  // Figure metadata per chapter, alongside the prose shards.
  let figCount = 0;
  if (figures && typeof figures === "object") {
    for (const [ch, list] of Object.entries(figures)) {
      if (!Array.isArray(list) || !list.length) continue;
      figCount += list.length;
      writeFileSync(path.join(shardDir, `fig${ch}.json`), JSON.stringify(list));
    }
  }
  if (figCount) book.meta.figures = figCount;

  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(book));
  books++;
  chapters += chapterList.length;
  sections += idx.length;
  const heTitles = idx.filter((e) => he(e)).length;
  const vals = [...body.values()];
  const academy = vals.filter((b) => b.format === "academy").length;
  const heBodies = vals.filter((b) =>
    b.format === "academy"
      ? Object.values(b.facets ?? {}).some((t) => HEB.test(Array.isArray(t) ? t.join(" ") : t))
      : HEB.test(b.he ?? "")).length;
  const pct = (n) => Math.round((n / Math.max(1, idx.length)) * 100);
  report.push([id, "OK",
    `${chapterList.length}ch ${idx.length}sec  he-title=${pct(heTitles)}%  he-body=${pct(heBodies)}%  ${figCount ? figCount + "fig  " : ""}${academy ? "academy" : "prose"}/${m.structure}`]);
}

console.log(`\nMIGRATION → data/books/`);
for (const [id, status, detail] of report) console.log(`  ${id.padEnd(8)} ${status.padEnd(5)} ${detail}`);
console.log(`\n  ${books} books · ${chapters} chapters · ${sections} sections`);
