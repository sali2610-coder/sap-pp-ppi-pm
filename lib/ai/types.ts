// Shared shapes for the AI workspace.
//
// These mirror what /api/ask-v2 already returns (answer, sources, policy) so
// swapping mock data for the live backend in Phase 2 is a change of source, not
// a change of contract.

export interface BookSummary {
  id: string;          // book1 … book11 — the id the backend indexes by
  title: string;
  module: string;      // PM / PP / QM … the site's existing vocabulary
  chapters: number;
  sections: number;
  hebrew: boolean;
}

export interface TreeSection { id: string; t: string; en: string }
export interface TreeChapter { n: number; t: string; sections: TreeSection[] }
export interface BookTree { id: string; title: string; chapters: TreeChapter[] }

/** What the AI is allowed to read. Narrower scope = tighter, faster answers. */
export interface Scope {
  bookId?: string;
  chapter?: number;
  section?: string;
}

export interface Citation {
  id: string;          // book1#5#5.2.10
  book: string;
  bookId: string;
  chapter: number;
  section: string;
  title: string | null;
  quote?: string;
  href: string;        // deep link into the reader
}

/** FULL / PARTIAL / REFUSE, surfaced honestly rather than hidden. */
export type AnswerPolicy = "FULL" | "PARTIAL" | "REFUSE";

export interface Answer {
  id: string;
  question: string;
  text: string;
  policy: AnswerPolicy;
  confidence: number;          // 0-1, derived from policy + citation coverage
  citations: Citation[];
  followUps: string[];
  scope: Scope;
  model?: string;
  ms?: number;
  pending?: boolean;
  error?: string;
  /** The API hit its token ceiling; the answer is incomplete. */
  truncated?: boolean;
}

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  icon: string;
  /** Actions that only make sense once a book or chapter is chosen. */
  needsScope?: boolean;
}
