/**
 * Complexity engine (Plan §2.6).
 *
 * Complexity is COMPUTED from documented signals, never assigned by hand. The
 * weight table below is the rule; the detail page renders the exact reasons[]
 * that produced the level. "Implementation complexity" = how much technical +
 * business effort to use the object correctly. It is NOT a quality, importance,
 * or skill judgment.
 *
 * scoreComplexity() is pure (signals in → result out) and unit-tested in
 * scripts/test-complexity.mjs. deriveSignals() maps curated FunctionIntel onto
 * those signals.
 */
import type { Commit, ComplexityResult, ComplexityLevel } from "@/lib/catalog/types";
import type { FunctionIntel } from "@/data/function-intel";

export interface ComplexitySignals {
  commitRequired: boolean;
  writesBusinessData: boolean;   // create/change to production/inventory/financial
  requiredStructures: number;    // mandatory input structures
  mandatoryParams: number;       // total mandatory inputs
  statusHandling: boolean;       // status / validation logic involved
  crossModule: boolean;          // touches another module (e.g. PP + MM/FI)
  relatedCount: number;          // related tcodes/tables/idocs/cds
  authComplexity: boolean;       // notable authorization objects
  customizing: boolean;          // customizing prerequisites
}

// Documented weights — the rule. Change here = change the model, transparently.
export const WEIGHTS = {
  commit: 2,
  writes: 2,
  perRequiredStructure: 1,   // cap 3
  perMandatoryParam: 0.5,    // cap 2 (i.e. up to 4 params)
  status: 1,
  crossModule: 2,
  perRelated: 0.5,           // cap 2
  auth: 1,
  customizing: 1,
} as const;

export const THRESHOLDS = { basic: 3, intermediate: 6 } as const; // <3 basic, 3–6 intermediate, >6 advanced
export const LEARN_MINUTES: Record<ComplexityLevel, [number, number]> = {
  basic: [5, 15],
  intermediate: [20, 45],
  advanced: [60, 120],
};

const cap = (n: number, max: number) => Math.min(n, max);

export function scoreComplexity(s: ComplexitySignals): ComplexityResult {
  let score = 0;
  const reasons: string[] = [];

  if (s.commitRequired) { score += WEIGHTS.commit; reasons.push("דורש BAPI_TRANSACTION_COMMIT לשמירה"); }
  if (s.writesBusinessData) { score += WEIGHTS.writes; reasons.push("כותב/משנה נתונים עסקיים (ייצור/מלאי/חשבונאות)"); }

  const rs = cap(s.requiredStructures, 3);
  if (rs > 0) { score += rs * WEIGHTS.perRequiredStructure; reasons.push(`${s.requiredStructures} מבני קלט חובה`); }

  const mp = cap(s.mandatoryParams * WEIGHTS.perMandatoryParam, WEIGHTS.perMandatoryParam * 4);
  if (s.mandatoryParams > 0) { score += mp; }

  if (s.statusHandling) { score += WEIGHTS.status; reasons.push("דורש טיפול בסטטוס/ולידציה"); }
  if (s.crossModule) { score += WEIGHTS.crossModule; reasons.push("תלות חוצת-מודולים"); }

  const rel = cap(s.relatedCount * WEIGHTS.perRelated, WEIGHTS.perRelated * 4);
  if (s.relatedCount > 0) { score += rel; }

  if (s.authComplexity) { score += WEIGHTS.auth; reasons.push("מורכבות הרשאות"); }
  if (s.customizing) { score += WEIGHTS.customizing; reasons.push("דורש הגדרות Customizing מוקדמות"); }

  const level: ComplexityLevel = score < THRESHOLDS.basic ? "basic" : score <= THRESHOLDS.intermediate ? "intermediate" : "advanced";
  if (reasons.length === 0) reasons.push("קריאה פשוטה ללא כתיבה או תלות מיוחדת");

  return { level, score: Math.round(score * 10) / 10, reasons, learnMinutes: LEARN_MINUTES[level] };
}

/* ---------- Map curated intel → signals ---------- */

const WRITE_VERB = /(CREATE|CHANGE|MAINTAIN|SAVE|POST|CANCEL|CONF|_ADD|UPDATE|DELETE|SET|INSTALL|DISMANTLE|GENERATE)/;
const STATUS_RE = /(סטטוס|status|ולידצ|validation|TECO|שחרור|release)/i;
// Word-boundaried module codes + explicit cross-module concepts. Deliberately NOT
// bare "CO"/"MM" (those match substrings like COMMIT/cost and over-fire).
const CROSS_RE = /(\bMM\b|\bFI\b|\bSD\b|תנועת מלאי|goods ?movement|Backflush|\bGR\b|מרכז עלות|cost ?center|settlement|reservation)/i;
const AUTH_RE = /(הרשא|auth|S_[A-Z]|C_[A-Z]|I_[A-Z])/;
const CUSTO_RE = /(SPRO|הגדר|profile|פרופיל|סוג פקודה|order ?type|גרסת ייצור|prod.?vers|customi|מחוון מבנה|structure indicator|catalog|קטלוג)/i;

export function deriveSignals(fn: FunctionIntel, commit: Commit): ComplexitySignals {
  const reqInputs = fn.inputs.filter((p) => p.req);
  const text = `${fn.what} ${fn.why} ${fn.qa?.scenario || ""} ${(fn.qa?.failures || []).join(" ")} ${(fn.qa?.deps || []).join(" ")}`;
  const related = fn.related || {};
  const relatedCount = (related.tcodes?.length || 0) + (related.tables?.length || 0) + (related.idocs?.length || 0) + (related.cds?.length || 0);
  const writes = WRITE_VERB.test(fn.name) && commit === "required";
  return {
    commitRequired: commit === "required",
    writesBusinessData: writes,
    requiredStructures: reqInputs.filter((p) => p.dir === "import" || p.dir === "table").length,
    mandatoryParams: reqInputs.length,
    statusHandling: STATUS_RE.test(text),
    crossModule: CROSS_RE.test(text),
    relatedCount,
    authComplexity: AUTH_RE.test((fn.qa?.failures || []).join(" ")),
    customizing: CUSTO_RE.test((fn.qa?.deps || []).join(" ") + " " + text),
  };
}
