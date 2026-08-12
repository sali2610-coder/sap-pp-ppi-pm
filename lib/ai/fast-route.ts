/**
 * When a Library question may take the FAST model route.
 *
 * Measured A/B, same scope and same retrieved evidence, Haiku vs the quality
 * model:
 *
 *   focused SECTION question    0.8s vs 35.8s TTFT, identical citations
 *   "הסבר בפשטות" on a chapter   0.7s vs 100.2s TTFT, identical six sources
 *   FOLLOW-UP question          FAST REFUSED where quality answered from the
 *                               SAME single passage
 *
 * That last row is why this is a narrow allow-list rather than a global switch.
 * Speed is worthless if the answer disappears, so anything that has to reason
 * across turns, across a whole book, or across the library stays on quality.
 *
 * Deciding here rather than on the server because only the client knows whether
 * a question is a follow-up: `history` is not part of the request contract, so
 * the server sees a first question and a fifth one identically.
 */

/** Task profiles that are simple enough to route fast. */
const FAST_TASKS = new Set([
  "",                  // free text, no explicit profile
  "HEBREW_EXPLAIN",    // the default for a typed question
  "STUDENT_SUMMARY",   // "הסבר בפשטות"
]);

export interface FastRouteInput {
  /** Task the caller asked for, if any. */
  task?: string;
  /** Scope the question is asked in. */
  scope: { bookId?: string; chapter?: number; section?: string };
  /** Turns already in this conversation. A follow-up is anything above zero. */
  turns: number;
}

/**
 * @returns the task to send, or null to leave routing exactly as it was.
 */
export function fastTaskFor({ task, scope, turns }: FastRouteInput): string | null {
  // A follow-up depends on what was said before. Measured: the fast model
  // refused one where the quality model answered from identical evidence.
  if (turns > 0) return null;

  // Whole-library and book-wide questions are synthesis, not lookup.
  if (!scope.bookId) return null;
  if (scope.chapter == null) return null;

  const t = String(task ?? "");
  if (!FAST_TASKS.has(t)) return null;

  // "הסבר בפשטות" is approved for a section OR a chapter; a bare typed question
  // only for a section, which is where the evidence is small and unambiguous.
  if (t === "STUDENT_SUMMARY") return "LIBRARY_QA_FAST";
  return scope.section ? "LIBRARY_QA_FAST" : null;
}
