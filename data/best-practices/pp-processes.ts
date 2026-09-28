/* Project NEO · best practices · PP PROCESS CATALOG (design-audit continuation
   §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with no loader.

   Three whole processes of discrete production (module PP): the production
   order from planned order to settlement, material requirements planning, and
   the end-to-end plan-to-produce chain that binds them. Every line is copied
   or condensed from the named repository records (repoRef) or from an official
   SAP page that an existing overlay already verified (same URL, same claim,
   same accessedAt). A field the repository does not document is left out on
   purpose: the page renders the gap by name. Nothing here asserts a new SAP
   fact.

   Backfill 2026-09-25 (researcher, adversarial auditor, writer): process.interfaces
   on all three records, process.kpis on mrp-process and process.reference on
   plan-to-produce-discrete. Each new official row was either read through the
   scripted help.sap.com channels (search record or page body, stamped DATE25)
   or copied verbatim from the overlay entry it names (that entry's accessedAt).
   Earlier lines and rows are kept unchanged except where the audit corrected
   them; those corrections are named in the record's notes or in the batch
   report. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";
/** accessedAt of the official pages reused from the tx:CO01 / tx:CO11N / tx:MD01 / tx:MD04 overlays. */
const DATE_TX = "2026-09-07";
/** accessedAt of the official pages reused from the data/verification/fiori.ts and cds.ts overlays. */
const DATE_APP = "2026-09-02";
/** accessedAt of the official page reused from the table:EBAN overlay. */
const DATE_TBL = "2026-09-15";
/** accessedAt of the rows added by the 2026-09-25 backfill (and lastVerifiedAt of the three records). */
const DATE25 = "2026-09-25";
/** accessedAt values copied from the overlay entries the backfill reused. */
const DATE_FM14 = "2026-09-14"; // data/verification/functions.ts DATE14 (fm:BAPI_GOODSMVT_CREATE)
const DATE_FM22 = "2026-09-22"; // data/verification/functions.ts DATE22 (fm:BAPI_PR_CREATE)
const DATE_FM24 = "2026-09-24"; // data/verification/functions.ts DATE24 (fm:BAPI_PLANNEDORDER_CREATE)
const DATE_IDOC2 = "2026-09-02"; // data/verification/idocs.ts DATE2 (idoc:msg:LOIPRO)

export const PP_PROCESS_PRACTICES: BestPracticeLike[] = [
  /* ==================================================== production order */
  {
    slug: "production-order-process",
    he: "פקודת ייצור בדידה: מהזמנה מתוכננת ועד התחשבנות",
    en: "Discrete production order process: from planned order to settlement",
    module: "PP",
    summary:
      "פקודת הייצור היא המסמך התפעולי של הייצור הבדיד: היא נפתחת מהזמנה מתוכננת של MRP או ידנית, מושכת BOM ומסלול " +
      "לפי גרסת ייצור, עוברת שחרור ובדיקת זמינות, מנופקת, מדווחת, קולטת את התוצרת אל המלאי ולבסוף מותחשבנת.",
    context:
      "לפי רשומות המאגר, מחזור הפקודה הוא MD01N או MD04 לתכנון, CO01 ליצירה (או CO40/CO41 להמרת הזמנה מתוכננת), " +
      "CO02 לשחרור ולהדפסה, CO11N לדיווח פעולה או CO15 לדיווח מסכם, MIGO לקליטת התוצרת ו-KO88 או CO88 לסגירת " +
      "העלויות; הנתונים נשמרים ב-AUFK, AFKO, AFPO, AFVC ו-RESB, והאישורים ב-AFRU. לפי תיעוד Production Planning " +
      "and Control של S/4HANA On-Premise 2025 FPS01, יצירת הפקודה נעשית למשל ב-CO01 והשינוי ב-CO02; חלופת ה-Fiori " +
      "לפי דף ההשוואה הרשמי היא Manage Production Orders (F2336) לצד COOIS ו-COHV. ב-ECC וב-S/4HANA מבנה הנתונים " +
      "זהה ברובו; מה שנוסף ב-S/4HANA הוא שכבת Fiori ו-CDS, ולפי רשומת המעבר של המאגר גם שירותי OData ושילוב " +
      "PP-DS ו-aATP.",
    steps: [
      {
        he: "לקבל את ההצעה מהתכנון: הזמנה מתוכננת שנוצרה ב-MRP ונראית ב-MD04, והמרתה לפקודת ייצור ב-CO40 (בודדת) או ב-CO41 (קולקטיבית). יצירה ידנית ב-CO01 שמורה לייצור נקודתי ללא הצעת תכנון.",
        xrefs: ["tx:MD04", "tx:CO40", "tx:CO41", "tx:CO01", "bp:mrp-process"],
      },
      {
        he: "לוודא שהפקודה נוצרה עם גרסת ייצור תקפה: בלי גרסה ב-MKAL שתוקפה וטווח הכמויות שלה תואמים, ההמרה נכשלת ו-BOM או מסלול אינם נבחרים (תקריות no-production-version ו-planned-order-not-convert במרכז התקלות).",
        xrefs: ["table:MKAL", "tx:C223", "table:MAST", "table:PLKO"],
      },
      {
        he: "לבדוק את נתוני הפקודה לפני השחרור: כותרת וכמות (AUFK, AFKO, AFPO), פעולות (AFVC), רכיבים והזמנות חומר (RESB), תזמון ועלות מתוכננת. Reread PP master data אחרי שינוי BOM או מסלול.",
        xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:RESB", "tx:CO03"],
      },
      {
        he: "לשחרר את הפקודה ב-CO02: השחרור הוא נקודת המעבר שמאפשרת ניפוק ודיווח, והוא מפעיל את בדיקת זמינות הרכיבים לפי ה-Checking Control שנקבע ב-OPJK. מ-S/4HANA 2022 ניתן להפריד שינוי משחרור באמצעות אובייקט ההרשאה C_AFKO_REL לפי רשומת האימות של CO01.",
        xrefs: ["tx:CO02", "tx:OPJK", "tx:CO24", "tx:CO09"],
      },
      {
        he: "לנפק חומרים: ניפוק ידני מול הפקודה ב-MIGO לפי רשימת הליקוט, או Backflush אוטומטי בעת הדיווח לפי מפתח הבקרה ברכיב ובמסלול.",
        xrefs: ["tx:MIGO", "table:RESB", "obj:material-document"],
      },
      {
        he: "לדווח ביצוע: CO11N לדיווח פעולה (Time Ticket) עם זמנים, כמות מיוצרת ופסולת, או CO15 לדיווח מסכם ברמת ההזמנה. הדיווח נשמר ב-AFRU; לפי התיעוד הרשמי של 2025 FPS01, קליטת מוגמר אוטומטית ו-Backflush אפשריות בטרנזקציית הדיווח כל עוד לא נוצרו אצוות WIP להזמנה.",
        xrefs: ["tx:CO11N", "tx:CO15", "table:AFRU", "cds:I_ProductionOrderConfirmation"],
      },
      {
        he: "לנקות את שגיאות תנועות החומר: תנועות Backflush שנכשלו נשמרות לעיבוד חוזר ומטופלות ב-COGI; ביטול דיווח שגוי נעשה ב-CO13 ולא בדיווח שלילי ידני (תקריות cogi-stuck ו-ru505-backflush-stock).",
        xrefs: ["tx:COGI", "tx:CO13", "tx:MF47"],
      },
      {
        he: "לקלוט את התוצרת: תנועת 101 מול הפקודה ב-MIGO או ב-MB31, או קליטה אוטומטית בדיווח האחרון לפי מפתח הבקרה. ב-S/4HANA תנועות המלאי נרשמות בטבלת מסמכי החומר החדשה (MATDOC, שאינה במילון הפרויקט).",
        xrefs: ["tx:MIGO", "tx:MB31", "bp:matdoc-read-through-compatibility"],
      },
      {
        he: "לסגור: סגירה טכנית (TECO) רק אחרי שכל הדיווחים הושלמו ו-COGI נקי, אחרת נשארות הזמנות חומר פתוחות ו-WIP פתוח (תקריות teco-blocked-open-reservation ו-order-teco-wip); ואז חישוב WIP וסטיות (KKAX, KKS1, KKS2) והתחשבנות ב-KO88 או ב-CO88 לפי כלל התחשבנות ב-COBRB.",
        xrefs: ["tx:CO02", "tx:KKAX", "tx:KKS1", "tx:KKS2", "tx:KO88", "tx:CO88", "table:COBRB"],
      },
      {
        he: "לעקוב ולנתח: COOIS כמערכת מידע ההזמנות ו-COHV לעיבוד המוני, ולצדן יישום ה-Fiori Manage Production Orders (F2336) לפי דף ההשוואה הרשמי של 2025 FPS01.",
        xrefs: ["tx:COOIS", "tx:COHV", "fiori:F2336", "cds:I_ProductionOrder"],
      },
    ],
    antiPatterns: [
      "פתיחת פקודה ידנית ב-CO01 כשקיימת הזמנה מתוכננת: נוצר ביקוש כפול והקישוריות ל-MRP נשברת.",
      "שחרור פקודה תוך התעלמות מהודעת בדיקת הזמינות: הרכיבים חסרים בשטח והדיווח נופל ל-COGI.",
      "TECO לפני סיום הדיווחים: הזמנות חומר נשארות פתוחות, ה-MRP ממשיך לתכנן עליהן וה-WIP אינו נסגר.",
      "דיווח כפול (פעולה ומסכם על אותה כמות): משיכת חומר עודפת ועלות מעוותת.",
      "פקודה ללא כלל התחשבנות ב-COBRB: ההתחשבנות נכשלת בסגירת החודש.",
    ],
    checks: [
      "חיובי: המרת הזמנה מתוכננת ב-CO41 יוצרת פקודה עם פעולות ורכיבים, וה-BOM מפוצץ ל-RESB.",
      "שלילי: חומר ללא גרסת ייצור תקפה ב-MKAL אינו ניתן להמרה לפקודה.",
      "אינטגרציה: דיווח ב-CO11N עם Backflush מייצר רשומת AFRU ותנועות מלאי, וכשל נשאר לעיבוד חוזר ב-COGI.",
      "רגרסיה: ביטול דיווח ב-CO13 מהפך את ה-Backflush ואת קליטת המוגמר.",
      "סגירה: אחרי TECO והתחשבנות ב-KO88 אין יתרה פתוחה בפקודה, והסטיות מוצגות ב-KKS2.",
    ],
    process: {
      purpose:
        "לנהל ייצור בדיד של מוצר בכמות ובמועד מוגדרים: המסמך שממנו מנפיקים חומרים, מדווחים ביצוע, קולטים תוצרת " +
        "וגובים את עלות הייצור, מרגע ההצעה של התכנון ועד סגירת העלויות.",
      trigger: [
        { he: "הזמנה מתוכננת שנוצרה בריצת MRP ומומרת לפקודת ייצור.", xrefs: ["tx:MD04", "tx:CO40", "tx:CO41", "bp:mrp-process"] },
        { he: "צורך נקודתי ללא הצעת תכנון: ייצור חד-פעמי, דוגמית או תיקון, בפתיחה ידנית ב-CO01.", xrefs: ["tx:CO01"] },
      ],
      preconditions: [
        { he: "גרסת ייצור תקפה ב-MKAL לצירוף החומר, המפעל, התאריך וטווח הכמות.", xrefs: ["table:MKAL", "tx:C223"] },
        { he: "BOM תקף לשימוש ולתאריך, ומסלול עם פעולות ומרכזי עבודה תקפים.", xrefs: ["table:MAST", "table:STPO", "table:PLKO", "table:PLPO", "table:CRHD"] },
        { he: "עלות תקן משוחררת לחומר עם בקרת מחיר S, אחרת ההערכה נכשלת או מחזירה אפס (תקרית order-no-std-price).", xrefs: ["tx:CK11N", "tx:CK24"] },
        { he: "סוג הזמנה ופרמטרים תלויי סוג הזמנה מוגדרים, כולל כלל התחשבנות.", xrefs: ["table:AUFK", "table:COBRB"] },
      ],
      masterData: [
        { he: "אב חומר: נתוני MRP, תזמון ועבודה, בקרת מחיר וסבולות אספקה.", xrefs: ["table:MARC", "tx:MM02"] },
        { he: "עץ מוצר (BOM) עם רכיבים, כמויות ופסולת מתוכננת.", xrefs: ["table:MAST", "table:STKO", "table:STPO", "tx:CS01"] },
        { he: "מסלול ייצור עם פעולות, מפתחות בקרה ומרכזי עבודה.", xrefs: ["table:PLKO", "table:PLPO", "table:CRHD", "tx:CA01", "cds:I_Routing"] },
        { he: "גרסת ייצור המקשרת BOM ומסלול לתקופת תוקף ולטווח כמויות.", xrefs: ["table:MKAL", "cds:I_ProductionVersion"] },
      ],
      roles: [
        { he: "מפקח ייצור בייצור בדיד: לפי עמוד האפליקציה הרשמי של 2025 FPS01, השימוש ב-Manage Production Orders מותנה בהקצאת התפקיד Production Supervisor - Discrete Manufacturing.", xrefs: ["fiori:F2336"] },
        { he: "מפעיל ייצור בייצור בדיד: לפי דף ההשוואה הרשמי, דיווח פעולה מיישומי ניהול הייצור מתבצע בניווט אל CO11N ומחייב את התפקיד Production Operator - Discrete Manufacturing בנוסף לתפקיד המפקח.", xrefs: ["tx:CO11N"] },
        { he: "מתכנן ייצור: יוצר וממיר את ההזמנות המתוכננות ומנהל את עומס הפקודות לפי רשומות המאגר.", xrefs: ["tx:CO41", "tx:COHV"] },
      ],
      transactions: [
        { he: "CO01 יצירה, CO02 שינוי ושחרור, CO03 תצוגה.", xrefs: ["tx:CO01", "tx:CO02", "tx:CO03"] },
        { he: "CO40 ו-CO41: המרת הזמנה מתוכננת לפקודת ייצור; CO05N לשחרור קולקטיבי.", xrefs: ["tx:CO40", "tx:CO41", "tx:CO05N"] },
        { he: "CO11N דיווח פעולה, CO15 דיווח מסכם, CO13 ביטול דיווח, COGI ו-CO16N לטיפול בתנועות שנכשלו.", xrefs: ["tx:CO11N", "tx:CO15", "tx:CO13", "tx:COGI", "tx:CO16N"] },
        { he: "MIGO ו-MB31 לקליטת התוצרת; MB51 לבדיקת תנועות החומר.", xrefs: ["tx:MIGO", "tx:MB31", "tx:MB51"] },
        { he: "COOIS מערכת מידע ההזמנות ו-COHV עיבוד המוני; KKS1, KKS2 לסטיות ו-KO88, CO88 להתחשבנות.", xrefs: ["tx:COOIS", "tx:COHV", "tx:KKS1", "tx:KKS2", "tx:KO88", "tx:CO88"] },
        { he: "Fiori: Manage Production Orders (F2336), לפי דף ההשוואה הרשמי לצד COOIS ו-COHV.", xrefs: ["fiori:F2336"] },
      ],
      tables: [
        { he: "AUFK כותרת ההזמנה, AFKO כותרת מורחבת, AFPO פריט, AFVC פעולות, AFFL רצף, RESB רכיבים והזמנות חומר.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:AFFL", "table:RESB"] },
        { he: "AFRU אישורי הפקודה; JEST סטטוסי מערכת ומשתמש; COBRB כלל ההתחשבנות.", xrefs: ["table:AFRU", "table:JEST", "table:COBRB"] },
        { he: "תצוגות CDS רשמיות: I_ProductionOrder קוראת את כותרת ההזמנה מ-AUFK ומ-AFKO, ולצדה פריט, פעולה, רכיב ואישור.", xrefs: ["cds:I_ProductionOrder", "cds:I_ProductionOrderItem", "cds:I_ProductionOrderOperation", "cds:I_ProductionOrderComponent", "cds:I_ProductionOrderConfirmation"] },
        { he: "רשומות ה-MRP שמזינות את הפקודה (MDKP כותרת רשימת MRP, PLAF הזמנה מתוכננת) אינן במילון הפרויקט ולכן אינן מקושרות." },
      ],
      integrationPoints: [
        { he: "תכנון: ההזמנה המתוכננת של MRP היא מקור הפקודה; ביטול או המרה מעדכנים את תמונת ההיצע ב-MD04.", xrefs: ["tx:MD04", "bp:mrp-process"] },
        { he: "ניהול מלאי: ניפוק, Backflush וקליטת תוצרת נרשמים כמסמכי חומר; ב-S/4HANA לטבלת מסמכי החומר החדשה.", xrefs: ["obj:material-document", "bp:matdoc-read-through-compatibility"] },
        { he: "בקרה ועלויות: זיכוי סוגי פעילות בדיווח, חישוב WIP וסטיות, והתחשבנות. לפי רשומת המעבר של המאגר, ב-S/4HANA העלויות נזקפות ליומן האוניברסלי ACDOCA.", xrefs: ["table:ACDOCA", "tx:KKS2", "tx:KO88"] },
        { he: "שילוב MES: תיעוד Production Planning and Control של 2025 FPS01 מתאר הפצה של הזמנת הייצור למערכת ייצור חיצונית ושינויה לאחר ההפצה.", xrefs: ["tx:CO01", "tx:CO02"] },
        { he: "הרחבות: Customer Exits PPCO0001, PPCO0007 ו-PPCO0021 לפקודה, CONFPP01 ו-CONFPP05 לדיווח, ו-BAdIs WORKORDER_UPDATE, WORKORDER_CONFIRM ו-WORKORDER_GOODSMVT.", xrefs: ["enh:exit:PPCO0001", "enh:exit:PPCO0007", "enh:exit:PPCO0021", "enh:exit:CONFPP01", "enh:exit:CONFPP05", "enh:badi:WORKORDER_UPDATE", "enh:badi:WORKORDER_CONFIRM", "enh:badi:WORKORDER_GOODSMVT"] },
        { he: "ממשק תוכניתי: רשומות המאגר של CO01, CO02, CO03 ו-CO11N נוקבות ב-BAPI_PRODORD_CREATE, BAPI_PRODORD_RELEASE, BAPI_PRODORD_GET_DETAIL ו-BAPI_PRODORDCONF_CREATE_TT; מודולי הפונקציה האלה אינם במילון הפרויקט ולכן אינם מקושרים. לכל רצף BAPI חלה משמעת ה-COMMIT.", xrefs: ["bp:bapi-commit-discipline"] },
      ],
      interfaces: [
        { he: "BAPIs של פקודת הייצור לפי רשומות TX_INTEL של המאגר: BAPI_PRODORD_CREATE (CO01) ו-BAPI_PRODORD_CREATE_FROM_PLORD (CO01, CO40, CO41) ליצירה; BAPI_PRODORD_CHANGE, BAPI_PRODORD_RELEASE ו-BAPI_PRODORD_COMPLETE_TECH (CO02, ושחרור או TECO המוני ב-CO05N וב-COHV) לשינוי, שחרור וסגירה טכנית; BAPI_PRODORD_GET_DETAIL ו-BAPI_PRODORD_GET_LIST (CO03, COOIS) לקריאה. מודולי הפונקציה אינם במילון הפרויקט ולכן אינם מקושרים.", xrefs: ["tx:CO01", "tx:CO40", "tx:CO41", "tx:CO02", "tx:CO05N", "tx:COHV", "tx:CO03", "tx:COOIS", "obj:production-order"] },
        { he: "S/4HANA: אובייקט ההגירה 'PP - Production order' (Direct Transfer, S4_PP_PRODUCTION_ORDER) בתיעוד Data Migration של 2025 FPS01 יוצר את הפקודה ב-BAPI_PRODORD_CREATE, ומודול ההגירה CNV_PE_S4_PP_PRODUCTION_ORDER קורא ל-BAPI_PRODORD_RELEASE ול-BAPI_PRODORD_COMPLETE_TECH; תוצאת הצעד מוצגת ב-Display Production Order (CO03).", xrefs: ["tx:CO03", "obj:production-order"] },
        { he: "דיווח: לפי TX_INTEL, CO11N נשענת על BAPI_PRODORDCONF_CREATE_TT, BAPI_PRODORDCONF_GET_TT_PROP ו-BAPI_PRODORDCONF_CANCEL, CO15 על BAPI_PRODORDCONF_CREATE_HDR ו-CO13 על BAPI_PRODORDCONF_CANCEL; רשומת אובייקטי S/4 של המאגר מסמנת את BAPI_PRODORDCONF_CREATE_TT כנשמר. S/4HANA: What's New 2020 ועמוד שילוב EWM ב-PP של 2025 FPS01 מונים את BAPI_PRODORDCONF_CREATE_HDR, BAPI_PRODORDCONF_CREATE_TT ו-BAPI_PRODORDCONF_CANCEL בין ממשקי PP שתומכים בתנועות סחורה סינכרוניות ל-EWM המוטמע. מודולי הפונקציה אינם במילון הפרויקט ולכן אינם מקושרים.", xrefs: ["tx:CO11N", "tx:CO15", "tx:CO13", "table:AFRU"] },
        { he: "S/4HANA, OData: שירות Production Order (Version 2), API_PRODUCTION_ORDER_2_SRV, זמין מ-S/4HANA 2020 ולפי What's New 2020 מחליף את API_PRODUCTION_ORDERS; עמוד הפעולות של 2025 FPS01 מונה קריאה, יצירה, המרת הזמנה מתוכננת (ConvertPlannedOrder), עדכון פקודה, רכיבים ופעולות, שחרור פקודה ופעולה (ReleaseOrder, ReleaseOperation), TECO (TechlyCmpltOrder), סגירה (CloseOrder), סימוני מחיקה ו-Set Released by MES. What's New 2020 משייך את ה-API לפריט Scope Item BJ5 (Make-to-Stock Production - Discrete Manufacturing). שיוך השירות ליישום F2336 עדיין לא אומת, ראו eccToS4.", xrefs: ["obj:production-order", "obj:planned-order", "tx:CO40", "tx:CO02"] },
        { he: "S/4HANA, OData: שירות Production Order Confirmation, API_PROD_ORDER_CONFIRMATION_2_SRV, מעבד לפי 2025 FPS01 Time Ticket, Time Event ואישור ברמת ההזמנה: קריאה, יצירה וביטול של אישורים עם או בלי תנועות סחורה, הצעת כמויות ופעילויות, וקריאת מסמכי החומר של האישור. ההרשאות לפי העמוד: C_AFRU_AWK לאישורים ו-C_AFKO_AWK למסמכי החומר; אילוץ: אין יצירת מסמך חומר ללא אישור מתאים ואין שילוב סוגי אישור שונים לאותה פקודה.", xrefs: ["tx:CO11N", "table:AFRU", "obj:material-document"] },
        { he: "תנועות סחורה: BAPI_GOODSMVT_CREATE רושם ניפוק (261) וקליטה (101) מול הפקודה לפי רשומות MIGO ו-MB31 ב-TX_INTEL והרישום המועשר של ה-BAPI. S/4HANA: הפריט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM מפנה קוד לקוח הקורא ל-MB31 ולטרנזקציות MB נוספות אל ה-BAPI, ותיעוד 2025 FPS01 מתעד לצדו את שירות ה-OData‏ Material Documents - Read, Create (API_MATERIAL_DOCUMENT).", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "tx:MIGO", "tx:MB31", "obj:material-document"] },
        { he: "משמעת COMMIT: לפי הרישום המועשר, ל-BAPI_GOODSMVT_CREATE אין COMMIT פנימי והקורא נדרש ל-BAPI_TRANSACTION_COMMIT; בשגיאה BAPI_TRANSACTION_ROLLBACK, ובדיקת RETURN אחרי כל קריאה.", xrefs: ["fm:BAPI_TRANSACTION_COMMIT", "fm:BAPI_TRANSACTION_ROLLBACK", "fm:BAPI_GOODSMVT_CREATE", "bp:bapi-commit-discipline"] },
        { he: "IDoc ל-MES: לפי תיעוד PP-MES של 2025 FPS01, פקודה משוחררת מופצת דרך DRF (Outbound Implementation 97_1) ב-IDoc LOIPRO05 לפי מסנני ההפצה, ושינוי בפקודה שכבר הופצה נשלח שוב באותו IDoc; הפצה ב-POIT אינה אפשרית עוד לפקודות התואמות את מסנני ה-DRF. ב-SAP ERP 6.18 אותו מנגנון נקוב ב-LOIPRO02 וב-LOIPRO03 לפי רשומת האימות של LOIPRO; את הגרסה הזמינה בודקים ב-WE30 (LOIPRO*) ואת ה-IDocs היוצאים ב-WE02.", xrefs: ["idoc:msg:LOIPRO", "tx:WE30", "tx:WE02", "tx:CO02"] },
      ],
      outputs: [
        { he: "פקודת ייצור ממוספרת עם פעולות, רכיבים, תאריכים ועלות מתוכננת.", xrefs: ["table:AUFK", "table:AFKO"] },
        { he: "הזמנות חומר לרכיבים והזמנת קיבולת למרכזי העבודה.", xrefs: ["table:RESB", "table:CRHD"] },
        { he: "רשומות אישור עם כמות מיוצרת, פסולת וזמני עבודה.", xrefs: ["table:AFRU"] },
        { he: "מסמכי חומר של ניפוק וקליטת תוצרת.", xrefs: ["obj:material-document"] },
        { he: "סטיות ייצור ומסמך התחשבנות בסגירת הפקודה.", xrefs: ["tx:KKS2", "table:COBRB"] },
      ],
      exceptions: [
        { he: "הפקודה אינה נוצרת או נוצרת ללא רכיבים: אין גרסת ייצור תקפה או אין BOM תקף לתאריך (תקריות no-production-version ו-bom-explosion-no-components).", xrefs: ["table:MKAL", "table:MAST"] },
        { he: "הפקודה אינה משתחררת: בדיקת הזמינות חוסמת לפי ה-Checking Control, או חישוב העלות נכשל.", xrefs: ["tx:CO24", "tx:OPJK"] },
        { he: "הדיווח נדחה בגלל תקופת רישום סגורה: לפתוח תקופת MM ב-MMRV או תקופת FI ו-CO (תקרית confirm-period-closed).", xrefs: ["tx:MMRV"] },
        { he: "תנועות Backflush תקועות: חוסר מלאי לרכיב, אצווה חסומה או ייחוס חסר, ועיבוד חוזר ב-COGI (תקריות cogi-stuck ו-ru505-backflush-stock).", xrefs: ["tx:COGI", "tx:MF47"] },
        { he: "אישור פעולה נדחה כי הפעולה הקודמת לא אושרה, לפי מפתח הבקרה ורצף הפעולות (תקרית predecessor-confirm-missing).", xrefs: ["table:AFVC"] },
        { he: "TECO חסום או משאיר WIP פתוח: הזמנות חומר פתוחות, דיווחים חלקיים או חישוב WIP שלא בוצע (תקריות teco-blocked-open-reservation ו-order-teco-wip).", xrefs: ["tx:KKAX"] },
        { he: "סטיות אינן מחושבות: אין עלות תקן משוחררת או חסר Target Cost Version (תקרית variance-missing).", xrefs: ["tx:KKS2", "tx:CK24"] },
      ],
      controls: [
        { he: "בדיקת זמינות רכיבים בשחרור לפי Checking Control, ולא שחרור ידני מעל הודעת החוסר.", xrefs: ["tx:OPJK", "tx:CO24"] },
        { he: "ניטור COGI בתום כל משמרת עם Backflush: כשלים מצטברים מעוותים מלאי ועלות לפי רשומת המאגר של CO11N.", xrefs: ["tx:COGI"] },
        { he: "ביטול דיווח שגוי ב-CO13 ולא בדיווח שלילי ידני.", xrefs: ["tx:CO13"] },
        { he: "TECO רק אחרי סיום הדיווחים, ואז חישוב WIP וסטיות לפני ההתחשבנות.", xrefs: ["tx:KKAX", "tx:KKS2", "tx:KO88"] },
        { he: "הפרדת תפקידים בין שינוי לשחרור: מ-S/4HANA 2022 נדרש אובייקט ההרשאה C_AFKO_REL בתפקידים המכילים את CO01, לפי רשומת האימות של הטרנזקציה.", xrefs: ["tx:CO01", "tx:CO02"] },
        { he: "בכל רצף BAPI: בדיקת RETURN אחרי כל קריאה ו-COMMIT מפורש בסוף.", xrefs: ["bp:bapi-commit-discipline"] },
      ],
      kpis: [
        { he: "תפוקה מול מתוכנן ואחוז פסולת, הנגזרים מכמויות האישור. רשומת אנליטיקת הייצור של המאגר (תחום PP-PI, משותפת לייצור בדיד ותהליכי) מונה תפוקה, אחוז פסולת, זמן מחזור ו-OEE כמדדים המרכזיים.", xrefs: ["table:AFRU"] },
        { he: "סטיות ייצור מול עלות תקן לפי קטגוריות ב-KKS2, כולל סטיית פסולת (תקרית scrap-variance-high).", xrefs: ["tx:KKS2"] },
        { he: "עומס ההזמנות הפתוחות וסטטוסיהן ברשימות COOIS ו-COHV, וב-Fiori ביישום Manage Production Orders.", xrefs: ["tx:COOIS", "tx:COHV", "fiori:F2336"] },
      ],
      eccToS4: [
        { he: "ECC: CO01 עד CO03 לייצור בדיד, עם AUFK, AFKO, AFPO ו-AFVC. לפי רשומת המעבר של המאגר, ב-S/4HANA מבנה הנתונים זהה ברובו ונוספים יישומי Fiori ושירותי OData.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC"] },
        { he: "הטרנזקציה CO01 מתועדת בתיעוד Production Planning and Control של 2025 FPS01 כטרנזקציית היצירה, ו-CO02 כטרנזקציית השינוי; רשומת האימות מסווגת אותה 'ללא שינוי' עם חלופת Fiori ולא כמוצאת משימוש.", xrefs: ["tx:CO01", "tx:CO02"] },
        { he: "CO11N מתועדת בגרסת 2025 FPS01 כטרנזקציית ה-Time Ticket, וקליטת מוגמר אוטומטית ו-Backflush אפשריות בה כל עוד לא נוצרו אצוות WIP להזמנה.", xrefs: ["tx:CO11N"] },
        { he: "חלופת ה-Fiori לפי דף ההשוואה הרשמי של 2025 FPS01: Manage Production Orders (F2336) ו-Manage Production Operations, לצד COOIS ו-COHV. יישום ה-Operations אינו במילון הפרויקט ולכן אינו מקושר.", xrefs: ["fiori:F2336"] },
        { he: "אנליטיקה: תצוגת ה-VDM הרשמית I_ProductionOrder קוראת את כותרת ההזמנה מ-AUFK ומ-AFKO ומחליפה קריאה ישירה מהטבלאות בדיווח.", xrefs: ["cds:I_ProductionOrder"] },
        { he: "שירות ה-OData שרשומת המאגר מצמידה ליישום (API_PRODUCTION_ORDER_2) טרם אומת מול מקור רשמי: הוא נשאר שדה מאגר הממתין לאימות, ולא טענה. עדכון 2026-09-25: השירות API_PRODUCTION_ORDER_2_SRV עצמו מתועד רשמית (APIs for Manufacturing 2025 FPS01, What's New 2020); מה שנותר לא מאומת הוא שיוכו ליישום F2336.", xrefs: ["fiori:F2336"] },
        { he: "טבלאות הליבה AFKO, AFPO, AFVC ו-AFRU נמנות בסט היציב של שכבת ההשפעה במאגר, כלומר ללא שינוי מודל ב-S/4HANA.", xrefs: ["table:AFKO", "table:AFPO", "table:AFVC", "table:AFRU"] },
      ],
      migration: [
        { he: "אובייקט ההגירה 'PP - Production order (only open PO)' בתיעוד Data Migration של 2025 FPS01 מזוהה כ-PP_PRODNORD ברכיב PP-SFC, ומנחה לבדוק את התוצאה ב-Display Production Order (CO03) וב-Manage Production Orders (F2336).", xrefs: ["tx:CO03", "fiori:F2336"] },
        { he: "טבלאות ההזמנה נשמרות בהמרה לפי ה-blueprint וסט היציבות של המאגר; הערת ה-SUM מנחה להריץ Regression Test ולבדוק User Exits ודוחות מותאמים הקוראים אותן ישירות.", xrefs: ["table:AFKO", "table:AFPO"] },
        { he: "בדיקות לאחר המרה לפי מדריך התהליך של המאגר: מחזור MRP, פקודה, אישור, קליטת תוצרת והתחשבנות.", xrefs: ["tx:CO41", "tx:CO11N", "tx:KO88"] },
      ],
      reference: {
        title: "Production Order Integration | Production Planning and Control (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד התיעוד הרשמי שבו SAP מתארת את רצף הפקודה (יצירה ב-CO01, שחרור, שינוי ב-CO02) בהקשר שילוב עם " +
          "מערכת ייצור חיצונית (אומת ברשומת tx:CO01). עמוד תהליך מקצה לקצה ייעודי ופריט SAP Best Practices " +
          "(Scope Item) לתהליך טרם אותרו ואומתו ולכן אינם נרשמים." +
          " עדכון 2026-09-25: רשומת What's New 2020 של OData API: Production Order (Version 2) (loio " +
          "825c8f151a1640e9a0ca6ae907733dc6) מדפיסה Scope Item BJ5 (Make-to-Stock Production - Discrete " +
          "Manufacturing) כפריט של ה-API; אף מקור שנקרא אינו משייך אותו לתהליך כולו, ולכן ה-URL של reference לא " +
          "הוחלף.",
      },
    },
    xrefs: [
      "tx:CO01", "tx:CO02", "tx:CO03", "tx:CO40", "tx:CO41", "tx:CO05N", "tx:CO11N", "tx:CO15", "tx:CO13",
      "tx:COGI", "tx:COOIS", "tx:COHV", "tx:MIGO", "tx:MB31", "tx:KKS2", "tx:KO88", "tx:CO88", "tx:MD04",
      "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:AFFL", "table:RESB", "table:AFRU",
      "table:MKAL", "table:COBRB", "table:JEST",
      "fiori:F2336", "cds:I_ProductionOrder", "cds:I_ProductionOrderConfirmation",
      "enh:exit:PPCO0001", "enh:exit:CONFPP01", "enh:badi:WORKORDER_CONFIRM",
      "bp:mrp-process", "bp:plan-to-produce-discrete", "bp:matdoc-read-through-compatibility", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'ייצור בדיד, MRP עד פקודה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הזרימה: ביקוש, MRP, הזמנה מתוכננת, פקודת ייצור, שחרור, אישור (CO11N), קליטת תוצרת, התחשבנות; שלבים עם " +
          "MD01N (MDKP/PLAF), CO01 (AUFK/AFKO/AFPO), CO02 (AFKO/RESB), CO11N (AFRU) ו-KO88 (COBRB); הטעויות " +
          "השכיחות: אין גרסת ייצור, חוסר רכיב בשחרור, אישור בתקופה סגורה, קליטה אוטומטית שלא הוגדרה במפתח הבקרה; " +
          "נתיב תחקור: MD04, COGI, PPCO0001, CONFPP01.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pp-mrp-to-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'תכנון לייצור' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שלבי המפה: ניהול ביקוש (MD61/MD62), MRP (MD01N/MD04), פקודת ייצור או תהליך (CO01/COR1 עם AUFK/AFKO/AFPO), " +
          "ביצוע ואישור (CO11N/COR6N/COGI עם AFRU/RESB), קבלת תוצר (MIGO/MB31) והתחשבנות עם סטיות (KKS2/CO88 עם " +
          "COBRB/ACDOCA); לכל שלב תקריות ובדיקה מומלצת.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#plan-to-produce",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'פקודות ייצור/תהליך' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: CO01 עד CO03 לייצור בדיד ו-COR1 עד COR3 לייצור תהליכי, עם AUFK/AFKO/AFPO/AFVC. S/4HANA: מבנה נתונים " +
          "זהה ברובו, נוספים Fiori ושירותי OData ושילוב PP-DS ו-aATP; סטטוס 'ללא שינוי'; ההשפעה מינימלית במבנה, " +
          "ושכבת הקריאה והאנליטיקה עוברת ל-CDS; הרשומה מסייגת שיש לאמת שמות CDS מול גרסת S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#production-order-s4",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): CO01, CO02, CO03, CO11N, CO15",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "CO01 יוצרת הזמנת ייצור עם פיצוץ BOM, תזמון, עלות מתוכננת ובדיקת זמינות (AUFK/AFKO/AFPO/AFVC/RESB), " +
          "ובדיקת הזמינות נקבעת ב-Checking Control (OPJK); CO02 מבצעת שחרור, הדפסה, שינוי ו-TECO ומעדכנת JEST; " +
          "CO03 היא תצוגה בלבד; CO11N מדווחת פעולה (Time Ticket) ומעדכנת AFRU עם Backflush וקליטה אוטומטית, " +
          "וכשלים נופלים ל-COGI עם ביטול ב-CO13; CO15 היא דיווח מסכם ברמת ההזמנה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO01 (+CO02, CO03, CO11N, CO15)",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: cogi-stuck, confirm-period-closed, teco-blocked-open-reservation, variance-missing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תנועות Backflush תקועות נובעות מחוסר מלאי, אצווה חסומה, תקופה סגורה או ייחוס חסר ומטופלות ב-COGI; אישור " +
          "נכשל בתקופה סגורה ונפתר בפתיחת תקופת MM או FI ו-CO; TECO חסום כשנשארות הזמנות חומר פתוחות או תנועות " +
          "ב-COGI; סטיות אינן מחושבות ללא עלות תקן משוחררת או Target Cost Version.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#cogi-stuck (+confirm-period-closed, variance-missing; data/troubleshooting-ext.ts#teco-blocked-open-reservation)",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט (FIORI_APPS), רשומת F2336",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "Manage Production Orders (F2336, מודול PP, Transactional) לניהול פקודות ייצור בדיד: יצירה, שחרור, מעקב " +
          "וסגירה; guiTx CO01/CO02/COOIS; טבלאות AUFK/AFKO/AFPO; שדה ה-odata ברשומה הוא API_PRODUCTION_ORDER_2, " +
          "ששיוכו ליישום לא אומת מול מקור רשמי ורשום כשדה הממתין לאימות.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2336",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "AFKO, AFPO, AFVC, AFRU ו-AUFK נמנות בסט S4_STABLE של המאגר: טבלאות ליבה של PM ו-PP-PI המסומנות במפורש " +
          "יציבות ב-S/4HANA (verified, סיכון נמוך, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Integration | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "תיעוד Production Planning and Control של 2025 FPS01 (שילוב הזמנת ייצור מול MES, loio " +
          "7d61c9ecd5754e8cb0e925639b5d8bb0) מנחה: 'You create a production order (for example, using " +
          "transaction CO01, Create Production Order). You release the production order.' ובהמשך: 'You make " +
          "changes to the production order already distributed (for example, using transaction CO02, Change " +
          "Production Order).' CO01 מתועדת כטרנזקציית היצירה של הזמנת ייצור במהדורה 2025.001 (אומת ברשומת tx:CO01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movements in the Confirmation Transaction | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/f3bbb8535c39b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "תיעוד SAP S/4HANA 2025 FPS01 (מדריך Production Orders, PP-SFC; loio " +
          "f3bbb8535c39b44ce10000000a174cb4) מתעד את CO11N כטרנזקציית ההזנה של Time Ticket להזמנת ייצור: 'In " +
          "the Enter time ticket for production order transaction (CO11N; referred to below as the time " +
          "ticket/confirmation transaction), you can post ...'. הסניפט קובע גם: 'In the time " +
          "ticket/confirmation transaction, automatic goods receipt and backflush are possible as long as you " +
          "have not created WIP batches for the production order' (אומת ברשומת tx:CO11N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Processing Production Orders and Operations | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/5fe6af156e554b1e81118df2e7f6e3a7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "דף ההשוואה הרשמי של 2025 FPS01 מונה: 'App Name Order Information System - COOIS Mass Processing of " +
          "Process and Production Orders - COHV Manage Production Orders Manage Production Operations App ID " +
          "COOIS COHV F2336 F2335'. כלומר Manage Production Orders = F2336 ו-Manage Production Operations = " +
          "F2335, לצד COOIS ו-COHV, כאפליקציות לעיבוד הזמנות ייצור ופעולות ייצור ('apps for processing " +
          "production orders and production operations'). בשורת 'Confirm operation (time ticket)' מופיעים " +
          "הערכים 'No Yes No, only via navigation to CO11N', ובטבלת הניווט: 'Confirm Production Order Operation " +
          "(CO11N) No Yes, but requires SAP business role Production Operator - Discrete Manufacturing' " +
          "(אומת ברשומות tx:CO01 ו-tx:CO11N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Production Orders | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/0a4622d10e7e49478943891624ea7ca8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "עמוד האפליקציה בתיעוד Production Orders (PP-SFC) לגרסת 2025 FPS01 קובע: 'With this app, you can monitor the " +
          "progress of production' ו-'You can use this app if the role Production Supervisor - Discrete Manufacturing is " +
          "assigned to your user'; תחת Key Features: 'Display a list of productions orders for your area of " +
          "responsibility using a range of different filters' [כך בלשון הסניפט]; Supported Device Types: Desktop, Tablet " +
          "(אומת ברשומת fiori:F2336).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production order (only open PO) | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/bcac78c2e4454b0a8f1409a06e447b2f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "אובייקט ההגירה של 2025 FPS01 (loio bcac78c2e4454b0a8f1409a06e447b2f) מזוהה בסניפט כ-'Object Alias " +
          "PP_PRODNORD Business Object Component PP-SFC Business Object Type Transactional data', וקובע לבדיקת " +
          "התוצאה: 'App: Display Production Order (CO03) Manage Production Orders (F2336)' (אומת ברשומת tx:CO01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Header | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c6c3a06854a44d9383b32946f008b1b8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "עמוד ה-VDM הרשמי: 'CDS View Name I_ProductionOrder', 'Analytical Data Category Dimension', 'This view " +
          "represents the SAP object type ProductionOrder (BusinessObject)'. מטרת התצוגה כלשונה: 'This CDS view " +
          "retrieves production order header data (tables AUFK and AFKO)', והיא משיבה על 'Which production orders " +
          "exist?' (אומת ברשומת cds:I_ProductionOrder).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (SAP PRESS, Production Planning with SAP S/4HANA), פרק 6 'Production Planning for Discrete Manufacturing'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את מחזור הייצור הבדיד לפי אותם שלבים: סקירת התהליך (6.1), נתוני אב (6.2), ניהול פקודת הייצור " +
          "(6.3), שחרור (6.4), הדפסה (6.5), משיכת חומרים כולל Backflush (6.6), אישור (6.7), קבלת תוצרת (6.8), עיבוד " +
          "חוזר של תנועות וחישוב עלות (6.9) והתחשבנות וסגירה (6.10); הספר משמש כאן להפניית קריאה ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#6.1",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), שדות bapis: CO01, CO02, CO03, CO05N, CO11N, CO13, CO15, CO40, CO41, COHV, COOIS, MIGO, MB31",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "שדות ה-bapis ברשומות: CO01 BAPI_PRODORD_CREATE ו-BAPI_PRODORD_CREATE_FROM_PLORD; CO40 ו-CO41 " +
          "BAPI_PRODORD_CREATE_FROM_PLORD; CO02 BAPI_PRODORD_CHANGE, BAPI_PRODORD_RELEASE " +
          "ו-BAPI_PRODORD_COMPLETE_TECH; CO05N BAPI_PRODORD_RELEASE; COHV BAPI_PRODORD_RELEASE " +
          "ו-BAPI_PRODORD_COMPLETE_TECH; CO03 BAPI_PRODORD_GET_DETAIL ו-BAPI_PRODORD_GET_LIST; COOIS " +
          "BAPI_PRODORD_GET_LIST; CO11N BAPI_PRODORDCONF_CREATE_TT, BAPI_PRODORDCONF_GET_TT_PROP " +
          "ו-BAPI_PRODORDCONF_CANCEL; CO15 BAPI_PRODORDCONF_CREATE_HDR ו-BAPI_PRODORDCONF_CANCEL; CO13 " +
          "BAPI_PRODORDCONF_CANCEL; MIGO BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL; MB31 BAPI_GOODSMVT_CREATE. " +
          "רשומת data/s4-objects.ts מסמנת את BAPI_PRODORDCONF_CREATE_TT בסטטוס stays ('נשמר; בדוק שדות מורחבים').",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO01 (+CO02, CO03, CO05N, CO11N, CO13, CO15, CO40, CO41, COHV, COOIS, MIGO, MB31); data/s4-objects.ts#BAPI_PRODORDCONF_CREATE_TT",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט: BAPI_GOODSMVT_CREATE (PP-PI) ו-BAPI_TRANSACTION_COMMIT (PM)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "BAPI_GOODSMVT_CREATE: רישום תנועת סחורה ויצירת מסמך חומר, אובייקט BOR BUS2017, 'אין COMMIT פנימי, הקורא " +
          "חייב COMMIT', תנועות 101 ו-261 לפי GOODSMVT_CODE, טרנזקציות MIGO, MB1A ו-MB31, ובדיקת RETURN. " +
          "BAPI_TRANSACTION_COMMIT: COMMIT WORK חיצוני לאחר קריאות BAPI, עם BAPI_TRANSACTION_ROLLBACK כאובייקט " +
          "קשור.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_GOODSMVT_CREATE; data/bapi-enrichment.pm.ts#BAPI_TRANSACTION_COMMIT",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של סוג ההודעה LOIPRO (data/verification/idocs.ts)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "הרשומה קובעת סטטוס unchanged (2025.001): LOIPRO ממשיך לשמש ב-S/4HANA להפצת פקודת ייצור ל-MES באותו " +
          "מנגנון המתועד ב-SAP ERP 6.18 (DRF, BAdI להתאמת ה-IDoc, מגבלת POIT); ההבדל הוא גרסת הסוג הבסיסי הנקובה, " +
          "LOIPRO02 ו-LOIPRO03 בעמוד ה-ERP לעומת LOIPRO05 בעמוד 2025 FPS01, ולכן הגרסה הזמינה נקבעת במערכת ב-WE30.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/idocs.ts#idoc:msg:LOIPRO",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production order | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/d2b02f05c637486cbd8cec7fd59a0e3e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio d2b02f05c637486cbd8cec7fd59a0e3e, נקרא דרך sap-help-body.mjs): 'This migration technique " +
          "transfers data to the target system using Business Application Programming Interfaces (BAPIs)', " +
          "'Migration Approach Direct Transfer - ERP', 'Name of this migration object: S4_PP_PRODUCTION_ORDER'; " +
          "בטבלת צעדי ההעברה: 'Create Production Order ... Display Production Order (app ID CO03) " +
          "BAPI_PRODORD_CREATE' ו-'Function Module: CNV_PE_S4_PP_PRODUCTION_ORDER APIs/BAPIs BAPI_PRODORD_RELEASE " +
          "BAPI_PRODORD_COMPLETE_TECH'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Production Order (Version 2) | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/ed408e9ecb144e6eb09e6883d25a7262.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio ed408e9ecb144e6eb09e6883d25a7262, נקרא דרך sap-help-body.mjs): 'The OData API Production " +
          "Order (Version 2) offers the operations listed in the following table', ובהן Read Production Order, " +
          "Create Production Order, 'Convert Planned Order into Production Order POST ... " +
          "API_PRODUCTION_ORDER_2_SRV/ConvertPlannedOrder', Update Production Order, Update/Delete Production Order " +
          "Component, Update Production Order Operation, Release Production Order (ReleaseOrder), Release Operation " +
          "of Production Order, Technically Complete Production Order (TechlyCmpltOrder), Close Production Order " +
          "(CloseOrder), Set Deletion Flag, Set Deletion Indicator, Set Delivery Completed Indicator ו-Set Released " +
          "by MES (OrderReleasedByMES).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Production Order (Version 2) | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/825c8f151a1640e9a0ca6ae907733dc6.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 825c8f151a1640e9a0ca6ae907733dc6, נקרא דרך sap-help-body.mjs): 'With the new OData API " +
          "Production Order (Version 2) (API_PRODUCTION_ORDER_2_SRV), you can read production orders with their " +
          "details, create production orders from scratch or by converting planned orders, and update specific " +
          "properties of existing production orders'; 'This OData API replaces the API Production Order " +
          "(API_PRODUCTION_ORDERS)'; בפרטים הטכניים: 'Scope Item BJ5 (Make-to-Stock Production - Discrete " +
          "Manufacturing) Application Component PP-ES (Enterprise Services) Available As Of SAP S/4HANA 2020'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/e77b762e243b4045ad1f1f048f6aab87.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio e77b762e243b4045ad1f1f048f6aab87, נקרא דרך sap-help-body.mjs): 'Technical name: " +
          "API_PROD_ORDER_CONFIRMATION_2_SRV This service enables you to process confirmations for production " +
          "orders, namely time ticket and time event confirmations for operations of production orders and " +
          "confirmations on order level'; היכולות כוללות 'Create confirmations with or without goods movements', " +
          "'Cancel confirmations with or without goods movements' ו-'Read material documents for goods movements " +
          "related to the confirmations'; הרשאות: 'authorization object C_AFRU_AWK' לאישורים ו-'C_AFKO_AWK' למסמכי " +
          "החומר; אילוצים: אין 'Create material documents for goods movements without creating a corresponding time " +
          "ticket/time event confirmation or confirmation on order level', ואין יצירת סוגי אישור שונים לאותה פקודה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Integration of Extended Warehouse Management into PP With Synchronous Goods Movements | Extended Warehouse Management Integration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/b9cc83277e5645d780aba27800777163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio b9cc83277e5645d780aba27800777163, נקרא דרך sap-help-body.mjs): 'The synchronous goods " +
          "movements are also possible when using the following PP BAPIs and PP APIs: BAPI_PRODORDCONF_CREATE_HDR " +
          "BAPI_PRODORDCONF_CREATE_TT BAPI_PRODORDCONF_CANCEL BAPI_PROCORDCONF_CREATE_HDR " +
          "BAPI_PROCORDCONF_CREATE_TT BAPI_PROCORDCONF_CANCEL API_PROD_ORDER_CONFIRMATION_2_SRV " +
          "API_PROC_ORDER_CONFIRMATION_2_SRV', בתנאי ש-EWM מוטמע במערכת והמפעל ומחסן האחסון משויכים למחסן EWM.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAPIs and APIs used in Synchronous Goods Movements | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/73cf65e8275d4b279973c9a368890896.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 73cf65e8275d4b279973c9a368890896, נקרא דרך sap-help-body.mjs): 'Inventory Management " +
          "BAPIs: BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_CANCEL', 'Production Planning BAPIs: " +
          "BAPI_PRODORDCONF_CREATE_HDR BAPI_PRODORDCONF_CREATE_TT BAPI_PRODORDCONF_CANCEL Supported Confirmation " +
          "Types: Assembly Backflush Unplanned Component Backflush Planned Component Backflush' " +
          "ו-'API_PROD_ORDER_CONFIRMATION_2_SRV : Create, Read and Cancel confirmations either as Time Ticket or on " +
          "Order Level'; 'Available As Of SAP S/4HANA 2020'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Setting Up DRF Integration for MES Processes | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/667aa2e1747d49aeab7a8c36402d6163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 667aa2e1747d49aeab7a8c36402d6163, נקרא דרך sap-help-body.mjs): בטבלת אובייקטי הסינון " +
          "הסטנדרטיים לשילוב MES: 'Production order 97_1 97_1 LOIPRO05'; 'To determine the latest IDoc version in " +
          "your system, call transaction WE30 and enter the IDoc name with an asterisk (*) ... (for example, enter " +
          "LOIPRO*)'; 'All IDoc versions are downwards compatible, but it is recommended that you use the latest " +
          "available IDoc version'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Integration | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת החיפוש (loio 7d61c9ecd5754e8cb0e925639b5d8bb0) לשאילתה 'IDoc LOIPRO05 production order MES': 'The " +
          "system transfers the order data to the MES using IDoc LOIPRO05 according to the filter criteria you set " +
          "in the DRF. The MES generates an order' ו-'The system transfers these changes to the MES using IDoc " +
          "LOIPRO05 to ensure that the production data remains consistent. The MES confirms the order'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_FM14,
        claim:
          "פריט 27.6 (עמ' 644-645) קובע שטרנזקציות ה-MB לרישום ולהצגה של תנועות סחורה (MB01, MB02, MB03, MB04, " +
          "MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU, MBBM) 'have been replaced " +
          "by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
          "BAPI_GOODSMVT_CANCEL'. מ-S/4HANA OP1610 ומעלה הוכנס מנגנון נעילה חדש ומשופר ל-MIGO " +
          "ול-BAPI_GOODSMVT_CREATE ('a new enhanced and improved lock concept has been introduced for transaction " +
          "MIGO and the BAPI BAPI_GOODSMVT_CREATE'), בעוד הטרנזקציות הישנות עדיין משתמשות במנגנון הישן (note " +
          "2319579), ולכן רישום מקבילי דרכן ודרך MIGO או ה-BAPI עלול ליצור אי-עקביות מלאי. בסעיף הפתרון: להחליף קוד " +
          "לקוח הקורא ל-MB01, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL ו-MBSU (למשל " +
          "CALL TRANSACTION MBxy) בשימוש במודול הפונקציה BAPI_GOODSMVT_CREATE; את MBST ב-BAPI_GOODSMVT_CANCEL; את " +
          "MB02/MB03 ב-MIGO_DIALOG. באותו מסמך, פריט 27.9 (Performance optimizations within Material Document) מונה " +
          "את BAPI_GOODSMVT_CREATE ב-Other Terms, ופריט 27.12 (CWM in SAP S/4HANA) מציג בטבלת ה-BOR את הצמד BUS2017 " +
          "/ CREATEFROMDATA / BAPI_GOODSMVT_CREATE כ-BAPI סטנדרטי מורחב-CWM. ‏SAP Notes 2210569 ו-2319579 מופיעים " +
          "כלשונם בגוף הפריט. (אומת ברשומת fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Documents - Read, Create | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/d4c919581bc30a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM14,
        claim:
          "שירות ה-OData‏ Material Documents - Read, Create מתועד למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
          "Inventory: 'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following operations for " +
          "material documents: Retrieve material documents, Create material documents, Cancel material documents at " +
          "header level, Cancel material documents at [item level]'. רשומת 'Operations for Material Document API' " +
          "באותו מדריך (loio 1aef4e402acd4c8b8ec2ea2bfda7715b, 2025.001) מציגה את נתיב היצירה POST " +
          "‎<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader ואת פעולות הביטול ברמת " +
          "כותרת ופריט. רשומות What's New מתעדות הרחבות שוטפות של השירות: 2023 ‏(loio " +
          "71c0f9113d2a47cca1de911185cb89af, 'enhanced with additional properties', רכיב MM-IM-GF) ו-2025 FPS01 " +
          "‏(loio bfe185a3e1ea4fe0a39b12d0683853ff, 'enhanced with Warehouse Handling Unit field'). אף אחת מהרשומות " +
          "אינה מציגה את ה-API כמחליף של BAPI_GOODSMVT_CREATE; הן מתעדות אותו כשירות OData לרישום מסמכי חומר לצד " +
          "ה-BAPI. (אומת ברשומת fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE25,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:CO01, tx:CO11N, " +
      "fiori:F2336 ו-cds:I_ProductionOrder. מודולי ה-BAPI של הזמנת הייצור (BAPI_PRODORD_CREATE ודומיו) מופיעים " +
      "ברשומות המאגר אך אינם במילון המזהים של הפרויקט ואין להם רשומת אימות, ולכן הם נזכרים בפרוזה בלבד. שירות " +
      "ה-OData‏ API_PRODUCTION_ORDER_2 רשום בקובץ verification-required.md כשדה מאגר שלא אומת, ולכן הוא מוצג כאן " +
      "כשדה הממתין לאימות ולא כעובדה. הטבלאות MDKP, PLAF ו-MATDOC אינן במילון הפרויקט ולכן אינן מקושרות. פריט " +
      "SAP Best Practices (Scope Item) לתהליך לא אותר ואומת ולכן אינו נרשם. לא בוצעה בדיקה במערכת SAP חיה." +
      " תוספת 2026-09-25 (שדה interfaces): שמות ה-BAPI של הפקודה והאישור נשענים על שדות bapis ב-TX_INTEL ועל " +
      "עמודים רשמיים שנקראו (Data Migration, EWM ב-PP, What's New 2020); BAPI_PRODORD_* ו-BAPI_PRODORDCONF_* " +
      "אינם במילון הפרויקט ולכן אינם מקושרים. השירות API_PRODUCTION_ORDER_2_SRV עצמו מתועד רשמית (APIs for " +
      "Manufacturing 2025 FPS01, What's New 2020), אך שיוכו ליישום F2336 עדיין לא אומת. רשומת What's New 2020 " +
      "של ה-API מדפיסה את Scope Item BJ5 (Make-to-Stock Production - Discrete Manufacturing); שדה reference לא " +
      "שונה בטיוטה זו. BAPI_PLANNEDORDER_GET_DETAIL לא נכלל כי רשומת האימות שלו בסטטוס verification_required, " +
      "ו-K_ORDER_SETTLEMENT לא נכלל מאותה סיבה.",
  },

  /* ================================================================= MRP */
  {
    slug: "mrp-process",
    he: "תכנון דרישות חומר (MRP): מנתוני האב ועד הזמנות מתוכננות ודרישות רכש",
    en: "Material requirements planning: from master data to planned orders and purchase requisitions",
    module: "PP",
    summary:
      "MRP מתרגם ביקוש להיצע: לכל חומר הוא מחשב דרישות נטו, מיישם שיטת אצווה, מתזמן לפי זמני אספקה ויוצר הזמנות " +
      "מתוכננות לייצור או דרישות רכש לקנייה. התוצאות נבדקות ברשימת המלאי והדרישות ומומרות לפקודות ולרכש.",
    context:
      "לפי מרכז ה-MRP של המאגר, דרישות נטו הן ביקוש פחות מלאי זמין פחות כניסות מתוכננות; מקורות הביקוש הם PIR, " +
      "הזמנות לקוח, דרישות תלויות ומלאי בטחון, וסוג ה-MRP בנתוני MRP1 קובע את שיטת התכנון. ב-ECC הריצה היא MD01 " +
      "או MD02 בעיבוד batch; ב-S/4HANA MRP Live (MD01N) רץ על HANA. לפי פריט הפישוט הרשמי 'S4TWL - MRP in HANA' " +
      "ברשימת הפישוט של 2025 FPS1, הטרנזקציות הקלאסיות עדיין זמינות, אינן חלק מחבילת התאימות ולא הוגדר להן תאריך " +
      "סיום חיים, ו-MRP Live נחשבת לטכנולוגיית העתיד. רשימת המלאי והדרישות MD04 מתועדת ב-2025 FPS01 כאפליקציה " +
      "Monitor Stock / Requirements List, ולצדה יישומי ה-MRP Cockpit ב-Fiori.",
    steps: [
      {
        he: "להעמיד את נתוני האב: סוג MRP, שיטת אצווה, מלאי בטחון וזמני אספקה בנתוני החומר; BOM ומסלול; וגרסת ייצור תקפה, שבלעדיה החומר אינו ניתן לתכנון ב-MRP Live ולא להמרה לפקודה.",
        xrefs: ["table:MARC", "tx:MM02", "table:MAST", "table:MKAL", "tx:C223"],
      },
      {
        he: "להזין את הביקוש: דרישות עצמאיות מתוכננות (PIR) ב-MD61 או ב-MD62 בגרסת דרישות פעילה, לצד הזמנות לקוח והדרישות התלויות שמפצץ ה-BOM. אסטרטגיית התכנון בנתוני MRP3 קובעת כיצד נצרכת התחזית מול המכירות.",
        xrefs: ["tx:MD61", "tx:MD62", "table:MARC"],
      },
      {
        he: "לפריטים קריטיים: לתכנן תחילה MPS בנפרד (סוג MRP מקבוצת M) ב-MD41, לייצב ולקבע את התכנית, ורק אחר כך להריץ MRP לרכיבים.",
        xrefs: ["tx:MD41", "table:MARC"],
      },
      {
        he: "לוודא שקובץ התכנון מתוחזק לפני ריצת Net Change: חומר שאינו מסומן בקובץ התכנון אינו נכלל בריצה (תקרית mrp-no-planned-orders). בדיקה ב-MD20 וב-MD21.",
        xrefs: ["tx:MD20", "tx:MD21"],
      },
      {
        he: "להריץ את התכנון: ב-S/4HANA MRP Live ב-MD01N, וב-Fiori תזמון Job ביישום Schedule MRP Runs (F1339); הריצה הקלאסית MD01 (כוללת), MD02 (חומר בודד רב-רמתי) ו-MD03 (רמה אחת) נשארת זמינה, ולריצה ברקע MDBT.",
        xrefs: ["tx:MD01N", "tx:MD01", "tx:MD02", "tx:MD03", "tx:MDBT", "fiori:F1339"],
      },
      {
        he: "לבחור את מפתח העיבוד: NETCH לריצה יומית של מה שהשתנה, NEUPL לתכנון מלא מחדש. לפי פריט הפישוט הרשמי 'S4TWL - Planning File', תכנון Net Change באופק התכנון (NETPL) אינו נתמך עוד ב-S/4HANA On-Premise, לא ב-MRP הקלאסי ולא ב-MRP Live.",
        xrefs: ["tx:MD01", "tx:MD01N"],
      },
      {
        he: "לקרוא את תוצרי הריצה: הזמנות מתוכננות לייצור עצמי ודרישות רכש לרכש חיצוני (EBAN). לפי עמוד השינויים הלא תואמים של MRP Live, אין ב-MRP Live מחוון יצירה לדרישות רכש, והריצה מוחקת דרישות מריצה קודמת שלא קובעו ויוצרת חדשות במקומן.",
        xrefs: ["table:EBAN", "tx:MD01N"],
      },
      {
        he: "להעריך את התוצאות: MD04 לרשימת המלאי והדרישות של חומר בודד, MD06 ו-MD07 למבט קולקטיבי, וב-Fiori Monitor Material Coverage - Net Segments (F0247A) ו-Manage Material Coverage (F0251) של MRP Cockpit.",
        xrefs: ["tx:MD04", "tx:MD06", "tx:MD07", "fiori:F0247A", "fiori:F0251"],
      },
      {
        he: "לטפל בהודעות החריגה: הודעות דחייה והקדמה ב-MD06 ו-MD07 דורשות בעלים ותהליך, אחרת חוסרים אמיתיים נבלעים ברעש (תקריות mrp-exception-messages ו-mrp-exceptions-not-actioned-md06).",
        xrefs: ["tx:MD06", "tx:MD07"],
      },
      {
        he: "להמיר את ההצעות: הזמנה מתוכננת לפקודת ייצור ב-CO40 או ב-CO41 (בייצור תהליכי ב-COR8), ודרישת רכש להזמנת רכש. ההמרה נכשלת ללא גרסת ייצור תקפה (תקרית planned-order-not-convert).",
        xrefs: ["tx:CO40", "tx:CO41", "tx:COR8", "table:MKAL", "bp:production-order-process"],
      },
    ],
    antiPatterns: [
      "הרצת NEUPL כשגרה במקום NETCH: הריצה מכבידה על המערכת בלי ערך תכנוני נוסף.",
      "ציפייה לרשימות MRP קלאסיות מ-MRP Live: לפי רשומות המאגר הן אינן נוצרות כברירת מחדל, והעבודה מול MD04 ומול יישומי ה-Fiori.",
      "הסתמכות על NETPL או על MDAB ו-MDRE ב-S/4HANA: פריט הפישוט 'S4TWL - Planning File' קובע שהם אינם זמינים עוד.",
      "הרצת MRP בלי גרסת ייצור תקפה: החומר מתוכנן חלקית או שההמרה לפקודה נכשלת בהמשך.",
      "העברת מימושי BAdI והרחבות של ה-MRP הקלאסי כמות שהם ל-MRP Live: לפי עמוד השינויים הלא תואמים, MRP Live אינה מעבדת BAdIs לחומרים המתוכננים במלואם ב-HANA.",
    ],
    checks: [
      "חיובי: PIR בגרסת דרישות פעילה גורר הזמנות מתוכננות בריצת MD01N לפי שיטת האצווה.",
      "שלילי: חומר עם סוג MRP שאינו רלוונטי לתכנון אינו מקבל הצעות.",
      "אינטגרציה: דרישה למוצר מוגמר מפצצת דרישות תלויות לרכיבים לפי ה-BOM.",
      "רגרסיה: השוואת כיסוי החומרים וזמני הריצה בין MD01 הקלאסי לבין MD01N לאחר המעבר.",
      "המשכיות: דרישת רכש שחייבת לשרוד ריצה נוספת מקובעת (firmed), אחרת MRP Live מוחקת ויוצרת אותה מחדש.",
    ],
    process: {
      purpose:
        "לקבוע מה לייצר או לרכוש, בכמה ומתי: חישוב דרישות נטו מול מלאי וכניסות מתוכננות, יישום שיטת אצווה ותזמון, " +
        "ויצירת הזמנות מתוכננות ודרישות רכש שמזינות את הייצור ואת הרכש.",
      trigger: [
        { he: "שינוי בביקוש: PIR חדשה או מעודכנת, הזמנת לקוח, או שינוי בדרישות התלויות.", xrefs: ["tx:MD61", "tx:MD62"] },
        { he: "שינוי בנתוני אב או במלאי שמסמן את החומר בקובץ התכנון לריצת Net Change.", xrefs: ["tx:MD20", "tx:MD21"] },
        { he: "ריצה מתוזמנת: Job לילי או ריצת רקע ב-MDBT, וב-Fiori תזמון ביישום Schedule MRP Runs.", xrefs: ["tx:MDBT", "fiori:F1339"] },
      ],
      preconditions: [
        { he: "סוג MRP, שיטת אצווה, מלאי בטחון וזמני אספקה מתוחזקים בנתוני ה-MRP של החומר במפעל.", xrefs: ["table:MARC", "tx:MM02"] },
        { he: "BOM ומסלול או מתכון תקפים, וגרסת ייצור תקפה: לפי מרכז ה-MRP של המאגר היא חובה לתרחישי MRP Live ו-PP-DS.", xrefs: ["table:MAST", "table:PLKO", "table:MKAL"] },
        { he: "קובץ התכנון מתוחזק כך שהחומרים הרלוונטיים נכללים בריצה.", xrefs: ["tx:MD20", "tx:MD21"] },
        { he: "הרשאה להרצת התכנון ולתזמון Job: לפי מדריך היישום הרשמי, Schedule MRP Runs דורש רשומת קטלוג Job‏ SAP_SCM_MRP והרשאות batch.", xrefs: ["fiori:F1339"] },
      ],
      masterData: [
        { he: "נתוני MRP של החומר: סוג MRP, מתכנן, שיטת אצווה, מלאי בטחון, זמן אספקה ואופק תכנון.", xrefs: ["table:MARC", "cds:I_MRPMaterial"] },
        { he: "עץ מוצר לפיצוץ דרישות תלויות.", xrefs: ["table:MAST", "table:STKO", "table:STPO", "cds:I_BillOfMaterial"] },
        { he: "מסלול או מתכון לתזמון הייצור העצמי.", xrefs: ["table:PLKO", "table:PLPO", "tx:C201", "cds:I_Routing"] },
        { he: "גרסת ייצור המקשרת BOM ומסלול לתוקף ולטווח כמויות.", xrefs: ["table:MKAL", "cds:I_ProductionVersion"] },
        { he: "דרישות עצמאיות מתוכננות ואסטרטגיית התכנון שקובעת את צריכתן. טבלאות ה-PIR‏ (PBIM, PBED) אינן במילון הפרויקט ולכן אינן מקושרות.", xrefs: ["tx:MD61"] },
      ],
      roles: [
        { he: "מתכנן חומרים או MRP Controller: מריץ את התכנון, מעריך את התוצאות ומטפל בהודעות החריגה. רשומת המאגר ליישום Schedule MRP Runs (F1339), שהועתקה מספריית ה-Fiori (2025 FPS01), נוקבת בתפקידים SAP_BR_MATL_PLNR_EXT_PROC, SAP_BR_PRODN_PLNR ו-SAP_BR_RPLNMT_SPCLST_DC_RFM.", xrefs: ["fiori:F1339"] },
        { he: "מתכנן ייצור: ממיר את ההצעות לפקודות ייצור ומאזן את התכנית מול הקיבולת.", xrefs: ["tx:CO41", "tx:MD04"] },
      ],
      transactions: [
        { he: "MD01N ריצת MRP Live; MD01 ריצה כוללת קלאסית, MD02 חומר בודד רב-רמתי, MD03 רמה אחת, MDBT ריצה ברקע.", xrefs: ["tx:MD01N", "tx:MD01", "tx:MD02", "tx:MD03", "tx:MDBT"] },
        { he: "MD41 לתכנון MPS של פריטים קריטיים.", xrefs: ["tx:MD41"] },
        { he: "MD04 רשימת מלאי ודרישות, MD05 רשימת MRP, MD06 ו-MD07 מבט קולקטיבי.", xrefs: ["tx:MD04", "tx:MD05", "tx:MD06", "tx:MD07"] },
        { he: "MD61 ו-MD62 לדרישות עצמאיות מתוכננות; MD20 ו-MD21 לקובץ התכנון.", xrefs: ["tx:MD61", "tx:MD62", "tx:MD20", "tx:MD21"] },
        { he: "Fiori: Schedule MRP Runs (F1339), Monitor Material Coverage - Net Segments (F0247A), Manage Material Coverage (F0251).", xrefs: ["fiori:F1339", "fiori:F0247A", "fiori:F0251"] },
      ],
      tables: [
        { he: "MARC נתוני החומר במפעל, ובהם סוג ה-MRP ופרמטרי התכנון.", xrefs: ["table:MARC", "cds:I_MRPMaterial"] },
        { he: "EBAN דרישות הרכש שנוצרות לרכש חיצוני.", xrefs: ["table:EBAN"] },
        { he: "RESB הזמנות החומר והדרישות התלויות; MKAL גרסאות הייצור הנבחרות בתכנון.", xrefs: ["table:RESB", "table:MKAL"] },
        { he: "טבלאות תוצרי התכנון שרשומות המאגר נוקבות בהן (PLAF להזמנה מתוכננת, MDKP ו-MDTB לרשימת ה-MRP, MDVM ו-PPH_DBVM לקובץ התכנון) אינן במילון הפרויקט ולכן אינן מקושרות." },
      ],
      integrationPoints: [
        { he: "ייצור: ההזמנה המתוכננת מומרת לפקודת ייצור בדידה, ובייצור תהליכי לפקודת תהליך.", xrefs: ["tx:CO40", "tx:CO41", "tx:COR8", "bp:production-order-process"] },
        { he: "רכש: דרישות הרכש עוברות לעיבוד רכש והופכות להזמנות רכש.", xrefs: ["table:EBAN"] },
        { he: "מלאי: מלאי זמין וכניסות מתוכננות הם קלט לחישוב הדרישות נטו, ומוצגים ברשימת המלאי והדרישות.", xrefs: ["tx:MD04", "cds:I_MaterialStock"] },
        { he: "הרחבות: Customer Exit‏ M61X0001 לסינון חומרים בריצת התכנון הכוללת, BAdI‏ MD_PLDORD_POST להזמנות מתוכננות ו-BAdI‏ MD_ADD_ELEMENTS לתצוגת רשימת המלאי והדרישות. לפי פריט הפישוט הרשמי, מימושים קלאסיים נדרשים להיכתב מחדש כ-AMDP BAdI לקראת MRP Live.", xrefs: ["enh:exit:M61X0001", "enh:badi:MD_PLDORD_POST", "enh:badi:MD_ADD_ELEMENTS"] },
        { he: "אנליטיקה: תצוגת ה-CDS של חומר ה-MRP משמשת את יישומי ה-Fiori של MRP Cockpit לפי רשומות המאגר.", xrefs: ["cds:I_MRPMaterial", "fiori:F0247A"] },
      ],
      interfaces: [
        { he: "הזמנות מתוכננות: BAPI_PLANNEDORDER_CREATE ליצירה (דורש COMMIT) ו-BAPI_PLANNEDORDER_GET_DETAIL לקריאה, לפי רישום ה-BAPI המועשר ומודיעין הטרנזקציות של MD11 ו-MD13; רשומת התחום של MRP נוקבת ב-BAPI_PLANNEDORDER_CREATE. לפי רשומות האימות, מעמד שני ה-BAPIs ב-S/4HANA 2025 FPS01 טעון אימות.", xrefs: ["fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL", "fm:BAPI_TRANSACTION_COMMIT", "obj:planned-order", "tx:MD11", "tx:MD13", "bp:bapi-commit-discipline"] },
        { he: "הזמנות מתוכננות, S/4HANA: תיעוד 2025 FPS01 מתעד את Planned Order (OData V2, API_PLANNED_ORDERS) לקריאה, יצירה, שינוי ומחיקה של הזמנות מתוכננות ורכיביהן, ואת Planned Order (OData V4, API_PlannedOrder); אף מקור שנבדק אינו מציג אותם כמחליפי ה-BAPIs.", xrefs: ["obj:planned-order", "fm:BAPI_PLANNEDORDER_CREATE"] },
        { he: "דרישות רכש: BAPI_PR_CREATE ליצירה (Enjoy, דורש BAPI_TRANSACTION_COMMIT) ו-BAPI_REQUISITION_GETDETAIL לקריאה; רשומת הקטלוג של האחרון מציינת בדיקת QA של דרישת רכש שנוצרה מפקודה או מ-MRP. ב-S/4HANA 2025 FPS01 מתועד שירות ה-OData‏ API_PURCHASEREQ_PROCESS_SRV עם פעולות יצירה (POST), קריאה (GET) ועדכון (PATCH).", xrefs: ["fm:BAPI_PR_CREATE", "fm:BAPI_REQUISITION_GETDETAIL", "fm:BAPI_TRANSACTION_COMMIT", "table:EBAN"] },
        { he: "קלט הביקוש (PIR): מודיעין הטרנזקציות של MD61 ו-MD62 נוקב ב-BAPI_REQUIREMENTS_CREATE, BAPI_REQUIREMENTS_CHANGE ו-BAPI_REQUIREMENTS_GETDETAIL, שאינם במילון הפרויקט ולכן אינם מקושרים. ב-S/4HANA 2025 FPS01 מתועד שירות ה-OData‏ Planned Independent Requirements (API_PLND_INDEP_RQMT_SRV) לקריאה ולעדכון של PIR ממערכת חיצונית; המאפיין PlndIndepRqmtIsActive קובע אם ה-PIR נלקח בחשבון ב-MRP ובצריכת התחזית.", xrefs: ["tx:MD61", "tx:MD62"] },
        { he: "קריאת רשימת המלאי והדרישות: מודיעין הטרנזקציות של MD04 נוקב ב-BAPI_MATERIAL_STOCK_REQ_LIST, ופריט הפישוט 'S4TWL - MRP in HANA' (2023 FPS03) קובע שהוא מודול פונקציה משוחרר ומומלץ לשימוש, ואילו MD_MDPSX_READ_API אינו משוחרר. שני השמות אינם במילון הפרויקט ולכן אינם מקושרים.", xrefs: ["tx:MD04"] },
        { he: "נתוני תכנון לחומר, S/4HANA: לפי What's New של 1909, API for Material Planning Data (Read) הוא שירות OData שמערכות חיצוניות יכולות לצרוך לקריאת נתוני אב של חומרים, מידע היצע וביקוש לתקופה ומידע כיסוי; לפי What's New של 2021 שמו הטכני API_MRP_MATERIALS_SRV_01." },
        { he: "בקשות שינוי MRP לספקים, S/4HANA: לפי What's New של 2021, SOAP API: MRP Change Request - Send הוא שירות outbound אסינכרוני לשליחת בקשת שינוי אחת או יותר לספקים דרך מערכת חיצונית (רכיבים PP-MRP ו-PP-ES)." },
        { he: "המרת ההצעה לפקודה: מודיעין הטרנזקציות של CO40 ו-CO41 נוקב ב-BAPI_PRODORD_CREATE_FROM_PLORD, שאינו במילון הפרויקט ולכן אינו מקושר.", xrefs: ["tx:CO40", "tx:CO41", "bp:production-order-process"] },
        { he: "פונקציות שרשומת פירוט התחום של MRP מונה: MD_CONVERT_MATERIAL_UNIT להמרת יחידת מידה בחישובי דרישות וכמויות, MATERIAL_UNIT_CONVERSION להמרת כמות בין יחידות מידה של חומר, ו-MARC_SINGLE_READ לקריאת נתוני החומר במפעל. רשומת התחום נוקבת גם ב-BAPI_MATERIAL_AVAILABILITY, שאינו במילון הפרויקט.", xrefs: ["fm:MD_CONVERT_MATERIAL_UNIT", "fm:MATERIAL_UNIT_CONVERSION", "fm:MARC_SINGLE_READ", "table:MARC"] },
        { he: "שירותי ה-OData שיישומי ה-Fiori צורכים, לפי קטלוג היישומים של המאגר שהועתק מספריית ה-Fiori (S32OP): APJ_JOB_MANAGEMENT_SRV ל-Schedule MRP Runs (F1339); PP_MRP_AOR_SRV ו-PP_MRP_MATERIAL_COVERAGE_SRV ל-Monitor Material Coverage - Net Segments (F0247A); PP_MRP_COCKPIT_SRV ל-Manage Material Coverage (F0251).", xrefs: ["fiori:F1339", "fiori:F0247A", "fiori:F0251"] },
      ],
      outputs: [
        { he: "הזמנות מתוכננות לייצור עצמי, הניתנות להמרה לפקודות.", xrefs: ["tx:CO41"] },
        { he: "דרישות רכש לרכש חיצוני.", xrefs: ["table:EBAN"] },
        { he: "דרישות תלויות לרכיבים לפי פיצוץ ה-BOM.", xrefs: ["table:RESB"] },
        { he: "הודעות חריגה והמלצות לתזמון מחדש להערכה ב-MD06 וב-MD07.", xrefs: ["tx:MD06", "tx:MD07"] },
      ],
      exceptions: [
        { he: "אין הזמנות מתוכננות אחרי הריצה: החומר אינו מסומן בקובץ התכנון, סוג ה-MRP אינו רלוונטי, אין דרישה, או אופק התכנון קצר מדי (תקרית mrp-no-planned-orders).", xrefs: ["tx:MD20", "table:MARC"] },
        { he: "כמויות שגויות: שיטת אצווה, מלאי בטחון או זמני אספקה שאינם תואמים את המציאות.", xrefs: ["table:MARC"] },
        { he: "הודעות חריגה נערמות ללא טיפול, וחוסרים אמיתיים נבלעים ברעש (תקריות mrp-exception-messages ו-mrp-exceptions-not-actioned-md06).", xrefs: ["tx:MD06"] },
        { he: "ההמרה לפקודה נכשלת: אין גרסת ייצור תקפה או שהחומר חסום (תקריות no-production-version ו-planned-order-not-convert).", xrefs: ["table:MKAL", "tx:C223"] },
        { he: "מחסן שאינו רלוונטי לתכנון או המוגדר בתכנון נפרד: המלאי שבו אינו נכלל בחישוב (תקרית pp-storage-location-mrp).", xrefs: ["tx:MD04"] },
        { he: "חומרים נופלים מ-MRP Live אל ה-MRP הקלאסי בתרחישים שאינם נתמכים, לפי רשומות המאגר ולפי עמוד השינויים הלא תואמים.", xrefs: ["tx:MD01N", "tx:MD01"] },
      ],
      controls: [
        { he: "ריצה יומית ב-Net Change ולא בתכנון מלא מחדש, ותכנון מלא רק לצורך תיקון או אתחול.", xrefs: ["tx:MD01N"] },
        { he: "תחזוקת קובץ התכנון כתנאי לכיסוי מלא של החומרים בריצה.", xrefs: ["tx:MD20", "tx:MD21"] },
        { he: "בעלות ותהליך קבועים להודעות החריגה ב-MD06 וב-MD07.", xrefs: ["tx:MD06", "tx:MD07"] },
        { he: "קיבוע (firming) של הצעות שחייבות לשרוד ריצה נוספת: MRP Live מוחקת ויוצרת מחדש הצעות שאינן מקובעות.", xrefs: ["table:EBAN"] },
        { he: "לפני המעבר ל-MRP Live: מיפוי מימושי BAdI והרחבות של ה-MRP הקלאסי וכתיבתם מחדש כ-AMDP BAdI, לפי פריט הפישוט הרשמי.", xrefs: ["enh:exit:M61X0001", "enh:badi:MD_PLDORD_POST"] },
        { he: "גרסת ייצור תקפה לכל חומר מיוצר, כתנאי לתכנון ולהמרה לפקודה.", xrefs: ["table:MKAL", "tx:C223"] },
      ],
      kpis: [
        { he: "מחסורי חומר לפי הגדרת מחסור: ב-Monitor Material Coverage - Net Segments (F0247A) המערכת מחשבת מחסור לפי הגדרות ברירת המחדל MRP Standard, Stock Days' Supply, Ordered Requirements ו-Ordered Receipts, בתוך תקופת הערכת המחסור; דף ההשוואה הרשמי (תיעוד 2025 FPS01) מונה בין שורותיו את היכולת 'Define tiles with KPIs', והטקסט שנקרא אינו מאפשר לשייך אותה לעמודה מסוימת.", xrefs: ["fiori:F0247A"] },
        { he: "טווחי כיסוי: לפי עמוד Ranges of Coverage in MRP (2025 FPS01), Days' Supply ו-Receipt Days' Supply מחושבים בריצת התכנון ומציינים לכמה ימים יכסה מלאי המפעל הזמין (ובשני, בתוספת כניסות מסוימות) את הדרישות הקיימות; Actual Range of Coverage מחושב בריצה ומוצג בתצוגת סכומי התקופה של הערכות ה-MRP. ב-F0247A מוצגים גם Intraday Supply ו-Stock Days' Supply.", xrefs: ["fiori:F0247A"] },
        { he: "חריגים לכל חומר ב-F0247A: מספר אלמנטי הכניסה ברשימת המלאי והדרישות שמועדם עבר (תאריך פתיחה, תאריך התחלה בסיסי או שחרור, תאריך סיום בסיסי או אספקה בעבר), ומספר הצעות התזמון מחדש: Reschedule In, Reschedule Out ו-Cancel Process.", xrefs: ["fiori:F0247A"] },
        { he: "ביצועי ריצת MRP Live: הדוח MRP Live Performance Log (PPH_MRP_PERF) מציג לכל ריצה את סך החומרים שתוכננו, החומרים שתכנונם נכשל, החומרים שתוכננו ב-MRP Live on HANA ואלה שתוכננו ב-MRP הקלאסי ואת משך הריצה, ולכל Low-Level Code מדדי ביצוע מפורטים (2025 FPS01).", xrefs: ["tx:MD01N"] },
      ],
      eccToS4: [
        { he: "ECC: MRP קלאסי ב-MD01 ו-MD02 בעיבוד batch על בסיס הנתונים המסורתי, עם קובץ תכנון. S/4HANA: MRP Live ב-MD01N רץ על HANA ברמת חומר, לפי רשומת המעבר של המאגר.", xrefs: ["tx:MD01", "tx:MD01N"] },
        { he: "פריט הפישוט הרשמי 'S4TWL - MRP in HANA' קובע שהטרנזקציות הקלאסיות עדיין זמינות ב-S/4HANA, אינן חלק מחבילת התאימות, ולא הוגדר להן תאריך סיום חיים, בעוד MRP Live נחשבת לטכנולוגיית העתיד. רשומת האימות מסווגת את MD01 כפריט פישוט ולא כמוצאת משימוש.", xrefs: ["tx:MD01"] },
        { he: "לפי אותו פריט, קובץ התכנון החדש משמש גם את ה-MRP הקלאסי, קריאת הנתונים של MD01, MD02 ו-MD03 עברה אופטימיזציה ל-HANA באמצעות AMDP ואינה ניתנת לכיבוי, ומפתח העיבוד NETPL אינו נתמך עוד.", xrefs: ["tx:MD01", "tx:MD02", "tx:MD03"] },
        { he: "תיעוד PP-MRP של 2025 FPS01 קובע ש-MD01N היא העתק של MD01 ושדוח ה-MRP Live הוא העתק של דוח התכנון הכולל הקלאסי, ושהיא יכולה לקרוא ל-MRP הקלאסי.", xrefs: ["tx:MD01N"] },
        { he: "MD04 מתועדת ב-2025 FPS01 כאפליקציה Monitor Stock / Requirements List, וממשיכה לקבל יכולות חדשות; פריט פישוט רשמי מסיר ממנה את התצוגה הגרפית של הכמות הזמינה ומפנה ליישומי Manage או Check Material Coverage.", xrefs: ["tx:MD04", "fiori:F0251"] },
        { he: "ב-Fiori: תזמון הריצה ביישום Schedule MRP Runs (F1339), והערכת הכיסוי ב-Monitor Material Coverage - Net Segments (F0247A) ו-Manage Material Coverage (F0251). המקבילות הקלאסיות לפי דפי ההשוואה הרשמיים: MD06 ו-MD07 ליישום הניטור, MD04 ליישום הניהול.", xrefs: ["fiori:F1339", "fiori:F0247A", "fiori:F0251", "tx:MD06", "tx:MD07"] },
        { he: "הרחבות: לפי עמוד השינויים הלא תואמים של MRP Live, היא אינה מעבדת BAdIs לחומרים המתוכננים במלואם ב-HANA; לחומר שהיא מנתבת ל-MRP הקלאסי המימוש הקלאסי הקיים עדיין שמיש, לפי פריט הפישוט.", xrefs: ["enh:exit:M61X0001"] },
        { he: "דרישות רכש: לפי עמוד השינויים הלא תואמים, ב-MRP Live אין מחוון יצירה לדרישות רכש, והיא מוחקת ויוצרת מחדש הצעות שלא קובעו.", xrefs: ["table:EBAN"] },
      ],
      migration: [
        { he: "לפי רשומת התחום של המאגר, תוצרי התכנון נשמרים בהמרה; בדיקת ה-QA היא השוואת כיסוי החומרים והביצועים בין MD01 ל-MD01N, כולל תרחישי קבלנות משנה.", xrefs: ["tx:MD01", "tx:MD01N"] },
        { he: "לפי מרכז ה-MRP של המאגר, ב-S/4HANA אזורי תכנון (MRP Areas) מופעלים כברירת מחדל, ויש לוודא את הקצאת החומרים אליהם לאחר ההמרה.", xrefs: ["table:MARC"] },
        { he: "בדיקה קריטית לפני ואחרי ההמרה: גרסת ייצור תקפה לכל חומר מיוצר, לפי מרכז ה-MRP של המאגר.", xrefs: ["table:MKAL", "tx:C223"] },
        { he: "קוד מותאם ודוחות הנשענים על מחוון היצירה של דרישות רכש או על יציבות מספרי דרישה בין ריצות דורשים בדיקה, לפי רשומת האימות של EBAN.", xrefs: ["table:EBAN"] },
      ],
      reference: {
        title: "Carrying Out the Planning Run Using MRP Live | Material Requirements Planning (PP-MRP) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/bc5a76513feb1f66e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד התהליך הרשמי של ריצת התכנון ב-MRP Live בתיעוד PP-MRP של 2025 FPS01 (אומת ברשומת tx:MD01). רשומות " +
          "What's New של 1909 ו-2021 המצוטטות ברשומה מדפיסות את Scope Item J44 (Material Requirements Planning) " +
          "בפרטי ה-API; עמוד תהליך של J44 לא נקרא, ולכן ההפניה נשארת עמוד התהליך של PP-MRP.",
      },
    },
    xrefs: [
      "tx:MD01", "tx:MD01N", "tx:MD02", "tx:MD03", "tx:MD04", "tx:MD05", "tx:MD06", "tx:MD07", "tx:MD20",
      "tx:MD21", "tx:MD41", "tx:MD61", "tx:MD62", "tx:MDBT", "tx:CO40", "tx:CO41", "tx:COR8", "tx:C223",
      "table:MARC", "table:EBAN", "table:MKAL", "table:MAST", "table:RESB", "table:PLKO",
      "fiori:F1339", "fiori:F0247A", "fiori:F0251",
      "cds:I_MRPMaterial", "cds:I_ProductionVersion", "cds:I_BillOfMaterial",
      "enh:exit:M61X0001", "enh:badi:MD_PLDORD_POST", "enh:badi:MD_ADD_ELEMENTS",
      "bp:production-order-process", "bp:plan-to-produce-discrete",
      "fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL", "fm:BAPI_PR_CREATE",
      "fm:BAPI_REQUISITION_GETDETAIL", "fm:BAPI_TRANSACTION_COMMIT", "fm:MD_CONVERT_MATERIAL_UNIT",
      "fm:MATERIAL_UNIT_CONVERSION", "fm:MARC_SINGLE_READ", "obj:planned-order", "tx:MD11", "tx:MD13",
      "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מרכז ה-MRP של הפרויקט (MRP_SECTIONS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "יסודות: דרישות נטו הן ביקוש פחות מלאי זמין פחות כניסות מתוכננות, מקורות הדרישה הם PIR, הזמנות לקוח, " +
          "דרישות תלויות ומלאי בטחון, והתוצר הוא הזמנה מתוכננת או דרישת רכש; MRP Live מול קלאסי; MPS לפריטים " +
          "קריטיים עם קיבוע ואופק קיבוע; PIR ותחזית; אסטרטגיות תכנון; Net Change מול תכנון מלא מחדש; אזורי תכנון " +
          "(ב-S/4HANA מופעלים כברירת מחדל); שיטת אצווה, מלאי בטחון ונקודת הזמנה; וגרסת ייצור שהיא חובה לתרחישי " +
          "MRP Live ו-PP-DS.",
        verificationLevel: "repository_verified",
        repoRef: "data/mrp-center.ts#MRP_SECTIONS",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום של הפרויקט (DOMAINS): pppi-mrp, pppi-planning, pppi-mps",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MRP: קלט של דרישות, מלאי ו-BOM, ריצה, הזמנות מתוכננות, הערכה ב-MD04 והמרה; טרנזקציות MD01 עד MD07 " +
          "ו-MD01N; תקלות: חומר לא מתוכנן, כפל דרישות, הזמנות שאינן מומרות ללא גרסת ייצור. תכנון ביקוש: SOP, ניהול " +
          "ביקוש, PIR ב-MD61 והעברה ל-MRP. MPS: סימון פריט בסוג MRP מקבוצת M, הרצה ב-MD41, ייצוב וקיבוע, ואז MRP " +
          "לרכיבים.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-mrp (+pppi-planning, pppi-mps)",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים של הפרויקט (DOMAIN_DETAIL): pppi-mrp, pppi-mps",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מטרה, דיאגרמת שלבים (ביקוש, חישוב דרישות נטו, שיטת אצווה, תזמון, הזמנות מתוכננות ודרישות רכש, המרה), " +
          "נתוני אב (סוג MRP, שיטת אצווה, מלאי בטחון, זמני אספקה, היקף התכנון), Exits‏ M61X0001 ו-M61X0002, BAdIs‏ " +
          "MD_PLDORD_POST, MD_MRP_LIST ו-MD_ADD_ELEMENTS, תרחישי QA, תקריות, יישומי Fiori, הגירה (השוואת MD01 " +
          "מול MD01N) ומעבר ECC ל-S/4HANA; וב-MPS: אופק קיבוע ופיצוץ רכיבים אחרי ייצוב.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-mrp (+pppi-mps)",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'MRP חי' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: MRP קלאסי (MD01/MD02) על בסיס נתונים מסורתי בעיבוד batch עם קובץ תכנון. S/4HANA: MRP Live (MD01N) " +
          "על HANA, מהיר משמעותית, וחלק מהפרמטרים הישנים אינם נתמכים; סטטוס 'שונה'; ההשפעה: תרחישים מסוימים עדיין " +
          "נופלים ל-MRP הקלאסי ויש לבדוק תאימות; הרשומה מציינת את יישומי ה-Fiori לניטור ולניהול כיסוי החומרים.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#mrp-live",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): MD01, MD01N, MD02, MD04",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MD01 היא ריצת תכנון כוללת ברמת מפעל הנשלטת במפתח עיבוד (NEUPL, NETCH, NETPL) ויוצרת הזמנות מתוכננות " +
          "ודרישות רכש; MD01N היא MRP Live על HANA, מקבילית, בלי יצירת רשימות MRP כברירת מחדל, ועם תרחישים שנופלים " +
          "ל-MRP הקלאסי; MD02 מתכננת חומר בודד רב-רמתי; MD04 היא רשימת המלאי והדרישות הדינמית. הרשומות מונות BAdIs " +
          "MD_MRP_LIST, MD_PURREQ_CHANGE ו-MD_PLDORD_CHANGE ו-Exits M61X0001 ו-M61X0002.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD01 (+MD01N, MD02, MD04)",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: mrp-no-planned-orders, mrp-exception-messages, no-production-version, planned-order-not-convert",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אין הזמנות מתוכננות: קובץ התכנון אינו מסמן את החומר, סוג ה-MRP אינו רלוונטי, אין דרישה, אופק התכנון קצר " +
          "או שהחומר לא הורחב למפעל; הודעות חריגה נערמות ב-MD06 וב-MD04 בלי טיפול; אין גרסת ייצור תקפה ב-MKAL " +
          "ולכן MRP Live נכשל לחומר ואי אפשר ליצור פקודה; המרת הזמנה מתוכננת נכשלת ללא גרסת ייצור או בחומר חסום.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#mrp-no-planned-orders (+no-production-version; data/troubleshooting-ext2.ts#mrp-exception-messages, planned-order-not-convert)",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט (FIORI_APPS): F1339, F0247A, F0251",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "Schedule MRP Runs (F1339) מתזמנת Job להרצת MRP מעל מסגרת ה-Application Jobs, עם קטלוג Job‏ SAP_SCM_MRP; " +
          "התפקידים SAP_BR_MATL_PLNR_EXT_PROC, SAP_BR_PRODN_PLNR ו-SAP_BR_RPLNMT_SPCLST_DC_RFM, ו-guiTx שבהם MD01, " +
          "MD01N, MD02, MD03, MD41 ו-MDBT. Monitor Material Coverage - Net Segments (F0247A) היא נקודת הכניסה של " +
          "MRP Cockpit לזיהוי חוסרים, עם התפקידים SAP_BR_MATL_PLNR_EXT_PROC ו-SAP_BR_PRODN_PLNR ו-guiTx שבהם MD04, " +
          "MD06 ו-MD07. Manage Material Coverage (F0251) פותרת חוסרים לחומר בודד, עם התפקיד SAP_BR_PRODN_PLNR " +
          "ו-guiTx MD04 ו-MD07. התפקידים וה-guiTx הועתקו במאגר מספריית ה-Fiori (S32OP) ב-2026-09-24.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F1339 (+F0247A, F0251)",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.2 S4TWL - MRP in HANA (PP-MRP), pp. 651-655",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TX,
        claim:
          "פריט 9.5.2 (רכיב יישום PP-MRP) נוקב ב-MD01 תחת 'Other Terms' וקובע בעמ' 653: 'Classic MRP (transactions " +
          "MD01, MD02, MD03, MD40, MD41, MD42, MD43, MD50, MD51 and jobs RMMRP000, RMMPS000) are still available " +
          "in SAP S/4HANA but MRP live (transaction MD01N) is considered the future technology. Classic MRP " +
          "transactions are not part of the compatibility pack. An end-of-life date for the classic MRP has not " +
          "yet been defined.' בעמ' 655: קובץ התכנון החדש משמש גם את ה-MRP הקלאסי, וקריאת הנתונים של MD01, MD02 " +
          "ו-MD03 עברה אופטימיזציה ל-HANA באמצעות AMDP ואינה ניתנת לכיבוי ב-S/4HANA (אומת ברשומת tx:MD01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.6 S4TWL - Planning File (PP-MRP), pp. 790-791",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TX,
        claim:
          "פריט 9.5.6 (רכיב יישום PP-MRP) קובע בעמ' 791: 'SAP S/4HANA, on-premise editions no longer supports net " +
          "change planning in the planning horizon (processing key NETPL). MRP always determines material " +
          "shortages for all known material requirements... This is valid both for the classic MRP and MRP Live.' " +
          "בטבלת 'Transaction not available in SAP S/4HANA on-premise edition' מופיעות MDAB ו-MDRE (אומת ברשומת " +
          "tx:MD01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Carrying Out the Planning Run Using MRP Live | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/bc5a76513feb1f66e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "הסניפט הרשמי (loio bc5a76513feb1f66e10000000a441470, 2025 FPS01) קובע: 'The transaction MD01N is a " +
          "copy of the transaction MD01', ושדוח MRP Live (PPH_MRP_DISPATCHER) 'is a copy of the report " +
          "RMMRP000'; MRP Live (MD01N) יכולה לקרוא ל-MRP הקלאסי ('MRP Live (transaction MD01N) calls classic " +
          "MRP'), והעמוד מפנה ל-'When to Plan in MRP Live and When to Plan with Classic MRP' ול-'MRP Live: " +
          "Incompatible Changes' (אומת ברשומת tx:MD01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MRP Live: Incompatible Changes | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/1d4ee5514ec5c90ae10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL,
        claim:
          "עמוד השינויים הלא תואמים של MRP Live בגרסת 2025 FPS01 קובע שמחוון היצירה של דרישות רכש אינו זמין " +
          "ב-MRP Live: 'The creation indicator for purchase requisitions is not available in MRP Live. MRP Live " +
          "always creates purchase requisitions for external procurement', ושהריצה מוחקת דרישות רכש שנוצרו בריצת " +
          "תכנון קודמת ויוצרת חדשות במקומן: 'MRP Live deletes planned orders or purchase requisitions created by " +
          "an earlier planning run and creates new ones', בתנאי שלא קובעו (if they were not firmed). באותו עמוד: " +
          "'MRP Live (transaction MD01N) does not process BAdIs for materials that are completely planned in SAP " +
          "HANA' (אומת ברשומות table:EBAN ו-enh:exit:M61X0001).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Managing Material Coverage | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/0fc6b5b8da9d4138a73a65a46ee01038.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "דף ההשוואה הרשמי של 2025 FPS01 מונה: 'App Name Monitor Stock / Requirements List Manage Material " +
          "Coverage (F0251) Manage Material Coverage (F0251A) App ID MD04 F0251 F0251A', כלומר MD04 מתועדת " +
          "ב-S/4HANA כאפליקציה 'Monitor Stock / Requirements List' (App ID = MD04), ומושווית ליישומי Manage " +
          "Material Coverage (אומת ברשומת tx:MD04).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Replenishment: Logistical Products | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/fe85afc5f89d4e4e94d9ce609702b5ab.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "הסניפט (deliverable של Retail, 2025 FPS01, loio fe85afc5f89d4e4e94d9ce609702b5ab) מציג את ריצת " +
          "התכנון בשני נתיבים: 'Classic MRP: Schedule MRP Runs app (transaction MD01)', 'MRP - Single-Item, " +
          "Multi-Level app (transaction MD02)', 'MRP-Individual Planning-Single Level app (transaction MD03)', " +
          "ולצדם 'MRP Live optimized for SAP HANA: Schedule MRP Runs' '(transaction MD01N or app ID F1339)' " +
          "(אומת ברשומות tx:MD01 ו-fiori:F1339).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Schedule MRP Runs | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/e5f613565b4b7278e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "מדריך היישום קובע כתנאי מוקדם: 'The user needs authorization to schedule corresponding batch jobs'; יש לוודא " +
          "שרשומת קטלוג ה-Job SAP_SCM_MRP מתוחזקת בפעילות ה-Customizing 'Activation of Scope-Dependent Application Job " +
          "Catalog Entries (S/4HANA)'; אובייקטי ההרשאה הנדרשים: S_PROGRAM עם P_GROUP = PPH_MRP, ו-S_PROGNAM עם " +
          "P_PROGNAM = PPH_MRP_START (אומת ברשומת fiori:F1339).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (SAP PRESS, Production Planning with SAP S/4HANA), פרק 13 'Material Requirements Planning'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את אותו תהליך: סקירת התהליך (13.1), שיטות מילוי דטרמיניסטיות וסטוכסטיות (13.2 ו-13.3), שיטות " +
          "אצווה (13.5), פסולת (13.7), מלאי בטחון (13.8), תזמון (13.9), הצעות רכש והזמנות מתוכננות (13.10), MRP " +
          "Live (13.12), רשימת המלאי והדרישות (13.13), אזורי תכנון (13.15), MRP קלאסי (13.16) וסוגי ריצות התכנון " +
          "(13.17); הספר משמש כאן להפניית קריאה ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#13.1",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט: BAPI_PLANNEDORDER_CREATE, BAPI_PLANNEDORDER_GET_DETAIL",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "BAPI_PLANNEDORDER_CREATE: יצירת הזמנה מתוכננת, פרמטרים 'IMP HEADERDATA · EXP PLANNEDORDER · TAB RETURN', " +
          "טרנזקציה MD11, טבלה PLAF, קשור ל-BAPI_TRANSACTION_COMMIT; רישום ה-sweep מוסיף 'תוצר תכנון MRP או ידני. " +
          "דורש COMMIT.'. BAPI_PLANNEDORDER_GET_DETAIL: שליפת פרטי הזמנה מתוכננת, קריאה בלבד, טרנזקציה MD13. מקורות " +
          "האימות שהרישום נוקב בהם אינם מקורות SAP רשמיים.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PLANNEDORDER_CREATE (+BAPI_PLANNEDORDER_GET_DETAIL; data/bapi-enrichment.sweep.ts#BAPI_PLANNEDORDER_CREATE)",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): שדה ה-BAPIs של MD11, MD13, MD61, MD62, MD04, CO40, CO41",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "MD11 נוקבת ב-BAPI_PLANNEDORDER_CREATE וב-BAPI_PLANNEDORDER_GET_DETAIL, ו-MD13 " +
          "ב-BAPI_PLANNEDORDER_GET_DETAIL; MD61 נוקבת ב-BAPI_REQUIREMENTS_CREATE, BAPI_REQUIREMENTS_CHANGE " +
          "ו-BAPI_REQUIREMENTS_GETDETAIL, ו-MD62 בשני האחרונים; MD04 נוקבת ב-BAPI_MATERIAL_STOCK_REQ_LIST; CO40 " +
          "ו-CO41 נוקבות ב-BAPI_PRODORD_CREATE_FROM_PLORD.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD11 (+MD13, MD61, MD62, MD04, CO40, CO41)",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום ופירוט התחום של MRP, וקטלוג הפונקציות של הפרויקט",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "רשומת התחום pppi-mrp נוקבת ב-BAPIs‏ BAPI_MATERIAL_AVAILABILITY ו-BAPI_PLANNEDORDER_CREATE; פירוט התחום " +
          "pppi-mrp מונה את הפונקציות MD_CONVERT_MATERIAL_UNIT, MATERIAL_UNIT_CONVERSION ו-MARC_SINGLE_READ. קטלוג " +
          "הפונקציות: MD_CONVERT_MATERIAL_UNIT ממירה יחידת מידה של חומר בהקשר MRP ותכנון; MATERIAL_UNIT_CONVERSION " +
          "ממירה כמות בין יחידות מידה של חומר; MARC_SINGLE_READ קוראת נתוני אב חומר ברמת מפעל; BAPI_PR_CREATE יוצרת " +
          "דרישת רכש; BAPI_REQUISITION_GETDETAIL שולפת פרטי דרישת רכש, ו'QA בודק PR שנוצרה מפקודה/MRP'. רישום " +
          "ה-sweep: BAPI_PR_CREATE 'דורש BAPI_TRANSACTION_COMMIT'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-mrp (+data/domains.ts#pppi-mrp; data/function-intel.ts#BAPI_REQUISITION_GETDETAIL, BAPI_PR_CREATE, MD_CONVERT_MATERIAL_UNIT, MATERIAL_UNIT_CONVERSION, MARC_SINGLE_READ; data/bapi-enrichment.sweep.ts#BAPI_PR_CREATE)",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט (FIORI_APPS): שדה ה-OData של F1339, F0247A, F0251",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "שדה ה-OData שהועתק מספריית ה-Fiori (scripts/fal-app.mjs, S32OP = 2025 FPS01): F1339 " +
          "'APJ_JOB_MANAGEMENT_SRV'; F0247A 'PP_MRP_AOR_SRV, PP_MRP_MATERIAL_COVERAGE_POVER_SRV_, " +
          "PP_MRP_MATERIAL_COVERAGE_SRV'; F0251 'PP_MRP_COCKPIT_SRV'.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F1339 (+F0247A, F0251)",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planned Order (OData V2)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/43ae2e5876b4a107e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM24,
        claim:
          "עמוד 'Planned Order (OData V2)' בתיעוד S/4HANA 2025 FPS01 קובע: 'Technical name: API_PLANNED_ORDERS This " +
          "service enables you to read, create, change, and delete planned orders as well as components belonging " +
          "to planned orders.' הסניפט אינו נוקב ב-BAPI. (אומת ברשומת fm:BAPI_PLANNEDORDER_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planned Order (OData V4)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/a3647ff7717044128f7c42d141e49edc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM24,
        claim:
          "עמוד 'Planned Order (OData V4)' בתיעוד S/4HANA 2025 FPS01 קובע: 'Service name: PlannedOrder Technical " +
          "name: API_PlannedOrder This service enables the following operations: Read planned orders'. הסניפט אינו " +
          "נוקב ב-BAPI ואינו מציג את השירות כיורש שלו. (אומת ברשומת fm:BAPI_PLANNEDORDER_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Purchase Requisition | APIs for Sourcing and Procurement",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91af7f8d3acd47da90d33aaacfcd0d59/9fcd8bf3ff7644faa16c92a010e53fa1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM22,
        claim:
          "בחוברת 'APIs for Sourcing and Procurement' לגרסת S/4HANA On-Premise 2025 FPS01, העמוד 'Operations for " +
          "Purchase Requisition' קובע: 'Purchase requisition offers the following operations', ובהן 'Create a " +
          "purchase requisition Create POST', קריאה (GET) ועדכון (PATCH) תחת הנתיב " +
          "/sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader, 'Delete a purchase " +
          "requisition Delete PATCH' ופעולת EnableForPurchasing (POST). זו חלופת OData מתועדת ליצירה ולעדכון של " +
          "דרישת רכש. העמוד אינו נוקב בשם ה-BAPI ואינו מציג אותו כמוחלף. (אומת ברשומת fm:BAPI_PR_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 30.2 S4TWL - MRP in HANA (PP-MRP)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "פריט 30.2 (רכיב PP-MRP) קובע תחת 'MRP Lists': 'There is also the possibility to read stock/requirements " +
          "lists via API MD_MDPSX_READ_API or BAPI BAPI_MATERIAL_STOCK_REQ_LIST.', 'FM: BAPI " +
          "BAPI_MATERIAL_STOCK_REQ_LIST is official released function module and therefore recommended to use.' " +
          "ו-'FM: MD_MDPSX_READ_API is not official released and the interface or results may change via future SAP " +
          "Notes / Service packs or releases'. הטקסט נקרא מהעתק הטקסט של ה-PDF הרשמי בפרויקט " +
          "(scratchpad/official/SIMPL_OP2023.pdf.txt, שורות 39004 עד 39009); כתובת ה-PDF הועתקה מרשומת האימות " +
          "tx:MD04.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planned Independent Requirements | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/c81d1718b16147b5811acce3f1888054.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio c81d1718b16147b5811acce3f1888054, נקרא דרך שירות התוכן) קובע: 'Technical name: " +
          "API_PLND_INDEP_RQMT_SRV This service enables you to read and update planned independent requirements " +
          "(PIRs).', 'this service gives you the possibility to maintain PIRs in an external system', ו-'The " +
          "service is based on the OData protocol, and can be consumed by external systems and user interfaces.' " +
          "הישות PlannedIndepRqmt 'Contains the key fields and the attribute PlndIndepRqmtIsActive which determines " +
          "whether a PIR is active. This means that it is considered during MRP and forecast consumption.' העמוד " +
          "אינו נוקב ב-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "API for Material Planning Data (Read) | What's New in SAP S/4HANA 1909",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/80c27e12d0074f74a32b477eb9b2aa81.html?locale=en-US&state=PRODUCTION&version=1909.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1909.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 80c27e12d0074f74a32b477eb9b2aa81, נקרא דרך שירות התוכן) קובע: 'This service enables you " +
          "to read planning data for materials in Material Requirements Planning (MRP). The service is based on the " +
          "OData protocol, and can be consumed by external systems and user interfaces.' הפעולות: 'Read material " +
          "master data for one or more materials', 'Read supply and demand information for materials over a certain " +
          "time period' ו-'Read material coverage information'; Type New, רכיב PP-ES, 'Available As Of SAP S/4HANA " +
          "1909'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Material Planning Data - Read | What's New in SAP S/4HANA 2021",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6a6bb2a2a56b446694d1a4c37c8308cd.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 6a6bb2a2a56b446694d1a4c37c8308cd) קובע: 'With the OData API Material Planning Data – " +
          "Read ( API_MRP_MATERIALS_SRV_01 ), you can read planning data for materials in Material Requirements " +
          "Planning (MRP). This API has been made extensible for reading material master data.' Type Changed, רכיב " +
          "PP-ES, 'Available As Of SAP S/4HANA 2021', ותחת Technical Details: 'Scope Item J44 ( Material " +
          "Requirements Planning )'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "SOAP API: MRP Change Request - Send | What's New in SAP S/4HANA 2021",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ddc36d9411564d8ebc45f717e63be0ac.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio ddc36d9411564d8ebc45f717e63be0ac) קובע: 'This service enables you to send MRP change " +
          "requests to suppliers using an external system. Using this asynchronous outbound service, you can " +
          "transfer one or more change requests.' Type New, רכיבים PP-MRP ו-PP-ES, 'Available As Of SAP S/4HANA " +
          "2021', ותחת Technical Details: 'Scope Item J44 ( Material Requirements Planning )'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitor Material Coverage - Net Segments | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/5ab21556d22c0033e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 5ab21556d22c0033e10000000a44538d, נקרא דרך שירות התוכן) מתאר רשימת חומרים 'that might " +
          "have coverage issues according to a specified shortage definition', עם הגדרות ברירת המחדל MRP Standard, " +
          "Stock Days' Supply, Ordered Requirements ו-Ordered Receipts ומסנן 'Shortage Evaluation Period'; היישום " +
          "מציג 'days' supply and intraday supply information', את 'the number of receipt elements in the stock / " +
          "requirements list that are past due for each material' ואת 'the number of rescheduling proposals' " +
          "(Reschedule In, Reschedule Out, Cancel Process), ומאפשר 'Perform the MRP run at material level'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Monitoring Material Coverage | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/f8323a1b1ddb4d538bce5c3aa3588e1b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio f8323a1b1ddb4d538bce5c3aa3588e1b) משווה את MD06, MD07, F0247A ו-F2101A, ומונה בין השורות " +
          "'Define tiles with KPIs', 'Display material shortages', 'Display range of coverage' (Days' supply, Stock " +
          "days' supply, Intraday supply, Stock intraday supply) ו-'Display MRP exceptions' (MRP master data " +
          "issues, Opening date in the past, Start date in the past, End date in the past). הטבלה נקראה כטקסט שטוח, " +
          "ולכן שיוך כל ערך לעמודה אינו נטען כאן.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Ranges of Coverage in MRP | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/87aace5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 87aace5314894208e10000000a174cb4) קובע: 'The days' supply and receipt days' supply " +
          "indicate how many days the plant stock currently available (in the case of the receipt days' supply, " +
          "plant stock plus certain receipts) will be able to cover the existing requirements. Both types of days' " +
          "supply are calculated by the system during the planning run and are displayed in MRP Evaluations.' וכן " +
          "ש-Actual Range of Coverage מחושב בריצת התכנון ומוצג 'in the period totals display in MRP Evaluations and " +
          "in the planning table for repetitive manufacturing'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MRP Live Performance Log | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/11573a53c2d10250e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 11573a53c2d10250e10000000a44176d) קובע: 'The MRP Live Performance Log (with the " +
          "technical name PPH_MRP_PERF ) provides you with performance information for your MRP Live runs', כולל " +
          "'the total number of materials planned, the total number of materials for which the planning run failed, " +
          "the total number of materials planned in MRP Live on HANA, and the total number of materials planned in " +
          "classic MRP' ומשך הריצה, ולכל Low-Level Code 'a large number of detailed key performance indicators'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE25,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:MD01, tx:MD04, " +
      "table:EBAN, enh:exit:M61X0001 ו-fiori:F1339. הטבלאות PLAF, MDKP, MDTB ו-MDVM, שרשומות המאגר נוקבות בהן " +
      "כתוצרי התכנון וכקובץ התכנון, אינן במילון המזהים של הפרויקט ולכן נשארות בפרוזה בלבד. רובד המאגר מסמן את " +
      "MD01 כ'לא אסטרטגי' או 'הוחלף', ואילו המקור הרשמי קובע זמינות ללא תאריך סיום חיים: הרשומה הזו הולכת אחרי " +
      "הניסוח הרשמי. מספרי SAP Notes המופיעים בפריטי הפישוט לא נקראו מגוף ה-Note ולכן אינם נרשמים כאן. בבדיקה " +
      "של 2026-09-22 פריט SAP Best Practices (Scope Item) לתהליך לא אותר; ראו את התוספת להלן. לא בוצעה בדיקה " +
      "במערכת SAP חיה. תוספת 2026-09-25 (השלמת שדות): נוספו process.interfaces ו-process.kpis. " +
      "BAPI_REQUIREMENTS_CREATE, BAPI_REQUIREMENTS_CHANGE, BAPI_REQUIREMENTS_GETDETAIL, " +
      "BAPI_MATERIAL_STOCK_REQ_LIST, MD_MDPSX_READ_API, BAPI_PRODORD_CREATE_FROM_PLORD " +
      "ו-BAPI_MATERIAL_AVAILABILITY נקובים ברשומות המאגר או בפריט הפישוט ואינם במילון הפרויקט, ולכן נשארים " +
      "בפרוזה. שירותי ה-OData‏ API_PLANNED_ORDERS, API_PlannedOrder, API_PURCHASEREQ_PROCESS_SRV, " +
      "API_PLND_INDEP_RQMT_SRV ו-API_MRP_MATERIALS_SRV_01 ושירות ה-SOAP לבקשות שינוי MRP נקובים לפי עמודי " +
      "help.sap.com בלבד; api.sap.com לא נקרא. אף IDoc במילון הפרויקט אינו מתועד כממשק של ריצת ה-MRP, ולכן אין " +
      "שורת IDoc. המדדים נלקחו מעמודי PP-MRP של 2025 FPS01 בלבד; מדדי ניהול כלליים ללא מקור לא נרשמו. רשומות " +
      "What's New של 1909 ו-2021 שנקראו (API for Material Planning Data, OData API: Material Planning Data - " +
      "Read, SOAP API: MRP Change Request - Send) מדפיסות תחת Technical Details את Scope Item J44 (Material " +
      "Requirements Planning); ההפניה הרשמית (reference) של הרשומה לא שונתה בהשלמה זו.",
  },

  /* ====================================================== plan-to-produce */
  {
    slug: "plan-to-produce-discrete",
    he: "תכנון לייצור בדיד מקצה לקצה (Plan-to-Produce)",
    en: "Plan-to-produce for discrete manufacturing, end to end",
    module: "PP",
    summary:
      "השרשרת המלאה מביקוש ועד עלות: ניהול ביקוש, ריצת MRP, המרה לפקודת ייצור, תכנון קיבולת ושחרור, ביצוע ודיווח, " +
      "קבלת תוצרת, ולבסוף סטיות והתחשבנות. שני התהליכים שמרכיבים אותה מתועדים בנפרד ברשומות התכנון והפקודה.",
    context:
      "מפת התהליך של המאגר מונה שישה שלבים: ניהול ביקוש (MD61, MD62), MRP (MD01N, MD04), פקודת ייצור או תהליך " +
      "(CO01, COR1), ביצוע ואישור (CO11N, COR6N, COGI), קבלת תוצר (MIGO, MB31) והתחשבנות עם סטיות (KKS2, CO88). " +
      "בין ה-MRP לשחרור נכנס תכנון הקיבולת: הערכת עומס מול קיבולת זמינה ופנמייה. ב-S/4HANA שלושה שינויים נוגעים " +
      "לשרשרת הזאת לפי רשומות המעבר של המאגר: MRP Live, בדיקת זמינות מתקדמת (aATP) ותכנון מפורט ב-PP-DS מוטמע; " +
      "מבנה פקודת הייצור עצמו נשאר זהה ברובו, והעלויות נזקפות ליומן האוניברסלי.",
    steps: [
      {
        he: "ניהול ביקוש: הזנת דרישות עצמאיות מתוכננות ב-MD61 או ב-MD62 בגרסת דרישות פעילה, לצד הזמנות לקוח, לפי אסטרטגיית התכנון של החומר.",
        xrefs: ["tx:MD61", "tx:MD62", "table:MARC"],
      },
      {
        he: "ריצת תכנון: MRP Live ב-MD01N (או הריצה הקלאסית), שיוצרת הזמנות מתוכננות ודרישות רכש ומפצצת דרישות תלויות לרכיבים.",
        xrefs: ["tx:MD01N", "table:EBAN", "bp:mrp-process"],
      },
      {
        he: "הערכת התכנון: MD04 לרשימת המלאי והדרישות, MD06 ו-MD07 למבט קולקטיבי, ויישומי MRP Cockpit ב-Fiori לזיהוי חוסרים ולפעולות תיקון.",
        xrefs: ["tx:MD04", "tx:MD06", "tx:MD07", "fiori:F0247A", "fiori:F0251"],
      },
      {
        he: "המרה לביצוע: הזמנה מתוכננת לפקודת ייצור ב-CO40 או ב-CO41; ההמרה דורשת גרסת ייצור תקפה.",
        xrefs: ["tx:CO40", "tx:CO41", "table:MKAL", "bp:production-order-process"],
      },
      {
        he: "תכנון קיבולת: הערכת עומס מול קיבולת זמינה ב-CM01 ופנמייה ב-CM21 או ב-CM25; ב-Fiori לוח תזמון הקיבולת (F3951) ורשימת קיבולת מרכזי העבודה (F3289), ובתרחישי PP-DS לוח תזמון הייצור (F2176).",
        xrefs: ["tx:CM01", "tx:CM21", "tx:CM25", "fiori:F3951", "fiori:F3289", "fiori:F2176", "table:KAKO", "table:CRHD"],
      },
      {
        he: "שחרור: CO02 משחרר את הפקודה ומפעיל את בדיקת זמינות הרכיבים; ב-S/4HANA בדיקת הזמינות המתקדמת (aATP) מוסיפה עיבוד הזמנות פתוחות והקצאת מוצר, לפי רשומת המעבר של המאגר.",
        xrefs: ["tx:CO02", "tx:CO09", "tx:CO24"],
      },
      {
        he: "ביצוע ודיווח: ניפוק חומרים או Backflush, דיווח פעולה ב-CO11N או דיווח מסכם ב-CO15, וניקוי תנועות שנכשלו ב-COGI.",
        xrefs: ["tx:CO11N", "tx:CO15", "tx:COGI", "table:AFRU"],
      },
      {
        he: "קבלת תוצרת: תנועת 101 מול הפקודה ב-MIGO או ב-MB31, או קליטה אוטומטית בדיווח; ב-S/4HANA התנועה נרשמת בטבלת מסמכי החומר החדשה.",
        xrefs: ["tx:MIGO", "tx:MB31", "obj:material-document", "bp:matdoc-read-through-compatibility"],
      },
      {
        he: "סגירה פיננסית: סגירה טכנית, חישוב WIP וסטיות (KKAX, KKS1, KKS2) והתחשבנות ב-KO88 או ב-CO88; לפי רשומת ההשפעה של המאגר, ב-S/4HANA הדיווח הפיננסי עובר ליומן האוניברסלי ACDOCA.",
        xrefs: ["tx:KKAX", "tx:KKS2", "tx:KO88", "tx:CO88", "table:ACDOCA"],
      },
      {
        he: "אנליטיקה ושיפור: COOIS ו-COHV למעקב ולעיבוד המוני, יישום ניהול הזמנות הייצור ב-Fiori, ומדדי תפוקה, פסולת, זמן מחזור וניצולת לפי רשומת אנליטיקת הייצור של המאגר (תחום PP-PI, משותפת לייצור בדיד ותהליכי).",
        xrefs: ["tx:COOIS", "tx:COHV", "fiori:F2336", "cds:I_ProductionOrder"],
      },
    ],
    antiPatterns: [
      "דילוג על שלב הערכת התכנון: הצעות MRP מומרות לפקודות בלי לבדוק חריגות, מועדים וכיסוי.",
      "תכנון קיבולת שמתבצע אחרי השחרור במקום לפניו: הפקודות משוחררות לקו עמוס ומאחרות.",
      "טיפול בשרשרת כשלושה איים נפרדים (תכנון, ייצור, בקרה): סטיות מתגלות רק בסגירת החודש.",
      "הנחה שכל תרחיש תכנון עובר ל-MRP Live: לפי רשומות המאגר חלק מהחומרים מנותבים ל-MRP הקלאסי, ולפי פריט הפישוט S4TWL - MRP in HANA (PP-MRP) הטרנזקציות הקלאסיות עדיין זמינות ב-S/4HANA.",
      "הסתמכות על דוחות עלות שקוראים טבלאות מסכמות ישנות אחרי המעבר ליומן האוניברסלי.",
    ],
    checks: [
      "מקצה לקצה: PIR, ריצת MRP, המרה לפקודה, שחרור, דיווח, קבלת תוצרת והתחשבנות, בלי חריגה בשום שלב.",
      "קיבולת: עומס מרכז עבודה נבדק ב-CM01 לפני השחרור, ופנמייה ב-CM21 מזיזה פעולות בלי לשבור מועדים.",
      "זמינות: שחרור פקודה בחוסר רכיב נחסם לפי כללי הבדיקה, ולא עובר בשקט.",
      "פיננסי: אחרי ההתחשבנות אין יתרה פתוחה בפקודה, והסטיות ניתנות להסבר מול עלות התקן.",
      "מעבר: השוואת התוצאות של אותו תרחיש לפני ואחרי ההמרה ל-S/4HANA, כולל כיסוי MRP וביצועים.",
    ],
    process: {
      purpose:
        "לקשור את שרשרת הייצור הבדיד לתהליך אחד שניתן למדוד: מהביקוש, דרך התכנון, הקיבולת והביצוע, ועד קליטת " +
        "התוצרת וסגירת העלות, כך שכל שלב מזין את הבא ומשאיר עקבות לבקרה.",
      trigger: [
        { he: "תחזית או הזמנת לקוח שמייצרת ביקוש לחומר מיוצר.", xrefs: ["tx:MD61", "table:MARC"] },
        { he: "מחזור תכנון קבוע: ריצת MRP מתוזמנת ובעקבותיה גל המרה לפקודות.", xrefs: ["tx:MD01N", "fiori:F1339"] },
      ],
      preconditions: [
        { he: "נתוני אב שלמים: חומר, BOM, מסלול, מרכזי עבודה וגרסת ייצור תקפה.", xrefs: ["table:MARC", "table:MAST", "table:PLKO", "table:CRHD", "table:MKAL"] },
        { he: "קיבולת זמינה מתוחזקת במרכזי העבודה, עם נוסחת קיבולת ומפתח בקרת קיבולת, אחרת דרישת הקיבולת אינה מחושבת (תקרית resource-capacity-formula).", xrefs: ["table:KAKO", "table:CRCA", "tx:CR03"] },
        { he: "עלות תקן משוחררת וכלל התחשבנות, כתנאי לחישוב סטיות ולסגירת הפקודה.", xrefs: ["tx:CK24", "table:COBRB"] },
      ],
      masterData: [
        { he: "אב חומר עם נתוני MRP, תזמון, עבודה ובקרת מחיר.", xrefs: ["table:MARC", "tx:MM02"] },
        { he: "עץ מוצר ומסלול ייצור, ומרכזי עבודה עם קיבולת.", xrefs: ["table:MAST", "table:PLKO", "table:PLPO", "table:CRHD", "table:KAKO"] },
        { he: "גרסת ייצור המקשרת ביניהם לתוקף ולטווח כמויות.", xrefs: ["table:MKAL", "cds:I_ProductionVersion"] },
      ],
      roles: [
        { he: "מתכנן חומרים: מריץ את ה-MRP ומעריך את הכיסוי.", xrefs: ["fiori:F1339", "tx:MD04"] },
        { he: "מתכנן ייצור: ממיר הצעות לפקודות ומאזן קיבולת; רשומות המאגר ליישומי לוחות התזמון נוקבות בתפקיד SAP_BR_PRODN_PLNR.", xrefs: ["fiori:F3951", "fiori:F3289"] },
        { he: "מפקח ייצור בייצור בדיד: לפי עמוד האפליקציה הרשמי, השימוש ביישום ניהול הזמנות הייצור מותנה בתפקיד Production Supervisor - Discrete Manufacturing.", xrefs: ["fiori:F2336"] },
      ],
      transactions: [
        { he: "תכנון: MD61, MD62, MD01N, MD04, MD06, MD07.", xrefs: ["tx:MD61", "tx:MD62", "tx:MD01N", "tx:MD04", "tx:MD06", "tx:MD07"] },
        { he: "המרה וביצוע: CO40, CO41, CO01, CO02, CO11N, CO15, COGI.", xrefs: ["tx:CO40", "tx:CO41", "tx:CO01", "tx:CO02", "tx:CO11N", "tx:CO15", "tx:COGI"] },
        { he: "קיבולת: CM01 הערכת עומס, CM21 ו-CM25 פנמייה.", xrefs: ["tx:CM01", "tx:CM21", "tx:CM25"] },
        { he: "מלאי ועלות: MIGO, MB31, KKAX, KKS1, KKS2, KO88, CO88.", xrefs: ["tx:MIGO", "tx:MB31", "tx:KKAX", "tx:KKS1", "tx:KKS2", "tx:KO88", "tx:CO88"] },
        { he: "Fiori: Schedule MRP Runs (F1339), MRP Cockpit (F0247A, F0251), Capacity Scheduling Board (F3951), Manage Work Center Capacity (F3289), Production Scheduling Board (F2176), Manage Production Orders (F2336).", xrefs: ["fiori:F1339", "fiori:F0247A", "fiori:F0251", "fiori:F3951", "fiori:F3289", "fiori:F2176", "fiori:F2336"] },
      ],
      tables: [
        { he: "תכנון: MARC לפרמטרי התכנון, EBAN לדרישות הרכש, RESB לדרישות התלויות.", xrefs: ["table:MARC", "table:EBAN", "table:RESB"] },
        { he: "ביצוע: AUFK, AFKO, AFPO, AFVC ו-AFRU; סטטוסים ב-JEST.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:AFRU", "table:JEST"] },
        { he: "קיבולת: KAKO לקיבולת הזמינה, CRCA להקצאות הקיבולת ו-CRHD למרכז העבודה.", xrefs: ["table:KAKO", "table:CRCA", "table:CRHD", "cds:I_WorkCenterCapacity"] },
        { he: "עלות: COBRB לכלל ההתחשבנות, ובדיווח הפיננסי ב-S/4HANA היומן האוניברסלי ACDOCA.", xrefs: ["table:COBRB", "table:ACDOCA"] },
      ],
      integrationPoints: [
        { he: "תכנון אל ייצור: ההזמנה המתוכננת היא החוליה, וגרסת הייצור היא התנאי להמרה.", xrefs: ["bp:mrp-process", "bp:production-order-process", "table:MKAL"] },
        { he: "ייצור אל מלאי: ניפוק, Backflush וקבלת תוצרת כמסמכי חומר.", xrefs: ["obj:material-document", "bp:matdoc-read-through-compatibility"] },
        { he: "ייצור אל בקרה: זיכוי פעילויות, חישוב WIP וסטיות, והתחשבנות.", xrefs: ["tx:KKS2", "tx:KO88", "table:ACDOCA"] },
        { he: "קיבולת: דרישת הקיבולת נגזרת מפעולות הפקודה ונבדקת מול הקיבולת הזמינה של המשאב.", xrefs: ["table:AFVC", "table:KAKO", "tx:CM01"] },
        { he: "תכנון מפורט: לפי רשומת המעבר של המאגר, PP-DS מוטמע ב-S/4HANA ומספק תזמון מפורט ברמת סדר עבודה וקיבולת, ללא מערכת תכנון נפרדת.", xrefs: ["fiori:F2176"] },
      ],
      interfaces: [
        { he: "ביקוש: לפי רשומות tx-intel של MD61 ו-MD62 (ECC ו-S/4HANA) ורשומת התחום pppi-pir, הדרישות העצמאיות המתוכננות נוצרות ומתעדכנות דרך BAPI_REQUIREMENTS_CREATE, BAPI_REQUIREMENTS_CHANGE ו-BAPI_REQUIREMENTS_GETDETAIL (אינם במילון הפרויקט, לכן בלי xref). ב-S/4HANA 2025 FPS01 מתועד שירות ה-OData Planned Independent Requirements (API_PLND_INDEP_RQMT_SRV) לקריאה, יצירה ועדכון של PIR ממערכת חיצונית.", xrefs: ["tx:MD61", "tx:MD62"] },
        { he: "הזמנות מתוכננות: BAPI_PLANNEDORDER_CREATE ליצירה, עם BAPI_TRANSACTION_COMMIT אחריו, ו-BAPI_PLANNEDORDER_GET_DETAIL לקריאה, לפי הרישום המועשר של המאגר ורשומת התחום pppi-mrp; רשומות האימות של שני ה-BAPI נשארות verification_required. ב-S/4HANA 2025 FPS01 מתועד שירות ה-OData Planned Order (API_PLANNED_ORDERS) לקריאה, יצירה, שינוי ומחיקה של הזמנות מתוכננות; הרשומה הרשמית אינה מציגה אותו כיורש של ה-BAPI.", xrefs: ["fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"] },
        { he: "רשימת מלאי ודרישות וזמינות: BAPI_MATERIAL_STOCK_REQ_LIST לפי רשומת tx-intel של MD04, ו-BAPI_MATERIAL_AVAILABILITY לפי רשומת tx-intel של CO09 ורשומת התחום pppi-mrp (שניהם אינם במילון הפרויקט).", xrefs: ["tx:MD04", "tx:CO09"] },
        { he: "המרה, שחרור וסגירה טכנית בממשק ה-GUI הקלאסי, לפי רשומות tx-intel (ECC ו-S/4HANA): BAPI_PRODORD_CREATE_FROM_PLORD (CO40, CO41), BAPI_PRODORD_CREATE (CO01), BAPI_PRODORD_CHANGE, BAPI_PRODORD_RELEASE ו-BAPI_PRODORD_COMPLETE_TECH (CO02, COHV) ו-BAPI_PRODORD_GET_LIST (COOIS); אינם במילון הפרויקט. ב-S/4HANA 2025 FPS01 שירות ה-OData Production Order (Version 2) (API_PRODUCTION_ORDER_2_SRV) יוצר פקודה מאפס או ממיר הזמנה מתוכננת, משחרר פקודה או פעולה, מסמן סגירה טכנית וסגירה ומתזמן פעולה.", xrefs: ["tx:CO40", "tx:CO41", "tx:CO01", "tx:CO02", "tx:COHV", "tx:COOIS"] },
        { he: "הפצה ל-MES: סוג ההודעה LOIPRO; לפי עמוד Production Order Integration של 2025 FPS01 נתוני הפקודה ושינוייה מועברים ל-MES ב-IDoc LOIPRO05 לפי מסנני ה-DRF, והפצה דרך POIT אינה אפשרית עוד.", xrefs: ["idoc:msg:LOIPRO", "tx:CO01", "tx:CO02"] },
        { he: "דיווח: לפי רשומות tx-intel, BAPI_PRODORDCONF_CREATE_TT, BAPI_PRODORDCONF_GET_TT_PROP ו-BAPI_PRODORDCONF_CANCEL (CO11N) ו-BAPI_PRODORDCONF_CREATE_HDR (CO15); עמוד What's New 2020 'BAPIs and APIs used in Synchronous Goods Movements' מונה את BAPI_PRODORDCONF_CREATE_HDR, BAPI_PRODORDCONF_CREATE_TT ו-BAPI_PRODORDCONF_CANCEL תחת Production Planning BAPIs. ב-S/4HANA 2025 FPS01 שירות ה-OData Production Order Confirmation (API_PROD_ORDER_CONFIRMATION_2_SRV) קורא, יוצר ומבטל אישורים עם תנועות סחורה או בלעדיהן.", xrefs: ["tx:CO11N", "tx:CO15", "table:AFRU"] },
        { he: "ניפוק וקבלת תוצרת: BAPI_GOODSMVT_CREATE (MIGO, MB31), ולקריאה BAPI_GOODSMVT_GETDETAIL ו-BAPI_GOODSMVT_GETITEMS, לפי רשומת התחום pppi-gi-gr; רשומת האימות של BAPI_GOODSMVT_CREATE מסמנת released_api_available. לצדו מתועד ב-2025 FPS01 שירות ה-OData Material Documents - Read, Create (API_MATERIAL_DOCUMENT).", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETDETAIL", "fm:BAPI_GOODSMVT_GETITEMS", "tx:MIGO", "tx:MB31", "obj:material-document"] },
        { he: "התחשבנות: K_ORDER_SETTLEMENT, K_SETTLEMENT_RULE_READ ו-K_COSTS_READ לפי רשומת התחום pppi-settlement ופירוט התחום שלה; רשומות האימות של שלושתם נשארות verification_required, ובחיפושי SAP Help שנרשמו ברשומת K_ORDER_SETTLEMENT אף רשומה לא נקבה בשם.", xrefs: ["fm:K_ORDER_SETTLEMENT", "fm:K_SETTLEMENT_RULE_READ", "fm:K_COSTS_READ", "tx:KO88", "tx:CO88"] },
        { he: "קריאת קיבולת: CY_CAPACITY_LOAD ו-CY_CAPACITY_HEADER_READ לפי פירוט התחום pppi-capacity-planning, ו-CR_CAPACITY_READ לפי רשומת התחום (אינו במילון הפרויקט); התחום מתויג PP-PI ומשמש כאן כמנגנון משותף, ורשומות האימות של שתי הפונקציות הראשונות נשארות verification_required.", xrefs: ["fm:CY_CAPACITY_LOAD", "fm:CY_CAPACITY_HEADER_READ", "table:KAKO", "tx:CM01"] },
      ],
      outputs: [
        { he: "תכנית היצע: הזמנות מתוכננות ודרישות רכש.", xrefs: ["table:EBAN"] },
        { he: "פקודות ייצור משוחררות עם פעולות, רכיבים ודרישות קיבולת.", xrefs: ["table:AUFK", "table:AFKO", "table:AFVC"] },
        { he: "תוצרת שנקלטה אל המלאי ורשומות אישור.", xrefs: ["table:AFRU", "obj:material-document"] },
        { he: "סטיות ייצור ומסמכי התחשבנות.", xrefs: ["tx:KKS2", "table:COBRB"] },
      ],
      exceptions: [
        { he: "אין הזמנות מתוכננות או שהן אינן מומרות: קובץ תכנון, סוג MRP או גרסת ייצור (תקריות mrp-no-planned-orders ו-planned-order-not-convert).", xrefs: ["tx:MD20", "table:MKAL"] },
        { he: "עומס יתר על משאב: CM01 מציג עומס מעל הקיבולת והפקודות מאחרות; האיזון ב-CM21 או בתוספת משמרת (תקרית capacity-overload).", xrefs: ["tx:CM01", "tx:CM21", "table:KAKO"] },
        { he: "השחרור נחסם בחוסר זמינות רכיב, כולל בבדיקת הזמינות המתקדמת (תקרית aatp-shortage-release ברשומת הייצור התהליכי).", xrefs: ["tx:CO09", "tx:CO24"] },
        { he: "תנועות Backflush תקועות ב-COGI ומעוותות מלאי ועלות עד לעיבוד חוזר (תקרית cogi-stuck).", xrefs: ["tx:COGI"] },
        { he: "סטיות אינן מחושבות או חורגות בלי הסבר: עלות תקן, גרסת עלות יעד או פסולת מתוכננת שאינה משקפת את המציאות (תקריות variance-missing ו-scrap-variance-high).", xrefs: ["tx:KKS2", "tx:CK24"] },
      ],
      controls: [
        { he: "שער בין תכנון לביצוע: המרה לפקודה רק אחרי בדיקת החריגות ברשימת המלאי והדרישות.", xrefs: ["tx:MD04", "tx:MD06"] },
        { he: "שער קיבולת: בדיקת עומס ופנמייה לפני השחרור, ולא אחריו.", xrefs: ["tx:CM01", "tx:CM21"] },
        { he: "שער איכות נתונים: גרסת ייצור תקפה, BOM ומסלול תקפים, ועלות תקן משוחררת.", xrefs: ["table:MKAL", "tx:CK24"] },
        { he: "שער סגירה: COGI נקי, דיווחים מלאים, ואז סגירה טכנית, חישוב WIP וסטיות והתחשבנות.", xrefs: ["tx:COGI", "tx:KKAX", "tx:KO88"] },
      ],
      kpis: [
        { he: "לפי רשומת אנליטיקת הייצור של המאגר (תחום PP-PI, משותפת לייצור בדיד ותהליכי): תפוקה, אחוז פסולת, זמן מחזור וניצולת קיבולת.", xrefs: ["table:AFRU", "tx:COOIS"] },
        { he: "סטיות ייצור מול עלות תקן לפי קטגוריות.", xrefs: ["tx:KKS2"] },
        { he: "עומס מול קיבולת זמינה במרכזי העבודה, ובאפליקציה ייעודית עמודת ניצולת עם הדגשת מצבים קריטיים לפי רשומת המאגר.", xrefs: ["tx:CM01", "fiori:F3289"] },
      ],
      eccToS4: [
        { he: "תכנון: לפי רשומת המעבר של המאגר, MRP Live ב-MD01N רץ על HANA; לפי פריט הפישוט S4TWL - MRP in HANA (PP-MRP), MRP Live מוגדר ב-S/4HANA כטכנולוגיית ההמשך, והריצה הקלאסית של ECC (MD01) נשארת זמינה.", xrefs: ["tx:MD01N", "tx:MD01", "bp:mrp-process"] },
        { he: "זמינות: לפי רשומת המעבר של המאגר, ATP הקלאסי מוחלף בבדיקת זמינות מתקדמת על HANA עם עיבוד הזמנות פתוחות, הקצאת מוצר ושחרור לאספקה, והשינוי משפיע על שחרור הפקודות.", xrefs: ["tx:CO09", "tx:CO02"] },
        { he: "קיבולת: לפי רשומת המעבר של המאגר, חלק מכלי הקיבולת הקלאסיים אינם אסטרטגיים והתכנון המתקדם עובר ללוח התזמון של PP-DS; תיעוד 2025 FPS01 מתעד את לוח תזמון הקיבולת כיישום Fiori הדורש liveCache וקיבולת סופית במרכז העבודה.", xrefs: ["tx:CM21", "tx:CM25", "fiori:F3951"] },
        { he: "תכנון מפורט: PP-DS היה רכיב נפרד ב-APO עם ממשק ליבה, וב-S/4HANA הוא מוטמע ללא מערכת נפרדת, לפי רשומת המעבר של המאגר; לוח תזמון הייצור מתועד במדריך PP/DS של 2025 FPS01.", xrefs: ["fiori:F2176"] },
        { he: "ביצוע: פקודת הייצור עצמה נשארת במבנה זהה ברובו, ונוספות שכבת Fiori ותצוגות CDS.", xrefs: ["bp:production-order-process", "cds:I_ProductionOrder"] },
        { he: "מלאי: תנועות הייצור עוברות לטבלת מסמכי החומר החדשה, וקוד שקורא את הטבלאות הישנות נשען על תצוגות תאימות לפי רשומת ההשפעה של המאגר.", xrefs: ["bp:matdoc-read-through-compatibility", "obj:material-document"] },
        { he: "עלות: לפי רשומת ההשפעה של המאגר, הדיווח הפיננסי עובר ליומן האוניברסלי ACDOCA, וטבלאות הסיכום והאינדקס הישנות בוטלו.", xrefs: ["table:ACDOCA"] },
        { he: "טבלאות הליבה של הייצור נמנות בסט היציב של שכבת ההשפעה במאגר: AFKO, AFPO, AFVC, AFRU, AUFK, MARC, PLKO, PLPO ו-MAST.", xrefs: ["table:AFKO", "table:AFPO", "table:AFVC", "table:AFRU", "table:AUFK", "table:MARC"] },
      ],
      migration: [
        { he: "בדיקת QA של המאגר למחזור המלא: MRP, פקודה, אישור, קבלת תוצרת והתחשבנות, לפני ואחרי ההמרה.", xrefs: ["tx:MD01N", "tx:CO41", "tx:CO11N", "tx:KO88"] },
        { he: "תכנון: השוואת כיסוי החומרים והביצועים בין הריצה הקלאסית ל-MRP Live, ובדיקת תרחישים שאינם נתמכים.", xrefs: ["tx:MD01", "tx:MD01N", "bp:mrp-process"] },
        { he: "קיבולת: בדיקת עומס ופנמייה אחרי ההמרה, ושקילת מעבר לתכנון המפורט של PP-DS לתרחישים מורכבים, לפי רשומות המאגר.", xrefs: ["tx:CM01", "tx:CM21", "fiori:F3951"] },
        { he: "בקרה: התחשבנות הפקודות ליומן האוניברסלי ובדיקת דוחות עלות שנשענו על טבלאות סיכום ישנות.", xrefs: ["tx:KO88", "table:ACDOCA"] },
        { he: "מלאי: דוחות ותוכניות שקוראים את טבלאות מסמכי החומר הישנות עוברים דרך תצוגות תאימות.", xrefs: ["bp:matdoc-read-through-compatibility"] },
      ],
      reference: {
        title: "Make-to-Stock Production - Discrete Manufacturing (BJ5) | What's New in SAP S/4HANA 1909",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/df4ef977909a47e293b3762935ec44d8.html?locale=en-US&state=PRODUCTION&version=1909.000",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד What's New רשמי של S/4HANA 1909 (עמוד שינויים, לא תיאור תהליך) שכותרתו פריט ה-Scope Item BJ5 " +
          "(Make-to-Stock Production - Discrete Manufacturing), רכיב PP, 'Available As Of SAP S/4HANA 1909'. הגוף " +
          "מתאר את מה שנוסף לפריט (אפליקציית Maintain PIRs והעלאת PIR בקובץ csv) ומפנה לגיליון העובדות ב-SAP Best " +
          "Practices Explorer, שלא נקרא. לפי תוצאות החיפוש (שלא צורפו כשורות ראיה), BJ5 מופיע ברשומות What's New עד " +
          "2023; בחיפוש לא נמצא עמוד שכותרתו BJ5 בגרסאות 2025, וב-2025 FPS01 מופיע 7UV (PP/DS). התוקף של BJ5 ב-2025 " +
          "לא נקבע. הפריט 7UV (Make-to-Stock Production – Discrete Manufacturing) מתועד ב-2025 FPS01 על בסיס PP/DS, " +
          "רכיב SCM-APO-PPS, מ-PIR ועד מסירת תכנית הייצור לרצפה. אף אחד מהעמודים אינו מתאר את השרשרת עד ההתחשבנות.",
      },
    },
    xrefs: [
      "tx:MD61", "tx:MD62", "tx:MD01N", "tx:MD01", "tx:MD04", "tx:MD06", "tx:MD07", "tx:MD20", "tx:MM02",
      "tx:CK24", "tx:CO40", "tx:CO41", "tx:CO01", "tx:CO02", "tx:CO11N", "tx:CO15", "tx:COGI", "tx:CM01",
      "tx:CM21", "tx:CM25", "tx:MIGO", "tx:MB31", "tx:KKS2", "tx:KO88", "tx:CO88", "tx:COOIS", "tx:COHV",
      "tx:CO09", "table:MARC", "table:EBAN", "table:MKAL", "table:AUFK", "table:AFKO", "table:AFPO",
      "table:AFVC", "table:AFRU", "table:KAKO", "table:CRCA", "table:CRHD", "table:COBRB", "table:ACDOCA",
      "fiori:F1339", "fiori:F0247A", "fiori:F0251", "fiori:F3951", "fiori:F3289", "fiori:F2176",
      "fiori:F2336", "cds:I_ProductionOrder", "cds:I_WorkCenterCapacity", "cds:I_ProductionVersion",
      "obj:material-document", "fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL",
      "fm:BAPI_TRANSACTION_COMMIT", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETDETAIL",
      "fm:BAPI_GOODSMVT_GETITEMS", "fm:K_ORDER_SETTLEMENT", "fm:K_SETTLEMENT_RULE_READ", "fm:K_COSTS_READ",
      "fm:CY_CAPACITY_LOAD", "fm:CY_CAPACITY_HEADER_READ", "idoc:msg:LOIPRO", "bp:mrp-process",
      "bp:production-order-process", "bp:matdoc-read-through-compatibility", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'תכנון לייצור' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שישה שלבים עם טרנזקציות, טבלאות, יישומי Fiori, ממשקים, תקריות ובדיקה לכל שלב: ניהול ביקוש (MD61/MD62), " +
          "MRP (MD01N/MD04), פקודת ייצור או תהליך (CO01/COR1), ביצוע ואישור (CO11N/COR6N/COGI), קבלת תוצר " +
          "(MIGO/MB31) והתחשבנות עם סטיות (KKS2/CO88, טבלאות COBRB ו-ACDOCA).",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#plan-to-produce",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'ייצור בדיד, MRP עד פקודה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אותה שרשרת ברמת השלב והטעות: MD01N (הזמנות מתוכננות לפי BOM ומסלול), CO01 (המרה), CO02 (שחרור ובדיקת " +
          "זמינות), CO11N (אישור ו-Backflush) ו-KO88 (התחשבנות); נתיב תחקור MD04, COGI, PPCO0001, CONFPP01; " +
          "בלוק המעבר: מחזור הייצור הבדיד זהה, ומה שמשתנה הוא MRP Live, חוויית Fiori ועלויות ליומן האוניברסלי.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pp-mrp-to-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום של הפרויקט (DOMAINS): pppi-capacity-planning ו-pppi-production-analytics (תחומי PP-PI, משותפים לייצור בדיד)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תכנון קיבולת: קיבולת זמינה (KAKO) מול דרישת קיבולת מפקודות, הערכה ב-CM01, פנמייה ב-CM21, שיבוץ פעולות, " +
          "טבלאות KAKO, CRCA ו-CRHD, ותקלות של עומס יתר ושל דרישת קיבולת שאינה מחושבת. אנליטיקת ייצור: מערכת מידע " +
          "ההזמנות (COOIS), עיבוד המוני (COHV), טבלאות AFKO, AFPO ו-AFRU, והמדדים המרכזיים תפוקה, אחוז פסולת, זמן " +
          "מחזור ו-OEE; שתי הרשומות מתויגות במאגר כתחומי PP-PI ומתארות מנגנונים משותפים לייצור בדיד ותהליכי.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-capacity-planning (+pppi-production-analytics)",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושאי המעבר של הפרויקט (ECC_S4_TOPICS): mrp-live, atp, capacity-planning-s4, pp-ds, production-order-s4",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MRP Live על HANA מול MRP קלאסי; ATP קלאסי מוחלף בבדיקת זמינות מתקדמת עם עיבוד הזמנות פתוחות, הקצאת מוצר " +
          "ושחרור לאספקה, המשפיעה על שחרור פקודות ואספקה; חלק מכלי הקיבולת הקלאסיים אינם אסטרטגיים והתכנון המתקדם " +
          "עובר ללוח התזמון של PP-DS; PP-DS היה רכיב נפרד ב-APO עם ממשק ליבה וב-S/4HANA הוא מוטמע; פקודות הייצור " +
          "והתהליך נשארות במבנה זהה ברובו עם Fiori ו-OData נוספים.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#mrp-live (+atp, capacity-planning-s4, pp-ds, production-order-s4)",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.2 S4TWL - MRP in HANA (PP-MRP), pp. 651-655",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TX,
        claim:
          "פריט 9.5.2 (רכיב יישום PP-MRP) נוקב ב-MD01 תחת 'Other Terms' וקובע בעמ' 653: 'Classic MRP (transactions " +
          "MD01, MD02, MD03, MD40, MD41, MD42, MD43, MD50, MD51 and jobs RMMRP000, RMMPS000) are still available in " +
          "SAP S/4HANA but MRP live (transaction MD01N) is considered the future technology. Classic MRP " +
          "transactions are not part of the compatibility pack. An end-of-life date for the classic MRP has not yet " +
          "been defined.' בעמ' 655: קובץ התכנון החדש משמש גם את ה-MRP הקלאסי, וקריאת הנתונים של MD01, MD02 ו-MD03 " +
          "עברה אופטימיזציה ל-HANA באמצעות AMDP ואינה ניתנת לכיבוי ב-S/4HANA (אומת ברשומת tx:MD01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT): S4_STABLE, MATDOC, ACDOCA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "AFKO, AFPO, AFVC, AFRU, AUFK, MARC, PLKO, PLPO ו-MAST נמנות בסט S4_STABLE: טבלאות ליבה המסומנות במפורש " +
          "יציבות ב-S/4HANA. טבלת מסמכי החומר החדשה מאחדת את טבלאות התנועה הישנות והמלאי מחושב בזמן אמת, כך שקוד " +
          "הקורא את הישנות נשען על תצוגות תאימות. היומן האוניברסלי ACDOCA מאחד FI ו-CO, וטבלאות הסיכום והאינדקס " +
          "בוטלו; כל אנליטיקה פיננסית עוברת אליו.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE (+MATDOC, ACDOCA)",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט (FIORI_APPS): F3951, F2176, F3289, F1339, F0247A",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "Capacity Scheduling Board (F3951): תזמון קיבולת גרפי עם שיבוץ ותזמון מחדש של פעולות, guiTx CM21 ו-CM25, " +
          "טבלאות AFKO, AFVC ו-CRHD, תפקיד SAP_BR_PRODN_PLNR, ודרישת liveCache וקיבולת סופית במרכז העבודה. " +
          "Production Scheduling Board (F2176): תזמון מפורט של PP/DS מעל liveCache, guiTx CM21 ו-CO03. Manage Work " +
          "Center Capacity (F3289): רשימת עבודה לניהול עומס מרכזי העבודה עם עמודת ניצולת והדגשת מצבים קריטיים, " +
          "guiTx CM01 ו-CM07, טבלאות CRHD ו-KAKO, ותומכת במרכזי עבודה של PP בלבד. Schedule MRP Runs (F1339): יצירה " +
          "ותזמון של Job להרצת MRP מ-Fiori ומעקב אחר סטטוס הביצוע, מעל מסגרת ה-Application Jobs, עם MRP Live " +
          "(MD01N) כבקאנד ותפקידים SAP_BR_MATL_PLNR_EXT_PROC ו-SAP_BR_PRODN_PLNR. Monitor Material Coverage - Net " +
          "Segments (F0247A): ניטור מצב המחסור של חומרים לאורך מקטעי הדרישות נטו, נקודת הכניסה של MRP Cockpit " +
          "לזיהוי חוסרים לפני מעבר ל-Manage Material Coverage (F0251), guiTx כולל MD04, MD06 ו-MD07.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F3951 (+F2176, F3289, F1339, F0247A)",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט (cds-map): I_ProductionVersion",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "תצוגת CDS לגרסת ייצור, טבלה MKAL, יישום Manage Production Versions (מתויגת PP-PI במאגר).",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_ProductionVersion",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: capacity-overload, aatp-shortage-release, scrap-variance-high, resource-capacity-formula",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "עומס יתר על משאב מוצג ב-CM01 והפקודות מאחרות; האיזון ב-CM21 או בהוספת משמרת בקיבולת הזמינה. שחרור פקודה " +
          "נחסם בבדיקת הזמינות המתקדמת בחוסר רכיב, כלל בדיקה שגוי או הקצאת מוצר חוסמת. סטיית פסולת חריגה נובעת " +
          "מפסולת מתוכננת שאינה מוגדרת או מדיווח מופרז. דרישת קיבולת אינה מחושבת כשחסרה נוסחת קיבולת במשאב או " +
          "שמפתח בקרת הקיבולת אינו מתאים.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#capacity-overload (+mrp-no-planned-orders, cogi-stuck, variance-missing; data/troubleshooting-ext2.ts#aatp-shortage-release, resource-capacity-formula, scrap-variance-high, planned-order-not-convert)",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Capacity Scheduling Board | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/063ae12de0c74b01b6fd49c78e895564.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "תיעוד Production Planning and Control לגרסת 2025 FPS01 מתעד את היישום Capacity Scheduling Board: 'This app " +
          "was previously known as Monitor Work Center Schedules'; 'You can use this app to plan optimum utilization of " +
          "pacemaker work centers by matching their capacities with those of the orders that have to be dispatched'; " +
          "'Pacemaker work centers are critical as they help determine the schedule of an order' (אומת ברשומת fiori:F3951).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Capacity Planning | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/96592cfe7187429c9a69fda4e6976c50.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "עמוד Capacity Planning לגרסת 2025 FPS01 מונה דרישת קדם: 'Install SAP liveCache (which is the HANA component " +
          "SAP LCA (also called LCAPPS- or liveCache Applications plugin) for Capacity Scheduling Table and Capacity " +
          "Scheduling Board apps', וכן 'Set the work center capacity to finite scheduling to get the capacity " +
          "requirements of the orders' (אומת ברשומת fiori:F3951).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Scheduling Board | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/e5a89957c59f6c10e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "מדריך PP/DS לגרסת 2025 FPS01 מתעד את היישום: 'With this app, you can optimize and plan the resource schedule " +
          "and the order dates and times in detail by taking resource and component availability into account'. תחת Key " +
          "Features נמנים בתקציר: 'Select a period of time for scheduling production', 'Select resources that you want to " +
          "use for production scheduling', 'Define conditions for the resources' (אומת ברשומת fiori:F2176).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Production Orders | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/0a4622d10e7e49478943891624ea7ca8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_APP,
        claim:
          "עמוד האפליקציה בתיעוד Production Orders (PP-SFC) לגרסת 2025 FPS01 קובע: 'With this app, you can monitor the " +
          "progress of production' ו-'You can use this app if the role Production Supervisor - Discrete Manufacturing is " +
          "assigned to your user' (אומת ברשומת fiori:F2336).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (SAP PRESS, Production Planning with SAP S/4HANA), פרק 1 'Introduction to Production Planning in SAP S/4HANA'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "פרק הסקירה מציג את תכנון הייצור והבקרה (1.1), מאפייני סוגי הייצור (1.1.2), התהליכים בתכנון הייצור ובבקרתו " +
          "(1.1.3), בקרת עלות המוצר (1.1.4), טבלת השוואה בין סוגי הייצור (1.2) והשוואת יכולות תכנון הייצור בין SAP " +
          "ERP לבין SAP S/4HANA (1.3); הספר משמש כאן להפניית קריאה ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#1.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 4 בספריית הפרויקט (SAP PRESS, PP/DS with SAP S/4HANA), פרקים 5, 6 ו-11",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הספר מתעד את תכנון ה-PP/DS (פרק 5: מתי להשתמש ב-PP/DS לתכנון, פונקציות בסיס, היוריסטיקות תכנון), את " +
          "התזמון המפורט (פרק 6: מתי להשתמש ב-PP/DS לתזמון, אסטרטגיית תזמון מפורט, היוריסטיקות תזמון) ואת ההגירה " +
          "ל-PP/DS מוטמע (פרק 11: יישום חדש, המרת מערכת, טרנספורמציית נוף); ההפניה כאן היא קישור קריאה לתכנון " +
          "המפורט ואינה מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book4.json#5.1",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות הטרנזקציות של הפרויקט (TX_INTEL): MD61, MD62, MD04, CO09, CO40, CO41, CO01, CO02, COHV, COOIS, CO11N, CO15, MIGO, MB31, MD01N, MM02, CK24, CR01",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "שדה ה-bapis ברשומות: MD61 נוקבת ב-BAPI_REQUIREMENTS_CREATE, BAPI_REQUIREMENTS_CHANGE " +
          "ו-BAPI_REQUIREMENTS_GETDETAIL; MD62 ב-BAPI_REQUIREMENTS_CHANGE ו-BAPI_REQUIREMENTS_GETDETAIL; MD04 " +
          "ב-BAPI_MATERIAL_STOCK_REQ_LIST; CO09 ב-BAPI_MATERIAL_AVAILABILITY; CO40 ו-CO41 " +
          "ב-BAPI_PRODORD_CREATE_FROM_PLORD; CO01 ב-BAPI_PRODORD_CREATE וב-BAPI_PRODORD_CREATE_FROM_PLORD; CO02 " +
          "ב-BAPI_PRODORD_CHANGE, BAPI_PRODORD_RELEASE ו-BAPI_PRODORD_COMPLETE_TECH; COHV ב-BAPI_PRODORD_RELEASE " +
          "וב-BAPI_PRODORD_COMPLETE_TECH; COOIS ב-BAPI_PRODORD_GET_LIST; CO11N ב-BAPI_PRODORDCONF_CREATE_TT, " +
          "BAPI_PRODORDCONF_GET_TT_PROP ו-BAPI_PRODORDCONF_CANCEL; CO15 ב-BAPI_PRODORDCONF_CREATE_HDR " +
          "וב-BAPI_PRODORDCONF_CANCEL; MIGO ב-BAPI_GOODSMVT_CREATE וב-BAPI_GOODSMVT_CANCEL; MB31 " +
          "ב-BAPI_GOODSMVT_CREATE. לרשומות MD01N, KO88, CO88 ו-CM01 אין שדה bapis. רשומת MD01N (MRP Live) נוקבת " +
          "ב-MD20 ברשימת הטרנזקציות שלפניה, ב-MD04 וב-MD07 ברשימת הטרנזקציות שאחריה, ובשדה s4Delta ברשימות MRP " +
          "(MD05/MD06) וביישומי MRP Cockpit ב-Fiori (F0247A/F0251). רשומת MM02 מתעדת שינוי נתון אב חומר, כולל " +
          "פרמטרי MRP ובקרת מחיר. רשומת CK24 מתעדת סימון ושחרור של עלות תקן, שמעדכן את מחיר התקן בנתוני החומר. " +
          "רשומת CR01 נוקבת בשדה s4Delta בתצוגות ה-CDS I_WorkCenter, I_WorkCenterCapacity ו-I_WorkCenterCostCenter.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD61 (+MD62, MD04, CO09, CO40, CO41, CO01, CO02, COHV, COOIS, CO11N, CO15, MIGO, MB31, MD01N, MM02, CK24, CR01)",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום ופירוט התחום של הפרויקט (DOMAINS, DOMAIN_DETAIL): pppi-pir, pppi-mrp, pppi-gi-gr, pppi-settlement, pppi-capacity-planning",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "שדה ה-bapis ברשומות התחום: pppi-pir נוקב ב-BAPI_REQUIREMENTS_CREATE וב-BAPI_REQUIREMENTS_GETDETAIL; " +
          "pppi-mrp ב-BAPI_MATERIAL_AVAILABILITY וב-BAPI_PLANNEDORDER_CREATE; pppi-gi-gr ב-BAPI_GOODSMVT_CREATE, " +
          "BAPI_GOODSMVT_GETDETAIL ו-BAPI_GOODSMVT_GETITEMS; pppi-settlement ב-K_ORDER_SETTLEMENT, " +
          "K_SETTLEMENT_RULE_READ ו-K_COSTS_READ; pppi-capacity-planning ב-CR_CAPACITY_READ. שדה ה-funcs בפירוט " +
          "התחום pppi-capacity-planning נוקב ב-CY_CAPACITY_LOAD וב-CY_CAPACITY_HEADER_READ, ובפירוט pppi-settlement " +
          "ב-K_ORDER_SETTLEMENT, K_SETTLEMENT_RULE_READ ו-K_COSTS_READ. כל הרשומות מתויגות במאגר כתחומי PP-PI.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-mrp (+pppi-pir, pppi-gi-gr, pppi-settlement, pppi-capacity-planning; data/domain-detail.ts#pppi-capacity-planning, pppi-settlement)",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט: bapi-enrichment.pppi.ts#BAPI_PLANNEDORDER_CREATE (+BAPI_PLANNEDORDER_GET_DETAIL)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "BAPI_PLANNEDORDER_CREATE: יצירת הזמנה מתוכננת, פעולה Create, פרמטרים 'IMP HEADERDATA · EXP PLANNEDORDER " +
          "· TAB RETURN', טרנזקציה MD11, טבלה PLAF, וקשור ל-BAPI_PLANNEDORDER_GET_DETAIL " +
          "ול-BAPI_TRANSACTION_COMMIT; מקור הרישום 'tcodesearch.com (SE37)'. BAPI_PLANNEDORDER_GET_DETAIL: שליפת " +
          "פרטי הזמנה מתוכננת, קריאה בלבד, פרמטרים 'IMP PLANNEDORDER · EXP HEADER · TAB COMPONENTS, RETURN', " +
          "טרנזקציה MD13, טבלה PLAF.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PLANNEDORDER_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות האימות של הפרויקט (data/verification/functions.ts): מצב האימות של הפונקציות בממשקי התהליך",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "הסטטוס ברשומות: BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_GETDETAIL מסומנים released_api_available; " +
          "BAPI_PLANNEDORDER_CREATE, BAPI_PLANNEDORDER_GET_DETAIL, K_ORDER_SETTLEMENT, K_SETTLEMENT_RULE_READ, " +
          "K_COSTS_READ, CY_CAPACITY_LOAD ו-CY_CAPACITY_HEADER_READ מסומנים verification_required. לרשומת " +
          "BAPI_TRANSACTION_COMMIT אין סטטוס מחובר; היא נשענת על רשומת המאגר בלבד. ברשומת K_ORDER_SETTLEMENT נרשם " +
          "ממצא שלילי: בתשע הרצות של שירות החיפוש של SAP Help אף כותרת או תקציר אינם נוקבים בשם.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/functions.ts#fm:K_ORDER_SETTLEMENT (+fm:BAPI_GOODSMVT_CREATE, fm:BAPI_PLANNEDORDER_CREATE, fm:CY_CAPACITY_LOAD, fm:BAPI_TRANSACTION_COMMIT)",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Integration | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_IDOC2,
        claim:
          "עמוד Production Order Integration (PP-MES, S/4HANA 2025 FPS01) קובע: 'The system transfers the order " +
          "data to the MES using IDoc LOIPRO05 according to the filter criteria you set in the DRF. The MES " +
          "generates an order', וכן ששינויים בפקודה מועברים ל-MES באותו IDoc: 'The system transfers these changes " +
          "to the MES using IDoc LOIPRO05 to ensure that the production data remains consistent. The MES confirms " +
          "the order'. הסניפט מוסיף: 'Distribution by means of transaction POIT (Select Transaction Data for " +
          "Transfer) is no longer possible'. (אומת ברשומת idoc:msg:LOIPRO)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planned Order (OData V2)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/43ae2e5876b4a107e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM24,
        claim:
          "עמוד 'Planned Order (OData V2)' בתיעוד S/4HANA 2025 FPS01 קובע: 'Technical name: API_PLANNED_ORDERS This " +
          "service enables you to read, create, change, and delete planned orders as well as components belonging " +
          "to planned orders.' הסניפט אינו נוקב ב-BAPI. (אומת ברשומת fm:BAPI_PLANNEDORDER_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Documents - Read, Create | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/d4c919581bc30a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM14,
        claim:
          "שירות ה-OData‏ Material Documents - Read, Create מתועד למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
          "Inventory: 'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following operations for " +
          "material documents: Retrieve material documents, Create material documents, Cancel material documents at " +
          "header level, Cancel material documents at [item level]'. רשומת 'Operations for Material Document API' " +
          "באותו מדריך (loio 1aef4e402acd4c8b8ec2ea2bfda7715b, 2025.001) מציגה את נתיב היצירה POST " +
          "‎<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader ואת פעולות הביטול ברמת " +
          "כותרת ופריט. רשומות What's New מתעדות הרחבות שוטפות של השירות: 2023 ‏(loio " +
          "71c0f9113d2a47cca1de911185cb89af, 'enhanced with additional properties', רכיב MM-IM-GF) ו-2025 FPS01 " +
          "‏(loio bfe185a3e1ea4fe0a39b12d0683853ff, 'enhanced with Warehouse Handling Unit field'). אף אחת מהרשומות " +
          "אינה מציגה את ה-API כמחליף של BAPI_GOODSMVT_CREATE; הן מתעדות אותו כשירות OData לרישום מסמכי חומר לצד " +
          "ה-BAPI. (אומת ברשומת fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order (Version 2) | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/0a4262096d2e43258df27c594bdd1468.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 0a4262096d2e43258df27c594bdd1468, נקרא דרך שירות התוכן) קובע: 'Technical name: " +
          "API_PRODUCTION_ORDER_2_SRV', והשירות מאפשר 'Create a production order from scratch or convert a planned " +
          "order into a production order', לצד 'Release a production order', 'Technically complete a production " +
          "order', 'Close a production order' ו-'Schedule an operation of a production order'. העמוד מציין שזו " +
          "הגרסה החדשה של ה-OData API Production Order ושהשירות מבוסס OData Version 2.0. העמוד אינו נוקב ב-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Confirmation | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/e77b762e243b4045ad1f1f048f6aab87.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio e77b762e243b4045ad1f1f048f6aab87, נקרא דרך שירות התוכן) קובע: 'Technical name: " +
          "API_PROD_ORDER_CONFIRMATION_2_SRV This service enables you to process confirmations for production " +
          "orders, namely time ticket and time event confirmations for operations of production orders and " +
          "confirmations on order level', ומונה בין היתר 'Create confirmations with or without goods movements' " +
          "ו-'Cancel confirmations with or without goods movements'; אובייקטי ההרשאה הנקובים הם C_AFRU_AWK לאישורים " +
          "ו-C_AFKO_AWK לפריטי מסמך חומר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planned Independent Requirements | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/c81d1718b16147b5811acce3f1888054.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio c81d1718b16147b5811acce3f1888054, נקרא דרך שירות התוכן) קובע: 'Technical name: " +
          "API_PLND_INDEP_RQMT_SRV This service enables you to read and update planned independent requirements " +
          "(PIRs)', ו-'this service gives you the possibility to maintain PIRs in an external system'; הישויות " +
          "PlannedIndepRqmt ו-PlannedIndepRqmtItem מאפשרות קריאה, יצירה ועדכון. בין המגבלות: 'you cannot assign a " +
          "production version to a certain PIR item'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAPIs and APIs used in Synchronous Goods Movements | What's New in SAP S/4HANA 2020",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/73cf65e8275d4b279973c9a368890896.html?locale=en-US&state=PRODUCTION&version=2020.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 73cf65e8275d4b279973c9a368890896, רכיב SCM-EWM-IF-ERP, 'Available As Of SAP S/4HANA " +
          "2020') מונה לתנועות סחורה סינכרוניות ל-EWM מוטמע: תחת Inventory Management BAPIs את BAPI_GOODSMVT_CREATE " +
          "ו-BAPI_GOODSMVT_CANCEL; תחת Production Planning BAPIs את BAPI_PRODORDCONF_CREATE_HDR, " +
          "BAPI_PRODORDCONF_CREATE_TT ו-BAPI_PRODORDCONF_CANCEL (Assembly Backflush, Unplanned Component Backflush, " +
          "Planned Component Backflush); ואת API_PROD_ORDER_CONFIRMATION_2_SRV ליצירה, קריאה וביטול של אישורים. " +
          "העמוד מציין: 'Synchronous Goods Movement is not available in decentralized EWM based on SAP S/4HANA'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Make-to-Stock Production - Discrete Manufacturing (BJ5) | What's New in SAP S/4HANA 1909",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/df4ef977909a47e293b3762935ec44d8.html?locale=en-US&state=PRODUCTION&version=1909.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1909.000",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio df4ef977909a47e293b3762935ec44d8, נקרא דרך שירות התוכן) מתאר את פריט ה-Scope Item 'BJ5 ( " +
          "Make-to-Stock Production - Discrete Manufacturing )', 'Available As Of SAP S/4HANA 1909', רכיב PP: 'The " +
          "new Maintain PIRS app enables the creation and monitoring of planned independent requirements (PIRs) for " +
          "up to 50 materials at a time', ומפנה ל-'the fact sheet in the SAP Best Practices Explorer'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Make-to-Stock Production – Discrete Manufacturing (7UV) | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/170b234ade3c4cdd8d12e052320a89b6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "גוף העמוד (loio 170b234ade3c4cdd8d12e052320a89b6, נקרא דרך שירות התוכן) קובע: 'This scope item describes " +
          "a Make-to-Stock process that begins with Planned Independent Requirements(PIRs) and ends with the " +
          "handover of the production plan to the shop floor', ריצת היוריסטיקה מניעה את התכנון, אילוצי קיבולת " +
          "נפתרים ב-Advanced Scheduling Board, ו-'planned orders are converted into production orders for shop " +
          "floor execution'; רכיב SCM-APO-PPS, זמינות 'SAP S/4HANA Cloud Private Edition and SAP S/4HANA', 'Valid " +
          "as Of 2025 FPS01'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE25,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך מקצה לקצה: היא מקשרת בין שתי הרשומות המפורטות (תכנון דרישות חומר ופקודת ייצור) ואינה מכפילה " +
      "אותן. שני תחומי המאגר שמהם נגזרו הקיבולת והאנליטיקה מתויגים במאגר כתחומי PP-PI ומתוארים כאן במפורש " +
      "כמשותפים לייצור בדיד ותהליכי. שדה ה-reference מפנה לעמוד What's New הרשמי של פריט BJ5 (1909), שמתאר " +
      "שינוי בפריט ולא את השרשרת המלאה; לא נמצא עמוד help.sap.com שמתאר את השרשרת עד ההתחשבנות כיחידה אחת. לפי " +
      "תוצאות החיפוש (שלא צורפו כשורות ראיה), BJ5 מופיע ברשומות What's New עד 2023; בחיפוש לא נמצא עמוד שכותרתו " +
      "BJ5 בגרסאות 2025, וב-2025 FPS01 מופיע 7UV (PP/DS). התוקף של BJ5 ב-2025 לא נקבע. ליישום Manage Work " +
      "Center Capacity (F3289) לא נכתבה רשומת אימות (היא נדחתה בביקורת ונרשמה בתור המחקר), ולכן הוא מוצג כאן על " +
      "סמך רשומת המאגר בלבד. לא בוצעה בדיקה במערכת SAP חיה. Old → New (2026-09-25): שדה ה-reference היה null, " +
      "והערת הרשומה קבעה שלא אותר עמוד SAP רשמי לתהליך המלא ושאף Scope Item לא אומת; כעת הוא מפנה לעמוד What's " +
      "New הרשמי של פריט ה-Scope Item BJ5 (Make-to-Stock Production - Discrete Manufacturing), שהודפס ברשומת " +
      "חיפוש רשמית, והעמוד מכסה שינויים בפריט ולא את השרשרת המלאה. נוסף שדה interfaces: שמות ה-BAPI של הביקוש, " +
      "ההמרה, השחרור והדיווח נקובים ברשומות tx-intel ואינם במילון הפרויקט ולכן מופיעים בפרוזה בלבד; שירותי " +
      "ה-OData API_PLND_INDEP_RQMT_SRV, API_PLANNED_ORDERS, API_PRODUCTION_ORDER_2_SRV, " +
      "API_PROD_ORDER_CONFIRMATION_2_SRV ו-API_MATERIAL_DOCUMENT נקובים בעמודי SAP Help רשמיים. נוספה שורת פריט " +
      "הפישוט S4TWL - MRP in HANA (PP-MRP), שהועתקה מרשומת mrp-process, כמקור לשורת התכנון ב-eccToS4. חיפושי " +
      "SAP Help (2026-09-25, סקופ SAP_S4HANA_ON-PREMISE, 21 רשומות לכל שאילתה): 'production order OData API', " +
      "'production order confirmation OData API', 'planned independent requirements OData API', 'discrete " +
      "manufacturing production planning process', 'Make-to-Stock Production - Discrete Manufacturing BJ5', " +
      "'Make-to-Stock Production Discrete Manufacturing scope item'.",
  },
];
