import { LIFECYCLE } from "@/data/lifecycle";
import { txDetail } from "@/components/neo-shell/data/tx-detail";
const CODES = ["MB1A", "MB11", "MB1B", "MB1C", "MB31", "MIGO"];
for (const c of CODES) {
  const lc = LIFECYCLE[c];
  const d = txDetail(c);
  const j = d ? JSON.stringify(d) : "";
  console.log(`\n=== ${c}`);
  console.log("  lifecycle.ts   :", lc ? JSON.stringify({ status: lc.status, ecc: lc.ecc, s4: lc.s4, alt: lc.alt, impact: lc.impact }) : "(no entry)");
  console.log("  /neo/transactions page:", d ? "EXISTS" : "not generated");
  if (d) {
    console.log("  page mentions 'Obsolete'/'הוסר':", /Obsolete|הוסר/.test(j));
    console.log("  page mentions lifecycle alt   :", lc?.alt ? j.includes(lc.alt) : "n/a");
    for (const k of Object.keys(d)) {
      const v = d[k];
      if (typeof v === "string" && /legacy|Obsolete|הוסר|זמין|active|Active/i.test(v)) console.log(`    ${k}: ${v.slice(0, 150)}`);
    }
    if (d.status) console.log("    status field:", JSON.stringify(d.status).slice(0, 200));
    if (d.s4) console.log("    s4 field:", JSON.stringify(d.s4).slice(0, 300));
    if (d.lifecycle) console.log("    lifecycle field:", JSON.stringify(d.lifecycle).slice(0, 200));
  }
}
