/* THE SENTENCE A CITATION NAMES
   A citation from the assistants opens this reader at ?s=<subchapter>&q=<sentence>
   (lib/ai/links.ts). Landing on the subchapter was not the whole promise: the
   canonical reader also marks the exact sentence, and verify-reader holds that.

   The canonical reader wraps the sentence in a <mark> (lib/library/deep-link.ts,
   markQuote). Here React owns the subchapter's nodes and re-renders them when
   the reading language changes, so moving a text node into a <mark> could break
   that update. The sentence is shown with the CSS Custom Highlight API instead:
   a Range over the nodes as they are, painted by ::highlight(neo-cited)
   (app/neo/reader.css), and nothing in the page is moved.

   The matching is markQuote's: the shared matcher (findQuote), one block at a
   time so a "quote" cannot span two paragraphs, and nothing at all when the
   sentence is not there. A wrong highlight claims a source it is not. One
   difference: a whitespace-only node inside a block is kept. The reader wraps
   each **bold** chunk in its own element, so the space in "**A** **B**" is a
   node of its own, and without it the searched text read "AB". */
import { findQuote } from "@/lib/library/highlight";

export const CITED = "neo-cited";

const BLOCK = "p, li, td, h1, h2, h3, h4, blockquote";

/**
 * The Range of `quote` inside `root`, or null. Visible text is searched first;
 * when the sentence is only in the other language, which single-language mode
 * keeps in a closed disclosure, that disclosure is opened so the mark is seen.
 * With `openHidden` false (after the reader switches language) a closed
 * disclosure is left closed and its text is not searched: the reader's choice
 * of language wins over the mark.
 */
export function citedRange(root: HTMLElement, quote: string, openHidden = true): Range | null {
  if (!quote || quote.length < 12) return null;
  const doc = root.ownerDocument;
  const blocks = new Map<Element, Text[]>();
  const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const t = n as Text;
    const parent = t.parentElement;
    if (!parent || parent.closest("script, style")) continue;
    const block = parent.closest(BLOCK) || parent;
    const list = blocks.get(block) || [];
    list.push(t);
    blocks.set(block, list);
  }
  const closed = (b: Element) => b.closest("details:not([open])");
  const order = [...blocks].sort(([a], [b]) => Number(!!closed(a)) - Number(!!closed(b)));
  for (const [block, texts] of order) {
    if (!openHidden && closed(block)) continue;
    const hit = findQuote(texts.map((t) => t.data).join(""), quote);
    if (!hit) continue;
    const range = doc.createRange();
    let seen = 0;
    let started = false;
    for (const t of texts) {
      const end = seen + t.data.length;
      if (!started && hit.start < end) { range.setStart(t, hit.start - seen); started = true; }
      if (started && hit.end <= end) {
        range.setEnd(t, hit.end - seen);
        const d = closed(block) as HTMLDetailsElement | null;
        if (d) d.open = true;
        return range;
      }
      seen = end;
    }
  }
  return null;
}
