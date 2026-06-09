// Extract real chapter structure (TOC) from the SAP PDF library in docs/.
// Outputs data/library-raw.json: per book { file, title, pages, chapters[] }.
// Bounded to front-matter/TOC — a structural index, not full-text ingestion.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");

// Clean a SAP-Press-style filename into a real title.
function titleFromFile(f) {
  let t = f.replace(/\.pdf$/i, "").replace(/\s*__\s*Copy.*$/i, "").replace(/\s{2,}/g, " ").trim();
  if (/^9f320f75/.test(f)) t = "SAP S/4HANA Bridge Module (Consultant Foundation)";
  return t;
}

function parseChapters(text) {
  const lines = text.split("\n").map((s) => s.replace(/ /g, " ").trim());
  const out = [];
  const seen = new Set();
  for (const l of lines) {
    // "N <Title> <page>"  — top-level chapters only (1–2 digit chapter no.)
    const m = l.match(/^(\d{1,2})\s+(.{5,72}?)\s+\.{0,}\s*(\d{2,4})$/);
    if (m) {
      const n = Number(m[1]);
      const title = m[2].replace(/\.{2,}/g, "").replace(/\s{2,}/g, " ").trim();
      const page = Number(m[3]);
      if (n >= 1 && n <= 20 && page >= 10 && page <= 2000 && title.length > 4 && !/^\d/.test(title)) {
        if (!seen.has(n)) {
          seen.add(n);
          out.push({ n, title, page });
        }
      }
    }
  }
  return out.sort((a, b) => a.n - b.n).slice(0, 14);
}

// First substantive paragraph (real text) — skips legal/publisher boilerplate.
function overview(text) {
  const blocks = text
    .split(/\n{2,}|\n(?=[A-Z])/)
    .map((b) => b.replace(/\s+/g, " ").trim())
    .filter((b) => b.length > 140 && b.length < 900)
    .filter((b) => !/ISBN|Library of Congress|Rheinwerk|copyright|all rights reserved|Cataloging|edition \d{4}|Suite \d|@/i.test(b));
  return (blocks[0] || "").slice(0, 600);
}

const files = fs.readdirSync(DOCS).filter((f) => /\.pdf$/i.test(f));
const books = [];

for (const f of files) {
  try {
    const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(path.join(DOCS, f))) });
    const r = await p.getText({ first: 60 });
    const chapters = parseChapters(r.text || "");
    const intro = overview(r.text || "");
    books.push({ file: f, title: titleFromFile(f), pages: r.total, chapters, overview: intro });
    console.log(`✓ ${titleFromFile(f)} — ${r.total}pg, ${chapters.length} ch, overview:${intro.length}c`);
    await p.destroy?.();
  } catch (e) {
    console.log(`✗ ${f}: ${e.message}`);
  }
}

fs.writeFileSync(path.join(ROOT, "data", "library-raw.json"), JSON.stringify(books, null, 2));
console.log(`\nwrote data/library-raw.json — ${books.length} books`);
