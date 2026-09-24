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
   purpose (kpis in both records below): the page renders the gap by name.
   Drafts the auditor refuted are queued in
   audit/s4-enrichment/research-queue-best-practices.md, not written. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-24";
/** accessedAt values kept from the verification entries reused below. */
const DATE_TX_21 = "2026-09-21"; // data/verification/transactions.ts DATE21 (IP30_SIMPL_ITEM, tx:IP30 / tx:IP30H)
const DATE_TX_02 = "2026-09-02"; // data/verification/transactions.ts DATE2 (MB11_SIMPL, tx:MB11)

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
];
