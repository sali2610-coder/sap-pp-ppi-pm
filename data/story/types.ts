// Story Mode (Phase D) — guided end-to-end business-process walkthrough.
// Narrative is curated, standard SAP knowledge (trust-tagged). T-Codes and
// related tables are DERIVED from the live dataset at render time — not here.
// `object` must be a REAL table name; trigger/concept steps omit it.

export interface StoryStep {
  id: string;
  n: number;
  phaseHe: string;     // process phase, e.g. "תיעוד", "ביצוע"
  title: string;       // step title (he)
  object?: string;     // real table → graph focus + derived T-Codes/relations
  whatHe: string;      // What is this?
  whyHe: string;       // Why is it needed?
  whenHe: string;      // When is it used?
  createdHe: string;   // What gets created/changed in the system
  s4He?: string;       // What changes in S/4HANA (if relevant)
}

export interface Story {
  id: string;
  he: string;
  sub: string;
  accent: string;
  module: "pm" | "pp-pi";
  learnPath: string;   // back-link to the matching learning path
  steps: StoryStep[];
}
