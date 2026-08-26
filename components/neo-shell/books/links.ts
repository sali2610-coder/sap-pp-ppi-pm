// The one place that knows how to point at a location INSIDE a reader.
//
// THERE ARE TWO READERS AND THEY ARE NOT THE SAME SHAPE.
//
//   /neo/read/<id>/    NEO's own reading surface. Its opening resolver
//                      (components/neo-shell/reader/neo-reader.ts, resolveOpening)
//                      reads `?c=<n>` and `?s=<sectionId>` and matches the id
//                      against THIS BOOK'S REAL SECTIONS — so any id in the book
//                      lands on the subchapter itself, including book7's Fiori
//                      app ids (F1393), which are not dotted numbers.
//
//   /library/<id>/     the canonical production reader, untouched. Its deep link
//                      is narrower; see the note under DOTTED below.
//
// NEO surfaces link at the NEO reader. The canonical reader keeps its own links
// and is still reachable, named as itself, from the hub and from the reader's
// own footer.
//
// Nothing here invents a URL scheme — every form below already exists in the
// reader that receives it and is used by it today:
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

/* ------------------------------------------------------- the NEO reader ---
   /neo/read/<id>/ is generated for every id in the registry's own list
   (app/neo/read/[bookId]/generateStaticParams over readerBookIds()), which is
   the SAME list the shelf and the hubs are built from. A NEO surface therefore
   cannot link at a reader page that was not exported.

   The query string carries the location. `output: 'export'` serves the same
   pre-rendered HTML for every query, and the reader reads the query on the
   client — so this adds no route, no variant and no server. */

/** NEO's own reading surface for a book. */
export const neoReadHref = (bookId: string): string => `/neo/read/${bookId}/`;

/** NEO's reader, opened on a chapter. */
export const neoChapterHref = (bookId: string, n: number): string =>
  `/neo/read/${bookId}/?c=${n}`;

/** NEO's reader, landed on the subchapter itself. Unlike the canonical reader's
 *  `?s=`, this one is resolved against the book's real section ids rather than
 *  against a number format, so every row in every book lands. */
export const neoSectionHref = (bookId: string, id: string): string =>
  `/neo/read/${bookId}/?s=${encodeURIComponent(id)}`;

/** Where "continue reading" points inside the NEO reader. */
export function neoResumeHref(bookId: string, chapter: number | null, section: string | null): string {
  if (section) return neoSectionHref(bookId, section);
  if (chapter && chapter > 0) return neoChapterHref(bookId, chapter);
  return neoReadHref(bookId);
}
