// The run splitter behind <Rtl> (rtl-text.tsx), kept in a plain .ts module so
// the test suite can load it without JSX. See rtl-text.tsx for the rules.

const HEB = /[֐-׿]/;
const WORD = /[A-Za-z0-9_]/;

/** Split a sentence into Hebrew/neutral runs and Latin runs. */
export function rtlRuns(s: string): { latin: boolean; t: string }[] {
  const out: { latin: boolean; t: string }[] = [];
  let i = 0;
  while (i < s.length) {
    if (WORD.test(s[i])) {
      let j = i;
      while (j < s.length && !HEB.test(s[j])) j++;
      // Give back trailing punctuation and spaces, but keep a closing bracket
      // when the run itself opened it, and a suffix such as % * +.
      let k = j;
      while (k > i) {
        const c = s[k - 1];
        if (WORD.test(c)) break;
        // A suffix belongs to the name or number before it ("40%",
        // "BAPI_PRODORDCONF_*", "BRF+"): left outside the isolate it would land
        // on the far side of it.
        const prev = s[k - 2] ?? "";
        if ((c === "%" && /[0-9]/.test(prev)) || ((c === "*" || c === "+") && WORD.test(prev))) break;
        if (c === ")" || c === "]") {
          const sub = s.slice(i, k);
          const open = (sub.match(/[([]/g) || []).length;
          const close = (sub.match(/[)\]]/g) || []).length;
          if (open >= close) break;
        }
        k--;
      }
      out.push({ latin: true, t: s.slice(i, k) });
      i = k;
    } else {
      let j = i;
      while (j < s.length && !WORD.test(s[j])) j++;
      out.push({ latin: false, t: s.slice(i, j) });
      i = j;
    }
  }
  return out;
}
