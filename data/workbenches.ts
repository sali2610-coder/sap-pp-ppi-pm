// Consultant Workbenches — Debugging / QM / PM-Advanced / PP-PI-Advanced.
// Each workbench = 12 sections (concepts, architecture, process flow, tables,
// transactions, FMs, BAdIs, user exits, common incidents, debug entry points,
// ECC vs S/4, CBC examples). Authored + agent-reviewed; uncertain SAP objects
// carry a "verify SE.." hedge per the sap-ecc-troubleshooter no-invention rule.

export interface WbConcept { term: string; he: string; desc: string }
export interface WbItem { name: string; tag?: string; desc: string } // FM / BAdI / exit
export interface WbTable { name: string; desc: string }
export interface WbFlow { step: string; detail: string }
export interface WbDelta { ecc: string; s4: string }

export interface Workbench {
  slug: string;
  module: "Debugging" | "QM" | "PM" | "PP-PI";
  he: string;
  title: string;
  accent: string;
  intro: string;
  concepts: WbConcept[];
  architecture: string[];
  processFlow: WbFlow[];
  tables: WbTable[];
  transactions: string[];
  functionModules: WbItem[];
  badis: WbItem[];
  userExits: WbItem[];
  incidents: string[]; // slugs in troubleshooting
  debugEntry: string[];
  eccS4: WbDelta[];
  cbc: string[];
}

const DEBUGGING: Workbench = {
  slug: "debugging",
  module: "Debugging",
  he: "מרכז Debugging — שולחן עבודה",
  title: "ABAP Debugging Workbench",
  accent: "#be185d",
  intro: "שולחן עבודה לאבחון תקלות ABAP/SAP לפי סולם דרגות (Tier 0–4): מהראיות הזולות (לוגים/מוניטורים) אל ה-debugger. הכלל: לעולם לא breakpoint לפני שמיצינו monitor/log. רוב התקלות נסגרות ב-T0–T1.",
  concepts: [
    { term: "Tier ladder (T0–T4)", he: "סולם דרגות אבחון", desc: "T0 קריאה בלבד (SM13/ST22/SM12/SE91) → T1 מוניטורים (SMQ2/SM58/WE02) → T2 trace (ST05/SAT/STAUTHTRACE) → T3 foreground debug (/h, external breakpoint) → T4 update/background debug (JDBG, update debug)." },
    { term: "ORIGIN / BLOCKER / SYMPTOM", he: "שורש / חוסם / תסמין", desc: "ORIGIN = איפה התקלה נולדה (לתקן ראשון); BLOCKER = איפה היא נתקעת ומעכבת אחרים (ראש תור EOIO, נעילה יתומה, update termination); SYMPTOM = איפה המשתמש רואה. סדר תיקון: ORIGIN → BLOCKER → SYMPTOM." },
    { term: "Breakpoint types", he: "סוגי נקודות עצירה", desc: "Session breakpoint (מקומי, נמחק בסיום), External breakpoint (לפי משתמש, תופס דיאלוג/RFC/HTTP), Watchpoint (עוצר על שינוי משתנה), Static (BREAK-POINT/assert בקוד)." },
    { term: "SAP LUW & update task", he: "יחידת עבודה לוגית", desc: "COMMIT WORK פותח update task (V1 סינכרוני-מבחינת-נתונים, V2 אסינכרוני). כשל ב-update = ה-dialog 'הצליח' אך אין מסמך. תמיד SM13 לפני ניסיון חוזר." },
    { term: "Short dump (ST22)", he: "דאמפ זמן-ריצה", desc: "ABAP runtime error נשמר ב-ST22 (טבלת SNAP). כולל סוג החריגה, מקור, call stack ומשתנים — נקודת הפתיחה לכל קריסה." },
  ],
  architecture: [
    "Work process: Dialog (DIA) לעיבוד אינטראקטיבי, Update (UPD/UP2) ל-V1/V2, Background (BTC), Enqueue (ENQ) לנעילות, Spool (SPO).",
    "Dialog ↔ Update הפרדה: ה-dialog רושם ל-VBHDR/VBMOD ומשחרר; ה-update process מבצע בפועל — לכן כשל update לא נראה למשתמש.",
    "New ABAP Debugger (דו-מסכי, החליף את הקלאסי): tools customizable, יכולת לדבג גם RFC/update/background מאותו session.",
    "Trace layers: ST05 (SQL/RFC/Enqueue/HTTP), SAT (runtime/ABAP profiling, מחליף SE30), STAUTHTRACE (הרשאות).",
  ],
  processFlow: [
    { step: "T0 · Read-only", detail: "SM13 (update termination), ST22 (dump), SM12 (locks), SE91 (טקסט הודעה ארוך). שניות. רוב התקלות נסגרות כאן." },
    { step: "T1 · Monitors", detail: "SMQ2/SM58 (תורים/LUW), WE02 (IDoc), SM21 (system log), SLG1 (application log). ללא debug." },
    { step: "T2 · Trace", detail: "ST05 (SQL/RFC/enqueue trace), SAT (runtime analysis), STAUTHTRACE (auth). ללא breakpoint." },
    { step: "T3 · Foreground debug", detail: "/h בדיאלוג, external breakpoint לפי משתמש על FM/method, watchpoint על משתנה. רק אחרי ש-T2 לא נתן שורש." },
    { step: "T4 · Update / Background", detail: "JDBG מ-SM37 לג'וב רקע, update debug (Settings → update debugging), LUW debug ב-SM58 (admin בלבד). מסוכן ב-PRD." },
  ],
  tables: [
    { name: "SNAP", desc: "אחסון short dumps (ST22). קריאה דרך ST22, לא ישירות." },
    { name: "VBHDR", desc: "כותרת update requests (SAP LUW) — ה-update task הפתוח/שנכשל." },
    { name: "VBMOD", desc: "מודולי update לכל LUW — אילו FMs נקראו ב-update." },
    { name: "ARFCSSTATE", desc: "מצב קריאות tRFC/qRFC — LUWs ב-SYSFAIL (SM58)." },
    { name: "BALHDR / BALDAT", desc: "Application log (SLG1) — כותרת ופרטי הלוג." },
    { name: "EDIDS", desc: "היסטוריית סטטוס IDoc — טקסט שגיאה לכל שלב." },
    { name: "T100", desc: "טקסטי הודעות (message class + number) — בסיס ל-SE91." },
  ],
  transactions: ["ST22", "SM13", "SM12", "SM21", "ST05", "SAT", "/h", "SE91", "SE93", "SE37", "SE24", "SE80", "JDBG", "STAUTHTRACE", "SM50", "SM66", "SM37", "SM58", "SMQ2", "SLG1"],
  functionModules: [
    { name: "RS_HALT", tag: "READ-ONLY", desc: "עצירת ריצה לדיבוג מתוך תוכנית — לשימוש זהיר; אמת חתימה ב-SE37." },
  ],
  badis: [
    { name: "BADI_DEBUGGER", tag: "verify SE18", desc: "אמת קיום והיקף ב-SE18; debugging עצמו כמעט ולא מורחב — חפש ב-SE18 לפי תרחיש." },
  ],
  userExits: [
    { name: "—", desc: "ל-debugging אין user-exits ייעודיים; ה-exits הרלוונטיים שייכים למודול שבו התקלה (PP/PM/QM)." },
  ],
  incidents: ["update-termination-sm13", "trfc-sm58-luw-sysfail", "lock-entry-orphan-sm12-blocks-posting", "idoc-51", "qrfc-smq1-outbound-blocked"],
  debugEntry: [
    "Dialog: הקלד /h לפני הפעולה → external/session breakpoint על ה-FM/method החשוד.",
    "Update: SM13 → הצג את ה-LUW שנכשל; להמשך — Settings → Update Debugging ואז שחזר.",
    "Background: לעולם לא /h; JDBG מ-SM37 על הג'וב.",
    "Watchpoint: עצור על שינוי שדה (למשל סטטוס/כמות) במקום לפסוע ידנית.",
    "ST05: הפעל SQL/RFC trace, שחזר, כבה — נתח את הקריאה ללא breakpoint.",
  ],
  eccS4: [
    { ecc: "New ABAP Debugger ב-SAP GUI; ST22/SM13/ST05 זהים.", s4: "אותם כלים; בנוסף debugging ב-ADT/Eclipse לאובייקטי ABAP מודרניים (CDS/RAP)." },
    { ecc: "דיבוג קלאסי על דוחות/dynpro.", s4: "דיבוג גם על OData/RAP handlers; CDS view debugging דרך ADT." },
  ],
  cbc: [
    "אישור מילוי 'הצליח' אך חסר מסמך חומר — SM13 חשף update V2 שנכשל על GBB-VBR; תוקן OBYC וה-update חזר.",
    "קריאת tRFC שמעדכנת מלאי תרכיז במתכנן תקועה ב-SM58 (SYSFAIL) — ST22 ביעד הצביע על דאמפ; תוקן ובוצע Execute LUW.",
    "רישום תנועת תרכיז נחסם ב'נעול ע\"י משתמש' — SM12 הראה נעילה יתומה לאחר דאמפ; נמחקה אחרי אימות ב-SM04.",
  ],
};

import { WORKBENCHES_EXT } from "./workbenches-ext";

export const WORKBENCHES: Workbench[] = [DEBUGGING, ...WORKBENCHES_EXT];

export const workbenchBySlug = (s: string) => WORKBENCHES.find((w) => w.slug === s);
