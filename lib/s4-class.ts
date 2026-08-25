// ===== The S/4HANA verdict, decided in ONE place =====
//
// WHY THIS FILE EXISTS
// --------------------
// The verdict used to be derived from `s4AltTable`: "has an alternative table
// => replaced, otherwise kept". That reads the wrong column. The PM blueprint
// fills s4AltTable on all 58 of its tables; the PP-PI blueprint fills it on
// ZERO of its 68. So the same rule produced, on the live PP-PI workspace:
//
//     68 kept · 0 replaced · 0 removed
//
// i.e. the page told a migration team that nothing in PP-PI moves in S/4HANA,
// while the blueprint's own S/4 column says BUT000 is "הוחלף - Business
// Partner חובה (CVI); ראה SAP Note 2265093" — the mandatory Business Partner
// conversion, one of the hardest gates in an S/4 conversion. The verdict was
// silently a function of WHICH SHEET you were looking at.
//
// The fix is to read the column the blueprint actually writes its verdict in,
// `s4Note`, in both modules, and to make every surface share this one function
// so the two can never drift again.
//
// WHY THE MATCH IS ANCHORED AND NOT A SEARCH
// ------------------------------------------
// A loose /מחליף|הוחלף/ over the prose is WRONG and would publish a false SAP
// claim. MARC's note reads:
//
//     "MRP Live מחליף MRP קלאסי; שדות תכנון נשמרים אך הביצוע ב-MATDOC/ACDOCA."
//
// The thing being replaced there is classic MRP by MRP Live. MARC itself
// persists in S/4HANA. A substring match would have marked MARC as a replaced
// table — inventing a migration finding that no source states.
//
// So the token is only honoured at the START of the note, which is the
// convention the blueprint genuinely uses ("הוחלף - …", "מותאם (תואם)",
// "ללא שינוי (תואם)"). 115 of 126 tables carry such a leading verdict. The
// remaining 11 get `null` — surfaced as "לא הוכרע במקור", never defaulted into
// a bucket. A blank stays blank; that rule is older than this file.
//
// A NOTE ON \b
// ------------
// The delimiter below is an explicit character class, NOT \b. JavaScript
// defines \b against \w === [A-Za-z0-9_], so between "שינוי" and a space BOTH
// sides are non-word characters and there is no boundary: /^(ללא שינוי)\b/
// is false on the string "ללא שינוי (תואם)". \b is inert after Hebrew.

import type { SAPTable } from "./types";

/** Severity order, best -> worst. The UI renders them in exactly this order. */
export type S4Class = 0 | 1 | 2 | 3;

export const S4_ORDER: readonly S4Class[] = [0, 1, 2, 3] as const;

/** Labels are the blueprint's own vocabulary, not a paraphrase of it. */
export const S4_HE: Record<S4Class, string> = {
  0: "ללא שינוי",
  1: "מותאם",
  2: "הוחלף",
  3: "הוסר",
};

/** Shown for a table whose blueprint row carries no leading verdict. */
export const S4_UNDECIDED_HE = "לא הוכרע במקור";

/** STATUS tokens. These may only ever appear as a small filled dot followed by
 *  the word itself — the product's rule for status colour, kept intact here. */
// green = stable · amber = needs analysis · blue = moves · red = gone.
// Grey is reserved for "the source did not decide", which is a real state here
// and must not look like any of the four verdicts.
export const S4_DOT: Record<S4Class, string> = {
  0: "var(--status-done)",
  1: "var(--status-in-analysis)",
  2: "var(--status-in-conversion)",
  3: "var(--status-removed)",
};
export const S4_UNDECIDED_DOT = "var(--status-not-started)";

/** Delimiter after the verdict token. Space, punctuation, or end of string.
 *  Written out because \b does not work after Hebrew (see header). */
const D = "(?=[\\s,;.:\\-–(\\[]|$)";
const at = (...words: string[]) => new RegExp(`^\\s*(?:${words.join("|")})${D}`, "i");

/** Ordered worst-first so a note that opens with the strongest verdict wins. */
const LEAD: readonly (readonly [S4Class, RegExp])[] = [
  [3, at("הוסר", "הוסרה", "בוטל", "בוטלה", "removed", "deprecated")],
  [2, at("הוחלף", "הוחלפה", "מוחלף", "מוחלפת", "אוחד", "אוחדה", "מוזג", "מוזגה", "replaced")],
  [1, at("מותאם", "מותאמת", "מודל מותאם", "מורחב", "מורחבת", "שונה", "עודכן", "עודכנה")],
  [0, at("ללא שינוי", "נשמר", "נשמרת", "תואם", "תואמת", "זהה", "unchanged")],
] as const;

/**
 * The blueprint's own S/4HANA verdict for one table.
 * `null` means the source states no verdict — the caller must show that as a
 * gap. It must never be folded into "ללא שינוי".
 */
export function s4ClassOf(t: Pick<SAPTable, "s4Note">): S4Class | null {
  const note = (t.s4Note || "").trim();
  if (!note) return null;
  for (const [k, re] of LEAD) if (re.test(note)) return k;
  return null;
}

export const s4He = (k: S4Class | null) => (k === null ? S4_UNDECIDED_HE : S4_HE[k]);
export const s4Dot = (k: S4Class | null) => (k === null ? S4_UNDECIDED_DOT : S4_DOT[k]);

/** Counts over a set of tables, including the honest "undecided" bucket. */
export interface S4Split {
  kept: number;
  changed: number;
  replaced: number;
  removed: number;
  undecided: number;
}

export function s4Split(tables: readonly Pick<SAPTable, "s4Note">[]): S4Split {
  const out: S4Split = { kept: 0, changed: 0, replaced: 0, removed: 0, undecided: 0 };
  for (const t of tables) {
    const k = s4ClassOf(t);
    if (k === null) out.undecided++;
    else if (k === 0) out.kept++;
    else if (k === 1) out.changed++;
    else if (k === 2) out.replaced++;
    else out.removed++;
  }
  return out;
}

export const s4CountOf = (s: S4Split, k: S4Class | null): number =>
  k === null ? s.undecided : k === 0 ? s.kept : k === 1 ? s.changed : k === 2 ? s.replaced : s.removed;
