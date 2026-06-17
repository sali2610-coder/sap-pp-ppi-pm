// D6 · Search intelligence — synonym/alias expansion + light fuzzy matching.
// Maps natural-language / cross-module queries onto canonical SAP tokens that
// the existing dataset search already matches. No external lib, offline-safe.

// alias key (lowercased, matched as substring) -> canonical search token.
// The canonical token is what we actually feed the dataset search; the typed
// text still drives the input + highlight (we highlight both terms).
const SYNONYMS: { keys: string[]; token: string; note: string }[] = [
  { keys: ["material master", "אב חומר", "מאסטר חומר", "material"], token: "MARA", note: "אב חומר → MARA" },
  { keys: ["batch management", "batch", "אצווה", "ניהול אצוות", "charg"], token: "MCH", note: "ניהול אצוות → MCH1 / MCHA" },
  { keys: ["cor6n", "cor6", "process confirmation", "דיווח תהליכי"], token: "COR6", note: "דיווח פק\"ע תהליכי → COR6N" },
  { keys: ["process order", "פקודת ייצור", 'פק"ע', "production order"], token: "COR", note: 'פק"ע ייצור → COR' },
  { keys: ["work order", "פקודת עבודה", "maintenance order"], token: "IW31", note: 'פק"ע אחזקה → IW31' },
  { keys: ["mrp", "תכנון דרישות", "material requirements"], token: "MRP", note: "תכנון דרישות חומר (MRP)" },
  { keys: ["bom", "עץ מוצר", "bill of material"], token: "STKO", note: "עץ מוצר (BOM)" },
  { keys: ["recipe", "מתכון", "master recipe"], token: "PLPO", note: "מתכון ייצור" },
  { keys: ["equipment", "ציוד"], token: "EQUI", note: "ציוד (Equipment)" },
  { keys: ["functional location", "מיקום פונקציונלי"], token: "IFLOT", note: "מיקום פונקציונלי" },
  { keys: ["notification", "הודעת אחזקה"], token: "IW21", note: "הודעת אחזקה" },
  { keys: ["idoc", "אידוק", "idoc 51", "idoc status"], token: "MATMAS", note: "ממשקי IDoc (MATMAS / LOIPRO)" },
];

// Strip trailing numbers users tack onto object families (e.g. "idoc 51",
// "process order 2") so the family token still matches.
function stripTrailingNum(s: string): string {
  return s.replace(/\s+\d+\s*$/, "").trim();
}

export interface QueryPlan {
  raw: string;          // exactly what the user typed
  search: string;       // term fed to the dataset search
  highlight: string;    // whitespace-OR'd terms to highlight (raw + alias)
  note?: string;        // "showing results for…" hint
}

export function planQuery(raw: string): QueryPlan {
  const trimmed = raw.trim();
  const lc = stripTrailingNum(trimmed).toLowerCase();
  if (!trimmed) return { raw, search: "", highlight: "" };

  for (const syn of SYNONYMS) {
    if (syn.keys.some((k) => lc === k || lc.includes(k))) {
      // only alias when the typed text isn't already the canonical token
      if (!trimmed.toLowerCase().includes(syn.token.toLowerCase())) {
        return { raw, search: syn.token, highlight: `${trimmed} ${syn.token}`, note: syn.note };
      }
    }
  }
  // "idoc 51" with no synonym branch taken → still drop the trailing number
  const stripped = stripTrailingNum(trimmed);
  if (stripped !== trimmed && stripped.length >= 2) {
    return { raw, search: stripped, highlight: trimmed };
  }
  return { raw, search: trimmed, highlight: trimmed };
}

// Light fuzzy: Levenshtein distance ≤ max (used only as a fallback when a
// query yields no exact substring hits). Kept small + bounded for perf.
export function within(a: string, b: string, max = 1): boolean {
  a = a.toLowerCase(); b = b.toLowerCase();
  if (Math.abs(a.length - b.length) > max) return false;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let j = 1; j <= b.length; j++) {
    let prev = dp[0]; dp[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const tmp = dp[i];
      dp[i] = Math.min(dp[i] + 1, dp[i - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[a.length] <= max;
}
