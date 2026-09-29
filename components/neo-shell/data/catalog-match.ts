/* ============================================================================
   PROJECT NEO · THE CATALOGUE SEARCH — one matcher for /neo/tables,
   /neo/transactions and the five reference directories.
   ----------------------------------------------------------------------------
   Every word of the query has to land, so two words narrow instead of widening.
   A word lands in the first of these tiers that takes it:

     100      the record's text starts with it
     40-69    it is inside the record's text (earlier is better)
     26-36    a Hebrew form of it is: the same word with its ending dropped
              (פקודה, פקודת, פקודות), the term SAP Hebrew writes two ways
              (פקודה/הזמנה, אחזקה/תחזוקה), or the word without a one-letter
              prefix (לפקודה, בהזמנת). "הזמנת תחזוקה" found IW31 14th of 27 and
              "כותרת פקודה" found no table at all (gate 6, major 10).
     28       its letters appear in order in the TECHNICAL NAME only. On the
              whole record text this matched MATMAS in 69 of 144 BAPIs, none of
              them MATMAS (gate 6, minor 22).
     24       it is one edit from the technical name (IW3I → IW31, AFK0 →
              AFKO), the typo the subsequence tier used to catch by accident.

   Pure; test/content-catalog-match.test.ts holds it to those cases.
   ========================================================================== */

import { within } from "@/lib/search-intel";

/** Hebrew terms written two ways in SAP Hebrew, as stems. */
const EQUIV: string[][] = [["פקוד", "הזמנ"], ["אחזק", "תחזוק"]];

const HEB_WORD = /^[א-ת]+$/;
/** A one-letter prefix (ב, ה, ו, כ, ל, מ, ש) before at least three letters. */
const PREFIX = /^[בהוכלמש](?=[א-ת]{3})/;

/** A Hebrew word without its ending ה / ת / ות, from four letters up. */
function stem(w: string): string {
  if (!HEB_WORD.test(w) || w.length < 4) return w;
  if (w.length >= 5 && w.endsWith("ות")) return w.slice(0, -2);
  if (w.endsWith("ה") || w.endsWith("ת")) return w.slice(0, -1);
  return w;
}

/** The Hebrew forms a query word may also land as, the word itself excluded. */
export function hebrewForms(word: string): string[] {
  if (!HEB_WORD.test(word)) return [];
  const out = new Set<string>();
  for (const w of PREFIX.test(word) ? [word, word.slice(1)] : [word]) {
    const s = stem(w);
    out.add(w);
    out.add(s);
    for (const group of EQUIV) if (group.includes(s)) for (const g of group) out.add(g);
  }
  out.delete(word);
  return [...out];
}

/** The forms of a word, computed once per word rather than once per row. */
const formsOf = (() => {
  const memo = new Map<string, string[]>();
  return (word: string) => {
    let f = memo.get(word);
    if (!f) { f = hebrewForms(word); memo.set(word, f); }
    return f;
  };
})();

function wordScore(hay: string, code: string, word: string): number {
  const i = hay.indexOf(word);
  if (i === 0) return 100;
  if (i > 0) return 70 - Math.min(i, 30);
  let best = 0;
  for (const f of formsOf(word)) {
    const j = hay.indexOf(f);
    if (j >= 0) best = Math.max(best, 36 - Math.min(j, 10));
  }
  if (best) return best;
  let qi = 0;
  for (let h = 0; h < code.length && qi < word.length; h++) if (code[h] === word[qi]) qi++;
  if (qi === word.length) return 28;
  return word.length >= 4 && within(code, word, 1) ? 24 : 0;
}

/** The score of a record for a query, 0 when any word misses. `hay` is the
 *  record's lower-cased text, `code` its lower-cased technical name. */
export function catalogScore(hay: string, code: string, query: string): number {
  let total = 0;
  for (const w of query.toLowerCase().split(/\s+/).filter(Boolean)) {
    const s = wordScore(hay, code, w);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

/** A transaction's searchable text: code, area, Hebrew and English names and
 *  module. One definition for the catalogue and its test. */
export const txHay = (t: { code: string; area: string; he: string; en: string; module: string }): string =>
  `${t.code} ${t.area} ${t.he} ${t.en} ${t.module}`.toLowerCase();
