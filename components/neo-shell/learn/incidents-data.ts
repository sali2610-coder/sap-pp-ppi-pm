/* ============================================================================
   PROJECT NEO · /neo/incidents — BUILD-TIME data.
   ----------------------------------------------------------------------------
   Runs on the SERVER only. The route calls this once and hands the result to a
   client surface as one plain serialisable object.

   THE SOURCE, AND ONLY THE SOURCE
     data/troubleshooting.ts and its four extension files — the project's
     incident catalogue for PM / PP / PP-PI / QM and a cross-module bucket. Each
     record carries a symptom, sometimes an error, root causes, the transactions
     to analyse with, the tables to inspect, debug entry points, related exits
     and BAdIs, and the fix steps. Some records additionally carry a business
     impact tag, a prevention list, a technical root cause, concrete
     breakpoints, SAP Note SEARCH KEYWORDS (never numbers), a worked scenario,
     and separate ECC / S/4HANA behaviour.

   THE ONE DERIVED VALUE, AND WHY IT IS NOT AN INVENTION
     `impactKind`. The source writes its impact as a leading uppercase tag
     followed, sometimes, by a Hebrew gloss or a second tag —
     "BLOCKING (ייצור לא מקבל הוראות)", "MONITORING NOISE / PARTIAL". The tag
     before the first bracket or slash is taken verbatim as the bucket; nothing
     is reclassified, nothing is upgraded, and a record with no impact line is
     bucketed as "לא תויג" rather than being assigned one.

   CROSS-REFERENCES ARE GATED
     Transactions are matched against the canonical registry /neo/transactions
     generates from, tables against the dictionary /neo/object generates from.
     A code that matches neither is rendered as a value, never as a link, so an
     incident can never link at a page that was not built.

   NOTHING IS FILLED IN. A record with no S/4HANA line arrives here with an
   empty string and the detail screen says so in that field's own place. The
   catalogue is written SAP support knowledge, not a live support queue, and the
   surface says that too.
   ========================================================================== */

import { INCIDENTS, type Incident } from "@/data/troubleshooting";
import { tableNames } from "@/components/neo-shell/erd/model";
import { registryCodes } from "@/lib/tx-registry";

/** A code the source listed, plus the page it resolves to — or "" when the
 *  project holds no page for it. */
export interface CodeRef { code: string; href: string }

export interface IncidentRow {
  slug: string;
  module: string;
  moduleHe: string;
  he: string;
  symptom: string;
  error: string;
  impact: string;
  /** The source's own leading tag: BLOCKING / PARTIAL / … or "" when untagged. */
  impactKind: string;
  techCause: string;
  scenario: string;
  rootCauses: string[];
  tcodes: CodeRef[];
  tables: CodeRef[];
  debugEntry: string[];
  breakpoints: string[];
  exits: string[];
  funcs: string[];
  fix: string[];
  prevention: string[];
  notes: string[];
  oss: string[];
  ecc: string;
  s4: string;
  /** true only when the record carries an explicit ECC and/or S/4HANA line. */
  hasS4: boolean;
  href: string;
  hay: string;
}

export interface IncidentFacet { id: string; he: string; n: number }

export interface IncidentsData {
  rows: IncidentRow[];
  modules: IncidentFacet[];
  impacts: IncidentFacet[];
  totals: {
    incidents: number;
    modules: number;
    tcodes: number;
    tables: number;
    exits: number;
    withFix: number;
    withPrevention: number;
    withScenario: number;
    withS4: number;
  };
}

const MODULE_HE: Record<string, string> = {
  PM: "תחזוקת מפעל",
  PP: "תכנון ייצור",
  "PP-PI": "תעשיות תהליכיות",
  QM: "ניהול איכות",
  Cross: "חוצה-מודולים",
};

/** The source's placeholder for "there is none". Never rendered as a value. */
const isBlank = (s: string) => !s || s.trim() === "" || s.trim() === "—";

const clean = (a?: string[]): string[] => (a || []).map((x) => (x || "").trim()).filter((x) => !isBlank(x));

/** "BLOCKING (ייצור לא מקבל הוראות)" → "BLOCKING".
 *  "MONITORING NOISE / PARTIAL"      → "MONITORING NOISE".
 *  The tag is taken verbatim; it is never rewritten or re-ranked. */
function impactKindOf(raw?: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  return s.split("(")[0].split("/")[0].trim();
}

/** Impact tags in the order a reader triages them: what stops work first. Any
 *  tag the source uses that is not on this list still appears — it is simply
 *  sorted after the known ones rather than dropped. */
const IMPACT_ORDER = [
  "BLOCKING",
  "FINANCIAL POSTING RISK",
  "FINANCIAL",
  "DATA INCONSISTENCY",
  "PARTIAL",
  "USER-SPECIFIC",
  "MONITORING NOISE",
  "MONITORING",
];

const IMPACT_HE: Record<string, string> = {
  BLOCKING: "חוסם עבודה",
  "FINANCIAL POSTING RISK": "סיכון ברישום כספי",
  FINANCIAL: "השפעה כספית",
  "DATA INCONSISTENCY": "אי-עקביות נתונים",
  PARTIAL: "פגיעה חלקית",
  "USER-SPECIFIC": "משתמש בודד",
  "MONITORING NOISE": "רעש ניטור",
  MONITORING: "ניטור",
};

const UNTAGGED = "__none";

let cached: IncidentsData | null = null;

export function incidentsData(): IncidentsData {
  if (cached) return cached;

  const tables = new Set(tableNames());
  const tcodes = new Set(registryCodes());

  const txRef = (code: string): CodeRef => {
    const up = code.trim().toUpperCase();
    return { code: up, href: tcodes.has(up) ? `/neo/transactions/${encodeURIComponent(up)}/` : "" };
  };
  const tblRef = (name: string): CodeRef => {
    const up = name.trim().toUpperCase();
    return { code: up, href: tables.has(up) ? `/neo/object/${encodeURIComponent(up)}/` : "" };
  };

  const rows: IncidentRow[] = INCIDENTS.map((i: Incident) => {
    const row: IncidentRow = {
      slug: i.slug,
      module: i.module,
      moduleHe: MODULE_HE[i.module] || "",
      he: i.he,
      symptom: i.symptom || "",
      error: isBlank(i.error || "") ? "" : (i.error as string).trim(),
      impact: (i.impact || "").trim(),
      impactKind: impactKindOf(i.impact),
      techCause: (i.techCause || "").trim(),
      scenario: (i.scenario || "").trim(),
      rootCauses: clean(i.rootCauses),
      tcodes: clean(i.analyzeTcodes).map(txRef),
      tables: clean(i.tables).map(tblRef),
      debugEntry: clean(i.debugEntry),
      breakpoints: clean(i.breakpoints),
      exits: clean(i.exits),
      funcs: clean(i.funcs),
      fix: clean(i.fix),
      prevention: clean(i.prevention),
      notes: clean(i.notes),
      oss: clean(i.oss),
      ecc: (i.ecc || "").trim(),
      s4: (i.s4 || "").trim(),
      hasS4: !!(i.ecc || "").trim() || !!(i.s4 || "").trim(),
      href: `/neo/incidents/${i.slug}/`,
      hay: "",
    };
    row.hay = [
      row.he, row.symptom, row.error, row.impact, row.techCause, row.scenario,
      row.module, row.moduleHe,
      ...row.rootCauses, ...row.fix, ...row.prevention, ...row.debugEntry, ...row.exits, ...row.funcs, ...row.notes,
      ...row.tcodes.map((c) => c.code), ...row.tables.map((c) => c.code),
    ].join(" ").toLowerCase();
    return row;
  });

  const modOrder: string[] = [];
  for (const r of rows) if (!modOrder.includes(r.module)) modOrder.push(r.module);
  const modules: IncidentFacet[] = modOrder
    .map((m) => ({ id: m, he: MODULE_HE[m] || m, n: rows.filter((r) => r.module === m).length }))
    .sort((a, b) => b.n - a.n);

  const kindsPresent = [...new Set(rows.map((r) => r.impactKind).filter(Boolean))];
  const impacts: IncidentFacet[] = kindsPresent
    .sort((a, b) => {
      const ia = IMPACT_ORDER.indexOf(a);
      const ib = IMPACT_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
    })
    .map((k) => ({ id: k, he: IMPACT_HE[k] || k, n: rows.filter((r) => r.impactKind === k).length }));

  const untagged = rows.filter((r) => !r.impactKind).length;
  if (untagged) impacts.push({ id: UNTAGGED, he: "ללא תג השפעה", n: untagged });

  const uniq = (a: string[]) => new Set(a.filter(Boolean)).size;

  cached = {
    rows,
    modules,
    impacts,
    totals: {
      incidents: rows.length,
      modules: modules.length,
      tcodes: uniq(rows.flatMap((r) => r.tcodes.map((c) => c.code))),
      tables: uniq(rows.flatMap((r) => r.tables.map((c) => c.code))),
      exits: uniq(rows.flatMap((r) => r.exits)),
      withFix: rows.filter((r) => r.fix.length).length,
      withPrevention: rows.filter((r) => r.prevention.length).length,
      withScenario: rows.filter((r) => r.scenario).length,
      withS4: rows.filter((r) => r.hasS4).length,
    },
  };
  return cached;
}

/** The id the surface uses for "the source wrote no impact tag". */
export const IMPACT_UNTAGGED = UNTAGGED;

/** The param list for /neo/incidents/[slug] — the same array the directory
 *  lists from, so a row can never open a page that was not built. */
export const incidentSlugs = (): string[] => INCIDENTS.map((i) => i.slug);

export function incidentDetail(slug: string): IncidentRow | null {
  return incidentsData().rows.find((r) => r.slug === slug) ?? null;
}
