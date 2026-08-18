/* ============================================================================
   PROJECT NEO · MOTION LEVEL BY SURFACE
   ----------------------------------------------------------------------------
   The brief assigns intensity per surface, and the assignment is a product
   decision rather than a visual one, so it is written down once, in one place,
   as data — not scattered across pages as a prop somebody can forget to pass.

     L4  Home · Books · NEO AI        strongest. These are the surfaces a person
                                      arrives at, decides on, and returns to.
     L3  PM · PP-PI                   medium. Someone is STUDYING these, so the
                                      motion may frame the content and must
                                      never compete with it.
     L2  Objects · Tables · Transactions · every detail page
                                      functional. Motion exists to make an
                                      interaction unambiguous, nothing more.
     L1  ERD / Data Model             precision. A diagram is a measurement
                                      instrument; theatre would make it lie.

   THE READER IS DELIBERATELY NOT L4

     Books are L4 because choosing a book is an experience. READING one is not:
     /neo/read is where the person actually works, and every reveal there is a
     line of text arriving late. It sits at L2 with the other working surfaces,
     and that asymmetry is intentional rather than an oversight.
   ========================================================================== */

export type MotionLevel = 1 | 2 | 3 | 4;

/** Longest-prefix wins, so a detail route can opt out of its section's level. */
const RULES: [prefix: string, level: MotionLevel][] = [
  // L1 — precision
  ["/neo/erd", 1],

  // L2 — the working surfaces. Listed explicitly rather than left to the
  // default, so that adding a route never silently inherits "functional".
  ["/neo/read", 2],
  ["/neo/tables", 2],
  ["/neo/transactions", 2],
  ["/neo/object", 2],

  // L3 — the two module studies
  ["/neo/pm", 3],
  ["/neo/pp-pi", 3],

  // L4 — arrival, choice, conversation
  ["/neo/books", 4],
  ["/neo/ai", 4],
  ["/neo/chat", 4],
];

export function motionLevel(path: string): MotionLevel {
  // Home is an exact match: "/neo" must not lend its level to "/neo/tables".
  const p = path.replace(/\/+$/, "") || "/";
  if (p === "/neo") return 4;

  let best: MotionLevel = 2;   // functional is the safe default, not the loud one
  let bestLen = -1;
  for (const [prefix, level] of RULES) {
    if ((p === prefix || p.startsWith(prefix + "/")) && prefix.length > bestLen) {
      best = level;
      bestLen = prefix.length;
    }
  }
  return best;
}
