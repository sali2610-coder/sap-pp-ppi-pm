// Modular extraction worker for Book #3 — "Sourcing and Procurement with SAP
// S/4HANA" (709 pp). Reads the PDF chapter-by-chapter, extracts the FULL raw
// English text (no truncation), strips PII/boilerplate, splits each chapter
// into its numbered sections, and writes modular files under
// data/library/book3/ — mirrors the Book #5 (QM) pipeline so the dual-language
// matrix grows chapter-by-chapter.
//
// Hebrew is authored by the model into data/library/book3/he/.
//
// Run: node scripts/parse-book3-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Sourcing and Procurement with SAP S4HANA __ Copy gz38-kvty-7wej-2i9b.pdf");
const OUT = path.join(ROOT, "data", "library", "book3");
const RAW = path.join(OUT, "raw");

// PDF page == printed page (verified: ch1 opens on PDF page 31, footer "-- N of
// 709 --"). Back-matter (The Author) starts at p691, so ch18 ends at p690.
const CHAPTERS = [
  { n: 1, title: "Introduction to Sourcing and Procurement", from: 31, to: 50 },
  { n: 2, title: "Implementation Options", from: 51, to: 82 },
  { n: 3, title: "Organizational Structure", from: 83, to: 102 },
  { n: 4, title: "Master Data", from: 103, to: 138 },
  { n: 5, title: "Operational Procurement", from: 139, to: 186 },
  { n: 6, title: "Automated and Direct Procurement", from: 187, to: 236 },
  { n: 7, title: "Inventory Management", from: 237, to: 326 },
  { n: 8, title: "Contract and Scheduling Agreement Management", from: 327, to: 360 },
  { n: 9, title: "Enterprise Contract Management and Assembly", from: 361, to: 390 },
  { n: 10, title: "External Sourcing", from: 391, to: 418 },
  { n: 11, title: "Product Sourcing", from: 419, to: 450 },
  { n: 12, title: "Invoice and Payables Management", from: 451, to: 524 },
  { n: 13, title: "Supplier Management", from: 525, to: 546 },
  { n: 14, title: "Centralized Procurement", from: 547, to: 592 },
  { n: 15, title: "Sourcing and Procurement Analytics", from: 593, to: 617 },
  { n: 16, title: "Integrating SAP S/4HANA with SAP Signavio, SAP Ariba, SAP Business Network, and SAP Fieldglass", from: 618, to: 660 },
  { n: 17, title: "Customizing the User Interface", from: 661, to: 684 },
  { n: 18, title: "Conclusion", from: 685, to: 690 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*709\s*--/g, "")
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

const manifest = { book: "Sourcing and Procurement with SAP S/4HANA", pages: 709, chapters: [] };
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
