/* ============================================================================
   PROJECT NEO · LEARNING SURFACES — module identity.
   ----------------------------------------------------------------------------
   components/neo-shell/mod-var.ts already resolves a module hue, but it only
   knows the five modules the data surfaces need (PM / PP-PI / PP / QM / MM).
   The learning surfaces reach wider: the academy carries EWM, PP/DS and IBP
   courses, and the incident catalogue carries a "Cross" bucket that is not a
   module at all.

   Rather than widen a file the data surfaces depend on, this module extends the
   same map locally and keeps the same two guarantees:

     · every value is a `var(--mod-*)` reference declared in app/globals.css —
       never a hex, never brand red, which is the global accent and never a
       module colour;
     · anything unmapped resolves to neutral ink. "Cross" is deliberately
       neutral: an incident that spans modules does not belong to one, and
       painting it with a borrowed hue would be a claim the data does not make.

   Dependency-free on purpose — client components import it, and it must not
   drag the SAP knowledge base into the browser bundle.
   ========================================================================== */

const MOD_VAR: Record<string, string> = {
  PM: "var(--mod-pm)",
  "PM-User": "var(--mod-pm)",
  PP: "var(--mod-pp)",
  "PP-PI": "var(--mod-pppi)",
  "PP-DS": "var(--mod-ppds)",
  QM: "var(--mod-qm)",
  MM: "var(--mod-mm)",
  WM: "var(--mod-ewm)",
  EWM: "var(--mod-ewm)",
  SOP: "var(--mod-sop)",
  "S&OP": "var(--mod-sop)",
};

/** Module hue as a CSS var reference. Neutral ink when the key is not a module
 *  this product assigns a colour to — never brand red. */
export const learnModVar = (m?: string): string => (m && MOD_VAR[m]) || "var(--ink-3)";

/** The name the course screen answers to when a lesson hands its state back.
 *  One constant, so the sender and the receiver cannot drift apart. */
export const COURSE_SURFACE = "neo:course";

/** What a lesson hands the course screen on the way back. A `type` and not an
 *  `interface`, because the origin store's state is an index signature. */
export type CourseReturn = { id: string; y: number };

/** Hebrew module names, as they are already written across the product. */
export const LEARN_MOD_HE: Record<string, string> = {
  PM: "אחזקה",
  "PM-User": "אחזקה · משתמש",
  PP: "ייצור",
  "PP-PI": "ייצור תהליכי",
  "PP-DS": "תכנון מתקדם",
  QM: "איכות",
  MM: "רכש",
  WM: "מחסן",
  EWM: "מחסן",
  SOP: "תכנון מכירות ותפעול",
  Cross: "חוצה-מודולים",
};
