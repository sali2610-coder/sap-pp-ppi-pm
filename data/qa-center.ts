// QA Testing Center — test scenario packs for PM / PP / PP-PI processes.
// Positive / Negative / Regression / Integration / Validation. Hand-written for
// SAP QA consultants. T-Codes/tables are real SAP objects.

export type QaKind = "Positive" | "Negative" | "Regression" | "Integration" | "Validation";

export interface QaScenario { kind: QaKind; he: string }
export interface QaPack {
  slug: string;
  module: "PM" | "PP" | "PP-PI" | "Cross";
  he: string;
  area: string;
  intro: string;
  tcodes: string[];
  tables: string[];
  scenarios: QaScenario[];
}

export const QA_PACKS: QaPack[] = [
  { slug: "master-data-validation", module: "Cross", he: "אימות נתוני אב", area: "Master Data", intro: "ולידציית נתוני אב לפני תהליכי תכנון/ייצור — חומר, BOM, מסלול/מתכון, גרסת ייצור, מרכז עבודה/משאב.",
    tcodes: ["MM03", "CS03", "C223", "CR03", "CRC3"], tables: ["MARA", "MARC", "MAST", "MKAL", "CRHD"],
    scenarios: [
      { kind: "Validation", he: "חומר קיים עם כל התצוגות הנדרשות (בסיס/MRP/ייצור/חשבונאות) במפעל." },
      { kind: "Validation", he: "BOM פעיל לשימוש ייצור (1) עם רכיבים ותוקף תקפים." },
      { kind: "Validation", he: "גרסת ייצור תקפה מקשרת BOM+מסלול/מתכון (חובה ב-S/4)." },
      { kind: "Positive", he: "מרכז עבודה/משאב עם קיבולת, נוסחאות ושיוך מרכז עלות." },
      { kind: "Negative", he: "חומר ללא תצוגת MRP במפעל → MRP מתעלם (צפוי כשל)." },
      { kind: "Regression", he: "אורך MATNR 40 — ממשקים/conversion exits עובדים אחרי המרה." },
    ] },
  { slug: "pm-order-lifecycle", module: "PM", he: "מחזור חיי הזמנת אחזקה", area: "PM Order", intro: "בדיקת מחזור פקודת אחזקה מלא: הודעה→פקודה→שחרור→אישור→TECO→התחשבנות.",
    tcodes: ["IW21", "IW31", "IW32", "IW41", "KO88"], tables: ["QMEL", "AUFK", "AFIH", "AFRU", "COBRB"],
    scenarios: [
      { kind: "Positive", he: "הודעה M2 → פקודה PM01 עם פעולה+רכיב → שחרור → אישור → TECO → התחשבנות (יתרה 0)." },
      { kind: "Negative", he: "שחרור עם היתר פתוח → נחסם (צפוי)." },
      { kind: "Negative", he: "אישור בתקופת רישום סגורה → נדחה (צפוי)." },
      { kind: "Integration", he: "רכיב לא-מלאי → דרישת רכש (PR) → הזמנה → קבלה → עלות לפקודה." },
      { kind: "Integration", he: "התחשבנות מעבירה עלות למרכז עלות נכון (ACDOCA)." },
      { kind: "Regression", he: "ביטול אישור (IW45) מהפך עלות וצריכת מלאי." },
    ] },
  { slug: "pppi-process-order-lifecycle", module: "PP-PI", he: "מחזור חיי פקודת תהליך", area: "Process Order", intro: "בדיקת מחזור פקודת תהליך מלא: יצירה→שחרור+מרשם בקרה→אישור+Backflush→GR→התחשבנות.",
    tcodes: ["COR1", "COR2", "COR6N", "CO53", "CO88"], tables: ["AUFK", "AFKO", "AFRU", "MATDOC", "MCH1"],
    scenarios: [
      { kind: "Positive", he: "COR1 עם גרסת ייצור → שחרור → מרשם בקרה → אישור → GR לאצווה → התחשבנות." },
      { kind: "Negative", he: "יצירה ללא גרסת ייצור → נכשל (צפוי)." },
      { kind: "Negative", he: "שחרור ללא יעד מרשם בקרה → מרשם לא נוצר." },
      { kind: "Integration", he: "aATP בשחרור בודק זמינות תרכיז; הוראות תהליך נשלחות ל-MES (CO53)." },
      { kind: "Integration", he: "הודעות תהליך מ-MES (CO54) מעדכנות כמויות בפקודה." },
      { kind: "Regression", he: "ביטול אישור (COR6N reverse) מהפך Backflush + GR." },
    ] },
  { slug: "batch-validation", module: "PP-PI", he: "אימות אצוות", area: "Batch", intro: "בדיקת ניהול אצוות: יצירה, סיווג, תוקף, קביעה אוטומטית (FEFO) ומעקב.",
    tcodes: ["MSC1N", "MSC3N", "COR6N", "CL30N", "MB56"], tables: ["MCH1", "MCHA", "AUSP", "CHVW"],
    scenarios: [
      { kind: "Positive", he: "GR מפקודה יוצר אצווה עם תאריך ייצור+תפוגה (SLED)." },
      { kind: "Validation", he: "מאפייני אצווה חובה מלאים (SLED/יצרן/איכות)." },
      { kind: "Negative", he: "מאפיין חובה ריק → חסימת יצירה (צפוי)." },
      { kind: "Integration", he: "קביעת אצווה אוטומטית FEFO בוחרת תפוגה קרובה." },
      { kind: "Integration", he: "אצווה שנפסלה ב-QM נחסמת ולא נבחרת." },
      { kind: "Regression", he: "Batch Where-Used (MB56) — מעקב Recall קדימה/אחורה." },
    ] },
  { slug: "mrp-validation", module: "PP", he: "אימות MRP", area: "MRP", intro: "בדיקת תכנון דרישות: יצירת היצע מביקוש, אסטרטגיות, MRP Live מול קלאסי.",
    tcodes: ["MD61", "MD01N", "MD04", "MD05"], tables: ["PBIM", "MDKP", "PLAF", "MDVM"],
    scenarios: [
      { kind: "Positive", he: "PIR גרסה 00 → MRP Live → הזמנות מתוכננות לפי Lot Size." },
      { kind: "Validation", he: "דרישות תלויות מפצצות BOM לרכיבים." },
      { kind: "Negative", he: "חומר ללא MRP Type מתאים (ND) → לא מתוכנן." },
      { kind: "Integration", he: "MPS (MD41) → MRP מפצץ רכיבים אחרי ייצוב." },
      { kind: "Regression", he: "השווה תוצאות MD01 קלאסי מול MD01N (כיסוי+כמויות)." },
      { kind: "Regression", he: "Net Change — רק חומרים שהשתנו מתוכננים (Planning File)." },
    ] },
  { slug: "confirmation-backflush", module: "PP-PI", he: "אימות אישור ו-Backflush", area: "Confirmation", intro: "בדיקת אישורי ייצור וצריכת רכיבים אוטומטית (Backflush) + טיפול בכשלים.",
    tcodes: ["CO11N", "COR6N", "COGI", "MF47"], tables: ["AFRU", "RESB", "AFFW", "MATDOC"],
    scenarios: [
      { kind: "Positive", he: "אישור עם Backflush → צריכת RESB + GR אוטומטי." },
      { kind: "Negative", he: "Backflush ללא מלאי → תנועה ל-COGI (צפוי)." },
      { kind: "Integration", he: "תיקון COGI אחרי הזנת מלאי → תנועות נרשמות (MATDOC)." },
      { kind: "Regression", he: "תיקון COGI לא יוצר כפילות תנועות." },
      { kind: "Validation", he: "כמות תוצר באישור לא חורגת מסבולת הפקודה." },
    ] },
  { slug: "settlement-validation", module: "Cross", he: "אימות התחשבנות", area: "Settlement", intro: "בדיקת התחשבנות פקודות, WIP, סטיות, וזרימה ל-FI/CO.",
    tcodes: ["KO88", "CO88", "KKS2", "KKAX"], tables: ["COBRB", "COSS", "ACDOCA", "CKMLPP"],
    scenarios: [
      { kind: "Positive", he: "פקודה סגורה עם עלות → התחשבנות → יתרה 0." },
      { kind: "Negative", he: "התחשבנות ללא כלל → נכשל (צפוי)." },
      { kind: "Validation", he: "WIP בפקודות פתוחות; סטיות בסגורות." },
      { kind: "Integration", he: "עלות/סטיות זורמות ל-ACDOCA + Material Ledger (S/4)." },
      { kind: "Regression", he: "התחשבנות מרוכזת חודשית (CO88) לכל הפקודות." },
    ] },
  { slug: "notification-validation", module: "PM", he: "אימות הודעות אחזקה", area: "Notification", intro: "בדיקת יצירה/עיבוד הודעות אחזקה, קודי קטלוג, ומעבר להזמנה.",
    tcodes: ["IW21", "IW22", "IW28"], tables: ["QMEL", "QMFE", "QMUR", "QMSM"],
    scenarios: [
      { kind: "Positive", he: "הודעה M1 עם ציוד + קוד פגם + סיבה → שמירה." },
      { kind: "Negative", he: "סוג הודעה ללא פרופיל קטלוג → קודים לא זמינים." },
      { kind: "Integration", he: "הודעה → הזמנה (יורשת אובייקט + מרכז עלות)." },
      { kind: "Validation", he: "סגירת הודעה חסומה כשמשימות פתוחות." },
      { kind: "Regression", he: "סגירת הודעה מעדכנת PMIS/אנליטיקה." },
    ] },
  { slug: "integration-pm-mm", module: "PM", he: "אינטגרציה PM-MM (חלפים)", area: "Integration", intro: "בדיקת אינטגרציית חלפים בין אחזקה למלאי/רכש.",
    tcodes: ["IW32", "ME53N", "MIGO", "MB23"], tables: ["RESB", "EBAN", "MATDOC", "EBKN"],
    scenarios: [
      { kind: "Integration", he: "רכיב מלאי → רזרבציה (RESB) → GI 261 → עלות לפקודה." },
      { kind: "Integration", he: "רכיב לא-מלאי → דרישת רכש (PR) → PO → קבלת שירות → עלות." },
      { kind: "Validation", he: "ייחוס חשבונאי (EBKN) נכון למרכז עלות הפקודה." },
      { kind: "Negative", he: "GI ללא מלאי → נכשל (צפוי)." },
      { kind: "Regression", he: "ביטול אישור מהפך רזרבציה/GI." },
    ] },
  { slug: "integration-mes", module: "PP-PI", he: "אינטגרציה MES (מרשם בקרה)", area: "Integration", intro: "בדיקת אינטגרציית ייצור תהליכי עם MES — מרשם בקרה והודעות תהליך.",
    tcodes: ["COR2", "CO53", "CO54", "CO55"], tables: ["AFKO", "AFRU"],
    scenarios: [
      { kind: "Integration", he: "שחרור פקודה → מרשם בקרה נשלח ל-MES (CO53)." },
      { kind: "Integration", he: "הודעות תהליך מ-MES (CO54) → עדכון כמויות/GR בפקודה." },
      { kind: "Negative", he: "יעד מרשם בקרה לא מוגדר → מרשם לא נשלח." },
      { kind: "Validation", he: "הוראות תהליך (PI) במתכון משתקפות במרשם הבקרה." },
      { kind: "Regression", he: "הודעות תהליך כושלות → CO54 לעיבוד מחדש." },
    ] },
];

export const qaPackBySlug = (s: string) => QA_PACKS.find((p) => p.slug === s);
