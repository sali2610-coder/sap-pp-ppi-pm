// Builds the scope tree the AI workspace navigates.
//
// The source index files carry a `snippet` per section -- 4,314 of them. Shipping
// those to the browser to render a navigation tree would cost megabytes for text
// nobody reads in the sidebar. This strips them to the fields the tree actually
// renders, and splits per book so expanding one book fetches only that book.
//
// Output:
//   data/ai-tree/index.json   books + chapter/section counts (tiny, eager)
//   data/ai-tree/bookN.json   chapters -> sections (lazy, on expand)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "data", "library");
const OUT = path.join(ROOT, "data", "ai-tree");
mkdirSync(OUT, { recursive: true });

// Module tags let the tree group books the way the site already talks about SAP.
const MODULE = {
  book1: "PM", book2: "PP", book3: "MM", book4: "PP/DS", book5: "QM", book6: "EWM",
  book7: "Fiori", book8: "PM", book9: "PM", book10: "S&OP", book11: "S/4HANA",
};

const books = [];
for (let i = 1; i <= 11; i++) {
  const id = `book${i}`;
  const idxFile = path.join(SRC, `${id}-index.json`);
  const fullFile = path.join(SRC, `${id}-full.json`);
  if (!existsSync(idxFile)) continue;

  const idx = JSON.parse(readFileSync(idxFile, "utf8"));
  let title = id;
  // The reader's own chapter titles. Without these the tree labelled each
  // chapter with its FIRST SECTION's heading, so chapter 3 read as "Object
  // Information" (section 3.1) where the reader said "Configuring Generic
  // Functions" -- the same book describing itself two different ways.
  let chapterTitles = new Map();
  try {
    const full = JSON.parse(readFileSync(fullFile, "utf8"));
    title = full.book || id;
    for (const c of full.chapters || []) {
      const n = Number(c.n);
      if (Number.isFinite(n) && String(c.title || "").trim()) chapterTitles.set(n, String(c.title).trim());
    }
  } catch { /* title stays the id; labels fall back below */ }

  const byChapter = new Map();
  for (const e of idx) {
    if (!byChapter.has(e.ch)) byChapter.set(e.ch, []);
    byChapter.get(e.ch).push({
      id: String(e.id),
      // Books disagree on field names: most use {title, he}, book8 uses
      // {titleEn, titleHe}. Read both so no book loses its Hebrew headings.
      // Hebrew first — the site is Hebrew-first — then English, then the number.
      t: String(e.he || e.titleHe || "").trim() || String(e.title || e.titleEn || e.id),
      en: String(e.title || e.titleEn || ""),
    });
  }

  const chapters = [...byChapter.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([n, sections]) => ({
      n,
      // Prefer the reader's chapter title so both surfaces name it identically.
      // Fall back to the first section only when the source has no title.
      t: chapterTitles.get(n) || sections[0]?.t || `פרק ${n}`,
      sections,
    }));

  writeFileSync(path.join(OUT, `${id}.json`), JSON.stringify({ id, title, chapters }));
  books.push({
    id, title, module: MODULE[id] || "SAP",
    chapters: chapters.length,
    sections: idx.length,
    hebrew: idx.some((e) => e.he || e.titleHe),
  });
}

writeFileSync(path.join(OUT, "index.json"), JSON.stringify({ books }, null, 2));

const totalSections = books.reduce((n, b) => n + b.sections, 0);
const totalChapters = books.reduce((n, b) => n + b.chapters, 0);
console.log(`ai-tree: ${books.length} books, ${totalChapters} chapters, ${totalSections} sections`);
for (const b of books) {
  console.log(`  ${b.id.padEnd(7)} ${String(b.chapters).padStart(2)}ch ${String(b.sections).padStart(4)}sec  ${b.hebrew ? "he" : "EN-only"}  ${b.title.slice(0, 44)}`);
}
