// Structural validation of the whole book library.
//
// The tree the reader and the AI both navigate is only as trustworthy as the
// data underneath it. This checks that every book expresses the SAME logical
// shape — Book > Metadata > Chapter > Section — and reports every place a book
// deviates, rather than letting each one quietly parse its own way.
//
// Read-only. Prints a report and exits non-zero if a hard error is found.
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIB = path.join(ROOT, "data", "library");
const BOOKS = Array.from({ length: 11 }, (_, i) => `book${i + 1}`);

const err = [];   // breaks the standard
const warn = [];  // deviates, tolerable
const rows = [];

const add = (list, book, kind, detail) => list.push({ book, kind, detail });

// A title is "broken" if it is empty, is only a number, ends mid-word with an
// ellipsis, or is a bare fragment that clearly lost its head during parsing.
const brokenTitle = (t) => {
  const s = String(t ?? "").trim();
  if (!s) return "empty";
  if (/^[\d.]+$/.test(s)) return "numeric-only";
  if (/[…]$|\.\.\.$/.test(s)) return "truncated";
  if (s.length < 3) return "too-short";
  if (/^[a-z]/.test(s) && !/^[a-z]+\s/.test(s)) return "lowercase-fragment";
  return null;
};

for (const id of BOOKS) {
  const idxFile = path.join(LIB, `${id}-index.json`);
  const fullFile = path.join(LIB, `${id}-full.json`);

  if (!existsSync(idxFile)) { add(err, id, "MISSING_INDEX", `${id}-index.json not found`); continue; }

  let idx, full = null;
  try { idx = JSON.parse(readFileSync(idxFile, "utf8")); }
  catch (e) { add(err, id, "PARSE_ERROR", `index: ${e.message.slice(0, 60)}`); continue; }
  if (existsSync(fullFile)) {
    try { full = JSON.parse(readFileSync(fullFile, "utf8")); }
    catch (e) { add(err, id, "PARSE_ERROR", `full: ${e.message.slice(0, 60)}`); }
  } else add(warn, id, "MISSING_FULL", `${id}-full.json not found`);

  if (!Array.isArray(idx)) { add(err, id, "SHAPE", "index is not an array"); continue; }

  // ---- metadata ----
  const title = full?.book ?? null;
  const pages = full?.pages ?? null;
  if (!title) add(err, id, "NO_TITLE", "book title missing from -full.json");
  if (pages == null) add(warn, id, "NO_PAGES", "page count missing");

  // ---- chapters ----
  const chapters = [...new Set(idx.map((e) => e.ch))].sort((a, b) => a - b);
  const declaredChapters = Array.isArray(full?.chapters) ? full.chapters.length : null;

  if (!chapters.length) { add(err, id, "NO_CHAPTERS", "index yields no chapters"); continue; }
  if (chapters[0] !== 1) add(err, id, "STARTS_MID_HIERARCHY", `first chapter is ${chapters[0]}, expected 1`);

  for (let n = 1; n <= chapters[chapters.length - 1]; n++) {
    if (!chapters.includes(n)) add(err, id, "MISSING_CHAPTER", `chapter ${n} absent (has 1..${chapters[chapters.length - 1]})`);
  }
  if (declaredChapters != null && declaredChapters !== chapters.length) {
    add(warn, id, "CHAPTER_COUNT_MISMATCH", `-full declares ${declaredChapters}, index has ${chapters.length}`);
  }

  // ---- sections ----
  // Books do not agree on field names: most use {title, he}, book8 uses
  // {titleEn, titleHe}. Normalising here is the point of the audit — the
  // divergence is reported below rather than silently accepted.
  const schema = idx.some((e) => e.titleHe != null || e.titleEn != null) ? "titleEn/titleHe" : "title/he";
  if (schema !== "title/he") add(err, id, "SCHEMA_DIVERGENCE", `uses {${schema}} while the other books use {title, he}`);
  const titleOf = (e) => (schema === "title/he" ? e.title : e.titleEn) ?? "";
  const heOf = (e) => (schema === "title/he" ? e.he : e.titleHe) ?? "";

  const seen = new Map();
  let broken = 0, misfiled = 0, he = 0;

  for (const e of idx) {
    const sid = String(e.id ?? "").trim();
    if (!sid) { add(err, id, "SECTION_NO_ID", `chapter ${e.ch} has a section with no id`); continue; }

    // duplicate ids
    if (seen.has(sid)) {
      add(err, id, "DUPLICATE_ID", `${sid} appears ${seen.get(sid) + 1}×`);
      seen.set(sid, seen.get(sid) + 1);
    } else seen.set(sid, 1);

    // a section must live under the chapter its number declares
    const lead = Number(String(sid).split(".")[0]);
    if (Number.isFinite(lead) && lead !== e.ch) { misfiled++; add(err, id, "SECTION_WRONG_CHAPTER", `${sid} filed under chapter ${e.ch}`); }

    const b = brokenTitle(titleOf(e));
    if (b) { broken++; if (broken <= 3) add(warn, id, "BROKEN_TITLE", `${sid}: ${b} — ${JSON.stringify(String(titleOf(e)).slice(0, 40))}`); }
    if (String(heOf(e)).trim()) he++;
  }
  if (broken > 3) add(warn, id, "BROKEN_TITLE", `…and ${broken - 3} more in this book`);

  // Hebrew coverage — the site is Hebrew-first; a book with none is an outlier.
  const hePct = Math.round((he / idx.length) * 100);
  if (hePct === 0) add(err, id, "NO_HEBREW", "0% of sections carry a Hebrew heading");
  else if (hePct < 90) add(warn, id, "PARTIAL_HEBREW", `${hePct}% of sections have Hebrew`);

  // ---- per-chapter section continuity ----
  for (const ch of chapters) {
    const secs = idx.filter((e) => e.ch === ch).map((e) => String(e.id));
    if (!secs.length) add(err, id, "EMPTY_CHAPTER", `chapter ${ch} has no sections`);
    // top-level numbering within the chapter should not skip: 3.1, 3.2, 3.3…
    const tops = [...new Set(secs.filter((s) => /^\d+\.\d+$/.test(s)).map((s) => Number(s.split(".")[1])))].sort((a, b) => a - b);
    for (let i = 1; i < tops.length; i++) {
      if (tops[i] !== tops[i - 1] + 1) add(warn, id, "SECTION_GAP", `chapter ${ch}: ${ch}.${tops[i - 1]} → ${ch}.${tops[i]}`);
    }
  }

  rows.push({ id, title: title || "—", pages: pages ?? "—", chapters: chapters.length, sections: idx.length, hePct });
}

// ------------------------------------------------------------------ report
const line = "─".repeat(96);
console.log(`\nLIBRARY VALIDATION\n${line}`);
console.log("  book     ch   sec   he%   pages  title");
for (const r of rows) {
  console.log(`  ${r.id.padEnd(8)}${String(r.chapters).padStart(3)}${String(r.sections).padStart(6)}${String(r.hePct).padStart(6)}${String(r.pages).padStart(7)}  ${String(r.title).slice(0, 46)}`);
}

const totals = rows.reduce((a, r) => ({ ch: a.ch + r.chapters, sec: a.sec + r.sections }), { ch: 0, sec: 0 });
console.log(`${line}`);
console.log(`  BOOKS ${rows.length}   CHAPTERS ${totals.ch}   SECTIONS ${totals.sec}`);

const group = (list) => {
  const m = new Map();
  for (const x of list) {
    if (!m.has(x.kind)) m.set(x.kind, []);
    m.get(x.kind).push(x);
  }
  return m;
};

for (const [label, list] of [["ERRORS", err], ["WARNINGS", warn]]) {
  console.log(`\n${label}: ${list.length}`);
  if (!list.length) { console.log("  none"); continue; }
  for (const [kind, items] of group(list)) {
    console.log(`  ${kind} (${items.length})`);
    for (const it of items.slice(0, 6)) console.log(`    ${it.book}: ${it.detail}`);
    if (items.length > 6) console.log(`    …and ${items.length - 6} more`);
  }
}

const outliers = [...new Set(err.map((e) => e.book))];
console.log(`\nNON-CONFORMING BOOKS: ${outliers.length ? outliers.join(", ") : "none"}`);
process.exit(err.length ? 1 : 0);
