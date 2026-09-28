/* Project NEO · best practices, PM PROCESS CATALOG part 2 (design-audit
   continuation §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with
   no loader.

   Four whole PM processes: the maintenance order, preventive maintenance,
   technical objects, and the end-to-end plant maintenance map that ties them
   together. Every line is copied or condensed from the named repository
   records (repoRef) or from an official SAP page that an existing overlay
   already verified (same URL, same claim, same accessedAt). A field the
   repository does not document is left out on purpose: the page renders the
   gap by name. Nothing here asserts a new SAP fact.

   Backfill 2026-09-28 (researcher, adversarial auditor, writer): process.interfaces
   on all four records, process.kpis on preventive-maintenance-process and
   technical-objects-process, and process.reference on plant-maintenance-end-to-end.
   Each new official row was either read through the scripted channels (help.sap.com
   search record or page body, Fiori Apps Library; stamped DATE28, the day it was
   read) or copied from the overlay entry it names (that entry's url and accessedAt,
   see the constants below). Earlier lines and rows are kept verbatim except where the
   audit corrected them: a corrected finding stays in the record's notes (Old → New),
   and the batch report lists every corrected line. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";
/** accessedAt of the official pages reused from tx:IW31, tx:IW41 and fiori:F2730 / fiori:F2828. */
const DATE_TX2 = "2026-09-02";
/** accessedAt of the official pages reused from tx:IP30, tx:IP30H, tx:IE01 and tx:IL01. */
const DATE_TX7 = "2026-09-07";
/** accessedAt of the official pages reused from table:COBRB and table:EQUZ (and, since the 2026-09-28 backfill, table:MHIO). */
const DATE_TBL15 = "2026-09-15";
/** accessedAt of the official pages reused from fm:BAPI_ALM_ORDER_GET_DETAIL and the 2025 FPS01 simplification list in tx:IP30
 *  (and, since the 2026-09-28 backfill, the other data/verification/functions.ts DATE21 rows). */
const DATE_FN21 = "2026-09-21";
/** accessedAt values of the other overlay rows the 2026-09-28 backfill copied (url and date as in the overlay). */
const DATE_FM_02 = "2026-09-02"; // data/verification/functions.ts DATE2 (fm:BAPI_ALM_ORDER_MAINTAIN)
const DATE_IDOC_02 = "2026-09-02"; // data/verification/idocs.ts DATE2 (idoc:msg:LOIPRO)
const DATE_FM_14 = "2026-09-14"; // data/verification/functions.ts DATE14
const DATE_FM_22 = "2026-09-22"; // data/verification/functions.ts DATE22
const DATE_FM_23 = "2026-09-23"; // data/verification/functions.ts DATE23
const DATE_OBJ_24 = "2026-09-24"; // data/verification/objects.ts DATE24 (obj:maintenance-order, obj:equipment)
const DATE_FI_24 = "2026-09-24"; // data/verification/fiori.ts DATE24 (fiori:F2774, fiori:F5325, fiori:F2828)
/** accessedAt of the rows the 2026-09-28 backfill read itself (page bodies, search records, Fiori Apps
 *  Library, repository records) and lastVerifiedAt of the four backfilled records. */
const DATE28 = "2026-09-28";

export const PM_PROCESS_PRACTICES_2: BestPracticeLike[] = [
  /* ====================================================== maintenance order */
  {
    slug: "maintenance-order-process",
    he: "פקודת תחזוקה: מיצירה ושחרור, דרך ביצוע ואישור, ועד סגירה טכנית והתחשבנות",
    en: "Maintenance order process: creation, release, execution, confirmation, technical completion and settlement",
    module: "PM",
    summary:
      "פקודת התחזוקה היא אובייקט הביצוע ונושאת העלות של PM: היא מתכננת פעולות, מרכזי עבודה, חומרים והיתרים, " +
      "אוספת עלות בפועל דרך אישורי שעות ותנועות חומר, ונסגרת בשני שלבים: סגירה טכנית (TECO) וסגירה עסקית (CLSD) " +
      "אחרי התחשבנות.",
    context:
      "לפי רשומות המאגר, הפקודה נשמרת ב-AUFK (כותרת), ‏AFIH (הרחבת התחזוקה), ‏AFKO ו-AFVC (לוגיסטיקה ופעולות), " +
      "‏AFRU (אישורים) ו-RESB (רכיבים), עם סטטוסים CRTD, ‏REL, ‏CNF, ‏TECO ו-CLSD ב-JEST. סוגי הפקודה הם מותאמי " +
      "לקוח לפי רשומת נתוני האב של המאגר (ברירת המחדל שהיא מונה: PM01 מתוכנן או מונע, PM02 תקלה, PM03 שיפוץ או " +
      "השקעה). ב-ECC העבודה נעשית ב-SAP GUI ‏(IW31 עד IW39, ‏IW41 עד IW48); ב-S/4HANA מודל הנתונים נשמר, העלויות " +
      "נרשמות ב-Universal Journal ‏(ACDOCA) והחוויה עוברת ל-Fiori. לעיבוד תוכניתי קיים BAPI_ALM_ORDER_MAINTAIN, " +
      "ולצדו שירות ה-OData הרשמי של פקודת התחזוקה לפי רשומות האימות.",
    steps: [
      {
        he: "לפתוח פקודה מתוך הודעה, מקריאה של תוכנית תחזוקה או ישירות, עם סוג פקודה ואובייקט ייחוס (ציוד או מיקום פונקציונלי) שממנו נגזרים המיקום ומרכז העלות דרך ILOA. ב-GUI: ‏IW31.",
        xrefs: ["tx:IW31", "table:AUFK", "table:AFIH", "table:ILOA", "obj:maintenance-order"],
      },
      {
        he: "לתכנן פעולות ומשאבים: מרכז עבודה, זמנים ונוסחאות. מרכז עבודה ללא שיוך מרכז עלות וסוג פעילות לא יפיק עלות באישור.",
        xrefs: ["tx:IW32", "table:AFKO", "table:AFVC", "table:CRHD", "table:CRCO"],
      },
      {
        he: "לשאוב פעולות מרשימת פעולות משוחררת במקום להקליד אותן: כך נשמרת אחידות והתקן נאכף. רשימה שאינה משוחררת או בעלת שימוש (usage) שאינו מתאים לא תוצע בפקודה.",
        xrefs: ["tx:IA05", "tx:IA08", "table:PLKO", "table:PLPO"],
      },
      {
        he: "לשייך רכיבים: חומר מלאי נפתח כרזרבציה ונמשך בתנועת מלאי, וחומר לא מלאי מייצר דרישת רכש והזמנת רכש עד הקבלה.",
        xrefs: ["table:RESB", "table:EBAN", "table:EBKN", "tx:ME51N", "tx:MB1A"],
      },
      {
        he: "להגדיר כלל התחשבנות בפקודה (מרכז עלות, נכס או הזמנה) לפני סוף התהליך: בלעדיו KO88 ו-CO88 נכשלים והעלות נשארת בפקודה.",
        xrefs: ["tx:IW32", "table:COBRB", "table:COBRA"],
      },
      {
        he: "לשחרר את הפקודה (REL): השחרור מפעיל בדיקת זמינות רכיבים ובדיקת היתרים, ונחסם כל עוד קיים היתר פתוח הרלוונטי לשחרור או סטטוס משתמש חוסם.",
        xrefs: ["tx:IW32", "table:JEST", "enh:exit:IWO10009", "enh:badi:WORKORDER_UPDATE"],
      },
      {
        he: "לבצע ולדווח: אישור שעות פרטני ב-IW41 או קיבוצי ב-IW42, וצריכת חומרים. האישור נכתב ל-AFRU ומזין עלות בפועל. לטכנאי בשטח מתועדת ביישום Fiori‏ Perform Maintenance Jobs.",
        xrefs: ["tx:IW41", "tx:IW42", "table:AFRU", "fm:BAPI_ALM_CONF_CREATE", "fiori:F5104A", "enh:exit:CONFPM01"],
      },
      {
        he: "לסמן אישור סופי בפעולה האחרונה כדי שהפקודה תעבור ל-CNF; אישור חלקי בלבד משאיר אותה במצב PCNF לפי תקרית pm-confirmation-final-flag.",
        xrefs: ["table:AFRU", "table:AFVC", "table:JEST"],
      },
      {
        he: "לסגור טכנית (TECO): הסגירה סוגרת רזרבציות פתוחות ונחסמת כשיש אישורים פתוחים, תנועות תקועות או היתר הרלוונטי לסיום.",
        xrefs: ["tx:IW32", "table:JEST", "table:AFRU"],
      },
      {
        he: "להתחשבן: KO88 לפקודה בודדת או CO88 לריצה מרוכזת, ולוודא יתרה אפס לפני סגירה עסקית (CLSD). ב-S/4HANA הרישום מגיע ל-Universal Journal‏ (ACDOCA).",
        xrefs: ["tx:KO88", "tx:CO88", "table:COBRB", "table:ACDOCA"],
      },
      {
        he: "בעיבוד תוכניתי: רצף IT_METHODS של BAPI_ALM_ORDER_MAINTAIN ‏(HEADER או OPERATION או COMPONENT, אחר כך RELEASE, ‏BAPI_ALM_CONF_CREATE ו-TECHNICALCOMPLETE) ואז BAPI_TRANSACTION_COMMIT, עם בדיקת RETURN אחרי כל קריאה (ראו שיטת משמעת ה-COMMIT).",
        xrefs: ["fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
      },
      {
        he: "לנתח: רשימות העבודה IW38 ו-IW39, קריאת פרטי פקודה ב-BAPI_ALM_ORDER_GET_DETAIL, מערכת המידע PMIS ‏(MCI7) וב-S/4HANA תצוגת ה-CDS של הפקודה.",
        xrefs: ["tx:IW38", "tx:IW39", "tx:MCI7", "fm:BAPI_ALM_ORDER_GET_DETAIL", "cds:I_MaintenanceOrder"],
      },
    ],
    antiPatterns: [
      "פקודה ללא אובייקט ייחוס וללא רשימת אובייקטים: ההיסטוריה והעלות אינן נצמדות לציוד (תקרית equipment-not-in-order).",
      "כלל התחשבנות חסר בסוג הפקודה: העלות נשארת תקועה בפקודה עד שהכלל מוגדר ידנית (תקרית settlement-error).",
      "מרכז עבודה ללא שיוך מרכז עלות וסוג פעילות: אישור השעות נרשם בלי עלות (תקרית pm-cost-no-activity-type).",
      "הסתמכות על קביעת היתרים ידנית: פקודה מסוכנת משוחררת בלי היתר בטיחות כאשר הקביעה לפי סיווג לא הוגדרה (תקרית permit-not-auto-assigned).",
      "הקלדת פעולות במקום שליפת רשימת פעולות משוחררת: התקן אינו נאכף ואין בקרת גרסאות (תקרית task-list-not-pulled-into-order).",
      "רצף BAPI ללא COMMIT מפורש או בלי בדיקת RETURN: הפקודה אינה נשמרת או נשמרת חלקית.",
    ],
    checks: [
      "חיובי: פקודה עם פעולה ורכיב מלאי עוברת שחרור, אישור ו-TECO, והעלות בפועל מופיעה בפקודה.",
      "שלילי: היתר פתוח הרלוונטי לשחרור חוסם את השחרור עד מתן ההיתר.",
      "אינטגרציה: רכיב לא מלאי מייצר דרישת רכש, והקבלה מחייבת את הפקודה.",
      "רגרסיה: התחשבנות מעבירה את העלות ליעד הנכון ומשאירה יתרה אפס; ב-S/4HANA הרישום נבדק מול ACDOCA.",
      "ברצף BAPI: מספר הפקודה נוצר רק אחרי SAVE ו-COMMIT, והרשומה קיימת ב-AUFK ו-AFIH.",
    ],
    process: {
      purpose:
        "לתכנן, לבצע, לתעד ולתמחר עבודת תחזוקה על אובייקט טכני: הפקודה מרכזת פעולות, משאבים, חומרים והיתרים, " +
        "אוספת את העלות בפועל ומעבירה אותה ליעד העסקי בהתחשבנות.",
      trigger: [
        { he: "הודעת תחזוקה שהומרה לפקודה כאשר נדרשת עבודה.", xrefs: ["tx:IW21", "obj:maintenance-notification", "bp:maintenance-notification-process"] },
        { he: "קריאה של תוכנית תחזוקה מונעת שהגיע מועדה, ידנית ב-IP10 או בניטור מועדים.", xrefs: ["tx:IP10", "tx:IP30", "tx:IP30H", "bp:preventive-maintenance-process"] },
        { he: "יצירה ישירה של פקודה מתוכננת או דחופה ב-IW31.", xrefs: ["tx:IW31"] },
      ],
      preconditions: [
        { he: "סוג פקודה מוגדר עם פרמטרי תכנון, פרופיל היתרים וכלל התחשבנות ברירת מחדל." },
        { he: "אובייקט הייחוס קיים ואינו חסום, ונתוני ILOA שלו (מפעל תחזוקה ומרכז עלות) נכונים.", xrefs: ["table:EQUI", "table:IFLOT", "table:ILOA"] },
        { he: "מרכז עבודה פעיל לתאריך עם קיבולת ועם שיוך מרכז עלות וסוג פעילות.", xrefs: ["tx:IR01", "tx:IR03", "table:CRHD", "table:CRCO"] },
        { he: "תקופות הרישום של MM ושל CO ו-FI פתוחות לתאריך האישור.", xrefs: ["tx:OB52"] },
      ],
      masterData: [
        { he: "סוג פקודה: מותאם לקוח לפי רשומת נתוני האב של המאגר; ברירת המחדל שהיא מונה היא PM01 מתוכנן או מונע, PM02 תקלה, PM03 שיפוץ או השקעה.", xrefs: ["table:AUFK"] },
        { he: "אובייקט ייחוס: ציוד או מיקום פונקציונלי, ודרכו ILOA.", xrefs: ["table:EQUI", "table:IFLOT", "table:ILOA"] },
        { he: "מרכז עבודה, קיבולת ונוסחאות, ושיוך מרכז עלות וסוג פעילות.", xrefs: ["table:CRHD", "table:CRCA", "table:CRCO", "table:KAKO"] },
        { he: "רשימת פעולות כתבנית, וחומרים או עץ מוצר לרכיבים.", xrefs: ["table:PLKO", "table:PLPO", "table:MARA", "table:MAST"] },
        { he: "כלל התחשבנות וסוגי היתר לפי פרופיל ההיתרים.", xrefs: ["table:COBRB", "table:COBRA"] },
      ],
      roles: [
        { he: "מתכנן תחזוקה (SAP_BR_MAINTENANCE_PLANNER): יצירה, תכנון, שחרור ומעקב, לפי קטלוג ה-Fiori של המאגר ביישומי ניהול פקודות והודעות.", xrefs: ["fiori:F2731", "fiori:F4604"] },
        { he: "טכנאי תחזוקה (SAP_BR_MAINTENANCE_TECHNICIAN): ביצוע ודיווח ביישום Perform Maintenance Jobs, שהתיעוד הרשמי מתאר כיישום שבו הטכנאי סוקר, מבצע ומדווח ממצאים לעבודות ששובצו.", xrefs: ["fiori:F5104A"] },
        { he: "בקרת עלויות: הרצת ההתחשבנות וסגירת הפקודה עסקית, לפי מדריך התחשבנות הפקודה במאגר.", xrefs: ["tx:KO88", "tx:CO88"] },
      ],
      transactions: [
        { he: "IW31 יצירה, IW32 שינוי ושחרור, IW33 תצוגה.", xrefs: ["tx:IW31", "tx:IW32", "tx:IW33"] },
        { he: "IW38 ו-IW39: רשימות עבודה ועיבוד המוני של פקודות; IW3D להדפסת מסמכי שטח.", xrefs: ["tx:IW38", "tx:IW39", "tx:IW3D"] },
        { he: "IW41 ו-IW42 לאישורים, IW45 לביטול אישור, IW48 לדיווח קיבוצי.", xrefs: ["tx:IW41", "tx:IW42", "tx:IW45", "tx:IW48"] },
        { he: "KO88 ו-CO88 להתחשבנות; MCI7 ו-MCI3 למערכת המידע PMIS.", xrefs: ["tx:KO88", "tx:CO88", "tx:MCI7", "tx:MCI3"] },
        { he: "Fiori בקטלוג הפרויקט: Manage Maintenance Orders, Manage Maintenance Notifications and Orders, Perform Maintenance Jobs. רשומת האימות מסמנת את המזהה F2731 כדורש אימות נוסף, משום שהתיעוד הרשמי של 2025 FPS01 מצמיד את השם Manage Maintenance Orders למזהה F5241, שלא היה בקטלוג הפרויקט ב-2026-09-22 ונוסף אליו מאז (ראו שורת הממשקים).", xrefs: ["fiori:F2731", "fiori:F4604", "fiori:F5104A", "fiori:F5241"] },
      ],
      tables: [
        { he: "AUFK כותרת הפקודה, AFIH הרחבת התחזוקה, AFKO ו-AFVC לוגיסטיקה ופעולות.", xrefs: ["table:AUFK", "table:AFIH", "table:AFKO", "table:AFVC"] },
        { he: "RESB רכיבים ורזרבציות, AFRU אישורים, JEST סטטוסי מערכת ומשתמש, ILOA נתוני מיקום וחשבונאות.", xrefs: ["table:RESB", "table:AFRU", "table:JEST", "table:ILOA"] },
        { he: "COBRB ו-COBRA כללי ההתחשבנות, ACDOCA היומן האוניברסלי ב-S/4HANA; COSP ו-COSS לעלויות לפי הבלופרינט.", xrefs: ["table:COBRB", "table:COBRA", "table:ACDOCA", "table:COSP", "table:COSS"] },
        { he: "האובייקט העסקי פקודת תחזוקה ותצוגת ה-CDS שלה.", xrefs: ["obj:maintenance-order", "cds:I_MaintenanceOrder"] },
      ],
      integrationPoints: [
        { he: "PM אל MM: רזרבציה ותנועת מלאי לרכיב מלאי, דרישת רכש והזמנת רכש לרכיב לא מלאי.", xrefs: ["table:RESB", "table:EBAN", "table:EBKN", "tx:MIGO"] },
        { he: "PM אל CO ו-FI: כלל התחשבנות מעביר את העלות למרכז עלות, נכס או הזמנה; ב-S/4HANA הרישום מגיע ל-ACDOCA.", xrefs: ["table:COBRB", "table:ACDOCA"] },
        { he: "PM אל QM: פקודה עם מפתח בקרה לבדיקה יוצרת מנת בדיקה בתהליך הכיול.", xrefs: ["tx:QE11", "tx:QA11"] },
        { he: "הרחבות: Customer Exit‏ IWO10009 לבדיקות שמירה ושחרור, IWO10012 לברירות מחדל בפעולה, IWO10018 לשדות לקוח, CONFPM01 לבדיקות אישור, ו-BAdI‏ WORKORDER_UPDATE ו-WORKORDER_CONFIRM.", xrefs: ["enh:exit:IWO10009", "enh:exit:IWO10012", "enh:exit:IWO10018", "enh:exit:CONFPM01", "enh:badi:WORKORDER_UPDATE", "enh:badi:WORKORDER_CONFIRM"] },
        { he: "ממשק תוכניתי: BAPI_ALM_ORDER_MAINTAIN לכתיבה ו-BAPI_ALM_ORDER_GET_DETAIL לקריאה; לפי רשומות האימות קיים לצדם שירות OData רשמי של פקודת התחזוקה, כולל גרסה מבוססת RAP.", xrefs: ["fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_ORDERHEAD_GET_LIST"] },
      ],
      interfaces: [
        { he: "ECC ו-S/4HANA, לפי רשומות המאגר: כתיבה דרך BAPI_ALM_ORDER_MAINTAIN על האובייקט העסקי BUS2007, מונחית שיטות ב-IT_METHODS (HEADER, OPERATION, COMPONENT, RELEASE, TECHNICALCOMPLETE ובסוף SAVE) עם IT_HEADER, IT_OPERATION, IT_COMPONENT, IT_PARTNER, IT_TEXT ו-IT_SRULE, ופלט ET_NUMBERS ו-RETURN; אחריו BAPI_TRANSACTION_COMMIT, ובשגיאה BAPI_TRANSACTION_ROLLBACK לפי שיטת משמעת ה-COMMIT. בדיקות ההרשאה ברשומת ההעשרה: I_AUART, I_IWERK, I_INGRP ו-I_BEGRP. S/4HANA 2025 FPS01: ה-BAPI מתועד כשמיש, ופריט הפישוט 'S4TWL - Batch Input for Enterprise Asset Management (EAM)' מונה אותו בין הממשקים לפקודת התחזוקה.", xrefs: ["obj:maintenance-order", "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_TRANSACTION_COMMIT", "fm:BAPI_TRANSACTION_ROLLBACK", "bp:bapi-commit-discipline", "tx:IW31", "tx:IW32"] },
        { he: "דיווח ביצוע, לפי רשומות המאגר: BAPI_ALM_CONF_CREATE יוצר אישור לפעולת פקודה (שעות, אישור סופי), נכתב ל-AFRU ודורש BAPI_TRANSACTION_COMMIT; ברצף הכתיבה (seq) של רשומת BAPI_ALM_ORDER_MAINTAIN ברישום ההעשרה הוא בא אחרי RELEASE ולפני TECHNICALCOMPLETE. שם טבלת הקלט שונה בין רשומות המאגר (CONFIRMATIONS ברשומת הקטלוג, TIMETICKETS ברשומת ההעשרה), ולכן לאמת את חתימת ה-BAPI במערכת היעד לפני בניית ממשק. תקרית pm-confirmation-final-flag מונה את ה-BAPI בניתוח אישור שלא סומן סופי.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "table:AFRU", "tx:IW41", "tx:IW42", "enh:exit:CONFPM01"] },
        { he: "קריאה, ללא SAVE או COMMIT לפי רשומות המאגר: BAPI_ALM_ORDER_GET_DETAIL (קלט NUMBER; פלט ES_HEADER, ET_OPERATIONS, ET_COMPONENTS ו-RETURN, ורשומת ההעשרה מוסיפה ET_COSTS) בזיקה ל-IW33, ו-BAPI_ALM_ORDERHEAD_GET_LIST לרשימת כותרות לפי טווחי בחירה (פלט ET_HEADER לפי המאגר) בזיקה ל-IW38 ו-IW39. S/4HANA 2025 FPS01 מתעד את BAPI_ALM_ORDER_GET_DETAIL כשמיש; רשומת האימות של BAPI_ALM_ORDERHEAD_GET_LIST מציגה את הפעולה Read All Maintenance Orders (Version 2) כחלופה משוחררת לאותו תרחיש, לא כמחליף.", xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_ORDERHEAD_GET_LIST", "tx:IW33", "tx:IW38", "tx:IW39", "table:AUFK"] },
        { he: "S/4HANA, OData: השירות Maintenance Order (Version 2) בנתיב API_MAINTENANCEORDER;v=2 (שם ה-Hub API_MAINTENANCEORDER_0002) מתועד ב-2025 FPS01 ליצירה, לקריאה, לעדכון ולמחיקה של נתוני הפקודה (כלשון רשומת השירות 'create, read, update and delete'), כולל Read All בשיטת GET עם סינון. היסטוריה לפי רשומות What's New: ב-2021 השירות API_MAINTENANCEORDER תועד לקריאה (Maintenance Order - Read); ב-2023 ה-OData API‏ MaintenanceOrder הוצא משימוש וגרסה 2 שוחררה כממשיכה; ב-2023 FPS02 עיבוד הפקודה מתועד הן דרך BAPI_ALM_ORDER_MAINTAIN והן דרך ה-API מבוסס ה-RAP; ב-2025 FPS01 גרסה 2 מאפשרת לערוך פקודות הניתנות לחיוב.", xrefs: ["obj:maintenance-order", "fm:BAPI_ALM_ORDER_MAINTAIN"] },
        { he: "S/4HANA 2025 FPS01, פעולות סטטוס בגרסה 2 (כולן POST, פקודה אחת בכל קריאה): ReleaseMaintenanceOrder לשחרור, SetMaintOrdToTechCompleted ו-ResetMaintOrdStsTechCompleted לסגירה הטכנית ולביטולה, SetMaintOrderStatusToClosed ו-ResetMaintOrderStatusClosed לסגירה ולביטולה, ולצדן ScheduleMaintenanceOrder, AssignMaintNotificationToOrder, SubmitMaintOrderForApproval, ApproveMaintenanceOrder, RejectMaintenanceOrder, SetMaintOrderOpToDispatched, SetMaintOrdToMainWorkComplete, SetMaintOrderToDoNotExecute, נעילה וביטול נעילה וסימון מחיקה.", xrefs: ["obj:maintenance-order", "obj:maintenance-notification"] },
        { he: "S/4HANA, OData לאישורים: השירות API_MAINTORDERCONFIRMATION מתועד ליצירה ולביטול של אישורי פעולה, ו-2025 FPS01 מתעד POST ל-MaintOrderConfirmation ליצירת אישור בודד. הרשומות הרשמיות אינן נוקבות ב-BAPI_ALM_CONF_CREATE ואינן קובעות החלפה.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "table:AFRU"] },
        { he: "S/4HANA (תיעוד 2023 Latest), אירועים עסקיים: האובייקט העסקי Maintenance Order מפעיל בין היתר SetToInPlanning (סטטוס Created), SetToInPreparation (סטטוס Released), SetToTechCompleted, Closed ו-SetToDeletnFlagged, ואירועי שלבים לפקודות המעובדות לפי שלבים; לפי העמוד המערכת מפעילה אותם כאשר פריטי ההיקף Reactive Maintenance (4HH) ו-Proactive Maintenance (4HI) פעילים או כאשר מודל השלבים הוגדר באותו אופן. אישור פעולה מפעיל Created ו-Canceled. האירועים מתפרסמים ב-SAP Business Accelerator Hub; What's New של 2023 FPS03 מתעד שינוי ב-SetToDeletnFlagged.", xrefs: ["obj:maintenance-order", "table:AFRU"] },
        { he: "ECC ו-S/4HANA, IDoc ל-MES: לפי עמוד Maintenance Order של Production Planning and Control (SAP ERP 6.0 EHP8 ו-S/4HANA 2025 FPS01), עם מודל שכפול שמכיל את מימוש היוצא 468_1, פקודות משוחררות מופצות ל-MES ב-IDoc‏ IORDER_01, שינויים בפקודה שהופצה נשלחים גם הם, ואחרי ההפצה המיקום הפונקציונלי, הציוד, מרכז העבודה ומפעל התחזוקה אינם פתוחים לקלט. עמוד הגדרת ה-DRF של S/4HANA 2025 FPS01 רושם את סוג ה-IDoc כ-IORDER01; שני הכתיבים מופיעים במקורות, והסוג אינו במילון הפרויקט ולכן אינו מקושר.", xrefs: ["obj:maintenance-order", "obj:maintenance-notification"] },
        { he: "S/4HANA, ממשק ה-Fiori של הפקודה: לפי ספריית ה-Fiori (S32OP), F5241 Manage Maintenance Orders רץ על קבוצת שירות OData V4‏ UI_MAINTENANCEORDER_MANAGE, עם IW31 כטרנזקציה המובילה.", xrefs: ["fiori:F5241", "tx:IW31", "obj:maintenance-order"] },
      ],
      outputs: [
        { he: "פקודת תחזוקה ממוספרת עם פעולות, רכיבים, עלות מתוכננת ועלות בפועל.", xrefs: ["table:AUFK", "table:AFVC"] },
        { he: "רשומות אישור שעות וצריכה, ומסמכי חומר לתנועות הרכיבים.", xrefs: ["table:AFRU", "table:RESB"] },
        { he: "מסמך התחשבנות ליעד לפי כלל ההתחשבנות, וב-S/4HANA רישום ב-ACDOCA.", xrefs: ["table:COBRB", "table:ACDOCA"] },
        { he: "היסטוריית תחזוקה על האובייקט הטכני, המזינה את מערכת המידע ואת מדדי האמינות.", xrefs: ["table:EQUI", "table:IFLOT"] },
      ],
      exceptions: [
        { he: "הפקודה אינה משתחררת: היתר פתוח, כשל בבדיקת זמינות רכיב, סטטוס משתמש חוסם או חוסר הרשאה (תקריות order-wont-release ו-permit-blocks-order-release).", xrefs: ["table:JEST", "table:RESB"] },
        { he: "היתר אינו משויך אוטומטית: קביעת ההיתר לפי סיווג לא הוגדרה (תקרית permit-not-auto-assigned)." },
        { he: "האישור נכשל: הפקודה אינה משוחררת או שתקופת הרישום סגורה (תקרית confirm-period-closed, הרשומה במאגר תחת PP וחלה על שרשרת האישורים).", xrefs: ["tx:OB52"] },
        { he: "אין עלות לשעות שדווחו: סוג פעילות או תעריף חסרים במרכז העבודה (תקרית pm-cost-no-activity-type).", xrefs: ["table:CRCO", "tx:KP26"] },
        { he: "TECO חסומה: אישורים פתוחים, תנועות תקועות או היתר הרלוונטי לסיום (תקרית teco-blocked).", xrefs: ["table:AFRU", "table:JEST"] },
        { he: "ההתחשבנות נכשלת: כלל חסר, תקופת CO או FI סגורה, סטטוס CLSD או LKD, או יעד לא תקף (תקרית settlement-error).", xrefs: ["table:COBRB"] },
        { he: "חריגת תקציב חוסמת שחרור או אישור כאשר בקרת הזמינות פעילה (תקרית maint-order-budget).", xrefs: ["tx:KO88"] },
        { he: "פקודה לכמה אובייקטים בלי ניהול רשימת אובייקטים: הדיווח והעלות אינם מתפצלים (תקרית object-list-multi).", xrefs: ["table:OBJK", "table:AFIH"] },
      ],
      controls: [
        { he: "אובייקט ייחוס חובה בכותרת הפקודה, ורשימת אובייקטים כשהעבודה נוגעת לכמה אובייקטים.", xrefs: ["table:AFIH", "table:OBJK"] },
        { he: "היתרים הרלוונטיים לשחרור ולסיום נקבעים לפי סיווג האובייקט ונבדקים בשחרור וב-TECO.", xrefs: ["enh:exit:IWO10009"] },
        { he: "כלל התחשבנות מוגדר בסוג הפקודה או בפקודה לפני ההתחשבנות; תיעוד SAP מתאר את הכלל כמורכב מכללי חלוקה ומפרמטרי התחשבנות לאובייקט השולח.", xrefs: ["table:COBRB", "table:COBRA"] },
        { he: "אישור סופי מסומן בפעולה האחרונה, והיתרה נבדקת כאפס לפני סגירה עסקית.", xrefs: ["table:AFRU"] },
        { he: "בכל רצף BAPI: בדיקת RETURN אחרי כל קריאה ו-COMMIT מפורש בסוף.", xrefs: ["bp:bapi-commit-discipline", "fm:BAPI_TRANSACTION_COMMIT"] },
      ],
      kpis: [
        { he: "עלות מתוכננת מול עלות בפועל בפקודה, לפי רשומת התחום 'פקודות אחזקה' המתארת את גלגול העלויות לפקודה ואת ההתחשבנות ליעד.", xrefs: ["table:AUFK", "table:COSP"] },
        { he: "יתרה אפס אחרי התחשבנות, כבדיקת הרגרסיה שרשומת התחום 'התחשבנות פקודה' מגדירה.", xrefs: ["table:COBRB"] },
        { he: "עומס הפקודות הפתוחות ברשימות העבודה IW38 ו-IW39 ובמערכת המידע PMIS ‏(MCI*).", xrefs: ["tx:IW38", "tx:IW39", "tx:MCI3"] },
      ],
      eccToS4: [
        { he: "מודל AUFK, AFIH, AFKO, AFVC ו-RESB זהה ב-ECC וב-S/4HANA לפי נושא המעבר 'אובייקטי אחזקה' ולפי סט הטבלאות היציבות של שכבת ההשפעה.", xrefs: ["table:AUFK", "table:AFIH", "table:AFVC"] },
        { he: "העלויות עוברות ל-Universal Journal‏ (ACDOCA) ופריט הפישוט של היומן האוניברסלי מייתר התאמה נפרדת, לפי רשומת ההתחשבנות של המאגר.", xrefs: ["table:ACDOCA"] },
        { he: "חוויית המשתמש עוברת ל-Fiori וה-GUI נשאר קיים; יישום Confirm Jobs ‏(W0020) הוצא משימוש ב-S/4HANA 2022 ונמחק ב-2023, והיורש המתועד לדיווח הטכנאי הוא Perform Maintenance Jobs.", xrefs: ["fiori:F2730", "fiori:F5104A"] },
        { he: "אנליטיקה: לצד PMIS, תצוגת ה-CDS של הפקודה ויישומי Fiori לניטור התחזוקה.", xrefs: ["cds:I_MaintenanceOrder", "fiori:F2828"] },
        { he: "ממשקים: BAPI_ALM_ORDER_MAINTAIN ו-BAPI_ALM_ORDER_GET_DETAIL מתועדים כשמישים ב-2025 FPS01, ולצדם שירות OData רשמי לקריאה ולכתיבה של פקודת תחזוקה.", xrefs: ["fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_ORDER_GET_DETAIL"] },
      ],
      migration: [
        { he: "טבלאות הפקודה נשמרות בהמרה; בדיקת הקבלה לפי רשומת התחום היא מחזור מלא של יצירה, שחרור, אישור והתחשבנות אל ACDOCA.", xrefs: ["table:AUFK", "table:AFIH", "table:ACDOCA"] },
        { he: "רשימת הפישוט של 2025 FPS01 ממליצה להפסיק להשקיע ב-Batch Input ליצירת נתוני תחזוקה ולהשתמש ב-API, ומונה את BAPI_ALM_ORDER_MAINTAIN בין הממשקים לפקודת התחזוקה.", xrefs: ["fm:BAPI_ALM_ORDER_MAINTAIN"] },
        { he: "אחרי ההמרה לוודא שכללי ההתחשבנות, ההיתרים ורשימות האובייקטים עברו, ושמרכזי העבודה עדיין נושאים שיוך מרכז עלות וסוג פעילות.", xrefs: ["table:COBRB", "table:CRCO"] },
      ],
      reference: {
        title: "Creating a Maintenance Order | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/c0146ece9f304378804fa395ac851f98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התהליך הרשמי ליצירת פקודת תחזוקה (אומת ברשומת tx:IW31). העמוד מתאר את הנתיב ביישום Manage Maintenance Orders ואינו מזכיר את IW31. פריט SAP Best Practices (Scope Item) לתהליך לא אותר ואומת ולכן אינו נרשם.",
      },
    },
    xrefs: [
      "obj:maintenance-order", "table:AUFK", "table:AFIH", "table:AFKO", "table:AFVC", "table:AFRU", "table:RESB",
      "table:COBRB", "table:ACDOCA", "table:JEST", "table:ILOA",
      "tx:IW31", "tx:IW32", "tx:IW33", "tx:IW38", "tx:IW39", "tx:IW41", "tx:IW42", "tx:KO88", "tx:CO88",
      "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_TRANSACTION_COMMIT",
      "fiori:F2731", "fiori:F4604", "fiori:F5104A", "cds:I_MaintenanceOrder",
      "enh:exit:IWO10009", "enh:exit:CONFPM01", "enh:badi:WORKORDER_UPDATE",
      "bp:maintenance-notification-process", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'פקודות אחזקה' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "זרימת התהליך: פקודה (IW31), פעולות ומשאבים, חומרים (RESB), שחרור, התחשבנות (KO88); טבלאות AUFK, AFIH, " +
          "AFKO, AFVC ו-RESB; טרנזקציות IW31 עד IW39; רשימות עבודה IW38 ו-IW39; העלויות מתגלגלות לפקודה ומותחשבנות " +
          "למרכז עלות או לנכס; תקלות: פקודה ללא עלות מתוכננת, ולא ניתן לסגור (CLSD) לפני התחשבנות מלאה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-maintenance-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'פקודות אחזקה' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מטרה, דיאגרמת שלבים (הודעה או דרישה, IW31, תכנון פעולות וחומרים, שחרור, ביצוע ואישור ב-IW41, TECO, " +
          "התחשבנות ב-KO88), נתוני אב (סוג פקודה, מרכז עבודה, אובייקט ייחוס, כלל התחשבנות, פרופיל היתרים), " +
          "Exits‏ IWO10009, IWO10012, IWO10018 ו-BAdIs‏ WORKORDER_UPDATE, תרחישי QA, תקריות (לא ניתן לשחרר, רכיב " +
          "לא זמין, עלות תקועה, TECO נכשל), יישומי Fiori, הגירה (AUFK/AFIH/AFVC נשמרים; עלויות ל-ACDOCA) ומעבר " +
          "ECC ל-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-maintenance-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'אישורי אחזקה' ו'התחשבנות פקודה' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אישור התחזוקה מדווח שעות, חומרים ומדידות, נכתב ל-AFRU, מעדכן עלות בפועל וצריכת רזרבציות ומאפשר סגירה " +
          "טכנית; Exits‏ CONFPM01 ו-BAdIs‏ WORKORDER_CONFIRM; ביטול אישור ב-IW45 מהפך עלות ומלאי. ההתחשבנות מעבירה " +
          "את עלות הפקודה ליעד לפי כלל ההתחשבנות (COBRB), נבדקת ביתרה אפס ומסתיימת בסגירה עסקית (CLSD); ב-S/4HANA " +
          "העלויות נרשמות ב-ACDOCA ללא התאמה נפרדת.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-settlement",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'אחזקת שבר מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שלבי הפקודה: המרת הודעה לפקודה והוספת פעולות ורכיבים (IW31; AUFK, AFIH, AFVC, RESB), שחרור המפעיל " +
          "בדיקת זמינות והיתרים (IW32; AUFK, JEST), ביצוע ואישור שעות וצריכה (IW41; AFRU), סגירה טכנית הסוגרת " +
          "רזרבציות פתוחות, והתחשבנות למרכז עלות אחרי TECO ‏(KO88; COBRB); טעויות שכיחות: שחרור ללא בדיקת זמינות, " +
          "אישור בתקופה סגורה והתחשבנות ללא כלל; נתיב ניפוי: SU53, ST22 ו-EXIT_SAPLCOIH_009 ‏(IWO10009).",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-corrective",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'ניהול אחזקה (EAM)' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המפה מקצה לקצה: הודעה או תוכנית מונעת (IW21, IP30), פקודת אחזקה (IW31, IW32; AUFK, AFIH, AFVC; ממשק " +
          "API_MAINTENANCEORDER), חלפים (IW32, ME53N, MIGO; RESB, EBAN), ביצוע ואישור (IW41, IW42; AFRU) " +
          "והתחשבנות (KO88; COBRB, ACDOCA), עם התקריות order-wont-release, permit-not-auto-assigned, " +
          "equipment-not-in-order, confirm-period-closed, settlement-error ו-teco-blocked.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#maintenance-management",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'אובייקטי אחזקה' של הפרויקט (ECC_S4_TOPICS) ושכבת ההשפעה (S4_IMPACT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: ציוד (EQUI/EQKT/EQUZ), מיקום פונקציונלי (IFLOT), הזמנות (AUFK/AFIH) והודעות (QMEL/QMIH). " +
          "S/4HANA: מבנה נתונים זהה ברובו, בתוספת יישומי Fiori ותצוגות CDS; ההשפעה מינימלית, ה-UX עובר ל-Fiori " +
          "וה-GUI עדיין נתמך. סט הטבלאות היציבות של שכבת ההשפעה מונה בין היתר את AUFK, AFIH, AFKO, AFVC, AFRU, " +
          "EQUI, IFLOT, ILOA ו-JEST כיציבות ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#plant-maintenance-s4",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת נתוני האב 'פקודת אחזקה' של הפרויקט (PM_MASTER_DATA_FACETS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפקודה היא נושאת העלות עם הסטטוסים CRTD, REL, CNF, TECO ו-CLSD; סוגי הפקודה מותאמי לקוח וברירת המחדל " +
          "של SAP היא PM01 מתוכנן או מונע, PM02 תקלה, PM03 שיפוץ או השקעה; היא נוצרת ב-IW31 ידנית, מהמרת הודעה או " +
          "אוטומטית מתוכנית תחזוקה; תלויות: אובייקט טכני (ירושת ILOA ומרכז עלות), רשימת פעולות, מרכזי עבודה, " +
          "חומרים, כלל התחשבנות (COBRB) ואישור (AFRU); טעויות שכיחות: כלל התחשבנות חסר, סטטוס משתמש חוסם, רכיב " +
          "ללא מלאי ואישור בתקופה סגורה.",
        verificationLevel: "repository_verified",
        repoRef: "data/pm-master-data-facets.ts#AUFK",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: order-wont-release, permit-blocks-order-release, teco-blocked, settlement-error, pm-cost-no-activity-type, pm-confirmation-final-flag, maint-order-budget, object-list-multi, equipment-not-in-order, task-list-not-pulled-into-order",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שחרור חסום בגלל היתר פתוח, כשל בבדיקת זמינות, סטטוס משתמש או הרשאה; היתר שלא ניתן חוסם שחרור או סגירה; " +
          "TECO נחסמת באישורים פתוחים, בהיתר הרלוונטי לסיום או בתנועות תקועות; התחשבנות נכשלת ללא כלל, בתקופה " +
          "סגורה או בסטטוס CLSD ו-LKD; שעות ללא סוג פעילות או תעריף אינן יוצרות עלות; אישור שאינו מסומן סופי " +
          "משאיר את הפקודה ב-PCNF; חריגת תקציב חוסמת שחרור או אישור; רשימת אובייקטים שאינה מנוהלת מונעת פיצול " +
          "דיווח ועלות; פקודה ללא ציוד אינה צוברת היסטוריה; רשימת פעולות שאינה משוחררת אינה נשלפת ב-IW31.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#order-wont-release",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment), רשומת BAPI_ALM_ORDER_MAINTAIN",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אובייקט BOR‏ BUS2007, טרנזקציות IW31, IW32 ו-IW38, טבלאות AUFK, AFIH, AFVC, AFVV ו-RESB, עבודה מונחית " +
          "שיטות דרך IT_METHODS, ורצף כתיבה: BAPI_ALM_ORDER_MAINTAIN (HEADER, OPERATION, COMPONENT), " +
          "BAPI_ALM_ORDER_MAINTAIN (RELEASE), BAPI_ALM_CONF_CREATE, BAPI_ALM_ORDER_MAINTAIN (TECHNICALCOMPLETE) " +
          "ואז BAPI_TRANSACTION_COMMIT; שרשרת התהליך: הודעה, פקודה, שחרור, דיווח, תנועת סחורה, סגירה טכנית " +
          "והתחשבנות.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a Maintenance Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/c0146ece9f304378804fa395ac851f98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX2,
        claim:
          "'In the Manage Maintenance Orders app (F5241), you can create new maintenance orders of different " +
          "order types and use existing maintenance orders as a template.' (העמוד אינו מזכיר את IW31.) " +
          "(אומת ברשומת tx:IW31)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FN21,
        claim:
          "תחת הכותרת 'Enhancements to Maintenance Order BAPIs' מתעד העמוד את BAPI_ALM_ORDER_GET_DETAIL כ-BAPI " +
          "הקורא נתוני פקודות אחזקה ושירות ('BAPI BAPI_ALM_ORDER_GET_DETAIL, which reads maintenance and service " +
          "order data', כלשון התקציר), ומציין שהורחב גם לקריאת נתונים ייעודיים של פקודות שיפוץ ('has also been " +
          "enhanced to read refurbishment order specific data'). תחת אותה כותרת מופיע גם BAPI_ALM_ORDER_MAINTAIN. " +
          "הרשומה שייכת לתיעוד S/4HANA On-Premise לגרסת 2025 FPS01, כלומר ה-BAPI מתועד כשמיש במהדורה זו. " +
          "(אומת ברשומת fm:BAPI_ALM_ORDER_GET_DETAIL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Perform Maintenance Jobs | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/3da57072a73444f18b5ad8785bc2900e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX2,
        claim:
          "Perform Maintenance Jobs היא האפליקציה שבה טכנאי תחזוקה סוקר, מבצע ומדווח ממצאים עבור עבודות ששובצו " +
          "('review, execute, and report the findings for jobs that have been dispatched'). (אומת ברשומת tx:IW41)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE_TX2,
        claim:
          "רשומת ה-What's New לגרסת SAP S/4HANA 2023 קובעת, כלשון הסניפט: 'The Confirm Jobs app (W0020) has been " +
          "deleted and is no longer available on the SAP Fiori launchpad', ומפנה לאפליקציות יורשות: 'You can use " +
          "the following successor apps which are available on the SAP Fiori launchpad to review, execute, and " +
          "report the findings for the jobs dispatched for execution: Perform Maintenance Jobs (F5104A'. מזהה " +
          "האפליקציה שנמחקה הוא W0020, לא F2730. (אומת ברשומת fiori:F2730)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settlement Rule | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/99c8b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL15,
        claim:
          "תיעוד הזמנות התחזוקה והשירות לגרסת 2025 FPS01 קובע תחת 'Structure' שחוק ההתחשבנות מורכב מ-'Distribution " +
          "rules' ומ-'Settlement parameters for a sender object', ושלכל שולח התחשבנות מוקצים 'one or more " +
          "distribution rules'; העמוד מפנה ל-Customizing 'Define Settlement Rule, Time and Distribution Rule' תחת " +
          "Maintenance and Service Orders, Functions and Settings for Order Types. הסניפט אינו נוקב בשם הטבלה " +
          "COBRB. (אומת ברשומת table:COBRB)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 4 'Work Order Cycle', סעיפים 4.3 'Planning', 4.4 'Controlling' ו-4.6 'Completion'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את מחזור פקודת העבודה: תכנון (יצירת פקודה, סוגי פקודה, פעולות, תזמון, תכנון חומרים, רשימת " +
          "אובייקטים ואומדן עלות), בקרה (בדיקות זמינות לחומר ול-PRT, שחרור הפקודה והדפסת מסמכי שטח) והשלמה " +
          "(אישורי ביצוע, אישור טכני, סגירה טכנית, סגירה עסקית וזרימת מסמכים). הספר משמש כאן להפניית קריאה בלבד " +
          "ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#4.6",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט: BAPI_ALM_ORDER_MAINTAIN",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הרשומה מתארת את BAPI_ALM_ORDER_MAINTAIN כממשק המרכזי ליצירה ולשינוי של פקודת תחזוקה (כותרת, פעולות, רכיבים, " +
          "אובייקט ייחוס וסטטוס), עם קלט IT_METHODS (רשימת המתודות כולל Save) ו-IT_HEADER / IT_OPERATION / " +
          "IT_COMPONENT, ופלט ET_NUMBERS ו-RETURN (BAPIRET2, ואחריו BAPI_TRANSACTION_COMMIT). ECC: 'זמין וסטנדרטי " +
          "ב-ECC'. S/4HANA: 'זמין ב-S/4HANA. חלופה: OData API_MAINTENANCEORDER / Fiori \"Manage Maintenance Orders\"'. " +
          "כשלים: שיטת Save חסרה ברשימת METHODS, מרכז עבודה או מפעל לא תקף, הרשאה I_AUART, ללא COMMIT.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment): BAPI_ALM_CONF_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רשומת ההעשרה מתארת דיווח פעולה של פקודת תחזוקה (Time Confirmation), כתיבה, בזיקה ל-IW41 ו-IW42 ולטבלאות AFRU " +
          "ו-AFVC, עם פרמטרים 'TAB TIMETICKETS (BAPI_ALM_TIMECONFIRMATION), DETAIL_RETURN, RETURN', קשר " +
          "ל-BAPI_ALM_ORDER_MAINTAIN ול-BAPI_TRANSACTION_COMMIT, וטעויות שכיחות: שכחת COMMIT ודיווח על פעולה שלא " +
          "שוחררה. בשדה הרצף (seq) של רשומת BAPI_ALM_ORDER_MAINTAIN באותו קובץ הוא ממוקם אחרי RELEASE ולפני " +
          "TECHNICALCOMPLETE.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_CONF_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט: BAPI_ALM_CONF_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הרשומה מתארת אישור ביצוע פקודת תחזוקה (שעות, כמויות, מרכז עבודה) המעדכן עלויות בפקודה, עם טבלת קלט " +
          "CONFIRMATIONS (ORDERID, OPERATION, WORK, FIN_CONF) ופלט RETURN עם COMMIT; 'זמין ב-ECC' ו-'זמין ב-S/4HANA'; " +
          "כשלים: פקודה לא משוחררת, מרכז עבודה שגוי, תקופה סגורה. שם טבלת הקלט כאן (CONFIRMATIONS) שונה מרשומת ההעשרה " +
          "(TIMETICKETS), ואף אחד מהשמות לא אומת מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_CONF_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment): BAPI_ALM_ORDER_GET_DETAIL ו-BAPI_ALM_ORDERHEAD_GET_LIST",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "BAPI_ALM_ORDER_GET_DETAIL: קריאה בלבד על BUS2007, בזיקה ל-IW33 ולטבלאות AUFK, AFIH ו-AFVC, עם פרמטרים 'IMP " +
          "NUMBER · EXP ES_HEADER · TAB ET_OPERATIONS, ET_COMPONENTS, ET_COSTS, RETURN'. BAPI_ALM_ORDERHEAD_GET_LIST " +
          "(רשומה סמוכה באותו קובץ): קריאה בלבד, רשימת פקודות לפי בחירה, בזיקה ל-IW38 ו-IW39 ולטבלאות AUFK ו-AFIH, עם " +
          "'IMP selection · TAB ET_HEADER, RETURN'.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_GET_DETAIL",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת שיטת העבודה 'משמעת COMMIT בקריאות BAPI' של הפרויקט",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "BAPI כותב בתחזוקת מפעל, כולל BAPI_ALM_ORDER_MAINTAIN, אינו מבצע COMMIT WORK בעצמו: בודקים את RETURN אחרי כל " +
          "קריאה (TYPE בערך E או A פירושו כישלון), קוראים ל-BAPI_TRANSACTION_COMMIT אחרי הצלחה, " +
          "ל-BAPI_TRANSACTION_ROLLBACK בשגיאה, ובקריאת RFC שומרים על אותו חיבור stateful עד ה-COMMIT; לפי הרשומה " +
          "העיקרון חל על SAP ERP 6.0 ועל S/4HANA On-Premise כאחד.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/pm.ts#bapi-commit-discipline",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: pm-confirmation-final-flag",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "התקרית 'אישור סופי שגוי: פקודה לא נסגרת' (PM) מונה את BAPI_ALM_CONF_CREATE בין הפונקציות הרלוונטיות, לצד " +
          "IW41, IW33, CO03, הטבלאות AFRU ו-AFVC וה-Exit‏ CONFPM01; הסיבות: אישור סופי שלא סומן, פעולות פתוחות וסבולת " +
          "שעות.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#pm-confirmation-final-flag",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 · item 4.1.4 S4TWL - Batch Input for Enterprise Asset Management (EAM), pp. 77-78",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE_FN21,
        claim:
          "מסמך רשימת הפישוט הרשמית SIMPL_OP2025.pdf הורד מ-help.sap.com (10.6MB, 1,514 עמודים, Document Version 1.36) " +
          "והטקסט חולץ ונקרא (pdftotext -layout: 70,529 שורות; pdftotext רגיל: 85,712 שורות): המחרוזת " +
          "BAPI_ALM_ORDERHEAD_GET_LIST אינה מופיעה ולו פעם אחת בשתי ההפקות, וגם המחרוזת API_MAINTENANCEORDER אינה " +
          "מופיעה; לפיכך אין ברשימת הפישוט של 2025 FPS01 פריט הנוקב ב-BAPI זה (ממצא תחום לטקסט המחולץ). ה-BAPI היחיד של " +
          "פקודות אחזקה שהמסמך נוקב בו הוא BAPI_ALM_ORDER_MAINTAIN, בפריט 4.1.4 S4TWL - Batch Input for Enterprise " +
          "Asset Management (EAM) (Application Component: PM, עמ' 77 עד 78): 'Plant Maintenance offers a set of API´s " +
          "which are supporting the creation / change of Plant Maintenance data like: ... Maintenance Order • " +
          "BAPI_ALM_ORDER_MAINTAIN', ובהמלצה: 'Recommendation within EAM is to use the API´s wherever possible'. זו " +
          "רשימת ממשקי יצירה ושינוי, ו-BAPI הקריאה לרשימת כותרות אינו נמנה בה; הפריט עצמו עוסק ב-Batch Input (טרנזקציית " +
          "IBIP) ולא ב-BAPI זה. (אומת ברשומת fm:BAPI_ALM_ORDERHEAD_GET_LIST)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order - Read | What's New in SAP S/4HANA 2021",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/be4e2d6267d844a89f99119c1d5215ef.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE_FM_02,
        claim:
          "‏API_MAINTENANCEORDER ‏(Maintenance Order - Read) הוא שירות OData נכנס סינכרוני לקריאת נתוני כותרת, פעולות, " +
          "רכיבים ורשימת אובייקטים של פקודת אחזקה. (אומת ברשומת fm:BAPI_ALM_ORDER_MAINTAIN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Evaluation of Maintenance Order Data Including Buffer | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS02",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/6bf41002c3dc4701aa525d0de9094417.html?locale=en-US&state=PRODUCTION&version=2023.002",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        accessedAt: DATE_FM_02,
        claim:
          "SAP מתעדת עיבוד פקודות הן דרך ה-BAPI‏ BAPI_ALM_ORDER_MAINTAIN והן דרך ה-API מבוסס ה-RAP‏ Maintenance Order " +
          "(Version 2)‏ ('via the BAPI BAPI_ALM_ORDER_MAINTAIN via the RAP-based API Maintenance Order (Version 2)', " +
          "כלשון הסניפט); שני הממשקים מתקיימים זה לצד זה. (אומת ברשומת fm:BAPI_ALM_ORDER_MAINTAIN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Order (Entity) - Version 2 | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/a77ab811acd34f38a715f8093eb68ead.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_02,
        claim:
          "‏Maintenance Order (Version 2) OData API מתועד ל-On-Premise תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2, כולל פעולות ברמת הישות. (אומת ברשומת " +
          "fm:BAPI_ALM_ORDER_MAINTAIN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Read All Maintenance Orders (Version 2) | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/50ded8443fd649b0bb3fa841da1e5eb6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "רשומת 'Read All Maintenance Orders (Version 2)' במדריך APIs for Maintenance Management למהדורת On-Premise " +
          "2025 FPS01 קובעת, כלשון התקציר: 'With this operation, you use the HTTP method GET to retrieve a list of all " +
          "maintenance orders. You can use filters to limit the list results. ... Response The operation returns the " +
          "success status code 200 OK with the header details of all maintenance orders that correspond to your filter " +
          "settings.' באותו מדריך ובאותה מהדורה, רשומת 'Operations for Maintenance Order (Entity) - Version 2' (loio " +
          "a77ab811acd34f38a715f8093eb68ead) מונה 'Read All Maintenance Orders (Version 2) GET' לצד 'Read Maintenance " +
          "Order Header (Version 2) GET <host>/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2/MaintenanceOrder('4012109')'; " +
          "כתובת הדוגמה של פעולת Read All עצמה נקטעת בתקציר ואינה נרשמת. רשומת השירות 'Maintenance Order (Version 2)' " +
          "(loio c1457e0e539740a29932fbdcf36fea3c, 2025.001) פותחת ב-'This service enables you to create, read, update " +
          "and delete maintenance order data in an API call', מציגה את הישות 'Maintenance Order (MaintenanceOrder) " +
          "Allows to read the maintenance order header data' ונושאת בתקציר את השם API_MAINTENANCEORDER_0002; אותו שם " +
          "מופיע ב-What's New 2025 FPS01 (loio 5bde6113f9fd41afba2740a652612498; בקובץ WN_OP2025_FPS01_EN.pdf עמ' 37, " +
          "סעיף 3.1.5 'OData API: Maintenance Order'). היסטוריית השירות לפי רשומות What's New: 2021 (loio " +
          "be4e2d6267d844a89f99119c1d5215ef): 'The OData API Maintenance Order - Read (API_MAINTENANCEORDER) is a " +
          "synchronous inbound service that allows you to read header, operation, component, object list item, and " +
          "operation relationship data of maintenance orders'; 2022 (loio 600107c46bea4b0fbb32575531821dce): 'Up to " +
          "now, you could only use the OData API to read maintenance order data' ו-'the API has been renamed from " +
          "Maintenance Order - Read to Maintenance Order'. רשומת 'Maintenance Order (Deprecated)' (loio " +
          "d3f02cfccf00407ab9776ea2ec2030d3, 2025.001) קובעת: 'We recommend that you switch to the following successor " +
          "API as soon as possible: Maintenance Order (Version 2) (API_MaintenanceOrder_002)'; הצהרת יורש זו נוגעת " +
          "לגרסה 1 מול גרסה 2 של שירות ה-OData, לא ל-BAPI. אף אחת מהרשומות אינה נוקבת בשם BAPI_ALM_ORDERHEAD_GET_LIST. " +
          "(אומת ברשומת fm:BAPI_ALM_ORDERHEAD_GET_LIST)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order (What's New in SAP S/4HANA 2023)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/abbd23f555bb482f9d2b3a838fa8ab6b.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE_OBJ_24,
        claim:
          "עמוד ה-What's New של SAP S/4HANA 2023 מציין שה-OData API‏ MaintenanceOrder הוצא משימוש (deprecated) ושגרסת " +
          "ממשיך שוחררה, MaintenanceOrder (Version 2), הכוללת ישויות שהשתנו והורחבו: Maintenance Order Settlement Rule " +
          "(Version 2), Maintenance Order Operation Component (Version 2) ו-Maintenance Order Component Long Text " +
          "(Version 2). הפרטים הטכניים: רכיב יישום PM-WOC-MO (Maintenance Orders), פריטי היקף 4HH/4HI/BH1/BH2/BJ2, " +
          "Valid as Of SAP S/4HANA 2023. (אומת ברשומת obj:maintenance-order)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order (What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/5bde6113f9fd41afba2740a652612498.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_OBJ_24,
        claim:
          "עמוד ה-What's New של 2025 FPS01 מציין שניתן כעת לערוך פקודות תחזוקה הניתנות לחיוב (billable) באמצעות ה-OData " +
          "API‏ Maintenance Order (Version 2)‏ (API_MAINTENANCEORDER_0002). הפרטים הטכניים: סוג Changed, רכיב יישום " +
          "PM-WOC-MO, Valid as Of 2025 FPS01, זמינות SAP S/4HANA Cloud Private Edition ו-SAP S/4HANA. (אומת ברשומת " +
          "obj:maintenance-order)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "F5241 Manage Maintenance Orders (Fiori Apps Library)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5241')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_OBJ_24,
        claim:
          "רשומת ה-Fiori Apps Library ל-F5241 (Manage Maintenance Orders, SAP Fiori elements) מציגה אותה כיישום " +
          "Published תחת רכיב PM-FIO-WOC-MO, עם התפקיד SAP_BR_MAINTENANCE_PLANNER, קטלוג עסקי SAP_EAM_BC_WORKORD_MNG, " +
          "ה-intent MaintenanceOrder-manageWorkOrder, ושירות OData‏ V4 בקבוצה UI_MAINTENANCEORDER_MANAGE (רכיב Backend " +
          "S4CORE 109). הטרנזקציה המובילה המקושרת היא IW31, וטרנזקציות קשורות IW32/IW33/IW37N/IW38/IW39. הזמינות רשומה " +
          "עבור S30OP (2023 FPS03) עד S32OP (2025 FPS01), בעריכת On-Premise ובעריכת Private Cloud גם יחד. הפריט הקודם " +
          "הרשום הוא F2175 (Find Maintenance Order); לא רשום successor. (אומת ברשומת obj:maintenance-order)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7d6c7de7b9234747978552d4ca44466b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
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
        sourceType: "sap_help",
        sourceTitle: "Create a Single Order Operation Confirmation | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/25fae824604447bb9a2dddc6363ce51b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "ב-S/4HANA On-Premise 2025 FPS01 מתועדת פעולת יצירה של אישור פעולה בודד בפקודת תחזוקה דרך שירות ה-OData: " +
          "'Create a single order operation confirmation ... POST: " +
          "<host>/sap/opu/odata/sap/API_MAINTORDERCONFIRMATION/MaintOrderConfirmation' (כלשון הסניפט). ערוץ היצירה של " +
          "אישורי תחזוקת מפעל ב-API הרשמי מתועד אפוא גם בגרסה העדכנית; ה-BAPI עצמו אינו מוזכר ברשומה. (אומת ברשומת " +
          "fm:BAPI_ALM_CONF_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Set Statuses for Maintenance Order (Version 2) | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/8a7302352656477ba3a93eac876af5a9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד נקרא (sap-help-body.mjs, loio 8a7302352656477ba3a93eac876af5a9): 'You can use the following " +
          "functions to perform actions on a maintenance order. For example, you can assign a notification to a " +
          "maintenance order, schedule, approve and release a maintenance order, set and reset all maintenance order " +
          "operations to Dispatched, and set or revert maintenance order statuses like Ready for Scheduling, Main Work " +
          "Completed, Technically Completed, or Do not Execute. You can also lock or unlock the maintenance order and " +
          "set or reset the deletion flag'; 'It is not possible to set statuses for more than one order at a time'. " +
          "הטבלה מונה פונקציות POST בנתיב API_MAINTENANCEORDER;v=2, בהן ReleaseMaintenanceOrder, " +
          "SetMaintOrdToTechCompleted, ResetMaintOrdStsTechCompleted, SetMaintOrderStatusToClosed, " +
          "ResetMaintOrderStatusClosed, ScheduleMaintenanceOrder, AssignMaintNotificationToOrder, " +
          "SubmitMaintOrderForApproval, ApproveMaintenanceOrder, RejectMaintenanceOrder, SetMaintOrderOpToDispatched, " +
          "SetMaintOrdToMainWorkComplete, SetMaintOrderToDoNotExecute, SetMaintOrderStatusToLocked, " +
          "SetMaintOrderStatusToUnlocked ו-SetMaintOrdStsToMrkdForDeltn. העמוד אינו נוקב בשמות BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Events | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d074f5dd21c6431ea9ef1e4b4606d103.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד נקרא: 'The Maintenance Order business object triggers the following events', ובהם SetToInPlanning " +
          "('raised when the maintenance order has reached the subphase In Planning (Order) or when the system status " +
          "has been set to Created'), SetToInPreparation ('... or when the system status has been set to Released'), " +
          "SetToTechCompleted, SetToWorkNotPerfrmd, Closed ו-SetToDeletnFlagged לכל סוגי הפקודה, ואירועי שלבים " +
          "(SubmdForApproval, Approved, Rejected, SetToRdyForSchedg, SetReadyForExec, SetToWorkStarted, " +
          "SetToMainWorkCmplt, SetToWorkDone) לפקודות המעובדות לפי שלבים; המטען כולל MaintenanceOrder " +
          "ו-MaintenanceOrderType. 'Business events are published on the SAP Business Accelerator Hub'. הערת העמוד: " +
          "'the system triggers the maintenance order events only if the scope items Reactive Maintenance (4HH) and " +
          "Proactive Maintenance (4HI) are active or if you have configured the phase model in Customizing the same way " +
          "as it is delivered for these scope items'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation Events | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/244804bcac324a88953e5cc346ef9a9a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד נקרא: האובייקט העסקי של אישור פעולת פקודת תחזוקה מפעיל את האירועים Created ('triggered when a " +
          "maintenance order operation confirmation is created') ו-Canceled ('triggered when a maintenance order " +
          "operation confirmation is cancelled'), עם מטען של מספר האישור ומונה האישור; האירועים מתפרסמים ב-SAP Business " +
          "Accelerator Hub תחת OP_MAINTENANCEORDERCONFIRMATIONEVENTS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Events | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/66c4a9767f3444f887c625442e38d71c.html?locale=en-US&state=PRODUCTION&version=2023.003",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        accessedAt: DATE28,
        claim:
          "לפי התקציר: 'The business event SetToDeletnFlagged that is raised for the Maintenance Order business object, " +
          "has been changed'; שאר העמוד לא נקרא, ולכן מהות השינוי אינה נרשמת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/34a22e04c4f34e8bb92f842486066b70.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד נקרא: אינטגרציה בין Enterprise Asset Management ל-MES דרך פקודת התחזוקה; תנאי מוקדם: מודל שכפול " +
          "פעיל עם 'the outbound implementation for the maintenance order (468_1)'; 'the orders are distributed to an " +
          "MES by means of IDoc IORDER_01 when they are released', שינויים בפקודות שהופצו נשלחים גם הם, ואחרי ההפצה " +
          "השדות Functional Location, Equipment, Work center ו-Maintenance Plant אינם פתוחים לקלט במערכת S/4HANA; הודעת " +
          "אזהרה על השבתת ציוד מה-MES מובילה ליצירת הודעת תחזוקה ופקודת תחזוקה ולשחרורן ל-MES.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order | Production Planning and Control (PP)",
        url: "https://help.sap.com/docs/SAP_ERP/a0d3efbac8b14fc89b29bf47a1677c86/34a22e04c4f34e8bb92f842486066b70.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד נקרא (SAP ERP 6.0 EHP8, אותו loio כמו עמוד S/4HANA): אותו תיאור, 'the orders are distributed to an " +
          "MES by means of IDoc IORDER_01 when they are released', עם מימוש היוצא 468_1 ואותם שדות שננעלים 'in the ERP " +
          "system'. כלומר ערוץ ההפצה ל-MES מתועד כבר ב-ECC ואינו שינוי של S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Setting Up DRF Integration for MES Processes | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/667aa2e1747d49aeab7a8c36402d6163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_IDOC_02,
        claim:
          "עמוד Setting Up DRF Integration for MES Processes (S/4HANA 2025 FPS01) מציג בטבלת אובייקטי ה-MES 'Production " +
          "order 97_1 97_1 LOIPRO05' (לצד 'Maintenance order 468_1 468_1 IORDER01' ו-'Material 194_1 194_2 MATMAS06'), " +
          "מנחה: 'To determine the latest IDoc version in your system, call transaction WE30 and enter the IDoc name " +
          "with an asterisk (*) instead of the two digit version suffix (for example, enter LOIPRO*)', וקובע: 'All IDoc " +
          "versions are downwards compatible, but it is recommended that you use the latest available IDoc version' " +
          "ו-'A prerequisite is that the receiving system is able to process the relevant basis type'. (אומת ברשומת " +
          "idoc:msg:LOIPRO)",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:IW31, tx:IW41, " +
      "fm:BAPI_ALM_ORDER_GET_DETAIL, table:COBRB ו-fiori:F2730. מזהי Fiori: הקטלוג של הפרויקט נוקב ב-F2731 ל-Manage " +
      "Maintenance Orders, ורשומת fiori:F2731 מסמנת את המזהה כדורש אימות נוסף משום שהתיעוד הרשמי מצמיד את השם " +
      "ל-F5241, שלא היה בקטלוג הפרויקט ב-2026-09-22 ולכן לא קושר אז (היום: בקטלוג ומקושר). F2730 נרשם בקטלוג " +
      "כ-Confirm Jobs, והמקורות הרשמיים מצמידים את השם למזהה W0020 שנמחק ב-2023. שמות הטבלאות QMIH, T357G, IHPA " +
      "ו-IHGNS מופיעים ברשומות המאגר אך אינם במילון הפרויקט ולכן אינם מקושרים. פריט SAP Best Practices (Scope Item) " +
      "לתהליך לא אותר ולכן ההפניה הרשמית היא עמוד תיעוד התהליך. לא בוצעה בדיקה במערכת SAP חיה. תוספת 2026-09-28 " +
      "(שדה interfaces): המשפטים הקודמים מתארים את שדות הפרופיל שנכתבו ב-2026-09-22. השדה interfaces נשען על רשומות " +
      "המאגר function-intel.ts, bapi-enrichment.pm.ts, best-practices/pm.ts#bapi-commit-discipline " +
      "ו-troubleshooting-ext3.ts#pm-confirmation-final-flag; על שורות רשמיות שהועתקו מרשומות האימות " +
      "fm:BAPI_ALM_ORDER_MAINTAIN, fm:BAPI_ALM_ORDERHEAD_GET_LIST, fm:BAPI_ALM_CONF_CREATE, obj:maintenance-order " +
      "ו-idoc:msg:LOIPRO; ועל גוף העמודים Set Statuses for Maintenance Order (Version 2) (2025.001), Maintenance " +
      "Order Events ו-Maintenance Order Operation Confirmation Events (2023.latest), ו-Maintenance Order של " +
      "Production Planning and Control (2025.001 ו-SAP ERP 6.18.latest), שנקראו ב-2026-09-28. F5241 נמצא כעת בקטלוג " +
      "data/fiori/apps.ts ולכן מקושר בשורת הטרנזקציות ובשדה interfaces; הממצא הקודם (לא בקטלוג, 2026-09-22) נשמר " +
      "לעיל כהיסטוריה. סוג ה-IDoc נכתב IORDER_01 בעמוד Maintenance Order ו-IORDER01 בעמוד הגדרת ה-DRF; אינו במילון " +
      "הפרויקט ולכן בפרוזה בלבד. פריטי ההיקף 4HH ו-4HI מופיעים כתנאי להפעלת אירועי הפקודה ואינם מוצגים כפריט ההיקף " +
      "של התהליך. שמות הפרמטרים של BAPI_ALM_CONF_CREATE אינם עקביים בין רשומות המאגר ולא אומתו מול מקור רשמי. לא " +
      "בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ================================================== preventive maintenance */
  {
    slug: "preventive-maintenance-process",
    he: "תחזוקה מונעת: מאסטרטגיה ותוכנית, דרך תזמון וניטור מועדים, ועד פקודה במועד",
    en: "Preventive maintenance process: strategy, plan, item and task list, scheduling, deadline monitoring and the on-time order",
    module: "PM",
    summary:
      "התחזוקה המונעת קובעת מתי לבצע: אסטרטגיה עם חבילות מחזור, רשימת פעולות כתבנית, תוכנית תחזוקה ופריט תוכנית " +
      "שמקשר אובייקט לרשימה, תזמון שמייצר מועדי קריאה, וניטור מועדים שמפיק פקודה או הודעה בתוך אופק הקריאה.",
    context:
      "לפי רשומות המאגר התוכנית נשמרת ב-MPLA, הפריט ב-MPOS, היסטוריית התזמון ב-MHIS ואובייקטי הקריאה ב-MHIO; " +
      "רשימות הפעולות משותפות ל-PM ול-PP ונשמרות ב-PLKO, ‏PLPO, ‏PLAS ו-PLMZ. התוכנית היא מבוססת זמן או מבוססת " +
      "ביצועים (מונה), ואופק הקריאה קובע כמה זמן לפני המועד נוצרת הפקודה. ב-ECC התזמון ההמוני רץ כעבודת רקע של " +
      "IP30. ב-S/4HANA IP30 עדיין זמינה, אך פריט הפישוט הרשמי 'S4TWL - Scheduling of Maintenance Plan' מסמן את " +
      "טכנולוגיית ה-Batch Input שבה כטכנולוגיה שאינה עתידית ומפנה את עבודות הרקע ל-IP30H, ולצדם מתועד שירות " +
      "ה-OData‏ API_MAINTENANCEPLAN מגרסת S/4HANA 2021.",
    steps: [
      {
        he: "להגדיר אסטרטגיית תחזוקה עם חבילות מחזור (IP11) כאשר נדרשות תדירויות שונות לפעולות שונות. טבלאות האסטרטגיה T351 ו-T351P נקובות ברשומות המאגר ואינן במילון הפרויקט.",
        xrefs: ["tx:IP11"],
      },
      {
        he: "לבנות רשימת פעולות כתבנית ולשייך לכל פעולה את חבילת האסטרטגיה שלה: רשימה כללית (A), לציוד (E) או למיקום (T).",
        xrefs: ["tx:IA05", "tx:IA01", "tx:IA06", "table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ"],
      },
      {
        he: "ליצור תוכנית תחזוקה ופריט תוכנית המקשר אובייקט טכני לרשימת הפעולות: IP41 לתוכנית מחזור יחיד, IP42 לתוכנית אסטרטגיה, IP43 לתוכנית מונים מרובים, או IP01 לתוכנית כללית.",
        xrefs: ["tx:IP01", "tx:IP41", "tx:IP42", "tx:IP43", "table:MPLA", "table:MPOS", "obj:maintenance-plan"],
      },
      {
        he: "בתוכנית מבוססת ביצועים: להקים נקודת מונה על האובייקט, לתחזק שער הערכה שנתי ולרשום קריאות סדירות. בלי קריאות ובלי שער הערכה התוכנית אינה מתזמנת.",
        xrefs: ["tx:IK01", "tx:IK11", "table:IMPTT", "table:IMRG"],
      },
      {
        he: "לתזמן את התוכנית (IP10) עם נקודת התחלה, אופק קריאה ותקופת תזמון: התזמון מחשב את מועדי הקריאה ורושם אותם בהיסטוריית התזמון.",
        xrefs: ["tx:IP10", "table:MHIS", "table:MHIO", "enh:exit:IPRM0001"],
      },
      {
        he: "להריץ ניטור מועדים כעבודת רקע תקופתית: ב-ECC ובקומפטביליות של S/4HANA דרך IP30, וב-S/4HANA דרך IP30H שהתיעוד מקשר ל-Business Function‏ LOG_EAM_MPS1 ומציג כנתיב התזמון ההמוני. פריט הפישוט מורה להעביר את עבודות הרקע מ-IP30 ל-IP30H.",
        xrefs: ["tx:IP30", "tx:IP30H", "table:MPLA", "table:MHIS"],
      },
      {
        he: "לקבל את אובייקט הקריאה: פקודת תחזוקה או הודעה נוצרת אוטומטית בתוך אופק הקריאה ויורשת את פעולות רשימת הפעולות.",
        xrefs: ["obj:maintenance-order", "table:AUFK", "bp:maintenance-order-process"],
      },
      {
        he: "לבצע ולאשר את הפקודה שנוצרה; האישור הוא שסוגר את מחזור הקריאה ומאפשר את הקריאה הבאה בתוכנית חד מחזורית.",
        xrefs: ["tx:IW41", "table:AFRU"],
      },
      {
        he: "לנטר: IP24 לסקירת התזמון, IP19 ללוח המועדים הגרפי, והיסטוריית התזמון ב-MHIS לאיתור תוכניות ללא קריאות או קריאות כפולות.",
        xrefs: ["tx:IP24", "tx:IP19", "table:MHIS", "table:MHIO"],
      },
      {
        he: "ב-S/4HANA: מתכנן התחזוקה מנטר גם ביישום Maintenance Planning Overview, שהתיעוד הרשמי מתאר כתומך בתכנון ובביצוע העבודה ובניטור שלבי תהליך רגישי זמן.",
        xrefs: ["fiori:F2828", "cds:I_MaintenancePlan"],
      },
      {
        he: "בעיבוד תוכניתי: לפני שימוש בשם BAPI_MAINTENANCEPLAN_CREATE יש לאמת אותו ב-SE37, משום ששכבות המאגר חלוקות על עצם קיומו ורשומת האימות משאירה אותו פתוח; לממשק חדש מתועד שירות ה-OData‏ API_MAINTENANCEPLAN מגרסת S/4HANA 2021.",
        xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE", "tx:SE37"],
      },
    ],
    antiPatterns: [
      "תוכנית ללא נקודת התחלה: התזמון לא רץ ולא נוצרות קריאות (תקרית plan-no-orders).",
      "אופק קריאה או תקופת תזמון קצרים מדי: הפקודה נוצרת מאוחר מדי או לא נוצרת כלל (תקרית maint-plan-no-call-horizon).",
      "IP30 שאינה מתוזמנת כעבודת רקע תקופתית: התהליך המונע תלוי בהרצה ידנית.",
      "השארת עבודות הרקע על IP30 ב-S/4HANA במקום להעבירן ל-IP30H, בניגוד להוראת פריט הפישוט.",
      "תוכנית מבוססת ביצועים בלי קריאות מונה סדירות ובלי שער הערכה: מועד הקריאה אינו מחושב.",
      "רשימת פעולות שאינה משויכת לפריט התוכנית או שתוקפה פג: הפקודה נוצרת בלי פעולות (תקרית tasklist-not-in-plan).",
    ],
    checks: [
      "חיובי: תוכנית מבוססת זמן מתוזמנת ב-IP10, וריצת ניטור המועדים יוצרת פקודה במועד.",
      "שלילי: תוכנית ללא נקודת התחלה אינה מייצרת קריאה.",
      "אינטגרציה: קריאת מונה מתזמנת תוכנית מבוססת ביצועים.",
      "רגרסיה: ריצה חוזרת של ניטור המועדים אינה מכפילה קריאות ב-MHIS.",
      "מעבר: אותה בחירת תוכניות מפיקה אותן קריאות ב-IP30 וב-IP30H, ויומן התזמון נקרא ב-SLG1.",
    ],
    process: {
      purpose:
        "לקבוע מתי תתבצע עבודת תחזוקה ולהפיק אותה אוטומטית במועד: אסטרטגיה ומחזורים, תבנית פעולות, תוכנית ופריט, " +
        "תזמון שמייצר מועדי קריאה, וניטור מועדים שהופך קריאה שהגיע זמנה לפקודה או להודעה.",
      trigger: [
        { he: "החלטה על משטר תחזוקה מונעת לאובייקט או לקבוצת אובייקטים, לפי רשומת נתוני האב של תוכנית התחזוקה." },
        { he: "הגעת מועד מתוזמן בתוך אופק הקריאה, שניטור המועדים מזהה בריצה התקופתית.", xrefs: ["tx:IP30", "tx:IP30H"] },
        { he: "קריאת מונה החוצה סף בתוכנית מבוססת ביצועים.", xrefs: ["tx:IK11", "table:IMRG"] },
      ],
      preconditions: [
        { he: "רשימת פעולות קיימת, משוחררת ובתוקף לתאריך הבסיס.", xrefs: ["table:PLKO", "table:PLPO"] },
        { he: "אסטרטגיה וחבילות מחזור מוגדרות כאשר התוכנית היא תוכנית אסטרטגיה.", xrefs: ["tx:IP11"] },
        { he: "אובייקט התוכנית (ציוד או מיקום פונקציונלי) קיים, ובתוכנית מבוססת ביצועים קיימת נקודת מונה עם שער הערכה.", xrefs: ["table:EQUI", "table:IFLOT", "table:IMPTT"] },
        { he: "עבודת רקע תקופתית מוגדרת לניטור המועדים; ב-S/4HANA לפי פריט הפישוט על התוכנית RISTRA20H של IP30H.", xrefs: ["tx:IP30H"] },
      ],
      masterData: [
        { he: "תוכנית תחזוקה (MPLA) ופריט תוכנית (MPOS) המקשר אובייקט לרשימת פעולות.", xrefs: ["table:MPLA", "table:MPOS", "obj:maintenance-plan"] },
        { he: "אסטרטגיית תחזוקה וחבילות המחזור שלה; טבלאות T351 ו-T351P אינן במילון הפרויקט.", xrefs: ["tx:IP11"] },
        { he: "רשימת פעולות עם מפתחות בקרה, מרכזי עבודה, חומרים וכלי עזר.", xrefs: ["table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ", "table:CRHD"] },
        { he: "נקודת מדידה או מונה עם מאפיין וגבולות, לתוכנית מבוססת ביצועים ולתחזוקה מבוססת מצב.", xrefs: ["table:IMPTT", "table:IMRG"] },
        { he: "פרמטרי תזמון: אופק קריאה, תקופת תזמון, מקדמי הסטה וסבולת." },
      ],
      roles: [
        { he: "מתכנן תחזוקה או מהנדס אמינות: הבעלים של תוכנית התחזוקה לפי רשומת נתוני האב של המאגר." },
        { he: "מפעילים או ממשק אוטומטי: רישום קריאות המונה שמזינות את התוכניות מבוססות הביצועים.", xrefs: ["tx:IK11"] },
        { he: "מתכנן תחזוקה (SAP_BR_MAINTENANCE_PLANNER) ביישום Maintenance Planning Overview לפי קטלוג ה-Fiori של המאגר.", xrefs: ["fiori:F2828"] },
      ],
      transactions: [
        { he: "IP11 אסטרטגיה; IA01, IA05 ו-IA06 רשימות פעולות; IA08 לתוקף ולסקירה.", xrefs: ["tx:IP11", "tx:IA01", "tx:IA05", "tx:IA06", "tx:IA08"] },
        { he: "IP01, IP41, IP42 ו-IP43 ליצירת תוכניות; IP02 ו-IP03 לשינוי ולתצוגה.", xrefs: ["tx:IP01", "tx:IP41", "tx:IP42", "tx:IP43", "tx:IP02", "tx:IP03"] },
        { he: "IP10 לתזמון תוכנית בודדת; IP30 לניטור מועדים; IP30H לתזמון המוני ב-S/4HANA.", xrefs: ["tx:IP10", "tx:IP30", "tx:IP30H"] },
        { he: "IP24 ו-IP19 לסקירת התזמון וללוח המועדים; IK01 ו-IK11 לנקודות מדידה ולקריאות.", xrefs: ["tx:IP24", "tx:IP19", "tx:IK01", "tx:IK11"] },
        { he: "Fiori בקטלוג הפרויקט: Maintenance Planning Overview (F2828) לניטור התכנון, Mass Schedule Maintenance Plans (F2774) לתזמון המוני ו-Manage Maintenance Plans (F5325) לניהול תוכניות, לפי רשומות ספריית ה-Fiori.", xrefs: ["fiori:F2828", "fiori:F2774", "fiori:F5325"] },
      ],
      tables: [
        { he: "MPLA כותרת התוכנית, MPOS פריט התוכנית.", xrefs: ["table:MPLA", "table:MPOS"] },
        { he: "MHIS היסטוריית התזמון, MHIO אובייקטי הקריאה.", xrefs: ["table:MHIS", "table:MHIO"] },
        { he: "PLKO, PLPO, PLAS ו-PLMZ לרשימות הפעולות; IMPTT ו-IMRG לנקודות מדידה ולקריאות.", xrefs: ["table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ", "table:IMPTT", "table:IMRG"] },
        { he: "האובייקט העסקי תוכנית תחזוקה ותצוגת ה-CDS שלה. לפי רשומת האימות cds:I_MaintenancePlan, התיעוד הרשמי (What's New 2021 FPS01) מסמן את התצוגה כמוצאת משימוש מ-S/4HANA 2021, והיורשת היא I_MaintenancePlanBasic, שאינה ביקום המזהים של הפרויקט.", xrefs: ["obj:maintenance-plan", "cds:I_MaintenancePlan"] },
      ],
      integrationPoints: [
        { he: "תוכנית אל פקודה: הקריאה יוצרת פקודת תחזוקה או הודעה שיורשת את פעולות רשימת הפעולות.", xrefs: ["obj:maintenance-order", "tx:IW31", "bp:maintenance-order-process"] },
        { he: "תוכנית אל אובייקטים טכניים: אובייקט התוכנית הוא ציוד או מיקום פונקציונלי, ונקודות המדידה שלו מזינות את התזמון מבוסס הביצועים.", xrefs: ["table:EQUI", "table:IFLOT", "table:IMPTT", "bp:technical-objects-process"] },
        { he: "תוכנית אל QM: תוכנית כיול מפיקה פקודה עם מפתח בקרה לבדיקה, ומשם מנת בדיקה ורישום תוצאות.", xrefs: ["tx:QE11", "tx:QA11", "table:PLMK"] },
        { he: "הרחבות: Customer Exit‏ IPRM0001 לתזמון התוכנית, ו-IWO10009 לבדיקות בפקודה שנוצרת.", xrefs: ["enh:exit:IPRM0001", "enh:exit:IWO10009"] },
        { he: "ממשק תוכניתי: שירות ה-OData‏ API_MAINTENANCEPLAN מתועד מגרסת S/4HANA 2021 לשאילתה, ליצירה ולשינוי של תוכניות; שם ה-BAPI שבמאגר טרם אומת.", xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE"] },
      ],
      interfaces: [
        { he: "S/4HANA, שירות ה-OData‏ API_MAINTENANCEPLAN (חדש מ-S/4HANA 2021 לפי What's New 2021): קריאה על הישות A_MaintenancePlan, ויצירת תוכנית מחזור יחיד מבוססת זמן או מבוססת מונה בפעולת POST על הנתיב MaintenancePlan, לפי עמודי הפעולה של 2025 FPS01 (בדוגמאות: MaintenancePlanCategory, ‏MaintPlanSchedgIndicator, ‏MaintenancePlanningPlant, ‏MainWorkCenter, ‏MaintenanceOrderType, ‏Equipment); שיוך פריט לתוכנית בפעולה AssignMaintItemToMaintPlan; ולצדו API_MAINTENANCEITEM ליצירה ולעדכון של פריטי תחזוקה. הרשומות אינן נוקבות ב-BAPI ואינן מציגות את השירות כמחליף של מודול פונקציה.", xrefs: ["obj:maintenance-plan", "table:MPLA", "table:MPOS"] },
        { he: "S/4HANA, תזמון דרך אותו שירות: הפעולה StartMaintPlnSchedule‏ (POST, פרמטר MaintenancePlan) מתזמנת תוכנית מקטגוריה Maintenance Notification, ‏Maintenance Order או Service Order, עם SchedulingStartDate, ‏SchedulingStartTime (למונים מרובים), MaintPlanStartCntrReadingValue (למבוססות ביצועים) ו-MaintPlnSchedgCallObjUpToDte לשחרור קריאות עד תאריך; לפני ההפעלה נדרשת קריאה של התוכנית והעברת ה-e-tag בכותרת (2025 FPS01). What's New 2021 FPS01 מתעד תזמון והפעלה מחדש של תוכנית אחת או יותר בבקשת batch אחת, ושחרור קריאות לחלון מוגדר בתוך הבקשה; What's New 2025 FPS01 מוסיף את הפעולות Release Maintenance Call ו-Fix Maintenance Call על תוכנית מתוזמנת.", xrefs: ["obj:maintenance-plan"] },
        { he: "S/4HANA, קריאת אובייקטי הקריאה (2025 FPS01): הישות MaintenancePlanCallObject באותו שירות מחזירה לכל תוכנית, מספר קריאה ופריט את פקודת התחזוקה או את ההודעה שנוצרו, את MaintCallHorizonIsNotReached (אופק הקריאה טרם הושג ולכן אין עדיין אובייקט קריאה), את SchedulingStatus ואת PlannedStartDate, כולם לקריאה בלבד. במודל הטבלאות של המאגר אובייקטי הקריאה נשמרים ב-MHIO.", xrefs: ["obj:maintenance-order", "obj:maintenance-notification", "table:MHIO"] },
        { he: "S/4HANA, אירועים עסקיים (APIs for Maintenance Management, 2023 Latest): האובייקט העסקי Maintenance Plan מפעיל את MaintenancePlan.Created, ‏MaintenancePlan.Changed, ‏MaintenancePlan.ScheduleStarted ו-MaintenancePlan.ScheduleRestarted (מטען: מזהה התוכנית, ובאירועי התזמון גם קטגוריית התוכנית), והם מתפרסמים ב-SAP Business Accelerator Hub; לפי What's New 2023 FPS03 שני אירועי התזמון חדשים מאותה גרסה, ברכיב PM-PRM-MP.", xrefs: ["obj:maintenance-plan"] },
        { he: "ECC ו-S/4HANA, Enterprise Services: פעולת השירות Schedule Maintenance Plan‏ (MaintenancePlanERPScheduleRequestConfirmation_In, SAP APPL 6.06, Release State released, נכנסת וסינכרונית) מתזמנת תוכנית בארבעה מצבי תזמון (תזמון ראשון, מתוכנן, תזמון מחדש, ותזמון מחדש במחזור לתוכניות מונים מרובים ולתוכניות אסטרטגיה), עם ההודעות MaintenancePlanERPScheduleRequest_sync ו-MaintenancePlanERPScheduleConfirmation_sync וה-BAdI‏ EAM_SE_MAINTPLNSCHEDRC (אינו במילון הפרויקט); הנוסח זהה ב-SAP ERP 6.0 EHP8, ב-S/4HANA 2023 Latest וב-2025 FPS01. האובייקט העסקי Maintenance Plan של השירותים משתמש לפי התיעוד בטבלאות MPLA, ‏MPOS, ‏MMPT, ‏MHIO ו-MHIS. רשומת האימות של המאגר מתעדת גם את פעולת היצירה Create Maintenance Plan‏ (MaintenancePlanERPCreateRequestConfirmation_In).", xrefs: ["obj:maintenance-plan", "table:MPLA", "table:MPOS", "table:MHIO", "table:MHIS"] },
        { he: "ECC ו-S/4HANA, ממשקי פונקציה: תיעוד Enterprise Asset Management Part 4 (LOG_EAM_CI_4; ב-ECC מ-EHP5, ב-S/4HANA מ-1511) קובע ש-'API functions have been developed for the scheduling of maintenance plans' עם הפונקציות של IP10, בלי לנקוב בשמם. בטעינה ראשונית אובייקט ההגירה 'PM - Maintenance plan' של 2025 FPS01 נוקב במודול MPLAN_CREATE לצעד יצירת התוכנית, ועמוד 'PM - Maintenance item' נוקב ב-MPLAN_ITEM_CREATE; שניהם אינם במילון הפרויקט, וממשקם וסטטוס השחרור שלהם לא אומתו.", xrefs: ["tx:IP10", "obj:maintenance-plan"] },
        { he: "שמות במאגר שלא אומתו: BAPI_MAINTENANCEPLAN_CREATE נשאר verification_required עם שכבות מאגר סותרות; BAPI_MAINTENANCEPLAN_SCHEDULE ו-BAPI_MAINTENANCEPLAN_GETLIST, ש-TX_INTEL מצמיד ל-IP10, ל-IP30 ול-IP01, לא הוחזרו באף רשומה רשמית שנבדקה ואינם במילון הפרויקט; ומודולי הפונקציה MAINTENANCE_PLAN_SCHEDULE, ‏ISCHED_CALL_GENERATE, ‏MAINTENANCE_ITEM_READ ו-SCHEDULING_HISTORY_READ, שרשומת התחום מונה, ורשומות האימות שלהם אינן מתעדות רשומה רשמית הנוקבת בשמם (שורות הראיה לשם עצמו נשארות verification_required). לפני שימוש בקוד Z או בממשק: בדיקה ב-SE37 במערכת היעד.", xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE", "fm:MAINTENANCE_PLAN_SCHEDULE", "fm:ISCHED_CALL_GENERATE", "fm:MAINTENANCE_ITEM_READ", "fm:SCHEDULING_HISTORY_READ", "tx:SE37", "tx:IP01", "tx:IP10", "tx:IP30"] },
        { he: "S/4HANA, שירותי ה-OData של יישומי ה-Fiori לפי ספריית ה-Fiori (S32OP, 2025 FPS01): Mass Schedule Maintenance Plans‏ (F2774) רץ על APJ_JOB_MANAGEMENT_SRV (Generic Job Scheduling Framework), עם IP30 כטרנזקציה מובילה ו-IP30H כקשורה; Manage Maintenance Plans‏ (F5325) על UI_MAINTENANCE_PLAN, ‏C_MAINTPLANACTVSYSTSTATUSQ_CDS ו-/SSB/SMART_BUSINESS_RUNTIME_SRV, עם IP01 כטרנזקציה מובילה; Maintenance Planning Overview‏ (F2828) על EAM_ORDER_MONITOR.", xrefs: ["fiori:F2774", "fiori:F5325", "fiori:F2828", "tx:IP30", "tx:IP30H", "tx:IP01"] },
      ],
      outputs: [
        { he: "תוכנית תחזוקה מתוזמנת עם מועדי קריאה מחושבים והיסטוריית תזמון.", xrefs: ["table:MPLA", "table:MHIS"] },
        { he: "אובייקטי קריאה: פקודות תחזוקה או הודעות שנוצרו במועד.", xrefs: ["table:MHIO", "table:AUFK"] },
        { he: "יומן תזמון להפקה ולבדיקה, לפי מחוון יומן היישום בניטור המועדים." },
      ],
      exceptions: [
        { he: "אין פקודות אחרי ריצת ניטור המועדים: התוכנית אינה מתוזמנת, אופק הקריאה קצר, התוכנית מחוץ לבחירה, או שאין קריאות מונה בתוכנית מבוססת ביצועים (תקרית plan-no-orders).", xrefs: ["table:MHIS", "table:MHIO"] },
        { he: "תוכנית חד מחזורית אינה מייצרת קריאה משום שהקריאה הקודמת נשארה ב-Hold או שדרישת ההשלמה חוסמת עד אישור הפקודה הקודמת (תקרית maint-plan-no-call-horizon).", xrefs: ["tx:IP24", "table:MHIS"] },
        { he: "הפקודה נוצרת בלי פעולות: רשימת הפעולות לא שויכה לפריט התוכנית או שתוקפה אינו מכסה את התאריך (תקרית tasklist-not-in-plan).", xrefs: ["table:MPOS", "table:PLKO"] },
        { he: "קריאה נדחית או תוכנית מבוססת ביצועים שאינה מתזמנת: ערך מחוץ לגבולות, קריאות לא רציפות או שער הערכה חסר (תקריות measurement-rejected ו-measuring-counter-cannot-decrease).", xrefs: ["table:IMRG"] },
        { he: "קריאות כפולות אחרי ריצה חוזרת: נבדקות בהיסטוריית התזמון.", xrefs: ["table:MHIS"] },
      ],
      controls: [
        { he: "נקודת התחלה, אופק קריאה ותקופת תזמון נקבעים לפי קטגוריית התוכנית ונבדקים לפני ההפעלה.", xrefs: ["tx:IP10"] },
        { he: "ניטור המועדים רץ כעבודת רקע תקופתית בתדירות שאינה גדולה מהמחזור הקצר פחות אופק הקריאה.", xrefs: ["tx:IP30", "tx:IP30H"] },
        { he: "רשימות הפעולות משוחררות ובעלות בקרת גרסאות לפני שיוכן לפריטי התוכנית.", xrefs: ["tx:IA08", "table:PLKO"] },
        { he: "דוח תקופתי על תוכניות שאינן מייצרות קריאות, לפי המניעה שרשומת התקרית מגדירה.", xrefs: ["tx:IP24"] },
        { he: "בהמרה ל-S/4HANA: סקירת עבודות הרקע של IP30 ויצירת עבודות חדשות ל-IP30H, כהוראת פריט הפישוט.", xrefs: ["tx:IP30H"] },
      ],
      kpis: [
        { he: "Maintenance Plan Scheduling Overview‏ (W0192, תיעוד 2025 FPS01; יישום Web Dynpro לתפקיד SAP_BR_MAINTENANCE_PLANNER לפי ספריית ה-Fiori, המזהה אינו בקטלוג הפרויקט): ניתוח מול 'fixed set of measures' לפי סטטוס אובייקט הקריאה, קריאות מתוזמנות, בהמתנה (on hold), נעולות, משוחררות או שהושלמו, וצפייה בקריאות עתידיות שטרם נוצר להן אובייקט קריאה; את הדוח אפשר לשמור כווריאנט ולייצא כאריח ל-Fiori Launchpad.", xrefs: ["obj:maintenance-plan"] },
        { he: "תצוגת ה-CDS שעליה היישום נשען, C_MaintPlanSchedgOvwQuery‏ (Query, תיעוד 2023 Latest), מסמנת את MaintenancePlanCallNumber ואת MaintenancePlanCallStatus כ-Measure ומונה בשאלותיה העסקיות: מספר הקריאות הצפויות לפי תקופת התזמון, מספר הקריאות שנוצרו, ספירת הקריאות לפי סטטוס (on hold, ‏skipped, ‏fixed) והפער בין התאריך המתוכנן לתאריך ההשלמה בתוכניות. הקריאה דורשת הרשאת תצוגה ל-IP03, ‏IP16, ‏IP24, ‏IP06 ו-IP18; התצוגה אינה במילון הפרויקט.", xrefs: ["tx:IP03", "tx:IP16", "tx:IP24", "tx:IP06", "tx:IP18", "obj:maintenance-plan", "obj:maintenance-order", "obj:maintenance-notification"] },
        { he: "Maintenance Planning Overview‏ (F2828 לפי קטלוג הפרויקט; תיאור היישום לפי What's New 1809): כרטיסים המנתחים בתקופת ייחוס גורמים קריטיים, בהם הודעות פתוחות שלא שויכו, חלקי חילוף חסרים, פקודות באיחור, פקודות שלא שוחררו ופקודות שלא אושרו סופית אף שתאריך הסיום עבר. העמוד אינו מייחד מדד לתוכניות תחזוקה; המדדים נמדדים על הפקודות וההודעות.", xrefs: ["fiori:F2828", "obj:maintenance-order", "obj:maintenance-notification"] },
        { he: "Resource Scheduling for Maintenance Planners (תיעוד 2025 FPS01): כרטיס Work Center Utilization מציג את ניצולת מרכזי העבודה לשבוע הנוכחי ולבא, וכאשר למרכז עבודה אין קיבולת אך יש פעולות פקודה או תוכניות תחזוקה הדורשות קיבולת הכרטיס מציג 999%; לצדו Due Maintenance Orders by Priority (פקודות שמועדן ב-4 השבועות הבאים) ו-Unconfirmed Maintenance Orders (פקודות עם פעולה לא מאושרת שמועד סיומה המתוכנן עבר, עד 6 חודשים אחורה).", xrefs: ["obj:maintenance-order", "obj:maintenance-plan"] },
      ],
      eccToS4: [
        { he: "מודל MPLA, MPOS, MHIS ו-MHIO זהה ב-ECC וב-S/4HANA לפי רשומת התחום 'תכנון אחזקה'.", xrefs: ["table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO"] },
        { he: "IP30 זמינה ב-S/4HANA On-Premise ומתועדת ב-2025 FPS01, אך פריט הפישוט 'S4TWL - Scheduling of Maintenance Plan' מסמן את טכנולוגיית ה-Batch Input שבה כטכנולוגיה שאינה עתידית ומודיע על כוונה להפסיקה במהדורה עתידית. הפריט מופיע בנוסח זהה ברשימת 2025 FPS01 וברשימת 2023 FPS03.", xrefs: ["tx:IP30"] },
        { he: "הנתיב שהפריט מפנה אליו לתזמון המוני הוא IP30H, שתיעוד ה-Help מקשר ל-Business Function‏ LOG_EAM_MPS1; רשומת האימות מסמנת אותה כטרנזקציה חדשה ב-S/4HANA.", xrefs: ["tx:IP30H"] },
        { he: "ממשקים: שירות ה-OData‏ API_MAINTENANCEPLAN מתועד כחדש מגרסת S/4HANA 2021 ליצירה ולשינוי של תוכניות תחזוקה, ולצדו API_MAINTENANCEITEM לפריטים.", xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE"] },
        { he: "חוויית המשתמש: לוח תזמון ויישומי ניטור ב-Fiori לצד ה-GUI, לפי רשומת התחום ולפי קטלוג היישומים של המאגר. התצוגה I_MaintenancePlan הוצאה משימוש מ-S/4HANA 2021 לפי רשומת האימות.", xrefs: ["fiori:F2828", "cds:I_MaintenancePlan"] },
      ],
      migration: [
        { he: "MPLA, MPOS ו-MHIS נשמרים בהמרה; בדיקת הקבלה לפי רשומת התחום היא תזמון ויצירת קריאות אחרי ההמרה.", xrefs: ["table:MPLA", "table:MPOS", "table:MHIS"] },
        { he: "בטעינה ראשונית קיים אובייקט הגירה רשמי לתוכנית תחזוקה, ולפי רשומת האימות תוכניות מבוססות ביצועים, כללי התחשבנות ורשימות אובייקטים של פריטים נמצאים מחוץ להיקפו.", xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE"] },
        { he: "אחרי ההמרה: לוודא שעבודות הרקע לניטור המועדים הוגדרו מחדש, ושהמעבר מ-IP30 ל-IP30H מפיק את אותן קריאות על אותה בחירת תוכניות.", xrefs: ["tx:IP30", "tx:IP30H"] },
      ],
      reference: {
        title: "Scheduling and Automatic Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP), SAP S/4HANA On-Premise 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/2d396b50389ff015e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תיעוד התהליך הרשמי לתזמון תוכניות תחזוקה (אומת ברשומת tx:IP30), המציג את IP10, ‏IP30 ו-IP30H בטבלת הפעילויות. פריט SAP Best Practices (Scope Item) לתהליך לא אותר ואומת בנפרד ולכן אינו נרשם. רשומות What's New רשמיות (2021, 2021 FPS01, 2023 FPS03, 2025 FPS01) מדפיסות BJ2 (Preventive Maintenance) בזיקה ל-API_MAINTENANCEPLAN ולאירועי MaintenancePlan, וספריית ה-Fiori משייכת את F5325 ל-4HI ול-BJ2; אף רשומה אינה קובעת ש-BJ2 הוא פריט ה-Best Practices של התהליך כולו, ולכן הוא אינו נרשם כהפניה.",
      },
    },
    xrefs: [
      "obj:maintenance-plan", "table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO",
      "table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ", "table:IMPTT", "table:IMRG",
      "tx:IP01", "tx:IP10", "tx:IP11", "tx:IP24", "tx:IP30", "tx:IP30H", "tx:IP41", "tx:IP42", "tx:IP43",
      "tx:IA01", "tx:IA05", "tx:IA06", "tx:IK01", "tx:IK11", "tx:IW41",
      "fm:BAPI_MAINTENANCEPLAN_CREATE", "cds:I_MaintenancePlan", "fiori:F2828",
      "enh:exit:IPRM0001",
      "bp:maintenance-order-process", "bp:technical-objects-process", "bp:maintenance-notification-process",
      "fiori:F2774", "fiori:F5325",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום 'אחזקה מונעת' ו'תכנון אחזקה' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "זרימת התהליך: משימת אחזקה (IA01), אסטרטגיה וחבילות (IP11), תוכנית אחזקה (IP01), תזמון (IP10), פקודות " +
          "אוטומטיות (IP30); תכנון האחזקה מנהל תוכניות, פריטי תוכנית ותזמון מבוסס זמן או ביצועים, וה-Scheduling " +
          "יוצר קריאות שמומרות לפקודות או להודעות; טבלאות MPLA, MPOS, MHIO, MHIS, PLKO ו-PLPO; IP30 היא עבודת " +
          "אצווה לניטור מועדים יומי ואופק הקריאה קובע מתי נוצרת הפקודה; תקלות: לא נוצרות פקודות, תזמון שגוי " +
          "במבוסס ביצועים ופעולות שאינן מופיעות בפקודה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-preventive-maintenance",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'תכנון אחזקה', 'רשימות פעולות' ו'נקודות מדידה ומונים' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תכנון האחזקה: דיאגרמה (אסטרטגיה ומחזורים, תוכנית ב-IP01, פריט ורשימת פעולות, תזמון ב-IP10, ניטור " +
          "מועדים ב-IP30, קריאה לפקודה), נתוני אב (אסטרטגיה, מחזורים, פריט MPOS, רשימת פעולות), Exit‏ IPRM0001, " +
          "תרחישי QA (ריצה חוזרת אינה מכפילה קריאות) ותקריות (IP30 שלא רץ, שער הערכה, קריאה כפולה ב-MHIS). " +
          "רשימות הפעולות: תבנית לשימוש חוזר בטבלאות PLKO, PLPO ו-PLAS, סוגים A, E ו-T, חבילות אסטרטגיה, " +
          "ותקרית רשימה שאינה נמצאת בתוכנית. נקודות מדידה: IMPTT ו-IMRG, מונה מצטבר מול מדידה רגעית, קריאה " +
          "שמפעילה תוכנית מבוססת ביצועים ושער הערכה שנתי כתנאי לתזמון.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-maintenance-planning",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'אחזקה מונעת מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שלבי התהליך: הגדרת אסטרטגיה וחבילות מחזור (IP11), יצירת תוכנית ופריט עם אובייקט ורשימת פעולות (IP01; " +
          "MPLA, MPOS), תזמון עם נקודת התחלה (IP10; MHIS, MHIO), ניטור מועדים כעבודה יומית היוצרת פקודות באופק " +
          "הקריאה (IP30; MHIS, AUFK), וביצוע ואישור הפקודה שנוצרה (IW41; AFRU); טעויות שכיחות: מחזורים לא " +
          "מוגדרים, ללא נקודת התחלה, אופק קריאה קצר מדי ו-IP30 שאינה רצה כעבודת רקע; נתיב ניפוי: סקירת התזמון " +
          "ב-IP10, ה-Exit‏ IPRM0001 ו-ST22.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-preventive",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): IP01, IP10, IP30, IP41, IP42, IP11, IA05",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "IP01 יוצרת תוכנית תחזוקה מחזורית (מחזור יחיד, אסטרטגיה או מונים מרובים) וכותבת ל-MPLA ול-MPOS; IP10 " +
          "מריצה את התזמון על MPLA ו-MHIS ומפיקה אובייקטי קריאה; IP30 היא ניטור המועדים התקופתי על אוסף תוכניות, " +
          "ושדה s4Delta שלה אומר שהיא נשמרת ב-S/4HANA כעבודה לתזמון המוני ושלפי פריט הפישוט 'S4TWL - Scheduling " +
          "of Maintenance Plan' הנתיב המומלץ לתזמון המוני הוא IP30H; IP41 היא תוכנית מחזור יחיד, IP42 תוכנית " +
          "אסטרטגיה המקושרת לחבילות, IP11 מתחזקת את האסטרטגיה ואת החבילות (T351, T351P), ו-IA05 יוצרת רשימת " +
          "משימה כללית ב-PLKO, PLPO ו-PLAS.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP30",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות נתוני האב 'תכנית אחזקה' ו'נקודת מדידה ומונה' של הפרויקט (PM_MASTER_DATA_FACETS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תוכנית התחזוקה נוצרת ב-IP01 או ב-IP42 אחרי שקיימות רשימת פעולות ואסטרטגיה, והבעלים הוא מתכנן תחזוקה " +
          "או מהנדס אמינות; תלויות: רשימת פעולות דרך MPOS, אסטרטגיה (IP11), אובייקט התוכנית, נקודות מונה " +
          "ואופק קריאה; טעויות שכיחות: אופק קריאה או פרמטרי תזמון שאינם מוגדרים, זמן הקדמה שמתעלם מהתזמון, " +
          "תוכנית מבוססת ביצועים ללא מונה תקין או עם שער הערכה שגוי, ו-IP30 שאינה מתוזמנת כעבודת רקע לילית. " +
          "נקודת המדידה נוצרת ב-IK01 ומזינה תחזוקה מבוססת מצב ותוכניות מבוססות ביצועים.",
        verificationLevel: "repository_verified",
        repoRef: "data/pm-master-data-facets.ts#MPLA",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: plan-no-orders, maint-plan-no-call-horizon, tasklist-not-in-plan, measurement-rejected",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אין פקודות אחרי ריצת IP30: תוכנית שאינה מתוזמנת, אופק קריאה קצר, התוכנית מחוץ לבחירה או היעדר קריאות " +
          "מונה; תוכנית חד מחזורית שאינה מייצרת קריאה: הקריאה הקודמת ב-Hold, דרישת השלמה חוסמת, או מקדמי הסטה " +
          "וסבולת שדוחפים מחוץ לחלון, ובדיקה ב-IP24, ב-MHIS וב-MHIO; רשימת פעולות שלא שויכה לפריט או שתוקפה פג " +
          "יוצרת פקודה ללא פעולות; קריאת מדידה נדחית כשהערך מחוץ לגבולות או כשהנקודה אינה קיימת.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#plan-no-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "תיעוד התיקונים של ביקורת העיצוב, FIX-9 (audit/ux-2026-09/SAP-FIXES.md)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "FIX-9 קובע ש-IP30H היא הטרנזקציה החדשה של S/4HANA לתזמון המוני של תוכניות תחזוקה ושהיא הנתיב שרשימת " +
          "הפישוט מפנה אליו במקום עבודות הרקע של IP30, ושהמזהה tx:IP30H נוסף לרשומות הפרויקט ולשכבת האימות " +
          "בעוד tx:IP30 עודכנה ל'לא אסטרטגי' עם יורשת מקושרת; פריט הפישוט הוא 4.1.2 ברשימת 2025 FPS01 ו-29.6 " +
          "ברשימת 2023 FPS03, באותו נוסח.",
        verificationLevel: "repository_verified",
        repoRef: "audit/ux-2026-09/SAP-FIXES.md#FIX-9",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 4.1.2 S4TWL - " +
          "Scheduling of Maintenance Plan (PM-PRM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_FN21,
        claim:
          "פריט 4.1.2 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום PM-PRM; הערת Business Impact " +
          "0002270078 'Scheduling of Maintenance Plan', כפי שמופיעה בטבלת ה-Related Notes של הפריט) קובע בלשונו: " +
          "'Transaction IP30 is doing scheduling for Maintenance Plans. Within this scheduling outdated technology " +
          "(Batch Input) is used. Functionality available in SAP S/4HANA on-premise edition 1511 delivery but not " +
          "considered as future technology. Functional equivalent is not available yet. We plan to discontinue this in " +
          "one of the next Releases. The new transaction for doing mass scheduling is IP30H which is optimized for HANA " +
          "and is offering parallel processing at a much hiher speed' [כך במקור]; תחת Business Process related " +
          "information: 'No influence on business processes expected'; ותחת Required and Recommended Action(s): 'Review " +
          "your background Jobs which you most probably have scheduled periodically for transaction IP30 (Reports " +
          "RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)'. כלומר IP30 עדיין זמינה ב-S/4HANA " +
          "On-Premise, מכוסה בפריט פישוט המסמן אותה כטכנולוגיה שאינה עתידית עם כוונת הפסקה במהדורה עתידית, והנתיב " +
          "המומלץ לתזמון המוני הוא IP30H (תוכנית RISTRA20H). (אומת ברשומות tx:IP30 ו-tx:IP30H)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Scheduling and Automatic Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/2d396b50389ff015e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX7,
        claim:
          "תיעוד Maintenance Planning של 2025 FPS01 מונה את IP30 בשמה המלא: 'In the transaction IP30 Deadline " +
          "Monitoring for Maintenance Plans, select the Application Log indicator' (הפקת יומן תזמון), ומציג " +
          "אותה בטבלת הפעילויות לצד 'Scheduling individual maintenance plans (transaction IP10)' ו-'Mass " +
          "schedule maintenance plans (transaction IP30H)'. אובייקט היומן של ניטור המועדים הוא IBIP ושל IP30H " +
          "הוא IP30H, כלשון הסניפט. (אומת ברשומת tx:IP30)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Scheduling 1 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/c9e717b3620e4898a1aba5db9bf03afc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX7,
        claim:
          "ה-Business Function‏ LOG_EAM_MPS1 ('Enterprise Business Function', 'Available From SAP S/4HANA, " +
          "on-premise edition') 'introduces the scheduling function Mass Schedule Maintenance Plans " +
          "(transaction IP30H), which is used to schedule a defined selection of maintenance plans', ומאפשרת " +
          "'to carry out the mass scheduling of maintenance plans faster and more easily'. זהו תיעוד ה-Help " +
          "הרשמי של הטרנזקציה ב-2025 FPS01; לפי הסניפט, IP30H תלויה בהפעלת ה-Business Function. " +
          "(אומת ברשומת tx:IP30H)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "OData APIs: Maintenance Plan and Maintenance Item | What's New in SAP S/4HANA 2021 (וה-PDF המלא " +
          "WN_OP2021_EN.pdf, נקרא במלואו)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/f41b3b527ca3460eb462b2fa2339bab5.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE,
        claim:
          "רשומת What's New לגרסת S/4HANA 2021 (loio f41b3b527ca3460eb462b2fa2339bab5, versionId 2021.000, " +
          "תאריך 2021-10-21) קובעת בתקצירה: 'The OData API Maintenance Plan (API_MAINTENANCEPLAN) allows you to " +
          "query for maintenance plans, create new maintenance plans, or ...' ו-'With the OData API Maintenance " +
          "Item (API_MAINTENANCEITEM), you can now create and update maintenance items'. מסמך ה-What's New המלא " +
          "לגרסה זו (help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2021.000/en-US/WN_OP2021_EN.pdf, " +
          "Document Version 1.0, 2021-10-13) הורד ב-2026-09-22 (HTTP 200, 15,507,023 בתים, 1,412 עמודים) וחולץ " +
          "לטקסט מלא ב-pdftotext; סעיף 2.1.6 שלו, 'OData APIs: Maintenance Plan and Maintenance Item', קובע " +
          "כלשונו: 'The OData API Maintenance Plan (API_MAINTENANCEPLAN) allows you to query for maintenance " +
          "plans, create new maintenance plans, or change existing maintenance plans. While creating new " +
          "maintenance plans, you can also pass additional parameters such as call horizon, scheduling period, " +
          "start and end date for scheduling, shift factors, and tolerance figures.' ובטבלת הפרטים הטכניים: " +
          "'Type New', 'Scope Item 4HI (Proactive Maintenance), BJ2 (Preventive Maintenance), 4X5 (Recurring " +
          "Services)', 'Application Component PM-PRM-MP (Maintenance Plans)', 'Available As Of SAP S/4HANA " +
          "2021'. ממצא שלילי התחום לאותה קריאה: המחרוזות BAPI_MAINTENANCEPLAN, MPLAN_CREATE ו-BUS2028 אינן " +
          "מופיעות בטקסט המסמך, ו-API_MAINTENANCEPLAN מופיע בו פעמיים בלבד: פעם אחת בסעיף 2.1.6, ופעם נוספת " +
          "כשורה 16 ('API_MAINTENANCEPLAN Maintenance Plan') בטבלת 'The following APIs are impacted' של סעיף " +
          "13.19 'Currency Code Conversion' בפרק Cross Components, שאינו נוגע לתוכניות אחזקה. הרשומה אינה נוקבת " +
          "בשם BAPI כלשהו ואינה מציגה את השירות כמחליף של מודול פונקציה. (אומת ברשומת fm:BAPI_MAINTENANCEPLAN_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 5 'Preventive Maintenance', סעיפים 5.3 עד 5.8",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את עקרונות התחזוקה המונעת ואת אובייקטיה: רשימות משימה (5.3), תוכניות מבוססות זמן עם מחזור " +
          "יחיד ועם אסטרטגיה (5.4), תוכניות מבוססות ביצועים (5.5), תוכניות מונים מרובים (5.6), סבבי בדיקה (5.7) " +
          "ותחזוקה מבוססת מצב (5.8). הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#5.4",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Single Cycle Time-Based Maintenance Plan of Category Order/Notification | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/87c49eb9e5d8495485fc22cb339b9e2b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד הפעולה 'Create Single Cycle Time-Based Maintenance Plan of Category Order/Notification' במדריך APIs for " +
          "Maintenance Management למהדורת On-Premise 2025 FPS01 (loio 87c49eb9e5d8495485fc22cb339b9e2b, versionId " +
          "2025.001, תאריך 2026-02-24) קובע בתקצירו: 'Using this request, you can create a new single cycle time based " +
          "maintenance plan Examples Request POST <host>/sap/opu ...' ומציג בגוף הבקשה לדוגמה את המאפיינים " +
          "'MaintenancePlanningPlant': '1010', 'MainWorkCenter': 'RES-0100', 'MaintenanceOrderType': 'YA02', " +
          "'Equipment': '10057574'. עמוד האח 'Create Single Cycle Counter-Based Maintenance Plan for " +
          "Order/Notification' (loio 3962e390050646ad8b42d151c3e9791b, 2025.001): 'Using this request you can create a " +
          "new single cycle counter-based maintenance plan for maintenance order or maintenance notification', 'Request " +
          "POST <host>/sap/opu/odata/sap/API_MAINTENANCEPLAN/MaintenancePlan HTTP/1.1', עם 'MaintenancePlanCategory': " +
          "'PM' ו-'MaintPlanSchedgIndicator': '3' בתשובה. עמוד הסקירה 'Operations for Maintenance Plan' (loio " +
          "e9e26138959d4c028145900daf0e1dde), שהחיפוש מחזיר עבורו versionId 2023.latest בלבד בסקופ On-Premise (ותחת SAP " +
          "S/4HANA Cloud Public Edition 2608.500), מונה בתקציריו: 'The Maintenance Plan API offers these operations: " +
          "Operation HTTP Method Sample URL Read All Maintenance Plans GET GET " +
          "host>/sap/opu/odata/sap/API_MAINTENANCEPLAN ... /A_MaintenancePlan/', 'Create Single Cycle Time-Based " +
          "Maintenance Plan of Category Order/Notification POST POST " +
          "<host>/sap/opu/odata/sap/API_MAINTENANCEPLAN/MaintenancePlan', 'Single Cycle Counter-Based Maintenance Plan " +
          "for Order/Notification POST POST <host>/sap/opu/odata/sap/API_MAINTENANCEPLAN/MaintenancePlan Create " +
          "Strategy Time-Based Maintenance Plan for Order or ...', 'Create Multi-Counter Maintenance Plan for Order or " +
          "Notification POST POST <host>/sap/opu/odata/sap/API_MAINTENANCEPLAN/MaintenancePlan Create Many ...' " +
          "ו-'Assign Maintenance Item To Maintenance Plan POST POST " +
          "<host>/sap/opu/odata/sap/API_MAINTENANCEPLAN/AssignMaintItemToMaintPlan?'; כלומר בכתובות הדוגמה הקריאה נעשית " +
          "על הישות A_MaintenancePlan ויצירה בפעולת POST על הנתיב MaintenancePlan. עמודי 'Create Strategy Time-Based " +
          "...' ו-'Create Multi-Counter ...' עצמם לא הוחזרו בחיפוש הנעול ל-2025.001; בחיפושים שבוצעו היום עמוד " +
          "האסטרטגיה הוחזר תחת Cloud 2608.500 (loio 7a20b724ef914592a8d8a53dd1a655c0) ולא תחת On-Premise. מסמך ה-What's " +
          "New של 2025 FPS01 (help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2025.001/en-US/WN_OP2025_FPS01_EN.pdf, " +
          "Document Version 1.0, 2026-02-25; הורד ב-2026-09-22, HTTP 200, 12,864,449 בתים, 728 עמודים, חולץ לטקסט מלא) " +
          "קובע בסעיף 3.1.3 'OData API: Maintenance Plan': 'With the OData API Maintenance Plan (API_MAINTENANCEPLAN), " +
          "you can now perform the following operations: Release Maintenance Call ... Fix Maintenance Call ...', 'Type " +
          "Changed', 'Scope Item 4HI (Proactive Maintenance) BJ2 (Preventive Maintenance)', 'Technical Object Name API: " +
          "API_MAINTENANCEPLAN', 'Application Component PM-PRM-MP (Maintenance Plans)', 'Availability SAP S/4HANA Cloud " +
          "Private Edition and SAP S/4HANA', 'Valid as Of 2025 FPS01'; ממצא שלילי התחום לאותה קריאה: המחרוזות " +
          "BAPI_MAINT, MPLAN_CREATE ו-BUS2028 אינן מופיעות במסמך (שלוש ההתאמות ל-MPLAN_ הן האובייקטים " +
          "CRMS4_MPLAN_CALL_TYPE_5, CRMS4_MPLAN_SCHEDULING ו-CRMS4_MPLAN_ORDER_PREPARE בפרק השירות), " +
          "ו-API_MAINTENANCEPLAN מופיע פעמיים בסעיף 3.1.3 ופעם נוספת כתחילית של API_MAINTENANCEPLANNINGBUCKET. אף אחד " +
          "מהעמודים והמסמכים האלה אינו נוקב בשם BAPI_MAINTENANCEPLAN_CREATE. (אומת ברשומת " +
          "fm:BAPI_MAINTENANCEPLAN_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance plan | Data Migration (אובייקט ההגירה S4_PM_MAINTENANCE_PLAN, Direct Transfer - ERP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/60a36b24c79d4629b04fa59c409154f5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד אובייקט ההגירה הרשמי 'PM - Maintenance plan' (loio 60a36b24c79d4629b04fa59c409154f5, versionId " +
          "2025.001, תאריך 2026-02-24; אחד משני עמודים באותה כותרת, זה שמקורו מערכת ERP) עובד ב-2026-09-22 בדפדפן (כלי " +
          "browser-use) בכתובת עם version=2025.001, נשמר כ-HTML ונקרא במלואו; המסך מציג Version: 2025 FPS01 (Feb 2026). " +
          "כלשונו: 'This migration object enables you to migrate maintenance plan data from the source ERP system to " +
          "the target system based on the default selection criteria set for the migration object. This migration " +
          "technique transfers data to the target system using Application Programming Interfaces (APIs).' (הנוסח כאן " +
          "הוא APIs, לעומת 'Business Application Programming Interfaces (BAPIs)' בעמוד המקביל 'PM - Equipment'); " +
          "'Related Business Object : Maintenance Plan'; שורת 'Migration Approach' עם הערך 'Direct Transfer - ERP'; " +
          "'This migration object automatically selects relevant maintenance plans from the MPLA table for the derived " +
          "maintenance planning plants' ו-'Deleted maintenance plans are excluded from data selection'. פריטי In Scope " +
          "כסדר הופעתם (ההיררכיה בין הפריטים לא נשמרה בחילוץ הטקסט): 'Time-based maintenance plans', 'Strategy plans', " +
          "'Single-cycle plans', 'Maintenance plan items', 'Long texts for maintenance plans and maintenance plan " +
          "items'; Out of Scope: 'Performance-based maintenance plans', 'Multi-counter plans', 'Strategy plans', " +
          "'Single cycle plans', 'Settlement rules for maintenance plan items', 'Object list items for maintenance plan " +
          "items', 'Individual accounting and location data'. תנאים מוקדמים: 'Define an external number range for " +
          "maintenance items and Provide external numbers in the Maintenance Item mapping task'; אובייקטי ההרשאה במערכת " +
          "היעד I_TCODE ו-I_BEGRP; Technical Information: 'Name of this migration object: S4_PM_MAINTENANCE_PLAN', טבלה " +
          "וירטואלית 'MPLA_TEXT : To store long texts for maintenance plans' ו-'Note that virtual table do not exist in " +
          "the database' [כך במקור]. טבלת 'Transfer Options, Transfer Steps, and Navigation to Configured SAP Fiori " +
          "Apps' (עמודות Transfer Option, Condition to Execute Transfer Option, Transfer Step, Transfer Step " +
          "Description, Condition to Execute Transfer Step, Result Fields in the Target System, SAP Fiori App ID " +
          "Configured for Navigation, Function Module) מכילה שורה אחת: 'Migrate Maintenance Plan' | 'All instances of " +
          "this migration object are relevant to the transfer option.' | 'Create Maintenance Plan' | 'Creates a " +
          "maintenance plan in the target system.' | 'All instances that qualify for this transfer option are relevant " +
          "to the transfer step.' | 'Maintenance Plan' | 'Find Maintenance Plans (app ID F3622)' | 'MPLAN_CREATE'. " +
          "כלומר מודול הפונקציה שהעמוד נוקב בו בעמודת Function Module של צעד יצירת תוכנית האחזקה הוא MPLAN_CREATE. " +
          "אימות לאחר ההעברה: 'Change IP02', 'Display IP03'. ממצא שלילי התחום לקריאה זו: המחרוזות " +
          "BAPI_MAINTENANCEPLAN_CREATE ו-BAPI אינן מופיעות בעמוד כלל, ואין בו סעיף 'APIs/BAPIs Used in " +
          "Migration-Specific Function Modules' כפי שיש בעמוד 'PM - Equipment' (שנוקב שם ב-BAPI_EQUI_CREATE). עמוד האח " +
          "'PM - Maintenance item' (loio dda63730335744e38a4d2ec0129428cc, 2025.001) מציג בתקציר החיפוש באותו מקום " +
          "בטבלה 'Maintenance Item Find Maintenance Items (app ID F3621) MPLAN_ITEM_CREATE', והעמוד השני בכותרת 'PM - " +
          "Maintenance plan' (loio b97c17855d78480ead0cebb32c4a346f, 2025.001) מציג 'Object Alias MAINT_PLAN_3' " +
          "ו-'Migration Approach Staging Table'. (אומת ברשומת fm:BAPI_MAINTENANCEPLAN_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Schedule a Maintenance Plan | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/54f432f2aa6d4e1aa888c3ee04f0e1f7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "גוף עמוד הפעולה (2025 FPS01, loio 54f432f2aa6d4e1aa888c3ee04f0e1f7) נקרא במלואו ב-2026-09-23 דרך שירות התוכן " +
          "של הפורטל (deliverable_id 40374289, buildNo 1779). כלשונו: 'Using this operation, you can schedule a " +
          "maintenance plan of category Maintenance Notification, Maintenance Order and Service Order', בבקשת POST על " +
          "‎/sap/opu/odata/sap/API_MAINTENANCEPLAN/StartMaintPlnSchedule עם הפרמטר MaintenancePlan. העמוד מונה ארבעה " +
          "פרמטרים: SchedulingStartDate (אם לא הועבר, התאריך הנוכחי), SchedulingStartTime (לתוכניות מונים מרובים בלבד), " +
          "MaintPlanStartCntrReadingValue (לתוכניות מבוססות ביצועים, למעט מונים מרובים) ו-MaintPlnSchedgCallObjUpToDte: " +
          "'If not passed, the calls are released based on the period in schedule that the plan was scheduled. If " +
          "passed as a date in future, all calls till that period in time will be released and call objects will be " +
          "created', עם המלצה לא לשחרר קריאות ליותר מארבעה חודשים במחזור חודשי שתקופת התזמון שלו 12 חודשים. לפני ההפעלה " +
          "'It is mandatory to do a read operation on the maintenance plan being scheduled', ויש להעביר את ה-e-tag " +
          "שנוצר בקריאה ככותרת של בקשת ה-POST; התשובה מכילה את נתוני התוכנית שתוזמנה. זו הפעולה המתועדת בשירות ה-OData‏ " +
          "API_MAINTENANCEPLAN לתזמון שיוצר אובייקטי קריאה; העמוד אינו נוקב ב-ISCHED_CALL_GENERATE ואינו מציג את הפעולה " +
          "כיורשת של מודול פונקציה כלשהו. (אומת ברשומת fm:ISCHED_CALL_GENERATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics (הפונקציה העסקית LOG_EAM_CI_4)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "גוף העמוד (2025 FPS01, loio 3346ac67364447a3ba2f4efa65b8c014) נקרא במלואו ב-2026-09-23 דרך שירות התוכן של " +
          "הפורטל (deliverable_id 40374500, buildNo 1779): הפונקציה העסקית LOG_EAM_CI_4, בזמינות 'SAP S/4HANA, " +
          "on-premise edition 1511' וברכיב התוכנה S4CORE 100. תחת הכותרת 'Enhancements to BAPIs for Maintenance Plan " +
          "Scheduling', כלשונו: 'API functions have been developed for the scheduling of maintenance plans. These APIs " +
          "provide the same functions as transaction IP10: the creation of maintenance calls or the changing of " +
          "existing maintenance calls'. תחת 'Change Documents for Maintenance Plan Scheduling' העמוד מונה את פעולות " +
          "התזמון שנרשמות במסמכי שינוי: 'Start/restart/start in cycle', 'Release call', 'Manual call', 'Fix call', " +
          "'Skip call' ו-'Confirm call'. בסעיפים אחרים העמוד נוקב בשמות BAPI_ALM_ORDER_MAINTAIN, " +
          "‏BAPI_ALM_ORDER_GET_DETAIL, ‏BAPI_IE4N_DISMANTLE, ‏BAPI_IE4N_INSTALL ו-MEASUREM_DOCUM_RFC_CANCEL, אך אינו " +
          "נוקב בשם של אף API לתזמון ואינו נוקב ב-MAINTENANCE_PLAN_SCHEDULE. אותו loio במערך SAP ERP 6.0 EHP8 " +
          "(‏6.18.latest, deliverable_id 23795288), שנקרא באותו אופן, מדפיס את אותו משפט, עם 'Available From' של 'SAP " +
          "enhancement package 5 for SAP ERP 6.0' ורכיבי התוכנה SAP_APPL 605 ו-EA-APPL 605. כלומר SAP מתעדת APIs לתזמון " +
          "תוכניות תחזוקה עם הפונקציות של IP10, ב-ECC 6.0 מ-EHP5 וב-S/4HANA מ-1511, בלי לנקוב בשמם; העמוד אינו קובע אם " +
          "MAINTENANCE_PLAN_SCHEDULE הוא אחד מהם. (אומת ברשומת fm:MAINTENANCE_PLAN_SCHEDULE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Schedule Maintenance Plan | Enterprise Services in Logistics (פעולת השירות MaintenancePlanERPScheduleRequestConfirmation_In)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/1dad2180e6f34b75ac77afce5cb5eda1/af23a420aa7f11dd2b8d000f20fcb6a9.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE_FM_23,
        claim:
          "גוף העמוד (2023 Latest, loio af23a420aa7f11dd2b8d000f20fcb6a9) נקרא במלואו ב-2026-09-23 דרך שירות התוכן של " +
          "הפורטל (deliverable_id 39118376, buildNo 4311). הגדרה: 'To schedule a maintenance plan.'; נתונים טכניים: " +
          "Entity Type ‏'Service Operation', Software Component Version ‏'SAP APPL 6.06', Release State ‏'released', " +
          "Technical Name ‏'MaintenancePlanERPScheduleRequestConfirmation_In', Web Service Definition (Back End) " +
          "‏'ECC_MAINTPLNSCHEDRC', Category ‏'A2X', Direction ‏'inbound', Mode ‏'synchronous', Idempotency ‏'yes'. לפי " +
          "העמוד הפעולה משמשת לתזמון ראשון של תוכנית תחזוקה ולתזמון לפי התכנון, ו-'It can also be used to restart the " +
          "scheduling of a maintenance plan'; מצב התזמון נמסר באלמנט MaintenancePlanSchedulingModeCode בארבעה ערכים: 1 " +
          "Initial scheduling, ‏2 Planned scheduling, ‏3 Rescheduling ו-4 Rescheduling in cycle (לתוכניות מונים מרובים " +
          "ולתוכניות אסטרטגיה בלבד). במצב 1 נמסרים מזהה התוכנית (MaintenancePlan ID) ופרמטרי התזמון, תאריך התחלה " +
          "(StartDateTime) או קריאת מונה התחלתית (MeasuringDeviceStartMeasurementReadingMeasure), שלפי העמוד מוזנים רק " +
          "אם הם שונים מאלה שבתוכנית; בשגיאות שאינן קריטיות 'a corresponding error message is returned in the Log node " +
          "of the response message'; סוגי ההודעות הם MaintenancePlanERPScheduleRequest_sync " +
          "ו-MaintenancePlanERPScheduleConfirmation_sync, וה-BAdI ‏EAM_SE_MAINTPLNSCHEDRC זמין לפעולה. הטקסט שחולץ " +
          "מאותו loio במערך SAP ERP 6.0 EHP8 (‏6.18.latest, deliverable_id 23795194) ובגרסת S/4HANA 2025 FPS01 (הכתובת " +
          "עם version=2025.001, deliverable_id 40374672, גרסה ששירות החיפוש אינו מחזיר לשאילתה על הפעולה) זהה תו בתו. " +
          "זה ממשק תזמון סינכרוני משוחרר המתועד גם ב-ECC וגם ב-S/4HANA; העמוד אינו נוקב במודול פונקציה כלשהו ואינו מציג " +
          "את הפעולה כיורשת של MAINTENANCE_PLAN_SCHEDULE. (אומת ברשומת fm:MAINTENANCE_PLAN_SCHEDULE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan | Enterprise Services in Logistics",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/1dad2180e6f34b75ac77afce5cb5eda1/25c0d7d42fa54cda84685ea341e31fc3.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE_TBL15,
        claim:
          "עמוד אובייקט העסק Maintenance Plan במדריך Enterprise Services in Logistics (גרסה 2023 Latest) קובע: " +
          "'Processing The service operations for this business object use the following tables: MPLA MPOS MMPT MHIO " +
          "MHIS'. באותו עמוד: 'Technical Data Entity Type Business Object Software Component Version ESM S/4HANA 606 " +
          "Technical Name MaintenancePlan Object Category Master Data Object' ו-'To be able to use the operations in " +
          "this business object, you must have implemented the Maintenance Planning (PM-PRM-MP) application component'. " +
          "כלומר MHIO נמנית בתיעוד S/4HANA על טבלאות אובייקט העסק MaintenancePlan, ורכיב היישום הוא PM-PRM-MP. (אומת " +
          "ברשומת table:MHIO)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Mass Schedule Maintenance Plans (F2774), SAP Fiori Apps Reference Library, S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2774')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FI_24,
        claim:
          "רשומת הספרייה ל-F2774 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, לא ה-JS " +
          "shell): Published, ApplicationType Transactional, UITechnology 'SAP Fiori: Generic Job Scheduling " +
          "Framework', ApplicationComponent PM-FIO. תפקיד עסקי מוביל SAP_BR_MAINTENANCE_PLANNER (R0088, Maintenance " +
          "Planner). קטלוגים עסקיים SAP_EAM_BC_MPLAN (EAM - Maintenance Plan) ו-SAP_EAM_BC_SHMP_MNG (EAM - Maintenance " +
          "Plans Scheduling); קטלוג טכני SAP_TC_EAM_COMMON. שירות OData יחיד APJ_JOB_MANAGEMENT_SRV (גרסה 0001, " +
          "SAP_BASIS 816). טרנזקציית GUI מובילה IP30, טרנזקציה קשורה IP30H (TransactionCodes). ללא קודמים וללא יורשים " +
          "רשומים. אותם תפקיד, קטלוגים, שירות OData וטרנזקציות GUI חוזרים ברשומת S27OP (2023), עם OData על SAP_BASIS " +
          "758. (אומת ברשומת fiori:F2774)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Maintenance Plans (F5325), SAP Fiori Apps Reference Library, S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5325')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FI_24,
        claim:
          "רשומת הספרייה ל-F5325 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, לא ה-JS " +
          "shell): Published, ApplicationType Transactional, UITechnology 'SAP Fiori elements', ApplicationComponent " +
          "PM-FIO-PRM-MP (Fiori UI for PM Maintenance Plans). תפקיד עסקי מוביל SAP_BR_MAINTENANCE_PLANNER (R0088, " +
          "Maintenance Planner), תפקיד נוסף SAP_BR_MD_SPECIALIST_EAM (R0097-180, Master Data Specialist - Maintenance " +
          "Management). קטלוגים עסקיים SAP_EAM_BC_MPLAN (EAM - Maintenance Plan) ו-SAP_EAM_BC_MP_MNG (EAM - Maintenance " +
          "Planning Management); קטלוג טכני SAP_TC_EAM_COMMON. שלושה שירותי OData: /SSB/SMART_BUSINESS_RUNTIME_SRV, " +
          "C_MAINTPLANACTVSYSTSTATUSQ_CDS, UI_MAINTENANCE_PLAN (כולם גרסה 0001, S4COREOP 109). טרנזקציית GUI מובילה " +
          "IP01, טרנזקציות קשורות IP02, IP03, IP04, IP05, IP06, IP16. קודמים רשומים: F3622 (Find Maintenance Plans), " +
          "F5009 (Find Maintenance Plans - Service), W0026 (Manage Maintenance Plan and Item List) (הספרייה משייכת את " +
          "F3622 ו-F5009 ל-S32PCE ול-S37, ואת W0026 ל-S26OP); ללא יורשים. הספרייה משייכת את היישום לפריטי ההיקף 4HI " +
          "(Proactive Maintenance) ו-BJ2 (Preventive Maintenance). רשומת S27OP (2023) הציגה אותו תפקיד מוביל, אותם " +
          "קטלוגים ואותן טרנזקציות GUI, עם שירות OData יחיד (UI_MAINTENANCE_PLAN על S4COREOP 108), והתפקיד " +
          "SAP_BR_MD_SPECIALIST_EAM אינו מודפס שם. הקודמים F3622, F5009 ו-W0026 אינם ביקום המזהים של הפרויקט ולכן אינם " +
          "ב-xrefs. (אומת ברשומת fiori:F5325)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F2828 'Maintenance Planning Overview' (SAP Fiori elements: Overview Page), release S32OP",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2828')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FI_24,
        claim:
          "רשומת ה-OData הרשמית של ספריית ה-Fiori (scripts/fal-app.mjs, F2828 @ S32OP, S/4HANA 2025 FPS01, " +
          "isPublished='Published', ApplicationComponent PM-FIO): ApplicationType 'Analytical', UITechnology 'SAP Fiori " +
          "elements: Overview Page'. Business Role מוביל (isLeading='X') SAP_BR_MAINTENANCE_PLANNER (RoleID R0088, " +
          "'Maintenance Planner'); Business Role נוסף SAP_BR_MAINT_TECH_OFFICER (RoleID R0308-146, 'Technical Officer - " +
          "Armed Forces'). Business Catalogs: SAP_DFS_BC_MAINTENANCE ('MAINT - Defense Maintenance') ו-SAP_EAM_BC_ORD " +
          "('EAM - Order'); Technical Catalog SAP_TC_EAM_COMMON. Semantic Object/Action: MaintenanceOrder/monitor. " +
          "OData Service נדרש: EAM_ORDER_MONITOR, Version 0001, Namespace ODATA_EAM_ORD_MON, SoftwareComponentName " +
          "S4CORE 109. GUI Transactions (fuzzy record): LeadingTransactionCodes='IW29', TransactionCodes='IW38'. " +
          "Backend RetrofittedSWCBackend 'S4CORE 109 - SP 0001' / ProductVersionOfficialNameBackend 'SAP S/4HANA 2025'; " +
          "UI RetrofittedSWCUI 'UIS4H 109 - SP 0001'. NumberofPredecessors=0, NumberofSuccessors=0 " +
          "(Successors/PredecessorDetails ריקים). RIN Notes: 3493254 (Front-End Server), 3671888 (Back-End Server). " +
          "AppDocumentationLink: " +
          "https://help.sap.com/http.svc/outputlink?product=SAP_S4HANA_ON-PREMISE&version=2025.001&topic=17248e4667fb433a9c3f944000fada3f&state=PRODUCTION. " +
          "Database 'HANA DB exclusive'; ICFNodes: EAM_ORD_MONS1 (ראשי) וצמתים נוספים (isAdditional=1) כגון " +
          "EAM_PO_MONS1 ו-EAM_PROCMTS1; רשימת הגרסאות: S12OP=1809 עד S32OP=2025 FPS01 (On-Premise) ו-S32PCE (Private " +
          "Cloud), וכן S36=2602 ו-S37=2608 (SAP S/4HANA Public Cloud). (אומת ברשומת fiori:F2828)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Schedule Maintenance Plans using Maintenance Plan API | What's New in SAP S/4HANA 2021 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/b49aca3380b5436aa4e5c494fc0fd33d.html?locale=en-US&state=PRODUCTION&version=2021.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio b49aca3380b5436aa4e5c494fc0fd33d, versionId 2021.001) נקרא במלואו ב-2026-09-28 דרך " +
          "scripts/sap-help-body.mjs: 'With the Maintenance Plan API, you can also do the following: Schedule one or " +
          "more maintenance plans Restart the schedule for one or more maintenance plans'; 'With the capability of the " +
          "OData protocol to support batch processing, you can schedule many maintenance plans in a single request'; " +
          "'You can also schedule and release calls for a specific interval within the request. This is useful when you " +
          "create a period job that generates call objects for a specific duration instead of running the job more " +
          "frequently'. פרטים טכניים: Type New, Scope Item 4HI (Proactive Maintenance), BJ2 (Preventive Maintenance), " +
          "4X5 (Recurring Services), Application Component PM-PRM-MP (Maintenance Plans), Valid as Of SAP S/4HANA 2021 " +
          "FPS01. העמוד אינו נוקב בשם מודול פונקציה או BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Plan | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/880c79762567475fa24fdd9a0c41f500.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 880c79762567475fa24fdd9a0c41f500, versionId 2025.001) נקרא במלואו ב-2026-09-28: 'With the " +
          "OData API Maintenance Plan (API_MAINTENANCEPLAN), you can now perform the following operations: Release " +
          "Maintenance Call: Using this operation, you can release a maintenance call in an already scheduled " +
          "maintenance plan of category maintenance notification, maintenance order and service order. Fix Maintenance " +
          "Call: Using this operation, you can fix a maintenance call in an already scheduled maintenance plan ...'. " +
          "פרטים טכניים: Type Changed, Scope Item 4HI (Proactive Maintenance) BJ2 (Preventive Maintenance), Technical " +
          "Object Name API: API_MAINTENANCEPLAN, Application Component PM-PRM-MP, Availability SAP S/4HANA Cloud " +
          "Private Edition and SAP S/4HANA, Valid as Of 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Call Object | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/59b11c027e3845fe909262e105d7fb40.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 59b11c027e3845fe909262e105d7fb40, versionId 2025.001) נקרא במלואו ב-2026-09-28: 'This entity " +
          "allows to query for the call objects that are created for all the maintenance plans in the tenant', " +
          "'Technical name: MaintenancePlanCallObject', עם המאפיינים MaintenancePlan, MaintenancePlanCallNumber, " +
          "MaintenanceItem, MaintenanceOrder (כאשר סוג אובייקט הקריאה הוא פקודת תחזוקה), MaintenanceNotification (כאשר " +
          "הוא הודעת תחזוקה), MaintCallHorizonIsNotReached ('Indicates that the call horizon is not reached (hence " +
          "there is no call object yet)'), SchedulingStatus, PlannedStartDate ו-ReleasedByUserName, כולם Read Only.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Events | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/224baa289ef94933923eb97e211886a3.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 224baa289ef94933923eb97e211886a3, versionId 2023.latest) נקרא במלואו ב-2026-09-28: 'The " +
          "Maintenance Plan business object triggers the following events': MaintenancePlan.Created, " +
          "MaintenancePlan.Changed, MaintenancePlan.ScheduleStarted ('raised when the schedule of a maintenance plan is " +
          "started') ו-MaintenancePlan.ScheduleRestarted; המטען הוא MaintenancePlan (מזהה התוכנית), ובשני אירועי התזמון " +
          "גם MaintenancePlanCategory; 'Business events are published on the SAP Business Accelerator Hub'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Events | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/c5947fe058114800b85b8bb76c591cd8.html?locale=en-US&state=PRODUCTION&version=2023.003",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio c5947fe058114800b85b8bb76c591cd8, versionId 2023.003) נקרא במלואו ב-2026-09-28: 'The " +
          "MaintenancePlan business object now triggers the following events: MaintenancePlan.ScheduleStarted ... " +
          "MaintenancePlan.ScheduleRestarted'; Type New, Scope Item 4HI (Proactive Maintenance) BJ2 (Preventive " +
          "Maintenance), Application Component PM-PRM-MP (Maintenance Plans), Availability SAP S/4HANA and SAP S/4HANA " +
          "Cloud Private Edition, Valid as Of 2023 FPS03, 'This event is available on the SAP Business Accelerator " +
          "Hub'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Scheduling Overview | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/2a63f2a0afc24eef88a9b8f86027dc6a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 2a63f2a0afc24eef88a9b8f86027dc6a, versionId 2025.001) נקרא במלואו ב-2026-09-28: 'App ID: " +
          "W0192 With this app, you can view maintenance plan scheduling details based on the defined selection " +
          "criteria'; בין היכולות: 'View maintenance calls that are planned for the future and for which call objects " +
          "are yet to be generated through maintenance plans', 'Analyze the details against a fixed set of measures " +
          "against the call object status such as scheduled calls, calls on hold, calls that are locked, released, or " +
          "completed', 'Use dimensions and measures to display information in your reports' ו-'Export variants as tiles " +
          "on the SAP Fiori Launchpad'; 'This app uses the Maintenance Plan Scheduling - Query ( " +
          "C_MaintPlanSchedgOvwQuery ) CDS view'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Maintenance Plan Scheduling Overview (W0192), SAP Fiori Apps Reference Library, S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('W0192')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "רשומת הספרייה ל-W0192 על S32OP, שנקראה ב-2026-09-28 דרך scripts/fal-app.mjs: 'Maintenance Plan Scheduling " +
          "Overview', Web Dynpro, Published, רכיב PM-FIO-PRM-MP; תפקיד SAP_BR_MAINTENANCE_PLANNER (R0088, Maintenance " +
          "Planner); קטלוגים עסקיים SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_MP_MNG; קטלוג טכני SAP_TC_EAM_BE_APPS; intent " +
          "MaintenancePlan-analyzeMPSchedgOvw; ללא שירות OData וללא טרנזקציות GUI מודפסים; גרסאות מ-S27OP (2023) עד " +
          "S32OP (2025 FPS01), וגם S36 (2602) ו-S37 (2608). המזהה W0192 אינו בקטלוג ה-Fiori של הפרויקט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Scheduling - Query | Virtual Data Model and CDS Views",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/f6b4b3ea661d416aa6256d04b9580f0a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio f6b4b3ea661d416aa6256d04b9580f0a, versionId 2023.latest) נקרא במלואו ב-2026-09-28: 'CDS View " +
          "Name C_MaintPlanSchedgOvwQuery', 'Analytical Data Category Query', DataSource 2CCMPSCHDOVWQRY, אובייקטים " +
          "קשורים MaintenancePlan, MaintenanceItem, Equipment, FunctionalLocation, MaintenanceNotification " +
          "ו-MaintenanceOrder. השאלות העסקיות כוללות: 'How can you find the number of calls that are expected to be " +
          "generated in future based on the scheduling period that you have maintained?', 'Is there a way to find the " +
          "variance between the planned date and the completion date for a list of maintenance plans?', 'Can you find " +
          "the total count of maintenance calls based upon their status (on hold, skipped, fixed, and so on)?' ו-'How " +
          "many maintenance calls have been generated?'. בטבלת השדות MaintenancePlanCallNumber " +
          "ו-MaintenancePlanCallStatus מסומנים Measure; הרשאות: הגבלות תצוגה ל-IP03, IP16, IP24, IP06 ו-IP18 ואובייקט " +
          "ההרשאה I_BEGRP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Planning Overview | What's New in SAP S/4HANA 1809",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/1ee3b37c9ff64c3aa4c523de5987470f.html?locale=en-US&state=PRODUCTION&version=1809.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1809.000",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 1ee3b37c9ff64c3aa4c523de5987470f, versionId 1809.000) נקרא במלואו ב-2026-09-28: 'the system " +
          "analyzes critical factors in a chosen reference period, such as, for example, open or outstanding " +
          "maintenance notifications that have not yet been assigned, missing spare parts or overdue orders. Different " +
          "cards display the results in figures and colored charts'; ובפרטים הנוספים: 'which maintenance orders have " +
          "not yet been released, which spare parts will possibly not be able to be procured and made available on " +
          "time, or which maintenance orders have not yet been finally confirmed although the end date has already " +
          "passed'; Availability SAP S/4HANA 1809, תפקיד Maintenance Planner. העמוד אינו מייחד מדד לתוכניות תחזוקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitoring Key Figures for Your Work Centers | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/64df14c7f7534e5eb7801ea58636a621.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 64df14c7f7534e5eb7801ea58636a621, versionId 2025.001) נקרא במלואו ב-2026-09-28: 'The " +
          "Resource Scheduling for Maintenance Planners app is your dashboard for monitoring key figures'; הכרטיסים: " +
          "Due Maintenance Orders by Priority (פקודות שמועדן ב-4 השבועות הבאים ועדיפותן), Work Center Utilization " +
          "(ניצולת לשבוע הנוכחי ולבא; 'If a work center has no capacity at all in the display time period but has " +
          "maintenance order operations or maintenance plans that require capacity, the card shows a utilization of " +
          "999%'), Unconfirmed Maintenance Orders (פקודות עם לפחות פעולה אחת לא מאושרת שמועד סיומה המתוכנן ב-6 החודשים " +
          "האחרונים), My Schedules ו-Unassigned Work.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) לשדה bapis של IP01, IP10 ו-IP30, ורשומת האימות tx:IP30",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רשומות TX_INTEL מונות בשדה bapis את BAPI_MAINTENANCEPLAN_CREATE ו-BAPI_MAINTENANCEPLAN_GETLIST ל-IP01, ואת " +
          "BAPI_MAINTENANCEPLAN_SCHEDULE ל-IP10 ול-IP30, ללא מקור; רשומת האימות tx:IP30 קובעת בהערותיה " +
          "ש-'BAPI_MAINTENANCEPLAN_SCHEDULE שברשומת tx-intel עדיין לא נמצא במקור רשמי ואינו ביקום המאגר'. שני השמות " +
          "GETLIST ו-SCHEDULE אינם במילון הפרויקט.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP10; data/tx-intel.ts#IP01; data/tx-intel.ts#IP30; data/verification/transactions.ts#tx:IP30",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום pm-maintenance-planning (DOMAIN_DETAIL, שדה funcs) ורשומות האימות של מודולי הפונקציה שהוא מונה",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "שדה funcs של התחום pm-maintenance-planning מונה את BAPI_MAINTENANCEPLAN_CREATE, MAINTENANCE_PLAN_SCHEDULE, " +
          "ISCHED_CALL_GENERATE, MAINTENANCE_ITEM_READ ו-SCHEDULING_HISTORY_READ. רשומות האימות של ארבעת מודולי " +
          "הפונקציה הפנימיים מתעדות חיפושים רשמיים שלא החזירו רשומה הנוקבת בשמותיהם ומשאירות אותם " +
          "verification_required; רשומת האימות fm:BAPI_MAINTENANCEPLAN_CREATE מסומנת verification_required עם שכבות " +
          "מאגר סותרות, ומתעדת בסטטוס שלה כערוצים רשמיים ליצירת תוכנית את שירות ה-OData‏ API_MAINTENANCEPLAN ואת פעולת " +
          "השירות 'Create Maintenance Plan' (MaintenancePlanERPCreateRequestConfirmation_In, Release State released, " +
          "SAP APPL 6.06).",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-maintenance-planning (funcs); data/verification/functions.ts#fm:BAPI_MAINTENANCEPLAN_CREATE; data/verification/functions.ts#fm:MAINTENANCE_PLAN_SCHEDULE; data/verification/functions.ts#fm:ISCHED_CALL_GENERATE; data/verification/functions.ts#fm:MAINTENANCE_ITEM_READ; data/verification/functions.ts#fm:SCHEDULING_HISTORY_READ",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של תצוגת ה-CDS I_MaintenancePlan (data/verification/cds.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הרשומה נושאת status verification_required. שורת הסטטוס שלה קובעת שהתיעוד הרשמי (What's New 2021 FPS01) מציין " +
          "ש-I_MaintenancePlan הוצאה משימוש (deprecated) ושהיורשת היא I_MaintenancePlanBasic (Status Released לפי עמוד " +
          "ה-VDM של 2023 Latest), ושתצוגת I_MaintenancePlanBasic אינה רשומה עדיין ביקום המזהים של הפרויקט, ולכן הרשומה " +
          "אינה קובעת status deprecated עם יורש. שורת ה-PDF שבה מצטטת: 'These CDS views are no longer available by " +
          "default and will be deleted as of SAP S/4HANA 2023 release'.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/cds.ts#cds:I_MaintenancePlan",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך: השדות שנכתבו ב-2026-09-22 נגזרו מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:IP30, " +
      "tx:IP30H ו-fm:BAPI_MAINTENANCEPLAN_CREATE; שדות interfaces ו-kpis נגזרו ב-2026-09-28 מעמודים רשמיים שגופם " +
      "נקרא. (2026-09-22, Old) שדה ה-KPI הושמט: המאגר אינו מתעד מדד מספרי לתהליך התחזוקה המונעת, ולכן הפער מוצג " +
      "בשמו במקום להתמלא. השם BAPI_MAINTENANCEPLAN_CREATE מוצג כשם לאימות ולא כממשק משוחרר: רשומת האימות מתעדת ששתי " +
      "שכבות מאגר קובעות שאינו קיים ומפנות ל-MPLAN_CREATE, שארבע שכבות מציגות אותו כקיים, ושאף עמוד SAP רשמי שנסרק " +
      "אינו נוקב בו. טבלאות T351 ו-T351P אינן במילון הפרויקט ולכן נשארות בפרוזה. (2026-09-22, Old) מזהי ה-Fiori " +
      "F2774 ו-F5325, שהתיעוד הרשמי מצמיד לתזמון ולניהול תוכניות, אינם בקטלוג הפרויקט ואינם מקושרים. לא בוצעה בדיקה " +
      "במערכת SAP חיה. השלמה 2026-09-28 (שדות interfaces ו-kpis בלבד; שאר השדות הועתקו כלשונם): Old → New לשדה " +
      "ה-KPI: ב-2026-09-22 הושמט כי המאגר אינו מתעד מדד; כעת הוא מתמלא ממקורות SAP רשמיים בלבד, יישום W0192 ותצוגת " +
      "ה-CDS שלו, F2828 ו-Resource Scheduling for Maintenance Planners, בלי מדד ניהולי כללי שאין רשומה המדפיסה " +
      "אותו. F2774 ו-F5325 נוספו לקטלוג ה-Fiori של הפרויקט ב-2026-09-22 ומקושרים כעת בשורת ה-interfaces; שורת " +
      "process.transactions[4] עודכנה בהתאם; המשפט הישן נשמר כאן כהיסטוריה. IDoc לתוכנית תחזוקה לא תועד: חיפוש " +
      "'maintenance plan IDoc message type' (SAP_S4HANA_ON-PREMISE, 21 רשומות) לא החזיר IDoc לתוכניות, והרשומה " +
      "היחידה בנושא היא פעולת השירות הסינכרונית Schedule Maintenance Plan. BAPI_MAINTENANCEPLAN_GETLIST " +
      "ו-BAPI_MAINTENANCEPLAN_SCHEDULE: חיפוש השם המדויק החזיר 3 רשומות כל אחד בסקופ On-Premise ו-20 ל-SCHEDULE " +
      "בסקופ SAP_ERP, אף אחת אינה נוקבת בשם; זה ממצא שלילי תחום חיפוש ולא הוכחת היעדר. הערכים שפריטי What's New " +
      "מדפיסים לפריטי ההיקף (4HI, BJ2, 4X5) נרשמים בראיות בלבד; שדה ה-reference לא שונה. גופי העמודים החדשים נקראו " +
      "דרך scripts/sap-help-body.mjs ב-2026-09-28. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ===================================================== technical objects */
  {
    slug: "technical-objects-process",
    he: "אובייקטים טכניים: מיקומים פונקציונליים וציוד, יצירה, היררכיה, התקנה ופירוק, וסיווג",
    en: "Technical objects process: functional locations and equipment, creation, hierarchy, installation and dismantling, classification",
    module: "PM",
    summary:
      "האובייקטים הטכניים הם שלד נתוני האב של התחזוקה: המיקום הפונקציונלי מתאר היכן מתבצעת העבודה, הציוד מתאר את " +
      "הנכס הנייד הניתן למעקב, וההתקנה והפירוק בין השניים בונים את היסטוריית השימוש שממנה נגזרים העלות, " +
      "ההיסטוריה והמדדים.",
    context:
      "לפי רשומות המאגר המיקום הפונקציונלי נשמר ב-IFLOT (עם IFLOS לתיוג חלופי) והציוד ב-EQUI עם טקסט ב-EQKT, " +
      "פלחי זמן ב-EQUZ ואובייקט סידורי ב-OBJK; טבלת ILOA משותפת לשניהם ונושאת את מפעל התחזוקה ואת מרכז העלות, " +
      "והציוד המותקן יורש אותה מהמיקום. מחוון המבנה קובע את פורמט המזהה ההיררכי, וקטגוריית הציוד קובעת הקצאת " +
      "מספרים, פריסה, פרופיל סטטוס ויכולת התקנה. ב-S/4HANA מודל הנתונים נשמר: נושא המעבר של המאגר קובע מבנה זהה " +
      "ברובו בתוספת תצוגות CDS ויישומי Fiori, ושכבת ההשפעה מונה את EQUI, EQKT, EQUZ, IFLOT, IFLOS, ILOA ו-OBJK " +
      "בין הטבלאות היציבות.",
    steps: [
      {
        he: "לתכנן מראש את מחוון המבנה ואת מסכת העריכה של המיקומים: לפי רשומת נתוני האב, מזהים היררכיים שנקבעו בלי תכנון אינם עקביים והשינוי אינו הפיך. טרנזקציות ה-Customizing OIPK ו-OIPM אינן במילון הפרויקט.",
      },
      {
        he: "ליצור מיקומים פונקציונליים ולבנות את ההיררכיה: הזנה בודדת או קיבוצית, ושיוך עליון לכל רמה. התיעוד הרשמי מונה את IL01 ליצירה, IL02 לשינוי ו-IL03 לתצוגה.",
        xrefs: ["tx:IL01", "tx:IL02", "tx:IL03", "table:IFLOT", "table:IFLOS"],
      },
      {
        he: "לתחזק את נתוני המיקום והחשבונאות (ILOA): מפעל תחזוקה, קבוצת מתכננים ומרכז עלות. מרכז עלות שגוי כאן מחייב את פקודות התחזוקה ליעד לא נכון, וגם הציוד המותקן יורש אותו.",
        xrefs: ["table:ILOA", "tx:IL02"],
      },
      {
        he: "ליצור ציוד עם קטגוריה מתאימה, ובמידת הצורך עם מספר סידורי ופרופיל סידורי: התיעוד הרשמי מונה את IE01 ליצירה ואת IE02 ו-IE03 לשינוי ולתצוגה.",
        xrefs: ["tx:IE01", "tx:IE02", "tx:IE03", "tx:IQ01", "table:EQUI", "table:EQKT", "table:OBJK"],
      },
      {
        he: "להתקין את הציוד במיקום פונקציונלי או בציוד על, ולפרק לפני התקנה חוזרת: כל שינוי יוצר פלח זמן חדש. התיעוד הרשמי מתאר יצירה אוטומטית של פלח זמן חדש לתיאור תקופת השימוש, בהתאם להגדרות ה-Customizing.",
        xrefs: ["tx:IE4N", "tx:IE02", "table:EQUZ", "table:ILOA"],
      },
      {
        he: "לסווג את האובייקטים לפי מאפיינים: הסיווג הוא הבסיס לקביעת היתרים אוטומטית ולחיפוש לפי תכונות טכניות.",
        xrefs: ["tx:CL02", "tx:CL20N", "tx:CT04"],
      },
      {
        he: "להקים נקודות מדידה ומונים על האובייקט ולרשום קריאות: הן מזינות תחזוקה מבוססת מצב ותוכניות מבוססות ביצועים.",
        xrefs: ["tx:IK01", "tx:IK11", "table:IMPTT", "table:IMRG", "bp:preventive-maintenance-process"],
      },
      {
        he: "לסקור את המבנה: IH01 לתצוגת המבנה, IH06 ו-IH08 לרשימות המיקומים והציוד.",
        xrefs: ["tx:IH01", "tx:IH06", "tx:IH08"],
      },
      {
        he: "להשתמש באובייקט כאובייקט ייחוס בהודעה ובפקודה: משם נבנית היסטוריית התחזוקה ומשם יורשים המיקום ומרכז העלות.",
        xrefs: ["obj:maintenance-order", "obj:maintenance-notification", "bp:maintenance-order-process"],
      },
      {
        he: "בעיבוד תוכניתי: BAPI_EQUI_CREATE ו-BAPI_FUNCLOC_CREATE ליצירה, BAPI_EQUI_INSTALL להתקנה, וכולם עם BAPI_TRANSACTION_COMMIT ובדיקת RETURN. רשימת הפישוט של 2025 FPS01 ממליצה להעדיף ממשקי API על פני Batch Input ליצירת נתוני תחזוקה ולשינויים.",
        xrefs: ["fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_EQUI_INSTALL", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
      },
      {
        he: "לקריאה ולאינטגרציה ב-S/4HANA: תצוגות ה-CDS של הציוד והמיקום, ולפי רשומות האימות גם שירותי ה-OData של הציוד ושל המיקום הפונקציונלי, כולל פעולות התקנה ופירוק.",
        xrefs: ["cds:I_Equipment", "cds:I_FunctionalLocation", "cds:I_EquipmentTimeSegment", "fm:BAPI_EQUI_GETDETAIL", "fm:BAPI_FUNCLOC_GETDETAIL"],
      },
    ],
    antiPatterns: [
      "מחוון מבנה ומסכת עריכה שלא תוכננו מראש: המזהים ההיררכיים אינם עקביים והתיקון אינו הפיך (רשומת נתוני האב של המיקום הפונקציונלי).",
      "התקנה בלי פירוק קודם או בתאריך המוקדם מהפירוק: פלחי הזמן חופפים והציוד מופיע מותקן בשני מקומות (תקרית equipment-install-history-wrong).",
      "מרכז עלות שגוי ב-ILOA: פקודות התחזוקה מחויבות ליעד לא נכון, כולל הציוד היורש (תקרית equipment-cost-center).",
      "פרופיל מספר סידורי שאינו יוצר ציוד: הסריאל והציוד אינם מסונכרנים וההיסטוריה מתפצלת (תקרית equipment-serial-sync).",
      "מיקום שנשאר לא פעיל או בסטטוס חוסם אחרי שדרוג: לא ניתן לפתוח עליו הודעה או פקודה (תקרית funcloc-status-block).",
      "הישענות על Batch Input ליצירת אובייקטים טכניים, בניגוד להמלצת רשימת הפישוט להשתמש בממשקי ה-API.",
    ],
    checks: [
      "חיובי: היררכיית מיקומים בת שלוש רמות עם ציוד מותקן, והציוד יורש את ILOA מהמיקום.",
      "שלילי: מזהה מיקום שאינו תואם את מחוון המבנה נדחה.",
      "אינטגרציה: פתיחת הודעה על המיקום מעבירה לפקודה את אובייקט הייחוס ואת מרכז העלות.",
      "רגרסיה: פירוק סוגר את פלח הזמן ב-EQUZ, ורשימת השימוש אינה מציגה חפיפה או פער.",
      "ברצף BAPI: מספר הציוד נוצר רק אחרי COMMIT, והרשומה קיימת ב-EQUI ובפלח הזמן ב-EQUZ.",
    ],
    process: {
      purpose:
        "לבנות ולתחזק את שלד נתוני האב של התחזוקה: מבנה מיקומים היררכי קבוע, ציוד נייד הניתן למעקב, והקשר " +
        "המתועד ביניהם לאורך זמן, כדי שכל הודעה, פקודה, עלות ומדד יתלו באובייקט הנכון.",
      trigger: [
        { he: "הקמת מפעל או קו חדש, או מיפוי מבנה קיים, לפי רשומת נתוני האב של המיקום הפונקציונלי.", xrefs: ["tx:IL01"] },
        { he: "קבלת נכס חדש, שיפוץ, או פירוק והחלפת ציוד, לפי רשומת נתוני האב של הציוד.", xrefs: ["tx:IE01", "tx:IE4N"] },
        { he: "צורך בניטור מצב או בתוכנית מבוססת ביצועים, המחייב נקודת מדידה על האובייקט.", xrefs: ["tx:IK01"] },
      ],
      preconditions: [
        { he: "מחוון מבנה ומסכת עריכה מוגדרים, וקטגוריות מיקום וציוד מוגדרות ב-Customizing." },
        { he: "פרופיל מספר סידורי מוגדר כאשר נדרש מעקב סידורי, כולל יצירת ציוד אוטומטית.", xrefs: ["tx:IQ01"] },
        { he: "מרכז עלות ומפעל תחזוקה קיימים ובתוקף לשיוך ב-ILOA.", xrefs: ["table:ILOA"] },
        { he: "מאפיינים ומחלקות סיווג קיימים כאשר נדרשת קביעת היתרים או חיפוש לפי תכונות.", xrefs: ["tx:CT04", "tx:CL02"] },
      ],
      masterData: [
        { he: "מיקום פונקציונלי: מחוון מבנה, קטגוריית מיקום, תיוג חלופי ונתוני ILOA.", xrefs: ["table:IFLOT", "table:IFLOS", "table:ILOA"] },
        { he: "ציוד: קטגוריית ציוד, קבוצת אובייקט, טקסט, פלחי זמן ואובייקט סידורי.", xrefs: ["table:EQUI", "table:EQKT", "table:EQUZ", "table:OBJK"] },
        { he: "מספר סידורי ופרופיל סידורי, וחומר החלף המקושר אליו.", xrefs: ["table:MARA", "table:EQST"] },
        { he: "נקודות מדידה ומונים עם מאפיין וגבולות.", xrefs: ["table:IMPTT", "table:IMRG"] },
        { he: "סיווג: מחלקות ומאפיינים, המשמשים גם לקביעת היתרים אוטומטית לפקודה.", xrefs: ["tx:CL02", "tx:CT04"] },
      ],
      roles: [
        { he: "צוות אב נתונים או רכז תחזוקה: הבעלים של יצירת המיקומים והציוד, לפי רשומות נתוני האב של המאגר.", xrefs: ["tx:IL01", "tx:IE01"] },
        { he: "יועץ PM פונקציונלי: הבעלים של מחוון המבנה, קטגוריית המיקום, קטגוריית הציוד והתיוג החלופי." },
        { he: "מהנדס תחזוקה או רכז אמינות: הקמת נקודות המדידה; הקריאות נרשמות בידי מפעילים או אוטומטית מממשק.", xrefs: ["tx:IK01", "tx:IK11"] },
      ],
      transactions: [
        { he: "IL01, IL02 ו-IL03 למיקום פונקציונלי; IL05 לעיבוד רשימתי.", xrefs: ["tx:IL01", "tx:IL02", "tx:IL03", "tx:IL05"] },
        { he: "IE01, IE02 ו-IE03 לציוד; IE4N להתקנה ולפירוק; IQ01 ו-IQ03 למספרים סידוריים.", xrefs: ["tx:IE01", "tx:IE02", "tx:IE03", "tx:IE4N", "tx:IQ01", "tx:IQ03"] },
        { he: "IH01 לתצוגת המבנה, IH06 לרשימת מיקומים, IH08 לרשימת ציוד.", xrefs: ["tx:IH01", "tx:IH06", "tx:IH08"] },
        { he: "IK01 ו-IK11 לנקודות מדידה ולקריאות; CL02, CL20N ו-CT04 לסיווג ולמאפיינים.", xrefs: ["tx:IK01", "tx:IK11", "tx:CL02", "tx:CL20N", "tx:CT04"] },
        { he: "Fiori בקטלוג הפרויקט: Manage Technical Objects. רשומת האימות מסמנת את המזהה F2730A כסתירת מקורות: הוא לא נמצא באף מקור רשמי, והיישומים שהתיעוד הרשמי מונה לאובייקטים טכניים הם Find Technical Object (F2072), ‏Process Technical Object (W0029), ‏Display Technical Object (W0028) ו-Manage Technical Object Structures (F8669); ארבעתם נוספו לקטלוג הפרויקט ב-2026-09-24.", xrefs: ["fiori:F2730A", "fiori:F2072", "fiori:W0029", "fiori:W0028", "fiori:F8669"] },
      ],
      tables: [
        { he: "IFLOT כותרת המיקום, IFLOS מבנה ותיוג חלופי, ILOA נתוני מיקום וחשבונאות.", xrefs: ["table:IFLOT", "table:IFLOS", "table:ILOA"] },
        { he: "EQUI כותרת הציוד, EQKT טקסט, EQUZ פלחי זמן, OBJK אובייקט סידורי, EQST קישור סידורי לפי הבלופרינט.", xrefs: ["table:EQUI", "table:EQKT", "table:EQUZ", "table:OBJK", "table:EQST"] },
        { he: "IMPTT נקודות מדידה, IMRG מסמכי קריאה.", xrefs: ["table:IMPTT", "table:IMRG"] },
        { he: "תצוגות ה-CDS של הציוד, של פלח הזמן ושל המיקום הפונקציונלי.", xrefs: ["cds:I_Equipment", "cds:I_EquipmentTimeSegment", "cds:I_FunctionalLocation"] },
      ],
      integrationPoints: [
        { he: "אובייקט טכני אל הודעה ואל פקודה: הוא אובייקט הייחוס, וממנו יורשים המיקום ומרכז העלות.", xrefs: ["obj:maintenance-notification", "obj:maintenance-order", "table:AFIH"] },
        { he: "אובייקט טכני אל תוכנית תחזוקה: הוא אובייקט פריט התוכנית, ונקודות המדידה שלו מזינות תזמון מבוסס ביצועים.", xrefs: ["obj:maintenance-plan", "table:MPOS", "bp:preventive-maintenance-process"] },
        { he: "אובייקט טכני אל MM: מספר סידורי וחומר חלף, ועץ מוצר של הציוד לרכיבי הפקודה.", xrefs: ["table:MARA", "table:MAST"] },
        { he: "אובייקט טכני אל CO: ILOA נושא את מרכז העלות שאליו מתחשבנות הפקודות.", xrefs: ["table:ILOA", "table:COBRB"] },
        { he: "הרחבות: Customer Exits‏ ITOB0001 להתאמת אובייקט טכני ו-IEQM0001 למסך נוסף לציוד, ו-BAdI‏ BADI_EAM_TOB.", xrefs: ["enh:exit:ITOB0001", "enh:exit:IEQM0001", "enh:badi:BADI_EAM_TOB"] },
        { he: "ממשק תוכניתי: BAPI_EQUI_CREATE, BAPI_EQUI_CHANGE, BAPI_EQUI_INSTALL, BAPI_FUNCLOC_CREATE ו-BAPI_FUNCLOC_CHANGE; ב-S/4HANA קיימים לצדם שירותי OData לציוד ולמיקום הפונקציונלי, כולל פעולות התקנה ופירוק.", xrefs: ["fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE", "fm:BAPI_EQUI_INSTALL", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_FUNCLOC_CHANGE"] },
      ],
      interfaces: [
        { he: "ECC ו-S/4HANA, לפי רישום ה-BAPI המועשר של המאגר: BAPI_EQUI_CREATE (מקבילת IE01; ייבוא DATA_GENERAL, ‏DATA_SPECIFIC, ‏DATA_INSTALL ו-EXTERNAL_NUMBER, ייצוא EQUIPMENT וטבלת RETURN), ‏BAPI_EQUI_CHANGE (מקבילת IE02, עם מבני X לשדות המעודכנים) ו-BAPI_EQUI_GETDETAIL (קריאה בלבד, מקבילת IE03), כולם על אובייקט ה-BOR‏ EquipmentPM; פעולות הכתיבה דורשות BAPI_TRANSACTION_COMMIT ובדיקת RETURN. ב-S/4HANA 2025 FPS01 הפריט 'S4TWL - Batch Input for Enterprise Asset Management (EAM)' מונה את BAPI_EQUI_CREATE ואת BAPI_EQUI_CHANGE בין ה-APIs המומלצים במקום Batch Input, ולפי רשומת האימות fm:BAPI_EQUI_CREATE גם אובייקט ההגירה PM - Equipment נוקב ב-BAPI_EQUI_CREATE.", xrefs: ["obj:equipment", "fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE", "fm:BAPI_EQUI_GETDETAIL", "fm:BAPI_TRANSACTION_COMMIT", "tx:IE01", "tx:IE02", "tx:IE03", "bp:bapi-commit-discipline"] },
        { he: "ECC ו-S/4HANA, לפי רישום ה-BAPI המועשר: BAPI_FUNCLOC_CREATE (מקבילת IL01, אובייקט BOR‏ FunctLocation, טבלאות IFLOT, ‏IFLOTX ו-ILOA, אובייקטי הרשאה I_ILOA ו-I_TL), ‏BAPI_FUNCLOC_CHANGE (מקבילת IL02) ו-BAPI_FUNCLOC_GETDETAIL (קריאה בלבד, מקבילת IL03); הכתיבה דורשת BAPI_TRANSACTION_COMMIT. ב-S/4HANA 2025 FPS01 פריט What's New מציג את ה-BAdI החדש BADI_ASM_MD_FUNCLOC לוולידציות מותאמות ביצירה ובעדכון של מיקום פונקציונלי דרך BAPI_FUNCLOC_CREATE ו-BAPI_FUNCLOC_CHANGE; לפי רשומת האימות fm:BAPI_FUNCLOC_CREATE אותה רשימה כוללת גם את IL01, ‏IL02, ‏Process Technical Object ‏(W0029) ו-API_FUNCTIONALLOCATION.", xrefs: ["obj:functional-location", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_FUNCLOC_CHANGE", "fm:BAPI_FUNCLOC_GETDETAIL", "fm:BAPI_TRANSACTION_COMMIT", "tx:IL01", "tx:IL02", "tx:IL03", "fiori:W0029"] },
        { he: "התקנה ופירוק, לפי המאגר: BAPI_EQUI_INSTALL הוא BAPI שינוי להתקנת ציוד במיקום פונקציונלי או בציוד עליון (ייבוא EQUIPMENT ויעד ההתקנה, טבלת RETURN, זוג עם BAPI_EQUI_DISMANTLE, טבלאות EQUZ ו-ILOA, ‏COMMIT נדרש), ורישום ההעשרה מסמן את השם BAPI_EQMT_INSTALL כשם לא תקני. לפי רשומות האימות אף מקור רשמי שנבדק אינו נוקב ב-BAPI_EQUI_INSTALL, ב-BAPI_EQUI_DISMANTLE (שאינו במילון הפרויקט) או ב-BAPI_EQMT_INSTALL, והמאגר חלוק על השם האחרון; EQUIPMENT_DISMANTLE מתואר במאגר כמודול פנימי שאינו RFC. לכן לא לבנות ממשק על שמות אלה לפני בדיקה ב-SE37 במערכת היעד.", xrefs: ["fm:BAPI_EQUI_INSTALL", "fm:BAPI_EQMT_INSTALL", "fm:EQUIPMENT_DISMANTLE", "tx:IE4N", "table:EQUZ", "table:ILOA", "tx:SE37"] },
        { he: "S/4HANA (On-Premise 2025 FPS01): שירות ה-OData‏ API_EQUIPMENT מתועד לקריאה, ליצירה ולעדכון של נתוני אב ציוד, ליצירה המונית, להתקנה ולפירוק בלי העברת נתונים ולצירוף מסמכים, עם deep entity ב-POST ועיבוד BATCH; עמוד הפעולות מונה גם יצירה ועדכון של נתוני סיווג (EquipmentClassification) ויצירת טקסט ארוך, ובכל פעולת שינוי נדרשת כותרת If-Match. ה-Function Imports‏ InstallEquipment ו-DismantleEquipment (האחרון מתועד ב-2023 Latest, לצד גרסה עם העברת נתונים) משרתים את ההתקנה ואת הפירוק. אף עמוד אינו נוקב בשם BAPI ואינו מציג את השירות כמחליף שלו.", xrefs: ["obj:equipment", "fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE", "fm:BAPI_EQUI_INSTALL", "fm:EQUIPMENT_DISMANTLE"] },
        { he: "S/4HANA (On-Premise 2025 FPS01): שירות ה-OData‏ API_FUNCTIONALLOCATION מתועד לקריאה, ליצירה, לעדכון ולמחיקה של נתוני אב מיקום פונקציונלי (יצירה ב-POST על הישות FunctionalLocation), וניתן להרחבה דרך Custom Fields and Logic בהקשר העסקי Functional Location; הרשומות אינן מציגות אותו כמחליף של BAPI_FUNCLOC_CREATE.", xrefs: ["obj:functional-location", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_FUNCLOC_CHANGE"] },
        { he: "סיווג: לפי המאגר BAPI_OBJCL_CREATE משייך אובייקט למחלקת סיווג וממלא ערכי מאפיינים (קלט OBJECTKEY, ‏OBJECTTABLE, ‏CLASSNUM, ‏CLASSTYPE וטבלאות הערכים, פלט RETURN), מסומן RFC ודורש COMMIT, כמקבילת API ל-CL20N ול-CL24N. ב-S/4HANA 2025 FPS01 אובייקט ההגירה Object classification (general template) נוקב בשמו, ולציוד מתועד גם ערוץ OData ייעודי: הישות EquipmentClassification של API_EQUIPMENT (POST ו-PATCH).", xrefs: ["fm:BAPI_OBJCL_CREATE", "tx:CL20N", "tx:CL24N", "fm:BAPI_TRANSACTION_COMMIT", "obj:equipment"] },
        { he: "נקודות מדידה ומסמכי מדידה: MEASUREM_DOCUM_RFC_SINGLE_001 הוא מודול ה-RFC ליצירת מסמך מדידה בודד, מתועד בטקסט זהה ב-SAP ERP 6.0 EHP8 וב-S/4HANA 2025 FPS01 לפי רשומת האימות, עם הפרמטרים COMMIT_WORK ו-WAIT_AFTER_COMMIT; העמוד אינו מתעד פרמטר RETURN. ליצירת נקודת מדידה ב-S/4HANA 2025 FPS01 מתועד שירות ה-OData‏ API_MEASURINGPOINT (יצירה, קריאה ועדכון, מטען JSON). השם BAPI_MPID_CREATE שבמאגר לא נמצא באף מקור רשמי שנבדק, והשמות BAPI_MEASUREMENTPOINT_CREATE ו-BAPI_MEASUREMENTDOCUM_CREATE מסומנים invalid-name ברישום ההעשרה; שלושתם נשארים לאימות ב-SE37.", xrefs: ["obj:measuring-point", "fm:MEASUREM_DOCUM_RFC_SINGLE_001", "fm:BAPI_MPID_CREATE", "fm:BAPI_MEASUREMENTPOINT_CREATE", "fm:BAPI_MEASUREMENTDOCUM_CREATE", "table:IMPTT", "table:IMRG", "tx:SE37"] },
        { he: "מספרים סידוריים: ב-S/4HANA 2025 FPS01 מתועד שירות ה-OData V4‏ API_MATERIALSERIALNUMBER ליצירה, לקריאה ולעדכון של מספר סידורי לחומר (חדש מ-S/4HANA 2023), שבו מספר הציוד נוצר אוטומטית ונדרשת כותרת If-Match בכל שינוי. המודול SERIAL_NUMBER_CREATE שבמאגר לא נמצא באף מקור רשמי שנבדק, ורישום הסריקה מסמן אותו invalid-name; הסטטוס שלו פתוח.", xrefs: ["fm:SERIAL_NUMBER_CREATE", "tx:IQ01", "table:OBJK", "table:EQUI"] },
        { he: "IDoc: רשומת הערות היועץ של המאגר מזכירה IDoc‏ EQUIPMENT_CREATE לממשקי ציוד. בתיעוד הרשמי ההודעה מופיעה בהקשר אינטגרציה: עמוד Setting Up DRF Integration for MES Processes מונה לאובייקט העסקי Equipment את אובייקט הסינון 183_1 עם הסוג הבסיסי EQUIPMENT_CREATE02, ב-S/4HANA 2025 FPS01 וגם ב-SAP ERP 6.0 EHP8; ועמוד Configure Inbound Processing of Equipment (PEO, ‏2025 FPS01) קובע שמודל ההפצה במערכת ה-ERP משכפל ציוד ל-PEO דרך IDoc‏ EQUIPMENT_CREATE המופעל מ-BTE, ומגדיר את העיבוד הנכנס ב-WE20 ובעבודת רקע ב-SM36. סוג ההודעה והסוג הבסיסי אינם במילון ה-IDoc של הפרויקט.", xrefs: ["obj:equipment", "tx:WE20", "tx:SM36"] },
        { he: "שירותי ה-OData של יישומי האובייקטים הטכניים לפי ספריית ה-Fiori (S32OP, ‏2025 FPS01), כפי שנרשמו בקטלוג הפרויקט: Find Technical Object ‏(F2072) על EAM_OBJPG_TECHNICALOBJECT_SRV; ‏Manage Technical Object Structures ‏(F8669) על קבוצת השירות V4‏ UI_DRFTTECHOBJSTRUCTURE_MANAGE; ‏Process Technical Object ‏(W0029) ו-Display Technical Object ‏(W0028) הם יישומי Web Dynpro ללא שירות OData רשום.", xrefs: ["fiori:F2072", "fiori:F8669", "fiori:W0029", "fiori:W0028"] },
      ],
      outputs: [
        { he: "היררכיית מיקומים פונקציונליים עם נתוני ILOA לכל רמה.", xrefs: ["table:IFLOT", "table:ILOA"] },
        { he: "רשומות ציוד עם פלחי זמן רציפים המתארים את תקופות השימוש.", xrefs: ["table:EQUI", "table:EQUZ"] },
        { he: "היסטוריית תחזוקה, עלות ומדידות הנצברות לאובייקט ומגולגלות לפי רמת ההיררכיה.", xrefs: ["table:IMRG", "table:AUFK"] },
      ],
      exceptions: [
        { he: "מזהה מיקום נדחה: מחוון המבנה או מסכת העריכה אינם תואמים." },
        { he: "היסטוריית התקנה שגויה: פלחי זמן חופפים או ציוד המופיע מותקן בשני מקומות אחרי התקנה ללא פירוק (תקרית equipment-install-history-wrong).", xrefs: ["table:EQUZ", "table:ILOA"] },
        { he: "חיוב למרכז עלות שגוי: ILOA לא עודכן או שהירושה מהמיקום לא בוצעה (תקרית equipment-cost-center).", xrefs: ["table:ILOA"] },
        { he: "מספר סידורי בלי ציוד או להפך: פרופיל סידורי שאינו יוצר ציוד אוטומטית (תקרית equipment-serial-sync).", xrefs: ["table:OBJK", "table:EQUI"] },
        { he: "סטטוס מיקום חוסם יצירת הודעה או פקודה: מיקום לא פעיל, סטטוס משתמש חוסם או הרשאת מבנה חסרה (תקרית funcloc-status-block).", xrefs: ["table:JEST", "tx:IL02"] },
        { he: "אובייקט שאינו בהיררכיה: שיוך עליון חסר ב-IL02 או ב-IE02." },
      ],
      controls: [
        { he: "מחוון מבנה ומסכת עריכה נקבעים לפני הטעינה הראשונה ואינם משתנים בדיעבד.", xrefs: ["table:IFLOT"] },
        { he: "אכיפת פירוק לפני התקנה, ותאריך התקנה שאינו מוקדם מהפירוק הקודם, כדי לשמור על רצף פלחי הזמן.", xrefs: ["table:EQUZ", "tx:IE4N"] },
        { he: "ולידציה של ILOA בקליטת ציוד חדש: מפעל תחזוקה ומרכז עלות נכונים ובתוקף.", xrefs: ["table:ILOA"] },
        { he: "סיווג עקבי של אובייקטים, כתנאי לקביעת היתרים אוטומטית בפקודה.", xrefs: ["tx:CL02", "enh:exit:IWO10009"] },
        { he: "יצירה ושינוי דרך ממשקי ה-API במקום Batch Input, כהמלצת רשימת הפישוט של 2025 FPS01.", xrefs: ["fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE"] },
      ],
      kpis: [
        { he: "S/4HANA 2025 FPS01, ‏Technical Object Breakdowns ‏(F2812; בספריית ה-Fiori 'Analytical List Page for Technical Object Breakdown Analysis'): מספר התקלות האפקטיביות, זמן אפקטיבי בין תיקונים וזמן אפקטיבי לתיקון, וכן MTBR (זמן ממוצע בין תיקונים) ו-MTTR (זמן תיקון ממוצע) לכל תקלה או פעולת תיקון; וריאנטים עם מפעל התחזוקה כמסנן חובה, ו-drill-down להודעה, לפקודה ולאובייקט הטכני. היישום נשען על תצוגת ה-CDS‏ c_maintobjbreakdownquery ומתחשב רק בנתונים שוטפים (הודעות בארכיון או מחוקות אינן נספרות); לפי הספרייה טרנזקציית ה-GUI המובילה שלו היא MCI7.", xrefs: ["tx:MCI7", "obj:maintenance-notification", "obj:equipment", "obj:functional-location", "bp:embedded-analytics-process"] },
        { he: "S/4HANA 2025 FPS01, ‏Technical Object Damages ‏(F3075): מספר הנזקים בתרשים או בטבלה, ותגיות וכרטיסי KPI למספר הסיבות, הפעולות וחלקי האובייקט הטכני; סינון לפי מפעל תחזוקה, סוג אובייקט, סוג מבנה (Construction Type) ופרופיל קטלוג, ותצוגה לפי קבוצות קוד של חלק האובייקט. היישום נשען על c_damageanalysisquery ומתחשב רק בנתונים שוטפים; לפי ספריית ה-Fiori טרנזקציית ה-GUI המובילה שלו היא MCI5.", xrefs: ["tx:MCI5", "obj:maintenance-notification", "obj:equipment"] },
        { he: "הערכת MTTR/MTBR הקלאסית של מערכת המידע של תחזוקת המפעל (חלק מה-LIS של ה-ERP הקלאסי לפי פריט הפישוט; מתועדת גם ב-S/4HANA 2025 FPS01): לציוד ולמיקום פונקציונלי, לכל תקופה, מספר התקלות, משך ההשבתה, MTTR ו-MTBR, והערכים נקראים ישירות ממסד ההודעות; ברשימה החודשית גם מספר התקלות שדווחו מול מספר התקלות בפועל (שונים כשתקלות חופפות) וסך ההשבתה, ומההערכה אפשר לעדכן את מבנה המידע S070. לפי 'S4TWL - LIS in EAM' (2025 FPS01) ה-LIS הוא פתרון ביניים ('Invest reasonably in the LIS'), דוחות מותאמים הקוראים מ-S070 ומטבלאות ה-LIS האחרות לא יעבדו אחרי כיבוי העדכון, והחלופות שהפריט מונה כוללות את Analytical List Page for Technical Object Breakdown Analysis ואת Technical Object Damages.", xrefs: ["table:EQUI", "table:IFLOT", "obj:maintenance-notification", "bp:embedded-analytics-process"] },
      ],
      eccToS4: [
        { he: "מודל IFLOT, IFLOS, ILOA, EQUI, EQKT ו-EQUZ זהה ב-ECC וב-S/4HANA לפי רשומות התחום ולפי סט הטבלאות היציבות של שכבת ההשפעה.", xrefs: ["table:IFLOT", "table:ILOA", "table:EQUI", "table:EQUZ"] },
        { he: "מנגנון פלח הזמן מתועד רשמית ב-2025 FPS01: נתוני התחזוקה, המיקום והמכירה תלויי זמן, והמערכת יוצרת פלח זמן חדש לתיאור תקופת השימוש בהתאם להגדרות ה-Customizing.", xrefs: ["table:EQUZ"] },
        { he: "חוויית המשתמש עוברת ל-Fiori וה-GUI נשאר קיים; IE01 ו-IL01 מתועדות במהדורה הנוכחית כיישומי היצירה של ציוד ושל מיקום פונקציונלי.", xrefs: ["tx:IE01", "tx:IL01"] },
        { he: "ממשקים: רשימת הפישוט של 2025 FPS01 מונה את BAPI_EQUI_CREATE ואת BAPI_FUNCLOC_CREATE בין ממשקי ה-API המומלצים במקום Batch Input; לצדם מתועד שירות OData לציוד עם פעולות התקנה ופירוק.", xrefs: ["fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_EQUI_INSTALL"] },
        { he: "אנליטיקה ואינטגרציה: תצוגות CDS לציוד, לפלח הזמן ולמיקום הפונקציונלי, ולפי רשומת התחום גם אינטגרציית IoT לקריאות אוטומטיות.", xrefs: ["cds:I_Equipment", "cds:I_FunctionalLocation", "table:IMRG"] },
      ],
      migration: [
        { he: "IFLOT, IFLOS, ILOA, EQUI, EQKT ו-EQUZ נשמרים בהמרה; בדיקת הקבלה לפי רשומות התחום היא היררכיה, ILOA, התקנות, מספרים סידוריים ונקודות מדידה.", xrefs: ["table:IFLOT", "table:EQUI", "table:EQUZ", "table:IMPTT"] },
        { he: "אובייקט ההגירה הרשמי של הציוד נשען על BAPI_EQUI_CREATE, ומעביר תאריך התקנה ותקופת תוקף אחרונה בלבד; ציוד על מועבר לפני הציוד התלוי בו, לפי רשומת האימות.", xrefs: ["fm:BAPI_EQUI_CREATE", "table:EQUZ"] },
        { he: "הפעלת תיוג חלופי בדיעבד דורשת הרצת התוכנית הייעודית, אחרת רשומות IFLOS חסרות, לפי רשומת נתוני האב.", xrefs: ["table:IFLOS"] },
      ],
      reference: {
        title: "Equipment | Technical Objects (CS-BD/PM-EQM), SAP S/4HANA On-Premise 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/c1d5b853dcfcb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התיעוד הרשמי של האובייקטים הטכניים (אומת ברשומת table:EQUZ), המתאר את רשומת אב הציוד ואת יצירת פלח הזמן לתקופת השימוש. עמוד תהליך רשמי אחד מקצה לקצה לאובייקטים הטכניים לא אותר, וכך גם פריט SAP Best Practices (Scope Item), ולכן אינם נרשמים.",
      },
    },
    xrefs: [
      "table:IFLOT", "table:IFLOS", "table:ILOA", "table:EQUI", "table:EQKT", "table:EQUZ", "table:OBJK",
      "table:IMPTT", "table:IMRG",
      "tx:IL01", "tx:IL02", "tx:IL03", "tx:IE01", "tx:IE02", "tx:IE03", "tx:IE4N", "tx:IH01", "tx:IH06", "tx:IH08",
      "tx:IK01", "tx:IK11", "tx:IQ01", "tx:CL02", "tx:CT04",
      "fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE", "fm:BAPI_EQUI_INSTALL", "fm:BAPI_FUNCLOC_CREATE",
      "cds:I_Equipment", "cds:I_FunctionalLocation", "cds:I_EquipmentTimeSegment", "fiori:F2730A",
      "enh:exit:ITOB0001", "enh:badi:BADI_EAM_TOB",
      "obj:maintenance-order", "obj:maintenance-notification", "obj:maintenance-plan",
      "bp:maintenance-order-process", "bp:preventive-maintenance-process", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום 'מיקומים פונקציונליים', 'ציוד' ו'אובייקטים טכניים' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המיקום הפונקציונלי מייצג היכן מתבצעת התחזוקה, נשמר ב-IFLOT, IFLOS ו-ILOA, ונוצר ב-IL01 עם מחוון מבנה " +
          "הקובע את פורמט המזהה ההיררכי; הציוד הוא נכס בודד הניתן למעקב ב-EQUI, EQKT, EQUZ, OBJK ו-ILOA, נוצר " +
          "ב-IE01 ומותקן או מפורק ב-IE4N תוך שמירת ההיסטוריה; האובייקטים הטכניים הם ההיררכיה מיקום, ציוד, תת " +
          "ציוד ונקודת מדידה, ונסקרים ב-IH01 וב-IH06; ה-BAPIs שהתחומים מונים: BAPI_FUNCLOC_CREATE, " +
          "BAPI_FUNCLOC_CHANGE, BAPI_FUNCLOC_GETDETAIL, BAPI_EQUI_CREATE, BAPI_EQUI_CHANGE, BAPI_EQUI_GETDETAIL, " +
          "BAPI_EQUI_INSTALL ו-BAPI_EQUI_DISMANTLE; תקלות: מזהה מיקום נדחה, נתוני חשבונאות חסרים ב-ILOA, לא ניתן " +
          "להתקין ציוד ומספר סידורי כפול.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-technical-objects",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'מיקומים פונקציונליים' ו'ציוד' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המיקום: דיאגרמה (מחוון מבנה, יצירה ב-IL01, בניית היררכיה, התקנת ציוד, ייחוס בהודעות ובפקודות, ניתוח " +
          "היסטוריה), נתוני אב (מחוון מבנה, סוג מיקום, מרכז עלות ומפעל תחזוקה ב-ILOA, סיווג), Exits‏ ITOB0001, " +
          "BAdI‏ BADI_EAM_TOB, תרחישי QA (היררכיה בת שלוש רמות וירושת ILOA) ותקריות (מזהה לא נוצר, ציוד לא " +
          "מתקבל, חיוב שגוי). הציוד: מחזור חיים של יצירה, סיווג ומספר סידורי, התקנה ב-IE4N, ניטור בנקודות " +
          "מדידה, פקודות ופירוק; פלח זמן חדש ב-EQUZ נוצר בהתקנה ונסגר בפירוק; תקריות: התקנה שנכשלה, היסטוריה " +
          "חסרה בפלחי זמן לא רציפים ומספר סידורי כפול; ההגירה שומרת EQUI, EQKT ו-EQUZ ומפנה לתצוגות CDS של " +
          "הציוד ושל המיקום.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-equipment",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות נתוני האב 'ציוד' ו'מיקום פונקציונלי' של הפרויקט (PM_MASTER_DATA_FACETS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הציוד נוצר ב-IE01 כשנדרשת היסטוריית שימוש, אחסון פריט, ניהול נתונים פרטניים או כיול; הבעלים הוא " +
          "מהנדס או רכז תחזוקה, וה-Customizing של קטגוריית הציוד בידי היועץ הפונקציונלי; תלויות: מיקום " +
          "פונקציונלי וירושת ILOA, מספר סידורי ופרופיל סידורי, מרכז עלות, נקודות מדידה וקטגוריית ציוד; טעויות: " +
          "פרופיל סידורי שאינו מוגדר מראש, התקנה במיקום לא תקף או בתאריך מוקדם מדי, פלחי זמן לא רציפים " +
          "וקטגוריה שגויה. המיקום נוצר ב-IL01, והפונקציה החשובה ביותר ב-Customizing היא מחוון המבנה הקובע אורך " +
          "מזהה, מספר רמות ותווים לרמה; טעויות: מחוון ומסכת עריכה שלא תוכננו, ערבוב מדיניות מבנה, מרכז עלות " +
          "שגוי ב-ILOA והפעלת תיוג חלופי בדיעבד בלי הרצת התוכנית הייעודית.",
        verificationLevel: "repository_verified",
        repoRef: "data/pm-master-data-facets.ts#EQUI",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: equipment-install-history-wrong, equipment-cost-center, equipment-serial-sync, funcloc-status-block",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "התקנה בלי פירוק קודם או בתאריך המוקדם מהפירוק יוצרת חפיפה בתקופות השימוש והציוד מופיע מותקן בשני " +
          "מקומות; הבדיקה היא ברשימת השימוש ב-IE03, בפלחי הזמן ב-EQUZ ובמיקום לכל תקופה דרך ILOA, והמניעה היא " +
          "מחוון התקנה יחידה ואכיפת פירוק לפני התקנה. מרכז עלות שגוי ב-ILOA גורם לרישום עלות התחזוקה ליעד לא " +
          "נכון, כולל לציוד היורש. פרופיל סידורי שאינו יוצר ציוד אוטומטית מפצל את ההיסטוריה בין הסריאל לציוד. " +
          "מיקום לא פעיל או בסטטוס משתמש חוסם מונע יצירת הודעה או פקודה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext4.ts#equipment-install-history-wrong",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של יישום ה-Fiori לאובייקטים טכניים (data/verification/fiori.ts, fiori:F2730A)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המזהה F2730A שבקטלוג הפרויקט ליישום Manage Technical Objects לא נמצא באף מקור רשמי, והמאגר נוקב בשני " +
          "מזהים נוספים לאותו שם; היישומים שהתיעוד הרשמי של 2025 FPS01 מונה לאובייקטים טכניים הם Find Technical " +
          "Object (F2072), Process Technical Object (W0029), Display Technical Object (W0028) ו-Manage Technical " +
          "Object Structures (F8669); הרשומה אינה קובעת סטטוס, ופרטי התפקיד, הקטלוג וה-OData שברשומה המתוחזקת " +
          "לא אומתו.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/fiori.ts#fiori:F2730A",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Equipment | Technical Objects (CS-BD/PM-EQM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/c1d5b853dcfcb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL15,
        claim:
          "נושא 'Equipment' בחוברת Technical Objects (CS-BD/PM-EQM) לגרסת 2025 FPS01 מתאר את מנגנון פלח " +
          "הזמן עצמו: 'The equipment master record contains several types of data'; 'Plant Maintenance " +
          "data, location data and sales data This is time-dependent data. It can change repeatedly in the " +
          "course of time'; ו-'If your system is set up accordingly with the help of the Customizing " +
          "functions, it automatically creates a new time segment for specific master record changes that " +
          "describes the equipment usage period'. זהו התיאור הרשמי של יצירת פלח זמן (time segment) חדש " +
          "לתיאור תקופת השימוש (equipment usage period) של הציוד, והוא תלוי בהגדרות Customizing. הסניפט " +
          "אינו נוקב בשם הטבלה EQUZ. (אומת ברשומת table:EQUZ)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Select Main Partner for a Technical Object | Technical Objects (CS-BD/PM-EQM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/6900131d1f9149fea8cdbc03e4e96188.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX7,
        claim:
          "תיעוד האובייקטים הטכניים (CS-BD/PM-EQM) למהדורת 2025 FPS01 קובע: 'Equipment In Create Equipment app " +
          "(IE01) and Change Equipment app (IE02), you can select main partners for an equipment.' התקציר ממשיך " +
          "ב-'In Display Equipment app (IE03), you ca' ונקטע שם. IE01 מתועדת במהדורה הנוכחית כאפליקציית Create " +
          "Equipment הפעילה, לצד IE02 ו-IE03. (אומת ברשומת tx:IE01)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Select Main Partner for a Technical Object | Technical Objects (CS-BD/PM-EQM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/6900131d1f9149fea8cdbc03e4e96188.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX7,
        claim:
          "תיעוד Technical Objects (CS-BD/PM-EQM) לגרסת 2025 FPS01 קובע: 'In Create Functional Location app " +
          "(IL01) and Change Functional Location (IL02), you can select main partners for a functional " +
          "location', וכן 'In the Display Functional Location app (IL03), you can view the main partners'. IL01 " +
          "נקובה בשמה כאפליקציית יצירת מיקום פונקציונלי בתיעוד ה-On-Premise העדכני (loio 6900131d); פריט " +
          "ה-What's New המקביל לגרסת 2022 (loio 1fdf47f4, רכיב PM-EQM-FL) מתעד את אותה יכולת כתקפה מ-SAP " +
          "S/4HANA 2022. (אומת ברשומת tx:IL01)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Install Equipment at Functional Location | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/923c8b020caf441c8abca41c416501fd.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד הפעולה הרשמי במדריך APIs for Maintenance Management למהדורת On-Premise‏ 2025 FPS01 (רשומת " +
          "החיפוש: loio 923c8b020caf441c8abca41c416501fd, versionId 2025.001, תאריך 2026-02-24) מתעד את " +
          "ה-Function Import להתקנת ציוד במיקום פונקציונלי בשירות ה-OData‏ API_EQUIPMENT. כלשון התקציר: " +
          "'Install Equipment at Functional Location Request You can include the following properties in the " +
          "request's URL: Property Necessity Comment Equipment ValidityEndDate SuperordinateEquipment', ובשתי " +
          "הרצות של אותה רשומה התקציר מוסיף את הדוגמה 'Examples Request POST - " +
          "<host>/sap/opu/odata/sap/API_EQUIPMENT/InstallEquipment?' עם " +
          "'Equipment=%2710084475%27&ValidityEndDate=datetime%279999-12-31T00%3A00%27&FunctionalLocation=%27STTE-CBE-THL-AAAAA-AAAA-0001%27&EquipInstallationPositionNmbr=%270030%27&EquipmentInstallationDate=datetime' " +
          "ואת טבלת פרמטרי התשובה (Response Parameters) 'Parameter Name Type SuperordinateEquipment HEQUI " +
          "EquipInstallationPositionNmbr POSNR FunctionalLocation TPLNR EquipmentInstallationDate AEDAT " +
          "EquipmentInstallationTime TIMBI Equipment EQUNR'. גוף העמוד עובד ב-2026-09-22 בדפדפן (כלי " +
          "browser-use) ונשמר כ-HTML: המסך מציג Version: 2025 FPS01 (Feb 2026); טבלת המאפיינים מונה שבעה " +
          "מאפיינים (EquipInstallationPositionNmbr, Equipment, EquipmentInstallationDate, " +
          "EquipmentInstallationTime, FunctionalLocation, SuperordinateEquipment, ValidityEndDate), ועמודות " +
          "Necessity ו-Comment שלה עובדו ריקות, ולכן חובת כל מאפיין אינה נקבעת מהעמוד; טבלת פרמטרי התשובה " +
          "ודוגמת הבקשה זהות לתקציר. העמוד אינו נוקב בשם BAPI_EQUI_INSTALL ולא בשם BAPI כלשהו. " +
          "(אומת ברשומת fm:BAPI_EQUI_INSTALL)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
          "Edition 2025 - Feature Pack Stack 1 · item 4.1.4 S4TWL - Batch Input for Enterprise Asset Management " +
          "(EAM), pp. 77-78 (PDF, נקרא בטקסט המחולץ)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim:
          "מסמך רשימת הפישוט הרשמית SIMPL_OP2025.pdf ‏(Document Version 1.36, ‏1,514 עמודים; " +
          "ב-2026-09-22 הכתובת מחזירה HTTP 200 עם content-length‏ 10,585,218 בתים, זהה לקובץ שחולץ לטקסט: " +
          "pdftotext -layout‏ 70,529 שורות, pdftotext רגיל 85,712 שורות) נוקב בשם BAPI_EQUI_CREATE פעם אחת " +
          "בלבד, בפריט 4.1.4 S4TWL - Batch Input for Enterprise Asset Management (EAM) ‏(Application " +
          "Component: PM; Related Note 0002270107 כפי שמודפס במסמך; עמ' 77-78, רשימת ה-BAPIs בעמ' 78): " +
          "'Transaction IBIP is using Batch Input as an technology to create transactional data for all EAM " +
          "Objects (Equipment, Functional Location, Notification, Order, Maintenance Plan, Task List...). This " +
          "is an outdated technology. Within EAM we plan to discontinue to support this technology in a future " +
          "release.' ובהמשך: 'Plant Maintenance offers a set of API´s which are supporting the creation / " +
          "change of Plant Maintenance data like: • Equipment • BAPI_EQUI_CREATE • BAPI_EQUI_CHANGE • " +
          "BAPI_EQUI_GET_DETAIL • Functional Location • BAPI_FUNCLOC_CREATE • BAPI_FUNCLOC_CHANGE • " +
          "BAPI_FUNCLOC_GET_DETAIL • Notification • BAPI_ALM_NOTIF_CREATE ... • Maintenance Order • " +
          "BAPI_ALM_ORDER_MAINTAIN', ובסעיף Required and Recommended Action(s): 'Please check if you use Batch " +
          "Input for creating / changing Plant Maintenance data. If Yes do not invest further in this kind of " +
          "technology. Recommendation within EAM is to use the API´s wherever possible.' כלומר רשימת הפישוט של " +
          "2025 FPS01 מציגה את BAPI_EQUI_CREATE כממשק המומלץ ליצירת ציוד במקום Batch Input, ואינה מסמנת את " +
          "ה-BAPI עצמו כפריט פישוט. ממצא שלילי תחום לטקסט המחולץ: המחרוזת API_EQUIPMENT אינה מופיעה במסמך, ואין " +
          "בו פריט אחר הנוקב ב-BAPI_EQUI_CREATE. המסמך מאיית את BAPI הקריאה 'BAPI_EQUI_GET_DETAIL' (עם קו תחתון " +
          "נוסף), בעוד המאגר ורשומת fm:BAPI_EQUI_GETDETAIL מאייתים GETDETAIL; ההבדל נרשם ואינו מוכרע כאן. " +
          "(אומת ברשומת fm:BAPI_EQUI_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 3 'Structuring of Technical Systems', סעיפים 3.2, 3.3 ו-3.11",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את מיפוי המערכות הטכניות: מיקומים פונקציונליים ומיקומי ייחוס (3.2, כולל הזנה בודדת, הזנה " +
          "קיבוצית ותיוג חלופי), ציוד ומספרים סידוריים (3.3, כולל התקנה במיקום ופירוק, אחסון והיררכיות ציוד) " +
          "ופונקציות כלליות (3.11, ובהן נקודות מדידה ומונים, מסמכים, אחריות, שותפים, היתרים וסטטוס מערכת " +
          "ומשתמש). הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#3.3",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 1 בספריית הפרויקט (SAP PRESS, Configuring Plant Maintenance in SAP S/4HANA), פרק 4 'Configuring the Structure of Technical Systems', סעיפים 4.1 עד 4.3 ו-4.8",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את הגדרת מבנה המערכות הטכניות: רכיבי המבנה (4.1), מיקומים פונקציונליים ומיקומי ייחוס (4.2), " +
          "ציוד (4.3) ומספרים סידוריים (4.8). הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book1.json#4.3",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של תחזוקת המפעל ורשומת הסריקה של הסיווג (data/bapi-enrichment.pm.ts, data/bapi-enrichment.sweep.ts)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רישום ההעשרה של PM מתאר את BAPI_EQUI_CREATE (Create, אובייקט BOR‏ EquipmentPM, טרנזקציות IE01, טבלאות EQUI, " +
          "EQKT, EQUZ ו-ILOA, הרשאות I_IWERK, I_BEGRP ו-I_EQUI, פרמטרים 'IMP DATA_GENERAL, DATA_SPECIFIC, DATA_INSTALL, " +
          "EXTERNAL_NUMBER · EXP EQUIPMENT · TAB RETURN'), את BAPI_EQUI_CHANGE (מבני X, מקבילת IE02), את " +
          "BAPI_EQUI_GETDETAIL (Read, מקבילת IE03), את BAPI_FUNCLOC_CREATE, ‏BAPI_FUNCLOC_CHANGE " +
          "ו-BAPI_FUNCLOC_GETDETAIL (אובייקט BOR‏ FunctLocation, מקבילות IL01, IL02 ו-IL03; ליצירה טבלאות IFLOT, IFLOTX " +
          "ו-ILOA והרשאות I_ILOA ו-I_TL), את BAPI_EQUI_INSTALL (Change, התקנה במיקום פונקציונלי או בציוד עליון, 'זוג עם " +
          "BAPI_EQUI_DISMANTLE', טרנזקציות IE02 ו-IE4N, טבלאות EQUZ ו-ILOA) ואת BAPI_MPID_CREATE (נקודת מדידה, IK01, " +
          "IMPTT); כל פעולות הכתיבה מקושרות ל-BAPI_TRANSACTION_COMMIT. אותו קובץ מסמן את BAPI_EQMT_INSTALL, " +
          "‏BAPI_MEASUREMENTPOINT_CREATE ו-BAPI_MEASUREMENTDOCUM_CREATE כשמות לא תקניים. רשומת הסריקה מתארת את " +
          "BAPI_OBJCL_CREATE כשיוך אובייקט למחלקת סיווג ומילוי ערכי מאפיינים, RFC ו-COMMIT, מקבילת API ל-CL20N " +
          "ול-CL24N, עם 'IN: OBJECTKEY, OBJECTTABLE, CLASSNUM, CLASSTYPE, ALLOCVALUESCHAR/NUM/CURR · OUT: RETURN.' " +
          "רשומת הסריקה מסמנת את SERIAL_NUMBER_CREATE בסטטוס invalid-name (\"לא אומת כשם סטנדרטי\"), ורישום ה-PM מסמן את " +
          "BAPI_EQMT_INSTALL, ‏BAPI_MEASUREMENTPOINT_CREATE ו-BAPI_MEASUREMENTDOCUM_CREATE בסטטוס invalid-name.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_EQUI_CREATE; data/bapi-enrichment.pm.ts#BAPI_FUNCLOC_CREATE; data/bapi-enrichment.pm.ts#BAPI_EQUI_INSTALL; data/bapi-enrichment.pm.ts#BAPI_MPID_CREATE; data/bapi-enrichment.sweep.ts#BAPI_OBJCL_CREATE; data/bapi-enrichment.sweep.ts#SERIAL_NUMBER_CREATE; data/bapi-enrichment.pm.ts#BAPI_EQMT_INSTALL; data/bapi-enrichment.pm.ts#BAPI_MEASUREMENTPOINT_CREATE; data/bapi-enrichment.pm.ts#BAPI_MEASUREMENTDOCUM_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות האימות של מודולי הפונקציה של האובייקטים הטכניים (data/verification/functions.ts)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הסטטוסים ברשומות: BAPI_EQUI_CREATE, ‏BAPI_EQUI_CHANGE, ‏BAPI_EQUI_GETDETAIL, ‏BAPI_FUNCLOC_CREATE, " +
          "‏BAPI_FUNCLOC_CHANGE, ‏BAPI_FUNCLOC_GETDETAIL, ‏BAPI_EQUI_INSTALL, ‏BAPI_OBJCL_CREATE ו-EQUIPMENT_DISMANTLE " +
          "בסטטוס released_api_available (חלופת OData מתועדת לצד הפונקציה, ללא יורש); לפי רשומת BAPI_EQUI_CREATE " +
          "אובייקט ההגירה PM - Equipment נוקב בו; לפי רשומת BAPI_FUNCLOC_CREATE פריט ה-What's New של " +
          "BADI_ASM_MD_FUNCLOC מונה גם את IL01, ‏IL02, ‏W0029 ו-API_FUNCTIONALLOCATION; לפי רשומות BAPI_EQUI_INSTALL " +
          "ו-BAPI_EQMT_INSTALL אף רשומת SAP Help שנסרקה אינה נוקבת ב-BAPI_EQUI_INSTALL, ב-BAPI_EQUI_DISMANTLE או " +
          "ב-BAPI_EQMT_INSTALL, והשם האחרון נשאר verification_required עם שכבות מאגר סותרות; לפי רשומת " +
          "EQUIPMENT_DISMANTLE המאגר מתאר אותו כמודול פנימי שאינו RFC. MEASUREM_DOCUM_RFC_SINGLE_001 בסטטוס unchanged: " +
          "אותו נושא מתפרסם בטקסט זהה ב-SAP ERP 6.0 EHP8 וב-S/4HANA 2025 FPS01. BAPI_MPID_CREATE, " +
          "‏BAPI_MEASUREMENTPOINT_CREATE, ‏BAPI_MEASUREMENTDOCUM_CREATE ו-SERIAL_NUMBER_CREATE בסטטוס " +
          "verification_required: אף מקור רשמי שנבדק אינו נוקב בהם.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/functions.ts#fm:BAPI_EQUI_CREATE; data/verification/functions.ts#fm:BAPI_FUNCLOC_CREATE; data/verification/functions.ts#fm:BAPI_EQUI_INSTALL; data/verification/functions.ts#fm:BAPI_EQMT_INSTALL; data/verification/functions.ts#fm:EQUIPMENT_DISMANTLE; data/verification/functions.ts#fm:MEASUREM_DOCUM_RFC_SINGLE_001; data/verification/functions.ts#fm:BAPI_MPID_CREATE; data/verification/functions.ts#fm:SERIAL_NUMBER_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ה-Fiori של הפרויקט: F2072, F8669, W0029 ו-W0028 (data/fiori/apps.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הקטלוג (עדכון 2026-09-24, לפי ספריית ה-Fiori‏ S32OP) רושם ל-Find Technical Object ‏(F2072) את שירות ה-OData‏ " +
          "EAM_OBJPG_TECHNICALOBJECT_SRV ואת טרנזקציות ה-GUI‏ IE03, ‏IH06, ‏IH08 ו-IL03; ל-Manage Technical Object " +
          "Structures ‏(F8669) את קבוצת השירות UI_DRFTTECHOBJSTRUCTURE_MANAGE ואת התפקיד SAP_BR_MD_SPECIALIST_EAM; " +
          "ול-Process Technical Object ‏(W0029) ול-Display Technical Object ‏(W0028) יישומי Web Dynpro‏ " +
          "(EAMS_WDA_TECHOBJ_OIF) עם NumberofOdataServices=0.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2072; data/fiori/apps.ts#F8669; data/fiori/apps.ts#W0029; data/fiori/apps.ts#W0028",
      },
      {
        sourceType: "repository",
        sourceTitle: "הערות היועץ של הפרויקט לטבלת EQUI (data/consultant-notes.ts)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רשומת EQUI מונה תחת integration את 'IDoc EQUIPMENT_CREATE לממשקים' ואת מסמכי המדידה (IMRG) לתחזוקה מבוססת " +
          "מצב, ותחת debug את IE03 (היסטוריה ב-EQUZ) ואת BAPI_EQUI_GETDETAIL. הרשומה אינה נוקבת בסוג בסיסי ואינה מפנה " +
          "למקור.",
        verificationLevel: "repository_verified",
        repoRef: "data/consultant-notes.ts#EQUI",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "APIs for Maintenance Management | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/13d40bd35fc74d289e81fc284a928448.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד הסקירה הרשמי של מדריך APIs for Maintenance Management למהדורת On-Premise‏ 2025 FPS01 ‏(loio " +
          "13d40bd35fc74d289e81fc284a928448) מתעד לשירות ה-OData של הציוד, בתקצירי שלוש הרצות שונות של אותה רשומה " +
          "ב-2026-09-22: 'The service enables the following operations for the equipment Read equipment master data " +
          "Create equipment master data Update equipment master data Delete equipment master data class assignment', " +
          "'Mass create, read, and update equipment master data Install and dismantle equipment without data transfer " +
          "Attach documents', 'This service also supports deep entity for POST operation and BATCH processing', ובטבלת " +
          "הישויות: 'Entity Description Link to Details Equipment (A_Equipment) Allows you to create an equipment. " +
          "Equipment Equipment Long Text (A_EquipmentLongText) Allows you to create equipment long text.' השם הטכני " +
          "API_EQUIPMENT מופיע באותו מדריך ובאותה גרסה בעמוד Extensibility: Equipment API ‏(loio " +
          "5dc3c9f9d17141d4ae1ad2099710eff9: 'you can extend the OData Service API_EQUIPMENT'). כלומר לתרחיש יצירת " +
          "רשומת ציוד קיימת במהדורה זו חלופת OData מתועדת. התקציר אינו נוקב בשם BAPI_EQUI_CREATE ואינו נוקב בשם BAPI " +
          "כלשהו. (אומת ברשומת fm:BAPI_EQUI_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Equipment | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d1e3c797d3f44120b552d0e64680e445.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "עמוד הפעולות של שירות ה-OData‏ Equipment למהדורת On-Premise‏ 2025 FPS01 פותח ב-'Operations for Equipment The " +
          "Equipment API offers these operations' ומונה בטבלת הפעולות את 'Read Equipment GET', את יצירת הציוד בשיטת " +
          "POST על ‎/sap/opu/odata/sap/API_EQUIPMENT/Equipment ואת 'Update Equipment PATCH' על אותו נתיב, לצד 'Create " +
          "Equipment Classification Data POST' / 'Update Equipment Classification Data PATCH' על " +
          "EquipmentClassification ו-'Create Equipment Text POST' על EquipmentLongText. התקציר קובע גם: 'For this " +
          "service, the If-Match header must be set for all change operations'. זו חלופת OData מתועדת לתרחיש שינוי " +
          "נתוני אב של ציוד; העמוד אינו נוקב בשם BAPI_EQUI_CHANGE. (אומת ברשומת fm:BAPI_EQUI_CHANGE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Function Imports for Equipment | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/4373216a4f874dc1aa4b40b742998066.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE_FM_22,
        claim:
          "רשומת החיפוש הרשמית של עמוד ה-Function Imports של הציוד במדריך APIs for Maintenance Management (loio " +
          "4373216a4f874dc1aa4b40b742998066, versionId 2023.latest, תאריך 2026-08-05) מתעדת בשירות ה-OData‏ " +
          "API_EQUIPMENT פעולת פירוק ציוד. כלשון קטעי התקציר: 'location or superordinate equipment POST - " +
          "<host>/sap/opu/odata/sap/API_EQUIPMENT/Dism…' (התקציר קטוע) ו-'Type: Dismantle Equipment for Superordinate " +
          "Equipment or Functional Location Entity Set: POST POST - " +
          "<host>/sap/opu/odata/sap/API_EQUIPMENT/DismantleEquipment?', וכן 'Return Type: Dismantle Equipment for " +
          "Functional Location with Data Transfer Entity'. כלומר לתרחיש פירוק ציוד ממיקום פונקציונלי או מציוד-על קיימת " +
          "במהדורה זו פעולת OData מתועדת. התקציר אינו נוקב בשם EQUIPMENT_DISMANTLE ולא בשם מודול פונקציה כלשהו; רשימת " +
          "הפרמטרים המלאה ודרישות החובה לא נקראו מגוף העמוד. (אומת ברשומת fm:EQUIPMENT_DISMANTLE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Functional Location | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "מדריך APIs for Maintenance Management לגרסת On-Premise 2025 FPS01 מתעד את השירות: 'Functional Location " +
          "Technical name: API_FUNCTIONALLOCATION', וקובע 'The service enables the following operations for the " +
          "functional location: Read functional location master data Create functional location master data Update " +
          "functional location master data Delete'. הנושא המשלים Operations for Functional Location ‏(loio " +
          "f69f391c38104f75ae5792155a88ce05, גרסה 2023.latest) מציג בטבלת הפעולות 'Create Functional Location POST " +
          "/sap/opu/odata/sap/API_FUNCTIONALLOCATION/FunctionalLocation' לצד Read ו-Update, והנושא Extensibility: " +
          "Functional Location API ‏(loio 5e1d4eabc0b541c28c3888006d2ada6f, גרסה 2025.001) קובע 'you can extend the " +
          "OData Service API_FUNCTIONALLOCATION according to your business needs' דרך היישום Custom Fields and Logic " +
          "בהקשר העסקי Functional Location ובישות A_FUNCTIONALLOCATION. אף אחת מהרשומות האלה אינה מציגה את השירות " +
          "כמחליף של BAPI_FUNCLOC_CREATE. (אומת ברשומת fm:BAPI_FUNCLOC_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "פריט What's New של 2025 FPS01 נוקב ב-BAPI בשמו המלא. לפי התקציר: 'The new Business Add-In (BAdI) BAdI for " +
          "Functional Location (BADI_ASM_MD_FUNCLOC) allows you to add custom validations while creating or updating " +
          "... functional locations by using the following business application programming interfaces (BAPIs): PM " +
          "BAPI: Create Functional Location (BAPI_FUNCLOC_CREATE) PM BAPI: Change Functional Location " +
          "(BAPI_FUNCLOC_CHANGE ...)'. הציטוט מורכב משני קטעי הדגשה של אותה רשומת חיפוש. כלומר ‏BAPI_FUNCLOC_CHANGE " +
          "מתועד ב-S/4HANA On-Premise‏ 2025 FPS01 תחת השם 'PM BAPI: Change Functional Location' כערוץ שינוי פעיל של " +
          "מיקום פונקציונלי, ונכלל בהיקף ה-BAdI החדש. התקציר אינו נוקב בהוצאה משימוש, ביורש או בהגבלה של ה-BAPI. (אומת " +
          "ברשומת fm:BAPI_FUNCLOC_CHANGE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Object classification (general template) | Data Migration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/1b202b73dc524be2a406e5981790c296.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד אובייקט המיגרציה Object classification (general template) במדריך Data Migration לגרסת On-Premise 2025 " +
          "FPS01 נוקב בשם הטכני כלשונו בתקציר: 'Not relevant Not relevant BAPI_OBJCL_CREATE'. אותו עמוד מתאר את מטרתו " +
          "'This migration object enables you to migrate object classification data from the source ERP system to the " +
          "target system', קובע 'This migration technique transfers data to the target system using Business " +
          "Application Programming Interfaces (BAPIs)' ומציין 'Related Business Object: Classification' עם נתיב התפריט " +
          "'Cross Application Components > Classification System > Assignment > Assign Object to Classes'. כותרות " +
          "העמודות שלצד השם אינן נראות בתקציר, ולכן העמוד מראה שהשם רשום באובייקט המיגרציה של הסיווג בגרסה זו, ואינו " +
          "מציג מעמד שחרור, פרמטרים או דרישת COMMIT. (אומת ברשומת fm:BAPI_OBJCL_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Function Module MEASUREM_DOCUM_RFC_SINGLE_001 | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6770b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "עמוד מודול הפונקציה במדריך Maintenance Management למהדורת On-Premise 2025 FPS01 נקרא במלואו דרך שירות התוכן " +
          "של הפורטל (http.svc/deliverableMetadata ואחריו http.svc/pagecontent, deliverable_id 40374871, buildNo 1780). " +
          "עץ התיעוד של אותו דליברבל ממקם אותו תחת Maintenance Management > Technical Objects (PM-EQM) > PM-PCS " +
          "Interface (PM-EQM-SF-MPC) > Transfer, measurement and counter readings > Notes about the Function Modules. " +
          "כלשון העמוד: 'Task RFC Measurement document: Individual processing, Create' ו-'This RFC enables the " +
          "following remote calls for creating measurement documents', בשני אופנים: Remote dialog (WITH_DIALOG_SCREEN = " +
          "'X') ו-API without Dialog (WITH_DIALOG_SCREEN = ' '). טבלאות הממשק מונות 23 פרמטרי ייבוא, בהם " +
          "MEASUREMENT_POINT ('Measuring point (primary key)'), SECONDARY_INDEX, READING_DATE, READING_TIME, " +
          "RECORDED_VALUE, RECORDED_UNIT, DIFFERENCE_READING, VALUATION_CODE, USER_DATA, CHECK_CUSTOM_DUPREC, " +
          "CREATE_NOTIFICATION, NOTIFICATION_TYPE ו-NOTIFICATION_PRIO; ארבעה פרמטרי ייצוא: MEASUREMENT_DOCUMENT, " +
          "COMPLETE_DOCUMENT (במבנה IMRG), NOTIFICATION ו-CUSTOM_DUPREC_OCCURED; ו-17 חריגות, בהן POINT_NOT_FOUND " +
          "('Measuring point (table IMPTT) not found'), POINT_LOCKED, TIMESTAMP_DUPREC ו-UPDATE_FAILED ('Database " +
          "update failed (during WAIT_AFTER_COMMIT)'). לעניין השמירה העמוד מתעד את 'COMMIT_WORK CHAR 1 X = Trigger " +
          "COMMIT WORK at ABAP level' ואת 'WAIT_AFTER_COMMIT CHAR 1 X = Wait for database update'. טבלאות הפרמטרים אינן " +
          "כוללות עמודת ערך ברירת מחדל (העמוד מציין כמשויך מראש רק את סוג ההודעה M2, וקובע שכאשר RECORDED_UNIT מועבר " +
          "ריק המערכת משתמשת ביחידת המידה של נקודת המדידה), העמוד אינו מתעד פרמטר RETURN, ואינו מכיל את המחרוזות " +
          "release, IMR0, BAPI_TRANSACTION_COMMIT או rollback. (אומת ברשומת fm:MEASUREM_DOCUM_RFC_SINGLE_001)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Measuring Point | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/8cdfef769b2b4f7195a5f296982e2fe6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "עמוד השירות הרשמי למהדורת On-Premise‏ 2025 FPS01 קובע בתקצירו: 'Measuring Point Service name: " +
          "API_MEASURINGPOINT This synchronous inbound service enables you to create, read, and update a measuring " +
          "point or a collection of measuring points through an external application', ומוסיף 'The payload used to " +
          "create a measuring point through this API is sent in JSON format as a request object' ו-'Measuring points " +
          "are located on technical objects such as pieces of equipment or at functional locations'. העמוד אינו נוקב " +
          "בשם BAPI_MEASUREMENTPOINT_CREATE ואינו מציג את השירות כמחליף של מודול פונקציה כלשהו. (אומת ברשומת " +
          "fm:BAPI_MEASUREMENTPOINT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Serial Number | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6116dbbcff74afd851343ca65c54d3c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "גוף העמוד (S/4HANA On-Premise 2025 FPS01, loio b6116dbbcff74afd851343ca65c54d3c, deliverable_id 40374289, " +
          "buildNo 1779) נקרא במלואו ב-2026-09-23 דרך שירות התוכן של הפורטל. העמוד קובע 'Service name: " +
          "API_MATERIALSERIALNUMBER This service enables you to create, read and update serial numbers for a material', " +
          "מגדיר 'Material serial number represents a serialized equipment and is used to identify an individual " +
          "instance of a material or an equipment', ומוסיף 'This service is published on the SAP Business Accelerator " +
          "Hub' ו-'This is an OData version 4 service'. בטבלת קבוצת השירות מודפס 'API_MATERIALSERIALNUMBER srvd_a2x " +
          "API_MATERIALSERIALNUMBER 1.0.0', והישות MaterialSerialNumber מסומנת Mandatory, לצד ישויות אופציונליות לשותף, " +
          "לאחריות לקוח ולאחריות ספק. בסעיף Constraints: 'The equipment number is auto generated. You cannot enter an " +
          "equipment number' ו-'This API does not support soft or hard deletion of a material serial number'. שני נושאי " +
          "אח באותו דליברבל נקראו במלואם: 'Create Material Serial Number' (loio ca13ea5b52464efb956b860ad321b5cf) קובע " +
          "'With this operation, you can create a material serial number' ומסמן את Material ואת EquipmentCategory כחובה " +
          "ואת UniqueItemIdentifier כאופציונלי; 'Operations for Material Serial Number' (loio " +
          "51418d8a223142958be2bbda74162d62) מונה בין השאר את 'Create Material Serial Number' ו-'Create Mass Material " +
          "Serial Numbers' (הפעולה CreateMassMaterialSerialNumber), וקובע 'For this API, the If-Match header must be " +
          "set for all change operations'. רשומת What's New in SAP S/4HANA 2023 'OData API: Material Serial Number' " +
          "(loio c8ae69bcbf4c4b309ef14aa69de4e0f7, 2023.000, נקראה במלואה) קובעת 'With the Material Serial Number API, " +
          "you can create, update, and read material serial numbers' עם 'Type New', רכיב היישום PM-EQM ו-'Valid as Of " +
          "SAP S/4HANA 2023'. אף אחד מהעמודים אינו נוקב בשם SERIAL_NUMBER_CREATE או במודול פונקציה כלשהו, ואף אחד אינו " +
          "מציג את השירות כמחליף של מודול פונקציה. (אומת ברשומת fm:SERIAL_NUMBER_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Setting Up DRF Integration for MES Processes | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/667aa2e1747d49aeab7a8c36402d6163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 667aa2e1747d49aeab7a8c36402d6163, נקרא ב-2026-09-28 דרך שירות התוכן) מונה את אובייקטי הסינון " +
          "הסטנדרטיים לאינטגרציית MES: '... Maintenance order 468_1 468_1 IORDER01 Material 194_1 194_2 MATMAS06 " +
          "Equipment 183_1 183_1 EQUIPMENT_CREATE02 ...', עם ההערה 'To use the enhanced interfaces, you must utilize at " +
          "least the specified basis type or its successor for the integration'. כלומר לאובייקט העסקי Equipment נקוב " +
          "הסוג הבסיסי EQUIPMENT_CREATE02 בהקשר הפצת DRF למערכת MES. העמוד אינו מתאר העברת ציוד בין מערכות ERP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Setting Up DRF Integration for MES Processes | Production Planning and Control (PP)",
        url: "https://help.sap.com/docs/SAP_ERP/a0d3efbac8b14fc89b29bf47a1677c86/667aa2e1747d49aeab7a8c36402d6163.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE28,
        claim:
          "רשומת החיפוש של אותו נושא בתיעוד SAP ERP 6.0 EHP8 (loio 667aa2e1747d49aeab7a8c36402d6163, versionId " +
          "6.18.latest) מציגה בתקציר: 'As standard, the following filter objects are supplied for an MES integration: " +
          "Business object Outbound implementation Filter object IDoc ... Material 194_1 194_2 MATMAS03 Equipment 183_1 " +
          "183_1 EQUIPMENT_CREATE02'. כלומר גם בצד ה-ECC נקוב EQUIPMENT_CREATE02 לציוד באינטגרציית MES. גוף העמוד לא " +
          "נקרא; הטענה תחומה לתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Configure Inbound Processing of Equipment | Production Engineering and Operations for Complex Assembly",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/c7c9a576cb30419a9d3a6750696a8212.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio c7c9a576cb30419a9d3a6750696a8212, deliverable 40374811, נקרא ב-2026-09-28 דרך שירות התוכן) " +
          "קובע: 'The distribution model in your ERP system replicates equipment to PEO via IDoc EQUIPMENT_CREATE , " +
          "which is triggered based on a business transaction event (BTE)', ומנחה במערכת ה-PEO: WE20, בחירת סוג ההודעה " +
          "EQUIPMENT_CREATE בטבלת ה-Inbound ו-'Trigger by background program', דוח RBDAPP01 עם וריאנט לסוג ההודעה " +
          "EQUIPMENT_CREATE ולסטטוס IDoc‏ 64, ועבודת רקע תקופתית ב-SM36. ההקשר הוא שכפול ציוד ממערכת ERP למערכת PEO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Object Breakdowns | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/26ffbe0266bb4df3bd4d172a837af583.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 26ffbe0266bb4df3bd4d172a837af583, deliverable 40374871, build 1780, נקרא ב-2026-09-28 דרך " +
          "שירות התוכן): 'With this app you can analyze the causes of a particular breakdown more closely and calculate " +
          "the distribution of duration of the various breakdowns or repairs'; תחת Key Features: 'View the number of " +
          "effective breakdowns', 'You can create variants with mandatory filter Maintenance Plant', 'View effective " +
          "time between repair and effective time to repair, as well as mean time between repair and mean time to " +
          "repair for every breakdown or repair activity', 'Identify the possible functional location where an " +
          "equipment has failed' ו-drill-down להודעה, לפקודה ולאובייקט הטכני; 'This app uses the " +
          "c_maintobjbreakdownquery CDS view' ו-'This analytical app only takes current data into account. Archived or " +
          "deleted maintenance notifications are not considered.' העמוד אינו נוקב במזהה היישום.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Analytical List Page for Technical Object Breakdown Analysis (F2812), S/4HANA 2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2812')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "לפי scripts/fal-app.mjs F2812 (ערוץ ה-OData של הספרייה, S32OP, ‏2026-09-28): 'Analytical List Page for " +
          "Technical Object Breakdown Analysis', ‏Analytical / SAP Fiori elements, ‏Published, רכיב PM-FIO-ANA; תפקידים " +
          "SAP_BR_MAINTENANCE_PLANNER, ‏SAP_BR_MAINTENANCE_TECHNICIAN, ‏SAP_BR_MAINT_SUPERVISOR " +
          "ו-SAP_BR_MAINT_TECH_OFFICER; קטלוגים עסקיים בהם SAP_EAM_BC_AIS 'EAM - Asset Information System'; intent " +
          "MaintenanceObject-displayBreakdownAnalysis; שירות OData‏ C_MAINTOBJBREAKDOWNQUERY_CDS; טרנזקציית GUI מובילה " +
          "MCI7 וקשורות MCJB ו-MCJC; מהדורות On-Premise מ-1709 ועד 2025 FPS01, Private Cloud מ-2023 FPS02, והרשימה " +
          "מדפיסה גם S36=2602 ו-S37=2608; קישור התיעוד מפנה לנושא 26ffbe0266bb4df3bd4d172a837af583 (Technical Object " +
          "Breakdowns).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Object Damages | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/4c2ed6693dd24ab18615a61632a24b2b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 4c2ed6693dd24ab18615a61632a24b2b, deliverable 40374871, build 1780, נקרא ב-2026-09-28): " +
          "'With this app, you can see which damages occur frequently and find the technical object parts that cause " +
          "them'; תחת Key Features: 'View the number of damages as a chart or table', 'View the number of causes, " +
          "activities, and technical object parts in the Key Performance Indicator (KPI) tags and cards', סינון לפי " +
          "'Maintenance Plant , Object Type , Construction Type , and Catalog Profile', 'View damages based on object " +
          "part code groups', 'This app uses the c_damageanalysisquery Core Data Services (CDS) view' ו-'This " +
          "analytical app only takes current data into account'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Technical Object Damages (F3075), S/4HANA 2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3075')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "לפי scripts/fal-app.mjs F3075 (S32OP, ‏2026-09-28): 'Technical Object Damages', ‏Analytical / SAP Fiori " +
          "elements, ‏Published, רכיב PM-FIO-ANA; אותם ארבעה תפקידים ואותם קטלוגים עסקיים כמו F2812; intent " +
          "MaintenanceObject-displayDamageAnalysis; שירות OData‏ C_DAMAGEANALYSISQUERY_CDS; טרנזקציית GUI מובילה MCI5; " +
          "מהדורות On-Premise מ-1809 ועד 2025 FPS01, Private Cloud מ-2023 FPS02, והרשימה מדפיסה גם S36=2602 ו-S37=2608; " +
          "קישור התיעוד מפנה לנושא 4c2ed6693dd24ab18615a61632a24b2b.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MTTR/MTBR Evaluation | Components of the Logistics Information System (LIS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/403655493b024be6af15811c1d6962ef/c710c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio c710c453f57eb44ce10000000a174cb4, deliverable 40374544, נקרא ב-2026-09-28): 'You can execute " +
          "an evaluation for equipments and functional locations with regard to the key figures Mean Time to Repair " +
          "(MTTR) and Mean Time between Repair (MTBR)'; 'You can also update information structure S070 within this " +
          "evaluation. The key figure values are read directly from the notification database'; לכל אובייקט טכני ולכל " +
          "תקופה: 'Number of breakdowns Length of downtime Mean Time to Repair Mean Time between Repair'; ובסטטיסטיקה " +
          "החודשית גם 'Number of breakdowns recorded', 'Number of actual breakdowns' ו-'Total downtime in month'; העמוד " +
          "מציין ש-'number of actual breakdowns' שונה מ-'number of breakdowns reported' כאשר שתי תקלות חופפות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 · item 4.1.13 S4TWL - LIS in EAM, pp. 86-88 (PDF, נקרא בטקסט המחולץ)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "הפריט (Application Component: PM-IS), כפי שנקרא ב-2026-09-28 בטקסט המחולץ " +
          "scratchpad/official/SIMPL_OP2025.pdf.txt: 'The plant maintenance information system is part of the logistics " +
          "information system LIS'; 'The LIS can be used to evaluate Equipments, Functional Locations , Notifications " +
          "and Order'; 'Future plant maintenance analytics will be based on HANA, CDS views aggregating transactional " +
          "data dynamically'; 'Invest reasonably in the LIS. The LIS is intended as an interim solution'; דוחות מותאמים " +
          "הקוראים בין היתר מ-S065 Object statistics ומ-S070 Breakdown statistics 'will not work after the update of " +
          "the LIS tables is switched off'; וחלופות: 'Analytical List Page for Technical Object Breakdown Analysis' " +
          "ו-'Technical Object Damages', ותצוגות CDS כגון I_FunctionalLocationData ו-I_MaintOrderTechObjCube.",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות table:EQUZ, tx:IE01, " +
      "tx:IL01, fm:BAPI_EQUI_INSTALL ו-fm:BAPI_EQUI_CREATE. שדה ה-KPI הושמט: המאגר אינו מתעד מדד מספרי לתהליך נתוני " +
      "האב של האובייקטים הטכניים. מזהי Fiori: F2730A נשאר מקושר כרשומת הקטלוג של הפרויקט, ורשומת האימות שלו מסמנת " +
      "סתירת מקורות; המזהים הרשמיים F2072, ‏W0029, ‏W0028 ו-F8669 אינם בקטלוג הפרויקט ולכן נשארים בפרוזה. טרנזקציות " +
      "ה-Customizing OIPK ו-OIPM והטבלה IFLOTX מופיעות ברשומות המאגר ואינן במילון הפרויקט. שמות ה-BAPI " +
      "BAPI_EQUI_DISMANTLE ו-BAPI_FUNCLOC_GETDETAIL מופיעים ברשומות התחום; לראשון אין רשומה במילון הפרויקט ולכן הוא " +
      "נשאר בפרוזה. לא בוצעה בדיקה במערכת SAP חיה. תוספת 2026-09-28 (backfill של שדות interfaces ו-kpis; שאר השדות " +
      "הועתקו כלשונם): Old → New: 'שדה ה-KPI הושמט: המאגר אינו מתעד מדד מספרי' → שדה ה-kpis מולא משלושה מקורות " +
      "רשמיים שנקראו בגוף העמוד: Technical Object Breakdowns ‏(F2812), ‏Technical Object Damages ‏(F3075) והערכת " +
      "MTTR/MTBR של ה-LIS, לצד הפריט 'S4TWL - LIS in EAM'. Old → New: 'המזהים הרשמיים F2072, ‏W0029, ‏W0028 ו-F8669 " +
      "אינם בקטלוג הפרויקט' → הם נוספו לקטלוג ב-2026-09-24 ומקושרים בשורות ה-interfaces; שורת " +
      "process.transactions[4] עודכנה בהתאם ומקשרת אותם, והמשפט הישן נשמר כאן כהיסטוריה. F2812 ו-F3075 אינם בקטלוג " +
      "ה-Fiori של הפרויקט ולכן בפרוזה בלבד; c_maintobjbreakdownquery, ‏c_damageanalysisquery, מבנה המידע S070, סוג " +
      "ההודעה EQUIPMENT_CREATE והסוג הבסיסי EQUIPMENT_CREATE02 וה-BAdI‏ BADI_ASM_MD_FUNCLOC אינם במילון הפרויקט " +
      "ולכן אינם מקושרים. חיפושים שרצו ב-2026-09-28 (scripts/sap-help-search.mjs, סקופ On-Premise אלא אם צוין): " +
      "'Technical Object Breakdowns analytical app' ו-'mean time between failures technical object' ו-'technical " +
      "object KPI Maintenance Management analytical' ו-'Technical Object Damages' (ארבע השאילתות האלה הוחזרו ריקות " +
      "בגלל שגיאת פענוח בסקריפט העזר ואינן נספרות כממצא), 'Technical Object Breakdowns' (21 רשומות), 'Technical " +
      "Object Damages' (21), 'IDoc equipment master data distribution ALE message type' (21, אף רשומה אינה נוקבת " +
      "ב-IDoc לציוד), 'EQUIPMENT_CREATE' (13), 'EQUIPMENT_CREATE IDoc' בסקופ SAP_ERP (21); ‏fal-app‏ F2812 ו-F3075 " +
      "על S32OP. פערים: לא אותר מקור רשמי ל-IDoc של מיקום פונקציונלי (לא נערך חיפוש ייעודי), ולא אותר מדד רשמי " +
      "לאיכות נתוני האב עצמם (שלמות היררכיה, ILOA); מדדי ה-KPI שנרשמו הם מדדי אמינות של האובייקט הטכני. לא בוצעה " +
      "בדיקה במערכת SAP חיה.",
  },

  /* ============================================ plant maintenance end to end */
  {
    slug: "plant-maintenance-end-to-end",
    he: "תחזוקת מפעל מקצה לקצה: מנתוני האב, דרך הודעה או תוכנית, ועד עלות ומדדים",
    en: "Plant maintenance end to end: from master data through notification or plan to cost and reliability metrics",
    module: "PM",
    summary:
      "המפה המלאה של תחזוקת המפעל: נתוני אב (אובייקטים טכניים, מרכזי עבודה, רשימות פעולות), טריגר (הודעת תקלה או " +
      "קריאה של תוכנית מונעת), פקודת תחזוקה, חלפים, ביצוע ואישור, סגירה טכנית, התחשבנות, ולבסוף ניתוח עלות " +
      "ואמינות. הרשומה מקשרת את שלושת התהליכים המפורטים ואת תהליך ההודעות.",
    context:
      "מפת התהליך של המאגר מונה חמישה שלבים: הודעה או תוכנית מונעת (IW21, ‏IP30; ‏QMEL, ‏MPLA, ‏MHIS), פקודת " +
      "תחזוקה (IW31, ‏IW32; ‏AUFK, ‏AFIH, ‏AFVC), חלפים (IW32, ‏ME53N, ‏MIGO; ‏RESB, ‏EBAN), ביצוע ואישור " +
      "(IW41, ‏IW42; ‏AFRU) והתחשבנות (KO88; ‏COBRB, ‏ACDOCA). לצד המסלול המתקן קיימים במאגר שני מסלולים " +
      "נוספים: תחזוקה מונעת מתוזמנת, וכיול משולב PM ו-QM שבו הפקודה מפיקה מנת בדיקה. ב-S/4HANA מודל הנתונים " +
      "נשמר, העלויות נרשמות ב-Universal Journal‏ (ACDOCA) והחוויה עוברת ל-Fiori בעוד ה-GUI נשאר קיים.",
    steps: [
      {
        he: "להקים את נתוני האב: מיקומים פונקציונליים וציוד עם ILOA, מרכזי עבודה עם שיוך מרכז עלות, רשימות פעולות כתבניות וחומרי חלפים.",
        xrefs: ["table:IFLOT", "table:EQUI", "table:CRHD", "table:PLKO", "bp:technical-objects-process"],
      },
      {
        he: "לפתוח את התהליך: הודעת תחזוקה מהשטח, או קריאה של תוכנית תחזוקה מונעת שהגיע מועדה.",
        xrefs: ["tx:IW21", "table:QMEL", "tx:IP30", "tx:IP30H", "table:MPLA", "bp:maintenance-notification-process", "bp:preventive-maintenance-process"],
      },
      {
        he: "להמיר או ליצור פקודת תחזוקה, לתכנן פעולות ורכיבים ולשחרר אותה אחרי בדיקת זמינות ובדיקת היתרים.",
        xrefs: ["tx:IW31", "tx:IW32", "table:AUFK", "table:AFIH", "table:AFVC", "bp:maintenance-order-process"],
      },
      {
        he: "לטפל בחלפים: רכיב מלאי כרזרבציה ותנועת מלאי, רכיב לא מלאי כדרישת רכש שמובילה להזמנת רכש ולקבלה.",
        xrefs: ["table:RESB", "table:EBAN", "table:EBKN", "tx:ME51N", "tx:MIGO"],
      },
      {
        he: "לבצע ולאשר: שעות עבודה, צריכת חומרים, מדידות וזמן סיום התקלה בהודעה המקושרת.",
        xrefs: ["tx:IW41", "tx:IW42", "table:AFRU", "table:IMRG"],
      },
      {
        he: "לסגור טכנית (TECO) ולסגור את ההודעה המקושרת רק אחר כך.",
        xrefs: ["tx:IW32", "table:JEST", "table:QMEL"],
      },
      {
        he: "להתחשבן ולסגור עסקית: העברת העלות ליעד לפי כלל ההתחשבנות, ובדיקת יתרה אפס.",
        xrefs: ["tx:KO88", "tx:CO88", "table:COBRB", "table:ACDOCA"],
      },
      {
        he: "במסלול הכיול: הפקודה עם מפתח בקרה לבדיקה מפיקה מנת בדיקה, ומשם רישום תוצאות והחלטת שימוש המעדכנת את סטטוס המכשיר.",
        xrefs: ["tx:QE11", "tx:QA11", "table:PLMK", "table:EQUI"],
      },
      {
        he: "לנתח: מערכת המידע PMIS ‏(MCI*) ורשימות העבודה להודעות ולפקודות, ומדדי האמינות MTBF ו-MTTR הנגזרים מזמני התקלה בהודעה.",
        xrefs: ["tx:MCI3", "tx:MCI7", "tx:IW28", "tx:IW29", "tx:IW38", "tx:IW39"],
      },
      {
        he: "ב-S/4HANA: אותה שרשרת עם תצוגות CDS ויישומי Fiori לניטור ולביצוע, והרישום הכספי ב-Universal Journal.",
        xrefs: ["cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification", "fiori:F2828", "fiori:F4604", "table:ACDOCA"],
      },
      {
        he: "לסגור את הלולאה: ניתוח קודי הקטלוג ומדדי האמינות מזין את החלטת משטר התחזוקה, ומשנה את התוכניות המונעות ואת רשימות הפעולות.",
        xrefs: ["table:QMFE", "table:QMUR", "table:MPLA", "bp:preventive-maintenance-process"],
      },
    ],
    antiPatterns: [
      "תחזוקה שמתחילה בפקודה בלי הודעה כאשר נדרש תיעוד תקלה: קודי הקטלוג וזמני ההשבתה חסרים והניתוח מתרוקן.",
      "פקודה בלי אובייקט ייחוס: ההיסטוריה והעלות אינן נצברות לנכס (תקרית equipment-not-in-order).",
      "סגירת הודעה לפני TECO של הפקודה המקושרת: הסגירה נחסמת (תקרית notification-cant-close).",
      "התחשבנות שנדחית לסוף הרבעון: עלות נשארת בפקודות ותקופות נסגרות בינתיים (תקרית settlement-error).",
      "מדידה של זמינות בלי Malfunction Start ו-End ובלי סימון Breakdown: מדדי MTTR ו-MTBF יוצאים שגויים (תקרית downtime-not-recorded).",
    ],
    checks: [
      "חיובי: מחזור מלא מהודעה עד התחשבנות מסתיים בלי פריטים פתוחים, והעלות מופיעה ביעד.",
      "שלילי: פקודה עם היתר פתוח אינה משתחררת, והודעה עם משימות פתוחות אינה נסגרת.",
      "אינטגרציה: קריאה של תוכנית מונעת מייצרת פקודה במועד, והפקודה יורשת את פעולות רשימת הפעולות.",
      "רגרסיה: אחרי המרה ל-S/4HANA המחזור המלא רץ וההתחשבנות מגיעה ל-ACDOCA.",
      "אנליטיקה: זמני התקלה בהודעה מייצרים ערכי MTTR ו-MTBF במערכת המידע.",
    ],
    process: {
      purpose:
        "לתת תמונה אחת של תחזוקת המפעל מקצה לקצה: מנתוני האב שעליהם נשען הכול, דרך הטריגר, הפקודה, החלפים, " +
        "הביצוע והסגירה, ועד העלות והמדדים שמזינים בחזרה את משטר התחזוקה.",
      trigger: [
        { he: "תקלה בלתי מתוכננת: הודעת תקלה עם סימון Breakdown ופקודה דחופה.", xrefs: ["tx:IW21", "table:QMEL", "bp:maintenance-notification-process"] },
        { he: "מועד מתוכנן: קריאה של תוכנית תחזוקה מונעת בתוך אופק הקריאה.", xrefs: ["tx:IP30", "tx:IP30H", "table:MHIO", "bp:preventive-maintenance-process"] },
        { he: "מועד כיול: תוכנית כיול המפיקה פקודה עם מפתח בקרה לבדיקה.", xrefs: ["tx:IP01", "table:PLMK"] },
      ],
      preconditions: [
        { he: "אובייקטים טכניים מוקמים עם היררכיה ועם ILOA נכון.", xrefs: ["table:IFLOT", "table:EQUI", "table:ILOA", "bp:technical-objects-process"] },
        { he: "מרכזי עבודה פעילים עם קיבולת ועם שיוך מרכז עלות וסוג פעילות.", xrefs: ["table:CRHD", "table:CRCO"] },
        { he: "סוגי הודעה עם פרופיל קטלוג, וסוגי פקודה עם פרמטרי תכנון והתחשבנות.", xrefs: ["tx:OIM1", "tx:QS41", "table:AUFK"] },
        { he: "תקופות הרישום של MM ושל CO ו-FI פתוחות.", xrefs: ["tx:OB52"] },
      ],
      masterData: [
        { he: "אובייקטים טכניים: מיקומים פונקציונליים, ציוד, מספרים סידוריים ונקודות מדידה.", xrefs: ["table:IFLOT", "table:EQUI", "table:EQUZ", "table:IMPTT"] },
        { he: "מרכזי עבודה, רשימות פעולות ועצי מוצר של הציוד.", xrefs: ["table:CRHD", "table:PLKO", "table:PLPO", "table:MAST"] },
        { he: "תוכניות תחזוקה ופריטיהן, ואסטרטגיות המחזור.", xrefs: ["table:MPLA", "table:MPOS", "obj:maintenance-plan"] },
        { he: "חומרי חלפים, וכללי התחשבנות ליעד הכספי.", xrefs: ["table:MARA", "table:COBRB"] },
      ],
      roles: [
        { he: "מפעיל או טכנאי שטח: פתיחת הודעה, ביצוע ודיווח.", xrefs: ["fiori:F1511", "fiori:F5104A"] },
        { he: "מתכנן תחזוקה: סינון וקבלת בקשות, תכנון ושחרור פקודות, וניטור התכנון.", xrefs: ["fiori:F4604", "fiori:F2828"] },
        { he: "צוות אב נתונים ויועץ PM: הקמת האובייקטים הטכניים וה-Customizing שלהם, לפי רשומות נתוני האב של המאגר." },
        { he: "בקרת עלויות: התחשבנות תקופתית וסגירה עסקית.", xrefs: ["tx:KO88", "tx:CO88"] },
      ],
      transactions: [
        { he: "הודעות: IW21 עד IW29.", xrefs: ["tx:IW21", "tx:IW22", "tx:IW23", "tx:IW28", "tx:IW29"] },
        { he: "פקודות: IW31, IW32, IW33, IW38 ו-IW39; אישורים: IW41, IW42 ו-IW45.", xrefs: ["tx:IW31", "tx:IW32", "tx:IW33", "tx:IW38", "tx:IW39", "tx:IW41", "tx:IW42", "tx:IW45"] },
        { he: "תחזוקה מונעת: IP01, IP10, IP30 ו-IP30H; אובייקטים טכניים: IL01, IE01, IE4N, IH01 ו-IH08.", xrefs: ["tx:IP01", "tx:IP10", "tx:IP30", "tx:IP30H", "tx:IL01", "tx:IE01", "tx:IE4N", "tx:IH01", "tx:IH08"] },
        { he: "חלפים וכספים: ME51N, MIGO, MB1A, KO88 ו-CO88; אנליטיקה: MCI3, MCI7 ו-MCI8.", xrefs: ["tx:ME51N", "tx:MIGO", "tx:MB1A", "tx:KO88", "tx:CO88", "tx:MCI3", "tx:MCI7", "tx:MCI8"] },
        { he: "כיול: QE11 לרישום תוצאות ו-QA11 להחלטת שימוש.", xrefs: ["tx:QE11", "tx:QA11"] },
      ],
      tables: [
        { he: "הודעה: QMEL, QMFE, QMUR, QMMA ו-QMSM.", xrefs: ["table:QMEL", "table:QMFE", "table:QMUR", "table:QMMA", "table:QMSM"] },
        { he: "פקודה: AUFK, AFIH, AFKO, AFVC, AFRU ו-RESB; סטטוסים ב-JEST.", xrefs: ["table:AUFK", "table:AFIH", "table:AFKO", "table:AFVC", "table:AFRU", "table:RESB", "table:JEST"] },
        { he: "תחזוקה מונעת: MPLA, MPOS, MHIS ו-MHIO; אובייקטים טכניים: IFLOT, IFLOS, ILOA, EQUI, EQKT ו-EQUZ.", xrefs: ["table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO", "table:IFLOT", "table:IFLOS", "table:ILOA", "table:EQUI", "table:EQKT", "table:EQUZ"] },
        { he: "כספים ורכש: COBRB, ACDOCA, COSP, COSS, EBAN ו-EBKN.", xrefs: ["table:COBRB", "table:ACDOCA", "table:COSP", "table:COSS", "table:EBAN", "table:EBKN"] },
        { he: "האובייקטים העסקיים של התהליך ותצוגות ה-CDS שלהם.", xrefs: ["obj:maintenance-notification", "obj:maintenance-order", "obj:maintenance-plan", "cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification", "cds:I_MaintenancePlan"] },
      ],
      integrationPoints: [
        { he: "PM אל MM: רזרבציות, תנועות מלאי, דרישות רכש והזמנות רכש לחלפים.", xrefs: ["table:RESB", "table:EBAN", "tx:MIGO"] },
        { he: "PM אל CO ו-FI: התחשבנות הפקודה ליעד; ב-S/4HANA הרישום ב-Universal Journal.", xrefs: ["table:COBRB", "table:ACDOCA"] },
        { he: "PM אל QM: פקודה עם מפתח בקרה לבדיקה יוצרת מנת בדיקה, והחלטת השימוש מעדכנת את סטטוס המכשיר.", xrefs: ["tx:QE11", "tx:QA11", "table:PLMK"] },
        { he: "PM אל אנליטיקה: מערכת המידע PMIS, וב-S/4HANA תצוגות CDS ויישומי ניטור.", xrefs: ["tx:MCI3", "cds:I_MaintenanceOrder", "fiori:F2828"] },
        { he: "הרחבות לאורך השרשרת: QQMA0001 בהודעה, IWO10009 בפקודה, CONFPM01 באישור, ו-BAdIs‏ NOTIF_EVENT_SAVE ו-WORKORDER_UPDATE.", xrefs: ["enh:exit:QQMA0001", "enh:exit:IWO10009", "enh:exit:CONFPM01", "enh:badi:NOTIF_EVENT_SAVE", "enh:badi:WORKORDER_UPDATE"] },
      ],
      interfaces: [
        { he: "פקודה, ECC ו-S/4HANA לפי רשומת ההעשרה של המאגר: BAPI_ALM_ORDER_MAINTAIN על האובייקט BUS2007 מעבד את הפקודה דרך טבלת השיטות IT_METHODS, ברצף HEADER / OPERATION / COMPONENT, אחר כך RELEASE, אישור ב-BAPI_ALM_CONF_CREATE, אחר כך TECHNICALCOMPLETE ולבסוף BAPI_TRANSACTION_COMMIT; קריאה בלבד ב-BAPI_ALM_ORDER_GET_DETAIL. תיעוד What's New של S/4HANA 2023 FPS02 מתאר עיבוד פקודות גם דרך ה-BAPI וגם דרך ה-API מבוסס ה-RAP‏ Maintenance Order (Version 2), זה לצד זה.", xrefs: ["obj:maintenance-order", "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline", "bp:maintenance-order-process"] },
        { he: "פקודה, S/4HANA 2025 FPS01: שירות ה-OData‏ Maintenance Order (Version 2), בשם הטכני API_MAINTENANCEORDER_0002, מאפשר ליצור, לקרוא, לעדכן ולמחוק נתוני פקודה; העמוד 'Maintenance Order (Deprecated)' באותה חוברת קובע שה-API הקודם בוטל (deprecated) ב-S/4HANA 2023. מפת התהליך של המאגר נוקבת ב-API_MAINTENANCEORDER בשלב הפקודה; לפי העמוד 'Maintenance Order (Deprecated)' זהו השם הטכני של ה-API שבוטל ב-S/4HANA 2023, ולכן לבחון את API_MAINTENANCEORDER_0002 לממשק חדש.", xrefs: ["obj:maintenance-order", "cds:I_MaintenanceOrder"] },
        { he: "הודעה: BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_NOTIF_SAVE, ואחריהם BAPI_TRANSACTION_COMMIT לפי רשומת ההעשרה של המאגר; בתיעוד Data Migration של 2025 FPS01 שני ה-BAPI נקובים באובייקט ההגירה 'PM - Maintenance notification'; ב-S/4HANA 2025 FPS01 שירות ה-OData‏ API_MAINTNOTIFICATION מציע קריאה (GET), יצירה (POST) ועדכון (PATCH). הפירוט המלא ברשומת תהליך ההודעה.", xrefs: ["obj:maintenance-notification", "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_TRANSACTION_COMMIT", "bp:maintenance-notification-process"] },
        { he: "ביצוע ואישור, S/4HANA: שירות ה-OData‏ API_MAINTORDERCONFIRMATION יוצר אישורי פקודה ומבטל אותם, ולפי חוברת ה-API יש לקרוא קודם ל-API של ניהול המלאי לניקוי הרזרבציות ורק אחר כך לדווח זמן דרכו. ב-ECC וב-S/4HANA, לפי רשומות המאגר, האישור התוכניתי הוא BAPI_ALM_CONF_CREATE בזיקה ל-IW41 ול-AFRU.", xrefs: ["fm:BAPI_ALM_CONF_CREATE", "tx:IW41", "table:AFRU"] },
        { he: "חלפים (PM אל MM), לפי רשומת התחום 'אינטגרציית חלפים': BAPI_RESERVATION_CREATE1, ‏BAPI_PR_CREATE ו-BAPI_GOODSMVT_CREATE. ב-S/4HANA 2025 FPS01 מתועדים לצידם שירותי OData: API_MATERIAL_DOCUMENT_SRV ליצירה ולביטול של מסמכי חומר, הישות A_ReservationDocumentHeader ליצירת רזרבציה ב-POST, ו-API_PURCHASEREQ_PROCESS_SRV לדרישת רכש; הרשומות אינן מציגות אותם כמחליפים של ה-BAPI. פריט הפישוט 'S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM' מפנה את טרנזקציות ה-MB, בהן MB1A, אל MIGO או אל BAPI_GOODSMVT_CREATE.", xrefs: ["fm:BAPI_RESERVATION_CREATE1", "fm:BAPI_PR_CREATE", "fm:BAPI_GOODSMVT_CREATE", "obj:reservation", "obj:material-document", "table:RESB", "table:EBAN", "tx:MB1A", "tx:MIGO"] },
        { he: "תחזוקה מונעת, S/4HANA: שירות ה-OData‏ API_MAINTENANCEPLAN (קריאה, יצירה ושינוי של תוכניות, חדש ב-2021) ו-API_MAINTENANCEITEM (יצירה ועדכון של פריטים); ב-2025 FPS01 נוספה ל-API_MAINTENANCEPLAN הפעולה Release Maintenance Call. השם BAPI_MAINTENANCEPLAN_CREATE נושא ברשומת האימות סטטוס verification_required ושכבות מאגר סותרות, ולכן לא לבנות עליו ממשק לפני בדיקה ב-SE37 במערכת היעד.", xrefs: ["obj:maintenance-plan", "cds:I_MaintenancePlan", "fm:BAPI_MAINTENANCEPLAN_CREATE", "tx:SE37", "bp:preventive-maintenance-process"] },
        { he: "אובייקטים טכניים ומדידות: BAPI_EQUI_CREATE ו-BAPI_FUNCLOC_CREATE לפי רשומות ההעשרה, ומסמך מדידה דרך MEASUREM_DOCUM_RFC_SINGLE_001, שתיעוד 2025 FPS01 מתאר כ-RFC ליצירת מסמכי מדידה, ובין פרמטריו CREATE_NOTIFICATION (ייבוא) ו-NOTIFICATION (ייצוא); ב-S/4HANA 2025 FPS01 שירותי ה-OData‏ API_EQUIPMENT ו-API_FUNCTIONALLOCATION לקריאה, ליצירה ולעדכון.", xrefs: ["obj:equipment", "obj:functional-location", "obj:measuring-point", "fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE", "fm:MEASUREM_DOCUM_RFC_SINGLE_001", "table:IMRG", "bp:technical-objects-process"] },
        { he: "התחשבנות: הרשומות שנבדקו אינן נוקבות ב-BAPI להתחשבנות הפקודה. K_ORDER_SETTLEMENT מופיע ברשומת קטלוג הפונקציות של המאגר (קלט פקודה ותקופה) ונושא ברשומת האימות סטטוס verification_required; לפי העמוד 'Settlement Methods' לגרסת S/4HANA 2025 FPS01, להתחשבנות פרטנית של הזמנות משמשים KO88 או היישום Run Settlement - Actual‏ (F4568), שאינו במילון הפרויקט.", xrefs: ["fm:K_ORDER_SETTLEMENT", "tx:KO88", "table:COBRB"] },
        { he: "אירועים עסקיים, S/4HANA: לפי What's New 2022 האובייקט Maintenance Order מפעיל אירועים כאשר הפקודה מגיעה לתת-שלב או לסטטוס מערכת מסוים, והם מופעלים רק כאשר פריטי ההיקף 4HH ו-4HI פעילים או כאשר מודל השלבים הוגדר ב-Customizing; לפי What's New 2021 האובייקט Maintenance Order Operation Confirmation מפעיל את האירועים Created ו-Canceled.", xrefs: ["obj:maintenance-order"] },
        { he: "IDoc, S/4HANA 2025 FPS01 (תיעוד Production Planning and Control): בשילוב עם MES, פקודות תחזוקה מופצות בשחרור דרך IDoc IORDER_01 בתנאי מודל הפצה עם המימוש היוצא 468_1, ושינויים בפקודה שהופצה נשלחים גם הם; ה-MES מדווח השבתת ציוד והמערכת יוצרת הודעה ופקודה. IORDER_01 אינו במילון הפרויקט ולכן אינו מקושר.", xrefs: ["obj:maintenance-order", "obj:maintenance-notification"] },
      ],
      outputs: [
        { he: "הודעות, פקודות ואישורים מתועדים, עם היסטוריה לכל אובייקט טכני.", xrefs: ["table:QMEL", "table:AUFK", "table:AFRU"] },
        { he: "עלות תחזוקה מותחשבנת ליעד הכספי, וב-S/4HANA רישום ב-ACDOCA.", xrefs: ["table:COBRB", "table:ACDOCA"] },
        { he: "בסיס נתונים לניתוח אמינות ותקלות חוזרות: זמני תקלה וקודי קטלוג.", xrefs: ["table:QMFE", "table:QMUR"] },
      ],
      exceptions: [
        { he: "שרשרת חסומה בשחרור: היתר פתוח או כשל בבדיקת זמינות (תקריות order-wont-release ו-permit-not-auto-assigned)." },
        { he: "שרשרת חסומה בסגירה: TECO עם אישורים פתוחים, או הודעה שלא נסגרת לפני TECO (תקריות teco-blocked ו-notification-cant-close).", xrefs: ["table:JEST", "table:QMSM"] },
        { he: "שרשרת חסומה בכסף: כלל התחשבנות חסר, תקופה סגורה או חריגת תקציב (תקריות settlement-error ו-maint-order-budget).", xrefs: ["table:COBRB"] },
        { he: "שרשרת מונעת שאינה מייצרת עבודה: תוכנית לא מתוזמנת או אופק קריאה קצר (תקריות plan-no-orders ו-maint-plan-no-call-horizon).", xrefs: ["table:MHIS"] },
        { he: "מדדים שגויים: זמני השבתה לא נרשמו (תקרית downtime-not-recorded).", xrefs: ["table:QMEL"] },
      ],
      controls: [
        { he: "הודעה לפני פקודה כאשר יש תקלה, כדי שקודי הקטלוג וזמני ההשבתה ייאספו.", xrefs: ["table:QMEL", "table:QMFE"] },
        { he: "אובייקט ייחוס חובה בהודעה ובפקודה, כדי שההיסטוריה והעלות ייצברו לנכס.", xrefs: ["table:AFIH", "table:EQUI"] },
        { he: "סדר הסגירה: אישורים, TECO, סגירת ההודעה, התחשבנות וסגירה עסקית.", xrefs: ["tx:IW32", "tx:KO88"] },
        { he: "התחשבנות תקופתית מרוכזת ולא רק פרטנית, ובדיקת יתרה אפס.", xrefs: ["tx:CO88", "table:COBRB"] },
        { he: "סקירה תקופתית של מדדי האמינות כדי לכוון את משטר התחזוקה המונעת.", xrefs: ["tx:MCI7", "table:MPLA"] },
      ],
      kpis: [
        { he: "MTBF (זמן ממוצע בין תקלות) ו-MTTR (זמן תיקון ממוצע), לפי רשומת התחום 'אנליטיקה ומדדי PM'.", xrefs: ["table:QMEL"] },
        { he: "עלות תחזוקה לפי אובייקט ולפי אתר, הנגזרת מגלגול העלויות בפקודה ומההתחשבנות.", xrefs: ["table:AUFK", "table:COBRB"] },
        { he: "עומס פתוח ברשימות העבודה: IW28 ו-IW29 להודעות, IW38 ו-IW39 לפקודות, ומערכת המידע PMIS ‏(MCI*).", xrefs: ["tx:IW28", "tx:IW29", "tx:IW38", "tx:IW39", "tx:MCI3"] },
        { he: "ניתוח Pareto של קודי פגם וסיבה לזיהוי תקלות חוזרות.", xrefs: ["table:QMFE", "table:QMUR"] },
      ],
      eccToS4: [
        { he: "מחזור ההודעה, הפקודה, האישור וההתחשבנות זהה לוגית ב-ECC וב-S/4HANA לפי מדריך התהליך ולפי נושאי המעבר של המאגר.", xrefs: ["table:QMEL", "table:AUFK", "table:AFRU"] },
        { he: "העלויות עוברות ל-Universal Journal‏ (ACDOCA), ופריט הפישוט של היומן האוניברסלי מייתר התאמה נפרדת.", xrefs: ["table:ACDOCA"] },
        { he: "חוויית המשתמש עוברת ל-Fiori וה-GUI נשאר קיים; מדדי האמינות עוברים ל-Embedded Analytics לפי מדריך התהליך.", xrefs: ["fiori:F4604", "fiori:F2828"] },
        { he: "תחזוקה מונעת: IP30 מכוסה בפריט פישוט המפנה את התזמון ההמוני ל-IP30H.", xrefs: ["tx:IP30", "tx:IP30H", "bp:preventive-maintenance-process"] },
        { he: "אובייקטים טכניים: מבנה נתונים זהה ברובו בתוספת תצוגות CDS ויישומי Fiori, וההשפעה מוגדרת כמינימלית ברשומת נושא המעבר.", xrefs: ["cds:I_Equipment", "cds:I_FunctionalLocation", "bp:technical-objects-process"] },
      ],
      migration: [
        { he: "סט הטבלאות היציבות של שכבת ההשפעה מונה את EQUI, IFLOT, IFLOS, ILOA, CRHD, AFIH, AFKO, AFVC, AFRU, AUFK, JEST, OBJK, QMEL, QMFE, PLKO ו-PLPO כיציבות ב-S/4HANA.", xrefs: ["table:EQUI", "table:AUFK", "table:QMEL", "table:PLKO"] },
        { he: "בדיקת הקבלה המרכזית היא מחזור מלא אחרי ההמרה: הודעה, פקודה, שחרור, אישור, TECO והתחשבנות אל ACDOCA.", xrefs: ["table:ACDOCA"] },
        { he: "בדיקות נלוות: היררכיית האובייקטים ו-ILOA, תזמון התוכניות ויצירת הקריאות, ומדדי הזמינות מזמני התקלה.", xrefs: ["table:ILOA", "table:MHIS", "table:QMEL"] },
      ],
      reference: {
        title: "Overview of Maintenance Management | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b97cb6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד הסקירה של רכיב Maintenance Management (loio b97cb6535fe6b74ce10000000a174cb4, ‏2025.001), שגופו נקרא דרך שירות התוכן ב-2026-09-28: הוא מונה את פעילויות התחזוקה (Inspection, ‏Preventive maintenance, ‏Repair) ואת האינטגרציה עם MM, ייצור, SD, משאבי אנוש ו-CO, למשל דרישת רכש לחומר לא מלאי. זו סקירת רכיב ולא תיאור צעד אחר צעד; פירוט השלבים נמצא ברשומות התהליך המקושרות. העמוד 'Phase-Based Maintenance Process' נוקב בפריטי ההיקף 4HH ו-4HI לתהליך מבוסס השלבים וב-BH1, ‏BH2 ו-BJ2 לדרך שבה התהליך רץ לפני כן; אף רשומה שנבדקה אינה קובעת פריט SAP Best Practices אחד לתחזוקה מקצה לקצה, ולכן לא נרשם פריט היקף כהפניה.",
      },
    },
    xrefs: [
      "obj:maintenance-notification", "obj:maintenance-order", "obj:maintenance-plan",
      "table:QMEL", "table:AUFK", "table:AFIH", "table:AFRU", "table:RESB", "table:COBRB", "table:ACDOCA",
      "table:MPLA", "table:MHIS", "table:IFLOT", "table:EQUI", "table:ILOA", "table:PLKO",
      "tx:IW21", "tx:IW31", "tx:IW41", "tx:IP30", "tx:IP30H", "tx:KO88", "tx:CO88", "tx:MCI7",
      "cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification", "cds:I_MaintenancePlan",
      "fiori:F1511", "fiori:F4604", "fiori:F2828", "fiori:F5104A",
      "bp:maintenance-notification-process", "bp:maintenance-order-process",
      "bp:preventive-maintenance-process", "bp:technical-objects-process",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'ניהול אחזקה (EAM)' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "חמישה שלבים עם טרנזקציות, טבלאות, יישומי Fiori, ממשקים ותקריות לכל שלב: הודעה או תוכנית מונעת (IW21, IP30; " +
          "QMEL, MPLA, MHIS; Create Maintenance Request; plan-no-orders, downtime-not-recorded), פקודת תחזוקה (IW31, " +
          "IW32; AUFK, AFIH, AFVC; API_MAINTENANCEORDER; order-wont-release, permit-not-auto-assigned, " +
          "equipment-not-in-order), חלפים (IW32, ME53N, MIGO; RESB, EBAN; pm-cost-no-activity-type), ביצוע ואישור " +
          "(IW41, IW42; AFRU; confirm-period-closed) והתחשבנות (KO88; COBRB, ACDOCA; settlement-error, teco-blocked).",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#maintenance-management",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום של PM בפרויקט (DOMAINS): 'אחזקת שבר', 'ביצוע אחזקה', 'אינטגרציית חלפים' ו'אנליטיקה ומדדי PM'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תחזוקת שבר: תקלה, הודעה עם סימון Breakdown, פקודה דחופה, תיקון ואישור, וניתוח MTTR ו-MTBF (QMEL, QMIH, AUFK, " +
          "AFIH; IW21, IW31, IW41, IW28, MCI7). ביצוע תחזוקה: מחזור הפקודה מהודעה ועד TECO עם הסטטוסים CRTD, REL, CNF, " +
          "TECO ו-CLSD. אינטגרציית חלפים: רכיבים, רזרבציה (RESB), דרישת רכש (EBAN, EBKN), משיכת חומר וצריכה בפקודה. " +
          "אנליטיקה: מערכת המידע PMIS ‏(MCI*) מבוססת מבני מידע, מדדי MTBF ו-MTTR, רשימות IW28, IW29, IW38 ו-IW39, " +
          "וב-S/4HANA אנליטיקה חיה דרך CDS ו-Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-analytics",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריכי התהליך של הפרויקט (PROCESS_GUIDES): 'אחזקת שבר', 'אחזקה מונעת' ו'כיול משולב PM-QM'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תחזוקת שבר מקצה לקצה: תקלה, הודעה, פקודה, תכנון ושחרור, ביצוע ואישור, TECO, התחשבנות וניתוח, עם הטעויות " +
          "השכיחות והנתיב לניפוי. תחזוקה מונעת מקצה לקצה: אסטרטגיה, תוכנית, פריט ורשימה, תזמון, ניטור ב-IP30, פקודה " +
          "אוטומטית וביצוע. כיול משולב: תוכנית כיול, פקודה עם מפתח בקרה לבדיקה, מנת בדיקה (QALS), רישום תוצאות ב-QE11, " +
          "החלטת שימוש ב-QA11 ועדכון סטטוס המכשיר ב-IE02; מאפייני הבדיקה נשמרים ב-PLMK.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-calibration-process",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושאי המעבר 'אובייקטי אחזקה' ו'הודעות תקלה (PM)' של הפרויקט (ECC_S4_TOPICS) ושכבת ההשפעה (S4_IMPACT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אובייקטי התחזוקה: מבנה נתונים זהה ברובו ב-S/4HANA בתוספת יישומי Fiori ותצוגות CDS, וההשפעה מינימלית עם GUI " +
          "שנתמך. הודעות התקלה: אותו מודל נתונים, UX מבוסס Fiori עם זרימה מובנית להזמנה, והתהליך זהה לוגית. סט " +
          "S4_STABLE של שכבת ההשפעה מונה את EQUI, IFLOT, IFLOS, ILOA, CRHD, CRTX, AFIH, AFKO, AFPO, AFVC, AFRU, AUFK, " +
          "JEST, JSTO, OBJK, QMEL, QMFE, PLKO, PLPO, MAPL, EQKT ו-EQUZ כיציבים ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#notifications-s4",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות נתוני האב של PM בפרויקט (PM_MASTER_DATA_FACETS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אחת עשרה רשומות נתוני אב עם מה, למה, מתי נוצר, בעלים, תלויות, טעויות שכיחות ודוגמה: ציוד (EQUI), מיקום " +
          "פונקציונלי (IFLOT), מרכז עבודה (CRHD), רשימת פעולות (PLKO), עץ מוצר (MAST), אב חומר (MARA), תוכנית תחזוקה " +
          "(MPLA), נקודת מדידה ומונה (IMPTT), הודעה (QMEL), פקודה (AUFK) ושותף עסקי (BUT000). רשומת הפקודה קובעת שהיא " +
          "נושאת העלות ושסוגי הפקודה מותאמי לקוח; רשומת ההודעה קובעת שההודעה מתעדת בלבד ושהפקודה מבצעת ונושאת עלות.",
        verificationLevel: "repository_verified",
        repoRef: "data/pm-master-data-facets.ts#AUFK",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: החתך הרוחבי של PM לאורך השרשרת",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "התקריות שמפת התהליך ורשומות התחום מפנות אליהן לאורך השרשרת: plan-no-orders ו-downtime-not-recorded " +
          "בטריגר; order-wont-release, permit-not-auto-assigned ו-equipment-not-in-order בפקודה; " +
          "pm-cost-no-activity-type ו-confirm-period-closed בביצוע; teco-blocked ו-settlement-error בסגירה " +
          "ובכסף; notification-cant-close בהודעה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#teco-blocked",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a Maintenance Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/c0146ece9f304378804fa395ac851f98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX2,
        claim:
          "'In the Manage Maintenance Orders app (F5241), you can create new maintenance orders of different " +
          "order types and use existing maintenance orders as a template.' (העמוד אינו מזכיר את IW31.) " +
          "(אומת ברשומת tx:IW31)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settlement Rule | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/99c8b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL15,
        claim:
          "תיעוד הזמנות התחזוקה והשירות לגרסת 2025 FPS01 קובע תחת 'Structure' שחוק ההתחשבנות מורכב מ-'Distribution " +
          "rules' ומ-'Settlement parameters for a sender object', ושלכל שולח התחשבנות מוקצים 'one or more " +
          "distribution rules'; העמוד מפנה ל-Customizing 'Define Settlement Rule, Time and Distribution Rule' תחת " +
          "Maintenance and Service Orders, Functions and Settings for Order Types. הסניפט אינו נוקב בשם הטבלה " +
          "COBRB. (אומת ברשומת table:COBRB)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 1 'Introduction to Plant Maintenance' ופרק 4 'Work Order Cycle'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "פרק 1 מציג את עולם התחזוקה, את המינוח החדש, את התפתחות אסטרטגיות התחזוקה לאורך זמן ואת ממשקי המשתמש " +
          "(SAP GUI, ‏SAP Business Client ו-SAP Fiori); פרק 4 מתעד את מחזור פקודת העבודה מהשאלות המקדימות, דרך " +
          "ההודעה והתכנון והבקרה, ועד ההשלמה. הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#1.3",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Overview of Maintenance Management | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b97cb6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio b97cb6535fe6b74ce10000000a174cb4) נקרא דרך שירות התוכן: 'This component contains the " +
          "functions for Plant Maintenance', והתחזוקה כוללת Inspection, ‏Preventive maintenance ו-Repair; תחת " +
          "Integration: בזכות האינטגרציה עם Materials Management, ‏Production, ‏Sales and Distribution, ‏Human " +
          "Resources Management ו-Controlling, תהליכים הדרושים לתחזוקה 'are triggered automatically in other areas (for " +
          "example, a purchase requisition for non-stock materials in Materials Management/Purchasing)'. העמוד אינו " +
          "נוקב בטרנזקציות, בטבלאות או בפריטי היקף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Phase-Based Maintenance Process | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/cb2e1f231724477bbbab7a1a71a1fe64.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio cb2e1f231724477bbbab7a1a71a1fe64) נקרא דרך שירות התוכן: בקשות ופקודות תחזוקה מעובדות לפי " +
          "תשעה שלבים; התהליך 'has been designed to be used within the functional scope of the Reactive Maintenance ( " +
          "4HH ) and Proactive Maintenance ( 4HI ) scope items that differs from how the maintenance process had been " +
          "run before (based on the scope items BH1 , BH2 and BJ2 )', והעיבוד לפי שלבים אפשרי רק כאשר פריטי ההיקף האלה " +
          "פעילים או כאשר מודל השלבים הוגדר ב-Customizing באותו אופן. סוג הפקודה קובע את השלבים. זהו תהליך S/4HANA; " +
          "העמוד אינו מתאר את הצד של ECC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order (Version 2) | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/c1457e0e539740a29932fbdcf36fea3c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "רשומת החיפוש (loio c1457e0e539740a29932fbdcf36fea3c, ‏2025.001) קובעת בתקציר: 'Maintenance Order (Version 2) " +
          "This service enables you to create, read, update and delete maintenance order data in an API call'. גוף " +
          "העמוד, שנקרא דרך שירות התוכן ב-2026-09-28, נוקב בשם הטכני API_MAINTENANCEORDER_0002, קובע שהשירות מבוסס על " +
          "פרוטוקול OData V2, ומונה ישויות כגון Maintenance Order Operation Phase Control (Version 2). שם ה-BAPI אינו " +
          "מופיע בעמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order (Deprecated) | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d3f02cfccf00407ab9776ea2ec2030d3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "רשומת החיפוש (loio d3f02cfccf00407ab9776ea2ec2030d3, ‏2025.001) נוקבת בתקציר ב-'Technical name: " +
          "API_MAINTENANCEORDER' ומפנה ל-'Maintenance Order - Read' תחת Additional Information. גוף העמוד, שנקרא דרך " +
          "שירות התוכן ב-2026-09-28, קובע 'Note This API was deprecated with SAP S/4HANA 2023' וממליץ לעבור " +
          "ל-'Maintenance Order (Version 2) ( API_MaintenanceOrder_002 )'; כתיב זה שונה מהשם הטכני " +
          "API_MAINTENANCEORDER_0002 שבעמוד של Version 2.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Evaluation of Maintenance Order Data Including Buffer | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS02",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/6bf41002c3dc4701aa525d0de9094417.html?locale=en-US&state=PRODUCTION&version=2023.002",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        accessedAt: DATE_FM_02,
        claim:
          "SAP מתעדת עיבוד פקודות הן דרך ה-BAPI‏ BAPI_ALM_ORDER_MAINTAIN והן דרך ה-API מבוסס ה-RAP‏ Maintenance Order " +
          "(Version 2)‏ ('via the BAPI BAPI_ALM_ORDER_MAINTAIN via the RAP-based API Maintenance Order (Version 2)', " +
          "כלשון הסניפט); שני הממשקים מתקיימים זה לצד זה. (אומת ברשומת fm:BAPI_ALM_ORDER_MAINTAIN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "בחוברת 'APIs for Maintenance Management' לגרסת S/4HANA On-Premise 2025 FPS01: 'The API_MAINTNOTIFICATION API " +
          "offers these operations', ובהן Read Maintenance Notification (GET), Create Maintenance Notification (POST) " +
          "ו-Update Maintenance Notification (PATCH) תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification. (אומת ברשומת fm:BAPI_ALM_NOTIF_SAVE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "אובייקט ההגירה 'PM - Maintenance notification' בתיעוד Data Migration לגרסת 2025 FPS01 נוקב " +
          "ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE תחת 'APIs/BAPIs', לצד מודול הפונקציה " +
          "CNV_PE_S4_PM_NOTIF_CREATE (כלשון הסניפט). הסניפט מונה את השמות בלבד ואינו מתאר את אופן השימוש בהם. (אומת " +
          "ברשומת fm:BAPI_ALM_NOTIF_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7d6c7de7b9234747978552d4ca44466b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE28,
        claim:
          "רשומות החיפוש (loio 7d6c7de7b9234747978552d4ca44466b, ‏2023.latest) מחזירות שני חלונות תקציר: 'Technical " +
          "name: API_MAINTORDERCONFIRMATION This synchronous inbound service enables you to create new maintenance " +
          "order confirmations and cancel confirmations', ו-'Users have to first call the Inventory management API to " +
          "clear reservations and then trigger time confirmation through this API'. שם ה-BAPI אינו מופיע בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Events | What's New in SAP S/4HANA 2022",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/701ecb10a8804ae48c2d08269b7337f9.html?locale=en-US&state=PRODUCTION&version=2022.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        accessedAt: DATE28,
        claim:
          "רשומת החיפוש (loio 701ecb10a8804ae48c2d08269b7337f9) קובעת בתקציר: 'New business events are raised for the " +
          "Maintenance Order business object when the maintenance order reaches a specific subphase or when a specific " +
          "system status is set', ובחלון נוסף: 'The system therefore triggers the maintenance order events only if the " +
          "scope items Reactive Maintenance (4HH) and Proactive Maintenance (4HI) are active or if you have configured " +
          "the phase model in Customizing'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation Events | What's New in SAP S/4HANA 2021",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/72cac18d95134727aff9fe426add88f3.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE28,
        claim:
          "רשומת החיפוש (loio 72cac18d95134727aff9fe426add88f3) קובעת בתקציר: 'With this feature you can enable the " +
          "maintenance order confirmation business object to trigger the following business events: Created Canceled'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/34a22e04c4f34e8bb92f842486066b70.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "גוף העמוד (loio 34a22e04c4f34e8bb92f842486066b70) נקרא דרך שירות התוכן: אינטגרציה בין Enterprise Asset " +
          "Management ל-MES; תנאי מוקדם 'a replication model that contains the outbound implementation for the " +
          "maintenance order (468_1)'; 'the orders are distributed to an MES by means of IDoc IORDER_01 when they are " +
          "released', ושינויים בפקודות שהופצו נשלחים גם הם; אחרי ההפצה השדות Functional Location, ‏Equipment, ‏Work " +
          "center ו-Maintenance Plant אינם פתוחים לקלט; בהשבתת ציוד ה-MES שולח הודעת אזהרה והמערכת 'reacts by creating " +
          "a maintenance notification and a maintenance order and releasing each to the MES'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Plan | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/880c79762567475fa24fdd9a0c41f500.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE28,
        claim:
          "רשומת החיפוש (loio 880c79762567475fa24fdd9a0c41f500) קובעת בתקציר: 'With the OData API Maintenance Plan " +
          "(API_MAINTENANCEPLAN), you can now perform the following operations: Release Maintenance Call'. שאר הפעולות " +
          "קטועות בתקציר ולא נקראו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData APIs: Maintenance Plan and Maintenance Item | What's New in SAP S/4HANA 2021 (וה-PDF המלא WN_OP2021_EN.pdf, נקרא במלואו)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/f41b3b527ca3460eb462b2fa2339bab5.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE_FM_22,
        claim:
          "רשומת What's New לגרסת S/4HANA 2021 קובעת: 'The OData API Maintenance Plan (API_MAINTENANCEPLAN) allows you " +
          "to query for maintenance plans, create new maintenance plans, or change existing maintenance plans' ו-'With " +
          "the OData API Maintenance Item (API_MAINTENANCEITEM), you can now create and update maintenance items'; " +
          "בטבלת הפרטים 'Type New' ו-'Available As Of SAP S/4HANA 2021'. הרשומה אינה נוקבת בשם BAPI כלשהו ואינה מציגה " +
          "את השירות כמחליף של מודול פונקציה. (אומת ברשומת fm:BAPI_MAINTENANCEPLAN_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Function Module MEASUREM_DOCUM_RFC_SINGLE_001 | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6770b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "עמוד מודול הפונקציה במדריך Maintenance Management למהדורת On-Premise 2025 FPS01: 'Task RFC Measurement " +
          "document: Individual processing, Create' ו-'This RFC enables the following remote calls for creating " +
          "measurement documents', בשני אופנים: Remote dialog ו-API without Dialog; בין פרמטרי הייבוא " +
          "MEASUREMENT_POINT, ‏READING_DATE, ‏RECORDED_VALUE ו-CREATE_NOTIFICATION, ובין פרמטרי הייצוא " +
          "MEASUREMENT_DOCUMENT ו-NOTIFICATION. (אומת ברשומת fm:MEASUREM_DOCUM_RFC_SINGLE_001)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Equipment (APIs for Maintenance Management)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d1e3c797d3f44120b552d0e64680e445.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_OBJ_24,
        claim:
          "התיעוד של APIs for Maintenance Management מפרט את שירות ה-OData‏ API_EQUIPMENT עם פעולות GET, POST ו-PATCH " +
          "על ה-entity Equipment (קריאה, יצירה, עדכון) ועל EquipmentLongText, כלומר API_EQUIPMENT מתועד ב-help.sap.com " +
          "כשירות לניהול נתוני ציוד. (אומת ברשומת obj:equipment)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Functional Location | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FN21,
        claim:
          "מדריך APIs for Maintenance Management לגרסת On-Premise 2025 FPS01 מתעד את השירות: 'Functional Location " +
          "Technical name: API_FUNCTIONALLOCATION', וקובע 'The service enables the following operations for the " +
          "functional location: Read functional location master data Create functional location master data Update " +
          "functional location master data Delete'. הרשומה אינה מציגה את השירות כמחליף של BAPI_FUNCLOC_CREATE. (אומת " +
          "ברשומת fm:BAPI_FUNCLOC_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Documents - Read, Create | APIs for Inventory",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/d4c919581bc30a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_14,
        claim:
          "שירות ה-OData‏ Material Documents - Read, Create מתועד למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
          "Inventory: 'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following operations for " +
          "material documents: Retrieve material documents, Create material documents, Cancel material documents at " +
          "header level'; נתיב היצירה POST " +
          "‎<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader. אף אחת מהרשומות אינה מציגה את " +
          "ה-API כמחליף של BAPI_GOODSMVT_CREATE. (אומת ברשומת fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Reservation Document | APIs for Inventory",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/9750e9a071de43a2a966d44449cc78b0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד הפעולה Create Reservation Document במדריך APIs for Inventory קובע בתקציר: 'To create reservation " +
          "documents, you use the http POST method on the A_ReservationDocumentHeader entity', ומביא דוגמת בקשה ליצירת " +
          "רזרבציה לחומר בסוג תנועה 201 עם מרכז העלות כפרמטר חובה. (אומת ברשומת fm:BAPI_RESERVATION_CREATE1)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Purchase Requisition | APIs for Sourcing and Procurement",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91af7f8d3acd47da90d33aaacfcd0d59/9fcd8bf3ff7644faa16c92a010e53fa1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "העמוד 'Operations for Purchase Requisition' לגרסת 2025 FPS01 קובע: 'Purchase requisition offers the " +
          "following operations', ובהן 'Create a purchase requisition Create POST', קריאה (GET) ועדכון (PATCH) תחת " +
          "הנתיב /sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader. העמוד אינו נוקב בשם ה-BAPI " +
          "ואינו מציג אותו כמוחלף. (אומת ברשומת fm:BAPI_PR_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE_FM_14,
        claim:
          "פריט 27.6 (עמ' 644-645) קובע שטרנזקציות ה-MB לרישום ולהצגה של תנועות סחורה, בהן MB1A, ‏'have been replaced " +
          "by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
          "BAPI_GOODSMVT_CANCEL', ובסעיף הפתרון מורה להחליף קוד לקוח הקורא ל-MB1A ודומיה בשימוש ב-BAPI_GOODSMVT_CREATE. " +
          "(אומת ברשומת fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settlement Methods | Controlling (CO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/4687d0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_23,
        claim:
          "עמוד 'Settlement Methods' במדריך Controlling (CO) לגרסת S/4HANA On-Premise 2025 FPS01 (loio " +
          "4687d0531d8b4208e10000000a174cb4), שגופו נקרא במלואו בדפדפן ב-2026-09-23, קובע: 'Individual settlement and " +
          "collective settlement are available for almost all sender objects', ולהזמנות: 'Use the Fiori app Run " +
          "Settlement - Actual app (F4568) or the classic SAP gui app Run Settlement - Orders - Actual (KO88) for " +
          "individual settlement to analyze settlement results in greater detail' ו-'Use the Fiori app Schedule " +
          "Overhead Accounting Jobs (F3767) with the job template Actual Settlement: Orders (SAP) or the classic SAP " +
          "gui app Run Settlement - Orders - Actual (Collective) (KO8GH) for collective settlement to process a large " +
          "number of sender objects'; ובהמשך: 'Collective settlement is generally used during period-end closing to " +
          "start settlement in the background'. העמוד מתאר גם חזרה על התחשבנות בתקופה ('You can repeat settlement for a " +
          "given period at any time') וביטול התחשבנות ('you can only reverse the last settlement for a sender'). אלה " +
          "ערוצי ההתחשבנות שהעמוד מתעד בגרסה זו; העמוד אינו נוקב במודול פונקציה כלשהו, אינו מזכיר את K_ORDER_SETTLEMENT " +
          "ואינו מציג אף ערוץ כיורש שלו. (אומת ברשומת fm:K_ORDER_SETTLEMENT)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment): BAPI_ALM_ORDER_MAINTAIN, ‏BAPI_ALM_ORDER_GET_DETAIL, ‏BAPI_ALM_CONF_CREATE, ‏BAPI_EQUI_CREATE, ‏BAPI_FUNCLOC_CREATE, ‏BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_NOTIF_SAVE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "BAPI_ALM_ORDER_MAINTAIN: פעולת כתיבה על BOR‏ BUS2007, מונחית שיטות דרך IT_METHODS, טרנזקציות IW31, ‏IW32 " +
          "ו-IW38, טבלאות AUFK, ‏AFIH, ‏AFVC, ‏AFVV ו-RESB, ורצף 'HEADER/OPERATION/COMPONENT', ‏'RELEASE', " +
          "‏BAPI_ALM_CONF_CREATE, ‏'TECHNICALCOMPLETE' ו-BAPI_TRANSACTION_COMMIT. ‏BAPI_ALM_ORDER_GET_DETAIL: קריאה על " +
          "BUS2007 (IW33). ‏BAPI_ALM_CONF_CREATE: אישור בזיקה ל-IW41, ‏IW42 ו-AFRU. ‏BAPI_EQUI_CREATE על EquipmentPM‏ " +
          "(IE01; ‏EQUI, ‏EQKT, ‏EQUZ, ‏ILOA) ו-BAPI_FUNCLOC_CREATE על FunctLocation‏ (IL01; ‏IFLOT, ‏ILOA), שניהם עם " +
          "BAPI_TRANSACTION_COMMIT. באותו קובץ, רצף הכתיבה הקנוני של הודעה (NOTIF_SEQ): BAPI_ALM_NOTIF_CREATE, " +
          "‏BAPI_ALM_NOTIF_DATA_ADD / DATA_MODIFY / DATA_DELETE, ‏BAPI_ALM_NOTIF_PUTINPROGRESS / CHANGEUSRSTAT / CLOSE, " +
          "‏BAPI_ALM_NOTIF_SAVE ואחריו BAPI_TRANSACTION_COMMIT.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'אינטגרציית חלפים (PM-MM)' של הפרויקט (DOMAINS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "הרשומה מונה את ה-BAPI‏ BAPI_RESERVATION_CREATE1, ‏BAPI_PR_CREATE ו-BAPI_GOODSMVT_CREATE, את הטבלאות RESB, " +
          "‏EBKN, ‏EBAN, ‏MAST ו-MARC ואת הזרימה: רכיבי פקודה, רזרבציה (RESB), דרישת רכש (EBAN), משיכת חומר (MB1A) " +
          "וצריכה בפקודה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-spare-parts",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות האימות של הפרויקט: fm:K_ORDER_SETTLEMENT ו-fm:BAPI_MAINTENANCEPLAN_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE28,
        claim:
          "רשומת fm:K_ORDER_SETTLEMENT נושאת סטטוס verification_required: בתשע הרצות חיפוש רשמיות (2026-09-23) אף כותרת " +
          "או תקציר אינם נוקבים בשם, ורשומת קטלוג הפונקציות מתארת התחשבנות פקודה עם קלט 'AUFNR + period' ועם KO88 " +
          "ו-KO8G; העמוד הרשמי 'Settlement Methods' שבה מפנה להתחשבנות הזמנות ב-F4568 או ב-KO88. רשומת " +
          "fm:BAPI_MAINTENANCEPLAN_CREATE נושאת סטטוס verification_required ושורת מאגר מסומנת conflicting_sources על " +
          "השם.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/functions.ts#fm:K_ORDER_SETTLEMENT",
      },
    ],
    lastVerifiedAt: DATE28,
    reviewer: "Design-audit continuation §11 (process catalog); Project NEO research pipeline (researcher + adversarial auditor), 2026-09-28",
    notes:
      "ממצא קודם (2026-09-22): רשומת תהליך מקצה לקצה: היא מקשרת ואינה מכפילה, וכל פירוט נמצא ברשומות המקושרות " +
      "(הודעה, פקודה, תחזוקה מונעת, אובייקטים טכניים). ההפניה הרשמית הייתה null: לא אותר עמוד SAP רשמי אחד המתאר את " +
      "תחזוקת המפעל מקצה לקצה כתהליך אחד, ופריט SAP Best Practices (Scope Item) לא אומת, ולכן לא נרשמה הפניה במקום " +
      "לרשום הפניה חלקית. שמות הטבלאות QMIH ו-QALS מופיעים ברשומות המאגר ואינם במילון הפרויקט ולכן אינם מקושרים. " +
      "העמודים הרשמיים שצורפו אז נגעו לשני צמתים בשרשרת (יצירת הפקודה וכלל ההתחשבנות) ולא לתהליך כולו. לא בוצעה " +
      "בדיקה במערכת SAP חיה. עדכון 2026-09-28 (Backfill): נוספו process.interfaces ו-process.reference. ההפניה " +
      "הייתה null (לא אותר עמוד רשמי אחד לתהליך מקצה לקצה) ועכשיו מצביעה על עמוד הסקירה 'Overview of Maintenance " +
      "Management' (2025.001), שגופו נקרא; זו סקירת רכיב ולא תיאור שלבים, ולכן הממצא הקודם נשמר: אין עמוד SAP רשמי " +
      "אחד המתאר את השרשרת צעד אחר צעד. פריט היקף לא נרשם: העמוד 'Phase-Based Maintenance Process' נוקב ב-4HH, " +
      "‏4HI, ‏BH1, ‏BH2 ו-BJ2 אך אינו קובע מי מהם מכסה את התהליך מקצה לקצה. בממשקים: IORDER_01 (IDoc להפצת פקודות " +
      "ל-MES) ו-F4568 אינם במילון הפרויקט ולכן נשארים בפרוזה; שמות שירותי ה-OData (API_MAINTENANCEORDER_0002, " +
      "‏API_MAINTNOTIFICATION, ‏API_MAINTORDERCONFIRMATION, ‏API_MAINTENANCEPLAN, ‏API_MAINTENANCEITEM, " +
      "‏API_EQUIPMENT, ‏API_FUNCTIONALLOCATION, ‏API_MATERIAL_DOCUMENT_SRV, ‏API_PURCHASEREQ_PROCESS_SRV) נקובים " +
      "ברשומות הרשמיות המצוטטות ואינם מזהי מילון. API_MAINTENANCEORDER, שמפת התהליך של המאגר נוקבת בו, הוא לפי " +
      "העמוד 'Maintenance Order (Deprecated)' השם הטכני של ה-API שבוטל ב-S/4HANA 2023; גוף אותו עמוד מפנה ליורש " +
      "בכתיב API_MaintenanceOrder_002, השונה מהשם API_MAINTENANCEORDER_0002 שבעמוד של Version 2, ולכן את השם המדויק " +
      "יש לאמת ב-SAP Business Accelerator Hub או במערכת היעד. ל-K_ORDER_SETTLEMENT ול-BAPI_MAINTENANCEPLAN_CREATE " +
      "סטטוס verification_required ברשומות האימות. עמודי api.sap.com לא נקראו (מעטפת JavaScript). לא בוצעה בדיקה " +
      "במערכת SAP חיה.",
  },
];
