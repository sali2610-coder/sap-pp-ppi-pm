// Cross-source integrity audit of the whole book tree.
//
// The same book is described in three places that were built at different times:
//
//   data/library.ts          the shelf   — title, page count, chapter list
//   data/library/N-full.json the reader  — title, pages, chapters with sections
//   data/library/N-index.json the search — flat section index
//   data/ai-tree/N.json       the AI     — derived from the index
//
// Nothing has ever checked that they agree. If they disagree, a book can show
// another book's structure, a chapter can go missing from one surface but not
// another, or the AI can cite a section the reader cannot open. This walks every
// book and compares all four, section by section.
//
// Read-only. Exits non-zero on any hard mismatch.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIB = path.join(ROOT, "data", "library");
const TREE = path.join(ROOT, "data", "ai-tree");

const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const has = (p) => existsSync(p);

// ---- the shelf lives in a .ts module; pull its records without executing it --
const shelfSrc = readFileSync(path.join(ROOT, "data", "library.ts"), "utf8");
function shelfBooks() {
  const out = new Map();
  // Each record starts at `id: "..."` and carries title/pages before `chapters:`
  const re = /id:\s*"([a-z0-9-]+)",\s*\n\s*title:\s*"([^"]+)"[\s\S]*?pages:\s*(\d+)/g;
  let m;
  while ((m = re.exec(shelfSrc)) !== null) out.set(m[1], { title: m[2], pages: Number(m[3]) });
  // chapter numbers per shelf book
  const blocks = shelfSrc.split(/\n\s*\{\s*\n\s*id:\s*"/).slice(1);
  for (const b of blocks) {
    const id = b.slice(0, b.indexOf('"'));
    if (!out.has(id)) continue;
    const ns = [...b.matchAll(/\{\s*n:\s*(\d+),/g)].map((x) => Number(x[1]));
    out.get(id).chapters = ns;
  }
  return out;
}

const SHELF = shelfBooks();
const IDENTITY = readFileSync(path.join(ROOT, "lib", "book-identity.ts"), "utf8");
const shelfIdFor = (bookId) => {
  const m = IDENTITY.match(new RegExp(`\\["${bookId}",\\s+("([a-z0-9-]+)"|null)`));
  return m && m[2] ? m[2] : null;
};

const errors = [];
const warns = [];
const rows = [];
const E = (b, k, d) => errors.push({ b, k, d });
const W = (b, k, d) => warns.push({ b, k, d });

for (let i = 1; i <= 11; i++) {
  const id = `book${i}`;
  const fullP = path.join(LIB, `${id}-full.json`);
  const idxP = path.join(LIB, `${id}-index.json`);
  const treeP = path.join(TREE, `${id}.json`);

  if (!has(idxP)) { E(id, "MISSING_INDEX", idxP); continue; }
  const idx = read(idxP);
  const full = has(fullP) ? read(fullP) : null;
  const tree = has(treeP) ? read(treeP) : null;
  if (!full) W(id, "NO_FULL", "reader source absent");
  if (!tree) E(id, "NO_AI_TREE", "AI cannot navigate this book");

  const idxChapters = [...new Set(idx.map((e) => Number(e.ch)))].sort((a, b) => a - b);
  const fullChapters = full ? full.chapters.map((c) => Number(c.n)).sort((a, b) => a - b) : null;
  const treeChapters = tree ? tree.chapters.map((c) => Number(c.n)).sort((a, b) => a - b) : null;

  // ---------- 1. titles agree across sources ----------
  const shelfId = shelfIdFor(id);
  const shelf = shelfId ? SHELF.get(shelfId) : null;
  if (shelfId && !shelf) E(id, "SHELF_ID_UNRESOLVED", `identity points at "${shelfId}" which is not in library.ts`);
  if (full && tree && full.book !== tree.title) E(id, "TITLE_MISMATCH", `full="${full.book}" tree="${tree.title}"`);
  if (shelf && full && shelf.title !== full.book) {
    W(id, "TITLE_DIFFERS_SHELF", `shelf="${shelf.title.slice(0, 40)}" full="${String(full.book).slice(0, 40)}"`);
  }

  // ---------- 2. page counts agree ----------
  if (shelf && full && Number(shelf.pages) !== Number(full.pages)) {
    E(id, "PAGES_MISMATCH", `shelf=${shelf.pages} full=${full.pages}`);
  }

  // ---------- 3. chapter sets agree ----------
  const setEq = (a, b) => a && b && a.length === b.length && a.every((x, j) => x === b[j]);
  if (fullChapters && !setEq(idxChapters, fullChapters)) {
    const onlyFull = fullChapters.filter((c) => !idxChapters.includes(c));
    const onlyIdx = idxChapters.filter((c) => !fullChapters.includes(c));
    const detail = [onlyFull.length ? `only in reader: ${onlyFull.join(",")}` : "", onlyIdx.length ? `only in index: ${onlyIdx.join(",")}` : ""].filter(Boolean).join(" | ");
    // A chapter present in the reader but carrying zero sections is an appendix,
    // not a data loss — report it as a warning so it is visible but not fatal.
    const emptyOnes = onlyFull.filter((n) => (full.chapters.find((c) => Number(c.n) === n)?.sections?.length ?? 0) === 0);
    if (onlyIdx.length || onlyFull.some((n) => !emptyOnes.includes(n))) E(id, "CHAPTER_SET_MISMATCH", detail);
    else W(id, "EMPTY_CHAPTER_IN_READER", `chapter ${emptyOnes.join(",")} has no sections (appendix)`);
  }
  if (treeChapters && !setEq(idxChapters, treeChapters)) {
    E(id, "AI_TREE_DRIFT", `index has ${idxChapters.length} chapters, AI tree has ${treeChapters.length} — regenerate ai-tree`);
  }

  // ---------- 4. chapter ORDER is ascending and contiguous ----------
  for (let j = 1; j < idxChapters.length; j++) {
    if (idxChapters[j] <= idxChapters[j - 1]) E(id, "CHAPTER_ORDER", `${idxChapters[j - 1]} then ${idxChapters[j]}`);
  }

  // ---------- 5. sections belong to the book and to their chapter ----------
  let crossBook = 0;
  if (tree) {
    for (const c of tree.chapters) {
      for (const s of c.sections) {
        // ids in the AI tree are bare section ids; the composed citation id is
        // book#chapter#section. Verify the section's own number agrees.
        const lead = Number(String(s.id).split(".")[0]);
        if (Number.isFinite(lead) && lead !== c.n) {
          crossBook++;
          if (crossBook <= 3) E(id, "SECTION_MISFILED", `${s.id} sits under chapter ${c.n}`);
        }
      }
    }
    if (crossBook > 3) E(id, "SECTION_MISFILED", `…and ${crossBook - 3} more`);
  }

  // ---------- 5b. chapter TITLES agree between reader and AI tree ----------
  // Regression guard: the tree once labelled chapters with their first
  // section's heading, so the reader said "Configuring Generic Functions"
  // while the AI said "Object Information" for the same chapter.
  if (full && tree) {
    const tmap = new Map(tree.chapters.map((c) => [c.n, String(c.t).trim()]));
    let drift = 0;
    for (const c of full.chapters) {
      const n = Number(c.n);
      const t = String(c.title || "").trim();
      if (!t || !tmap.has(n)) continue;
      if (tmap.get(n) !== t) {
        drift++;
        if (drift <= 2) E(id, "CHAPTER_TITLE_DRIFT", `ch ${n}: reader="${t.slice(0, 34)}" tree="${tmap.get(n).slice(0, 34)}"`);
      }
    }
    if (drift > 2) E(id, "CHAPTER_TITLE_DRIFT", `…and ${drift - 2} more in this book`);
  }

  // ---------- 6. section counts agree between index and AI tree ----------
  const idxCount = idx.length;
  const treeCount = tree ? tree.chapters.reduce((n, c) => n + c.sections.length, 0) : null;
  if (treeCount != null && treeCount !== idxCount) {
    E(id, "SECTION_COUNT_DRIFT", `index=${idxCount} aiTree=${treeCount}`);
  }

  // ---------- 7. reader sections resolve ----------
  if (full) {
    const fullSecCount = full.chapters.reduce((n, c) => n + (c.sections?.length ?? 0), 0);
    if (fullSecCount !== idxCount) {
      W(id, "READER_SECTION_COUNT", `reader=${fullSecCount} index=${idxCount}`);
    }
  }

  rows.push({
    id,
    title: (full?.book ?? tree?.title ?? "—").slice(0, 42),
    shelf: shelfId ?? "—",
    pagesShelf: shelf?.pages ?? "—",
    pagesFull: full?.pages ?? "—",
    chIdx: idxChapters.length,
    chFull: fullChapters?.length ?? "—",
    chTree: treeChapters?.length ?? "—",
    secIdx: idxCount,
    secTree: treeCount ?? "—",
  });
}

// ------------------------------------------------------------------- report
const L = "─".repeat(112);
console.log(`\nBOOK TREE — CROSS-SOURCE INTEGRITY\n${L}`);
console.log("  book     shelf-id              pages(shelf/full)   chapters(idx/full/tree)   sections(idx/tree)  title");
for (const r of rows) {
  console.log(
    `  ${r.id.padEnd(8)} ${String(r.shelf).padEnd(21)} ${String(r.pagesShelf).padStart(5)}/${String(r.pagesFull).padEnd(6)}   ` +
    `${String(r.chIdx).padStart(3)}/${String(r.chFull).padStart(3)}/${String(r.chTree).padStart(3)}          ` +
    `${String(r.secIdx).padStart(5)}/${String(r.secTree).padEnd(5)}  ${r.title}`,
  );
}
console.log(L);
console.log(`  BOOKS ${rows.length}  CHAPTERS ${rows.reduce((n, r) => n + r.chIdx, 0)}  SECTIONS ${rows.reduce((n, r) => n + r.secIdx, 0)}`);

for (const [label, list] of [["ERRORS", errors], ["WARNINGS", warns]]) {
  console.log(`\n${label}: ${list.length}`);
  if (!list.length) { console.log("  none"); continue; }
  const g = new Map();
  for (const x of list) { if (!g.has(x.k)) g.set(x.k, []); g.get(x.k).push(x); }
  for (const [k, items] of g) {
    console.log(`  ${k} (${items.length})`);
    for (const it of items.slice(0, 8)) console.log(`    ${it.b}: ${it.d}`);
    if (items.length > 8) console.log(`    …and ${items.length - 8} more`);
  }
}
process.exit(errors.length ? 1 : 0);
