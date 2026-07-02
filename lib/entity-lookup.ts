// Unified entity lookup for the Hover Intelligence System (SapTip).
// Given a raw SAP name (table / T-Code / BAPI / FM / IDoc / CDS), returns a
// compact tip: what / module / ECC-vs-S4 / link — sourced from the existing
// authored layers. No fabrication: `verified` flags curated vs inferred data.

import { tableByName } from "@/lib/knowledge-graph";
import { listTcodes, tcodeIntel, classifyFunc, cleanFunc, funcHref } from "@/lib/object-intel";
import { objectIntel } from "@/lib/data";
import { cdsByView } from "@/data/cds-map";
import { fnIntel } from "@/data/function-intel";
import { knowledgeFor } from "@/lib/knowledge";
import { CONSULTANT_NOTES } from "@/data/consultant-notes";
import { primaryModule } from "@/lib/primary-module";
import { verifiedObject } from "@/data/verified-objects";
import { objectIntelExt } from "@/lib/object-intel-ext";
import { txIntel } from "@/lib/tx-intel";
import { registryTx } from "@/lib/tx-registry";

export type TipKind = "table" | "tcode" | "bapi" | "idoc" | "fm" | "cds";

export interface EntityTip {
  name: string;
  kind: TipKind;
  kindHe: string;
  he: string;        // short "what" — simple explanation
  module?: string;
  ecc?: string;
  s4?: string;
  href: string;
  verified: boolean; // true = curated authored detail, false = inferred from dataset
  // ── mini-mentor fields (Hover Intelligence) ──
  purpose?: string;       // business purpose / problem it solves
  consultantTip?: string; // what a consultant does
  mistake?: string;       // common beginner mistake
  related?: string[];     // related objects (clickable)
  relatedKind?: "object" | "tcode";
  where?: string;         // where it appears in real projects
  graphHref?: string;
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

  // 1) Table / object (exact, by name) — enriched into a mini-mentor
  const t = tableByName(name);
  if (t) {
    const k = knowledgeFor(name);
    const cn = CONSULTANT_NOTES[name];
    const ix = objectIntelExt(name);
    const oi = objectIntel(name);
    return {
      name, kind: "table", kindHe: KIND_HE.table, he: k?.role || t.descriptionHe || "", module: primaryModule(name, t.module),
      href: `/object/${encodeURIComponent(name)}`, graphHref: `/graph/?node=${encodeURIComponent(name)}`, verified: true,
      purpose: k?.why, consultantTip: cn?.fnNotes?.[0] || ix?.bestPractices?.[0], mistake: cn?.mistakes?.[0],
      related: (oi?.related || []).slice(0, 6), relatedKind: "object", where: ix?.scenarios?.[0],
    };
  }

  // 2) T-Code — enriched from the Transaction Intelligence catalog
  const up = name.toUpperCase();
  if (tcodeSet().has(up) || txIntel(up) || registryTx(up)) {
    const tx = txIntel(up);
    const ti = tcodeIntel(up);
    if (tx) {
      return {
        name: up, kind: "tcode", kindHe: KIND_HE.tcode, he: tx.beginner || tx.descHe, module: tx.module,
        href: `/tcode/${encodeURIComponent(up)}`, graphHref: `/graph/?node=${encodeURIComponent(up)}`, verified: true,
        purpose: tx.descHe, consultantTip: tx.consultant, mistake: tx.mistakes?.[0],
        related: [...new Set([...(tx.after || []), ...(tx.together || [])])].slice(0, 6), relatedKind: "tcode", where: `${tx.area} · ${tx.process}`.slice(0, 80),
      };
    }
    const rt = registryTx(up);
    const mods = ti?.modules.join(" · ") || rt?.module;
    return { name: up, kind: "tcode", kindHe: KIND_HE.tcode, he: rt?.he || (ti && ti.tables.length ? `טרנזקציה — ${ti.tables.length} טבלאות` : "טרנזקציה"), module: mods, href: `/tcode/${encodeURIComponent(up)}`, graphHref: `/graph/?node=${encodeURIComponent(up)}`, verified: true, related: ti ? ti.tables.map((x) => x.name).slice(0, 6) : undefined, relatedKind: "object" };
  }

  // 2.5) Verified supplemental object (LO-HU / cross-module: VEKP, VEPO, LIKP…)
  const vo = verifiedObject(name);
  if (vo) {
    return {
      name: vo.name, kind: "table", kindHe: KIND_HE.table, he: vo.he, module: vo.primary,
      href: `/object/${encodeURIComponent(vo.name)}/`, verified: true,
      purpose: vo.ppPi || vo.en, consultantTip: vo.useCases?.[0], where: vo.area,
      related: vo.related.slice(0, 6), relatedKind: "object",
    };
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
