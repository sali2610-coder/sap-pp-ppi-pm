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
   in test/evidence-schema.test.ts in the same change. */
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
    he: "הודעת אחזקה",
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
    he: "פקודת אחזקה",
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
      "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "cds:I_Batch", "fiori:F1576",
    ],
  },
  {
    id: "obj:maintenance-plan",
    he: "תוכנית אחזקה",
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
    he: "רשימת משימות אחזקה",
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
  /* ---- seeds, 2026-09-22 ------------------------------------------------ */
  {
    id: "obj:batch",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI האצוות (data/bapi-enrichment.pppi.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת BAPI_BATCH_CREATE במאגר נושאת bor: BUS1001002 (Batch; תוקן ב-2026-09-21 מ-BUS1001_BATCH על סמך " +
          "Reference Objects · Production Planning and Control, loio 62d3b65334e6b54ce10000000a174cb4, 2025.001, " +
          "ראו SAP-FIXES FIX-8c) ומשויכת ל-MSC1N / MSC2N / MSC3N ולטבלאות MCH1 / MCHA; תצוגת CDS‏ I_Batch ויישום " +
          "Fiori‏ F1576 (Manage Batches).",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_BATCH_CREATE",
      },
    ],
    xrefs: ["table:MCH1", "tx:MSC1N", "fm:BAPI_BATCH_CREATE", "cds:I_Batch", "fiori:F1576"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "רשומת זרע: BUS1001002 הוא היחיד מששת מזהי ה-BOR שכבר נסמך על רשומה רשמית (FIX-8c); שאר האימות ממתין " +
      "לפייפליין ה-objects.",
  },
  {
    id: "obj:maintenance-plan",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IP01 / IP10 / IP30) ורשומת tx:IP30H",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומות IP01 / IP02 / IP03 / IP10 / IP30 במאגר משייכות את תוכנית האחזקה לטבלאות MPLA (כותרת), MPOS " +
          "(פריטים), MHIS (היסטוריית תזמון) ו-MHIO (אובייקטי קריאה), ל-IP41 / IP42 (תוכנית מחזור יחיד / אסטרטגיה), " +
          "ל-BAPI_MAINTENANCEPLAN_CREATE ולתצוגת CDS‏ I_MaintenancePlan; IP30H נרשמה ב-2026-09-22 כנתיב התזמון " +
          "ההמוני של S/4HANA (tx:IP30H). מזהה ה-BOR‏ BUS2093 שהתדריך מונה לתוכנית האחזקה מופיע במאגר רק כמזהה ה-BOR " +
          "של BAPI_RESERVATION_CREATE1 (שמורה, data/bapi-enrichment.pppi.ts), ואף רשומה במאגר אינה קושרת אותו " +
          "לתוכנית אחזקה; הוא טרם אומת מול רשומה רשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP01",
      },
    ],
    xrefs: ["table:MPLA", "table:MPOS", "tx:IP01", "tx:IP30H", "cds:I_MaintenancePlan"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "רשומת זרע: BUS2093 נרשם כמזהה לאימות בלבד (מקור: התדריך), לא כעובדה. תיקון 2026-09-23: נוסח קודם קבע " +
      "שהמזהה אינו מופיע במאגר, אך הוא מופיע בו כ-BOR של שמורה; ראו obj:reservation. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  /* ---- seeds, second round, 2026-09-22 ------------------------------- */
  {
    id: "obj:equipment",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IE01 / IE02)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת IE01 במאגר מונה את הטבלאות EQUI, EQKT, EQUZ, ILOA ו-EQBS ואת BAPI_EQUI_CREATE; רשומת IE02 מונה את אותן טבלאות ואת BAPI_EQUI_CHANGE, BAPI_EQUI_INSTALL ו-BAPI_EQUI_DISMANTLE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IE01",
      },
    ],
    xrefs: ["table:EQUI", "table:EQKT", "tx:IE01", "fm:BAPI_EQUI_CREATE", "cds:I_Equipment"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. שמות שהרשומות מונות ואינם בקטלוג: EQBS, BAPI_EQMT_CREATE, BAPI_EQMT_MODIFY, BAPI_EQUI_DISMANTLE. לכן אינם חברים. אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:functional-location",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (data/tx-intel.ts, IL01 / IL02)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומת IL01 במאגר מונה את הטבלאות IFLOT, IFLOTX, ILOA ו-IHPA ואת BAPI_FUNCLOC_CREATE; רשומת IL02 מונה את אותן טבלאות ואת BAPI_FUNCLOC_CHANGE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IL01",
      },
    ],
    xrefs: ["table:IFLOT", "tx:IL01", "fm:BAPI_FUNCLOC_CREATE", "cds:I_FunctionalLocation"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "מקור הקיבוץ: שדות האובייקטים הקשורים ברשומות הטרנזקציה במאגר. לא נטען מזהה BOR. IFLOTX, IHPA ו-BAPI_FUNCLOC_CHANGE אינם בקטלוג ולכן אינם חברים. IFLOS נוסף מרשומת fm:FUNC_LOCATION_LABEL_READ בתור. אימות רשמי ממתין לפייפליין ה-objects.",
  },
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
