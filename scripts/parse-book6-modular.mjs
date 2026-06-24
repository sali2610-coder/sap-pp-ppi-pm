// Modular extraction worker for Book #6 — "Integrating Warehouse Management in
// SAP S/4HANA" (SAP EWM, 1341 e-book pages; content pp19-549). Reads the PDF
// chapter-by-chapter, extracts the FULL raw English text (no truncation),
// strips PII/boilerplate, splits each chapter into its numbered sections,
// writes modular files under data/library/book6/. Mirrors the Book #4 pipeline.
// Hebrew authored by the model into he/.
//
// Run: node scripts/parse-book6-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Integrating Warehouse Management in SAP S4HANA __ Copy krgw-ebnu-yajz-smv6.pdf");
const OUT = path.join(ROOT, "data", "library", "book6");
const RAW = path.join(OUT, "raw");

// PDF page == printed page (verified: footer "-- N of 1341 --", ch1 opens p19,
// The Authors p550). Reflowable e-book: main content pp19-549.
const CHAPTERS = [
  { n: 1, title: "Introduction to Extended Warehouse Management", from: 19, to: 56 },
  { n: 2, title: "Production Planning", from: 57, to: 150 },
  { n: 3, title: "Quality Management", from: 151, to: 228 },
  { n: 4, title: "Transportation Management", from: 229, to: 319 },
  { n: 5, title: "Dock Appointment Scheduling", from: 320, to: 361 },
  { n: 6, title: "Warehouse Automation Systems", from: 362, to: 418 },
  { n: 7, title: "Yard Logistics", from: 419, to: 460 },
  { n: 8, title: "Environmental Health and Safety", from: 461, to: 486 },
  { n: 9, title: "Plant Maintenance", from: 487, to: 521 },
  { n: 10, title: "SAP Advanced Track and Trace for Pharmaceuticals", from: 522, to: 549 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Copy No\.\s*\S+/gi, "")
    .replace(/for personal use of[^\n]*/gi, "")
    .replace(/krgw-ebnu-yajz-smv6/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*1341\s*--/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitSections(n, text) {
  const re = new RegExp(`(?:^|\\n)\\s*(${n}(?:\\.\\d+){1,3})\\s+([A-Z][^\\n]{3,90})`, "g");
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

const manifest = { book: "Integrating Warehouse Management in SAP S/4HANA", pages: 1341, chapters: [] };
const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(FILE)) });

for (const ch of CHAPTERS) {
  const r = await p.getText({ first: ch.from, last: ch.to });
  const text = clean(r.text);
  const sections = splitSections(ch.n, text);
  const rec = { n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: text.length, sections: sections.length, text };
  fs.writeFileSync(path.join(RAW, `ch${ch.n}.json`), JSON.stringify(rec, null, 2));
  fs.writeFileSync(path.join(OUT, `ch${ch.n}.sections.json`), JSON.stringify({ n: ch.n, title: ch.title, sections }, null, 2));
  manifest.chapters.push({ n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: text.length, sections: sections.length });
  console.log(`✓ ch${ch.n} ${ch.title.slice(0, 40)} — pp ${ch.from}-${ch.to}, ${text.length} chars, ${sections.length} sections`);
}
await p.destroy?.();

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
const total = manifest.chapters.reduce((s, c) => s + c.chars, 0);
console.log(`\n✓ manifest written. total extracted: ${(total / 1000).toFixed(0)}k chars across ${manifest.chapters.length} chapters`);
