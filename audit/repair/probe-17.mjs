import { LIFECYCLE } from "@/data/lifecycle";
import { txDetail, txDetailCodes } from "@/components/neo-shell/data/tx-detail";
const have = new Set(txDetailCodes().map((c) => c.toUpperCase()));
const rows = [];
for (const [code, L] of Object.entries(LIFECYCLE)) {
  if (L.s4 !== false) continue;
  const d = have.has(code) ? txDetail(code) : null;
  rows.push({
    code,
    lc_status: L.status,
    lc_alt: L.alt || "",
    lc_simplification: L.simplification || "",
    lc_fiori: L.fiori || "",
    lc_impact: L.impact || "",
    lc_migration: (L.migration || "").slice(0, 90),
    neo_page: !!d,
    neo_disposition: d?.s4?.disposition ?? "",
    neo_note: (d?.s4?.note ?? "").slice(0, 110),
    neo_trust: d?.s4?.trust ?? "",
    neo_risk: d?.s4?.risk ?? "",
  });
}
rows.sort((a, b) => a.code.localeCompare(b.code));
console.log(JSON.stringify(rows, null, 1));
console.log("TOTAL:", rows.length, "| with NEO page:", rows.filter(r=>r.neo_page).length, "| without:", rows.filter(r=>!r.neo_page).map(r=>r.code).join(","));
