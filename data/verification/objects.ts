/* Project NEO · verification overlay — business-object registry (`obj:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   A registry entry is a page-less grouping of objects the repository already
   documents together. "material-document" is the repository's own grouping:
   the ecc-s4 topic "matdoc" and the S4_IMPACT MATDOC entry list exactly these
   members. Nothing here invents a member. */
import type { RegistryEntry, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const SEED_DATE = "2026-09-22";

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

export const OBJECT_VERIFICATION: VerificationRecord[] = [
  {
    id: "obj:material-document",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "נושא ההשוואה ECC מול S/4HANA במאגר (matdoc)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תנועות מלאי נשמרו ב-ECC ב-MKPF (כותרת) וב-MSEG (פריטים); ב-S/4HANA טבלת ליבה אחת, MATDOC, " +
          "מאחדת כותרת ופריט, וכמויות המלאי מחושבות בזמן ריצה.",
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
          "רשומת ההשפעה של MATDOC במאגר מפנה ל-SAP Note 1976487 ולפריט הפישוט של ניהול מלאי (MM-IM), " +
          "ומונה את MIGO, MB51 ו-MB5B ואת BAPI_GOODSMVT_CREATE כאובייקטי התהליך.",
        verificationLevel: "repository_verified",
        sapNote: "1976487",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
    ],
    xrefs: ["table:MSEG", "table:MKPF", "bp:matdoc-read-through-compatibility"],
    lastVerifiedAt: DATE,
    notes:
      "מספר ה-SAP Note מועתק מרשומת המאגר, לא מהזיכרון. אימות מול me.sap.com יתבצע בשלב האיסוף.",
  },
  /* ---- seeds, 2026-09-22 ------------------------------------------------ */
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
          "IW21 / IW22 / IW23 (יצירה, שינוי, תצוגה) ו-IW24 / IW28 / IW29 (רשימות). ה-BOR‏ BUS2038 עצמו טרם אומת " +
          "מול רשומה רשמית (SWO1 או תיעוד SAP) בשכבה הזו.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BUS2038",
      },
    ],
    xrefs: ["table:QMEL", "tx:IW21", "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "רשומת זרע (seed): קיבוץ של אובייקטים שהמאגר כבר מתעד יחד. מזהה ה-BOR נלקח מקובץ ההעשרה של המאגר ומהתדריך; " +
      "אימות רשמי של האובייקט העסקי (SWO1 / תיעוד BAPI Explorer) ממתין לפייפליין ה-objects. לא בוצעה בדיקה במערכת חיה.",
  },
  {
    id: "obj:maintenance-order",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI פקודות האחזקה (data/bapi-enrichment.pm.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומות BAPI_ALM_ORDER_MAINTAIN / GET_DETAIL / ORDERHEAD_GET_LIST במאגר משויכות לתהליך Maintenance Order " +
          "ונושאות את מילת המפתח BUS2007; טבלאות הפקודה במאגר: AUFK (כותרת), AFIH (כותרת PM), AFKO / AFVC / AFRU " +
          "(פקודה, פעולות, אישורים), RESB (רכיבים), ILOA (מיקום/חשבון); הטרנזקציות IW31 / IW32 / IW33 ו-IW38 / IW39, " +
          "IW41 / IW42 לאישורים; תצוגת CDS‏ I_MaintenanceOrder ויישומי Fiori‏ F2731 / F2730. ה-BOR‏ BUS2007 מופיע " +
          "במאגר כמילת מפתח בלבד וטרם אומת מול רשומה רשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
    ],
    xrefs: ["table:AUFK", "table:AFIH", "tx:IW31", "fm:BAPI_ALM_ORDER_MAINTAIN", "cds:I_MaintenanceOrder"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "רשומת זרע: מזהה ה-BOR‏ BUS2007 נלקח ממילות המפתח של המאגר ומהתדריך; אימות רשמי ממתין לפייפליין ה-objects.",
  },
  {
    id: "obj:process-order",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההעשרה של BAPI הזמנות התהליך (data/bapi-enrichment.pppi.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: SEED_DATE,
        claim:
          "רשומות BAPI_PROCORD_CREATE / GET_DETAIL / RELEASE / COMPLETE_TECH ו-BAPI_PROCORDCONF_CREATE_TT במאגר " +
          "נושאות bor: BUS2116 (Process Order) ומשויכות לטרנזקציות COR1 / COR2 / COR3 ולטבלאות AFKO / AFPO / AFVC / " +
          "RESB; האישורים ב-AFRU דרך COR6N / CORK; יישומי Fiori‏ F3577 (Manage Process Orders) ו-F3364 (Confirm " +
          "Process Order). ה-BOR‏ BUS2116 נלקח מקובץ ההעשרה של המאגר וטרם אומת מול רשומה רשמית בשכבה הזו.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PROCORD_CREATE",
      },
    ],
    xrefs: ["table:AFKO", "table:AFPO", "tx:COR1", "fm:BAPI_PROCORD_CREATE", "fiori:F3577"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "רשומת זרע: מזהה ה-BOR‏ BUS2116 מקובץ ההעשרה של המאגר ומהתדריך; אימות רשמי ממתין לפייפליין ה-objects.",
  },
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
