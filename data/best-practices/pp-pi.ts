/* Project NEO · best practices — PP-PI (תעשיות תהליכיות).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Every step, anti-pattern and check below is copied or condensed from the
   named repository records (repoRef); the single book citation supports only
   the sentence it quotes. Nothing asserts a new SAP fact. */
import type { BestPracticeLike } from "@/lib/evidence/types";

const DATE = "2026-09-01";

export const PPPI_BEST_PRACTICES: BestPracticeLike[] = [
  {
    slug: "matdoc-read-through-compatibility",
    he: "קריאת תנועות מלאי דרך MATDOC ותצוגות תאימות בתעשיות תהליכיות",
    en: "Read material documents through MATDOC and compatibility views in process industries",
    module: "PP-PI",
    summary:
      "ב-S/4HANA כותרת ופריטי מסמך החומר מאוחדים בטבלה אחת, MATDOC; MKPF ו-MSEG נשארות לקריאה בלבד דרך " +
      "תצוגות תאימות. קוד, דוחות וממשקים של פקודות תהליך שנשענים על MKPF או MSEG נבדקים ומוסבים בהתאם.",
    context:
      "ניפוקים (261) וקבלות (101) של פקודות תהליך נרשמים ב-S/4HANA ל-MATDOC. לפי שכבת ההשפעה של הפרויקט, " +
      "MSEG ו-MKPF הופכות לתצוגות תאימות (NSDM_V_MSEG, NSDM_V_MKPF): SELECT ממשיך לעבוד לקריאה, כתיבה " +
      "ישירה אסורה, וטבלאות מצרפי המלאי אינן מקור אמת. הרשומות מסמנות זאת כפריט פישוט MM-IM בסיכון גבוה.",
    steps: [
      {
        he: "למפות קוד מותאם, דוחות Z וממשקים שקוראים MKPF או MSEG ישירות, כולל JOIN בין השתיים ו-Append על MSEG.",
        xrefs: ["table:MKPF", "table:MSEG"],
      },
      {
        he: "להשאיר קריאות SELECT דרך תצוגות התאימות, ולבדוק מחדש ביצועים והרחבות שנשענו על המבנה הפיזי.",
        xrefs: ["table:MSEG"],
      },
      {
        he: "לרשום תנועות סחורה רק דרך MIGO או BAPI_GOODSMVT_CREATE; אין INSERT או UPDATE ישיר ל-MSEG.",
        xrefs: ["tx:MIGO", "fm:BAPI_GOODSMVT_CREATE"],
      },
      {
        he: "בדוחות חדשים לצרוך את תצוגת ה-CDS I_MaterialDocumentItem במקום MSEG, עם סינון על מסמך, חומר, מפעל או תקופה.",
        xrefs: ["cds:I_MaterialDocumentItem"],
      },
      {
        he: "לבדוק: ניפוק 261 לפקודה דרך MIGO ומציאת השורה ב-MATDOC; דוחות MB51 ו-MB5B נשענים על תצוגות התאימות.",
        xrefs: ["tx:MIGO", "tx:MB51", "tx:MB5B"],
      },
    ],
    antiPatterns: [
      "INSERT או UPDATE ישיר ל-MSEG או MKPF בקוד מותאם.",
      "דוחות Z שמניחים ש-MKPF ו-MSEG הן טבלאות פיזיות נפרדות עם JOIN ביניהן.",
      "קריאת מצרפי מלאי מעמודות ערך ב-MARD או MARC כמקור אמת.",
    ],
    checks: [
      "קבלה 101 דרך MIGO ומציאת השורה ב-MATDOC.",
      "דוחות מלאי (MB51, MB5B) נשענים על CDS תאימות.",
      "בדיקת קוד מותאם שקורא MKPF או MSEG ישירות.",
      "וידוא שקריאות MSEG עוברות דרך תצוגת התאימות, ובדיקת הרחבות ו-Append על MSEG.",
    ],
    xrefs: [
      "table:MSEG", "table:MKPF", "tx:MIGO", "tx:MB51", "tx:MB5B",
      "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem", "obj:material-document",
    ],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT · MATDOC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MKPF ו-MSEG מאוחדות ל-MATDOC והמלאי מחושב בזמן ריצה; כל קריאה או דיווח שנשען ישירות על " +
          "MKPF או MSEG חייב לעבור דרך MATDOC או תצוגת תאימות. הרשומה מפנה ל-SAP Note 1976487.",
        verificationLevel: "repository_verified",
        sapNote: "1976487",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT · MSEG)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "פריטי מסמך החומר מאוחסנים ב-MATDOC; MSEG הופכת לתצוגת תאימות (NSDM_V_MSEG), ו-SELECT ישיר " +
          "ממשיך לעבוד דרך התצוגה לקריאה בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג אובייקטי ה-S/4HANA של הפרויקט (S4_OBJECTS · MSEG)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "S/4 1511",
        accessedAt: DATE,
        claim:
          "כתיבה ישירה ל-MSEG אסורה; תנועות נרשמות דרך BAPI_GOODSMVT_CREATE או MIGO. האיחוד רשום תחת " +
          "גרסת S/4 1511.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-objects.ts#MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא ההשוואה ECC מול S/4HANA במאגר (matdoc)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "קוד שכותב או קורא ישירות ל-MKPF, MSEG או MARD דורש בדיקה; הנושא רלוונטי ל-PP ול-PM דרך " +
          "תנועות 261 ו-101 לפקודות.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#matdoc",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "Integrating Warehouse Management in SAP S/4HANA (SAP PRESS), ספריית הפרויקט: warehouse-management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רישום צריכה לפקודת ייצור מעדכן את מסמך החומר של הניפוק (Goods Issue) ב-SAP ERP וב-SAP S/4HANA.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/library-content.json#warehouse-management/4",
      },
    ],
    lastVerifiedAt: DATE,
    reviewer: "Project NEO foundation pass",
    notes:
      "ספריית הפרויקט אינה מתעדת את MATDOC בשמה; הציטוט מהספר תומך רק בכך שרישום ניפוק לפקודה יוצר " +
      "מסמך חומר. מספר ה-SAP Note מועתק מרשומת המאגר. הרשומה ממתינה לסקירת עורך אנושית ולתיעוד רשמי " +
      "בשלב האיסוף.",
  },
];
