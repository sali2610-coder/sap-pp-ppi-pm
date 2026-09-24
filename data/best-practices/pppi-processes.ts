/* Project NEO · best practices: PP-PI PROCESS CATALOG (design-audit
   continuation §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with
   no loader.

   Every record here is a whole process, carrying the profile the brief
   requires (purpose, trigger, preconditions, master data, roles, steps,
   transactions/Fiori, tables/objects, integration points, outputs,
   exceptions, controls, KPIs, ECC-to-S/4HANA changes, migration, official
   reference, cross-links). Every line is copied or condensed from the named
   repository records (repoRef) or from an official SAP page that an existing
   overlay already verified (same URL, same claim). A field the repository
   does not document is left out on purpose: the page renders the gap by
   name. Nothing here asserts a new SAP fact. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";
/** accessedAt of the official pages reused from the tx:COR1 / tx:COR6N / fiori overlays. */
const DATE_TX = "2026-09-02";
/** accessedAt of the official pages reused from the tx:C201 / table:PLKO / table:PLPO overlays. */
const DATE_RECIPE = "2026-09-07";
/** accessedAt of the "Constraints in PEO-ERP Integration" page reused from the table:MKAL overlay. */
const DATE_MKAL = "2026-09-01";
/** accessedAt of the official pages reused from the table:MCH1 / table:PLMK overlays. */
const DATE_BATCH = "2026-09-15";
/** accessedAt of the official pages reused from the fm:BAPI_PROCORDCONF_CREATE_TT / fm:BAPI_BATCH_CREATE overlays. */
const DATE_FM = "2026-09-21";

export const PPPI_PROCESS_PRACTICES: BestPracticeLike[] = [
  /* ========================================================= process order */
  {
    slug: "process-order-process",
    he: "פקודת תהליך: יצירה, שחרור, ניפוק, ביצוע, אישור, קבלת תוצרת והתחשבנות",
    en: "Process order: create, release, material staging, execution, confirmation, goods receipt and settlement",
    module: "PP-PI",
    summary:
      "פקודת תהליך היא אובייקט הביצוע של התעשייה התהליכית: היא נושאת כמות, מתכון אב, שלבים, משאבים ורכיבים, " +
      "מפיקה מרשם בקרה לרצפת הייצור, קולטת אישורים וקבלת תוצרת לאצווה, ונסגרת בסטיות ובהתחשבנות.",
    context:
      "לפי רשומות התחומים של המאגר, הפקודה נוצרת ב-COR1 (או בהמרה מהזמנה מתוכננת ב-COR8), משוחררת ב-COR2, " +
      "מדווחת ב-COR6N ומותחשבנת ב-CO88, ונשמרת בטבלאות AUFK (כותרת הזמנה), AFKO, AFPO, AFVC, AFFL ו-RESB. " +
      "רצף הסטטוסים שהמאגר מתעד: CRTD אל REL אל PCNF אל CNF אל TECO אל CLSD. התיעוד הרשמי של S/4HANA " +
      "On-Premise 2025 FPS01 מנחה במפורש שימוש ב-COR1 ליצירת פקודת תהליך, ומבחין בינה לבין הזמנת הייצור " +
      "הדיסקרטית (CO01); בצד ה-API קיימים השירותים API_PROCESS_ORDER_2_SRV לפקודה ו-" +
      "API_PROC_ORDER_CONFIRMATION_2_SRV לדיווח. מודל הנתונים AUFK / AFKO / AFPO נשאר זהה בין ECC ל-S/4HANA " +
      "לפי נושא המעבר של המאגר; תנועות החומר עוברות ב-S/4HANA ל-MATDOC (שאינה במילון הפרויקט).",
    steps: [
      {
        he: "לפתוח את הפקודה: המרה של הזמנה מתוכננת (COR8) או יצירה ישירה ב-COR1 עם חומר, מפעל, סוג פקודה, כמות ותאריכים. הפקודה נכתבת ל-AUFK, AFKO, AFPO ולרזרבציות ב-RESB.",
        xrefs: ["tx:COR1", "tx:COR8", "table:AUFK", "table:AFKO", "table:AFPO", "table:RESB"],
      },
      {
        he: "לוודא גרסת ייצור תקפה לטווח הכמות ולתאריך לפני היצירה: בלעדיה היצירה נכשלת לפי רשומות התחום והתקלות. תחזוקה ב-C223, הרשומה יושבת ב-MKAL.",
        xrefs: ["tx:C223", "table:MKAL", "bp:master-recipe-process"],
      },
      {
        he: "לשחרר את הפקודה ב-COR2: בדיקת זמינות (aATP) וסטטוס REL ב-JEST / JSTO. תוכניתית דרך BAPI_PROCORD_RELEASE.",
        xrefs: ["tx:COR2", "table:JEST", "table:JSTO", "fm:BAPI_PROCORD_RELEASE"],
      },
      {
        he: "לוודא שנוצר מרשם בקרה (Control Recipe) ונשלח ליעד: CO53 להצגת המרשם, CO60 לגיליון PI, CO54 לעיבוד הודעות התהליך החוזרות. הוראות התהליך יושבות בשלבי המתכון ב-PLPO ובפעולות הפקודה ב-AFVC.",
        xrefs: ["tx:CO53", "tx:CO60", "tx:CO54", "table:AFVC", "table:PLPO"],
      },
      {
        he: "לנפק רכיבים לפקודה (תנועה 261) במסמך חומר; הרזרבציות ב-RESB מסומנות כנצרכות והעלות בפועל נרשמת לפקודה.",
        xrefs: ["tx:MIGO", "table:RESB", "obj:material-document", "fm:BAPI_GOODSMVT_CREATE"],
      },
      {
        he: "לדווח ביצוע שלב ב-COR6N (Time Ticket) או ברמת הפקודה ב-CORK: תפוקה, פסולת וזמנים נשמרים ב-AFRU. תוכניתית דרך BAPI_PROCORDCONF_CREATE_TT; ביטול דרך BAPI_PROCORDCONF_CANCEL או CORS.",
        xrefs: ["tx:COR6N", "tx:CORK", "tx:CORS", "table:AFRU", "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_PROCORDCONF_CANCEL"],
      },
      {
        he: "לסרוק את COGI אחרי כל אישור: תנועות Backflush שנכשלו (חוסר מלאי, אצווה שלא נקבעה, תקופת רישום סגורה) נחסמות שם ומתוקנות ידנית; MF47 לעיבוד המוני.",
        xrefs: ["tx:COGI", "tx:MF47", "tx:MMRV"],
      },
      {
        he: "לקלוט את התוצר אל המלאי (תנועה 101), לרוב לאצווה חדשה עם סיווג ותוקף; אב האצווה נשמר ב-MCH1 או ב-MCHA לפי רמת האצווה שנבחרה בהגדרות.",
        xrefs: ["table:MCH1", "table:MCHA", "bp:batch-management-process"],
      },
      {
        he: "לסגור טכנית (TECO) רק אחרי שכל התנועות נרשמו: רזרבציות פתוחות ותנועות תקועות ב-COGI משאירות שאריות צריכה ועלות. CO46 לאיתור פערי צריכה, MB26 לרשימת רזרבציות. תוכניתית דרך BAPI_PROCORD_COMPLETE_TECH.",
        xrefs: ["tx:CO46", "tx:MB26", "fm:BAPI_PROCORD_COMPLETE_TECH", "table:AFKO"],
      },
      {
        he: "לחשב סטיות (KKS1 / KKS2) ולהתחשבן (CO88): כלל ההתחשבנות ב-COBRB, הרישום הסופי ב-ACDOCA, סכומי העלות ב-COSS ו-COSP. בלי עלות תקן משוחררת (CK11N, CK24) אין סטיות.",
        xrefs: ["tx:KKS1", "tx:KKS2", "tx:CO88", "tx:CK11N", "tx:CK24", "table:COBRB", "table:ACDOCA", "table:COSS", "table:COSP"],
      },
      {
        he: "בממשק תוכניתי לשמור על הרצף CREATE, RELEASE, CONFIRM, GOODS MOVEMENT ואז BAPI_TRANSACTION_COMMIT על אותו LUW, ולבדוק את RETURN אחרי כל קריאה (ראו שיטת משמעת ה-COMMIT).",
        xrefs: ["fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORD_RELEASE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
      },
    ],
    antiPatterns: [
      "פתיחת פקודה בלי גרסת ייצור תקפה לטווח הכמות ולתאריך: היצירה נכשלת, ובתרחישי MRP Live גם התכנון נעצר.",
      "שחרור בלי יעד מרשם בקרה מוגדר: הפקודה משוחררת אך רצפת הייצור אינה מקבלת הוראות.",
      "ניפוק ידני של רכיב שמוגדר גם כ-Backflush: אותו רכיב נצרך פעמיים.",
      "TECO בעוד תנועות תקועות ב-COGI או רזרבציות פתוחות ב-MD04: שאריות צריכה ועלות לא נרשמו לפני הסגירה.",
      "התחשבנות בלי עלות תקן משוחררת או בלי Target Cost Version: הסטיות אינן מחושבות.",
      "רצף BAPI בלי COMMIT או עם התעלמות מטבלת RETURN: הפקודה או הדיווח נשמרים חלקית.",
    ],
    checks: [
      "חיובי: COR1 עם גרסת ייצור תקפה נוצרת, משוחררת ב-COR2, מפיקה מרשם בקרה, מקבלת אישור ב-COR6N וקבלת תוצרת.",
      "שלילי: חומר בלי גרסת ייצור תקפה אינו מאפשר יצירת פקודה.",
      "אינטגרציה: השחרור מריץ בדיקת זמינות (aATP) ושולח את הוראות התהליך ליעד מרשם הבקרה.",
      "רגרסיה: ביטול אישור מהפך את ה-Backflush ואת קבלת התוצרת.",
      "בקרה תפעולית: COGI ריק לפני TECO, ורשימת CO46 אינה מציגה פערי צריכה פתוחים.",
      "ברצף BAPI: מספר הפקודה קיים ב-AFKO רק אחרי COMMIT, וטבלת RETURN נבדקה אחרי כל קריאה.",
    ],
    process: {
      purpose:
        "לנהל ייצור תהליכי בפועל מקצה לקצה: לתרגם ביקוש מתוכנן לפקודה מתוזמנת עם מתכון, שלבים, משאבים ורכיבים, " +
        "להוציא הוראות לרצפת הייצור, לקלוט דיווח וצריכה בפועל, לקבל את התוצר לאצווה ולסגור את הפקודה פיננסית.",
      trigger: [
        { he: "הזמנה מתוכננת שנוצרה ב-MRP והומרה לפקודת תהליך (COR8), לפי זרימת התהליך של המאגר.", xrefs: ["tx:COR8", "tx:MD01N"] },
        { he: "יצירה ידנית של פקודה לחומר (COR1) או פקודה ללא ייחוס לחומר (CORO).", xrefs: ["tx:COR1", "tx:CORO"] },
      ],
      preconditions: [
        { he: "גרסת ייצור תקפה (MKAL) לטווח הכמות ולתאריך; בלעדיה היצירה נכשלת לפי רשומת התקלות no-production-version.", xrefs: ["table:MKAL", "tx:C223"] },
        { he: "מתכון אב משוחרר ותקף לתאריך, עם שלבים ומשאבים; בלעדיו נפתחת פקודה ללא פעולות.", xrefs: ["table:PLKO", "table:PLPO", "tx:C201"] },
        { he: "סוג פקודה בקטגוריה 40 ופרמטרים תלויי סוג פקודה (COR4) עם סוג רשימת משימות 2 למתכון אב, לפי עץ ההגדרות של המאגר.", xrefs: ["tx:COR4", "table:T399X"] },
        { he: "יעד מרשם בקרה מוגדר ומשויך למשאב או למתכון, אחרת לא נוצר מרשם בקרה בשחרור (תקרית process-order-no-control-recipe)." },
      ],
      masterData: [
        { he: "אב חומר עם תצוגות MRP ו-Work Scheduling למפעל המייצר.", xrefs: ["table:MARA", "table:MARC", "tx:MM03"] },
        { he: "עץ מוצר (BOM) ומתכון אב, המקושרים בגרסת הייצור.", xrefs: ["table:MAST", "table:PLKO", "table:MKAL"] },
        { he: "משאבים (מרכזי עבודה תהליכיים) עם קיבולת ונוסחאות תזמון ועלות.", xrefs: ["tx:CRC1", "table:CRHD", "table:CRCA", "table:KAKO"] },
        { he: "כלל התחשבנות ופרופיל התחשבנות לסוג הפקודה; בלעדיהם ההתחשבנות נכשלת.", xrefs: ["table:COBRB"] },
      ],
      roles: [
        { he: "מפעיל ייצור תהליכי: לפי רשומות ה-Fiori של המאגר, Manage Process Orders ו-Confirm Process Order משויכות לתפקיד SAP_BR_PRODN_OPERATOR_PROC ולקטלוג SAP_PP_BC_PROCESS_ORDER. התפקיד והקטלוג לא אוששו במקור SAP רשמי ברשומות האימות.", xrefs: ["fiori:F3577", "fiori:F3364"] },
      ],
      transactions: [
        { he: "COR1 יצירה, COR2 שינוי ושחרור, COR3 תצוגה, COR8 המרת הזמנה מתוכננת, COR5 ו-COR7 עיבוד נוסף, CORO פקודה ללא חומר.", xrefs: ["tx:COR1", "tx:COR2", "tx:COR3", "tx:COR8", "tx:COR5", "tx:COR7", "tx:CORO"] },
        { he: "דיווח: COR6N (Time Ticket לשלב), CORK ברמת הפקודה, CORS ביטול, CORT ו-CORR תצוגה ועיבוד; COGI ו-MF47 לתנועות שנכשלו.", xrefs: ["tx:COR6N", "tx:CORK", "tx:CORS", "tx:CORT", "tx:CORR", "tx:COGI", "tx:MF47"] },
        { he: "ניהול תהליך: CO53 מרשמי בקרה, CO60 גיליונות PI, CO54 הודעות תהליך.", xrefs: ["tx:CO53", "tx:CO60", "tx:CO54"] },
        { he: "רשימות ועיבוד המוני: COID, COOIS ו-COOISPI, COHV ו-COHVPI.", xrefs: ["tx:COID", "tx:COOIS", "tx:COOISPI", "tx:COHV", "tx:COHVPI"] },
        { he: "Fiori לפי רשומות המאגר: Manage Process Orders ו-Confirm Process Order. התיעוד הרשמי של 2025 FPS01 מייחס את השם Manage Process Orders למזהה F4587 ואת פעולת האישור לאפליקציות F4587 / F5323, ושני המזהים אינם במילון הפרויקט.", xrefs: ["fiori:F3577", "fiori:F3364"] },
      ],
      tables: [
        { he: "AUFK כותרת ההזמנה; AFKO כותרת הייצור; AFPO פריט; AFVC פעולות ושלבים; AFFL רצף; RESB רכיבים ורזרבציות.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:AFFL", "table:RESB"] },
        { he: "AFRU אישורי ייצור; JEST ו-JSTO סטטוסי מערכת ומשתמש.", xrefs: ["table:AFRU", "table:JEST", "table:JSTO"] },
        { he: "האובייקט העסקי פקודת תהליך (BOR BUS0001 לפי עמוד Reference Objects הרשמי, 2025.001; שכבת ההעשרה של המאגר נשאה BUS2116 עד 2026-09-24, והעמוד מציב את BUS2116 לאישור פקודת ייצור).", xrefs: ["obj:process-order"] },
        { he: "עלות והתחשבנות: COBRB כללי התחשבנות, COSS ו-COSP סכומי עלות, ACDOCA הרישום הסופי.", xrefs: ["table:COBRB", "table:COSS", "table:COSP", "table:ACDOCA"] },
        { he: "תנועות החומר: MSEG ו-MKPF ב-ECC, ו-MATDOC ב-S/4HANA (MATDOC אינה במילון הפרויקט).", xrefs: ["table:MSEG", "table:MKPF", "obj:material-document"] },
      ],
      integrationPoints: [
        { he: "MES ובקרת רצפה: מרשם בקרה וגיליון PI החוצה, הודעות תהליך חזרה; IDoc LOIPRO להעברת מסלול או מתכון למערכת חיצונית לפי רשומת התחום.", xrefs: ["tx:CO53", "tx:CO54", "idoc:msg:LOIPRO"] },
        { he: "מלאי: ניפוק 261 וקבלת תוצר 101 דרך BAPI_GOODSMVT_CREATE, ללא COMMIT פנימי.", xrefs: ["fm:BAPI_GOODSMVT_CREATE", "obj:material-document", "fiori:F0843"] },
        { he: "אצוות: קבלת התוצר יוצרת אצווה עם סיווג ותוקף, וקביעת אצווה בוחרת רכיבים בצריכה.", xrefs: ["bp:batch-management-process", "table:MCH1"] },
        { he: "ממשק תוכניתי: BAPI_PROCORD_CREATE, GET_DETAIL, GET_LIST, RELEASE, COMPLETE_TECH ו-BAPI_PROCORDCONF_CREATE_TT; בצד ה-OData השירותים API_PROCESS_ORDER_2_SRV ו-API_PROC_ORDER_CONFIRMATION_2_SRV.", xrefs: ["fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORD_GET_DETAIL", "fm:BAPI_PROCORD_GET_LIST", "fm:BAPI_PROCORD_COMPLETE_TECH", "fm:BAPI_PROCORDCONF_CREATE_TT"] },
        { he: "הרחבות לפי פירוט התחום: Customer Exits PPCO0001 (בדיקות פקודה), PPCO0007 (סטטוס) ו-PPCO0021 (רכיבים), ו-BAdIs WORKORDER_UPDATE, WORKORDER_CONFIRM ו-WORKORDER_GOODSMVT.", xrefs: ["enh:exit:PPCO0001", "enh:exit:PPCO0007", "enh:exit:PPCO0021", "enh:badi:WORKORDER_UPDATE", "enh:badi:WORKORDER_CONFIRM", "enh:badi:WORKORDER_GOODSMVT"] },
      ],
      outputs: [
        { he: "פקודת תהליך ממוספרת עם שלבים, רכיבים, רזרבציות ועלות מתוכננת.", xrefs: ["table:AFKO", "table:RESB"] },
        { he: "מרשם בקרה או גיליון PI לרצפת הייצור, והודעות תהליך חוזרות עם ערכים בפועל.", xrefs: ["tx:CO53"] },
        { he: "רשומות אישור עם תפוקה, פסולת וזמנים.", xrefs: ["table:AFRU"] },
        { he: "מסמכי חומר לניפוק ולקבלת תוצר, ואצווה חדשה לתוצר.", xrefs: ["obj:material-document", "table:MCH1"] },
        { he: "סטיות מסווגות ורישום התחשבנות ל-FI ול-CO.", xrefs: ["table:COBRB", "table:ACDOCA"] },
      ],
      exceptions: [
        { he: "יצירה נכשלת בהיעדר גרסת ייצור תקפה (תקריות no-production-version ו-procord-no-routing-recipe).", xrefs: ["table:MKAL"] },
        { he: "מרשם בקרה לא נוצר בשחרור: יעד מרשם הבקרה אינו מוגדר או שלשלב חסרות Process Instructions (תקרית process-order-no-control-recipe).", xrefs: ["tx:CO53"] },
        { he: "תנועות Backflush תקועות ב-COGI: חוסר מלאי, אצווה שלא נקבעה או תקופת רישום סגורה (תקריות cogi-stuck ו-ru505-backflush-stock).", xrefs: ["tx:COGI", "tx:MMRV"] },
        { he: "אישור שלב מחוץ לרצף נדחה (תקרית phase-confirm-sequence).", xrefs: ["tx:COR6N", "table:AFVC"] },
        { he: "TECO חסום בגלל רזרבציה פתוחה (תקרית teco-blocked-open-reservation); התחשבנות נכשלת בהיעדר כלל או בתקופה סגורה (תקרית settlement-error).", xrefs: ["tx:CO46", "tx:OB52", "table:COBRB"] },
      ],
      controls: [
        { he: "בדיקת זמינות בשחרור, כך שפקודה משוחררת רק כשהרכיבים זמינים.", xrefs: ["tx:COR2"] },
        { he: "ניקוי COGI לפני סגירה טכנית, ובדיקת פערי צריכה ב-CO46.", xrefs: ["tx:COGI", "tx:CO46"] },
        { he: "הפרדת הרשאות בין שינוי הזמנה לשחרורה דרך אובייקט ההרשאה C_AFKO_REL, מגרסת S/4HANA 2022 לפי ה-What's New הרשמי; התפקידים הקיימים אינם מתעדכנים אוטומטית.", xrefs: ["tx:COR2"] },
        { he: "שחרור עלות תקן והגדרת Target Cost Version לפני חישוב סטיות.", xrefs: ["tx:CK24", "tx:KKS2"] },
        { he: "בכל רצף BAPI: בדיקת RETURN אחרי כל קריאה ו-COMMIT מפורש בסוף.", xrefs: ["bp:bapi-commit-discipline", "fm:BAPI_TRANSACTION_COMMIT"] },
      ],
      kpis: [
        { he: "לפי רשומת התחום 'אנליטיקת ייצור' של המאגר, המדדים המרכזיים הם תפוקה (Yield), אחוז פסולת (Scrap), זמן מחזור (Lead Time) וניצולת (OEE).", xrefs: ["table:AFRU"] },
        { he: "עומס הפקודות הפתוחות ופערי התפוקה נקראים ממערכת המידע של ההזמנות (COOIS ו-COOISPI) ומהעיבוד ההמוני (COHV ו-COHVPI).", xrefs: ["tx:COOIS", "tx:COOISPI", "tx:COHV", "tx:COHVPI"] },
        { he: "סטיות מול עלות תקן, כפי שהן מחושבות ב-KKS1 ו-KKS2 ומותחשבנות ב-CO88.", xrefs: ["tx:KKS1", "tx:CO88"] },
      ],
      eccToS4: [
        { he: "מודל הנתונים AUFK / AFKO / AFPO / AFVC זהה ב-ECC וב-S/4HANA לפי נושא המעבר של המאגר; ב-ECC העבודה היא ב-COR1 עד COR3 בממשק ה-GUI.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC"] },
        { he: "ב-S/4HANA נוספים שירותי OData ואפליקציות Fiori, ומשולבים PP-DS ו-aATP; פקודת התהליך נשארת אובייקט נפרד מהזמנת הייצור הדיסקרטית (COR1 מול CO01) לפי התיעוד הרשמי של 2025 FPS01.", xrefs: ["tx:COR1", "tx:CO01"] },
        { he: "תנועות החומר עוברות ב-S/4HANA מ-MKPF ו-MSEG לטבלת MATDOC המאוחדת, וקריאה ישירה צריכה לעבור דרך תצוגות תאימות (ראו שיטת הקריאה דרך תאימות MATDOC).", xrefs: ["bp:matdoc-read-through-compatibility", "table:MKPF", "table:MSEG", "cds:I_MaterialDocumentItem"] },
        { he: "מגרסת S/4HANA 2022 אובייקט ההרשאה C_AFKO_REL מפריד בין הרשאת השינוי להרשאת השחרור של הזמנות הייצור והתהליך, לפי ה-What's New הרשמי.", xrefs: ["tx:COR2"] },
        { he: "מזהי ה-Fiori שבמאגר לפקודת תהליך שנויים במחלוקת: רשומות האימות קובעות שהתיעוד הרשמי נוקב ב-F4587 (Manage Process Orders) ובפעולת Confirm Process Order Operation בתוך F4587 / F5323, ואילו F3577 ו-F3364 לא נמצאו במקור רשמי.", xrefs: ["fiori:F3577", "fiori:F3364"] },
      ],
      migration: [
        { he: "אובייקט ההגירה 'PP - Process order (only open PO)' בתיעוד 2025 FPS01 מהגר פקודות תהליך בסטטוס Created או Released, ולאחר ההגירה כולן בסטטוס Created; האימות בגב המערכת דרך COR3.", xrefs: ["tx:COR3"] },
        { he: "בדיקות לאחר המרה לפי רשומות המאגר: מחזור פקודה מלא, מרשם בקרה, אישור עם Backflush וקבלת תוצר, והתחשבנות ל-ACDOCA.", xrefs: ["table:ACDOCA"] },
        { he: "לפני ההמרה להשלים גרסאות ייצור עקביות לכל חומר מיוצר: זו נקודת הכשל שהמאגר מסמן כקריטית.", xrefs: ["table:MKAL", "bp:master-recipe-process"] },
      ],
      reference: {
        title: "Manage Process Orders | Production Planning and Control (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/a84b0308f73c43f29154fbb7e54e15d3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד התהליך הרשמי לעיבוד פקודות תהליך (אומת ברשומת tx:COR6N). פריט SAP Best Practices (Scope Item) " +
          "לתהליך לא אותר ולכן אינו נרשם. העמוד אינו נוקב במזהה האפליקציה שבמאגר (F3577).",
      },
    },
    xrefs: [
      "obj:process-order", "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:AFFL", "table:RESB", "table:AFRU",
      "tx:COR1", "tx:COR2", "tx:COR3", "tx:COR6N", "tx:COR8", "tx:CORK", "tx:CO53", "tx:COGI", "tx:CO88", "tx:KKS1",
      "fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORD_GET_DETAIL", "fm:BAPI_PROCORD_RELEASE", "fm:BAPI_PROCORDCONF_CREATE_TT",
      "fiori:F3577", "fiori:F3364", "table:MKAL", "table:MCH1",
      "bp:master-recipe-process", "bp:batch-management-process", "bp:process-industries-plan-to-produce",
      "bp:bapi-commit-discipline", "bp:matdoc-read-through-compatibility",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'פקודות תהליך' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "זרימת התהליך: הזמנה מתוכננת, פקודת תהליך (COR1), שחרור, מרשם בקרה, אישור (COR6N), התחשבנות; טבלאות " +
          "AUFK, AFKO, AFPO, AFVC, AFFL, RESB; טרנזקציות COR1, COR2, COR3, COR5, COR6N, COR7, COR8; סטטוסים " +
          "CRTD אל REL אל PCNF אל CNF אל TECO אל CLSD; תקלות: שגיאת זמינות חומר, פקודה לא משוחררת, מרשם בקרה לא נוצר.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-process-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'פקודות תהליך' ו'אישורי ייצור' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מטרה ודיאגרמת שלבים (הזמנה מתוכננת, COR1, שחרור ובדיקת זמינות, מרשם בקרה ל-MES ב-CO53, אישור עם " +
          "Backflush וקבלת תוצר, התחשבנות); נתוני אב (סוג פקודה, גרסת ייצור, מתכון, יעד מרשם בקרה, כלל התחשבנות); " +
          "Exits PPCO0001, PPCO0007, PPCO0021 ו-BAdIs WORKORDER_UPDATE, WORKORDER_GOODSMVT, WORKORDER_CONFIRM; " +
          "תקריות (אין גרסת ייצור, מרשם בקרה חסר, Backflush תקוע ב-COGI, התחשבנות נכשלת); הגירה: AUFK, AFKO, AFPO " +
          "נשמרים ובדיקה של מחזור מלא והתחשבנות ל-ACDOCA. רשומת האישורים מוסיפה פרופיל אישור, מפתח בקרה " +
          "ל-Backflush ולקבלת תוצר אוטומטית, ו-Exits CONFPP01 ו-CONFPP05.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-process-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'ייצור למלאי תהליכי מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "השלבים: תחזית (MD61), MRP Live (MD01N), המרה לפקודת תהליך (COR1), שחרור עם בדיקת זמינות ויצירת מרשם " +
          "בקרה (COR2), אישור עם Backflush וקבלת תוצר לאצווה (COR6N), התחשבנות (CO88); הטעויות השכיחות: PIR בגרסה " +
          "לא פעילה, היעדר גרסת ייצור תקפה, יעד מרשם בקרה לא מוגדר, Backflush בלי מלאי, עלות תקן לא משוחררת.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pppi-mts-process-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "זרימת התהליך המאומתת של PP-PI בפרויקט, שלב הביצוע (PPPI_PROCESS_FLOW)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שלבי הביצוע s3 עד s10: יצירת הפקודה (AUFK, AFKO, AFPO, RESB), שחרור עם בדיקת זמינות (JEST, JSTO), " +
          "מרשם בקרה וגיליון PI (AFKO, AFVC, PLPO), ניפוק 261, אישור (AFRU, AFVC, AFFW), Backflush אוטומטי, " +
          "קבלת תוצר 101 לאצווה (MCH1, MCHA) וסגירה טכנית TECO; שלבי ההתחשבנות s11 ו-s12: חישוב סטיות (COSS, " +
          "COSP, KEKO) והתחשבנות ל-ACDOCA ו-CKMLPP.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-process-flow.ts#execution",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'תכנון לייצור' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שישה שלבים מקצה לקצה עם התקריות שלהם: ניהול ביקוש, MRP, פקודת ייצור או תהליך (CO01 / COR1, ממשקים " +
          "API_PROCESS_ORDER_2_SRV ו-IDoc LOIPRO, תקרית process-order-no-control-recipe), ביצוע ואישור (CO11N, " +
          "COR6N, COGI; תקריות cogi-stuck, ru505-backflush-stock, phase-confirm-sequence), קבלת תוצר לאצווה " +
          "והתחשבנות עם סטיות (KKS2, CO88; תקריות settlement-error ו-variance-missing).",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#plan-to-produce",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'פקודות ייצור ותהליך' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: CO01 עד CO03 לייצור דיסקרטי, COR1 עד COR3 לתהליכי, טבלאות AUFK / AFKO / AFPO / AFVC. S/4HANA: " +
          "מבנה נתונים זהה ברובו, נוספים Fiori ושירותי OData ושילוב PP-DS ו-aATP; ההשפעה על המבנה מינימלית " +
          "ושכבת הקריאה והאנליטיקה עוברת ל-CDS. הרשומה מסמנת את הנושא כ'ללא שינוי'.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#production-order-s4",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט (F3577, F3364) ורשומות האימות המקבילות",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המאגר רושם את Manage Process Orders כ-F3577 (תפקיד SAP_BR_PRODN_OPERATOR_PROC, קטלוג " +
          "SAP_PP_BC_PROCESS_ORDER, שירות API_PROCESS_ORDER_2_SRV, טרנזקציות COR1 / COR2 / COID) ואת Confirm " +
          "Process Order כ-F3364 (שירות API_PROC_ORDER_CONFIRMATION_2_SRV, טרנזקציה COR6N). רשומות האימות " +
          "fiori:F3577 ו-fiori:F3364 מסמנות את שני המזהים כסותרים את התיעוד הרשמי, שבו השם Manage Process " +
          "Orders נושא את המזהה F4587 והשם Confirm Process Order נושא App ID CORK; F4587, F5323 ו-CORK אינם " +
          "קיימים ב-data/fiori/apps.ts.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F3577",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: process-order-no-control-recipe, cogi-stuck, teco-blocked-open-reservation",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מרשם בקרה לא נוצר בשחרור: להגדיר יעד מרשם בקרה ולשייכו למשאב או למתכון, ולוודא מפתח בקרה עם Control " +
          "Recipe לשלב. תנועות Backflush תקועות ב-COGI: חוסר מלאי לרכיב, אצווה שאינה קיימת או חסומה, תקופת רישום " +
          "סגורה (AFFW, MSEG). סגירה טכנית חסומה: רכיבים שלא נצרכו ורזרבציות פתוחות ב-MD04, לטפל ב-COGI ולבדוק " +
          "CO46 לפני TECO.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#process-order-no-control-recipe",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PP-PI enrichment), משפחת פקודת התהליך",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "BAPI_PROCORD_CREATE, BAPI_PROCORD_GET_DETAIL, BAPI_PROCORD_GET_LIST, BAPI_PROCORD_RELEASE, " +
          "BAPI_PROCORD_COMPLETE_TECH ו-BAPI_PROCORDCONF_CREATE_TT נושאים אובייקט BOR BUS2116 (כך במאגר עד 2026-09-24; כעת BUS0001, ולאישור BUS2016, לפי עמוד Reference Objects הרשמי), מסווגים כ-BAPI " +
          "כותבים המחייבים BAPI_TRANSACTION_COMMIT, ומשויכים לטרנזקציות COR1 עד COR5, COR2, CORK ו-CORR " +
          "ולטבלאות AFKO, AFPO, AFVC, RESB, JEST ו-AFRU. הרצף הרשום: Create, Release, Confirm, Goods Movement, " +
          "Commit. ביטול דיווח דרך BAPI_PROCORDCONF_CANCEL.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PROCORD_CREATE",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a Process Order | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/4671c13d2e5e498eb6978ed5ca6cb870.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "'Alternatively, you can use the transaction COR1 to create process order.' COR1 מתועדת כזמינה ליצירת " +
          "הזמנת תהליך בתיעוד SAP S/4HANA 2025 FPS01 (אומת ברשומת tx:COR1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/a84b0308f73c43f29154fbb7e54e15d3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "אפליקציית Manage Process Orders מציעה 'Confirm Process Orders and Confirm Process Order Operations " +
          "to enter confirmations against process orders and operations'; נתיב Fiori לדיווח, והעמוד אינו נוקב " +
          "בקוד COR6N (אומת ברשומת tx:COR6N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "דף ההשוואה הרשמי מציין 'App ID COOISPI COHVPI F4587/ F5323' ואת השורה 'Confirm Process Order " +
          "Operation (COR6N) No No Yes': פעולת האישור זמינה באפליקציות Manage Process Orders / Manage Process " +
          "Order Operations (F4587/F5323) ולא ב-COOISPI/COHVPI (אומת ברשומת tx:COR6N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Order Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/fc8dbf5e46004f1c9069b6ac4301c384.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM,
        claim:
          "עמוד השירות במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01 קובע בסניפט: 'Process Order " +
          "Confirmation Technical name: API_PROC_ORDER_CONFIRMATION_2_SRV This service enables you to process " +
          "confirmations for process orders, namely time ticket and time event confirmations for ... operations " +
          "of process orders and confirmations on order level'. הסניפט אינו נוקב בשם BAPI_PROCORDCONF_CREATE_TT " +
          "ואינו מציג את השירות כמחליף שלו (אומת ברשומת fm:BAPI_PROCORDCONF_CREATE_TT).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Read Process Order | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/091b4556227a4b31a821bd07008dde4c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM,
        claim:
          "עמוד 'Read Process Order' מתעד קריאת פקודת תהליך דרך שירות ה-OData API_PROCESS_ORDER_2_SRV: 'To read " +
          "the values of the header entity of a process order, you use the HTTP method GET on the " +
          "A_ProcessOrder_2 entity', וקובע שקריאת הכותרת מאפשרת גם שליפת פריטי ההזמנה, פעולותיה, רכיביה " +
          "וסטטוסיה (אומת ברשומת fm:BAPI_PROCORD_GET_DETAIL).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Process order (only open PO) | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/011bdaaa5ce047f690cb9f8319c6efed.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "מדריך ההגירה של 2025 FPS01 לאובייקט 'PP - Process order (only open PO)' (כינוי PP_PROCORD, רכיב " +
          "PP-PI-POR) מציע לאמת את הנתונים המהוגרים ב-back end דרך 'Transaction: Display Process Order (COR3)' " +
          "ומציין שמדובר בהגירת הזמנות תהליך בסטטוס Created או Released (אומת ברשומות tx:COR3 " +
          "ו-fm:BAPI_PROCORD_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (Production Planning with SAP S/4HANA), פרק 7 'Production Planning for Process Manufacturing', סעיפים 7.5 ו-7.6",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את ביצוע פקודת התהליך (7.5 'Process Order Execution') ואת ניהול התהליך בפועל (7.6): יצירה " +
          "ושחרור של פקודת תהליך (7.6.1), הפקת מרשם בקרה (7.6.2), הורדתו ושליחתו (7.6.3), תחזוקת גיליונות " +
          "הוראות התהליך והשלמתם (7.6.4, 7.6.5) ושליחת הודעות תהליך (7.6.6); הספר משמש כאן להפניית קריאה בלבד " +
          "ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#7.6",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:COR1, tx:COR3, " +
      "tx:COR6N, fm:BAPI_PROCORD_GET_DETAIL ו-fm:BAPI_PROCORDCONF_CREATE_TT. פריט SAP Best Practices (Scope Item) " +
      "לתהליך לא אותר ולכן ההפניה הרשמית היא עמוד התהליך. מזהי ה-Fiori F3577 ו-F3364 נשמרים כמזהי המאגר בלבד: " +
      "רשומות האימות מציינות שהתיעוד הרשמי נוקב ב-F4587, ב-F5323 וב-App ID CORK, ושלושתם אינם במילון הפרויקט. " +
      "הטבלאות MATDOC, AFFW, PLAF, MDKP, CKMLPP ו-KEKO, ותצוגת ה-CDS I_ManufacturingOrder, מופיעות ברשומות המאגר " +
      "אך אינן במילון המזהים, ולכן הן נזכרות בטקסט בלבד. אובייקט ה-BOR BUS2116 הגיע משכבת ההעשרה של המאגר; ב-2026-09-24 תוקן ל-BUS0001 לפי עמוד " +
      "Reference Objects הרשמי (2025.001, loio 62d3b65334e6b54ce10000000a174cb4), שמציב את BUS2116 לאישור פקודת ייצור. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ========================================== master recipe + prod version */
  {
    slug: "master-recipe-process",
    he: "מתכון אב וגרסת ייצור: מהגדרת התהליך התעשייתי ועד שילוב ייצור תקף לפקודה",
    en: "Master recipe and production version: from defining the process to a valid manufacturing combination",
    module: "PP-PI",
    summary:
      "מתכון אב הוא רשימת המשימות של התעשייה התהליכית: פעולות, שלבים (Phases), משאבים, ערכי תקן, הקצאת רכיבים " +
      "והוראות תהליך. גרסת הייצור מקשרת עץ מוצר ומתכון לשילוב תקף לתקופה ולטווח כמות, והיא הבסיס ליצירת פקודת תהליך.",
    context:
      "לפי רשומות התחומים של המאגר, המתכון נוצר ב-C201, משונה ב-C202 ומוצג ב-C203, ונשמר ב-PLKO (כותרת), PLPO " +
      "(פעולות ושלבים), PLFL (רצף), PLAS (שיוך פעולות לרצף), PLMZ (הקצאת רכיבים) ו-PLMK (מאפייני בדיקה). גרסת " +
      "הייצור נשמרת ב-MKAL ומתוחזקת ב-C223. התיעוד הרשמי של S/4HANA On-Premise 2025 FPS01 מנחה במפורש שימוש " +
      "ב-C201 ליצירת מתכון אב, קובע שבתעשיות התהליכיות משתמשים במתכוני אב במקום ברשימות משימות, ומונה את " +
      "אפליקציית Manage Master Recipes (F5426) כחלופת ה-Fiori. באותו תיעוד גרסת הייצור היא מקור האספקה היחיד " +
      "לחומרים המיוצרים ב-S/4HANA, בעוד שב-SAP ERP לא נדרשה גרסת ייצור לפיצוץ BOM בייצור דיסקרטי.",
    steps: [
      {
        he: "לוודא שקיימים נתוני האב שמעליהם נבנה המתכון: אב חומר עם תצוגות MRP ו-Work Scheduling, עץ מוצר תקף ומשאב עם קיבולת ונוסחאות.",
        xrefs: ["table:MARC", "table:MAST", "table:STKO", "tx:CRC1", "table:CRHD"],
      },
      {
        he: "ליצור את המתכון ב-C201 עם קבוצת מתכונים, סוג רשימת משימות 2 (Master Recipe) והקצאה לחומר ולמפעל; הכותרת נכתבת ל-PLKO וההקצאה לחומר ל-MAPL.",
        xrefs: ["tx:C201", "table:PLKO", "table:MAPL"],
      },
      {
        he: "להגדיר פעולות ומשאבים, ומתחתן שלבים (Phases) עם ערכי תקן ומפתח בקרה; הפעולות והשלבים נשמרים ב-PLPO, והרצף ב-PLFL וב-PLAS.",
        xrefs: ["table:PLPO", "table:PLFL", "table:PLAS", "tx:C202"],
      },
      {
        he: "להקצות רכיבי BOM לשלבים (PLMZ) ולהוסיף מאפייני בדיקה כשנדרש שילוב QM (PLMK).",
        xrefs: ["table:PLMZ", "table:PLMK"],
      },
      {
        he: "להזין הוראות תהליך (Process Instructions) בשלבים, שמהן נבנה מרשם הבקרה הנשלח לרצפת הייצור; בלעדיהן לא נוצר מרשם בקרה בשחרור הפקודה.",
        xrefs: ["tx:CO53", "bp:process-order-process"],
      },
      {
        he: "לשחרר את המתכון ולהתאים את תחום התוקף: מתכון שאינו משוחרר או שתוקפו מתחיל מאוחר יותר יוצר פקודה ללא שלבים (תקריות procord-no-routing-recipe ו-recipe-not-valid-on-date).",
        xrefs: ["tx:C202", "tx:C203", "table:PLKO"],
      },
      {
        he: "ליצור גרסת ייצור ב-C223 המקשרת BOM חלופי ומתכון, עם תוקף וטווח כמות; הרשומה נשמרת ב-MKAL ונבחרת אוטומטית ב-MRP ובפקודה.",
        xrefs: ["tx:C223", "table:MKAL", "cds:I_ProductionVersion"],
      },
      {
        he: "לבדוק עקביות: ה-BOM והמתכון תקפים לאותו תאריך ולאותו מפעל, והגרסה אינה נעולה. גרסה חסרה או נעולה עוצרת את MRP Live ואת יצירת הפקודה (תקרית no-production-version).",
        xrefs: ["tx:CS03", "tx:CA51", "table:MKAL"],
      },
      {
        he: "לתחזק שינויים דרך C202 ו-C223 ולא בעדכון ישיר של PLKO או PLPO; לקריאה תוכניתית קיימים CP_RECIPE_READ ו-CP_DI_OPERATION_READ, וליצירת גרסה BAPI_PRODVERS_CREATE_REPLACE.",
        xrefs: ["fm:CP_RECIPE_READ", "fm:CP_DI_OPERATION_READ", "fm:BAPI_PRODVERS_CREATE_REPLACE", "fm:CM_FV_PROD_VERS_READ"],
      },
    ],
    antiPatterns: [
      "שלב בלי משאב משויך: התזמון והעלות אינם מחושבים לפי רשומת התחום.",
      "רכיב שלא הוקצה לשלב ב-PLMZ: הצריכה בפקודה אינה נקשרת לשלב הנכון.",
      "מתכון שלא שוחרר או שתוקפו מתחיל אחרי תאריך הפקודה: נפתחת פקודה ריקה ללא שלבים.",
      "גרסת ייצור שטווח הכמות או התוקף שלה אינם חופפים לפקודה: הגרסה אינה נבחרת.",
      "עדכון ישיר של PLKO או PLPO במקום תחזוקה ב-C202: אין ולידציה ואין היסטוריית שינויים.",
    ],
    checks: [
      "חיובי: מתכון עם פעולות, שלבים והוראות תהליך מאפשר יצירת גרסת ייצור ואז פקודת תהליך.",
      "שלילי: משאב שאינו תקף לתאריך מפיל את שיוך השלב.",
      "אינטגרציה: שלב עם הוראות תהליך מייצר הוראה במרשם הבקרה.",
      "רגרסיה: שינוי במתכון משפיע על פקודות חדשות בלבד לפי רשומת ה-QA של המאגר.",
      "עקביות: לכל חומר מיוצר קיימת גרסת ייצור תקפה אחת לפחות לטווח הכמות המתוכנן.",
    ],
    process: {
      purpose:
        "להגדיר את התהליך התעשייתי פעם אחת כנתון אב, ולהעמיד ממנו שילוב ייצור תקף (עץ מוצר, מתכון, תוקף וטווח " +
        "כמות) שממנו נגזרות פקודות התהליך, התזמון, העלות ומרשם הבקרה.",
      trigger: [
        { he: "מוצר חדש או קו ייצור חדש שדורשים הגדרת תהליך; מוצר קיים ששיטת הייצור שלו משתנה.", xrefs: ["tx:C201"] },
        { he: "דרישת S/4HANA לגרסת ייצור כמקור אספקה לחומרים מיוצרים, לפני הרצת MRP Live או יצירת פקודה.", xrefs: ["tx:C223", "table:MKAL"] },
      ],
      preconditions: [
        { he: "עץ מוצר תקף לחומר ולמפעל, כולל חלופה (Alternative) אם קיימת יותר מאחת.", xrefs: ["table:MAST", "table:STKO", "tx:CS03"] },
        { he: "משאב (מרכז עבודה תהליכי) עם קיבולת, נוסחאות תזמון ועלות ושיוך למרכז עלות.", xrefs: ["tx:CRC1", "table:CRHD", "table:CRCA", "table:KAKO"] },
        { he: "פרמטרים תלויי סוג פקודה עם סוג רשימת משימות 2 (מתכון אב), לפי עץ ההגדרות של המאגר; אחרת המערכת אינה מוצאת מתכון לפקודה התהליכית.", xrefs: ["tx:COR4", "table:T399X"] },
      ],
      masterData: [
        { he: "אב חומר עם תצוגות MRP ו-Work Scheduling למפעל המייצר.", xrefs: ["table:MARA", "table:MARC", "cds:I_Product"] },
        { he: "מתכון אב: סוג מתכון, משאב לכל שלב, ערכי תקן, מפתח בקרה והוראות תהליך.", xrefs: ["table:PLKO", "table:PLPO"] },
        { he: "גרסת ייצור: עץ מוצר וחלופה, מתכון, תוקף (Valid-from/to), טווח כמות ומפעל.", xrefs: ["table:MKAL", "tx:C223"] },
      ],
      transactions: [
        { he: "C201 יצירה, C202 שינוי, C203 תצוגה; C251 הדפסה ו-C298 מחיקה לפי רשומת התחום.", xrefs: ["tx:C201", "tx:C202", "tx:C203", "tx:C251", "tx:C298"] },
        { he: "C223 לתחזוקת גרסאות הייצור; CS01 עד CS03 לעץ המוצר; CA01 עד CA03 ו-CA51 למסלול הייצור הדיסקרטי המקביל.", xrefs: ["tx:C223", "tx:CS01", "tx:CS02", "tx:CS03", "tx:CA01", "tx:CA02", "tx:CA03", "tx:CA51"] },
        { he: "חלופת ה-Fiori לפי התיעוד הרשמי: Manage Master Recipes (F5426) ו-Manage Production Versions; שני המזהים אינם במילון הפרויקט ולכן אינם מקושרים." },
      ],
      tables: [
        { he: "PLKO כותרת המתכון; PLPO פעולות ושלבים; PLFL רצפים; PLAS שיוך פעולות לרצף; PLMZ הקצאת רכיבים; PLZU קישור רשימות משימות.", xrefs: ["table:PLKO", "table:PLPO", "table:PLFL", "table:PLAS", "table:PLMZ", "table:PLZU"] },
        { he: "PLMK מאפייני בדיקה, לפי התיעוד הרשמי של אובייקט הארכוב PI_PLAN.", xrefs: ["table:PLMK"] },
        { he: "MAPL שיוך חומר למתכון; MKAL גרסאות הייצור.", xrefs: ["table:MAPL", "table:MKAL"] },
        { he: "תצוגות ה-CDS שרשומת המאגר מייחסת לשכבת ה-VDM של המתכון הן I_Routing ו-I_RoutingOperation; לטענה זו לא נמצא מקור רשמי ברשומת tx:C201, ולכן היא נשארת ברובד המאגר.", xrefs: ["cds:I_Routing"] },
      ],
      integrationPoints: [
        { he: "פקודת תהליך: המתכון וגרסת הייצור נבחרים ביצירה וקובעים שלבים, רכיבים ותזמון.", xrefs: ["bp:process-order-process", "tx:COR1"] },
        { he: "ניהול תהליך: הוראות התהליך בשלבים מזינות את מרשם הבקרה ואת גיליון ה-PI.", xrefs: ["tx:CO53", "tx:CO60"] },
        { he: "QM: מאפייני בדיקה במתכון (PLMK) מייצרים בדיקה תוך כדי ייצור.", xrefs: ["table:PLMK"] },
        { he: "תמחיר: המתכון והמשאבים הם הבסיס לחישוב עלות התקן לפני שחרורה.", xrefs: ["tx:CK11N", "tx:CK24"] },
        { he: "ניהול שינויים: CC01 ו-CS08 לניהול שינוי הנדסי על רשימות המשימות לפי רשומות המאגר.", xrefs: ["tx:CC01", "tx:CS08"] },
      ],
      outputs: [
        { he: "מתכון אב משוחרר עם פעולות, שלבים, משאבים, רכיבים והוראות תהליך.", xrefs: ["table:PLKO", "table:PLPO"] },
        { he: "גרסת ייצור תקפה, הנבחרת אוטומטית ב-MRP ובפקודה לפי כמות ותאריך.", xrefs: ["table:MKAL"] },
        { he: "בסיס לתזמון, לעלות התקן ולמרשם הבקרה." },
      ],
      exceptions: [
        { he: "פקודה נפתחת ללא פעולות: אין מתכון משוחרר או שהוא לא תקף לתאריך (תקריות procord-no-routing-recipe ו-recipe-not-valid-on-date).", xrefs: ["tx:C202", "table:PLKO"] },
        { he: "אין גרסת ייצור תקפה: הגרסה חסרה, נעולה, או שטווח הכמות והתוקף אינם חופפים (תקרית no-production-version).", xrefs: ["table:MKAL", "tx:C223"] },
        { he: "שלב בלי משאב או רכיב שלא הוקצה: תזמון, עלות או צריכה שגויים לפי רשומת התחום.", xrefs: ["table:PLPO", "table:PLMZ"] },
      ],
      controls: [
        { he: "שחרור המתכון ובדיקת תחום התוקף לפני שימוש תפעולי.", xrefs: ["tx:C202"] },
        { he: "בדיקת עקביות של הגרסה מול BOM ומתכון תקפים לאותו תאריך ומפעל.", xrefs: ["tx:C223", "table:MAST"] },
        { he: "סריקה תקופתית של חומרים מיוצרים ללא גרסת ייצור תקפה, כפי שהמאגר ממליץ בשכבת נתוני האב.", xrefs: ["table:MKAL"] },
        { he: "תחזוקה דרך הטרנזקציות ולא בעדכון ישיר של טבלאות רשימת המשימות.", xrefs: ["table:PLKO", "table:PLPO"] },
      ],
      eccToS4: [
        { he: "מודל PLKO / PLPO זהה ב-ECC וב-S/4HANA לפי פירוט התחום של המאגר; חוויית המשתמש עוברת ל-Fiori.", xrefs: ["table:PLKO", "table:PLPO"] },
        { he: "גרסת הייצור: לפי התיעוד הרשמי ב-S/4HANA היא מקור האספקה היחיד לחומרים המיוצרים, ואילו ב-SAP ERP לא נדרשה גרסת ייצור לפיצוץ BOM בייצור דיסקרטי. בתעשיות תהליכיות היא הייתה נדרשת גם קודם לכן לפי רשומת המאגר.", xrefs: ["table:MKAL"] },
        { he: "חלופת ה-Fiori המתועדת ליצירת ולשינוי מתכוני אב היא Manage Master Recipes (F5426); המזהה אינו במילון הפרויקט ולכן אינו מקושר." },
        { he: "אזהרת המרה מפריט הפישוט 'S4TWL - ABAP-List-Based PI-Sheets': יעדי מרשם בקרה מסוג 1 מוחלפים בסוג X מ-S/4HANA 2023 או בסוג 4 בגרסאות נמוכות יותר, וההחלפה נוגעת למתכוני האב ולפקודות התהליך; CO56 ו-CO58 אינן פעילות ב-S/4HANA.", xrefs: ["tx:CO53"] },
      ],
      migration: [
        { he: "אובייקט ההגירה הרשמי 'Master recipe' (כינוי PP_MSTRRCP, רכיב PP-PI, נתוני אב) מהגר את המתכונים, והאימות נעשה ב-C203 או באפליקציית Manage Master Recipes.", xrefs: ["tx:C203"] },
        { he: "אובייקט ההגירה 'PP - Production version' בוחר אוטומטית את גרסאות הייצור מטבלת MKAL במערכת המקור; תיעוד ההגירה מנחה להריץ את אובייקטי Routing ו-Production version באותו פרויקט.", xrefs: ["table:MKAL"] },
        { he: "PLKO ו-PLPO נשמרים בהמרה; בדיקת QA לפי המאגר: מתכון, שלבים, הוראות תהליך וגרסה תקפה לכל חומר מיוצר.", xrefs: ["table:PLKO", "table:PLPO"] },
      ],
      reference: {
        title: "Creating a Master Recipe | Logistics - General (LO) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/6b0f0159d0cd4d1d8227a1427b40bfe2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "נוהל היצירה הרשמי של מתכון אב (אומת ברשומת tx:C201). פריט SAP Best Practices (Scope Item) לתהליך לא " +
          "אותר ואינו נרשם.",
      },
    },
    xrefs: [
      "table:PLKO", "table:PLPO", "table:PLFL", "table:PLAS", "table:PLMZ", "table:PLMK", "table:PLZU",
      "table:MAPL", "table:MKAL", "table:MAST", "table:STKO", "table:MARC",
      "tx:C201", "tx:C202", "tx:C203", "tx:C223", "tx:CRC1", "tx:CS03",
      "fm:CP_RECIPE_READ", "fm:CP_DI_OPERATION_READ", "fm:BAPI_PRODVERS_CREATE_REPLACE", "fm:CM_FV_PROD_VERS_READ",
      "cds:I_ProductionVersion", "cds:I_Routing",
      "bp:process-order-process", "bp:process-industries-plan-to-produce",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחומים 'מתכוני אב' ו'גרסאות ייצור' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מתכון אב מגדיר פעולות, שלבים, משאבים, חומרים ויחסי תזמון; טבלאות PLKO, PLPO, PLMZ, PLFL; טרנזקציות " +
          "C201, C202, C203, C251, C298; הוראות התהליך בשלבים מזינות את מרשם הבקרה; תקלות: שלב ללא משאב, רכיב " +
          "שלא הוקצה. גרסת ייצור מקשרת BOM למתכון ולתקופת תוקף, נשמרת ב-MKAL ומתוחזקת ב-C223, ולפי הרשומה היא " +
          "חובה ב-S/4HANA בניגוד ל-ECC; תקלות: אין גרסה תקפה, גרסה לא נבחרת בגלל נעילה או טווח כמות.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-master-recipes",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'מתכוני אב' ו'גרסאות ייצור' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "דיאגרמת השלבים: יצירת מתכון (C201), פעולות ומשאבים, שלבים והוראות תהליך, גרסת ייצור (C223), פקודת " +
          "תהליך, מרשם בקרה ל-MES; נתוני אב: סוג מתכון, משאב לכל שלב, PI Characteristics, מפתח בקרה וערכי תקן; " +
          "פונקציות CP_RECIPE_READ ו-CP_DI_OPERATION_READ; תקריות: מתכון לא משויך לפקודה, הוראת תהליך חסרה, " +
          "תזמון שגוי; הגירה: PLKO ו-PLPO נשמרים ובדיקת מתכון, שלבים, PI וגרסה לאחר ההמרה. רשומת גרסאות הייצור " +
          "מוסיפה BAPI_PRODVERS_CREATE_REPLACE ו-CM_FV_PROD_VERS_READ ואת ה-BAdI לבחירת גרסה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-master-recipes",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת נתוני האב של PP-PI בפרויקט (PPPI_MASTER_DATA_FACETS), רשומת MKAL",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "גרסת ייצור מקשרת BOM ומסלול או מתכון לתוקף ולטווח כמות; נוצרת ב-C223 לאחר שקיימים BOM ומתכון תקפים; " +
          "טבלאות MKAL, PLKO, MARC, MAST; תצוגת CDS I_ProductionVersion; פונקציות BAPI_PRODVERS_CREATE_REPLACE " +
          "ו-CM_FV_PROD_VERS_READ; טעויות שכיחות: אין גרסה תקפה, טווח כמות או תוקף שאינם חופפים, BOM או מתכון " +
          "שאינם תקפים לתאריך, נעילה החוסמת בחירה. הרשומה מציינת שההגדרה OPL8 היא פרמטרים תלויי סוג פקודה ולא " +
          "גרסת ייצור.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-master-data-facets.ts#MKAL",
      },
      {
        sourceType: "repository",
        sourceTitle: "עץ ההגדרות של PP-PI בפרויקט (PPPI_CONFIG_TREE), אזורי מתכון אב וגרסת ייצור",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אזור 'מתכון אב / מסלול' מתעד פרופיל מתכון אב עם ערכי ברירת מחדל ואת סטטוס רשימת המשימות וההקצאה " +
          "לסוגי חומר; אזור 'גרסת ייצור' קובע שגרסת ייצור היא חובה ב-S/4HANA ומתוחזקת ב-C223; אזור סוגי הצו " +
          "קובע שבפרמטרים תלויי סוג פקודה של הצו התהליכי (COR4) נבחר סוג רשימת משימות 2 (מתכון אב), ושסוג רשימה " +
          "שאינו 2 גורם לכך שהמערכת אינה מוצאת מתכון אב לצו התהליכי; הטבלה הנושאת את הפרמטרים היא T399X.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-config-tree.ts#master-recipe-routing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: procord-no-routing-recipe, recipe-not-valid-on-date, no-production-version",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "פקודת תהליך נפתחת ללא פעולות או שלבים כשאין מתכון אב משוחרר לצירוף חומר ומפעל, כשהתוקף מתחיל מאוחר " +
          "יותר, כשאין גרסת ייצור או שהיא חסומה, או כשההקצאה לשימוש (usage) אינה תואמת; טבלאות PLKO, PLPO, " +
          "MKAL, MAPL, PLAS; הבדיקה ב-C202 (סטטוס ותוקף), ב-C223 (גרסה פעילה) וב-MKAL (נעילה). רשומת " +
          "no-production-version מוסיפה שיש לאמת BOM ב-CS03 ומתכון ב-C203 ולהתאים תוקף וטווח כמות.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#procord-no-routing-recipe",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a Master Recipe | Logistics - General (LO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/6b0f0159d0cd4d1d8227a1427b40bfe2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_RECIPE,
        claim:
          "נוהל 'Creating a Master Recipe' בתיעוד 2025 FPS01 קובע: 'Alternatively, you can also use the " +
          "transaction C201 to create a master recipe. Enter the following mandatory fields: Material Plant' " +
          "(אומת ברשומת tx:C201).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Routings for Configurable Materials | Variant Configuration (LO-VC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a73402f511734e6eac56063e631bf24e/d362b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_RECIPE,
        claim:
          "התיעוד קובע: 'In the processing industries, master recipes are used instead of task lists. Master " +
          "recipes contain all the recipe objects that are required for all product variants', ומפנה ל-'PP-PI " +
          "Master Recipes / Creating Master Recipes' בנפרד מ-'PP Routings / Creating a Routing' (אומת ברשומת " +
          "tx:C201).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Master recipe | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/aa818997f3524905ab7bb863aceddb81.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_RECIPE,
        claim:
          "עמוד אובייקט ההגירה 'Master recipe' (Object Alias PP_MSTRRCP, רכיב PP-PI, סוג Master data) מגדיר: " +
          "'A description of an enterprise-specific process in the process industry that doesn't relate to a " +
          "specific order', ומונה לאימות הנתונים: 'App: Display Master Recipe (C203) Manage Master Recipes " +
          "(F5426)' וכן 'Transaction: Display Master Recipe (C203)' (אומת ברשומת tx:C201).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Master Recipes (PP-PI-MD) | Data Archiving in Production Planning and Control (PP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/c36fbd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_RECIPE,
        claim:
          "עמוד הארכוב של מתכוני אב (אובייקט ארכוב PI_PLAN, סוג רשימה 2 Master Recipe) בגרסת 2025 FPS01 מונה " +
          "את טבלאות המתכון: 'PLKO Recipe header', 'MAPL Material-recipe assignment', 'PLFL Sequences PLPO " +
          "Operations and phases PLAS Assignment of operations to sequences PLMZ Material component " +
          "assignments' ו-'PLFH Assignments of production resources/tools PLMK Inspection characteristics PLMW " +
          "Inspection characteristic values PLAB Relationships PLFT Process instructions' (אומת ברשומות " +
          "table:PLKO, table:PLPO ו-table:PLMK).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Constraints in PEO-ERP Integration | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/aa0c4f53e6df4a2c9cf87891bb39a909.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_MKAL,
        claim:
          "התיעוד הרשמי קובע, תחת 'Full SAP S/4HANA Solution': ב-SAP S/4HANA 'the production version is the " +
          "only source of supply for manufactured materials' (אומת ברשומת table:MKAL).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production version | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/94e563ae05544015adbf46931532aa3f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "אובייקט ההגירה 'PP - Production version' בוחר אוטומטית את גרסאות הייצור של החומרים מטבלת MKAL במערכת " +
          "המקור: 'This migration object automatically selects the production version of the materials from the " +
          "MKAL table for the derived plants' (אומת ברשומת table:MKAL).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023, Feature Pack Stack 3 · item 30.8 S4TWL - ABAP-List-Based PI-Sheets (PP-PI-PMA-MGT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_RECIPE,
        claim:
          "פריט 30.8 (רכיב PP-PI-PMA-MGT) קובע שגיליונות PI מבוססי ABAP-list הוחלפו: יעדי Control Recipe מסוג 1 " +
          "יש להחליף ביעדים מסוג X (Execution Sheets, מ-S/4HANA 2023) או מסוג 4 בגרסאות נמוכות מ-2023, " +
          "ו-'This replacement mostly affects the used master recipes and process orders'; 'Transactions CO56 " +
          "and CO58 have been deactivated in SAP S/4HANA (on-premise and Private Cloud Edition [PCE])'. הפריט " +
          "אינו מזכיר את C201 (אומת ברשומת tx:C201).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (Production Planning with SAP S/4HANA), פרק 7 סעיף 7.2 'Master Data in Process Manufacturing' ופרק 4 סעיף 4.1 'Master Data in Process Industries'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "סעיף 7.2 מתעד את נתוני האב של הייצור התהליכי: אב חומר (7.2.1), עץ מוצר (7.2.2), משאב (7.2.3), גרסת " +
          "ייצור (7.2.4) ויצירת מתכון אב (7.2.5); סעיף 4.1 מתעד את הגדרות נתוני האב בתעשיות התהליכיות, ובהן " +
          "פרופיל מתכון האב (4.1.1), שיוך רשימת משימות לסוגי חומר (4.1.2) וסטטוס רשימת המשימות (4.1.3); הספר " +
          "משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#7.2.5",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:C201, " +
      "table:PLKO, table:PLPO, table:PLMK ו-table:MKAL. שני שדות בפרופיל הושמטו במכוון מפני שהמאגר אינו מתעד " +
      "אותם לתהליך הזה: roles (אין תפקיד עסקי של SAP הרשום לתחזוקת מתכון אב או גרסת ייצור באף רשומת Fiori של " +
      "הפרויקט) ו-kpis (אין מדדים מתועדים לתהליך נתוני האב). מזהי האפליקציות F5426 (Manage Master Recipes) " +
      "ו-Manage Production Versions אינם קיימים ב-data/fiori/apps.ts ולכן אינם מקושרים. הטבלאות PLFH, PLMW, " +
      "PLAB, PLFT, KALT ו-KALC מופיעות בעמוד הארכוב הרשמי אך אינן במילון הפרויקט, ולכן הן נזכרות בטקסט בלבד. " +
      "טענת ה-CDS (I_Routing ו-I_RoutingOperation כשכבת ה-VDM של המתכון) מגיעה מרשומת המאגר ולא אוששה במקור " +
      "רשמי, כפי שנרשם ברשומת tx:C201. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ====================================================== batch management */
  {
    slug: "batch-management-process",
    he: "ניהול אצוות: יצירה, סיווג, קביעת אצווה ומעקב",
    en: "Batch management: creation, classification, batch determination and traceability",
    module: "PP-PI",
    summary:
      "ניהול אצוות עוקב אחר מנות ייצור עם מאפיינים, תוקף וסיווג: האצווה נוצרת ידנית או בקבלת התוצר, מסווגת " +
      "במאפייני אצווה, נבחרת אוטומטית בצריכה ובמכירה בקביעת אצווה, ונשמרת במעקב קדימה ואחורה.",
    context:
      "לפי רשומות התחומים של המאגר, האצווה מתוחזקת ב-MSC1N עד MSC4N ונשמרת ב-MCH1 או ב-MCHA; הסיווג נשמר " +
      "בטבלאות הסיווג (AUSP, INOB, KSSK, שאינן במילון הפרויקט) והמעקב נקרא ב-MB56 וב-Batch Information Cockpit. " +
      "התיעוד הרשמי של S/4HANA On-Premise 2025 FPS01 קובע שרמת האצווה נבחרת בהגדרות ניהול האצוות, שהיא הקובעת " +
      "אם רשומת האב יושבת ברמת מפעל או ברמת חומר או לקוח, ושסוג מחלקת הסיווג הוא 022 ברמת מפעל ו-023 ברמת חומר " +
      "או לקוח. אובייקט ההגירה הרשמי 'Batch unique at material and client level' שולף את נתוני האצווה מטבלת " +
      "MCH1, ושירות ה-OData Batch Master Record (API_BATCH_SRV) מאפשר קריאה, יצירה ועדכון של אצוות ושל נתוני " +
      "הסיווג שלהן.",
    steps: [
      {
        he: "להפעיל ניהול אצוות באב החומר ולשייך לו מחלקת אצווה; בלי ההפעלה והשיוך לא נוצרת אצווה ולא ניתן לסווג.",
        xrefs: ["tx:MM02", "table:MARA", "table:MARC"],
      },
      {
        he: "לוודא את רמת האצווה בהגדרות: ברמת מפעל רשומת האב יושבת ב-MCHA וסוג מחלקת הסיווג הוא 022; ברמת חומר או לקוח היא יושבת ב-MCH1 וסוג המחלקה הוא 023.",
        xrefs: ["table:MCH1", "table:MCHA"],
      },
      {
        he: "ליצור את האצווה: ידנית ב-MSC1N, או אוטומטית בקבלת התוצר מפקודת התהליך לפי פרופיל מספור אצווה. תוכניתית דרך BAPI_BATCH_CREATE או POST על הישות Batch בשירות ה-OData.",
        xrefs: ["tx:MSC1N", "fm:BAPI_BATCH_CREATE", "obj:batch", "bp:process-order-process"],
      },
      {
        he: "לסווג את האצווה: להזין ערכי מאפיינים (תאריך ייצור, תאריך תפוגה, יצרן, נתוני איכות) ב-MSC2N. מאפיין חובה ריק חוסם את הסיווג ואת הקביעה בהמשך.",
        xrefs: ["tx:MSC2N", "tx:CL20N", "tx:CL24N"],
      },
      {
        he: "להגדיר אסטרטגיית קביעת אצווה ומיון (למשל FEFO) ולתחזק רשומות תנאי, כך שהאצווה נבחרת אוטומטית בצריכה בפקודה ובמכירה.",
        xrefs: ["tx:CL30N", "tx:CL6O"],
      },
      {
        he: "לצרוך את האצווה בפקודה: קביעת אצווה בניפוק ידני וב-Backflush; אצווה שלא נקבעה מפילה את התנועה ל-COGI.",
        xrefs: ["tx:COR6N", "tx:COGI", "table:RESB"],
      },
      {
        he: "לעקוב אחר האצווה קדימה ואחורה: MB56 למעקב שימוש (Batch Where-Used) ו-MB51 לרשימת תנועות החומר; המעקב דורש שמנגנון ה-Where-Used יהיה פעיל.",
        xrefs: ["tx:MB56", "tx:MB51", "obj:material-document"],
      },
      {
        he: "לנהל תוקף וחסימה: אצווה שפג תוקפה או שנפסלה ב-QM נחסמת ואינה נבחרת בקביעה; הצגה ב-MSC3N ומסמכי שינוי ב-MSC4N.",
        xrefs: ["tx:MSC3N", "tx:MSC4N"],
      },
      {
        he: "בקריאה תוכניתית: BAPI_BATCH_GET_DETAIL או VB_BATCH_DETAIL_GET; בכתיבה לוודא COMMIT מפורש ולתכנן את הסיווג כערוץ נפרד (למשל BAPI_OBJCL_CREATE), כפי שרשומת האימות ממליצה.",
        xrefs: ["fm:BAPI_BATCH_GET_DETAIL", "fm:VB_BATCH_DETAIL_GET", "fm:BAPI_OBJCL_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
      },
    ],
    antiPatterns: [
      "ניהול אצוות שלא הופעל באב החומר או מחלקת אצווה שלא הוקצתה: אין אצווה ואין סיווג.",
      "פרופיל מספור אצווה חסר: קבלת התוצר אינה מייצרת אצווה לפי רשומות התקלות של המאגר.",
      "מאפיין חובה ריק (למשל תאריך תפוגה): הסיווג נחסם וקביעת האצווה אינה בוחרת.",
      "שינוי רמת האצווה בהגדרות אחרי שהצטברו נתונים: הרמה קובעת אם רשומת האב ב-MCH1 או ב-MCHA ואיזה סוג מחלקה משמש.",
      "הסתמכות על קביעת אצווה בלי רשומת תנאי ובלי כלל מיון: האצווה אינה נבחרת והתנועה נופלת ל-COGI.",
    ],
    checks: [
      "חיובי: קבלת תוצר מפקודת תהליך יוצרת אצווה עם סיווג ותאריך תפוגה.",
      "שלילי: מאפיין חובה ריק חוסם את הסיווג.",
      "אינטגרציה: קביעת אצווה לפי FEFO בוחרת את האצווה הקרובה לתפוגה בצריכה ובמכירה.",
      "רגרסיה: מעקב שימוש לאצווה מחזיר את שרשרת התנועות קדימה ואחורה.",
      "בקרה: אצווה שנפסלה ב-QM או שפג תוקפה אינה נבחרת בקביעה.",
    ],
    process: {
      purpose:
        "לאפשר מעקב מלא אחר מנות ייצור בתעשיות שבהן האצווה היא יחידת הבקרה (מזון, משקאות, פארמה): זיהוי ייחודי, " +
        "מאפיינים ותוקף, בחירה אוטומטית בצריכה ובמכירה, ושחזור מלא של מסלול האצווה בעת אירוע איכות או ריקול.",
      trigger: [
        { he: "קבלת תוצר מפקודת תהליך, שיוצרת אצווה חדשה לפי פרופיל מספור אצווה.", xrefs: ["tx:COR6N", "bp:process-order-process"] },
        { he: "קבלת חומר מספק או תנועת מלאי לחומר מנוהל אצוות.", xrefs: ["tx:MIGO", "tx:MB31"] },
        { he: "יצירה ידנית של אב אצווה ב-MSC1N.", xrefs: ["tx:MSC1N"] },
      ],
      preconditions: [
        { he: "סימון ניהול אצוות באב החומר, ומחלקת אצווה מהסוג המתאים לרמה שנבחרה (022 ברמת מפעל, 023 ברמת חומר או לקוח).", xrefs: ["table:MARA", "table:MARC"] },
        { he: "רמת אצווה שנקבעה בהגדרות ניהול האצוות; לפי התיעוד הרשמי מעבר מרמת מפעל לרמת חומר מותנה בכך שהחומר מנוהל באצוות בכל המפעלים.", xrefs: ["table:MCH1", "table:MCHA"] },
        { he: "פרופיל מספור אצווה, אחרת האצווה אינה נוצרת בתנועת הסחורה." },
        { he: "אסטרטגיית קביעת אצווה ורשומות תנאי, כתנאי לבחירה אוטומטית." },
      ],
      masterData: [
        { he: "אב אצווה: מספר אצווה, חומר ומפעל, נשמר ב-MCH1 או ב-MCHA לפי הרמה.", xrefs: ["table:MCH1", "table:MCHA", "obj:batch"] },
        { he: "מחלקת אצווה ומאפייניה: תאריך ייצור, תאריך תפוגה, יצרן, נתוני איכות.", xrefs: ["tx:CL20N", "tx:CL24N"] },
        { he: "אב חומר עם סימון ניהול אצוות ושיוך מחלקה.", xrefs: ["table:MARA", "tx:MM02"] },
      ],
      roles: [
        { he: "לפי רשומת ה-Fiori של המאגר, אפליקציית Manage Batches משויכת לתפקיד SAP_BR_WAREHOUSE_CLERK ולקטלוג SAP_LO_BC_BATCH. התפקיד והקטלוג לא אוששו במקור SAP רשמי ברשומת האימות.", xrefs: ["fiori:F1576"] },
      ],
      transactions: [
        { he: "MSC1N יצירה, MSC2N שינוי, MSC3N תצוגה, MSC4N מסמכי שינוי.", xrefs: ["tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "tx:MSC4N"] },
        { he: "סיווג ובחירה: CL20N, CL24N ו-CL30N; CL6O לרשימת אובייקטים לפי מחלקה.", xrefs: ["tx:CL20N", "tx:CL24N", "tx:CL30N", "tx:CL6O"] },
        { he: "מעקב ותנועות: MB56 למעקב שימוש, MB51 לרשימת תנועות, MMBE ו-MB52 למצב מלאי.", xrefs: ["tx:MB56", "tx:MB51", "tx:MMBE", "tx:MB52"] },
        { he: "Fiori לפי רשומת המאגר: Manage Batches. רשומת האימות מציינת שהתיעוד הרשמי של 2025 FPS01 נוקב באפליקציה בשם זה עם App ID F2462, מזהה שאינו במילון הפרויקט.", xrefs: ["fiori:F1576"] },
      ],
      tables: [
        { he: "MCH1 אב האצווה ברמת חומר או לקוח; MCHA אב האצווה ברמת מפעל.", xrefs: ["table:MCH1", "table:MCHA"] },
        { he: "האובייקט העסקי אצווה. אובייקט ה-BOR שלו תוקן ל-BUS1001002 ב-2026-09-21 על סמך העמוד הרשמי Reference Objects, לפי תיקון FIX-8c של ביקורת העיצוב.", xrefs: ["obj:batch"] },
        { he: "תצוגת ה-CDS לאצווה.", xrefs: ["cds:I_Batch"] },
        { he: "טבלאות מלאי האצווה והסיווג (MCHB, AUSP, INOB, KSSK, KLAH, CABN) ומעקב השימוש (CHVW) מופיעות ברשומות המאגר אך אינן במילון הפרויקט, ולכן אינן מקושרות." },
      ],
      integrationPoints: [
        { he: "ייצור: קבלת תוצר מפקודת תהליך יוצרת את האצווה, ו-Backflush צורך אצוות רכיבים.", xrefs: ["bp:process-order-process", "tx:COR6N", "tx:COGI"] },
        { he: "מלאי ותנועות: כל תנועה של חומר מנוהל אצוות נושאת מספר אצווה במסמך החומר.", xrefs: ["obj:material-document", "fm:BAPI_GOODSMVT_CREATE", "fiori:F0843"] },
        { he: "QM: אצווה שנפסלה בהחלטת שימוש נחסמת ואינה נבחרת בקביעה, לפי תרחיש המאגר." },
        { he: "ממשק תוכניתי: BAPI_BATCH_CREATE ו-BAPI_BATCH_GET_DETAIL, ובצד ה-OData שירות Batch Master Record (API_BATCH_SRV) עם POST ליצירה ו-PATCH עם כותרת If-Match לשינוי.", xrefs: ["fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "fm:BAPI_OBJCL_CREATE"] },
        { he: "הרחבות: לפי רשומת האימות של ההרחבות, ה-BAdI שהתיעוד הרשמי נוקב בו לקביעת אצווה הוא VB_BD_SELECTION, ולהצעת כמות LOBM_BATCH_DET_QTY_PROPOSAL; ההרחבה שבקטלוג המאגר רשומה כ-SAPLV01Z, והתיעוד נוקב ב-SAPLV1ZN עם רכיב ה-Exit EXIT_SAPLV01Z_014 לסיווג אצווה בקבלת טובין.", xrefs: ["enh:exit:SAPLV01Z"] },
      ],
      outputs: [
        { he: "אב אצווה ממוספר עם מאפיינים, תוקף וסטטוס.", xrefs: ["table:MCH1", "table:MCHA"] },
        { he: "אצווה נבחרת אוטומטית בצריכה ובמכירה לפי אסטרטגיית הקביעה." },
        { he: "שרשרת מעקב קדימה ואחורה לאצווה, לשימוש באירוע איכות או בריקול.", xrefs: ["tx:MB56"] },
      ],
      exceptions: [
        { he: "אצווה לא נוצרה: ניהול אצוות לא פעיל או פרופיל מספור אצווה חסר (תקריות המאגר על יצירת אצווה).", xrefs: ["table:MARC"] },
        { he: "קביעת אצווה נכשלת: אסטרטגיה או מיון שאינם מוגדרים, מאפייני בחירה שאינם תואמים, או אצוות חסומות ופגות תוקף (תקרית batch-determination-fail).", xrefs: ["tx:CL30N"] },
        { he: "ערכי מאפיין חסרים: הקביעה אינה בוחרת וההערכה שגויה (תקרית char-batch-classification-missing).", xrefs: ["tx:MSC2N"] },
        { he: "אצווה שלא נקבעה ב-Backflush: התנועה נחסמת ב-COGI.", xrefs: ["tx:COGI"] },
      ],
      controls: [
        { he: "מאפייני חובה (למשל תאריך תפוגה) כתנאי לסיווג ולשחרור האצווה.", xrefs: ["tx:MSC2N"] },
        { he: "חסימה אוטומטית של אצווה שנפסלה באיכות או שפג תוקפה, כך שלא תיבחר בקביעה.", xrefs: ["tx:MSC3N"] },
        { he: "מעקב שימוש פעיל לאצווה, כתנאי ליכולת שחזור בריקול.", xrefs: ["tx:MB56"] },
        { he: "בירור רמת האצווה בהגדרות לפני כל ממשק או הסבה: היא קובעת את טבלת האב ואת סוג מחלקת הסיווג.", xrefs: ["table:MCH1", "table:MCHA"] },
        { he: "בכתיבה תוכניתית: בדיקת RETURN ו-COMMIT מפורש, וסיווג בערוץ נפרד.", xrefs: ["bp:bapi-commit-discipline", "fm:BAPI_TRANSACTION_COMMIT"] },
      ],
      eccToS4: [
        { he: "מודל MCH1 ו-MCHA והסיווג זהים ב-ECC וב-S/4HANA לפי נושא המעבר של המאגר, שמסמן את ניהול האצוות כ'ללא שינוי'; חוויית המשתמש עוברת ל-Fiori ו-Batch Information Cockpit משופר.", xrefs: ["table:MCH1", "table:MCHA"] },
        { he: "רשימת הפישוט של S/4HANA 2025 FPS1 מציינת בפריט 'S4TWL - Logistics Batch Management' (רכיב LO-BM-MD) שהטרנזקציות MSC1, MSC2, MSC3 ו-MSC4 אינן זמינות ב-S/4HANA, ושיש להשתמש במקומן ב-MSC1N, MSC2N, MSC3N ו-MSC4N; ההשפעה העסקית שנרשמה שם היא 'No influence on the business process'.", xrefs: ["tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "tx:MSC4N"] },
        { he: "בצד ה-API: שירות ה-OData Batch Master Record (API_BATCH_SRV) מתועד ב-2025 FPS01 לקריאה, יצירה ועדכון של אצוות ושל נתוני הסיווג; אף עמוד רשמי שנסרק ברשומת האימות אינו נוקב בשם BAPI_BATCH_CREATE.", xrefs: ["fm:BAPI_BATCH_CREATE"] },
        { he: "תנועות החומר הנושאות את האצווה עוברות ב-S/4HANA ל-MATDOC, וקריאה ישירה צריכה לעבור דרך תצוגות תאימות.", xrefs: ["bp:matdoc-read-through-compatibility", "cds:I_MaterialDocumentItem"] },
        { he: "מזהה ה-Fiori שבמאגר לאפליקציית Manage Batches (F1576) סותר את התיעוד הרשמי, שבו האפליקציה נושאת App ID F2462.", xrefs: ["fiori:F1576"] },
      ],
      migration: [
        { he: "אובייקט ההגירה הרשמי 'Batch unique at material and client level' שולף את נתוני האצווה מטבלת MCH1 ומעביר אותם למערכת היעד.", xrefs: ["table:MCH1"] },
        { he: "MCH1 ו-MCHA נשמרים בהמרה; בדיקת QA לפי המאגר: יצירת אצווה, סיווג, קביעת אצווה ותוקף לאחר ההמרה.", xrefs: ["table:MCHA"] },
        { he: "לפני ההסבה לברר את רמת האצווה בפועל, כי היא קובעת את טבלת האב ואת סוג מחלקת הסיווג." },
      ],
      reference: {
        title: "Batch Level | Batch Management (LO-BM) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/b6fdb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד ההגדרה היסודית של תהליך ניהול האצוות: רמת האצווה ובחירתה בהגדרות (אומת ברשומת table:MCH1). " +
          "פריט SAP Best Practices (Scope Item) לתהליך לא אותר ואינו נרשם.",
      },
    },
    xrefs: [
      "obj:batch", "table:MCH1", "table:MCHA", "table:MARA", "table:MARC", "table:RESB",
      "tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "tx:MSC4N", "tx:CL20N", "tx:CL24N", "tx:CL30N", "tx:CL6O",
      "tx:MB56", "tx:MB51", "tx:MM02", "tx:COGI", "tx:COR6N",
      "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "fm:VB_BATCH_DETAIL_GET", "fm:BAPI_OBJCL_CREATE",
      "fiori:F1576", "cds:I_Batch", "enh:exit:SAPLV01Z",
      "bp:process-order-process", "bp:process-industries-plan-to-produce",
      "bp:bapi-commit-discipline", "bp:matdoc-read-through-compatibility",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'ניהול אצוות' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "זרימת התהליך: אב אצווה (MSC1N), סיווג מאפיינים, קביעת אצווה, מעקב ושחרור, גזירת אצווה; טבלאות MCHA, " +
          "MCH1, MCHB, AUSP, INOB; טרנזקציות MSC1N עד MSC4N ו-CL20N; המאגר מציין MCH1 ברמת חומר, MCHA ברמת " +
          "אצווה ו-MCHB ברמת מלאי, סיווג דרך AUSP ו-INOB, אסטרטגיית קביעה לפי תנאי בחירה ומיון, וגזירת אצווה " +
          "המעבירה מאפיינים בין רמות BOM; תקלות: אצווה לא נקבעת, מאפיין חסר.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-batch-management",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'ניהול אצוות' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "דיאגרמת השלבים: הפעלת ניהול אצוות באב החומר, יצירת אצווה (MSC1N או בקבלת תוצר), סיווג ומאפיינים, " +
          "קביעת אצווה בצריכה, מעקב, תוקף וחסימה; נתוני אב: סימון ניהול אצוות, מחלקת אצווה 023, מאפייני תוקף " +
          "ויצרן, פרופיל מספור אצווה ואסטרטגיית קביעה; פונקציות BAPI_BATCH_CREATE, BAPI_BATCH_GET_DETAIL, " +
          "VB_BATCH_DETAIL_GET; תקריות: אצווה לא נוצרה, קביעה נכשלה, תוקף שגוי; הגירה: MCH1 ו-MCHA נשמרים " +
          "ובדיקת יצירה, סיווג, קביעה ותוקף לאחר ההמרה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-batch-management",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'ייצור ומעקב אצוות מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "השלבים: הפעלת ניהול אצוות ומחלקת אצווה (MM02), יצירת אצווה אוטומטית בקבלת תוצר מפקודת תהליך (COR6N) " +
          "עם תאריך ייצור ותפוגה, סיווג מאפיינים (MSC2N), קביעת אצווה אוטומטית בצריכה ובמכירה (CL30N) ומעקב " +
          "שימוש קדימה ואחורה (MB56); הטעויות השכיחות: ניהול אצוות לא מופעל, פרופיל מספור אצווה חסר, מאפיין " +
          "חובה ריק, מנגנון מעקב השימוש לא מופעל.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pppi-batch-traceability",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'ניהול אצוות' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: אצוות ב-MCH1 ו-MCHA, קביעת אצווה וסיווג, טרנזקציות MSC1N עד MSC3N. S/4HANA: מודל זהה ברובו, " +
          "נוספים Fiori ו-CDS וקביעת האצווה ללא שינוי מהותי; ההשפעה מינימלית, עם תשומת לב לאורך מספר האצווה " +
          "ולסיווג. הרשומה מסמנת את הנושא כ'ללא שינוי' ומציינת שהוא מרכזי בייצור תהליכי.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#batch-management-s4",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט (F1576) ורשומת האימות המקבילה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המאגר רושם את Manage Batches כ-F1576 (תפקיד SAP_BR_WAREHOUSE_CLERK, קטלוג SAP_LO_BC_BATCH, תצוגת " +
          "CDS I_Batch, טרנזקציות MSC1N / MSC2N / MSC3N, טבלאות MCH1 ו-MCHA). רשומת האימות fiori:F1576 קובעת " +
          "שכל המקורות הרשמיים שנמצאו נוקבים באפליקציה במזהה F2462, שהמזהה F1576 לא נמצא באף רשומה רשמית, ושהוא " +
          "נשמר רק משום שזהו מזהה היקום של הפרויקט; F2462 רשום שם ככינוי.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F1576",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האובייקט העסקי 'אצווה' של הפרויקט ותיקון FIX-8c של ביקורת העיצוב",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת obj:batch מאגדת את MCH1, MCHA, MSC1N, MSC2N, MSC3N, BAPI_BATCH_CREATE, BAPI_BATCH_GET_DETAIL, " +
          "I_Batch ו-F1576. אובייקט ה-BOR של BAPI_BATCH_CREATE תוקן ב-2026-09-21 מ-BUS1001_BATCH ל-BUS1001002 " +
          "לפי העמוד הרשמי Reference Objects · Production Planning and Control (2025.001), שבסניפט שלו 'BUS1001 " +
          "Material BUS1001002 Batch'; התיקון רשום כ-FIX-8c.",
        verificationLevel: "repository_verified",
        repoRef: "audit/ux-2026-09/SAP-FIXES.md#FIX-8c",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: batch-determination-fail, char-batch-classification-missing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "קביעת אצווה נכשלת כשאסטרטגיית הקביעה אינה מוגדרת, כשמאפייני הבחירה אינם תואמים, כשכלל המיון שגוי או " +
          "כשהאצוות חסומות או פגות תוקף; ערכי מאפיין חסרים באצווה מונעים בחירה והערכה נכונה, ויש להזין אותם " +
          "ב-MSC2N ולשייך את האצווה למחלקה מסוג 023. הבדיקה ב-MSC3N, ב-CL30N וב-CL6O.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#batch-determination-fail",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של ההרחבה SAPLV01Z בפרויקט (ENHANCEMENT overlay)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת האימות קובעת שהתיעוד הרשמי של 2025 FPS01 נוקב בהרחבה SAPLV1ZN עם רכיב ה-Exit " +
          "EXIT_SAPLV01Z_014, שתפקידו סיווג אצווה ואכלוס שדות אב האצווה בקבלת טובין ולא קביעת אצווה; ה-BAdI " +
          "שהתיעוד נוקב בו לקביעת אצווה הוא VB_BD_SELECTION, ולהצעת כמות בקביעה LOBM_BATCH_DET_QTY_PROPOSAL. " +
          "השם VB_BD_BATCH_DETERMINATION המופיע ברשומות אחרות של המאגר לא נמצא באף רשומת SAP Help, ולכן אינו " +
          "מקושר כאן.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/enhancements.ts#enh:exit:SAPLV01Z",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch Level | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/b6fdb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_BATCH,
        claim:
          "עמוד 'Batch Level' של ניהול האצוות (LO-BM) בגרסת 2025 FPS01 מגדיר את שתי הרמות שאינן רמת מפעל: " +
          "'Material level The batch number is unique in all plants in connection with the material', ו-'Client " +
          "level The batch number is unique in the whole client'. הרמה נבחרת בהגדרות ('You choose the batch " +
          "level in Customizing for Batch Management'), ומעבר מרמת מפעל לרמת חומר מותנה בכך שהחומר מנוהל " +
          "באצוות בכל המפעלים (אומת ברשומת table:MCH1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Specifications in the Classification System | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/18ffb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_BATCH,
        claim:
          "העמוד קובע שני סוגי מחלקות סיווג לאצווה לפי רמת הניהול: 'There are two class types of the category " +
          "Batch for batches and their materials: 022 at plant level 023 at client or material level', ומוסיף " +
          "'You can assign only one class of the class type Batch (022, 023) to each material. This means that " +
          "multiple classifications are not possible' (אומת ברשומת table:MCH1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch unique at material and client level | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/69c0e330e1af46a5b8920db0b83a3b6b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_BATCH,
        claim:
          "אובייקט ההגירה 'Batch unique at material and client level' בתיעוד ה-Data Migration של S/4HANA 2025 " +
          "FPS01 שולף את נתוני האצווה מהטבלה MCH1: 'For the relevant materials, this migration object " +
          "automatically selects all batch data unique at the material and client levels from the MCH1 table' " +
          "(אומת ברשומת table:MCH1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch Master Record | APIs for Logistics Cross Topics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1841426f60f4e50913ec9a64aba8332/48b3c2ac60154137bb1d6411c7047e16.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM,
        claim:
          "עמוד השירות Batch Master Record במדריך APIs for Logistics Cross Topics לגרסת On-Premise 2025 FPS01 " +
          "נוקב בשם הטכני כלשונו: 'Batch Master Record Technical name: API_BATCH_SRV This service enables you " +
          "to retrieve batches and their classification data', ומוסיף 'In addition, batches and classification " +
          "data can be created and updated'. מבנה השירות: 'The batch itself is modelled in the entity Batches " +
          "(Batch), Plant-specific Batch Information (BatchPlant), and Batch Texts (BatchText)'. הסניפטים אינם " +
          "נוקבים בשם מודול פונקציה כלשהו (אומת ברשומת fm:BAPI_BATCH_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.8 S4TWL - Logistics Batch Management (LO-BM-MD, pp. 104-105)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_FM,
        claim:
          "פריט הפישוט של ניהול האצוות הלוגיסטי, 5.1.8 S4TWL - Logistics Batch Management תחת רכיב היישום " +
          "LO-BM-MD, עוסק בטרנזקציות בלבד: 'The following transactions related to Logistics Batch Management " +
          "are not available in SAP S/4HANA, on-premise edition 1511: MSC1, MSC2, MSC3 and MSC4', המקבילות " +
          "הפונקציונליות הן MSC1N Create Batch, MSC2N Change Batch, MSC3N Display Batch ו-MSC4N Display Change " +
          "Documents for Batch, וההשפעה העסקית היא 'No influence on the business process'. חיפוש טקסט מלא על " +
          "המחרוזות 'BAPI_BATCH' ו-'BATCH_CREATE' מחזיר אפס מופעים בכל המסמך (אומת ברשומת fm:BAPI_BATCH_CREATE).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (Production Planning with SAP S/4HANA), פרק 10 'Batch Management'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את רמת האצווה וניהול הסטטוס (10.2), נתוני האב והסיווג (10.3), התהליכים העסקיים של ניהול " +
          "האצוות (10.4), קביעת אצווה על כל שלביה, ובכללם פרוצדורת קביעה לפקודות תהליך וכללי מיון (10.5), " +
          "בדיקה חוזרת ותאריכי תפוגה (10.6), גזירת אצווה (10.8), מעקב אצוות (10.9) ו-Batch Information Cockpit " +
          "(10.10); הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#10.5",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 5 בספריית הפרויקט (Quality Management with SAP S/4HANA), פרק 9 'Batch Management'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הפרק מתעד את אותו תהליך מזווית האיכות: רמת אצווה והקצאת מספר (9.2), הפעלת ניהול אצוות וסיווג באב " +
          "החומר (9.3), יצירה ושינוי של אב אצווה (9.4), קביעת אצווה ופרוצדורת הקביעה לפקודות תהליך (9.5), " +
          "בדיקה חוזרת ותאריכי תפוגה (9.6) ומעקב אצוות (9.9); הספר משמש כאן להפניית קריאה בלבד ואינו מקור " +
          "לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book5.json#9.5",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות table:MCH1, " +
      "fm:BAPI_BATCH_CREATE ו-fiori:F1576. שדה kpis הושמט במכוון: המאגר אינו מתעד מדדים לתהליך ניהול האצוות. " +
      "מזהה ה-Fiori F1576 נשמר כמזהה המאגר בלבד; רשומת האימות קובעת שהתיעוד הרשמי נוקב ב-F2462. הטבלאות MCHB, " +
      "AUSP, INOB, KSSK, KLAH, CABN ו-CHVW והטרנזקציות COB1, CU70 ו-BMBC מופיעות ברשומות המאגר אך אינן במילון " +
      "הפרויקט, ולכן הן נזכרות בטקסט בלבד. ה-BAdI VB_BD_BATCH_DETERMINATION שבמאגר לא נמצא במקור רשמי ואינו " +
      "מקושר; ה-BAdI שהתיעוד נוקב בו הוא VB_BD_SELECTION ואינו במילון הפרויקט. קיום מודול BAPI_BATCH_CREATE " +
      "ופרמטריו נשארים לאימות ב-SE37 לפי רשומת האימות. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ============================== process industries, end to end (P2P PI) */
  {
    slug: "process-industries-plan-to-produce",
    he: "תעשיות תהליכיות מקצה לקצה: מביקוש ותכנון ועד קבלת תוצרת והתחשבנות",
    en: "Process industries end to end: from demand and planning to goods receipt and settlement",
    module: "PP-PI",
    summary:
      "התהליך המלא של ייצור תהליכי: ניהול ביקוש, MRP, המרה לפקודת תהליך, שחרור ומרשם בקרה, ניפוק, אישור " +
      "ו-Backflush, קבלת תוצר לאצווה, סגירה טכנית, חישוב סטיות והתחשבנות. שלוש חוליותיו נפרטות ברשומות תהליך " +
      "נפרדות: פקודת התהליך, מתכון האב וגרסת הייצור, וניהול האצוות.",
    context:
      "זרימת התהליך המאומתת של המאגר מחלקת את התהליך לשלושה שלבים: תכנון (דרישות עצמאיות מתוכננות ב-MD61 " +
      "ו-MRP ב-MD01N), ביצוע (COR1 עד קבלת תוצר ו-TECO) והתחשבנות (חישוב סטיות ב-KKS1 והתחשבנות ב-CO88). " +
      "מפת התהליך 'תכנון לייצור' של המאגר מצמידה לכל שלב תקריות בדיקה. לפי רשומות המעבר, מודל הנתונים של " +
      "הפקודה, המתכון והאצווה נשאר זהה ב-S/4HANA, והשינויים המרכזיים הם MRP Live, aATP, דרישת גרסת הייצור " +
      "כמקור אספקה יחיד, מעבר תנועות החומר ל-MATDOC, וההתחשבנות ל-ACDOCA עם Material Ledger.",
    steps: [
      {
        he: "ניהול ביקוש: להזין דרישות עצמאיות מתוכננות (PIR) בגרסה פעילה ב-MD61; גרסה שאינה פעילה אינה מוזנת ל-MRP.",
        xrefs: ["tx:MD61", "tx:MD62"],
      },
      {
        he: "להריץ MRP (MRP Live) ב-MD01N: נוצרות הזמנות מתוכננות לייצור ודרישות רכש לחומרים נרכשים; מצב המלאי והדרישות נקרא ב-MD04 וקובץ התכנון ב-MD21.",
        xrefs: ["tx:MD01N", "tx:MD04", "tx:MD21", "tx:MD01"],
      },
      {
        he: "לוודא שלכל חומר מיוצר קיימת גרסת ייצור תקפה: ב-S/4HANA היא מקור האספקה היחיד, ובלעדיה ההמרה לפקודה אינה אפשרית.",
        xrefs: ["table:MKAL", "tx:C223", "bp:master-recipe-process"],
      },
      {
        he: "להמיר את ההזמנה המתוכננת לפקודת תהליך (COR8 או COR1) ולשחרר אותה ב-COR2 עם בדיקת זמינות.",
        xrefs: ["tx:COR8", "tx:COR1", "tx:COR2", "bp:process-order-process"],
      },
      {
        he: "להעביר את הוראות התהליך לרצפת הייצור: מרשם בקרה ב-CO53 או גיליון PI ב-CO60, והודעות תהליך חוזרות דרך CO54.",
        xrefs: ["tx:CO53", "tx:CO60", "tx:CO54", "idoc:msg:LOIPRO"],
      },
      {
        he: "לנפק רכיבים (261), לדווח ביצוע (COR6N) ולתת ל-Backflush לצרוך את הרכיבים; לסרוק את COGI מיד אחרי כל דיווח.",
        xrefs: ["tx:MIGO", "tx:COR6N", "tx:COGI", "table:AFRU", "table:RESB"],
      },
      {
        he: "לקלוט את התוצר (101) אל אצווה חדשה עם סיווג ותוקף, ולוודא שקביעת האצווה פעלה כמתוכנן בצריכה.",
        xrefs: ["table:MCH1", "table:MCHA", "bp:batch-management-process"],
      },
      {
        he: "לסגור טכנית את הפקודה (TECO) רק אחרי שרזרבציות פתוחות נסגרו ו-COGI נוקה.",
        xrefs: ["tx:CO46", "tx:MB26", "fm:BAPI_PROCORD_COMPLETE_TECH"],
      },
      {
        he: "לחשב סטיות (KKS1 או KKS2) על בסיס עלות תקן משוחררת, ולהתחשבן (CO88) לרישום ב-ACDOCA.",
        xrefs: ["tx:KKS1", "tx:KKS2", "tx:CO88", "tx:CK24", "table:COBRB", "table:ACDOCA"],
      },
      {
        he: "לקרוא את התוצאה בשכבת האנליטיקה: COOIS ו-COOISPI למערכת המידע של ההזמנות, COHV ו-COHVPI לעיבוד המוני, ותצוגות CDS ב-S/4HANA.",
        xrefs: ["tx:COOIS", "tx:COOISPI", "tx:COHV", "tx:COHVPI", "cds:I_ProductionOrder"],
      },
    ],
    antiPatterns: [
      "הרצת התהליך בלי לוודא מראש גרסת ייצור תקפה לכל חומר מיוצר: החוליה הזו עוצרת את MRP Live ואת יצירת הפקודה.",
      "התעלמות מ-COGI בין דיווח לסגירה: שאריות צריכה נשארות מחוץ לעלות הפקודה.",
      "סגירה טכנית בעוד רזרבציות פתוחות: ה-MRP ממשיך לתכנן עליהן.",
      "קריאה ישירה של MSEG או MKPF בדוחות ובממשקים אחרי המעבר ל-S/4HANA, במקום קריאה דרך תצוגות תאימות.",
      "התחשבנות בלי עלות תקן משוחררת ובלי Material Ledger פעיל וסגור: העלות בפועל אינה זורמת נכון ל-ACDOCA.",
    ],
    checks: [
      "חיובי: מחזור מלא מ-PIR דרך MRP, פקודה, מרשם בקרה, אישור, קבלת תוצר לאצווה ועד התחשבנות עובר מקצה לקצה.",
      "שלילי: חומר בלי גרסת ייצור תקפה נעצר בשלב ההמרה לפקודה.",
      "אינטגרציה: הוראות התהליך מגיעות לרצפת הייצור וההודעות החוזרות מעדכנות את הפקודה.",
      "אינטגרציה: התוצר מתקבל לאצווה עם מאפיינים ותוקף, והאצווה נבחרת בצריכה לפי כלל המיון.",
      "רגרסיה: אחרי ההמרה ל-S/4HANA, דוחות התנועות מחזירים נתונים דרך תצוגות התאימות ולא מקריאה ישירה.",
      "פיננסי: הסטיות מחושבות וההתחשבנות נרשמת ל-ACDOCA בלי שגיאות תקופה או כלל התחשבנות.",
    ],
    process: {
      purpose:
        "לחבר את שרשרת התכנון והביצוע של התעשייה התהליכית לתהליך אחד שניתן לבדוק מקצה לקצה: מביקוש מתוכנן, " +
        "דרך תכנון היצע, ביצוע בפועל ומעקב אצוות, ועד לעלות סופית לתוצר וסגירה פיננסית.",
      trigger: [
        { he: "תחזית או תכנית מכירות שמתורגמת לדרישות עצמאיות מתוכננות בגרסה פעילה.", xrefs: ["tx:MD61", "tx:MD62"] },
        { he: "הזמנת לקוח או דרישת מלאי הנקלטת בתכנון לפי אסטרטגיית התכנון של החומר.", xrefs: ["tx:MD04"] },
      ],
      preconditions: [
        { he: "נתוני אב שלמים: אב חומר עם תצוגות MRP ו-Work Scheduling, עץ מוצר, מתכון אב ומשאבים.", xrefs: ["table:MARC", "table:MAST", "table:PLKO", "table:CRHD"] },
        { he: "גרסת ייצור תקפה לכל חומר מיוצר, כמקור האספקה ב-S/4HANA.", xrefs: ["table:MKAL", "bp:master-recipe-process"] },
        { he: "ניהול אצוות מופעל ומסווג לחומרים שנדרש להם מעקב.", xrefs: ["bp:batch-management-process", "table:MCH1"] },
        { he: "סוג פקודה, פרופיל התחשבנות וכלל התחשבנות מוגדרים, ועלות תקן משוחררת לתקופה.", xrefs: ["table:COBRB", "tx:CK24"] },
      ],
      masterData: [
        { he: "אב חומר ותצוגותיו, עץ מוצר ומתכון אב.", xrefs: ["table:MARA", "table:MARC", "table:MAST", "table:PLKO", "table:PLPO"] },
        { he: "גרסת ייצור המקשרת עץ מוצר ומתכון לתוקף ולטווח כמות.", xrefs: ["table:MKAL", "cds:I_ProductionVersion"] },
        { he: "משאבים עם קיבולת, נוסחאות ושיוך עלות.", xrefs: ["table:CRHD", "table:CRCA", "table:KAKO"] },
        { he: "אב אצווה ומחלקת האצווה עם מאפייניה.", xrefs: ["table:MCH1", "table:MCHA", "cds:I_Batch"] },
      ],
      roles: [
        { he: "מפעיל ייצור תהליכי: לפי רשומות ה-Fiori של המאגר, Manage Process Orders ו-Confirm Process Order משויכות לתפקיד SAP_BR_PRODN_OPERATOR_PROC.", xrefs: ["fiori:F3577", "fiori:F3364"] },
        { he: "פקיד מחסן: לפי אותן רשומות, Manage Batches ו-Post Goods Movement משויכות לתפקיד SAP_BR_WAREHOUSE_CLERK. התפקידים והקטלוגים לא אוששו במקור SAP רשמי ברשומות האימות.", xrefs: ["fiori:F1576", "fiori:F0843"] },
      ],
      transactions: [
        { he: "תכנון: MD61 ו-MD62 לדרישות עצמאיות, MD01N ו-MD01 להרצת MRP, MD04 למצב מלאי ודרישות, MD21 לקובץ התכנון.", xrefs: ["tx:MD61", "tx:MD62", "tx:MD01N", "tx:MD01", "tx:MD04", "tx:MD21"] },
        { he: "ביצוע: COR8 המרה, COR1 עד COR3, COR6N ו-CORK דיווח, CO53 ו-CO60 ניהול תהליך, MIGO תנועות, COGI תיקון תנועות שנכשלו.", xrefs: ["tx:COR8", "tx:COR1", "tx:COR2", "tx:COR3", "tx:COR6N", "tx:CORK", "tx:CO53", "tx:CO60", "tx:MIGO", "tx:COGI"] },
        { he: "אצוות: MSC1N עד MSC3N, CL30N לקביעה, MB56 למעקב שימוש.", xrefs: ["tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "tx:CL30N", "tx:MB56"] },
        { he: "סגירה ועלות: CO46 לפערי צריכה, CK11N ו-CK24 לעלות תקן, KKS1 ו-KKS2 לסטיות, CO88 להתחשבנות.", xrefs: ["tx:CO46", "tx:CK11N", "tx:CK24", "tx:KKS1", "tx:KKS2", "tx:CO88"] },
        { he: "אנליטיקה ועיבוד המוני: COOIS, COOISPI, COHV, COHVPI.", xrefs: ["tx:COOIS", "tx:COOISPI", "tx:COHV", "tx:COHVPI"] },
      ],
      tables: [
        { he: "תכנון: טבלאות ה-PIR, קובץ התכנון וההזמנות המתוכננות (PBIM, PBED, MDKP, MDVM, PLAF) מופיעות ברשומות המאגר אך אינן במילון הפרויקט." },
        { he: "ביצוע: AUFK, AFKO, AFPO, AFVC, AFFL, RESB ו-AFRU.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:AFFL", "table:RESB", "table:AFRU"] },
        { he: "נתוני אב: PLKO, PLPO, MAPL, MKAL, MAST, STKO, MARA, MARC.", xrefs: ["table:PLKO", "table:PLPO", "table:MAPL", "table:MKAL", "table:MAST", "table:STKO", "table:MARA", "table:MARC"] },
        { he: "אצוות ותנועות: MCH1, MCHA, ובצד התנועות MSEG ו-MKPF ב-ECC מול MATDOC ב-S/4HANA (MATDOC אינה במילון הפרויקט).", xrefs: ["table:MCH1", "table:MCHA", "table:MSEG", "table:MKPF", "obj:material-document"] },
        { he: "עלות והתחשבנות: COSS, COSP, COBRB ו-ACDOCA; טבלאות ה-Material Ledger וה-Costing (CKMLPP, KEKO) אינן במילון הפרויקט.", xrefs: ["table:COSS", "table:COSP", "table:COBRB", "table:ACDOCA"] },
        { he: "האובייקטים העסקיים שהתהליך נוגע בהם.", xrefs: ["obj:process-order", "obj:batch", "obj:material-document"] },
      ],
      integrationPoints: [
        { he: "PP-PI אל MES: מרשם בקרה וגיליון PI החוצה, הודעות תהליך חזרה; IDoc LOIPRO להעברת מסלול או מתכון למערכת חיצונית.", xrefs: ["tx:CO53", "tx:CO54", "idoc:msg:LOIPRO"] },
        { he: "PP-PI אל MM: ניפוק רכיבים וקבלת תוצר במסמכי חומר, ודרישות רכש לחומרים נרכשים מתוך ריצת ה-MRP.", xrefs: ["obj:material-document", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "PP-PI אל QM: מאפייני בדיקה במתכון מייצרים בדיקה תוך כדי ייצור, והחלטת שימוש חוסמת או משחררת את האצווה.", xrefs: ["table:PLMK"] },
        { he: "PP-PI אל CO ו-FI: חישוב סטיות והתחשבנות אל ACDOCA, עם Material Ledger.", xrefs: ["tx:CO88", "table:ACDOCA"] },
        { he: "ממשקים תוכניתיים: משפחת BAPI של פקודת התהליך והדיווח, תנועות הסחורה, והאצוות.", xrefs: ["fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_BATCH_CREATE", "fm:BAPI_TRANSACTION_COMMIT"] },
      ],
      outputs: [
        { he: "תכנית היצע: הזמנות מתוכננות לייצור ודרישות רכש.", xrefs: ["tx:MD04"] },
        { he: "פקודות תהליך משוחררות עם מרשמי בקרה שנשלחו.", xrefs: ["obj:process-order", "tx:CO53"] },
        { he: "דיווחי ביצוע, תנועות חומר ואצוות תוצר עם סיווג ותוקף.", xrefs: ["table:AFRU", "table:MCH1"] },
        { he: "סטיות מסווגות ורישום התחשבנות ל-FI ול-CO.", xrefs: ["table:COBRB", "table:ACDOCA"] },
        { he: "שרשרת מעקב מלאה לאצווה, לשימוש באירוע איכות או בריקול.", xrefs: ["tx:MB56"] },
      ],
      exceptions: [
        { he: "אין הזמנות מתוכננות אחרי ריצת MRP: קובץ התכנון אינו מסמן את החומר, סוג ה-MRP אינו מתאים, אין דרישה או שהאופק קצר (תקרית mrp-no-planned-orders).", xrefs: ["tx:MD04", "tx:MD21"] },
        { he: "המרה לפקודה נכשלת בהיעדר גרסת ייצור תקפה (תקרית no-production-version).", xrefs: ["table:MKAL"] },
        { he: "מרשם בקרה לא נוצר בשחרור, או הודעות תהליך אינן נקלטות (תקריות process-order-no-control-recipe ו-process-message-not-sent).", xrefs: ["tx:CO53", "tx:CO54"] },
        { he: "תנועות Backflush תקועות ב-COGI, או אישור שנדחה בתקופת רישום סגורה (תקריות cogi-stuck ו-confirm-period-closed).", xrefs: ["tx:COGI", "tx:MMRV"] },
        { he: "סטיות חסרות בהיעדר עלות תקן משוחררת, או התחשבנות שנכשלת בהיעדר כלל או בתקופה סגורה (תקריות variance-missing ו-settlement-error).", xrefs: ["tx:CK24", "tx:OB52", "table:COBRB"] },
      ],
      controls: [
        { he: "בדיקה לפני התפעול: לכל חומר מיוצר גרסת ייצור תקפה ומתכון משוחרר.", xrefs: ["table:MKAL", "table:PLKO"] },
        { he: "ניקוי יומי של COGI, ובדיקת CO46 לפערי צריכה לפני סגירה טכנית.", xrefs: ["tx:COGI", "tx:CO46"] },
        { he: "שחרור עלות תקן לתקופה לפני חישוב הסטיות.", xrefs: ["tx:CK24", "tx:KKS2"] },
        { he: "הפרדת הרשאות בין שינוי הזמנה לשחרורה דרך אובייקט ההרשאה C_AFKO_REL, מגרסת S/4HANA 2022.", xrefs: ["tx:COR2"] },
        { he: "בכל ממשק כותב: בדיקת RETURN ו-COMMIT מפורש על אותו LUW.", xrefs: ["bp:bapi-commit-discipline", "fm:BAPI_TRANSACTION_COMMIT"] },
      ],
      kpis: [
        { he: "לפי רשומת התחום 'אנליטיקת ייצור' של המאגר: תפוקה (Yield), אחוז פסולת (Scrap), זמן מחזור (Lead Time) וניצולת (OEE).", xrefs: ["table:AFRU"] },
        { he: "עומס וקיבולת: השוואת דרישת הקיבולת מהפקודות מול הקיבולת הזמינה של המשאבים, לפי רשומת התחום 'תכנון קיבולת'.", xrefs: ["table:KAKO", "table:CRCA"] },
        { he: "סטיות מול עלות תקן, כפי שהן מחושבות ומותחשבנות בסוף המחזור.", xrefs: ["tx:KKS1", "tx:CO88"] },
      ],
      eccToS4: [
        { he: "מחזור הייצור התהליכי זהה לוגית ב-ECC וב-S/4HANA לפי מדריך התהליך של המאגר; מודל AUFK / AFKO / AFPO ו-PLKO / PLPO ו-MCH1 / MCHA נשמר.", xrefs: ["table:AUFK", "table:PLKO", "table:MCH1"] },
        { he: "השינויים שהמאגר מונה: MRP Live בתכנון, aATP בשחרור, שירותי OData ואפליקציות Fiori, והעלויות אל ACDOCA עם Material Ledger.", xrefs: ["table:ACDOCA"] },
        { he: "גרסת הייצור: לפי התיעוד הרשמי היא מקור האספקה היחיד לחומרים המיוצרים ב-S/4HANA.", xrefs: ["table:MKAL"] },
        { he: "תנועות החומר: MKPF ו-MSEG מאוחדות ל-MATDOC, והקריאה עוברת דרך תצוגות תאימות (ראו שיטת הקריאה דרך תאימות MATDOC); פריט הפישוט הנקוב במאגר הוא מודל הנתונים של ניהול המלאי (MM-IM).", xrefs: ["bp:matdoc-read-through-compatibility", "table:MKPF", "table:MSEG", "cds:I_MaterialDocumentItem"] },
        { he: "מזהי ה-Fiori שבמאגר לשלוש החוליות (F3577, F3364, F1576) סותרים את התיעוד הרשמי לפי רשומות האימות; המזהים המתועדים (F4587, F5323, CORK, F2462) אינם במילון הפרויקט.", xrefs: ["fiori:F3577", "fiori:F3364", "fiori:F1576"] },
      ],
      migration: [
        { he: "אובייקטי ההגירה הרשמיים לאורך התהליך: Master recipe (PP_MSTRRCP), PP - Production version, PP - Process order (only open PO) ו-Batch unique at material and client level.", xrefs: ["tx:C203", "tx:COR3", "table:MKAL", "table:MCH1"] },
        { he: "לפי מדריך התהליך של המאגר, בדיקת ה-QA לאחר ההמרה היא מחזור מלא: MRP, פקודה, אישור, קבלת תוצר והתחשבנות.", xrefs: ["tx:MD01N", "tx:COR1", "tx:COR6N", "tx:CO88"] },
        { he: "נקודות הכשל שהמאגר מסמן להמרה: גרסאות ייצור חסרות, יעדי מרשם בקרה שאינם מוגדרים, קוד שקורא ישירות את MSEG, ו-Material Ledger שאינו פעיל או שלא נסגר.", xrefs: ["table:MSEG", "bp:matdoc-read-through-compatibility"] },
        { he: "אזהרת המרה למתכונים: יעדי מרשם בקרה מסוג 1 מוחלפים בסוג X או בסוג 4 לפי פריט הפישוט 'S4TWL - ABAP-List-Based PI-Sheets'.", xrefs: ["bp:master-recipe-process"] },
      ],
      reference: null,
    },
    xrefs: [
      "obj:process-order", "obj:batch", "obj:material-document",
      "table:AUFK", "table:AFKO", "table:AFPO", "table:AFRU", "table:RESB", "table:MKAL", "table:PLKO", "table:PLPO",
      "table:MCH1", "table:MCHA", "table:ACDOCA", "table:COBRB",
      "tx:MD61", "tx:MD01N", "tx:MD04", "tx:COR1", "tx:COR2", "tx:COR6N", "tx:CO53", "tx:COGI", "tx:CO88", "tx:KKS1",
      "fiori:F3577", "fiori:F3364", "fiori:F1576", "fiori:F0843",
      "fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_BATCH_CREATE",
      "idoc:msg:LOIPRO", "cds:I_Batch", "cds:I_ProductionVersion", "cds:I_MaterialDocumentItem",
      "bp:process-order-process", "bp:master-recipe-process", "bp:batch-management-process",
      "bp:matdoc-read-through-compatibility", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "זרימת התהליך המאומתת של PP-PI בפרויקט (PPPI_PROCESS_FLOW), שלושת השלבים",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שנים עשר שלבים בשלושה שלבי על: תכנון (s1 דרישות עצמאיות מתוכננות ב-MD61, s2 MRP ב-MD01N), ביצוע (s3 " +
          "יצירת פקודה, s4 שחרור ובדיקת זמינות, s5 מרשם בקרה וגיליון PI, s6 ניפוק 261, s7 אישור, s8 Backflush, " +
          "s9 קבלת תוצר 101 לאצווה, s10 סגירה טכנית) והתחשבנות (s11 חישוב סטיות ב-KKS1, s12 התחשבנות ב-CO88 " +
          "לרישום ב-ACDOCA). לכל שלב רשומות טבלאות, טרנזקציה, פלט והטעויות השכיחות.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-process-flow.ts#planning",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'תכנון לייצור' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שישה שלבים עם הטרנזקציות, הטבלאות, הממשקים והתקריות שלהם: ניהול ביקוש (MD61, MD62), MRP (MD01N, " +
          "MD04; תקריות mrp-no-planned-orders ו-no-production-version), פקודת ייצור או תהליך (CO01, COR1; " +
          "ממשקים API_PROCESS_ORDER_2_SRV ו-IDoc LOIPRO), ביצוע ואישור (CO11N, COR6N, COGI), קבלת תוצר לאצווה " +
          "(MIGO, MB31) והתחשבנות עם סטיות (KKS2, CO88; תקריות settlement-error ו-variance-missing).",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#plan-to-produce",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'ייצור למלאי תהליכי מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הבלוק eccS4 של המדריך קובע: מחזור הייצור התהליכי זהה; השינויים ב-S/4HANA הם MRP Live, aATP, שירותי " +
          "OData ו-Fiori, והעלויות אל ACDOCA עם Material Ledger; פריטי הפישוט הנקובים הם MRP Live, Material " +
          "Ledger ו-MATDOC; בדיקת ההמרה היא מחזור מלא מ-MRP דרך פקודה, אישור וקבלת תוצר ועד התחשבנות. " +
          "הטעויות השכיחות: דרישה עצמאית בגרסה לא פעילה, אין גרסת ייצור תקפה, יעד מרשם בקרה שאינו מוגדר, " +
          "Backflush בלי מלאי, עלות תקן שלא שוחררה.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pppi-mts-process-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחומים של PP-PI בפרויקט: תכנון, MRP, פקודות תהליך, אישורים, אצוות, אינטגרציית MES, אנליטיקה וקיבולת",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומות התחומים מכסות את השרשרת: תכנון ביקוש ו-MRP (MRP Type, MD04, הזמנות מתוכננות המומרות ב-COR8), " +
          "פקודות תהליך (AUFK, AFKO, AFPO, AFVC, AFFL, RESB; סטטוסים CRTD עד CLSD), אישורים (AFRU, Backflush, " +
          "COGI), אצוות (MCH1, MCHA, קביעת אצווה), אינטגרציית MES (מרשם בקרה, גיליון PI, הודעות תהליך, IDoc " +
          "LOIPRO), אנליטיקת ייצור (COOIS, COHV והמדדים תפוקה, פסולת, זמן מחזור ו-OEE) ותכנון קיבולת (KAKO, " +
          "CRCA, CRHD).",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-production-analytics",
      },
      {
        sourceType: "repository",
        sourceTitle: "עץ ההגדרות של PP-PI בפרויקט (PPPI_CONFIG_TREE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העץ מתעד את אזורי ההגדרה לאורך התהליך: סוגי צו ופרמטרים (קטגוריה 40 לצו תהליכי, פרמטרים תלויי סוג " +
          "צו ב-COR4 עם סוג רשימת משימות 2, פרופיל התחשבנות), קונפיגורציית MRP, עץ מוצר, מתכון אב ומסלול, " +
          "מרכז עבודה ומשאב, גרסת ייצור (חובה ב-S/4HANA), ניהול אצוות (רמת אצווה, יצירת אצווה בייצור, " +
          "פרוצדורת חיפוש אצווה), בדיקת זמינות, תזמון, אישור ו-Backflush, מרשם בקרה וגיליון PI, ותמחיר " +
          "והתחשבנות. הטבלה הנושאת את פרמטרי סוג הצו היא T399X.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-config-tree.ts#order-type-parameters",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין ההשפעה של S/4HANA בפרויקט (S4_IMPACT) ורשימת הטבלאות היציבות",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת MATDOC קובעת ש-MKPF ו-MSEG מאוחדות ל-MATDOC ושמלאי מחושב בזמן ריצה, ושקוד הקורא או כותב " +
          "ישירות ל-MKPF או ל-MSEG דורש בדיקה; רשומת ACDOCA קובעת ש-FI ו-CO מאוחדים ליומן אחד; רשומת MCH1 " +
          "קובעת שאב האצווה ללא שינוי מהותי במודל וניהול האצוות תואם, בסיכון נמוך. הקבוצה S4_STABLE מונה בין " +
          "הטבלאות היציבות את AFKO, AFPO, AFVC, AFRU, AUFK, JEST, JSTO, PLKO, PLPO, MAPL, MARC, STKO, STPO " +
          "ו-MAST.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט לאורך התהליך: mrp-no-planned-orders, no-production-version, cogi-stuck, settlement-error, variance-missing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MRP אינו יוצר הזמנות מתוכננות כשקובץ התכנון אינו מסמן את החומר, סוג ה-MRP אינו מתאים, אין דרישה, " +
          "האופק קצר או שהחומר לא הורחב למפעל; יצירת פקודה נכשלת בהיעדר גרסת ייצור תקפה; תנועות Backflush " +
          "נתקעות ב-COGI מחוסר מלאי, אצווה או תקופה פתוחה; ההתחשבנות נכשלת בהיעדר כלל התחשבנות או בתקופה " +
          "סגורה; הסטיות אינן מחושבות בהיעדר עלות תקן משוחררת או Target Cost Version.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#mrp-no-planned-orders",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a Process Order | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/4671c13d2e5e498eb6978ed5ca6cb870.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX,
        claim:
          "'Alternatively, you can use the transaction COR1 to create process order.' COR1 מתועדת כזמינה ליצירת " +
          "הזמנת תהליך בתיעוד SAP S/4HANA 2025 FPS01 (אומת ברשומת tx:COR1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Constraints in PEO-ERP Integration | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/aa0c4f53e6df4a2c9cf87891bb39a909.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_MKAL,
        claim:
          "התיעוד הרשמי קובע, תחת 'Full SAP S/4HANA Solution': ב-SAP S/4HANA 'the production version is the " +
          "only source of supply for manufactured materials' (אומת ברשומת table:MKAL).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch Level | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/b6fdb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_BATCH,
        claim:
          "עמוד 'Batch Level' של ניהול האצוות (LO-BM) בגרסת 2025 FPS01 קובע שהרמה נבחרת בהגדרות ('You choose " +
          "the batch level in Customizing for Batch Management'), ומגדיר את רמת החומר ואת רמת הלקוח " +
          "('Material level The batch number is unique in all plants in connection with the material'; 'Client " +
          "level The batch number is unique in the whole client') (אומת ברשומת table:MCH1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Order Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/fc8dbf5e46004f1c9069b6ac4301c384.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM,
        claim:
          "עמוד השירות במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01 קובע בסניפט: 'Process Order " +
          "Confirmation Technical name: API_PROC_ORDER_CONFIRMATION_2_SRV This service enables you to process " +
          "confirmations for process orders, namely time ticket and time event confirmations for ... operations " +
          "of process orders and confirmations on order level' (אומת ברשומת fm:BAPI_PROCORDCONF_CREATE_TT).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (Production Planning with SAP S/4HANA), פרקים 4, 7, 10, 12 ו-13",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הספר מכסה את שרשרת התהליך בפרקים נפרדים: הגדרות הייצור התהליכי (פרק 4, ובו ניהול תהליך, הודעות " +
          "תהליך, קטגוריות הוראת תהליך ומרשם בקרה או גיליון PI), תכנון הייצור התהליכי (פרק 7, ובו נתוני האב, " +
          "ניהול התהליך וביצוע פקודת התהליך), ניהול אצוות (פרק 10), ניהול ביקוש (פרק 12) ותכנון דרישות חומר " +
          "(פרק 13); הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#7.1",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך מקצה לקצה: היא מחברת את שלוש רשומות התהליך האחרות של הקובץ ואינה חוזרת על פרטיהן. כל שדה " +
      "בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:COR1, table:MKAL, table:MCH1 " +
      "ו-fm:BAPI_PROCORDCONF_CREATE_TT. שדה reference נכתב כ-null במכוון: לא אותר באף רשומת אימות של הפרויקט " +
      "עמוד SAP רשמי המתאר את התהליך התעשייתי מקצה לקצה כיחידה אחת, ופריט SAP Best Practices (Scope Item) לא " +
      "אותר ואומת. הטבלאות PBIM, PBED, MDKP, MDVM, PLAF, MATDOC, AFFW, CKMLPP ו-KEKO והטרנזקציות MB31 ו-CO11N " +
      "נזכרות ברשומות המאגר; מתוכן רק חלק נמצא במילון המזהים, והשאר מופיע בטקסט בלבד. מזהי ה-Fiori F3577, " +
      "F3364 ו-F1576 הם מזהי המאגר, ורשומות האימות מציינות שהתיעוד הרשמי נוקב ב-F4587, ב-F5323, ב-App ID CORK " +
      "וב-F2462, שאינם במילון הפרויקט. לא בוצעה בדיקה במערכת SAP חיה.",
  },
];
