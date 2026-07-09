import type { Story } from "@/data/story/types";

// PM Corrective Maintenance — machine failure → notification → order → execution
// → technical close → settlement. Standard SAP PM process; tables verified in
// the dataset.
export const PM_MAINTENANCE: Story = {
  id: "pm-maintenance",
  he: "תהליך אחזקת שבר · PM",
  sub: "ממכונה שנתקעה ועד סגירת העלויות — תהליך מקצה לקצה",
  accent: "#f97316",
  module: "pm",
  learnPath: "/learn/pm-fundamentals/",
  steps: [
    {
      id: "s1", n: 1, phaseHe: "אירוע", title: "מכונה נתקעת בקו הייצור",
      whatHe: "נקודת ההתחלה: ציוד שמתוחזק (EQUI) המותקן במיקום פונקציונלי (IFLOT) מפסיק לעבוד.",
      whyHe: "כל תהליך אחזקת שבר מתחיל מאירוע בשטח — תקלה שמדווחת על אובייקט טכני קיים.",
      whenHe: "ברגע שעובד/חיישן מזהה תקלה.",
      createdHe: "עדיין כלום במערכת — רק טריגר עסקי לפתיחת הודעה.",
    },
    {
      id: "s2", n: 2, phaseHe: "תיעוד", title: "פתיחת הודעת אחזקה", object: "QMEL",
      whatHe: "QMEL — כותרת הודעת אחזקה. מתעדת את התקלה: מה קרה, איפה, ועל איזה אובייקט.",
      whyHe: "ההודעה היא התיעוד הרשמי של התקלה ונקודת הכניסה לתהליך. ממנה נגזר הצו.",
      whenHe: "מיד עם זיהוי התקלה, לפני שמתחילים לתקן (IW21).",
      createdHe: "נוצרת רשומת QMEL + פריטי תקלה (QMFE) עם קוד נזק/גורם.",
      s4He: "מבנה יציב ב-S/4; פתיחה דרך Fiori 'Create Maintenance Request/Notification'.",
    },
    {
      id: "s3", n: 3, phaseHe: "תכנון", title: "יצירת צו אחזקה", object: "AUFK",
      whatHe: "AUFK — אב הצו. הרחבת ה-PM שלו היא AFIH (ציוד, מיקום, סוג פעילות).",
      whyHe: "הצו הוא כלי הביצוע: מתכננים בו עבודה, חומרים ועלויות. ההודעה מתעדת — הצו מבצע.",
      whenHe: "אחרי שמחליטים לטפל; הצו נפתח מההודעה (IW31/IW32).",
      createdHe: "נוצרת רשומת AUFK + AFIH (כותרת PM) + AFKO (כותרת לוגיסטית). סטטוס CRTD.",
      s4He: "AUFK יציבה; חיוב הצו מתנקז ל-ACDOCA במקום טבלאות ה-CO הקלאסיות.",
    },
    {
      id: "s4", n: 4, phaseHe: "תכנון", title: "הגדרת פעולות הצו", object: "AFVC",
      whatHe: "AFVC — פעולות הצו: רשימת השלבים לביצוע, מרכז עבודה (CRHD) וזמן תקן לכל פעולה.",
      whyHe: "בלי פעולות אין מה לבצע ולא ניתן לדווח עבודה. הפעולות מגדירות 'איך' מתקנים.",
      whenHe: "בשלב תכנון הצו, לפני שחרורו.",
      createdHe: "נוצרות שורות AFVC המקושרות ל-AFKO ולמרכז העבודה.",
    },
    {
      id: "s5", n: 5, phaseHe: "הכנה", title: "שריון חלפים וחומרים", object: "RESB",
      whatHe: "RESB — רכיבי/שמורות הצו: החלפים והחומרים שהתיקון דורש.",
      whyHe: "מבטיח שהחלקים יהיו זמינים; מחבר את PM ל-MM (מלאי ורכש).",
      whenHe: "בתכנון הצו, כשמשייכים חומרים לפעולות.",
      createdHe: "נוצרות שמורות (RESB); בשליפה בפועל נרשמות תנועות מלאי.",
      s4He: "תנועות הסחורה נרשמות ב-MATDOC ב-S/4 (במקום MSEG/MKPF).",
    },
    {
      id: "s6", n: 6, phaseHe: "ביצוע", title: "דיווח ביצוע העבודה", object: "AFRU",
      whatHe: "AFRU — אישור ביצוע (Confirmation): כמה זמן הושקע, אילו חומרים נצרכו, מה הסטטוס.",
      whyHe: "מתרגם עבודה פיזית לנתונים: שעות, עלויות וצריכת חומר נרשמות על הצו.",
      whenHe: "תוך/בסיום הביצוע בשטח (IW41/IW42).",
      createdHe: "נוצרות רשומות AFRU; מתבצעות תנועות מלאי וחיוב עלויות לצו.",
      s4He: "מנגנון האישור יציב; דיווח דרך Fiori/אפליקציות נייד נפוץ ב-S/4.",
    },
    {
      id: "s7", n: 7, phaseHe: "סגירה טכנית", title: "סגירה טכנית של הצו (TECO)", object: "JEST",
      whatHe: "JEST — סטטוס אובייקט. סגירה טכנית מוסיפה סטטוס TECO לצו.",
      whyHe: "מסמנת שהעבודה הפיזית הסתיימה; חוסמת שינויים לוגיסטיים ומשחררת לסגירת עלויות.",
      whenHe: "בסיום העבודה בפועל, לפני Settlement.",
      createdHe: "מתעדכן סטטוס ב-JEST (TECO); הצו נעול לשינויי ביצוע.",
      s4He: "מנגנון הסטטוס יציב; קריאה מומלצת דרך CDS/Fiori.",
    },
    {
      id: "s8", n: 8, phaseHe: "סגירה כספית", title: "סגירת עלויות ודיווח",
      whatHe: "Settlement — העברת עלויות הצו ליעד החיוב (מרכז עלות/נכס), ואז ניתוח ודיווח.",
      whyHe: "סוגר את המעגל הכספי וזן מדדי אחזקה (MTBF/MTTR) להחלטות עתידיות.",
      whenHe: "אחרי TECO, בסוף חיי הצו (KO88 / Settlement run).",
      createdHe: "מסמכי חיוב; ב-S/4 הרישום ב-ACDOCA. הצו עובר ל-CLSD.",
      s4He: "ה-Settlement נרשם ב-Universal Journal (ACDOCA) במקום טבלאות ה-CO הנפרדות.",
    },
  ],
};
