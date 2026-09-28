/* Project NEO · best practices · CROSS PROCESS CATALOG (design-audit
   continuation §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with
   no loader.

   Three whole processes that cross PM and PP-PI: confirmations, goods
   movements, and the ECC to S/4HANA migration. Each record carries the profile
   the brief requires (purpose, trigger, preconditions, master data, roles,
   steps, transactions/Fiori, tables/objects, integration points, outputs,
   exceptions, controls, ECC-to-S/4HANA changes, migration, official reference,
   cross-links). Every line is copied or condensed from the named repository
   records (repoRef) or from an official SAP page that an existing overlay
   already verified (same source, same URL, same claim, same accessedAt); the
   only edit to a copied claim is punctuation, because this catalog writes no
   em dashes. A field the repository does not document is left out on purpose:
   the page renders the gap by name. Until 2026-09-28 `kpis` was absent from
   all three records for exactly that reason. Nothing here asserts a new SAP
   fact.
   Backfill 2026-09-28 (researcher, adversarial auditor, writer):
   process.interfaces and process.kpis on all three records. Each new official
   row was either read through the scripted channels (help.sap.com search
   record or page body, Fiori Apps Library, the extracted 2025 FPS01
   Simplification List text; stamped DATE28, the day it was read) or copied
   verbatim from the overlay entry it names (that entry's accessedAt, see the
   constants below). Since then every record carries kpis taken from official
   pages whose bodies were read (confirmation-process: F2216, F2034, F2172 and
   the LIS key figures of S022 and S024; goods-movement-process: W0055 and
   F3749; ecc-to-s4hana-migration-process: the Data Migration monitoring pages
   and F3280): measures the apps compute, not target values. Earlier lines
   and rows are kept verbatim; where the audit corrected or re-dated a
   sentence, the record's notes carry it (Old → New) and the batch report
   lists it. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";

/** accessedAt values copied from the overlay entries reused below. */
const DATE_TX_01 = "2026-09-01"; // data/verification/transactions.ts DATE
const DATE_TX_02 = "2026-09-02"; // data/verification/transactions.ts DATE2
const DATE_FM_02 = "2026-09-02"; // data/verification/functions.ts DATE2
const DATE_TX_07 = "2026-09-07"; // data/verification/transactions.ts DATE3
const DATE_TBL_07 = "2026-09-07"; // data/verification/tables.ts DATE3
const DATE_FM_14 = "2026-09-14"; // data/verification/functions.ts DATE14
const DATE_TBL_15 = "2026-09-15"; // data/verification/tables.ts DATE4
const DATE_FM_21 = "2026-09-21"; // data/verification/functions.ts DATE21
const DATE_FM_22 = "2026-09-22"; // data/verification/functions.ts DATE22
const DATE_FM_23 = "2026-09-23"; // data/verification/functions.ts DATE23
const DATE_FM_24 = "2026-09-24"; // data/verification/functions.ts DATE24
/** accessedAt of the rows the 2026-09-28 backfill read itself (page bodies, search records, Fiori Apps
 *  Library, repository records, the extracted Simplification List text) and lastVerifiedAt of the
 *  backfilled records. */
const DATE28 = "2026-09-28";

export const CROSS_PROCESS_PRACTICES: BestPracticeLike[] = [
  /* ============================================================ confirmations */
  {
    slug: "confirmation-process",
    he: "אישורים: אישור פעולות של פקודת תחזוקה, הזמנת תהליך ופקודת ייצור",
    en: "Confirmation process: maintenance order, process order and production order confirmations",
    module: "Cross",
    summary:
      "אישור (Confirmation) מדווח את הביצוע בפועל של פעולה או שלב: זמן עבודה, כמויות תוצר ופסולת, תנועות " +
      "סחורה נלוות וסטטוס. הוא מעדכן עלות בפועל, צריכת מלאי וזמינות, ומאפשר סגירה טכנית של הפקודה. ביטול " +
      "אישור מהפך את הרישומים הללו.",
    context:
      "לפי רשומות התחומים של המאגר, אישור תחזוקה נרשם ב-IW41 (דיווח זמן פרטני) ובטרנזקציות הדיווח הקיבוצי " +
      "IW42, ‏IW44 ו-IW48, וביטול ב-IW45; אישור הזמנת תהליך נרשם ב-COR6N ברמת שלב וב-CORK ברמת הפקודה, " +
      "וביטול ב-CORS. בייצור הדיסקרטי המקבילות הן CO11N ו-CO15. כל הדיווחים נכתבים לטבלת AFRU. בתעשיות " +
      "תהליכיות האישור מפעיל Backflush של הרכיבים (261) וקבלת תוצרת אוטומטית (101) לפי מפתח הבקרה, ותנועות " +
      "שנכשלו נאספות לטיפול ב-COGI. ב-S/4HANA מודל AFRU נשמר, עלות הפעילות נרשמת ל-Universal Journal, " +
      "והתיעוד הרשמי מצביע על Perform Maintenance Jobs (F5104A) כנתיב אישור הזמן של הטכנאי.",
    steps: [
      {
        he: "לוודא לפני הדיווח שהפקודה משוחררת (REL) ושתקופת הרישום פתוחה ב-MM וב-FI/CO: בלעדיהם האישור נחסם.",
        xrefs: ["tx:IW32", "tx:COR2", "table:JEST", "tx:MMRV", "tx:OB52"],
      },
      {
        he: "לדווח זמן ופעילות על פעולת פקודת התחזוקה: IW41 לדיווח פרטני, ‏IW42, ‏IW44 ו-IW48 לדיווח קיבוצי; לטכנאי בשטח קיים גם נתיב Fiori.",
        xrefs: ["tx:IW41", "tx:IW42", "tx:IW44", "tx:IW48", "fiori:F5104A", "table:AFRU"],
      },
      {
        he: "לדווח שלב של הזמנת תהליך ב-COR6N בשיטת Time Ticket, או דיווח מסכם ברמת הפקודה ב-CORK; בייצור הדיסקרטי CO11N ו-CO15.",
        xrefs: ["tx:COR6N", "tx:CORK", "tx:CO11N", "tx:CO15", "obj:process-order"],
      },
      {
        he: "להזין כמות תוצר, כמות פסולת וזמנים. בתעשיות תהליכיות האישור מפעיל Backflush של הרכיבים וקבלת תוצרת אוטומטית לפי מפתח הבקרה, ולכן הוא יוצר גם מסמכי חומר.",
        xrefs: ["table:RESB", "table:AFRU", "obj:material-document", "bp:goods-movement-process"],
      },
      {
        he: "לטפל בתנועות שנכשלו: רשומות הכשל מעובדות מחדש ב-COGI (ובייצור החוזר ב-MF47) אחרי תיקון מלאי, אצווה או תקופה; טבלת הכשלים AFFW אינה במילון הפרויקט.",
        xrefs: ["tx:COGI", "tx:MF47"],
      },
      {
        he: "לאמת את העלות: שעות האישור מתומחרות לפי שיוך מרכז העבודה למרכז העלות ולסוג הפעילות; ב-S/4HANA הרישום זורם ל-Universal Journal.",
        xrefs: ["table:CRHD", "table:CRCO", "table:ACDOCA"],
      },
      {
        he: "לסמן אישור סופי (Final) רק כשהפעולה הושלמה: השמטת הסימון משאירה את הפקודה בסטטוס PCNF ומונעת את סגירתה.",
        xrefs: ["table:AFRU", "table:AFVC"],
      },
      {
        he: "לתקן דיווח שגוי בביטול מסודר ולא בדיווח שלילי: IW45 בצד התחזוקה, ‏CORS בצד הזמנות התהליך; הביטול מהפך עלות ומלאי.",
        xrefs: ["tx:IW45", "tx:CORS"],
      },
      {
        he: "לסגור טכנית (TECO) רק אחרי השלמת האישורים ופתרון התנועות הפתוחות; הסגירה סוגרת רזרבציות ודרישות קיבולת.",
        xrefs: ["tx:IW32", "tx:COR2", "table:JEST", "table:AUFK"],
      },
      {
        he: "בדיווח תוכניתי: BAPI_ALM_CONF_CREATE בצד התחזוקה ו-BAPI_PROCORDCONF_CREATE_TT בצד הזמנות התהליך, בדיקת RETURN אחרי כל קריאה ו-BAPI_TRANSACTION_COMMIT בסוף; לאינטגרציות HTTP חדשות שירותי ה-OData הרשמיים.",
        xrefs: [
          "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_TRANSACTION_COMMIT",
          "bp:bapi-commit-discipline",
        ],
      },
    ],
    antiPatterns: [
      "דיווח בתקופת רישום סגורה: האישור נדחה (M7053 ברשומת התקרית) או שהתנועות הנלוות נופלות.",
      "אישור כפול ללא בקרת כמות: צריכת רכיבים עודפת ועלות כפולה בפקודה.",
      "התעלמות מ-COGI בסוף המשמרת: האישור נראה מוצלח בעוד צריכת הרכיבים לא נרשמה.",
      "אישור סופי מוקדם מדי, או השמטתו בסיום: הפקודה נשארת ב-PCNF ואינה נסגרת.",
      "אישור שלבים מחוץ לרצף: שלב מאושר לפני קודמו ורצף הדיווח נשבר.",
      "תיקון בדיווח שלילי במקום ביטול ייעודי (IW45 או CORS).",
    ],
    checks: [
      "חיובי: אישור חלקי ואחריו אישור סופי מעדכנים את העלות בפועל בפקודה.",
      "שלילי: פקודה שאינה משוחררת חוסמת את האישור.",
      "אינטגרציה: ניפוק חומר במסגרת האישור צורך את הרזרבציה ורושם עלות.",
      "רגרסיה: ביטול אישור (IW45) מהפך עלות ומלאי.",
      "בתעשיות תהליכיות: אישור שלב מפעיל Backflush וקבלת תוצרת אוטומטית, ו-COGI נקי בסוף המשמרת.",
      "ברצף BAPI: רשומת האישור קיימת ב-AFRU רק אחרי SAVE ו-COMMIT.",
    ],
    process: {
      purpose:
        "לדווח את הביצוע בפועל של פעולה או שלב בפקודת תחזוקה, בהזמנת תהליך ובפקודת ייצור (זמן, כמויות " +
        "ותנועות הסחורה הנלוות), כדי לעדכן עלות בפועל, מלאי וזמינות ולאפשר סגירה טכנית והתחשבנות.",
      trigger: [
        { he: "השלמת עבודה בשטח על פעולה בפקודת תחזוקה משוחררת.", xrefs: ["tx:IW41"] },
        { he: "סיום שלב בהזמנת תהליך ברצפת הייצור, או דיווח מסכם ברמת הפקודה.", xrefs: ["tx:COR6N", "tx:CORK"] },
        { he: "דיווח משמרת: התיעוד הרשמי מונה את COR6N כדיווח ה-Time Ticket חד-המסך לצד CORK ברמת הכותרת.", xrefs: ["tx:COR6N", "tx:CORK"] },
      ],
      preconditions: [
        { he: "הפקודה בסטטוס משוחרר (REL); בלעדיו האישור נחסם.", xrefs: ["table:JEST"] },
        { he: "תקופת הרישום פתוחה ב-MM (MMRV) וב-FI/CO (OB52).", xrefs: ["tx:MMRV", "tx:OB52"] },
        { he: "למרכז העבודה או למשאב שיוך למרכז עלות ולסוג פעילות; בלעדיהם העלות אינה נרשמת.", xrefs: ["table:CRHD", "table:CRCO"] },
        { he: "למשתמש הרשאה לטרנזקציות האישור או לקטלוג ה-Fiori המתאים." },
      ],
      masterData: [
        { he: "פרופיל אישור וסוגי הפעילות (CO) המשויכים למרכז העבודה." },
        { he: "מפתח בקרה עם Backflush ועם קבלת תוצרת אוטומטית בצד הזמנות התהליך." },
        { he: "מרכז עבודה או משאב עם שיוך עלות, שממנו נגזר תעריף השעה.", xrefs: ["table:CRHD", "table:CRCO"] },
      ],
      roles: [
        {
          he: "טכנאי תחזוקה (SAP_BR_MAINTENANCE_TECHNICIAN): דיווח זמן וביצוע; קטלוג הפרויקט מונה את Confirm Jobs ואת Perform Maintenance Jobs בתפקיד הזה.",
          xrefs: ["fiori:F2730", "fiori:F5104A"],
        },
        {
          he: "מפעיל ייצור בתעשיות תהליכיות (SAP_BR_PRODN_OPERATOR_PROC): אישור שלבי הזמנת תהליך ביישום Confirm Process Order לפי קטלוג הפרויקט.",
          xrefs: ["fiori:F3364"],
        },
      ],
      transactions: [
        { he: "תחזוקה: IW41 דיווח זמן פרטני; IW43 תצוגה; IW45 ביטול; IW42, ‏IW44 ו-IW48 דיווח קיבוצי.", xrefs: ["tx:IW41", "tx:IW42", "tx:IW43", "tx:IW44", "tx:IW45", "tx:IW48"] },
        { he: "הזמנות תהליך: COR6N דיווח שלב, ‏CORK דיווח ברמת הפקודה, ‏CORS ביטול; בייצור הדיסקרטי CO11N ו-CO15.", xrefs: ["tx:COR6N", "tx:CORK", "tx:CORS", "tx:CO11N", "tx:CO15"] },
        { he: "טיפול בתנועות כושלות: COGI, ובייצור החוזר MF47.", xrefs: ["tx:COGI", "tx:MF47"] },
        { he: "Fiori לפי קטלוג הפרויקט: Confirm Jobs, ‏Perform Maintenance Jobs ו-Confirm Process Order; מצב האימות של כל מזהה מפורט בהערות הרשומה.", xrefs: ["fiori:F2730", "fiori:F5104A", "fiori:F3364"] },
      ],
      tables: [
        { he: "AFRU רשומות האישור; AFKO כותרת הפקודה; AFVC הפעולות; RESB הרזרבציות שנצרכות.", xrefs: ["table:AFRU", "table:AFKO", "table:AFVC", "table:RESB"] },
        { he: "AUFK כותרת הפקודה ו-JEST סטטוסי מערכת ומשתמש; טבלת כשלי ה-Backflush היא AFFW (אינה במילון הפרויקט).", xrefs: ["table:AUFK", "table:JEST"] },
        { he: "האובייקטים העסקיים פקודת תחזוקה והזמנת תהליך, ותצוגת ה-CDS של אישורי פקודת ייצור.", xrefs: ["obj:maintenance-order", "obj:process-order", "cds:I_ProductionOrderConfirmation"] },
      ],
      integrationPoints: [
        { he: "תנועות סחורה נלוות: ניפוק רכיבים (261) וקבלת תוצרת (101) הנרשמות במסמך חומר.", xrefs: ["obj:material-document", "bp:goods-movement-process"] },
        { he: "עלות: שעות האישור והחומרים נצברים בפקודה, וב-S/4HANA הרישום זורם ל-Universal Journal.", xrefs: ["table:ACDOCA"] },
        { he: "ממשק תוכניתי: BAPI_ALM_CONF_CREATE, ‏BAPI_PROCORDCONF_CREATE_TT ו-BAPI_PROCORDCONF_GETLIST, ואחריהם BAPI_TRANSACTION_COMMIT.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_PROCORDCONF_GETLIST", "fm:BAPI_TRANSACTION_COMMIT"] },
        { he: "שירותי OData רשמיים לאותה מטרה עסקית: API_MAINTORDERCONFIRMATION בצד התחזוקה, ‏API_PROC_ORDER_CONFIRMATION_2_SRV בצד הזמנות התהליך." },
        { he: "הרחבות: Customer Exits‏ CONFPM01 בצד התחזוקה, ‏CONFPP01 ו-CONFPP05 בצד הייצור, ו-BAdI‏ WORKORDER_CONFIRM.", xrefs: ["enh:exit:CONFPM01", "enh:exit:CONFPP01", "enh:exit:CONFPP05", "enh:badi:WORKORDER_CONFIRM"] },
      ],
      interfaces: [
        { he: "תחזוקה, ECC ו-S/4HANA לפי רשומות TX_INTEL של המאגר: IW41 נשענת על BAPI_ALM_CONF_CREATE, ‏BAPI_ALM_CONF_GETDETAIL ו-BAPI_ALM_CONF_CANCEL; IW43 על BAPI_ALM_CONF_GETDETAIL ו-BAPI_ALM_CONF_GETLIST; IW45 על BAPI_ALM_CONF_CANCEL. רק BAPI_ALM_CONF_CREATE במילון הפרויקט, ושתי רשומות המאגר חלוקות על שם טבלת הקלט שלו (CONFIRMATIONS מול TIMETICKETS), ולכן יש לאמת ב-SE37 לפני בנייה.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "tx:IW41", "tx:IW43", "tx:IW45", "tx:SE37", "table:AFRU"] },
        { he: "תחזוקה, S/4HANA: שירות ה-OData‏ API_MAINTORDERCONFIRMATION ‏(Maintenance Order Operation Confirmation) מתועד כשירות נכנס סינכרוני ליצירה ולביטול של אישורי פקודות תחזוקה (2023 Latest), ועמוד 2025 FPS01 מדפיס POST על MaintOrderConfirmation ליצירת אישור פעולה בודד; רישום ה-Hub הוא OP_API_MAINTORDERCONFIRMATION_0001. הרשומות אינן נוקבות ב-BAPI ואינן מציגות את השירות כמחליף שלו.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "obj:maintenance-order", "table:AFRU"] },
        { he: "תחזוקה, S/4HANA: לפי ספריית ה-Fiori (S32OP, 2025 FPS01) Perform Maintenance Jobs (F5104A) רץ על שירותי ה-OData‏ API_MAINTNOTIFICATION, ‏API_MAINTORDERCONFIRMATION ו-UI_MAINTENANCEJOB_MANAGE, רכיב PM-FIO-WOC-JC, טרנזקציה מובילה IW41, והיישומים הקודמים הנקובים הם W0016 ו-W0020 (Confirm Jobs).", xrefs: ["fiori:F5104A", "fiori:W0020", "tx:IW41"] },
        { he: "תחזוקה, S/4HANA: האובייקט העסקי Maintenance Order Operation Confirmation מפעיל את האירועים העסקיים Created ו-Canceled, עם מספר האישור ומונה האישור (MaintOrderConfirmation) כמטען, והם מתפרסמים ב-SAP Business Accelerator Hub (תיעוד 2023 Latest). לפי What's New 2021 האירועים חדשים מ-S/4HANA 2021, ברכיב PM-WOC, בזיקה לפריטי ההיקף Reactive Maintenance (4HH) ו-Proactive Maintenance (4HI).", xrefs: ["obj:maintenance-order", "table:AFRU"] },
        { he: "הזמנות תהליך, ECC ו-S/4HANA לפי רשומות המאגר: BAPI_PROCORDCONF_CREATE_TT לדיווח Time Ticket, עם טבלאות TIMETICKETS ו-GOODSMOVEMENTS לתנועות הנלוות ופלטי DETAIL_RETURN ו-RETURN; BAPI_PROCORDCONF_CANCEL לביטול (CORS); BAPI_PROCORDCONF_GETLIST לשליפת רשימת אישורים. ה-BAPIs הכותבים דורשים BAPI_TRANSACTION_COMMIT לפי הרישום המועשר. S/4HANA 2025 FPS01: עמוד שילוב EWM ב-PP מונה את BAPI_PROCORDCONF_CREATE_HDR, ‏BAPI_PROCORDCONF_CREATE_TT ו-BAPI_PROCORDCONF_CANCEL בין ממשקי PP התומכים בתנועות סחורה סינכרוניות, לצד API_PROC_ORDER_CONFIRMATION_2_SRV.", xrefs: ["fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_PROCORDCONF_CANCEL", "fm:BAPI_PROCORDCONF_GETLIST", "fm:BAPI_TRANSACTION_COMMIT", "tx:COR6N", "tx:CORS", "bp:bapi-commit-discipline"] },
        { he: "הזמנות תהליך, S/4HANA 2025 FPS01: שירות ה-OData‏ API_PROC_ORDER_CONFIRMATION_2_SRV על הישות ProcOrdConf2 מציע יצירת אישור Time Ticket ‏(POST), הצעת כמויות, פעילויות, תאריכים ונתוני כוח אדם, הצעת תנועות סחורה (GetGdsMvtProposal) וביטול (CancelProcOrdConf, עם ConfirmationGroup ו-ConfirmationCount כחובה); לפי עמוד הביטול 'any associated goods movements get reversed'. העמודים אינם נוקבים ב-BAPI ואינם מציגים את השירות כמחליף שלו.", xrefs: ["fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_PROCORDCONF_CANCEL", "obj:process-order", "obj:material-document"] },
        { he: "פקודות ייצור: לפי TX_INTEL, ‏CO11N נשענת על BAPI_PRODORDCONF_CREATE_TT, ‏BAPI_PRODORDCONF_GET_TT_PROP ו-BAPI_PRODORDCONF_CANCEL, ‏CO15 על BAPI_PRODORDCONF_CREATE_HDR ו-BAPI_PRODORDCONF_CANCEL, ו-CO13 על BAPI_PRODORDCONF_CANCEL; מודולי הפונקציה האלה אינם במילון הפרויקט ולכן אינם מקושרים. S/4HANA 2025 FPS01: שירות ה-OData‏ API_PROD_ORDER_CONFIRMATION_2_SRV (ישות ProdnOrdConf2) מעבד אישורי Time Ticket, ‏Time Event ואישור ברמת הפקודה; זהו שירות נפרד משירות הזמנות התהליך API_PROC_ORDER_CONFIRMATION_2_SRV (ישות ProcOrdConf2).", xrefs: ["tx:CO11N", "tx:CO15", "tx:CO13", "table:AFRU"] },
        { he: "הזמנות תהליך, בקרת תהליך (תיעוד 2025 FPS01): אישור Time Ticket לשלב נשלח כהודעת תהליך מקטגוריה PI_PHCON ליעד PI15 (בקשת נתוני התהליך PH_CON); מתוך PI sheet נפתח האישור בקריאה הדינמית CONF_PH, המעבירה את הפקודה, השלב והטרנזקציה למודול הפונקציה COPF_ENTER_CONFIRMATION. תנאים לפי העמוד: מפתח הבקרה של השלב מתיר אישור, הפקודה משוחררת, ולא נוצר לשלב אישור Time Event.", xrefs: ["obj:process-order"] },
        { he: "פקודות ייצור משולבות MES (תיעוד PP-MES של 2025 FPS01): הפקודה המשוחררת מופצת ל-MES ב-IDoc LOIPRO05 דרך DRF, ו-'Information such as confirmations for production quantities is transferred to the S/4HANA system via a BAPI interface'; העמוד אינו נוקב בשם ה-BAPI.", xrefs: ["idoc:msg:LOIPRO", "tx:CO01", "tx:CO02"] },
        { he: "קריאה אנליטית, S/4HANA: תצוגת ה-CDS‏ I_ProductionOrderConfirmation (Analytical Data Category Fact) קוראת את AFRU ומייצגת את סוג האובייקט ProductionOrderConfirmation; הקריאה דורשת הרשאה עם סוג ההגבלה AUFART_WERKS. לפי גופי העמודים, F2216 ו-F2034 קוראות מ-I_MfgOrderOperationConfCube ו-F2172 מ-I_MfgOrderOperationCube; שתיהן אינן במילון הפרויקט.", xrefs: ["cds:I_ProductionOrderConfirmation", "table:AFRU"] },
      ],
      outputs: [
        { he: "רשומת אישור ב-AFRU עם כמויות תוצר ופסולת, זמנים ודגל סיום.", xrefs: ["table:AFRU"] },
        { he: "מסמכי חומר של הצריכה ושל קבלת התוצרת שנוצרו עם האישור.", xrefs: ["obj:material-document"] },
        { he: "עלות בפועל בפקודה, ועדכון זמינות ותכנון." },
      ],
      exceptions: [
        { he: "אישור נדחה בתקופת רישום סגורה (תקרית confirm-period-closed): לפתוח תקופה ב-MMRV או ב-OB52 ולאשר בתאריך בתקופה פתוחה.", xrefs: ["tx:MMRV", "tx:OB52"] },
        { he: "תנועות Backflush תקועות ב-COGI בגלל חוסר מלאי, אצווה שלא נקבעה או תקופה סגורה (תקריות cogi-stuck ו-ru505-backflush-stock).", xrefs: ["tx:COGI"] },
        { he: "אישור שלב מחוץ לרצף נחסם (תקרית phase-confirm-sequence): להשלים את השלב הקודם או להתיר אישור לא מסודר בהגדרות.", xrefs: ["tx:COR6N", "table:AFVC"] },
        { he: "אישור סופי שלא סומן משאיר את הפקודה ב-PCNF (תקרית pm-confirmation-final-flag), וסגירה טכנית נחסמת כשקיימים אישורים או תנועות פתוחים (תקרית teco-blocked).", xrefs: ["table:AFRU", "table:JEST"] },
        { he: "הודעת הצלחה בלי מסמך חומר או מסמך FI: משימת ה-Update נכשלה ונקראת מחדש ב-SM13 (תקרית update-termination-sm13).", xrefs: ["tx:SM13"] },
      ],
      controls: [
        { he: "אישור רק לפקודה משוחררת ורק בתקופת רישום פתוחה.", xrefs: ["table:JEST", "tx:MMRV"] },
        { he: "ניטור COGI בכל משמרת לפני סגירת היום, לפי ההמלצה ברשומת המודיעין של COR6N.", xrefs: ["tx:COGI"] },
        { he: "תיקון דרך ביטול ייעודי (IW45 או CORS) ולא בדיווח שלילי.", xrefs: ["tx:IW45", "tx:CORS"] },
        { he: "סימון Final רק בסיום הפעולה, ו-TECO רק אחרי סגירת האישורים והתנועות התלויות." },
        { he: "בכל רצף BAPI: בדיקת RETURN אחרי כל קריאה ו-COMMIT מפורש בסוף.", xrefs: ["bp:bapi-commit-discipline"] },
      ],
      kpis: [
        { he: "Scrap Reason (F2216, תיעוד 2025 FPS01): אריח KPI של Smart Business המציג את מרכזי העבודה עם ממוצע הפסולת וה-Rework הגבוה ביותר ב-24 השעות האחרונות, ושדות מחושבים: אחוז פסולת בפועל, אחוז תפוקה בפועל ואחוז Rework בפועל, על בסיס הפסולת שנרשמה באישורי הייצור, לפי זמן, מרכז עבודה, חומר, מפעל וסיבת סטייה.", xrefs: ["tx:COOIS", "tx:COOISPI"] },
        { he: "Operation Scrap (F2034, תיעוד 2025 FPS01): השוואת הפסולת שנרשמה באישורים לפסולת הצפויה בפעולת הפקודה, עם השדות המחושבים אחוז פסולת צפוי, אחוז פסולת בפועל, אחוז תפוקה בפועל ואחוז Rework בפועל; נספרות רק פקודות שאושרו סופית.", xrefs: ["tx:COOIS", "tx:COOISPI"] },
        { he: "Production Execution Duration (F2172, תיעוד 2025 FPS01): משך פעולה מתוכנן מול משך בפועל שנרשם באישורים, עם השדות PlannedOperationDuration, ‏ActualOperationDuration, ‏OperationDurationDeviation ו-OperationDurationDeviationPercent; נספרות רק פקודות שאושרו סופית. לפי ספריית ה-Fiori (S32OP) שלוש האפליקציות האנליטיות משויכות גם לתפקידי הייצור התהליכי SAP_BR_PRODN_ENG_PROC ו-SAP_BR_PRODN_SUPERVISOR_PROC, ו-COOISPI נקובה בהן כטרנזקציה קשורה.", xrefs: ["tx:COOIS", "tx:COOISPI"] },
        { he: "מערכת המידע של רצפת הייצור (LIS, יכולת קלאסית שמקורה ב-ECC; תיעוד S/4HANA 2025 FPS01): מבני המידע S022 (פעולה) ו-S024 (מרכז עבודה) מחשבים Lead Time וסטייתו, Execution Time, ‏Queue Time וסטייתו וסטיית לוח זמנים, והשיוך לתקופה נעשה לפי מועד האישור (confirmation schedule). לפי הפריט 'S4TWL - Logistic Information System in PP' (רשימת הפישוט 2025 FPS01, סעיף 9.2.1) מערכת המידע של רצפת הייצור שייכת ב-S/4HANA ל-compatibility scope עם זכויות שימוש מוגבלות." },
      ],
      eccToS4: [
        { he: "מודל AFRU זהה ב-ECC וב-S/4HANA; מבנה האישור אינו משתנה, והתיעוד הרשמי נוקב ב-AFRU כטבלת האישורים של תחזוקת מפעל ושל Project System.", xrefs: ["table:AFRU"] },
        { he: "חוויית המשתמש עוברת ל-Fiori ולמובייל; ה-GUI נשאר קיים, ו-IW41 ו-COR6N מתועדות במהדורת 2025 FPS01.", xrefs: ["tx:IW41", "tx:COR6N"] },
        { he: "בצד התחזוקה התיעוד הרשמי מציג את Perform Maintenance Jobs (F5104A) כאפליקציה שבה רץ תהליך אישור הזמן הסטנדרטי; אפליקציית Confirm Jobs (W0020) הוצאה משימוש ב-S/4HANA 2022 ונמחקה ב-2023.", xrefs: ["fiori:F5104A", "fiori:F2730"] },
        { he: "בצד הזמנות התהליך דף ההשוואה הרשמי מציב את פעולת Confirm Process Order Operation (COR6N) באפליקציות F4587 ו-F5323, שאינן במילון הפרויקט; המזהה F3364 שבקטלוג הפרויקט לא אושש באף מקור רשמי ולכן אינו נרשם כאן כחלופה מתועדת.", xrefs: ["fiori:F3364"] },
        { he: "תנועות הסחורה הנלוות נרשמות ב-S/4HANA לטבלה MATDOC (אינה במילון הפרויקט) במקום ל-MKPF ול-MSEG.", xrefs: ["bp:matdoc-read-through-compatibility", "table:MKPF", "table:MSEG"] },
        { he: "עלות הפעילות נרשמת ב-S/4HANA ל-Universal Journal.", xrefs: ["table:ACDOCA"] },
      ],
      migration: [
        { he: "AFRU נשמרת בהמרה; בדיקות לאחר המרה לפי רשומות התחום: אישור, זרימת עלות ל-ACDOCA וצריכת מלאי ל-MATDOC.", xrefs: ["table:AFRU", "table:ACDOCA"] },
        { he: "לבדוק מחדש תוכניות Z, ‏Customer Exits ו-BAdI של אישורים הקוראים או כותבים AFRU ישירות, כולל זרימת ה-Backflush ורשומות השגיאה.", xrefs: ["table:AFRU", "tx:COGI", "enh:exit:CONFPM01", "enh:exit:CONFPP05"] },
        { he: "בקוד אינטגרציה קיים לאמת ב-SE37 את שמות הפרמטרים של ה-BAPI לפני הסתמכות: רשומות המאגר חלוקות ביניהן.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_PROCORDCONF_CREATE_TT"] },
      ],
      reference: {
        title: "Confirmation Scenarios | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/7c1190a34ad244b7b63feb1443db1622.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד תרחישי האישור בתיעוד ניהול התחזוקה (אומת ברשומת tx:IW41). היקפו צד התחזוקה בלבד; עמוד רשמי " +
          "אחד המכסה גם את אישורי הזמנות התהליך לא אותר בשכבות האימות. פריט SAP Best Practices (Scope Item) " +
          "לתהליך לא אותר ואינו נרשם.",
      },
    },
    xrefs: [
      "table:AFRU", "table:AFKO", "table:AFVC", "table:RESB", "table:AUFK", "table:JEST", "table:ACDOCA",
      "tx:IW41", "tx:IW42", "tx:IW43", "tx:IW44", "tx:IW45", "tx:IW48",
      "tx:COR6N", "tx:CORK", "tx:CORS", "tx:CO11N", "tx:CO15", "tx:COGI", "tx:MF47",
      "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_PROCORDCONF_GETLIST",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fiori:F2730", "fiori:F3364", "fiori:F5104A",
      "obj:maintenance-order", "obj:process-order", "obj:material-document",
      "cds:I_ProductionOrderConfirmation",
      "enh:exit:CONFPM01", "enh:exit:CONFPP01", "enh:exit:CONFPP05", "enh:badi:WORKORDER_CONFIRM",
      "bp:bapi-commit-discipline", "bp:goods-movement-process", "bp:matdoc-read-through-compatibility",
      "tx:CO13", "tx:COOISPI", "fm:BAPI_PROCORDCONF_CANCEL", "fiori:W0020", "idoc:msg:LOIPRO",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום 'אישורי אחזקה (Confirmation)' ו'אישורי ייצור' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אישור תחזוקה מדווח שעות עבודה, חומרים, מדידות וסטטוס, מעדכן עלות בפועל וצריכת מלאי ומאפשר סגירה " +
          "טכנית; זרימה: פקודה משוחררת, ביצוע, אישור שעות (IW41/IW42), תנועות חומר, TECO; טבלאות AFRU, AFVC, " +
          "AFKO, AUFK; טרנזקציות IW41, IW42, IW44, IW45, IW48; BAPI‏ BAPI_ALM_CONF_CREATE. אישור ייצור מדווח " +
          "כמויות, זמן, Backflush וקבלת תוצר, שגיאות נופלות ל-COGI; טבלאות AFRU, AFKO, RESB, MSEG; טרנזקציות " +
          "COR6N, CORK, CO11N, COGI, MF47; BAPI‏ BAPI_PROCORDCONF_CREATE_TT. תקלות: לא ניתן לאשר (סטטוס או " +
          "תקופה), עלות לא נרשמה (שיוך מרכז עלות ב-CRCO), תנועות תקועות.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-confirmation",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'אישורי אחזקה' ו'אישורי ייצור' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "נתוני אב: פרופיל אישור, מפתח בקרה (Backflush ו-Auto-GR), סוגי פעילות ומרכז עבודה עם שיוך עלות. " +
          "הרחבות: CONFPM01, CONFPM02, CONFPM05, CONFPP01, CONFPP05, CONFPP07 ו-BAdI‏ WORKORDER_CONFIRM. " +
          "תרחישי QA: אישור חלקי וסופי מעדכנים עלות בפועל, פקודה לא משוחררת חוסמת אישור, ניפוק חומר באישור " +
          "צורך RESB ורושם עלות, ביטול אישור (IW45) מהפך עלות ומלאי, חוסר רכיב מפנה תנועה ל-COGI. הגירה: AFRU " +
          "נשמר; בדיקות לאחר המרה: אישור, עלות ל-ACDOCA וצריכת מלאי ל-MATDOC. ECC מול S/4HANA: מודל AFRU זהה, " +
          "חוויית המשתמש עוברת ל-Fiori ולמובייל.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-confirmation",
      },
      {
        sourceType: "repository",
        sourceTitle: "זרימת התהליך של תעשיות תהליכיות במאגר: שלב s7 (אישור), s8 (Backflush) ו-s9 (קבלת תוצר)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שלב s7: אישור הזמנת תהליך ב-COR6N יוצר רשומת AFRU עם כמות תוצר ופסולת וזמנים, מפעיל Backflush " +
          "וקבלת תוצרת, ומעדכן עלות בפועל וזמינות; טבלאות AFRU, AFVC, AFFW. טעויות נפוצות: רצף אישור שלבים " +
          "שגוי, ותקופת רישום סגורה שמפילה את האישור או את התנועות הנלוות. שלב s8: מסמכי חומר 261 אוטומטיים, " +
          "כשלים ל-AFFW ותיקון ב-COGI. שלב s9: מסמך חומר 101 לאצווה חדשה.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-process-flow.ts#s7",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריכי התהליך 'אחזקת שבר מקצה לקצה' ו'ייצור-למלאי תהליכי מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "בצד התחזוקה: 'בצע עבודה ואשר שעות וצריכת חומרים' ב-IW41 (טבלאות AFRU, MSEG), והטעות השכיחה היא " +
          "תקופת רישום סגורה שמפילה את האישור; אישורים פתוחים מונעים TECO. בצד תעשיות תהליכיות: 'דווח אישור, " +
          "Backflush רכיבים וקבלת תוצר לאצווה' ב-COR6N (טבלאות AFRU, RESB, MATDOC, MCH1), והטעות השכיחה היא " +
          "Backflush שנכשל ונופל ל-COGI; ההרחבות הרלוונטיות CONFPP01, CONFPP05 ו-WORKORDER_CONFIRM.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-corrective",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F2730, F5104A, F3364",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "Confirm Jobs (F2730): אישור עבודות תחזוקה, תפקיד SAP_BR_MAINTENANCE_TECHNICIAN, ‏OData‏ " +
          "API_MAINTENANCEORDERCONF, טרנזקציות GUI‏ IW41 ו-IW42, טבלה AFRU. Perform Maintenance Jobs " +
          "(F5104A): פתרון One-Stop-Shop לטכנאי (פעולות, רישום זמן, רכיבים, מדידות ונתוני תקלה), אותו תפקיד, " +
          "טרנזקציית GUI‏ IW41, טבלאות AUFK, AFIH, AFVC, AFRU. Confirm Process Order (F3364): אישור שלבים " +
          "כולל Backflush וקבלת תוצרת, תפקיד SAP_BR_PRODN_OPERATOR_PROC, ‏OData‏ " +
          "API_PROC_ORDER_CONFIRMATION_2_SRV, טרנזקציית GUI‏ COR6N, טבלאות AFRU ו-RESB.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2730",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "מרכז התקלות של הפרויקט: confirm-period-closed, cogi-stuck, ru505-backflush-stock, " +
          "phase-confirm-sequence, pm-confirmation-final-flag, teco-blocked, update-termination-sm13",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אישור נכשל בתקופה סגורה (M7053): לפתוח תקופת MM ב-MMRV או FI/CO ב-OB52. תנועות Backflush תקועות " +
          "ב-COGI ו-AFFW בגלל חוסר מלאי, אצווה חסומה או תקופה סגורה; RU-505 מציין חוסר מלאי לרכיב Backflush. " +
          "אישור שלב מחוץ לרצף נחסם לפי מפתח הבקרה והקשרים בין השלבים. אישור שלא סומן סופי משאיר את הפקודה " +
          "ב-PCNF. סגירה טכנית נחסמת באישורים, היתרים או תנועות פתוחים. הודעת הצלחה בלי מסמך חומר או FI " +
          "מקורה במשימת Update שנכשלה ונקראת מחדש ב-SM13.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#confirm-period-closed",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות IW41 ו-COR6N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "IW41 כותבת ל-AFRU, מזינה עלויות בפועל וקיבולת, ואישור סופי סוגר פעולה ומאפשר התקדמות ל-TECO; עלות " +
          "הפעילות נגזרת ממרכז העבודה (CRCO) ומהמחיר ב-KP26 ונרשמת ל-CO, וב-S/4HANA דרך ACDOCA; לדיווח המוני " +
          "IW44 ו-IW48 או BAPI ברקע. COR6N מעדכנת AFRU, מבצעת Backflush (261) וקבלת תוצרת אוטומטית (101), " +
          "מזכה Resources ל-CO, ביטול דרך CORS, ושגיאות תנועה נופלות ל-COGI; ההמלצה: לנטר COGI יומית " +
          "ולהשתמש ב-CORS לתיקון במקום בדיווח שלילי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW41",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Apps Used in Service with Advanced Execution | Service",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c9b5e9de6e674fb99fff88d72c352291/13972e812fd6416f950b9afd83900ecf.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim:
          "תיעוד 2025 FPS01 מונה את 'Enter PM Order Confirmation (IW41)' בין האפליקציות שבשימוש: IW41 מתועדת " +
          "בשימוש במהדורת ה-On-Premise הנוכחית (אומת ברשומת tx:IW41).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Linear Data in Maintenance Documents | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/3a576ff7b13d4f59851307b8d49e0623.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim:
          "תיעוד Maintenance Management הנוכחי (2025 FPS01) מקבץ את IW41 עם IW43/IW45 כטרנזקציות ה-Confirmation, " +
          "להבדיל מדיווח הזמן הקיבוצי IW42/IW44/IW48 (אומת ברשומת tx:IW41).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Confirmation Scenarios | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/7c1190a34ad244b7b63feb1443db1622.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim:
          "תהליך דיווח הזמן הסטנדרטי רץ באפליקציית Perform Maintenance Jobs ‏('You can enhance the standard " +
          "time confirmation process in the Perform Maintenance Jobs app') (אומת ברשומת tx:IW41).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE_TX_02,
        claim:
          "'The Confirm Jobs app (W0020) has been deleted and is no longer available on the SAP Fiori " +
          "launchpad': נמחקה החל מ-S/4HANA 2023; אינה חלופה תקפה ל-IW41 (אומת ברשומת tx:IW41).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Shift-Related Confirmation | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/3400b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim:
          "הסניפט מונה 'Time ticket (single-screen entry) CO11N/COR6N' ולצדו 'Confirmation production/process " +
          "order (order header) CO15/CORK': COR6N היא דיווח ה-Time Ticket חד-המסך בצד הזמנות התהליך (אומת " +
          "ברשומת tx:COR6N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim:
          "דף ההשוואה הרשמי מציין 'App ID COOISPI COHVPI F4587/ F5323' ואת השורה 'Confirm Process Order " +
          "Operation (COR6N) No No Yes': פעולת האישור זמינה באפליקציות Manage Process Orders / Manage Process " +
          "Order Operations ‏(F4587/F5323) ולא ב-COOISPI/COHVPI (אומת ברשומת tx:COR6N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create a Single Order Operation Confirmation | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/25fae824604447bb9a2dddc6363ce51b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "ב-S/4HANA On-Premise 2025 FPS01 מתועדת פעולת יצירה של אישור פעולה בודד בפקודת תחזוקה דרך שירות " +
          "ה-OData: 'Create a single order operation confirmation ... POST: " +
          "<host>/sap/opu/odata/sap/API_MAINTORDERCONFIRMATION/MaintOrderConfirmation' (כלשון הסניפט). ערוץ " +
          "היצירה של אישורי תחזוקת מפעל ב-API הרשמי מתועד אפוא גם בגרסה העדכנית; ה-BAPI עצמו אינו מוזכר " +
          "ברשומה (אומת ברשומת fm:BAPI_ALM_CONF_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Order Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/fc8dbf5e46004f1c9069b6ac4301c384.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_21,
        claim:
          "עמוד השירות במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01 קובע בסניפט: 'Process Order " +
          "Confirmation Technical name: API_PROC_ORDER_CONFIRMATION_2_SRV This service enables you to process " +
          "confirmations for process orders, namely time ticket and time event confirmations for ... operations " +
          "of process orders and confirmations on order level', ומונה בטבלת הישויות את 'Process Order " +
          "Confirmation (ProcOrdConf2) Time ticket/time event confirmation or confirmation on order level' ואת " +
          "'Process Order Confirmation Material Movements'. הסניפט אינו נוקב בשם BAPI_PROCORDCONF_CREATE_TT " +
          "ואינו מציג את השירות כמחליף שלו (אומת ברשומת fm:BAPI_PROCORDCONF_CREATE_TT).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Background Information | Time Data Recording and Administration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7c1ef52f3fea49d1944b266772379e52/85e0e353a53d424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim:
          "תיעוד Time Data Recording and Administration (גיליון הזמן) לגרסת 2025 FPS01 נוקב ב-AFRU כטבלת היעד " +
          "של האישורים בשני רכיבים: 'Plant Maintenance/Customer Service AFRU (Order Completion Confirmations)' " +
          "ו-'Project System AFRU (Order Completion Confirmations)'. הסניפט מוסיף כי נתונים שגויים בהעברה " +
          "נשמרים בטבלאות 'Confirmations with errors AFRH, AFRV' (אומת ברשומת table:AFRU).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 4 'Work Order Cycle', סעיף 4.6.1 'Completion Confirmations'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את מחזור פקודת העבודה ובו סעיפי האישור: אישורי ביצוע (4.6.1) וסגירה טכנית (4.6.2); הספר " +
          "משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#4.6.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (SAP PRESS, תכנון ייצור ב-S/4HANA), פרק 6, סעיף 6.7 'Confirmation'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הסעיף מתעד את שכבות האישור בייצור: אישור ברמת הפעולה (6.7.1), דיווח התקדמות (6.7.2), אישור ברמת " +
          "הפקודה (6.7.3), ביטול אישור (6.7.4) והצגת אישור (6.7.5); הספר משמש כאן להפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#6.7",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות IW41, ‏IW43, ‏IW45, ‏CO11N, ‏CO13, ‏CO15 ו-COR6N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רשימות ה-bapis ברשומות: IW41 נוקבת ב-BAPI_ALM_CONF_CREATE, ‏BAPI_ALM_CONF_GETDETAIL " +
          "ו-BAPI_ALM_CONF_CANCEL; IW43 ב-BAPI_ALM_CONF_GETDETAIL ו-BAPI_ALM_CONF_GETLIST; IW45 " +
          "ב-BAPI_ALM_CONF_CANCEL, והיפוך העלות ב-S/4HANA ל-Universal Journal; CO11N ב-BAPI_PRODORDCONF_CREATE_TT, " +
          "‏BAPI_PRODORDCONF_GET_TT_PROP ו-BAPI_PRODORDCONF_CANCEL; CO15 ב-BAPI_PRODORDCONF_CREATE_HDR " +
          "ו-BAPI_PRODORDCONF_CANCEL; CO13 ב-BAPI_PRODORDCONF_CANCEL; COR6N ב-BAPI_PROCORDCONF_CREATE_TT " +
          "ו-BAPI_PROCORDCONF_CANCEL. שדה s4Delta של CO11N, ‏CO13 ו-CO15 קובע שהן נשמרות ב-S/4HANA ושהתנועות נרשמות " +
          "ל-MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW43",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PM) לצד רישום ה-BAPI המועשר",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE_FM_14,
        claim:
          "המאגר מתאר את ה-BAPI כאישור ביצוע פקודת אחזקה (שעות, כמויות, מרכז עבודה) בזיקה ל-IW41/IW42 ולטבלאות " +
          "AFRU/AFKO, וקובע 'זמין ב-ECC' ו-'זמין ב-S/4HANA; חלופה: Fiori Confirm Maintenance Order'. רישום ה-BAPI " +
          "המועשר (data/bapi-enrichment.pm.ts) מוסיף פרמטרים TIMETICKETS (BAPI_ALM_TIMECONFIRMATION), DETAIL_RETURN " +
          "ו-RETURN, ומיקום בשרשרת ORDER_CHAIN בין שחרור הפקודה להשלמה טכנית. רשומת function-intel נוקבת בטבלת קלט " +
          "CONFIRMATIONS (ORDERID, OPERATION, WORK, FIN_CONF) ואילו bapi-enrichment.pm.ts נוקב ב-TIMETICKETS; שני " +
          "מקורות הפרויקט אינם מסכימים על שם הפרמטר ואף אחד מהם לא אומת רשמית. שם החלופה 'Confirm Maintenance " +
          "Order' אינו מזהה Fiori (F-ID) בקטלוג האפליקציות של הפרויקט, וזמינות ה-BAPI ב-S/4HANA נשענת על נתוני " +
          "הפרויקט בלבד. (אומת ברשומת fm:BAPI_ALM_CONF_CREATE)",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_CONF_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט: bapi-enrichment.pppi.ts#BAPI_PROCORDCONF_CREATE_TT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הרישום מתאר BAPI כותב (Confirm) של Process Order Confirmation עם הפרמטרים 'IMP POST_WRONG_ENTRIES · TAB " +
          "TIMETICKETS, GOODSMOVEMENTS, LINK_CONF_GOODSMOV, DETAIL_RETURN, RETURN', טבלאות AFRU ו-AFVC, ומציין " +
          "בהערת ה-QA: תנועות סחורה נלוות דרך GOODSMOVEMENTS, חובה COMMIT, וביטול דרך BAPI_PROCORDCONF_CANCEL. " +
          "רשומת האימות fm:BAPI_PROCORDCONF_CREATE_TT מתעדת שרשומות המאגר חלוקות על שמות הפרמטרים ושאף אחת מהן לא " +
          "אומתה מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PROCORDCONF_CREATE_TT",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7d6c7de7b9234747978552d4ca44466b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE_FM_14,
        claim:
          "רשומת החיפוש מתעדת שירות OData נכנס סינכרוני לאישורי פקודות תחזוקה: 'Technical name: " +
          "API_MAINTORDERCONFIRMATION. This synchronous inbound service enables you to create new maintenance order " +
          "confirmations and cancel confirmations'; הישות LongText 'Allows you to create long text for a given " +
          "confirmation'. שם ה-BAPI‏ BAPI_ALM_CONF_CREATE אינו מופיע בכותרת או בסניפט; הזיקה היא זהות המטרה העסקית " +
          "(יצירת אישור לפעולת פקודת תחזוקה), לא הצהרת החלפה. (אומת ברשומת fm:BAPI_ALM_CONF_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Overview | Maintenance Order Operation Confirmation",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://api.sap.com/api/OP_API_MAINTORDERCONFIRMATION_0001/overview",
        accessedAt: DATE_FM_14,
        claim:
          "‏OP_API_MAINTORDERCONFIRMATION_0001 ‏(Maintenance Order Operation Confirmation) רשום ב-SAP Business " +
          "Accelerator Hub; הרישום (כותרת וכתובת בלבד) תומך בקיומו של ה-API הרשמי. ישויות, פרמטרים ומצב השחרור " +
          "בעמוד ה-Hub לא נקראו: העמוד מחזיר 401 ל-HEAD ומפנה להתחברות OAuth ב-GET, ולכן תוכנו לא נקרא. (אומת " +
          "ברשומת fm:BAPI_ALM_CONF_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Perform Maintenance Jobs - SAP Fiori Apps Reference Library (F5104A, S32OP, fal-app.mjs)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5104A')/S32OP",
        accessedAt: DATE28,
        claim:
          "ספריית ה-Fiori ל-S32OP ‏(S/4HANA 2025 FPS01) מציגה את F5104A ‏'Perform Maintenance Jobs', אפליקציית " +
          "SAPUI5 טרנזקציונית ברכיב PM-FIO-WOC-JC ‏(Fiori UI for PM Completion Confirmations), תפקידים " +
          "SAP_BR_MAINTENANCE_TECHNICIAN ו-SAP_BR_MAINT_SUPERVISOR, קטלוג עסקי SAP_EAM_BC_MNTJOB_MNG, שירותי OData‏ " +
          "API_MAINTNOTIFICATION, ‏API_MAINTORDERCONFIRMATION ו-UI_MAINTENANCEJOB_MANAGE, טרנזקציה מובילה IW41 " +
          "וקשורות IW21, IW22, IW23 ו-IW32, ויישומים קודמים W0016 Display Job List ו-W0020 Confirm Jobs.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation Events | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/244804bcac324a88953e5cc346ef9a9a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (נקרא דרך שירות התוכן של הפורטל, loio 244804bcac324a88953e5cc346ef9a9a): האובייקט העסקי מפעיל " +
          "את האירוע Created ('triggered when a maintenance order operation confirmation is created') ואת האירוע " +
          "Canceled, ובשניהם המטען הוא 'MaintOrderConfirmation: Confirmation Number' ו-'MaintOrderConfirmation: " +
          "Confirmation Counter'; 'Business events are published on the SAP Business Accelerator Hub'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation Events | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/72cac18d95134727aff9fe426add88f3.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE28,
        claim:
          "גוף רשומת What's New 2021 (loio 72cac18d95134727aff9fe426add88f3): 'With this feature you can enable the " +
          "maintenance order confirmation business object to trigger the following business events: Created " +
          "Canceled. An external service or system can be configured to consume these events', עם 'Type New', " +
          "'Scope Item Reactive Maintenance (4HH) Proactive Maintenance (4HI)', 'Application Component PM - WOC " +
          "(Plant Maintenance - Work Order Confirmation)' ו-'Valid as Of SAP S/4HANA 2021'. הרשומה אינה קובעת " +
          "שפריטי ההיקף הם הפניית התהליך של האישורים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Time Ticket Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/347e141637354ad4acf603c8cdeeb07d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_21,
        claim:
          "עמוד הפעולות לדיווח Time Ticket במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01 פותח בסניפט " +
          "ב-'Time Ticket Confirmation For time ticket confirmations, the Process Order Confirmation API offers the " +
          "operations listed in the following table', ומציג בטבלה את 'Create Time Ticket Confirmation POST POST " +
          "<host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/ProcOrdConf2' לצד 'Fetch Proposals for " +
          "Quantities, Activities, Dates and Times, Personnel Data POST', 'Cancel Confirmation POST POST " +
          "<host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/CancelProcOrdConf' ו-'Fetch Proposals for " +
          "Goods Movements POST POST <host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/GetGdsMvtProposal'. " +
          "זו חלופת OData מתועדת ליצירת דיווח Time Ticket לפקודת תהליך, כלומר לאותו תרחיש עסקי של ה-BAPI. יש להבחין " +
          "בין עמוד זה לבין עמוד באותו שם במדריך המתאר את שירות פקודות הייצור הדיסקרטי " +
          "(API_PROD_ORDER_CONFIRMATION_2_SRV, loio a1f8c8c3e63d4dac90c198d1d0506676). העמוד אינו נוקב בשם ה-BAPI. " +
          "(אומת ברשומת fm:BAPI_PROCORDCONF_CREATE_TT)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Cancel Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/5779eea65d7f4c32a036ea23b7a9812e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_24,
        claim:
          "עמוד Cancel Confirmation במדריך APIs for Manufacturing למהדורת S/4HANA On-Premise 2025 FPS01 (loio " +
          "5779eea65d7f4c32a036ea23b7a9812e, תאריך 2026-02-24; הגוף נקרא ב-2026-09-24 דרך שירות התוכן של הפורטל, " +
          "deliverable 40374287, buildNo 1779) מתעד את ביטול הדיווח בשירות ה-OData: 'To cancel a confirmation, you " +
          "use the HTTP method POST on the ProcOrdConf2 entity', 'function import CancelProcOrdConf', 'When you " +
          "cancel a confirmation, any associated goods movements get reversed'. הפרמטרים ConfirmationGroup " +
          "ו-ConfirmationCount מסומנים Mandatory; ExternalSystemConfirmation, ConfirmationText ו-PostingDate " +
          "מסומנים Optional; ביטול כמה דיווחים לאותה פקודה נשלח 'in reverse order of creation'. הנתיב המודפס: " +
          "/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/CancelProcOrdConf. העמוד אינו נוקב בשם " +
          "BAPI_PROCORDCONF_CANCEL ואינו מציג את השירות כיורש שלו. (אומת ברשומת fm:BAPI_PROCORDCONF_CANCEL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Integration of Extended Warehouse Management into PP With Synchronous Goods Movements | Extended " +
          "Warehouse Management Integration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/b9cc83277e5645d780aba27800777163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_21,
        claim:
          "שאילתה על השם הטכני BAPI_PROCORDCONF_CREATE_TT במוצר SAP_S4HANA_ON-PREMISE מחזירה עמוד זה לגרסת 2025 " +
          "FPS01. סניפט רשומת החיפוש מורכב משני קטעים, המוצגים בו בסדר הפוך לסדר הקריאה ומופרדים בסימן השמטה: קטע " +
          "אחד הוא 'The synchronous goods movements are also possible when using the following PP BAPIs and PP " +
          "APIs: BAPI_PRODORDCONF_CREATE_HDR BAPI_', והקטע השני הוא 'BAPI_PRODORDCONF_CANCEL " +
          "BAPI_PROCORDCONF_CREATE_HDR BAPI_PROCORDCONF_CREATE_TT BAPI_PROCORDCONF_CANCEL " +
          "API_PROD_ORDER_CONFIRMATION_2_SRV API_PROC_ORDER_CONFIRMATION_2_SRV Repetitive Manufacturing'. שם ה-BAPI " +
          "נקוב אפוא כלשונו בתיעוד הרשמי של הגרסה העדכנית, ברשימת ה-PP BAPIs וה-PP APIs לתנועות סחורה סינכרוניות, " +
          "לצד שירות ה-OData המקביל. הסניפט מונה שמות בלבד: הוא אינו מתאר את פרמטרי ה-BAPI, אינו קובע את מצב השחרור " +
          "שלו ואינו מציג את ה-API כמחליף. הרצף המלא של הרשימה בגוף העמוד לא נקרא, משום שגוף עמודי help.sap.com הוא " +
          "מעטפת JavaScript. (אומת ברשומת fm:BAPI_PROCORDCONF_CREATE_TT)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/e77b762e243b4045ad1f1f048f6aab87.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio e77b762e243b4045ad1f1f048f6aab87, נקרא ב-2026-09-28 דרך שירות התוכן של הפורטל, " +
          "deliverable 40374287, build 1779): 'Production Order Confirmation Technical name: " +
          "API_PROD_ORDER_CONFIRMATION_2_SRV This service enables you to process confirmations for production " +
          "orders, namely time ticket and time event confirmations', והישות 'Production Order Confirmation " +
          "(ProdnOrdConf2) Time ticket/time event confirmation or confirmation on order level'. הסניפט אינו נוקב " +
          "בשם BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Time Ticket Confirmation for Phases | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/5a8abf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 5a8abf53f106b44ce10000000a174cb4): 'You can use this function to perform time ticket " +
          "confirmations directly from within production by using a process message'; ניתן לאשר פעילויות, כמות " +
          "תפוקה ופסולת ומשאב ראשי; תנאים מוקדמים: 'The control key that has been assigned to the phase allows " +
          "confirmation. The process order has been released. No time event confirmation has been created for the " +
          "phase so far'. סניפט רשומת החיפוש: 'Process message category PI_PHCON Message destination PI15 Process " +
          "data request PH_CON'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Accessing of Order Confirmation | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/4989bf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 4989bf53f106b44ce10000000a174cb4): 'You can access order confirmation for phases from " +
          "within a PI sheet using the dynamic function call CONF_PH. In the function call, the following " +
          "information is transferred to the function module COPF_ENTER_CONFIRMATION: Process order ... Phase ... " +
          "Transaction to be used', עם הטרנזקציות לאישור Time Ticket, לאישור Time Event ולתצוגה; תחזוקת אישור אינה " +
          "אפשרית בעיבוד PI sheet לבדיקה או בתצוגת PI sheet.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Integration | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 7d61c9ecd5754e8cb0e925639b5d8bb0): 'You create a production order (for example, using " +
          "transaction CO01, Create Production Order)'; 'The system transfers the order data to the MES using IDoc " +
          "LOIPRO05 according to the filter criteria you set in the DRF'; 'You make changes to the production order " +
          "already distributed (for example, using transaction CO02, Change Production Order). The system transfers " +
          "these changes to the MES using IDoc LOIPRO05', ובהמשך 'Information such as confirmations for production " +
          "quantities is transferred to the S/4HANA system via a BAPI interface. The S/4HANA system updates the " +
          "production order to include the production data from the MES'. העמוד אינו נוקב בשם ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Confirmation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/5e053c432869473e9cdea33d7e0118c0.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 5e053c432869473e9cdea33d7e0118c0): 'CDS View Name I_ProductionOrderConfirmation " +
          "Analytical Data Category Fact', 'This CDS view retrieves production order confirmation data (table " +
          "AFRU)', 'This view represents the SAP object type ProductionOrderConfirmation (BusinessObject)', והשאלות " +
          "העסקיות: 'Which confirmations exist for a production order? How many confirmations are reversals or have " +
          "been reversed? Who entered a production order confirmation? Which work quantities (activities) have been " +
          "posted with a production order confirmation? What are the yield, scrap, and rework quantities of a " +
          "production order confirmation?'; הרשאת קריאה בסוג ההגבלה AUFART_WERKS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Scrap Reason | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/aed365571edd0522e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio aed365571edd0522e10000000a44147b): 'Scrap Reason App ID: F2216 With this app you receive " +
          "alerts on Key Performance Indicators (KPIs)'; הדוח מציג את התפלגות 'actual scrap recorded in production " +
          "confirmations in the dimensions of time, work center, material, plant, and reason for variance'; 'Smart " +
          "Business KPI tile: Get the work centers with maximum average scrap and rework for the last 24 hours'; " +
          "'Automatically calculated fields: Actual scrap percentage, actual yield percentage and actual rework " +
          "percentage'; תצוגות CDS: I_MfgOrderOperationConfCube ו-C_MfgOrdOpConfScrapReasonQ.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operation Scrap | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/a5d065571edd0522e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio a5d065571edd0522e10000000a44147b): 'Operation Scrap App ID: F2034 With this app you can " +
          "compare actual scrap figures recorded in the production confirmations with the expected scrap that was " +
          "defined in the order operation'; 'This app considers only orders that have been finally confirmed'; " +
          "'Automatically calculated fields: Operation's expected scrap percentage, operation's actual scrap " +
          "percentage, operation's actual yield percentage, operation's actual rework percentage'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Execution Duration | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/b62f6957b64b0222e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio b62f6957b64b0222e10000000a44147b): 'Production Execution Duration App ID: F2172 With " +
          "this app you can compare the planned and actual operation durations'; 'The time that was actually " +
          "required for execution is recorded in the production confirmations'; 'This app considers only orders " +
          "that have been finally confirmed'; 'Automatically calculated fields: PlannedOperationDuration, " +
          "ActualOperationDuration, OperationDurationDeviation, OperationDurationDeviationPercent'; 'This app uses " +
          "the following CDS views: C_MfgOrderOpExecDurnQry I_MfgOrderOperationCube'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Scrap Reasons - SAP Fiori Apps Reference Library (F2216, S32OP, fal-app.mjs)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2216')/S32OP",
        accessedAt: DATE28,
        claim:
          "ספריית ה-Fiori ל-S32OP מציגה את F2216 כאפליקציה אנליטית (SAP Smart Business generic drill down app) " +
          "ברכיב PP-FIO-SFC, עם התפקידים SAP_BR_PRODN_ENG_DISC, ‏SAP_BR_PRODN_ENG_PROC, ‏SAP_BR_PRODN_PLNR, " +
          "‏SAP_BR_PRODN_SUPERVISOR_DISC ו-SAP_BR_PRODN_SUPERVISOR_PROC, קטלוג עסקי SAP_SCM_BC_PRODN_PERF_MNTR " +
          "'Production - Performance Monitoring', שירות C_MFGORDOPCONFSCRAPREASONQ_CDS, טרנזקציה מובילה COOIS " +
          "וקשורה COOISPI. הפלט של fal-app.mjs לאותו יום עבור F2034 ו-F2172 מדפיס אותם תפקידים, אותו קטלוג ואותן " +
          "טרנזקציות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Calculating Work-Center-Based Key Figures (S022, S024) | Components of the Logistics Information System " +
          "(LIS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/403655493b024be6af15811c1d6962ef/2e12c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 2e12c453f57eb44ce10000000a174cb4): מדדי הניתוח לפי מרכז עבודה ב-Shop Floor Information " +
          "System 'originate from the information structures (S022 (operation) and S024 (work center)'; 'arranging " +
          "into a period is done according to the confirmation schedule'; המדדים המתוארים: Lead Time (עד 'the " +
          "completion confirmation date'), Lead Time Deviation, Execution Time, Queue Time, Queue Time Deviation " +
          "ו-Schedule Deviation.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Logistic Information System in PP (SAP S/4HANA 2025 FPS01 Simplification List, item 9.2.1)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE28,
        claim:
          "פריט 9.2.1 ברשימת הפישוט של SAP S/4HANA 2025 FPS01 (רכיב היישום PP-IS), כפי שנקרא בטקסט שחולץ מה-PDF " +
          "הרשמי (scratchpad/official/SIMPL_OP2025.pdf.txt, שורות 32939-32945 ו-32957-32959), קובע תחת Reason and " +
          "Prerequisites: 'The shop floor information system was part of the logistics information system LIS. The " +
          "shop floor information system is part of the SAP S/4HANA compatibility scope, which comes with limited " +
          "usage rights', ובהמשך 'The shop floor information system was used to compare planned vs. actual values " +
          "like lead time, execution time, queue times, scrap, and so on'. בין מבני המידע שהפריט מונה: 'S022: " +
          "Operation data for work center' ו-'S024: Totals for work center'. כלומר מדדי S022 ו-S024 הם יכולת LIS " +
          "קלאסית שמקורה ב-ECC, וב-S/4HANA היא שייכת ל-compatibility scope עם זכויות שימוש מוגבלות.",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך חוצת מודולים (PM ו-PP-PI). כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת " +
      "ברשומות tx:IW41, ‏tx:COR6N, ‏fm:BAPI_ALM_CONF_CREATE, ‏fm:BAPI_PROCORDCONF_CREATE_TT ו-table:AFRU. Old (נכון " +
      "ל-2026-09-22): שדה kpis הושמט: המאגר אינו מתעד מדדי ביצוע לתהליך האישור, ומוטב פער גלוי על פני השלמה " +
      "מהזיכרון. New (2026-09-28): נוסף kpis מעמודים רשמיים שגופם נקרא (F2216, ‏F2034, ‏F2172 ומבני LIS‏ S022 " +
      "ו-S024); שורת ה-LIS מסויגת לפי הפריט 'S4TWL - Logistic Information System in PP', שלפיו מערכת המידע של רצפת " +
      "הייצור שייכת ב-S/4HANA ל-compatibility scope. הסתייגות על מזהי Fiori: המזהים F2730 ו-F3364 מגיעים מקטלוג " +
      "הפרויקט בלבד. רשומת tx:IW41 קובעת ש-'Confirm Jobs (F2730)' סותר את התיעוד הרשמי, שלפיו אפליקציית Confirm " +
      "Jobs ‏(W0020) הוצאה משימוש ב-2022 ונמחקה ב-2023, ושחלופת ה-Fiori המתועדת לטכנאי היא Perform Maintenance Jobs " +
      "‏(F5104A). רשומת tx:COR6N קובעת שהמזהה F3364 לא אושש באף מקור רשמי, ושנתיב הדיווח המתועד ב-On-Premise הוא " +
      "פעולת Confirm Process Order Operation ‏(COR6N) באפליקציות F4587 ו-F5323, שאינן במילון הפרויקט; לכן F3364 " +
      "נרשם כאן כרשומת קטלוג ולא כחלופה רשמית. טבלת AFFW, טבלת כשלי ה-Backflush, אינה במילון הפרויקט ולכן מופיעה " +
      "בפרוזה בלבד, וכך גם MATDOC. לא בוצעה בדיקה במערכת SAP חיה. השלמה 2026-09-28 (Old → New): נוספו " +
      "process.interfaces (10 שורות) ו-process.kpis (4 שורות), ו-22 שורות ראיה. המשפט 'כל שדה בפרופיל נגזר מרשומות " +
      "המאגר הנקובות או מעמוד רשמי שכבר אומת' מתאר את שדות הפרופיל שנכתבו ב-2026-09-22; השדות interfaces ו-kpis " +
      "נשענים בנוסף על גופי עמודים רשמיים שנקראו דרך שירות התוכן, על ספריית ה-Fiori, על הטקסט שחולץ מרשימת הפישוט " +
      "של 2025 FPS01 ועל רשומות מאגר נוספות. הסוקר הקודם: 'Design-audit continuation §11 (process catalog)'. היקף " +
      "ה-kpis: כל המדדים הרשמיים שאותרו הם בצד הייצור (אישורי ייצור, כולל תפקידי ייצור תהליכי לפי ספריית ה-Fiori); " +
      "בצד התחזוקה לא אותר עמוד רשמי הנוקב במדד של תהליך האישור (החיפושים 'maintenance order confirmation actual " +
      "work analysis app KPI' ו-'Plant Maintenance Information System key figures actual work confirmation' החזירו " +
      "אפליקציות עלות כמו Actual Cost Analysis ו-Maintenance Order Costs, שאינן מייחסות את המדד לאישור), ולכן זהו " +
      "פער גלוי. מזהים הנקובים בפרוזה בלבד משום שאינם במילון הפרויקט: F2216, ‏F2034, ‏F2172, ‏W0016, " +
      "‏BAPI_ALM_CONF_GETDETAIL, BAPI_ALM_CONF_GETLIST, ‏BAPI_ALM_CONF_CANCEL, משפחת BAPI_PRODORDCONF_*, " +
      "‏BAPI_PROCORDCONF_CREATE_HDR, ‏COPF_ENTER_CONFIRMATION, ‏I_MfgOrderOperationConfCube, " +
      "‏I_MfgOrderOperationCube. פריטי ההיקף 4HH ו-4HI מודפסים ברשומת What's New 2021 של אירועי האישור בלבד, ואינם " +
      "נרשמים כהפניית התהליך. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ========================================================= goods movements */
  {
    slug: "goods-movement-process",
    he: "תנועות סחורה בתהליכי תחזוקה וייצור: ניפוק לפקודה, קבלת תוצרת וביטול",
    en: "Goods movement process in maintenance and production: issue to order, receipt of output and reversal",
    module: "Cross",
    summary:
      "תנועת סחורה רושמת מסמך חומר ומעדכנת מלאי, עלות ותכנון. בתהליכי תחזוקה וייצור היא מופיעה כניפוק רכיבים " +
      "לפקודה (261), כקבלת תוצרת אל המלאי (101, לרוב לאצווה) וכביטול של אלה. ב-S/4HANA הנתונים נשמרים בטבלה " +
      "אחת, MATDOC, ו-MKPF ו-MSEG נשארות לקריאה דרך תצוגות תאימות.",
    context:
      "לפי רשומות המאגר, הניפוק והקבלה נרשמים ב-MIGO ובמשפחת טרנזקציות ה-MB הישנה, וקבלת תוצרת של פקודה " +
      "יכולה להיווצר אוטומטית באישור לפי מפתח הבקרה. פריט הפישוט הרשמי S4TWL - AVAILABILITY OF TRANSACTIONS " +
      "IN MM-IM קובע שטרנזקציות ה-MB הוחלפו ב-MIGO ובמודולי הפונקציה BAPI_GOODSMVT_CREATE ו-" +
      "BAPI_GOODSMVT_CANCEL, ומורה להסב קוד לקוח הקורא להן. תיעוד ניהול החומרים של 2025 FPS01 מונה את MIGO " +
      "ואת וריאנטי הכניסה שלה כקודי הטרנזקציה לתנועות סחורה. שכבת ההשפעה של המאגר מסמנת את מעבר MKPF ו-MSEG " +
      "ל-MATDOC כפריט פישוט בסיכון גבוה.",
    steps: [
      {
        he: "לבדוק את דרישת החומר: רכיבי הפקודה מייצרים רזרבציות, והניפוק צורך אותן.",
        xrefs: ["table:RESB", "obj:maintenance-order", "obj:process-order"],
      },
      {
        he: "לנפק רכיבים לפקודה בתנועה 261: בתחזוקה ניפוק חלפים מהמלאי, בייצור ניפוק ידני או אוטומטי דרך Backflush באישור.",
        xrefs: ["tx:MIGO", "table:RESB", "bp:confirmation-process"],
      },
      {
        he: "לקבל את התוצרת אל המלאי בתנועה 101, לרוב לאצווה חדשה עם מאפיינים ותאריך תפוגה; קבלה אוטומטית אפשרית באישור לפי מפתח הבקרה.",
        xrefs: ["tx:MIGO", "table:MCH1", "obj:batch"],
      },
      {
        he: "לרשום את התנועה במסך האחד MIGO, או בקוד דרך BAPI_GOODSMVT_CREATE: לפי פריט הפישוט הרשמי אלה היעדים שהחליפו את משפחת MB01 עד MBST.",
        xrefs: ["tx:MIGO", "fm:BAPI_GOODSMVT_CREATE", "tx:MB01", "tx:MB11", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31"],
      },
      {
        he: "לוודא שקביעת החשבונות (OBYC) מחזירה חשבון לסוג התנועה ולמחלקת ההערכה: בלעדיה התנועה נכשלת או שאין מסמך FI.",
        xrefs: ["table:MBEW"],
      },
      {
        he: "לבטל תנועה שגויה בנתיב הייעודי: לפי פריט הפישוט MBST מוחלפת ב-BAPI_GOODSMVT_CANCEL, ו-MB02/MB03 ב-MIGO_DIALOG.",
        xrefs: ["tx:MBST", "tx:MB02", "tx:MB03", "tx:MIGO"],
      },
      {
        he: "לאמת את התוצאה: השורה קיימת במסמך החומר, ודוחות התנועות והמלאי (MB51, ‏MB5B, ‏MMBE) נשענים ב-S/4HANA על תצוגות התאימות מעל MATDOC.",
        xrefs: ["tx:MB51", "tx:MB5B", "tx:MMBE", "obj:material-document"],
      },
      {
        he: "לקרוא תנועות בקוד דרך BAPI_GOODSMVT_GETITEMS ו-BAPI_GOODSMVT_GETDETAIL, ובפיתוח חדש דרך תצוגת ה-CDS של פריטי מסמך החומר; טווח בחירה רחב הוא כשל אופייני.",
        xrefs: ["fm:BAPI_GOODSMVT_GETITEMS", "fm:BAPI_GOODSMVT_GETDETAIL", "cds:I_MaterialDocumentItem"],
      },
      {
        he: "לא לכתוב ישירות ל-MSEG או ל-MKPF: הכתיבה עוברת דרך MIGO או ה-BAPI, והקריאה דרך תצוגות התאימות ו-CDS.",
        xrefs: ["table:MSEG", "table:MKPF", "bp:matdoc-read-through-compatibility"],
      },
    ],
    antiPatterns: [
      "INSERT או UPDATE ישיר ל-MSEG או ל-MKPF בקוד מותאם.",
      "ממשק BDC או CALL TRANSACTION על טרנזקציות MB במקביל ל-MIGO: מנגנון הנעילה שונה ועלולה להיווצר אי-עקביות מלאי.",
      "ניפוק ידני של רכיב שמוגדר גם כ-Backflush: צריכה כפולה של אותו רכיב.",
      "רישום GR ללא הגנה מפני כפילות בממשק: מלאי ועלות כפולים.",
      "קבלת תוצרת לחומר מנוהל אצוות ללא פרופיל מספור אצווה או בלי מאפיין חובה.",
    ],
    checks: [
      "חיובי: ניפוק 261 לפקודה צורך את הרזרבציה, וקבלה 101 מכניסה את התוצר לאצווה עם עלות.",
      "שלילי: חוסר מלאי זמין מפיל את הניפוק (M7021).",
      "אינטגרציה: קבלת תוצרת אוטומטית נוצרת באישור לפי מפתח הבקרה.",
      "לאחר המרה: רישום GR או GI ב-MIGO ומציאת השורה במסמך החומר; דוחות MB51 ו-MB5B נשענים על תצוגות תאימות.",
      "רגרסיה: קוד מותאם שקורא MKPF או MSEG ישירות נסרק ומוסב.",
    ],
    process: {
      purpose:
        "לרשום את זרימת החומר בתהליכי התחזוקה והייצור (ניפוק רכיבים לפקודה, קבלת תוצרת אל המלאי וביטול) " +
        "במסמך חומר אחד, כדי לעדכן מלאי, עלות ותכנון ולספק עקיבות לתנועות.",
      trigger: [
        { he: "פקודת תחזוקה או הזמנת תהליך משוחררת עם רכיבים מתוכננים.", xrefs: ["table:RESB"] },
        { he: "אישור פקודה שמפעיל Backflush או קבלת תוצרת אוטומטית.", xrefs: ["bp:confirmation-process"] },
        { he: "קבלת טובין להזמנת רכש בתהליך הרכש לתשלום.", xrefs: ["tx:ME21N", "fiori:F0843"] },
      ],
      preconditions: [
        { he: "תקופת רישום פתוחה ב-MM; אחרת התנועה נדחית.", xrefs: ["tx:MMRV"] },
        { he: "מלאי זמין ולא חסום לרכיב, ואצווה קיימת כשהחומר מנוהל אצוות.", xrefs: ["table:MARD", "table:MCH1"] },
        { he: "קביעת חשבונות תקפה (OBYC) למפתח התנועה ולמחלקת ההערכה של החומר.", xrefs: ["table:MBEW"] },
      ],
      masterData: [
        { he: "סוגי תנועה (261 ניפוק לפקודה, 101 קבלת תוצרת, 531 ועוד) והגדרתם." },
        { he: "ניהול אצוות בחומר ופרופיל מספור אצווה; מאפייני האצווה כוללים תאריך תפוגה.", xrefs: ["table:MCH1", "obj:batch"] },
        { he: "מחיר תקן או Material Ledger למחיר התנועה, ומחלקת הערכה לקביעת החשבונות.", xrefs: ["table:MBEW"] },
      ],
      roles: [
        { he: "פקיד מחסן (SAP_BR_WAREHOUSE_CLERK): רישום תנועות סחורה ביישום Post Goods Movement לפי קטלוג הפרויקט.", xrefs: ["fiori:F0843"] },
      ],
      transactions: [
        { he: "MIGO היא טרנזקציית המסך האחד לתנועות סחורה, ולפי התיעוד הרשמי מופיעה בלוח ה-Fiori כיישום Web GUI בשם Post Goods Movement.", xrefs: ["tx:MIGO"] },
        { he: "משפחת ה-MB הישנה: MB01, ‏MB02, ‏MB03, ‏MB11, ‏MB1A, ‏MB1B, ‏MB1C, ‏MB31 ו-MBST, שהפריט הרשמי מסמן כמוחלפות ב-MIGO וב-BAPI.", xrefs: ["tx:MB01", "tx:MB02", "tx:MB03", "tx:MB11", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31", "tx:MBST"] },
        { he: "דוחות ובקרה: MB51 תנועות, ‏MB5B יתרות לתאריך, ‏MMBE סקירת מלאי, ‏MB56 מעקב אצווה.", xrefs: ["tx:MB51", "tx:MB5B", "tx:MMBE", "tx:MB56"] },
        { he: "Fiori לפי קטלוג הפרויקט: Post Goods Movement (F0843) מעל API_MATERIAL_DOCUMENT_SRV; מצב האימות של המזהה מפורט בהערות.", xrefs: ["fiori:F0843"] },
      ],
      tables: [
        { he: "MKPF כותרת מסמך החומר ו-MSEG פריטיו; ב-S/4HANA שתיהן תצוגות תאימות מעל MATDOC (שאינה במילון הפרויקט).", xrefs: ["table:MKPF", "table:MSEG"] },
        { he: "RESB הרזרבציות שנצרכות בניפוק; MARD מלאי במחסן; MBEW הערכת החומר.", xrefs: ["table:RESB", "table:MARD", "table:MBEW"] },
        { he: "האובייקט העסקי מסמך חומר ותצוגת ה-CDS של פריטיו.", xrefs: ["obj:material-document", "cds:I_MaterialDocumentItem"] },
      ],
      integrationPoints: [
        { he: "אישור פקודה: Backflush של הרכיבים וקבלת תוצרת אוטומטית יוצרים את מסמכי החומר.", xrefs: ["bp:confirmation-process", "tx:COGI"] },
        { he: "רכש לתשלום: קבלת טובין להזמנת רכש מעדכנת מלאי ומזינה את התאמת שלוש הדרכים.", xrefs: ["tx:ME21N", "tx:MIGO"] },
        { he: "ממשק תוכניתי: BAPI_GOODSMVT_CREATE לכתיבה, ‏BAPI_GOODSMVT_GETITEMS ו-BAPI_GOODSMVT_GETDETAIL לקריאה, ואחריהם BAPI_TRANSACTION_COMMIT בכתיבה.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETITEMS", "fm:BAPI_GOODSMVT_GETDETAIL", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"] },
        { he: "שירות OData רשמי לאותו תרחיש: Material Documents - Read, Create ‏(API_MATERIAL_DOCUMENT, נתיב API_MATERIAL_DOCUMENT_SRV)." },
        { he: "הרחבות: Customer Exit‏ MBCF0002 ו-BAdI‏ MB_MIGO_BADI לפי רשומות המאגר.", xrefs: ["enh:exit:MBCF0002", "enh:badi:MB_MIGO_BADI"] },
      ],
      interfaces: [
        { he: "כתיבה, ECC ו-S/4HANA לפי רשומת המאגר: BAPI_GOODSMVT_CREATE מקבל GOODSMVT_HEADER, ‏GOODSMVT_CODE (01 קבלה להזמנת רכש, 03 ניפוק לפקודה) וטבלת GOODSMVT_ITEM עם סוג התנועה (261 או 101), ומחזיר MATERIALDOCUMENT, ‏MATDOCUMENTYEAR ו-RETURN; לפי רשומת ה-sweep ה-BAPI דורש BAPI_TRANSACTION_COMMIT, ואחריו בדיקת המסמך ב-MB51. ב-S/4HANA 2025 FPS01 עמוד ה-EWM מתעד 'post and cancel goods movements using the following Inventory Management BAPIs: BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_CANCEL'.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline", "tx:MB51", "obj:material-document"] },
        { he: "ביטול: BAPI_GOODSMVT_CANCEL (אינו במילון הפרויקט) הוא היעד שפריט הפישוט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM קובע לקוד לקוח שקרא ל-MBST; אותו עמוד EWM של 2025 FPS01 נוקב בו לצד BAPI_GOODSMVT_CREATE.", xrefs: ["tx:MBST", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "קריאה, ECC ו-S/4HANA לפי רשומות המאגר: BAPI_GOODSMVT_GETDETAIL מחזיר כותרת ופריטים של מסמך חומר לפי MATERIALDOCUMENT ו-MATDOCUMENTYEAR; BAPI_GOODSMVT_GETITEMS שולף פריטי תנועה לפי טווחי בחירה, וטווח רחב מסומן ככשל אופייני. ב-S/4HANA הנתונים מגיעים מ-MATDOC כש-MKPF ו-MSEG משמשות תצוגות תאימות.", xrefs: ["fm:BAPI_GOODSMVT_GETDETAIL", "fm:BAPI_GOODSMVT_GETITEMS", "tx:MB03", "tx:MB51", "table:MSEG", "bp:matdoc-read-through-compatibility"] },
        { he: "S/4HANA On-Premise 2025 FPS01: שירות ה-OData‏ Material Documents - Read, Create ‏(API_MATERIAL_DOCUMENT, נתיב API_MATERIAL_DOCUMENT_SRV): GET על A_MaterialDocumentHeader או A_MaterialDocumentItem לקריאה לפי מפתח או בסינון, POST על A_MaterialDocumentHeader ליצירה, וביטול ברמת כותרת או ברמת פריט (Function Import‏ CancelItem, והמסמך החדש נושא ReversedMaterialDocument). הרשומות שנבדקו מתעדות את השירות לצד ה-BAPI ולא כמחליף שלו.", xrefs: ["obj:material-document", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETDETAIL"] },
        { he: "IDoc לתנועות סחורה: עמוד Documentary Batches של S/4HANA On-Premise 2025 FPS01 נוקב ב-'goods movements IDoc message type MBGMCR, basic type MBGMCR*' (ומציין שה-IDoc לא הורחב לאצוות תיעודיות). בתיעוד SAP S/4HANA Cloud Public Edition 2608 טבלת ה-BAPIs/IDocs מונה את BAPI_GOODSMVT_CREATE, ‏BAPI_GOODSMVT_GETDETAIL, ‏BAPI_GOODSMVT_GETITEMS ו-BAPI_GOODSMVT_CANCEL ואת ה-IDocs‏ MBGMCA ו-MBGMCR בתרחישי תקשורת כמו SAP_COM_0108; זו ראיית ענן ציבורי בלבד. MBGMCR ו-MBGMCA אינם במילון הפרויקט.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETDETAIL", "fm:BAPI_GOODSMVT_GETITEMS"] },
        { he: "ייצור מול MES, S/4HANA On-Premise 2025 FPS01: תנועות סחורה להעמדת רכיבים לפקודות, ובראשן ניפוק לפקודה (261) והעברה במדרגה אחת (311), יכולות לעבור ל-MES דרך מודל שכפול DRF עם מימוש יוצא 467_1 וה-IDoc‏ INVCON02 (עם BAdI להתאמתו); סוג התנועה צריך את סימון הרלוונטיות הסטטיסטית. מי שכבר שולח INVCON02 במודל ALE ‏(BD64) יוצר גם מודל שכפול DRF לאותה מערכת יעד, ומסנני ה-DRF מוגדרים בטרנזקציה DRFF. INVCON02 אינו במילון הפרויקט.", xrefs: ["tx:BD64", "obj:production-order", "obj:material-document"] },
        { he: "EWM ו-WMS מבוזר, S/4HANA 2025 FPS01 לפי אותה רשומת אימות: מימוש ברירת המחדל של ה-BAdI בנושא 'Extensibility for Goods Movements' קורא ל-BAPI_GOODSMVT_CREATE, ו-WMS מבוזר משכפל שינויים ל-S/4HANA דרך BAPI_GOODSMVT_CREATE.", xrefs: ["fm:BAPI_GOODSMVT_CREATE"] },
      ],
      outputs: [
        { he: "מסמך חומר עם כותרת ופריטים, שב-S/4HANA נשמר בטבלה אחת.", xrefs: ["obj:material-document"] },
        { he: "מסמך FI נלווה לפי קביעת החשבונות." },
        { he: "מלאי מעודכן, עלות מעודכנת בפקודה ועדכון אלמנטי התכנון." },
      ],
      exceptions: [
        { he: "תנועה נדחית בחוסר מלאי, אצווה שגויה, מלאי חסום או תקופה סגורה (תקרית goods-movement-stock, הודעה M7021).", xrefs: ["tx:MMBE", "tx:MB52"] },
        { he: "חסר חשבון ב-OBYC למפתח התנועה או למחלקת ההערכה: התנועה נכשלת או שאין מסמך FI (תקרית obyc-gbb-vbr-missing-no-fi-doc, הודעה M8147).", xrefs: ["table:MBEW"] },
        { he: "קבלת טובין כפולה מממשק ללא מפתח ייחודיות: מלאי ועלות כפולים, והתיקון בביטול התנועה (תקרית duplicate-goods-receipt).", xrefs: ["tx:MBST"] },
        { he: "תוכנית Z שקוראת MKPF או MSEG ישירות מחזירה ריק או נכשלת אחרי ההמרה (תקרית matdoc-custom-code); הפתרון הסבה ל-CDS ולתצוגות התאימות.", xrefs: ["table:MSEG", "tx:SCI", "tx:ST22"] },
        { he: "הודעת הצלחה בלי מסמך חומר: משימת Update שנכשלה ונקראת מחדש ב-SM13 (תקרית update-termination-sm13).", xrefs: ["tx:SM13"] },
      ],
      controls: [
        { he: "רישום דרך MIGO או דרך BAPI_GOODSMVT_CREATE בלבד; אין לערבב עם טרנזקציות MB בגלל מנגנון הנעילה הנפרד.", xrefs: ["tx:MIGO", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "מפתח ייחודיות בממשקי קבלה, ומניעת לחיצה כפולה בדיאלוג." },
        { he: "ביטול מסודר של מסמך שגוי במקום תנועה נגדית ידנית.", xrefs: ["tx:MBST"] },
        { he: "סריקת ATC לקוד מותאם שקורא או כותב MKPF ו-MSEG לפני ההמרה.", xrefs: ["tx:SCI", "bp:matdoc-read-through-compatibility"] },
        { he: "בכל קריאת BAPI לכתיבה: בדיקת RETURN ו-COMMIT מפורש, ואימות המסמך בדוח.", xrefs: ["bp:bapi-commit-discipline", "tx:MB51"] },
      ],
      kpis: [
        { he: "Goods Movement Analysis ‏(W0055, יישום Web Dynpro; קודמו F2912 בגרסת Design Studio), S/4HANA On-Premise 2025 FPS01: המדדים המתועדים הם Receipt Count, ‏Issue Count, ‏Movement Count, ‏Receipt Amount, ‏Issue Amount, ‏Consumption Amount, ‏Stock Change Amount, הכמויות המקבילות (Receipt, Issue, Movement, Consumption, Stock Change Quantity), מינימום ומקסימום לכמויות קבלה, ניפוק וצריכה, ו-First Posting Date / Last Posting Date. טרנזקציית ה-GUI המובילה ברשומת ספריית ה-Fiori היא MB51.", xrefs: ["tx:MB51", "obj:material-document"] },
        { he: "באותו יישום, הממדים שמאפשרים למדוד את התהליך הזה: Order ו-Order Item (תנועות מול פקודה), Goods Movement Type, ‏Is Consumption Movement, ‏Is Item Cancelled ו-Has Reverse Movement Type, Stock Change Category ו-Reason for Movement. היישום נשען על תצוגות ה-CDS‏ C_GoodsMovementQuery ו-I_GoodsMovementCube (אינן במילון הפרויקט).", xrefs: ["obj:maintenance-order", "obj:process-order", "tx:MBST"] },
        { he: "Inventory KPI Analysis ‏(F3749, יישום אנליטי), S/4HANA On-Premise 2025 FPS01: חמישה מדדים מחושבים ממסמכי החומר לכל מלאי חומר בהשוואת שתי תקופות עוקבות: Stock Changes, ‏Consumption Changes, ‏Inventory Aging Changes, ‏Inventory Turnover Changes ו-Range of Coverage Changes. הצריכה נקבעת לפי קבוצת צריכה של סוגי תנועה (Inventory Consumption Group), רישומי היפוך אינם נספרים במדד ההתיישנות, מסמכים בארכיון אינם נכללים, וערך המלאי מחושב במחיר החומר הנוכחי בלי קשר לתאריך הדיווח.", xrefs: ["obj:material-document"] },
      ],
      eccToS4: [
        { he: "ב-ECC תנועות המלאי נשמרו ב-MKPF (כותרת) וב-MSEG (פריטים), ומלאי מצרפי בטבלאות נפרדות.", xrefs: ["table:MKPF", "table:MSEG"] },
        { he: "ב-S/4HANA טבלת ליבה אחת, MATDOC, מאחדת כותרת ופריט, וכמויות המלאי מחושבות בזמן ריצה; התיעוד הרשמי קובע 'There is a new single table MATDOC instead of the existing tables MKPF and MSEG'.", xrefs: ["obj:material-document"] },
        { he: "MKPF ו-MSEG נחשפות כתצוגות תאימות: SELECT ממשיך לעבוד, כתיבה ישירה אינה הנתיב.", xrefs: ["bp:matdoc-read-through-compatibility", "cds:I_MaterialDocumentItem"] },
        { he: "טרנזקציות ה-MB הוחלפו לפי פריט הפישוט הרשמי ב-MIGO וב-BAPI_GOODSMVT_CREATE / BAPI_GOODSMVT_CANCEL; לפי רשומת tx:MB01 הקוד עדיין קיים אך קריאה מהתפריט מעלה הודעת שגיאה.", xrefs: ["tx:MIGO", "tx:MB01", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "מגרסת OP1610 מנגנון נעילה חדש משותף ל-MIGO ול-BAPI_GOODSMVT_CREATE, בעוד הטרנזקציות הישנות משתמשות בישן.", xrefs: ["fm:BAPI_GOODSMVT_CREATE"] },
        { he: "לצד ה-BAPI קיים שירות OData מתועד לקריאה, יצירה וביטול של מסמכי חומר.", xrefs: ["fiori:F0843"] },
      ],
      migration: [
        { he: "MKPF ו-MSEG עוברות ל-MATDOC; בדיקות לאחר המרה לפי רשומת התחום: GI ו-GR, אימות מסמך החומר, ותצוגות התאימות.", xrefs: ["table:MKPF", "table:MSEG", "obj:material-document"] },
        { he: "למפות ולהסב קוד לקוח: SELECT ישיר על MKPF, ‏MSEG ו-MARD, ‏INSERT או UPDATE ישיר, ו-Append על MSEG.", xrefs: ["table:MARD", "bp:matdoc-read-through-compatibility"] },
        { he: "להסב ממשקי BDC ו-CALL TRANSACTION על טרנזקציות MB לקריאה ל-BAPI_GOODSMVT_CREATE, כהוראת פריט הפישוט.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "tx:MB1A", "tx:MB1B"] },
        { he: "יתרות המלאי נטענות כאובייקט הגירה נפרד בסוף רצף הטעינה, לפי מרכז ההגירה של הפרויקט.", xrefs: ["bp:ecc-to-s4hana-migration-process"] },
      ],
      reference: {
        title: "Goods Movement (MM-IM) | Materials Management (MM) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3e07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד התיעוד הרשמי של תנועות הסחורה בניהול החומרים, המונה את MIGO ואת וריאנטי הכניסה שלה (אומת " +
          "ברשומת tx:MIGO). פריט SAP Best Practices (Scope Item) לתהליך לא אותר ואינו נרשם.",
      },
    },
    xrefs: [
      "table:MKPF", "table:MSEG", "table:RESB", "table:MARD", "table:MBEW", "table:MCH1",
      "tx:MIGO", "tx:MB01", "tx:MB02", "tx:MB03", "tx:MB11", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31",
      "tx:MBST", "tx:MB51", "tx:MB5B", "tx:MMBE", "tx:MB56", "tx:MMRV", "tx:SM13",
      "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETITEMS", "fm:BAPI_GOODSMVT_GETDETAIL",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fiori:F0843", "cds:I_MaterialDocumentItem", "obj:material-document", "obj:batch",
      "enh:exit:MBCF0002", "enh:badi:MB_MIGO_BADI",
      "bp:matdoc-read-through-compatibility", "bp:confirmation-process", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'הוצאה/קבלת סחורה (GI/GR)' של הפרויקט (DOMAINS ו-DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "GI (261) מוציא רכיבים לפקודה ו-GR (101) מקבל את התוצר אל המלאי, לרוב לאצווה; התנועות נרשמות במסמך " +
          "חומר ומעדכנות מלאי, עלות ותכנון. טבלאות MATDOC, MSEG, MKPF ו-RESB; טרנזקציות MIGO, MB31, MB1A, " +
          "MB1C ו-COGI; מודולי פונקציה BAPI_GOODSMVT_CREATE, BAPI_GOODSMVT_GETDETAIL ו-BAPI_GOODSMVT_GETITEMS. " +
          "נתוני אב: סוגי תנועה, ניהול אצוות, פרופיל מספור אצווה ומחיר תקן או Material Ledger. הרחבות " +
          "MBCF0002 ו-MB_MIGO_BADI. תקלות: GI נכשל על מלאי או תקופה, GR ללא אצווה, מחיר שגוי, תנועה כפולה. " +
          "מעבר ל-S/4HANA: MKPF ו-MSEG הופכות ל-MATDOC, וגישה ישירה ל-MSEG עוברת לתצוגות תאימות.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-gi-gr",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפות התהליך של הפרויקט (PROCESS_MAPS): שלב קבלת הטובין ב-p2p ושלב קבלת התוצר ב-plan-to-produce",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ב-p2p: שלב 'קבלת טובין' ב-MIGO, טבלאות MATDOC ו-MSEG, יישום Post Goods Movement, ממשק " +
          "BAPI_GOODSMVT_CREATE, תקריות goods-movement-stock, duplicate-goods-receipt ו-qm-inspection-lot-block, " +
          "ובדיקה 'GR 101 מעדכן מלאי'. ב-plan-to-produce: שלב 'קבלת תוצר (GR)' ב-MIGO ו-MB31, טבלאות MATDOC " +
          "ו-MCH1, ובדיקה 'GR 101 לאצווה עם תפוגה'; השלב הקודם הוא ביצוע ואישור עם Backflush וטיפול ב-COGI.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#p2p",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'מסמכי חומר (MATDOC)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: תנועות המלאי נשמרו ב-MKPF (כותרת) וב-MSEG (פריטים), ומלאי מצרפי בטבלאות נפרדות. S/4HANA: " +
          "טבלת ליבה אחת MATDOC מאחדת כותרת ופריט, וכמויות המלאי מחושבות בזמן ריצה. MARD, MKPF ו-MSEG נחשפות " +
          "כתצוגות תאימות; קוד שקורא או כותב אליהן ישירות דורש בדיקה, וקריאות SELECT עוברות דרך התצוגות. " +
          "הנושא מסומן כפריט פישוט של מודל הנתונים MM-IM ומצוין כרלוונטי ל-PP ול-PM דרך תנועות הניפוק והקבלה " +
          "לפקודות.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#matdoc",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT): רשומות MATDOC, MSEG ו-MKPF",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MATDOC היא טבלת מסמכי החומר החדשה; MKPF ו-MSEG מאוחדות אליה והמלאי מחושב בזמן ריצה. הסיכון מסומן " +
          "גבוה: כל קריאה או דיווח שנשען ישירות על MKPF או MSEG חייב לעבור דרך MATDOC או דרך תצוגות תאימות " +
          "(NSDM_V_MSEG, ‏NSDM_V_MKPF, ‏I_MaterialDocumentItem). הרשומה מונה את MIGO, MB51 ו-MB5B ואת " +
          "BAPI_GOODSMVT_CREATE, ואת בדיקות ה-QA: קבלה 101 דרך MIGO ומציאת השורה, דוחות מלאי הנשענים על " +
          "תצוגות תאימות, ובדיקת קוד מותאם.",
        verificationLevel: "repository_verified",
        sapNote: "1976487",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "מרכז התקלות של הפרויקט: goods-movement-stock, obyc-gbb-vbr-missing-no-fi-doc, " +
          "duplicate-goods-receipt, matdoc-custom-code, update-termination-sm13",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תנועת סחורה נדחית (M7021) בחוסר מלאי, אצווה או מק\"ט שגויים, תקופה סגורה או מלאי חסום. חסר חשבון " +
          "ב-OBYC למפתח BSX או GBB עם מודיפיקציה כמו VBR מפיל את התנועה או משאיר אותה בלי מסמך FI (M8147). " +
          "קבלת טובין כפולה מממשק ללא idempotency מחייבת ביטול והוספת מפתח ייחודי. תוכנית Z הקוראת MKPF או " +
          "MSEG ישירות מחזירה ריק או נכשלת ב-S/4HANA ומוסבת ל-CDS ולתצוגות התאימות. הודעת הצלחה בלי מסמך " +
          "מקורה במשימת Update שנכשלה ונקראת מחדש ב-SM13.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#goods-movement-stock",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F0843",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "Post Goods Movement (F0843): רישום תנועות סחורה (קבלה, ניפוק, העברה), תפקיד SAP_BR_WAREHOUSE_CLERK, " +
          "שירות OData‏ API_MATERIAL_DOCUMENT_SRV, תצוגת CDS‏ I_MaterialDocumentItem, טרנזקציות GUI‏ MIGO " +
          "ו-MB31, טבלה MATDOC, ואובייקט קשור BAPI_GOODSMVT_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F0843",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האובייקט העסקי 'מסמך חומר' בשכבת האימות של הפרויקט (OBJECT_REGISTRY)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "האובייקט 'מסמך חומר' הוא קיבוץ של המאגר עצמו, ואיבריו הם MKPF, ‏MSEG, ‏MIGO, ‏MB51, ‏MB5B, " +
          "‏BAPI_GOODSMVT_CREATE ו-I_MaterialDocumentItem; הרשומה מפנה גם לשיטה 'קריאת תנועות מלאי דרך MATDOC " +
          "ותצוגות תאימות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/objects.ts#obj:material-document",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF " +
          "TRANSACTIONS IN MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_FM_14,
        claim:
          "פריט 27.6 (עמ' 644-645) קובע שטרנזקציות ה-MB לרישום ולהצגה של תנועות סחורה (MB01, MB02, MB03, MB04, " +
          "MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU, MBBM) 'have been " +
          "replaced by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
          "BAPI_GOODSMVT_CANCEL'. מ-S/4HANA OP1610 ומעלה הוכנס מנגנון נעילה חדש ומשופר ל-MIGO " +
          "ול-BAPI_GOODSMVT_CREATE ('a new enhanced and improved lock concept has been introduced for " +
          "transaction MIGO and the BAPI BAPI_GOODSMVT_CREATE'), בעוד הטרנזקציות הישנות עדיין משתמשות במנגנון " +
          "הישן (note 2319579), ולכן רישום מקבילי דרכן ודרך MIGO או ה-BAPI עלול ליצור אי-עקביות מלאי. בסעיף " +
          "הפתרון: להחליף קוד לקוח הקורא ל-MB01, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, " +
          "MBSF, MBSL ו-MBSU (למשל CALL TRANSACTION MBxy) בשימוש במודול הפונקציה BAPI_GOODSMVT_CREATE; את MBST " +
          "ב-BAPI_GOODSMVT_CANCEL; את MB02/MB03 ב-MIGO_DIALOG (אומת ברשומת fm:BAPI_GOODSMVT_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3e07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_07,
        claim:
          "רשומת החיפוש של help.sap.com לגרסת On-Premise 2025 FPS01 (מדריך Materials Management) מונה תחת " +
          "'Activities in Materials Management' את הצמדים 'Goods Movement MIGO', 'Goods Issue MIGO_GI', 'Goods " +
          "Receipt from External Procurement MIGO_GR' ו-'Goods Receipt for Order'. כלומר MIGO ווריאנטי הכניסה " +
          "שלה מתועדים במהדורה הנוכחית כקודי טרנזקציה לתנועות סחורה; באותה רשימה מופיעים גם MB1B (Transfer " +
          "Posting), MBST (Cancel Material Document), MBSU ו-MB90 (אומת ברשומת tx:MIGO).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt (MIGO) | EXG - Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/7782cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_01,
        claim:
          "'With the Enjoy transaction MIGO you can post goods receipts with reference to a purchase order'; " +
          "העמוד ממפה את פונקציות קבלת הטובין הקלאסיות באזור ה-Exchanges אל MIGO ‏(MB01 קבלה להזמנה ידועה, " +
          "MB02 שינוי מסמך, MB03 הצגה, MBST ביטול): תמיכה ב-MIGO כמחליפה לקבלת טובין מול הזמנת רכש, בהיקף " +
          "המוצהר בעמוד (אומת ברשומת tx:MB01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches in Inventory Management | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/dcfeb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_01,
        claim:
          "הסניפט קובע כלשונו: 'Note MB* transactions (for example, MB01, MB03, MB31, and MB11) are not " +
          "supported.' ההיקף: פונקציונליות Documentary Batches בלבד, ובמסגרתה ההזנה נתמכת ב-MIGO ולא " +
          "בטרנזקציות ה-MB; אין להסיק מכך אמירה רחבה יותר מלשון הסניפט (אומת ברשומת tx:MB01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "מודל הנתונים של מסמכי החומר ב-S/4HANA On-Premise 2025 FPS01: 'in the MM-IM area: There is a new " +
          "single table MATDOC instead of the existing tables MKPF and MSEG', 'You use the archiving object " +
          "MM_MATBEL to archive data from the following table: MATDOC (material documents)' ו-'The delete " +
          "program deletes the archived material documents from the database table MATDOC'; התקציר מדפיס גם " +
          "'Note In SAP S/4HANA, a new, simplified data model has been introduced' ונקטע שם (אומת ברשומת " +
          "fm:BAPI_GOODSMVT_GETITEMS).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Documents - Read, Create | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/d4c919581bc30a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "שירות ה-OData‏ Material Documents - Read, Create מתועד למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
          "Inventory: 'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following operations " +
          "for material documents: Retrieve material documents, Create material documents, Cancel material " +
          "documents at header level, Cancel material documents at [item level]'. רשומת 'Operations for " +
          "Material Document API' באותו מדריך מציגה את נתיב היצירה POST על A_MaterialDocumentHeader ואת פעולות " +
          "הביטול ברמת כותרת ופריט. אף אחת מהרשומות אינה מציגה את ה-API כמחליף של BAPI_GOODSMVT_CREATE; הן " +
          "מתעדות אותו כשירות OData לרישום מסמכי חומר לצד ה-BAPI (אומת ברשומת fm:BAPI_GOODSMVT_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט (SAP PRESS, רכש ומקורות אספקה ב-S/4HANA), פרק 7 'Inventory Management', סעיף 7.3.1 'Goods Receipts'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את ניהול המלאי ובו סעיפי תנועות הסחורה: תנועות סחורה (7.3), קבלות טובין (7.3.1) ויישומי " +
          "הדיווח על תנועות (7.5.2); הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#7.3.1",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Communication of Goods Movements from Inventory Management to EWM | Extended Warehouse Management (EWM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/8a532e4e6aaf4f4b97fd2f014f9837e0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "הסניפט לגרסת On-Premise 2025 FPS01 קובע: 'You can also post and cancel goods movements using the " +
          "following Inventory Management BAPIs: BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_CANCEL'. כלומר ה-BAPI מתועד " +
          "כממשק פעיל לרישום תנועות סחורה בניהול מלאי בגרסה 2025 FPS01. רשומות נוספות מאותו חיפוש ואותה גרסה: " +
          "'Extensibility for Goods Movements' ב-What's New 2025 FPS01 ‏(loio d4538b721f6d47d9a1fa076b82c1bf77): " +
          "'The default implementation of the BAdI calls Business Application Programming Interface (BAPI) " +
          "BAPI_GOODSMVT_CREATE'; 'Integration of a Decentralized WMS' ‏(loio b7706754e90d8c4ce10000000a4450e5): " +
          "ה-WMS המבוזר משכפל שינויים למערכת S/4HANA דרך BAPI_GOODSMVT_CREATE; ורשומת 'BAPIs and APIs used in " +
          "Synchronous Goods Movements' ב-What's New 2020 ‏(loio 73cf65e8275d4b279973c9a368890896, 2020.000) מונה " +
          "תחת Inventory Management BAPIs את BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL עם התהליכים הנתמכים 'Goods " +
          "receipt and goods issue, Stock transfer postings, Goods receipt for orders'. (אומת ברשומת " +
          "fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Read Material Documents | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/78f5a8461d554cc38b3af2d07d6f9c8e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "פעולת הקריאה של שירות ה-OData למסמכי חומר מתועדת למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
          "Inventory: 'To read material documents, you use the http method GET on the A_MaterialDocumentHeader or " +
          "the A_MaterialDocumentItem entity ... With this operation, you can retrieve material documents as " +
          "follows: Request material documents or items by using their keys Use system query options to filter a " +
          "collection of material documents or items', עם הדוגמה 'GET " +
          "<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentItem?' ו-'the GET request needs to " +
          "be based on the material document item entity (A_MaterialDocumentItem)'. רשומות נוספות מאותו מדריך ואותה " +
          "מהדורה: 'Material Documents - Read, Create' ‏(loio d4c919581bc30a02e10000000a44147b): 'Technical name: " +
          "API_MATERIAL_DOCUMENT ... This service enables the following operations for material documents: Retrieve " +
          "material documents Create material documents Cancel material documents at header level Cancel material " +
          "documents at [item level]' ו-'Depending on the operation, material document header and item detail data " +
          "is sent in the response'; 'Operations for Material Document API' ‏(loio " +
          "1aef4e402acd4c8b8ec2ea2bfda7715b): 'Read Material Documents GET GET " +
          "<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader'; 'Cancel Material Documents " +
          "at Item Level' ‏(loio 2b1124c6321a47559518f5b5bdc1db72): 'To cancel a material document at item level, " +
          "you use the http method POST to call the CancelItem function import' ו-'The new material document " +
          "includes the ReversedMaterialDocument, ReversedMaterialYear and ReversedMaterialItem properties to refer " +
          "to the material document item that was canceled'; מפתח הכותרת MaterialDocumentYear ו-MaterialDocument " +
          "מופיע בתקציר 'Cancel Material Documents at Header Level' ‏(loio 3ffc5cb1a13a43928313477bf5bc98dd): " +
          "'/A_MaterialDocumentHeader(MaterialDocumentYear='2017',MaterialDocument='5000021256')'. אף אחת מהרשומות " +
          "אינה נוקבת ב-BAPI_GOODSMVT_GETDETAIL ואינה מציגה את השירות כמחליף שלו; הן מתעדות חלופת OData לקריאת " +
          "מסמכי חומר לצד ה-BAPI. (אומת ברשומת fm:BAPI_GOODSMVT_GETDETAIL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "BAPIs/IDocs in SAP S/4HANA Cloud Public Edition | Extend and Integrate Your SAP S/4HANA Cloud Public " +
          "Edition",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/2cf48091d5864284ac4541b86a8737fd.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE_FM_22,
        claim:
          "תקציר העמוד למהדורת Public Edition 2608 נוקב בשם BAPI_GOODSMVT_GETDETAIL כלשונו בטבלת ה-BAPIs של העמוד " +
          "(עמודות 'Technical Name Description Communication Scenario'), מיד אחרי השורה 'BAPI_GOODSMVT_CREATE Goods " +
          "Movement ‒ Create SAP_COM_0156, SAP_COM_0108'; פרגמנט אחר של אותו תקציר מציג את השורה 'Goods Movement ‒ " +
          "Read SAP_COM_0108' מיד לפני 'BAPI_GOODSMVT_GETITEMS Goods Movement ‒ Read Items SAP_COM_0108, " +
          "SAP_COM_0156', ולצדן 'BAPI_GOODSMVT_CANCEL Goods Movement ‒ Cancel SAP_COM_0108' וה-IDocs‏ MBGMCA " +
          "('Goods Movement ‒ Cancel SAP_COM_0108') ו-MBGMCR (התקציר נקטע אחרי 'MBGMCR Goods', ולכן תיאורו לא " +
          "נטען). העמוד פותח: 'You can use BAPIs (Business Application Programming Interface) and IDocs to connect " +
          "business ... processes across your system landscape or to integrate SAP S/4HANA Cloud Public Edition " +
          "with external systems' וקובע: 'The BAPIs and IDocs are part of predefined communication scenarios'. שיוך " +
          "השורה 'Goods Movement ‒ Read / SAP_COM_0108' ל-BAPI_GOODSMVT_GETDETAIL נובע מסדר הטבלה (בין CREATE " +
          "ל-GETITEMS) ולא מטקסט רציף בפרגמנט אחד. הרשומה מתעדת את מהדורת הענן הציבורי בלבד ואינה קובעת דבר על " +
          "On-Premise. (אומת ברשומת fm:BAPI_GOODSMVT_GETDETAIL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "רשומת קטלוג הפונקציות של הפרויקט (FUNCTION_INTEL) ורישום ה-BAPI המועשר (sweep): BAPI_GOODSMVT_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "יצירת תנועת מלאי (קבלות, ניפוקים, העברות לפי סוג תנועה); קלט GOODSMVT_HEADER, ‏GOODSMVT_CODE ('01=GR PO, " +
          "03=GI order') וטבלת GOODSMVT_ITEM עם חומר, כמות וסוג תנועה (261/101); פלט MATERIALDOCUMENT ו-RETURN; " +
          "ECC: 'זמין ב-ECC.'; S/4: 'זמין ב-S/4HANA. חלופה: OData API_MATERIAL_DOCUMENT.'; כשלים: מלאי חסר, תקופת " +
          "רישום סגורה (MMPV), אצווה חסרה; תרחיש QA: GI 261 לפקודה, אימות MATERIALDOCUMENT ו-COMMIT, בדיקה ב-MB51; " +
          "טרנזקציות MB1A ו-MIGO, טבלאות MSEG ו-RESB. רישום ה-sweep: 'דורש BAPI_TRANSACTION_COMMIT', פלט " +
          "MATERIALDOCUMENT, MATDOCUMENTYEAR, RETURN (data/bapi-enrichment.sweep.ts).",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_GOODSMVT_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "רשומות קטלוג הפונקציות של הפרויקט (FUNCTION_INTEL): BAPI_GOODSMVT_GETDETAIL ו-BAPI_GOODSMVT_GETITEMS",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "GETDETAIL: שליפת כותרת ופריטים של מסמך חומר לפי MATERIALDOCUMENT / MATDOCUMENTYEAR; ECC 'זמין ב-ECC " +
          "(MKPF/MSEG)', S/4 'זמין ב-S/4HANA; הנתונים מ-MATDOC (MKPF/MSEG כ-Compatibility Views)'; טרנזקציות MB03 " +
          "ו-MIGO. GETITEMS: שליפת פריטי תנועות מלאי לפי טווחי בחירה, פלט GOODSMVT_ITEMS ו-RETURN; S/4 'זמין " +
          "ב-S/4HANA; חלופה: MATDOC + API_MATERIAL_DOCUMENT.'; כשל אופייני 'טווח רחב'; טרנזקציה MB51, טבלה MSEG.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_GOODSMVT_GETDETAIL",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches (LO-BM) | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/24ffb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 24ffb753128eb44ce10000000a174cb4, נקרא דרך שירות התוכן) קובע: 'Existing IDocs have not " +
          "been enhanced (for example, shipping notification/delivery message type DESADV, basic type DELVRY*; " +
          "goods movements IDoc message type MBGMCR, basic type MBGMCR*)', ובהמשך: 'If you work with RFID or TRM " +
          "functions, or call IDocs/BAPIs, you can only book in documentary batches by calling up the RFC-capable " +
          "function module VBDBDM_DATA_MAINTAIN_RFC beforehand'. הטענה כאן מוגבלת לכך שסוג ההודעה MBGMCR מתועד " +
          "כ-IDoc של תנועות סחורה במהדורה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/da6a78ae807f47fabd9db81e3ebb5534.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio da6a78ae807f47fabd9db81e3ebb5534): 'Through the integration of various goods movements, " +
          "you are able to supply an MES with stock information for production components'; דרישות: 'there is also " +
          "a BAdI for adjusting the IDoc INVCON02' ו-'You have created and activated a replication model that " +
          "contains the outbound implementation for the goods movement (467_1)'; תנועות משולבות: 'Goods issue for " +
          "an order (movement type 261)' ו-'One-step stock transfer from location to location (movement type 311)'; " +
          "'To send material documents to an MES, the statistics relevance must be activated for the affected " +
          "movement types'; ו-'If you are already using IDoc INVCON02 to integrate goods movements with another " +
          "system, you need to create a DRF replication model, in addition to the existing ALE model (transaction " +
          "BD64)', עם הגדרת מסנני DRF בטרנזקציה DRFF.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement Analysis | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/58bd1c58a0699144e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 58bd1c58a0699144e10000000a4450e5): 'Goods Movement Analysis App ID: W0055 With this app, " +
          "you can analyze the goods movements in your company', 'This app uses the CDS views: C_GoodsMovementQuery " +
          "and I_GoodsMovementCube'. בין הממדים: Order, ‏Order Item, ‏Goods Movement Type, ‏Has Reverse Movement " +
          "Type, ‏Is Consumption Movement, ‏Is Item Cancelled ('Identifies whether a specific material document " +
          "item (goods movement) has been cancelled'), ‏Stock Change Category, ‏Reason for Movement. תחת " +
          "'Measures': Receipt Count, Issue Count, Movement Count, Receipt Amount, Issue Amount, Consumption " +
          "Amount, Stock Change Amount, Receipt Quantity, Issue Quantity, Movement Quantity, Consumption Quantity, " +
          "Stock Change Quantity, Min/Max Receipt Quantity, Min/Max Issue Quantity, Min/Max Consumption Quantity, " +
          "First Posting Date, Last Posting Date; קטלוג עסקי SAP_PRC_BC_IM_ANLYTS_QUERY.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Goods Movement Analysis - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('W0055')/S32OP",
        accessedAt: DATE28,
        claim:
          "רשומת W0055 בספריית Fiori Apps (S32OP, S/4HANA 2025 FPS01): 'Goods Movement Analysis', ‏Web Dynpro, רכיב " +
          "MM-IM-VDM-SGM; תפקידים SAP_BR_INVENTORY_MANAGER, ‏SAP_BR_INVENTORY_MGR_RFM ו-SAP_BR_WAREHOUSE_CLERK; " +
          "Intent‏ MaterialMovement-analyzeGoodsMovement; טרנזקציית GUI מובילה MB51; קודם: F2912 Goods Movement " +
          "Analysis (Design Studio); זמין מ-1709 ועד 2025 FPS01, וגם ב-Private Cloud ובמהדורות 2602 ו-2608.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Inventory KPI Analysis | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/e130f15007c94eae9d65f8af9d541d00.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio e130f15007c94eae9d65f8af9d541d00): 'Inventory KPI Analysis App ID: F3749 With this app, " +
          "you can monitor inventory key performance indicators (KPIs)'; 'The app supports 5 KPIs and calculates " +
          "them based on each material stock (stock identifying fields) in the selected time period': Stock " +
          "Changes, Consumption Changes, Inventory Aging Changes, Inventory Turnover Changes, Range of Coverage " +
          "Changes. הצריכה לפי 'Inventory Consumption Group' של סוגי תנועה; 'Archived material documents are not " +
          "considered during analysis'; במדד ההתיישנות 'Reversal postings are not considered'; ערך המלאי מחושב לפי " +
          "כמות המלאי בתאריך הדיווח כפול מחיר החומר הנוכחי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Inventory KPI Analysis - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3749')/S32OP",
        accessedAt: DATE28,
        claim:
          "רשומת F3749 בספריית Fiori Apps (S32OP, S/4HANA 2025 FPS01): 'Inventory KPI Analysis', יישום Analytical " +
          "ב-SAP Fiori (SAPUI5); תפקידים SAP_BR_INVENTORY_ANALYST ו-SAP_BR_INVENTORY_MANAGER; קטלוג עסקי " +
          "SAP_MM_BC_IM_CNTRL_ANLYTS; Intent‏ Material-analyzeInventoryKPIsTimeseries; שירות OData‏ " +
          "MMIM_STKKPITIMESERIESCOMPRN_SRV; זמין מ-1909 ועד 2025 FPS01, וגם ב-Private Cloud ובמהדורות 2602 ו-2608.",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך חוצת מודולים: תנועות הסחורה של תחזוקה ושל ייצור. כל שדה בפרופיל נגזר מרשומות המאגר הנקובות, " +
      "מעמוד רשמי שגופו נקרא דרך שירות התוכן, מרשומת ספריית ה-Fiori, או מעמוד רשמי שכבר אומת ברשומות tx:MIGO, " +
      "‏tx:MB01, ‏fm:BAPI_GOODSMVT_CREATE ו-fm:BAPI_GOODSMVT_GETITEMS. הרשומה אינה משכפלת את השיטה " +
      "bp:matdoc-read-through-compatibility אלא מקשרת אליה: שם מפורט הטיפול בקוד הקורא MKPF ו-MSEG. הערות אימות: " +
      "הטבלה MATDOC ומודול הפונקציה BAPI_GOODSMVT_CANCEL אינם במילון הפרויקט ולכן מופיעים בפרוזה בלבד; לפי רשומת " +
      "tx:MIGO, ‏'Post Goods Movement' הוא ב-Fiori יישום Web GUI שקוד הטרנזקציה שלו MIGO, בעוד F0843 הוא Post Goods " +
      "Receipt for Purchasing Document, ולכן ההפניה ל-F0843 כאן היא לרשומת הקטלוג של הפרויקט ולא טענה שהיישום מחליף " +
      "את MIGO. מספר ה-SAP Note ברשומת ההשפעה מועתק מן המאגר ולא הוקלד מהזיכרון. לא בוצעה בדיקה במערכת SAP חיה. Old " +
      "→ New (2026-09-28): נוספו שני שדות, interfaces ‏(7 שורות) ו-kpis ‏(3 שורות), ו-11 שורות ראיה; שאר הרשומה " +
      "הועתק כלשונו, מלבד המשפט על מקורות הפרופיל, שנוסחו הקודם היה 'כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או " +
      "מעמוד רשמי שכבר אומת ברשומות' והורחב לגופי עמודים שנקראו דרך שירות התוכן ולרשומות ספריית ה-Fiori. המשפט הישן " +
      "'שדה kpis הושמט: המאגר אינו מתעד מדדי ביצוע לתהליך תנועות הסחורה' נשאר נכון לגבי המאגר, אך המדדים נמצאו " +
      "בתיעוד הרשמי: עמודי Goods Movement Analysis ‏(W0055) ו-Inventory KPI Analysis ‏(F3749) של 2025 FPS01, שגופם " +
      "נקרא דרך שירות התוכן. אלה מדדי מלאי ותנועות שהיישומים מחשבים ממסמכי החומר, לא יעדי ביצוע: אף מקור שנקרא אינו " +
      "קובע ערכי יעד. W0055, ‏F2912 ו-F3749, תצוגות ה-CDS‏ C_GoodsMovementQuery ו-I_GoodsMovementCube, ה-IDocs‏ " +
      "MBGMCR, ‏MBGMCA ו-INVCON02 ומודול הפונקציה BAPI_GOODSMVT_CANCEL אינם במילון הפרויקט ומופיעים בפרוזה בלבד. " +
      "ראיית ה-IDocs‏ MBGMCA ו-MBGMCR בטבלת ה-BAPIs/IDocs היא של Public Edition 2608; ל-On-Premise נמצא רק סוג " +
      "ההודעה MBGMCR בעמוד Documentary Batches. עמודי ה-Retail שנוקבים ב-MBGMCR03 וב-MB_CREATE_GOODS_MOVEMENT לא " +
      "צוטטו כי הם עוסקים בהרחבות fashion and vertical business. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* =========================================================== ECC to S/4HANA */
  {
    slug: "ecc-to-s4hana-migration-process",
    he: "הגירה מ-ECC ל-S/4HANA בתחומי תחזוקה (PM) ותעשיות תהליכיות (PP-PI)",
    en: "ECC to S/4HANA migration process for Plant Maintenance and process industries",
    module: "Cross",
    summary:
      "המעבר מ-ECC ל-S/4HANA משלב ארבעה מסלולים: פריטי פישוט שמחייבים שינוי תהליך או קוד, הסבת קוד מותאם, " +
      "הגירת נתונים במרכז ההגירה, ובדיקות וחיתוך (Cutover). בתחומי התחזוקה ותעשיות התהליך הליבה הפונקציונלית " +
      "נשמרת, בעוד מודל הנתונים, חוויית המשתמש והדיווח משתנים.",
    context:
      "לפי שכבות המאגר, המתודולוגיה היא SAP Activate בשישה שלבים (גילוי, הכנה, חקירה, מימוש, פריסה, הרצה) " +
      "עם Fit-to-Standard במקום Blueprint קלאסי. פריטי הפישוט הרשמיים קובעים את השינויים המחייבים: פריט " +
      "S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM מעביר את משפחת טרנזקציות ה-MB ל-MIGO " +
      "ול-BAPI_GOODSMVT_CREATE, ופריט S4TWL - Scheduling of Maintenance Plan מסמן את IP30 כטכנולוגיה שאינה " +
      "עתידית ומפנה לתזמון המוני ב-IP30H. הגירת הנתונים מתבצעת במרכז ההגירה לפי רצף תלויות, ותיעוד ה-Data " +
      "Migration הרשמי נוקב באובייקט ההגירה של הודעת התחזוקה ובמודולי ה-BAPI שלו.",
    steps: [
      {
        he: "גילוי: להריץ הערכת מוכנות ולזהות פריטי פישוט והשפעה על קוד מותאם, ואז להחליט על גישת ההמרה (מערכת חדשה, המרת מערכת קיימת או מעבר סלקטיבי).",
        xrefs: ["tx:SCI"],
      },
      {
        he: "הכנה: להקים ממשל, צוות עם בעלי תהליך מהשטח, תוכנית וסביבות עבודה.",
      },
      {
        he: "חקירה: סדנאות Fit-to-Standard לכל תהליך, תיעוד הפערים בלבד, ובניית רשימת התהליכים בסקופ (BPML) ומצבת ה-WRICEF.",
      },
      {
        he: "קוד מותאם: לסרוק ולהסב SELECT ישיר על MKPF, ‏MSEG ו-MARD אל תצוגות התאימות ואל CDS, ולבדוק את הרחבת מספר החומר ל-40 תווים בממשקים.",
        xrefs: ["table:MKPF", "table:MSEG", "table:MARD", "bp:matdoc-read-through-compatibility"],
      },
      {
        he: "פריטי פישוט רלוונטיים לתעשיות תהליכיות: משפחת טרנזקציות ה-MB מוחלפת ב-MIGO וב-BAPI_GOODSMVT_CREATE, ולכן ממשקי BDC ו-CALL TRANSACTION מוסבים.",
        xrefs: ["tx:MIGO", "tx:MB1A", "tx:MB1B", "fm:BAPI_GOODSMVT_CREATE", "bp:goods-movement-process"],
      },
      {
        he: "פריטי פישוט רלוונטיים לתחזוקה: תזמון תכניות תחזוקה עובר מ-IP30 (תוכנית RISTRA20) ל-IP30H (תוכנית RISTRA20H), ולכן עבודות הרקע התקופתיות נוצרות מחדש.",
        xrefs: ["tx:IP30", "tx:IP30H", "table:MPLA", "table:MPOS"],
      },
      {
        he: "הגירת נתונים: לבחור אובייקטי הגירה, למפות שדות, לאמת ולהריץ סימולציה, ואז לטעון ברצף בסיס, נתוני אב ותנועות.",
        xrefs: ["table:BUT000", "table:MARA", "table:IFLOT", "table:EQUI", "table:MKAL"],
      },
      {
        he: "אובייקטי ההגירה של התחזוקה ושל תעשיות התהליך: מיקום פונקציונלי, ציוד ותכנית תחזוקה בצד PM; מתכון ייצור וגרסת ייצור בצד PP-PI; יתרות מלאי נטענות בסוף.",
        xrefs: ["table:IFLOT", "table:EQUI", "table:MPLA", "table:PLKO", "table:MKAL", "table:MARD"],
      },
      {
        he: "בדיקות: יחידה ו-ATC על קוד מותאם, בדיקת אינטגרציה מקצה לקצה, בדיקות ממשקים, קבלה, רגרסיה מול ECC, ביצועים ואימות הגירת הנתונים בהתאמה מול המקור.",
        xrefs: ["tx:SCI", "tx:ST22"],
      },
      {
        he: "חיתוך: הקפאת שינויים, סגירת תקופות וניקוי תנועות פתוחות (COGI ו-IDoc בשגיאה), הרצת יבש של תוכנית החיתוך, טעינת נתוני הפתיחה, בדיקת עשן לתהליכי הליבה והתייצבות בהיפרקייר.",
        xrefs: ["tx:COGI", "tx:SM13"],
      },
    ],
    antiPatterns: [
      "החלטת גישת המרה בלי ניתוח קוד מותאם ובלי הערכת מוכנות.",
      "ניפוח פערים בסדנאות במקום Fit-to-Standard: קסטומיזציה שאפשר היה להימנע ממנה.",
      "קוד Z שממשיך לקרוא ישירות MKPF, ‏MSEG או טבלאות אינדקס של FI אחרי ההמרה.",
      "טעינת אובייקט הגירה לפני האובייקט שהוא תלוי בו: לקוח לפני שותף עסקי, פקודה לפני חומר.",
      "דחיית הבדיקות וההגירה לשלב מאוחר, כשהממשקים וההגירה מתגלים רק בסוף.",
    ],
    checks: [
      "הרצת סריקת ATC על הקוד המותאם והסבת הקריאות הישירות לפני ההמרה.",
      "סימולציה לכל אובייקט הגירה לפי רצף התלויות, ופתרון כל שגיאה חוסמת.",
      "התאמה לאחר טעינה: ספירות, יתרות וסכומי בקרה מול מערכת המקור.",
      "בדיקת עשן לתהליכי הליבה אחרי העלייה: פקודה, אישור וניפוק.",
      "רגרסיה: השוואת תוצאות ECC מול S/4HANA בדוחות, ברישומים ובמלאי.",
    ],
    process: {
      purpose:
        "להעביר את תהליכי התחזוקה ותעשיות התהליך ממערכת ECC ל-S/4HANA בלי לאבד תהליך, נתון או ממשק: לזהות " +
        "את פריטי הפישוט המחייבים, להסב קוד מותאם, להעביר את הנתונים ברצף תלויות נכון ולאמת בבדיקות ובחיתוך.",
      trigger: [
        { he: "החלטה עסקית לעבור ל-S/4HANA, הנשענת על הערכת ערך ועל הערכת מוכנות של המערכת הקיימת." },
        { he: "פריט פישוט שמחייב שינוי תהליך או קוד, למשל מודל הנתונים של ניהול המלאי או תזמון תכניות התחזוקה.", xrefs: ["tx:IP30", "tx:MB1A"] },
      ],
      preconditions: [
        { he: "היקף ההגירה הוגדר: אילו אובייקטים ואילו תהליכים." },
        { he: "נתוני המקור חולצו ונוקו, והמיפוי הושלם." },
        { he: "הקונפיגורציה ונתוני האב קיימים במערכת היעד לפני הטעינה." },
        { he: "רצף הטעינה תוכנן לפי התלויות בין האובייקטים." },
      ],
      masterData: [
        { he: "בסיס: שותף עסקי, חשבון ראשי, מרכז עלות, אב חומר, מרכז עבודה או משאב, ומיקום פונקציונלי.", xrefs: ["table:BUT000", "table:MARA", "table:CRHD", "table:IFLOT"] },
        { he: "נתוני אב תלויי בסיס: לקוח וספק כתפקידי שותף עסקי, עץ מוצר, רשימת פעולות, מתכון ייצור, גרסת ייצור וציוד.", xrefs: ["table:KNA1", "table:STKO", "table:PLKO", "table:MKAL", "table:EQUI"] },
        { he: "תנועות ויתרות בסוף הרצף: יתרות מלאי, הזמנות רכש ומכירה פתוחות, פריטים פתוחים ותכנית תחזוקה; לעומת זאת, עמוד Data Migration הרשמי PM - Maintenance plan (2025 FPS01) מסווג את האובייקט Master data בגישת Direct Transfer - ERP (ראו notes).", xrefs: ["table:MARD", "table:MPLA", "table:MPOS"] },
      ],
      roles: [
        { he: "שלב הגילוי: נותן חסות מטעם ההנהלה, יועץ ערך, ארכיטקט ארגוני ובעלי עניין עסקיים." },
        { he: "שלב ההכנה: מנהל פרויקט, ארכיטקט פתרון, ראשי מודולים (PP, ‏PM, ‏MM, ‏FI), ‏Basis ומנהל שינוי." },
        { he: "שלב המימוש: יועצי קונפיגורציה, מפתחי ABAP, יועץ אינטגרציה, מוביל הגירת נתונים ומוביל בדיקות." },
      ],
      transactions: [
        { he: "תנועות סחורה אחרי ההמרה: MIGO במקום משפחת MB, עם BAPI_GOODSMVT_CREATE בקוד.", xrefs: ["tx:MIGO", "tx:MB01", "tx:MB1A", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "תזמון תכניות תחזוקה: IP01 ו-IP10 לתכנון ולתזמון, ‏IP30 לניטור מועדים ו-IP30H לתזמון המוני ב-S/4HANA.", xrefs: ["tx:IP01", "tx:IP10", "tx:IP30", "tx:IP30H"] },
        { he: "כלי בדיקה והסבה: ATC ו-Code Inspector לקוד המותאם, ‏ST22 לניתוח שגיאות ריצה, ‏SE16N לבדיקת נתונים.", xrefs: ["tx:SCI", "tx:ST22", "tx:SE16N"] },
        { he: "ניקוי לפני החיתוך: COGI לתנועות תקועות ו-SM13 למשימות Update שנכשלו.", xrefs: ["tx:COGI", "tx:SM13"] },
      ],
      tables: [
        { he: "מודל הנתונים המשתנה: MKPF ו-MSEG הופכות לתצוגות תאימות מעל MATDOC (שאינה במילון הפרויקט), ו-ACDOCA מרכזת את הרישום הפיננסי.", xrefs: ["table:MKPF", "table:MSEG", "table:ACDOCA", "obj:material-document"] },
        { he: "אובייקטי התחזוקה שנשמרים: QMEL להודעות, ‏AUFK ו-AFIH לפקודות, ‏MPLA ו-MPOS לתכניות, ‏EQUI ו-IFLOT לאובייקטים הטכניים.", xrefs: ["table:QMEL", "table:AUFK", "table:MPLA", "table:MPOS", "table:EQUI", "table:IFLOT"] },
        { he: "אובייקטי הייצור שנשמרים: AFKO ו-AFPO לפקודות, ‏AFRU לאישורים, ‏RESB לרזרבציות, ‏MKAL לגרסת הייצור.", xrefs: ["table:AFKO", "table:AFRU", "table:RESB", "table:MKAL"] },
      ],
      integrationPoints: [
        { he: "אמצעי האינטגרציה משתנים: מ-PI/PO לחבילת האינטגרציה, מ-Gateway נפרד ל-Gateway מוטמע, ומ-BW נפרד לאנליטיקה מוטמעת על CDS; IDoc נשמר." },
        { he: "ממשקי BDC ו-CALL TRANSACTION על טרנזקציות MB מוסבים לקריאה ל-BAPI_GOODSMVT_CREATE.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "bp:goods-movement-process"] },
        { he: "אובייקט ההגירה של הודעת התחזוקה נוקב ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE בתיעוד ה-Data Migration הרשמי.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE", "bp:maintenance-notification-process"] },
        { he: "ממשקי לוויין (למשל מסופי שטח) נבדקים מול הרחבת מספר החומר ל-40 תווים.", xrefs: ["table:MARA"] },
      ],
      interfaces: [
        { he: "מסלול ההגירה, S/4HANA: לפי תיעוד Data Migration של 2025 FPS01, האפליקציה Migrate Your Data - Migration Cockpit (F3473) מעבירה נתונים ישירות ממערכת SAP מקור או דרך טבלאות Staging, ומאפשרת מיפוי, סימולציה והעברה עם ניטור. לפי What's New של 2025 FPS01, בגישת Migrate Data Directly from SAP System ה-Transfer List מציג את הנתונים שה-API היעד משתמש בהם ליצירת הנתונים ב-S/4HANA. F3473 אינה במילון הפרויקט ולכן אינה מקושרת." },
        { he: "ציוד ומיקום פונקציונלי, S/4HANA 2025 FPS01: אובייקט ההגירה PM - Equipment (S4_PM_EQUIPMENT, Direct Transfer - ERP) יוצר ציוד ב-BAPI_EQUI_CREATE ונשען על מודולי ההגירה CNV_PE_S4_PM_EQUI_USTAT (IBAPI_EQUI_USERSTATUS_CHANGE) ו-CNV_PE_S4_CA_DIR_OBJ_LINKS (BAPI_DOCUMENT_CHANGE2); ציוד-על נטען לפני הציוד שתחתיו, והאימות ב-IE02 וב-IE03. אובייקט PM - Functional location בוחר מיקומים מ-ILOA ונוקב ב-BAPI_FUNCLOC_CREATE ובמודול CNV_PE_S4_PM_FNLOC_USTAT. לפי רשומת האימות, עמוד הציוד אינו נוקב ב-BAPI התקנה נפרד.", xrefs: ["fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE", "table:EQUI", "table:IFLOT", "table:ILOA", "tx:IE02", "tx:IE03", "obj:equipment", "obj:functional-location"] },
        { he: "תכנית תחזוקה, S/4HANA 2025 FPS01: אובייקט ההגירה PM - Maintenance plan (S4_PM_MAINTENANCE_PLAN) מסווג Master data בגישת Direct Transfer - ERP, מעביר נתונים ב-APIs, ובשלב Create Maintenance Plan מודפס מודול הפונקציה MPLAN_CREATE לצד Find Maintenance Plans (F3622). העמוד מחייב הגירה מוקדמת של ציוד, מיקום פונקציונלי, רשימות פעולות ומרכז עבודה, ותכניות מבוססות ביצועים ותכניות מרובות מונים מחוץ להיקף. MPLAN_CREATE ו-F3622 אינם במילון הפרויקט.", xrefs: ["table:MPLA", "obj:maintenance-plan", "obj:equipment", "obj:functional-location", "obj:maintenance-task-list", "obj:work-center"] },
        { he: "רשימות פעולות ומדידות, S/4HANA 2025 FPS01: אובייקט PM - General maintenance task list נשען על CNV_PE_S4_PM_EAM_TASKLIST (EAM_TASKLIST_CREATE, EAM_TASKLIST_CHANGE, EAM_TASKLIST_POST) ועל CNV_PE_S4_PM_EAM_TASKLIST_DEP (CUKD_API_ALLOCATIONS_MAINTAIN), ואותה שורה מופיעה בעמודי רשימות הפעולות של ציוד ושל מיקום פונקציונלי; השם BAPI_TASKLIST_CREATE אינו מופיע בתקצירים. אובייקט PM - Measurement document נוקב ב-CNV_PE_S4_PM_MEASUREM_DOCUM וב-MEASUREM_DOCUM_RFC_SINGLE_001, עם תצוגה ב-IK13.", xrefs: ["obj:maintenance-task-list", "fm:MEASUREM_DOCUM_RFC_SINGLE_001", "table:IMRG", "tx:IK13"] },
        { he: "הודעות תחזוקה, S/4HANA 2025 FPS01: אובייקט PM - Maintenance notification נוקב ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE ובמודול CNV_PE_S4_PM_NOTIF_CREATE; התקציר מונה את השמות בלבד.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE", "table:QMEL", "obj:maintenance-notification", "bp:maintenance-notification-process"] },
        { he: "מרכז עבודה, S/4HANA 2025 FPS01: אובייקט PP - Work center בוחר מרכזי עבודה מ-CRHD ומונה תחת APIs/BAPIs את CNV_PE_S4_PM_CREATE_WORKCENTER עם CRAP_WORKCENTER_CREATE, לצד Display Work Center (CR03). CRAP_WORKCENTER_CREATE אינו במילון הפרויקט.", xrefs: ["table:CRHD", "tx:CR03", "obj:work-center"] },
        { he: "נתוני אב של תעשיות התהליך, S/4HANA 2025 FPS01: אובייקט PP - Production version (S4_PP_PRODUCTION_VERSION) בוחר גרסאות מ-MKAL ומדפיס בשלב Create Production Version את FV_PROD_VERS_MAINTAIN_MULTI, עם אימות ב-C223; אובייקט PP - Material BOM (S4_PP_MATERIAL_BOM) נשען על CNV_PE_S4_PP_MATERIAL_BOM_ECN עם CSAI_BOM_MAINTAIN ו-CSAP_MAT_BOM_MAINTAIN, ואימות ב-CS02 וב-CS03; אובייקט Master recipe (PP_MSTRRCP, רכיב PP-PI) מפנה לאימות ל-C203 ול-Manage Master Recipes (F5426), והרשומה שנקראה אינה נוקבת במודול פונקציה. FV_PROD_VERS_MAINTAIN_MULTI ו-F5426 אינם במילון הפרויקט.", xrefs: ["table:MKAL", "tx:C223", "fm:CSAP_MAT_BOM_MAINTAIN", "obj:material-bom", "tx:CS03", "obj:master-recipe", "tx:C203"] },
        { he: "פקודות תהליך פתוחות, S/4HANA: אובייקט PP - Process order (only open PO) מעביר פקודות בסטטוס Created או Released, ולפי What's New של 2023 אחרי ההגירה כל פקודות התהליך בסטטוס Created; האימות ב-COR3 (2025 FPS01). הרשומות שנקראו אינן נוקבות ב-API או ב-BAPI שהאובייקט משתמש בו.", xrefs: ["tx:COR3", "obj:process-order"] },
        { he: "שותף עסקי, S/4HANA 2025 FPS01: אובייקט Business partner (רכיב AP-MD-BP) מציג את CMD_MIG_BP_CVI_CREATE לצד Manage Business Partner Master Data (F3163); לפי אובייקט Supplier, תנאי מקדים להגירת ספקים הוא Customizing המחייב של CVI במערכת היעד. F3163 אינה במילון הפרויקט.", xrefs: ["table:BUT000"] },
        { he: "קוד מותאם ותנועות סחורה, S/4HANA: לפי 'S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM' (2023 FPS03), קוד לקוח שקורא ל-MB01, MB1A, MB1B ולטרנזקציות MB נוספות (למשל CALL TRANSACTION MBxy) מוחלף בקריאה ל-BAPI_GOODSMVT_CREATE, את MBST מחליף BAPI_GOODSMVT_CANCEL ואת MB02 ו-MB03 מחליף MIGO_DIALOG. BAPI_GOODSMVT_CANCEL ו-MIGO_DIALOG אינם במילון הפרויקט.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "tx:MB01", "tx:MB1A", "tx:MB1B", "tx:MIGO", "bp:goods-movement-process"] },
        { he: "טכנולוגיית הממשקים לפי שכבת הטרנספורמציה של המאגר: ב-ECC ממשקים סינכרוניים ב-RFC, BAPI ו-SOAP ומסרים אסינכרוניים ב-IDoc, ALE ו-qRFC; ב-S/4HANA OData (V2/V4) ו-REST דרך ה-Gateway המוטמע, SOAP עדיין נתמך ו-IDoc נשמר. לפי אותה שכבה רוב ה-BAPIs נשמרים ולחלקם חלופת OData או CDS, וסוגי ה-IDoc יציבים בכפוף לבדיקת סגמנטים מורחבים ושדות אורך.", xrefs: ["fm:BAPI_GOODSMVT_CREATE"] },
      ],
      outputs: [
        { he: "מערכת S/4HANA מוגדרת עם התהליכים בסקופ, אובייקטי WRICEF ותזרימי אינטגרציה." },
        { he: "אובייקטי הגירה טעונים עם דוח התאמה מול המקור." },
        { he: "תסריטי בדיקה ותוצאותיהם, יומן פגמים ותוכנית חיתוך מתועדת." },
      ],
      exceptions: [
        { he: "ערך לא קיים בטבלת בדיקה או ערך מיפוי חסר בשלב האימות: להשלים קונפיגורציה או חוק מיפוי ולהריץ שוב." },
        { he: "אובייקט נכשל כי אובייקט האב לא נטען: לתקן את רצף הטעינה." },
        { he: "אורך מספר החומר: מקור עם 18 תווים מול יעד עם 40; לוודא המרת אלפא ושדות ארוכים בתבנית.", xrefs: ["table:MARA"] },
        { he: "תוכנית Z שנשברת על מודל הנתונים החדש (תקרית matdoc-custom-code): להסב לקריאה דרך CDS ותצוגות תאימות.", xrefs: ["table:MSEG", "bp:matdoc-read-through-compatibility"] },
        { he: "לפי מרכז ההגירה של הפרויקט, חלק מהתכנים מסומנים כדורשי אימות: העברה ישירה ב-RFC, מספרי SAP Notes, תכנית תחזוקה, תכנית בדיקה ואובייקטי HR." },
      ],
      controls: [
        { he: "קריטריוני מוכנות משוקללים לפני הטעינה: היקף, ניקוי מקור, מיפוי, קונפיגורציה ביעד, רצף תלויות, אימות ותוכנית התאמה." },
        { he: "מימדי איכות נתונים: שלמות, ייחודיות, תקפות, עקביות, התאמה לפורמט ודיוק." },
        { he: "שער העברות והקפאת שינויים לפני החיתוך, עם תוכנית נסיגה." },
        { he: "אימות אחרי טעינה בכל אובייקט, ולא רק בסוף הרצף." },
      ],
      kpis: [
        { he: "התקדמות ההגירה לכל אובייקט הגירה (מדריך Data Migration, 2025 FPS01, מסך Migration Project): בעמודת Migration Progress אחוז המופעים שהועברו בהצלחה, אחוז המופעים עם שגיאות ואחוז המופעים שטרם התחילו, ולצדם מספר המופעים שהועברו בהצלחה ומספר המופעים עם שגיאות; עמוד ניטור מקביל באותו מדריך מוסיף את מספר המופעים שעובדו ואת מספר עבודות הרקע של ההגירה." },
        { he: "תוצאת הסימולציה לכל אובייקט הגירה (2025 FPS01): מספר המופעים שסומלצו בהצלחה ומספר המופעים עם שגיאות, לצד פעילויות Simulation Started ו-Simulation Completed במסך ה-Monitoring." },
        { he: "Data Migration Status (F3280, 2025 FPS01): סטטוס מפורט לכל מופע שסומלץ או הועבר, סקירה בזמן אמת של אובייקטים ופרויקטים, הודעות, עבודות רצות וסטטיסטיקה מורחבת (Extended Statistics); לפי העמוד היישום 'supports only the Migrate Data Using Staging Tables migration approach'. F3280 אינה במילון הפרויקט." },
      ],
      eccToS4: [
        { he: "מודל הנתונים: MKPF ו-MSEG מתאחדות ל-MATDOC ו-FI ו-CO מתאחדים ב-ACDOCA; הליבה הפונקציונלית נשמרת.", xrefs: ["table:MKPF", "table:MSEG", "table:ACDOCA"] },
        { he: "אובייקטי התחזוקה (ציוד, מיקום פונקציונלי, הודעה, פקודה) נשמרים; ההודעה עוברת לחוויית Fiori עם זרימה מובנית להזמנה.", xrefs: ["table:QMEL", "bp:maintenance-notification-process"] },
        { he: "פקודות הייצור והתהליך שומרות את מבנה הנתונים, ואילו התכנון עובר ל-MRP Live ול-aATP.", xrefs: ["table:AFKO", "tx:MD01N"] },
        { he: "טרנזקציות ה-MB מוחלפות ב-MIGO וב-BAPI לפי פריט הפישוט הרשמי.", xrefs: ["tx:MIGO", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "תזמון תכניות התחזוקה: פריט הפישוט הרשמי מסמן את IP30 כטכנולוגיה שאינה עתידית ומורה ליצור עבודות רקע ל-IP30H.", xrefs: ["tx:IP30", "tx:IP30H"] },
      ],
      migration: [
        { he: "גישות ההעברה במרכז ההגירה: טבלאות Staging, העלאת קובץ, והתאמת אובייקטים במודל האובייקטים; העברה ישירה ב-RFC מסומנת במאגר כדורשת אימות." },
        { he: "רצף הטעינה: בסיס, נתוני אב, תנועות ויתרות; לקוח וספק נטענים כתפקידי שותף עסקי.", xrefs: ["table:BUT000", "table:KNA1"] },
        { he: "בצד התחזוקה: מיקום פונקציונלי וציוד כנתוני אב, ותכנית תחזוקה כאובייקט תנועתי המסומן במאגר כדורש אימות; לעומת זאת, עמוד Data Migration הרשמי PM - Maintenance plan (2025 FPS01) מסווג את האובייקט Master data בגישת Direct Transfer - ERP (ראו notes).", xrefs: ["table:IFLOT", "table:EQUI", "table:MPLA"] },
        { he: "בצד תעשיות התהליך: מתכון ייצור וגרסת ייצור, שהיא תנאי לתכנון ולפקודות ב-S/4HANA.", xrefs: ["table:PLKO", "table:MKAL"] },
        { he: "אחרי הטעינה: התאמה מול המקור, ואז בדיקות מחזור מלא בתהליכי הליבה.", xrefs: ["bp:confirmation-process", "bp:goods-movement-process"] },
      ],
      reference: {
        title: "PM - Maintenance notification | Data Migration (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד ה-Data Migration הרשמי לאובייקט ההגירה של הודעת התחזוקה (אומת ברשומת fm:BAPI_ALM_NOTIF_CREATE). " +
          "היקפו אובייקט הגירה אחד; עמוד רשמי יחיד המתאר את תהליך ההמרה כולו לא אותר בשכבות האימות, ולכן יתר " +
          "המקורות הרשמיים כאן הם רשימות הפישוט. מ-2026-09-28 נוספו לרשומה עמודי Data Migration של אובייקטי הגירה " +
          "נוספים ושל אפליקציות ההגירה (ראו notes). עמוד What's New של Transfer List (2025 FPS01, loio 198b2887) " +
          "מדפיס את Scope Item BH3 (Data Migration to SAP S/4HANA from SAP) עבור אפליקציית Migrate Your Data " +
          "(F3473); הפריט מכסה את מסלול הגירת הנתונים בלבד ולא את תהליך ההמרה כולו, ולכן אינו נרשם כ-reference של " +
          "התהליך.",
      },
    },
    xrefs: [
      "table:MKPF", "table:MSEG", "table:ACDOCA", "table:MARA", "table:MARD", "table:BUT000", "table:KNA1",
      "table:IFLOT", "table:EQUI", "table:MPLA", "table:MPOS", "table:QMEL", "table:AUFK", "table:AFKO",
      "table:AFRU", "table:RESB", "table:MKAL", "table:PLKO", "table:STKO", "table:CRHD",
      "tx:MIGO", "tx:MB01", "tx:MB1A", "tx:MB1B", "tx:IP01", "tx:IP10", "tx:IP30", "tx:IP30H",
      "tx:SCI", "tx:ST22", "tx:SE16N", "tx:COGI", "tx:SM13", "tx:MD01N",
      "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE",
      "obj:material-document", "obj:maintenance-plan",
      "bp:matdoc-read-through-compatibility", "bp:maintenance-notification-process",
      "bp:goods-movement-process", "bp:confirmation-process",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מרכז ההגירה של הפרויקט (MIGRATION_COCKPIT): גישות, אובייקטים, רצף טעינה, שגיאות, איכות ומוכנות",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "גישות ההעברה: טבלאות Staging, העלאת קובץ והתאמה במודל אובייקטי ההגירה מסומנות במאגר כ-curated; " +
          "העברה ישירה ב-RFC ומספרי ה-SAP Notes מסומנים needs-verification. אובייקטי ההגירה נטענים ברצף " +
          "בסיס, נתוני אב, תנועות: שותף עסקי, חשבון ראשי, מרכז עלות, אב חומר, מרכז עבודה ומיקום פונקציונלי; " +
          "לקוח וספק כתפקידי שותף עסקי, עץ מוצר, רשימת פעולות, מתכון ייצור, גרסת ייצור וציוד; ולבסוף יתרות " +
          "מלאי, הזמנות פתוחות ופריטים פתוחים. תכנית תחזוקה, תכנית בדיקה ואובייקטי HR מסומנים " +
          "needs-verification. שגיאות טיפוסיות: ערך לא קיים בטבלת בדיקה, ערך מיפוי חסר, תלות לא נטענה, שדה " +
          "חובה ריק, אורך מספר חומר, פורמט תאריך, מפתח כפול והמרת יחידה. מימדי איכות: שלמות, ייחודיות, " +
          "תקפות, עקביות, התאמה לפורמט ודיוק. קריטריוני המוכנות משוקללים, ורשימת התהליך נעה מהפעלת מרכז " +
          "ההגירה ועד התאמה ומסירה לחיתוך.",
        verificationLevel: "repository_verified",
        repoRef: "data/migration-cockpit.ts#MIG_OBJECTS",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז הטרנספורמציה של הפרויקט (S4_TRANSFORMATION): קוד מותאם, אינטגרציה, בדיקות, חיתוך ולקחים",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "קוד מותאם בסיכון גבוה: SELECT ישיר על MKPF, ‏MSEG, ‏MARD ו-MCHB, שהוחלפו ב-MATDOC עם תצוגות " +
          "תאימות לקריאה בלבד וכתיבה דרך BAPI; SELECT ישיר על טבלאות האינדקס של FI שהוחלפו ב-ACDOCA; " +
          "והרחבת מספר החומר ל-40 תווים. רוב ה-BAPI נשמרים, ובהם BAPI_GOODSMVT_CREATE. הכלים הנקובים: הערכת " +
          "מוכנות, קטלוג פריטי הפישוט, ATC עם ואריאנט המוכנות וכלי הסבת הקוד. אינטגרציה: מעבר לחבילת " +
          "האינטגרציה, ‏Gateway מוטמע, שמירת IDoc ואנליטיקה מוטמעת. רמות הבדיקה כוללות יחידה, מוכנות, " +
          "אינטגרציה, ממשקים, קבלה, רגרסיה, ביצועים ואימות הגירה. החיתוך מחולק ללפני העלייה (הקפאת שינויים, " +
          "הרצה יבשה, סגירת תקופות וניקוי COGI ו-IDoc בשגיאה, גיבוי ותוכנית נסיגה), עלייה (טעינת פתיחה, " +
          "אקטיבציה, בדיקת עשן לתהליכי הליבה) והתייצבות.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-transformation.ts#CUSTOM_CODE",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) ונושאי המעבר (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MATDOC מאחדת את MKPF ואת MSEG ומלאי מחושב בזמן ריצה, בסיכון גבוה; ACDOCA מאחדת FI ו-CO ומייתרת " +
          "התאמה נפרדת, ועלויות פקודות הייצור והתחזוקה זורמות אליה. נושאי מעבר נוספים הנוגעים לתחומים אלה: " +
          "MRP Live, ‏aATP, פקודות ייצור ותהליך שנשארות ללא שינוי מבני, אובייקטי תחזוקת מפעל שנשארים, הודעות " +
          "תקלה שמשנות חוויית משתמש, הרחבת מספר החומר, ספר החומרים, שכבת Fiori ו-CDS ואנליטיקה מוטמעת.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הטרנזקציות (LIFECYCLE) במאגר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "השכבה מסווגת כל טרנזקציה לסטטוס (פעילה, לא מומלצת, מיושנת), לזמינות ב-ECC וב-S/4HANA, לחלופת " +
          "Fiori, לחלופה מומלצת, לפריט פישוט, להערת הגירה ולרמת השפעה. לדוגמה, MB1A, ‏MB1B, ‏MB1C, ‏MB01, " +
          "‏MB02, ‏MB03, ‏MB11, ‏MB31 ו-MBST מסומנות מיושנות עם חלופה MIGO ופריט פישוט MM-IM, בעוד MIGO, " +
          "‏MB51, ‏MB52 ו-MMBE מסומנות פעילות; רשומת MIGO קובעת 'מרכזי ב-S/4; תנועות נרשמות ל-MATDOC. החלופה " +
          "ל-MB*'. רשומת tx:MB01 בשכבת האימות מסייגת את 's4:false' כמפריז ביחס לעמדה הרשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MIGO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז אספקת הפרויקט (PROJECT_DELIVERY): שלבי SAP Activate ומרכז ה-Blueprint",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מסמך המאגר מתאר שישה שלבים: גילוי (הערכת ערך, סקופ ראשוני, הערכת מוכנות והחלטת גישת המרה), הכנה " +
          "(ממשל, צוות, תוכנית וסביבות), חקירה (סדנאות Fit-to-Standard, פערים ו-WRICEF, ‏Backlog ועיצוב " +
          "פתרון), מימוש (קונפיגורציה, פיתוח, אינטגרציות, בניית הגירה ובדיקות), ואחריהם פריסה והרצה. מרכז " +
          "ה-Blueprint קובע ש-Fit-to-Standard מחליף את ה-Business Blueprint הקלאסי, ומונה רשימת תהליכים " +
          "בסקופ (BPML) עם פריטי Scope של Best Practices, ניתוח פער, מצבת WRICEF ומסמכי עיצוב. זו אמירה של " +
          "המאגר על המתודולוגיה, ולא ציטוט ממקור SAP רשמי; אף פריט Scope אינו נקוב בשמו או במזהה.",
        verificationLevel: "repository_verified",
        repoRef: "data/project-delivery.ts#BLUEPRINT",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: matdoc-custom-code",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תוכנית Z נכשלת או מחזירה ריק ב-S/4HANA משום שהיא קוראת MKPF או MSEG ישירות; הסיבות: SELECT או " +
          "INSERT ישיר, מבנה שונה ב-MATDOC ותלות בשדות שהוסרו. הפתרון: הסבה לתצוגת CDS או לתצוגת תאימות, " +
          "הסרת כתיבה ישירה לטובת BAPI, ותיקון תלות השדות; המניעה היא סריקת ATC לפני ההמרה והתאמת קוד מותאם.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#matdoc-custom-code",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 4.1.2 " +
          "S4TWL - Scheduling of Maintenance Plan (PM-PRM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_FM_21,
        claim:
          "פריט 4.1.2 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום PM-PRM) קובע בלשונו: " +
          "'Transaction IP30 is doing scheduling for Maintenance Plans. Within this scheduling outdated " +
          "technology (Batch Input) is used. Functionality available in SAP S/4HANA on-premise edition 1511 " +
          "delivery but not considered as future technology. Functional equivalent is not available yet. We " +
          "plan to discontinue this in one of the next Releases. The new transaction for doing mass scheduling " +
          "is IP30H which is optimized for HANA and is offering parallel processing at a much hiher speed' [כך " +
          "במקור]; ותחת Required and Recommended Action(s): 'Review your background Jobs which you most " +
          "probably have scheduled periodically for transaction IP30 (Reports RISTRA20) and create new " +
          "background jobs for IP30H (Report RISTRA20H)' (אומת ברשומת tx:IP30H).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 (SIMPL_OP2023.pdf) · item 29.6 S4TWL - Scheduling of " +
          "Maintenance Plan (PM, PM-PRM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_FM_22,
        claim:
          "רשימת הפישוט של SAP S/4HANA 2023 (הקובץ SIMPL_OP2023.pdf, נקרא מקומית במלואו) נושאת את אותו פריט " +
          "באותו נוסח: 'The new transaction for doing mass scheduling is IP30H which is optimized for HANA and " +
          "is offering parallel processing at a much hiher speed' [כך במקור], ותחת Required and Recommended " +
          "Action(s): 'Review your background Jobs which you most probably have scheduled periodically for " +
          "transaction IP30 (Reports RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)'. " +
          "כלומר IP30H היא הנתיב הרשמי לתזמון המוני לפחות ממהדורת 2023 ועד 2025 FPS01 (אומת ברשומת tx:IP30H).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF " +
          "TRANSACTIONS IN MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_FM_14,
        claim:
          "פריט 27.6 (עמ' 644-645) קובע שטרנזקציות ה-MB לרישום ולהצגה של תנועות סחורה הוחלפו ב-MIGO או " +
          "במודולי הפונקציה BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL, ובסעיף הפתרון מורה להחליף קוד לקוח " +
          "הקורא ל-MB01, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL ו-MBSU (למשל " +
          "CALL TRANSACTION MBxy) בשימוש ב-BAPI_GOODSMVT_CREATE, את MBST ב-BAPI_GOODSMVT_CANCEL ואת MB02/MB03 " +
          "ב-MIGO_DIALOG (אומת ברשומת fm:BAPI_GOODSMVT_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "אובייקט ההגירה 'PM - Maintenance notification' בתיעוד Data Migration לגרסת 2025 FPS01 נוקב " +
          "ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE תחת 'APIs/BAPIs', לצד מודול הפונקציה " +
          "CNV_PE_S4_PM_NOTIF_CREATE (כלשון הסניפט). הסניפט מונה את השמות בלבד ואינו מתאר את אופן השימוש בהם " +
          "(אומת ברשומת fm:BAPI_ALM_NOTIF_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "מודל הנתונים של מסמכי החומר ב-S/4HANA On-Premise 2025 FPS01: 'in the MM-IM area: There is a new " +
          "single table MATDOC instead of the existing tables MKPF and MSEG'; התקציר מדפיס גם 'Note In SAP " +
          "S/4HANA, a new, simplified data model has been introduced' ונקטע שם (אומת ברשומת " +
          "fm:BAPI_GOODSMVT_GETITEMS).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 11 בספריית הפרויקט (גשר הידע לקראת יישום S/4HANA), פרק 4, סעיף 4.6 'SAP S/4HANA vs SAP ECC'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מציג את מערכת ה-ERP ואת מקומה של S/4HANA מול ECC (4.4 עד 4.7), ופרק 5 מתאר נוף מערכות, " +
          "לקוחות ותפקידי פרויקט; הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book11.json#4.6",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 1 בספריית הפרויקט (SAP PRESS, הגדרת תחזוקת מפעל ב-S/4HANA), פרק 1, סעיף 1.1.2 'SAP Activate Methodology'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתאר תהליך אפשרי לפרויקט תחזוקת מפעל עם SAP: אסטרטגיית יישום (1.1.1), מתודולוגיית SAP " +
          "Activate (1.1.2), גורמי סיכון והצלחה (1.2), וטיפים לפי שלבי השיטה (1.3.1 עד 1.3.6); הספר משמש כאן " +
          "להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book1.json#1.1.2",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/2f60604160f141be904d23b23e69c3a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד אובייקט ההגירה PM - Equipment במדריך Data Migration למהדורת On-Premise‏ 2025 FPS01 ‏(loio " +
          "2f60604160f141be904d23b23e69c3a6) נוקב בתקציר בשם BAPI_EQUI_CREATE: 'Equipment Number Display Technical " +
          "Object (app ID W0028) BAPI_EQUI_CREATE Create DIR Link Creates document info record links in the target " +
          "system.' תקצירים אחרים של אותה רשומה קובעים: 'This migration object enables you to migrate equipment " +
          "data from the source ERP system to the target system based on the default selection criteria set for the " +
          "migration object', 'In Scope The following data is set for migration: General data for technical objects " +
          "Equipment-specific data Vehicle-specific data Valid-from date for equipment Object links for document " +
          "info', ותחת הכותרת 'APIs/BAPIs Used in Migration-Specific Function Modules': 'Migration-specific " +
          "function modules are used in this migration object. ... These function modules use standard BAPIs or " +
          "other function modules to complete the migration scope. ... Function Module: CNV_PE_S4_CA_DIR_OBJ_LINKS " +
          "APIs/BAPIs BAPI_DOCUMENT_CHANGE2 Function Module: CNV_PE_S4_PM_EQUI_USTAT APIs/BAPIs " +
          "IBAPI_EQUI_USERSTATUS_CHANGE'. עמוד האח לאותו אובייקט ממקור AFS ‏(loio 66ade42ab441470b8e0d4eeb57ea8ea0, " +
          "2025.001) נוקב גם הוא בשם: 'Equipment Number Display Equipment (app ID IE03) BAPI_EQUI_CREATE Migrate " +
          "Direct Object Link' ומתאר את שלב ההעברה 'Create Equipment Creates equipment in the target system'. שיוך " +
          "BAPI_EQUI_CREATE לשלב 'Create Equipment' הוא הסקה מסדר העמודות בטבלת אפשרויות ההעברה שבתקציר ולא משפט " +
          "שנראה במלואו. כלומר BAPI_EQUI_CREATE מתועד ב-S/4HANA 2025 FPS01 כממשק שאובייקט ההגירה של ציוד נסמך עליו; " +
          "העמוד אינו קובע דבר על סטטוס השחרור של ה-BAPI או על הפרמטרים שלו. (אומת ברשומת fm:BAPI_EQUI_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment | Data Migration (אובייקט ההגירה S4_PM_EQUIPMENT, Direct Transfer - ERP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/2f60604160f141be904d23b23e69c3a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד אובייקט ההגירה הרשמי 'PM - Equipment' (loio 2f60604160f141be904d23b23e69c3a6, versionId 2025.001, " +
          "תאריך 2026-02-24; אחד משלושה עמודים באותה כותרת, זה שמקורו מערכת ERP), שחיפוש אינטרנט מוגבל לדומיינים " +
          "הרשמיים החזיר לשאילתה \"BAPI_EQUI_INSTALL\" בכתובת המהדורה 2023 שלו, עובד ב-2026-09-22 בדפדפן (כלי " +
          "browser-use) בשתי המהדורות, 2025 FPS01 (Feb 2026) ו-2023 Latest, ונקרא במלואו. כלשונו במהדורת 2025 " +
          "FPS01: 'This migration object enables you to migrate equipment data from the source ERP system to the " +
          "target system based on the default selection criteria set for the migration object. This migration " +
          "technique transfers data to the target system using Business Application Programming Interfaces " +
          "(BAPIs).' רשימת In Scope כוללת 'Installation date for equipment' ו-'Valid-from date for equipment', עם " +
          "ההערה 'You can migrate only the latest time segment data (valid-from date for equipment) to the target " +
          "system'; Technical Information: 'Name of this migration object: S4_PM_EQUIPMENT', טבלאות וירטואליות " +
          "ILOA_WC, ILOA_WBS, ILOA_FLOC ו-EQUZ_WC, וההנחיה 'If superordinate equipment is assigned to an equipment, " +
          "you need to migrate the superordinate equipment before migrating the equipment', שאם לא כן מוצגת השגיאה " +
          "'Equipment could not be read'. טבלת שלבי ההעברה נוקבת במודול הפונקציה של השלב 'Create Equipment' בשם " +
          "BAPI_EQUI_CREATE (ניווט לאפליקציה 'Display Technical Object (app ID W0028)'), ובסעיף 'APIs/BAPIs Used in " +
          "Migration-Specific Function Modules' במודולים CNV_PE_S4_CA_DIR_OBJ_LINKS (BAPI_DOCUMENT_CHANGE2) " +
          "ו-CNV_PE_S4_PM_EQUI_USTAT (IBAPI_EQUI_USERSTATUS_CHANGE); טרנזקציות האימות הן IE02 ו-IE03, ואובייקט " +
          "ההרשאה I_BETRVORG. ממצא שלילי תחום לשתי הקריאות: המחרוזות BAPI_EQUI_INSTALL, ‏BAPI_EQUI_DISMANTLE " +
          "ו-EQUIPMENT_DISMANTLE אינן מופיעות באף אחת משתי המהדורות; ההתאמה של מנוע החיפוש הכללי הייתה רופפת ולא " +
          "אזכור בטקסט. כלומר גם אובייקט ההגירה שמעביר תאריך התקנה ושיוך לציוד-על אינו נוקב ב-BAPI התקנה נפרד, אלא " +
          "ב-BAPI_EQUI_CREATE בלבד. (אומת ברשומת fm:BAPI_EQUI_INSTALL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Functional location | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/7c5578ab53e0457f905145bc535839cf.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_21,
        claim:
          "אובייקט ההגירה PM - Functional location ‏(מדריך Data Migration, 2025 FPS01) מתואר בסניפט כ-'This " +
          "migration object enables you to migrate functional location data from the source ERP system to the " +
          "target system based on the default selection criteria', ונכתב בו ש-'This migration object automatically " +
          "selects functional locations from the ILOA table for the derived plants'. בין שלבי ההעברה מופיעים " +
          "'Create Functional Location Creates the functional location in the target system. All instances that " +
          "qualify for this transfer option are relevant to the transfer step' ו-'Change Data Origin Changes the " +
          "data origin data in the target system'. תחת הכותרת 'APIs/BAPIs Used in Migration-Specific Function " +
          "Modules' נכתב 'A migration-specific function module is used in this migration object' ו-'This function " +
          "module uses standard BAPIs or other function modules to complete the migration scope'. בסניפטים של אותו " +
          "נושא מופיעים בשמם BAPI_FUNCLOC_CREATE, מודול ההגירה CNV_PE_S4_PM_FNLOC_USTAT והיישום 'Display Technical " +
          "Object (app ID W0028)'. (אומת ברשומת fm:BAPI_FUNCLOC_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance plan | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/60a36b24c79d4629b04fa59c409154f5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף עמוד אובייקט ההגירה (loio 60a36b24c79d4629b04fa59c409154f5, גרסה 2025 FPS01) נקרא ב-2026-09-28 דרך " +
          "scripts/sap-help-body.mjs. העמוד קובע 'This migration technique transfers data to the target system " +
          "using Application Programming Interfaces (APIs)', מסווג את האובייקט 'Business Object Type Master data' " +
          "בגישת 'Direct Transfer - ERP', ובוחר תכניות 'from the MPLA table for the derived maintenance planning " +
          "plants'. בהיקף: תכניות מבוססות זמן, תכניות אסטרטגיה, תכניות מחזור יחיד, פריטי תכנית וטקסטים ארוכים; " +
          "העמוד מונה את Strategy plans ואת Single cycle plans גם תחת Out of Scope, לצד פריטים נוספים מחוץ להיקף, " +
          "בין השאר 'Performance-based maintenance plans' ו-'Multi-counter plans'. תנאי מקדים: 'You have migrated " +
          "or defined settings in the following migration objects: PM - Equipment PM - Equipment task list PM - " +
          "Functional location PM - Functional location task list PM - General maintenance task list PP - Work " +
          "center SD - Sales contract'. שם האובייקט S4_PM_MAINTENANCE_PLAN, ובטבלת שלבי ההעברה לשלב 'Create " +
          "Maintenance Plan' מודפסים 'Find Maintenance Plans (app ID F3622)' בעמודת האפליקציה ו-'MPLAN_CREATE' " +
          "בעמודת Function Module.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - General maintenance task list | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/d24a211cfa404cdd908cbee5fef91904.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד אובייקט המיגרציה הרשמי 'PM - General maintenance task list' למהדורת On-Premise‏ 2025 FPS01 ‏(loio " +
          "d24a211c) רושם בתקצירו 'Function Module: CNV_PE_S4_PM_EAM_TASKLIST APIs/BAPIs EAM_TASKLIST_CREATE " +
          "EAM_TASKLIST_CHANGE EAM_TASKLIST_POST' ו-'Function Module: CNV_PE_S4_PM_EAM_TASKLIST_DEP APIs/BAPIs " +
          "CUKD_API_ALLOCATIONS_MAINTAIN', ומתאר את האובייקט: 'This migration object enables you to migrate general " +
          "task list data from the source ERP system to the target system'. אותה שורת EAM_TASKLIST_* מופיעה בתקצירי " +
          "העמודים האחים 'PM - Equipment task list' ‏(loio 46e9d5ce) ו-'PM - Functional location task list' ‏(loio " +
          "6a850a18). השם BAPI_TASKLIST_CREATE אינו מופיע באף אחד מהתקצירים; התקציר אינו מפרט פרמטרים, סטטוס שחרור " +
          "או התנהגות COMMIT של מודולי EAM_TASKLIST_*. (אומת ברשומת fm:BAPI_TASKLIST_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Measurement document | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/3ed6702ecafa4258ae9d4f0a1f073d98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_21,
        claim:
          "עמוד אובייקט ההגירה 'PM - Measurement document' במדריך Data Migration לגרסת 2025 FPS01 מציג בתקציר את " +
          "הרצף 'Function Module: CNV_PE_S4_PM_MEASUREM_DOCUM APIs/BAPIs MEASUREM_DOCUM_RFC_SINGLE_001', כלומר תחת " +
          "הכותרת APIs/BAPIs נקוב מודול הפונקציה MEASUREM_DOCUM_RFC_SINGLE_001 ולא שם BAPI. בהרצת חיפוש נוספת באותו " +
          "יום החזיר אותו עמוד את הרצף 'Measurement Document Display Measurement Document (app ID IK13) " +
          "CNV_PE_S4_PM_MEASUREM_DOCUM APIs/BAPIs Used in Migration-Specific Function Modules'. התקצירים מוגשים עם " +
          "השמטות, ולכן נטען כאן רק מה שהופיע ברצף. (אומת ברשומת fm:BAPI_MEASUREMENTDOCUM_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Work center | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/fbb00ccf1fde4610b35b39caac89dc0c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "עמוד אובייקט ההגירה PP - Work center (Data Migration, 2025 FPS01, מקור ERP) קובע לפי הסניפט: 'This " +
          "migration object automatically selects all work centers from the CRHD table for the derived plants', " +
          "ומונה תחת 'APIs/BAPIs Used in Migration-Specific Function Modules' את 'Function Module: " +
          "CNV_PE_S4_PM_CREATE_WORKCENTER APIs/BAPI CRAP_WORKCENTER_CREATE', לצד האפליקציה Display Work Center (app " +
          "ID CR03). זהו אזכור רשמי לבן משפחה של CRAP_WORKCENTER_ ב-S/4HANA 2025 (יצירה בלבד); הסניפט אינו נוקב בשם " +
          "CRAP_WORKCENTER_GET_DETAIL ואינו אומר דבר על סטטוס השחרור של אף אחד מהם. (אומת ברשומת " +
          "fm:CRAP_WORKCENTER_GET_DETAIL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production version | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/94e563ae05544015adbf46931532aa3f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "גוף עמוד אובייקט ההגירה 'PP - Production version' להעברה ישירה ממערכת ERP (2025 FPS01, loio " +
          "94e563ae05544015adbf46931532aa3f, deliverable_id 40374799, buildNo 1779) נקרא במלואו דרך שירות התוכן. " +
          "העמוד קובע 'This migration technique transfers data to the target system using Application Programming " +
          "Interfaces (APIs)', 'This migration object automatically selects the production version of the materials " +
          "from the MKAL table for the derived plants' ו-'Name of this migration object: S4_PP_PRODUCTION_VERSION'. " +
          "בטבלת שלבי ההעברה מודפס לשלב 'Create Production Version' ('Creates a production version in the target " +
          "system') בעמודת Function Module השם FV_PROD_VERS_MAINTAIN_MULTI, ואותו שם מודפס גם בתקציר עמוד האח " +
          "להעברה ממערכת AFS (loio eacf3a5d51224118a4e480911569d19e, 2025.001). העמוד דורש את אובייקט ההרשאה " +
          "'C_FVER_WRK (Production Version - Plant)', מפנה לאימות הנתונים ב-C223 לשינוי ולתצוגה, וקובע 'In SAP ERP, " +
          "it is not necessary to have a production version for BOM explosion in Discrete Manufacturing', עם הפניה " +
          "לדוח CS_BOM_PORDVER_MIGRATION02 (כך במקור) ליצירת גרסאות ייצור מ-BOM ומסלולים קיימים. עמוד האפליקציה " +
          "'Process Production Versions' במדריך Production Planning and Control (2025.001, loio " +
          "907b678f57d24d3bbaa03f99e5506d21, נקרא במלואו) מדפיס 'App ID: F6400', מונה בין הפעולות 'Create a new " +
          "production version' ו-'Delete a production version', וקובע שבדיקות העקביות שמוגדרות ב-Customizing חלות " +
          "על האפליקציה ולא על 'Manage Production Versions: C223 (Web GUI app)'. אף אחד מהעמודים אינו נוקב בשם " +
          "BAPI_PRODVERS_CREATE_REPLACE או בשם CM_FV_PROD_VERS_MAINTAIN, ואף אחד אינו מתאר סטטוס שחרור, סימון RFC " +
          "או ממשק של FV_PROD_VERS_MAINTAIN_MULTI. (אומת ברשומת fm:BAPI_PRODVERS_CREATE_REPLACE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Material BOM | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/4348363aafa4419986ee8839f4b27218.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "גוף עמוד אובייקט ההגירה במדריך Data Migration למהדורת 2025 FPS01 (loio 4348363aafa4419986ee8839f4b27218, " +
          "תאריך 2026-02-24) נקרא במלואו דרך שירות התוכן (deliverable_id 40374799, buildNo 1779). הנושא אינו בעץ " +
          "התיעוד של הדליברבל, ולכן נקרא בקריאה ישירה ל-http.svc/pagecontent עם file_path של ה-loio. העמוד קובע " +
          "'This migration object enables you to migrate material BOM data from the source ERP system to the target " +
          "system' ו-'This migration technique transfers data to the target system using Application Programming " +
          "Interfaces (APIs)', בגישת ההגירה 'Direct Transfer - ERP', ברכיב PP-BD ובשם הטכני S4_PP_MATERIAL_BOM. " +
          "בטבלת צעדי ההעברה הצעד 'Create Material BOM' ('Creates the material BOM in the target system') משויך " +
          "למודול ההגירה CNV_PE_S4_PP_MATERIAL_BOM_ECN ולאפליקציה 'Maintain Bill Of Material (app ID F1813)', ותחת " +
          "'APIs/BAPIs Used in Migration-Specific Function Modules' נכתב 'This function module uses standard BAPIs " +
          "or other function modules to complete the migration scope'; לצד CNV_PE_S4_PP_MATERIAL_BOM_ECN רשומים " +
          "בעמודת APIs/BAPIs המודולים CSAI_BOM_MAINTAIN ו-CSAP_MAT_BOM_MAINTAIN. בהיקף ההגירה: נתוני בסיס, פריטים " +
          "ותת-פריטים, טקסטים ארוכים, תלויות מקומיות, 'All alternative BOM numbers (from 01 to 99)' ו-'Modified " +
          "records that use engineering change numbers'; מחוץ להיקף בין השאר Fashion material BOM, סיווג פריטים, " +
          "מחיקת כותרות, פריטים ותלויות, ו-Configurable material BOM. אובייקטי ההרשאה במערכת היעד הם C_TCLA_BKA, " +
          "C_STUE_NOH, C_STUE_BER ו-C_STUE_WRK, ולאימות הנתונים העמוד נוקב ב-CS02 (Change) וב-CS03 (Display). עמוד " +
          "התאום לתרחיש AFS (loio 85ec99dcc4a840eaa7e95e84ca17e34a, S4_AFS_PP_MATERIAL_BOM, 'Direct Transfer - " +
          "AFS', הגוף נקרא במלואו) רושם את אותם שני המודולים לצד CNV_PE_S4_AFS_PP_MAT_BOM. כלומר לפי העמודים, " +
          "מודולי ההגירה של SAP לעצי מוצר לחומר ב-S/4HANA 2025 FPS01 נשענים בין השאר על CSAP_MAT_BOM_MAINTAIN. " +
          "העמודים אינם מתארים את חתימת המודול, אינם נוקבים ב-COMMIT ואינם מציינים סטטוס שחרור. (אומת ברשומת " +
          "fm:CSAP_MAT_BOM_MAINTAIN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Master recipe | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/aa818997f3524905ab7bb863aceddb81.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_07,
        claim:
          "עמוד אובייקט ההגירה 'Master recipe' ‏(Object Alias PP_MSTRRCP, רכיב PP-PI, סוג Master data) מגדיר: 'A " +
          "description of an enterprise-specific process in the process industry that doesn't relate to a specific " +
          "order', ומונה לאימות הנתונים: 'App: Display Master Recipe (C203) Manage Master Recipes (F5426)' וכן " +
          "'Transaction: Display Master Recipe (C203)'. אפליקציית Manage Master Recipes ‏(F5426) היא חלופת ה-Fiori " +
          "המתועדת לניהול מתכוני אב ב-2025 FPS01. (אומת ברשומת tx:C201)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Process order (only open PO) | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/011bdaaa5ce047f690cb9f8319c6efed.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_07,
        claim:
          "מדריך ההגירה של 2025 FPS01 לאובייקט 'PP - Process order (only open PO)' מציע לאמת את הנתונים המהוגרים " +
          "ב-back end דרך 'Transaction: Display Process Order (COR3)' ומוסיף: 'App: Display Process Order (COR3) " +
          "Open the SAP Fiori apps reference library by choosing the app name above'. הסניפט מציין שמדובר בהגירת " +
          "הזמנות תהליך בסטטוס Created או Released. (אומת ברשומת tx:COR3)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Migration Object: PP - Process Order (Only Open PO) | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/e01aae9cfba24c608e22f71737d37a26.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE_FM_02,
        claim:
          "פקודות תהליך בסטטוס Created או Released ניתנות להגירה; לאחר ההגירה כל פקודות התהליך בסטטוס Created. " +
          "(אומת ברשומת fm:BAPI_PROCORD_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business partner | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/61bca3e722954443b88eee2839e41610.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_07,
        claim:
          "אובייקט ההגירה הרשמי 'Business partner' (Data Migration, 2025 FPS01) מציג את אפליקציית ה-Fiori‏ 'Manage " +
          "Business Partner Master Data (app ID F3163)' ולצדה את השם CMD_MIG_BP_CVI_CREATE, רכיב AP-MD-BP, סוג " +
          "אובייקט 'Master data' והגדרה 'A person, organization, or group of people' (כלשון הסניפט). (אומת ברשומת " +
          "table:BUT000)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Supplier | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/db7415b7245c42f9889b6f7bacca5606.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_02,
        claim:
          "תנאי מקדים רשמי להגירת ספקים: הגדרת כל ה-Customizing המחייב של customer-vendor integration ‏(CVI) במערכת " +
          "היעד. (אומת ברשומת fm:CVI_VENDOR_TO_BP_CONVERT)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Migrate Your Data - Migration Cockpit | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/2f0dbe4111214bcf9b2d57eca26f0525.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 2f0dbe4111214bcf9b2d57eca26f0525, גרסה 2025 FPS01) נקרא ב-2026-09-28: 'App ID: F3473 " +
          "With this app, you can migrate business data to SAP S/4HANA. You can migrate data directly from certain " +
          "SAP source systems, or you can use staging tables to migrate data.' בין היכולות: יצירת פרויקטי הגירה " +
          "וניטור סטטוס ההגירה, בחירת אובייקטי ההגירה הרלוונטיים, עיבוד משימות מיפוי, סימולציה לפני ההעברה והעברה " +
          "עם ניטור. האפליקציה משתמשת ב-Situation Handling, ובמידע הקשור נכתב 'See the Data Migration to SAP " +
          "S/4HANA from Staging ( 2Q2 ) test script'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Migrate Your Data App – Transfer List | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition " +
          "2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/198b2887879446d3a8b48c3570772f3a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 198b2887879446d3a8b48c3570772f3a) נקרא ב-2026-09-28: 'For the migration approach Migrate " +
          "Data Directly from SAP System , you can use the transfer list to view the data that the target API uses " +
          "to create data in SAP S/4HANA.' בפרטים הטכניים: 'Type Changed', 'Scope Item BH3 ( Data Migration to SAP " +
          "S/4HANA from SAP )', 'Technical Object Name App ID: F3473', 'Application Component CA-LT-MC ( SAP " +
          "S/4HANA Migration Cockpit )' ו-'Valid as Of 2025 FPS01'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitoring the Status of the Migration Process | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/15af3c88f81642a9b0f98af37f3583a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 15af3c88f81642a9b0f98af37f3583a6, גרסה 2025 FPS01) נקרא ב-2026-09-28: 'If the migration " +
          "has started for a migration object, you can view the following percentage values in the Migration " +
          "Progress column: Percentage of instances migrated successfully Percentage of instances with errors " +
          "Percentage of instance not yet started' [כך במקור], ובנוסף 'the number of migration object instances " +
          "that have been migrated successfully, and the number of migration object instances that have errors'; " +
          "מסך ה-Monitoring מציג פעילויות פעילות ומושלמות, למשל 'Migration Started' ו-'Migration Completed'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitoring the Status of the Migration | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/9e70fb8b9a1e43eeb8d7503f23a9d952.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 9e70fb8b9a1e43eeb8d7503f23a9d952, גרסה 2025 FPS01) נקרא ב-2026-09-28: 'You can view the " +
          "number of migration object instances that have been processed, as well as the number of background jobs " +
          "that are used for the migration', ובמסך הפרויקט 'the number of migration object instances that have been " +
          "migrated successfully, and the number of migration object instances that have errors'. פעילות שהשגיאות " +
          "בה נבדקו ניתן לסמן 'Errors Resolved', ומסנן השגיאות מציג פעילויות בסטטוס 'Completed with Errors' או " +
          "'Failed'. העמוד אינו נוקב בגישת ההגירה שאליה הוא שייך.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitoring the Status of the Simulation Process | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/96fd011035cf49c293b93784d182dae2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 96fd011035cf49c293b93784d182dae2, גרסה 2025 FPS01) נקרא ב-2026-09-28: 'for a migration " +
          "object, you can view the number of migration object instances that have been simulated successfully, and " +
          "the number of migration object instances that have errors', ומסך ה-Monitoring מציג פעילויות כמו " +
          "'Simulation Started' ו-'Simulation Completed'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Data Migration Status | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/30b5a3e91d0d469bb321360586003211.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 30b5a3e91d0d469bb321360586003211, גרסה 2025 FPS01) נקרא ב-2026-09-28: 'Data Migration " +
          "Status App ID: F3280 With this app, you can check the status of any simulated or migrated instances in " +
          "your migration projects', עם ההערה 'The Data Migration Status app supports only the Migrate Data Using " +
          "Staging Tables migration approach'. היכולות: סקירה בזמן אמת של אובייקטים ופרויקטים, סטטוס מפורט לכל " +
          "המופעים, מידע על כל ההודעות, עבודות רצות והתראות, 'Log and display extended statistics', ביקורת נתונים, " +
          "ניווט מכל מופע לאפליקציית ה-Fiori התקנית וייצוא דוחות לגיליון.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "שכבת הטרנספורמציה של הפרויקט (S4_TRANSFORMATION): אינטגרציה מומלצת ECC מול S/4HANA, ושורות ה-BAPI " +
          "וה-IDoc בקוד המותאם",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "שורות האינטגרציה במאגר: ממשקים סינכרוניים ב-ECC הם RFC, BAPI ו-SOAP, וב-S/4HANA OData (V2/V4) ו-REST דרך " +
          "ה-Gateway המוטמע, כש-SOAP עדיין נתמך; מסרים אסינכרוניים ב-ECC הם IDoc, ALE ו-qRFC, וב-S/4HANA 'IDoc " +
          "נשמר' עם המלצה ל-Events ול-SOAP/OData בתרחישים חדשים; Gateway נפרד מוחלף ב-Gateway מוטמע עם שירותי OData " +
          "על CDS ו-RAP. בשורות הקוד המותאם: 'רוב ה-BAPIs נשמרים (BAPI_GOODSMVT_CREATE, BAPI_PRODORDCONF_*); חלק עם " +
          "OData/CDS חלופי. בדוק deprecation', וסוגי IDoc 'יציבים; בדוק סגמנטים מורחבים ושדות אורך'.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-transformation.ts#INTEGRATION",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך רוחבית. גבולות הטענה: המתודולוגיה, רצף הטעינה, קריטריוני המוכנות ומימדי איכות הנתונים הם אמירות " +
      "של המאגר (data/migration-cockpit.ts, ‏data/s4-transformation.ts, ‏data/project-delivery.ts) ולא ציטוט ממקור " +
      "SAP רשמי; מרכז ההגירה מסמן במפורש כדורשי אימות את ההעברה הישירה ב-RFC, את מספרי ה-SAP Notes, את אובייקט " +
      "תכנית התחזוקה, את תכנית הבדיקה ואת אובייקטי ה-HR, ורשומה זו חוזרת על הסימון במקום להסתירו. Old (לפני " +
      "2026-09-28): אף פריט SAP Best Practices (Scope Item) אינו נקוב כאן: המאגר מזכיר את המושג בלי מזהה מאומת. " +
      "New: Scope Item BH3 נקוב בעמוד What's New של Transfer List (2025 FPS01) ומכסה את מסלול הגירת הנתונים בלבד. " +
      "Old (לפני 2026-09-28): המקורות הרשמיים היחידים הם פריטי הפישוט ועמוד ה-Data Migration: פריט תזמון תכניות " +
      "התחזוקה נושא את המספר 29.6 ברשימת 2023 FPS3 ואת המספר 4.1.2 ברשימת 2025 FPS1, ולכן הוא נקוב כאן בשמו 'S4TWL " +
      "- Scheduling of Maintenance Plan' ולא במספר בלבד; אותו כלל חל על 'S4TWL - AVAILABILITY OF TRANSACTIONS IN " +
      "MM-IM' (פריט 27.6 ברשימת 2023 FPS3). הטבלה MATDOC, הטרנזקציות LTMC ו-LTMOM ותוכניות RISTRA20 ו-RISTRA20H " +
      "אינן במילון הפרויקט ולכן מופיעות בפרוזה בלבד. הרשומה מקשרת אל bp:matdoc-read-through-compatibility ואל " +
      "bp:maintenance-notification-process במקום לשכפל אותן. Old (לפני 2026-09-28): שדה kpis הושמט: המאגר מתעד " +
      "קריטריוני מוכנות משוקללים ולא מדדי ביצוע לתהליך ההגירה. לא בוצעה בדיקה במערכת SAP חיה. עדכון 2026-09-28 " +
      "(השלמת שדות, Old → New): נוספו process.interfaces (11 שורות) ו-process.kpis (3 שורות), ו-21 שורות ראיה " +
      "חדשות; שאר השדות, הצעדים ושורות הראיה הקיימות הועתקו כלשונם, מלבד הערת ה-reference (משפט אחד הוחלף ומשפט אחד " +
      "נוסף) ושורות masterData ו-migration השלישיות (הוארכו); ראו להלן. Old: 'שדה kpis הושמט'. New: המדדים נשענים " +
      "על ארבעה עמודי Data Migration רשמיים (Monitoring the Status of the Migration Process, Monitoring the Status " +
      "of the Migration, Monitoring the Status of the Simulation Process ו-Data Migration Status), כלומר מדדי ניטור " +
      "שהמערכת מציגה ולא יעדי ביצוע; אף מקור שנבדק אינו קובע ערך יעד. Old: 'המקורות הרשמיים היחידים הם פריטי הפישוט " +
      "ועמוד ה-Data Migration'. New: נוספו עמודי Data Migration לאובייקטי הציוד, המיקום הפונקציונלי, תכנית התחזוקה, " +
      "רשימות הפעולות, מסמך המדידה, מרכז העבודה, גרסת הייצור, עץ המוצר, מתכון האב, פקודת התהליך והשותף העסקי, " +
      "ועמודי האפליקציות Migrate Your Data (F3473) ו-Data Migration Status (F3280). סתירה פתוחה: עמוד PM - " +
      "Maintenance plan (2025 FPS01) מסווג את האובייקט Master data ומתעד אותו בגישת Direct Transfer - ERP עם " +
      "MPLAN_CREATE, בעוד מרכז ההגירה של המאגר (data/migration-cockpit.ts) מסמן את תכנית התחזוקה כאובייקט תנועתי " +
      "הדורש אימות; שורות masterData ו-migration השלישיות הוארכו בהפניה לסיווג הרשמי (נוסחן הקודם נשמר בתחילתן), " +
      "שורת exceptions הקיימת לא שונתה, וההכרעה נשארת לעדכון הבא. Scope Item ותסריט בדיקה: עמוד Migrate Your Data " +
      "מפנה לתסריט הבדיקה 'Data Migration to SAP S/4HANA from Staging ( 2Q2 )', ועמוד ה-What's New של Transfer List " +
      "(2025 FPS01) נוקב ב-'Scope Item BH3 ( Data Migration to SAP S/4HANA from SAP )'. שדה reference לא שונה; " +
      "בהערתו הוחלף המשפט 'פריט SAP Best Practices (Scope Item) לתהליך לא אותר ואינו נרשם.' (Old) בציון BH3 כפריט " +
      "של מסלול הגירת הנתונים בלבד, שאינו נרשם כ-reference של התהליך (New). השמות F3473, F3280, F3622, F3163, " +
      "F5426, MPLAN_CREATE, CRAP_WORKCENTER_CREATE, FV_PROD_VERS_MAINTAIN_MULTI, CSAI_BOM_MAINTAIN, " +
      "EAM_TASKLIST_CREATE, CMD_MIG_BP_CVI_CREATE, BAPI_GOODSMVT_CANCEL, MIGO_DIALOG ומודולי CNV_PE_* אינם במילון " +
      "הפרויקט ולכן מופיעים בפרוזה בלבד. חיפושי help.sap.com שרצו ב-2026-09-28 (scripts/sap-help-search.mjs, " +
      "SAP_S4HANA_ON-PREMISE, 21 רשומות מוחזרות לכל שאילתה): 'Data Migration Status app', 'Migrate Your Data " +
      "monitoring migration project statistics', 'Situation Handling for Data Migration', 'Monitoring the Status of " +
      "the Simulation Process', 'Migrate Data Directly from SAP System direct transfer approach', 'PM - Maintenance " +
      "plan Data Migration MPLAN_CREATE' ו-'OData APIs: Maintenance Plan and Maintenance Item'; שבעה גופי עמודים " +
      "נקראו דרך scripts/sap-help-body.mjs. הסוקר הקודם: Design-audit continuation §11 (process catalog). לא בוצעה " +
      "בדיקה במערכת SAP חיה.",
  },
];
