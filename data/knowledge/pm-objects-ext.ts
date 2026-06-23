// PM knowledge — Phase P1 expansion (the 36 PM tables that lacked curated
// knowledge). Standard SAP Plant Maintenance / cross knowledge. Derived facts
// (T-Codes, BAPIs, CDS, relations) come from the live dataset — not here.
// trust:"curated" = established; "needs-verification" = confirm vs OSS/SUM.

import type { ObjectKnowledge } from "@/lib/knowledge";

const K = (role: string, why: string, whenUsed: string, o: Partial<ObjectKnowledge> = {}): ObjectKnowledge =>
  ({ role, why, whenUsed, importance: o.importance || "supporting", step: o.step, s4: o.s4, trust: o.trust || "curated" });

export const PM_KNOWLEDGE_EXT: Record<string, ObjectKnowledge> = {
  IFLOS: K("תוויות/מבנה למיקום פונקציונלי (Structure indicator labels).", "מגדירה את תבנית המזהה ההיררכי של המיקום הפונקציונלי (Edit mask).", "בעת הקמת מבנה מפעל ב-IL01 — קובעת איך נראה המזהה.", { importance: "advanced", s4: "ללא שינוי מבני." }),
  CRTX: K("טקסטים רב-לשוניים למרכז עבודה.", "תיאורי מרכז העבודה/משאב בשפות.", "נקראת בכל תצוגת מרכז עבודה (IR03/CR03).", { importance: "advanced", s4: "נשמר; ב-S/4 ניהול דרך Manage Work Centers." }),
  T370T: K("טקסטים לסוג אובייקט טכני (Object type).", "תיאורי סוגי הציוד/מיקום.", "תצוגה/בחירה של סוג אובייקט טכני.", { importance: "advanced", trust: "needs-verification" }),
  EQUZ: K("מקטע זמן של ציוד (Equipment time segment / installation history).", "שומר את היסטוריית ההתקנה והשיוך של הציוד לאורך זמן — כל שינוי יוצר מקטע.", "בכל התקנה/פירוק/שינוי שיוך של ציוד (IE02/IE4N).", { importance: "supporting", s4: "מודל EQUI/EQUZ/ILOA נשמר ב-S/4." }),
  MAST: K("שיוך עץ מוצר (BOM) לחומר/מפעל.", "מקשרת חומר במפעל לעץ המוצר שלו — נקודת הכניסה ל-STKO/STPO.", "בשימוש בחומרי PM (חלקי חילוף) ובייצור.", { importance: "supporting", step: "עץ מוצר · שיוך" }),
  EQST: K("קישור סטטוס/מבנה לציוד.", "מקשר ציוד למידע נלווה (סטטוס/מבנה).", "באבחון מבנה ציוד.", { importance: "advanced", trust: "needs-verification" }),
  TPST: K("שיוך רשימת פעולות למיקום פונקציונלי.", "מקשר Task List למיקום הפונקציונלי לתחזוקה מתוכננת.", "בהגדרת אחזקה מונעת מבוססת-מיקום.", { importance: "advanced", trust: "needs-verification" }),
  IMPTT: K("נקודת מדידה (Measuring Point) — אב נתונים.", "מגדירה מה נמדד על ציוד/מיקום (מונה/ערך): טמפ', שעות, לחץ.", "בהקמת ניטור מצב (IK01) על אובייקט טכני.", { importance: "supporting", step: "מדידות · נקודה" }),
  IMRG: K("מסמך מדידה (Measurement Document).", "רושם קריאת מדידה בפועל בנקודת מדידה — בסיס לאחזקה מבוססת-מצב.", "בכל הזנת קריאה (IK11) או אוטומטית מ-IoT.", { importance: "supporting", step: "מדידות · קריאה" }),
  QPCD: K("קודי קטלוג איכות/תקלה.", "ערכי הקוד עצמם (נזק/גורם/פעולה) לשימוש בהודעות.", "בקיטלוג תקלות בהודעת אחזקה/איכות.", { importance: "advanced" }),
  QPGR: K("קבוצות קודים (Code Groups) לקטלוג.", "מקבצת קודי קטלוג לפי נושא — מבנה הבחירה בהודעות.", "בהגדרת קטלוגי נזק/גורם/פעולה.", { importance: "advanced" }),
  T352B: K("קונפיגורציה — מרכזי עבודה/קבוצות מתכננים לאחזקה.", "הגדרות ארגון אחזקה.", "ב-Customizing של PM.", { importance: "advanced", trust: "needs-verification" }),
  T352: K("קונפיגורציה — מבנה ארגון אחזקה.", "טבלת הגדרה לארגון האחזקה.", "ב-Customizing של PM.", { importance: "advanced", trust: "needs-verification" }),
  QMUR: K("גורמי תקלה בהודעה (Causes).", "מתעדת את הגורם לנזק שדווח בהודעת אחזקה/איכות.", "בניתוח שורש של תקלה (IW22).", { importance: "supporting" }),
  QMMA: K("פעולות/אמצעים בהודעה (Activities).", "מתעדת אילו פעולות בוצעו בתגובה לתקלה.", "בטיפול בהודעה ובסגירתה.", { importance: "supporting" }),
  QMSM: K("משימות בהודעה (Tasks).", "משימות שהוקצו לטיפול בהודעה; חוסמות סגירה עד השלמה.", "בניהול הטיפול בהודעת אחזקה.", { importance: "supporting", s4: "נשמר; בדוק תהליך סגירת הודעה." }),
  TQ80: K("קונפיגורציה — סוגי הודעה (Notification Types).", "מגדירה סוגי הודעות אחזקה/איכות וזרימתן.", "ב-Customizing של PM/QM.", { importance: "advanced", trust: "needs-verification" }),
  AFWI: K("תנועות סחורה שנרשמו בעקבות אישור.", "מקשרת אישור ביצוע לתנועות מלאי שנוצרו (Backflush).", "באבחון תנועות שנובעות מאישורי PM/PP.", { importance: "supporting" }),
  T003O: K("קונפיגורציה — סוגי פקודה (Order Types).", "מגדירה סוגי פקודות אחזקה/ייצור והתנהגותן (טווחי מספרים, התחשבנות).", "ב-Customizing של פקודות.", { importance: "advanced" }),
  TJ02T: K("טקסטים לסטטוס מערכת (System status).", "תיאורי סטטוסי המערכת (REL/TECO/CLSD).", "בכל תצוגת סטטוס אובייקט.", { importance: "advanced" }),
  TJ30T: K("טקסטים לסטטוס משתמש.", "תיאורי סטטוסי המשתמש בפרופיל הסטטוס.", "בתצוגת סטטוס משתמש.", { importance: "advanced" }),
  TJ30: K("סטטוס משתמש (User status) בפרופיל.", "ערכי סטטוס המשתמש המוגדרים בפרופיל סטטוס לאובייקט.", "בקרת תהליך מותאמת (חסימת פעולות).", { importance: "advanced" }),
  EBAN: K("דרישת רכש (Purchase Requisition).", "בקשה לרכש חומר/שירות — נוצרת ידנית, מ-MRP או מצו אחזקה (חומר לא-מלאי).", "בצו אחזקה הדורש רכש חיצוני; ב-MRP.", { importance: "supporting", step: "רכש · דרישה", s4: "נשמר; aATP/MRP Live משפיעים על יצירה." }),
  EBKN: K("ייחוס חשבונאי לדרישת רכש.", "מגדירה לאן נזקף החיוב (מרכז עלות/פקודה) של פריט הדרישה.", "בדרישת רכש לצו אחזקה.", { importance: "advanced" }),
  MSEG: K("פריטי מסמך חומר (תנועות מלאי).", "כל תנועת מלאי (קבלה/הוצאה/העברה) — צריכת חלפים לצו, Backflush, GR.", "בכל הוצאת חומר לצו אחזקה (261) או קבלה.", { importance: "core", step: "מלאי · תנועה", s4: "הוחלף ב-MATDOC; קוד Z הקורא ישירות דורש בדיקה (compat views)." }),
  MKPF: K("כותרת מסמך חומר.", "כותרת תנועת המלאי (תאריך, סוג, משתמש) מעל פריטי MSEG.", "בכל מסמך תנועת מלאי.", { importance: "supporting", s4: "אוחד ל-MATDOC (Compatibility View)." }),
  BUT000: K("נתוני אב של שותף עסקי (Business Partner).", "ישות ה-BP המרכזית — ב-S/4 נקודת הכניסה היחידה ללקוח/ספק/קבלן אחזקה.", "בעבודה עם קבלני אחזקה חיצוניים, לקוחות, ספקים.", { importance: "supporting", s4: "BP חובה ב-S/4 (CVI מסנכרן ל-KNA1/LFA1)." }),
  COSP: K("עלויות CO — רישומים ראשוניים (External).", "עלויות בפועל ראשוניות לפי אובייקט CO (פקודה/מרכז עלות).", "בניתוח עלות צו אחזקה/ייצור.", { importance: "advanced", s4: "הדיווח עובר ל-ACDOCA (Universal Journal)." }),
  COSS: K("עלויות CO — רישומים משניים (Internal).", "עלויות פנימיות (פעילויות, חלוקות) לפי אובייקט CO.", "בהתחשבנות וניתוח עלות.", { importance: "advanced", s4: "הוחלף בדיווח מ-ACDOCA." }),
  COBRA: K("כלל התחשבנות — כותרת (Settlement Rule header).", "מגדיר שהפקודה ניתנת להתחשבנות ואת פרמטרי הברירת-מחדל.", "בהתחשבנות צו (KO88/CO88).", { importance: "supporting" }),
  COBRB: K("כלל התחשבנות — חלוקה (Distribution rules).", "מגדיר ליעדים ואחוזים שאליהם מתחשבנת עלות הפקודה.", "בהגדרת Settlement Rule לצו.", { importance: "supporting", step: "התחשבנות · כלל" }),
  MPLA: K("תוכנית אחזקה (Maintenance Plan).", "מגדירה אחזקה מונעת מחזורית — מתי לתחזק (זמן/מונה) ומה.", "בהקמת אחזקה מונעת (IP01) ותזמון (IP10).", { importance: "core", step: "אחזקה מונעת · תוכנית" }),
  MPOS: K("פריט תוכנית אחזקה (Maintenance Item).", "מה מתוחזק בתוכנית — אובייקט, רשימת פעולות, סוג צו.", "בהגדרת תוכן תוכנית האחזקה.", { importance: "supporting" }),
  MHIO: K("אובייקט קריאת אחזקה (Maintenance call object).", "הקריאות שנוצרות מתוכנית האחזקה — הפקודה/הודעה שנפתחת במועד.", "בריצת תזמון (IP10) שמייצרת פקודות.", { importance: "supporting" }),
  MHIS: K("היסטוריית תזמון תוכנית אחזקה.", "תיעוד הקריאות שבוצעו/נדחו לאורך חיי התוכנית.", "באבחון 'למה לא נוצרה פקודה' ובניתוח מחזוריות.", { importance: "advanced" }),
  ADMI_RUN: K("ריצת ניהול ארכוב (Archiving Run).", "מתעדת ריצות ארכוב נתונים (SARA) — מה אורכב ומתי.", "בניהול נפח נתונים והעברה ל-S/4.", { importance: "advanced", s4: "ארכוב חשוב לפני המרה (הקטנת DB)." }),
};
