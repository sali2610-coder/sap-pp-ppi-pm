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

  /* ── HR / HCM ── */
  PA0001: [
    { level: "junior", q: "מה מתעד אינפוטיפ 0001?", aHe: "שיוך ארגוני — יחידה ארגונית, תפקיד, מרכז עלות, אזור כוח אדם." },
    { level: "senior", q: "כיצד PA-OM מסונכרנים וכיצד זה משפיע על הרשאות מבניות?", aHe: "RHINTE30/40 מסנכרנים; 0001 מזין הרשאות P_ORGIN לפי המבנה." },
    { level: "architect", q: "כיצד תתכנן מעבר מ-PA הקלאסי ל-Employee Central effective-dated?" },
  ],
  PA0008: [
    { level: "junior", q: "מה מתעד אינפוטיפ 0008?", aHe: "בסיס שכר — סוגי שכר, סולם שכר ושיעורים." },
    { level: "senior", q: "מהו Indirect Valuation וכיצד T510 מעורבת?", aHe: "ערך סוג שכר נגזר אוטומטית מטבלת שיעורים (T510) במקום הזנה ידנית." },
    { level: "architect", q: "כיצד נבדל מודל התגמול ב-EC Compensation מ-PA0008 הקלאסי?" },
  ],
  HRP1001: [
    { level: "junior", q: "מה מייצגת HRP1001?", aHe: "קשרים בין אובייקטי OM (מי מדווח למי, תפקיד↔יחידה, אדם↔תפקיד)." },
    { level: "senior", q: "מהם A/B relationships ו-Evaluation Paths?", aHe: "כיווני קשר הופכיים; Evaluation Path מנווט את הגרף לדוחות (RHSTRU00)." },
    { level: "architect", q: "כיצד תתכנן מבנה OM שתומך גם הרשאות מבניות וגם דיווח היררכי?" },
  ],
  PCL2: [
    { level: "junior", q: "מה נשמר ב-PCL2?", aHe: "תוצאות מחושבות של Payroll ו-Time Evaluation (RT) בפורמט אשכול." },
    { level: "senior", q: "מדוע אסור לקרוא PCL2 כטבלה רגילה?", aHe: "מבנה אשכול דחוס — נקרא דרך Payroll APIs/macros, לא SELECT ישיר." },
    { level: "architect", q: "כיצד משתנה אחסון תוצאות השכר במעבר ל-EC Payroll הענני?" },
  ],

  /* ── BW / Analytics ── */
  ADSO: [
    { level: "junior", q: "מהו ADSO?", aHe: "Advanced DSO — אובייקט האחסון האחיד של BW/4HANA, מחליף InfoCube+DSO+PSA." },
    { level: "senior", q: "מה ההבדל בין סוגי ADSO (Standard/Staging/DataMart)?", aHe: "קובעים מבנה inbound/active + התנהגות activation ו-overwrite/summation." },
    { level: "architect", q: "כיצד תתכנן שכבות LSA++ עם ADSO ו-CompositeProvider?" },
  ],
  RSTRAN: [
    { level: "junior", q: "מה תפקיד Transformation ב-BW?", aHe: "מיפוי וכללי שינוי בין מקור ליעד; מורץ ע\"י DTP." },
    { level: "senior", q: "מתי תשתמש ב-start/end/expert routine?", aHe: "start: עיבוד מקדים של החבילה; end: אחרי מיפוי; expert: שליטה מלאה בלוגיקה." },
    { level: "architect", q: "כיצד הטרנספורמציה משתנה במעבר ל-Datasphere (graphical/SQL views)?" },
  ],
  CDS_AnalyticalView: [
    { level: "junior", q: "מהי CDS Analytical View?", aHe: "CDS view עם @Analytics annotations (CUBE/DIMENSION) ל-real-time analytics על S/4." },
    { level: "senior", q: "כיצד היא מחליפה InfoCube/Query קלאסי?", aHe: "מודל ב-S/4 עצמו ללא העתקה ל-BW; נצרך ע\"י SAC/Fiori/AfO." },
    { level: "architect", q: "מתי תעדיף Embedded Analytics (CDS) על פני BW/4HANA נפרד?" },
  ],
  RSPCCHAIN: [
    { level: "junior", q: "מהי Process Chain?", aHe: "תזמור תהליכי טעינה/ניהול (load/activate/index/cleanup) עם תלויות." },
    { level: "senior", q: "כיצד תטפל בכשל באמצע שרשרת?", aHe: "error branch + RSPC/RSPCM monitor; repeat/repair מהצומת שנכשל." },
    { level: "architect", q: "כיצד תמפה Process Chains לניטור Job Monitoring ב-Cloud ALM?" },
  ],
};

export const interviewFor = (name: string): IQ[] => INTERVIEW[name] || [];
