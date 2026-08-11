/**
 * Landing a citation inside the bespoke book reader.
 *
 * Ask-the-Library is the layer that adapts here, not the Library. The reader
 * already knows how to jump to a section and flash it; all that was missing was
 * reading the request off the URL and marking the exact sentence once it
 * arrives. Nothing about how a book looks is decided in this file.
 *
 * The two readers disagreed on one detail and that alone broke the feature: the
 * bespoke reader gives sections the id `sec-4.4.1`, while citations were built
 * with `#s-4.4.1`. The fragment matched nothing, so the browser stayed put.
 *
 * Kept out of the component so it can be unit tested — components/book-reader
 * is a TSX file the type-stripping test runner cannot parse. The quote matcher
 * is injected rather than imported so this module has no dependencies at all
 * and the test runner can load it directly.
 */

/** Locates a sentence inside a block of text. `findQuote` from ./highlight. */
export type Matcher = (haystack: string, needle: string) => { start: number; end: number } | null;

/** The element id the bespoke reader gives a section. */
export const sectionElementId = (sectionId: string) => `sec-${sectionId}`;

export interface DeepLink {
  section: string;
  quote: string | null;
}

/**
 * Reads a citation request from a URL.
 *
 * @returns null when this is an ordinary visit, so the reader does nothing at
 *          all — a book opened normally must behave exactly as before.
 */
export function readDeepLink(search: string): DeepLink | null {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search || "");
  } catch {
    return null;
  }
  const section = (params.get("s") || "").trim();
  // Section ids are dotted numbers. Anything else is not one of ours, and
  // building a selector from unvalidated input is how a query string turns
  // into a DOM injection.
  if (!section || !/^[0-9]+(\.[0-9]+)*$/.test(section)) return null;
  const quote = (params.get("q") || "").trim();
  return { section, quote: quote || null };
}

/**
 * Wraps the cited sentence in a <mark> inside an already-rendered section.
 *
 * Styling is inline rather than a class: this must not add a rule to the
 * Library's stylesheet, and the mark only ever exists on a page opened from a
 * citation.
 *
 * @returns the element marked, or null when the sentence is not present — in
 *          which case the reader still scrolled to the right section. A wrong
 *          highlight is worse than none: it points somewhere and claims that is
 *          where the answer came from.
 */
export function markQuote(root: HTMLElement, quote: string, doc: Document, match: Matcher): HTMLElement | null {
  if (!quote || quote.length < 12) return null;

  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const t = n as Text;
    // Skip anything already inside a mark, and script/style content.
    const parent = t.parentElement;
    if (!parent || parent.closest("mark, script, style")) continue;
    if (t.data.trim()) nodes.push(t);
  }
  if (!nodes.length) return null;

  // Match against each block's own text. Matching across the whole section
  // would let a "quote" span two unrelated paragraphs.
  const blocks = new Map<HTMLElement, Text[]>();
  for (const t of nodes) {
    const block = t.parentElement!.closest("p, li, td, h1, h2, h3, h4, blockquote") || t.parentElement!;
    const list = blocks.get(block as HTMLElement) || [];
    list.push(t);
    blocks.set(block as HTMLElement, list);
  }

  for (const [block, texts] of blocks) {
    const full = texts.map((t) => t.data).join("");
    const hit = match(full, quote);
    if (!hit) continue;

    // Map the offset back to the text node that holds it.
    let seen = 0;
    for (const t of texts) {
      const end = seen + t.data.length;
      if (hit.start >= seen && hit.start < end) {
        const from = hit.start - seen;
        const to = Math.min(t.data.length, hit.end - seen);
        const range = doc.createRange();
        range.setStart(t, from);
        range.setEnd(t, Math.max(from + 1, to));
        const mark = doc.createElement("mark");
        mark.setAttribute("data-neo-cited", "");
        mark.style.cssText =
          "background:#fde68a;color:inherit;border-radius:2px;padding:0 .1em;box-decoration-break:clone";
        try {
          range.surroundContents(mark);
        } catch {
          // The match straddles an inline element (bold, a link). Marking the
          // block is honest and keeps the DOM intact.
          block.style.backgroundColor = "#fde68a";
          return block;
        }
        return mark;
      }
      seen = end;
    }
  }
  return null;
}

/** The chapter a dotted section id belongs to. `4.4.1` -> 4. */
export function chapterOf(sectionId: string): number | null {
  const n = Number(String(sectionId).split(".")[0]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/**
 * Opens a collapsed section by pressing its own header control.
 *
 * Some books render each section as an accordion whose body is not in the DOM
 * until it is opened, so a citation into one of them found the section shell
 * and nothing to highlight inside it. Rather than reach into any book's state,
 * this presses the control the reader already renders — the same thing a click
 * would do — so the accordion keeps its own behaviour and appearance.
 *
 * @returns true when something was pressed, so the caller knows to wait.
 */
export function expandSection(el: HTMLElement): boolean {
  const header = Array.from(el.children).find(
    (c): c is HTMLButtonElement => c.tagName === "BUTTON",
  );
  if (!header) return false;
  header.click();
  return true;
}

/**
 * Resolves once the page has stopped scrolling.
 *
 * The reader scrolls smoothly, and on the largest book the target sits 339k
 * characters in, so a fixed timeout is a guess that is either wrong or slow.
 * This waits for the actual condition instead: two consecutive frames at the
 * same offset.
 */
export function afterScrollSettles(win: Window, done: () => void, maxMs = 4000): () => void {
  let last = -1, stable = 0, stop = false;
  const started = Date.now();
  const tick = () => {
    if (stop) return;
    const y = Math.round(win.scrollY);
    stable = y === last ? stable + 1 : 0;
    last = y;
    if (stable >= 2 || Date.now() - started > maxMs) { done(); return; }
    win.requestAnimationFrame(tick);
  };
  win.requestAnimationFrame(tick);
  return () => { stop = true; };
}
