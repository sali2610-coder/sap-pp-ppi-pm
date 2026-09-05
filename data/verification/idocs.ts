/* Project NEO · verification overlay — IDoc message types (`idoc:msg:`) and
   the IDoc basic-type registry (`idoc:basic:`).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02): 4 audited records — both message types
   the repository routes (MATMAS, LOIPRO) and the two basic types the registry
   carries (MATMAS05, LOIPRO01). Tier-1 evidence comes from help.sap.com search
   records (scripts/sap-help-search.mjs; loio + versionId re-verified live at
   audit and at write time, every URL HTTP 200) and from one fully-read
   official PDF (SAP Digital Manufacturing Integration Guide 2502). Every claim
   is bounded by the snippet or the read page; negative findings are
   search-bounded, never absolute; auditor downgrades applied in full.
   The basic-type registry carries only names an official record or the
   repository documents: MATMAS05 (PP-PI blueprint "MATMAS (MATMAS05)",
   data/function-intel.ts, data/bapi-enrichment.sweep.ts; "MATMAS IDoc |
   APIs for Product Master" 2025.001) and LOIPRO01 ("LOIPRO01" and
   "Transaction Data", LO-SCI, SAP ERP 6.18.latest). Open conflicts and
   registry suggestions live in audit/s4-enrichment/research-queue-idocs.md. */
import type { Evidence, RegistryEntry, VerificationRecord } from "@/lib/evidence/types";

const DATE2 = "2026-09-02";

/* --------------------------------------------------------------- registry */

export const IDOC_BASIC_TYPES: RegistryEntry[] = [
  {
    id: "idoc:basic:MATMAS05",
    he: "סוג בסיסי (Basic Type) של הודעת אב החומר MATMAS",
    en: "MATMAS05 basic type",
    members: ["idoc:msg:MATMAS"],
  },
  {
    id: "idoc:basic:LOIPRO01",
    he: "סוג בסיסי (Basic Type) של הודעת פקודות הייצור/התהליך LOIPRO, גרסת ממשק POI (LO-SCI)",
    en: "LOIPRO01 basic type (production/process orders, POI)",
    members: ["idoc:msg:LOIPRO"],
  },
];

/* ------------------------------------------------------------- shared docs */

const MATMAS_API_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18fe3fab96864826bfa0be0de4f65b85/5f1d9c221c1841e0b202c5536fc1fa87.html?locale=en-US&state=PRODUCTION&version=2025.001";
const MDG_REPLICATION_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6d52de87aa0d4fb6a90924720a5b0549/64a5cb5285135721e10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2025.001";
const PP_MES_ORDER_INTEGRATION_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001";
const PP_MES_ORDER_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/9fa5153c2a6b495f8b3a8d1cbc26bbb8.html?locale=en-US&state=PRODUCTION&version=2025.001";
const PP_MES_DRF_SETUP_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/667aa2e1747d49aeab7a8c36402d6163.html?locale=en-US&state=PRODUCTION&version=2025.001";
const ERP_PP_MES_ORDER_URL =
  "https://help.sap.com/docs/SAP_ERP/a0d3efbac8b14fc89b29bf47a1677c86/9fa5153c2a6b495f8b3a8d1cbc26bbb8.html?locale=en-US&state=PRODUCTION&version=6.18.latest";
const ERP_PP_MES_ORDER_INTEGRATION_URL =
  "https://help.sap.com/docs/SAP_ERP/a0d3efbac8b14fc89b29bf47a1677c86/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=6.18.latest";
const ERP_LOSCI_POI_IDOCS_URL =
  "https://help.sap.com/docs/SAP_ERP/e1d2edc3460848fdb57a2323fc931758/b81ebf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest";
const ERP_LOSCI_LOIPRO01_URL =
  "https://help.sap.com/docs/SAP_ERP/e1d2edc3460848fdb57a2323fc931758/d61ebf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest";
const ERP_LOSCI_TRANSACTION_DATA_URL =
  "https://help.sap.com/docs/SAP_ERP/e1d2edc3460848fdb57a2323fc931758/aa1ebf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest";
const DMC_INTEGRATION_GUIDE_URL =
  "https://help.sap.com/doc/f6b2ab2222794bebad4c0dcd33138e71/latest/en-US/SAP_DMC_Integration_Guide_enUS.pdf";

/** idoc:msg:MATMAS — the official page that carries its status. */
const MATMAS_API_PAGE: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "MATMAS IDoc | APIs for Product Master",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: MATMAS_API_URL,
  accessedAt: DATE2,
  claim:
    "עמוד MATMAS IDoc בפרק APIs for Product Master לגרסת 2025 FPS01 נוקב בשם הטכני MATMAS05 ומגדיר שה-IDoc מעביר נתוני אב חומר כלליים מטבלאות MARA ממערכת SAP אחת לאחרת; בסניפט נקובים הסגמנטים E1MARMM (MARM), E1MBEWM (MBEW) ו-E1MLGNM (MLGN) וסגמנט ה-C של החומר (MARC).",
  verificationLevel: "sap_official_verified",
};

/** idoc:basic:MATMAS05 — same page, the segment list the snippet names. */
const MATMAS05_API_PAGE: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "MATMAS IDoc | APIs for Product Master",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: MATMAS_API_URL,
  accessedAt: DATE2,
  claim:
    "תיעוד APIs for Product Master לגרסת 2025 FPS01 קובע: 'MATMAS IDoc Technical name: MATMAS05', וכי ה-IDoc מעביר נתוני אב חומר כלליים מטבלאות MARA ממערכת SAP אחת לאחרת. הסניפט מונה את סגמנטי רשומת הנתונים E1MARAM (MARA), E1MARA1 (שדות נוספים ל-E1MARAM), E1MAKTM (MAKT), E1MARCM (MARC), E1MARMM (MARM), E1MBEWM (MBEW), E1MLGNM (MLGN) ו-E1MVKEM (MVKE).",
  verificationLevel: "sap_official_verified",
};

/** idoc:msg:LOIPRO — the 2025 FPS01 PP-MES page that carries its status. */
const LOIPRO_ORDER_INTEGRATION_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Order Integration | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: PP_MES_ORDER_INTEGRATION_URL,
  accessedAt: DATE2,
  claim:
    "עמוד Production Order Integration (PP-MES, S/4HANA 2025 FPS01) קובע: 'The system transfers the order data to the MES using IDoc LOIPRO05 according to the filter criteria you set in the DRF. The MES generates an order', וכן ששינויים בפקודה מועברים ל-MES באותו IDoc: 'The system transfers these changes to the MES using IDoc LOIPRO05 to ensure that the production data remains consistent. The MES confirms the order'. הסניפט מוסיף: 'Distribution by means of transaction POIT (Select Transaction Data for Transfer) is no longer possible'.",
  verificationLevel: "sap_official_verified",
};

/** idoc:basic:LOIPRO01 — the same 2025 FPS01 page, read for what it does not name. */
const LOIPRO01_ORDER_INTEGRATION_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Order Integration | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: PP_MES_ORDER_INTEGRATION_URL,
  accessedAt: DATE2,
  claim:
    "עמוד 'Production Order Integration' (Production Planning and Control, S/4HANA 2025 FPS01) קובע: 'The system transfers the order data to the MES using IDoc LOIPRO05 according to the filter criteria you set in the DRF' וכן 'Distribution by means of transaction POIT (Select Transaction Data for Transfer) is no longer possible'. LOIPRO01 אינו נזכר בקטע התצוגה.",
  verificationLevel: "sap_official_verified",
};

/* --------------------------------------------------------------- records */

export const IDOC_VERIFICATION: VerificationRecord[] = [
  /* ------------------------------------------------------ idoc:msg:MATMAS */
  {
    id: "idoc:msg:MATMAS",
    evidence: [
      MATMAS_API_PAGE,
      {
        sourceType: "sap_help",
        sourceTitle: "Set Up Data Replication | Master Data Governance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: MDG_REPLICATION_URL,
        accessedAt: DATE2,
        claim:
          "בהנחיית הגדרת שכפול הנתונים ב-ALE (MDG, 2025 FPS01) טבלת הפרמטרים (Message Type, Receiver Port, Package Size, Basic Type) משייכת את סוג ההודעה MATMAS לסוג הבסיסי MATMAS05, לצד CLFMAS02, DOLMAS01 ו-ECMREV01; הסניפט מציין שכאשר ALE ו-DRF משמשים יחד לשכפול חומרים ניתן לבטל את מצביעי השינוי (change pointers) של MATMAS לשיפור ביצועים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customizing for ALE Audit (Optional) | Master Data Governance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6d52de87aa0d4fb6a90924720a5b0549/28a8cb5285135721e10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "עמוד ה-ALE Audit של MDG לגרסת 2025 FPS01 נוקב במודול הפונקציה IDOC_INPUT_MATMAS01 ובנקודת ההרחבה ES_SAPLMV02 שבתוכו, כמקום לקוד אישור השכפול ממערכת הלקוח חזרה ל-MDG Hub.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitor IDocs | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/086439eaf4e049e6be3487ca76e7ad48.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "לניטור IDocs נכנסים ויוצאים (בדיקה שהנתונים שוכפלו) ההנחיה הרשמית בפרק Production Engineering and Operations (שכפול ERP אל PEO) לגרסת 2025 FPS01 היא טרנזקציה WE02 (IDoc List) או BD87 (Select IDocs), כאשר BD87 מציגה את מוניטור הסטטוס של רשומות ALE ומאפשרת להציג ולעקוב אחרי IDocs.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "סוג ההודעה MATMAS מתועד ב-S/4HANA On-Premise 2025 FPS01 בפרק APIs for Product Master (סוג בסיסי MATMAS05) ומשמש בתרחישי הפצת אב חומר ב-ALE של MDG, EWM מבוזר ו-PEO. לא נמצא מקור רשמי המסמן אותו כמוחלף, מוגבל או לא אסטרטגי.",
      edition: "on-premise",
      release: "2025.001",
      source: MATMAS_API_PAGE,
      recommendedAction:
        "להמשיך להפיץ אב חומר ב-ALE עם MATMAS. במיגרציה לבדוק בפרופיל השותף (WE20) את הסוג הבסיסי בפועל (MATMAS05 או MATMAS06) ואת קוד התהליך הנכנס, ולנטר ב-WE02 / BD87. לתרחישי אינטגרציה חדשים לשקול את שירותי ה-SOAP של Product Master (Replicate from / to Client) המתועדים באותו פרק. אורך MATNR (40 תווים) מול Zetes / Daymax נשאר בדיקה ברמת נתוני הפרויקט.",
    },
    xrefs: [
      "table:MARA", "table:MARC", "table:MARM", "table:MBEW", "table:MLGN", "cds:I_Product",
      "idoc:basic:MATMAS05", "idoc:msg:LOIPRO", "tx:WE02", "tx:BD87", "tx:WE20", "tx:BD10", "tx:BD64",
      "fm:BAPI_MATERIAL_SAVEDATA",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס נקבע מרשומות חיפוש רשמיות (SAP_S4HANA_ON-PREMISE, 2025 FPS01): MATMAS מתועד כ-IDoc בפרק APIs for Product Master עם השם הטכני MATMAS05, משויך ל-MATMAS05 בהנחיית ALE של MDG, ונקוב בתרחישי EWM מבוזר (Supply Assignment, loio 123195b2) ו-PEO (Transaction Processing in PEO-ERP Integration, loio b8403273). אף מקור רשמי לא נמצא המסמן אותו כמוחלף, מוגבל או לא אסטרטגי, ולכן 'ללא שינוי' בלי יורשת. הפרדה בין סוג הודעה לסוג בסיסי: העמודים הרשמיים נוקבים בשלושה סוגים בסיסיים של אותו סוג הודעה: MATMAS03 (IDoc Types for Distributing Material Master Data by ALE, loio afb1c053), MATMAS05 (APIs for Product Master; MDG; PEO דורש MATMAS05 כגרסה מינימלית, loio 6e3a83da) ו-MATMAS06 (Technical Information: Material Master (MATMAS06), Logistics General, loio 3e436254, סגמנטים מורחבים). זו אינה סתירה אלא גרסאות מקבילות; ברישום הסוגים הבסיסיים של הפרויקט קיים MATMAS05 בלבד, ולכן MATMAS06 אינו ב-xrefs. הסטטוס הנגזר במאגר לפני רשומה זו היה 'משתנה' (בלוק ECC מול S/4HANA ברשומת function-intel, בשל אורך MATNR 40); הרחבת מספר החומר היא הפעלה אופציונלית ולא שינוי בסוג ההודעה עצמו, ולכן הקביעה מן המקור הרשמי גוברת והאזהרה נשמרת ב-recommendedAction כבדיקה ברמת נתוני הפרויקט (data/function-intel.ts#MATMAS, data/s4-objects.ts#MATMAS, data/s4-impact.ts). אובייקטים רשמיים נוספים שנקובים בסניפטים ואינם ב-xrefs כי אינם ביקום המזהים: user exit EXIT_SAPLMV01_002 ביציאה (Customer-Specific Fields in ALE, loio 8c14c453), BAdI BADI_MATMAS_ALE_CR (loio 30ef1d20), קוד תהליך נכנס MATM ו-WE30 לזיהוי הגרסה העדכנית (loio 6e3a83da), טרנזקציות BD50 / BD61 למצביעי שינוי (Activate Change Pointers, loio bdf1b8a5) ודוח RBDMIDOC (loio b0e6f732). WE05 נקובה רשמית רק בהקשר כללי של שגיאות ALE (Other Error Sources, loio b3e54d2d) ולא לצד MATMAS, ולכן לא נרשמה. גופי העמודים לא נקראו (מעטפת JavaScript); כל טענה תחומה בכותרת ובסניפט של רשומת החיפוש. לא בוצעה בדיקה חיה במערכת SAP (חיבור sc4sap נכשל): הסוג הבסיסי הפעיל, קוד התהליך, הקישור בין קוד התהליך MATM למודול IDOC_INPUT_MATMAS01 והסגמנטים המלאים נשארים לאימות ב-WE20 / WE30 / WE60. הטענה 'OData API_PRODUCT' שברשומת function-intel לא אומתה בסניפט רשמי (What's New 2020 נוקב ב-'Product Master (A2X) OData API' בלבד, loio 060f792a), ולכן ההמלצה מפנה לשירותי ה-SOAP הנקובים בפרק. שתי ראיות המאגר הקודמות (sweep, function-intel) הוחלפו בארבע ראיות רשמיות; ניתן להחזירן עם repoRef. קיימת גרסת Public Cloud לעמוד MATMAS IDoc (אותו loio תחת SAP_S4HANA_CLOUD) שלא נקראה; המהדורה ברשומה נשארת On-Premise. ביקורת אדברסרית 2026-09-05: ארבעת ה-URL נבדקו (HTTP 200, loio ו-versionId 2025.001 אומתו מול רשומות החיפוש), כל טענה נמצאה בסניפט, 14 xrefs נפתרים, validateRecords החזיר 0 בעיות.",
  },

  /* ------------------------------------------------------ idoc:msg:LOIPRO */
  {
    id: "idoc:msg:LOIPRO",
    aliases: ["LOIPRO (Production Order)"],
    status: {
      status: "unchanged",
      he:
        "סוג ההודעה LOIPRO ממשיך לשמש ב-S/4HANA להפצת פקודת ייצור ל-MES באותו מנגנון המתועד ב-SAP ERP 6.18: הפצה דרך DRF לפי מסנני ההפצה, BAdI להתאמת ה-IDoc, ואותה מגבלה על POIT לפקודות התואמות את מסנני ה-DRF. ההבדל היחיד בין שני העמודים הוא גרסת הסוג הבסיסי הנקובה: LOIPRO02 ו-LOIPRO03 בעמוד ה-ERP לעומת LOIPRO05 בעמוד 2025 FPS01. מדריך Digital Manufacturing 2502 מונה את LOIPRO05 כנתמך גם ב-SAP ERP וגם ב-S/4HANA, ולכן הגרסה הזמינה נקבעת במערכת (WE30) ולא במהדורה.",
      edition: "on-premise",
      release: "2025.001",
      source: LOIPRO_ORDER_INTEGRATION_2025,
      recommendedAction:
        "לפני ההמרה: להריץ WE30 עם LOIPRO* ולתעד את הגרסה הזמינה במערכת (עמוד Setting Up DRF Integration for MES Processes ממליץ להשתמש בגרסת ה-IDoc העדכנית הזמינה וקובע שהמערכת המקבלת חייבת לעבד את הסוג הבסיסי הרלוונטי; תיעוד 2025 FPS01 נוקב ב-LOIPRO05). לבנות את הפצת פקודות הייצור ל-MES (Zetes/Daymax) על מודל שכפול DRF עם ה-Outbound Implementation של פקודת ייצור, ולא על POIT; המנגנון זהה ב-SAP ERP 6.18 וב-S/4HANA, כך שמודל DRF קיים ניתן להעברה. להתאים את ה-IDoc דרך ה-BAdI המיועד ל-LOIPRO05 במקום לשנות סגמנטים, ולבדוק את מיפוי הסגמנטים מול הסוג הבסיסי בפועל ב-WE02/WE05. לפקודות תהליך (PP-PI): לאמת במערכת ש-DRF מפיץ אותן ב-LOIPRO05 כפי שמתועד במדריך Digital Manufacturing, כי עמודי PP-MES של On-Premise שנסרקו מתעדים במפורש רק את פקודת הייצור.",
    },
    evidence: [
      LOIPRO_ORDER_INTEGRATION_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: PP_MES_ORDER_URL,
        accessedAt: DATE2,
        claim:
          "עמוד Production Order (PP-MES, S/4HANA 2025 FPS01) קובע: 'Under Enhance IDocs for Integration with an MES, there is also a BAdI for adjusting the IDoc LOIPRO05'; 'IDoc LOIPRO05 is used to transmit these serial numbers to the MES'; וכן 'Distribution by means of the transaction Select Transaction Data for Transfer (POIT) is no longer possible for production orders that match the filter criteria specified in the DRF'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order | Production Planning and Control (PP)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: ERP_PP_MES_ORDER_URL,
        accessedAt: DATE2,
        claim:
          "אותו עמוד (אותו loio) במוצר SAP ERP 6.18 קובע: 'Under Enhance IDocs for Integration with an MES, there is also a BAdI for adjusting the IDoc LOIPRO03' ו-'IDoc LOIPRO02 is used to transmit these serial numbers to the MES'; רשומת החיפוש מציגה גם את תחילת משפט ה-POIT: 'Distribution by means of the transaction Select Transaction Data for Transfer (POIT) is no longer p' (קטוע בסניפט). כלומר מנגנון ה-BAdI ומגבלת ה-POIT מתועדים גם ב-ERP, ורק גרסת הסוג הבסיסי הנקובה שונה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Integration | Production Planning and Control (PP)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: ERP_PP_MES_ORDER_INTEGRATION_URL,
        accessedAt: DATE2,
        claim:
          "אותו עמוד (אותו loio) במוצר SAP ERP 6.18 קובע: 'The system transfers the order data to the MES using IDoc LOIPRO03 according to the filter criteria you set in the DRF. The MES generates an order' ו-'The system transfers these changes to the MES using IDoc LOIPRO03 to ensure that the production data remains consistent. The MES confirms the order'. כלומר ערוץ ההפצה דרך DRF מתועד כבר ב-SAP ERP 6.18 ואינו שינוי של S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Setting Up DRF Integration for MES Processes | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: PP_MES_DRF_SETUP_URL,
        accessedAt: DATE2,
        claim:
          "עמוד Setting Up DRF Integration for MES Processes (S/4HANA 2025 FPS01) מציג בטבלת אובייקטי ה-MES 'Production order 97_1 97_1 LOIPRO05' (לצד 'Maintenance order 468_1 468_1 IORDER01' ו-'Material 194_1 194_2 MATMAS06'), מנחה: 'To determine the latest IDoc version in your system, call transaction WE30 and enter the IDoc name with an asterisk (*) instead of the two digit version suffix (for example, enter LOIPRO*)', וקובע: 'All IDoc versions are downwards compatible, but it is recommended that you use the latest available IDoc version' ו-'A prerequisite is that the receiving system is able to process the relevant basis type'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "POI IDocs | Supply Chain Planning Interfaces (LO-SCI)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: ERP_LOSCI_POI_IDOCS_URL,
        accessedAt: DATE2,
        claim:
          "עמוד POI IDocs במדריך Supply Chain Planning Interfaces (LO-SCI) של SAP ERP 6.18 מונה, בטבלת 'From SAP System To External Optimization System', את LOIPRO כסוג ההודעה של 'Production/Process orders', לצד LOIPLO (Planned orders) ו-LOISTD (Stock/requirements lists); כלומר LOIPRO הוא סוג הודעה של ממשק ה-POI ומכסה גם פקודות תהליך.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "SAP Digital Manufacturing Integration Guide (Document Version 2502, 2025-02-16, PDF)",
        product: "SAP Digital Manufacturing",
        edition: "on-premise",
        release: "2502 (2025-02-16)",
        url: DMC_INTEGRATION_GUIDE_URL,
        accessedAt: DATE2,
        claim:
          "מסמך PDF רשמי שנקרא ישירות: טבלת Supported IDocs (עמ' 12, עמודות SAP ERP ו-SAP S/4HANA) מונה 'LOIPRO05 (production and process orders)' עם Yes בשתי העמודות; בהגדרת ה-Partner Profile (עמ' 44) נרשם Message Type LOIPRO עם Basic Type 'LOIPRO05 (production order and process order)'; ב-Distribution Model (עמ' 46) התיאור של LOIPRO הוא 'Production / process order'; ובתרחיש פקודת תהליך (עמ' 199) שחרור הפקודה מעביר אותה דרך DRF 'using IDoc LOIPRO05 according to the filter criteria you set in the DRF'. בעמ' 176, תחת התרחיש 'If you're using SAP ERP 6.00 – 6.04 (configuration type A), you transfer the production order using the transaction POIT', נכתב: 'The POIT transaction supports only the IDoc base types LOIPRO01. Additional fields and segments of the IDoc types LOIPRO02, LOIPRO03, and LOIPRO04 aren't supplied when distributing using the POIT transaction'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "table:AUFK", "table:AFKO", "table:AFPO", "tx:CO01", "tx:COR1", "tx:WE02", "tx:WE20", "tx:WE30",
      "tx:BD64", "idoc:msg:MATMAS", "cds:I_ProductionOrder",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס 'ללא שינוי' מעוגן בהשוואת אותם שני עמודים רשמיים (loio 9fa5153c2a6b495f8b3a8d1cbc26bbb8 ו-loio 7d61c9ecd5754e8cb0e925639b5d8bb0) בשני המוצרים: ב-SAP ERP 6.18 וב-S/4HANA 2025 FPS01 מתועדים אותו מנגנון DRF, אותו BAdI להתאמת ה-IDoc ואותה מגבלת POIT; ההבדל היחיד הוא גרסת הסוג הבסיסי הנקובה (LOIPRO03/LOIPRO02 בעמודי ה-ERP, LOIPRO05 בעמודי 2025 FPS01). רשומות רשמיות נוספות שלא נכנסו לראיות: Define Inbound Processing (ERP and PEO) (loio b931eb00624941d1a0a8ac55321359d3, 2025.001) מציגה 'Basic type LOIPRO05 Message type LOIPRO Direction Inbound Description Production Order' עם Process code PRODORD ומודול CO_IDOC_PRODORDER_INBOUND; What's New 2023 (loio d15cb1081dcb4be7a3c3ba3b00f5f836) מתאר BAdI השולט אם פקודת ייצור או פקודת תהליך מופצת 'in a SOAP or IDoc message' ל-MES ונוקב ברכיבים PP-SFC ו-PP-PI-POR, ושם ה-BAdI BD_CO_MES_INT_DISTRIBUTION מופיע ב-loio ac42a1c2eac84149a352e95f4df1d4cc; ה-BAdI אינו ביקום ההרחבות של המאגר ולכן אינו ב-xrefs. עמוד Transaction Data של LO-SCI ב-ERP 6.18 (loio aa1ebf53d25ab64ce10000000a174cb4) נוקב ב-LOIPRO01 ל-'Production orders/ process orders'. עמוד Integration of ME Routings (loio 8df516a959ca4a9e8b88db5948250c8f, 2025.001) עדיין נוקב ב-LOIPRO03, כך שהגרסה הנקובה משתנה בין עמודים; הגרסה בפועל נקבעת במערכת. מספרי SAP Note 3115603 (LOIPRO05 version 2), 2888888, 2931412 ו-3017004 מופיעים מילולית במדריך Digital Manufacturing; לא נרשמו בשדה sapNote כי me.sap.com לא נגיש ותוכנם לא נקרא. רשימת הסגמנטים של ה-IDoc לא אומתה; שמות הסגמנטים E1AFKOL, E1AFVOL ו-E1AFFLL מופיעים בעמודי LO-SCI של ERP (CLOI_ORD_EXP ודומיו) והשם E1PLKOL שב-function-intel.ts לא נמצא בשום מקור. סתירה ברובד המאגר: data/function-intel.ts, data/centers/integration.ts, data/domains.ts ו-data/concepts.ts מתארים את LOIPRO כ-IDoc של מתכון/מסלול, בעוד לפי התיעוד הרשמי מסלולים מופצים ב-LOIROU ו-LOIPRO מיועד לפקודת ייצור/תהליך; data/sapData.pppi.ts ('LOIPRO (Production Order)'), data/bapi-enrichment.sweep.ts ו-data/library/pp-knowledge.ts תואמים את הקריאה הרשמית. מומלץ להוסיף רשומת רישום idoc:basic:LOIPRO05 (ואולי LOIPRO01 להקשר ECC) על סמך הראיות כאן; לא נוספה ל-xrefs כי אינה קיימת עדיין ביקום. בחיפוש במוצר SAP S/4HANA Cloud Public Edition לא נמצאה רשומה הנוקבת ב-LOIPRO; רשומות המהדורה הציבורית מתארות SOAP API להפצת פקודות ייצור ל-MES, ולא נרשמה טענה לגבי המהדורה הציבורית.",
  },

  /* ------------------------------------------------- idoc:basic:MATMAS05 */
  {
    id: "idoc:basic:MATMAS05",
    evidence: [
      MATMAS05_API_PAGE,
      {
        sourceType: "sap_help",
        sourceTitle: "Set Up Data Replication | Master Data Governance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: MDG_REPLICATION_URL,
        accessedAt: DATE2,
        claim:
          "מדריך ה-MDG לגרסת 2025 FPS01 (הפצת אב חומר מ-MDG Hub למערכות לקוח באמצעות ALE עם DRF) מציג את הפרמטרים היוצאים לבדיקה ולשינוי: סוג הודעה MATMAS, פורט מקבל A000000021, גודל חבילה 100, סוג בסיסי MATMAS05 (לצד CLFMAS02, DOLMAS01 ו-ECMREV01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Generate Partner Profile in PEO for Distribution Model (ERP to PEO) | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/6e3a83da1cf54bc39e454f0929e230e8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "מדריך PEO לגרסת 2025 FPS01 קובע שלהפעלת PEO לצד מערכת ERP נדרשות גרסאות IDoc מינימליות: חומר MATMAS05, מרכז עבודה LOIWCS03, הזמנת ייצור LOIPRO05, אצוות BATMAS01; לאיתור גרסת ה-IDoc העדכנית במערכת מפעילים את WE30 עם כוכבית במקום סיומת הגרסה בת שתי הספרות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Information: Material Master (MATMAS05) | Segmentation (LO-SGT)",
        product: "SAP ERP",
        edition: "ecc",
        release: "ECC 6.0 EHP8",
        url: "https://help.sap.com/docs/SAP_ERP/349992fb60854a62a264d716ad5c8f54/3e43625476120d4ee10000000a423f68.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE2,
        claim:
          "בתיעוד SAP ERP 6.0 EHP8 (רכיב Segmentation, LO-SGT) העמוד נושא את הכותרת 'Technical Information: Material Master (MATMAS05)' ומתאר את סגמנטי ה-IDoc הסטנדרטיים המורחבים של MATMAS05; כלומר MATMAS05 הוא הסוג הבסיסי המתועד ב-ECC לפני המעבר.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "הסוג הבסיסי MATMAS05 של הודעת אב החומר MATMAS קיים ומתועד ב-SAP S/4HANA 2025 FPS01: תיעוד APIs for Product Master נוקב בו כשם הטכני של ה-IDoc‏ MATMAS, מדריך ה-MDG באותה גרסה מציג אותו בעמודת הסוג הבסיסי של הפרמטרים היוצאים להודעת MATMAS, ומדריך ה-PEO נוקב בו כגרסת ה-IDoc המינימלית הנדרשת לחומר. אותו סוג בסיסי מתועד גם ב-SAP ERP 6.0 EHP8. לא נמצא מקור רשמי המכריז על החלפה, הגבלה או הוצאה משימוש של MATMAS05.",
      edition: "on-premise",
      release: "2025.001",
      source: MATMAS05_API_PAGE,
      recommendedAction:
        "המשך שימוש בממשקי ALE קיימים המבוססים על MATMAS05 במעבר ל-S/4HANA On-Premise. בפרויקט המעבר יש לבדוק בכל מערכת את גרסת ה-IDoc הזמינה (WE30 עם כוכבית, לפי התיעוד הרשמי) ולהתאים את פרופיל השותף (WE20) לגרסה הנדרשת בתרחיש: PEO דורש לכל הפחות MATMAS05, בעוד שתיעוד ה-DRF ל-MES ו-SAP ME נוקב ב-MATMAS06. תיעוד ה-DRF ל-MES קובע שגרסאות IDoc תואמות לאחור ומומלץ להשתמש בגרסה העדכנית הזמינה. לאינטגרציות חדשות של אב מוצר, עמוד APIs for Product Master מונה גם שירותי OData ו-SOAP לצד ה-IDoc; הבחירה ביניהם היא החלטת פרויקט.",
    },
    xrefs: [
      "idoc:msg:MATMAS", "table:MARA", "table:MAKT", "table:MARC", "table:MARM", "table:MBEW", "table:MLGN",
      "table:MVKE", "tx:WE30", "tx:WE20",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "רשומת הרישום (registry) של הסוג הבסיסי נשארת כפי שהיא, עם החבר idoc:msg:MATMAS. הסטטוס 'ללא שינוי' נסמך על ארבע רשומות חיפוש רשמיות (שלוש ב-2025.001, אחת ב-SAP ERP 6.18.latest) שכולן נוקבות ב-MATMAS05 בשמו המלא; אף סניפט רשמי אינו מכריז על החלפה או יורש, ולכן אין successor. הקשר חשוב: S/4HANA 2025 FPS01 מתעד גם סוג בסיסי מורחב MATMAS06. אותו loio‏ (3e43625476120d4ee10000000a423f68) נושא ב-SAP ERP את הכותרת 'Technical Information: Material Master (MATMAS05)' וב-S/4HANA 2025 FPS01 (Logistics, General) את הכותרת 'Technical Information: Material Master (MATMAS06)'; עמוד ה-PP‏ 'Setting Up DRF Integration for MES Processes' (loio 667aa2e1) נוקב ב-MATMAS06 לאובייקט הסינון של חומר וקובע 'All IDoc versions are downwards compatible, but it is recommended that you use the latest available IDoc version'; עמוד PEO‏ 'Integration with SAP ME (Make-to-Stock)' (loio 861d4d8c) קובע שאב החומר משוכפל ל-SAP ME דרך MATMAS06. אף אחד מהם אינו מכריז ש-MATMAS06 מחליף את MATMAS05, ולכן היחס ביניהם נרשם כהקשר בלבד. אי-אחידות תיעודית שנרשמה ולא נחשבת סתירה: עמוד 'IDoc Types for Distributing Material Master Data by ALE' (loio afb1c053, קיים גם ב-2025.001) עדיין מונה את MATMAS03 כ'Pure material master data', ועמוד ה-MDG‏ 'Set Up Data Transfer Using DIF' ב-2025.001 (loio 3fa4cb52) מנוסח 'enter the appropriate MATMAS and CLFMAS values' בעוד שהמקבילה ב-SAP ERP 6.0 EHP8 ('Set Up Data Transfer', אותו loio) מנוסחת 'enter MATMAS05 for MATMAS'. לא אומת (גוף העמודים אינו נגיש לכלי): רשימת הסגמנטים המלאה של MATMAS05 מעבר לשמונה הסגמנטים שבסניפט, שדות החובה, אופן הטיפול באורך MATNR בן 40 תווים בתוך הסגמנטים, וכל מספר SAP Note; לא נרשמו מספרי Note כי לא הופיעו באף סניפט רשמי. מקור המאגר לרשומת הרישום: הבלופרינט של PP-PI‏ ('MATMAS (MATMAS05)'), data/function-intel.ts#MATMAS ו-data/bapi-enrichment.sweep.ts#MATMAS. בדיקות ה-HTTP החיות של ארבעת ה-URL המצוטטים ושל שלושת עמודי ההקשר (MATMAS06 ב-LO, Contract Billing, DRF ל-MES) בוצעו ב-2026-09-05 (כולם 200); תאריך הגישה שנחתם הוא תאריך האצווה 2026-09-02.",
  },

  /* ------------------------------------------------- idoc:basic:LOIPRO01 */
  {
    id: "idoc:basic:LOIPRO01",
    status: {
      status: "changed",
      he:
        "בתיעוד SAP S/4HANA On-Premise 2025 FPS01 הפצת פקודות ייצור ל-MES דרך DRF משתמשת בסוג הבסיסי LOIPRO05 (Filter object 97_1), התיעוד קובע שכל גרסאות ה-IDoc תואמות לאחור וממליץ על הגרסה העדכנית, וההפצה דרך POIT אינה אפשרית עוד לפקודות שעומדות בקריטריוני הסינון של DRF. LOIPRO01 עצמו מתועד בשם מלא רק בתיעוד SAP ERP (LO-SCI, ממשק POI) ואינו נזכר בעמודי S/4HANA 2025 FPS01 שנמצאו בשירות החיפוש הרשמי.",
      edition: "on-premise",
      release: "2025.001",
      source: LOIPRO01_ORDER_INTEGRATION_2025,
      recommendedAction:
        "לפני ההמרה בדקו ב-WE30 עם LOIPRO* אילו גרסאות של הסוג הבסיסי קיימות במערכת היעד; ממשקי MES (Zetes/Daymax) שנשענים על LOIPRO01 או על הפצה דרך POIT יש להעביר לתצורת DRF עם הגרסה העדכנית (LOIPRO05 לפי תיעוד 2025 FPS01), ולאמת שהמערכת המקבלת מעבדת את הסגמנטים והשדות של הגרסה החדשה.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "LOIPRO01 | Supply Chain Planning Interfaces (LO-SCI)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: ERP_LOSCI_LOIPRO01_URL,
        accessedAt: DATE2,
        claim:
          "העמוד הרשמי שכותרתו 'LOIPRO01' (Supply Chain Planning Interfaces, LO-SCI, SAP ERP 6.0 EHP8) מתעד את הסוג הבסיסי LOIPRO01 ופותח בסגמנט E1AFKOL עם השדות, כלשון קטע התצוגה של שירות החיפוש: 'AUFNR Order number char 12', 'APRIO Order priority char 4', 'APROZ Scrap quantity in percent dec 7', AUART, וכן שדות התאריכים GSTRP, GSTRS, IEAVD, ISDD. רשימת הסגמנטים המלאה ושאר השדות אינם נראים בקטע התצוגה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Transaction Data | Supply Chain Planning Interfaces (LO-SCI)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: ERP_LOSCI_TRANSACTION_DATA_URL,
        accessedAt: DATE2,
        claim:
          "עמוד 'Transaction Data' (LO-SCI, SAP ERP 6.0 EHP8) מציג בטבלת 'IDocs for Transaction Data Download' את המיפוי 'Production orders/ process orders LOIPRO01 LOIPRO': LOIPRO01 הוא ה-Master IDoc Type של סוג ההודעה המוגדר מראש LOIPRO, לצד 'Planned orders LOIPLO01 LOIPLO'. המיפוי מכסה גם פקודות תהליך (תעשיות תהליכיות).",
        verificationLevel: "sap_official_verified",
      },
      LOIPRO01_ORDER_INTEGRATION_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Setting Up DRF Integration for MES Processes | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: PP_MES_DRF_SETUP_URL,
        accessedAt: DATE2,
        claim:
          "עמוד 'Setting Up DRF Integration for MES Processes' (S/4HANA 2025 FPS01) מונה כ-Filter object סטנדרטי לאינטגרציית MES את 'Production order 97_1 97_1 LOIPRO05' (לצד 'Material 194_1 194_2 MATMAS06'), מנחה לאתר את גרסת ה-IDoc העדכנית ב-WE30 עם 'LOIPRO*' ('enter the IDoc name with an asterisk (*) instead of the two digit version suffix'), וקובע: 'All IDoc versions are downwards compatible, but it is recommended that you use the latest available IDoc version'. באותו עמוד: 'A prerequisite is that the receiving system is able to process the relevant basis type'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: PP_MES_ORDER_URL,
        accessedAt: DATE2,
        claim:
          "עמוד 'Production Order' (Production Planning and Control, S/4HANA 2025 FPS01) מסייג את ביטול POIT: 'Distribution by means of the transaction Select Transaction Data for Transfer (POIT) is no longer possible for production orders that match the filter criteria specified in the DRF', ומציין BAdI להתאמת ה-IDoc LOIPRO05 תחת 'Enhance IDocs for Integration with an MES'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: ["idoc:msg:LOIPRO", "table:AUFK", "tx:WE30", "tx:WE20"],
    lastVerifiedAt: DATE2,
    notes:
      "LOIPRO01 מתועד בשם מלא רק בתיעוד SAP ERP (LO-SCI, ממשק POI). בעמודי S/4HANA On-Premise 2025 FPS01 שהחזיר שירות החיפוש הרשמי לא נמצא עמוד שמזכיר את LOIPRO01 עצמו (ממצא שלילי בגבולות החיפוש): אותם deliverables מזכירים LOIPRO03 (Integration of ME Routings) ו-LOIPRO05 (PP-MES, PEO), וגרסת ECC 6.0 EHP8 של עמוד ה-DRF מונה LOIPRO02 כ-Filter object. מדריך האינטגרציה של SAP Digital Manufacturing ב-help.sap.com (עמוד 'Transferring a Production Order') קובע כי POIT תומך רק בסוג הבסיסי LOIPRO01 ('The POIT transaction only supports IDoc base type LOIPRO01. Additional fields and segments of higher IDoc versions are not supported'); עמוד 'Minimum Version Requirements and Supported Scenarios' באותו מדריך מפנה ל-SAP Note 3050090 לרשימת סוגי ההודעה והגרסאות הנתמכים. עמודים אלה אינם מצוטטים כראיה ברשומה זו מפני שהם תיעוד מוצר ענן ולא תיעוד S/4HANA. גוף העמודים אינו נגיש (מעטפת JavaScript), ולכן רשימת הסגמנטים המלאה של LOIPRO01 והשדות שמעבר לקטע התצוגה אינם מאומתים. סתירה במאגר: data/function-intel.ts ו-data/centers/integration.ts מתארים את LOIPRO כהעברת מתכון/מסלול (E1PLKOL, PLKO/PLPO), בעוד התיעוד הרשמי (LO-SCI) מגדיר LOIPRO כהודעת פקודות ייצור/תהליך (סגמנט E1AFKOL, שדה AUFNR) ואת המסלולים תחת LOIROU; שורות ה-blueprint (AUFK, T134) ו-data/bapi-enrichment.sweep.ts תואמות לתיעוד הרשמי. תעשיות תהליכיות: המיפוי הרשמי מכסה גם פקודות תהליך ('Production orders/ process orders').",
  },
];
