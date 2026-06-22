// Interview preparation (Layer 7) — curated SAP interview questions per object,
// by seniority. Standard, well-established SAP PM/PP-PI interview material.
// trust: curated. Surfaced on object pages (Learning tab).

export type Level = "junior" | "senior" | "architect";
export interface IQ { level: Level; q: string; aHe?: string }

export const INTERVIEW: Record<string, IQ[]> = {
  IFLOT: [
    { level: "junior", q: "מה ההבדל בין מיקום פונקציונלי לציוד?", aHe: "מיקום = מקום קבוע במבנה המפעל; ציוד = פריט נייד/מתוחזק שמותקן במיקום." },
    { level: "senior", q: "כיצד נקבע מבנה ה-FuncLoc וכיצד הוא משפיע על דיווח?", aHe: "ה-Edit Mask ב-SPRO מגדיר את ההיררכיה; היא מאפשרת ניתוח אחזקה לפי אזור/קו." },
    { level: "architect", q: "מתי תעדיף מבנה מבוסס-מיקום על פני מבוסס-ציוד באסטרטגיית אחזקה?" },
  ],
  EQUI: [
    { level: "junior", q: "כיצד ציוד מותקן במיקום פונקציונלי?", aHe: "דרך IE02/IE4N; הקשר והחיוב מנוהלים ב-ILOA." },
    { level: "senior", q: "מה תפקיד ILOA בקשר ציוד↔מיקום↔חשבונאות?" },
    { level: "architect", q: "כיצד היסטוריית ציוד נשמרת בהעברה בין מיקומים ומה ההשלכות על אמינות?" },
  ],
  QMEL: [
    { level: "junior", q: "מה ההבדל בין הודעת אחזקה לצו אחזקה?", aHe: "הודעה מתעדת תקלה/בקשה; צו מבצע את העבודה ונושא עלות." },
    { level: "senior", q: "כיצד קטלוגי נזק/גורם (QMFE) תורמים לניתוח תקלות?" },
    { level: "architect", q: "כיצד תתכנן זרימת הודעה→צו אוטומטית עם סוגי הודעה ופעולות תגובה?" },
  ],
  AUFK: [
    { level: "junior", q: "אילו טבלאות מרכיבות צו אחזקה?", aHe: "AUFK (אב) + AFIH (כותרת PM) + AFKO (לוגיסטי) + AFVC (פעולות)." },
    { level: "senior", q: "מה ההבדל בין AUFK, AFIH ו-AFKO?" },
    { level: "architect", q: "כיצד תכנן Settlement של צווי אחזקה ב-S/4 מול ACDOCA?" },
  ],
  AFKO: [
    { level: "junior", q: "מה ההבדל בין פקודה מתוכננת לפקודת תהליך?", aHe: "מתוכננת = הצעת MRP; פקודת תהליך = מסמך ביצוע אחרי המרה." },
    { level: "senior", q: "אילו טבלאות מרכיבות פקודת תהליך וכיצד הן מקושרות?" },
    { level: "architect", q: "כיצד MRP Live ב-S/4 משנה את יצירת ותזמון הפקודות?" },
  ],
  AFRU: [
    { level: "junior", q: "מה נרשם בעת אישור ביצוע?", aHe: "זמן עבודה, צריכת חומר (Backflush) וסטטוס — נרשמים על הצו." },
    { level: "senior", q: "כיצד Backflush משפיע על מלאי ומתי הוא נכשל?" },
    { level: "architect", q: "כיצד תאזן בין Backflush אוטומטי לדיוק מלאי בייצור תהליכי?" },
  ],
  JEST: [
    { level: "junior", q: "איפה נשמר הסטטוס של אובייקט?", aHe: "ב-JEST (סטטוסים פעילים) עם פרופיל ב-JSTO." },
    { level: "senior", q: "מה ההבדל בין סטטוס מערכת לסטטוס משתמש?" },
    { level: "architect", q: "כיצד תעצב פרופיל סטטוס משתמש לאכיפת תהליך עסקי?" },
  ],
  MARA: [
    { level: "junior", q: "מה ההבדל בין MARA ל-MARC?", aHe: "MARA = נתונים כלליים; MARC = נתונים תלויי-מפעל (MRP, אצוות)." },
    { level: "senior", q: "אילו תצוגות חומר נדרשות לייצור ולמה?" },
    { level: "architect", q: "מה השלכות הרחבת אורך המק\"ט ל-40 תווים ב-S/4 על ממשקים?" },
  ],
  MKAL: [
    { level: "junior", q: "מהי גרסת ייצור?", aHe: "קישור BOM+מתכון תקפים לחומר ולטווח כמות/תוקף." },
    { level: "senior", q: "מדוע גרסת ייצור חובה ב-S/4?", aHe: "MRP/ייצור נכשלים בלעדיה — שינוי מ-ECC." },
    { level: "architect", q: "כיצד תנהל מספר גרסאות ייצור לקווים שונים ובחירה אוטומטית?" },
  ],
  MCH1: [
    { level: "junior", q: "מהי אצווה ומדוע חשובה בייצור תהליכי?", aHe: "מזהה כמות מיוצרת עם תוקף ואיכות — עקיבות ו-Recall." },
    { level: "senior", q: "כיצד עובדת קביעת אצווה לפי FEFO?" },
    { level: "architect", q: "כיצד תתכנן עקיבות אצווה מקצה לקצה (גלם→מוגמר→משלוח)?" },
  ],
  PLPO: [
    { level: "junior", q: "מה ההבדל בין מתכון (PP-PI) לרשימת פעולות (PP)?" },
    { level: "senior", q: "מה תפקיד ה-control key ברמת הפעולה/Phase?" },
    { level: "architect", q: "כיצד תעצב מתכון רב-שלבי עם משאבים ו-Phases למורכבות ייצור?" },
  ],
  RESB: [
    { level: "junior", q: "מה מנהלת טבלת RESB?", aHe: "שמורות/רכיבים שהצו דורש — בסיס לשליפת מלאי." },
    { level: "senior", q: "כיצד שמורות מתחברות ל-PP-MM ולתנועות סחורה?" },
  ],
  MSEG: [
    { level: "junior", q: "מה מתעדת MSEG?", aHe: "שורת תנועת מלאי (GR/GI); הכותרת ב-MKPF." },
    { level: "senior", q: "מה השתנה בתנועות סחורה ב-S/4?", aHe: "MSEG/MKPF → טבלה אחת MATDOC." },
  ],
};

export const interviewFor = (name: string): IQ[] => INTERVIEW[name] || [];
