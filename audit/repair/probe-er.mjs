import XLSX from "xlsx";
import path from "node:path";
const wb = XLSX.readFile(path.join(process.cwd(), "docs", "SAP_PPPI_ECC6_to_S4_Migration.xlsx"));
const sh = wb.Sheets["ER - Join Map"];
const rows = XLSX.utils.sheet_to_json(sh, { header: 1, defval: "", raw: false });
console.log("total rows:", rows.length);
console.log("HEADER 0:", JSON.stringify(rows[0]));
console.log("HEADER 1:", JSON.stringify(rows[1]));
const body = rows.slice(2);
console.log("body:", body.length);
let bad = 0;
body.forEach((r, i) => {
  const child = String(r[1] ?? "").trim();
  const join = String(r[2] ?? "").trim();
  const m = join.match(/JOIN\s+([A-Z0-9_/]+)/i);
  const parent = m ? m[1] : "";
  if (!child) return;
  if (!parent || parent === child) {
    bad++;
    console.log(`BAD #${bad} row${i + 3}: c0=${JSON.stringify(String(r[0]??"").slice(0,40))} c1=${JSON.stringify(child)} c2=${JSON.stringify(join.slice(0,110))} c3=${JSON.stringify(String(r[3]??"").slice(0,50))}`);
  }
});
console.log("BAD TOTAL:", bad, "of", body.filter((r)=>String(r[1]??"").trim()).length);
