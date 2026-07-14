/**
 * Documented complexity model for the canonical registry (Plan §4/§2.6).
 *
 * Operates directly on SapFuncObject — no parallel data model. "Implementation
 * complexity" = how much technical + business effort to use the object correctly.
 * It is COMPUTED from documented signals (never assigned by hand) and every object
 * exposes the exact reasons[] that produced its level, plus an estimated learning
 * time. Curated difficulty from enrichment still wins (see attachComplexity), but
 * the reasons + learn-time are always available.
 */
import type { SapFuncObject, Difficulty, OperationType, TriState } from "@/lib/bapi-registry";

export interface ComplexityInfo {
  difficulty: Difficulty;            // computed level (curated value wins in the registry overlay)
  reasons: string[];                 // human-readable factors
  learnMinutes: [number, number];    // estimated learning window
}

export const LEARN_MINUTES: Record<Difficulty, [number, number]> = {
  Beginner: [5, 15], Intermediate: [20, 45], Advanced: [60, 120], Expert: [120, 240],
};

const WRITE_OPS: OperationType[] = ["Create", "Change", "Delete", "Post", "Confirm", "Mixed"];
const isWrite = (op: OperationType) => WRITE_OPS.includes(op);

// Documented weight rule — transparent + stable.
export const WEIGHTS = {
  commit: 2, write: 2, crossModule: 2, status: 1, sequence: 1,
  perRelated: 0.5, relatedCap: 2, auth: 1, customizing: 1,
} as const;
export const THRESHOLDS = { intermediate: 2, advanced: 5, expert: 8 } as const;

/** Honest COMMIT for display: known value wins; otherwise derived from the operation. */
export function commitInfo(o: SapFuncObject): { value: TriState; derived: boolean } {
  if (o.requiresCommit === "yes" || o.requiresCommit === "no") return { value: o.requiresCommit, derived: false };
  // unknown → derive from operation type (standard SAP behaviour), flagged as derived
  if (isWrite(o.operationType)) return { value: "yes", derived: true };
  if (o.operationType === "Read") return { value: "no", derived: true };
  return { value: "unknown", derived: true };
}

export function computeComplexity(o: SapFuncObject): ComplexityInfo {
  const reasons: string[] = [];
  let score = 0;
  const ci = commitInfo(o);

  if (ci.value === "yes") { score += WEIGHTS.commit; reasons.push(ci.derived ? "כנראה דורש COMMIT (נגזר מסוג הפעולה)" : "דורש BAPI_TRANSACTION_COMMIT"); }
  if (isWrite(o.operationType)) { score += WEIGHTS.write; reasons.push("כותב/משנה נתונים עסקיים"); }
  if (o.secondaryModules && o.secondaryModules.length > 0) { score += WEIGHTS.crossModule; reasons.push(`תלות חוצת-מודולים (${[o.primaryModule, ...o.secondaryModules].join(" + ")})`); }
  if (o.category === "Status" || /status|סטטוס|ולידצ/i.test(o.shortDescriptionHe + " " + (o.parameterSummary || ""))) { score += WEIGHTS.status; reasons.push("דורש טיפול בסטטוס/ולידציה"); }
  if (o.sequence && o.sequence.length > 2) { score += WEIGHTS.sequence; reasons.push(`רצף קריאה רב-שלבי (${o.sequence.length} שלבים)`); }
  const rel = Math.min((o.relatedObjects?.length || 0) * WEIGHTS.perRelated, WEIGHTS.relatedCap);
  if (rel > 0) score += rel;
  if (o.authObjects && o.authObjects.length > 0) { score += WEIGHTS.auth; reasons.push("מורכבות הרשאות"); }
  if ((o.checklist && o.checklist.length > 2) || o.category === "MasterData") { score += WEIGHTS.customizing; reasons.push("דורש הכנה/Customizing מוקדם"); }

  const difficulty: Difficulty =
    score < THRESHOLDS.intermediate ? "Beginner" :
    score < THRESHOLDS.advanced ? "Intermediate" :
    score < THRESHOLDS.expert ? "Advanced" : "Expert";

  if (reasons.length === 0) reasons.push("קריאה פשוטה — ללא כתיבה או תלות מיוחדת");
  return { difficulty, reasons, learnMinutes: LEARN_MINUTES[difficulty] };
}
