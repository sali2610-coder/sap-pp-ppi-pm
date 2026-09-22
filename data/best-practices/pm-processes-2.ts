/* Project NEO · best practices, PM PROCESS CATALOG part 2 (design-audit
   continuation §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with
   no loader.

   Four whole PM processes: the maintenance order, preventive maintenance,
   technical objects, and the end-to-end plant maintenance map that ties them
   together. Every line is copied or condensed from the named repository
   records (repoRef) or from an official SAP page that an existing overlay
   already verified (same URL, same claim, same accessedAt). A field the
   repository does not document is left out on purpose: the page renders the
   gap by name. Nothing here asserts a new SAP fact. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-22";
/** accessedAt of the official pages reused from tx:IW31, tx:IW41 and fiori:F2730 / fiori:F2828. */
const DATE_TX2 = "2026-09-02";
/** accessedAt of the official pages reused from tx:IP30, tx:IP30H, tx:IE01 and tx:IL01. */
const DATE_TX7 = "2026-09-07";
/** accessedAt of the official pages reused from table:COBRB and table:EQUZ. */
const DATE_TBL15 = "2026-09-15";
/** accessedAt of the official pages reused from fm:BAPI_ALM_ORDER_GET_DETAIL and the 2025 FPS01 simplification list in tx:IP30. */
const DATE_FN21 = "2026-09-21";

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
        { he: "Fiori בקטלוג הפרויקט: Manage Maintenance Orders, Manage Maintenance Notifications and Orders, Perform Maintenance Jobs. רשומת האימות מסמנת את המזהה F2731 כדורש אימות נוסף, משום שהתיעוד הרשמי של 2025 FPS01 מצמיד את השם Manage Maintenance Orders למזהה F5241 שאינו בקטלוג הפרויקט.", xrefs: ["fiori:F2731", "fiori:F4604", "fiori:F5104A"] },
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:IW31, tx:IW41, " +
      "fm:BAPI_ALM_ORDER_GET_DETAIL, table:COBRB ו-fiori:F2730. מזהי Fiori: הקטלוג של הפרויקט נוקב ב-F2731 " +
      "ל-Manage Maintenance Orders, ורשומת fiori:F2731 מסמנת את המזהה כדורש אימות נוסף משום שהתיעוד הרשמי מצמיד " +
      "את השם ל-F5241, שאינו בקטלוג הפרויקט ולכן אינו מקושר כאן. F2730 נרשם בקטלוג כ-Confirm Jobs, והמקורות " +
      "הרשמיים מצמידים את השם למזהה W0020 שנמחק ב-2023. שמות הטבלאות QMIH, T357G, IHPA ו-IHGNS מופיעים ברשומות " +
      "המאגר אך אינם במילון הפרויקט ולכן אינם מקושרים. פריט SAP Best Practices (Scope Item) לתהליך לא אותר ולכן " +
      "ההפניה הרשמית היא עמוד תיעוד התהליך. לא בוצעה בדיקה במערכת SAP חיה.",
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
        { he: "Fiori בקטלוג הפרויקט: Maintenance Planning Overview לניטור התכנון. המזהים F2774 ו-F5325 שהתיעוד הרשמי מצמיד לתזמון ולניהול תוכניות אינם בקטלוג הפרויקט ולכן אינם מקושרים.", xrefs: ["fiori:F2828"] },
      ],
      tables: [
        { he: "MPLA כותרת התוכנית, MPOS פריט התוכנית.", xrefs: ["table:MPLA", "table:MPOS"] },
        { he: "MHIS היסטוריית התזמון, MHIO אובייקטי הקריאה.", xrefs: ["table:MHIS", "table:MHIO"] },
        { he: "PLKO, PLPO, PLAS ו-PLMZ לרשימות הפעולות; IMPTT ו-IMRG לנקודות מדידה ולקריאות.", xrefs: ["table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ", "table:IMPTT", "table:IMRG"] },
        { he: "האובייקט העסקי תוכנית תחזוקה ותצוגת ה-CDS שלה.", xrefs: ["obj:maintenance-plan", "cds:I_MaintenancePlan"] },
      ],
      integrationPoints: [
        { he: "תוכנית אל פקודה: הקריאה יוצרת פקודת תחזוקה או הודעה שיורשת את פעולות רשימת הפעולות.", xrefs: ["obj:maintenance-order", "tx:IW31", "bp:maintenance-order-process"] },
        { he: "תוכנית אל אובייקטים טכניים: אובייקט התוכנית הוא ציוד או מיקום פונקציונלי, ונקודות המדידה שלו מזינות את התזמון מבוסס הביצועים.", xrefs: ["table:EQUI", "table:IFLOT", "table:IMPTT", "bp:technical-objects-process"] },
        { he: "תוכנית אל QM: תוכנית כיול מפיקה פקודה עם מפתח בקרה לבדיקה, ומשם מנת בדיקה ורישום תוצאות.", xrefs: ["tx:QE11", "tx:QA11", "table:PLMK"] },
        { he: "הרחבות: Customer Exit‏ IPRM0001 לתזמון התוכנית, ו-IWO10009 לבדיקות בפקודה שנוצרת.", xrefs: ["enh:exit:IPRM0001", "enh:exit:IWO10009"] },
        { he: "ממשק תוכניתי: שירות ה-OData‏ API_MAINTENANCEPLAN מתועד מגרסת S/4HANA 2021 לשאילתה, ליצירה ולשינוי של תוכניות; שם ה-BAPI שבמאגר טרם אומת.", xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE"] },
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
      eccToS4: [
        { he: "מודל MPLA, MPOS, MHIS ו-MHIO זהה ב-ECC וב-S/4HANA לפי רשומת התחום 'תכנון אחזקה'.", xrefs: ["table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO"] },
        { he: "IP30 זמינה ב-S/4HANA On-Premise ומתועדת ב-2025 FPS01, אך פריט הפישוט 'S4TWL - Scheduling of Maintenance Plan' מסמן את טכנולוגיית ה-Batch Input שבה כטכנולוגיה שאינה עתידית ומודיע על כוונה להפסיקה במהדורה עתידית. הפריט מופיע בנוסח זהה ברשימת 2025 FPS01 וברשימת 2023 FPS03.", xrefs: ["tx:IP30"] },
        { he: "הנתיב שהפריט מפנה אליו לתזמון המוני הוא IP30H, שתיעוד ה-Help מקשר ל-Business Function‏ LOG_EAM_MPS1; רשומת האימות מסמנת אותה כטרנזקציה חדשה ב-S/4HANA.", xrefs: ["tx:IP30H"] },
        { he: "ממשקים: שירות ה-OData‏ API_MAINTENANCEPLAN מתועד כחדש מגרסת S/4HANA 2021 ליצירה ולשינוי של תוכניות תחזוקה, ולצדו API_MAINTENANCEITEM לפריטים.", xrefs: ["fm:BAPI_MAINTENANCEPLAN_CREATE"] },
        { he: "חוויית המשתמש: לוח תזמון ויישומי ניטור ב-Fiori לצד ה-GUI, לפי רשומת התחום ולפי קטלוג היישומים של המאגר.", xrefs: ["fiori:F2828", "cds:I_MaintenancePlan"] },
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
        note: "עמוד תיעוד התהליך הרשמי לתזמון תוכניות תחזוקה (אומת ברשומת tx:IP30), המציג את IP10, ‏IP30 ו-IP30H בטבלת הפעילויות. פריט SAP Best Practices (Scope Item) לתהליך לא אותר ואומת בנפרד ולכן אינו נרשם.",
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:IP30, tx:IP30H " +
      "ו-fm:BAPI_MAINTENANCEPLAN_CREATE. שדה ה-KPI הושמט: המאגר אינו מתעד מדד מספרי לתהליך התחזוקה המונעת, ולכן " +
      "הפער מוצג בשמו במקום להתמלא. השם BAPI_MAINTENANCEPLAN_CREATE מוצג כשם לאימות ולא כממשק משוחרר: רשומת " +
      "האימות מתעדת ששתי שכבות מאגר קובעות שאינו קיים ומפנות ל-MPLAN_CREATE, שארבע שכבות מציגות אותו כקיים, " +
      "ושאף עמוד SAP רשמי שנסרק אינו נוקב בו. טבלאות T351 ו-T351P אינן במילון הפרויקט ולכן נשארות בפרוזה. " +
      "מזהי ה-Fiori F2774 ו-F5325, שהתיעוד הרשמי מצמיד לתזמון ולניהול תוכניות, אינם בקטלוג הפרויקט ואינם " +
      "מקושרים. לא בוצעה בדיקה במערכת SAP חיה.",
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
        { he: "Fiori בקטלוג הפרויקט: Manage Technical Objects. רשומת האימות מסמנת את המזהה F2730A כסתירת מקורות: הוא לא נמצא באף מקור רשמי, והיישומים שהתיעוד הרשמי מונה לאובייקטים טכניים הם Find Technical Object (F2072), ‏Process Technical Object (W0029), ‏Display Technical Object (W0028) ו-Manage Technical Object Structures (F8669), שאינם בקטלוג הפרויקט.", xrefs: ["fiori:F2730A"] },
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות table:EQUZ, " +
      "tx:IE01, tx:IL01, fm:BAPI_EQUI_INSTALL ו-fm:BAPI_EQUI_CREATE. שדה ה-KPI הושמט: המאגר אינו מתעד מדד מספרי " +
      "לתהליך נתוני האב של האובייקטים הטכניים. מזהי Fiori: F2730A נשאר מקושר כרשומת הקטלוג של הפרויקט, ורשומת " +
      "האימות שלו מסמנת סתירת מקורות; המזהים הרשמיים F2072, ‏W0029, ‏W0028 ו-F8669 אינם בקטלוג הפרויקט ולכן " +
      "נשארים בפרוזה. טרנזקציות ה-Customizing OIPK ו-OIPM והטבלה IFLOTX מופיעות ברשומות המאגר ואינן במילון " +
      "הפרויקט. שמות ה-BAPI BAPI_EQUI_DISMANTLE ו-BAPI_FUNCLOC_GETDETAIL מופיעים ברשומות התחום; לראשון אין " +
      "רשומה במילון הפרויקט ולכן הוא נשאר בפרוזה. לא בוצעה בדיקה במערכת SAP חיה.",
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
      reference: null,
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
          "חמישה שלבים עם טרנזקציות, טבלאות, יישומי Fiori, ממשקים ותקריות לכל שלב: הודעה או תוכנית מונעת (IW21, " +
          "IP30; QMEL, MPLA, MHIS; Create Maintenance Request; plan-no-orders, downtime-not-recorded), פקודת " +
          "אחזקה (IW31, IW32; AUFK, AFIH, AFVC; API_MAINTENANCEORDER; order-wont-release, " +
          "permit-not-auto-assigned, equipment-not-in-order), חלפים (IW32, ME53N, MIGO; RESB, EBAN; " +
          "pm-cost-no-activity-type), ביצוע ואישור (IW41, IW42; AFRU; confirm-period-closed) והתחשבנות (KO88; " +
          "COBRB, ACDOCA; settlement-error, teco-blocked).",
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
          "אחזקת שבר: תקלה, הודעה עם סימון Breakdown, פקודה דחופה, תיקון ואישור, וניתוח MTTR ו-MTBF (QMEL, QMIH, " +
          "AUFK, AFIH; IW21, IW31, IW41, IW28, MCI7). ביצוע אחזקה: מחזור הפקודה מהודעה ועד TECO עם הסטטוסים " +
          "CRTD, REL, CNF, TECO ו-CLSD. אינטגרציית חלפים: רכיבים, רזרבציה (RESB), דרישת רכש (EBAN, EBKN), משיכת " +
          "חומר וצריכה בפקודה. אנליטיקה: מערכת המידע PMIS ‏(MCI*) מבוססת מבני מידע, מדדי MTBF ו-MTTR, רשימות " +
          "IW28, IW29, IW38 ו-IW39, וב-S/4HANA אנליטיקה חיה דרך CDS ו-Fiori.",
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
          "אחזקת שבר מקצה לקצה: תקלה, הודעה, פקודה, תכנון ושחרור, ביצוע ואישור, TECO, התחשבנות וניתוח, עם " +
          "הטעויות השכיחות והנתיב לניפוי. אחזקה מונעת מקצה לקצה: אסטרטגיה, תוכנית, פריט ורשימה, תזמון, ניטור " +
          "ב-IP30, פקודה אוטומטית וביצוע. כיול משולב: תוכנית כיול, פקודה עם מפתח בקרה לבדיקה, מנת בדיקה (QALS), " +
          "רישום תוצאות ב-QE11, החלטת שימוש ב-QA11 ועדכון סטטוס המכשיר ב-IE02; מאפייני הבדיקה נשמרים ב-PLMK.",
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
          "אובייקטי האחזקה: מבנה נתונים זהה ברובו ב-S/4HANA בתוספת יישומי Fiori ותצוגות CDS, וההשפעה מינימלית " +
          "עם GUI שנתמך. הודעות התקלה: אותו מודל נתונים, UX מבוסס Fiori עם זרימה מובנית להזמנה, והתהליך זהה " +
          "לוגית. סט S4_STABLE של שכבת ההשפעה מונה את EQUI, IFLOT, IFLOS, ILOA, CRHD, CRTX, AFIH, AFKO, AFPO, " +
          "AFVC, AFRU, AUFK, JEST, JSTO, OBJK, QMEL, QMFE, PLKO, PLPO, MAPL, EQKT ו-EQUZ כיציבים ב-S/4HANA.",
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
          "אחת עשרה רשומות נתוני אב עם מה, למה, מתי נוצר, בעלים, תלויות, טעויות שכיחות ודוגמה: ציוד (EQUI), " +
          "מיקום פונקציונלי (IFLOT), מרכז עבודה (CRHD), רשימת פעולות (PLKO), עץ מוצר (MAST), אב חומר (MARA), " +
          "תוכנית אחזקה (MPLA), נקודת מדידה ומונה (IMPTT), הודעה (QMEL), פקודה (AUFK) ושותף עסקי (BUT000). " +
          "רשומת הפקודה קובעת שהיא נושאת העלות ושסוגי הפקודה מותאמי לקוח; רשומת ההודעה קובעת שההודעה מתעדת " +
          "בלבד ושהפקודה מבצעת ונושאת עלות.",
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך מקצה לקצה: היא מקשרת ואינה מכפילה, וכל פירוט נמצא ברשומות המקושרות (הודעה, פקודה, תחזוקה " +
      "מונעת, אובייקטים טכניים). ההפניה הרשמית היא null: לא אותר עמוד SAP רשמי אחד המתאר את תחזוקת המפעל מקצה " +
      "לקצה כתהליך אחד, ופריט SAP Best Practices (Scope Item) לא אומת, ולכן לא נרשמה הפניה במקום לרשום הפניה " +
      "חלקית. שמות הטבלאות QMIH ו-QALS מופיעים ברשומות המאגר ואינם במילון הפרויקט ולכן אינם מקושרים. " +
      "העמודים הרשמיים שכן צורפו נוגעים לשני צמתים בשרשרת (יצירת הפקודה וכלל ההתחשבנות) ולא לתהליך כולו. " +
      "לא בוצעה בדיקה במערכת SAP חיה.",
  },
];
