/* Project NEO · best practices · PROCESS CATALOG 2026-09 (mandate completion,
   2026-09-24). TYPE-ONLY IMPORTS. Loaded by node --test with no loader.

   Process records from the research pipeline: a researcher drafts, an
   adversarial auditor re-runs the searches and re-reads the pages, a repairer
   fixes, and one writer applies the auditor's downgrades and appends here.
   Every SAP name is carried either by a repository record cited with repoRef
   or by an official record whose url (loio, versionId) was copied verbatim
   from a help.sap.com search record (scripts/sap-help-search.mjs) or from an
   existing data/verification/*.ts entry; a quote from a page body was read
   through scripts/sap-help-body.mjs. Official sources that disagree stay side
   by side as conflicting_sources. A field no source documents is left out on
   purpose (kpis in every record below except order-to-cash-process, whose kpis
   come from the official Order-to-Cash Performance page, and
   embedded-analytics-process and breakdown-maintenance-process, whose kpis come
   from the repository's domain records): the page renders the gap by name. Two
   records carry an authored status (embedded-analytics-process,
   ibp-ppds-integration-process); its source is the same object as the official
   evidence row it names (EA_STATUS_SOURCE, PPDS_STATUS_SOURCE below).
   Drafts the auditor refuted are queued in
   audit/s4-enrichment/research-queue-best-practices.md, not written. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-24";
/** accessedAt values kept from the verification entries reused below. */
const DATE_TX_21 = "2026-09-21"; // data/verification/transactions.ts DATE21 (IP30_SIMPL_ITEM, tx:IP30 / tx:IP30H);
// the same date on the rows copied from enhancements.ts DATE21 (enh:technique:bte) and functions.ts (fm:BAPI_MATERIAL_SAVEDATA)
const DATE_TX_02 = "2026-09-02"; // data/verification/transactions.ts DATE2 (MB11_SIMPL, tx:MB11);
// the same date on the rows copied from cds.ts DATE2 (cds:I_ProductionOrder, cds:I_MaintenancePlan,
// cds:I_MeasurementDocument), fiori.ts DATE (fiori:F2176) and enhancements.ts DATE (enh:badi:WORKORDER_UPDATE);
// batch 5: fiori.ts DATE (fiori:F1511, fiori:F2023, fiori:F4604, fiori:F0843), functions.ts DATE2
// (fm:BAPI_ALM_ORDER_MAINTAIN), transactions.ts DATE2 (MB11_SIMPL again) and cds.ts DATE2 (cds:I_MaterialDocumentItem)
const DATE_TB_15 = "2026-09-15"; // data/verification/tables.ts DATE4 (QMAT_INSPECTION_SETUP, table:QMAT; items 6.5.1 and 6.1.4, table:COSP;
// batch 5: MKPF_SIMPL2025, item 15.3.1, and the item 27.5 row of table:MKPF)
const DATE_TB_02 = "2026-09-02"; // data/verification/tables.ts DATE2 (MM - Material inventory balance, table:MBEW)
const DATE_FM_14 = "2026-09-14"; // data/verification/functions.ts DATE14 (Material Documents - Read, Create, fm:BAPI_GOODSMVT_CREATE;
// also Communication of Goods Movements from Inventory Management to EWM, same record; batch 5: Create a Single
// Order Operation Confirmation, fm:BAPI_ALM_CONF_CREATE)
const DATE_TB_01 = "2026-09-01"; // data/verification/tables.ts DATE (Warehouse Product Migration, table:MLGN / table:MLGT;
// batch 5: MSEG_ARCHIVING and the compatibility-views row of table:MSEG); transactions.ts DATE (tx:MB03)
const DATE_TX_07 = "2026-09-07"; // data/verification/transactions.ts DATE3 (Material Staging (with EWM), tx:COR2;
// batch 5: Goods Movement (MM-IM), tx:MIGO)
const DATE_FI_23 = "2026-09-23"; // data/verification/fiori.ts DATE23 (Advanced Scheduling Board, fiori:F5460;
// batch 5: fiori:F1511A, fiori:F5241 and fiori:W0020)

/** Authored status sources: each is the same object as the official evidence row it names. */
const EA_STATUS_SOURCE: BestPracticeLike["evidence"][number] = {
  sourceType: "sap_help",
  sourceTitle: "S/4HANA Embedded Analytics | Analytics",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/c53deb5765c7be12e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim: "גוף העמוד (loio c53deb5765c7be12e10000000a4450e5, versionId 2025.001, נקרא דרך " +
    "scripts/sap-help-body.mjs) מונה למשתמשי הקצה: Multidimensional reports, ‏Smart Business Runtime " +
    "Environment, יישומים אנליטיים מבוססי Analysis Path Framework (APF), ‏Query Browser ויישומי Fiori " +
    "אנליטיים; ולמומחי האנליטיקה: Custom View app, ‏Custom Analytical Queries app, ‏APF Configuration " +
    "Modeler, ‏Manage KPIs and Reports ו-View Browser. העמוד קובע: 'All the analytical tools consume Core " +
    "Data Services (CDS views), which make up the Virtual Data Model (VDM) of SAP S/4HANA'; לשימוש בתצוגות " +
    "CDS מסוג analytical queries יש להגדיר את ה-Analytic Engine; ובאמצעות ה-Fiori Launchpad המשתמש עובר בין " +
    "יישומים טרנזקציוניים ואנליטיים 'without need for data replication'.",
  verificationLevel: "sap_official_verified",
};
const PPDS_STATUS_SOURCE: BestPracticeLike["evidence"][number] = {
  sourceType: "sap_help",
  sourceTitle: "Production Planning and Detailed Scheduling (PP/DS) | Logistics - General (LO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/e01f0742705a4b97bfca4157949873fc.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim: "loio e01f0742705a4b97bfca4157949873fc; גוף העמוד (2025 FPS01) נקרא דרך scripts/sap-help-body.mjs " +
    "ב-2026-09-24: 'Production Planning and Detailed Scheduling (PP/DS) is part of SAP S/4HANA from SAP " +
    "S/4HANA OP 1709 onwards as ePP/DS (embedded Production Planning and Detailed Scheduling) with certain " +
    "restrictions'.",
  verificationLevel: "sap_official_verified",
};

export const CATALOG_PROCESS_PRACTICES: BestPracticeLike[] = [
  /* ============================================================= calibration */
  {
    slug: "calibration-process",
    he: "כיול ציוד בדיקה: מתוכנית או הזמנה, דרך מנת בדיקה ורישום תוצאות, ועד החלטת שימוש ועדכון סטטוס המכשיר",
    en: "Calibration of test equipment: from a maintenance plan or order, through the QM inspection lot and " +
      "results recording, to the usage decision and equipment status update",
    module: "PM",
    summary: "כיול משלב הזמנת תחזוקה (PM) עם מנת בדיקה של ניהול איכות (QM) כדי לאמת שציוד מדידה עומד בקריטריוני דיוק " +
      "מוגדרים. הזמנת כיול, בסטנדרט מסוג PM05, נוצרת מתוכנית תחזוקה או ידנית; בשחרורה נוצרת מנת בדיקה מסוג " +
      "הבדיקה המשויך לסוג ההזמנה (בסטנדרט: סוג בדיקה 14, inspection for Plant Maintenance), נרשמות תוצאות לכל " +
      "מאפיין, והחלטת השימוש קובעת אם המכשיר מוכן לשימוש ומפעילה עדכון סטטוס אוטומטי.",
    context: "לפי רשומות התחומים של המאגר, כיול הוא זרימה מאוחדת PM-QM: תוכנית תחזוקה לכיול עם רשימת פעולות הנושאת " +
      "מאפייני בדיקה (PLMK) ומפתח בקרה עם סימון Inspection, הזמנה שיוצרת מנת בדיקה (Inspection Lot), רישום " +
      "תוצאות מול תקן והחלטת שימוש שקובעת תקין/לא תקין למכשיר (data/domains.ts#pm-calibration, " +
      "data/domain-detail.ts#pm-calibration, data/process-guides.ts#pm-calibration-process). עמוד help.sap.com " +
      "הרשמי 'Test Equipment Management (QM-IT)' (S/4HANA On-Premise 2025 FPS01) מגדיר את הרכיב כמקשר בין " +
      "Technical objects (PM-EQM), Preventive maintenance (PM-PRM) ו-Maintenance processing (PM-WOC) בצד ה-PM, " +
      "לבין Quality planning (QM-PT) ו-Quality inspection (QM-IM) בצד ה-QM, ומאפשר תכנון וביצוע בדיקות כיול, " +
      "היסטוריית תוצאות לכל ציוד וניטור סטטוס הציוד. עמוד 'Creation of a Calibration Order' מוסיף פרטים שהמאגר " +
      "אינו מתעד: בסטנדרט סוג ההזמנה להזמנות כיול הוא PM05, סוג הציוד לציוד בדיקה הוא Q, וסוג בדיקה שנוצר למקור " +
      "14 (Plant Maintenance), בסטנדרט סוג בדיקה 14 (inspection for Plant Maintenance), משויך לסוג ההזמנה; " +
      "בשחרור ההזמנה נוצרת מנת בדיקה, והחלטת השימוש מפעילה פעולות המשך אוטומטיות (שינוי סטטוס הציוד, עדכון " +
      "קריאות מדידה). התהליך יכול להיות מתוזמן (מתוכנית תחזוקה, כמו ב-bp:preventive-maintenance-process) או " +
      "ספונטני (הזמנה ישירה), ומצד הבדיקה משתמש באותו מנגנון מנת בדיקה, רישום תוצאות והחלטת שימוש המתועד " +
      "ב-bp:quality-inspection-in-production.",
    steps: [
      {
        he: "לתכנן: להקים תוכנית תחזוקה לכיול (מחזורי כיול מבוססי זמן או ביצועים, לפי עמוד Test Equipment Management) " +
          "ורשימת פעולות עם מאפייני בדיקה (PLMK) ועם מפתח בקרה שנושא סימון Inspection לפעולת הכיול " +
          "(domain-detail.ts#pm-calibration). לחלופין, ליצור הזמנת כיול ישירות כשמדובר בכיול חד פעמי " +
          "('spontaneously' לפי עמוד 'Creation of a Calibration Order').",
        xrefs: [
          "tx:IP01", "table:MPLA", "table:PLKO", "table:PLPO", "table:PLMK", "obj:maintenance-plan",
          "obj:maintenance-task-list",
        ],
      },
      {
        he: "לתזמן: להריץ תזמון תוכנית בודדת (IP10) או ניטור מועדים תקופתי (IP30) כדי שהתוכנית תפיק את הזמנת הכיול " +
          "הבאה. ב-S/4HANA פריט הפישוט 'S4TWL - Scheduling of Maintenance Plan' מורה ליצור עבודות רקע ל-IP30H במקום " +
          "אלה של IP30; מנגנון התזמון זהה לזה של bp:preventive-maintenance-process.",
        xrefs: ["tx:IP10", "tx:IP30", "tx:IP30H", "table:MHIS", "bp:preventive-maintenance-process"],
      },
      {
        he: "ליצור ולשחרר את הזמנת הכיול. לפי עמוד 'Creation of a Calibration Order': בסטנדרט סוג ההזמנה הוא PM05, " +
          "וסוג בדיקה שנוצר למקור 14 (Plant Maintenance), בסטנדרט סוג בדיקה 14 (inspection for Plant Maintenance), " +
          "משויך אליו ב-Customizing; הציוד מוגדר כציוד בדיקה (בסטנדרט: equipment category Q); בשחרור ההזמנה נוצרת " +
          "מנת בדיקה.",
        xrefs: ["tx:IW31", "tx:IW32", "table:AUFK", "table:EQUI", "obj:maintenance-order", "fm:BAPI_ALM_ORDER_MAINTAIN"],
      },
      {
        he: "לעבד את מנת הבדיקה: לפי עמוד 'Calibration Order' המנה מופיעה ברשימת העבודה לרישום תוצאות של QM; בממשק " +
          "ה-GUI רשימת העבודה לרישום תוצאות היא QE51N, ורשימת העבודה ללוטי בדיקה היא QA32; שתיהן זמינות ב-S/4HANA " +
          "(tx-intel.ts#QE51N, #QA32).",
        xrefs: ["tx:QE51N", "tx:QA32", "table:PLMK"],
      },
      {
        he: "לרשום תוצאות מדידה מול תקן, לכל מאפיין, ברשימת העבודה לרישום תוצאות (QE51N, או QE01 לפי מאפיין), תוך " +
          "קריאת מאפייני הבדיקה וקטלוג הקודים (QPK1_INSPCHAR_READ, QPK1_CATALOG_READ לפי " +
          "domain-detail.ts#pm-calibration).",
        xrefs: ["tx:QE51N", "tx:QE01", "fm:QPK1_INSPCHAR_READ", "fm:QPK1_CATALOG_READ"],
      },
      {
        he: "לקבל החלטת שימוש (QA11): תקין או לא תקין. לפי עמוד 'Creation of a Calibration Order' ההחלטה מפעילה " +
          "פעולות המשך אוטומטיות: שינוי סטטוס ציוד הבדיקה ('Ready for use' מול 'Not ready for use') ועדכון קריאות " +
          "מדידה.",
        xrefs: ["tx:QA11", "table:JEST"],
      },
      {
        he: "לעדכן ולעקוב אחר סטטוס המכשיר (IE02): לפי process-guides.ts#pm-calibration-process ותרחיש ה-Negative " +
          "ב-domain-detail.ts#pm-calibration, החלטת 'לא תקין' מובילה לחסימת המכשיר; היסטוריית הכיול נשמרת לציוד " +
          "(תרחיש ה-Regression באותה רשומה).",
        xrefs: ["tx:IE02", "table:EQUI", "table:JEST"],
      },
      {
        he: "לנטר כיולים שעברו מועד: סקירת התזמון וההיסטוריה (IP24, QGA1, QGA2, לפי התקריות qm-calibration-overdue " +
          "ו-qm-calibration-not-scheduled וה-debugPath ב-process-guides.ts#pm-calibration-process) לאיתור ציוד " +
          "מדידה שכיולו לא תוזמן או עבר את מועדו, ולחסום מכשיר שכיולו פג (לפי התיקון המתועד בתקרית " +
          "qm-calibration-overdue).",
        xrefs: ["tx:QGA1", "tx:QGA2", "tx:IP24"],
      },
    ],
    antiPatterns: [
      "רשימת פעולות כיול בלי מפתח בקרה עם סימון Inspection, או בלי מאפייני בדיקה (PLMK): לפי " +
        "domain-detail.ts#pm-calibration מנת הבדיקה לא נוצרת, או שאין מאפיינים לרישום.",
      "ציוד מדידה שלא מוגדר כציוד בדיקה, או שסוג בדיקה למקור 14 (בסטנדרט: סוג בדיקה 14) לא משויך לסוג הזמנת " +
        "הכיול: לפי עמוד 'Creation of a Calibration Order' אלה תנאים מוקדמים, ובלעדיהם אין מנת בדיקה בשחרור " +
        "ההזמנה.",
      "תוכנית כיול שלא תוזמנה, או IP30 שלא רץ כעבודת רקע קבועה (וב-S/4HANA בלי עבודות רקע ל-IP30H כהוראת פריט " +
        "הפישוט): הכיול עובר מועד והמכשיר נשאר בשימוש, כפי שמתועד בתקרית qm-calibration-overdue.",
      "ניסיון לרשום החלטת שימוש כשתוצאות חסרות (results not complete), לפי commonErrors ברשומת " +
        "tx-intel.ts#QA11.",
      "מכשיר לא תקין שלא נחסם ונשאר בשימוש: טעות שכיחה ברשומת process-guides.ts#pm-calibration-process ('מכשיר " +
        "לא תקין לא נחסם').",
    ],
    checks: [
      "חיובי: הזמנת כיול שסוג בדיקה למקור 14 (בסטנדרט: סוג בדיקה 14) משויך לסוג ההזמנה שלה מפיקה מנת בדיקה עם " +
        "שחרור ההזמנה (עמוד 'Creation of a Calibration Order'); לפי תרחיש ה-Positive " +
        "ב-domain-detail.ts#pm-calibration תוצאות בתחום מובילות ל-UD תקין.",
      "שלילי: רשימת פעולות ללא סימון Inspection במפתח הבקרה אינה מפיקה מנת בדיקה (troubleshootFlow " +
        "ב-process-guides.ts#pm-calibration-process).",
      "אינטגרציה: תוצאה מחוץ לתחום מובילה ל-UD לא תקין ולחסימת המכשיר (תרחיש ה-Negative " +
        "ב-domain-detail.ts#pm-calibration).",
      "רגרסיה: היסטוריית הכיול נשמרת לציוד (תרחיש ה-Regression ב-domain-detail.ts#pm-calibration); הסקירה דרך " +
        "QGA1/QGA2 נשענת על debugPath ב-process-guides.ts#pm-calibration-process ('QGA2 (Calibration overview)') " +
        "ועל התקריות ('QGA1 → היסטוריה', 'QGA2 לכיולים'), לא על רשומות tx-intel.",
      "תזמון: ציוד עם תוכנית כיול שלא תוזמנה (IP30 לא רץ) מזוהה לפי מסלול הניתוח של תקרית " +
        "qm-calibration-overdue (IP30, QGA2, IE03).",
    ],
    process: {
      purpose: "לאמת באופן מחזורי או ספונטני שציוד מדידה עומד בקריטריוני הדיוק המוגדרים לו, באמצעות שילוב הזמנת תחזוקה " +
        "(PM) ומנת בדיקה של ניהול איכות (QM), ולשמור היסטוריית תוצאות לכל ציוד בדיקה " +
        "(domain-detail.ts#pm-calibration; עמוד Test Equipment Management).",
      trigger: [
        {
          he: "תוכנית תחזוקה לכיול (מבוססת זמן או ביצועים) מגיעה למועדה; לפי עמוד 'Creation of a Calibration Order' " +
            "'the system automatically generates an order (calibration order)'. בצד הפרויקט ניטור המועדים הוא IP30 " +
            "(tx-intel.ts#IP30), וב-S/4HANA פריט הפישוט 'S4TWL - Scheduling of Maintenance Plan' מפנה לעבודות רקע של " +
            "IP30H.",
          xrefs: ["tx:IP30", "tx:IP30H"],
        },
        {
          he: "כיול ספונטני: קביעה שציוד המדידה כבר אינו מדויק, ופתיחת הזמנת כיול ישירה בלי תוכנית, כפי שמתארים העמודים " +
            "'Creation of a Calibration Order' ו-Test Equipment Management.",
          xrefs: ["tx:IW31"],
        },
      ],
      preconditions: [
        {
          he: "הציוד מוגדר כציוד בדיקה (בסטנדרט: equipment category Q) לפי עמוד 'Creation of a Calibration Order'; " +
            "במאגר הוא מתועד כציוד מדידה (PRT) ברשומת domain-detail.ts#pm-calibration.",
          xrefs: ["table:EQUI", "obj:equipment"],
        },
        {
          he: "סוג הזמנה פנימי להזמנות כיול מוגדר ב-Customizing (בסטנדרט PM05), וסוג בדיקה שנוצר למקור 14 (Plant " +
            "Maintenance) משויך לו (בסטנדרט: סוג בדיקה 14, inspection for Plant Maintenance), כך שבשחרור ההזמנה נוצרת " +
            "מנת בדיקה (עמוד 'Creation of a Calibration Order').",
        },
        {
          he: "רשימת הפעולות של הכיול נושאת מפתח בקרה עם סימון Inspection ומאפייני בדיקה (PLMK) מול תקן " +
            "(domain-detail.ts#pm-calibration, process-guides.ts#pm-calibration-process).",
          xrefs: ["table:PLKO", "table:PLPO", "table:PLMK"],
        },
        {
          he: "לעדכון אוטומטי של קריאות מדידה כפעולת המשך: נקודת המדידה/המונה והמאפיין המרכזי נוצרים בהפניה לאותו " +
            "מאפיין כללי במערכת הסיווג (עמוד 'Creation of a Calibration Order'); עמוד Test Equipment Management מציין " +
            "שחלק משיטות התכנון והעיבוד דורשות את Classification System (CA-CL).",
        },
      ],
      masterData: [
        {
          he: "ציוד בדיקה (Equipment; equipment category Q בסטנדרט לפי התיעוד הרשמי, ציוד מדידה (PRT) לפי " +
            "domain-detail.ts#pm-calibration).",
          xrefs: ["table:EQUI", "obj:equipment"],
        },
        {
          he: "תוכנית תחזוקה לכיול ופריט תוכנית (MPLA/MPOS לפי tx-intel.ts#IP01).",
          xrefs: ["table:MPLA", "table:MPOS", "obj:maintenance-plan"],
        },
        {
          he: "רשימת פעולות כיול: מפתח בקרה עם Inspection (PM03 לפי רשומות המאגר) ומאפייני בדיקה (PLMK).",
          xrefs: ["table:PLKO", "table:PLPO", "table:PLMK", "obj:maintenance-task-list"],
        },
        {
          he: "מאפייני בדיקה וקטלוג קודים לתוצאות ולהחלטת השימוש, נקראים דרך QPK1_INSPCHAR_READ ו-QPK1_CATALOG_READ " +
            "(domain-detail.ts#pm-calibration).",
          xrefs: ["fm:QPK1_INSPCHAR_READ", "fm:QPK1_CATALOG_READ"],
        },
      ],
      roles: [
        {
          he: "מתכנן תחזוקה / מהנדס תחזוקה מונעת: מקים ומתזמן את תוכנית הכיול (IP01, IP10, IP30), לפי שדה users ברשומות " +
            "tx-intel.",
          xrefs: ["tx:IP01", "tx:IP10", "tx:IP30"],
        },
        {
          he: "בודק איכות (QA Inspector): מעבד את רשימת מנות הבדיקה ורושם תוצאות (QA32, QE51N); החלטת השימוש (QA11) " +
            "רשומה אצל 'מהנדס איכות' ו-'QA Inspector', לפי שדה users ברשומות tx-intel.",
          xrefs: ["tx:QA32", "tx:QE51N", "tx:QA11"],
        },
      ],
      transactions: [
        {
          he: "IP01 יצירת תוכנית כיול; IP10 תזמון תוכנית בודדת; IP30 ניטור מועדים; ב-S/4HANA IP30H לתזמון המוני לפי " +
            "פריט הפישוט 'S4TWL - Scheduling of Maintenance Plan'.",
          xrefs: ["tx:IP01", "tx:IP10", "tx:IP30", "tx:IP30H"],
        },
        {
          he: "IW31 יצירת הזמנת כיול (בסטנדרט מסוג PM05 לפי התיעוד הרשמי); IW32 שינוי ושחרור ההזמנה, שבו נוצרת מנת " +
            "הבדיקה.",
          xrefs: ["tx:IW31", "tx:IW32"],
        },
        {
          he: "QA32 רשימת עבודה למנות בדיקה; QE51N (או QE01) רישום תוצאות; QA11 החלטת שימוש; IP24, QGA1 ו-QGA2 סקירת " +
            "תזמון והיסטוריה, בהקשר הכיול לפי התקריות ו-process-guides.",
          xrefs: ["tx:QA32", "tx:QE51N", "tx:QE01", "tx:QA11", "tx:IP24", "tx:QGA1", "tx:QGA2"],
        },
        {
          he: "IE02 עדכון רשומת הציוד. Fiori בצד ה-QM, לפי עמודי היישום ב-help.sap.com (2025.001): Manage Usage " +
            "Decisions (App ID F2345), Manage Inspection Lots (App ID F2343 בעמוד היישום, מול F1243 בעמוד What's New) " +
            "ו-Record Inspection Results (App ID F1685A בעמוד היישום, מול F168A בעמוד What's New). אף אחד מהם אינו " +
            "בקטלוג המאומת של הפרויקט (data/fiori/apps.ts), ולכן הם בפרוזה בלי xref.",
          xrefs: ["tx:IE02"],
        },
      ],
      tables: [
        {
          he: "MPLA תוכנית, MPOS פריט תוכנית, MHIS היסטוריית תזמון; PLKO/PLPO/PLMK רשימת פעולות ומאפייני בדיקה; AUFK " +
            "כותרת הזמנת הכיול.",
          xrefs: ["table:MPLA", "table:MPOS", "table:MHIS", "table:PLKO", "table:PLPO", "table:PLMK", "table:AUFK"],
        },
        {
          he: "EQUI רשומת הציוד; JEST סטטוס ההזמנה והציוד (tx-intel.ts#IW32, process-guides.ts#pm-calibration-process).",
          xrefs: ["table:EQUI", "table:JEST"],
        },
        {
          he: "QALS (מנת הבדיקה), QAMR (תוצאות) ו-QAVE (החלטת שימוש) נקובות ברשומות tx-intel של QA32/QE51N/QA11 " +
            "וב-domains.ts#pm-calibration, אך אינן במילון הפרויקט ולכן נשארות בפרוזה בלי xref.",
        },
        {
          he: "אובייקט ההזמנה ותוכנית התחזוקה ותצוגות ה-CDS שלהם (data/cds-map.ts).",
          xrefs: ["obj:maintenance-order", "obj:maintenance-plan", "cds:I_MaintenanceOrder", "cds:I_MaintenancePlan"],
        },
      ],
      integrationPoints: [
        {
          he: "PM מול QM: לפי עמוד Test Equipment Management הרכיב מקשר בין Technical objects (PM-EQM), Preventive " +
            "maintenance (PM-PRM) ו-Maintenance processing (PM-WOC) לבין Quality planning (QM-PT) ו-Quality " +
            "inspection (QM-IM).",
          xrefs: ["obj:equipment", "obj:maintenance-plan", "obj:maintenance-order"],
        },
        {
          he: "שחרור הזמנת הכיול יוצר מנת בדיקה שמופיעה ברשימת העבודה לרישום תוצאות של QM (עמוד 'Calibration Order'); " +
            "מצד הבדיקה זהו אותו מנגנון של bp:quality-inspection-in-production.",
          xrefs: ["tx:IW32", "tx:QA32", "bp:quality-inspection-in-production"],
        },
        {
          he: "החלטת השימוש מחזירה ל-PM פעולות המשך: עדכון סטטוס הציוד ויצירת מסמכי מדידה (עמוד Test Equipment " +
            "Management).",
          xrefs: ["tx:QA11", "table:JEST"],
        },
      ],
      interfaces: [
        {
          he: "יצירה ושינוי של הזמנת הכיול דרך BAPI_ALM_ORDER_MAINTAIN (tx-intel.ts#IW31, #IW32), כמו כל הזמנת PM " +
            "(bp:maintenance-order-process).",
          xrefs: ["fm:BAPI_ALM_ORDER_MAINTAIN", "bp:maintenance-order-process"],
        },
        {
          he: "קריאת מאפייני בדיקה וקטלוג הקודים: QPK1_INSPCHAR_READ ו-QPK1_CATALOG_READ " +
            "(domain-detail.ts#pm-calibration).",
          xrefs: ["fm:QPK1_INSPCHAR_READ", "fm:QPK1_CATALOG_READ"],
        },
        {
          he: "נקובים ברשומות tx-intel ואינם במילון הפרויקט (לכן בלי xref): BAPI_INSPOPER_RECORDRESULTS לרישום תוצאות " +
            "(QE51N, QE01); BAPI_INSPLOT_SETUSAGEDECISION להחלטת שימוש (QA11, QA32); BAPI_MAINTENANCEPLAN_SCHEDULE " +
            "לתזמון (IP10, IP30).",
        },
      ],
      outputs: [
        {
          he: "הזמנת כיול; עם השחרור, מנת בדיקה.",
          xrefs: ["table:AUFK", "obj:maintenance-order"],
        },
        { he: "תוצאות מדידה לכל מאפיין והחלטת שימוש (תקין/לא תקין)." },
        {
          he: "סטטוס ציוד מעודכן ('Ready for use' / 'Not ready for use') ועדכון קריאות מדידה כפעולות המשך (עמוד " +
            "'Creation of a Calibration Order'); היסטוריית כיול שמורה לציוד (domain-detail.ts#pm-calibration).",
          xrefs: ["table:JEST", "table:EQUI"],
        },
      ],
      exceptions: [
        {
          he: "מנת בדיקה לא נוצרה: מפתח בקרה ללא סימון Inspection ברשימת הפעולות, או שסוג בדיקה למקור 14 (בסטנדרט: סוג " +
            "בדיקה 14) לא משויך לסוג הזמנת הכיול (process-guides.ts#pm-calibration-process, " +
            "domain-detail.ts#pm-calibration למפתח הבקרה; עמוד help.sap.com 'Creation of a Calibration Order' לשיוך " +
            "סוג הבדיקה למקור 14).",
          xrefs: ["table:PLMK"],
        },
        {
          he: "תוכנית כיול לא תוזמנה ו-IP30 לא רץ: המכשיר לא כויל במועד ועדיין בשימוש (תקרית qm-calibration-overdue).",
          xrefs: ["tx:IP30", "table:MHIS"],
        },
        {
          he: "סוג בדיקה 14 לא בכותרת רשימת הפעולות: IP30 רצה אבל לא נוצרת מנת בדיקת כיול לציוד המדידה (תקרית " +
            "qm-calibration-not-scheduled).",
          xrefs: ["tx:IP30", "tx:IP24", "tx:QA32"],
        },
        {
          he: "החלטת שימוש חסומה: 'תוצאות חסרות (results not complete)' (commonErrors ב-tx-intel.ts#QA11).",
          xrefs: ["tx:QA11"],
        },
      ],
      controls: [
        {
          he: "ציוד המדידה מוגדר כציוד בדיקה וסוג בדיקה למקור 14 (בסטנדרט: סוג בדיקה 14) משויך לסוג הזמנת הכיול לפני " +
            "שההזמנה יכולה להפיק מנת בדיקה בשחרור (עמוד 'Creation of a Calibration Order').",
        },
        {
          he: "עדכון סטטוס הציוד מופעל כפעולת המשך של החלטת השימוש (עמוד 'Creation of a Calibration Order'; 'מפעילה " +
            "follow-up actions' ב-tx-intel.ts#QA11).",
          xrefs: ["tx:QA11", "table:JEST"],
        },
        { he: "היסטוריית כיול נשמרת לציוד לביקורת (domain-detail.ts#pm-calibration, תרחיש QA Regression)." },
      ],
      eccToS4: [
        { he: "אינטגרציית PM-QM לכיול זהה ב-ECC וב-S/4HANA לפי domain-detail.ts#pm-calibration (eccS4.unchanged)." },
        {
          he: "S/4HANA: חוויית המשתמש לרישום תוצאות עוברת ל-Fiori לפי אותה רשומה (eccS4.changed); יישומי ה-QM הרשמיים " +
            "(Manage Inspection Lots, Manage Usage Decisions, Record Inspection Results) מתועדים ב-help.sap.com " +
            "2025.001, עם סתירת מזהים שמתועדת ב-evidence.",
        },
        {
          he: "S/4HANA: פריט הפישוט 'S4TWL - Scheduling of Maintenance Plan' מסמן את התזמון של IP30 כטכנולוגיה שאינה " +
            "עתידית ומורה ליצור עבודות רקע ל-IP30H; זה חל גם על תוכניות כיול, כמו בכל תחזוקה מונעת.",
          xrefs: ["tx:IP30", "tx:IP30H", "bp:preventive-maintenance-process"],
        },
      ],
      migration: [
        {
          he: "QALS ו-QAMR (אינן במילון הפרויקט) נשמרות; לאחר המרה יש לוודא שהזמנת PM מפיקה מנת בדיקה ושזרימת תוצאות אל " +
            "החלטת שימוש שלמה (domain-detail.ts#pm-calibration, שדה migration). לא אותר עמוד Data Migration רשמי " +
            "ייעודי לתהליך הכיול.",
        },
      ],
      reference: {
        title: "Test Equipment Management (QM-IT) | Quality Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2bc3ee8d1c83404e8cf62418640004f2/7fcfba538c95b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תיעוד הרכיב הרשמי מרשומת חיפוש (loio 7fcfba538c95b54ce10000000a174cb4, 2025.001), נקרא במלואו " +
          "ב-2026-09-24. זה עמוד רכיב ולא פריט SAP Best Practices; פריט Scope Item ייעודי לתהליך הכיול לא אותר ולא " +
          "נרשם.",
      },
    },
    xrefs: [
      "table:MPLA", "table:MPOS", "table:PLKO", "table:PLPO", "table:PLMK", "table:AUFK", "table:EQUI", "table:JEST",
      "table:MHIS", "tx:IP01", "tx:IP10", "tx:IP30", "tx:IP30H", "tx:IW31", "tx:IW32", "tx:QA32", "tx:QE51N",
      "tx:QE01", "tx:QA11", "tx:QGA1", "tx:QGA2", "tx:IE02", "tx:IP24", "fm:BAPI_ALM_ORDER_MAINTAIN",
      "fm:QPK1_INSPCHAR_READ", "fm:QPK1_CATALOG_READ", "obj:maintenance-order", "obj:maintenance-plan",
      "obj:equipment", "obj:maintenance-task-list", "cds:I_MaintenanceOrder", "cds:I_MaintenancePlan",
      "bp:preventive-maintenance-process", "bp:quality-inspection-in-production", "bp:maintenance-order-process",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'כיול (Calibration)' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "זרימת התהליך: תוכנית תחזוקה לכיול + רשימת פעולות QM, פקודה עם מפתח בקרה Inspection, מנת בדיקה " +
          "(Inspection Lot), רישום תוצאות (QE11), החלטת שימוש (QA11); טבלאות QALS/QAMR/QAVE/PLKO/PLPO/PLMK; " +
          "טרנזקציות IP01, IW31, QE11, QA11, QGA2; פונקציה QPK1_INSPCHAR_READ; 'מפתח בקרה PM03 מפעיל בדיקת QM'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-calibration",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'כיול (Calibration)' של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מטרה, דיאגרמת שלבים (תוכנית, פקודה+מפתח בקרה Inspection, מנת בדיקה, רישום תוצאות, החלטת שימוש, עדכון " +
          "סטטוס מכשיר), נתוני אב (מפתח בקרה PM03, מאפייני בדיקה PLMK, תוכנית בדיקה, ציוד מדידה (PRT)), פונקציות " +
          "QPK1_INSPCHAR_READ/QPK1_CATALOG_READ; תרחישי QA: 'Negative: תוצאה מחוץ לתחום → UD לא תקין → חסימת " +
          "מכשיר', 'Regression: היסטוריית כיול נשמרת לציוד'; תקריות: מנת בדיקה לא נוצרה (מפתח בקרה ללא Inspection), " +
          "PLMK חסר, UD תקוע (תוצאות לא מלאות); יישומי Fiori בשם בלבד (Manage Inspection Lots, Record Inspection " +
          "Results); הגירה: 'QALS/QAMR נשמרים. QA: ודא יצירת מנת בדיקה מפקודת PM וזרימת תוצאות→UD'; ECC מול " +
          "S/4HANA: 'אינטגרציית PM-QM זהה', 'UX ל-Fiori לרישום תוצאות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-calibration",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך 'כיול משולב PM-QM' של הפרויקט (PROCESS_GUIDES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "שלבים: תוכנית כיול+רשימת פעולות עם מאפייני בדיקה (IP01, MPLA/PLMK); פקודה עם מפתח בקרה PM03 שיוצרת מנת " +
          "בדיקה (רשום תחת IP30, AUFK/QALS); רישום תוצאות (QE11, QAMR/QASR); החלטת שימוש (QA11, QAVE); 'סטטוס מכשיר " +
          "מתעדכן; לא תקין → חסימה' (IE02, EQUI/JEST). טעויות: מפתח בקרה ללא Inspection, מאפיינים חסרים, תוצאות לא " +
          "מלאות, מכשיר לא תקין לא נחסם; debugPath: 'QGA2 (Calibration overview)', Exit QEEM0001; התרחיש: " +
          "'היסטוריית כיול נשמרת לציוד'.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-calibration-process",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות מודיעין הטרנזקציות של הפרויקט: QA32, QE51N, QE01, QA11 (TX_INTEL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QA32: רשימת העבודה ללוטי בדיקה (טבלאות QALS/QAVE/QAMR/QAMV; BAPI_INSPLOT_GETLIST, " +
          "BAPI_INSPLOT_SETUSAGEDECISION, BAPI_INSPOPER_GETLIST; users כולל QA Inspector). QE51N: רשימת העבודה " +
          "לרישום תוצאות, 'הכלי המומלץ לרישום תוצאות יומיומי' (QASR/QAMR/QAMV/QAPP/QASE; " +
          "BAPI_INSPOPER_RECORDRESULTS; commonErrors כולל 'valuation לא מתבצע אוטומטית'). QE01: רישום תוצאות לפי " +
          "מאפיין, 'QE51N הוא המסך המומלץ' (BAPI_INSPOPER_RECORDRESULTS). QA11: רישום החלטת שימוש, 'מפעילה " +
          "follow-up actions' (QALS/QAVE/QAMV/QAMB; BAPI_INSPLOT_SETUSAGEDECISION); commonErrors: 'לא ניתן לרשום " +
          "UD: תוצאות חסרות (results not complete)'. ארבעתן 'זמינה ב-S/4HANA' לפי שדה s4.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QA32; data/tx-intel.ts#QE51N; data/tx-intel.ts#QE01; data/tx-intel.ts#QA11",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות מודיעין הטרנזקציות של הפרויקט: IP01, IP10, IP30, IP24 (TX_INTEL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IP01: יצירת תוכנית תחזוקה, כותבת ל-MPLA/MPOS, strategy מבוסס זמן או ביצועים; IP10: תזמון תוכנית בודדת על " +
          "MPLA/MHIS (BAPI_MAINTENANCEPLAN_SCHEDULE); IP30: ניטור מועדים, 'מורצת לרוב כ-background job תקופתי', " +
          "מעדכנת MHIS (BAPI_MAINTENANCEPLAN_SCHEDULE); IP24: סקירת תזמון רשימתית על MHIS/MPLA/MPOS. שדה users: " +
          "'מתכנן תחזוקה', 'מהנדס תחזוקה מונעת' (IP01/IP10/IP30).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP01; data/tx-intel.ts#IP10; data/tx-intel.ts#IP30; data/tx-intel.ts#IP24",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות מודיעין הטרנזקציות של הפרויקט: IW31, IW32, IE02 (TX_INTEL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW31: יצירת הזמנת תחזוקה לפי order type, כותבת ל-AUFK/AFKO/AFVC/RESB, סטטוס ב-JEST " +
          "(BAPI_ALM_ORDER_MAINTAIN); IW32: שינוי הזמנה כולל שחרור (REL), TECO ועדכון JEST " +
          "(BAPI_ALM_ORDER_MAINTAIN); IE02: שינוי רשומת ציוד על EQUI/EQUZ. users כולל 'מתכנן תחזוקה'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW31; data/tx-intel.ts#IW32; data/tx-intel.ts#IE02",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות מודיעין הטרנזקציות של הפרויקט: QGA1, QGA2 (TX_INTEL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QGA1: 'הערכת לוט בדיקה גרפית/אנליטית', ניתוח quality score ותוצאות ברמת הלוט (QALS/QAVE/QASR); QGA2: " +
          "שינוי אובייקט הערכה/ניתוח במשפחת QGA (QASR/QASE). הרשומות עצמן אינן מזכירות כיול; הקשר לכיול נשען על " +
          "process-guides ועל התקריות.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QGA1; data/tx-intel.ts#QGA2",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי תצוגות ה-CDS של הפרויקט: I_MaintenanceOrder, I_MaintenancePlan (CDS_MAP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "I_MaintenanceOrder: פקודת תחזוקה, מודול PM, טבלאות AUFK/AFKO; I_MaintenancePlan: תוכנית תחזוקה, טבלאות " +
          "MPLA/MPOS, consumption C_MaintenancePlan.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaintenanceOrder; data/cds-map.ts#I_MaintenancePlan",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-calibration-overdue, qm-calibration-not-scheduled",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "qm-calibration-overdue: מכשיר מדידה לא כויל במועד אך עדיין בשימוש (Impact BLOCKING לציות); שורש: תוכנית " +
          "כיול לא תוזמנה/IP30 לא רץ, 'אין חסימת מכשיר אחרי איחור'; תיקון: 'חסום מכשיר עם כיול פג'; מניעה: 'IP30 " +
          "מתוזמן', 'סטטוס חסימה אוטומטי'; ניתוח ב-IP30/QGA2/IE03, 'QGA2 לכיולים'. qm-calibration-not-scheduled: " +
          "IP30 רצה אך לא נוצרת מנת בדיקת כיול (type 14) כי 'type 14 לא ב-task list header'; ניתוח " +
          "ב-IP30/IP24/QA32/QGA1, 'QGA1 → היסטוריה', Exit QEVA0001.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#qm-calibration-overdue; " +
          "data/troubleshooting-ext.ts#qm-calibration-not-scheduled",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 4.1.2 " +
          "S4TWL - Scheduling of Maintenance Plan (PM-PRM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TX_21,
        claim: "פריט 4.1.2 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום PM-PRM; הערת Business Impact " +
          "0002270078 'Scheduling of Maintenance Plan', כפי שמופיעה בטבלת ה-Related Notes של הפריט) קובע בלשונו: " +
          "'Transaction IP30 is doing scheduling for Maintenance Plans. Within this scheduling outdated technology " +
          "(Batch Input) is used. Functionality available in SAP S/4HANA on-premise edition 1511 delivery but not " +
          "considered as future technology. Functional equivalent is not available yet. We plan to discontinue this " +
          "in one of the next Releases. The new transaction for doing mass scheduling is IP30H which is optimized " +
          "for HANA and is offering parallel processing at a much hiher speed' [כך במקור]; תחת Business Process " +
          "related information: 'No influence on business processes expected'; ותחת Required and Recommended " +
          "Action(s): 'Review your background Jobs which you most probably have scheduled periodically for " +
          "transaction IP30 (Reports RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)'. כלומר " +
          "IP30 עדיין זמינה ב-S/4HANA On-Premise, מכוסה בפריט פישוט המסמן אותה כטכנולוגיה שאינה עתידית עם כוונת " +
          "הפסקה במהדורה עתידית, והנתיב המומלץ לתזמון המוני הוא IP30H (תוכנית RISTRA20H). (אומת ברשומת tx:IP30H)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Test Equipment Management (QM-IT) | Quality Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2bc3ee8d1c83404e8cf62418640004f2/7fcfba538c95b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 7fcfba538c95b54ce10000000a174cb4; גוף העמוד (נקרא במלואו): 'Using the functions in the component " +
          "Test Equipment Management, you can manage equipment data, plan and schedule inspections, and perform " +
          "calibration inspections for the equipment'; הרכיב מקשר בין Technical objects (PM-EQM), Preventive " +
          "maintenance (PM-PRM) ו-Maintenance processing (PM-WOC) לבין Quality planning (QM-PT) ו-Quality " +
          "inspection (QM-IM), ו-'you also require the cross-application component Classification System (CA-CL)'; " +
          "'Define maintenance cycles in the maintenance plan (for example, to determine calibration intervals " +
          "based on time or performance)'; 'You can plan and perform a calibration inspection without using a " +
          "maintenance plan by creating a maintenance order manually'; 'Trigger automatic follow-up actions with " +
          "the usage decision for the inspection lot (for example, update equipment statuses, change cycle " +
          "modification factors, generate measurement documents)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creation of a Calibration Order",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/efc7b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio efc7b65334e6b54ce10000000a174cb4; גוף העמוד (נקרא במלואו): 'If you do not want to do this regularly " +
          "(= spontaneously), you create a calibration order directly'; 'In the standard system, the order type " +
          "PM05 (calibration order) is used'; 'In the standard system, the equipment category Q (test equipment) is " +
          "used'; 'The measuring point/counter and the master characteristic must both be created with reference to " +
          "the same general characteristic from the classification system'; 'This inspection type must be created " +
          "for origin 14 (Plant Maintenance). In the standard system, inspection type 14 (inspection for Plant " +
          "Maintenance) is used for this. The inspection type must be assigned to the order type for calibration " +
          "orders (order type PM05 in the standard system)'; 'When the order is released, the system generates an " +
          "inspection lot'; 'As soon as you have made the usage decision, the system automatically executes " +
          "follow-up actions, for example, status change of the test equipment (\"Ready for use\" \"Not ready for " +
          "use\") or updating measurement readings'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Calibration Order",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/d4cab65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio d4cab65334e6b54ce10000000a174cb4; עמוד ההגדרה: 'Special order that tests whether a specified piece " +
          "of test equipment fulfills the performance criteria defined'; 'In the standard system, the order type " +
          "for calibration orders is PM05'; 'You can either create calibration orders directly or generate them " +
          "automatically from maintenance plans'; 'The inspection lot appears in the worklist for results recording " +
          "in the Quality Management (QM) application component'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Usage Decisions | Quality Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2bc3ee8d1c83404e8cf62418640004f2/85fae2574096f432e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 85fae2574096f432e10000000a441470; סניפט רשומת החיפוש: 'Manage Usage Decisions App ID: F2345 With " +
          "this app, you can display inspection lots and manage usage decisions of each inspection lot'. היישום " +
          "אינו רשום ב-data/fiori/apps.ts של הפרויקט; אותו loio ואותו App ID F2345 כבר נוקבו בשורת מאגר ברמת " +
          "verification_required בתוך רשומת fiori:F2731 (data/verification/fiori.ts).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Inspection Lots | Quality Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2bc3ee8d1c83404e8cf62418640004f2/ecfae2574096f432e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio ecfae2574096f432e10000000a441470; סניפט רשומת החיפוש: 'Manage Inspection Lots App ID: F2343 Use " +
          "With this app, you can display and manage inspection lots'. עמוד What's New רשמי אחר מדפיס מזהה שונה " +
          "לאותו שם יישום (ראו הראיה הסותרת); מה שיכריע: scripts/fal-app.mjs F2343 ו-F1243.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Harmonized Document Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025.000",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/12330e3d87e74b849f14f9fb943d51bc.html?locale=en-US&state=PRODUCTION&version=2025.000",
            accessedAt: DATE,
            claim: "loio 12330e3d87e74b849f14f9fb943d51bc; סניפט רשומת החיפוש (What's New 2025, התכונה Harmonized Document " +
              "Management): 'Manage Inspection Lots (App ID: F1243)'.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Record Inspection Results | Quality Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2bc3ee8d1c83404e8cf62418640004f2/d010ce7fa4fc40b48bf4eeccc2002c3a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio d010ce7fa4fc40b48bf4eeccc2002c3a; סניפט רשומת החיפוש: 'Record Inspection Results App ID: F1685A " +
          "Note This app is the successor of the Record Inspection Results (Deprecated) app' ומגוף העמוד (נקרא " +
          "2026-09-24): 'With this app, you can record results for characteristics for one or more inspection lots " +
          "effectively'. עמוד What's New רשמי אחר מדפיס מזהה שונה לאותו שם (ראו הראיה הסותרת); מה שיכריע: " +
          "scripts/fal-app.mjs F1685A.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Harmonized Document Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025.000",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/12330e3d87e74b849f14f9fb943d51bc.html?locale=en-US&state=PRODUCTION&version=2025.000",
            accessedAt: DATE,
            claim: "loio 12330e3d87e74b849f14f9fb943d51bc; סניפט רשומת החיפוש (What's New 2025, התכונה Harmonized Document " +
              "Management): 'Record Inspection Results (App ID: F168A)'. המזהה המודפס שונה מ-F1685A שבעמוד היישום.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 5 בספריית הפרויקט (SAP PRESS, Quality Management with SAP S/4HANA), פרק 3 'Quality Inspection', " +
          "סעיפים 3.1.1 'Inspection Lot Creation', 3.1.2 'Results Recording' ו-3.1.3 'Usage Decision'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הפרק מתעד את שלושת שלבי הליבה של מנת הבדיקה (יצירה, רישום תוצאות, החלטת שימוש) שהתהליך משתמש בהם גם " +
          "לכיול; הספר משמש כאן להפניית קריאה בלבד, כמו ב-bp:quality-inspection-in-production, ואינו מקור לטענה " +
          "חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book5.json#3.1.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 5 'Preventive Maintenance', סעיף 5.4 " +
          "'Time-Based Maintenance Plans'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הפרק מתעד תוכניות תחזוקה מבוססות זמן, המנגנון המשמש גם לתזמון תוכנית כיול; הספר משמש כאן להפניית קריאה " +
          "בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#5.4",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor + repairer), 2026-09-24",
    notes: "רשומת תהליך: הזרימה (תוכנית/הזמנה → מנת בדיקה → תוצאות → החלטת שימוש → סטטוס מכשיר) נגזרת מרשומות המאגר " +
      "הנקובות ב-evidence; ערכי הסטנדרט PM05, equipment category Q וסוג בדיקה 14, מקור הבדיקה 14 (Plant " +
      "Maintenance) ופעולות ההמשך האוטומטיות נגזרים מעמודי help.sap.com הרשמיים שנקראו ב-2026-09-24 " +
      "(scripts/sap-help-search.mjs ו-scripts/sap-help-body.mjs), לא מהמאגר. IP30H ופריט הפישוט 'S4TWL - " +
      "Scheduling of Maintenance Plan' מועתקים מרשומת tx:IP30H (data/verification/transactions.ts). טבלאות " +
      "QALS/QAMR/QAVE ומודולי הפונקציה BAPI_INSPOPER_RECORDRESULTS, BAPI_INSPLOT_SETUSAGEDECISION " +
      "ו-BAPI_MAINTENANCEPLAN_SCHEDULE נקובים ברשומות tx-intel המצוטטות אך אינם במילון הפרויקט ונשארו בפרוזה " +
      "בלי xref. יישומי Fiori: Manage Usage Decisions (F2345) אומת בעמוד היישום; Manage Inspection Lots (F2343 " +
      "בעמוד היישום מול F1243 בעמוד What's New 'Harmonized Document Management', 2025.000) ו-Record Inspection " +
      "Results (F1685A בעמוד היישום מול F168A באותו עמוד What's New) מסומנים conflicting_sources; מה שיכריע: " +
      "scripts/fal-app.mjs F2343, F1243, F1685A. אף אחד מהם אינו ב-data/fiori/apps.ts ולכן אין xref fiori:. מדד " +
      "כיול באיחור אינו מתועד כ-KPI; התקרית qm-calibration-overdue מתעדת סיכון בלבד, ולכן השדה kpis הושמט. " +
      "תפקידים: תיאורים מתוך שדה users ברשומות tx-intel, ללא קוד תפקיד עסקי של SAP. לא אותר פריט SAP Best " +
      "Practices (Scope Item) ייעודי לכיול; ההפניה הרשמית היא עמוד תיעוד הרכיב Test Equipment Management. לא " +
      "בוצעה בדיקה במערכת SAP חיה.",
  },
  /* =========================================================== refurbishment */
  {
    slug: "refurbishment-process",
    he: "שיפוץ חלקי חילוף (Refurbishment): ממלאי פגום, דרך פקודת שיפוץ, ניפוק, ביצוע וקבלה, ועד התחשבנות",
    en: "Refurbishment process for repairable spares: from defective stock through a refurbishment order, issue, " +
      "execution and receipt, to settlement",
    module: "PM",
    summary: "פקודת שיפוץ מנהלת את מחזור התיקון של חלף הניתן לתיקון (repairable spare): פריט פגום מפורק ממערכת טכנית, " +
      "פריט תקין מותקן במקומו, והפגום עובר שיפוץ בפקודה ייעודית עד לחזרתו למלאי במצב תקין ולהתחשבנות עלות " +
      "השיפוץ מול המחיר הממוצע הנע של החומר.",
    context: "לפי העמוד הרשמי (SAP S/4HANA On-Premise 2025 FPS01, 'Order Processing: Refurbishment of Repairable " +
      "Spares'), השיפוץ של חלפים יקרי ערך הוא לעיתים קרובות תהליך ליבה בתחזוקת מפעל ויעיל כלכלית יותר מרכישה " +
      "חדשה; אין הבחנה בין חלקים תקינים לפגומים בתכנון החומרים עצמו. בפרויקט מתועדת פקודת השיפוץ תחת סוג פקודה " +
      "PM04, עם דרישת split valuation למצבי ההערכה של החומר; תקרית פרויקט מתעדת שכאשר split valuation אינו " +
      "מוגדר, הערך והמצב אחרי הקבלה יוצאים שגויים. לתנועות הסחורה: עמוד Maintenance Management ('Additional " +
      "Movement Types', 2025 FPS01) מציין את MB11 לניפוק ואת IW8W לקבלה כטרנזקציות השיפוץ הסטנדרטיות, מתיר MIGO " +
      "בסוגי התנועה 261/101, ומחריג את MIGO רק לסוגי ההעברה 313/315; פריט הפישוט הכללי S4TWL - AVAILABILITY OF " +
      "TRANSACTIONS IN MM-IM (רשימת 2023 FPS03) מונה את MB11 בין טרנזקציות ה-MB שהוחלפו ב-MIGO או " +
      "ב-BAPI_GOODSMVT_CREATE. הסתירה בין שני המקורות לגבי זמינות MB11 עצמה נשארת פתוחה; ההשפעה המעשית מתרכזת " +
      "במסלול 313/315, שבו MIGO אינה זמינה. ה-BAPI לקריאת פקודת תחזוקה, BAPI_ALM_ORDER_GET_DETAIL, מתועד רשמית " +
      "כמורחב לקריאת נתונים ייעודיים של פקודות שיפוץ.",
    steps: [
      {
        he: "לוודא תנאים מוקדמים: נתון אב חומר לחלף קיים (זיהוי ייחודי אפשרי רק אם הפריטים מנוהלים במספרים סידוריים " +
          "(serialized), לפי העמוד הרשמי), וסוג פקודה לשיפוץ מוגדר; בפרויקט מתועד סוג פקודה PM04 ודרישת split " +
          "valuation למצבי ההערכה, לפי תקרית refurbishment-order.",
        xrefs: ["table:AUFK", "table:MBEW"],
      },
      {
        he: "בתקלה במערכת טכנית לפרק את החלק הפגום ולהחזירו למחסן, ולהתקין במקומו חלק תקין מהמלאי; כשמספר הפגומים " +
          "מגיע לרמה מסוימת, המתכנן האחראי פותח פקודת שיפוץ, לפי העמוד הרשמי.",
      },
      {
        he: "ליצור פקודת שיפוץ (IW81): לקבוע כמה יחידות לשפץ, ולתכנן פעולות, חומרים ומשאבים; סטטוס הפתיחה 'to be " +
          "refurbished' והיעד 'refurbished', לפי העמוד הרשמי. לפי רישום האובייקטים של הפרויקט, פקודת התחזוקה כוללת " +
          "בין השאר את AUFK ואת AFIH.",
        xrefs: ["tx:IW81", "table:AUFK", "table:AFIH", "obj:maintenance-order"],
      },
      { he: "לשחרר את הפקודה כדי להתחיל את העבודה, לפי העמוד הרשמי." },
      {
        he: "לנפק את החלק הפגום מהמחסן לפקודה: לפי עמוד 'Additional Movement Types' (2025 FPS01), טרנזקציית השיפוץ " +
          "הסטנדרטית לניפוק היא MB11, ובסוגי התנועה 261/101 ניתן להשתמש גם ב-MIGO; MIGO אינה זמינה לסוגי ההעברה " +
          "313/315 בפקודות שיפוץ. פריט הפישוט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (רשימת 2023 FPS03) מונה " +
          "את MB11 בין הטרנזקציות שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE, ולכן במסלול 261/101 MIGO מתועדת כשמישה " +
          "לפי שני המקורות.",
        xrefs: ["tx:MB11", "tx:MIGO", "fm:BAPI_GOODSMVT_CREATE", "table:MSEG"],
      },
      {
        he: "העובדים האחראים לשיפוץ מבצעים את העבודה ומזינים אישורי ביצוע (completion confirmations); לפי העמוד הרשמי " +
          "אין לתחזק הודעות תחזוקה לפקודת שיפוץ.",
      },
      {
        he: "לרשום קבלת סחורה לחלק המשופץ: לפי עמוד 'Additional Movement Types' (2025 FPS01), טרנזקציית השיפוץ " +
          "הסטנדרטית לקבלה היא IW8W, ובסוגי התנועה 261/101 ניתן להשתמש גם ב-MIGO. לפי עמוד התהליך, הקבלה מעדכנת " +
          "אוטומטית את מצב האצווה/ההערכה ברשומת האב של המספר הסידורי, והפקודה עוברת לסטטוס Delivered או Partially " +
          "delivered.",
        xrefs: ["tx:IW8W", "tx:MIGO", "table:MBEW", "table:MSEG"],
      },
      {
        he: "להשלים את הפקודה ולהתחשבן אותה: לפי העמוד הרשמי ההתחשבנות (Order settlement) מעדכנת את המחיר הממוצע הנע " +
          "של החומר המשופץ, ודגל REFURBSETL בקסטומיזציה מאפשר התחשבנות אוטומטית בהגעה לסטטוס Delivered. לפי רשומת " +
          "tx-intel (העמוד הרשמי אינו נוקב בטרנזקציה), KO88 מתוארת כהתחשבנות בודדת של הזמנה פנימית למקבלים שבכלל " +
          "ההתחשבנות, ודוגמת העסק שלה מתארת התחשבנות פקודת תחזוקה; זמינה ב-S/4HANA.",
        xrefs: ["tx:KO88", "table:MBEW", "bp:order-settlement-process"],
      },
      {
        he: "לקריאה תוכניתית של פרטי פקודת השיפוץ משמש BAPI_ALM_ORDER_GET_DETAIL, המתועד רשמית כמורחב לקריאת נתונים " +
          "ייעודיים של פקודות שיפוץ; לעיבוד הפקודה, BAPI_ALM_ORDER_MAINTAIN מתועד רשמית כמורחב לתמיכה בפקודות שיפוץ " +
          "(maintenance order type PM04).",
        xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_ORDER_MAINTAIN", "bp:bapi-commit-discipline"],
      },
    ],
    antiPatterns: [
      "יצירת פקודת שיפוץ לחומר שאינו מוגדר ב-split valuation: הערך והמצב אחרי הקבלה יוצאים שגויים (תקרית " +
        "refurbishment-order).",
      "עיכוב בהתחשבנות הפקודה אחרי שהחלק המשופץ כבר סופק למחסן: לפי העמוד הרשמי, המחיר הממוצע הנע אינו מתעדכן, " +
        "ופקודות תחזוקה אחרות המשתמשות בחומר כחלף עלולות לקבל עלות מתוכננת או בפועל שגויה.",
      "תחזוקת הודעות תחזוקה על פקודת שיפוץ: לפי העמוד הרשמי, אין לתחזק הודעות לפקודה זו.",
      "שימוש ב-MIGO לרישום תנועות 313/315 בפקודת שיפוץ: לפי עמוד 'Additional Movement Types' (2025 FPS01), MIGO " +
        "אינה נתמכת בסוגי תנועה אלה בפקודות שיפוץ.",
      "כתיבה ישירה ל-MSEG או ל-MKPF בקוד מותאם במקום MIGO או BAPI_GOODSMVT_CREATE: לפי רשומת " +
        "matdoc-read-through-compatibility, ב-S/4HANA MSEG ו-MKPF הן תצוגות תאימות לקריאה, וכתיבה ישירה אסורה.",
    ],
    checks: [
      "חיובי: פקודת שיפוץ עם split valuation מוגדר עוברת ניפוק וקבלה, מעדכנת את מצב ההערכה, והסטטוס עובר " +
        "ל-Delivered או Partially delivered לפי העמוד הרשמי.",
      "שלילי: יצירת פקודה לחומר ללא split valuation מייצרת ערך או מצב שגוי, לפי תקרית refurbishment-order.",
      "שלילי: ניסיון לרשום תנועת 313/315 לפקודת שיפוץ ב-MIGO אינו נתמך לפי עמוד 'Additional Movement Types'; " +
        "המסלול המתועד הוא טרנזקציות השיפוץ הסטנדרטיות.",
      "אינטגרציה: BAPI_ALM_ORDER_GET_DETAIL קורא נתוני פקודת שיפוץ, כולל הנתונים הייעודיים שהורחב לקרוא לפי " +
        "התיעוד הרשמי.",
      "רגרסיה: לאחר ההתחשבנות, המחיר הממוצע הנע של החומר המשופץ מתעדכן, לפי העמוד הרשמי.",
    ],
    process: {
      purpose: "לנהל את מחזור השיפוץ של חלקי חילוף הניתנים לתיקון (repairable spares): פריט פגום מוחלף בפריט תקין במערכת " +
        "הטכנית, עובר שיפוץ בפקודה ייעודית, וחוזר למלאי במצב תקין עם התחשבנות עלות מול מחיר החומר.",
      trigger: [
        { he: "מספר החלקים הפגומים במחסן מגיע לרמה מסוימת, והמתכנן האחראי פותח פקודת שיפוץ, לפי העמוד הרשמי." },
        { he: "תקלה במערכת טכנית: החלק הפגום מפורק ומוחזר למחסן, וחלק תקין מותקן במקומו, לפי העמוד הרשמי." },
      ],
      preconditions: [
        {
          he: "נתון אב חומר קיים לחלף; זיהוי ייחודי אפשרי רק אם הפריטים מנוהלים במספרים סידוריים (serialized), לפי " +
            "העמוד הרשמי.",
        },
        {
          he: "מומלץ (לא חובה) להגדיר בקסטומיזציה סוג הזמנה פנימי ייעודי לשיפוץ, וניתן גם להשתמש בסוג הזמנה קיים, לפי " +
            "העמוד הרשמי; בפרויקט מתועד סוג פקודה PM04, והתיעוד הרשמי מזכיר את PM04 כ-maintenance order type של " +
            "פקודות שיפוץ.",
          xrefs: ["table:AUFK"],
        },
        {
          he: "split valuation מוגדר לחומר עם מצבי הערכה; בלעדיו הערך והמצב אחרי הקבלה יוצאים שגויים (תקרית " +
            "refurbishment-order).",
          xrefs: ["table:MBEW"],
        },
      ],
      roles: [
        {
          he: "תפקיד SAP_PM_WOC_REFURBISHM_ORD_PROC (Processing of Refurbishment Order): מכיל את הפונקציות לעיבוד " +
            "פקודות שיפוץ, כולל יצירת פקודת שיפוץ וקבלת סחורה לפקודה, לפי העמוד הרשמי.",
        },
        {
          he: "המתכנן האחראי: יוצר ומתכנן את פקודת השיפוץ; העובדים האחראים לשיפוץ: מושכים את החלקים מהמחסן ומזינים " +
            "אישורי ביצוע, לפי עמוד התהליך הרשמי.",
        },
      ],
      masterData: [
        {
          he: "נתון אב חומר עם split valuation ומצבי הערכה (תקרית refurbishment-order), וניהול במספרים סידוריים כשנדרש " +
            "זיהוי ייחודי (העמוד הרשמי).",
          xrefs: ["table:MARA", "table:MBEW"],
        },
        {
          he: "סוג פקודת תחזוקה לשיפוץ (בפרויקט: PM04) או שימוש בסוג פקודה קיים.",
          xrefs: ["table:AUFK"],
        },
      ],
      transactions: [
        {
          he: "IW81 יצירת פקודת שיפוץ (מדריך הטרנזקציות של הפרויקט).",
          xrefs: ["tx:IW81"],
        },
        {
          he: "MM03 לבירור נתוני ההערכה של החומר (MBEW, valuation class) לפני יצירת הפקודה; אבחון מצבי ההערכה דרך MM03 " +
            "מתועד בתקרית refurbishment-order.",
          xrefs: ["tx:MM03"],
        },
        {
          he: "MB11 לניפוק ו-IW8W לקבלה, טרנזקציות השיפוץ הסטנדרטיות לפי עמוד 'Additional Movement Types' (2025 FPS01); " +
            "באותו עמוד MIGO מותרת לסוגי התנועה 261/101 ואינה זמינה ל-313/315. פריט הפישוט S4TWL - AVAILABILITY OF " +
            "TRANSACTIONS IN MM-IM (רשימת 2023 FPS03) מונה את MB11 בין הטרנזקציות שהוחלפו ב-MIGO או " +
            "ב-BAPI_GOODSMVT_CREATE.",
          xrefs: ["tx:MB11", "tx:IW8W", "tx:MIGO"],
        },
        {
          he: "KO88 להתחשבנות בודדת של הפקודה, לפי רשומת tx-intel (העמוד הרשמי אינו נוקב בטרנזקציה).",
          xrefs: ["tx:KO88"],
        },
      ],
      tables: [
        {
          he: "AUFK ו-AFIH, בין טבלאות האובייקט פקודת תחזוקה ברישום האובייקטים של הפרויקט.",
          xrefs: ["table:AUFK", "table:AFIH", "obj:maintenance-order"],
        },
        {
          he: "MBEW נתוני ההערכה (לפי תקרית refurbishment-order ורשומת MM03), ו-MARA נתון האב הבסיסי של החומר.",
          xrefs: ["table:MBEW", "table:MARA"],
        },
        {
          he: "מסמך התנועה לניפוק ולקבלה: MSEG/MKPF ב-ECC; ב-S/4HANA כותרת ופריטי מסמך החומר מאוחדים ב-MATDOC (אינה " +
            "במילון הפרויקט), ו-MSEG/MKPF נשארות לקריאה דרך תצוגות התאימות NSDM_V_MSEG ו-NSDM_V_MKPF, לפי רשומת " +
            "matdoc-read-through-compatibility.",
          xrefs: ["table:MSEG", "bp:matdoc-read-through-compatibility"],
        },
      ],
      interfaces: [
        {
          he: "BAPI_ALM_ORDER_GET_DETAIL: קריאת פרטי פקודה, מתועד רשמית כמורחב לקריאת נתונים ייעודיים של פקודות שיפוץ; " +
            "לפי רשומת function-intel זמין ב-S/4HANA, חלופה API_MAINTENANCEORDER.",
          xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL"],
        },
        {
          he: "BAPI_GOODSMVT_CREATE: המוזכר בפריט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (רשימת 2023 FPS03) " +
            "כחלופה ל-MB11, וכרקע של MIGO ברשומת tx-intel.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE"],
        },
      ],
      integrationPoints: [
        {
          he: "קריאה תוכניתית של פרטי הפקודה דרך BAPI_ALM_ORDER_GET_DETAIL, המתועד רשמית כמורחב לקריאת נתונים ייעודיים " +
            "של פקודות שיפוץ.",
          xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL"],
        },
        {
          he: "רישום תוכניתי של תנועות סחורה דרך BAPI_GOODSMVT_CREATE, המוזכר בפריט S4TWL - AVAILABILITY OF " +
            "TRANSACTIONS IN MM-IM (רשימת 2023 FPS03) כחלופה ל-MB11, וכרקע של MIGO ברשומת tx-intel.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE", "tx:MIGO"],
        },
        {
          he: "התחשבנות הפקודה מתחברת לתהליך ההתחשבנות הכללי של פקודות תחזוקה.",
          xrefs: ["bp:order-settlement-process"],
        },
      ],
      outputs: [
        {
          he: "פקודת שיפוץ עם סטטוס פתיחה 'to be refurbished' ויעד 'refurbished', לפי העמוד הרשמי.",
          xrefs: ["table:AUFK", "obj:maintenance-order"],
        },
        {
          he: "מסמכי חומר לניפוק ולקבלה, ועדכון אוטומטי של מצב האצווה/ההערכה ברשומת האב של המספר הסידורי בעת הקבלה, לפי " +
            "העמוד הרשמי.",
          xrefs: ["table:MSEG", "table:MBEW"],
        },
        {
          he: "התחשבנות עלות הפקודה, עם עדכון המחיר הממוצע הנע של החומר המשופץ, לפי העמוד הרשמי.",
          xrefs: ["tx:KO88"],
        },
      ],
      exceptions: [
        {
          he: "ערך או מצב שגויים אחרי הקבלה כאשר split valuation אינו מוגדר לחלף, סוג פקודה PM04 חסר או תנועות 261/101 " +
            "שגויות, לפי תקרית הפרויקט refurbishment-order.",
          xrefs: ["table:MBEW", "table:AUFK"],
        },
        {
          he: "עלות מתוכננת או בפועל שגויה בפקודות תחזוקה אחרות שמשתמשות בחומר כחלף, כל עוד פקודת השיפוץ לא התחשבנה " +
            "ומחיר החומר לא עודכן, לפי העמוד הרשמי.",
        },
        {
          he: "רישום 313/315 לפקודת שיפוץ דרך MIGO אינו נתמך, לפי עמוד 'Additional Movement Types' (2025 FPS01).",
          xrefs: ["tx:MIGO"],
        },
      ],
      controls: [
        {
          he: "split valuation מוגדר לפני יצירת הפקודה, אחרת הערך והמצב אחרי הקבלה יוצאים שגויים (תקרית " +
            "refurbishment-order).",
          xrefs: ["table:MBEW"],
        },
        { he: "לפי העמוד הרשמי: אין לתחזק הודעות תחזוקה על פקודת שיפוץ." },
        {
          he: "לפי העמוד הרשמי: דגל REFURBSETL בקסטומיזציה (System Enhancements and Data Transfer, Activate Functions " +
            "for Enterprise Asset Management) מאפשר התחשבנות אוטומטית בהגעה לסטטוס Delivered, למניעת עיכוב בעדכון " +
            "המחיר הממוצע הנע.",
        },
      ],
      eccToS4: [
        {
          he: "לפי רשומת function-intel, BAPI_ALM_ORDER_GET_DETAIL זמין ב-ECC וב-S/4HANA (חלופה: API_MAINTENANCEORDER); " +
            "תיעוד S/4HANA On-Premise 2025 FPS01 ('Enterprise Asset Management Part 4') מתעד אותו כמורחב לקריאת " +
            "נתונים ייעודיים של פקודות שיפוץ, ואת BAPI_ALM_ORDER_MAINTAIN כמורחב לתמיכה בפקודות שיפוץ (maintenance " +
            "order type PM04).",
          xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_ORDER_MAINTAIN"],
        },
        {
          he: "S/4HANA: אם הפונקציה העסקית FINS_PARALLEL_ACCOUNTING_BF (Universal Parallel Accounting) פעילה, פקודות " +
            "שיפוץ מעובדות ברישום מבוסס אירועים במקום התחשבנות תקופתית מסורתית, לפי העמוד הרשמי (2025 FPS01).",
          xrefs: ["tx:KO88"],
        },
        {
          he: "ניפוק/קבלה ב-S/4HANA: עמוד Maintenance Management 'Additional Movement Types' (2025 FPS01) מציין את MB11 " +
            "(ניפוק) ואת IW8W (קבלה) כטרנזקציות השיפוץ הסטנדרטיות, מתיר MIGO בסוגי התנועה 261/101 ומחריג את MIGO רק " +
            "ל-313/315. פריט הפישוט הכללי S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (רשימת 2023 FPS03, מהדורה " +
            "שונה מעמוד 2025 FPS01) מונה את MB11 בין הטרנזקציות שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE; הקודים " +
            "עדיין קיימים אך קריאה מהתפריט מעלה שגיאה. במסלול 261/101 MIGO מתועדת כשמישה לפי שני המקורות; הזמינות של " +
            "MB11 שנויה במחלוקת בין המקורות, וההשפעה המעשית מתרכזת במסלול 313/315, שבו העמוד מפנה לטרנזקציות השיפוץ; " +
            "לבדיקה במערכת היעד.",
          xrefs: ["tx:MB11", "tx:MIGO", "tx:IW8W"],
        },
        {
          he: "מסמכי החומר: ב-ECC נכתבים ל-MKPF/MSEG; ב-S/4HANA מאוחדים ב-MATDOC ו-MSEG/MKPF נקראות דרך תצוגות תאימות, " +
            "לפי רשומת matdoc-read-through-compatibility.",
          xrefs: ["table:MSEG", "bp:matdoc-read-through-compatibility"],
        },
      ],
      reference: {
        title: "Order Processing: Refurbishment of Repairable Spares | Orders (CS-SE/PM-WOC-MO), SAP S/4HANA On-Premise " +
          "2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/44cab65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תיעוד התהליך הרשמי, נקרא במלואו ב-2026-09-24 (scripts/sap-help-body.mjs, loio " +
          "44cab65334e6b54ce10000000a174cb4). פריט SAP Best Practices (Scope Item) לתהליך לא אותר בחיפושים שבוצעו " +
          "ולכן אינו נרשם.",
      },
    },
    xrefs: [
      "tx:IW81", "tx:IW8W", "tx:MB11", "tx:MIGO", "tx:MM03", "tx:KO88", "table:AUFK", "table:AFIH", "table:MBEW",
      "table:MARA", "table:MSEG", "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_ORDER_MAINTAIN",
      "fm:BAPI_GOODSMVT_CREATE", "obj:maintenance-order", "bp:order-settlement-process",
      "bp:matdoc-read-through-compatibility", "bp:maintenance-notification-process", "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Order Processing: Refurbishment of Repairable Spares | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/44cab65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "העמוד הרשמי (2025 FPS01) קובע שהתהליך משמש חלקי חילוף הניתנים לתיקון (repairable spares), וכי אין הבחנה " +
          "בין 'good parts' ל-'bad parts' בתכנון החומרים. תנאים מוקדמים: יש ליצור נתון אב חומר לחלף, וזיהוי ייחודי " +
          "אפשרי רק אם הפריטים מנוהלים במספרים סידוריים (serialized); מומלץ (לא חובה) להגדיר בקסטומיזציה סוג הזמנה " +
          "פנימי ייעודי לשיפוץ, וניתן גם להשתמש בסוג הזמנה קיים. זרימת התהליך: החלפת חלק פגום בחלק תקין, יצירת " +
          "פקודת שיפוץ בידי המתכנן האחראי ('the planner responsible creates a refurbishment order') כשמספר הפגומים " +
          "מגיע לרמה מסוימת (סטטוס פתיחה 'to be refurbished', יעד 'refurbished'), שחרור, משיכת החלקים מהמחסן בידי " +
          "העובדים האחראים לשיפוץ ('The goods issue is entered'), אישורי ביצוע ('Notifications should not be " +
          "maintained for the refurbishment order'), קבלת סחורה שמעדכנת אוטומטית את מצב האצווה/ההערכה ברשומת המספר " +
          "הסידורי ומעבירה את הפקודה לסטטוס Delivered או Partially delivered, השלמה, והתחשבנות (Order settlement) " +
          "שמעדכנת את המחיר הממוצע הנע; דגל REFURBSETL מאפשר התחשבנות אוטומטית בסטטוס Delivered. אם " +
          "FINS_PARALLEL_ACCOUNTING_BF פעילה, הפקודה מעובדת ברישום מבוסס אירועים במקום התחשבנות תקופתית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Processing of Refurbishment Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/ce67b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "העמוד הרשמי מתעד תפקיד בשם טכני SAP_PM_WOC_REFURBISHM_ORD_PROC, המכיל את כל הפונקציות הדרושות לעיבוד " +
          "פקודות שיפוץ; הפעילויות המתועדות בתחזוקת מפעל (PM) הן 'Creating a refurbishment order' ו-'Goods receipt " +
          "for refurbishment order'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "תחת הכותרת 'Enhancements to Maintenance Order BAPIs' מתעד העמוד את BAPI_ALM_ORDER_GET_DETAIL כ-BAPI " +
          "הקורא נתוני פקודות תחזוקה ושירות, שהורחב גם לקריאת נתונים ייעודיים של פקודות שיפוץ ('has also been " +
          "enhanced to read refurbishment order specific data'); BAPI_ALM_ORDER_MAINTAIN הורחב לתמיכה בפקודות שיפוץ " +
          "(maintenance order type PM04).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Additional Movement Types | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/d9f8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "העמוד (2025 FPS01) מציין שפקודות שיפוץ תומכות בסוגי התנועה 101 ו-261 ובסוגי ההעברה הנוספים 313 ו-315; " +
          "טרנזקציות השיפוץ הסטנדרטיות הן MB11 לניפוק ו-IW8W לקבלה; לא ניתן להשתמש ב-MIGO לרישום תנועות 313/315 " +
          "בפקודות שיפוץ, ו'If movement types 261/101 are used for goods issues or goods receipts you can use " +
          "MIGO'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 FPS1-3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN " +
          "MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_TX_02,
        claim: "MB11 נמנית בין טרנזקציות ה-MB שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE / BAPI_GOODSMVT_CANCEL; קודי " +
          "הטרנזקציה עדיין קיימים אך קריאה מהתפריט מעלה הודעת שגיאה. (מקוצר מהראיה MB11_SIMPL של רשומת tx:MB11 " +
          "ב-data/verification/transactions.ts; רשימת 2023 FPS03, מהדורה שונה מעמודי 2025 FPS01 ברשומה זו.)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: refurbishment-order",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תקרית 'פקודת שיפוץ (Refurbishment): מלאי split valuation': שיפוץ חלף לא מעדכן ערך/מצב נכון; סיבות שורש: " +
          "split valuation לא מוגדר (מצבי הערכה), סוג פקודה PM04 חסר, או תנועות 261/101 שגויות; אבחון ב-IW81 " +
          "וב-MM03 (מצבי הערכה), תצורה ב-OMWC; תיקון: הגדרת split valuation לחלף, שימוש בסוג פקודה PM04 ווידוא " +
          "תנועות השיפוץ הנכונות; טבלאות MBEW ו-AUFK.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#refurbishment-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך הטרנזקציות של הפרויקט (TCODE_DIRECTORY): IW81",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW81, מודול PM, 'פקודת שיפוץ' (Create refurbishment order), מילות מפתח refurbishment/שיפוץ.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-directory.ts#IW81",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): MIGO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MIGO היא הטרנזקציה המאוחדת לתנועות מלאי (קבלה, ניפוק, העברה, ביטול), כותבת MKPF/MSEG ותומכת בסוגי תנועה " +
          "(101, 122, 201, 311, 561 ועוד); ב-S/4HANA MB01/MB1A/MB1B/MB1C מסומנות כ-deprecated לטובתה; " +
          "BAPI_GOODSMVT_CREATE פועל ברקע.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIGO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): MM03",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MM03 היא תצוגה בלבד של נתון האב חומר, ומציגה נתוני חומר לפי רמה, כולל רמת ההערכה (MBEW) ו-valuation " +
          "class; אבחון מצבי ההערכה (valuation types) דרך MM03 מתועד בתקרית refurbishment-order. ב-S/4HANA הרשומה " +
          "מפנה לתצוגות ה-CDS I_Product / I_ProductPlant.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MM03",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הקטלוג הפונקציונלי של הפרויקט: BAPI_ALM_ORDER_GET_DETAIL",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BAPI_ALM_ORDER_GET_DETAIL קורא פרטי פקודת תחזוקה (כותרת, פעולות, רכיבים) בזיקה ל-IW33 ולטבלאות AUFK " +
          "ו-AFVC; זמין ב-S/4HANA; חלופה API_MAINTENANCEORDER.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_ORDER_GET_DETAIL",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): KO88",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KO88 מתוארת ברשומה כהסדרה בודדת של הזמנה פנימית (העברת העלויות שנצברו למקבלים שבכלל ההסדרה), ודוגמת העסק " +
          "ברשומה מתארת סילוק פקודת תחזוקה; לפי הרשומה, זמינה ב-S/4HANA והטרנזקציה נשמרת. עמוד התהליך הרשמי מציין " +
          "Order settlement ואינו נוקב בטרנזקציה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#KO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום האובייקטים של הפרויקט: obj:maintenance-order",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "האובייקט פקודת תחזוקה (Maintenance Order) מונה בין חבריו את table:AUFK ואת table:AFIH, לצד AFKO, AFVC, " +
          "AFRU, RESB ו-ILOA.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/objects.ts#obj:maintenance-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת Best Practice של הפרויקט: matdoc-read-through-compatibility",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ב-S/4HANA כותרת ופריטי מסמך החומר מאוחדים ב-MATDOC; MKPF ו-MSEG נשארות לקריאה דרך תצוגות התאימות " +
          "NSDM_V_MSEG ו-NSDM_V_MKPF, וכתיבה ישירה אסורה.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/pp-pi.ts#matdoc-read-through-compatibility",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 6, סעיף 6.4 'Refurbishment' (6.4.1 " +
          "Prerequisites, 6.4.2 Refurbishment Notification, 6.4.3 Material Requirements Planning, 6.4.4 " +
          "Refurbishment Order, 6.4.5 Goods Issue, 6.4.6 Goods Receipt, 6.4.7 Costing)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סעיף 6.4 של הספר מתעד את זרימת התהליך במבנה תת-סעיפים: תנאים מוקדמים, הודעת שיפוץ, תכנון צרכים (MRP), " +
          "פקודת שיפוץ, ניפוק סחורה, קבלת סחורה והתחשבנות (Costing); הספר משמש כאן להפניית קריאה ולאישור מבנה " +
          "השלבים, ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#6.4",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor + repairer), 2026-09-24",
    notes: "רשומת תהליך: שדות ה-process נשענים על העמוד הרשמי 'Order Processing: Refurbishment of Repairable Spares' " +
      "(2025 FPS01), ועל העמודים 'Processing of Refurbishment Order', 'Additional Movement Types' ו-'Enterprise " +
      "Asset Management Part 4', שכולם נקראו מחדש ב-2026-09-24 דרך scripts/sap-help-body.mjs. פריט הפישוט S4TWL " +
      "- AVAILABILITY OF TRANSACTIONS IN MM-IM מצוטט מרשימת 2023 FPS03 (מקוצר מראיית פריט הפישוט ברשומת " +
      "tx:MB11), כלומר ממהדורה שונה מעמודי 2025 FPS01. לגבי MB11/IW8W מול MIGO: בסוגי התנועה 261/101 MIGO " +
      "מתועדת כשמישה לפי שני המקורות; הזמינות של MB11 שנויה במחלוקת בין המקורות, וההשפעה המעשית מתרכזת במסלול " +
      "313/315, שבו העמוד מפנה לטרנזקציות השיפוץ; לבדיקה במערכת היעד. הקוד OMWC נזכר רק כלשונו בתקרית " +
      "refurbishment-order ואינו ב-lib/route-manifest.generated.ts, ולכן אינו xref; MATDOC אינה במילון הפרויקט " +
      "ולכן מוזכרת רק בפרוזה. kpis ו-migration הושמטו כי אין להם מקור. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ================================================== quality in procurement */
  {
    slug: "quality-in-procurement-process",
    he: "איכות ברכש: בדיקת קבלת סחורה",
    en: "Quality in procurement: goods receipt inspection",
    module: "Cross",
    summary: "איכות ברכש היא הענף של ניהול האיכות שבודק חומר בעת קבלה מספק. מפתח הבקרה ל-QM ברכש ברשומת אב החומר " +
      "קובע אם בעת יצירת הצעת מחיר או הזמנת רכש נבדקת רשומת מידע איכותי (Quality Info Record) לצירוף חומר-ספק; " +
      "הגדרת הבדיקה (Inspection Setup) בתצוגת ה-QM קובעת אם קבלת הטובין יוצרת מנת בדיקה. לפי רשומת QA11 של " +
      "הפרויקט, החלטת השימוש מפעילה רישום מלאי ממלאי הבדיקה ל-unrestricted, חסום או גריטה ומחשבת quality score; " +
      "לפי פריט ההיקף הרשמי 1FM, תוצאת הבדיקה מפעילה עיבוד המשך כמו החזרה לספק באיכות לקויה. בהערכת הספק, " +
      "קריטריון המשנה Goods Receipt מעריך את איכות החומר שהספק מספק, עם בדיקה בעת קבלת הטובין.",
    context: "לפי מודיעין הטרנזקציות של הפרויקט, QI01 יוצרת את רשומת המידע האיכותי (טבלת QINF) שנבדקת ביצירת " +
      "הזמנת רכש (ME21N) וקובעת היתר רכש, סטטוס שחרור, תוקף וחסימת GR/הזמנה; MIGO מבצעת את קבלת הטובין ותומכת " +
      "בסוג מלאי QI (מלאי בדיקה) לצד מלאי חופשי וחסום. QA32 היא רשימת העבודה של בודק האיכות למנות הבדיקה, QE51N " +
      "רשימת העבודה לרישום תוצאות, ו-QA11 רושמת את החלטת השימוש. תקרית qm-procurement-blocks-gr-or-invoice של " +
      "מרכז התקלות מתעדת חסימת GR או חשבונית כשרשומת המידע האיכותי חסרה, לא משוחררת או פג תוקפה. העמוד הרשמי " +
      "'Editing the Inspection Setup' (Quality Management, 2025 FPS01) קובע שהגדרת הבדיקה בתצוגת ה-QM של רשומת " +
      "אב החומר היא תנאי ליצירת מנת בדיקה, ושסימון מלאי הבדיקה (Stock indicator) קובע אם הכמות נרשמת למלאי " +
      "בדיקה או למלאי חופשי. עמוד פריט ההיקף הרשמי 'Quality Management in Procurement' (1FM) קובע: 'This scope " +
      "item describes quality inspection in procurement. Quality inspection may be relevant when a material is " +
      "received from a supplier.' וגם 'The result of the inspection triggers further processing, such as return " +
      "to the supplier for inadequate quality.'",
    steps: [
      {
        he: "להגדיר את מפתח הבקרה ל-QM ברכש ואת הגדרת הבדיקה (Inspection Setup) בתצוגת ה-QM של רשומת אב החומר; " +
          "בלי הגדרת בדיקה לחומר לא נוצרות מנות בדיקה לתנועות המלאי הרלוונטיות ל-QM, לפי העמוד הרשמי 'Editing " +
          "the Inspection Setup'.",
        xrefs: ["table:QMAT"],
      },
      {
        he: "כשנדרש שחרור ספק או הסכם הבטחת איכות: ליצור רשומת מידע איכותי (Quality Info Record) ב-QI01, הכוללת " +
          "סטטוס שחרור, תוקף וחסימת רכש/GR לצירוף חומר-ספק; לתחזק ב-QI02 ולצפות ב-QI03, לפי אובייקט ההגירה " +
          "הרשמי 'QM - Quality info record' ורשומת QI01.",
        xrefs: ["tx:QI01", "tx:QI02", "tx:QI03"],
      },
      {
        he: "ביצירת הזמנת רכש ב-ME21N: המערכת בודקת אם רשומת מידע איכותי נדרשת וקיימת לצירוף החומר-ספק, לפי מפתח " +
          "הבקרה; לפי רשומת QI01, בלי שחרור תקף המערכת יכולה לחסום את יצירת ההזמנה, תלוי בהגדרת מפתח הבקרה.",
        xrefs: ["tx:ME21N", "tx:QI01"],
      },
      {
        he: "בקבלת הטובין ב-MIGO: אם הוגדרה בדיקה בעת קבלת טובין לחומר, המערכת יוצרת מנת בדיקה ברישום הקבלה " +
          "(העמוד הרשמי 'Goods Receipt When Quality Management (QM) is Active'); כשסימון מלאי הבדיקה (Stock " +
          "indicator) פעיל, הכמות נרשמת למלאי בדיקה ולא למלאי חופשי ('Editing the Inspection Setup').",
        xrefs: ["tx:MIGO", "table:QMAT"],
      },
      {
        he: "לאתר את מנת הבדיקה ברשימת העבודה QA32, בסינון לפי מפעל, חומר, סטטוס או תאריך.",
        xrefs: ["tx:QA32"],
      },
      {
        he: "לרשום תוצאות לכל מאפיין מול המפרט ב-QE51N; המערכת משווה למפרט וקובעת accepted/rejected.",
        xrefs: ["tx:QE51N"],
      },
      {
        he: "לרשום החלטת שימוש ב-QA11. לפי רשומת QA11: שחרור למלאי חופשי, חסימה או גריטה, חישוב quality score " +
          "והפעלת follow-up actions; לפי פריט ההיקף 1FM: עיבוד המשך כמו החזרה לספק באיכות לקויה.",
        xrefs: ["tx:QA11"],
      },
      {
        he: "בתוצאה לקויה: לפתוח הודעת איכות מסוג Q1 (complaint against vendor) ב-QM01 ולעבד אותה (tasks, " +
          "activities, סטטוס) ב-QM02. בהערכת הספק, לפי העמוד הרשמי 'Subcriterion': קריטריון המשנה Goods Receipt " +
          "מעריך את איכות החומר שהספק מספק, עם בדיקה בעת קבלת הטובין; ציון ה-QM key quality figure שמחושב ב-QM " +
          "ומועבר להערכת הספק ב-MM שייך לקריטריון המשנה Complaints/Rejection Level, שמעריך פגמים שנמצאו אחרי " +
          "בדיקת הקבלה, למשל ברצפת הייצור.",
        xrefs: ["tx:QM01", "tx:QM02"],
      },
      {
        he: "אם GR או חשבונית חסומים בגלל סטטוס QM של הספק: לבדוק את רשומת המידע האיכותי ב-QI03 (וב-QI06, שהתקרית " +
          "נוקבת בו בלי כותרת ושאינו במילון הפרויקט), את מפתח הבקרה מול QM System של הספק ואת תוקף השחרור, " +
          "ולשחרר או להאריך ב-QI01/QI02, לפי תקרית qm-procurement-blocks-gr-or-invoice.",
        xrefs: ["tx:QI03", "tx:QI01", "tx:QI02"],
      },
    ],
    antiPatterns: [
      "מפתח בקרה שדורש שחרור ספק בלי רשומת מידע איכותי משוחררת ובתוקף לצירוף החומר-ספק: GR או חשבונית נחסמים, לפי " +
        "תקרית qm-procurement-blocks-gr-or-invoice.",
      "רשומת מידע איכותי עם תוקף שחרור שפג, בלי ניטור יזום של תאריכי התפוגה: GR או חשבונית נחסמים באמצע תהליך " +
        "הרכש, לפי אותה תקרית.",
      "חומר בלי הגדרת בדיקה (Inspection Setup) בתצוגת ה-QM: לא נוצרת מנת בדיקה, ובלי סימון מלאי הבדיקה הכמות " +
        "נרשמת למלאי חופשי, לפי העמוד הרשמי 'Editing the Inspection Setup'.",
      "מנות בדיקה פתוחות בלי מעקב ב-QA32: הכמות נשארת במלאי הבדיקה עד להחלטת שימוש.",
      "רישום החלטת שימוש בלי Selected Set, קודי UD ו-quality score procedure מוגדרים, שרשומת QA11 מונה כתנאים " +
        "מוקדמים.",
    ],
    checks: [
      "חיובי: חומר עם מפתח בקרה ל-QM ברכש ורשומת מידע איכותי משוחררת ובתוקף מאפשר יצירת הזמנת רכש וקבלת טובין.",
      "שלילי: רשומת מידע איכותי חסרה או לא משוחררת חוסמת GR או חשבונית, לפי תקרית " +
        "qm-procurement-blocks-gr-or-invoice.",
      "אינטגרציה: קבלה לחומר עם הגדרת בדיקה בעת קבלת טובין יוצרת מנת בדיקה, ועם סימון מלאי הבדיקה הכמות נרשמת " +
        "למלאי בדיקה ולא למלאי חופשי.",
      "רגרסיה: החלטת שימוש ב-QA11 מבצעת רישום מלאי ממלאי הבדיקה (unrestricted/blocked/scrap) ומחשבת quality " +
        "score, לפי רשומת QA11.",
    ],
    process: {
      purpose: "לבדוק את איכות החומר המתקבל מספק לפני שחרורו לשימוש, לקבוע את גורל הכמות במלאי בהחלטת השימוש, " +
        "ולספק להערכת הספק את נתוני האיכות שקריטריוני המשנה Goods Receipt ו-Complaints/Rejection Level מעריכים.",
      trigger: [
        {
          he: "הזמנת רכש לחומר שמפתח הבקרה ל-QM ברכש שלו דורש רשומת מידע איכותי.",
          xrefs: ["tx:ME21N", "tx:QI01"],
        },
        {
          he: "קבלת טובין (MIGO) לחומר שהוגדרה לו בדיקה בעת קבלת טובין.",
          xrefs: ["tx:MIGO"],
        },
      ],
      preconditions: [
        {
          he: "תצוגת QM בחומר עם מפתח בקרה ל-QM ברכש והגדרת בדיקה (Inspection Setup), לפי העמודים הרשמיים " +
            "'Editing the Inspection Setup' ו-'QM - Quality info record'.",
          xrefs: ["table:QMAT"],
        },
        {
          he: "כשנדרש: רשומת מידע איכותי (Quality Info Record) משוחררת ובתוקף לצירוף החומר-ספק.",
          xrefs: ["tx:QI01"],
        },
        {
          he: "Selected Set, קודי UD ו-quality score procedure מוגדרים, לפי רשומת QA11 של מודיעין הטרנזקציות.",
          xrefs: ["tx:QA11"],
        },
      ],
      masterData: [
        {
          he: "תצוגת QM, מפתח הבקרה ל-QM ברכש והגדרת הבדיקה ברשומת אב החומר.",
          xrefs: ["table:QMAT"],
        },
        {
          he: "רשומת מידע איכותי (Quality Info Record) לצירוף חומר-ספק: סטטוס שחרור, תוקף, חסימת רכש/GR.",
        },
        {
          he: "מאסטר ספק: אובייקט ההגירה 'QM - Quality info record' תלוי בהגירה קודמת של Product ו-Supplier.",
        },
      ],
      roles: [
        {
          he: "לפי רשומת QI01: מהנדס איכות ספקים (SQE), רכש ומנהל QM.",
          xrefs: ["tx:QI01"],
        },
        {
          he: "לפי רשומות QA32, QE51N ו-QA11: QA Inspector; לפי רשומות QA32 ו-QA11 גם מהנדס איכות, ולפי רשומת " +
            "QE51N גם טכנאי מעבדה ובודק איכות.",
          xrefs: ["tx:QA32", "tx:QE51N", "tx:QA11"],
        },
        {
          he: "לפי רשומת ME21N: קניין (Buyer).",
          xrefs: ["tx:ME21N"],
        },
        {
          he: "לפי רשומת QM01: מהנדס איכות ואחראי תלונות.",
          xrefs: ["tx:QM01"],
        },
      ],
      transactions: [
        {
          he: "רשומת מידע איכותי: QI01 יצירה, QI02 שינוי, QI03 תצוגה. Fiori: Manage Quality Info Records in " +
            "Procurement לפי רשומת QI01; Manage Quality Info Records (F2256A) לפי עמוד ה-Data Migration הרשמי. " +
            "אין מזהה Fiori מאומת בקטלוג הפרויקט, ולכן אין קישור.",
          xrefs: ["tx:QI01", "tx:QI02", "tx:QI03"],
        },
        {
          he: "הזמנת רכש: ME21N; קבלת טובין: MIGO.",
          xrefs: ["tx:ME21N", "tx:MIGO"],
        },
        {
          he: "מנת בדיקה: QA32 רשימת עבודה (Fiori לפי הרשומה: Manage Inspection Lots); תוצאות: QE51N (Record " +
            "Inspection Results); החלטת שימוש: QA11 (Record Usage Decision). שמות ה-Fiori לפי רשומות מודיעין " +
            "הטרנזקציות, בלי מזהה מאומת בקטלוג הפרויקט.",
          xrefs: ["tx:QA32", "tx:QE51N", "tx:QA11"],
        },
        {
          he: "הודעת איכות סוג Q1 (complaint against vendor): QM01 יצירה, QM02 עיבוד; Fiori לפי הרשומות: Manage " +
            "Quality Notifications.",
          xrefs: ["tx:QM01", "tx:QM02"],
        },
      ],
      tables: [
        {
          he: "QMAT: הגדרת הבדיקה לחומר, לפי רשומת QA32 ורשומת האימות של table:QMAT ('Editing the Inspection " +
            "Setup').",
          xrefs: ["table:QMAT"],
        },
        {
          he: "QINF (רשומת המידע האיכותי, לפי רשומת QI01) ו-QALS, QAVE, QAMR (מנת בדיקה, החלטת שימוש ותוצאות " +
            "מאפיינים, לפי רשומת QA32); QINF, QALS, QAVE ו-QAMR אינן במילון הפרויקט (dangling-xref) ולכן " +
            "מוזכרות בפרוזה בלבד.",
        },
        {
          he: "QMEL, כותרת הודעת האיכות, לפי רשומות QM01 ו-QM02.",
          xrefs: ["table:QMEL"],
        },
        {
          he: "EKKO/EKPO להזמנת הרכש, לפי רשומת ME21N; אינן במילון הפרויקט ולכן מוזכרות בפרוזה בלבד.",
        },
        {
          he: "מסמך החומר שקבלת הטובין יוצרת.",
          xrefs: ["obj:material-document"],
        },
      ],
      integrationPoints: [
        {
          he: "רכש אל QM: מפתח הבקרה ל-QM ברכש ברשומת אב החומר קובע אם נבדקת רשומת מידע איכותי בהצעת מחיר או " +
            "בהזמנת רכש ('QM - Quality info record'); הגדרת בדיקה בעת קבלת טובין קובעת אם הקבלה יוצרת מנת בדיקה " +
            "('Goods Receipt When Quality Management (QM) is Active').",
          xrefs: ["tx:ME21N", "tx:MIGO", "table:QMAT"],
        },
        {
          he: "QM אל מלאי: לפי רשומת QA11, החלטת השימוש מפעילה stock postings ממלאי הבדיקה ל-unrestricted, " +
            "blocked או scrap.",
          xrefs: ["tx:QA11"],
        },
        {
          he: "QM אל הערכת ספק, לפי העמוד הרשמי 'Subcriterion': קריטריון המשנה Goods Receipt מעריך את איכות החומר " +
            "שהספק מספק, עם בדיקה בעת קבלת הטובין; ה-QM key quality figure שמחושב ב-QM ומועבר להערכת הספק ב-MM " +
            "שייך לקריטריון המשנה Complaints/Rejection Level, שמעריך פגמים שנמצאו אחרי בדיקת הקבלה, למשל ברצפת " +
            "הייצור.",
        },
      ],
      interfaces: [
        {
          he: "לפי רשומות QA32 ו-QA11: BAPI_INSPLOT_GETLIST ו-BAPI_INSPLOT_SETUSAGEDECISION; לפי רשומת QE51N: " +
            "BAPI_INSPOPER_RECORDRESULTS; לפי רשומת QM02: BAPI_QUALNOT_CHANGEDESCR; לפי רשומת ME21N: " +
            "BAPI_PO_CREATE1. אינם במילון הפרויקט (fm:) ולכן אינם מקושרים.",
        },
        {
          he: "לפי רשומת MIGO: BAPI_GOODSMVT_CREATE לרישום תנועות המלאי ברקע.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE"],
        },
      ],
      outputs: [
        {
          he: "רשומת מידע איכותי עם סטטוס שחרור ותוקף.",
          xrefs: ["tx:QI01"],
        },
        {
          he: "מנת בדיקה (QALS, לא במילון הפרויקט) עם תוצאות והערכה לכל מאפיין.",
          xrefs: ["tx:QA32", "tx:QE51N"],
        },
        {
          he: "החלטת שימוש, רישום מלאי ממלאי הבדיקה ו-quality score; מסמך החומר של קבלת הטובין.",
          xrefs: ["tx:QA11", "obj:material-document"],
        },
        {
          he: "הודעת איכות סוג Q1 (complaint against vendor) בתוצאה לקויה.",
          xrefs: ["tx:QM01", "table:QMEL"],
        },
      ],
      exceptions: [
        {
          he: "GR או חשבונית חסומים כי רשומת המידע האיכותי חסרה, לא משוחררת או פג תוקפה (תקרית " +
            "qm-procurement-blocks-gr-or-invoice); תיקון לפי התקרית: יצירה או שחרור ב-QI01/QI02, התאמת מפתח " +
            "הבקרה ל-QM System של הספק, הארכת תוקף השחרור.",
          xrefs: ["tx:QI01", "tx:QI02", "tx:QI03"],
        },
        {
          he: "מנת בדיקה לא נוצרה בקבלה: לא נערכה הגדרת בדיקה לחומר בתצוגת ה-QM, לפי העמוד הרשמי 'Editing the " +
            "Inspection Setup'.",
          xrefs: ["table:QMAT"],
        },
        {
          he: "כמות שנשארת במלאי בדיקה: לא נרשמה החלטת שימוש למנת הבדיקה.",
          xrefs: ["tx:QA32", "tx:QA11"],
        },
      ],
      controls: [
        {
          he: "ניטור תוקף רשומות המידע האיכותי, כי תוקף שפג חוסם GR או חשבונית לפי תקרית " +
            "qm-procurement-blocks-gr-or-invoice.",
          xrefs: ["tx:QI03"],
        },
        {
          he: "התאמת מפתח הבקרה ל-QM System בפועל של הספק, לפי אותה תקרית.",
          xrefs: ["tx:QI01"],
        },
        {
          he: "מעקב שוטף אחרי מנות בדיקה פתוחות ברשימת העבודה QA32, עד להחלטת שימוש.",
          xrefs: ["tx:QA32"],
        },
      ],
      eccToS4: [
        {
          he: "לפי רשומות TX_INTEL של QI01, MIGO, QA32 ו-QA11: הטרנזקציות זמינות ב-S/4HANA (QI01: ה-tcode הקלאסי " +
            "נשמר; QA11: הלוגיקה והטבלאות נשמרות).",
          xrefs: ["tx:QI01", "tx:MIGO", "tx:QA32", "tx:QA11"],
        },
        {
          he: "בתיעוד ה-Data Migration של S/4HANA 2025 FPS01 מופיעה האפליקציה Manage Quality Info Records " +
            "(F2256A) לאימות הנתונים; אין מזהה מאומת בקטלוג ה-Fiori של הפרויקט ולכן אין קישור.",
        },
        {
          he: "ב-S/4HANA מסמכי החומר נשמרים ב-MATDOC, לפי רשומת matdoc-read-through-compatibility.",
          xrefs: ["bp:matdoc-read-through-compatibility"],
        },
      ],
      migration: [
        {
          he: "אובייקט העסק 'QM - Quality info record' (Object Alias QM_QINF_2) בתיעוד ה-Data Migration הרשמי " +
            "ל-2025 FPS01, עם תבנית S_QINF לנתוני הכותרת ו-S_QINF_LTEXT לתיאור המורחב; תלוי בהגירה קודמת של " +
            "Product ו-Supplier; אפליקציות לאימות: Manage Quality Info Records (F2256A), QI02, QI03.",
          xrefs: ["tx:QI02", "tx:QI03"],
        },
      ],
      reference: {
        title: "Quality Management in Procurement",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4c6c3c99e6e94a92a626f424add61cba/51daf79fe0384e6385d141616fc3585c.html?locale=en-US&state=PRODUCTION&version=100",
        verificationLevel: "sap_official_verified",
        note: "העמוד הוא רשומת What's New ב-SAP S/4HANA ולא עמוד תהליך מלא. הוא מדפיס 'Technical Name of Scope " +
          "Item 1FM', 'Availability SAP S/4HANA 1709' ורכיב יישום QM, ומתאר: 'This scope item describes quality " +
          "inspection in procurement. Quality inspection may be relevant when a material is received from a " +
          "supplier. The result of the inspection triggers further processing, such as return to the supplier " +
          "for inadequate quality.'",
      },
    },
    xrefs: [
      "tx:QI01", "tx:QI02", "tx:QI03", "tx:QA32", "tx:QA11", "tx:QE51N", "tx:QM01", "tx:QM02", "tx:ME21N", "tx:MIGO",
      "table:QMAT", "table:QMEL", "obj:material-document", "fm:BAPI_GOODSMVT_CREATE",
      "bp:matdoc-read-through-compatibility",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת QI01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QI01 יוצרת רשומת מידע איכותי (טבלת QINF) לצירוף חומר-ספק, שולטת בהיתר הזמנת רכש, סטטוס שחרור " +
          "(release until), חסימה ל-GR/הזמנה ומספר תעודת ספק, ונבדקת בעת יצירת PO ב-ME21N; בלי שחרור תקף המערכת " +
          "יכולה לחסום יצירת PO, תלוי בהגדרת מפתח הבקרה ('QM proc. active' ו-'release required'). משתמשים: " +
          "מהנדס איכות ספקים (SQE), רכש, מנהל QM. ב-S/4HANA: זמינה, ה-tcode הקלאסי נשמר, וקיימת אפליקציית Fiori " +
          "'Manage Quality Info Records in Procurement'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QI01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת QA32",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QA32 היא רשימת העבודה למנות בדיקה, עם סינון לפי plant/material/status/date ומעבר לרישום תוצאות " +
          "(QE51N) ולהחלטת שימוש (QA11); טבלאות QALS, QAVE, QAMR; BAPI_INSPLOT_GETLIST " +
          "ו-BAPI_INSPLOT_SETUSAGEDECISION; משתמשים: QA Inspector, מהנדס איכות; ב-S/4HANA זמינה, עם אפליקציית " +
          "Fiori 'Manage Inspection Lots'. לפי techExample של הרשומה, יצירת מנה נגזרת מהגדרות QMAT לחומר/מפעל; " +
          "לפי prodTips: מנות בדיקה פתוחות חוסמות מלאי ויש לנטר את הרשימה יומית, ובלי רישום החלטת שימוש המלאי " +
          "נשאר ב-QI.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QA32",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת QA11",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QA11 רושמת את החלטת השימוש: קוד UD, stock postings ממלאי האיכות ל-unrestricted/חסום/גריטה, חישוב " +
          "quality score והפעלת follow-up actions; תנאים מוקדמים: selected set ו-UD codes מוגדרים ו-quality " +
          "score procedure; BAPI_INSPLOT_SETUSAGEDECISION; ב-S/4HANA זמינה, הלוגיקה והטבלאות נשמרות, עם " +
          "אפליקציית Fiori 'Record Usage Decision'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QA11",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת QE51N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QE51N היא רשימת העבודה לרישום תוצאות לכל מאפיין; המערכת משווה למפרט וקובעת accepted/rejected; " +
          "BAPI_INSPOPER_RECORDRESULTS; ב-S/4HANA זמינה, עם אפליקציית Fiori 'Record Inspection Results'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QE51N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת QM01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QM01 יוצרת הודעת איכות מסוג Q1 (complaint against vendor), Q2 (customer complaint) או Q3 " +
          "(internal problem); טבלת הכותרת QMEL; התהליך: QM01 פתיחת הודעה, tasks/activities, QM02 עדכון, סגירה; " +
          "משתמשים: מהנדס איכות, אחראי תלונות; ב-S/4HANA זמינה, עם אפליקציית Fiori 'Manage Quality " +
          "Notifications'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QM01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת QM02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "QM02 מעבדת הודעת איכות קיימת: items, tasks, activities, שינוי סטטוס וסגירה; טבלה QMEL; " +
          "BAPI_QUALNOT_CHANGEDESCR; ב-S/4HANA זמינה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#QM02",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת ME21N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME21N יוצרת הזמנת רכש ושומרת בטבלאות EKKO/EKPO, עם BAPI_PO_CREATE1 לרקע; התהליך: PR, הזמנת רכש " +
          "(ME21N), אישור, קבלת טובין (MIGO), קבלת חשבונית (MIRO), תשלום; משתמשים: קניין (Buyer); זמינה במלואה " +
          "ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME21N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומת MIGO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MIGO רושמת תנועות מלאי כולל קבלה מ-PO, תומכת ב-stock type unrestricted/QI/blocked, ומשתמשת " +
          "ב-BAPI_GOODSMVT_CREATE לרקע; זמינה במלואה ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIGO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-procurement-blocks-gr-or-invoice",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "GR או חשבונית להזמנת רכש חסומים כי בקרת QM ברכש מדווחת שהספק/חומר לא משוחרר לפעולה: רשומת מידע " +
          "איכותי חסרה או לא משוחררת, QM System של הספק נמוך מהנדרש במפתח הבקרה, תקופת השחרור פגה, או Block " +
          "function במפתח הבקרה בלי תנאי מוקדם. ניתוח: QI03, QI06, ME23N, טבלה QINF; תיקון: יצירה/שחרור רשומת " +
          "מידע איכותי (QI01/QI02) לתקופה תקפה, התאמת מפתח הבקרה ל-QM System של הספק, הארכת release-until.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#qm-procurement-blocks-gr-or-invoice",
      },
      {
        sourceType: "repository",
        sourceTitle: "שיטת עבודה בפרויקט: matdoc-read-through-compatibility",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ב-S/4HANA כותרת ופריטי מסמך החומר מאוחדים בטבלה אחת, MATDOC; MKPF ו-MSEG נשארות לקריאה בלבד דרך " +
          "תצוגות תאימות.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/pp-pi.ts#matdoc-read-through-compatibility",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Editing the Inspection Setup | Quality Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2bc3ee8d1c83404e8cf62418640004f2/fa55b853dcfcb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_15,
        claim: "העמוד הרשמי לגרסת 2025 FPS01 קובע 'Editing the Inspection Setup Use You must edit the inspection " +
          "setup to be able to create inspection lots for a material. Inspection lots are created for all goods " +
          "movements that are relevant to QM' ו-'In the material master, you define which goods movements are " +
          "relevant to QM'. שאילתות נוספות על אותה רשומה בדיוק (אותו loio ואותו versionId) החזירו מאותו עמוד גם " +
          "'Procedure In the Quality Management view of the material master, choose Inspection Setup', 'To " +
          "check the consistency of your data, choose Check again. If the entries are consistent, choose " +
          "Continue. The Quality Management view of the material master is displayed again', 'Stock indicator " +
          "When a goods movement takes place, the quantity of the material to be posted is posted to inspection " +
          "stock' ו-'If you do not set this indicator, the material quantity is posted to unrestricted-use " +
          "stock'. כלומר הגדרת הבדיקה לחומר היא תנאי ליצירת מנת בדיקה, היא נערכת בתצוגת ניהול האיכות של רשומת " +
          "אב החומר, והיא מתועדת ככזו בגרסת 2025 FPS01 של S/4HANA On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Quality Management in Procurement | What's New in SAP S/4HANA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "100",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4c6c3c99e6e94a92a626f424add61cba/51daf79fe0384e6385d141616fc3585c.html?locale=en-US&state=PRODUCTION&version=100",
        accessedAt: DATE,
        claim: "עמוד ה-What's New הרשמי 'Quality Management in Procurement' קובע: 'This scope item describes " +
          "quality inspection in procurement. Quality inspection may be relevant when a material is received " +
          "from a supplier. The result of the inspection triggers further processing, such as return to the " +
          "supplier for inadequate quality.' ומדפיס Technical Name of Scope Item: 1FM; Availability: SAP " +
          "S/4HANA 1709; Application Component: QM.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt When Quality Management (QM) is Active | Inventory Management and Inventory " +
          "(MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/d363bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "העמוד הרשמי לגרסת 2025 FPS01 מבחין בין 'Quality Management in Material Procurement' (אם פעיל, " +
          "ניתן להגדיר ברשומת אב החומר שנדרש אישור קבלת תעודה, והמערכת מציגה תיבת אישור בקבלת טובין להזמנה) " +
          "לבין 'Quality Management in Material Inspection' ('If an inspection at the time of goods receipt has " +
          "been defined for the material, the system automatically creates an inspection lot when the goods " +
          "receipt is posted').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Subcriterion | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/ce77b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "העמוד הרשמי לגרסת 2025 FPS01 מתעד את קריטריוני המשנה האוטומטיים של הערכת הספק (Vendor " +
          "Evaluation). Goods Receipt: 'This subcriterion is used to evaluate the quality of the material that " +
          "the vendor delivers. Quality inspection takes place at the time of goods receipt.' " +
          "Complaints/Rejection Level: 'This subcriterion is used to evaluate whether the materials delivered " +
          "by the vendor are regularly found to be faulty subsequent to incoming inspection (for example, on " +
          "the shop-floor) ... The score (QM key quality figure) is calculated in QM Quality Management and the " +
          "data passed on to MM Vendor Evaluation.' כלומר ה-QM key quality figure שייך לקריטריון " +
          "Complaints/Rejection Level, לא לקריטריון Goods Receipt.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "QM - Quality info record | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/8427c17adbeb4a84a1a0784aa63c586c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "אובייקט ההגירה הרשמי לגרסת 2025 FPS01 (Object Alias QM_QINF_2) קובע: 'If a supplier release or a " +
          "quality assurance agreement is required for a material, you must create a quality information " +
          "record... When a quotation or purchase order is created, the system checks whether a quality info " +
          "record is required and available for the combination of material and supplier... The execution of " +
          "this check depends on the setting of the QM in procurement control key in the material master " +
          "record.' תבניות ההגירה: Header Data (S_QINF), Detailed Description (S_QINF_LTEXT); אפליקציות לאימות: " +
          "Manage Quality Info Records (F2256A), QI02, QI03. תנאים מוקדמים לפי העמוד: 'Product, mandatory' " +
          "ו-'Supplier, mandatory' חייבים להיות מתוחזקים או מוגרים קודם.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 5 בספריית הפרויקט (SAP PRESS, Quality Management with SAP S/4HANA), פרק 4 'Integrating " +
          "with Materials Management', סעיפים 4.1.2 'Control Key for Quality Management in Procurement' ו-4.2.1 " +
          "'Goods Receipt in Procurement: Inspection Type 01'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הפרק מתעד את מפתח הבקרה ל-QM ברכש ואת תהליך העסק של קבלת טובין ברכש; הספר משמש כאן להפניית קריאה " +
          "בלבד (קישור צולב לקורא) ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book5.json#4.1.2",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor + repairer), 2026-09-24",
    notes: "רשומת המידע האיכותי (Quality Info Record) והטבלאות QINF, QALS, QAVE, QAMR, EKKO ו-EKPO אינן במילון " +
      "הפרויקט (dangling-xref) ולכן מוזכרות בפרוזה בלבד. QI06 מוזכר בתקרית qm-procurement-blocks-gr-or-invoice " +
      "בלי כותרת מתועדת ואינו במילון הטרנזקציות (dangling-xref), ולכן מוזכר בפרוזה בלבד. BAPI_INSPLOT_GETLIST, " +
      "BAPI_INSPLOT_SETUSAGEDECISION, BAPI_INSPOPER_RECORDRESULTS, BAPI_QUALNOT_CHANGEDESCR ו-BAPI_PO_CREATE1 " +
      "אינם במילון ה-fm: של הפרויקט ולכן אינם מקושרים. אפליקציות ה-Fiori (כולל F2256A) אינן בקטלוג ה-Fiori של " +
      "הפרויקט ולכן מוזכרות בשמן בלבד. עמוד ה-reference הוא רשומת What's New של SAP S/4HANA 1709 שמדפיסה את " +
      "פריט ההיקף 1FM, ולא עמוד תהליך מלא. החזרה לספק מתועדת בעמוד 1FM; רשומת QA11 מתעדת unrestricted, חסום " +
      "וגריטה. שדה ה-kpis הושמט: לא אותר במאגר או בחיפושים הרשמיים מדד מוגדר לתהליך זה. לא בוצעה בדיקה במערכת " +
      "SAP חיה.",
  },
  /* =========================================================== order to cash */
  {
    slug: "order-to-cash-process",
    he: "הזמנה עד גבייה (Order-to-Cash): מהצעת מחיר והזמנת לקוח, דרך אספקה, ליקוט וחיוב, ועד קליטת התשלום",
    en: "Order-to-cash: from inquiry, quotation and sales order through delivery, goods issue and billing to " +
      "incoming payment",
    module: "Cross",
    summary: "תהליך המכירה מקצה לקצה: בקשת הצעת מחיר והצעת מחיר, הזמנת לקוח עם תמחור, בדיקת זמינות ובדיקת אשראי, " +
      "אספקה יוצאת, ליקוט ויציאת סחורה (PGI), מסמך חיוב שנרשם ל-FI, ופריט פתוח של הלקוח שנסגר בקליטת התשלום. " +
      "התהליך חוצה SD, ‏LE, ‏MM ו-FI, וצד הביקוש לייצור מפורט ברשומה נפרדת.",
    context: "לפי מפת התהליך O2C של המאגר, השלבים הם הזמנת לקוח (VA01 עד VA03, טבלאות VBAK ו-VBAP), בדיקת זמינות " +
      "(CO09), אספקה, ליקוט ו-PGI (VL01N, ‏VL02N, טבלאות LIKP ו-LIPS), חיוב (VF01, ‏VF04, טבלאות VBRK ו-VBRP) " +
      "וגבייה (FBL5N, ‏F-28). לפי עמוד התיעוד 'Sales Order Management and Processing' של S/4HANA 2025 FPS01, " +
      "שרשרת המכירה משתרעת מהצעת מחיר עד משלוח ומחיוב עד רישום ההכנסה, והזמנת המכירה מפעילה תהליכי המשך כמו " +
      "עיבוד אספקה. בצד S/4HANA משתנים בעיקר נתוני האב (Business Partner במקום XD01), ניהול האשראי (SAP Credit " +
      "Management), מודל הנתונים של SD (ביטול VBUK ו-VBUP) ושל התמחור (PRCD_ELEMENTS במקום KONV), ניהול הפלט של " +
      "החיוב, ופריטי הלקוח הפתוחים שנקראים דרך תצוגות תאימות; כל שינוי מיוחס להלן לפריט רשימת הפישוט שלו בשמו.",
    steps: [
      {
        he: "שלב טרום מכירה (לפי הצורך): בקשת הצעת מחיר ב-VA11 והצעת מחיר ב-VA21 עם תוקף ותמחור מלא. לפי רשומות " +
          "המאגר את הזמנת המכירה יוצרים עם reference להצעה כדי לשמור רצף ולמדוד hit rate (VA25).",
        xrefs: ["tx:VA11", "tx:VA21", "tx:VA25", "table:VBAK", "table:VBAP"],
      },
      {
        he: "לקלוט את הזמנת הלקוח ב-VA01 (שינוי VA02, תצוגה VA03): לפי רשומת VA01 היא מפעילה תמחור, בדיקת זמינות " +
          "(ATP) וקביעת מסלול, ויש לבדוק את ה-incompletion log לפני שמירה. ב-S/4HANA ספריית ה-Fiori רושמת את " +
          "Manage Sales Orders - Version 2 (F3893) עם VA01 כטרנזקציה המובילה.",
        xrefs: ["tx:VA01", "tx:VA02", "tx:VA03", "table:VBAK", "table:VBAP"],
      },
      {
        he: "בדיקת זמינות: לנתח ב-CO09 מדוע פריט קיבל או לא קיבל אישור (checking group, ‏checking rule, ‏scope of " +
          "check). צד הביקוש, אסטרטגיות התכנון, aATP והמסירה ל-MRP מפורטים ברשומה bp:sales-demand-to-production " +
          "ואינם חוזרים כאן.",
        xrefs: ["tx:CO09", "bp:sales-demand-to-production"],
      },
      {
        he: "בדיקת אשראי ושחרור חסימה: ב-ECC‏ (FI-AR-CR) נתוני האשראי ב-FD32 ושחרור מסמכים חסומים ב-VKM1 עד VKM4; " +
          "ב-S/4HANA לפי 'S4TWL - Credit Management' הפונקציה המקבילה היא SAP Credit Management (FIN-FSCM-CR) " +
          "עם נתוני אשראי ב-UKM_BP, ולפי עמוד 'Credit Block Release and Recheck' השחרור המומלץ הוא דרך " +
          "Documented Credit Decisions, ו-VKM1 ו-VKM4 זמינות כמעקף.",
        xrefs: ["tx:FD32", "tx:VKM1", "tx:VKM3", "tx:VKM4", "tx:UKM_BP"],
      },
      {
        he: "ליצור אספקה יוצאת: בודדת ב-VL01N עם reference להזמנה, או בעיבוד מרוכז מרשימת ההזמנות הבשלות לאספקה " +
          "ב-VL10A. לפי רשומת VL01N נקבעים בשלב זה shipping point ומיקום ליקוט; ב-S/4HANA יישום ה-Fiori Create " +
          "Outbound Deliveries - From Sales Orders (F0869A) מוביל ב-VL10A לפי ספריית ה-Fiori.",
        xrefs: ["tx:VL01N", "tx:VL10A", "table:LIKP", "table:LIPS"],
      },
      {
        he: "ליקוט ואריזה: כמות ליקוט ב-VL02N או דרך WM (LT03), ניטור המסירות ב-VL06O. לפי רשומת VL02N יש לוודא " +
          "שהליקוט הושלם ושהאצווה או המספר הסידורי נקבעו לפני PGI.",
        xrefs: ["tx:VL02N", "tx:LT03", "tx:VL06O", "table:LIPS"],
      },
      {
        he: "לרשום יציאת סחורה (PGI) ב-VL02N: לפי רשומת VL01N זו תנועה 601 שמפחיתה מלאי ויוצרת מסמך FI/CO, ולפי " +
          "עמוד 'Goods Issue' הרשמי הרישום מפחית את המלאי ואת הדרישות, רושם שינוי ערך בחשבון המאזן ומתעד את " +
          "עצמו ב-document flow. ביטול PGI ב-VL09 (תנועה 602), ולפי רשומתה יש לבטל קודם חשבונית קיימת ב-VF11.",
        xrefs: ["tx:VL02N", "tx:VL09", "tx:VF11", "obj:material-document", "bp:goods-movement-process"],
      },
      {
        he: "לחייב: חשבונית בודדת ב-VF01 או עיבוד מרוכז של רשימת מועדי החיוב ב-VF04 (לפי רשומתה מבוסס על " +
          "ה-billing index VKDFS, ונפוץ כ-batch job). לפי רשומת VF01 נוצר מסמך חשבונאי ומתעדכן AR; ב-S/4HANA " +
          "יישום Create Billing Documents (F0798) יוצר מסמכי חיוב מרשימת המועדים לפי עמוד התיעוד שלו.",
        xrefs: ["tx:VF01", "tx:VF04", "table:VBRK", "table:VBRP", "table:BKPF"],
      },
      {
        he: "לטפל בחשבונית שלא הועברה לחשבונאות: לפי רשומת VF02 משחררים אותה לחשבונאות ב-VF02 אחרי תיקון " +
          "ה-account determination (VKOA); תיקון מחיר או כמות נעשה בביטול ב-VF11 ובחיוב מחדש.",
        xrefs: ["tx:VF02", "tx:VF11", "table:VBRK"],
      },
      {
        he: "לגבות: לנתח את פריטי הלקוח ב-FBL5N ולרשום תקבול עם סליקת פריטים פתוחים ב-F-28 (לפי רשומתה BSID אל " +
          "BSAD עם clearing document); ריצה אוטומטית ב-F110. ב-S/4HANA ספריית ה-Fiori רושמת את Post Incoming " +
          "Payments (F1345) עם F-28 כטרנזקציה קשורה ואת Manage Customer Line Items (F0711) עם FBL5N כטרנזקציה " +
          "קשורה.",
        xrefs: ["tx:FBL5N", "tx:F-28", "tx:F110", "table:BSEG", "table:BKPF"],
      },
      {
        he: "לנטר את התהליך: VA05 להזמנות פתוחות, VA03 ל-document flow מההזמנה ועד החשבונית והתשלום; ב-S/4HANA " +
          "היישום Order-to-Cash Performance (F2005) מציג מדדי זמן ואירועים לאורך התהליך.",
        xrefs: ["tx:VA05", "tx:VA03"],
      },
    ],
    antiPatterns: [
      "שמירת הזמנה בלי לבדוק את ה-incompletion log: ההזמנה נתקעת בהמשך באספקה או בחיוב (רשומת VA01).",
      "הזנת תאריך אספקה לא ריאלי בלי בדיקת ATP (רשומת VA01).",
      "ב-ECC: שחרור חסימת אשראי בעדכון ידני במקום VKM1/VKM3 כשקיים workflow (רשומת VA02); ב-S/4HANA הדרך המומלצת " +
        "היא Documented Credit Decisions לפי העמוד הרשמי.",
      "PGI לפני סיום ליקוט, או בלי אצווה ומספר סידורי נדרשים (רשומות VL01N ו-VL02N).",
      "ניסיון לבטל PGI ב-VL09 כשקיימת חשבונית, או לבטל חשבונית שכבר נסלקה ב-FI (רשומות VL09 ו-VF11).",
      "ניסיון לחייב לפני PGI והתעלמות מ-billing block ומ-account determination (רשומת VF01).",
      "סליקת תקבול בלי טיפול בהפרש (partial או residual) ובלי reason code (רשומת F-28).",
      "בפרויקט המרה: שדות append ב-VBUK/VBUP שלא הועברו ל-include הסטטוס של VBAK/LIKP/VBRK, ולכן אינם מומרים (לפי " +
        "'S4TWL - SD Simplified Data Models').",
    ],
    checks: [
      "חיובי: הזמנה עם reference להצעת מחיר נשמרת עם תמחור ואישור זמינות, ו-VA03 מציג את ההצעה ב-document flow.",
      "שלילי: לקוח שחורג ממסגרת האשראי מקבל חסימה, והמסמך אינו ממשיך לאספקה עד שחרור (VKM1 ב-ECC; Documented " +
        "Credit Decisions או VKM1/VKM4 ב-S/4HANA).",
      "אינטגרציה: PGI ב-VL02N מפחית מלאי ויוצר מסמך חומר ומסמך חשבונאי; ההזמנה מתעדכנת בסטטוס האספקה.",
      "אינטגרציה: VF01 או VF04 יוצרים מסמך חיוב ומסמך FI, והפריט הפתוח מופיע ב-FBL5N.",
      "גבייה: F-28 סולקת את החשבונית, והפריט עובר ממצב פתוח למסולק עם clearing document.",
      "ביטול: VF11 ואחריו VL09 מחזירים את המלאי ואת הרישום החשבונאי בסדר הנכון.",
      "לאחר המרה ל-S/4HANA: הלקוח קיים כ-Business Partner עם תפקיד לקוח, VBUK/VBUP אינן נקראות בקוד מותאם, והפלט " +
        "של החיוב נקבע לפי הגדרת Manage Application Object Type Activation.",
    ],
    process: {
      purpose: "להפוך ביקוש של לקוח להכנסה ולמזומן בזרימה אחת מתועדת: הזמנה מתומחרת ומאושרת לזמינות ולאשראי, " +
        "אספקה ויציאת סחורה שמפחיתה מלאי, חשבונית שנרשמת ל-FI ויוצרת פריט פתוח, וקליטת תשלום שסוגרת אותו, כך " +
        "שכל שלב נגזר מקודמו ב-document flow.",
      trigger: [
        {
          he: "בקשת לקוח: בקשת הצעת מחיר או הצעת מחיר; לפי העמוד הרשמי, הזמנת רכש של הלקוח בתגובה להצעה מפעילה " +
            "הזמנת מכירה.",
          xrefs: ["tx:VA11", "tx:VA21"],
        },
        {
          he: "הזמנה נכנסת: ידנית ב-VA01, או אלקטרונית; מפת התהליך של המאגר נוקבת בממשקי IDoc מסוג ORDERS " +
            "וב-API_SALES_ORDER.",
          xrefs: ["tx:VA01"],
        },
        {
          he: "פריטי הזמנה שבשלו לאספקה (VL10A) ופריטים ברשימת מועדי החיוב (VF04) מפעילים את השלבים הבאים.",
          xrefs: ["tx:VL10A", "tx:VF04"],
        },
      ],
      preconditions: [
        {
          he: "ב-ECC: לקוח שהוקם ב-XD01 (נתונים כלליים, קוד חברה עם חשבון תיאום, ואזור מכירות), לפי רשומת XD01. " +
            "ב-S/4HANA: Business Partner עם תפקידי לקוח, כי לפי 'S4TWL - Business Partner Approach' XD01 ו-VD01 " +
            "מופנות ל-BP.",
          xrefs: ["tx:XD01", "tx:VD01", "tx:BP", "table:KNA1", "table:BUT000"],
        },
        {
          he: "החומר מוגדר לארגון המכירות ולערוץ ההפצה; בלעדיו VA01 מחזירה 'Material is not defined for sales org " +
            "/ distribution channel' (רשומת VA01).",
        },
        {
          he: "רשומות תנאי תמחור תקפות; תנאי חסר מוביל למחיר 0 או לשגיאה (תקרית pricing-condition-missing, ‏VK11).",
          xrefs: ["tx:VK11"],
        },
        {
          he: "כשניהול אשראי פעיל: לפי עמוד 'Credit Check Process', ה-Customizing לבקרת אשראי אוטומטית מוגדר גם " +
            "ב-SD וגם ב-SAP Credit Management.",
          xrefs: ["tx:UKM_BP"],
        },
        {
          he: "קביעת shipping point ומסלול לאספקה (רשומת VL01N), ו-account determination לחיוב (VKOA, לפי רשומת " +
            "VF01).",
        },
        {
          he: "תקופת רישום פתוחה ב-FI לחיוב ולתקבול (שגיאות 'posting period closed' ו-'Posting period not open' " +
            "ברשומות VF02 ו-F-28).",
        },
      ],
      masterData: [
        {
          he: "לקוח: KNA1 כללי, ‏KNB1 קוד חברה, ‏KNVV אזור מכירות, ‏KNVP שותפים (רשומת XD01); ב-S/4HANA גם BUT000 " +
            "של ה-Business Partner, ו-CVI מסנכרן אל KNA1/KNB1 לפי רשומת KNA1 בנושאי המעבר. KNB1, ‏KNVV ו-KNVP " +
            "אינן במילון הפרויקט.",
          xrefs: ["table:KNA1", "table:BUT000"],
        },
        {
          he: "חומר: נתוני מכירה ו-checking group ל-ATP (לפי רשומת CO09 בנתוני החומר במפעל).",
          xrefs: ["table:MARC"],
        },
        {
          he: "רשומות תנאי תמחור (KONP לפי תקרית pricing-condition-missing).",
          xrefs: ["tx:VK11"],
        },
        {
          he: "נתוני אשראי: ב-ECC‏ KNKK ו-KNKA (FD31/FD32); ב-S/4HANA‏ UKMBP_CMS_SGM ו-UKMBP_CMS דרך BP או " +
            "UKM_BP, לפי 'S4TWL - Credit Management'. הטבלאות אינן במילון הפרויקט.",
          xrefs: ["tx:FD32", "tx:UKM_BP"],
        },
        {
          he: "תנאי תשלום בלקוח, שקובעים הנחת מזומן בסליקה (רשומת F-28).",
        },
      ],
      roles: [
        {
          he: "נציג שירות לקוחות, פקיד מכירות ו-Order Management (רשומות VA01 ו-VA21); ב-Fiori: " +
            "SAP_BR_INTERNAL_SALES_REP ביישום F3893.",
          xrefs: ["tx:VA01", "tx:VA21"],
        },
        {
          he: "אנליסט אשראי (credit analyst), שבוחן ומשחרר או דוחה מסמכים חסומים לפי עמוד 'Credit Block Release " +
            "and Recheck'.",
          xrefs: ["tx:VKM1", "tx:UKM_BP"],
        },
        {
          he: "פקיד מחסן ו-Shipping clerk (רשומות VL01N ו-VL02N); ב-Fiori: SAP_BR_SHIPPING_SPECIALIST ביישומים " +
            "F0869A ו-F0867A.",
          xrefs: ["tx:VL01N", "tx:VL02N"],
        },
        {
          he: "פקיד חיוב (רשומות VF01 ו-VF04); ב-Fiori: SAP_BR_BILLING_CLERK ביישום F0798.",
          xrefs: ["tx:VF01", "tx:VF04"],
        },
        {
          he: "פקיד AR וצוות גבייה (רשומות F-28 ו-FBL5N); ב-Fiori: SAP_BR_AR_ACCOUNTANT ביישומים F1345 ו-F0711.",
          xrefs: ["tx:F-28", "tx:FBL5N"],
        },
        {
          he: "מנהל תהליך Order-to-Cash: SAP_BR_SALES_PROCESS_MANAGER ביישום Order-to-Cash Performance (F2005), " +
            "לפי ספריית ה-Fiori.",
        },
      ],
      transactions: [
        {
          he: "טרום מכירה: VA11 בקשת הצעת מחיר, VA21 ו-VA22 הצעת מחיר, VA25 רשימת הצעות.",
          xrefs: ["tx:VA11", "tx:VA21", "tx:VA22", "tx:VA25"],
        },
        {
          he: "הזמנה: VA01, ‏VA02, ‏VA03, ‏VA05; ב-S/4HANA Manage Sales Orders - Version 2 (F3893, מוביל VA01, " +
            "קשורות VA02, VA03, VA05).",
          xrefs: ["tx:VA01", "tx:VA02", "tx:VA03", "tx:VA05"],
        },
        {
          he: "זמינות ואשראי: CO09; ‏FD32 ו-VKM1 עד VKM4 ב-ECC; ‏UKM_BP ו-VKM1/VKM4 כמעקף ב-S/4HANA.",
          xrefs: ["tx:CO09", "tx:FD32", "tx:VKM1", "tx:VKM3", "tx:VKM4", "tx:UKM_BP"],
        },
        {
          he: "אספקה: VL01N, ‏VL10A, ‏VL02N, ‏VL06O, ליקוט WM ב-LT03, ביטול PGI ב-VL09; ב-S/4HANA Create Outbound " +
            "Deliveries - From Sales Orders (F0869A, מוביל VL10A) ו-Manage Outbound Deliveries (F0867A, מוביל " +
            "VL06G).",
          xrefs: ["tx:VL01N", "tx:VL10A", "tx:VL02N", "tx:VL06O", "tx:VL06G", "tx:LT03", "tx:VL09"],
        },
        {
          he: "חיוב: VF01, ‏VF04, ‏VF02, ‏VF03, ביטול ב-VF11; ב-S/4HANA Create Billing Documents (F0798, מוביל " +
            "VF01, קשורה VF04).",
          xrefs: ["tx:VF01", "tx:VF04", "tx:VF02", "tx:VF03", "tx:VF11"],
        },
        {
          he: "גבייה: FBL5N, ‏F-28, ‏F110; ב-S/4HANA Post Incoming Payments (F1345) ו-Manage Customer Line Items " +
            "(F0711). יישומי ה-SD וה-AR האלה אינם בקטלוג ה-Fiori של הפרויקט ולכן אינם מקושרים.",
          xrefs: ["tx:FBL5N", "tx:F-28", "tx:F110"],
        },
        {
          he: "נתוני אב: XD01 ו-VD01 ב-ECC; BP ב-S/4HANA.",
          xrefs: ["tx:XD01", "tx:VD01", "tx:BP"],
        },
      ],
      tables: [
        {
          he: "מסמך מכירה: VBAK כותרת ו-VBAP פריט; ב-ECC גם VBEP, ‏VBKD, ‏VBPA ו-KONV לפי רשומת VA01 (אינן במילון " +
            "הפרויקט).",
          xrefs: ["table:VBAK", "table:VBAP"],
        },
        {
          he: "אספקה: LIKP כותרת ו-LIPS פריט; VEKP לפי רשומת VL06O.",
          xrefs: ["table:LIKP", "table:LIPS", "table:VEKP"],
        },
        {
          he: "חיוב: VBRK כותרת ו-VBRP פריט; VKDFS הוא ה-billing index של VF04 (אינו במילון הפרויקט).",
          xrefs: ["table:VBRK", "table:VBRP"],
        },
        {
          he: "חשבונאות: BKPF ו-BSEG; פריטי לקוח BSID (פתוחים) ו-BSAD (מסולקים) לפי רשומות F-28 ו-FBL5N, שאינן " +
            "במילון הפרויקט.",
          xrefs: ["table:BKPF", "table:BSEG"],
        },
        {
          he: "לקוח: KNA1, ובצד S/4HANA‏ BUT000.",
          xrefs: ["table:KNA1", "table:BUT000"],
        },
        {
          he: "מסמך החומר של ה-PGI (MKPF ו-MSEG ב-ECC; ב-S/4HANA טבלת MATDOC לפי רשומות MKPF ו-MSEG באובייקטי " +
            "המעבר של הפרויקט, שאינה במילון הפרויקט).",
          xrefs: ["obj:material-document", "table:MKPF", "table:MSEG", "bp:matdoc-read-through-compatibility"],
        },
        {
          he: "טבלאות ECC שבוטלו או הוחלפו ב-S/4HANA לפי רשימת הפישוט: VBUK ו-VBUP (סטטוס), טבלאות האינדקס VAKPA, " +
            "‏VAPMA, ‏VLKPA, ‏VLPMA, ‏VRKPA, ‏VRPMA, ‏KONV כמאגר תוצאת התמחור (הוחלפה ב-PRCD_ELEMENTS); כולן " +
            "בפרוזה בלבד.",
        },
        {
          he: "CDS לפי רשומת הפתרון sales-order: I_SalesOrder (אינה במילון הפרויקט ולכן אינה מקושרת).",
        },
      ],
      integrationPoints: [
        {
          he: "SD אל PP: ביקוש המכירות, בדיקת הזמינות ואסטרטגיות התכנון עד פקודת הייצור, ברשומה " +
            "bp:sales-demand-to-production.",
          xrefs: ["bp:sales-demand-to-production", "tx:CO09"],
        },
        {
          he: "SD אל MM-IM: יציאת הסחורה רושמת מסמך חומר (תנועה 601, ביטול 602) ומפחיתה מלאי; הקריאה של מסמכי " +
            "חומר ב-S/4HANA דרך תצוגות תאימות מפורטת ברשומות הנקובות.",
          xrefs: ["obj:material-document", "bp:goods-movement-process", "bp:matdoc-read-through-compatibility"],
        },
        {
          he: "SD אל WM/EWM: ליקוט ב-WM (LT03) או ב-EWM לפי רשומות VL01N ו-VL06O; לפי נושא המעבר WM הקלאסי במצב " +
            "compatibility ו-EWM הוא הכיוון; פערי מלאי WM/EWM מול IM בתקרית wm-ewm-stock-mismatch.",
          xrefs: ["tx:LT03", "tx:VL06O"],
        },
        {
          he: "SD אל FI: מסמך החיוב יוצר מסמך חשבונאי ומעדכן AR (רשומת VF01); account determination ב-VKOA; " +
            "ב-S/4HANA קליטת התשלום ב-F-28 נרשמת ליומן האוניברסלי (רשומת F-28).",
          xrefs: ["tx:VF01", "table:BKPF"],
        },
        {
          he: "SD אל FIN-FSCM-CR: בדיקת האשראי בהזמנה ובאספקה מול SAP Credit Management ב-S/4HANA; לפי עמוד " +
            "'Goods Issue' אין בדיקת אשראי ברישום ה-PGI.",
          xrefs: ["tx:UKM_BP", "tx:VKM1"],
        },
        {
          he: "ניהול פלט: פלט החשבונית ב-NAST (ECC), וב-S/4HANA לפי 'S4TWL - Billing Document Output Management' " +
            "בחירה בין NAST לבין SAP S/4HANA output control.",
        },
      ],
      interfaces: [
        {
          he: "הזמנה: IDoc מסוג ORDERS ו-API_SALES_ORDER לפי מפת התהליך, API_SALES_ORDER_SRV לפי רשומת הפתרון; " +
            "BAPI_SALESORDER_CREATEFROMDAT2 ו-BAPI_SALESORDER_CHANGE לפי רשומות VA01 ו-VA02. אינם במילון " +
            "הפרויקט ולכן אינם מקושרים.",
        },
        {
          he: "ממשקי A2A להזמנה שרשומת החיפוש של העמוד 'Sales Order - Confirm Processing (A2A)' ב-APIs for Sales‏ " +
            "(2025 FPS01) מונה: Sales Order (A2A), ‏Sales Order - Confirm Processing (A2A), ‏Sales Order - Send " +
            "Processing Notification (A2A) ו-Sales Order - Send Error Log (A2A).",
        },
        {
          he: "אספקה: IDoc מסוג DESADV ו-SHPMNT לפי מפת התהליך; BAPI_OUTB_DELIVERY_CREATE_SLS " +
            "ו-BAPI_OUTB_DELIVERY_CHANGE לפי רשומות VL01N ו-VL02N (אינם במילון הפרויקט).",
        },
        {
          he: "חיוב: IDoc מסוג INVOIC לפי מפת התהליך; BAPI_BILLINGDOC_CREATEMULTIPLE לפי רשומת VF01 (אינם במילון " +
            "הפרויקט).",
        },
        {
          he: "גבייה: BAPI_ACC_DOCUMENT_POST לפי רשומת F-28 ו-BAPI_AR_ACC_GETOPENITEMS לפי רשומת FBL5N (אינם " +
            "במילון הפרויקט).",
        },
      ],
      outputs: [
        {
          he: "הזמנת מכירה עם תמחור, אישור זמינות וסטטוס אשראי.",
          xrefs: ["table:VBAK", "table:VBAP"],
        },
        {
          he: "אספקה יוצאת; ב-PGI מסמך חומר ומסמך FI/CO (רשומות VL01N ו-VL02N).",
          xrefs: ["table:LIKP", "table:LIPS", "obj:material-document"],
        },
        {
          he: "מסמך חיוב (חשבונית, זיכוי, חיוב, ביטול) ומסמך חשבונאי עם פריט פתוח ללקוח.",
          xrefs: ["table:VBRK", "table:VBRP", "table:BKPF", "table:BSEG"],
        },
        {
          he: "מסמך סליקה (clearing document) בקליטת התשלום (רשומת F-28).",
          xrefs: ["tx:F-28"],
        },
        {
          he: "שרשרת document flow מההזמנה ועד החשבונית והתשלום, המוצגת ב-VA03 (רשומתה).",
          xrefs: ["tx:VA03"],
        },
        {
          he: "פלט החשבונית ללקוח: ב-ECC דרך NAST; ב-S/4HANA דרך NAST (ברירת המחדל) או SAP S/4HANA output " +
            "control, לפי 'S4TWL - Billing Document Output Management'.",
        },
      ],
      exceptions: [
        {
          he: "תנאי תמחור חסר: מחיר 0 או 'mandatory condition PR00 missing' (רשומת VA01, תקרית " +
            "pricing-condition-missing).",
          xrefs: ["tx:VK11", "tx:VA03"],
        },
        {
          he: "חסימת אשראי: 'Credit limit exceeded - document blocked' (רשומת VA01); ‏'Credit block - document " +
            "blocked for delivery' (רשומת VA02).",
          xrefs: ["tx:VKM1", "tx:VKM4"],
        },
        {
          he: "חוסר זמינות: 'Checking rule not maintained', ‏'No ATP quantity' ו-'Scope of check excludes " +
            "required elements' (רשומת CO09); תקרית aatp-shortage-release במפת התהליך.",
          xrefs: ["tx:CO09"],
        },
        {
          he: "אספקה: 'No schedule lines due for delivery', ‏'Shipping point could not be determined', ‏'No " +
            "picking location could be determined' (רשומת VL01N).",
          xrefs: ["tx:VL01N"],
        },
        {
          he: "PGI: 'Goods issue: deficit of stock', ‏'Batch not determined for item' (רשומת VL02N); תקריות " +
            "batch-determination-fail ו-wm-ewm-stock-mismatch במפת התהליך.",
          xrefs: ["tx:VL02N"],
        },
        {
          he: "חיוב: 'Account determination error - no G/L account', ‏'Billing block active', ‏'Document is " +
            "incomplete for billing' (רשומת VF01); ביטול PGI נחסם כשקיימת חשבונית (רשומת VL09).",
          xrefs: ["tx:VF01", "tx:VF02", "tx:VL09"],
        },
        {
          he: "גבייה: 'Balance not zero', ‏'Difference too large / not assigned', ‏'Posting period not open' " +
            "(רשומת F-28).",
          xrefs: ["tx:F-28"],
        },
        {
          he: "המרה: לקוח שלא סונכרן ל-Business Partner (תקרית cvi-sync-error, ניתוח ב-BP).",
          xrefs: ["tx:BP"],
        },
      ],
      controls: [
        {
          he: "בדיקת incompletion log לפני שמירת ההזמנה, ויצירה עם reference להצעת מחיר (רשומת VA01).",
          xrefs: ["tx:VA01"],
        },
        {
          he: "שחרור חסימות אשראי בכלי הייעודי ולא בעדכון ידני (VKM1/VKM3 ב-ECC לפי רשומת VA02; Documented Credit " +
            "Decisions ב-S/4HANA לפי העמוד הרשמי).",
          xrefs: ["tx:VKM1", "tx:VKM3"],
        },
        {
          he: "ליקוט מלא, אצווה ומספר סידורי לפני PGI (רשומת VL02N); לפי עמוד 'Goods Issue' אחרי PGI אפשרויות " +
            "השינוי באספקה מצומצמות מאוד.",
          xrefs: ["tx:VL02N"],
        },
        {
          he: "סדר ביטול: VF11 לחשבונית ואחריו VL09 ל-PGI (רשומות VF11 ו-VL09).",
          xrefs: ["tx:VF11", "tx:VL09"],
        },
        {
          he: "הרצת VF04 כ-batch job עם סימולציה וסינון לפי תאריך חיוב ולקוח, וניטור ה-log (רשומת VF04).",
          xrefs: ["tx:VF04"],
        },
        {
          he: "בדיקת account determination לפני שחרור לחשבונאות (רשומת VF02).",
          xrefs: ["tx:VF02"],
        },
        {
          he: "reason codes להפרשי תשלום ובחירה מודעת בין partial ל-residual (רשומת F-28).",
          xrefs: ["tx:F-28"],
        },
      ],
      kpis: [
        {
          he: "זמני מחזור לאורך התהליך, למשל מהזמנה לאספקה ומ-PGI לחיוב, לפי עמוד Order-to-Cash Performance " +
            "(S/4HANA 2025 FPS01).",
        },
        {
          he: "מספר חסימות אספקה וחסימות חיוב שהוחלו, להזמנה ולפריט הזמנה, לפי אותו עמוד.",
        },
        {
          he: "הזמנות ופריטים שנדחו במלואם, והזמנות שנשמרו במצב incomplete, לפי אותו עמוד.",
        },
        {
          he: "שינויים בשדות קריטיים (תנאי תשלום, אמצעי תשלום, תאריך תמחור) ובתאריך האספקה המאושר, לפי אותו עמוד.",
        },
        {
          he: "אספקות, ליקוטים, PGI וביטולי PGI, וחשבוניות לפריט הזמנה, לפי אותו עמוד.",
        },
      ],
      eccToS4: [
        {
          he: "לקוח: ב-ECC‏ XD01/VD01 ו-KNA1 מוביל; ב-S/4HANA לפי 'S4TWL - Business Partner Approach' ה-Business " +
            "Partner הוא נקודת הכניסה היחידה, XD01 ו-VD01 מופנות ל-BP, ומערכת בלי CVI מלא נדחית בהמרה.",
          xrefs: ["tx:XD01", "tx:VD01", "tx:BP", "table:KNA1", "table:BUT000"],
        },
        {
          he: "אשראי: לפי 'S4TWL - Credit Management' ‏FI-AR-CR (FD31/FD32, ‏VKM1 עד VKM4, ‏KNKK) אינו זמין " +
            "ב-S/4HANA והמקבילה היא SAP Credit Management (FIN-FSCM-CR) עם BP או UKM_BP ו-UKM_CASE.",
          xrefs: ["tx:FD32", "tx:VKM1", "tx:VKM4", "tx:UKM_BP"],
        },
        {
          he: "מודל הנתונים של SD: לפי 'S4TWL - SD Simplified Data Models' ‏VBUK ו-VBUP בוטלו ושדות הסטטוס עברו " +
            "ל-VBAK/VBAP, ‏LIKP/LIPS ו-VBRK; ‏VBFA פושטה, וטבלאות האינדקס VAKPA/VAPMA ודומותיהן בוטלו.",
          xrefs: ["table:VBAK", "table:VBAP", "table:LIKP", "table:LIPS", "table:VBRK"],
        },
        {
          he: "תמחור: לפי 'S4TWL - Data Model Changes in SD Pricing' ‏KONV הוחלפה בתפקיד שמירת הנתונים בטבלה " +
            "PRCD_ELEMENTS, והתוכן מועבר בהמרה אוטומטית.",
        },
        {
          he: "פלט החיוב: לפי 'S4TWL - Billing Document Output Management' NAST מוגדר כברירת מחדל, ו-SAP S/4HANA " +
            "output control נבחר ב-Customizing 'Manage Application Object Type Activation'; כשנדרשים ערוצי NAST " +
            "מיוחדים (8, 9, A, T) נשארים ב-NAST.",
        },
        {
          he: "פריטי לקוח: לפי 'S4TWL - Data Model Changes in FIN' טבלאות האינדקס, ובהן BSID ו-BSAD, הוחלפו " +
            "בתצוגות תאימות בשם זהה; לפי רשומת FBL5N היא זמינה דרכן, וב-Fiori‏ F0711.",
          xrefs: ["tx:FBL5N", "tx:F-28"],
        },
        {
          he: "חוויית משתמש: טרנזקציות ה-GUI זמינות ב-S/4HANA לפי רשומות המאגר, ולצדן יישומי Fiori שספריית " +
            "ה-Fiori משייכת להן (F3893, ‏F0869A, ‏F0798, ‏F1345, ‏F0711).",
          xrefs: ["tx:VA01", "tx:VL10A", "tx:VF01", "tx:F-28", "tx:FBL5N"],
        },
        {
          he: "זמינות: ATP קלאסי ב-ECC מול aATP ב-S/4HANA, לפי נושא המעבר; הפירוט ברשומה " +
            "bp:sales-demand-to-production.",
          xrefs: ["bp:sales-demand-to-production"],
        },
      ],
      migration: [
        {
          he: "סדר טעינה לפי קוקפיט ההגירה של המאגר: Business Partner ראשון, לקוח כתפקיד BP (CVI מסנכרן ל-KNA1), " +
            "הזמנות מכירה פתוחות (VBAK/VBAP) אחרי חומר ולקוח, ופריטים פתוחים של FI (BSID) שב-S/4HANA נקראים דרך " +
            "ACDOCA.",
          xrefs: ["table:KNA1", "table:VBAK", "table:VBAP"],
        },
        {
          he: "שדות append ב-VBUK/VBUP מועברים ל-include הסטטוס (VBAK_STATUS, ‏LIKP_STATUS, ‏VBRK_STATUS, " +
            "‏VBAP_STATUS, ‏LIPS_STATUS) באותו שם וסוג, לפי 'S4TWL - SD Simplified Data Models'; קוד מותאם " +
            "מותאם לפי תוצאות בדיקת הקוד.",
        },
        {
          he: "מעבר מ-FI-AR-CR ל-FIN-FSCM-CR בכלים שב-IMG, לפי 'S4TWL - Credit Management'.",
          xrefs: ["tx:UKM_BP"],
        },
        {
          he: "סנכרון CVI לפני ההמרה; שגיאות סנכרון בתקרית cvi-sync-error (MDS_PPO2, ‏MDS_LOAD_COCKPIT לפי " +
            "התקרית).",
          xrefs: ["tx:BP"],
        },
        {
          he: "תהליך ההגירה הכללי ל-S/4HANA ברשומה bp:ecc-to-s4hana-migration-process.",
          xrefs: ["bp:ecc-to-s4hana-migration-process"],
        },
      ],
      reference: {
        title: "Sales Order Management and Processing | Sales (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/733f9756c5708251e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תיעוד התהליך הרשמי (loio 733f9756c5708251e10000000a4450e5, ‏versionId 2025.001), שנקרא בגוף " +
          "העמוד. פריט SAP Best Practices: עמוד What's New 1909 'Extensibility for Revenue Account " +
          "Determination' נוקב ב-'Scope Item BD9 (Sell from Stock) and other scope items that include the " +
          "posting of billing documents'; BD9 מובא כפריט ההיקף שהמקור הרשמי מדפיס לתרחיש המכירה מהמלאי, ולא " +
          "נבדק כאן שהוא מכסה את כל שלבי התהליך. BKN הוא פריט ההיקף של ניטור ביצועי ה-O2C, לא של התהליך עצמו.",
      },
    },
    xrefs: [
      "tx:VA11", "tx:VA21", "tx:VA22", "tx:VA25", "tx:VA01", "tx:VA02", "tx:VA03", "tx:VA05", "tx:CO09", "tx:FD32",
      "tx:VKM1", "tx:VKM3", "tx:VKM4", "tx:UKM_BP", "tx:XD01", "tx:VD01", "tx:BP", "tx:VK11", "tx:VL01N", "tx:VL10A",
      "tx:VL02N", "tx:VL06O", "tx:VL06G", "tx:LT03", "tx:VL09", "tx:VF01", "tx:VF02", "tx:VF03", "tx:VF04",
      "tx:VF11", "tx:FBL5N", "tx:F-28", "tx:F110", "table:VBAK", "table:VBAP", "table:LIKP", "table:LIPS",
      "table:VEKP", "table:VBRK", "table:VBRP", "table:KNA1", "table:BUT000", "table:BKPF", "table:BSEG",
      "table:MKPF", "table:MSEG", "table:MARC", "obj:material-document", "bp:sales-demand-to-production",
      "bp:goods-movement-process", "bp:matdoc-read-through-compatibility", "bp:ecc-to-s4hana-migration-process",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'הזמנה לגבייה (O2C)' של הפרויקט (PROCESS_MAPS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "חמישה שלבים: הזמנת לקוח (VA01, ‏VA02, ‏VA03; ‏VBAK, ‏VBAP; Fiori 'Manage Sales Orders'; ממשקים " +
          "ORDERS IDoc ו-API_SALES_ORDER; תקרית pricing-condition-missing; בדיקה 'הזמנה עם תמחור+ATP; חסימת " +
          "אשראי'), בדיקת זמינות (CO09; ‏VBBE; תקרית aatp-shortage-release), אספקה, ליקוט ו-PGI (VL01N, ‏VL02N; " +
          "‏LIKP, ‏LIPS; ממשקים DESADV / SHPMNT IDoc ו-WM/EWM; תקריות wm-ewm-stock-mismatch " +
          "ו-batch-determination-fail), חיוב (VF01, ‏VF04; ‏VBRK, ‏VBRP; ‏INVOIC IDoc; בדיקה 'חשבונית → רישום " +
          "FI (ACDOCA)') וגבייה (FBL5N, ‏F-28; ‏BSID; Fiori 'Manage Customer Line Items').",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#o2c",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הפתרון 'מכירות (Order-to-Cash)' של הפרויקט (SOLUTIONS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מכירה מקצה לקצה: הזמנת לקוח, אספקה (PGI), חיוב וגבייה; טרנזקציות ECC‏ VA01, ‏VL01N, ‏VF01, ‏VKM3; " +
          "ב-S/4HANA 'נתמך; לקוח=BP; aATP; Fiori sales'; טבלאות VBAK, ‏VBAP, ‏LIKP, ‏VBRK; CDS‏ I_SalesOrder; " +
          "API‏ API_SALES_ORDER_SRV; BAPI‏ BAPI_SALESORDER_CREATEFROMDAT2; תקרית pricing-condition-missing.",
        verificationLevel: "repository_verified",
        repoRef: "data/solutions.ts#sales-order",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות המאגר: tx-intel.ts#VA01 (ובאותו קובץ VA02, VA03, VA05, VA11, VA21)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "VA01 יוצרת הזמנת מכירה (VBAK/VBAP) ומפעילה תמחור, ATP וקביעת מסלול; שרשרת VA21, ‏VA01, ‏VL01N, " +
          "ליקוט, VF01; משתמשים: נציג שירות לקוחות, פקיד מכירות, Order Management; שגיאות: חומר לא מוגדר לארגון " +
          "המכירות, PR00 חסר, 'Credit limit exceeded - document blocked'; טעויות: incompletion log לא נבדק, " +
          "תאריך אספקה בלי ATP; BAPI‏ BAPI_SALESORDER_CREATEFROMDAT2; ב-S/4HANA זמינה, וספריית ה-Fiori מציינת " +
          "את VA01 כטרנזקציה המובילה של F3893. VA02: שחרור credit block דרך VKM1/VKM3, ‏BAPI_SALESORDER_CHANGE. " +
          "VA03: document flow. VA05: רשימת הזמנות פתוחות (טבלאות VBAK, ‏VBAP, ‏VBUK, ‏VBUP, ‏VAPMA). " +
          "VA11/VA21: טרום מכירה, יצירת הזמנה עם reference, hit rate ב-VA25.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#VA01",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות המאגר: tx-intel.ts#VL01N (ובאותו קובץ VL02N, VL06O, VL10A, VL09)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "VL01N יוצרת אספקה יוצאת (LIKP/LIPS) עם reference להזמנה; PGI מפחית מלאי (movement 601) ויוצר מסמך " +
          "FI/CO; שגיאות: אין schedule lines, ‏shipping point, ‏picking location, ‏deficit of stock; BAPI‏ " +
          "BAPI_OUTB_DELIVERY_CREATE_SLS. VL02N: ליקוט, אריזה, אצווה/מספר סידורי ו-PGI; ביטול דרך VL09; BAPI‏ " +
          "BAPI_OUTB_DELIVERY_CHANGE. VL06O: מוניטור המסירות היוצאות (LIKP, ‏LIPS, ‏VEKP). VL10A: יצירת מסירות " +
          "מפריטי הזמנה בשלים. VL09: ביטול PGI (602); חשבונית קיימת מבוטלת קודם ב-VF11.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#VL01N",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות המאגר: tx-intel.ts#VF01 (ובאותו קובץ VF02, VF04, VF11)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "VF01 יוצרת מסמך חיוב (VBRK/VBRP) עם reference לאספקה או להזמנה, יוצרת מסמך חשבונאי ומעדכנת AR; " +
          "שגיאות: account determination, ‏billing block, מסמך לא שלם; BAPI‏ BAPI_BILLINGDOC_CREATEMULTIPLE. " +
          "VF04: רשימת מועדי חיוב מבוססת VKDFS, מומלץ כ-batch job עם סימולציה. VF02: שחרור לחשבונאות אחרי בדיקת " +
          "VKOA. VF11: מסמך ביטול שמהפך את החשבונית ואת הרישום החשבונאי; לא ניתן לבטל חשבונית שנסלקה ב-FI.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#VF01",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות המאגר: tx-intel.ts#F-28 (ובאותו קובץ FBL5N)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "F-28 רושמת תקבול מלקוח ומקזזת פריטים פתוחים (BSID אל BSAD) עם clearing document; partial " +
          "ו-residual, הנחת מזומן לפי תנאי תשלום, reason codes; מקבילה אוטומטית F110; ב-S/4HANA זמינה ורושמת " +
          "ל-Universal Journal; BAPI‏ BAPI_ACC_DOCUMENT_POST. FBL5N: פריטי לקוח פתוחים ומסולקים (BSID/BSAD), " +
          "ב-S/4HANA דרך compatibility views, ‏Fiori‏ F0711; BAPI‏ BAPI_AR_ACC_GETOPENITEMS.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#F-28",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#XD01",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "XD01 כותבת ל-KNA1, ‏KNB1, ‏KNVV, ‏KNVP, ‏KNVK, ‏KNBK; חשבון תיאום חובה ב-KNB1; זרם O2C ללקוח חדש: " +
          "XD01, ‏FD32, ‏VA01, ‏VL01N, ‏VF01. ב-S/4HANA יצירת לקוח דרך BP עם תפקידים FLCU00 ו-FLCU01, ו-CVI " +
          "מסנכרן בין BP ל-KNA1.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#XD01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מילון האובייקטים המאומתים של הפרויקט: VBAK, VBAP, LIKP, LIPS, VBRK, VBRP, KNA1",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "VBAK כותרת מסמך מכירה (לקוח, ארגון מכירות, תנאים) ו-VBAP פריט (חומר, כמות, מחיר, מפעל); LIKP " +
          "ו-LIPS כותרת ופריט של מסמך משלוח; VBRK ו-VBRP כותרת ופריט של מסמך חיוב עם קישור ל-FI; KNA1 אב לקוח " +
          "כללי, ב-S/4HANA דרך Business Partner (BUT000).",
        verificationLevel: "repository_verified",
        repoRef: "data/verified-objects.ts#VBAK",
      },
      {
        sourceType: "repository",
        sourceTitle: "אובייקטי המעבר ל-S/4HANA של הפרויקט: KNA1, VBUK, VBUP, VBRK, BSID, Credit Management, NAST",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KNA1: ב-ECC לקוח ב-XD01/VD01, ב-S/4HANA ה-BP נקודת הכניסה ו-CVI מסנכרן ל-KNA1/KNB1. VBUK/VBUP: " +
          "בוטלו, הסטטוס ב-VBAK/LIKP/VBRK וב-VBAP/LIPS. BSID: בוטלה, ACDOCA עם compatibility view. Credit " +
          "Management: FI-AR קלאסי הוחלף ב-FSCM Credit Management. NAST: S/4HANA מקדמת Output Management חדש " +
          "ו-NAST נתמך חלקית.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-objects.ts#KNA1",
      },
      {
        sourceType: "repository",
        sourceTitle: "אובייקטי המעבר ל-S/4HANA של הפרויקט: MKPF, MSEG",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MKPF: כותרת מסמך חומר ב-ECC; ב-S/4HANA אוחד ל-MATDOC ו-MKPF היא Compatibility View. MSEG: פריטי " +
          "תנועת מלאי ב-ECC (עם MKPF ככותרת); ב-S/4HANA אוחד ל-MATDOC ו-MSEG נחשף כ-Compatibility View לקריאה.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-objects.ts#MKPF",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושאי המעבר של הפרויקט: 'שותף עסקי (BP/CVI)', 'ניהול פלט', 'בדיקת זמינות מתקדמת', 'ניהול " +
          "מחסן ל-EWM'",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BP: ב-ECC לקוח (XD01) וספק ניהלו בנפרד; ב-S/4HANA ה-BP נקודת הכניסה, לקוח הוא תפקיד BP ו-CVI " +
          "חובה. ניהול פלט: ב-ECC‏ NAST ותנאי פלט; ב-S/4HANA Output Management חדש לצד NAST. aATP: ATP קלאסי " +
          "(CO09) מול aATP עם BOP ו-Release for Delivery. EWM: WM קלאסי במצב compatibility ו-EWM הוא הכיוון.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#business-partner",
      },
      {
        sourceType: "repository",
        sourceTitle: "קוקפיט ההגירה של הפרויקט: Business Partner, Customer, Open Sales Orders, FI Open Items",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BP (BUT000, ‏KNA1, ‏LFA1) הוא הבסיס ללקוח ולספק ב-S/4HANA ונטען ראשון; לקוח נטען כתפקיד BP ו-CVI " +
          "מסנכרן ל-KNA1; הזמנות מכירה פתוחות (VBAK, ‏VBAP) תלויות בחומר ובלקוח; פריטים פתוחים של FI (BSID, " +
          "‏BSIK), ב-S/4HANA דרך ACDOCA.",
        verificationLevel: "repository_verified",
        repoRef: "data/migration-cockpit.ts#openso",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: pricing-condition-missing",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "pricing-condition-missing: מחיר 0 או שגיאה בהזמנת רכש או מכירה; שורש: condition record חסר " +
          "(MEK1/VK11), ‏access sequence, תוקף התנאי, ‏pricing procedure; ניתוח ב-VA03; טבלאות KONP ו-A305.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#pricing-condition-missing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: cvi-sync-error",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "לקוח או ספק שלא סונכרן ל-Business Partner (שגיאות PPO); שורשים: שדה חובה ב-BP, ‏number range, " +
          "‏grouping או תפקיד חסר; ניתוח ב-MDS_PPO2, ‏MDS_LOAD_COCKPIT ו-BP; מניעה: pre-checks של CVI לפני " +
          "ההמרה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#cvi-sync-error",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#CO09",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CO09 מציגה את תמונת ה-ATP לחומר ולמפעל לפי checking group, ‏checking rule ו-scope of check " +
          "(OPJJ); שגיאות: 'Checking rule not maintained', ‏'No ATP quantity', ‏'Scope of check excludes " +
          "required elements'; ב-S/4HANA זמינה לצד aATP.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO09",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התהליך 'מביקוש מכירות לייצור' של הפרויקט (צד הביקוש של O2C)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הזמנת הלקוח ב-VA01 כביקוש, בדיקת הזמינות ב-CO09 ו-aATP, אסטרטגיות התכנון וצריכת התחזית עד פקודת " +
          "הייצור; הרשומה משמשת כאן כקישור ואינה חוזרת.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/cross-processes-2.ts#sales-demand-to-production",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של הפרויקט: VKM1, VKM4, UKM_BP, VL09, VF11",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "VKM1 'Blocked SD Documents' ו-VKM4 'SD Documents (Credit Management)' בתחום אשראי; UKM_BP " +
          "'Business Partner Master Data (Credit Management)'; VL09 'Cancel Goods Issue for Delivery Note'; " +
          "VF11 'Cancel Billing Document'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#VKM1",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Sales Order Management and Processing | Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/733f9756c5708251e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 733f9756c5708251e10000000a4450e5): 'the sales process chain, which spans from " +
          "quote to shipment and from billing to booking revenue'; 'You can represent presales business " +
          "processes using sales inquiries and sales quotations. Customers can respond to a sales quotation " +
          "with a purchase order, which in turn triggers a sales order'; 'Sales orders trigger different " +
          "follow-up processes, such as delivery processing'; העמוד מפנה ל-Manage Sales Orders - Version 2, " +
          "ל-Create Sales Orders - VA01, ל-Output Management ול-Advanced Available-to-Promise (aATP).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Issue | Delivery Management (LE-SHP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c7894a248ca14f74aca67f97528e5ad7/cb1fbf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio cb1fbf53f106b44ce10000000a174cb4): האספקה היוצאת היא הבסיס לרישום; ברישום " +
          "'Warehouse stock of the material is reduced by the delivery quantity', 'Value changes are posted to " +
          "the balance sheet account in inventory accounting', 'Requirements are reduced by the delivery " +
          "quantity', 'Goods issue posting is automatically recorded in the document flow'; 'After goods issue " +
          "is posted for an outbound delivery, the scope for changing the delivery document becomes very " +
          "limited'; 'There is no credit check that takes place in the GI posting process'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Outbound Delivery – with Order Reference | Delivery Management (LE-SHP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c7894a248ca14f74aca67f97528e5ad7/70f7e785318a4adcb5d7307d08c0ba11.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 70f7e785318a4adcb5d7307d08c0ba11): 'Using this app, you create a single outbound " +
          "delivery for a sales or stock transfer order. This app corresponds to the transaction VL01N' (App " +
          "ID: VL01N). הרשומה מופיעה גם כראיה ברשומת tx:VL01N.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Billing Documents | Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/7dc3125477a98c24e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 7dc3125477a98c24e10000000a4450e5): 'App ID: F0798 With this app, you can create " +
          "billing documents (for example, invoices and credit memos) from items in the billing due list'; 'The " +
          "billing due list is an index of billable SD documents (such as sales orders, outbound deliveries, " +
          "billing document requests, and credit memo requests) that are ready to be billed'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Billing Documents - VF01 | Invoicing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ed84b70c199d4470ae2e5ccb93b2e45b/c49274578cdc6a2be10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio c49274578cdc6a2be10000000a441470): 'App ID: VF01'; יוצרים מסמכי חיוב (חשבוניות, " +
          "זיכויים, חיובים, pro forma) עם reference למסמך SD קודם כמו הזמנה, אספקה או בקשת חיוב; 'Billing " +
          "usually represents the final step in completing a sales process'; חיוב חלקי של אספקה אפשרי לקטגוריית " +
          "פריט עם billing relevance K, ולא לפריטי אצווה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Credit Check Process | Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/4e63bf186cc943be821bc0b8be3557a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 4e63bf186cc943be821bc0b8be3557a6): 'Credit checks can occur at various times " +
          "during the sales order cycle, from order receipt to delivery'; 'Customizing for automatic credit " +
          "control must be specified on both the Sales and Distribution (SD) and the SAP Credit Management " +
          "(FIN-FSCM-CR)'; תוצאת הבדיקה יכולה להתריע או לחסום את ההזמנה או האספקה, ומנהל האשראי משחרר או מבטל.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Credit Block Release and Recheck | Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/ab7f7d00ce2f4d0ea8838e11a1ee6388.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio ab7f7d00ce2f4d0ea8838e11a1ee6388, אומת גם ברשומת tx:VKM1): הדרך המומלצת לבחינת " +
          "מסמכי SD חסומים ב-SAP Credit Management היא Documented Credit Decisions (UKM_CASE, ‏SCASE, " +
          "‏UKM_MY_DCDS, והיישום F5587A); 'In Credit Management within SAP ECC, VKM* transactions were used to " +
          "release blocked documents. In SAP S/4HANA, only transactions VKM1 and VKM4 are available as " +
          "workarounds'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Post Incoming Payments | Financial Operations",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/3cb1182b4a184bdd93f8d62e3f1f0741/fc628a542f2b0165e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio fc628a542f2b0165e10000000a44538d): 'With this app you can post and clear a single " +
          "incoming payment in one step'; רשימת פריטים פתוחים לסליקה, residual items עם reason codes, רישום on " +
          "account או לחשבון ראשי כשהסליקה אינה אפשרית, ו-dispute cases לתשלומים חלקיים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Order-to-Cash Performance | Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/43e92f5581788a05e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 43e92f5581788a05e10000000a441470): היישום נותן מדדים על משך שלבים ועל אירועים " +
          "בתהליך: 'Monitor lead times (for example, order to delivery or goods issue to billing)', חסימות " +
          "אספקה וחיוב שהוחלו, הזמנות ופריטים שנדחו, שינויים בשדות קריטיים (Payment terms, Payment method, " +
          "Pricing date) ובתאריך האספקה המאושר, אספקות, ליקוטים, PGI וביטוליו וחשבוניות; היישום תומך בסוגי " +
          "הזמנה OR ו-CBFD.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Configuration Settings: Order-to-Cash Performance | Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/eb5ce157b523113ce10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio eb5ce157b523113ce10000000a44147b): 'If you use the scope item BKN ( Order-to-Cash " +
          "Performance Monitoring ), you are provided with the following preconfigured content: Process " +
          "definitions: O2C_1 – Order to Cash O2C_2 – Order Item to Cash O2C_3 – Process Order O2C_4 – Deliver " +
          "Order Item'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility for Revenue Account Determination | What's New in SAP S/4HANA 1909",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1909.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/666c3a958f25453194e7473b38f48cae.html?locale=en-US&state=PRODUCTION&version=1909.000",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (loio 666c3a958f25453194e7473b38f48cae, ‏versionId 1909.000) מדפיסה בסניפט: " +
          "'Scope Item BD9 (Sell from Stock) and other scope items that include the posting of billing " +
          "documents'. הטענה מוגבלת לסניפט; תוכן פריט ההיקף BD9 לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Sales Order - Confirm Processing (A2A) | APIs for Sales",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/19d48293097f4a2589433856b034dfa5/186082f3fb3b4f1ba12297f2d82639b0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (loio 186082f3fb3b4f1ba12297f2d82639b0, ‏versionId 2025.001) מונה בסניפט תחת " +
          "Related Information את שמות הממשקים (A2A) להזמנה: Sales Order - Confirm Processing (A2A), ‏Sales " +
          "Order (A2A), Sales Order - Send Processing Notification (A2A) ו-Sales Order - Send Error Log (A2A). " +
          "גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Customer Tax Indicator | United States",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/3318ebc75ddc4d2994ca75b5fe521f24/746bd0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (United States, 6.0 EHP8 Latest, versionId 6.18.latest, loio " +
          "746bd0531d8b4208e10000000a174cb4) נוקבת בקוד VA01 בסניפט: 'You can also use the following " +
          "transactions: Sales To create To change Order VA01 VA02 Inquiry VA11 VA12 Quotation VA21 VA22 ...' " +
          "(אומת ברשומת tx:VA01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F3893 'Manage Sales Orders - Version 2' (SAP Fiori elements), " +
          "release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3893')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): תפקיד SAP_BR_INTERNAL_SALES_REP, קטלוג SAP_SD_BC_SO_PROC_OP " +
          "'Sales - Sales Order Processing', טרנזקציה מובילה VA01 וקשורות VA02, ‏VA03, ‏VA05 (אומת גם ברשומת " +
          "tx:VA01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F0869A 'Create Outbound Deliveries - From Sales Orders' (SAP Fiori " +
          "elements), release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0869A')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): תפקיד SAP_BR_SHIPPING_SPECIALIST, קטלוג SAP_LE_BC_OBDLV_PROC, " +
          "טרנזקציה מובילה VL10A וקשורות VL01N, ‏VL04, ‏VL10C ואחרות; קודם: F0869 Create Outbound Deliveries.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F0867A 'Manage Outbound Deliveries' (SAP Fiori elements), release " +
          "S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0867A')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): תפקיד SAP_BR_SHIPPING_SPECIALIST, קטלוג SAP_LE_BC_OBDLV_PROC, " +
          "טרנזקציה מובילה VL06G וקשורות VL02N, ‏VL06O, ‏VL06P, ‏VL09; קודם: F0867 Outbound Deliveries.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F0798 'Create Billing Documents' (SAP Fiori (SAPUI5)), release " +
          "S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0798')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): תפקיד SAP_BR_BILLING_CLERK, קטלוג SAP_SD_BC_BIL_DOC 'Sales - " +
          "Billing Document', טרנזקציה מובילה VF01 וקשורה VF04 (אומת גם ברשומת tx:VF01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1345 'Post Incoming Payments' (SAP Fiori (SAPUI5)), release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1345')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): תפקידים SAP_BR_AR_ACCOUNTANT ו-SAP_BR_AP_ACCOUNTANT, קטלוג " +
          "SAP_SFIN_BC_AR_INC_PAYM 'Accounts Receivable - Incoming Payments', טרנזקציה מובילה F-04 וקשורות " +
          "F-28, ‏F-29, ‏F-52, ‏FB05.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F0711 'Manage Customer Line Items' (SAP Fiori (SAPUI5)), release " +
          "S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0711')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): תפקיד SAP_BR_AR_ACCOUNTANT, קטלוג SAP_SFIN_BC_AR_DOC_PROC " +
          "'Accounts Receivable - Document Processing', טרנזקציה מובילה FBL5 וקשורות FBL5H ו-FBL5N.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F2005 'Order-to-Cash Performance' (SAP Smart Business generic " +
          "drill down app), release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2005')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (S32OP, ‏Published): יישום אנליטי בתפקיד SAP_BR_SALES_PROCESS_MANAGER " +
          "(Order-to-Cash Process Manager), קטלוג SAP_SD_BC_SALES_PROC_PERF 'Sales - Order-to-Cash Performance'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 5.1.27 S4TWL - Business Partner Approach",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט (עמ' 136-137): 'In SAP S/4HANA, Business Partner is the leading object and single entry " +
          "point to maintain Business Partner, Customer and Supplier'; מערכת שבה CVI אינו מלא נדחית במעבר; 'The " +
          "user interface for SAP S/4HANA is transaction BP'; XD01, ‏XD02, ‏XD03 ו-VD01, ‏VD02, ‏VD03 מופנות " +
          "ל-BP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 11.1.5 S4TWL - Credit Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט: 'Credit Management (FI-AR-CR) is not available as part of SAP S/4HANA. The functional " +
          "equivalent in SAP S/4HANA is SAP Credit Management (FIN-FSCM-CR)'; סימני שימוש ב-FI-AR-CR: FD31/FD32 " +
          "(KNKK, ‏KNKA) ו-VKM1 עד VKM4; סימני FIN-FSCM-CR: BP או UKM_BP (UKMBP_CMS_SGM, ‏UKMBP_CMS) " +
          "ו-UKM_CASE; המעבר נתמך בכלים שב-IMG (אומת גם ברשומת tx:VKM1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 11.1.9 S4TWL - SD Simplified Data Models",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט: 'Elimination of status tables VBUK, VBUP: Status fields have been moved to the " +
          "corresponding header and item tables - VBAK and VBAP for sales documents, LIKP and LIPS for " +
          "deliveries, VBRK for billing documents'; פישוט VBFA; ביטול טבלאות האינדקס VAKPA, ‏VAPMA, ‏VLKPA, " +
          "‏VLPMA, ‏VRKPA, ‏VRPMA; שדות append ב-VBUK/VBUP מועברים ל-VBAK_STATUS, ‏LIKP_STATUS, ‏VBRK_STATUS, " +
          "‏VBAP_STATUS או LIPS_STATUS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 11.1.7 S4TWL - Data Model Changes in SD Pricing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט: 'In SAP S/4HANA, table KONV has been replaced in its data persistency role by the new " +
          "table PRCD_ELEMENTS'; תוכן KONV מועבר ל-PRCD_ELEMENTS בהמרת הנתונים האוטומטית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 11.1.15 S4TWL - Billing Document Output Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט: ב-S/4HANA מומשה גישת פלט חדשה אך NAST מוגדר כברירת מחדל; SAP S/4HANA output control אינו " +
          "מתאים כשנדרשים אמצעי שידור NAST 8, 9, A או T; הבחירה ב-Customizing 'Manage Application Object Type " +
          "Activation' תחת Output Control.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 6.1.4 S4TWL - DATA MODEL CHANGES IN FIN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט: טבלאות הסיכום והאינדקס הוסרו והוחלפו בתצוגות DDL בשם זהה (compatibility views), ובטבלת " +
          "ההחלפה מופיעות BSAD ו-BSID; 'The compatibility views ensure database SELECTs work as before', וכתיבה " +
          "ישירה הוסרה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 11 בספריית הפרויקט (Prerequisites for SAP S/4HANA End-to-End Implementation Training), " +
          "פרק 2, סעיף 2.6 'The Order-to-Cash (O2C) Story'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף מונה את שלבי O2C הקונספטואליים: בקשה או הצעת מחיר, הזמנת מכירה, בדיקת זמינות ותכנון אספקה, " +
          "אספקה ויציאת סחורה, חיוב, ותקבול שסוגר את החוב הפתוח; התהליך חוצה SD, ‏MM ו-FI. משמש להפניית קריאה " +
          "ולא כמקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book11.json#2.6",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט (SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide), פרק 3 " +
          "'Sales and Distribution', סעיף F3893 'Manage Sales Orders (Version 2)'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פרק ה-SD בספר מתעד את יישומי ה-Fiori של התהליך, ובהם F3893, ‏F0869A 'Create Outbound Deliveries – " +
          "From Sales Orders', ‏F0798 'Create Billing Documents' ו-F2005 'Order-to-Cash Performance'; הפניית " +
          "קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F3893",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט, פרק 1 'Financial Accounting', סעיף F1345 'Post Incoming Payments'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף מתעד את יישום ה-Fiori לקליטת תקבולים, שלב הגבייה של התהליך; הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F1345",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "רשומת תהליך. צד הביקוש (אסטרטגיות תכנון, aATP, MRP) מקושר ל-bp:sales-demand-to-production ואינו חוזר. " +
      "חיפושים רשמיים שרצו (help.sap.com, 2026-09-24): 'Sales Order Processing', 'Billing', 'Outbound Delivery " +
      "Processing goods issue', 'Order to cash', 'Billing Document Management Sales', 'Create Billing " +
      "Documents', 'Post Incoming Payments customer', 'Credit Management Sales Order credit check', 'Sell from " +
      "Stock scope item'; גופי העמודים המצוטטים נקראו בשירות התוכן, למעט 'Extensibility for Revenue Account " +
      "Determination' ו-'Sales Order - Confirm Processing (A2A)' שמצוטטים מהסניפט. ספריית ה-Fiori נבדקה ב-S32OP " +
      "ל-F3893, ‏F0869A, ‏F0867A, ‏F0798, ‏F1345, ‏F0711, ‏F2005, ולקודים VL01N, ‏VF04 ו-VKM1 (ל-VKM1 אין יישום " +
      "מוביל ב-S32OP). יישומי ה-SD וה-AR, ה-BAPIs של SD, ה-IDocs ORDERS/DESADV/SHPMNT/INVOIC, ‏CDS‏ " +
      "I_SalesOrder והטבלאות VBFA, ‏VBUK, ‏VBUP, ‏KONV, ‏KNB1, ‏KNVV, ‏BSID, ‏BSAD, ‏VKDFS אינם במילון הפרויקט " +
      "ולכן מופיעים בפרוזה בלבד. פער במאגר: רשומות tx-intel מונות את VBUK ו-VBUP (VA01, VA03, VA05, VA25, " +
      "VL01N, VL02N, VL06O) ואת טבלאות האינדקס VAPMA (VA05) ו-VAKPA (VA25), שלפי 'S4TWL - SD Simplified Data " +
      "Models' בוטלו ב-S/4HANA; הרשומות מתאימות לצד ECC. תפקידים: שמות התפקידים הם מרשומות המאגר ומספריית " +
      "ה-Fiori; לא נמצא מקור שמגדיר תפקידי תהליך מלאים. KPIs: נגזרים מעמוד Order-to-Cash Performance; אין במאגר " +
      "ערכי יעד. פריט ההיקף BD9 מובא רק כפי שהסניפט הרשמי מדפיס אותו; תוכנו לא נקרא. לא בוצעה בדיקה במערכת SAP " +
      "חיה.",
  },
  /* ====================================================== period-end closing */
  {
    slug: "period-end-closing-process",
    he: "סגירת תקופה בייצור ובתחזוקה (CO)",
    en: "Period-end closing for production and maintenance orders (CO)",
    module: "Cross",
    summary: "סגירת התקופה בבקרת עלויות הפקודות מריצה בסדר קבוע: תקורה בפועל, חישוב WIP לפקודות פתוחות, חישוב " +
      "סטיות לפקודות שנמסרו או נסגרו טכנית, ואז התחשבנות ל-FI, ‏CO-PA, ‏Material Ledger ולמקבלי CO. הרשומה " +
      "מתעדת את הסדר, התנאים והבדיקות שלפני הסגירה ואחריה; פירוט כלל ההתחשבנות עצמו נמצא בשיטת התחשבנות הפקודות.",
    context: "לפי עמוד התרחיש הרשמי 'Period-End Closing in Product Cost by Order: Scenario' (S/4HANA 2025 FPS01), " +
      "פונקציות הסגירה ב-Product Cost by Order הן הקצאת תבנית, הערכה מחדש בתעריפי פעילות בפועל, חישוב תקורה, " +
      "התחשבנות מקדימה למוצרים משותפים ולעיבוד חוזר, חישוב WIP, חישוב סטיות והתחשבנות; פקודות בסטטוס LKD, " +
      "‏CLSD, ‏DLFL או DLT אינן נכללות. רשומת tx-intel של CO88 במאגר קובעת את סדר הסגירה: אישורים, תקורה, WIP " +
      "‏(KKAO), סטיות (KKS1), התחשבנות (CO88). בצד התחזוקה, עמודי What's New הרשמיים מתעדים את פריט ה-Scope " +
      "‏BF7 'Period-End Closing - Maintenance Orders'. ב-S/4HANA פריט הפישוט 'S4TWL - Technical Changes in " +
      "Controlling' קובע ש-COEP, ‏COSP ו-COSS הוחלפו בתצוגות תאימות מעל היומן האוניברסלי, ו-'S4TWL - Technical " +
      "Changes in Material Ledger' קובע ש-Material Ledger חובה.",
    steps: [
      {
        he: "לפני הריצה לוודא שתקופת ה-FI פתוחה ב-OB52 ושתקופת ה-MM (MMRV, ‏MMPV) מסונכרנת איתה; לפי תקרית " +
          "period-close-mmrv-ob52-mismatch אי-התאמה ביניהן מובילה לרישומים שנדחים או נרשמים לתקופה שגויה. לפי " +
          "עמוד התרחיש הרשמי, כשכמויות וערכים מתעדכנים ב-MM בנפרד, יש לוודא שכל תנועות הכמות הוערכו לפני " +
          "טרנזקציות הסגירה.",
        xrefs: ["tx:OB52", "tx:MMRV", "tx:MMPV"],
      },
      {
        he: "לנקות את אוכלוסיית הפקודות: לפי עמוד התרחיש הרשמי, פקודות בסטטוס LKD, ‏CLSD, ‏DLFL או DLT אינן " +
          "נבחרות, וסימון DLFL לפקודות שנמסרו או נסגרו טכנית, שחושבו להן סטיות ושאין צפי לעלויות המשך, משפר את " +
          "ביצועי טרנזקציות הסגירה. פקודות המקושרות לאוסף עלויות מוצר נסגרות ברמת האוסף (Product Cost by " +
          "Period).",
        xrefs: ["table:AUFK", "table:JEST", "obj:production-order", "obj:process-order"],
      },
      {
        he: "לפי הצורך: הקצאת תבנית והערכה מחדש בתעריפי פעילות בפועל (לפי רשימת הטרנזקציות הרשמית: CPTD ו-CPTA " +
          "לתבנית, CON2 ו-MFN1 להערכה מחדש). לפי עמוד התרחיש, כש-Actual Costing/Material Ledger פעיל והפרש " +
          "תעריף הפעילות מחויב בו ישירות לחומר, אין מריצים את Revaluation at Actual Prices.",
        xrefs: ["tx:CON2"],
      },
      {
        he: "חישוב תקורה בפועל: KGI2 לפקודת ייצור או תהליך בודדת; לפי רשימת הטרנזקציות הרשמית CO43 בעיבוד מרוכז " +
          "ו-CO42 לאוסף עלויות בודד. תנאי: Costing Sheet המשויך ל-Valuation Variant ודרכו ל-Costing Variant; " +
          "בפקודת ייצור נלקח ה-Costing Sheet מהפקודה. בצד התחזוקה, פריט ה-Scope ‏BF7 כולל מ-S/4HANA 2020 את " +
          "היישום Run Overhead Calculation - Actual ‏(F4857).",
        xrefs: ["tx:KGI2", "obj:maintenance-order"],
      },
      {
        he: "חישוב WIP לפקודות פתוחות: KKAX בודד ו-KKAO מרוכז (לפי רשומות המאגר וספריית ה-Fiori), KKAS לאוספי " +
          "עלויות מוצר. תנאים לפי העמוד הרשמי: Results Analysis Key בפקודה (000002 ל-WIP בעלות בפועל) ו-Cutoff " +
          "Period שמגן על WIP של תקופות קודמות. ב-Product Cost by Order ה-WIP מוערך בעלות בפועל: הפרש החיוב " +
          "והזיכוי של פקודה שלא נמסרה במלואה.",
        xrefs: ["tx:KKAX", "tx:KKAO", "tx:KKAS"],
      },
      {
        he: "חישוב סטיות לפקודות שנמסרו או נסגרו טכנית: KKS2 בודד ו-KKS1 מרוכז לפי רשומות המאגר (רשימת הטרנזקציות " +
          "הרשמית מונה גם את KKS5 ו-KKS6). תנאים: Variance Key, עלות תקן משוחררת (CK24) ו-Target Cost Version; " +
          "המערכת מסמנת VCAL בפקודות שחושבו, והסטיות מסווגות לקטגוריות.",
        xrefs: ["tx:KKS2", "tx:KKS1", "tx:CK24"],
      },
      {
        he: "התחשבנות, רק אחרי WIP וסטיות: CO88 מרוכז לפקודות ייצור, תהליך ואוספי עלות ו-KO88 לפקודה בודדת; " +
          "ב-S/4HANA גם CO88H מבוסס HANA לפי עמוד ההתחשבנות הרשמי. כלל ההתחשבנות, מבנה ההקצאה וה-Test Run " +
          "מתועדים בשיטת התחשבנות הפקודות ואינם משוכפלים כאן. בצד התחזוקה: KO88 לפי שיטת התחשבנות הפקודות, " +
          "והיישום Run Settlement - Actual (F4568) שעמוד What's New 2020 משייך לפריט ה-Scope BF7.",
        xrefs: ["tx:CO88", "tx:KO88", "table:COBRA", "table:COBRB", "bp:order-settlement-process"],
      },
      {
        he: "בדיקה אחרי ההתחשבנות: KOB1 לשורות בפועל ויתרה אפס בפקודה, KOB3 לאימות (לפי שיטת התחשבנות הפקודות), " +
          "S_ALR_87013611 למרכזי העלות המקבלים; ב-S/4HANA גם Display Settlement Documents ‏(F4597).",
        xrefs: ["tx:KOB1", "tx:KOB3", "tx:S_ALR_87013611"],
      },
      {
        he: "סגירת Material Ledger אחרי שכל הפקודות התחשבנו: CKMLCP, וניתוח חומר בודד ב-CKM3. לפי תקרית " +
          "material-ledger-closing-ckmlcp-error, פקודות שלא התחשבנו ב-CO88 לפני ה-ML הן אחת מסיבות הכשל.",
        xrefs: ["tx:CKMLCP", "tx:CKM3", "tx:CO88"],
      },
    ],
    antiPatterns: [
      "התחשבנות לפני חישוב WIP וסטיות: WIP נשאר פתוח אחרי TECO והסטיות חסרות (תקריות order-teco-wip " +
        "ו-variance-missing).",
      "סוג פקודה ללא Results Analysis Key כברירת מחדל: WIP אינו מחושב בסוף התקופה ועלות הקו נרשמת כמלאי גמור " +
        "(תקרית wip-not-calculated-period-end-kkao).",
      "שינוי ה-Routing של הפקודה ואז חישוב WIP: לפי עמוד התרחיש הרשמי חישוב ה-WIP בעלות יעד יוצא שגוי, והמערכת " +
        "אינה יכולה לחשב את סטיית הפחת כשה-Routing שונה.",
      "הרצת CKMLCP לפני שכל הפקודות התחשבנו ב-CO88.",
      "הרצת סגירת CO כשתקופות MM ו-FI אינן מסונכרנות (MMRV מול OB52).",
      "סגירה בלי Costing Sheet המשויך דרך Valuation Variant: אין בסיס לחישוב התקורה.",
    ],
    checks: [
      "חיובי: פקודת ייצור פתוחה עם Results Analysis Key מקבלת WIP ב-KKAX, וה-WIP עובר ל-FI בהתחשבנות.",
      "חיובי: פקודה שנמסרה, KKS2 מסמן VCAL ומציג סטיות לפי קטגוריה, ו-CO88 מעביר אותן ל-CO-PA.",
      "שלילי: פקודה בסטטוס CLSD או LKD אינה נבחרת בריצות הסגירה.",
      "שלילי: סוג פקודה ללא RA Key מחזיר ב-KKAO הודעה ואפס WIP.",
      "אינטגרציה: אחרי CO88 יתרת הפקודה אפס ב-KOB1, ו-CKMLCP רץ בלי שגיאת פקודות שלא התחשבנו.",
      "רגרסיה ב-S/4HANA: דוחות שקוראים את COSP ו-COSS מחזירים את אותם ערכים דרך תצוגות התאימות מעל ACDOCA.",
    ],
    process: {
      purpose: "לסגור את התקופה בבקרת העלויות של פקודות ייצור, תהליך ותחזוקה: להעמיס תקורה, להעריך WIP לפקודות " +
        "פתוחות, לחשב ולסווג סטיות לפקודות שהסתיימו ולהתחשבן ל-FI, ‏CO-PA, ‏Material Ledger ולמקבלי CO, כך " +
        "שעלות המוצר, המלאי והרווחיות של התקופה שלמים.",
      trigger: [
        {
          he: "סוף תקופה חשבונאית: ריצות מרוכזות, ולפי העמודים הרשמיים אפשר לתזמן אותן ב-Schedule Manager ולתקן " +
            "שגיאות ב-Multilevel Worklist.",
          xrefs: ["tx:KKAO", "tx:KKS1", "tx:CO88"],
        },
        {
          he: "בצד התחזוקה: לפי עמוד What's New של 1610, פריט ה-Scope BF7 מבוצע כשלב המשך, לצורך התחשבנות, סגירה " +
            "ודיווח, אחרי שהעלות נרשמה בפקודות התחזוקה, ותומך בפריטים Preventive Maintenance ‏(BJ2) " +
            "ו-Corrective Maintenance ‏(BH1).",
          xrefs: ["obj:maintenance-order", "bp:maintenance-order-process"],
        },
      ],
      preconditions: [
        {
          he: "תקופת FI פתוחה ותקופת MM מסונכרנת.",
          xrefs: ["tx:OB52", "tx:MMRV", "tx:MMPV"],
        },
        {
          he: "אישורים ותנועות חומר של התקופה נרשמו, לפי סדר הסגירה ברשומת tx-intel של CO88.",
          xrefs: ["bp:confirmation-process", "bp:goods-movement-process"],
        },
        {
          he: "ל-WIP: Results Analysis Key, ‏Results Analysis Version, שיטת הערכה, Posting Rules ו-Cutoff Period " +
            "(העמוד הרשמי; תקרית wip-not-calculated-period-end-kkao).",
        },
        {
          he: "לסטיות: Variance Key, ‏Target Cost Version ועלות תקן משוחררת.",
          xrefs: ["tx:CK24"],
        },
        {
          he: "לתקורה: Costing Sheet המשויך ל-Valuation Variant ודרכו ל-Costing Variant.",
        },
        {
          he: "להתחשבנות: לפי עמוד ההתחשבנות הרשמי, Default Rule ‏PP1 (Production Material Full Settlement) בסוג " +
            "הפקודה ב-Product Cost by Order, ופרופיל התחשבנות עם Allocation Structure ו-PA Transfer Structure.",
          xrefs: ["table:COBRA", "table:COBRB", "bp:order-settlement-process"],
        },
      ],
      masterData: [
        {
          he: "סוג פקודה עם ערכי ברירת מחדל: Results Analysis Key, ‏Variance Key, ‏Costing Variant ו-Default Rule " +
            "‏(PP1 או PP2).",
        },
        {
          he: "Costing Sheet, ‏Overhead Group בחומר ו-Overhead Key ב-Costing Sheet, ‏Valuation Variant.",
        },
        {
          he: "עלות תקן משוחררת לחומר.",
          xrefs: ["tx:CK11N", "tx:CK24"],
        },
        {
          he: "Settlement Profile, ‏Allocation Structure, ‏PA Transfer Structure ו-Settlement Cost Elements.",
          xrefs: ["bp:order-settlement-process"],
        },
      ],
      roles: [
        {
          he: "Cost Accountant - Overhead ‏(SAP_BR_OVERHEAD_ACCOUNTANT): היישומים Run Settlement - Actual, ‏Run " +
            "Overhead Calculation - Actual ו-Display Settlement Documents לפי ספריית ה-Fiori (S32OP).",
        },
        {
          he: "Cost Accountant - Production ‏(SAP_BR_PRODN_ACCOUNTANT) ו-Maintenance Planner " +
            "‏(SAP_BR_MAINTENANCE_PLANNER): תפקידי היישום Schedule Product Costing Jobs ‏(F3683) לפי ספריית " +
            "ה-Fiori, בקטלוגים SAP_EAM_BC_WORKORD_MNG ('EAM - Work Order Management') ו-SAP_SFIN_BC_PRD_EB_PED " +
            "('Production Cost Accounting - Period End Activities for Event-Based Solution'); הספרייה מונה את " +
            "התפקידים ואת הקטלוגים ברשימות נפרדות ואינה משייכת קטלוג לתפקיד.",
        },
        {
          he: "לפי רשומות המאגר: Product Cost Controller, רואה חשבון עלויות וצוות סגירה מריצים את KKS1 ו-CO88.",
          xrefs: ["tx:KKS1", "tx:CO88"],
        },
      ],
      transactions: [
        {
          he: "הכנה: OB52 תקופות FI; MMRV ו-MMPV תקופות MM.",
          xrefs: ["tx:OB52", "tx:MMRV", "tx:MMPV"],
        },
        {
          he: "הערכה מחדש בתעריפים בפועל: CON2 (אופציונלי).",
          xrefs: ["tx:CON2"],
        },
        {
          he: "תקורה: KGI2 לפקודה; CO43 מרוכז ו-CO42 לאוסף עלויות לפי הרשימה הרשמית (אינן במילון הפרויקט).",
          xrefs: ["tx:KGI2"],
        },
        {
          he: "WIP: KKAX בודד, KKAO מרוכז, KKAS לאוסף עלויות; Cutoff Period ב-KKA0 לפי הרשימה הרשמית (אינה במילון " +
            "הפרויקט).",
          xrefs: ["tx:KKAX", "tx:KKAO", "tx:KKAS"],
        },
        {
          he: "סטיות: KKS2 בודד, KKS1 מרוכז; KKS5 ו-KKS6 לפי הרשימה הרשמית (אינן במילון הפרויקט).",
          xrefs: ["tx:KKS2", "tx:KKS1"],
        },
        {
          he: "התחשבנות: CO88 מרוכז ו-KO88 בודד; CO88H מבוסס HANA ב-S/4HANA (אינה במילון הפרויקט).",
          xrefs: ["tx:CO88", "tx:KO88"],
        },
        {
          he: "בקרה: KOB1, ‏KOB3, ‏S_ALR_87013611; Material Ledger: ‏CKMLCP ו-CKM3.",
          xrefs: ["tx:KOB1", "tx:KOB3", "tx:S_ALR_87013611", "tx:CKMLCP", "tx:CKM3"],
        },
        {
          he: "Fiori ב-S/4HANA: F4857 Run Overhead Calculation - Actual, ‏F4568 Run Settlement - Actual, ‏F4597 " +
            "Display Settlement Documents; אינם בקטלוג ה-Fiori של הפרויקט ולכן אינם מקושרים. KGI2, ‏KKAO, " +
            "‏KKAX, ‏KKS1, ‏KKS2, ‏KO88 ו-CO88 רשומות בספריית ה-Fiori כיישומי SAP GUI במהדורה S32OP.",
        },
      ],
      tables: [
        {
          he: "AUFK כותרת הפקודה; JEST סטטוסים (VCAL, ‏DLFL, ‏CLSD, ‏LKD).",
          xrefs: ["table:AUFK", "table:JEST"],
        },
        {
          he: "COSP ו-COSS סכומי עלות; ב-S/4HANA תצוגות תאימות מעל היומן האוניברסלי (ACDOCA).",
          xrefs: ["table:COSP", "table:COSS", "table:ACDOCA"],
        },
        {
          he: "COBRA ו-COBRB כלל ההתחשבנות.",
          xrefs: ["table:COBRA", "table:COBRB"],
        },
        {
          he: "COEP (שורות CO בפועל) ו-CKMLPP (נתוני Material Ledger) נוקבות ברשומות המאגר אך אינן במילון הפרויקט " +
            "ולכן מופיעות בפרוזה בלבד.",
        },
        {
          he: "האובייקטים העסקיים פקודת ייצור, הזמנת תהליך ופקודת תחזוקה.",
          xrefs: ["obj:production-order", "obj:process-order", "obj:maintenance-order"],
        },
      ],
      integrationPoints: [
        {
          he: "PP ו-PP-PI: אישורים ותנועות חומר יוצרים את העלות בפועל בפקודות.",
          xrefs: ["bp:confirmation-process", "bp:production-order-process", "bp:process-order-process"],
        },
        {
          he: "CO-OM: הערכה מחדש בתעריפי פעילות בפועל מעבירה הפרשי תעריף ממרכזי העלות לפקודות; S_ALR_87013611 " +
            "לבדיקת המקבלים.",
          xrefs: ["tx:CON2", "tx:S_ALR_87013611"],
        },
        {
          he: "FI ו-EC-PCA: רישומי WIP והפרשי מחיר בהתחשבנות.",
          xrefs: ["tx:CO88"],
        },
        {
          he: "CO-PA: סטיות לפי קטגוריות עם מקבל Profitability Segment.",
          xrefs: ["tx:KE24", "table:COBRB"],
        },
        {
          he: "Material Ledger: יתרת הפקודה והסגירה ב-CKMLCP.",
          xrefs: ["tx:CKMLCP"],
        },
        {
          he: "PM: פקודות תחזוקה בפריט ה-Scope ‏BF7, התחשבנות למרכז עלות לפי שיטת התחשבנות הפקודות.",
          xrefs: ["obj:maintenance-order", "bp:maintenance-order-process", "bp:order-settlement-process"],
        },
      ],
      interfaces: [
        {
          he: "מודולי הפונקציה K_ORDER_SETTLEMENT, ‏K_COSTS_READ ו-K_SETTLEMENT_RULE_READ לפי רשומת התחום " +
            "pppi-settlement.",
          xrefs: ["fm:K_ORDER_SETTLEMENT", "fm:K_COSTS_READ", "fm:K_SETTLEMENT_RULE_READ"],
        },
        {
          he: "שירותי ה-OData של היישומים לפי ספריית ה-Fiori: UI_FCO_ACTL_SETTLEMENT_O2 ‏(F4568) " +
            "ו-UI_FCO_OVERHEAD_CALC_O2 ‏(F4857). אלה שירותי UI של היישומים; API משוחרר לסגירת תקופה לא אותר.",
        },
      ],
      outputs: [
        {
          he: "תקורה בפועל שהועמסה על הפקודות.",
          xrefs: ["tx:KGI2"],
        },
        {
          he: "WIP: לפי העמוד הרשמי ההתחשבנות מחייבת את חשבון המלאי בתהליך (מאזן) ומזכה את חשבון שינוי המלאי " +
            "(רווח והפסד), מבטלת WIP לסחורה שנכנסה למלאי, ומעבירה גם ל-EC-PCA.",
          xrefs: ["tx:KKAO", "tx:CO88"],
        },
        {
          he: "סטיות לפי קטגוריות (למשל Input Quantity ו-Resource-Usage) בפקודה, וסטטוס VCAL.",
          xrefs: ["tx:KKS2"],
        },
        {
          he: "יתרת הפקודה: לחשבון הפרשי מחיר או לחשבון מלאי לפי סימון בקרת המחיר, ל-Material Ledger כשהוא פעיל, " +
            "והסטיות לפי Target Cost Version 0 ל-CO-PA לפי קטגוריות.",
          xrefs: ["tx:CO88"],
        },
        {
          he: "מסמכי התחשבנות ומסמכי FI ו-CO; ב-S/4HANA שורות ב-Universal Journal.",
          xrefs: ["tx:CO88", "table:ACDOCA"],
        },
      ],
      exceptions: [
        {
          he: "WIP לא חושב בסוף התקופה: Results Analysis Key חסר, RA Version או שיטת הערכה לא הוגדרו, או סטטוס " +
            "פקודה שגוי (תקרית wip-not-calculated-period-end-kkao).",
          xrefs: ["tx:KKAO", "tx:KKAX"],
        },
        {
          he: "סטיות לא מחושבות: עלות תקן לא משוחררת, Target Cost Version חסר או Variance Variant לא מוגדר (תקרית " +
            "variance-missing).",
          xrefs: ["tx:KKS2", "tx:CK24"],
        },
        {
          he: "TECO משאיר WIP פתוח והתחשבנות שגויה (תקרית order-teco-wip).",
          xrefs: ["tx:KKAX"],
        },
        {
          he: "ההתחשבנות ל-CO-PA נכשלת: כלל ללא מקבל PSG, ‏COBRB לא שלם או פרופיל שאינו מתיר CO-PA (תקרית " +
            "settlement-to-copa-fails-cobrb).",
          xrefs: ["tx:CO88", "table:COBRB", "tx:KE24"],
        },
        {
          he: "ההתחשבנות נכשלת בגלל כלל חסר, תקופה סגורה או סטטוס CLSD / LKD (תקרית settlement-error, ראו שיטת " +
            "התחשבנות הפקודות).",
          xrefs: ["tx:KO88", "bp:order-settlement-process"],
        },
        {
          he: "CKMLCP נכשל: פקודות לא התחשבנו לפני ה-ML (תקרית material-ledger-closing-ckmlcp-error).",
          xrefs: ["tx:CKMLCP"],
        },
        {
          he: "תקופות MM ו-FI לא מסונכרנות (תקרית period-close-mmrv-ob52-mismatch).",
          xrefs: ["tx:MMRV", "tx:OB52"],
        },
      ],
      controls: [
        {
          he: "סדר קבוע: תקורה, WIP, סטיות, התחשבנות, ואחריהם Material Ledger (רשומת tx-intel של CO88; תקרית " +
            "material-ledger-closing-ckmlcp-error).",
          xrefs: ["tx:KGI2", "tx:KKAO", "tx:KKS1", "tx:CO88", "tx:CKMLCP"],
        },
        {
          he: "Test Run לפני עדכון: לפי העמוד הרשמי חישוב התקורה ניתן להדמיה, ולפי רשומת tx-intel גם CO88 תומך " +
            "ב-Test Run.",
          xrefs: ["tx:KGI2", "tx:CO88"],
        },
        {
          he: "Cutoff Period מגן על WIP של תקופות שכבר נרשמו (העמוד הרשמי).",
        },
        {
          he: "סטטוס VCAL לבחירת הפקודות שחושבו להן סטיות, וסימון DLFL לפקודות שהסתיימו.",
          xrefs: ["table:JEST"],
        },
        {
          he: "ניהול הודעות מוגדר משתמש קובע אילו הודעות חוסמות התחשבנות של WIP ופחת; Multilevel Worklist מריץ " +
            "שוב רק את האובייקטים שנכשלו (העמודים הרשמיים).",
        },
        {
          he: "יתרה אפס בפקודה אחרי ההתחשבנות.",
          xrefs: ["tx:KOB1"],
        },
      ],
      eccToS4: [
        {
          he: "ECC: עמוד התרחיש 'Period-End Closing in Product Cost by Order: Scenario' קיים בתיעוד SAP ERP 6.0 " +
            "EHP8 ‏(6.18.latest, רכיב CO-PC-OBJ) באותו loio; רשומת החיפוש מחזירה את אותו loio כמו עמוד S/4HANA " +
            "2025 FPS01, אך גוף עמוד ה-ERP לא נקרא ולכן לא הושווה.",
        },
        {
          he: "S/4HANA: לפי עמוד ההתחשבנות הרשמי, CO88H ו-VA88H מבצעים עיבוד מרוכז מבוסס HANA עם קריטריוני הבחירה " +
            "העיקריים, ו-CO88 ו-VA88 נותרו לבחירה מורחבת.",
          xrefs: ["tx:CO88", "tx:VA88"],
        },
        {
          he: "S/4HANA: 'S4TWL - Technical Changes in Controlling' קובע ש-COEP, ‏COSP ו-COSS הוחלפו בתצוגות " +
            "תאימות באותו שם והטרנזקציות הקלאסיות ממשיכות לרוץ; 'S4TWL - Data Model Changes in FIN' קובע " +
            "שטבלאות הסיכום הוחלפו בתצוגות DDL באותו שם.",
          xrefs: ["table:COSP", "table:COSS", "table:ACDOCA"],
        },
        {
          he: "S/4HANA: 'S4TWL - Technical Changes in Material Ledger' קובע ש-Material Ledger חובה ופעיל " +
            "אוטומטית, ו-Actual Costing נותר אופציונלי.",
          xrefs: ["tx:CKMLCP"],
        },
        {
          he: "S/4HANA: 'S4TWL - Summarization Hierarchies in Controlling' מסמן את KKRC ו-KKBC_HOE כלא זמינות; " +
            "KKBC_HOE_H מצרפת בזמן ריצה ודורשת הרצת KKS1 או KKS1H לפניה.",
          xrefs: ["tx:KKS1"],
        },
        {
          he: "S/4HANA: לפי What's New 2020, פריט ה-Scope ‏BF7 כולל את Run Settlement - Actual, ‏Run Overhead " +
            "Calculation - Actual ו-Display Settlement Documents; ספריית ה-Fiori רושמת אותם מ-S18OP ‏(2020) עד " +
            "S32OP.",
        },
      ],
      migration: [
        {
          he: "קוד לקוח: פריט 'S4TWL - Technical Changes in Controlling' מורה להחליף גישה דרך תצוגות התאימות " +
            "בגישה ישירה ל-ACDOCA לסוגי ערך 04 ו-11.",
          xrefs: ["table:COSP", "table:COSS"],
        },
        {
          he: "תפקידים: 'S4TWL - Summarization Hierarchies in Controlling' מורה להחליף ב-KKBC_HOE_H את KKBC_HOE " +
            "ו-KKRC בתפקידים הקיימים.",
        },
        {
          he: "Material Ledger מופעל בהגירה אם אינו פעיל; מפעלים שנוספים אחר כך מופעלים ידנית ב-OMX1 (לפי פריט " +
            "ה-ML).",
        },
        {
          he: "בדיקות לאחר המרה לפי רשומת התחום pppi-variance: חישוב וסיווג סטיות, CO-PA ו-ACDOCA.",
          xrefs: ["tx:KKS2", "tx:CO88"],
        },
      ],
      reference: {
        title: "Period-End Closing in Product Cost by Order: Scenario | Controlling (CO) (SAP S/4HANA On-Premise " +
          "2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/4215435310cfd873e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התרחיש הרשמי של סגירת התקופה ב-Product Cost by Order (loio 4215435310cfd873e10000000a4450e5, " +
          "‏2025.001), גוף העמוד נקרא דרך sap-help-body. לצד התחזוקה, עמוד What's New 2020 נוקב בפריט ה-Scope " +
          "‏BF7 'Period-End Closing - Maintenance Orders'; עמוד פריט ה-Scope עצמו ב-SAP Best Practices Explorer " +
          "לא נקרא.",
      },
    },
    xrefs: [
      "tx:OB52", "tx:MMRV", "tx:MMPV", "tx:CON2", "tx:KGI2", "tx:KKAX", "tx:KKAO", "tx:KKAS", "tx:KKS1", "tx:KKS2",
      "tx:CK24", "tx:CO88", "tx:KO88", "tx:VA88", "tx:KOB1", "tx:KOB3", "tx:S_ALR_87013611", "tx:CKMLCP", "tx:CKM3",
      "tx:KE24", "table:AUFK", "table:JEST", "table:COSP", "table:COSS", "table:COBRA", "table:COBRB",
      "fm:K_ORDER_SETTLEMENT", "fm:K_COSTS_READ", "fm:K_SETTLEMENT_RULE_READ", "obj:production-order",
      "obj:process-order", "obj:maintenance-order", "bp:order-settlement-process", "bp:production-order-process",
      "bp:process-order-process", "bp:maintenance-order-process", "bp:confirmation-process",
      "bp:goods-movement-process",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Period-End Closing in Product Cost by Order: Scenario | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/4215435310cfd873e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 4215435310cfd873e10000000a4450e5, נקרא ב-sap-help-body) מונה את פונקציות הסגירה: " +
          "Template allocation, Revaluation at actual prices, Overhead calculation, Preliminary settlement for " +
          "co-products, WIP calculation, Variance calculation ו-Settlement; קובע שפקודות נכללות רק כשהסטטוס " +
          "אינו LKD, ‏CLSD, ‏DLFL או DLT; ש-WIP מחושב 'for each manufacturing order that has a valid results " +
          "analysis key'; שבחישוב הסטיות 'the system sets the status VCAL'; ושבהתחשבנות 'the total variances " +
          "calculated with target cost version 0 are normally transferred to Profitability Analysis (CO-PA) " +
          "broken down into variance categories'. העמוד מזהיר ששינוי Routing משבש WIP בעלות יעד וחישוב פחת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Transaction Codes in Cost Object Controlling | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/ebc64252eaa43507e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio ebc64252eaa43507e10000000a441470) מונה, בהסתייגות 'The list is not necessarily " +
          "complete': CO42 ו-CO43 לחישוב תקורה בפועל (בודד לאוסף עלויות, מרוכז), KGI2 'Actual overhead " +
          "calculation: order', KKAS ו-KKAX לחישוב WIP בודד (אוסף עלויות; פקודות ייצור ותהליך), KKS5 ו-KKS6 " +
          "ו-KKS2 לחישוב סטיות, KK87, ‏CO88 ו-KO88 להתחשבנות, CPTD ו-CPTA להקצאת תבנית, CON2 ו-MFN1 להערכה " +
          "מחדש. העמוד מדפיס 'KKA0' הן ל-'Change cutoff period' והן ל-'WIP calculation - collective processing'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settlement in Product Cost by Order or Period | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/5c35d85275c8d142e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 5c35d85275c8d142e10000000a4450e5) קובע: 'SAP HANA uses only the most important " +
          "selection criteria thus simplifiying and accelerating the settlement process (CO88H, VA88H - " +
          "HANA-based collective processing)' ושאפשר להמשיך להשתמש ב-CO88 ו-VA88; שיתרת פקודה בחומר במחיר תקן " +
          "עוברת לחשבון הפרשי מחיר ובמחיר ממוצע נע למלאי; ש-'SAP recommends full settlement of manufacturing " +
          "orders for costing-based analysis at the level of production orders and process orders' עם Default " +
          "Rule PP1, ושלהתחשבנות לפי תקופה מגדירים בסוג הפקודה את 'default rule PP2 (Production Material " +
          "Periodic Settlement)'; ושבפרופיל ההתחשבנות מגדירים מקבלים מותרים, Allocation Structure ו-PA Transfer " +
          "Structure.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work in Process in Product Cost by Order | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/ebfe8c53d7d8ec23e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio ebfe8c53d7d8ec23e10000000a174cb4) קובע: 'In the Product Cost by Order component, " +
          "the work in process is valuated at actual cost'; שבהתחשבנות ל-FI 'The system debits the unfinished " +
          "goods account (balance sheet) and credits the inventory change account (income statement)'; שתנאי " +
          "ל-WIP בעלות בפועל הוא 'results analysis key 000002' לצד RA Version, שיטת הערכה ו-Posting Rules; " +
          "ושה-Cutoff Period מגן על נתוני התקופה הקודמת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Actual Overhead in Cost Object Controlling | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/04c51453ef02e40be10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 04c51453ef02e40be10000000a441470) קובע שחישוב תקורה חל על פקודות ייצור, הזמנות " +
          "תהליך, אוספי עלות, פריטי מסמכי מכירה והזמנות פנימיות; שתנאי הוא Costing Sheet המשויך ל-Valuation " +
          "Variant ודרכו ל-Costing Variant; ש-'Manufacturing orders: The system uses the costing sheet " +
          "specified in the manufacturing order'; ושאפשר 'simulate overhead allocation (test run)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Period-End Closing - Maintenance Orders (BF7) | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/5605ad92fa904076baaa291ca77ceb4c.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 5605ad92fa904076baaa291ca77ceb4c) נוקב ב-'Scope Item BF7 ( Period-End Closing - " +
          "Maintenance Orders )', 'Available As Of SAP S/4HANA 2020', ומונה שהפריט כולל את 'Run Settlement - " +
          "Actual' (התחשבנות עלויות בפועל מפרויקט, WBS או פקודת תחזוקה בודדת), 'Run Overhead Calculation - " +
          "Actual' ו-'Display Settlement Documents'. העמוד אינו נוקב במזהי היישומים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Period-End Closing - Maintenance Orders | What's New in SAP S/4HANA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "100",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4c6c3c99e6e94a92a626f424add61cba/291703ea414f40f29457dc1d7f570cd7.html?locale=en-US&state=PRODUCTION&version=100",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 291703ea414f40f29457dc1d7f570cd7) קובע: 'This scope item supports activities " +
          "required for the Preventive Maintenance (BJ2) and Corrective Maintenance (BH1) scope items' ו-'this " +
          "scope item is executed as a follow-up for Settlement, Closing, and Reporting', נוקב ב-'Technical " +
          "Name of Scope Item BF7' ובזמינות 'SAP S/4HANA 1610'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Period-End Closing in Product Cost by Order: Scenario | Cost Object Controlling (CO-PC-OBJ)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6fe2dad9dab7486fb4469d13552824f2/4215435310cfd873e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "רשומת החיפוש בסקופ SAP_ERP (6.0 EHP8, loio 4215435310cfd873e10000000a4450e5) מחזירה את אותו עמוד " +
          "תרחיש, עם הסניפט: 'The following provides an overview of the functions available for the period-end " +
          "closing process in the Product Cost by Order component. ... The Schedule Manager simplifies the " +
          "period-end closing activities'. גוף העמוד בגרסת ERP לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F4568 'Run Settlement - Actual', release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4568')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (fal-app) רושמת את F4568 'Run Settlement - Actual', ‏Transactional / SAP Fiori " +
          "elements, רכיב CO-OM, תפקיד SAP_BR_OVERHEAD_ACCOUNTANT ‏(Cost Accountant - Overhead), קטלוג " +
          "SAP_SFIN_BC_OH_PE_PSE, ‏OData UI_FCO_ACTL_SETTLEMENT_O2, זמין מ-S18OP ‏(2020) עד S32OP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F4857 'Run Overhead Calculation - Actual', release S32OP (S/4HANA " +
          "2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4857')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori רושמת את F4857 'Run Overhead Calculation - Actual', רכיב CO-OM, תפקיד " +
          "SAP_BR_OVERHEAD_ACCOUNTANT, ‏OData UI_FCO_OVERHEAD_CALC_O2, זמין מ-S18OP ‏(2020) עד S32OP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F4597 'Display Settlement Documents', release S32OP (S/4HANA 2025 " +
          "FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4597')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori רושמת את F4597 'Display Settlement Documents', רכיב CO-OM, תפקיד " +
          "SAP_BR_OVERHEAD_ACCOUNTANT, ‏OData UI_FCO_SETL_DOCUMENT_SRV, זמין מ-S18OP (2020) עד S32OP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F3683 'Schedule Product Costing Jobs', release S32OP (S/4HANA 2025 " +
          "FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3683')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori רושמת את F3683 'Schedule Product Costing Jobs', רכיב CO-FIO-OBJ-CL ‏(Closing), " +
          "תפקידים SAP_BR_MAINTENANCE_PLANNER ו-SAP_BR_PRODN_ACCOUNTANT ‏(Cost Accountant - Production), " +
          "קטלוגים SAP_EAM_BC_WORKORD_MNG 'EAM - Work Order Management' ו-SAP_SFIN_BC_PRD_EB_PED 'Production " +
          "Cost Accounting - Period End Activities for Event-Based Solution'; התפקידים והקטלוגים מופיעים ברשומה " +
          "ברשימות נפרדות, בלי שיוך של קטלוג לתפקיד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KKAX 'Calculate Work In Process - Order - Single' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KKAX')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KKAX כאפליקציה 'Calculate Work In Process - Order - " +
          "Single' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת ברשומת " +
          "tx:KKAX).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KGI2 'Run Overhead Calculation - Orders - Actual' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KGI2')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KGI2 כאפליקציה 'Run Overhead Calculation - Orders - " +
          "Actual' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת ברשומת " +
          "tx:KGI2).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KKAO 'Calculate Work in Process - Collective' (SAP GUI), release " +
          "S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KKAO')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KKAO כאפליקציה 'Calculate Work in Process - " +
          "Collective' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת " +
          "ברשומת tx:KKAO).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KKAS 'Calculate Work in Process - Product Cost Collectors' (SAP " +
          "GUI), release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KKAS')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KKAS כאפליקציה 'Calculate Work in Process - Product " +
          "Cost Collectors' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת " +
          "ברשומת tx:KKAS).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KKS1 'Run Variance Calculation - Orders - By Lot' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KKS1')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KKS1 כאפליקציה 'Run Variance Calculation - Orders - By " +
          "Lot' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת ברשומת " +
          "tx:KKS1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KKS2 'Run Variance Calculation - Order - Single' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KKS2')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KKS2 כאפליקציה 'Run Variance Calculation - Order - " +
          "Single' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת ברשומת " +
          "tx:KKS2).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KO88 'Run Actual Settlement - Order - Single, Run Actual " +
          "Settlement - Product Cost Collectors, Run Settlement - Maintenance Orders - Actual' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KO88')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KO88 כאפליקציה 'Run Actual Settlement - Order - " +
          "Single, Run Actual Settlement - Product Cost Collectors, Run Settlement - Maintenance Orders - " +
          "Actual' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת ברשומת " +
          "tx:KO88).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App CO88 'Settle Orders, Settle Orders - Optimized' (SAP GUI), release " +
          "S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CO88')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את CO88 כאפליקציה 'Settle Orders, Settle Orders - " +
          "Optimized' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת " +
          "ברשומת tx:CO88).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App KOB1 'Display Cost Line Items - Orders - Actual' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('KOB1')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את KOB1 כאפליקציה 'Display Cost Line Items - Orders - " +
          "Actual' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published' (אומת ברשומת " +
          "tx:KOB1).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.5.1 S4TWL - " +
          "TECHNICAL CHANGES IN CONTROLLING (CO-OM), p. 319, 320",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TB_15,
        claim: "פריט הפישוט 6.5.1 S4TWL - TECHNICAL CHANGES IN CONTROLLING (Application Component: CO-OM), שנקרא " +
          "ישירות מקובץ ה-PDF, קובע בעמ' 319: 'In SAP S/4 HANA the totals records for primary and secondary " +
          "costs have been removed and the universal journal includes all actual cost postings, both primary " +
          "and secondary', ובעמ' 320: 'The former tables COEP, COSP, and COSS are replaced by views of the same " +
          "name, so-called compatibility views, that aggregate the data in the universal journal on the fly in " +
          "accordance with the old table structures'. בפירוט הפריט: 'Actual data needed for long-term " +
          "orders/projects from COSP_BAK, COSS_BAK is stored in table ACDOCA', 'Value types other than 04 and " +
          "11 are still stored in COEP, COSP_BAK, COSS_BAK', ו-'From a business point of view, all classic " +
          "transactions are still running - based on compatibility views or using direct acces to ACDOCA'. " +
          "הפעולה הנדרשת בפריט: 'Please check your customer-specific programs using CO tables. Customer coding " +
          "should be adapted by replacing the access via compatibility views with direct access to ACDOCA for " +
          "value types 04 and 11', לצד האזהרה 'Using these views may have a performance impact on existing " +
          "reports and you are recommended to investigate whether the new Fiori reports meet your business " +
          "needs'. הפריט מפנה ל-Business Impact note 0002270404 ול-note 2185026 'Compatibility views COSP, " +
          "COSS, COEP, COVP: How do you optimize their use'; המספרים מצוטטים כלשונם מהמסמך הציבורי ולא נקראו " +
          "בפועל. (אומת ברשומת table:COSP)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 6.1.4 S4TWL - Data Model Changes in FIN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט (מתחיל בעמ' 159; הציטוט בעמ' 160 של הטקסט המחולץ ב-scratchpad/official) קובע ש-'totals and " +
          "application index tables were removed and replaced by identically-named DDL SQL views, called " +
          "compatibility views' וש-'The compatibility views ensure database SELECTs work as before'; בטבלת " +
          "ההחלפה באותו עמוד מופיעות COSP ו-COSS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 6.5.12 S4TWL - Summarization Hierarchies in Controlling",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט (עמ' 356, נקרא מהטקסט המחולץ ב-scratchpad/official) קובע: 'SAP S/4HANA offers a new " +
          "transaction KKBC_HOE_H that uses the hierarchy structure defined using transaction KKR0 but " +
          "aggregates the order values on the fly', ו-'You must run transaction KKS1 or KKS1H to calculate " +
          "target costs and variances before executing the new transaction'; KKRC ו-KKBC_HOE מסומנות " +
          "'Transaction not available in SAP S/4HANA on-premise edition 1511', והפעולה: 'Check your existing " +
          "roles to determine which include transaction KKBC_HOE and KKRC and replace by KKBC_HOE_H'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 6.5.6 S4TWL - Technical Changes in Material Ledger",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט (עמ' 330, נקרא מהטקסט המחולץ) קובע: 'This simplification makes it obligatory to use the " +
          "Material Ledger (ML) which is now part of the standard and automatically active in all SAP S/4HANA " +
          "systems', 'Actual Costing (including Actual Cost Component Split) is still optional', ושבמערכת מומרת " +
          "ה-ML מופעל בהגירה ומפעלים שנוספים אחר כך מופעלים ידנית ב-OMX1.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): רשומות CO88 ו-KKS1",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CO88: התחשבנות קולקטיבית של פקודות ייצור ואוספי עלות, WIP ל-FI וסטיות ל-CO-PA, תלויה ב-Settlement " +
          "Profile, Allocation Structure ו-PA Transfer Structure, תומכת ב-Test Run; סדר הסגירה: 'confirmations " +
          "→ overhead → WIP (KKAO) → variance (KKS1) → settlement (CO88)'. KKS1: חישוב סטיות קולקטיבי, דורש " +
          "DLV/TECO ו-Target Cost Version, רץ אחרי WIP ולפני ההתחשבנות; KKS2 בודד; משתמשים: Product Cost " +
          "Controller, רואה חשבון עלויות, צוות סגירה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך הטרנזקציות של הפרויקט: KKAO, KKAX, KKS2",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KKAO 'חישוב WIP מרוכז', KKAX 'חישוב WIP בודד', KKS2 'חישוב סטיות בודד'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-directory.ts#KKAO",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של הפרויקט: KGI2, KKAO, KKAS, KKAX",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KGI2 'Actual Overhead: Order' ('תקורה בפועל: הזמנה'); KKAO 'WIP Calculation: Collective " +
          "Processing'; KKAS 'Calculate Work in Process - Product Cost Collectors' ('חישוב עבודה בתהליך (WIP) " +
          "לאוספי עלויות מוצר'); KKAX 'Calculate Work In Process - Order - Single' ('חישוב עבודה בתהליך (WIP) " +
          "לפקודה בודדת').",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#KKAX",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'התחשבנות פקודת ייצור' של הפרויקט (DOMAINS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "pppi-settlement: טבלאות AUFK, COBRB, COSS, COSP, CKMLPP; זרימה צבירת עלות, WIP, סטיות " +
          "(KKS1/KKS2), התחשבנות (CO88/KO88), רישום ל-ACDOCA; פונקציות K_ORDER_SETTLEMENT, " +
          "K_SETTLEMENT_RULE_READ, K_COSTS_READ; WIP בפקודות פתוחות וסטיות בסגורות.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-settlement",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום 'ניתוח סטיות' של הפרויקט (DOMAIN_DETAIL): pppi-variance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "pppi-variance: נתוני אב Target Cost Version (0), Variance Variant, עלות תקן משוחררת; הגירה " +
          "'COSS/KEKO נשמרים; שקיפות ב-ACDOCA. QA: ודא חישוב+סיווג סטיות לאחר המרה'; ובשדה eccS4 של הרשומה: " +
          "'QA: סטיות + CO-PA + ACDOCA'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-variance",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: wip-not-calculated-period-end-kkao, settlement-to-copa-fails-cobrb, " +
          "material-ledger-closing-ckmlcp-error, period-close-mmrv-ob52-mismatch",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "WIP לא חושב (KKAO/KKAX): RA Key חסר, RA Version או שיטת הערכה לא מוגדרים, סטטוס שגוי; מניעה 'KKAO " +
          "לפני CO88'. התחשבנות ל-CO-PA נכשלת: כלל ללא PSG, ‏COBRB לא תקין, פרופיל או מבנה הקצאה; ניתוח ב-CO88, " +
          "KO88, KKS1, KKAO, KE24. CKMLCP נכשל: 'הזמנות לא סולקו (CO88) לפני ML', ניתוח גם ב-CKM3. אי-התאמת " +
          "MMRV מול OB52 מובילה לרישומים שנדחים או לתקופה שגויה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#wip-not-calculated-period-end-kkao",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: variance-missing",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סטיות לא מחושבות: עלות תקן לא משוחררת, Target Cost Version חסר, Variance Variant לא מוגדר או " +
          "סטטוס פקודה (תיקון CK11N/CK24).",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#variance-missing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: order-teco-wip",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "TECO משאיר WIP פתוח: RA Key, אישורים חלקיים או סטטוס; תיקון KKAX ואז התחשבנות; מניעה: סדר WIP, " +
          "סטיות, התחשבנות.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#order-teco-wip",
      },
      {
        sourceType: "repository",
        sourceTitle: "זרימת התהליך של תעשיות תהליכיות במאגר: שלב s11 (חישוב סטיות)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "s11: חישוב סטיות ב-KKS1 (COSS, COSP, KEKO), פלט 'סטיות מסווגות לקטגוריות (ו/או WIP לפקודות " +
          "פתוחות)', השלב הבא התחשבנות; טעויות: עלות תקן לא משוחררת (CK24) או Target Cost Version, ‏WIP שגוי " +
          "בגלל RA Key או סטטוס.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-process-flow.ts#s11",
      },
      {
        sourceType: "repository",
        sourceTitle: "שיטת העבודה 'התחשבנות פקודות' של הפרויקט (bp:order-settlement-process)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הרשומה מתעדת את כלל ההתחשבנות (COBRA/COBRB), סטטוסי JEST, ‏KO88, ‏CO88 ו-KO8G, ‏Test Run, יתרה " +
          "אפס ב-KOB1, אימות ב-KOB3, תקריות settlement-error, variance-missing ו-order-teco-wip, ואת רישום " +
          "ההתחשבנות ב-ACDOCA; רשומה זו מקשרת אליה ואינה משכפלת את שלביה.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/cross-processes-2.ts#order-settlement-process",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): KOB1 ו-S_ALR_87013611",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KOB1: דוח שורות בפועל להזמנות מעל COEP עם מעבר למסמך המקור, לאימות לפני ואחרי הסדרה; ב-S/4 " +
          "הנתונים מ-ACDOCA דרך תאימות. S_ALR_87013611: דוח מרכזי עלות תכנון מול בפועל ופערים, קורא COSP/COSS.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#KOB1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (Production Planning with SAP S/4HANA), פרק 6, סעיף 6.10 'Settlement " +
          "and Completion'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סעיף ההתחשבנות והסגירה של פקודת הייצור בייצור בדיד; הפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#6.10",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 2 בספריית הפרויקט (Production Planning with SAP S/4HANA), פרק 8, סעיף 8.9 'Costing " +
          "Activities (Cost Object Controlling)'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סעיף פעילויות התמחיר ב-Cost Object Controlling בייצור חוזר; הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book2.json#8.9",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט (SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide), פרק 2 " +
          "Controlling, רשומות F4568 ו-F4857",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הספר מונה בפרק Controlling את Run Settlement - Actual ‏(F4568), ‏Run Overhead Calculation - " +
          "Actual ‏(F4857) ו-Display Settlement Documents ‏(F4597); הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F4568",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (Plant Maintenance with SAP S/4HANA: Business User Guide), פרק 6, " +
          "סעיף 6.8.6 'Settlement'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סעיף ההתחשבנות של פקודת התחזוקה; הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#6.8.6",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "רשומת תהליך חוצת מודולים (PP, PP-PI, PM מול CO). מקשרת אל bp:order-settlement-process ואינה משכפלת את " +
      "פירוט כלל ההתחשבנות. חיפושים רשמיים (help.sap.com, 2026-09-24): 'Period-End Closing Product Cost by " +
      "Order', 'Work in Process product cost by order', 'Variance Calculation product cost by order', 'Overhead " +
      "calculation orders period-end closing', 'Settlement production order period-end', 'period-end closing " +
      "maintenance orders', 'Period-End Closing Maintenance Orders BF7' (21 רשומות כל אחד), ו-'Period-End " +
      "Closing in Product Cost by Order' בסקופ SAP_ERP (21 רשומות). פערים גלויים: kpis הושמט, אין מקור שמגדיר " +
      "מדדים; אין תצוגת CDS מאומתת לסגירת תקופה במילון הפרויקט. סתירות: הרשימה הרשמית מדפיסה 'KKA0' גם ל-Cutoff " +
      "Period וגם ל-WIP מרוכז, בעוד המאגר וספריית ה-Fiori משייכים את ה-WIP המרוכז ל-KKAO; ההכרעה ב-SE93 במערכת " +
      "היעד. הרשימה הרשמית מונה KKS5 לסטיות מרוכזות ואינה מונה את KKS1, שהמאגר מתאר כחישוב מרוכז וספריית " +
      "ה-Fiori קוראת לו 'Run Variance Calculation - Orders - By Lot'. היסטוריה (Old → New): קטלוג הטרנזקציות של " +
      "המאגר תיאר את KKAX כ-'WIP Calculation for Product Cost Collector' ואת KKAS כ-'WIP Calculation: " +
      "Collective Processing (Sales Order)', בניגוד לרשימה הרשמית ולספריית ה-Fiori; ב-2026-09-24 הכותרות תוקנו " +
      "במאגר לפי ספריית ה-Fiori ל-'Calculate Work In Process - Order - Single' ול-'Calculate Work in Process - " +
      "Product Cost Collectors', והסתירה הזו נסגרה. הטרנזקציות CO42, ‏CO43, ‏KKA0, ‏KKS5, ‏KKS6, ‏CO88H, " +
      "‏KKS1H, ‏KKBC_HOE_H, ‏CPTD, ‏CPTA, ‏MFN1 ו-OMX1 ויישומי ה-Fiori F4568, ‏F4857, ‏F4597 ו-F3683 אינם " +
      "במילון הפרויקט ומופיעים בפרוזה בלבד. פריטי ה-Scope BF7, ‏BJ2 ו-BH1 נוקבים בעמודי What's New ישנים (1610, " +
      "2020); עמוד SAP Best Practices Explorer לא נקרא. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ==================================================== logistics to finance */
  {
    slug: "logistics-to-finance-postings-process",
    he: "מרישום לוגיסטי למסמך חשבונאי (MATDOC ל-ACDOCA)",
    en: "Logistics postings into finance (material document to universal journal)",
    module: "Cross",
    summary: "תנועת סחורה (ניפוק לפקודה, קבלת תוצרת או קבלת טובין) יוצרת מסמך חומר, ואם היא רלוונטית לחשבונאות " +
      "נוצר במקביל מסמך חשבונאי שחשבונות ה-G/L שלו נקבעים בקביעת חשבונות אוטומטית. ב-ECC המסמכים נשמרו " +
      "ב-MKPF/MSEG וב-BKPF/BSEG לצד טבלאות סיכום ואינדקס; ב-S/4HANA מסמך החומר נשמר ב-MATDOC ורישום היומן נכתב " +
      "ליומן האוניברסלי (ACDOCA).",
    context: "לפי עמוד Document Concept בתיעוד Inventory Management של S/4HANA 2025 FPS01 (ובאותו נוסח בתיעוד ERP " +
      "6.0 EHP7), רישום תנועת סחורה יוצר מסמך חומר, ואם התנועה מעדכנת חשבונות G/L נוצר 'parallel to the " +
      "material document' מסמך חשבונאי; חשבונות ה-G/L מתעדכנים 'through an automatic account assignment', וקוד " +
      "החברה נגזר מאזור ההערכה של המפעל. עמוד Production Cost Posting in Financial Accounting מפרט את מפתחות " +
      "קביעת החשבונות BSX, ‏GBB (עם AUF) ו-PRD. בצד S/4HANA: פריט הפישוט 'S4TWL - DATA MODEL IN INVENTORY " +
      "MANAGEMENT (MM-IM)' קובע שמסמך החומר נשמר ב-MATDOC בלבד ו-MKPF/MSEG נקראות דרך CDS; פריט 'S4TWL - " +
      "Material Ledger Obligatory for Material Valuation' קובע ש-Material Ledger חובה ושדות הכמות והערך של MBEW " +
      "נשלפים מ-ACDOCA ומה-Material Ledger; פריט 'S4TWL - DATA MODEL CHANGES IN FIN' קובע שטבלאות הסיכום " +
      "והאינדקס של FI הוחלפו בתצוגות תאימות. לפי עמוד Universal Journal, היומן האוניברסלי הוא ספר הרישום המקורי " +
      "של FI ו-CO. שכבת ההשפעה של המאגר מסמנת את MATDOC ואת ACDOCA בסיכון גבוה לקוד מותאם.",
    steps: [
      {
        he: "לפני הרישום: לוודא שתקופת ה-MM פתוחה (MMRV, גלגול ב-MMPV) ומתואמת עם תקופת ה-FI ב-OB52; חוסר התאמה " +
          "דוחה את התנועה בהודעה M7053 לפי מרכז התקלות של המאגר.",
        xrefs: ["tx:MMRV", "tx:MMPV", "tx:OB52"],
      },
      {
        he: "לרשום את התנועה הלוגיסטית: ניפוק רכיבים לפקודה, קבלת תוצרת מפקודה או קבלת טובין להזמנת רכש, ב-MIGO " +
          "או דרך BAPI_GOODSMVT_CREATE; באישור פקודה התנועות נוצרות גם דרך Backflush וקבלה אוטומטית.",
        xrefs: ["tx:MIGO", "fm:BAPI_GOODSMVT_CREATE", "bp:goods-movement-process", "bp:confirmation-process"],
      },
      {
        he: "המערכת יוצרת מסמך חומר (כותרת ולפחות פריט אחד), המזוהה במספר מסמך ובשנת מסמך החומר. ב-ECC הוא נשמר " +
          "ב-MKPF וב-MSEG; ב-S/4HANA הוא נשמר ב-MATDOC (שאינה במילון הפרויקט), ו-MKPF/MSEG נקראות דרך תצוגות " +
          "CDS.",
        xrefs: ["table:MKPF", "table:MSEG", "obj:material-document", "bp:matdoc-read-through-compatibility"],
      },
      {
        he: "הערכה: ערך התנועה נגזר מנתוני הערכת החומר ב-MBEW (בקרת מחיר S במחיר תקן או V במחיר ממוצע נע). " +
          "ב-S/4HANA ה-Material Ledger חובה, ושדות הכמות והערך LBKUM, ‏SALK3 ו-SALKV נשלפים מ-ACDOCA ומטבלת " +
          "ה-Material Ledger ולא מתעדכנים עוד ב-MBEW.",
        xrefs: ["table:MBEW", "table:ACDOCA"],
      },
      {
        he: "קביעת חשבונות אוטומטית (OBYC) לפי מחלקת ההערכה ומפתח התנועה: BSX לחשבון המלאי, GBB עם קבוצת החשבונות " +
          "AUF לקבלה מפקודה (שינוי מלאי), PRD להפרשי מחיר. חשבון חסר מפיל את התנועה (M8147) או משאיר אותה בלי " +
          "מסמך FI.",
        xrefs: ["tx:OBYC", "table:MBEW"],
      },
      {
        he: "נוצר המסמך החשבונאי במקביל למסמך החומר (לעתים כמה מסמכים, למשל כשפריטים שייכים לקודי חברה שונים), עם " +
          "סוג מסמך לפי סוג האירוע (WE/WN לקבלה להזמנת רכש, WE לקבלה מפקודה, WA לניפוק ולהעברות, WL לניפוק " +
          "למשלוח). ב-ECC: BKPF/BSEG; ב-S/4HANA: רישום יומן ב-ACDOCA, ו-BKPF/BSEG נשמרות לפי רשומות המאגר.",
        xrefs: ["table:BKPF", "table:BSEG", "table:ACDOCA"],
      },
      {
        he: "השפעת ה-CO: ניפוק לפקודה מחייב את הפקודה בעלות בפועל בסוג עלות ראשי, וקבלת התוצרת מזכה אותה במחיר " +
          "התקן. ב-S/4HANA העלויות בפועל נשמרות ב-ACDOCA, ו-COSP/COSS הן תצוגות תאימות לפי פריט 'S4TWL - " +
          "TECHNICAL CHANGES IN CONTROLLING'.",
        xrefs: ["table:COSP", "table:COSS", "table:ACDOCA", "bp:order-settlement-process"],
      },
      {
        he: "לאמת את השרשרת: MB03 ‏(Environment, Accounting docs) מציג את המסמכים החשבונאיים של מסמך החומר; MB51 " +
          "לרשימת מסמכים; FB03 להצגת המסמך החשבונאי ו-FAGLL03 לפריטי חשבון ראשי. ב-S/4HANA: Material Documents " +
          "Overview ‏(F1077) ו-Display Journal Entries in T-Account View ‏(F3664).",
        xrefs: ["tx:MB03", "tx:MB51", "tx:FB03", "tx:FAGLL03"],
      },
      {
        he: "חריגות: הודעת הצלחה בלי מסמך חומר או FI מקורה במשימת Update שנכשלה; מתקנים את השורש וחוזרים על " +
          "ה-Update ב-SM13, לא רושמים מחדש. מסמך שנרשם אינו ניתן לשינוי: תיקון כמות או ביטול מחייבים מסמך חדש " +
          "(MBST).",
        xrefs: ["tx:SM13", "tx:MBST"],
      },
      {
        he: "סוף תקופה: לחומר בבקרת מחיר S, התחשבנות הפקודה רושמת את יתרת הפקודה להפרשי מחיר (PRD); בבקרת מחיר V " +
          "היתרה נרשמת למלאי, לפי עמוד Production Cost Posting in Financial Accounting. סגירת ה-Material Ledger " +
          "ב-CKMLCP מחייבת התחשבנות שהושלמה (CO88); ניתוח זרימת העלות לחומר ב-CKM3.",
        xrefs: ["tx:CO88", "tx:CKMLCP", "tx:CKM3", "bp:order-settlement-process"],
      },
    ],
    antiPatterns: [
      "מחלקת הערכה חדשה ללא שורות OBYC ל-BSX, ל-GBB (עם המודיפיקציה הנדרשת) ול-PRD: התנועה נכשלת ב-M8147 או נרשמת " +
        "בלי מסמך FI.",
      "גלגול תקופת MM ב-MMPV בלי לפתוח את התקופה המקבילה ב-OB52: קליטות וניפוקים נדחים ב-M7053.",
      "רישום חוזר ידני אחרי 'הצלחה' בלי מסמך, במקום בדיקה ב-SM13: מלאי ועלות כפולים.",
      "קוד Z שקורא BSIS/BSAS, ‏GLT0 או FAGLFLEXT לדיווח, או שכותב ל-MKPF, ‏MSEG או לשדות הערך של MBEW: ב-S/4HANA " +
        "אלה תצוגות תאימות: לפי 'S4TWL - DATA MODEL CHANGES IN FIN' הכתיבה הוסרה מהסטנדרט ויש להסירה מקוד " +
        "מותאם, ולפי פריטי MM-IM וה-Material Ledger כתיבה ל-MKPF/MSEG ולשדות הערך של MBEW דורשת התאמה.",
      "דוח עלויות ישן שקורא COEP במקום ACDOCA: אי-התאמה מול היומן האוניברסלי (תקרית acdoca-coep-mismatch).",
    ],
    checks: [
      "חיובי: ניפוק 261 לפקודה ב-MIGO; ב-MB03 דרך Environment, Accounting docs מופיע מסמך חשבונאי עם חשבון המלאי " +
        "(BSX) ושינוי המלאי.",
      "חיובי: קבלה 101 מפקודה לחומר במחיר תקן יוצרת רישום מלאי מול שינוי מלאי (GBB/AUF), והפקודה מזוכה במחיר התקן.",
      "שלילי: חומר עם מחלקת הערכה ללא שורת OBYC נכשל ב-M8147 ואינו יוצר מסמך FI.",
      "אינטגרציה: המסמך החשבונאי מוצג ב-FB03 ובפריטי החשבון הראשי (FAGLL03), וב-S/4HANA גם ב-F3664.",
      "לאחר המרה, לפי רשומות המאגר (matdoc-custom-code, acdoca-coep-mismatch): קוד מותאם שקורא MKPF, MSEG, BSIS " +
        "או COSP נסרק ומוסב ל-MATDOC, ל-ACDOCA או לתצוגות ה-CDS; לפי פריטי הפישוט קריאה מנותבת לתצוגות התאימות " +
        "וממשיכה לעבוד, והכתיבה היא שדורשת התאמה.",
    ],
    process: {
      purpose: "לתרגם כל שינוי מלאי בתהליכי הרכש, הייצור והתחזוקה לרישום חשבונאי מתואם: מסמך חומר כהוכחת התנועה, " +
        "ומסמך חשבונאי מקביל שמעדכן חשבונות G/L ואובייקטי CO, כך שערך המלאי בספרים תואם את הכמות במלאי.",
      trigger: [
        {
          he: "תנועת סחורה שמעדכנת מלאי מוערך: קבלת טובין להזמנת רכש, ניפוק לפקודה, קבלת תוצרת מפקודה, העברה או " +
            "ניפוק למשלוח.",
          xrefs: ["tx:MIGO", "bp:goods-movement-process"],
        },
        {
          he: "אישור פקודה שמפעיל Backflush וקבלה אוטומטית ויוצר את תנועות הסחורה.",
          xrefs: ["bp:confirmation-process"],
        },
      ],
      preconditions: [
        {
          he: "תקופת MM פתוחה ב-MMRV ותקופת FI מקבילה פתוחה ב-OB52.",
          xrefs: ["tx:MMRV", "tx:OB52"],
        },
        {
          he: "לחומר תצוגת הערכה (MBEW) עם מחלקת הערכה ובקרת מחיר; ב-S/4HANA ה-Material Ledger פעיל.",
          xrefs: ["table:MBEW"],
        },
        {
          he: "קביעת חשבונות מתוחזקת ב-OBYC לכל מפתח תנועה ומחלקת הערכה בשימוש (BSX, ‏GBB עם המודיפיקציה, PRD).",
          xrefs: ["tx:OBYC"],
        },
        {
          he: "המפעל משויך לאזור הערכה שממנו נגזר קוד החברה של המסמך החשבונאי.",
        },
      ],
      masterData: [
        {
          he: "נתוני הערכת חומר: מחלקת הערכה, בקרת מחיר S או V, מחיר תקן או ממוצע נע.",
          xrefs: ["table:MBEW"],
        },
        {
          he: "סוגי תנועה וסוגי אירוע (WE, ‏WF, ‏WA, ‏WL) הממופים לסוגי מסמך חשבונאי ולטווחי מספרים.",
        },
        {
          he: "חשבונות G/L וסוגי עלות ראשיים לחשבונות שינוי המלאי והצריכה.",
        },
      ],
      roles: [
        {
          he: "פקיד מחסן (SAP_BR_WAREHOUSE_CLERK) ומנהל מלאי (SAP_BR_INVENTORY_MANAGER): רישום ובקרה של מסמכי " +
            "חומר; לפי ספריית ה-Fiori שני התפקידים מקבלים את Material Documents Overview ‏(F1077) ואת Display " +
            "Journal Entries in T-Account View ‏(F3664).",
        },
        {
          he: "חשב ספר ראשי (SAP_BR_GL_ACCOUNTANT): הצגת המסמך החשבונאי ובדיקת ההשפעה על החשבונות, באותם יישומים " +
            "לפי ספריית ה-Fiori.",
        },
      ],
      transactions: [
        {
          he: "רישום: MIGO; ביטול: MBST; תקופות: MMRV, ‏MMPV, ‏OB52.",
          xrefs: ["tx:MIGO", "tx:MBST", "tx:MMRV", "tx:MMPV", "tx:OB52"],
        },
        {
          he: "הגדרה: OBYC לקביעת החשבונות; ב-S/4HANA ספריית ה-Fiori רושמת את היישום Account Determination " +
            "‏(F1273) שקוד הטרנזקציה המוביל שלו OBYC.",
          xrefs: ["tx:OBYC"],
        },
        {
          he: "בקרה בצד הלוגיסטי: MB03 הצגת מסמך חומר וניווט למסמכים החשבונאיים, MB51 רשימת מסמכי חומר; " +
            "ב-S/4HANA: Material Documents Overview ‏(F1077), שקוד הטרנזקציה המוביל שלו MB51.",
          xrefs: ["tx:MB03", "tx:MB51"],
        },
        {
          he: "בקרה בצד הכספי: FB03 הצגת מסמך (בספריית ה-Fiori: 'Display Document, Display Journal Entries', " +
            "יישום SAP GUI), ‏FAGLL03 ו-FBL3N פריטי חשבון ראשי; ב-S/4HANA גם Display Journal Entries in " +
            "T-Account View ‏(F3664).",
          xrefs: ["tx:FB03", "tx:FAGLL03", "tx:FBL3N"],
        },
        {
          he: "סוף תקופה: CO88 התחשבנות, CKMLCP סגירת Material Ledger, CKM3 ניתוח זרימת עלות לחומר; SM13 לעדכונים " +
            "שנכשלו.",
          xrefs: ["tx:CO88", "tx:CKMLCP", "tx:CKM3", "tx:SM13"],
        },
      ],
      tables: [
        {
          he: "מסמך החומר: ב-ECC ‏MKPF (כותרת) ו-MSEG (פריטים); ב-S/4HANA ‏MATDOC, ו-MKPF/MSEG נקראות דרך CDS " +
            "(מקורות DDL ‏NSDM_DDL_MKPF ו-NSDM_DDL_MSEG לפי פריט הפישוט).",
          xrefs: ["table:MKPF", "table:MSEG", "obj:material-document", "cds:I_MaterialDocumentItem"],
        },
        {
          he: "הערכה: MBEW רשומת האב של ההערכה; ב-S/4HANA שדות הכמות והערך נשלפים מ-ACDOCA ומה-Material Ledger. " +
            "מלאי במחסן: MARD; ב-S/4HANA הטבלה נשארת לשדות נתוני האב, וכמויות המלאי מחושבות בזמן ריצה מ-MATDOC " +
            "דרך תצוגת CDS, לפי 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT (MM-IM)'.",
          xrefs: ["table:MBEW", "table:MARD"],
        },
        {
          he: "המסמך החשבונאי: BKPF (כותרת) ו-BSEG (פריטים); ב-S/4HANA שורות היומן ב-ACDOCA, ולפי שכבת ההשפעה של " +
            "המאגר הדיווח עובר ל-ACDOCA ותצוגות CDS כמו I_JournalEntryItem ו-I_GLAccountLineItem (אינן במילון " +
            "הפרויקט).",
          xrefs: ["table:BKPF", "table:BSEG", "table:ACDOCA"],
        },
        {
          he: "עלויות CO: COSP ו-COSS (ו-COEP) הן ב-S/4HANA תצוגות תאימות מעל היומן האוניברסלי לנתוני הבפועל.",
          xrefs: ["table:COSP", "table:COSS"],
        },
      ],
      integrationPoints: [
        {
          he: "MM-IM אל FI: חשבונות ה-G/L מתעדכנים בקביעת חשבונות אוטומטית; קוד החברה נגזר מאזור ההערכה של המפעל.",
          xrefs: ["tx:OBYC"],
        },
        {
          he: "MM-IM אל CO: ניפוק לפקודה מחייב את הפקודה בסוג עלות ראשי השווה לחשבון ההוצאה; קבלת תוצרת מזכה את " +
            "הפקודה.",
          xrefs: ["bp:order-settlement-process"],
        },
        {
          he: "Material Ledger: ב-S/4HANA חובה, ומסמך ה-Material Ledger מציג את התנועות הרלוונטיות להערכה בכל " +
            "המטבעות וההערכות.",
          xrefs: ["tx:CKM3"],
        },
        {
          he: "רכש לתשלום, ייצור ותחזוקה: קבלת טובין, Backflush וניפוק חלפים לפקודת תחזוקה עוברים באותו מנגנון.",
          xrefs: ["bp:goods-movement-process", "bp:confirmation-process", "bp:maintenance-order-process"],
        },
      ],
      interfaces: [
        {
          he: "כתיבה: BAPI_GOODSMVT_CREATE ואחריו BAPI_TRANSACTION_COMMIT; ביטול: BAPI_GOODSMVT_CANCEL (אינו " +
            "במילון הפרויקט). המסמך החשבונאי נוצר במקביל מאותו רישום, לפי עמוד Document Concept.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
        },
        {
          he: "קריאה: BAPI_GOODSMVT_GETDETAIL ו-BAPI_GOODSMVT_GETITEMS למסמך החומר; לפי רשומת המאגר של FB03 " +
            "‏BAPI_ACC_DOCUMENT_GETDETAIL למסמך החשבונאי (אינו במילון הפרויקט).",
          xrefs: ["fm:BAPI_GOODSMVT_GETDETAIL", "fm:BAPI_GOODSMVT_GETITEMS"],
        },
        {
          he: "S/4HANA: שירות ה-OData‏ Material Documents - Read, Create ‏(API_MATERIAL_DOCUMENT) לקריאה, יצירה " +
            "וביטול של מסמכי חומר.",
        },
        {
          he: "ECC: לפי עמוד IDoc Interface: Inventory Management to Accounting, רישום מלאי יכול להעביר את נתוני " +
            "התנועה לחשבונאות חיצונית ב-IDoc יוצא ACPJOU01, ואותו סוג IDoc משמש גם ככניסה לחשבונאות מתנועות " +
            "במערכת לוגיסטית חיצונית.",
        },
        {
          he: "הרחבה: BAdI‏ MB_MIGO_BADI ברישום ב-MIGO, לפי רשומות המאגר.",
          xrefs: ["enh:badi:MB_MIGO_BADI"],
        },
      ],
      outputs: [
        {
          he: "מסמך חומר (לוגיסטי) המזוהה במספר ובשנת מסמך החומר.",
          xrefs: ["obj:material-document"],
        },
        {
          he: "מסמך חשבונאי אחד או יותר (מזוהה בקוד חברה, מספר מסמך ושנת כספים) עם סוג מסמך WE, ‏WN, ‏WA או WL; " +
            "ב-S/4HANA רישום יומן ביומן האוניברסלי.",
          xrefs: ["table:BKPF", "table:ACDOCA"],
        },
        {
          he: "חיוב או זיכוי של אובייקט ה-CO (פקודה, מרכז עלות) ועדכון ערך המלאי; ב-S/4HANA גם עדכון ה-Material " +
            "Ledger.",
          xrefs: ["table:COSP"],
        },
      ],
      exceptions: [
        {
          he: "M8147: חסר חשבון ל-BSX או ל-GBB עם מודיפיקציה (VBR, ‏AUF, ‏BSA) למחלקת ההערכה (תקרית " +
            "obyc-gbb-vbr-missing-no-fi-doc); חסר PRD לחומר במחיר תקן (תקרית " +
            "prd-price-difference-account-missing).",
          xrefs: ["tx:OBYC", "table:MBEW"],
        },
        {
          he: "M7053: תקופת MM ותקופת FI אינן מתואמות (תקריות period-close-mmrv-ob52-mismatch " +
            "ו-period-mm-not-open).",
          xrefs: ["tx:MMRV", "tx:MMPV", "tx:OB52"],
        },
        {
          he: "הצלחה בלי מסמך חומר או FI: Update שנכשל ב-SM13 (תקרית update-termination-sm13).",
          xrefs: ["tx:SM13"],
        },
        {
          he: "דוח CO ישן שאינו תואם ל-ACDOCA (תקרית acdoca-coep-mismatch); תוכנית Z הקוראת MKPF/MSEG ישירות " +
            "(תקרית matdoc-custom-code).",
          xrefs: ["table:ACDOCA", "table:MSEG"],
        },
        {
          he: "סגירת Material Ledger נכשלת כשהתחשבנות CO88 לא הושלמה (תקרית material-ledger-closing-ckmlcp-error).",
          xrefs: ["tx:CKMLCP", "tx:CO88"],
        },
      ],
      controls: [
        {
          he: "מסמך שנרשם אינו משתנה; ביטול או תיקון כמות רק במסמך חדש, כך שהשרשרת החשבונאית נשמרת.",
          xrefs: ["tx:MBST"],
        },
        {
          he: "Transport gate ובדיקה ב-OMWB לכל מחלקת הערכה חדשה לפני העלאה לייצור, לפי מרכז התקלות של המאגר.",
          xrefs: ["tx:OBYC"],
        },
        {
          he: "נוהל סגירה אחד שמוביל את MMPV ואת OB52 יחד.",
          xrefs: ["tx:MMPV", "tx:OB52"],
        },
        {
          he: "בדיקת SM13 לפני כל רישום חוזר.",
          xrefs: ["tx:SM13"],
        },
        {
          he: "סדר סגירה: התחשבנות לפני סגירת ה-Material Ledger.",
          xrefs: ["tx:CO88", "tx:CKMLCP"],
        },
      ],
      eccToS4: [
        {
          he: "ECC: מסמך החומר ב-MKPF/MSEG, מלאי מצרפי בטבלאות נפרדות; המסמך החשבונאי ב-BKPF/BSEG, ‏CO ב-COEP, " +
            "וטבלאות סיכום ואינדקס (GLT0, ‏BSIS/BSAS, ‏FAGLFLEXT, ‏COSP/COSS).",
          xrefs: ["table:MKPF", "table:MSEG", "table:BKPF", "table:BSEG"],
        },
        {
          he: "S/4HANA, 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT (MM-IM)': מסמך החומר נשמר ב-MATDOC בלבד; " +
            "MKPF, ‏MSEG ו-MARD נשארות כהגדרות DDIC וקריאה מהן מנותבת לתצוגות CDS; כתיבה אליהן דורשת התאמה.",
          xrefs: ["table:MKPF", "table:MSEG", "table:MARD", "bp:matdoc-read-through-compatibility"],
        },
        {
          he: "S/4HANA, 'S4TWL - Material Ledger Obligatory for Material Valuation': Material Ledger חובה (Actual " +
            "Costing נשאר אופציונלי); LBKUM, ‏SALK3 ו-SALKV ב-MBEW אינם מתעדכנים ונשלפים מ-ACDOCA ומה-Material " +
            "Ledger.",
          xrefs: ["table:MBEW", "table:ACDOCA"],
        },
        {
          he: "S/4HANA, 'S4TWL - DATA MODEL CHANGES IN FIN': טבלאות הסיכום והאינדקס של FI הוחלפו בתצוגות תאימות " +
            "בשם זהה; SELECT ממשיך לעבוד, וכתיבה הוסרה מהסטנדרט ויש להסירה מקוד מותאם.",
          xrefs: ["table:ACDOCA"],
        },
        {
          he: "S/4HANA, 'S4TWL - TECHNICAL CHANGES IN CONTROLLING': COEP, ‏COSP ו-COSS הוחלפו בתצוגות תאימות מעל " +
            "היומן האוניברסלי לנתוני הבפועל.",
          xrefs: ["table:COSP", "table:COSS"],
        },
        {
          he: "S/4HANA, לפי עמוד Universal Journal: FAQ, מסמכים חשבונאיים ומסמכי CO הוחלפו ברישומי יומן (journal " +
            "entries); לפי אותו עמוד BSEG נשמרת לאחסון מסמכי המקור ולניהול פריטים פתוחים ו-BKPF נשארת ללא " +
            "שינוי; לפי רשומות המאגר הדיווח עובר ל-ACDOCA.",
          xrefs: ["table:BKPF", "table:BSEG", "table:ACDOCA"],
        },
        {
          he: "רמת הקונספט לא השתנתה: עמוד Document Concept מופיע בתיעוד ERP 6.0 ובתיעוד S/4HANA 2025 FPS01 באותו " +
            "תיאור של מסמך חומר ומסמך חשבונאי מקביל.",
        },
      ],
      migration: [
        {
          he: "המרת מערכת: לפי רשומת MSEG בדאטהסט של המאגר, SUM מבצע את המרת MATDOC; קוד לקוח שכותב ל-MKPF/MSEG " +
            "מותאם.",
          xrefs: ["table:MSEG", "bp:ecc-to-s4hana-migration-process"],
        },
        {
          he: "לפי פריט 'S4TWL - Material Ledger Obligatory for Material Valuation': אחרי הגירת SUM הטכנית נדרשת " +
            "הגירת Material Ledger (Customizing ונתונים, בנתיב Migration to SAP S/4HANA Finance), גם " +
            "כשה-Material Ledger כבר פעיל במערכת המקור.",
          xrefs: ["table:MBEW"],
        },
        {
          he: "הטמעה חדשה: אובייקט ההגירה 'MM - Material inventory balance' מעביר ערכי מלאי לחומרים במחיר תקן או " +
            "ממוצע נע מתוך MBEW של מערכת המקור.",
          xrefs: ["table:MBEW"],
        },
        {
          he: "סריקת קוד מותאם: SELECT על BSIS/BSAS, ‏GLT0, ‏FAGLFLEXA, ‏COEP, ‏COSP ו-MSEG, וכתיבה ישירה לכל אחת " +
            "מהן.",
          xrefs: ["table:COSP", "table:MSEG"],
        },
      ],
      reference: {
        title: "Document Concept | Inventory Management and Inventory (MM-IM) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/1363bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התיעוד הרשמי שמתאר את יצירת מסמך החומר ואת המסמך החשבונאי המקביל בקביעת חשבונות אוטומטית; גוף " +
          "העמוד נקרא דרך scripts/sap-help-body.mjs. פריט SAP Best Practices (Scope Item) לתהליך לא הודפס באף " +
          "מקור שנקרא ולכן אינו נרשם.",
      },
    },
    xrefs: [
      "table:MKPF", "table:MSEG", "table:MBEW", "table:MARD", "table:BKPF", "table:BSEG", "table:ACDOCA",
      "table:COSP", "table:COSS", "tx:MIGO", "tx:MB03", "tx:MB51", "tx:MBST", "tx:OBYC", "tx:FB03", "tx:FAGLL03",
      "tx:FBL3N", "tx:MMRV", "tx:MMPV", "tx:OB52", "tx:SM13", "tx:CO88", "tx:CKMLCP", "tx:CKM3",
      "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_GOODSMVT_GETDETAIL", "fm:BAPI_GOODSMVT_GETITEMS",
      "fm:BAPI_TRANSACTION_COMMIT", "cds:I_MaterialDocumentItem", "obj:material-document", "enh:badi:MB_MIGO_BADI",
      "bp:goods-movement-process", "bp:matdoc-read-through-compatibility", "bp:confirmation-process",
      "bp:order-settlement-process", "bp:bapi-commit-discipline", "bp:ecc-to-s4hana-migration-process",
      "bp:maintenance-order-process",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Document Concept | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/1363bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 1363bd534f22b44ce10000000a174cb4, נקרא דרך scripts/sap-help-body.mjs): 'When " +
          "posting a goods movement in the SAP System, the following documents are created: Material Document " +
          "... Accounting Document'; 'If the movement is relevant for Financial Accounting ... an accounting " +
          "document is created parallel to the material document'; 'The G/L accounts involved in a goods " +
          "movement are updated through an automatic account assignment'; 'The company code to which the " +
          "accounting document is posted is derived from the valuation area defined for the plant'; מסמך שנרשם " +
          "אינו ניתן לשינוי וביטול או שינוי כמות מחייבים מסמך חדש; טבלת הדוגמאות ממפה WE לקבלה להזמנת רכש (סוג " +
          "מסמך WE או WN), ‏WF לקבלה מפקודה (WE), ‏WA לניפוק, העברה וקבלה אחרת (WA), ‏WL לניפוק למשלוח (WL).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "The Document Concept | Inventory Management and Physical Inventory (MM-IM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.17.latest",
        url: "https://help.sap.com/docs/SAP_ERP/96bf9ad642cf4b26a29595e3d573fb8c/1363bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.17.latest",
        accessedAt: DATE,
        claim: "בצד ECC (SAP ERP 6.0 EHP7, גוף העמוד נקרא): אותו עקרון, 'an accounting document is created " +
          "parallel to the material document' כשהתנועה מעדכנת חשבונות G/L, וחשבונות ה-G/L מתעדכנים בהקצאת " +
          "חשבונות אוטומטית; ייתכנו כמה מסמכים חשבונאיים למסמך חומר אחד כשפריטים שייכים למפעלים בקודי חברה " +
          "שונים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Inventory Management and Inventory (MM-IM) | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/38b1ba53422bb54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד נקרא: 'The system automatically updates the following data each time there is a goods " +
          "movement: Quantity and value for Inventory Management, Account assignment for cost accounting, G/L " +
          "accounts for financial accounting via automatic account assignment'; 'The system derives the company " +
          "code from the plant via the valuation area'; 'For each goods movement a document is created'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Cost Posting in Financial Accounting | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/fcc7d8530439414de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד נקרא: בניפוק חומרי גלם לפקודה 'the system automatically generates a posting in " +
          "Financial Accounting' והעלות מוקצית לפקודה בסוג עלות ראשי השווה לחשבון ההוצאה; בקבלת התוצרת למחסן " +
          "'uses transaction key BSX to determine the inventory change account and transaction key GBB (account " +
          "grouping code AUF ) to determine the offsetting account for inventory change', והפקודה מזוכה במחיר " +
          "התקן; בהתחשבנות היתרה 'The system uses transaction key PRD to determine the price difference " +
          "account'. העמוד מציין שאינו מתאר את לוגיקת הרישום של Actual Costing/Material Ledger.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Universal Journal | General Ledger Accounting (FI-GL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/523b8a55559ad007e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד נקרא: 'The universal journal is the book of original entry for business transactions in " +
          "Financial Accounting (FI) and Controlling (CO)'; הרכיבים שמתואמים בו הם FI-GL, ‏FI-AA, ‏CO, ‏CO-PA " +
          "(Margin Analysis) ו-Material Ledger (CO-PC-ACT); 'Totals are calculated on-the-fly when needed'; " +
          "העמוד מזכיר רישומי יומן 'in the ACDOCA table'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Universal Journal: FAQ | General Ledger Accounting (FI-GL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/8b8e5695c4dc4749a706f9fa2f6bda92.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד נקרא (loio 8b8e5695c4dc4749a706f9fa2f6bda92): 'With the Universal Journal, accounting " +
          "documents and CO documents have been superseded by journal entries'; 'the former G/L-only table BSEG " +
          "still exists as it is needed to store the source documents that serve as the basis for journal " +
          "entries into table ACDOCA. In addition, it stores entries relating to open item management. Also, " +
          "table BKPF that stores the header for journal entries remains unchanged'; נתוני הבפועל של COEP, COSS " +
          "ו-COSP נכללים ב-ACDOCA, ונתונים סטטיסטיים ונתוני יעד נשארים בטבלאות אלה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 15.3.1 S4TWL - DATA " +
          "MODEL IN INVENTORY MANAGEMENT (MM-IM), p. 1459, 1460",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט (טקסט מחולץ מ-SIMPL_OP2025.pdf, scratchpad/official) קובע שמודל ERP 6.0 כלל את MKPF לכותרת " +
          "ואת MSEG לפריטים, ש-'Material document data will be stored in MATDOC only and not anymore in MKPF " +
          "and MSEG', שכמויות המלאי מחושבות 'on-the-fly' מ-MATDOC, ושלטבלאות MKPF, ‏MSEG, ‏MARC ו-MARD משויכות " +
          "תצוגות CDS שאליהן מנותבת כל קריאה (מקורות DDL ‏NSDM_DDL_MKPF, ‏NSDM_DDL_MSEG) בעוד 'Write accesses " +
          "to those tables have to be adjusted'. לפי הפריט MARC ו-MARD הן בין ה-hybrid tables, ש-'will still be " +
          "used to store the material master data attributes', ותצוגות ה-CDS מבצעות 'the on-the-fly aggregation " +
          "of actual stock quantities'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 15.3.2 S4TWL - " +
          "Material Ledger Obligatory for Material Valuation, p. 1467, 1468",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט קובע: 'This simplification makes it mandatory to use the Material Ledger (ML) in all SAP " +
          "S/4HANA systems. After the technical SUM migration, the Material Ledger needs to be migrated'; " +
          "'activation of Actual Costing is still optional'; טבלאות ההערכה xBEW(H) (כולל MBEW) נשמרות לנתוני אב " +
          "בלבד, והשדות 'LBKUM, SALK3 and SALKV will be retrieved from the Material Ledger' ומגרסת 1610 'from " +
          "the Universal Journal Entry Line Items table ACDOCA and the Material Ledger table'; קריאה מנותבת " +
          "לתצוגות CDS, וכתיבה לשדות אלה דורשת התאמה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.1.4 S4TWL - DATA " +
          "MODEL CHANGES IN FIN (FI-GL), p. 159-161",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "הפריט קובע שרשומות הסיכום של General Ledger, ‏Controlling, ‏Material Ledger, ‏Asset Accounting, " +
          "‏AP ו-AR הוסרו וכן טבלאות האינדקס, ו-'replaced by identically-named DDL SQL views, called " +
          "compatibility views'; טבלת המיפוי מונה בין השאר BSIS, ‏BSAS, ‏GLT0, ‏FAGLFLEXT, ‏COSP ו-COSS; 'The " +
          "compatibility views ensure database SELECTs work as before. However, write access (INSERT, UPDATE, " +
          "DELETE, MODIFY) was removed from SAP standard, or has to be removed from custom code'; טבלאות נוספות " +
          "(ובהן BSIM, ‏COEP ו-FAGLFLEXA) הוחלפו חלקית ב-Universal Journal (ACDOCA) עם ניתוב קריאה לתצוגות " +
          "תאימות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.5.1 S4TWL - " +
          "TECHNICAL CHANGES IN CONTROLLING (CO-OM), p. 319, 320",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TB_15,
        claim: "כפי שצוטט ברשומת table:COSP: 'the universal journal includes all actual cost postings, both " +
          "primary and secondary' ו-'The former tables COEP, COSP, and COSS are replaced by views of the same " +
          "name, so-called compatibility views, that aggregate the data in the universal journal on the fly' " +
          "(אומת ברשומת table:COSP).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Displaying Exchange Data in a Material Document and in an Accounting Document | EXG - " +
          "Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/7e81cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד נקרא: הצגת מסמך החומר לקבלה ב-'transaction MB03', ומשם 'From the material document " +
          "display mode, choose Environment Accounting docs...' כדי לקבל את רשימת המסמכים בחשבונאות ולפתוח את " +
          "המסמך החשבונאי. ההיקף המוצהר בעמוד הוא נתוני Exchanges; הניווט עצמו הוא ממסך ההצגה של MB03.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1077 'Material Documents Overview' (SAP Fiori elements, " +
          "Analytical), release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1077')/S32OP",
        accessedAt: DATE,
        claim: "scripts/fal-app.mjs F1077: היישום מפורסם ב-S32OP, בתפקידים ובהם SAP_BR_INVENTORY_MANAGER, " +
          "‏SAP_BR_WAREHOUSE_CLERK ו-SAP_BR_GL_ACCOUNTANT, שירותי OData‏ MMIM_MATDOC_OV_SRV " +
          "ו-MMIM_GR_CANCELLATION_SRV, וקוד טרנזקציה מוביל MB51 (קשורים: MBST ועוד). עמוד היישום בתיעוד 2025 " +
          "FPS01 (loio 7cc07e548af58e4ce10000000a4450e5) מציין הצגה וביטול של מסמכי חומר ואפשרות לחפש מידע " +
          "חשבונאי (G/L account או cost center) בפריטי קבלה מוערכת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F3664 'Display Journal Entries in T-Account View' (SAP Fiori " +
          "(SAPUI5)), release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3664')/S32OP",
        accessedAt: DATE,
        claim: "scripts/fal-app.mjs F3664: יישום Transactional מפורסם ב-S32OP, רכיב FI-FIO-GL-IS, בתפקידים ובהם " +
          "SAP_BR_GL_ACCOUNTANT, ‏SAP_BR_INVENTORY_MANAGER ו-SAP_BR_WAREHOUSE_CLERK, בקטלוג " +
          "SAP_SFIN_BC_FACT_ACDOC 'Finance - Accounting Document Display', ‏intent 'AccountingDocument-impact', " +
          "שירות OData‏ FIN_ACCOUNTING_IMPACT_SRV.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1273 'Account Determination' (SAP Fiori (SAPUI5)), release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1273')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת במהדורת S/4HANA 2025 FPS01 (S32OP) את האפליקציה F1273 " +
          "'Account Determination' (SAP Fiori (SAPUI5), 'Published') עם קוד הטרנזקציה המוביל OBYC. (אומת ברשומת " +
          "tx:OBYC)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App FB03 'Display Document, Display Journal Entries' (SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('FB03')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את FB03 כאפליקציה 'Display Document, Display Journal " +
          "Entries' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת " +
          "tx:FB03)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "IDoc Interface: Inventory Management to Accounting | Accounting",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/29e1b7170a344430b27643ca050d4247/7b61d0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "בצד ECC (SAP ERP 6.0 EHP8, גוף העמוד נקרא): תנועת סחורה ב-MM-IM 'also results in a posting to " +
          "Accounting'; להעברת נתוני תנועה לחשבונאות במערכת חיצונית משמש 'outbound IDoc ACPJOU01 for Inventory " +
          "Management (MM-IM)', וה-FI/CO interface inbound IDoc ACPJOU01 משמש לקליטת תנועות ממערכת לוגיסטית " +
          "חיצונית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MM - Material inventory balance | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c1af02cdf5344d7ab71306ef1fed3e5d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_02,
        claim: "אובייקט ההגירה 'MM - Material inventory balance' מעביר ערכי מלאי לחומרים עם בקרת מחיר סטנדרטית או " +
          "ממוצעת-נעה מתוך 'Table MBEW - for material valuation' שבמערכת המקור. (אומת ברשומת table:MBEW)",
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
        claim: "שירות ה-OData‏ Material Documents - Read, Create מתועד למהדורת On-Premise 2025 FPS01 במדריך APIs " +
          "for Inventory: 'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following " +
          "operations for material documents: Retrieve material documents, Create material documents, Cancel " +
          "material documents at header level, Cancel material documents at [item level]'. (אומת ברשומת " +
          "fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Ledger Document | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/70c7d45398184308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (loio 70c7d45398184308e10000000a174cb4) מדפיסה: 'The material ledger document " +
          "displays the transactions relevant to material valuation in all preset currencies and valuations'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT): רשומות MATDOC, ACDOCA, BSEG ו-BKPF",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MATDOC: ‏MKPF ו-MSEG מאוחדות, המלאי מחושב בזמן ריצה, קריאה דרך MATDOC או CDS תאימות (NSDM_V_MSEG, " +
          "‏NSDM_V_MKPF, ‏I_MaterialDocumentItem), סיכון גבוה. ACDOCA: טבלת התנועות המאוחדת של FI ‏(BKPF/BSEG), " +
          "‏CO ‏(COEP/COBK), ‏Asset ו-ML; טבלאות totals/index ‏(GLT0, ‏BSIS/BSAS, ‏FAGLFLEXT) בוטלו; טרנזקציות " +
          "FB03 ו-FAGLL03H; CDS‏ I_JournalEntryItem ו-I_GLAccountLineItem. BSEG: עדיין קיים, מקור האמת לדיווח " +
          "הוא ACDOCA. BKPF: קיימת לצד ACDOCA ללא שינוי מהותי במבנה.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#ACDOCA",
      },
      {
        sourceType: "repository",
        sourceTitle: "דאטהסט הטבלאות של הפרויקט (sapData, PM): MSEG",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת MSEG: ב-S/4HANA מסמכי החומר מאוחדים ב-MATDOC ו-MSEG היא View תאימות; הערת ה-SUM: המרה " +
          "אוטומטית ל-MATDOC ב-SUM (Silent Data Migration), MKPF/MSEG הופכות ל-Compatibility Views, ויש לבדוק " +
          "קוד Z שקורא ישירות מ-MSEG/MKPF ולעדכן ל-CDS/MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'יומן אוניברסלי (ACDOCA)' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ECC: ‏FI ו-CO נפרדים, BKPF/BSEG ל-FI, ‏COEP ל-CO וטבלאות סיכום נפרדות. S/4HANA: ‏ACDOCA שורת אמת " +
          "יחידה ל-FI, CO ועלויות; BSEG נשאר למסמך והדיווח מ-ACDOCA; דיווח עלויות פקודות ייצור ותחזוקה עובר " +
          "ל-ACDOCA.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#acdoca",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): MIGO, ‏MB03, ‏FB03, ‏FAGLL03",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MIGO: סוג התנועה קובע את חשבונות ה-G/L דרך OBYC; ‏BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL. " +
          "‏MB03: הצגת מסמך חומר עם ניווט למסמכי FI/CO/ML; ‏BAPI_GOODSMVT_GETDETAIL. ‏FB03: הצגת מסמך על " +
          "BKPF/BSEG, ב-S/4HANA גם G/L view של ACDOCA, ‏BAPI_ACC_DOCUMENT_GETDETAIL, Fiori‏ Display Journal " +
          "Entries - In T-Account View ‏(F3664). ‏FAGLL03: פריטי חשבון ראשי, קוראת FAGLFLEXA וב-S/4HANA את " +
          "ACDOCA; ‏FAGLL03H לנפחים גדולים.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#FB03",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: obyc-gbb-vbr-missing-no-fi-doc, " +
          "prd-price-difference-account-missing, period-close-mmrv-ob52-mismatch, " +
          "material-ledger-closing-ckmlcp-error",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "M8147 כשחסר חשבון ב-OBYC ל-BSX או ל-GBB עם מודיפיקציה (VBR/AUF/BSA) או ל-PRD למחלקת ההערכה, " +
          "ותנועה בלי מסמך FI (טבלאות MBEW, ‏MSEG, ‏MATDOC, ‏BSEG; ניתוח ב-MIGO, ‏OBYC, ‏MB51, ‏OMWB; BAdI‏ " +
          "MB_MIGO_BADI); מניעה: ולידציה ו-OMWB ו-transport gate על OBYC. M7053 כש-MMRV/MMPV ו-OB52 אינם " +
          "מתואמים (MARV, ‏T001B, ‏BKPF). סגירת CKMLCP נכשלת כשהתחשבנות CO88 לא הושלמה; ניתוח ב-CKM3.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#obyc-gbb-vbr-missing-no-fi-doc",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: update-termination-sm13",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הודעת הצלחה בלי מסמך חומר או FI: Update שנכשל (V1/V2) ב-SM13, לעתים בגלל GBB-VBR חסר; התיקון הוא " +
          "Repeat update מ-SM13 ולא רישום ידני חוזר (טבלאות VBHDR, ‏VBMOD, ‏BKPF, ‏MATDOC).",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#update-termination-sm13",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: period-mm-not-open, acdoca-coep-mismatch, matdoc-custom-code",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "period-mm-not-open: הודעה M7053 כש-MMPV לא רץ לפתיחת התקופה (MMRV, MMPV, OB52; טבלה MARV). " +
          "acdoca-coep-mismatch: דוח CO ישן שקורא COEP במקום ACDOCA אינו תואם ל-Universal Journal ב-S/4HANA; " +
          "התיקון הוא הסבת הדוחות ל-ACDOCA/CDS. matdoc-custom-code: תוכנית Z שקוראת MKPF/MSEG ישירות נכשלת או " +
          "מחזירה ריק ב-S/4HANA; התיקון הוא הסבת הקריאה ל-CDS/Compatibility View (NSDM) והסרת כתיבה ישירה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#acdoca-coep-mismatch",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג האובייקטים המאומתים של הפרויקט: BKPF, ‏BSEG, ‏ACDOCA",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BKPF כותרת מסמך הנהלת חשבונות (FB03, ‏FB01, ‏FBL3N); ‏BSEG שורת מסמך הנהלת חשבונות, ב-S/4HANA " +
          "'השורות ב-ACDOCA; BSEG כ-Compatibility'; ‏ACDOCA טבלת הליבה של הפיננסים ב-S/4HANA, לא קיימת ב-ECC. " +
          "ניסוח BSEG כאן שונה מזה של שכבת ההשפעה ('עדיין קיים'); ראו הערות.",
        verificationLevel: "repository_verified",
        repoRef: "data/verified-objects.ts#BSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התהליך 'תנועות סחורה' של הפרויקט (goods-movement-process)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תנועת סחורה רושמת מסמך חומר ומעדכנת מלאי, עלות ותכנון; לוודא שקביעת החשבונות (OBYC) מחזירה חשבון " +
          "לסוג התנועה ולמחלקת ההערכה; ממשק תוכניתי BAPI_GOODSMVT_CREATE, ‏BAPI_GOODSMVT_GETITEMS " +
          "ו-BAPI_GOODSMVT_GETDETAIL ואחריהם BAPI_TRANSACTION_COMMIT בכתיבה; פלט: 'מסמך FI נלווה לפי קביעת " +
          "החשבונות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/cross-processes.ts#goods-movement-process",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחומים של הפרויקט (DOMAIN_DETAIL): pppi-gi-gr ו-pppi-settlement",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "pppi-gi-gr: ‏GI ‏(261) ו-GR ‏(101) מעדכנים מלאי ועלות; נתוני אב: סוגי תנועה ומחיר תקן/ML; הגירה " +
          "MKPF/MSEG ל-MATDOC; BAdI‏ MB_MIGO_BADI. pppi-settlement: התחשבנות ב-CO88 ורישום ל-FI/CO ‏(ACDOCA); " +
          "ב-S/4HANA 'Material Ledger חובה; עלויות ב-ACDOCA'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pppi-settlement",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 11 בספריית הפרויקט (Prerequisites for SAP S/4HANA End-to-End Implementation Training), " +
          "פרק 1, סעיף 1.11 'Journal Entry'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף עוסק ברישום היומן כמסמך עסקי בסיסי; הספר משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book11.json#1.11",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט (Sourcing and Procurement with SAP S/4HANA), פרק 7 'Inventory " +
          "Management', סעיף 7.5.4 'Monitoring Financial Inventory Values Apps'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף עוסק ביישומי הניטור של ערכי המלאי הכספיים; הפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#7.5.4",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (Plant Maintenance with SAP S/4HANA: Business User Guide), פרק 7, " +
          "סעיף 7.1.6 'Financial Accounting'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף עוסק באינטגרציה של תחזוקת מפעל עם הנהלת החשבונות; הפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#7.1.6",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "רשומת תהליך חוצת מודולים. חיפושים שרצו (scripts/sap-help-search.mjs, כל אחד החזיר 21 רשומות): " +
      "'Universal Journal'; 'goods movement accounting document automatic account determination'; 'Automatic " +
      "Postings for Inventory Management valuation class transaction key'; 'Document Concept inventory " +
      "management accounting document' בסקופ SAP_ERP; 'material document accounting document display MB03'; " +
      "'Material Ledger Obligatory for Material Valuation'; 'Material Documents Overview app'. גופי העמודים " +
      "Document Concept (S/4HANA 2025.001 ו-ERP 6.17.latest), Inventory Management and Inventory (MM-IM), " +
      "‏Production Cost Posting in Financial Accounting, Universal Journal, Universal Journal: FAQ, Displaying " +
      "Exchange Data in a Material Document and in an Accounting Document, ‏Material Documents Overview ו-IDoc " +
      "Interface: Inventory Management to Accounting נקראו דרך scripts/sap-help-body.mjs; ספריית ה-Fiori נקראה " +
      "ל-F1077 ול-F3664 (scripts/fal-app.mjs), ו-F1273 ו-FB03 הועתקו מרשומות tx:OBYC ו-tx:FB03. פריטי הפישוט " +
      "צוטטו מהטקסט המחולץ scratchpad/official/SIMPL_OP2025.pdf.txt. שדה kpis הושמט: אף מקור שנקרא אינו מגדיר " +
      "מדד לתהליך. status הושמט: התהליך קיים בשני הצדדים, ושינויי המודל מתועדים ב-eccToS4. פריט SAP Best " +
      "Practices (Scope Item) לא הודפס באף מקור ולכן אינו נרשם; ההפניה הרשמית היא עמוד Document Concept. הערות " +
      "אימות: MATDOC, ‏BAPI_GOODSMVT_CANCEL, ‏BAPI_ACC_DOCUMENT_GETDETAIL, ‏ACPJOU01, ‏OMWB, ‏FAGLL03H, " +
      "‏I_JournalEntryItem, ‏I_GLAccountLineItem, ‏F1077, ‏F3664 ו-F1273 אינם במילון הפרויקט ומופיעים בפרוזה " +
      "בלבד. F0843 לא נקשר בכוונה: רשומת goods-movement-process מתעדת אי-התאמה בין קטלוג הפרויקט לספריית " +
      "ה-Fiori לגביו. עמוד Universal Journal: FAQ (2025.001) קובע ש-BSEG עדיין קיימת ו-BKPF ללא שינוי; זה תואם " +
      "את data/s4-impact.ts#BSEG וסותר את הניסוח 'BSEG כ-Compatibility' ב-data/verified-objects.ts#BSEG, שדורש " +
      "תיקון ברשומת המאגר (לא בוצע כאן). מקורות DDL ‏NSDM_DDL_MSEG / NSDM_DDL_MKPF מודפסים בפריט הפישוט, ושמות " +
      "התצוגות NSDM_V_MSEG / NSDM_V_MKPF מופיעים ברשומת המאגר; הקשר ביניהם לא אומת. לא בוצעה בדיקה במערכת SAP " +
      "חיה.",
  },
  /* ========================================================== project system */
  {
    slug: "project-system-process",
    he: "מערכת פרויקטים (PS) עם תחזוקה וייצור: מבנה, תקציב, צבירת עלויות והתחשבנות",
    en: "Project System with maintenance and production: structure, budget, cost collection and settlement",
    module: "Cross",
    summary: "הפרויקט ב-Project System מורכב מהגדרת פרויקט, היררכיית אלמנטי WBS, ורשתות עם פעילויות ואבני דרך. על " +
      "ה-WBS מתכננים עלויות, מקצים ומשחררים תקציב תחת בקרת זמינות, ומשייכים אליו פקודות תחזוקה ופקודות ייצור כך " +
      "שהעלויות שלהן מנוהלות יחד עם הפרויקט. בסוף התקופה העלויות מתחשבנות למקבלים לפי כלל ההתחשבנות, ישירות או " +
      "דרך ה-WBS, עד סגירה טכנית וסגירה עסקית.",
    context: "לפי רשומת tx-intel של CJ20N במאגר, Project Builder הוא סביבת העבודה המרכזית למבנה (הגדרת פרויקט ב-PROJ, " +
      "אלמנטי WBS ב-PRPS, רשתות ב-AUFK/AFKO ופעילויות ב-AFVC), ולפי רשומת tx-intel של CJ40 הרצף הוא מבנה " +
      "(CJ20N), תכנון עלויות (CJ40), תקצוב (CJ30), רישום בפועל והשוואה (CJI3), והתחשבנות (CJ8G) לפי רשומת " +
      "CJ20N. לפי עמוד 'Orders for Projects' הרשמי (S/4HANA 2025 FPS01), ניתן לשייך פקודות תחזוקה, פקודות ייצור " +
      "והזמנות פנימיות לאלמנט WBS שהוא אלמנט הקצאת חשבון, והעלויות המתוכננות שלהן נרשמות בפרויקט בצורה מסוכמת. " +
      "ב-S/4HANA, פריט הפישוט 'S4TWL - Simplification of maintenance transactions' קובע שטרנזקציות התחזוקה " +
      "הקלאסיות (CJ01, ‏CJ06, ‏CN21, ‏CN22 ועוד) הורחבו ב-S/4HANA 2020 FPS2 והן חלק מה-perpetual scope; 'S4TWL " +
      "- Project Reporting' מציב את CJI3 ב-compatibility scope עם CJI3N כחלופה, ולפי עמוד היישום Project Cost " +
      "Overview ‏(F6991), העלויות בפועל נקראות מ-ACDOCA והתכנון מ-ACDOCP. תפקידי ה-Fiori הרשמיים הם Project " +
      "Financial Controller ו-Project Logistics Controller.",
    steps: [
      {
        he: "לבנות את מבנה הפרויקט: הגדרת פרויקט ואלמנטי WBS ב-CJ20N (או CJ06 ו-CJ01 הקלאסיות), עם Project Profile " +
          "ותבנית לפי רשומת tx-intel. לסמן את אלמנטי ה-WBS שיקבלו עלויות כאלמנטי הקצאת חשבון: לפי העמוד הרשמי " +
          "'Orders for Projects' רק אלמנט כזה מקבל שיוך פקודות. הטבלאות לפי המאגר: PROJ ו-PRPS (שתיהן אינן במילון " +
          "הפרויקט), סטטוסים ב-JEST.",
        xrefs: ["tx:CJ20N", "tx:CJ06", "tx:CJ01", "table:JEST"],
      },
      {
        he: "לבנות רשתות ופעילויות ולשייך אותן ל-WBS: ב-CJ20N או ב-CN21 / CN22; לפי המאגר כותרת הרשת נשמרת ב-AUFK " +
          "ו-AFKO והפעילויות ב-AFVC. אבני דרך נוצרות ברשת, ב-WBS ובמבנים התקניים, ולא לרכיבי פעילות (לפי העמוד " +
          "הרשמי 'Creating Milestones').",
        xrefs: ["tx:CN21", "tx:CN22", "table:AUFK", "table:AFKO", "table:AFVC"],
      },
      {
        he: "לתכנן עלויות על ה-WBS ב-CJ40 (תכנון כולל ושנתי, לפי גרסת תכנון); לפי רשומת tx-intel התכנון אינו מחייב " +
          "ואינו מבוקר בבקרת זמינות, והוא הבסיס להשוואת תכנון מול ביצוע. בסטטוס CRTD מותר לתכנן עלויות ולתקצב (לפי " +
          "עמוד הסטטוסים הרשמי).",
        xrefs: ["tx:CJ40", "table:COSP", "table:COSS"],
      },
      {
        he: "לתקצב ולשחרר: תקציב מקורי ב-CJ30, שחרור תקציב ב-CJ32 (לפי העמוד הרשמי 'Releasing The Budget' השחרור נשען " +
          "על התקציב הנוכחי ואפשר ברמה כוללת או שנתית), והפעלת בקרת זמינות ב-CJBV. בקרת הזמינות משווה את הערך " +
          "המוקצה (בפועל ומחויבויות) לתקציב הניתן לחלוקה או לשחרור, לפי מגבלות הסבולת שב-Customizing.",
        xrefs: ["tx:CJ30", "tx:CJ32", "tx:CJBV"],
      },
      {
        he: "לשחרר את הפרויקט (REL): לפי עמוד הסטטוסים הרשמי, בסטטוס REL אפשר לרשום עלויות בפועל ל-WBS, והמעבר חזרה " +
          "מ-REL ל-CRTD אינו אפשרי. לפי רשומת tx-intel של CJ20N, רישום ל-WBS בסטטוס CRTD הוא טעות שכיחה.",
        xrefs: ["tx:CJ20N", "table:JEST"],
      },
      {
        he: "לשייך פקודות תחזוקה לפרויקט: ב-IW31 / IW32 הפקודה משויכת לאלמנט WBS או לפעולת רשת; לפי העמוד הרשמי 'Use " +
          "of Order Assignments' תאריכי הפרויקט הם תאריכי הבסיס של הפקודה, וכשהפקודה משויכת גם ל-WBS וגם לרשת " +
          "תאריכי פעולת הרשת גוברים. בשיוך אוטומטי דרך Maintenance Event Builder המערכת משתמשת בשדה PM/PS Reference " +
          "Element של רשימת המשימות (עמוד 'Assigning Maintenance Orders to Projects').",
        xrefs: ["tx:IW31", "tx:IW32", "table:ILOA", "obj:maintenance-order"],
      },
      {
        he: "לחבר את צד הייצור: MD51 מתכנן חומרים לפרויקט (WBS) עם מלאי פרויקט, ויוצר פקודות מתוכננות ודרישות רכש " +
          "המוקצות לפרויקט (לפי רשומת tx-intel). פקודת ייצור משויכת ל-WBS; בקיבוץ דרישות, לפי העמוד הרשמי " +
          "'Distribution of Costs from Production Orders', העלויות, ה-WIP והסטיות מתחלקים מפקודת הייצור לאלמנטי " +
          "ה-WBS שנקבעו ב-Pegging, ולא לפקודה בסטטוס CLSD.",
        xrefs: ["tx:MD51", "obj:planned-order", "obj:production-order"],
      },
      {
        he: "לדווח ביצוע: אישור פעילויות רשת ב-CN25 או ביישום Confirm Network Activity ‏(F0296), ואישור אבני דרך " +
          "ביישום Confirm Project Milestone ‏(F0295), שמוביל ל-CJ20N לפי ספריית ה-Fiori.",
        xrefs: ["tx:CN25", "tx:CJ20N"],
      },
      {
        he: "לעקוב אחר עלויות: CN41N לסקירת מבנה, CN42N / CN43N לסקירות פרטניות, CJI3N לשורות עלות בפועל (CJI3 נמצאת " +
          "ב-compatibility scope לפי 'S4TWL - Project Reporting'); ב-Fiori: Project Cost Overview ‏(F6991) " +
          "ו-Project Cost Line Items ‏(F6992); לפי עמוד Project Cost Overview, F6991 מנתח גם פקודות תחזוקה עם הקצאת " +
          "חשבון בכותרת.",
        xrefs: ["tx:CN41N", "tx:CN42N", "tx:CN43N", "tx:CJI3N", "tx:CJI3", "table:ACDOCA"],
      },
      {
        he: "להתחשבן בסוף התקופה: קודם הפקודות ל-WBS שאליו הן משויכות (KO88 בודד, KO8G מרוכז לפי רשומת tx-intel של " +
          "KO88; CO88 לפקודות ייצור ותהליך לפי קטלוג הטרנזקציות), ואז ה-WBS והרשתות ב-CJ88 (בודד) או CJ8G (מרוכז) " +
          "למקבלים החיצוניים, לפי כלל ההתחשבנות (COBRA / COBRB); כללים אפשר לייצר ב-CJB1. להריץ Test Run תחילה " +
          "(רשומות tx-intel של KO88 ו-CJ8G). פירוט כלל ההתחשבנות בשיטת התחשבנות הפקודות. לפי העמוד הרשמי 'Project " +
          "Settlement', אפשר גם התחשבנות ישירה של כל אובייקט למקבל החיצוני; בהתחשבנות מרובת רמות הפקודות מתחשבנות " +
          "ל-WBS הרלוונטי וה-WBS מתחשבן הלאה.",
        xrefs: [
          "tx:KO88", "tx:KO8G", "tx:CO88", "tx:CJ88", "tx:CJ8G", "tx:CJB1", "table:COBRA", "table:COBRB",
          "bp:order-settlement-process",
        ],
      },
      {
        he: "לסגור: TECO לאלמנטים שהושלמו טכנית ועדיין צפויות בהם עלויות, CLSD כשהאלמנט הושלם לוגיסטית וחשבונאית (לפי " +
          "עמוד הסטטוסים הרשמי, ב-CLSD אין רישום עלויות בפועל ל-WBS), ו-DLFL רק אחרי התחשבנות מלאה או כשהאלמנט אינו " +
          "רלוונטי להתחשבנות.",
        xrefs: ["table:JEST", "bp:period-end-closing-process"],
      },
    ],
    antiPatterns: [
      "אלמנט WBS שלא סומן כאלמנט הקצאת חשבון: לא ניתן לשייך אליו פקודות ולרשום עליו עלויות (רשומת tx-intel של " +
        "CJ20N והעמוד הרשמי 'Orders for Projects').",
      "רישום עלויות ל-WBS בסטטוס CRTD במקום REL (רשומת tx-intel של CJ20N).",
      "בלבול בין תכנון (CJ40, לא מחייב) לתקצוב (CJ30, מבוקר בבקרת זמינות), או תכנון על WBS שאינו אלמנט תכנון " +
        "(רשומת tx-intel של CJ40).",
      "הרצת CJ8G או CJ88 בלי Test Run, או על WBS ללא כלל התחשבנות (רשומת tx-intel של CJ8G).",
      "התחשבנות מרובת רמות לגלגול ערכים בתוך ההיררכיה: לפי העמוד הרשמי 'Project Settlement' היא עלולה להציג " +
        "עלויות שגויות ב-WBS העליון במערכת המידע של הפרויקט.",
      "העברת פקודה שכבר התחשבנה מ-WBS אחד לאחר: לפי העמוד הרשמי 'Settling Orders for Projects', הסכום שהתחשבן " +
        "נשאר מוצג ב-WBS הקודם.",
    ],
    checks: [
      "חיובי: פקודת תחזוקה משויכת ל-WBS משוחרר מקבלת את תאריכי הבסיס מהפרויקט, והעלויות שלה מוצגות תחת ה-WBS " +
        "ב-Project Cost Overview.",
      "שלילי: רישום עלות ל-WBS בסטטוס CRTD או CLSD נדחה.",
      "שלילי: עם בקרת זמינות פעילה, רישום שחורג ממגבלת הסבולת מחזיר אזהרה או שגיאה לפי הפעולה שהוגדרה.",
      "אינטגרציה: אחרי KO88 לפקודה ו-CJ88 ל-WBS, הפרויקט מאופס ב-CJI3N והעלות מופיעה במקבל החיצוני.",
      "רגרסיה ב-S/4HANA: הניווט מ-CN41 או CJI3N לאובייקט הפרויקט פותח את CJ20N (לפי 'S4TWL - Navigation to " +
        "Project Builder instead of special maintenance functions').",
    ],
    process: {
      purpose: "לתכנן, לתקצב ולבקר עבודה חד-פעמית ומורכבת (למשל שיפוץ או השבתה מתוכננת, או ייצור לפי פרויקט) במבנה אחד, " +
        "לאסוף אליו את עלויות פקודות התחזוקה והייצור המשויכות, ולהעביר את העלויות בסוף התקופה למקבלים הסופיים. " +
        "לפי העמוד הרשמי 'Project Settlement', עלויות והכנסות נאספות בפרויקט באופן זמני בלבד ומתחשבנות למקבל אחד " +
        "או יותר.",
      trigger: [
        {
          he: "עבודת תחזוקה גדולה המתוכננת כפרויקט, כמו Revision שהפקודות שלה משויכות לרשת הפרויקט (עמוד 'Assigning " +
            "Maintenance Orders to Projects').",
          xrefs: ["obj:maintenance-order"],
        },
        {
          he: "דרישה לייצור או לרכש המנוהלים לפי פרויקט, עם מלאי פרויקט ותכנון ב-MD51 (רשומת tx-intel של MD51).",
          xrefs: ["tx:MD51"],
        },
      ],
      preconditions: [
        {
          he: "Project Profile ו-Network Profile מתאימים; לפי רשומת tx-intel של CJ20N, Network Profile חסר הוא שגיאה " +
            "שכיחה.",
          xrefs: ["tx:CJ20N"],
        },
        {
          he: "פרופיל תקציב עם הגדרות בקרת זמינות ומגבלות סבולת (Project System, Costs, Budget ב-Customizing, לפי " +
            "העמודים הרשמיים 'Availability Control' ו-'Releasing The Budget').",
          xrefs: ["tx:CJBV"],
        },
        {
          he: "פרופיל התחשבנות ב-Project Profile או בסוג הרשת, וכלל התחשבנות בכל שולח לפני ההתחשבנות (עמוד 'Project " +
            "Settlement').",
          xrefs: ["table:COBRA", "table:COBRB"],
        },
        {
          he: "סטטוס מערכת שמתיר את הפעולה: REL לרישום עלויות, והתחשבנות רק בסטטוס שמתיר אותה.",
          xrefs: ["table:JEST"],
        },
      ],
      masterData: [
        {
          he: "הגדרת פרויקט ואלמנטי WBS (PROJ ו-PRPS, שתיהן אינן במילון הפרויקט), עם סימוני אלמנט תכנון, אלמנט הקצאת " +
            "חשבון ואלמנט חיוב (רשומת tx-intel של CJ20N).",
          xrefs: ["tx:CJ20N"],
        },
        {
          he: "רשתות ופעילויות (AUFK, ‏AFKO, ‏AFVC לפי המאגר) ואבני דרך.",
          xrefs: ["table:AUFK", "table:AFKO", "table:AFVC"],
        },
        {
          he: "בצד התחזוקה: שדה ה-WBS בנתוני המיקום והקצאת החשבון של האובייקט (ILOA, לפי העשרת הטבלאות במאגר).",
          xrefs: ["table:ILOA"],
        },
      ],
      roles: [
        {
          he: "Project Financial Controller ‏(SAP_BR_PROJ_FIN_CONTROLLER): קטלוג 'PS - Project Financial Control', " +
            "יישומי Project Cost Overview ‏(F6991), Project Cost Line Items ‏(F6992) ו-Confirm Project Milestone " +
            "‏(F0295), לפי ספריית ה-Fiori.",
        },
        {
          he: "Project Logistics Controller ‏(SAP_BR_PROJ_LOG_CONTROLLER): קטלוג 'PS - Project Logistics Control', " +
            "יישומי Confirm Network Activity ‏(F0296) ו-Confirm Project Milestone ‏(F0295).",
          xrefs: ["tx:CN25"],
        },
        {
          he: "לפי רשומות tx-intel במאגר: מנהל פרויקט, בקר פרויקטים ורואה חשבון עלויות (PS) ב-CJ20N, CJ40 ו-CJ8G.",
          xrefs: ["tx:CJ20N", "tx:CJ40", "tx:CJ8G"],
        },
      ],
      transactions: [
        {
          he: "מבנה: CJ20N (Project Builder); CJ06 / CJ01 / CJ02 / CJ03 להגדרת פרויקט ול-WBS; CN21 / CN22 לרשת.",
          xrefs: ["tx:CJ20N", "tx:CJ06", "tx:CJ01", "tx:CJ02", "tx:CJ03", "tx:CN21", "tx:CN22"],
        },
        {
          he: "תכנון ותקציב: CJ40 תכנון עלויות כולל; CJ30 תקציב מקורי; CJ32 שחרור תקציב; CJBV הפעלת בקרת זמינות.",
          xrefs: ["tx:CJ40", "tx:CJ30", "tx:CJ32", "tx:CJBV"],
        },
        {
          he: "פקודות משויכות: IW31 / IW32 לפקודת תחזוקה; MD51 לתכנון חומרים לפרויקט.",
          xrefs: ["tx:IW31", "tx:IW32", "tx:MD51"],
        },
        {
          he: "ביצוע: CN25 אישור רשת; ב-Fiori‏ Confirm Network Activity ‏(F0296), Confirm Project Milestone ‏(F0295), " +
            "Milestone ‏(F0286A) ו-Change Network Activity Status ‏(F0539), שלושת האחרונים עם CJ20N כטרנזקציה מובילה.",
          xrefs: ["tx:CN25", "tx:CJ20N"],
        },
        {
          he: "מעקב: CN41N, ‏CN42N, ‏CN43N, ‏CJI3N (CJI3 ב-compatibility scope); ב-Fiori‏ Project Cost Overview " +
            "‏(F6991) ו-Project Cost Line Items ‏(F6992), יורשי F2513 ו-F2538.",
          xrefs: ["tx:CN41N", "tx:CN42N", "tx:CN43N", "tx:CJI3N", "tx:CJI3"],
        },
        {
          he: "התחשבנות: CJB1 לייצור כללי התחשבנות; CJ88 בודד ו-CJ8G מרוכז לפרויקטים ולרשתות; KO88 / KO8G לפקודות; CO88 " +
            "לפקודות ייצור ותהליך.",
          xrefs: ["tx:CJB1", "tx:CJ88", "tx:CJ8G", "tx:KO88", "tx:KO8G", "tx:CO88"],
        },
      ],
      tables: [
        {
          he: "מבנה: PROJ הגדרת פרויקט ו-PRPS אלמנטי WBS (שתיהן אינן במילון הפרויקט); AUFK / AFKO כותרת רשת; AFVC " +
            "פעילויות; JEST סטטוסים.",
          xrefs: ["table:AUFK", "table:AFKO", "table:AFVC", "table:JEST"],
        },
        {
          he: "עלויות ותקציב: COSP / COSS סיכומי עלות (לפי CJ40 במאגר), RPSCO סיכומי פרויקט ו-BPGE / BPJA תקציב (שלושתן " +
            "אינן במילון הפרויקט).",
          xrefs: ["table:COSP", "table:COSS"],
        },
        {
          he: "התחשבנות: COBRA כותרת הכלל ו-COBRB שורות החלוקה; לפי העשרת הטבלאות במאגר, שדה PS_PSP_PNR ב-COBRB מצביע " +
            "על PRPS כשהמקבל הוא WBS.",
          xrefs: ["table:COBRA", "table:COBRB"],
        },
        {
          he: "הפקודות המשויכות כאובייקטים עסקיים; ב-S/4HANA העלות בפועל ב-ACDOCA והתכנון ב-ACDOCP (אינה במילון " +
            "הפרויקט), לפי עמוד Project Cost Overview.",
          xrefs: ["obj:maintenance-order", "obj:production-order", "table:ACDOCA"],
        },
      ],
      integrationPoints: [
        {
          he: "תחזוקה: פקודת תחזוקה משויכת ל-WBS או לפעולת רשת ומקבלת את תאריכי הבסיס מהפרויקט; שיוך אוטומטי דרך " +
            "Maintenance Event Builder ושדה PM/PS Reference Element; מ-S/4HANA 2023 FPS01 אפשר לשייך גם פקודת תחזוקה " +
            "בת-חיוב ל-WBS (מלאי פרויקט אינו מותר בה).",
          xrefs: ["tx:IW31", "tx:IW32", "obj:maintenance-order", "table:ILOA"],
        },
        {
          he: "ייצור: MD51 ומלאי פרויקט; חלוקת עלויות, WIP וסטיות מפקודת הייצור לאלמנטי ה-WBS שנקבעו ב-Pegging.",
          xrefs: ["tx:MD51", "obj:production-order", "obj:planned-order"],
        },
        {
          he: "בקרת עלויות: התחשבנות הפקודות ל-WBS ואז ה-WBS למרכז עלות, נכס, מגזר רווחיות או חשבון ראשי; סגירת התקופה " +
            "בשיטות הייעודיות. לפי העמוד הרשמי 'Project Settlement', אפשר גם התחשבנות ישירה של כל אובייקט למקבל " +
            "החיצוני; בהתחשבנות מרובת רמות הפקודות מתחשבנות ל-WBS הרלוונטי וה-WBS מתחשבן הלאה.",
          xrefs: ["bp:order-settlement-process", "bp:period-end-closing-process", "tx:CJ88", "tx:KO88"],
        },
        {
          he: "בקרת זמינות: לפי העמוד הרשמי 'Availability Control' הרכיב משולב עם CO, ‏FI, ‏PP ו-MM ובודק רישומים יוצרי " +
            "עלות מול התקציב.",
          xrefs: ["tx:CJBV"],
        },
      ],
      interfaces: [
        {
          he: "לפי רשומת tx-intel של CJ20N: BAPI_PROJECT_MAINTAIN, ‏BAPI_BUS2054_CREATE ו-BAPI_BUS2001_GET_STATUS, " +
            "BAdIs‏ WORKBREAKDOWN_UPDATE ו-NETWORK_UPDATE ו-User Exit‏ CNEX0001 (כולם אינם במילון הפרויקט).",
        },
        {
          he: "ב-S/4HANA, פריט 'S4TWL - Selected Project System BAPIs' קובע שה-BAPIs של ProjectDefinition, ‏Network " +
            "ו-WorkBreakdownStruct אינם ארכיטקטורת היעד וממליץ על ה-BAPIs של ProjectDefinitionPI, ‏NetworkPI ו-WBSPI " +
            "(חבילה CNIF_PI) או על OData APIs‏ OP_API_PROJECT_V3_0001 ו-OP_API_PROJECTNETWORK_0001.",
        },
        {
          he: "התחשבנות פקודות: K_ORDER_SETTLEMENT ו-K_SETTLEMENT_RULE_READ (רשומות function-intel במאגר; " +
            "K_SETTLEMENT_RULE_READ מסומנת שם כמוסקת ודורשת אימות ב-SE37).",
          xrefs: ["fm:K_ORDER_SETTLEMENT", "fm:K_SETTLEMENT_RULE_READ"],
        },
        {
          he: "שירותי ה-OData של יישומי ה-Fiori לפי הספרייה: PS_MILESTONE_CONFIRM ‏(F0295), PS_ACTIVITY_CONFIRM " +
            "‏(F0296), UI_PROJECTCOSTLINEITEM ‏(F6992). אלה שירותי UI של היישומים.",
        },
      ],
      outputs: [
        {
          he: "מבנה פרויקט: הגדרת פרויקט, היררכיית WBS, רשתות, פעילויות ואבני דרך.",
          xrefs: ["tx:CJ20N"],
        },
        {
          he: "ערכי תכנון, תקציב מקורי ושחרורי תקציב על ה-WBS.",
          xrefs: ["tx:CJ40", "tx:CJ30", "tx:CJ32"],
        },
        {
          he: "עלויות בפועל ומחויבויות על ה-WBS ועל הפקודות המשויכות; ב-S/4HANA שורות ב-Universal Journal.",
          xrefs: ["tx:CJI3N", "table:ACDOCA"],
        },
        {
          he: "מסמכי התחשבנות: לפי העמוד 'Project Settlement', רישומי זיכוי לפרויקט נוצרים אוטומטית והחיובים נשארים " +
            "במקבלים.",
          xrefs: ["tx:CJ88", "tx:CJ8G"],
        },
      ],
      exceptions: [
        {
          he: "רישום נחסם: WBS שאינו אלמנט הקצאת חשבון, או סטטוס שאינו מתיר (CRTD / CLSD), לפי השגיאות השכיחות ברשומת " +
            "tx-intel של CJ20N.",
          xrefs: ["tx:CJ20N", "table:JEST"],
        },
        {
          he: "חריגת תקציב (בקרת זמינות) בפקודת תחזוקה: תקרית maint-order-budget במרכז התקלות (BP603), ניתוח ב-KO23, " +
            "‏IW32 ו-CJ30.",
          xrefs: ["tx:IW32", "tx:CJ30"],
        },
        {
          he: "בקרת זמינות אינה מגיבה: לפי העמוד הרשמי 'Notes for Problems with Availability Control', בסוג הפעלה 1 " +
            "פרויקט שלא תוקצב אינו מבוקר עד שנרשם תקציב מקורי ל-WBS העליון; ובקבלת טובין או ברישום פעילות מתעדכן רק " +
            "הערך המוקצה, בלי בדיקה.",
          xrefs: ["tx:CJBV"],
        },
        {
          he: "התחשבנות נכשלת: כלל התחשבנות חסר, תקופה סגורה או מקבל לא תקף (תקרית settlement-error ורשומת tx-intel של " +
            "CJ8G).",
          xrefs: ["tx:CJ8G", "tx:KO88", "table:COBRB"],
        },
      ],
      controls: [
        {
          he: "בקרת זמינות פעילה עם מגבלות סבולת; שמירת שחרור תקציב נבדקת כשבקרת הזמינות פעילה.",
          xrefs: ["tx:CJBV", "tx:CJ32"],
        },
        {
          he: "ניהול סטטוסים: REL לפני רישומים, TECO / CLSD בסגירה, DLFL אחרי התחשבנות מלאה.",
          xrefs: ["table:JEST"],
        },
        {
          he: "Test Run לפני CJ88 / CJ8G ו-KO88, ובדיקת כללי התחשבנות מלאים.",
          xrefs: ["tx:CJ88", "tx:CJ8G", "tx:KO88"],
        },
        {
          he: "הרשאות לפי אובייקטי ההרשאה C_PRPS_KOK ו-C_PROJ_VNR (רשומת tx-intel של CJ20N).",
          xrefs: ["tx:CJ20N"],
        },
      ],
      eccToS4: [
        {
          he: "S/4HANA: לפי 'S4TWL - Simplification of maintenance transactions', טרנזקציות התחזוקה (CJ01 עד CJ03, " +
            "‏CJ06, ‏CN21 עד CN23 ועוד) הן חלק מה-compatibility scope; לפי הפריט, מ-S/4HANA 2020 FPS2 הן הורחבו " +
            "(field extensibility) ובזכות ההרחבה הן חלק מה-perpetual scope.",
          xrefs: ["tx:CJ01", "tx:CJ02", "tx:CJ03", "tx:CJ06", "tx:CN21", "tx:CN22"],
        },
        {
          he: "S/4HANA 1511 ואילך: ניווט מ-CJI3N, ‏CJI4N, ‏CN41 ו-CNS0 לאובייקט פותח את CJ20N ולא את טרנזקציית האובייקט " +
            "(ב-ECC למשל CJ08), לפי 'S4TWL - Navigation to Project Builder instead of special maintenance functions'.",
          xrefs: ["tx:CJ20N", "tx:CJI3N"],
        },
        {
          he: "S/4HANA: לפי 'S4TWL - Project Reporting', CJI3 זמינה כחלק מה-compatibility scope ו-CJI3N היא החלופה; " +
            "F6991 ו-F6992 (מ-2022 FPS1) מיועדים להחליף את F2513 ו-F2538, שסומנו deprecated מ-S/4HANA 2023.",
          xrefs: ["tx:CJI3", "tx:CJI3N"],
        },
        {
          he: "S/4HANA: COSP ו-COSS הוחלפו בתצוגות תאימות (compatibility views) בעלות שם זהה, לפי 'S4TWL - DATA MODEL " +
            "CHANGES IN FIN'; קריאה נשמרת, כתיבה הוסרה.",
          xrefs: ["table:COSP", "table:COSS"],
        },
        {
          he: "S/4HANA: ה-BAPIs של ProjectDefinition, ‏Network ו-WorkBreakdownStruct אינם ארכיטקטורת היעד ('S4TWL - " +
            "Selected Project System BAPIs').",
        },
      ],
      migration: [
        {
          he: "אובייקט ההגירה 'PS - Project' (S4_PS_PROJECT_STRUCTURE, ‏Direct Transfer): בוחר פרויקטים מ-PROJ חוץ " +
            "מסגורים ומחוקים, ומעביר הגדרת פרויקט, WBS, היררכיות, אבני דרך, רשתות, פעילויות וקשרים; מחוץ לתחולה: " +
            "סטטוסי מערכת (היעד מקבל CRTD), כללי התחשבנות, רישומי עלות ואישורים.",
        },
        {
          he: "אובייקט ההגירה 'PM - Maintenance order' מטפל בשיוך WBS לנתוני הפקודה ולהתחשבנות (AT_PRPS, ‏AT_COBRB_PRPS " +
            "לפי תקציר החיפוש).",
          xrefs: ["obj:maintenance-order", "table:COBRB"],
        },
      ],
      reference: {
        title: "Orders for Projects | Project System (PS) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/d444d953292a424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התיעוד הרשמי של שיוך פקודות תחזוקה, ייצור ופנימיות ל-WBS (loio d444d953292a424de10000000a174cb4, " +
          "‏2025.001, הגוף נקרא דרך sap-help-body); לצדו עמוד 'Project Settlement' (loio " +
          "f291d353c6244308e10000000a174cb4). עמוד What's New של S/4HANA 2020 'Project Type as Filter in Apps' " +
          "(loio 9d4c36eef8a941419716c377e4a564f3) נוקב בפריט ה-Scope ‏1NT 'Project Financial Control'; עמוד פריט " +
          "ה-Scope עצמו ב-SAP Best Practices Explorer לא נקרא.",
      },
    },
    xrefs: [
      "tx:CJ20N", "tx:CJ01", "tx:CJ02", "tx:CJ03", "tx:CJ06", "tx:CN21", "tx:CN22", "tx:CJ40", "tx:CJ30", "tx:CJ32",
      "tx:CJBV", "tx:CN25", "tx:CN41N", "tx:CN42N", "tx:CN43N", "tx:CJI3", "tx:CJI3N", "tx:CJB1", "tx:CJ88",
      "tx:CJ8G", "tx:KO88", "tx:KO8G", "tx:CO88", "tx:IW31", "tx:IW32", "tx:MD51", "table:AUFK", "table:AFKO",
      "table:AFVC", "table:JEST", "table:COSP", "table:COSS", "table:COBRA", "table:COBRB", "table:ILOA",
      "table:ACDOCA", "fm:K_ORDER_SETTLEMENT", "fm:K_SETTLEMENT_RULE_READ", "obj:maintenance-order",
      "obj:production-order", "obj:planned-order", "bp:order-settlement-process", "bp:period-end-closing-process",
      "bp:maintenance-order-process", "bp:production-order-process",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#CJ20N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "Project Builder: עורך אינטגרטיבי ל-PROJ (הגדרת פרויקט), PRPS (WBS), AUFK/AFKO (רשתות) ו-AFVC (פעילויות), " +
          "עם סטטוסים (JEST); רצף: הגדרה, CJ20N, תקצוב (CJ40)/תכנון, רישומי בפועל, התחשבנות (CJ8G); סטטוס REL נדרש " +
          "לרישום עלויות; שגיאות שכיחות: WBS שאינו אלמנט הקצאת חשבון, סטטוס שאינו מתיר, חריגת תקציב (AVAC), Network " +
          "Profile חסר; BAPIs‏ BAPI_PROJECT_MAINTAIN, BAPI_BUS2054_CREATE, BAPI_BUS2001_GET_STATUS; BAdIs‏ " +
          "WORKBREAKDOWN_UPDATE, NETWORK_UPDATE; Exit‏ CNEX0001; הרשאות C_PRPS_KOK, C_PROJ_VNR. הרשומה מונה את " +
          "CJ01, CJ02, CJ06, CN21, CN22 כ-obsolete (ראו notes).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CJ20N",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#CJ40",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CJ40: תכנון עלויות כולל ושנתי על WBS, לא מחייב (לעומת CJ30 המבוקר בבקרת זמינות), טבלאות PROJ, PRPS, " +
          "RPSCO, COSP, COSS; טעות שכיחה: תכנון על WBS שאינו אלמנט תכנון. הרצף ברשומה: מבנה פרויקט (CJ20N), תכנון " +
          "עלויות (CJ40), תקצוב (CJ30), רישום בפועל, השוואה (CJI3). לפי שדה s4Delta ברשומה, ב-S/4HANA טבלאות " +
          "הסיכומים COSP ו-COSS 'were removed and replaced by identically-named DDL SQL views, called compatibility " +
          "views': קריאה עובדת כבעבר וכתיבה הוסרה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CJ40",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#CJ8G",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CJ8G: התחשבנות מרוכזת של WBS ורשתות לפי COBRA/COBRB, מקבילה ל-CJ88 הבודדת; שגיאות: כלל חסר, תקופה סגורה; " +
          "להריץ Test Run תחילה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CJ8G",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#MD51",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MD51 מתכנן חומרים לפרויקט (WBS) עם מלאי פרויקט ויוצר פקודות מתוכננות ודרישות רכש המוקצות לפרויקט; מחבר " +
          "את PP עם PS.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD51",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של המאגר: קודי PS (CJ30, CJ32, CJBV, CJB1, CJ88, CN25, CN41N, CN42N, CN43N, CJI3, " +
          "CJI3N)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הקטלוג מתאר, מודול PS: CJ30 שינוי תקציב מקורי, CJ32 שינוי שחרור תקציב, CJBV הפעלת בקרת זמינות, CJB1 " +
          "יצירת כלל סילוק קולקטיבית, CJ88 סילוק פרויקטים ורשתות, CN25 דיווח ביצוע רשת, CN41N סקירת מבנה, CN42N / " +
          "CN43N סקירות, CJI3 / CJI3N פריטי שורה של עלויות בפועל.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CJ30",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של המאגר: IW31, IW32, KO8G, CO88",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW31 יצירת הזמנת עבודה, IW32 שינוי הזמנת עבודה (PM); KO8G סילוק בפועל: הזמנות; CO88 סילוק בפועל: הזמנות " +
          "ייצור/תהליך (CO).",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#IW31",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#KO88",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KO88 מעבירה את העלויות שנצברו בפקודה למקבלים שבכלל ההתחשבנות (מרכז עלות, חשבון ראשי, נכס, WBS, CO-PA) על " +
          "בסיס COBRA/COBRB; Test Run לפני Update; KO8G להתחשבנות המונית.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#KO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: function-intel.ts#K_ORDER_SETTLEMENT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "התחשבנות פקודה: העברת עלויות ליעד (מרכז עלות, נכס, WBS); כשלים: כלל התחשבנות חסר, תקופה סגורה, סטטוס " +
          "שאינו מאפשר; קשור ל-KO88 ול-KO8G.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#K_ORDER_SETTLEMENT",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: function-intel.ts#K_SETTLEMENT_RULE_READ",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "קריאת כלל ההתחשבנות (COBRB) של אובייקט לפי OBJNR; הרשומה מסומנת inferred, ו-ECC ו-S/4HANA נשארים לאימות " +
          "ב-SE37.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#K_SETTLEMENT_RULE_READ",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של המאגר: COBRB ו-ILOA",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "COBRB מחזיקה את מקבלי הסילוק (מרכז עלות, חשבון ראשי, WBS, נכס), ומפתח זר PS_PSP_PNR מצביע על PRPS; ILOA " +
          "מחזיקה את נתוני המיקום והקצאת החשבון (מרכז עלות, WBS) של ציוד, מיקום פונקציונלי והזמנה.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#COBRB",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: maint-order-budget",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "maint-order-budget: שחרור פקודת תחזוקה נחסם בחריגת תקציב (Availability Control, ‏BP603), ניתוח ב-KO23, " +
          "IW32, CJ30, טבלאות BPGE ו-BPJA.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#maint-order-budget",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: settlement-error",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KO88/CO88 מסיימים בשגיאה: כלל התחשבנות חסר, תקופת CO/FI סגורה, סטטוס פקודה (CLSD/LKD) או יעד לא תקף; " +
          "ניתוח ב-KO88, CO88, KO02, OB52.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#settlement-error",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Orders for Projects | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/d444d953292a424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio d444d953292a424de10000000a174cb4, הגוף נקרא: 'You can assign various types of orders to a WBS " +
          "element provided the WBS element is an account assignment element'; 'The plan costs for the orders are " +
          "recorded in the project in summarized form'; בין הפקודות: Internal orders, Plant maintenance orders, " +
          "Production orders ו-Sales orders; 'You cannot enter a budget for orders for networks'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settling Orders for Projects | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/e044d953292a424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio e044d953292a424de10000000a174cb4, הגוף נקרא: פקודה לפרויקט מתחשבנת ל-WBS שאליו היא משויכת, ל-WBS או " +
          "פקודה אחרים, או למקבל אחר (מרכז עלות, נכס, מגזר רווחיות); 'when costs are settled, responsibility for " +
          "them passes to the receiver'; בדוגמה, פקודה שהתחשבנה ל-W1 והועברה ל-W2 משאירה את הסכום שהתחשבן מוצג " +
          "ב-W1.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Project Settlement | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/f291d353c6244308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio f291d353c6244308e10000000a174cb4, הגוף נקרא: 'Costs and revenues are collected in projects only " +
          "temporarily'; תנאים: סטטוס שמתיר התחשבנות וכלל התחשבנות בכל שולח; פרופיל ההתחשבנות נשמר ב-Project " +
          "Profile או בסוג הרשת; 'offset entries crediting the project are generated automatically'; התחשבנות ישירה " +
          "או מרובת רמות, ואזהרה שלא להשתמש במרובת רמות לגלגול ערכים בהיררכיה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "System Statuses in Work Breakdown Structures | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/1c77bb53707db44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 1c77bb53707db44ce10000000a174cb4, הגוף נקרא: CRTD מתיר תכנון עלויות ותקצוב; ב-REL 'you can assign " +
          "costs and revenues to WBS elements' ואין מעבר חזרה ל-CRTD; TECO לאלמנטים שהושלמו טכנית ועדיין צפויות בהם " +
          "עלויות; CLSD אוסר רישום עלויות בפועל ל-WBS; DLFL רק כשה-WBS התחשבן במלואו או אינו רלוונטי להתחשבנות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Releasing The Budget | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/ff12d553088f4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio ff12d553088f4308e10000000a174cb4, הגוף נקרא: 'The release is based on the current budget'; שחרור " +
          "ברמה כוללת או שנתית; כשבקרת הזמינות פעילה נשמר רק שחרור ללא שגיאות; בקרת הזמינות בודקת את הערכים המוקצים " +
          "(בפועל ומחויבויות) מול התקציב או השחרור לפי פרופיל התקציב.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Availability Control | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/358fd153370e4608e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 358fd153370e4608e10000000a174cb4, הגוף נקרא: בקרת זמינות פסיבית (סקירת כספים) ופעילה (מונעת הקצאת " +
          "כספים עודפת באזהרות ובשגיאות); משולבת עם CO, FI, PP ו-MM; מגבלות הסבולת לפרויקטים ב-Project System, " +
          "Costs, Budget, Define Tolerance Limits; בודקת את התקציב הניתן לחלוקה (או השחרור) מול הערך המוקצה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Notes for Problems with Availability Control | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/1113d553088f4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 1113d553088f4308e10000000a174cb4, הגוף נקרא: בסוג הפעלה 1 (הפעלה עם הקצאת תקציב) פרויקט שלא תוקצב " +
          "אינו מבוקר, והפתרון: 'Post an original budget to the top WBS element. Then execute a return for the same " +
          "amount'; בקבלת טובין או ברישום פעילות 'only the assigned value is updated'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Use of Order Assignments | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/fbc8b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio fbc8b65334e6b54ce10000000a174cb4, הגוף נקרא: 'The order can be assigned to a WBS (work breakdown " +
          "structure) element or a network operation from the project'; 'the project dates represent the definitive " +
          "basic dates for the order'; בשיוך גם ל-WBS וגם לרשת, תאריכי פעולת הרשת גוברים על תאריכי ה-WBS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Assigning Maintenance Orders to Projects | Product Lifecycle Management (PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/eed5c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio eed5c353b677b44ce10000000a174cb4, הגוף נקרא: פקודות תחזוקה של Revision משויכות לפרויקט ידנית או " +
          "אוטומטית דרך Maintenance Event Builder, בשיוך האוטומטי לפי שדה PM/PS Reference Element ברשימת המשימות; " +
          "תנאי: Revision משויכת לרשת פרויקט; התוצאה: הפקודות משויכות לפעילויות רשת או ל-WBS, ותאריכי הפעילויות " +
          "משמשים לתזמון הפקודות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Using WBS Elements in Billable Maintenance Orders | What's New in SAP S/4HANA 2023 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/d9e0d3a10fac411fb43ccb4022f4ec12.html?locale=en-US&state=PRODUCTION&version=2023.001",
        accessedAt: DATE,
        claim: "loio d9e0d3a10fac411fb43ccb4022f4ec12, הגוף נקרא: 'you can assign billable maintenance orders to " +
          "projects' על ידי הזנת אלמנט ה-WBS בפקודה בת-החיוב; 'project stock components are not allowed in billable " +
          "maintenance orders'; רכיב PM-WOC-MO, תקף מ-S/4HANA 2023 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Distribution of Costs from Production Orders | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/dff4c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio dff4c353b677b44ce10000000a174cb4, הגוף נקרא: בקיבוץ דרישות ל-WBS מקבץ, אחרי תכנון ו-Pegging 'The " +
          "costs are distributed from the production order to the WBS elements that were determined during " +
          "pegging'; לפקודה בסטטוס CLSD החלוקה אינה רצה; WIP וסטיות מתחלקים לאלמנטי ה-WBS שיצרו את הדרישות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating Milestones | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/1b72bb53707db44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 1b72bb53707db44ce10000000a174cb4, הגוף נקרא: 'You can create milestones in networks, standard " +
          "networks, work breakdown structures (WBS) and standard work breakdown structures'; 'You cannot create " +
          "milestones for activity elements'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Project Cost Overview | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/1448cfa991784030b1a4a39f425cfd1c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 1448cfa991784030b1a4a39f425cfd1c, הגוף נקרא: היישום מנתח עלויות בפועל ומתוכננות של פרויקט, WBS, " +
          "הזמנות פנימיות, פקודות ייצור, רשתות 'and plant maintenance orders with header account assignment'; 'The " +
          "planned costs are derived from the central financial planning table, ACDOCP ; and the actual costs are " +
          "derived from the table for universal journal entry, ACDOCA'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F6991 'Project Cost Overview', release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F6991')/S32OP",
        accessedAt: DATE,
        claim: "ספריית ה-Fiori (scripts/fal-app.mjs): F6991 'Project Cost Overview', אנליטי, תפקיד " +
          "SAP_BR_PROJ_FIN_CONTROLLER (Project Financial Controller), קטלוג 'PS - Project Financial Control', קודם: " +
          "F2513; באותה בדיקה F6992 'Project Cost Line Items' (קודם F2538, שירות UI_PROJECTCOSTLINEITEM), F0295 " +
          "'Confirm Project Milestone' (תפקידים SAP_BR_PROJ_FIN_CONTROLLER ו-SAP_BR_PROJ_LOG_CONTROLLER, טרנזקציה " +
          "מובילה CJ20N, שירות PS_MILESTONE_CONFIRM) ו-F0296 'Confirm Network Activity' " +
          "(SAP_BR_PROJ_LOG_CONTROLLER, קטלוג 'PS - Project Logistics Control', טרנזקציה מובילה CN25, שירות " +
          "PS_ACTIVITY_CONFIRM).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F0539 'Change Network Activity Status' (SAP Fiori (SAPUI5)), release S32OP",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0539')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת במהדורת S/4HANA 2025 FPS01 (S32OP) את האפליקציה F0539 'Change " +
          "Network Activity Status' (SAP Fiori (SAPUI5), 'Published') עם קוד הטרנזקציה המוביל CJ20N (אומת ברשומת " +
          "tx:CJ20N; באותה רשומה גם F0286A 'Milestone').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 10.1.60 " +
          "S4TWL - Simplification of maintenance transactions",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE,
        claim: "הפריט (Application Component PS, נקרא בטקסט המחולץ של הרשימה): 'Several maintenance transactions for " +
          "projects in project sytem are part of the SAP S/4HANA compatibility scope'; 'With SAP S/4HANA 2020 FPS2 " +
          "below transactions are enhanced with SAP S/4HANA capabilities (i.e. field extensibility), with this " +
          "enhancement they are part of SAP S/4HANA perpetual scope', והרשימה כוללת CJ01, CJ02, CJ03, CJ06, CJ07, " +
          "CJ08, CJ11 עד CJ14, CJ20, CJ2A, CJ2D, CN21, CN22, CN23, CJ27, CJ2B, CJ2C.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 10.1.34 " +
          "S4TWL - Navigation to Project Builder instead of special maintenance",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE,
        claim: "הפריט (נקרא בטקסט המחולץ): 'As of SAP S/4HANA 1511, when navigating to the details of an project object " +
          "from the reports CJI3N, CJI4N, CN41, CNS0, the object opens in the single maintenance transaction CJ20N " +
          "(Project Builder). Previously navigation opened the object in single maintenance transaction for the " +
          "object, e.g. CJ08 for Project Definition'; נדרשת העברת ידע למשתמשי קצה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 10.1.50 " +
          "S4TWL - Project Reporting",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE,
        claim: "הפריט (נקרא בטקסט המחולץ): 'The transaction CJI3 Project Actual Cost Line Items can only be used as part " +
          "of the SAP S/4HANA compatibility scope'; 'Transaction CJI3N Projects Line Items Actual Costs New can be " +
          "used as an alternative'; היישומים F2513 ו-F2538 מ-1709, ו-'As of SAP S/4HANA 2022 FPS1 also the new SAP " +
          "Fiori apps Project Cost Overview (F6991) and Project Cost Line Items (F6992) are available and intended " +
          "to replace the Fiori apps F2513 and F2538 in future. These Fiori apps are hence deprecated as of SAP " +
          "S/4HANA 2023'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 10.1.35 " +
          "S4TWL - Selected Project System BAPIs",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE,
        claim: "הפריט (Application Component PS-ST, נקרא בטקסט המחולץ): ה-BAPIs של ProjectDefinition, Network " +
          "ו-WorkBreakdownStruct 'are not considered as the target architecture'; מומלץ 'to use the corresponding " +
          "BAPIs for business objects ProjectDefinitionPI, NetworkPI, and WBSPI (within package CNIF_PI)' או OData " +
          "APIs‏ OP_API_PROJECT_V3_0001 ו-OP_API_PROJECTNETWORK_0001; 'No influence on business processes " +
          "expected'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.1.4 S4TWL - DATA MODEL CHANGES " +
          "IN FIN (FI-GL), p. 159, 160, 163",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TB_15,
        claim: "פריט הפישוט 6.1.4 S4TWL - DATA MODEL CHANGES IN FIN (Application Component: FI-GL), שנקרא ישירות מקובץ " +
          "ה-PDF, קובע בעמ' 160: 'With the installation of SAP Simple Finance, on-premise edition totals and " +
          "application index tables were removed and replaced by identically-named DDL SQL views, called " +
          "compatibility views'. בטבלת המיפוי שבאותו עמוד, תחת הכותרות Original Table, Compatibility View " +
          "(identically-named view in DDIC), DDL Source (for the identically-named DDIC View) ו-Backup Table (for " +
          "original table content), מופיעה השורה: COSP, COSP, V_COSP_DDL, COSP_BAK. אותו פריט מוסיף: 'The " +
          "compatibility views ensure database SELECTs work as before. However, write access (INSERT, UPDATE, " +
          "DELETE, MODIFY) was removed from SAP standard, or has to be removed from custom code'. בעמ' 163, בטבלת " +
          "תצוגות ה-DDIC הישנות שהוחלפו, מופיעה השורה Original DDIC database view: V_COSP_A, Obsolete database " +
          "table used: COSP, As of release: sFIN 1.0, Replaced by: Code. הפריט מפנה ל-Business Impact note " +
          "0002270333 'Data Model Changes in FIN' ול-SAP note 1976487; שני המספרים מצוטטים כלשונם מהמסמך הציבורי " +
          "ולא נקראו בפועל. (אומת ברשומת table:COSP)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PS - Project | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/968b480bbec34454baff85baaa38dd9b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 968b480bbec34454baff85baaa38dd9b, הגוף נקרא: Migration Approach 'Direct Transfer - ERP'; פרויקטים " +
          "רלוונטיים (חוץ מסגורים ומחוקים) נבחרים מטבלת PROJ; בתחולה: הגדרת פרויקט, WBS, היררכיות, אבני דרך, רשתות, " +
          "פעילויות וקשרים; מחוץ לתחולה: סטטוסי מערכת (ביעד 'Created or CRTD'), כללי התחשבנות, רישומי עלות " +
          "ואישורים; שם האובייקט S4_PS_PROJECT_STRUCTURE; תקציר החיפוש נוקב ב-BAPI_PROJECT_MAINTAIN תחת APIs/BAPIs.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance order | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/edf9651b00514f4082e8aa81f83827aa.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "תקציר רשומת החיפוש (loio edf9651b00514f4082e8aa81f83827aa): 'AT_PRPS: To handle WBS elements for order " +
          "master data AT_COBRB_PRPS: To handle WBS elements for order settlement'. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Project Type as Filter in Apps | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/9d4c36eef8a941419716c377e4a564f3.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE,
        claim: "loio 9d4c36eef8a941419716c377e4a564f3, הגוף נקרא: 'Scope Item 1NT ( Project Financial Control )', " +
          "Application Component PS-FIO, זמין מ-S/4HANA 2020; המסנן זמין ב-Project Cost Report (F2513) וב-Manage " +
          "Project Procurement (F2930).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, Plant Maintenance with SAP S/4HANA: Business User Guide), פרק 6, סעיף " +
          "6.9.1 'Project System'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף 6.9.1 'Project System' תחת 6.9 'Project-Based Maintenance' (לצד 6.9.2 'Maintenance Event " +
          "Builder'); הפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#6.9.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט, פרק 8 'Plant Maintenance Controlling', סעיף 8.3.4 'Budgeting Using WBS Elements'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף 8.3.4 'Budgeting Using WBS Elements' בפרק בקרת התחזוקה (לצד תקצוב פקודות, מרכזי עלות ותוכניות " +
          "השקעה); הפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#8.3.4",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט (SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide), פרק 9 'Project " +
          "System'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פרק 9 'Project System' מונה בין היתר את F0296 'Confirm Network Activity', ‏F0295 'Confirm Project " +
          "Milestone', ‏F0286A 'Milestone', ‏F6991 'Project Cost Overview' ו-F6992 'Project Cost Line Items'; " +
          "הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F6991",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "רשומת תהליך: מבוססת על רשומות המאגר הנקובות, על 15 עמודי help.sap.com שגופם נקרא ב-sap-help-body " +
      "(2025.001, 2023.001 ו-2020.000; העמוד 'PM - Maintenance order' נשען על תקציר החיפוש בלבד), על ספריית " +
      "ה-Fiori (fal-app, S32OP) ועל רשימת הפישוט 2025 FPS01. חיפושים שרצו (scripts/sap-help-search.mjs, " +
      "2026-09-24): 'Project Financial Control', 'Project Logistics Control', 'Project System structures " +
      "project definition WBS element network', 'availability control budget project WBS', 'settlement WBS " +
      "element project settlement rule', 'orders assigned to WBS element maintenance order project', " +
      "'production order account assignment WBS element project', 'Project Financial Control scope item 1NT', " +
      "'BAPI_PROJECT_MAINTAIN', 'BAPI_BUS2054_CREATE_MULTI' (אף רשומה אינה נוקבת בשם), 'PS - WBS element Data " +
      "Migration'. סתירה פתוחה: רשומת tx-intel של CJ20N מונה את CJ01, ‏CJ02, ‏CJ06, ‏CN21 ו-CN22 כ-obsolete, " +
      "ואילו 'S4TWL - Simplification of maintenance transactions' קובע שהן הורחבו ב-2020 FPS2 והן ב-perpetual " +
      "scope; הרשומה נשענת על הפריט הרשמי. שמות ה-BAPI ברשומת tx-intel (BAPI_BUS2054_CREATE, " +
      "BAPI_BUS2001_GET_STATUS) לא אותרו בחיפוש רשמי ונשארים לאימות ב-SE37. PROJ, ‏PRPS, ‏RPSCO, ‏BPGE, ‏BPJA " +
      "ו-ACDOCP אינן במילון הפרויקט; אין ביישומי ה-Fiori של המאגר יישום PS ולכן אין קישורי fiori:, ואין תצוגת " +
      "CDS של PS במאגר. KPIs לא נרשמו: אף מקור אינו מגדיר מדד לתהליך. עמוד פריט ה-Scope ‏1NT לא נקרא. לא בוצעה " +
      "בדיקה במערכת SAP חיה.",
  },
  /* =========================================================== ewm warehouse */
  {
    slug: "ewm-warehouse-process",
    he: "תהליכי מחסן ב-EWM: קליטה, אחסון וניפוק",
    en: "EWM inbound, putaway and outbound warehouse processes",
    module: "Cross",
    summary: "ב-EWM כל תנועה פיזית במחסן נשענת על בקשת מחסן (Warehouse Request): מסירה נכנסת לקליטה ואחסון, הזמנת " +
      "מסירה יוצאת (Outbound Delivery Order) לליקוט וניפוק. מבקשת המחסן נוצרות משימות מחסן (Warehouse Tasks), " +
      "שמקובצות להזמנות מחסן (Warehouse Orders) כחבילות עבודה; אישור המשימות ורישום הקבלה או הניפוק סוגרים את " +
      "המעגל מול ניהול המלאי. אותו מנגנון משרת גם את אספקת החומר לייצור.",
    context: "לפי תיעוד EWM לגרסת 2025 FPS01, בקשת המחסן מסוג מסירה נכנסת או הזמנת מסירה יוצאת היא הבסיס לפעולות אחסון " +
      "והוצאה מהמלאי, ו-EWM רושם על בסיסה את תנועות הקבלה והניפוק. בצד S/4HANA מסירה נכנסת נוצרת מהודעת משלוח " +
      "מוקדמת ומופצת ל-EWM, ומסירה יוצאת נוצרת מהזמנת הלקוח. קוד הטרנזקציה בצד EWM הוא /SCWM/PRDI למסירה נכנסת, " +
      "/SCWM/PRDO להזמנת מסירה יוצאת ו-/SCWM/MON למוניטור המחסן; ב-Fiori קיימים Change Inbound Delivery " +
      "(F1706), Run Outbound Process - Deliveries (F1704) ו-Process Warehouse Tasks - Picking / Putaway (F3880, " +
      "F4150), שאינם בקטלוג ה-Fiori של הפרויקט. בצד ECC ניהול המחסן הקלאסי (LE-WM) עובד בפקודות העברה (LT01, " +
      "LT03, LT04, אישור ב-LT12) על LTAK, LTAP ו-LQUA; רשימת הפישוט 2025 FPS01 קובעת בפריט 'S4TWL - Warehouse " +
      "Management (WM)' ש-LE-WM אינו ארכיטקטורת היעד וש-EWM ו-Stock Room Management הם החלופות.",
    steps: [
      {
        he: "קליטה: S/4HANA יוצר מסירה נכנסת מהודעת משלוח מוקדמת ומפיץ אותה ל-EWM, ו-EWM יוצר ממנה בקשת מחסן שהיא " +
          "נקודת הפתיחה לאחסון. בודקים את המסירה ב-/SCWM/PRDI (Maintain Inbound Deliveries) או ביישום Change " +
          "Inbound Delivery (F1706).",
        xrefs: ["tx:/SCWM/PRDI"],
      },
      {
        he: "ליצור משימות מחסן לאחסון: אוטומטית בפעולת PPF או ידנית (Create Warehouse Tasks - Inbound Delivery). " +
          "אסטרטגיית האחסון קובעת את תא היעד, ובקרת האחסון (ישירה או משולבת) קובעת אם ה-HU עובר דרך תאי ביניים. לפי " +
          "רשומת המאגר /SCWM/TODLV_TO יוצרת משימת מחסן למסירה.",
        xrefs: ["tx:/SCWM/TODLV_TO"],
      },
      {
        he: "לקבץ משימות להזמנות מחסן לפי כללי יצירת הזמנות המחסן ב-Customizing: הזמנת מחסן היא חבילת עבודה אחת לעובד " +
          "בזמן נתון, ומקבצת משימות מחסן או פריטי ספירת מלאי.",
        xrefs: ["tx:/SCWM/MON"],
      },
      {
        he: "לבצע ולאשר: אישור משימות המחסן במסוף RF (/SCWM/RFUI), ב-/SCWM/TO_CONF (Confirm Warehouse Tasks - " +
          "Advanced), מתוך המוניטור, או ביישום Process Warehouse Tasks - Putaway (F4150). EWM רושם את תנועת הקבלה " +
          "על בסיס בקשת המחסן.",
        xrefs: ["tx:/SCWM/RFUI", "tx:/SCWM/TO_CONF", "tx:/SCWM/MON", "obj:material-document"],
      },
      {
        he: "ניפוק: הזמנת לקוח מייצרת מסירה יוצאת ב-S/4HANA (VL01N), ו-EWM יוצר ממנה הזמנת מסירה יוצאת כבקשת מחסן. " +
          "בודקים ב-/SCWM/PRDO (Outbound Delivery Orders) או ב-Run Outbound Process - Deliveries (F1704).",
        xrefs: ["tx:VL01N", "tx:/SCWM/PRDO", "table:LIKP", "table:LIPS", "bp:order-to-cash-process"],
      },
      {
        he: "ליקוט: משימות מחסן לליקוט נוצרות כברירת מחדל בשחרור גל (/SCWM/WAVE, Process Waves), בפעולת PPF או ידנית, " +
          "ומקובצות להזמנות מחסן. הביצוע ב-RF או ביישום Process Warehouse Tasks - Picking (F3880).",
        xrefs: ["tx:/SCWM/WAVE", "tx:/SCWM/RFUI"],
      },
      {
        he: "לאשר את משימות הליקוט (אישור רושם הפרשים בין הכמות הנדרשת לכמות שלוקטה), לארוז ב-/SCWM/PACK (Pack " +
          "Handling Units - Advanced) ולהעמיס, ואז לרשום ניפוק לבקשת המחסן. EWM מקטין את מלאי תא המקור. ניפוק לא " +
          "מתוכנן: /SCWM/ADGI (Post Goods Issue - Unplanned).",
        xrefs: ["tx:/SCWM/PACK", "tx:/SCWM/ADGI", "bp:goods-movement-process"],
      },
      {
        he: "אספקה לייצור: יצירת פקודה (CO01 / COR1), שחרורה והפעלת Material Staging (CO02 להזמנת ייצור, COR2 להזמנת " +
          "תהליך) יוצרים ב-Advanced Production Integration בקשת חומר לייצור (PMR) ב-EWM; מתכננים משימות Staging " +
          "לאזור אספקת הייצור (PSA), רושמים צריכה, וקולטים תוצרת לאחסון. בחלופה מבוססת מסירה, הזמנת מסירה יוצאת " +
          "ל-PSA ב-/SCWM/PRDO וניפוק אוטומטי בדוח /SCWM/DLV_GIPSA.",
        xrefs: [
          "tx:CO01", "tx:COR1", "tx:COR2", "obj:production-order", "obj:process-order", "table:RESB",
          "bp:material-staging-and-reservation",
        ],
      },
      {
        he: "לנטר ולהתאים: מוניטור המחסן /SCWM/MON לעבודה פתוחה, ובדיקת מלאי EWM מול ניהול המלאי (MMBE) כשיש פער; לפי " +
          "תקרית wm-ewm-stock-mismatch הסיבות האפשריות הן תנועה שלא הועברה, תור EWM תקוע או סנכרון שנכשל.",
        xrefs: ["tx:/SCWM/MON", "tx:MMBE", "table:MARD"],
      },
    ],
    antiPatterns: [
      "יצירת משימות מחסן בלי כללי יצירת הזמנות מחסן: העבודה אינה מקובצת לחבילות, ולפי התיעוד היצירה האוטומטית " +
        "להזמנות מחסן דורשת את הגדרות ה-Customizing.",
      "טיפול בפער מלאי EWM מול ניהול המלאי בתנועה ידנית בלי לבדוק קודם את התור ואת התנועה שלא הועברה (תקרית " +
        "wm-ewm-stock-mismatch).",
      "תכנון תהליך אחסון או ניפוק מורכב (תאי ביניים, Deconsolidation) בלי Handling Units: לפי תיעוד EWM תהליכים " +
        "מורכבים אפשריים רק עם HU.",
      "הסתמכות על EWM לבדיקת זמינות בניפוק: לפי תיעוד EWM הבדיקה נעשית ברמת הרכיבים שקדמו לו ו-EWM מבצע תפקיד " +
        "ביצועי בלבד.",
      "המשך פיתוח על פונקציות LE-WM שנמנות ב-compatibility scope (למשל Wave Management של LE-WM) בלי תכנית " +
        "יציאה: לפי פריט הפישוט אלה חלק מ-compatibility scope עם זכויות שימוש מוגבלות (SAP Note 2269324).",
    ],
    checks: [
      "חיובי: מסירה נכנסת מ-S/4HANA מופיעה ב-/SCWM/PRDI, משימות האחסון נוצרות והסטטוס Putaway Planning עובר " +
        "ל-Completed.",
      "חלקי: משימות אחסון לחלק מהכמות מציבות Putaway Planning במצב Partially Completed.",
      "יציאה: הזמנת מסירה יוצאת ב-/SCWM/PRDO, משימות ליקוט מקובצות להזמנת מחסן, אישור ורישום ניפוק מקטינים את " +
        "מלאי תא המקור.",
      "הפרשים: אישור ליקוט בכמות חסרה רושם את ההפרש מול הכמות הנדרשת.",
      "ייצור: שחרור פקודה והפעלת Staging יוצרים PMR ב-EWM, והצריכה מעדכנת את ה-PMR ואת הפקודה.",
      "התאמה: אין פער בין המלאי ב-/SCWM/MON לבין MMBE.",
    ],
    process: {
      purpose: "לבצע את התנועה הפיזית של טובין במחסן ברמת התא: קליטה ואחסון מסירות נכנסות, ליקוט, אריזה וניפוק להזמנות " +
        "מסירה יוצאות ואספקת חומר לייצור, כשכל פעולה מתועדת במשימת מחסן ומסונכרנת לניהול המלאי.",
      trigger: [
        {
          he: "הודעת משלוח מוקדמת ממערכת חיצונית: S/4HANA יוצר מסירה נכנסת ומפיץ אותה ל-EWM.",
          xrefs: ["tx:/SCWM/PRDI"],
        },
        {
          he: "הזמנת לקוח: עיבוד היציאה יוצר מסירות יוצאות לפי שורות התזמון המאושרות, ו-EWM משתמש בהן לתהליכי המחסן.",
          xrefs: ["tx:VL01N"],
        },
        {
          he: "שחרור פקודת ייצור או הזמנת תהליך והפעלת Material Staging.",
          xrefs: ["tx:COR2", "obj:production-order", "obj:process-order"],
        },
        {
          he: "תנועת סחורה שנרשמה בניהול המלאי ומועברת ל-EWM.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE"],
        },
      ],
      preconditions: [
        {
          he: "לפי עמוד EWM Integration (2025 FPS01): שימוש ב-EWM Integration במערכת ה-ERP מחייב הפעלת Business " +
            "Function‏ LOG_LE_INTEGRATION ו-Customizing של Logistics Execution תחת Extended Warehouse Management " +
            "Integration; העמוד אינו מבחין בין EWM מוטמע למבוזר.",
        },
        {
          he: "הגדרות בסיס ב-Customizing של EWM: סוגי אחסון, אזורי אחסון ותאים, Activity Areas, עמדות עבודה, דלתות " +
            "ואזורי Staging.",
        },
        {
          he: "פעולת PPF ליצירת משימות אחסון אוטומטית, וכללי יצירת הזמנות מחסן (Cross-Process Settings, Warehouse " +
            "Order).",
        },
        {
          he: "לניפוק: אסטרטגיית הוצאה (Stock Removal Strategy) ומחוון בקרת הוצאה מוגדרים; בקשת המחסן שלמה ורלוונטית " +
            "לליקוט.",
        },
        {
          he: "לאספקה לייצור: אזורי אספקת ייצור (PSA) עם תאים משויכים; לניפוק אוטומטי, סוג המסמך רשום והדוח " +
            "/SCWM/DLV_GIPSA מתוזמן.",
        },
      ],
      masterData: [
        {
          he: "נתוני מחסן בחומר: MLGN (לכל מספר מחסן) ו-MLGT (לכל סוג אחסון), שמשמשים מקור להעברת Warehouse Product " +
            "ל-EWM לצד MARA ו-MARC.",
          xrefs: ["table:MLGN", "table:MLGT", "table:MARA", "table:MARC"],
        },
        { he: "מבנה המחסן: סוגי אחסון, אזורים ותאים; Activity Areas; עמדות עבודה ודלתות." },
        { he: "אזור אספקת ייצור (PSA) עם תאים משויכים, שממנו נקבע אזור ה-Staging." },
        { he: "Handling Units: תהליכי אחסון והוצאה מורכבים ב-EWM דורשים HU." },
      ],
      roles: [
        {
          he: "SAP_BR_WAREHOUSE_CLERK_EWM (Warehouse Clerk, EWM): Change Inbound Delivery (F1706), Run Outbound Process " +
            "- Deliveries (F1704) ויישומי Process Warehouse Tasks, לפי ספריית יישומי Fiori (S32OP).",
        },
        {
          he: "SAP_BR_WAREHOUSE_OPERATIVE_EWM (Warehouse Operative, EWM): Process Warehouse Tasks - Picking (F3880) " +
            "ו-Putaway (F4150).",
        },
      ],
      transactions: [
        {
          he: "קליטה: /SCWM/PRDI (Maintain Inbound Deliveries); Fiori‏ Change Inbound Delivery (F1706), שהיורש שלו " +
            "בספרייה הוא Manage Inbound Deliveries - Warehouse (F7922).",
          xrefs: ["tx:/SCWM/PRDI"],
        },
        {
          he: "משימות מחסן: /SCWM/TODLV_TO (לפי רשומת המאגר), /SCWM/ADPROD (Create Warehouse Tasks - Product), אישור " +
            "ב-/SCWM/TO_CONF; RF ב-/SCWM/RFUI.",
          xrefs: ["tx:/SCWM/TODLV_TO", "tx:/SCWM/ADPROD", "tx:/SCWM/TO_CONF", "tx:/SCWM/RFUI"],
        },
        {
          he: "יציאה: /SCWM/PRDO (Outbound Delivery Orders), /SCWM/WAVE (Process Waves), /SCWM/PACK, /SCWM/ADGI; Fiori‏ " +
            "Run Outbound Process - Deliveries (F1704), שהיורש שלו הוא Manage Outbound Delivery Orders (F6498).",
          xrefs: ["tx:/SCWM/PRDO", "tx:/SCWM/WAVE", "tx:/SCWM/PACK", "tx:/SCWM/ADGI"],
        },
        {
          he: "ניטור: /SCWM/MON (Warehouse Monitor); זו הטרנזקציה המובילה של Process Warehouse Tasks - Picking (F3880) " +
            "ו-Putaway (F4150).",
          xrefs: ["tx:/SCWM/MON"],
        },
        {
          he: "צד S/4HANA: VL01N / VL02N למסירה יוצאת, MIGO לתנועות בניהול המלאי, CO01 / COR1 / COR2 לפקודות " +
            "ול-Material Staging, MF60 ב-REM.",
          xrefs: ["tx:VL01N", "tx:VL02N", "tx:MIGO", "tx:CO01", "tx:COR1", "tx:COR2", "tx:MF60"],
        },
        {
          he: "צד ECC (LE-WM): LT01 יצירת פקודת העברה, LT03 מתוך מסירה, LT04 מתוך דרישת העברה, LT12 אישור.",
          xrefs: ["tx:LT01", "tx:LT03", "tx:LT04", "tx:LT12"],
        },
      ],
      tables: [
        {
          he: "מסירה יוצאת בצד S/4HANA: LIKP / LIPS.",
          xrefs: ["table:LIKP", "table:LIPS"],
        },
        {
          he: "מלאי בניהול המלאי: MARD; רזרבציה לרכיבי פקודה: RESB; מסמך חומר (ב-S/4HANA ב-MATDOC, שאינה במילון " +
            "הפרויקט).",
          xrefs: ["table:MARD", "table:RESB", "obj:material-document", "obj:reservation"],
        },
        {
          he: "נתוני אב מחסן בחומר: MLGN, MLGT.",
          xrefs: ["table:MLGN", "table:MLGT"],
        },
        {
          he: "ECC (LE-WM): LTAK / LTAP פקודות העברה, LQUA Quants, LAGP תאים.",
          xrefs: ["table:LTAK", "table:LTAP", "table:LQUA", "table:LAGP"],
        },
      ],
      interfaces: [
        {
          he: "BAPIs של ניהול המלאי לרישום וביטול תנועות מול EWM: BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE"],
        },
        {
          he: "שירותי OData של יישומי המסירות: /SCWM/SIMPLE_INB_DLV_SRV (F1706) ו-/SCWM/SIMPLE_OUTB_DLV_SRV (F1704), " +
            "לפי ספריית יישומי Fiori.",
        },
        {
          he: "EWM מבוזר: הפצת נתוני אב חומר ב-MATMAS (סוג בסיסי MATMAS05) נקובה בתרחישי EWM מבוזר.",
          xrefs: ["idoc:msg:MATMAS", "idoc:basic:MATMAS05"],
        },
        {
          he: "BAdI‏ WORKORDER_UPDATE לתהליך האוטומטי של Expected Goods Receipts מפקודות.",
          xrefs: ["enh:badi:WORKORDER_UPDATE"],
        },
      ],
      integrationPoints: [
        {
          he: "ניהול מלאי: EWM רושם קבלה וניפוק על בסיס בקשת המחסן; תנועות מניהול המלאי מועברות ל-EWM.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE", "obj:material-document", "bp:goods-movement-process"],
        },
        {
          he: "מכירות והפצה: מסירות יוצאות מהזמנות לקוח; החיוב מבוסס על המסירות.",
          xrefs: ["tx:VL01N", "bp:order-to-cash-process"],
        },
        {
          he: "ייצור: Advanced Production Integration להזמנות ייצור ולהזמנות תהליך (PMR, Staging, צריכה, קליטה מייצור); " +
            "רכיבי PP-SFC, ‏PP-PI, ‏PP-REM ו-Kanban.",
          xrefs: ["tx:COR2", "tx:MF60", "bp:material-staging-and-reservation"],
        },
        { he: "אינטגרציה ל-PP בשתי תצורות: EWM מוטמע ב-S/4HANA, ו-EWM שאינו מוטמע (בלי תנועות סחורה סינכרוניות)." },
        { he: "תחזוקה: ספר 6 מקדיש פרק לאינטגרציית EWM עם פקודות תחזוקה (תהליכי יציאה וכניסה)." },
      ],
      outputs: [
        {
          he: "בקשת מחסן: מסירה נכנסת או הזמנת מסירה יוצאת ב-EWM.",
          xrefs: ["tx:/SCWM/PRDI", "tx:/SCWM/PRDO"],
        },
        { he: "משימות מחסן והזמנות מחסן; הדפסה של בקשת המחסן עם המשימות משמשת מסמך ליקוט." },
        {
          he: "רישום קבלה או ניפוק שמעדכן את ניהול המלאי (מסמך חומר).",
          xrefs: ["obj:material-document"],
        },
        { he: "בייצור: בקשת חומר לייצור (PMR) ב-EWM, שנסגרת אוטומטית עם סגירת הפקודה." },
      ],
      exceptions: [
        {
          he: "דחיית מסירה נכנסת ב-EWM: הכמות המתוכננת מאופסת, S/4HANA מקבל הודעה ובקשת המחסן מקבלת סטטוס Completed.",
        },
        { he: "משימות אחסון שלא כיסו את כל הכמות: Putaway Planning במצב Partially Completed." },
        { he: "הפרשי ליקוט: נרשמים באישור המשימה, בין הכמות הנדרשת לכמות שלוקטה." },
        {
          he: "פער מלאי EWM מול ניהול המלאי (תקרית wm-ewm-stock-mismatch): תנועה שלא הועברה, תור EWM תקוע או סנכרון " +
            "שנכשל; בדיקה ב-/SCWM/MON ומול MMBE.",
          xrefs: ["tx:/SCWM/MON", "tx:MMBE", "table:MARD", "table:LQUA"],
        },
        {
          he: "הפרשי כמות באחסון ל-HU שטרם אוחסנו סופית: טיפול ב-/SCWM/PACK.",
          xrefs: ["tx:/SCWM/PACK"],
        },
      ],
      controls: [
        { he: "אישור משימת המחסן הוא הרישום של השלמת הפעולה הפיזית; ההפרשים נרשמים באישור." },
        { he: "כללי יצירת הזמנות מחסן קובעים את היקף חבילת העבודה ואת סוגה." },
        { he: "EWM אינו מבצע בדיקת זמינות עצמאית בניפוק; הבדיקה נעשית ברמת הרכיבים שקדמו לו." },
        {
          he: "ניטור שוטף של עבודה פתוחה ותורים במוניטור המחסן.",
          xrefs: ["tx:/SCWM/MON"],
        },
      ],
      eccToS4: [
        {
          he: "ECC: ניהול מחסן קלאסי (LE-WM) בפקודות העברה LT01 / LT03 / LT04 ואישור LT12 על LTAK, LTAP ו-LQUA; לצדו " +
            "אינטגרציית ERP עם מערכת SAP EWM נפרדת, שבה המסירה נבדקת ב-/SCWM/PRDI.",
          xrefs: ["tx:LT01", "tx:LT03", "tx:LT04", "tx:LT12", "table:LTAK", "table:LTAP", "table:LQUA", "tx:/SCWM/PRDI"],
        },
        {
          he: "S/4HANA 2025 FPS01, פריט 'S4TWL - Warehouse Management (WM)': LE-WM אינו ארכיטקטורת היעד; החלופות הן EWM " +
            "ו-Stock Room Management (מ-1909). Stock Room Management משתמש מחדש בחלקים עיקריים של LE-WM וניתן לשימוש " +
            "אחרי 2025, בלי הגירה טכנית.",
        },
        {
          he: "לפי אותו פריט, Task & Resource Management, ממשק Warehouse Control Unit, ‏VAS, ‏Yard Management, " +
            "‏Cross-Docking, ‏Wave Management ו-WM מבוזר אינם חלק מ-Stock Room Management והם ב-compatibility scope " +
            "עם זכויות שימוש מוגבלות (SAP Note 2269324).",
        },
        {
          he: "פריט 'S4TWL - Wave Management': ניהול הגלים של LE-WM נשאר ב-compatibility packages לזמן מוגבל, והחלופה " +
            "היא Wave Management ב-EWM (ב-EWM: /SCWM/WAVE).",
          xrefs: ["tx:/SCWM/WAVE"],
        },
        {
          he: "S/4HANA: EWM מוטמע ב-S/4HANA או EWM מבוזר המבוסס על S/4HANA; יישומי Fiori ל-EWM (F1706, F1704, F3880, " +
            "F4150) מפורסמים ב-S32OP.",
          xrefs: ["tx:/SCWM/MON"],
        },
        {
          he: "רשומות המאגר ecc-s4.ts#ewm ו-lifecycle.ts#LT03 מתארות את WM הקלאסי כולו כ-compatibility; פריט 2025 FPS01 " +
            "מבחין בין Stock Room Management לבין רכיבי ה-compatibility, ולכן הניסוח במאגר מחייב דיוק.",
          xrefs: ["tx:LT03"],
        },
      ],
      migration: [
        {
          he: "העברת Warehouse Product ל-EWM: טבלאות המקור ב-S/4HANA הן MLGN ו-MLGT לצד MARA ו-MARC, עם מיפוי שדות " +
            "LE-WM אל EWM.",
          xrefs: ["table:MLGN", "table:MLGT", "table:MARA", "table:MARC"],
        },
        {
          he: "הגירת נתונים מ-SAP EWM ל-EWM ב-S/4HANA: גישת Direct Transfer (What's New 2022) וגישת Staging Table " +
            "(What's New 2023 FPS01).",
        },
        { he: "מעבר מ-LE-WM ל-Stock Room Management אינו דורש הגירה טכנית, לפי פריט הפישוט." },
      ],
      reference: {
        title: "Warehouse Req. - Type Inbound Del. or Outbound Del. Order | Extended Warehouse Management (EWM) (SAP " +
          "S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/39cecb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תיעוד EWM שמגדיר את בקשת המחסן כבסיס לאחסון ולהוצאה מהמלאי ולרישום הקבלה והניפוק (גוף העמוד נקרא). " +
          "פריטי SAP Best Practices הנקובים ברשומות רשמיות: 1FS (Basic Warehouse Inbound Processing from Supplier) " +
          "ו-1G2 (Basic Warehouse Outbound Processing to Customer), לפי What's New. העמוד הוא עמוד ההגדרה של בקשת " +
          "המחסן, המשותף לעיבוד הנכנס ולעיבוד היוצא; שלבי התהליך עצמם מפורטים בעמודי Goods Receipt ו-Goods Issue " +
          "שבראיות.",
      },
    },
    xrefs: [
      "tx:/SCWM/PRDI", "tx:/SCWM/PRDO", "tx:/SCWM/MON", "tx:/SCWM/TO_CONF", "tx:/SCWM/WAVE", "tx:/SCWM/RFUI",
      "tx:/SCWM/PACK", "tx:/SCWM/ADGI", "tx:/SCWM/ADPROD", "tx:/SCWM/TODLV_TO", "tx:LT01", "tx:LT03", "tx:LT04",
      "tx:LT12", "tx:VL01N", "tx:VL02N", "tx:MIGO", "tx:COR2", "tx:MF60", "tx:MMBE", "table:LIKP", "table:LIPS",
      "table:MARD", "table:RESB", "table:MLGN", "table:MLGT", "table:LTAK", "table:LTAP", "table:LQUA", "table:LAGP",
      "fm:BAPI_GOODSMVT_CREATE", "idoc:msg:MATMAS", "enh:badi:WORKORDER_UPDATE", "obj:material-document",
      "obj:reservation", "obj:production-order", "obj:process-order", "bp:material-staging-and-reservation",
      "bp:goods-movement-process", "bp:order-to-cash-process",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Warehouse Req. - Type Inbound Del. or Outbound Del. Order | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/39cecb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 39cecb53ad377114e10000000a174cb4) קובע: 'The warehouse request of the type inbound " +
          "delivery or outbound delivery order serves in EWM as the basis for performing putaway or stock removal " +
          "activities' ו-'EWM also posts goods movements for goods receipt or goods issue based on the warehouse " +
          "request'; EWM מקבל מסירות נכנסות והזמנות מסירה יוצאות ממערכות אחרות, ואפשר גם ליצור אותן ידנית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/4cc8cb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 4cc8cb53ad377114e10000000a174cb4): התהליך מתחיל בהודעת משלוח מוקדמת, S/4HANA יוצר ממנה " +
          "מסירה נכנסת ומפיץ אותה ל-EWM, ו-EWM יוצר בקשת מחסן שהיא 'the starting point for the putaway process'; " +
          "בדחיית המסירה EWM מאפס את הכמות המתוכננת ומודיע ל-S/4HANA; תהליכי אחסון מורכבים אפשריים רק עם Handling " +
          "Units; דרישות מוקדמות ב-Customizing: סוגי אחסון, אזורים, תאים, Activity Areas, עמדות עבודה, דלתות ואזורי " +
          "Staging.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creation of Warehouse Tasks for Putaway | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/ffc7cb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio ffc7cb53ad377114e10000000a174cb4): EWM יוצר משימות אחסון אוטומטית בפעולת PPF או ידנית " +
          "(Create Warehouse Tasks - Inbound Delivery), קובע תא יעד באסטרטגיות אחסון ובקרת אחסון ישירה או משולבת, " +
          "ומקבץ משימות להזמנות מחסן לפי ה-Customizing; הסטטוס Putaway Planning עובר ל-Completed או ל-Partially " +
          "Completed לפי הכמות שכוסתה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Issue | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/c4c8cb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio c4c8cb53ad377114e10000000a174cb4): EWM יוצר בקשת מחסן מסוג הזמנת מסירה יוצאת כנקודת " +
          "הפתיחה לניפוק; 'EWM does not carry out an independent availability check'; משימות ליקוט נוצרות כברירת " +
          "מחדל בשחרור גל, בפעולת PPF או ידנית, ומקובצות להזמנות מחסן; האישור רושם הפרשים בין הכמות הנדרשת לכמות " +
          "שלוקטה; אחרי אריזה והעמסה רושמים ניפוק, ו-EWM מקטין את מלאי תא המקור. דרישות מוקדמות: Stock Removal " +
          "Strategy ו-Stock Removal Control Indicator.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Warehouse Order | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/65cccb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 65cccb53ad377114e10000000a174cb4) מגדיר הזמנת מחסן כ'executable work package that a " +
          "warehouse employee should perform at a specific time', המורכבת ממשימות מחסן או מפריטי ספירת מלאי; היקפה " +
          "וסוגה נקבעים בכללי יצירת הזמנות מחסן ב-Customizing.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Outbound Processing | Extended Warehouse Management Integration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/4361b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 4361b6531de6b64ce10000000a174cb4): ניהול ההזמנות ב-S/4HANA יוצר הזמנות לקוח, עיבוד " +
          "היציאה יוצר מסירות יוצאות לפי שורות התזמון המאושרות, החיוב מבוסס על המסירות, ו-'EWM uses the outbound " +
          "deliveries to perform logistical processes in the warehouse'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extended Warehouse Management Integration | Extended Warehouse Management Integration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/9060b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 9060b6531de6b64ce10000000a174cb4): לפני שימוש ב-EWM Integration יש להפעיל את Business " +
          "Function‏ 'LE, Extended Warehouse Management Integration (LOG_LE_INTEGRATION)' ולתחזק Customizing של " +
          "Logistics Execution; התכונות כוללות Extended Inbound Delivery Processing, ‏Goods Issue Process, " +
          "‏Transfer and Inventory Management ו-Integration in Production Planning and Control.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Advanced Production Integration | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/1b7fec53d3eb5514e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 1b7fec53d3eb5514e10000000a441470): בשחרור הפקודה וב-Material Staging נוצרת ב-EWM בקשת " +
          "חומר לייצור (PMR); מתכננים משימות Staging ל-PSA, רושמים צריכה (ניפוק שמעדכן את ה-PMR ואת הפקודה), קולטים " +
          "תוצרת לאחסון, וה-PMR נסגר אוטומטית עם סגירת הפקודה; התהליך חל על הזמנות ייצור ועל הזמנות תהליך, וגם על " +
          "EWM מבוזר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Outbound Delivery Process | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/3b57d55ea66e41998106fd99face9a66.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 3b57d55ea66e41998106fd99face9a66): באספקה לייצור מבוססת מסירה, אזור ה-Staging נקבע " +
          "מה-PSA ונראה ב-/SCWM/PRDO; דרישה מוקדמת: PSA עם תאים משויכים; לניפוק אוטומטי יש לרשום את סוג המסמך " +
          "ולתזמן את הדוח Post Goods Movement for Production Supply Area (transaction /SCWM/DLV_GIPSA); התהליך: " +
          "הזמנת מסירה יוצאת, משימת מחסן, אישור ורישום ניפוק.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Communication of Goods Movements from Inventory Management to EWM | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/8a532e4e6aaf4f4b97fd2f014f9837e0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_FM_14,
        claim: "הסניפט לגרסת On-Premise 2025 FPS01 קובע: 'You can also post and cancel goods movements using the " +
          "following Inventory Management BAPIs: BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_CANCEL'. (אומת ברשומת " +
          "fm:BAPI_GOODSMVT_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "External Procurement with Purchase Order | Extended Warehouse Management Integration",
        url: "https://help.sap.com/docs/SAP_ERP/d3a123be3f924c7f897930e5d9bdeed5/ada2cf5d5fd64a0ba24f86e54b5e76fb.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (Extended Warehouse Management Integration, 6.0 EHP8 Latest, versionId 6.18.latest, " +
          "loio ada2cf5d5fd64a0ba24f86e54b5e76fb) נוקבת בקוד /SCWM/PRDI בסניפט: 'In the EWM system, you check the " +
          "transmitted ERP delivery document using transaction /SCWM/PRDI. ... In the EWM system, you create the " +
          "warehouse task for the inbound delivery using transaction ...'. (אומת ברשומת tx:/SCWM/PRDI)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitor Methods | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/4b2f87853cc94cb9e10000000a42189b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (Extended Warehouse Management (EWM), 2025 FPS01 (Feb 2026), versionId 2025.001, " +
          "loio 4b2f87853cc94cb9e10000000a42189b) נוקבת בקוד /SCWM/TO_CONF בסניפט: '... in Foreground Confirm in " +
          "the foreground one or more selected warehouse tasks (transaction /SCWM/TO_CONF). ...'. (אומת ברשומת " +
          "tx:/SCWM/TO_CONF)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Warehouse Product Migration | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/d158a5ef3b6a427eab5e7cc9bad16b96.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_TB_01,
        claim: "תיעוד EWM לגרסת 2025 FPS01 קובע: 'The data sources in SAP S/4HANA are the following tables: MLGN - " +
          "Material Data for Each Warehouse Number', וממפה שדות LE-WM אל שדות ה-Warehouse Product‏: MLGN-MATNR‏, " +
          "MLGN-LGNUM‏, MLGN-LGBKZ. (אומת ברשומת table:MLGN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Using Expected Goods Receipts | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/c9e9a85296007b6ae10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE_TX_02,
        claim: "תיעוד EWM לגרסת 2025 FPS01 נוקב בשם התיאורי הרשמי של ה-BAdI, הכולל את תחזוקת המפעל (PM), ובתחולתו על שתי " +
          "המערכות: 'If you use SAP ERP or SAP S/4HANA as your enterprise management system and want to use the " +
          "automated process, implement the Business Add-In PM/PP/PS/PI Orders Operation: UPDATE " +
          "(WORKORDER_UPDATE'. (אומת ברשומת enh:badi:WORKORDER_UPDATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 15.5.2 " +
          "S4TWL - Warehouse Management (WM)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE,
        claim: "הפריט (Application Component LE-WM, Note 2270211) קובע: 'The Warehouse Management (LE-WM) is not the " +
          "target architecture anymore within SAP S/4HANA', והחלופה היא 'Extended Warehouse Management (SAP EWM) " +
          "and since S/4HANA 1909 Stock Room Management'; 'Stock Room Management reuses major parts of LE-WM and " +
          "can be used beyond 2025'; WM-TRM, ‏WM-LSR, ‏WM-VAS, ‏WM-YM, ‏WM-CD, ‏WM-TFM-CP ו-WM-DWM אינם חלק מ-Stock " +
          "Room Management והם ב-compatibility scope, 'which comes with limited usage rights' (SAP note 2269324); " +
          "'There is no technical migration needed to go from LE-WM to Stockroom Management'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 15.5.5 " +
          "S4TWL - Wave Management",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE,
        claim: "הפריט (LE-WM-TFM-CP, Note 2889652) קובע ש-Wave Management / Collective Processing של LE-WM אינו " +
          "ארכיטקטורת היעד, זמין ב-compatibility packages 'for a limited period of time', והחלופה היא 'Wave " +
          "Management in Extended Warehouse Management (SAP EWM)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1706 'Change Inbound Delivery' (SAP Fiori (SAPUI5)), release S32OP",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1706')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית היישומים (S32OP) רושמת את F1706 'Change Inbound Delivery' בתפקיד SAP_BR_WAREHOUSE_CLERK_EWM, " +
          "בקטלוג SAP_SCM_BC_EWM_INB_BSC, עם OData‏ /SCWM/SIMPLE_INB_DLV_SRV, טרנזקציה מובילה /SCWM/PRDI ויורש " +
          "F7922 'Manage Inbound Deliveries - Warehouse'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1704 'Run Outbound Process - Deliveries' (SAP Fiori (SAPUI5)), release S32OP",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1704')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית היישומים (S32OP) רושמת את F1704 'Run Outbound Process - Deliveries' בתפקיד " +
          "SAP_BR_WAREHOUSE_CLERK_EWM, בקטלוג SAP_SCM_BC_EWM_OUTB_BSC, עם OData‏ /SCWM/SIMPLE_OUTB_DLV_SRV, " +
          "טרנזקציה מובילה /SCWM/PRDO ויורש F6498 'Manage Outbound Delivery Orders'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F3880 'Process Warehouse Tasks - Picking' (SAP Fiori elements), release S32OP",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3880')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית היישומים (S32OP) רושמת את F3880 'Process Warehouse Tasks - Picking' בתפקידים " +
          "SAP_BR_WAREHOUSE_CLERK_EWM ו-SAP_BR_WAREHOUSE_OPERATIVE_EWM, עם טרנזקציה מובילה /SCWM/MON.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F4150 'Process Warehouse Tasks - Putaway' (SAP Fiori elements), release S32OP",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4150')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית היישומים (S32OP) רושמת את F4150 'Process Warehouse Tasks - Putaway' בתפקידים " +
          "SAP_BR_WAREHOUSE_CLERK_EWM ו-SAP_BR_WAREHOUSE_OPERATIVE_EWM, בקטלוגים SAP_SCM_BC_EWM_EXEC_F_BSC " +
          "ו-SAP_SCM_BC_EWM_INB_BSC, עם טרנזקציה מובילה /SCWM/MON.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Attachment Service for EWM Objects | What's New in SAP S/4HANA 2020",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/fe544c6966c2487285de23d8c9b50505.html?locale=en-US&state=PRODUCTION&version=2020.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        accessedAt: DATE,
        claim: "גוף העמוד (loio fe544c6966c2487285de23d8c9b50505) נוקב בפריטי ההיקף 'Scope Item 1FS (Basic Warehouse " +
          "Inbound Processing from Supplier), 1G2 (Basic Warehouse Outbound Processing to Customer)', לצד 1V5, " +
          "‏1V7, ‏1V9, ‏1VD, ‏4RO_DE ו-4RP_DE, ברכיב SCM-EWM-DLP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Staging Table Migration Approach for EWM in SAP S/4HANA | What's New in SAP S/4HANA 2023 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/865fb91de2c745a19a13a9a775146be8.html?locale=en-US&state=PRODUCTION&version=2023.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.001",
        accessedAt: DATE,
        claim: "הסניפט (loio 865fb91de2c745a19a13a9a775146be8): 'With this feature, you can migrate warehouse data to " +
          "Extended Warehouse Management (EWM) in SAP S/4HANA using the staging table approach'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Direct Transfer Migration Approach for EWM in SAP S/4HANA | What's New in SAP S/4HANA 2022",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/c6ee329bf90545f6ae838b0100f2bbf2.html?locale=en-US&state=PRODUCTION&version=2022.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        accessedAt: DATE,
        claim: "גוף העמוד (loio c6ee329bf90545f6ae838b0100f2bbf2, נקרא דרך scripts/sap-help-body.mjs): 'With this " +
          "feature, you can migrate data from an SAP EWM system to Extended Warehouse Management (EWM) in SAP " +
          "S/4HANA using the direct transfer approach'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App /SCWM/PRDI 'Maintain Inbound Deliveries' (SAP GUI), release S32OP (S/4HANA 2025 " +
          "FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('/SCWM/PRDI')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את /SCWM/PRDI כאפליקציה 'Maintain Inbound Deliveries' מסוג SAP " +
          "GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת tx:/SCWM/PRDI)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App /SCWM/PRDO 'Outbound Delivery Orders' (SAP GUI), release S32OP (S/4HANA 2025 " +
          "FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('/SCWM/PRDO')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את /SCWM/PRDO כאפליקציה 'Outbound Delivery Orders' מסוג SAP GUI " +
          "(SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת tx:/SCWM/PRDO)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App /SCWM/MON 'Warehouse Monitor' (SAP GUI), release S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('/SCWM/MON')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את /SCWM/MON כאפליקציה 'Warehouse Monitor' מסוג SAP GUI (SAP " +
          "GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת tx:/SCWM/MON)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App /SCWM/TO_CONF 'Confirm Warehouse Tasks - Advanced' (SAP GUI), release S32OP " +
          "(S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('/SCWM/TO_CONF')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את /SCWM/TO_CONF כאפליקציה 'Confirm Warehouse Tasks - Advanced' " +
          "מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת " +
          "tx:/SCWM/TO_CONF)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Entry of Quantity Differences During Putaway | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/2a67bd2b40934c899a6b4cd63852a6a0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (Extended Warehouse Management (EWM), 2025 FPS01 (Feb 2026), versionId 2025.001, " +
          "loio 2a67bd2b40934c899a6b4cd63852a6a0) נוקבת בקוד /SCWM/PACK בסניפט: '... haven't been finally put away, " +
          "you can use the Pack Handling Units - Advanced app (transaction /SCWM/PACK ...'. (אומת ברשומת " +
          "tx:/SCWM/PACK)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App /SCWM/ADGI 'Post Goods Issue - Unplanned' (SAP GUI), release S32OP (S/4HANA " +
          "2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('/SCWM/ADGI')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את /SCWM/ADGI כאפליקציה 'Post Goods Issue - Unplanned' מסוג SAP " +
          "GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת tx:/SCWM/ADGI)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App /SCWM/ADPROD 'Create Warehouse Tasks - Product' (SAP GUI), release S32OP " +
          "(S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('/SCWM/ADPROD')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את /SCWM/ADPROD כאפליקציה 'Create Warehouse Tasks - Product' " +
          "מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת " +
          "tx:/SCWM/ADPROD)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Processing of Waves | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/10c9cb53ad377114e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (Extended Warehouse Management (EWM), 2025 FPS01 (Feb 2026), versionId 2025.001, " +
          "loio 10c9cb53ad377114e10000000a174cb4) נוקבת בקוד /SCWM/WAVE בסניפט: '... warehouse management monitor " +
          "(transaction /SCWM/MON) or the Process Waves app (transaction /SCWM/WAVE). ... The simulation can be " +
          "triggered in the warehouse management monitor using the methods ...'. (אומת ברשומת tx:/SCWM/WAVE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Skip Pick-HU Screen During RF Picking for Replenishment | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/fd9c74cf038f4f9c87fccbeec1a9422c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (Extended Warehouse Management (EWM), 2025 FPS01 (Feb 2026), versionId 2025.001, " +
          "loio fd9c74cf038f4f9c87fccbeec1a9422c) נוקבת בקוד /SCWM/RFUI בסניפט: '... creating pick-handling units " +
          "(pick-HUs) in the radio frequency (RF) environment (transaction /SCWM/RFUI) or in voice-based ... " +
          "picking (transaction /SCWM/RFUI_PBV). ...'. (אומת ברשומת tx:/SCWM/RFUI)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Staging (with EWM) | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/8800b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_07,
        claim: "תיעוד S/4HANA On-Premise 2025 FPS01 מונה את COR2 כטרנזקציה פעילה להזמנות תהליך: 'Staging of Pick Parts " +
          "Directly in the Production or Process Order (Transactions CO02 and COR2)' וכן 'For process orders, you " +
          "can use transaction COR2 or COHVPI to trigger material staging' (כלשון הסניפט). CO02 מיועדת להזמנת ייצור " +
          "ו-COR2 להזמנת תהליך. (אומת ברשומת tx:COR2)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Warehouse Product Migration | Extended Warehouse Management (EWM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/d158a5ef3b6a427eab5e7cc9bad16b96.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_01,
        claim: "'MLGT - Material Data for Each Storage Type' נמנית בין טבלאות המקור ב-SAP S/4HANA להעברת Warehouse " +
          "Product ל-EWM, לצד MLGN‏, MARA ו-MARC. (אומת ברשומת table:MLGT)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Flow for Pick Parts Using Inventory-Managed (MM-IM) Storage Location (P3) | Extended Warehouse " +
          "Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/9a862211cdd44d6ea5beedecbaee7204.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 9a862211cdd44d6ea5beedecbaee7204, נקרא דרך scripts/sap-help-body.mjs) קובע: 'Create a " +
          "manufacturing order in the SAP S/4HANA system (transaction CO01 or COR1), and save it', 'Release the " +
          "manufacturing order' ו-'Activate staging for the products by calling transaction CO02 or COR2. You use " +
          "the manufacturing order number to find and check the outbound delivery'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Integration of Production Supply (PP) | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/252245dc92d247eeb7054b9bd58fc026.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש (loio 252245dc92d247eeb7054b9bd58fc026) מונה בסניפט את רכיבי האספקה לייצור ב-EWM: " +
          "'Production Orders (PP-SFC) Process Order (PP-PI_POR) Repetitive Manufacturing (PP-REM) Kanban " +
          "(PP-KAB)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Integration of Extended Warehouse Management in PP | Extended Warehouse Management Integration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/3cf58757f91b478aa5e408eba5b3a2ec.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש (loio 3cf58757f91b478aa5e408eba5b3a2ec) מונה שתי אפשרויות אינטגרציה: 'Extended Warehouse " +
          "Management (EWM) that is not embedded in S/4HANA', עם הפניה ל-'Integration of Extended Warehouse " +
          "Management into PP Without Synchronous Goods Movements', ו-'Extended Warehouse Management (EWM) that is " +
          "embedded in S/4HANA'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של המאגר: /SCWM/PRDI, /SCWM/PRDO, /SCWM/MON, /SCWM/TO_CONF, /SCWM/TODLV_TO, /SCWM/WAVE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הקטלוג מתאר את /SCWM/PRDI כתחזוקת מסירה נכנסת, /SCWM/PRDO כתחזוקת הזמנת מסירה יוצאת, /SCWM/MON כמוניטור " +
          "ניהול המחסן, /SCWM/TO_CONF כאישור משימת מחסן, /SCWM/TODLV_TO כיצירת משימת מחסן למסירה ו-/SCWM/WAVE " +
          "כתחזוקת גלים (מודול WM). /SCWM/ADGI מתואר שם כ'Adjust Goods Issue', בעוד ספריית ה-Fiori קוראת לו 'Post " +
          "Goods Issue - Unplanned'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#/SCWM/PRDI",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של המאגר: LT01, LT03, LT04, LT12, MF60",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "LT01 יוצר פקודת העברה ומעדכן LTAK/LTAP; LT03 יוצר פקודת העברה מתוך מסירה (LIKP/LIPS) לליקוט; LT04 מתוך " +
          "דרישת העברה; LT12 מאשר פקודה שלמה ומעדכן LQUA; הערת S/4HANA של LT01 ו-LT12: WM קלאסי ב-compatibility " +
          "scope ו-EWM הפתרון האסטרטגי. MF60: בסביבות EWM ה-Staging מנוהל ב-EWM.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#LT01",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'Warehouse Management → EWM' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ECC: WM קלאסי (LE-WM) משולב. S/4HANA: WM קלאסי במצב Compatibility ו-Embedded EWM הוא הכיוון; השפעה: " +
          "ארגונים עם WM צריכים תכנית מעבר ל-EWM, ואספקת חלפים ממחסן (PM-MM) מושפעת.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#ewm",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: wm-ewm-stock-mismatch",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "אי-התאמת מלאי WM/EWM מול IM: סיבות, תנועה שלא הועברה, Queue תקוע ב-EWM או סנכרון שנכשל; ניתוח ב-LX02, " +
          "‏LS24 ו-/SCWM/MON (LX02 מול MMBE); טבלאות LQUA ו-MARD; תיקון: השלמת תנועת WM, פינוי תור EWM, סנכרון " +
          "מלאי.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#wm-ewm-stock-mismatch",
      },
      {
        sourceType: "repository",
        sourceTitle: "שיטת העבודה 'רכיבים לפקודה: רזרבציה, אספקה לקו וניפוק' של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רכיבי פקודה נשמרים כרזרבציה ב-RESB, והאספקה לקו ב-CO27 או ב-MF60; לפי הרשומה, בסביבות EWM ה-Staging " +
          "מנוהל ב-EWM.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/cross-processes-2.ts#material-staging-and-reservation",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של סוג ההודעה MATMAS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הרשומה קובעת ש-MATMAS (סוג בסיסי MATMAS05) מתועד בפרק APIs for Product Master ונקוב בתרחישי EWM מבוזר " +
          "(Supply Assignment).",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/idocs.ts#idoc:msg:MATMAS",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת מחזור החיים של הפרויקט: LT03 ו-MIGO",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "LT03: סטטוס Deprecated, קיימת ב-ECC וב-S/4HANA, חלופה EWM (embedded), 'LE-WM not strategic; EWM target', " +
          "הגירה: WM קלאסי ב-Compatibility והכיוון Embedded EWM. MIGO: פעילה ב-S/4HANA, Fiori‏ Post Goods Movement " +
          "(F0843), תנועות נרשמות ל-MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#LT03",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של המאגר: VL01N, VL02N, LX03",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "VL01N יוצר אספקה יוצאת (LIKP/LIPS) מהזמנת מכירה; VL02N מזין כמויות ליקוט ומבצע PGI; לפי פריט הפישוט " +
          "'S4TWL - SD Simplified Data Models' שדות הסטטוס של LIKP/LIPS עברו מ-VBUK/VBUP. LX03 (LE-WM) משלב את LAGP " +
          "(תאים) עם LQUA (Quants).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#VL01N",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 6 בספריית הפרויקט (SAP PRESS, Integrating Warehouse Management in SAP S/4HANA), פרק 1, סעיף 1.2.2 " +
          "'Embedded EWM and Decentralized EWM'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף עוסק בשתי תצורות ה-EWM ב-S/4HANA (מוטמע ומבוזר), והפרק כולל גם העברות נתונים בין ERP ל-EWM (1.4) " +
          "ואינטגרציה עם מודולים אחרים (1.5); הספר משמש כאן להפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book6.json#1.2.2",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 6 בספריית הפרויקט, פרק 2 'Production Planning', סעיף 2.3 'Advanced Production Integration'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף מכסה Staging, צריכה וקבלה מייצור ל-Manufacturing Orders (2.3.1 עד 2.3.3, כלשון כותרות הסעיפים) " +
          "ופינוי תא PSA (2.3.4), לצד אינטגרציה מבוססת מסירה (2.2); הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book6.json#2.3",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 6 בספריית הפרויקט, פרק 9 'Plant Maintenance', סעיף 9.2 'Using Plant Maintenance Orders'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף מתעד תהליך יציאה (9.2.1) ותהליך כניסה (9.2.2) של EWM עם פקודות תחזוקה; הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book6.json#9.2",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "רשומת תהליך: נבנתה מעמודי תיעוד EWM ו-EWM Integration לגרסת 2025 FPS01 שגופם נקרא (Warehouse Request, " +
      "Goods Receipt, Creation of Warehouse Tasks for Putaway, Goods Issue, Warehouse Order, Outbound " +
      "Processing, EWM Integration, Advanced Production Integration, Outbound Delivery Process), מפריטי רשימת " +
      "הפישוט 2025 FPS01, מספריית יישומי Fiori (S32OP) ומרשומות המאגר. יישומי ה-Fiori של EWM (F1706, F1704, " +
      "F3880, F4150, F7922, F6498) אינם בקטלוג ה-Fiori של הפרויקט ולכן נקובים בטקסט בלבד. טבלאות EWM (/SCWM/*) " +
      "ותצוגות CDS של EWM אינן במילון הפרויקט ואינן נקובות. /SCWM/TODLV_TO נשען על רשומת המאגר בלבד (אין רשומה " +
      "רשמית הנוקבת בו). /SCWM/DLV_GIPSA נקוב בתיעוד הרשמי ואינו במילון הפרויקט. פריטי ההיקף 1FS ו-1G2 נקובים " +
      "ברשומות What's New ולא נבדק דף ה-Best Practices שלהם. מדדי KPI לא תועדו במקורות ולכן הושמטו. הדרישה " +
      "ל-LOG_LE_INTEGRATION מובאת כלשון עמוד EWM Integration, והתחולה שלה על EWM מוטמע דורשת אימות במערכת. בשלב " +
      "הכתיבה (2026-09-24) נקראו גם גופי העמודים P3 ו-'Direct Transfer Migration Approach for EWM in SAP " +
      "S/4HANA', ו-F4150 נקרא בספריית ה-Fiori (S32OP). לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ====================================================== embedded analytics */
  {
    slug: "embedded-analytics-process",
    he: "אנליטיקה מובנית: מ-CDS לאפליקציות אנליטיות",
    en: "Embedded analytics: from CDS views to analytical apps",
    module: "Cross",
    summary: "ב-S/4HANA הדיווח התפעולי נבנה על תצוגות CDS של ה-VDM: תצוגות Basic מעל הטבלאות, תצוגות Composite (בהן " +
      "קוביות אנליטיות) ותצוגות Consumption מסוג analytical query. מעליהן יושבים Query Browser, דוחות " +
      "רב-ממדיים, KPI של Smart Business ויישומי Fiori אנליטיים, על נתונים עדכניים וללא שכפול ל-BW. הרשומה מתארת " +
      "איך בונים, צורכים ומאמתים מספר מול התצוגה שלו.",
    context: "לפי עמוד התיעוד 'S/4HANA Embedded Analytics' (2025 FPS01), כל כלי האנליטיקה צורכים תצוגות CDS של ה-VDM, " +
      "ושאילתות מסוג analytical query דורשות את ה-Analytic Engine. לפי עמוד 'VDM Layers and View Types', תצוגות " +
      "Basic ניגשות ישירות לטבלאות, תצוגות Composite בנויות עליהן ויכולות לשמש קוביות, ותצוגות Consumption הן " +
      "סוג ה-VDM שיכול לשמש analytical query. בצד ה-ECC, לפי רשומת המאגר data/ecc-s4.ts, הדיווח נעשה ב-SAP " +
      "GUI/ALV, ב-SQVI ולעיתים ב-BW נפרד, ומערכות המידע PMIS ו-shop floor information system נשענות על מבני LIS " +
      "צבורים (פריטי הפישוט 'S4TWL - LIS in EAM' ו-'S4TWL - Logistic Information System in PP'). הרשומה חוצת " +
      "מודולים: דוגמאות התחזוקה נלקחות מ-PM ודוגמאות הייצור מ-PP ו-PP-PI.",
    steps: [
      {
        he: "להגדיר את השאלה העסקית ואת המדד (למשל MTBF/MTTR ועלות תחזוקה ב-PM, תפוקה ופסולת בייצור לפי רשומות " +
          "התחומים), ולחפש קודם תוכן קיים: Query Browser (F1068) מציג את השאילתות האנליטיות שלמשתמש יש גישה אליהן, " +
          "ו-View Browser מציג את כל תצוגות ה-CDS עם סוג התצוגה, ממדים ומדדים וסטטוס השחרור.",
      },
      {
        he: "לזהות את שכבת ה-VDM הנכונה: תצוגת Basic ‏(I_, ‏@VDM.viewType: #BASIC) יושבת על הטבלאות, למשל " +
          "I_ProductionOrder מעל AUFK ו-AFKO המסומנת 'Analytical Data Category Dimension'; תצוגת Composite משמשת " +
          "קובייה; תצוגת Consumption (C_, סיומת Query/Qry/Q) היא ה-analytical query שהיישום צורך.",
        xrefs: [
          "cds:I_ProductionOrder", "table:AUFK", "table:AFKO", "cds:I_MaintenanceOrder",
          "cds:I_MaintenanceNotification", "table:QMEL",
        ],
      },
      {
        he: "להעדיף שאילתה אנליטית משוחררת של SAP, כמו C_WorkCenterProdCostQuery ‏(Released) בייצור, שנותנת עלויות " +
          "בפועל ומתוכננות ברמת מרכז עבודה ופעולה להזמנות ייצור (10) ולהזמנות תהליך (40), מעל " +
          "I_WorkCenterProdCostCube. בתחזוקה, C_MaintOrdActualCostDataQ מתועדת כתצוגת Analytical Data Category " +
          "Query שמיועדת בעיקר לשמש מקור נתונים משויך בתצוגה Maintenance Order Actual Cost Data, וניגשים אליה דרך " +
          "תצוגת CDS אחרת (privileged mode); סטטוס שחרור לא מודפס בעמוד. שתי השאילתות אינן במילון הפרויקט.",
      },
      {
        he: "כשאין שאילתה מתאימה, מומחה האנליטיקה (SAP_BR_ANALYTICS_SPECIALIST) בונה שאילתה ב-Custom Analytical " +
          "Queries ‏(F1572; הספרייה מציגה יורש F1572A 'Custom Analytical Queries and Services') מעל תצוגות " +
          "משוחררות, ולפי הצורך תצוגה מותאמת ב-Custom CDS Views ‏(F1866A לפי ספר 7); תצוגות מותאמות מתחילות ב-YY1 " +
          "לפי View Browser.",
      },
      {
        he: "להגדיר KPI ב-Manage KPIs and Reports ‏(F2814): KPI של Smart Business נשען על שירות OData אנליטי שחושף " +
          "תצוגת CDS מצרפת (measures מסומנים באנוטציית צבירה, ושאר השדות dimensions), עם הערכה (evaluation), יעדים, " +
          "ספים ומגמה, אריח ב-Launchpad ויישום drill-down גנרי או מבוסס APF.",
      },
      {
        he: "לצרוך את התוכן: יישומי Fiori אנליטיים כמו Maintenance Planning Overview ‏(F2828, ‏Overview Page למתכנן, " +
          "IW29 מובילה ו-IW38 קשורה לפי הספרייה) ו-Manage Work Center Capacity ‏(F3289, 'Transactional, Analytical' " +
          "לפי הספרייה), וכן multidimensional data grid apps ‏(Web Dynpro, מזהי W) לניתוח slice-and-dice לקריאה " +
          "בלבד.",
        xrefs: ["fiori:F2828", "tx:IW29", "tx:IW38", "fiori:F3289", "tx:CM01"],
      },
      {
        he: "להקצות תפקידים וקטלוגים ב-PFCG (תקרית fiori-tile-blank) ולהפעיל שירותים: SAP_BR_EMPLOYEE לקטלוג " +
          "SAP_CA_BC_VDM של Query Browser, SAP_BR_ANALYTICS_SPECIALIST לקטלוגי Query Design ו-KPI Design; ל-Query " +
          "Browser להפעיל ב-SICF את שירותי ה-ICF (בהם /sap/bw/ina/GetResponse), את OData‏ RSAO_ODATA_SRV ואת תבנית " +
          "0ANALYSIS. שאילתת CDS אנליטית מוגנת ב-DCL0 וההרשאה ניתנת ברמת היישום.",
        xrefs: ["tx:SICF", "tx:PFCG"],
      },
      {
        he: "לאמת מספר מול התצוגה שלו: לפתוח את השאילתה ב-Query Browser ב-Open for Analysis; ב-View Browser לבדוק " +
          "ב-Cross Reference את התצוגות והטבלאות שהתצוגה משתמשת בהן, וב-Show Content להריץ תצוגה מקדימה עם אותם " +
          "פרמטרים (תקופה, P_CurrencyRole); לרדת לתצוגת ה-Basic ולטבלה (למשל I_ProductionOrder מול AUFK/AFKO), " +
          "ולהשוות לרשימת ה-GUI לאותה בחירה (COOIS להזמנות ייצור, IW38/IW39 להזמנות תחזוקה). לפי הערת היועץ במאגר, " +
          "RSRT משמשת לבדיקת query על CDS (אינה במילון הפרויקט).",
        xrefs: ["cds:I_ProductionOrder", "table:AUFK", "table:AFKO", "tx:COOIS", "tx:IW38", "tx:IW39"],
      },
      {
        he: "לפרש פערים לפני שמכריזים על טעות: לפי עמוד Analytics, האנליטיקה המוטמעת פועלת על נתונים עדכניים ואינה " +
          "קוראת נתונים ב-data aging או בארכיון; דוח PMIS‏ (MCI7/MCI8) קורא מבני LIS צבורים שתלויים בעדכון, ודוח CO " +
          "ישן עלול שלא להתאים ל-Universal Journal, למשל כשהוא קורא COEP או כשה-Ledger או המטבע שונים (תקרית " +
          "acdoca-coep-mismatch).",
        xrefs: ["tx:MCI7", "tx:MCI8"],
      },
      {
        he: "בהמרה: להריץ את LIS (למשל PMIS ב-MCI7) ואת האנליטיקה מבוססת ה-CDS במקביל עד שהאחרונה מכסה את הדרישות, " +
          "ורק אז לכבות את עדכון טבלאות ה-LIS; דוחות Z שקוראים S061 עד S065, S070 או S114 עד S116 (PM, לפי 'S4TWL - " +
          "LIS in EAM') או S021 עד S026, S028, S225 ו-S227 (PP, לפי 'S4TWL - Logistic Information System in PP') " +
          "צריכים מעבר לתצוגות CDS; לפי פריט ה-PP, מומלץ להשתמש ב-Manage Production Orders ‏(F2336) במקום COOIS.",
        xrefs: ["tx:MCI7", "tx:COOIS", "fiori:F2336"],
      },
    ],
    antiPatterns: [
      "בניית שאילתה מותאמת או KPI על תצוגה בסטטוס Not Released או Deprecated: לפי View Browser תצוגות כאלה " +
        "עלולות להשתנות או להימחק.",
      "ניסיון לקרוא תצוגת analytical query ישירות ב-SQL או בקוד Z: התצוגה מוגנת ב-DCL0 מפני גישה ישירה, וההרשאה " +
        "ניתנת ברמת היישום (עמוד C_WorkCenterProdCostQuery).",
      "המשך פיתוח דוחות Z על מבני LIS‏ (S061, S070, S022) אחרי ההמרה: לפי פריטי הפישוט הם יפסיקו לעבוד כשעדכון " +
        "ה-LIS יכובה.",
      "השוואת מספר לדוח ישן בלי ליישר תקופה, מטבע (P_CurrencyRole) והיקף נתונים: האנליטיקה אינה קוראת נתוני " +
        "data aging או ארכיון.",
      "בניית אותו דוח גם ב-BW וגם כ-CDS query בלי החלטה: לקח הפרויקט הוא להחליט מוקדם בין BW/4HANA, ‏Datasphere " +
        "ו-Embedded.",
      "הגדרת KPI על תצוגה שאין בה measures מצרפים: Smart Business נשען על שירות OData אנליטי מעל תצוגה מצרפת.",
    ],
    checks: [
      "חיובי: שאילתה משוחררת מופיעה ב-Query Browser למשתמש עם SAP_BR_EMPLOYEE ונפתחת ב-Open for Analysis.",
      "עקיבות: לשונית Cross Reference ב-View Browser מציגה עבור I_ProductionOrder את הטבלאות שמתחתיה, והסכום " +
        "בשאילתה תואם לרשימת COOIS לאותה בחירה.",
      "שלילי: משתמש ללא התפקיד או הקטלוג אינו רואה את השאילתה, וקריאה ישירה לתצוגת ה-query נחסמת (DCL0).",
      "אינטגרציה: אריח KPI מנווט ליישום ה-drill-down ומשם ליישום פעולה באותו הקשר ב-Launchpad.",
      "רגרסיה אחרי המרה: מדדי MTTR/MTBF והעלויות לפי אובייקט טכני תואמים בין PMIS (כל עוד ה-LIS מתעדכן) " +
        "לאנליטיקת ה-CDS לפני כיבוי עדכון ה-LIS.",
    ],
    status: {
      status: "s4_native",
      he: "אנליטיקה מוטמעת על תצוגות CDS של ה-VDM מתועדת כיכולת של SAP S/4HANA (2025 FPS01). לפי data/ecc-s4.ts, " +
        "ב-ECC הדיווח נעשה ב-SAP GUI/ALV, ב-SQVI או ב-BW נפרד, ולפי פריטי הפישוט PMIS ו-shop floor information " +
        "system נשענים שם על LIS.",
      edition: "on-premise",
      release: "2025.001",
      source: EA_STATUS_SOURCE,
      recommendedAction: "בהמרת CBC: למפות כל דוח PMIS, ‏COOIS או Z-report לשאילתה אנליטית משוחררת או ליישום Fiori אנליטי, להגדיר " +
        "את ה-Analytic Engine, התפקידים והשירותים, ולכבות את עדכון ה-LIS רק אחרי השוואת מספרים מתועדת.",
    },
    process: {
      purpose: "להפוך נתונים טרנזקציוניים של S/4HANA לתובנה עדכנית בלי שכפול נתונים: תצוגות CDS של ה-VDM מעל הטבלאות, " +
        "שאילתות אנליטיות, KPI ויישומי Fiori אנליטיים באותו Launchpad שבו מבצעים את הפעולה, ולאפשר ליועץ לאמת כל " +
        "מספר מול התצוגה והטבלאות שמתחתיה.",
      trigger: [
        {
          he: "שאלה עסקית או מדד תפעולי שדורש דיווח עדכני: MTBF, MTTR ועלות בתחזוקה; Yield, ‏Scrap %, ‏Lead Time ו-OEE " +
            "בייצור (רשומות התחומים pm-analytics ו-pppi-production-analytics).",
        },
        {
          he: "המרה ל-S/4HANA: פריטי הפישוט 'S4TWL - LIS in EAM' ו-'S4TWL - Logistic Information System in PP' מכוונים " +
            "את הדיווח מ-LIS לאנליטיקה מבוססת CDS.",
          xrefs: ["tx:MCI7", "tx:COOIS"],
        },
        {
          he: "דוח רשימה ב-GUI שעובר ל-Fiori: לפי data/transactions.ts, ב-IH08 וב-COOIS דוחות הרשימה מוחלפים ב-Fiori " +
            "וב-Embedded Analytics.",
          xrefs: ["tx:IH08", "tx:COOIS"],
        },
      ],
      preconditions: [
        {
          he: "Analytic Engine מוגדר: נדרש לשימוש בתצוגות CDS מסוג analytical query (עמוד S/4HANA Embedded Analytics).",
        },
        {
          he: "לתצוגה מקדימה של דוחות רב-ממדיים ב-Query Browser (לפי עמוד Query Browser): שירותי ICF מופעלים ב-SICF, " +
            "שירות OData‏ RSAO_ODATA_SRV פעיל, תבנית 0ANALYSIS פעילה (בדיקה בטבלה RSAOOBJ) ואובייקט ההרשאה S_RS_ZEN " +
            "משויך. הדרישה הכללית של Query Browser לפי אותו עמוד היא התפקיד SAP_BR_EMPLOYEE.",
          xrefs: ["tx:SICF"],
        },
        {
          he: "התצוגות הנדרשות קיימות בגרסה ובסטטוס Released; לשימוש חוזר של לקוחות משוחררות תצוגות העומדות בחוזה " +
            "היציבות C1.",
        },
        {
          he: "מסד HANA: הספרייה מסמנת את F2828 כ-'HANA DB exclusive'.",
          xrefs: ["fiori:F2828"],
        },
        {
          he: "תפקידים וקטלוגים משויכים (ראו תפקידים); בלעדיהם האריח ריק או מחזיר שגיאת OData.",
          xrefs: ["tx:PFCG"],
        },
      ],
      masterData: [
        {
          he: "הזמנה כממד: I_ProductionOrder מסומנת 'Analytical Data Category Dimension' וקוראת את כותרת הזמנת הייצור " +
            "מ-AUFK ו-AFKO.",
          xrefs: ["cds:I_ProductionOrder", "table:AUFK", "table:AFKO"],
        },
        {
          he: "אובייקטים טכניים ומרכזי עבודה לפי מפת ה-CDS: I_Equipment (EQUI, EQKT), ‏I_FunctionalLocation (IFLOT, " +
            "ILOA), ‏I_WorkCenter ו-I_WorkCenterCapacity.",
          xrefs: [
            "cds:I_Equipment", "cds:I_FunctionalLocation", "cds:I_WorkCenter", "cds:I_WorkCenterCapacity",
            "table:EQUI", "table:IFLOT",
          ],
        },
        {
          he: "חומר לפי מפת ה-CDS: I_Product (MARA) ו-I_ProductPlant (MARC).",
          xrefs: ["cds:I_Product", "cds:I_ProductPlant", "table:MARA", "table:MARC"],
        },
      ],
      roles: [
        {
          he: "עובד (SAP_BR_EMPLOYEE): Query Browser ‏(F1068), קטלוג SAP_CA_BC_VDM 'Analytics - Query Browser', לפי " +
            "ספריית ה-Fiori ועמוד התיעוד.",
        },
        {
          he: "מומחה אנליטיקה (SAP_BR_ANALYTICS_SPECIALIST): Custom Analytical Queries ‏(F1572), ‏Manage KPIs and " +
            "Reports ‏(F2814) ו-APF Configuration Modeler.",
        },
        {
          he: "מתכנן תחזוקה (SAP_BR_MAINTENANCE_PLANNER): Maintenance Planning Overview ‏(F2828).",
          xrefs: ["fiori:F2828"],
        },
        {
          he: "מתכנן ייצור (SAP_BR_PRODN_PLNR): Manage Work Center Capacity ‏(F3289), לפי רשומת המאגר.",
          xrefs: ["fiori:F3289"],
        },
      ],
      transactions: [
        { he: "איתור תוכן: Query Browser ‏(F1068, ללא טרנזקציית GUI מובילה לפי הספרייה) ו-View Browser." },
        {
          he: "בניית תוכן: Custom Analytical Queries ‏(F1572, יורש F1572A), ‏Custom CDS Views ‏(F1866A לפי ספר 7), " +
            "‏Manage KPIs and Reports ‏(F2814).",
        },
        {
          he: "צריכה: Maintenance Planning Overview ‏(F2828; IW29 מובילה, IW38 קשורה), ‏Manage Work Center Capacity " +
            "‏(F3289; CM01 מובילה), ‏Manage Production Orders ‏(F2336) כתחליף קדימה ל-COOIS.",
          xrefs: ["fiori:F2828", "tx:IW29", "tx:IW38", "fiori:F3289", "tx:CM01", "fiori:F2336"],
        },
        {
          he: "ECC והמסלול הקלאסי: PMIS ‏(MCI7, MCI8), רשימות IW38/IW39 ו-IW28/IW29, ‏COOIS ו-COHV.",
          xrefs: ["tx:MCI7", "tx:MCI8", "tx:IW39", "tx:IW28", "tx:COOIS", "tx:COHV"],
        },
        {
          he: "תפעול ואימות: SICF להפעלת שירותי ICF, ‏PFCG לתפקידים (תקרית fiori-tile-blank), ‏RSRT לבדיקת query על CDS " +
            "לפי הערת היועץ (אינה במילון הפרויקט).",
          xrefs: ["tx:SICF", "tx:PFCG"],
        },
      ],
      tables: [
        {
          he: "טבלאות המקור מתחת לתצוגות: AUFK ו-AFKO (הזמנות), QMEL (הודעות), AFRU (אישורים), לפי רשומות התחומים.",
          xrefs: ["table:AUFK", "table:AFKO", "table:QMEL", "table:AFRU"],
        },
        {
          he: "תצוגות Basic במילון הפרויקט: I_ProductionOrder, ‏I_MaintenanceOrder, ‏I_MaintenanceNotification, " +
            "‏I_ProductionOrderConfirmation.",
          xrefs: [
            "cds:I_ProductionOrder", "cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification",
            "cds:I_ProductionOrderConfirmation",
          ],
        },
        {
          he: "שאילתות וקוביות לדוגמה (אינן במילון הפרויקט): C_WorkCenterProdCostQuery מעל I_WorkCenterProdCostCube; " +
            "‏C_MaintOrdActualCostDataQ; ובפריט 'S4TWL - LIS in EAM' גם I_LocationAnalysisCube " +
            "ו-I_MaintOrderTechObjCube.",
        },
        {
          he: "מבני LIS קלאסיים (אינם במילון הפרויקט): S061 עד S065 ו-S070 ב-PMIS; S021 עד S026, S028, S225 ו-S227 " +
            "ב-shop floor information system.",
        },
        {
          he: "תצוגה שהוצאה משימוש: I_MaintenancePlan סומנה deprecated ב-2021 והיורשת היא I_MaintenancePlanBasic " +
            "(What's New 2021 FPS01).",
          xrefs: ["cds:I_MaintenancePlan"],
        },
      ],
      integrationPoints: [
        {
          he: "Fiori Launchpad: מעבר בין יישום אנליטי ליישום טרנזקציוני ללא שכפול נתונים; הערכת KPI מקושרת ליישום " +
            "drill-down וליישומי פעולה באותו הקשר.",
        },
        {
          he: "SAP Analytics Cloud ו-Analysis for Office: לפי data/s4-transformation.ts ו-data/bw-module.ts, תצוגות CDS " +
            "נצרכות ב-SAC; לפי ספר 7, Manage KPIs and Reports משולב ב-SAC.",
        },
        {
          he: "חילוץ ל-BW: What's New 1809 FPS01 'CDS Views for BW Extraction' משחרר תצוגות לחילוץ (למשל " +
            "I_MEASUREMENTDOCUMENTDATA); לפי data/s4-transformation.ts גם ODP/CDS extraction ו-SAP Datasphere.",
        },
        {
          he: "PM: לפי 'S4TWL - LIS in EAM', חלופות ל-PMIS הן Maintenance Order Costs, ‏Analytical List Page for " +
            "Technical Object Breakdown Analysis ו-Technical Object Damages.",
        },
      ],
      interfaces: [
        {
          he: "שירותי OData של יישומי האנליטיקה לפי ספריית ה-Fiori: VDM_CDSVIEW_BROWSER ‏(F1068), ‏ANA_QUERY_DESIGNER " +
            "‏(F1572), ‏/SSB/SMART_BUSINESS_DESIGNTIME_SRV ‏(F2814), ‏EAM_ORDER_MONITOR ‏(F2828); אלה שירותי יישום " +
            "ולא APIs לשילוב.",
          xrefs: ["fiori:F2828"],
        },
        {
          he: "ל-Query Browser: OData‏ RSAO_ODATA_SRV ושירותי InA ב-ICF (/sap/bw/ina/GetResponse, " +
            "‏/sap/es/ina/GetServerInfo).",
        },
        { he: "KPI של Smart Business נשען על שירות OData אנליטי מעל תצוגת CDS מצרפת." },
        {
          he: "קריאה תוכניתית של מסמכי המקור לפי רשומות התחומים: BAPI_ALM_ORDER_GET_DETAIL, ‏BAPI_ALM_NOTIF_GET_DETAIL, " +
            "‏BAPI_PROCORD_GET_LIST; קריאת מסמכים ולא אנליטיקה.",
          xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_NOTIF_GET_DETAIL", "fm:BAPI_PROCORD_GET_LIST"],
        },
      ],
      outputs: [
        { he: "שאילתות אנליטיות (C_ עם סיומת Query) ותצוגות מותאמות (YY1) שפורסמו לקטלוג." },
        { he: "אריחי KPI עם הערכה, יעד, ספים ומגמה, ויישומי drill-down." },
        {
          he: "דוחות רב-ממדיים וכרטיסי Overview Page ‏(F2828).",
          xrefs: ["fiori:F2828"],
        },
        {
          he: "לא נמצא ברשומות שנקראו מסמך לוגיסטי או חשבונאי שהתהליך יוצר; יישומי ה-grid מציגים נתונים 'in read-only " +
            "mode' (עמוד Multidimensional Data Grid Apps).",
        },
      ],
      exceptions: [
        {
          he: "אריח ריק או שגיאת OData ‏403/500: שירות לא רשום, קטלוג או תפקיד חסר, או הרשאת CDS‏ (DCL) (תקרית " +
            "fiori-tile-blank).",
          xrefs: ["tx:PFCG"],
        },
        { he: "תצוגת query נחסמת בגישה ישירה: DCL0; ההרשאה ניתנת ברמת היישום." },
        {
          he: "תצוגה מקדימה של דוח רב-ממדי ב-Query Browser עלולה להיכשל: שירותי ICF לא הופעלו או 0ANALYSIS אינה פעילה.",
          xrefs: ["tx:SICF"],
        },
        {
          he: "מדדי זמינות ריקים או שגויים: Malfunction Start/End וסימון Breakdown חסרים (תקרית downtime-not-recorded).",
          xrefs: ["tx:MCI7", "table:QMEL"],
        },
        {
          he: "PMIS ריק: מבני המידע (LIS) לא עודכנו לתקופה (רשומת התחום pm-analytics).",
          xrefs: ["tx:MCI8"],
        },
        {
          he: "פער מול דוח ישן: נתוני data aging וארכיון אינם נקראים, או שדוח CO ישן אינו תואם ל-Universal Journal, " +
            "למשל כשהוא קורא COEP או כשה-Ledger או המטבע שונים (תקרית acdoca-coep-mismatch).",
        },
        { he: "תצוגה לא קיימת בגרסה או בשם אחר: לאמת release ושם (data/kind-intel.ts)." },
      ],
      controls: [
        { he: "שימוש בתצוגות Released בלבד לבנייה ולשימוש חוזר, לפי ההמלצה ב-View Browser." },
        {
          he: "בדיקת תאריך deprecation והיורש ב-View Browser לפני בנייה; דוגמה: I_MaintenancePlan ויורשתה " +
            "I_MaintenancePlanBasic.",
          xrefs: ["cds:I_MaintenancePlan"],
        },
        {
          he: "הרשאה ברמת היישום ו-DCL לתצוגות; תפקידי SAP_BR_EMPLOYEE ו-SAP_BR_ANALYTICS_SPECIALIST לפי תפקיד המשתמש.",
        },
        { he: "תיעוד הפרמטרים של כל שאילתה (תקופה, P_CurrencyRole) לצד המספר שמדווח." },
        {
          he: "החלטה מתועדת בין BW/4HANA, ‏Datasphere ו-Embedded לכל דוח (לקח הפרויקט ב-data/s4-transformation.ts).",
        },
      ],
      kpis: [
        {
          he: "תחזוקה: MTBF, ‏MTTR ועלות, לפי רשומת התחום pm-analytics.",
          xrefs: ["table:QMEL", "table:AUFK"],
        },
        {
          he: "ייצור: Yield, ‏Scrap %, ‏Lead Time ו-OEE, לפי רשומת התחום pppi-production-analytics.",
          xrefs: ["table:AFRU"],
        },
      ],
      eccToS4: [
        {
          he: "ECC: דיווח ב-SAP GUI/ALV, ב-SQVI ולעיתים ב-BW נפרד; PMIS‏ (MCI*) על מבני LIS צבורים (data/ecc-s4.ts, " +
            "data/domains.ts).",
          xrefs: ["tx:MCI7", "tx:MCI8"],
        },
        {
          he: "S/4HANA: Embedded Analytics על שאילתות CDS, ‏KPI ו-Overview Pages ב-Fiori, על נתונים עדכניים וללא שכפול.",
        },
        {
          he: "PM, 'S4TWL - LIS in EAM': PMIS הוא חלק מ-LIS; אנליטיקת התחזוקה העתידית מבוססת CDS; אפשר להפעיל במקביל עד " +
            "כיבוי עדכון ה-LIS, והמלצת הפריט: 'Invest reasonably in the LIS'.",
        },
        {
          he: "PP, 'S4TWL - Logistic Information System in PP': ה-shop floor information system ב-compatibility scope " +
            "(ID 452); ‏COOIS אינה ב-compatibility scope וקוראת מטבלאות ההזמנה, אך SAP אינה מתכננת להשקיע בה ומפנה " +
            "ל-F2336 ול-F2335.",
          xrefs: ["tx:COOIS", "fiori:F2336"],
        },
        {
          he: "ממשק: מאז 2020 יישומי Web Dynpro הם ברירת המחדל לדוחות רב-ממדיים, יישומי Design Studio אינם זמינים עוד, " +
            "וב-2023 FPS01 שונה השם ל-multidimensional data grid apps.",
        },
      ],
      migration: [
        {
          he: "להפעיל LIS ואנליטיקת CDS במקביל, להשוות מספרים, ורק אז לכבות את עדכון ה-LIS; דוחות מותאמים שקוראים S061, " +
            "S062, S063, S064, S065, S070, S114, S115 או S116 לא יעבדו אחרי הכיבוי ('S4TWL - LIS in EAM').",
          xrefs: ["tx:MCI7"],
        },
        {
          he: "PP: זכויות השימוש ב-shop floor information system כפופות ל-compatibility scope; הפריט מפנה ל-SAP Note " +
            "2269324.",
          xrefs: ["tx:COOIS"],
        },
        {
          he: "QA לפי רשומות המאגר: השוואת רשימה מול Fiori (IH08, COOIS) ובדיקת זמני השבתה ו-MTTR/MTBF אחרי ההמרה " +
            "(pm-breakdown).",
          xrefs: ["tx:IH08", "tx:COOIS"],
        },
      ],
      reference: {
        title: "S/4HANA Embedded Analytics | Analytics (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/c53deb5765c7be12e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התיעוד של תהליך האנליטיקה המוטמעת (loio c53deb5765c7be12e10000000a4450e5, versionId 2025.001), גופו " +
          "נקרא 2026-09-24. פריט SAP Best Practices (Scope Item) לתהליך לא הודפס באף רשומה שנקראה ולכן אינו נרשם.",
      },
    },
    xrefs: [
      "cds:I_ProductionOrder", "cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification",
      "cds:I_ProductionOrderConfirmation", "cds:I_Equipment", "cds:I_WorkCenterCapacity", "cds:I_MaintenancePlan",
      "table:AUFK", "table:AFKO", "table:QMEL", "table:AFRU", "fiori:F2828", "fiori:F3289", "fiori:F2336", "tx:COOIS",
      "tx:IW38", "tx:IW39", "tx:IW29", "tx:MCI7", "tx:MCI8", "tx:IH08", "tx:SICF", "tx:PFCG",
      "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_PROCORD_GET_LIST", "bp:maintenance-notification-process",
      "bp:production-order-process",
    ],
    evidence: [
      EA_STATUS_SOURCE,
      {
        sourceType: "sap_help",
        sourceTitle: "Analytics | Analytics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/dd28bf545e91ee05e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio dd28bf545e91ee05e10000000a4450e5): אחת הדרכים ליישם embedded analytics היא דוחות " +
          "רב-ממדיים; לסקירת כל הדוחות 'you can use the Query Browser or the View Browser'; 'Embedded analytics " +
          "operates on current data. Data in the historical area, that is, data aging or archived data is not " +
          "retrieved.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "VDM Layers and View Types | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/0a875bc7a005465aad92c08becc11776.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 0a875bc7a005465aad92c08becc11776): תצוגות Basic interface יושבות ישירות על טבלאות מסד " +
          "הנתונים (@VDM.viewType: #BASIC); תצוגות Composite בנויות על תצוגות Basic ו-'can be used, for example, as " +
          "analytical cube views' (@VDM.viewType: #COMPOSITE); שתיהן יכולות לשאת @Analytics.dataCategory; תצוגות " +
          "Consumption הן השכבה העליונה ו-'Consumption views are the only VDM view type that can function as an " +
          "analytical query' (@VDM.viewType: #CONSUMPTION); לשימוש חוזר של לקוחות משוחררות תצוגות Basic/Composite " +
          "ו-Consumption מסוג analytical query העומדות בחוזה היציבות C1.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Naming Conventions in the Virtual Data Model | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/8a8cee943ef944fe8936f4cc60ba9bc1.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 8a8cee943ef944fe8936f4cc60ba9bc1): הקידומת I_ מסמנת תצוגת interface (Basic או " +
          "Composite), ‏C_ תצוגת Consumption, ‏R_ תצוגת restricted reuse ו-A_ תצוגת Remote API; הסיומות Query, ‏Qry " +
          "או Q מסמנות analytical query view, והסיומות Cube או C מסמנות analytical cube view.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Query Browser | Analytics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/3a24b854ee8f8d21e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 3a24b854ee8f8d21e10000000a44176d): Query Browser הוא יישום SAP Fiori לחיפוש, עיון ותיוג " +
          "של analytical queries, המציג את השאילתות המורשות ושאילתות הלקוח שלמשתמש יש גישה אליהן. דרישות מוקדמות: " +
          "תפקיד SAP_BR_EMPLOYEE; להצגת דוחות רב-ממדיים: הפעלת שירותי ICF ב-SICF (בהם /sap/es/ina/GetServerInfo, " +
          "/sap/bw/ina/GetServerInfo ו-/sap/bw/ina/GetResponse), הפעלת OData‏ RSAO_ODATA_SRV, תבנית 0ANALYSIS פעילה " +
          "(בדיקה בטבלה RSAOOBJ, הפעלה ב-rstco_admin) ואובייקט ההרשאה S_RS_ZEN. ‏Open for Analysis פותחת את השאילתה " +
          "בכלי Web Dynpro Grid, ומתוצאות החיפוש ניתן להציג את ההגדרה או התוכן של כל תצוגה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "View Browser | Analytics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/0bde695751505c08e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 0bde695751505c08e10000000a441470): View Browser מציג את כל תצוגות ה-CDS של SAP והמותאמות " +
          "עם Category, ‏View Types, ‏Dimensions and Measures, ‏Annotations וסטטוס שחרור; 'We recommend using CDS " +
          "views delivered by SAP with the status Released'; תצוגות מותאמות מתחילות ב-YY1; לתצוגות deprecated " +
          "מוצגים תאריך ההוצאה והיורשים; Cross Reference מציגה 'all the CDS views and tables used by the selected " +
          "view'; Alternative Search מאתר תצוגות לפי טבלאות, עמודות ו-annotations; Show Content מציג תצוגה מקדימה " +
          "של analytical queries משוחררות ושל לקוח; יצירת analytical query מהאפליקציה אפשרית מתצוגות Released " +
          "מקטגוריית Cube/Dimension.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "KPI Monitoring and Analysis | SAP Fiori Overview",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/4eb83a45673c4987b98756ba67286aad.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 4eb83a45673c4987b98756ba67286aad): ניטור KPI מסופק על ידי SAP Smart Business: כלי תכנון " +
          "להגדרת KPI, הערכות ויישומי drill-down, ואריחי KPI ב-SAP Fiori launchpad עם ערך, מגמה וסטייה מיעד; הגדרות " +
          "KPI מבוססות על שירותי OData אנליטיים החושפים תצוגות CDS עם יכולת צבירה, ותצוגה מצרפת מזוהה לפי רכיבים עם " +
          "אנוטציית צבירה שאינה NONE (measures), ושאר הרכיבים שאינם טקסט הם dimensions; ליישום ה-drill-down שתי " +
          "אפשרויות: היישום הגנרי של Smart Business או יישום מבוסס Analysis Path Framework.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Cost by Work Center (Non Event-Based) | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/1101e78f908746939bdce0e4023cd850.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 1101e78f908746939bdce0e4023cd850): 'Technical Name C_WorkCenterProdCostQuery', ‏'View " +
          "Type Query', ‏'Release Status Released'; עלויות ייצור בפועל ומתוכננות והפרשיהן ברמת מרכז עבודה ופעולה, " +
          "לקטגוריות הזמנה 10 (production order) ו-40 (process order); 'This CDS view is built on the " +
          "I_WorkCenterProdCostCube view'; פרמטרים P_FromFiscalYearPeriod, ‏P_ToFiscalYearPeriod, ‏P_Language, " +
          "‏P_CurrencyRole; 'Analytical query CDS views cannot be accessed directly, because DCL0 is used to " +
          "protect this CDS view against direct access', וההרשאה ניתנת ברמת היישום.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Actual Cost Data Query | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/379d1707675944c7b7ca1c016785fb9d.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 379d1707675944c7b7ca1c016785fb9d): 'CDS View Name C_MaintOrdActualCostDataQ', " +
          "‏'Analytical Data Category Query'; התצוגה מיועדת בעיקר לשמש מקור נתונים משויך בתצוגה Maintenance Order " +
          "Actual Cost Data, והגישה אליה נעשית דרך תצוגת CDS אחרת (privileged mode).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Multidimensional Data Grid Apps | Analytics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6b356c79dea443c4bbeeaf0865e04207/f7a8c8547996b109e10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio f7a8c8547996b109e10000000a423f68): יישומי multidimensional data grid מציגים דוחות " +
          "רב-ממדיים בטבלה דמוית pivot 'in read-only mode' עם slice-and-dice ו-drilldown; בספריית ה-Fiori הם מסוג " +
          "Web Dynpro ולרוב עם מזהה שמתחיל ב-W; ב-2023 FPS01 שונה המונח מ-analytical Web Dynpro apps; יישומי Design " +
          "Studio 'are no longer available', ומאז 2020 יישומי Web Dynpro הם ברירת המחדל.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "General Authorizations Required for SAP Fiori | SAP Fiori Overview",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/cd6e1b6b87dd423ca491f2cd38b7bf4f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "לפי תקציר רשומת החיפוש (loio cd6e1b6b87dd423ca491f2cd38b7bf4f): למידול KPI נדרשים יישומי ה-modeler של " +
          "SAP Smart Business, ו-'The business role SAP_BR_ANALYTICS_SPECIALIST contains the catalog and group " +
          "provided by SAP'; גם ל-APF Configuration Modeler נדרש התפקיד SAP_BR_ANALYTICS_SPECIALIST. גוף העמוד לא " +
          "נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1068 'Query Browser', release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1068')/S32OP",
        accessedAt: DATE,
        claim: "פלט scripts/fal-app.mjs F1068 @ S32OP (S/4HANA 2025 FPS01, Published): Transactional / SAP Fiori " +
          "(SAPUI5), רכיב CA-GTF-VDM-QB; תפקיד SAP_BR_EMPLOYEE (R0056); קטלוג עסקי SAP_CA_BC_VDM 'Analytics - Query " +
          "Browser'; intent AnalyticQuery-browse; OData‏ VDM_CDSVIEW_BROWSER 0001 (S4FND 109); ללא טרנזקציית GUI " +
          "מובילה או קשורה; גרסאות מ-S3OP=1511 עד S32OP=2025 FPS01, וגם S36=2602 ו-S37=2608; ללא predecessor או " +
          "successor; קישור התיעוד מפנה לנושא 3a24b854ee8f8d21e10000000a44176d.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F1572 'Custom Analytical Queries', release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1572')/S32OP",
        accessedAt: DATE,
        claim: "פלט scripts/fal-app.mjs F1572 @ S32OP (Published): Transactional / SAP Fiori (SAPUI5), רכיב " +
          "BC-SRV-APS-EXT-AQD (Fiori based Query Designer); תפקיד SAP_BR_ANALYTICS_SPECIALIST (R0185); קטלוגים " +
          "SAP_BW_BC_AQD ו-SAP_CA_BC_ANA_AQD 'Analytics - Query Design'; intent AnalyticQuery-manage; OData‏ " +
          "ANA_QUERY_DESIGNER 0001 ו-DATEFUNCTION 0001; successors: F1572A Custom Analytical Queries and Services.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F2814 'Manage KPIs and Reports', release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2814')/S32OP",
        accessedAt: DATE,
        claim: "פלט scripts/fal-app.mjs F2814 @ S32OP (Published): Transactional / SAP Fiori (SAPUI5), רכיב " +
          "CA-GTF-SB-S4H-DT (SAP Smart Business S4H - Design Time); תפקיד SAP_BR_ANALYTICS_SPECIALIST; קטלוג " +
          "SAP_CA_BC_SSB 'Analytics - KPI Design'; intent AnalyticObject-manage; OData‏ " +
          "/SSB/SMART_BUSINESS_DESIGNTIME_SRV 0001; גרסאות מ-S15OP=1909; predecessors בהם F0817 Create KPI, ‏F0818 " +
          "KPI Workspace, ‏F0820 Configure KPI Tiles ו-F2318 Create Report.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F2828 'Maintenance Planning Overview' (SAP Fiori elements: Overview Page), " +
          "release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2828')/S32OP",
        accessedAt: DATE,
        claim: "רשומת ה-OData הרשמית של ספריית ה-Fiori (scripts/fal-app.mjs, F2828 @ S32OP, S/4HANA 2025 FPS01, " +
          "isPublished='Published', ApplicationComponent PM-FIO): ApplicationType 'Analytical', UITechnology 'SAP " +
          "Fiori elements: Overview Page'. Business Role מוביל (isLeading='X') SAP_BR_MAINTENANCE_PLANNER (RoleID " +
          "R0088, 'Maintenance Planner'); Business Role נוסף SAP_BR_MAINT_TECH_OFFICER (RoleID R0308-146, " +
          "'Technical Officer - Armed Forces'). Business Catalogs: SAP_DFS_BC_MAINTENANCE ('MAINT - Defense " +
          "Maintenance') ו-SAP_EAM_BC_ORD ('EAM - Order'); Technical Catalog SAP_TC_EAM_COMMON. Semantic " +
          "Object/Action: MaintenanceOrder/monitor. OData Service נדרש: EAM_ORDER_MONITOR, Version 0001, Namespace " +
          "ODATA_EAM_ORD_MON, SoftwareComponentName S4CORE 109. GUI Transactions (fuzzy record): " +
          "LeadingTransactionCodes='IW29', TransactionCodes='IW38'. Backend RetrofittedSWCBackend 'S4CORE 109 - SP " +
          "0001' / ProductVersionOfficialNameBackend 'SAP S/4HANA 2025'; UI RetrofittedSWCUI 'UIS4H 109 - SP 0001'. " +
          "NumberofPredecessors=0, NumberofSuccessors=0 (Successors/PredecessorDetails ריקים). RIN Notes: 3493254 " +
          "(Front-End Server), 3671888 (Back-End Server). AppDocumentationLink: " +
          "https://help.sap.com/http.svc/outputlink?product=SAP_S4HANA_ON-PREMISE&version=2025.001&topic=17248e4667fb433a9c3f944000fada3f&state=PRODUCTION. " +
          "Database 'HANA DB exclusive'; ICFNodes: EAM_ORD_MONS1 (ראשי) וצמתים נוספים (isAdditional=1) כגון " +
          "EAM_PO_MONS1 ו-EAM_PROCMTS1; רשימת הגרסאות: S12OP=1809 עד S32OP=2025 FPS01 (On-Premise) ו-S32PCE " +
          "(Private Cloud), וכן S36=2602 ו-S37=2608 (SAP S/4HANA Public Cloud). (אומת ברשומת fiori:F2828)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "S4TWL - LIS in EAM (SAP S/4HANA 2025 FPS01 Simplification List, item 4.1.13)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "הפריט (רכיב PM-IS; הערה קשורה שהפריט מדפיס: 0002267463; עמ' 86 עד 88, נקרא בטקסט שחולץ מה-PDF הרשמי, " +
          "scratchpad/official/SIMPL_OP2025.pdf.txt) קובע: 'The plant maintenance information system is part of the " +
          "logistics information system LIS'; חסרונות ה-LIS הקלאסי: נתונים עודפים וצבורים מראש, ללא drill-down " +
          "למסמכים הבודדים, UI ישן; 'Future plant maintenance analytics will be based on HANA, CDS views " +
          "aggregating transactional data dynamically, and powerful analytical UIs for multi-dimensional " +
          "reporting'; LIS הקלאסי והאנליטיקה החדשה יכולים לפעול במקביל כל עוד עדכון טבלאות ה-LIS לא כובה; 'Invest " +
          "reasonably in the LIS'; דוחות מותאמים הקוראים בין היתר מ-S061, ‏S062, ‏S063, ‏S064, ‏S065, ‏S070, ‏S114, " +
          "‏S115 ו-S116 לא יעבדו אחרי הכיבוי. חלופות שהפריט מונה: Maintenance Order Costs, ‏Analytical List Page " +
          "for Technical Object Breakdown Analysis, ‏Technical Object Damages, ותצוגות כגון I_LocationAnalysisCube " +
          "ו-I_MaintOrderTechObjCube.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "S4TWL - Logistic Information System in PP (SAP S/4HANA 2025 FPS01 Simplification List, item 9.2.1)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "הפריט עוסק בכיבוי ה-Logistic Information System (LIS) הקלאסי, ומתייחס במפורש ל-COOIS בפסקת 'Exceptions': " +
          "'The production order information system (transaction COOIS) is not part of the SAP S/4HANA " +
          "compatibility scope. Unlike LIS, the production order information system is reading data from the " +
          "original production order tables. COOIS is not using redundant data and therefore avoids the " +
          "disadvantages of the LIS. However, SAP is not planning to invest into transaction COOIS. Forward " +
          "looking, Fiori apps \"Manage Production Orders\" (Fiori-ID F2336) and \"Manage Production Operations\" " +
          "(Fiori-ID F2335) should be used rather than transaction COOIS.' כלומר COOIS אינה חלק מה-compatibility " +
          "scope המוגבל (בניגוד ל-shop floor information system של LIS, S021-S028) וקוראת את הנתונים מטבלאות הזמנת " +
          "הייצור המקוריות. עם זאת SAP אינה מתכננת להשקיע בה, ומפנה קדימה ל-Fiori. (אומת ברשומת tx:COOIS)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "S4TWL - Logistic Information System in PP (SAP S/4HANA 2025 FPS01 Simplification List, item 9.2.1), pp. " +
          "602-603",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "לפי הטקסט שחולץ מה-PDF הרשמי (רכיב PP-IS, הערה קשורה 0002268063): 'The shop floor information system is " +
          "part of the SAP S/4HANA compatibility scope, which comes with limited usage rights', מופיע במטריצה של " +
          "SAP Note 2269324 תחת ID 452, וכולל את מבני המידע S021, S022, S023, S024, S025, S026, S028, S225 ו-S227; " +
          "'SAP S/4HANA production analytics is based on HANA, CDS views aggregating transactional data " +
          "dynamically, and powerful analytical UIs for multi-dimensional reporting', ואפשר להפעיל LIS ואנליטיקה " +
          "במקביל כל עוד יש זכויות שימוש ועדכון ה-LIS לא כובה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Header | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c6c3a06854a44d9383b32946f008b1b8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim: "עמוד ה-VDM הרשמי: 'CDS View Name I_ProductionOrder', 'Analytical Data Category Dimension', 'This view " +
          "represents the SAP object type ProductionOrder (BusinessObject)'. מטרת התצוגה כלשונה: 'This CDS view " +
          "retrieves production order header data (tables AUFK and AFKO)', והיא משיבה על 'Which production orders " +
          "exist?'. הסניפט מונה בין השדות החשובים ProductionOrder‏, ProductionOrderType ו-CreationDate, וקובע " +
          "'Deltas are determined automatically by change data capture'. (אומת ברשומת cds:I_ProductionOrder)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Maintenance Management | What's New in SAP S/4HANA 2021 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6ffb8fb9aee1469b9d4c506e1790da34.html?locale=en-US&state=PRODUCTION&version=2021.001",
        accessedAt: DATE_TX_02,
        claim: "רשומת שירות החיפוש של SAP Help (loio 6ffb8fb9aee1469b9d4c506e1790da34, versionId 2021.001) מציגה את אותו " +
          "פריט: 'The following CDS views have been deprecated as of SAP S/4HANA 2021', I_MaintenancePlan מנויה בין " +
          "שלוש התצוגות, 'These CDS views are no longer available by default and will be deleted as of SAP S/4HANA " +
          "2023 release', וטבלת היורשים 'Deprecated CDS View / Successor CDS View: I_MaintenancePlan / " +
          "I_MaintenancePlanBasic'. סוג הפריט ברשומה: CDS View Changed, מודול PM, פריטי היקף BH1, BH2, BJ2. (אומת " +
          "ברשומת cds:I_MaintenancePlan)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for BW Extraction | What's New in SAP S/4HANA 1809 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1809.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/1664545363ca4400ae16741ca529bf28.html?locale=en-US&state=PRODUCTION&version=1809.001",
        accessedAt: DATE_TX_02,
        claim: "לפי תקציר הנושא 'CDS Views for BW Extraction' ב-What's New in SAP S/4HANA 1809 FPS01: 'CDS (Core Data " +
          "Services) views have now been released for BW extraction' ובהן 'I_MEASUREMENTDOCUMENTDATA You can use " +
          "this CDS view to obtain information about the measurement document'. (אומת ברשומת " +
          "cds:I_MeasurementDocument)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא המעבר 'Embedded Analytics' של הפרויקט (ECC_S4_TOPICS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סטטוס Replaced. ECC: דיווח דרך SAP GUI/ALV, ‏SQVI ולעיתים BW נפרד. S/4HANA: Embedded Analytics על CDS " +
          "Analytical Queries, ‏KPIs ו-Overview Pages ב-Fiori בזמן אמת; Analytical CDS (C_*/Cube/Query) ו-Smart " +
          "Business KPIs; השפעה: דוחות ZSQVI/ABAP מסוימים מוחלפים ב-CDS Queries ופחות תלות ב-BW לדיווח תפעולי; " +
          "דוחות PM/PP זמינים כ-Query CDS.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#embedded-analytics",
      },
      {
        sourceType: "repository",
        sourceTitle: "מושג 'CDS View' של הפרויקט (CONCEPTS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מודל נתונים וירטואלי, שכבת הקריאה והאנליטיקה של S/4HANA: הגדרה ב-DDL, ‏push-down ל-HANA, ‏annotations " +
          "(UI/OData/Analytics), בסיס ל-Fiori ול-Embedded Analytics; ב-ECC כמעט לא קיים (Open SQL ותצוגות קלאסיות); " +
          "דוגמאות I_Product, ‏I_ProductionOrder, ‏I_Equipment.",
        verificationLevel: "repository_verified",
        repoRef: "data/concepts.ts#cds-view",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין סוג האובייקט 'CDS View' של הפרויקט (KIND_INTEL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מחזור חיים: הגדרה ב-DDL ‏(ADT), הפעלה, push-down ל-HANA, חשיפה כ-OData או Analytical Query. תקלות: View " +
          "לא קיים בגרסה (לאמת release ושם), ביצועים (annotations/associations), הרשאה (DCL, ‏Access Control), " +
          "מיפוי שגוי לטבלת ECC (לאמת את ה-association).",
        verificationLevel: "repository_verified",
        repoRef: "data/kind-intel.ts#cds",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת 'CDS Analytical View' במודול ה-BW של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CDS Analytical View (@Analytics.dataCategory: #CUBE) מספק דיווח חי על נתוני S/4 ללא חילוץ ל-BW ונצרך " +
          "ב-SAC וב-Fiori; קבוצת האובייקטים 'Embedded Analytics' במודול. זוהי רשומה מושגית של הפרויקט ולא טבלת DDIC " +
          "של SAP.",
        verificationLevel: "repository_verified",
        repoRef: "data/bw-module.ts#CDS_AnalyticalView",
      },
      {
        sourceType: "repository",
        sourceTitle: "הערת היועץ לרשומת 'CDS Analytical View' (CONSULTANT_NOTES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "טעויות: @Analytics.dataCategory שגוי מונע זיהוי כ-cube/dimension; חוסר aggregation על הבסיס פוגע " +
          "בביצועים. בדיקה: RSRT לבדיקת query על CDS, ‏ST05/SQL trace לביצועים. VDM: interface אל consumption " +
          "(@Analytics); צריכה ב-SAC, ב-Fiori אנליטי וב-AfO; DCL להרשאות.",
        verificationLevel: "repository_verified",
        repoRef: "data/consultant-notes.ts#CDS_AnalyticalView",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'PM Analytics & KPIs' של הפרויקט (DOMAINS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "PMIS ‏(MCI*) מבוסס מבני מידע S061 עד S070; רשימות IW38/IW39 (הזמנות) ו-IW28/IW29 (הודעות); ‏MCI3, ‏MCI8; " +
          "מדדי MTBF, ‏MTTR ועלות; טבלאות AUFK, ‏QMEL, ‏AFRU; ‏BAPI_ALM_ORDER_GET_DETAIL " +
          "ו-BAPI_ALM_NOTIF_GET_DETAIL; ב-S/4 אנליטיקה חיה דרך CDS ו-Fiori; תקלה: מדדים ריקים, לוודא עדכון מבני " +
          "מידע (LIS) ופרק זמן; קודי קטלוג לניתוח Pareto.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-analytics",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום 'Production Analytics' של הפרויקט (DOMAINS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "COOIS (מערכת מידע הזמנות), ‏COHV (עיבוד המוני), ‏MCP1, ‏MCPB, ‏COGI; טבלאות AFKO, ‏AFPO, ‏AFRU; " +
          "‏BAPI_PROCORD_GET_LIST; KPIs: Yield, ‏Scrap %, ‏Lead Time, ‏OEE; ב-S/4 אנליטיקה חיה דרך CDS ו-Fiori; " +
          "תקלה: פערי תפוקה, לבדוק אישורים (AFRU) ופסולת מדווחת מול תקן.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-production-analytics",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת הטבלאות הקלאסיות לתצוגות CDS של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "המיפוי האצור: I_ProductionOrder על AFKO/AUFK, ‏I_MaintenanceOrder על AUFK/AFKO, " +
          "‏I_MaintenanceNotification על QMEL, I_Equipment על EQUI/EQKT, ‏I_FunctionalLocation על IFLOT/ILOA, " +
          "‏I_WorkCenter ו-I_WorkCenterCapacity על נתוני מרכז העבודה והקיבולת, ‏I_Product על MARA, ‏I_ProductPlant " +
          "על MARC, ‏I_ProductionOrderConfirmation על AFRU. המיפוי מסומן בקובץ כ-hand-verified ואינו מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_ProductionOrder",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F2828",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "Maintenance Planning Overview, סוג Analytical: דשבורד Overview Page למתכנן התחזוקה עם כרטיסים המציגים " +
          "KPIs ונתונים בזמן אמת; OData‏ EAM_ORDER_MONITOR; ‏guiTx IW29, ‏IW38; תקלה נפוצה: קטלוגים לא הוקצו " +
          "לתפקיד, וכרטיסים ריקים כשאין נתוני תכנון.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2828",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F3289",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "Manage Work Center Capacity, תפקיד SAP_BR_PRODN_PLNR וקטלוג SAP_SCM_BC_CFS; guiTx CM01; לפי הערת הרשומה " +
          "הספרייה מדפיסה ApplicationType 'Transactional, Analytical', והרשומה שומרת Transactional כי לשדה ערך אחד.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F3289",
      },
      {
        sourceType: "repository",
        sourceTitle: "סוגי יישומי Fiori של הפרויקט (APP_TYPES)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סוג Analytical: תצוגת KPI ומגמות, Smart Business, ‏CDS analytical (cube/query) ו-Virtual Data Model, לצד " +
          "Transactional ו-Fact Sheet.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori.ts#APP_TYPES",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: fiori-tile-blank",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "אריח Fiori ריק או שגיאת OData (500/403/service not available); סיבות: שירות OData לא רשום, Business " +
          "Catalog או Role חסר, ‏CDS/Authorization (DCL), ‏Cache; ניתוח ב-/IWFND/MAINT_SERVICE, ‏/IWFND/ERROR_LOG " +
          "ו-PFCG.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#fiori-tile-blank",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: downtime-not-recorded",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מדדי זמינות שגויים כש-Malfunction Start/End או סימון Breakdown חסרים (ניתוח ב-IW29 וב-MCI7; טבלאות QMIH, " +
          "‏QMEL).",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#downtime-not-recorded",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: acdoca-coep-mismatch",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "דוח CO ישן לא תואם ל-Universal Journal; סיבות: דוח קורא COEP במקום ACDOCA, Ledger/Currency שונים, תזמון " +
          "רישום; תיקון: הסבת דוחות ל-ACDOCA/CDS.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#acdoca-coep-mismatch",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות הטרנזקציה MCI7 ו-MCI8 של הפרויקט (TX_INTEL)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MCI7 ו-MCI8 הם דוחות PMIS מבוססי LIS (S061, ‏S065, ‏S070 ועוד), סטטיסטיים ולא בזמן אמת ותלויים בעדכון " +
          "מבני המידע; תקלות: אין נתונים כשהמבנים לא עודכנו, אי-התאמה מול CO; הצלבה מול KOB1 ו-IW33; ב-S/4HANA " +
          "זמינים כ-Legacy והכיוון הוא Embedded Analytics, ‏CDS ו-Fiori. שדה s4Delta ברשומה מציין compatibility " +
          "scope, בעוד שפריט הפישוט 'S4TWL - LIS in EAM' שנקרא אינו משתמש במונח זה ל-PMIS.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MCI7",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות הטרנזקציה COOIS ו-IH08 של הפרויקט (TRANSACTIONS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "COOIS: ב-S/4HANA 'קיים', מוחלף ב-Fiori ו-Embedded Analytics (Manage Production Orders), ‏QA: השוואת " +
          "COOIS מול Fiori. ‏IH08: דוחות רשימה מוחלפים ב-Fiori list ו-Embedded Analytics, ‏QA: השוואת רשימה מול " +
          "Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/transactions.ts#COOIS",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז הטרנספורמציה של הפרויקט: אינטגרציה (INTEGRATION)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "אנליטיקה ודיווח: ECC: BW נפרד ו-Extractors; S/4: Embedded Analytics (CDS), ‏SAP Datasphere, ‏SAC, " +
          "‏ODP/CDS extraction (trust curated).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-transformation.ts#INTEGRATION",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז הטרנספורמציה של הפרויקט: לקחים (LESSONS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "לקח: דוחות BW מול Embedded Analytics: להחליט מוקדם בין BW/4HANA, Datasphere או Embedded ולהימנע מכפילות " +
          "(risk medium).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-transformation.ts#LESSONS",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום pm-breakdown (תחזוקת שבר) של הפרויקט (DOMAIN_DETAIL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "eccS4: מודל ההודעה והתקלה זהה; השינוי: מדדי אמינות ב-Embedded Analytics וב-Fiori KPI; הגירה: QA לזמני " +
          "השבתה ול-MTTR/MTBF לאחר ההמרה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-breakdown",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט (SAP PRESS, SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide), פרק 11 " +
          "'Cross-Functional Apps', יישום F1068 'Query Browser'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הערך בספר: שאילתות שנוצרו ב-Fiori על בסיס תצוגות CDS נמצאות, מוצגות ומתויגות ביישום; מוצגות רק שאילתות " +
          "שלמשתמש יש גישה אליהן, ומהרשימה ניתן לרדת לשאילתה עצמה או לסמן מועדף.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F1068",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט, פרק 11 'Cross-Functional Apps', יישום F1572 'Custom Analytical Queries'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הערך בספר: מומחי אנליטיקה מתכננים שאילתות על תצוגות CDS סטנדרטיות או מותאמות, יוצרים ומשנים שאילתות " +
          "והיררכיות, מדמים תוצאות ויכולים ליצור אריח Fiori מהשאילתה, ללא קוד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F1572",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט, פרק 11 'Cross-Functional Apps', יישום F1866A 'Custom CDS Views (Version 2)'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הערך בספר: בניית תצוגות CDS מותאמות, שנצרכות בשאילתות אנליטיות ב-Launchpad או דרך APIs בפלטפורמות " +
          "חיצוניות (SAP Datasphere, ‏SAP Analytics Cloud), עם שדות ממקורות מרובים, שדות חישוב ומסננים.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F1866A",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 7 בספריית הפרויקט, פרק 11 'Cross-Functional Apps', יישום F2814 'Manage KPIs and Reports'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הערך בספר: יצירת KPI ודוחות עליהם, הטמעה באריח Fiori ללא קוד ושילוב עם SAP Analytics Cloud; לשוניות " +
          "Groups, ‏KPIs, Reports ו-Stories.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book7.json#F2814",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, מדריך המשתמש העסקי ל-PM), פרק 8 'Plant Maintenance Controlling', סעיף " +
          "8.2.3 'Logistics Information System'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סעיף הספר על ה-LIS בכלי המידע של בקרת התחזוקה (לצד 8.2.1 SAP List Viewer, ‏8.2.2 QuickViewer ו-8.2.4 SAP " +
          "BW); משמש כאן להפניית קריאה בלבד ואינו מקור לטענה חדשה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#8.2.3",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "חיפושים רשמיים שרצו (scripts/sap-help-search.mjs, סקופ SAP_S4HANA_ON-PREMISE, 21 תוצאות כל אחד): " +
      "'Embedded Analytics', 'Virtual Data Model and CDS Views', 'Query Browser', 'analytical query CDS view', " +
      "'KPI Design app', 'Multidimensional Reports', 'VDM Layers and View Types', 'Custom Analytical Queries', " +
      "'Analytical Apps Maintenance Management', 'Production Cost by Work Center', 'Maintenance Order Query " +
      "analytical query CDS view'; גופי העמודים נקראו דרך scripts/sap-help-body.mjs; יישומים F1068, ‏F1572, " +
      "‏F2814 נקראו דרך scripts/fal-app.mjs ‏(S32OP). פערים: F1068, F1572, F1866A, F1572A ו-F2814 אינם במילון " +
      "הפרויקט ולכן אינם ב-xrefs; F1866A מתועד כאן מספר 7 בלבד ולא נבדק בספרייה; מזהה היישום של View Browser לא " +
      "נבדק; צעדי ההגדרה של ה-Analytic Engine לא נקראו; RSRT אינה במילון הפרויקט ומבוססת על הערת יועץ במאגר " +
      "בלבד; מבני LIS‏ (S061 וכו') ותצוגות C_WorkCenterProdCostQuery, ‏C_MaintOrdActualCostDataQ, " +
      "I_LocationAnalysisCube ו-I_MaintOrderTechObjCube אינם במילון הפרויקט ונשארים בטקסט. אי-התאמה במאגר: " +
      "data/tx-intel.ts#MCI7 מציין ש-PMIS/LIS הוא compatibility scope, בעוד ש-'S4TWL - LIS in EAM' אינו משתמש " +
      "במונח זה ל-PMIS (המונח מופיע בפריט ה-PP עבור shop floor information system); לא תוקן כאן. אין Scope Item " +
      "מודפס ברשומה שנקראה עבור תהליך האנליטיקה. KPI נרשמו רק מרשומות התחומים. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* =============================================== ibp and pp/ds integration */
  {
    slug: "ibp-ppds-integration-process",
    he: "אינטגרציה של תכנון: IBP ו-PP/DS מול S/4HANA",
    en: "Planning integration: IBP and PP/DS with S/4HANA",
    module: "PP",
    summary: "התהליך מחבר שלוש שכבות תכנון: SAP IBP (ענן) מפיק תוכנית ביקוש והיצע; התוצאות נכנסות ל-S/4HANA כדרישות " +
      "עצמאיות מתוכננות (PIR) או כ-target supply ו-flexible constraints ל-PP/DS המוטמע; MRP Live (MD01N) מתכנן " +
      "את החומרים הרגילים ומפנה חומרים עם Advanced Planning להיוריסטיקות PP/DS; PP/DS מתכנן ומתזמן מוצרים " +
      "קריטיים על משאבי צוואר בקבוק ומעביר הזמנות מתוכננות חזרה ל-S/4HANA, שם הן מומרות לפקודות ייצור ומבוצעות; " +
      "מצב הביצוע חוזר ל-PP/DS דרך CIF, ולפי תיעוד IBP התוכנית המפורטת מצטברת חזרה ל-IBP כ-confirmed supply.",
    context: "בצד ECC, לפי רשומת המעבר של המאגר (data/ecc-s4.ts#pp-ds), PP-DS היה רכיב נפרד ב-SCM/APO שחובר ל-ERP " +
      "ב-CIF; בצד S/4HANA עמוד ה-LO הרשמי (2025.001) קובע ש-PP/DS הוא חלק מ-SAP S/4HANA החל מ-OP 1709 כ-ePP/DS " +
      "עם מגבלות מסוימות, ועמוד 'Integrating PP/DS' מתאר CIF שמצביע על אותה מערכת ולקוח, בלי distribution " +
      "definition. עמוד 'PP/DS with SAP S/4HANA' מגדיר את חלוקת העבודה: S/4HANA מחזיק את נתוני האב, את הביצוע " +
      "ואת תכנון החומרים הלא קריטיים, ו-PP/DS מתכנן מוצרים קריטיים על בסיס production data structures. בצד " +
      "הביקוש, פריט הפישוט 'S4TWL - Sales and Operation Planning' קובע ש-SOP הוא פתרון גשר בתוך ה-compatibility " +
      "pack ו-'IBP is the successor solution'. בצד IBP (תיעוד SAP IBP 2608, ענן ציבורי) שני ערוצים מתועדים: " +
      "תוצאות תחזית כ-PIR דרך SAP Cloud Integration ותוסף האינטגרציה, ושילוב תכנון ייצור מבוסס key figures מול " +
      "PP/DS (target supply ב-S/4HANA 2022, flexible constraints ב-2023 ומעלה), כשהתיעוד ממליץ על שילוב מבוסס " +
      "הזמנות לצימוד הדוק יותר. התהליך נשען על bp:mrp-process לריצת ה-MRP, על bp:sales-demand-to-production " +
      "לצריכת התחזית מול ביקוש מכירות, ועל bp:plan-to-produce-discrete ו-bp:production-order-process לביצוע.",
    steps: [
      {
        he: "להכין נתוני אב ב-S/4HANA: לסמן Advanced Planning ו-Scope Limitation בלשונית Advanced Planning של אב " +
          "החומר (MM02 בממשק ה-GUI לפי tx-intel.ts#MM02; עמוד 'Working with MRP Live'), להגדיר גרסאות ייצור (C223, " +
          "MKAL) שמהן נוצרות production data structures ב-PP/DS, ולוודא שהקיבולות של מרכזי העבודה נוצרות כמשאבים " +
          "(עמוד 'PP/DS with SAP S/4HANA'). לפי עמוד ה-BAPI של PP/DS, BAPI_MATERIAL_SAVEDATA הורחב לשדות Scope " +
          "Limitation ו-Scope Profile.",
        xrefs: [
          "tx:MM02", "tx:C223", "table:MARC", "table:MKAL", "table:CRHD", "obj:work-center",
          "cds:I_ProductionVersion", "fm:BAPI_MATERIAL_SAVEDATA",
        ],
      },
      {
        he: "להקים את ה-CIF הפנימי: Model 000 ו-Version 000, הגדרות CIF עם system type SAP_APO ו-release 713, פרמטרי " +
          "משתמש CIF ורישום תור ה-CIF ב-SMQR, טווח מספרים ב-/SAPAPO/RRPCUST1, ו-CIF Post-Processing כאופן טיפול " +
          "בשגיאות (עמוד 'Integrating PP/DS'). לפי עמוד 'Integrating PP/DS' הגדרת ה-CIF יוצרת מודל אינטגרציה שמצביע " +
          "על אותה מערכת ולקוח; שמות הטרנזקציות CFM1 (יצירה) ו-CFM2 (הפעלה) מודפסים בעמוד aATP רשמי בהקשר העברת " +
          "תחליפי מוצר ל-DSC Edition, ועמוד PP/DS שנוקב בהן לא אותר (אינן במילון הפרויקט).",
        xrefs: ["tx:SMQR", "tx:SMQ1", "tx:SMQ2"],
      },
      {
        he: "להעביר את תוצאות הביקוש מ-IBP: ה-iFlow 'Integrate Key Figures from SAP IBP to Add-On as Planned " +
          "Independent Requirements' מעביר תוצאות תחזית כ-PIR ברמת location product או MRP area לתוסף האינטגרציה " +
          "ב-S/4HANA (What's New IBP 2605); בשילוב מבוסס key figures נשלח Forecast לפי CONSENSUSDEMANDQTY. ה-PIR " +
          "נשמרות ב-S/4HANA (MD61/MD62/MD63, PBIM/PBED לפי tx-intel.ts#MD61), ועמוד 'Forecast Consumption and " +
          "Requirements Strategies' ממליץ ליצור PIR ב-S/4HANA ולשלב אותן ב-PP/DS דרך CIF.",
        xrefs: ["tx:MD61", "tx:MD62", "tx:MD63", "bp:sales-demand-to-production"],
      },
      {
        he: "להעביר את תוכנית ההיצע מ-IBP ל-PP/DS (אופציונלי, לפי עמוד 'Production Planning Integration Based on Key " +
          "Figures'): target supply לפי key figure PRODUCTION ודרישות העברה/רכש לפי NETNEWREQORDER; ב-S/4HANA 2022 " +
          "נוצרות KF orders לפי NETNEWPLANNEDPRODREC, וב-2023 ומעלה ה-target supply והכמויות המינימליות/מקסימליות " +
          "מיוצגות כ-flexible constraints (עמוד 'Planning with Flexible Constraints', scopes LOCPRD ו-LOCPRDSOS).",
        xrefs: ["obj:planned-order"],
      },
      {
        he: "להריץ תכנון: MRP Live (MD01N, או תזמון דרך Schedule MRP Runs F1339) מחשב low-level code לכל החומרים, " +
          "מתכנן חומרי S/4HANA ומפנה חומרי Advanced Planning ל-Classic MRP או להיוריסטיקות PP/DS לפי ה-Scope " +
          "Limitation (עמוד 'Working with MRP Live'; פריט הפישוט 'S4TWL - MRP in HANA'). לפי עמוד IBP 'Production " +
          "Planning Integration Based on Key Figures', target supply בתוך אופק PP/DS מומר להזמנות מתוכננות בריצת " +
          "תכנון מתוזמנת בהיוריסטיקה SAP_PP_002, ועם flexible constraints בהיוריסטיקה SAP_PP_FLXC. עמוד 'PP/DS " +
          "Process' ממליץ לתכנן בריצת ה-MRP ללא התחשבות בקיבולת (SAP note 551124).",
        xrefs: ["tx:MD01N", "fiori:F1339", "obj:planned-order", "bp:mrp-process", "enh:technique:bte"],
      },
      {
        he: "לתזמן בפירוט את המוצרים הקריטיים: אופטימיזציה או היוריסטיקות תזמון בשלב נפרד של production planning run " +
          "(/SAPAPO/CDPSB0) לתכנון סופי מול זמינות משאבים, ותכנון אינטראקטיבי ב-Product View (/SAPAPO/RRP3), ב-DS " +
          "Planning Board (/SAPAPO/CDPS0) או ביישומי Fiori Production Scheduling Board (F2176) ו-Advanced " +
          "Scheduling Board (F5460). שמות ה-/SAPAPO/ לפי עמוד '3 PP/DS Restricted'; אינם במילון הפרויקט.",
        xrefs: ["fiori:F2176", "fiori:F5460", "table:CRHD", "table:KAKO"],
      },
      {
        he: "להעביר ולהמיר: לסמן conversion indicator ב-PP/DS לפני ההעברה, כך שההזמנה המתוכננת מומרת אוטומטית לפקודת " +
          "ייצור ב-S/4HANA ומספר ההזמנה של S/4HANA חוזר ל-PP/DS (עמודים 'Converting Orders' ו-'Transferring Orders " +
          "to the SAP S/4HANA'). המרה ב-S/4HANA (CO40, CO41 או מ-MD04) של הזמנה בלי conversion indicator דורסת את " +
          "התאריכים שתוכננו ב-PP/DS (עמוד 'PP/DS with SAP S/4HANA').",
        xrefs: ["tx:CO40", "tx:CO41", "tx:MD04", "obj:planned-order", "obj:production-order", "table:AFKO", "table:AFPO"],
      },
      {
        he: "לבצע ב-S/4HANA: שחרור, משיכת רכיבים, אישור, קבלת טובין והשלמה טכנית (CO02, CO11N, CO05N לפי " +
          "tx-intel.ts#CO40; Manage Production Orders F2336). לפי עמוד 'Production Process with SAP S/4HANA and " +
          "PP/DS' כל שינוי עובר online ל-PP/DS דרך CIF, והשלמה טכנית מוחקת את הפקודה ב-PP/DS.",
        xrefs: [
          "tx:CO02", "tx:CO11N", "tx:CO05N", "fiori:F2336", "obj:production-order", "bp:production-order-process",
          "bp:confirmation-process",
        ],
      },
      {
        he: "להחזיר את התוכנית ל-IBP: לפי עמוד 'Production Planning Integration Based on Key Figures', הזמנות " +
          "מתוכננות ופקודות ייצור מ-PP/DS מצטברות ל-IBP כ-confirmed supply ברמת תקופה, צריכת המשאבים מוחזרת ל-key " +
          "figure המתאים, ואופק ה-PP/DS מיוצג ב-IBP כ-freeze horizon שבו תוכנית ה-PP/DS קבועה.",
        xrefs: ["obj:production-order", "obj:planned-order"],
      },
      {
        he: "לנטר את הממשק: תורי qRFC של CIF ב-SMQ1/SMQ2 ורישום scheduler ב-SMQR (data/integration.ts#qrfc), יעד RFC " +
          "ב-SM59 (תקריות qrfc-smq1-outbound-blocked ו-smq1-outbound-stuck), ו-CIF Post-Processing למניעת חסימת " +
          "תורים (עמוד 'Integrating PP/DS'). מצב הביקוש וההיצע נבדק ב-MD04 וב-MRP Cockpit (F0247A, F0251).",
        xrefs: ["tx:SMQ1", "tx:SMQ2", "tx:SMQR", "tx:SM59", "tx:MD04", "fiori:F0247A", "fiori:F0251"],
      },
    ],
    antiPatterns: [
      "להמיר ב-S/4HANA (CO40/CO41) הזמנות מתוכננות של PP/DS שלא סומן להן conversion indicator: לפי עמוד 'PP/DS " +
        "with SAP S/4HANA' התאריכים שתוכננו ב-PP/DS נדרסים, ועמוד 'Converting Orders' ממליץ להפעיל המרה דרך " +
        "ה-indicator ב-PP/DS בלבד כדי לשמור אותם.",
      "להתחשב בזמינות הקיבולת כבר בריצת ה-MRP: עמוד 'PP/DS Process' ממליץ לתכנן בריצה ללא התחשבות בזמינות " +
        "משאבים (SAP note 551124) ולבצע תכנון סופי בשלב נפרד של אופטימיזציה או היוריסטיקות תזמון.",
      "להעביר ל-S/4HANA את כל הצעות הרכש של PP/DS: עמוד 'Transferring Orders to the SAP S/4HANA' ממליץ, מטעמי " +
        "ביצועים, להעביר רק הזמנות שסומן להן conversion indicator ולא הצעות שאינן נדרשות ב-S/4HANA.",
      "להשאיר מוצר מתוכנן גם ב-MRP של S/4HANA וגם ב-PP/DS: התנאי בעמוד 'PP/DS with SAP S/4HANA' הוא שהמוצרים " +
        "המתוכננים ב-PP/DS הוצאו מהתכנון ב-S/4HANA; וכן רכיב שקיים ברשימת הרכיבים של PP/DS בלבד 'is not " +
        "permitted', ה-BOM המלא נשמר ב-S/4HANA.",
      "בשילוב IBP מבוסס key figures: לשלב דרישות רכש לרכיבים או לשנות KF orders ידנית. התיעוד ממליץ לשלב דרישות " +
        "רכש למוצרים גמורים בלבד (סיכון כמויות גבוהות מדי), וקובע ששינוי ידני ב-KF orders אינו משפיע על תוצאת " +
        "התכנון.",
      "לסמן סימון מחיקה לחומר שעדיין Advanced Planning: עמוד 'Deleting Master Data' (2025.001) קובע שאין לסמן " +
        "Deletion flag לפני הסרת סימון Advanced Planning.",
      "למחוק רשומות מתור CIF חסום כדי לשחרר אותו: רשומת qRFC של המאגר מציינת שמחיקה באמצע התור שוברת את הסדר, " +
        "והתקרית qrfc-smq1-outbound-blocked מורה למחוק head LUW רק אחרי אימות; עמוד 'Integrating PP/DS' ממליץ על " +
        "CIF Post-Processing כדי למנוע חסימות.",
    ],
    checks: [
      "חיובי: חומר עם Advanced Planning ו-Scope Limitation, ריצת MD01N: החומר מופנה להיוריסטיקת PP/DS לפי " +
        "ה-Scope Limitation (עמוד 'Working with MRP Live'), וההזמנה המתוכננת נראית ב-MD04 בצד S/4HANA.",
      "המרה: הזמנה מתוכננת עם conversion indicator שהועברה יוצרת פקודת ייצור ב-S/4HANA מיד, בלי הזמנה מתוכננת " +
        "מקבילה ב-S/4HANA, ומספר הפקודה חוזר ל-PP/DS (עמוד 'Transferring Orders to the SAP S/4HANA').",
      "סנכרון ביצוע: אישור פעולה ב-S/4HANA מעדכן כמויות ותאריכים ב-PP/DS באופן סינכרוני, והשלמה טכנית מוחקת את " +
        "הפקודה ב-PP/DS (עמודים 'PP/DS with SAP S/4HANA' ו-'Production Process with SAP S/4HANA and PP/DS').",
      "IBP ל-PIR: הרצת ה-iFlow עם Process PIRs פעיל מסתיימת בסטטוס ירוק; בלי ההפעלה הנתונים נשארים בטבלת " +
        "ה-staging של תוסף האינטגרציה (What's New IBP 2605).",
      "שלילי: הזמנה מתוכננת שאין לה גרסת ייצור תקפה לא עוברת המרה ב-CO40/CO41 (תקרית " +
        "planned-order-not-convert); הזמנה שהועברה בלי conversion indicator והומרה ב-S/4HANA מאבדת את תאריכי " +
        "PP/DS (עמוד 'PP/DS with SAP S/4HANA'); PIR בגרסה לא פעילה אינן נראות ל-MRP (domains.ts#pppi-pir).",
      "ממשק: אין רשומות SYSFAIL/CPICERR בתורי SMQ1/SMQ2 של CIF וה-scheduler רשום ב-SMQR " +
        "(data/integration.ts#qrfc).",
    ],
    status: {
      status: "s4_native",
      he: "PP/DS מוטמע הוא חלק מ-SAP S/4HANA החל מ-OP 1709 (ePP/DS) עם מגבלות מסוימות (with certain restrictions), " +
        "ומתועד במדריך PP/DS לגרסת 2025 FPS01; ב-ECC התהליך המקביל נשען על SCM/APO נפרד דרך CIF.",
      edition: "on-premise",
      release: "2025.001",
      source: PPDS_STATUS_SOURCE,
      recommendedAction: "להפעיל Advanced Planning רק למוצרים קריטיים, להגדיר CIF פנימי ו-conversion indicator, ולבחור ערוץ שילוב " +
        "IBP (PIR דרך SAP Cloud Integration, key figures, או שילוב מבוסס הזמנות) לפי גרסת S/4HANA ורישיון ה-IBP.",
    },
    process: {
      purpose: "לחבר את התכנון הטקטי ב-SAP IBP ואת התכנון המפורט ב-PP/DS לביצוע ב-S/4HANA, כך שהביקוש המאושר מגיע ל-MRP " +
        "כ-PIR, מוצרים קריטיים מתוכננים ומתוזמנים על משאבי צוואר בקבוק ב-PP/DS, ופקודות הייצור מבוצעות ב-S/4HANA " +
        "עם תאריכים שנשמרו מהתכנון (עמודים 'PP/DS with SAP S/4HANA', 'PP/DS Process', 'Production Planning " +
        "Integration Based on Key Figures').",
      trigger: [
        {
          he: "מחזור התכנון ב-IBP מפרסם תוצאות: תחזית (I_FINALGLOBALDEMANDPLANQTY, או I_FINALCONSDEMANDPLANQTY ל-S&OP) " +
            "להעברה כ-PIR, או תוכנית היצע לפי key figures (CONSENSUSDEMANDQTY, PRODUCTION, NETNEWREQORDER) (תיעוד SAP " +
            "IBP).",
          xrefs: ["tx:MD61"],
        },
        {
          he: "שינוי רלוונטי לתכנון שיוצר planning file entry ב-PP/DS, וריצת MRP מתוזמנת (עמוד 'PP/DS Process'; MD01N / " +
            "F1339).",
          xrefs: ["tx:MD01N", "fiori:F1339"],
        },
        {
          he: "שינוי בהזמנת מכירה או בפקודה ב-S/4HANA שעובר מיד ל-PP/DS דרך CIF (עמודים 'Forecast Consumption and " +
            "Requirements Strategies' ו-'Production Process with SAP S/4HANA and PP/DS').",
          xrefs: ["obj:production-order"],
        },
      ],
      preconditions: [
        {
          he: "PP/DS מופעל: Model 000 ו-Version 000, הגדרות CIF (SAP_APO, release 713), פרמטרי משתמש CIF ורישום התור " +
            "ב-SMQR, טווח מספרים ב-/SAPAPO/RRPCUST1, ו-ATP categories שסופקו (עמוד 'Integrating PP/DS').",
          xrefs: ["tx:SMQR"],
        },
        {
          he: "המפעל מוגדר כ-location ב-PP/DS והחומר מסומן Advanced Planning עם Scope Limitation; ל-multilevel נדרשים " +
            "BOM, routing ו-PDS לכל החומרים (עמודים 'Initial Transfer Report' ו-'Working with MRP Live').",
          xrefs: ["table:MARC"],
        },
        {
          he: "גרסאות ייצור תקפות ב-S/4HANA (עמוד 'PP/DS with SAP S/4HANA'; לפי mrp-center.ts#prod-version גרסה היא " +
            "חובה ל-MRP Live ול-PP-DS).",
          xrefs: ["tx:C223", "table:MKAL", "cds:I_ProductionVersion"],
        },
        {
          he: "לשילוב IBP מבוסס key figures: SAP S/4HANA 2022 ומעלה ו-CI-DS 2111 ומעלה (לגרסאות ישנות SAP Note " +
            "3246773). ל-PIR דרך SAP Cloud Integration: תוסף האינטגרציה בגרסה 2.0 SP02. לפי עמוד Technical System " +
            "Landscape, CI-DS אינו זמין לרישיונות IBP שהונפקו אחרי April 20, 2026, והחלופה המומלצת היא SAP Cloud " +
            "Integration.",
        },
        {
          he: "flexible constraints (S/4HANA 2023 ומעלה): טווח מספרים לאובייקט /SAPAPO/FX ב-SNRO (עמוד 'Planning with " +
            "Flexible Constraints').",
          xrefs: ["tx:SNRO"],
        },
      ],
      masterData: [
        {
          he: "מיפוי נתוני האב S/4HANA ל-PP/DS לפי עמוד 'PP/DS with SAP S/4HANA': Plants→Locations; Material " +
            "masters→Product masters; Production versions (BOMs, routing/recipe)→production data structures; Work " +
            "centers (capacities)→resources; Scheduling agreements, Contracts, Purchasing info records→External " +
            "procurement relationships.",
          xrefs: [
            "table:MARA", "table:MARC", "table:MKAL", "table:MAST", "table:PLKO", "table:CRHD", "table:KAKO",
            "obj:work-center", "obj:material-bom",
          ],
        },
        {
          he: "Strategy Group ו-requirement class בחומר (MARC לפי domains.ts#pppi-planning-strategies) תואמים ל-Check " +
            "Mode ב-PP/DS (עמוד 'Forecast Consumption and Requirements Strategies').",
          xrefs: ["table:MARC", "cds:I_ProductPlant", "cds:I_MRPMaterial"],
        },
        {
          he: "בצד IBP: location, location product ו-MRP area; ה-BAdI /IBP/ETS_PIR_IN ממיר מזהי location ו-MRP area " +
            "לאורך הנדרש בתוסף האינטגרציה (What's New IBP 2605).",
        },
      ],
      roles: [
        {
          he: "מתכנן ייצור (SAP_BR_PRODN_PLNR): Production Scheduling Board ו-Schedule MRP Runs לפי " +
            "data/fiori/apps.ts#F2176, #F1339; מתכנן חומרים לרכש חיצוני (SAP_BR_MATL_PLNR_EXT_PROC) לפי #F1339.",
          xrefs: ["fiori:F2176", "fiori:F1339"],
        },
        {
          he: "מתכנן ביקוש (Demand planner, לפי שדה users ב-tx-intel.ts#MD61) מתחזק PIR; תפקידי IBP עצמם אינם מתועדים " +
            "ברשומות שנקראו.",
          xrefs: ["tx:MD61", "tx:MD62"],
        },
      ],
      transactions: [
        {
          he: "נתוני אב: MM02 (Advanced Planning בחומר), C223 (גרסת ייצור); מודל אינטגרציה: CFM1/CFM2 לפי עמוד aATP " +
            "בלבד (אינן במילון הפרויקט).",
          xrefs: ["tx:MM02", "tx:C223"],
        },
        {
          he: "ביקוש: MD61, MD62, MD63 לדרישות עצמאיות מתוכננות.",
          xrefs: ["tx:MD61", "tx:MD62", "tx:MD63"],
        },
        {
          he: "תכנון: MD01N (MRP Live), Schedule MRP Runs (F1339), MD04 ו-MRP Cockpit (F0247A, F0251).",
          xrefs: ["tx:MD01N", "tx:MD04", "fiori:F1339", "fiori:F0247A", "fiori:F0251"],
        },
        {
          he: "PP/DS: /SAPAPO/CDPSB0, /SAPAPO/RRP3, /SAPAPO/CDPS0, /SAPAPO/PPT1, /SAPAPO/RPT (עמוד '3 PP/DS " +
            "Restricted'; לא במילון); Fiori Production Scheduling Board (F2176) ו-Advanced Scheduling Board (F5460).",
          xrefs: ["fiori:F2176", "fiori:F5460"],
        },
        {
          he: "המרה וביצוע: CO40, CO41 (ללא conversion indicator דורסים תאריכי PP/DS), CO02, CO05N, CO11N; Manage " +
            "Production Orders (F2336).",
          xrefs: ["tx:CO40", "tx:CO41", "tx:CO02", "tx:CO05N", "tx:CO11N", "fiori:F2336"],
        },
        {
          he: "ממשק: SMQ1, SMQ2, SMQR, SM59; העברה ראשונית בלי מודל אינטגרציה בדוח /SAPAPO/PPDS_DELTA_ORD_TRANS דרך " +
            "SE38.",
          xrefs: ["tx:SMQ1", "tx:SMQ2", "tx:SMQR", "tx:SM59", "tx:SE38"],
        },
      ],
      tables: [
        {
          he: "S/4HANA: MARC, MKAL, AFKO/AFPO, RESB; PLAF (הזמנה מתוכננת) ו-PBIM/PBED (PIR) נקובות ב-tx-intel ואינן " +
            "במילון הפרויקט.",
          xrefs: ["table:MARC", "table:MKAL", "table:AFKO", "table:AFPO", "table:RESB", "table:MDMA"],
        },
        {
          he: "PP/DS: הזמנות ואלמנטי תכנון נשמרים ב-liveCache (עמודים 'Forecast Consumption and Requirements " +
            "Strategies', 'Planning with Flexible Constraints'); טבלת הבקרה /SAPAPO/PUB_CHK נקובה בפריט הפישוט 9.5.1.",
        },
        {
          he: "אובייקטים ותצוגות CDS: הזמנה מתוכננת, פקודת ייצור, מרכז עבודה; I_MRPMaterial, I_ProductionVersion, " +
            "I_ProductionOrder, I_WorkCenter (data/cds-map.ts).",
          xrefs: [
            "obj:planned-order", "obj:production-order", "obj:work-center", "cds:I_MRPMaterial",
            "cds:I_ProductionVersion", "cds:I_ProductionOrder", "cds:I_WorkCenter",
          ],
        },
      ],
      integrationPoints: [
        {
          he: "IBP → S/4HANA: תחזית כ-PIR דרך SAP Cloud Integration ותוסף האינטגרציה, או key figures דרך CI-DS. בכיוון " +
            "ההפוך, RTI מבוסס CIF מעביר נתונים מ-SAP S/4HANA לאזורי תכנון מבוססי SAP7F ו-I_SAPIBP2, ותוצאות התכנון " +
            "חוזרות בשילוב תקופתי או בזמן אמת (עמוד 'Data Integration Using Core Interface for RTI', SAP IBP 2608).",
          xrefs: ["tx:MD61"],
        },
        {
          he: "S/4HANA ↔ PP/DS דרך CIF: נתוני אב וחומרים, PIR, הזמנות מכירה, הזמנות מתוכננות ופקודות ייצור עוברים בשני " +
            "הכיוונים (עמוד 'PP/DS with SAP S/4HANA').",
          xrefs: ["obj:planned-order", "obj:production-order", "tx:SMQ1", "tx:SMQ2"],
        },
        {
          he: "MRP Live ↔ PP/DS: MRP Live קורא להיוריסטיקות PP/DS לחומרי Advanced Planning (פריט הפישוט 'S4TWL - MRP in " +
            "HANA'); לפי What's New 2025 'Business Transaction Events in MRP Live', חומרים לשילוב IBP או PP/DS " +
            "מתוכננים ב-MRP Live ואירועי BTE מופעלים בעיבוד שלאחר מכן.",
          xrefs: ["tx:MD01N", "enh:technique:bte"],
        },
        {
          he: "PP/DS → IBP: הזמנות מתוכננות ופקודות ייצור מצטברות ל-confirmed supply, וצריכת משאבים מוחזרת (עמוד " +
            "'Production Planning Integration Based on Key Figures').",
        },
        {
          he: "המשך הביצוע: bp:production-order-process, bp:confirmation-process ו-bp:goods-movement-process.",
          xrefs: ["bp:production-order-process", "bp:confirmation-process", "bp:goods-movement-process"],
        },
      ],
      interfaces: [
        {
          he: "CIF מעל qRFC (data/integration.ts#qrfc; עמוד 'Integrating PP/DS'); הרחבות פרסום הזמנות מ-PP/DS: BAdI " +
            "/SAPAPO/PPDS_ORDER_INT ו-BAdIs/exits קודמים כמו /SAPAPO/CL_EX_CIF_OP ו-EXIT_/SAPAPO/SAPLCIF_ORD_001 " +
            "(פריט הפישוט 9.5.1; אינם במילון הפרויקט).",
          xrefs: ["tx:SMQ1", "tx:SMQ2"],
        },
        {
          he: "IBP: iFlow 'Integrate Key Figures from SAP IBP to Add-On as Planned Independent Requirements', מודול " +
            "/IBP/ETS_PIR_IN_CI_RFC ו-BAdI /IBP/ETS_PIR_IN (What's New IBP 2605); iFlow 'Integrate Sales Order " +
            "History Data from Add-on to SAP IBP' לכיוון הנכנס.",
        },
        {
          he: "OData API בשם 'Flexible Constraint for PP/DS' (Related Information בעמוד What's New 2023); מזהה השירות " +
            "לא נקרא.",
        },
        {
          he: "BAPI_MATERIAL_SAVEDATA עם Scope Limitation ו-Scope Profile (עמוד ה-BAPI של PP/DS, אומת ברשומת " +
            "fm:BAPI_MATERIAL_SAVEDATA); BAPI_PLANNEDORDER_CREATE ו-BAPI_PLANNEDORDER_GET_DETAIL להזמנות מתוכננות בצד " +
            "S/4HANA (tx-intel.ts#MD11).",
          xrefs: ["fm:BAPI_MATERIAL_SAVEDATA", "fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL"],
        },
        {
          he: "הרחבות MRP בצד S/4HANA: Customer Exit M61X0001 ו-BAdI MD_PLDORD_POST (תקרית mrp-no-planned-orders); BAdI " +
            "/SAPAPO/BADI_FC_CSP_CLNDR ללוח שנה בצריכת תחזית ב-PP/DS (לא במילון).",
          xrefs: ["enh:exit:M61X0001", "enh:badi:MD_PLDORD_POST"],
        },
      ],
      outputs: [
        {
          he: "PIR ב-S/4HANA מתוצאות התחזית של IBP.",
          xrefs: ["tx:MD61"],
        },
        {
          he: "הזמנות מתוכננות מתוזמנות ב-PP/DS, עם מספר S/4HANA לאחר ההעברה הראשונה.",
          xrefs: ["obj:planned-order"],
        },
        {
          he: "פקודות ייצור ב-S/4HANA שנוצרו מהמרה עם conversion indicator ושומרות את תאריכי PP/DS.",
          xrefs: ["obj:production-order", "table:AFKO", "table:AFPO"],
        },
        { he: "confirmed supply וצריכת משאבים ב-IBP ברמת תקופה (תיעוד SAP IBP)." },
        {
          he: "מסמכי לוגיסטיקה וחשבונאות של הביצוע (משיכת רכיבים, אישור, קבלת טובין) נוצרים ב-S/4HANA ולא ב-PP/DS; " +
            "פירוטם ב-bp:goods-movement-process וב-bp:confirmation-process.",
          xrefs: ["bp:goods-movement-process", "bp:confirmation-process"],
        },
      ],
      exceptions: [
        {
          he: "תור CIF חסום (SYSFAIL/CPICERR) עוצר את העברת ההזמנות (תקריות qrfc-smq1-outbound-blocked, " +
            "smq1-outbound-stuck).",
          xrefs: ["tx:SMQ1", "tx:SMQ2", "tx:SM59"],
        },
        {
          he: "הזמנה מתוכננת לא מומרת: אין גרסת ייצור תקפה (תקרית planned-order-not-convert; בתקרית " +
            "planned-order-not-convertible, שעוסקת בהמרה להזמנת תהליך ב-PP-PI, נמנים גם COR4 ו-conversion indicator).",
          xrefs: ["tx:CO40", "tx:CO41", "tx:C223", "table:MKAL"],
        },
        {
          he: "MRP לא יוצר הזמנות: planning file לא מסמן את החומר או שאין דרישה (תקרית mrp-no-planned-orders).",
          xrefs: ["tx:MD01N", "tx:MD04"],
        },
        {
          he: "תחזית שונה בין לשונית Elements ללשונית Forecast ב-Product View: הפעלת צריכה מחדש בדוח " +
            "/SAPAPO/CSP_CORRECT_FCST (עמוד 'Forecast Consumption and Requirements Strategies').",
        },
        {
          he: "iFlow ה-PIR נכשל כשמזהה location או MRP area חורג ממגבלת האורך של תוסף האינטגרציה ולא הומר ב-BAdI " +
            "(What's New IBP 2605).",
        },
        {
          he: "PIR או כמות תחזית כפולה מול מכירות: אסטרטגיה או requirement type לא תואמים " +
            "(domains.ts#pppi-planning-strategies).",
          xrefs: ["tx:MD61", "tx:MD62"],
        },
      ],
      controls: [
        {
          he: "conversion indicator ב-PP/DS ובדיקות המרה (למשל ATP לרכיבים) לפני העברה ל-S/4HANA (עמוד 'Converting " +
            "Orders').",
        },
        {
          he: "CIF Post-Processing כאופן טיפול בשגיאות למניעת חסימת תורים (עמוד 'Integrating PP/DS').",
          xrefs: ["tx:SMQR"],
        },
        {
          he: "freeze horizon ב-IBP שמקביל לאופק PP/DS: תוכנית PP/DS קבועה ואינה ניתנת לשינוי ב-IBP (תיעוד SAP IBP).",
        },
        { he: "Process PIRs ב-iFlow מחזיר סטטוס ירוק או הודעת שגיאה על העיבוד בתוסף (What's New IBP 2605)." },
        {
          he: "לחומר שה-Scope Limitation שלו PP/DS Restricted מותרות רק ההיוריסטיקות שברשימת ה-Scope Profile (עמוד '3 " +
            "PP/DS Restricted').",
        },
      ],
      eccToS4: [
        {
          he: "ECC: PP-DS היה רכיב נפרד ב-SCM/APO שחובר ב-CIF למערכת ה-ERP (data/ecc-s4.ts#pp-ds). S/4HANA: PP/DS מוטמע " +
            "(ePP/DS) החל מ-OP 1709 לפי עמוד ה-LO הרשמי, עם CIF שמצביע לאותה מערכת ולקוח (עמוד 'Integrating PP/DS').",
        },
        {
          he: "S/4HANA: פריט הפישוט 'S4TWL - MRP in HANA' קובע ש-MRP Live (MD01N) קורא להיוריסטיקות PP/DS לחומרי " +
            "Advanced Planning וש-MD01N הוא הטכנולוגיה העתידית; MD01 הקלאסי עדיין זמין.",
          xrefs: ["tx:MD01N", "tx:MD01"],
        },
        {
          he: "S/4HANA: פריט הפישוט 'S4TWL - Sales and Operation Planning' מציב את SOP (MC74, MC75 ועוד) " +
            "ב-compatibility pack וקובע ש-IBP הוא הפתרון היורש, ללא נתיב מעבר ייעודי.",
          xrefs: ["tx:MC74", "tx:MC75", "tx:MC87"],
        },
        {
          he: "S/4HANA 2023: flexible constraints ל-PP/DS מאפשרים לשלב החלטות תכנון ממערכת חיצונית כמו IBP (What's New " +
            "2023); Advanced Scheduling Board (F5460) חדש מ-S/4HANA 2022 (What's New 2022).",
          xrefs: ["fiori:F5460"],
        },
      ],
      migration: [
        {
          he: "בשדרוג מ-S/4HANA 1610 או 1709 ל-1809 (לפי תנאי הפריט): פריט הפישוט 'S4TWL - Performance optimizations " +
            "for publication of planning orders' רלוונטי כאשר BAdIs או exits של פרסום הזמנות מ-PP/DS ממומשים; במקרה " +
            "זה נשמרת הלוגיקה הישנה עד שהקוד מותאם ל-/SAPAPO/PPDS_ORDER_INT ונרשם 'X' ב-/SAPAPO/PUB_CHK.",
        },
        {
          he: "מעבר מ-APO ל-PP/DS מוטמע: ספר 4 פרק 11 'Migration to Embedded PP/DS' (New Implementation, System " +
            "Conversion, Landscape Transformation), כותרות בלבד; רשומת המאגר data/ecc-s4.ts#pp-ds מציינת שארגונים עם " +
            "APO צריכים להחליט על מעבר.",
        },
        {
          he: "העברה ראשונית של הזמנות קיימות ל-PP/DS בלי מודל אינטגרציה: הדוח /SAPAPO/PPDS_DELTA_ORD_TRANS (עמוד " +
            "'Initial Transfer Report').",
          xrefs: ["tx:SE38"],
        },
        {
          he: "גרסת ייצור תקפה לכל חומר מיוצר היא נקודת בדיקה בהגירה (data/domain-detail.ts#pppi-production-versions).",
          xrefs: ["tx:C223", "table:MKAL"],
        },
      ],
      reference: {
        title: "PP/DS Process | Production Planning and Detailed Scheduling (PP/DS) (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/f52ec95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התהליך הרשמי של PP/DS מרשומת חיפוש (loio f52ec95360267614e10000000a174cb4, 2025.001), נקרא במלואו " +
          "ב-2026-09-24. זה עמוד תהליך ולא פריט SAP Best Practices; לצד IBP עמוד ההשלמה הוא 'Production Planning " +
          "Integration Based on Key Figures' (SAP IBP 2608). פריט Scope Item לתהליך לא אותר ולא נרשם; עמוד What's " +
          "New 'Flexible Constraints' מדפיס 'Scope Item Not applicable'.",
      },
    },
    xrefs: [
      "tx:MD61", "tx:MD62", "tx:MD63", "tx:MD01N", "tx:MD01", "tx:MD04", "tx:CO40", "tx:CO41", "tx:CO02", "tx:CO05N",
      "tx:CO11N", "tx:C223", "tx:MM02", "tx:SMQ1", "tx:SMQ2", "tx:SMQR", "tx:SM59", "tx:SNRO", "tx:SE38", "tx:MC74",
      "tx:MC75", "tx:MC87", "table:MARA", "table:MARC", "table:MKAL", "table:MAST", "table:PLKO", "table:CRHD",
      "table:KAKO", "table:AFKO", "table:AFPO", "table:RESB", "table:MDMA", "fiori:F2176", "fiori:F5460",
      "fiori:F1339", "fiori:F0247A", "fiori:F0251", "fiori:F2336", "fm:BAPI_MATERIAL_SAVEDATA",
      "fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL", "cds:I_MRPMaterial",
      "cds:I_ProductionVersion", "cds:I_ProductionOrder", "cds:I_WorkCenter", "cds:I_ProductPlant",
      "obj:planned-order", "obj:production-order", "obj:work-center", "obj:material-bom", "enh:exit:M61X0001",
      "enh:badi:MD_PLDORD_POST", "enh:technique:bte", "bp:mrp-process", "bp:sales-demand-to-production",
      "bp:plan-to-produce-discrete", "bp:production-order-process", "bp:confirmation-process",
      "bp:goods-movement-process",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "PP/DS Process | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/f52ec95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio f52ec95360267614e10000000a174cb4; גוף העמוד נקרא במלואו ב-2026-09-24: 'You enable Advanced Planning " +
          "as product and integrate PP/DS, to transfer requirements and receipts'; 'You plan the procurement " +
          "proposals in an MRP planning run for products for which PP/DS creates a planning file entry when " +
          "planning-relevant changes occur. The system also automatically schedules the newly created procurement " +
          "proposals on the resources in this case'; 'As a rule, you should plan infinitely in the MRP run, meaning " +
          "that you do not take account of the resource availability (see SAP note 551124)'; 'You use PP/DS " +
          "optimization or special scheduling heuristics ... to plan the sequence of orders on the resources while " +
          "taking account of the resource availability (finite planning)'; כלי התכנון האינטראקטיבי: Heuristics, " +
          "Product Planning table, Production Scheduling board, Push production; 'The procurement proposals that " +
          "were created or changed are transferred to SAP S/4HANA. If you do not plan all products of a BOM " +
          "structure in PP/DS, you must complete planning in SAP S/4HANA'; הביצוע ב-S/4HANA: Confirmations, Posting " +
          "goods receipt/issue.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP/DS with SAP S/4HANA | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/aa35c95360267514e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "loio aa35c95360267514e10000000a174cb4; גוף העמוד נקרא במלואו ב-2026-09-24: 'With Production Planning and " +
          "Detailed Scheduling (PP/DS) you plan critical products that are produced on bottleneck resources, on the " +
          "basis of production data structures. You use SAP S/4HANA for master data maintenance, for the " +
          "manufacturing execution functions ... and for planning uncritical products'; תנאים: 'You have excluded " +
          "the products that you are planning in PP/DS from the planning in SAP S/4HANA', 'You have defined " +
          "production versions in SAP S/4HANA', 'The data is integrated to the active model 000 and the active " +
          "planning version 000'. טבלת נתוני האב: Plants→Locations, Material masters→Product masters, 'The " +
          "production versions from SAP S/4HANA are created in PP/DS as production data structures', 'The " +
          "capacities of the work centers are created as resources in PP/DS', ו-Scheduling agreements, Contracts, " +
          "Purchasing info records→External procurement relationships. נתוני תנועה שעוברים: sales orders, " +
          "production or process orders, manual reservations, purchase requisitions or orders, planned orders, " +
          "planned independent requirements; 'Any changes made in PP/DS are transferred automatically to SAP " +
          "S/4HANA; the same applies in the opposite direction'. השוואת רשימות רכיבים A/B: רכיב שקיים רק ברשימה A " +
          "'is not permitted. The complete BOM must be maintained in SAP S/4HANA'. 'Orders for which this " +
          "conversion indicator is set are immediately automatically converted after transfer to SAP S/4HANA'; 'If " +
          "you transfer planned orders and purchase requisitions, without the conversion indicator set, to SAP " +
          "S/4HANA, and only carry out the conversion there, the dates planned in PP/DS are overwritten'. טבלת " +
          "פונקציות הביצוע: משיכת רכיבים, אישור וקבלת טובין מעדכנים את PP/DS באופן סינכרוני; 'Confirmations or " +
          "final deliveries lead to reduction of the open quantity of the corresponding order in PP/DS to zero'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Integrating PP/DS | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/5531c95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "loio 5531c95360267614e10000000a174cb4; גוף העמוד נקרא במלואו ב-2026-09-24. תנאים מוקדמים: 'You must set " +
          "up Model '000' and Version '000' manually'; הגדרת CIF ב-Customizing עם 'system type SAP_APO and release " +
          "713 so that an Integration model pointing to itself (own system and client) is created'; 'You must set " +
          "up CIF user parameters and then register the CIF queue (using transaction SMQR)'; 'There is no need for " +
          "maintaining distribution definition or publication types, as PP/DS is part of SAP S/4HANA'; 'SAP " +
          "recommends using CIF Post-Processing as the error-handling option to avoid queue blocks'; 'You must " +
          "enable the number range in PP/DS for SAP S/4HANA in PP/DS global parameters and values (using " +
          "transaction /SAPAPO/RRPCUST1)'; הפניה ל-SAP note 2712349 לשיטות מומלצות ליישום PP/DS ב-S/4HANA (גרסאות " +
          "1709 עד 2023).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Working with MRP Live | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/86e15c58eb021f60e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "loio 86e15c58eb021f60e10000000a44147b; גוף העמוד נקרא במלואו ב-2026-09-24: 'The system despatches SAP " +
          "S/4HANA materials to be planned with MRP Live, and Advanced Planning-relevant materials to Classic MRP " +
          "or the appropriate PP/DS product heuristics, based on the Scope Limitation which is selected for the " +
          "Advanced Planning-relevant materials. Low level code calculation happens in SAP S/4HANA for all " +
          "materials'; תנאי: 'The Advanced Planning checkbox has been selected for all Advanced Planning-relevant " +
          "materials and Scope Limitation has been selected in the Advanced Planning tab of the SAP S/4HANA " +
          "material master. For multilevel scenarios, the required BOMs and routings are maintained; also, " +
          "production data structure (PDS) has been maintained for all involved materials'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Forecast Consumption and Requirements Strategies | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/479dd3658b3b3c5ce10000000a421937.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 479dd3658b3b3c5ce10000000a421937; גוף העמוד נקרא במלואו ב-2026-09-24: 'in PP/DS planned independent " +
          "requirements are consumed by other order types, such as sales orders, dependent demand, or transfer " +
          "requests'; 'Consumption period is calculated in calendar days in PP/DS for SAP S/4HANA and in working " +
          "days in SAP S/4HANA. A calendar can be assigned to respect working days by using BAdI " +
          "/SAPAPO/BADI_FC_CSP_CLNDR'; 'The corresponding strategy group of the requirement class has to be defined " +
          "in SAP S/4HANA material master. In PP/DS, the Requirement Class has to be defined as Check Mode (same " +
          "identifier)'; 'Trigger the Forecast consumption using Report /SAPAPO/CSP_CORRECT_FCST in case in the " +
          "Product view the Elements tab result is different from that of the Forecast tab'; 'We recommend creating " +
          "planned independent requirements (PIRs) in SAP S/4HANA and integrating them with PP/DS'; 'Consumption is " +
          "fully integrated with SAP S/4HANA using the Core Interface (CIF). This means, for example, that changes " +
          "to sales orders in SAP S/4HANA are taken into account immediately in PP/DS'; 'Consumption takes place in " +
          "order liveCache'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Transferring Orders to the SAP S/4HANA | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/dc2ec95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio dc2ec95360267614e10000000a174cb4; גוף העמוד נקרא במלואו ב-2026-09-24: ההפרדה בין transfer event " +
          "להעברה הפיזית; 'You can link the transfer of planned orders or purchase requisitions with automatic " +
          "order opening in SAP S/4HANA. To do this, you set the conversion indicator for the orders in PP/DS'; " +
          "'For performance reasons ... you should only transfer planned orders or purchase requisitions, for which " +
          "the conversion indicator has been set, into SAP S/4HANA. You should not transfer procurement proposals " +
          "that you do not need in SAP S/4HANA'; 'PP/DS automatically creates a transfer event for each change to a " +
          "production order'; שלוש אפשרויות ליצירת transfer event להזמנות מתוכננות ודרישות רכש, מוגדרות ב-Advanced " +
          "Planning תחת Maintain global parameters and defaults; 'Until the first transfer, a planned order or " +
          "purchase requisition created in PP/DS has a local order number. When the order is transferred to SAP " +
          "S/4HANA, it obtains an SAP S/4HANA order number'; 'with the conversion indicator set, a production order " +
          "or purchase order is immediately automatically created in SAP S/4HANA. In SAP S/4HANA, there is " +
          "therefore no corresponding planned order or purchase requisition'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Converting Orders | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/7137c95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 7137c95360267614e10000000a174cb4; גוף העמוד נקרא במלואו ב-2026-09-24: 'the conversion indicator " +
          "must be set in Production Planning and Detailed Scheduling (PP/DS) before this order is transferred'; " +
          "ניתן להציב אותו ידנית ב-product view, ב-order processing view או ב-receipt view, או לפני mass transfer " +
          "להזמנות שמועד הפתיחה המתוכנן שלהן בעבר; 'Basically, you should only trigger conversion of a planned " +
          "order into a manufacturing order in SAP S/4HANA by setting the conversion indicator in PP/DS. Only by " +
          "doing this, can the dates planned in PP/DS be retained'; 'Using the conversion checks, you can exclude " +
          "orders from the transfer and conversion ... For example, you can use an ATP check'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Process with SAP S/4HANA and PP/DS | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/8539c95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "loio 8539c95360267614e10000000a174cb4; גוף העמוד נקרא במלואו ב-2026-09-24: 'The integration of " +
          "manufacturing orders (production and process orders) allows you to plan your critical components in " +
          "Production Planning and Detailed Scheduling (PP/DS) and uncritical components in SAP S/4HANA. As a rule, " +
          "the planned orders created in PP/DS are converted into manufacturing orders'; ב-S/4HANA מבוצעים Release, " +
          "Confirmation or partial confirmation, Posting of goods issue or goods receipt, Technical completion, " +
          "Deletion; 'Changes made in SAP S/4HANA are transferred online to PP/DS via the Core Interface (CIF)'; " +
          "'The manufacturing order is technically completed in SAP S/4HANA. This causes it to be deleted in " +
          "PP/DS'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Initial Transfer Report from SAP S/4HANA to PP/DS | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/1edc5c58eb021f60e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 1edc5c58eb021f60e10000000a44147b; גוף העמוד נקרא במלואו ב-2026-09-24: 'You can carry out the " +
          "transfer of orders from SAP S/4HANA to Production Planning and Detailed Scheduling (PP/DS) for SAP " +
          "S/4HANA using report /SAPAPO/PPDS_DELTA_ORD_TRANS, without the use of an integration model'; תנאים: 'The " +
          "plant is Advanced Planning-relevant', סוגי ההזמנות להעברה נבחרים ב-Customizing תחת Advanced Planning > " +
          "Basic Settings > Settings for Data Transfer; פעולות: סימון Advanced Planning בלשונית Advanced Planning " +
          "של אב החומר, והרצת הדוח ב-SE38 לפי חומר ומפעל.",
        verificationLevel: "sap_official_verified",
      },
      PPDS_STATUS_SOURCE,
      {
        sourceType: "sap_help",
        sourceTitle: "3 PP/DS Restricted | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/51e9a29579624a33a459c204340610b6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 51e9a29579624a33a459c204340610b6; גוף העמוד נקרא במלואו ב-2026-09-24. לחומרים שה-Scope Limitation " +
          "שלהם PP/DS Restricted מותרת הרצת היוריסטיקות לפי רשימת ה-Scope Profile בלבד, ומותרות פעולות " +
          "יצירה/עדכון/מחיקה על הזמנות ייצור עצמי ורכש חיצוני בטרנזקציות: Product View (/SAPAPO/RRP3), Create Order " +
          "(/SAPAPO/RRP5), Receipts View (/SAPAPO/RRP4), Requirements View (/SAPAPO/RRP1), Order Processing " +
          "(/SAPAPO/RRP2), Pegging Overview (/SAPAPO/PEG1), Production Planning Run (/SAPAPO/CDPSB0), Product " +
          "Planning Table (/SAPAPO/PPT1), DS Planning Board (/SAPAPO/CDPS0), Production Campaigns (/SAPAPO/PCMT), " +
          "Push Production (/SAPAPO/PUSH), Resource Planning Table (/SAPAPO/RPT), PP/DS Order Deletion Report " +
          "(/SAPAPO/DELETE_PP_ORDER).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Procedure | Integration Scenarios for aATP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1d9bfb257d54a5fbdd0f1545de13b22/71c178cd545f47f79a6b1fdd43478a20.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 71c178cd545f47f79a6b1fdd43478a20; גוף העמוד נקרא במלואו ב-2026-09-24, בהקשר העברת תחליפי מוצר ל-DSC " +
          "Edition ולא בהקשר PP/DS מוטמע: 'Create the integration model in the Create Integration Model app " +
          "(transaction CFM1) in the distributing system (SAP S/4HANA)'; 'Activate the integration model in the " +
          "Manually Activate Integration Model app (transaction CFM2)'; העברת שינויים דרך change pointers (BD50, " +
          "BD52) ו-CFP1. זהו מקור רשמי לשמות CFM1/CFM2 כטרנזקציות מודל האינטגרציה של CIF ב-S/4HANA 2025 FPS01; עמוד " +
          "PP/DS רשמי שנוקב בהם לא אותר בשאילתות 'integration model CFM1 PP/DS' ו-'CFM1 create integration model'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Flexible Constraints for Production Planning and Detailed Scheduling (PP/DS) | What's New in SAP S/4HANA " +
          "2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/8375672d6d0542d0bcec304b27724d5d.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim: "loio 8375672d6d0542d0bcec304b27724d5d; גוף העמוד נקרא במלואו ב-2026-09-24: 'This feature enables you to " +
          "integrate planning decisions that have been made in an external planning system, like SAP Integrated " +
          "Business Planning for Supply Chain (SAP IBP), as flexible constraints into Production Planning and " +
          "Detailed Scheduling (PP/DS) where they can be used for planning with a special heuristic'; Type New, " +
          "Scope Item 'Not applicable', Application Component SCM-APO-PPS, 'Valid as Of SAP S/4HANA 2023'; scopes " +
          "בסטנדרט: Location Product (LOCPRD) ו-Location Product and Source of Supply (LOCPRDSOS); Related " +
          "Information: 'OData API: Flexible Constraint for PP/DS'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planning with Flexible Constraints | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/4240fe2553744af5ab0d3d97bc196a48.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 4240fe2553744af5ab0d3d97bc196a48; גוף העמוד נקרא במלואו ב-2026-09-24: 'Flexible constraints can be " +
          "created directly in the SAP S/4HANA system, or can be integrated from an external planning system, like " +
          "SAP Integrated Business Planning for Supply Chain (SAP IBP)'; Minimum/Maximum/Target supply quantity; " +
          "תנאי: טווח מספרים לאובייקט /SAPAPO/FX ב-SNRO; 'In PP/DS, you use the Planning of Std. Lots (Flex. " +
          "Constr.) (SAP_PP_FLXC) heuristic to cover demand considering flexible constraints during planning within " +
          "the PP/DS horizon', שמרחיבה את SAP_PP_002; 'The target supply constraint is considered as \"soft\" " +
          "constraint'; 'Minimum and maximum supply quantities are considered as hard constraints that can only be " +
          "violated in exceptional cases'; סדר האילוצים: Planning Elements (שמורים ב-LiveCache), Order Constraints, " +
          "Demand Constraints, Flexible Constraints; להרחבת scopes מפנה ל-SAP Note 3441715; ניטור דרך PP/DS alert " +
          "profile.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deleting Master Data | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/2027c9535f267414e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "loio 2027c9535f267414e10000000a174cb4; סניפט רשומת החיפוש (2025 FPS01): 'Unless a material is completely " +
          "removed from PP/DS (by finally removing the 'Advanced Planning' indicator), you must not set the " +
          "Deletion flag for the material'. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition " +
          "2025 FPS01 (document version 1.36) · item 9.5.2 S4TWL - MRP in HANA (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "פריט 9.5.2 'S4TWL - MRP in HANA' (רכיב PP-MRP; Business Impact note 0002268085 'MRP Live on SAP HANA " +
          "MD01N', כפי שמודפס בטבלת Related Notes של הפריט), מהטקסט המחולץ " +
          "ב-scratchpad/official/SIMPL_OP2025.pdf.txt: 'MRP Live calls PP/DS planning heuristics if the material is " +
          "subject to advanced planning (advanced planning indicator set in the material master) and if PP/DS is " +
          "running embedded in SAP S/4HANA. Classic MRP planning and advanced PP/DS planning is performed for all " +
          "materials in the sequence of the low-level code'; וכן 'Classic MRP (transactions MD01, MD02, MD03, MD40, " +
          "MD41, MD42, MD43, MD50, MD51 ...) are still available in SAP S/4HANA but MRP live (transaction MD01N) is " +
          "considered the future technology'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition " +
          "2025 FPS01 (document version 1.36) · item 9.5.1 S4TWL - Performance optimizations for publication of " +
          "planning orders (SCM-APO-INT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "פריט 9.5.1 'S4TWL - Performance optimizations for publication of planning orders' (רכיב SCM-APO-INT; " +
          "Business Impact note 0002643483 כפי שמודפס בטבלת Related Notes), מהטקסט המחולץ " +
          "ב-scratchpad/official/SIMPL_OP2025.pdf.txt: 'PP/DS order publishing for planning orders (Planned orders, " +
          "Purchase requisitions, stock transfer requisitions) is optimized to improve performance. This has " +
          "resulted in changes in the way BAdI's/User exits are called during publication from PP/DS'; 'Advanced " +
          "Planning (PP/DS) is used for production planning and planning receipts are integrated back to SAP " +
          "S/4HANA from live-cache'; 'If you have implemented an effected BAdI's/user exists, the system will " +
          "retain old publication logic post upgrade'; בין ה-BAdIs הרלוונטיים /SAPAPO/DM_PO_CHANGE, " +
          "/SAPAPO/CL_EX_CIF_OP, /SAPAPO/CL_EX_CIF_IP, ובין ה-Customer exits EXIT_/SAPAPO/SAPLCIF_ORD_001 " +
          "ו-EXIT_SAPLCORD_005; ה-BAdI החדש: /SAPAPO/PPDS_ORDER_INT; המעבר ללוגיקה המותאמת דורש רשומה 'X' בטבלה " +
          "/SAPAPO/PUB_CHK. תנאי הפריט: 'Target release is SAP S/4HANA 1809. Source release is SAP S/4HANA 1610 or " +
          "SAP S/4HANA 1709'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "S4TWL - Sales and Operation Planning (SAP S/4HANA 2025 FPS01 Simplification List, document version 1.36, " +
          "item 9.5.17, SAP Note 2268064)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "הפריט קובע במפורש תחת הכותרת 'The following SOP transactions are part of the compatibility pack': " +
          "'Transaction MC74, MC75, MC76, MC77 (Disaggregation)'. כלומר MC75 מנוי בפירוש כטרנזקציית Disaggregation " +
          "שנמצאת בתוך ה-compatibility scope של SAP S/4HANA (זכויות שימוש מוגבלות, ר' SAP Note 2269324). תחת " +
          "'Reasons why Sales and Operations Planning is part of the compatibility pack' הפריט קובע: \"Integrated " +
          "Business Planning IBP is the solution for sales and operations planning\"; תחת 'Required and Recommended " +
          "Action(s)' נכתב 'PP SOP is intended as a bridge or interim solution... IBP is the successor solution', " +
          "עם הפניה ל-SAP Note 3503528 למימוש IBP, ומצוין שאין נתיב מעבר ייעודי (no special migration path) בין SOP " +
          "ל-IBP. (אומת ברשומת tx:MC75)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Transaction Events in MRP Live | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private " +
          "Edition 2025",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/2278cd20aacc4fa99aa4dcefc5be0a82.html?locale=en-US&state=PRODUCTION&version=2025.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        accessedAt: DATE_TX_21,
        claim: "רשומת What's New בשם 'Business Transaction Events in MRP Live' לגרסת S/4HANA 2025 (loio " +
          "2278cd20aacc4fa99aa4dcefc5be0a82) נוקבת: 'With this feature, BTE events are now also generated during " +
          "the MRP Live run'. משפט הפתיחה התקבל בשני חלונות סניפט נפרדים שחופפים זה לזה, ולכן הוא מורכב כאן משניהם " +
          "ולא צוטט מחלון אחד: 'This feature enables materials relevant for SAP Integrated Business Planning (SAP " +
          "IBP) or Production Planning and Detailed Scheduling (PP/DS) integration to be planned using MRP live, " +
          "followed by triggering the Business Transaction Events (BTEs) for documents created during " +
          "post-processing'. שורת הסיווג בסניפט היא 'Availability SAP S/4HANA Cloud Private Edition and SAP S/4HANA " +
          "Valid as Of 2025', ובשורת הפריט מופיעים 'Changed n/a PP-MRP 2025'. הרשומה אינה נוקבת בקוד טרנזקציה, בשם " +
          "אירוע BTE או במודול פונקציה. גוף העמוד לא נקרא. (אומת ברשומת enh:technique:bte)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Scheduling Board | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/e5a89957c59f6c10e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim: "מדריך PP/DS לגרסת 2025 FPS01 מתעד את היישום: 'With this app, you can optimize and plan the resource " +
          "schedule and the order dates and times in detail by taking resource and component availability into " +
          "account'. תחת Key Features נמנים בתקציר: 'Select a period of time for scheduling production', 'Select " +
          "resources that you want to use for production scheduling', 'Define conditions for the resources'. (אומת " +
          "ברשומת fiori:F2176)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Advanced Scheduling Board | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/10b3ef999b2245618091a7c467384129.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE_FI_23,
        claim: "רשומת What's New לגרסת 2022 (loio 10b3ef999b2245618091a7c467384129): 'Advanced Scheduling Board is a new " +
          "application which supports Production Planner in creation and Detailed Scheduling of a feasible " +
          "production plan.'; 'See More App New n/a SCM-APO-PPS'. הרשומה נוקבת בכותרת ולא במזהה. (אומת ברשומת " +
          "fiori:F5460)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Application Programming Interface (BAPI) | Production Planning and Detailed Scheduling (PP/DS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/a6385057cf924c59827936db4affb72a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE_TX_21,
        claim: "עמוד ה-BAPI של PP/DS לגרסת 2023 Latest קובע בסניפט: 'The following Business Application Programming " +
          "Interface (BAPI)s have been enhanced to respect the Scope Limitation and Scope Profile during the " +
          "material master creation: BAPI_MATERIAL_SAVEDATA During material creation, user will be allowed to pass " +
          "Scope Limitation and Scope Profile values to the BAPIs'; בסניפט עצמו שני הצירופים Scope Limitation " +
          "ו-Scope Profile מופיעים במשפט השני בתוך מרכאות בודדות. שאילתה נוספת על אותו loio מחזירה מאותו עמוד גם את " +
          "השם BAPI_MATERIAL_SAVEREPLICA. כלומר המודול קיים ב-S/4HANA והורחב בו לשדות התכנון המתקדם. הסניפט אינו " +
          "מונה את שאר הפרמטרים ואינו קובע סטטוס שחרור. (אומת ברשומת fm:BAPI_MATERIAL_SAVEDATA)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Planning Integration Based on Key Figures | SAP Integrated Business Planning",
        product: "SAP Integrated Business Planning",
        edition: "public-cloud",
        release: "2608",
        url: "https://help.sap.com/docs/SAP_INTEGRATED_BUSINESS_PLANNING/feae3cea3cc549aaa9d9de7d363a83e6/279a3fe0d61e44fda27ae4b3165d11b5.html?locale=en-US&state=PRODUCTION&version=2608",
        accessedAt: DATE,
        claim: "loio 279a3fe0d61e44fda27ae4b3165d11b5 (SAP IBP 2608); גוף העמוד נקרא במלואו ב-2026-09-24: 'You use the " +
          "results of TS supply planning as input constraints for the planning heuristics in PP/DS. The integration " +
          "loosely couples TS supply planning with PP/DS'; 'For a tighter integration, we recommend using " +
          "order-based integration'; 'Per time period (or \"bucket\"), production receipts created in SAP IBP are " +
          "integrated into PP/DS as target supply. Transport receipts ... as stock transfer requisitions, purchase " +
          "requisitions, or subcontracting purchase requisitions'; 'we recommend to integrate purchase requisitions " +
          "for finished goods only'; 'Planned orders and production orders created in PP/DS are aggregated and " +
          "integrated into SAP IBP as confirmed supply ... Resource consumption calculated in PP/DS is also " +
          "integrated back'; תנאים: SAP S/4HANA 2022 or higher (לגרסאות 1909 עד 2022 FPS0 מפנה ל-SAP Note 3246773) " +
          "ו-SAP Cloud Integration for data services (CI-DS) 2111 or higher; זרימה ב-2022: Forecast לפי " +
          "CONSENSUSDEMANDQTY, דרישות העברה/רכש לפי NETNEWREQORDER, target supply לפי PRODUCTION, ו-KF orders לפי " +
          "NETNEWPLANNEDPRODREC; 'manual changes to KF orders have no impact on the planning result'; target supply " +
          "בתוך אופק PP/DS מומר להזמנות מתוכננות 'in a regularly scheduled planning run' בהיוריסטיקה SAP_PP_002; " +
          "זרימה ב-2023 ומעלה: flexible constraints והיוריסטיקה SAP_PP_FLXC; 'In SAP IBP, the PP/DS horizon is " +
          "represented by the freeze horizon. The production plan from PP/DS is considered as fixed and can't be " +
          "changed in SAP IBP'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Integration with SAP S/4HANA Cloud Private Edition or SAP S/4HANA or SAP ERP | Data Integration Using " +
          "SAP Cloud Integration",
        product: "SAP Integrated Business Planning",
        edition: "public-cloud",
        release: "2608",
        url: "https://help.sap.com/docs/SAP_INTEGRATED_BUSINESS_PLANNING/b785818dd21649b69121b8532eb54df8/1eee047de9db490cab837ab90cd22285.html?locale=en-US&state=PRODUCTION&version=2608",
        accessedAt: DATE,
        claim: "loio 1eee047de9db490cab837ab90cd22285 (SAP IBP 2608); גוף העמוד נקרא במלואו ב-2026-09-24: האינטגרציה בין " +
          "SAP IBP ל-SAP S/4HANA Cloud Private Edition, SAP S/4HANA או SAP ERP נעשית ב-SAP Cloud Integration 'with " +
          "the help of the SAP S/4HANA, supply chain integration add-on for SAP Integrated Business Planning or SAP " +
          "ERP, supply chain integration add-on for SAP Integrated Business Planning (integration add-on)'; בחבילה: " +
          "Sales order history (Inbound, 'Integrate Sales Order History Data from Add-on to SAP IBP') ו-Demand " +
          "forecasting results (Outbound, 'Integrate Key Figures from SAP IBP to Add-On as Planned Independent " +
          "Requirements'), לאזורי תכנון מבוססי I_SAPIBP2; Related Information: SAP Note 3655387.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "New Integration Flow to Transfer Demand Data as Planned Independent Requirements Using SAP Cloud " +
          "Integration | What's New in SAP Integrated Business Planning (SAP IBP) 2605",
        product: "SAP Integrated Business Planning",
        edition: "public-cloud",
        release: "2605",
        url: "https://help.sap.com/docs/SAP_INTEGRATED_BUSINESS_PLANNING/a1759a7d2a544eecbfeb4bc6887211c5/9fd702a9992b48999ed841e3dc6c7d8b.html?locale=en-US&state=PRODUCTION&version=2605",
        accessedAt: DATE,
        claim: "loio 9fd702a9992b48999ed841e3dc6c7d8b (SAP IBP 2605, Valid as Of 2026-04-30); גוף העמוד נקרא במלואו " +
          "ב-2026-09-24: ה-iFlow 'collects demand forecasting results from SAP IBP and transfers them at the " +
          "location product level as planned independent requirements' לתוסף האינטגרציה; פונקציה חדשה " +
          "/IBP/ETS_PIR_IN_CI_RFC ו-BAdI /IBP/ETS_PIR_IN עם המתודות CONVERT_LOCID ו-CONVERT_MRP_AREA; ברירת המחדל " +
          "קוראת את key figure I_FINALGLOBALDEMANDPLANQTY (אזור תכנון I_SAPIBP2), ולתהליך S&OP " +
          "I_FINALCONSDEMANDPLANQTY; 'The iFlow supports reading demand and creating planned independent " +
          "requirements at the MRP area level'; כש-Process PIRs פעיל 'If the processing succeeds, the iFlow " +
          "receives a green status'; אחרת 'the data remains in the staging table in the integration add-on'; נדרשת " +
          "גרסה 2.0 SP02 של תוסף האינטגרציה; מזהה שחורג ממגבלת האורך ולא הומר גורם לכך ש-'the iFlow is not " +
          "processed and an error message provides details'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical System Landscape | Integrating SAP IBP Using SAP Cloud Integration for Data Services",
        product: "SAP Integrated Business Planning",
        edition: "public-cloud",
        release: "2608",
        url: "https://help.sap.com/docs/SAP_INTEGRATED_BUSINESS_PLANNING/eab8fd1726934516a89eabced318b210/f621aab28f9044b5b4822482720af1c4.html?locale=en-US&state=PRODUCTION&version=2608",
        accessedAt: DATE,
        claim: "loio f621aab28f9044b5b4822482720af1c4 (SAP IBP 2608); גוף העמוד נקרא במלואו ב-2026-09-24: 'For SAP " +
          "S/4HANA on-premise systems, we recommend to install and configure the SAP S/4HANA, Supply Chain " +
          "Integration Add-On for SAP Integrated Business Planning'; ל-ECC 6.0 (EHP4 ומעלה) התוסף המקביל SAP ERP, " +
          "Supply Chain Integration Add-On; ו-'SAP Cloud Integration for data services is not available with SAP " +
          "Integrated Business Planning (SAP IBP) licenses obtained after April 20, 2026 ... We recommend that you " +
          "use SAP Cloud Integration, which is part of SAP Integration Suite and requires a separate license'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Data Integration Using Core Interface for RTI | Data Integration Scenarios",
        product: "SAP Integrated Business Planning",
        edition: "public-cloud",
        release: "2608",
        url: "https://help.sap.com/docs/SAP_INTEGRATED_BUSINESS_PLANNING/da797ae2bf6246d58abd417f24915d55/4014f934476e4da89f4b1d9aae6744ca.html?locale=en-US&state=PRODUCTION&version=2608",
        accessedAt: DATE,
        claim: "loio 4014f934476e4da89f4b1d9aae6744ca (SAP IBP 2608); גוף העמוד נקרא במלואו ב-2026-09-24: 'Real-time " +
          "integration (RTI) is based on Core Interface (CIF) and is used for data transfer from SAP ECC or SAP " +
          "S/4HANA to planning areas based on the SAP7F and I_SAPIBP2 sample planning areas'; 'To integrate " +
          "planning results back to SAP ECC or SAP S/4 HANA system, you can choose between periodic or real-time " +
          "integration'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות המעבר ECC מול S/4HANA של הפרויקט: pp-ds, mrp-live (ECC_S4)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "pp-ds: ECC: 'PP-DS היה רכיב נפרד ב-SCM/APO (מערכת נפרדת + CIF)'; S/4HANA: 'Embedded PP-DS בתוך S/4HANA, " +
          "ללא מערכת APO נפרדת; תכנון מפורט סדר-עבודה/קיבולת'; השפעה: 'ארגונים עם APO צריכים להחליט על מעבר " +
          "ל-embedded; CIF פנימי'. mrp-live: ECC: MRP קלאסי (MD01/MD02) עם planning file (MDVM); S/4HANA: 'MRP Live " +
          "(MD01N) רץ על HANA'; Fiori: Monitor/Manage Material Coverage.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#pp-ds (+mrp-live)",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות מודיעין הטרנזקציות של הפרויקט: MD61, MD62, MD04, MD01N (TX_INTEL)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MD61: יצירת PIR (טבלאות PBED/PBIM; MD62 ו-MD63 רשומות בה כטרנזקציות דומות), 'תחזית מכירות / S&OP ← MD61 " +
          "← MD04 ← הרצת MRP'; s4: 'קיימות אפליקציות Fiori לניהול PIR ו-aPP/IBP לתכנון ביקוש מתקדם'; users כולל " +
          "'מתכנן ביקוש', 'Demand planner'; commonErrors: requirement type לא תואם planning strategy, consumption " +
          "mode שגוי, version לא אקטיבי. MD62: שינוי PIR (PBED/PBIM). MD04: רשימת מלאי/דרישות דינמית מ-MARC/MARD " +
          "ו-PLAF, נקודת קפיצה ל-CO40/CO48; s4Delta: חלופת Fiori F0247A/F0251. MD01N: MRP Live על HANA, טבלאות " +
          "PLAF/PPH_DBVM/RESB, כותב ל-PLAF/EBAN, 'חלק מחומרים עם פיצ'רים לא נתמכים נופלים ל-classic MRP'; fiori: " +
          "Schedule MRP Runs.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD61; data/tx-intel.ts#MD62; data/tx-intel.ts#MD04; data/tx-intel.ts#MD01N",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות מודיעין הטרנזקציות של הפרויקט: CO40, CO41, MD11, C223, MM02 (TX_INTEL)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CO40: המרת Planned Order יחיד (PLAF) ל-Production Order (AUFK/AFKO/AFPO) לפי Production Version, 'ההזמנה " +
          "המתוכננת נמחקת'; after: CO02, CO11N, CO05N; userExits PPCO0001. CO41: המרה קולקטיבית; commonErrors " +
          "'missing production version'. MD11: יצירת PLAF ידנית; bapis BAPI_PLANNEDORDER_CREATE, " +
          "BAPI_PLANNEDORDER_GET_DETAIL. C223: גרסת ייצור ב-MKAL, קושרת BOM ל-routing/מתכון. MM02: שינוי אב חומר " +
          "(MARA/MARC).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO40; data/tx-intel.ts#CO41; data/tx-intel.ts#MD11; data/tx-intel.ts#C223; " +
          "data/tx-intel.ts#MM02",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות התחום של הפרויקט: pppi-pir, pppi-planning, pppi-planning-strategies (DOMAINS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "pppi-pir: 'PIR הן תחזית הביקוש שמזינה את ה-MRP בתרחישי ייצור-למלאי (MTS)', MD61/MD62 (ברשימת הטרנזקציות " +
          "של הרשומה גם MD63), גרסה 00 פעילה, צריכה מול הזמנות לקוח; טבלאות PBIM/PBED/PBHI. pppi-planning: זרימה " +
          "SOP (MC87) → ניהול ביקוש → PIR (MD61) → העברה ל-MRP; טבלאות PBED/PBIM/MARC/MARA. " +
          "pppi-planning-strategies: Strategy Group ב-MRP3 (MARC), סוגי דרישה LSF/VSF/KSV, תקלה 'כפל ביקוש " +
          "(תחזית+מכירות)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pppi-pir (+pppi-planning, pppi-planning-strategies)",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז ה-MRP ופירוט התחום של הפרויקט: גרסת ייצור (MRP_SECTIONS, DOMAIN_DETAIL)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "'ב-S/4 היא חובה לתרחישי MRP Live ו-PP-DS: בלי גרסה תקפה החומר לא נתכנן/לא ניתן ליצור פקודה. נקבעת " +
          "ב-C223'; eccS4: unchanged 'מודל MKAL זהה', changed 'גרסת ייצור חובה לתרחישי MRP Live/PP-DS', migration " +
          "'ודא גרסה תקפה לכל חומר מיוצר'.",
        verificationLevel: "repository_verified",
        repoRef: "data/mrp-center.ts#prod-version; data/domain-detail.ts#pppi-production-versions",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג יישומי ה-Fiori של הפרויקט: F2176, F5460, F1339, F0247A, F0251, F2336 (FIORI_APPS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "F2176 Production Scheduling Board: role SAP_BR_PRODN_PLNR, catalog SAP_SCM_BC_CAPA_PLAN, odata " +
          "PPDS_RES_SCHEDULE, guiTx /SAPAPO/CDPS0 עד /SAPAPO/CDPS3 ו-/SAPAPO/RPT (לפי ספריית ה-Fiori, S32OP), " +
          "commonErrors 'ודא הפעלת PP/DS ו-liveCache'. F5460 Advanced Scheduling Board: יישום PP/DS " +
          "(SCM-APO-PPS-DS). F1339 Schedule MRP Runs: roles SAP_BR_MATL_PLNR_EXT_PROC, SAP_BR_PRODN_PLNR, 'Backend " +
          "= MRP Live (MD01N)'. F0247A/F0251: MRP Cockpit, guiTx MD04/MD07. F2336 Manage Production Orders.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2176 (+F5460, F1339, F0247A, F0251, F2336)",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת טכנולוגיית האינטגרציה qRFC של הפרויקט (INTEGRATION)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "'qRFC מוסיף תורים מעל tRFC: Outbound (TRFCQOUT, ניטור SMQ1) ו-Inbound (TRFCQIN, ניטור SMQ2)... הבסיס " +
          "ל-CIF (APO)'; ניטור SMQ1, SMQ2, SMQR/SMQS; תקלות: 'תור תקוע (SYSFAIL/CPICERR) חוסם את כל היושבים אחריו', " +
          "'Scheduler לא רשום (SMQR/SMQS)', 'סדר נשבר אם מוחקים entry באמצע'.",
        verificationLevel: "repository_verified",
        repoRef: "data/integration.ts#qrfc",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: planned-order-not-convertible, planned-order-not-convert, mrp-no-planned-orders, " +
          "no-production-version, qrfc-smq1-outbound-blocked, smq1-outbound-stuck",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "planned-order-not-convertible: המרה ב-CO40/CO41 נכשלת; rootCauses כולל 'אין Production Version תקפה' " +
          "ו-'Conversion indicator לא מוגדר'; ניתוח ב-CO40/CO41/MD04/C223/COR4. planned-order-not-convert: אין גרסת " +
          "ייצור, חומר חסום; טבלאות PLAF/MKAL; exit PPCO0001. mrp-no-planned-orders: planning file לא מסמן את " +
          "החומר, MRP Type ND, 'אין דרישה (PIR/הזמנה)'; exits M61X0001, MD_PLDORD_POST. no-production-version: 'אין " +
          "גרסת ייצור תקפה', 'MRP Live נכשל לחומר'; טבלאות MKAL, MAST, PLKO; ניתוח ב-C223. " +
          "qrfc-smq1-outbound-blocked: head LUW נכשל ובגלל EOIO כל הבאים תקועים; תיקון 'מחק head LUW רעיל רק לאחר " +
          "אימות'. smq1-outbound-stuck: SYSFAIL/CPICERR, בדיקת SM59, 'הפעל מחדש את התור (לא למחוק)', 'ודא scheduler " +
          "(SMQR/SMQS)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#no-production-version; " +
          "data/troubleshooting-ext.ts#planned-order-not-convertible; " +
          "data/troubleshooting-ext2.ts#planned-order-not-convert; data/troubleshooting.ts#mrp-no-planned-orders; " +
          "data/troubleshooting-ext.ts#qrfc-smq1-outbound-blocked; data/troubleshooting-ext2.ts#smq1-outbound-stuck",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי תצוגות ה-CDS של הפרויקט: I_MRPMaterial, I_ProductionVersion, I_ProductionOrder, I_WorkCenter, " +
          "I_ProductPlant (CDS_MAP)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "I_MRPMaterial: נתוני MRP לחומר/אזור (MARC, MDMA), consumption C_MaterialCoverageNetwork; " +
          "I_ProductionVersion: גרסת ייצור (MKAL); I_ProductionOrder: כותרת פקודת ייצור (AFKO, AUFK); I_WorkCenter: " +
          "מרכז עבודה/משאב (CRHD, CRTX, CRCA, KAKO); I_ProductPlant: אב חומר ברמת מפעל (MARC).",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MRPMaterial (+I_ProductionVersion, I_ProductionOrder, I_WorkCenter, I_ProductPlant)",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 4 בספריית הפרויקט (SAP PRESS, PP/DS with SAP S/4HANA), פרק 2 'Master Data', סעיפים 2.1 'Integration " +
          "Models', 2.1.1 'Create the Integration Model', 2.1.2 'Activate the Integration Model', 2.3.1 'Activation " +
          "of Advanced Planning for Materials'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרות הסעיפים עוסקות במודלי האינטגרציה (יצירה והפעלה) ובהפעלת Advanced Planning לחומרים; הפניית קריאה " +
          "בלבד (הקובץ מכיל כותרות בלבד).",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book4.json#2.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 4 בספריית הפרויקט (SAP PRESS, PP/DS with SAP S/4HANA), פרק 4 'Data Transfer for Transaction Data', " +
          "סעיפים 4.2 'Planned Independent Requirements', 4.3 'Planned Orders', 4.4 'Production Orders', 4.12 " +
          "'Initial Transfer and Retransfer of Transaction Data to PP/DS'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרות הסעיפים עוסקות בהעברת נתוני התנועה (PIR, הזמנות מתוכננות, פקודות ייצור) ובהעברה הראשונית וההעברה " +
          "החוזרת ל-PP/DS; הפניית קריאה בלבד (הקובץ מכיל כותרות בלבד).",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book4.json#4.3",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 4 בספריית הפרויקט (SAP PRESS, PP/DS with SAP S/4HANA), פרק 5 'Production Planning', סעיפים 5.6.4 " +
          "'Planning PP/DS Materials in MRP Live (One MRP Run)' ו-5.9 'Planning in PP/DS with SAP Integrated " +
          "Business Planning for Supply Chain'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרות הסעיפים עוסקות בתכנון חומרי PP/DS בריצת MRP Live אחת ובתכנון ב-PP/DS עם SAP IBP for Supply Chain; " +
          "הפניית קריאה בלבד (הקובץ מכיל כותרות בלבד).",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book4.json#5.9",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 4 בספריית הפרויקט (SAP PRESS, PP/DS with SAP S/4HANA), פרק 10 'Administering PP/DS with SAP " +
          "S/4HANA', סעיפים 10.1 'Core Interface Queue Monitoring', 10.2 'Core Interface Postprocessing', 10.3 " +
          "'Core Interface Comparison and Reconciliation'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרות הסעיפים עוסקות בניטור תורי CIF, בעיבוד מאוחר (Postprocessing) ובהשוואה ותיאום בין S/4HANA " +
          "ל-PP/DS; הפניית קריאה בלבד (הקובץ מכיל כותרות בלבד).",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book4.json#10.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 4 בספריית הפרויקט (SAP PRESS, PP/DS with SAP S/4HANA), פרק 11 'Migration to Embedded PP/DS', סעיפים " +
          "11.1 'New Implementation', 11.2 'System Conversion', 11.3 'Landscape Transformation'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרות הסעיפים בלבד; הפניית קריאה ואינן מקור לטענה או לשם SAP.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book4.json#11.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 10 בספריית הפרויקט (SAP PRESS, Sales and Operations Planning with SAP IBP), פרק 6 'Consolidation', " +
          "סעיפים 6.3 'Operationalizing the Plan' ו-6.3.1 'Plan Integration Overview'",
        product: "SAP Integrated Business Planning",
        edition: "public-cloud",
        accessedAt: DATE,
        claim: "כותרות הסעיפים עוסקות בהפיכת התוכנית לתפעולית (Operationalizing the Plan) ובסקירת שילוב התוכניות (Plan " +
          "Integration Overview); הפניית קריאה בלבד (הקובץ מכיל כותרות בלבד).",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book10.json#6.3.1",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "רשומת תהליך. הזרימה נגזרת מעמודי help.sap.com של PP/DS ושל SAP IBP שנקראו במלואם ב-2026-09-24 דרך " +
      "scripts/sap-help-body.mjs (למעט 'Deleting Master Data', שנשען על סניפט בלבד; גוף העמוד 'Production " +
      "Planning and Detailed Scheduling (PP/DS) | LO' נקרא בשלב הכתיבה, 2026-09-24), מפריטי הפישוט 9.5.1 " +
      "ו-9.5.2 בטקסט המחולץ של רשימת הפישוט 2025 FPS01, ומרשומות המאגר הנקובות. חיפושים שרצו " +
      "(scripts/sap-help-search.mjs, SAP_S4HANA_ON-PREMISE אלא אם צוין): 'Production Planning and Detailed " +
      "Scheduling PP/DS integration', 'Advanced Planning material master PP/DS', 'SAP Integrated Business " +
      "Planning integration planned independent requirements', 'integration model CFM1 PP/DS', 'SAP Integrated " +
      "Business Planning integration SAP S/4HANA supply chain', 'Integrating PP/DS', 'Conversion of planned " +
      "orders PP/DS production orders', 'demand-driven replenishment IBP integration S/4HANA', 'external " +
      "planning system SAP IBP planned orders S/4HANA', 'CFM1 create integration model', 'CFM2 activate " +
      "integration model', '/SAPAPO/RRP3 product view', ושלוש שאילתות ב-SAP_INTEGRATED_BUSINESS_PLANNING " +
      "('Production Planning Integration Based on Key Figures', 'integration SAP S/4HANA planned independent " +
      "requirements', 'SAP Cloud Integration for data services SAP S/4HANA'). שמות שאינם במילון הפרויקט ונשארו " +
      "בפרוזה בלי xref: CFM1, CFM2 (מקור רשמי בהקשר aATP, לא PP/DS), /SAPAPO/CDPSB0, /SAPAPO/RRP3, " +
      "/SAPAPO/CDPS0, /SAPAPO/PPT1, /SAPAPO/RPT, /SAPAPO/RRPCUST1, /SAPAPO/PPDS_DELTA_ORD_TRANS, " +
      "/SAPAPO/CSP_CORRECT_FCST, טבלאות PLAF, PBIM, PBED ו-/SAPAPO/PUB_CHK, ה-BAdIs /SAPAPO/PPDS_ORDER_INT, " +
      "/SAPAPO/BADI_FC_CSP_CLNDR, /IBP/ETS_PIR_IN, והמודול /IBP/ETS_PIR_IN_CI_RFC. יישומי Fiori של PP/DS שאינם " +
      "בקטלוג הפרויקט (Manage Flexible Constraints for PP/DS, Monitor Requirements) לא נרשמו כ-xref. תיעוד IBP " +
      "הוא מוצר ענן ציבורי (edition public-cloud, גרסאות 2605/2608) ומתאר את צד ה-IBP; צד ה-S/4HANA מתועד " +
      "On-Premise 2023.latest/2025.001. kpis הושמט: אף מקור שנקרא אינו מגדיר מדד לתהליך. תפקידי IBP עסקיים לא " +
      "תועדו. Scope Item לא אותר (עמוד 'Best Practice - Demand Planning (7JF)' נמצא אך שייך ל-Service Parts " +
      "Planning, SCM-APO-SPP, ולכן לא נרשם). שילוב IBP מבוסס הזמנות (OBP/RTI) מוזכר ברמת עמוד 'Data Integration " +
      "Using Core Interface for RTI' בלבד; העמודים 'Production Planning Integration Based on Orders' לא נקראו. " +
      "לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ================================================ breakdown maintenance */
  {
    slug: "breakdown-maintenance-process",
    he: "תחזוקת שבר (תיקון תקלה) מקצה לקצה",
    en: "Breakdown (corrective) maintenance end to end",
    module: "PM",
    summary: "תחזוקת שבר מטפלת בתקלה בלתי מתוכננת באובייקט טכני: הודעת תקלה (M2) עם נתוני השבתה, פקודת תחזוקה עם " +
      "פעולות ורכיבים, שחרור, ביצוע ואישור, סגירה טכנית (TECO), התחשבנות וסגירה עסקית. ב-S/4HANA התיעוד הרשמי " +
      "מבחין בין סוג הפקודה Corrective Maintenance, שמעובד ללא מודל שלבים, לבין Reactive Maintenance, שמעובד לפי " +
      "מודל השלבים.",
    context: "צד המאגר: מדריך התהליך pm-corrective ורשומות התחום pm-breakdown מתארים את המחזור IW21, IW31, IW32, " +
      "IW41, TECO, KO88 וניתוח MTTR/MTBF, כשהסימון Breakdown וזמני Malfunction Start/End בהודעה (QMIH, שאינה " +
      "במילון הפרויקט) מזינים את מדדי הזמינות. צד S/4HANA, לפי עמוד 'Maintenance Order Types' (2025 FPS01): סוג " +
      "הפקודה קובע את התהליך העסקי ואינו ניתן לשינוי בדיעבד; Corrective Maintenance נועד לתכנון תיקון 'due to a " +
      "malfunction or breakdown', ומתנהל בתכנון, שחרור, ביצוע, סגירה טכנית וסגירה עסקית; תהליכים על פריטי ההיקף " +
      "BH1, BH2 ו-BJ2 משתמשים בסוגי פקודה ללא שלבים, ותהליכים על 4HH ו-4HI בסוגים לפי מודל השלבים. צד ECC, לפי " +
      "עמודי SAP ERP 6.0 EHP8: TECO מנקה הזמנות חומר קיימות ומסמן דרישות רכש למחיקה, וסגירה עסקית דורשת יתרה אפס. " +
      "הרשומה הזו מקשרת לשיטות העבודה של ההודעה, הפקודה, האישור וההתחשבנות ואינה חוזרת על פרטיהן.",
    steps: [
      {
        he: "לדווח על התקלה: הודעת תקלה מסוג M2 (Malfunction Report לפי התצורה הסטנדרטית בתיעוד 2025 FPS01) עם " +
          "אובייקט ייחוס, תיאור, קוד פגם, סימון Breakdown ו-Malfunction Start. ב-GUI (ECC ו-S/4HANA): IW21. " +
          "ב-S/4HANA גם Create Maintenance Request (F1511A), Request Maintenance (F1511, יישום נפרד לפי עמוד " +
          "ההשוואה הרשמי) או האריח Report Malfunction ביישום Report and Repair Malfunction (F2023). פרטי ההודעה: " +
          "bp:maintenance-notification-process.",
        xrefs: [
          "tx:IW21", "table:QMEL", "table:QMFE", "obj:maintenance-notification", "fiori:F1511A", "fiori:F1511",
          "fiori:F2023", "bp:maintenance-notification-process",
        ],
      },
      {
        he: "לסנן ולתעדף: רשימת ההודעות IW28 לבחירה ועיבוד המוני של הודעות פתוחות (data/transactions.ts#IW28); " +
          "לפי רשומת התחום pm-breakdown עדיפות גבוהה מובילה לזמני יעד קצרים. בעיבוד לפי שלבים ב-S/4HANA הסינון " +
          "והקבלה עוברים לשלב Screening (עמוד Reactive Maintenance), וההודעה המאושרת מועברת לתכנון.",
        xrefs: ["tx:IW28", "table:QMEL"],
      },
      {
        he: "לפתוח פקודת תחזוקה מתוך ההודעה (IW31, או Create Direct מתוך ההודעה): לפי עמוד 'Creating an Order " +
          "Directly from a Notification' מספר ההודעה נרשם ברשימת האובייקטים של הפקודה וההודעה מקבלת את הסטטוסים " +
          "Order assigned ו-Notification in process. סוג הפקודה: לפי התיעוד הרשמי הוא קובע את התהליך ואינו ניתן " +
          "לשינוי בדיעבד; המאגר אינו אחיד לגבי סוג ברירת המחדל לתיקון (ראו חריגים). ב-S/4HANA: Manage Maintenance " +
          "Orders (F5241) מ-2023 FPS03; Manage Maintenance Notifications and Orders (F4604) אינו מציג הודעות " +
          "ופקודות שמודל השלבים לא הופעל עבורן (עמוד היישום).",
        xrefs: [
          "tx:IW31", "table:AUFK", "table:AFIH", "obj:maintenance-order", "fiori:F5241", "fiori:F4604",
          "bp:maintenance-order-process",
        ],
      },
      {
        he: "לתכנן פעולות ורכיבים (IW32): מרכז עבודה ופעולות (AFVC), רכיבי מלאי כהזמנת חומר (RESB) ורכיבים שאינם " +
          "במלאי כדרישת רכש (EBAN). כלל ההתחשבנות: לפי עמוד 'Settle the Maintenance Order' ה-Customizing קובע אם " +
          "הוא נדרש בשחרור או רק בהשלמה, וניתן להגדיר יצירה אוטומטית שלו.",
        xrefs: [
          "tx:IW32", "table:AFVC", "table:RESB", "table:EBAN", "table:CRHD", "table:COBRB", "obj:work-center",
          "obj:reservation",
        ],
      },
      {
        he: "לשחרר (REL): לפי עמוד 'Maintenance Order System Statuses' השחרור יוצר אוטומטית דרישות רכש לחומרים " +
          "שאינם במלאי, לשירותים ולפעולות חיצוניות, ומאפשר קבלת טובין ואישורי זמן. לפי מרכז התקלות השחרור נחסם " +
          "בהיתר פתוח (effective at release), בכשל בדיקת זמינות, בסטטוס משתמש, בהרשאה או בחריגת תקציב (BP603).",
        xrefs: ["tx:IW32", "table:JEST", "enh:exit:IWO10009", "enh:badi:WORKORDER_UPDATE"],
      },
      {
        he: "לבצע ולאשר: IW41 לאישור פרטני או IW42 לאישור כולל (שעות, חומרים, מדידות, נתוני הודעה), סימון Final " +
          "בפעולה האחרונה, ובהודעה Malfunction End. האישור נכתב ל-AFRU. ב-S/4HANA: Perform Maintenance Jobs " +
          "(F5104A) לטכנאי, והאריח Repair Malfunctions - My Job List ב-F2023; Confirm Jobs (W0020) נמחק ב-S/4HANA " +
          "2023. פרטי האישור: bp:confirmation-process.",
        xrefs: [
          "tx:IW41", "tx:IW42", "table:AFRU", "fm:BAPI_ALM_CONF_CREATE", "fiori:F5104A", "fiori:F2023",
          "fiori:W0020", "enh:exit:CONFPM01", "bp:confirmation-process",
        ],
      },
      {
        he: "לסגור טכנית (TECO) ב-IW32 או גורפת ב-IW38. צד S/4HANA (2025 FPS01): אחרי TECO עדיין אפשר להתחשבן " +
          "ולקבל טובין. צד ECC (6.0 EHP8): הזמנות החומר הקיימות מנוקות, דרישות הרכש מסומנות למחיקה, כלל התחשבנות " +
          "חסר נוצר אוטומטית, וההודעות מושלמות אלא אם משימה פתוחה או סטטוס משתמש מונעים זאת. המאגר חלוק לגבי " +
          "הזמנות חומר פתוחות ואישורים פתוחים כחוסמי TECO (ראו חריגים).",
        xrefs: ["tx:IW32", "tx:IW38", "table:JEST", "table:RESB", "table:EBAN"],
      },
      {
        he: "להתחשבן: KO88 לפקודה בודדת (tx-intel#KO88, domains#pm-settlement), והעלות עוברת ליעד שבכלל ההתחשבנות " +
          "(מרכז עלות, נכס או הזמנה). ב-S/4HANA הרישום מגיע ל-Universal Journal (ACDOCA) לפי רשומות המאגר. להרצה " +
          "מרוכזת רשומות המאגר אינן אחידות (KO8G מול CO88, ראו חריגים). פרטי ההתחשבנות: " +
          "bp:order-settlement-process.",
        xrefs: [
          "tx:KO88", "tx:KO8G", "table:COBRB", "table:COBRA", "fm:K_ORDER_SETTLEMENT", "bp:order-settlement-process",
        ],
      },
      {
        he: "לסגור עסקית (CLSD): לפי עמוד ECC 'Business Completion of an Order' התנאים הם TECO, התחשבנות ביתרה " +
          "אפס והיעדר הזמנות רכש פתוחות; לפי עמוד הסטטוסים של 2025 FPS01 אחרי CLSD הפקודה אינה מקבלת רישומים, " +
          "כולל עלויות. בעיבוד לפי שלבים זהו שלב Completion, שבו מתכנן התחזוקה או הבקר הפיננסי בודקים פקודות " +
          "שנסגרו טכנית ולא התחשבנו.",
        xrefs: ["tx:IW32", "table:JEST", "table:AUFK"],
      },
      {
        he: "לנתח: זמני Malfunction Start/End וסימון Breakdown מזינים MTTR ו-MTBF (domains#pm-breakdown); MCI7 " +
          "במערכת המידע PMIS. ב-S/4HANA פריט הפישוט 'S4TWL - LIS in EAM' מתאר אנליטיקה עתידית על תצוגות CDS לצד " +
          "ה-LIS הקלאסי; במאגר רשומות התצוגות I_MaintenanceOrder ו-I_MaintenanceNotification.",
        xrefs: ["tx:MCI7", "cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification"],
      },
      {
        he: "בעיבוד תוכניתי: רצף BAPI_ALM_ORDER_MAINTAIN (HEADER/OPERATION/COMPONENT, RELEASE), " +
          "BAPI_ALM_CONF_CREATE, BAPI_ALM_ORDER_MAINTAIN (TECHNICALCOMPLETE) ו-BAPI_TRANSACTION_COMMIT " +
          "(bapi-enrichment.pm.ts), עם בדיקת RETURN אחרי כל קריאה (bp:bapi-commit-discipline).",
        xrefs: [
          "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_TRANSACTION_COMMIT",
          "bp:bapi-commit-discipline",
        ],
      },
    ],
    antiPatterns: [
      "הודעת תקלה בלי סימון Breakdown ובלי Malfunction Start/End: זמני ההשבתה ומדדי MTTR/MTBF יוצאים שגויים " +
        "(תקרית downtime-not-recorded, מדריך pm-corrective).",
      "בחירת סוג פקודה שגוי: לפי עמוד 'Maintenance Order Types' סוג הפקודה קובע את התהליך העסקי ואינו ניתן לשינוי " +
        "בדיעבד, ובמערכת עם מודל שלבים פקודה ללא שלבים אינה מוצגת ב-F4604.",
      "שחרור בלי לבדוק היתרים, זמינות רכיבים ותקציב: השחרור נחסם (תקריות order-wont-release, " +
        "permit-blocks-order-release, maint-order-budget).",
      "אישור חלקי בלי סימון Final בפעולה האחרונה: הפקודה נשארת ב-PCNF ואינה עוברת ל-CNF (תקרית " +
        "pm-confirmation-final-flag).",
      "מרכז עבודה בלי סוג פעילות או תעריף: אישור השעות אינו יוצר עלות (תקרית pm-cost-no-activity-type).",
      "הנחה ש-TECO חוסמת אישורים נוספים: לפי עמוד ה-ECC הרשמי עדיין אפשר לאשר אחרי TECO, ולמניעה נדרש סטטוס משתמש " +
        "שאינו מתיר אישורים.",
    ],
    checks: [
      "חיובי: הודעת M2 עם Breakdown ו-Malfunction Start/End, פקודה עם פעולה ורכיב מלאי, שחרור, אישור סופי, TECO " +
        "והתחשבנות ב-KO88 מעבירים את העלות למרכז העלות ומשאירים יתרה אפס.",
      "שלילי: היתר הרלוונטי לשחרור שלא ניתן חוסם את השחרור ב-IW32 (תקרית permit-blocks-order-release).",
      "אינטגרציה: רכיב שאינו במלאי מייצר דרישת רכש בשחרור (עמוד 'Maintenance Order System Statuses'); פקודה " +
        "שנוצרה ב-Create Direct מופיעה בשדה Order בכותרת ההודעה.",
      "סגירה: לבדוק במערכת היעד מה קורה להזמנות חומר פתוחות ב-TECO (ECC 6.0 EHP8 מתעד ניקוי; המאגר חלוק), ולוודא " +
        "ש-CLSD נדחית כשהיתרה אינה אפס.",
      "רגרסיה אחרי המרה ל-S/4HANA: מחזור מלא, רישום ההתחשבנות ב-ACDOCA וחישוב זמני השבתה ו-MTTR/MTBF (מדריך " +
        "pm-corrective, domain-detail#pm-breakdown).",
    ],
    process: {
      purpose: "להחזיר אובייקט טכני לפעולה אחרי תקלה בלתי מתוכננת בתהליך מתועד: דיווח התקלה וזמני ההשבתה, תכנון " +
        "וביצוע התיקון בפקודת תחזוקה, רישום העלות בפועל והעברתה ליעד, ושמירת היסטוריה למדדי MTTR/MTBF ולהחלטות " +
        "תחזוקה מונעת (domain-detail#pm-breakdown; עמוד 'Maintenance Order Types').",
      trigger: [
        {
          he: "תקלה או השבתה של ציוד בשטח, המדווחת כהודעת תקלה M2 עם סימון Breakdown.",
          xrefs: ["tx:IW21", "obj:maintenance-notification"],
        },
        {
          he: "ב-S/4HANA לפי מודל השלבים: בקשת תחזוקה (Initiation) שנבדקה ואושרה (Screening) לפני תכנון הפקודה " +
            "(עמוד Reactive Maintenance).",
          xrefs: ["fiori:F1511A"],
        },
      ],
      preconditions: [
        {
          he: "אובייקט הייחוס קיים ואינו חסום; ממנו נגזרים מיקום ומרכז עלות.",
          xrefs: ["table:EQUI", "table:IFLOT", "obj:equipment", "obj:functional-location"],
        },
        {
          he: "סוג הודעה M2, קודי פגם וסיבה, ועדיפויות וזמני יעד מוגדרים (domain-detail#pm-breakdown).",
        },
        {
          he: "סוג פקודה מתאים לתהליך (עם שלבים או בלי) והגדרות כלל ההתחשבנות בסוג הפקודה (עמודי Maintenance " +
            "Order Types ו-Settle the Maintenance Order).",
        },
        {
          he: "מרכז עבודה עם שיוך מרכז עלות וסוג פעילות ותעריף מתוכנן (תקרית pm-cost-no-activity-type).",
          xrefs: ["table:CRHD", "table:CRCO"],
        },
        {
          he: "תקופות הרישום של MM ושל FI/CO פתוחות לתאריך האישור וההתחשבנות (תקריות confirm-period-closed, " +
            "settlement-error).",
          xrefs: ["tx:OB52"],
        },
      ],
      masterData: [
        {
          he: "ציוד או מיקום פונקציונלי כאובייקט ייחוס.",
          xrefs: ["table:EQUI", "table:IFLOT", "table:ILOA"],
        },
        {
          he: "סוג הודעה, קודי פגם וסיבה, עדיפויות וזמני יעד (domain-detail#pm-breakdown).",
        },
        {
          he: "סוג פקודה, מרכז עבודה, פרופיל התחשבנות וכלל התחשבנות (domain-detail#pm-maintenance-orders, " +
            "#pm-settlement).",
          xrefs: ["table:CRHD", "table:COBRA", "table:COBRB"],
        },
        {
          he: "חומרים לרכיבים: מלאי כהזמנת חומר, שאינם במלאי כדרישת רכש.",
          xrefs: ["table:RESB", "table:EBAN"],
        },
      ],
      roles: [
        {
          he: "טכנאי תחזוקה (SAP_BR_MAINTENANCE_TECHNICIAN): התפקיד שספריית ה-Fiori מדפיסה ל-Report and Repair " +
            "Malfunction (F2023) ולתפקיד המוביל של Perform Maintenance Jobs (F5104A); גם אחד מתפקידי Create " +
            "Maintenance Request (F1511A).",
          xrefs: ["fiori:F2023", "fiori:F5104A", "fiori:F1511A"],
        },
        {
          he: "מתכנן תחזוקה (SAP_BR_MAINTENANCE_PLANNER): התפקיד המוביל של Manage Maintenance Orders (F5241) " +
            "והתפקיד של Manage Maintenance Notifications and Orders (F4604) בספריית ה-Fiori (S32OP).",
          xrefs: ["fiori:F5241", "fiori:F4604"],
        },
        {
          he: "מפקח תחזוקה (SAP_BR_MAINT_SUPERVISOR): תפקיד נוסף שהספרייה מדפיסה ל-F5104A ול-F1511A; עובד " +
            "(SAP_BR_EMPLOYEE): תפקיד שהספרייה מדפיסה ל-F1511A.",
          xrefs: ["fiori:F5104A", "fiori:F1511A"],
        },
        {
          he: "בקר פיננסי: בעיבוד לפי שלבים, בשלב Completion יחד עם מתכנן התחזוקה (עמוד Reactive Maintenance); " +
            "במאגר המשתמשים של KO88 הם בקר עלויות וחשב (tx-intel#KO88).",
          xrefs: ["tx:KO88"],
        },
      ],
      transactions: [
        {
          he: "הודעה: IW21 יצירה, IW28 רשימת הודעות לעיבוד המוני (ECC ו-S/4HANA).",
          xrefs: ["tx:IW21", "tx:IW28"],
        },
        {
          he: "פקודה: IW31 יצירה, IW32 שינוי, שחרור ו-TECO, IW38 רשימת הזמנות לעיבוד גורף.",
          xrefs: ["tx:IW31", "tx:IW32", "tx:IW38"],
        },
        {
          he: "אישור: IW41 פרטני, IW42 כולל.",
          xrefs: ["tx:IW41", "tx:IW42"],
        },
        {
          he: "התחשבנות וניתוח: KO88 בודדת; KO8G קולקטיבית לפי tx-intel#KO88 (K_ORDER_SETTLEMENT מונה אותה " +
            "כטרנזקציה קשורה); MCI7 ב-PMIS.",
          xrefs: ["tx:KO88", "tx:KO8G", "tx:MCI7"],
        },
        {
          he: "Fiori ב-S/4HANA: Create Maintenance Request (F1511A), Request Maintenance (F1511), Report and " +
            "Repair Malfunction (F2023), Manage Maintenance Orders (F5241), Manage Maintenance Notifications and " +
            "Orders (F4604, להודעות ופקודות לפי שלבים), Perform Maintenance Jobs (F5104A). Confirm Jobs (W0020) " +
            "נמחק ב-2023.",
          xrefs: [
            "fiori:F1511A", "fiori:F1511", "fiori:F2023", "fiori:F5241", "fiori:F4604", "fiori:F5104A",
            "fiori:W0020",
          ],
        },
      ],
      tables: [
        {
          he: "הודעה: QMEL כותרת, QMFE פריטים, QMUR סיבות; QMIH נתוני התקלה וההשבתה (אינה במילון הפרויקט).",
          xrefs: ["table:QMEL", "table:QMFE", "table:QMUR"],
        },
        {
          he: "פקודה: AUFK כותרת, AFIH הרחבת התחזוקה, AFKO ו-AFVC פעולות, RESB הזמנות חומר, EBAN דרישות רכש.",
          xrefs: ["table:AUFK", "table:AFIH", "table:AFKO", "table:AFVC", "table:RESB", "table:EBAN"],
        },
        {
          he: "אישור וסטטוס: AFRU אישורים, JEST סטטוסים (REL, CNF, TECO, CLSD).",
          xrefs: ["table:AFRU", "table:JEST"],
        },
        {
          he: "התחשבנות: COBRA ו-COBRB כלל ההתחשבנות; ב-S/4HANA שורות היומן ב-ACDOCA לפי tx-intel#KO88.",
          xrefs: ["table:COBRA", "table:COBRB"],
        },
        {
          he: "אובייקטים ותצוגות CDS: הודעה ופקודת תחזוקה, הזמנת חומר, מרכז עבודה; I_MaintenanceNotification, " +
            "I_MaintenanceOrder.",
          xrefs: [
            "obj:maintenance-notification", "obj:maintenance-order", "obj:reservation", "obj:work-center",
            "cds:I_MaintenanceNotification", "cds:I_MaintenanceOrder",
          ],
        },
      ],
      integrationPoints: [
        {
          he: "PM-MM: רכיבי מלאי כהזמנת חומר ומשיכה, רכיבים שאינם במלאי כדרישת רכש שנוצרת בשחרור (עמוד הסטטוסים " +
            "2025 FPS01).",
          xrefs: ["table:RESB", "table:EBAN", "obj:reservation"],
        },
        {
          he: "PM-CO: עלות שעות לפי סוג הפעילות של מרכז העבודה, והתחשבנות ליעד; ב-S/4HANA ל-Universal Journal.",
          xrefs: ["table:CRCO", "tx:KO88", "bp:order-settlement-process"],
        },
        {
          he: "הודעה ופקודה: Create Direct מקשר ביניהן, וב-ECC סגירה טכנית משלימה את ההודעות של הפקודה.",
          xrefs: ["obj:maintenance-notification", "obj:maintenance-order"],
        },
        {
          he: "תחזוקה מונעת: מדדי האמינות מהשבר מזינים החלטות תחזוקה מונעת (domain-detail#pm-breakdown).",
          xrefs: ["bp:preventive-maintenance-process"],
        },
        {
          he: "הרחבות: QQMA0001 ו-NOTIF_EVENT_SAVE בהודעה, IWO10009 ו-WORKORDER_UPDATE בפקודה, CONFPM01 באישור.",
          xrefs: [
            "enh:exit:QQMA0001", "enh:badi:NOTIF_EVENT_SAVE", "enh:exit:IWO10009", "enh:badi:WORKORDER_UPDATE",
            "enh:exit:CONFPM01",
          ],
        },
      ],
      interfaces: [
        {
          he: "BAPI: BAPI_ALM_NOTIF_CREATE להודעה, BAPI_ALM_ORDER_MAINTAIN לפקודה (כולל RELEASE " +
            "ו-TECHNICALCOMPLETE), BAPI_ALM_CONF_CREATE לאישור, BAPI_TRANSACTION_COMMIT.",
          xrefs: [
            "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_CONF_CREATE",
            "fm:BAPI_TRANSACTION_COMMIT",
          ],
        },
        {
          he: "התחשבנות: K_ORDER_SETTLEMENT (function-intel).",
          xrefs: ["fm:K_ORDER_SETTLEMENT"],
        },
        {
          he: "OData ב-S/4HANA: API_MAINTENANCEORDER לקריאת פקודה (What's New 2021) ו-API_MAINTORDERCONFIRMATION " +
            "ליצירת אישור פעולה (APIs for Maintenance Management 2025 FPS01).",
        },
      ],
      outputs: [
        {
          he: "הודעת תקלה עם פריטים, קודי פגם וסיבה וזמני השבתה.",
          xrefs: ["table:QMEL", "table:QMFE"],
        },
        {
          he: "פקודת תחזוקה עם פעולות, הזמנות חומר ודרישות רכש.",
          xrefs: ["table:AUFK", "table:RESB", "table:EBAN"],
        },
        {
          he: "אישורים ומסמכי חומר של משיכת הרכיבים: ב-ECC MKPF/MSEG, ב-S/4HANA MATDOC לפי tx-intel#IW42.",
          xrefs: ["table:AFRU", "table:MKPF", "table:MSEG"],
        },
        {
          he: "עלות בפועל על הפקודה והתחשבנות ליעד; ב-S/4HANA שורות ב-ACDOCA.",
          xrefs: ["table:COBRB"],
        },
        {
          he: "היסטוריית תקלות למדדי אמינות.",
        },
      ],
      exceptions: [
        {
          he: "שחרור נחסם: היתר, זמינות רכיב, סטטוס משתמש, הרשאה או תקציב (order-wont-release, " +
            "permit-blocks-order-release, maint-order-budget).",
          xrefs: ["tx:IW32", "enh:exit:IWO10009"],
        },
        {
          he: "אישור נכשל: תקופה סגורה (confirm-period-closed); שעות בלי עלות (pm-cost-no-activity-type); פקודה " +
            "ב-PCNF בלי Final (pm-confirmation-final-flag).",
          xrefs: ["tx:IW41", "table:AFRU", "enh:exit:CONFPM01"],
        },
        {
          he: "מחלוקת TECO: teco-blocked מונה אישורים פתוחים ו'רזרבציות/תנועות פתוחות' כחוסמים, ו-tx-intel#IW32 " +
            "מונה 'confirmations/PR פתוחים'; מדריך pm-corrective כותב ש-TECO סוגרת רזרבציות פתוחות; עמוד ה-ECC " +
            "הרשמי מתעד ניקוי הזמנות חומר, סימון דרישות רכש למחיקה ואישורים אפשריים אחרי TECO; עמוד S/4HANA 2025 " +
            "FPS01 אינו מזכיר הזמנות חומר. להכרעה: בדיקה במערכת היעד.",
          xrefs: ["tx:IW32", "table:RESB", "table:EBAN", "table:AFRU"],
        },
        {
          he: "התחשבנות נכשלת: כלל חסר, תקופה סגורה, סטטוס CLSD/LKD או יעד לא תקף (settlement-error).",
          xrefs: ["tx:KO88", "table:COBRB"],
        },
        {
          he: "מחלוקת הרצה מרוכזת: domains#pm-settlement כותבת CO88 מרוכזת לפקודות תחזוקה, בעוד " +
            "tcode-catalog#CO88 ו-tx-intel#CO88 מתארים אותה להזמנות ייצור ותהליך, ו-tx-intel#KO88 " +
            "ו-K_ORDER_SETTLEMENT נוקבים ב-KO8G.",
          xrefs: ["tx:CO88", "tx:KO8G"],
        },
        {
          he: "זמני השבתה חסרים: Malfunction Start/End או סימון Breakdown לא מולאו (downtime-not-recorded).",
          xrefs: ["tx:MCI7"],
        },
        {
          he: "מחלוקת סוג הפקודה: pm-maintenance-orders ו-pm-corrective משייכים PM01 לתיקון, " +
            "ו-maintenance-order-process מונה PM02 כתקלה; שם סוג הפקודה ב-Customizing נקבע בפרויקט.",
        },
      ],
      controls: [
        {
          he: "Malfunction Start/End וסימון Breakdown חובה בהודעת תקלה (downtime-not-recorded, pm-corrective).",
        },
        {
          he: "סימון Final בפעולה האחרונה לפני TECO (pm-confirmation-final-flag).",
          xrefs: ["table:AFRU"],
        },
        {
          he: "סטטוס משתמש שאינו מתיר אישורים, כשצריך למנוע אישור אחרי TECO (עמוד ECC 'Technical Completion of an " +
            "Order').",
        },
        {
          he: "CLSD כשהיתרה אפס ואין הזמנות רכש פתוחות (עמוד ECC 'Business Completion of an Order').",
          xrefs: ["table:JEST"],
        },
        {
          he: "בכל רצף BAPI: בדיקת RETURN ו-COMMIT מפורש.",
          xrefs: ["bp:bapi-commit-discipline"],
        },
      ],
      kpis: [
        {
          he: "MTTR (זמן תיקון ממוצע) ו-MTBF (זמן בין תקלות), הנגזרים מ-Malfunction Start/End ומסימון Breakdown " +
            "(domains#pm-breakdown).",
          xrefs: ["tx:MCI7"],
        },
      ],
      eccToS4: [
        {
          he: "מודל הנתונים נשמר: AUFK/AFIH/AFVC ו-QMEL/QMIH ללא שינוי (tx-intel#IW31, tx-intel#IW21, " +
            "domain-detail#pm-breakdown).",
          xrefs: ["table:AUFK", "table:AFIH", "table:AFVC", "table:QMEL"],
        },
        {
          he: "S/4HANA: שני מסלולים לפי סוג הפקודה, ללא שלבים (BH1, BH2, BJ2) או לפי מודל השלבים (4HH, 4HI), לפי " +
            "עמוד 'Maintenance Order Types' של 2025 FPS01. F4604 נוסף ב-2021 עם 4HH ו-4HI ואינו מציג פקודות ללא " +
            "שלבים.",
          xrefs: ["fiori:F4604"],
        },
        {
          he: "S/4HANA: עלויות האישור וההתחשבנות ב-Universal Journal (ACDOCA); COSP/COSS תצוגות תאימות לפי 'S4TWL " +
            "- DATA MODEL CHANGES IN FIN' כפי ש-tx-intel#KO88 מצטט.",
          xrefs: ["tx:KO88", "table:COSP", "table:COSS"],
        },
        {
          he: "S/4HANA: מסמכי החומר של משיכת הרכיבים ב-MATDOC לפי 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT " +
            "(MM-IM)' כפי ש-tx-intel#IW42 מצטט.",
          xrefs: ["tx:IW42"],
        },
        {
          he: "S/4HANA: Confirm Jobs (W0020) נמחק ב-2023 עם היורשים F5104A ו-F2023; Manage Maintenance Orders " +
            "(F5241) נוסף ב-2023 FPS03.",
          xrefs: ["fiori:W0020", "fiori:F5104A", "fiori:F2023", "fiori:F5241"],
        },
        {
          he: "S/4HANA: 'S4TWL - LIS in EAM' מתאר את PMIS כחלק מה-LIS ואנליטיקה עתידית על CDS; tx-intel#MCI7 מסמן " +
            "את PMIS כ-compatibility scope.",
          xrefs: ["tx:MCI7", "cds:I_MaintenanceOrder"],
        },
      ],
      migration: [
        {
          he: "QMIH/QMEL ו-AUFK/AFIH/AFVC נשמרים; QA למחזור מלא, להתחשבנות ב-ACDOCA ולמדדי MTTR/MTBF " +
            "(domain-detail#pm-breakdown, #pm-maintenance-orders, pm-corrective).",
          xrefs: ["table:QMEL", "table:AUFK"],
        },
        {
          he: "לפי 'S4TWL - Changes In List Reports For Order and Notification': להריץ QM_PHASE_FILL " +
            "ו-RIAFVC_IPHAS_FILL לפני ההסבה, כתנאי לדוחות הרשימה של הזמנות והודעות.",
        },
      ],
      reference: {
        title: "Maintenance Order Types | Maintenance Management (SAP S/4HANA On-Premise 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5fbd47786341411992fc9915284da2b2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד התיעוד שמתאר את סוג הפקודה Corrective Maintenance (תכנון, שחרור, ביצוע, סגירה טכנית וסגירה " +
          "עסקית) ואת מודל השלבים; הוא מקשר סוגי פקודה ללא שלבים לפריטי ההיקף BH1, BH2 ו-BJ2, וסוגים לפי שלבים " +
          "ל-4HH ו-4HI. פריט היקף יחיד לתהליך הרשומה אינו נקבע כאן.",
      },
    },
    xrefs: [
      "obj:maintenance-notification", "obj:maintenance-order", "obj:reservation", "obj:work-center", "obj:equipment",
      "table:QMEL", "table:QMFE", "table:AUFK", "table:AFIH", "table:AFVC", "table:RESB", "table:EBAN", "table:AFRU",
      "table:JEST", "table:COBRB", "tx:IW21", "tx:IW28", "tx:IW31", "tx:IW32", "tx:IW38", "tx:IW41", "tx:IW42",
      "tx:KO88", "tx:KO8G", "tx:MCI7", "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_ORDER_MAINTAIN",
      "fm:BAPI_ALM_CONF_CREATE", "fm:K_ORDER_SETTLEMENT", "fiori:F1511A", "fiori:F1511", "fiori:F2023",
      "fiori:F5241", "fiori:F4604", "fiori:F5104A", "fiori:W0020", "cds:I_MaintenanceOrder",
      "cds:I_MaintenanceNotification", "enh:exit:IWO10009", "enh:exit:CONFPM01", "enh:exit:QQMA0001",
      "enh:badi:WORKORDER_UPDATE", "bp:maintenance-notification-process", "bp:maintenance-order-process",
      "bp:confirmation-process", "bp:order-settlement-process", "bp:preventive-maintenance-process",
      "bp:bapi-commit-discipline",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Types | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5fbd47786341411992fc9915284da2b2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 5fbd47786341411992fc9915284da2b2, versionId 2025.001, נקרא דרך " +
          "scripts/sap-help-body.mjs): 'The order type represents a specific business process', ולכן 'you cannot " +
          "change the order type of the maintenance order retrospectively'. תחת Prerequisites: תהליכים המבוססים " +
          "על פריטי ההיקף 4HH (Reactive Maintenance) או 4HI (Proactive Maintenance) משתמשים בסוגי פקודה המעובדים " +
          "לפי מודל השלבים; תהליכים המבוססים על BH1 (Corrective Maintenance), BH2 (Emergency Maintenance) ו-BJ2 " +
          "(Preventive Maintenance) משתמשים בסוגי פקודה שאינם לפי מודל השלבים. תחת Order Processing Without " +
          "Phases מתואר סוג הפקודה Corrective Maintenance: 'allows you to plan repair tasks when maintenance is " +
          "requested, for example due to a malfunction or breakdown'; המתכנן יוצר פקודה לתכנון הפעילויות " +
          "והמשאבים, 'Once you have completed the planning, you can release the order for execution', הטכנאי מבצע " +
          "ומדווח התקדמות, 'you complete the order technically', ו-'When no further costs are expected to be " +
          "posted to the order, you perform the business completion of the order'. סוג הפקודה Unplanned " +
          "Maintenance מתואר כך: 'The system automatically creates an emergency order and confirms it'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reactive Maintenance | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6bc4695243244942a63563ed3e26db3c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 6bc4695243244942a63563ed3e26db3c, versionId 2025.001, נקרא דרך " +
          "scripts/sap-help-body.mjs): בפקודות מסוג Reactive Maintenance התהליך בנוי מתשעה שלבים: Initiation, " +
          "Screening, Planning ('This order inherits the data of the accepted maintenance request'), Approval " +
          "(תהליך workflow גמיש), Preparation, Scheduling, Execution ('the maintenance technician executes the " +
          "preliminary and main maintenance tasks, captures time and material consumption'), Post Execution " +
          "ו-Completion, שבו 'the maintenance planner or financial controller reviews maintenance orders that " +
          "have already been technically completed but not yet financially settled' ומעביר אותן ל-Complete " +
          "(Business).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order System Statuses | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/fffdec9b483b4f7f8347e797a6641acd.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio fffdec9b483b4f7f8347e797a6641acd, versionId 2025.001, נקרא דרך " +
          "scripts/sap-help-body.mjs), לכל סוגי הפקודה: Release משנה את הסטטוס ל-REL, ו-'When a maintenance order " +
          "is released, purchase requisitions are automatically generated for non-stock materials, lean services " +
          "or external operations. Moreover, goods receipts and time confirmations can be posted for order " +
          "operations of a released maintenance order'. Complete (Technically) משנה ל-TECO, ו-'after you have " +
          "changed the order system status to TECO (Technically Completed), order settlement can still be carried " +
          "out and goods receipt can still be posted'. Complete (Business) משנה ל-CLSD, ו-'it can no longer " +
          "receive any postings, including postings of costs and is locked for all processing changes'. Work " +
          "Completed ‏(WOCO) רלוונטי לפקודות עם Work Clearance Management ומהווה תנאי ל-TECO בפקודות אלה. העמוד " +
          "אינו מזכיר הזמנות חומר (reservations).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Settle the Maintenance Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b1cc9b3e5fbe43a7b01d212586f805c9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio b1cc9b3e5fbe43a7b01d212586f805c9, versionId 2025.001, נקרא דרך " +
          "scripts/sap-help-body.mjs): 'You use a settlement rule to define how the costs incurred by the " +
          "execution of maintenance work are cleared'; ב-Customizing 'You also decide whether the settlement rule " +
          "has to be entered when the order is released or not until the order is completed'. כלל ברירת מחדל נוצר " +
          "בלחיצה על Create Default Settlement Rule, עם כלל חלוקה מסוג Full settlement (FUL), או FUL ו-periodic " +
          "settlement (PER) כשפרופיל ההתחשבנות מתיר שניים או יותר; ניתן להגדיר יצירה אוטומטית של הכלל בשחרור או " +
          "בהשלמה. העמוד מתאר את ה-SAP Web UI לפקודת התחזוקה ואינו נוקב בטרנזקציית התחשבנות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating an Order Directly from a Notification | Notifications (CS-CM-SN/PM-WOC-MN)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7f05ca069f8744759f48892c6d307fab/6185c1536ca9b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 6185c1536ca9b54ce10000000a174cb4, versionId 2025.001, נקרא דרך " +
          "scripts/sap-help-body.mjs): מתוך ההודעה בוחרים Notification, Order, Create Direct; 'The notification " +
          "number is entered automatically in the object list for the order'; 'The notification is assigned the " +
          "statuses Order assigned and Notification in process. The number of the assigned order appears in the " +
          "field Order in the notification header'; ו-'As soon as the notification and order have been assigned " +
          "to one another, you can process the order from the notification and vice versa'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Changing the Notification Type | Notifications (CS-CM-SN/PM-WOC-MN)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7f05ca069f8744759f48892c6d307fab/b0e2855487f92257e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio b0e2855487f92257e10000000a44176d, versionId 2025.001, נקרא דרך " +
          "scripts/sap-help-body.mjs) מונה בתצורת SAP הסטנדרטית, בקטגוריית ההודעה Maint. Notification: " +
          "'Maintenance Requests (M1) Malfunction Reports (M2) Activity Reports (M3)'. שינוי סוג הודעה אפשרי " +
          "ב-iw21 וב-iw22 (ובהודעות שירות iw51, iw52) רק כל עוד ההודעה טרם הושלמה, ובתנאי שהפונקציה העסקית " +
          "Enterprise Asset Management Part 7 (LOG_EAM_CI_7) הופעלה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Completion of an Order | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/b4174aff4a234ed5be928a10c60997fb/bac9b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "צד ECC (SAP ERP 6.0 EHP8, loio bac9b65334e6b54ce10000000a174cb4, נקרא דרך " +
          "scripts/sap-help-body.mjs): 'You usually complete an order technically once the maintenance work " +
          "planned in the order has been performed'. אחרי TECO: 'You can still enter confirmations for a " +
          "technically completed order. In order to prevent this, you must create a user status that does not " +
          "permit confirmations'; 'the order can still receive costs, for example, through incoming invoices'; " +
          "'If no settlement rule has yet been maintained for the order, the system creates one automatically'; " +
          "'All the existing purchase requisitions for the order are flagged for deletion. All the existing " +
          "reservations for the order are cleared'; וכל ההודעות של הפקודה מושלמות, אלא אם סימון Complete " +
          "notifications לא נבחר, משימה לא הושלמה או סטטוס משתמש בהודעה מונע זאת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Completion of an Order | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/b4174aff4a234ed5be928a10c60997fb/c3c9b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "צד ECC (SAP ERP 6.0 EHP8, loio c3c9b65334e6b54ce10000000a174cb4, נקרא דרך " +
          "scripts/sap-help-body.mjs): סגירה עסקית אפשרית כשהפקודה נסגרה טכנית, 'It has been settled and the " +
          "order balance is 0', ו-'No outstanding purchase orders (commitments) exist for it'; אחריה 'The order " +
          "cannot receive any more postings, even for posting of costs'. אם היתרה אינה אפס או שקיימות הזמנות רכש " +
          "פתוחות, המערכת מוציאה הודעת שגיאה ומשאירה את הפקודה בסטטוס Technically completed.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 4.1.13 S4TWL - LIS in EAM (PM-IS), p. 86",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "פריט 4.1.13 'S4TWL - LIS in EAM' (רכיב PM-IS; הטקסט המחולץ " +
          "ב-scratchpad/official/SIMPL_OP2025.pdf.txt נקרא): 'The plant maintenance information system is part of " +
          "the logistics information system LIS', שמעריך ציוד, מיקומים פונקציונליים, הודעות והזמנות; ה-LIS " +
          "'operates on redundant data' ועל נתונים מצטברים מראש. 'Future plant maintenance analytics will be " +
          "based on HANA, CDS views aggregating transactional data dynamically'; ניתן להפעיל את ה-LIS הקלאסי ואת " +
          "האנליטיקה החדשה במקביל כל עוד עדכון טבלאות ה-LIS לא כובה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · " +
          "item 4.1.7 S4TWL - Changes In List Reports For Order and Notification (PM-WOC-MO), p. 80",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE,
        claim: "פריט 4.1.7 (רכיב PM-WOC-MO; הטקסט המחולץ נקרא): 'Prerequisite for executing the list reports for " +
          "orders and notifications in SAP S/4HANA are the performance improvements described in notes 393393 and " +
          "551133'; תחת Required and Recommended Action(s): להריץ את הדוחות 'QM_PHASE_FILL' ו-'RIAFVC_IPHAS_FILL' " +
          "לפני ההסבה ל-S/4HANA; 'No influence on business processes expected'. הפריט נוקב ב-IW37 וב-IW49 (הפסקה " +
          "מתוכננת לטובת IW37n ו-IW49n) ואינו נוקב ב-IW28 או ב-IW38.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison - Request Maintenance and Create Maintenance Request | Maintenance " +
          "Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5d2fbff31efc440b8200fbad95a68dfe.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim: "עמוד ההשוואה הרשמי (Maintenance Management, ‏2025 FPS01) מציב זו לצד זו שתי אפליקציות נפרדות " +
          "לבקשת תחזוקה: 'Request Maintenance' עם המזהה F1511 ו-'Create Maintenance Request' עם המזהה F1511A, " +
          "כלשון הסניפט: 'Compared Features Request Maintenance Create Maintenance Request F1511 F1511A'. הסניפט " +
          "מעיד שהטבלה משווה יכולות בין שתי האפליקציות (הפריט הראשון: זמינות טיוטות של בקשות תחזוקה, עם הערכים No " +
          "/ Yes ללא שיוך ודאי לעמודות); ערכי ההשוואה עצמם לא נקראו מגוף הדף. (אומת ברשומת fiori:F1511)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Maintenance Request | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78732361f0b94fe1b1711632af4362b3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FI_23,
        claim: "עמוד היישום ב-Maintenance Management לגרסת 2025 FPS01 (loio 78732361f0b94fe1b1711632af4362b3): " +
          "'In the Create Maintenance Request app (F1511A) and the Screen Maintenance Requests app (F4072), when " +
          "you remove a technical object or change the notification type'; 'Create Maintenance Request With this " +
          "app, you can create maintenance requests.'; 'The My Drafts button allows you to view all your drafts " +
          "in the My Maintenance Requests app.' (אומת ברשומת fiori:F1511A)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Library: F1511A Create Maintenance Request @ S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1511A')/S32OP",
        accessedAt: DATE,
        claim: "רשומת הספרייה ל-F1511A בגרסת S32OP (S/4HANA 2025 FPS01), סטטוס Published, קומפוננטה PM-FIO-WOC-MN " +
          "(Fiori UI for PM Maintenance Notifications): 'Create Maintenance Request', Transactional / SAP Fiori " +
          "(SAPUI5). תפקידים עסקיים: SAP_BR_EMPLOYEE (R0056), SAP_BR_MAINTENANCE_PLANNER (R0088), " +
          "SAP_BR_MAINTENANCE_TECHNICIAN (R0090), SAP_BR_MAINT_SUPERVISOR (R0198), SAP_BR_MD_SPECIALIST_EAM " +
          "(R0097-180). קטלוגים עסקיים: SAP_EAM_BC_MREQ_MNG 'EAM - Maintenance Request', SAP_EAM_BC_TO_MNG 'EAM - " +
          "Technical Objects Management'; קטלוג טכני SAP_TC_EAM_COMMON. Intent: MaintenanceWorkRequest-create. " +
          "שירות OData: UI_MAINTWORKREQUESTOVW_V2 גרסה 0001 (S4CORE 109); קבוצת V4: UI_PRIORITIZATION_PROFILE " +
          "(S4CORE 109). טרנזקציית GUI מובילה: IW21. קודמת (predecessor): F1511 Request Maintenance; אין " +
          "successor רשום. Backend: S4CORE 109 SP0001 / SAP S/4HANA 2025; UI: UIS4H 109 SP0001. רשימת ה-releases " +
          "מתחילה ב-S21OP=2021 וכוללת גם S36=2602 ו-S37=2608. הערות RIN: 3493254 (Front-End Server), 3671888 " +
          "(Back-End Server). (אומת ברשומת fiori:F1511A)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Report and Repair Malfunction | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/13b3075824570746e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim: "מדריך Maintenance Management ל-S/4HANA On-Premise 2025 FPS01 מתעד את היישום: 'You can use this " +
          "app to easily report that a technical object has a malfunction, plan the required repair work, as well " +
          "as document and confirm the maintenance work'; 'This app is available for the Maintenance Technician " +
          "role'; ותחת Key Features: 'Three tiles are provided for this app: The Report Malfunction tile for " +
          "creating malfunction reports, the Manage Malfunction Reports tile that provides a list of malfunction " +
          "reports that have already been created, and the Repair Malfunctions - My Job List tile that provides a " +
          "list of all work items assigned to you or to your team'. (אומת ברשומת fiori:F2023)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Report and Repair Malfunction (F2023), S/4HANA 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2023')/S32OP",
        accessedAt: DATE,
        claim: "רשומת הספרייה ל-F2023 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, " +
          "לא ה-JS shell): AppName 'Report and Repair Malfunction', Published, ApplicationType Transactional, " +
          "UITechnology 'SAP Fiori (SAPUI5)', ApplicationComponent PM-FIO-WOC-JC (Fiori UI for PM Completion " +
          "Confirmations). תפקיד עסקי SAP_BR_MAINTENANCE_TECHNICIAN (R0090, Maintenance Technician). קטלוג עסקי " +
          "SAP_EAM_BC_CORRMAINT_MW (EAM - Corrective Maintenance); קטלוג טכני SAP_TC_EAM_COMMON. Semantic " +
          "Object/Action MaintenanceJob-reportMalfunction. שירות OData EAM_MALFUNCTION_MANAGE גרסה 0001 (S4CORE " +
          "109). טרנזקציית GUI מובילה IW31, קשורות IW21/IW22/IW32/IW41. Backend S4CORE 109 SP0001 / S/4HANA 2025; " +
          "UI UIS4H 109 SP0001. NumberofPredecessors=0, NumberofSuccessors=0. הודעות RIN: 3493254 (Front-End " +
          "Server), 3671888 (Back-End Server). AppDocumentationLink מפנה לנושא 13b3075824570746e10000000a441470, " +
          "הנושא של רשומת ה-sap_help Report and Repair Malfunction | Maintenance Management (F2023_APP_TOPIC) " +
          "לעיל. בהרצה נפרדת על S27OP (2023, " +
          "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2023')/S27OP) " +
          "חוזרים אותו תפקיד, אותם קטלוגים ואותן טרנזקציות GUI; ApplicationComponent שם הוא PM-FIO (Fiori User " +
          "Interface (UI) for PM); OData על S4CORE 108, UI UIS4HOP1 900; הודעות RIN 3336823 (Front-End)/3351047 " +
          "(Back-End). שתי הריצות מציגות NumberofPredecessors=0, NumberofSuccessors=0. (אומת ברשומת fiori:F2023)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Notifications and Orders | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/d8a94ddd0c514780a9836aa04524f96f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim: "עמוד האפליקציה בתיעוד Maintenance Management לגרסת 2025 FPS01 קובע: 'With this app, you can " +
          "manage maintenance notifications and maintenance orders that are processed by phases', וכן " +
          "'Maintenance notifications and orders for which the phase model has not been activated are not " +
          "available in this app'. סוגי מכשירים נתמכים לפי הסניפט: Desktop, Tablet, Smartphone. (אומת ברשומת " +
          "fiori:F4604)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Notifications and Orders | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/e5b77db1b0194806b3431e1739eebc96.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE_TX_02,
        claim: "ב-What's New in SAP S/4HANA 2021 האפליקציה מופיעה עם 'Technical Details Type New', ‏Scope Item " +
          "‏4HH (Reactive Maintenance) ו-4HI (Proactive Maintenance), רכיב יישום PM (Plant Maintenance), ובעמודת " +
          "Version: 'SAP S/4HANA 2021'. תחת Effects on Customizing: 'To be able to use this app, you need to set " +
          "up your system for the phase-based maintenance process.' (אומת ברשומת fiori:F4604)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reactive Maintenance: Creating an Order with Reference | What's New in SAP S/4HANA and SAP " +
          "S/4HANA Cloud Private Edition 2023 FPS02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/8f958dbed1454edc9d3437f8c40ce3a0.html?locale=en-US&state=PRODUCTION&version=2023.002",
        accessedAt: DATE_TX_02,
        claim: "הסניפט קושר את השם למזהה: 'create reactive maintenance orders in the Manage Maintenance " +
          "Notifications and Orders (F4604) app and use an existing order as a reference or template', ובפרטים " +
          "הטכניים: 'Technical Object Name App ID: F4604', ‏'Application Component PM-WOC-MO', ‏Scope Item 4HH " +
          "(Reactive Maintenance). (אומת ברשומת fiori:F4604)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Manage Maintenance Notifications and Orders (F4604), " +
          "S/4HANA 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4604')/S32OP",
        accessedAt: DATE,
        claim: "רשומת הספרייה ל-F4604 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData של הספרייה " +
          "(scripts/fal-app.mjs, לא מעטפת ה-JavaScript): AppName 'Manage Maintenance Notifications and Orders', " +
          "isPublished Published, ApplicationType Transactional, UITechnology 'SAP Fiori (SAPUI5)', " +
          "ApplicationComponent PM-FIO (Fiori User Interface (UI) for PM). תפקיד עסקי SAP_BR_MAINTENANCE_PLANNER " +
          "(R0088, Maintenance Planner). קטלוג עסקי SAP_EAM_BC_MNTWRK_MNG ('EAM - Maintenance Work Management'); " +
          "קטלוג טכני SAP_TC_EAM_COMMON. Semantic Object/Action: MaintenanceOrder-plan. שירות ה-OData הראשי " +
          "(PrimaryODataServiceName) הוא UI_MAINTWRKREQ_ORD_MANAGE גרסה 0001; הספרייה מדפיסה ארבעה שירותים: " +
          "EAM_OBJPG_MAINTENANCEORDER_SRV, EAM_OBJPG_MAINTNOTIFICATION_SRV, UI_MAINTWORKREQUESTOVW_V2 " +
          "ו-UI_MAINTWRKREQ_ORD_MANAGE (כולם 0001, S4CORE 109). טרנזקציות GUI: leading '-', related '-'. " +
          "predecessors '-', successors '-' (NumberofPredecessors=0, NumberofSuccessors=0). הודעות RIN: 3493254 " +
          "(Front-End Server), 3671888 (Back-End Server). Backend S4CORE 109 SP 0001 (SAP S/4HANA 2025); UI UIS4H " +
          "109 SP 0001. (אומת ברשומת fiori:F4604)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Orders | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/55828a51fe634affb76fe4283f71c1d9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_FI_23,
        claim: "עמוד היישום ב-Maintenance Management לגרסת 2025 FPS01 (loio 55828a51fe634affb76fe4283f71c1d9): " +
          "'Manage Maintenance Orders App ID: F5241 This app offers both a comprehensive list view of maintenance " +
          "orders and the possibility to process individual maintenance orders.' ובקטע נפרד: 'This includes the " +
          "possibility to manage the assignment of the selected orders to a maintenance event or a revision.' " +
          "(אומת ברשומת fiori:F5241)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Maintenance Orders (F5241), SAP Fiori Apps Reference Library, S32OP (S/4HANA 2025 " +
          "FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5241')/S32OP",
        accessedAt: DATE,
        claim: "node scripts/fal-app.mjs F5241 --out /tmp/fal-src (ערוץ ה-OData הרשמי, לא JS shell) מול S32OP " +
          "(S/4HANA 2025 FPS01) החזיר רשומה Published יחידה: ApplicationType 'Transactional', UITechnology 'SAP " +
          "Fiori elements', ApplicationComponent 'PM-FIO-WOC-MO'; BusinessRoleName 'SAP_BR_MAINTENANCE_PLANNER' " +
          "(RoleID R0088, isLeading X); BusinessCatalogName 'SAP_EAM_BC_WORKORD_MNG' (EAM - Work Order " +
          "Management); TechnicalCatalogName 'SAP_TC_EAM_COMMON'; SemanticObject 'MaintenanceOrder', " +
          "SemanticAction 'manageWorkOrder'; RequiredODataServiceGroups: serviceGroupName " +
          "'UI_MAINTENANCEORDER_MANAGE' (SoftwareComponentVersion S4CORE 109); fuzzy.LeadingTransactionCodes " +
          "'IW31', fuzzy.TransactionCodes 'IW32, IW33, IW37N, IW38, IW39'; RetrofittedSWCBackend 'S4CORE 109 - SP " +
          "0001' על ProductVersionOfficialNameBackend 'SAP S/4HANA 2025'; All_Rel מדפיס Published על S30OP/S30PCE " +
          "(2023 FPS03), S31OP/S31PCE (2025), S32OP/S32PCE (2025 FPS01); PredecessorDetails מונה F2175 'Find " +
          "Maintenance Order' (מזהה זה אינו קיים במאגר data/fiori/apps.ts ולכן אינו מקבל xref); Successors ריק; " +
          "Notes: RIN 3493254 (Front-End Server) ו-3671888 (Back-End Server); Related_Apps מונה W0017 'Process " +
          "Maintenance Order' כ-Required (אף הוא לא קיים במאגר). על S27OP (S/4HANA 2023) הבקשה החזירה 'not in " +
          "this release (empty Results)'; זה עקבי עם appFirstRelease S30OP (2023 FPS03) שהספרייה מדפיסה. (אומת " +
          "ברשומת fiori:F5241)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Perform Maintenance Jobs - SAP Fiori Apps Reference Library (F5104A, S32OP, fal-app.mjs)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5104A')/S32OP",
        accessedAt: DATE,
        claim: "רשומת ה-xsodata המובנית של ספריית ה-Fiori Apps (נקראה בפועל דרך scripts/fal-app.mjs, לא מעטפת " +
          "JavaScript) עבור F5104A ב-S32OP (ReleaseName 'S/4HANA 2025 FPS01', isPublished 'Published'): " +
          "ApplicationType 'Transactional', UITechnology 'SAP Fiori (SAPUI5)', ApplicationComponent " +
          "'PM-FIO-WOC-JC' ('Fiori UI for PM Completion Confirmations'). SplitBusinessRole: BusinessRoleName " +
          "מוביל 'SAP_BR_MAINTENANCE_TECHNICIAN' (RoleID R0090, isLeading='X'), נוסף 'SAP_BR_MAINT_SUPERVISOR' " +
          "(R0198). SplitBusinessCatalog: BusinessCatalogName 'SAP_EAM_BC_MNTJOB_MNG' ('EAM - Maintenance Job " +
          "Lists'). SplitTechnicalCatalogs: TechincalCatalog 'SAP_TC_EAM_COMMON'. SemanticObject/Action " +
          "(SplitAdditionalIntents): 'MaintenanceJob'/'performJob'. RequiredODataServices: " +
          "'API_MAINTNOTIFICATION' 0001, 'API_MAINTORDERCONFIRMATION' 0001, 'UI_MAINTENANCEJOB_MANAGE' 0001 (כולם " +
          "SoftwareComponentName 'S4CORE 109'). fuzzy.LeadingTransactionCodes 'IW41'; fuzzy.TransactionCodes " +
          "(related) 'IW21, IW22, IW23, IW32'. RetrofittedSWCBackend 'S4CORE 109 - SP 0001' על " +
          "ProductVersionOfficialNameBackend 'SAP S/4HANA 2025'; RetrofittedSWCUI 'UIS4H 109 - SP 0001'. " +
          "PredecessorDetails: 'W0016' 'Display Job List' (מ-releaseId S26OP), 'W0020' 'Confirm Jobs' " +
          "(מ-releaseId S25OP); NumberofSuccessors=0 (Successors=[]). Notes (RIN): '3493254' (Front-End Server), " +
          "'3671888' (Back-End Server). AppDocumentationLink מפנה לאותו topic id " +
          "(3da57072a73444f18b5ad8785bc2900e) כמו ראיית ה-sap_help הראשונה ברשומת האימות fiori:F5104A. " +
          "Related_Apps: 'F1511A' 'Create Maintenance Request' (relationType 'Navigation Target'). (אומת ברשומת " +
          "fiori:F5104A)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE_FI_23,
        claim: "רשומת What's New לגרסת SAP S/4HANA 2023 (loio 22fd7c9f368f454fad5b3acfa5a26b6d): 'The Confirm " +
          "Jobs app (W0020) has been deleted and is no longer available on the SAP Fiori launchpad.'; 'You can " +
          "use the following successor apps which are available on the SAP Fiori launchpad to review, execute, " +
          "and report the findings for the jobs dispatched for execution: Perform Maintenance Jobs (F5104A'; " +
          "'Report and Repair Malfunction (F2023).'; בשורת הסיכום: 'See More App Deleted BH1 BJ2 PM SAP S/4HANA " +
          "2023'. (אומת ברשומת fiori:W0020)",
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
        claim: "ב-S/4HANA On-Premise 2025 FPS01 מתועדת פעולת יצירה של אישור פעולה בודד בפקודת תחזוקה דרך שירות " +
          "ה-OData: 'Create a single order operation confirmation ... POST: " +
          "<host>/sap/opu/odata/sap/API_MAINTORDERCONFIRMATION/MaintOrderConfirmation' (כלשון הסניפט). ערוץ " +
          "היצירה של אישורי תחזוקת מפעל ב-API הרשמי מתועד אפוא גם בגרסה העדכנית; ה-BAPI עצמו אינו מוזכר ברשומה. " +
          "(אומת ברשומת fm:BAPI_ALM_CONF_CREATE)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order - Read | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/be4e2d6267d844a89f99119c1d5215ef.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE_TX_02,
        claim: "‏API_MAINTENANCEORDER ‏(Maintenance Order - Read) הוא שירות OData נכנס סינכרוני לקריאת נתוני " +
          "כותרת, פעולות, רכיבים ורשימת אובייקטים של פקודת תחזוקה. (אומת ברשומת fm:BAPI_ALM_ORDER_MAINTAIN)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך התהליך של הפרויקט (PROCESS_GUIDES): Corrective Maintenance (Breakdown→Settlement)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "זרימה: תקלה, הודעה, פקודה, תכנון ושחרור, ביצוע ואישור, TECO, התחשבנות, ניתוח. שלבים: הודעת תקלה " +
          "M2 עם אובייקט ייחוס, Malfunction Start וקוד פגם ב-IW21 (QMEL, QMIH, QMFE); המרה לפקודה מסוג PM01 עם " +
          "פעולות ורכיבים ב-IW31 (AUFK, AFIH, AFVC, RESB); שחרור ב-IW32 שמפעיל בדיקת זמינות והיתרים; אישור שעות, " +
          "צריכת חומרים ו-Malfunction End ב-IW41 (AFRU, MSEG); סגירה טכנית ב-IW32, שלפי הרשומה סוגרת רזרבציות " +
          "פתוחות, והטעות השכיחה בה 'אישורים פתוחים מונעים TECO'; התחשבנות למרכז עלות ב-KO88 אחרי TECO (COBRB, " +
          "COEP). Exits ו-BAdIs: IWO10009, CONFPM01, WORKORDER_UPDATE, QQMA0001. ECC מול S/4HANA: המחזור זהה; UX " +
          "ל-Fiori, עלויות ל-ACDOCA, מדדי אמינות ב-Embedded Analytics; הגירה: QA למחזור המלא, להתחשבנות ולמדדי " +
          "MTTR/MTBF.",
        verificationLevel: "repository_verified",
        repoRef: "data/process-guides.ts#pm-corrective",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום של הפרויקט (DOMAINS): pm-breakdown",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תחזוקת שבר מטפלת בתקלות בלתי מתוכננות: הודעת תקלה עם סימון Breakdown, פקודה דחופה (IW31), תיקון " +
          "ואישור, ניתוח MTTR/MTBF. טבלאות QMEL, QMIH, AUFK, AFIH; טרנזקציות IW21, IW31, IW41, IW28, MCI7; " +
          "BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_ORDER_MAINTAIN. סימון Breakdown ב-QMIH מזין מדדי זמינות, Malfunction " +
          "Start/End קובעים זמן השבתה, 'MTTR (זמן תיקון ממוצע), MTBF (זמן בין תקלות)', עדיפות גבוהה מובילה לזמני " +
          "יעד קצרים. תקלות: זמני השבתה לא מחושבים, MTBF שגוי.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-breakdown",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום של הפרויקט (DOMAIN_DETAIL): pm-breakdown",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מטרה: תגובה מהירה לתקלות בלתי מתוכננות ותיעוד זמני השבתה שמזינים MTTR/MTBF להחלטות תחזוקה מונעת. " +
          "נתוני אב: סוג הודעה M2 (תקלה), עדיפויות וזמני יעד, קודי פגם וסיבה. פונקציות: BAPI_ALM_NOTIF_CREATE, " +
          "BAPI_ALM_ORDER_MAINTAIN, PRIORITY_DETERMINE; Exits‏ QQMA0001, IWO10009; BAdIs‏ NOTIF_EVENT_SAVE, " +
          "WORKORDER_UPDATE. QA: הודעת Breakdown עם Malfunction Start/End מופיעה ב-PMIS; בלי Malfunction End זמן " +
          "ההשבתה נשאר פתוח. הגירה: QMIH/QMEL נשמרים, לבדוק זמני השבתה ומדדי אמינות אחרי ההמרה. ECC מול S/4HANA: " +
          "מודל ההודעה זהה; מדדי אמינות ב-Embedded Analytics/Fiori KPI.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-breakdown",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום של הפרויקט (DOMAINS): pm-maintenance-orders",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "טבלאות AUFK, AFIH, AFKO, AFVC, RESB; טרנזקציות IW31, IW32, IW33, IW38, IW39; " +
          "BAPI_ALM_ORDER_MAINTAIN; סוגי פקודה 'PM01 תיקון, PM02 מונע, PM03 השקעה'; העלויות מתגלגלות לפקודה " +
          "ומותחשבנות למרכז עלות או לנכס; תקלה: לא ניתן לסגור (CLSD) בלי התחשבנות (KO88) וסגירת הזמנות פתוחות.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-maintenance-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום של הפרויקט (DOMAIN_DETAIL): pm-maintenance-orders",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מחזור: יצירה, שחרור, ביצוע ואישור, TECO, התחשבנות (KO88), סגירה עסקית. נתוני אב: סוג פקודה " +
          "(PM01/PM02), מרכז עבודה, אובייקט ייחוס, כלל התחשבנות, פרופיל היתרים; Exits‏ IWO10009, IWO10012; BAdI‏ " +
          "WORKORDER_UPDATE; QA: היתר פתוח חוסם שחרור, רכיב שאינו במלאי מייצר דרישת רכש (PR), התחשבנות מעבירה " +
          "עלות למרכז העלות; תקרית: TECO נכשל בגלל אישורים פתוחים; הגירה: AUFK/AFIH/AFVC נשמרים, QA ליצירה, " +
          "שחרור, אישור והתחשבנות (ל-ACDOCA).",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-maintenance-orders",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת שיטת העבודה של הפרויקט: maintenance-order-process",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הרשומה מתעדת את מחזור פקודת התחזוקה (יצירה, תכנון, שחרור, אישור, TECO, התחשבנות) וקובעת בנתוני " +
          "האב שסוגי הפקודה מותאמי לקוח, ושברירת המחדל שרשומת נתוני האב של המאגר מונה היא 'PM01 מתוכנן או מונע, " +
          "PM02 תקלה, PM03 שיפוץ או השקעה'.",
        verificationLevel: "repository_verified",
        repoRef: "data/best-practices/pm-processes-2.ts#maintenance-order-process",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום של הפרויקט (DOMAINS): pm-confirmation",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "אישור מדווח שעות, חומרים, מדידות וסטטוס, מעדכן עלות בפועל וצריכת מלאי ומאפשר TECO. טבלאות AFRU, " +
          "AFVC, AFKO, AUFK; טרנזקציות IW41, IW42, IW44, IW45, IW48; BAPI_ALM_CONF_CREATE; אישור חלקי מול סופי " +
          "(Final). תקלות: לא ניתן לאשר (לוודא REL ותקופת רישום פתוחה), עלות לא נרשמה (שיוך מרכז עלות במרכז " +
          "העבודה, CRCO), תנועת חומר נכשלה.",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-confirmation",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום של הפרויקט (DOMAINS): pm-work-centers",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מרכז עבודה מגדיר היכן ועל ידי מי מתבצעת עבודת התחזוקה: קיבולת, נוסחאות תזמון ושיוך מרכז עלות; " +
          "טבלאות CRHD, CRCA, CRCO, CRTX, KAKO; \"CRHD כותרת, CRCA קיבולת, CRCO שיוך עלות, CRTX טקסט\".",
        verificationLevel: "repository_verified",
        repoRef: "data/domains.ts#pm-work-centers",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת התחום של הפרויקט (DOMAINS): pm-settlement",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ההתחשבנות מעבירה את עלויות פקודת התחזוקה ליעד (מרכז עלות, נכס או הזמנה) לפי כלל התחשבנות, " +
          "'ומבוצעת ב-KO88 (בודד) או CO88 (מרוכז)'; טבלאות AUFK, COBRB, COSS, COSP; טרנזקציות KO88, CO88, KO8G, " +
          "IW32; K_ORDER_SETTLEMENT; ב-S/4 העלויות זורמות ל-ACDOCA; סגירה עסקית (CLSD) אחרי התחשבנות מלאה.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/domains.ts#pm-settlement",
        conflictingEvidence: [
          {
            sourceType: "repository",
            sourceTitle: "קטלוג הטרנזקציות של הפרויקט (tcode-catalog): CO88",
            product: "SAP ECC / SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE,
            claim: "CO88 רשומה כ-'Actual Settlement: Production/Process Orders' (מודול CO, 'סילוק בפועל: הזמנות " +
              "ייצור/תהליך').",
            verificationLevel: "repository_verified",
            repoRef: "data/tcode-catalog.ts#CO88",
          },
        ],
      },
      {
        sourceType: "repository",
        sourceTitle: "פירוט התחום של הפרויקט (DOMAIN_DETAIL): pm-settlement",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "נתוני אב: כלל התחשבנות, סוג התחשבנות PER/FUL, מרכז עלות או נכס יעד, פרופיל התחשבנות; פונקציות " +
          "K_ORDER_SETTLEMENT, K_SETTLEMENT_RULE_READ, K_COSTS_READ; תקריות: כלל חסר, תקופה סגורה, סטטוס " +
          "CLSD/LKD, יתרה שאינה אפס; ECC מול S/4HANA: תהליך ההתחשבנות ו-COBRB קיימים, העלויות עוברות ל-Universal " +
          "Journal (ACDOCA) ללא reconciliation נפרד.",
        verificationLevel: "repository_verified",
        repoRef: "data/domain-detail.ts#pm-settlement",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הפונקציות של הפרויקט (function-intel): K_ORDER_SETTLEMENT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "התחשבנות פקודה: העברת עלויות ליעד (מרכז עלות, נכס, WBS); כשלים: כלל התחשבנות חסר, תקופה סגורה, " +
          "סטטוס שאינו מאפשר; טרנזקציות קשורות KO88 ו-KO8G; ב-S/4HANA זמין (Universal Journal/ACDOCA).",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#K_ORDER_SETTLEMENT",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של הפרויקט (tcode-catalog): CO88",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CO88 רשומה כ-'Actual Settlement: Production/Process Orders' (מודול CO, 'סילוק בפועל: הזמנות " +
          "ייצור/תהליך').",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): IW21",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW21 יוצרת הודעת תחזוקה לפי סוג הודעה (M1 maintenance request, M2 malfunction report, M3 activity " +
          "report) וכותבת ל-QMEL ולטבלאות הפריטים, וקושרת לאובייקט טכני (EQUI/IFLOT); טבלאות QMEL, QMFE, QMUR, " +
          "QMMA, QMSM, QMIH; BAPI_ALM_NOTIF_CREATE, BAPI_ALM_NOTIF_SAVE. s4Delta: IW21 נשמרת ב-S/4HANA, לצדה " +
          "Create Maintenance Request (F1511A), Request Maintenance (F1511) ו-Report and Repair Malfunction " +
          "(F2023); QMEL/QMFE/QMIH ללא שינוי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW21",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TRANSACTIONS): IW28",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW28 'עיבוד רשימת הודעות': בחירה ועיבוד המוני של הודעות בניהול הודעות פתוחות, עבור רכז התחזוקה; " +
          "טבלה QMEL; פונקציה BAPI_ALM_NOTIF_LIST_FILTER; שגיאה: סינון רחב פוגע בביצועים.",
        verificationLevel: "repository_verified",
        repoRef: "data/transactions.ts#IW28",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): IW31",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW31 יוצרת הזמנת תחזוקה עם פעולות, רכיבים ועלויות; זרימה: הודעה (IW21), IW31, תכנון, release, " +
          "הפקת PR, ביצוע, IW41, TECO, settlement (KO88). טבלאות AUFK, AFKO, AFVC, RESB, AFIH, JEST, PMCO; " +
          "BAPI_ALM_ORDER_MAINTAIN, BAPI_ALM_ORDER_GET_DETAIL. שגיאות: order type לא מוגדר, settlement rule חסר, " +
          "work center לא בתוקף, availability control. s4Delta: IW31/IW32 נשמרות ב-S/4HANA, ה-Settlement נרשם " +
          "ל-Universal Journal (ACDOCA), הטבלאות הקלאסיות ללא שינוי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW31",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): IW32",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW32 משנה הזמנה: פעולות, רכיבים, settlement, release, TECO וסטטוסים. שגיאות: הזמנה נעולה, 'TECO " +
          "נכשל בגלל confirmations/PR פתוחים', settlement rule חסר, availability control חוסם. s4Delta: נשמרת " +
          "ב-S/4HANA, עלויות ל-Universal Journal (ACDOCA).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW32",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): IW38",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW38 היא עריכת רשימת הזמנות: עריכה גורפת, סינון לפי סטטוס, אובייקט, work center ותאריך; release, " +
          "TECO והדפסה גורפים. שגיאות: טווח בחירה רחב, פעולה גורפת שנכשלת חלקית. s4Delta: נשמרת ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW38",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): IW41",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW41 מדווחת זמן וביצוע על פעולות ההזמנה; זרימה: release (IW32), ביצוע, IW41, TECO, settlement. " +
          "טבלאות AFRU, AFKO, AFVC, AUFK; BAPI_ALM_CONF_CREATE, BAPI_ALM_CONF_GETDETAIL, BAPI_ALM_CONF_CANCEL. " +
          "שגיאות: הזמנה לא ב-release, activity type חסר ב-work center, final confirmation בטעות, תאריך מחוץ " +
          "לתקופה. s4Delta: נשמרת ב-S/4HANA; עלות הפעילות ל-Universal Journal.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW41",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): IW42",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW42 היא אישור כולל של הוראת תחזוקה: פעולות, צריכת חומרים, מדידות, נתוני הודעה וסגירה טכנית במסך " +
          "אחד. שגיאות: period סגור לתנועת חומר, חוסר מלאי לרכיב, 'TECO נכשל בגלל אישורים פתוחים'. s4Delta: " +
          "תנועות המלאי נרשמות ל-MATDOC, עם ציטוט פריט הפישוט 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT " +
          "(MM-IM)'; MKPF/MSEG נשארות כהגדרות DDIC.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW42",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): KO88",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "KO88 היא הסדרה בודדת של הזמנה: העברת העלויות למקבלים שבכלל ההסדרה; משתמשים: בקר עלויות, חשב, " +
          "אנליסט סגירת תקופה; זרימה: KO02 הגדרת כלל, KO88 הסדרה, בדיקה KOB1, 'KO8G (קולקטיבי) בסוף תקופה'; הסדרה " +
          "על בסיס COBRA/COBRB; טבלאות ACDOCA, COBRA, COBRB, COEP, COSS. שגיאות: KD 555 תקופה לא פתוחה, כלל חסר " +
          "או חלקי, מקבל לא תקף. s4Delta: הרישום נכנס ל-Universal Journal (ACDOCA); COSP/COSS תצוגות תאימות, לפי " +
          "פריט הפישוט 'S4TWL - DATA MODEL CHANGES IN FIN'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#KO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): CO88",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "CO88 מתוארת כ'יישוב קולקטיבי של הזמנות ייצור' (העברת סטיות ו-WIP מהזמנות ייצור בסוף תקופה), " +
          "בזרימה CO11N, KKAO, KKS1, CO88.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO88",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציה של הפרויקט (TX_INTEL): MCI7",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MCI7 הוא דוח במערכת המידע של התחזוקה (PMIS) לניתוח עלויות לפי אובייקט טכני; טבלאות S061, S065, " +
          "S070, EQUI, ILOA, AUFK; שגיאה שכיחה: מבני המידע לא עודכנו. s4Delta: 'PMIS/LIS הוא compatibility scope; " +
          "ניתוח עלות מודרני מבוסס ACDOCA/CDS'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MCI7",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM): BAPI_ALM_ORDER_MAINTAIN",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BAPI_ALM_ORDER_MAINTAIN (BUS2007) בשרשרת הודעה, פקודת תחזוקה, שחרור, דיווח, תנועת סחורה, סגירה " +
          "טכנית (TECO), סילוק (KO88); רצף: BAPI_ALM_ORDER_MAINTAIN (HEADER/OPERATION/COMPONENT), " +
          "BAPI_ALM_ORDER_MAINTAIN (RELEASE), BAPI_ALM_CONF_CREATE, BAPI_ALM_ORDER_MAINTAIN (TECHNICALCOMPLETE), " +
          "BAPI_TRANSACTION_COMMIT; טבלאות AUFK, AFIH, AFVC, AFVV, RESB.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט: I_MaintenanceOrder, I_MaintenanceNotification",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "I_MaintenanceOrder (פקודה, מעל AUFK ו-AFKO) ו-I_MaintenanceNotification (הודעה, מעל QMEL) רשומות " +
          "במפת ה-CDS של המאגר, מודול PM.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaintenanceOrder",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך של הפרויקט (PROCESS_MAPS): maintenance-management",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מפת ניהול התחזוקה: הודעה (IW21), פקודה (IW31, IW32; תקריות order-wont-release, " +
          "permit-not-auto-assigned), חלפים (RESB, EBAN), ביצוע ואישור (IW41, IW42, AFRU; תקרית " +
          "confirm-period-closed), התחשבנות (KO88, COBRB; תקריות settlement-error, teco-blocked).",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#maintenance-management",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: order-wont-release",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פקודה לא משתחררת: היתר פתוח רלוונטי לשחרור, בדיקת זמינות רכיב נכשלה, סטטוס משתמש חוסם, הרשאה " +
          "I_AUART/I_SWERK; ניתוח ב-IW32, CO24, SU53; EXIT IWO10009 לבדיקות שחרור; טבלאות AUFK, JEST, IHPA, RESB.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#order-wont-release",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: permit-blocks-order-release",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "IW32 מסרב לשחרר כי היתר נדרש (effective at release) הוקצה ולא ניתן; תיקון: מתן ההיתר על ידי משתמש " +
          "מורשה, או הסרת ההקצאה כשאינו נדרש; טבלאות AUFK, AFIH, IHGNS.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#permit-blocks-order-release",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: maint-order-budget",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "שחרור או אישור נחסמים בחריגת תקציב (Availability Control, הודעה BP603); ניתוח ב-KO23 ו-IW32; " +
          "תיקון: הגדלת תקציב (KO22/KO24) או התאמת tolerance.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#maint-order-budget",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: confirm-period-closed",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "אישור נכשל בתקופה סגורה (M7053): תקופת MM סגורה (MMRV) או FI/CO סגורה (OB52); חלות גם על CONFPM01 " +
          "ברשימת ה-exits של התקרית.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#confirm-period-closed",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: pm-cost-no-activity-type",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "אישור שעות לא יוצר עלות: סוג פעילות לא משויך למרכז העבודה (CRCO) או תעריף לא תוכנן (KP26); exit‏ " +
          "CONFPM01.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#pm-cost-no-activity-type",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: pm-confirmation-final-flag",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פקודת תחזוקה לא עוברת ל-CNF כי האישור לא סומן Final; טבלאות AFRU, AFVC; BAPI_ALM_CONF_CREATE; " +
          "exit‏ CONFPM01; בתרחיש הרשומה הפקודה נשארה PCNF כי האישור לא סומן סופי.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#pm-confirmation-final-flag",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: teco-blocked",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "TECO חסומה: שורשים 'אישורים פתוחים', 'היתר רלוונטי-לסיום פתוח', 'רזרבציות/תנועות פתוחות'; ניתוח " +
          "ב-IW32, IW41, COGI; תיקון: להשלים אישורים, לתת היתר, לפתור תנועות תקועות (COGI).",
        verificationLevel: "conflicting_sources",
        repoRef: "data/troubleshooting.ts#teco-blocked",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Technical Completion of an Order | Orders (CS-SE/PM-WOC-MO)",
            product: "SAP ERP",
            edition: "ecc",
            release: "6.18.latest",
            url: "https://help.sap.com/docs/SAP_ERP/b4174aff4a234ed5be928a10c60997fb/bac9b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
            accessedAt: DATE,
            claim: "צד ECC (SAP ERP 6.0 EHP8, loio bac9b65334e6b54ce10000000a174cb4, נקרא דרך " +
              "scripts/sap-help-body.mjs): 'You usually complete an order technically once the maintenance work " +
              "planned in the order has been performed'. אחרי TECO: 'You can still enter confirmations for a " +
              "technically completed order. In order to prevent this, you must create a user status that does not " +
              "permit confirmations'; 'the order can still receive costs, for example, through incoming " +
              "invoices'; 'If no settlement rule has yet been maintained for the order, the system creates one " +
              "automatically'; 'All the existing purchase requisitions for the order are flagged for deletion. " +
              "All the existing reservations for the order are cleared'; וכל ההודעות של הפקודה מושלמות, אלא אם " +
              "סימון Complete notifications לא נבחר, משימה לא הושלמה או סטטוס משתמש בהודעה מונע זאת.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: settlement-error",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "'KO88/CO88 מסיימים בשגיאה; עלות נשארת בפקודה': כלל התחשבנות לא הוגדר, תקופת CO/FI סגורה, סטטוס " +
          "CLSD/LKD, יעד לא תקף; ניתוח ב-KO88, CO88, KO02, OB52; טבלאות COBRB, AUFK, COEP.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#settlement-error",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: downtime-not-recorded",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מדדי זמינות שגויים כי Malfunction Start/End חסרים: סימון Breakdown לא סומן, זמני התקלה לא מולאו, " +
          "או סוג הודעה ללא malfunction; ניתוח ב-IW21, IW29, MCI7; טבלאות QMIH, QMEL; exit‏ QQMA0001.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#downtime-not-recorded",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, Plant Maintenance with SAP S/4HANA: Business User Guide), " +
          "סעיף 4.3 'Planning'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פרק 4 'Work Order Cycle', סעיף 4.3 ובו יצירת פקודה (4.3.1), סוגי פקודה (4.3.2), פעולות (4.3.4), " +
          "תכנון חומרים (4.3.7) ועלות משוערת (4.3.12); הפניית קריאה בלבד, לא מקור לטענה בשורה זו.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#4.3",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, Plant Maintenance with SAP S/4HANA: Business User Guide), " +
          "סעיף 4.6 'Completion'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "סעיף 4.6 ובו אישורי השלמה (4.6.1), אישורי השלמה טכניים (4.6.2), סגירה טכנית (4.6.3) וסגירה עסקית " +
          "(4.6.5); הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#4.6",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 9 בספריית הפרויקט (SAP PRESS, Plant Maintenance with SAP S/4HANA: Business User Guide), " +
          "סעיף 6.1 'Immediate Repairs'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פרק 6 'Other Business Processes', סעיף 6.1 ובו יצירת פקודות (עם הודעה) והשלמה (6.1.1) " +
          "ו-After-Event Recording (6.1.2); הפניית קריאה בלבד.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book9.json#6.1",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "פערים ומחלוקות פתוחים: (1) TECO והזמנות חומר: המאגר חלוק (teco-blocked ו-tx-intel#IW32 מול " +
      "pm-corrective), עמוד ה-ECC הרשמי (6.18.latest) מתעד ניקוי הזמנות חומר, ועמוד הסטטוסים של S/4HANA 2025 " +
      "FPS01 אינו מזכיר אותן; לא הוכרע, דורש בדיקה במערכת היעד. (2) הרצת התחשבנות מרוכזת לפקודות תחזוקה: CO88 לפי " +
      "domains#pm-settlement מול KO8G לפי tx-intel#KO88 (K_ORDER_SETTLEMENT מונה אותה כטרנזקציה קשורה), ו-CO88 " +
      "מתוארת בקטלוג להזמנות ייצור ותהליך; אף עמוד רשמי שנקרא אינו נוקב בטרנזקציית התחשבנות לפקודת תחזוקה. (3) " +
      "סוג פקודת ברירת המחדל לתיקון (PM01 או PM02) אינו אחיד במאגר ואינו נקבע כאן. (4) תפקידים: שמות SAP_BR_* " +
      "נלקחו רק משורות ספריית ה-Fiori (scripts/fal-app.mjs, S32OP) שהועתקו מרשומות האימות fiori:F2023, " +
      "fiori:F5104A, fiori:F5241, fiori:F4604 ו-fiori:F1511A; לתפקיד הבקר הפיננסי אין מזהה SAP_BR במקור שנקרא, " +
      "ולצד ECC אין מקור תפקידים. (5) ממשקי IDoc לתהליך אינם מתועדים במאגר ולכן הושמטו; OData נקוב רק בשמות " +
      "שהשורות הרשמיות מדפיסות. (6) KPI מעבר ל-MTTR/MTBF אינם מתועדים. (7) QMIH, COEP, ACDOCA ו-MATDOC אינם " +
      "במילון הפרויקט ומופיעים בפרוזה בלבד. (8) ההפניה הרשמית היא עמוד Maintenance Order Types; פריט היקף יחיד " +
      "לתהליך אינו נקבע, ו-BH1/BH2/BJ2 ו-4HH/4HI מובאים רק כפי שהעמוד מקשר אותם לסוגי פקודה. חיפושים שרצו " +
      "ב-2026-09-24 (scripts/sap-help-search.mjs, On-Premise אלא אם צוין): 'Reactive Maintenance' (21), " +
      "'Breakdown Maintenance' (21), 'Corrective Maintenance process maintenance order', 'Technical Completion of " +
      "Maintenance Order', 'Completion Confirmation maintenance order', 'Settlement of Maintenance Orders', " +
      "'Changing the Notification Type', וב-SAP_ERP 'Breakdown Maintenance' (21) ו-'Technical Completion of " +
      "Maintenance Orders' (21). לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ======================================================= procure to pay */
  {
    slug: "procure-to-pay-process",
    he: "רכש עד תשלום (Procure-to-Pay) מקצה לקצה",
    en: "Procure-to-pay process: from purchase requisition to payment",
    module: "Cross",
    summary: "רכש עד תשלום (P2P) הוא הזרימה הכללית של הרכש החיצוני: דרישת רכש, הקצאת מקור אספקה, הזמנת רכש " +
      "ושחרורה, קבלת טובין, אימות חשבונית ותשלום. הווריאנט הממוקד לרכש מפקודת תחזוקה מתועד ברשומה " +
      "procure-to-pay-for-maintenance ואינו משוכפל כאן.",
    context: "עמוד התהליך הרשמי 'Procurement in SAP S/4HANA' (Sourcing and Procurement, 2025 FPS01) מתאר 'a " +
      "general cycle of activities': קביעת צורך, קביעת מקור, בחירת ספק והשוואת הצעות, עיבוד הזמנת רכש, מעקב " +
      "הזמנה, קבלת טובין וניהול מלאי, ואימות חשבונית. מפת התהליך 'רכש לתשלום (P2P)' של הפרויקט מונה חמישה שלבים " +
      "עם קודי טרנזקציה, טבלאות, Fiori, ממשקים ותקריות לכל שלב: דרישת רכש (ME51N, ME53N), הזמנת רכש (ME21N, " +
      "ME22N, ME23N), קבלת טובין (MIGO), חשבונית (MIRO) ותשלום (F110, FBL1N). רשומות ה-tx-intel של הפרויקט " +
      "מוסיפות את הקצאת המקור (ME56) וההמרה האוטומטית (ME59N) בין הדרישה להזמנה, ואת שלבי השחרור (ME54N לדרישה, " +
      "ME29N להזמנה). ב-S/4HANA, לפי רשומות tx-intel וראיות help.sap.com של 2025 FPS01, טרנזקציות השרשרת מתועדות " +
      "לצד יישומי Fiori; השינויים מתועדים בשדה eccToS4 לפי צד ומהדורה, ובהם שינוי מודל הנתונים של מסמך החומר " +
      "(MKPF/MSEG ב-ECC, MATDOC ב-S/4HANA) לפי 'S4TWL - Data Model in Inventory Management'. בספר 3 בספריית " +
      "הפרויקט (Sourcing and Procurement with SAP S/4HANA) יש סעיפים בשמות השלבים האלה בפרקים 5, 6, 7 ו-12 (לפי " +
      "כותרות הסעיפים; התוכן לא נקרא).",
    steps: [
      {
        he: "לזהות צורך ולפתוח דרישת רכש (PR): ידנית ב-ME51N או אוטומטית מ-MRP, עם document type, קטגוריית הקצאת " +
          "חשבון (K/F/A) ו-source of supply אופציונלי. הדרישה נכתבת ל-EBAN ולייחוס החשבונאי ב-EBKN (רשומת " +
          "tx-intel של ME51N; עמוד התהליך הרשמי: 'You can enter purchase requisitions yourself, or they can be " +
          "generated automatically').",
        xrefs: ["tx:ME51N", "table:EBAN", "table:EBKN", "fm:BAPI_PR_CREATE"],
      },
      {
        he: "לקבוע מקור אספקה: ME56 מקצה ספק או הסכם מסגרת לדרישות שלא הוקצה להן מקור, על בסיס Source List (ME01) " +
          "או רשומות מידע רכש (ME11), בלי ליצור PO; ME57 מקצה ומעבדת את הדרישה להזמנה (רשומות tx-intel של ME56 " +
          "ו-ME51N).",
        xrefs: ["tx:ME56", "tx:ME57", "tx:ME01", "tx:ME11"],
      },
      {
        he: "לשחרר את הדרישה לפי release strategy של PR: ME54N לדרישה בודדת, ME55 לשחרור קולקטיבי; אסטרטגיית " +
          "השחרור של PR נפרדת מזו של PO. הדרישה מוצגת ב-ME53N (רשומות tx-intel של ME54N ו-ME51N; העמוד הרשמי " +
          "Process Purchase Requisition מונה את ME51N, ME52N ו-ME53N).",
        xrefs: ["tx:ME54N", "tx:ME55", "tx:ME53N", "tx:ME52N"],
      },
      {
        he: "להמיר את הדרישה להזמנת רכש (PO): ב-ME21N עם reference ל-PR, או ב-ME59N להמרה אוטומטית של דרישות עם " +
          "מקור מוקצה חד-משמעי ודגל 'automatic PO' ב-info record ובמאסטר הספק. ההזמנה נשמרת ב-EKKO ו-EKPO (אינן " +
          "במילון הפרויקט) (רשומות tx-intel של ME21N ו-ME59N).",
        xrefs: ["tx:ME21N", "tx:ME59N"],
      },
      {
        he: "לשחרר את ה-PO לפי אסטרטגיית האישור: ME29N ל-PO בודד (כולל ביטול שחרור), ME28 לאישור קולקטיבי (רשומת " +
          "tx-intel של ME29N).",
        xrefs: ["tx:ME29N", "tx:ME28"],
      },
      {
        he: "לקבל את הטובין מול ה-PO ב-MIGO (תנועה 101): הקבלה מעדכנת את היסטוריית ה-PO (EKBE, אינה במילון " +
          "הפרויקט) ומבצעת GR/IR clearing, ומנת בדיקת QM נפתחת אם QM פעיל (רשומת tx-intel של MIGO, מפת P2P). מסמך " +
          "החומר של הקבלה: ב-ECC ‏(SAP ERP 6.0) נכתב ל-MKPF (כותרת) ול-MSEG (פריטים); ב-S/4HANA, לפי 'S4TWL - " +
          "Data Model in Inventory Management' (רשימת הפישוט 2025 FPS01, פריט 15.3.1), 'Material document data " +
          "will be stored in MATDOC only and not anymore in MKPF and MSEG', והתאימות לנתוני הטבלאות הישנות עוברת " +
          "דרך CDS compatibility views (עמוד Archiving Material Documents, 2025 FPS01). מסמך החומר מוצג ב-MB03. " +
          "ב-S/4HANA 2025 FPS01 מתועד לקבלה בהתייחסות למסמך רכש יישום Fiori F0843 (Post Goods Receipt for " +
          "Purchasing Document).",
        xrefs: [
          "tx:MIGO", "tx:MB03", "table:MKPF", "table:MSEG", "obj:material-document", "fiori:F0843",
          "fm:BAPI_GOODSMVT_CREATE", "enh:badi:MB_MIGO_BADI", "enh:exit:MBCF0002",
        ],
      },
      {
        he: "לאמת את חשבונית הספק ב-MIRO ב-3-way match (PO/GR/Invoice): סטיית מחיר או כמות מעבר ל-tolerance " +
          "(OMR6) חוסמת תשלום, וחשבונית חסומה משוחררת ב-MRBR. לפי רשומת tx-intel של MIRO (ללא הבחנת מהדורה) MIRO " +
          "כותבת RBKP ו-RSEG (אינן במילון הפרויקט) ומסמך FI/CO ומנקה את חשבון GR/IR; חשבונית ללא PO נקלטת ב-FB60. " +
          "בתיעוד S/4HANA 2025 FPS01 (עמוד Invoice Processing): 'When the invoice is posted, the invoice data is " +
          "saved in the system', והמערכת מציגה את מספר מסמך החשבונית של ניהול החומרים ואת מספר המסמך החשבונאי.",
        xrefs: ["tx:MIRO", "tx:MRBR", "tx:FB60"],
      },
      {
        he: "לשלם בריצת F110: Parameters, Proposal, Payment Run, Print/DME; הריצה בוחרת פריטים פתוחים לפי due " +
          "date, אמצעי תשלום ובנק, יוצרת מסמכי תשלום ומקזזת, ומפיקה קבצי DME/IDoc לבנק. פריטי הספק נבדקים ב-FBL1N " +
          "(רשומות tx-intel של F110 ו-FBL1N, מפת P2P). ב-S/4HANA, לפי רשומת F110, הריצה רושמת ל-Universal Journal " +
          "(ACDOCA), ותיעוד What's New של S/4HANA 2022 מזכיר את F110 (Automatic Payment Transactions) לצד יישום " +
          "Fiori Manage Automatic Payments.",
        xrefs: ["tx:F110", "tx:FBL1N", "tx:FBZP", "table:ACDOCA"],
      },
      {
        he: "לעקוב אחרי מסמכים פתוחים: ME5A מציג דרישות רכש פתוחות שלא הומרו או שלא שוחררו; ME2M מציג הזמנות רכש " +
          "לפי חומר (רשומת tx-intel של ME5A; העמוד הרשמי Lists of Purchase Orders).",
        xrefs: ["tx:ME5A", "tx:ME2M"],
      },
      {
        he: "בממשק תוכניתי: BAPI_PR_CREATE ליצירת PR ו-BAPI_GOODSMVT_CREATE לקבלת טובין (קוד תנועה 01 = GR PO), " +
          "וכל BAPI כותב נסגר ב-BAPI_TRANSACTION_COMMIT. BAPI_PO_CREATE1 (ME21N, ME59N) " +
          "ו-BAPI_INCOMINGINVOICE_CREATE (MIRO) מתועדים ברשומות tx-intel ואינם במילון הפרויקט.",
        xrefs: [
          "fm:BAPI_PR_CREATE", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline",
        ],
      },
    ],
    antiPatterns: [
      "הזמנת רכש ללא reference לדרישה: שבירת שרשרת המסמכים וכפילות נתונים (טעות נפוצה ברשומת tx-intel של ME21N).",
      "המרה אוטומטית ב-ME59N לדרישה ללא מקור מוקצה: דרישה ללא מקור נכשלת בהמרה ומטופלת ב-ME57 (לפי רשומת tx-intel " +
        "של ME59N); הרצה ללא test run והתעלמות מדרישות שנכשלו מופיעות שם כטעויות.",
      "בלבול בין שחרור PR (ME54N) לשחרור PO (ME29N) (טעות נפוצה ברשומת tx-intel של ME54N).",
      "קליטת חשבונית לפני GR כשמופעל GR-based invoice verification, והתעלמות מ-tolerance keys (טעויות ברשומת " +
        "tx-intel של MIRO).",
      "הרצת F110 בלי בדיקת ה-Proposal (טעות ברשומת tx-intel של F110).",
      "ממשק קבלת טובין ללא בדיקת כפילות (idempotency): GR נרשם פעמיים ומכפיל מלאי ועלות (תקרית " +
        "duplicate-goods-receipt).",
      "רישום מחדש ידני אחרי הודעת הצלחה כשמסמך החומר או ה-FI חסר: לפי תקרית update-termination-sm13 חוזרים על " +
        "ה-Update מ-SM13 ולא רושמים מחדש.",
    ],
    checks: [
      "חיובי: PR נוצרת עם ייחוס חשבונאי תקין (בדיקת שלב הדרישה במפת P2P).",
      "חיובי: PO נוצר עם תנאי מחיר ומשתחרר לפי release strategy (בדיקת שלב ההזמנה במפת P2P).",
      "אינטגרציה: GR בתנועה 101 מעדכן מלאי, ומנת בדיקת QM נפתחת אם QM פעיל (מפת P2P).",
      "אינטגרציה: MIRO עוברת 3-way match (PO/GR/Invoice), וחסימות מטופלות ב-MRBR (מפת P2P).",
      "בקרה: ה-Proposal של F110 נבדק לפני ביצוע הריצה (לפי שיטות העבודה ברשומת tx-intel של F110); ריצת התשלומים " +
        "מקזזת פריטים פתוחים (מפת P2P).",
      "ממשק: אחרי BAPI_GOODSMVT_CREATE מוודאים MATERIALDOCUMENT ו-COMMIT ובודקים ב-MB51 (לפי תרחיש ה-QA ברשומת " +
        "function-intel, שנכתב שם לניפוק 261 ומוחל כאן על קבלה).",
      "רגרסיה: דרישות רכש פתוחות שלא הומרו או שלא שוחררו מאותרות ב-ME5A.",
    ],
    process: {
      purpose: "לרכוש מספק חומר או שירות במחזור עקיב: מקביעת הצורך ודרישת הרכש, דרך קביעת מקור, הזמנה ושחרורה, " +
        "קבלת טובין ואימות חשבונית מול ההזמנה והקבלה, ועד תשלום וקיזוז הפריט הפתוח של הספק (עמוד התהליך הרשמי " +
        "ומפת P2P של הפרויקט).",
      trigger: [
        {
          he: "צורך בחומר או שירות המזוהה במחלקות המשתמשות או דרך materials planning and control (עמוד התהליך " +
            "הרשמי); הדרישה נפתחת ידנית ב-ME51N או נוצרת מ-MRP (רשומת tx-intel של ME51N).",
          xrefs: ["tx:ME51N"],
        },
        {
          he: "דרישות רכש פתוחות ללא מקור אספקה, הממתינות להקצאה ב-ME56 (תנאי מוקדם ברשומת tx-intel של ME56).",
          xrefs: ["tx:ME56"],
        },
      ],
      preconditions: [
        {
          he: "Source List (ME01) או רשומות מידע רכש (ME11) לקביעת מקור; להמרה אוטומטית: דגל 'automatic PO' " +
            "ב-info record ובמאסטר הספק (רשומות tx-intel של ME56 ו-ME59N).",
          xrefs: ["tx:ME01", "tx:ME11", "tx:ME59N"],
        },
        {
          he: "אסטרטגיית שחרור מוגדרת ל-PR ול-PO, וקוד שחרור בהרשאת המאשר (שגיאה נפוצה 'Release code מחוץ להרשאה' " +
            "ברשומות ME54N ו-ME29N).",
          xrefs: ["tx:ME54N", "tx:ME29N"],
        },
        {
          he: "תקופת רישום MM פתוחה וחשבונות G/L מוגדרים ב-OBYC; לחומר בניהול מחיר תקן (S) נדרש חשבון PRD ב-OBYC " +
            "(רשומת tx-intel של MIGO ותקרית prd-price-difference-account-missing).",
          xrefs: ["tx:MIGO", "tx:OBYC"],
        },
        {
          he: "tolerance keys (OMR6) לאימות חשבונית (רשומת tx-intel של MIRO).",
          xrefs: ["tx:MIRO"],
        },
        {
          he: "תצורת FBZP (payment methods, house banks, ranking) ו-bank details במאסטר הספק (תנאים מוקדמים " +
            "ברשומת tx-intel של F110).",
          xrefs: ["tx:F110", "tx:FBZP"],
        },
      ],
      masterData: [
        {
          he: "חומר או קבוצת חומרים ומפעל בדרישה (שגיאות נפוצות ברשומת ME51N), וייחוס חשבונאי ב-EBKN.",
          xrefs: ["tx:ME51N", "table:EBKN"],
        },
        {
          he: "Source List ורשומות מידע רכש (ME01, ME11) לקביעת מקור (רשומת ME56).",
          xrefs: ["tx:ME01", "tx:ME11"],
        },
        {
          he: "מאסטר ספק: דגל 'automatic PO' (רשומת ME59N) ו-bank details לתשלום (רשומת F110).",
          xrefs: ["tx:ME59N", "tx:F110"],
        },
        {
          he: "רשומות תנאי תמחור (condition records) להזמנה; נבדקות ב-MEK3 (תקרית pricing-condition-missing).",
          xrefs: ["tx:MEK3"],
        },
        {
          he: "quality info record ברכש כאשר QM ברכש פעיל, נוצר ומשוחרר ב-QI01/QI02 (תקרית " +
            "qm-procurement-blocks-gr-or-invoice).",
          xrefs: ["tx:QI01", "tx:QI02"],
        },
      ],
      roles: [
        {
          he: "מתכנן, מחסנאי, מבקש פנימי או קניין: פתיחת דרישת רכש ב-ME51N (רשומת tx-intel של ME51N).",
          xrefs: ["tx:ME51N"],
        },
        {
          he: "קניין ומתכנן רכש: הקצאת מקור ב-ME56; קניין ומנהל רכש: המרה ב-ME59N (רשומות tx-intel). עמוד התהליך " +
            "הרשמי מזכיר 'buyers' בהקשר של מגבלות over- ו-underdelivery.",
          xrefs: ["tx:ME56", "tx:ME59N"],
        },
        {
          he: "מנהל רכש, מאשר וראש מחלקה: שחרור PR ב-ME54N; מנהל רכש, מאשר וקניין בכיר: שחרור PO ב-ME29N (רשומות " +
            "tx-intel).",
          xrefs: ["tx:ME54N", "tx:ME29N"],
        },
        {
          he: "מחסנאי, מנהל מחסן ופקיד מלאי: קבלת טובין ב-MIGO (רשומת tx-intel); בעמוד התהליך הרשמי: 'Goods " +
            "Receiving personnel'.",
          xrefs: ["tx:MIGO"],
        },
        {
          he: "הנהלת חשבונות ספקים (AP) ופקיד חשבוניות: MIRO (רשומת tx-intel); בעמוד התהליך הרשמי: 'accounts " +
            "payable clerk'.",
          xrefs: ["tx:MIRO"],
        },
        {
          he: "צוות תשלומים, צוות אוצר ומנהל AP: ריצת F110 (רשומת tx-intel).",
          xrefs: ["tx:F110"],
        },
      ],
      transactions: [
        {
          he: "דרישת רכש: ME51N יצירה, ME52N שינוי, ME53N תצוגה; ME54N שחרור בודד, ME55 שחרור קולקטיבי.",
          xrefs: ["tx:ME51N", "tx:ME52N", "tx:ME53N", "tx:ME54N", "tx:ME55"],
        },
        {
          he: "מקור והמרה: ME56 הקצאת מקור, ME57 הקצאה ועיבוד, ME59N המרה אוטומטית.",
          xrefs: ["tx:ME56", "tx:ME57", "tx:ME59N"],
        },
        {
          he: "הזמנת רכש: ME21N יצירה, ME22N שינוי, ME23N תצוגה; ME29N שחרור בודד, ME28 שחרור קולקטיבי; ME2M " +
            "הזמנות לפי חומר.",
          xrefs: ["tx:ME21N", "tx:ME22N", "tx:ME23N", "tx:ME29N", "tx:ME28", "tx:ME2M"],
        },
        {
          he: "קבלה: MIGO (תנועה 101); MB03 תצוגת מסמך חומר.",
          xrefs: ["tx:MIGO", "tx:MB03"],
        },
        {
          he: "חשבונית ותשלום: MIRO, MRBR לחשבוניות חסומות, F110 ריצת תשלומים, FBL1N פריטי ספק.",
          xrefs: ["tx:MIRO", "tx:MRBR", "tx:F110", "tx:FBL1N"],
        },
        {
          he: "מעקב: ME5A רשימת דרישות רכש.",
          xrefs: ["tx:ME5A"],
        },
        {
          he: "Fiori (S/4HANA): F0843 Post Goods Receipt for Purchasing Document (ראיה רשמית); Manage Purchase " +
            "Orders כהמלצת SAP ליצירה, שינוי ותצוגה של הזמנות (עמוד Create Purchase Order - Advanced); לפי מפת " +
            "P2P ורשומות tx-intel גם Manage Purchase Requisitions, Create Supplier Invoice ו-Manage Automatic " +
            "Payments, שאין להם מזהה בקטלוג ה-Fiori של הפרויקט.",
          xrefs: ["fiori:F0843"],
        },
      ],
      tables: [
        {
          he: "EBAN שורות דרישת הרכש ו-EBKN הייחוס החשבונאי שלה.",
          xrefs: ["table:EBAN", "table:EBKN"],
        },
        {
          he: "מסמך החומר של הקבלה: ב-ECC ‏MKPF (כותרת) ו-MSEG (פריטים); ב-S/4HANA, לפי 'S4TWL - Data Model in " +
            "Inventory Management' (2025 FPS01), מסמך החומר נשמר ב-MATDOC בלבד (אינה במילון הפרויקט), ו-MKPF " +
            "ו-MSEG 'do still exist in S/4HANA as DDIC definition as well as database object', עם תאימות לנתונים " +
            "דרך CDS compatibility views. מפת P2P מונה לשלב הקבלה את MATDOC ו-MSEG.",
          xrefs: ["table:MKPF", "table:MSEG", "obj:material-document", "bp:matdoc-read-through-compatibility"],
        },
        {
          he: "S/4HANA: ACDOCA (Universal Journal) לשלב התשלום, לפי מפת P2P ורשומת F110 ('רושם ל-Universal " +
            "Journal').",
          xrefs: ["table:ACDOCA"],
        },
        {
          he: "אינן במילון הפרויקט ומוזכרות בפרוזה: EKKO ו-EKPO של ההזמנה ו-EKBE היסטוריית ההזמנה, RBKP ו-RSEG של " +
            "החשבונית (לפי רשומות tx-intel, ללא הבחנת מהדורה), REGUH ו-REGUP של ריצת התשלום (רשומת F110). BSIK " +
            "(פריטי ספק פתוחים) ו-BSAK (מסולקים): ב-ECC טבלאות האינדקס שעליהן FBL1N מבוסס; ב-S/4HANA, לפי רשומת " +
            "FBL1N המצטטת את 'S4TWL - Data Model Changes in FIN', הן הוחלפו בתצוגות תאימות באותו שם ושורות " +
            "הפריטים מגיעות מ-ACDOCA.",
        },
        {
          he: "CDS, S/4HANA: I_MaterialDocumentItem (פריטי מסמך חומר; לפי מפת ה-CDS של הפרויקט מעל MSEG, MKPF " +
            "ו-MATDOC) מסומנת deprecated ב-S/4HANA 2021 לפי What's New 2021, ועמוד ה-VDM 'Material Document Item' " +
            "(2023) מציג את I_MaterialDocumentItem_2 כ-'the successor view for I_MaterialDocumentItem'. תצוגות " +
            "CDS להזמנה, לחשבונית ולתשלום אינן במילון ה-CDS של הפרויקט.",
          xrefs: ["cds:I_MaterialDocumentItem"],
        },
      ],
      integrationPoints: [
        {
          he: "תכנון (MRP): דרישות רכש נוצרות אוטומטית מ-MRP (רשומת ME51N; עמוד התהליך הרשמי).",
          xrefs: ["tx:ME51N"],
        },
        {
          he: "הנהלת חשבונות: MIGO קובעת חשבונות G/L דרך OBYC; MIRO כותבת מסמך FI/CO ומנקה GR/IR; F110 יוצרת " +
            "מסמכי תשלום ומקזזת (רשומות tx-intel). הרישום הלוגיסטי-חשבונאי המלא מתועד ברשומה " +
            "logistics-to-finance-postings-process.",
          xrefs: ["tx:MIGO", "tx:OBYC", "tx:MIRO", "tx:F110", "bp:logistics-to-finance-postings-process"],
        },
        {
          he: "ניהול איכות: מנת בדיקה בקבלה אם QM פעיל (מפת P2P); quality info record ברכש עשוי לחסום GR או " +
            "חשבונית (תקרית qm-procurement-blocks-gr-or-invoice). תהליך QM ברכש מתועד ברשומה " +
            "quality-in-procurement-process.",
          xrefs: ["tx:QA32", "tx:QI01", "bp:quality-in-procurement-process"],
        },
        {
          he: "בנק: F110 מפיקה קבצי DME/IDoc לבנק (רשומת F110).",
          xrefs: ["tx:F110"],
        },
        {
          he: "תנועות מלאי ורכש לתחזוקה: רשומות התהליך goods-movement-process ו-procure-to-pay-for-maintenance.",
          xrefs: ["bp:goods-movement-process", "bp:procure-to-pay-for-maintenance"],
        },
      ],
      interfaces: [
        {
          he: "דרישת רכש: BAPI_PR_CREATE; לפי רשומת function-intel, ב-S/4HANA קיימת חלופת OData בשם " +
            "API_PURCHASEREQ_PROCESS_SRV.",
          xrefs: ["fm:BAPI_PR_CREATE"],
        },
        {
          he: "קבלת טובין: BAPI_GOODSMVT_CREATE; לפי רשומת function-intel, חלופת OData בשם API_MATERIAL_DOCUMENT; " +
            "פריט הפישוט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM נוקב בו כחלופה לטרנזקציות ה-MB.",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE"],
        },
        {
          he: "כל BAPI כותב נסגר ב-BAPI_TRANSACTION_COMMIT (WAIT='X' לסנכרון).",
          xrefs: ["fm:BAPI_TRANSACTION_COMMIT", "bp:bapi-commit-discipline"],
        },
        {
          he: "מפת P2P מונה ממשקים לפי שלב: BAPI_REQUISITION_* לדרישה, ORDERS IDoc ו-API_PURCHASEORDER להזמנה, " +
            "INVOIC IDoc לחשבונית, PAYEXT / DMEE לתשלום; עמוד Invoice Processing (S/4HANA 2025 FPS01) מתאר " +
            "חשבוניות המתקבלות ב-EDI שהמערכת מנסה לרשום אוטומטית, ובשגיאה מעבדים אותן ידנית. BAPI_PO_CREATE1 " +
            "ו-BAPI_INCOMINGINVOICE_CREATE מתועדים ברשומות tx-intel ואינם במילון הפרויקט.",
        },
      ],
      outputs: [
        {
          he: "דרישת רכש משוחררת עם ייחוס חשבונאי (EBAN, EBKN).",
          xrefs: ["table:EBAN", "table:EBKN"],
        },
        {
          he: "הזמנת רכש משוחררת (EKKO/EKPO, אינן במילון הפרויקט).",
          xrefs: ["tx:ME21N", "tx:ME29N"],
        },
        {
          he: "מסמך חומר של הקבלה: ב-ECC ב-MKPF/MSEG, ב-S/4HANA ב-MATDOC בלבד לפי 'S4TWL - Data Model in " +
            "Inventory Management'; לצדו עדכון היסטוריית ההזמנה (EKBE).",
          xrefs: ["table:MKPF", "table:MSEG", "obj:material-document"],
        },
        {
          he: "מסמך חשבונית (RBKP/RSEG) ומסמך FI/CO מקביל (רשומת MIRO); בתיעוד S/4HANA 2025 FPS01 (Invoice " +
            "Processing) המערכת מציגה בעת הרישום את מספר מסמך החשבונית בניהול החומרים ואת מספר המסמך החשבונאי.",
          xrefs: ["tx:MIRO"],
        },
        {
          he: "מסמכי תשלום, קיזוז הפריטים הפתוחים וקבצי DME לבנק (רשומת F110).",
          xrefs: ["tx:F110"],
        },
      ],
      exceptions: [
        {
          he: "דרישה לא הומרה ב-ME59N: 'No suitable source of supply found', דגל 'Automatic PO' חסר ב-info record " +
            "או במאסטר הספק, או PR שלא שוחררה (רשומת tx-intel של ME59N).",
          xrefs: ["tx:ME59N", "tx:ME57"],
        },
        {
          he: "שחרור PO ב-ME29N נכשל: קוד שחרור מחוץ להרשאה, אסטרטגיה לא קיימת ל-PO (רשומת tx-intel של ME29N).",
          xrefs: ["tx:ME29N"],
        },
        {
          he: "מחיר 0 או שגיאת תמחור בהזמנה: condition record חסר, access sequence או תוקף תנאי; אבחון ב-ME23N " +
            "וב-MEK3 (תקרית pricing-condition-missing).",
          xrefs: ["tx:ME23N", "tx:MEK3"],
        },
        {
          he: "GR נדחה ב-MIGO: תקופת MM סגורה (M7 053), חוסר הרשאה לתנועה או למפעל, חשבון G/L לא נמצא ב-OBYC, " +
            "אצווה חסרה (רשומת tx-intel של MIGO).",
          xrefs: ["tx:MIGO", "tx:OBYC"],
        },
        {
          he: "GR כפול מממשק: מלאי ועלות כפולים; איתור ב-MB51, ביטול ב-MBST, ומפתח ייחודי בממשק (תקרית " +
            "duplicate-goods-receipt).",
          xrefs: ["tx:MB51", "tx:MBST", "fm:BAPI_GOODSMVT_CREATE"],
        },
        {
          he: "הרכיב שהתקבל נשאר במלאי בדיקת QM: Usage Decision לא בוצע; שחרור ב-QA11/QA32 (תקרית " +
            "qm-inspection-lot-block).",
          xrefs: ["tx:QA32", "tx:QA11"],
        },
        {
          he: "GR או חשבונית חסומים כי quality info record ברכש לא שוחרר או שה-control key חוסם לפי QM system של " +
            "הספק; תיקון ב-QI01/QI02 (תקרית qm-procurement-blocks-gr-or-invoice).",
          xrefs: ["tx:QI01", "tx:QI02"],
        },
        {
          he: "GR או חשבונית עם הפרש ערך לחומר במחיר תקן נכשלים כשחשבון PRD חסר ב-OBYC; התקרית מציינת את ההודעה " +
            "M8147 ומסמנת אותה לאימות ב-SE91 (תקרית prd-price-difference-account-missing).",
          xrefs: ["tx:OBYC", "tx:MIGO"],
        },
        {
          he: "חשבונית חסומה לתשלום: סטיית מחיר או כמות מעבר ל-tolerance, או GR חסר ב-GR-based IV; שחרור ב-MRBR " +
            "אחרי בירור (רשומת tx-intel של MIRO).",
          xrefs: ["tx:MIRO", "tx:MRBR"],
        },
        {
          he: "הודעת הצלחה אך מסמך החומר או ה-FI חסר: ה-Update נכשל; בדיקה וחזרה על ה-Update ב-SM13 (תקרית " +
            "update-termination-sm13).",
          xrefs: ["tx:SM13", "tx:MB51"],
        },
        {
          he: "ריצת F110 נכשלת: 'No valid payment method found', 'Payment method not allowed for vendor', 'House " +
            "bank/account determination failed', 'Items blocked for payment' (רשומת tx-intel של F110).",
          xrefs: ["tx:F110", "tx:FBZP"],
        },
        {
          he: "דוח CO ישן אינו תואם ל-Universal Journal: קורא COEP במקום ACDOCA; מפת P2P משייכת תקרית זו לשלב " +
            "התשלום (תקרית acdoca-coep-mismatch).",
          xrefs: ["table:ACDOCA"],
        },
      ],
      controls: [
        {
          he: "release strategy ל-PR נפרדת מזו של PO (רשומות tx-intel של ME51N ו-ME54N).",
          xrefs: ["tx:ME54N", "tx:ME29N"],
        },
        {
          he: "יצירת PO מתוך PR לשמירת שרשרת המסמכים (שיטת עבודה ברשומת ME21N).",
          xrefs: ["tx:ME21N"],
        },
        {
          he: "test run לפני המרה אוטומטית, וטיפול בדרישות ללא מקור ב-ME57 (שיטות עבודה ברשומת ME59N).",
          xrefs: ["tx:ME59N", "tx:ME57"],
        },
        {
          he: "GR-based invoice verification ו-tolerance keys, וטיפול בחשבוניות חסומות ב-MRBR (שיטות עבודה ברשומת " +
            "MIRO).",
          xrefs: ["tx:MIRO", "tx:MRBR"],
        },
        {
          he: "בדיקת ה-Proposal של F110 לפני ביצוע הריצה (שיטת עבודה ברשומת F110).",
          xrefs: ["tx:F110"],
        },
        {
          he: "מעקב אחרי דרישות פתוחות שלא הומרו או שלא שוחררו ב-ME5A.",
          xrefs: ["tx:ME5A"],
        },
        {
          he: "בדיקת כפילות (idempotency) בממשקי קבלת טובין (מניעה בתקרית duplicate-goods-receipt).",
          xrefs: ["fm:BAPI_GOODSMVT_CREATE"],
        },
      ],
      eccToS4: [
        {
          he: "S/4HANA, לפי רשומות tx-intel: ME51N, ME21N, MIGO ו-MIRO זמינות ב-S/4HANA; ME51 ו-ME21 הישנות " +
            "מסומנות deprecated, ו-MB01, MB1A, MB1B ו-MB1C מסומנות deprecated לטובת MIGO.",
          xrefs: ["tx:ME51N", "tx:ME21N", "tx:MIGO", "tx:MIRO"],
        },
        {
          he: "S/4HANA, לפי רשומות tx-intel של ME54N ו-ME29N: flexible workflow ויישומי Fiori לאישור ('Approve " +
            "Purchase Orders' ל-PO) מועדפים על השחרור הקלאסי.",
          xrefs: ["tx:ME54N", "tx:ME29N"],
        },
        {
          he: "S/4HANA 2025 FPS01 (help.sap.com): העמוד Process Purchase Orders ממפה את 'Create purchase order' " +
            "ל-ME21N, לצד ME22N, ME23N, ME56, ME57 ו-ME58; העמוד Process Purchase Requisition מונה את ME51N, " +
            "ME52N ו-ME53N.",
          xrefs: ["tx:ME21N", "tx:ME56", "tx:ME57", "tx:ME58", "tx:ME51N"],
        },
        {
          he: "S/4HANA 2025 FPS01 (עמוד Create Purchase Order - Advanced): ME21N, ME22N ו-ME23N הם 'a classic SAP " +
            "GUI for HTML app'; SAP ממליצה על יישום Manage Purchase Orders, והזמנה עם תכונה שהיישום אינו תומך בה " +
            "נפתחת ביישום הקלאסי.",
          xrefs: ["tx:ME21N", "tx:ME22N", "tx:ME23N"],
        },
        {
          he: "ECC ו-S/4HANA: הנושא Lists of Purchase Orders (loio זהה) מתועד בתיעוד SAP ERP 6.0 EHP8 " +
            "(6.18.latest) ובתיעוד S/4HANA 2025 FPS01 עם אותה שורה 'Purchase orders by material ME2M'.",
          xrefs: ["tx:ME2M"],
        },
        {
          he: "S/4HANA: פריט הפישוט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (רשימת 2023 FPS03) מונה את MB11 " +
            "בין טרנזקציות ה-MB שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE / BAPI_GOODSMVT_CANCEL; העמוד Goods " +
            "Movement (2025 FPS01) מונה את 'Goods Movement MIGO' ואת 'Goods Receipt from External Procurement " +
            "MIGO_GR'.",
          xrefs: ["tx:MIGO", "tx:MB11", "fm:BAPI_GOODSMVT_CREATE"],
        },
        {
          he: "ECC מול S/4HANA, מודל מסמך החומר: לפי 'S4TWL - Data Model in Inventory Management' (רשימת הפישוט " +
            "2025 FPS01, פריט 15.3.1), מודל SAP ERP 6.0 כולל 'MKPF for document header information and MSEG for " +
            "document item data', וב-S/4HANA 'Material document data will be stored in MATDOC only and not " +
            "anymore in MKPF and MSEG'; הטבלאות 'do still exist in S/4HANA as DDIC definition as well as database " +
            "object'. עמוד Archiving Material Documents (2025 FPS01) מוסיף שהתאימות לנתוני הטבלאות עוברת דרך CDS " +
            "compatibility views. קריאת מסמכי חומר מקוד מותאם: רשומה matdoc-read-through-compatibility.",
          xrefs: [
            "table:MKPF", "table:MSEG", "obj:material-document", "tx:MIGO", "bp:matdoc-read-through-compatibility",
          ],
        },
        {
          he: "S/4HANA, CDS של מסמך החומר: I_MaterialDocumentItem סומנה deprecated ב-S/4HANA 2021 ('The following " +
            "CDS views were deprecated in SAP S/4HANA 2021'), והיורשת היא I_MaterialDocumentItem_2 (עמוד ה-VDM " +
            "'Material Document Item', 2023).",
          xrefs: ["cds:I_MaterialDocumentItem"],
        },
        {
          he: "S/4HANA 2025 FPS01: יישום Fiori F0843 (Post Goods Receipt for Purchasing Document) לקבלה בהתייחסות " +
            "למסמכי רכש; MB03 מתועדת כטרנזקציית ההצגה של מסמך חומר ('Choose transaction MB03.').",
          xrefs: ["fiori:F0843", "tx:MB03"],
        },
        {
          he: "ECC מול S/4HANA, תשלום ופריטי ספק: ב-ECC ‏FBL1N מבוסס על BSIK (פתוחים) ו-BSAK (מסולקים); " +
            "ב-S/4HANA, לפי רשומות tx-intel של F110 ו-FBL1N המצטטות את 'S4TWL - Data Model Changes in FIN' (2025 " +
            "FPS01, 6.1.4), הטבלאות 'were removed and replaced by identically-named DDL SQL views, called " +
            "compatibility views' ושורות היומן ב-ACDOCA; F110 רושמת ל-Universal Journal עם יישום Fiori 'Manage " +
            "Automatic Payments' (F0770), ולצד FBL1N רשומת ה-tx-intel מציינת את 'Display Supplier Line Items' " +
            "כחלופה ואת 'Manage Supplier Line Items (F0712)' בשדה ה-Fiori.",
          xrefs: ["tx:F110", "tx:FBL1N", "table:ACDOCA"],
        },
      ],
      reference: {
        title: "Procurement in SAP S/4HANA (Sourcing and Procurement, SAP S/4HANA 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/287eb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תהליך רשמי (loio 287eb65334e6b54ce10000000a174cb4, versionId 2025.001) שגופו נקרא: מחזור הרכש " +
          "מקביעת הצורך ועד אימות החשבונית. שלב התשלום (F110) אינו מתואר בעמוד ומתועד ברשומות המאגר. העמוד אינו " +
          "מדפיס מזהה scope item.",
      },
    },
    xrefs: [
      "tx:ME51N", "tx:ME52N", "tx:ME53N", "tx:ME54N", "tx:ME55", "tx:ME56", "tx:ME57", "tx:ME59N", "tx:ME21N",
      "tx:ME22N", "tx:ME23N", "tx:ME28", "tx:ME29N", "tx:ME2M", "tx:ME5A", "tx:MIGO", "tx:MB03", "tx:MB11",
      "tx:MIRO", "tx:MRBR", "tx:F110", "tx:FBL1N", "table:EBAN", "table:EBKN", "table:MKPF", "table:MSEG",
      "table:ACDOCA", "fm:BAPI_PR_CREATE", "fm:BAPI_GOODSMVT_CREATE", "fm:BAPI_TRANSACTION_COMMIT", "fiori:F0843",
      "enh:exit:MBCF0002", "enh:badi:MB_MIGO_BADI", "bp:bapi-commit-discipline", "bp:goods-movement-process",
      "bp:procure-to-pay-for-maintenance", "obj:material-document", "cds:I_MaterialDocumentItem",
      "bp:matdoc-read-through-compatibility", "bp:logistics-to-finance-postings-process",
      "bp:quality-in-procurement-process", "tx:FB60", "tx:FBZP", "tx:OBYC",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Procurement in SAP S/4HANA | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/287eb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 287eb65334e6b54ce10000000a174cb4, 2025 FPS01, נקרא דרך sap-help-body.mjs, " +
          "deliverable 40374862, build 1807): 'External procurement in the SAP S/4HANA system centers around a " +
          "general cycle of activities'. השלבים: Determination of Requirements ('You can enter purchase " +
          "requisitions yourself, or they can be generated automatically by the materials planning and control " +
          "system'), Source Determination, Supplier Selection and Comparison of Quotations, Purchase Order " +
          "Processing, Purchase Order Follow-Up, Goods Receiving and Inventory Management ('Goods Receiving " +
          "personnel can confirm the receipt of goods simply by entering the purchase order number'), Invoice " +
          "Verification ('The accounts payable clerk is notified of quantity and price variances because the " +
          "system has access to purchase order and goods receipt data'). העמוד אינו נוקב בקודי טרנזקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Requisition (MM-PUR)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/ed06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש (Materials Management (MM), S/4HANA on-premise 2025 FPS01, loio " +
          "ed06b753128eb44ce10000000a174cb4) מתארת את התפקיד Process Purchase Requisition (MM-PUR), שם טכני " +
          "SAP_MM_PUR_PURCHASEREQUISITION, ובקטע 'Activities in Materials Management' מונה: 'Create purchase " +
          "requisition ME51N', 'Change purchase requisition ME52N', 'Display purchase requisition ME53N' (מתוך " +
          "ה-snippet). הקטע מתעד את ME51N כפעילות בתפקיד ב-S/4HANA 2025 FPS01; לא נקרא גוף הדף המלא. (אומת ברשומת " +
          "tx:ME51N)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "בטבלת הפעילויות של Materials Management במהדורת 2025 FPS01 (versionId 2025.001, loio " +
          "8307b753128eb44ce10000000a174cb4) הפעילות 'Create purchase order' ממופה לטרנזקציה ME21N, לצד 'Create " +
          "purchase order - vendor unknown' ME25, 'Change purchase order' ME22N ו-'Display purchase order' ME23N, " +
          "וכן ME56, ME57 ו-ME58; כלשון הסניפט: 'It enables you not only to create and change purchase orders, " +
          "but also to convert requisitions into orders'. ME21N היא מיפוי הפעילות הסטנדרטי ליצירת הזמנת רכש " +
          "ב-S/4HANA On-Premise. (אומת ברשומת tx:ME21N)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Purchase Order - Advanced (ME21N, ME22N, ME23N) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/28f492016a52485784d85b7a31f7542d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף הנושא (loio 28f492016a52485784d85b7a31f7542d) נקרא במלואו דרך שירות התוכן של הפורטל " +
          "(http.svc/pagecontent, deliverable_id 40374862, buildNo 1807, 16,990 תווים אחרי ניקוי HTML). העמוד " +
          "קובע: 'With this app, you can create, change, and display purchase orders on a single screen'; 'These " +
          "modes correspond to the transactions ME21N, ME22N, and ME23N'; 'The Create Purchase Order - Advanced " +
          "app is a classic SAP GUI for HTML app'. תחת Recommendation: 'SAP recommends that you use the Fiori app " +
          "Manage Purchase Orders to create, change, and display purchase orders', ובהמשך: 'If a purchase order " +
          "has a feature that is not supported by the Fiori app, this is indicated by the icon \"i\" (='Advanced' " +
          "Purchase Order) in the list. In this case, you can jump directly from the list in the Manage Purchase " +
          "Orders app to the relevant purchase order that is then opened automatically in the classic Create " +
          "Purchase Order - Advanced app'. כלומר ME21N נשארת הנתיב לתכונות שאין להן כיסוי ב-Fiori. (אומת ברשומת " +
          "tx:ME21N)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Lists of Purchase Orders (MM-PUR)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "העמוד 'Lists of Purchase Orders (MM-PUR)' (SAP S/4HANA 2025 FPS01, נושא Materials Management " +
          "(MM)) מציג את טבלת הפעילויות של הדיווח על הזמנות רכש ובה השורה: 'Purchase orders by material ME2M', " +
          "לצד ME2L (לפי ספק), ME2K (לפי הקצאת חשבון), ME2J (לפי פרויקט), ME2C (לפי קבוצת חומרים), ME2B, ME2N " +
          "ו-ME2W. הראיה מבססת ש-ME2M מתועדת כטרנזקציית הדיווח 'הזמנות רכש לפי חומר' במהדורת S/4HANA העדכנית " +
          "שנבדקה. (אומת ברשומת tx:ME2M)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Lists of Purchase Orders (MM-PUR)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "אותו נושא בדיוק (loio זהה 8d06b753128eb44ce10000000a174cb4) מתועד גם בתיעוד SAP ERP 6.0 EHP8 " +
          "Latest, עם אותה שורת טבלה: 'Purchase orders by material ME2M'. הראיה מבססת ש-ME2M מתועדת באופן זהה גם " +
          "בצד ה-ECC, ולא נמצא שינוי בין שתי המהדורות בתיאור הפעילות הזו. (אומת ברשומת tx:ME2M)",
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
        claim: "רשומת החיפוש של help.sap.com לגרסת On-Premise 2025 FPS01 (מדריך Materials Management) מונה תחת " +
          "'Activities in Materials Management' את הצמדים 'Goods Movement MIGO', 'Goods Issue MIGO_GI', 'Goods " +
          "Receipt from External Procurement MIGO_GR' ו-'Goods Receipt for Order'. כלומר MIGO ווריאנטי הכניסה שלה " +
          "מתועדים במהדורה הנוכחית כקודי טרנזקציה לתנועות סחורה; באותה רשימה מופיעים גם MB1B (Transfer Posting), " +
          "MBST (Cancel Material Document), MBSU ו-MB90. (אומת ברשומת tx:MIGO)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 FPS1-3 · item 27.6 S4TWL - AVAILABILITY OF " +
          "TRANSACTIONS IN MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_TX_02,
        claim: "MB11 נמנית בין טרנזקציות ה-MB שהוחלפו בטרנזקציית המסך האחד MIGO או ב-BAPI_GOODSMVT_CREATE / " +
          "BAPI_GOODSMVT_CANCEL; קודי הטרנזקציה עדיין קיימים אך קריאה מהתפריט מעלה הודעת שגיאה, ואין להשתמש בהם " +
          "בקוד לקוח ('shall not be used in customer coding'). (מקוצר מהראיה MB11_SIMPL של רשומת tx:MB11 " +
          "ב-data/verification/transactions.ts; רשימת 2023 FPS03, מהדורה שונה מעמודי 2025 FPS01 ברשומה זו.)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Post Goods Receipt for Purchasing Document | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/9ddf815494758c4ce10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TX_02,
        claim: "רשומת החיפוש של help.sap.com לגרסת On-Premise 2025 FPS01 (מדריך MM-IM) קובעת: 'Post Goods Receipt " +
          "for Purchasing Document App ID: F0843 With this app, you can post the receipt of goods with reference " +
          "to the different types of purchasing documents'. כלומר המזהה F0843 שייך ליישום קבלת סחורה בהתייחסות " +
          "למסמך רכש, ולא ליישום Post Goods Movement. (אומת ברשומת fiori:F0843)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Displaying Exchange Data in a Material Document and in an Accounting Document | EXG - " +
          "Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/7e81cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_01,
        claim: "הנוהל להצגת מסמך חומר של קבלת טובין מנחה: 'Choose transaction MB03.'; MB03 היא טרנזקציית הצגה " +
          "מתועדת בתיעוד ה-On-Premise של 2025 FPS01, בדפים שצוטטו ברשומה זו. (אומת ברשומת tx:MB03; המקף הארוך " +
          "במקור הוחלף בנקודה-פסיק)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud " +
          "Private Edition 2025 - Feature Pack Stack 1 · item 15.3.1 S4TWL - Data Model in Inventory Management " +
          "(MM-IM), p. 1459",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TB_15,
        claim: "פריט 15.3.1 ברשימת הפישוט של 2025 FPS1 (גרסת מסמך 1.36, עמ' 1459 ואילך, נקרא כטקסט מלא מקובץ " +
          "ה-PDF) חוזר על אותו נוסח: מודל SAP ERP 6.0 מורכב מ-'MKPF for document header information and MSEG for " +
          "document item data', וב-S/4HANA 'Material document data will be stored in MATDOC only and not anymore " +
          "in MKPF and MSEG'. הטבלאות 'do still exist in S/4HANA as DDIC definition as well as database object', " +
          "ובשורת MKPF שבטבלת הפריט רשומים NSDM_DDL_MKPF ו-NSDM_MIG_MKPF ועמודת תצוגת נתוני האב ריקה. הערת " +
          "ה-Business Impact היא אותה הערה, 0002206980 בכותרת 'Material Inventory Managment: change of data model " +
          "in S/4HANA'. רכיב היישום עודכן ל-MM-IM-GF-MIG לעומת MM-IM-GF ברשימת 2023 FPS3. (אומת ברשומת " +
          "table:MKPF, שורת MKPF_SIMPL2025)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_01,
        claim: "'There is a new single table MATDOC instead of the existing tables MKPF and MSEG'; מסמך חומר " +
          "מורכב מרשומות MATDOC ומכיל 'a maximum 500 items' (כלשון העמוד). (אומת ברשומת table:MSEG, שורת " +
          "MSEG_ARCHIVING)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_01,
        claim: "'Compatibility with the data in the tables of the SAP S/4HANA 6.0 product is guaranteed by Core " +
          "Data Service (CDS) compatibility views' [כך בלשון הסניפט שהוחזר משירות החיפוש]. (אומת ברשומת " +
          "table:MSEG)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of CDS Views | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6eac4f4b1c024fc5a0d48c51ca66e83c.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE_TX_02,
        claim: "עמוד What's New לגרסת SAP S/4HANA 2021 קובע: 'The following CDS views were deprecated in SAP " +
          "S/4HANA 2021: Material Document Header (I_MaterialDocumentHeader) Material Document Item " +
          "(I_MaterialDocumentItem)'. הסניפט מציב את I_MaterialDocumentItem_2 לצד I_MaterialDocumentItem, בנימוק " +
          "'To improve the runtime performance and reduce the memory consumption in the database'. (אומת ברשומת " +
          "cds:I_MaterialDocumentItem)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Document Item | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/14305f6e8cb842bbb1647ffd5a30ca31.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE_TX_02,
        claim: "עמוד ה-VDM הרשמי 'Material Document Item' נושא את השם הטכני I_MaterialDocumentItem_2, עם " +
          "'Analytical Data Category Dimension' ו-'Status Released', וקובע: 'This view is the successor view for " +
          "I_MaterialDocumentItem'. השאלה העסקית שהעמוד מונה: 'What are the line items of posted material " +
          "documents?'. (אומת ברשומת cds:I_MaterialDocumentItem)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Invoice Processing | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/ab6fb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio ab6fb6531de6b64ce10000000a174cb4, 2025 FPS01, נקרא דרך sap-help-body.mjs, " +
          "deliverable 40374862, build 1807): Invoice Processing 'is situated at the end of the logistics supply " +
          "chain that includes purchasing and invoice verification'; 'When the invoice is posted, the invoice " +
          "data is saved in the system. The system updates the data saved in the invoice documents in materials " +
          "management and financial accounting'; 'It completes the material procurement process, from the " +
          "purchase requisition, via purchasing, to goods receipt'. סוגי החשבוניות: 'Invoices with purchase order " +
          "reference', 'Invoices with goods receipt reference', 'Invoices without purchase order reference'; דרכי " +
          "עיבוד נוספות: Document Parking, Invoice Verification in the Background, Evaluated Receipt Settlement " +
          "(ERS) ו-'Invoices Received via EDI'. בסוף: 'the system displays invoice document numbers generated in " +
          "materials management, and the document number of the accounting document in financial accounting'. " +
          "העמוד אינו נוקב בקודי טרנזקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Bank Account Alias Enabled in Additional Transactions | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/30c5d8e26bcf46d6af00c27a68b081da.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 30c5d8e26bcf46d6af00c27a68b081da, What's New in SAP S/4HANA 2022, versionId " +
          "2022.000, נקרא דרך sap-help-body.mjs): 'In addition to transaction F110 ( Automatic Payment " +
          "Transactions ) and Fiori app Manage Automatic Payments , bank account alias is enabled in the " +
          "following transactions', עם Scope Item J60 (Accounts Payable) ורכיב FI-FIO-AP. העמוד מעיד ש-F110 " +
          "ויישום Manage Automatic Payments קיימים זה לצד זה ב-S/4HANA 2022; הוא אינו עמוד תהליך P2P.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת התהליך 'רכש לתשלום (P2P)' של הפרויקט (PROCESS_MAPS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "מדרישת רכש דרך הזמנה, קבלה, חשבונית ועד תשלום. דרישת רכש: ME51N, ME53N, טבלאות EBAN ו-EBKN, Fiori " +
          "'Manage Purchase Requisitions', ממשק BAPI_REQUISITION_*, בדיקה 'PR נוצרת עם ייחוס חשבונאי תקין'. הזמנת " +
          "רכש: ME21N, ME22N, ME23N, טבלאות EKKO ו-EKPO, Fiori 'Create Purchase Order', ממשקים 'ORDERS IDoc' " +
          "ו-API_PURCHASEORDER, בדיקה 'PO עם תנאי מחיר; שחרור (release strategy)'. קבלת טובין: MIGO, טבלאות " +
          "MATDOC ו-MSEG, Fiori 'Post Goods Movement', ממשק BAPI_GOODSMVT_CREATE, בדיקה 'GR 101 מעדכן מלאי; QM " +
          "lot אם פעיל'. חשבונית (LIV): MIRO, טבלאות RBKP ו-RSEG, Fiori 'Verify Supplier Invoice', ממשק 'INVOIC " +
          "IDoc', בדיקה '3-way match (PO/GR/Invoice); חסימות MRBR'. תשלום: F110, FBL1N, טבלאות BSIK ו-ACDOCA, " +
          "Fiori 'Manage Automatic Payments', ממשק 'PAYEXT / DMEE', בדיקה 'ריצת תשלומים F110; קיזוז פריטים " +
          "פתוחים'. תקריות לפי שלב: subcontracting-components, pricing-condition-missing, goods-movement-stock, " +
          "duplicate-goods-receipt, qm-inspection-lot-block, update-termination-sm13, acdoca-coep-mismatch.",
        verificationLevel: "repository_verified",
        repoRef: "data/processes.ts#p2p",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME51N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME51N היא טרנזקציית Enjoy ליצירת PR בטבלאות EBAN ו-EBKN; PR נוצרת ידנית ב-ME51N או אוטומטית " +
          "מ-MRP, עם document type, account assignment (K/F/A) ו-source of supply אופציונלי; PR משמשת בסיס " +
          "ל-assign+process (ME57) או להמרה ל-PO (ME59N); release strategy ל-PR נפרדת מזו של PO. שגיאות נפוצות: " +
          "account assignment חסר, חומר או קבוצת חומרים חסרים, plant חסר. משתמשים: מתכנן, מחסנאי, מבקש פנימי, " +
          "קניין. ממשקים ברשומה: BAPI_PR_CREATE. שדה s4: זמינה ב-S/4HANA עם Fiori 'Create Purchase Requisition'; " +
          "ME51 הישן deprecated.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME51N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME54N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME54N משחררת PR בודדת לפי release strategy של PR, כולל ביטול שחרור; ME55 לשחרור קולקטיבי. שגיאות " +
          "נפוצות: 'Release code מחוץ להרשאה', אסטרטגיה לא נמצאה ל-PR; טעות נפוצה: בלבול בין release של PR " +
          "(ME54N) ל-PO (ME29N); שיטת עבודה: release strategy ל-PR נפרדת מ-PO. משתמשים: מנהל רכש, מאשר, ראש " +
          "מחלקה. שדה s4: זמין ב-S/4HANA; flexible workflow ו-Fiori 'My Inbox' / 'Approve Requisitions' מועדפים.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME54N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME56",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME56 מקצה מקור אספקה (ספק או הסכם מסגרת) לדרישות רכש שלא הוקצה להן מקור, על בסיס Source List " +
          "(ME01) או רשומות מידע רכש (ME11); מקצה מקור ללא יצירת PO, בשונה מ-ME57, וחיונית לזרימה אוטומטית עם " +
          "ME59N הדורשת מקור חד-משמעי. תנאים מוקדמים: Source List או Info Records קיימים, דרישות רכש פתוחות ללא " +
          "מקור. משתמשים: קניין, מתכנן רכש. שדה s4: זמין ב-S/4HANA ללא שינוי מהותי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME56",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME59N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME59N ממירה PR ל-PO אוטומטית עבור PR עם unique source assigned; דורשת info record עם דגל " +
          "'automatic PO', דגל 'automatic PO' במאסטר הספק ו-source list עם MRP relevant; מאפשרת test run; 'PR ללא " +
          "source ייכשלו וניתן לטפל ב-ME57'. כותבת EKKO/EKPO; BAPI_PO_CREATE1 ברשומה. שגיאות נפוצות: 'No suitable " +
          "source of supply found', דגל 'Automatic PO' חסר, 'PR לא משוחרר (release strategy)'. טעויות: הרצה ללא " +
          "test run, התעלמות מ-PR שנכשלו. משתמשים: קניין, מנהל רכש. שדה s4: זמין ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME59N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME21N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME21N היא טרנזקציית Enjoy ליצירת PO השומרת ב-EKKO/EKPO ומשתמשת ב-BAPI_PO_CREATE1 לתהליך הרקע; " +
          "ניתן ליצור עם reference ל-PR, RFQ, חוזה או PO קיים. שיטות עבודה: ליצור PO מתוך PR לשמירה על שרשרת " +
          "מסמכים, להגדיר release strategy לבקרת תקציב; טעות נפוצה: 'אי שימוש ב-reference ל-PR וכך כפילות " +
          "נתונים'. שדה s4: נשארת הטרנזקציה המרכזית ב-S/4HANA; ME21 הישן (GUI לא-Enjoy) deprecated.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME21N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME29N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME29N משחררת PO בודד במסך Enjoy לפי אסטרטגיית האישור, כולל ביטול שחרור; ME28 לאישור קולקטיבי. " +
          "שגיאות נפוצות: 'Release code מחוץ להרשאה', אסטרטגיה לא קיימת ל-PO, PO כבר משוחרר. משתמשים: מנהל רכש, " +
          "מאשר, קניין בכיר. שדה s4: 'זמין ב-S/4HANA. Fiori Approve Purchase Orders / flexible workflow מועדפים " +
          "לתהליך מודרני'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME29N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): ME5A",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ME5A הוא דוח רשימת דרישות רכש (EBAN/EBKN), שימושי לזיהוי PR פתוחות שלא הומרו או PR שלא שוחררו; " +
          "הרשומה מבחינה בינו לבין דוחות ההזמנות ME2M/ME2L/ME2N. שדה s4: זמין ב-S/4HANA; Fiori 'Manage Purchase " +
          "Requisitions' ו-Embedded Analytics חלופה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME5A",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): MIGO",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MIGO היא טרנזקציה מאוחדת לתנועות מלאי; השדה descTech, ללא ציון מהדורה: 'כותבת MKPF (header) / " +
          "MSEG (items)'; קבלה מ-PO (101) מעדכנת PO history (EKBE) ומבצעת GR/IR clearing; חשבונות ה-G/L נקבעים " +
          "דרך OBYC; BAPI_GOODSMVT_CREATE לרקע; הרחבות MB_MIGO_BADI ו-MBCF0002. שגיאות נפוצות: תקופת MM סגורה (M7 " +
          "053), חוסר הרשאה לתנועה או למפעל, חשבון G/L לא נמצא ב-OBYC, אצווה חסרה. אחריה: MIRO, MB03. משתמשים: " +
          "מחסנאי, מנהל מחסן, פקיד מלאי. שדה s4: נשארת מרכזית ב-S/4HANA; MB01/MB1A/MB1B/MB1C deprecated לטובת " +
          "MIGO; שדה fiori: 'Post Goods Receipt for Purchasing Document' עם המזהה F0843A (המקף הארוך במקור " +
          "הושמט). שדה s4Delta: ב-S/4HANA 'Material document data will be stored in MATDOC only and not anymore " +
          "in MKPF and MSEG' (פריט הפישוט 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT (MM-IM)', 2025 FPS01, " +
          "15.3.1); MKPF/MSEG נשארות כהגדרות DDIC.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIGO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): MIRO",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "MIRO מבצעת Logistics Invoice Verification, כותבת RBKP/RSEG ומסמך FI/CO, מבצעת 3-way match מול " +
          "EKKO/EKPO/EKBE, חוסמת תשלום על price/quantity variance מעבר ל-tolerance (OMR6) ומנקה את חשבון GR/IR; " +
          "שונה מ-FB60 (חשבונית FI ללא PO); BAPI_INCOMINGINVOICE_CREATE ברשומה. שגיאות נפוצות: חשבונית לא מאוזנת, " +
          "סטייה מעבר ל-tolerance, תקופה סגורה, GR חסר ל-GR-based IV. שיטות עבודה: GR-based invoice verification, " +
          "הגדרת tolerance keys, טיפול ב-blocked invoices ב-MRBR. משתמשים: הנהלת חשבונות ספקים (AP), פקיד " +
          "חשבוניות. שדה s4: נשארת מרכזית ב-S/4HANA; Fiori 'Create Supplier Invoice'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIRO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): F110",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "F110 היא תוכנית התשלומים האוטומטית: Parameters, Proposal, Payment Run, Print/DME; בוחרת open " +
          "items לפי due date, payment method ובנק, יוצרת payment documents ומקזזת, ומפיקה קבצי DME/IDoc לבנק; " +
          "נשענת על REGUH/REGUP ועל תצורת FBZP. תנאים מוקדמים: FBZP מוגדר, bank details במאסטר ספק, פריטים פתוחים " +
          "בשלים. שגיאות נפוצות: 'No valid payment method found', 'Payment method not allowed for vendor', 'House " +
          "bank/account determination failed', 'Items blocked for payment'. שיטת עבודה: 'בדוק proposal לפני run'. " +
          "משתמשים: צוות תשלומים, צוות אוצר, מנהל AP. שדה s4: זמינה ב-S/4HANA, Fiori 'Manage Automatic Payments' " +
          "(F0770), רושמת ל-Universal Journal. שדה s4Delta: ב-S/4HANA BSIK/BSAK 'were removed and replaced by " +
          "identically-named DDL SQL views, called compatibility views' ושורות היומן ב-ACDOCA (פריט 'S4TWL - DATA " +
          "MODEL CHANGES IN FIN', 2025 FPS01, 6.1.4).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#F110",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL): FBL1N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "FBL1N הוא דוח פריטי ספק המבוסס על BSIK (פתוחים) ו-BSAK (מסולקים); שדה consultant: 'ב-S/4HANA " +
          "ה-line items נשענים על ACDOCA אך ה-tcode עדיין עובד דרך compatibility views'. שדה s4: זמינה ב-S/4HANA " +
          "דרך compatibility views על ACDOCA; Fiori 'Display Supplier Line Items' / 'Supplier Balances' היא " +
          "החלופה המומלצת; שדה fiori: 'Manage Supplier Line Items (F0712)'. שדה s4Delta: ב-S/4HANA טבלאות " +
          "הסיכומים והאינדקס (BSIK/BSAK) 'were removed and replaced by identically-named DDL SQL views, called " +
          "compatibility views': קריאה עובדת כבעבר וכתיבה הוסרה; שורות היומן ב-ACDOCA (פריט הפישוט 'S4TWL - DATA " +
          "MODEL CHANGES IN FIN', 2025 FPS01, 6.1.4).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#FBL1N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הפונקציות של הפרויקט (FUNCTION_INTEL): BAPI_PR_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BAPI_PR_CREATE יוצר דרישת רכש ומחזיר את מספרה (EBAN); ECC: 'זמין ב-ECC'; S/4: 'זמין ב-S/4HANA; " +
          "חלופה: API_PURCHASEREQ_PROCESS_SRV'. כשלים: קבוצת רכש חסרה, קטגוריית פריט שגויה; קשור ל-ME21N ו-ME51N " +
          "ולטבלאות EBAN ו-EBKN.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_PR_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הפונקציות של הפרויקט (FUNCTION_INTEL): BAPI_GOODSMVT_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BAPI_GOODSMVT_CREATE יוצר תנועת מלאי לפי סוג תנועה; GOODSMVT_CODE (01=GR PO); פלט " +
          "MATERIALDOCUMENT; ECC: 'זמין ב-ECC'; S/4: 'זמין ב-S/4HANA. חלופה: OData API_MATERIAL_DOCUMENT'. כשלים: " +
          "מלאי חסר, תקופת רישום סגורה (MMPV), אצווה חסרה. תרחיש QA: 'ודא MATERIALDOCUMENT + COMMIT, בדוק ב-MB51'.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_GOODSMVT_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת ה-BAPI של הפרויקט (sweep): BAPI_TRANSACTION_COMMIT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "BAPI_TRANSACTION_COMMIT מאשר את ה-LUW, מסיים ומקבע את כתיבות ה-BAPI שקדמו לו; לפי הרשומה 'חובה " +
          "אחרי כל BAPI כותב'; WAIT='X' לסנכרון.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.sweep.ts#BAPI_TRANSACTION_COMMIT",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: pricing-condition-missing",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תנאי תמחור חסר בהזמנת רכש או מכירה: מחיר 0 או שגיאה; סיבות: condition record חסר (MEK1/VK11), " +
          "access sequence, תוקף תנאי, pricing procedure; אבחון ב-ME23N, VA03 ו-MEK3; תיקון: יצירת condition " +
          "record ותיקון access sequence או תוקף.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#pricing-condition-missing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: duplicate-goods-receipt",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "קבלת טובין נרשמה פעמיים ומלאי ועלות כפולים; סיבות: לחיצה כפולה או ממשק ללא idempotency, אין בדיקת " +
          "כפילות; אבחון ב-MB51, MIGO ו-SM13; תיקון: ביטול התנועה הכפולה (MBST) והוספת בדיקת כפילות בממשק; מניעה: " +
          "idempotency בממשקים; פונקציה BAPI_GOODSMVT_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext3.ts#duplicate-goods-receipt",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-inspection-lot-block",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "GR חסום במלאי בדיקת QM: הרכיב במלאי בדיקה ולא במלאי חופשי; סיבות: QM Inspection פעיל, Usage " +
          "Decision לא בוצע; אבחון ב-QA32, QA33, MMBE; תיקון: Usage Decision (QA11/QA32) לשחרור למלאי חופשי.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#qm-inspection-lot-block",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: qm-procurement-blocks-gr-or-invoice",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "GR או חשבונית להזמנת רכש חסומים כי בקרת QM ברכש מדווחת שהספק או החומר לא משוחרר לפעולה; סיבות: " +
          "quality info record חסר או לא משוחרר, QM system של הספק נמוך מהנדרש ב-control key, תקופת השחרור פגה; " +
          "תיקון: יצירה או שחרור quality info record (QI01/QI02) לתקופה תקפה.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#qm-procurement-blocks-gr-or-invoice",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: prd-price-difference-account-missing",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "לחומר בניהול מחיר תקן (S), GR או חשבונית עם הפרש ערך לא נרשמים כי OBYC key PRD ללא חשבון למחלקת " +
          "ההערכה; שגיאה M8147 (מסומנת ברשומה לאימות ב-SE91); אבחון ב-MIGO, OBYC, MB51; תיקון: תחזוקת חשבון PRD " +
          "ב-OBYC ורישום מחדש.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext.ts#prd-price-difference-account-missing",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: update-termination-sm13",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "המשתמש קיבל הודעת הצלחה לתנועה אך מסמך החומר או ה-FI אינו קיים; סיבות: משימת Update (V1/V2) " +
          "נכשלה, ייחוס OBYC חסר, תקופה סגורה; אבחון ב-SM13, ST22, OBYC, MB51; תיקון: תיקון שורש השגיאה וחזרה על " +
          "ה-Update מ-SM13, 'לא רישום מחדש ידני'.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting.ts#update-termination-sm13",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז התקלות של הפרויקט: acdoca-coep-mismatch",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "דוח CO ישן לא תואם ל-Universal Journal ב-S/4: הדוח קורא COEP במקום ACDOCA, או Ledger/Currency " +
          "שונים; תיקון: הסבת דוחות ל-ACDOCA או CDS.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#acdoca-coep-mismatch",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט (cds-map): I_MaterialDocumentItem",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "I_MaterialDocumentItem, 'פריטי מסמך חומר', מעל הטבלאות MSEG, MKPF ו-MATDOC, עם תצוגת הצריכה " +
          "C_MaterialDocumentItem ויישום Fiori 'Material Documents Overview'.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaterialDocumentItem",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט (Sourcing and Procurement with SAP S/4HANA), פרק 5 'Operational " +
          "Procurement', סעיף 5.4 'Purchase Order Processing'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרת הסעיף מאשרת שהספר מתעד את עיבוד הזמנות הרכש בפרק הרכש התפעולי (לצד 5.3 Requirements " +
          "Processing); הפניית קריאה, לא מקור לטענה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#5.4",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט, פרק 7 'Inventory Management', סעיף 7.3.1 'Goods Receipts'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרת הסעיף מאשרת שהספר מתעד את קבלת הטובין תחת Goods Movements; הפניית קריאה, לא מקור לטענה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#7.3.1",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט, פרק 12 'Invoice and Payables Management', סעיף 12.2 'Invoice " +
          "Processing'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרת הסעיף מאשרת שהספר מתעד את עיבוד החשבוניות (לצד 12.3 Accounts Payable); הפניית קריאה, לא " +
          "מקור לטענה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#12.2",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט, פרק 6 'Automated and Direct Procurement', סעיף 6.4 'Contract and " +
          "Source Determination'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרת הסעיף ותתי-הסעיפים (6.4.1 Purchasing Information Record, 6.4.2 Source List, 6.4.3 Quota " +
          "Arrangement) מאשרים שהספר מתעד את קביעת המקור; הפניית קריאה, לא מקור לטענה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#6.4",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט, פרק 12 'Invoice and Payables Management', סעיף 12.3.1 'Supplier " +
          "Payment Processing'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרת הסעיף מאשרת שהספר מתעד את עיבוד התשלומים לספקים תחת 12.3 Accounts Payable; הפניית קריאה, לא " +
          "מקור לטענה.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#12.3.1",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "הרשומה מתעדת את הזרימה הכללית של רכש עד תשלום; הווריאנטים המקושרים הם procure-to-pay-for-maintenance " +
      "ו-goods-movement-process, והרישום החשבונאי המפורט ב-logistics-to-finance-postings-process. טיוטה חוזרת " +
      "אחרי הדחייה של 2026-09-24: (1) MKPF/MSEG מיוחסות ל-ECC בכל מקום (שלב 6, tables[1], outputs[2]), וצד " +
      "S/4HANA מצטט בשם את 'S4TWL - Data Model in Inventory Management' (2025 FPS01, פריט 15.3.1; שורת " +
      "MKPF_SIMPL2025 הועתקה מ-data/verification/tables.ts), עם שורות Archiving Material Documents לתאימות דרך " +
      "CDS; השינוי נוסף ל-eccToS4. רשומת tx-intel של MIGO אומרת 'כותבת MKPF (header) / MSEG (items)' בלי מהדורה, " +
      "ושדה s4Delta שלה מפנה לאותו פריט פישוט; (2) הערות החיפוש תוקנו (להלן); (3) ניסוח MB03 מפנה לרשומת tx:MB03; " +
      "(4) BSIK מיוחסת ל-ECC, וצד S/4HANA לפי רשומת FBL1N ('S4TWL - Data Model Changes in FIN', ACDOCA דרך תצוגות " +
      "תאימות). חיפושים (scripts/sap-help-search.mjs, SAP_S4HANA_ON-PREMISE, 2026-09-24): 'procure to pay' (21 " +
      "תוצאות): התוצאה הראשונה 'Materials Management: Procure to Pay' (loio 6028d9520ed8471faf16e3d899598c7b, " +
      "2025.001, deliverable Logistics) היא עמוד business function ולא עמוד תהליך; רשומת ה-scope item של Ariba " +
      "באותו חיפוש ('Procure to Pay with SAP Ariba Buying and Invoicing', loio d56459607c214c86acc400fd830b2bae, " +
      "2025.001) מסומנת deprecated ואינה התהליך הכללי; מזהה ה-scope item שלה אינו נכתב כאן כי אינו מופיע בשורת " +
      "evidence. 'Procurement of Direct Materials' (21 תוצאות): רשומות What's New של הפריט Procurement of Direct " +
      "Materials במהדורות 1709, 1809.000 ו-100, ובמהדורות 1909.000 ו-2020.000 אותו שם עם מזהה scope item " +
      "בסוגריים; שתי תוצאות 2023.000 הן נושאים אחרים ('Enterprise Search Function for Customer Fields in Supplier " +
      "Invoices', 'Purchase Requisition Events'); בתוצאות מופיע גם עמוד 2025.001 בשם 'Procurement' (loio " +
      "56be0913bd224e218bbd83308039fafb, deliverable Retail), שגופו נקרא והוא עמוד סקירה של פתרונות רכש ב-Retail " +
      "בלי שלבי תהליך, ולכן לא נבחר כ-reference. מזהה ה-scope item שבכותרות 1909 ו-2020 אינו נכתב ברשומה: הוא " +
      "מודפס ברשומות What's New ישנות שאינן מצוטטות, ולא בעמוד תהליך של 2025. 'purchase requisition to purchase " +
      "order goods receipt invoice verification process' (21 תוצאות) ו-'Procurement in SAP S/4HANA' (21 תוצאות) " +
      "החזירו את 'Procurement in SAP S/4HANA' (loio 287eb65334e6b54ce10000000a174cb4, 2025.001), שגופו נקרא ומתאר " +
      "את מחזור הרכש עד אימות החשבונית; הוא ה-reference. 'Invoice Processing' החזיר את עמוד Invoice Processing " +
      "(loio ab6fb6531de6b64ce10000000a174cb4, 2025.001), שגופו נקרא. 'Automatic Payment Transactions' (21 " +
      "תוצאות) החזיר את 'Bank Account Alias Enabled in Additional Transactions' (What's New 2022, loio " +
      "30c5d8e26bcf46d6af00c27a68b081da), שגופו נקרא ומדפיס Scope Item J60 (Accounts Payable) לפריט ה-What's New " +
      "עצמו; J60 אינו נכתב כ-reference של התהליך. שלב התשלום (F110) אינו מתואר בעמוד ה-reference ומתועד ברשומות " +
      "המאגר (tx-intel F110, מפת P2P) ובעמוד What's New 2022. EKKO, EKPO, EKBE, RBKP, RSEG, BSIK, BSAK, REGUH, " +
      "REGUP ו-MATDOC אינן במילון הפרויקט; BAPI_PO_CREATE1 ו-BAPI_INCOMINGINVOICE_CREATE אינם במילון ה-fm של " +
      "הפרויקט; OMR6 אינה במילון הטרנזקציות; כולם מוזכרים בפרוזה. יישומי ה-Fiori Manage Purchase Requisitions, " +
      "Manage Purchase Orders, Create Supplier Invoice ו-Manage Automatic Payments מוזכרים בשם; F0770, F0712 " +
      "ו-F0843A מופיעים ברשומות tx-intel ואינם בקטלוג ה-Fiori של הפרויקט (רשומת MIGO מצמידה F0843A לשם שהראיה " +
      "הרשמית מצמידה ל-F0843). data/fiori/apps.ts מצמיד את F0843 לשם 'Post Goods Movement', בסתירה לראיה הרשמית " +
      "(Post Goods Receipt for Purchasing Document); הסתירה מתועדת ומוכרעת ברשומת fiori:F0843. kpis ו-migration " +
      "הושמטו: אף מקור שנקרא אינו מגדיר מדדי P2P או פרק הגירה לתהליך הכללי; סעיפי 12.4 בספר 3 (למשל 12.4.7 Days " +
      "Payable Outstanding) נושאים כותרות של אנליטיקה, אך תוכנם לא נקרא ולכן לא נכתבו מדדים. לא בוצעה בדיקה " +
      "במערכת SAP חיה.",
  },
  /* =================================================== physical inventory */
  {
    slug: "physical-inventory-process",
    he: "ספירת מלאי (Physical Inventory): מסמך ספירה, הזנת ספירה, ניתוח פערים ורישום הפרשים",
    en: "Physical inventory process: document creation, count entry, difference analysis and posting of differences",
    module: "Cross",
    summary: "ספירת מלאי מתאימה את המלאי בספרים למלאי שנמצא בפועל. העמוד הרשמי 'Physical Inventory Process' מחלק " +
      "אותה לשלושה שלבים, הכנה, ספירה וניתוח, ומתאר זרימה של יצירת מסמך ספירה, הזנת הספירה ורישום הפרשים, עם " +
      "ספירה חוזרת לפי הצורך; אותו נוסח מופיע בתיעוד SAP ERP 6.0 EHP8 ובתיעוד S/4HANA 2025 FPS01. בשני הצדדים " +
      "טבלת הפעולות הרשמית מונה את MI01, MI21, MI07, MI20 ו-MI11; ב-S/4HANA נוספות אפליקציות Fiori ייעודיות, " +
      "ומסמך החומר שנוצר ברישום ההפרש נשמר ב-MATDOC במקום MKPF ו-MSEG.",
    context: "לפי העמודים הרשמיים 'Physical Inventory Analysis' ו-'Posting Inventory Differences' (S/4HANA 2025 " +
      "FPS01, ובאותו נוסח ב-SAP ERP 6.0 EHP8), רישום הפרש הספירה יוצר מסמך חומר שמתעד את יתרות המלאי המתוקנות " +
      "ומסמך חשבונאי עם תנועות החשבון. לפי רשומות tx-intel של הפרויקט, MI01 יוצרת מסמך ספירה (IKPF/ISEG) עם " +
      "אפשרות posting block, MI04 מזינה את תוצאות הספירה ומחשבת את ההפרש מול book inventory, ו-MI07 רושמת את " +
      "ההפרש בתנועה 701 או 702. העמוד הרשמי של F0379A (Manage Physical Inventory Documents) מתאר ספירה חוזרת, " +
      "רישום ישיר ורישום המוני מתוך האפליקציה. בצד מודל הנתונים, פריט הפישוט 'S4TWL - Data Model in Inventory " +
      "Management (MM-IM)' קובע שב-S/4HANA מסמך החומר נשמר ב-MATDOC בלבד. IKPF, ISEG ו-MATDOC אינן במילון " +
      "האובייקטים של הפרויקט ולכן מוזכרות בפרוזה בלבד.",
    steps: [
      {
        he: "הכנה: יוצרים מסמך ספירה לחומרים במחסן. צד GUI (ECC ו-S/4HANA): MI01, 'Create Physical Inventory " +
          "Document' בטבלת הפעולות הרשמית, שלפי רשומת tx-intel יוצרת מסמך ספירה (IKPF/ISEG) עם אפשרות posting " +
          "block ו-freeze book inventory. צד S/4HANA (Fiori): Create Physical Inventory Documents (F3197), " +
          "שספריית האפליקציות רושמת עם MI01 כטרנזקציה מובילה, ולפי העמוד 'Options to Create or Schedule Physical " +
          "Inventory Documents' מיועדת למספר מסמכים מוגבל ('no mass creation'). העמוד 'Physical Inventory " +
          "Process' מונה בשלב ההכנה יצירת מסמך, חסימת חומרים לרישום (Blocking Materials for Posting) והדפסה והפצה " +
          "של המסמך; הדפסת המסמך ב-GUI היא MI21 ('Print Physical Inventory Document').",
        xrefs: ["tx:MI01", "tx:MI21", "table:MARD"],
      },
      {
        he: "יצירה מרוכזת או מתוזמנת: צד GUI: MI31, שקטלוג הטרנזקציות של הפרויקט מתאר כ-'Batch Input: Create " +
          "Physical Inventory Documents', וספריית האפליקציות של S/4HANA 2025 FPS01 רושמת כאפליקציית SAP GUI בשם " +
          "'Create PI Documents - Regular Stock'; לספירת מחזור, לפי טבלת הפעולות בעמוד 'Cycle Counting (MM-IM)', " +
          "MIBC היא 'ABC Analysis for Cycle Counting' ו-MICN היא 'Batch Input: Physical Inventory Documents in " +
          "Cycle Counting'. צד S/4HANA (Fiori): Job Scheduling and Mass Processing - Physical Inventory (F4550), " +
          "עם MI01 כטרנזקציה מובילה ו-MI31 ו-MIBC כטרנזקציות קשורות, לפי ספריית האפליקציות; לפי העמוד 'Options to " +
          "Create or Schedule Physical Inventory Documents' היא מיועדת ליצירה המונית עם מרווחי זמן חוזרים, ובטבלת " +
          "ההשוואה שבו רק היא תומכת בספירת מחזור. בספר 3 של הפרויקט סעיף 7.4.2 נושא את הכותרת 'Schedule Physical " +
          "Inventory Document Creation'.",
        xrefs: ["tx:MI31", "tx:MIBC", "tx:MI01"],
      },
      {
        he: "ספירה והזנת תוצאות: לפי העמוד 'Physical Inventory Process' הספירה נרשמת על תדפיס המסמך ואחר כך מוזנת " +
          "למערכת; לפי העמוד 'Physical Inventory Analysis' ספירה חיצונית נקלטת ב-batch input או כנתוני PDC. צד " +
          "GUI: MI04 מזינה את תוצאות הספירה למסמך קיים ומחשבת את ההפרש מול book inventory, לפי רשומת tx-intel. " +
          "ספירת אפס מסמנים בעמודה ZC, כי לפי העמוד 'Posting Inventory Differences' המערכת מפרשת 0 כ-'not yet " +
          "counted'. צד S/4HANA (Fiori): Manage Physical Inventory Count (F5430), עם MI04 כטרנזקציה מובילה, לפי " +
          "ספריית האפליקציות.",
        xrefs: ["tx:MI04"],
      },
      {
        he: "ניתוח פערים וספירה חוזרת: לפי העמוד 'Physical Inventory Analysis' בשלב זה קובעים אם נדרשת ספירה " +
          "חוזרת בגלל פערים, וספירה חוזרת יוצרת מסמך ספירה חדש. צד GUI: טבלת הפעולות הרשמית מונה 'Recount " +
          "Physical Inventory Document MI11' ו-'Print List of Differences MI20'; ספריית האפליקציות של S/4HANA " +
          "2025 FPS01 רושמת את MI20 בשם אחר, 'Process Physical Inventory Count Results', וזו גם הכותרת בקטלוג " +
          "הטרנזקציות של הפרויקט. רשומות tx-intel של MI04 ו-MI07 מציבות את MI20 בין הזנת הספירה לרישום ההפרש " +
          "וממליצות על recount לפני רישום של פערים חריגים. צד S/4HANA (Fiori): ב-Manage Physical Inventory " +
          "Documents (F0379A) מפעילים recount לפריט שנספר וטרם נרשם, והאפליקציה יוצרת מסמך ספירה חדש, לפי העמוד " +
          "הרשמי.",
        xrefs: ["tx:MI20"],
      },
      {
        he: "רישום הפרשים: צד GUI: MI07, 'Process List of Differences' בטבלת הפעולות הרשמית; לפי רשומת tx-intel " +
          "היא רושמת תנועה 701 (עודף) או 702 (חוסר), מיישרת את book inventory לכמות שנספרה ויוצרת מסמך חומר ומסמך " +
          "FI. לפי העמוד 'Posting Inventory Differences' ההפרש נרשם בתקופה שנקבעה בספירה או, כשמותר רישום לתקופה " +
          "קודמת, בתקופה שאחריה, ולכל פריט אפשר לתת סיבת הפרש. צד S/4HANA (Fiori): Manage Physical Inventory " +
          "Documents (F0379A) רושמת את הכמות שנספרה לפריט או לכל פריטי המסמך (mass posting), מאפשרת סיבה להפרש " +
          "לפי ההגדרות, ומנווטת למסמך החומר שנוצר, לפי העמוד הרשמי.",
        xrefs: ["tx:MI07", "table:MARD"],
      },
      {
        he: "מסמך החומר והמסמך החשבונאי של רישום ההפרש: לפי העמוד 'Posting Inventory Differences' נוצרים מסמך " +
          "חומר ומסמך חשבונאי. צד ECC: לפי פריט הפישוט 'S4TWL - Data Model in Inventory Management (MM-IM)' מודל " +
          "SAP ERP 6.0 שומר כותרת ב-MKPF ופריטים ב-MSEG. צד S/4HANA: לפי אותו פריט (2025 FPS01, פריט 15.3.1) " +
          "נתוני מסמך החומר נשמרים ב-MATDOC בלבד (אינה במילון הפרויקט), ו-MKPF ו-MSEG קיימות כהגדרת DDIC " +
          "וכאובייקט בבסיס הנתונים; לפי פריט 27.5 ברשימת 2023 FPS03 קריאה מהן מנותבת לתצוגת CDS, וכתיבה אליהן " +
          "אינה משפיעה. רשומת tx-intel של MI07 מציבה אחריה את MB51 ו-FB03.",
        xrefs: [
          "table:MKPF", "table:MSEG", "obj:material-document", "tx:MB51", "bp:matdoc-read-through-compatibility",
        ],
      },
      {
        he: "בקרת מלאי לפני ואחרי הספירה: MB52 מציגה snapshot נוכחי של כמות וערך לחומרים רבים (למלאי לפי תאריך " +
          "עבר MB5B), ו-MMBE מציגה מלאי של חומר בודד לפי רמות ארגון וסוגי מלאי, לפי רשומות tx-intel; רשומת MI01 " +
          "מציבה את שתיהן לפני יצירת המסמך. צד S/4HANA: שתיהן נשמרות, חישובי המלאי מבוססי MATDOC ויש חלופות Fiori " +
          "להצגת מלאי, לפי שדה s4Delta. אפליקציית Physical Inventory Analysis מופיעה ברשימת ההמשך של עמוד Manage " +
          "Physical Inventory Documents, בלי תיאור נוסף בעמוד.",
        xrefs: ["tx:MB52", "tx:MMBE", "tx:MB5B"],
      },
    ],
    antiPatterns: [
      "יצירת מסמך ספירה בלי posting block כשנדרש freeze של המלאי בספרים; רשומת tx-intel של MI01 מונה זאת בין " +
        "הטעויות השכיחות.",
      "רישום הפרש חריג ב-MI07 בלי recount קודם; רשומת tx-intel של MI07 מונה זאת בין הטעויות השכיחות, והעמוד " +
        "'Physical Inventory Analysis' ממליץ על ספירה חוזרת כשיש חשד לטעות ספירה.",
      "הזנת 0 בשדה הכמות במקום סימון ZC: לפי העמוד 'Posting Inventory Differences' המערכת מפרשת 0 כ-'not yet " +
        "counted'; גם רשומת tx-intel של MI04 מונה את שכחת סימון ה-zero count.",
      "רישום הפרש בתקופה שגויה או מעבר ל-tolerance בלי הרשאה (MI07, לפי רשומת tx-intel); העמוד 'Posting Inventory " +
        "Differences' קושר את תקופת הרישום לתקופת הספירה.",
      "עדכון ישיר של יתרות MARD במקום התאמה דרך מסמך ספירה, לפי רשומת object-intel של MARD.",
      "כתיבה ישירה ל-MKPF או ל-MSEG בקוד לקוח ב-S/4HANA: לפי פריט 27.5 'S4TWL - Data Model in Inventory " +
        "Management (MM-IM)' ברשימת הפישוט 2023 FPS03 כתיבה כזו אינה משפיעה ויש להסירה, וכתיבה ל-MATDOC מתבצעת " +
        "דרך המחלקה CL_NSDM_STOCK.",
    ],
    checks: [
      "חיובי: מסמך שנוצר ב-MI01 או ב-F3197 מופיע ב-Manage Physical Inventory Documents, ואחרי הזנת הספירה ב-MI04 " +
        "שדה Count status בכותרת המסמך מתעדכן (שדות הכותרת לפי העמוד הרשמי 'Physical Inventory Process').",
      "שלילי: כשמסמך חורג מסבולת המסמך ('maximum amount per physical inventory document') שהוגדרה לקבוצת המשתמש, " +
        "המשתמש אינו רשאי לרשום הפרשים למסמך (העמוד 'Posting Inventory Differences'), ורישום בתקופה סגורה מחזיר " +
        "M7308 (רשומת tx-intel של MI07).",
      "אינטגרציה: אחרי רישום ההפרש קיימים מסמך חומר ומסמך חשבונאי (העמוד 'Posting Inventory Differences'), מסמך " +
        "החומר בתנועה 701 או 702 (רשומת tx-intel של MI07); ב-S/4HANA ניתן לנווט למסמך החומר מ-Manage Physical " +
        "Inventory Documents, והמלאי ב-MMBE תואם לכמות שנספרה.",
      "רגרסיה (S/4HANA): דוח לקוח שקורא מ-MKPF או מ-MSEG מחזיר את מסמכי החומר של רישום ההפרש; לפי פריט 27.5 " +
        "ברשימת הפישוט 2023 FPS03 הקריאה מנותבת לתצוגת CDS וקוד שכותב לטבלאות אלה צריך להסיר את הכתיבה.",
      "ספירת אפס: פריט שנספר 0 מסומן ב-ZC ומופיע כנספר, ולא כפריט שטרם נספר (העמוד 'Posting Inventory Differences').",
    ],
    process: {
      purpose: "להתאים את ערכי המלאי בספרים לכמות ולערך שנמצאו בפועל: לפי העמוד הרשמי 'Physical Inventory " +
        "Process' (SAP ERP 6.0 EHP8 ו-S/4HANA 2025 FPS01, באותו נוסח), ברישום הפרשי הספירה המערכת מתאימה את ערכי " +
        "המלאי וערכי הספרים למלאי ולערכו בפועל.",
      trigger: [
        {
          he: "ספירה פיזית מתוכננת של חומרים במחסן: לפי רשומת tx-intel של MI01 מסמך הספירה נוצר לפני הספירה " +
            "הפיזית, ולפי העמוד 'Posting Inventory Differences' תאריך הספירה המתוכנן קובע את שנת הכספים של המסמך.",
          xrefs: ["tx:MI01"],
        },
        {
          he: "ספירה מרוכזת, מתוזמנת או ספירת מחזור: MI31 ליצירה מרוכזת; לספירת מחזור ניתוח ABC ב-MIBC ויצירת " +
            "מסמכים ב-batch input ב-MICN, לפי העמוד 'Cycle Counting (MM-IM)' (רשומת tx-intel של MI01 מונה את " +
            "MI31, MICN ו-MIBC כחלופות); בצד Fiori של S/4HANA F4550, שלפי העמוד 'Options to Create or Schedule " +
            "Physical Inventory Documents' היא האפליקציה שתומכת בספירת מחזור.",
          xrefs: ["tx:MI31", "tx:MIBC"],
        },
        {
          he: "ספירה חוזרת: לפי העמוד 'Physical Inventory Analysis' ספירה חוזרת מומלצת כשיש חשד לטעות ספירה, " +
            "ויוצרת מסמך ספירה חדש.",
        },
      ],
      preconditions: [
        {
          he: "החומר קיים באתר ובמחסן ואינו חסום לספירה; אחרת M7001 או שגיאת חומר חסום, לפי רשומת tx-intel של MI01.",
          xrefs: ["tx:MI01"],
        },
        {
          he: "הספירה הוזנה (MI04) לפני רישום ההפרש (MI07), לפי רשומת tx-intel של MI07; העמוד 'Posting Inventory " +
            "Differences' מתאר גם הזנת ספירה ורישום הפרש בצעד אחד.",
          xrefs: ["tx:MI04", "tx:MI07"],
        },
        {
          he: "תקופת רישום פתוחה: לפי העמוד 'Posting Inventory Differences' ההפרש נרשם בתקופה שנקבעה בספירה או " +
            "בתקופה שאחריה כשמותר רישום לתקופה קודמת; אחרת M7308, לפי רשומת tx-intel של MI07.",
          xrefs: ["tx:MI07"],
        },
        {
          he: "סבולות ערך לרישום הפרשים מוגדרות לקבוצת המשתמש ב-Customizing של Inventory Management (העמוד " +
            "'Posting Inventory Differences'; ברשומת tx-intel של MI07: tolerance groups).",
        },
      ],
      masterData: [
        {
          he: "מלאי החומר ברמת מחסן (MARD), הבסיס שמולו מחושב ההפרש, לפי רשומות tx-intel של MI01 ו-MI07; לפי " +
            "רשומת object-intel רישום ההפרש מעדכן את LABST.",
          xrefs: ["table:MARD"],
        },
        {
          he: "סבולות ערך לקבוצת משתמשים: 'maximum amount per physical inventory document' ו-'maximum amount per " +
            "document item', לפי העמוד 'Posting Inventory Differences'.",
        },
        {
          he: "סיווג חומרים לספירת מחזור: 'Cycle Counting - Classification' מופיעה ברשימת ההמשך של עמוד Manage " +
            "Physical Inventory Documents, וספר 3 מקדיש לה את סעיף 7.4.5; המקורות שנקראו אינם מפרטים את נתוני האב " +
            "שהיא מגדירה.",
        },
      ],
      roles: [
        {
          he: "צד GUI, לפי שדה users ברשומות tx-intel: מבקר מלאי, מחסנאי וצוות ספירה (MI01, MI04); מבקר מלאי, " +
            "מנהל מלאי ואיש כספים (MI07).",
          xrefs: ["tx:MI01", "tx:MI04", "tx:MI07"],
        },
        {
          he: "צד S/4HANA (Fiori), לפי ספריית האפליקציות: SAP_BR_INVENTORY_MANAGER (Inventory Manager) " +
            "ו-SAP_BR_WAREHOUSE_CLERK (Warehouse Clerk) ל-F0379A, F3197 ו-F5430; ל-F4550 רשום התפקיד " +
            "SAP_BR_INVENTORY_MANAGER. העמוד הרשמי של F0379A מציין את מנהל המלאי (inventory manager) כמשתמש " +
            "לדוגמה.",
        },
      ],
      transactions: [
        {
          he: "יצירת מסמך: MI01 (GUI); Create Physical Inventory Documents, F3197 (Fiori).",
          xrefs: ["tx:MI01"],
        },
        {
          he: "יצירה מרוכזת או מתוזמנת: MI31 (GUI); לספירת מחזור MIBC (ניתוח ABC) ו-MICN (batch input), לפי העמוד " +
            "'Cycle Counting (MM-IM)'; Job Scheduling and Mass Processing - Physical Inventory, F4550 (Fiori).",
          xrefs: ["tx:MI31", "tx:MIBC"],
        },
        {
          he: "הדפסה ותצוגה: MI21 הדפסת מסמך ספירה ו-MI03 תצוגה, לפי טבלת הפעולות הרשמית; MI03 היא הטרנזקציה " +
            "המובילה של F0379A בספריית האפליקציות.",
          xrefs: ["tx:MI21", "tx:MI03"],
        },
        {
          he: "הזנת ספירה: MI04 (GUI); Manage Physical Inventory Count, F5430 (Fiori).",
          xrefs: ["tx:MI04"],
        },
        {
          he: "ספירה חוזרת ורשימת הפרשים: MI11 ו-MI20 (GUI), לפי טבלת הפעולות הרשמית; ב-Fiori פעולת recount " +
            "ב-F0379A.",
          xrefs: ["tx:MI20"],
        },
        {
          he: "רישום הפרשים וניהול מסמכים: MI07 (GUI); Manage Physical Inventory Documents, F0379A (Fiori), " +
            "שספריית האפליקציות מקשרת אליה את MI07 ו-MI20 כטרנזקציות קשורות.",
          xrefs: ["tx:MI07", "tx:MI20"],
        },
        {
          he: "בקרת מלאי: MB52 (רב-חומרי), MMBE (חומר בודד), MB5B (מלאי לפי תאריך).",
          xrefs: ["tx:MB52", "tx:MMBE", "tx:MB5B"],
        },
        {
          he: "מזהי ה-Fiori F0379A, F3197, F4550 ו-F5430 אינם בקטלוג data/fiori/apps.ts, ו-MI08, MI10, MI11 " +
            "ו-MICN אינם במילון הטרנזקציות של הפרויקט; לכן הם מוזכרים בפרוזה ולא כ-xref.",
        },
      ],
      tables: [
        {
          he: "MARD: מלאי ברמת מחסן, הבסיס להשוואה מול הכמות שנספרה.",
          xrefs: ["table:MARD"],
        },
        {
          he: "מסמך הספירה: IKPF ו-ISEG, לפי רשומות tx-intel של MI01, MI04 ו-MI07; שתיהן אינן במילון הפרויקט. לפי " +
            "העמוד 'Physical Inventory Process' הכותרת נושאת את Count status, Adjustment status ו-Delete status, " +
            "והפריט את היסטוריית הספירה.",
        },
        {
          he: "מסמך החומר: ב-ECC ב-MKPF וב-MSEG; ב-S/4HANA ב-MATDOC (אינה במילון הפרויקט), ולפי פריט 27.5 ברשימת " +
            "הפישוט 2023 FPS03 קריאה מ-MKPF/MSEG מנותבת לתצוגת CDS. שכבת ההשפעה של הפרויקט נוקבת בתצוגת התאימות " +
            "NSDM_V_MSEG (רשומת table:MSEG).",
          xrefs: ["table:MKPF", "table:MSEG", "obj:material-document"],
        },
        {
          he: "CDS: I_MaterialDocumentItem ממופה במאגר ל-MSEG, MKPF ו-MATDOC (data/cds-map.ts); לפי עמוד What's " +
            "New ל-SAP S/4HANA 2021 התצוגה הוצאה משימוש (deprecated) ב-2021, והסניפט מציב לצדה את " +
            "I_MaterialDocumentItem_2.",
          xrefs: ["cds:I_MaterialDocumentItem"],
        },
      ],
      integrationPoints: [
        {
          he: "FI: לפי העמודים 'Physical Inventory Analysis' ו-'Posting Inventory Differences' רישום ההפרש יוצר " +
            "מסמך חשבונאי עם תנועות החשבון לצד מסמך החומר, ולפי העמוד 'Physical Inventory Process' מותאמים גם " +
            "ערכי הספרים (book values). ראו את רשומת התהליך logistics-to-finance-postings-process.",
          xrefs: ["tx:MI07", "bp:logistics-to-finance-postings-process"],
        },
        {
          he: "תנועות סחורה: רישום ההפרש יוצר מסמך חומר באותו מודל של תנועות הסחורה; ראו את רשומת התהליך " +
            "goods-movement-process.",
          xrefs: ["bp:goods-movement-process", "obj:material-document"],
        },
        {
          he: "קליטת ספירה ממערכת חיצונית: batch input או נתוני PDC (Portable Data Capture), לפי העמוד 'Physical " +
            "Inventory Analysis'.",
        },
        {
          he: "Situation Handling (S/4HANA): לפי העמוד הרשמי, Manage Physical Inventory Documents משתמשת " +
            "ב-Situation Handling; לפי What's New 2020 (scope item BML) נוספה באפליקציה Physical Inventory " +
            "Document Overview תבנית המצב MAN_PHYSICAL_INVENTORY_MONITOR; המקורות שנקראו אינם קושרים את שם " +
            "האפליקציה הזה ל-F0379A.",
        },
        {
          he: "ספירת מלאי במחסן מנוהל EWM היא תהליך נפרד; ראו את רשומת התהליך ewm-warehouse-process.",
          xrefs: ["bp:ewm-warehouse-process"],
        },
      ],
      interfaces: [
        {
          he: "BAPI_MATPHYSINV_CREATE (יצירה), BAPI_MATPHYSINV_COUNT (ספירה) ו-BAPI_MATPHYSINV_POSTDIFF (רישום " +
            "הפרשים), לפי רשומות tx-intel של MI01, MI04 ו-MI07; אינם במילון הפונקציות של הפרויקט ולכן בפרוזה בלבד.",
        },
        {
          he: "OData API (S/4HANA): 'Physical Inventory Documents - Read, Create' (API_PHYSICAL_INVENTORY_DOC), " +
            "שירות inbound סינכרוני לקריאה וליצירה של מסמכי ספירה, עם ישויות כותרת, פריט ומספר סידורי, לפי What's " +
            "New 2021.",
        },
        {
          he: "שירותי OData של אפליקציות ה-Fiori לפי ספריית האפליקציות (S/4HANA 2025 FPS01): " +
            "MM_IM_PHYS_INV_DOC_SRV (F0379A), MM_IM_PHYS_INV_MASS_CREATE_SRV_01 (F3197), UI_PI_MANAGE_COUNT_V2 " +
            "(F5430), APJ_JOB_MANAGEMENT_SRV (F4550); אלה שירותי האפליקציות ולא API לשילוב.",
        },
      ],
      outputs: [
        {
          he: "מסמך ספירה (IKPF/ISEG): בכותרת השדות Count status, Adjustment status ו-Delete status, ובפריט " +
            "היסטוריית הספירה, לפי העמוד 'Physical Inventory Process'.",
        },
        {
          he: "רשימת הפרשים: 'Print List of Differences MI20' לפי טבלת הפעולות הרשמית; ראו את הסתירה בשם MI20 " +
            "בהערות.",
          xrefs: ["tx:MI20"],
        },
        {
          he: "מסמך חומר לוגיסטי שמתעד את יתרות המלאי המתוקנות (העמוד 'Posting Inventory Differences'), בתנועה " +
            "701 או 702 (רשומת tx-intel של MI07).",
          xrefs: ["tx:MI07", "obj:material-document"],
        },
        {
          he: "מסמך חשבונאי עם תנועות החשבון להפרש, לפי העמודים 'Physical Inventory Analysis' ו-'Posting " +
            "Inventory Differences'.",
        },
        {
          he: "ב-recount (MI11 או F0379A) נוצר מסמך ספירה חדש, לפי העמודים 'Physical Inventory Analysis' ו-Manage " +
            "Physical Inventory Documents.",
        },
      ],
      exceptions: [
        {
          he: "MI01: M7001 חומר לא קיים באתר או במחסן; חומר חסום לספירה (רשומת tx-intel).",
          xrefs: ["tx:MI01"],
        },
        {
          he: "MI04: מסמך כבר נספר; פריט חסר במסמך; ספירת אפס שהוזנה כ-0 בלי ZC נחשבת 'not yet counted' (רשומת " +
            "tx-intel והעמוד 'Posting Inventory Differences').",
          xrefs: ["tx:MI04"],
        },
        {
          he: "MI07: M7308 תקופה סגורה; חריגה מ-tolerance limit להרשאה; מסמך טרם נספר; הפרש כבר נרשם (רשומת " +
            "tx-intel). לפי העמוד 'Posting Inventory Differences', כשמסמך חורג מסבולת המסמך של קבוצת המשתמש, " +
            "המשתמש אינו רשאי לרשום הפרשים למסמך; כשרק פריטים חורגים מסבולת הפריט, הוא אינו רשאי לרשום אותם " +
            "פריטים, ושאר הפריטים ניתנים לעיבוד.",
          xrefs: ["tx:MI07"],
        },
        {
          he: "S/4HANA, F0379A: פריט שכבר נרשם אינו ניתן לסימון למחיקה, ומסמך שיש בו פריט רשום אינו נמחק פיזית כי " +
            "הוא ראיה לרישום, לפי העמוד הרשמי.",
        },
        {
          he: "במאגר לא נמצאה תקרית troubleshooting לתהליך הספירה (חיפוש ב-data/troubleshooting*.ts).",
        },
      ],
      controls: [
        {
          he: "posting block ו-freeze book inventory ביצירת המסמך (MI01, רשומת tx-intel); 'Blocking Materials for " +
            "Posting' בשלב ההכנה לפי העמוד 'Physical Inventory Process'.",
          xrefs: ["tx:MI01"],
        },
        {
          he: "סבולות ערך לקבוצת משתמשים, למסמך ולפריט (העמוד 'Posting Inventory Differences'); tolerance groups " +
            "ברשומת tx-intel של MI07.",
          xrefs: ["tx:MI07"],
        },
        {
          he: "recount לפני רישום של פערים חריגים (best practice ברשומת MI07; MI11 ופעולת recount ב-F0379A).",
          xrefs: ["tx:MI07"],
        },
        {
          he: "תקופת רישום ושנת כספים: נקבעות בספירה ובתאריך הספירה המתוכנן, לפי העמוד 'Posting Inventory " +
            "Differences'.",
        },
        {
          he: "הרשאות: אובייקטי ההרשאה M_ISEG_WIB, M_ISEG_WZL ו-M_ISEG_WDB (MI01), M_ISEG_BWA ו-M_MSEG_BWA " +
            "(MI07), לפי רשומות tx-intel; מחיקה ב-F0379A דורשת הרשאה ייעודית, לפי העמוד הרשמי.",
          xrefs: ["tx:MI01", "tx:MI07"],
        },
        {
          he: "ניטור: שדות הסטטוס בכותרת, היסטוריית הספירה בפריט וסטטיסטיקת המסמך (העמוד 'Physical Inventory " +
            "Process'); ב-F0379A פסי Counting Progress ו-Posting Progress.",
        },
        {
          he: "תיעוד סיבת ההפרש: best practice ברשומת MI07; סיבה לכל פריט לפי העמוד 'Posting Inventory " +
            "Differences'; ב-F0379A סיבה לפי ההגדרות.",
          xrefs: ["tx:MI07"],
        },
      ],
      eccToS4: [
        {
          he: "שלבי התהליך: העמודים 'Physical Inventory Process' ו-'Posting Inventory Differences' מופיעים באותו " +
            "נוסח (בהבדלי ניסוח בלבד) בתיעוד SAP ERP 6.0 EHP8 ובתיעוד S/4HANA 2025 FPS01, וכך גם טבלת הפעולות " +
            "בעמוד 'Physical Inventory (MM-IM)'.",
        },
        {
          he: "טרנזקציות: MI01, MI04, MI07, MB52 ו-MMBE זמינות ב-S/4HANA לפי שדה s4 ברשומות tx-intel. MI20 ו-MI31 " +
            "רשומות בספריית האפליקציות של S/4HANA 2025 FPS01 כאפליקציות SAP GUI בסטטוס Published; רשומות האימות " +
            "tx:MI20 ו-tx:MI31 אינן קובעות להן מעמד S/4HANA ממקור רשמי.",
          xrefs: ["tx:MI01", "tx:MI04", "tx:MI07", "tx:MB52", "tx:MMBE", "tx:MI20", "tx:MI31"],
        },
        {
          he: "מודל נתונים: לפי 'S4TWL - Data Model in Inventory Management (MM-IM)' (פריט 15.3.1 ברשימת הפישוט " +
            "2025 FPS01 ופריט 27.5 ברשימת 2023 FPS03), ב-ECC מסמך החומר נשמר ב-MKPF וב-MSEG, וב-S/4HANA ב-MATDOC " +
            "בלבד; הטבלאות הישנות קיימות כהגדרת DDIC, ולפי פריט 27.5 קריאה מהן מנותבת לתצוגת CDS וכתיבה אליהן " +
            "אינה משפיעה.",
          xrefs: ["table:MKPF", "table:MSEG"],
        },
        {
          he: "Fiori (S/4HANA): לפי ספריית האפליקציות F0379A רשומה מ-1610 (קודמת F0379 'Physical Inventory'), " +
            "F3197 מ-1809, F4550 מ-2020 ו-F5430 מ-2021, וכולן רשומות במהדורה 2025 FPS01.",
        },
        {
          he: "API: לפי What's New 2021, ה-OData API בשם API_PHYSICAL_INVENTORY_DOC קיבל ב-S/4HANA 2021 ישויות " +
            "מספר סידורי.",
        },
        {
          he: "CDS: I_MaterialDocumentItem הוצאה משימוש ב-S/4HANA 2021, לפי עמוד What's New 2021.",
          xrefs: ["cds:I_MaterialDocumentItem"],
        },
      ],
      migration: [
        {
          he: "לפי רשומת table:MSEG של הפרויקט, SUM מבצע את המרת נתוני מסמך החומר ל-MATDOC כ-Silent Data " +
            "Migration. פריט הפישוט של MM-IM מפנה כהערת Business Impact ל-SAP Note 2206980 ('Material Inventory " +
            "Managment: change of data model in S/4HANA', כך במקור); גוף ההערה לא נקרא. לפי פריט 27.5 ברשימת 2023 " +
            "FPS03, שדות APPEND או INCLUDE של MKPF מועברים למבנה NSDM_S_HEADER בטבלת MATDOC.",
        },
      ],
      reference: {
        title: "Physical Inventory Process | Inventory Management and Inventory (MM-IM), SAP S/4HANA 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/2761bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        verificationLevel: "sap_official_verified",
        note: "עמוד תהליך רשמי מתוך רשומת חיפוש (loio 2761bd534f22b44ce10000000a174cb4, versionId 2025.001), " +
          "שגופו נקרא דרך scripts/sap-help-body.mjs; אותו עמוד קיים ב-SAP ERP 6.0 EHP8 (versionId 6.18.latest). " +
          "רשומות What's New ל-S/4HANA 2020 ו-2021 משייכות את תכולת הספירה ל-scope item BML ('Physical Inventory " +
          "- Inventory Count and Adjustment'), ורשומת 2021 מוסיפה OML באותו שם; העמוד עצמו אינו נוקב ב-scope item.",
      },
    },
    xrefs: [
      "tx:MI01", "tx:MI03", "tx:MI04", "tx:MI07", "tx:MI20", "tx:MI21", "tx:MI31", "tx:MIBC", "tx:MB52", "tx:MMBE",
      "tx:MB5B", "tx:MB51", "table:MARD", "table:MKPF", "table:MSEG", "obj:material-document",
      "cds:I_MaterialDocumentItem", "bp:matdoc-read-through-compatibility", "bp:goods-movement-process",
      "bp:logistics-to-finance-postings-process", "bp:ewm-warehouse-process",
    ],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Physical Inventory Process | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/2761bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 2761bd534f22b44ce10000000a174cb4) קובע: 'the process of physical inventory can be " +
          "divided into three phases: Physical Inventory Preparation ... Physical Inventory Count ... Physical " +
          "Inventory Analysis', וזרימה של 'Creating a Physical Inventory Document, Entering the Physical " +
          "Inventory Count, Posting inventory differences', עם 'Initiating a recount, if necessary'. בכותרת המסמך " +
          "'the fields Count status, Adjustment status and Delete status', ובתוצאה: 'When you post the inventory " +
          "differences, the system adjusts the book inventory values and book values so that they correspond with " +
          "the actual stocks and stock values'. הגוף מוסיף: 'You can also display statistics for the physical " +
          "inventory document; the statistics list how many document items are open, counted, posted (inventory " +
          "differences), recounted, or deleted'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Physical Inventory Process | Inventory Management and Inventory (MM-IM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/96bf9ad642cf4b26a29595e3d573fb8c/2761bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "צד ECC: אותו עמוד (אותו loio) בתיעוד SAP ERP 6.0 EHP8 נושא את אותו נוסח שלושת השלבים ('Physical " +
          "Inventory Preparation', 'Physical Inventory Count', 'Physical Inventory Analysis') ואת אותה זרימה של " +
          "יצירת מסמך, הזנת ספירה ורישום הפרשים; הגוף נקרא דרך scripts/sap-help-body.mjs.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Physical Inventory (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/4407b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 4407b753128eb44ce10000000a174cb4, נקרא דרך scripts/sap-help-body.mjs): 'In " +
          "Physical Inventory, the user has the task of creating and processing physical inventory documents. " +
          "After the physical inventory count is complete and a recount has been carried out if required, he or " +
          "she posts the inventory differences and can print out a list of these'. טבלת הפעולות בעמוד: 'Create " +
          "Physical Inventory Document MI01', 'Change Physical Inventory Document MI02', 'Display Physical " +
          "Inventory Document MI03', 'Print Physical Inventory Document MI21', 'Process List of Differences " +
          "MI07', 'Create List of Differences with Document MI08', 'Create List of Differences Without Document " +
          "MI10', 'Print List of Differences MI20', 'Recount Physical Inventory Document MI11'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Physical Inventory (MM-IM) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/4407b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "צד ECC: אותו עמוד (אותו loio) בתיעוד SAP ERP 6.0 EHP8 נושא את אותו טקסט ואת אותה טבלת פעולות, " +
          "כולל 'Process List of Differences MI07' ו-'Print List of Differences MI20'; הגוף נקרא דרך " +
          "scripts/sap-help-body.mjs.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Cycle Counting (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3207b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "רשומת החיפוש הרשמית (Materials Management (MM), 2025 FPS01 (Feb 2026), versionId 2025.001, loio " +
          "3207b753128eb44ce10000000a174cb4) נוקבת בקוד MIBC בסניפט: 'Activities in Materials Management Activity " +
          "Transaction Code ABC Analysis for Cycle Counting MIBC Batch Input: Physical Inventory Documents in " +
          "Cycle Counting MICN See also: Physical ...'. (אומת ברשומת tx:MIBC)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Physical Inventory Analysis | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/3061bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 3061bd534f22b44ce10000000a174cb4): שלב הניתוח כולל 'enter the count results in " +
          "the system', 'determine whether an inventory recount is necessary due to discrepancies' ו-'post the " +
          "inventory differences'; ספירה שבוצעה מחוץ ל-SAP נקלטת 'Using batch input for entering count results' " +
          "או 'Transfer PDC (Portable Data Capture) inventory count data'; 'When you initiate a recount, a new " +
          "physical inventory document is created'; ובתוצאה: 'the system creates a material document that records " +
          "the adjusted stock balances and an accounting document that contains the necessary account activities'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Posting Inventory Differences | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/5161bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 5161bd534f22b44ce10000000a174cb4): שלוש דרכי רישום ('Posting differences after " +
          "the count has been posted', 'Posting the count and inventory differences simultaneously after the " +
          "physical inventory document has been created', 'Entering the count without a document reference'); " +
          "'The posting period is automatically set during counting. Therefore, the inventory difference must be " +
          "posted to the same period or - if postings to the previous period are allowed - in the following " +
          "period'; 'The fiscal year is set by specifying a planned count date when creating a physical inventory " +
          "document'; 'You can give a reason for the inventory difference for each item'; ב-Customizing אפשר " +
          "להגדיר לקבוצת משתמשים 'maximum amount per physical inventory document' ו-'maximum amount per document " +
          "item', ומשתמש שחורג מהן אינו רשאי לרשום את ההפרש; 'If a quantity of zero was counted for an item, " +
          "enter this by selecting the ZC (zero count) column. It is not sufficient to enter 0 in the Quantity in " +
          "column, because the system interprets a zero as \"not yet counted.\"'; ובתוצאה נוצרים 'a material " +
          "document that records the adjusted stock balances and an accounting document'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Posting Inventory Differences | Inventory Management and Inventory (MM-IM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/96bf9ad642cf4b26a29595e3d573fb8c/5161bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "צד ECC: אותו עמוד (אותו loio) בתיעוד SAP ERP 6.0 EHP8; השוואת הגוף לגרסת S/4HANA 2025 FPS01 מצאה " +
          "הבדלי ניסוח בלבד (למשל 'The initial screen appears' מול 'The system displays the initial screen'). " +
          "משפטי תקופת הרישום, סבולות הערך לקבוצת משתמשים, סימון ZC לספירת אפס ומסמך החומר והמסמך החשבונאי בתוצאה " +
          "מופיעים בשתיהן באותו נוסח.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Options to Create or Schedule Physical Inventory Documents | Inventory Management and " +
          "Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/3749ee0faf034bc292155c1d1f581cde.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 3749ee0faf034bc292155c1d1f581cde): 'SAP recommends that you use the following SAP " +
          "Fiori apps'; Create Physical Inventory Documents (F3197) 'focuses on a limited number of documents to " +
          "be created (no mass creation)', ו-Job Scheduling and Mass Processing - Physical Inventory (F4550) " +
          "'focuses on a large number of documents to be created (mass creation), with several options for " +
          "extensive process flow, like recurring time intervals, with or without printing'. בטבלת ההשוואה רק " +
          "F4550 מסומנת 'Yes' לשורות 'Does the app support detailed scheduling functions?' ו-'Does the app " +
          "support cycle counting?', ו-F4550 מסומנת 'No' לשורה 'Does the app support special stocks?'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Physical Inventory Documents | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/24177b5796d40322e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 24177b5796d40322e10000000a44147b): 'App ID: F0379A'; 'This app supports you, for " +
          "example, as an inventory manager'; 'Initiate a recount or post action for a physical inventory " +
          "document item directly. These actions are active for physical inventory documents with material items " +
          "that are counted but not yet posted'; 'The app creates a new physical inventory document'; 'After " +
          "posting the difference it is possible to navigate to the according material document'; 'you can add a " +
          "reason when posting inventory differences'; 'mass posting'; 'you cannot mark individual items for " +
          "deletion that have already been posted'; 'If at least one item was posted, the document will not be " +
          "physically deleted because it is proof of the posting'; 'This app uses Situation Handling'. רשימת " +
          "ההמשך בעמוד: Manage Physical Inventory Count, Create Physical Inventory Documents, Job Scheduling and " +
          "Mass Processing - Physical Inventory, Physical Inventory Analysis, Cycle Counting - Classification " +
          "(המקפים בשמות הוחלפו במקף רגיל).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F0379A 'Manage Physical Inventory Documents', release S32OP " +
          "(S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0379A')/S32OP",
        accessedAt: DATE,
        claim: "scripts/fal-app.mjs F0379A: Transactional, Fact sheet / SAP Fiori elements, Published; תפקידים " +
          "SAP_BR_INVENTORY_MANAGER, SAP_BR_INVENTORY_MGR_RFM, SAP_BR_WAREHOUSE_CLERK; intent " +
          "PhysicalInventoryDocument-displayList; OData MM_IM_PHYS_INV_DOC_SRV; GUI מובילה MI03, קשורות MI06, " +
          "MI07, MI11, MI20, MI24; קודמת F0379 'Physical Inventory'; המהדורה המוקדמת ברשימת המהדורות היא S6OP " +
          "(1610).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F3197 'Create Physical Inventory Documents', release S32OP " +
          "(S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3197')/S32OP",
        accessedAt: DATE,
        claim: "scripts/fal-app.mjs F3197: Transactional / SAP Fiori elements, Published; תפקידים " +
          "SAP_BR_INVENTORY_MANAGER, SAP_BR_WAREHOUSE_CLERK (ומקביליהם ל-Retail); intent " +
          "PhysicalInventoryDocument-createPhysicalInventoryDocuments; OData MM_IM_PHYS_INV_MASS_CREATE_SRV_01; " +
          "GUI מובילה MI01. המהדורה המוקדמת ברשימת המהדורות היא S12OP (1809).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F5430 'Manage Physical Inventory Count', release S32OP (S/4HANA " +
          "2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5430')/S32OP",
        accessedAt: DATE,
        claim: "scripts/fal-app.mjs F5430: Transactional / SAP Fiori (SAPUI5), Published; תפקידים " +
          "SAP_BR_INVENTORY_MANAGER, SAP_BR_WAREHOUSE_CLERK; intent PhysicalInventoryDocument-manageCount; OData " +
          "UI_PI_MANAGE_COUNT_V2; GUI מובילה MI04, קשורות MI05, MI09. המהדורה המוקדמת ברשימת המהדורות היא S21OP " +
          "(2021).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App F4550 'Job Scheduling and Mass Processing - Physical Inventory', " +
          "release S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4550')/S32OP",
        accessedAt: DATE,
        claim: "scripts/fal-app.mjs F4550: Transactional / SAP Fiori: Generic Job Scheduling Framework, " +
          "Published; תפקיד SAP_BR_INVENTORY_MANAGER; intent PhysicalInventoryDocumentJob-scheduleCreation; OData " +
          "APJ_JOB_MANAGEMENT_SRV; GUI מובילה MI01, קשורות MI31, MIBC. המהדורה המוקדמת ברשימת המהדורות היא S18OP " +
          "(2020).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App MI20 'Process Physical Inventory Count Results' (SAP GUI), release " +
          "S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MI20')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את MI20 כאפליקציה 'Process Physical Inventory Count " +
          "Results' מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת " +
          "tx:MI20)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App MI31 'Create PI Documents - Regular Stock' (SAP GUI), release " +
          "S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MI31')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את MI31 כאפליקציה 'Create PI Documents - Regular Stock' " +
          "מסוג SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת tx:MI31)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App MI07 'Post Physical Inventory Document' (SAP GUI), release S32OP " +
          "(S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MI07')/S32OP",
        accessedAt: DATE,
        claim: "ספריית האפליקציות הרשמית של Fiori רושמת את MI07 כאפליקציה 'Post Physical Inventory Document' מסוג " +
          "SAP GUI (SAP GUI) במהדורת S/4HANA 2025 FPS01 (S32OP), בסטטוס 'Published'. (אומת ברשומת tx:MI07)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Physical Inventory - Inventory Count and Adjustment (BML) | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/b96e1fbb26de4d87bce74ccd56621884.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE,
        claim: "גוף העמוד (loio b96e1fbb26de4d87bce74ccd56621884): 'Scope Item BML ( Physical Inventory - " +
          "Inventory Count and Adjustment )', 'Type Changed', 'Application Component MM-IM', 'Available As Of SAP " +
          "S/4HANA 2020'. החידושים: ב-Create Physical Inventory Documents אפשר 'create physical inventory " +
          "documents referring to a cycle counting indicator'; ב-Physical Inventory Document Overview 'the new " +
          "situation template MAN_PHYSICAL_INVENTORY_MONITOR' ושתי פעולות חדשות (Recount ו-Post) 'active for " +
          "physical inventory documents with material items that are counted but not yet posted'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Physical Inventory Documents - Read, Create | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/45918eae47f14dfb85b466d3ae5c9dea.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE,
        claim: "גוף העמוד (loio 45918eae47f14dfb85b466d3ae5c9dea): 'The OData API Physical Inventory Documents - " +
          "Read, Create ( API_PHYSICAL_INVENTORY_DOC ) enables you to use a synchronous inbound service to read " +
          "and create physical inventory documents. The service contains header entities and item entities, and " +
          "now also serial number entities'; 'Scope Item BML ( Physical Inventory - Inventory Count and " +
          "Adjustment ) OML ( Physical Inventory - Inventory Count and Adjustment )'; 'Application Component " +
          "MM-IM-VDM-PI ( Inventory - Physical Inventory )'; 'Available As Of SAP S/4HANA 2021'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud " +
          "Private Edition 2025 - Feature Pack Stack 1 · item 15.3.1 S4TWL - Data Model in Inventory Management " +
          "(MM-IM), p. 1459",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE_TB_15,
        claim: "פריט 15.3.1 ברשימת הפישוט של 2025 FPS1 (גרסת מסמך 1.36, עמ' 1459 ואילך, נקרא כטקסט מלא מקובץ " +
          "ה-PDF) חוזר על אותו נוסח: מודל SAP ERP 6.0 מורכב מ-'MKPF for document header information and MSEG for " +
          "document item data', וב-S/4HANA 'Material document data will be stored in MATDOC only and not anymore " +
          "in MKPF and MSEG'. הטבלאות 'do still exist in S/4HANA as DDIC definition as well as database object', " +
          "ובשורת MKPF שבטבלת הפריט רשומים NSDM_DDL_MKPF ו-NSDM_MIG_MKPF ועמודת תצוגת נתוני האב ריקה. הערת " +
          "ה-Business Impact היא אותה הערה, 0002206980 בכותרת 'Material Inventory Managment: change of data model " +
          "in S/4HANA'. רכיב היישום עודכן ל-MM-IM-GF-MIG לעומת MM-IM-GF ברשימת 2023 FPS3. (אומת ברשומת table:MKPF)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 · item 27.5 S4TWL - Data Model in Inventory " +
          "Management (MM-IM), טבלת הטבלאות המושפעות ופרק התאמות הקוד",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE_TB_15,
        claim: "אותו פריט מתאר את מנגנון התאימות: הטבלאות המנויות בו 'do still exist in S/4HANA as DDIC " +
          "definition as well as database object', ולכל אחת מהן מוקצית תצוגת CDS כ-proxy object כך ש'each read " +
          "access to one of the tables will get redirected in the database interface layer of NetWeaver to the " +
          "assigned CDS view. Write accesses to those tables have to be adjusted'. בשורת MKPF (Material document " +
          "header) שבטבלת הפריט רשומים DDL Source לתצוגת ההפניה NSDM_DDL_MKPF ותצוגה לקריאת תוכן הטבלה ללא ניתוב " +
          "NSDM_MIG_MKPF, ועמודת תצוגת נתוני האב ריקה. הפריט מוסיף ש'the table MKPF and MSEG will not contain " +
          "data anymore (except legacy data from migration)', שכתיבה לטבלה עדיין אפשרית טכנית אך 'such write " +
          "operations are without any effect' ולכן יש להסירה מקוד הלקוח, ש'Write operations on table MATDOC and " +
          "your moved customer append fields are done by class CL_NSDM_STOCK', ושיש להוסיף שדות מ-APPEND או " +
          "INCLUDE של MKPF למבנה המשנה NSDM_S_HEADER בטבלת MATDOC. (אומת ברשומת table:MKPF)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE_TB_01,
        claim: "'There is a new single table MATDOC instead of the existing tables MKPF and MSEG'; מסמך חומר " +
          "מורכב מרשומות MATDOC ומכיל 'a maximum 500 items' (כלשון העמוד). (אומת ברשומת table:MSEG)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of CDS Views | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6eac4f4b1c024fc5a0d48c51ca66e83c.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE_TX_02,
        claim: "עמוד What's New לגרסת SAP S/4HANA 2021 קובע: 'The following CDS views were deprecated in SAP " +
          "S/4HANA 2021: Material Document Header (I_MaterialDocumentHeader) Material Document Item " +
          "(I_MaterialDocumentItem)'. הסניפט מציב את I_MaterialDocumentItem_2 לצד I_MaterialDocumentItem, בנימוק " +
          "'To improve the runtime performance and reduce the memory consumption in the database'. (אומת ברשומת " +
          "cds:I_MaterialDocumentItem)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציה של הפרויקט (TX_INTEL), MI01",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תיאור הרשומה (ללא הבחנת צד): MI01 יוצרת מסמך ספירה (IKPF/ISEG) עם אפשרות posting block ו-freeze " +
          "book inventory; זרימה MI01, MI04, MI20/MI07; חלופות: MICN/MI31 ל-batch creation, cycle counting " +
          "(MIBC); לפני: MB52, MMBE; טבלאות IKPF, ISEG, MARD; BAPI_MATPHYSINV_CREATE ו-BAPI_MATPHYSINV_COUNT; " +
          "שגיאות M7001 וחומר חסום לספירה; טעות: אי הפעלת posting block כשצריך freeze; users: מבקר מלאי, מחסנאי, " +
          "צוות ספירה; אובייקטי הרשאה M_ISEG_WIB, M_ISEG_WZL, M_ISEG_WDB. צד S/4HANA (שדה s4): 'זמינה; Fiori " +
          "Manage Physical Inventory Documents'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MI01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציה של הפרויקט (TX_INTEL), MI04",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תיאור הרשומה (ללא הבחנת צד): MI04 מזינה count results למסמך PI קיים ומחשבת אוטומטית את " +
          "ה-difference מול book inventory; BAPI_MATPHYSINV_COUNT; שגיאות: מסמך כבר נספר, פריט חסר במסמך, zero " +
          "count נדרש flag; טעות: שכחת סימון zero count לפריט בכמות 0; best practice: בדיקת MI20 לפני MI07, " +
          "recount על פערים גדולים; users: צוות ספירה, מבקר מלאי, מחסנאי. צד S/4HANA (שדה s4): 'זמינה; Fiori " +
          "Manage Physical Inventory'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MI04",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציה של הפרויקט (TX_INTEL), MI07",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תיאור הרשומה (ללא הבחנת צד): MI07 רושמת הפרשי ספירה (701 עודף, 702 חוסר), מעדכנת MARD ויוצרת מסמך " +
          "חומר ומסמך FI; דורשת ספירה (MI04) קודם; 'ניתן גם רישום מ-MI20 ישירות'; tolerance limits להרשאת רישום; " +
          "BAPI_MATPHYSINV_POSTDIFF; טבלאות MATDOC, IKPF, ISEG, MKPF, MSEG, MARD; שגיאות: חריגה מ-tolerance " +
          "limit, M7308 תקופה סגורה, מסמך טרם נספר, הפרש כבר נרשם; best practices: recount לפני post על פערים " +
          "חריגים, הגדרת tolerance groups, תיעוד סיבת ההפרש; users: מבקר מלאי, מנהל מלאי, איש כספים; אובייקטי " +
          "הרשאה M_ISEG_BWA, M_ISEG_WDB, M_MSEG_BWA; אחרי: MB51, FB03, MB52. צד S/4HANA: שדה s4 'זמינה; Fiori " +
          "Manage Physical Inventory', ושדה s4Delta מצטט את פריט הפישוט 'S4TWL - DATA MODEL IN INVENTORY " +
          "MANAGEMENT (MM-IM)' (2025 FPS01, 15.3.1): נתוני מסמך החומר נשמרים ב-MATDOC בלבד, ו-MKPF/MSEG נשארות " +
          "כהגדרות DDIC.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MI07",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציה של הפרויקט (TX_INTEL), MB52",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תיאור הרשומה: MB52 דוח מלאי רב-חומרי של כמות וערך (snapshot נוכחי; למלאי היסטורי MB5B), שימושי " +
          "לספירות; טבלאות MARD, MCHB, MARC. צד S/4HANA (s4Delta): 'נשמרת ב-S/4HANA; חישובי המלאי מבוססים MATDOC. " +
          "חלופות Fiori להצגת מלאי זמינות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB52",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציה של הפרויקט (TX_INTEL), MMBE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "תיאור הרשומה: MMBE סקירת מלאי היררכית של חומר לפי מפעל, מחסן ו-batch, עם הבחנה בין סוגי מלאי " +
          "(unrestricted, quality inspection, blocked, in transit, restricted), לקריאה בלבד; התהליך: 'בדיקת " +
          "זמינות מלאי לפני פליטה/הזמנה/ספירה'. צד S/4HANA (s4Delta): 'נשמרת ב-S/4HANA; חישובי מלאי מבוססים " +
          "MATDOC'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MMBE",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של הפרויקט, MI20",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הרשומה מתארת את MI20 כ-'עיבוד תוצאות ספירת מלאי' ('Process Physical Inventory Count Results'), " +
          "מודול MM, תחום 'מלאי'. לפי הודעת commit 48e7d9ac הכותרת תוקנה לכותרת רשומת ה-GUI של MI20 בספריית " +
          "האפליקציות (S32OP).",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MI20",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של הפרויקט, MI31",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הרשומה מתארת את MI31 כ-'קלט אצווה: יצירת מסמכי ספירת מלאי' ('Batch Input: Create Physical " +
          "Inventory Documents'), מודול MM, תחום 'מלאי'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MI31",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות של הפרויקט לטבלת MSEG",
        product: "SAP S/4HANA",
        edition: "on-premise",
        sapNote: "2206980",
        accessedAt: DATE,
        claim: "צד S/4HANA: הרשומה קובעת מעמד 'replaced' עם יורש obj:material-document; ברובד המאגר שלה, MSEG " +
          "הופכת לתצוגת התאימות NSDM_V_MSEG (data/s4-impact.ts#MSEG), SUM מבצע את המרת MATDOC כ-Silent Data " +
          "Migration, ופריט הפישוט 'Material Inventory Management - new data model (MATDOC)' מתועד עם SAP Note " +
          "2206980. הרשומה מציינת ששם NSDM_V_MSEG ומספר ההערה נשארים ברובד המאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/tables.ts#table:MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט, I_MaterialDocumentItem",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "המיפוי מקשר את I_MaterialDocumentItem ('פריטי מסמך חומר') לטבלאות MSEG, MKPF ו-MATDOC, לשכבת " +
          "צריכה C_MaterialDocumentItem וליישום 'Material Documents Overview'.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaterialDocumentItem",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין האובייקטים של הפרויקט (object-intel), MARD",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הרשומה מונה בין מי שמעדכן את MARD את 'ספירת מלאי (MI07)', בין התרחישים 'התאמת מלאי לאחר ספירה " +
          "(Physical Inventory) המעדכנת LABST', ובין ההמלצות 'אל תעדכן יתרות MARD ישירות' ו-'בצע התאמות מלאי דרך " +
          "מסמכי ספירה ולא בעדכון ישיר'. הרשומה אינה מבחינה בין ECC ל-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/knowledge/object-intel.ts#MARD",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט (Sourcing and Procurement with SAP S/4HANA), פרק 7 'Inventory " +
          "Management', סעיף 7.4 'Physical Inventory'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרות הסעיפים: 7.4.1 Create Physical Inventory Documents, 7.4.2 Schedule Physical Inventory " +
          "Document Creation, 7.4.3 Manage Physical Inventory Count, 7.4.4 Manage Physical Inventory Documents, " +
          "7.4.5 Cycle Counting, Classification (סימן הפיסוק שבכותרת הוחלף בפסיק), 7.4.6 SAP GUI for HTML Apps. " +
          "הטענה תחומה בכותרות; גוף הסעיפים לא צוטט.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#7.4",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט, סעיף 7.4.2 'Schedule Physical Inventory Document Creation'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף קיים בפרק 7 'Inventory Management' בכותרת 'Schedule Physical Inventory Document Creation'; " +
          "הטענה תחומה בכותרת.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#7.4.2",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "ספר 3 בספריית הפרויקט, סעיף 7.6.5 'Physical Inventory' (תחת 7.6 'Configuring Inventory " +
          "Management')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הסעיף קיים בפרק 7 'Inventory Management' תחת 7.6 'Configuring Inventory Management', בכותרת " +
          "'Physical Inventory'; הטענה תחומה בכותרת, וגוף הסעיף לא צוטט.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/books/book3.json#7.6.5",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO research pipeline (researcher + adversarial auditor), 2026-09-24",
    notes: "טיוטה מחודשת אחרי סירוב 2026-09-24: משפט הניתוב לתצוגת CDS והכתיבה חסרת ההשפעה מיוחס עכשיו רק לפריט " +
      "27.5 ברשימת הפישוט 2023 FPS03, שהועתק מילה במילה מרשומת table:MKPF; שורת 2025 FPS01 (פריט 15.3.1) מצוטטת " +
      "רק לקיום הטבלאות כהגדרת DDIC ולשמירה ב-MATDOC. סתירה בשם MI20: טבלת הפעולות בעמוד 'Physical Inventory " +
      "(MM-IM)' (SAP ERP 6.0 EHP8 ו-S/4HANA 2025 FPS01) קוראת לה 'Print List of Differences', ספריית האפליקציות " +
      "(S32OP) רושמת אותה כ-'Process Physical Inventory Count Results', וקטלוג הטרנזקציות של הפרויקט אימץ את שם " +
      "הספרייה (Old: Print List of Differences, New: Process Physical Inventory Count Results, commit 48e7d9ac); " +
      "באותו עמוד MI07 היא 'Process List of Differences' והספרייה רושמת אותה כ-'Post Physical Inventory " +
      "Document'. הכרעה דורשת פתיחת MI20 במערכת. scope item: BML מודפס בשתי רשומות What's New (2020, 2021) ו-OML " +
      "ברשומת 2021; לא נבדק מול SAP Best Practices Explorer, ורשומות What's New אינן מתעדות את מצבו בגרסה 2025. " +
      "IKPF, ISEG ו-MATDOC אינן במילון האובייקטים של הפרויקט; BAPI_MATPHYSINV_CREATE, BAPI_MATPHYSINV_COUNT " +
      "ו-BAPI_MATPHYSINV_POSTDIFF אינם במילון הפונקציות; F0379A, F3197, F4550 ו-F5430 אינם בקטלוג " +
      "data/fiori/apps.ts; MI08, MI10, MI11 ו-MICN אינם במילון הטרנזקציות; לכן כולם בפרוזה בלבד. שדה kpis הושמט: " +
      "אף מקור שנקרא אינו מגדיר מדד לתהליך. לא אותרה במאגר תקרית troubleshooting לתהליך הספירה. מעמד S/4HANA של " +
      "MI20 ו-MI31 לא נקבע ממקור רשמי. לא בוצעה בדיקה במערכת SAP חיה.",
  },
];
