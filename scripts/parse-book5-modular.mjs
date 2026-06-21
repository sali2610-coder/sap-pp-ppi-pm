// Modular extraction worker for Book #5 — "Quality Management with SAP S/4HANA"
// (939 pp). Reads the PDF chapter-by-chapter, extracts the FULL raw English text
// (no truncation), strips PII/boilerplate, splits each chapter into its numbered
// sections, and writes modular files under data/library/book5/ — mirrors the
// Book #2 pipeline so the dual-language matrix grows chapter-by-chapter.
//
// Hebrew is authored by the model into data/library/book5/he/.
//
// Run: node scripts/parse-book5-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Quality Management with SAP S4HANA __ Copy bw76-fnz5-dphy-kgxt.pdf");
const OUT = path.join(ROOT, "data", "library", "book5");
const RAW = path.join(OUT, "raw");

// PDF page == printed page (verified: ch1 opens on PDF page 35). Back-matter
// (Appendix A) starts at p909, so ch20 ends at p908.
const CHAPTERS = [
  { n: 1, title: "Quality Management in SAP S/4HANA", from: 35, to: 56 },
  { n: 2, title: "Quality Planning", from: 57, to: 108 },
  { n: 3, title: "Quality Inspection", from: 109, to: 236 },
  { n: 4, title: "Integrating with Materials Management", from: 237, to: 280 },
  { n: 5, title: "Integrating with Production Planning", from: 281, to: 308 },
  { n: 6, title: "Integrating with SAP S/4HANA Sales", from: 309, to: 322 },
  { n: 7, title: "Integrating with Plant Maintenance", from: 323, to: 362 },
  { n: 8, title: "Integrating with Embedded Extended Warehouse Management", from: 363, to: 388 },
  { n: 9, title: "Batch Management", from: 389, to: 474 },
  { n: 10, title: "Sample Management", from: 475, to: 500 },
  { n: 11, title: "Quality Certificates", from: 501, to: 522 },
  { n: 12, title: "Quality Notification", from: 523, to: 584 },
  { n: 13, title: "Engineering Change Management", from: 585, to: 620 },
  { n: 14, title: "Audit Management", from: 621, to: 648 },
  { n: 15, title: "Stability Study", from: 649, to: 688 },
  { n: 16, title: "Failure Mode and Effects Analysis and Control Plan", from: 689, to: 754 },
  { n: 17, title: "Early Warning System", from: 755, to: 770 },
  { n: 18, title: "Reporting in SAP S/4HANA", from: 771, to: 824 },
  { n: 19, title: "Quality Control", from: 825, to: 854 },
  { n: 20, title: "Document Management System", from: 855, to: 908 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*939\s*--/g, "")
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

const manifest = { book: "Quality Management with SAP S/4HANA", pages: 939, chapters: [] };
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
