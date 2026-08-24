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
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
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
  //
  // KEYED BY CHAPTER **AND** SECTION ID, NOT BY SECTION ID ALONE.
  //
  //   A section id is unique within a chapter, not within a book. book7 is
  //   "SAP Fiori Apps for S/4HANA — Quick Reference" and its sections are keyed
  //   by Fiori app ID, so the same app legitimately appears under two
  //   categories: F2918 in ch1 and ch11, F0870A in ch3 and ch4, and 18 more.
  //   With an id-only Map the second write overwrote the first, both index rows
  //   then read back the SAME body, and one whole section's prose — 20 of them,
  //   7,289 Hebrew and 30,035 Latin characters — became unreachable in the
  //   reader. Nothing was deleted; it was overwritten in the migration.
  //
  //   The two occurrences are DIFFERENT sections with the same id, so they are
  //   kept as two. `uniqueBody` below is the fallback for the case where the
  //   index and the source disagree about which chapter a section is in, and it
  //   deliberately holds only ids that occur exactly once — a fallback must
  //   never be able to hand back the wrong body.
  const body = new Map();
  const bodyCount = new Map();
  const uniqueBody = new Map();
  for (const c of full?.chapters ?? []) {
    const n = Number(c.n);
    if (!Number.isFinite(n)) continue;
    // Chapter headings are spelled differently per source: ten books use a
    // single English `title`, book8 uses `titleEn` + `titleHe`. Reading only
    // `title` is why book8's ten chapters arrived untitled and rendered as
    // "פרק 1..פרק 10" while the real Hebrew headings sat unread in the source.
    const cEn = String(c.title ?? c.titleEn ?? "").trim();
    const cHe = String(c.titleHe ?? "").trim();
    if (cEn || cHe) chapterTitle.set(n, { en: cEn, he: cHe });
    chapterSections.set(n, c.sections ?? []);
    for (const s of c.sections ?? []) {
      if (!s?.id) continue;
      const sid = String(s.id);
      const b = sectionBody(s);
      if (!b) continue;
      body.set(`${n} ${sid}`, b);
      bodyCount.set(sid, (bodyCount.get(sid) ?? 0) + 1);
      uniqueBody.set(sid, b);
    }
  }
  // Drop every id that occurred more than once, so the fallback can only ever
  // answer for a section whose identity is unambiguous.
  for (const [sid, n] of bodyCount) if (n > 1) uniqueBody.delete(sid);

  const snippets = new Map();
  for (const e of idx) if (e.snippet) snippets.set(String(e.id), String(e.snippet));

  const byChapter = new Map();
  for (const e of idx) {
    const n = Number(e.ch);
    if (!byChapter.has(n)) byChapter.set(n, []);
    const sid = String(e.id);
    const b = body.get(`${n} ${sid}`) ?? uniqueBody.get(sid);
    byChapter.get(n).push({
      id: String(e.id),
      title: { en: en(e), he: he(e) },
      ...(e.page != null ? { page: Number(e.page) } : {}),
      ...(b ? { body: b } : {}),   // stripped into a shard below
    });
  }

  // RECOVER CHAPTERS THE SECTION EXTRACTOR DROPPED.
  //
  // byChapter is built from {id}-index.json, and the index only ever lists
  // SECTIONS. A chapter whose sections failed to extract therefore has no index
  // rows, so it vanishes from the spine, from the shards and from the reader —
  // silently, because nothing downstream knows it should have been there.
  //
  // That happened exactly once across the 11 books: book7 chapter 12,
  // "Additional Resources" (pp. 605-608). Its sections.json is empty and its
  // entry in book7-full.json is empty, but data/library/book7/raw/ch12.json
  // holds 8,936 characters of real text carrying three numbered headings.
  //
  // So: any chapter that has raw text but produced no index rows is re-split
  // here, from its own headings. Nothing is summarised, reworded or invented —
  // the body between two headings is carried verbatim, page furniture and all,
  // exactly as the working extractor leaves it everywhere else.
  //
  // By construction this cannot touch a chapter that already has sections.
  const rawDir = path.join(LIB, id, "raw");
  if (existsSync(rawDir)) {
    for (const f of readdirSync(rawDir).filter((x) => /^ch\d+\.json$/.test(x))) {
      const rc = JSON.parse(readFileSync(path.join(rawDir, f), "utf8"));
      const n = Number(rc.n);
      if (!Number.isFinite(n) || byChapter.has(n)) continue;
      const text = String(rc.text ?? "");
      if (!text.trim()) continue;

      // Headings look like "12.1 SAP Resources" on their own line. One of them
      // may be a running page header — it sits right after a page number or a
      // "©" mark — and the first NON-furniture occurrence of each id wins.
      const heads = [];
      for (const m2 of text.matchAll(/^[ \t]*(\d+\.\d+(?:\.\d+)?)[ \t]+(.+?)[ \t]*$/gm)) {
        const before = text.slice(Math.max(0, m2.index - 12), m2.index);
        if (/(?:©\s*|\b\d{3})\s*\n\s*$/.test(before)) continue;
        if (heads.some((h) => h.id === m2[1])) continue;
        heads.push({ id: m2[1], title: m2[2].trim(), at: m2.index });
      }
      if (!heads.length) {
        report.push([id, "RAW-KEPT", `ch${n} has text but no headings — left out`]);
        continue;
      }

      const recovered = heads.map((h, k) => {
        const end = k + 1 < heads.length ? heads[k + 1].at : text.length;
        const t = text.slice(h.at, end).replace(/\s+$/, "");
        return {
          id: h.id,
          title: { en: h.title, he: "" },
          // Same normalisation the working sections get: whitespace collapsed,
          // every other character preserved.
          body: { format: "prose", en: t.split(/\s+/).filter(Boolean).join(" "), he: "" },
        };
      });
      byChapter.set(n, recovered);
      if (!chapterTitle.has(n)) chapterTitle.set(n, { en: String(rc.title ?? ""), he: "" });
      report.push([id, "RECOVERED", `ch${n} "${rc.title}" -> ${recovered.length} sections from raw`]);
    }
  }

  /* ---- CHAPTER INTRODUCTIONS -------------------------------------------
     Every SAP PRESS chapter opens with the author telling you what it covers,
     before the first numbered section. The extractor starts AT that first
     heading, and everything downstream is keyed by section id, so this passage
     had no id and never reached the reader — 185,233 characters across 100
     chapters in 9 books.

     It is carried as a CHAPTER-LEVEL field, never as a section. Inventing an
     id like "9.0" would add 100 headings the books do not have and would move
     every section count, progress percentage and parity number in the product.

     THE BOUNDARY IS NOT A GUESS. The intro is the text before the FIRST
     line-start occurrence of the first section's id. Later occurrences are
     running page headers and cross-references, and they all sit AFTER the
     intro has ended, so they cannot move it.

     The one real risk is a chapter that opens with its own inline contents
     list — then the first occurrence is a list entry, not the heading. That is
     detected (almost no prose between the first two occurrences) and those
     chapters are SKIPPED rather than guessed. Same for book7's catalogue and
     book11, whose first section ids never appear at line start.

     Nothing is summarised, reworded or translated. Page furniture is stripped
     the way it is stripped nowhere else in this file — only bare page numbers,
     "Chapter N" lines and the chapter title line, which are the three things
     that are provably not prose. */
  const readRaw = (bid, n) => {
    const f = path.join(LIB, bid, "raw", `ch${n}.json`);
    return existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : null;
  };
  const introOf = (n) => {
    const raw = readRaw(id, n);
    const text = String(raw?.text ?? "");
    const secs = byChapter.get(n) ?? [];
    if (!text.trim() || !secs.length) return null;
    const sid = String(secs[0].id);
    const re = new RegExp(`^\\s*${sid.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|$)`, "gm");
    const hits = [...text.matchAll(re)];
    if (!hits.length) return null;
    if (hits.length > 1) {
      const between = text.slice(hits[0].index + hits[0][0].length, hits[1].index).split(/\s+/).filter(Boolean).join(" ");
      if (between.length < 400) return null;      // inline contents list — skip
    }
    const title = String(raw.title ?? "").trim();
    const prose = text
      .slice(0, hits[0].index)
      .split("\n")
      .filter((l) => l.trim())
      .filter((l) => !/^\s*\d{1,4}\s*$/.test(l))
      .filter((l) => !/^\s*Chapter \d+\s*$/.test(l))
      .filter((l) => l.trim() !== title)
      .join(" ")
      .split(/\s+/).filter(Boolean).join(" ");
    if (prose.length < 80) return null;
    // rule 7: never duplicate something the chapter body already contains.
    const body = secs.map((x) => String(x.body?.en ?? "")).join(" ");
    if (prose.slice(0, 120) && body.includes(prose.slice(0, 120))) return null;
    return prose;
  };

  const chapterList = [...byChapter.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([n, secs]) => ({
      n,
      title: { en: chapterTitle.get(n)?.en || "", he: chapterTitle.get(n)?.he || "" },
      // English-only: none of the 100 has a Hebrew translation in the source,
      // and none is invented here.
      ...(introOf(n) ? { intro: { en: introOf(n), he: "" } } : {}),
      ...(chapterSections.get(n)?.[0]?.page != null ? { startPage: Number(chapterSections.get(n)[0].page) } : {}),
      sections: secs,
    }));

  const m = META[id] ?? { module: "SAP", kind: "reference", structure: "narrative", publisher: "" };
  const book = {
    id,
    schemaVersion: 1,
    meta: {
      // Only book8 ships a Hebrew book title today. The rest are left empty
      // rather than transliterated: an invented Hebrew title would be a claim
      // about the publisher's own naming that no source supports.
      title: { en: String(full?.book ?? id), he: String(full?.titleHe ?? "").trim() },
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
      // A recovered chapter has no index row, so it has no snippet either.
      // Derive one from its own body using the same rule the index used —
      // the first 260 characters, hard cut — so a recovered section previews
      // exactly like every other section instead of previewing as nothing.
      const snip = snippets.get(sec.id)
        ?? (sec.body?.en ? String(sec.body.en).slice(0, 260) : undefined);
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
