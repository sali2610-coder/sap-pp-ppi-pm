/* Project NEO · verification overlay — tables (`table:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-01): 13 records carrying Tier-1 evidence from
   help.sap.com search records (scripts/sap-help-search.mjs; loio + versionId
   re-verified live) alongside Tier-2 repository evidence. Every claim is
   bounded by the snippet or the named repository record; refuted drafts and
   open conflicts live in audit/s4-enrichment/research-queue-tables.md.
   Batch 2 (2026-09-07): 15 more records (MARA rewrite + CRHD, CRTX, STKO, STPO,
   MAST, AFKO, AFPO, JEST, JSTO, PLKO, PLPO, BUT000, EQUI, IFLOT), each merged
   from its adversarial verdict (fixedRecord or listed downgrades); AFVC refuted
   and queued. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";
const DATE3 = "2026-09-07";

/* ------------------------------------------------------------- shared docs */

const MSEG_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "'There is a new single table MATDOC instead of the existing tables MKPF and MSEG'; מסמך חומר מורכב מרשומות " +
    "MATDOC ומכיל 'a maximum 500 items' (כלשון העמוד).",
  verificationLevel: "sap_official_verified",
};

const MARC_LIFECYCLE: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Purging and Precompacting of Material Document Data: Lifecycle Management | Supply Chain",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/7a29ed568b0c41828a4e2c8da9ae1082.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "העמוד קובע שנתוני רשומת האב והמלאי נקראים דרך CDS proxy views המוקצים לטבלאות: " +
    "'CDS proxy views assigned to the former material master and stock tables like MARC, MARCH, MARD, MARDH'.",
  verificationLevel: "sap_official_verified",
};

const MARD_AGGREGATION: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Purging and Precompacting of Material Document Data: Lifecycle Management | Supply Chain",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/7a29ed568b0c41828a4e2c8da9ae1082.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "אגרגציית מלאי בזמן ריצה דרך CDS Views המוקצים ל-MARC ול-MARD: 'The data in MATDOC_EXTRACT is used for a rapid " +
    "on-the-fly aggregation of actual and historical period end stock via CDS views, which are assigned to the data " +
    "tables like MARC and MARD'.",
  verificationLevel: "sap_official_verified",
};

const MBEW_PRICE_CONTROL: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Maintain Price Control and Material Price Determination | Logistics — General (LO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/481dfb55cdbc7b43e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "העמוד מציג את טבלת MBEW‏ (Material Valuation) עם שדות הבקרה של ה-Material Ledger‏: MLAST‏ " +
    "(Material Price Determination: Control) ו-MLMAA‏ (Material Ledger Activated at Material Level).",
  verificationLevel: "sap_official_verified",
};

const MLGN_EWM_MIGRATION: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Warehouse Product Migration | Extended Warehouse Management (EWM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/d158a5ef3b6a427eab5e7cc9bad16b96.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "תיעוד EWM לגרסת 2025 FPS01 קובע: 'The data sources in SAP S/4HANA are the following tables: MLGN - Material " +
    "Data for Each Warehouse Number', וממפה שדות LE-WM אל שדות ה-Warehouse Product‏: MLGN-MATNR‏, MLGN-LGNUM‏, MLGN-LGBKZ.",
  verificationLevel: "sap_official_verified",
};

const MLGT_EWM_MIGRATION: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Warehouse Product Migration | Extended Warehouse Management (EWM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/d158a5ef3b6a427eab5e7cc9bad16b96.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "'MLGT - Material Data for Each Storage Type' נמנית בין טבלאות המקור ב-SAP S/4HANA להעברת Warehouse Product " +
    "ל-EWM, לצד MLGN‏, MARA ו-MARC.",
  verificationLevel: "sap_official_verified",
};

const MDMA_PRODUCT_CHECKS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Types of Checks Performed | Product Master",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/1bc030a8228d405fbea7016562fa85f1.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "MDMA‏ (MRP Area for Material) נמנית בין טבלאות נתוני אב המוצר שנבדקות במסגרת בדיקות ה-Product Master " +
    "ב-S/4HANA, לצד MEAN‏, MKAL ו-MVKE.",
  verificationLevel: "sap_official_verified",
};

const MKAL_PEO: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Constraints in PEO-ERP Integration | Production Engineering and Operations for Complex Assembly",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/aa0c4f53e6df4a2c9cf87891bb39a909.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "התיעוד הרשמי קובע, תחת 'Full SAP S/4HANA Solution': ב-SAP S/4HANA‏ 'the production version is the only source " +
    "of supply for manufactured materials'.",
  verificationLevel: "sap_official_verified",
};

const CRCO_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving Work Centers and Capacities (PP-BD-WKC) | Data Archiving in Production Planning and Control (PP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/1770bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "טבלת CRCO מוגדרת במסמך הארכוב הרשמי לגרסת 2025 כ-'Assignment of work center to cost center (CRCO)', " +
    "לצד CRTX ו-CRCA.",
  verificationLevel: "sap_official_verified",
};

const CSLA_INFO_SHEETS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Information Sheets for the Transfer of Activity Types | Controlling (CO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/5942de531ed3424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "העברת סוגי פעילות משתמשת ב-Application Object‏ Activity type עם אובייקט עסקי (BOR)‏ BUS1031; העמוד מונה תחת " +
    "Tables/Databases את הטבלאות הרלוונטיות CSLA ו-CSLT — תיעוד Controlling (CO) בגרסת 2025.001 עדיין מונה את CSLA " +
    "כטבלת סוגי הפעילות.",
  verificationLevel: "sap_official_verified",
};

const T438M_VDM: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "MRP Group Control Parameter | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/0e963ce458c046138376f3fd29a09503.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE,
  claim:
    "טבלת T438M מחזיקה את הפרמטרים תלויי קבוצת ה-MRP לתכנון צרכים, ותצוגת ה-VDM בוחרת ממנה: 'This CDS view selects " +
    "the MRP group-dependent parameters relevant for material requirements planning (table T438M)' — הטבלה קיימת " +
    "ונקראת על ידי תצוגת CDS מסופקת ב-S/4HANA On-Premise.",
  verificationLevel: "sap_official_verified",
};

const AUFK_PM_TABLES: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Destroying Historical PM Orders with PM_WOC_MH | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/9703695887671f60e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "תיעוד Maintenance Management לגרסת 2025 מונה 'AUFK Order master data' בין טבלאות הזמנות האחזקה — הטבלה קיימת " +
    "בשם זה בגרסה הנוכחית.",
  verificationLevel: "sap_official_verified",
};

const RESB_OIG_TABLES: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "OIG_SHPMNT: Shipments | Oil & Gas",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f4ab800d01c4366b0c9aaff06a64320/4683cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "רשימת הטבלאות הרשמית מונה 'RESB Reservation/dependent requirements' (לצד 'RKPF Document Header: Reservation') — " +
    "הטבלה קיימת בתיאור זה ב-S/4HANA 2025 FPS01.",
  verificationLevel: "sap_official_verified",
};

/* ------------------------------------------ batch 2 (2026-09-07) anchors */

const MARA_EXT_MATNR: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Extended Material Number in SAP Fiori Apps | SAP Fiori Overview",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/8aecfa1ef4914cd1bb9b9da3c9b16dbf.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "העמוד לגרסת 2025 FPS01 קובע: 'In SAP S/4HANA you can use the extended material number with a maximum " +
    "length of 40 characters' ו-'The standard material number allows a maximum length of 18 characters'; מספר " +
    "החומר הארוך מופעל במערכת ה-Backend‏ ('the long material number can be activated in the back-end system " +
    "to allow a maximum length of 40 characters'). הסניפט נוקב בשדה MATNR בשמו: 'The standard setting is that " +
    "the checkbox is not selected: The system uses the short version of the material number field, for " +
    "example MATNR', ובהמשך: 'As a default, the standard material number which allows a maximum length of 18 " +
    "characters is activated. You can activate the extended material number (MATNR_EXTERNAL) in the back-end " +
    "system'. הסניפט אינו קובע את אורך ה-DDIC של MATNR. נתיב ה-IMG‏: Logistics General > Material Master > " +
    "Basic Settings > Define Output Format of Material Number.",
  verificationLevel: "sap_official_verified",
};

const CRHD_WKC_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving Work Centers and Capacities (PP-BD-WKC) | Data Archiving in Production Planning and Control " +
    "(PP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/1770bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "מסמך הארכוב של PP-BD-WKC לגרסת 2025 FPS01 מגדיר את אובייקט הארכוב PP_WKC לארכוב מרכזי עבודה וקיבולות " +
    "ברכיב PP, ומונה בין הנתונים שהוא כולל: 'Work center header data (CRHD)', 'Short descriptions of the work " +
    "center (CRTX)' ו-'Assignment of work center to cost center (CRCO)' (כלשון הסניפט).",
  verificationLevel: "sap_official_verified",
};

const CRTX_WKC_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving Work Centers and Capacities (PP-BD-WKC) | Data Archiving in Production Planning and Control " +
    "(PP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/1770bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "מסמך הארכוב הרשמי של אובייקט הארכוב PP_WKC לגרסת 2025 FPS01 מונה את טבלת CRTX בשמה בין טבלאות מרכז " +
    "העבודה המאורכבות: 'Short descriptions of the work center (CRTX)', לצד 'Assignment of work center to cost " +
    "center (CRCO)', 'Assignment of capacity to work center (CRCA)' ו-'Capacity header (KAKO)'. הטבלה קיימת " +
    "בשם זה ובתפקיד זה ב-S/4HANA On-Premise 2025 FPS01.",
  verificationLevel: "sap_official_verified",
};

const STKO_BOM_CHANGE_DOCS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Displaying Change Documents | Bill of Material (LO-MD-BOM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/6608c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Bill of Material (LO-MD-BOM) לגרסת 2025 FPS01 קובע במפורש: 'BOM header data is stored in table " +
    "STKO and BOM item data is stored in table STPO'. מסמכי שינוי נוצרים לקטגוריות Material BOM‏, Document " +
    "structure‏, Equipment BOM‏, Functional location BOM‏, Standard BOM ו-Order BOM, ובשינוי BOM ללא מספר " +
    "שינוי, לפי העמוד, אובייקטי השינוי (כותרת או פריט) משתנים ישירות והמערכת אינה משכפלת רשומות כותרת או " +
    "פריט.",
  verificationLevel: "sap_official_verified",
};

const STPO_BOM_CHANGE_DOCS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Displaying Change Documents | Bill of Material (LO-MD-BOM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/6608c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Bill of Material (LO-MD-BOM) לגרסת 2025 FPS01 קובע: 'BOM header data is stored in table STKO and " +
    "BOM item data is stored in table STPO'. אותו עמוד מציין בנפרד שמסמכי שינוי (change documents) נוצרים " +
    "עבור קטגוריות ה-BOM‏ Material BOM‏, Document structure‏, Equipment BOM‏, Functional location BOM‏, " +
    "Standard BOM ו-Order BOM (סניפט מלא בריצה חוזרת של אותו loio ב-2026-09-07).",
  verificationLevel: "sap_official_verified",
};

const MAST_BOM_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving PP-BOMs (PP-BD-BOM) | Data Archiving in Production Planning and Control (PP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/0570bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "עמוד הארכוב של עצי מוצר PP לגרסת 2025 FPS01 (אובייקט ארכוב CS_BOM) מונה את MAST בשמה ובתיאורה המדויק: " +
    "'MAST Material BOM assignment', לצד DOST‏ (Document BOM assignment), EQST‏ (Equipment BOM assignment), " +
    "TPST‏ (Functional location BOM assignment), KDST‏ (Sales order, הסניפט נקטע), STZU‏, STST‏, PRST‏, STAS‏ " +
    "(BOMs, choice of items), STKO‏ (BOM header) ו-STPU‏ (BOM subitem); שורת פריטי ה-BOM מופיעה בסניפט בכתיב " +
    "'STOP BOM items' (שם הטבלה STPO נלקח מרשומות המאגר, לא מהסניפט).",
  verificationLevel: "sap_official_verified",
};

const AFKO_PRODORDER_VDM: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Order Header | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c6c3a06854a44d9383b32946f008b1b8.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "עמוד ה-VDM הרשמי לגרסת 2025 FPS01 קובע: 'This CDS view retrieves production order header data (tables " +
    "AUFK and AFKO)'. תצוגת I_ProductionOrder קוראת את נתוני כותרת הזמנת הייצור ישירות מ-AFKO, כלומר הטבלה " +
    "קיימת ומשמשת מקור נתונים בגרסה הנוכחית.",
  verificationLevel: "sap_official_verified",
};

const AFPO_PM_ORDER_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving Maintenance and Service Orders (PM-SMA-SC/PM-WOC-MO) | Data Archiving in Plant Maintenance and " +
    "Customer Service (PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/15e1b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "מסמך הארכוב הרשמי של הזמנות אחזקה ושירות לגרסת 2025 FPS01 מונה את AFPO בשם 'Order item' בין טבלאות " +
    "ההזמנה וקובע: 'Table AFPO is only available for refurbishment orders and is therefore only archived for " +
    "these orders'. בתחזוקת מפעל (PM) רשומת AFPO קיימת רק להזמנות שיפוץ (refurbishment).",
  verificationLevel: "sap_official_verified",
};

const JEST_CU_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving Compatible Units | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b82f91f1afab4dc0ae7219fbeaccc113.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "מדריך Maintenance Management לגרסת 2025 FPS01 מונה את JEST ברשימת הטבלאות של אובייקט הארכוב /CUM/CU " +
    "(Compatible Units): 'JEST Individual Object Status Yes JSTO Status Object Information Yes', לצד ONR00 " +
    "(General Object Number).",
  verificationLevel: "sap_official_verified",
};

const JSTO_CU_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving Compatible Units | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b82f91f1afab4dc0ae7219fbeaccc113.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "בתיעוד Maintenance Management לגרסת 2025 FPS01, טבלת JSTO מופיעה בשם 'Status Object Information' ברשימת " +
    "הטבלאות שמהן נארכבים נתונים של Compatible Units, עם הערך Yes לצד שמה (כותרת העמודה אינה נראית בסניפט " +
    "החיפוש), לצד 'JEST Individual Object Status', KSSK (Classifications) ו-ONR00 (General Object Number).",
  verificationLevel: "sap_official_verified",
};

const PLKO_PM_PLAN_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving Task Lists (CS-AG/PM-PRM-TL) | Data Archiving in Plant Maintenance and Customer Service " +
    "(PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/617cbe532789b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "מסמך הארכוב של תחזוקת מפעל לגרסת 2025 FPS01 מונה את PLKO בשמה 'Task list header' בין הטבלאות הרלוונטיות " +
    "לאובייקט הארכוב PM_PLAN‏ ('with which you can archive maintenance task lists'), לצד PLKZ ו-MAPL‏ " +
    "(Material-task list assignments); רשימת פעולות אחזקה מזוהה ייחודית לפי קבוצת רשימה ומונה קבוצה.",
  verificationLevel: "sap_official_verified",
};

const PLPO_PM_PLAN_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving Task Lists (CS-AG/PM-PRM-TL) | Data Archiving in Plant Maintenance and Customer Service " +
    "(PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/617cbe532789b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "עמוד הארכוב של רשימות פעולות אחזקה (אובייקט ארכוב PM_PLAN) בגרסת 2025 FPS01 מונה את PLPO ברשימת הטבלאות " +
    "הרלוונטיות לארכוב בתיאור 'PLPO Operations', לצד 'PLKO Task list header', 'PLAS Assignments of operations " +
    "to sequences', 'PLMZ Material component assignments', 'PLWP Maintenance package assignments' ו-'PLFH " +
    "Production resources/tool assignments'.",
  verificationLevel: "sap_official_verified",
};

const BUT000_BP_APPROACH: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Business Partner Approach (Customer/Supplier Integration) | SAP Business Partner",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/74b0b157c81944ffaac6ebc07245b9dc/25b46c8241fd4852bf7876d87bed8fd0.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "העמוד הרשמי (2025 FPS01) מציג את גישת השותף העסקי כנושא 'primarily relevant to customers who are " +
    "migrating from SAP ERP to SAP S/4HANA' וקובע: 'Only customers with Customer/Supplier Integration in " +
    "place can move to SAP S/4HANA'; 'To ensure a successful conversion, all customers and suppliers must be " +
    "converted to BP (Business Partners) in the system. This is also true for the business partners that are " +
    "already in use'; וגם אנשי הקשר של לקוח או ספק חייבים להיות מומרים לשותף עסקי. העמוד מפנה ל-2265093 למידע " +
    "נוסף (כלשון הסניפט).",
  verificationLevel: "sap_official_verified",
};

const EQUI_PM_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving of Equipment (CS-BD/PM-EQM-EQ) | Data Archiving in Plant Maintenance and Customer Service " +
    "(PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/7b06bd53d34ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "מסמך הארכוב הרשמי לגרסת 2025 FPS01 מגדיר את PM_EQUI כ-'Archiving object with which you can archive " +
    "equipment in the Plant Maintenance component', וקובע: 'The archiving object for equipment PM_EQUI " +
    "consists of the following tables: Table Short Text EQUI Equipment master data EQKT Multilingual " +
    "equipment short texts, long texts, and internal remarks EQUZ Equipment time segments ILOA Location and " +
    "account assignment data for the maintenance object IHSG Table of permits for Plant Maintenance with long " +
    "texts IHPA Partner FLEET' (הסניפט נקטע אחרי FLEET). כלומר EQUI היא טבלת נתוני האב של הציוד (Equipment " +
    "master data) בתיעוד SAP S/4HANA On-Premise 2025 FPS01, לצד EQKT, EQUZ ו-ILOA.",
  verificationLevel: "sap_official_verified",
};

const IFLOT_PM_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Archiving of Functional Locations (CS-BD/PM-EQM-FL) | Data Archiving in Plant Maintenance and Customer " +
    "Service (PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/7e06bd53d34ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד הארכוב הרשמי לגרסת 2025 FPS01 קובע שאובייקט הארכוב PM_IFLOT למיקומים פונקציונליים מורכב מהטבלאות: " +
    "'IFLOT Functional location master data', 'IFLOS Functional location labeling', 'IFLOTX Multilingual " +
    "short texts and long texts for the functional location', 'ILOA Location and account assignment data for " +
    "the maintenance object', 'IHPA Partner', 'IHSG Table of permits for Plant Maintenance'. הטבלה IFLOT " +
    "קיימת בשם ובתיאור אלה ב-S/4HANA On-Premise 2025 FPS01.",
  verificationLevel: "sap_official_verified",
};

/* ---------------------------------------------------------------- records */

export const TABLE_VERIFICATION: VerificationRecord[] = [
  /* ---------------------------------------------------------- table:MSEG */
  {
    id: "table:MSEG",
    evidence: [
      MSEG_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "'Compatibility with the data in the tables of the SAP S/4HANA 6.0 product is guaranteed by Core Data " +
          "Service (CDS) compatibility views' [כך בלשון הסניפט שהוחזר משירות החיפוש].",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Purging and Precompacting of Material Document Data: Lifecycle Management | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/7a29ed568b0c41828a4e2c8da9ae1082.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "'The data in table MATDOC with RecordTypes MDOC and MDOC_CP represents material documents and is used " +
          "first to display material document postings, for example, via SAP Fiori app Material Document Overview'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MSEG (matdocNote)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MKPF ו-MSEG אוחדו לטבלת MATDOC היחידה; MSEG נשארת כ-CDS Compatibility View לקריאה, וקוד Z שכותב או קורא " +
          "ישירות מהטבלה דורש התאמה.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) — רשומת MSEG",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "נתוני MSEG מאוחסנים ב-MATDOC ו-MSEG הופכת לתצוגת התאימות NSDM_V_MSEG; ‏SELECT ישיר ממשיך לעבוד דרך " +
          "התצוגה, עם השלכות ביצועים ומבני Append.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MSEG",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט שנגזר מחוברות ההגירה — רשומת MSEG ושורת הפישוט MM-IM",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        sapNote: "2206980",
        claim:
          "הדאטהסט מסמן את MSEG כמוחלפת (s4AltTable ‏'MATDOC (MSEG=View תאימות)'), קובע ש-SUM מבצע את המרת MATDOC ‏" +
          "(Silent Data Migration), ומונה את פריט הפישוט 'Material Inventory Management - new data model (MATDOC)' עם " +
          "SAP Note 2206980, קטגוריה 'הוחלף (Replaced)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#MSEG (+שורת פישוט MM-IM/MATDOC)",
      },
    ],
    status: {
      status: "replaced",
      he:
        "פריטי מסמך חומר (תנועות מלאי). ב-S/4HANA טבלת MATDOC היחידה מחליפה את MKPF ו-MSEG, והתאימות לנתונים נשמרת " +
        "באמצעות CDS Compatibility Views.",
      edition: "on-premise",
      release: "2025.001",
      source: MSEG_ARCHIVING,
      successor: "obj:material-document",
      recommendedAction:
        "לצטט את המקור הרשמי: עמוד Archiving Material Documents (MM-IM) ב-SAP Help ‏(2025 FPS01) קובע שטבלת MATDOC " +
        "היחידה מחליפה את MKPF ו-MSEG ושהתאימות נשמרת ב-CDS Compatibility Views. לפי רובד המאגר " +
        "(data/table-enrichment.ts, data/s4-impact.ts): קוד Z שקורא מ-MSEG ממשיך לעבוד דרך ה-View; קוד שכותב ישירות " +
        "דורש התאמה ל-MATDOC.",
    },
    xrefs: ["table:MKPF", "obj:material-document", "tx:MIGO", "tx:MB51", "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem"],
    lastVerifiedAt: DATE,
    notes:
      "הסטטוס 'הוחלף' מעוגן בסניפט רשמי הנוקב ביורש. שם תצוגת התאימות NSDM_V_MSEG ומספר SAP Note 2206980 נשארים " +
      "ברובד המאגר בלבד (me.sap.com דורש התחברות S-user). הביטוי 'SAP S/4HANA 6.0' בציטוט הוא כפי שהוחזר משירות " +
      "החיפוש; הקריאה שכוונתו ל-ERP 6.0/ECC היא פרשנות שטרם אומתה מול גוף העמוד בדפדפן. היורש נרשם כ-" +
      "obj:material-document (קבוצת מסמך החומר הקנונית של המאגר), כי table:MATDOC אינו מזהה בר-פענוח בדאטהסט; " +
      "מאותה סיבה NSDM_V_MSEG אינה ב-xrefs.",
  },

  /* ---------------------------------------------------------- table:MARC */
  {
    id: "table:MARC",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Types of Checks Performed | Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/1bc030a8228d405fbea7016562fa85f1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד ה-Product Master של 2025 FPS01 מונה את MARC‏ (Plant Data for Material) בין הטבלאות ששדותיהן ניתנים " +
          "להגדרה לבדיקת כפילויות, לצד MARA ו-MARD.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Warehouse Product Migration | Extended Warehouse Management (EWM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/d158a5ef3b6a427eab5e7cc9bad16b96.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "העמוד קובע: 'The data sources in SAP S/4HANA are the following tables' ובהן MARC — כלומר MARC מתועדת " +
          "כטבלת מקור ב-S/4HANA להעברת Warehouse Product.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Table and Field Extensibility | Master Data Governance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6d52de87aa0d4fb6a90924720a5b0549/dacf081f31af4c93ab97da957c71feee.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד ה-MDG לגרסת 2025 FPS01 מונה את MARC‏ (Plant Data) בין טבלאות המוצר של מודל הנתונים, הניתנות להרחבה " +
          "בטבלאות ובשדות (Table and Field Extensibility).",
        verificationLevel: "sap_official_verified",
      },
      MARC_LIFECYCLE,
      {
        sourceType: "sap_help",
        sourceTitle: "VC - Material variant | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/f24b02e065fe48ff847cc9e1d4145e30.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אובייקט ההגירה 'VC - Material variant' (תיעוד 2025 FPS01) בוחר אוטומטית את כל וריאנטי החומר תלויי-המפעל " +
          "מטבלת MARC‏ ('All plant-specific material variants from the MARC table').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) — רשומת MATDOC (פישוט MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        sapNote: "1976487",
        claim:
          "רובד המאגר: ב-S/4HANA המלאי מחושב בזמן ריצה מ-MATDOC וערכי מלאי מצטברים אינם מוחזקים עוד בטבלאות כמו " +
          "MARD/MARC; קוד Z שקורא אגרגטים חייב לעבור ל-MATDOC או ל-CDS Views תואמים. SAP Note 1976487 מצוטט כלשונו " +
          "בקובץ המאומת.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MATDOC",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) — הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MARC נכללת בסט S4_STABLE של המאגר — טבלאות ליבה PM / PP-PI המסומנות במפורש יציבות ב-S/4 " +
          "(verified, low risk).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MARC",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרת המאגר: MARC מחזיקה נתוני אב חומר ברמת מפעל (סוג MRP‏ DISMM, מתכנן MRP‏ DISPO, רכש BESKZ, קבוצת " +
          "בדיקת זמינות MTVFP); מפתח MANDT+MATNR+WERKS; מסומנת מאומתת מול SE11 / SAP Help.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MARC",
      },
    ],
    status: {
      status: "changed",
      he:
        "טבלת MARC (נתוני חומר ברמת מפעל) נשמרת ב-S/4HANA כטבלת נתוני האב של החומר ברמת המפעל (MRP, רכש, תכנון), " +
        "ומתועדת בשימוש ב-S/4HANA 2025 FPS01 (Product Master, MDG, אובייקטי הגירה). השינוי: קריאת נתוני מלאי מתבצעת " +
        "דרך CDS proxy views המוקצים לטבלה, והמלאי עצמו מחושב ממסמכי MATDOC ולא מערכים מצטברים בטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: MARC_LIFECYCLE,
      recommendedAction:
        "אין צורך בהחלפת הטבלה: נתוני האב ברמת מפעל נשארים ב-MARC. יש לבדוק קוד Z שקורא שדות מלאי מצטברים ישירות " +
        "מ-MARC ולהעבירו ל-CDS views תואמים או ל-MATDOC, בהתאם ל-Simplification MM-IM ‏(SAP Note 1976487, ממקור המאגר).",
    },
    xrefs: ["obj:material-document", "table:MARA", "table:MARD", "table:MDMA", "cds:I_ProductPlant", "cds:I_MRPMaterial"],
    lastVerifiedAt: DATE,
    notes:
      "פסיקת הבלופרינט הייתה לא מוכרעת; הראיות הרשמיות מכריעות 'משתנה' ללא יורש (הטבלה אינה מוחלפת או מוסרת). חמש " +
      "רשומות help.sap.com לגרסת 2025 FPS01 מונות את MARC בשמה הטכני. רשימת שדות המלאי המדויקת המושפעת בתוך MARC " +
      "אינה נקובה באף סניפט רשמי שנשלף ולכן אינה נטענת (נדרש קטלוג פריטי הפישוט או מערכת חיה — שניהם לא זמינים לפי " +
      "MANIFEST). סתירה פנימית במאגר: data/s4-impact.ts מונה את MARC ב-S4_STABLE (יציבה) בעוד רשומת MATDOC באותו " +
      "קובץ קובעת שאגרגטים עזבו את MARC/MARD; עמוד מחזור החיים הרשמי תומך בקריאה 'משתנה' (הטבלה נשמרת, מנגנון " +
      "הקריאה של נתוני המלאי השתנה). פרשנות 'תצוגות תאימות' מיוחסת לרובד המאגר (data/s4-impact.ts#MATDOC). ‏SAP Note 1976487 " +
      "מצוטט רק כי הוא קיים כלשונו בנתוני המאגר. MARC אינה רשומת טבלה בחוברות ההגירה (data/sapData.ts) — עקבי עם " +
      "הפסיקה הלא מוכרעת. אזכור MM17 הוסר מהסטטוס: העמוד היחיד שמונה MM17 עם MARC הוא עמוד PP/DS בגרסת 2023.latest " +
      "שאינו ברשימת הראיות. הסתירה נרשמה גם ב-audit/s4-enrichment/research-queue-tables.md.",
  },

  /* ---------------------------------------------------------- table:MARD */
  {
    id: "table:MARD",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Types of Checks Performed | Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/1bc030a8228d405fbea7016562fa85f1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "MARD‏ (Storage Location Data for Material) נמנית בעמוד בין הטבלאות ששדותיהן ניתנים להגדרה לבדיקת התאמת " +
          "כפילויות, לצד MARA ו-MARC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Table and Field Extensibility | Master Data Governance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6d52de87aa0d4fb6a90924720a5b0549/dacf081f31af4c93ab97da957c71feee.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "MARD‏ (Storage Location) נמנית בין הטבלאות הניתנות להרחבה בשדות חדשים במודלי הנתונים של MDG‏ " +
          "(Consolidation and Mass Processing / Mass Maintenance), יחד עם MARA‏, MARC‏, MARM ו-MBEW.",
        verificationLevel: "sap_official_verified",
      },
      MARD_AGGREGATION,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "'Compatibility with the data in the tables of the SAP S/4HANA 6.0 product is guaranteed by Core Data " +
          "Service (CDS) compatibility views' (כך בלשון העמוד), וכן: 'There is a new single table MATDOC instead of " +
          "the existing tables'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CWM | What's New in SAP S/4HANA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "100",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4c6c3c99e6e94a92a626f424add61cba/28fdbe7a30b64f8e8473c9b127aeef7f.html?locale=en-US&state=PRODUCTION&version=100",
        accessedAt: DATE,
        claim:
          "העמוד מונה את SAP Note 2267788 עם הכותרת 'S4TWL - Data Model in Inventory Management (MM-IM)' " +
          "(בטקסט העמוד השם מופיע משובש קלות: 'Data Mmodel in iInventory Mmanagement').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MARD (matdocNote)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרת המאגר: MARD מחזיקה מלאי חומר לפי מפעל ומיקום אחסון (LABST‏, INSME‏, SPEME); ב-S/4HANA תנועות " +
          "בודדות נרשמות ב-MATDOC (ולא ב-MSEG/MKPF) והאגרגטים של MARD מחושבים מול MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MARD",
      },
    ],
    status: {
      status: "changed",
      he:
        "טבלת MARD קיימת ב-SAP S/4HANA כטבלת נתוני חומר ברמת מיקום אחסון, והיא חלק ממודל הנתונים של רשומת האב " +
        "(MARA‏, MARC‏, MARD) גם בגרסת 2025. במודל הנתונים הפשוט של ניהול מלאי (MM-IM) תנועות המלאי נרשמות בטבלת " +
        "MATDOC, וכמויות המלאי המצטברות נאגרות בזמן ריצה באמצעות CDS Views המוקצים ל-MARD מעל MATDOC ו-MATDOC_EXTRACT.",
      edition: "on-premise",
      release: "2025.001",
      source: MARD_AGGREGATION,
      recommendedAction:
        "להמשיך להשתמש ב-MARD לנתוני אב ברמת מיקום אחסון; קריאות SELECT קיימות ממשיכות לעבוד דרך תצוגות ה-CDS " +
        "התואמות. עבור כמויות מלאי יש להביא בחשבון שהערכים נאגרים מול MATDOC בזמן ריצה, ולבדוק קוד לקוח מול פריט " +
        "הפישוט SAP Note 2267788 (מודל הנתונים של MM-IM), כפי שהוא נקוב בעמוד רשמי.",
    },
    xrefs: ["obj:material-document", "table:MARC", "table:MARA"],
    lastVerifiedAt: DATE,
    notes:
      "פסיקת הבלופרינט לא הוכרעה במקור: MARD קיימת בבלופרינט PP-PI‏ (data/sapData.pppi.ts, רשומה PP-PI:MARD, ‏s4Note‏ " +
      "'מלאי מנוהל ב-MATDOC; MARD הופך ל-Aggregate/View.'), אך ה-s4Note אינו נפתח באסימון פסיקה ולכן מסווג 'לא הוכרע " +
      "במקור'. התיעוד הרשמי של 2025 FPS01 מכריע 'משתנה': הטבלה נשארת, והאגרגציה עוברת ל-CDS Views מעל " +
      "MATDOC/MATDOC_EXTRACT. המסקנה שהשדות המצטברים אינם נשמרים פיזית היא היסק (נסמך על 'former ... stock tables' " +
      "ועל רובד המאגר), לא ציטוט. אף מקור רשמי אינו מונה טבלה יורשת ל-MARD עצמה, ולכן 'משתנה' ולא 'הוחלף'; MATDOC " +
      "מחליפה את רישומי התנועות (MKPF/MSEG) ואת האגרגציה בלבד. SAP Note 2267788 נקוב בגוף הטענה בלבד (מצוטט מהעמוד " +
      "הרשמי): אין לו רשומה בנתוני המאגר ואין קישור me.sap.com נגיש, ולכן שדה sapNote לא הוזן.",
  },

  /* ---------------------------------------------------------- table:MBEW */
  {
    id: "table:MBEW",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "MM - Material inventory balance | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c1af02cdf5344d7ab71306ef1fed3e5d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "אובייקט ההגירה 'MM - Material inventory balance' מעביר ערכי מלאי לחומרים עם בקרת מחיר סטנדרטית או " +
          "ממוצעת-נעה מתוך 'Table MBEW - for material valuation' שבמערכת המקור.",
        verificationLevel: "sap_official_verified",
      },
      MBEW_PRICE_CONTROL,
      {
        sourceType: "sap_help",
        sourceTitle: "Split Valuation | Logistics — General (LO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/016afa5572ca692de10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "בהערכת שווי מפוצלת (Split Valuation), כאשר מסומן הדגל Generate Accounting View, הרשומות נשמרות בטבלאות " +
          "Material Valuation ‏(MBEW) ו-Segmentation Dependent Valuation Data ‏(SGT_MADKA); בלעדיו נכתבת SGT_MADKA בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Product Valuation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/77706ca5eeff454fb20c3464fd3799b7.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS ‏Product Valuation במודל הנתונים הווירטואלי מספקת נתוני הערכת שווי מוצר מטבלת MBEW ‏" +
          "(בעזרת ה-View‏ V_MBEW_MD).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving History Records for Stock Value Tables (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/7480c1536ca9b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "בגרסת 2025 טבלאות ערכי המלאי MBEW‏, EBEW ו-QBEW מחזיקות רשומות היסטוריה (MBEWH — Material Valuation: " +
          "History), המאורכבות בתוכנית RM07KOHDEL2.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deferred Summarization of Inventory Postings | Accounting and Financial Close",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8fbeed5f2046489696a50ac7fd76f9c6/20a27f027e3b4b82bc1e0f2e86e3cf6e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "הנתונים המצטברים של רישומי המלאי נשארים ב-Universal Journal ‏(ACDOCA) וניתנים לצפייה באפליקציות כגון " +
          "Material Inventory Values - Balance Summary.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MBEW (matdocNote)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רובד המאגר: ב-S/4HANA ה-Material Ledger פעיל תמידית; MBEW משולבת עם ACDOCA ועם Actual Costing; מבנה " +
          "MBEW נשמר בעוד המחירים מנוהלים דרך ה-Material Ledger.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MBEW",
      },
    ],
    status: {
      status: "changed",
      he:
        "טבלת MBEW (הערכת שווי חומר) קיימת ופעילה ב-S/4HANA: מקור לערכי מלאי במיגרציה, מקור נתונים ל-CDS View של " +
        "הערכת שווי מוצר, ונכתבת בתרחיש Split Valuation (עם Generate Accounting View). הערכים המצטברים של רישומי " +
        "המלאי מנוהלים ב-Universal Journal (טבלת ACDOCA), ורשומת האב של השיערוך נשארת ב-MBEW עם שדות בקרה של " +
        "ה-Material Ledger‏ (MLAST‏, MLMAA).",
      edition: "on-premise",
      release: "2025.001",
      source: MBEW_PRICE_CONTROL,
      recommendedAction:
        "המשך שימוש. לא נמצאה טבלה חליפית רשמית במקורות שנבדקו; לקריאת ערכי מלאי בפועל יש לעבוד מול ה-Universal " +
        "Journal ‏(ACDOCA) וה-Material Ledger, ולשמור על MBEW כרשומת אב של נתוני השיערוך (בקרת מחיר, מחלקת שיערוך).",
    },
    xrefs: ["table:ACDOCA", "table:MARA"],
    lastVerifiedAt: DATE,
    notes:
      "פסיקת הבלופרינט לא הוכרעה (s4Note‏: 'Material Ledger חובה ב-S/4HANA; הערכה ב-ACDOCA/ACDOCC.' — ללא אסימון " +
      "פסיקה). הוכרע 'משתנה' (תואם את משפחת 'מותאם' של הבלופרינט): הטבלה נשמרת, וניהול השיערוך משתנה עם Material " +
      "Ledger פעיל ושילוב ACDOCA. שישה מקורות רשמיים (חמישה ב-2025.001, עמוד ה-VDM ב-2023.latest) מראים ש-MBEW " +
      "קיימת ובשימוש. אף מקור רשמי אינו מונה טבלה יורשת או הסרה. עמוד ה-Universal Journal אינו מזכיר את MBEW — " +
      "הקישור בין השניים הוא סינתזה של הרשומה. הטבלאות MBEWH‏, EBEW ו-QBEW נקובות במקור הרשמי אך אינן ב-xrefs כי " +
      "אין להן דף בדאטהסט. טרם אומת: הצהרת פריט פישוט רשמית על הפניית שדות ערך מצטברים ב-MBEW לתצוגות תאימות " +
      "(דורש קטלוג פריטי פישוט או SAP Notes מאחורי התחברות S-user) — ולכן אינה נטענת. ראיית ההגירה צוטטה לוואריאנט " +
      "מקור-ERP‏ (loio c1af02cd, אומת חי 2026-09-02); הסתירה מול הבלופרינט נרשמה גם בקובץ התור.",
  },

  /* ---------------------------------------------------------- table:MLGN */
  {
    id: "table:MLGN",
    evidence: [
      MLGN_EWM_MIGRATION,
      {
        sourceType: "sap_help",
        sourceTitle: "MATMAS IDoc | APIs for Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18fe3fab96864826bfa0be0de4f65b85/5f1d9c221c1841e0b202c5536fc1fa87.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "ה-IDoc‏ MATMAS המתועד ב-APIs for Product Master לגרסת 2025 FPS01 כולל את הסגמנט E1MLGNM — " +
          "'Master material material data per warehouse number (MLGN)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Remove Unchanged Data | Master Data Governance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6d52de87aa0d4fb6a90924720a5b0549/f9c3a7a4aaa346a69352e5b97f08af5d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד ה-MDG לגרסת 2025 FPS01 מונה את MLGN‏ (Warehouse) בין טבלאות נתוני אב המוצר, לצד MARC‏ (Plant Data) " +
          "ו-MARD‏ (Storage Location).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Master Data | Warehouse Management System (WMS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b2dee5e83e2446149294f9860a7c08f0/d18ec95360267214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד ה-WMS לגרסת 2025 FPS01 קובע שבתצוגת ה-WM של רשומת אב החומר, כל האינדיקטורים והשדות התקפים לכל " +
          "מספר המחסן מוזנים ברמת מספר המחסן. (זיהוי MLGN כטבלת רמת מספר-המחסן מקורו בעמוד Warehouse Product " +
          "Migration — הראיה הראשונה ברשומה.)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Advanced Shipping and Receiving | Transportation Management (TM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e3dc5400c1cc41d1bc0ae0e7fd9aa5a2/65c4edc97c5c45048192fb079cfd87f0.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "הצהרה רשמית על Stock Room Management כמכיל את פונקציונליות ה-LE-WM לשעבר (הקשר הרכיב שאליו שייכת MLGN): " +
          "'Stock Room Management contains SAP S/4HANA functionality from the former Warehouse Management in " +
          "Logistics Execution (LE-WM)'. העמוד עצמו אינו מזכיר את MLGN.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MLGN",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרת המאגר: MLGN מחזיקה נתוני חומר לכל מספר מחסן (WM), מפתח ראשי MANDT/MATNR/LGNUM, שכבת WM מעל " +
          "MARC/MARD, מפתחות זרים MATNR ל-MARA‏, LGNUM ל-T300 ו-MATNR+LGNUM+LGTYP ל-MLGT; מוצגת בתצוגת " +
          "Warehouse Management 1 ב-MM03.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MLGN",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין האובייקטים של הפרויקט — MLGN",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מודיעין המאגר: תצוגת WM1‏ (MLGN) היא תנאי מוקדם לעיבוד Transfer Order לכל מספר מחסן, ושיטת העבודה " +
          "המומלצת להגירת EWM היא אימות תאימות נתוני האב מול ה-Warehouse Product של EWM.",
        verificationLevel: "repository_verified",
        repoRef: "data/knowledge/object-intel.ts#MLGN",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "נתוני חומר ברמת מספר מחסן (תצוגת WM בנתוני האב של החומר). הטבלה מתועדת בתיעוד הרשמי של 2025 FPS01 כטבלת " +
        "מקור להעברת Warehouse Product ל-EWM, ולא נמצא מקור רשמי המכריז על שינוי, החלפה או הוצאה משימוש שלה.",
      edition: "on-premise",
      release: "2025.001",
      source: MLGN_EWM_MIGRATION,
      recommendedAction:
        "הטבלה זמינה ב-S/4HANA On-Premise כחלק מנתוני האב של החומר (תצוגת WM ברמת מספר מחסן). בתיעוד הרשמי של 2025 " +
        "היא מתועדת כטבלת מקור להעברת Warehouse Product אל EWM, עם מיפוי שדות מפורש (MATNR‏, LGNUM‏, LGBKZ). " +
        "בפרויקט מעבר יש להחליט בין Stock Room Management (המשך פונקציונליות WM קלאסי) לבין EWM; במעבר ל-EWM נתוני " +
        "MLGN ממופים אל ה-Warehouse Product לפי תיעוד ההעברה הרשמי.",
    },
    xrefs: ["table:MLGT", "table:MARA", "table:MARC", "table:MARD", "tx:LT01"],
    lastVerifiedAt: DATE,
    notes:
      "פסיקת הבלופרינט שהייתה לא מוכרעת הוכרעה: תיעוד רשמי של 2025 FPS01 מונה את MLGN בשמה המלא כטבלת מקור להעברת " +
      "Warehouse Product ל-EWM, סגמנט E1MLGNM שלה מתועד ב-MATMAS, ו-MDG מונה אותה בין טבלאות המוצר. לא נמצא מקור " +
      "רשמי המכריז על החלפה, הוצאה משימוש או טבלה יורשת עבור MLGN עצמה, ולכן הסטטוס 'ללא שינוי' ברמת הטבלה ובלי " +
      "יורש; ההכרעה האסטרטגית (Stock Room Management מול EWM) היא ברמת פתרון המחסן, לא ברמת הטבלה. טענות על מועדי " +
      "סיום תמיכה של WM קלאסי או פריטי Simplification Item לא נכללו כי לא הופיעו באף סניפט רשמי נגיש (SIC ו-SAP " +
      "Notes דורשים כניסת S-user). שדות product/edition ברשומות המאגר הם הקשר הרשומה — קובצי המאגר מתארים את הטבלה " +
      "באופן כללי ואינם טוענים מהדורה בעצמם.",
  },

  /* ---------------------------------------------------------- table:MLGT */
  {
    id: "table:MLGT",
    evidence: [
      MLGT_EWM_MIGRATION,
      {
        sourceType: "sap_help",
        sourceTitle: "Warehouse Product Migration | Extended Warehouse Management (EWM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/d158a5ef3b6a427eab5e7cc9bad16b96.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "מיפוי השדות הרשמי LE-WM אל EWM בהעברה: ‏MLGT-LGTYP אל LGTYP‏ (Storage Type)‏, MLGT-NSMN אל REPQTY‏ " +
          "(Replenishment quantity)‏, ו-MLGT-LGPLA אל LGPLA (איתור קבוע).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Articles: Customer-Specific Fields in ALE | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/ffa5c7536e8e2a4be10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "בענף ה-Retail‏, MLGT מחזיקה נתוני פריט (Article) ברמת סוג אחסון ונמנית בין טבלאות נתוני האב המופצות " +
          "ב-ALE IDocs.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MLGT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרת המאגר: מפתח ראשי MANDT+MATNR+LGNUM+LGTYP; הטבלה מחזיקה איתור קבוע (LGPLA), כמויות מינימום/מקסימום " +
          "ופרמטרי חידוש מלאי ברמת סוג אחסון, ומשלימה את MLGN (נתיב תצוגה: MM03 ← WM 2).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MLGT",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PP-PI (דאטהסט מחולל) — רשומת MLGT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הבלופרינט מונה את MLGT כ'נתוני חומר לסוג אחסון (WM)' עם טרנזקציות תחזוקה MM01‏, MM02 ו-LS24, ועם s4Note‏ " +
          "'EWM אסטרטגי.' — ללא פסיקת החלפה מוכרעת.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#MLGT",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "נתוני חומר לפי סוג אחסון (תצוגת ניהול מחסן WM 2). הטבלה קיימת ומתועדת ב-SAP S/4HANA 2025 FPS01, ולא נמצא " +
        "מקור רשמי המכריז עליה כטבלה שהוחלפה או הוצאה משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: MLGT_EWM_MIGRATION,
      recommendedAction:
        "הטבלה קיימת ומתועדת ב-SAP S/4HANA 2025 FPS01 On-Premise. במעבר ל-EWM היא משמשת מקור נתונים רשמי להעברת " +
        "מוצר מחסן, עם מיפוי שדות מתועד (LGTYP; ‏NSMN ל-REPQTY; ‏LGPLA). ההכרעה האסטרטגית היא ברמת פתרון המחסן " +
        "(EWM כפתרון האסטרטגי), לא ברמת הטבלה עצמה; אין מקור רשמי שמכריז על MLGT כטבלה שהוחלפה.",
    },
    xrefs: ["table:MLGN", "table:LAGP", "tx:LT01", "tx:LS24"],
    lastVerifiedAt: DATE,
    notes:
      "פסיקת הבלופרינט הוכרעה בראיות רשמיות: MLGT קיימת ומתועדת ב-2025 FPS01 (עמוד Warehouse Product Migration " +
      "מונה אותה כטבלת מקור ב-S/4HANA וממפה את שדותיה ל-EWM). אף סניפט רשמי אינו מכריז על MLGT כמיושנת, מוחלפת או " +
      "לא זמינה, ואיש אינו נוקב ביורשת — ולכן 'ללא שינוי' בלי יורש. הטענה ש-WM קלאסי הוא Compatibility Scope עם " +
      "EWM כפתרון האסטרטגי קיימת רק ברובד המאגר (data/tx-intel.ts, רשומת LT01, ‏s4Delta) ולכן משתקפת רק כהקשר " +
      "בהמלצה, לא כפסיקת טבלה. שלמות שדות מעבר לשלושת השדות הממופים רשמית (LGTYP‏, NSMN‏, LGPLA) וכל מספר SAP Note " +
      "נשארים לא מאומתים; לא נרשמו מספרי Note כי לא הופיעו בסניפטים רשמיים או בנתוני מאגר מאומתים עבור MLGT. " +
      "סתירות מול הבלופרינט (descriptionEn‏ 'Material number' לעומת השם הרשמי; s4Note לא מוכרע) נרשמו בקובץ התור. " +
      "שדות product/edition ברשומות המאגר הם הקשר הרשומה, לא טענת קובץ המקור.",
  },

  /* ---------------------------------------------------------- table:MDMA */
  {
    id: "table:MDMA",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Material MRP assignment | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/31a5b91ba03e48e59c0967c9688f00e9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אובייקט ההגירה PP - Material MRP assignment בוחר אוטומטית נתוני MRP של חומרים מטבלת MDMA עבור המפעלים " +
          "הנגזרים מהיקף ההגירה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Product MRP Area | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/aac8ab3626db4020bd4fae921e203515.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS של אובייקט MRP Area בוחרת את נתוני אזור ה-MRP של מוצר מטבלת MDMA‏ ('This CDS view selects " +
          "the MRP area relevant data of a product (table MDMA)'), כולל שיוך מתכנן MRP לאזור.",
        verificationLevel: "sap_official_verified",
      },
      MDMA_PRODUCT_CHECKS,
      {
        sourceType: "sap_help",
        sourceTitle: "Initial Transfer of Storage Location MRP Areas | PP/DS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/4739c95360267614e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "כתנאי מוקדם להעברת אזורי MRP של מיקומי אחסון ל-PP/DS‏: 'In SAP S/4HANA, MRP area processing is active " +
          "for the plant'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MDMA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "מפתח ראשי MANDT+MATNR+BERID; ‏MDMA מרחיבה את נתוני ה-MRP של MARC לרמת אזור MRP ומאפשרת תכנון מבוזר " +
          "בתוך מפעל (מיקום אחסון או ספק משנה).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MDMA",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PP-PI (דאטהסט מחולל) — רשומת MDMA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הבלופרינט מציין: אזורי MRP פעילים כברירת מחדל ב-MRP Live; אפליקציית Fiori משויכת Monitor Material " +
          "Coverage; טרנזקציות MM02‏, MD04‏, MD61.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#MDMA",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט — I_MRPMaterial",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS ‏I_MRPMaterial ממופה במאגר לטבלאות MARC ו-MDMA, עם תצוגת הצריכה C_MaterialCoverageNetwork " +
          "ואפליקציית Monitor Material Coverage.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MRPMaterial",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת MDMA (נתוני MRP לאזור MRP) מתועדת ב-S/4HANA On-Premise: תצוגת ה-CDS של אזור ה-MRP נבנית מעליה, היא " +
        "נכללת בבדיקות נתוני אב המוצר בגרסת 2025 FPS01, ואובייקט הגירה ייעודי מעביר את נתוניה ממערכת המקור.",
      edition: "on-premise",
      release: "2025.001",
      source: MDMA_PRODUCT_CHECKS,
      recommendedAction:
        "לעדכן את פסיקת הבלופרינט מ'לא הוכרע' ל'זמינה ורלוונטית להגירה': להעביר נתוני MRP לאזור MRP דרך אובייקט " +
        "ההגירה הייעודי, ולתכנן הקצאת חומרים לאזורי MRP כחלק מנתוני האב.",
    },
    xrefs: ["table:MARC", "table:MARA", "cds:I_MRPMaterial", "tx:MD04", "tx:MD61", "tx:MM02"],
    lastVerifiedAt: DATE,
    notes:
      "הפסיקה שלא הוכרעה בבלופרינט מוכרעת לחיוב: מקורות רשמיים ב-help.sap.com ‏(2025.001 ו-2023.latest) מאשרים " +
      "ש-MDMA נבחרת על ידי אובייקט הגירה ייעודי (ממערכת המקור) ומשמשת בסיס לתצוגת ה-CDS של אזור MRP. לא נמצא מקור " +
      "רשמי המכריז על החלפה או הוצאה משימוש, ולכן 'ללא שינוי' בלי יורש. הסתייגות: הטענה 'אזורי MRP פעילים כברירת " +
      "מחדל ב-MRP Live' קיימת רק ברובד המאגר (sapData.pppi.ts, mrp-center.ts); הסניפט הרשמי הקרוב ביותר מנסח זאת " +
      "כתנאי מוקדם ('MRP area processing is active for the plant') ולא כברירת מחדל גורפת — טענת החובה נשארת ברמת " +
      "'נדרש אימות נוסף'. סתירות שנרשמו בקובץ התור: descriptionEn של הבלופרינט הוא 'Material number' (ככל הנראה " +
      "שגיאת העתקה); data/table-enrichment.ts ממפה BERID אל T439D בעוד data/mrp-center.ts מציג את MDLV כטבלת אזורי " +
      "ה-MRP (אי-התאמה פנימית במאגר). ‏table:MDLV ו-fiori:F0247 אינם ב-xrefs כי אין להם מזהה בר-פענוח בדאטהסט " +
      "(ב-data/fiori/apps.ts קיימת רק הרשומה F0247A).",
  },

  /* ---------------------------------------------------------- table:MKAL */
  {
    id: "table:MKAL",
    evidence: [
      MKAL_PEO,
      {
        sourceType: "sap_help",
        sourceTitle: "Production version | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/7616dd5674514f31ad3b7e1db5bba0cd.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "העמוד קובע: 'In Discrete Manufacturing, it was not necessary to have a production version for BOM " +
          "explosion in the SAP ERP suite' — כלומר הדרישה היא שינוי של S/4HANA; והוא מנחה שאובייקטי ההגירה Routing " +
          "ו-Production version ישמשו באותו פרויקט הגירה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production version | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/94e563ae05544015adbf46931532aa3f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "אובייקט ההגירה 'PP - Production version' בוחר אוטומטית את גרסאות הייצור של החומרים מטבלת MKAL במערכת " +
          "המקור: 'This migration object automatically selects the production version of the materials from the " +
          "MKAL table for the derived plants'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Version | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/ccf476b09f65420ba36eda390fc758a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "גרסאות ייצור משמשות ב-SOP‏, ב-MRP, ביצירת הזמנות תהליך ובתמחיר מוצר לבחירת ה-Task List או המתכון המתאים " +
          "— בייצור דיסקרטי ובייצור תהליכי כאחד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת MKAL",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרת המאגר: MKAL היא טבלת גרסאות הייצור (מפתח MANDT/MATNR/WERKS/VERID, מקשרת BOM‏ STLAL לניתוב PLNNR), " +
          "והיא מציינת שב-S/4HANA גרסת הייצור נדרשת ככלל, בניגוד לתפקידה האופציונלי ב-ECC; ‏MKAL נשארת ב-S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MKAL",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט — רשומת C223",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "C223 מתחזקת גרסאות ייצור הנכתבות ל-MKAL (קישור BOM חלופי לניתוב או מתכון עם גודל מנה ותוקף); גרסת ייצור " +
          "חובה ב-PP-PI; ‏MKAL נשארת ב-S/4HANA, עם אפליקציית ה-Fiori‏ Manage Production Versions כממשק המודרני.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#C223",
      },
    ],
    status: {
      status: "changed",
      he:
        "טבלת MKAL נשארת פעילה ב-S/4HANA כטבלת גרסאות הייצור, ותפקידה אף התחזק: על פי התיעוד הרשמי, ב-S/4HANA " +
        "גרסת הייצור היא מקור האספקה היחיד לחומרים המיוצרים בייצור פנימי, בעוד שב-ECC לא נדרשה גרסת ייצור לפיצוץ " +
        "BOM בייצור דיסקרטי. בתעשיות תהליכיות (PP-PI) גרסת ייצור הייתה חובה גם קודם.",
      edition: "on-premise",
      release: "2025.001",
      source: MKAL_PEO,
      recommendedAction:
        "לפני ההסבה יש להשלים גרסאות ייצור עקביות (BOM + Routing תקפים) לכל החומרים המיוצרים; אובייקט ההגירה " +
        "PP - Production version שואב את הנתונים ישירות מטבלת MKAL במערכת המקור. ניהול שוטף בעזרת C223 או אפליקציית " +
        "Fiori בשם Manage Production Versions.",
    },
    xrefs: ["tx:C223", "table:MAST", "table:STKO", "table:PLKO"],
    lastVerifiedAt: DATE,
    notes:
      "פסיקת הבלופרינט הייתה לא מוכרעת; התוצאה המאומתת: MKAL נשארת טבלת גרסאות הייצור, והדרישה לגרסת ייצור היא " +
      "שינוי S/4HANA. שני סניפטים רשמיים תומכים: עמוד ה-PEO קובע שגרסת הייצור היא מקור האספקה היחיד לחומרים " +
      "מיוצרים ב-S/4HANA, ועמוד ההגירה קובע שב-SAP ERP‏ (ECC) לא נדרשה גרסת ייצור לפיצוץ BOM בייצור דיסקרטי. " +
      "אובייקט ההגירה קורא את MKAL במערכת המקור; הרגל 'MKAL נשארת ב-S/4HANA' נשען על רשומות המאגר " +
      "(table-enrichment, tx-intel) ועל הראיות הרשמיות לכך שאובייקט Production Version פעיל ב-S/4HANA 2025 ‏" +
      "(API‏, Fiori). פריט הפישוט הפורמלי ומספר ה-SAP Note שלו נמצאים מאחורי התחברות S-user ולא צוטטו — שום מספר " +
      "לא נרשם לפי כלל אל-תנחש. רשומות המאגר עולות בקנה אחד עם המקורות הרשמיים; ראיית ההגירה הוסבה לוואריאנט " +
      "מקור-ERP‏ (loio 94e563ae, אומת חי 2026-09-02) במקום וריאנט ה-AFS שצוטט בטיוטה.",
  },

  /* ---------------------------------------------------------- table:CRCO */
  {
    id: "table:CRCO",
    evidence: [
      CRCO_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center Cost Center | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/f31bf21259154e48a3b7beb4be1ffac4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "קיים CDS View בשם Work Center Cost Center (שם טכני: I_WorkCenterCostCenter, כנקוב בסניפט) הקורא את טבלת " +
          "CRCO — 'to a work center, table CRCO, by internal key' — ומציג את תוקף שיוך מרכז העלות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Assigning a Work Center to a Cost Center | Work Centers (PP-BD-WKC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/d74941cf210b44768dc074ce2f243890/ae74b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "התהליך העסקי של שיוך מרכז עבודה למרכז עלות (Goto ← Cost Center Assignment, כולל תקופת תוקף) נשאר תהליך " +
          "מתועד ב-S/4HANA 2025 On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Work Center Cost Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/b10ad622a2e44ec382d90525082707b3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "קיים שירות API רשמי (APIs for Manufacturing) בשם Create Work Center Cost Center ליצירת שיוך מרכז עלות " +
          "למרכז עבודה בשיטת POST.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Displaying Cost Center Assignments | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/f182bf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "בתעשיות תהליכיות (PP-PI) קיים דוח מתועד להצגת שיוך משאבים למרכזי עלות: Logistics ← Production - Process ← " +
          "Master Data ← Resources ← Reporting ← Cost Center Assignment.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת CRCO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרה מאומתת במאגר: CRCO מקשרת CRHD (מרכז עבודה/משאב) אל KOSTL (מרכז עלות) ו-LSTAR (סוגי פעילות); מפתח " +
          "MANDT/OBJTY/OBJID/LANUM; בלי שיוך תקף ההזמנה לא מחשבת עלויות פעילות.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#CRCO",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "הקצאת מרכז עלות למרכז עבודה. הטבלה נמנית במסמך הארכוב של PP-BD-WKC בגרסת 2025 FPS01, תצוגת ה-CDS‏ " +
        "I_WorkCenterCostCenter קוראת אותה ישירות, וקיים API ייעודי ליצירת השיוך.",
      edition: "on-premise",
      release: "2025.001",
      source: CRCO_ARCHIVING,
      recommendedAction:
        "לעדכן את פסיקת ה-blueprint שלא הוכרעה: CRCO נשארת טבלה פעילה ב-S/4HANA On-Premise (מאוזכרת בתיעוד 2025 " +
        "FPS01 לארכוב, ב-CDS View בשם Work Center Cost Center וב-API ייעודי). אין טבלה יורשת שנמצאה; לגישה אנליטית " +
        "מומלץ ה-CDS View, ולעדכון בממשקים השירות Create Work Center Cost Center.",
    },
    xrefs: ["table:CRHD", "table:CRCA", "table:CRTX", "table:CSLA", "cds:I_WorkCenterCostCenter"],
    lastVerifiedAt: DATE,
    notes:
      "הפסיקה שלא הוכרעה במקור (s4Note‏: 'התחשבנות ב-Universal Journal (ACDOCA); הקצאה נשמרת.' — ללא אסימון פסיקה) " +
      "נסגרת בראיות רשמיות: CRCO קיימת ופעילה ב-S/4HANA On-Premise עד 2025 FPS01. שלוש נקודות עיגון: מסמך הארכוב " +
      "של PP-BD-WKC מונה את CRCO בין טבלאות מרכז העבודה (לצד CRTX ו-CRCA); תיעוד ה-VDM ‏(2023) מציג CDS View " +
      "שקורא את CRCO ישירות, ושמו הטכני I_WorkCenterCostCenter נקוב בסניפט (ותואם את data/cds-map.ts); ותיעוד APIs " +
      "for Manufacturing מציג שירות יצירה לשיוך זה. לא נמצא מקור רשמי המכריז על החלפה או הוצאה משימוש, ולכן אין " +
      "יורש. ההקשר בתחזוקת מפעל: השיוך הוא הבסיס לחישוב עלויות פעילות בהזמנות אחזקה וייצור. ‏table:CSKS הוסרה " +
      "מה-xrefs — אין לה דף בדאטהסט (מוזכרת כמפתח זר בהעשרה בלבד).",
  },

  /* ---------------------------------------------------------- table:CSLA */
  {
    id: "table:CSLA",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "CO - Activity type | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/9dcd9cc9eeea4e6c85dc220c84ec7cf9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אובייקט ההגירה CO - Activity type בוחר אוטומטית את כל סוגי הפעילות מטבלת CSLA (במערכת ה-ERP המקור) עבור " +
          "אזורי הבקרה הנגזרים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CO - Activity type | Data Migration (Fiori apps)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/62e280fd41f646368b5879e2d699d2f8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אפליקציות ה-Fiori הרשמיות לסוגי פעילות ב-S/4HANA‏: Manage Activity Types (Version 2)‏ (F1605A) " +
          "ו-Activity Type (S/4HANA)‏ (F1717).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Activity Types | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/70c1b4f3e8bc4ea79a97e2c0cd40a0c5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אפליקציית Manage Activity Types מציגה נתוני אב של סוגי פעילות, יוצרת סוגי פעילות חדשים ומנהלת קיימים " +
          "ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      CSLA_INFO_SHEETS,
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת CSLA",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "CSLA היא רשומת האב של סוגי פעילות: מפתח MANDT‏, KOKRS‏, LSTAR‏, DATBI; מקושרת ל-CRCO (שיוך פעילות למרכז " +
          "עבודה) ולתעריפי פעילות המתוחזקים ב-KP26.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#CSLA",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PP-PI (דאטהסט מחולל) — רשומת CSLA (s4Note)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ה-s4Note של הבלופרינט: 'תעריפים ב-Universal Journal; הגדרה נשמרת.' — הגדרת סוג הפעילות נשמרת ב-S/4HANA " +
          "בעוד רישומי התעריפים זורמים ל-Universal Journal.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#CSLA",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "רשומת האב של סוגי פעילות ב-CO (סוג פעילות לאזור בקרה: שעת מכונה, שעת אדם, הכנה). נשמרת ב-S/4HANA: אובייקט " +
        "ההגירה CO - Activity type קורא את סוגי הפעילות מטבלת CSLA ממערכת המקור (ERP), התיעוד הרשמי של Controlling " +
        "(CO) בגרסת 2025.001 מונה את CSLA ו-CSLT כטבלאות הרלוונטיות (Information Sheets), וקיימות אפליקציות Fiori " +
        "רשמיות לניהול (F1605A‏, F1717). לפי נתוני הפרויקט ההגדרה נשמרת והתעריפים נרשמים ב-Universal Journal. אף " +
        "מקור רשמי אינו מציין החלפה, פריט פישוט או טבלה יורשת.",
      edition: "on-premise",
      release: "2025.001",
      source: CSLA_INFO_SHEETS,
      recommendedAction:
        "להמשיך להשתמש ב-CSLA כטבלת האב של סוגי פעילות. בהגירה להעביר את הנתונים דרך אובייקט ההגירה CO - Activity " +
        "type, ולנהל סוגי פעילות ב-S/4HANA גם דרך אפליקציות Fiori‏ F1605A ו-F1717.",
    },
    xrefs: ["table:CRCO"],
    lastVerifiedAt: DATE,
    notes:
      "הוכרע 'ללא שינוי' על סמך ראיות רשמיות: שני נושאים של חוברת ה-Data Migration ‏(2025.001) נוקבים בטבלת CSLA " +
      "כמקור שאובייקט ההגירה קורא ממערכת ה-ERP המקור, ומונים את אפליקציות ה-Fiori‏ F1605A / F1717 במזהיהן; חוברת " +
      "Controlling (CO) מתעדת את אפליקציית Manage Activity Types ואת BUS1031 להעברת סוגי פעילות, ומונה תחת " +
      "Tables/Databases את CSLA ו-CSLT — הבסיס הרשמי לסטטוס. ‏CSLT אינה ב-xrefs כי אין לה דף בדאטהסט. ה-BAPI של " +
      "אובייקט ההגירה קריא בסניפט של loio 9dcd9cc9‏ — BAPI_ACTTYPE_CREATEMULTIPLE — ומיוחס שם לאובייקט ההגירה של " +
      "סוגי הפעילות (BAPI_ACTIVITYTYPEGRP_CREATE מופיע רשמית רק לאובייקט קבוצות סוגי הפעילות, לא לטבלה זו). הערת " +
      "איכות נתונים לכותב ההעשרה: שדות funcs/progs ברשומת הבלופרינט (BAPI_MATERIAL_SAVEDATA‏, " +
      "BAPI_MATERIAL_GET_DETAIL‏, RMMG2000‏, MM60) הם אובייקטי רשומת אב חומר — ככל הנראה שריד העתקה בחוברת המקור " +
      "שאינו קשור ל-CSLA; אין להציגם כממשקי CSLA. הסתירה נרשמה גם בקובץ התור.",
  },

  /* --------------------------------------------------------- table:T438M */
  {
    id: "table:T438M",
    evidence: [
      T438M_VDM,
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Production Planning | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/f5d76716a8614109837476bdb69e02a0.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS‏ I_MRPGroupControlParameter‏ (MRP Group Control Parameter) הוצגה כחדשה ב-SAP S/4HANA 2023 " +
          "(What's New).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PP-PI (דאטהסט מחולל) — רשומת T438M",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הבלופרינט רושם את T438M כ'סוג MRP' / 'MRP type' עם JOIN‏ MARC.DISMM = T438M.DISMM ו-s4Note‏ " +
          "'MRP Live - חלק מהפרמטרים מותאמים; אמת מול SAP Help.' — פסיקה לא מוכרעת המפנה ל-SAP Help.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#T438M",
      },
      {
        sourceType: "repository",
        sourceTitle: "הערת אל-תנחש בהעשרת הטבלאות",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "T438M הושארה במכוון ללא העשרה כי מבנה המפתח והסמנטיקה שלה לא אומתו מול מקור אמין.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts:1114-1118",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "Production Planning with SAP S/4HANA‏ §13.4 (עמ' 695–698), דרך עץ הקונפיגורציה של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "עץ הקונפיגורציה המאומת של הפרויקט מקשר את צומת 'Check MRP Types'‏ (OMDQ) לטבלאות T438A ו-T438M, בהסתמך " +
          "על הספר Production Planning with SAP S/4HANA‏ (§13.4, עמ' 695–698).",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-config-tree.ts#n5",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "טבלת Customizing של פרמטרי בקרה ל-MRP התלויים בקבוצת MRP. קיומה ב-S/4HANA מאומת רשמית (תצוגת ה-CDS " +
        "המסופקת I_MRPGroupControlParameter קוראת ממנה), אך מבנה המפתח שלה, ה-JOIN מהבלופרינט (MARC.DISMM) והיקף " +
        "ההתאמות ל-MRP Live טרם אומתו מול מקור רשמי — ולכן הפסיקה נשארת 'נדרש אימות נוסף'.",
      edition: "on-premise",
      release: "2023.latest",
      source: T438M_VDM,
      recommendedAction:
        "לעדכן את תווית הרשומה: לפי התיעוד הרשמי T438M מחזיקה פרמטרים תלויי קבוצת MRP; לפי מקורות הפרויקט (Tier-2) " +
        "קטלוג סוגי ה-MRP מוגדר ב-T438A‏ (OMDQ) — דורש אישוש מול מקור SAP רשמי. מבנה המפתח וה-JOIN מהבלופרינט " +
        "(MARC.DISMM) דורשים אימות במערכת SAP חיה לפני שמשתמשים בהם.",
    },
    xrefs: ["table:MARC"],
    lastVerifiedAt: DATE,
    notes:
      "אומת מרשומות חיפוש רשמיות של help.sap.com‏: T438M קיימת ב-S/4HANA On-Premise ונקראת על ידי תצוגת ה-CDS‏ " +
      "I_MRPGroupControlParameter (חדשה ב-S/4HANA 2023), שעמודה נוקב בטבלה כלשונה כמחזיקת פרמטרי MRP תלויי קבוצת " +
      "MRP. אף מקור רשמי אינו טוען החלפה או הוצאה משימוש. תווית הבלופרינט 'סוג MRP' סותרת את התיאור הרשמי (סוגי " +
      "MRP שייכים ל-T438A לפי מקורות Tier-2 של הפרויקט: object-intel, שיעורי האקדמיה); ה-JOIN‏ DISMM ומבנה " +
      "המפתח/השדות נשארים 'נדרש אימות' מול מערכת SAP חיה או מפרט רשמי להורדה, כי גוף עמודי ה-Help אינו נשלף ואף " +
      "סניפט אינו נוקב במפתח. ל-T438M אין רשומות ב-tx-intel.ts וב-s4-impact.ts. ‏table:T438A‏, tx:OMDQ‏, " +
      "cds:I_MRPGroupControlParameter ומזהה הספר אינם ב-xrefs כי אין להם מזהה בר-פענוח בדאטהסט של הפרויקט. הסתירה " +
      "נרשמה גם בקובץ התור.",
  },

  /* ---------------------------------------------------------- table:AUFK */
  {
    id: "table:AUFK",
    evidence: [
      AUFK_PM_TABLES,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Header | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c6c3a06854a44d9383b32946f008b1b8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS‏ Production Order Header‏ 'retrieves production order header data (tables AUFK and AFKO)' — " +
          "התיעוד הרשמי של 2025 עדיין מונה את AUFK כטבלת מקור לנתוני כותרת הזמנת ייצור.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/6dec12675da54f29a9283ace7994ca8c.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS‏ I_ManufacturingOrder שולפת נתוני כותרת הזמנת ייצור מהטבלאות AUFK ו-AFKO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order with Status | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/0b426c3ae37e47aea2718312ea2f32ec.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "תצוגת ה-CDS‏ I_MfgOrderWithStatus‏ ('Manufacturing Order with Status') שולפת נתוני כותרת הזמנת ייצור " +
          "מהטבלאות AUFK‏, AFKO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CO - Internal order | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/fc6daf34fb7d4f7f996806a391ffafb7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אובייקט ההגירה CO - Internal order בוחר אוטומטית הזמנות פנימיות מטבלת AUFK‏ ('automatically selects " +
          "internal orders from the AUFK table').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Configuration in SAP Landscape Transformation Replication Server | Central Finance",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/26c2d5e366bc44c1a98f2a9212a0c49d/da1a0487a9094d729d0efbc9a127dffd.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד Central Finance מתאר שכפול (replication) של 'order master data (table AUFK)' בשילוב עם מערכת SAP " +
          "S/4HANA 1809 או SAP S/4HANA Cloud Public Edition.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת AUFK",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת מאגר מאומתת: AUFK היא כותרת ההזמנה המשותפת (PM/PP/CO) עם מפתח AUFNR, סוג הזמנה AUART ואובייקט " +
          "סטטוס OBJNR.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#AUFK",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) — הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "AUFK נמנית בסט S4_STABLE של המאגר — טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA " +
          "(verified, low risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת AUFK, נתוני האב של ההזמנה, פעילה ב-S/4HANA On-Premise (עדכני ל-2025 FPS01) וללא טבלה חליפית. זו " +
        "הכותרת המשותפת להזמנות אחזקה, ייצור ותהליך ולהזמנות פנימיות של CO, ותצוגות CDS רשמיות כגון " +
        "I_ManufacturingOrder קוראות ממנה ישירות (יחד עם AFKO).",
      edition: "on-premise",
      release: "2025.001",
      source: AUFK_PM_TABLES,
      recommendedAction:
        "להמשיך להשתמש ב-AUFK ככותרת ההזמנה המשותפת; אין פעולת הסבה נדרשת לטבלה עצמה. לצריכה אנליטית ולפיתוח חדש " +
        "מומלץ לקרוא דרך תצוגות CDS רשמיות (I_ManufacturingOrder‏, I_MfgOrderWithStatus) במקום גישה ישירה לטבלה.",
    },
    xrefs: ["table:AFKO", "table:AFIH", "table:AFPO", "table:JEST"],
    lastVerifiedAt: DATE,
    notes:
      "שתי ריצות חיפוש של scripts/sap-help-search.mjs מציגות בעקביות את AUFK בשם 'Order master data' ובשימוש " +
      "ב-PM (אובייקט ההשמדה PM_WOC_MH), ב-PP (תצוגות CDS מעל AUFK+AFKO), ב-CO (הגירת הזמנות פנימיות) " +
      "וב-Central Finance ב-S/4HANA 2025 FPS01. אף מקור רשמי אינו נוקב ביורשת או בהוצאה משימוש, ולכן 'ללא שינוי'. " +
      "רק סניפטים רשמיים שימשו לניסוח; לא נטען שום מספר SAP Note. רובד המאגר (table-enrichment רשומת AUFK, " +
      "s4-impact‏ S4_STABLE) עולה בקנה אחד עם הראיות הרשמיות; לא נמצאו סתירות. תצוגות ה-CDS‏ I_ManufacturingOrder " +
      "ו-I_MfgOrderWithStatus מגובות בראיות רשמיות אך אינן ב-xrefs כי אין להן מזהה בר-פענוח בדאטהסט. ראיית " +
      "I_MfgOrderWithStatus‏ (loio 0b426c3a) אומתה חי ב-2026-09-02.",
  },

  /* ---------------------------------------------------------- table:RESB */
  {
    id: "table:RESB",
    evidence: [
      RESB_OIG_TABLES,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Component | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/fdbbfc2cda1e4c12bff09946e22ed8cb.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS שולפת נתוני רכיבי הזמנת ייצור מפריטי ההזמנה, טבלת RESB‏: 'This CDS view retrieves production " +
          "order component data by semantic key (reservation items, table RESB)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order Operation Component | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/d821563df8ef4ecb9a5fedc2bacda6fe.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "תצוגת ה-CDS קוראת רכיבי פעולה של הזמנת ייצור מפריטי ההזמנה — 'items, table RESB' — לפי מפתח סמנטי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Scenarios and Tables for Substance Volume Tracking | Product Safety and Stewardship",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ff6d35a34fbe4bea99e4ac41b0d5db03/c8a1ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "העמוד מונה את RESB בשורות התרחישים גם של Production order וגם של Process order — כיסוי רשמי לרכיבי " +
          "הזמנות ייצור ותהליך.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Planned Modification | Product Lifecycle Management (PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/4bdbc353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "RESB נכתבת בתהליכי 2025 FPS01: ב-Planned Modification החומר הישן נשמר בטבלת ההזמנות RESB‏ ('The old " +
          "material S is stored in the reservations table RESB') והחומר החדש ב-AFPO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reservations | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/37485192f5d746f2bfe85d9ad00bebf3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "פריטי הזמנה (Reservation Items) מתארים תנועות מתוכננות בודדות (חומר, כמות, תאריך דרישה); הזמנות ידניות " +
          "והזמנות תלויות קיימות שתיהן ב-2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reservation Document Header | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/2790e3a21e8a4a98832d8bbb8b1e638a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "קיים API רשמי ב-APIs for Inventory‏ — Reservation Document — עם הפעולות הנתמכות Retrieve / Create / " +
          "Update / Delete Reservation Document.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת RESB",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "העשרת המאגר (מאומתת): RESB מחזיקה הזמנות/דרישות תלויות להזמנות ייצור, תהליך ואחזקה ול-MRP; מפתח " +
          "MANDT/RSNUM/RSPOS/RSART; ‏BDMNG מול ENMNG‏, BWART ודגלי Backflush.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#RESB",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט — רשומת CO01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "יצירת הזמנת ייצור (CO01) שומרת ל-AUFK/AFKO/AFPO/AFVC/RESB אחרי פיצוץ BOM‏; RESB מחזיקה את רכיבי ההזמנה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO01",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת RESB (הזמנה / דרישות תלויות) קיימת ומתועדת ב-S/4HANA On-Premise עד גרסת 2025 FPS01, ומשמשת מקור " +
        "ל-CDS Views של רכיבי הזמנה במודל הנתונים הווירטואלי. הכיסוי הרשמי מתועד להזמנות ייצור ותהליך; שימושה גם " +
        "להזמנות אחזקה (PM) מאומת מול נתוני הפרויקט בלבד.",
      edition: "on-premise",
      release: "2025.001",
      source: RESB_OIG_TABLES,
      recommendedAction:
        "אין צורך בטבלה חליפית במיגרציה. להמשיך לעבוד מול RESB לרכיבים ודרישות תלויות, ולהעדיף צריכה דרך CDS Views " +
        "(רכיבי הזמנת ייצור) או Reservation Document API היכן שנדרש ממשק.",
    },
    xrefs: ["tx:CO01"],
    lastVerifiedAt: DATE,
    notes:
      "הסטטוס אומת מרשומות חיפוש רשמיות (SAP_S4HANA_ON-PREMISE)‏: RESB נקובה בתיאורה המדויק " +
      "'Reservation/dependent requirements' בעמוד טבלאות של 2025 FPS01, מוצהרת כטבלת הבסיס מאחורי תצוגות ה-CDS של " +
      "רכיבי הזמנה (2023.latest), ונכתבת בתהליכי 2025 FPS01 (Planned Modification). אף מקור רשמי לא נמצא המסמן את " +
      "RESB כמוחלפת, מיושנת או מוסרת — ולכן 'ללא שינוי' בלי יורשת. עמוד ה-Reservations‏ (MM-IM) אינו נוקב ב-RESB; " +
      "הקישור בינו לבין הטבלה הוא סינתזה של הרשומה (ראיה 1 + ראיה 6). ראיות ה-SVT וה-API אומתו חי ב-2026-09-02. " +
      "פערים: RESB נעדרת מהדאטהסט המחולל data/sapData.ts‏ (0 התאמות) — היא נכנסת למאגר דרך table-enrichment " +
      "ו-tx-intel בלבד; פירוט שדות DDIC‏ (SE11) לא אומת מחדש מול מערכת חיה (חיבור sc4sap נכשל) ונשאר ברמת אימות " +
      "המאגר; לא צוטט מספר SAP Note כי אף אחד לא הופיע בסניפטים רשמיים או בנתוני מאגר מאומתים. ‏table:RKPF אינה " +
      "ב-xrefs כי אין לה דף בדאטהסט (נקובה בסניפט הרשמי בלבד).",
  },

  /* -------------------------------------------------------- table:MARA */
  {
    id: "table:MARA",
    evidence: [
      MARA_EXT_MATNR,
      {
        sourceType: "sap_help",
        sourceTitle: "Material Numbers | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/977cbd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד MM-IM לגרסת 2025 FPS01 מגדיר את מספר החומר כ-'Number uniquely identifying a material master " +
          "record, and thus a material' וקובע: 'Material numbers can be up to 40 characters'. פורמט הפלט נקבע " +
          "ב-Customizing של ה-Material Master תחת Basic Settings > Define Output Format of Material Numbers.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Types of Checks Performed | Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/1bc030a8228d405fbea7016562fa85f1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד ה-Product Master לגרסת 2025 FPS01 מונה את 'General Material Data (MARA)' ראשונה בין הטבלאות " +
          "ששדותיהן ניתנים להגדרה לאיתור כפילויות (matching potential duplicates) באפליקציית Manage Product Master " +
          "Data, לצד MARC‏, MARD‏, MARM‏, MAKT‏, MBEW‏, MDMA ו-MEAN.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Replicating Custom Fields for Product Master Data | Integration with Industry Cloud Solutions from SAP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2de74e75ac4240c68ff125a948205aee/e10c73228f5448ccb0ca2345933f55d6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "העמוד לגרסת 2025 FPS01 מנחה: 'Define an extension view of the I_Product CDS view. In the MARA database " +
          "table, identify the custom fields that you want to replicate', ומוסיף ששמות השדות המותאמים בתצוגת ההרחבה " +
          "חייבים להתאים לשמות בטבלת MARA‏ ('make sure that the field names of the custom fields in the extension " +
          "view match the names in the MARA'). העמוד קושר כך בין תצוגת ה-CDS‏ I_Product לבין טבלת MARA לצורך שדות " +
          "נתוני הבסיס (Basic Data) של אב המוצר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), רשומת MARA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        sapNote: "2267140",
        claim:
          "רובד המאגר: רשומת ההשפעה של MARA קובעת 'MATNR הורחב מ-18 ל-40 תווים. מבנה נשמר' (trust: verified, risk: " +
          "medium), עם שורת שדה MATNR‏ CHAR 18 ב-ECC מול CHAR 40 ב-S/4HANA ובדיקת ממשק Zetes / Daymax עם חומר באורך " +
          "מלא. SAP Note 2267140 מצוטט כלשונו ברשומת המאגר. MARA אינה נכללת בסט S4_STABLE באותו קובץ.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MARA",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת MARA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: MARA מחזיקה את נתוני החומר החוצים-מפעל (סוג חומר MTART, קבוצת חומרים MATKL, יחידת " +
          "מידה בסיסית MEINS); מפתח MANDT+MATNR; מפתחות זרים MTART ל-T134‏, MATKL ל-T023‏, MEINS ל-T006. הערת S/4 " +
          "ברשומה (matdocNote, בניסוח מקורב ללא המקף הארוך של המקור): ללא שינוי מבני ב-S/4; אורך MATNR הורחב לעד 40 " +
          "תווים (Extended Material Number; נדרש טיפול בקוד Z).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MARA",
      },
    ],
    status: {
      status: "changed",
      he:
        "טבלת MARA (נתוני חומר כלליים, General Material Data) נשמרת ב-S/4HANA On-Premise כטבלת נתוני האב הכלליים " +
        "של החומר, ומתועדת בשימוש ב-2025 FPS01 (Product Master, הרחבת I_Product מעל MARA). השינוי: מספר החומר " +
        "יכול להיות באורך של עד 40 תווים (Extended Material Number) לעומת 18 התווים של מספר החומר הסטנדרטי; " +
        "הסניפט הרשמי מציין את MATNR כגרסה הקצרה של שדה מספר החומר ואת MATNR_EXTERNAL כמספר החומר המורחב, והטענה " +
        "ששדה MATNR עצמו הורחב ל-CHAR 40 היא של רובד המאגר (data/s4-impact.ts#MARA) בלבד; לפי התיעוד הרשמי ברירת " +
        "המחדל נשארת 18 תווים וההרחבה מופעלת במערכת ה-Backend ב-Customizing.",
      edition: "on-premise",
      release: "2025.001",
      source: MARA_EXT_MATNR,
      recommendedAction:
        "אין צורך בהחלפת הטבלה: נתוני האב הכלליים נשארים ב-MARA. לפני ההסבה להחליט אם מפעילים את מספר החומר " +
        "המורחב (40 תווים). בכל מקרה לבדוק קוד Z, ממשקים (Zetes / Daymax), IDoc MATMAS, ברקודים ותוויות שמניחים " +
        "18 תווים או משתמשים ב-offset קבוע על MATNR (רובד המאגר; SAP Note 2267140 מרשומת s4-impact). לפיתוח חדש " +
        "ולצריכה אנליטית להעדיף קריאה דרך תצוגת ה-CDS‏ I_Product במקום גישה ישירה לטבלה.",
    },
    xrefs: [
      "table:MARC", "table:MAKT", "table:MARM", "table:MBEW", "table:MVKE", "table:MARD", "table:MEAN",
      "table:MDMA", "table:T134", "table:T023", "tx:MM01", "tx:MM02", "tx:MM03", "fm:BAPI_MATERIAL_SAVEDATA",
      "fm:BAPI_MATERIAL_GET_DETAIL", "fm:MARA_SINGLE_READ", "idoc:msg:MATMAS", "idoc:basic:MATMAS05",
      "cds:I_Product",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "כתיבה מחדש לאחר הדחייה בסבב 1 (URL מורכב שלא הוחזר מהאינדקס, טענות רחבות מהסניפט). ארבעת ה-URL הרשמיים " +
      "הועתקו כלשונם מפלט scripts/sap-help-search.mjs --json ב-2026-09-07 (loio ו-versionId 2025.001), וכל אחד " +
      "אומת מול אינדקס help.sap.com (כותרת, loio, versionId) באותו יום; HTTP 200 מ-help.sap.com אינו ראיה לקיום " +
      "עמוד, כי האתר מחזיר 200 גם ל-loio שאינו קיים. כל טענה תחומה בכותרת ובסניפט של רשומת החיפוש, גופי העמודים " +
      "לא נקראו (מעטפת JavaScript). פסיקת הבלופרינט לא הוכרעה (s4ClassOf מחזירה null כי הערת ה-S/4 נפתחת " +
      "ב-'MATNR' ולא בטוקן פסיקה), ולכן האפליקציה הציגה עד כה 'נדרש אימות נוסף'; הראיות הרשמיות מכריעות 'משתנה' " +
      "ללא יורשת (הטבלה אינה מוחלפת או מוסרת). הטוקן 'פריט פישוט' לא נבחר: אף סניפט רשמי שנשלף (חיפושים " +
      "'Material Number Field Length Extension', 'simplification material number field length MATNR') אינו נוקב " +
      "בשם פריט הפישוט של הרחבת אורך מספר החומר, וקטלוג פריטי הפישוט דורש S-user (לפי MANIFEST). SAP Note " +
      "2267140 מצוטט רק כי הוא קיים כלשונו בנתוני המאגר (data/s4-impact.ts#MARA והבלופרינט PP-PI:MARA); לא אומת " +
      "מול me.sap.com. עמוד רשמי נוסף, 'Long Material Number' (Discrete Industries, 2025.001, loio " +
      "430c8a573a3c0322e10000000a44147b), נוקב בסניפט ב-SAP Note 2360860 ('Long material number is enabled in " +
      "SAP S/4HANA by the material field length extension'), אך עניינו פונקציית העסק IS-A-LMN (מצב תאימות DIMP " +
      "LAMA) שאינה בהיקף CBC, ולכן לא נרשם כשדה sapNote. לא אומת רשמית: אורך שדה MATNR בהגדרת ה-DDIC של MARA " +
      "במערכת S/4HANA ללא תלות בהפעלה (הסניפטים מדברים על הפעלת מספר חומר מורחב, מציינים את MATNR כגרסה הקצרה " +
      "ואת MATNR_EXTERNAL כמספר המורחב, וברירת מחדל של 18 תווים; הטענה CHAR 18 מול CHAR 40 היא של רובד המאגר " +
      "בלבד) וכן רשימת השדות המלאה של הטבלה; שניהם דורשים SE11 או את נוסח פריט הפישוט. לא בוצעה בדיקה חיה " +
      "במערכת SAP (חיבור sc4sap נכשל). רשומות רשמיות נוספות לגרסת 2025 FPS01 שנוקבות ב-MARA ולא נכללו כדי לשמור " +
      "על רשומה תחומה: MATMAS IDoc (APIs for Product Master, loio 5f1d9c221c1841e0b202c5536fc1fa87: 'transfer " +
      "material master general data from MARA tables', מצוטט תחת idoc:msg:MATMAS); Warehouse Product Migration " +
      "(EWM, loio d158a5ef3b6a427eab5e7cc9bad16b96: 'MARA – General Material Data (optional)' כטבלת מקור, מיפוי " +
      "MARA-MHDRZ); Table and Field Extensibility (loio dacf081f31af4c93ab97da957c71feee, האינדקס מחזיר אותו " +
      "תחת שני deliverables: 8308e6d301d54584a33cd04a9861bc52 'SAP S/4HANA and SAP S/4HANA Cloud Private " +
      "Edition' ו-6d52de87aa0d4fb6a90924720a5b0549 'Master Data Governance', שניהם מוחזרים מהאינדקס " +
      "ב-2026-09-07; הסניפט: 'Product Table Description MARA Basic Data'); External Material Number Persistence " +
      "(Product Master, loio 191f8ceb928748639c312ee4962c86e0: conversion exit MATN1 על שדה MATNR ושדה " +
      "MATNR_EXTERNAL); Enhancements to ALE Master Data Distribution (What's New 2020, loio " +
      "eb5f145737cb43969d194eea32f3d3b5: 'It filters the data in the MARA table, which stores general material " +
      "data'); CDS Views for Product Master (What's New 2025 FPS01, loio 1b8964a0a8734596b251bf79aa415d7d: השדה " +
      "SegmentationStructure נוסף ל-I_Product). אי-אחידות במאגר: descriptionEn של MARA בבלופרינט PP-PI הוא " +
      "'Material number' (תוצר העתקה, כמו ב-MLGT ו-MDMA) בעוד השם הרשמי הוא 'General Material Data'. אין xref " +
      "ל-Fiori: השם 'Manage Product Master Data app' מופיע בסניפט הרשמי, אך מזהה האפליקציה אינו מופיע באף סניפט " +
      "ואינו ברשימת data/fiori/apps.ts, ולכן אינו נטען. סוג הבסיס MATMAS06 המתועד ב-2025 FPS01 אינו ברישום " +
      "הסוגים הבסיסיים של הפרויקט ולכן אינו ב-xrefs (ראו רשומת idoc:msg:MATMAS).",
  },

  /* -------------------------------------------------------- table:CRHD */
  {
    id: "table:CRHD",
    evidence: [
      CRHD_WKC_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Work center | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/70a186f1310049bc837c9ec8c1b63db5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה PP - Work center ב-SAP S/4HANA 2025 FPS01 בוחר אוטומטית את כל מרכזי העבודה מטבלת CRHD " +
          "עבור המפעלים הנגזרים ('automatically selects all work centers from the CRHD table for the derived " +
          "plants'); האובייקט העסקי הקשור לפי העמוד: Work Center, רכיב PP-BD-WKC, סוג אובייקט עסקי Master, ולמרכז " +
          "העבודה קיימת קיבולת זמינה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center by Semantic Key | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/fdbddc4bc0704188a5ada9af57ebb5ed.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תיעוד ה-Virtual Data Model (‏2023 Latest) מציג את תצוגת ה-CDS‏ Work Center by Semantic Key (שם טכני " +
          "I_WorkCenterBySemanticKey, סוג תצוגה Basic, Dimension, סטטוס שחרור Released) השולפת את נתוני האב של מרכז " +
          "העבודה מטבלת CRHD לפי מפתח סמנטי (שני קטעי הסניפט: 'With this CDS view, you can retrieve the work center " +
          "master' ו-'data (table CRHD) by semantic key'); בין המאפיינים הראשיים לפי הסניפט: Plant, Work center, " +
          "Work center internal ID, Work center category, Work center usage.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work center/Resource | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/d1c46c79ab034062a3ded5bb8ab3e79f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד ההגירה Work center/Resource לגרסת 2025 FPS01 מונה את היישומים שניתן להשתמש בהם: Display Work Center " +
          "(CR03), Display Resource (CRC3) ו-Manage Work Centers (F6175); לפי הסניפט מרכזי עבודה יכולים להיות " +
          "מכונות, אנשים, קווי ייצור וקבוצות בעלי מלאכה, ובתעשיות תהליכיות (PP-PI) המשאב (Resource) הוא אמצעי " +
          "הייצור והאנשים המעורבים בייצור.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת CRHD",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "העשרה מאומתת במאגר: CRHD היא כותרת מרכז העבודה / המשאב עם מפתח MANDT/OBJTY/OBJID (‏OBJTY 'A' למרכז עבודה " +
          "או משאב) ושדות ARBPL‏, WERKS‏, VERWE‏, VGWTS; קיבולת דרך CRCA אל KAKO, מרכז עלות דרך CRCO, טקסטים " +
          "ב-CRTX, מפעל WERKS אל T001W; פעולות (AFVC) מפנות אליה דרך ARBID = OBJID עם OBJTY = 'A'; מרכז עבודה " +
          "דיסקרטי ומשאב PP-PI חולקים את אותה טבלה ומובחנים בקטגוריה.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#CRHD",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "CRHD נמנית בסט S4_STABLE של המאגר, טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA (verified, low " +
          "risk, ללא שינוי מודל), לצד CRTX‏, AFVC‏, PLPO ו-AUFK.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת CRHD, כותרת מרכז העבודה והמשאב, פעילה ב-S/4HANA On-Premise (עדכני ל-2025 FPS01) וללא טבלה חליפית: " +
        "אובייקט הארכוב PP_WKC מונה אותה כנתוני כותרת מרכז העבודה, אובייקט ההגירה PP - Work center קורא ממנה " +
        "ישירות, ותצוגת ה-CDS הרשמית I_WorkCenterBySemanticKey (‏VDM, 2023 Latest) שולפת ממנה את נתוני האב. הטבלה " +
        "משותפת לתחזוקת מפעל (מרכז העבודה הראשי והמבצע בהזמנת האחזקה), לייצור דיסקרטי ולמשאבים בתעשיות תהליכיות; " +
        "שני ה-blueprints של הפרויקט (PM ו-PP-PI) פוסקים 'ללא שינוי' והראיות הרשמיות מאשרות זאת.",
      edition: "on-premise",
      release: "2025.001",
      source: CRHD_WKC_ARCHIVING,
      recommendedAction:
        "להמשיך להשתמש ב-CRHD ככותרת מרכז העבודה והמשאב; אין פעולת הסבה נדרשת לטבלה עצמה, ומומלץ Regression Test " +
        "להתאמות אישיות שקוראות אותה (JOIN עם AFVC/PLPO דרך ARBID = OBJID ו-OBJTY = 'A'). לצריכה אנליטית ולפיתוח " +
        "חדש להעדיף את תצוגות ה-CDS הרשמיות (I_WorkCenter‏, I_WorkCenterBySemanticKey‏, I_WorkCenterText) על פני " +
        "SELECT ישיר. בממשק המשתמש: Manage Work Centers (F6175) לצד CR01/CR02/CR03, CRC1/CRC3 למשאבי תעשיות " +
        "תהליכיות ו-IR01/IR02/IR03 בתחזוקת מפעל. ליצירה ועדכון בממשקים קיים OData API בשם Work Center " +
        "(API_WORK_CENTERS) בתיעוד APIs for Manufacturing; ראו הערות, השירות אינו מצוטט כראיה ברשומה זו.",
    },
    xrefs: [
      "table:CRTX", "table:CRCA", "table:CRCO", "table:KAKO", "table:AFVC", "table:PLPO", "cds:I_WorkCenter",
      "cds:I_WorkCenterText", "cds:I_WorkCenterCostCenter", "tx:CR01", "tx:CR02", "tx:CR03", "tx:CRC1",
      "tx:CRC3", "tx:IR01", "fm:CR_WORKCENTER_READ", "fm:CRAP_WORKCENTER_GET_DETAIL", "fiori:F3289",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "ארבע ראיות רשמיות מתוך רשומות החיפוש של help.sap.com (scripts/sap-help-search.mjs, loio + versionId " +
      "הועתקו כלשונם): מסמך הארכוב PP_WKC (2025.001, loio 1770bd53), אובייקט ההגירה PP - Work center (2025.001, " +
      "loio 70a186f1), תצוגת ה-VDM‏ Work Center by Semantic Key (2023.latest, loio fdbddc4b) ועמוד ההגירה Work " +
      "center/Resource (2025.001, loio d1c46c79). גוף דפי ה-Help הוא מעטפת JavaScript ולכן כל טענה תחומה בכותרת " +
      "ובסניפט; חיבור ה-MCP למערכת חיה נכשל בסשן, ורשימת השדות המלאה של CRHD לא אומתה מול SE11. עמוד ה-VDM של " +
      "I_WorkCenter עצמו (2023 Latest, loio c90e05a792674f7d8bbae247c5200999: Technical Name I_WorkCenter, " +
      "Basic, Dimension, Released) אינו נוקב ב-CRHD בסניפט, ולכן הקישור לטבלה מצוטט דרך תצוגת המפתח הסמנטי; " +
      "עמוד ה-What's New לגרסת 2025 (loio 21cd2fa6d9dd4855a02f7edc83dcfe22) מונה את I_WorkCenter בטבלת CDS " +
      "Views Changed for Basic Work Center Data. I_WorkCenterBySemanticKey אינה ב-xrefs כי אין לה מזהה בדאטהסט. " +
      "הקשר תחזוקת מפעל: עמוד Work Center בתיעוד Maintenance Management (2025.001, loio " +
      "4e366afdf7604bc9b25f39b4aff05cb2) מגדיר מרכז עבודה ראשי (ברמת כותרת הזמנת האחזקה) ומרכז עבודה מתחזק " +
      "(ראשי או מבצע) בלי לנקוב בשם הטבלה; IR01/IR02/IR03 מופיעות בתיעוד 2025.001 בעמוד Logistics Work Centers " +
      "for Force Elements/Positions (deliverable: Defense Forces & Public Security, loio " +
      "07cfcc5340487214e10000000a174cb4); בתיעוד Maintenance Management לא נמצא עמוד הנוקב בקודי הטרנזקציה " +
      "האלה, והשיוך לתחזוקת מפעל נסמך על ה-blueprint של PM (s4AltTcode) ועל הדאטהסט. הקשר תעשיות תהליכיות: עמוד " +
      "Resource (PP-PI-MD) בתיעוד Production Planning and Control (2025.001, loio " +
      "ec81bf53f106b44ce10000000a174cb4) קובע 'In PP-PI, resources perform the same function as work centers do " +
      "in PP'. Fiori: ה-blueprint של PM רשם 'Manage Work Centers (אמת ID)'; העמוד הרשמי נוקב במזהה F6175, " +
      "וחיפוש מוגבל דומיין החזיר את דף הספרייה " +
      "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F6175 (כותרת Manage Work " +
      "Centers); F6175 אינו ב-data/fiori/apps.ts ולכן אינו ב-xrefs, ופרטי תפקידים ו-OData שלו לא אומתו. " +
      "fiori:F3289 (Manage Work Center Capacity) קיים בדאטהסט ומונה את CRHD כטבלה קשורה; טענת המאגר שהיישום " +
      "תומך רק במרכזי עבודה של PP ולא של PM היא רשומת מאגר שלא אומתה רשמית. API: עמוד What's New 2021 (loio " +
      "abb8f6a759924372b850ebdd0a7c4a11) מציג OData API Work Center (API_WORK_CENTERS) לקריאה, יצירה ועדכון של " +
      "מרכזי עבודה, ותיעוד APIs for Manufacturing לגרסת 2025.001 מציג עמוד Work Center (loio " +
      "d01ff746f7934178ac5c84b15778b05d) ו-Create Work Center (loio 7c4401ed25bb4653862f8141e3839b89); רשימת " +
      "הישויות והפרמטרים לא אומתה. חיפושים רשמיים ל-Simplification ול-deprecation של מרכז עבודה / משאב " +
      "(PP-BD-WKC) לא החזירו פריט פישוט או הודעת הוצאה משימוש, ולכן 'ללא שינוי' ללא יורש. אי-התאמות במאגר: " +
      "ה-blueprint של PP-PI רושם ל-CRHD‏ descriptionEn 'Object type (A=work center)' (שם השדה OBJTY הועתק לשם " +
      "הטבלה) בעוד השם הרשמי הוא Work center header; שני ה-blueprints נוקבים במודולי פונקציה שונים לקריאה (PM‏: " +
      "CR_WORKCENTER_READ, PP-PI‏: CR_WORK_CENTER_READ), שניהם קיימים כמזהים בדאטהסט ואף אחד מהם לא אומת מול " +
      "מערכת חיה. הפאסט של PM (data/pm-master-data-facets.ts#CRHD) מצטט SAP KBA 3030584 לקטגוריה 0005; ה-KBA " +
      "דורש כניסת S-user ולא אומת, ולכן אינו רשום כראיה. עמוד PEO (loio af6e3f8459b540babf7a9f44435e5ebf) מזכיר " +
      "את CRHD כאובייקט סיווג לסוג מחלקה 019, הקשר בלבד. tx:IR02 ו-tx:IR03 אינם ב-xrefs: הקודים קיימים במניפסט " +
      "הטרנזקציות של הדאטהסט אך אין להם דף באפליקציה, ולכן נזכרים בטקסט בלבד (tx:IR01 נשאר).",
  },

  /* -------------------------------------------------------- table:CRTX */
  {
    id: "table:CRTX",
    evidence: [
      CRTX_WKC_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center Text | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/add9ad94e7be47f2822099e9622b94b6.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "קיים CDS View בשם Work Center Text (שם טכני: I_WorkCenterText, כנקוב בסניפט) מסוג 'Basic, Text' במעמד " +
          "'Release Status Released'. התכונות שהוא מספק לפי הסניפט: 'Work center type', 'Work center internal ID', " +
          "'Language', 'Name of the work center'; תנאי מוקדם הוא הרשאת תצוגת מרכזי עבודה לפי מפעל (C_ARPL_WRK) ולפי " +
          "קטגוריה (C_ARPL_ART), והתצוגה משמשת כ-association בתצוגה צורכת (שמה נקטע בסניפט). הסניפט אינו נוקב בשם " +
          "הטבלה CRTX; ההתאמה לשדות OBJTY/OBJID/SPRAS/KTEXT נגזרת מנתוני הפרויקט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Description | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/d7e461f51ddb453982763d5abadf2852.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד APIs for Manufacturing לגרסת 2025 FPS01 מציג ישות Description של ה-API למרכז עבודה: 'This entity " +
          "provides the langauge dependent short texts of the work centers' (כך במקור). בין המאפיינים הנקובים " +
          "בסניפט: WorkCenterInternalID ('Object ID of the resource'), Language ('Language key'), WorkCenterDesc " +
          "('Work center text'), WorkCenter, Plant, WorkCenterCategoryCode, WorkCenterLastChangeDateTime. הסניפט " +
          "אינו נוקב בשם הטבלה CRTX.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work center/Resource | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/d1c46c79ab034062a3ded5bb8ab3e79f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההעברה Work center/Resource בתיעוד Data Migration לגרסת 2025 FPS01 כולל גיליון Work Center " +
          "Description ומנחה: 'Enter a language for the Work Center Description. The default is the logon " +
          "language'. לאימות הנתונים לאחר ההעברה הוא מפנה ל-'Display Work Center (CR03)', 'Display Resource (CRC3)' " +
          "ולאפליקציה 'Manage Work Centers (F6175)'; מזהה האפליקציה F6175 נקוב בסניפט הרשמי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת CRTX",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "העשרה מאומתת במאגר: CRTX היא טבלת טקסט תלוית שפה המשלימה את CRHD; מפתח MANDT/OBJTY/OBJID/SPRAS, שדה " +
          "הטקסט KTEXT, OBJTY='A' למרכז עבודה; תיאור ריק בשפה מסוימת פירושו שאין שורת CRTX לאותה SPRAS. שני " +
          "ה-blueprints פוסקים ללא שינוי (PM: 'ללא שינוי (תואם)', PP-PI: 'ללא שינוי.'); פסיקות ה-blueprint נקראו " +
          "מ-data/sapData.pm.ts ו-data/sapData.pppi.ts (רשומות PM:CRTX ו-PP-PI:CRTX).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#CRTX",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טקסטים קצרים של מרכז עבודה או משאב לפי שפה. הטבלה נמנית בשמה במסמך הארכוב של PP-BD-WKC לגרסת 2025 FPS01, " +
        "תצוגת ה-CDS המשוחררת I_WorkCenterText חושפת נתונים תואמים במבנה (סוג אובייקט, מזהה פנימי, שפה, שם; " +
        "ההצמדה ל-CRTX לפי data/cds-map.ts), וקיימת ישות API ייעודית לתיאורי מרכז עבודה.",
      edition: "on-premise",
      release: "2025.001",
      source: CRTX_WKC_ARCHIVING,
      recommendedAction:
        "לאשר את פסיקת שני ה-blueprints (ללא שינוי) כמאומתת: CRTX נשארת טבלה פעילה ב-S/4HANA On-Premise עד 2025 " +
        "FPS01, ללא טבלה יורשת. לקריאה אנליטית ולפיתוח חדש להעדיף את CDS View‏ I_WorkCenterText (תלוי שפה) על פני " +
        "SELECT ישיר; לממשקים חיצוניים לשקול את ישות Description ב-API של מרכז העבודה. לסגור את הערת ה-blueprint " +
        "'Manage Work Centers (אמת ID)': המזהה F6175 נקוב בתיעוד ההעברה הרשמי, אך האפליקציה עדיין אינה רשומה " +
        "בקטלוג ה-Fiori של הפרויקט ולכן אין קישור אליה.",
    },
    xrefs: [
      "table:CRHD", "table:CRCA", "table:CRCO", "table:KAKO", "cds:I_WorkCenterText", "cds:I_WorkCenter",
      "tx:CR01", "tx:CR02", "tx:CR03", "tx:IR01", "tx:CRC1", "tx:CRC2", "tx:CRC3", "fm:CR_TEXT_READ",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "לפני רשומה זו האפליקציה הציגה מעמד נגזר בלבד (blueprint: ללא שינוי) ברמת 'מאומת מול נתוני הפרויקט', עומק " +
      "L1 וללא מקורות. ארבע נקודות עיגון רשמיות: מסמך הארכוב של PP-BD-WKC (2025.001) הוא היחיד שנוקב בשם CRTX " +
      "במפורש; סניפטי ה-VDM, ה-API ותיעוד ההעברה אינם מזכירים את שם הטבלה, וההצמדה שלהם ל-CRTX נשענת על מפת " +
      "ה-CDS של הפרויקט (data/cds-map.ts: I_WorkCenterText מעל CRTX) ועל התאמת המבנה (סוג אובייקט, מזהה פנימי, " +
      "שפה, שם מול OBJTY/OBJID/SPRAS/KTEXT), כלומר הסקה ולא ציטוט. גוף עמודי ה-Help לא נקרא (מעטפת JavaScript); " +
      "כל טענה תחומה לכותרת ולסניפט של רשומת החיפוש. לא נמצא בחיפוש הציבורי SAP Note, KBA או Simplification " +
      "Item הנוקבים ב-CRTX, ולא הוקלד אף מספר. לא בוצעה בדיקה במערכת SAP חיה (ה-MCP לא התחבר), ולכן רשימת השדות " +
      "ואורכיהן נשארת ברמת המאגר. מזהה ה-Fiori‏ F6175 (Manage Work Centers) נקוב בסניפט רשמי של help.sap.com " +
      "בלבד (ספריית האפליקציות לא נקראה, מעטפת JavaScript), ואינו קיים ב-data/fiori/apps.ts ולכן לא נוסף " +
      "כ-xref; רשומת fiori:F6175 היא משימה נפרדת. פער בנתוני המקור: שורת ה-PP-PI ב-blueprint נושאת " +
      "descriptionEn 'Object type' וכן BAPI ותוכניות של חומר (BAPI_MATERIAL_SAVEDATA, RMMG2000, MM60) שאינם " +
      "שייכים לטבלת טקסט של מרכז עבודה; שורת ה-PM אינה מונה את OBJTY במפתח. שניהם נשארים כפי שהם (הקובץ מיוצר) " +
      "ומסומנים כאן כפער תיעוד. רשומות רשמיות נוספות שנמצאו ולא צורפו (מגבלת ארבע ראיות): 'CDS Views for Basic " +
      "Work Center Data' ב-What's New 2025 (versionId 2025.000, loio 21cd2fa6d9dd4855a02f7edc83dcfe22) המונה את " +
      "I_WorkCenterText; 'Creating a Short Text Description of the Work Center in Different Languages' ב-Work " +
      "Centers (PP-BD-WKC) 2025.001 (loio b673b65334e6b54ce10000000a174cb4). tx:IR02 ו-tx:IR03 אינם ב-xrefs: " +
      "הקודים קיימים במניפסט הטרנזקציות של הדאטהסט אך אין להם דף באפליקציה, ולכן נזכרים בטקסט בלבד (tx:IR01 " +
      "נשאר).",
  },

  /* -------------------------------------------------------- table:STKO */
  {
    id: "table:STKO",
    evidence: [
      STKO_BOM_CHANGE_DOCS,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving PP-BOMs (PP-BD-BOM) | Data Archiving in Production Planning and Control (PP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/0570bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט הארכוב של עצי מוצר (PP-BD-BOM) ב-2025 FPS01 מונה את STKO בתיאור 'BOM header' לצד טבלאות השיוך " +
          "MAST‏ (Material BOM assignment), EQST‏ (Equipment BOM assignment), TPST‏ (Functional location BOM " +
          "assignment), KDST ו-DOST, וכן STAS‏ ('BOMs - choice of items') ו-STPU‏ ('BOM subitem').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Takeover/Handover of Technical Objects Improvements | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/a1adeaa81c5140e1b211805bdb87f4fc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "בתחזוקת מפעל, נתוני כותרת עץ מוצר של ציוד נרשמים בטבלאות EQST ו-STKO: העמוד (2025 FPS01) מתאר ציוד 'for " +
          "which equipment BOM header data was not entered in database tables EQST and STKO', ומסביר שציוד-על הופך " +
          "לכותרת BOM כאשר מוכנס תחתיו פריט BOM חדש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Bill of Material | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/e46cc75700eebc38e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תצוגת ה-CDS‏ I_BillOfMaterial‏ (View Type: Basic) 'can determine a valid Bill of Material (BOM) header " +
          "based on the requested BOM keys and expose BOM Header attributes'; בין המאפיינים: BillOfMaterial‏ (מספר " +
          "BOM), BillOfMaterialVariant‏ (חלופה), BillOfMaterialVariantUsage‏ (שימוש), HeaderValidityStartDate " +
          "ו-EngineeringChangeDocument. רשומת החיפוש אינה נוקבת בטבלת STKO ואינה מציגה Release Status.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת STKO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: STKO היא כותרת עץ המוצר עם מפתח MANDT/STLTY/STLNR/STLAL, כמות בסיס BMENG וסטטוס " +
          "STLST; השיוך לחומר ולמפעל דרך MAST והפריטים ב-STPO.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#STKO",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל משני הבלופרינטים, רשומות PM:STKO ו-PP-PI:STKO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "STKO מופיעה בשני הבלופרינטים: ב-PM (רשומת PM:STKO, 'BOM header', טרנזקציות IB01/CS01 ו-CS02/CS03, הערת " +
          "S/4: 'ללא שינוי (תואם)') עם קשרי ER אל STPO‏, MAST‏, EQST ו-TPST דרך STLNR, וב-PP-PI (רשומת PP-PI:STKO, " +
          "נושא 'עץ מוצר (BOM)') עם קשרים אל MAST‏, STPO‏ (STLNR+STLTY), STAS ו-STZU.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#STKO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "STKO נמנית בסט S4_STABLE של המאגר יחד עם STPO ו-MAST; lib/s4.ts גוזר ממנו 'ללא שינוי מהותי ב-S/4HANA: " +
          "הטבלה נשמרת (תואם)' בסיכון נמוך וברמת אמון verified.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת STKO (כותרת עץ מוצר) פעילה ומתועדת ב-S/4HANA On-Premise עד 2025 FPS01 וללא טבלה חליפית: תיעוד " +
        "LO-MD-BOM קובע שנתוני כותרת ה-BOM נשמרים ב-STKO ופריטי ה-BOM ב-STPO, אובייקט הארכוב PP-BD-BOM מונה אותה " +
        "כ-'BOM header', ותיעוד תחזוקת מפעל מתאר כתיבת כותרת BOM של ציוד ל-EQST ול-STKO. הכותרת משותפת לעצי מוצר " +
        "של חומר, ציוד ומיקום פונקציונלי, כלומר לייצור, לתעשיות תהליכיות ולתחזוקת מפעל.",
      edition: "on-premise",
      release: "2025.001",
      source: STKO_BOM_CHANGE_DOCS,
      recommendedAction:
        "להמשיך לעבוד מול STKO ככותרת ה-BOM המשותפת לייצור, לתעשיות תהליכיות ולתחזוקת מפעל; אין פעולת הסבה נדרשת " +
        "לטבלה עצמה. לפיתוח חדש ולצריכה אנליטית מומלץ לקרוא דרך תצוגות ה-CDS‏ I_BillOfMaterial (כותרת) " +
        "ו-I_BillOfMaterialItem (פריטים) ולא בגישה ישירה לטבלה. בבדיקות המעבר יש לוודא פיצוץ BOM, חלופות (STLAL) " +
        "ותוקף מול MAST ו-STAS, ובתחזוקת מפעל גם את השיוך דרך EQST ו-TPST.",
    },
    xrefs: [
      "table:MAST", "table:STPO", "table:STAS", "table:STPU", "table:STZU", "table:EQST", "table:TPST",
      "tx:CS01", "tx:CS02", "tx:CS03", "tx:IB01", "tx:IB11", "fm:CSAP_MAT_BOM_READ",
      "fm:CSAP_MAT_BOM_MAINTAIN", "fm:CS_BT_BOM_HEADER_READ", "fm:BAPI_MATERIAL_BOM_GROUP_CREATE",
      "cds:I_BillOfMaterial", "cds:I_BillOfMaterialItem",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "ארבע רשומות חיפוש רשמיות (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE) מזכירות את STKO בשמה " +
      "או מתארות את כותרת ה-BOM: 'Displaying Change Documents' (LO-MD-BOM, 2025 FPS01) הוא המקור לסטטוס כי הוא " +
      "היחיד שקובע במילים מפורשות שנתוני כותרת ה-BOM נשמרים ב-STKO; 'Archiving PP-BOMs' (2025 FPS01) מונה אותה " +
      "במבנה אובייקט הארכוב; 'Takeover/Handover of Technical Objects Improvements' (2025 FPS01) מאשר את השימוש " +
      "בתחזוקת מפעל (EQST + STKO). אף מקור רשמי אינו נוקב ביורשת, בהוצאה משימוש או בפריט פישוט לטבלה, ולכן 'ללא " +
      "שינוי' בלי יורשת. ה-loio וה-versionId הועתקו כלשונם מרשומות החיפוש; ארבעת ה-URL של הראיות, ושני עמודי " +
      "ה-API הנזכרים בהערה זו, נבדקו חי ב-2026-09-07 והחזירו HTTP 200. עמוד ה-VDM של I_BillOfMaterial מאונדקס " +
      "ב-2023.latest בלבד (הכתובת עם version=2025.001 מחזירה 200 אך לא מופיעה באינדקס), ולכן צוטט " +
      "ב-2023.latest; הרשומה אינה נוקבת ב-STKO ואינה מציגה Release Status, כך שהקשר בין התצוגה לטבלה נשען על " +
      "נתוני המאגר בלבד (data/cds-map.ts, data/cds-enrichment.ts) ולא נטען סטטוס 'קיים API משוחרר'. סניפט " +
      "הארכוב כותב 'STOP BOM items', ככל הנראה שגיאת כתיב של STPO בעמוד המקורי; חלק זה לא צוטט. פערים: פירוט " +
      "שדות DDIC‏ (SE11) לא אומת מול מערכת חיה (חיבור sc4sap נכשל) ונשאר ברמת אימות המאגר; לא צוטט מספר SAP " +
      "Note כי אף אחד לא הופיע בסניפטים או בנתוני מאגר מאומתים; המאגר נוקב ב-'Manage Bills of Material (F1814)' " +
      "(data/solutions.ts, data/centers/fiori.ts) אך המזהה אינו ב-data/fiori/apps.ts ולא אומת מול ספריית Fiori, " +
      "ולכן אין xref ל-Fiori; רשומות החיפוש נוקבות גם באפליקציות F6863 (Mass Maintenance of Bills of Material " +
      "Headers) ו-F6578 (Mass Maintenance of Bills of Material Items) ובעמודי API רשמיים ('Bill of Material | " +
      "APIs for Product Lifecycle Management', ישות MaterialBOM של API_BILL_OF_MATERIAL_SRV;v=2, loio " +
      "474346711c1e4bfcbdec6035de1d65db; 'Operations for Maintenance Bill of Material', API_MAINTENANCEBOM, " +
      "loio ec31096ce7a14d36be3f4130b7637671, מאונדקס ב-2023.latest), אך הם אינם ב-xrefs ולא צורפו כראיות כדי " +
      "לשמור על גבולות הרשומה של הטבלה. הבלופרינט של PM מציין 'Manage Bills of Material (אמת ID)', כלומר מזהה " +
      "ה-Fiori פתוח גם במקור. סתירה פנימית קלה במאגר: עמודת התיאור האנגלי של הבלופרינט PP-PI כותבת 'BOM " +
      "category' עבור STKO (וגם עבור STPO), בעוד התיאור הרשמי והבלופרינט של PM הם 'BOM header'; התיאור העברי " +
      "'כותרת עץ מוצר (BOM)' נכון בשני הבלופרינטים. הבלופרינט הוא קובץ מחולל ואינו נערך ידנית, ולכן ההערה נרשמת " +
      "כאן ובתור הקטלוג בלבד.",
  },

  /* -------------------------------------------------------- table:STPO */
  {
    id: "table:STPO",
    evidence: [
      STPO_BOM_CHANGE_DOCS,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving PP-BOMs (PP-BD-BOM) | Data Archiving in Production Planning and Control (PP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/0570bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מסמך הארכוב לגרסת 2025 FPS01 (אובייקט ארכוב CS_BOM) מונה את משפחת טבלאות ה-BOM‏: MAST‏ (Material BOM " +
          "assignment), DOST‏ (Document BOM assignment), EQST‏ (Equipment BOM assignment), TPST‏ (Functional " +
          "location BOM assignment), KDST‏, STAS‏ ('BOMs - choice of items'), STKO‏ (BOM header) ו-STPU‏ (BOM " +
          "subitem); שורת 'BOM items' מופיעה בסניפט בכתיב 'STOP', ככל הנראה שגיאת כתיב במקור עבור STPO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Master Recipe Operation Component Allocation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/78088415674a4ed8b58e88dc26926163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "ב-API הרשמי של המתכון הראשי (Master Recipe) לגרסת 2025 FPS01, בהקצאת רכיב לפעולה המשתמש נדרש לספק את שדה " +
          "STVKN‏ ('Inherited node number of BOM item') מטבלת STPO‏ ('field data of STPO (i.e. BOM item) table') " +
          "לשדה BillOfMaterialItemNodeNumber של ישות Component Allocation. STPO משמשת כמקור מפתח בתהליכי תעשיות " +
          "תהליכיות (PP-PI) בגרסת 2025.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Bill of Material | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/ec31096ce7a14d36be3f4130b7637671.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "ה-API הרשמי Maintenance Bill of Material‏ (APIs for Maintenance Management, תחזוקת מפעל) מציע לפי הסניפט " +
          "את הפעולות 'Read Maintenance BOM entities' ו-'Read Maintenance BOM Item' דרך GET‏ " +
          "/sap/opu/odata/SAP/API_MAINTENANCEBOM/BOMItem(BillOfMaterial='…').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט - רשומת STPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת (verified, מקורות SE11 ו-SAP Help LO-MD-BOM): STPO היא פריט עץ המוצר עם מפתח " +
          "MANDT/STLTY/STLNR/STLKN; רכיב IDNRK→MARA, כמות MENGE, קטגוריית פריט POSTP‏ (L/N/T/R); הכותרת ב-STKO; " +
          "POSNR הוא מספר הפריט המוצג ו-STLKN המפתח הפנימי.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#STPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) - הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "STPO נמנית בסט S4_STABLE של המאגר, לצד STKO ו-MAST: טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות " +
          "ב-S/4HANA (verified, low risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint המחולל של הפרויקט - רשומות PM:STPO ו-PP-PI:STPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "שני ה-blueprints מסווגים את STPO 'ללא שינוי': PM‏ ('ללא שינוי (תואם)', טבלה חליפית 'STPO (זהה)') " +
          "ו-PP-PI‏ ('ללא שינוי; IDNRK מורחב 18->40'). הערת אורך השדה IDNRK קיימת במאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#STPO + data/sapData.pppi.ts#STPO",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת STPO (פריטי עץ מוצר) פעילה ומתועדת ב-S/4HANA On-Premise עד 2025 FPS01 וללא טבלה חליפית: תיעוד " +
        "LO-MD-BOM נוקב בה כטבלת נתוני פריט ה-BOM, מסמך הארכוב CS_BOM מונה את משפחת הטבלאות שלה, ה-API הרשמי של " +
        "ה-BOM לתחזוקת מפעל (2023.latest) קורא פריטי BOM, וה-API של המתכון הראשי (2025 FPS01) מקבל את מספר הצומת " +
        "STVKN מטבלת STPO. הטבלה משותפת לתחזוקת מפעל (BOM לציוד ולמיקום פונקציונלי דרך EQST/TPST) ולתעשיות " +
        "תהליכיות (BOM לחומר דרך MAST).",
      edition: "on-premise",
      release: "2025.001",
      source: STPO_BOM_CHANGE_DOCS,
      recommendedAction:
        "להמשיך להשתמש ב-STPO כטבלת פריטי ה-BOM; אין פעולת הסבה ייעודית לטבלה עצמה. לבדוק קוד מותאם שמניח אורך 18 " +
        "תווים בשדה הרכיב IDNRK (הערת ה-blueprint על הרחבה ל-40 לא אומתה מול תיעוד רשמי ברמת השדה). לצריכה חדשה " +
        "להעדיף את תצוגת ה-CDS‏ I_BillOfMaterialItem ואת ה-API הרשמיים (Maintenance Bill of Material לתחזוקת " +
        "מפעל, Bills of Material גרסה 2 ל-BOM חומר) על פני SELECT ישיר.",
    },
    xrefs: [
      "table:STKO", "table:MAST", "table:STAS", "table:STPU", "table:EQST", "table:TPST", "table:KDST",
      "tx:CS01", "tx:CS02", "tx:CS03", "cds:I_BillOfMaterialItem", "fm:CSAP_BOM_ITEM_MAINTAIN",
      "fm:BAPI_MATERIAL_BOM_GROUP_CREATE", "enh:exit:PCSD0002",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "שש ריצות של scripts/sap-help-search.mjs ב-2026-09-07 מציגות את STPO בעקביות כטבלת פריטי ה-BOM ב-S/4HANA " +
      "2025 FPS01: עמוד LO-MD-BOM (העוגן, loio 6608c453), מסמך הארכוב CS_BOM‏ (loio 0570bd53), API המתכון הראשי " +
      "(loio 78088415) ו-API ה-BOM לתחזוקת מפעל (loio ec31096c, תיעוד 2023.latest). אף מקור רשמי אינו נוקב " +
      "ביורשת, בפריט פישוט או בהוצאה משימוש, ולכן 'ללא שינוי'. רשומות רשמיות נוספות שנראו בחיפוש ולא צוטטו: " +
      "'Example Implementation' (loio cef6f2d7, 2025.001) הממפה את השדות STPO-MENGE‏, MEINS‏, IDNRK ו-DATUV; " +
      "עמוד ה-VDM‏ 'Bill of Material Item' (I_BillOfMaterialItem, loio 1b73c757, 2023.latest) שהסניפט שלו אינו " +
      "נוקב ב-STPO, כך שהקישור תצוגה↔טבלה נשען על data/cds-map.ts בלבד; 'Operations for Bills of Material " +
      "(Version 2)' (loio ac29c058) ו-'Update BOM Item' (loio 03b5cf62) הנוקבים בשירות " +
      "API_BILL_OF_MATERIAL_SRV;v=2 ובישות MaterialBOMItem; 'OData API: Maintenance Bill of Material' (What's " +
      "New 2021, loio 8dc12d07) המתאר יצירה/קריאה/עדכון/מחיקה של כותרת ופריט BOM לחומר, לציוד ולמיקום " +
      "פונקציונלי; 'Feature Comparison for Bills of Material Apps' (loio 5e641f76) ו-'PP - Material BOM' (loio " +
      "4348363a) הנוקבים באפליקציה Maintain Bill of Material (app ID F1813) לצד CS01/CS02/CS03. פערים וסתירות: " +
      "(1) תווית ה-Fiori במאגר 'Manage Bills of Material' (table-fiori.json; ה-blueprint של PM מסמן 'אמת ID') " +
      "חסרת מזהה ואינה תואמת לשם הרשמי Maintain Bill of Material‏ (F1813); F1813 אינה ב-data/fiori/apps.ts ולכן " +
      "אין xref ל-Fiori. (2) ‏descriptionEn של PP-PI:STPO הוא 'BOM category' (העתקה שגויה) מול 'BOM Item' ב-PM " +
      "ו-'Bill of Materials Item' בתיעוד הרשמי. (3) ה-blueprint של PM מסמן POSNR כמפתח, בעוד table-enrichment " +
      "(SE11) נותן את המפתח MANDT/STLTY/STLNR/STLKN עם POSNR כמספר מוצג; רשימות השדות של שני ה-blueprints שונות " +
      "(5 מול 9). (4) הרחבת IDNRK ל-40 תווים מופיעה במאגר בלבד; העמוד הרשמי 'Extended Material Number in SAP " +
      "Fiori Apps' (2025.001) מדבר על מספר חומר עד 40 תווים באופן כללי ואינו נוקב ב-STPO-IDNRK, ולכן ההערה " +
      "נשארת ברמת המאגר. (5) סניפט הארכוב כותב 'STOP' במקום STPO. פירוט שדות DDIC לא אומת מחדש מול מערכת חיה " +
      "(חיבור sc4sap נכשל); לא צוטט מספר SAP Note כי אף אחד לא הופיע בסניפטים רשמיים; סטטוס שחרור (released) של " +
      "ה-API לא נטען כי הסניפטים אינם מציינים אותו. ביקורת אדברסרית 2026-09-07: ארבעת ה-URL ותשעת ה-loio " +
      "הנזכרים כאן אומתו מחדש מול ה-JSON של החיפוש; שלושת ה-repoRef הושוו לתוכן; 14 xrefs פותרים ב-universe; " +
      "validateRecords ללא בעיות.",
  },

  /* -------------------------------------------------------- table:MAST */
  {
    id: "table:MAST",
    evidence: [
      MAST_BOM_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Material BOM | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/4348363aafa4419986ee8839f4b27218.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה 'PP - Material BOM' (אובייקט עסקי קשור: Material BOM) מציג את השדות Material Number‏, " +
          "Plant ו-BOM Usage, מפנה לאפליקציית Maintain Bill Of Material‏ (app ID F1813), ומונה את " +
          "CNV_PE_S4_PP_MATERIAL_BOM_ECN תחת 'APIs/BAPIs Used in Migration-Specific Function Modules', כלשון " +
          "הסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Link for Bill of Material | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/b66c8522077b4eaeb0f3442045425a50.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תצוגת ה-CDS‏ I_MaterialBOMLink (סוג Basic, סטטוס Released) חושפת את קישור החומר לעץ המוצר, ובין מאפייניה " +
          "החשובים: Bill of Material Category‏, Bill of Material‏, Bill of Material Variant‏, Material‏, Plant " +
          "ו-Bill of Material Variant Usage.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extended Material Number in SAP Fiori Apps | SAP Fiori Overview",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/8aecfa1ef4914cd1bb9b9da3c9b16dbf.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "ב-S/4HANA ניתן להשתמש במספר חומר מורחב באורך מרבי של 40 תווים; כברירת מחדל מופעל מספר החומר הסטנדרטי (18 " +
          "תווים), תיבת הסימון 'Activate extended fields' אינה מסומנת והמערכת משתמשת בגרסה הקצרה של שדה מספר החומר " +
          "(למשל MATNR); הפעלת המספר המורחב היא פעולה נפרדת, כלשון הסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "חוברת ההגירה של הפרויקט - רשומת MAST בתחזוקת מפעל",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "הבלופרינט של תחזוקת מפעל (PM:MAST) פוסק 'ללא שינוי (תואם)' עם טבלה חלופית 'MAST (זהה)' וללא פעולת המרה " +
          "ייעודית ב-SUM; מסמן MATNR‏ (PK/FK), WERKS‏ (PK), STLAN‏ (PK, 'BOM usage (4=maintenance)') ו-STLNR‏ " +
          "(PK/FK) כשדות מפתח, ומקשר MAST.STLNR ל-STKO.STLNR.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#MAST",
      },
      {
        sourceType: "repository",
        sourceTitle: "חוברת ההגירה של הפרויקט - רשומת MAST בתעשיות תהליכיות",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "הבלופרינט של תעשיות תהליכיות (PP-PI:MAST) פוסק 'ללא שינוי; MATNR מורחב משפיע על המפתח ועל IDNRK'; מסמן " +
          "MATNR‏ (PK/FK), WERKS‏, STLAN ו-STLAL כ-PK ואת STLNR כ-FK בלבד, ומקשר STKO.STLNR ל-MAST.STLNR " +
          "ו-MAST.MATNR ל-MARA.MATNR.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#MAST",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט - רשומת MAST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "העשרת המאגר (מסומנת מאומתת): MAST היא שיוך עץ מוצר לחומר, הגשר הקובע איזה עץ מוצר (STLNR) חל על חומר " +
          "במפעל לשימוש נתון (STLAN); מפתח MANDT/MATNR/WERKS/STLAN/STLNR; מפתחות זרים ל-MARA‏, T001W ו-STKO.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MAST",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ההשפעה של הפרויקט - קבוצת S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "‏data/s4-impact.ts מונה את MAST בקבוצת S4_STABLE, המוגדרת בקוד כטבלאות ליבה PM/PP-PI שיציבות ב-S/4HANA " +
          "(verified, low risk).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת MAST (שיוך עץ מוצר לחומר) קיימת ומתועדת ב-S/4HANA On-Premise עד גרסת 2025 FPS01 בשמה ובתיאורה " +
        "המקוריים ('Material BOM assignment'), משמשת את אובייקט ההגירה Material BOM (שדות חומר, מפעל ושימוש) " +
        "ונחשפת במודל הנתונים הווירטואלי דרך I_MaterialBOMLink. לא נמצא מקור רשמי המסמן אותה כמוחלפת, מיושנת או " +
        "מוסרת. ההשלכה היחידה שאותרה היא ברמת השדה: הרחבת מספר החומר ל-40 תווים (הפעלה אופציונלית) חלה גם על שדה " +
        "המפתח MATNR של הטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: MAST_BOM_ARCHIVING,
      recommendedAction:
        "אין צורך בטבלה חליפית. להמשיך לעבוד מול MAST כנקודת הכניסה למציאת עץ המוצר של חומר במפעל " +
        "(MATNR+WERKS+STLAN ואז STLNR אל STKO/STPO), ולהעדיף צריכה דרך CDS‏ (I_MaterialBOMLink, I_BillOfMaterial) " +
        "או ה-API הרשמי Bills of Material היכן שנדרש ממשק. לפני ההסבה לבדוק קוד Z וממשקים המניחים MATNR באורך 18 " +
        "מול ההחלטה על הפעלת מספר החומר המורחב. ניהול שוטף ב-CS01/CS02/CS03 ובשיוך למפעל ב-CS07, או באפליקציית " +
        "Maintain Bill of Material‏ (F1813).",
    },
    xrefs: [
      "tx:CS01", "tx:CS02", "tx:CS03", "tx:CS07", "table:STKO", "table:STPO", "table:MARA", "table:MKAL",
      "table:EQST", "table:KDST", "cds:I_BillOfMaterial", "fm:CSAP_MAT_BOM_READ", "fm:CS_BOM_EXPL_MAT_RC1",
      "fm:BAPI_MATERIAL_BOM_GROUP_CREATE",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "הסטטוס נגזר מרשומות חיפוש רשמיות (SAP_S4HANA_ON-PREMISE, נשלפו ב-2026-09-07): עמוד הארכוב PP-BD-BOM " +
      "לגרסת 2025 FPS01 מונה את MAST בתיאורה המדויק, אובייקט ההגירה PP - Material BOM (2025 FPS01) עובד עם שדות " +
      "חומר/מפעל/שימוש, ותצוגת I_MaterialBOMLink מתועדת כ-Released ב-2023.latest. אף מקור רשמי לא סימן את MAST " +
      "כמוחלפת או מוסרת, ולכן 'ללא שינוי' בלי יורשת; זה גם הסטטוס שהאפליקציה גוזרת היום משני הבלופרינטים (מחלקה " +
      "0) ומ-S4_STABLE. סייגים: (1) הקישור בין I_MaterialBOMLink לטבלה MAST הוא סינתזה של הרשומה: הסניפט הרשמי " +
      "אינו נוקב ב-MAST, אלא במאפייני Material/Plant/BOM Variant Usage/Bill of Material שהם מפתח MAST לפי " +
      "רשומות המאגר; התצוגה אינה ביקום הפרויקט ולכן אינה ב-xrefs. (2) רשומת cds-enrichment של המאגר מציינת " +
      "תצוגה בשם I_BillOfMaterialItemAssgmt מעל MAST; חיפוש רשמי בשם זה (2026-09-07) לא החזיר אף נושא VDM, והשם " +
      "דורש אימות בקטלוג ה-CDS. (3) העובדה ש-MATNR הוא שדה מפתח ב-MAST נשענת על רשומות המאגר (בלופרינט, " +
      "table-enrichment) ולא על הסניפט הרשמי של מספר החומר המורחב; רשומת MARA באותה שכבה נפסקה 'משתנה' מאותה " +
      "סיבה, ואילו MAST נשארה 'ללא שינוי' כי שני הבלופרינטים פוסקים כך, S4_STABLE מונה אותה, וההרחבה אופציונלית " +
      "לפי העמוד הרשמי; שיקול פתוח לבדיקה חוזרת. (4) שם אפליקציית ה-Fiori בבלופרינט ('Manage Bills of " +
      "Material') אינו תואם לשם הרשמי 'Maintain Bill Of Material' (app ID F1813) שמופיע בסניפט של אובייקט " +
      "ההגירה PP - Material BOM; עמוד Feature Comparison for Bills of Material Apps (loio " +
      "5e641f76c48f43aea26fa0a1f698d689, 2025.001) מונה בסניפט את שם האפליקציה בלבד, ללא מזהה; הטרנזקציות " +
      "CS01/CS02/CS03/CS07/CS08/CS15 מופיעות בסניפט של עמוד התפקיד Material BOM Maintenance (loio " +
      "a076b6535fe6b74ce10000000a174cb4, 2025.001); F1813 אינו ב-data/fiori/apps.ts ולכן אינו ב-xrefs; כתובת " +
      "הספרייה הרשמית (כותרת תוצאת חיפוש רשמית): fioriappslibrary Apps('F1813')/S21OP. (5) סתירה פנימית במאגר: " +
      "הבלופרינט של תחזוקת מפעל מציין 'BOM usage (4=maintenance)' בעוד table-enrichment מציין '7=PM'; הסניפט " +
      "הרשמי של Bill of Material Usage (loio cc72b65334e6b54ce10000000a174cb4) מציין שימושים (production, " +
      "sales, maintenance) בלי קודים, ולכן אף קוד לא נטען כאן. (6) ה-descriptionEn ברשומת PP-PI:MAST ('Material " +
      "number') הוא שיבוש העתקה; התיאור הרשמי הוא 'Material BOM assignment'. בנוסף, PP-PI:MAST מסמן את STLNR " +
      "כ-FK ואת STLAL כ-PK, בעוד PM:MAST מסמן STLNR כ-PK/FK ו-STLAL ללא מפתח; פירוט המפתח המדויק דורש SE11. (7) " +
      "עמוד ה-API הרשמי Bills of Material (APIs for Product Lifecycle Management, loio " +
      "8a8b08aab6cd47f4a3e35e8bd8d86ca2, 2025.001) מונה את הישויות MaterialBOM ו-MaterialBOMItem; לא נכלל כראיה " +
      "בשל מגבלת ארבע רשומות רשמיות. (8) פירוט DDIC של השדות (סוגים ואורכים) לא אומת מול מערכת חיה (חיבור " +
      "sc4sap נכשל) ונשאר ברמת המאגר; לא צוטט מספר SAP Note או פריט פישוט כי אף אחד לא הופיע בסניפטים רשמיים או " +
      "בנתוני המאגר עבור MAST.",
  },

  /* -------------------------------------------------------- table:AFKO */
  {
    id: "table:AFKO",
    evidence: [
      AFKO_PRODORDER_VDM,
      {
        sourceType: "sap_help",
        sourceTitle: "Scenarios and Tables for Substance Volume Tracking | Product Safety and Stewardship",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ff6d35a34fbe4bea99e4ac41b0d5db03/c8a1ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "העמוד מונה לתרחיש PRODUCTION, ששורותיו בסניפט הן 'Production order' (Produced quantities from production " +
          "orders) ו-'Process order' (Produced quantities from process orders), את הטבלאות 'AUFK, AFKO, AFPO, RESB, " +
          "MKPF, MSEG' ואת השדה 'AFKO-GSTRS: Scheduled start'. זהו כיסוי רשמי של AFKO לייצור בדיד ולתעשיות תהליכיות " +
          "בגרסת 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Archiving Maintenance and Service Orders (PM-SMA-SC/PM-WOC-MO) | Data Archiving in Plant Maintenance and " +
          "Customer Service (PM/CS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/15e1b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מסמך הארכוב הרשמי של אובייקט PM_ORDER לגרסת 2025 FPS01 קובע, לגבי archiving classes P_ORDER ו-TEXT: " +
          "'Order header overall (table AUFK, AFKO)'. AFKO היא חלק מכותרת הזמנת האחזקה והשירות (תחזוקת מפעל) " +
          "ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/6dec12675da54f29a9283ace7994ca8c.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "עמוד ה-VDM של I_ManufacturingOrder‏ (סט התיעוד 2023 Latest) קובע: 'With this CDS view you can retrieve " +
          "manufacturing order header data (tables AUFK and AFKO)'. הסניפט אינו מפרט האם הזמנות תהליך נכללות במונח " +
          "manufacturing order.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת AFKO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: AFKO היא הרחבת כותרת ההזמנה להזמנות ייצור, תהליך ואחזקה, עם מפתח MANDT/AUFNR; AUFPL " +
          "מקשר לפעולות (AFVC/AFVV), GAMNG היא הכמות הכוללת ו-GSTRP/GLTRP תאריכי התזמון; PLNBEZ מפנה לחומר (MARA).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#AFKO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "AFKO נמנית בסט S4_STABLE של המאגר: טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA (verified, low " +
          "risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprints של ההגירה (PM ו-PP-PI), רשומת AFKO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "ה-blueprint של PP-PI מסמן את AFKO 'מותאם (תואם)' עם הטרנזקציות COR1/COR2/COR3/COR6N/COHVPI, וה-blueprint " +
          "של PM מסמן 'מותאם (תואם עם פישוטי תזמון)' עם s4AltTable 'AFKO (זהה)' והערת SUM: 'אין המרת טבלה הרסנית, " +
          "אך מודל הנתונים מותאם - הרץ Regression Test ובדוק User Exits/דוחות מותאמים'. שני המסמכים אינם נוקבים " +
          "בטבלה חליפית.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#AFKO (+data/sapData.pm.ts#AFKO)",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת AFKO (נתוני כותרת הזמנה) פעילה ב-S/4HANA On-Premise עד 2025 FPS01 וללא טבלה חליפית. תצוגת ה-VDM " +
        "הרשמית I_ProductionOrder קוראת ממנה את כותרת הזמנת הייצור, תיעוד SVT מונה אותה לתרחישי ייצור (הזמנות " +
        "ייצור והזמנות תהליך), ומסמך הארכוב PM_ORDER מונה 'Order header overall (table AUFK, AFKO)' להזמנות " +
        "אחזקה. אף מקור רשמי אינו נוקב ביורשת, בהוצאה משימוש או בשינוי מבני של הטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: AFKO_PRODORDER_VDM,
      recommendedAction:
        "להמשיך לעבוד מול AFKO ככותרת המורחבת של הזמנות ייצור, תהליך ואחזקה; אין פעולת הסבה לטבלה עצמה. לצריכה " +
        "אנליטית ולפיתוח חדש להעדיף תצוגות CDS רשמיות (I_ProductionOrder להזמנות ייצור, I_MaintenanceOrder " +
        "להזמנות אחזקה) על פני SELECT ישיר. בהתאם להערת ה-SUM של ה-blueprint, להריץ Regression Test על קוד מותאם, " +
        "User Exits ודוחות שקוראים AFKO ישירות, ולבדוק במערכת (SE11) האם שדות מסוג MATNR בטבלה (PLNBEZ לפי רשומת " +
        "המאגר) מושפעים מהפעלת מספר חומר מורחב.",
    },
    xrefs: [
      "table:AUFK", "table:AFPO", "table:AFVC", "table:AFIH", "table:RESB", "tx:CO01", "tx:COR1", "tx:IW32",
      "cds:I_ProductionOrder", "cds:I_MaintenanceOrder", "fm:CO_ZF_ORDER_HEADER_READ", "fiori:F2336",
      "fiori:F3577",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "ארבע רשומות חיפוש רשמיות (scripts/sap-help-search.mjs, SAP_S4HANA_ON-PREMISE, נגישות ב-2026-09-07) " +
      "מציגות את AFKO כטבלת מקור פעילה: VDM של הזמנת ייצור (2025.001), טבלאות SVT לתרחישי ייצור ותהליך " +
      "(2025.001), ארכוב PM_ORDER (2025.001) ו-VDM של Manufacturing Order (2023.latest). רק סניפטים רשמיים " +
      "שימשו לניסוח; לא נטען שום מספר SAP Note. סתירה פנימית במאגר: ה-blueprints פותחים ב-'מותאם', ולכן המפה של " +
      "האפליקציה גוזרת כיום 'משתנה ב-S/4HANA' (class 1, derivedFrom blueprint), בעוד S4_STABLE ו-s4-objects " +
      "('stays') מסמנים יציבות. אף מקור רשמי אינו נוקב בשינוי מבני, ולכן נבחר 'ללא שינוי'; הסתייגות ה-blueprint " +
      "(Regression Test, User Exits) נשמרת בפעולה המומלצת. הזמנות תהליך: לא נמצא עמוד VDM ייעודי לכותרת הזמנת " +
      "תהליך; עמודי הארכוב של PR_ORDER (Archiving Process Orders (PP-PI), loio 8b70bd534f22b44ce10000000a174cb4 " +
      "ו-8e70bd534f22b44ce10000000a174cb4) נמצאו אך הסניפטים שלהם אינם נוקבים ב-AFKO ולכן לא צוטטו. פערים: " +
      "פירוט שדות DDIC (SE11) לא אומת מול מערכת חיה (חיבור sc4sap נכשל); השפעת מספר חומר מורחב על שדות MATNR " +
      "ב-AFKO לא נתמכת באף סניפט רשמי ונשארת כבדיקה; הקישור ל-F2336/F3577 הוא ברמת המאגר (data/fiori/apps.ts, " +
      "curated); מהדורת S/4HANA Cloud Public Edition לא נבדקה.",
  },

  /* -------------------------------------------------------- table:AFPO */
  {
    id: "table:AFPO",
    evidence: [
      AFPO_PM_ORDER_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Item | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/82b728664a284a1796811c87221ae0e5.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תצוגת ה-CDS‏ I_ProductionOrderItem‏ (Production Order Item) 'retrieves production order item data (table " +
          "AFPO)'. לפי הסניפט התצוגה מייצגת את סוג האובייקט ProductionOrder (BusinessObject) ועונה על השאלות אילו " +
          "פריטים קיימים להזמנת ייצור ואיזה מוצר שייך לפריט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order Item | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/9ecb6ea8a220445aa21a0435fafca571.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תצוגת ה-CDS‏ I_ManufacturingOrderItem‏ (Manufacturing Order Item, קטגוריית נתונים אנליטית Dimension): " +
          "'With this CDS view you can retrieve manufacturing order item data (table AFPO)'. הסניפט מונה את " +
          "אובייקטי ההרשאה C_AFKO_ATY‏ (CIM: Order category) ו-C_AFKO_AWA כתנאי לשימוש בתצוגה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Fast Entry of Characteristics in Production Orders | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/58cfc353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד Production Orders (PP-SFC) לגרסת 2025 FPS01 ממפה מאפייני ייחוס אל שדות AFPO בשמם הטכני: " +
          "AFPO-MATNR‏, AFPO-DWERK‏, AFPO-PSMNG‏ (מול VBAP-KWMENG), AFPO-AMEIN‏, AFPO-UMREZ ו-AFPO-UMREN. שדות " +
          "הטבלה נקובים בתיעוד הגרסה הנוכחית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת AFPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת ההעשרה של המאגר (מסומנת verified): AFPO היא פריט ההזמנה (Order item), החומר לייצור, כמויות, אחסון " +
          "ואספקה; מפתח MANDT/AUFNR/POSNR; מפתחות זרים AUFNR אל AUFK/AFKO‏, MATNR אל MARA ו-PWERK אל T001W; הזמנת " +
          "ייצור או תהליך יכולה להכיל יותר מפריט אחד (co-products).",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#AFPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "AFPO נמנית בסט S4_STABLE של המאגר, טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA (verified, low " +
          "risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "repository",
        sourceTitle: "חוברת הבלופרינט של הפרויקט, רשומת PP-PI:AFPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת PP-PI:AFPO בבלופרינט: טרנזקציות COR2/COR3/COHVPI, יישום Manage Process Orders, פונקציות " +
          "BAPI_PROCORD_CREATE ו-BAPI_PROCORD_GET_DETAIL, s4Note 'מותאם (תואם)', descriptionEn 'Order number'; " +
          "הרשומה אינה נושאת שדה s4AltTable.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#AFPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "חוברת הבלופרינט של הפרויקט, רשומת PM:AFPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת PM:AFPO בבלופרינט: טרנזקציות IW32/IW33, שדות AUFNR/POSNR/MATNR/PSAMG, s4Note 'מותאם (תואם)', " +
          "s4AltTable 'AFPO (זהה)', פונקציה CO_ZF_ORDER_ITEM_READ, דוח RIAFPO00, fioriApp 'Find Maintenance Order " +
          "(F2393)'. אין טבלה חליפית ברשומה.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#AFPO",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת AFPO (פריט ההזמנה, Order item) פעילה ב-S/4HANA On-Premise עד גרסת 2025 FPS01 וללא טבלה חליפית: " +
        "תיעוד הארכוב של PM מונה אותה בשמה, תיעוד Production Orders (PP-SFC) של 2025 FPS01 נוקב בשדותיה, ותצוגות " +
        "ה-CDS הרשמיות I_ProductionOrderItem ו-I_ManufacturingOrderItem קוראות ממנה ישירות. בהזמנות ייצור ותהליך " +
        "היא מחזיקה את החומר המיוצר וכמויותיו; בתחזוקת מפעל קיימת רשומת AFPO רק להזמנות שיפוץ (refurbishment).",
      edition: "on-premise",
      release: "2025.001",
      source: AFPO_PM_ORDER_ARCHIVING,
      recommendedAction:
        "להמשיך לעבוד מול AFPO לפריטי הזמנות ייצור ותהליך; אין פעולת הסבה לטבלה עצמה. לצריכה אנליטית ולפיתוח חדש " +
        "להעדיף את תצוגות ה-CDS הרשמיות (I_ProductionOrderItem‏, I_ManufacturingOrderItem) ואת ישויות הפריט של " +
        "API_PRODUCTION_ORDER_2 ו-API_PROCESS_ORDER_2 על פני SELECT ישיר. בדוחות PM לא להניח פריט לכל הזמנת " +
        "אחזקה: לפי התיעוד הרשמי רשומת AFPO קיימת בהזמנות PM רק בהזמנת שיפוץ.",
    },
    xrefs: [
      "table:AUFK", "table:AFKO", "table:RESB", "table:AFVC", "cds:I_ProductionOrderItem", "fiori:F3577",
      "tx:COR1", "tx:COR2", "tx:COR3", "tx:COHVPI", "tx:CO01", "tx:IW32", "tx:IW33",
      "fm:CO_ZF_ORDER_ITEM_READ", "fm:BAPI_PROCORD_GET_DETAIL", "idoc:msg:LOIPRO",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: שמונה שאילתות ב-scripts/sap-help-search.mjs ('AFPO', 'Production Order Item Virtual Data Model', " +
      "'order item table AFPO', 'Manufacturing Order Item CDS view', 'Process Order Item CDS view AFPO', 'AFPO " +
      "simplification item', 'refurbishment order item AFPO Maintenance Management', 'I_ManufacturingOrderItem " +
      "process order business object') וחיפוש רשת מוגבל לדומיינים הרשמיים; loio ו-versionId הועתקו מרשומות " +
      "החיפוש. אף רשומה רשמית אינה נוקבת ביורשת, בפריט פישוט או בהוצאה משימוש של AFPO (החיפוש 'AFPO " +
      "simplification item' החזיר פריטים לא קשורים בלבד), ולכן 'ללא שינוי' בלי יורשת. רשומות רשמיות נוספות " +
      "שנצפו ולא צוטטו כראיה: Planned Modification (PLM, 2025.001, loio 4bdbc353b677b44ce10000000a174cb4: 'the " +
      "new material X is stored in table AFPO'); Scenarios and Tables for Substance Volume Tracking (2025.001, " +
      "loio c8a1ce5314894208e10000000a174cb4: שורת CON PRODUCTION מונה AUFK, AFKO, AFPO, RESB, MKPF, MSEG, " +
      "והעמוד כולל שורות Production order ו-Process order); Alternative Units of Measure in Production (PP-SFC, " +
      "2025.001, loio 10cec353b677b44ce10000000a174cb4); Archiving Operative Project Structures (PS, 2025.001, " +
      "loio 87d0b6531de6b64ce10000000a174cb4: AFPO ברשימת מחלקת הארכוב PS_ORDER (Order for information system) " +
      "של אובייקט הארכוב PS_PROJECT); What's New 2025 'CDS Views for Discrete Manufacturing' (2025.000, loio " +
      "4d82c97578ab4e33be28f60a2163a4c6: I_ProductionOrderItem בזמינות SAP S/4HANA Cloud Private Edition ו-SAP " +
      "S/4HANA, מגרסת 2025). הזמנות תהליך (PP-PI): אף עמוד רשמי אחד אינו נוקב ב-AFPO כטבלת הפריט של הזמנת " +
      "תהליך; הכיסוי הוא סינתזה של הרשומה מתוך I_ManufacturingOrderItem ('manufacturing order item data (table " +
      "AFPO)') יחד עם APIs for Manufacturing: 'A manufacturing order can be a production order or a process " +
      "order' (Manufacturing Order - Send (Version 2), 2025.001, loio 5ff8151a70dc4e2ca46c3c98707e3303) וישות " +
      "הפריט A_ProcessOrderItem_2 (Read Process Order Item, 2025.001, loio 2494f0c1f628402fb17be8ea1de89e3e). " +
      "גרסת הסטטוס 2025.001 נשענת על ראיות 1 ו-4; עמודי ה-VDM של הפריט הוחזרו בסט 2023 Latest בלבד. רובד המאגר: " +
      "S4_STABLE מסמן את AFPO יציבה בעוד הבלופרינט בשני המודולים כותב 'מותאם (תואם)' (שהממפה קורא כ'משתנה'); " +
      "הראיות הרשמיות תומכות ב'ללא שינוי' ברמת הטבלה, אותו מתח שנרשם ל-AUFK. descriptionEn של רשומת PP-PI:AFPO " +
      "הוא 'Order number' (שריד העתקה; השם הרשמי 'Order item', כפי שכתוב ברשומת PM:AFPO). הבלופרינט PM ממפה את " +
      "AFPO ליישום 'Find Maintenance Order (F2393)', מזהה שאין לו רשומה ב-data/fiori/apps.ts ולא נמצא במקור " +
      "רשמי, ולכן אינו ב-xrefs. שדה PSAMG מתויג בבלופרינט PM 'Order item quantity', בעוד רשומת Alternative " +
      "Units of Measure in Production (PP-SFC, 2025.001, loio 10cec353b677b44ce10000000a174cb4) מזכירה PSAMG " +
      "לצד 'Scrap quantity of item' בטבלה קטועה, ותיעוד Fast Entry (loio 58cfc353b677b44ce10000000a174cb4) ממפה " +
      "את כמות ההזמנה VBAP-KWMENG אל AFPO-PSMNG; משמעות PSAMG נשארת לאימות ב-SE11. פירוט שדות DDIC לא אומת מול " +
      "מערכת חיה (חיבור sc4sap נכשל). עמוד הארכוב מפנה ל-SAP Note ללא מספר בסניפט, ולכן לא נרשם מספר. גופי " +
      "העמודים ב-help.sap.com לא נקראו (מעטפת JavaScript); כל טענה תחומה בכותרת ובסניפט.",
  },

  /* -------------------------------------------------------- table:JEST */
  {
    id: "table:JEST",
    evidence: [
      JEST_CU_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Release Production Order | Enterprise Services in Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/1dad2180e6f34b75ac77afce5cb5eda1/8a2c66d088a511dd2b8d000f20fcb6a9.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "התיעוד קובע במפורש: 'In the SAP S/4HANA system, the information retrieved in the StatusObject are stored " +
          "in the tables JEST, JSTO, TJ20T, TJ30T, TJ02, TJ02T and view CAUFV'; ה-StatusObject מכיל את סטטוסי " +
          "המערכת והמשתמש של הזמנת הייצור לאחר שינוי הסטטוס.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Specify Periods for Sales Document Selection | Accounting and Financial Close",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8fbeed5f2046489696a50ac7fd76f9c6/f88f8853317643cd96bdf1e850f90d5e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "בתיעוד 2025 FPS01 פריטים בעלי מספר אובייקט נבחרים 'using system status management (table JEST)' ולא לפי " +
          "סטטוס העיבוד הכולל VBUP-GBSTA: אישור רשמי ש-JEST היא טבלת ניהול סטטוס המערכת גם ב-S/4HANA העדכני.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Status Management | Technical Objects (CS-BD/PM-EQM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/3c78ba53422bb54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "הקשר תפקודי בלבד (העמוד אינו נוקב בשם הטבלה): ניהול הסטטוס הכללי משמש את האובייקטים העסקיים של תחזוקת " +
          "מפעל, 'technical objects, orders, notifications', ומבחין בין שני סוגי סטטוס: System Status ו-User " +
          "Status.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת JEST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: JEST היא טבלת סטטוס האובייקט הבודד עם מפתח MANDT/OBJNR/STAT, מחוון INACT לסטטוס לא " +
          "פעיל, וקישורים ל-JSTO (כותרת אובייקט הסטטוס), ל-TJ02T (טקסט סטטוס מערכת I####) ול-TJ30T (טקסט סטטוס " +
          "משתמש E####); OBJNR מקשר לאובייקטים כגון AUFK‏, EQUI ו-QMEL.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#JEST",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "JEST נמנית בסט S4_STABLE של המאגר: טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA (verified, low " +
          "risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprints של הפרויקט, רשומות PM:JEST ו-PP-PI:JEST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "ה-blueprint של PM (נושא 8 ניהול סטטוסים) פוסק לטבלה 'ללא שינוי (תואם)' עם טבלה חליפית 'JEST (זהה)', " +
          "טרנזקציות 'BS22/BS23 (זהה)' והערת SUM: אין פעולת המרה ייעודית לטבלה; ה-blueprint של PP-PI (נושא 7) פוסק " +
          "'ללא שינוי; ניהול סטטוס זהה ב-S/4' ללא שדות טבלה חליפית או SUM.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#JEST + data/sapData.pppi.ts#JEST",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת JEST, סטטוס אובייקט בודד (Individual Object Status), פעילה ב-S/4HANA On-Premise (עדכני ל-2025 " +
        "FPS01) וללא טבלה חליפית. תיעוד Maintenance Management ממשיך למנות אותה ברשימת הטבלאות של אובייקטי הארכוב " +
        "שלו יחד עם JSTO ו-ONR00, ותיעוד השירותים הארגוניים קובע שסטטוסי המערכת והמשתמש של הזמנות ייצור נשמרים " +
        "ב-JEST/JSTO ב-S/4HANA. זו טבלה משותפת לכל אובייקטי ניהול הסטטוס (הזמנות אחזקה ותהליך, הודעות, ציוד, " +
        "מיקומים פונקציונליים).",
      edition: "on-premise",
      release: "2025.001",
      source: JEST_CU_ARCHIVING,
      recommendedAction:
        "להמשיך לקרוא סטטוסים לפי OBJNR ב-JEST (סינון INACT ריק לסטטוסים פעילים) או דרך פונקציות ניהול הסטטוס " +
        "STATUS_READ ו-STATUS_CHANGE_EXTERN; אין פעולת הסבה לטבלה עצמה. לא לעדכן שורות JEST ישירות. לפיתוח חדש " +
        "ולצריכה אנליטית להעדיף תצוגת CDS לסטטוס אובייקט, בכפוף לאימות שמה במערכת היעד (ראו הערות).",
    },
    xrefs: [
      "table:JSTO", "table:TJ02T", "table:TJ30", "table:TJ30T", "table:AUFK", "table:EQUI", "table:QMEL",
      "fm:STATUS_READ", "fm:STATUS_CHANGE_EXTERN", "cds:I_ObjectStatus",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "שמונה וריאציות חיפוש ב-scripts/sap-help-search.mjs (JEST table status, Individual Object Status JEST, " +
      "general status management, I_ObjectStatus, PM_ORDER/PM_EQUI archiving, simplification, VDM object " +
      "status, JEST JSTO ONR00) מציגות את JEST בעקביות בשם 'Individual Object Status' בתיעוד 2025 FPS01: ארכוב " +
      "Maintenance Management (גם Archiving Construction Measures, loio 9e825fa8; ב-Archiving Compatible Unit " +
      "Designs, loio 0f8cb1a1, הסניפט קטוע ומציג רק 'JEST Individual object link' לצד JSTO), ארכוב Engineering, " +
      "Construction & Operations (loio 32f2c353, שם גם JCDS 'Change documents for system or user statuses " +
      "(Table JEST)' ו-DJEST), וגיליון המידע להעברת הזמנות פנימיות ב-CO (loio 1c42de53: 'Relevant tables AUFK, " +
      "ONR0, JSTO, JEST, COBRA, COBRD'). אף מקור רשמי אינו נוקב ביורשת, בפריט פישוט או בהוצאה משימוש, ולכן 'ללא " +
      "שינוי'. ראיית Enterprise Services (Release Production Order) זמינה בחיפוש לגרסת 2023.latest בלבד. תצוגת " +
      "ה-CDS‏ I_ObjectStatus לא אותרה באף רשומה רשמית (חיפוש help.sap.com ו-WebSearch על api.sap.com); היא " +
      "נשארת ידע מאגר בלבד (cds-map, cds-enrichment) וה-xref נשמר לניווט, לא כראיה. סוגי ואורכי השדות (OBJNR " +
      "CHAR 22, STAT CHAR 5, INACT CHAR 1, CHGNR CHAR 6) מקורם ב-blueprint של PP-PI בלבד; ה-blueprint של PM " +
      "אינו מציין סוג/אורך, ולא אומתו מול SE11 (אין מערכת חיה). אי-התאמה קטנה במקור: רשומת PP-PI:JEST נושאת " +
      "descriptionEn 'Object number' (שם השדה) במקום 'Individual Object Status'; לתקן בחוברת המקור, לא " +
      "ב-sapData. לא נטען שום מספר SAP Note. רק סניפטים רשמיים שימשו לניסוח. tx:BS22 ו-tx:BS23 אינם ב-xrefs: " +
      "הקודים קיימים במניפסט הטרנזקציות של הדאטהסט אך אין להם דף באפליקציה, ולכן נזכרים בטקסט בלבד.",
  },

  /* -------------------------------------------------------- table:JSTO */
  {
    id: "table:JSTO",
    aliases: ["jsto"],
    evidence: [
      JSTO_CU_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving | Engineering, Construction, & Operations",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/d8a0a3e61bc4435aab60b86ccc43da1f/32f2c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד הארכוב לגרסת 2025 FPS01 מונה את משפחת טבלאות הסטטוס בשמותיהן הרשמיים: 'JSTO Status object " +
          "information', 'DJEST Individual status per object: key date based management', 'JCDO Change documents " +
          "for status object (Table JSTO)' ו-'JCDS Change documents for system or user statuses (Table JEST)'; " +
          "הסניפט פותח ב-'Individual object status' מיד לפני JSTO, ו-JEST נזכרת בו בשם רק כ-'(Table JEST)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Information Sheet for the Transfer of Internal Orders | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/1c42de531ed3424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "דף המידע להעברת הזמנות פנימיות (CO) לגרסת 2025 FPS01 מונה תחת 'Relevant tables' את AUFK, ONR0, JSTO, " +
          "JEST, COBRA ו-COBRD ואת מסד הנתונים הלוגי OKD; הסניפט מונה שמות טבלאות בלבד, ללא תיאורים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Status Management | Technical Objects (CS-BD/PM-EQM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/3c78ba53422bb54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד תחזוקת מפעל לגרסת 2025 FPS01 קובע שניהול הסטטוסים הכללי משמש את האובייקטים העסקיים ב-PM (אובייקטים " +
          "טכניים, הזמנות, הודעות), ומונה את הצעדים 'Define the user statuses within this status profile' ו-'Assign " +
          "the status profile', כשפרופיל הסטטוס מתוחזק ב-Customizing של Plant Maintenance. הסניפט אינו נוקב בשם " +
          "הטבלה JSTO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת JSTO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת (verified): JSTO מחזיקה לכל מספר אובייקט OBJNR את פרופיל הסטטוס STSMA, עם מפתח ראשי " +
          "MANDT + OBJNR; OBJNR מגיע מהאובייקט העסקי (AUFK / QMEL / EQUI) ו-STSMA מפנה לפרופיל הסטטוס (הרשומה כותבת " +
          "TJ20/TJ30). JEST מחזיקה את הסטטוסים הפעילים תחת אותו OBJNR; בלי STSMA ב-JSTO אין סטטוסי משתמש לאובייקט.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#JSTO",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PM), רשומת JSTO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "ה-blueprint של PM מתעד את JSTO עם ארבעה שדות ללא טיפוס ואורך: OBJNR (PK), STSMA (FK), OBTYP ו-CHGKZ; " +
          "מסמן s4Note 'ללא שינוי (תואם)' ו-s4AltTable 'JSTO (זהה)', טרנזקציות BS02/BS03 ו-OIBS, קשרי OBJNR " +
          "ל-IFLOT, EQUI, QMEL ו-AUFK (1:1, AUFK כאב) ול-JEST (N:1) וקשר STSMA ל-TJ30.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#JSTO",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של הפרויקט (PP-PI), רשומת JSTO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "ה-blueprint של PP-PI מתעד את אותם ארבעה שדות עם טיפוס ואורך: OBJNR (PK, CHAR 22), STSMA (FK, CHAR 8), " +
          "OBTYP (CHAR 2) ו-CHGKZ (CHAR 1); מסמן 'ללא שינוי.' עם טרנזקציות BS02 ו-BS22 וצירוף FROM JSTO JOIN AUFK " +
          "ON JSTO.OBJNR = AUFK.OBJNR (JSTO כאב של AUFK).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#JSTO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "JSTO נמנית בסט S4_STABLE של המאגר לצד JEST ו-AUFK: טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA " +
          "(verified, low risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת JSTO (Status Object Information), כותרת אובייקט הסטטוס שמחזיקה לכל OBJNR את פרופיל הסטטוס STSMA, " +
        "ממשיכה להופיע בתיעוד SAP S/4HANA On-Premise 2025 FPS01: ברשימת הטבלאות של אובייקטי ארכוב בתחום " +
        "Maintenance Management, בדף ההעברה של הזמנות פנימיות ב-CO (לצד AUFK ו-JEST) ובמשפחת טבלאות הסטטוס JEST / " +
        "JSTO / DJEST / JCDO / JCDS. אף מקור רשמי שנמצא אינו נוקב בטבלה חליפית, בפריט פישוט או בהוצאה משימוש, " +
        "ושני ה-blueprints של הפרויקט (PM ו-PP-PI) מסמנים 'ללא שינוי'.",
      edition: "on-premise",
      release: "2025.001",
      source: JSTO_CU_ARCHIVING,
      recommendedAction:
        "להמשיך לקרוא את פרופיל הסטטוס דרך JSTO-STSMA ואת הסטטוסים הפעילים דרך JEST לפי אותו OBJNR; אין פעולת " +
        "הסבה ייעודית לטבלה עצמה. בהסבה לוודא שפרופילי הסטטוס (BS02) והקצאתם לסוגי הזמנה, הודעה ואובייקט טכני " +
        "הועברו כ-Customizing, ולהריץ בדיקת רגרסיה על סטטוסי משתמש בתחזוקת מפעל ובתעשיות תהליכיות. לפיתוח חדש " +
        "לשקול קריאה דרך פונקציות STATUS_READ / STATUS_PROFILE_READ או תצוגת ה-CDS I_ObjectStatus במקום גישה " +
        "ישירה לטבלה (מיפוי התצוגה ל-JSTO מתועד במאגר בלבד).",
    },
    xrefs: [
      "table:JEST", "table:AUFK", "table:QMEL", "table:EQUI", "table:IFLOT", "table:TJ30", "table:TJ30T",
      "tx:OIBS", "fm:STATUS_OBJECT_CREATE", "fm:STATUS_PROFILE_READ", "fm:STATUS_READ", "cds:I_ObjectStatus",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "שמונה ריצות של scripts/sap-help-search.mjs ב-2026-09-07 מציגות את JSTO בעקביות בתיעוד 2025 FPS01 (RE-FX, " +
      "EC&O, Maintenance Management: Compatible Units, Compatible Unit Designs ו-Construction Measures, " +
      "PLM-WUI, דף ההעברה של CO). אף עמוד What's New או Simplification שנמצא אינו נוקב ב-JSTO, ולכן 'ללא שינוי' " +
      "נשען על נוכחות מתמשכת בתיעוד ועל היעדר כל אזכור ליורשת, בדומה לרשומת AUFK. רשימת השדות (OBJNR, STSMA, " +
      "OBTYP, CHGKZ) מגיעה משני ה-blueprints, והטיפוסים והאורכים מה-blueprint של PP-PI בלבד; גוף עמודי ה-Help " +
      "אינו נקרא ולא נעשתה בדיקה במערכת חיה (ה-MCP של sc4sap לא התחבר). עמודי הארכוב של הודעות (PM_QMEL, " +
      "SM_QMEL) מציגים בסניפט 'JEST, JESTO Status': 'JESTO' כפי שמודפס אינו JSTO ולא שימש כראיה; סניפטי " +
      "PM_ORDER, PR_ORDER, PM_EQUI ו-PM_IFLOT לא הציגו את JSTO. סתירות פנימיות במאגר שלא הוכרעו: " +
      "table-enrichment כותב STSMA → TJ20/TJ30 בעוד ה-blueprint מצרף ל-TJ30 בלבד ו-TJ20 אינו אובייקט מתועד " +
      "בדאטהסט; קשר AUFK↔JSTO מסומן contested ב-ERD כי שני ה-blueprints רושמים כיוונים הפוכים; descriptionEn של " +
      "PP-PI ('Object number') הוא כנראה שריד העתקה מול 'Status object header + profile' ב-PM ומול השם הרשמי " +
      "'Status object information'. מיפוי I_ObjectStatus ל-JEST/JSTO קיים ב-data/cds-map.ts בלבד; לא נמצא עמוד " +
      "VDM רשמי לתצוגה באינדקס החיפוש. עומק הרשומה נשאר L1 כי ל-JSTO ארבעה שדות מתועדים מול סף של חמישה לקטלוג " +
      "הטבלאות; זה פער ב-blueprint ולא ברשומת האימות. tx:BS02 ו-tx:BS22 אינם ב-xrefs: הקודים קיימים במניפסט " +
      "הטרנזקציות של הדאטהסט אך אין להם דף באפליקציה, ולכן נזכרים בטקסט בלבד (tx:OIBS נשאר).",
  },

  /* -------------------------------------------------------- table:PLKO */
  {
    id: "table:PLKO",
    evidence: [
      PLKO_PM_PLAN_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Routings (PP-BD-RTG) | Data Archiving in Production Planning and Control (PP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/3270bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מסמך הארכוב של ניתובים (PP-BD-RTG) לגרסת 2025 FPS01, שהגדרתו היא 'Archiving object PP_PLAN for the " +
          "archiving of routings', מונה את PLKO בשמה 'Routing header' בראש רשימת הטבלאות המאורכבות, לצד PLKZ‏, " +
          "MAPL‏ (Material/routing assignments), PLFL‏ (Sequences) ו-PLPO‏ (Operations); בסניפט, המשפט המקדים " +
          "לרשימה נוקב כלשונו באובייקט PI_PLAN בעוד ההגדרה והשימוש נוקבים ב-PP_PLAN; ניתוב בודד מזוהה לפי קבוצת " +
          "רשימה ומונה קבוצה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Master Recipes (PP-PI-MD) | Data Archiving in Production Planning and Control (PP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/c36fbd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מסמך הארכוב של מתכוני אב בתעשיות תהליכיות (PP-PI-MD) לגרסת 2025 FPS01 מונה את PLKO בשמה 'Recipe header' " +
          "בין טבלאות אובייקט הארכוב PI_PLAN, לצד PLKZ ו-MAPL‏ (Material-recipe assignment); לבחירת מתכוני אב יש " +
          "להזין סוג רשימת פעולות 2 (Master Recipe).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Bill Of Operations Change State | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/8c9e297fe19b48f29f6310045e66eecc.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תצוגת ה-CDS‏ I_MfgBillOfOperationsChgSt‏ (Data Category: Basic, Dimension; Status: Released) שולפת נתוני " +
          "כותרת של מצב השינוי מטבלת PLKO‏: 'retrieve header data of the change state (table PLKO) for a " +
          "manufacturing bill of operations (routing/recipe)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט - רשומת PLKO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: PLKO היא כותרת רשימת הפעולות המשותפת ל-Routing‏, Master Recipe ורשימת פעולות אחזקה; " +
          "מפתח MANDT/PLNTY/PLNNR/PLNAL; ערכי PLNTY במאגר: N = Routing‏, 2 = Master Recipe‏, A/E = אחזקה/ייחוס; " +
          "פעולות ב-PLPO, שיוך חומר דרך MAPL, שימוש VERWE וסטטוס STATU.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#PLKO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) - הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "PLKO נמנית בסט S4_STABLE של המאגר יחד עם PLPO ו-MAPL, טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות " +
          "ב-S/4HANA (verified, low risk); שני הבלופרינטים (PM נושא 11, PP-PI נושא 3) פוסקים 'ללא שינוי'.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת PLKO, כותרת רשימת הפעולות, פעילה ב-S/4HANA On-Premise (עדכני ל-2025 FPS01) ואף מקור רשמי שנצפה אינו " +
        "נוקב בטבלה חליפית. התיעוד הרשמי מאשר את שלוש הקריאות של הטבלה המשותפת: כותרת רשימת פעולות אחזקה " +
        "(PM_PLAN, תחזוקת מפעל), כותרת ניתוב (PP_PLAN, ניתובים PP-BD-RTG) וכותרת מתכון אב (PI_PLAN, תעשיות " +
        "תהליכיות, סוג רשימה 2). תצוגת CDS משוחררת (I_MfgBillOfOperationsChgSt) קוראת ממנה ישירות.",
      edition: "on-premise",
      release: "2025.001",
      source: PLKO_PM_PLAN_ARCHIVING,
      recommendedAction:
        "אין פעולת הסבה נדרשת לטבלה עצמה; להמשיך לעבוד מול PLKO ככותרת רשימת הפעולות בכל שלושת הסוגים, ולסנן בכל " +
        "שאילתה לפי PLNTY‏ (A רשימת אחזקה, N ניתוב, 2 מתכון אב) כי הטבלה משותפת. לצריכה אנליטית ולפיתוח חדש מומלץ " +
        "לקרוא דרך תצוגות CDS רשמיות (I_MfgBillOfOperationsChgSt, שאומתה ברשומה זו; I_Routing קיימת בדאטהסט אך " +
        "סטטוס השחרור שלה לא אומת רשמית ברשומה זו) במקום גישה ישירה. לפני ארכוב יש להשתמש באובייקט הנכון לסוג " +
        "הרשימה: PM_PLAN‏, PP_PLAN או PI_PLAN.",
    },
    xrefs: [
      "table:PLPO", "table:MAPL", "table:PLAS", "table:MPOS", "table:MKAL", "tx:IA05", "tx:CA01", "tx:C201",
      "cds:I_Routing", "fm:BAPI_TASKLIST_CREATE", "fm:CP_RECIPE_READ",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "ארבע ריצות של scripts/sap-help-search.mjs‏ (2026-09-07) מציגות את PLKO בעקביות בשלושה מסמכי ארכוב רשמיים " +
      "של S/4HANA 2025 FPS01 ובתיעוד ה-VDM ‏(2023): הקריאה של PM‏ ('Task list header', PM_PLAN), הקריאה של PP‏ " +
      "('Routing header', PP_PLAN) והקריאה של PP-PI‏ ('Recipe header', PI_PLAN, סוג רשימה 2) נתמכות כולן " +
      "במקורות רשמיים, ולכן הרשומה שומרת את שלושתן. אף מקור רשמי אינו נוקב ביורשת או בהוצאה משימוש, ולכן 'ללא " +
      "שינוי' בלי יורשת; פסיקת הבלופרינט 'ללא שינוי (תואם)' עולה בקנה אחד עם הראיות הרשמיות. רשומות חיפוש " +
      "רשמיות נוספות שנצפו ולא צוטטו כראיות (מוגבל לארבע): אובייקטי ההגירה PM - General maintenance task list " +
      "‏(loio d24a211c, סוג רשימה A דרך PLKZ-PLNTY, דגל מחיקה PLKO-LOEKZ), PP - Routing ‏(loio 00d3d72c, " +
      "'automatically selects all routing groups from the PLKO table', סוג N), PP - Master Recipe ‏(loio " +
      "d76e8b38, סוג 2) ו-QM - Inspection plan ‏(loio a43c09d7, סוג Q, בוחר תוכניות בדיקה מ-PLKO); עמוד Routing " +
      "בתיעוד Retail ‏(loio 4dc26654) ועמוד Master Recipe ב-Logistics - General ‏(loio 2b92b215) המתארים רשומת " +
      "PLKO חדשה עם מונה פנימי ZAEHL בשינוי לפי מספר שינוי; ותיעוד APIs for Maintenance Management (Operations " +
      "for Maintenance Task List, loio 1488eb75) ו-What's New 2025 FPS01 ‏(loio 790420b9) ל-OData API‏ " +
      "API_MAINTENANCETASKLIST‏ (V4). הערך 'PP - Routing (Deprecated)' בחיפוש הוא וריאנט הגירה של AFS שהוצא " +
      "משימוש, לא הטבלה. פערים: ערכי PLNTY‏ E ו-T (הבלופרינט של PM: 'Task list type (A/E/T)') מופיעים במאגר " +
      "בלבד ולא בסניפט רשמי, ומשמעותם לא אומתה; פירוט שדות DDIC‏ (SE11) לא אומת מול מערכת חיה (חיבור sc4sap " +
      "נכשל); לא צוטט מספר SAP Note. הסניפט הרשמי של What's New 2025 FPS01 ‏(loio 7a685c0f) נוקב באפליקציות " +
      "Find Maintenance Task List ‏(F2660) ו-Find Maintenance Task List and Operation ‏(F2661) ובאפליקציות Web " +
      "Dynpro‏ Create Task List / Change Task List ‏(W0021), אך אף מזהה מהם אינו קיים ב-data/fiori/apps.ts ולכן " +
      "אין xref; גם cds:I_MfgBillOfOperationsChgSt ו-table:PLKZ אינם ביקום של הדאטהסט. סתירות פנימיות במאגר: " +
      "הבלופרינט של PM מתאר את PLKO 'כותרת רשימת פעולות (Routing)' בעוד הקריאה של PM היא רשימת פעולות אחזקה; " +
      "descriptionEn של רשומת PP-PI הוא 'Task list type (2=recipe)' (תיאור שדה שהועתק כתיאור טבלה).",
  },

  /* -------------------------------------------------------- table:PLPO */
  {
    id: "table:PLPO",
    evidence: [
      PLPO_PM_PLAN_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Master Recipes (PP-PI-MD) | Data Archiving in Production Planning and Control (PP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e82623f79ddd475aa181ef4a17f0a5f2/c36fbd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד הארכוב של מתכוני אב (אובייקט ארכוב PI_PLAN, סוג רשימה 2 Master Recipe) בגרסת 2025 FPS01 מונה את " +
          "PLPO בין הטבלאות שנתוניהן מאורכבים, כלשון קטע החיפוש הרשמי: 'PLFL Sequences PLPO Operations and phases " +
          "PLAS Assignment of operations to sequences PLMZ Material component assignments', יחד עם 'PLKO Recipe " +
          "header' ו-'MAPL Material-recipe assignment'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Editing Configurable Master Recipes | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/8cf5bb53707db44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "בתיעוד מתכוני אב הניתנים לקונפיגורציה (תעשיות תהליכיות, 2025 FPS01) PLPO מופיעה בטבלת 'recipe tables' " +
          "שניתן לשנות באמצעות reference characteristics, עם התוכן 'Operations, phases, and secondary resources'; " +
          "קטע החיפוש הרשמי מציג 'PLPO Operations, phases, and secondary resources Standard' ונקטע אחרי המילה " +
          "'Standard' בעמודת הערכים הניתנים לשינוי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Bill of Operations: Suboperation Change State | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/a74c950059aa42ccb8f9ed8dd9462778.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "תצוגת ה-CDS I_MfgBOOSubOperationChgSt במודל הנתונים הווירטואלי (Data Category Composite, Dimension; " +
          "Status Released) שולפת נתוני מצב שינוי של תת-פעולה (routing או recipe) של ה-Manufacturing Bill of " +
          "Operations מהטבלאות PLPO ו-PLAS, כלשון קטע החיפוש: '(tables PLPO, PLAS)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PM (נושא 11, אחזקה מונעת ותוכניות) - רשומת PLPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "הבלופרינט של תחזוקת מפעל מסווג את PLPO 'ללא שינוי (תואם)' עם s4AltTable 'PLPO (זהה)', טרנזקציות " +
          "IA01/IA05; IA06, פונקציה CP_DI_OPERATION_READ, דוח RIPLKO00, ויחסי ER: PLPO.PLNNR = PLKO.PLNNR (כותרת) " +
          "ו-PLPO.ARBID = CRHD.OBJID (מרכז עבודה).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PLPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PP-PI (נושא 3, מתכון ייצור ופעולות) - רשומת PLPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "הבלופרינט של תעשיות תהליכיות מסווג את PLPO 'ללא שינוי; ביצוע דרך Control Recipe / PI sheet', טרנזקציות " +
          "C201, C202, C203, CA02, מפתח PLNTY/PLNNR/PLNKN ושדות VORNR, ARBID, STEUS, LTXA1, VGW01, VGW02; קשרים " +
          "ל-PLAS, PLMZ, PLMK, FHMI, TC60 ו-TC22.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#PLPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט - רשומת PLPO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: PLPO היא פעולה ברשימת פעולות (Routing / Master Recipe / רשימת אחזקה) עם מפתח " +
          "MANDT/PLNTY/PLNNR/PLNKN, מפתחות זרים PLKO (כותרת), CRHD דרך ARBID ו-T430 דרך STEUS, וערכי סטנדרט " +
          "VGW01-06 המזינים תזמון ותמחיר.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#PLPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) - הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "PLPO נמנית בסט S4_STABLE של המאגר: טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA (verified, low " +
          "risk), כדי שהממשק יציג 'ללא שינוי' במקום 'נדרש אימות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת PLPO (פעולות ברשימת הפעולות) פעילה ומתועדת ב-S/4HANA On-Premise עד 2025 FPS01 ללא טבלה חליפית: היא " +
        "נמנית בטבלאות הארכוב של רשימות פעולות אחזקה (PM_PLAN) ושל מתכוני אב (PI_PLAN), מתוארת בתיעוד מתכוני האב " +
        "כ'Operations, phases, and secondary resources', ומשמשת טבלת מקור (יחד עם PLAS) לתצוגת CDS משוחררת של " +
        "ה-Manufacturing Bill of Operations.",
      edition: "on-premise",
      release: "2025.001",
      source: PLPO_PM_PLAN_ARCHIVING,
      recommendedAction:
        "אין פעולת הסבה לטבלה עצמה. להמשיך לעבוד מול PLPO לפעולות ופאזות של רשימות פעולות אחזקה, מסלולים ומתכוני " +
        "אב. בפיתוח חדש ובאנליטיקה להעדיף צריכה דרך תצוגות ה-CDS המתועדות רשמית של ה-Manufacturing Bill of " +
        "Operations (I_MfgBOOSubOperationChgSt מעל PLPO ו-PLAS; I_MfgBillOfOperationsOperation מעל PLAS) במקום " +
        "גישה ישירה לטבלה; המיפוי I_RoutingOperation מעל PLPO הוא מיפוי של המאגר (data/cds-map.ts) שלא נמצא לו " +
        "עמוד רשמי ב-help.sap.com, ולכן יש לאמתו ב-ADT/SE11 לפני שמסתמכים עליו. לאחר ההמרה לבצע Regression Test " +
        "להתאמות אישיות הקוראות PLPO ישירות. בתרחישי PEO לזכור שמסלולי רצפת ייצור נשמרים באובייקט הנפרד PLPOV, " +
        "ו-PLPO נשארת טבלת מסלולי התכנון.",
    },
    xrefs: [
      "table:PLKO", "table:PLAS", "table:CRHD", "table:MAPL", "table:PLMZ", "table:PLMK", "table:PLFL",
      "table:FHMI", "table:TC60", "table:TC22", "table:AFVC", "tx:IA05", "tx:IA06", "tx:CA02", "tx:C201",
      "tx:C202", "tx:C203", "fm:CP_DI_OPERATION_READ", "fm:BAPI_ROUTING_GETDETAIL", "cds:I_RoutingOperation",
      "cds:I_Routing",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "הסטטוס 'ללא שינוי' נגזר מרצפי חיפוש של scripts/sap-help-search.mjs (מוצר SAP_S4HANA_ON-PREMISE, " +
      "2026-09-07, כולל אימות חוזר של loio ו-versionId בביקורת האדוורסרית באותו יום): PLPO נקובה בשמה בעמודי " +
      "הארכוב של רשימות פעולות אחזקה (PM_PLAN), מסלולים (PP_PLAN, loio 3270bd534f22b44ce10000000a174cb4, 'PLPO " +
      "Operations'), מתכוני אב (PI_PLAN) ורשתות סטנדרט של PS (PS_PLAN, loio 1f09c453f57eb44ce10000000a174cb4, " +
      "'PLPO Activities') בגרסת 2025 FPS01, וכן בדפי המידע של QM על העברת תוכניות בדיקה וסטים של פעולות ייחוס " +
      "('Main tables PLKO, MAPL, PLNFL, PLAS, PLPO, PLFH, PLMZ, PLMK'; loio 8067b65334e6b54ce10000000a174cb4 " +
      "ו-7a67b65334e6b54ce10000000a174cb4). אף רשומה רשמית לא נוקבת ביורשת, בהוצאה משימוש או בפריט פישוט עבור " +
      "PLPO; חיפוש 'Simplification task list routing PLPO' לא החזיר פריט פישוט. גוף העמודים הוא מעטפת " +
      "JavaScript ולא נקרא; כל טענה מוגבלת לכותרת ולקטע החיפוש של הרשומה. רשומות רשמיות נוספות שלא נכנסו " +
      "לראיות: עמוד PEO 'How to Create a Production Data Structure (PDS) with Alternative Modes' (loio " +
      "af6e3f8459b540babf7a9f44435e5ebf, 2025.001) מבחין בין 'PLPOV (for shop floor routings)' ל-'PLPO (for " +
      "planning routings)', כלומר ב-PEO מסלולי רצפת ייצור נשמרים באובייקט נפרד ו-PLPO נשארת טבלת מסלולי התכנון; " +
      "אין בכך החלפה של PLPO. עמוד LO-VC 'Changing Master Data with Dependencies' (loio " +
      "4d63b6531de6b64ce10000000a174cb4) מציג את המבנה PLPOD עם 'Standard values (VGW01-06)' ו-'Activity types " +
      "(LAR01-06)'; עמוד PLM 'Reference Characteristics' (loio 756b6881f3cc4a948e6e31fdd0a30f40) מתאר את PLPO " +
      "בשם 'Routing Item'. במודל הנתונים הווירטואלי (2023.latest) קיימים גם 'Manufacturing Bill Of Operations " +
      "Change State' (I_MfgBillOfOperationsChgSt, מעל PLKO), 'Manufacturing Bill of Operations Operation Change " +
      "State' (I_MfgBOOOperationChangeState, loio fdaab9107154461ab2f39d7a7426b6d7; קטע החיפוש אינו נוקב ב-PLPO " +
      "ולכן לא צוטט) ו-'Manufacturing Bill Of Operations Operation - BOM Item Change State' " +
      "(I_MfgBOOOpBOMItemChangeState, מעל PLMZ); שם תצוגת ה-CDS של רשומת תת-הפעולה (ראיה 4), " +
      "I_MfgBOOSubOperationChgSt, מופיע בקטע החיפוש שהוחזר באימות החוזר של 2026-09-07; מתועדת גם 'Manufacturing " +
      "Bill Of Operations Operation' (I_MfgBillOfOperationsOperation, loio dac9192d15f04901b3e92f979831f7ed, " +
      "2025.001, 'data (table PLAS)'). תצוגת I_RoutingOperation שבהמלצה קיימת רק במיפוי המאגר (data/cds-map.ts, " +
      "data/cds-enrichment.ts); חיפוש רשמי בשם התצוגה לא החזיר עמוד help.sap.com, ולכן אינה מוצגת כתצוגה רשמית. " +
      "What's New 2025 'CDS Views for Basic Routing Data' (loio 0321ee78cf3248329069729161d5cb39) מונה תצוגות " +
      "DEX למסלולי ייצור בלי לנקוב ב-PLPO ולכן לא צוטט. הבלופרינט של PP-PI רושם ל-PLPO descriptionEn 'Task list " +
      "type' (זו כותרת השדה PLNTY, החלקה של עמודה בחוברת); התיאור העברי 'פעולות ברשימת הפעולות' " +
      "ו-table-titles.json נכונים, והתיקון שייך לחוברת ולא לשכבת האימות. אפליקציות ה-Fiori שהבלופרינטים מציינים " +
      "('Manage Task Lists (אמת ID)', 'Manage Master Recipes') חסרות מזהה ואינן ב-data/fiori/apps.ts, ולכן אין " +
      "xref ל-Fiori. פירוט שדות DDIC (SE11) לא אומת מחדש מול מערכת חיה (חיבור sc4sap נכשל) ונשאר ברמת אימות " +
      "המאגר; לא צוטט מספר SAP Note. מהדורת הענן הציבורית לא נחקרה; הרשומה מוגבלת ל-On-Premise / Private " +
      "Edition. תעשיות תהליכיות: ראיות 2 ו-3 מכסות במפורש פאזות ומשאבים משניים במתכון האב.",
  },

  /* ------------------------------------------------------ table:BUT000 */
  {
    id: "table:BUT000",
    evidence: [
      BUT000_BP_APPROACH,
      {
        sourceType: "sap_help",
        sourceTitle:
          "Conversion Guide for SAP S/4HANA 2025 (PDF, Document Version 2.0, 2026-02-25), 3.10 List of " +
          "Application-Specific Preparations",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025",
        url: "https://help.sap.com/doc/2b87656c4eee4284a5eb8976c0fe88fc/2025/en-US/CONV_OP2025.pdf",
        accessedAt: DATE3,
        claim:
          "מדריך ההמרה הרשמי ל-SAP S/4HANA 2025 (נקרא בטקסט המלא של הקובץ) מונה בטבלת ההכנות הייעודיות ליישום את " +
          "השורה 'Enterprise Technology | Information Governance: Business Partner Approach | SAP Note 2265093', " +
          "ומציין שהרשימה המלאה של פריטי ההמרה נמצאת ב-Simplification Item Catalog.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Relevant Tables for the Business Partner Conversion | Business Partner for Financial Services",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6d31005aa10649649041a0b205f5f4f7/2cf9c5536a51204be10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "טבלת המיפוי הרשמית (2025 FPS01) מונה את BUT000 כטבלת ה-SAP Business Partner לתוכן 'General data I', לצד " +
          "BUT001 ‏('General data II'), BUT020 ‏('BP: Addresses'), BUT100 ‏('BP roles') ו-BUT0BK ‏('BP: Bank " +
          "details').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customer/Vendor Integration | Transportation Management (TM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e3dc5400c1cc41d1bc0ae0e7fd9aa5a2/88888e7ec620464aa9531333c40ae71a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "'In SAP S/4HANA the business partner is the central object to hold partner data'; ‏'Customer/Vendor " +
          "Integration (CVI) creates customer master data or vendor master data, if required, based on a business " +
          "partner'. רשומות אב הלקוח והספק נוצרות ב-S/4HANA, במידת הצורך, מתוך השותף העסקי דרך CVI; ב-S/4HANA שותף " +
          "עסקי זמין לטיפול בנתוני לקוח או ספק (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business partner | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/61bca3e722954443b88eee2839e41610.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה הרשמי 'Business partner' (Data Migration, 2025 FPS01) מציג את אפליקציית ה-Fiori‏ 'Manage " +
          "Business Partner Master Data (app ID F3163)' ולצדה את השם CMD_MIG_BP_CVI_CREATE, רכיב AP-MD-BP, סוג " +
          "אובייקט 'Master data' והגדרה 'A person, organization, or group of people' (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט שנגזר מחוברות ההגירה: רשומות BUT000 ב-PM (נושא 9) וב-PP-PI (נושא 7)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        sapNote: "2265093",
        claim:
          "חוברת PM מסמנת את BUT000 'הוחלף - Business Partner מחליף ספקים/לקוחות (CVI חובה)' עם s4AltTcode ‏'BP " +
          "(מחליף XK01/MK01)', s4AltTable ‏'BUT000 + LFA1 (View תאימות); ספק PM דרך BP', הערת SUM 'נדרש CVI והמרת " +
          "ספקים/לקוחות ל-Business Partner לפני/במהלך ההמרה (Pre-check חובה)', Fiori ‏'Manage Business Partner " +
          "Master Data (אמת ID)' ויחס EBAN.FLIEF = BUT000.PARTNER; חוברת PP-PI: 'הוחלף - Business Partner חובה " +
          "(CVI); ראה SAP Note 2265093' עם helpLbl ‏'SAP Note 2265093 (BP)'. שדות בשתי החוברות: PARTNER ‏(PK), " +
          "TYPE‏, BU_GROUP‏, BPKIND‏, NAME_ORG1.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#BUT000 (SAP Note 2265093 in s4Note/helpLbl); data/sapData.pm.ts#BUT000",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת BUT000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת ההעשרה (verified) מתארת את BUT000 כטבלת האב של ה-Business Partner (מפתח MANDT + PARTNER; קטגוריה, " +
          "שמות ונתוני זיהוי), קובעת שב-S/4HANA ה-BP הוא נקודת הכניסה היחידה ללקוח/ספק (Customer-Vendor " +
          "Integration) ושהטבלאות KNA1/LFA1 'עדיין קיימות ומסונכרנות', ומפנה ל-MDS_LOAD_COCKPIT לבדיקת סנכרון BP " +
          "מול לקוח/ספק.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#BUT000",
      },
    ],
    status: {
      status: "simplified",
      he:
        "טבלת נתוני האב הכלליים של השותף העסקי (Business Partner: General data I). הטבלה מופיעה בתיעוד S/4HANA " +
        "On-Premise 2025 FPS01 כטבלת ה-SAP Business Partner הנוכחית לתוכן 'General data I' (עמוד Relevant Tables " +
        "for the Business Partner Conversion), ולא נמצא מקור רשמי המסמן אותה כמוחלפת; השינוי הרלוונטי להמרה הוא " +
        "פריט הפישוט 'Business Partner Approach' (Information Governance, SAP Note 2265093): רק לקוחות עם " +
        "Customer/Supplier Integration פעיל יכולים לעבור ל-S/4HANA, וכל הלקוחות, הספקים ואנשי הקשר שלהם חייבים " +
        "להיות מומרים לשותף עסקי לפני ההמרה.",
      edition: "on-premise",
      release: "2025.001",
      source: BUT000_BP_APPROACH,
      recommendedAction:
        "להריץ SI-Check / SAP Readiness Check ולטפל בפריט 'Business Partner Approach' לפני ההמרה: להגדיר CVI " +
        "ולהמיר את כל הלקוחות, הספקים ואנשי הקשר לשותף עסקי; לקרוא את פריט הפישוט (SAP Note 2265093, דורש S-user; " +
        "גוף ההערה לא נקרא בפרויקט) ולבצע את בדיקות הקוד המותאם שמדריך ההמרה ל-2025 מפנה אליהן לצד ה-SI-Check. " +
        "בתחזוקת מפעל ובתעשיות תהליכיות: ספקים בדרישות רכש (EBAN.FLIEF) ובהזמנות רכש מנוהלים דרך BP בתפקיד ספק; " +
        "לתחזוקה שוטפת טרנזקציה BP כנקודת כניסה יחידה ואפליקציית Fiori F3163 ‏(Manage Business Partner Master " +
        "Data).",
    },
    xrefs: [
      "tx:BP", "table:KNA1", "table:EBAN", "fm:BAPI_BUPA_CREATE_FROM_DATA", "fm:CVI_VENDOR_TO_BP_CONVERT",
      "tx:XK01", "tx:XD01",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "הסטטוס 'פריט פישוט' מעוגן בעמוד Business Partner Approach הרשמי (2025 FPS01) ובמדריך ההמרה ל-S/4HANA " +
      "2025 (PDF שנקרא בטקסט המלא; שורת 'Information Governance: Business Partner Approach' עם SAP Note " +
      "2265093). שם הפריט בתבנית כותרת ההערה, '2265093 - S4TWL - Business Partner Approach', מופיע גם בעמוד " +
      "Related Notes של מדריך ההתקנה ל-1709 (loio 94017f586d809344e10000000a4450e5) ולא נוסף כראיה נפרדת. מספר " +
      "ההערה נקרא מהסניפט הרשמי ומהמסמך; שדה sapNote הוזן רק בראיית המאגר (repoRef), כי me.sap.com דורש S-user " +
      "וגוף ההערה, כולל בדיקות הקוד המותאם שהיא מגדירה, לא נקרא. תיקון לעומת המאגר: עמודת ה-S/4 של שתי החוברות " +
      "פותחת ב'הוחלף', ולכן האפליקציה גזרה עד כה 'הוחלף ב-S/4HANA' ללא יורש; BUT000 היא טבלת היעד של גישת השותף " +
      "העסקי ולא טבלה מוחלפת. סתירה פתוחה: s4AltTable בחוברת PM ('LFA1 (View תאימות)') מול העמוד הרשמי של CVI " +
      "('CVI creates customer master data or vendor master data ... based on a business partner') ומול " +
      "table-enrichment ('KNA1/LFA1 עדיין קיימות ומסונכרנות'); לא נמצא מקור רשמי המתאר את KNA1/LFA1 כתצוגות " +
      "תאימות. הטענה במאגר שיצירה ישירה ב-XD01/XK01 הוסרה או חסומה (table-enrichment, s4-objects) אינה נתמכת " +
      "בסניפטים שנאספו; העמוד הרשמי 'Business Partner' (loio beccd7570afba073e10000000a441470, ‏2025.001) קובע " +
      "רק שטרנזקציה BP היא 'single point of entry' ללקוחות, ספקים ושותפים עסקיים; דורש אימות במערכת SAP. " +
      "אישורים רשמיים נוספים שלא נוספו כראיות: MDG Time Dependency (loio 9622b45689983f23e10000000a44147b, " +
      "‏2025.001: תלות בזמן מנוטרלת ברמת הכותרת של BUT000 ב-S/4HANA), לוקליזציית רוסיה (loio " +
      "4ec28baded35657de10000000a42189b, ‏2025.001: 'Business Partner: General data I (BUT000)' והשדה " +
      "NAME_ORG1) ועמוד 'IDocs DEBMAS and CREMAS' ב-APIs for Business Partner (loio " +
      "a04825050c1740ef98032dccb2b8d682, ‏2025.001: ב-S/4HANA נוצר קודם BP ואז CVI יוצר לקוח/ספק). האפליקציה " +
      "F3163 מאושרת גם בעמוד 'Manage Business Partner Master Data' (loio e28f3bd8baff43b7a63287cf47ea5f60, " +
      "‏2025.001: יצירה, שינוי, חיפוש, הצגה והעתקה של נתוני אב); עמוד ספריית ההפניה של Fiori עבור F3163 הוא JS " +
      "shell ולא נקרא, ולכן אינו נמנה כאישור; תפקיד, קטלוג ושירות OData לא נראו. רשימת השדות (PARTNER‏, TYPE‏, " +
      "BU_GROUP‏, BPKIND) וסוגי הנתונים נשארים ברובד המאגר; רק NAME_ORG1 נראה בסניפט רשמי. LFA1‏, " +
      "MDS_LOAD_COCKPIT‏, CVI_VEND_LINK ו-F3163 אינם ב-xrefs כי אין להם מזהה בר-פענוח בדאטהסט. בדיקה במערכת חיה " +
      "לא התאפשרה (חיבור ה-MCP‏ sc4sap נכשל בסשן זה).",
  },

  /* -------------------------------------------------------- table:EQUI */
  {
    id: "table:EQUI",
    evidence: [
      EQUI_PM_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/08c1d29f1acc4d459ecc198dc18ee6ce.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה PM - Equipment (מדריך Data Migration, 2025 FPS01) מוגדר לפי הסניפט: 'Object Alias " +
          "EQUIPMENT_2', 'Business Object Component PM', 'Business Object Type Master data', 'Migration Approach " +
          "Staging Table', 'Custom Field Support Yes', ובהיקף: 'Equipment Master Data', 'Equipment Manufacturer " +
          "Data'. הסניפט קובע: 'The CurCustomer (EQUI-KUNDE) field will not automatically populate fields in the " +
          "EQUI or EQUZ tables according to your customizing', כלומר הטבלאות EQUI ו-EQUZ ושדה EQUI-KUNDE נזכרים " +
          "במפורש במערכת היעד S/4HANA. האפליקציות המנויות בסניפט: 'Find Technical Object (F2072)', 'Create " +
          "Equipment (IE01)', 'Change Equipment (IE02)', 'Display Equipment (IE03)', 'Display Technical Object'. " +
          "הסניפט מפנה גם ל-'SAP Knowledge Base Article 2878950' ('Migration Cockpit: Collective KBA for Migration " +
          "PM-Object Equipment'), כלשונו; המספר לא אומת מעבר לכותרת הזו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Download Equipment Data Using Data Loader | Integration with SAP Field Service Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/738a456365c0414faba6426d05fd8674/a5672fd7df9f4d8db010da08ea30abe3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מדריך האינטגרציה עם SAP Field Service Management לגרסת 2025 FPS01 מורה: 'Use transaction SE16 to export " +
          "the equipment record from table EQUI as an XLSX file from the backend in SAP S/4HANA'. כלומר טבלת EQUI " +
          "קיימת ונגישה ב-backend של S/4HANA 2025 FPS01 כטבלת רשומת הציוד. ההקשר לפי הסניפט: 'Equipment that is " +
          "created and changed is not replicated automatically', ולכן ההורדה ל-FSM נעשית ידנית דרך Data Loader.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Equipment | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/b3f9876bb0eb4141ab9f5dea73e5db4a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE3,
        claim:
          "נושא ה-VDM הרשמי 'Equipment' (On-Premise 2023 Latest) קובע: 'Technical Name I_Equipment', 'View Type " +
          "Basic', 'Release Status Released', 'This CDS view provides access to the master data of a piece of " +
          "equipment', ומונה כמאפיינים חשובים: Piece of equipment, Equipment category, Technical object type, " +
          "Plant, Manufacturer country, User who created the piece of equipment, Construction year and month. " +
          "הסניפט אינו נוקב בשם הטבלה EQUI; הקישור בין התצוגה לטבלאות EQUI ו-EQKT מקורו במיפוי הפרויקט " +
          "(data/cds-map.ts) ולא בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint של PM (חוברת ההגירה) : רשומת הטבלה EQUI",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת ה-blueprint (נושא 2, ציוד ונתוני מאסטר): 'רשומת אב של ציוד' / 'Equipment master record'; טרנזקציות " +
          "IE01/IE02/IE03, IH08, IE05; עמודת S/4: 'ללא שינוי במודל הנתונים (תואם)', טבלה חליפית 'EQUI (זהה)', " +
          "'IE01-03 נתמכים; אסטרטגי: Fiori'; SUM: ללא פעולת המרה ייעודית, מומלץ Regression Test. שדות מתועדים: " +
          "EQUNR (PK), EQTYP, EQART, HERST, TYPBZ, OBJNR (FK); פונקציות BAPI_EQUI_CREATE, BAPI_EQUI_CHANGE, " +
          "BAPI_EQUI_GETDETAIL, BAPI_EQMT_INSTALL; תוכניות RIEQUI20, RIEQUI00; קשרים: EQKT, EQUZ (EQUNR וגם HEQUI, " +
          "ציוד עליון), JSTO (OBJNR), OBJK, EQST, QMEL, AFIH, MPOS. ה-blueprint נוקב באפליקציית Fiori 'Manage " +
          "Technical Objects (F2079)'; מזהה זה לא אומת (ראו הערות).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#EQUI",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט : רשומת EQUI",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: EQUI היא רשומת אב הציוד, אובייקט טכני מרכזי ב-EAM, עם מפתח MANDT + EQUNR, קטגוריה " +
          "EQTYP ומספר אובייקט OBJNR לסטטוס (JEST); הטקסט ב-EQKT, שיוך מיקום וחשבונאות ב-ILOA דרך ILOAN, היסטוריית " +
          "פלחי זמן ב-EQUZ, סיווג דרך INOB/AUSP. המקורות ברשומה טקסטואליים (SE11, SAP Help) ללא קישור.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#EQUI",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT) : הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "EQUI נמנית בסט S4_STABLE של המאגר, טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA (verified, low " +
          "risk, ללא שינוי מודל), יחד עם EQKT, EQUZ, ILOA, IFLOT, OBJK ו-JEST.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת EQUI, נתוני האב של הציוד (Equipment master data) בתחזוקת מפעל, פעילה ב-S/4HANA On-Premise (עדכני " +
        "ל-2025 FPS01) וללא טבלה חליפית: מסמך הארכוב הרשמי של 2025 FPS01 מונה אותה כטבלה הראשונה של אובייקט " +
        "הארכוב PM_EQUI, אובייקט ההגירה PM - Equipment מתייחס במפורש ל-EQUI ול-EQUZ במערכת היעד, ומדריך " +
        "האינטגרציה עם FSM מורה לייצא את רשומת הציוד מטבלת EQUI ב-backend של S/4HANA. אף רשומה רשמית שנמצאה אינה " +
        "נוקבת ביורשת, בפריט פישוט או בהוצאה משימוש של הטבלה. שכבת הקריאה המודרנית היא תצוגת ה-VDM‏ I_Equipment " +
        "(Basic, Released), שהתיעוד מגדיר כגישה לנתוני האב של פריט ציוד.",
      edition: "on-premise",
      release: "2025.001",
      source: EQUI_PM_ARCHIVING,
      recommendedAction:
        "להמשיך להשתמש ב-EQUI כטבלת אב הציוד; אין פעולת הסבה ייעודית לטבלה עצמה (ה-blueprint: ללא שינוי במודל " +
        "הנתונים, ללא צעד SUM ייעודי). לאחר ההמרה לבצע בדיקות רגרסיה לקוד מותאם ולממשקים הקוראים או כותבים " +
        "ל-EQUI, EQKT, EQUZ ו-ILOA. לקריאה, לדיווח ולפיתוח חדש להעדיף את תצוגת ה-CDS‏ I_Equipment על פני SELECT " +
        "ישיר; ליצירה ולשינוי להשתמש ב-BAPI_EQUI_CREATE / BAPI_EQUI_CHANGE (בדאטהסט) או בשירות ה-OData‏ " +
        "API_EQUIPMENT המתועד ברשומת cds:I_Equipment. להעברת ציוד ב-Migration Cockpit להשתמש באובייקט PM - " +
        "Equipment (Staging Table), ולניהול מחזור חיים של הנתונים באובייקט הארכוב PM_EQUI, שמכסה גם EQKT, EQUZ " +
        "ו-ILOA.",
    },
    xrefs: [
      "table:EQKT", "table:EQUZ", "table:ILOA", "table:IFLOT", "table:JEST", "table:JSTO", "table:OBJK",
      "table:EQST", "table:QMEL", "table:AFIH", "table:MPOS", "tx:IE01", "tx:IE02", "tx:IE03", "tx:IE05",
      "tx:IH08", "fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE", "fm:BAPI_EQUI_GETDETAIL",
      "fm:BAPI_EQMT_INSTALL", "cds:I_Equipment", "cds:I_EquipmentTimeSegment", "cds:I_FunctionalLocation",
      "enh:exit:IEQM0001", "enh:exit:ITOB0001", "enh:badi:BADI_EAM_TOB", "fiori:F2730A",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('EQUI equipment master table', " +
      "'Equipment master record technical object', 'Archiving Equipment PM_EQUI', 'Simplification technical " +
      "objects equipment S/4HANA', 'equipment master data EQUI EQUZ time segment usage period', \"What's New " +
      "equipment master data technical object\", 'Manage Technical Objects Fiori app equipment', 'PM - Equipment " +
      "migration object EQUI' תחת 2025.001), חיפוש רשת מוגבל-דומיין (help.sap.com, api.sap.com, " +
      "fioriappslibrary, fal) ורובד Tier-2 מהמאגר. גוף העמודים אינו נשלף (מעטפת JavaScript), ולכן כל טענה " +
      "מוגבלת לכותרת ולסניפט של רשומת החיפוש. רשימת השדות המלאה של EQUI לא אומתה מול מקור רשמי: הסניפטים נוקבים " +
      "רק ב-EQUI-KUNDE (אובייקט ההגירה); ששת השדות שברשומה מקורם ב-blueprint. לא נמצא פריט פישוט " +
      "(Simplification Item) או רשומת What's New שמשנה את הטבלה; רשומות What's New שנמצאו עוסקות ב-OData API: " +
      "Equipment (2025), ב-Reference Equipment (2025 FPS01) וב-Critical Equipment (2020), לא בטבלה. EQUI מופיעה " +
      "בתיעוד גם כמפתח סוג אובייקט (Object Type EQUI לצד FUNC ו-SERN ב-Master Warranties, ו-'Object Type: EQUI' " +
      "באובייקט ההגירה Document info record); זו שימושיות של המפתח, לא של הטבלה, ולא נכללה כראיה. סטייה פנימית " +
      "במאגר לגבי אפליקציית Fiori: ה-blueprint נוקב 'Manage Technical Objects (F2079)', data/fiori/apps.ts נוקב " +
      "F2730A ו-data/tx-intel.ts ‏(IE01) נוקב F1827; אף אחד משלושת המזהים לא נמצא בדומיינים הרשמיים במעבר זה, " +
      "והסניפטים הרשמיים נוקבים ב-Find Technical Object (F2072), Display Technical Object (W0028), Create / " +
      "Change / Display Technical Object. ה-xref‏ fiori:F2730A הוא מזהה המאגר בלבד. מספר ה-KBA‏ 2878950 מצוטט " +
      "כלשונו מסניפט רשמי ולא נרשם בשדה kba, כי הכלל דורש קישור me.sap.com/notes או repoRef. נושא ה-VDM‏ " +
      "'Equipment' מאונדקס ב-On-Premise רק תחת 2023.latest. חיבור sc4sap MCP (SE11 חי) נכשל בסשן זה. לא נטען " +
      "שום מספר SAP Note; רובד המאגר (blueprint, table-enrichment, S4_STABLE) עולה בקנה אחד עם הראיות הרשמיות " +
      "לגבי סטטוס הטבלה, ולא נמצאו סתירות.",
  },

  /* ------------------------------------------------------- table:IFLOT */
  {
    id: "table:IFLOT",
    evidence: [
      IFLOT_PM_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Document info record | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/e0c077f8cd8c413abedacec4f71fc61f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה Document info record (מדריך Data Migration, 2025 FPS01) מונה את סוגי האובייקטים הנתמכים: " +
          "'Product (MARA) Equipment (EQUI) Functional Location (IFLOT)', ודורש כתנאי מקדים שהאובייקטים 'Customer', " +
          "'PM - Equipment' ו-'PM - Functional ...' כבר תוחזקו או הועברו (הסניפט נקטע אחרי 'PM - Functional'; שם " +
          "האובייקט המלא 'PM - Functional location' הוא נושא נפרד באותו מדריך, loio b6207b9f). IFLOT נקובה כמזהה " +
          "הטכני של המיקום הפונקציונלי בתיעוד ההגירה של 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Functional location | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/b6207b9f98d3490c81b2b5550e315273.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה PM - Functional location (מדריך Data Migration, 2025 FPS01) קובע: 'Labeling System for " +
          "Functional Locations The labeling system is only supported in SAP S/4HANA', ו-'if the Labeling System " +
          "for Functional Locations is used, the object only supports installing the superior functional location " +
          "automatically'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Functional Location | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "שירות ה-OData הרשמי API_FUNCTIONALLOCATION (מדריך APIs for Maintenance Management, 2025 FPS01) 'is built " +
          "using the CDS views based on functional location, long text, business partner, class, characteristics, " +
          "value, and warranty master data tables via gateway service builder and SADL'; העמוד מפרט אילוצים ליצירה " +
          "ולעדכון של מיקום פונקציונלי כאשר Alternate Labelling פעיל.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Objects Released for Developer Extensibility in Maintenance Management | What's New in SAP S/4HANA and " +
          "SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/e666a33610e6491f9d800882be108d02.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE3,
        claim:
          "What's New לגרסת 2025 מונה תצוגות CDS חדשות שהשתחררו להרחבת מפתחים בניהול תחזוקה: " +
          "I_FunctionalLocationText ('the text view for I_FunctionalLocation'), I_FunctionalLocationStatus (סטטוס " +
          "מיקום פונקציונלי), I_FunctionalLocationData (נתוני מיקום פונקציונלי) ו-I_FunctionalLocationLabel (תווית " +
          "מיקום פונקציונלי). העמוד מציג את האובייקטים שהשתחררו כ-'a stable interface to access data from SAP " +
          "S/4HANA' (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת IFLOT",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מאגר מאומתת: IFLOT היא רשומת האב של המיקום הפונקציונלי עם מפתח MANDT/TPLNR, היררכיה דרך TPLMA " +
          "(מיקום-אב), מספר אובייקט OBJNR לסטטוס (JEST), טקסטים ב-IFLOTX ושיוך מיקום/חשבונאות ב-ILOA דרך ILOAN.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#IFLOT",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "IFLOT נמנית בסט S4_STABLE של המאגר, לצד IFLOS ו-ILOA: טבלאות ליבה של תחזוקת מפעל המסומנות במפורש יציבות " +
          "ב-S/4HANA (verified, low risk, ללא שינוי מודל). הבלופרינט (data/sapData.pm.ts) כותב עליה 'ללא שינוי " +
          "במודל הנתונים (תואם)' עם s4AltTable 'IFLOT (זהה)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טבלת IFLOT (Functional location master data), רשומת האב של המיקום הפונקציונלי בתחזוקת מפעל, פעילה " +
        "ב-S/4HANA On-Premise (עדכני ל-2025 FPS01) וללא טבלה חליפית: היא הטבלה המובילה של אובייקט הארכוב " +
        "PM_IFLOT, נקובה בשמה בתיעוד ה-Migration Cockpit, ונתוני המיקום הפונקציונלי נחשפים ב-S/4HANA דרך משפחת " +
        "תצוגות ה-CDS‏ I_FunctionalLocation ושירות ה-OData‏ API_FUNCTIONALLOCATION (הקישור לטבלה עצמה הוא סינתזה, " +
        "ראו הערות). אף מקור רשמי אינו נוקב ביורשת, בהוצאה משימוש או בפריט פישוט לטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: IFLOT_PM_ARCHIVING,
      recommendedAction:
        "להמשיך להשתמש ב-IFLOT כרשומת האב של המיקום הפונקציונלי; אין פעולת המרה ייעודית לטבלה עצמה ב-SUM, ומומלץ " +
        "Regression Test להתאמות אישיות שקוראות ממנה. לפיתוח חדש ולצריכה אנליטית להעדיף את I_FunctionalLocation " +
        "ואת התצוגות הנלוות שהשתחררו ב-2025 (Text, Status, Data, Label) על פני SELECT ישיר; לאינטגרציות להעדיף את " +
        "API_FUNCTIONALLOCATION על פני BAPI_FUNCLOC_*; בהגירה להשתמש באובייקט 'PM - Functional location' של " +
        "ה-Migration Cockpit ולתכנן את IFLOS (תיוג חלופי) יחד עם IFLOT.",
    },
    xrefs: [
      "table:IFLOS", "table:ILOA", "table:EQUI", "table:JEST", "tx:IL01", "tx:IL02", "tx:IL03", "tx:IH01",
      "tx:IH06", "cds:I_FunctionalLocation", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_FUNCLOC_CHANGE",
      "fm:BAPI_FUNCLOC_GETDETAIL",
    ],
    lastVerifiedAt: DATE3,
    notes:
      "הסטטוס נגזר מרשומות חיפוש רשמיות (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE, 2026-09-07): " +
      "IFLOT נקובה בתיאורה המדויק 'Functional location master data' בעמוד הארכוב של 2025 FPS01 (loio 7e06bd53), " +
      "נקובה כ-'Functional Location (IFLOT)' בתיעוד ה-Data Migration (loio e0c077f8) ובתיעוד Enterprise Content " +
      "Management (Manage Documents, loio 1bc74614, לא נכלל כראיה), ומגובה בתיעוד ה-API וה-What's New של 2025. " +
      "אף מקור רשמי לא נמצא המסמן את IFLOT כמוחלפת, מיושנת או מוסרת, ולכן 'ללא שינוי' בלי יורשת. הקישור בין " +
      "API_FUNCTIONALLOCATION ובין תצוגות I_FunctionalLocation לבין הטבלה IFLOT הוא סינתזה של הרשומה (הסניפט " +
      "הרשמי של ה-API מדבר על 'functional location master data tables' בלי לנקוב בשם הטבלה; רשומת ה-VDM של " +
      "I_FunctionalLocation מדברת על האובייקט העסקי 'Functional location'). רק סניפטים רשמיים שימשו לניסוח; לא " +
      "נטען שום מספר SAP Note. נקודה להגירה מתוך תיעוד ה-Migration Cockpit (PM - Functional location, loio " +
      "b6207b9f, ראיה נפרדת): 'The labeling system is only supported in SAP S/4HANA', כלומר מערכת התיוג החלופי " +
      "(IFLOS) היא יכולת S/4 שיש לתכנן יחד עם הטבלה. פערים: פירוט שדות DDIC (SE11) של IFLOT לא אומת מול מערכת " +
      "חיה (חיבור sc4sap נכשל) ונשאר ברמת אימות המאגר; IFLOTX, IHPA ו-IHSG נקובות בסניפט הרשמי אך אינן ב-xrefs " +
      "כי אין להן דף בדאטהסט; אפליקציית ה-Fiori לניהול אובייקטים טכניים לא נכללה ב-xrefs כי המזהה שלה סותר בתוך " +
      "המאגר (F2079 בבלופרינט, F2730A ב-data/fiori/apps.ts) ואף רשומה רשמית לא נמצאה תחת אחד מהמזהים (ראו " +
      "research-queue-fiori.md); מזהה ה-Fiori הרשמי לאובייקטים טכניים דורש אימות נפרד. ראיית ה-What's New (loio " +
      "e666a336) נושאת versionId 2025.000 ולא 2025.001, כפי שהוחזר מהשירות. ביקורת עוינת 2026-09-07: ארבע " +
      "רשומות החיפוש הרשמיות (loio 7e06bd53, e0c077f8, b6a1e644, e666a336) וכן loio b6207b9f אומתו מחדש מול " +
      "השירות (כותרת, versionId, סניפט) וכל כתובת החזירה HTTP 200; כל 13 ה-xrefs נפתרים ביקום; 14 כללי " +
      "lib/evidence/validate.ts ללא ממצא.",
  },
];
