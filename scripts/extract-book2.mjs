// Extract full text of Book #2 — "Production Planning with SAP S/4HANA" (1087pp)
// into public/assets/library/book2/text.json (per-chapter, cleaned, PII-stripped).
// This becomes the grounding context for the Gemini chat pilot.
//
// Run: node scripts/extract-book2.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "Production Planning with SAP S4HANA __ Copy f3hm-kx92-ct8v-7p4y.pdf");
const OUTDIR = path.join(ROOT, "public", "assets", "library", "book2");

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

fs.mkdirSync(OUTDIR, { recursive: true });
const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(FILE)) });
const out = { book: "Production Planning with SAP S/4HANA", pages: 1087, chapters: [] };

for (const ch of CHAPTERS) {
  const r = await p.getText({ first: ch.from, last: ch.to });
  const text = clean(r.text);
  out.chapters.push({ n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: text.length, text });
  console.log(`✓ ch${ch.n} ${ch.title} — pp${ch.from}-${ch.to}, ${text.length} chars`);
}
await p.destroy?.();

fs.writeFileSync(path.join(OUTDIR, "text.json"), JSON.stringify(out));
const total = out.chapters.reduce((s, c) => s + c.chars, 0);
console.log(`\n✓ public/assets/library/book2/text.json — ${out.chapters.length} chapters, ${(total / 1000).toFixed(0)}k chars`);
