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

// Beginner-language intents — natural questions → a short explanation + a routed
// next action. Surfaced as a card above the normal search results.
export interface BeginnerIntent { keys: string[]; he: string; action: string; href: string }
export const BEGINNER_INTENTS: BeginnerIntent[] = [
  { keys: ["איך מתחילים pm", "התחל pm", "מתחילים pm", "start pm", "מאיפה מתחילים אחזקה"], he: "מסלול PM: הבנת התהליך → אובייקטים טכניים (EQUI) → הודעות (QMEL) → פקודות (AUFK) → אישורים (AFRU).", action: "פתח מרכז PM", href: "/pm/" },
  { keys: ["איך מתחילים pp", "התחל pp", "מתחילים ייצור", "start pp", "מאיפה מתחילים ייצור"], he: "מסלול PP-PI: אב חומר (MARA) → מתכון (PLPO) → פקודת תהליך (AFKO) → אצווה (MCH1) → אישור (AFRU).", action: "פתח מרכז PP-PI", href: "/pp-pi/" },
  { keys: ["מה משתנה ב-s/4", "מה משתנה בs4", "מה משתנה ב s4", "s/4 impact", "השפעת s4", "מה השתנה s4", "מיגרציה s4"], he: "השפעת S/4HANA מסומנת בצהוב על הטבלאות במודל הנתונים — MATDOC, ACDOCA, Business Partner ועוד.", action: "מודל נתונים · פילטר S/4", href: "/sap-infrastructure/" },
  { keys: ["טבלאות של פקודת אחזקה", "טבלאות פקודת אחזקה", "טבלאות aufk", "פקודת אחזקה טבלאות"], he: "פקודת אחזקה: AUFK (כותרת) ↔ AFIH ↔ AFKO/AFPO/AFVC ↔ AFRU (אישור).", action: "פתח AUFK", href: "/object/AUFK/" },
  { keys: ["טבלאות של פקודת ייצור", "טבלאות פקודת תהליך", "טבלאות afko", "פקודת ייצור טבלאות"], he: "פקודת תהליך: AFKO (כותרת) ↔ AFPO (פריט) ↔ AFVC (פעולה) ↔ AFRU (אישור).", action: "פתח AFKO", href: "/object/AFKO/" },
  { keys: ["בדיקות qa", "תרחישי בדיקה", "qa לאישור", "בדיקות לאישור פקודה", "בדיקות לתהליך אישור"], he: "תרחישי בדיקה לפי תהליך — אישור, Backflush, COGI תקוע, סטטוס פקודה.", action: "פתח תרחישי QA", href: "/qa-testing/" },
  { keys: ["מה זה neo", "איך משתמשים", "עזרה", "מדריך", "help", "onboarding"], he: "NEO = קוקפיט הידע ל-PM/PP-PI ומיגרציית S/4HANA. התחל מהמדריך או בחר מסלול.", action: "פתח מדריך", href: "" },
];
export function beginnerIntent(raw: string): BeginnerIntent | null {
  const s = raw.trim().toLowerCase();
  if (s.length < 4) return null;
  return BEGINNER_INTENTS.find((i) => i.keys.some((k) => s.includes(k) || k.includes(s))) || null;
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
