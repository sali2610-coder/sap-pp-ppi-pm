// Extraction worker for Book #11 — "Prerequisites for SAP S/4HANA End-to-End
// Implementation Training" (ZaranTech Foundation, 193 pp, 9 chapters).
//
// This ebook has NO numbered subsections. Sections are delimited by the running
// header printed on each page immediately above the "info@zarantech.com" footer.
// We split each chapter into sections by collapsing consecutive identical running
// headers, filtering footer/content noise, and assigning synthetic IDs chN.k.
//
// Does NOT translate — Hebrew is authored into data/library/book11/he/.
// Run: node scripts/parse-book11-modular.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FILE = path.join(ROOT, "docs", "9f320f75348944ad9719a173d724b7b8.pdf");
const OUT = path.join(ROOT, "data", "library", "book11");
const RAW = path.join(OUT, "raw");

const BOOK = "Prerequisites for SAP S/4HANA End-to-End Implementation Training";
const PAGES = 193;

// chapter start pages (resolved from body probing); each chapter runs up to the
// page before the next chapter starts. Ch9 absorbs the Conclusion (182-193).
const CHAPTERS = [
  { n: 1, title: "Understanding Modern Enterprises and Business Functions", from: 3, to: 24 },
  { n: 2, title: "From Functions to Business Processes", from: 25, to: 43 },
  { n: 3, title: "Why ERP Exists and What Problems It Solves", from: 44, to: 59 },
  { n: 4, title: "ERP Concepts and the SAP Ecosystem", from: 60, to: 82 },
  { n: 5, title: "System Landscapes, Clients, and Project Roles", from: 83, to: 104 },
  { n: 6, title: "SAP GUI and SAP Fiori – Navigating the SAP World", from: 105, to: 124 },
  { n: 7, title: "SAP Terminology and Structures for New Consultants", from: 125, to: 147 },
  { n: 8, title: "From End User to Implementation Consultant", from: 148, to: 164 },
  { n: 9, title: "Learning Strategy, Readiness Check, and Next Steps", from: 165, to: 193 },
];

const FOOTER_LINES = new Set(["EMAIL", "CALL/WHATSAPP"]);

// strip footer/boilerplate from a page/section body
function clean(text, header) {
  let t = (text || "").replace(/\r/g, "");
  t = t
    .replace(/-{2}\s*\d+\s*of\s*193\s*-{2}/g, "")
    .replace(/info@zarantech\.com/gi, "")
    .replace(/www\.zarantech\.com/gi, "")
    .replace(/\+1-515-309-7846\s*\(USA\)/gi, "")
    .replace(/^\s*EMAIL\s*$/gim, "")
    .replace(/^\s*CALL\/WHATSAPP\s*$/gim, "");
  if (header) {
    // remove repeated running-header occurrences
    const esc = header.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    t = t.replace(new RegExp(`^\\s*${esc}\\s*$`, "gim"), "");
  }
  return t
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// a running header line is a valid section title if it looks like a heading
function isTitle(line) {
  const h = (line || "").trim();
  if (h.length < 6 || h.length > 78) return false;
  if (FOOTER_LINES.has(h)) return false;
  if (/[.:,;]$/.test(h)) return false;          // content lines end in punctuation
  if (!/^[A-Z]/.test(h)) return false;          // headings start uppercase
  if (/^Chapter\s+\d/i.test(h)) return false;   // chapter banner
  if (/^\d/.test(h)) return false;
  return true;
}

function norm(s) {
  return s.toLowerCase().replace(/[‐-―]/g, "-").replace(/\s+/g, " ").trim();
}

fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(path.join(OUT, "he"), { recursive: true });

const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(FILE)) });
const full = (await p.getText()).text || "";
await p.destroy?.();

// split full text into pages[n] using the "-- N of 193 --" markers
const pages = {};
{
  const re = /-{2}\s*(\d+)\s*of\s*193\s*-{2}/g;
  const marks = [];
  let m;
  while ((m = re.exec(full))) marks.push({ n: Number(m[1]), idx: m.index, end: re.lastIndex });
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].end;
    const stop = i + 1 < marks.length ? marks[i + 1].idx : full.length;
    pages[marks[i].n] = full.slice(start, stop);
  }
}

// running header for a page = last non-empty line before the footer email
function pageHeader(pt) {
  const idx = pt.indexOf("info@zarantech.com");
  const scope = idx > 0 ? pt.slice(0, idx) : pt;
  const lines = scope.split("\n").map((s) => s.trim()).filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i--) {
    if (isTitle(lines[i])) return lines[i];
  }
  return "";
}

const manifest = { book: BOOK, pages: PAGES, chapters: [] };

for (const ch of CHAPTERS) {
  // per-page header runs
  const runs = [];
  for (let pg = ch.from; pg <= ch.to; pg++) {
    const pt = pages[pg] || "";
    const h = pageHeader(pt);
    if (!h) {
      // page with no detectable header: append to previous run
      if (runs.length) runs[runs.length - 1].pages.push(pg);
      continue;
    }
    const last = runs[runs.length - 1];
    if (last && norm(last.title) === norm(h)) last.pages.push(pg);
    else runs.push({ title: h, pages: [pg] });
  }

  // build sections from runs
  const sections = [];
  let k = 0;
  for (const run of runs) {
    const body = clean(run.pages.map((pg) => pages[pg] || "").join("\n"), run.title);
    if (body.length < 80) continue;
    k += 1;
    const id = `${ch.n}.${k}`;
    sections.push({ id, title: run.title, chars: body.length, text: body });
  }

  const chText = clean(
    Array.from({ length: ch.to - ch.from + 1 }, (_, i) => pages[ch.from + i] || "").join("\n"),
    null,
  );
  fs.writeFileSync(path.join(RAW, `ch${ch.n}.json`), JSON.stringify({ n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: chText.length, sections: sections.length, text: chText }, null, 2));
  fs.writeFileSync(path.join(OUT, `ch${ch.n}.sections.json`), JSON.stringify({ n: ch.n, title: ch.title, sections }, null, 2));
  manifest.chapters.push({ n: ch.n, title: ch.title, pages: [ch.from, ch.to], chars: chText.length, sections: sections.length });
  console.log(`✓ ch${ch.n} ${ch.title} — pp ${ch.from}-${ch.to}, ${chText.length} chars, ${sections.length} sections`);
}

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
const secs = manifest.chapters.reduce((s, c) => s + c.sections, 0);
console.log(`\n✓ manifest written. ${manifest.chapters.length} chapters, ${secs} sections`);
