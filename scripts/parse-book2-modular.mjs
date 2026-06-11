// Modular extraction worker for Book #2 — "Production Planning with SAP S/4HANA"
// (1087 pp). Reads the PDF chapter-by-chapter, extracts the FULL raw English text
// (no truncation), strips PII/boilerplate, splits each chapter into its numbered
// sections, and writes modular files under data/library/book2/ — mirrors the
// Book #1 pipeline so the dual-language matrix grows chapter-by-chapter.
//
// NOTE: this worker does NOT translate — no translation engine exists in a
// standalone script. Hebrew is authored by the model into data/library/book2/he/.
//
// Run: node scripts/parse-book2-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Production Planning with SAP S4HANA __ Copy f3hm-kx92-ct8v-7p4y.pdf");
const OUT = path.join(ROOT, "data", "library", "book2");
const RAW = path.join(OUT, "raw");

// Page ranges mirror scripts/extract-book2.mjs (the chat-grounding extractor).
const CHAPTERS = [
  { n: 1, title: "Introduction to Production Planning in SAP S/4HANA", from: 37, to: 58 },
  { n: 2, title: "Organizational Structure in SAP S/4HANA", from: 59, to: 74 },
  { n: 3, title: "Discrete Manufacturing Configuration", from: 75, to: 128 },
  { n: 4, title: "Process Manufacturing Configuration", from: 129, to: 170 },
  { n: 5, title: "Repetitive Manufacturing Configuration", from: 171, to: 192 },
  { n: 6, title: "Production Planning for Discrete Manufacturing", from: 193, to: 276 },
  { n: 7, title: "Production Planning for Process Manufacturing", from: 277, to: 336 },
  { n: 8, title: "Production Planning for Repetitive Manufacturing", from: 337, to: 396 },
  { n: 9, title: "Kanban", from: 397, to: 456 },
  { n: 10, title: "Batch Management", from: 457, to: 544 },
  { n: 11, title: "Sales and Operations Planning", from: 545, to: 616 },
  { n: 12, title: "Demand Management", from: 617, to: 670 },
  { n: 13, title: "Material Requirements Planning", from: 671, to: 768 },
  { n: 14, title: "Demand-Driven Replenishment", from: 769, to: 836 },
  { n: 15, title: "Predictive Material and Resource Planning", from: 837, to: 1087 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*1087\s*--/g, "")
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

const manifest = { book: "Production Planning with SAP S/4HANA", pages: 1087, chapters: [] };
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
