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
          "ההמוני של S/4HANA (tx:IP30H). מזהה ה-BOR‏ BUS2093 שהתדריך מונה אינו מופיע באף קובץ של המאגר וטרם אומת " +
          "מול רשומה רשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP01",
      },
    ],
    xrefs: ["table:MPLA", "table:MPOS", "tx:IP01", "tx:IP30H", "cds:I_MaintenancePlan"],
    lastVerifiedAt: SEED_DATE,
    notes:
      "רשומת זרע: BUS2093 נרשם כמזהה לאימות בלבד (מקור: התדריך), לא כעובדה; אימות רשמי ממתין לפייפליין ה-objects.",
  },
];
