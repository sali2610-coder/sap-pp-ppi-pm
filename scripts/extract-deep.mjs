// Deep extraction for selected chapters: pull a rich multi-page block of the
// real configuration text + parameters/paths from the PDF, clean it, and merge
// into data/library-content.json (expanding those chapters from a 1-page scope
// to a deep technical excerpt). Hebrew is translated by hand into
// data/library-content-he.ts.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");

const TARGETS = [
  { bookId: "pm-business-user", n: 4, file: "Plant Maintenance with SAP S4HANA Business User Guide __ Copy 2n6k-erjm-sqvt-hpay.pdf", from: 151, to: 159 },
  { bookId: "pm-business-user", n: 5, file: "Plant Maintenance with SAP S4HANA Business User Guide __ Copy 2n6k-erjm-sqvt-hpay.pdf", from: 233, to: 241 },
  { bookId: "production-planning", n: 4, file: "Production Planning with SAP S4HANA __ Copy f3hm-kx92-ct8v-7p4y.pdf", from: 129, to: 137 },
  { bookId: "production-planning", n: 5, file: "Production Planning with SAP S4HANA __ Copy f3hm-kx92-ct8v-7p4y.pdf", from: 171, to: 179 },
];

function clean(text, maxLen = 9000) {
  let t = (text || "")
    .replace(/\r/g, "")
    .replace(/Personal Copy for [^.\n]*?@[^\s]+/gi, "") // strip reader watermark/email (PII)
    .replace(/©\s*\d{4}\s*by Rheinwerk Publishing[^-\n]*/gi, "")
    .replace(/--\s*\d+\s*of\s*\d+\s*--/g, "") // page markers
    .replace(/info@zarantech\.com|CALL\/WHATSAPP|EMAIL|\+1-515-309-7846/gi, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
  // second pass on the collapsed single-line string (tolerant)
  t = t
    .replace(/Personal Copy for[^@]*@\S+/gi, "")
    .replace(/\d{4} by Rheinwerk Publishing[^.]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  t = t.replace(/^\d+\s+Chapter\s+\d+\s+/i, "").replace(/^Chapter\s+\d+\s+/i, "");
  if (t.length > maxLen) {
    const cut = t.slice(0, maxLen);
    const lastDot = cut.lastIndexOf(". ");
    t = (lastDot > maxLen * 0.7 ? cut.slice(0, lastDot + 1) : cut) + " …";
  }
  return t;
}

const jsonPath = path.join(ROOT, "data", "library-content.json");
const content = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

for (const { bookId, n, file, from, to } of TARGETS) {
  const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(path.join(DOCS, file))) });
  const r = await p.getText({ first: from, last: to });
  const text = clean(r.text);
  content[bookId] = content[bookId] || {};
  content[bookId][String(n)] = text;
  console.log(`✓ ${bookId} ch${n}: pages ${from}-${to} -> ${text.length} chars`);
  await p.destroy?.();
}

fs.writeFileSync(jsonPath, JSON.stringify(content, null, 2));
console.log("\nappended deep content into data/library-content.json");
