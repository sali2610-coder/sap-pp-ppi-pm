// Process Learning Workspace data. Curated, standard-SAP step narrative +
// business purpose + interview questions (the only net-new content, trust-tagged).
// All other facets (tables / T-Codes / relations / incidents / S-4) are DERIVED
// at render time from the live dataset + existing knowledge/troubleshooting/s4
// layers — no duplication, no fabrication.

export interface InterviewQ { level: "junior" | "senior"; q: string }
export interface ProcessStep {
  id: string;
  phaseHe: string;
  title: string;
  object?: string;     // real table → derives objects/tables/T-Codes/incidents/S-4
  whatHe: string;
  whyHe: string;
  whenHe: string;
  businessHe: string;  // business purpose / outcome
  qaHe: string[];      // QA test ideas (curated)
  interview: InterviewQ[];
}
export interface ProcessDef { he: string; sub: string; steps: ProcessStep[] }

const PM: ProcessStep[] = [
  { id: "pm-1", phaseHe: "מבנה", title: "מיקום פונקציונלי", object: "IFLOT",
    whatHe: "המבנה הפיזי/פונקציונלי של המפעל — היכן ציוד מותקן ומתוחזק.", whyHe: "עוגן לכל הודעה, צו וציוד; בסיס להיסטוריית אחזקה לפי מיקום.", whenHe: "בהקמת מבנה המפעל (IL01) ובכל שיוך אובייקט למיקום.",
    businessHe: "מאפשר ניתוח אחזקה לפי אזור/קו ייצור, ולא רק לפי פריט בודד.",
    qaHe: ["יצירת מיקום והיררכיה (IL01/IL03)", "שיוך ציוד למיקום ובדיקת ILOA", "חסימת סטטוס ובדיקת חסימת פעולות"],
    interview: [{ level: "junior", q: "מה ההבדל בין מיקום פונקציונלי לציוד?" }, { level: "senior", q: "כיצד נקבע מבנה ה-FuncLoc (Edit Mask) ומה השלכותיו?" }] },
  { id: "pm-2", phaseHe: "מבנה", title: "ציוד", object: "EQUI",
    whatHe: "פריט הציוד המתוחזק — מספר, סוג, יצרן, מצב התקנה והיסטוריה.", whyHe: "האובייקט הטכני שעליו מבוצעת האחזקה; נושא היסטוריית תקלות ועלויות.", whenHe: "בהקמת ציוד (IE01) והתקנתו במיקום.",
    businessHe: "ניהול נכסים טכניים ועקיבות לאורך מחזור החיים.",
    qaHe: ["הקמת ציוד + התקנה במיקום (IE01)", "פירוק/העברת ציוד (IE4N)", "בדיקת היסטוריית ציוד (IE03)"],
    interview: [{ level: "junior", q: "כיצד ציוד מותקן במיקום פונקציונלי?" }, { level: "senior", q: "מה תפקיד ILOA בקשר ציוד↔מיקום↔חיוב?" }] },
  { id: "pm-3", phaseHe: "תיעוד", title: "הודעת אחזקה", object: "QMEL",
    whatHe: "תיעוד תקלה/בקשה לפני פתיחת צו — נקודת הכניסה לתהליך.", whyHe: "מתעדת מה קרה, איפה ועל איזה אובייקט; בסיס לניתוח תקלות (קטלוגים).", whenHe: "מיד עם זיהוי התקלה (IW21).",
    businessHe: "תיעוד רשמי של אירועי אחזקה ובסיס למדדי אמינות.",
    qaHe: ["פתיחת הודעה + פריטי תקלה (IW21)", "המרת הודעה לצו", "סגירת הודעה (NOCO) עם משימות פתוחות"],
    interview: [{ level: "junior", q: "מה ההבדל בין הודעת אחזקה לצו אחזקה?" }, { level: "senior", q: "כיצד קטלוגי נזק/גורם תורמים לניתוח תקלות?" }] },
  { id: "pm-4", phaseHe: "ביצוע", title: "צו אחזקה", object: "AUFK",
    whatHe: "כלי הביצוע — תכנון עבודה, חומרים ועלויות. AUFK (אב) + AFIH (כותרת PM) + AFKO (לוגיסטי).", whyHe: "ההודעה מתעדת, הצו מבצע: תכנון, שחרור, ביצוע וחיוב.", whenHe: "בפתיחת צו מההודעה (IW31/IW32).",
    businessHe: "ניהול עבודת האחזקה מקצה לקצה כולל עלות ותזמון.",
    qaHe: ["פתיחת צו ושחרור (REL)", "בדיקת היתרים (Permits) החוסמים שחרור", "בדיקת קישור ציוד/מיקום בכותרת"],
    interview: [{ level: "junior", q: "אילו טבלאות מרכיבות צו אחזקה?" }, { level: "senior", q: "מה ההבדל בין AUFK, AFIH ו-AFKO?" }] },
  { id: "pm-5", phaseHe: "ביצוע", title: "פעולות הצו", object: "AFVC",
    whatHe: "שלבי הביצוע: מה לעשות, מרכז עבודה וזמן תקן לכל פעולה.", whyHe: "בלי פעולות אין מה לבצע ולא ניתן לדווח עבודה.", whenHe: "בתכנון הצו לפני שחרור.",
    businessHe: "מגדיר את אופן הביצוע ומאפשר תכנון קיבולת ועלות עבודה.",
    qaHe: ["הוספת פעולות + מרכז עבודה", "בדיקת control key (אישור/חיוב)", "תזמון פעולות"],
    interview: [{ level: "junior", q: "מה מגדירה פעולת צו?" }, { level: "senior", q: "מה תפקיד ה-control key ברמת הפעולה?" }] },
  { id: "pm-6", phaseHe: "אישור", title: "אישור ביצוע", object: "AFRU",
    whatHe: "דיווח העבודה שבוצעה — זמנים, חומרים שנצרכו וסטטוס.", whyHe: "מתרגם עבודה פיזית לנתונים: שעות, עלויות וצריכת חומר על הצו.", whenHe: "תוך/בסיום הביצוע (IW41/IW42).",
    businessHe: "רישום עלות בפועל ובסיס לסגירה כספית ולמדדי אחזקה.",
    qaHe: ["אישור זמן/כמות (IW41)", "ביטול אישור", "בדיקת תנועות מלאי תקועות (COGI)"],
    interview: [{ level: "junior", q: "מה נרשם בעת אישור צו?" }, { level: "senior", q: "כיצד Backflush משפיע על מלאי החלפים?" }] },
  { id: "pm-7", phaseHe: "סגירה", title: "סטטוס טכני (TECO)", object: "JEST",
    whatHe: "סגירה טכנית מוסיפה סטטוס TECO; JEST מאחסן את הסטטוסים הפעילים.", whyHe: "מסמן שהעבודה הסתיימה; חוסם שינויים ומשחרר לסגירת עלויות.", whenHe: "בסיום העבודה, לפני Settlement.",
    businessHe: "נעילת הצו ושמירת שלמות הנתונים לקראת חיוב.",
    qaHe: ["TECO לצו ובדיקת חסימת שינויים", "בדיקת סטטוס ב-JEST", "ביטול TECO"],
    interview: [{ level: "junior", q: "איפה נשמר הסטטוס הטכני של אובייקט?" }, { level: "senior", q: "מה ההבדל בין סטטוס מערכת לסטטוס משתמש?" }] },
  { id: "pm-8", phaseHe: "סגירה כספית", title: "סגירת עלויות ודיווח",
    whatHe: "Settlement מעביר את עלויות הצו ליעד החיוב; אחריו ניתוח ודיווח.", whyHe: "סוגר את המעגל הכספי וזן מדדי אחזקה (MTBF/MTTR).", whenHe: "אחרי TECO (KO88 / Settlement run).",
    businessHe: "שקיפות עלות אחזקה והחלטות תחזוקה מבוססות-נתונים.",
    qaHe: ["הגדרת Settlement Rule", "ריצת KO88 ובדיקת מסמכים", "בדיקת תקופה פתוחה (OB52)"],
    interview: [{ level: "junior", q: "מה מטרת ה-Settlement של צו?" }, { level: "senior", q: "כיצד S/4 משנה את רישום ה-Settlement (ACDOCA)?" }] },
];

const PPPI: ProcessStep[] = [
  { id: "ppi-1", phaseHe: "אב נתונים", title: "אב חומר", object: "MARA",
    whatHe: "הבסיס לכל מה שמייצרים/צורכים — מק\"ט, סוג חומר, יחידות.", whyHe: "בלי אב חומר אין מה לייצר; מגדיר פרמטרי תכנון ומכירה.", whenHe: "מוקם לפני הייצור (MM01); נקרא לכל אורך התהליך.",
    businessHe: "מקור אמת יחיד למוצר על פני לוגיסטיקה, ייצור ומכירה.",
    qaHe: ["הקמת חומר + תצוגות (MM01)", "הרחבת חומר למפעל (MARC)", "בדיקת אורך מק\"ט ב-S/4"],
    interview: [{ level: "junior", q: "מה ההבדל בין MARA ל-MARC?" }, { level: "senior", q: "מה השתנה באורך המק\"ט ב-S/4 ומה ההשלכות?" }] },
  { id: "ppi-2", phaseHe: "אב נתונים", title: "מתכון ייצור", object: "PLPO",
    whatHe: "פעולות וה-Phases של מתכון האב — כיצד מייצרים את המוצר התהליכי.", whyHe: "תקן הייצור: שלבים, משאבים וזמנים.", whenHe: "מוקם פעם אחת (C201); נקרא בפתיחת פקודה.",
    businessHe: "סטנדרטיזציה של הייצור ובסיס לתמחור ולתכנון קיבולת.",
    qaHe: ["הקמת מתכון + Phases (C201)", "שיוך משאב לפעולה", "בדיקת control key"],
    interview: [{ level: "junior", q: "מה ההבדל בין מתכון (PP-PI) לרשימת פעולות (PP)?" }, { level: "senior", q: "מה תפקיד גרסת הייצור (MKAL) בבחירת מתכון?" }] },
  { id: "ppi-3", phaseHe: "פתיחה", title: "פקודת תהליך — כותרת", object: "AFKO",
    whatHe: "כותרת פקודת התהליך: תזמון, כמויות וקישור לפעולות.", whyHe: "ההמרה של תכנון לעבודה בפועל.", whenHe: "בהמרת פקודה מתוכננת (COR1/COR2).",
    businessHe: "ניהול הזמנת ייצור מקצה לקצה כולל עלות ותזמון.",
    qaHe: ["יצירת פקודה ושחרור", "בדיקת גרסת ייצור תקפה (MKAL)", "בדיקת זמינות רכיבים"],
    interview: [{ level: "junior", q: "מה ההבדל בין פקודה מתוכננת לפקודת תהליך?" }, { level: "senior", q: "כיצד MRP Live ב-S/4 משפיע על יצירת הפקודה?" }] },
  { id: "ppi-4", phaseHe: "פתיחה", title: "פריט הפקודה", object: "AFPO",
    whatHe: "המוצר המיוצר בפקודה, כמותו ויעד המלאי.", whyHe: "מגדיר מה בדיוק מייצרים ולאן נכנס המלאי המוגמר.", whenHe: "נוצר יחד עם הפקודה.",
    businessHe: "קישור הייצור למלאי המוגמר ולעלות המוצר.",
    qaHe: ["בדיקת כמות/יעד מלאי", "קליטת מוצר מוגמר (GR)", "בדיקת קישור לאב חומר"],
    interview: [{ level: "junior", q: "מה מחזיק פריט הפקודה (AFPO)?" }, { level: "senior", q: "כיצד מטופלים מוצרי-לוואי (Co-products) בפקודה?" }] },
  { id: "ppi-5", phaseHe: "ייצור", title: "ניהול אצווה", object: "MCH1",
    whatHe: "אצווה — מזהה ייחודי לכמות מיוצרת עם מאפייני איכות ותוקף.", whyHe: "עקיבות, תוקף (SLED) ואיכות — קריטי בייצור תהליכי.", whenHe: "בעת ייצור/קליטת מוצר המנוהל באצוות.",
    businessHe: "עמידה ברגולציה (מזון/משקאות), Recall ועקיבות מלאה.",
    qaHe: ["יצירת אצווה + מאפיינים (MSC1N)", "קביעת אצווה FEFO (CU70)", "חסימת אצווה ובדיקת השפעה"],
    interview: [{ level: "junior", q: "מהי אצווה ומדוע היא חשובה בייצור תהליכי?" }, { level: "senior", q: "כיצד עובדת קביעת אצווה לפי FEFO?" }] },
  { id: "ppi-6", phaseHe: "אישור", title: "אישור ייצור", object: "AFRU",
    whatHe: "דיווח כמויות שיוצרו, Backflush של חומרים וזמני עבודה.", whyHe: "מתרגם ייצור פיזי לנתונים — צריכה, תפוקה ועלויות על הפקודה.", whenHe: "תוך/בסיום הייצור (COR6N).",
    businessHe: "רישום תפוקה ועלות בפועל ובסיס לחישוב סטיות.",
    qaHe: ["אישור פאזה/פקודה (COR6N)", "בדיקת Backflush ותנועות מלאי", "אישור מחוץ לרצף"],
    interview: [{ level: "junior", q: "מה קורה במערכת בעת אישור ייצור?" }, { level: "senior", q: "מתי Backflush נכשל ומה ההשלכות?" }] },
  { id: "ppi-7", phaseHe: "סגירה", title: "תיקון תנועות (COGI)",
    whatHe: "COGI מטפל בתנועות סחורה תקועות מ-Backflush (נשמרות ב-AFFW).", whyHe: "Backflush עלול להיכשל (מלאי/אצווה/תקופה) ולהשאיר תנועות פתוחות.", whenHe: "בסוף הייצור, לפני סגירת הפקודה.",
    businessHe: "מניעת אי-התאמות מלאי וחיוב לפני סגירה כספית.",
    qaHe: ["יצירת כשל Backflush ותיקון ב-COGI", "פתיחת תקופה (MMRV)", "שחרור אצווה ועיבוד מחדש"],
    interview: [{ level: "junior", q: "מה זה COGI ומתי נתקלים בו?" }, { level: "senior", q: "מהם הגורמים הנפוצים לכשל Backflush וכיצד מונעים?" }] },
  { id: "ppi-8", phaseHe: "סגירה כספית", title: "התחשבנות ודיווח",
    whatHe: "Settlement של הפקודה, חישוב סטיות ודיווח תפוקה/עלות.", whyHe: "סוגר את המעגל הכספי וחושף סטיות צריכה/תפוקה.", whenHe: "בסוף חיי הפקודה (TECO → KKS1/KKS2 → Settlement).",
    businessHe: "בקרת עלות ייצור ושיפור מתמיד מבוסס-סטיות.",
    qaHe: ["חישוב סטיות (KKS2)", "שחרור עלות תקן (CK24)", "Settlement ובדיקת ACDOCA"],
    interview: [{ level: "junior", q: "מה מטרת ההתחשבנות של פקודת ייצור?" }, { level: "senior", q: "כיצד מחושבות סטיות ולאן נרשמות ב-S/4?" }] },
];

export const PROCESS: Record<string, ProcessDef> = {
  PM: { he: "תהליך אחזקת שבר", sub: "מתקלה ועד סגירת עלויות", steps: PM },
  "PP-PI": { he: "מחזור חיי פקודת תהליך", sub: "מאב נתונים ועד דיווח", steps: PPPI },
};
