// SAP Learning & Expert Intelligence Layer — knowledge model (Phase A).
// ADDITIVE only: does not touch the graph engine, data model, or architecture.
//
// Two-source discipline (honesty mandate):
//  - DERIVED facts (transactions, BAPIs, CDS, related tables) come straight from
//    the real generated dataset at the call site — never invented here.
//  - CURATED text (role / why / whenUsed / importance / S/4 delta) is standard,
//    well-established SAP knowledge, tagged with `trust` so unverified claims are
//    visibly marked. Nothing is silently fabricated.

export type Importance = "core" | "supporting" | "advanced";
export type Trust = "curated" | "needs-verification";

export interface ObjectKnowledge {
  /** what it is — one line */
  role: string;
  /** why it exists in SAP */
  why: string;
  /** when / where in the business process it is used */
  whenUsed: string;
  /** learning weight — drives Beginner Mode filtering */
  importance: Importance;
  /** short process-step label, e.g. "צו אחזקה · כותרת" */
  step?: string;
  /** extra ECC→S/4 note layered on top of the dataset's own s4 field */
  s4?: string;
  /** confidence of the curated text */
  trust: Trust;
}

// Combined curated knowledge across modules (PM + PP-PI). Single lookup used by
// the Explain Card, Mentor, and Impact Center.
import { PM_KNOWLEDGE } from "@/data/knowledge/pm-objects";
import { PPPI_KNOWLEDGE } from "@/data/knowledge/pppi-objects";
import { PM_KNOWLEDGE_EXT } from "@/data/knowledge/pm-objects-ext";
import { PPPI_KNOWLEDGE_EXT } from "@/data/knowledge/pppi-objects-ext";
export function knowledgeFor(name: string): ObjectKnowledge | undefined {
  return PM_KNOWLEDGE[name] || PPPI_KNOWLEDGE[name] || PM_KNOWLEDGE_EXT[name] || PPPI_KNOWLEDGE_EXT[name];
}

export const IMPORTANCE_HE: Record<Importance, string> = {
  core: "ליבה — חובה ללמוד",
  supporting: "תומך — חשוב",
  advanced: "מתקדם",
};
export const IMPORTANCE_COLOR: Record<Importance, string> = {
  core: "#d62027",
  supporting: "#d97706",
  advanced: "#64748b",
};
export const TRUST_NOTE: Record<Trust, string> = {
  curated: "ידע SAP סטנדרטי",
  "needs-verification": "נדרש אימות SAP",
};
