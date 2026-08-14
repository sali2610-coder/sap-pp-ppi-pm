// The one place that knows how to point at a location INSIDE the canonical
// reader. Nothing here invents a URL scheme — both forms below already exist in
// the reader and are used by it today:
//
//   ?s=<sectionId>   components/book-reader.tsx reads it through
//                    lib/library/deep-link.ts (readDeepLink), expands the owning
//                    chapter via #ch-<n>, scrolls to the section and flashes it.
//                    readDeepLink ACCEPTS DOTTED NUMBERS ONLY — anything else is
//                    rejected and the reader stays where it is.
//
//   #ch-<n>          components/chapter-reader.tsx listens for this hash and
//                    expands + mounts that chapter. The <section id="ch-n"> is in
//                    the first paint, so a cold load lands on it.
//
//   #sec-<id>        also handled by chapter-reader's hash branch: it expands the
//                    owning chapter. The section body is lazy-mounted, so the
//                    landing is chapter-level, not sentence-level.
//
// That asymmetry is real and is surfaced, not smoothed over: ten of the eleven
// books number their sections (1.1, 1.1.1) and get an exact landing; book7 is a
// Fiori catalogue whose section ids are app ids (F1393), so its rows say they
// open the chapter rather than pretending to land on the entry.

/** The shape `readDeepLink` in lib/library/deep-link.ts will accept. */
const DOTTED = /^[0-9]+(\.[0-9]+)*$/;

/** True when `?s=` will actually land on this section in the reader. */
export const isExactSection = (id: string): boolean => DOTTED.test(id);

/** `/library/book1/` + 3 -> `/library/book1/#ch-3` */
export const chapterHref = (bookHref: string, n: number): string => `${bookHref}#ch-${n}`;

/** The deepest link the reader genuinely supports for this section. */
export const sectionHref = (bookHref: string, id: string): string =>
  isExactSection(id) ? `${bookHref}?s=${encodeURIComponent(id)}` : `${bookHref}#sec-${id}`;

/** Where a resume points. `section` wins when there is one, else the chapter,
 *  else the book's front door. */
export function resumeHref(bookHref: string, chapter: number | null, section: string | null): string {
  if (section) return sectionHref(bookHref, section);
  if (chapter && chapter > 0) return chapterHref(bookHref, chapter);
  return bookHref;
}
