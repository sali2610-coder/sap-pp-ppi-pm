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

import type { SapFuncObject, TriState, VerificationStatus } from "@/lib/bapi-registry";

const VSRC = "SAP Help (BUS2038 · S/4HANA On-Premise) + SE37 metadata (fn group IWOPM)";
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
  keywords: ["notification", "הודעת אחזקה", "PM", "BUS2038", o.technicalName],
  qaNotes: o.write
    ? "בדוק טבלת RETURN אחרי כל קריאה. חובה BAPI_ALM_NOTIF_SAVE ואז BAPI_TRANSACTION_COMMIT — על אותו חיבור RFC (stateful) כדי לשתף באפר. בשגיאה קרא BAPI_TRANSACTION_ROLLBACK."
    : "קריאה בלבד — אינה דורשת SAVE/COMMIT.",
  ...o,
});

/* ---- overlay onto records already derived from the dataset ---- */
export const PM_ENRICHMENT: Record<string, Partial<SapFuncObject>> = {
  BAPI_ALM_NOTIF_CREATE: notif({ id: "BAPI_ALM_NOTIF_CREATE", technicalName: "BAPI_ALM_NOTIF_CREATE", operationType: "Create", write: true,
    shortDescriptionHe: "יצירת הודעת אחזקה (PM/CS) בבאפר העדכון — מקבל מספר זמני.",
    shortDescriptionEn: "Create a PM/CS maintenance notification in the update buffer (returns a temporary number).",
    parameterSummary: "IMP EXTERNAL_NUMBER · NOTIF_TYPE · NOTIFHEADER · TAB NOTITEM · NOTIFCAUS · NOTIFACTV · NOTIFTASK · NOTIFPARTNR · RETURN" }),
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
    aliases: [], keywords: ["rollback", "ROLLBACK WORK", "transaction", "Basis"],
    parameterSummary: "EXP RETURN",
    qaNotes: "קרא במקום COMMIT כאשר טבלת RETURN מכילה שגיאה (TYPE = E/A).",
  },
];
