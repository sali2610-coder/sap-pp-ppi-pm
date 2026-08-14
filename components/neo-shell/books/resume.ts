// Turning stored evidence into a sentence a person can act on.
//
// The stores hold a chapter number and a section id. Neither is readable on its
// own, and neither may be guessed at: a chapter number that does not exist in
// this book, or a section id that is not in it, means the book data moved under
// a saved pointer. When that happens the pointer is DOWNGRADED — to the chapter
// if the chapter is real, to nothing if it is not — rather than rendered as a
// row that leads somewhere that no longer exists.

import type { BookCard } from "./books-data";
import type { BookReading } from "./reading-state";
import { resumeHref, isExactSection } from "./links";

export interface Resume {
  /** The chapter, when it is genuinely in this book. */
  chapter: number | null;
  chapterTitle: string | null;
  /** The subchapter, when it is genuinely in that chapter. */
  section: string | null;
  sectionTitle: string | null;
  /** Where "continue" goes. Always a real reader URL. */
  href: string;
  /** The link lands on the subchapter itself, not just its chapter. */
  exact: boolean;
  /** Chapters marked read by the canonical reader, clamped to this book. */
  read: number;
  /** read / chapters, 0..1. */
  progress: number;
  /** Nothing at all is known about this book. */
  fresh: boolean;
  /** §6 — the reader's own scroll offset, 0..1, when it has one for this book.
   *  Reported, never resumed from: the deep links the reader accepts address a
   *  chapter or a section, not an offset, so promising it would be a promise
   *  the URL cannot keep. */
  scroll: number | null;
}

export function resolveResume(b: BookCard, r: BookReading | undefined): Resume {
  const chRow = r?.chapter ? b.chapterRows.find((c) => c.n === r.chapter) ?? null : null;

  let section: string | null = null;
  let sectionTitle: string | null = null;
  if (r?.section) {
    // The section id may belong to a different chapter than the stored one —
    // the reader writes both independently — so the whole book is searched and
    // the chapter is taken from wherever the section actually lives.
    for (const c of b.chapterRows) {
      const hit = c.rows.find(([id]) => id === r.section);
      if (hit) { section = hit[0]; sectionTitle = hit[1]; break; }
    }
  }
  const owner = section
    ? b.chapterRows.find((c) => c.rows.some(([id]) => id === section)) ?? chRow
    : chRow;

  const read = (r?.read ?? []).filter((n) => b.chapterRows.some((c) => c.n === n)).length;

  return {
    chapter: owner?.n ?? null,
    chapterTitle: owner?.title ?? null,
    section,
    sectionTitle,
    href: resumeHref(b.href, owner?.n ?? null, section),
    exact: section ? isExactSection(section) : false,
    read,
    progress: b.chapters ? read / b.chapters : 0,
    fresh: !r?.opened,
    scroll: r?.scroll ?? null,
  };
}

/** The one extra sentence the stored offset earns, in words rather than as a
 *  bar. Absent unless the reader really wrote one for this book. */
export function resumeScrollLine(r: Resume): string | null {
  if (r.scroll === null) return null;
  return `הקורא שמר גם את מיקום הגלילה — כ-${Math.round(r.scroll * 100)}% לאורך הטקסט.`;
}

/** The one-line context under "המשך מהמקום האחרון". Never a promise: when only
 *  a chapter is known it says only the chapter. */
export function resumeLine(r: Resume): string | null {
  if (r.fresh || (!r.chapter && !r.section)) return null;
  const parts: string[] = [];
  if (r.chapter) parts.push(`פרק ${r.chapter}`);
  if (r.chapterTitle) parts.push(r.chapterTitle);
  if (r.sectionTitle) parts.push(r.sectionTitle);
  return parts.join(" · ") || null;
}
