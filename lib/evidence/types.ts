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
  /** A context row: it shows where the name appears (an official page that prints it, the
   *  Fiori Apps Library entry) without deciding the record's S/4HANA status. It is listed
   *  with the sources but never counted toward the record's verification level or depth,
   *  so adding context can never lift a "verified" pill (set on generated records). */
  context?: boolean;
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

/* THE S/4HANA STATUS DICTIONARY (content review 2026-09-29, row 91, dictionary 1).
   ONE source for every surface: a surface maps its own data to a canonical key
   and prints the word from here, it never keeps a word list of its own.
     S4_STATUS_HE      the full label (the StatusPill text)
     S4_STATUS_WORD    the short word (tags, legends, filters, breakdowns, the
                       pill tooltip), masculine as the neutral form, because
                       the pill also marks BAPIs, function modules and apps
     S4_STATUS_READING the reading group, which picks the pill's glyph
   Meanings the review keeps apart: "לא אסטרטגי" is not "הוסר", "קיימת חלופת
   Fiori" is not "מוחלף", "מוגבל" is not "משתנה", "לא רלוונטי" is not "נדרש
   אימות", "ECC בלבד" is not "הוסר". Where a source writes "ללא שינוי", its own
   words stay in the explanation line under the word "נשמר". */
export const S4_STATUS_HE: Record<S4Status, string> = {
  s4_native: "חדש ב-S/4HANA",
  unchanged: "נשמר ב-S/4HANA",
  changed: "משתנה ב-S/4HANA",
  simplified: "Simplification Item",
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

export const S4_STATUS_WORD: Record<S4Status, string> = {
  s4_native: "חדש ב-S/4HANA",
  unchanged: "נשמר",
  released_api_available: "נשמר",
  fiori_alternative_available: "נשמר",
  changed: "משתנה",
  simplified: "משתנה",
  restricted: "מוגבל",
  replaced: "מוחלף",
  deprecated: "לא אסטרטגי",
  compatibility_scope: "לא אסטרטגי",
  not_available: "הוסר",
  legacy_ecc_only: "ECC בלבד",
  verification_required: "נדרש אימות",
  not_applicable: "לא רלוונטי",
};

/** One colour per reading group (S4_STATUS_READING), from the S/4HANA status
 *  families in app/neo/system.css (TOKENS.md): keeps, changes, moves (replaced),
 *  not strategic, gone, new, the ECC-only past, and open (no verdict). The glyph
 *  and the word carry the meaning; the colour is the third signal. The two
 *  not-strategic statuses still exist in S/4HANA, so they are never painted
 *  "gone". Every family clears 4.5:1 on every surface in both themes. */
export const S4_STATUS_DOT: Record<S4Status, string> = {
  s4_native: "var(--s4-new)",
  unchanged: "var(--s4-keep)",
  changed: "var(--s4-change)",
  simplified: "var(--s4-change)",
  replaced: "var(--s4-replace)",
  restricted: "var(--s4-change)",
  deprecated: "var(--s4-not-strategic)",
  not_available: "var(--s4-removed)",
  compatibility_scope: "var(--s4-not-strategic)",
  fiori_alternative_available: "var(--s4-keep)",
  released_api_available: "var(--s4-keep)",
  legacy_ecc_only: "var(--s4-ecc-only)",
  verification_required: "var(--s4-verify)",
  not_applicable: "var(--s4-verify)",
};

/** THE SHAPE BESIDE THE COLOUR (design audit S5-3: "symbol and text, never
 *  colour alone"). Fourteen statuses read as eight groups (dictionary 1): new,
 *  keeps, changes, moves, notStrategic, gone, past, open. The shell draws one
 *  glyph per group next to the dot and the word. Pure data: the glyph itself
 *  is chosen in components/neo-shell/evidence/status-pill.tsx. */
export type S4StatusGroup = "new" | "keeps" | "changes" | "moves" | "gone" | "past" | "open";
export type S4Reading = S4StatusGroup | "notStrategic";

export const S4_STATUS_READING: Record<S4Status, S4Reading> = {
  s4_native: "new",
  unchanged: "keeps",
  released_api_available: "keeps",
  // The SAP GUI screen keeps working beside its Fiori alternative.
  fiori_alternative_available: "keeps",
  changed: "changes",
  simplified: "changes",
  // Its own word ("מוגבל"); the "changes" glyph only.
  restricted: "changes",
  replaced: "moves",
  // Both still exist in S/4HANA; neither is removed and neither is a change.
  deprecated: "notStrategic",
  compatibility_scope: "notStrategic",
  not_available: "gone",
  legacy_ecc_only: "past",
  verification_required: "open",
  // Its own word ("לא רלוונטי"); the "open" glyph only.
  not_applicable: "open",
};

/** The same reading on the seven families that typed consumers already switch
 *  over (the redesign boards under app/design keep a Record per family).
 *  "notStrategic" folds into "changes", never into "gone": not strategic is
 *  not removed. Derived, so it can never drift from the dictionary. */
export const S4_STATUS_GROUP = Object.fromEntries(
  S4_STATUSES.map((s) => {
    const g = S4_STATUS_READING[s];
    return [s, g === "notStrategic" ? "changes" : g];
  }),
) as Record<S4Status, S4StatusGroup>;

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
/** One line of a process profile: Hebrew text plus the ids it names
 *  (every id must resolve; the page links the ones that have a page). */
export interface BpProcessLine {
  he: string;
  xrefs?: CanonicalId[];
}

/** The process-catalog profile a practice may carry (design-audit continuation
 *  §11, 2026-09-22): the fields the brief requires of every S/4HANA process.
 *  Every list is optional on purpose: a field the repository does not document
 *  is left out, and the page renders the gap by name instead of filling it. */
export interface BpProcessProfile {
  /** Hebrew. Why the process exists, from the repository's process records. */
  purpose: string;
  trigger?: BpProcessLine[];
  preconditions?: BpProcessLine[];
  masterData?: BpProcessLine[];
  roles?: BpProcessLine[];
  /** Transactions and Fiori apps, one line per step or group (ids link). */
  transactions?: BpProcessLine[];
  /** Tables, business objects and CDS views (ids link). */
  tables?: BpProcessLine[];
  integrationPoints?: BpProcessLine[];
  /** BAPIs, function modules, IDocs, OData/CDS-based APIs the process calls or emits (ids link). */
  interfaces?: BpProcessLine[];
  outputs?: BpProcessLine[];
  exceptions?: BpProcessLine[];
  controls?: BpProcessLine[];
  kpis?: BpProcessLine[];
  eccToS4?: BpProcessLine[];
  migration?: BpProcessLine[];
  /** The official SAP process / best-practice reference. `null` (or absent)
   *  means none has been located and verified yet; the page says so. An
   *  official level requires a URL on an official SAP host. */
  reference?: {
    title: string;
    url?: string;
    verificationLevel: VerificationLevel;
    /** Hebrew. */
    note?: string;
  } | null;
}

export interface BestPracticeLike {
  slug: string;
  he: string;
  en: string;
  module: "PM" | "PP" | "PP-PI" | "Cross";
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
  /** Present when the record documents a whole process (the §11 catalog). */
  process?: BpProcessProfile;
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
    accessedAt: string; edition: Edition; context?: boolean;
  }[];
  lastVerifiedAt: string | null;
  reviewer: string | null;
  conflicts: number;
  /** true → render the "נדרש אימות נוסף" state. */
  needsVerification: boolean;
  depth: { level: 0 | 1 | 2 | 3 | 4 | 5; he: string };
}
