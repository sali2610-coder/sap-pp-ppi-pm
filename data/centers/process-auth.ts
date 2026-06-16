import type { CenterItem } from "@/components/topic-center";

const A = "#dc2626";
const mk = (slug: string, module: string, he: string, title: string, sub: string, objects: string[], failures: string[], path: string[], qa: string[]): CenterItem => ({
  slug, module, eyebrow: `Authorization · ${module}`, he, title, sub, accent: A, tag: module,
  sections: [
    { title: "אובייקטי הרשאה", type: "chips", tone: "#7c3aed", items: objects },
    { title: "כשלי הרשאה נפוצים", type: "bullets", tone: "#dc2626", items: failures },
    { title: "נתיב אבחון (SU53→PFCG)", type: "steps", tone: A, items: path },
    { title: "כלי אבחון", type: "linkchips", tone: "#475569", items: ["SU01", "PFCG", "SU53", "SUIM", "ST01", "STAUTHTRACE", "SU24"] },
    { title: "QA Validation", type: "bullets", tone: "#be185d", items: qa },
  ],
  eccS4: { unchanged: "מודל ההרשאות (אובייקטים/AUTHORITY-CHECK) זהה.", changed: "מתווספים Business Catalogs + S_SERVICE ל-Fiori/OData.", fiori: "Maintain Business Roles", migration: "QA: הרץ SU25 (אובייקטים חדשים) + ודא Catalogs ל-Fiori." } });

export const PROCESS_AUTH: CenterItem[] = [
  mk("pm-order-auth", "PM", "הרשאות הזמנת אחזקה", "PM Order Authorizations", "אובייקטי הרשאה ואבחון כשלים בתהליך פקודת אחזקה.",
    ["I_AUART (סוג הזמנה)", "I_SWERK (מפעל אחזקה)", "I_INGRP (קבוצת תכנון)", "I_BETRVORG (פעולה עסקית)", "S_TCODE (IW31/IW32)"],
    ["'אין הרשאה' ב-IW31 → I_AUART/I_SWERK חסר", "לא ניתן לשחרר → I_BETRVORG (פעולת שחרור)", "מפעל לא מורשה → I_SWERK (Org level)"],
    ["בקש מהמשתמש להריץ SU53 מיד אחרי הכשל", "זהה אובייקט+ערך חסר (I_SWERK=מפעל?)", "STAUTHTRACE לתרחיש רב-שלבי", "הוסף ערך ב-PFCG (Org level) + User Comparison"],
    ["Validation: טכנאי מוגבל למפעל אחזקה שלו (I_SWERK)", "Negative: סוג פקודה לא מורשה → חסום", "Positive: מחזור פקודה מלא עם הרשאות תקינות"]),
  mk("pm-notif-auth", "PM", "הרשאות הודעות אחזקה", "PM Notification Authorizations", "אובייקטי הרשאה לתהליך הודעות אחזקה.",
    ["I_QMEL (הודעה לפי סוג)", "I_SWERK (מפעל)", "I_BEGRP (קבוצת מורשים)", "S_TCODE (IW21-28)"],
    ["יצירת הודעה חסומה → I_QMEL (QMART)", "סוג הודעה לא מורשה", "מפעל חסר → I_SWERK"],
    ["SU53 אחרי הכשל", "זהה I_QMEL + ערך QMART", "PFCG → הוסף סוג הודעה", "User Comparison"],
    ["Validation: גישה לסוגי הודעה מורשים בלבד", "Negative: סוג M3 לא מורשה → חסום"]),
  mk("pppi-procord-auth", "PP-PI", "הרשאות פקודת תהליך", "Process Order Authorizations", "אובייקטי הרשאה לתהליך פקודת תהליך.",
    ["C_AFKO_ATY (סוג פקודת תהליך)", "C_AFKO_AWK (מפעל ייצור)", "C_AFKO_DIS (קבוצת מתכנן)", "S_TCODE (COR1-COR6N)"],
    ["יצירת COR1 חסומה → C_AFKO_ATY", "שחרור חסום → פעולה עסקית", "מפעל לא מורשה → C_AFKO_AWK"],
    ["SU53 אחרי הכשל", "זהה C_AFKO_ATY/AWK + ערך", "PFCG → הוסף סוג+מפעל", "User Comparison + בדיקת SU24"],
    ["Validation: מתכנן מוגבל למפעל/סוג", "Negative: סוג פקודה לא מורשה → חסום", "Integration: אישור (COR6N) דורש הרשאת אישור"]),
  mk("pp-prodord-auth", "PP", "הרשאות פקודת ייצור", "Production Order Authorizations", "אובייקטי הרשאה לתהליך פקודת ייצור בדיד.",
    ["C_AFKO_AWK (מפעל)", "C_AFKO_ATY (סוג פקודה)", "C_AFRU (אישור)", "S_TCODE (CO01-CO15)"],
    ["יצירה חסומה → C_AFKO_AWK/ATY", "אישור חסום → C_AFRU", "מפעל לא מורשה"],
    ["SU53", "זהה אובייקט+ערך", "PFCG + Org level", "User Comparison"],
    ["Validation: גישה לפי מפעל ייצור", "Negative: אישור ללא C_AFRU → חסום"]),
  mk("mrp-auth", "PP", "הרשאות MRP", "MRP Authorizations", "אובייקטי הרשאה להרצת ולתצוגת MRP.",
    ["M_MTDI (MRP run/scope)", "C_DRAW (אם רלוונטי)", "S_TCODE (MD01N/MD04)"],
    ["MD01N חסום → M_MTDI", "תצוגת MD04 חסומה → הרשאת מפעל/חומר"],
    ["SU53 אחרי הכשל", "זהה M_MTDI + scope", "PFCG → הוסף הרשאה", "User Comparison"],
    ["Validation: מתכנן מריץ MRP למפעל שלו", "Positive: MD04 נגיש למתכנן"]),
  mk("settlement-auth", "Cross", "הרשאות התחשבנות", "Settlement Authorizations", "אובייקטי הרשאה להתחשבנות פקודות (CO).",
    ["K_ORD_K_CCA (התחשבנות)", "K_VRGNG (פעולת CO)", "S_TCODE (KO88/CO88)"],
    ["KO88 חסום → K_ORD_K_CCA", "פעולת CO לא מורשית → K_VRGNG", "תקופה סגורה (לא הרשאה)"],
    ["SU53 אחרי הכשל", "זהה אובייקט CO", "PFCG → הוסף", "ודא הבחנה בין הרשאה לתקופה סגורה"],
    ["Validation: בקר עלויות מתחשבן", "Negative: ללא K_VRGNG → חסום"]),
];
