// Unified entity lookup for the Hover Intelligence System (SapTip).
// Given a raw SAP name (table / T-Code / BAPI / FM / IDoc / CDS), returns a
// compact tip: what / module / ECC-vs-S4 / link — sourced from the existing
// authored layers. No fabrication: `verified` flags curated vs inferred data.

import { tableByName } from "@/lib/knowledge-graph";
import { listTcodes, tcodeIntel, classifyFunc, cleanFunc, funcHref } from "@/lib/object-intel";
import { cdsByView } from "@/data/cds-map";
import { fnIntel } from "@/data/function-intel";

export type TipKind = "table" | "tcode" | "bapi" | "idoc" | "fm" | "cds";

export interface EntityTip {
  name: string;
  kind: TipKind;
  kindHe: string;
  he: string;        // short "what"
  module?: string;
  ecc?: string;
  s4?: string;
  href: string;
  verified: boolean; // true = curated authored detail, false = inferred from dataset
}

const KIND_HE: Record<TipKind, string> = {
  table: "טבלה", tcode: "טרנזקציה", bapi: "BAPI", idoc: "IDoc", fm: "Function Module", cds: "CDS View",
};

let _tcodeSet: Set<string> | null = null;
const tcodeSet = () => (_tcodeSet ??= new Set(listTcodes()));

export function lookupEntity(raw: string): EntityTip | null {
  if (!raw) return null;
  const name = raw.trim();
  if (!name) return null;

  // 1) Table (exact, by transparent-table name)
  const t = tableByName(name);
  if (t) {
    return { name, kind: "table", kindHe: KIND_HE.table, he: t.descriptionHe || "", module: t.module, href: `/object/${encodeURIComponent(name)}`, verified: true };
  }

  // 2) T-Code
  const up = name.toUpperCase();
  if (tcodeSet().has(up)) {
    const ti = tcodeIntel(up);
    const mods = ti?.modules.join(" · ");
    return { name: up, kind: "tcode", kindHe: KIND_HE.tcode, he: ti && ti.tables.length ? `טרנזקציה — ${ti.tables.length} טבלאות משויכות` : "טרנזקציה", module: mods, href: `/tcode/${encodeURIComponent(up)}`, verified: true };
  }

  // 3) CDS View
  const cds = cdsByView(name);
  if (cds) {
    return { name, kind: "cds", kindHe: KIND_HE.cds, he: cds.he, module: cds.module, ecc: "כמעט לא קיים ב-ECC (Open SQL / Views קלאסיים)", s4: "מודל הקריאה המרכזי של S/4HANA", href: `/cds/${encodeURIComponent(name)}`, verified: true };
  }

  // 4) Function object (BAPI / FM / IDoc) — rich detail if curated
  const clean = cleanFunc(name);
  const fk = classifyFunc(clean); // "BAPI" | "IDoc" | "FM"
  const kind: TipKind = fk === "BAPI" ? "bapi" : fk === "IDoc" ? "idoc" : "fm";
  const intel = fnIntel(clean);
  if (intel) {
    return { name: clean, kind, kindHe: KIND_HE[kind], he: intel.what, module: intel.module, ecc: intel.ecc, s4: intel.s4, href: funcHref(clean), verified: true };
  }
  // function name shape but no curated detail → inferred tip (honest gap marker)
  if (/^(BAPI_|RFC_)/i.test(clean) || /_/.test(clean)) {
    return { name: clean, kind, kindHe: KIND_HE[kind], he: "מידע חסר במאגר — נדרש אימות מול SE37 / BAPI Explorer", href: funcHref(clean), verified: false };
  }
  return null;
}
