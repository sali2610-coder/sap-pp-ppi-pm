// Surface the authored pmu-textbook (Plant Maintenance Business User Guide) as
// Book 8 reader data. pmu-textbook is already complete authored Hebrew in the
// academy 18-facet LearningNode format (READ-ONLY auto-sync source — never edited
// here). This script COMPILES those .ts chapter modules into a self-contained
// book8-full.json + book8-index.json for the /library/book8 reader.
//
// No translation, no invention: every field is surfaced verbatim from the source.
// The pmu .ts files are pure data literals whose only import is `import type`
// (type-only, erasable) — we strip that + the `: TextbookChapter` annotation and
// dynamic-import the result as plain JS.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "data", "library", "pmu-textbook");
const OUTDIR = path.join(ROOT, "data", "library", "book8");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "book8-"));

fs.mkdirSync(OUTDIR, { recursive: true });

// Load one pmu chapter .ts as data by erasing the type-only syntax.
async function loadChapter(file) {
  const raw = fs.readFileSync(file, "utf8");
  const js = raw
    .split("\n")
    .filter((l) => !/^\s*import\s/.test(l)) // drop `import type {...}`
    .join("\n")
    .replace(/:\s*TextbookChapter\s*=/, " ="); // drop the type annotation
  const tmpFile = path.join(TMP, path.basename(file).replace(/\.ts$/, ".mjs"));
  fs.writeFileSync(tmpFile, js);
  const mod = await import(pathToFileURL(tmpFile).href);
  const exp = Object.values(mod).find((v) => v && typeof v === "object" && "subchapters" in v);
  if (!exp) throw new Error(`No chapter export in ${file}`);
  return exp;
}

// Flatten a LearningNode tree into ordered sections, carrying depth.
function flatten(node, depth, out) {
  const { children, ...rest } = node;
  out.push({ ...rest, depth });
  for (const c of children ?? []) flatten(c, depth + 1, out);
}

const chFiles = fs
  .readdirSync(SRC)
  .filter((f) => /^ch\d+\.ts$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

const chapters = [];
for (const f of chFiles) {
  const ch = await loadChapter(path.join(SRC, f));
  const sections = [];
  for (const sub of ch.subchapters) flatten(sub, 0, sections);
  chapters.push({
    n: ch.n,
    titleHe: ch.titleHe,
    titleEn: ch.titleEn,
    introHe: ch.introHe ?? "",
    sections,
  });
}

const totalSections = chapters.reduce((s, c) => s + c.sections.length, 0);

const out = {
  book: "Plant Maintenance with SAP S/4HANA — Business User Guide",
  titleHe: "אחזקת מפעל ב-SAP S/4HANA — מדריך למשתמש העסקי",
  module: "PM",
  source: "pmu-textbook (authored academy 18-facet, surfaced read-only)",
  chapters,
};
fs.writeFileSync(path.join(ROOT, "data", "library", "book8-full.json"), JSON.stringify(out, null, 2));

// manifest (chapter map) for parity with books 1-7
const manifest = {
  book: out.book,
  titleHe: out.titleHe,
  module: "PM",
  chapters: chapters.map((c) => ({ n: c.n, titleHe: c.titleHe, titleEn: c.titleEn, sections: c.sections.length })),
};
fs.writeFileSync(path.join(OUTDIR, "manifest.json"), JSON.stringify(manifest, null, 2));

// search index — one entry per section, with the SAP identifiers surfaced
const index = chapters.flatMap((c) =>
  c.sections.map((s) => ({
    ch: c.n,
    id: s.id,
    titleHe: s.titleHe,
    titleEn: s.titleEn,
    codes: [...(s.tcodes ?? []), ...(s.tables ?? []), ...(s.fiori ?? [])],
    snippet: (s.execHe ?? s.beginnerHe ?? "").slice(0, 260),
  })),
);
fs.writeFileSync(path.join(ROOT, "data", "library", "book8-index.json"), JSON.stringify(index, null, 2));

fs.rmSync(TMP, { recursive: true, force: true });

console.log(`✓ book8-full.json — ${chapters.length} chapters, ${totalSections} sections (authored Hebrew surfaced from pmu-textbook)`);
