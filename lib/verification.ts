// Repository Verification Engine — classifies every entity Verified / Partially
// Verified / Needs Verification, and statically detects invented links, weak
// mappings, duplicates and suspicious FM/BAdI mappings. Pure functions over data.

import { ALL_TABLES } from "@/data/sapData";
import { TRANSACTIONS } from "@/data/transactions";
import { TCODE_DIRECTORY } from "@/data/tcode-directory";
import { FUNCTION_INTEL } from "@/data/function-intel";
import { listFuncs, classifyFunc } from "@/lib/object-intel";
import { CDS_VIEWS } from "@/data/cds-map";
import { EXITS } from "@/data/exits";
import { SAP_NOTES } from "@/data/sap-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { SOLUTIONS } from "@/data/solutions";
import { OIC_OBJECTS } from "@/lib/cross-links";

export type VClass = "Verified" | "Partially Verified" | "Needs Verification";
export interface VRow { kind: string; total: number; verified: number; partial: number; needs: number }

const tableSet = new Set(ALL_TABLES.map((t) => t.tableName));
const fnSet = new Set(listFuncs());
const incSet = new Set(INCIDENTS.map((i) => i.slug));
// suspicious FM/BAdI name patterns (likely dataset-normalized / custom / uncertain)
const SUSPICIOUS = /(^CRAP_|_ZF_|^CO_ZF_|^CO_BT_|^ISU_|^CARO_|^ISCHED_|^PPCC1$|^BOMMAT$|Control Recipe)/i;

export function classifyRows(): VRow[] {
  const funcs = listFuncs();
  const fnV = funcs.filter((f) => FUNCTION_INTEL[f] && !FUNCTION_INTEL[f].inferred).length;
  const fnP = 0;
  const fnN = funcs.length - fnV;
  const bapi = funcs.filter((f) => classifyFunc(f) === "BAPI");
  const fm = funcs.filter((f) => classifyFunc(f) === "FM");
  const idoc = funcs.filter((f) => classifyFunc(f) === "IDoc");
  const kindFn = (arr: string[]) => ({ v: arr.filter((f) => FUNCTION_INTEL[f] && !FUNCTION_INTEL[f].inferred).length, n: arr.filter((f) => !(FUNCTION_INTEL[f] && !FUNCTION_INTEL[f].inferred)).length });
  const b = kindFn(bapi), m = kindFn(fm), id = kindFn(idoc);
  const exitV = EXITS.filter((e) => !e.inferred).length; // named, not bench → Partially
  const exitN = EXITS.filter((e) => e.inferred).length;
  const noteV = SAP_NOTES.filter((n) => n.noteRef).length;
  const noteP = SAP_NOTES.length - noteV;
  const dirCount = TCODE_DIRECTORY.filter((t) => !TRANSACTIONS.find((x) => x.code.toUpperCase() === t.code.toUpperCase())).length;
  const deepV = TRANSACTIONS.filter((t) => !t.inferred).length;
  const deepP = TRANSACTIONS.filter((t) => t.inferred).length;
  return [
    { kind: "T-Codes", total: deepV + deepP + dirCount, verified: deepV + dirCount, partial: deepP, needs: 0 },
    { kind: "Tables", total: ALL_TABLES.length, verified: ALL_TABLES.length, partial: 0, needs: 0 },
    { kind: "BAPIs", total: bapi.length, verified: b.v, partial: 0, needs: b.n },
    { kind: "Function Modules", total: fm.length, verified: m.v, partial: 0, needs: m.n },
    { kind: "IDocs", total: idoc.length, verified: id.v, partial: 0, needs: id.n },
    { kind: "CDS Views", total: CDS_VIEWS.length, verified: CDS_VIEWS.length, partial: 0, needs: 0 },
    { kind: "User Exits / BAdIs", total: EXITS.length, verified: 0, partial: exitV, needs: exitN },
    { kind: "SAP Notes", total: SAP_NOTES.length, verified: noteV, partial: noteP, needs: 0 },
  ];
}

export interface Finding { type: string; severity: "high" | "med" | "low"; items: string[] }
export function findings(): Finding[] {
  // invented / orphan links
  const incOrphan = INCIDENTS.flatMap((i) => i.tables.filter((t) => /^[A-Z][A-Z0-9_]+$/.test(t) && !tableSet.has(t)).map((t) => `${i.slug}→${t}`));
  const solBapiOrphan = SOLUTIONS.flatMap((s) => s.bapis.filter((bp) => /^[A-Z]/.test(bp) && !fnSet.has(bp)).map((bp) => `${s.slug}→${bp}`));
  const noteOrphan = SAP_NOTES.flatMap((n) => (n.relatedIncidents || []).filter((s) => !incSet.has(s)).map((s) => `${n.slug}→${s}`));
  // duplicates
  const tcCount: Record<string, number> = {};
  [...TRANSACTIONS.map((t) => t.code.toUpperCase()), ...TCODE_DIRECTORY.map((t) => t.code.toUpperCase())].forEach((c) => (tcCount[c] = (tcCount[c] || 0) + 1));
  const dupTc = Object.entries(tcCount).filter(([, n]) => n > 1).map(([c]) => c);
  const incCount: Record<string, number> = {};
  INCIDENTS.forEach((i) => (incCount[i.slug] = (incCount[i.slug] || 0) + 1));
  const dupInc = Object.entries(incCount).filter(([, n]) => n > 1).map(([s]) => s);
  // suspicious FM / BAdI
  const suspFn = listFuncs().filter((f) => SUSPICIOUS.test(f) || (FUNCTION_INTEL[f]?.inferred));
  const suspExit = EXITS.filter((e) => e.inferred).map((e) => e.name);
  return [
    { type: "Invented / orphan links (תקלה→טבלה לא קיימת)", severity: "high", items: incOrphan },
    { type: "Weak mappings (Solution→BAPI לא במאגר)", severity: "med", items: solBapiOrphan },
    { type: "Orphan note refs (Note→תקלה לא קיימת)", severity: "med", items: noteOrphan },
    { type: "Duplicate transactions (deep∩directory)", severity: "low", items: dupTc },
    { type: "Duplicate object slugs (incidents)", severity: "high", items: dupInc },
    { type: "Suspicious FM mappings (תלוי-גרסה/custom)", severity: "med", items: suspFn },
    { type: "Suspicious BAdI/Exit mappings (inferred)", severity: "med", items: suspExit },
  ];
}
