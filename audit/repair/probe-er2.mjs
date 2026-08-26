import XLSX from "xlsx";
import path from "node:path";
const P = (f) => XLSX.utils.sheet_to_json(XLSX.readFile(path.join(process.cwd(), "docs", f)).Sheets["ER - Join Map"], { header: 1, defval: "", raw: false });

const pp = P("SAP_PPPI_ECC6_to_S4_Migration.xlsx").slice(2);
const RE = /FROM\s+([A-Z0-9_/]+)\s+JOIN\s+([A-Z0-9_/]+)/i;
let col1IsFrom = 0, col1IsJoin = 0, col1IsNeither = 0, noMatch = 0;
for (const r of pp) {
  const c1 = String(r[1] ?? "").trim(); if (!c1) continue;
  const m = String(r[2] ?? "").trim().match(RE);
  if (!m) { noMatch++; console.log("NO FROM..JOIN:", c1, "|", String(r[2]??"").slice(0,90)); continue; }
  const [, from, join] = [m[0], m[1].toUpperCase(), m[2].toUpperCase()];
  if (c1.toUpperCase() === from) col1IsFrom++;
  else if (c1.toUpperCase() === join) col1IsJoin++;
  else { col1IsNeither++; console.log("NEITHER:", c1, "|", m[0]); }
}
console.log("PP-PI  col1==FROM:", col1IsFrom, " col1==JOIN:", col1IsJoin, " neither:", col1IsNeither, " no FROM..JOIN:", noMatch);

const pm = P("SAP_PM_ECC6_to_S4_Migration.xlsx").slice(2);
console.log("\nPM header1:", JSON.stringify(P("SAP_PM_ECC6_to_S4_Migration.xlsx")[1]));
let pmSelf = 0, pmRows = 0, pmMismatch = 0;
for (const r of pm) {
  const child = String(r[1] ?? "").trim(); if (!child) continue;
  pmRows++;
  const parent = String(r[4] ?? "").trim();
  if (!parent || parent === child) { pmSelf++; console.log("PM SELF/EMPTY:", child, "|", parent, "|", String(r[7]??"").slice(0,80)); }
  const m = String(r[7] ?? "").trim().match(RE);
  if (m && (m[1].toUpperCase() !== child.toUpperCase() || m[2].toUpperCase() !== parent.toUpperCase())) {
    pmMismatch++;
    if (pmMismatch <= 6) console.log("PM MISMATCH: cols", child, "->", parent, " | join says", m[1], "->", m[2]);
  }
}
console.log("PM rows:", pmRows, "self/empty:", pmSelf, "col-vs-join mismatch:", pmMismatch);
