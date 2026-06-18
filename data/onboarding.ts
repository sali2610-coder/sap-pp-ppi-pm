// Onboarding + role-based guidance content. Navigation/usage guidance + standard
// SAP domain meaning only — no fabricated SAP technical facts. All hrefs point to
// real pages/objects that exist in the app.

export type RoleId = "new" | "experienced" | "senior" | "qa" | "migration";
export const ROLES: { id: RoleId; he: string; sub: string }[] = [
  { id: "new", he: "מיישם חדש", sub: "הסברים, מסלול מומלץ, שפה פשוטה" },
  { id: "experienced", he: "מיישם מנוסה", sub: "ניווט מהיר, פחות הסברים" },
  { id: "senior", he: "יועץ בכיר", sub: "עומק טכני, lineage, S/4, סיכון" },
  { id: "qa", he: "QA / בודק", sub: "תרחישי בדיקה, נקודות תורפה" },
  { id: "migration", he: "מיגרציה / S/4HANA", sub: "השפעת S/4, פערים, אימות" },
];

export const GLOSSARY: { term: string; he: string }[] = [
  { term: "PM", he: "אחזקת מפעל (Plant Maintenance) — ציוד, מיקומים טכניים, הודעות תקלה, פקודות עבודה ואחזקה מונעת." },
  { term: "PP-PI", he: "ייצור תהליכי (Process Industries) — אב חומר, מתכוני ייצור, פקודות תהליך, אצוות וממשקי MES." },
  { term: "מודל נתונים", he: "מפת הטבלאות והקשרים (ERD) — איך כל טבלה מתחברת לאחרות, מפתחות ראשיים/זרים וזרימת הנתונים." },
  { term: "אובייקט", he: "טבלת SAP בודדת עם כל ההקשר שלה — שדות, קשרים, T-Codes, BAPIs, תקלות והשפעת S/4." },
  { term: "חיפוש (⌘K)", he: "נקודת הכניסה המהירה — חפש טבלה, T-Code, BAPI, תהליך או שאלה בשפה חופשית." },
];

export interface PathStep { n: number; title: string; desc: string; href: string }
export const PM_PATH: PathStep[] = [
  { n: 1, title: "הבן את תהליך ה-PM", desc: "מבט-על על זרימת האחזקה מקצה לקצה.", href: "/pm/" },
  { n: 2, title: "אובייקטים טכניים", desc: "ציוד (EQUI) ומיקומים פונקציונליים.", href: "/object/EQUI/" },
  { n: 3, title: "הודעות אחזקה", desc: "הודעת תקלה (QMEL) — נקודת הפתיחה של תקלה.", href: "/object/QMEL/" },
  { n: 4, title: "פקודות אחזקה", desc: "נתוני אב של פקודת עבודה (AUFK).", href: "/object/AUFK/" },
  { n: 5, title: "דיווחי ביצוע", desc: "אישורי פעולה (AFRU).", href: "/object/AFRU/" },
  { n: 6, title: "התחשבנות וסטטוס", desc: "סטטוס אובייקט (JEST) וסגירת פקודה.", href: "/object/JEST/" },
  { n: 7, title: "טבלאות וקשרים", desc: "מודל הנתונים המלא של PM (ERD).", href: "/sap-infrastructure/" },
  { n: 8, title: "השפעת S/4HANA", desc: "מה יציב ומה דורש תשומת לב במעבר.", href: "/sap-infrastructure/" },
  { n: 9, title: "תרחישי בדיקה (QA)", desc: "בדיקות מומלצות לתהליך.", href: "/qa-testing/" },
];
export const PPPI_PATH: PathStep[] = [
  { n: 1, title: "הבן ייצור תהליכי", desc: "מבט-על על Plan-to-Produce התהליכי.", href: "/pp-pi/" },
  { n: 2, title: "אב נתונים", desc: "אב חומר (MARA) — ליבת כל חומר.", href: "/object/MARA/" },
  { n: 3, title: "מתכון / משאב", desc: "רשימת פעולות (PLPO) ומתכון הייצור.", href: "/object/PLPO/" },
  { n: 4, title: "פקודת תהליך", desc: "כותרת פקודה (AFKO) ופריט (AFPO).", href: "/object/AFKO/" },
  { n: 5, title: "אצווה ותנועות מלאי", desc: "אב אצווה (MCH1) וקבלת תוצר.", href: "/object/MCH1/" },
  { n: 6, title: "אישור ייצור", desc: "דיווחי ביצוע (AFRU).", href: "/object/AFRU/" },
  { n: 7, title: "טבלאות וקשרים", desc: "מודל הנתונים המלא של PP-PI (ERD).", href: "/sap-infrastructure/" },
  { n: 8, title: "השפעת S/4HANA", desc: "MATDOC/ACDOCA ופערי מעבר.", href: "/sap-infrastructure/" },
  { n: 9, title: "תרחישי בדיקה (QA)", desc: "בדיקות מומלצות לתהליך.", href: "/qa-testing/" },
];

// 3 example tasks per role (real hrefs) — shown in the onboarding drawer per selected role
export const ROLE_TASKS: Record<RoleId, { he: string; href: string }[]> = {
  new: [
    { he: "למד זרימת פקודת אחזקה", href: "/object/AUFK/" },
    { he: "הבן AUFK / AFKO / AFPO / JEST", href: "/sap-infrastructure/" },
    { he: "בנה צ'קליסט QA ראשון", href: "/qa-testing/" },
  ],
  experienced: [
    { he: "נווט ישר למודל הנתונים", href: "/sap-infrastructure/" },
    { he: "פתח אובייקט ליבה (AFKO)", href: "/object/AFKO/" },
    { he: "מפות תהליך מקצה-לקצה", href: "/process-explorer/" },
  ],
  senior: [
    { he: "בדוק תלויות אובייקט (lineage)", href: "/lineage/" },
    { he: "סקור סיכוני הרחבות (BAdI/Exit)", href: "/sap-infrastructure/" },
    { he: "סקור השפעת S/4HANA", href: "/sap-infrastructure/" },
  ],
  qa: [
    { he: "תרחישי בדיקה לאישור פקודה", href: "/qa-testing/" },
    { he: "תקלות נפוצות ופתרון", href: "/troubleshooting/" },
    { he: "בדיקות מול פערי S/4", href: "/sap-infrastructure/" },
  ],
  migration: [
    { he: "מה משתנה ב-S/4 (MATDOC/ACDOCA)", href: "/sap-infrastructure/" },
    { he: "שושלת נתונים מקור→צרכן", href: "/lineage/" },
    { he: "אובייקטים שדורשים אימות", href: "/sap-infrastructure/" },
  ],
};

export interface WorkflowCard { he: string; sub: string; href: string }
export const WORKFLOWS: WorkflowCard[] = [
  { he: "להבין תהליך", sub: "מפות תהליך מקצה-לקצה", href: "/process-explorer/" },
  { he: "לדבג תקלה", sub: "151 תקלות + פתרון", href: "/troubleshooting/" },
  { he: "לתכנן בדיקות QA", sub: "תרחישי בדיקה", href: "/qa-testing/" },
  { he: "לבדוק השפעת S/4HANA", sub: "מודל נתונים + פילטר S/4", href: "/sap-infrastructure/" },
  { he: "להבין טבלאות", sub: "מודל נתונים · ERD", href: "/sap-infrastructure/" },
  { he: "להסביר למשתמשים עסקיים", sub: "מרכז ידע", href: "/knowledge/" },
  { he: "להכין סדנה", sub: "ספרייה ואקדמיה", href: "/library/" },
];

// "demo route" — ordered clickable walk-through
export const DEMO_PM: PathStep[] = [
  { n: 1, title: "ציוד", desc: "EQUI", href: "/object/EQUI/" },
  { n: 2, title: "הודעה", desc: "QMEL", href: "/object/QMEL/" },
  { n: 3, title: "פקודה", desc: "AUFK", href: "/object/AUFK/" },
  { n: 4, title: "אישור", desc: "AFRU", href: "/object/AFRU/" },
  { n: 5, title: "מודל נתונים", desc: "ERD", href: "/sap-infrastructure/" },
  { n: 6, title: "בדיקות QA", desc: "QA", href: "/qa-testing/" },
];
export const DEMO_PPPI: PathStep[] = [
  { n: 1, title: "חומר", desc: "MARA", href: "/object/MARA/" },
  { n: 2, title: "מתכון", desc: "PLPO", href: "/object/PLPO/" },
  { n: 3, title: "פקודת תהליך", desc: "AFKO", href: "/object/AFKO/" },
  { n: 4, title: "אצווה", desc: "MCH1", href: "/object/MCH1/" },
  { n: 5, title: "מודל נתונים", desc: "ERD", href: "/sap-infrastructure/" },
  { n: 6, title: "בדיקות QA", desc: "QA", href: "/qa-testing/" },
];

// per-page help: matched by route prefix (longest match wins)
export interface PageHelp { purpose: string; when: string; first: string; junior: string; senior: string; mistakes: string; next: string[] }
export const PAGE_HELP: { match: string; help: PageHelp }[] = [
  { match: "/sap-infrastructure", help: {
    purpose: "מודל הנתונים (ERD) — כל טבלאות המודול והקשרים ביניהן.", when: "כשצריך להבין איך טבלאות מתחברות, מה מפתח ראשי/זר ומה משפיע על מה.",
    first: "לחץ על קוביה כדי לפתוח שדות; לחץ 'פרטים מלאים' לתפריט הצד.", junior: "התמקד בזרימה משמאל לימין: אב-נתונים → פקודות → סטטוס.",
    senior: "בדוק רדיוס השפעה (Blast radius), פילטר 'מושפע S/4', ורמת אמון בכל טבלה.", mistakes: "לא לבלבל בין טבלה שהוחלפה (compat view) לטבלה יציבה.",
    next: ["בחר טבלת ליבה (AUFK/AFKO/MARA)", "הפעל מצב 'השפעה' לראות מה תלוי בה", "סנן 'מושפע S/4'"] } },
  { match: "/object", help: {
    purpose: "כרטיס אובייקט — כל ההקשר של טבלה אחת.", when: "כשצריך להעמיק בטבלה ספציפית: שדות, קשרים, T-Codes, תקלות, S/4.",
    first: "התחל מ'מטרה עסקית' ואז 'קשרים'.", junior: "הבן מה הטבלה מחזיקה ולמי היא מקושרת.",
    senior: "בדוק S/4HANA Impact, lineage מעלה/מטה, BAPIs/CDS ורמת אמון.", mistakes: "להסתמך על טבלת אינדקס שבוטלה ב-S/4 (BSIS/BSAS).",
    next: ["קרא מטרה עסקית", "בדוק שדות PK/FK", "פתח אובייקטים קשורים", "סקור השפעת S/4", "הפק בדיקות QA"] } },
  { match: "/pm", help: {
    purpose: "מרכז מודול אחזקה (PM) — תהליך, אובייקטים, מודל נתונים.", when: "נקודת התחלה לכל עבודת PM.",
    first: "פתח לשונית 'תהליך' להבנת הזרימה, ואז 'מודל נתונים'.", junior: "עבור על המסלול המומלץ (התחל כאן) שלב-אחר-שלב.",
    senior: "צלול ישר ל-ERD ולכרטיסי האובייקטים הקריטיים.", mistakes: "לדלג על הבנת הקשר הודעה→פקודה→אישור.",
    next: ["הבן תהליך PM", "פתח EQUI ו-AUFK", "בנה רשימת בדיקות QA"] } },
  { match: "/pp-pi", help: {
    purpose: "מרכז מודול ייצור תהליכי (PP-PI).", when: "נקודת התחלה לכל עבודת PP-PI.",
    first: "התחל ב'תהליך' (Plan-to-Produce) ואז אב-נתונים.", junior: "עקוב אחר המסלול: חומר → מתכון → פקודה → אצווה → אישור.",
    senior: "בדוק אינטגרציית אצווה/אישור ו-MATDOC/ACDOCA במעבר.", mistakes: "לבלבל פקודת ייצור בדיד (CO01) עם פקודת תהליך (COR1).",
    next: ["הבן ייצור תהליכי", "פתח MARA ו-AFKO", "סקור אצווה ותנועות"] } },
  { match: "/process-explorer", help: {
    purpose: "מפות תהליך מקצה-לקצה (P2P/O2C/Plan-to-Produce/QM).", when: "כשרוצים להבין שלב-אחר-שלב מה קורה בתהליך.",
    first: "בחר תהליך, לחץ שלב כדי לחשוף T-Codes/טבלאות.", junior: "קרא כל שלב לפי הסדר.", senior: "הצלב שלבים מול תקלות וטבלאות.", mistakes: "לדלג על שלבי QA.",
    next: ["בחר תהליך", "פתח שלב", "עבור לטבלאות הקשורות"] } },
  { match: "/qa-testing", help: {
    purpose: "תרחישי בדיקה (QA) לפי תחום.", when: "בהכנת תכנית בדיקות / קבלה.", first: "בחר חבילת בדיקה רלוונטית.", junior: "השתמש בתרחישים כתבנית.", senior: "התאם תרחישים לפערי S/4 ולסיכונים.", mistakes: "לא לכסות מקרי קצה.",
    next: ["בחר חבילת QA", "התאם לתהליך שלך"] } },
  { match: "/lineage", help: {
    purpose: "שושלת נתונים — מקור → אובייקט → צרכן.", when: "כשצריך להבין מאיפה נתון מגיע ולאן זורם.", first: "חפש אובייקט, לחץ צומת לסימון נתיב.", junior: "התמקד בכיוון הזרימה.", senior: "נתח blast radius וצרכנים אנליטיים (CDS).", mistakes: "להתעלם מצרכנים במורד הזרם.",
    next: ["בחר אובייקט", "סמן נתיב", "פתח סביבת עבודה"] } },
];
export function pageHelpFor(path: string): PageHelp | null {
  const m = PAGE_HELP.filter((x) => path.startsWith(x.match)).sort((a, b) => b.match.length - a.match.length)[0];
  return m ? m.help : null;
}
