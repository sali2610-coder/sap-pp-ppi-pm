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

/** Counts a node can advertise before it is opened. Short keys: 4,314 of these ship. */
export interface NodeMetrics {
  w: number;    // words
  d: number;    // diagram fences
  tb: number;   // contains a table
  tc: number;   // distinct T-Codes
  o: number;    // distinct BAPI/FM objects
  ab: number;   // contains ABAP
  cf: number;   // contains an IMG/config path
  fi: number;   // mentions Fiori
  fg: number;   // contains a figure
  min?: number; // estimated reading minutes (chapters only)
}

export interface TreeSection {
  id: string;
  t: string;
  en: string;
  /** Page number, when the source has one. */
  p?: number;
  m?: NodeMetrics;
  /** Sub-sections, nested by dotted id. Absent when there are none. */
  children?: TreeSection[];
}

export interface TreeChapter {
  n: number;
  t: string;
  p?: number;
  m?: NodeMetrics;
  /** Nested view. `sections` stays flat because scope addresses by id. */
  nodes?: TreeSection[];
  sections: TreeSection[];
}
export interface BookTree { id: string; title: string; chapters: TreeChapter[] }

/** What the AI is allowed to read. Narrower scope = tighter, faster answers. */
export interface Scope {
  bookId?: string;
  chapter?: number;
  section?: string;
}

/**
 * Where an answer's information actually came from.
 *
 * Every field is carried from the passage the backend served — none is inferred
 * from an SAP object name or re-derived locally. The client used to fill in
 * `title` from its own index because the API always sent null; it now arrives
 * as `sectionTitle`, from the same record the retrieval used.
 */
export interface Citation {
  id: string;                    // book1#5#5.2.10
  /** The retrieval event this came from — traces an artifact to its source. */
  retrievalId?: string;
  bookId: string;
  book: string;
  chapter: number;
  chapterTitle?: string | null;
  section: string;
  sectionTitle?: string | null;
  /** Printed page range, when known. */
  page?: { from: number; to: number } | null;
  /** True when the page numbers are derived rather than printed. */
  pageEstimated?: boolean;
  /** direct | neighbour | supporting — how the passage was reached. */
  role?: string | null;
  /** 0-1, normalised within this retrieval and weighted by role. */
  confidence?: number;
  /** True when the answer leaned on it, false when it was merely served. */
  cited?: boolean;
  /** Kept for compatibility with existing renderers. */
  title: string | null;
  quote?: string;
  href: string;                  // deep link into the reader
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
  /**
   * Set when the question asked for a picture. `kind` is what we inferred,
   * `drawn` says whether the answer actually carried a diagram we could render.
   * The UI owes the user an honest word when they asked for one and it is
   * missing, rather than silently handing back the same bullet list.
   */
  diagram?: { kind: string; explicit: boolean; drawn: boolean; unsupported: boolean };
}

export interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  icon: string;
  /** Actions that only make sense once a book or chapter is chosen. */
  needsScope?: boolean;
}
