// Modular extraction worker for Book #7 — "SAP Fiori Apps for SAP S/4HANA: The
// Quick Reference Guide" (685 e-book pages; content pp25-608). App-catalog
// reference organized by module. Reads the PDF chapter-by-chapter, extracts the
// FULL raw English text, strips PII/boilerplate, splits each chapter into its
// numbered sections, writes modular files under data/library/book7/.
// Mirrors the Book #6 pipeline. Hebrew authored by the model into he/.
//
// Run: node scripts/parse-book7-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "SAP Fiori Apps for SAP S4HANA The Quick Reference Guide  __ Copy y2h3-b9ug-zf7r-54nk.pdf");
const OUT = path.join(ROOT, "data", "library", "book7");
const RAW = path.join(OUT, "raw");

// PDF page == printed page (footer "-- N of 685 --"; ch1 opens p25, The Authors
// p609). Front matter: Preface p7, Introduction p15.
const CHAPTERS = [
  { n: 1, title: "Financial Accounting", from: 25, to: 240 },
  { n: 2, title: "Controlling", from: 241, to: 288 },
  { n: 3, title: "Sales and Distribution", from: 289, to: 368 },
  { n: 4, title: "Inventory and Warehouse Management", from: 369, to: 396 },
  { n: 5, title: "Production Planning and Manufacturing", from: 397, to: 444 },
  { n: 6, title: "Plant Maintenance", from: 445, to: 464 },
  { n: 7, title: "Materials Management", from: 465, to: 554 },
  { n: 8, title: "Quality Management", from: 555, to: 568 },
  { n: 9, title: "Project System", from: 569, to: 576 },
  { n: 10, title: "Flexible Real Estate Management", from: 577, to: 584 },
  { n: 11, title: "Cross-Functional Apps", from: 585, to: 604 },
  { n: 12, title: "Additional Resources", from: 605, to: 608 },
];

function clean(text) {
  return (text || "")
    .replace(/\r/g, "")
    .replace(/Copy No\.\s*\S+/gi, "")
    .replace(/for personal use of[^\n]*/gi, "")
    .replace(/y2h3-b9ug-zf7r-54nk/gi, "")
    .replace(/peerly kazes[^\n]*/gi, "")
    .replace(/peerlyka@cbccom\.com/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.\n]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*685\s*--/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// App-catalog splitter. Each entry: "<App Name>\n(<App ID>)\nApplication Type:
// <type>\n<description>\nTransaction Code(s)\n<t-code>". Names may wrap 1-3 lines.
// Line-based: find each "(ID)" line immediately followed by "Application Type:",
// then walk backwards over the heading (title) lines to find the entry start.
// Section id = app ID; title = app name; body = name..next-name.
function looksLikeTitleLine(line) {
  const t = line.trim();
  if (!t) return false;                       // blank
  if (/^\d+$/.test(t)) return false;          // bare page number
  if (/^\d+\s+[A-Z]/.test(t)) return false;   // running header "1 Financial Accounting"
  if (/^Transaction Codes?$/i.test(t)) return false;
  if (/^Application Type:/i.test(t)) return false;
  if (/[.;:]$/.test(t)) return false;         // sentence/body line
  if (/\([A-Za-z0-9_]+\)$/.test(t)) return false; // already an (id) line
  if (t.length > 70) return false;            // body prose, not a heading
  return true;                                 // short Title-Case fragment
}

function splitSections(n, text) {
  const lines = text.split("\n");
  // char offset of the start of each line
  const off = [];
  let acc = 0;
  for (const ln of lines) { off.push(acc); acc += ln.length + 1; }

  // (ID) at end of a line; the next line begins the "Application Type:" entry.
  // Handles both "Name (ID)" (short) and "...wrapped name\n(ID)" layouts.
  const idLine = /\(([A-Za-z0-9_]+)\)\s*$/;
  const marks = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const mm = lines[i].match(idLine);
    if (!mm) continue;
    if (!/^Application Type:/i.test(lines[i + 1].trim())) continue;
    const id = mm[1];
    const appType = lines[i + 1].replace(/^\s*Application Type:\s*/i, "").trim();
    // same-line prefix before "(ID)" is the tail of the app name
    let prefix = lines[i].slice(0, lines[i].lastIndexOf("(")).trim();
    let start = i;
    const nameParts = [];
    if (prefix) nameParts.push(prefix);
    // walk back over wrapped title lines (cap at 3 total)
    for (let k = i - 1; k >= 0 && i - k <= 3; k--) {
      if (looksLikeTitleLine(lines[k])) { nameParts.unshift(lines[k].trim()); start = k; }
      else break;
    }
    const title = nameParts.join(" ").replace(/\s+/g, " ").trim() || id;
    marks.push({ id, title, appType, idx: off[start] });
  }
  // dedupe by id (keep first), order by position
  const seen = new Set();
  const uniq = marks.filter((mk) => (seen.has(mk.id) ? false : (seen.add(mk.id), true)));
  uniq.sort((a, b) => a.idx - b.idx);
  const sections = [];
  for (let i = 0; i < uniq.length; i++) {
    const s = uniq[i].idx;
    const e = i + 1 < uniq.length ? uniq[i + 1].idx : text.length;
    const body = text.slice(s, e).trim();
    if (body.length > 40) sections.push({ id: uniq[i].id, title: uniq[i].title, appType: uniq[i].appType, chars: body.length, text: body });
  }
  return sections;
}

fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(path.join(OUT, "he"), { recursive: true });

const manifest = { book: "SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide", pages: 685, chapters: [] };
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
