/* Project NEO · best practices — PM PROCESS CATALOG (design-audit continuation
   §11, 2026-09-22). TYPE-ONLY IMPORTS. Loaded by node --test with no loader.

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
/** accessedAt of the official pages reused from the tx:IW21 / fm:BAPI_ALM_NOTIF_CREATE overlays. */
const DATE_IW21 = "2026-09-02";
const DATE_NOTIF = "2026-09-14";

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
        he: "לפתוח את ההודעה עם אובייקט ייחוס (ציוד או מיקום פונקציונלי), תיאור התקלה, וסוג הודעה מתאים: M1 תקלה, M2 בקשה, M3 פעילות. בשטח: Create Maintenance Request או Report and Repair Malfunction; ב-GUI: IW21.",
        xrefs: ["tx:IW21", "fiori:F1511", "fiori:F2023", "table:QMEL"],
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
        { he: "תקלה בשטח או בקשת עבודה מהמפעיל: הודעת תקלה (M1), בקשת תחזוקה (M2) או דיווח פעילות (M3)." },
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
        { he: "טכנאי תחזוקה (SAP_BR_MAINTENANCE_TECHNICIAN): פתיחת בקשות ודיווח תקלות ביישומי Create Maintenance Request ו-Report and Repair Malfunction.", xrefs: ["fiori:F1511", "fiori:F2023"] },
        { he: "מתכנן תחזוקה (SAP_BR_MAINTENANCE_PLANNER): סינון, קבלה וניהול הודעות ופקודות ביישום Manage Maintenance Notifications and Orders.", xrefs: ["fiori:F4604"] },
      ],
      transactions: [
        { he: "IW21 יצירה, IW22 שינוי, IW23 תצוגה.", xrefs: ["tx:IW21", "tx:IW22", "tx:IW23"] },
        { he: "IW24, IW28 ו-IW29: רשימות הודעות ועיבוד המוני.", xrefs: ["tx:IW24", "tx:IW28", "tx:IW29"] },
        { he: "Fiori: Create Maintenance Request, Report and Repair Malfunction, Screen Maintenance Requests, Manage Maintenance Notifications and Orders.", xrefs: ["fiori:F1511", "fiori:F2023", "fiori:F4072", "fiori:F4604"] },
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
        { he: "חוויית המשתמש עוברת ל-Fiori (Create Maintenance Request, Screen Maintenance Requests, Manage Maintenance Notifications and Orders) עם זרימה מובנית להזמנה; ה-GUI (IW21 עד IW28) נשאר קיים.", xrefs: ["fiori:F1511", "fiori:F4072", "fiori:F4604"] },
        { he: "ב-S/4HANA ה-BAPI ליצירת הודעה נמנה תחת אובייקט ההגירה, ולצדו קיים OData API_MAINTNOTIFICATION כ-API משוחרר.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE"] },
        { he: "אנליטיקה: לצד PMIS, תצוגות CDS של ההודעה (I_MaintenanceNotification, ‏C_MaintNotificationListReport לפי רשומת התחום).", xrefs: ["cds:I_MaintenanceNotification"] },
      ],
      migration: [
        { he: "טבלאות QMEL / QMFE / QMUR נשמרות בהמרה; אובייקט ההגירה 'PM - Maintenance notification' בתיעוד Data Migration של 2025 FPS01 נוקב ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE.", xrefs: ["fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE"] },
        { he: "בדיקות לאחר המרה לפי רשומת התחום: קודי קטלוג, מעבר להזמנה ואנליטיקה (CDS)." },
      ],
      reference: {
        title: "Maintenance Notification | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78c09d53839cca11e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תיעוד התהליך הרשמי (אומת ברשומת tx:IW21). פריט SAP Best Practices (Scope Item) לתהליך טרם אותר ואומת ולכן אינו נרשם.",
      },
    },
    xrefs: [
      "obj:maintenance-notification", "table:QMEL", "table:QMFE", "table:QMUR", "table:QMMA", "table:QMSM",
      "tx:IW21", "tx:IW22", "tx:IW23", "tx:IW24", "tx:IW28", "tx:IW29", "tx:IW31",
      "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_DATA_ADD", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_ALM_NOTIF_CLOSE",
      "fiori:F1511", "fiori:F2023", "fiori:F4072", "fiori:F4604", "cds:I_MaintenanceNotification",
      "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'הודעות אחזקה' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "זרימת התהליך: תקלה/בקשה, הודעה (IW21), פריטים/סיבות (QMFE/QMUR), המרה לפקודה, סגירת הודעה; טבלאות QMEL, " +
          "QMFE, QMUR, QMMA; טרנזקציות IW21 עד IW29; סוגי הודעה M1 תקלה, M2 בקשה, M3 פעילות; קודי קטלוג לניתוח Pareto; " +
          "תקלות: קוד פגם לא זמין (פרופיל קטלוג), הודעה לא נסגרת (פקודה ופריטים פתוחים).",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-notifications",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'הודעות אחזקה' של הפרויקט (DOMAIN_DETAIL)",
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
        sourceTitle: "מדריך התהליך 'אחזקת שבר מקצה לקצה' של הפרויקט (PROCESS_GUIDES)",
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
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F1511, F2023, F4072, F4604",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "Create Maintenance Request (F1511) ו-Report and Repair Malfunction (F2023) בתפקיד SAP_BR_MAINTENANCE_TECHNICIAN; " +
          "Manage Maintenance Notifications and Orders (F4604) בתפקיד SAP_BR_MAINTENANCE_PLANNER; Screen Maintenance " +
          "Requests (F4072) לסינון וקבלת בקשות לפי התיעוד הרשמי (תוקן 2026-09-22).",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F1511",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: notif-catalog-profile, notif-type-missing-catalog, notification-cant-close",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "קודי פגם/סיבה לא זמינים: לשייך פרופיל קטלוג לסוג ההודעה (OIM1) ולהגדיר קבוצות קוד (QS41); סגירת הודעה (NOCO) " +
          "חסומה: להשלים משימות פתוחות, לסגור טכנית את הפקודה (TECO) ולהתאים סטטוס משתמש (QMEL, QMSM, JEST).",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#notification-cant-close",
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
    ],
    lastVerifiedAt: DATE,
    reviewer: "Design-audit continuation §11 (process catalog)",
    notes:
      "רשומת תהליך: כל שדה בפרופיל נגזר מרשומות המאגר הנקובות או מעמוד רשמי שכבר אומת ברשומות tx:IW21 ו-fm:BAPI_ALM_NOTIF_CREATE. " +
      "פריט SAP Best Practices (Scope Item) לתהליך לא אותר ולכן ההפניה הרשמית היא עמוד תיעוד התהליך. לא בוצעה בדיקה במערכת SAP חיה.",
  },
];
