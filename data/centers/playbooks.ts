import type { CenterItem } from "@/components/topic-center";

const A = "#7c2d12";
const mk = (slug: string, module: string, he: string, title: string, sub: string, goal: string, config: string[], master: string[], testing: string[], risks: string[], ecc: { unchanged?: string; changed?: string; fiori?: string; migration?: string }): CenterItem => ({
  slug, module, eyebrow: `Implementation Playbook · ${module}`, he, title, sub, accent: A, tag: module,
  sections: [
    { title: "מטרה עסקית", type: "text", tone: A, text: goal },
    { title: "קונפיגורציה (SPRO)", type: "steps", tone: "#0d9488", items: config },
    { title: "נתוני אב", type: "bullets", tone: "#0891b2", items: master },
    { title: "בדיקות (Testing)", type: "bullets", tone: "#be185d", items: testing },
    { title: "סיכוני Go-Live", type: "bullets", tone: "#dc2626", items: risks },
  ],
  eccS4: { ...ecc },
});

export const PLAYBOOKS: CenterItem[] = [
  mk("batch-management", "PP-PI", "יישום ניהול אצוות", "Batch Management Implementation", "Playbook להטמעת ניהול אצוות עם מעקב ו-FEFO.",
    "מעקב מלא (Traceability) אחר מנות ייצור, קביעת אצווה אוטומטית (FEFO), חסימת QM ויכולת Recall — קריטי למזון/משקאות.",
    ["קבע רמת אצווה (לקוח/מפעל/חומר) — החלטה ארכיטקטונית מוקדמת (T130*)", "הגדר פרופיל מספור אצווה (אוטומטי)", "הגדר מחלקת אצווה 023 + מאפיינים (SLED/יצרן)", "הגדר אסטרטגיית קביעה + מיון FEFO (CU70)", "הפעל Batch Where-Used (CHVW) למעקב"],
    ["סימון 'ניהול אצוות' באב חומר (MM02)", "מחלקת אצווה + מאפייני אצווה (CT04)", "תאריך ייצור/תפוגה (SLED) לכל אצווה"],
    ["Positive: GR יוצר אצווה עם SLED", "Integration: קביעת FEFO בצריכה/מכירה", "Negative: מאפיין חובה ריק → חסימה", "Regression: Where-Used (MB56) ל-Recall"],
    ["רמת אצווה שגויה — קשה מאוד לשינוי אחרי נתונים", "פרופיל מספור לא הוגדר → אצוות לא נוצרות", "Batch Where-Used לא הופעל → אין מעקב Recall"],
    { unchanged: "מודל אצווה זהה.", changed: "Fiori 'Manage Batches' + BIC.", fiori: "Manage Batches / Batch Information Cockpit", migration: "QA: רמת אצווה + מספור + FEFO + Where-Used." }),
  mk("qm-inspection", "QM", "יישום בדיקת איכות", "QM Inspection Implementation", "Playbook להטמעת בדיקות איכות ב-GR ובייצור.",
    "אבטחת איכות — מנת בדיקה אוטומטית, רישום תוצאות מול מפרט, החלטת שימוש וחסימת מלאי פסול.",
    ["הפעל סוגי בדיקה (01 GR / 04 ייצור) ב-QM-View", "הגדר Inspection setup לחומר/מפעל", "צור תכניות בדיקה + מאפיינים (QP01/PLMK)", "הגדר Sampling procedures (QDV1)", "הגדר Catalogs לקודי פגם (QS41) + follow-up ב-UD"],
    ["QM-View באב חומר + סוגי בדיקה", "תכנית בדיקה עם מאפיינים ומפרט (CABN limits)", "Certificate profile (אם נדרש COA)"],
    ["Positive: GR יוצר lot; תוצאות→UD תקין", "Negative: תוצאה מחוץ ל-spec → דחייה + חסימת אצווה", "Integration: UD משחרר/חוסם מלאי", "Boundary: ערכים בגבול ה-spec"],
    ["סוג בדיקה לא פעיל → אין lot", "מאפייני בדיקה חסרים → UD תקוע", "follow-up actions לא מוגדרים → אצוות פסולות זמינות"],
    { unchanged: "אינטגרציית QM-IM זהה.", changed: "Fiori לרישום תוצאות.", fiori: "Record Inspection Results", migration: "QA: lot→תוצאות→UD→מלאי." }),
  mk("pm-preventive", "PM", "יישום אחזקה מונעת", "PM Preventive Maintenance Implementation", "Playbook להטמעת אחזקה מונעת מתוזמנת.",
    "הפחתת תקלות ע\"י אחזקה מתוזמנת מבוססת-זמן/ביצועים — תכניות, אסטרטגיות וניטור מועדים אוטומטי.",
    ["הגדר אסטרטגיות אחזקה + חבילות מחזור (IP11)", "הגדר סוגי פקודה+הודעה (OIOA)", "צור רשימות פעולות (IA05) + מרכזי עבודה (IR01)", "הגדר נקודות מדידה למבוסס-ביצועים (IK01)", "תזמן Job IP30 יומי לניטור מועדים"],
    ["אובייקטים טכניים (ציוד/מיקום) + ILOA", "תכניות אחזקה + פריטים (MPLA/MPOS)", "רשימות פעולות + נקודות מדידה"],
    ["Positive: תזמון (IP10)→IP30→פקודה במועד", "Integration: קריאת מונה (IK11) מתזמנת תכנית", "Regression: IP30 חוזר לא מכפיל קריאות", "Negative: ללא נקודת התחלה → אין תזמון"],
    ["Job IP30 לא מתוזמן → פקודות לא נוצרות", "אופק קריאה קצר → אחזקה מאוחרת", "מבוסס-ביצועים ללא קריאות מונה רציפות"],
    { unchanged: "מודל תכנון/תזמון זהה.", changed: "לוח תזמון גרפי ב-Fiori.", fiori: "Schedule Maintenance Plans", migration: "QA: תזמון + IP30 → פקודות." }),
  mk("pp-production-version", "PP-PI", "יישום גרסאות ייצור", "PP-PI Production Version Implementation", "Playbook להטמעת גרסאות ייצור — חובה ב-S/4.",
    "קישור BOM + מתכון/מסלול לשילוב ייצור תקף; חובה ב-S/4 ל-MRP Live ו-PP-DS.",
    ["ודא BOM + מתכון/מסלול תקפים", "צור גרסאות ייצור (C223) עם תוקף+טווח כמות", "הגדר Selection method (אוטומטית)", "הרץ בדיקת עקביות מרוכזת (mass consistency check)", "ודא כיסוי לכל חומר מיוצר"],
    ["BOM פעיל (שימוש 1)", "מתכון/מסלול עם מפתחי בקרה", "גרסת ייצור (MKAL) תקפה"],
    ["Positive: גרסה תקפה → MRP Live + יצירת פקודה", "Negative: ללא גרסה ב-S/4 → MRP/פקודה נכשלים", "Integration: בחירה לפי lot size/תאריך", "Regression: שינוי תוקף משפיע על בחירה"],
    ["חוסר גרסת ייצור לחומר → משבית תכנון/ייצור ב-S/4", "טווחי כמות חופפים → בחירה שגויה", "BOM/מתכון לא תקפים לתאריך"],
    { unchanged: "מודל MKAL זהה.", changed: "גרסה חובה ב-S/4 (MRP Live/PP-DS).", fiori: "Manage Production Versions", migration: "QA: גרסה תקפה לכל חומר — קריטי." }),
];
