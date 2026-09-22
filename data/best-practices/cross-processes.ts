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
   the page renders the gap by name. `kpis` is absent from all three records
   for exactly that reason. Nothing here asserts a new SAP fact. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";

/** accessedAt values copied from the overlay entries reused below. */
const DATE_TX_01 = "2026-09-01"; // data/verification/transactions.ts DATE
const DATE_TX_02 = "2026-09-02"; // data/verification/transactions.ts DATE2
const DATE_TX_07 = "2026-09-07"; // data/verification/transactions.ts DATE3
const DATE_FM_14 = "2026-09-14"; // data/verification/functions.ts DATE14
const DATE_TBL_15 = "2026-09-15"; // data/verification/tables.ts DATE4
const DATE_FM_21 = "2026-09-21"; // data/verification/functions.ts DATE21
const DATE_FM_22 = "2026-09-22"; // data/verification/functions.ts DATE22

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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים (PM ו-PP-PI). כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר " +
      "אומת ברשומות tx:IW41, ‏tx:COR6N, ‏fm:BAPI_ALM_CONF_CREATE, ‏fm:BAPI_PROCORDCONF_CREATE_TT ו-table:AFRU. " +
      "שדה kpis הושמט: המאגר אינו מתעד מדדי ביצוע לתהליך האישור, ומוטב פער גלוי על פני השלמה מהזיכרון. " +
      "הסתייגות על מזהי Fiori: המזהים F2730 ו-F3364 מגיעים מקטלוג הפרויקט בלבד. רשומת tx:IW41 קובעת ש-'Confirm " +
      "Jobs (F2730)' סותר את התיעוד הרשמי, שלפיו אפליקציית Confirm Jobs ‏(W0020) הוצאה משימוש ב-2022 ונמחקה " +
      "ב-2023, ושחלופת ה-Fiori המתועדת לטכנאי היא Perform Maintenance Jobs ‏(F5104A). רשומת tx:COR6N קובעת " +
      "שהמזהה F3364 לא אושש באף מקור רשמי, ושנתיב הדיווח המתועד ב-On-Premise הוא פעולת Confirm Process Order " +
      "Operation ‏(COR6N) באפליקציות F4587 ו-F5323, שאינן במילון הפרויקט; לכן F3364 נרשם כאן כרשומת קטלוג " +
      "ולא כחלופה רשמית. טבלת AFFW, טבלת כשלי ה-Backflush, אינה במילון הפרויקט ולכן מופיעה בפרוזה בלבד, " +
      "וכך גם MATDOC. לא בוצעה בדיקה במערכת SAP חיה.",
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים: תנועות הסחורה של תחזוקה ושל ייצור. כל שדה בפרופיל נגזר מרשומות המאגר " +
      "הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:MIGO, ‏tx:MB01, ‏fm:BAPI_GOODSMVT_CREATE " +
      "ו-fm:BAPI_GOODSMVT_GETITEMS. שדה kpis הושמט: המאגר אינו מתעד מדדי ביצוע לתהליך תנועות הסחורה. " +
      "הרשומה אינה משכפלת את השיטה bp:matdoc-read-through-compatibility אלא מקשרת אליה: שם מפורט הטיפול " +
      "בקוד הקורא MKPF ו-MSEG. הערות אימות: הטבלה MATDOC ומודול הפונקציה BAPI_GOODSMVT_CANCEL אינם במילון " +
      "הפרויקט ולכן מופיעים בפרוזה בלבד; לפי רשומת tx:MIGO, ‏'Post Goods Movement' הוא ב-Fiori יישום Web GUI " +
      "שקוד הטרנזקציה שלו MIGO, בעוד F0843 הוא Post Goods Receipt for Purchasing Document, ולכן ההפניה " +
      "ל-F0843 כאן היא לרשומת הקטלוג של הפרויקט ולא טענה שהיישום מחליף את MIGO. מספר ה-SAP Note ברשומת " +
      "ההשפעה מועתק מן המאגר ולא הוקלד מהזיכרון. לא בוצעה בדיקה במערכת SAP חיה.",
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
        { he: "תנועות ויתרות בסוף הרצף: יתרות מלאי, הזמנות רכש ומכירה פתוחות, פריטים פתוחים ותכנית תחזוקה.", xrefs: ["table:MARD", "table:MPLA", "table:MPOS"] },
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
        { he: "בצד התחזוקה: מיקום פונקציונלי וציוד כנתוני אב, ותכנית תחזוקה כאובייקט תנועתי המסומן במאגר כדורש אימות.", xrefs: ["table:IFLOT", "table:EQUI", "table:MPLA"] },
        { he: "בצד תעשיות התהליך: מתכון ייצור וגרסת ייצור, שהיא תנאי לתכנון ולפקודות ב-S/4HANA.", xrefs: ["table:PLKO", "table:MKAL"] },
        { he: "אחרי הטעינה: התאמה מול המקור, ואז בדיקות מחזור מלא בתהליכי הליבה.", xrefs: ["bp:confirmation-process", "bp:goods-movement-process"] },
      ],
      reference: {
        title: "PM - Maintenance notification | Data Migration (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד ה-Data Migration הרשמי לאובייקט ההגירה של הודעת התחזוקה (אומת ברשומת fm:BAPI_ALM_NOTIF_CREATE). " +
          "היקפו אובייקט הגירה אחד; עמוד רשמי יחיד המתאר את תהליך ההמרה כולו לא אותר בשכבות האימות, ולכן " +
          "יתר המקורות הרשמיים כאן הם רשימות הפישוט. פריט SAP Best Practices (Scope Item) לתהליך לא אותר " +
          "ואינו נרשם.",
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך רוחבית. גבולות הטענה: המתודולוגיה, רצף הטעינה, קריטריוני המוכנות ומימדי איכות הנתונים " +
      "הם אמירות של המאגר (data/migration-cockpit.ts, ‏data/s4-transformation.ts, ‏data/project-delivery.ts) " +
      "ולא ציטוט ממקור SAP רשמי; מרכז ההגירה מסמן במפורש כדורשי אימות את ההעברה הישירה ב-RFC, את מספרי " +
      "ה-SAP Notes, את אובייקט תכנית התחזוקה, את תכנית הבדיקה ואת אובייקטי ה-HR, ורשומה זו חוזרת על הסימון " +
      "במקום להסתירו. אף פריט SAP Best Practices (Scope Item) אינו נקוב כאן: המאגר מזכיר את המושג בלי מזהה " +
      "מאומת. המקורות הרשמיים היחידים הם פריטי הפישוט ועמוד ה-Data Migration: פריט תזמון תכניות התחזוקה " +
      "נושא את המספר 29.6 ברשימת 2023 FPS3 ואת המספר 4.1.2 ברשימת 2025 FPS1, ולכן הוא נקוב כאן בשמו " +
      "'S4TWL - Scheduling of Maintenance Plan' ולא במספר בלבד; אותו כלל חל על " +
      "'S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM' (פריט 27.6 ברשימת 2023 FPS3). הטבלה MATDOC, " +
      "הטרנזקציות LTMC ו-LTMOM ותוכניות RISTRA20 ו-RISTRA20H אינן במילון הפרויקט ולכן מופיעות בפרוזה בלבד. " +
      "הרשומה מקשרת אל bp:matdoc-read-through-compatibility ואל bp:maintenance-notification-process במקום " +
      "לשכפל אותן. שדה kpis הושמט: המאגר מתעד קריטריוני מוכנות משוקללים ולא מדדי ביצוע לתהליך ההגירה. לא " +
      "בוצעה בדיקה במערכת SAP חיה.",
  },
];
