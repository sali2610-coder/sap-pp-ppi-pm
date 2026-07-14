// ============================================================================
// Phase 15.2 — PM (Plant Maintenance) BAPI/FM enrichment — VERIFIED content.
//
// Every fact below was verified against SAP Help (Business Object BUS2038,
// S/4HANA On-Premise) + SE37/BAPI-Explorer metadata mirrors (function group
// IWOPM, application component PM-WOC-MN, created release 4.6/110, RFC-enabled).
// Nothing is invented. S/4HANA *Public Cloud* whitelisting is NOT confirmed →
// cloudSupport:"unknown". Two names that our dataset carries but that do NOT
// exist as standard objects are flagged verificationStatus:"invalid-name".
//   Verified 2026-07-14 · confidence HIGH.
// ============================================================================

import type { SapFuncObject, TriState, VerificationStatus, OperationType, BusinessCategory } from "@/lib/bapi-registry";

const VSRC = "SAP Help (BUS2038 · S/4HANA On-Premise) + SE37 metadata (fn group IWOPM) · SAP KBA 1923267 (save/commit contract)";
const LV = "2026-07-14";

// canonical write sequence for a PM notification
const NOTIF_SEQ = [
  "BAPI_ALM_NOTIF_CREATE",
  "BAPI_ALM_NOTIF_DATA_ADD / DATA_MODIFY / DATA_DELETE",
  "BAPI_ALM_NOTIF_PUTINPROGRESS / CHANGEUSRSTAT / CLOSE",
  "BAPI_ALM_NOTIF_SAVE",
  "BAPI_TRANSACTION_COMMIT",
];
const FAMILY = ["BAPI_ALM_NOTIF_CREATE", "BAPI_ALM_NOTIF_SAVE", "BAPI_ALM_NOTIF_GET_DETAIL", "BAPI_TRANSACTION_COMMIT"];

// shared verified base for the BUS2038 notification BAPIs
const notif = (o: Partial<SapFuncObject> & { id: string; technicalName: string; shortDescriptionHe: string; shortDescriptionEn: string; operationType: SapFuncObject["operationType"]; parameterSummary: string; write: boolean }): SapFuncObject => ({
  objectType: "BAPI",
  primaryModule: "PM",
  secondaryModules: ["CS"],
  businessProcess: "Maintenance Notification",
  businessObject: "BUS2038",
  longDescriptionHe: undefined,
  longDescriptionEn: undefined,
  transactions: ["IW21", "IW22", "IW23", "IW28", "IW29"],
  tables: ["QMEL", "QMFE", "QMUR", "QMMA", "QMSM"],
  relatedObjects: FAMILY,
  sequence: NOTIF_SEQ,
  requiresSave: (o.write ? "yes" : "no") as TriState,
  requiresCommit: (o.write ? "yes" : "no") as TriState,
  remoteEnabled: "yes",
  releasedStatus: "Released · RFC · created 4.6 (110)",
  eccSupport: "yes",
  s4OnPremSupport: "yes",
  cloudSupport: "unknown",
  verificationStatus: "verified-docs" as VerificationStatus,
  verificationSource: VSRC,
  lastVerified: LV,
  confidence: "high",
  aliases: [],
  keywords: ["notification", "הודעת אחזקה", "notify", "תקלה", "malfunction", "QMEL", "IW21", "PM", "BUS2038", o.technicalName],
  qaNotes: o.write
    ? "בדוק טבלת RETURN אחרי כל קריאה. חובה BAPI_ALM_NOTIF_SAVE ואז BAPI_TRANSACTION_COMMIT — על אותו חיבור RFC (stateful) כדי לשתף באפר. בשגיאה קרא BAPI_TRANSACTION_ROLLBACK."
    : "קריאה בלבד — אינה דורשת SAVE/COMMIT.",
  // ---- implementer mode ----
  category: "Notification",
  difficulty: o.write ? "Intermediate" : "Beginner",
  stability: "Released",
  processChain: ["הודעת אחזקה", "פקודת אחזקה", "תכנון", "דיווח", "תנועת סחורה", "סילוק"],
  recommendedReading: ["עיבוד הודעות אחזקה", "סוגי הודעות ו-Customizing", "נתוני אב PM (ציוד ומיקומים)"],
  relatedIdocs: [],
  authObjects: ["I_QMEL", "I_SWERK", "I_INGRP", "I_BEGRP"],
  usageContexts: o.write ? ["אפליקציית אחזקה ניידת", "התראת IoT / חיישן מפעל", "אינטגרציית PI/PO", "REST/OData דרך Middleware"] : ["הצגת פרטי הודעה במערכת חיצונית", "סנכרון נתונים"],
  troubleshooting: {
    errors: ["IW 034 — סוג הודעה לא קיים", "IW 215 — ציוד/מיקום לא נמצא", "00 344 — הרשאה חסרה"],
    causes: ["Customizing חסר לסוג ההודעה", "הרשאה I_QMEL חסרה", "הבאפר לא נשמר (SAVE/COMMIT)", "חיבור RFC לא-stateful"],
    debug: "נקודת עצירה ב-BAPI_ALM_NOTIF_SAVE; בדוק EXPORT NOTIFHEADER + טבלת RETURN; SLG1 ליומן יישום.",
    tables: ["QMEL", "QMFE", "QMUR", "QMSM"],
    notes: ["בדוק RETURN (TYPE=E/A) לפני COMMIT", "SAP Note לגבי status inconsistency: 1923267 / 2541226"],
  },
  ...o,
});

/* ---- overlay onto records already derived from the dataset ---- */
export const PM_ENRICHMENT: Record<string, Partial<SapFuncObject>> = {
  BAPI_ALM_NOTIF_CREATE: notif({ id: "BAPI_ALM_NOTIF_CREATE", technicalName: "BAPI_ALM_NOTIF_CREATE", operationType: "Create", write: true,
    shortDescriptionHe: "יצירת הודעת אחזקה (PM/CS) בבאפר העדכון — מקבל מספר זמני.",
    shortDescriptionEn: "Create a PM/CS maintenance notification in the update buffer (returns a temporary number).",
    parameterSummary: "IMP EXTERNAL_NUMBER · NOTIF_TYPE · NOTIFHEADER · TAB NOTITEM · NOTIFCAUS · NOTIFACTV · NOTIFTASK · NOTIFPARTNR · RETURN",
    businessScenario: "מערכת חיצונית יוצרת הודעת אחזקה ב-SAP — למשל אפליקציה ניידת בשטח או חיישן IoT שמזהה תקלה במשאבה ופותח הודעה אוטומטית.",
    commonMistakes: ["שכחת BAPI_TRANSACTION_COMMIT — ההודעה לא נשמרת", "חיבור RFC לא-stateful → הבאפר לא משותף בין CREATE ל-SAVE", "עדכון סטטוס מערכת ישירות במקום BAPI_ALM_NOTIF_CHANGEUSRSTAT", "התעלמות מטבלת RETURN (TYPE=E/A)"],
    checklist: ["סוג ההודעה (NOTIF_TYPE) קיים ומוגדר ב-Customizing", "ציוד / מיקום פונקציונלי קיים (אם משויך)", "מפעל תכנון + קבוצת מתכננים תקפים", "הרשאה I_QMEL לסוג ההודעה", "חיבור RFC stateful לשיתוף הבאפר בין הקריאות"],
    codeAbap: "DATA: ls_hdr TYPE bapi2080_nothdri,\n      ls_exp TYPE bapi2080_nothdre,\n      lt_ret TYPE STANDARD TABLE OF bapiret2.\n\nls_hdr-short_text = 'Pump vibration'.\n\nCALL FUNCTION 'BAPI_ALM_NOTIF_CREATE'\n  EXPORTING notif_type = 'M1' notifheader = ls_hdr\n  IMPORTING notifheader_export = ls_exp\n  TABLES    return = lt_ret.\n\nCALL FUNCTION 'BAPI_ALM_NOTIF_SAVE'\n  IMPORTING notifheader = ls_exp\n  TABLES    return = lt_ret.\n\nCALL FUNCTION 'BAPI_TRANSACTION_COMMIT' EXPORTING wait = 'X'." }),
  BAPI_ALM_NOTIF_SAVE: notif({ id: "BAPI_ALM_NOTIF_SAVE", technicalName: "BAPI_ALM_NOTIF_SAVE", operationType: "Post", write: true,
    shortDescriptionHe: "שמירת ההודעה למסד הנתונים — מקצה את המספר הסופי.",
    shortDescriptionEn: "Save the notification to the database (assigns the final number).",
    parameterSummary: "IMP NUMBER · TOGETHER_WITH_ORDER · EXP NOTIFHEADER · TAB RETURN" }),
  BAPI_ALM_NOTIF_CLOSE: notif({ id: "BAPI_ALM_NOTIF_CLOSE", technicalName: "BAPI_ALM_NOTIF_CLOSE", operationType: "Change", write: true,
    shortDescriptionHe: "השלמת/סגירת הודעה — קובע סטטוס מערכת NOCO.",
    shortDescriptionEn: "Complete/close the notification (sets system status NOCO).",
    parameterSummary: "IMP NUMBER · SYSTSTAT · TESTRUN · EXP SYSTEMSTATUS · USERSTATUS · TAB RETURN" }),
  BAPI_ALM_NOTIF_DATA_ADD: notif({ id: "BAPI_ALM_NOTIF_DATA_ADD", technicalName: "BAPI_ALM_NOTIF_DATA_ADD", operationType: "Create", write: true,
    shortDescriptionHe: "הוספת פריטים/סיבות/פעילויות/משימות/שותפים להודעה קיימת (טבלת NOTIFTASK להוספת משימות).",
    shortDescriptionEn: "Add items/causes/activities/tasks/partners to a notification (tasks via the NOTIFTASK table).",
    parameterSummary: "IMP NUMBER · NOTIFHEADER · TASK_DETERMINATION · TAB NOTITEM · NOTIFCAUS · NOTIFACTV · NOTIFTASK · NOTIFPARTNR · RETURN" }),
  BAPI_ALM_NOTIF_GET_DETAIL: notif({ id: "BAPI_ALM_NOTIF_GET_DETAIL", technicalName: "BAPI_ALM_NOTIF_GET_DETAIL", operationType: "Read", write: false,
    shortDescriptionHe: "קריאת כל פרטי ההודעה — קריאה בלבד.",
    shortDescriptionEn: "Read full notification detail (read-only).",
    parameterSummary: "IMP NUMBER · EXP NOTIFHEADER_EXPORT · NOTIFHDTEXT · TAB NOTLONGTXT · NOTITEM · NOTIFCAUS · NOTIFACTV · NOTIFTASK · NOTIFPARTNR · RETURN" }),

  // ---- corrections: these names are in our dataset but are NOT standard objects ----
  BAPI_ALM_NOTIF_TASK_ADD: {
    verificationStatus: "invalid-name", confidence: "high", verificationSource: VSRC, lastVerified: LV,
    shortDescriptionHe: "אינו FM סטנדרטי. להוספת משימות השתמש ב-BAPI_ALM_NOTIF_DATA_ADD (טבלת NOTIFTASK).",
    shortDescriptionEn: "Not a standard SAP function module. To add tasks, use BAPI_ALM_NOTIF_DATA_ADD (NOTIFTASK table).",
    relatedObjects: ["BAPI_ALM_NOTIF_DATA_ADD", "BAPI_ALM_NOTIF_TASK_COMPLETE", "BAPI_ALM_NOTIF_TASK_RELEASE"],
    qaNotes: "אימות: לא נמצא ב-SE37 / מראות מטא-דאטה. אין לפרסם כשם תקין.",
  },
  BAPI_ALM_NOTIF_LIST_FILTER: {
    verificationStatus: "invalid-name", confidence: "high", verificationSource: VSRC, lastVerified: LV,
    shortDescriptionHe: "אינו FM סטנדרטי. משפחת ה-LIST מפוצלת לפי קריטריון: LIST_EQUI · LIST_FUNCLOC · LIST_PARTNER · LIST_PLANGROUP · LIST_SORTFIELD.",
    shortDescriptionEn: "Not a standard SAP function module. The LIST family is split by criterion: LIST_EQUI / LIST_FUNCLOC / LIST_PARTNER / LIST_PLANGROUP / LIST_SORTFIELD.",
    relatedObjects: ["BAPI_ALM_NOTIF_LIST_EQUI", "BAPI_ALM_NOTIF_LIST_FUNCLOC", "BAPI_ALM_NOTIF_LIST_PARTNER"],
    qaNotes: "אימות: אין וריאנט FILTER גנרי. אין לפרסם כשם תקין.",
  },
};

/* ---- verified objects that our table dataset does not reference yet ---- */
export const PM_ADDITIONS: SapFuncObject[] = [
  notif({ id: "BAPI_ALM_NOTIF_DATA_MODIFY", technicalName: "BAPI_ALM_NOTIF_DATA_MODIFY", operationType: "Change", write: true,
    shortDescriptionHe: "שינוי נתוני הודעה (כותרת/פריטים/משימות) עם מבני X לסימון שדות לעדכון.",
    shortDescriptionEn: "Change notification data (header/items/tasks…) using X-indicator structures.",
    parameterSummary: "IMP NUMBER · NOTIFHEADER (+_X) · TAB NOTIFITEM (+_X) · NOTIFCAUS (+_X) · NOTIFACTV (+_X) · NOTIFTASK (+_X) · NOTIFPARTNR (+_X) · RETURN" }),
  notif({ id: "BAPI_ALM_NOTIF_DATA_DELETE", technicalName: "BAPI_ALM_NOTIF_DATA_DELETE", operationType: "Delete", write: true,
    shortDescriptionHe: "מחיקת תת-אובייקטים (פריטים/סיבות/פעילויות/משימות/שותפים) מהודעה.",
    shortDescriptionEn: "Delete sub-objects (items/causes/activities/tasks/partners) from a notification.",
    parameterSummary: "IMP NUMBER · TAB NOTITEM · NOTIFCAUS · NOTIFACTV · NOTIFTASK · NOTIFPARTNR · RETURN" }),
  notif({ id: "BAPI_ALM_NOTIF_PUTINPROGRESS", technicalName: "BAPI_ALM_NOTIF_PUTINPROGRESS", operationType: "Change", write: true,
    shortDescriptionHe: "העברת ההודעה לטיפול (Release) — קובע סטטוס מערכת.",
    shortDescriptionEn: "Release / put the notification in process (sets the system status).",
    parameterSummary: "IMP NUMBER · LANGU · LANGUISO · TESTRUN · EXP SYSTEMSTATUS · USERSTATUS · TAB RETURN" }),
  notif({ id: "BAPI_ALM_NOTIF_CHANGEUSRSTAT", technicalName: "BAPI_ALM_NOTIF_CHANGEUSRSTAT", operationType: "Change", write: true,
    shortDescriptionHe: "שינוי סטטוס המשתמש (User Status) של הודעת אחזקה — לא סטטוס המערכת.",
    shortDescriptionEn: "Change the USER status of a PM/CS notification (not the system status).",
    parameterSummary: "IMP NUMBER · USR_STATUS · SET_INACTIVE · TESTRUN · EXP SYSTEMSTATUS · USERSTATUS · TAB RETURN",
    qaNotes: "רק סטטוס משתמש (אין לגעת בסטטוס מערכת דרך FM). חובה SAVE + BAPI_TRANSACTION_COMMIT. רלוונטי לסוגי הודעה 01/02/03. בדוק RETURN.",
    keywords: ["user status", "סטטוס משתמש", "notification", "BUS2038", "CHANGEUSRSTAT"] }),
  {
    id: "BAPI_TRANSACTION_COMMIT", technicalName: "BAPI_TRANSACTION_COMMIT", objectType: "BAPI",
    primaryModule: "Basis", secondaryModules: ["Cross-Application"], businessProcess: "Transaction Control",
    operationType: "Post",
    shortDescriptionHe: "ביצוע COMMIT WORK חיצוני לאחר קריאות BAPI — מסד הנתונים נשמר רק לאחר קריאה זו.",
    shortDescriptionEn: "Execute external COMMIT WORK after BAPI calls — data persists only after this call.",
    transactions: [], tables: [], businessObject: undefined,
    relatedObjects: ["BAPI_TRANSACTION_ROLLBACK", "BAPI_ALM_NOTIF_SAVE"],
    sequence: NOTIF_SEQ, requiresSave: "no", requiresCommit: "no", remoteEnabled: "yes",
    releasedStatus: "Released · RFC · function group BAPT (SAP_BASIS)",
    eccSupport: "yes", s4OnPremSupport: "yes", cloudSupport: "unknown",
    verificationStatus: "verified-docs", verificationSource: "SE37 metadata (fn group BAPT, SAP_BASIS)", lastVerified: LV, confidence: "high",
    category: "TransactionControl", difficulty: "Advanced", stability: "Released", processChain: NOTIF_SEQ, recommendedReading: ["LUW ו-COMMIT WORK ב-SAP", "עקרונות BAPI"],
    aliases: [], keywords: ["commit", "COMMIT WORK", "transaction", "Basis"],
    parameterSummary: "IMP WAIT · EXP RETURN",
    qaNotes: "העבר WAIT='X' אם קוראים מיד את הנתונים לאחר ה-commit. חלה על כל רצף כתיבה של BAPI.",
  },
  {
    id: "BAPI_TRANSACTION_ROLLBACK", technicalName: "BAPI_TRANSACTION_ROLLBACK", objectType: "BAPI",
    primaryModule: "Basis", secondaryModules: ["Cross-Application"], businessProcess: "Transaction Control",
    operationType: "Post",
    shortDescriptionHe: "ביצוע ROLLBACK WORK חיצוני — ביטול השינויים במקרה שגיאה ברצף BAPI.",
    shortDescriptionEn: "Execute external ROLLBACK WORK — discard changes on error in a BAPI sequence.",
    transactions: [], tables: [], businessObject: undefined,
    relatedObjects: ["BAPI_TRANSACTION_COMMIT"],
    sequence: NOTIF_SEQ, requiresSave: "no", requiresCommit: "no", remoteEnabled: "yes",
    releasedStatus: "Released · RFC · function group BAPT (SAP_BASIS)",
    eccSupport: "yes", s4OnPremSupport: "yes", cloudSupport: "unknown",
    verificationStatus: "verified-docs", verificationSource: "SE37 metadata (fn group BAPT, SAP_BASIS)", lastVerified: LV, confidence: "high",
    category: "TransactionControl", difficulty: "Advanced", stability: "Released", processChain: NOTIF_SEQ, recommendedReading: ["LUW ו-COMMIT WORK ב-SAP", "עקרונות BAPI"],
    aliases: [], keywords: ["rollback", "ROLLBACK WORK", "transaction", "Basis"],
    parameterSummary: "EXP RETURN",
    qaNotes: "קרא במקום COMMIT כאשר טבלת RETURN מכילה שגיאה (TYPE = E/A).",
  },
];

// ============================================================================
// Phase 15.9 — Equipment · Functional Location · Maintenance Order ·
// Confirmation · Classification (VERIFIED against SAP Help + SE37 mirrors).
// 7 dataset names verified NON-EXISTENT are flagged invalid-name.
// ============================================================================
const OSRC = "SE37 metadata mirror (sapdatasheet.org) + SAP Community";
const ORDER_CHAIN = ["הודעה", "פקודת אחזקה", "שחרור", "דיווח", "תנועת סחורה", "סגירה טכנית (TECO)", "סילוק (KO88)"];

type G = { id: string; op: OperationType; write: boolean; cat: BusinessCategory; proc: string; he: string; en: string; params: string; bor?: string; tx: string[]; tbl: string[]; rel: string[]; seq?: string[]; chain?: string[]; scenario?: string; usage?: string[]; mistakes?: string[]; check?: string[]; trouble?: SapFuncObject["troubleshooting"]; auth?: string[]; code?: string; kw?: string[]; vs?: VerificationStatus };
const g = (d: G): SapFuncObject => ({
  id: d.id, technicalName: d.id, objectType: /^BAPI_/.test(d.id) ? "BAPI" : "FM",
  primaryModule: "PM", secondaryModules: [], businessProcess: d.proc, operationType: d.op,
  shortDescriptionHe: d.he, shortDescriptionEn: d.en, transactions: d.tx, tables: d.tbl,
  businessObject: d.bor, relatedObjects: d.rel, sequence: d.seq,
  requiresSave: (d.write ? "yes" : "no") as TriState, requiresCommit: (d.write ? "yes" : "no") as TriState, remoteEnabled: "yes",
  releasedStatus: d.vs === "internal-unsupported" ? "FM · לא Released רשמית" : "Released · RFC", eccSupport: "yes", s4OnPremSupport: "yes", cloudSupport: "unknown",
  verificationStatus: d.vs || "verified-docs", verificationSource: OSRC, lastVerified: LV, confidence: "high",
  aliases: [], keywords: d.kw || [d.id, d.proc],
  category: d.cat, difficulty: d.op === "Read" ? "Beginner" : (d.op === "Post" || d.op === "Confirm" || d.op === "Mixed" ? "Advanced" : "Intermediate"),
  stability: d.vs === "internal-unsupported" ? "Use-With-Caution" : "Released", processChain: d.chain, parameterSummary: d.params,
  businessScenario: d.scenario, usageContexts: d.usage, commonMistakes: d.mistakes, checklist: d.check,
  troubleshooting: d.trouble, authObjects: d.auth, codeAbap: d.code,
  qaNotes: d.write ? "בדוק טבלת RETURN; חובה BAPI_TRANSACTION_COMMIT (WAIT='X'). בשגיאה — ROLLBACK." : "קריאה בלבד.",
});

const FAM: SapFuncObject[] = [
  // ---- Equipment ----
  g({ id: "BAPI_EQUI_CREATE", op: "Create", write: true, cat: "Equipment", proc: "Equipment", bor: "EquipmentPM", tx: ["IE01", "IE31"], tbl: ["EQUI", "EQKT", "EQUZ", "ILOA"], rel: ["BAPI_EQUI_CHANGE", "BAPI_EQUI_INSTALL", "BAPI_TRANSACTION_COMMIT"], auth: ["I_IWERK", "I_BEGRP", "I_EQUI"],
    he: "יצירת אב-נתונים של ציוד (Equipment).", en: "Create equipment master.", params: "IMP DATA_GENERAL, DATA_SPECIFIC, DATA_INSTALL, EXTERNAL_NUMBER · EXP EQUIPMENT · TAB RETURN",
    usage: ["רישום ציוד מ-EAM נייד", "מיגרציה מ-legacy", "אינטגרציית IoT / asset registry"], mistakes: ["שכחת COMMIT", "קטגוריית ציוד לא מוגדרת"] }),
  g({ id: "BAPI_EQUI_CHANGE", op: "Change", write: true, cat: "Equipment", proc: "Equipment", bor: "EquipmentPM", tx: ["IE02"], tbl: ["EQUI", "EQUZ", "ILOA"], rel: ["BAPI_EQUI_CREATE", "BAPI_TRANSACTION_COMMIT"],
    he: "שינוי אב-נתונים של ציוד (מבני X לשדות לעדכון).", en: "Change equipment master (X-structures).", params: "IMP EQUIPMENT, DATA_GENERAL(+X), DATA_SPECIFIC(+X) · TAB RETURN" }),
  g({ id: "BAPI_EQUI_GETDETAIL", op: "Read", write: false, cat: "Equipment", proc: "Equipment", bor: "EquipmentPM", tx: ["IE03"], tbl: ["EQUI", "EQKT"], rel: ["BAPI_EQUI_CREATE"],
    he: "שליפת פרטי ציוד — קריאה בלבד.", en: "Read equipment detail.", params: "IMP EQUIPMENT · EXP DATA_GENERAL_EXP, DATA_SPECIFIC_EXP · TAB RETURN" }),
  // ---- Functional Location ----
  g({ id: "BAPI_FUNCLOC_CREATE", op: "Create", write: true, cat: "Equipment", proc: "Functional Location", bor: "FunctLocation", tx: ["IL01"], tbl: ["IFLOT", "IFLOTX", "ILOA"], rel: ["BAPI_FUNCLOC_CHANGE", "BAPI_TRANSACTION_COMMIT"], auth: ["I_ILOA", "I_TL"],
    he: "יצירת מיקום פונקציונלי.", en: "Create functional location.", params: "IMP EXTERNAL_NUMBER, DATA_GENERAL, DATA_SPECIFIC · TAB RETURN" }),
  g({ id: "BAPI_FUNCLOC_CHANGE", op: "Change", write: true, cat: "Equipment", proc: "Functional Location", bor: "FunctLocation", tx: ["IL02"], tbl: ["IFLOT", "ILOA"], rel: ["BAPI_FUNCLOC_CREATE", "BAPI_TRANSACTION_COMMIT"],
    he: "שינוי מיקום פונקציונלי.", en: "Change functional location.", params: "IMP FUNCTLOCATION, DATA_GENERAL(+X), DATA_SPECIFIC(+X) · TAB RETURN" }),
  g({ id: "BAPI_FUNCLOC_GETDETAIL", op: "Read", write: false, cat: "Equipment", proc: "Functional Location", bor: "FunctLocation", tx: ["IL03"], tbl: ["IFLOT", "IFLOTX"], rel: ["BAPI_FUNCLOC_CREATE"],
    he: "שליפת פרטי מיקום פונקציונלי — קריאה בלבד.", en: "Read functional location detail.", params: "IMP FUNCTLOCATION · EXP DATA_GENERAL_EXP · TAB RETURN" }),
  // ---- Maintenance Order (the §14 exemplar) ----
  g({ id: "BAPI_ALM_ORDER_MAINTAIN", op: "Mixed", write: true, cat: "Execution", proc: "Maintenance Order", bor: "BUS2007", tx: ["IW31", "IW32", "IW38"], tbl: ["AUFK", "AFIH", "AFVC", "AFVV", "RESB"], chain: ORDER_CHAIN,
    rel: ["BAPI_ALM_ORDER_GET_DETAIL", "BAPI_ALM_CONF_CREATE", "BAPI_ALM_NOTIF_CREATE", "BAPI_TRANSACTION_COMMIT"], seq: ["BAPI_ALM_ORDER_MAINTAIN (HEADER/OPERATION/COMPONENT)", "BAPI_ALM_ORDER_MAINTAIN (RELEASE)", "BAPI_ALM_CONF_CREATE", "BAPI_ALM_ORDER_MAINTAIN (TECHNICALCOMPLETE)", "BAPI_TRANSACTION_COMMIT"],
    auth: ["I_AUART", "I_IWERK", "I_INGRP", "I_BEGRP"],
    he: "יצירה/שינוי פקודת אחזקה (PM/CS) + פעולות ורכיבים — מונחה-מתודות (IT_METHODS).", en: "Create/change a PM/CS order + operations + components (method-driven via IT_METHODS).",
    params: "TAB IT_METHODS (HEADER·OPERATION·COMPONENT·RELEASE·TECHNICALCOMPLETE·SAVE) · IT_HEADER(+_UP) · IT_OPERATION(+_UP) · IT_COMPONENT(+_UP) · IT_PARTNER · IT_TEXT · IT_SRULE · RETURN · ET_NUMBERS",
    scenario: "מערכת CMMS/נייד יוצרת פקודת אחזקה מהודעה, מוסיפה פעולות ורכיבים, משחררת ומדווחת — הכול דרך קריאה אחת מונחית-מתודות.",
    usage: ["CMMS / אפליקציה ניידת", "אינטגרציית PI/PO / REST", "יצירת פקודות אצווה מ-MRP"],
    mistakes: ["שכחת שורת SAVE ב-IT_METHODS → שום דבר לא נשמר", "שכחת BAPI_TRANSACTION_COMMIT", "ערבוב objecttype שגוי ב-IT_METHODS", "התעלמות מ-RETURN לפני ה-SAVE"],
    check: ["סוג פקודה (AUART) קיים ומוגדר", "מרכז עבודה + מפעל תכנון תקפים", "הרשאה I_AUART לסוג הפקודה", "IT_METHODS מסתיים בשורת SAVE", "רצף מתודות תקין (HEADER לפני OPERATION/COMPONENT)"],
    trouble: { errors: ["IW 302 — סוג פקודה לא קיים", "CO 111 — מרכז עבודה חסר", "IW 083 — הרשאה חסרה"], causes: ["Customizing חסר לסוג פקודה", "IT_METHODS ללא SAVE", "לא בוצע COMMIT"], debug: "נקודת עצירה ב-IBAPI_ALM_ORDER; בדוק ET_NUMBERS + RETURN; SLG1.", tables: ["AUFK", "AFIH", "AFVC", "RESB"], notes: ["בדוק RETURN (TYPE=E/A) לפני SAVE ו-COMMIT"] },
    code: "DATA: lt_methods TYPE TABLE OF bapi_alm_order_method,\n      lt_header  TYPE TABLE OF bapi_alm_order_headers_i,\n      lt_return  TYPE TABLE OF bapiret2,\n      lt_numbers TYPE TABLE OF bapi_alm_numbers.\n\nAPPEND VALUE #( refnumber = '1' objecttype = 'HEADER' method = 'CREATE' ) TO lt_methods.\nAPPEND VALUE #( refnumber = '1' objecttype = ''       method = 'SAVE'   ) TO lt_methods.\nAPPEND VALUE #( orderid = '%00000000001' order_type = 'PM01' planplant = '1000' ) TO lt_header.\n\nCALL FUNCTION 'BAPI_ALM_ORDER_MAINTAIN'\n  TABLES it_methods = lt_methods it_header = lt_header\n         return = lt_return et_numbers = lt_numbers.\n\nCALL FUNCTION 'BAPI_TRANSACTION_COMMIT' EXPORTING wait = 'X'.",
    kw: ["maintenance order", "פקודת אחזקה", "work order", "BUS2007", "IW31"] }),
  g({ id: "BAPI_ALM_ORDER_GET_DETAIL", op: "Read", write: false, cat: "Execution", proc: "Maintenance Order", bor: "BUS2007", tx: ["IW33"], tbl: ["AUFK", "AFIH", "AFVC"], rel: ["BAPI_ALM_ORDER_MAINTAIN"], chain: ORDER_CHAIN,
    he: "שליפת פרטי פקודת אחזקה — קריאה בלבד.", en: "Read maintenance-order detail.", params: "IMP NUMBER · EXP ES_HEADER · TAB ET_OPERATIONS, ET_COMPONENTS, ET_COSTS, RETURN" }),
  g({ id: "BAPI_ALM_ORDERHEAD_GET_LIST", op: "Read", write: false, cat: "Execution", proc: "Maintenance Order", bor: "BUS2007", tx: ["IW38", "IW39"], tbl: ["AUFK", "AFIH"], rel: ["BAPI_ALM_ORDER_GET_DETAIL"],
    he: "רשימת פקודות אחזקה לפי בחירה — קריאה בלבד.", en: "List maintenance orders by selection.", params: "IMP selection · TAB ET_HEADER, RETURN" }),
  g({ id: "BAPI_ALM_CONF_CREATE", op: "Confirm", write: true, cat: "Confirmation", proc: "Order Confirmation", tx: ["IW41", "IW42"], tbl: ["AFRU", "AFVC"], rel: ["BAPI_ALM_ORDER_MAINTAIN", "BAPI_TRANSACTION_COMMIT"], chain: ORDER_CHAIN,
    he: "דיווח פעולה של פקודת אחזקה (Time Confirmation).", en: "Create a maintenance-order operation confirmation.", params: "TAB TIMETICKETS (BAPI_ALM_TIMECONFIRMATION), DETAIL_RETURN, RETURN",
    mistakes: ["שכחת COMMIT", "דיווח על פעולה שלא שוחררה"], usage: ["דיווח שעות מנייד", "אינטגרציית IoT/telemetry"] }),
  // ---- Classification ----
  g({ id: "BAPI_OBJCL_CREATE", op: "Create", write: true, cat: "MasterData", proc: "Classification", tx: ["CL20N", "CL24N"], tbl: ["KSSK", "AUSP", "KLAH"], rel: ["BAPI_OBJCL_CHANGE", "BAPI_TRANSACTION_COMMIT"],
    he: "יצירת שיוך אובייקט למחלקה (Classification).", en: "Assign an object to a class (classification).", params: "IMP OBJECTKEY, OBJECTTABLE, CLASSNUM, CLASSTYPE · TAB ALLOCVALUESNUM/CHAR/CURR, RETURN" }),
  // ---- verified objects absent from the dataset ----
  g({ id: "BAPI_EQUI_INSTALL", op: "Change", write: true, cat: "Equipment", proc: "Equipment", bor: "EquipmentPM", tx: ["IE02", "IE4N"], tbl: ["EQUZ", "ILOA"], rel: ["BAPI_EQUI_DISMANTLE", "BAPI_EQUI_CREATE", "BAPI_TRANSACTION_COMMIT"],
    he: "התקנת ציוד במיקום פונקציונלי / ציוד עליון (זוג עם BAPI_EQUI_DISMANTLE).", en: "Install equipment at a functional location / superior equipment (pairs with BAPI_EQUI_DISMANTLE).", params: "IMP EQUIPMENT, install target (FUNCLOC / SUPEQUI) · TAB RETURN",
    mistakes: ["שכחת COMMIT", "שימוש ב-BAPI_EQMT_INSTALL שאינו קיים"] }),
  g({ id: "BAPI_MPID_CREATE", op: "Create", write: true, cat: "Equipment", proc: "Measuring Point", tx: ["IK01"], tbl: ["IMPTT"], rel: ["MEASUREM_DOCUM_RFC_SINGLE_001", "BAPI_TRANSACTION_COMMIT"],
    he: "יצירת נקודת מדידה (Measuring Point). (השם הישן BAPI_MEASUREMENTPOINT_CREATE אינו קיים).", en: "Create a measuring point. (The name BAPI_MEASUREMENTPOINT_CREATE does not exist.)", params: "IMP MEASPOINT_DATA · EXP MEASUREMENT_POINT · TAB RETURN" }),
];

// split: overlay existing dataset objects, add the rest
const EXIST_PM = new Set(["BAPI_EQUI_CREATE", "BAPI_EQUI_CHANGE", "BAPI_EQUI_GETDETAIL", "BAPI_FUNCLOC_CREATE", "BAPI_FUNCLOC_CHANGE", "BAPI_FUNCLOC_GETDETAIL", "BAPI_ALM_ORDER_MAINTAIN", "BAPI_ALM_ORDER_GET_DETAIL", "BAPI_ALM_ORDERHEAD_GET_LIST", "BAPI_ALM_CONF_CREATE", "BAPI_OBJCL_CREATE"]);
for (const o of FAM) { if (EXIST_PM.has(o.id)) { const { id, technicalName, aliases, ...rest } = o; void id; void technicalName; void aliases; PM_ENRICHMENT[o.id] = rest; } else PM_ADDITIONS.push(o); }

// invalid-name corrections (verified NON-existent) → point to the real object
const inv = (he: string, en: string, rel: string[]): Partial<SapFuncObject> => ({ verificationStatus: "invalid-name", confidence: "high", verificationSource: OSRC, lastVerified: LV, shortDescriptionHe: he, shortDescriptionEn: en, relatedObjects: rel, qaNotes: "אומת: אינו אובייקט SAP סטנדרטי (לא נמצא ב-SE37). אין לפרסם כשם תקין." });
Object.assign(PM_ENRICHMENT, {
  BAPI_EQMT_INSTALL: inv("אינו קיים. להתקנת ציוד השתמש ב-BAPI_EQUI_INSTALL (זוג: BAPI_EQUI_DISMANTLE).", "Does not exist. Use BAPI_EQUI_INSTALL (pair: BAPI_EQUI_DISMANTLE).", ["BAPI_EQUI_INSTALL", "BAPI_EQUI_DISMANTLE"]),
  BAPI_MEASUREMENTPOINT_CREATE: inv("אינו קיים. השתמש ב-BAPI_MPID_CREATE (או FM MP_RFC_SINGLE_CREATE).", "Does not exist. Use BAPI_MPID_CREATE (or FM MP_RFC_SINGLE_CREATE).", ["BAPI_MPID_CREATE"]),
  BAPI_MEASUREMENTPOINT_GETLIST: inv("אינו קיים. קרא דרך FM MSAM_MEAS_POINT_GETDETAIL / טבלת IMPTT.", "Does not exist. Read via FM MSAM_MEAS_POINT_GETDETAIL / table IMPTT.", []),
  BAPI_MEASUREMENTDOCUM_CREATE: inv("אינו קיים. השתמש ב-FM MEASUREM_DOCUM_RFC_SINGLE_001.", "Does not exist. Use FM MEASUREM_DOCUM_RFC_SINGLE_001.", []),
  BAPI_MEASUREMENTDOCUM_CREATEM: inv("אינו קיים. אין BAPI 'multiple' — קרא בלולאה ל-MEASUREM_DOCUM_RFC_SINGLE_001.", "Does not exist. No 'multiple' BAPI — loop MEASUREM_DOCUM_RFC_SINGLE_001.", []),
  BAPI_MAINTENANCEPLAN_CREATE: inv("אינו קיים. השתמש ב-FM MPLAN_CREATE / MPLAN_CHANGE (או IP01/IP41/IP42).", "Does not exist. Use FM MPLAN_CREATE / MPLAN_CHANGE (or IP01/IP41/IP42).", []),
  BAPI_TASKLIST_CREATE: inv("אינו קיים. ב-S/4 השתמש ב-FM EAM_TASKLIST_CREATE / EAM_TASKLIST_POST.", "Does not exist. On S/4 use FM EAM_TASKLIST_CREATE / EAM_TASKLIST_POST.", []),
});
