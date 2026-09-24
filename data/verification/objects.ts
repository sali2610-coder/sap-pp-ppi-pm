/* Project NEO · verification overlay — business-object registry (`obj:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   A registry entry is a page-less grouping of objects the repository already
   documents together. "material-document" is the repository's own grouping:
   the ecc-s4 topic "matdoc" and the S4_IMPACT MATDOC entry list exactly these
   members. Nothing here invents a member.
   Objects batch 1 (2026-09-24, const DATE24): material-document,
   maintenance-notification, maintenance-order and process-order are superseded
   by their audited records, each written from its adversarial verdict's
   fixedRecord (0 refuted). Writer changes only: status.source points at the
   hoisted evidence const, dates use the constants below, and the process-order
   draft's reviewer field was dropped (no overlay record carries one). Registry
   members are unchanged. The catalog left the repository-only foundation guard
   in test/evidence-schema.test.ts in the same change.
   Objects batch 2 (2026-09-24, const DATE24): batch, maintenance-plan,
   equipment and functional-location are superseded by their audited records
   (0 refuted). equipment and functional-location are their verdicts'
   fixedRecord; batch and maintenance-plan are the researcher drafts with the
   verdicts' downgrades applied. Writer changes as in batch 1 (hoisted
   status.source, date constants, maintenance-plan reviewer field dropped); the
   two restored seed rows (tx-intel IP01, IL01) keep SEED_DATE and their text.
   One registry change, ordered by the batch verdict: the obj:batch member
   fiori:F1576 (the library's Supplier Evaluation Response) became fiori:F2462
   (Manage Batches). */
import type { Evidence, RegistryEntry, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const SEED_DATE = "2026-09-22";
const DATE24 = "2026-09-24";

export const OBJECT_REGISTRY: RegistryEntry[] = [
  {
    id: "obj:material-document",
    he: "מסמך חומר (תנועות מלאי)",
    en: "Material Document",
    members: [
      "table:MKPF", "table:MSEG", "tx:MIGO", "tx:MB51", "tx:MB5B",
      "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem",
    ],
  },
  /* SEEDS (design-audit continuation §11, 2026-09-22). Five more groupings the
     repository already documents together; every member is an id that exists
     in the universe (checked against the route manifest, the function
     registry, data/cds-map.ts and data/fiori/apps.ts before writing). The BOR
     object ids the brief names are recorded in the records below as claims to
     verify, never as facts the members prove. */
  {
    id: "obj:maintenance-notification",
    he: "הודעת תחזוקה",
    en: "Maintenance Notification",
    members: [
      "table:QMEL", "table:QMFE", "table:QMMA", "table:QMSM", "table:QMUR",
      "tx:IW21", "tx:IW22", "tx:IW23", "tx:IW24", "tx:IW28", "tx:IW29",
      "fm:BAPI_ALM_NOTIF_CREATE", "fm:BAPI_ALM_NOTIF_SAVE", "fm:BAPI_ALM_NOTIF_GET_DETAIL", "fm:BAPI_ALM_NOTIF_DATA_MODIFY",
      "cds:I_MaintenanceNotification", "fiori:F1511",
    ],
  },
  {
    id: "obj:maintenance-order",
    he: "פקודת תחזוקה",
    en: "Maintenance Order",
    members: [
      "table:AUFK", "table:AFIH", "table:AFKO", "table:AFVC", "table:AFRU", "table:RESB", "table:ILOA",
      "tx:IW31", "tx:IW32", "tx:IW33", "tx:IW38", "tx:IW39", "tx:IW41", "tx:IW42",
      "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_CONF_CREATE",
      "cds:I_MaintenanceOrder", "fiori:F2731", "fiori:F2730",
    ],
  },
  {
    id: "obj:process-order",
    he: "הזמנת תהליך",
    en: "Process Order",
    members: [
      "table:AFKO", "table:AFPO", "table:AFVC", "table:RESB", "table:AFRU",
      "tx:COR1", "tx:COR2", "tx:COR3", "tx:COR6N", "tx:CORK", "tx:COID",
      "fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORD_GET_DETAIL", "fm:BAPI_PROCORD_RELEASE", "fm:BAPI_PROCORDCONF_CREATE_TT",
      "fiori:F3577", "fiori:F3364",
    ],
  },
  {
    id: "obj:batch",
    he: "אצווה",
    en: "Batch",
    members: [
      "table:MCH1", "table:MCHA", "tx:MSC1N", "tx:MSC2N", "tx:MSC3N",
      "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "cds:I_Batch", "fiori:F2462",
    ],
  },
  {
    id: "obj:maintenance-plan",
    he: "תוכנית תחזוקה",
    en: "Maintenance Plan",
    members: [
      "table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO",
      "tx:IP01", "tx:IP02", "tx:IP03", "tx:IP10", "tx:IP30", "tx:IP30H", "tx:IP41", "tx:IP42",
      "fm:BAPI_MAINTENANCEPLAN_CREATE", "cds:I_MaintenancePlan",
    ],
  },
  /* SEEDS, second round (master completion, 2026-09-22). Ten groupings taken
     from the related-object fields (tables, bapis) of the transaction
     intelligence records in data/tx-intel.ts. A member is listed only when its
     id resolves in the universe; names a record lists that the universe lacks
     are named in the record's notes, never added as members. No BOR id is
     claimed for any of these. */
  {
    id: "obj:equipment",
    he: "ציוד",
    en: "Equipment",
    members: [
      "table:EQUI", "table:EQKT", "table:EQUZ", "table:ILOA",
      "tx:IE01", "tx:IE02", "tx:IE03", "tx:IE4N",
      "fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE", "fm:BAPI_EQUI_INSTALL", "fm:BAPI_EQUI_GETDETAIL",
      "cds:I_Equipment",
    ],
  },
  {
    id: "obj:functional-location",
    he: "מיקום פונקציונלי",
    en: "Functional Location",
    members: [
      "table:IFLOT", "table:IFLOS", "table:ILOA",
      "tx:IL01", "tx:IL02", "tx:IL03",
      "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_FUNCLOC_GETDETAIL",
      "cds:I_FunctionalLocation",
    ],
  },
  {
    id: "obj:measuring-point",
    he: "נקודת מדידה ומסמך מדידה",
    en: "Measuring Point",
    members: [
      "table:IMPTT", "table:IMRG",
      "tx:IK01", "tx:IK02", "tx:IK03", "tx:IK11", "tx:IK12",
      "fm:BAPI_MPID_CREATE", "fm:MEASUREM_DOCUM_RFC_SINGLE_001",
    ],
  },
  {
    id: "obj:maintenance-task-list",
    he: "רשימת משימות תחזוקה",
    en: "Maintenance Task List",
    members: [
      "table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ",
      "tx:IA01", "tx:IA02", "tx:IA03", "tx:IA05", "tx:IA06",
    ],
  },
  {
    id: "obj:reservation",
    he: "שמורה",
    en: "Reservation",
    members: [
      "table:RESB", "table:MARD", "table:MARC",
      "tx:MB21", "tx:MB22", "tx:MB23",
      "fm:BAPI_RESERVATION_CREATE1",
    ],
  },
  {
    id: "obj:planned-order",
    he: "הזמנה מתוכננת",
    en: "Planned Order",
    members: [
      "table:RESB",
      "tx:MD11", "tx:MD12", "tx:MD13",
      "fm:BAPI_PLANNEDORDER_CREATE", "fm:BAPI_PLANNEDORDER_GET_DETAIL",
    ],
  },
  {
    id: "obj:production-order",
    he: "פקודת ייצור",
    en: "Production Order",
    members: [
      "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:RESB",
      "tx:CO01", "tx:CO02", "tx:CO03", "tx:CO11N", "tx:CO15",
      "cds:I_ProductionOrder",
    ],
  },
  {
    id: "obj:material-bom",
    he: "עץ מוצר לחומר",
    en: "Material BOM",
    members: [
      "table:MAST", "table:STKO", "table:STPO", "table:STAS",
      "tx:CS01", "tx:CS02", "tx:CS03",
      "fm:CSAP_MAT_BOM_CREATE", "fm:CSAP_MAT_BOM_MAINTAIN", "fm:CSAP_MAT_BOM_READ", "fm:BAPI_MATERIAL_BOM_GROUP_CREATE",
    ],
  },
  {
    id: "obj:master-recipe",
    he: "מתכון אב",
    en: "Master Recipe",
    members: [
      "table:PLKO", "table:PLPO", "table:PLAS", "table:PLMZ", "table:MAPL",
      "tx:C201", "tx:C202", "tx:C203",
    ],
  },
  {
    id: "obj:work-center",
    he: "מרכז עבודה / משאב",
    en: "Work Center",
    members: [
      "table:CRHD", "table:CRCA", "table:CRCO", "table:CRTX", "table:KAKO",
      "tx:CR01", "tx:CR02", "tx:CR03",
      "cds:I_WorkCenter",
    ],
  },
];

/* Official rows that also carry a record's status (status.source), objects batch 1. */
const MATDOC_SIMPL_2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "S4TWL - DATA MODEL IN INVENTORY MANAGEMENT (MM-IM) (Simplification List for SAP S/4HANA 2025 - " +
    "Feature Pack Stack 1, item 15.3.1)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "פריט הפישוט (15.3.1, רכיב MM-IM-GF-MIG, הערה קשורה 2206980 המודפסת בפריט) מתאר את מודל הנתונים של " +
    "ERP 6.0 כשתי טבלאות מסמך, MKPF לכותרת ו-MSEG לפריטים, וקובע שב-S/4HANA המודל שונה משמעותית; הציטוט: " +
    "'The new de-normalized table MATDOC has been introduced which contains the former header and item " +
    "data of a material document ... Material document data will be stored in MATDOC only and not " +
    "anymore in MKPF and MSEG.'",
  verificationLevel: "sap_official_verified",
};
const NOTIF_API_OPS_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Maintenance Notifications",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "הדף 'Operations for Maintenance Notifications' במדריך APIs for Maintenance Management (SAP S/4HANA " +
    "2025 FPS01) מפרט את הפעולות של ה-API‏ API_MAINTNOTIFICATION עבור הודעת תחזוקה: קריאה (GET), יצירה " +
    "(POST) ועדכון (PATCH) דרך /sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification.",
  verificationLevel: "sap_official_verified",
};
const MAINTORDER_API_WN2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "OData API: Maintenance Order (What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 " +
    "FPS01)",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/5bde6113f9fd41afba2740a652612498.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "עמוד ה-What's New של 2025 FPS01 מציין שניתן כעת לערוך פקודות תחזוקה הניתנות לחיוב (billable) " +
    "באמצעות ה-OData API‏ Maintenance Order (Version 2)‏ (API_MAINTENANCEORDER_0002). הפרטים הטכניים: " +
    "סוג Changed, רכיב יישום PM-WOC-MO, Valid as Of 2025 FPS01, זמינות SAP S/4HANA Cloud Private Edition " +
    "ו-SAP S/4HANA.",
  verificationLevel: "sap_official_verified",
};
const PROCORD_F4587_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "SAP Fiori Apps Reference Library, Manage Process Orders (F4587)",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4587')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "רשומת הספרייה (fal-app.mjs F4587, S32OP = 2025 FPS01): 'Manage Process Orders', Transactional / SAP " +
    "Fiori elements, Published, רכיב PP-FIO-PI (Fiori UI for Process Order); תפקיד " +
    "SAP_BR_PRODN_SUPERVISOR_PROC (Production Supervisor - Process Manufacturing); קטלוג עסקי " +
    "SAP_SCM_BC_PROC_ORD_MGMT; intent ProcessOrder-manage; שירותי OData: PP_MPE_AOR, " +
    "PP_PROCESS_ORDER_MANAGE_SRV, וקבוצת שירות V4 PP_MPE_AOR_SRV (S4CORE 109). גרסאות: מ-S18OP (2020) " +
    "ועד S37 (2608).",
  verificationLevel: "sap_official_verified",
};

/* Official rows that also carry a record's status (status.source), objects batch 2. */
const BATCH_F2462_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "SAP Fiori Apps Reference Library: Manage Batches (F2462), S/4HANA 2025 FPS01",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2462')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "רשומת הספרייה ל-F2462 על S32OP (2025 FPS01), שנקראה דרך scripts/fal-app.mjs: 'Manage Batches', " +
    "Transactional, SAP Fiori elements, Published, רכיב LO-BM-FIO (Fiori UI for Batch Management). שירות " +
    "OData‏ LO_BM_BATCH_SRV (S4CORE 109), intent Batch-displayList, ובין הקטלוגים העסקיים " +
    "SAP_SCM_BC_BATCH_MGMT ו-SAP_SCM_BC_BATCH_DSP. טרנזקציית GUI מובילה MSC1N; טרנזקציות קשורות MSC2N " +
    "ו-MSC3N; אין אפליקציות קודמות או יורשות. זוהי רשומת הספרייה של 'Manage Batches' בגרסה זו.",
  verificationLevel: "sap_official_verified",
};
const MPLAN_F5325_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Fiori Apps Library: F5325 Manage Maintenance Plans (S32OP, SAP S/4HANA 2025 FPS01 on-premise)",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5325')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "לפי scripts/fal-app.mjs על S32OP (SAP S/4HANA 2025 FPS01), F5325 Manage Maintenance Plans הוא יישום " +
    "Transactional מסוג SAP Fiori elements בסטטוס Published, ברכיב היישום PM-FIO-PRM-MP (Fiori UI for PM " +
    "Maintenance Plans), עם התפקידים SAP_BR_MAINTENANCE_PLANNER ו-SAP_BR_MD_SPECIALIST_EAM, הקטלוגים " +
    "העסקיים SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_MP_MNG, הקטלוג הטכני SAP_TC_EAM_COMMON וה-intent‏ " +
    "MaintenancePlan-manage. טרנזקציית ה-GUI המובילה היא IP01 והקשורות IP02/IP03/IP04/IP05/IP06/IP16. " +
    "שירותי ה-OData המודפסים: UI_MAINTENANCE_PLAN (0001, S4COREOP 109), C_MAINTPLANACTVSYSTSTATUSQ_CDS " +
    "(0001, S4COREOP 109) ו-/SSB/SMART_BUSINESS_RUNTIME_SRV (0001, S4COREOP 109). הגרסה הראשונה הרשומה " +
    "היא S24OP (2022); הקודמים הרשומים: F3622 Find Maintenance Plans, F5009 Find Maintenance Plans - " +
    "Service ו-W0026 Manage Maintenance Plan and Item List; לא רשום successor.",
  verificationLevel: "sap_official_verified",
};
const FLOC_DEF_S4_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Functional Location | Technical Objects (CS-BD/PM-EQM), SAP S/4HANA 2025 FPS01",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/bed5b853dcfcb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "גוף העמוד (נקרא דרך sap-help-body.mjs) מגדיר את המיקום הפונקציונלי כאובייקט עסקי שהוא יחידה ארגונית " +
    "(organizational unit) בלוגיסטיקה, המבנה את אובייקטי התחזוקה של החברה לפי קריטריונים פונקציונליים, " +
    "תהליכיים או מרחביים ומייצג את המקום שבו מבוצעת משימת תחזוקה; הציטוט: 'The business object " +
    "functional location is an organizational unit within Logistics'. כל מיקום פונקציונלי מוגדר ומנוהל " +
    "ברכיב Plant Maintenance (PM) ברשומת אב נפרדת, עם תוויות היררכיות. קבוצות הנתונים ברשומת האב: נתוני " +
    "מיקום ותחזוקה, ונתוני שותפים (למשל supplier, purchaser, responsible employee). פונקציות נוספות " +
    "המודפסות: נקודות מדידה, מונים ומסמכי מדידה, Approval, טקסט רב-לשוני, סיווג (classification), ניהול " +
    "מסמכים וניהול כתובות.",
  verificationLevel: "sap_official_verified",
};

export const OBJECT_VERIFICATION: VerificationRecord[] = [
  /* ---- objects batch 1, audited records, 2026-09-24 ------------------- */
  {
    id: "obj:material-document",
    evidence: [
      MATDOC_SIMPL_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד הארכוב של MM-IM (Supply Chain) מציין שב-S/4HANA קיימת טבלה יחידה חדשה, MATDOC, במקום MKPF " +
          "ו-MSEG, ושהוצג מודל נתונים חדש ומפושט; הציטוט מה-snippet: 'There is a new single table MATDOC " +
          "instead of the existing tables MKPF and MSEG'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "F0843 Post Goods Receipt for Purchasing Document (Fiori Apps Library, S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0843')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library של F0843 (במאגר תחת 'post-goods-movement') מדפיסה שני שירותי OData: " +
          "MMIM_GR4PO_DL_SRV ו-MMIM_MATERIAL_DATA_SRV (S4CORE 109), טרנזקציית GUI מובילה MB01 וטרנזקציות " +
          "קשורות MB0A, MB1A, MB1C, MIGO, MIGO_GR; סטטוס 'Published', קטלוג טכני SAP_TC_PRC_IM_COMMON.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Document Item (Virtual Data Model and CDS Views)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/14305f6e8cb842bbb1647ffd5a30ca31.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (נקרא דרך sap-help-body.mjs) מציין את תצוגת ה-CDS I_MaterialDocumentItem_2 בסטטוס " +
          "Released, כתצוגה היורשת של I_MaterialDocumentItem; התצוגה בנויה על האובייקט העסקי 'Material " +
          "document', מספקת את נתוני שורות הפריט שלו ומקושרת ל-I_MaterialDocumentHeader_2.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "נושא ההשוואה ECC מול S/4HANA במאגר (matdoc)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תנועות מלאי נשמרו ב-ECC ב-MKPF (כותרת) וב-MSEG (פריטים); ב-S/4HANA טבלת ליבה אחת, MATDOC, מאחדת " +
          "כותרת ופריט, וכמויות המלאי מחושבות בזמן ריצה.",
        verificationLevel: "repository_verified",
        repoRef: "data/ecc-s4.ts#matdoc",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת ההשפעה של MATDOC במאגר מפנה ל-SAP Note 1976487 ולפריט הפישוט של ניהול מלאי (MM-IM), ומונה את " +
          "MIGO, MB51 ו-MB5B ואת BAPI_GOODSMVT_CREATE כאובייקטי התהליך.",
        verificationLevel: "repository_verified",
        sapNote: "1976487",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
    ],
    status: {
      status: "simplified",
      he:
        "מסמך החומר קיים גם ב-ECC; ב-S/4HANA מודל הנתונים שלו פושט: כותרת ופריט נשמרים בטבלה אחת, MATDOC, " +
        "ולא עוד ב-MKPF וב-MSEG, כפי שקובע פריט הפישוט של MM-IM.",
      edition: "on-premise",
      release: "2025.001",
      source: MATDOC_SIMPL_2025,
      recommendedAction:
        "לבדוק קוד מותאם שקורא או כותב ל-MKPF/MSEG מול פריט הפישוט של MM-IM; לפי רשומת המאגר (ecc-s4#matdoc) " +
        "קריאות SELECT ממשיכות לעבוד דרך תצוגות תאימות, וכתיבה ישירה אינה נתמכת. לקריאת שורות מסמך דרך VDM, " +
        "תיעוד SAP מציין את I_MaterialDocumentItem_2 (Released) כיורשת של I_MaterialDocumentItem.",
    },
    xrefs: ["table:MSEG", "table:MKPF", "fiori:F0843", "cds:I_MaterialDocumentItem", "bp:matdoc-read-through-compatibility"],
    lastVerifiedAt: DATE24,
    notes:
      "חיפושי sap-help-search.mjs: 'material document', 'MATDOC universal journal inventory', 'MATDOC " +
      "single source of truth simplification', 'Archiving Material Documents', 'Material Document Item' " +
      "(21 רשומות לכל אחד); fal-app.mjs על F0843 (S32OP); פריט הפישוט 15.3.1 נקרא " +
      "מ-scratchpad/official/SIMPL_OP2025.pdf.txt; גוף עמוד ה-VDM נקרא דרך sap-help-body.mjs. מזהה ה-BOR " +
      "הרשמי של האובייקט לא אותר ברשומה רשמית. היסטוריה: 'מספר ה-SAP Note מועתק מרשומת המאגר, לא מהזיכרון. " +
      "אימות מול me.sap.com יתבצע בשלב האיסוף.' -> פריט הפישוט הרשמי מדפיס את הערה 2206980 כהערה הקשורה; " +
      "1976487 נשאר כהפניית מאגר בלבד. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "obj:maintenance-notification",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI ההודעות (data/bapi-enrichment.pm.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "קובץ ההעשרה של BAPI ההודעות מציין שכל הרשומות שבו אומתו מול SAP Help תחת ה-Business Object‏ BUS2038 " +
          "(S/4HANA On-Premise) ומשייך אליו את BAPI_ALM_NOTIF_CREATE / SAVE / GET_DETAIL / DATA_MODIFY; טבלאות " +
          "ההודעה במאגר: QMEL (כותרת), QMFE (פריטים), QMMA (פעילויות), QMSM (משימות), QMUR (סיבות); הטרנזקציות " +
          "IW21 / IW22 / IW23 (יצירה, שינוי, תצוגה) ו-IW24 / IW28 / IW29 (רשימות).",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BUS2038",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Realization (PM-WOC-MN)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/805892ef876c41ad886c213b03c7194c/dd67b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הדף 'Technical Realization (PM-WOC-MN)' (SAP S/4HANA 2025 FPS01) קובע שהודעת תחזוקה תואמת לסוג " +
          "האובייקט העסקי BUS2038, ושהיא מזוהה לפי מספר ההודעה (שדה מפתח).",
        verificationLevel: "sap_official_verified",
      },
      NOTIF_API_OPS_2025,
      {
        sourceType: "fiori_library",
        sourceTitle: "Request Maintenance - SAP Fiori Apps Reference Library",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1511')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת F1511 בספריית Fiori Apps (S32OP, S/4HANA 2025 FPS01) מציגה את שם היישום 'Request Maintenance' " +
          "(שונה מהשם 'Create Maintenance Request' שרשום כרגע במאגר), Intent‏ " +
          "MaintenanceNotification-create_simple, שירות OData‏ EAM_NTF_CREATE 0001, קטלוג עסקי " +
          "SAP_EAM_BC_MREQ, טרנזקציית GUI מובילה IW21 ותפקידים SAP_BR_EMPLOYEE, SAP_BR_EMPLOYEE_MAINTENANCE, " +
          "SAP_BR_MAINTENANCE_PLANNER ו-SAP_BR_MAINTENANCE_TECHNICIAN; היישום היורש הרשום הוא F1511A‏ 'Create " +
          "Maintenance Request'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "released_api_available",
      he:
        "ב-SAP S/4HANA 2025 FPS01 קיים ה-API‏ API_MAINTNOTIFICATION לקריאה, יצירה ועדכון של הודעות תחזוקה, " +
        "לצד הטרנזקציות IW21 עד IW29 שמתועדות במאגר.",
      edition: "on-premise",
      release: "2025.001",
      source: NOTIF_API_OPS_2025,
      recommendedAction:
        "לבנות אינטגרציות חדשות על API_MAINTNOTIFICATION ולהשאיר את IW21 עד IW29 לעבודה הקלאסית ב-SAP GUI. " +
        "ברשימות הפישוט שנסרקו (2023 FPS03, 2025 FPS01) לא נמצא פריט S4TWL על הודעת תחזוקה. זה ממצא שלילי " +
        "מתועד ולא אישור שאין השפעה.",
    },
    xrefs: ["table:QMEL", "tx:IW21", "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification", "fiori:F1511"],
    lastVerifiedAt: DATE24,
    notes:
      "Old → New: המזהה BUS2038 היה מאומת בשכבת ההעשרה של המאגר בלבד (\"טרם אומת מול רשומה רשמית\"); עכשיו " +
      "הוא מאומת בדף Technical Realization (PM-WOC-MN), גרסה 2025.001. הבדיקות שבוצעו: (1) חיפוש grep " +
      "במאגר; (2) sap-help-search.mjs עם 'maintenance notification business object' ועם 'Maintenance " +
      "Notification API OData service' (SAP_S4HANA_ON-PREMISE), ועם 'notification' (--product SAP_ERP). " +
      "בצד ECC נמצא הדף 'Maintenance Notifications (PM-WOC-MN)' (6.03.latest), והוא לא צוטט כראיה; (3) " +
      "fal-app.mjs F1511 --release S32OP. גופי העמודים לא נקראו, והטענות מוגבלות לכותרת ולתקציר. שם F1511 " +
      "במאגר ('Create Maintenance Request') לא תואם לספריית Fiori ('Request Maintenance'); את זה צריך לתקן " +
      "בקטלוג ה-Fiori. ברשימות הפישוט לא נמצא פריט S4TWL על הודעת תחזוקה, וזה ממצא שלילי מתועד. לא בוצעה " +
      "בדיקה במערכת SAP חיה.",
  },
  {
    id: "obj:maintenance-order",
    evidence: [
      {
        sourceType: "fiori_library",
        sourceTitle: "F5241 Manage Maintenance Orders (Fiori Apps Library)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5241')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library ל-F5241 (Manage Maintenance Orders, SAP Fiori elements) מציגה אותה " +
          "כיישום Published תחת רכיב PM-FIO-WOC-MO, עם התפקיד SAP_BR_MAINTENANCE_PLANNER, קטלוג עסקי " +
          "SAP_EAM_BC_WORKORD_MNG, ה-intent MaintenanceOrder-manageWorkOrder, ושירות OData‏ V4 בקבוצה " +
          "UI_MAINTENANCEORDER_MANAGE (רכיב Backend S4CORE 109). הטרנזקציה המובילה המקושרת היא IW31, " +
          "וטרנזקציות קשורות IW32/IW33/IW37N/IW38/IW39. הזמינות רשומה עבור S30OP (2023 FPS03) עד S32OP (2025 " +
          "FPS01), בעריכת On-Premise ובעריכת Private Cloud גם יחד. הפריט הקודם הרשום הוא F2175 (Find " +
          "Maintenance Order); לא רשום successor.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order (What's New in SAP S/4HANA 2023)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/abbd23f555bb482f9d2b3a838fa8ab6b.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE24,
        claim:
          "עמוד ה-What's New של SAP S/4HANA 2023 מציין שה-OData API‏ MaintenanceOrder הוצא משימוש (deprecated) " +
          "ושגרסת ממשיך שוחררה, MaintenanceOrder (Version 2), הכוללת ישויות שהשתנו והורחבו: Maintenance Order " +
          "Settlement Rule (Version 2), Maintenance Order Operation Component (Version 2) ו-Maintenance Order " +
          "Component Long Text (Version 2). הפרטים הטכניים: רכיב יישום PM-WOC-MO (Maintenance Orders), פריטי " +
          "היקף 4HH/4HI/BH1/BH2/BJ2, Valid as Of SAP S/4HANA 2023.",
        verificationLevel: "sap_official_verified",
      },
      MAINTORDER_API_WN2025,
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI פקודות התחזוקה (data/bapi-enrichment.pm.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "הרשומות BAPI_ALM_ORDER_MAINTAIN, BAPI_ALM_ORDER_GET_DETAIL ו-BAPI_ALM_ORDERHEAD_GET_LIST במאגר " +
          "משויכות לתהליך Maintenance Order ונושאות bor: BUS2007. רשומת BAPI_ALM_ORDER_MAINTAIN מפרטת את " +
          "הטבלאות AUFK, AFIH, AFVC, AFVV ו-RESB ואת הטרנזקציות IW31, IW32 ו-IW38. ה-BOR‏ BUS2007 לקוח מקובץ " +
          "ההעשרה של המאגר וטרם אומת מול רשומה רשמית (SWO1 או תיעוד BAPI Explorer) בשכבה הזו.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
    ],
    status: {
      status: "released_api_available",
      he:
        "פקודת התחזוקה חשופה ב-SAP S/4HANA דרך ה-OData API‏ Maintenance Order (Version 2)‏ " +
        "(API_MAINTENANCEORDER_0002). לפי What's New של SAP S/4HANA 2023 הוא שוחרר כגרסת ממשיך ל-OData API‏ " +
        "MaintenanceOrder שהוצא משימוש, ולפי What's New של 2025 FPS01 הוא שונה כך שניתן לערוך בו פקודות " +
        "תחזוקה הניתנות לחיוב; לממשק המשתמש קיים יישום Fiori elements‏ F5241 Manage Maintenance Orders על " +
        "קבוצת שירות OData V4‏ UI_MAINTENANCEORDER_MANAGE.",
      edition: "on-premise",
      release: "2025.001",
      source: MAINTORDER_API_WN2025,
      recommendedAction:
        "בפיתוח ממשק חדש לבחון את ה-OData API‏ Maintenance Order (Version 2)‏ (API_MAINTENANCEORDER_0002) " +
        "לצד BAPI_ALM_ORDER_MAINTAIN, ולא את ה-OData API‏ MaintenanceOrder שהוצא משימוש; לממשק המשתמש לבחון " +
        "את F5241. יש לוודא בגרסת היעד את פריטי ההיקף 4HH/4HI/BH1/BH2/BJ2 ואת רכיב PM-WOC-MO.",
    },
    xrefs: ["table:AUFK", "table:AFIH", "tx:IW31", "fm:BAPI_ALM_ORDER_MAINTAIN", "cds:I_MaintenanceOrder", "fiori:F5241"],
    lastVerifiedAt: DATE24,
    notes:
      "השיוך ל-BOR‏ BUS2007 עדיין לא אומת מול רשומה רשמית (SWO1/BAPI Explorer), ולא נמצא בחיפושי " +
      "help.sap.com. היסטוריה: רשומת הזרע כללה את F2731 ו-F2730 ברשימת החברים; fal-app.mjs החזיר עבורם " +
      "תוצאה ריקה ב-S24OP, S27OP, S30OP, S31OP ו-S32OP (שלילה מתועדת, לא קביעה שהם אינם קיימים), ולכן " +
      "F2731/F2730 → F5241 בשדה ה-xrefs. לפי fal-app.mjs --tcode IW31 @ S32OP, היישומים שמובילים ב-IW31 הם " +
      "F2023, F2953, F5241, W0017 ורשומת ה-GUI‏ IW31. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "obj:process-order",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Reference Objects | Production Planning and Control",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/62d3b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד Reference Objects של Production Planning and Control (S/4HANA 2025 FPS01) מונה את אובייקטי " +
          "הייחוס, והסניפט מדפיס: 'BUS2004 Planned Order BUS2005 Production Order BUS0001 Process Order " +
          "BUS2116 Production Order Confirmation BUS2016 Process Order Confirmation'. לפי הרשימה, BUS0001 הוא " +
          "אובייקט הייחוס של הזמנת התהליך, BUS2016 של אישור הזמנת התהליך, ו-BUS2116 של אישור הזמנת הייצור.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Implementation | Workflow",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/c96cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד ה-Workflow מתאר את 'BUS2116: Confirmation' עם 'Location in the Object Repository: Production " +
          "Planning and Control → Production Orders → Order Processing → Confirmations' ואת האירוע " +
          "BUS2116.MaxDifferenceExceeded. המיקום הזה תואם את שיוך BUS2116 לאישורי הזמנת ייצור, ולא להזמנת " +
          "התהליך.",
        verificationLevel: "sap_official_verified",
      },
      PROCORD_F4587_FAL,
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library, Manage Process Order Operations (F5323)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5323')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה (fal-app.mjs F5323, S32OP = 2025 FPS01): 'Manage Process Order Operations', " +
          "Transactional / SAP Fiori elements, Published, רכיב PP-FIO-PI; תפקיד SAP_BR_PRODN_SUPERVISOR_PROC; " +
          "קטלוג עסקי SAP_SCM_BC_PROC_ORD_MGMT; intent ProcessOrderOperation-manage; שירותי OData: PP_MPE_AOR, " +
          "PP_PROCESS_ORDER_MANAGE_SRV, וקבוצת V4 PP_MPE_AOR_SRV. גרסאות: מ-S21OP (2021) ועד S37 (2608).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת האימות fiori:F3577 (Manage Process Orders): פער המזהים בקטלוג",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת האימות fiori:F3577 מאמתת את קיום היישום Manage Process Orders (רכיב PP-FIO-PI, הוצג ב-2020). " +
          "לפי הרשומה, אף מקור רשמי שנבדק לא נוקב במזהה F3577, והמזהה בתיעוד SAP הוא F4587, לצד F5323 ל-Manage " +
          "Process Order Operations. שני המזהים נוספו לקטלוג data/fiori/apps.ts כ-fiori:F4587 ו-fiori:F5323. " +
          "הרשומה ממליצה להשאיר את F3577 ככינוי של F4587, והפיכתו לכינוי נשארת החלטת מוצר.",
        verificationLevel: "repository_verified",
        repoRef: "data/verification/fiori.ts#fiori:F3577",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI הזמנות התהליך (data/bapi-enrichment.pppi.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומות BAPI_PROCORD_CREATE / GET_DETAIL / RELEASE / COMPLETE_TECH במאגר משויכות לטרנזקציות COR1 / " +
          "COR2 / COR3 ולטבלאות AFKO / AFPO / AFVC / RESB; BAPI_PROCORDCONF_CREATE_TT משויך ל-CORK / CORR " +
          "ולטבלת AFRU. הרשומות נושאות כיום bor: BUS2116. לפי עמוד Reference Objects (2025.001), BUS0001 הוא " +
          "הזמנת התהליך ו-BUS2116 הוא אישור הזמנת הייצור, ולכן יש לתקן את שדה ה-bor במאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PROCORD_CREATE",
      },
    ],
    status: {
      status: "fiori_alternative_available",
      he:
        "הזמנת תהליך (Process Order, אובייקט ייחוס BUS0001; אישור הזמנת תהליך BUS2016) מנוהלת ב-SAP S/4HANA " +
        "2025 FPS01 On-Premise גם באפליקציות Fiori: Manage Process Orders (F4587) ו-Manage Process Order " +
        "Operations (F5323), רכיב PP-FIO-PI, לצד הטרנזקציות הקלאסיות COR1 / COR2 / COR3.",
      edition: "on-premise",
      release: "2025.001",
      source: PROCORD_F4587_FAL,
      recommendedAction:
        "להציג את BUS0001 כאובייקט הייחוס של הזמנת התהליך (BUS2116 שייך לאישור הזמנת הייצור) ואת F4587 / " +
        "F5323 כמזהי ה-Fiori של Manage Process Orders / Manage Process Order Operations, עד להסרת F3577 " +
        "מהקטלוג ומחברי ה-registry ולתיקון שדה ה-bor ב-data/bapi-enrichment.pppi.ts. לתפעול קלאסי להפנות " +
        "ל-COR1 / COR2 / COR3; לתפעול ב-Fiori להפנות ל-F4587, שלפי הספרייה משתמש " +
        "ב-PP_PROCESS_ORDER_MANAGE_SRV וב-PP_MPE_AOR. זה נפרד מה-API המשוחרר API_PROCESS_ORDER_2_SRV שמתועד " +
        "ברשומה fiori:F3577.",
    },
    xrefs: ["table:AFKO", "table:AFPO", "table:AFVC", "table:RESB", "table:AFRU", "tx:COR1", "tx:COR2", "tx:COR3", "tx:COR6N", "fm:BAPI_PROCORD_CREATE", "fm:BAPI_PROCORD_GET_DETAIL", "fiori:F4587", "fiori:F5323", "fiori:F3577"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) רשומת הזרע ב-data/verification/objects.ts ורשומות ה-BAPI ב-data/bapi-enrichment.pppi.ts; " +
      "(2) ארבעה חיפושים ב-scripts/sap-help-search.mjs: 'Process Order PP-PI', 'Manage Process Orders " +
      "app', 'BUS2116', 'Process Order BUS0001 business object'; (3) node scripts/fal-app.mjs על F4587 " +
      "ו-F5323 (S32OP), ועל F3577 ו-F3364. F3577 ו-F3364 לא נמצאו בספרייה בגרסאות S32OP / S27OP / S24OP / " +
      "S30OP (תוצאה ריקה). ב-S31OP המזהה F3577 מחזיר את 'Yard Logistics - Yard Task Execution', אפליקציה " +
      "לא קשורה. זו תוצאת חיפוש שלילית מתועדת ולא קביעה. fiori:F3364 נשאר ברמת verification_required. " +
      "היסטוריה: ה-BOR ברשומת הזרע היה BUS2116, ותוקן כאן ל-BUS0001 לפי עמוד Reference Objects (2025.001). " +
      "חברי ה-registry (obj:process-order.members: fiori:F3577, fiori:F3364) לא שונו כאן. גוף העמודים " +
      "(sap-help-body.mjs) לא נקרא, וכל טענות ה-Help מבוססות על כותרת וסניפט בלבד. לא נמצא פריט " +
      "Simplification List שנוקב בהזמנת תהליך. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ---- objects batch 2, audited records, 2026-09-24 ------------------- */
  {
    id: "obj:batch",
    evidence: [
      BATCH_F2462_FAL,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item " +
          "5.1.8 S4TWL - Logistics Batch Management",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "פריט 5.1.8 'S4TWL - Logistics Batch Management' (רכיב LO-BM-MD) ברשימת הפישוט 2025 FPS01 קובע " +
          "שהטרנזקציות MSC1, MSC2, MSC3 ו-MSC4 אינן זמינות ב-SAP S/4HANA, on-premise edition 1511, ושהמקבילות " +
          "הפונקציונליות הן MSC1N (Create Batch), MSC2N (Change Batch), MSC3N (Display Batch) ו-MSC4N (Display " +
          "Change Documents for Batch). לפי סעיף Business Process related information אין השפעה על התהליך " +
          "העסקי, ויש להשתמש בקודים החלופיים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reference Objects (Production Planning and Control)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/62d3b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט של דף 'Reference Objects' (Production Planning and Control, 2025.001) מונה 'BUS1001002 " +
          "Batch' לצד BUS1001 Material, BUS2004 Planned Order ו-BUS0001 Process Order, ברשימת האובייקטים " +
          "העסקיים הזמינים כאובייקט ייחוס להערות משמרת (shift notes); זהו המקור הרשמי שמצמיד את BUS1001002 לשם " +
          "Batch.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch (Virtual Data Model and CDS Views)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/ef1cd6cd9fb6418bb311b2b8e37b6b1e.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (נקרא באמצעות scripts/sap-help-body.mjs) מציג: Technical Name I_Batch, View Type " +
          "Composite, Release Status Released; התצוגה בנויה על אובייקט העסקים Batch, וזמינה רק עם הרשאה " +
          "M_MATE_CHG לחומר האצווה ופעילות \"03\". העמוד מונה שאלות עסקיות שהתצוגה עונה עליהן, בהן מועד פקיעת " +
          "חיי המדף, איתור הספק של האצווה והמפעלים שבהם נעשה שימוש באצווה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Batch API (APIs for Logistics Cross Topics)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1841426f60f4e50913ec9a64aba8332/3d366e68d53345b4bad055ec8fe85d6e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט של 'Operations for Batch API' (APIs for Logistics Cross Topics, 2025.001) מונה פעולות על " +
          "הישות Batch בשירות API_BATCH_SRV: Query Batch ב-GET, Create Batch ב-POST ו-Change Batch ב-PATCH, עם " +
          "כתובות לדוגמה <host>/sap/opu/odata/SAP/API_BATCH_SRV/Batch. הסניפט אינו מציין סטטוס שחרור לשירות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Supplier Evaluation Response (F1576), S/4HANA 2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1576')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה F1576 ב-S32OP היא Supplier Evaluation Response (רכיב SLC-EVL, OData‏ " +
          "SLC_QUESTIONNAIRE_RESPONSE_SRV), ללא טרנזקציות GUI מובילות או קשורות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI האצוות (data/bapi-enrichment.pppi.ts)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת BAPI_BATCH_CREATE במאגר נושאת bor: BUS1001002 ותהליך 'Batch Management', משויכת ל-MSC1N " +
          "ולטבלאות MCH1 / MCHA / MCHB ומפנה ל-BAPI_BATCH_GET_DETAIL, שבמאגר משויכת ל-MSC3N ולטבלאות MCH1 / " +
          "MCHA.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_BATCH_CREATE",
      },
    ],
    status: {
      status: "fiori_alternative_available",
      he:
        "ניהול אצוות (Batch, אובייקט עסקי BUS1001002) זמין ב-SAP S/4HANA 2025 FPS01 On-Premise באפליקציית " +
        "Fiori‏ Manage Batches (F2462, רכיב LO-BM-FIO, OData‏ LO_BM_BATCH_SRV), לצד הטרנזקציות שמופיעות " +
        "ברשומת האפליקציה כטרנזקציית ה-GUI המובילה (MSC1N) וכטרנזקציות קשורות (MSC2N, MSC3N). תיעוד ה-API " +
        "מתאר את שירות ה-OData‏ API_BATCH_SRV, ועמוד ה-CDS (2023.latest) מציג את I_Batch בסטטוס Released.",
      edition: "on-premise",
      release: "2025.001",
      source: BATCH_F2462_FAL,
      recommendedAction:
        "להציג את BUS1001002 כמזהה האובייקט העסקי Batch, כפי שהוא מופיע ברשימת Reference Objects, ואת F2462 " +
        "(Manage Batches) כמזהה ה-Fiori לפי הספרייה, במקום F1576 שהספרייה מזהה כ-Supplier Evaluation " +
        "Response (SLC-EVL). בהסבה מ-ECC, לפי 'S4TWL - Logistics Batch Management', להחליף שימוש ב-MSC1 / " +
        "MSC2 / MSC3 / MSC4 ב-MSC1N / MSC2N / MSC3N / MSC4N. לפעולות API להפנות ל-API_BATCH_SRV, ולצריכת " +
        "נתונים לתצוגת CDS‏ I_Batch.",
    },
    xrefs: ["table:MCH1", "table:MCHA", "tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "cds:I_Batch", "fiori:F2462"],
    lastVerifiedAt: DATE24,
    notes:
      "Old → New: רשומת הזרע (2026-09-22, repoRef data/bapi-enrichment.pppi.ts#BAPI_BATCH_CREATE) קשרה את " +
      "האצווה ל-F1576 (Manage Batches) ונשאה xref fiori:F1576; הספרייה מזהה את F1576 כ-Supplier Evaluation " +
      "Response ואת Manage Batches כ-F2462, ולכן ה-xref הוחלף ל-fiori:F2462 ושורת המאגר נכתבה מחדש בלי " +
      "הטענה על F1576. שיטה: fal-app.mjs על F2462 ועל F1576 (S32OP); שלושה חיפושים " +
      "ב-scripts/sap-help-search.mjs בהיקף SAP_S4HANA_ON-PREMISE: 'API_BATCH_SRV Batch' (21 תוצאות, בהן " +
      "Operations for Batch API), 'Batch business object BUS1001002' (21 תוצאות, בהן Reference Objects), " +
      "'I_Batch CDS view' (21 תוצאות, בהן Batch, loio ef1cd6cd9fb6418bb311b2b8e37b6b1e); גוף עמוד אחד נקרא " +
      "עם sap-help-body.mjs (I_Batch); פריט 5.1.8 נקרא מטקסט רשימת הפישוט 2025 FPS01 שחולץ " +
      "ב-scratchpad/official/SIMPL_OP2025.pdf.txt, לאחר שאותר דרך " +
      "audit/master-completion/simpl-tcode-index.json (MSC1N / MSC2N / MSC3N נקובים בפריט 5.1.8 ב-2025 " +
      "ובפריט 3.3 ב-2023 FPS03). חבר ה-registry עודכן מ-fiori:F1576 ל-fiori:F2462 (Old → New). לא בוצעה " +
      "בדיקה במערכת SAP חיה.",
  },
  {
    id: "obj:maintenance-plan",
    evidence: [
      MPLAN_F5325_FAL,
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Manage Maintenance Plan and Item List App (What's New in SAP S/4HANA 2023 FPS01)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/0e83f36ad7914324976ddc9db47621fc.html?locale=en-US&state=PRODUCTION&version=2023.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.001",
        accessedAt: DATE24,
        claim:
          "רשומת What's New של SAP S/4HANA 2023 FPS01 מציינת שהיישום Manage Maintenance Plan and Item List " +
          "(W0026) נמחק ואינו זמין עוד ב-Fiori launchpad ('has been deleted and is no longer available on the " +
          "SAP Fiori launchpad').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Plans (What's New in SAP S/4HANA 2022)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/a784971bbee742b2bc491a97583a3621.html?locale=en-US&state=PRODUCTION&version=2022.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        accessedAt: DATE24,
        claim:
          "רשומת What's New של SAP S/4HANA 2022 מתארת את היישום Manage Maintenance Plans: מתכנן התחזוקה יכול " +
          "להציג, ליצור, לשנות, לתזמן, להפעיל ולמחוק תכניות תחזוקה ('view, create, change, schedule, activate, " +
          "and delete maintenance plans'), Valid as Of SAP S/4HANA 2022.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IP01 / IP10 / IP30) ורשומת tx:IP30H",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומות IP01 / IP02 / IP03 / IP10 / IP30 במאגר משייכות את תוכנית האחזקה לטבלאות MPLA (כותרת), MPOS " +
          "(פריטים), MHIS (היסטוריית תזמון) ו-MHIO (אובייקטי קריאה), ל-IP41 / IP42 (תוכנית מחזור יחיד / " +
          "אסטרטגיה), ל-BAPI_MAINTENANCEPLAN_CREATE ולתצוגת CDS‏ I_MaintenancePlan; IP30H נרשמה ב-2026-09-22 " +
          "כנתיב התזמון ההמוני של S/4HANA (tx:IP30H). מזהה ה-BOR‏ BUS2093 שהתדריך מונה לתוכנית האחזקה מופיע " +
          "במאגר רק כמזהה ה-BOR של BAPI_RESERVATION_CREATE1 (שמורה, data/bapi-enrichment.pppi.ts), ואף רשומה " +
          "במאגר אינה קושרת אותו לתוכנית אחזקה; הוא טרם אומת מול רשומה רשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP01",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: cds-map.ts#I_MaintenancePlan",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר ממפה את תצוגת ה-CDS‏ I_MaintenancePlan (צריכה: C_MaintenancePlan) למודול PM, לטבלאות " +
          "MPLA/MPOS ולשם היישום Manage Maintenance Plans.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaintenancePlan",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: bapi-enrichment.pm.ts#BAPI_MAINTENANCEPLAN_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מציינת ש-BAPI_MAINTENANCEPLAN_CREATE 'אינו קיים' ומפנה במקומו ל-FM‏ " +
          "MPLAN_CREATE/MPLAN_CHANGE (או לטרנזקציות IP01/IP41/IP42), בעוד רשומת הרישום של obj:maintenance-plan " +
          "מונה את fm:BAPI_MAINTENANCEPLAN_CREATE כחבר; זו סתירה פנימית במאגר שלא טופלה במשימה זו (ראו notes).",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_MAINTENANCEPLAN_CREATE",
      },
    ],
    status: {
      status: "fiori_alternative_available",
      he:
        "ב-SAP S/4HANA 2025 FPS01 (on-premise) זמין היישום Fiori‏ Manage Maintenance Plans (F5325), רכיב " +
        "היישום PM-FIO-PRM-MP, קטלוגים עסקיים SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_MP_MNG, על שירות ה-OData‏ " +
        "UI_MAINTENANCE_PLAN. W0026 (Manage Maintenance Plan and Item List) רשום בספריית Fiori כקודם של " +
        "F5325 (F5325 זמין מ-S/4HANA 2022, S24OP), ולפי What's New של 2023 FPS01 הוא נמחק מה-Fiori launchpad.",
      edition: "on-premise",
      release: "2025.001",
      source: MPLAN_F5325_FAL,
      recommendedAction:
        "בממשק המשתמש להפנות משתמשים ליישום Manage Maintenance Plans (F5325) ולא ל-W0026, שלפי What's New של " +
        "SAP S/4HANA 2023 FPS01 נמחק ואינו זמין עוד ב-Fiori launchpad; ספריית ה-Fiori משייכת ל-F5325 את " +
        "טרנזקציית ה-GUI המובילה IP01 ואת הטרנזקציות הקשורות IP02/IP03. לוודא בגרסת היעד את הקטלוגים העסקיים " +
        "SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_MP_MNG ואת התפקיד SAP_BR_MAINTENANCE_PLANNER. שדה ה-BAPI ברשומת " +
        "האובייקט דורש בירור נפרד (ראו notes).",
    },
    xrefs: ["fiori:F5325", "table:MPLA", "table:MPOS", "tx:IP01", "tx:IP30H", "cds:I_MaintenancePlan"],
    lastVerifiedAt: DATE24,
    notes:
      "נבדק: F5325 Manage Maintenance Plans דרך scripts/fal-app.mjs (S32OP); שתי רשומות help.sap.com: " +
      "What's New 2023 FPS01 על מחיקת W0026 מה-launchpad (loio 0e83f36ad7914324976ddc9db47621fc, 2023.001) " +
      "ו-What's New 2022 על Manage Maintenance Plans (loio a784971bbee742b2bc491a97583a3621, 2022.000); " +
      "מיפוי ה-CDS‏ I_MaintenancePlan במאגר. חיפושים שהורצו ב-sap-help-search.mjs (size 12, ללא סינון " +
      "מוצר): 'Maintenance Plan S/4HANA' (21 תוצאות), 'Maintenance Plan Simplification Item' (21 תוצאות, " +
      "רשומות What's New ו-Business Functions של Simplified Management of EAM Functions), 'S4TWL " +
      "Scheduling of Maintenance Plan' (21 תוצאות), 'Manage Maintenance Plans app' (21 תוצאות) " +
      "ו-'Deprecation of Manage Maintenance Plan and Item List App' (21 תוצאות). פריט הפישוט 'S4TWL - " +
      "Scheduling of Maintenance Plan' (PM-PRM) נוגע לתזמון (IP30/IP30H) ומתועד ברשומות הטרנזקציה tx:IP30 " +
      "ו-tx:IP30H; רשומה זו אינה מצטטת אותו ואינה קובעת דבר על מבנה MPLA/MPOS. BOR: מזהה ה-BOR‏ BUS2093 " +
      "מהתדריך טרם אומת מול רשומה רשמית; במאגר הוא מופיע כ-BOR של BAPI_RESERVATION_CREATE1 (שמורה) בלבד. " +
      "פער פתוח: bapi-enrichment.pm.ts קובעת ש-BAPI_MAINTENANCEPLAN_CREATE 'אינו קיים' ומפנה ל-FM‏ " +
      "MPLAN_CREATE, בעוד רשומת הרישום מחזיקה את fm:BAPI_MAINTENANCEPLAN_CREATE כחבר; לא נמצא מקור רשמי " +
      "שמדפיס FM או BAPI ליצירת תכנית תחזוקה, והסתירה דורשת תיקון נפרד. Old → New: רשומת הזרע (2026-09-22) " +
      "קבעה: 'BUS2093 נרשם כמזהה לאימות בלבד (מקור: התדריך), לא כעובדה. תיקון 2026-09-23: נוסח קודם קבע " +
      "שהמזהה אינו מופיע במאגר, אך הוא מופיע בו כ-BOR של שמורה; ראו obj:reservation. אימות רשמי ממתין " +
      "לפייפליין ה-objects.' שורת הראיה של הזרע (data/tx-intel.ts#IP01) נשמרה ללא שינוי; עכשיו נוספו שורות " +
      "רשמיות מספריית Fiori ומ-help.sap.com וסטטוס fiori_alternative_available. לא בוצעה בדיקה במערכת SAP " +
      "חיה.",
  },
  {
    id: "obj:equipment",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Transactions (Logistics — General (LO))",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/bcd8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "בפרק Warranty Objects של דף הטרנזקציות (Warranty Processing, Logistics General) מופיעים IE01, IE02, " +
          "IE03 ליצירה, שינוי והצגה של ציוד (\"Create, change and display equipment\"), לצד IL01-IL03 למיקום " +
          "פונקציונלי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Renaming of Apps in Maintenance Management (What's New in SAP S/4HANA and SAP S/4HANA Cloud Private " +
          "Edition 2025)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/c9959e6129174269adf7632bb60c4ed8.html?locale=en-US&state=PRODUCTION&version=2025.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        accessedAt: DATE24,
        claim:
          "הטופיק (Application Component PM) מפרט שינוי שמות של יישומי ציוד: IE01 (Create Equipment - Plant), " +
          "IE03 (Display Equipment), IE05 (Change Equipment - List View), IE08 (Create Equipment - Customer), " +
          "לצורכי עקביות ובהירות: \"this change had no effect on app functionalities\". אין בכך קביעה על סטטוס " +
          "האובייקט ציוד עצמו, רק על שמות היישומים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Library: F2072 Find Technical Object @ S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2072')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת ה-FAL של F2072 (Find Technical Object, S32OP = S/4HANA 2025 FPS01) מציינת טרנזקציית GUI " +
          "מובילה IE03, קודמים F0226 (Equipment), F0227 (Functional Location), W0011 ו-W0012, קטלוגים עסקיים " +
          "SAP_EAM_BC_TO, SAP_EAM_BC_TO_DSP, SAP_EAM_BC_TO_MW ו-SAP_EAM_BC_TO_TMS (לצד קטלוגי EHS ו-SOM), " +
          "קטלוג טכני SAP_TC_EAM_COMMON ושירות OData‏ EAM_OBJPG_TECHNICALOBJECT_SRV. ה-intent הוא " +
          "MaintenanceObject-displayFactSheet, כלומר הצגת אובייקט תחזוקה (ציוד או מיקום פונקציונלי).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Equipment (APIs for Maintenance Management)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d1e3c797d3f44120b552d0e64680e445.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "התיעוד של APIs for Maintenance Management מפרט את שירות ה-OData‏ API_EQUIPMENT עם פעולות GET, POST " +
          "ו-PATCH על ה-entity Equipment (קריאה, יצירה, עדכון) ועל EquipmentLongText, כלומר API_EQUIPMENT " +
          "מתועד ב-help.sap.com כשירות לניהול נתוני ציוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר הקיימת: data/tx-intel.ts#IE01 / #IE02 / #IE03",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת IE01 במאגר מונה את הטבלאות EQUI, EQKT, EQUZ, ILOA ו-EQBS ואת BAPI_EQUI_CREATE " +
          "ו-BAPI_EQMT_CREATE; רשומת IE02 מונה את אותן טבלאות ואת BAPI_EQUI_CHANGE, BAPI_EQUI_INSTALL, " +
          "BAPI_EQUI_DISMANTLE ו-BAPI_EQMT_MODIFY; BAPI_EQUI_GETDETAIL מופיע ברשומת IE03. EQBS, " +
          "BAPI_EQMT_CREATE, BAPI_EQMT_MODIFY ו-BAPI_EQUI_DISMANTLE אינם בקטלוג הפרויקט.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IE01",
      },
    ],
    xrefs: ["table:EQUI", "table:EQKT", "tx:IE01", "tx:IE02", "tx:IE03", "fm:BAPI_EQUI_CREATE", "fiori:F2072", "cds:I_Equipment"],
    lastVerifiedAt: DATE24,
    notes:
      "סטטוס לא נקבע: לא נמצא מקור רשמי שקובע במפורש שאובייקט הציוד (Equipment) כמכלול \"ללא שינוי\" או " +
      "\"S/4-native\" במהדורה מפורשת. המקורות שנמצאו עוסקים בשינוי שמות יישומים (ללא השפעה פונקציונלית), " +
      "ביישום F2072 שרשומת ה-FAL מציינת את F0226 (Equipment) כאחד מקודמיו, ובתיעוד שירות ה-OData‏ " +
      "API_EQUIPMENT. לכן הסטטוס נשאר verification_required. חיפושים שבוצעו (sap-help-search.mjs, " +
      "--product SAP_S4HANA_ON-PREMISE): 'Equipment master data S/4HANA Asset Management' (21 תוצאות), " +
      "'Equipment IE01 IE02 IE03' (21 תוצאות), 'Manage Equipment app S/4HANA' (21 תוצאות), 'Equipment " +
      "API_EQUIPMENT OData' (21 תוצאות), 'S4TWL Equipment simplification' (21 תוצאות, ללא פריט ייעודי " +
      "לציוד). מזהה BOR לא נמצא ברשומה הקיימת או בחיפושים ולכן לא נטען. ממצא קודם (SEED): הרשומות מונות גם " +
      "EQBS, BAPI_EQMT_CREATE, BAPI_EQMT_MODIFY ו-BAPI_EQUI_DISMANTLE שאינם בקטלוג, ולכן אינם חברים. לא " +
      "בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "obj:functional-location",
    evidence: [
      FLOC_DEF_S4_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Functional location | Technical Objects (CS-BD/PM-EQM), SAP ERP 6.0 EHP8 Latest",
        url:
          "https://help.sap.com/docs/SAP_ERP/f0e0dd7850e64947aa66a647f8d3af09/bed5b853dcfcb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio (bed5b853dcfcb44ce10000000a174cb4) מתפרסם בתיעוד SAP ERP 6.0 EHP8. גוף העמוד (נקרא דרך " +
          "sap-help-body.mjs) מדפיס את אותה הגדרה, 'The business object functional location is an " +
          "organizational unit within Logistics', ואת אותן קבוצות נתונים ברשומת האב. בהשוואת שני הגופים נמצאו " +
          "הבדלי ניסוח: דוגמה אחרת (Clarification Plant בעמוד ECC, wastewater treatment plant בעמוד S/4HANA) " +
          "והפונקציה 'Permits' בעמוד ECC במקום 'Approval' בעמוד S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Functional Location | APIs for Maintenance Management, SAP S/4HANA 2025 FPS01",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (נקרא דרך sap-help-body.mjs) מתאר את שירות ה-OData API_FUNCTIONALLOCATION ('Technical " +
          "name: API_FUNCTIONALLOCATION'): קריאה, יצירה ועדכון של נתוני אב של מיקום פונקציונלי, מחיקה של שיוך " +
          "מחלקה (class assignment), יצירה, קריאה ועדכון המוניים וצירוף מסמכים; 'The service is based on OData " +
          "protocol and can be consumed by external systems and user interfaces'. הישויות: " +
          "A_FunctionalLocation ולצדה ישויות לטקסט ארוך, שותף, אחריות (warranty), מחלקה, מאפייני מחלקה, ערכי " +
          "מאפיינים ונתוני Linear Asset Management. השירות בנוי על CDS views המבוססים על טבלאות נתוני האב של " +
          "מיקום פונקציונלי, טקסט ארוך, business partner, מחלקה, מאפיינים, ערכים ואחריות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Process Technical Object (W0029), S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('W0029')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "לפי הרשומה שנקראה דרך scripts/fal-app.mjs (ערוץ ה-OData של הספרייה): W0029 'Process Technical " +
          "Object' היא אפליקציית Web Dynpro בסטטוס Published, רכיב EP-PCT-MAN-MW, תפקיד " +
          "SAP_BR_MAINTENANCE_PLANNER, קטלוג עסקי SAP_EAM_BC_TO, קטלוג טכני SAP_TC_EAM_BE_APPS:S4EAM, intent " +
          "MaintenanceObject-create, ללא שירות OData רשום. טרנזקציית GUI מובילה IE01 וטרנזקציות GUI קשורות " +
          "IE02, IE03, IL01, IL02, IL03. רשימת הגרסאות כוללת את S3OP (S/4HANA 1511) ואת S32OP (2025 FPS01); " +
          "predecessor ו-successor אינם רשומים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IL01 / IL02)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת IL01 במאגר מונה את הטבלאות IFLOT, IFLOTX, ILOA ו-IHPA ואת BAPI_FUNCLOC_CREATE; רשומת IL02 " +
          "מונה את אותן טבלאות ואת BAPI_FUNCLOC_CHANGE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IL01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט (data/cds-map.ts, I_FunctionalLocation)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר ממפה את ה-CDS view I_FunctionalLocation למיקום פונקציונלי במודול PM, עם הטבלאות IFLOT " +
          "ו-ILOA.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_FunctionalLocation",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "לפי עמוד ההגדרה (loio bed5b853dcfcb44ce10000000a174cb4) שנקרא בשתי הגרסאות, המיקום הפונקציונלי נשאר " +
        "ב-SAP S/4HANA 2025 FPS01 אובייקט עסקי המנוהל ברכיב Plant Maintenance ברשומת אב נפרדת, עם אותה הגדרה " +
        "ואותן קבוצות נתונים כמו ב-SAP ERP 6.0 EHP8; הבדל הניסוח המודפס ברשימת הפונקציות הוא 'Permits' בעמוד " +
        "ECC מול 'Approval' בעמוד S/4HANA.",
      edition: "on-premise",
      release: "2025.001",
      source: FLOC_DEF_S4_2025,
      recommendedAction:
        "להעביר את המיקומים הפונקציונליים כנתוני אב של PM תוך שמירה על מבנה התוויות ההיררכי; לאינטגרציות " +
        "לבחון את שירות ה-OData API_FUNCTIONALLOCATION המתועד ב-2025 FPS01. IL01, IL02 ו-IL03 מופיעות ברשומת " +
        "W0029 בספריית Fiori כטרנזקציות GUI קשורות. זמינות BAPI_FUNCLOC_CREATE ושאר פונקציות ה-BAPI למיקום " +
        "פונקציונלי בגרסת היעד דורשת בדיקה במערכת SAP. לא בוצעה בדיקה במערכת SAP חיה.",
    },
    xrefs: ["table:IFLOT", "table:ILOA", "tx:IL01", "tx:IL02", "tx:IL03", "fm:BAPI_FUNCLOC_CREATE", "cds:I_FunctionalLocation", "fiori:W0029"],
    lastVerifiedAt: DATE24,
    notes:
      "Old → New: הרשומה הקודמת (2026-09-22) נשענה על שורת המאגר data/tx-intel.ts#IL01 בלבד, ללא סטטוס, עם " +
      "הממצא 'מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. IFLOTX, IHPA " +
      "ו-BAPI_FUNCLOC_CHANGE אינם בקטלוג ולכן אינם חברים. IFLOS נוסף מרשומת fm:FUNC_LOCATION_LABEL_READ " +
      "בתור. אימות רשמי ממתין לפייפליין ה-objects.' הרשומה החדשה שומרת את שורת המאגר ללא שינוי, מוסיפה " +
      "ארבע ראיות רשמיות (הגדרת האובייקט ב-S/4HANA 2025 FPS01 וב-SAP ERP 6.0 EHP8, שירות " +
      "API_FUNCTIONALLOCATION, רשומת W0029), שורת מאגר מ-data/cds-map.ts שמגבה את ההפניה " +
      "ל-I_FunctionalLocation, וסטטוס unchanged שמקורו בעמוד ההגדרה של S/4HANA. חברי הקיבוץ " +
      "ב-OBJECT_REGISTRY לא שונו. לא נטען מזהה BOR: אף מקור שנקרא אינו מדפיס אחד. בטקסט המחולץ של " +
      "Simplification List 2025 FPS01 נמצא הפריט 'S4TWL - Batch Input for Enterprise Asset Management " +
      "(EAM)'; הוא אינו מצוטט כראיה ואינו משמש מקור לסטטוס. חיפושים שבוצעו ב-help.sap.com " +
      "(sap-help-search.mjs): 'Functional location definition business object' (S/4HANA on-premise, 21 " +
      "תוצאות, העמוד bed5b853 ראשון), 'functional location' עם --product SAP_ERP (21 תוצאות, אותו loio " +
      "בגרסה 6.18.latest ראשון), 'API_FUNCTIONALLOCATION' (21 תוצאות; עמוד Operations for Functional " +
      "Location ודפי המשנה Read/Create/Update, ללא עמוד השירות b6a1e644) ו-'Functional Location " +
      "API_FUNCTIONALLOCATION' (21 תוצאות, עמוד השירות b6a1e644 בגרסה 2025.001 בתוצאה השישית). גופי " +
      "העמודים נקראו דרך sap-help-body.mjs: הגדרת האובייקט ב-S/4HANA, הגדרת האובייקט ב-ECC ועמוד השירות. " +
      "W0029 נקראה דרך fal-app.mjs עם --release S32OP. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  /* ---- seeds, second round, 2026-09-22 ------------------------------- */
  {
    id: "obj:measuring-point",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IK01 / IK11)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת IK01 במאגר מונה את הטבלאות IMPTT, IMRG ו-IHPA; רשומת IK11 מונה את IMRG ו-IMPTT. רישום הפונקציות של הפרויקט מתעד את BAPI_MPID_CREATE ליצירת נקודת מדידה ואת MEASUREM_DOCUM_RFC_SINGLE_001 למסמך מדידה בודד.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IK01",
      },
    ],
    xrefs: ["table:IMPTT", "table:IMRG", "tx:IK01", "tx:IK11", "fm:BAPI_MPID_CREATE"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. סתירה פנימית במאגר: רשומת IK01 מונה את BAPI_MEASUREMENTPOINT_CREATE, ורישום הפונקציות קובע שהשם הזה אינו קיים ומפנה ל-BAPI_MPID_CREATE. החבר שנבחר הוא זה של רישום הפונקציות; הסתירה ממתינה לאימות רשמי.",
  },
  {
    id: "obj:maintenance-task-list",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IA05 / IA06)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומות IA05 ו-IA06 במאגר מונות את הטבלאות PLKO, PLPO, PLAS, PLMZ ו-PLFH.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IA05",
      },
    ],
    xrefs: ["table:PLKO", "table:PLPO", "tx:IA05"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. PLFH ו-BAPI_TASKLIST_GET_DETAIL (שרשומת IA05 מונה) אינם בקטלוג. ל-BAPI_TASKLIST_CREATE יש רשומה בתור המחקר ולכן אינו חבר עד שתיכתב. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:reservation",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, MB21)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת MB21 במאגר מונה את הטבלאות RKPF, RESB, MARD ו-MARC ואת BAPI_RESERVATION_CREATE1 ו-BAPI_RESERVATION_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB21",
      },
    ],
    xrefs: ["table:RESB", "tx:MB21", "fm:BAPI_RESERVATION_CREATE1"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR: קובץ ההעשרה של המאגר " +
      "מתייג את BAPI_RESERVATION_CREATE1 ב-bor: BUS2093 (data/bapi-enrichment.pppi.ts), אך המזהה לא אומת מול רשומה " +
      "רשמית. RKPF ו-BAPI_RESERVATION_CREATE אינם בקטלוג ולכן אינם חברים. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:planned-order",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, MD11 / MD12)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת MD11 במאגר מונה את הטבלאות PLAF ו-RESB ואת BAPI_PLANNEDORDER_CREATE ו-BAPI_PLANNEDORDER_GET_DETAIL; רשומת MD12 מונה את BAPI_PLANNEDORDER_CHANGE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD11",
      },
    ],
    xrefs: ["tx:MD11", "fm:BAPI_PLANNEDORDER_CREATE"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. טבלת הכותרת PLAF ו-BAPI_PLANNEDORDER_CHANGE אינם בקטלוג הטבלאות והפונקציות של הפרויקט ולכן אינם חברים; זה פער בקטלוג, לא טענה על SAP. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:production-order",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, CO01 / CO02)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת CO01 במאגר מונה את הטבלאות AUFK, AFKO, AFPO, AFVC, RESB ו-AFVV ואת BAPI_PRODORD_CREATE; רשומת CO02 מוסיפה את JEST ו-JCDS ואת BAPI_PRODORD_CHANGE, BAPI_PRODORD_RELEASE ו-BAPI_PRODORD_COMPLETE_TECH.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO01",
      },
    ],
    xrefs: ["table:AFKO", "table:AFPO", "tx:CO01", "cds:I_ProductionOrder"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. אף אחד מ-BAPI_PRODORD_* אינו ברישום הפונקציות של הפרויקט, וגם AFVV אינה בקטלוג; לכן לאובייקט אין חבר מסוג פונקציה. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:material-bom",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, CS01 / CS02)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת CS01 במאגר מונה את הטבלאות MAST, STKO, STPO ו-STAS ואת BAPI_MATERIAL_BOM_GROUP_CREATE ו-CSAP_MAT_BOM_CREATE; רשומת CS02 מוסיפה את STZU ואת CSAP_MAT_BOM_MAINTAIN.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CS01",
      },
    ],
    xrefs: ["table:MAST", "table:STKO", "tx:CS01", "fm:CSAP_MAT_BOM_CREATE"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. STZU אינה בקטלוג. CSAP_MAT_BOM_READ נוסף מרישום הפונקציות (קריאת עץ מוצר לחומר). אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:master-recipe",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, C201)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת C201 במאגר מונה את הטבלאות PLKO, PLPO, PLAS, PLMZ ו-MAPL ואת BAPI_RECIPE_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#C201",
      },
    ],
    xrefs: ["table:PLKO", "table:MAPL", "tx:C201"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. BAPI_RECIPE_CREATE אינו ברישום הפונקציות של הפרויקט ולכן אינו חבר. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:work-center",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, CR01 / CR02)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת CR01 במאגר מונה את הטבלאות CRHD, CRCA, CRCO ו-CRTX; רשומת CR02 מוסיפה את KAKO.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CR01",
      },
    ],
    xrefs: ["table:CRHD", "table:KAKO", "tx:CR01", "cds:I_WorkCenter"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. הרשומות אינן מונות BAPI; לכן אין חבר מסוג פונקציה. אימות רשמי ממתין לפייפליין ה-objects.",
  },
];
