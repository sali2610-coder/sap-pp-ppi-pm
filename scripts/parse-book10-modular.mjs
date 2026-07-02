// Extraction worker for Book #10 — "Sales and Operations Planning with SAP IBP"
// (923 pp). Reads the PDF chapter-by-chapter, extracts the FULL raw English text,
// strips PII/boilerplate, splits each chapter into numbered sections, and writes
// modular files under data/library/book10/. Mirrors parse-book9-modular.mjs.
//
// Does NOT translate — Hebrew is authored into data/library/book10/he/.
// Run: node scripts/parse-book10-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Sales and Operations Planning with SAP IBP __ Copy 8u9n-5qxc-frpv-bwy3.pdf");
const OUT = path.join(ROOT, "data", "library", "book10");
const RAW = path.join(OUT, "raw");

// physical page ranges (resolved from TOC + body probing)
const CHAPTERS = [
  { n: 1, title: "Introduction to Sales and Operations Planning", from: 28, to: 73 },
  { n: 2, title: "SAP IBP Model and Navigation", from: 74, to: 105 },
  { n: 3, title: "Demand Planning", from: 106, to: 141 },
  { n: 4, title: "Unconstrained Supply Planning", from: 142, to: 209 },
  { n: 5, title: "Constrained Supply Planning", from: 210, to: 244 },
  { n: 6, title: "Consolidation", from: 245, to: 269 },
  { n: 7, title: "Collaboration and Management by Exception", from: 270, to: 298 },
  { n: 8, title: "Planning Simulations", from: 299, to: 320 },
  { n: 9, title: "Process Management", from: 321, to: 353 },
  { n: 10, title: "Configuring SAP IBP for Sales and Operations", from: 354, to: 404 },
  { n: 11, title: "Building Planning Views", from: 405, to: 533 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*923\s*--/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitSections(n, text) {
  const re = new RegExp(`(?:^|\\n)\\s*(${n}(?:\\.\\d+){1,3})\\s+([A-Z][^\\n]{3,80})`, "g");
  const all = [];
  let m;
  while ((m = re.exec(text))) all.push({ id: m[1], title: m[2].trim(), idx: m.index });
  const firstById = new Map();
  for (const mk of all) if (!firstById.has(mk.id)) firstById.set(mk.id, mk);
  const marks = [...firstById.values()].sort((a, b) => a.idx - b.idx);
  const sections = [];
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].idx;
    const end = i + 1 < marks.length ? marks[i + 1].idx : text.length;
    const body = text.slice(start, end).trim();
    if (body.length > 60) sections.push({ id: marks[i].id, title: marks[i].title, chars: body.length, text: body });
  }
  return sections;
}

fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(path.join(OUT, "he"), { recursive: true });

const manifest = { book: "Sales and Operations Planning with SAP IBP", pages: 923, chapters: [] };
const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(FILE)) });

for (const ch of CHAPTERS) {
  const r = await p.getText({ first: ch.from, last: ch.to });
  const text = clean(r.text);
  const sections = splitSections(ch.n, text);
  const rec = { n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: text.length, sections: sections.length, text };
  fs.writeFileSync(path.join(RAW, `ch${ch.n}.json`), JSON.stringify(rec, null, 2));
  fs.writeFileSync(path.join(OUT, `ch${ch.n}.sections.json`), JSON.stringify({ n: ch.n, title: ch.title, sections }, null, 2));
  manifest.chapters.push({ n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: text.length, sections: sections.length });
  console.log(`✓ ch${ch.n} ${ch.title} — pp ${ch.from}-${ch.to}, ${text.length} chars, ${sections.length} sections`);
}
await p.destroy?.();

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
const secs = manifest.chapters.reduce((s, c) => s + c.sections, 0);
console.log(`\n✓ manifest written. ${manifest.chapters.length} chapters, ${secs} sections`);
