import type { Story } from "@/data/story/types";

// PP-PI Process Order lifecycle — demand → master data → process order →
// batch → confirmation → close. Standard SAP PP-PI; tables verified in dataset.
export const PPPI_PROCESS_ORDER: Story = {
  id: "pppi-process-order",
  he: "מחזור חיי פקודת תהליך · PP-PI",
  sub: "מדרישת ייצור ועד סגירה — ייצור תהליכי מקצה לקצה",
  accent: "#6d28d9",
  module: "pp-pi",
  learnPath: "/learn/pp-pi/",
  steps: [
    {
      id: "p1", n: 1, phaseHe: "תכנון", title: "נוצרת דרישת ייצור",
      whatHe: "נקודת ההתחלה: ביקוש למוצר (מהזמנה/תחזית/MRP) שמוביל לפקודת ייצור מתוכננת.",
      whyHe: "כל ייצור מתחיל מדרישה — מה לייצר, כמה ומתי.",
      whenHe: "כשתכנון הדרישות (MRP) או הזמנה יוצרים צורך.",
      createdHe: "פקודה מתוכננת (Planned Order) — טרם פקודת תהליך בפועל.",
    },
    {
      id: "p2", n: 2, phaseHe: "אב נתונים", title: "אב החומר", object: "MARA",
      whatHe: "MARA — אב חומר: הבסיס לכל מה שמייצרים או צורכים, עם נתוני המפעל ב-MARC.",
      whyHe: "בלי אב חומר אין מה לייצר; הוא מגדיר יחידות, סוג חומר ופרמטרי תכנון.",
      whenHe: "מוקם לפני הייצור (MM01); נקרא לאורך כל התהליך.",
      createdHe: "רשומת MARA + נתוני מפעל (MARC) קיימים כתנאי מקדים.",
      s4He: "אורך מק\"ט הורחב ל-40 תווים ב-S/4; MARA יציבה אחרת.",
    },
    {
      id: "p3", n: 3, phaseHe: "אב נתונים", title: "מתכון הייצור (Master Recipe)", object: "PLPO",
      whatHe: "PLPO — פעולות וה-Phases של המתכון: כיצד מייצרים את המוצר התהליכי.",
      whyHe: "המתכון מגדיר את שלבי הייצור, משאבים וזמנים — תקן הייצור.",
      whenHe: "מוקם פעם אחת (C201); נקרא בעת פתיחת פקודת תהליך.",
      createdHe: "פעולות/Phases (PLPO) המקושרות לכותרת רשימת הפעולות (PLKO).",
    },
    {
      id: "p4", n: 4, phaseHe: "פתיחה", title: "פתיחת פקודת תהליך", object: "AFKO",
      whatHe: "AFKO — כותרת פקודת התהליך (Process Order): תזמון, כמויות וקישור לפעולות.",
      whyHe: "הפקודה היא כלי הביצוע של הייצור — ממירה את התכנון לעבודה בפועל.",
      whenHe: "כשממירים פקודה מתוכננת לפקודת תהליך (COR1/COR2).",
      createdHe: "נוצרות AFKO (כותרת) + AFPO (פריט) + AFVC (פעולות). סטטוס CRTD.",
      s4He: "MRP Live ב-S/4 משפיע על התכנון סביב הפקודה; AFKO יציבה.",
    },
    {
      id: "p5", n: 5, phaseHe: "פתיחה", title: "פריט הפקודה", object: "AFPO",
      whatHe: "AFPO — פריט הפקודה: המוצר המיוצר, הכמות ויעד המלאי.",
      whyHe: "מגדיר מה בדיוק מייצרים בפקודה ולאן נכנס המלאי המוגמר.",
      whenHe: "נוצר יחד עם הפקודה.",
      createdHe: "שורת AFPO המקושרת ל-AFKO ולאב החומר.",
    },
    {
      id: "p6", n: 6, phaseHe: "ייצור", title: "ניהול אצווה", object: "MCH1",
      whatHe: "MCH1 — אצווה (Batch): מזהה ייחודי לכמות מיוצרת, עם תכונות איכות ותוקף.",
      whyHe: "קריטי בייצור תהליכי (מזון/משקאות) — עקיבות, תוקף ואיכות לפי אצווה.",
      whenHe: "בעת ייצור/קליטת המוצר; אצווה נוצרת לפריט המנוהל באצוות.",
      createdHe: "רשומת אצווה (MCH1/MCHA) עם מאפייני אצווה.",
      s4He: "ניהול אצוות יציב; אינטגרציה עם ATP/Batch ב-S/4.",
    },
    {
      id: "p7", n: 7, phaseHe: "ביצוע", title: "אישור ייצור (Confirmation)", object: "AFRU",
      whatHe: "AFRU — אישור ביצוע: דיווח כמויות שיוצרו, Backflush של חומרים וזמני עבודה.",
      whyHe: "מתרגם ייצור פיזי לנתונים — צריכת חומר, תפוקה ועלויות נרשמות על הפקודה.",
      whenHe: "תוך/בסיום הייצור (COR6N).",
      createdHe: "רשומות AFRU; Backflush מבצע תנועות מלאי לרכיבים ולמוצר המוגמר.",
      s4He: "אישור דרך COR6N/Fiori; תנועות הסחורה ב-MATDOC ב-S/4.",
    },
    {
      id: "p8", n: 8, phaseHe: "סגירה", title: "טיפול בשגיאות וסגירה",
      whatHe: "COGI — תיקון תנועות סחורה תקועות מ-Backflush; ואז סגירה וחיוב הפקודה.",
      whyHe: "Backflush עלול להיכשל (מלאי/אצווה) ולהשאיר תנועות פתוחות שיש לתקן לפני סגירה.",
      whenHe: "בסוף הייצור, לפני TECO/Settlement של הפקודה.",
      createdHe: "תיקון תנועות ב-COGI; חיוב הפקודה ל-ACDOCA; הפקודה עוברת ל-TECO/CLSD.",
      s4He: "Settlement נרשם ב-Universal Journal (ACDOCA) ב-S/4.",
    },
  ],
};

import { PM_MAINTENANCE } from "@/data/story/pm-maintenance";
export const STORIES: Record<string, Story> = {
  "pm-maintenance": PM_MAINTENANCE,
  "pppi-process-order": PPPI_PROCESS_ORDER,
};
