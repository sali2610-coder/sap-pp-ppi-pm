// Project NEO · the command surface — Hebrew forms (gate 6, major 10).
//
// A reader types "הזמנת תחזוקה" and the dataset writes "הזמנות תחזוקה", or
// "פקודת אחזקה". Matching raw substrings found none of them. This folds the
// forms a query and a record disagree on, and nothing else:
//
//   final letters     ם ן ץ ף ך  →  מ נ צ פ כ, so a stripped word still matches
//   plural, construct and feminine endings   ות ים ה ת
//   two pairs the product's own data uses interchangeably
//                     פקודה ~ הזמנה (an order), אחזקה ~ תחזוקה (maintenance)
//   one-letter prefixes  ה ו ב ל מ ש כ  — query side only, and only as a
//                     second reading of the word, because they are also the
//                     first letter of real words (הזמנה, מתכון, שדה)
//
// Latin text, digits and SAP identifiers pass through lowercased, so a mixed
// query ("IW31 הזמנה") folds its Hebrew half and keeps its code.

const HEB = /[א-ת]/;
const FINAL: Record<string, string> = { "ם": "מ", "ן": "נ", "ץ": "צ", "ף": "פ", "ך": "כ" };
const PREFIX = "הובלמשכ";
/** Stems that name the same thing in the project's data. */
const SAME: Record<string, string> = { "פקוד": "הזמנ", "תחזוק": "אחזק" };

/** One Hebrew word to its folded stem. */
function stem(word: string): string {
  let w = word.replace(/[םןץףך]/g, (c) => FINAL[c]);
  if (w.length >= 5 && (w.endsWith("ות") || w.endsWith("ימ"))) {
    w = w.slice(0, -2);
    // טבלאות → טבלא → טבל, so the plural meets the singular's stem
    if (w.length >= 4 && w.endsWith("א")) w = w.slice(0, -1);
  } else if (w.length >= 4 && (w.endsWith("ה") || w.endsWith("ת"))) {
    w = w.slice(0, -1);
  }
  return SAME[w] ?? w;
}

const fold = (tok: string) => (HEB.test(tok) ? stem(tok) : tok);

/** Words of a text, lowercased. Separators are whitespace and punctuation; the
 *  characters inside a SAP identifier (_ / -) are kept. */
export const words = (s: string): string[] =>
  (s || "").toLowerCase().split(/[\s,.;:()[\]{}«»"'״׳?!·•—–|+]+/).filter(Boolean);

/** A text folded for matching: space-padded, so " " + token is a word start. */
export const foldText = (s: string): string => ` ${words(s).map(fold).join(" ")} `;

/** Every reading of each query word: the folded word itself, and for a Hebrew
 *  word that opens with a prefix letter, the word without it (or without two,
 *  "וה", "שב"). The first reading is the literal one and ranks higher. */
export function queryReadings(q: string): string[][] {
  return words(q).map((w) => {
    const out = [fold(w)];
    if (HEB.test(w)) {
      if (w.length >= 4 && PREFIX.includes(w[0])) out.push(fold(w.slice(1)));
      if (w.length >= 5 && PREFIX.includes(w[0]) && PREFIX.includes(w[1])) out.push(fold(w.slice(2)));
    }
    return [...new Set(out.filter(Boolean))];
  });
}
