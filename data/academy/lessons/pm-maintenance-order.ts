import type { Lesson } from "@/lib/academy/lesson-types";

// Pilot lesson (P2). Authored from standard, documented SAP PM knowledge. Technical
// blocks reference real, verified objects (BAPI_ALM_ORDER_MAINTAIN is verified-docs in
// the BAPI registry; AUFK/AFIH/AFVC/RESB, IW31/32/38, Fiori F2018 are standard). Prose
// is "curated". Nothing invented — no fabricated SAP Notes.
const LV = "2026-07-15";
const HELP = "SAP Help Portal — Plant Maintenance (S/4HANA)";

export const PM_MAINTENANCE_ORDER: Lesson = {
  slug: "pm-maintenance-order",
  module: "PM",
  track: "אחזקת מפעל · PM",
  course: "פקודות אחזקה",
  chapter: "ביצוע אחזקה",
  index: 3,
  title: "פקודת אחזקה — Maintenance Order",
  titleEn: "Maintenance Order",
  level: "בינוני",
  minutes: 14,
  trust: "verified-docs",
  source: HELP,
  lastReviewed: LV,
  // prev/next wired when neighbour lessons are authored (pilot = single lesson)
  blocks: [
    { kind: "objective", trust: "curated", md: "פקודת אחזקה היא מסמך הביצוע המרכזי ב-PM: היא מתכננת עבודה, רכיבים ועלויות, מבצעת אותם ומדווחת חזרה. בסוף השיעור תדע לפתוח פקודה, לשחרר, לדווח ולסגור (TECO)." },
    { kind: "why", trust: "curated", md: "כל תקלה או אחזקה מונעת הופכת לפקודה. הפקודה מקשרת בין ההודעה, המלאי (רכיבים), ה-CO (עלויות) וה-HR (שעות). ללא הבנת מחזור החיים שלה — דיווחים נתקעים ב-COGI והעלויות אינן נכונות." },
    { kind: "business-value", trust: "curated", md: "שליטה בפקודת האחזקה = שקיפות עלויות תחזוקה, תכנון משאבים נכון, וסגירת תקופות חלקה. זהו הבסיס למדדי אחזקה (MTTR, זמינות) ולתחזוקה מבוססת-מצב." },
    { kind: "where-used", trust: "curated", md: "אחזקת שבר (Breakdown), אחזקה מונעת (Preventive), אחזקה מבוססת-מצב, ופרויקטי שיפוץ. משמשת מתכננים, מבצעי אחזקה, ומנהלי אמינות." },
    { kind: "key-concepts", trust: "curated", items: [
      "סוג פקודה (Order Type, למשל PM01) — קובע התנהגות, טווח מספרים ומדיניות שחרור.",
      "אובייקט ייחוס — ציוד (EQUI) או מיקום פונקציונלי (IFLOT).",
      "פעולות (Operations) ומרכזי עבודה — מה מבוצע ועל-ידי מי.",
      "רכיבים (Components) — חלקי חילוף שנצרכים מהמלאי.",
      "סטטוסים: CRTD → REL → CNF → TECO → CLSD.",
    ] },
    { kind: "cbc-example", trust: "curated", md: "ב-CBC, תקלת מסוע במילוי בקבוקים נפתחת כהודעה M2, מומרת לפקודת PM01, משוחררת, מבצע האחזקה מדווח 3 שעות + חלק חילוף, והפקודה נסגרת TECO — הכל תוך משמרת." },
    { kind: "flow", trust: "verified-docs", source: HELP, lastReviewed: LV, steps: ["הודעה", "פקודה", "שחרור", "דיווח", "TECO"], activeIndex: 1 },
    { kind: "diagram", trust: "curated", md: "", caption: "הודעה → פקודה → פעולות/רכיבים → אישור → סילוק (TECO)" },
    { kind: "tables", trust: "verified-docs", source: HELP, lastReviewed: LV, rows: [
      { code: "AUFK", he: "כותרת פקודה (Order master data)", href: "/object/AUFK/" },
      { code: "AFIH", he: "כותרת אחזקה לפקודה", href: "/object/AFIH/" },
      { code: "AFVC", he: "פעולות הפקודה (Operations)", href: "/object/AFVC/" },
      { code: "RESB", he: "רכיבים / הזמנות מלאי", href: "/object/RESB/" },
    ] },
    { kind: "tcodes", trust: "verified-docs", source: HELP, lastReviewed: LV, refs: [
      { code: "IW31", label: "יצירת פקודה", href: "/tcode/IW31/" },
      { code: "IW32", label: "שינוי פקודה", href: "/tcode/IW32/" },
      { code: "IW38", label: "רשימת פקודות", href: "/tcode/IW38/" },
    ] },
    { kind: "fiori", trust: "verified-docs", source: "SAP Fiori Apps Library", lastReviewed: LV, refs: [
      { code: "F2018", label: "Manage Maintenance Orders", href: "/fiori-apps/" },
    ] },
    { kind: "spro", trust: "curated", md: "Plant Maintenance → Maintenance and Service Processing → Maintenance and Service Orders → **Functions and Settings for Order Types** — הגדרת סוג פקודה (PM01), טווח מספרים ופרופיל שחרור." },
    { kind: "objects", trust: "verified-docs", source: "SAP Help + BAPI registry", lastReviewed: LV, note: "נדרש BAPI_TRANSACTION_COMMIT לאחר קריאה מוצלחת.", refs: [
      { code: "BAPI_ALM_ORDER_MAINTAIN", label: "יצירה/שינוי פקודה", href: "/bapi/BAPI_ALM_ORDER_MAINTAIN/" },
      { code: "C_MaintenanceOrder", label: "CDS", href: "/cds/" },
    ] },
    { kind: "common-mistakes", trust: "curated", items: [
      "שחרור פקודה ללא מרכז עבודה תקף → שגיאת תזמון. ודא ARBPL לפני שחרור.",
      "שכחת TECO → הפקודה נשארת פתוחה ומעכבת סגירת תקופה.",
      "רכיב ללא מלאי זמין → דיווח נתקע ב-COGI (MF47).",
    ] },
    { kind: "tips", trust: "curated", items: [
      "השתמש בפרופיל שדות (IW32) כדי להסתיר שדות לא רלוונטיים למשתמשי שטח — מקצר הדרכה ומפחית שגיאות.",
      "הגדר פרופיל שחרור אוטומטי לסוגי פקודה נפוצים כדי לחסוך צעד ידני.",
    ] },
    { kind: "quiz", trust: "curated", items: [
      { question: "מהי הפעולה הסוגרת טכנית את פקודת האחזקה?", options: [{ text: "שחרור (REL)" }, { text: "TECO — Technical Completion", correct: true }, { text: "מחיקה" }], explain: "TECO סוגר טכנית את הפקודה ומאפשר סגירת עלויות; CLSD סוגר עסקית." },
    ] },
    { kind: "summary", trust: "verified-docs", source: HELP, lastReviewed: LV, md: "פקודת אחזקה = מסמך ביצוע PM. מחזור: הודעה → פקודה → שחרור → דיווח → TECO. טבלאות ליבה AUFK/AFIH/AFVC/RESB · T-Codes IW31/32/38 · Fiori F2018 · API BAPI_ALM_ORDER_MAINTAIN (נדרש COMMIT)." },
  ],
};

export const PILOT_LESSONS: Record<string, Lesson> = {
  [PM_MAINTENANCE_ORDER.slug]: PM_MAINTENANCE_ORDER,
};
