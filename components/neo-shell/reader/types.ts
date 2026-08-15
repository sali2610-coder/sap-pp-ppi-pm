/* ============================================================================
   PROJECT NEO · READER — the payload contract.
   ----------------------------------------------------------------------------
   Deliberately free of React and of any `node:` import, so the server route and
   the client reader can both read it. Every field below is derived from real
   book data (data/books/<id>.json, through lib/library/registry.ts) — nothing
   here is authored, estimated or padded.

   THE HONESTY RULE, ported from components/neo-shell/books/books-data.ts:
   a number appears only when the project data backs one. `pages` is null for a
   book whose metadata carries no page count, and the surface then says so in
   words instead of printing a figure. There is no "minutes left", no "reading
   time" and no page count per section: the corpus has none of them.
   ========================================================================== */

/** One real subchapter. `page` exists on some books and is null on the rest. */
export interface NRSection {
  id: string;
  title: string;
  page: number | null;
}

export interface NRChapter {
  n: number;
  title: string;
  startPage: number | null;
  sections: NRSection[];
  /**
   * How many subchapters the book holds BEFORE this chapter starts.
   *
   * This is what makes a book-level position honest without inventing a unit:
   * "subchapter 41 of 326" is a count of real rows, computed once here, rather
   * than a scroll ratio dressed up as progress.
   */
  before: number;
}

export interface NRBook {
  id: string;
  titleEn: string;
  titleHe: string | null;
  /** SAP module tag exactly as the book metadata carries it. */
  module: string;
  moduleHe: string;
  /** `var(--mod-*)`, resolved by the shelf so NEO surfaces cannot disagree. */
  mod: string;
  structureHe: string;
  publisher: string | null;
  /** null when the book metadata has no page count. Never guessed. */
  pages: number | null;
  chapters: NRChapter[];
  totalSections: number;
  /**
   * Chapter numbers that genuinely have a page-scan file on disk.
   *
   * Resolved at build time so the reader asks for a figure file only when one
   * exists. The production reader fetches blind and tolerates a 404; that is
   * correct behaviour but it puts a failed request in the console for every
   * chapter without scans, and this surface can simply know instead.
   */
  figChapters: number[];
  /** NEO's own control surface for this book. */
  hubHref: string;
  shelfHref: string;
  /** The canonical production reader. Untouched by this surface. */
  libraryHref: string;
}
