// Learning paths (Phase C). Ordered SAP process spines per module. Every `object`
// is a REAL table in the dataset; `concept` steps (Settlement/Reporting) have no
// single owning table and are labelled as such — no fabricated tables.
// Narrative is standard SAP knowledge.

export type Importance = "core" | "supporting" | "advanced";
export interface LearnStep {
  id: string;
  n: number;
  object?: string;     // real table -> links to /object/<name> (Explain Card)
  titleHe: string;
  whyHe: string;
  importance: Importance;
  concept?: boolean;   // no single owning table
}
export interface LearnPath {
  id: "pm" | "pp" | "pp-pi";
  he: string;
  sub: string;
  accent: string;
  steps: LearnStep[];
  note?: string;       // honesty / environment note
}

const PM: LearnStep[] = [
  { id: "pm-1", n: 1, object: "IFLOT", titleHe: "מיקום פונקציונלי", whyHe: "מבנה המפעל — איפה ציוד מותקן ומתוחזק. העוגן של כל תהליך אחזקה.", importance: "core" },
  { id: "pm-2", n: 2, object: "EQUI", titleHe: "ציוד", whyHe: "פריט הציוד המתוחזק — מותקן במיקום הפונקציונלי.", importance: "core" },
  { id: "pm-3", n: 3, object: "QMEL", titleHe: "הודעת אחזקה", whyHe: "תיעוד תקלה/בקשה — נקודת הכניסה לתהליך, ממנה נגזר צו.", importance: "core" },
  { id: "pm-4", n: 4, object: "AUFK", titleHe: "צו אחזקה", whyHe: "אב הצו (AUFK) + כותרת PM (AFIH) — הביצוע בפועל.", importance: "core" },
  { id: "pm-5", n: 5, object: "AFVC", titleHe: "פעולות הצו", whyHe: "שלבי הביצוע: מה לעשות, מרכז עבודה, זמן תקן.", importance: "core" },
  { id: "pm-6", n: 6, object: "AFRU", titleHe: "אישור ביצוע", whyHe: "דיווח עבודה שבוצעה — זמנים, חומרים, סטטוס.", importance: "core" },
  { id: "pm-7", n: 7, titleHe: "סגירת עלויות (Settlement)", whyHe: "העברת עלויות הצו ליעד החיוב. ב-S/4 דרך ACDOCA.", importance: "supporting", concept: true },
  { id: "pm-8", n: 8, titleHe: "ניתוח ודיווח (Reporting)", whyHe: "מדדי אחזקה (MTBF/MTTR), היסטוריה וניתוח תקלות.", importance: "supporting", concept: true },
];

// PP Fundamentals — common manufacturing concepts shared before PP / PP-PI split.
const PP: LearnStep[] = [
  { id: "pp-1", n: 1, object: "MARA", titleHe: "אב חומר", whyHe: "הבסיס לכל ייצור — מה מייצרים/צורכים.", importance: "core" },
  { id: "pp-2", n: 2, object: "MARC", titleHe: "נתוני מפעל לחומר", whyHe: "פרמטרי תכנון/ייצור של החומר ברמת המפעל (MRP, אצווה).", importance: "core" },
  { id: "pp-3", n: 3, object: "STKO", titleHe: "עץ מוצר — כותרת (BOM)", whyHe: "מתוך מה מורכב המוצר. STKO כותרת, STPO פריטים.", importance: "core" },
  { id: "pp-4", n: 4, object: "STPO", titleHe: "עץ מוצר — פריטים", whyHe: "רכיבי המוצר וכמויותיהם.", importance: "supporting" },
  { id: "pp-5", n: 5, object: "CRHD", titleHe: "מרכז עבודה", whyHe: "היכן/במה מבוצע הייצור — קיבולת ותעריף.", importance: "core" },
  { id: "pp-6", n: 6, object: "PLKO", titleHe: "רשימת פעולות / מתכון — כותרת", whyHe: "כיצד מייצרים. כאן הנתיב מתפצל: PP (Discrete) מול PP-PI (Process).", importance: "core" },
];

// PP-PI — process manufacturing (CBC implementation path).
const PPPI: LearnStep[] = [
  { id: "ppi-1", n: 1, object: "PLPO", titleHe: "מתכון ייצור (Master Recipe)", whyHe: "פעולות וה-Phases של ייצור התהליך.", importance: "core" },
  { id: "ppi-2", n: 2, object: "AFKO", titleHe: "פקודת תהליך — כותרת", whyHe: "כותרת פקודת הייצור (Process Order): תזמון וכמויות.", importance: "core" },
  { id: "ppi-3", n: 3, object: "AFPO", titleHe: "פקודה — פריט", whyHe: "המוצר המיוצר בפקודה וכמותו.", importance: "core" },
  { id: "ppi-4", n: 4, object: "AFVC", titleHe: "פקודה — פעולות/Phases", whyHe: "שלבי הביצוע של התהליך.", importance: "core" },
  { id: "ppi-5", n: 5, object: "MCH1", titleHe: "אצווה (Batch)", whyHe: "ניהול אצוות — קריטי בייצור תהליכי (מזון/משקאות).", importance: "core" },
  { id: "ppi-6", n: 6, object: "AFRU", titleHe: "אישור ביצוע", whyHe: "דיווח ייצור — כמויות, Backflush, זמנים.", importance: "core" },
  { id: "ppi-7", n: 7, titleHe: "תיקון שגיאות (COGI)", whyHe: "טיפול בתנועות סחורה תקועות מ-Backflush.", importance: "supporting", concept: true },
  { id: "ppi-8", n: 8, titleHe: "ניתוח ודיווח", whyHe: "תפוקה, סטיות, עלויות ואיכות.", importance: "supporting", concept: true },
];

export const LEARN_PATHS: Record<string, LearnPath> = {
  pm: { id: "pm", he: "אחזקת מפעל · PM", sub: "Plant Maintenance — תחזוקה, צווים, ציוד", accent: "#f97316", steps: PM },
  pp: { id: "pp", he: "PP Fundamentals", sub: "יסודות הייצור — חומר, עץ מוצר, מרכז עבודה", accent: "#6d28d9", steps: PP, note: "מסלול יסוד משותף. בסביבת CBC ההמשך הוא PP-PI." },
  "pp-pi": { id: "pp-pi", he: "PP-PI · Process Manufacturing", sub: "ייצור תהליכי — מתכון, פקודת תהליך, אצווה", accent: "#6d28d9", steps: PPPI, note: "Environment focus: PP-PI (Process Manufacturing) — מותאם לתהליכי CBC." },
};

// Top-level learning areas for the chooser.
export interface LearnArea { id: string; icon: "pm" | "factory"; he: string; sub: string; accent: string; paths: ("pm" | "pp" | "pp-pi")[] }
export const LEARN_AREAS: LearnArea[] = [
  { id: "pm", icon: "pm", he: "אחזקת מפעל", sub: "Plant Maintenance (PM)", accent: "#f97316", paths: ["pm"] },
  { id: "manufacturing", icon: "factory", he: "ייצור · Manufacturing", sub: "PP Fundamentals → PP-PI Process Manufacturing", accent: "#6d28d9", paths: ["pp", "pp-pi"] },
];
