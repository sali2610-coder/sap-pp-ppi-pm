/**
 * Universal object model for the SAP reference platform.
 *
 * This is the ONE model the catalog UI reads. It is kind-agnostic by design:
 * today only the BAPI/FM adapter is populated, but tables, CDS views, IDocs,
 * transactions, classes, enhancements, BAdIs, user-exits, RAP and OData objects
 * all fit the same shape. Trust, complexity and type are cross-kind concerns
 * defined once here and reused by every future adapter — so adding a kind later
 * is a data adapter, never a UI rewrite. (Plan §9.)
 */

export type ObjectKind =
  | "bapi" | "fm" | "idoc" | "table" | "cds" | "tcode"
  | "class" | "enhancement" | "badi" | "user-exit" | "rap" | "odata";

/* ---------- Trust (Plan §2.1) ---------- */

export type TrustLevel =
  | "official"      // verified vs official SAP documentation / Help Portal / API Hub / SAP Note — source STORED
  | "community"     // confirmed by multiple trusted community sources — source STORED
  | "curated"       // well-established standard SAP knowledge, no official citation stored
  | "needs-review"  // likely correct, awaiting verification
  | "invalid";      // wrong name / obsolete / duplicate / should be removed

export interface TrustSource {
  label: string;    // e.g. "SAP Help Portal — BAPI_ALM_ORDER_MAINTAIN"
  url?: string;     // real, resolvable URL only
  note?: string;    // e.g. "SAP Note 123456" — ONLY if it is a genuine, checked reference
}

export interface TrustRecord {
  level: TrustLevel;
  reason: string;          // WHY this level — drives the badge tooltip. Always present.
  method: string;          // how it was established, e.g. "ידע SAP סטנדרטי (curated)"
  sources: TrustSource[];  // MUST be ≥1 for official/community (enforced by check-bapi-trust)
  verifiedOn?: string;     // ISO date the claim was established (official/community)
  lastReviewed: string;    // ISO date a human/agent last reviewed the record
}

/* ---------- Type classification (Plan §2.2 — fixes the prefix-only bug) ---------- */

export type FuncType =
  | "released-bapi"   // BAPI רשמי
  | "bapi-like-fm"    // FM דמוי-BAPI, לא משוחרר רשמית
  | "released-fm"     // FM רשמי (מתועד / RFC)
  | "internal-fm"     // FM פנימי
  | "remote-fm"       // FM עם RFC (remote-enabled)
  | "obsolete"        // מיושן
  | "replaced";       // הוחלף

export interface TypeRecord {
  type: FuncType;
  remoteEnabled?: boolean;
  replacement?: string;   // successor object, when known
  obsolete?: boolean;
}

/* ---------- COMMIT (Plan §2.4) ---------- */

export type Commit = "required" | "not-required" | "n-a";

/* ---------- Complexity (Plan §2.6 — computed, never manual) ---------- */

export type ComplexityLevel = "basic" | "intermediate" | "advanced";

export interface ComplexityResult {
  level: ComplexityLevel;               // בסיסי / בינוני / מורכב
  score: number;                        // raw computed weight (transparent)
  reasons: string[];                    // human-readable factors that produced the level
  learnMinutes: [number, number];       // estimated learning time window
}

/* ---------- The universal object ---------- */

export interface CatalogObject {
  id: string;                 // stable slug: `${kind}:${name}`
  name: string;               // exact technical identifier
  kind: ObjectKind;
  module: string;
  process?: string;
  purpose: string;            // one-line plain-language purpose
  type: TypeRecord;
  trust: TrustRecord;
  commit?: Commit;            // BAPI/FM only
  complexity?: ComplexityResult;
  aliases?: string[];
  ecc?: string;               // free-text ECC availability (from intel)
  s4?: string;                // free-text S/4 availability / successor
  detailHref: string;
}

/** Ledger entry for names fixed or removed during verification (Plan §2.5). */
export interface CorrectionEntry {
  was: string;
  action: "removed" | "renamed" | "reclassified";
  to?: string;
  reason: string;
  source?: TrustSource;
}
