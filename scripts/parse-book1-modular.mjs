// Autonomous extraction worker for Book #1 — "Configuring Plant Maintenance in
// SAP S/4HANA" (729 pp). Reads the PDF chapter-by-chapter, extracts the FULL
// raw English text (no truncation), strips PII/boilerplate, splits each chapter
// into its numbered sections, and writes modular files under data/library/book1/
// so nothing hits a memory/token ceiling.
//
// NOTE: this worker does NOT translate — no translation engine exists in a
// standalone script. Hebrew is authored by the model into data/library/book1/he/.
//
// Run: node scripts/parse-book1-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Configuring Plant Maintenance in SAP S4HANA __ Copy 8c2w-6zg4-uifn-jht9.pdf");
const OUT = path.join(ROOT, "data", "library", "book1");
const RAW = path.join(OUT, "raw");

const CHAPTERS = [
  { n: 1, title: "SAP Projects in Plant Maintenance", from: 27, to: 78 },
  { n: 2, title: "Configuring Organizational Structures", from: 79, to: 108 },
  { n: 3, title: "Configuring Generic Functions", from: 109, to: 168 },
  { n: 4, title: "Configuring the Structure of Technical Systems", from: 169, to: 248 },
  { n: 5, title: "Configuring the Work Order Cycle", from: 249, to: 414 },
  { n: 6, title: "Configuring Preventive Maintenance", from: 415, to: 432 },
  { n: 7, title: "Configuring Additional Business Processes", from: 433, to: 580 },
  { n: 8, title: "SAP Fiori Launchpad Configuration", from: 581, to: 622 },
  { n: 9, title: "Usability", from: 623, to: 729 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*729\s*--/g, "")
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
  // keep only the FIRST occurrence of each section id (page-header echoes repeat it)
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

const manifest = { book: "Configuring Plant Maintenance in SAP S/4HANA", pages: 729, chapters: [] };
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
console.log(`\n✓ manifest written. total extracted: ${(total / 1000).toFixed(0)}k chars across ${manifest.chapters.length} chapters`);
