/* Project NEO · best practices · CROSS PROCESS CATALOG part 2 (design-audit
   continuation §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with
   no loader.

   Three more processes that cross PM and PP/PP-PI: order settlement to CO,
   quality inspection during production, and material staging with
   reservations and goods issue to the order. Every line is copied or condensed
   from the named repository records (repoRef) or from an official SAP page that
   an existing overlay already verified (same source, same URL, same claim, same
   accessedAt); the only edit to a copied claim is punctuation, because this
   catalog writes no em dashes. A field the repository does not document is
   left out on purpose: the page renders the gap by name. `kpis` is absent from
   all three records for exactly that reason. Nothing here asserts a new SAP
   fact. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";

/** accessedAt values copied from the overlay entries reused below. */
const DATE_TBL_01 = "2026-09-01"; // data/verification/tables.ts, table:RESB
const DATE_TBL_02 = "2026-09-02"; // data/verification/tables.ts, table:RESB (APIs for Inventory)
const DATE_TBL_15 = "2026-09-15"; // data/verification/tables.ts, table:COBRA / COBRB / COSP / COSS
const DATE_FM_14 = "2026-09-14"; // data/verification/functions.ts DATE14 (fm:BAPI_GOODSMVT_CREATE)
const DATE_FM_22 = "2026-09-22"; // data/verification/functions.ts DATE22 (fm:BAPI_RESERVATION_CREATE1)

/* 2026-09-23: two more cross processes follow the first three, sales demand
   handed from SD to PP/PP-PI and procure-to-pay for a maintenance order.
   Stricter sourcing for these two: every repository evidence entry names ONE
   record (path#key) and its claim condenses that record only. Official
   entries are copied verbatim (url and claim) from the verification layer
   and keep its accessedAt: DATE_FM_22 for the fm:BAPI_PR_CREATE and
   fm:BAPI_REQUISITION_GETDETAIL pages, DATE_TBL_15 for the table:EBAN page
   (tables.ts DATE4, the same day). */
const DATE23 = "2026-09-23";

export const CROSS_PROCESS_PRACTICES_2: BestPracticeLike[] = [
  /* ============================================================== settlement */
  {
    slug: "order-settlement-process",
    he: "התחשבנות פקודות: העברת עלויות פקודת תחזוקה, פקודת ייצור והזמנת תהליך למקבלי CO",
    en: "Order settlement process: maintenance, production and process orders to CO receivers",
    module: "Cross",
    summary:
      "התחשבנות (Settlement) מעבירה את העלויות שנצברו בפקודה אל המקבל הסופי שנקבע בכלל ההתחשבנות: מרכז " +
      "עלות, נכס, WBS או הזמנה בצד התחזוקה, ומלאי או ניתוח רווחיות בצד הייצור. בלי התחשבנות העלות נשארת " +
      "בפקודה והפקודה אינה נסגרת עסקית (CLSD).",
    context:
      "לפי רשומות התחום של המאגר, התחשבנות פקודת תחזוקה רצה ב-KO88 לפקודה בודדת וב-CO88 בריצה מרוכזת, " +
      "וכלל ההתחשבנות נשמר ב-COBRA (כותרת) וב-COBRB (שורות החלוקה). בפקודות ייצור ותהליך קודמים לה חישוב WIP " +
      "וסטיות (KKAX, ‏KKS1, ‏KKS2), והיא מעבירה את הסטיות ליעד. ה-blueprint של תחזוקת המפעל מונה בנושא 'עלויות " +
      "והתחשבנות (PM-CO)' את KO88, ‏KO8G, ‏KOB1 ו-S_ALR_87013611 ואת מודול הפונקציה K_ORDER_SETTLEMENT. " +
      "ב-S/4HANA התהליך וכללי ההתחשבנות נשמרים, הרישום נכנס ל-Universal Journal ‏(ACDOCA), ורשימת הפישוט " +
      "הרשמית קובעת ש-COEP, ‏COSP ו-COSS הוחלפו בתצוגות תאימות באותו שם.",
    steps: [
      {
        he: "להגדיר כלל התחשבנות בפקודה לפני הסגירה: בפקודת תחזוקה ב-IW32 (לשונית העלויות), בהזמנה פנימית ב-KO02, או כלל ברירת מחדל מסוג הפקודה; בלי כלל ההתחשבנות נכשלת.",
        xrefs: ["tx:IW32", "tx:KO02", "table:COBRA", "table:COBRB"],
      },
      {
        he: "לבדוק את מבנה הכלל: כותרת ב-COBRA, ושורה ב-COBRB לכל מקבל עם סוג המקבל ואחוז החלוקה; לפי רשומת ההעשרה, לסוג התחשבנות מלא סכום האחוזים חייב להגיע ל-100.",
        xrefs: ["table:COBRA", "table:COBRB"],
      },
      {
        he: "לוודא שהתקופה פתוחה (OB52 ותקופת CO) ושסטטוס הפקודה מאפשר התחשבנות (REL או TECO, לא CLSD או LKD).",
        xrefs: ["tx:OB52", "table:JEST"],
      },
      {
        he: "בפקודות ייצור ותהליך: לחשב WIP לפקודות פתוחות וסטיות לפקודות סגורות לפני ההתחשבנות (KKAX, ‏KKS1, ‏KKS2); בלי עלות תקן משוחררת אין סטיות.",
        xrefs: ["tx:KKAX", "tx:KKS1", "tx:KKS2", "tx:CK24", "bp:process-order-process", "bp:production-order-process"],
      },
      {
        he: "לבדוק את עלויות הפקודה לפני ואחרי: KOB1 מציג שורות בפועל עם מעבר למסמך המקור, ו-S_ALR_87013611 משווה תכנון מול בפועל ברמת מרכז העלות.",
        xrefs: ["tx:KOB1", "tx:S_ALR_87013611"],
      },
      {
        he: "להריץ ב-Test Run ולבדוק את הלוג, ורק אז להריץ עדכון: KO88 לפקודה בודדת ולתיקונים, והרצה מרוכזת ברקע בסגירת התקופה.",
        xrefs: ["tx:KO88", "tx:KO8G", "tx:CO88"],
      },
      {
        he: "לאמת יתרה אפס בפקודה אחרי התחשבנות מלאה, ורק אז לסגור עסקית (CLSD).",
        xrefs: ["tx:KOB1", "table:AUFK"],
      },
      {
        he: "ב-S/4HANA לבדוק את מסמך ההתחשבנות ביומן האוניברסלי: לפי רשומות המאגר הרישום זורם ל-ACDOCA, ו-COSP ו-COSS הן תצוגות תאימות מעליו.",
        xrefs: ["table:ACDOCA", "table:COSP", "table:COSS"],
      },
    ],
    antiPatterns: [
      "פקודה בלי כלל התחשבנות שמגיעה לסגירת החודש: ההתחשבנות נכשלת והעלות נשארת בפקודה.",
      "הרצת עדכון בלי Test Run ובלי בדיקת הלוג.",
      "התחשבנות לתקופה שגויה, או בלבול בין תקופת ההתחשבנות לתקופת הרישום.",
      "סגירה עסקית (CLSD) לפני שהיתרה בפקודה הגיעה לאפס.",
      "התחשבנות פקודת ייצור או תהליך לפני חישוב WIP וסטיות.",
      "עריכה ידנית של COBRA או COBRB במקום עבודה דרך כלל ההתחשבנות בטרנזקציה.",
    ],
    checks: [
      "חיובי: פקודה עם עלות וכלל התחשבנות, KO88, ויתרה אפס בפקודה.",
      "שלילי: כלל התחשבנות חסר מפיל את ההתחשבנות.",
      "אינטגרציה: התחשבנות חודשית מרוכזת לכל הפקודות.",
      "ייצור: פקודה סגורה, סטיות, התחשבנות; ב-S/4HANA רישום ב-ACDOCA עם Material Ledger.",
      "רגרסיה: ב-S/4HANA רישום ההתחשבנות ב-ACDOCA תואם, ויתרות הפקודה זהות לפני ואחרי ההמרה.",
    ],
    process: {
      purpose:
        "להעביר את העלויות שנצברו בפקודת תחזוקה, בפקודת ייצור ובהזמנת תהליך אל המקבל שנקבע בכלל ההתחשבנות " +
        "(מרכז עלות, נכס, WBS, מלאי או ניתוח), לנקות את הפקודה ולשייך את העלות לבעלים העסקי, כתנאי לסגירה " +
        "העסקית.",
      trigger: [
        { he: "סגירת תקופה: התחשבנות חודשית מרוכזת של כל הפקודות.", xrefs: ["tx:CO88", "tx:KO8G"] },
        { he: "סיום פקודה: לפי מדריך התהליך של המאגר, בצד התחזוקה מתחשבנים אחרי סגירה טכנית (TECO) ולפני סגירה עסקית.", xrefs: ["tx:KO88", "tx:IW32", "tx:COR2"] },
        { he: "תיקון או הרצה חוזרת לפקודה בודדת.", xrefs: ["tx:KO88"] },
      ],
      preconditions: [
        { he: "כלל התחשבנות מלא בפקודה, ופרופיל התחשבנות תקין מסוג הפקודה.", xrefs: ["table:COBRA", "table:COBRB"] },
        { he: "מבנה הקצאה (Allocation Structure), ובהתחשבנות לניתוח רווחיות גם PA Transfer Structure, לפי רשומת KO88." },
        { he: "תקופה פתוחה ב-FI וב-CO.", xrefs: ["tx:OB52"] },
        { he: "סטטוס פקודה REL או TECO, ומקבל התחשבנות תקף ופעיל.", xrefs: ["table:JEST"] },
        { he: "בפקודות ייצור ותהליך: עלות תקן משוחררת, Target Cost Version ו-Results Analysis Key לחישוב WIP וסטיות.", xrefs: ["tx:CK24"] },
      ],
      masterData: [
        { he: "כלל התחשבנות: כותרת וכללי חלוקה, כל שורה מקבל אחד עם סוג המקבל ואחוז.", xrefs: ["table:COBRA", "table:COBRB"] },
        { he: "סוג התחשבנות (PER או FUL) ופרופיל התחשבנות." },
        { he: "מרכז עלות או נכס כמקבל בצד התחזוקה; בצד הייצור כלל ההתחשבנות לרוב אוטומטי (PA או MAT) לפי רשומת התחום." },
      ],
      roles: [
        { he: "בקר עלויות, חשב ואנליסט סגירת תקופה: הרצת ההתחשבנות הבודדת והמרוכזת לפי רשומות KO88 ו-KO8G.", xrefs: ["tx:KO88", "tx:KO8G"] },
        { he: "בקר, מנהל מרכז עלות ורואה חשבון עלויות: ניתוח תכנון מול בפועל במרכז העלות המקבל.", xrefs: ["tx:S_ALR_87013611"] },
        { he: "בקר עלויות או מתכנן: יצירת כלל ההתחשבנות, או יצירה אוטומטית עם הפקודה לפי אסטרטגיית ההתחשבנות, לפי מודיעין האובייקטים של המאגר.", xrefs: ["tx:KO02", "tx:IW32"] },
      ],
      transactions: [
        { he: "הגדרת הכלל: IW32 בפקודת תחזוקה, KO02 בהזמנה פנימית.", xrefs: ["tx:IW32", "tx:KO02", "tx:KO03"] },
        { he: "התחשבנות: KO88 בודדת; CO88 מרוכזת לפקודות ייצור ולפי רשומת התחום גם לפקודות תחזוקה; KO8G מרוכזת לפי רשומת tx-intel.", xrefs: ["tx:KO88", "tx:CO88", "tx:KO8G"] },
        { he: "לפני ההתחשבנות בצד הייצור: KKAX ל-WIP, ‏KKS1 ו-KKS2 לסטיות.", xrefs: ["tx:KKAX", "tx:KKS1", "tx:KKS2"] },
        { he: "בקרה ודיווח: KOB1 שורות בפועל של הפקודה, ‏KOB3 אימות, ‏S_ALR_87013611 מרכזי עלות תכנון מול בפועל.", xrefs: ["tx:KOB1", "tx:KOB3", "tx:S_ALR_87013611"] },
        { he: "Fiori: רשומות המאגר נוקבות בשמות 'Run Settlement - Actual' ו-'Manage Settlement Rules' בלי מזהה אפליקציה; לא נמצא מזהה מאומת, ולכן אין קישור." },
      ],
      tables: [
        { he: "COBRA כותרת כלל ההתחשבנות ו-COBRB שורות החלוקה, מקושרות לפקודה דרך OBJNR.", xrefs: ["table:COBRA", "table:COBRB", "table:AUFK"] },
        { he: "COSP סכומי עלות לרישומים חיצוניים ו-COSS לרישומים פנימיים; ב-S/4HANA תצוגות תאימות מעל ACDOCA.", xrefs: ["table:COSP", "table:COSS", "table:ACDOCA"] },
        { he: "COEP שורות CO בפועל שעליהן נשען KOB1 אינה במילון הפרויקט ולכן מופיעה בפרוזה בלבד." },
        { he: "האובייקטים העסקיים פקודת תחזוקה, פקודת ייצור והזמנת תהליך.", xrefs: ["obj:maintenance-order", "obj:production-order", "obj:process-order"] },
      ],
      integrationPoints: [
        { he: "PM אל CO ו-FI: כלל ההתחשבנות מעביר את עלות הפקודה למרכז עלות, לנכס או להזמנה.", xrefs: ["bp:maintenance-order-process", "table:COBRB"] },
        { he: "PP ו-PP-PI אל CO: WIP וסטיות מועברים בהתחשבנות, וב-S/4HANA עם Material Ledger.", xrefs: ["bp:process-order-process", "tx:CO88"] },
        { he: "עלות הפקודה נצברת מאישורים ומתנועות חומר לפני ההתחשבנות.", xrefs: ["bp:confirmation-process", "bp:material-staging-and-reservation"] },
        { he: "ממשק תוכניתי: K_ORDER_SETTLEMENT לביצוע ההתחשבנות, K_SETTLEMENT_RULE_READ לקריאת הכלל ו-K_COSTS_READ לקריאת העלויות, לפי רשומות התחום.", xrefs: ["fm:K_ORDER_SETTLEMENT", "fm:K_SETTLEMENT_RULE_READ", "fm:K_COSTS_READ"] },
        { he: "הרחבה: Customer Exit‏ COOM0001 לבדיקות התחשבנות לפי רשומות המאגר; אינו במילון הפרויקט ולכן אינו מקושר." },
      ],
      outputs: [
        { he: "מסמך התחשבנות ומסמכי CO ו-FI נלווים; היסטוריית ההתחשבנות לפי רשומת KO88.", xrefs: ["tx:KO88"] },
        { he: "יתרה אפס בפקודה והעלות אצל המקבל.", xrefs: ["tx:KOB1"] },
        { he: "ב-S/4HANA רישום ב-Universal Journal.", xrefs: ["table:ACDOCA"] },
      ],
      exceptions: [
        { he: "ההתחשבנות נכשלת בגלל כלל חסר, תקופת CO או FI סגורה, סטטוס CLSD או LKD, או מקבל לא תקף (תקרית settlement-error).", xrefs: ["tx:KO88", "tx:CO88", "tx:KO02", "tx:OB52"] },
        { he: "רשומת KO88 מונה את ההודעה KD 555 לתקופה שאינה פתוחה, מבנה הקצאה שלא שויך לפרופיל, ו'No values to settle'.", xrefs: ["tx:KO88"] },
        { he: "סטיות לא מחושבות לפקודה סגורה בלי עלות תקן משוחררת או Target Cost Version (תקרית variance-missing).", xrefs: ["tx:KKS2", "tx:CK24"] },
        { he: "WIP נשאר פתוח אחרי TECO ומעוות את ההתחשבנות (תקרית order-teco-wip).", xrefs: ["tx:KKAX"] },
      ],
      controls: [
        { he: "כלל התחשבנות לפני TECO: פקודה בלי כלל נתקעת בסגירת החודש, לפי רשומת KO88.", xrefs: ["tx:KO88", "table:COBRB"] },
        { he: "Test Run והשוואת יתרות לפני הרצה אמיתית.", xrefs: ["tx:KO88", "tx:KOB1"] },
        { he: "סדר קבוע בצד הייצור: WIP, סטיות, התחשבנות.", xrefs: ["tx:KKAX", "tx:KKS2", "tx:CO88"] },
        { he: "יתרה אפס כתנאי לסגירה עסקית." },
      ],
      eccToS4: [
        { he: "תהליך ההתחשבנות וכללי ההתחשבנות קיימים בשתי המערכות; ה-blueprint מסמן את COBRA ו-COBRB 'ללא שינוי (תואם)'.", xrefs: ["table:COBRA", "table:COBRB"] },
        { he: "רשימת הפישוט הרשמית (פריט 6.5.1, CO-OM) קובעת ש-COEP, ‏COSP ו-COSS הוחלפו בתצוגות תאימות באותו שם המצרפות את נתוני היומן האוניברסלי בזמן ריצה, ושהטרנזקציות הקלאסיות ממשיכות לפעול.", xrefs: ["table:COSP", "table:COSS", "table:ACDOCA"] },
        { he: "לפי עמוד ה-FAQ הרשמי של היומן האוניברסלי, רישומים סטטיסטיים ונתוני יעד נותרים ב-COEP, ‏COSS ו-COSP.", xrefs: ["table:COSS"] },
        { he: "בצד הייצור, לפי רשומות התחום, Material Ledger חובה ב-S/4HANA והעלויות ב-ACDOCA.", xrefs: ["table:ACDOCA"] },
        { he: "לפי תיעוד ה-API הרשמי, ישות ה-OData של כלל ההתחשבנות בפקודת תחזוקה תוצא משימוש מ-S/4HANA 2022 FPS01 ותוחלף בישות יורשת.", xrefs: ["table:COBRA"] },
      ],
      migration: [
        { he: "COBRB נשמרת; העלויות עוברות ל-ACDOCA. בדיקה לאחר המרה: התחשבנות והשוואת יתרות מול ACDOCA.", xrefs: ["table:COBRB", "table:ACDOCA"] },
        { he: "בצד הייצור: WIP, סטיות והתחשבנות לאחר ההמרה, עם ACDOCA ו-Material Ledger.", xrefs: ["tx:KKAX", "tx:KKS2", "tx:CO88"] },
        { he: "להסב קוד לקוח הקורא טבלאות CO: פריט הפישוט מורה להחליף גישה דרך תצוגות התאימות בגישה ישירה ל-ACDOCA לסוגי ערך 04 ו-11.", xrefs: ["table:COSP", "table:COSS", "table:ACDOCA"] },
        { he: "לפי ה-blueprint, עלויות מומרות ל-ACDOCA ב-SUM ו-COSP ו-COSS הופכות לתצוגות; להתאים דוחות עלות מותאמים והרצות התחשבנות.", xrefs: ["table:COSP"] },
      ],
      reference: {
        title: "Settle the Maintenance Order | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b1cc9b3e5fbe43a7b01d212586f805c9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד התחשבנות פקודת התחזוקה בתיעוד ניהול התחזוקה (אומת ברשומת table:COBRA). היקפו צד התחזוקה בלבד; " +
          "עמוד רשמי אחד המכסה גם את התחשבנות פקודות הייצור וההזמנות התהליכיות לא אותר בשכבות האימות. פריט SAP " +
          "Best Practices (Scope Item) לתהליך לא אותר ואינו נרשם.",
      },
    },
    xrefs: [
      "table:COBRA", "table:COBRB", "table:COSP", "table:COSS", "table:ACDOCA", "table:AUFK", "table:JEST",
      "tx:KO88", "tx:KO8G", "tx:CO88", "tx:KO02", "tx:KO03", "tx:KOB1", "tx:KOB3", "tx:S_ALR_87013611",
      "tx:IW32", "tx:COR2", "tx:OB52", "tx:KKAX", "tx:KKS1", "tx:KKS2", "tx:CK24",
      "fm:K_ORDER_SETTLEMENT", "fm:K_SETTLEMENT_RULE_READ", "fm:K_COSTS_READ",
      "obj:maintenance-order", "obj:production-order", "obj:process-order",
      "bp:maintenance-order-process", "bp:process-order-process", "bp:production-order-process",
      "bp:confirmation-process", "bp:material-staging-and-reservation",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'התחשבנות פקודה (Settlement)' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "התחשבנות מעבירה את העלויות שנצברו בפקודת האחזקה ליעד הסופי: מרכז עלות, נכס או הזמנה; כוללת כלל " +
          "התחשבנות ומבוצעת ב-KO88 (בודד) או CO88 (מרוכז). זרימה: צבירת עלויות, כלל התחשבנות, KO88, העברה ליעד, " +
          "סגירה עסקית (CLSD). טבלאות AUFK, COBRB, COSS, COSP; טרנזקציות KO88, CO88, KO8G, IW32; פונקציות " +
          "K_ORDER_SETTLEMENT, K_SETTLEMENT_RULE_READ, K_COSTS_READ. ב-S/4 העלויות זורמות ל-ACDOCA. תקלות: כלל " +
          "חסר (להגדיר ב-IW32), תקופה סגורה, סטטוס שאינו REL או TECO.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-settlement",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'התחשבנות פקודת ייצור' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "התחשבנות פקודת ייצור או תהליך מעבירה את הפרש העלות (בפועל מול תקן) ליעד: מלאי לתוצר או ניתוח; " +
          "כוללת חישוב סטיות וכלל התחשבנות. זרימה: צבירת עלות, WIP, סטיות (KKS1/KKS2), התחשבנות (CO88/KO88), " +
          "רישום ל-ACDOCA. WIP בפקודות פתוחות וסטיות בסגורות; ב-S/4 Material Ledger ו-ACDOCA; כלל התחשבנות " +
          "אוטומטי לרוב (PA/MAT).",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-settlement",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים 'התחשבנות פקודה' ו'התחשבנות פקודת ייצור' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "נתוני אב: כלל התחשבנות, סוג התחשבנות (PER/FUL), מרכז עלות או נכס יעד, פרופיל התחשבנות. תרחישי QA: " +
          "פקודה עם עלות וכלל, KO88, יתרה 0; כלל חסר מפיל את ההתחשבנות; התחשבנות חודשית מרוכזת (CO88); ב-S/4 " +
          "רישום ב-ACDOCA תואם. הגירה: COBRB נשמר, עלויות עוברות ל-ACDOCA, QA של התחשבנות ויתרות. Fiori: Run " +
          "Settlement ו-Manage Settlement Rules. בצד הייצור: WIP, סטיות, התחשבנות; Material Ledger חובה ב-S/4.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-settlement",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PM), נושא 10 'עלויות והתחשבנות (PM-CO)', שורת COSP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שורת COSP מונה טרנזקציות 'KO88/KO8G; KOB1, S_ALR_87013611', פונקציות K_COSTS_READ ו-K_ORDER_SETTLEMENT " +
          "('ביצוע התחשבנות פק\"ע'), תוכנית RKO7KO88, עמודת S/4 'הוחלף - עלויות ב-Universal Journal', טבלה " +
          "חלופית 'ACDOCA (COSP=View תאימות)' והערת SUM: עלויות מומרות ל-ACDOCA, ‏COSP ו-COSS הופכים ל-Views, " +
          "ויש להתאים דוחות עלות מותאמים והרצות התחשבנות. תא ה-Fiori נותר 'Maintenance Order Actuals (אמת ID)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:COSP",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות KO88 ו-KO8G",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "KO88 מבצעת התחשבנות בודדת על בסיס COBRA/COBRB, דורשת Settlement Profile מסוג ההזמנה, Allocation " +
          "Structure ו-PA Transfer Structure בהתחשבנות ל-COPA; שגיאות: KD 555 תקופה סגורה, כלל חסר, מבנה הקצאה " +
          "שלא שויך, מקבל לא תקף, 'No values to settle'. המלצות: Test Run לפני Update, קולקטיבי בסגירה ו-KO88 " +
          "לתיקונים, בדיקת יתרה אפס ב-KOB1, כלל לפני TECO. ב-S/4 נשמרת והרישום ל-ACDOCA, ‏COSP/COSS תצוגות " +
          "תאימות; הדוגמה העסקית היא התחשבנות פקודת אחזקה למרכז עלות. KO8G מתוארת כהסדרה קולקטיבית של הזמנות " +
          "פנימיות לפי selection variant, להרצה ברקע, ואחריה אימות ב-KOB3.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#KO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות CO88, KOB1 ו-S_ALR_87013611",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "CO88: התחשבנות קולקטיבית של פקודות ייצור ו-Product Cost Collectors, מעבירה WIP ל-FI וסטיות ל-CO-PA, " +
          "בסדר WIP, סטיות, התחשבנות, עם Test Run. KOB1: דוח שורות בפועל מעל COEP עם מעבר למסמך המקור, לאימות " +
          "לפני ואחרי הסדרה; ב-S/4 קורא מ-ACDOCA. S_ALR_87013611: דוח Report Painter של מרכזי עלות, תכנון מול " +
          "בפועל ופערים, הקורא סכומים מ-COSP/COSS.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריכי התהליך 'אחזקת שבר מקצה לקצה' ו'ייצור-למלאי תהליכי מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "בצד התחזוקה: 'התחשבן פקודה למרכז עלות (אחרי TECO)' ב-KO88, טבלאות COBRB ו-COEP, והטעות השכיחה 'כלל " +
          "התחשבנות חסר'. בצד תעשיות תהליכיות: 'התחשבן פקודה (WIP/סטיות)' ב-CO88, טבלאות COBRB ו-CKMLPP, והטעות " +
          "השכיחה 'ללא עלות תקן, אין סטיות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-corrective",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין האובייקטים של הפרויקט (OBJECT_INTEL): רשומות COBRA ו-COBRB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "COBRA נוצרת על ידי מתכנן או בקר עלויות בעת יצירת כלל סילוק (KO02), או אוטומטית בעת יצירת פקודה עם " +
          "אסטרטגיית settlement, ונקראת בתהליך הסילוק (KO88/CO88). המלצות: להגדיר פרופיל סילוק נכון לסוג הפקודה, " +
          "לעבוד דרך כלל הסילוק בעסקה ולא לערוך COBRA/COBRB ידנית, ולבדוק שכל פקודה עם עלות מקבלת כלל סילוק לפני " +
          "סגירה תקופתית. COBRB: לאזן את אחוזי הסילוק ל-100%, ולוודא קטגוריית מקבל תואמת לאובייקט היעד.",
        verificationLevel: "repository_verified",
        repoRef: "data/knowledge/object-intel.ts#COBRA",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PM), רשומת COBRB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ה-blueprint של תחזוקת מפעל מתעד את COBRB תחת הנושא 'עלויות והתחשבנות (PM-CO)' עם השדות OBJNR, BUREG, " +
          "KONTY ('סוג מקבל'), EMPGE ו-PROZS ('אחוז התחשבנות'); מסמן s4Note 'ללא שינוי (תואם)', s4AltTable 'COBRB " +
          "(זהה)' ו-sumNote 'ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת)', טרנזקציות KO02 ו-IW32, פונקציה " +
          "K_SETTLEMENT_RULE_READ, וקשר COBRB.OBJNR = COBRA.OBJNR; רשומת COBRA מסומנת באותו אופן 'ללא שינוי (תואם)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:COBRB",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין מודולי הפונקציה של הפרויקט (FUNCTION_INTEL): K_ORDER_SETTLEMENT",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "K_ORDER_SETTLEMENT: התחשבנות פקודה, העברת עלויות ליעד (מרכז עלות, נכס, WBS); קלט פקודה ותקופה; " +
          "כשלים: כלל חסר, תקופה סגורה, סטטוס לא מאפשר; תלויות: כלל התחשבנות ויעד פעיל; טרנזקציות KO88 ו-KO8G; " +
          "זמין ב-ECC וב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#K_ORDER_SETTLEMENT",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומות COBRA, COBRB, COSP ו-COSS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "COBRA כותרת כלל הסילוק לאובייקט (הזמנת PM/PP, WBS), מקושרת ל-AUFK ול-COBRB דרך OBJNR; בלי COBRA/COBRB " +
          "‏KO88/KO8G ייכשלו. COBRB שורות החלוקה, כל שורה מקבל אחד; סכום האחוזים חייב להגיע ל-100% לסוג סילוק " +
          "מלא, ו-KONTY מגדיר את סוג המקבל. COSP ו-COSS סכומי עלות לרישומים חיצוניים ופנימיים; ב-S/4HANA תצוגות " +
          "תאימות מעל ACDOCA, ופיתוח חדש קורא מ-ACDOCA או מ-CDS.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#COBRA",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: settlement-error",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "KO88/CO88 מסיימים בשגיאה והעלות נשארת בפקודה: כלל לא הוגדר, תקופת CO/FI סגורה, סטטוס CLSD/LKD או " +
          "יעד לא תקף; ניתוח ב-KO88, CO88, KO02, OB52; תיקון: להגדיר כלל (KO02/IW32), לפתוח תקופה (OB52), לוודא " +
          "REL/TECO ויעד פעיל.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#settlement-error",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: variance-missing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "סטיות לא מחושבות (KKS1/KKS2 לא מציגים סטיות לפקודה סגורה): עלות תקן לא משוחררת, Target Cost Version " +
          "חסר (0), Variance Variant לא מוגדר או סטטוס פקודה; תיקון: לחשב ולשחרר עלות תקן (CK11N/CK24).",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#variance-missing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: order-teco-wip",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "TECO משאיר WIP פתוח והתחשבנות שגויה: RA Key לא חישב WIP נכון, אישורים חלקיים או סטטוס שאינו DLV/CNF; " +
          "תיקון: להריץ חישוב WIP (KKAX), לסגור אישורים ולהתחשבן; מניעה: סדר סגירה חודשי WIP, סטיות, התחשבנות.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#order-teco-wip",
      },
      {
        sourceType: "repository",
        sourceTitle: "זרימת התהליך של תעשיות תהליכיות במאגר: שלבים s11 (סטיות) ו-s12 (התחשבנות)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "s11: חישוב סטיות ב-KKS1 (טבלאות COSS, COSP), וטעויות: עלות תקן לא משוחררת (CK24) או Target Cost " +
          "Version חסר, WIP שגוי. s12: התחשבנות הזמנת תהליך ב-CO88 (טבלאות COBRB, ACDOCA), רישום ל-ACDOCA/ML " +
          "והפקודה נסגרת פיננסית (CLSD); טעויות: כלל חסר או תקופת FI/CO סגורה, Material Ledger לא פעיל.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-process-flow.ts#s12",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'Universal Journal (ACDOCA)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ECC: FI ו-CO נפרדים, COEP ל-CO וטבלאות סיכום נפרדות. S/4HANA: ACDOCA שורת אמת יחידה ל-FI, CO ועלויות, " +
          "ללא reconciliation. השפעה: דיווח עלויות פקודות ייצור ואחזקה עובר ל-ACDOCA ודוחות CO ישנים צריכים התאמה.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#acdoca",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settle the Maintenance Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b1cc9b3e5fbe43a7b01d212586f805c9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim:
          "עמוד 'Settle the Maintenance Order' לגרסת 2025 FPS01 קובע תחת Use: 'You use a settlement rule to define " +
          "how the costs incurred by the execution of maintenance work are cleared on a pro rata basis', ותחת " +
          "Features בסעיף 'Creating a Default Settlement Rule' מתאר יצירת כלל ברירת מחדל בלשונית Costs של הפקודה, " +
          "באזור Settlement Rules (הסניפט נקטע שם). הסניפט אינו נוקב בשם הטבלה COBRA (אומת ברשומת table:COBRA).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settlement Rule | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/99c8b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim:
          "תיעוד הזמנות התחזוקה והשירות לגרסת 2025 FPS01 קובע תחת 'Structure' שחוק ההתחשבנות מורכב מ-'Distribution " +
          "rules' ומ-'Settlement parameters for a sender object', ושלכל שולח התחשבנות מוקצים 'one or more " +
          "distribution rules'; העמוד מפנה ל-Customizing 'Define Settlement Rule, Time and Distribution Rule'. " +
          "הסניפט אינו נוקב בשם הטבלה COBRB (אומת ברשומת table:COBRB).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Distribution Rule | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/3a87d0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim:
          "תיעוד ה-CO לגרסת 2025 FPS01 מגדיר: 'The distribution rule is part of a settlement rule that specifies the " +
          "following for a settlement sender: The settlement receiver to which you settle / Which part of the costs " +
          "you settle', ומוסיף ש-'You need to define a distribution rule for each settlement receiver' ו-'The system " +
          "creates automatic distribution rules for some sender objects, such as networks'. הסניפט אינו נוקב בשם " +
          "הטבלה COBRB (אומת ברשומת table:COBRB).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Change Settlement Rule | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/8bb9bde3cf4a43b1af3f4fc78cb8b933.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim:
          "עמוד הפעולה 'Change Settlement Rule' לגרסת 2025 FPS01 מתאר שינוי כלל התחשבנות בשיטת PATCH ונושא את " +
          "ההערה: 'The Maintenance Order Settlement Rule entity will be deprecated with SAP S/4HANA 2022 FPS01 and " +
          "will be replaced with a successor entity'. ההצהרה ברמת ישות ה-OData בלבד ואינה קובעת דבר על COBRA " +
          "(אומת ברשומת table:COBRA).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.5.1 S4TWL - TECHNICAL CHANGES IN " +
          "CONTROLLING (CO-OM), p. 319, 320",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TBL_15,
        claim:
          "פריט 6.5.1 קובע: 'In SAP S/4 HANA the totals records for primary and secondary costs have been removed " +
          "and the universal journal includes all actual cost postings, both primary and secondary', ו-'The former " +
          "tables COEP, COSP, and COSS are replaced by views of the same name, so-called compatibility views'; " +
          "'From a business point of view, all classic transactions are still running - based on compatibility " +
          "views or using direct acces to ACDOCA'. הפעולה הנדרשת: 'Customer coding should be adapted by replacing " +
          "the access via compatibility views with direct access to ACDOCA for value types 04 and 11' (אומת ברשומת " +
          "table:COSP).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Universal Journal: FAQ | General Ledger Accounting (FI-GL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/8b8e5695c4dc4749a706f9fa2f6bda92.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim:
          "עמוד ה-FAQ הרשמי של ה-Universal Journal פותח במילים 'The entries of the following tables are now " +
          "completely contained in table ACDOCA', וברשימה מופיע 'The actual data of the Controlling tables: COEP, " +
          "COSS, COSP'; מיד לאחריו: 'The data for statistical postings and target data remain in the tables COEP, " +
          "COSS, and COSP' (אומת ברשומת table:COSS).",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים (PM, PP ו-PP-PI), ממתינה לסקירת עורך אנושי. כל שדה בפרופיל נגזר מרשומות המאגר " +
      "הנקובות או מעמוד רשמי שכבר אומת ברשומות table:COBRA, ‏table:COBRB, ‏table:COSP ו-table:COSS. הרשומה מקשרת " +
      "אל bp:maintenance-order-process ואל bp:process-order-process במקום לשכפל את שלבי ההתחשבנות שבהן. פערים " +
      "גלויים: שדה kpis הושמט, המאגר אינו מתעד מדדי ביצוע לתהליך ההתחשבנות. המאגר חלוק לגבי ההרצה המרוכזת: " +
      "רשומת התחום pm-settlement מציגה את CO88 כהתחשבנות המרוכזת של פקודות תחזוקה ומונה גם את KO8G, ה-blueprint " +
      "מונה 'KO88/KO8G', ורשומת tx-intel של KO8G מתארת הסדרה קולקטיבית של הזמנות פנימיות; איזו טרנזקציה " +
      "מרוכזת משמשת לכל סוג פקודה דורש אימות במערכת SAP. באותו אופן רשומת tx-intel של KOB1 מתארת דוח של הזמנות " +
      "פנימיות, וה-blueprint משייך אותו לנושא עלויות התחזוקה. אף אחת מהטרנזקציות KO88, ‏KO8G, ‏KOB1, " +
      "‏S_ALR_87013611 ו-CO88 אינה נושאת רשומת אימות רשמית בשכבת האימות, ולכן הטענות עליהן הן ברמת המאגר. אין " +
      "מזהה Fiori מאומת לאפליקציות ההתחשבנות. COEP ו-COOM0001 אינם במילון הפרויקט ולכן מופיעים בפרוזה בלבד. מספרי " +
      "SAP Notes שבפריט הפישוט אינם מועתקים כאן. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ============================================== quality inspection in production */
  {
    slug: "quality-inspection-in-production",
    he: "בדיקת איכות בייצור: מנת בדיקה, רישום תוצאות והחלטת שימוש בפקודות ייצור, תהליך ותחזוקה",
    en: "Quality inspection in production: inspection lot, results recording and usage decision",
    module: "Cross",
    summary:
      "בדיקת האיכות בייצור עוברת שלושה שלבים: מנת בדיקה (Inspection Lot) נוצרת לפי סוג הבדיקה, תוצאות נרשמות " +
      "מול המפרט, והחלטת שימוש (Usage Decision) קובעת אם המלאי משוחרר, נחסם או נגרט. בתעשיות תהליכיות בדיקה " +
      "תוך-תהליכית פתוחה עלולה לחסום את אישור השלב, ובצד התחזוקה אותו מנגנון משמש לכיול מכשירים.",
    context:
      "לפי מפת התהליך 'ניהול איכות (QM)' של המאגר, הזרימה היא מנת בדיקה (QA32), רישום תוצאות (QE11), החלטת " +
      "שימוש (QA11) ותעודה או הודעת איכות (QC20, ‏QM01). מודיעין הטרנזקציות מציג את QA32 כרשימת העבודה של הבודק, " +
      "את QE51N כרשימת העבודה לרישום תוצאות ואת QA11 כהחלטת השימוש, שמבצעת את רישומי המלאי ממלאי בדיקה למלאי " +
      "חופשי, חסום או גריטה. בתעשיות תהליכיות תקרית qm-inprocess-results-missing מתעדת מנת בדיקה ממקור 03 שבלי " +
      "תוצאות ובלי החלטת שימוש חוסמת את דיווח השלב ומשאירה את האצווה במלאי בדיקה. בצד התחזוקה פקודת כיול עם מפתח " +
      "בקרה לבדיקה יוצרת מנת בדיקה. לפי רשומות המאגר, מודל ה-QM ומנגנון ההחלטה נשמרים ב-S/4HANA, והחוויה נוספת " +
      "ב-Fiori.",
    steps: [
      {
        he: "להגדיר את החומר לבדיקה: תצוגת QM בחומר (MM02) עם סוג בדיקה פעיל ותכנית בדיקה (QP01); בלי סוג בדיקה פעיל לא נוצרת מנת בדיקה.",
        xrefs: ["tx:MM02", "tx:MM03", "tx:QP01"],
      },
      {
        he: "בתעשיות תהליכיות: לוודא שבמתכון מוגדרים מאפייני בדיקה לשלב; לפי רשומת התקרית, מתכון בלי מאפייני בדיקה לא מפיק מנת בדיקה, והתיקון דורש שחרור מחדש של הפקודה.",
        xrefs: ["obj:master-recipe", "tx:COR2", "bp:master-recipe-process"],
      },
      {
        he: "לאתר את מנות הבדיקה הפתוחות של הפקודה ברשימת העבודה QA32 (או QA33 לתצוגה בלבד), עם סינון לפי סטטוס ומפעל.",
        xrefs: ["tx:QA32", "tx:QA33"],
      },
      {
        he: "לרשום תוצאות לכל מאפיין מול המפרט: QE51N כרשימת העבודה, או QE11; המערכת מעריכה כל ערך כמתקבל או נדחה, ומאפיין חובה פתוח חוסם את סיום הרישום.",
        xrefs: ["tx:QE51N", "tx:QE11", "tx:QE01"],
      },
      {
        he: "לקבל החלטת שימוש ב-QA11: קוד ההחלטה קובע את רישום המלאי ממלאי בדיקה למלאי חופשי, חסום או גריטה, ומפעיל פעולות המשך.",
        xrefs: ["tx:QA11"],
      },
      {
        he: "בתוצאה מחוץ למפרט: החלטה 'נדחה', חסימת האצווה ב-MSC2N ופתיחת הודעת איכות.",
        xrefs: ["tx:MSC2N", "tx:QM01", "obj:batch", "bp:batch-management-process"],
      },
      {
        he: "בתעשיות תהליכיות: להשלים את בדיקת השלב לפני אישורו, ולבדוק ב-MSC3N את סטטוס האצווה; אצווה שנשארה במלאי בדיקה אינה זמינה לשלב הבא.",
        xrefs: ["tx:COR6N", "tx:MSC3N", "bp:confirmation-process"],
      },
      {
        he: "בצד התחזוקה (כיול): פקודה עם מפתח בקרה לבדיקה מפיקה מנת בדיקה, ורישום התוצאות והחלטת השימוש מעדכנים את סטטוס המכשיר.",
        xrefs: ["tx:IP01", "tx:IE02", "table:PLMK", "bp:preventive-maintenance-process"],
      },
    ],
    antiPatterns: [
      "חומר שדורש בדיקה בלי סוג בדיקה פעיל בתצוגת ה-QM: הקבלה נרשמת למלאי חופשי בלי בדיקה.",
      "השארת מנות בדיקה פתוחות בלי החלטת שימוש: המלאי נשאר במלאי בדיקה והקו אינו מקבל את הרכיב.",
      "מאפייני חובה בלי תוצאה: החלטת השימוש נחסמת.",
      "תוצאה מחוץ למפרט בלי חסימת אצווה ובלי פעולות המשך בקוד ההחלטה.",
      "בניית תהליך ליבה סביב QA01 הידנית במקום יצירה אוטומטית של מנות בדיקה לפי סוג הבדיקה בחומר.",
    ],
    checks: [
      "קבלה או ייצור יוצרים מנת בדיקה לפי סוג הבדיקה.",
      "ערכים נרשמים מול המפרט, וחריגה מובילה לדחייה.",
      "החלטת שימוש משחררת או חוסמת את המלאי.",
      "בתעשיות תהליכיות: דיווח שלב עם בדיקה תוך-תהליכית עובר רק אחרי תוצאות והחלטת שימוש.",
      "אינטגרציה: אצווה שנפסלה ב-QM נחסמת ולא נבחרת בקביעת אצווה.",
      "כיול: פקודה, מנת בדיקה, החלטת שימוש וסטטוס המכשיר, לפני ואחרי ההמרה.",
    ],
    process: {
      purpose:
        "לבדוק את איכות התוצר ושל רכיבים בתהליך הייצור ובתחזוקה (כיול) מול מפרט, ולקבוע בהחלטת שימוש אם " +
        "המלאי או האצווה משוחררים לשימוש, נחסמים או נגרטים, לפני שהם נצרכים בשלב הבא או מסופקים.",
      trigger: [
        { he: "קבלה או ייצור יוצרים מנת בדיקה לפי סוג הבדיקה שהוגדר לחומר.", xrefs: ["tx:QA32"] },
        { he: "שלב בהזמנת תהליך עם בדיקה תוך-תהליכית (מנה ממקור 03 לפי רשומת התקרית).", xrefs: ["tx:COR6N", "obj:process-order"] },
        { he: "פקודת כיול בתחזוקה עם מפתח בקרה לבדיקה.", xrefs: ["tx:IP01", "tx:IW31"] },
      ],
      preconditions: [
        { he: "תצוגת QM בחומר עם סוג בדיקה פעיל; רשומות המאגר נוקבות בסוגי בדיקה 01 ו-04 לקבלה ובמקור 03 לבדיקה תוך-תהליכית.", xrefs: ["tx:MM02"] },
        { he: "תכנית בדיקה או מאפייני בדיקה במתכון או ברשימת הפעולות, עם מפרט לכל מאפיין.", xrefs: ["tx:QP01", "table:PLMK"] },
        { he: "Selected Set וקודי החלטת שימוש מוגדרים למפעל, לפי רשומת QA11." },
        { he: "הרשאה להחלטת שימוש; תקרית qm-ud-blocked נוקבת באובייקט Q_VORG_ME." },
      ],
      masterData: [
        { he: "תצוגת QM וסוגי הבדיקה בחומר (לפי הערות היועץ, הרשומה QMAT מקשרת חומר לסוגי בדיקה)." },
        { he: "מאפייני בדיקה ומפרט: מאפייני התכנית (PLMK) או מאפיין אב.", xrefs: ["table:PLMK"] },
        { he: "אצווה עם מאפייני איכות, שסטטוסה נגזר מהחלטת השימוש.", xrefs: ["obj:batch", "table:MCH1", "table:MCHA"] },
      ],
      roles: [
        { he: "בודק איכות (QA Inspector), מהנדס איכות ואחראי משמרת איכות: רשימת העבודה והחלטת השימוש, לפי רשומות QA32 ו-QA11.", xrefs: ["tx:QA32", "tx:QA11"] },
        { he: "טכנאי מעבדה ובודק איכות: רישום התוצאות, לפי רשומת QE51N.", xrefs: ["tx:QE51N"] },
        { he: "מפעיל ייצור: אישור השלב, שנחסם כשהבדיקה התוך-תהליכית פתוחה לפי רשומת התקרית.", xrefs: ["tx:COR6N"] },
      ],
      transactions: [
        { he: "מנות בדיקה: QA32 רשימת עבודה, ‏QA33 תצוגה; QA01 עד QA03 לרשומה ידנית, שרשומת המאגר מסמנת כ-legacy.", xrefs: ["tx:QA32", "tx:QA33", "tx:QA01", "tx:QA02", "tx:QA03"] },
        { he: "רישום תוצאות: QE51N רשימת עבודה, ‏QE11 ו-QE01.", xrefs: ["tx:QE51N", "tx:QE11", "tx:QE01"] },
        { he: "החלטת שימוש: QA11.", xrefs: ["tx:QA11"] },
        { he: "אצווה והמשך: MSC2N לחסימה, ‏MSC3N לתצוגת סטטוס, ‏QM01 להודעת איכות, ‏QC20 לתעודה.", xrefs: ["tx:MSC2N", "tx:MSC3N", "tx:QM01", "tx:QC20"] },
        { he: "Fiori לפי רשומות המאגר: Manage Inspection Lots, ‏Record Inspection Results ו-Record Usage Decision; אין מזהה אפליקציה מאומת, ולכן אין קישור." },
      ],
      tables: [
        { he: "QALS מנות הבדיקה, ‏QAMR ו-QASR התוצאות ברמת מאפיין ודגימה, ‏QAVE החלטת השימוש, ‏QAMV מאפייני המנה; לפי מודיעין הטרנזקציות. אף אחת מהן אינה במילון הפרויקט, ולכן הן מופיעות בפרוזה בלבד." },
        { he: "PLMK מאפייני הבדיקה בתכנית; MARD ו-MCHB נקובות ברשומת התקרית של רכיב במלאי בדיקה (MCHB אינה במילון הפרויקט).", xrefs: ["table:PLMK", "table:MARD"] },
        { he: "QMEL כותרת הודעת איכות הנפתחת בדחייה.", xrefs: ["table:QMEL"] },
      ],
      integrationPoints: [
        { he: "PP-PI אל QM: מאפייני איכות (למשל Brix ו-pH בתרחיש התרכיז של המאגר) והחלטת שימוש לפני קבלת האצווה.", xrefs: ["obj:process-order", "bp:process-industries-plan-to-produce"] },
        { he: "QM אל ניהול אצוות: אצווה שנפסלה נחסמת ולא נבחרת בקביעת אצווה.", xrefs: ["bp:batch-management-process", "obj:batch"] },
        { he: "QM למלאי: החלטת השימוש רושמת תנועות מלאי, שב-S/4HANA נרשמות ל-MATDOC לפי רשומת ההערות.", xrefs: ["bp:goods-movement-process", "obj:material-document"] },
        { he: "PM אל QM: פקודה עם מפתח בקרה לבדיקה יוצרת מנת בדיקה בתהליך הכיול.", xrefs: ["tx:QE11", "tx:QA11", "bp:plant-maintenance-end-to-end"] },
        { he: "ממשק תוכניתי לפי רשומות QA32, ‏QA11 ו-QE51N: BAPI_INSPLOT_GETLIST, ‏BAPI_INSPLOT_SETUSAGEDECISION ו-BAPI_INSPOPER_RECORDRESULTS; אינם במילון הפרויקט ולכן אינם מקושרים." },
        { he: "הרחבות לפי רשומות המאגר: Customer Exit‏ QEVA0001 בהחלטת השימוש, ‏CONFPP01 באישור הייצור.", xrefs: ["enh:exit:CONFPP01"] },
      ],
      outputs: [
        { he: "מנת בדיקה עם תוצאות לכל מאפיין והערכה." },
        { he: "החלטת שימוש ורישום מלאי ממלאי בדיקה למלאי חופשי, חסום או גריטה." },
        { he: "הודעת איכות או תעודה לפי הצורך.", xrefs: ["tx:QM01", "tx:QC20"] },
      ],
      exceptions: [
        { he: "מנת בדיקה לא נוצרה: סוג בדיקה לא פעיל בתצוגת ה-QM, Inspection Setup חסר או אין תכנית בדיקה (תקריות qm-no-inspection-lot ו-qm-insp-lot-not-created-on-gr).", xrefs: ["tx:MM03", "tx:QP01", "tx:QA32"] },
        { he: "החלטת שימוש חסומה: תוצאות חסרות, מאפיין חובה פתוח או הרשאה (תקרית qm-ud-blocked).", xrefs: ["tx:QA32", "tx:QE11", "tx:QA11"] },
        { he: "בדיקה תוך-תהליכית חסרה חוסמת את דיווח השלב והאצווה נשארת במלאי בדיקה (תקרית qm-inprocess-results-missing).", xrefs: ["tx:QE51N", "tx:QA11", "tx:COR3", "tx:MSC3N"] },
        { he: "רכיב לא זמין לקו כי הוא במלאי בדיקה ולא במלאי חופשי (תקרית qm-inspection-lot-block והערת qm-ud-stock-block).", xrefs: ["tx:QA32", "tx:MMBE", "tx:MB52"] },
        { he: "תוצאה מחוץ למפרט בלי פעולות המשך (תקרית qm-results-out-of-spec).", xrefs: ["tx:QA11", "tx:MSC2N"] },
      ],
      controls: [
        { he: "ניטור יומי של מנות פתוחות ב-QA32, כי מנות פתוחות חוסמות מלאי.", xrefs: ["tx:QA32"] },
        { he: "הערכה לכל מאפיין לפני החלטת השימוש.", xrefs: ["tx:QE51N"] },
        { he: "פעולות המשך בקוד ההחלטה לחסימה ולהודעה.", xrefs: ["tx:QA11"] },
        { he: "לפי רשומת התקרית: החלטת שימוש כתנאי לסגירה טכנית, ובדיקה שלכל סוג בדיקה 03 יש תכנית מלאה." },
        { he: "הגדרת QM כחלק מיצירת החומר, לפי רשומת התקרית." },
      ],
      eccToS4: [
        { he: "תצוגת ה-QM וה-Inspection Setup זהים ב-ECC וב-S/4HANA לפי רשומות ההערות; ב-S/4HANA נוספת חוויית Fiori לרישום תוצאות." },
        { he: "QA32, ‏QA11 ו-QE51N זמינות ב-S/4HANA והלוגיקה והטבלאות נשמרות; אפליקציות Fiori משלימות את ה-GUI, לפי מודיעין הטרנזקציות.", xrefs: ["tx:QA32", "tx:QA11", "tx:QE51N"] },
        { he: "QA01 זמינה ב-S/4HANA אך רשומת המאגר מסמנת אותה כ-legacy.", xrefs: ["tx:QA01"] },
        { he: "תנועות המלאי שהחלטת השימוש רושמת נרשמות ב-S/4HANA ל-MATDOC.", xrefs: ["bp:matdoc-read-through-compatibility"] },
        { he: "אינטגרציית PM-QM בכיול זהה, והחוויה לרישום תוצאות עוברת ל-Fiori, לפי רשומת התחום." },
      ],
      migration: [
        { he: "QALS ו-QAMR נשמרים; בדיקה לאחר המרה: יצירת מנת בדיקה מפקודת PM וזרימת תוצאות להחלטת שימוש, לפי רשומת התחום." },
        { he: "בתעשיות תהליכיות, לפי תרחיש התרכיז של מרכז הייצור: בדיקת QA לאחר המרה של מתכון רב-שלבי ומאפייני QM.", xrefs: ["obj:master-recipe"] },
      ],
      reference: null,
    },
    xrefs: [
      "tx:QA32", "tx:QA33", "tx:QA01", "tx:QA02", "tx:QA03", "tx:QE51N", "tx:QE11", "tx:QE01", "tx:QA11",
      "tx:QP01", "tx:MM02", "tx:MM03", "tx:MSC2N", "tx:MSC3N", "tx:QM01", "tx:QC20", "tx:COR2", "tx:COR3",
      "tx:COR6N", "tx:IP01", "tx:IW31", "tx:IE02", "tx:MMBE", "tx:MB52",
      "table:PLMK", "table:MARD", "table:MCH1", "table:MCHA", "table:QMEL",
      "obj:process-order", "obj:master-recipe", "obj:batch", "obj:material-document",
      "enh:exit:CONFPP01",
      "bp:batch-management-process", "bp:confirmation-process", "bp:goods-movement-process",
      "bp:master-recipe-process", "bp:process-industries-plan-to-produce", "bp:preventive-maintenance-process",
      "bp:plant-maintenance-end-to-end", "bp:matdoc-read-through-compatibility",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'ניהול איכות (QM)' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ממנת בדיקה דרך תוצאות, החלטת שימוש ועד תעודה או חסימה: יצירת מנת בדיקה (QA32, ‏QALS, ‏Manage Inspection " +
          "Lots, תקרית qm-no-inspection-lot, בדיקה 'GR/ייצור יוצר lot לפי סוג בדיקה'); רישום תוצאות (QE11, ‏QAMR, " +
          "‏QASR, ‏Record Inspection Results, בדיקה 'ערכים מול spec; חריגה, דחייה'); החלטת שימוש (QA11, ‏QAVE, ‏Make " +
          "Usage Decision, תקרית qm-ud-blocked, הערה qm-ud-stock-block, בדיקה 'UD משחרר/חוסם מלאי'); תעודה או " +
          "הודעת איכות (QC20, ‏QM01, ‏QMEL).",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#quality-management",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות QA32, QA33, QE51N, QA11 ו-QA01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "QA32: רשימת עבודה למנות בדיקה, מעבר לרישום תוצאות (QE51N) ולהחלטת שימוש (QA11); טבלאות QALS, QAVE, " +
          "QAMR, QAMV; BAPIs BAPI_INSPLOT_GETLIST ו-BAPI_INSPLOT_SETUSAGEDECISION; Exit‏ QEVA0001; מנות פתוחות " +
          "חוסמות מלאי ויש לנטר יומית; יצירת מנה נגזרת מהגדרות QMAT; ב-S/4 נשמרת, עם Manage Inspection Lots. " +
          "QE51N: רישום תוצאות עם הערכה מול המפרט, מאפייני חובה חוסמים סיום רישום, המפרט מ-PLMK או ממאפיין אב, " +
          "BAPI_INSPOPER_RECORDRESULTS. QA11: דורשת Selected Set וקודי UD למפעל; קוד החלטה, רישומי מלאי ממלאי בדיקה לחופשי, חסום או גריטה, פעולות " +
          "המשך; שגיאה נפוצה: תוצאות חסרות; ב-S/4 הלוגיקה והטבלאות נשמרות. QA01: legacy, העדף יצירה אוטומטית לפי " +
          "סוג הבדיקה בחומר.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QA32",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-inprocess-results-missing ו-qm-insp-lot-not-created-on-gr",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "בדיווח שלב נדרשת רשומת בדיקה (origin 03) אך התוצאות לא נרשמו; ה-UD חסר והאישור נחסם או האצווה ב-QI. " +
          "סיבות: Inspection type 03 פעיל בלי תוצאות (QE51N), אין UD, מאפייני חובה בלי תוצאה, lot לא נוצר " +
          "(Recipe בלי inspection chars). ניתוח: QE51N, QA32, QA11, COR3, MSC3N; Exit‏ CONFPP01. תיקון: להזין " +
          "תוצאות, UD ב-QA11, לוודא מאפייני בדיקה במתכון ולשחרר מחדש. מניעה: ניטור QA32, UD כתנאי ל-TECO, ‏type " +
          "03 עם plan מלא. בקבלה: סוג בדיקה 01 לא פעיל בתצוגת ה-QM והמלאי הולך לחופשי; מניעה: הגדרת QM כחלק " +
          "מיצירת החומר.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#qm-inprocess-results-missing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-ud-blocked, qm-no-inspection-lot ו-qm-results-out-of-spec",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "UD חסום: תוצאות לא הושלמו, מאפיין חובה פתוח, הרשאת UD (Q_VORG_ME); ניתוח QA11, QA32, QE11; מניעה: " +
          "ניטור לוטים פתוחים. מנה לא נוצרה: סוג בדיקה לא פעיל בתצוגת ה-QM, Inspection Setup חסר, אין תכנית; " +
          "תיקון: להפעיל סוג בדיקה (01/04), ליצור תכנית (QP01). תוצאה מחוץ למפרט: UD 'נדחה', חסימת אצווה " +
          "(MSC2N) והודעת איכות (Q1), ופעולות המשך בקוד ה-UD.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#qm-ud-blocked",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-inspection-lot-block",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ניפוק או שימוש ברכיב נדחה כי המלאי במלאי בדיקת QM ולא במלאי חופשי: מק\"ט עם QM Inspection פעיל (סוג " +
          "בדיקה 01/04), UD לא בוצע, כמות נכשלה והוחזרה לחסום; ניתוח QA32, QA33, MMBE, MB52; תיקון: UD " +
          "(QA11/QA32) לשחרור, ובדחייה ניתוב לחסום או להחזרה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#qm-inspection-lot-block",
      },
      {
        sourceType: "repository",
        sourceTitle: "הערות ה-SAP של הפרויקט: qm-ud-stock-block ו-qm-inspection-lot-not-created",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רכיב לא זמין לקו כי הוא במלאי בדיקת QM: סוג בדיקה פעיל ו-UD לא בוצע, או נדחה והמלאי נותב לחסום; " +
          "רלוונטיות 'ECC + S/4. תנועות מלאי ל-MATDOC ב-S/4'. מנה לא נוצרה ב-GR: סוג בדיקה (01/04) לא פעיל בתצוגת " +
          "ה-QM; רלוונטיות 'ECC + S/4. QM-View ו-Inspection setup זהים; Fiori לרישום תוצאות'. הרשומות אינן נושאות " +
          "מספר SAP Note.",
        verificationLevel: "repository_verified",
        repoRef: "data/sap-notes.ts#qm-ud-stock-block",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום ופירוט התחום 'כיול (Calibration)' של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "כיול משלב PM ו-QM: פקודת אחזקה עם מפתח בקרה לבדיקה יוצרת מנת בדיקה, רושמים תוצאות (QE11) ומקבלים " +
          "החלטת שימוש (QA11); טבלאות QALS, QAMR, QAVE, PLKO, PLPO, PLMK. ECC מול S/4: אינטגרציית PM-QM זהה, UX " +
          "ל-Fiori לרישום תוצאות. הגירה: QALS/QAMR נשמרים; QA: יצירת מנת בדיקה מפקודת PM וזרימת תוצאות ל-UD.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-calibration",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז הייצור של הפרויקט: תרחיש 'תהליך הכנת תרכיז'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תרכיז הבסיס מיוצר בפקודת תהליך: שקילה, ערבוב, מדידת Brix/pH, החלטת שימוש (QM), קבלה לאצווה; " +
          "אינטגרציה PP-PI מול QM במאפייני Brix/pH; Brix מחוץ לתחום מוביל ל-UD לא תקין ולחסימה; בדיקת אינטגרציה: " +
          "חסימת אצווה פסולה ב-QM; הגירה: 'QA: מתכון רב-שלבי + מאפייני QM'.",
        verificationLevel: "repository_verified",
        repoRef: "data/centers/manufacturing.ts#syrup-process",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז ה-QA של הפרויקט: 'אימות אצוות'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תרחיש אינטגרציה בבדיקת ניהול האצוות: 'אצווה שנפסלה ב-QM נחסמת ולא נבחרת'.",
        verificationLevel: "repository_verified",
        repoRef: "data/qa-center.ts#batch-validation",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'כיול משולב PM-QM' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תהליך כיול מלא: תכנית אחזקה לכיול עם רשימת פעולות ומאפייני בדיקה (IP01; MPLA, PLMK), פקודה עם מפתח " +
          "בקרה לבדיקה ומנת בדיקה (IP30; AUFK, QALS), רישום תוצאות, החלטת שימוש (QA11; QAVE) ועדכון סטטוס המכשיר; " +
          "טרנזקציות IP01, IP30, QE11, QA11, IE02, QGA2; Fiori: Record Inspection Results, Manage Inspection Lots.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-calibration-process",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים (QM מול PP-PI ו-PM), ממתינה לסקירת עורך אנושי. כל שדה בפרופיל נגזר מרשומות המאגר " +
      "הנקובות בלבד. פערים גלויים: לא אותר עמוד SAP רשמי שכבר אומת בשכבות האימות לתהליך הבדיקה בייצור, ולכן " +
      "ההפניה הרשמית ריקה ואף טענה כאן אינה ברמת תיעוד רשמי; לאף אחת מטרנזקציות ה-QM אין רשומת אימות רשמית. שדה " +
      "kpis הושמט: המאגר מזכיר quality score ברשומת QA11 בלי להגדירו כמדד. טבלאות ה-QM (QALS, ‏QAMR, ‏QASR, ‏QAVE, " +
      "‏QAMV, ‏MCHB), מודולי ה-BAPI של ה-QM וה-Exit‏ QEVA0001 אינם במילון הפרויקט ולכן מופיעים בפרוזה בלבד. המאגר " +
      "נוקב בסוגי בדיקה 01 ו-04 לקבלה ובמקור 03 לבדיקה תוך-תהליכית, אך אינו מגדיר את סוג 04 ואינו מתעד את " +
      "ההגדרה ברמת סוג הפקודה ליצירת מנה בייצור; שני אלה דורשים אימות במערכת SAP. אין מזהה Fiori מאומת " +
      "לאפליקציות ה-QM. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ========================================== material staging and reservations */
  {
    slug: "material-staging-and-reservation",
    he: "רכיבים לפקודה: רזרבציה, אספקה לקו וניפוק לפקודות תחזוקה ותהליך, כולל Backflush ו-COGI",
    en: "Material staging and reservation: components for maintenance and process orders, goods issue and backflush",
    module: "Cross",
    summary:
      "רכיבי פקודה מיוצגים ברזרבציה (RESB), שמזינה את MRP ושומרת את הזמינות. הרכיב מגיע לפקודה בניפוק ידני " +
      "(261) ב-MIGO, בליקוט מרוכז, או אוטומטית ב-Backflush באישור; תנועות שנכשלו נאספות ב-COGI. בפקודת תחזוקה " +
      "רכיב מלאי יוצר רזרבציה ורכיב שאינו מלאי יוצר דרישת רכש.",
    context:
      "לפי רשומות המאגר, רזרבציות לפקודות נוצרות אוטומטית מרכיבי הפקודה, ורזרבציה ידנית נוצרת ב-MB21 או " +
      "ב-BAPI_RESERVATION_CREATE1; שתיהן נשמרות ב-RESB, ורשומת ההעשרה מונה את BDMNG (כמות דרושה), ENMNG (כמות " +
      "שנמשכה), BWART ודגלי ה-Backflush וה-Final Issue. בתחזוקה, רשומת התחום 'אינטגרציית חלפים' מבחינה בין רכיב " +
      "מלאי (רזרבציה וניפוק) לרכיב שאינו מלאי (דרישת רכש, EBAN ו-EBKN). בתעשיות תהליכיות, זרימת התהליך של המאגר " +
      "מציבה את הזנת החומר (261) לפני האישור, וה-Backflush רושם 261 אוטומטית באישור. תיעוד SAP הרשמי לגרסת 2025 " +
      "FPS01 מתאר את פריטי הרזרבציה כתנועות מתוכננות, ומתעד שירות OData ליצירה, קריאה, עדכון ומחיקה של מסמכי " +
      "רזרבציה לצד ה-BAPI.",
    steps: [
      {
        he: "לתכנן רכיבים בפקודה: בתחזוקה ב-IW31 או IW32, בהזמנת תהליך מפיצוץ עץ המוצר ב-COR1; הרכיבים נשמרים כרזרבציה ב-RESB.",
        xrefs: ["tx:IW31", "tx:IW32", "tx:COR1", "table:RESB", "obj:reservation"],
      },
      {
        he: "בתחזוקה: רכיב מלאי יוצר רזרבציה, ורכיב שאינו מלאי יוצר דרישת רכש (EBAN, ‏EBKN) שנסגרת בקבלת טובין או שירות לפקודה.",
        xrefs: ["table:EBAN", "table:EBKN", "bp:maintenance-order-process"],
      },
      {
        he: "לרזרבציה ידנית (לפקודה, למרכז עלות או לפרויקט): MB21, או BAPI_RESERVATION_CREATE1 ואחריו BAPI_TRANSACTION_COMMIT; סוג התנועה בכותרת קובע את היעד.",
        xrefs: ["tx:MB21", "fm:BAPI_RESERVATION_CREATE1", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
      },
      {
        he: "לבדוק זמינות ולעקוב אחרי הרזרבציה כדרישה ב-MD04; לשנות ב-MB22 ולהציג ב-MB23 או באיתור רחב ב-MB25.",
        xrefs: ["tx:MD04", "tx:MB22", "tx:MB23", "tx:MB25"],
      },
      {
        he: "לספק לקו: CO27 לליקוט וניפוק מרוכז של רכיבי פקודות, ובייצור החוזר Pull List ב-MF60; להבחין מראש בין רכיבי Backflush לרכיבי ליקוט ידני.",
        xrefs: ["tx:CO27", "tx:MF60"],
      },
      {
        he: "לנפק לפקודה בתנועה 261 ב-MIGO (או ב-MB1A הישנה), מול הרזרבציה; הניפוק מסמן את הרזרבציה כנצרכת (ENMNG הכמות שנמשכה), מקטין מלאי ומחייב את הפקודה בעלות.",
        xrefs: ["tx:MIGO", "tx:MB1A", "fm:BAPI_GOODSMVT_CREATE", "bp:goods-movement-process"],
      },
      {
        he: "ברכיבי Backflush: הצריכה נרשמת אוטומטית באישור, ותנועות שנכשלו (חוסר מלאי, אצווה, תקופה) מטופלות ב-COGI אחרי תיקון הסיבה.",
        xrefs: ["tx:COR6N", "tx:CO11N", "tx:COGI", "tx:MF47", "bp:confirmation-process"],
      },
      {
        he: "לפני סגירה טכנית: לסמן Final Issue או להשלים צריכה, לנקות את COGI, ולבדוק ב-CO46 וב-MD04 שלא נותרו רזרבציות פתוחות.",
        xrefs: ["tx:CO46", "tx:COGI", "tx:MD04", "tx:COR2"],
      },
    ],
    antiPatterns: [
      "ניפוק ידני של רכיב שמוגדר גם כ-Backflush: צריכה כפולה של אותו רכיב.",
      "רזרבציות פתוחות שלא נוצלו: MRP ממשיך לתכנן עליהן ומעוות את הדרישה.",
      "סגירה טכנית כשתנועות Backflush עדיין ב-COGI: שאריות עלות וצריכה לא נרשמו.",
      "מחיקה ידנית של רשומות כשל במקום עיבוד מחדש ב-COGI: הן מייצגות תנועות מלאי אמיתיות שחסרות.",
      "קריאה ל-BAPI_RESERVATION_CREATE1 בלי בדיקת RETURN ובלי COMMIT.",
    ],
    checks: [
      "חיובי: רכיב מלאי, רזרבציה, ניפוק 261 ועלות בפקודה.",
      "שלילי: חוסר מלאי מפיל את הניפוק.",
      "אינטגרציה: רכיב שאינו מלאי, דרישת רכש, הזמנת רכש, קבלה ועלות לפקודה.",
      "רגרסיה: ביטול אישור מהפך את הרזרבציה ואת הניפוק.",
      "Backflush: אישור צורך את RESB, חוסר מלאי מוביל ל-COGI, ו-COGI מתקן בלי כפילות.",
      "ברצף BAPI: רזרבציה קיימת ב-RESB אחרי COMMIT, ומשיכה מולה ב-MB1A או ב-MIGO.",
    ],
    process: {
      purpose:
        "לשריין ולספק את הרכיבים שפקודת תחזוקה או הזמנת תהליך צריכה, לרשום את צריכתם לפקודה בתנועה 261 (ידנית " +
        "או ב-Backflush) ולשייך את עלותם לפקודה, כך שהחלק זמין בזמן והמלאי והתכנון נשארים נכונים.",
      trigger: [
        { he: "תכנון רכיבים בפקודת תחזוקה או פיצוץ עץ המוצר ביצירת הזמנת תהליך.", xrefs: ["tx:IW31", "tx:COR1"] },
        { he: "צורך עתידי שאינו מפקודה: רזרבציה ידנית למרכז עלות, להזמנה או לפרויקט.", xrefs: ["tx:MB21"] },
        { he: "שחרור הפקודה ותחילת משמרת: ליקוט ואספקה לקו.", xrefs: ["tx:CO27", "tx:MF60"] },
        { he: "אישור פקודה עם רכיבי Backflush.", xrefs: ["tx:COR6N", "tx:CO11N"] },
      ],
      preconditions: [
        { he: "נתוני אב חומר במפעל ומיקום אחסון; לפי רשומת ה-BAPI, רזרבציה נכשלת לחומר שאינו מנוהל מלאי או בלי מיקום אחסון.", xrefs: ["fm:BAPI_RESERVATION_CREATE1"] },
        { he: "מלאי זמין ולא חסום, ואצווה כשהחומר מנוהל אצוות.", xrefs: ["table:MARD", "table:MCH1"] },
        { he: "תקופת רישום פתוחה ב-MM.", xrefs: ["tx:MMRV", "tx:MMPV"] },
        { he: "לאספקה לקו בייצור החוזר: אזור אספקה ו-Control Cycle מוגדרים (LPK1 אינה במילון הפרויקט)." },
      ],
      masterData: [
        { he: "סוג פריט בעץ המוצר או ברכיב (מלאי או לא-מלאי) ורלוונטיות הרזרבציה.", xrefs: ["table:STPO", "table:MAST"] },
        { he: "דגל Backflush באב החומר או במרכז העבודה, לפי רשומות התחום.", xrefs: ["obj:work-center"] },
        { he: "סוג תנועה (201, ‏261, ‏281, ‏921 לפי רשומת MB21) הקובע את יעד הרזרבציה." },
        { he: "ניהול אצוות וקביעת אצווה לרכיב.", xrefs: ["obj:batch"] },
      ],
      roles: [
        { he: "מתכנן ייצור, מתכנן חומרים, איש תחזוקה ומנהל פרויקט: רזרבציה ידנית ומעקב, לפי רשומות MB21 ו-MB25.", xrefs: ["tx:MB21", "tx:MB25"] },
        { he: "מנהל מחסן ייצור ומפעיל: ליקוט וניפוק לפקודה, לפי רשומת CO27; ספק קו (Line feeder) ב-Pull List לפי רשומת MF60.", xrefs: ["tx:CO27", "tx:MF60"] },
        { he: "מחסנאי ופקיד מלאי: ניפוק ב-MIGO, לפי רשומת MIGO.", xrefs: ["tx:MIGO"] },
        { he: "מנהל עבודה, תמיכת PP ומתכנן מלאי: טיפול ב-COGI, לפי רשומת COGI.", xrefs: ["tx:COGI"] },
      ],
      transactions: [
        { he: "רזרבציה: MB21 יצירה, ‏MB22 שינוי, ‏MB23 תצוגה, ‏MB24 ו-MB25 דוחות, ‏MB26 רשימת ליקוט.", xrefs: ["tx:MB21", "tx:MB22", "tx:MB23", "tx:MB24", "tx:MB25", "tx:MB26"] },
        { he: "אספקה לקו: CO27 ליקוט רכיבי פקודות, ‏MF60 Pull List בייצור החוזר.", xrefs: ["tx:CO27", "tx:MF60"] },
        { he: "ניפוק: MIGO, ו-MB1A הישנה.", xrefs: ["tx:MIGO", "tx:MB1A"] },
        { he: "Backflush וכשלים: COR6N ו-CO11N באישור, ‏COGI ו-MF47 לעיבוד מחדש, ‏CO46 לפערי צריכה.", xrefs: ["tx:COR6N", "tx:CO11N", "tx:COGI", "tx:MF47", "tx:CO46"] },
        { he: "בקרה: MD04 דרישות ומלאי, ‏MMBE סקירת מלאי, ‏MB51 תנועות.", xrefs: ["tx:MD04", "tx:MMBE", "tx:MB51"] },
        { he: "Fiori: רשומות המאגר נקבו ב-Manage Reservations‏ (F1622), מזהה שאינו בספריית ה-Fiori; מ-2026-09-24 רשומת MB21 מפנה ל-Manage Manual Reservations (F4839), כפי שהספרייה מציינת (MB21 מובילה, MB22 ו-MB23 קשורות); ‏Stage Materials for Production ו-Post Goods Movement; F4839 אינו בקטלוג הפרויקט ולכן אינו מקושר, ו-F0843 מקושר כרשומת קטלוג בלבד.", xrefs: ["fiori:F0843"] },
      ],
      tables: [
        { he: "RESB פריטי הרזרבציה (BDMNG, ‏ENMNG, ‏BWART, ‏XLOEK, ‏KZEAR ודגלי Backflush); כותרת הרזרבציה RKPF אינה במילון הפרויקט.", xrefs: ["table:RESB"] },
        { he: "AFKO ו-AFPO כותרת ופריט של הזמנת התהליך; EBAN ו-EBKN דרישת הרכש לרכיב שאינו מלאי.", xrefs: ["table:AFKO", "table:AFPO", "table:EBAN", "table:EBKN"] },
        { he: "MKPF ו-MSEG מסמך החומר של הניפוק, שב-S/4HANA הן תצוגות תאימות מעל MATDOC; AFFW, טבלת הכשלים של COGI, אינה במילון הפרויקט.", xrefs: ["table:MKPF", "table:MSEG"] },
        { he: "תצוגות ה-CDS של רכיבי פקודה, שמפת ה-CDS של המאגר ממפה ל-RESB, ותצוגת פריטי מסמך החומר.", xrefs: ["cds:I_ProductionOrderComponent", "cds:I_MfgOrderComponent", "cds:I_MaterialDocumentItem"] },
        { he: "האובייקטים העסקיים רזרבציה, מסמך חומר, פקודת תחזוקה והזמנת תהליך.", xrefs: ["obj:reservation", "obj:material-document", "obj:maintenance-order", "obj:process-order"] },
      ],
      integrationPoints: [
        { he: "PM אל MM: רזרבציה וניפוק לרכיב מלאי, דרישת רכש לרכיב שאינו מלאי; שתי העלויות נצברות בפקודה ומותחשבנות.", xrefs: ["bp:maintenance-order-process", "bp:order-settlement-process"] },
        { he: "רזרבציה אל MRP: הרזרבציה מופיעה כדרישה ב-MD04 ומשפיעה על המלאי הזמין.", xrefs: ["tx:MD04", "bp:mrp-process"] },
        { he: "אישור למלאי: Backflush רושם 261 אוטומטית, וכשלים עוברים ל-COGI.", xrefs: ["bp:confirmation-process", "tx:COGI"] },
        { he: "ממשק תוכניתי: BAPI_RESERVATION_CREATE1 ו-RESERVATION_READ לרזרבציה, ‏BAPI_GOODSMVT_CREATE לניפוק, ‏BAPI_ALM_ORDER_MAINTAIN עם שיטת COMPONENT לרכיבי פקודת תחזוקה; אחרי כתיבה BAPI_TRANSACTION_COMMIT.", xrefs: ["fm:BAPI_RESERVATION_CREATE1", "fm:RESERVATION_READ", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_TRANSACTION_COMMIT"] },
        { he: "שירות OData רשמי: Reservation Document (API_RESERVATION_DOCUMENT) ליצירה, קריאה, עדכון ומחיקה של מסמכי רזרבציה." },
        { he: "הרחבות לפי רשומות המאגר: IWO10009 בפקודת התחזוקה, ‏MBCF0002 ו-MB_MIGO_BADI בתנועת החומר, ‏WORKORDER_GOODSMVT בתנועות הפקודה, ‏CONFPP05 ו-PPCO0001 בצד הייצור.", xrefs: ["enh:exit:IWO10009", "enh:exit:MBCF0002", "enh:badi:MB_MIGO_BADI", "enh:badi:WORKORDER_GOODSMVT", "enh:exit:CONFPP05", "enh:exit:PPCO0001"] },
        { he: "ממשק פרויקטלי: ה-blueprint של PP-PI מציין סנכרון עם מסופי Zetes בפליטה, בלי פירוט הממשק." },
      ],
      outputs: [
        { he: "רזרבציה פתוחה ב-RESB, ודרישה ב-MRP.", xrefs: ["table:RESB"] },
        { he: "מסמך חומר 261 לפקודה, שב-S/4HANA נרשם ל-MATDOC; הרזרבציה מסומנת כנצרכת.", xrefs: ["obj:material-document"] },
        { he: "עלות בפועל של הרכיבים בפקודה." },
      ],
      exceptions: [
        { he: "אספקה לקו נכשלה: אזור אספקה או Control Cycle חסרים, או שהרזרבציה לא הופקה (תקרית material-staging-bom-failed).", xrefs: ["tx:MF60", "tx:COR3", "tx:MD04", "tx:MB25"] },
        { he: "סגירה טכנית חסומה או רזרבציות פתוחות אחרי TECO כשרכיבים לא נצרכו ו-Final Issue לא סומן (תקרית teco-blocked-open-reservation).", xrefs: ["tx:COR2", "tx:MD04", "tx:CO46", "tx:MB26"] },
        { he: "תנועות Backflush תקועות ב-COGI בגלל חוסר מלאי, אצווה חסומה או תקופה סגורה (תקרית cogi-stuck).", xrefs: ["tx:COGI", "tx:MMBE", "tx:MB52", "tx:MMRV"] },
        { he: "ניפוק נדחה בחוסר מלאי, אצווה שגויה, מלאי חסום או תקופה סגורה (תקרית goods-movement-stock, הודעה M7021).", xrefs: ["tx:MIGO", "tx:MMBE"] },
        { he: "רכיב במלאי בדיקת QM ולא במלאי חופשי (תקרית qm-inspection-lot-block).", xrefs: ["bp:quality-inspection-in-production"] },
      ],
      controls: [
        { he: "ניקוי תקופתי של רזרבציות פתוחות ישנות (MB25 ואז MB22), לפי רשומת MB25.", xrefs: ["tx:MB25", "tx:MB22"] },
        { he: "ניטור COGI יומי ושאיפה לאפס, ופתרון שורש הכשל לפני עיבוד מחדש.", xrefs: ["tx:COGI"] },
        { he: "הגדרת Backflush נכונה כדי למנוע ליקוט כפול.", xrefs: ["tx:CO27"] },
        { he: "בדיקת רזרבציות פתוחות לפני TECO, ו-Final Issue בדיווח הגמר, לפי רשומת התקרית.", xrefs: ["tx:CO46"] },
        { he: "Pull List לפני תחילת משמרת ולא במהלכה.", xrefs: ["tx:MF60"] },
      ],
      eccToS4: [
        { he: "מודל RESB זהה, וה-blueprint מסמן את RESB 'ללא שינוי (תואם)'; תיעוד SAP הרשמי לגרסת 2025 FPS01 מתאר רזרבציות ידניות ורזרבציות תלויות.", xrefs: ["table:RESB"] },
        { he: "תנועות הניפוק נרשמות ב-S/4HANA ל-MATDOC, ו-MKPF ו-MSEG הן תצוגות תאימות.", xrefs: ["table:MKPF", "table:MSEG", "bp:matdoc-read-through-compatibility"] },
        { he: "לפי פריט הפישוט של MM-IM, ‏MB1A בין טרנזקציות ה-MB שהוחלפו ב-MIGO וב-BAPI_GOODSMVT_CREATE.", xrefs: ["tx:MB1A", "tx:MIGO", "fm:BAPI_GOODSMVT_CREATE"] },
        { he: "לצד BAPI_RESERVATION_CREATE1 מתועד שירות OData רשמי למסמכי רזרבציה; לא נמצא מקור רשמי המוציא את ה-BAPI משימוש.", xrefs: ["fm:BAPI_RESERVATION_CREATE1"] },
        { he: "מנגנון ה-Backflush ו-COGI קיים בשתי המערכות; התנועות מ-COGI נרשמות ל-MATDOC.", xrefs: ["tx:COGI"] },
        { he: "בסביבות EWM ה-staging מנוהל ב-EWM, לפי רשומת MF60.", xrefs: ["tx:MF60"] },
      ],
      migration: [
        { he: "RESB ו-EBAN נשמרות ותנועות עוברות ל-MATDOC; בדיקה לאחר המרה: רזרבציה, ניפוק ודרישת רכש לספק כשותף עסקי.", xrefs: ["table:RESB", "table:EBAN"] },
        { he: "בדיקת Backflush ו-COGI לאחר המרה, לפי רשומת התחום.", xrefs: ["tx:COGI"] },
        { he: "בחיתוך מנקים תנועות פתוחות ב-COGI, לפי שלב החיתוך ברשומה bp:ecc-to-s4hana-migration-process.", xrefs: ["bp:ecc-to-s4hana-migration-process", "tx:COGI"] },
        { he: "בקוד קיים לאמת ב-SE37 את שמות הפרמטרים של BAPI_RESERVATION_CREATE1: רשומות המאגר חלוקות ביניהן.", xrefs: ["fm:BAPI_RESERVATION_CREATE1"] },
      ],
      reference: {
        title: "Reservations | Inventory Management and Inventory (MM-IM) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/37485192f5d746f2bfe85d9ad00bebf3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note:
          "עמוד הרזרבציות בתיעוד ניהול המלאי (אומת ברשומת table:RESB). היקפו הרזרבציה עצמה; עמוד רשמי המכסה את " +
          "אספקת החומר לקו ואת ה-Backflush לא אותר בשכבות האימות. פריט SAP Best Practices (Scope Item) לתהליך " +
          "לא אותר ואינו נרשם.",
      },
    },
    xrefs: [
      "table:RESB", "table:AFKO", "table:AFPO", "table:EBAN", "table:EBKN", "table:MKPF", "table:MSEG",
      "table:MARD", "table:MCH1", "table:STPO", "table:MAST",
      "tx:MB21", "tx:MB22", "tx:MB23", "tx:MB24", "tx:MB25", "tx:MB26", "tx:CO27", "tx:MF60", "tx:MIGO",
      "tx:MB1A", "tx:COGI", "tx:MF47", "tx:CO46", "tx:MD04", "tx:MMBE", "tx:MB51", "tx:MB52", "tx:MMRV",
      "tx:MMPV", "tx:IW31", "tx:IW32", "tx:COR1", "tx:COR2", "tx:COR3", "tx:COR6N", "tx:CO11N",
      "fm:BAPI_RESERVATION_CREATE1", "fm:RESERVATION_READ", "fm:BAPI_GOODSMVT_CREATE",
      "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_TRANSACTION_COMMIT",
      "cds:I_ProductionOrderComponent", "cds:I_MfgOrderComponent", "cds:I_MaterialDocumentItem",
      "fiori:F0843",
      "obj:reservation", "obj:material-document", "obj:maintenance-order", "obj:process-order", "obj:batch",
      "obj:work-center",
      "enh:exit:IWO10009", "enh:exit:MBCF0002", "enh:badi:MB_MIGO_BADI", "enh:badi:WORKORDER_GOODSMVT",
      "enh:exit:CONFPP05", "enh:exit:PPCO0001",
      "bp:goods-movement-process", "bp:confirmation-process", "bp:maintenance-order-process",
      "bp:order-settlement-process", "bp:quality-inspection-in-production", "bp:mrp-process",
      "bp:bapi-commit-discipline", "bp:matdoc-read-through-compatibility", "bp:ecc-to-s4hana-migration-process",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום ופירוט התחום 'אינטגרציית חלפים (PM-MM)' של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אינטגרציית חלפים מחברת אחזקה לרכש ומלאי: רכיבי פקודה, רזרבציה (RESB), דרישת רכש (EBAN), משיכת חומר " +
          "(MB1A), צריכה בפקודה; טרנזקציות IW31, MB1A, ME21N, IW3M, MB21; BAPIs BAPI_RESERVATION_CREATE1, " +
          "BAPI_PR_CREATE, BAPI_GOODSMVT_CREATE. רכיב מלאי: רזרבציה ו-GI; לא-מלאי: דרישת רכש (EBKN/EBAN). משיכה " +
          "(261) מקטינה מלאי ומחייבת את הפקודה. הרחבות IWO10009, MBCF0002, WORKORDER_GOODSMVT, MB_MIGO_BADI. QA: " +
          "רכיב מלאי, רזרבציה, GI 261, עלות; חוסר מלאי מפיל GI; לא-מלאי, PR, PO, קבלה; ביטול אישור מהפך רזרבציה " +
          "ו-GI. ECC מול S/4: מודל RESB/EBAN זהה, תנועות ל-MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-spare-parts",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום ופירוט התחום 'דיווח-לאחור (Backflush)' של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "Backflush הוא צריכת רכיבים אוטומטית בעת אישור הפקודה במקום GI ידני, מוגדר באב החומר או במרכז העבודה; " +
          "כשלים (מלאי, אצווה) נופלים ל-AFFW ומטופלים ב-COGI. טבלאות RESB, AFFW, MSEG, MATDOC; טרנזקציות COR6N, " +
          "CO11N, COGI, MF47. הרחבות CONFPP05, MBCF0002, WORKORDER_GOODSMVT, MB_MIGO_BADI. QA: אישור עם Backflush " +
          "צורך RESB, חוסר מלאי ל-COGI, COGI מתקן בלי כפילות. הגירה: RESB/AFFW נשמרים, תנועות ל-MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-backflush",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PM), נושא 9 'אינטגרציית מלאי ורכש (PM-MM)', שורת RESB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "PM: RESB 'הזמנת רכיבים (Reservation)', טרנזקציות 'MB1A/MIGO; MB21, IW32', עמודת S/4 'ללא שינוי " +
          "(תואם)', 'RESB (זהה)', פונקציות BAPI_RESERVATION_CREATE1, BAPI_GOODSMVT_CREATE (פליטת חומר 261) " +
          "ו-RESERVATION_READ, תוכנית RM07RESL; הערת SUM: ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:RESB",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PP-PI), נושא 6, שורת RESB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "שורת RESB ב-PP-PI: טרנזקציות 'COR3, MB21, MB22, CO27', Fiori 'Manage Reservations', הערת S/4 'ללא " +
          "שינוי; תנועת מלאי ב-MATDOC', והסבר: הזמנות חומרי הגלם והאריזה לפק\"ע מפיצוץ עץ המוצר, כל פליטת חומר " +
          "(261) מעדכנת RESB, סנכרון עם מסופי Zetes בפליטה; פונקציות BAPI_RESERVATION_CREATE1 ו-BAPI_GOODSMVT_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#PP-PI:RESB",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת RESB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "RESB: רכיבי החומר של הזמנות ייצור, תהליך ואחזקה ודרישות תלויות מ-MRP; BDMNG כמות דרושה, ENMNG שנמשכה, " +
          "BWART סוג תנועה ודגלי backflush ומסירה; סינון XLOEK (מחיקה) ו-KZEAR (Final Issue); משיכת רכיב בתנועה " +
          "261, שגיאות ל-COGI/AFFW.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#RESB",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין האובייקטים של הפרויקט (OBJECT_INTEL): רשומת RESB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "RESB נוצרת בפקודה (CO01/COR1/IW31) וב-MRP, נקראת ב-MB21/CO27 וב-MD04, ומתעדכנת בניפוק (MB1A/MIGO), " +
          "באישור (CO11N) וב-backflush. המלצות: לסגור או למחוק רזרבציות פתוחות שלא נוצלו כדי למנוע עיוות ב-MRP, " +
          "לעקוב אחר XLOEK ו-KZEAR, להגדיר נכון Movement Type ו-Reservation relevance ב-Item Category של ה-BOM, " +
          "ולתאם בין Final Issue לסגירת הפקודה.",
        verificationLevel: "repository_verified",
        repoRef: "data/knowledge/object-intel.ts#RESB",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההעשרה של ה-BAPIs של הפרויקט (PP-PI): BAPI_RESERVATION_CREATE1",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "BAPI_RESERVATION_CREATE1: אובייקט BUS2093, טבלאות RESB ו-RKPF, טרנזקציה MB21, פרמטרים 'IMP " +
          "RESERVATION_GENERAL_DATA · TAB RESERVATION_ITEMS, RETURN · EXP RESERVATION', קשורים BAPI_GOODSMVT_CREATE " +
          "ו-BAPI_TRANSACTION_COMMIT; שמות הפרמטרים שונים מאלה שברשומת FUNCTION_INTEL.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_RESERVATION_CREATE1",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההעשרה של ה-BAPIs של הפרויקט (PM): BAPI_ALM_ORDER_MAINTAIN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "BAPI_ALM_ORDER_MAINTAIN: יצירה ושינוי של פקודת אחזקה עם פעולות ורכיבים דרך IT_METHODS ‏(HEADER, " +
          "OPERATION, COMPONENT, RELEASE, TECHNICALCOMPLETE, SAVE) ו-IT_COMPONENT; רצף HEADER לפני " +
          "OPERATION/COMPONENT, שורת SAVE בסוף, ואחריו BAPI_TRANSACTION_COMMIT; טבלאות AUFK, AFIH, AFVC, RESB.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות MB21, MB25, CO27, MF60 ו-COGI",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MB21: רזרבציה ידנית (RKPF/RESB), רזרבציות מפקודות נוצרות אוטומטית, סוג התנועה (201/261/281/921) קובע " +
          "את היעד, מופיעה ב-MD04 כדרישה; Fiori 'Manage Reservations (F1622)' (כך עד 2026-09-24; כעת Manage Manual Reservations (F4839) לפי ספריית ה-Fiori); משתמשים: מתכנן ייצור, מתכנן חומרים, " +
          "איש תחזוקה, מנהל פרויקט. MB25: דוח רזרבציות לניקוי תקופתי עם MB22. CO27: ליקוט וניפוק 261 מרוכז לפי " +
          "RESB, להבחין בין רכיבי Backflush לליקוט ידני; Fiori 'Stage Materials for Production'. MF60: Pull List " +
          "בייצור החוזר, דורש אזורי אספקה ו-Control Cycles, להריץ לפני משמרת; ב-EWM ה-staging מנוהל ב-EWM. COGI: " +
          "עיבוד מחדש של תנועות שנכשלו מ-AFFW, לנטר יומית, לא למחוק שורות AFFW ידנית; ב-S/4 התנועות ל-MATDOC. " +
          "משתמשים: CO27 מנהל מחסן ייצור ומפעיל; MF60 מתכנן ייצור, איש לוגיסטיקה וספק קו; MIGO מחסנאי ופקיד מלאי; " +
          "COGI מנהל עבודה, תמיכת PP ומתכנן מלאי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB21",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין מודולי הפונקציה של הפרויקט (FUNCTION_INTEL): BAPI_RESERVATION_CREATE1 ו-BAPI_GOODSMVT_CREATE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "BAPI_RESERVATION_CREATE1: יצירת רזרבציה לרכיבים מהמחסן; קלט RESERVATIONHEADER (סוג תנועה, פקודה או " +
          "מרכז עלות) ו-RESERVATIONITEMS; פלט RESERVATION ו-RETURN, וחובה BAPI_TRANSACTION_COMMIT אחרי הצלחה; " +
          "כשלים: חומר לא מנוהל מלאי, מיקום אחסון חסר; זמין ב-ECC וב-S/4HANA. BAPI_GOODSMVT_CREATE: קוד תנועה 03 " +
          "ל-GI לפקודה, סוג תנועה 261/101, פלט MATERIALDOCUMENT ו-RETURN עם COMMIT; כשלים: מלאי חסר, תקופה סגורה, " +
          "אצווה חסרה.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_RESERVATION_CREATE1",
      },
      {
        sourceType: "repository",
        sourceTitle: "זרימת התהליך של תעשיות תהליכיות במאגר: שלבים s6 (הזנת חומר) ו-s8 (Backflush)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "s6: הזנת חומר לייצור (Material Staging / GI 261) ב-MIGO, טבלאות MATDOC, RESB, MSEG; מסמך חומר 261, " +
          "RESB מסומנת כנצרכה ועלות בפועל לפקודה; טעויות: GI נכשל בחוסר מלאי או תקופה סגורה, ניפוק ידני של רכיב " +
          "Backflush גורם לצריכה כפולה. s8: מסמכי 261 אוטומטיים, כשלים ב-AFFW לתיקון ב-COGI; טעויות: תנועות " +
          "תקועות, דגל Backflush חסר.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-process-flow.ts#s6",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: material-staging-bom-failed ו-teco-blocked-open-reservation",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "אספקת חומרים לקו נכשלה: ב-MF60 אין transfer requirements; סיבות: אזור אספקה לא מוקצה, Control Cycle " +
          "(LPK1) חסר, מיקום ייצור לא נקבע, רזרבציה לא הופקה; ניתוח MF60, COR3, MD04, LPK1, MB25. סגירה טכנית " +
          "חסומה בגלל רזרבציה פתוחה: רכיבים לא נצרכו ו-Final Issue לא הוגדר, Backflush תקוע ב-COGI; ניתוח COR2, " +
          "MD04, CO46, COGI, MB26; תיקון: השלמת צריכה או Final Issue, טיפול ב-COGI לפני TECO; מניעה: Job ל-CO46 " +
          "לפני TECO וניקוי COGI יומי.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#material-staging-bom-failed",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט: I_ProductionOrderComponent ו-I_MfgOrderComponent",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "I_ProductionOrderComponent 'רכיבי פקודת ייצור (הזמנות מלאי)' ממופה לטבלה RESB; I_MfgOrderComponent " +
          "'רכיבי פקודה / שמורות' ממופה ל-RESB ול-AFFH.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_ProductionOrderComponent",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reservations | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/37485192f5d746f2bfe85d9ad00bebf3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_01,
        claim:
          "פריטי רזרבציה (Reservation Items) מתארים תנועות מתוכננות בודדות (חומר, כמות, תאריך דרישה); רזרבציות " +
          "ידניות ורזרבציות תלויות קיימות שתיהן ב-2025 FPS01 (אומת ברשומת table:RESB).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reservation Document Header | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/2790e3a21e8a4a98832d8bbb8b1e638a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_02,
        claim:
          "קיים API רשמי ב-APIs for Inventory, Reservation Document, עם הפעולות הנתמכות Retrieve / Create / Update " +
          "/ Delete Reservation Document (אומת ברשומת table:RESB).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reservation Document | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/5186af9bebab426984f5c399a5b2664b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim:
          "עמוד השירות Reservation Document (2025 FPS01) נוקב בשם הטכני 'API_RESERVATION_DOCUMENT' ומונה את " +
          "הפעולות Read, Create ו-Update Reservation Document ו-Delete Reservation, עם המגבלה 'Only authorized roles " +
          "can be used to retrieve, create and delete reservation' (התקציר נקטע שם). התקציר אינו מזכיר את " +
          "BAPI_RESERVATION_CREATE1 ואינו קובע יחס בינו לבין השירות (אומת ברשומת fm:BAPI_RESERVATION_CREATE1).",
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
          "פריט 27.6 (עמ' 644-645) קובע שטרנזקציות ה-MB לרישום ולהצגה של תנועות סחורה, ובהן MB1A, הוחלפו ב-MIGO " +
          "או במודולי הפונקציה BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL, ובסעיף הפתרון מורה להחליף קוד לקוח " +
          "הקורא להן (למשל CALL TRANSACTION MBxy) בשימוש ב-BAPI_GOODSMVT_CREATE (אומת ברשומת " +
          "fm:BAPI_GOODSMVT_CREATE).",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים (PM ו-PP-PI מול MM), ממתינה לסקירת עורך אנושי. כל שדה בפרופיל נגזר מרשומות המאגר " +
      "הנקובות או מעמוד רשמי שכבר אומת ברשומות table:RESB, ‏fm:BAPI_RESERVATION_CREATE1 ו-fm:BAPI_GOODSMVT_CREATE. " +
      "הרשומה מקשרת אל bp:goods-movement-process ואל bp:confirmation-process במקום לשכפל את פירוט התנועות והאישור. " +
      "פערים גלויים: שדה kpis הושמט, המאגר אינו מתעד מדדי ביצוע לאספקת חומר. RKPF, ‏AFFW, ‏MATDOC, ‏PVBE, ‏LPK1 " +
      "ו-IW3M אינם במילון הפרויקט ולכן מופיעים בפרוזה בלבד. מזהה Fiori‏ F1622 (Manage Reservations) הגיע " +
      "מרשומות tx-intel בלבד ואינו בקטלוג הפרויקט (עדכון 2026-09-24: המזהה אינו בספריית ה-Fiori, ו-tx-intel מפנה כעת ל-F4839 Manage Manual Reservations); F0843 מקושר כרשומת קטלוג ולא כחלופה ל-MIGO (ראו הערות " +
      "bp:goods-movement-process). הטרנזקציות MB21 עד MB26, ‏CO27 ו-MF60 אינן נושאות רשומת אימות רשמית. רשומות " +
      "המאגר חלוקות בשמות הפרמטרים של BAPI_RESERVATION_CREATE1, ורשומת RESERVATION_READ מסומנת inferred. סנכרון " +
      "Zetes מוזכר ב-blueprint בלי פירוט. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ================================================== sales demand to production */
  {
    slug: "sales-demand-to-production",
    he: "מביקוש מכירות לייצור: הזמנת לקוח, בדיקת זמינות, אסטרטגיית תכנון וצריכת תחזית עד פקודת הייצור",
    en: "Sales demand to production: sales order, availability check, planning strategy and forecast consumption up to the order",
    module: "Cross",
    summary:
      "הזמנת לקוח ב-SD היא ביקוש, ואסטרטגיית התכנון של החומר קובעת מה נעשה בו: בייצור-למלאי ההזמנה נמשכת מהמלאי " +
      "או צורכת את התחזית (PIR), ובייצור-להזמנה היא עצמה מניעה את הייצור. בדיקת הזמינות בהזמנה, צריכת התחזית וריצת " +
      "ה-MRP הן נקודות המסירה שבהן הביקוש עובר מ-SD ל-PP ול-PP-PI, עד הזמנה מתוכננת ופקודת ייצור או תהליך.",
    context:
      "לפי מפות התהליך של המאגר, בצד SD הזמנת הלקוח נקלטת ב-VA01 (טבלאות VBAK ו-VBAP) ועוברת בדיקת זמינות (CO09, טבלת " +
      "VBBE); בצד הייצור הביקוש המתוכנן נקלט כ-PIR ב-MD61 וב-MD62 בגרסה 00, ה-MRP (MD01N, ‏MD04) יוצר הזמנות מתוכננות, " +
      "והן מומרות לפקודת ייצור או תהליך (CO01, ‏COR1). לפי רשומת התחום, אסטרטגיית התכנון נקבעת ב-Strategy Group בנתוני " +
      "MRP3 של החומר ומבוססת על Requirements Types, וטבלת האסטרטגיות של מרכז ה-MRP מונה את 10, ‏11, ‏20, ‏40, ‏50 ו-70. " +
      "לפי רשומות המאגר האסטרטגיות זהות ב-ECC וב-S/4HANA, והשינוי הוא בבדיקת הזמינות: לפי נושא המעבר, ב-S/4HANA פועלת " +
      "בדיקת זמינות מתקדמת (aATP) עם Back-Order Processing, ‏Product Allocation ו-Release for Delivery.",
    steps: [
      {
        he: "לקבוע לכל חומר את אסטרטגיית התכנון: Strategy Group בנתוני MRP3 של החומר (MM02). לפי רשומת פירוט התחום בחירה נכונה מאזנת זמינות מלאי מול הון חוזר, ואסטרטגיה שאינה תואמת את דפוס הביקוש מובילה למלאי-יתר.",
        xrefs: ["tx:MM02", "table:MARC"],
      },
      {
        he: "לבחור מסלול לפי טבלת האסטרטגיות של מרכז ה-MRP: 10 ייצור-למלאי נטו לפי PIR, שבו הזמנות הלקוח נמשכות מהמלאי ואינן יוצרות דרישה נוספת; 40 תחזית והזמנות לקוח, שבו ההזמנות צורכות את התחזית; 20 ייצור-להזמנה טהור בלי תחזית, שבו המלאי והעלות נשמרים לפי ההזמנה. הטבלה מונה גם 11 (ייצור-למלאי ברוטו), ‏50 (תכנון בלי הרכבה סופית) ו-70 (תכנון ברמת הרכבה).",
      },
      {
        he: "לוודא שסוג הדרישה (Requirements Type) תואם לאסטרטגיה: לפי רשומת MD61 הוא נגזר ממנה (LSF לאסטרטגיה 10, ‏VSF ל-40), וטבלת האסטרטגיות נותנת גם BSF ל-11, ‏KE ל-20, ‏VSE ל-50 ו-VSEB ל-70. רשומת התחום מונה התאמה של סוג הדרישה בין הבדיקות לכפל ביקוש של תחזית ומכירות.",
        xrefs: ["tx:MD61"],
      },
      {
        he: "בייצור-למלאי להזין את התחזית כ-PIR ב-MD61 ולעדכן אותה ב-MD62, בגרסת הדרישות הפעילה 00: לפי רשומת MD61 גרסה שאינה פעילה אינה נלקחת ב-MRP.",
        xrefs: ["tx:MD61", "tx:MD62"],
      },
      {
        he: "להגדיר צריכה (Consumption Mode ו-Consumption Periods) בנתוני MRP3 כך שהזמנות הלקוח יקזזו את התחזית: לפי רשומות המאגר אסטרטגיה 40 בלי צריכה מביאה לכפל ביקוש, ותחזית שאינה נצרכת נבדקת ב-Strategy Group ובהגדרות הצריכה.",
      },
      {
        he: "לקלוט את הזמנת הלקוח ב-VA01 (שינוי ב-VA02, תצוגה ב-VA03): לפי רשומת VA01 ההזמנה מפעילה בדיקת זמינות (ATP), והרשומה מונה בין הטעויות הזנת תאריך אספקה לא ריאלי בלי בדיקת ATP.",
        xrefs: ["tx:VA01", "tx:VA02", "tx:VA03", "table:VBAK", "table:VBAP"],
      },
      {
        he: "לנתח את הזמינות ב-CO09: לפי רשומתה הכמות הזמינה המצטברת נגזרת מ-checking group, מ-checking rule ומ-scope of check (OPJJ), וזה המקום לברר מדוע הזמנה קיבלה או לא קיבלה אישור זמינות. ה-checking group יושב בנתוני החומר במפעל (MTVFP ב-MARC).",
        xrefs: ["tx:CO09", "table:MARC"],
      },
      {
        he: "לבדוק ב-MD04 שהביקוש הגיע לתכנון: לפי רשומת MD04 היא מציגה בזמן אמת את כל הביקושים וההיצעים של החומר, וה-Pegging מראה את מקור הדרישה, למשל איזו הזמנת לקוח גורמת לחוסר. את צריכת התחזית מול הדרישות מציגה MD62, לפי רשומתה.",
        xrefs: ["tx:MD04", "tx:MD62"],
      },
      {
        he: "להריץ MRP ב-MD01N ולהעריך ב-MD04: לפי מרכז ה-MRP הזמנות לקוח הן מקור דרישה לצד PIR, דרישות תלויות ומלאי בטחון, והתוצר הוא הזמנה מתוכננת או דרישת רכש. פירוט הריצה ברשומה bp:mrp-process.",
        xrefs: ["tx:MD01N", "tx:MD04", "bp:mrp-process"],
      },
      {
        he: "להמיר את ההזמנה המתוכננת לפקודה: בייצור בדיד פקודת ייצור (לפי רשומת CO01 ברוב הסביבות מהזמנה מתוכננת ב-MD04, ‏CO40 או CO41 ולא ידנית), ובייצור תהליכי פקודת תהליך (COR1, והמרה ב-COR8 לפי רשומת התחום). ההמרה דורשת גרסת ייצור תקפה (MKAL).",
        xrefs: ["tx:CO01", "tx:CO40", "tx:CO41", "tx:COR1", "tx:COR8", "table:MKAL", "bp:production-order-process", "bp:process-order-process"],
      },
      {
        he: "לפני השחרור לבדוק את זמינות הרכיבים: לפי תקרית aatp-shortage-release, שחרור פקודת תהליך נחסם ב-aATP בחוסר זמינות רכיב, והניתוח ב-CO09, ‏MD04 ו-COR2.",
        xrefs: ["tx:CO09", "tx:MD04", "tx:COR2"],
      },
      {
        he: "לנקות תקופתית PIR ישנות ב-MD74 או ב-MD75: לפי רשומות ה-PIR של המאגר הן מצטברות, ו-MD74 מנקה PIR שנצרכו או שפג תוקפן.",
        xrefs: ["tx:MD74", "tx:MD75"],
      },
    ],
    antiPatterns: [
      "אסטרטגיה 40 בלי Consumption Mode ו-Consumption Periods: התחזית והזמנות הלקוח נספרות יחד ונוצר כפל ביקוש.",
      "Requirements Type שאינו תואם את אסטרטגיית התכנון: רשומת MD61 מונה זאת בין השגיאות הנפוצות.",
      "הזנת PIR לגרסת דרישות שאינה פעילה: MRP מתעלם מהתחזית.",
      "אסטרטגיה שאינה תואמת את דפוס הביקוש: מלאי-יתר או חוסר.",
      "הזנת תאריך אספקה לא ריאלי בהזמנה בלי בדיקת ATP.",
      "פרשנות שגויה של scope of check, או בלבול בין כמות ATP לכמות מלאי פיזי.",
      "יצירת פקודת ייצור ידנית למרות שקיימת הזמנה מתוכננת: לפי רשומת CO01 זה יוצר ביקוש כפול.",
      "תחזית שאינה נצרכת ואינה מנוטרת: לפי רשומת MD62 זה המקור הנפוץ לייצור עודף.",
    ],
    checks: [
      "חיובי: אסטרטגיה 10, ‏PIR בגרסה 00 מניעה ייצור-למלאי דרך ה-MRP.",
      "חיובי: אסטרטגיה 20, הזמנת הלקוח מניעה ייצור-להזמנה.",
      "אינטגרציה: באסטרטגיה 40 הזמנת הלקוח צורכת את ה-PIR.",
      "שלילי: אסטרטגיה 40 בלי צריכה מייצרת כפל ביקוש, ו-PIR בגרסה שאינה פעילה אינה נלקחת ב-MRP.",
      "אימות: סוג הדרישה תואם לאסטרטגיה.",
      "זמינות: ההזמנה עוברת בדיקת ATP; תרחיש הבדיקה של שלב הזמינות במפת התהליך הוא aATP/BOP והקצאה.",
      "תכנון: MRP יוצר הזמנות מתוכננות, וההמרה והשחרור עוברים עם גרסת ייצור תקפה.",
      "רגרסיה: MD74 מנקה PIR שנצרכו או שפג תוקפן.",
      "לאחר המרה: אסטרטגיה, צריכה ו-ATP.",
    ],
    process: {
      purpose:
        "להעביר את ביקוש המכירות מ-SD לתכנון ולביצוע ב-PP וב-PP-PI: אסטרטגיית התכנון קובעת אם הזמנת הלקוח נמשכת " +
        "מהמלאי, צורכת תחזית או מניעה ייצור, ובדיקת הזמינות, צריכת התחזית וה-MRP מתרגמות אותה להזמנות מתוכננות " +
        "ולפקודות, כך שזמינות המלאי מאוזנת מול ההון החוזר.",
      trigger: [
        { he: "הזמנת לקוח חדשה או שינוי בה (VA01, ‏VA02).", xrefs: ["tx:VA01", "tx:VA02"] },
        { he: "תחזית מכירות שנקלטת כ-PIR ב-MD61 או מתעדכנת ב-MD62.", xrefs: ["tx:MD61", "tx:MD62"] },
        { he: "ריצת MRP שקולטת את הביקוש החדש.", xrefs: ["tx:MD01N"] },
      ],
      preconditions: [
        { he: "Strategy Group ו-Consumption Mode/Periods מוגדרים בנתוני MRP3 של החומר.", xrefs: ["tx:MM02"] },
        { he: "Customizing של האסטרטגיות לפי רשומת ההגדרות: SPRO > Production > Production Planning > Demand Management > Planned Independent Requirements > Planning Strategy, בטבלאות T459K, ‏T461 ו-T459P; רשומת התחום נוקבת גם ב-OPPS." },
        { he: "checking group לבדיקת הזמינות בחומר (MTVFP ב-MARC), ו-checking rule ו-scope of check מוגדרים (OPJJ לפי רשומת CO09).", xrefs: ["table:MARC", "tx:CO09"] },
        { he: "PIR בגרסת הדרישות הפעילה 00 ובתוך אופק התכנון.", xrefs: ["tx:MD61"] },
        { he: "גרסת ייצור תקפה (MKAL) לחומר המיוצר, כתנאי להמרת ההזמנה המתוכננת לפקודה.", xrefs: ["table:MKAL"] },
        { he: "לקוח כ-Business Partner: לפי נושא המעבר ב-S/4HANA הלקוח הוא תפקיד של BP ו-CVI חובה, ו-VBAK מתועדת ב-S/4HANA עם Business Partner ללקוחות.", xrefs: ["table:VBAK"] },
      ],
      masterData: [
        { he: "נתוני החומר במפעל: סוג MRP, ‏checking group ל-ATP ואסטרטגיית תכנון, לפי העשרת MARC.", xrefs: ["table:MARC", "tx:MM02"] },
        { he: "Requirements Type ו-Consumption Mode/Periods: רשומת פירוט התחום מונה LSF, ‏VSF, ‏KSV ו-KEV, ורשומת ההגדרות מונה LSF, ‏VSF ו-KE." },
        { he: "PIR: רשומת התחום נוקבת ב-PBIM, ‏PBED ו-PBHI, שאינן במילון הפרויקט ולכן מופיעות בפרוזה בלבד.", xrefs: ["tx:MD61"] },
        { he: "הזמנת הלקוח: VBAK כותרת מסמך המכירה (לקוח, ארגון מכירות, תנאים) ו-VBAP פריט המסמך (חומר, כמות, מחיר, מפעל, תנאי אספקה).", xrefs: ["table:VBAK", "table:VBAP"] },
        { he: "גרסת ייצור לחומר המיוצר.", xrefs: ["table:MKAL"] },
      ],
      roles: [
        { he: "נציג שירות לקוחות, פקיד מכירות ו-Order Management: קליטת ההזמנה ב-VA01, לפי רשומתה.", xrefs: ["tx:VA01"] },
        { he: "מתכנן ביקוש ומתכנן ייצור: הזנת PIR ועדכונן ב-MD61 וב-MD62, לפי רשומותיהן.", xrefs: ["tx:MD61", "tx:MD62"] },
        { he: "מתכנן ייצור, מתכנן חומרים ויועץ PP/SD: ניתוח ה-ATP ב-CO09, לפי רשומתה.", xrefs: ["tx:CO09"] },
        { he: "מתכנן ייצור, מתכנן חומרים ומתכנן ביקוש: רשימת המלאי והדרישות ב-MD04, לפי רשומתה.", xrefs: ["tx:MD04"] },
      ],
      transactions: [
        { he: "הזמנת לקוח: VA01 יצירה, ‏VA02 שינוי, ‏VA03 תצוגה.", xrefs: ["tx:VA01", "tx:VA02", "tx:VA03"] },
        { he: "זמינות: CO09 סקירת ATP.", xrefs: ["tx:CO09"] },
        { he: "PIR: MD61 יצירה ו-MD62 שינוי; רשומת התחום מונה גם MD63 ו-MD73, ו-MD74 ו-MD75 לארגון מחדש של PIR ישנות.", xrefs: ["tx:MD61", "tx:MD62", "tx:MD63", "tx:MD73", "tx:MD74", "tx:MD75"] },
        { he: "אסטרטגיה בחומר: MM02 (נתוני MRP3); OPPS לפי רשומת התחום, אינה במילון הפרויקט.", xrefs: ["tx:MM02"] },
        { he: "תכנון והמרה: MD01N ו-MD04; פקודת ייצור ב-CO01 או המרה ב-CO40 וב-CO41; פקודת תהליך ב-COR1 או המרה ב-COR8.", xrefs: ["tx:MD01N", "tx:MD04", "tx:CO01", "tx:CO40", "tx:CO41", "tx:COR1", "tx:COR8"] },
        { he: "Fiori לפי מפות התהליך: Manage Sales Orders, ‏Release for Delivery (aATP), ‏Manage PIRs ו-Monitor Material Coverage; רשומת MD04 מפנה ל-MRP Cockpit (F0247A, ‏F0251). רשומת VA01 נקבה ב-Create Sales Orders (F0018), מזהה שאינו בספריית ה-Fiori; מ-2026-09-24 היא מפנה ל-Manage Sales Orders - Version 2 (F3893), שהספרייה מציינת כיישום שטרנזקציית ה-GUI המובילה שלו VA01; F3893 אינו בקטלוג הפרויקט ולכן אינו מקושר.", xrefs: ["fiori:F0247A", "fiori:F0251"] },
      ],
      tables: [
        { he: "VBAK ו-VBAP מסמך המכירה: כותרת ופריטים.", xrefs: ["table:VBAK", "table:VBAP"] },
        { he: "MARC נתוני החומר במפעל, ובהם checking group ל-ATP (MTVFP) ואסטרטגיית התכנון.", xrefs: ["table:MARC"] },
        { he: "AUFK, ‏AFKO ו-AFPO של הפקודה שנוצרת, ו-MKAL גרסאות הייצור.", xrefs: ["table:AUFK", "table:AFKO", "table:AFPO", "table:MKAL"] },
        { he: "טבלאות שרשומות המאגר נוקבות בהן ואינן במילון הפרויקט, ולכן מופיעות בפרוזה בלבד: VBBE בשלב ה-ATP, ‏PBIM ו-PBED של ה-PIR, ‏T459K ו-T461 של האסטרטגיות, ו-MDKP ו-PLAF של ה-MRP." },
        { he: "האובייקטים העסקיים הזמנה מתוכננת, פקודת ייצור ופקודת תהליך.", xrefs: ["obj:planned-order", "obj:production-order", "obj:process-order"] },
      ],
      integrationPoints: [
        { he: "SD אל PP: לפי מרכז ה-MRP הזמנת הלקוח היא מקור דרישה ל-MRP לצד PIR, דרישות תלויות ומלאי בטחון.", xrefs: ["tx:VA01", "tx:MD01N"] },
        { he: "ממשקי שלב ההזמנה לפי מפת התהליך: IDoc מסוג ORDERS ו-API_SALES_ORDER; ה-BAPI לפי רשומת VA01: BAPI_SALESORDER_CREATEFROMDAT2. אינם במילון הפרויקט ולכן אינם מקושרים." },
        { he: "ATP: לפי רשומת CO09 הבדיקה נשענת על checking group בחומר; לפי נושא המעבר aATP משפיע על שחרור פקודות ועל אספקה.", xrefs: ["tx:CO09", "table:MARC"] },
        { he: "PP אל ביצוע: ההזמנה המתוכננת מומרת לפקודת ייצור או תהליך; ממשקי הפקודה לפי מפת התהליך הם API_PROCESS_ORDER_2_SRV ו-IDoc מסוג LOIPRO.", xrefs: ["idoc:msg:LOIPRO", "bp:production-order-process", "bp:process-order-process", "bp:plan-to-produce-discrete", "bp:process-industries-plan-to-produce"] },
        { he: "ממשק תוכניתי ל-PIR לפי רשומת התחום: BAPI_REQUIREMENTS_CREATE ו-BAPI_REQUIREMENTS_GETDETAIL, שאינם במילון הפרויקט; רשומת פירוט האסטרטגיות נוקבת ב-MARC_SINGLE_READ.", xrefs: ["fm:MARC_SINGLE_READ"] },
        { he: "הרחבות: M61X0001 ו-MABP0001 ברשימת ה-Exits של רשומת פירוט ה-PIR, ו-ATP_CUST_EX ברשימת ה-BAdIs של רשומת פירוט האסטרטגיות; רק M61X0001 במילון הפרויקט.", xrefs: ["enh:exit:M61X0001"] },
      ],
      outputs: [
        { he: "הזמנת לקוח עם תוצאת בדיקת זמינות.", xrefs: ["tx:VA01", "tx:CO09"] },
        { he: "PIR פעילה בגרסה 00, שנצרכת מול הזמנות הלקוח לפי האסטרטגיה.", xrefs: ["tx:MD61"] },
        { he: "הזמנות מתוכננות ודרישות רכש מריצת ה-MRP, ופקודת ייצור או תהליך אחרי ההמרה.", xrefs: ["obj:planned-order", "obj:production-order", "obj:process-order"] },
      ],
      exceptions: [
        { he: "כפל ביקוש של תחזית ומכירות: Requirements Type או צריכה שאינם תואמים לאסטרטגיה.", xrefs: ["tx:MD61"] },
        { he: "התחזית אינה נצרכת: Consumption Mode או Consumption Periods.", xrefs: ["tx:MD62"] },
        { he: "MRP מתעלם מה-PIR: גרסה שאינה 00 או אופק התכנון.", xrefs: ["tx:MD61"] },
        { he: "מלאי-יתר: אסטרטגיה שאינה תואמת את דפוס הביקוש." },
        { he: "בדיקת הזמינות: checking rule חסר, אין כמות ATP, או scope of check שאינו כולל את האלמנטים הנדרשים, לפי רשומת CO09.", xrefs: ["tx:CO09"] },
        { he: "ההמרה לפקודה נכשלת בלי גרסת ייצור תקפה, ולפי רשומת התחום כפל דרישות נבדק באסטרטגיה ובצריכת ה-PIR; מפת התהליך מצמידה לשלב ה-MRP את התקריות mrp-no-planned-orders ו-no-production-version.", xrefs: ["table:MKAL", "tx:MD04"] },
        { he: "שחרור פקודת תהליך נחסם ב-aATP: חוסר מלאי או כניסות לרכיב, ‏Checking Rule שגוי, ‏Product Allocation חוסם או אופק ATP (תקרית aatp-shortage-release).", xrefs: ["tx:CO09", "tx:COR2"] },
      ],
      controls: [
        { he: "בדיקה שסוג הדרישה תואם לאסטרטגיה, כחלק מבדיקות ההגדרה לפי רשומת ההגדרות." },
        { he: "ניטור שוטף של צריכת התחזית: לפי רשומת MD62, תחזית שלא נצרכת היא המקור הנפוץ לייצור עודף.", xrefs: ["tx:MD62"] },
        { he: "ארגון מחדש תקופתי של PIR ישנות ב-MD74 וב-MD75.", xrefs: ["tx:MD74", "tx:MD75"] },
        { he: "הבנת scope of check ובדיקת checking group בחומר, ושילוב CO09 עם MD04 לתמונה מלאה, לפי רשומת CO09.", xrefs: ["tx:CO09", "tx:MD04"] },
        { he: "עבודה לפי Pegging ב-MD04 להבנת מקור הדרישה.", xrefs: ["tx:MD04"] },
        { he: "המרה מהזמנה מתוכננת ולא יצירה ידנית, לשמירת הקישור ל-MRP, לפי רשומת CO01.", xrefs: ["tx:CO40", "tx:CO41"] },
      ],
      eccToS4: [
        { he: "לפי רשומת פירוט התחום, אסטרטגיות התכנון (10, ‏11, ‏20, ‏40, ‏50, ‏70) זהות ב-ECC וב-S/4HANA, ו-aATP ו-Product Allocation משופרים ב-S/4HANA; רשומת ההגדרות מסכמת 'אסטרטגיות זהות' ו-'aATP/Allocation משופרים'." },
        { he: "לפי נושא המעבר, ב-ECC בדיקת הזמינות היא ATP קלאסי (CO09) על בסיס ערכי ATP בטבלאות, וב-S/4HANA aATP על HANA עם Back-Order Processing, ‏Product Allocation ו-Release for Delivery; לפי רשומת CO09 היא זמינה ב-S/4HANA לצד aATP.", xrefs: ["tx:CO09"] },
        { he: "PIR: לפי רשומת פירוט התחום מודל PBIM ו-PBED זהה והניהול גם ב-Fiori 'Manage PIRs'; MD61 זמינה ב-S/4HANA לפי רשומתה.", xrefs: ["tx:MD61"] },
        { he: "הזמנת הלקוח: לפי רשומת VA01 היא זמינה ב-S/4HANA ונתמכת ב-SAP GUI לצד אפליקציית Fiori, ו-VBAK מתועדת ב-S/4HANA עם Business Partner ללקוחות.", xrefs: ["tx:VA01", "table:VBAK"] },
        { he: "ריצת ה-MRP והמעבר שלה ל-S/4HANA מפורטים ברשומה bp:mrp-process.", xrefs: ["bp:mrp-process", "tx:MD01N"] },
      ],
      migration: [
        { he: "לפי רשומת פירוט התחום T459K ו-T461 נשמרות; בדיקה לאחר המרה: אסטרטגיה, צריכה ו-Requirements Type, וגם ATP." },
        { he: "לפי רשומת פירוט ה-PIR, ‏PBIM ו-PBED נשמרות; בדיקה לאחר המרה: צריכת תחזית וארגון מחדש.", xrefs: ["tx:MD74"] },
        { he: "לפי נושא המעבר של aATP, תהליכי הקצאה ידניים מוחלפים ב-BOP ונדרשות הגדרות חדשות.", xrefs: ["tx:CO09"] },
        { he: "לפי נושא המעבר של Business Partner, סנכרון CVI הוא צעד הכנה קריטי במיגרציה, והלקוח מנוהל כתפקיד של BP." },
      ],
      reference: null,
    },
    xrefs: [
      "tx:VA01", "tx:VA02", "tx:VA03", "tx:CO09", "tx:MD61", "tx:MD62", "tx:MD63", "tx:MD73", "tx:MD74", "tx:MD75",
      "tx:MM02", "tx:MD01N", "tx:MD04", "tx:CO01", "tx:CO40", "tx:CO41", "tx:COR1", "tx:COR8", "tx:COR2",
      "table:VBAK", "table:VBAP", "table:MARC", "table:AUFK", "table:AFKO", "table:AFPO", "table:MKAL",
      "fm:MARC_SINGLE_READ", "enh:exit:M61X0001", "idoc:msg:LOIPRO", "fiori:F0247A", "fiori:F0251",
      "obj:planned-order", "obj:production-order", "obj:process-order",
      "bp:mrp-process", "bp:production-order-process", "bp:process-order-process", "bp:plan-to-produce-discrete",
      "bp:process-industries-plan-to-produce",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'הזמנה לגבייה (O2C)' של הפרויקט (PROCESS_MAPS): שלבי הזמנת הלקוח ובדיקת הזמינות",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "שלב 'הזמנת לקוח': VA01, ‏VA02, ‏VA03, טבלאות VBAK ו-VBAP, ‏Fiori 'Manage Sales Orders', ממשקים 'ORDERS IDoc' " +
          "ו-'API_SALES_ORDER', ובדיקה 'הזמנה עם תמחור+ATP; חסימת אשראי'. שלב 'בדיקת זמינות (ATP)': CO09, טבלת VBBE, " +
          "Fiori 'Release for Delivery (aATP)', תקרית aatp-shortage-release ובדיקה 'aATP/BOP; הקצאה'.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#o2c",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'תכנון לייצור (Plan-to-Produce)' של הפרויקט (PROCESS_MAPS): שלבי הביקוש, ה-MRP והפקודה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "שלב 'ניהול ביקוש (PIR)': MD61, ‏MD62, טבלאות PBIM ו-PBED, ‏Fiori 'Manage PIRs', תקרית mrp-no-planned-orders ובדיקה " +
          "'PIR גרסה 00 מזין MRP'. שלב 'MRP': MD01N, ‏MD04, טבלאות MDKP ו-PLAF, ‏Fiori 'Monitor Material Coverage', תקריות " +
          "mrp-no-planned-orders ו-no-production-version ובדיקה 'MRP יוצר הזמנות מתוכננות; גרסת ייצור'. שלב 'פקודת " +
          "ייצור/תהליך': CO01, ‏COR1, טבלאות AUFK, ‏AFKO, ‏AFPO, ממשקים API_PROCESS_ORDER_2_SRV ו-'LOIPRO IDoc' ובדיקה " +
          "'המרה+שחרור; מרשם בקרה ל-MES'.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#plan-to-produce",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'אסטרטגיות תכנון' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "אסטרטגיית תכנון קובעת כיצד מתנהלים ביקוש והיצע: ייצור-למלאי (MTS) מול ייצור-להזמנה (MTO), שימוש בתחזית (PIR) " +
          "וצריכתה; נקבעת בנתוני MRP3 של החומר (Strategy Group) ומבוססת על Requirements Types. זרימה: Strategy Group " +
          "ב-MRP3, סוג דרישה (PIR או הזמנת לקוח), ‏MRP לפי אסטרטגיה, צריכת תחזית, ייצור MTS או MTO. טבלאות MARC, ‏T459K, " +
          "T461, ‏VBBE; טרנזקציות MM02, ‏OPPS, ‏MD04, ‏MD61. לימוד: 10 MTS נטו לפי תחזית, ‏11 MTS ברוטו (ללא מלאי), ‏20 MTO " +
          "טהור, ‏40 MTS עם תכנון סופי (תחזית והזמנות), ‏50 תכנון ללא הרכבה סופית, ‏70 תכנון ברמת הרכבה. תקלות: תחזית לא " +
          "נצרכת, לבדוק Strategy Group ו-Consumption Mode/Periods ב-MRP3; כפל ביקוש (תחזית ומכירות), לוודא Requirements " +
          "Type תואם לאסטרטגיה (LSF/VSF/KSV).",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-planning-strategies",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'אסטרטגיות תכנון' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "מטרה: אסטרטגיית תכנון קובעת את ההתנהלות מול ביקוש (MTS או MTO, שימוש בתחזית וצריכתה), ובחירה נכונה מאזנת " +
          "זמינות מלאי מול הון חוזר. נתוני אב: Strategy Group, ‏Requirements Type (LSF/VSF/KSV/KEV), ‏Consumption " +
          "Mode/Periods, ‏Availability Check. פונקציה MARC_SINGLE_READ; BAdI ATP_CUST_EX (בדיקת זמינות). QA: אסטרטגיה 10, " +
          "PIR מניע ייצור-למלאי; אסטרטגיה 20, הזמנת לקוח מניעה MTO; 40 ללא Consumption, כפל ביקוש; אסטרטגיה 50 תכנון " +
          "ללא הרכבה סופית. תקלות: כפל ביקוש (Requirements Type או Consumption), תחזית לא נצרכת (Consumption " +
          "Mode/Periods), מלאי-יתר (אסטרטגיה לא תואמת לדפוס ביקוש). תרחיש: מוצרי גמר סטנדרטיים באסטרטגיה 40 ומוצרים " +
          "מותאמי-לקוח באסטרטגיה 20. הגירה: T459K ו-T461 נשמרות, ‏QA של אסטרטגיה, צריכה ו-Requirements Type. ECC מול S/4: " +
          "אסטרטגיות זהות (10/11/20/40/50/70), ‏aATP ו-Product Allocation משופרים ב-S/4, ‏QA של אסטרטגיה, צריכה ו-ATP.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-planning-strategies",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'דרישות עצמאיות מתוכננות (PIR)' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "PIR הן תחזית הביקוש שמזינה את ה-MRP בייצור-למלאי, מנוהלות ב-MD61 וב-MD62 לפי גרסת דרישות ונצרכות מול הזמנות " +
          "לקוח בפועל לפי אסטרטגיית התכנון. טבלאות PBIM, ‏PBED, ‏PBHI; טרנזקציות MD61, ‏MD62, ‏MD63, ‏MD73, ‏MD74; BAPIs " +
          "BAPI_REQUIREMENTS_CREATE ו-BAPI_REQUIREMENTS_GETDETAIL. לימוד: גרסה 00 פעילה לתכנון; האסטרטגיה קובעת את " +
          "הצריכה; MD74 ו-MD75 לארגון מחדש של PIR ישנות. תקלות: MRP לא רואה PIR, לוודא גרסת דרישות פעילה (00) ואופק " +
          "תכנון; כפל דרישה, לבדוק אסטרטגיה וצריכה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-pir",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'דרישות עצמאיות מתוכננות (PIR)' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "נתוני אב: גרסת דרישות (00 פעילה), אסטרטגיית תכנון, ‏Consumption Mode/Periods, ‏Requirements Type. Exits M61X0001 " +
          "ו-MABP0001 (תחזית). QA: PIR בגרסה 00 ו-MRP יוצר היצע; גרסה לא פעילה ו-MRP מתעלם; הזמנת לקוח צורכת PIR " +
          "(אסטרטגיה 40); MD74 מנקה PIR שנצרכו או פגו. תקלות: MRP מתעלם מ-PIR (גרסה לא 00 או אופק), כפל ביקוש (צריכה לא " +
          "מוגדרת), ‏PIR ישנות מצטברות (להריץ MD74/MD75). הגירה: PBIM ו-PBED נשמרים, ‏QA של צריכת תחזית וארגון מחדש. ECC " +
          "מול S/4: מודל PBIM/PBED זהה, וניהול ב-Fiori 'Manage PIRs'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-pir",
      },
      {
        sourceType: "repository",
        sourceTitle: "טבלת אסטרטגיות התכנון של מרכז ה-MRP של הפרויקט (PLANNING_STRATEGIES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "10 ייצור-למלאי נטו (MTS): תכנון לפי PIR בלבד, הזמנות לקוח לא יוצרות דרישה נוספת (נמשכות מהמלאי), סוג דרישה LSF. " +
          "11 ייצור-למלאי ברוטו: לפי PIR ברוטו ללא התחשבות במלאי, ‏BSF. 20 ייצור-להזמנה (MTO) טהור: ייצור רק נגד הזמנת " +
          "לקוח, ללא תחזית, מלאי ועלות נשמרים לפי הזמנה, ‏KE. 40 MTS עם תכנון סופי: תחזית (PIR) והזמנות לקוח, ההזמנות " +
          "צורכות את התחזית, ‏VSF. 50 תכנון ללא הרכבה סופית: רכיבים והרכבות מראש לפי תחזית וההרכבה הסופית רק נגד הזמנה, " +
          "VSE. 70 תכנון ברמת הרכבה, ‏VSEB.",
        verificationLevel: "repository_verified",
        repoRef: "data/mrp-center.ts#PLANNING_STRATEGIES",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז ה-MRP של הפרויקט (MRP_SECTIONS): הסעיף 'אסטרטגיות תכנון'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "אסטרטגיית התכנון (Strategy Group ב-MRP3) קובעת כיצד מתנהלים ביקוש והיצע, ‏MTS מול MTO, שימוש בתחזית וצריכתה; " +
          "הבחירה משפיעה על Requirements Type, על קיזוז התחזית ועל מתי מתחיל הייצור. נקודות: Strategy Group ו-Requirements " +
          "Type (LSF/VSF/KSV/KEV); Consumption Mode/Periods קובעים קיזוז בין תחזית למכירות; MTS ייצור למלאי לפי תחזית, ‏MTO " +
          "ייצור נגד הזמנה. טבלאות MARC, ‏T459K, ‏T461; טרנזקציות MM02, ‏OPPS.",
        verificationLevel: "repository_verified",
        repoRef: "data/mrp-center.ts#strategies",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז ה-MRP של הפרויקט (MRP_SECTIONS): הסעיף 'יסודות MRP'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MRP מתרגם ביקוש להיצע: דרישות נטו הן ביקוש פחות מלאי זמין פחות כניסות מתוכננות; מקור דרישה: PIR, הזמנות לקוח, " +
          "דרישות תלויות (BOM), מלאי בטחון; תוצר: הזמנה מתוכננת (PLAF) או דרישת רכש (EBAN).",
        verificationLevel: "repository_verified",
        repoRef: "data/mrp-center.ts#fundamentals",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת VA01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "VA01 יוצרת הזמנת מכירה (VBAK/VBAP) ומפעילה תמחור, בדיקת זמינות (ATP) ופיצול לאספקות; לא לעריכה (VA02) ולא " +
          "לתצוגה (VA03). משתמשים: נציג שירות לקוחות, פקיד מכירות, ‏Order Management. טעות נפוצה: הזנת תאריך אספקה לא " +
          "ריאלי ללא בדיקת ATP. BAPIs BAPI_SALESORDER_CREATEFROMDAT2 ו-BAPI_SALESDOCU_CREATEFROMDATA1, ובין הטרנזקציות הנלוות CO09. ב-S/4 " +
          "זמינה ופעילה עם Fiori 'Create Sales Orders' (F0018) ו-Manage Sales Orders, ו-VA01 עדיין נתמכת ב-SAP GUI. (ציטוט המאגר ב-2026-09-23; F0018 אינו בספריית ה-Fiori, ו-tx-intel תוקן ב-2026-09-24 ל-Manage Sales Orders - Version 2 (F3893).)",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#VA01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת CO09",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "CO09 מציגה את מצב ה-ATP של חומר במפעל: הכמות הזמינה המצטברת נגזרת מ-checking group ו-checking rule ומ-scope of " +
          "check (OPJJ), וקריטית להבנת מדוע הזמנה קיבלה או לא קיבלה אישור זמינות. משתמשים: מתכנן ייצור, מתכנן חומרים, " +
          "יועץ PP/SD. שגיאות: Checking rule not maintained, ‏No ATP quantity, ‏Scope of check excludes required elements. " +
          "טעויות: פרשנות שגויה של scope of check, בלבול בין ATP לכמות מלאי פיזי. המלצות: להבין את scope of check, לבדוק " +
          "checking group בחומר (MRP3), לשלב עם MD04. ב-S/4 זמינה לצד aATP עם Product Availability Check ו-Backorder " +
          "Processing.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO09",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MD61",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MD61 יוצרת PIR (PBED/PBIM) לפי requirement type וגרסה, והן מתקזזות מול דרישות מכירה לפי planning strategy; " +
          "ה-requirement type נגזר מה-planning strategy (לדוגמה LSF לאסטרטגיה 10, ‏VSF ל-40), והקיזוז לפי consumption " +
          "mode/periods. משתמשים: מתכנן ביקוש, מתכנן ייצור, ‏Demand planner. שגיאות: requirement type לא תואם planning " +
          "strategy, ‏PIR לא מקוזזות, ‏version לא אקטיבי. טעות: הזנת PIR ל-version לא פעיל; המלצה: active version (00); " +
          "טיפ: גרסה לא פעילה לא נלקחת ב-MRP. ב-S/4 זמינה, ‏PBIM/PBED ללא שינוי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD61",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MD62",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MD62 משנה PIR קיימות ומאפשרת צפייה בצריכה (consumption) מול הדרישות; משתמשים: מתכנן ביקוש, מתכנן ייצור. טיפ: " +
          "לנטר צריכת תחזית שוטפת, כי תחזית שלא נצרכת היא המקור הנפוץ לייצור עודף.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD62",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MD04",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MD04 היא תצוגה דינמית בזמן אמת של כל הביקושים וההיצעים לחומר, עם Pegging ונקודת קפיצה לטרנזקציות ההמשך " +
          "(CO40, ‏CO48, ‏ME21N). משתמשים: מתכנן ייצור, מתכנן חומרים, מתכנן ביקוש. המלצה: להשתמש ב-Pegging להבנת מקור " +
          "הדרישה; דוגמה: מתכנן רואה איזו הזמנת לקוח גדולה גורמת לחומר לרדת למינוס. חלופת Fiori: MRP Cockpit " +
          "(F0247A/F0251).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD04",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת CO01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "CO01 מיועדת ליצירה ידנית של הזמנת ייצור כשאין הצעת תכנון; ברוב הסביבות ההזמנות נוצרות מ-Planned Orders ב-MD04, " +
          "CO40 או CO41 ולא ידנית, ובתעשייה תהליכית משתמשים ב-COR1 ולא ב-CO01. טעות: יצירת הזמנה ידנית למרות שקיימת " +
          "Planned Order יוצרת ביקוש כפול; המלצה: המרה מ-Planned Order לשמירת קישוריות MRP.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO01",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'תכנון דרישות חומר (MRP)' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MRP מחשב מה, כמה ומתי לרכוש או לייצר ומייצר הזמנות מתוכננות ודרישות רכש; PLAF הזמנה מתוכננת שמומרת לפקודת " +
          "תהליך (COR8). תקלות: כפל דרישות, לבדוק אסטרטגיית תכנון וצריכת PIR; הזמנות לא מומרות, לוודא גרסת ייצור (MKAL) " +
          "תקפה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-mrp",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת MARC",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MARC מחזיקה נתוני אב חומר ברמת מפעל: סוג MRP (DISMM), ‏MRP Controller (DISPO), רכש (BESKZ), גודל אצווה, זמני " +
          "אספקה, ‏checking group ל-ATP (MTVFP) ואסטרטגיית תכנון; MTVFP קובע את התנהגות בדיקת הזמינות (CO09).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MARC",
      },
      {
        sourceType: "repository",
        sourceTitle: "האובייקטים המאומתים של הפרויקט (VERIFIED_OBJECTS): רשומת VBAK",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "VBAK כותרת מסמך מכירה (הזמנת מכירה, הצעת מחיר, חוזה): לקוח, ארגון מכירות, תנאים; קיימת ב-ECC וב-S/4HANA " +
          "(Business Partner ללקוחות); טרנזקציות VA01, ‏VA02, ‏VA03.",
        verificationLevel: "repository_verified",
        repoRef: "data/verified-objects.ts#VBAK",
      },
      {
        sourceType: "repository",
        sourceTitle: "האובייקטים המאומתים של הפרויקט (VERIFIED_OBJECTS): רשומת VBAP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim: "VBAP פריט מסמך מכירה: חומר, כמות, מחיר, מפעל, תנאי אספקה; קיימת ב-ECC וב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/verified-objects.ts#VBAP",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'Advanced ATP (aATP)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ECC: ATP קלאסי (CO09) על בסיס ערכי ATP בטבלאות. S/4HANA: aATP על HANA עם Back-Order Processing (BOP), ‏Product " +
          "Allocation ו-Release for Delivery, מהיר ומבוסס Fiori. השפעה: תהליכי הקצאה ידניים מוחלפים ב-BOP, הגדרות " +
          "חדשות; משפיע על שחרור פקודות ואספקה.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#atp",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'Business Partner (CVI)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ECC: לקוח (XD01) וספק (XK01) נוהלו בנפרד ו-BP אופציונלי. S/4HANA: Business Partner הוא נקודת הכניסה היחידה, " +
          "לקוח וספק הם תפקידי BP ו-CVI חובה. השפעה: צעד הכנה קריטי במיגרציה (סנכרון CVI, ‏Number Ranges); ספקי חלפים " +
          "ב-PM-MM מושפעים.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#business-partner",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: aatp-shortage-release",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "שחרור פקודת תהליך נחסם עקב חוסר זמינות רכיב (Advanced ATP); סיבות: חוסר מלאי או כניסות לרכיב, ‏Checking Rule " +
          "שגוי, ‏Product Allocation חוסם, אופק ATP; ניתוח ב-CO09, ‏MD04, ‏COR2; תיקון: לספק מלאי או כניסות, להתאים " +
          "Checking Rule או Scope, או חריגה מבוקרת או BOP; מניעה: תכנון MRP מסונכרן וניטור חוסרים מראש.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#aatp-shortage-release",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז ההגדרות של הפרויקט (CONFIG_TOPICS): 'הגדרת אסטרטגיות תכנון'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "נתיב SPRO: Production > Production Planning > Demand Management > Planned Independent Requirements > Planning " +
          "Strategy; טבלאות T459K, ‏T461, ‏T459P; הגדרות מפתח: Strategy Group (10/20/40/50/70), ‏Requirements Type " +
          "(LSF/VSF/KE), ‏Consumption Mode/Periods, שיוך ל-MRP3. טעויות: Strategy לא תואם לדפוס ביקוש מוביל למלאי-יתר או " +
          "חוסר; Consumption לא מוגדר מוביל לכפל ביקוש. השפעה: קובע התנהלות MTS/MTO וקיזוז תחזית. QA: אסטרטגיה 40, " +
          "מכירות צורכות PIR; 40 ללא Consumption, כפל; Req. Type תואם. ECC מול S/4: אסטרטגיות זהות, ‏aATP/Allocation " +
          "משופרים; הגירה: QA של אסטרטגיה וצריכה.",
        verificationLevel: "repository_verified",
        repoRef: "data/centers/config.ts#pppi-strategies-config",
      },
    ],
    lastVerifiedAt: DATE23,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים (SD מול PP ו-PP-PI), ממתינה לסקירת עורך אנושי. כל שדה בפרופיל נגזר מרשומות המאגר " +
      "הנקובות בלבד, רשומה אחת לכל ראיה. הרשומה מקשרת אל bp:mrp-process, ‏bp:production-order-process, " +
      "bp:process-order-process, ‏bp:plan-to-produce-discrete ו-bp:process-industries-plan-to-produce במקום לשכפל את ריצת " +
      "ה-MRP ואת הפקודה. היקף: נקודות המסירה בין SD ל-PP; שלבי התמחור, האשראי, האספקה, החיוב והגבייה במפת O2C אינם " +
      "בהיקף. פערים גלויים: לא אותר עמוד SAP רשמי שכבר אומת בשכבות האימות על אסטרטגיות תכנון, על צריכת תחזית או על " +
      "בדיקת זמינות בהזמנת לקוח, ולכן ההפניה הרשמית ריקה ואף טענה כאן אינה ברמת תיעוד רשמי; ל-VA01, ‏CO09, ‏MD61 ו-MD62 " +
      "אין רשומת אימות רשמית. שדה kpis הושמט: המאגר אינו מתעד מדדי ביצוע לתהליך. המאגר חלוק בסוגי הדרישה: טבלת " +
      "האסטרטגיות נותנת ערך אחד לכל אסטרטגיה (10 LSF, ‏11 BSF, ‏20 KE, ‏40 VSF, ‏50 VSE, ‏70 VSEB), רשומת ההגדרות מונה " +
      "LSF/VSF/KE, ורשומות אחרות מונות גם KSV ו-KEV; לפי רשומת התחום גם PIR וגם הזמנת לקוח נושאות סוג דרישה, אך אף " +
      "רשומה אינה משייכת את KSV ו-KEV לאסטרטגיה או לסוג המסמך, והשיוך דורש אימות במערכת SAP. המאגר אינו נוקב בשם השדה " +
      "של Strategy Group ב-MARC, אינו מפרט את אסטרטגיות 11, ‏50 ו-70 מעבר לשורה אחת, ואינו מפרט את המלאי והעלות לפי " +
      "הזמנה בייצור-להזמנה. VBBE, ‏PBIM, ‏PBED, ‏PBHI, ‏T459K, ‏T461, ‏T459P, ‏MDKP, ‏PLAF, ‏OPPS, ‏OPJJ, ‏MABP0001, ‏ATP_CUST_EX " +
      "וה-BAPIs של ה-PIR ושל הזמנת הלקוח אינם במילון הפרויקט ולכן מופיעים בפרוזה בלבד. מזהה ה-Fiori F0018 מגיע מרשומת " +
      "tx-intel בלבד ואינו בקטלוג (עדכון 2026-09-24: F0018 אינו בספריית ה-Fiori, ו-tx-intel מפנה כעת ל-F3893). לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* =============================================== procure-to-pay for maintenance */
  {
    slug: "procure-to-pay-for-maintenance",
    he: "רכש לתחזוקה: חלף לא-מלאי ושירות חיצוני מפקודת אחזקה, מדרישת רכש ועד תשלום",
    en: "Procure-to-pay for maintenance: non-stock parts and external services from the maintenance order to payment",
    module: "Cross",
    summary:
      "רכיב שאינו מנוהל במלאי בפקודת אחזקה, חלף לא-מלאי או שירות חיצוני, יוצר דרישת רכש (EBAN) המחויבת לפקודה (EBKN). " +
      "משם הזרימה היא זרימת הרכש: הזמנת רכש, קבלת טובין או אישור גיליון שירות, אימות חשבונית בהתאמה משולשת ותשלום, " +
      "והעלות נצברת בפקודה עד ההתחשבנות. רכיב מלאי, לעומת זאת, הולך לרזרבציה ולניפוק.",
    context:
      "לפי רשומות התחום של המאגר, אינטגרציית החלפים (PM-MM) מבחינה בין רכיב מלאי, שנשמר ברזרבציה ומנופק לפקודה, לבין " +
      "רכיב לא-מלאי, שיוצר דרישת רכש (EBAN, ‏EBKN) הממשיכה להזמנת רכש ולקבלה, והעלות נרשמת לפקודה. ה-blueprint של " +
      "תחזוקת המפעל משייך את EBAN ואת EBKN לנושא 'אינטגרציית מלאי ורכש (PM-MM)' ומתעד חיוב של הדרישה לפקודה דרך " +
      "EBKN.AUFNR. מפת התהליך P2P של המאגר מונה חמישה שלבים: דרישת רכש (ME51N, ‏ME53N), הזמנת רכש (ME21N), קבלת טובין " +
      "(MIGO), חשבונית (MIRO, התאמה משולשת וחסימות MRBR) ותשלום (F110). לשירות, רשומת ML81N מתארת גיליון רישום " +
      "שירותים שאישורו יוצר את רישום הקבלה לשירות. ב-S/4HANA, לפי רשומות המאגר, מודל EBAN זהה, תנועות המלאי נרשמות " +
      "ל-MATDOC והספק מנוהל כ-Business Partner.",
    steps: [
      {
        he: "לתכנן את הרכיבים בפקודת האחזקה (IW31, ‏IW32) ולסווג כל רכיב: רכיב מלאי יוצר רזרבציה, ורכיב לא-מלאי יוצר דרישת רכש. בעץ המוצר של הציוד, לפי רשומת נתוני האב של האחזקה, קטגוריית פריט L מובילה לרזרבציה ו-N לדרישת רכש.",
        xrefs: ["tx:IW31", "tx:IW32", "table:RESB", "table:EBAN", "bp:material-staging-and-reservation"],
      },
      {
        he: "להקים את אב החומר לפי סוג הרכש: לפי רשומת אב החומר של האחזקה חלף מלאי מוקם כ-ERSA ושירות כיול חיצוני כ-Non-stock עם נתוני רכש בלבד; רשומת פירוט התחום מונה בנתוני האב גם סוג פריט (מלאי או לא-מלאי), מקור אספקה ומלאי בטחון.",
        xrefs: ["tx:MM01", "table:MARA"],
      },
      {
        he: "לשירות חיצוני לפקודה, כמו שירות כיול: לפי רשומות המאגר הוא נרכש כרכיב לא-מלאי, בדרישת רכש, בהזמנת רכש לספק ובקבלת שירות, ולפי רשומת EBAN במודיעין האובייקטים דרישת רכש לשירות חיצוני נוצרת מפקודת תחזוקה.",
        xrefs: ["table:EBAN"],
      },
      {
        he: "לוודא שהדרישה מחויבת לפקודה: לפי ה-blueprint שדה KNTTP בדרישה הוא סוג החיוב (F לפקודה), ו-EBKN מחזיקה את החיוב ומקשרת לפקודה דרך AUFNR; לפי רשומת EBKN במודיעין האובייקטים, ייעוד לפקודת תחזוקה (F) גורם לעלות להיזקף לפקודת ה-PM.",
        xrefs: ["table:EBAN", "table:EBKN", "table:AUFK"],
      },
      {
        he: "לעקוב אחרי הדרישה ב-ME53N: לפי רשומתה לשונית הסטטוס מראה אם נוצרה ממנה הזמנת רכש, ומתכנן האחזקה בודק שם אם דרישה מפקודה הומרה ומתי צפויה האספקה. שינוי ב-ME52N ואישור ב-ME54N, לפי רשומות המאגר.",
        xrefs: ["tx:ME53N", "tx:ME52N", "tx:ME54N"],
      },
      {
        he: "להמיר את הדרישה להזמנת רכש: ME21N עם הפניה לדרישה, או ME57 ו-ME59N מתוך הדרישות; לפי רשומת ME21N קטגוריית הקצאת החשבון (K/F/A/P) קובעת את החיוב, והאישור (Release) הוא שלב בתהליך.",
        xrefs: ["tx:ME21N", "tx:ME57", "tx:ME59N"],
      },
      {
        he: "לקבל חלף מול הזמנת הרכש ב-MIGO (תנועה 101): לפי רשומת MIGO הקבלה מעדכנת את היסטוריית ההזמנה (EKBE) ומבצעת GR/IR clearing; לפי רשומות המאגר, בקבלה של רכיב לא-מלאי העלות נרשמת לפקודה. אם בדיקת QM פעילה נוצרת מנת בדיקה, לפי מפת התהליך.",
        xrefs: ["tx:MIGO", "fm:BAPI_GOODSMVT_CREATE", "bp:goods-movement-process", "bp:quality-inspection-in-production"],
      },
      {
        he: "לשירות שנרכש בהזמנת רכש לשירותים עם item category D: לרשום ולאשר גיליון רישום שירותים ב-ML81N; לפי רשומתה האישור הוא שיוצר את רישום הקבלה לשירות ומסמך FI, ונדרשת הקצאת חשבון, למשל להזמנת עבודה.",
        xrefs: ["tx:ML81N"],
      },
      {
        he: "לאמת את החשבונית ב-MIRO בהתאמה משולשת של הזמנה, קבלה וחשבונית: לפי רשומת MIRO סטייה מעבר ל-tolerance (OMR6) חוסמת את החשבונית לתשלום, וחשבוניות חסומות משוחררות ב-MRBR אחרי בירור הסטייה.",
        xrefs: ["tx:MIRO", "tx:MRBR"],
      },
      {
        he: "לשלם בריצת F110: לפי רשומתה פרמטרים, הצעה (Proposal), ריצה והפקת קובץ בנק, על פריטים פתוחים בשלים; מפת התהליך מצמידה לשלב גם את FBL1N, ובדיקת השלב היא קיזוז הפריטים הפתוחים.",
        xrefs: ["tx:F110", "tx:FBL1N"],
      },
      {
        he: "לסגור את המעגל בפקודה: לפי רשומת פירוט התחום עלות החלף והשירות נצברת בפקודה ומותחשבנת למרכז העלות. לפי רשומת ME53N דרישת רכש פתוחה על פקודה יוצרת התחייבות שחוסמת סילוק, ולפי רשומת התחום, כשלא ניתן לבצע TECO יש לסגור הודעות פתוחות והזמנות רכש פתוחות; לכן לבדוק את שתיהן לפני TECO.",
        xrefs: ["tx:ME53N", "bp:order-settlement-process", "bp:maintenance-order-process"],
      },
      {
        he: "בממשק: BAPI_PR_CREATE יוצר דרישת רכש מפקודה (לפי רשומת קטלוג הפונקציות, לחלפים ולשירותים לא-מלאיים), ואחרי הצלחה BAPI_TRANSACTION_COMMIT; BAPI_REQUISITION_GETDETAIL שולף את פרטי הדרישה ואת הייחוס החשבונאי.",
        xrefs: ["fm:BAPI_PR_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "fm:BAPI_REQUISITION_GETDETAIL", "bp:bapi-commit-discipline"],
      },
    ],
    antiPatterns: [
      "קטגוריית פריט שגויה בעץ המוצר (L במקום N): רזרבציה במקום דרישת רכש לחלף חיצוני, או להפך.",
      "דרישה בלי ייחוס חשבונאי נכון: העלות נזקפת במקום שגוי (רשומת פירוט התחום: עלות שגויה, ייחוס חשבונאי ב-EBKN).",
      "עריכה ידנית של EBKN במקום עדכון דרך הטרנזקציה.",
      "הזמנת רכש בלי הפניה לדרישה: כפילות נתונים ושבירת שרשרת המסמכים.",
      "אישור גיליון שירות לפני שהשירות בוצע בפועל, או חריגה מהכמות או מהערך שבהזמנה.",
      "קליטת חשבונית לפני הקבלה כשמופעל אימות חשבונית מבוסס קבלה.",
      "שחרור חשבונית חסומה בלי בירור הסטייה.",
      "הרצת תשלום בלי בדיקת ה-Proposal.",
      "סגירה טכנית של הפקודה כשדרישות או הזמנות רכש פתוחות עליה.",
      "השארת דרישות רכש ישנות שלא הומרו: הן מטות את הדוחות.",
    ],
    checks: [
      "חיובי: רכיב לא-מלאי בפקודה, דרישת רכש, הזמנת רכש, קבלה ועלות לפקודה.",
      "שירות: רכיב לא-מלאי, דרישת רכש, הזמנת רכש, קבלת שירות ועלות.",
      "אימות: הדרישה נוצרת עם ייחוס חשבונאי תקין, ו-EBKN נכון למרכז העלות של הפקודה.",
      "BAPI: דרישת רכש מפקודה נוצרת עם EBAN ו-EBKN, ודרישה שנוצרה מ-IW32 לרכיב לא-מלאי נשלפת עם הפריט.",
      "הזמנת רכש: תנאי מחיר ושחרור לפי release strategy.",
      "חשבונית: התאמה משולשת של הזמנה, קבלה וחשבונית, וחסימות מטופלות ב-MRBR.",
      "תשלום: ריצת F110 וקיזוז פריטים פתוחים.",
      "לאחר המרה: רזרבציה, ניפוק ודרישת רכש, והזמנת רכש לספק כ-Business Partner.",
    ],
    process: {
      purpose:
        "לרכוש לפקודת אחזקה את מה שאינו מנוהל במלאי, חלף לא-מלאי או שירות חיצוני, כך שהחלף או השירות זמינים בזמן: " +
        "הרכיב בפקודה יוצר דרישת רכש המחויבת לפקודה, והיא עוברת הזמנת רכש, קבלה, אימות חשבונית ותשלום, והעלות נצברת " +
        "בפקודה עד ההתחשבנות.",
      trigger: [
        { he: "רכיב לא-מלאי שמתוכנן בפקודת אחזקה, ידנית או מעץ המוצר של הציוד שנשלף לפקודה.", xrefs: ["tx:IW31", "tx:IW32"] },
        { he: "צורך בשירות חיצוני לפקודה, כמו שירות כיול." },
        { he: "חוסר בחלף: לפי רשומת התחום בודקים זמינות ומלאי, ולחלף לא-מלאי עוברים לדרישת רכש." },
      ],
      preconditions: [
        { he: "אב חומר לחלף או לשירות, עם נתוני רכש, לפי רשומת אב החומר של האחזקה.", xrefs: ["table:MARA", "tx:MM01"] },
        { he: "סוג פריט נכון ברכיב (מלאי או לא-מלאי) ומקור אספקה, לפי רשומת פירוט התחום." },
        { he: "קבוצת רכש וסוג דרישה, לפי רשומת BAPI_PR_CREATE בקטלוג הפונקציות.", xrefs: ["fm:BAPI_PR_CREATE"] },
        { he: "ספק כ-Business Partner: לפי ה-blueprint הספק הקבוע בדרישה מנוהל ב-S/4HANA דרך Business Partner (CVI).", xrefs: ["table:BUT000"] },
        { he: "להזמנת שירות: item category D והקצאת חשבון, לפי רשומת ML81N.", xrefs: ["tx:ML81N"] },
        { he: "tolerance keys לאימות החשבונית (OMR6) לפי רשומת MIRO, והגדרות FBZP ופרטי בנק בספק לתשלום לפי רשומת F110.", xrefs: ["tx:MIRO", "tx:FBZP", "tx:F110"] },
      ],
      masterData: [
        { he: "אב חומר: לפי רשומת אב החומר של האחזקה סוגים רלוונטיים ERSA (חלפים) ו-Non-stock, ושירות כיול חיצוני מוקם כ-Non-stock עם נתוני רכש בלבד.", xrefs: ["table:MARA", "table:MARC"] },
        { he: "עץ המוצר של הציוד: קטגוריית פריט L לרזרבציה ו-N לדרישת רכש.", xrefs: ["table:MAST", "table:STPO"] },
        { he: "ייחוס חשבונאי בדרישה: EBKN עם הפקודה (AUFNR), מרכז עלות וחשבון ראשי.", xrefs: ["table:EBKN", "table:AUFK"] },
        { he: "ספק כ-Business Partner.", xrefs: ["table:BUT000"] },
        { he: "מקור אספקה ומלאי בטחון לחלף, לפי רשומת פירוט התחום." },
      ],
      roles: [
        { he: "מתכנן תחזוקה: יוצר את הדרישה דרך הפקודה ועוקב אחריה ב-ME53N, לפי רשומות EBAN ו-ME53N.", xrefs: ["tx:ME53N"] },
        { he: "קניין ומנהל רכש: המרה להזמנת רכש ב-ME21N או ב-ME57, לפי רשומות EBAN ו-ME21N.", xrefs: ["tx:ME21N", "tx:ME57"] },
        { he: "מחסנאי ופקיד מלאי: קבלה ב-MIGO; רכש שירותים ומבקש או מאשר השירות, ובהם אחזקה (PM): גיליון השירות ב-ML81N.", xrefs: ["tx:MIGO", "tx:ML81N"] },
        { he: "הנהלת חשבונות ספקים ופקיד חשבוניות: MIRO, ושחרור חסומות ב-MRBR; צוות תשלומים ומנהל AP: F110.", xrefs: ["tx:MIRO", "tx:MRBR", "tx:F110"] },
      ],
      transactions: [
        { he: "פקודה ורכיבים: IW31 ו-IW32.", xrefs: ["tx:IW31", "tx:IW32"] },
        { he: "דרישת רכש: ME51N יצירה, ‏ME52N שינוי, ‏ME53N תצוגה, ‏ME54N אישור.", xrefs: ["tx:ME51N", "tx:ME52N", "tx:ME53N", "tx:ME54N"] },
        { he: "הזמנת רכש: ME21N יצירה, ‏ME22N שינוי, ‏ME23N תצוגה; המרה מדרישות ב-ME57 וב-ME59N.", xrefs: ["tx:ME21N", "tx:ME22N", "tx:ME23N", "tx:ME57", "tx:ME59N"] },
        { he: "קבלה: MIGO לחומר, ‏ML81N לגיליון רישום שירותים.", xrefs: ["tx:MIGO", "tx:ML81N"] },
        { he: "חשבונית ותשלום: MIRO, ‏MRBR לחשבוניות חסומות, ‏F110 ריצת תשלומים, ו-FBL1N לפי מפת התהליך.", xrefs: ["tx:MIRO", "tx:MRBR", "tx:F110", "tx:FBL1N"] },
        { he: "Fiori לפי מפת התהליך: Manage Purchase Requisitions, ‏Create Purchase Order, ‏Post Goods Movement, ‏Verify Supplier Invoice ו-Manage Automatic Payments; רשומת פירוט התחום מוסיפה Process Purchase Requisitions. אין מזהה מאומת בקטלוג הפרויקט, ולכן אין קישור." },
      ],
      tables: [
        { he: "EBAN שורות דרישת הרכש ו-EBKN החיוב שלה, המקושר לפקודה (EBKN.AUFNR = AUFK.AUFNR לפי ה-blueprint).", xrefs: ["table:EBAN", "table:EBKN", "table:AUFK"] },
        { he: "MKPF ו-MSEG מסמך החומר של הקבלה, לפי רשומת MIGO; ב-S/4HANA תנועות המלאי נרשמות ל-MATDOC, לפי רשומת פירוט התחום.", xrefs: ["table:MKPF", "table:MSEG", "cds:I_MaterialDocumentItem", "bp:matdoc-read-through-compatibility"] },
        { he: "ACDOCA ברישום הפיננסי של שלב התשלום, לפי מפת התהליך.", xrefs: ["table:ACDOCA"] },
        { he: "טבלאות שרשומות המאגר נוקבות בהן ואינן במילון הפרויקט, ולכן מופיעות בפרוזה בלבד: EKKO ו-EKPO של הזמנת הרכש, ‏EKBE היסטוריית ההזמנה, ‏RBKP ו-RSEG של החשבונית, ‏BSIK בשלב התשלום, ‏ESSR ו-ESLL של גיליון השירות, ו-MATDOC." },
        { he: "האובייקטים העסקיים פקודת תחזוקה ומסמך חומר.", xrefs: ["obj:maintenance-order", "obj:material-document"] },
      ],
      integrationPoints: [
        { he: "PM אל MM: רכיב מלאי ברזרבציה ובניפוק, ורכיב לא-מלאי בדרישת רכש; צד המלאי מפורט ברשומה bp:material-staging-and-reservation.", xrefs: ["bp:material-staging-and-reservation", "table:RESB", "table:EBAN"] },
        { he: "MM אל FI: לפי רשומת MIRO החשבונית כותבת RBKP ו-RSEG ומסמך FI ומנקה את חשבון ה-GR/IR; לפי רשומת F110 התשלום ב-S/4HANA נרשם ל-Universal Journal.", xrefs: ["tx:MIRO", "tx:F110", "table:ACDOCA"] },
        { he: "PM אל CO: העלות נצברת בפקודה ומותחשבנת למרכז העלות.", xrefs: ["bp:order-settlement-process"] },
        { he: "ממשק תוכניתי לפי רשומות התחום: BAPI_PR_CREATE, ‏BAPI_REQUISITION_GETDETAIL ו-BAPI_GOODSMVT_CREATE; לפי רשומת BAPI_PR_CREATE בקטלוג הפונקציות, אחרי הצלחה BAPI_TRANSACTION_COMMIT, וב-S/4HANA קיימת חלופה API_PURCHASEREQ_PROCESS_SRV.", xrefs: ["fm:BAPI_PR_CREATE", "fm:BAPI_REQUISITION_GETDETAIL", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"] },
        { he: "לפי התיעוד הרשמי, שירות OData API_PURCHASEREQ_PROCESS_SRV מציע יצירה, קריאה, עדכון ומחיקה של דרישת רכש, ותרחיש קריאה בשירות OData V4 מחזיר את הדרישה עם פריטיה, הטקסטים והייחוס החשבונאי; שני העמודים אינם נוקבים ב-BAPI ואינם מציגים אותו כמוחלף.", xrefs: ["fm:BAPI_PR_CREATE", "fm:BAPI_REQUISITION_GETDETAIL"] },
        { he: "ממשקי מפת התהליך: ORDERS IDoc ו-API_PURCHASEORDER בהזמנת הרכש, ‏INVOIC IDoc בחשבונית, ‏PAYEXT / DMEE בתשלום; אינם במילון הפרויקט ולכן אינם מקושרים." },
        { he: "קבלנות משנה בפקודת אחזקה: לפי תיעוד ניהול האחזקה הרשמי, בשמירה או בשחרור של הפקודה המערכת יוצרת אוטומטית דרישת רכש של קבלנות משנה, ושינוי ברמת הרכיב אחרי יצירתה משתקף בה.", xrefs: ["table:EBAN"] },
        { he: "הרחבות לפי רשומת פירוט התחום: IWO10009 ו-MBCF0002, ‏WORKORDER_GOODSMVT ו-MB_MIGO_BADI; רשומת ME51N מוסיפה ME_PROCESS_REQ_CUST ו-MEREQ001, שאינם במילון הפרויקט.", xrefs: ["enh:exit:IWO10009", "enh:exit:MBCF0002", "enh:badi:WORKORDER_GOODSMVT", "enh:badi:MB_MIGO_BADI"] },
      ],
      outputs: [
        { he: "דרישת רכש מחויבת לפקודה (EBAN, ‏EBKN).", xrefs: ["table:EBAN", "table:EBKN"] },
        { he: "הזמנת רכש לספק, ומסמך קבלה או גיליון שירות מאושר.", xrefs: ["tx:ME21N", "tx:MIGO", "tx:ML81N"] },
        { he: "חשבונית מאומתת ותשלום לספק.", xrefs: ["tx:MIRO", "tx:F110"] },
        { he: "עלות בפועל בפקודה, לקראת ההתחשבנות.", xrefs: ["bp:order-settlement-process"] },
      ],
      exceptions: [
        { he: "דרישת רכש לא נוצרה: סוג פריט או מקור אספקה, לפי רשומת פירוט התחום; ב-BAPI_PR_CREATE: קבוצת רכש חסרה או קטגוריית פריט שגויה.", xrefs: ["fm:BAPI_PR_CREATE"] },
        { he: "עלות שגויה בפקודה בגלל ייחוס חשבונאי (EBKN); לפי רשומת EBKN במודיעין האובייקטים, אובייקט CO שגוי בייחוס לפני המרה להזמנה עלול לחסום את הקבלה.", xrefs: ["table:EBKN"] },
        { he: "קבלה נכשלת: תקופת MM סגורה (M7 053), חוסר הרשאה לתנועה או למפעל, או חשבון G/L שלא נמצא ב-OBYC, לפי רשומת MIGO.", xrefs: ["tx:MIGO"] },
        { he: "גיליון שירות נדחה: אין פריט הזמנה עם item category D, נתוני הקצאת חשבון חסרים או כמות מעבר ליתרה בהזמנה, לפי רשומת ML81N.", xrefs: ["tx:ML81N"] },
        { he: "חשבונית חסומה לתשלום: סטיית מחיר או כמות מעבר ל-tolerance, או GR חסר באימות מבוסס קבלה, לפי רשומת MIRO.", xrefs: ["tx:MIRO", "tx:MRBR"] },
        { he: "ריצת תשלום: אין אמצעי תשלום תקף, אמצעי תשלום שאינו מותר לספק, או פריטים חסומים לתשלום, לפי רשומת F110.", xrefs: ["tx:F110"] },
        { he: "סילוק או סגירה טכנית נחסמים בגלל דרישות או הזמנות רכש פתוחות על הפקודה.", xrefs: ["tx:ME53N"] },
      ],
      controls: [
        { he: "Release strategy לדרישת הרכש ולהזמנת הרכש: לפי רשומת EBAN במודיעין האובייקטים לפי ערך או קבוצת רכש, ולפי רשומת ME21N לבקרת תקציב.", xrefs: ["tx:ME54N", "tx:ME21N"] },
        { he: "הזמנת רכש מתוך הדרישה לשמירת שרשרת המסמכים.", xrefs: ["tx:ME21N"] },
        { he: "אימות חשבונית מבוסס קבלה ו-tolerance keys (OMR6), וניטור שבועי של חשבוניות חסומות.", xrefs: ["tx:MIRO", "tx:MRBR"] },
        { he: "בדיקת ה-Proposal לפני ריצת התשלום.", xrefs: ["tx:F110"] },
        { he: "ניטור דרישות והזמנות רכש פתוחות על הפקודה לפני TECO.", xrefs: ["tx:ME53N"] },
        { he: "ניקוי דרישות רכש ישנות שלא הומרו." },
        { he: "עדכון EBKN דרך הטרנזקציה בלבד, ושמירת העקיבות בין EBAN ל-EBKN לדוחות ההתחייבויות.", xrefs: ["table:EBKN"] },
      ],
      eccToS4: [
        { he: "לפי רשומת פירוט התחום, מודל RESB ו-EBAN זהה, תנועות המלאי עוברות ל-MATDOC והספקים מנוהלים כ-Business Partner.", xrefs: ["table:EBAN", "table:RESB", "bp:matdoc-read-through-compatibility"] },
        { he: "ה-blueprint מסמן את EBAN 'מותאם (Business Partner לספקים)' עם 'EBAN (זהה)', ואת EBKN 'מותאם (חיוב ל-ACDOCA)' עם 'EBKN (זהה); עלות בפועל ב-ACDOCA'.", xrefs: ["table:EBAN", "table:EBKN", "table:ACDOCA"] },
        { he: "לפי נושא המעבר, ב-S/4HANA Business Partner הוא נקודת הכניסה היחידה, ספק הוא תפקיד של BP ו-CVI חובה, וספקי חלפים ב-PM-MM מושפעים." },
        { he: "לפי רשומות tx-intel, ‏ME51N, ‏ME21N, ‏MIGO ו-MIRO זמינות ב-S/4HANA לצד אפליקציות Fiori, ו-ME51, ‏ME21 ו-MB1A הישנות מסומנות deprecated.", xrefs: ["tx:ME51N", "tx:ME21N", "tx:MIGO", "tx:MIRO", "tx:MB1A"] },
        { he: "לפי רשומת ML81N היא עדיין נתמכת ב-S/4HANA לשירותים הקלאסיים, לצד גישת Lean Services ואפליקציות Fiori לגיליונות שירות.", xrefs: ["tx:ML81N"] },
        { he: "לפי רשומת F110, ב-S/4HANA התשלום נרשם ל-Universal Journal ומנוהל גם ב-Fiori 'Manage Automatic Payments'.", xrefs: ["tx:F110", "table:ACDOCA"] },
        { he: "לפי התיעוד הרשמי לגרסת 2025 FPS01, שירות OData API_PURCHASEREQ_PROCESS_SRV הוא חלופה מתועדת ליצירה ולעדכון של דרישת רכש, ואינו מציג את BAPI_PR_CREATE כמוחלף.", xrefs: ["fm:BAPI_PR_CREATE"] },
      ],
      migration: [
        { he: "לפי רשומת פירוט התחום, ‏RESB ו-EBAN נשמרות ותנועות עוברות ל-MATDOC; בדיקה לאחר המרה: רזרבציה, ניפוק ודרישת רכש, והזמנת רכש לספק כ-Business Partner.", xrefs: ["table:RESB", "table:EBAN"] },
        { he: "לפי ה-blueprint, ‏CVI והמרת ספקים ולקוחות ל-Business Partner נדרשים לפני ההמרה או במהלכה (Pre-check חובה), ולפי נושא המעבר זהו צעד הכנה קריטי במיגרציה (סנכרון CVI ו-Number Ranges).", xrefs: ["table:EBAN", "table:BUT000"] },
        { he: "לפי ה-blueprint של EBKN, עלויות מומרות ל-ACDOCA ב-SUM ויש להתאים דוחות עלות מותאמים והרצות התחשבנות.", xrefs: ["table:EBKN", "table:ACDOCA"] },
        { he: "דרישות רכש פתוחות: עמוד אובייקט ההגירה הרשמי 'MM - Purchase requisition (only open PR)' לגרסת 2025 FPS01 נוקב ב-BAPI_PR_CREATE ובאובייקט S4_MM_PURCHASE_REQUISITION, עם טבלאות וירטואליות לנתוני הפריט (ART_EBAN) ולנתוני הייחוס החשבונאי (ART_EBKN).", xrefs: ["fm:BAPI_PR_CREATE", "table:EBAN", "table:EBKN"] },
      ],
      reference: null,
    },
    xrefs: [
      "tx:IW31", "tx:IW32", "tx:MM01", "tx:ME51N", "tx:ME52N", "tx:ME53N", "tx:ME54N", "tx:ME21N", "tx:ME22N",
      "tx:ME23N", "tx:ME57", "tx:ME59N", "tx:MIGO", "tx:ML81N", "tx:MIRO", "tx:MRBR", "tx:F110", "tx:FBL1N",
      "tx:FBZP", "tx:MB1A",
      "table:EBAN", "table:EBKN", "table:AUFK", "table:RESB", "table:MAST", "table:STPO", "table:MARA", "table:MARC",
      "table:BUT000", "table:MKPF", "table:MSEG", "table:ACDOCA",
      "fm:BAPI_PR_CREATE", "fm:BAPI_REQUISITION_GETDETAIL", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_TRANSACTION_COMMIT",
      "cds:I_MaterialDocumentItem",
      "enh:exit:IWO10009", "enh:exit:MBCF0002", "enh:badi:WORKORDER_GOODSMVT", "enh:badi:MB_MIGO_BADI",
      "obj:maintenance-order", "obj:material-document",
      "bp:material-staging-and-reservation", "bp:maintenance-order-process", "bp:order-settlement-process",
      "bp:goods-movement-process", "bp:quality-inspection-in-production", "bp:bapi-commit-discipline",
      "bp:matdoc-read-through-compatibility",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'רכש לתשלום (P2P)' של הפרויקט (PROCESS_MAPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "מדרישת רכש דרך הזמנה, קבלה, חשבונית ועד תשלום. דרישת רכש: ME51N, ‏ME53N, טבלאות EBAN ו-EBKN, ‏Fiori 'Manage " +
          "Purchase Requisitions', ממשק BAPI_REQUISITION_*, בדיקה 'PR נוצרת עם ייחוס חשבונאי תקין'. הזמנת רכש: ME21N, " +
          "ME22N, ‏ME23N, טבלאות EKKO ו-EKPO, ‏Fiori 'Create Purchase Order', ממשקים 'ORDERS IDoc' ו-API_PURCHASEORDER, בדיקה " +
          "'PO עם תנאי מחיר; שחרור (release strategy)'. קבלת טובין: MIGO, טבלאות MATDOC ו-MSEG, ‏Fiori 'Post Goods " +
          "Movement', ממשק BAPI_GOODSMVT_CREATE, בדיקה 'GR 101 מעדכן מלאי; QM lot אם פעיל'. חשבונית (LIV): MIRO, טבלאות " +
          "RBKP ו-RSEG, ‏Fiori 'Verify Supplier Invoice', ממשק 'INVOIC IDoc', בדיקה '3-way match (PO/GR/Invoice); חסימות " +
          "MRBR'. תשלום: F110, ‏FBL1N, טבלאות BSIK ו-ACDOCA, ‏Fiori 'Manage Automatic Payments', ממשק 'PAYEXT / DMEE', בדיקה " +
          "'ריצת תשלומים F110; קיזוז פריטים פתוחים'.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#p2p",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'אינטגרציית חלפים (PM-MM)' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "אינטגרציית חלפים מחברת אחזקה לרכש ולמלאי: רכיבי פקודה, הזמנות מלאי, דרישות רכש ומשיכת חומר מהמחסן, ומבטיחה " +
          "זמינות חלפים. זרימה: רכיבי פקודה, הזמנת מלאי (RESB), דרישת רכש (EBAN), משיכת חומר (MB1A), צריכה בפקודה. " +
          "טבלאות RESB, ‏EBKN, ‏EBAN, ‏MAST, ‏MARC; טרנזקציות IW31, ‏MB1A, ‏ME21N, ‏IW3M, ‏MB21; BAPIs BAPI_RESERVATION_CREATE1, " +
          "BAPI_PR_CREATE, ‏BAPI_GOODSMVT_CREATE. לימוד: RESB הזמנת מלאי לרכיבי הפקודה, ו-EBKN/EBAN דרישת רכש לחלפים " +
          "לא-מלאיים; חומר מלאי מול לא-מלאי, והלא-מלאי לדרישת רכש. תקלה: חוסר חלף, לבדוק ATP ומלאי ולהפוך לדרישת רכש " +
          "לחלף לא-מלאי.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-spare-parts",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'אינטגרציית חלפים (PM-MM)' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "מטרה: רכיבים לפקודות אחזקה, מלאי (רזרבציה ו-GI) או לא-מלאי (דרישת רכש, הזמנה, קבלה), זמינות חלף בזמן ושיוך " +
          "עלות לפקודה. נתוני אב: אב חומר (חלף), סוג פריט (מלאי או לא-מלאי), מקור אספקה, מלאי בטחון. פונקציות " +
          "RESERVATION_READ, BAPI_REQUISITION_GETDETAIL, ACCOUNT_ASSIGNMENT_READ, BAPI_GOODSMVT_CREATE; Exits IWO10009 " +
          "ו-MBCF0002; BAdIs WORKORDER_GOODSMVT ו-MB_MIGO_BADI. QA: רכיב לא-מלאי, דרישת רכש, הזמנת רכש, קבלה ועלות לפקודה. " +
          "תקלות: דרישת רכש לא נוצרה (סוג פריט או מקור), עלות שגויה (ייחוס חשבונאי, ‏EBKN). תרחיש: אטם כרכיב מלאי ושירות " +
          "כיול חיצוני כלא-מלאי (דרישת רכש, הזמנה לספק, קבלת שירות); שתי העלויות נצברות בפקודה ומותחשבנות למרכז העלות. " +
          "Fiori: Manage Stock, ‏Process Purchase Requisitions, ‏Post Goods Movement. הגירה: RESB ו-EBAN נשמרים ותנועות " +
          "ל-MATDOC; QA של רזרבציה, ‏GI ודרישת רכש. ECC מול S/4: מודל RESB/EBAN זהה; תנועות מלאי ל-MATDOC ו-BP לספקים; CDS " +
          "I_MaterialDocumentItem; פישוט MM-IM ו-Business Partner; QA של רזרבציה, ‏GI, דרישת רכש והזמנה לספק BP.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-spare-parts",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'ביצוע אחזקה' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ביצוע אחזקה מנהל את מחזור פקודת האחזקה: תכנון משאבים וחומרים, שחרור, ביצוע, אישורים, תנועות מלאי וסגירה " +
          "טכנית ועסקית (TECO/CLSD). תקלה: לא ניתן ל-TECO, לסגור הודעות פתוחות והזמנות רכש פתוחות.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-maintenance-execution",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת ME51N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ME51N יוצרת דרישת רכש לחומר או לשירות בטבלאות EBAN ו-EBKN, ו-account assignment category קובע את החיוב; תהליך: " +
          "זיהוי צורך (ידני או MRP), דרישת רכש, אישור (ME54N), המרה להזמנה (ME21N, ‏ME57, ‏ME59N). release strategy לדרישה " +
          "נפרדת מזו של ההזמנה. משתמשים: מתכנן, מחסנאי, מבקש פנימי, קניין. המלצות: להזין source of supply, להגדיר release " +
          "strategy לדרישה, להשתמש ב-account assignment נכון לפי סוג הצורך. BAPIs BAPI_PR_CREATE ו-BAPI_REQUISITION_CREATE; " +
          "BAdI ME_PROCESS_REQ_CUST; Exit MEREQ001. ב-S/4 זמינה עם Fiori, ו-ME51 הישן deprecated.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME51N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת ME53N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ME53N מציגה דרישת רכש (EBAN/EBKN) בלי עריכה; לשונית הסטטוס מראה אם נוצרו ממנה הזמנת רכש או RFQ. משתמשים: " +
          "מתכנן, קניין, מבקש פנימי, הנהלת חשבונות. דוגמה: מתכנן אחזקה בודק דרישת רכש שנוצרה מפקודה, אם כבר הומרה להזמנת " +
          "רכש ומתי צפויה האספקה. טיפ: דרישת רכש פתוחה על פקודה יוצרת התחייבות שחוסמת סילוק, ויש לנטר אותה לפני TECO.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME53N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת ME21N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ME21N יוצרת הזמנת רכש לספק, למוצרים או לשירותים, בטבלאות EKKO ו-EKPO, עם הפניה לדרישה, ל-RFQ, לחוזה או להזמנה קיימת; Account " +
          "assignment category (K/F/A/P) קובע את החיוב. תהליך: דרישה, הזמנה, אישור (Release), קבלה (MIGO), חשבונית (MIRO), " +
          "תשלום. לא לשינוי (ME22N) ולא לתצוגה (ME23N). משתמשים: קניין, מנהל רכש. טעות: אי שימוש בהפניה לדרישה וכך " +
          "כפילות נתונים; המלצות: ליצור הזמנה מתוך הדרישה לשמירת שרשרת המסמכים, ולהגדיר release strategy לבקרת תקציב. " +
          "ב-S/4 זמינה, ו-ME21 הישן deprecated.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME21N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MIGO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MIGO היא הטרנזקציה המאוחדת לתנועות מלאי וכותבת MKPF ו-MSEG; קבלה מהזמנת רכש (101) מעדכנת את היסטוריית ההזמנה " +
          "(EKBE) ומבצעת GR/IR clearing. משתמשים: מחסנאי, מנהל מחסן, פקיד מלאי. שגיאות: תקופת MM סגורה (M7 053), חוסר " +
          "הרשאה לתנועה או למפעל, מלאי לא מספיק, חשבון G/L לא נמצא ב-OBYC, אצווה חסרה. BAPI_GOODSMVT_CREATE ברקע. ב-S/4 " +
          "זמינה, ו-MB01/MB1A/MB1B/MB1C deprecated לטובתה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIGO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת ML81N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ML81N יוצרת ומאשרת גיליון רישום שירותים (Service Entry Sheet) מול הזמנת רכש לשירותים (ESSR/ESLL); האישור יוצר " +
          "תנועה לוגית 101 לשירות, מסמך GR ומסמך FI, ומבוסס על Item Category D בהזמנה. משתמשים: רכש שירותים, מבקש או " +
          "מאשר שירות, אחזקה (PM), פרויקטים. דרישות: הזמנה עם item category D והקצאת חשבון (תקציבית, הזמנת עבודה או WBS). " +
          "תהליך: הזמנת שירות (ME21N), ביצוע, רישום ואישור ב-ML81N, חשבונית (MIRO), תשלום. שגיאות: אין פריט הזמנה עם item " +
          "category D, נתוני הקצאת חשבון חסרים, כמות מעבר ליתרה. טעויות: אישור לפני ביצוע השירות, חריגה מהכמות או מהערך " +
          "בהזמנה. המלצה: להתאים שורות הגיליון לשורות החשבונית. ב-S/4 קיימת ונתמכת לשירותים קלאסיים, לצד גישת Lean " +
          "Services ואפליקציות Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ML81N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MIRO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MIRO קולטת חשבונית ספק מול הזמנת רכש וקבלה (3-way match), כותבת RBKP ו-RSEG ומסמך FI/CO, חוסמת תשלום בסטיית " +
          "מחיר או כמות מעבר ל-tolerance (OMR6) ומנקה את חשבון ה-GR/IR. משתמשים: הנהלת חשבונות ספקים, פקיד חשבוניות. " +
          "שגיאות: סטייה מעבר ל-tolerance וחסימה, תקופה סגורה, ‏GR חסר ב-GR-based IV. טעות: קליטת חשבונית לפני GR ב-GR-based " +
          "IV. המלצות: GR-based invoice verification, ‏tolerance keys, טיפול בחשבוניות חסומות ב-MRBR. ב-S/4 זמינה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIRO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MRBR",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "MRBR משחררת חשבוניות שנחסמו ב-MIRO (חסימה R) עקב סטיות מחיר, כמות או תאריך, ידנית או אוטומטית. משתמשים: פקיד " +
          "AP, צוות כספים, מנהל רכש. טעות: שחרור בלי בירור הסטייה. המלצות: בירור סיבת החסימה לפני שחרור, ניטור שבועי של " +
          "החסומות.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MRBR",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת F110",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "F110 היא תוכנית התשלומים האוטומטית: פרמטרים, הצעה (Proposal), ריצה והפקת קובץ בנק (DME) על פריטים פתוחים " +
          "בשלים, ונשענת על הגדרות FBZP ועל פרטי הבנק במאסטר הספק. משתמשים: צוות תשלומים, צוות אוצר, מנהל AP. שגיאות: אין " +
          "אמצעי תשלום תקף, אמצעי תשלום שאינו מותר לספק, פריטים חסומים לתשלום. טעות: הרצת ריצה בלי בדיקת ה-Proposal. " +
          "ב-S/4 זמינה, ‏Fiori 'Manage Automatic Payments', ורושמת ל-Universal Journal.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#F110",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין מודולי הפונקציה של הפרויקט (FUNCTION_INTEL): BAPI_PR_CREATE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "BAPI_PR_CREATE יוצר דרישת רכש לחלפים או לשירותים לא-מלאיים, באינטגרציית PM-MM (דרישת רכש לחלף בפקודה); זרימה: " +
          "רכיב פקודה, דרישת רכש, הזמנת רכש. קלט PRHEADER/PRITEM, פלט NUMBER (מספר הדרישה ב-EBAN) ו-RETURN, וחובה לקרוא " +
          "BAPI_TRANSACTION_COMMIT לאחר הצלחה. QA: דרישה לחלף לא-מלאי וקישור לפקודה; כשלים: קבוצת רכש חסרה, קטגוריית פריט " +
          "שגויה; תלויות: קבוצת רכש, סוג דרישה; תרחיש: דרישת רכש מפקודה עם EBAN ו-EBKN. ב-S/4 זמין, חלופה " +
          "API_PURCHASEREQ_PROCESS_SRV.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_PR_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין מודולי הפונקציה של הפרויקט (FUNCTION_INTEL): BAPI_REQUISITION_GETDETAIL",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "BAPI_REQUISITION_GETDETAIL שולף פרטי דרישת רכש: פריטים, ייחוס חשבונאי ומקור, לרכש חלפים לאחזקה (PM-MM); קלט " +
          "NUMBER ופלט פריטים וייחוס. QA: שליפת דרישה מפקודת אחזקה וייחוס חשבונאי; תרחיש: דרישה שנוצרה מ-IW32 לרכיב " +
          "לא-מלאי. ב-S/4 זמין, חלופה OData API_PURCHASEREQ_PROCESS_SRV.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_REQUISITION_GETDETAIL",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת EBKN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "EBKN מחזיקה את נתוני הקצאת החשבון של שורת דרישת רכש (מרכז עלות, ‏WBS, הזמנה, חשבון G/L), רלוונטית כשהדרישה " +
          "מוקצית חשבון (KNTTP אינו ריק), וחיוב מפוצל הוא כמה שורות ZEKKN; מפתח זר AUFNR אל AUFK, ובדוגמת הדיבוג פקודת PM " +
          "כמקבל נרשמת כ-AUFNR ב-EBKN.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#EBKN",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PM), נושא 9 'אינטגרציית מלאי ורכש (PM-MM)', שורת EBAN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "EBAN 'דרישת רכש', טרנזקציות 'ME51N; ME52N/ME53N, ‏ME57', ‏Fiori 'Manage Purchase Requisitions (אמת ID)', עמודת S/4 " +
          "'מותאם (Business Partner לספקים)', 'EBAN (זהה)', 'ME51N נתמך; ספק דרך BP', והערת SUM 'נדרש CVI והמרת " +
          "ספקים/לקוחות ל-Business Partner לפני/במהלך ההמרה (Pre-check חובה)'; פונקציות BAPI_PR_CREATE " +
          "ו-BAPI_REQUISITION_GETDETAIL; שדה KNTTP 'Account assignment cat. (F=order)'; קשר EBAN.FLIEF = BUT000.PARTNER, " +
          "'ספק קבוע בדרישת הרכש - ב-S/4 דרך Business Partner (CVI)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:EBAN",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PM), נושא 9 'אינטגרציית מלאי ורכש (PM-MM)', שורת EBKN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "EBKN 'חיוב דרישת רכש (לפק\"ע)', טרנזקציות 'ME51N; ME52N', עמודת S/4 'מותאם (חיוב ל-ACDOCA)', 'EBKN (זהה); עלות " +
          "בפועל ב-ACDOCA', והערת SUM: עלויות מומרות ל-Universal Journal (ACDOCA) ב-SUM, ‏COSP ו-COSS הופכים ל-Views, ויש " +
          "להתאים דוחות עלות מותאמים והרצות התחשבנות. שדות BANFN, ‏BNFPO, ‏AUFNR 'פק\"ע מחויבת', ‏KOSTL, ‏SAKTO; קשר " +
          "EBKN.AUFNR = AUFK.AUFNR, 'דרישת הרכש מחויבת לפק\"ע'; פונקציה ACCOUNT_ASSIGNMENT_READ; תוכנית RM06BANF.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:EBKN",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין האובייקטים של הפרויקט (OBJECT_INTEL): רשומת EBAN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "EBAN נוצרת על ידי מבקש רכש (ME51N), מערכת MRP ומתכנן תחזוקה (PM דרך הזמנה), נקראת על ידי קניין (ME21N / ME57) " +
          "ומנהל רכש, ומתעדכנת בהמרה להזמנה, ב-ME52N ובזרימת אישורים (Release). תרחיש: דרישת רכש לשירות חיצוני שנוצרה " +
          "מפקודת תחזוקה (PM). המלצות: אסטרטגיות שחרור לפי ערך או קבוצת רכש, שמירה על הקישור ל-EBKN לחשבונאות עלויות " +
          "נכונה, ניקוי דרישות פתוחות ישנות שלא הומרו כדי לא להטות דוחות.",
        verificationLevel: "repository_verified",
        repoRef: "data/knowledge/object-intel.ts#EBAN",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין האובייקטים של הפרויקט (OBJECT_INTEL): רשומת EBKN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "EBKN נוצרת על ידי מבקש רכש, מערכת MRP ומתכנן תחזוקה (ייעוד לפקודת PM), ונקראת גם על ידי מערכת ההתחשבנות בזמן " +
          "GR/IR. תרחיש: ייעוד לפקודת תחזוקה (F) כך שהעלות תיזקף לפקודת PM. המלצות: התאמה בין קטגוריית ייעוד החשבון " +
          "לאובייקט, בדיקת אובייקט ה-CO לפני המרה להזמנת רכש למניעת חסימת GR, הימנעות מעריכה ידנית של EBKN ועדכון דרך " +
          "הטרנזקציה, ושמירת עקיבות בין EBAN ל-EBKN לדוחות התחייבויות.",
        verificationLevel: "repository_verified",
        repoRef: "data/knowledge/object-intel.ts#EBKN",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז ה-QA של הפרויקט: 'אינטגרציה PM-MM (חלפים)'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "טרנזקציות IW32, ‏ME53N, ‏MIGO, ‏MB23; טבלאות RESB, ‏EBAN, ‏MATDOC, ‏EBKN. תרחישים: רכיב מלאי, רזרבציה, ‏GI 261 ועלות " +
          "לפקודה; רכיב לא-מלאי, דרישת רכש, הזמנת רכש, קבלת שירות ועלות; ייחוס חשבונאי (EBKN) נכון למרכז עלות הפקודה; GI " +
          "ללא מלאי נכשל; ביטול אישור מהפך רזרבציה ו-GI.",
        verificationLevel: "repository_verified",
        repoRef: "data/qa-center.ts#integration-pm-mm",
      },
      {
        sourceType: "repository",
        sourceTitle: "נתוני האב של האחזקה בפרויקט (PM master-data facets): עץ מוצר (BOM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "באחזקה עץ המוצר משמש להקצאת חלקי חילוף לפקודות; קטגוריות פריט: L (מלאי, לרזרבציה), ‏N (לא-מלאי, לדרישת רכש), ‏I " +
          "(אלמנט מבנה PM), ‏T (טקסט). טעות נפוצה: קטגוריית פריט שגויה (L במקום N) מביאה לרזרבציה במקום דרישת רכש לחלף " +
          "חיצוני, או להפך. דוגמה: שירות כיול חיצוני כפריט לא-מלאי (N) לדרישת רכש, והחלפים נשלפים אוטומטית בפתיחת פקודה. " +
          "טבלאות MAST, ‏STKO, ‏STPO, ‏STAS.",
        verificationLevel: "repository_verified",
        repoRef: "data/pm-master-data-facets.ts#MAST",
      },
      {
        sourceType: "repository",
        sourceTitle: "נתוני האב של האחזקה בפרויקט (PM master-data facets): אב חומר",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "באחזקה אב החומר משמש לחלקי חילוף (מלאי ולא-מלאי); סוגים רלוונטיים: ERSA (חלפים), ‏Non-stock, משאבי תפעול; נוצר " +
          "ב-MM01. דוגמה: אטם מוקם כחומר ERSA (חלף מלאי) ושירות כיול חיצוני כ-Non-stock עם נתוני רכש בלבד, ושניהם רכיבי " +
          "BOM ורזרבציות או דרישות רכש בפקודות. טבלאות MARA, ‏MARC, ‏MBEW, ‏MAKT.",
        verificationLevel: "repository_verified",
        repoRef: "data/pm-master-data-facets.ts#MARA",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'Business Partner (CVI)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE23,
        claim:
          "ECC: לקוח (XD01) וספק (XK01) נוהלו בנפרד ו-BP אופציונלי. S/4HANA: Business Partner הוא נקודת הכניסה היחידה, " +
          "לקוח וספק הם תפקידי BP ו-CVI חובה. השפעה: צעד הכנה קריטי במיגרציה (סנכרון CVI, ‏Number Ranges); ספקי חלפים " +
          "ב-PM-MM מושפעים.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#business-partner",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Subcontract Purchase Requisitions and Purchase Orders | Maintenance Management (אומת ברשומת table:EBAN)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b9f59902a6c647e19960e4b05b522b0a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TBL_15,
        claim: "תיעוד ניהול האחזקה (Maintenance Management) בגרסת 2025 FPS01 קובע שבשמירה או בשחרור של צו אחזקה המערכת יוצרת אוטומטית דרישת רכש של קבלנות משנה: 'When you save or release a maintenance order, the system automatically creates a subcontract purchase requisition', ושינויים בצו האחזקה ברמת הרכיב לאחר יצירת הדרישה משתקפים באותה דרישה: 'If you make changes to the maintenance order at component level after creation of the purchase requisition, the changes are reflected in that purchase requisition'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MM - Purchase requisition (only open PR) | Data Migration (אומת ברשומת fm:BAPI_PR_CREATE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/978944291b0444bc90503f90fe51e1f0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim: "עמוד אובייקט ההגירה של דרישות רכש פתוחות בחוברת Data Migration לגרסת S/4HANA On-Premise 2025 FPS01 נוקב ב-BAPI_PR_CREATE בשמו, כלשון הסניפט: 'Purchase Requisition Number Manage Purchase Requisition Professional (app ID F2229) BAPI_PR_CREATE'. חלון סניפט נוסף של אותו עמוד (loio 978944291b0444bc90503f90fe51e1f0): 'Name of this migration object: S4_MM_PURCHASE_REQUISITION Virtual Tables ART_EBAN: To handle item data ART_EBKN: To handle account assignment data'. כלומר ה-BAPI נקוב בהקשר הגירת דרישות רכש ל-S/4HANA בגרסה זו. הסניפט מונה את השם בלבד ואינו מתאר פרמטרים, סטטוס שחרור או התנהגות COMMIT.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Purchase Requisition | APIs for Sourcing and Procurement (אומת ברשומת fm:BAPI_PR_CREATE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91af7f8d3acd47da90d33aaacfcd0d59/9fcd8bf3ff7644faa16c92a010e53fa1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim: "בחוברת 'APIs for Sourcing and Procurement' לגרסת S/4HANA On-Premise 2025 FPS01, העמוד 'Operations for Purchase Requisition' קובע: 'Purchase requisition offers the following operations', ובהן 'Create a purchase requisition Create POST', קריאה (GET) ועדכון (PATCH) תחת הנתיב /sap/opu/odata/sap/API_PURCHASEREQ_PROCESS_SRV/A_PurchaseRequisitionHeader, 'Delete a purchase requisition Delete PATCH' ופעולת EnableForPurchasing (POST). זו חלופת OData מתועדת ליצירה ולעדכון של דרישת רכש. העמוד אינו נוקב בשם ה-BAPI ואינו מציג אותו כמוחלף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Read a Purchase Requisition | APIs for Sourcing and Procurement (אומת ברשומת fm:BAPI_REQUISITION_GETDETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91af7f8d3acd47da90d33aaacfcd0d59/f244a2979ffd447bb3ed7a9e761fdf92.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FM_22,
        claim: "הקשר בלבד (לא טענת יורש): תרחיש הקריאה בשירות OData V4 לדרישות רכש במהדורת 2025 FPS01: 'In this scenario, you wish to read a purchase requisition', 'the purchase requisition along with its associated entities', ובדוגמה 'we are reading the purchase requisition \"10783070\", along with its items and associated entities'. פרגמנט אחר של אותו תקציר מציג GET על ‎/sap/opu/odata4/sap/api_purchaserequisition_2/srvd_a2x/sap/purchaserequisition/0001/PurchaseReqn(PurchaseRequisition='10783070') ותגובה הכוללת את הישויות _PurchaseRequisitionItem, _PurchaseReqnItemText, _PurchaseReqnAcctAssgmt ו-_PurchaseReqnDelivAddress, כלומר קריאת פריטים, טקסטים וייחוס חשבונאי של דרישת רכש. העמוד אינו נוקב ב-BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
    ],
    lastVerifiedAt: DATE23,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך חוצת מודולים (PM מול MM ו-FI), ממתינה לסקירת עורך אנושי. כל שדה בפרופיל נגזר מרשומות המאגר הנקובות, " +
      "רשומה אחת לכל ראיה, או מעמוד רשמי שכבר אומת ברשומות table:EBAN, ‏fm:BAPI_PR_CREATE ו-fm:BAPI_REQUISITION_GETDETAIL " +
      "(אותה כתובת ואותה טענה). הרשומה מקשרת אל bp:material-staging-and-reservation (צד המלאי), ‏bp:goods-movement-process " +
      "ו-bp:order-settlement-process במקום לשכפל אותם. פערים גלויים: שדה kpis הושמט, המאגר אינו מתעד מדדי ביצוע לרכש " +
      "לתחזוקה. לא אותר עמוד רשמי שכבר אומת בשכבות האימות ומכסה את תהליך הרכש לפקודת אחזקה, ולכן ההפניה הרשמית ריקה; " +
      "העמוד הרשמי שאומת ברשומת table:EBAN ועוסק בדרישת רכש מפקודת אחזקה מתאר קבלנות משנה בלבד. המאגר אינו מתעד מתי " +
      "נוצרת דרישת הרכש לרכיב לא-מלאי (בשמירה או בשחרור הפקודה), אינו מתעד מפתח בקרה לפעולה חיצונית בפקודה ואינו מקשר " +
      "את דרישת השירות מהפקודה ל-item category D שבהזמנה; זרימת השירות מתועדת כרכיב לא-מלאי וכגיליון שירות בלבד. המאגר " +
      "אינו מתעד את אופן הרישום בקבלה של פריט מוקצה-חשבון: בדיקת הקבלה במפת P2P מתארת עדכון מלאי. שמות אפליקציות " +
      "ה-Fiori שונים בין הרשומות (למשל 'Verify Supplier Invoice' במפת התהליך ו-'Create Supplier Invoice' ברשומת MIRO), " +
      "ואין להן מזהה בקטלוג הפרויקט. EKKO, ‏EKPO, ‏EKBE, ‏RBKP, ‏RSEG, ‏BSIK, ‏ESSR, ‏ESLL, ‏MATDOC ו-OMR6 אינם במילון הפרויקט " +
      "ולכן מופיעים בפרוזה בלבד. רשומת האימות fm:BAPI_REQUISITION_GETDETAIL לא איתרה עמוד רשמי הנוקב בשמו, " +
      "ו-ACCOUNT_ASSIGNMENT_READ, הנקוב ברשומות המאגר לקריאת החיוב, נמצא ברמת verification_required ואינו מוצג כאן " +
      "כממשק. ל-ME51N, ‏ME53N, ‏ME21N, ‏ML81N, ‏MIRO, ‏MRBR ו-F110 אין רשומת אימות רשמית. לא בוצעה בדיקה במערכת SAP חיה.",
  },
];
