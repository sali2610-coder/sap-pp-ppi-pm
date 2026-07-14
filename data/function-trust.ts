/**
 * Trust, type and COMMIT records for the BAPI/FM catalog (Plan §2).
 *
 * HONESTY CONTRACT (enforced by scripts/check-bapi-trust.mjs):
 *  - "official"/"community" REQUIRE ≥1 stored real source. Never invent SAP Notes
 *    or references. Most objects are honestly "curated" (standard SAP knowledge,
 *    hand-authored, no stored citation) — a first-class, well-explained level.
 *  - Every record carries method + sources + lastReviewed; verifiedOn for upgrades.
 *  - Re-verifying later = edit the maps here only; the UI never changes (Plan §9).
 *
 * Baseline is derived, not hand-listed per object, to stay maintainable and honest:
 *   inferred intel → needs-review; otherwise → curated. Overrides below refine.
 */
import type { Commit, TrustRecord, TypeRecord, TrustLevel, CorrectionEntry } from "@/lib/catalog/types";

export const REVIEWED = "2026-07-14";

/* ---------- Invalid / removed names (Plan §2.5) ---------- */
// Excluded from the catalog listing and from detail-route generation.
export const INVALID_NAMES = new Set<string>(["Control Recipe", "BOMMAT", "PPCC1"]);

export const CORRECTIONS: CorrectionEntry[] = [
  { was: "Control Recipe", action: "removed", reason: "מושג (Control Recipe), אינו שם Function Module חוקי — הוסר מהקטלוג." },
  { was: "BOMMAT", action: "removed", reason: "מבנה/רכיב BOM, אינו FM שניתן לקריאה. לקריאת BOM ראה CSAP_MAT_BOM_READ (אימות ב-SE37 לפני שימוש)." },
  { was: "PPCC1", action: "removed", reason: "קוד טרנזקציה (T-Code), אינו Function Module — שייך לקטלוג הטרנזקציות." },
];

/* ---------- COMMIT (Plan §2.4) ---------- */
const WRITE_VERB = /(CREATE|CHANGE|MAINTAIN|SAVE|POST|CANCEL|CONF|_ADD\b|ADD_TO|UPDATE|DELETE|_SET\b|INSTALL|DISMANTLE|INHERIT)/;
const READ_VERB = /(READ|GET|GETLIST|GETDETAIL|GET_DETAIL|CHECK|EXPL|SELECT|LIST|_TEXT_|DETERMINE|LABEL)/;
// Explicit exceptions where the verb heuristic would be wrong.
const COMMIT_OVERRIDE: Record<string, Commit> = {
  ISCHED_CALL_GENERATE: "required",       // schedules a maintenance call → writes
  MEASUREM_DOCUM_RFC_SINGLE_001: "required",
};
export function commitFor(name: string): Commit {
  if (name in COMMIT_OVERRIDE) return COMMIT_OVERRIDE[name];
  if (WRITE_VERB.test(name)) return "required";
  if (READ_VERB.test(name)) return "not-required";
  return "n-a";
}

/* ---------- Type classification (Plan §2.2 — fixes prefix-only bug) ---------- */
// Curated refinements. Anything not listed falls back to the honest default below.
const TYPE_OVERRIDE: Record<string, TypeRecord> = {
  // internal read helpers that are NOT released BAPIs despite living beside them
  ILOA_READ: { type: "internal-fm" }, ILOA_UPDATE: { type: "internal-fm" }, ILOA_INHERIT_FROM_FUNCLOC: { type: "internal-fm" },
  STATUS_CHANGE_INTERN: { type: "internal-fm" }, STATUS_USER_CHANGE: { type: "internal-fm" },
  K_COSTS_READ: { type: "internal-fm" }, K_SETTLEMENT_RULE_READ: { type: "internal-fm" },
  CO_ZF_ORDER_HEADER_READ: { type: "internal-fm" }, CO_ZF_OPERATIONS_READ: { type: "internal-fm" }, CO_ZF_ORDER_ITEM_READ: { type: "internal-fm" },
};
export function typeFor(name: string, inferred: boolean): TypeRecord {
  if (name in TYPE_OVERRIDE) return TYPE_OVERRIDE[name];
  if (/^BAPI_/.test(name)) {
    // BAPI_ prefix: a genuine released BAPI only when we are confident (not inferred).
    return inferred ? { type: "bapi-like-fm", remoteEnabled: true } : { type: "released-bapi", remoteEnabled: true };
  }
  // Non-BAPI FM: confident → released FM; version-uncertain → treat as internal until verified.
  return inferred ? { type: "internal-fm" } : { type: "released-fm" };
}

/* ---------- Trust (Plan §2.1) ---------- */
// Real, checked upgrades go here ONLY (with stored sources). Empty today by design —
// no object is claimed "official" without a genuine stored citation.
const TRUST_OVERRIDE: Record<string, TrustRecord> = {};

const CURATED_REASON = "מבוסס ידע SAP סטנדרטי ומתועד (BAPI/FM מוכר). ללא ציטוט רשמי מאוחסן — סיווג 'ידע אצור'.";
const REVIEW_REASON = "שם/זמינות תלויי גרסת SAP — לא אומת מול מערכת. מומלץ לאמת ב-SE37 / BAPI Explorer לפני שימוש.";

export function trustFor(name: string, inferred: boolean): TrustRecord {
  if (name in TRUST_OVERRIDE) return TRUST_OVERRIDE[name];
  if (INVALID_NAMES.has(name)) {
    return { level: "invalid" as TrustLevel, reason: CORRECTIONS.find((c) => c.was === name)?.reason || "שם לא תקין", method: "בדיקת תקינות שם", sources: [], lastReviewed: REVIEWED };
  }
  return inferred
    ? { level: "needs-review", reason: REVIEW_REASON, method: "נדרש אימות", sources: [], lastReviewed: REVIEWED }
    : { level: "curated", reason: CURATED_REASON, method: "ידע SAP סטנדרטי (curated)", sources: [], lastReviewed: REVIEWED };
}
