/* ============================================================================
   PROJECT NEO · EVIDENCE FOUNDATION — depth scoring, L0..L5.
   ----------------------------------------------------------------------------
   PURE MODULE (type imports only; see types.ts header).

   Cumulative: a level requires every lower level. Every input is a count or a
   flag the builder measured on the record; nothing here reads a dataset.
     L0 identity only
     L1 Hebrew description present
     L2 structural >= structuralMin (per catalog)
     L3 status decided (not verification_required) with a release or a derivedFrom
     L4 >= 1 evidence at supported_secondary_source or better, every xref
        resolves, no conflicting sources
     L5 >= 1 official source with URL, a release, verified within 365 days,
        and a successor where the status demands one
   ========================================================================== */

import type { S4Status, S4StatusClaim, VerificationLevel } from "./types";

export type DepthLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type Catalog =
  | "tables" | "transactions" | "functions" | "idocs" | "cds" | "fiori"
  | "enhancements" | "objects" | "best-practices";

export const CATALOGS: readonly Catalog[] = [
  "tables", "transactions", "functions", "idocs", "cds", "fiori", "enhancements", "objects", "best-practices",
] as const;

export interface DepthInput {
  hasHe: boolean;
  hasEn: boolean;
  /** fields / relations / params / guiTx / tables: per-catalog meaning. */
  structural: number;
  /** Threshold per catalog. */
  structuralMin: number;
  status: S4StatusClaim | null;
  level: VerificationLevel;
  evidence: number;
  officialWithUrl: number;
  xrefsResolved: number;
  xrefsTotal: number;
  lastVerifiedAt: string | null;
  /** true unless status ∈ {replaced, deprecated, not_available} without a successor. */
  successorOk: boolean;
}

export const DEPTH_HE: Record<DepthLevel, string> = {
  0: "זיהוי בלבד",
  1: "תיאור בעברית",
  2: "מבנה מתועד",
  3: "מעמד S/4HANA נקבע",
  4: "מאומת עם מקור",
  5: "מאומת רשמית ועדכני",
};

/** What "structural" counts per catalog, and the L2 threshold. */
export const STRUCTURAL_MIN: Record<Catalog, number> = {
  tables: 5,          // fields with data type and length
  transactions: 3,    // authored facts: purpose, process, tables, bapis
  functions: 2,       // tables + transactions, or intel parameters
  idocs: 1,           // intel record present
  cds: 2,             // tables mapped + enrichment (viewType, keyField)
  fiori: 3,           // role + catalog + odata + guiTx
  enhancements: 3,    // trigger + object + tcodes
  objects: 2,         // members
  "best-practices": 3, // steps
};

/* Same ranking as s4-status.ts LEVEL_RANK. Duplicated on purpose (pure module);
   test/s4-status.test.ts asserts the two agree. */
const RANK: Record<VerificationLevel, number> = {
  sap_official_verified: 5,
  repository_verified: 4,
  supported_secondary_source: 3,
  legacy_context_only: 2,
  verification_required: 1,
  conflicting_sources: 0,
};

const NEEDS_SUCCESSOR: readonly S4Status[] = ["replaced", "deprecated", "not_available"] as const;

export const successorOkFor = (s: S4StatusClaim | null | undefined): boolean =>
  !s || !NEEDS_SUCCESSOR.includes(s.status) || !!s.successor;

export function depthInputFor(catalog: Catalog, facts: Partial<DepthInput>): DepthInput {
  return {
    hasHe: false,
    hasEn: false,
    structural: 0,
    structuralMin: STRUCTURAL_MIN[catalog],
    status: null,
    level: "verification_required",
    evidence: 0,
    officialWithUrl: 0,
    xrefsResolved: 0,
    xrefsTotal: 0,
    lastVerifiedAt: null,
    successorOk: true,
    ...facts,
  };
}

const isoToday = (): string => new Date().toISOString().slice(0, 10);

const utc = (iso: string): number => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : NaN;
};

/** true when `at` is within the last 365 days of `today` (inclusive). */
export function fresh(at: string | null, today: string, maxDays = 365): boolean {
  if (!at) return false;
  const d = (utc(today) - utc(at)) / 86_400_000;
  return Number.isFinite(d) && d >= 0 && d <= maxDays;
}

export function depthOf(i: DepthInput, today: string = isoToday()): DepthLevel {
  if (!i.hasHe) return 0;
  if (i.structural < i.structuralMin) return 1;
  const s = i.status;
  if (!s || s.status === "verification_required" || !(s.release || s.derivedFrom)) return 2;
  if (
    i.evidence < 1 ||
    i.level === "conflicting_sources" ||
    RANK[i.level] < RANK.supported_secondary_source ||
    i.xrefsResolved !== i.xrefsTotal
  ) return 3;
  if (i.officialWithUrl < 1 || !s.release || !fresh(i.lastVerifiedAt, today) || !i.successorOk) return 4;
  return 5;
}
