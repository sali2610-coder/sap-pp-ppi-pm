// Extract SAP technical identifiers (NOT prose) per chapter from Book 2 text —
// copyright-safe grounding for the transformative PP knowledge module.
// Output: data/library/pp-objects.json { [ch]: {tcodes,tables,programs,cds,fiori,bapis,idocs} }

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BOOK = JSON.parse(fs.readFileSync(path.join(ROOT, "public", "assets", "library", "book2", "text.json"), "utf8"));

// known PP/logistics tables to disambiguate from random uppercase tokens
const TABLE_SET = new Set([
  "MARA","MARC","MAKT","MAST","STKO","STPO","PLKO","PLPO","PLAS","MAPL","MKAL","CRHD","CRTX","CRCO","KAKO","RESB","RSDB",
  "AFKO","AFPO","AFVC","AFVV","AFRU","AUFK","JEST","JSTO","T399D","T438M","MDKP","MDTB","PBED","PBIM","PROP","KBED","KBKO",
  "RKPF","MSEG","MKPF","T001","T001W","MARV","MBEW","PLAF","COSS","COSP","T024D","TVARVC","RUNTIME","CKMLHD",
]);
const TABLE_RE = /\b[A-Z][A-Z0-9]{2,5}\b/g;
const TCODE_RE = /\b(?:CO|MD|MF|CS|CA|C2|MM|MC|OP|CM|MS|PP|CT|MB)\w?\d{1,3}[A-Z0-9]?\b|\bCOR[1-9A-Z]\b|\bCO1[15]N?\b|\bMD0[1-9]\b/g;
const PROG_RE = /\b(?:RM|SAP|RC|RW)[A-Z0-9_]{3,}\b/g;
const CDS_RE = /\b[CI]_[A-Za-z][A-Za-z0-9]+\b/g;
const FIORI_RE = /\bF\d{3,4}[A-Z]?\b/g;
const BAPI_RE = /\bBAPI_[A-Z0-9_]+\b/g;
const IDOC_RE = /\b(?:LOIPRO|MATMAS|BOMMAT|CLFMAS|CHRMAS|LOIROU|PROORD)\w*\b/g;

const uniq = (arr, cap = 40) => [...new Set(arr)].slice(0, cap);
const grab = (text, re) => uniq([...text.matchAll(re)].map((m) => m[0]));

const out = {};
for (const ch of BOOK.chapters) {
  const t = ch.text;
  const tables = grab(t, TABLE_RE).filter((x) => TABLE_SET.has(x));
  out[ch.n] = {
    tcodes: grab(t, TCODE_RE),
    tables,
    programs: grab(t, PROG_RE, 20),
    cds: grab(t, CDS_RE, 20),
    fiori: grab(t, FIORI_RE, 25),
    bapis: grab(t, BAPI_RE, 20),
    idocs: grab(t, IDOC_RE, 10),
  };
  const c = out[ch.n];
  console.log(`ch${ch.n}: ${c.tcodes.length} tcodes, ${c.tables.length} tables, ${c.fiori.length} fiori, ${c.bapis.length} bapis, ${c.idocs.length} idocs`);
}
fs.writeFileSync(path.join(ROOT, "data", "library", "pp-objects.json"), JSON.stringify(out, null, 2));
console.log("\n✓ data/library/pp-objects.json");
