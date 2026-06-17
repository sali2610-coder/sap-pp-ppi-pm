import type { CenterItem } from "@/components/topic-center";

const A = "#7c3aed";
const mk = (slug: string, code: string, he: string, purpose: string, examples: string[], debug: string[], tables: string[], objects: string[], ecc: { unchanged?: string; changed?: string; fiori?: string; migration?: string }): CenterItem => ({
  slug, module: "ABAP", eyebrow: `ABAP Developer Center · ${code}`, he: `${code} · ${he}`, title: code, sub: purpose, accent: A, tag: "ABAP",
  sections: [
    { title: "מטרה", type: "text", tone: A, text: purpose },
    { title: "דוגמאות שימוש", type: "bullets", tone: "#0d9488", items: examples },
    { title: "שימוש ב-Debug", type: "bullets", tone: "#be185d", items: debug },
    { title: "טבלאות קשורות", type: "linkchips", tone: "#0891b2", items: tables },
    { title: "אובייקטים/כלים קשורים", type: "chips", tone: A, items: objects },
  ],
  eccS4: { ...ecc },
});

export const ABAP_TOOLS: CenterItem[] = [
  mk("se80", "SE80", "Object Navigator", "ניווט מאוחד במאגר הפיתוח — תוכניות, מחלקות, FMs, חבילות, Dictionary.", ["ניווט בחבילת פיתוח (Z*)", "עריכת תוכנית/מחלקה/FM ממקום אחד", "Where-used list לאובייקט"], ["הגדרת breakpoints; ניווט ל-include/method", "צפייה ב-call hierarchy"], ["TADIR", "TRDIR"], ["SE24", "SE37", "SE11", "ADT (Eclipse)"], { unchanged: "קיים.", changed: "ב-S/4 פיתוח מודרני ב-ADT (Eclipse); SE80 לתחזוקה.", migration: "QA: גישה לאובייקטים אחרי המרה." }),
  mk("se38", "SE38", "ABAP Editor", "עריכה/הרצה של תוכניות (Reports) ו-includes.", ["הרצת report עם variant", "עריכת תוכנית Z", "בדיקת תחביר (Ctrl+F2)"], ["/h להפעלת debugger לפני הרצה", "breakpoint בשורה; watchpoint על משתנה"], ["TRDIR", "D010S"], ["SE80", "SE93 (קישור tcode)", "SAT"], { unchanged: "קיים.", changed: "ADT מועדף ב-S/4; Clean ABAP.", migration: "QA: הרצת reports קריטיים." }),
  mk("se37", "SE37", "Function Builder", "פיתוח/בדיקה של Function Modules (כולל RFC).", ["בדיקת FM ב-Test/Execute (F8)", "צפייה בפרמטרים Import/Export/Tables", "Where-used ל-FM"], ["breakpoint בתוך FM; Test sequence", "debug RFC עם external breakpoint"], ["TFDIR", "FUPARAREF"], ["SE80", "SE24", "BAPI Explorer"], { unchanged: "קיים.", changed: "לפיתוח חדש העדף מחלקות/RAP.", migration: "QA: בדיקת FMs/RFC." }),
  mk("se24", "SE24", "Class Builder", "פיתוח מחלקות ABAP OO (Local/Global).", ["יצירת מחלקה גלובלית", "מימוש interface (IF_*)", "בדיקת method"], ["breakpoint במתודה; debug instance attributes"], ["SEOCLASS", "SEOMETAREL"], ["SE80", "SE18/SE19 (BAdI)", "RAP"], { unchanged: "קיים.", changed: "מרכזי ב-RAP/Clean Core.", migration: "QA: מחלקות/BAdIs." }),
  mk("se11", "SE11", "ABAP Dictionary", "הגדרת טבלאות, מבנים, Views, Data Elements, Domains, אינדקסים.", ["בדיקת מבנה טבלה+מפתחות", "יצירת secondary index", "Append/Include structure"], ["צפייה בהגדרת שדה→Data Element→Domain", "ניתוח אינדקס לביצועים"], ["DD02L", "DD03L", "DD04L", "DD01L"], ["SE14 (DB utility)", "SE16N", "CDS (ADT)"], { unchanged: "DDIC קיים.", changed: "CDS הוא מודל הקריאה ב-S/4.", migration: "QA: מבני טבלאות + אורך MATNR 40." }),
  mk("se84", "SE84", "Repository Info System", "חיפוש אובייקטי מאגר לפי סוג/חבילה/שם — מפת פיתוח.", ["מציאת כל ה-FMs בחבילה", "חיפוש טבלאות לפי קריטריון", "where-used מרוכז"], ["איתור אובייקט לפני debug"], ["TADIR"], ["SE80", "SE16N", "SCI"], { unchanged: "קיים.", migration: "QA: מצאי אובייקטי Z." }),
  mk("sat", "SAT", "Runtime Analysis", "ניתוח ביצועי ABAP — זמן ריצה לפי שיטה/SQL (מחליף SE30).", ["מדידת זמן ריצה של report/tcode", "זיהוי שיטות יקרות", "hit list לפי gross/net"], ["שילוב עם debug לזיהוי צוואר בקבוק"], ["—"], ["ST05", "ST12", "SE30 (legacy)"], { unchanged: "קיים.", changed: "על HANA — דגש ב-SQL push-down.", migration: "QA: ביצועי תוכניות קריטיות." }),
  mk("st05", "ST05", "Performance Trace (SQL)", "מעקב SQL/RFC/Enqueue — איתור שאילתות יקרות.", ["SQL trace ל-tcode איטי", "Explain plan לשאילתה", "זיהוי full table scan / חסר אינדקס"], ["activate trace → run → display → analyze SQL"], ["—"], ["SAT", "ST12", "DB02", "SE11 (index)"], { unchanged: "קיים.", changed: "על HANA — מדדי push-down שונים.", migration: "QA: SQL trace לדוחות כבדים." }),
  mk("st12", "ST12", "Single Transaction Trace", "טרייס משולב (ABAP+SQL) לטרנזקציה/משתמש — אבחון ביצועים מעמיק.", ["טרייס לתהליך עסקי שלם", "שילוב ABAP time + SQL time"], ["מצוין לאבחון תקלות ביצועים בפרודקשן (Solution Manager)"], ["—"], ["SAT", "ST05", "SWLT"], { unchanged: "קיים (חלק מ-ST-A/PI).", migration: "QA: אבחון ביצועים מקצה-לקצה." }),
  mk("sci", "SCI", "Code Inspector", "בדיקות קוד סטטיות — תקן, ביצועים, אבטחה, מוכנות S/4.", ["הרצת check variant על חבילה", "זיהוי SELECT *, MSEG ישיר, deprecated", "Security checks"], ["—"], ["—"], ["ATC", "SE80", "S/4 readiness checks"], { unchanged: "קיים.", changed: "ATC הוא העטיפה המודרנית; Simplification DB checks ל-S/4.", migration: "QA: הרץ ATC/SCI ל-custom code לפני המרה." }),
  mk("atc", "ATC", "ABAP Test Cockpit", "מסגרת בדיקות איכות קוד (עוטף Code Inspector) — תקן, S/4 readiness, אבטחה.", ["ATC run על חבילה/transport", "Remediation של findings (priority 1-3)", "S/4 HANA readiness check variant"], ["—"], ["—"], ["SCI", "ADT", "Simplification Database"], { unchanged: "ATC קיים.", changed: "מרכזי במיגרציה — Custom Code Migration ב-ADT/Fiori.", fiori: "Custom Code Migration", migration: "QA: ATC findings לפני המרה (MSEG/MATNR/deprecated)." }),
];
