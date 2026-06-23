// Modular extraction worker for Book #4 — "PP/DS with SAP S/4HANA" (639 pp,
// 2nd ed., Mahesh Babu MG). Reads the PDF chapter-by-chapter, extracts the FULL
// raw English text (no truncation), strips PII/boilerplate, splits each chapter
// into its numbered sections, writes modular files under data/library/book4/.
// Mirrors the Book #3/#5 pipeline. Hebrew authored by the model into he/.
//
// Run: node scripts/parse-book4-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "PP-DS with SAP S4HANA __ Copy kysj-d27q-n3bt-whvm.pdf");
const OUT = path.join(ROOT, "data", "library", "book4");
const RAW = path.join(OUT, "raw");

// PDF page == printed page (verified: footer "-- N of 639 --", TOC page 7 ==
// PDF page 7). Appendices start p611, so ch11 ends at p610.
const CHAPTERS = [
  { n: 1, title: "Introduction to PP/DS with SAP S/4HANA", from: 19, to: 42 },
  { n: 2, title: "Master Data", from: 43, to: 110 },
  { n: 3, title: "Configuration", from: 111, to: 174 },
  { n: 4, title: "Data Transfer for Transaction Data", from: 175, to: 216 },
  { n: 5, title: "Production Planning", from: 217, to: 342 },
  { n: 6, title: "Detailed Scheduling", from: 343, to: 448 },
  { n: 7, title: "The Alert Monitor", from: 449, to: 470 },
  { n: 8, title: "Advanced PP/DS Features", from: 471, to: 546 },
  { n: 9, title: "SAP Digital Supply Chain Management, edition for SAP S/4HANA", from: 547, to: 568 },
  { n: 10, title: "Administering PP/DS with SAP S/4HANA", from: 569, to: 602 },
  { n: 11, title: "Migration to Embedded PP/DS", from: 603, to: 610 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Copy No\.\s*\S+/gi, "")
    .replace(/Personal Copy for[^\n]*/gi, "")
    .replace(/for personal use of\s+[^\n]+\n[^\n@]*@\S+/gi, "")
    .replace(/peerly\s*kazes/gi, "")
    .replace(/peerlyka@cbccom\.com/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*639\s*--/g, "")
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

const manifest = { book: "PP/DS with SAP S/4HANA", pages: 639, chapters: [] };
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
