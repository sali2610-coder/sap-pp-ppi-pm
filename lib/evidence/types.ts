/* ============================================================================
   PROJECT NEO · EVIDENCE FOUNDATION — types and vocabularies.
   ----------------------------------------------------------------------------
   PURE MODULE. No value imports at all. This file and every sibling except
   resolve.ts must load under `node --experimental-strip-types --test` with no
   alias loader, and under `next build` with no `.ts` extensions. Measured, not
   assumed: Node refuses an extensionless relative import (ERR_MODULE_NOT_FOUND)
   and the app tsconfig refuses a `.ts` one (TS5097). So the pure modules share
   TYPES only; the few id helpers two of them need are written twice and kept
   equal by test/s4-status.test.ts.

   Nothing here asserts an SAP fact. It is the vocabulary every record must use
   so that a claim, its source and its verification tier are always visible.
   ========================================================================== */

/* ------------------------------------------------------------- evidence */

export type SourceType =
  | "sap_help" | "sap_api_hub" | "fiori_library" | "sap_note" | "kba"
  | "simplification_item" | "sap_press_book" | "repository" | "sap_community";

export type Edition = "on-premise" | "private-cloud" | "public-cloud" | "ecc";

export const EDITION_HE: Record<Edition, string> = {
  "on-premise": "S/4HANA On-Premise",
  "private-cloud": "S/4HANA Cloud Private Edition",
  "public-cloud": "S/4HANA Cloud Public Edition",
  ecc: "SAP ERP (ECC)",
};

export type VerificationLevel =
  | "sap_official_verified" | "repository_verified" | "supported_secondary_source"
  | "verification_required" | "conflicting_sources" | "legacy_context_only";

export const VERIFICATION_LEVELS: readonly VerificationLevel[] = [
  "sap_official_verified", "repository_verified", "supported_secondary_source",
  "verification_required", "conflicting_sources", "legacy_context_only",
] as const;

/** Pill text. `repository_verified` deliberately reads "מאומת מול נתוני הפרויקט"
 *  so it never contradicts the existing "רשומה מאומתת" pill while making the
 *  tier visible. */
export const VERIFICATION_HE: Record<VerificationLevel, string> = {
  sap_official_verified: "מאומת מול תיעוד SAP רשמי",
  repository_verified: "מאומת מול נתוני הפרויקט",
  supported_secondary_source: "נתמך במקור משני",
  verification_required: "נדרש אימות נוסף",
  conflicting_sources: "מקורות סותרים",
  legacy_context_only: "הקשר ECC בלבד",
};

/** Status tokens only: a small filled dot followed by the word. Colours come
 *  from the existing --status-* palette in app/globals.css; nothing new. */
export const VERIFICATION_DOT: Record<VerificationLevel, string> = {
  sap_official_verified: "var(--status-done)",
  repository_verified: "var(--status-done)",
  supported_secondary_source: "var(--status-in-conversion)",
  verification_required: "var(--status-not-started)",
  conflicting_sources: "var(--status-removed)",
  legacy_context_only: "var(--status-in-analysis)",
};

export interface Evidence {
  sourceType: SourceType;
  sourceTitle: string;
  /** Allowlisted domain (lib/evidence/validate.ts URL_ALLOWLIST), or absent. */
  url?: string;
  /** 6 or 7 digits. Never typed from memory: either a me.sap.com/notes url or a repoRef. */
  sapNote?: string;
  kba?: string;
  /** "SAP S/4HANA", "SAP ERP 6.0", ... */
  product: string;
  edition: Edition;
  /** "2025.001", "2023 FPS02", "ECC 6.0 EHP8", "S/4 1511" */
  release?: string;
  /** ISO date. */
  accessedAt: string;
  /** Hebrew. The exact statement this source supports, nothing wider. */
  claim: string;
  verificationLevel: VerificationLevel;
  reviewer?: string;
  lastVerifiedAt?: string;
  conflictingEvidence?: Evidence[];
  /** Repository provenance when sourceType === "repository": "data/s4-impact.ts#MATDOC". */
  repoRef?: string;
}

/* ------------------------------------------------------- unified status */

export type S4Status =
  | "s4_native" | "unchanged" | "changed" | "simplified" | "replaced"
  | "restricted" | "deprecated" | "not_available" | "compatibility_scope"
  | "fiori_alternative_available" | "released_api_available" | "legacy_ecc_only"
  | "verification_required" | "not_applicable";

export const S4_STATUSES: readonly S4Status[] = [
  "s4_native", "unchanged", "changed", "simplified", "replaced",
  "restricted", "deprecated", "not_available", "compatibility_scope",
  "fiori_alternative_available", "released_api_available", "legacy_ecc_only",
  "verification_required", "not_applicable",
] as const;

/** Overlay-only values: the mapper never emits them, an author needs an
 *  official source naming the Simplification Item, Compatibility Pack or the
 *  released API. */
export const OVERLAY_ONLY_STATUSES: readonly S4Status[] = [
  "compatibility_scope", "simplified", "released_api_available",
] as const;

export const S4_STATUS_HE: Record<S4Status, string> = {
  s4_native: "חדש ב-S/4HANA",
  unchanged: "ללא שינוי ב-S/4HANA",
  changed: "משתנה ב-S/4HANA",
  simplified: "פריט פישוט (Simplification Item)",
  replaced: "הוחלף ב-S/4HANA",
  restricted: "מוגבל ב-S/4HANA",
  deprecated: "לא אסטרטגי ב-S/4HANA",
  not_available: "לא זמין ב-S/4HANA",
  compatibility_scope: "בהיקף תאימות (Compatibility Scope)",
  fiori_alternative_available: "קיימת חלופת Fiori",
  released_api_available: "קיים API משוחרר",
  legacy_ecc_only: "ECC בלבד",
  verification_required: "נדרש אימות נוסף",
  not_applicable: "לא רלוונטי",
};

/** Same reading as lib/s4-class: green stays, amber changes, blue moves, red
 *  is gone, grey is "no verdict". Purple marks the ECC-only past. */
export const S4_STATUS_DOT: Record<S4Status, string> = {
  s4_native: "var(--status-done)",
  unchanged: "var(--status-done)",
  changed: "var(--status-in-analysis)",
  simplified: "var(--status-in-analysis)",
  replaced: "var(--status-in-conversion)",
  restricted: "var(--status-in-analysis)",
  deprecated: "var(--status-removed)",
  not_available: "var(--status-removed)",
  compatibility_scope: "var(--status-in-analysis)",
  fiori_alternative_available: "var(--status-in-conversion)",
  released_api_available: "var(--status-done)",
  legacy_ecc_only: "var(--status-tested)",
  verification_required: "var(--status-not-started)",
  not_applicable: "var(--status-not-started)",
};

export type DerivedSource =
  | "blueprint" | "s4-impact" | "s4-objects" | "lifecycle" | "ecc-s4"
  | "tx-intel" | "bapi-registry" | "fiori-apps" | "cds-enrichment" | "eccs4-block" | "verified-objects";

export interface S4StatusClaim {
  status: S4Status;
  /** Hebrew explanation. For a derived claim it names its origin. */
  he: string;
  edition: Edition;
  /** null ONLY when derived, or when a structured release field was absent. */
  release: string | null;
  /** null ONLY when derived. */
  source: Evidence | null;
  /** Hebrew. */
  recommendedAction: string;
  /** Required when status ∈ {replaced, deprecated, not_available} and the claim is authored. */
  successor?: CanonicalId;
  /** Set by the mapper, never by an author. */
  derivedFrom?: DerivedSource;
  /** Set by the mapper when the source record flags itself as inferred,
   *  version-dependent or at "needs" trust: the status stays readable, the
   *  verification tier drops to verification_required. */
  inferred?: boolean;
  /** Secondary flags the mapper may attach, e.g. fiori_alternative_available. */
  secondary?: S4Status[];
}

/* ---------------------------------------------------------- canonical ids */

export type CanonicalKind =
  | "table" | "tx" | "fm" | "idoc:msg" | "idoc:basic" | "cds" | "fiori"
  | "enh:badi" | "enh:exit" | "enh:technique" | "obj" | "bp";

export type CanonicalId = `${CanonicalKind}:${string}`;

/* --------------------------------------------------------------- records */

export interface VerificationRecord {
  id: CanonicalId;
  /** Raw variants that must resolve to this id. */
  aliases?: string[];
  /** Authored claim; absent → the mapper derives one. */
  status?: S4StatusClaim;
  evidence: Evidence[];
  /** Must resolve (test: no dangling). */
  xrefs?: CanonicalId[];
  reviewer?: string;
  lastVerifiedAt?: string;
  /** Hebrew, honest caveats. */
  notes?: string;
}

/** Registry entries that only exist in overlays (no page): IDoc basic types,
 *  business objects. */
export interface RegistryEntry {
  id: CanonicalId;
  he: string;
  en?: string;
  members?: CanonicalId[];
}

/** The structural shape validate.ts checks; data/best-practices/index.ts
 *  exports it under the name BestPractice. */
export interface BestPracticeLike {
  slug: string;
  he: string;
  en: string;
  module: "PM" | "PP-PI" | "Cross";
  /** Hebrew. */
  summary: string;
  context: string;
  steps: { he: string; xrefs?: CanonicalId[] }[];
  antiPatterns?: string[];
  checks?: string[];
  /** Objects this practice concerns (must resolve). */
  xrefs: CanonicalId[];
  /** Same rules as overlays. */
  evidence: Evidence[];
  /** When the practice itself is edition-bound. */
  status?: S4StatusClaim;
  lastVerifiedAt: string;
  reviewer: string;
  /** Hebrew, honest caveats. */
  notes?: string;
}

/* ------------------------------------------------------- the UI contract */

/** Plain, serialisable, rendered by the evidence block. */
export interface EvidenceBlockData {
  id: CanonicalId;
  status: {
    key: S4Status;
    /** Pill label from S4_STATUS_HE. */
    label: string;
    /** Explanation line from the claim. */
    he: string;
    dot: string;
    edition: Edition;
    release: string | null;
    action: string;
    derived: boolean;
    successor: { id: CanonicalId; label: string; href: string | null } | null;
  };
  level: { key: VerificationLevel; he: string; dot: string };
  sources: {
    title: string; url: string | null; kind: SourceType; release: string | null;
    accessedAt: string; edition: Edition;
  }[];
  lastVerifiedAt: string | null;
  reviewer: string | null;
  conflicts: number;
  /** true → render the "נדרש אימות נוסף" state. */
  needsVerification: boolean;
  depth: { level: 0 | 1 | 2 | 3 | 4 | 5; he: string };
}
