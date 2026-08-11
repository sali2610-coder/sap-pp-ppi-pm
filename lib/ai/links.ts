/**
 * How a citation becomes a URL.
 *
 * Deliberately its own module with no imports: this is pure string work, and
 * keeping it free of the data-layer aliases means it can be unit tested, which
 * the previous version was not — and that is why the bug below shipped.
 */

/**
 * The URL a citation actually navigates to.
 *
 * Built here rather than by concatenating onto `sectionHref`, because that is
 * precisely how it broke: the query was appended AFTER the `#s-…` fragment,
 * which makes the query part of the fragment. `location.search` was therefore
 * always empty, the reader parsed neither section nor quote, and every citation
 * in the product opened a book at the top with nothing highlighted.
 *
 * Query first, fragment last — the only order the URL grammar allows.
 */
export function citationHref(
  bookId: string, chapter: number, section?: string, quote?: string | null,
) {
  const base = `/library/${bookId}/`;
  if (!section) return `${base}#ch-${chapter}`;
  const q = quote ? `&q=${encodeURIComponent(String(quote).slice(0, 300))}` : "";
  // The fragment is kept so the browser can make a native jump to the section
  // before hydration, and so the link still lands usefully with JS disabled.
  return `${base}?s=${encodeURIComponent(section)}${q}#s-${section}`;
}
