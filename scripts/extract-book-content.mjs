// Deep ingestion: extract the REAL inner technical text of each chapter from
// the SAP PDFs in docs/ (a focused excerpt = the chapter's opening scope/intro
// pages). Writes data/library-content.json { [bookId]: { [chapterN]: text } }.
// English is verbatim from the PDF; Hebrew translation is authored in library.ts.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFParse } from "pdf-parse";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");

// bookId -> { file, chapters: [{ n, page }] }  (pages from the extracted TOC)
const TARGETS = {
  "config-pm": {
    file: "Configuring Plant Maintenance in SAP S4HANA __ Copy 8c2w-6zg4-uifn-jht9.pdf",
    chapters: [ {n:1,page:27},{n:2,page:79},{n:3,page:109},{n:4,page:169},{n:5,page:249},{n:6,page:415},{n:7,page:433},{n:9,page:623} ],
  },
  "pm-business-user": {
    file: "Plant Maintenance with SAP S4HANA Business User Guide __ Copy 2n6k-erjm-sqvt-hpay.pdf",
    chapters: [ {n:1,page:27},{n:2,page:55},{n:3,page:67},{n:4,page:151},{n:5,page:233},{n:6,page:297},{n:8,page:437},{n:10,page:569} ],
  },
  "production-planning": {
    file: "Production Planning with SAP S4HANA __ Copy f3hm-kx92-ct8v-7p4y.pdf",
    chapters: [ {n:3,page:75},{n:4,page:129},{n:5,page:171},{n:6,page:193},{n:7,page:277},{n:8,page:337},{n:9,page:397},{n:10,page:457},{n:11,page:545},{n:12,page:617},{n:13,page:671},{n:14,page:769},{n:15,page:837} ],
  },
  "pp-ds": {
    file: "PP-DS with SAP S4HANA __ Copy kysj-d27q-n3bt-whvm.pdf",
    chapters: [ {n:1,page:19},{n:2,page:43},{n:3,page:111},{n:4,page:175},{n:5,page:217},{n:6,page:343},{n:7,page:449},{n:8,page:471},{n:10,page:569},{n:11,page:603} ],
  },
  "quality-management": {
    file: "Quality Management with SAP S4HANA __ Copy bw76-fnz5-dphy-kgxt.pdf",
    chapters: [ {n:1,page:35},{n:2,page:57},{n:3,page:109},{n:4,page:237},{n:5,page:281},{n:6,page:309},{n:7,page:323},{n:9,page:389},{n:10,page:475},{n:11,page:501},{n:12,page:523},{n:13,page:585},{n:14,page:621},{n:15,page:649} ],
  },
  "sourcing-procurement": {
    file: "Sourcing and Procurement with SAP S4HANA __ Copy gz38-kvty-7wej-2i9b.pdf",
    chapters: [ {n:1,page:31},{n:2,page:51},{n:3,page:83},{n:4,page:103},{n:5,page:139},{n:6,page:187},{n:7,page:237},{n:9,page:361},{n:10,page:391},{n:11,page:419},{n:12,page:451},{n:13,page:525},{n:14,page:547},{n:15,page:593} ],
  },
  "fiori-apps": {
    file: "SAP Fiori Apps for SAP S4HANA The Quick Reference Guide  __ Copy y2h3-b9ug-zf7r-54nk.pdf",
    chapters: [ {n:1,page:25},{n:3,page:289},{n:4,page:369},{n:5,page:397},{n:7,page:465},{n:8,page:555},{n:9,page:569},{n:10,page:577},{n:11,page:585},{n:12,page:605} ],
  },
  "ibp-sop": {
    file: "Sales and Operations Planning with SAP IBP __ Copy 8u9n-5qxc-frpv-bwy3.pdf",
    chapters: [ {n:1,page:23},{n:2,page:51},{n:3,page:89},{n:4,page:137},{n:5,page:181},{n:6,page:225} ],
  },
  "warehouse-management": {
    file: "Integrating Warehouse Management in SAP S4HANA __ Copy krgw-ebnu-yajz-smv6.pdf",
    chapters: [ {n:1,page:33},{n:4,page:120},{n:6,page:200},{n:7,page:260},{n:8,page:300},{n:9,page:360} ],
  },
  "bridge-foundation": {
    file: "9f320f75348944ad9719a173d724b7b8.pdf",
    chapters: [ {n:1,page:8},{n:2,page:25},{n:3,page:45},{n:4,page:70},{n:5,page:95},{n:6,page:120},{n:7,page:140},{n:8,page:160},{n:9,page:178} ],
  },
};

// Clean a raw page slice into readable prose; cut at a sentence boundary.
function clean(text, maxLen = 1400) {
  let t = (text || "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s+/g, " ")
    .replace(/Personal Copy for[^@]*@\S+/gi, "") // reader watermark/email (PII)
    .replace(/\d{4} by Rheinwerk Publishing[^.]*\.?/gi, "")
    .replace(/,?\s*Boston \(MA\)/gi, "")
    .replace(/--\s*\d+\s*of\s*\d+\s*--/g, "")
    .replace(/info@zarantech\.com|CALL\/WHATSAPP|EMAIL|\+1-515-309-7846/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  // drop a leading "NN Chapter N Title" page-header echo
  t = t.replace(/^\d+\s+Chapter\s+\d+\s+/i, "").replace(/^Chapter\s+\d+\s+/i, "");
  t = t.replace(/\s+/g, " ").trim();
  if (t.length > maxLen) {
    const cut = t.slice(0, maxLen);
    const lastDot = cut.lastIndexOf(". ");
    t = (lastDot > maxLen * 0.6 ? cut.slice(0, lastDot + 1) : cut) + " …";
  }
  return t;
}

const out = {};
for (const [bookId, { file, chapters }] of Object.entries(TARGETS)) {
  const full = path.join(DOCS, file);
  if (!fs.existsSync(full)) {
    console.log(`✗ missing ${file}`);
    continue;
  }
  const p = new PDFParse({ data: new Uint8Array(fs.readFileSync(full)) });
  out[bookId] = {};
  for (const { n, page } of chapters) {
    try {
      const r = await p.getText({ first: page, last: page + 1 });
      out[bookId][n] = clean(r.text);
    } catch (e) {
      out[bookId][n] = "";
      console.log(`  ! ${bookId} ch${n}: ${e.message}`);
    }
  }
  const got = Object.values(out[bookId]).filter((x) => x && x.length > 80).length;
  console.log(`✓ ${bookId}: ${got}/${chapters.length} chapters with text`);
  await p.destroy?.();
}

fs.writeFileSync(path.join(ROOT, "data", "library-content.json"), JSON.stringify(out, null, 2));
console.log("\nwrote data/library-content.json");
