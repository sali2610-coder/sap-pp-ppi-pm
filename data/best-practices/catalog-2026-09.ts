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
   come from the official Order-to-Cash Performance page): the page renders the
   gap by name.
   Drafts the auditor refuted are queued in
   audit/s4-enrichment/research-queue-best-practices.md, not written. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-24";
/** accessedAt values kept from the verification entries reused below. */
const DATE_TX_21 = "2026-09-21"; // data/verification/transactions.ts DATE21 (IP30_SIMPL_ITEM, tx:IP30 / tx:IP30H)
const DATE_TX_02 = "2026-09-02"; // data/verification/transactions.ts DATE2 (MB11_SIMPL, tx:MB11)
const DATE_TB_15 = "2026-09-15"; // data/verification/tables.ts DATE4 (QMAT_INSPECTION_SETUP, table:QMAT; item 6.5.1, table:COSP)
const DATE_TB_02 = "2026-09-02"; // data/verification/tables.ts DATE2 (MM - Material inventory balance, table:MBEW)
const DATE_FM_14 = "2026-09-14"; // data/verification/functions.ts DATE14 (Material Documents - Read, Create, fm:BAPI_GOODSMVT_CREATE)

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
];
