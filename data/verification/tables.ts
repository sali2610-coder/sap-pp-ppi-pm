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
   and queued.
   Batch 3 (2026-09-15): 15 more records (MKPF, AFVC (the batch-2 refusal, now
   resolved), COSP, COSS, AFRU, AFIH, EBAN, EQUZ, ILOA, MPLA, MPOS, MCHA, MARM,
   MAKT, AFFL), each merged from its adversarial verdict; no record carries a
   reviewer field (house convention across data/verification/**). */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";
const DATE3 = "2026-09-07";
const DATE4 = "2026-09-15";

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

const MKPF_SIMPL2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition " +
    "2025 - Feature Pack Stack 1 · item 15.3.1 S4TWL - Data Model in Inventory Management (MM-IM), p. 1459",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE4,
  claim: "פריט 15.3.1 ברשימת הפישוט של 2025 FPS1 (גרסת מסמך 1.36, עמ' 1459 ואילך, נקרא כטקסט מלא מקובץ ה-PDF) " +
    "חוזר על אותו נוסח: מודל SAP ERP 6.0 מורכב מ-'MKPF for document header information and MSEG for " +
    "document item data', וב-S/4HANA 'Material document data will be stored in MATDOC only and not anymore " +
    "in MKPF and MSEG'. הטבלאות 'do still exist in S/4HANA as DDIC definition as well as database object', " +
    "ובשורת MKPF שבטבלת הפריט רשומים NSDM_DDL_MKPF ו-NSDM_MIG_MKPF ועמודת תצוגת נתוני האב ריקה. הערת " +
    "ה-Business Impact היא אותה הערה, 0002206980 בכותרת 'Material Inventory Managment: change of data " +
    "model in S/4HANA'. רכיב היישום עודכן ל-MM-IM-GF-MIG לעומת MM-IM-GF ברשימת 2023 FPS3.",
  verificationLevel: "sap_official_verified",
};

const AFVC_JVA_NETWORK: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Joint Venture Information on Networks | Joint Venture Accounting (JVA)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f049a59301a94f1c9bb60ca8394db217/d6328a535af43d58e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד ה-JVA הרשמי לגרסת 2025 FPS01 קובע על מבנה החילוץ: 'The view is BIW_JV_AFVC and the base table is " +
    "AFVC'. תחת הכותרת 'Fields of Origin for the Extract Structure' הוא מונה שדות שמקורם ב-AFVC, ובהם " +
    "MANDT ('Client'), AUFPL ('Routing number of operations in the order'), APLZL ('General counter for " +
    "order'), VNAME, RECID ו-ETYPE. זוהי רשימת שדות המקור של מבנה החילוץ ולא רשימת שדות המפתח של הטבלה; " +
    "הסניפט אינו מגדיר מפתח.",
  verificationLevel: "sap_official_verified",
};

const COSP_SIMPL2025_CO: Evidence = {
  sourceType: "simplification_item",
  sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.5.1 S4TWL - TECHNICAL " +
    "CHANGES IN CONTROLLING (CO-OM), p. 319, 320",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE4,
  claim: "פריט הפישוט 6.5.1 S4TWL - TECHNICAL CHANGES IN CONTROLLING (Application Component: CO-OM), שנקרא " +
    "ישירות מקובץ ה-PDF, קובע בעמ' 319: 'In SAP S/4 HANA the totals records for primary and secondary " +
    "costs have been removed and the universal journal includes all actual cost postings, both primary and " +
    "secondary', ובעמ' 320: 'The former tables COEP, COSP, and COSS are replaced by views of the same " +
    "name, so-called compatibility views, that aggregate the data in the universal journal on the fly in " +
    "accordance with the old table structures'. בפירוט הפריט: 'Actual data needed for long-term " +
    "orders/projects from COSP_BAK, COSS_BAK is stored in table ACDOCA', 'Value types other than 04 and 11 " +
    "are still stored in COEP, COSP_BAK, COSS_BAK', ו-'From a business point of view, all classic " +
    "transactions are still running - based on compatibility views or using direct acces to ACDOCA'. " +
    "הפעולה הנדרשת בפריט: 'Please check your customer-specific programs using CO tables. Customer coding " +
    "should be adapted by replacing the access via compatibility views with direct access to ACDOCA for " +
    "value types 04 and 11', לצד האזהרה 'Using these views may have a performance impact on existing " +
    "reports and you are recommended to investigate whether the new Fiori reports meet your business " +
    "needs'. הפריט מפנה ל-Business Impact note 0002270404 ול-note 2185026 'Compatibility views COSP, COSS, " +
    "COEP, COVP: How do you optimize their use'; המספרים מצוטטים כלשונם מהמסמך הציבורי ולא נקראו בפועל.",
  verificationLevel: "sap_official_verified",
};

const COSS_UNIV_JOURNAL_FAQ: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Universal Journal: FAQ | General Ledger Accounting (FI-GL)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/8b8e5695c4dc4749a706f9fa2f6bda92.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד ה-FAQ הרשמי של ה-Universal Journal פותח את הרשימה במילים 'The entries of the following tables " +
    "are now completely contained in table ACDOCA', וברשימה עצמה מופיע הפריט 'The actual data of the " +
    "Controlling tables: COEP, COSS, COSP'. מיד לאחריו נכתב במפורש: 'The data for statistical postings and " +
    "target data remain in the tables COEP, COSS, and COSP'.",
  verificationLevel: "sap_official_verified",
};

const AFRU_PP_CUSTOM_FIELDS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Insertion of Customer-Specific Fields | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/3a00b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "תיעוד Production Planning and Control לגרסת 2025 FPS01 מנחה להרחיב את AFRU עצמה בשדות לקוח: 'Extend " +
    "database table AFRU You must add the customer include CI_AFRU to the database' ולצדו 'Table AFRU " +
    "already contains an entry for the include. You create the customer include by double-clicking on the " +
    "entry CI_AFRU in the table AFRU in transaction SE11'. הסניפט מונה גם את 'Confirmation " +
    "production/process order (order header) CO15 and CORK'. לפי הסניפט AFRU היא טבלת בסיס נתונים פעילה " +
    "וברת-הרחבה בגרסה הנוכחית.",
  verificationLevel: "sap_official_verified",
};

const AFIH_PM_ORDER_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving Maintenance and Service Orders (PM-SMA-SC/PM-WOC-MO) | Data Archiving in Plant Maintenance " +
    "and Customer Service (PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/15e1b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "מסמך הארכוב של תחזוקת מפעל ושירות לגרסת 2025 FPS01 מגדיר: 'Archiving object PM_ORDER, with which you " +
    "can archive maintenance orders and service orders in the Plant Maintenance component', ובחלק " +
    "ה-Structure שלו ('Structure Tables The archiving object PM_ORDER contains all of the data relating to " +
    "the order') מונה תחת 'Table / Contents' את 'AFIH Order header' כשורה הראשונה, ואחריה 'AFAB Network - " +
    "Relationships', 'IHPA Partner', 'IHSG, IHGNS Permits', 'ILOA Location and account assignment for the " +
    "maintenance object' ו-'OPROL Operation link to object list entry'. כלומר AFIH קיימת ב-S/4HANA " +
    "On-Premise 2025 FPS01 בתפקיד כותרת ההזמנה של פקודת האחזקה.",
  verificationLevel: "sap_official_verified",
};

const EBAN_MRP_LIVE: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "MRP Live: Incompatible Changes | Material Requirements Planning (PP-MRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/1d4ee5514ec5c90ae10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד השינויים הלא תואמים של MRP Live בגרסת 2025 FPS01 קובע שמחוון היצירה של דרישות רכש אינו זמין " +
    "ב-MRP Live: 'The creation indicator for purchase requisitions is not available in MRP Live. MRP Live " +
    "always creates purchase requisitions for external procurement', ושהריצה מוחקת דרישות רכש שנוצרו בריצת " +
    "תכנון קודמת ויוצרת חדשות במקומן: 'MRP Live deletes planned orders or purchase requisitions created by " +
    "an earlier planning run and creates new ones', בתנאי שלא קובעו (if they were not firmed).",
  verificationLevel: "sap_official_verified",
};

const EQUZ_PM_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving of Equipment (CS-BD/PM-EQM-EQ) | Data Archiving in Plant Maintenance and Customer Service " +
    "(PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/7b06bd53d34ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "מסמך הארכוב הרשמי לגרסת 2025 FPS01 קובע: 'The archiving object for equipment PM_EQUI consists of the " +
    "following tables: Table Short Text EQUI Equipment master data EQKT Multilingual equipment short " +
    "texts, long texts, and internal remarks EQUZ Equipment time segments ILOA Location and account " +
    "assignment data for the maintenance object IHSG Table of permits for Plant Maintenance with long " +
    "texts IHPA Partner FLEET' (הסניפט נקטע אחרי FLEET). כלומר הטבלה EQUZ קיימת ב-SAP S/4HANA On-Premise " +
    "2025 FPS01 בשם זה, תיאורה הרשמי הוא 'Equipment time segments' (פלחי זמן של ציוד), והיא אחת מטבלאות " +
    "אובייקט הארכוב PM_EQUI לצד EQUI, EQKT ו-ILOA.",
  verificationLevel: "sap_official_verified",
};

const ILOA_PM_MPLAN_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving of Maintenance Plans (CS-AG/PM-PRM-MP) | Data Archiving in Plant Maintenance and Customer " +
    "Service (PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/96a0ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד הארכוב הרשמי לגרסת 2025 FPS01 פותח ב-'You can use the archiving object PM_MPLAN to a' (הסניפט " +
    "נקטע) ומונה רשימת טבלאות: 'It comprises the following tables: Table Short Text MPOS Maintenance item " +
    "ILOA Location and account assignment for maintenance object (PM object) OBJK Object list for Plant " +
    "Maintenance'. כלומר הטבלה ILOA קיימת ב-SAP S/4HANA On-Premise 2025 FPS01 בתיאור הרשמי 'Location and " +
    "account assignment for maintenance object (PM object)', לצד MPOS ו-OBJK.",
  verificationLevel: "sap_official_verified",
};

const MPOS_PM_MPLAN_ARCHIVING: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Archiving of Maintenance Plans (CS-AG/PM-PRM-MP) | Data Archiving in Plant Maintenance and Customer " +
    "Service (PM/CS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/96a0ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד הארכוב הרשמי לגרסת 2025 FPS01 קובע: 'You can use the archiving object PM_MPLAN to archive " +
    "maintenance plans in the Plant Maintenance application component'. הסניפט מציג שתי רשימות טבלאות תחת " +
    "'It comprises the following tables: Table Short Text': באחת 'MPOS Maintenance item', 'ILOA Location " +
    "and account assignment for maintenance object (PM object)' ו-'OBJK Object list for Plant " +
    "Maintenance'; בשנייה 'MPLA Maintenance plan', 'MMPT Cycle definitions and measuring points for the " +
    "maintenance plan' ו-'MHIS Maintenance plan calls'. מהסניפט לבדו לא ניתן לקבוע איזו רשימה שייכת לאיזה " +
    "מבנה. הטענה המוגבלת: MPOS קיימת ב-S/4HANA 2025 FPS01 עם הטקסט הקצר 'Maintenance item' והיא בהיקף " +
    "אובייקט הארכוב PM_MPLAN.",
  verificationLevel: "sap_official_verified",
};

const MCHA_BATCH_INTEGRITY: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Integrity Check for Batch Classification | Batch Management (LO-BM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/95fdb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד ניהול האצוות (LO-BM) בסט התיעוד של S/4HANA 2025 FPS01 מכנה את MCHA בשמה המלא: 'the batch master " +
    "record table MCHA', וקובע שכאשר חומרים מוערכים בנפרד ברמת מפעל המערכת יוצרת בה רשומה ('Dummy Batch " +
    "with MCHA - Entry ... When materials are valuated separately at plant level, the system creates an " +
    "entry in the batch master record table MCHA'). באותו עמוד, בחירת אצוות לבדיקת שלמות לפי מפעל אפשרית " +
    "רק אם רמת האצווה הוגדרה ברמת מפעל במערכת ('You can select batches by plant only if the batch level " +
    "has been set to plant level in your system').",
  verificationLevel: "sap_official_verified",
};

const MARM_PRODUCT_CHECKS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Types of Checks Performed | Product Master",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/1bc030a8228d405fbea7016562fa85f1.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE4,
  claim: "עמוד בדיקות אב המוצר לגרסת 2025 FPS01 נוקב בשם שהתיעוד צמיד לטבלה, 'Units of Measure for Material " +
    "(MARM)', ומונה אותה ברשימת הטבלאות ששדותיהן ניתנים להגדרה לאיתור כפילויות: 'The fields in the tables " +
    "listed below can be configured for matching potential duplicates', לצד 'General Material Data " +
    "(MARA)', 'Plant Data for Material (MARC)', 'Storage Location Data for Material (MARD)', 'Material " +
    "Descriptions (MAKT)', 'Material Valuation (MBEW)', 'MRP Area for Material (MDMA)' ו-'International " +
    "Article Numbers (EANs) for Material (MEAN)'.",
  verificationLevel: "sap_official_verified",
};

const MATNR_FIELD_LENGTH_SIMPL_2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.5 S4TWL - Material Number " +
    "Field Length Extension (CA-FLE-MAT), pp. 95-102",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE4,
  claim: "פריט 5.1.5 ברשימת הפישוט הרשמית (Document Version 1.36, קובץ ה-PDF נקרא בפועל; Business Impact note " +
    "0002267140) קובע: 'In SAP S/4HANA, the material number field length has been extended from 18 to 40 " +
    "characters. This change was first implemented in SAP S/4HANA, on-premise edition 1511 and affects " +
    "this release and higher releases'. בעמ' 98, תחת 'Storage of the Material Number on the Database': " +
    "'the field length of the MATNR field on the database has been extended from 18 to 40 characters. This " +
    "has been done in all tables (and all fields within the tables) in which a material number can be " +
    "stored', ומיד אחריו: 'the way how the material number content is stored in the database field has not " +
    "been changed compared to SAP Business Suite. This means that for such fields usually no data " +
    "conversion is needed when converting from SAP Business Suite to SAP S/4HANA'. בעמ' 99, לגבי ממשקים " +
    "משוחררים: 'The already existing field keeps its original length and a new field has been added at the " +
    "end of the structure (or as new parameter) that allows transmitting material numbers with 40 " +
    "characters', 'The changes described have been done for BAPIs, IDocs, and released remote-enabled " +
    "function modules', וכן 'the extended material number functionality must be switched on explicitly' " +
    "ו-'the extended material number functionality will by default be switched off' לאחר המרה או התקנה " +
    "חדשה. ממצא שלילי תחום: המחרוזת MAKT אינה מופיעה בטקסט שחולץ מהמסמך (0 מופעים), וכך גם בטקסט שחולץ " +
    "מרשימת הפישוט של 2023 (SIMPL_OP2023.pdf, Document Version 1.35). הממצא תחום לטקסט הניתן לחילוץ: חלק " +
    "מהטבלאות במסמך זה מודפסות כטקסט מסובב שאינו נחלץ (ראו data/verification/enhancements.ts).",
  verificationLevel: "sap_official_verified",
};

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

  /* -------------------------------------------------------- table:MKPF */
  {
    id: "table:MKPF",
    evidence: [
      MKPF_SIMPL2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 initial shipment, Feature Pack Stack 1-3 and SAP " +
          "S/4HANA Cloud Private Edition 2023 initial shipment, Feature Pack Stack 1-3 · item 27.5 S4TWL - " +
          "Data Model in Inventory Management (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE4,
        claim: "פריט הפישוט 27.5 (פרק 27 Logistics - MM-IM, עמ' 634 ואילך, גרסת מסמך 1.35 מ-2025-02-25) קובע " +
          "שמודל הנתונים של SAP ERP 6.0 מורכב משתי טבלאות המסמך 'MKPF for document header information and " +
          "MSEG for document item data', ושב-S/4HANA 'Material document data will be stored in MATDOC only " +
          "and not anymore in MKPF and MSEG'. הפריט מציין כהערת Business Impact את SAP Note 2206980 בכותרת " +
          "'Material Inventory Managment: change of data model in S/4HANA', ורכיב היישום הוא MM-IM-GF.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 · item 27.5 S4TWL - Data Model in Inventory Management " +
          "(MM-IM), טבלת הטבלאות המושפעות ופרק התאמות הקוד",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE4,
        claim: "אותו פריט מתאר את מנגנון התאימות: הטבלאות המנויות בו 'do still exist in S/4HANA as DDIC " +
          "definition as well as database object', ולכל אחת מהן מוקצית תצוגת CDS כ-proxy object כך ש'each " +
          "read access to one of the tables will get redirected in the database interface layer of " +
          "NetWeaver to the assigned CDS view. Write accesses to those tables have to be adjusted'. בשורת " +
          "MKPF (Material document header) שבטבלת הפריט רשומים DDL Source לתצוגת ההפניה NSDM_DDL_MKPF " +
          "ותצוגה לקריאת תוכן הטבלה ללא ניתוב NSDM_MIG_MKPF, ועמודת תצוגת נתוני האב ריקה. הפריט מוסיף " +
          "ש'the table MKPF and MSEG will not contain data anymore (except legacy data from migration)', " +
          "שכתיבה לטבלה עדיין אפשרית טכנית אך 'such write operations are without any effect' ולכן יש " +
          "להסירה מקוד הלקוח, ש'Write operations on table MATDOC and your moved customer append fields are " +
          "done by class CL_NSDM_STOCK', ושיש להוסיף שדות מ-APPEND או INCLUDE של MKPF למבנה המשנה " +
          "NSDM_S_HEADER בטבלת MATDOC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "הקביעה נשארת בתוקף גם בתיעוד 2025 FPS01: סניפט העמוד קובע 'There is a new single table MATDOC " +
          "instead of the existing tables MKPF and MSEG', ובפרק Structure Tables 'You use the archiving " +
          "object MM_MATBEL to archive data from the following table: MATDOC (material documents)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רובד ההשפעה וההעשרה של הפרויקט עבור MKPF ושורת הפישוט MM-IM בדאטהסט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        sapNote: "2206980",
        accessedAt: DATE4,
        claim: "המאגר מתאר את MKPF ככותרת מסמך החומר עם המפתח MBLNR ו-MJAHR ועם השדות BLDAT, BUDAT ו-USNAM " +
          "(השדה XBLNR מופיע רק בתיאור המילולי שב-data/table-enrichment.ts ולא ברשימת השדות של הדאטהסט), " +
          "מסמן אותה כמוחלפת (s4AltTable 'MATDOC (MKPF=View תאימות)'), מייחס לה את תצוגת התאימות " +
          "NSDM_V_MKPF, וקושר אותה לשורת הפישוט 'Material Inventory Management - מודל נתונים חדש (MATDOC)' " +
          "עם SAP Note 2206980 בקטגוריה 'הוחלף (Replaced)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#MKPF (+ data/table-enrichment.ts#MKPF, data/sapData.pm.ts#MKPF ושורת הפישוט MM-IM/MATDOC)",
      },
    ],
    status: {
      status: "replaced",
      he: "כותרת מסמך החומר של מודל ECC. פריט הפישוט S4TWL - Data Model in Inventory Management (MM-IM) - " +
        "פריט 15.3.1 ברשימת הפישוט של 2025 FPS1 ופריט 27.5 ברשימת 2023 FPS3 - קובע שנתוני מסמך החומר " +
        "נשמרים ב-S/4HANA בטבלת MATDOC בלבד ולא עוד ב-MKPF וב-MSEG. הטבלה עצמה נשארת קיימת כהגדרת DDIC " +
        "וכאובייקט בבסיס הנתונים, קריאה ממנה מנותבת לתצוגת CDS proxy, וכתיבה אליה חסרת השפעה.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MKPF_SIMPL2025,
      successor: "obj:material-document",
      recommendedAction: "לקרוא את פריט הפישוט (15.3.1 ב-2025 FPS1, 27.5 ב-2023 FPS3) לפני ההמרה ולהפריד בין קריאה לכתיבה. " +
        "קריאה: SELECT מ-MKPF ממשיך להחזיר נתונים דרך ניתוב ה-proxy בשכבת ממשק בסיס הנתונים של NetWeaver, " +
        "ולכן קוד דיווח אינו נשבר; הפריט קובע ירידת ביצועים בקריאות מכלל הטבלאות המנויות בו בשל האגרגציה " +
        "בזמן ריצה ופעולת ה-JOIN, ולכן קוד קריטי לביצועים דורש בחינה. כתיבה: הפריט קובע שפעולות כתיבה " +
        "ל-MKPF עדיין אפשריות טכנית אך חסרות השפעה ויש להסירן מקוד הלקוח, ושכתיבה לטבלת MATDOC ולשדות " +
        "ה-append שהועברו אליה מתבצעת דרך המחלקה CL_NSDM_STOCK. Views של לקוח שהוגדרו מעל MKPF לא יחזירו " +
        "רשומות ויש להגדירם מחדש מול MATDOC. שדות מ-APPEND או INCLUDE על MKPF יש להוסיף למבנה המשנה " +
        "NSDM_S_HEADER בטבלת MATDOC בשלב ACT_UPG (SPDD), לפני שתוכנית ההמרה של MM-IM מעבירה את הנתונים, " +
        "אחרת הנתונים בשדות הלקוח אובדים.",
    },
    xrefs: [
      "table:MSEG", "obj:material-document", "tx:MIGO", "tx:MB03", "tx:MB51", "fm:BAPI_GOODSMVT_GETDETAIL",
      "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem",
    ],
    lastVerifiedAt: DATE4,
    notes: "הראיה הרשמית נשענת על שתי רשימות פישוט שנקראו כטקסט מלא מקובצי ה-PDF: 2023 FPS3 (פריט 27.5, עמ' 634 " +
      "ואילך, גרסת מסמך 1.35) ו-2025 FPS1 (פריט 15.3.1, עמ' 1459 ואילך, גרסת מסמך 1.36). נוסח הפריט זהה " +
      "בשתיהן לרבות שורת MKPF בטבלת הטבלאות המושפעות; ההבדל היחיד שנמצא הוא רכיב היישום, MM-IM-GF ב-2023 " +
      "לעומת MM-IM-GF-MIG ב-2025. שם תצוגת התאימות שבמאגר, NSDM_V_MKPF, אינו מופיע בשום נוסח רשמי שנקרא: " +
      "פריט הפישוט נוקב ב-NSDM_DDL_MKPF כמקור ה-DDL של תצוגת ההפניה וב-NSDM_MIG_MKPF כתצוגה לקריאת תוכן " +
      "הטבלה ללא ניתוב, והקשר בין מקור ה-DDL לבין שם תצוגה מסוג NSDM_V_MKPF נשאר פתוח. מספר SAP Note " +
      "2206980 צוטט מתוך מסמכי רשימת הפישוט עצמם; גוף ההערה לא נקרא כי me.sap.com דורש התחברות S-user. " +
      "היורש נרשם כ-obj:material-document, כמו ברשומת MSEG, מפני ש-table:MATDOC אינו מזהה ביקום המאגר. " +
      "הערת זהירות: עמוד Technical Data MM_MATBEL באותו deliverable עדיין נושא נוסח מתקופת ECC ('1000 MKPF " +
      "records, 1700 MSEG records') כדוגמת ריצת בדיקה, וזה שריד תיעוד ולא עדות לכך שהטבלה מאחסנת נתונים " +
      "ב-S/4HANA. גופי עמודי ה-Help לא נקראו (מעטפת JavaScript); כל טענה על עמוד Help תחומה בכותרת ובסניפט " +
      "של רשומת החיפוש.",
  },

  /* -------------------------------------------------------- table:AFVC */
  {
    id: "table:AFVC",
    evidence: [
      AFVC_JVA_NETWORK,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Operation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/60ade555aa3742b58cf83828022b6eac.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE4,
        claim: "עמוד ה-VDM 'Production Order Operation' (סט התיעוד 2023 Latest) קובע: 'This CDS view retrieves " +
          "production order operation data by internal key (tables AFVC, AFVV, AFVU)'. הסניפט נוקב בשם " +
          "הטכני 'CDS View Name I_ProductionOrderOperation_2' ומונה בין השדות המרכזיים של התצוגה את " +
          "OrderInternalID ('Order Internal ID') ואת OrderOperationInternalID ('Operation Internal ID'). " +
          "הוא נוקב בהזמנות ייצור בלבד; הזמנות תהליך אינן מוזכרות בו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "GPD Archiving ADK-Independent Deletion Phase (RGPDARCHPOST) | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/d3f4c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "מסמך המחיקה הרשמי של GPD לגרסת 2025 FPS01 מציג טבלה בשם 'Mechanism for Checking if Core Object " +
          "Exists' ובה השורה 'Network activity (NV)' עם 'Table to Check' = AFVC ו-'Fields to Check' = " +
          "'AUFPL & APLZL', לצד 'Production order (OR)' עם AFKO ו-AUFNR. כלומר AFVC היא טבלה נקראת ופעילה " +
          "בגרסה הנוכחית, והזיהוי של שורה בה נעשה בצמד AUFPL ו-APLZL.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Manage Maintenance Orders (Key User) | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/0b67655d18b7494baa813f1fa6caffb2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד ההרחבה הרשמי של אפליקציית Manage Maintenance Orders לגרסת 2025 FPS01 מונה את ההקשר העסקי " +
          "'Asset Management: Maintenance Order Operation (EAMS_AFVC)' עבור לשונית Operation Details ועבור " +
          "לשונית Operations and Resources של הפקודה. הסניפט נוקב בשם הטכני של ההקשר העסקי בלבד ואינו קובע " +
          "שטבלת AFVC היא מקור הנתונים שלו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "S4TWL - Changes In List Reports For Order and Notification | Simplification List for SAP " +
          "S/4HANA 2025 Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 Feature Pack Stack " +
          "1",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE4,
        claim: "רשימת הפישוט הרשמית של S/4HANA 2025 FPS01 (מסמך PDF ציבורי שהורד ונקרא ישירות), סעיף 4.1.7 " +
          "'S4TWL - Changes In List Reports For Order and Notification', רכיב יישום PM-WOC-MO, קובעת " +
          "בפעולות הנדרשות: 'Implement the notes if needed and run the reports QM_PHASE_FILL and " +
          "RIAFVC_IPHAS_FILL before the ugrade to SAP S/4HANA if not done yet' (שגיאת הכתיב ugrade היא " +
          "במקור), ומוסיפה: 'Within Enterprise Asset Management we plan to discontinue IW37, IW49 in a " +
          "future release. It is recommend to use transaction IW37n, IW49n instead'. הסעיף מציין 'No " +
          "influence on business processes expected' ומפנה להערה 0002270108. שם הדוח נושא את הקידומת " +
          "RIAFVC, אך המסמך אינו נוקב בטבלת AFVC ואינו מתאר אילו נתונים הדוח כותב.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת AFVC",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת מאגר מאומתת: AFVC היא פעולת ההזמנה (Operation within order) עבור הזמנות ייצור, תהליך " +
          "ואחזקה, עם מפתח MANDT/AUFPL/APLZL; AUFPL מקשר ל-AFKO, ARBID למרכז העבודה או למשאב (CRHD) " +
          "ו-STEUS למפתח הבקרה (T430); VORNR הוא מספר הפעולה המוצג למשתמש, והערכים והזמנים בפועל נשמרים " +
          "ב-AFVV הצמודה.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#AFVC",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "AFVC נמנית בסט S4_STABLE של המאגר: טבלאות ליבה של PM ו-PP-PI המסומנות במפורש יציבות ב-S/4HANA " +
          "(verified, low risk, ללא שינוי מודל).",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של PM, רשומת AFVC",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "חוברת ההגירה של PM מתארת את AFVC כ'פעולות הפקודה' / 'Order Operation', מסמנת s4Note 'מותאם " +
          "(תואם)', s4AltTable 'AFVC (זהה)', s4AltTcode 'IW32; Fiori Operations' והערת SUM: 'אין המרת טבלה " +
          "הרסנית, אך מודל הנתונים מותאם - הרץ Regression Test ובדוק User Exits/דוחות מותאמים.'; " +
          "הטרנזקציות הן IW31/IW32/IW33, IW37N ו-CM01, והממשקים BAPI_ALM_ORDER_MAINTAIN " +
          "(METHOD=OPERATION), CO_ZF_OPERATIONS_READ והדוח RIAFVC00. הטבלה החליפית שהחוברת נוקבת בה היא " +
          "AFVC עצמה.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#AFVC",
      },
      {
        sourceType: "repository",
        sourceTitle: "blueprint ההגירה של PP-PI, רשומת AFVC",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "חוברת ההגירה של PP-PI מתארת את AFVC כ'פעולות הפקודה', מסמנת s4Note 'מותאם (תואם).' וסטטוס הגירה " +
          "'Not started', עם הטרנזקציות COR2, COR3 ו-CA02 וההסבר 'פעולות/פאזות הפק\"ע (מועתקות מהמתכון). " +
          "מפתח בקרה קובע דיווח/הוראות תהליך. בסיס לדיווח ביצוע (CORK) ולתמחיר.'. רשומה זו אינה נוקבת " +
          "בטבלה חליפית ואינה נושאת הערת SUM.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#AFVC",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת AFVC (פעולות הפקודה) פעילה ב-SAP S/4HANA On-Premise עד 2025 FPS01 ואין לה טבלה חליפית. תיעוד " +
        "ה-JVA לגרסת 2025 FPS01 מגדיר אותה כטבלת הבסיס של תצוגת החילוץ BIW_JV_AFVC, מסמך מחיקת ה-GPD " +
        "ב-Project System מונה אותה כ'Table to Check' לפעילות רשת עם 'Fields to Check' AUFPL ו-APLZL, " +
        "ותצוגת ה-VDM 'Production Order Operation' (סט התיעוד 2023 Latest, שם טכני " +
        "I_ProductionOrderOperation_2) קוראת ממנה נתוני פעולה של הזמנת ייצור יחד עם AFVV ו-AFVU. בצד " +
        "תחזוקת מפעל, המקור הרשמי היחיד שנמצא הוא ההקשר העסקי להרחבת מפתח-על 'Asset Management: " +
        "Maintenance Order Operation (EAMS_AFVC)' באפליקציית Manage Maintenance Orders, והוא אינו קובע " +
        "במפורש שהטבלה היא מקור הנתונים. השימוש בפעולות ובפאזות של הזמנות תהליך (תעשיות תהליכיות) מתועד " +
        "ברובד המאגר בלבד (חוברת ההגירה של PP-PI); אף סניפט רשמי שנבדק אינו מקשר את AFVC להזמנות תהליך. אף " +
        "מקור רשמי אינו נוקב ביורשת, בהוצאה משימוש או בשינוי מבני של הטבלה. רשימת הפישוט של 2025 FPS01 " +
        "אינה כוללת פריט פישוט על הטבלה עצמה; הפריט היחיד שנמצא בהקשר הזה הוא S4TWL על דוחות הרשימה של " +
        "פקודות והודעות (PM-WOC-MO), שדורש הרצת QM_PHASE_FILL ו-RIAFVC_IPHAS_FILL לפני ההסבה ומכריז על " +
        "כוונה להפסיק את IW37 ו-IW49 לטובת IW37N ו-IW49N.",
      edition: "on-premise",
      release: "2025.001",
      source: AFVC_JVA_NETWORK,
      recommendedAction: "להמשיך לעבוד מול AFVC כטבלת הפעולות של הזמנות ייצור, תהליך ואחזקה, בצירוף AFVV לערכים ולזמנים; " +
        "אין פעולת הסבה לטבלה עצמה. לצריכה אנליטית ולפיתוח חדש להעדיף את תצוגת ה-CDS הרשמית Production " +
        "Order Operation (שם טכני I_ProductionOrderOperation_2 לפי עמוד ה-VDM) על פני SELECT ישיר, ולקוד " +
        "שרץ על פעולות של הזמנות אחזקה או תהליך לאמת במערכת (SE11 ו-Where-Used) איזו תצוגה או API רשמיים " +
        "מכסים את התרחיש לפני שמסירים גישה ישירה. בהתאם להערת ה-SUM של חוברת PM, להריץ Regression Test על " +
        "קוד מותאם, User Exits ודוחות (למשל RIAFVC00) הקוראים AFVC ישירות. להרחבת שדות באפליקציות Fiori של " +
        "הזמנות אחזקה לבדוק את ההקשר העסקי EAMS_AFVC במקום להוסיף שדה Z ישירות לטבלה. לפני ההסבה לבצע את " +
        "הפעולה שרשימת הפישוט מחייבת בסעיף 4.1.7: הרצת הדוחות QM_PHASE_FILL ו-RIAFVC_IPHAS_FILL, ומעבר " +
        "מ-IW37 ו-IW49 ל-IW37N ו-IW49N.",
    },
    xrefs: [
      "table:AFKO", "table:AFPO", "table:AFFL", "table:AUFK", "table:CRHD", "table:AFIH", "table:RESB",
      "tx:IW31", "tx:IW32", "tx:IW37N", "tx:IW49N", "tx:COR2", "tx:CA02", "tx:CM01",
      "cds:I_ProductionOrderOperation", "fm:BAPI_ALM_ORDER_MAINTAIN", "fm:CO_ZF_OPERATIONS_READ",
      "fiori:F2731", "fiori:F2336", "fiori:F3577",
    ],
    lastVerifiedAt: DATE4,
    notes: "ארבע רשומות חיפוש רשמיות (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE) הוחזרו מחדש " +
      "ב-2026-09-15 עם אותם loio ו-versionId: JVA d6328a535af43d58e10000000a174cb4 (2025.001), GPD/PS " +
      "d3f4c353b677b44ce10000000a174cb4 (2025.001), הרחבת Manage Maintenance Orders " +
      "0b67655d18b7494baa813f1fa6caffb2 (2025.001) ו-VDM של Production Order Operation " +
      "60ade555aa3742b58cf83828022b6eac (2023.latest). הרצת החיפוש החוזרת היא האימות; קוד תשובה HTTP על " +
      "הכתובת אינו הוכחה, משום שמעטפת ה-deliverable מחזירה 200 גם ל-loio שאינו קיים. לא נטען שום מספר SAP " +
      "Note או KBA בשדה ייעודי; מספרי ההערות שבסעיף רשימת הפישוט (0002270108, 393393, 551133) מצוטטים בתוך " +
      "טקסט הראיה כלשונם במסמך הרשמי בלבד. מסמך רשימת הפישוט SIMPL_OP2025.pdf הורד מ-help.sap.com " +
      "ב-2026-09-15 (1,514 עמודים, Document Version 1.36) וטקסט הסעיף חולץ ונקרא; הקישור בין הדוח " +
      "RIAFVC_IPHAS_FILL לטבלת AFVC נשען על שם הדוח בלבד, המסמך אינו נוקב בטבלה, ומה שהדוח כותב בפועל דורש " +
      "בדיקה ב-SE38 או את גוף הערה 0002270108. האימות שרשימת הפישוט אינה נושאת פריט על הטבלה עצמה נעשה " +
      "בחיפוש טקסט מלא במסמך שהורד: המחרוזת AFVC מופיעה בו פעם אחת בלבד, בתוך שם הדוח RIAFVC_IPHAS_FILL. " +
      "הבדל שם: קטלוג ה-CDS של המאגר נוקב ב-I_ProductionOrderOperation, ואילו עמוד ה-VDM הרשמי שצוטט נוקב " +
      "ב-'CDS View Name I_ProductionOrderOperation_2'; ה-xref נשאר cds:I_ProductionOrderOperation משום " +
      "שזהו המזהה הקיים באוניברסום (I_ProductionOrderOperation_2 אינו קיים בו), והטקסט נוקב בשם שהעמוד " +
      "הרשמי נושא. עמוד ה-VDM של Manufacturing Order Operation (loio afa5a1dc1d81424784b89e079cec0b48) " +
      "מפנה ל-'Deprecated and Decommissioned CDS Views' ולכן לא צוטט. סתירה פנימית במאגר: שתי חוברות " +
      "ההגירה פותחות ב'מותאם', ולכן המפה של האפליקציה גוזרת כיום 'משתנה ב-S/4HANA' (class 1, derivedFrom " +
      "blueprint), בעוד S4_STABLE מסמן יציבות; נבחר 'ללא שינוי' משום שאף מקור רשמי אינו נוקב בשינוי מבני, " +
      "באותו שיקול שנרשם ל-AFKO ול-AFPO, והסתייגות ה-SUM נשמרת בפעולה המומלצת. הבדל בין החוברות: רק חוברת " +
      "PM נושאת s4AltTable 'AFVC (זהה)' והערת SUM, בעוד רשומת PP-PI נושאת s4Note 'מותאם (תואם).' וסטטוס " +
      "הגירה בלבד. פערים: AFVV ו-AFVU נקובות בסניפטים הרשמיים לצד AFVC אך אינן קיימות באוניברסום " +
      "האובייקטים של המאגר, ולכן אינן מקושרות; עמודי ה-VDM של פעולת ההזמנה מאונדקסים בשירות החיפוש רק " +
      "בגרסת 2023 Latest (שאילתה מפורשת ב-version 2025.001 החזירה את Production Order Header בלבד), ולכן " +
      "הראיה נושאת release 2023.latest; עמוד הארכוב PM_ORDER (15e1b6531de6b64ce10000000a174cb4) מונה " +
      "'Operations' בין הנתונים המאורכבים אך הסניפט שלו אינו נוקב ב-AFVC ולכן לא צוטט; עמוד הארכוב של " +
      "Project System PS-ST-OPR (87d0b6531de6b64ce10000000a174cb4, 2025.001) כן נוקב ב-AFVC לצד AFVU " +
      "ו-AFVV במחלקת הארכוב PS_ORDER, אך הוא Project System ולא תחזוקת מפעל ולכן לא צוטט; EAMS_AFVC הוא שם " +
      "טכני של הקשר עסקי ולא הצהרה על טבלה; טיפוסי DDIC ואורכים לא אומתו מול מערכת חיה (חיבור sc4sap נכשל " +
      "בשלב זה) וקיים פער בין החוברות: PP-PI נוקבת בטיפוסים ובאורכים (AUFPL NUMC 10, APLZL NUMC 8, VORNR " +
      "CHAR 4, ARBID NUMC 8, STEUS CHAR 4, LTXA1 CHAR 40) ומסמנת STEUS כ-FK, בעוד PM משאירה את שדות הטיפוס " +
      "והאורך ריקים ומסמנת STEUS כלא-מפתח; המיפוי STEUS אל T430 קיים ברובד המאגר בלבד ו-T430 אינה טבלה " +
      "במאגר; חוברת PM נוקבת ב-'Find Maintenance Order (F2393)', מזהה שאין לו רשומה רשמית ואין לו ערך " +
      "ב-data/fiori/apps.ts, ולכן לא הוצג; הקישור ל-F2731, F2336 ו-F3577 הוא ברמת המאגר " +
      "(data/fiori/apps.ts, curated) והעמוד הרשמי נוקב בשם האפליקציה ולא במזהה; מהדורת S/4HANA Cloud " +
      "Public Edition לא נבדקה.",
  },

  /* -------------------------------------------------------- table:COSP */
  {
    id: "table:COSP",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.1.4 S4TWL - DATA MODEL " +
          "CHANGES IN FIN (FI-GL), p. 159, 160, 163",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE4,
        claim: "פריט הפישוט 6.1.4 S4TWL - DATA MODEL CHANGES IN FIN (Application Component: FI-GL), שנקרא " +
          "ישירות מקובץ ה-PDF, קובע בעמ' 160: 'With the installation of SAP Simple Finance, on-premise " +
          "edition totals and application index tables were removed and replaced by identically-named DDL " +
          "SQL views, called compatibility views'. בטבלת המיפוי שבאותו עמוד, תחת הכותרות Original Table, " +
          "Compatibility View (identically-named view in DDIC), DDL Source (for the identically-named DDIC " +
          "View) ו-Backup Table (for original table content), מופיעה השורה: COSP, COSP, V_COSP_DDL, " +
          "COSP_BAK. אותו פריט מוסיף: 'The compatibility views ensure database SELECTs work as before. " +
          "However, write access (INSERT, UPDATE, DELETE, MODIFY) was removed from SAP standard, or has to " +
          "be removed from custom code'. בעמ' 163, בטבלת תצוגות ה-DDIC הישנות שהוחלפו, מופיעה השורה " +
          "Original DDIC database view: V_COSP_A, Obsolete database table used: COSP, As of release: sFIN " +
          "1.0, Replaced by: Code. הפריט מפנה ל-Business Impact note 0002270333 'Data Model Changes in " +
          "FIN' ול-SAP note 1976487; שני המספרים מצוטטים כלשונם מהמסמך הציבורי ולא נקראו בפועל.",
        verificationLevel: "sap_official_verified",
      },
      COSP_SIMPL2025_CO,
      {
        sourceType: "sap_help",
        sourceTitle: "Validation Phase 3: Fully Distributed Rule | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/c1f4c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "רשומת החיפוש הרשמית (loio c1f4c353b677b44ce10000000a174cb4, גרסה 2025 FPS01) נוקבת בשם הרשמי של " +
          "הטבלה ובאופן הקריאה ממנה: 'Production order cost balance is be checked based on tables COSP (CO " +
          "Object: Cost Totals for External Postings) and COSS (CO Object: Cost Totals for Internal ...)', " +
          "וכן 'The process adds up costs in controlling area currency (fields WKG*) for all periods and " +
          "all years for both COSP and COSS'. הסניפט מקוצר במקור, ולכן מאומתים ממנו רק השם הרשמי, שיוך " +
          "משפחת השדות WKG* למטבע אזור הבקרה, והעובדה שתיעוד 2025 עדיין מורה לקרוא את מאזן העלויות של " +
          "הזמנת ייצור מ-COSP ו-COSS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Universal Journal: FAQ | General Ledger Accounting (FI-GL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/651d8af3ea974ad1a4d74449122c620e/8b8e5695c4dc4749a706f9fa2f6bda92.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "רשומת החיפוש הרשמית (loio 8b8e5695c4dc4749a706f9fa2f6bda92, גרסה 2025 FPS01) מכילה, בתוך רשימה " +
          "קטועה, את הפרגמנט 'The actual data of the Controlling tables: COEP, COSS, COSP', ומוסיפה: 'The " +
          "data for statistical postings and target data remain in the tables COEP, COSS, and COSP'. רשימת " +
          "הטבלאות בסניפט קטועה במקור (הפרגמנט נפתח באמצע רצף המסתיים ב-FMGLFLEXA ו-FMGLFLEXT), ולכן " +
          "הציטוט מוגבל לשתי האמירות האלה בלבד.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "replaced",
      he: "רשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 קובעת בפריט 6.5.1 (CO-OM): 'The former tables COEP, " +
        "COSP, and COSS are replaced by views of the same name, so-called compatibility views, that " +
        "aggregate the data in the universal journal on the fly'. כלומר השם COSP שורד ב-S/4HANA כתצוגת " +
        "תאימות מעל ACDOCA ולא כטבלה פיזית: תוכן הטבלה המקורית הועבר ל-COSP_BAK, נתוני הבפועל הדרושים " +
        "להזמנות ולפרויקטים ארוכי טווח נשמרים ב-ACDOCA, וגישת כתיבה (INSERT, UPDATE, DELETE, MODIFY) הוסרה " +
        "מהסטנדרט. סוגי ערך שאינם 04 ו-11 עדיין נשמרים ב-COSP_BAK, ולפי עמוד ה-FAQ של היומן האוניברסלי " +
        "רישומים סטטיסטיים ונתוני יעד נותרים בטבלאות COEP, COSS ו-COSP. טרנזקציות הבקרה הקלאסיות ממשיכות " +
        "לפעול, חלקן דרך תצוגות התאימות וחלקן בגישה ישירה ל-ACDOCA.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: COSP_SIMPL2025_CO,
      successor: "table:ACDOCA",
      recommendedAction: "להתייחס ל-ACDOCA כמקור האמת לעלויות בפועל של אובייקטי CO - ובכללם פקודות אחזקה ופקודות תהליך, " +
        "שאינן נקובות במפורש בפריט, שנוסח ברמת רכיב CO-OM - ולבצע את הפעולה שרשימת הפישוט מגדירה מילולית: " +
        "לסרוק את התוכניות המותאמות שקוראות טבלאות CO ולהחליף גישה דרך תצוגות התאימות בגישה ישירה ל-ACDOCA " +
        "עבור סוגי ערך 04 ו-11. כל כתיבה ל-COSP בקוד Z (INSERT, UPDATE, DELETE, MODIFY) חייבת לרדת, שכן " +
        "היא הוסרה מהסטנדרט. דוחות מותאמים שנשענים על SELECT ישיר מ-COSP ימשיכו לעבוד דרך תצוגת התאימות אך " +
        "עלולים להיפגע בביצועים, ולכן כדאי לבחון מולם את דוחות ה-Fiori החדשים. עבור סוגי ערך שאינם 04 " +
        "ו-11, וכן עבור רישומים סטטיסטיים ונתוני יעד, נדרשת בדיקה נפרדת לפני שמניחים שהנתון נמצא ב-ACDOCA.",
    },
    xrefs: [
      "table:ACDOCA", "table:COSS", "table:AUFK", "tx:KO88", "tx:KOB1",
    ],
    lastVerifiedAt: DATE4,
    notes: "שתי ראיות הפישוט נקראו בפועל מקובץ ה-PDF הרשמי SIMPL_OP2025.pdf שהורד מ-help.sap.com (1,514 עמודים, " +
      "Document Version 1.36), ולא מעמוד נושא מבוסס JavaScript; מספרי העמודים בציטוטים נגזרו מכותרות " +
      "התחתית של המסמך עצמו. קטלוג פריטי הפישוט (launchpad.support.sap.com/#/sic) ומספרי ה-SAP Note " +
      "שהפריטים מפנים אליהם (0002270333, 0002270404, 2185026, 1976487) דורשים משתמש S; המספרים מצוטטים " +
      "כלשונם מהמסמך הציבורי, גופי ההערות לא נקראו, ואף קביעה ברשומה אינה נשענת עליהם. המספר 2270404 מופיע " +
      "גם בסניפט הרשמי של העמוד Table COEP (Data Archiving in Controlling, loio " +
      "0705d65223141842e10000000a44176d, גרסה 2025 FPS01) בנוסח 'For more information, see SAP Note " +
      "2270404', ולכן קיומו כמספר הערה ציבורי נתמך במקור רשמי נוסף; תוכנו עדיין לא נקרא. קיים מתח ניסוח " +
      "בין המקורות הרשמיים עצמם: עמודי ה-Help של 2025 (פרויקטים, תחזוקת מפעל, ארכוב CO) ממשיכים לכנות את " +
      "COSP 'table' ולהורות לקרוא ממנה, בעוד רשימת הפישוט מגדירה אותה כתצוגת תאימות מעל היומן האוניברסלי; " +
      "שני הניסוחים הובאו כלשונם ולא אוחדו. מתח דומה קיים סביב מקום השמירה של השאריות: עמוד ה-FAQ כותב " +
      "שרישומים סטטיסטיים ונתוני יעד נשארים ב-COEP, COSS ו-COSP, ואילו פריט 6.5.1 כותב שסוגי ערך שאינם 04 " +
      "ו-11 נשמרים ב-COEP, COSP_BAK ו-COSS_BAK. רובד המאגר עולה בקנה אחד עם הראיות הרשמיות ואינו סותר " +
      "אותן: data/table-enrichment.ts#COSP כבר קובע 'COSP/COSS הן תצוגות תאימות (compatibility views) מעל " +
      "Universal Journal - ACDOCA', ושורת ה-blueprint ב-data/sapData.pm.ts רושמת s4Note 'הוחלף - עלויות " +
      "ב-Universal Journal' ו-s4AltTable 'ACDOCA (COSP=View תאימות)'. הסטטוס הנגזר של האפליקציה היום הוא " +
      "'הוחלף' ללא יורש, כי lib/s4-class נוטל את היורש רק מתא s4AltTable שהוא שם טבלה נקי והתא הזה מכיל " +
      "פרוזה; הרשומה המחוברת כאן מוסיפה את היורש המאומת table:ACDOCA. בריצות החיפוש אותר גם עמוד רשמי " +
      "בתחום תחזוקת מפעל, 'Example: Cost Distribution on Time Axis and in PMIS/SMIS' (Maintenance " +
      "Management, 2025.001, loio 5673b6535fe6b74ce10000000a174cb4), הקושר את רשומות הסכום ב-COSP ו-COSS " +
      "לטבלת PMCO; הוא לא נכלל ברשימת הראיות משום שאינו מוסיף קביעה מעבר לארבע הראיות שנבחרו, ומופיע כאן " +
      "כהפניה בלבד. אפליקציית ה-Fiori שרשומה ב-blueprint ('Maintenance Order Actuals') נותרה ללא אימות ולא " +
      "נוסף xref מסוג fiori.",
  },

  /* -------------------------------------------------------- table:COSS */
  {
    id: "table:COSS",
    evidence: [
      COSS_UNIV_JOURNAL_FAQ,
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Background Information | Time Data Recording and Administration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7c1ef52f3fea49d1944b266772379e52/85e0e353a53d424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "התיעוד הרשמי נוקב בשם המלא של הטבלה, 'COSS ( CO Object: Cost Totals for Internal Postings )', " +
          "וקובע 'Tables COSS and COSL contain the period totals of all the actual postings to a CO " +
          "object'. באותה רשימה מופיעות גם COEP ('CO Object: Line Items (by Period)') ו-COSL ('CO Object: " +
          "Activity Type Totals').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Validation Phase 3: Fully Distributed Rule | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/c1f4c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד Validation Phase 3: Fully Distributed Rule בדליברבל Project System, גרסת 2025 FPS01, מתאר " +
          "בדיקת יתרת עלות של הזמנת ייצור 'based on tables COSP (CO Object: Cost Totals for External " +
          "Postings) and COSS (CO Object: Cost Totals for Internal ...)', ומציין שהתהליך מסכם עלויות במטבע " +
          "אזור הבקרה 'fields WKG*' לכל התקופות וכל השנים 'for both COSP and COSS'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Example: Cost Distribution on Time Axis and in PMIS/SMIS | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5673b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "דליברבל תחזוקת מפעל (Maintenance Management) לגרסת 2025 FPS01 קובע לגבי הזמנת אחזקה ושירות: 'In " +
          "cost accounting (totals records in the tables COSP or COSS) and in Plant Maintenance/Customer " +
          "Service (table PMCO), the costs are posted in the value fields intended for the relevant " +
          "periods', ומדגים ש'The costs of the posting period 01 are posted to the cost accounting tables " +
          "named above (COSS and COSP) and to the table PMCO'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת COSS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת מאגר מאומתת: COSS היא סך העלויות לרישומים פנימיים ב-CO (הקצאות פנימיות, אישורי פעילות " +
          "והעברות פנימיות, כלשון הרשומה), המפתח הוא MANDT, LEDNR, OBJNR, GJAHR, WRTTP, VERSN, KSTAR, השדה " +
          "OBJNR מקשר אל אובייקט ה-CO (AUFK או CSKS) ו-KSTAR אל סוג עלות משני (CSKB). המבנה התקופתי זהה " +
          "ל-COSP, ואישור ייצור או אחזקה (CO11N, IW41) מזין את COSS דרך הקצאת פעילות.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#COSS",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של תחזוקת מפעל (PM), שורת COSS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "שורת הבלופרינט נושאת descriptionEn 'CO object cost totals - internal postings', עמודת S/4 " +
          "'הוחלף - עלויות ב-Universal Journal', טבלה חלופית 'ACDOCA (COSS=View תאימות)', הערת SUM לפיה " +
          "'COSP/COSS הופכים ל-Views', טרנזקציות KO88 ו-KOB1, הפונקציה K_COSTS_READ וקשר ילד אל AUFK דרך " +
          "OBJNR. תא ה-Fiori בשורה נותר 'Maintenance Order Actuals (אמת ID)', כלומר המקור עצמו מבקש לאמת " +
          "את המזהה.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#COSS",
      },
    ],
    status: {
      status: "changed",
      he: "טבלת COSS, סך העלויות לרישומים פנימיים של אובייקט CO, קיימת ב-SAP S/4HANA On-Premise נכון ל-2025 " +
        "FPS01 ומופיעה בתיעוד הרשמי של תחזוקת מפעל (Maintenance Management), של Project System ושל General " +
        "Ledger Accounting, אך מודל הנתונים סביבה השתנה: לפי עמוד ה-FAQ הרשמי של ה-Universal Journal, " +
        "נתוני הבפועל של טבלאות ה-CO COEP, COSS ו-COSP מוכלים כעת במלואם ב-ACDOCA, בעוד שרישומים סטטיסטיים " +
        "ונתוני יעד (target data) נותרים בטבלאות COEP, COSS ו-COSP. אין מקור רשמי שמכריז על הסרת הטבלה או " +
        "על טבלה יורשת יחידה.",
      edition: "on-premise",
      release: "2025.001",
      source: COSS_UNIV_JOURNAL_FAQ,
      recommendedAction: "לקרוא עלויות בפועל של הזמנות אחזקה וייצור מ-ACDOCA או מתצוגות CDS אנליטיות, ולא בגישה ישירה " +
        "ל-COSS. במיפוי הקוד המותאם והממשקים יש לאתר כל SELECT ישיר מ-COSS, לקבוע אם הוא שולף בפועל או " +
        "נתונים סטטיסטיים ונתוני יעד (שלפי התיעוד הרשמי נותרים בטבלה), ולתעדף המרה לפי ההבחנה הזו. את " +
        "הטענה שבנתוני הפרויקט לפיה COSS הפכה לתצוגת תאימות מעל ACDOCA יש לאמת ב-SE11 או מול נוסח פריט " +
        "הפישוט לפני שמסתמכים עליה בתכנון ההסבה.",
    },
    xrefs: [
      "table:COSP", "table:ACDOCA", "table:AUFK", "tx:KO88", "tx:KOB1", "fm:K_COSTS_READ",
    ],
    lastVerifiedAt: DATE4,
    notes: "הסטטוס הנגזר מהבלופרינט הוא 'הוחלף' ללא טבלה יורשת (עמודת s4AltTable נושאת פרוזה, 'ACDOCA " +
      "(COSS=View תאימות)', ולכן ה-mapper אינו מייצר successor). הרשומה נכתבת כ'משתנה' ולא כ'הוחלף' משום " +
      "שעמוד ה-FAQ הרשמי קובע שרישומים סטטיסטיים ונתוני יעד נותרים ב-COSS, כלומר הטבלה אינה מרוקנת. הטענה " +
      "שבמאגר לפיה COSS היא תצוגת תאימות מעל ACDOCA לא אומתה: חיפוש בדליברבל Data Archiving in Controlling " +
      "(CO) מחזיר עמוד 'Table COEP' (loio 0705d65223141842e10000000a44176d, 2025.001) שקובע 'Table COEP " +
      "was replaced by views of the same name, so-called compatibility views that aggregate the data in " +
      "the universal journal on the fly', אך לא נמצא עמוד מקביל ל-COSS, ולכן הניסוח הזה לא הועבר אליה. " +
      "קיים מתח בין שני עמודים רשמיים באותה גרסה: 'Technical Background Information' בדליברבל Time Data " +
      "Recording and Administration קובע ש-COSS ו-COSL מחזיקות את סכומי התקופה של כל הרישומים בפועל, בעוד " +
      "ה-FAQ מייחס את נתוני הבפועל ל-ACDOCA; שני העמודים צוטטו כלשונם ולא אוחדו לפרשנות אחת. עמוד תחזוקת " +
      "מפעל שצוטט הוא תוכן קלאסי שהועבר לגרסה הנוכחית (הדוגמה שבו מתוארכת ל-2005), והוא מאשר את זרימת " +
      "העלויות אל COSS ואל PMCO ולא את מודל האחסון ב-S/4HANA. מבנה המפתח והשדות של COSS מגיע מנתוני " +
      "הפרויקט בלבד; אף סניפט רשמי אינו מונה את שדות המפתח, פרט לשדות WKG* שנזכרים בעמוד ה-PS. לא נטען " +
      "מספר SAP Note עבור COSS (מספר ההערה שמופיע בעמוד ה-COEP שייך ל-COEP). לא נטען מזהה Fiori: התא " +
      "בבלופרינט מבקש אימות, ואין רשומה תואמת ב-data/fiori/apps.ts. table:ACDOCA ו-table:COSP נמצאים " +
      "ב-xrefs; COSL, COEP ו-PMCO נזכרים בראיות אך אינם ב-xrefs כי אין להם מזהה בר-פענוח בדאטהסט.",
  },

  /* -------------------------------------------------------- table:AFRU */
  {
    id: "table:AFRU",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order Confirmation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/9b73f9c31a964ffebc5aa07aa0ec69fa.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE4,
        claim: "עמוד ה-VDM של I_MfgOrderConfirmation (סט התיעוד 2023 Latest) קובע: 'With this CDS view, you can " +
          "retrieve manufacturing order confirmation data (table AFRU)', והאובייקטים הקשורים הנקובים " +
          "בסניפט הם 'Process Order Confirmation (Business Object)' ו-'Production Order Confirmation " +
          "(Business Object)'. כלומר AFRU היא טבלת המקור לאישורי הזמנות ייצור ולאישורי הזמנות תהליך " +
          "(תעשיות תהליכיות) ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Background Information | Time Data Recording and Administration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7c1ef52f3fea49d1944b266772379e52/85e0e353a53d424de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "תיעוד Time Data Recording and Administration (גיליון הזמן) לגרסת 2025 FPS01 נוקב ב-AFRU כטבלת " +
          "היעד של האישורים בשני רכיבים: 'Plant Maintenance/Customer Service AFRU (Order Completion " +
          "Confirmations)' ו-'Project System AFRU (Order Completion Confirmations)'. הסניפט מוסיף כי " +
          "נתונים שגויים בהעברה נשמרים בטבלאות 'Confirmations with errors AFRH, AFRV'. זהו כיסוי רשמי של " +
          "AFRU לאישורי תחזוקת מפעל ושירות בגרסה הנוכחית.",
        verificationLevel: "sap_official_verified",
      },
      AFRU_PP_CUSTOM_FIELDS,
      {
        sourceType: "sap_help",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 initial shipment, Feature Pack Stack 1-3 (White Paper, " +
          "Document Version 1.35, 2025-02-25)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE4,
        claim: "מסמך רשימת הפישוט הרשמי (1,482 עמודים) הורד ונקרא מקומית: המחרוזת 'AFRU' אינה מופיעה בו כלל, " +
          "בעוד 'AFKO' מופיעה בו ארבע פעמים בהקשר מיפוי שדות. ממצא שלילי: לא נמצא במסמך פריט פישוט " +
          "(Simplification Item) הנוגע לטבלת AFRU עבור S/4HANA 2023 ו-S/4HANA Cloud Private Edition 2023.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת AFRU (אישורי פקודה, Order Completion Confirmations) פעילה ב-S/4HANA On-Premise נכון לגרסת " +
        "2025 FPS01, ולא אותרה עבורה טבלה חליפית במקורות שנבדקו. תיעוד PP לגרסה זו מנחה להרחיב את AFRU " +
        "עצמה דרך ה-include CI_AFRU ב-SE11, תיעוד Time Data Recording and Administration נוקב בה כטבלת " +
        "האישורים של תחזוקת מפעל ושירות ושל Project System, ותצוגת ה-VDM I_MfgOrderConfirmation קוראת ממנה " +
        "אישורי הזמנות ייצור והזמנות תהליך. רשימת הפישוט הרשמית ל-2023 אינה מזכירה את AFRU, ולא נמצא מקור " +
        "רשמי הנוקב ביורשת, בהוצאה משימוש או בשינוי מבני של הטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: AFRU_PP_CUSTOM_FIELDS,
      recommendedAction: "להמשיך לעבוד מול AFRU כטבלת האישורים של הזמנות ייצור, הזמנות תהליך והזמנות תחזוקת מפעל; אין פעולת " +
        "הסבה לטבלה עצמה. לצריכה אנליטית ולפיתוח חדש להעדיף את תצוגות ה-CDS הרשמיות " +
        "(I_ProductionOrderConfirmation לאישורי הזמנת ייצור, I_MfgOrderConfirmation לאישורי ייצור ותהליך) " +
        "על פני SELECT ישיר מ-AFRU. לפני ההסבה לבדוק ב-SE11 אילו שדות לקוח קיימים ב-CI_AFRU ולוודא שהם " +
        "נשמרים, ולהריץ Regression Test על תוכניות Z, User Exits ו-BAdI של אישורים הקוראים או כותבים AFRU " +
        "ישירות, כולל זרימת ה-Backflush ורשומות השגיאה (AFRH/AFRV, COGI). הערת הבלופרינט של הפרויקט לטבלה " +
        "היא שעלויות בפועל נרשמות ב-ACDOCA; המקורות הרשמיים שנבדקו כאן אינם עוסקים בכך, ולכן דוחות עלות " +
        "שמצליבים AFRU עם טבלאות CO מסכמות דורשים בדיקה נפרדת.",
    },
    xrefs: [
      "table:AFKO", "table:AUFK", "table:AFVC", "table:AFWI", "tx:CO11N", "tx:COR6N", "tx:CO15", "tx:CORK",
      "tx:CO13", "tx:COGI", "tx:IW41", "tx:IW44", "cds:I_ProductionOrderConfirmation",
      "fm:BAPI_PROCORDCONF_CREATE_TT", "fm:BAPI_ALM_CONF_CREATE", "fiori:F3364", "fiori:F2730",
    ],
    lastVerifiedAt: DATE4,
    notes: "ארבע ראיות רשמיות, כולן נגישות ב-2026-09-15 ומחזירות HTTP 200: שלוש רשומות חיפוש של help.sap.com " +
      "(scripts/sap-help-search.mjs, SAP_S4HANA_ON-PREMISE) ומסמך PDF רשמי שהורד ונקרא מקומית. רק סניפטים " +
      "רשמיים ומה שנקרא במסמך שימשו לניסוח; לא נטען שום מספר SAP Note או KBA. מקורות רשמיים נוספים שנמצאו " +
      "ולא נכללו כראיה: 'Production Order Confirmation | Virtual Data Model and CDS Views' (loio " +
      "5e053c432869473e9cdea33d7e0118c0, 2023.latest) הקובע 'This CDS view retrieves production order " +
      "confirmation data (table AFRU)'; 'PS/PM/CS: Creating an Index for Table AFRU' (loio " +
      "9e1bdd5321e8424de10000000a174cb4, 2025.001) שסניפטו קובע 'The index in table AFRU is not active in " +
      "the standard system' ו-'confirmations from the Production Planning and Control (PP) component are " +
      "also saved in table AFRU'; ו-'Archiving Confirmation Documents (PP-REM)' (loio " +
      "d0a4b9537cceb44ce10000000a174cb4, 2025.001) המונה 'AFRU Pool of confirmations' באובייקט הארכוב " +
      "PP_BKFLUSH. רקע מאגר: הבלופרינט של PP-PI מסמן את AFRU 'ללא שינוי; עלויות ב-ACDOCA' עם הטרנזקציות " +
      "CORK/COR6N/CO11N/CO15 (data/sapData.pppi.ts#AFRU), AFRU נמנית בסט S4_STABLE " +
      "(data/s4-impact.ts#S4_STABLE), ורשומת ההעשרה מתארת מפתח MANDT/RUECK/RMZHL " +
      "(data/table-enrichment.ts#AFRU); לכן המפה של האפליקציה גוזרת כבר היום 'ללא שינוי' (derivedFrom " +
      "blueprint) והרשומה הזו מעלה את דרגת האימות למקור רשמי בלי לשנות את הפסיקה. בלופרינט ה-PM אינו מכיל " +
      "את AFRU כטבלה עצמאית (רק AFWI ותוכנית RIAFRU00), ולכן הכיסוי לתחזוקת מפעל נשען כאן על התיעוד הרשמי. " +
      "פערים: פירוט שדות ה-DDIC של AFRU (LMNGA, XMNGA, ISMNW, STOKZ ועוד) לא אומת מול מערכת חיה (חיבור " +
      "sc4sap נכשל) ונשאר ברמת אימות המאגר; רשימות הפישוט של 2025 ושל S/4HANA Cloud Public Edition לא " +
      "נבדקו, ולכן ההיעדר נבדק מול מסמך 2023 בלבד (ניסיון על תבנית הכתובת של אותו doc id לגרסת 2025 החזיר " +
      "HTTP 403); קטלוג פריטי הפישוט (SIC) דורש חשבון S-user ולא נפתח; מזהי ה-Fiori ב-xrefs (F3364, F2730) " +
      "מגיעים מ-data/fiori/apps.ts ברמת המאגר ולא אומתו מול Fiori Apps Reference Library. התצוגה " +
      "I_MfgOrderConfirmation מגובה בראיה רשמית אך אינה ב-xrefs משום שאינה קיימת באוניברסום המזהים של " +
      "המאגר.",
  },

  /* -------------------------------------------------------- table:AFIH */
  {
    id: "table:AFIH",
    evidence: [
      AFIH_PM_ORDER_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Operative Project Structures (PS-ST-OPR) | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/87d0b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "תיעוד הארכוב של Project System לגרסת 2025 FPS01 קובע: 'You can use archiving object PS_PROJECT " +
          "to archive data from the following database tables', ובטבלה שעמודותיה 'Object / Archiving Class " +
          "/ Segment' מופיעה השורה 'Order for information system' עם מחלקת הארכוב PS_ORDER והטבלאות AFFL, " +
          "AFIH, AFKO, AFPO, AFVC, AFVU, AFVV, AUFK, PAF, VBAK ו-VBAP. הסניפט מאשר שהטבלה AFIH קיימת בגרסת " +
          "2025 FPS01 גם מחוץ להקשר ה-PM, ואינו מפרט את שדותיה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint של PM (חוברת ההגירה): רשומת הטבלה AFIH",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת ה-blueprint (נושא 7, פקודות עבודה): 'כותרת פקודת אחזקה (PM)' / 'Maintenance Order " +
          "Header'; טרנזקציות IW32, IW33; עמודת S/4: 'מותאם (תואם)', טבלה חליפית 'AFIH (זהה)', טרנזקציה " +
          "חליפית 'IW32; Fiori'; הערת SUM: 'אין המרת טבלה הרסנית, אך מודל הנתונים מותאם - הרץ Regression " +
          "Test ובדוק User Exits/דוחות מותאמים'. שדות מתועדים: AUFNR (PK/FK, מספר פקודה), EQUNR (FK, ציוד " +
          "מתייחס), TPLNR (FK, מיקום מתייחס), ILART (סוג פעילות אחזקה), PRIOK (עדיפות), GEWRK (FK, מרכז " +
          "עבודה ראשי); פונקציה BAPI_ALM_ORDER_GET_DETAIL; תוכנית RIAUFK20; קשרים: AFIH.AUFNR = " +
          "AUFK.AUFNR, AFIH.EQUNR = EQUI.EQUNR, AFIH.TPLNR = IFLOT.TPLNR. ה-blueprint נוקב באפליקציית " +
          "Fiori 'Find Maintenance Order (F2393)'; מזהה זה לא אומת (ראו הערות).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#AFIH",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT): הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "AFIH נמנית בסט S4_STABLE של המאגר, טבלאות ליבה PM/PP-PI המסומנות במפורש יציבות ב-S/4HANA " +
          "(verified, low risk, ללא שינוי מודל), יחד עם AUFK, AFKO, AFPO, AFVC, AFRU, EQUI, IFLOT ו-ILOA. " +
          "הסט הזה סותר את עמודת ה-S/4 של ה-blueprint לאותה טבלה ('מותאם (תואם)'), והסתירה מתועדת " +
          "ב-audit/s4-enrichment/BASELINE.md.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת AFIH, כותרת נתוני האחזקה של ההזמנה (Maintenance Order Header) בתחזוקת מפעל, פעילה ב-S/4HANA " +
        "On-Premise ועדכנית לגרסת 2025 FPS01, וללא טבלה חליפית: מסמך הארכוב הרשמי של PM/CS מונה את 'AFIH " +
        "Order header' כשורה הראשונה בחלק ה-Structure של אובייקט הארכוב PM_ORDER, ותיעוד הארכוב של Project " +
        "System מונה את AFIH בין הטבלאות של האובייקט 'Order for information system' במחלקת הארכוב " +
        "PS_ORDER. אף מקור רשמי שנמצא בסבב חיפוש זה אינו נוקב ביורשת, בפריט פישוט או בהוצאה משימוש של " +
        "הטבלה, ואף מקור רשמי גם אינו קובע במפורש 'ללא שינוי': הסטטוס נשען על נוכחות הטבלה בגרסת 2025 " +
        "FPS01 ועל היעדר יורשת בחיפושים שבוצעו. AFIH נשארת ההרחבה של AUFK לנתוני האחזקה של הפקודה ומוצמדת " +
        "אליה לפי AUFNR. לשקיפות: עמודת ה-S/4 של ה-blueprint מסמנת את AFIH 'מותאם (תואם)', אך נוקבת באותה " +
        "טבלה עצמה כטבלה החליפית ('AFIH (זהה)'), כלומר התאמה ולא החלפה; אף רשומה רשמית לא אישרה ולא הפריכה " +
        "את ההתאמה הזו.",
      edition: "on-premise",
      release: "2025.001",
      source: AFIH_PM_ORDER_ARCHIVING,
      recommendedAction: "להמשיך להשתמש ב-AFIH כהרחבת נתוני האחזקה של כותרת ההזמנה, בקריאה ב-JOIN ל-AUFK לפי AUFNR; אין " +
        "פעולת הסבה ייעודית לטבלה עצמה לפי ה-blueprint ('אין המרת טבלה הרסנית, אך מודל הנתונים מותאם'). " +
        "לאחר ההמרה להריץ בדיקות רגרסיה לקוד מותאם, ל-User Exits של פקודת האחזקה (למשל IWO10009) ולדוחות " +
        "שקוראים ישירות מ-AFIH, כפי שדורשת הערת ה-SUM של ה-blueprint. לפיתוח חדש, לדיווח ולאינטגרציה " +
        "להעדיף את שכבת ה-OData הרשמית של פקודות האחזקה (API_MAINTENANCEORDER, ראו הערות) ואת " +
        "BAPI_ALM_ORDER_MAINTAIN ליצירה ולשינוי (מזהה מהדאטהסט של הפרויקט; לא נמצא בסניפט רשמי במעבר זה), " +
        "במקום SELECT ישיר לטבלה. לניהול מחזור חיי הנתונים להשתמש באובייקט הארכוב PM_ORDER, שמכסה את AFIH " +
        "יחד עם ILOA ו-OPROL.",
    },
    xrefs: [
      "table:AUFK", "table:AFKO", "table:AFVC", "table:ILOA", "table:EQUI", "table:IFLOT", "tx:IW31",
      "tx:IW32", "tx:IW33", "tx:IW38", "tx:IW39", "fm:BAPI_ALM_ORDER_MAINTAIN",
      "fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_ORDERHEAD_GET_LIST", "cds:I_MaintenanceOrder",
      "fiori:F2731", "enh:exit:IWO10009", "enh:exit:IWO10018",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה: שבע ריצות של scripts/sap-help-search.mjs תחת SAP_S4HANA_ON-PREMISE, בתוספת חיפוש רשת " +
      "מוגבל-דומיין (help.sap.com, api.sap.com, fioriappslibrary, fal) ורובד Tier-2 מהמאגר. גוף עמודי " +
      "ה-Help אינו נשלף: משיכה ישירה של שני עמודי הארכוב (loio 15e1b653 ו-87d0b653) החזירה HTTP 200 במשקל " +
      "1,160 בתים כל אחד, מעטפת JavaScript ללא טקסט תוכן וללא המחרוזת AFIH, ולכן כל טענה מוגבלת לכותרת " +
      "ולסניפט של רשומת החיפוש. אף רשומה רשמית שנמצאה אינה מפרטת את שדות AFIH: ששת השדות שברשומה מקורם " +
      "ב-blueprint בלבד, ורשומת data/table-enrichment.ts#AFIH (trust verified) מוסיפה מפתח ראשי MANDT + " +
      "AUFNR ומפתח זר ILOAN אל ILOA, שלא אומתו מול מקור רשמי במעבר זה. לא נמצא פריט פישוט (Simplification " +
      "Item) או רשומת What's New שמשנה את הטבלה; רשומות What's New שנמצאו עוסקות בשדות מסך של כותרת הפקודה " +
      "('Maintenance Order: New Fields in Mass Change', 1809 FPS01; 'Customizing Field Selection and Basic " +
      "Order View Profiles for Billable Maintenance Orders', 2023 FPS01) ובתצוגות CDS של פקודות ופעולות " +
      "('CDS Views for Maintenance Orders and Operations', 2022 FPS02), לא בטבלה. הופעה רשמית שלישית של " +
      "AFIH לא נרשמה כראיה: העמוד 'Settlement of an Order' בדליברבל 'Orders (CS-SE/PM-WOC-MO)' (2025.001, " +
      "loio ccc9b65334e6b54ce10000000a174cb4) מכיל בסניפט את הרסיס 'the table AFIH using the report " +
      "ZIPHAS00', אך המשפט המלא אינו נראה ולכן לא נוסחה ממנו טענה; חלון סניפט אחר של אותו עמוד מצטט 'Take " +
      "note of the information in SAP Note 838264' כלשונו, והמספר לא נרשם בשדה sapNote כי הכלל דורש קישור " +
      "me.sap.com/notes או repoRef. שכבת ה-API: העמוד 'Operations for Maintenance Order (Version 2)' " +
      "בדליברבל 'APIs for Maintenance Management' (2023.latest, loio c5a499aa5b614e53acc235c361aac098) " +
      "מציג בסניפט את הפעולה 'Read Maintenance Order Header (Version 2)' ואת הנתיב GET " +
      "/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2/MaintenanceOrder('4012109'); העמוד לא נרשם כראיה כי " +
      "אינו נוקב ב-AFIH, וההמלצה מפנה אליו כשכבת קריאה מודרנית בלבד. סטייה במזהה Fiori: ה-blueprint נוקב " +
      "'Find Maintenance Order (F2393)'; חיפוש מוגבל-דומיין בספריית Fiori הרשמית מחזיר את 'Find " +
      "Maintenance Order' תחת appId F2175 (וכן F4604, W0017, W0033), כפי שמתועד גם " +
      "ב-audit/s4-enrichment/MANIFEST.md, ואילו 'Find Maintenance Orders and Operations' (F2173) מגיע " +
      "מהספר המורשה שבמאגר (knowledge/books/sap-pm/chapters/chapter-008.md ו-chapter-009.md, רובד Tier-2). " +
      "data/fiori/apps.ts מחזיק F2731 'Manage Maintenance Orders' כאפליקציית פקודות האחזקה של הפרויקט. רק " +
      "fiori:F2731 נכלל ב-xrefs כי הוא היחיד שנפתר בדאטהסט; F2393 לא נמצא בדומיינים הרשמיים במעבר זה. " +
      "סתירה פנימית פעילה: עמודת ה-S/4 של ה-blueprint ('מותאם (תואם)', מחלקה 1) מייצרת בבלוק הראיות סטטוס " +
      "נגזר 'משתנה ב-S/4HANA', בעוד lib/s4.ts בודק קודם את S4_STABLE ומציג באותו עמוד 'ללא שינוי מהותי'; " +
      "הסתירה מתועדת ב-audit/s4-enrichment/BASELINE.md לצד AFKO, AFPO, AFVC, AUFK ו-MARC, והטיפול כאן זהה " +
      "לזה שנבחר ברשומת table:AFKO באותו קובץ. ה-xref cds:I_MaintenanceOrder הוא מזהה המאגר בלבד: נושאי " +
      "ה-VDM שנמצאו הם 'Maintenance Order Data' (I_MaintenanceOrderDEX) ו-'Maintenance Order (Value Help)' " +
      "(I_MaintenanceOrderStdVH), אף אחד מהם אינו נוקב ב-AFIH כטבלת מקור, ולא נמצא נושא רשמי בשם " +
      "I_MaintenanceOrder בלבד. גם BAPI_ALM_ORDER_MAINTAIN שבהמלצה הוא מזהה מהדאטהסט של הפרויקט ולא מסניפט " +
      "רשמי. חיבור sc4sap MCP (SE11 חי) נכשל בסשן זה, ולכן סוגי נתונים, אורכים ורשימת שדות מלאה נשארים לא " +
      "מאומתים מול מערכת. לא נטען שום מספר SAP Note ולא הומצא שום מזהה.",
  },

  /* -------------------------------------------------------- table:EBAN */
  {
    id: "table:EBAN",
    aliases: [
      "eban",
    ],
    evidence: [
      EBAN_MRP_LIVE,
      {
        sourceType: "sap_help",
        sourceTitle: "Information Retrieval for Purchase Requisitions Using MM_EBAN | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/0463b60fdba2475f805e655a02efca10.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד ה-Information Retrieval של אובייקט הארכוב MM_EBAN בגרסת 2025 FPS01 נוקב בשדות EBAN עצמם: " +
          "'Ensure that for archiving object MM_EBAN, there is at least one active archive information " +
          "structure that contains the following selectable fields: BANFN (EBAN-BANFN) BNFPO (EBAN-BNFPO) " +
          "LIFNR (EBAN-LIFNR) EMLIF (EBAN-EMLIF) FLIEF (EBAN-FLIEF) MFRNR (EBAN-MFRNR) KUNNR (EBAN-KUNNR) " +
          "VPTNR (EBAN-VPTNR)', ו-'These fields are used by the IRF to determine which data should be " +
          "fetched from the archive'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Subcontract Purchase Requisitions and Purchase Orders | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/b9f59902a6c647e19960e4b05b522b0a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "תיעוד ניהול האחזקה (Maintenance Management) בגרסת 2025 FPS01 קובע שבשמירה או בשחרור של צו אחזקה " +
          "המערכת יוצרת אוטומטית דרישת רכש של קבלנות משנה: 'When you save or release a maintenance order, " +
          "the system automatically creates a subcontract purchase requisition', ושינויים בצו האחזקה ברמת " +
          "הרכיב לאחר יצירת הדרישה משתקפים באותה דרישה: 'If you make changes to the maintenance order at " +
          "component level after creation of the purchase requisition, the changes are reflected in that " +
          "purchase requisition'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת EBAN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "העשרת המאגר (מאומתת): EBAN מחזיקה את שורות דרישת הרכש (חומר, כמות, מפעל, תאריך אספקה, סוג רכש " +
          "ומקור אספקה) עם מפתח MANDT/BANFN/BNFPO; דרישה שנוצרה מ-MRP מסומנת ב-ESTKZ='B', וההמרה להזמנת " +
          "רכש מעדכנת EBELN/EBELP. שדה KNTTP (קטגוריית הקצאת חשבון) מסמן ששורת הדרישה מוקצית חשבון, ונתוני " +
          "ההקצאה עצמם יושבים ב-EBKN לפי BANFN+BNFPO.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#EBAN",
      },
    ],
    status: {
      status: "changed",
      he: "EBAN ממשיכה להתקיים ולשמש ב-S/4HANA On-Premise בגרסת 2025 FPS01 (הטבלה ושדותיה נקובים בתיעוד ILM " +
        "MM_EBAN הרשמי), ואין יורשת מתועדת. מה שמשתנה הוא אופן היצירה של דרישות הרכש מתוך תכנון החומרים: " +
        "ב-MRP Live אין מחוון יצירה לדרישות רכש, הריצה יוצרת דרישות רכש לרכש חיצוני, ודרישות מריצת תכנון " +
        "קודמת שלא קובעו נמחקות ונוצרות מחדש.",
      edition: "on-premise",
      release: "2025.001",
      source: EBAN_MRP_LIVE,
      recommendedAction: "להמשיך לעבוד מול EBAN ללא טבלה חליפית, ולבדוק דוחות וקוד מותאם שנשענים על מחוון היצירה של דרישות " +
        "רכש או על יציבות מספרי דרישה בין ריצות MRP; דרישה שחייבת לשרוד ריצה נוספת צריכה להיקבע (firmed). " +
        "בתרחיש תחזוקת מפעל יש לאמת את זרימת הרכיבים מצו האחזקה אל דרישת הרכש לאחר המעבר.",
    },
    xrefs: [
      "table:EBKN", "table:BUT000", "table:RESB", "table:AUFK", "tx:ME51N", "tx:ME52N", "tx:ME53N",
      "tx:ME57", "tx:ME59N", "tx:MD01N", "tx:IW32", "fm:BAPI_PR_CREATE", "fm:BAPI_REQUISITION_GETDETAIL",
    ],
    lastVerifiedAt: DATE4,
    notes: "הסטטוס 'משתנה' מעוגן בעמוד MRP Live: Incompatible Changes (PP-MRP, 2025.001), לא בהערת ה-blueprint. " +
      "הטבלה עצמה לא נמצאה באף מקור רשמי כמוחלפת, מוסרת או בהיקף תאימות; להפך, עמוד ה-IRF של אובייקט " +
      "הארכוב MM_EBAN לגרסת 2025 FPS01 נוקב בשדותיה. פערים: (1) עמודת ה-S/4 בבלוטפרינט של הפרויקט " +
      "(data/sapData.pm.ts#EBAN) גורסת 'מותאם (Business Partner לספקים)' והערת SUM על CVI, אך לא נמצא עמוד " +
      "רשמי שנוקב ב-EBAN בהקשר המרת ספקים ל-Business Partner, ולכן ההיבט הזה נשאר ברמת אימות המאגר בלבד; " +
      "(2) הבלוטפרינט רושם אפליקציית Fiori 'Manage Purchase Requisitions (אמת ID)' ללא מזהה, ואין " +
      "אפליקציית דרישות רכש ב-data/fiori/apps.ts, ולכן לא נוסף xref מסוג fiori והמזהה נשאר לא מאומת; (3) " +
      "טיפוסי השדות ואורכיהם (SE11) לא אומתו מול מערכת חיה (חיבור ה-MCP של sc4sap נכשל) ובבלוטפרינט שדות " +
      "EBAN חסרים dt/len, כך שעומק המבנה בעמוד נותר 0; (4) לא נרשם מספר SAP Note בשדה מובנה: הסניפט הרשמי " +
      "של MM_EBAN מפנה ל-SAP Note 2689265 עבור מודלי הנתונים של IRF, אך ללא כתובת me.sap.com/notes או " +
      "repoRef אי אפשר לרשום אותו כראיה; (5) EBAN אינה מופיעה ב-data/s4-impact.ts, ב-data/s4-objects.ts או " +
      "ב-data/lifecycle.ts, ולכן הסטטוס הנגזר שהעמוד הציג עד כה הגיע מעמודת ה-blueprint בלבד ('מותאם' = " +
      "changed, בלי מקור ובלי גרסה). מועמדת רשמית נוספת שנבדקה ולא נוספה: 'Document Assignments in " +
      "Maintenance Orders' (Maintenance Management, 2025.001, loio cf157d54e52ee630e10000000a44538d) " +
      "הנוקבת במפורש באובייקט EBAN בהקשר העתקת מסמכים מצו אחזקה לשורת דרישת רכש.",
  },

  /* -------------------------------------------------------- table:EQUZ */
  {
    id: "table:EQUZ",
    evidence: [
      EQUZ_PM_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/08c1d29f1acc4d459ecc198dc18ee6ce.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "אובייקט ההגירה PM - Equipment (מדריך Data Migration, 2025 FPS01) נוקב ב-EQUZ בשמה כטבלה במערכת " +
          "היעד S/4HANA: 'The CurCustomer (EQUI-KUNDE) field will not automatically populate fields in the " +
          "EQUI or EQUZ tables according to your customizing'. אותו עמוד מגדיר לפי הסניפט 'Migration " +
          "Approach Staging Table', 'Custom Field Support Yes' ובהיקף 'Equipment Master Data', 'Equipment " +
          "Manufacturer Data', ומזהיר: 'You have to check time dependencies before you create or migrate " +
          "your objects. This prevents error messages and inconsistent data in your database.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Equipment | Technical Objects (CS-BD/PM-EQM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/c1d5b853dcfcb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "נושא 'Equipment' בחוברת Technical Objects (CS-BD/PM-EQM) לגרסת 2025 FPS01 מתאר את מנגנון פלח " +
          "הזמן עצמו: 'The equipment master record contains several types of data'; 'Plant Maintenance " +
          "data, location data and sales data This is time-dependent data. It can change repeatedly in the " +
          "course of time'; ו-'If your system is set up accordingly with the help of the Customizing " +
          "functions, it automatically creates a new time segment for specific master record changes that " +
          "describes the equipment usage period'. זהו התיאור הרשמי של יצירת פלח זמן (time segment) חדש " +
          "לתיאור תקופת השימוש (equipment usage period) של הציוד, והוא תלוי בהגדרות Customizing. הסניפט " +
          "אינו נוקב בשם הטבלה EQUZ.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Equipment | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/75e9ecd8ebcb4ab582c365beddbb2c76.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד ה-Entity הרשמי 'Equipment' במדריך APIs for Maintenance Management לגרסת 2025 FPS01 קובע " +
          "לפי הסניפט: 'Equipment Technical name: A_Equipment', ומונה בין שדות ה-Entity את " +
          "'ValidityEndDate Defines the date till which the entry is valid', 'ValidityStartDate Indicates " +
          "the date from which the entry is valid', 'ValidityEndTime Defines the time till which the " +
          "equipment usage is valid', 'EquipUsagePeriodSequenceNumber Indicates the consecutive numbering " +
          "of the equipment usage periods on the same day' ו-'NextEquipUsagePeriodSqncNmbr Indicates the " +
          "number of the next equipment usage period on same day'. הסניפט אינו ממפה שדות אלה לעמודות הטבלה " +
          "EQUZ.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint של PM (חוברת ההגירה): רשומת הטבלה EQUZ",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת ה-blueprint (נושא 2, ציוד ונתוני מאסטר): 'פלח זמן של ציוד (התקנות/שיוך)' / 'Equipment " +
          "time segment'; טרנזקציות 'IE02; IE4N (התקנה/פירוק)'; עמודת S/4: 'ללא שינוי (תואם)', טבלה חליפית " +
          "'EQUZ (זהה)', 'IE4N נתמך; Fiori'; SUM: 'ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ " +
          "Regression Test ואימות התאמות אישיות לאחר ההמרה.' שדות מתועדים: EQUNR (PK/FK), DATBI (PK), " +
          "EQLFN (PK), HEQUI (FK), ILOAN (FK); מודולי פונקציה EQUI_TIMESEGMENT_READ ו-EQUIPMENT_DISMANTLE; " +
          "תוכנית RIEQUI00; קשרים: EQUI דרך EQUNR (פלחי זמן של הציוד), EQUI דרך HEQUI (ציוד עליון) ו-ILOA " +
          "דרך ILOAN (נתוני מיקום וחיוב בפלח). ה-blueprint נוקב באפליקציית Fiori 'Manage Technical Objects " +
          "(F2079)'; מזהה זה לא אומת (ראו הערות).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#EQUZ",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת EQUZ, פלחי הזמן של הציוד (Equipment time segments) בתחזוקת מפעל, פעילה ב-S/4HANA On-Premise " +
        "(עדכני ל-2025 FPS01) וללא טבלה חליפית: מסמך הארכוב הרשמי של 2025 FPS01 מונה אותה בשם ובתיאור " +
        "'Equipment time segments' בין טבלאות אובייקט הארכוב PM_EQUI, ותיעוד ה-Migration Cockpit של אותה " +
        "גרסה נוקב ב-'the EQUI or EQUZ tables' במערכת היעד. מנגנון פלח הזמן עצמו מתועד רשמית באותה גרסה: " +
        "המערכת יוצרת פלח זמן חדש עבור שינויים מוגדרים ברשומת האב, המתאר את תקופת השימוש של הציוד, בהתאם " +
        "להגדרות Customizing. לא אותרה רשומה רשמית הנוקבת ביורשת, בפריט פישוט (Simplification Item) או " +
        "בהוצאה משימוש של הטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: EQUZ_PM_ARCHIVING,
      recommendedAction: "להמשיך להשתמש ב-EQUZ כטבלת פלחי הזמן של הציוד; אין פעולת הסבה ייעודית ב-SUM לטבלה עצמה לפי " +
        "ה-blueprint, ומומלץ Regression Test לקוד מותאם ולממשקים הקוראים ממנה. בקריאה יש לזכור שהמפתח לפי " +
        "ה-blueprint הוא EQUNR יחד עם DATBI ו-EQLFN, ולכן כל שאילתה על המצב הנוכחי חייבת לבודד את הפלח " +
        "הפעיל ולא למשוך את כל השורות. לתחקור היסטוריית התקנה ופירוק להשתמש ברשימת השימוש (usage list) " +
        "שבמסך הציוד ובטרנזקציה IE4N. לאינטגרציות ולפיתוח חדש להעדיף את שירות ה-OData API_EQUIPMENT על פני " +
        "SELECT ישיר: עמוד ה-Entity הרשמי שלו (APIs for Maintenance Management, 2025 FPS01, loio " +
        "75e9ecd8ebcb4ab582c365beddbb2c76) מונה את שדות תקופת השימוש ValidityStartDate, ValidityEndDate, " +
        "ValidityEndTime, EquipUsagePeriodSequenceNumber ו-NextEquipUsagePeriodSqncNmbr. בתכנון ארכוב לטפל " +
        "ב-EQUZ יחד עם EQUI, EQKT ו-ILOA תחת אובייקט הארכוב PM_EQUI.",
    },
    xrefs: [
      "table:EQUI", "table:EQKT", "table:ILOA", "table:IFLOT", "tx:IE02", "tx:IE03", "tx:IE4N",
      "fm:EQUI_TIMESEGMENT_READ", "fm:EQUIPMENT_DISMANTLE", "fm:BAPI_EQMT_INSTALL",
      "cds:I_EquipmentTimeSegment", "cds:I_Equipment",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה (2026-09-15): חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs במוצר " +
      "SAP_S4HANA_ON-PREMISE בשמונה שאילתות ('EQUZ equipment time segment', 'EQUZ', 'EQUZ table " +
      "equipment', 'equipment usage period time segment usage list', 'equipment usage period customizing " +
      "create new usage period history', 'Equipment time-dependent data new time segment master record " +
      "changes', 'Install dismantle equipment IE4N usage period installation history', 'Simplification " +
      "technical objects plant maintenance equipment S/4HANA'), חיפוש רשת מוגבל-דומיין (help.sap.com, " +
      "api.sap.com, fioriappslibrary, fal) ורובד Tier-2 מהמאגר. גוף עמודי ה-Help אינו נשלף (מעטפת " +
      "JavaScript), ולכן כל טענה מוגבלת לכותרת ולסניפט של רשומת החיפוש; ארבע הכתובות הרשמיות שברשומה " +
      "החזירו HTTP 200. אישורים רשמיים נוספים שנבדקו ולא נכללו כראיה נפרדת, כולם 2025.001 אלא אם צוין " +
      "אחרת: 'Displaying Usage Times' (loio ec78bb53707db44ce10000000a174cb4): 'Usage times are created by " +
      "the system for every piece of equipment', 'Using the Customizing function, you can specify the " +
      "conditions under which the system should create new equipment usage periods', 'If you change " +
      "certain fields defined in the system, the system completes the existing equipment usage period and " +
      "creates a new one which contains the changed data'; 'Installing/Dismantling from the Equipment " +
      "Master Record' (loio 0d79bb53707db44ce10000000a174cb4): 'When the piece of equipment is dismantled, " +
      "the system automatically closes the current entry in the equipment usage list and enters the date " +
      "and time of dismantling'; 'Change Documents' (loio 5a7abb53707db44ce10000000a174cb4): 'The " +
      "equipment usage period is the time span during which the location data, maintenance data, or " +
      "business data of the piece of equipment has not changed', 'One equipment usage period corresponds " +
      "to one event'; 'Event' (loio 577abb53707db44ce10000000a174cb4): 'History-relevant change to the " +
      "master record of a piece of equipment. The change affects the usage data', סוגי אירוע 'Installation " +
      "Dismantling Replacement'; 'The Usage History' (Work Management, loio " +
      "616cb6535fe6b74ce10000000a174cb4): 'In Customizing, you can define when the system should create a " +
      "new equipment usage period'; 'Checks (CS-BD/PM-EQM-EQ)' (loio ab9fce5314894208e10000000a174cb4), " +
      "שבו 'Equipment time segment' מופיע בקריטריוני הבדיקה לפני סימון למחיקה; ו-'Equipment Data | Virtual " +
      "Data Model and CDS Views' (2023.latest, loio c03993b6d4a24f8e8731aed4cdb313a4): 'As there is time " +
      "dependency in this CDS view and the system creates time segments, different versions may exist for " +
      "the equipment'. פערים ומגבלות: אף סניפט רשמי אינו נוקב בשם שדה של EQUZ, ולכן רשימת השדות (EQUNR, " +
      "DATBI, EQLFN, HEQUI, ILOAN), סוגי הנתונים והאורכים נשארים ברובד המאגר בלבד; גם הכלל 'הפלח הפעיל הוא " +
      "DATBI=99991231' מקורו ב-data/table-enrichment.ts#EQUZ ולא במקור רשמי. שמות שדות ה-OData בעמוד " +
      "ה-Entity אינם ממופים בתיעוד הרשמי לעמודות EQUZ; הקישור ביניהם הוא סינתזה של הרשומה. שכבת ה-CDS מעל " +
      "EQUZ נותרת פתוחה: רשומת cds:I_EquipmentTimeSegment במאגר נושאת סטטוס 'נדרש אימות נוסף' בשל פער שם " +
      "מול הנושא הרשמי בחוברת ה-VDM של Cloud Public Edition, שנוקב ב-I_EQUIPMENTTIMESEG, ולא אותר נושא VDM " +
      "מקביל ב-On-Premise (ראו audit/s4-enrichment/research-queue-cds.md); לכן אין ברשומה טענה על תצוגת " +
      "CDS רשמית מעל הטבלה. תצוגת 'Equipment Install/Dismantle History' (2023.latest, loio " +
      "a18e976c8a244478a79e3b4177d525dc, 'CDS View Name I_EquipInstallationHistoryC', 'Data Category " +
      "Cube', 'Status Released') לא נוספה כ-xref כי אין לה דף בדאטהסט. סטייה פנימית במאגר לגבי אפליקציית " +
      "Fiori: ה-blueprint נוקב 'Manage Technical Objects (F2079)' ו-data/fiori/apps.ts נוקב F2730A; אף " +
      "מזהה לא אומת מול ספריית ה-Fiori בסבב זה, ולכן אין xref לאפליקציה. שני מודולי הפונקציה שב-xrefs " +
      "(EQUI_TIMESEGMENT_READ, EQUIPMENT_DISMANTLE) מקורם ב-blueprint ולא בסניפט רשמי; tx:IE03 " +
      "ו-fm:BAPI_EQMT_INSTALL נוספו כקישורים תפקודיים ואינם ברשומת ה-blueprint של EQUZ, שנוקבת ב-IE02 " +
      "וב-IE4N בלבד (התקנה סוגרת את הפלח הנוכחי ופותחת פלח חדש, לפי עמוד Installing/Dismantling). רובד " +
      "המאגר תואם לראיות הרשמיות ואינו סותר אותן: data/table-enrichment.ts#EQUZ ('מקטע זמן של ציוד ... כל " +
      "שינוי מהותי יוצר מקטע זמן חדש עם ILOAN משלו') ו-data/s4-impact.ts#S4_STABLE, שבו EQUZ נמנית עם " +
      "טבלאות הליבה היציבות של PM. הממצא השלילי לגבי פריט פישוט מוגבל לרשומות החיפוש שנשלפו ואינו בדיקה " +
      "ממצה: קטלוג ה-Simplification Item דורש התחברות S-user לפי audit/s4-enrichment/MANIFEST.md. לא נטען " +
      "שום מספר SAP Note או KBA. בדיקה במערכת SAP חיה לא התאפשרה (חיבור ה-MCP sc4sap נכשל בסשן זה), ולכן " +
      "פירוט ה-DDIC ב-SE11 לא אומת. לפני מעבר זה הציגה האפליקציה סטטוס נגזר 'ללא שינוי ב-S/4HANA' " +
      "מה-blueprint ברמת אימות 'מאומת מול נתוני הפרויקט', ללא מקורות וללא תאריך, בעומק L1.",
  },

  /* -------------------------------------------------------- table:ILOA */
  {
    id: "table:ILOA",
    evidence: [
      ILOA_PM_MPLAN_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Function Module FUNC_LOCATION_RFC_002 | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/7070b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד ה-RFC הרשמי של FUNC_LOCATION_RFC_002 ('RFC to functional location: Individual processing, " +
          "Change/Display/Read') בגרסת 2025 FPS01 נוקב בטבלה ILOA בשמה ומנחה: 'In this case use the " +
          "parameter SECONDARY_INDEX and create an index with the following fields for the table ILOA: " +
          "EQFNR OWNER', בהקשר 'If alternative labeling of functional locations is active in your' (הסניפט " +
          "נקטע). באותו עמוד מופיע ברשימת השדות 'ILOAN CHAR 12 Location and account assignment for the " +
          "maintenance object', לצד 'INGRP CHAR 3 Maintenance planner group' ו-'IWERK CHAR 4 Maintenance " +
          "planning plant'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 initial shipment, Feature Pack Stack 1-3 and SAP " +
          "S/4HANA Cloud Private Edition 2023 initial shipment, Feature Pack Stack 1-3 (White Paper, " +
          "Document Version 1.35, 2025-02-25)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE4,
        claim: "מסמך ה-Simplification List של 2023 (גרסת מסמך 1.35 מ-2025-02-25) הורד ונקרא במלואו: חיפוש טקסט " +
          "מלא על הטקסט המחולץ (pdftotext -layout, 76,533 שורות; pdftotext רגיל, 74,223 שורות) אינו מחזיר " +
          "ולו מופע אחד של ILOA או ILOAN כמילה עצמאית. פרק 29 של המסמך, 'Logistics - PM', מונה שנים-עשר " +
          "פריטי פישוט, ובהם '29.3 S4TWL - Obsolete POWL Applications in Maintenance Management', '29.4 " +
          "S4TWL - LIS in EAM', '29.6 S4TWL - Scheduling of Maintenance Plan' ו-'29.8 S4TWL - Batch Input " +
          "for Enterprise Asset Management (EAM)', ואף אחד מהם אינו נוקב בטבלה ILOA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 FPS01, Feature Pack Stack 1-3 and SAP S/4HANA Cloud " +
          "Private Edition 2025 FPS01, Feature Pack Stack 1-3 (White Paper, Document Version 1.36, " +
          "2026-02-18)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE4,
        claim: "מסמך ה-Simplification List של 2025 FPS01 הורד (10.6MB) ונקרא במלואו: גם בו חיפוש טקסט מלא על " +
          "הטקסט המחולץ (pdftotext, 85,712 שורות; pdftotext -layout, 70,529 שורות) אינו מחזיר ולו מופע אחד " +
          "של ILOA או ILOAN כמילה עצמאית. כלומר אין פריט פישוט הנוקב בטבלה ILOA גם במהדורה התואמת את גרסת " +
          "הסטטוס שנרשמה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של הפרויקט, רשומת PM:ILOA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת מאגר מאומתת: ILOA היא טבלת נתוני המיקום והחיוב המשותפת לאובייקטים של תחזוקת מפעל, עם מפתח " +
          "ILOAN ועם השדות KOSTL (מרכז עלות), SWERK (מפעל אחזקה), INGRP (קבוצת תכנון), GEWRK (מרכז עבודה " +
          "ראשי) ו-TPLNR (מיקום פונקציונלי). הקשרים הרשומים: ILOA.TPLNR = IFLOT.TPLNR, ILOA.GEWRK = " +
          "CRHD.OBJID ו-EQUZ.ILOAN = ILOA.ILOAN. הבלופרינט רושם s4Note 'ללא שינוי (תואם)', s4AltTable " +
          "'ILOA (זהה)', s4AltTcode 'ללא; מנוהל דרך אובייקט טכני', טרנזקציות 'IL02; IE02 (ירושה)' " +
          "ו-sumNote 'ללא פעולת המרה ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות " +
          "אישיות לאחר ההמרה.'. בנוסף ILOA נמנית בסט S4_STABLE (data/s4-impact.ts) לצד EQUI, IFLOT ו-IFLOS.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM:ILOA",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת ILOA, נתוני המיקום והחיוב המשותפים לאובייקטי תחזוקת מפעל (התיאור הרשמי: 'Location and " +
        "account assignment for maintenance object (PM object)'), פעילה ב-SAP S/4HANA On-Premise ועדכנית " +
        "לגרסת 2025 FPS01, ללא טבלה חליפית: היא נקובה בשמה ברשימת הטבלאות של אובייקט הארכוב PM_MPLAN, " +
        "בעמוד ה-RFC של FUNC_LOCATION_RFC_002 (עם הנחיה ליצירת אינדקס משני על EQFNR ו-OWNER) ובעמודי " +
        "ארכוב, ILM והגירה נוספים שאומתו מול שירות החיפוש הרשמי ומפורטים בהערות. שני מסמכי " +
        "ה-Simplification List שנקראו במלואם, של 2023 FPS03 ושל 2025 FPS01, אינם נוקבים ב-ILOA כלל, ואף " +
        "מקור רשמי שנבדק אינו נוקב ביורשת, בהוצאה משימוש או בפריט פישוט עבורה. לפי הבלופרינט של הפרויקט " +
        "נתוני הטבלה מתוחזקים דרך האובייקט הטכני ולא בטבלה ישירות.",
      edition: "on-premise",
      release: "2025.001",
      source: ILOA_PM_MPLAN_ARCHIVING,
      recommendedAction: "להמשיך להשתמש ב-ILOA כטבלת נתוני המיקום והחיוב של האובייקטים הטכניים, של הודעות התחזוקה ושל " +
        "פקודות התחזוקה. אין פעולת המרה ייעודית לטבלה ב-SUM, ומומלץ Regression Test להתאמות אישיות, " +
        "לממשקים ולדוחות הקוראים ממנה ישירות. לתחזוקה שוטפת לעבוד דרך האובייקט הטכני: IL02 למיקום " +
        "פונקציונלי ו-IE02 לציוד, כאשר הציוד המותקן יורש את נתוני המיקום והחיוב מהמיקום הפונקציונלי. " +
        "לפיתוח חדש ולצריכה אנליטית להעדיף את תצוגות ה-CDS של המיקום הפונקציונלי והציוד " +
        "(I_FunctionalLocation, I_Equipment) על פני SELECT ישיר מ-ILOA. בפרויקט הגירה לשים לב שאובייקטי " +
        "ההגירה 'PM - Functional location' ו-'PM - Measuring point' בוחרים נתונים מטבלת ILOA לפי המפעלים " +
        "הנגזרים (ראו הערות). לפני שינוי מרכז עלות (KOSTL) או מפעל אחזקה (SWERK) ב-ILOA לבדוק את ההשפעה על " +
        "חיוב פקודות פתוחות ועל הציוד היורש את הנתונים.",
    },
    xrefs: [
      "table:IFLOT", "table:EQUI", "table:EQUZ", "table:CRHD", "table:MPOS", "table:AFIH", "table:OBJK",
      "tx:IL02", "tx:IL03", "tx:IE02", "tx:IE03", "cds:I_FunctionalLocation", "cds:I_Equipment",
    ],
    lastVerifiedAt: DATE4,
    notes: "הסטטוס נגזר מרשומות חיפוש רשמיות (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE, " +
      "2026-09-15) ומשני מסמכי Simplification List רשמיים שנקראו בפועל. שישה עמודי ארכוב ב-2025 FPS01 " +
      "נוקבים ב-ILOA ולא נכללו כולם כראיות: PM_MPLAN (loio 96a0ce5314894208e10000000a174cb4, הראיה " +
      "שנבחרה), PM_IFLOT (loio 7e06bd53d34ab64ce10000000a174cb4, 'ILOA Location and account assignment " +
      "data for the maintenance object'), PM_EQUI (loio 7b06bd53d34ab64ce10000000a174cb4, אותו ניסוח), " +
      "PM_ORDER (loio 15e1b6531de6b64ce10000000a174cb4, 'ILOA Location and account assignment for the " +
      "maintenance object'), PM_QMEL (loio 60adb6531de6b64ce10000000a174cb4, 'ILOA Location Data') " +
      "ו-SM_QMEL, עמוד 'Archiving of Service Notifications (PM-SMA-SC)' (loio " +
      "63adb6531de6b64ce10000000a174cb4, 'QMIH Maintenance data ILOA Location Data'). השם האנגלי הרשמי " +
      "המלא של הטבלה, 'PM Object Location and Account Assignment', מופיע בשתי רשומות רשמיות נוספות שלא " +
      "נכללו כראיות: עמוד ה-ILM 'Destroying Historical PM Orders with PM_WOC_MH' (Maintenance Management, " +
      "2025.001, loio 9703695887671f60e10000000a44147b) ועמוד ה-VDM 'Maintenance Item Data' (Virtual Data " +
      "Model and CDS Views, 2023.latest, loio dc7dc1581f4042c5a38c217e78934ea4) הקובע 'Field Work " +
      "Breakdown Structure Element (WBS Element) comes from the PM Object Location and Account Assignment " +
      "database table (ILOA), not from the Maintenance item database table (MPOS)'. אזהרה: אותו משפט מופיע " +
      "גם בעמוד ששמו 'Maintenance Item Data (Deprecated)' (loio e28a09047bcd4d3cb9c939cc7b19747e); תווית " +
      "ה-Deprecated שם חלה על תצוגת ה-CDS של אותו עמוד ולא על הטבלה ILOA. נקודת ההגירה בהמלצה נשענת על שתי " +
      "רשומות רשמיות נוספות: 'PM - Functional location' (Data Migration, 2025.001, loio " +
      "7c5578ab53e0457f905145bc535839cf) הקובעת 'This migration object automatically selects functional " +
      "locations from the ILOA table for the derived plants', ו-'PM - Measuring point' (Data Migration, " +
      "2025.001, loio 5385d17be2c74424bbcd6300e602e595) הקובעת 'The PE_S4_OBJNR migration filter retrieves " +
      "equipment or function location data from the ILOA table for the derived plants'. פערים: הגדרת " +
      "ה-DDIC של ILOA (SE11: רשימת שדות מלאה, טיפוסים, אורכים ואינדקסים) לא נקראה ממערכת חיה כי חיבור " +
      "ה-MCP sc4sap נכשל, ולכן רשימת השדות של הרשומה נשארת ברמת אימות המאגר; היחיד שאומת רשמית הוא ILOAN " +
      "באורך CHAR 12, והוא מופיע ברשימת שדות של עמוד ה-RFC ולא כהגדרת DDIC של הטבלה. הבדיקה השלילית מול " +
      "ה-Simplification List בוצעה על שני מסמכים שנקראו במלואם: 2023 FPS03 ו-2025 FPS01. מהדורת 2024 לא " +
      "נבדקה, וקטלוג ה-Simplification Item ב-launchpad.support.sap.com דורש התחברות S-user ולא נבדק. לא " +
      "נמצא שירות OData רשמי או תצוגת CDS שנוקבים בטבלה ILOA בשמה, ולכן הקישור בין I_FunctionalLocation " +
      "ו-I_Equipment לבין הטבלה נשאר ברמת המאגר ולא נטען כעובדה רשמית. אפליקציית Fiori לא נכללה ב-xrefs: " +
      "הבלופרינט רושם 'Manage Technical Objects (F2079)' בעוד data/fiori/apps.ts רושם מזהה אחר, והסתירה " +
      "הזו כבר תועדה ברשומת IFLOT. לא נטען שום מספר SAP Note או KBA.",
  },

  /* -------------------------------------------------------- table:MPLA */
  {
    id: "table:MPLA",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving of Maintenance Plans (CS-AG/PM-PRM-MP) | Data Archiving in Plant Maintenance and " +
          "Customer Service (PM/CS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/96a0ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "מסמך הארכוב הרשמי לגרסת 2025 FPS01 קובע: 'You can use the archiving object PM_MPLAN to archive " +
          "maintenance plans in the Plant Maintenance application component' ו-'The system archives the " +
          "maintenance plans using the archiving class PM_MPLAN'. רשימת הטבלאות של המחלקה הזו כלשון " +
          "הסניפט: 'It comprises the following tables: Table Short Text MPLA Maintenance plan MMPT Cycle " +
          "definitions and measuring points for the maintenance plan MHIS Maintenance plan calls'. הסניפט " +
          "מבדיל בין מחלקות הארכוב: לפריטי התוכנית הוא קובע 'The system archives the maintenance item(s) " +
          "for a maintenance plan using the archiving class PM_MPOS' ומונה בבלוק נפרד 'It comprises the " +
          "following tables: Table Short Text MPOS Maintenance item ILOA Location and account assignment " +
          "for maintenance object (PM object) OBJK Object list for Plant Maintenance', ובבלוק נוסף 'MHIO " +
          "Call objects, call object history ONR00 Object number'. כלומר MPLA היא הטבלה הראשונה ברשימת " +
          "מחלקת הארכוב PM_MPLAN, וטבלת תוכנית האחזקה (Maintenance plan) בתיעוד SAP S/4HANA On-Premise " +
          "2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Change Documents for Maintenance Plans and Maintenance Items | Product Lifecycle Management " +
          "(PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/f3eec353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד מסמכי השינוי לתוכניות אחזקה ולפריטי אחזקה (2025 FPS01) מגדיר את הטבלה כלשונו: 'Maintenance " +
          "plan: Table MPLA The table contains the maintenance plan data including schedule parameter, " +
          "additional data and administrative data', ומפרש את מבנה המפתח: 'You can interpret the key for " +
          "the various tables as follows: Table Key Interpretation MPLA 800000000000196 First three digits " +
          "= Client, Remaining digits = Maintenance' (הסניפט נקטע כאן). הסניפט מונה שמות שדות וטקסטים " +
          "קצרים בהקשר הזה, בהם 'ABRHO Maintenance plan scheduling period in days', 'HORIZ Call horizon " +
          "for maintenance plan calls', 'HUNIT Unit in scheduling interval', 'VSNEG Shift factor in the " +
          "case of early confirmation', 'VSPOS Shift factor in the case of late confirmation', 'ANDOR " +
          "Indicator for AND/OR link' ו-'WARPL Maintenance plan', ומציג לצידה את 'Call object from " +
          "maintenance plan: Table MHIO'. הסניפט אכן מתחם לפי כותרות טבלה (Maintenance plan: Table MPLA, " +
          "Table MMPT, Maintenance call history: Table MHIS, Call object from maintenance plan: Table " +
          "MHIO), אך רצף השדות מוגש עם השמטות, ולכן שיוך שדה בודד לטבלה לא נטען מעבר לטקסט הקצר שלו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance plan | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/60a36b24c79d4629b04fa59c409154f5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "אובייקט ההגירה PM - Maintenance plan (מדריך Data Migration, 2025 FPS01) קובע: 'This migration " +
          "object automatically selects relevant maintenance plans from the MPLA table for the derived " +
          "maintenance planning plants', ו-'Technical Information Name of this migration object: " +
          "S4_PM_MAINTENANCE_PLAN Virtual Table MPLA_TEXT: To store long texts for maintenance plans Note " +
          "that virtual table do not exist in the database'. הסניפט נוקב גם ב-'Related Business Object: " +
          "Maintenance Plan'. כלומר הטבלה MPLA נקובה בשמה בתיעוד ההגירה של SAP S/4HANA 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance plan | Data Migration (loio b97c1785)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/b97c17855d78480ead0cebb32c4a346f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד אובייקט ההגירה השני באותו מדריך (2025 FPS01) מגדיר: 'Object Alias MAINT_PLAN_3', 'Business " +
          "Object Component PM', 'Business Object Type Master data', 'Migration Approach Staging Table', " +
          "ו-'There are three types of maintenance plan: Single cycle plans (time- or performance-based) " +
          "Strategy plans (time- or performance-based) Multiple counter plans'. על שדות התוכנית הסניפט " +
          "קובע: 'Call Horizon HORIZ Call Horizon in % HORIZ_DAYS Call Horizon in Days HORIZ_QUALIFIER " +
          "Calculation Type of Call Horizon', 'Note HORIZ - Defines the call horizon value', ו-'The " +
          "difference between a single cycle plan and a strategy plan is made via the STRAT field (blank " +
          "or filled)'. זהו המקור הרשמי היחיד שנמצא במעבר זה לשמות השדות HORIZ ו-STRAT.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint של PM (חוברת ההגירה): רשומת הטבלה MPLA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת ה-blueprint (נושא 11, אחזקה מונעת ותוכניות): 'כותרת תכנית אחזקה ונתוני תזמון' / " +
          "'Maintenance plan header'; טרנזקציות IP01/IP02/IP03 וכן IP41, IP42; עמודת S/4: 'ללא שינוי " +
          "(תואם)', טבלה חליפית 'MPLA (זהה)', טרנזקציה חליפית 'IP01-03; Fiori'; SUM: 'ללא פעולת המרה " +
          "ייעודית ב-SUM (טבלה תואמת). מומלץ Regression Test ואימות התאמות אישיות לאחר ההמרה'. שדות " +
          "מתועדים: WARPL (PK), MPTYP, STRAT (FK), HORIZ, ABRHO; פונקציות BAPI_MAINTENANCEPLAN_CREATE " +
          "ו-MAINTENANCE_PLAN_SCHEDULE; תוכנית RIMPLA00; קשרים אל MPOS, MHIO ו-MHIS דרך WARPL. שדה ה-Fiori " +
          "ברשומה: 'Manage Maintenance Plans (אמת ID)', כלומר הבלופרינט עצמו מסמן שהמזהה לא נקבע.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#MPLA",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט: רשומת MPLA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת מאגר מאומתת: MPLA היא כותרת תוכנית האחזקה, מפתח MANDT + WARPL, אסטרטגיה דרך STRAT אל " +
          "T351, פריטי התוכנית ב-MPOS דרך WARPL והיסטוריית התזמון ב-MHIS; התוכנית יכולה להיות " +
          "single-cycle, מבוססת אסטרטגיה או multiple-counter, והתזמון (IP10/IP30) יוצר את קריאות האחזקה. " +
          "המקורות ברשומה טקסטואליים (SE11, SAP Help) ללא קישור.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MPLA",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת MPLA, כותרת תוכנית האחזקה ונתוני התזמון בתחזוקת מפעל, פעילה ב-S/4HANA On-Premise (עדכני " +
        "ל-2025 FPS01) וללא טבלה חליפית: היא הטבלה הראשונה ברשימת מחלקת הארכוב PM_MPLAN של אובייקט הארכוב " +
        "PM_MPLAN, התיעוד קובע עליה 'The table contains the maintenance plan data including schedule " +
        "parameter, additional data and administrative data', והיא נקובה בשמה בתיעוד ה-Migration Cockpit " +
        "של 2025 FPS01. אף רשומה רשמית שנמצאה במעבר זה אינה נוקבת ביורשת, בפריט פישוט או בהוצאה משימוש של " +
        "הטבלה. לפי רשומת האימות של הפרויקט cds:I_MaintenancePlan (data/verification/cds.ts), שנשענת על " +
        "What's New ב-S/4HANA 2021 FPS01, התצוגה I_MaintenancePlan הוצאה משימוש והיורשת היא " +
        "I_MaintenancePlanBasic. ההוצאה משימוש הזו נוגעת לשכבת ה-CDS בלבד ואינה נוגעת לטבלה, ורשומה זו " +
        "אינה מביאה לה ראיה משלה.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Archiving of Maintenance Plans (CS-AG/PM-PRM-MP) | Data Archiving in Plant Maintenance and " +
          "Customer Service (PM/CS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/96a0ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "מסמך הארכוב הרשמי לגרסת 2025 FPS01 קובע: 'You can use the archiving object PM_MPLAN to archive " +
          "maintenance plans in the Plant Maintenance application component' ו-'The system archives the " +
          "maintenance plans using the archiving class PM_MPLAN'. רשימת הטבלאות של המחלקה הזו כלשון " +
          "הסניפט: 'It comprises the following tables: Table Short Text MPLA Maintenance plan MMPT Cycle " +
          "definitions and measuring points for the maintenance plan MHIS Maintenance plan calls'. הסניפט " +
          "מבדיל בין מחלקות הארכוב: לפריטי התוכנית הוא קובע 'The system archives the maintenance item(s) " +
          "for a maintenance plan using the archiving class PM_MPOS' ומונה בבלוק נפרד 'MPOS Maintenance " +
          "item ILOA Location and account assignment for maintenance object (PM object) OBJK Object list " +
          "for Plant Maintenance', ובבלוק נוסף 'MHIO Call objects, call object history ONR00 Object " +
          "number'. כלומר MPLA היא הטבלה הראשונה ברשימת מחלקת הארכוב PM_MPLAN, וטבלת תוכנית האחזקה " +
          "(Maintenance plan) בתיעוד SAP S/4HANA On-Premise 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "להמשיך להשתמש ב-MPLA ככותרת תוכנית האחזקה; לפי הבלופרינט אין פעולת המרה ייעודית לטבלה ב-SUM, " +
        "ולאחר ההמרה לבצע בדיקות רגרסיה לקוד מותאם ולממשקים הקוראים או כותבים ל-MPLA, MPOS, MHIS ו-MHIO. " +
        "לקריאה ולדיווח להעדיף את שכבת ה-CDS על פני SELECT ישיר, ולשים לב שהתצוגה I_MaintenancePlan " +
        "שבמיפוי הפרויקט מסומנת כמוצאת משימוש מאז S/4HANA 2021 לפי רשומת cds:I_MaintenancePlan של הפרויקט, " +
        "עם היורשת I_MaintenancePlanBasic (התצוגה היורשת אינה רשומה עדיין במיפוי הפרויקט). לאינטגרציות " +
        "לבחון את שירות ה-OData API_MAINTENANCEPLAN עם הישות A_MaintenancePlan, המתועד במדריך APIs for " +
        "Maintenance Management (ראו הערות). להעברת נתונים להשתמש באובייקט ההגירה PM - Maintenance plan " +
        "(Object Alias MAINT_PLAN_3, גישת Staging Table), ולניהול מחזור חיים של הנתונים באובייקט הארכוב " +
        "PM_MPLAN, שלפי הסניפט מפעיל את מחלקת הארכוב PM_MPLAN (MPLA, MMPT, MHIS) לצד מחלקת PM_MPOS (MPOS, " +
        "ILOA, OBJK) ובלוק נוסף של MHIO ו-ONR00.",
    },
    xrefs: [
      "table:MPOS", "table:MHIS", "table:MHIO", "table:ILOA", "table:OBJK", "table:EQUI", "table:IFLOT",
      "tx:IP01", "tx:IP02", "tx:IP03", "tx:IP10", "tx:IP11", "tx:IP19", "tx:IP24", "tx:IP30", "tx:IP41",
      "tx:IP42", "tx:IP43", "fm:MAINTENANCE_PLAN_SCHEDULE", "fm:MAINTENANCE_ITEM_READ",
      "fm:ISCHED_CALL_GENERATE", "cds:I_MaintenancePlan", "fiori:F4072", "fiori:F2828", "enh:exit:IPRM0001",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs (מוצר SAP_S4HANA_ON-PREMISE, " +
      "2026-09-15) בשאילתות 'MPLA maintenance plan table', 'Archiving of Maintenance Plans PM_MPLAN " +
      "archiving object', 'Maintenance Plan Virtual Data Model CDS view I_MaintenancePlanBasic', " +
      "'simplification maintenance plan MPLA conversion', 'What's New maintenance plan scheduling " +
      "S/4HANA', 'API_MAINTENANCEPLAN OData service maintenance plan', 'MPLA WARPL scheduling period " +
      "change documents maintenance plan table', 'MPTYP maintenance plan category field', בתוספת חיפוש רשת " +
      "מוגבל-דומיין ורובד Tier-2 מהמאגר. גוף עמודי help.sap.com אינו נשלף (מעטפת JavaScript), ולכן כל טענה " +
      "מוגבלת לכותרת ולסניפט של רשומת החיפוש; ארבע הכתובות הרשמיות החזירו HTTP 200 ו-loio/versionId אומתו " +
      "מחדש מול שירות החיפוש. הבחנה שכדאי לשמור: באותו מדריך ארכוב, עמוד הסקירה (loio " +
      "a0cfba538c95b54ce10000000a174cb4, לא נכלל כראיה) מבדיל בין 'Task Lists PM_PLAN' לבין 'Maintenance " +
      "plans PM_MPLAN'; אובייקט הארכוב של תוכניות האחזקה הוא PM_MPLAN. עוד הבחנה: עמוד הארכוב מפעיל שלוש " +
      "מחלקות ארכוב נפרדות (PM_MPLAN לתוכנית, PM_MPOS לפריטים, ובלוק נוסף לאובייקטי הקריאה), ורשימות " +
      "הטבלאות אינן ניתנות לאיחוד לרשימה אחת. מה שלא אומת: לא נמצאה רשומת What's New או פריט פישוט " +
      "(Simplification Item) רשמי שנוגע לטבלה MPLA עצמה, ולכן 'ללא שינוי' נסמך על נוכחות הטבלה בתיעוד 2025 " +
      "FPS01 ועל היעדר רשומת שינוי, לא על אמירה רשמית מפורשת 'unchanged'. השדה MPTYP שבבלופרינט לא אושר " +
      "באף סניפט רשמי (מושג 'Maintenance Plan Category' מתועד בעמוד loio 5d30ba538c95b54ce10000000a174cb4 " +
      "בלי לנקוב בשם השדה); השדות WARPL, HORIZ, ABRHO ו-STRAT כן מופיעים בסניפטים רשמיים. רשימת השדות " +
      "המלאה של MPLA ומבנה ה-DDIC לא אומתו מול מערכת חיה (חיבור sc4sap MCP נכשל בסשן זה). שירות ה-OData " +
      "הנזכר בהמלצה מגובה ברשומות חיפוש רשמיות שלא נכללו כראיות נפרדות: 'Operations for Maintenance Plan' " +
      "(loio e9e26138959d4c028145900daf0e1dde, 2023 Latest, 'The Maintenance Plan API offers these " +
      "operations ... /sap/opu/odata/sap/API_MAINTENANCEPLAN/A_MaintenancePlan'), 'Read All Maintenance " +
      "Plans' (loio 6ea78f4e7c9a449885712969090ce1fe, 2025.001) ו-'OData API: Maintenance Plan' ב-What's " +
      "New 2025 FPS01 (loio 880c79762567475fa24fdd9a0c41f500). טבלת MMPT (Cycle definitions and measuring " +
      "points) ו-ONR00 נקובות בסניפט הארכוב הרשמי אך אינן ב-xrefs כי אין להן דף בדאטהסט, וכך גם " +
      "cds:I_MaintenancePlanBasic שאינה רשומה ב-data/cds-map.ts. ה-xref cds:I_MaintenancePlan נשמר כעוגן " +
      "ניווט בלבד: לפי רשומת האימות של הפרויקט התצוגה הזו מוצאת משימוש, וההתאמה בין הרשומות מתוארת " +
      "ב-data/verification/cds.ts. אפליקציית Fiori: הבלופרינט כותב 'Manage Maintenance Plans (אמת ID)'; " +
      "help.sap.com עצמו נוקב במזהה F5325 בעמוד loio 0082dd0f5dd64b8b90cfa87ce1fd3c52, 'App Extensibility: " +
      "Manage Maintenance Plans App (Key User)', 2025.001, כלשון הסניפט: 'you can extend the Manage " +
      "Maintenance Plans (F5325) app according to your business needs'. מזהה זה אינו קיים " +
      "ב-data/fiori/apps.ts ולכן לא נוסף כ-xref; ה-xrefs fiori:F4072 (Schedule Maintenance Plans) " +
      "ו-fiori:F2828 (Maintenance Planning Overview) הם מזהי המאגר לניווט ולא מיפוי רשמי לטבלה. הפונקציה " +
      "BAPI_MAINTENANCEPLAN_CREATE שבבלופרינט לא נוספה ל-xrefs: data/bapi-enrichment.pm.ts קובע שהיא אינה " +
      "קיימת ומפנה ל-MPLAN_CREATE / MPLAN_CHANGE, וזו סתירה פנימית במאגר שטרם הוכרעה מול מקור רשמי. לא " +
      "נטען שום מספר SAP Note או KBA. מהדורת S/4HANA Cloud Public Edition לא נבדקה.",
  },

  /* -------------------------------------------------------- table:MPOS */
  {
    id: "table:MPOS",
    evidence: [
      MPOS_PM_MPLAN_ARCHIVING,
      {
        sourceType: "sap_help",
        sourceTitle: "Change Documents | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/f1a8ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד 'Change Documents' של Maintenance Planning (CS-AG/PM-PRM-MP) בגרסת 2025 FPS01 קובע: " +
          "'Changes that you make to the maintenance plans or maintenance items are logged in the system " +
          "in change documents', ומכיל את המשפט 'Maintenance Item: Table MPOS The table contains the " +
          "maintenance item data'. כלומר תיעוד S/4HANA 2025 FPS01 מגדיר את MPOS כטבלה המחזיקה את נתוני " +
          "פריט תכנית האחזקה. הסניפט מונה גם שמות שדות בהקשר תיעוד השינויים, בהם WARPL 'Maintenance plan', " +
          "IWERK 'Maintenance planning plant', ILOAN 'Location and account assignment for technical " +
          "object' ו-ZYKL1 'Maintenance package cycle/offset', אך אינו מאפשר לשייך כל שדה לטבלה שלו, ולכן " +
          "לא נגזרה ממנו רשימת שדות של MPOS.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance item | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/dda63730335744e38a4d2ec0129428cc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "אובייקט ההגירה 'PM - Maintenance item' (מדריך Data Migration, 2025 FPS01) קובע לפי הסניפט: " +
          "'This migration object enables you to migrate the maintenance item data from the source ERP " +
          "system to the target system based on the default selection criteria', ומוסיף: 'Note Maintenance " +
          "items assigned to the maintenance plan are migrated with the Maintenance plan migration " +
          "object'. הסיווג בסניפט: 'Component: PM', 'Business Object Type Master data', וגישת ההגירה " +
          "'Migration Approach Direct Transfer - ERP' עם שם טכני 'S4_PM_MAINT_PLAN_ITEM'. כלומר קיים " +
          "ב-S/4HANA 2025 FPS01 נתיב הגירה רשמי ייעודי לפריטי תכנית אחזקה, ופריטים שכבר משויכים לתכנית " +
          "מועברים יחד עם אובייקט ההגירה של תכנית האחזקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Item | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/314f4099993e40d7b8ae0f90174015ea.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "מדריך ה-APIs הרשמי של ניהול תחזוקה בגרסת 2025 FPS01 קובע: 'Maintenance Item Technical name: " +
          "API_MAINTENANCEITEM This API allows you to read, create, and update maintenance items'. הסניפט " +
          "נוקב גם בישויות 'Maintenance Plan Call Object' ו-'Linear Asset Management Data " +
          "(A_LinearAssetManagementData) Allows you to read linear asset management data'. רשימת הישויות " +
          "והמאפיינים המלאה לא אומתה, מפני שגוף העמוד אינו נשלף; הטענה מוגבלת לקיום השירות ולפעולות " +
          "הקריאה, היצירה והעדכון שהוא מציע לפריט תכנית אחזקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Item Data | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/dc7dc1581f4042c5a38c217e78934ea4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE4,
        claim: "נושא ה-VDM הרשמי 'Maintenance Item Data' (On-Premise 2023 Latest) קובע: 'CDS View Name " +
          "C_MaintenanceItemDEX', 'Analytical Data Category Dimension', 'Status Released', 'Data " +
          "Extraction Type Delta-enabled, the extraction is based on field LastChangeDateTime'. אותו עמוד " +
          "מבחין ברמת השדה: 'Field Work Breakdown Structure Element (WBS Element) comes from the PM Object " +
          "Location and Account Assignment database table (ILOA), not from the Maintenance item database " +
          "table (MPOS)', כלומר תיעוד ה-VDM של S/4HANA מכנה את MPOS 'the Maintenance item database table' " +
          "ומייחס את שדה ה-WBS ל-ILOA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint של PM (חוברת ההגירה): רשומת הטבלה MPOS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רשומת ה-blueprint (נושא 11, אחזקה מונעת ותוכניות): 'פריט תכנית אחזקה' / 'Maintenance item'; " +
          "טרנזקציות 'IP04; IP02'; עמודת S/4: 'ללא שינוי (תואם)', טבלה חליפית 'MPOS (זהה)', 'IP04; Fiori'; " +
          "SUM: ללא פעולת המרה ייעודית בטבלה תואמת, מומלץ Regression Test ואימות התאמות אישיות. שדות " +
          "מתועדים: WAPOS (PK), WARPL (FK), EQUNR (FK), TPLNR (FK), AUART, PLNNR (FK); פונקציה " +
          "MAINTENANCE_ITEM_READ; תוכנית RIMPLA00; קשרים: MPLA דרך WARPL, EQUI דרך EQUNR, PLKO דרך PLNNR. " +
          "ה-blueprint נוקב באפליקציית Fiori 'Manage Maintenance Plans' ומסמן בעצמו 'אמת ID'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#MPOS",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת MPOS, פריט תכנית אחזקה (Maintenance item) בתחזוקת מפעל, פעילה ב-S/4HANA On-Premise (עדכני " +
        "ל-2025 FPS01) וללא טבלה חליפית: מסמך הארכוב של 2025 FPS01 מונה אותה עם הטקסט הקצר 'Maintenance " +
        "item' בהיקף אובייקט הארכוב PM_MPLAN, עמוד מסמכי השינוי של Maintenance Planning באותה גרסה קובע " +
        "'Maintenance Item: Table MPOS The table contains the maintenance item data', ולמעבר הנתונים קיים " +
        "אובייקט הגירה ייעודי 'PM - Maintenance item' ב-Migration Cockpit של 2025 FPS01. שכבת הגישה הרשמית " +
        "לנתוני פריט תכנית האחזקה כוללת את שירות ה-OData API_MAINTENANCEITEM (מדריך APIs for Maintenance " +
        "Management, 2025 FPS01) לקריאה, ליצירה ולעדכון, ולצריכה אנליטית את תצוגת ה-CDS " +
        "C_MaintenanceItemDEX (Analytical Data Category Dimension, Status Released) לפי תיעוד ה-VDM של " +
        "2023 Latest, שמייחס בה את שדה ה-WBS ל-ILOA ולא ל-MPOS. לא נמצאה רשומה רשמית הנוקבת ביורשת לטבלה, " +
        "בפריט פישוט או בהוצאתה משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: MPOS_PM_MPLAN_ARCHIVING,
      recommendedAction: "להמשיך להשתמש ב-MPOS כטבלת פריטי תכנית האחזקה; לפי ה-blueprint אין פעולת המרה ייעודית לטבלה " +
        "ב-SUM, ולאחר ההמרה לבצע בדיקות רגרסיה לקוד מותאם ולממשקים הקוראים ממנה או כותבים אליה, לצד MPLA, " +
        "MHIS, MHIO ו-ILOA. לאינטגרציות חדשות להעדיף את שירות ה-OData API_MAINTENANCEITEM (2025 FPS01, " +
        "ראיה נפרדת ברשומה) על פני MAINTENANCE_ITEM_READ. לדיווח ולאנליטיקה לשקול את C_MaintenanceItemDEX " +
        "על פני SELECT ישיר מהטבלה, בשים לב שרשומת ה-VDM שנבדקה היא 2023 Latest ולא 2025 FPS01, ושהיא " +
        "מייחסת את שדה ה-WBS ל-ILOA ולא ל-MPOS. בהגירה להשתמש באובייקט 'PM - Maintenance item' של " +
        "ה-Migration Cockpit (גישת Direct Transfer - ERP), בשים לב שפריטים המשויכים לתכנית מועברים עם " +
        "אובייקט ההגירה של תכנית האחזקה. לניהול מחזור חיים של הנתונים לתכנן את הארכוב דרך PM_MPLAN, שמכסה " +
        "גם ILOA ו-OBJK.",
    },
    xrefs: [
      "table:MPLA", "table:MHIS", "table:MHIO", "table:ILOA", "table:OBJK", "table:EQUI", "table:IFLOT",
      "table:PLKO", "tx:IP01", "tx:IP02", "tx:IP03", "tx:IP04", "tx:IP10", "tx:IP30",
      "fm:MAINTENANCE_ITEM_READ", "cds:I_MaintenancePlan", "fiori:F4072",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs (מוצר SAP_S4HANA_ON-PREMISE), " +
      "חיפוש רשת מוגבל-דומיין (help.sap.com, api.sap.com, fioriappslibrary, fal) ורובד Tier-2 מהמאגר. גוף " +
      "עמודי ה-Help אינו נשלף (מעטפת JavaScript), ולכן כל טענה מוגבלת לכותרת ולסניפט של רשומת החיפוש. " +
      "ביקורת עוינת 2026-09-15: חמש רשומות החיפוש (loio 96a0ce53, f1a8ce53, dda63730, 314f4099, dc7dc158) " +
      "אומתו מחדש מול השירות (כותרת, deliverable, versionId וסניפט) וכל חמש הכתובות החזירו HTTP 200; כל 17 " +
      "ה-xrefs נפתרים ביקום המזהים; 14 כללי lib/evidence/validate.ts נבדקו ידנית ללא ממצא. פערים ואזהרות: " +
      "(1) רשימת השדות של MPOS (WAPOS, WARPL, EQUNR, TPLNR, AUART, PLNNR) מקורה ב-blueprint ובהעשרת המאגר " +
      "(data/table-enrichment.ts#MPOS, מפתח MANDT+WAPOS) ולא אומתה מול מקור רשמי; הסניפטים הרשמיים אינם " +
      "משייכים שדות לטבלה, וחיבור sc4sap MCP (SE11 חי) לא היה זמין בסשן זה. (2) ראיית ה-VDM (loio " +
      "dc7dc158) נושאת versionId 2023.latest ולא 2025.001, כפי שהוחזר מהשירות; ארבע הראיות האחרות הן " +
      "2025.001. רשימת הישויות והמאפיינים של API_MAINTENANCEITEM לא אומתה; נושא נוסף התומך בשירות הוא " +
      "'Operations for Maintenance Item - Read' (2023 Latest, loio b9f5e86611524e14bc0ff48ffb1d8570), " +
      "ורשומת What's New של 2025 FPS01 'New Linear Asset Management Data Entity for OData APIs' (loio " +
      "22604a4f79934eb3bc2222fbf94b4248) מונה אותו בין השירותים שהורחבו. (3) קיים נושא VDM נוסף באותו שם, " +
      "'Maintenance Item Data (Deprecated)' (2023 Latest, loio e28a09047bcd4d3cb9c939cc7b19747e), שסניפטו " +
      "קובע 'CDS View Name I_MaintenanceItemData ... Status Deprecated'. אף סניפט שנקרא אינו קובע " +
      "ש-C_MaintenanceItemDEX היא היורשת של I_MaintenanceItemData, ולכן הקשר ביניהן נותר לא מאומת. (4) " +
      "Fiori: ה-blueprint רושם 'Manage Maintenance Plans (אמת ID)'. רשומות רשמיות שנמצאו: 'Situation " +
      "Templates in Maintenance Management' (2023 Latest, loio 922cb176a6ee4de58f2bbba0db7f4ad2) נוקב " +
      "'Maintenance Item EAM_MAINTENANCE_ITEM ... Manage Maintenance Items F5356', ו-'Use Cases for " +
      "Situation Handling' (2023 Latest, loio fdbf5eabf0e84621a15c6965b3e01649) נוקב 'Manage Maintenance " +
      "Plans F5325'. שני המזהים אינם קיימים ב-data/fiori/apps.ts ולכן אינם xrefs; ה-xref fiori:F4072 הוא " +
      "רשומת מאגר בלבד (Schedule Maintenance Plans, trust 'curated', relatedTables MPLA ו-MPOS) ולא אומת " +
      "מול מקור רשמי במעבר זה. (5) במדריך ה-Data Migration קיימים שני נושאים באותו שם 'PM - Maintenance " +
      "item': loio dda63730335744e38a4d2ec0129428cc (הראיה שנרשמה, שסניפטה נוקב 'Migration Approach Direct " +
      "Transfer - ERP' ו-'Name of this migration object: S4_PM_MAINT_PLAN_ITEM') ו-loio " +
      "24afe9fb29024e58807a73397a74a128 שסניפטו נוקב 'Object Alias MAINT_ITEM', כלומר הווריאנט של טבלאות " +
      "ה-Staging. (6) רשומה מחזקת שלא נכללה כראיה: 'Maintenance Plan | Enterprise Services in Logistics' " +
      "(2023 Latest, loio 25c0d7d42fa54cda84685ea341e31fc3) קובעת 'The service operations for this " +
      "business object use the following tables: MPLA MPOS MMPT MHIO MHIS'. (7) לא נמצא פריט פישוט " +
      "(Simplification Item) הנוקב ב-MPOS; חיפושי הפישוט והדפרקציה החזירו תצוגות CDS ואפליקציות (למשל " +
      "'Deprecation of Manage Maintenance Plan and Item List App', 2022.000, loio " +
      "9fe2ab1a1d5f4f1482ebebdfb9a875d2), ולא פריט פישוט לטבלה. קטלוג ה-SIC ו-me.sap.com/notes דורשים " +
      "התחברות S-user ולא נבדקו. לא נטען שום מספר SAP Note או KBA. (8) table:MMPT " +
      "ו-cds:C_MaintenanceItemDEX אינם קיימים ביקום המזהים של הפרויקט ולכן אינם xrefs, אף שהם קשרים " +
      "אמיתיים של הטבלה. (9) הסטטוס הנגזר שהאפליקציה מציגה כיום ל-MPOS הוא 'ללא שינוי' מה-blueprint " +
      "(s4Note 'ללא שינוי (תואם)' מסווג 0 ב-lib/s4-class), בלי גרסה ובלי מקור; רשומה זו מוסיפה לו גרסה " +
      "2025.001 וחמש ראיות, ולא נמצאה סתירה בין רובד המאגר לראיות הרשמיות.",
  },

  /* -------------------------------------------------------- table:MCHA */
  {
    id: "table:MCHA",
    evidence: [
      MCHA_BATCH_INTEGRITY,
      {
        sourceType: "sap_help",
        sourceTitle: "Batch unique at plant level | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/dea580c3b7a84692bf12297175279e3d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "אובייקט ההגירה 'Batch unique at plant level' בתיעוד ה-Data Migration של 2025 FPS01 שולף את " +
          "נתוני האצווה מהטבלה MCHA: 'This migration object automatically selects all unique batch data at " +
          "the plant level from the MCHA table for the derived plants'. תכליתו העברת נתוני אצווה ייחודיים " +
          "ברמת מפעל ממערכת ה-ERP המקורית למערכת היעד, והוא כולל את הצעד 'Create Batch at Plant Level'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch Level | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/b6fdb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד 'Batch Level' של LO-BM ב-2025 FPS01 קובע שרמת האצווה נבחרת בהגדרות תחת 'Specify Batch " +
          "Level and Activate Status Management', ושמעבר לרמה אחרת מחייב שינוי בהגדרות והרצת תוכנית המרה: " +
          "'If you want to use a different level in your company, you have to change it in Customizing and " +
          "carry out a conversion program'. בזמן ריצת ההמרה אפשר לרשום אצוות ברמה הישנה בלבד, ורק לאחר " +
          "סיומה ברמה החדשה ('While the conversion program is running, you can only post batches at the " +
          "old level').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.8 S4TWL - Logistics " +
          "Batch Management (LO-BM-MD, pp. 104-105)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE4,
        claim: "פריט הפישוט של ניהול האצוות הלוגיסטי ברשימת הפישוט של 2025 FPS1 עוסק בטרנזקציות בלבד: לפי לשון " +
          "המסמך MSC1, MSC2, MSC3 ו-MSC4 אינן זמינות ב-SAP S/4HANA, on-premise edition 1511, והמקבילות " +
          "הפונקציונליות הן MSC1N (Create Batch), MSC2N (Change Batch), MSC3N (Display Batch) ו-MSC4N " +
          "(Display Change Documents for Batch), ללא השפעה על התהליך העסקי ('No influence on the business " +
          "process'). הפריט אינו נוקב בטבלאות אב האצווה ואינו מכריז על החלפתן. מספר ההערה הנקוב במסמך: " +
          "0002267298.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.3 S4TWL - Logistics " +
          "Batch Management (LO-BM-MD, pp. 127-128)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE4,
        claim: "אותו פריט פישוט מופיע גם ברשימת הפישוט של 2023 FPS3, בפריט 3.3 תחת רכיב היישום LO-BM-MD, בנוסח " +
          "כמעט זהה: MSC1, MSC2, MSC3 ו-MSC4 אינן זמינות ב-SAP S/4HANA, on-premise edition 1511, המקבילות " +
          "הפונקציונליות הן MSC1N עד MSC4N, ו-'No influence on the business process'. מספר ההערה הנקוב שם " +
          "הוא 2267298. גם בפריט זה אין אזכור של טבלת MCHA או של החלפת טבלאות אב האצווה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת MCHA, אב האצווה ברמת מפעל, פעילה ב-S/4HANA On-Premise נכון לסט התיעוד 2025 FPS01, ולא נמצאה " +
        "לה טבלה חליפית או יורשת במקורות הרשמיים שנבדקו. תיעוד ניהול האצוות (LO-BM) של 2025 עדיין מכנה " +
        "אותה 'the batch master record table MCHA', ואובייקט ההגירה הרשמי 'Batch unique at plant level' " +
        "שולף ממנה את נתוני האצווה בהסבה ל-S/4HANA. התפוסה של הטבלה תלוית הגדרה: היא מתמלאת כאשר רמת " +
        "האצווה מוגדרת ברמת מפעל, וגם כרשומת Dummy Batch כאשר החומר מוערך בנפרד ברמת מפעל. פריט הפישוט של " +
        "ניהול האצוות הלוגיסטי נוגע לטרנזקציות MSC1 עד MSC4 ולא לטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: MCHA_BATCH_INTEGRITY,
      recommendedAction: "להמשיך להשתמש ב-MCHA כאב האצווה ברמת מפעל; אין פעולת הסבה לטבלה עצמה. לפני ההסבה לוודא בהגדרות " +
        "('Specify Batch Level and Activate Status Management') מהי רמת האצווה בפועל, כי היא קובעת אם " +
        "נתוני האצווה יושבים ב-MCHA או ב-MCH1, ואיזה סוג מחלקת סיווג משמש; שינוי הרמה מחייב הרצת תוכנית " +
        "המרה ייעודית לפי התיעוד הרשמי. להחליף כל שימוש ב-MSC1/MSC2/MSC3 ב-MSC1N/MSC2N/MSC3N לפי פריט " +
        "הפישוט. בקוד מותאם ובממשקים כדאי להעדיף קריאה דרך תצוגת ה-CDS I_Batch או דרך API_BATCH_SRV על פני " +
        "SELECT ישיר לטבלה; זו המלצת הנדסה ברמת הפרויקט, ולא אמירה של מקור רשמי על MCHA.",
    },
    xrefs: [
      "table:MCH1", "table:MARA", "cds:I_Batch", "fiori:F1576", "tx:MSC1N", "tx:MSC2N", "tx:MSC3N",
      "tx:MSC4N", "fm:VB_BATCH_VERIFY",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה: שש שאילתות ב-scripts/sap-help-search.mjs (מוצר SAP_S4HANA_ON-PREMISE: 'MCHA batch plant level " +
      "table', 'batch level plant material batch management', 'Specify Batch Level and Activate Status " +
      "Management conversion', 'batch master record MCHA MCHB material level client level', 'Batch Virtual " +
      "Data Model CDS view I_Batch', 'Batch Classification class type 022 plant level 023 material " +
      "level'), שאילתה נוספת במוצר SAP_S4HANA_CLOUD, וחיפוש רשת מוגבל ל-help.sap.com / api.sap.com / " +
      "fioriappslibrary / fal. שדות loio, versionId וה-URL הועתקו מרשומות ה-JSON; חמש הכתובות שברשומה " +
      "החזירו HTTP 200 ב-2026-09-15. גוף עמודי ה-Help לא נקרא (מעטפת JavaScript), ולכן כל ציטוט תחום " +
      "לכותרת ולסניפט של רשומת החיפוש; היוצא מן הכלל הוא שתי רשימות הפישוט (2025 FPS1 ו-2023 FPS3), " +
      "שהורדו, חולצו לטקסט מלא ונקראו בפועל. ממצא שלילי משני המסמכים שנקראו: חיפוש טקסט מלא ב-SIMPL_OP2025 " +
      "וב-SIMPL_OP2023 מעלה את המחרוזת MCHA בשלוש שורות בכל מסמך, ובאף אחת מהן לא מדובר בטבלת האצווה: פעם " +
      "כחלק משם טבלת ה-IS-Oil MCHABO1 בפריט מודל הנתונים של Oil & Gas Inventory Management, פעם ברשימת " +
      "קודי טרנזקציה של Retail Information System (MCH+, MCH0, MCH1 ... MCHA, MCHB), ופעם כחלק משם הדוח " +
      "MMCHANGEVAR. כלומר אין באף אחת משתי רשימות הפישוט פריט הנוגע לטבלה MCHA. זו ראיה שלילית ברמת שני " +
      "מסמכים רשמיים, ולא בדיקה במערכת. רובד המאגר (Tier-2) עקבי עם המסקנה ולא שימש כראיה ברשומה: " +
      "data/table-enrichment.ts#MCHA מגדיר מפתח MANDT+MATNR+WERKS+CHARG ומסביר שהטבלה רלוונטית כשרמת ניהול " +
      "האצווה היא מפעל; data/sapData.pppi.ts (PP-PI:MCHA) רושם s4Note 'ללא שינוי.', טרנזקציות " +
      "MSC1N/MSC2N/MSC3N, אפליקציית Fiori 'Manage Batches', מודול VB_BATCH_VERIFY ושדות " +
      "MATNR/WERKS/CHARG/ZUSCH; data/table-titles.json רושם 'נתוני אצווה ברמת מפעל'. MCHA אינה נמנית בסט " +
      "S4_STABLE של data/s4-impact.ts (שם קיימת שורה ל-MCH1 בלבד), ולכן המעמד שהאפליקציה מציגה היום נגזר " +
      "מעמודת ה-S/4 של הבלופרינט בלבד. שתי סתירות אותרו ברובד המאגר ונרשמו " +
      "ל-audit/s4-enrichment/research-queue-tables.md: (א) סוג מחלקת הסיווג לאצווה ברמת מפעל, 022 לפי " +
      "העמודים הרשמיים 'Batch Classification' (MM-IM, 2025.001, loio 7e40bd53e3acb64ce10000000a174cb4, " +
      "'022 for batches at plant level' מול '023 for batches at material level/client level') " +
      "ו-'Classifying an Item' (LO-MD-BOM, 2025.001, loio 7806c453f57eb44ce10000000a174cb4, '022 - Batch " +
      "with plant' מול '023 - Batch without plant'), מול 023 ב-data/workbenches-ext.ts ו-data/tx-intel.ts; " +
      "(ב) זמינות MSC1/MSC2/MSC3 ב-S/4HANA לפי data/tx-intel.ts ('זמינה ב-S/4HANA') מול פריט הפישוט הרשמי. " +
      "שתיהן לא סומנו כ-conflictingEvidence ברשומה כדי שלא להוריד את כל הרשומה ל'מקורות סותרים'; שתיהן " +
      "דורשות תיקון נוסח בקובצי המאגר. פערים: פירוט שדות ה-DDIC של MCHA לא אומת מול מערכת חיה (חיבור " +
      "sc4sap נכשל בסשן) ונשאר ברמת המאגר; השדה ZUSCH שבבלופרינט לא הופיע באף רשומה רשמית שנקראה. שמות " +
      "שדות של MCHA כן הופיעו בסניפטים רשמיים שלא צוטטו כראיה: MCHA-HERKL ו-MCHA-HERKR בעמוד Batches in " +
      "Delivery Management (LE-SHP, loio 47a0b8535c39b44ce10000000a174cb4), MCHA-SGT_SCAT בעמוד Master " +
      "Data for Segmentation (EWM, loio 56b8b08408dc4b438d506cfc0b58b0e3), ו-MCHA-LWEDT ו-MCHA-BWTAR בעמוד " +
      "Cost of Inventory (Thailand, loio 9184d0531d8b4208e10000000a174cb4); איש מהעמודים לא נקרא במלואו " +
      "ולא נטענה רשימת שדות. טבלת מלאי האצווה MCHB אינה קיימת ביקום המזהים של הדאטהסט ולכן אינה ב-xrefs, " +
      "אף שהיא מופיעה ברובד המאגר כטבלת המלאי המשלימה. ה-xref ל-cds:I_Batch נשען על עמוד ה-VDM הרשמי (loio " +
      "ef1cd6cd9fb6418bb311b2b8e37b6b1e, 2023.latest) הקובע 'Use CDS view Batch Distinct (I_BatchDistinct) " +
      "if you are looking for a view that only returns one row per batch regardless of batch-level " +
      "configuration', כלומר התצוגה מודעת לרמת האצווה; אף עמוד רשמי שנקרא אינו נוקב ב-MCHA כטבלת המקור " +
      "שלה, ולכן גם ההמלצה לקרוא דרך I_Batch היא המלצת הנדסה ברמת הפרויקט. ה-xref ל-fiori:F1576 מגיע " +
      "מ-data/fiori/apps.ts (trust 'curated', relatedTables MCH1/MCHA) ולא אומת מול ספריית היישומים של " +
      "Fiori בסשן זה. לא נטען שום מספר SAP Note בשדה sapNote: המספר 0002267298 מופיע כלשונו בשני המסמכים " +
      "שנקראו ומצוטט בגוף הטענות בלבד, כי me.sap.com דורש S-user ואין repoRef. חיפוש במוצר SAP S/4HANA " +
      "Cloud Public Edition לא החזיר אף רשומה הנוקבת ב-MCHA או ברמת האצווה, ולכן לא נרשמה טענה על המהדורה " +
      "הציבורית; הרשומה כולה היא On-Premise. פריט פישוט נוסף שנקרא ולא נכלל: 'S4TWL - Batch History' " +
      "(LO-BM, פריט 30.27 ברשימת 2023 FPS3, note 2270242 כלשונו במסמך), הקובע שהיסטוריית האצווה אינה חלק " +
      "מארכיטקטורת היעד של S/4HANA; הוא נוגע ליומן השינויים של רשומת אב האצווה ולא לטבלה MCHA עצמה, ואינו " +
      "משנה את המעמד כאן.",
  },

  /* -------------------------------------------------------- table:MARM */
  {
    id: "table:MARM",
    evidence: [
      MARM_PRODUCT_CHECKS,
      {
        sourceType: "sap_help",
        sourceTitle: "Table and Field Extensibility | SAP S/4HANA and SAP S/4HANA Cloud Private Edition",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e6d301d54584a33cd04a9861bc52/dacf081f31af4c93ab97da957c71feee.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד הרחבת הטבלאות והשדות לגרסת 2025 FPS01 מציג עבור אובייקט Product טבלה בעמודות Table " +
          "ו-Description, ובה השורה 'MARM Dimensions' לצד 'MARA Basic Data', 'MARC Plant Data', 'MARD " +
          "Storage Location' ו-'MBEW Accounting'. הסניפט מגדיר את היקף העמוד: 'You can extend several " +
          "tables of the Consolidation and Mass Processing data model and Mass Maintenance data model with " +
          "new fields', ולכן MARM נמנית בתיעוד הרשמי בין הטבלאות הניתנות להרחבה בשדות חדשים במודלים האלה, " +
          "והתיאור שהעמוד מצמיד לה הוא Dimensions.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Product | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/289644d401a844878ce84670517dfa98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "אובייקט ההעברה Product במדריך Data Migration לגרסת 2025 FPS01 כולל תצוגה ייעודית ליחידות המידה: " +
          "'Units of measure data In this view, you can enter Alternative Units of Measure (provide only " +
          "the Base Unit of Measure in the Basic Data sheet)'. ברשימת מבני התבנית של האובייקט מופיע המבנה " +
          "'Alternative Units of Measure (S_MARM)', לצד 'Basic Data (S_MARA), mandatory', 'Additional " +
          "Descriptions (S_MAKT)', 'Seasons (S_FSH_SEASONS_MAT)' ו-'Distribution Chains (S_MVKE)'. מספרי " +
          "הרמה בטבלת ההיררכיה נחתכים בסניפט ולא נטענים כאן.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "נתוני הפרויקט: העשרת הטבלאות ובלופרינט ההגירה של תעשיות תהליכיות, רשומת MARM",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רובד המאגר: רשומת ההעשרה של MARM מגדירה מפתח ראשי MANDT+MATNR+MEINH, מפתחות זרים MATNR ל-MARA " +
          "ו-MEINH ל-T006, ומקדם המרה UMREZ (מונה) חלקי UMREN (מכנה) מול יחידת הבסיס MARA-MEINS, בסימון " +
          "trust verified ובמקורות טקסטואליים ללא קישור ('SAP DDIC (SE11) - MARM', 'SAP Help Portal - " +
          "Units of Measure'). בלופרינט תעשיות תהליכיות (רשומה PP-PI:MARM) רושם טרנזקציות MM01, MM02, " +
          "MM03, אפליקציית Fiori בשם Manage Product Master Data, את השדות MATNR, MEINH, UMREZ, UMREN, " +
          "EAN11 ו-MESUB, קשרי אב-בן ל-MARA ול-T006, מודולי פונקציה BAPI_MATERIAL_SAVEDATA, " +
          "MATERIAL_UNIT_CONVERSION ו-MD_CONVERT_MATERIAL_UNIT, ואת הערת ה-S/4 'ללא שינוי מבני; אמת מקדמי " +
          "עיגול (rounding) למניעת סטיות מלאי'. MARM אינה נכללת בסט S4_STABLE ואין לה רשומה בשכבת ההשפעה " +
          "data/s4-impact.ts.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MARM; data/sapData.pppi.ts#MARM",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת MARM (יחידות מידה לחומר) ממשיכה להיות מתועדת ב-SAP S/4HANA On-Premise גרסת 2025 FPS01 כטבלת " +
        "יחידות המידה של אב המוצר: התיעוד נוקב בשמה 'Units of Measure for Material (MARM)' ומונה אותה עם " +
        "טבלאות אב המוצר בבדיקות איתור הכפילויות, עמוד הרחבת הטבלאות מציג אותה בשורת אובייקט Product " +
        "בתיאור Dimensions, ומבנה הביניים S_MARM הוא חלק מתבנית אובייקט ההעברה Product ב-Data Migration. " +
        "אף רשומה רשמית שנשלפה אינה מסמנת את הטבלה כמוחלפת, כמוסרת או כפריט פישוט, ואף אחת אינה נוקבת " +
        "ביורשת. הניסוח 'ללא שינוי מבני' עצמו הוא של רובד המאגר (בלופרינט תעשיות תהליכיות); מבנה השדות, " +
        "אורכיהם והמפתח לא אומתו מול תיעוד רשמי.",
      edition: "on-premise",
      release: "2025.001",
      source: MARM_PRODUCT_CHECKS,
      recommendedAction: "אין צורך בהחלפת הטבלה או במיפוי מחדש: יחידות המידה החלופיות של החומר נשארות ב-MARM, והזנתן נעשית " +
        "ב-MM01/MM02/MM03 או באפליקציית אב המוצר. לקריאה, לדיווח ולאנליטיקה לפתח מול תצוגת ה-CDS של יחידות " +
        "המידה (במאגר I_ProductUnitOfMeasure; התיעוד הרשמי נוקב בצורת הרבים I_ProductUnitsOfMeasure, ראו " +
        "רשומת ה-CDS בפרויקט) במקום SELECT ישיר מהטבלה, ולעדכון מתוכנת להשתמש ב-BAPI_MATERIAL_SAVEDATA או " +
        "בשירות ה-OData של אב המוצר API_PRODUCT_SRV (מתועד ב-'Product Master (A2X)', APIs for Product " +
        "Master, 2025.001, loio 74aa2b58a333a107e10000000a441470, ונרשם כראיה ברשומת " +
        "data/verification/cds.ts; אינו ראיה ברשומה זו). לשדות מותאמים על שכבת יחידות המידה קיים הקשר עסקי " +
        "ייעודי בהרחבת Key User, 'PRODUCT_UOM - Master Data: Product Dimensions', בעמוד App Extensibility: " +
        "Manage Product Master (Product Master, 2025.001, loio ecb59556027ed75fe10000000a441470), שבשורת " +
        "ההרחבה שלו נקובה הטבלה MARM ושאינו ראיה ברשומה זו; עמוד Table and Field Extensibility שנרשם כאן " +
        "מונה את MARM בין הטבלאות הניתנות להרחבה בשדות חדשים במודלי Consolidation and Mass Processing " +
        "ו-Mass Maintenance. בשני המסלולים ההרחבה נעשית דרך מנגנוני ההרחבה הרשמיים ולא בהוספת שדה ישירות " +
        "לטבלה. לפני ההסבה לבדוק קוד Z וממשקים הקוראים מ-MARM ומניחים מספר חומר באורך 18 תווים (MATNR הוא " +
        "חלק ממפתח הטבלה לפי רובד המאגר, וקביעת CHAR 18 מול CHAR 40 היא של רובד המאגר בלבד), לבדוק את " +
        "סגמנט E1MARMM ב-IDoc MATMAS מול ממשקי Zetes ו-Daymax, ולאמת מקדמי המרה ועיגול לאחר ההעברה מול " +
        "מבנה הביניים S_MARM של אובייקט Product.",
    },
    xrefs: [
      "table:MARA", "table:T006", "table:MEAN", "table:MARC", "table:MARD", "tx:MM01", "tx:MM02", "tx:MM03",
      "fm:BAPI_MATERIAL_SAVEDATA", "fm:MATERIAL_UNIT_CONVERSION", "fm:MD_CONVERT_MATERIAL_UNIT",
      "idoc:msg:MATMAS", "idoc:basic:MATMAS05", "cds:I_ProductUnitOfMeasure", "cds:I_Product",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה: שבע ריצות של scripts/sap-help-search.mjs ב-2026-09-15 ('MARM Units of Measure for Material " +
      "table', 'Alternative unit of measure conversion factor material master UMREZ UMREN', 'Units of " +
      "Measure Product Master base unit alternative unit conversion', 'Alternative Units of Measure S_MARM " +
      "migration product data migration', 'simplification item material master units of measure MARM " +
      "removed replaced', \"What's New units of measure product master MARM conversion\", 'App " +
      "Extensibility Manage Product Master UOM_INCL_EEW_PS MARM business context PRODUCT_UOM'), ריצה " +
      "מקבילה בסקופ SAP_ERP ('Units of Measure material master MARM') וריצה בסקופ SAP_S4HANA_CLOUD, וחיפוש " +
      "רשת מוגבל ל-help.sap.com, api.sap.com, fioriappslibrary ו-fal.cloud.sap. שלושת ה-URL הרשמיים הועתקו " +
      "כלשונם מפלט ה-JSON (loio ו-versionId 2025.001) וכולם מוחזרים מאינדקס החיפוש באותו יום; ארבעה URL " +
      "נבדקו גם ב-curl והחזירו HTTP 200, אך HTTP 200 אינו ראיה לקיום עמוד (האתר מחזיר 200 גם ל-loio שאינו " +
      "קיים), ולכן הראיה בפועל היא רשומת האינדקס. גופי עמודי ה-Help לא נקראו (מעטפת JavaScript), וכל טענה " +
      "תחומה לכותרת ולסניפט של רשומת החיפוש. היקף עמוד Table and Field Extensibility תחום בסניפט " +
      "ל-'several tables of the Consolidation and Mass Processing data model and Mass Maintenance data " +
      "model'; הקשר הרחבת ה-Key User לאב המוצר הוא בעמוד נפרד, App Extensibility: Manage Product Master, " +
      "שלא נרשם כראיה ברשומה זו אלא ברשומת ה-CDS. מצב קודם באפליקציה: אין רשומת אימות ל-MARM, ולכן " +
      "components/neo-shell/object/object-data.ts גוזרת את הפסיקה מ-s4ClassOf על הערת הבלופרינט 'ללא שינוי " +
      "מבני...' ומציגה 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט' ובלי מקורות; הרשומה הזו משאירה " +
      "את אותו טוקן ומוסיפה לו שלוש ראיות רשמיות, גרסה ומהדורה. סתירות מול נתוני המאגר: (1) descriptionEn " +
      "בבלופרינט תעשיות תהליכיות הוא 'Material number' (תוצר העתקה, כמו ב-MLGT, MDMA ו-MARA) בעוד השם " +
      "שהתיעוד הרשמי מצמיד לטבלה הוא 'Units of Measure for Material'; (2) מפת ה-CDS וההעשרה בפרויקט נוקבות " +
      "בשם I_ProductUnitOfMeasure ביחיד, בעוד נושא ה-VDM הרשמי נוקב ב-I_ProductUnitsOfMeasure ברבים, כפי " +
      "שכבר הוכרע ברשומת data/verification/cds.ts (המזהה בפרויקט לא שונה, השם הרשמי נרשם שם כ-alias) ולכן " +
      "ה-xref כאן הוא למזהה הקיים ביחיד; (3) אף רשומה רשמית שנשלפה אינה קובעת שתצוגת ה-CDS הזו נבנית מעל " +
      "MARM: הקשר הרשמי הקרוב ביותר הוא שורת ההרחבה 'UOM_INCL_EEW_PS MARM NA' בעמוד App Extensibility: " +
      "Manage Product Master (Product Master, 2025.001, loio ecb59556027ed75fe10000000a441470, המגדיר את " +
      "ההקשר העסקי 'PRODUCT_UOM - Master Data: Product Dimensions'), שכבר רשום כראיה ברשומת ה-CDS, ולצדו " +
      "שורת 'MARM Dimensions' בעמוד הרחבת הטבלאות שנרשם כאן. לא אומת מול תיעוד רשמי: רשימת השדות של MARM, " +
      "טיפוסיהם ואורכיהם, המפתח MANDT+MATNR+MEINH, שמות שדות ההמרה UMREZ ו-UMREN וקיומו של השדה EAN11 בתוך " +
      "MARM. התיעוד הרשמי שנשלף מתאר את סמנטיקת ההמרה ברמת ישות ה-OData בלבד: 'Units of Measure' במדריך " +
      "APIs for Product Master (2025.001, loio 93695a80beb84077af159271ff1ae3f3) נוקב ב-'QuantityNumerator " +
      "Numerator for Conversion to Base Units of Measure' וב-'QuantityDenominator', ובאותו מדריך 'Product " +
      "Units Of Measure' (loio 4985a85d4468478896508e71beecbfe4 ו-2a8025c4ef00489381f29f5c8d30d227) מגדיר " +
      "'AlternativeUnit ... Unit of measure in which quantities can be entered alternatively to the base " +
      "unit of measure/stock keeping unit'; אלה שמות ישות ולא שמות שדות DDIC, ולכן לא נרשמו כראיה לשדות " +
      "הטבלה. את ריבוי מספרי ה-EAN/GTIN ליחידת מידה חלופית מתעד SAP בעמוד בדיקות אב המוצר תחת טבלה נפרדת, " +
      "'International Article Numbers (EANs) for Material (MEAN)', ולכן שדה EAN11 שברשימת הבלופרינט נשאר " +
      "ברובד המאגר בלבד. ממצאים שליליים תחומים לחיפושים שבוצעו: לא אותרה רשומה רשמית המסמנת את MARM כפריט " +
      "פישוט, כמיושנת או כמוחלפת, לא אותר פריט What's New ייעודי לטבלה, ולא אותר מספר SAP Note רשמי עבורה " +
      "(מספר Note 44410 הופיע בסניפט של 'Information Sheet on Transferring Article Master Data (Retail)' " +
      "בהקשר שדות מותאמים באב החומר ולא בהקשר MARM, ולכן לא נרשם). קטלוג פריטי הפישוט וה-SAP Notes דורשים " +
      "S-user לפי MANIFEST. הקשר ECC לא נרשם כראיה: חיפוש בסקופ SAP_ERP החזיר עמודי Information Sheet של " +
      "אב החומר בלי טענה על מבנה MARM. הקשר ענן: אותו נושא 'Types of Checks Performed' מוחזר גם בסקופ " +
      "SAP_S4HANA_CLOUD (Master Data, 2608.500, אותו loio) עם אותה שורה 'Units of Measure for Material " +
      "(MARM)', וכן 'MATMAS IDoc' (APIs for Master Data Maintenance, 2608.500) עם 'E1MARMM Master material " +
      "units of measure (MARM)'; הרשומה עצמה נשארת On-Premise לפי MANIFEST. רשומות רשמיות נוספות שנראו ולא " +
      "נכללו כדי לשמור על רשומה תחומה: 'Segment E1MARMM: Master material units of measure (MARM)' " +
      "(Logistics - General (LO), 2025.001, loio f1bfd0e6b28049449935943eeb88fea9, נושא ייעודי שכותרתו היא " +
      "כל הסניפט) ו-'MATMAS IDoc' (APIs for Product Master, 2025.001, loio " +
      "5f1d9c221c1841e0b202c5536fc1fa87, 'E1MARMM Master material units of measure (MARM)'), שכבר רשומות " +
      "כראיה ברשומת idoc:msg:MATMAS ותומכות ב-xref ל-IDoc; 'Alternative Units of Measure in Production' " +
      "(Production Orders (PP-SFC), 2025.001, loio 10cec353b677b44ce10000000a174cb4) לא נכלל כי הסניפט " +
      "מגדיר אותו כפונקציה שפותחה בעיקר לתעשיית הכבלים ('This is primarily developed for cable industry') " +
      "ואינו נוקב ב-MARM; 'Material Master Unit of Measure Setup' (Oil & Gas, 2025.001, loio " +
      "9c69e50c986844b292ffc962ce65fb6f) הוא הקשר ענפי ואינו נוקב ב-MARM. אין xref מסוג Fiori: המזהה F1602 " +
      "של Manage Product Master Data כן מתועד רשמית ונרשם כבר ב-data/verification/cds.ts מתוך 'Change " +
      "Documents' (Product Master, 2025.001, loio 4715c453f57eb44ce10000000a174cb4: 'MM01(F1602): Created " +
      "a product in the Manage Product Master Data app'), אך אינו קיים ברישום data/fiori/apps.ts ולכן אין " +
      "xref. אין xref ל-T006D ול-CUNI: שניהם אינם ביקום המזהים של הפרויקט. לא בוצעה בדיקה חיה במערכת SAP: " +
      "חיבור ה-MCP של sc4sap נכשל, ולכן מבנה ה-DDIC, אורכי השדות, קיום אינדקסים והתנהגות ההמרה בגרסה " +
      "המותקנת נשארים לאימות ב-SE11 או ב-ADT.",
  },

  /* -------------------------------------------------------- table:MAKT */
  {
    id: "table:MAKT",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Types of Checks Performed | Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/1bc030a8228d405fbea7016562fa85f1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד בדיקות ה-Product Master לגרסת 2025 FPS01 מונה את 'Material Descriptions (MAKT)' בין טבלאות " +
          "נתוני אב המוצר ששדותיהן ניתנים להגדרה לבדיקות ההתאמה, לצד 'Units of Measure for Material " +
          "(MARM)', 'Material Valuation (MBEW)', 'MRP Area for Material (MDMA)' ו-'International Article " +
          "Numbers (EANs) for Material (MEAN)'. הסניפט נוקב בשני שדות של הטבלה בשמם: 'This rule checks for " +
          "potential duplicates based on the MAKT-MAKTX (Description) and MAKT-SPRAS (Language) fields'. " +
          "הטבלה קיימת אפוא בתיאור זה ב-S/4HANA 2025 FPS01. גוף העמוד לא נקרא (מעטפת JavaScript) ולכן " +
          "הטענה תחומה בכותרת ובסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MATMAS IDoc | APIs for Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18fe3fab96864826bfa0be0de4f65b85/5f1d9c221c1841e0b202c5536fc1fa87.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "טבלת סגמנטי רשומת הנתונים של IDoc MATMAS לגרסת 2025 FPS01 כוללת את השורה 'E1MAKTM Master " +
          "material short texts (MAKT)', לצד 'E1MARAM Master material general data (MARA)', 'E1MARA1 " +
          "Additional Fields for E1MARAM' ו-'E1MARMM Master material units of measure (MARM)'. כלומר " +
          "הטקסטים הקצרים של החומר, המאוחסנים ב-MAKT, מועברים בהפצת נתוני אב החומר דרך הסגמנט E1MAKTM.",
        verificationLevel: "sap_official_verified",
      },
      MATNR_FIELD_LENGTH_SIMPL_2025,
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות ובלופרינט ההגירה של הפרויקט, רשומת MAKT",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "רובד המאגר: MAKT מחזיקה את תיאור החומר התלוי-שפה, מפתח MANDT + MATNR + SPRAS, מפתח זר MATNR " +
          "ל-MARA, ושדה MAKTX באורך 40 תווים; הנחיית הביצועים שברשומה היא לסנן SPRAS לפי שפת המשתמש כדי לא " +
          "לשלוף את כל השפות. בלופרינט ההגירה PP-PI (רשומה PP-PI:MAKT ב-data/sapData.pppi.ts) מונה את " +
          "השדות MATNR (CHAR, '18->40', מפתח), SPRAS (LANG 1, מפתח), MAKTX (CHAR 40) ו-MAKTG (CHAR 40, " +
          "תיאור באותיות גדולות), קובע ב-s4Note 'ללא שינוי; MATNR מורחב משפיע על המפתח', ומקשר לטרנזקציות " +
          "MM01/MM02/MM03, ל-BAPI_MATERIAL_SAVEDATA ול-MAKT_SINGLE_READ.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#MAKT",
      },
    ],
    status: {
      status: "changed",
      he: "טבלת MAKT (תיאורי חומר) קיימת ב-SAP S/4HANA On-Premise ומתועדת בשימוש בגרסת 2025 FPS01: עמוד " +
        "בדיקות ה-Product Master מונה 'Material Descriptions (MAKT)' ונוקב בשדות MAKT-MAKTX ו-MAKT-SPRAS, " +
        "והפצת נתוני אב החומר ב-IDoc MATMAS מעבירה את הטקסטים הקצרים בסגמנט 'E1MAKTM Master material short " +
        "texts (MAKT)'. השינוי אינו במבנה הלוגי של הטבלה אלא בשדה המפתח MATNR: פריט הפישוט S4TWL - " +
        "Material Number Field Length Extension (note 0002267140) קובע שאורך שדה MATNR במסד הנתונים הורחב " +
        "מ-18 ל-40 תווים 'in all tables (and all fields within the tables) in which a material number can " +
        "be stored', החל מ-S/4HANA on-premise edition 1511. אופן אחסון התוכן לא השתנה מול SAP Business " +
        "Suite, ולכן לפי אותו פריט לרוב אין צורך בהמרת נתונים. MAKT עצמה אינה נקובה בשם בטקסט שחולץ " +
        "מרשימות הפישוט הרשמיות ל-2023 ול-2025, ולא אותר לה יורש.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MATNR_FIELD_LENGTH_SIMPL_2025,
      recommendedAction: "להמשיך לקרוא תיאורי חומר מ-MAKT, ובפיתוח חדש להעדיף את תצוגת ה-VDM I_ProductDescription, תוך " +
        "סינון לפי שפה בכל שליפה. בבדיקת הקוד המותאם לפני ההסבה לאתר SELECT ו-JOIN מול MAKT שמניחים MATNR " +
        "באורך 18 תווים, ובכלל זה שדות משורשרים שהחומר הוא חלק מהם, ולהתאים אותם לאורך 40 תווים לפי פריט " +
        "הפישוט 5.1.5 S4TWL - Material Number Field Length Extension (SAP Note 0002267140 כפי שמודפס " +
        "במסמך). בממשקים החוצים מערכת (MATMAS דרך הסגמנט E1MAKTM, BAPI_MATERIAL_SAVEDATA, וממשקי Zetes " +
        "ו-Daymax בתעשיות התהליכיות) לקחת בחשבון ששדה החומר הקצר נשאר במבנה ושדה ארוך נוסף לסופו, ושהפעלת " +
        "מספר החומר המורחב היא החלטה מפורשת שכבויה כברירת מחדל לאחר ההסבה. את אורכי ה-DDIC בפועל של MATNR " +
        "ו-MAKTX בטבלת MAKT ואת קיום השדה MAKTG בגרסת היעד לאמת ב-SE11 במערכת, כי אף מקור רשמי שנשלף אינו " +
        "נוקב בהם.",
    },
    xrefs: [
      "table:MARA", "table:MARM", "table:MBEW", "table:MDMA", "table:MEAN", "cds:I_ProductDescription",
      "cds:I_Product", "tx:MM01", "tx:MM02", "tx:MM03", "tx:MM17", "tx:MM60", "fm:MAKT_SINGLE_READ",
      "fm:BAPI_MATERIAL_SAVEDATA", "fm:BAPI_MATERIAL_GET_DETAIL", "idoc:msg:MATMAS", "idoc:basic:MATMAS05",
    ],
    lastVerifiedAt: DATE4,
    notes: "שיטה: חיפוש ה-JSON הרשמי של help.sap.com דרך scripts/sap-help-search.mjs ב-2026-09-15 ('MAKT " +
      "material description table', 'material description MAKTX 40 characters product', 'MATMAS E1MAKTM " +
      "material description segment IDoc', 'I_ProductDescription', 'Table and Field Extensibility Master " +
      "Data Governance MAKT material descriptions', 'Mass Maintenance material MM17 MAKT descriptions', " +
      "'Simplification List material master MAKT table S4TWL', \"What's New material description table " +
      "MAKT S/4HANA\"), וחיפוש רשת מוגבל ל-help.sap.com, api.sap.com, fioriappslibrary ו-fal. שני ה-URL של " +
      "עמודי ה-HTML הועתקו כלשונם מפלט ה-JSON, וכל אחד אומת מול אינדקס help.sap.com ב-2026-09-15 (כותרת, " +
      "deliverable, loio ו-versionId 2025.001); קוד HTTP 200 מ-help.sap.com אינו ראיה לקיום עמוד, כי האתר " +
      "מחזיר 200 גם ל-loio שאינו קיים. גופי העמודים לא נקראו (מעטפת JavaScript), ולכן כל טענה עליהם תחומה " +
      "בכותרת ובסניפט. שני מסמכי רשימת הפישוט (SIMPL_OP2025.pdf, Document Version 1.36, " +
      "ו-SIMPL_OP2023.pdf, Document Version 1.35) הורדו בפועל ונקראו כטקסט, ולכן הציטוטים מהם הם ציטוטי " +
      "גוף מסמך ולא סניפטים; הממצאים השליליים מהם תחומים לטקסט הניתן לחילוץ. מול הפסיקה הנגזרת: הרובד " +
      "הנגזר בפרויקט מציג היום 'ללא שינוי' (lib/s4-class קורא את אסימון הפתיחה של ה-s4Note בבלופרינט " +
      "PP-PI, ו-lib/s4 מחזיר risk low / trust partial כי אין ל-MAKT רשומה ב-S4_IMPACT והיא אינה " +
      "ב-S4_STABLE). הפסיקה שנכתבה כאן היא 'משתנה', והיא נשענת על פריט הפישוט של אורך מספר החומר בלבד, לא " +
      "על שינוי בטבלה עצמה; ה-s4Note של הבלופרינט אומר בעצמו 'MATNR מורחב משפיע על המפתח', ולכן מדובר " +
      "בחידוד ולא בסתירה. רשומת MARA באותה שכבה נפסקה 'משתנה' על אותו בסיס, וכאן הבסיס חזק יותר: משפט 'in " +
      "all tables' נקרא מגוף רשימת הפישוט. SAP Note 0002267140 מובא בגוף הטענה בלבד, כפי שהודפס במסמך " +
      "הרשמי, ולא נרשם בשדה sapNote (אין קישור me.sap.com/notes נגיש ואין לו רשומת מאגר ייעודית ל-MAKT). " +
      "tx:MM17 ו-tx:MM60 נרשמו כהקשר בלבד: אף ראיה שנטענה ברשומה אינה נוקבת בהם. לא אומת: אורכי ה-DDIC " +
      "בפועל של MATNR ושל MAKTX בטבלת MAKT, קיומו של השדה MAKTG (מופיע בבלופרינט ובהעשרת המאגר בלבד, אף " +
      "רשומה רשמית שנשלפה אינה נוקבת בו), ומבנה המפתח המלא של הטבלה; כל אלה דורשים SE11 או מערכת חיה, " +
      "וחיבור ה-MCP sc4sap נכשל לפי MANIFEST. רשומות רשמיות נוספות שנוקבות ב-MAKT ולא נטענו כראיה: 'Making " +
      "Mass Changes' (loio c367cf536db84408e10000000a174cb4, 2025 FPS01), שהסניפט שלה קובע 'For example, " +
      "in the case of the Material Master application, you can select the table MAKT (material " +
      "descriptions)' - אותו loio הוחזר בשני חיפושים תחת שני deliverables שונים (Profit Center Accounting " +
      "(EC-PCA) ו-General Ledger Accounting (FI-GL)) ולכן שיוך הספר אינו יציב; ושני נושאי 'Example " +
      "Implementation' בתרחיש Responsible Design and Production (loio 7c10a572d205450fb9593489eff869f9 " +
      "ו-loio cef6f2d7731f4e458661f2e643120a20, 2025 FPS01), הממפים 'Packaging Element description MAKT " +
      "MAKTX Material Description' ו-'Packaging Composition description MAKT MAKTX Material description'. " +
      "פערים ידועים במאגר: descriptionEn של MAKT בבלופרינט PP-PI הוא 'Material number' (ככל הנראה נגרר " +
      "משורת MARA) בעוד descriptionHe הוא 'טקסטים לתיאור חומר'; התיקון שייך לחוברת המקור ולסקריפט החילוץ, " +
      "לא לעריכה ידנית. הקישור בין MAKT לתצוגת I_ProductDescription מקורו במיפוי הפרויקט " +
      "(data/cds-map.ts#I_ProductDescription) ובהעשרת ה-CDS, ולא באף סניפט רשמי שנשלף; אותה הסתייגות כבר " +
      "רשומה ברשומת cds:I_ProductDescription. אין xref ל-Fiori: ערך fioriApp של MAKT בבלופרינט הוא 'Manage " +
      "Product Master Data', ואפליקציה זו אינה רשומה ב-data/fiori/apps.ts. לא בוצעה בדיקה חיה במערכת SAP.",
  },

  /* -------------------------------------------------------- table:AFFL */
  {
    id: "table:AFFL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Sequence | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/7b47cbb4384c497b993c670138aec9c7.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE4,
        claim: "עמוד ה-VDM הרשמי 'Production Order Sequence' (סט התיעוד On-Premise 2023 Latest) קובע: 'This CDS " +
          "view retrieves production order sequence data by semantic key (table AFFL)', ונוקב ב-'CDS View " +
          "Name I_ProductionOrderSequence' ובקטגוריה 'Analytical Data Category Fact'. הסניפט מוסיף: " +
          "'Represented Objects This view represents the SAP object type ProductionOrder " +
          "(BusinessObject).' ומונה את השאלות העסקיות 'Which sequences exist for a production order?', " +
          "'Which are the branch and return operations of a parallel sequence?' ו-'Which reference bill of " +
          "operation (routing) data belong to a production order sequence?'. טור השדות מופיע בסניפט כצמדי " +
          "שם ותיאור, כשראש הרצף קטוע: 'SequenceCategory Sequence Category', 'ProductionOrderType " +
          "Production Order Type', 'ProductionOrderSequenceText Sequence Description', " +
          "'SequenceBranchOperation Branch'. הסניפט אינו מפרט את שדות ה-DDIC של AFFL עצמה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order Sequence | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/41a3b1b463ab4d3fb50e5004c2c23aa6.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE4,
        claim: "עמוד ה-VDM 'Manufacturing Order Sequence' נוקב ב-'CDS View Name I_MfgOrderSequence' ובקטגוריה " +
          "'Analytical Data Category Dimension', וקובע: 'With this CDS view, you can retrieve " +
          "manufacturing order sequence data (table AFFL)', ובהמשך 'by semantic key'. השאלות העסקיות לפי " +
          "הסניפט: 'Which sequences exist for a manufacturing order?', 'Which are the branch and return " +
          "operations of a parallel sequence?' ו-'Which reference bill of operation (routing) data belong " +
          "to a manufacturing order sequence?'. צמדי שם ותיאור בסניפט: 'ManufacturingOrderSequence " +
          "Sequence', 'MfgOrderSequenceText Sequence Text', 'MfgOrderSqncBranchOperation_2 Branch " +
          "Operation', 'MfgOrderSqncReturnOperation_2 Return Operation', 'ManufacturingOrderCategory Order " +
          "Category', 'ManufacturingOrderType Order Type', 'MfgOrderSequenceCategory Sequence Category', " +
          "'ProductionPlant Production Plant', 'BillOfOperationsType BOO Type'. אותו עמוד נושא הודעת הוצאה " +
          "משימוש ברמת אלמנט: 'We recommend that you switch to the following successor element(s) as soon " +
          "as possible: MfgOrderSequenceBrnchOperation -> MfgOrderSqncBranchOperation_2 " +
          "MfgOrderSequenceRetOperation -> MfgOrderSqncReturnOperation' וכן 'SAP may make the deprecated " +
          "elements unusable, usually no earlier than one year after the deprecation. For more " +
          "information, see Deprecated and Decommissioned CDS Views'. ההוצאה משימוש חלה על אלמנטים בתוך " +
          "התצוגה, והסניפט אינו אומר דבר על הוצאה משימוש של הטבלה AFFL.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Sequences | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/ac01b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד 'Sequences' בתיעוד Production Orders (PP-SFC) לגרסת 2025 FPS01 קובע: 'Features The " +
          "following types of sequence exist in the SAP System: Standard sequence A standard sequence is " +
          "the first sequence of operations that is created in the routing or production order', ומוסיף: " +
          "'If certain operations are to be executed as alternatives to or parallel to part of the " +
          "standard sequence then they must be grouped together as alternative or parallel sequences', " +
          "'Alternative sequence Alternative sequences contain operations that replace the operations in " +
          "the standard sequence', 'Parallel sequence A parallel sequence runs parallel to the operations " +
          "of the standard se' (כאן הסניפט נקטע), 'If parallel sequences exist in the routing selected " +
          "then they are automatically copied to the order when the routing is exploded' ו-'Note " +
          "Alternative sequences cannot be changed or added to the production order'. הסניפט אינו נוקב בשם " +
          "טבלה, ולכן הוא תומך בקיום מושג הרצפים (סטנדרטי, מקבילי, חלופי) בפקודת הייצור ב-2025 FPS01 ולא " +
          "בקישור ישיר ל-AFFL.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Operative Project Structures (PS-ST-OPR) | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/87d0b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד הארכוב הרשמי לגרסת 2025 FPS01 קובע: 'You can use archiving object PS_PROJECT to archive " +
          "data from the following database tables', ובטבלת העמוד מופיעה השורה 'Order for information " +
          "system' עם מחלקת הארכוב PS_ORDER והטבלאות 'AFFL AFIH AFKO AFPO AFVC AFVU AFVV AUFK PAF VBAK " +
          "VBAP'. כלומר AFFL עדיין מופיעה כטבלת בסיס נתונים בתיעוד הרשמי של 2025 FPS01. הסניפט אינו מתאר " +
          "את מבנה הטבלה ואינו עוסק בהשוואה בין ECC ל-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ה-blueprint של ההגירה (PP-PI), רשומת AFFL",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "ה-blueprint של PP-PI מתאר את AFFL כ'רצף פעולות בפקודה' עם הטרנזקציות COR2 ו-COR3, ומסמן s4Note " +
          "'מותאם (תואם).'. רשימת השדות שבמאגר: AUFPL (NUMC 10, מסומן PK/FK), APLFL (CHAR 6, מסומן PK), " +
          "PLNFL (CHAR 6, לא מפתח) ו-FLGAT (CHAR 1, לא מפתח). ה-join שבמאגר הוא 'FROM AFFL JOIN AFKO ON " +
          "AFFL.AUFPL = AFKO.AUFPL'. שדה descriptionEn של הטבלה הוא 'Routing number of operations', שהוא " +
          "הטקסט שאותו blueprint נותן לשדה AUFPL ולא שם הטבלה.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#AFFL",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט, רשומת AFFL",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "העשרת המאגר רושמת ל-AFFL מפתח ראשי MANDT, AUFPL ו-APLZL, מפתחות זרים 'AUFPL -> AFKO' " +
          "ו-'AUFPL+APLZL -> AFVC', ומסמנת את הרשומה verified. מפתח זה סותר את רשימת השדות של ה-blueprint, " +
          "שמסמנת APLFL כמפתח ואינה מונה APLZL כלל.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#AFFL",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת ההשפעה של הפרויקט (S4_IMPACT), הסט S4_STABLE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE4,
        claim: "AFFL אינה נמנית בסט S4_STABLE של המאגר, בעוד אחיותיה במבנה הפקודה AFKO, AFPO, AFVC ו-AUFK כן " +
          "נמנות בו. שכבת היציבות של המאגר שותקת לגבי AFFL.",
        verificationLevel: "repository_verified",
        repoRef: "data/s4-impact.ts#S4_STABLE",
      },
    ],
    status: {
      status: "unchanged",
      he: "טבלת AFFL (רצף פעולות בפקודה) פעילה ב-S/4HANA On-Premise, מופיעה בתיעוד הרשמי עד 2025 FPS01, ואין " +
        "לה טבלה חליפית באף אחד מהמקורות שנבדקו. שתי תצוגות VDM רשמיות קוראות ממנה את רצפי הפעולות: " +
        "I_ProductionOrderSequence ('production order sequence data by semantic key (table AFFL)') " +
        "ו-I_MfgOrderSequence ('manufacturing order sequence data (table AFFL)'), ותיעוד PP-SFC של 2025 " +
        "FPS01 עדיין מתאר את סוגי הרצפים בפקודה (רצף סטנדרטי, רצפים מקבילים ורצפים חלופיים). אף מקור רשמי " +
        "שנבדק אינו נוקב ביורשת, בהוצאה משימוש או בשינוי מבנה של הטבלה. הודעת ההוצאה משימוש שבעמוד " +
        "I_MfgOrderSequence חלה על אלמנטים בתוך התצוגה ולא על הטבלה.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Archiving Operative Project Structures (PS-ST-OPR) | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/87d0b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE4,
        claim: "עמוד הארכוב הרשמי לגרסת 2025 FPS01 קובע: 'You can use archiving object PS_PROJECT to archive " +
          "data from the following database tables', ובטבלת העמוד מופיעה השורה 'Order for information " +
          "system' עם מחלקת הארכוב PS_ORDER והטבלאות 'AFFL AFIH AFKO AFPO AFVC AFVU AFVV AUFK PAF VBAK " +
          "VBAP'. כלומר AFFL עדיין מופיעה כטבלת בסיס נתונים בתיעוד הרשמי של 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "להמשיך לקרוא את רצפי הפעולות מ-AFFL דרך AUFPL של AFKO, לפי ה-join שבמאגר 'FROM AFFL JOIN AFKO ON " +
        "AFFL.AUFPL = AFKO.AUFPL'; לפי המקורות שנבדקו אין פעולת הסבה לטבלה עצמה. לפיתוח חדש ולצריכה " +
        "אנליטית להעדיף את תצוגות ה-CDS הרשמיות I_ProductionOrderSequence ו-I_MfgOrderSequence על פני " +
        "SELECT ישיר, ובתוך I_MfgOrderSequence לצרוך את אלמנטי היורש MfgOrderSqncBranchOperation_2 " +
        "ו-MfgOrderSqncReturnOperation_2, מאחר שהעמוד הרשמי מסמן את קודמיהם כמוצאים משימוש ומזהיר ש-SAP " +
        "עשויה להפוך אלמנטים מוצאים משימוש לבלתי שמישים. מכיוון שה-blueprint של PP-PI פותח ב'מותאם " +
        "(תואם)', להריץ Regression Test על קוד מותאם, User Exits ודוחות שקוראים AFFL ישירות, ולאמת ב-SE11 " +
        "במערכת היעד את מפתח הטבלה ואת רשימת השדות לפני שמסתמכים על תיעוד המאגר.",
    },
    xrefs: [
      "table:AFKO", "table:AFVC", "table:AFPO", "table:AUFK", "table:PLFL", "tx:CO02", "tx:CO03", "tx:COR2",
      "tx:COR3",
    ],
    lastVerifiedAt: DATE4,
    notes: "ארבע רשומות חיפוש רשמיות (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE, נגישות " +
      "ב-2026-09-15) מציגות את AFFL כטבלה חיה: שני עמודי VDM שנוקבים בה במפורש ('table AFFL') בסט התיעוד " +
      "2023 Latest, עמוד ארכוב PS של 2025 FPS01 שמונה אותה ברשימת טבלאות הבסיס של אובייקט הארכוב " +
      "PS_PROJECT, ועמוד PP-SFC של 2025 FPS01 שמתאר את סוגי הרצפים בלי לנקוב בטבלה. רק סניפטים רשמיים " +
      "שימשו לניסוח; גופי העמודים ב-help.sap.com הם מעטפת JavaScript ולא נקראו, ולא נטען שום מספר SAP Note " +
      "או KBA. שני עמודי ה-VDM מאונדקסים בשירות החיפוש תחת 2023 Latest בלבד, וכותרתם, ה-deliverable, " +
      "ה-versionId וה-loio שלהם אומתו מחדש בשאילתה חיה ב-2026-09-15; כתובת ה-URL עונה גם עם " +
      "version=2025.001 (HTTP 200) אך התוכן לא נקרא, ולכן ה-release של אותן ראיות נשאר 2023.latest כלשון " +
      "רשומת החיפוש. עמוד I_MfgOrderSequence נושא הודעת הוצאה משימוש ברמת אלמנט " +
      "(MfgOrderSequenceBrnchOperation ו-MfgOrderSequenceRetOperation מוחלפים בגרסאות _2); זו אמירה על " +
      "התצוגה ולא על הטבלה, והיא שוקפה בפעולה המומלצת. סתירה פנימית במאגר: ה-blueprint של PP-PI פותח " +
      "ב'מותאם (תואם)', ולכן המפה של האפליקציה גוזרת כיום 'משתנה ב-S/4HANA' (class 1, derivedFrom " +
      "blueprint), בעוד AFFL אינה נמנית בסט S4_STABLE (בניגוד ל-AFKO, AFVC ו-AFPO), כלומר שכבת היציבות של " +
      "המאגר שותקת לגביה. אף מקור רשמי אינו נוקב בשינוי מבני, ולכן נבחר 'ללא שינוי', והסתייגות ה-blueprint " +
      "נשמרה בפעולה המומלצת. שתי רשומות המאגר חלוקות על מפתח הטבלה: data/table-enrichment.ts#AFFL נוקב " +
      "ב-MANDT, AUFPL ו-APLZL, ואילו data/sapData.pppi.ts#AFFL מסמן את AUFPL כ-PK/FK ואת APLFL כ-PK. אף " +
      "סניפט רשמי בסבב הזה אינו נוקב במפתח, והחיבור ל-sc4sap (מערכת ABAP חיה) אינו זמין, ולכן מפתח ה-DDIC " +
      "נשאר לא מאומת. בנוסף, descriptionEn של AFFL ב-blueprint הוא 'Routing number of operations', שהוא " +
      "הטקסט שאותו blueprint נותן לשדה AUFPL ולא לטבלה; שם הטבלה באנגלית לא אומת בסבב הזה. התצוגות " +
      "I_ProductionOrderSequence ו-I_MfgOrderSequence מגובות בראיות רשמיות אך אינן ב-xrefs כי אין להן מזהה " +
      "בר-פענוח בדאטהסט (ROUTE_MANIFEST.cds). data/cds-map.ts ו-data/cds-enrichment.ts מקשרים את " +
      "I_ProductionOrderOperation ל-AFVC ול-AFFL, בעוד עמוד ה-VDM הרשמי של אותה תצוגה (בשם " +
      "I_ProductionOrderOperation_2, כפי שכבר תועד ברשומת cds:I_ProductionOrderOperation) נוקב בטבלאות " +
      "AFVC, AFVV ו-AFVU בלבד; לכן התצוגה הזו לא נכללה ב-xrefs. אמירת SAP שלפיה manufacturing order כולל " +
      "הזמנות תהליך נתמכת ברשומה רשמית נוספת שלא נכללה כראיה: 'SOAP API: Manufacturing Order - Send' " +
      "(What's New in SAP S/4HANA 2020, versionId 2020.000, loio df3f710673d84463b94b3ad5c04ba395), " +
      "שסניפטה קובע 'you can send manufacturing orders (production orders or process orders) from an SAP " +
      "S/4HANA system'. הטרנזקציות ב-xrefs: COR2/COR3 מגיעות מ-data/table-tcodes.json לרשומת AFFL, " +
      "ו-CO02/CO03 מהקשר פקודת הייצור של אותם עמודי PP-SFC; שיוך הטרנזקציה לטבלה אינו מגובה בסניפט רשמי.",
  },
];
