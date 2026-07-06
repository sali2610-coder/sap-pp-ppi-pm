// Learning Hub — SAP consultant academy. Ordered tracks grouped into categories.
// `object` = REAL table (→ /object Explain Card). `href`+`linkLabel` link a step
// to existing features (graph / story / impact / troubleshooting / qa). `concept`
// = no single owning table. Narrative is standard SAP knowledge; nothing invented.

export type Importance = "core" | "supporting" | "advanced";
export interface LearnStep {
  id: string;
  n: number;
  object?: string;     // real table -> /object/<name>
  titleHe: string;
  whyHe: string;
  importance: Importance;
  concept?: boolean;
  href?: string;       // link to an existing feature instead of /object
  linkLabel?: string;
}
export interface LearnPath {
  id: string;
  he: string;
  sub: string;
  accent: string;
  level?: string;      // מבוא / מתקדם / מומחה
  durationHe?: string; // academy feel
  steps: LearnStep[];
  note?: string;
}

const S = (id: string, n: number, titleHe: string, whyHe: string, opt: Partial<LearnStep> = {}): LearnStep => ({ id, n, titleHe, whyHe, importance: opt.importance || "core", ...opt });
const PM_C = "#f97316", PP_C = "#6d28d9", QA_C = "#0891b2", ON_C = "#d62027";

// ===================== PLANT MAINTENANCE =====================
const PM_FUND: LearnStep[] = [
  S("pmf-1", 1, "מיקום פונקציונלי", "מבנה המפעל — העוגן של כל אחזקה.", { object: "IFLOT" }),
  S("pmf-2", 2, "נתוני מיקום/חיוב", "ILOA מרכזת שיוך מיקום, מרכז עלות וארגון.", { object: "ILOA", importance: "supporting" }),
  S("pmf-3", 3, "ציוד", "פריט הציוד המתוחזק, מותקן במיקום.", { object: "EQUI" }),
  S("pmf-4", 4, "טקסטים של ציוד", "EQKT — תיאורים רב-לשוניים לציוד.", { object: "EQKT", importance: "supporting" }),
  S("pmf-5", 5, "רשימת אובייקטים / סריאלי", "OBJK — ניהול מספרים סידוריים.", { object: "OBJK", importance: "advanced" }),
  S("pmf-6", 6, "מרכז עבודה", "CRHD — גורם הביצוע: קיבולת ותעריף.", { object: "CRHD", importance: "supporting" }),
];
const PM_PLAN: LearnStep[] = [
  S("pmp-1", 1, "הודעת אחזקה", "QMEL — תיעוד תקלה/בקשה, נקודת הכניסה.", { object: "QMEL" }),
  S("pmp-2", 2, "פריטי הודעה", "QMFE — פירוט נזק/גורם (קטלוגים).", { object: "QMFE", importance: "supporting" }),
  S("pmp-3", 3, "צו אחזקה — אב", "AUFK — נתוני הליבה של הצו.", { object: "AUFK" }),
  S("pmp-4", 4, "כותרת PM", "AFIH — שדות ייחודיים ל-PM (ציוד/מיקום).", { object: "AFIH" }),
  S("pmp-5", 5, "פעולות הצו", "AFVC — שלבי הביצוע ומרכז עבודה.", { object: "AFVC" }),
  S("pmp-6", 6, "סיור מודרך: תהליך אחזקה", "ראה את התכנון בהקשר התהליך המלא.", { concept: true, href: "/story/pm-maintenance/", linkLabel: "פתח סיור מודרך" }),
];
const PM_EXEC: LearnStep[] = [
  S("pme-1", 1, "שחרור צו", "AUFK — מעבר ל-REL; היתרים ובדיקות זמינות.", { object: "AUFK" }),
  S("pme-2", 2, "שריון חלפים", "RESB — חומרים שהצו דורש (PM-MM).", { object: "RESB", importance: "supporting" }),
  S("pme-3", 3, "אישור ביצוע", "AFRU — דיווח זמן, חומר וסטטוס.", { object: "AFRU" }),
  S("pme-4", 4, "סטטוס אובייקט", "JEST — סטטוסי מערכת/משתמש (TECO).", { object: "JEST" }),
  S("pme-5", 5, "פרופיל סטטוס", "JSTO — הגדרות הסטטוס לאובייקט.", { object: "JSTO", importance: "advanced" }),
  S("pme-6", 6, "ניתוח השפעה של הצו", "בדוק תלויות ורדיוס השפעה של AUFK.", { concept: true, href: "/impact/AUFK/", linkLabel: "פתח ניתוח השפעה" }),
];
const PM_PREV: LearnStep[] = [
  S("pmv-1", 1, "תוכנית אחזקה", "MPLA — תזמון אחזקה מונעת.", { object: "MPLA" }),
  S("pmv-2", 2, "פריטי תוכנית", "MPOS — מה מתוזמן ובאיזה מחזור.", { object: "MPOS", importance: "supporting" }),
  S("pmv-3", 3, "קריאות אחזקה", "MHIO — קריאות שנוצרו מהתוכנית.", { object: "MHIO", importance: "supporting" }),
  S("pmv-4", 4, "היסטוריית תזמון", "MHIS — היסטוריית הקריאות והדחיות.", { object: "MHIS", importance: "advanced" }),
  S("pmv-5", 5, "תקלה: תוכנית לא יוצרת פקודות", "תזמון/אופק קריאה — אבחון נפוץ.", { concept: true, href: "/troubleshooting/plan-no-orders/", linkLabel: "פתח תקלה" }),
];
const PM_TS: LearnStep[] = [
  S("pmt-1", 1, "צו לא משתחרר", "היתרים/זמינות/סטטוס/הרשאה.", { concept: true, href: "/troubleshooting/order-wont-release/", linkLabel: "פתח תקלה" }),
  S("pmt-2", 2, "TECO חסומה", "אישורים/תנועות פתוחים.", { concept: true, href: "/troubleshooting/teco-blocked/", linkLabel: "פתח תקלה" }),
  S("pmt-3", 3, "לא ניתן לסגור הודעה", "משימות פתוחות / פקודה לא TECO.", { concept: true, href: "/troubleshooting/notification-cant-close/", linkLabel: "פתח תקלה" }),
  S("pmt-4", 4, "קריאת מדידה נדחית", "גבולות / סוג מונה.", { concept: true, href: "/troubleshooting/measurement-rejected/", linkLabel: "פתח תקלה" }),
  S("pmt-5", 5, "מרכז פתרון תקלות", "כל תקלות ה-PM/PP במקום אחד.", { concept: true, href: "/troubleshooting/", linkLabel: "מרכז תקלות" }),
];
const PM_S4: LearnStep[] = [
  S("pms-1", 1, "צו אחזקה ב-S/4", "AUFK יציבה; Settlement ל-ACDOCA.", { object: "AUFK" }),
  S("pms-2", 2, "תנועות סחורה ב-S/4", "MSEG → MATDOC ב-S/4.", { object: "MSEG", importance: "supporting" }),
  S("pms-3", 3, "ניתוח השפעת S/4 — EQUI", "בדוק delta + רדיוס לציוד.", { concept: true, href: "/impact/EQUI/", linkLabel: "ניתוח השפעה" }),
  S("pms-4", 4, "מודל נתונים · פילטר S/4", "ראה אילו טבלאות מושפעות בגרף.", { concept: true, href: "/sap-infrastructure/", linkLabel: "פתח מודל נתונים" }),
];

// ===================== PROCESS MANUFACTURING (PP-PI) =====================
const PPF: LearnStep[] = [
  S("ppf-1", 1, "אב חומר", "MARA — הבסיס לכל ייצור.", { object: "MARA" }),
  S("ppf-2", 2, "נתוני מפעל לחומר", "MARC — פרמטרי MRP/ייצור.", { object: "MARC" }),
  S("ppf-3", 3, "עץ מוצר — כותרת", "STKO — מתוך מה מורכב המוצר.", { object: "STKO" }),
  S("ppf-4", 4, "עץ מוצר — פריטים", "STPO — רכיבים וכמויות.", { object: "STPO", importance: "supporting" }),
  S("ppf-5", 5, "מרכז עבודה / משאב", "CRHD — היכן/במה מייצרים.", { object: "CRHD", importance: "supporting" }),
  S("ppf-6", 6, "מתכון — כותרת/פעולות", "PLKO/PLPO — כיצד מייצרים.", { object: "PLPO" }),
];
const PP_PLAN: LearnStep[] = [
  S("ppp-1", 1, "אב חומר ופרמטרי תכנון", "MARC — סוג MRP, אצוות, תשואה.", { object: "MARC" }),
  S("ppp-2", 2, "גרסת ייצור", "MKAL — מקשרת BOM+מתכון; חובה ב-S/4.", { object: "MKAL" }),
  S("ppp-3", 3, "שיוך מתכון לחומר", "MAPL — איזה מתכון לחומר.", { object: "MAPL", importance: "supporting" }),
  S("ppp-4", 4, "מתכון ייצור", "PLPO — תקן הייצור.", { object: "PLPO" }),
  S("ppp-5", 5, "תקלה: אין גרסת ייצור תקפה", "MRP Live נכשל ללא MKAL תקף.", { concept: true, href: "/troubleshooting/no-production-version/", linkLabel: "פתח תקלה" }),
];
const PP_EXEC: LearnStep[] = [
  S("ppe-1", 1, "פקודת תהליך — כותרת", "AFKO — תזמון וכמויות.", { object: "AFKO" }),
  S("ppe-2", 2, "פריט הפקודה", "AFPO — המוצר המיוצר ויעדו.", { object: "AFPO" }),
  S("ppe-3", 3, "פעולות / Phases", "AFVC — שלבי הביצוע.", { object: "AFVC" }),
  S("ppe-4", 4, "אישור ייצור", "AFRU — כמויות, Backflush, זמנים.", { object: "AFRU" }),
  S("ppe-5", 5, "סיור מודרך: פקודת תהליך", "ראה את הביצוע בהקשר מלא.", { concept: true, href: "/story/pppi-process-order/", linkLabel: "פתח סיור מודרך" }),
];
const PP_INV: LearnStep[] = [
  S("ppi-1", 1, "אצווה", "MCH1 — עקיבות, תוקף ואיכות.", { object: "MCH1" }),
  S("ppi-2", 2, "שמורות הפקודה", "RESB — רכיבים שנדרשים לפקודה.", { object: "RESB", importance: "supporting" }),
  S("ppi-3", 3, "תנועת סחורה — פריט", "MSEG — שורת תנועת מלאי (→ MATDOC ב-S/4).", { object: "MSEG" }),
  S("ppi-4", 4, "תנועת סחורה — כותרת", "MKPF — כותרת מסמך החומר.", { object: "MKPF", importance: "supporting" }),
  S("ppi-5", 5, "תקלה: Backflush תקוע", "חוסר מלאי/אצווה → COGI.", { concept: true, href: "/troubleshooting/cogi-stuck/", linkLabel: "פתח תקלה" }),
];
const PP_TS: LearnStep[] = [
  S("ppt-1", 1, "COGI תקוע", "Backflush נכשל — תנועות ב-AFFW.", { concept: true, href: "/troubleshooting/cogi-stuck/", linkLabel: "פתח תקלה" }),
  S("ppt-2", 2, "RU-505 חוסר מלאי", "אין מלאי לרכיב Backflush.", { concept: true, href: "/troubleshooting/ru505-backflush-stock/", linkLabel: "פתח תקלה" }),
  S("ppt-3", 3, "קביעת אצווה נכשלת", "אסטרטגיה/מיון/מאפיינים.", { concept: true, href: "/troubleshooting/batch-determination-fail/", linkLabel: "פתח תקלה" }),
  S("ppt-4", 4, "אישור — תקופה סגורה", "תקופת MM/FI סגורה.", { concept: true, href: "/troubleshooting/confirm-period-closed/", linkLabel: "פתח תקלה" }),
  S("ppt-5", 5, "מרכז פתרון תקלות", "כל תקלות הייצור.", { concept: true, href: "/troubleshooting/", linkLabel: "מרכז תקלות" }),
];
const PP_S4: LearnStep[] = [
  S("pps-1", 1, "תנועות סחורה ב-S/4", "MSEG/MKPF → MATDOC (טבלה אחת).", { object: "MSEG" }),
  S("pps-2", 2, "אב חומר ב-S/4", "אורך מק\"ט 40 תווים (MARA).", { object: "MARA" }),
  S("pps-3", 3, "גרסת ייצור חובה", "MKAL — נדרשת לתכנון/ייצור ב-S/4.", { object: "MKAL" }),
  S("pps-4", 4, "ניתוח השפעת S/4 — AFKO", "delta + רדיוס לפקודת תהליך.", { concept: true, href: "/impact/AFKO/", linkLabel: "ניתוח השפעה" }),
  S("pps-5", 5, "מודל נתונים · פילטר S/4", "טבלאות מושפעות בגרף.", { concept: true, href: "/sap-infrastructure/", linkLabel: "פתח מודל נתונים" }),
];

// ===================== QUALITY & TESTING =====================
const QA_FUND: LearnStep[] = [
  S("qaf-1", 1, "מהי בדיקה ב-SAP", "מטרת ה-QA: לוודא שהתהליך העסקי עובד מקצה לקצה.", { concept: true }),
  S("qaf-2", 2, "סוגי בדיקות", "Unit · Functional · Integration · UAT · Regression.", { concept: true }),
  S("qaf-3", 3, "תרחישי בדיקה לפי תהליך", "כל שלב תהליך → מקרי בדיקה.", { concept: true, href: "/qa-testing/", linkLabel: "מרכז QA" }),
  S("qaf-4", 4, "Positive vs Negative", "לבדוק גם הצלחה וגם כשל מבוקר.", { concept: true }),
];
const QA_SAP: LearnStep[] = [
  S("qas-1", 1, "בדיקת פקודת תהליך", "פתיחה → שחרור → אישור → סגירה.", { concept: true, href: "/qa-testing/pppi-process-order-lifecycle/", linkLabel: "תרחיש QA" }),
  S("qas-2", 2, "בדיקת אובייקט", "שדות, קשרים, T-Codes — מ-Object Card.", { object: "AFKO", importance: "supporting" }),
  S("qas-3", 3, "בדיקת אצווה ו-FEFO", "קביעת אצווה, תוקף, חסימה.", { object: "MCH1", importance: "supporting" }),
  S("qas-4", 4, "מרכז QA", "כל תרחישי הבדיקה.", { concept: true, href: "/qa-testing/", linkLabel: "מרכז QA" }),
];
const QA_UAT: LearnStep[] = [
  S("uat-1", 1, "מהו UAT", "אישור משתמש-קצה שהתהליך עונה לדרישה העסקית.", { concept: true }),
  S("uat-2", 2, "תכנון UAT", "תרחישים מבוססי-תהליך, נתוני בדיקה, קריטריוני קבלה.", { concept: true }),
  S("uat-3", 3, "הרצת UAT", "ביצוע מול המשתמשים, תיעוד תוצאות וחתימות.", { concept: true }),
  S("uat-4", 4, "תרחישי תהליך ל-UAT", "השתמש בסיורים המודרכים כבסיס.", { concept: true, href: "/story/", linkLabel: "סיורים מודרכים" }),
];
const QA_INT: LearnStep[] = [
  S("int-1", 1, "מהי בדיקת אינטגרציה", "בדיקת זרימה חוצת-מודולים (PP↔MM↔FI/CO).", { concept: true }),
  S("int-2", 2, "תלויות חוצות-מודול", "ראה קשרים בין מודולים בגרף.", { concept: true, href: "/sap-infrastructure/", linkLabel: "מודל נתונים" }),
  S("int-3", 3, "אינטגרציית מלאי-עלות", "אישור → MATDOC → ACDOCA.", { object: "MSEG", importance: "supporting" }),
  S("int-4", 4, "ממשקי IDoc", "בדיקת IDoc 51/64 בזרימה.", { concept: true, href: "/troubleshooting/idoc-51/", linkLabel: "תקלת IDoc" }),
];
const QA_DEF: LearnStep[] = [
  S("def-1", 1, "ניהול ליקויים", "מחזור חיי באג: דיווח → אבחון → תיקון → אימות.", { concept: true }),
  S("def-2", 2, "אבחון שורש", "תסמין → גורם שורש → פתרון.", { concept: true, href: "/troubleshooting/", linkLabel: "מרכז תקלות" }),
  S("def-3", 3, "שימוש במנטור לאבחון", "שאל את המנטור על תסמין/אובייקט.", { concept: true, href: "/learn/", linkLabel: "פתח מנטור (⌘J)" }),
  S("def-4", 4, "רגרסיה אחרי תיקון", "ודא שהתיקון לא שבר תהליך אחר.", { concept: true }),
];

// ===================== ONBOARDING =====================
const ONB: LearnStep[] = [
  S("onb-1", 1, "ברוך הבא ל-NEO", "הכר את הפלטפורמה: מודל נתונים, למידה, מנטור, תקלות.", { concept: true }),
  S("onb-2", 2, "מאיפה מתחילים — בחר תחום", "PM (אחזקה) או PP-PI (ייצור).", { concept: true, href: "/learn/", linkLabel: "מסלולי למידה" }),
  S("onb-3", 3, "הבן את מודל הנתונים", "טבלאות, קשרים והשפעת S/4 בגרף.", { concept: true, href: "/sap-infrastructure/", linkLabel: "מודל נתונים" }),
  S("onb-4", 4, "למד תהליך מקצה-לקצה", "סיור מודרך בתהליך אחזקה/ייצור.", { concept: true, href: "/story/", linkLabel: "סיורים מודרכים" }),
  S("onb-5", 5, "שאל את המנטור", "תשובות מבוססות-מאגר על כל אובייקט/תסמין.", { concept: true }),
  S("onb-6", 6, "ניתוח השפעה ומיגרציה", "הבן blast radius ו-ECC↔S/4.", { concept: true, href: "/impact/", linkLabel: "מרכז השפעה" }),
  S("onb-7", 7, "פתרון תקלות", "152 תקלות PM/PP-PI עם גורם שורש ופתרון.", { concept: true, href: "/troubleshooting/", linkLabel: "מרכז תקלות" }),
];

export const LEARN_PATHS: Record<string, LearnPath> = {
  // PM
  "pm-fundamentals": { id: "pm-fundamentals", he: "PM · יסודות", sub: "אובייקטים טכניים: מיקום, ציוד, מרכז עבודה", accent: PM_C, level: "מבוא", durationHe: "כ-3 שעות", steps: PM_FUND },
  "pm-planning": { id: "pm-planning", he: "PM · תכנון", sub: "הודעה → צו אחזקה → פעולות", accent: PM_C, level: "מבוא", durationHe: "כ-3 שעות", steps: PM_PLAN },
  "pm-execution": { id: "pm-execution", he: "PM · ביצוע", sub: "שחרור, חלפים, אישור, סגירה טכנית", accent: PM_C, level: "מתקדם", durationHe: "כ-4 שעות", steps: PM_EXEC },
  "pm-preventive": { id: "pm-preventive", he: "PM · אחזקה מונעת", sub: "תוכניות, קריאות והיסטוריית תזמון", accent: PM_C, level: "מתקדם", durationHe: "כ-3 שעות", steps: PM_PREV },
  "pm-troubleshooting": { id: "pm-troubleshooting", he: "PM · פתרון תקלות", sub: "תקלות אחזקה נפוצות + אבחון", accent: PM_C, level: "מתקדם", durationHe: "כ-2 שעות", steps: PM_TS },
  "pm-ecc-s4": { id: "pm-ecc-s4", he: "PM · ECC מול S/4", sub: "מה משתנה במיגרציה ל-S/4HANA", accent: PM_C, level: "מומחה", durationHe: "כ-2 שעות", steps: PM_S4 },
  // PP-PI
  "pp-pi": { id: "pp-pi", he: "PP-PI · יסודות", sub: "אב חומר, עץ מוצר, מתכון, משאב", accent: PP_C, level: "מבוא", durationHe: "כ-3 שעות", steps: PPF, note: "Environment focus: PP-PI (Process Manufacturing) — מותאם לתהליכי הארגון." },
  "pp": { id: "pp", he: "PP · יסודות ייצור", sub: "מושגי ייצור משותפים לפני PP/PP-PI", accent: PP_C, level: "מבוא", durationHe: "כ-2 שעות", steps: PPF, note: "PP בסביבת הארגון = PP-PI. מסלול יסוד משותף." },
  "pp-planning": { id: "pp-planning", he: "PP-PI · תכנון", sub: "MARC, גרסת ייצור, מתכון, MRP", accent: PP_C, level: "מתקדם", durationHe: "כ-3 שעות", steps: PP_PLAN },
  "pp-execution": { id: "pp-execution", he: "PP-PI · ביצוע", sub: "פקודת תהליך → אישור ייצור", accent: PP_C, level: "מתקדם", durationHe: "כ-4 שעות", steps: PP_EXEC },
  "pp-inventory": { id: "pp-inventory", he: "PP-PI · מלאי ותנועות", sub: "אצוות, שמורות, תנועות סחורה", accent: PP_C, level: "מתקדם", durationHe: "כ-3 שעות", steps: PP_INV },
  "pp-troubleshooting": { id: "pp-troubleshooting", he: "PP-PI · פתרון תקלות", sub: "COGI, Backflush, אצווה, תקופה", accent: PP_C, level: "מתקדם", durationHe: "כ-2 שעות", steps: PP_TS },
  "pp-ecc-s4": { id: "pp-ecc-s4", he: "PP-PI · ECC מול S/4", sub: "MATDOC, מק\"ט 40, גרסת ייצור חובה", accent: PP_C, level: "מומחה", durationHe: "כ-2 שעות", steps: PP_S4 },
  // QA & Testing
  "qa-fundamentals": { id: "qa-fundamentals", he: "QA · יסודות", sub: "מהי בדיקה, סוגי בדיקות, תרחישים", accent: QA_C, level: "מבוא", durationHe: "כ-2 שעות", steps: QA_FUND },
  "qa-sap-testing": { id: "qa-sap-testing", he: "בדיקות SAP", sub: "תרחישי בדיקה מבוססי-תהליך ואובייקט", accent: QA_C, level: "מתקדם", durationHe: "כ-3 שעות", steps: QA_SAP },
  "qa-uat": { id: "qa-uat", he: "UAT", sub: "בדיקת קבלת משתמש מקצה לקצה", accent: QA_C, level: "מתקדם", durationHe: "כ-2 שעות", steps: QA_UAT },
  "qa-integration": { id: "qa-integration", he: "בדיקות אינטגרציה", sub: "זרימה חוצת-מודולים וממשקים", accent: QA_C, level: "מתקדם", durationHe: "כ-2 שעות", steps: QA_INT },
  "qa-defect": { id: "qa-defect", he: "ניהול ליקויים", sub: "מחזור חיי באג ואבחון שורש", accent: QA_C, level: "מתקדם", durationHe: "כ-2 שעות", steps: QA_DEF },
  // Onboarding
  "onboarding-org": { id: "onboarding-org", he: "הארגון · קליטת יועץ חדש", sub: "סיור התמצאות בפלטפורמה ובמתודולוגיה", accent: ON_C, level: "מבוא", durationHe: "שבוע ראשון", steps: ONB },
};

// Top-level academy categories for the /learn chooser.
export interface LearnCategory { id: string; he: string; sub: string; accent: string; icon: "pm" | "factory" | "qa" | "onboard"; tracks: string[] }
export const LEARN_CATEGORIES: LearnCategory[] = [
  { id: "onboarding", he: "קליטת יועץ חדש", sub: "התחל כאן — סיור התמצאות מלא", accent: ON_C, icon: "onboard", tracks: ["onboarding-org"] },
  { id: "pm", he: "אחזקת מפעל · PM", sub: "6 מסלולים — יסודות עד S/4", accent: PM_C, icon: "pm", tracks: ["pm-fundamentals", "pm-planning", "pm-execution", "pm-preventive", "pm-troubleshooting", "pm-ecc-s4"] },
  { id: "pppi", he: "ייצור · PP / PP-PI", sub: "7 מסלולים — יסודות עד S/4", accent: PP_C, icon: "factory", tracks: ["pp", "pp-pi", "pp-planning", "pp-execution", "pp-inventory", "pp-troubleshooting", "pp-ecc-s4"] },
  { id: "qa", he: "איכות ובדיקות · QA", sub: "5 מסלולים — בדיקות, UAT, ליקויים", accent: QA_C, icon: "qa", tracks: ["qa-fundamentals", "qa-sap-testing", "qa-uat", "qa-integration", "qa-defect"] },
];

// Back-compat: keep the old LEARN_AREAS shape (used until learn-home migrates).
export const LEARN_AREAS = LEARN_CATEGORIES.map((c) => ({ id: c.id, icon: (c.icon === "qa" || c.icon === "onboard" ? "factory" : c.icon) as "pm" | "factory", he: c.he, sub: c.sub, accent: c.accent, paths: c.tracks }));
