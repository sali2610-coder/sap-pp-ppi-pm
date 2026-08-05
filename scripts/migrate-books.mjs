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
mkdirSync(OUT, { recursive: true });

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

/**
 * Books disagree on field names: most use {title, he}, book8 uses
 * {titleEn, titleHe}. Normalising here is the whole point — after migration
 * there is exactly one way to express a heading.
 */
const en = (e) => String(e.title ?? e.titleEn ?? "").trim();
const he = (e) => String(e.he ?? e.titleHe ?? "").trim();

let books = 0, chapters = 0, sections = 0;
const report = [];

for (let i = 1; i <= 11; i++) {
  const id = `book${i}`;
  const idxFile = path.join(LIB, `${id}-index.json`);
  const fullFile = path.join(LIB, `${id}-full.json`);
  if (!existsSync(idxFile)) { report.push([id, "SKIP", "no index"]); continue; }

  const idx = JSON.parse(readFileSync(idxFile, "utf8"));
  const full = existsSync(fullFile) ? JSON.parse(readFileSync(fullFile, "utf8")) : null;

  // The reader owns chapter titles. The tree used to invent them from the first
  // section, which is exactly the drift this file removes.
  const chapterTitle = new Map();
  const chapterSections = new Map();
  for (const c of full?.chapters ?? []) {
    const n = Number(c.n);
    if (!Number.isFinite(n)) continue;
    if (String(c.title ?? "").trim()) chapterTitle.set(n, String(c.title).trim());
    chapterSections.set(n, c.sections ?? []);
  }

  const byChapter = new Map();
  for (const e of idx) {
    const n = Number(e.ch);
    if (!byChapter.has(n)) byChapter.set(n, []);
    byChapter.get(n).push({
      id: String(e.id),
      title: { en: en(e), he: he(e) },
      ...(e.page != null ? { page: Number(e.page) } : {}),
      ...(e.snippet ? { snippet: String(e.snippet) } : {}),
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

  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify(book));
  books++;
  chapters += chapterList.length;
  sections += idx.length;
  const heCount = idx.filter((e) => he(e)).length;
  report.push([id, "OK", `${chapterList.length}ch ${idx.length}sec he=${Math.round((heCount / idx.length) * 100)}% ${m.structure}`]);
}

console.log(`\nMIGRATION → data/books/`);
for (const [id, status, detail] of report) console.log(`  ${id.padEnd(8)} ${status.padEnd(5)} ${detail}`);
console.log(`\n  ${books} books · ${chapters} chapters · ${sections} sections`);
