/* ============================================================================
   PROJECT NEO · READER — the progress model.
   ----------------------------------------------------------------------------
   Pure functions over the real spine. No React, no DOM, no storage.

   THREE SCALES, THREE HONEST UNITS
     BOOK     subchapter ordinal / total subchapters. A count of real rows.
              Not a page number — most books carry no per-section page — and not
              a scroll ratio, which would make a long chapter look like a short
              book.
     CHAPTER  subchapter index / subchapters in this chapter.
     SECTION  how far the viewport has travelled through the subchapter that is
              open right now. Measured, 0..1, and the only scroll-derived
              number in the model.

   Percentages are rounded for display only; the raw ratios drive the bars, so a
   bar never disagrees with the number printed beside it by more than rounding.

   Nothing here fabricates a "time left". The corpus has no word counts and no
   reading speed, so the reader does not claim one.
   ========================================================================== */

import type { NRBook, NRChapter } from "./types";

export interface NRPosition {
  /** The chapter currently open. Always a real chapter of this book. */
  chapter: NRChapter;
  /** Index of the subchapter in view, within that chapter. -1 before spy runs. */
  index: number;
  /** Section id in view, when the chapter has sections at all. */
  sectionId: string | null;
  /** 0..1 through the subchapter in view. */
  within: number;
}

export interface NRProgress {
  /** 0..1 across the whole book, by subchapter ordinal. */
  book: number;
  /** 0..1 across the open chapter. */
  chapter: number;
  /** 0..1 through the open subchapter. */
  section: number;
  /** Subchapter ordinal in the book, 1-based. 0 when the book has none. */
  ordinal: number;
  /** Chapter ordinal, 1-based, in the book's own chapter order. */
  chapterOrdinal: number;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Rounded whole percent, for display beside a bar. */
export const pct = (n: number): number => Math.round(clamp01(n) * 100);

export function chapterOrdinal(book: NRBook, n: number): number {
  const i = book.chapters.findIndex((c) => c.n === n);
  return i < 0 ? 1 : i + 1;
}

export function computeProgress(book: NRBook, pos: NRPosition): NRProgress {
  const ch = pos.chapter;
  const count = ch.sections.length;
  const i = pos.index < 0 ? 0 : Math.min(pos.index, Math.max(0, count - 1));
  const within = clamp01(pos.within);

  // A chapter with no subchapters is a real state (a heading-only chapter), and
  // it must not divide by zero: its own progress is then the scroll through it.
  const chapter = count > 0 ? clamp01((i + within) / count) : within;

  const ordinal = count > 0 ? ch.before + i + 1 : ch.before;
  const bookRaw = book.totalSections > 0
    ? (ch.before + (count > 0 ? i + within : 0)) / book.totalSections
    : 0;

  return {
    book: clamp01(bookRaw),
    chapter,
    section: within,
    ordinal,
    chapterOrdinal: chapterOrdinal(book, ch.n),
  };
}

/** Where a chapter's boundary sits on the book track, 0..1. Drives the ticks. */
export const chapterAt = (book: NRBook, c: NRChapter): number =>
  book.totalSections > 0 ? clamp01(c.before / book.totalSections) : 0;

/** How much of the book track one chapter occupies, 0..1. */
export const chapterSpan = (book: NRBook, c: NRChapter): number =>
  book.totalSections > 0 ? clamp01(c.sections.length / book.totalSections) : 0;

/* --------------------------------------------------------------- stepping */

export interface NRStep {
  chapter: number;
  sectionId: string | null;
}

/**
 * The next / previous subchapter, crossing a chapter boundary when it has to.
 *
 * @returns null at the two ends of the book — the caller then disables the
 *          control rather than wrapping around, which would silently take a
 *          reader from the last page to the first.
 */
export function stepSection(book: NRBook, chapterN: number, index: number, dir: 1 | -1): NRStep | null {
  const ci = book.chapters.findIndex((c) => c.n === chapterN);
  if (ci < 0) return null;
  const ch = book.chapters[ci];
  const next = index + dir;

  if (next >= 0 && next < ch.sections.length) {
    return { chapter: ch.n, sectionId: ch.sections[next].id };
  }
  const nc = book.chapters[ci + dir];
  if (!nc) return null;
  const target = dir === 1 ? nc.sections[0] : nc.sections[nc.sections.length - 1];
  return { chapter: nc.n, sectionId: target ? target.id : null };
}

/** What a step actually points at, named from the book's own rows. */
export interface NRStepView {
  /** The subchapter title, or the chapter title when the step is chapter-level. */
  title: string;
  /** The subchapter id, when the step has one. */
  id: string | null;
  /** The step leaves the chapter that is open. Said out loud rather than
   *  discovered by the reader when the whole page changes underneath them. */
  crosses: boolean;
  chapter: number;
}

/**
 * Resolves a step into words. Returns null for a step that does not exist,
 * which is the same signal `stepSection` gives, so a caller can pass one
 * straight into the other.
 */
export function stepView(book: NRBook, from: number, step: NRStep | null): NRStepView | null {
  if (!step) return null;
  const ch = book.chapters.find((c) => c.n === step.chapter);
  if (!ch) return null;
  const sec = step.sectionId ? ch.sections.find((s) => s.id === step.sectionId) : undefined;
  return {
    title: sec ? sec.title : ch.title,
    id: sec ? sec.id : null,
    crosses: step.chapter !== from,
    chapter: step.chapter,
  };
}

/* ----------------------------------------------------------------- words */

const nf = new Intl.NumberFormat("he-IL");
export const n = (x: number): string => nf.format(x);

/** The breadcrumb's third leg, in words. Empty when the chapter has none. */
export function sectionLabel(ch: NRChapter, index: number): string | null {
  if (!ch.sections.length) return null;
  const s = ch.sections[Math.min(Math.max(index, 0), ch.sections.length - 1)];
  return s ? s.title : null;
}

/**
 * The one sentence that states the whole position. Used by the mobile bar and
 * by the progress overview, so the two cannot drift.
 */
export function positionLine(book: NRBook, p: NRProgress, ch: NRChapter): string {
  const parts = [`פרק ${n(p.chapterOrdinal)} מתוך ${n(book.chapters.length)}`];
  if (ch.sections.length) {
    parts.push(`תת-פרק ${n(p.ordinal)} מתוך ${n(book.totalSections)}`);
  } else {
    parts.push("לפרק זה אין תת-פרקים במאגר");
  }
  return parts.join(" · ");
}
