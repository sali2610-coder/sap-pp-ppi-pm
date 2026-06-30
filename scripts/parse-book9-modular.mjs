// Extraction worker for Book #9 — "Plant Maintenance with SAP S/4HANA: Business
// User Guide" (669 pp). Reads the PDF chapter-by-chapter, extracts the FULL raw
// English text, strips PII/boilerplate, splits each chapter into numbered
// sections, and writes modular files under data/library/book9/. Mirrors
// scripts/parse-book1-modular.mjs.
//
// Does NOT translate — Hebrew is authored into data/library/book9/he/.
// Run: node scripts/parse-book9-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Plant Maintenance with SAP S4HANA Business User Guide __ Copy 2n6k-erjm-sqvt-hpay.pdf");
const OUT = path.join(ROOT, "data", "library", "book9");
const RAW = path.join(OUT, "raw");

// physical page == printed page (offset 0, verified)
const CHAPTERS = [
  { n: 1, title: "Introduction to Plant Maintenance", from: 27, to: 54 },
  { n: 2, title: "Organizational Structures", from: 55, to: 66 },
  { n: 3, title: "Structuring of Technical Systems", from: 67, to: 150 },
  { n: 4, title: "Work Order Cycle", from: 151, to: 232 },
  { n: 5, title: "Preventive Maintenance", from: 233, to: 296 },
  { n: 6, title: "Other Business Processes", from: 297, to: 374 },
  { n: 7, title: "Integrating Applications from Other Departments", from: 375, to: 436 },
  { n: 8, title: "Plant Maintenance Controlling", from: 437, to: 494 },
  { n: 9, title: "New Information Technologies", from: 495, to: 568 },
  { n: 10, title: "Usability", from: 569, to: 630 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*669\s*--/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Split a chapter into numbered sections: "4.1 Title", "4.1.2 Title", etc.
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

const manifest = { book: "Plant Maintenance with SAP S/4HANA: Business User Guide", pages: 669, chapters: [] };
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
const total = manifest.chapters.reduce((s, c) => s + c.chars, 0);
const secs = manifest.chapters.reduce((s, c) => s + c.sections, 0);
console.log(`\n✓ manifest written. ${(total / 1000).toFixed(0)}k chars, ${secs} sections across ${manifest.chapters.length} chapters`);
