/**
 * Finds the sentence an answer rested on, inside the text the reader renders.
 *
 * The backend verified the quote against the passage it served. The reader
 * renders the same underlying text, but not byte-identically: the shard may be
 * split into en/he fields, prose is reflowed, and a PDF extraction hyphenates
 * across line breaks. A plain indexOf therefore misses a quote that is
 * genuinely present.
 *
 * So matching normalises layout while preserving words, and maps the match back
 * to real offsets in the ORIGINAL string — the highlight has to land on the text
 * the user is actually looking at, not on a normalised copy of it.
 *
 * Returns null rather than a near-miss. Highlighting the wrong sentence is worse
 * than highlighting nothing: it tells the reader "this is where it came from"
 * and points somewhere else.
 */

export interface Match {
  start: number;
  end: number;
}

/** Characters that carry no meaning for matching. */
const isNoise = (ch: string) =>
  ch === "\u00ad" || ch === "\u200b" || ch === "\u200c" || ch === "\u200d" ||
  // Markdown emphasis: the reader renders **text** as bold, so a quote taken
  // from rendered output has no asterisks while the source string does.
  // Citations point at headings more than anywhere else, and headings are bold.
  ch === "*" || ch === "_" || ch === "`";

/**
 * Normalises while remembering where every kept character came from.
 * The index map is what lets a match in normalised space become a range in the
 * original string.
 */
function normaliseWithMap(src: string): { text: string; map: number[] } {
  const out: string[] = [];
  const map: number[] = [];
  let lastWasSpace = true;   // leading space is dropped

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (isNoise(ch)) continue;

    // "accompa- nying" is one word split by extraction; drop the hyphen and the
    // whitespace that follows it.
    if (ch === "-" && /\s/.test(src[i + 1] ?? "")) {
      let j = i + 1;
      while (j < src.length && /\s/.test(src[j])) j++;
      i = j - 1;
      continue;
    }

    if (/\s/.test(ch)) {
      if (lastWasSpace) continue;
      out.push(" ");
      map.push(i);
      lastWasSpace = true;
      continue;
    }

    const norm = /[""'']/.test(ch) ? '"' : ch.toLowerCase();
    out.push(norm);
    map.push(i);
    lastWasSpace = false;
  }
  return { text: out.join("").trim(), map };
}

/** Same normalisation, without the map — for the needle. */
function normalise(s: string): string {
  return normaliseWithMap(s).text;
}

/**
 * @param haystack the text as rendered
 * @param quote    the verified sentence
 * @returns offsets into `haystack`, or null when it is not genuinely present
 */
export function findQuote(haystack: string, quote: string): Match | null {
  const needle = normalise(quote);
  if (needle.length < 20) return null;   // too short to be evidence

  const { text, map } = normaliseWithMap(haystack);
  let at = text.indexOf(needle);

  // A quote may be trimmed mid-sentence by the model. Fall back to a long
  // prefix, which still lands inside the right paragraph.
  if (at === -1 && needle.length > 60) {
    const prefix = needle.slice(0, Math.floor(needle.length * 0.6));
    at = text.indexOf(prefix);
    if (at === -1) return null;
    const startIdx = map[at];
    const endIdx = map[Math.min(at + prefix.length - 1, map.length - 1)];
    return startIdx == null || endIdx == null ? null : { start: startIdx, end: endIdx + 1 };
  }
  if (at === -1) return null;

  const startIdx = map[at];
  const endIdx = map[Math.min(at + needle.length - 1, map.length - 1)];
  if (startIdx == null || endIdx == null) return null;
  return { start: startIdx, end: endIdx + 1 };
}

/** Splits text into before / match / after, or null when there is no match. */
export function splitOnQuote(text: string, quote?: string | null):
  { before: string; hit: string; after: string } | null {
  if (!quote) return null;
  const m = findQuote(text, quote);
  if (!m) return null;
  return {
    before: text.slice(0, m.start),
    hit: text.slice(m.start, m.end),
    after: text.slice(m.end),
  };
}
