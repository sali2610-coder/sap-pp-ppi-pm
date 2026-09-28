/* Project NEO · best practices · PM PROCESS CATALOG (design-audit continuation
   §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with no loader.

   Every record here is a whole process, carrying the profile the brief
   requires (purpose, trigger, preconditions, master data, roles, steps,
   transactions/Fiori, tables/objects, integration points, outputs,
   exceptions, controls, KPIs, ECC-to-S/4HANA changes, migration, official
   reference, cross-links). Every line is copied or condensed from the named
   repository records (repoRef) or from an official SAP page that an existing
   overlay already verified (same URL, same claim). A field the repository
   does not document is left out on purpose: the page renders the gap by
   name. Nothing here asserts a new SAP fact.
   Backfill 2026-09-28 (researcher, adversarial auditor, writer): process.interfaces
   on maintenance-notification-process. Each new official row was either read
   through the scripted channels (help.sap.com search record or page body, Fiori
   Apps Library; stamped DATE25, the day it was read) or copied verbatim from the
   overlay entry it names (that entry's accessedAt). Earlier lines and rows are
   kept (notes, reference.note and reviewer are extended, not replaced) except
   where the audit corrected them; those corrections are named in the record's
   notes (Old → New) and in the batch report. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";
/** accessedAt of the official pages reused from the tx:IW21 / fm:BAPI_ALM_NOTIF_CREATE overlays. */
const DATE_IW21 = "2026-09-02";
const DATE_NOTIF = "2026-09-14";
/** accessedAt of the rows the 2026-09-28 backfill re-read or added (and lastVerifiedAt of the record). */
const DATE28 = "2026-09-28";
/** accessedAt of the rows the interfaces research read on 2026-09-25 (page bodies, Fiori Apps Library, repository records). */
const DATE25 = "2026-09-25";
/** accessedAt values copied from the overlay entries the backfill reused. */
const DATE_FM21 = "2026-09-21"; // data/verification/functions.ts DATE21 (fm:BAPI_ALM_NOTIF_SAVE)
const DATE_FM22 = "2026-09-22"; // data/verification/functions.ts DATE22 (fm:BAPI_ALM_NOTIF_PUTINPROGRESS, fm:BAPI_ALM_NOTIF_DATA_MODIFY)

export const PM_PROCESS_PRACTICES: BestPracticeLike[] = [
  /* ================================================== maintenance notification */
  {
    slug: "maintenance-notification-process",
    he: "הודעות תחזוקה: מדיווח התקלה ועד סגירה וניתוח",
    en: "Maintenance notification process: from malfunction report to closure and analysis",
    module: "PM",
    summary:
      "הודעת תחזוקה מתעדת תקלה או בקשת עבודה על אובייקט ייחוס: תיאור, פריטים, קודי קטלוג (פגם, סיבה, פעילות) " +
      "ומשימות. היא נקודת הכניסה לתהליך התחזוקה, מזינה את ניתוח התקלות החוזרות ויכולה להוביל לפקודת תחזוקה.",
    context:
      "לפי רשומות התחומים של המאגר, הודעת התחזוקה נפתחת ב-IW21 (או ביישום Fiori‏ Create Maintenance Request) " +
      "ונשמרת בטבלאות QMEL (כותרת), QMFE (פריטים), QMUR (סיבות), QMMA (פעילויות) ו-QMSM (משימות); נתוני התקלה " +
      "(סימון Breakdown, ‏Malfunction Start/End) נשמרים ב-QMIH ומזינים את מדדי הזמינות. ב-S/4HANA מודל הנתונים " +
      "נשאר זהה; חוויית המשתמש עוברת ל-Fiori עם זרימה מובנית להזמנה, וממשק ה-GUI (IW21 עד IW28) נשאר קיים. " +
      "ליצירה תוכניתית קיימים ה-BAPI (BAPI_ALM_NOTIF_CREATE, DATA_ADD, SAVE) ו-API_MAINTNOTIFICATION המשוחרר.",
    steps: [
      {
        he: "לפתוח את ההודעה עם אובייקט ייחוס (ציוד או מיקום פונקציונלי), תיאור התקלה, וסוג הודעה מתאים (בתקן SAP): M1 בקשה, M2 תקלה, M3 פעילות. בשטח: Create Maintenance Request או Report and Repair Malfunction; ב-GUI: IW21.",
        xrefs: ["tx:IW21", "fiori:F1511A", "fiori:F2023", "table:QMEL"],
      },
      {
        he: "בהודעת תקלה לרשום Malfunction Start ואת סימון ה-Breakdown (טבלת QMIH, שאינה במילון הפרויקט): בלעדיהם אין זמן השבתה ומדדי MTTR/MTBF יוצאים שגויים.",
      },
      {
        he: "להזין פריטים וקודי קטלוג (פגם, סיבה, פעילות) ומשימות. קודי הקטלוג הם הבסיס לניתוח Pareto של תקלות חוזרות.",
        xrefs: ["table:QMFE", "table:QMUR", "table:QMMA", "table:QMSM"],
      },
      {
        he: "לסנן ולקבל בקשות ולעבד רשימות עבודה: Screen Maintenance Requests ב-Fiori, IW28/IW29 ב-GUI; העברת ההודעה ל'בתהליך' אפשרית גם תוכניתית.",
        xrefs: ["fiori:F4072", "tx:IW28", "tx:IW29", "fm:BAPI_ALM_NOTIF_PUTINPROGRESS"],
      },
      {
        he: "להמיר את ההודעה לפקודת תחזוקה כאשר נדרשת עבודה: הפקודה יורשת את אובייקט הייחוס ואת מרכז העלות. ב-Fiori: Manage Maintenance Notifications and Orders; ב-GUI: IW31 מתוך ההודעה.",
        xrefs: ["tx:IW31", "fiori:F4604", "obj:maintenance-order"],
      },
      {
        he: "לשנות ולעקוב אחר ההודעה ב-IW22 / IW23, לעדכן סטטוס משתמש דרך ה-BAPI הייעודי ולא בעדכון ישיר של טבלאות הסטטוס.",
        xrefs: ["tx:IW22", "tx:IW23", "fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT", "table:JEST"],
      },
      {
        he: "לרשום Malfunction End, להשלים משימות ופעילויות, ולסגור את ההודעה (NOCO) רק אחרי סגירה טכנית של הפקודה המקושרת.",
        xrefs: ["fm:BAPI_ALM_NOTIF_CLOSE", "table:QMSM"],
      },
      {
        he: "לנתח: קודי קטלוג לניתוח תקלות חוזרות, מערכת המידע PMIS (MCI*) ומדדי MTBF/MTTR הנגזרים מזמני התקלה; ב-S/4HANA גם דרך CDS ו-Fiori.",
        xrefs: ["cds:I_MaintenanceNotification"],
      },
      {
        he: "ביצירה תוכניתית לשמור על הרצף CREATE, DATA_ADD, SAVE ואז BAPI_TRANSACTION_COMMIT, על אותו חיבור RFC, ולבדוק את RETURN אחרי כל קריאה (ראו שיטת משמעת ה-COMMIT).",
        xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_SAVE", "bp:bapi-commit-discipline"],
      },
    ],
    antiPatterns: [
      "הודעת תקלה ללא Malfunction Start/End וללא סימון Breakdown: זמני ההשבתה ומדדי MTTR/MTBF יוצאים שגויים.",
      "סוג הודעה ללא פרופיל קטלוג משויך: קודי הפגם והסיבה אינם זמינים למשתמש בעת הרישום.",
      "ניסיון לסגור הודעה כשמשימות פתוחות או כשהפקודה המקושרת לא נסגרה טכנית (TECO).",
      "אובייקט ייחוס שגוי: ציוד שאינו קיים או חסום, ואז הפקודה יורשת מיקום ומרכז עלות שגויים.",
      "רצף BAPI ללא COMMIT או עם התעלמות מטבלת RETURN: ההודעה אינה נשמרת או נשמרת חלקית.",
    ],
    checks: [
      "חיובי: הודעה M1 עם ציוד, פריט פגם וסיבה נשמרת ומקבלת מספר.",
      "שלילי: סוג הודעה ללא פרופיל קטלוג מציג קודים לא זמינים.",
      "אינטגרציה: הודעה שהומרה לפקודה מעבירה אליה את אובייקט הייחוס ואת מרכז העלות.",
      "רגרסיה: סגירת הודעה מעדכנת את מערכת המידע PMIS.",
      "ברצף BAPI: המספר הסופי של ההודעה נוצר רק אחרי SAVE ו-COMMIT, והרשומה קיימת ב-QMEL.",
    ],
    process: {
      purpose:
        "לתעד תקלה או בקשת עבודה על אובייקט טכני באופן מובנה (אובייקט ייחוס, תיאור, קודי קטלוג, משימות), " +
        "כנקודת הכניסה לתהליך התחזוקה וכמקור לניתוח תקלות ולפקודות תחזוקה.",
      trigger: [
        { he: "תקלה בשטח או בקשת עבודה מהמפעיל: הודעת תקלה (M2), בקשת תחזוקה (M1) או דיווח פעילות (M3)." },
        { he: "תהליך תקלת חירום (Emergency Breakdown) מהיישום Report and Repair Malfunction של הטכנאי.", xrefs: ["fiori:F2023"] },
      ],
      preconditions: [
        { he: "סוג ההודעה משויך לפרופיל קטלוג (OIM1) עם קבוצות קוד וקודים משוחררים (QS41); בלעדיהם שדות התופעה והסיבה ריקים." },
        { he: "אובייקט הייחוס (ציוד או מיקום פונקציונלי) קיים, פעיל ואינו חסום.", xrefs: ["table:EQUI", "table:IFLOT"] },
        { he: "למשתמש תפקיד עם הרשאה לטרנזקציות ההודעה או לקטלוג ה-Fiori המתאים." },
      ],
      masterData: [
        { he: "סוג הודעה (M1 / M2 / M3) והגדרותיו." },
        { he: "פרופיל קטלוג וקבוצות קוד: פגם, סיבה, פעילות." },
        { he: "אובייקט ייחוס: ציוד או מיקום פונקציונלי, שממנו יורשים המיקום ומרכז העלות.", xrefs: ["table:EQUI", "table:IFLOT"] },
      ],
      roles: [
        { he: "טכנאי תחזוקה (SAP_BR_MAINTENANCE_TECHNICIAN): פתיחת בקשות ודיווח תקלות ביישומי Create Maintenance Request ו-Report and Repair Malfunction.", xrefs: ["fiori:F1511A", "fiori:F2023"] },
        { he: "מתכנן תחזוקה (SAP_BR_MAINTENANCE_PLANNER): סינון, קבלה וניהול הודעות ופקודות ביישום Manage Maintenance Notifications and Orders.", xrefs: ["fiori:F4604"] },
      ],
      transactions: [
        { he: "IW21 יצירה, IW22 שינוי, IW23 תצוגה.", xrefs: ["tx:IW21", "tx:IW22", "tx:IW23"] },
        { he: "IW24 יצירת דיווח תקלה (Create PM Malfunction Report); IW28 ו-IW29: רשימות הודעות ועיבוד המוני.", xrefs: ["tx:IW24", "tx:IW28", "tx:IW29"] },
        { he: "Fiori: Create Maintenance Request, Report and Repair Malfunction, Screen Maintenance Requests, Manage Maintenance Notifications and Orders.", xrefs: ["fiori:F1511A", "fiori:F2023", "fiori:F4072", "fiori:F4604"] },
      ],
      tables: [
        { he: "QMEL כותרת ההודעה; QMFE פריטים; QMUR סיבות; QMMA פעילויות; QMSM משימות.", xrefs: ["table:QMEL", "table:QMFE", "table:QMUR", "table:QMMA", "table:QMSM"] },
        { he: "QMIH נתוני התקלה (Breakdown, ‏Malfunction Start/End); JEST סטטוסי מערכת ומשתמש.", xrefs: ["table:JEST"] },
        { he: "האובייקט העסקי הודעת תחזוקה ותצוגת ה-CDS שלה.", xrefs: ["obj:maintenance-notification", "cds:I_MaintenanceNotification"] },
      ],
      integrationPoints: [
        { he: "המרה לפקודת תחזוקה: הפקודה יורשת אובייקט ייחוס ומרכז עלות.", xrefs: ["tx:IW31", "obj:maintenance-order"] },
        { he: "ממשק תוכניתי: BAPI_ALM_NOTIF_CREATE, DATA_ADD, SAVE ואחריהם BAPI_TRANSACTION_COMMIT; ב-S/4HANA גם OData API_MAINTNOTIFICATION המשוחרר.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_TRANSACTION_COMMIT"] },
        { he: "הרחבות: Customer Exit‏ QQMA0001 לבדיקת נתוני ההודעה ו-BAdI‏ NOTIF_EVENT_SAVE בשמירה.", xrefs: ["enh:exit:QQMA0001", "enh:badi:NOTIF_EVENT_SAVE"] },
        { he: "אנליטיקה: מערכת המידע PMIS (MCI*), וב-S/4HANA תצוגות CDS ויישומי Fiori." },
      ],
      interfaces: [
        { he: "ECC ו-S/4HANA, לפי רשומת המאגר: יצירה ועדכון דרך ה-BAPI של האובייקט העסקי BUS2038 ברצף BAPI_ALM_NOTIF_CREATE, ואז BAPI_ALM_NOTIF_DATA_ADD / DATA_MODIFY / DATA_DELETE, ואז BAPI_ALM_NOTIF_SAVE ו-BAPI_TRANSACTION_COMMIT על אותו חיבור RFC (stateful); בשגיאה BAPI_TRANSACTION_ROLLBACK. ב-S/4HANA 2025 FPS01 אובייקט ההגירה 'PM - Maintenance notification' נוקב ב-CREATE וב-SAVE.", xrefs: ["obj:maintenance-notification", "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_DATA_MODIFY", "fm:BAPI_ALM_NOTIF_DATA_DELETE", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_TRANSACTION_COMMIT", "fm:BAPI_TRANSACTION_ROLLBACK", "bp:bapi-commit-discipline"] },
        { he: "שינויי סטטוס באותו רצף, לפי רשומת המאגר: BAPI_ALM_NOTIF_PUTINPROGRESS מעביר את ההודעה לטיפול, BAPI_ALM_NOTIF_CHANGEUSRSTAT משנה סטטוס משתמש בלבד (לא סטטוס מערכת), BAPI_ALM_NOTIF_CLOSE קובע NOCO (שם ה-BAPI עצמו מסומן verification_required ברשומת האימות fm:BAPI_ALM_NOTIF_CLOSE); שלושתם פעולות כתיבה הדורשות SAVE ו-COMMIT.", xrefs: ["fm:BAPI_ALM_NOTIF_PUTINPROGRESS", "fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT", "fm:BAPI_ALM_NOTIF_CLOSE", "fm:BAPI_ALM_NOTIF_SAVE", "table:JEST"] },
        { he: "קריאה: BAPI_ALM_NOTIF_GET_DETAIL מחזיר כותרת, טקסטים, פריטים, סיבות, פעילויות, משימות ושותפים, ולפי רשומת המאגר אינו דורש SAVE או COMMIT.", xrefs: ["fm:BAPI_ALM_NOTIF_GET_DETAIL", "table:QMEL"] },
        { he: "שמות שרשומת ההעשרה מסמנת invalid-name: BAPI_ALM_NOTIF_TASK_ADD (להוספת משימות: BAPI_ALM_NOTIF_DATA_ADD עם טבלת NOTIFTASK) ו-BAPI_ALM_NOTIF_LIST_FILTER (משפחת ה-LIST מפוצלת לפי קריטריון). שכבות מאגר אחרות מציגות אותם כקיימים, ולכן לא לבנות עליהם ממשק לפני בדיקה ב-SE37 במערכת היעד.", xrefs: ["fm:BAPI_ALM_NOTIF_DATA_ADD", "tx:SE37"] },
        { he: "S/4HANA (On-Premise 2025 FPS01): שירות ה-OData‏ API_MAINTNOTIFICATION מציע קריאה (GET), יצירה (POST) ועדכון (PATCH) של ההודעה, הפריטים, הפעילויות, הסיבות והשותפים; קריאה, יצירה, עדכון ומחיקה של תופעות כשל; בקשת $batch; ולבקשות תחזוקה את ApproveMaintWorkRequest, ‏RejectMaintWorkRequest ו-SetMaintNotifToInfoRequired. בכל פעולת שינוי נדרשת כותרת If-Match (ETag). ה-API מתועד כחדש ב-S/4HANA 2021, והרשומות שנבדקו אינן מציגות אותו כמחליף של ה-BAPI.", xrefs: ["obj:maintenance-notification", "fm:BAPI_ALM_NOTIF_CREATE"] },
        { he: "S/4HANA: פעולות Function Import באותו שירות: Set Maintenance Notification To In Process (SetMaintNotifToInProcess, סטטוס NOPR) ו-Complete Maintenance Notification (סטטוס NOCO עם תאריך ושעת ייחוס); רשומות האימות fm:BAPI_ALM_NOTIF_PUTINPROGRESS ו-fm:BAPI_ALM_NOTIF_CLOSE מצמידות את העמוד הזה ל-BAPI המקבילים (ל-CLOSE הסטטוס verification_required); התיעוד עצמו אינו נוקב בשמות ה-BAPI ואינו קובע שקילות.", xrefs: ["fm:BAPI_ALM_NOTIF_PUTINPROGRESS", "fm:BAPI_ALM_NOTIF_CLOSE"] },
        { he: "S/4HANA (תיעוד 2023 Latest): האובייקט העסקי Maintenance Notification מפעיל את האירועים העסקיים MaintenanceNotification.Created, ‏MaintenanceNotification.SetToInProcess ו-MaintenanceNotification.Completed, המתפרסמים ב-SAP Business Accelerator Hub.", xrefs: ["obj:maintenance-notification"] },
        { he: "שירותי ה-OData הרשומים ליישומי ה-Fiori בספריית ה-Fiori (S32OP, S/4HANA 2025 FPS01): Create Maintenance Request (F1511A) על UI_MAINTWORKREQUESTOVW_V2; Report and Repair Malfunction (F2023) על EAM_MALFUNCTION_MANAGE; Manage Maintenance Notifications and Orders (F4604) על EAM_OBJPG_MAINTNOTIFICATION_SRV, ‏EAM_OBJPG_MAINTENANCEORDER_SRV, ‏UI_MAINTWORKREQUESTOVW_V2 ו-UI_MAINTWRKREQ_ORD_MANAGE.", xrefs: ["fiori:F1511A", "fiori:F2023", "fiori:F4604"] },
        { he: "תקלות ממשק מוכרות לפי הכותרות וסעיף ה-Symptom בתצוגה המקדימה הפומבית (סעיפי הסיבה והפתרון לא נקראו): 1923267 'BAPI_ALM_NOTIF_* - Notification not updated' (רצף DATA_ADD, SAVE, COMMIT שאינו מחזיר שגיאה ואינו מעדכן) ו-3379615 'BAPI_ALM_NOTIF_SAVE doesn't return notification number'.", xrefs: ["fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_SAVE"] },
      ],
      outputs: [
        { he: "הודעת תחזוקה ממוספרת עם פריטים, סיבות, פעילויות ומשימות.", xrefs: ["table:QMEL"] },
        { he: "פקודת תחזוקה, כאשר ההודעה הומרה.", xrefs: ["obj:maintenance-order"] },
        { he: "היסטוריית תקלות לניתוח: קודי קטלוג וזמני השבתה." },
      ],
      exceptions: [
        { he: "קודי פגם וסיבה לא זמינים: פרופיל הקטלוג אינו משויך לסוג ההודעה (תקריות notif-catalog-profile ו-notif-type-missing-catalog במרכז התקלות)." },
        { he: "לא ניתן לסגור את ההודעה (NOCO חסום): משימות פתוחות או פקודה ללא סגירה טכנית (תקרית notification-cant-close).", xrefs: ["table:QMSM", "table:JEST"] },
        { he: "אובייקט ייחוס שגוי: הציוד אינו קיים או חסום." },
      ],
      controls: [
        { he: "Malfunction Start/End וסימון Breakdown חובה בהודעות תקלה, כתנאי למדדי אמינות נכונים." },
        { he: "סגירת הודעה רק אחרי סגירת המשימות ו-TECO של הפקודה המקושרת." },
        { he: "עדכון סטטוס משתמש דרך BAPI_ALM_NOTIF_CHANGEUSRSTAT ולא בעדכון ישיר.", xrefs: ["fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT"] },
        { he: "בכל רצף BAPI: בדיקת RETURN אחרי כל קריאה ו-COMMIT מפורש בסוף.", xrefs: ["bp:bapi-commit-discipline"] },
      ],
      kpis: [
        { he: "MTBF (זמן ממוצע בין תקלות) ו-MTTR (זמן תיקון ממוצע), הנגזרים מ-Malfunction Start/End ומסימון ה-Breakdown בהודעה." },
        { he: "ניתוח Pareto של קודי פגם וסיבה לזיהוי תקלות חוזרות.", xrefs: ["table:QMFE", "table:QMUR"] },
        { he: "עומס ההודעות הפתוחות ברשימות העבודה (IW28 / IW29) ובמערכת המידע PMIS (MCI*).", xrefs: ["tx:IW28", "tx:IW29"] },
      ],
      eccToS4: [
        { he: "מודל הנתונים QMEL / QMFE / QMUR זהה ב-ECC וב-S/4HANA; התהליך זהה לוגית.", xrefs: ["table:QMEL", "table:QMFE", "table:QMUR"] },
        { he: "חוויית המשתמש עוברת ל-Fiori (Create Maintenance Request, Screen Maintenance Requests, Manage Maintenance Notifications and Orders) עם זרימה מובנית להזמנה; ה-GUI (IW21 עד IW28) נשאר קיים.", xrefs: ["fiori:F1511A", "fiori:F4072", "fiori:F4604"] },
        { he: "ב-S/4HANA ה-BAPI ליצירת הודעה נמנה תחת אובייקט ההגירה, ולצדו קיים OData API_MAINTNOTIFICATION כ-API משוחרר.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE"] },
        { he: "אנליטיקה: לצד PMIS, תצוגות CDS של ההודעה: C_MaintNotificationListReport לפי רשומת התחום, ו-I_MaintenanceNotification לפי מפת ה-CDS של הפרויקט.", xrefs: ["cds:I_MaintenanceNotification"] },
      ],
      migration: [
        { he: "טבלאות QMEL / QMFE / QMUR נשמרות בהמרה; אובייקט ההגירה 'PM - Maintenance notification' בתיעוד Data Migration של 2025 FPS01 נוקב ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE"] },
        { he: "בדיקות לאחר המרה לפי רשומת התחום: קודי קטלוג, מעבר להזמנה ואנליטיקה (CDS)." },
      ],
      reference: {
        title: "Maintenance Notification | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78c09d53839cca11e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד תיעוד התהליך הרשמי (אומת ברשומת tx:IW21). פריט SAP Best Practices (Scope Item) לתהליך טרם אותר ואומת ולכן אינו נרשם." +
          " רשומת What's New 2021 של ה-API (שורת ראיה) נוקבת בפריטי ההיקף BH1, BH2, BJ2, 4HH ו-4HI בזיקה ל-API; אף " +
          "רשומה שנבדקה אינה קובעת מי מהם הוא פריט ה-SAP Best Practices של תהליך ההודעה, ולכן אינו נרשם כהפניה.",
      },
    },
    xrefs: [
      "obj:maintenance-notification", "table:QMEL", "table:QMFE", "table:QMUR", "table:QMMA", "table:QMSM",
      "tx:IW21", "tx:IW22", "tx:IW23", "tx:IW24", "tx:IW28", "tx:IW29", "tx:IW31",
      "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_ALM_NOTIF_CLOSE",
      "fiori:F1511A", "fiori:F2023", "fiori:F4072", "fiori:F4604", "cds:I_MaintenanceNotification",
      "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום של הפרויקט (DOMAINS), בכותרת 'הודעות אחזקה' כלשון המאגר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "זרימת התהליך: תקלה/בקשה, הודעה (IW21), פריטים/סיבות (QMFE/QMUR), המרה לפקודה, סגירת הודעה; טבלאות QMEL, " +
          "QMFE, QMUR, QMMA; טרנזקציות IW21 עד IW29; סוגי הודעה M1 תקלה, M2 בקשה, M3 פעילות (כך נכתב במאגר עד 2026-09-24; תוקן לפי help.sap.com 2025.001 ל-M1 בקשה, M2 תקלה, M3 פעילות); קודי קטלוג לניתוח Pareto; " +
          "תקלות: קוד פגם לא זמין (פרופיל קטלוג), הודעה לא נסגרת (פקודה ופריטים פתוחים).",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-notifications",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום של הפרויקט (DOMAIN_DETAIL), בכותרת 'הודעות אחזקה' כלשון המאגר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מטרה, דיאגרמת שלבים (זיהוי, IW21, קודי קטלוג, משימות, מעבר להזמנה, סגירה וניתוח), נתוני אב (סוג הודעה, " +
          "פרופיל קטלוג, קבוצות קוד, אובייקט ייחוס), Exits‏ QQMA0001/QQMA0014 ו-BAdIs‏ NOTIF_EVENT_SAVE/NOTIF_EVENT_POST, " +
          "תרחישי QA, תקריות, יישומי Fiori, הגירה (QMEL/QMFE/QMUR נשמרים; CDS C_MaintNotification) ומעבר ECC ל-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-notifications",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'אחזקת שבר מקצה לקצה' של הפרויקט (PROCESS_GUIDES), כלשון המאגר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "השלב הראשון: הודעת תקלה M2 עם אובייקט ייחוס, Malfunction Start וקוד פגם ב-IW21 (QMEL, QMIH, QMFE); הטעות " +
          "השכיחה: Malfunction Start/End חסרים ומדדי MTTR/MTBF יוצאים שגויים; Exits‏ QQMA0001; מדדי אמינות ב-Embedded " +
          "Analytics ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-corrective",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'הודעות תקלה (PM)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: IW21 עד IW28, טבלאות QMEL/QMFE/QMUR, עיבוד GUI. S/4HANA: אותו מודל נתונים, UX מבוסס Fiori עם זרימה " +
          "מובנית להזמנה; התהליך זהה לוגית וה-GUI קיים; QMEL/QMFE/QMUR נשמרות.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#notifications-s4",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F1511A, F1511, F2023, F4072, F4604",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "Create Maintenance Request (F1511A; המזהה תוקן 2026-09-24 מ-F1511, שהוא Request Maintenance לפי ספריית ה-Fiori) ו-Report and Repair Malfunction (F2023) בתפקיד SAP_BR_MAINTENANCE_TECHNICIAN; " +
          "Manage Maintenance Notifications and Orders (F4604) בתפקיד SAP_BR_MAINTENANCE_PLANNER; Screen Maintenance " +
          "Requests (F4072) לסינון וקבלת בקשות לפי התיעוד הרשמי (תוקן 2026-09-22).",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F1511A; data/fiori/apps.ts#F1511; data/fiori/apps.ts#F2023; data/fiori/apps.ts#F4072; data/fiori/apps.ts#F4604",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: notif-catalog-profile, notif-type-missing-catalog, notification-cant-close",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "notif-catalog-profile (troubleshooting-ext2.ts): קודי פגם/סיבה לא זמינים; טרנזקציות הניתוח IW21, QS41 " +
          "ו-OIM1, והתיקון 'שייך פרופיל קטלוג לסוג הודעה (OIM1)' ו-'הגדר קבוצות קוד (QS41)'. " +
          "notif-type-missing-catalog (troubleshooting-ext.ts): שדות התופעה והסיבה ריקים ב-IW21 כשאין catalog " +
          "profile מוקצה לסוג ההודעה או ש-code groups לא משוחררים; טרנזקציות הניתוח כוללות QS41 (מסומן במאגר " +
          "'verify SE93'). notification-cant-close (troubleshooting.ts): סגירת הודעה (NOCO) חסומה; להשלים משימות " +
          "פתוחות, לסגור טכנית את הפקודה (TECO) ולהתאים סטטוס משתמש (QMEL, QMSM, JEST).",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#notification-cant-close; data/troubleshooting-ext2.ts#notif-catalog-profile; data/troubleshooting-ext.ts#notif-type-missing-catalog",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט ורשומת האימות cds:I_MaintenanceNotification",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "מפת ה-CDS של הפרויקט (data/cds-map.ts) ממפה את התצוגה I_MaintenanceNotification למודול PM ולטבלה QMEL; " +
          "שכבת האימות מחזיקה רשומה נפרדת cds:I_MaintenanceNotification.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaintenanceNotification; data/verification/cds.ts#cds:I_MaintenanceNotification",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של הפרויקט tx:IW24",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רשומת האימות tx:IW24 מביאה את שורת ספריית ה-Fiori הרשמית (S32OP, S/4HANA 2025 FPS01), שרושמת את IW24 " +
          "כאפליקציה 'Create PM Malfunction Report' מסוג SAP GUI בסטטוס 'Published', ולצדה את רשומות המאגר " +
          "tx-intel.ts#IW24 ('הודעות תחזוקה - תקלה (Malfunction Notification)', מודול PM) ו-tcode-catalog.ts#IW24 " +
          "('Create Malfunction Report').",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/transactions-auto.ts#tx:IW24",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78c09d53839cca11e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_IW21,
        claim:
          "עמוד ה-Web UI for Plant Maintenance בתיעוד 2025 FPS01 קובע: 'On the SAP Web UI for Plant Maintenance, you can " +
          "create, change, and display maintenance notifications' ו-'This application provides the essential functions " +
          "of the SAP GUI transactions IW21, IW22, and IW23' (אומת ברשומת tx:IW21).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_NOTIF,
        claim:
          "אובייקט ההגירה 'PM - Maintenance notification' בתיעוד Data Migration לגרסת 2025 FPS01 נוקב ב-BAPI_ALM_NOTIF_CREATE " +
          "וב-BAPI_ALM_NOTIF_SAVE תחת 'APIs/BAPIs' (אומת ברשומת fm:BAPI_ALM_NOTIF_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 4 'Work Order Cycle', סעיף 4.2 'Notification'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את מחזור פקודת העבודה ובו סעיפי ההודעה: יצירת הודעה (4.2.1), סוגי הודעה (4.2.2) ותוכן ההודעה (4.2.3); " +
          "הספר משמש כאן להפניית קריאה בלבד (קישור צולב לקורא) ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#4.2",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט: משפחת BAPI ההודעות (BUS2038) ורצף הכתיבה NOTIF_SEQ",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "הרשומה מגדירה את רצף הכתיבה של הודעת תחזוקה: BAPI_ALM_NOTIF_CREATE, ‏DATA_ADD / DATA_MODIFY / " +
          "DATA_DELETE, ‏PUTINPROGRESS / CHANGEUSRSTAT / CLOSE, ‏BAPI_ALM_NOTIF_SAVE, ‏BAPI_TRANSACTION_COMMIT; " +
          "משייכת את המשפחה לאובייקט העסקי BUS2038 עם eccSupport ו-s4OnPremSupport 'yes'; קובעת שפעולות כתיבה " +
          "דורשות SAVE ו-COMMIT על אותו חיבור RFC (stateful) ובשגיאה BAPI_TRANSACTION_ROLLBACK, ושהקריאה " +
          "ב-BAPI_ALM_NOTIF_GET_DETAIL אינה דורשת SAVE/COMMIT; CHANGEUSRSTAT משנה סטטוס משתמש בלבד, CLOSE קובע NOCO " +
          "ו-PUTINPROGRESS מעביר לטיפול.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_CREATE; data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_GET_DETAIL; data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_CHANGEUSRSTAT; data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_CLOSE; data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_PUTINPROGRESS",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט ורשומות האימות: תיקוני שם (invalid-name) לשמות TASK_ADD ו-LIST_FILTER",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "הרשומה מסמנת את BAPI_ALM_NOTIF_TASK_ADD כ-invalid-name ('אינו FM סטנדרטי. להוספת משימות השתמש " +
          "ב-BAPI_ALM_NOTIF_DATA_ADD (טבלת NOTIFTASK)') ואת BAPI_ALM_NOTIF_LIST_FILTER כ-invalid-name ('משפחת " +
          "ה-LIST מפוצלת לפי קריטריון'); רשומות האימות fm:BAPI_ALM_NOTIF_TASK_ADD ו-fm:BAPI_ALM_NOTIF_LIST_FILTER " +
          "מתעדות ש-data/function-intel.ts מציג את שני השמות כקיימים, והסטטוס שלהן verification_required.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_TASK_ADD; data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_LIST_FILTER; data/verification/functions.ts#fm:BAPI_ALM_NOTIF_TASK_ADD; data/verification/functions.ts#fm:BAPI_ALM_NOTIF_LIST_FILTER; data/function-intel.ts#BAPI_ALM_NOTIF_TASK_ADD; data/function-intel.ts#BAPI_ALM_NOTIF_LIST_FILTER",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות האימות של הפרויקט: fm:BAPI_ALM_NOTIF_PUTINPROGRESS ו-fm:BAPI_ALM_NOTIF_CLOSE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "רשומת fm:BAPI_ALM_NOTIF_PUTINPROGRESS בסטטוס released_api_available: ה-BAPI (הצבת NOPR במקום OSNO, " +
          "אובייקט BUS2038 לפי המאגר) אינו נזכר בשמו באף רשומת help.sap.com, וה-Function Import‏ " +
          "SetMaintNotifToInProcess של OData‏ API_MAINTNOTIFICATION (2025 FPS01) מוצג כאותה פעולה עסקית; אין תיעוד " +
          "רשמי על הוצאה משימוש או החלפה. רשומת fm:BAPI_ALM_NOTIF_CLOSE בסטטוס verification_required: הצבת NOCO " +
          "להודעה שמורה; זמינות ה-BAPI, חתימתו וסטטוס השחרור נשענים על נתוני המאגר בלבד, והחיפוש הרשמי לא העלה " +
          "סניפט הנוקב בשמו; מה שמתועד רשמית הוא ה-Function Import להשלמת הודעה (NOCO עם תאריך ושעת ייחוס) באותו " +
          "שירות.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/functions.ts#fm:BAPI_ALM_NOTIF_PUTINPROGRESS; data/verification/functions.ts#fm:BAPI_ALM_NOTIF_CLOSE",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 061b31b90a88432fad5e710aa9cd175c, S/4HANA 2025 FPS01) נקרא דרך שירות התוכן: 'The " +
          "API_MAINTNOTIFICATION API offers these operations', ובהן Read, Create ו-Update Maintenance Notification " +
          "(GET, POST, PATCH), ‏Batch Request (POST ל-$batch), קריאה, יצירה ועדכון של Notification Item, ‏Item " +
          "Activity, ‏Item Cause ו-Partner, קריאה, יצירה, עדכון ומחיקה של Notification Failure Effect, ‏Accept " +
          "Maintenance Request (ApproveMaintWorkRequest), ‏Reject Maintenance Request (RejectMaintWorkRequest), " +
          "‏Set Maintenance Request to Action Required (SetMaintNotifToInfoRequired) ו-Read Linear Asset Management " +
          "Data; וכן 'For this service, the If-Match header must be set for all change operations'. העמוד אינו נוקב " +
          "בשמות ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification Function Import | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7bd31588632341a59ea17bcc32812498.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE_FM22,
        claim:
          "עמוד 'Maintenance Notification Function Import' באותה חוברת (loio 7bd31588632341a59ea17bcc32812498, " +
          "הוחזר בשירות החיפוש בגרסה 2023 Latest בלבד) מגדיר: 'Function imports allow custom operations that can be " +
          "invoked by the HTTP methods GET or POST for anything that cannot be mapped to the standard CRUD " +
          "operations', מונה את 'Set Maintenance Notification To In Process This sets the status of maintenance " +
          "notification to NOPR - Notification in process' לצד 'Complete Maintenance Notification This sets the " +
          "system status of maintenance notification to NOCO - Notification completed along with reference date and " +
          "time', מציג בטבלת דוגמאות המטען את השם הטכני 'Name Entity Set HTTP Method SetMaintNotifToInProcess " +
          "Sample Code POST - <host>/sap/opu/odata/sap/API_MAINTNOTIFICATION' וקובע 'Function import requires ETags " +
          "to be specified' (חלונות סניפט שונים של אותו loio בשאילתות שונות). עמוד הסקירה 'Maintenance " +
          "Notification' באותה חוברת (loio f430cbb1950c4880810e27a8308db301, 2023 Latest) רושם 'Technical name: " +
          "API_MAINTNOTIFICATION' ומונה בין יכולות השירות (בחלון סניפט מפוצל: 'Set the maintenance notification' " +
          "... 'to in process') את ההעברה לטיפול ואת 'Set the maintenance notification to completed'. אף אחד " +
          "מהעמודים אינו נוקב בשם ה-BAPI. (אומת ברשומת fm:BAPI_ALM_NOTIF_PUTINPROGRESS)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification Events | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/c6b6454e785a497693ef6988a570ace8.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio c6b6454e785a497693ef6988a570ace8, 2023 Latest) נקרא דרך שירות התוכן: 'The Maintenance " +
          "Notification business object triggers the following events': MaintenanceNotification.Created ('raised " +
          "when a maintenance notification is created'), ‏MaintenanceNotification.SetToInProcess ('raised when a " +
          "maintenance notification is being processed') ו-MaintenanceNotification.Completed ('raised when a " +
          "maintenance notification is completed'), ו-'Business events are published on the SAP Business " +
          "Accelerator Hub'. החיפוש 'Maintenance Notification events' החזיר את העמוד בגרסה 2023 Latest בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Notification | What's New in SAP S/4HANA 2021",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/2fb95f8272f343e68f4bf384f1d2bfcb.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE_NOTIF,
        claim:
          "רשומת What's New לגרסת S/4HANA 2021 מתעדת את ה-API כחדש (‏'API New', ‏'SAP S/4HANA 2021'): 'The " +
          "Maintenance Notification API enables you to create, read, and update data related to maintenance " +
          "notifications', בזיקה לפריטי היקף 4HH, 4HI, BH1, BH2 ו-BJ2 (כלשון הסניפט). (אומת ברשומת " +
          "fm:BAPI_ALM_NOTIF_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Create Maintenance Request - SAP Fiori Apps Reference Library",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1511A')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת F1511A בספריית Fiori Apps (S32OP, S/4HANA 2025 FPS01) מציגה את היישום 'Create Maintenance Request' " +
          "עם שירות ה-OData UI_MAINTWORKREQUESTOVW_V2 0001 (וקבוצת V4‏ UI_PRIORITIZATION_PROFILE), טרנזקציית GUI " +
          "מובילה IW21 והיישום הקודם F1511 Request Maintenance.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Report and Repair Malfunction - SAP Fiori Apps Reference Library",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2023')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת F2023 בספריית Fiori Apps (S32OP, S/4HANA 2025 FPS01) מציגה את היישום 'Report and Repair " +
          "Malfunction' עם שירות ה-OData EAM_MALFUNCTION_MANAGE 0001, תפקיד SAP_BR_MAINTENANCE_TECHNICIAN, טרנזקציה " +
          "מובילה IW31 וטרנזקציות קשורות IW21, IW22, IW32 ו-IW41.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Maintenance Notifications and Orders - SAP Fiori Apps Reference Library",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4604')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת F4604 בספריית Fiori Apps (S32OP, S/4HANA 2025 FPS01) מציגה את היישום 'Manage Maintenance " +
          "Notifications and Orders' עם שירות ה-OData EAM_OBJPG_MAINTENANCEORDER_SRV, " +
          "EAM_OBJPG_MAINTNOTIFICATION_SRV, UI_MAINTWORKREQUESTOVW_V2 ו-UI_MAINTWRKREQ_ORD_MANAGE (כולם 0001) " +
          "ותפקיד SAP_BR_MAINTENANCE_PLANNER.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "kba",
        sourceTitle: "1923267 - BAPI_ALM_NOTIF_* - Notification not updated",
        url: "https://me.sap.com/notes/1923267",
        kba: "1923267",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE_FM22,
        claim:
          "סעיף ה-Symptom בתצוגה המקדימה הפומבית של ה-KBA (userapps.support.sap.com, ללא התחברות) קובע: " +
          "'BAPI_ALM_NOTIF_DATA_ADD is not updating the notification', 'The following sequence is being followed to " +
          "update notification 1. BAPI_ALM_NOTIF_DATA_ADD 2. BAPI_ALM_NOTIF_SAVE 3. BAPI_TRANSACTION_COMMIT No " +
          "error is returned' ו-'The symptom can also occur for other BAPI_ALM_NOTIF_* BAPIs, for example " +
          "BAPI_ALM_NOTIF_DATA_MODIFY and BAPI_ALM_NOTIF_DATA_DELETE'. סעיף Environment מונה 'SAP S/4HANA, " +
          "on-premise' ו-'SAP S/4HANA, Cloud Private Edition' לצד SAP ERP, ECC ו-R/3; רשימת המוצרים כוללת 'SAP " +
          "S/4HANA all versions' ו-'SAP S/4HANA Cloud Private Edition all versions'; מילות המפתח כוללות " +
          "BAPI_ALM_NOTIF_DATA_MODIFY, BAPI_ALM_NOTIF_DATA_DELETE, BAPI_ALM_NOTIF_SAVE, SAVE_ERROR, iw21, iw22, " +
          "iw23, sequence ו-PM-WOC-MN. סעיפי הסיבה והפתרון דורשים התחברות S-user ולא נקראו. המספר קיים גם במחרוזת " +
          "המקור של רשומת המאגר ('SAP KBA 1923267 (save/commit contract)' ב-data/bapi-enrichment.pm.ts). (אומת " +
          "ברשומת fm:BAPI_ALM_NOTIF_DATA_MODIFY)",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "kba",
        sourceTitle: "3379615 - BAPI_ALM_NOTIF_SAVE doesn't return notification number",
        url: "https://me.sap.com/notes/3379615",
        kba: "3379615",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE_FM21,
        claim:
          "סעיף ה-Symptom בתצוגה המקדימה הפומבית של ה-KBA (userapps.support.sap.com, ללא התחברות) קובע: 'When you " +
          "use the Notification BAPI \"BAPI_ALM_NOTIF_CREATE\" to create a notification, BAPI_ALM_NOTIF_SAVE and " +
          "BAPI_TRANSACTION_COMMIT are called as suggested. However, you failed to find out which notification " +
          "number was created.' סעיף Environment מונה 'SAP S/4HANA, on-premise' ו-'SAP S/4HANA Cloud Private " +
          "Edition' לצד SAP ERP, ECC ו-R/3, רשימת המוצרים כוללת 'SAP S/4HANA all versions', ומילות המפתח: 'KBA, " +
          "PM-WOC-MN, Maintenance Notifications, How To'. סעיפי הסיבה והפתרון דורשים התחברות S-user ולא נקראו. " +
          "(אומת ברשומת fm:BAPI_ALM_NOTIF_SAVE)",
        verificationLevel: "supported_secondary_source",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:IW21 ו-fm:BAPI_ALM_NOTIF_CREATE. " +
      "פריט SAP Best Practices (Scope Item) לתהליך לא אותר ולכן ההפניה הרשמית היא עמוד תיעוד התהליך. לא בוצעה בדיקה במערכת SAP חיה." +
      " תוספת 2026-09-28 (שדה interfaces): המשפט הראשון מתאר את שדות הפרופיל שנכתבו ב-2026-09-22. השדה interfaces נשען " +
      "בנוסף על גוף העמודים Operations for Maintenance Notifications (2025.001) ו-Maintenance Notification Events " +
      "(2023.latest), שנקראו ב-2026-09-25, על ספריית ה-Fiori (S32OP) ל-F1511A, F2023, F4604, על שורת Maintenance " +
      "Notification Function Import (2023.latest) שהועתקה מרשומת האימות fm:BAPI_ALM_NOTIF_PUTINPROGRESS, ועל שורות " +
      "KBA שהועתקו מרשומות האימות fm:BAPI_ALM_NOTIF_DATA_MODIFY ו-fm:BAPI_ALM_NOTIF_SAVE. שם תצוגת ה-CDS‏ " +
      "I_MaintenanceNotification נשען על מפת ה-CDS של הפרויקט ועל רשומת האימות cds:I_MaintenanceNotification. הכותרת " +
      "האנגלית של IW24 נשענת על רשומת האימות tx:IW24 (שורת ספריית ה-Fiori ב-S32OP). קודי ההגדרה OIM1 ו-QS41 נשענים על " +
      "תקריות notif-catalog-profile ו-notif-type-missing-catalog. Old → New (2026-09-28): קישור ה-Fiori של Create " +
      "Maintenance Request ב-steps[0], ב-eccToS4[1] וב-xrefs של הרשומה היה fiori:F1511, שהוא Request Maintenance לפי " +
      "data/fiori/apps.ts, והוחלף ל-fiori:F1511A לפי הביקורת; eccToS4[3] ייחס את I_MaintenanceNotification לרשומת " +
      "התחום, שאינה נוקבת בשם הזה, וכעת הוא מיוחס למפת ה-CDS של הפרויקט; שורת הראיה של מרכז התקלות נשענה על " +
      "notification-cant-close, וכעת היא מצטטת גם את notif-catalog-profile (OIM1 ו-QS41) ואת " +
      "notif-type-missing-catalog (QS41).",
  },
];
