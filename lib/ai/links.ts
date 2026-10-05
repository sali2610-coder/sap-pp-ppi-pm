/**
 * How a citation becomes a URL.
 *
 * Deliberately its own module with no imports: this is pure string work, and
 * keeping it free of the data-layer aliases means it can be unit tested, which
 * the previous version was not — and that is why the bug below shipped.
 */

/**
 * The URL a citation actually navigates to: the NEO reader, on the cited
 * subchapter, carrying the verified sentence so the reader can mark it.
 *
 *   book       /neo/read/<id>/
 *   chapter    /neo/read/<id>/?c=<n>
 *   section    /neo/read/<id>/?s=<sectionId>
 *   + quote    /neo/read/<id>/?s=<sectionId>&q=<sentence>
 *
 * These are the NEO reader's own forms (neoReadHref, neoChapterHref and
 * neoSectionHref in components/neo-shell/books/links.ts). They are mirrored
 * here rather than imported because the test runner loads this file directly
 * and cannot resolve an extensionless import; test/citation-href.test.ts pins
 * the two together so they cannot drift into a third convention.
 *
 * Relative, so a Preview stays on its own host. No fragment: the reader lands
 * from the query and nothing may follow it. A quote travels only with a
 * section, the one place the reader can check it against.
 */
export function citationHref(
  bookId: string, chapter?: number | null, section?: string | null, quote?: string | null,
): string {
  const book = `/neo/read/${bookId}/`;
  if (section) {
    const q = quote ? `&q=${encodeURIComponent(String(quote).slice(0, 300))}` : "";
    return `${book}?s=${encodeURIComponent(section)}${q}`;
  }
  return chapter && chapter > 0 ? `${book}?c=${chapter}` : book;
}
