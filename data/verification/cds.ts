/* Project NEO · verification overlay — CDS views (`cds:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02, graduated): 13 audited records. Tier-1
   evidence comes from help.sap.com search records (scripts/sap-help-search.mjs;
   loio + versionId re-verified live at audit) and from three fully-read
   What's New PDFs; Tier-2 is the named repository record (data/cds-map.ts,
   data/cds-enrichment.ts). Every claim is bounded by the snippet, the read PDF
   page or the named repository record; negative findings are search-bounded,
   never absolute. Body text of help.sap.com topics is never quoted (JS shell).
   Auditor downgrades applied in full; deferred decisions and open conflicts
   live in audit/s4-enrichment/research-queue-cds.md.
   Batch 2 (2026-09-14, PP/PP-PI master data and production views): 13 more
   audited records under the same rules (DATE14); three of them (I_Routing,
   I_RoutingOperation, I_MRPMaterial) found no official page naming the view
   and stay honest at verification_required / no authored status.
   The honesty trap the plan names still holds: data/cds-enrichment.ts marks
   views "verified" with templated source strings, not URLs, so that layer
   stays repository_verified (or verification_required) here. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE2 = "2026-09-02";
const DATE14 = "2026-09-14";

/* ------------------------------------------------------------- shared docs */

/** cds:I_Equipment: the official record that carries its authored status. */
const EQUIPMENT_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Equipment | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/b3f9876bb0eb4141ab9f5dea73e5db4a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE2,
  claim:
    "נושא ה-VDM הרשמי 'Equipment' (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest) קובע: " +
    "'Technical Name I_Equipment', 'View Type Basic', 'Release Status Released', ומטרה: 'This CDS view " +
    "provides access to the master data of a piece of equipment'. לפי הסניפט התצוגה עונה על שאלות כגון תאריך " +
    "ההפעלה, סטטוס המערכת ופרטי היצרן של פריט הציוד, ומונה כמאפיינים חשובים: Piece of equipment, Equipment " +
    "category, Technical object type, Plant, Manufacturer country, User who created the piece of equipment, " +
    "Construction year and month.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_FunctionalLocation: the official record that carries its authored status. */
const FUNCLOC_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Functional Location | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/bb72281d5569412e9d1721cc89209f42.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE2,
  claim:
    "רשומת החיפוש הרשמית של עמוד ה-VDM קובעת: 'Functional Location Technical Name I_FunctionalLocation View " +
    "Type Basic Release Status Released', ומתארת אותה כתצוגה ש'provides the prerequisites for answering the " +
    "following business questions' (כלשון הסניפט). כלומר: תצוגת CDS בשם זה קיימת בתיעוד ה-Virtual Data Model " +
    "של S/4HANA On-Premise, מסוג Basic, במעמד Released.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_MaintenanceNotification: the official record that carries its authored status. */
const MAINT_MGMT_DEVEXT_WN2025_NOTIF: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Objects Released for Developer Extensibility in Maintenance Management | What's New in SAP S/4HANA and " +
    "SAP S/4HANA Cloud Private Edition 2025",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/e666a33610e6491f9d800882be108d02.html?locale=en-US&state=PRODUCTION&version=2025.000",
  accessedAt: DATE2,
  claim:
    "רשימת האובייקטים ששוחררו ל-Developer Extensibility ב-Maintenance Management לגרסת 2025 מונה 'CDS view " +
    "Maintenance Notification - TP I_MaintenanceNotificationTP_3 New This view retrieves the details of a " +
    "mainteance notification' [כך במקור], לצד I_MaintNotificationItemTP_3 ו-I_MaintNotifItemCauseTP_3. השם " +
    "I_MaintenanceNotification עצמו אינו מופיע ברשומת החיפוש של עמוד זה.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_MaintNotificationItem: the official record that carries its authored status. */
const NOTIF_ITEM_DATA_VDM: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Maintenance Notification Item Data | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/783484db9722497c9b6488640dd31544.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE2,
  claim:
    "תצוגת ה-VDM המתועדת לפריט הודעת אחזקה נקראת I_MaintNotificationItemData, לא I_MaintNotificationItem: " +
    "'CDS View Name I_MaintNotificationItemData Data Category Fact Status Released', חילוץ דלתא לפי השדה " +
    "LastChangeDateTime, מקור נתונים תואם 0I_MAINTNOTIFICATIONITEMDATA, והיא 'modeled for usage as a " +
    "DataSource in Business Warehouse'. התצוגה בנויה על האובייקטים העסקיים Maintenance notification item, " +
    "Maintenance notification ו-Linear Asset Management, ואינה מכילה חלק מהשדות של הודעות שירות (כלשון " +
    "הסניפט).",
  verificationLevel: "sap_official_verified",
};

/** cds:I_MeasuringPoint: the official record that carries its authored status. */
const MEASURING_POINT_VDM_CLOUD: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Measuring Point | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA Cloud Public Edition",
  edition: "public-cloud",
  release: "2608.500",
  url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/74c87e7895bb47bdacf20b1dfe3848f2.html?locale=en-US&state=PRODUCTION&version=2608.500",
  accessedAt: DATE2,
  claim:
    "רשומת החיפוש של תיעוד ה-VDM לגרסת SAP S/4HANA Cloud Public Edition 2608 קובעת: 'CDS View Name " +
    "I_MeasuringPoint Status Released'; בין המאפיינים החשובים שהסניפט מונה: MeasuringPoint. לבירור ייעודי " +
    "השימוש הסניפט מפנה ליישום View Browser (לשונית Annotation).",
  verificationLevel: "sap_official_verified",
};

/** cds:I_MeasurementDocument: the official record that carries its authored status. */
const MEASUREMENT_DOC_VDM_CLOUD: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Measurement Document | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA Cloud Public Edition",
  edition: "public-cloud",
  release: "2608.500",
  url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/3c7e53273aab410dbc5d9ab3e18c42ff.html?locale=en-US&state=PRODUCTION&version=2608.500",
  accessedAt: DATE2,
  claim:
    "תיעוד ה-VDM של SAP S/4HANA Cloud Public Edition (גרסה 2608.500) מתעד את התצוגה בשמה המלא: 'Measurement " +
    "Document, CDS View Name I_MeasurementDocument, Status Released'; בין המדדים והמאפיינים החשובים לפי " +
    "התקציר: MeasurementDocument ו-MeasuringPoint. השאלות העסקיות שהתקציר מונה: מי הזין את קריאות המדידה, " +
    "באיזה תאריך ושעה הוזנו, ומהם פרטי קריאות המדידה הקשורות.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductionOrder: the official record that carries its authored status. */
const DISCRETE_MFG_CDS_WN2025_PRODORDER: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "CDS Views for Discrete Manufacturing | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition " +
    "2025",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/4d82c97578ab4e33be28f60a2163a4c6.html?locale=en-US&state=PRODUCTION&version=2025.000",
  accessedAt: DATE2,
  claim:
    "עמוד ה-What's New של SAP S/4HANA 2025 מונה את 'Production Order Header I_ProductionOrder' בטבלה 'New " +
    "CDS Views Released for Discrete Manufacturing' ('New CDS views were released for Production Operations " +
    "under the Discrete Manufacturing area'), עם 'Type New' ו-'Technical Object Name CDS View: " +
    "I_ProductionOrder'. העמוד מוסיף: 'Some of these CDS views have been enabled for data extraction and can " +
    "provide data extraction for SAP Business Data Cloud data products', בלי לציין בסניפט אילו מהן.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductionOrderConfirmation: the official record that carries its authored status. */
const DISCRETE_MFG_CDS_WN2025_CONFIRMATION: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "CDS Views for Discrete Manufacturing | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition " +
    "2025",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/4d82c97578ab4e33be28f60a2163a4c6.html?locale=en-US&state=PRODUCTION&version=2025.000",
  accessedAt: DATE2,
  claim:
    "פריט What's New MAN-2163-A4C6 לגרסת 2025 קובע: 'New CDS views were released for Production Operations " +
    "under the Discrete Manufacturing area', והטבלה שבו מונה 'Production Order Confirmation " +
    "I_ProductionOrderConfirmation' לצד I_ProductionOrder, I_ProductionOrderStdVH " +
    "ו-I_ProductionOrderComponent. בפרטים הטכניים: 'Scope Item Not applicable', 'Functional Localization No " +
    "localization'; 'Some of these CDS views have been enabled for data extraction and can provide data " +
    "extraction for SAP Business Data Cloud data products'.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_MaterialDocumentItem: the official record that carries its authored status. */
const MATDOC_ITEM_DEPRECATION_WN2021: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Deprecation of CDS Views | What's New in SAP S/4HANA 2021",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2021.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6eac4f4b1c024fc5a0d48c51ca66e83c.html?locale=en-US&state=PRODUCTION&version=2021.000",
  accessedAt: DATE2,
  claim:
    "עמוד What's New לגרסת SAP S/4HANA 2021 קובע: 'The following CDS views were deprecated in SAP S/4HANA " +
    "2021: Material Document Header (I_MaterialDocumentHeader) Material Document Item " +
    "(I_MaterialDocumentItem)'. הסניפט מציב את I_MaterialDocumentItem_2 לצד I_MaterialDocumentItem, בנימוק " +
    "'To improve the runtime performance and reduce the memory consumption in the database'.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductionVersion: the official record that carries its authored status. */
const PRODUCTION_VERSION_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Version | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/7c9e22766a3b4e4b8a7a2bd2bbc36719.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE2,
  claim:
    "העמוד הרשמי של התצוגה ב-VDM קובע: 'CDS View Name I_ProductionVersion', ‏'Data Category Basic, " +
    "Dimension', ‏'Status Released'; תנאי מוקדם: הרשאת תצוגה לגרסת ייצור במפעל (C_FVER_WRK). התצוגה נועדה " +
    "לענות אילו גרסאות ייצור קיימות לחומר במפעל מסוים, אילו משויכות ל-bill of operations ואילו משויכות ל-BOM.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_WorkCenterCostCenter: the official record that carries its authored status. */
const WORKCENTER_COSTCENTER_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Work Center Cost Center | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/f31bf21259154e48a3b7beb4be1ffac4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE2,
  claim:
    "התיעוד הרשמי של ה-Virtual Data Model (‏2023 Latest) מגדיר את התצוגה Work Center Cost Center: שם טכני " +
    "I_WorkCenterCostCenter, סוג תצוגה Basic, Dimension, סטטוס שחרור Released. לפי הסניפט, התצוגה מאפשרת " +
    "לשלוף את מרכזי העלות המשויכים למרכז עבודה (טבלת CRCO) לפי מפתח פנימי, עונה על השאלות 'אילו מרכזי עלות " +
    "משויכים למרכז עבודה' ו'מהו סוג הפעילות המשויך', אין לה פרמטרי קלט, ובין המאפיינים הנקובים: סוג מרכז " +
    "העבודה, המזהה הפנימי של מרכז העבודה ומזהה הקצאת מרכז העלות (Cost center allocation ID).",
  verificationLevel: "sap_official_verified",
};

/* ---------------------------------------------------------------- records */

/* ------------------------------------------- shared docs · batch 2 */

/** cds:I_Product: the official record that carries its authored status. */
const PRODUCT_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Product | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/af5c379f422e495c825802fcb9b0731f.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "רשומת החיפוש הרשמית של עמוד ה-VDM 'Product' (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest) קובעת: 'CDS View Name I_Product', 'Related Text View I_ProductDescription', 'Business Role (Template) SAP_BR_PRODMASTER_SPECIALIST: Master Data Specialist - Product Data', 'Business Catalog SAP_CMD_BC_PR_MAINT_PC', ומטרה: 'This CDS view provides the consumer with list of products along with basic data information'. הסניפט ממשיך: 'Master Data - Product Master', 'Data Category Dimension', 'Status Released', 'Data Extraction Type Full (physical deletions are possible in source tables)', 'Delta: <Technical name of data field>', ובחלון סניפט נוסף של אותה רשומה: 'Structure Object types This view relates to the following SAP object types: Material Product SAP Business Warehouse (SAP BW) Extraction Note The corresponding DataSource (Extractor)'. רשימת השדות וה-associations אינן בסניפט.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductPlant: the official record that carries its authored status. */
const PRODUCT_PLANT_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Product Plant Active Core Entity | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/e63ceee015814892862d40af7688aff1.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "רשומת החיפוש הרשמית של נושא ה-VDM‏ 'Product Plant Active Core Entity' (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest) קובעת: 'CDS View Name I_ProductPlant', תפקיד עסקי (תבנית) SAP_BR_PRODMASTER_SPECIALIST, קטלוג עסקי SAP_CMD_BC_PR_MAINT_PC, 'Data Category Dimension', 'Status Released', ומטרה: 'This CDS view helps to retrieve plant related data of products'. הסניפט מפנה גם לנושא חילוץ הנתונים ('For more information on extraction'). בסקופ On-Premise הסניפט אינו מכיל הערת deprecation או שם יורש.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_BillOfMaterial: the official record that carries its authored status. */
const BOM_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Bill of Material | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/e46cc75700eebc38e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "רשומת החיפוש הרשמית של נושא ה-VDM 'Bill of Material' (On-Premise, 2023 Latest, loio e46cc75700eebc38e10000000a44147b) קובעת: 'Technical Name I_BillOfMaterial', 'View Type Basic', ומטרה: 'This view can determine a valid Bill of Material (BOM) header based on the requested BOM keys and expose BOM Header attributes'. תחת Structure/Attributes הסניפט מונה: BillOfMaterial denotes the BOM number, BillOfMaterialVariant denotes the BOM alternative, BillOfMaterialVariantUsage denotes the BOM Usage. הסניפט אינו מציג Release Status ואינו נוקב בטבלאות MAST או STKO.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_BillOfMaterialItem: the official record that carries its authored status. */
const BOM_ITEM_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Bill of Material Item | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/1b73c75700eebc38e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "רשומת החיפוש הרשמית של נושא ה-VDM (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest, loio 1b73c757) קובעת: 'Bill of Material Item Technical Name I_BillOfMaterialItem View Type Basic', ומטרה: 'This view can determine a valid Bill of Material (BOM) item based on requested BOM keys and expose a BOM item'; 'The view also associates with all standard BOM categories to get category-specific BOM item attributes'. בחלק Structure Attributes שבסניפט: 'BillOfMaterial denotes the BOM number', 'BillOfMaterialVariant denotes the BOM alternative', 'BillOfMaterialItemCategory denotes the BOM item category', 'ValidityStartDate denotes the validity start date of BOM item'. הסניפט אינו מציג שורת Release Status ואינו נוקב בטבלת STPO.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_WorkCenter: the official record that carries its authored status. */
const WORKCENTER_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Work Center | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c90e05a792674f7d8bbae247c5200999.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "נושא ה-VDM הרשמי 'Work Center' (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest, loio c90e05a792674f7d8bbae247c5200999) קובע: 'Technical Name I_WorkCenter', 'View Type Basic, Dimension', 'Release Status Released', ומטרה: 'This CDS view provides the prerequisites for answering the following business questions'. לפי הסניפט, המאפיינים הראשיים שהתצוגה מספקת: Work center type, Work center internal ID, Plant, Work center, Work center category, Work center location, Work center usage. תנאים מוקדמים לפי הסניפט: הרשאה להצגת מרכזי עבודה לפי מפעל (C_ARPL_WRK) והרשאה להצגת מרכזי עבודה לפי קטגוריית מרכז עבודה (C_ARPL_ART). הסניפט אינו נוקב בטבלת המקור של התצוגה.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductionOrderItem: the official record that carries its authored status. */
const DISCRETE_MFG_CDS_WN2025_ITEM: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "CDS Views for Discrete Manufacturing | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/4d82c97578ab4e33be28f60a2163a4c6.html?locale=en-US&state=PRODUCTION&version=2025.000",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.000",
  accessedAt: DATE14,
  claim: "עמוד ה-What's New של SAP S/4HANA 2025 (loio 4d82c97578ab4e33be28f60a2163a4c6): 'New CDS views were released for Production Operations under the Discrete Manufacturing area', ובטבלה 'New CDS Views Released for Discrete Manufacturing' מופיעה השורה 'Production Order Item I_ProductionOrderItem Production Order Item' לצד I_ProductionOrder‏, I_ProductionOrderStdVH‏, I_ProductionOrderComponent‏, I_ProductionOrderConfirmation‏, I_ProductionOrderDocumentLink ו-I_ProductionOrderOperation_2. הסניפט קובע 'Type New', 'Functional Localization No localization', 'Scope Item Not applicable', 'Availability SAP S/4HANA Cloud Private Edition and SAP S/4HANA' ו-'Valid as Of 2025', ורכיב היישום מסתיים במילים '(Virtual Data Model in PP)'. העמוד מוסיף: 'Some of these CDS views have been enabled for data extraction and can provide data extraction for SAP Business Data Cloud data products', בלי לציין בסניפט אילו מהן.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductionOrderOperation: the official record that carries its authored status. */
const PRODORDER_OPERATION_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Order Operation | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/60ade555aa3742b58cf83828022b6eac.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "עמוד ה-VDM הרשמי 'Production Order Operation' (סט התיעוד On-Premise 2023 Latest) נוקב בשם הטכני 'CDS View Name I_ProductionOrderOperation_2', ולא בשם I_ProductionOrderOperation. לפי הסניפט: 'Analytical Data Category Fact', 'This view represents the SAP object type ProductionOrder (BusinessObject', ומטרתה 'This CDS view retrieves production order operation data by internal key (tables AFVC, AFVV, AFVU)'. השאלות העסקיות שהסניפט מונה: 'Which operations exist for a production order?', 'Which work center belongs to a production order operation?', 'Which production order operations are externally processed?'. בין השדות שהסניפט מונה: OrderInternalID, OrderOperationInternalID, ProductionOrder, ProductionOrderSequence, ProductionOrderOperation, ProductionOrderType, וכן 'Deltas are determined automatically by change data capture'.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_ProductionOrderComponent: the official record that carries its authored status. */
const DISCRETE_MFG_CDS_WN2025_PRODORDERCOMP: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "CDS Views for Discrete Manufacturing | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/4d82c97578ab4e33be28f60a2163a4c6.html?locale=en-US&state=PRODUCTION&version=2025.000",
  accessedAt: DATE14,
  claim: "עמוד ה-What's New של SAP S/4HANA 2025 (loio 4d82c97578ab4e33be28f60a2163a4c6, רכיב יישום 'PP-VDM (Virtual Data Model in PP)', 'Availability SAP S/4HANA Cloud Private Edition and SAP S/4HANA', 'Valid as Of 2025') מונה בטבלת התצוגות 'Production Order Component I_ProductionOrderComponent' לצד I_ProductionOrder, I_ProductionOrderStdVH ו-I_ProductionOrderConfirmation, עם 'Type New', 'Scope Item Not applicable', 'Functional Localization No localization' ו-'Technical Object Name CDS View: I_ProductionOrder I_ProductionOrderStdVH I_ProductionOrderComponen[t]' (הסניפט נקטע). העמוד מוסיף: 'Some of these CDS views have been enabled for data extraction and can provide data extraction for SAP Business Data Cloud data products', בלי לציין בסניפט אילו מהן.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_Batch: the official record that carries its authored status. */
const BATCH_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Batch | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/ef1cd6cd9fb6418bb311b2b8e37b6b1e.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "רשומת החיפוש הרשמית של נושא ה-VDM 'Batch' (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest, loio ef1cd6cd9fb6418bb311b2b8e37b6b1e) קובעת: 'Batch Technical Name I_Batch View Type Composite Release Status Released Purpose This CDS view provides the prerequisites for answering the following business questions'. הסניפט מוסיף שני היגדים על התנהגות התצוגה: 'If both the batches and their assignment are relevant, you can use I_Batch directly' וכן 'the CDS view I_Batch always contains at least one row for each batch, even if the batch has not been assigned to any plant' (בהקשר רמת אצווה 'material'), ומגבלה: 'Use CDS view Batch Distinct (I_BatchDistinct) if you are looking for a view that only returns one row per batch regardless of batch-level configuration'. רשימת השדות, ה-associations והפרמטרים אינם מופיעים בסניפט.",
  verificationLevel: "sap_official_verified",
};

/** cds:I_MaterialStock: the official record that carries its authored status. */
const MATERIAL_STOCK_VDM_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Material Stock | Virtual Data Model and CDS Views",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.latest",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/4c7f68579552346ae10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2023.latest",
  accessedAt: DATE14,
  claim: "עמוד ה-VDM הרשמי 'Material Stock' (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest, loio 4c7f68579552346ae10000000a4450e5) קובע: 'Technical Name I_MaterialStock', 'View type Interface', 'Dimension', ומטרה: 'This CDS view is the basic view for the consumption views Total Actual Stock Quantity (C_MaterialStockActual) and Material Stock at Posting Date (C_MaterialStockByKeyDate) and provides you with the possibility to build your own consumption views on top'. הסניפט מוסיף: 'The view does not have any input parameters', 'The view contains all relevant measures and attributes', ומונה כדוגמאות למדדים: Material stock quantity in material base unit, Material stock increase quantity in material base unit, Material stock decrease quantity in material base unit. סטטוס שחרור (Release Status) אינו מופיע בסניפט שנשלף.",
  verificationLevel: "sap_official_verified",
};

export const CDS_VERIFICATION: VerificationRecord[] = [
  {
    id: "cds:I_MaintenanceOrder",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle:
          "help.sap.com search: \"I_MaintenanceOrder\", \"Maintenance Order CDS View Name\", \"Virtual Data Model CDS " +
          "Views Maintenance Order\", \"I_MaintenanceOrder CDS view released\" and 11 further variants " +
          "(SAP_S4HANA_ON-PREMISE 2023.latest / 2025.001 + SAP_S4HANA_CLOUD)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ממצא שלילי: בסריקת כל נושאי המדריך 'Virtual Data Model and CDS Views' הנוגעים לפקודת אחזקה (17 נושאים " +
          "בסקופ On-Premise, 21 בסקופ Public Cloud, 15 וריאציות שאילתה) אף נושא אינו נוקב בשם I_MaintenanceOrder " +
          "בשדה CDS View Name. השמות המתועדים לפקודת אחזקה הם I_MaintenanceOrderStdVH, I_MaintenanceOrderDEX, " +
          "I_MaintOrderTechObjCube, I_MaintOrderOperation_DEX, I_MaintOrderComponentDEX " +
          "ו-I_MaintOrdChangeDocumentDEX, ובענן הציבורי I_MaintenanceOrderBasic. גם בקובץ ה-PDF של What's New 2025 " +
          "FPS01 השם המדויק אינו מופיע.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מתארת את I_MaintenanceOrder כתצוגת Interface (VDM) לפקודת אחזקה מעל AUFK/AFKO עם מפתח " +
          "MaintenanceOrder, ומציינת כחלופת ECC את הטבלאות AUFK+AFKO ואת הטרנזקציות IW31/IW32/IW33. הרשומה מסומנת " +
          "verified, אך מקורותיה הם מחרוזות תבנית ללא קישור רשמי, ואת השדות וה-associations שברשומה לא ניתן לאשר " +
          "ממקור רשמי נגיש.",
        verificationLevel: "verification_required",
        repoRef: "data/cds-enrichment.ts#I_MaintenanceOrder",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim: "המיפוי מקשר את התצוגה לטבלאות AUFK ו-AFKO (מודול PM) ללא שכבת צריכה או יישום Fiori.",
        verificationLevel: "verification_required",
        repoRef: "data/cds-map.ts#I_MaintenanceOrder",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order (Value Help) | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/9574c7f991924fe1a3e444f05602a17b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "הקשר בלבד (לא אישור לשם I_MaintenanceOrder): המדריך הרשמי מתעד את תצוגת עזרת הערכים " +
          "I_MaintenanceOrderStdVH לפקודת אחזקה וקובע: 'This view should be used for value help purposes only. If " +
          "you intend to select the entire business data, use the view instead'. שם התצוגה הראשית שאליה מפנה המשפט " +
          "אינו מופיע בתקציר החיפוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Objects Released for Developer Extensibility in Maintenance Management | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/703891a9fae040cda87dd8f5d23fadb1.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE2,
        claim:
          "הקשר בלבד: בין האובייקטים שנפתחו ל-Developer Extensibility בניהול אחזקה ב-SAP S/4HANA 2023 נמנית 'CDS " +
          "view Maintenance Order Data I_MaintenanceOrderDEX New: This CDS view provides access to maintenance " +
          "order data', והתקציר מזכיר גם את ממשק האובייקט העסקי I_MaintenanceOrderTP. השם I_MaintenanceOrder לבדו " +
          "אינו נמנה בתקציר.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "תצוגת CDS לפקודת אחזקה שהמאגר מציג כתצוגת Interface מעל AUFK/AFKO. בתיעוד SAP הרשמי הנגיש (מדריך " +
        "Virtual Data Model and CDS Views, מדריכי What's New 2023 עד 2025 FPS01, סקופ On-Premise ו-Public Cloud) " +
        "לא אותר נושא הנוקב בשם I_MaintenanceOrder. התצוגות המתועדות לפקודת אחזקה הן I_MaintenanceOrderStdVH " +
        "(עזרת ערכים), I_MaintenanceOrderDEX (גישה לנתוני פקודה, נפתחה ל-Developer Extensibility ב-2023) " +
        "ו-I_MaintOrderTechObjCube (סטטוס Released לפי התקציר), ובענן הציבורי I_MaintenanceOrderBasic. קיום " +
        "התצוגה, מצב השחרור שלה, שדותיה וה-associations שברשומת ההעשרה דורשים אימות.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לאמת במערכת S/4HANA היעד (ADT או SE11, ואפליקציית View Browser) שהתצוגה I_MaintenanceOrder קיימת ומהו " +
        "חוזה השחרור שלה לפני שימוש בקוד מותאם או בהרחבות. לחילוץ ולדיווח על פקודות אחזקה המדריך הרשמי מתעד את " +
        "I_MaintenanceOrderDEX ואת I_MaintOrderTechObjCube, ולעזרת ערכים את I_MaintenanceOrderStdVH. אין להציג " +
        "את I_MaintenanceOrder כתצוגה משוחררת או מתועדת עד לאימות.",
    },
    xrefs: ["table:AUFK","table:AFKO","tx:IW31","tx:IW32","tx:IW33"],
    lastVerifiedAt: DATE2,
    notes:
      "לא אותר תיעוד רשמי לשם I_MaintenanceOrder: 15 וריאציות חיפוש בשירות החיפוש של help.sap.com (סקופ " +
      "On-Premise בגרסאות 2023.latest ו-2025.001 וסקופ Public Cloud 2608.500, ‏2026-09-02), סריקה מלאה של " +
      "נושאי פקודת אחזקה במדריך Virtual Data Model and CDS Views, קריאה מלאה של PDF What's New 2025 FPS01 ושל " +
      "שני מדריכי Business Accelerator Hub (Custom CDS Views; Plant Maintenance Order Date Change) לא העלו את " +
      "השם המדויק. חיפוש רשת מוגבל ל-api.sap.com החזיר רק את API_MAINTENANCEORDER " +
      "ו-OP_API_MAINTENANCEORDER_0001, ללא עמוד cdsviews לתצוגה זו; קורפוס הספרים במאגר אינו מזכיר את השם. " +
      "אי-התאמה פנימית: השיעור data/academy/lessons/pm-generated.ts (שורה 608) מסמן את I_MaintenanceOrder " +
      "בדרגת אמון verified-docs עם המקור 'SAP Help Portal', סימון שהחיפושים הרשמיים בסשן זה לא הצליחו לשחזר; " +
      "רשומת ההעשרה ו-cds-map הן מקור המיפוי ל-AUFK/AFKO. מה חסר לשדרוג: נושא רשמי ב-help.sap.com שבו CDS View " +
      "Name הוא I_MaintenanceOrder, עמוד cdsviews ב-api.sap.com, או בדיקת ADT/SE11 חיה במערכת היעד (חיבור " +
      "sc4sap MCP נכשל בסשן זה). ביקורת עצמאית 2026-09-05: שני ה-loio, כותרותיהם, גרסאותיהם וכל המחרוזות " +
      "המצוטטות שוחזרו מתקצירי שירות החיפוש; הממצא השלילי שוחזר בסקופ On-Premise ו-Public Cloud.",
  },
  {
    id: "cds:I_Equipment",
    aliases: ["I_EQUIPMENT"],
    evidence: [
      EQUIPMENT_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Equipment | Virtual Data Model and CDS Views (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/b3f9876bb0eb4141ab9f5dea73e5db4a.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE2,
        claim:
          "אותו נושא (loio זהה) במערך התיעוד של Cloud Public Edition, גרסה 2608.500: 'CDS View Name I_Equipment', " +
          "'Data Category Basic', 'Status' ולאחר קיצור בסניפט 'Released Purpose', אותה הגדרת מטרה ('provides " +
          "access to the master data of a piece of equipment'), ושאלה עסקית 'What are the equipment ID and the " +
          "equipment description?'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/13d40bd35fc74d289e81fc284a928448.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "מדריך ה-API של 2025 FPS01 מתעד את שירות ה-OData‏ Equipment‏ ('Technical name: API_EQUIPMENT') כשירות " +
          "ש-'built using the CDS views based on equipment, long text, business partner, class, characteristics " +
          "value and warranty master data tables via gateway service builder and SADL', עם פעולות קריאה, יצירה " +
          "ועדכון של נתוני אב ציוד, ומחיקה של הקצאת סיווג בלבד (כלשון הסניפט: 'create, update, read and delete " +
          "(only class assignment)'). הסניפט אינו נוקב בשם I_Equipment כתצוגה שמתחת לשירות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט ורשומת ההעשרה של התצוגה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המיפוי בפרויקט מקשר את I_Equipment (ציוד, מודול PM) לטבלאות EQUI ו-EQKT. רשומת ההעשרה " +
          "(data/cds-enrichment.ts#I_Equipment) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, מגדירה viewType " +
          "'Interface (Composite)', מפתח Equipment, ו-associations ‏_FunctionalLocation‏, _EquipmentCategory‏, " +
          "_MaintenancePlant, ונוקבת בחלופת ECC‏: EQUI+EQKT+ILOA עם IE01/IE02/IE03.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_Equipment",
      },
    ],
    status: {
      status: "s4_native",
      secondary: ["released_api_available"],
      he:
        "תצוגת CDS מסוג Basic במודל הנתונים הווירטואלי (VDM) של SAP S/4HANA, בסטטוס שחרור Released לפי התיעוד " +
        "הרשמי (Virtual Data Model and CDS Views, On-Premise 2023 Latest). התצוגה מספקת גישה לנתוני האב של פריט " +
        "ציוד (תחזוקת מפעל, PM) ועונה לפי הסניפט על שאלות כגון תאריך הפעלה, סטטוס מערכת ופרטי יצרן. אותו נושא " +
        "מתועד גם ב-Cloud Public Edition ‏(2608.500) עם Data Category Basic, והסניפט שם מציג 'Status' ולאחר " +
        "קיצור 'Released Purpose'. ב-ECC אין תצוגת VDM מקבילה; המקור הקלאסי לפי מיפוי הפרויקט הוא EQUI ו-EQKT.",
      edition: "on-premise",
      release: "2023.latest",
      source: EQUIPMENT_VDM_2023,
      recommendedAction:
        "לקריאה, לדיווח ולאנליטיקה על נתוני אב ציוד ב-S/4HANA להשתמש ב-I_Equipment (תצוגת Basic משוחררת) במקום " +
        "SELECT ישיר מ-EQUI/EQKT. את שמות השדות, ה-associations וטבלת ה-Structure/Business Objects יש לאמת מול " +
        "גוף העמוד הרשמי או מול מערכת חיה, כי הסניפט מונה רק את המאפיינים החשובים. ליצירה ולשינוי של ציוד " +
        "(ולמחיקת הקצאת סיווג בלבד) לעבוד מול ה-OData API‏ API_EQUIPMENT ‏(מדריך APIs for Maintenance " +
        "Management, 2025 FPS01) ולא מול התצוגה. לתקן את data/cds-enrichment.ts: הערך viewType 'Interface " +
        "(Composite)' סותר את 'View Type Basic' הרשמי.",
    },
    xrefs: [
      "table:EQUI", "table:EQKT", "table:EQUZ", "table:ILOA", "tx:IE01", "tx:IE02", "tx:IE03",
      "tx:IH08", "fm:BAPI_EQUI_GETDETAIL", "fm:BAPI_EQUI_CREATE", "fm:BAPI_EQUI_CHANGE",
      "cds:I_FunctionalLocation", "cds:I_EquipmentTimeSegment", "fiori:F2730A",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('I_Equipment', 'Equipment CDS view " +
      "Virtual Data Model', 'APIs for Asset Management equipment', 'I_Equipment Release Status Released " +
      "Basic', 'I_Equipment important attributes', ובמערך SAP_S4HANA_CLOUD‏ 'Equipment CDS view'), חיפוש רשת " +
      "מוגבל-דומיין על help.sap.com/api.sap.com, ורובד Tier-2 מהמאגר. גוף העמוד הרשמי אינו נשלף (מעטפת " +
      "JavaScript), ולכן כל טענה מוגבלת לכותרת ולסניפט של רשומת החיפוש; רשימת השדות המלאה, ה-associations, " +
      "הפרמטרים וטבלת Business Objects של התצוגה לא אומתו. ב-On-Premise נושא ה-VDM‏ 'Equipment' מאונדקס רק תחת " +
      "2023 Latest (2023.latest); חיפושים תחת 2025.000 ו-2025.001 (כולל עמוד התוצאות המלא) לא החזירו אותו, אף " +
      "שמדריך ה-VDM עצמו (אותו מזהה מסמך) קיים ל-2025.001. לכן הגרסה ברשומה היא 2023.latest, ואותו loio מופיע " +
      "במערך Cloud Public Edition בגרסה 2608.500. סתירה מול המאגר: data/cds-enrichment.ts מגדיר viewType " +
      "'Interface (Composite)' בעוד המקור הרשמי קובע 'View Type Basic' / 'Data Category Basic'; ה-associations " +
      "והערות ה-annotation שברשומת ההעשרה אינם מופיעים בסניפט ונשארים ברמת נדרש אימות. מזהה ה-Fiori‏ F2730A " +
      "‏(Manage Technical Objects) הוא מזהה המאגר (data/fiori/apps.ts) ולא אומת מול ספריית האפליקציות במעבר " +
      "זה; data/tx-intel.ts ‏(IE01) נוקב F1827 לאותה אפליקציה, סטייה פנימית שנרשמה בתור המחקר. אף מקור רשמי " +
      "אינו מסמן את I_Equipment כמוצאת משימוש או מוחלפת, ולכן אין יורש. API_EQUIPMENT מוזכר בטקסט בלבד כי אין " +
      "לו מזהה קנוני ביקום הרשומות.",
  },
  {
    id: "cds:I_FunctionalLocation",
    aliases: ["I_FUNCTIONALLOCATION"],
    evidence: [
      FUNCLOC_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle:
          "CDS Views for Maintenance Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition " +
          "2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/f4df9b920669467aadcf4740f58286a0.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE2,
        claim:
          "עמוד ה-What's New לגרסת 2025 מונה תחת רכיב היישום PM-EQM-FL (Functional Locations) את התצוגה " +
          "'Functional Location Text (I_FunctionalLocationText)' וקובע: 'This CDS view is the text view for " +
          "I_FunctionalLocation'. באותו עמוד נמנות גם Functional Location Status (I_FunctionalLocationStatus) " +
          "ו-Functional Location Label (I_FunctionalLocationLabel). התצוגה I_FunctionalLocation משמשת אפוא בסיס " +
          "לתצוגות המשלימות גם בתיעוד גרסת 2025.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מתארת תצוגת Interface מעל IFLOT/ILOA עם מפתח FunctionalLocation, קישורי association לציוד, " +
          "למיקום-אב ולמפעל התחזוקה, וחלופת ECC של IL01/IL02/IL03/IH06. הרשומה מסווגת את התצוגה כ-Interface " +
          "(Composite), בעוד שהרשומה הרשמית (VDM, 2023 Latest) מציינת View Type Basic; המפתח וה-associations לא " +
          "אומתו מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_FunctionalLocation",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המיפוי המתוחזק בפרויקט מקשר את I_FunctionalLocation (מודול PM, 'מיקום פונקציונלי') לטבלאות הקלאסיות " +
          "IFLOT ו-ILOA. שיוך הטבלאות נובע מנתוני הפרויקט בלבד; גוף העמוד הרשמי לא נקרא.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_FunctionalLocation",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת CDS של ה-Virtual Data Model למיקום פונקציונלי (תחזוקת מפעל). תיעוד S/4HANA On-Premise הרשמי מונה " +
        "אותה בשם הטכני I_FunctionalLocation, מסוג View Type Basic ובמעמד Release Status Released, ותיעוד " +
        "ה-What's New לגרסת 2025 מפנה אליה כבסיס לתצוגת הטקסט I_FunctionalLocationText. ב-ECC אין תצוגה מקבילה: " +
        "הקריאה נעשית ישירות מטבלאות IFLOT ו-ILOA.",
      edition: "on-premise",
      release: "2023.latest",
      source: FUNCLOC_VDM_2023,
      recommendedAction:
        "בקוד חדש ב-S/4HANA לקרוא נתוני מיקום פונקציונלי דרך I_FunctionalLocation (וטקסטים דרך " +
        "I_FunctionalLocationText) במקום SELECT ישיר מ-IFLOT/ILOA. לפני השימוש לוודא במערכת (View Browser או " +
        "ADT) את רשימת השדות וה-associations, מפני שגוף העמוד הרשמי לא היה קריא בערוץ הציטוט. ליצירה ולעדכון של " +
        "מיקומים להשתמש ב-BAPI_FUNCLOC_CREATE/CHANGE או ב-OData API_FUNCTIONALLOCATION (מתועד בנפרד במדריך APIs " +
        "for Maintenance Management, 2025 FPS01), לא בתצוגת הקריאה. ברשומת ההעשרה של הפרויקט לתקן את סוג התצוגה " +
        "ל-Basic בהתאם לרשומה הרשמית.",
    },
    xrefs: [
      "table:IFLOT", "table:ILOA", "tx:IL01", "tx:IL02", "tx:IL03", "tx:IH06", "fm:BAPI_FUNCLOC_CREATE",
      "fm:BAPI_FUNCLOC_CHANGE", "fm:BAPI_FUNCLOC_GETDETAIL", "fiori:F2730A", "cds:I_Equipment",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "הרשומה הרשמית שאותרה לעמוד ה-VDM של התצוגה שייכת למהדורת 2023 Latest; חיפוש מוגבל ל-2025.001 החזיר רק " +
      "עמודי API_FUNCTIONALLOCATION, ולכן מעמד Released מצוטט לגרסת 2023, וההפניה מגרסת 2025 היא מעמוד What's " +
      "New (I_FunctionalLocationText). גוף עמודי help.sap.com אינו נקרא בערוץ הציטוט (מעטפת JavaScript), ולכן " +
      "שדות, associations, מפתחות ומקורות הנתונים IFLOT/ILOA נשענים על נתוני הפרויקט בלבד. סתירה פתוחה: רשומת " +
      "ההעשרה מסווגת את התצוגה Interface (Composite) והרשומה הרשמית מציינת Basic. מזהה ה-Fiori F2730A (Manage " +
      "Technical Objects) הוא ערך מתוחזק בפרויקט שטרם אומת מול ספריית ה-Fiori. ה-OData API_FUNCTIONALLOCATION " +
      "הוא אובייקט נפרד מהתצוגה ואינו מצוטט כאן.",
  },
  {
    id: "cds:I_MaintenanceNotification",
    aliases: ["I_MAINTENANCENOTIFICATION"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/45fdea6e43724a349ecd4a9f3e993030.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE2,
        claim:
          "עמוד ה-VDM של הענן הציבורי (2608) נוקב ב-'Maintenance Notification CDS View Name " +
          "I_MAINTENANCENOTIFICATION' וקובע: 'This view represents the following SAP object type: " +
          "MaintenanceNotification ( BusinessObject )'. הסניפט שהוחזר מונה שדות כגון MAINTENANCENOTIFICATION, " +
          "NOTIFICATIONCOMPLETIONTIME (Completion Time of Notification), SERIALNUMBER, LASTCHANGEDBYUSER, " +
          "ISDELETED ו-MAINTNOTIFICATIONCODE. התיעוד הוא למהדורת Public Cloud; הטבלה הפיזית שמאחורי התצוגה אינה " +
          "נזכרת בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      MAINT_MGMT_DEVEXT_WN2025_NOTIF,
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification Data | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c5fd76401fd54466b559783f1790b2ad.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "מדריך ה-VDM ל-On-Premise (2023) מתעד את 'Maintenance Notification Data CDS View Name " +
          "I_PMNotifMaintenanceData' עם DataSource מקביל IPMNTFMAINTDATA, ומציין: 'This CDS view provides the data " +
          "to answer the following business questions: For which maintenance notification can you view details?'. " +
          "זו תצוגת פרטי הודעת האחזקה המתועדת ל-On-Premise ברשומות שהוחזרו; היא תצוגה אחרת " +
          "מ-I_MaintenanceNotification.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS ורשומת ההעשרה של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מיפוי הפרויקט מקשר את I_MaintenanceNotification לטבלה QMEL (מודול PM, 'הודעת אחזקה') ללא שכבת צריכה או " +
          "אפליקציית Fiori; רשומת ההעשרה מגדירה אותה כ-Interface (Composite) עם מפתח MaintenanceNotification " +
          "ו-associations ‏_MaintNotificationItem, ‏_Equipment, ‏_FunctionalLocation ו-_MaintPriority, ומסומנת " +
          "'verified' עם מקורות טקסטואליים בלבד (ללא קישור רשמי). רשומות TX_INTEL של IW28 ו-IW29 ושיעור האקדמיה " +
          "pm-fiori-reports מפנים לאותה תצוגה.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaintenanceNotification",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "תצוגת VDM להודעת אחזקה (תחזוקת מפעל, PM) מעל QMEL לפי מיפוי הפרויקט. ברשומות ה-Help שנסרקו, השם המדויק " +
        "I_MAINTENANCENOTIFICATION מתועד רשמית רק במדריך ה-VDM של SAP S/4HANA Cloud Public Edition 2608, כתצוגה " +
        "המייצגת את אובייקט MaintenanceNotification. ברשומות ה-Help של S/4HANA On-Premise שנסרקו (2022 עד 2025 " +
        "FPS01) לא נמצאה רשומה הנוקבת בשם זה: What's New 2025 מונה את I_MaintenanceNotificationTP_3 כתצוגה חדשה " +
        "ל-Developer Extensibility, ומדריך ה-VDM מתעד את I_PMNotifMaintenanceData לפרטי הודעת אחזקה. לכן סטטוס " +
        "ה-On-Premise נשאר פתוח עד לאימות במערכת או לרשומה רשמית הנוקבת בשם.",
      edition: "on-premise",
      release: null,
      source: MAINT_MGMT_DEVEXT_WN2025_NOTIF,
      recommendedAction:
        "לפני בניית קוד Z, דוח או ממשק על I_MaintenanceNotification ב-S/4HANA On-Premise: לאמת את קיום התצוגה " +
        "ואת סטטוס השחרור שלה במערכת עצמה (אפליקציית View Browser או ADT) או ברשומה רשמית הנוקבת בשם. לחלופין " +
        "להישען על התצוגות המתועדות ל-On-Premise: I_PMNotifMaintenanceData לפרטי הודעה (מדריך VDM 2023) " +
        "ו-I_MaintenanceNotificationTP_3 לפיתוח בתקן Developer Extensibility (What's New 2025). ב-S/4HANA Cloud " +
        "Public Edition התצוגה מתועדת ואפשר לצטט את עמוד ה-VDM של 2608.",
    },
    xrefs: [
      "table:QMEL", "table:QMFE", "tx:IW21", "tx:IW22", "tx:IW23", "tx:IW28", "tx:IW29",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL", "fm:BAPI_ALM_NOTIF_LIST_FILTER", "fm:BAPI_ALM_NOTIF_CREATE",
      "cds:I_MaintNotificationItem", "cds:I_MaintNotifActivity", "cds:I_MaintenanceOrder",
      "cds:I_Equipment", "cds:I_FunctionalLocation", "fiori:F1511", "fiori:F4604",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "(1) הרשומה הרשמית היחידה שנמצאה בחיפוש והנוקבת בשם המדויק היא עמוד ה-VDM של S/4HANA Cloud Public " +
      "Edition 2608, והיא כותבת אותו באותיות גדולות (I_MAINTENANCENOTIFICATION); שמות אובייקטי DDIC נשמרים " +
      "באותיות גדולות, ולכן זה אותו שם (ידע כללי, לא ציטוט). (2) היעדר רשומה On-Premise באינדקס החיפוש אינו " +
      "הוכחה שהתצוגה חסרה ב-On-Premise; הוא רק אומר שאין כאן ציטוט רשמי ל-On-Premise, ולכן הסטטוס נשאר 'נדרש " +
      "אימות נוסף' עם מהדורת On-Premise. (3) What's New 2022 (loio 4b9d789a1fda4cf2bf730b24e9ae07de, 2022.000) " +
      "מתעד את שחרור I_PMNotifMaintenanceData; What's New 2025 (2025.000) מתעד את " +
      "I_MaintenanceNotificationTP_3 כחדשה, והסניפט של אותו עמוד גם קובע: 'I_MaintenanceNotificationTP_2 has " +
      "been deprecated and replaced with the successor view I_MaintenanceNotificationTP_3'. שתיהן תצוגות אחרות " +
      "מהתצוגה שברשומה. (4) ה-OData API להודעות אחזקה ב-On-Premise מתועד בשם API_MAINTNOTIFICATION (ישות " +
      "A_MaintenanceNotification, טיפוס cds_api_maintnotification.MaintenanceNotificationType, deliverable " +
      "'APIs for Maintenance Management' 2025.001), ואילו בענן הציבורי שירות ה-OData V4 נקרא " +
      "api_maintenancenotification; רשומת F1511 במאגר נוקבת ב-API_MAINTENANCENOTIFICATION, וההבדל נרשם כסתירה " +
      "לקטלוג ה-Fiori, לא נפתר כאן. (5) גוף העמודים ב-help.sap.com לא נקרא (מעטפת JavaScript); כל טענה נשענת " +
      "על כותרת וסניפט של רשומת החיפוש. ה-associations, ה-annotations והטבלה QMEL שמאחורי התצוגה נשארים ברובד " +
      "המאגר בלבד; ה-MCP‏ sc4sap לא התחבר בסשן, כך שלא בוצעה בדיקת מערכת חיה. (6) הבדיקות בפועל בוצעו " +
      "ב-2026-09-05; accessedAt נחתם 2026-09-02 לפי הנחיית קטלוג ה-cds.",
  },
  {
    id: "cds:I_MaintNotificationItem",
    evidence: [
      NOTIF_ITEM_DATA_VDM,
      {
        sourceType: "sap_help",
        sourceTitle:
          "Objects Released for Developer Extensibility in Maintenance Management | What's New in SAP S/4HANA and " +
          "SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/e666a33610e6491f9d800882be108d02.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE2,
        claim:
          "ב-SAP S/4HANA 2025 שוחררה ל-Developer Extensibility תצוגת CDS חדשה לפריט הודעת אחזקה בשם " +
          "I_MaintNotificationItemTP_3‏ ('Maintenance Notification Item - TP', New, 'This view retrieves the " +
          "details of a mainteance notification item' כלשון הסניפט), לצד I_MaintNotifItemCauseTP_3 " +
          "ו-I_MaintNotifItemActivityTP_3. באותו עמוד מסומנת התצוגה הקודמת I_MaintNotificationItemTP_2 " +
          "כ-Deprecated: 'has been deprecated and replaced with the successor view I_MaintNotificationItemTP_3' " +
          "(וכך גם I_MaintNotifItemActivityTP_2 ו-I_MaintenanceNotificationTP_2 מול TP_3). העמוד מציג את " +
          "האובייקטים המשוחררים כ-'stable interface' לבניית הרחבות, שירותים ואפליקציות Fiori עם ABAP Cloud ו-RAP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/f430cbb1950c4880810e27a8308db301.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "ה-OData API להודעת אחזקה חושף ישות פריט הודעה A_MaintNotificationItem‏ ('Allows you to create, read, " +
          "and update a notification item') עם ניווטים to_ItemCause ו-to_ItemActivity, והשירות 'is built using the " +
          "CDS views based on notification, notification item, notification item cause, notification item activity " +
          "and partner data via gateway service builder and SADL'. שם תצוגת ה-CDS שמאחורי הישות אינו נקוב בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ההעשרה מתארת את I_MaintNotificationItem כתצוגת Interface (Basic) מעל QMFE, עם מפתח הודעה + מספר פריט " +
          "ואסוציאציות _MaintenanceNotification ו-_MaintNotifItemCause. הרשומה מסומנת במאגר כמאומתת, אך מקורותיה " +
          "טקסטואליים בלבד וללא קישור רשמי; מיפוי הפרויקט (data/cds-map.ts) מקשר את התצוגה לטבלת QMFE במודול PM.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MaintNotificationItem",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "פריט הודעת אחזקה (תחזוקת מפעל) ברובד ה-VDM, מעל טבלת QMFE. תיעוד SAP Help אינו נוקב בתצוגה בשם " +
        "I_MaintNotificationItem: השמות המתועדים הם I_MaintNotificationItemData (תצוגת חילוץ ל-BW בסטטוס " +
        "Released) ו-I_MaintNotificationItemTP_3 (שוחררה ל-Developer Extensibility ב-2025 כיורשת של " +
        "I_MaintNotificationItemTP_2 שסומנה Deprecated), וה-OData API בנוי על תצוגות CDS לפריט הודעה שלא נקובות " +
        "בשם. קיומה של תצוגה בשם המדויק הזה, סטטוס השחרור שלה ורשימת השדות והאסוציאציות שברשומת ההעשרה דורשים " +
        "אימות במערכת.",
      edition: "on-premise",
      release: "2023.latest",
      source: NOTIF_ITEM_DATA_VDM,
      recommendedAction:
        "לפני שימוש בשם I_MaintNotificationItem בקוד או במסמך אפיון: לאמת במערכת S/4HANA (SE11 או ADT, " +
        "ואפליקציית View Browser) שהתצוגה קיימת בשם זה ומה סטטוס השחרור שלה (Released / Released for Developer " +
        "Extensibility). לחילוץ ל-BW ולדיווח אנליטי על פריטי הודעה להעדיף את התצוגה המתועדת " +
        "I_MaintNotificationItemData; להרחבות ABAP Cloud ו-RAP ב-2025 ומעלה לבדוק את " +
        "I_MaintNotificationItemTP_3; לקריאה ועדכון של פריטי הודעה מחוץ למערכת להשתמש ב-OData API המתועד (ישות " +
        "A_MaintNotificationItem). את רשימת השדות והאסוציאציות שברשומת ההעשרה יש לאמת מול ה-DDL בפועל ולא להעתיק " +
        "כמות שהיא.",
    },
    xrefs: [
      "table:QMFE", "table:QMEL", "table:QMUR", "table:QMMA", "cds:I_MaintenanceNotification",
      "cds:I_MaintNotifActivity", "tx:IW22", "tx:IW23", "tx:IW66", "tx:IW69", "fm:NOTIF_ITEM_READ",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL", "fiori:F4604",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "שלוש רשומות רשמיות מתארות תצוגות CDS לפריט הודעת אחזקה, אך אף אחת מהן אינה נוקבת בשם " +
      "I_MaintNotificationItem: התצוגה המתועדת לחילוץ היא I_MaintNotificationItemData (מוזכרת גם ב-What's New " +
      "1809 תחת 'CDS Views for BW Extraction' באותיות רישיות), והתצוגה שנפתחה ל-Developer Extensibility ב-2025 " +
      "היא I_MaintNotificationItemTP_3, שהחליפה את I_MaintNotificationItemTP_2 שסומנה Deprecated באותו עמוד. " +
      "גוף עמודי ה-Help אינו נגיש לכלי (מעטפת JavaScript), ולכן כל ציטוט מוגבל לכותרת ולסניפט של שירות החיפוש; " +
      "חיפוש מוגבל-דומיין ב-help.sap.com לא החזיר עמוד שכותרתו או הסניפט שלו נוקבים בשם המדויק. שכבת המאגר " +
      "(data/cds-enrichment.ts, data/cds-map.ts, data/tx-intel.ts ברשומות IW66 ו-IW69) משתמשת בשם המדויק " +
      "ומייחסת לו שדות ואסוציאציות ממקורות טקסטואליים בלבד; אין לראות בכך אימות. הטבלה שמתחת, QMFE, מסומנת " +
      "בחוברת המיגרציה (data/sapData.pm.ts) כ'ללא שינוי (תואם)' עם s4AltTable 'QMFE (זהה)', כך שאין כאן שאלת " +
      "פישוט של מודל הנתונים אלא שאלת זהות ושחרור של תצוגת ה-CDS בלבד. שם ה-OData API בעמודי 2025 FPS01 הוא " +
      "API_MAINTNOTIFICATION; רשומת F1511 בקובץ data/fiori/apps.ts נוקבת ב-API_MAINTENANCENOTIFICATION, פער " +
      "שמצריך תיקון ברשומת ה-Fiori ולא כאן. הסטטוס לא הוגדר כ'חדש ב-S/4HANA' כי לא נמצא מקור רשמי לשם המדויק; " +
      "המהדורה שנרשמה היא On-Premise לפי מזהה המוצר בשירות החיפוש, וה-What's New של 2025 מכסה גם Private " +
      "Edition.",
  },
  {
    id: "cds:I_MeasuringPoint",
    evidence: [
      MEASURING_POINT_VDM_CLOUD,
      {
        sourceType: "sap_help",
        sourceTitle: "Measuring Point | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/8cdfef769b2b4f7195a5f296982e2fe6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "ב-On-Premise ‏2025 FPS01 מתועד שירות ה-OData‏ API_MEASURINGPOINT‏ (SRVD_A2X, גרסה 0001): 'This " +
          "synchronous inbound service enables you to create, read, and update a measuring point or a collection " +
          "of measuring points through an external application'; 'This is an OData version 4 service' המפורסם " +
          "ב-SAP Business Accelerator Hub, עם הישויות MeasuringPoint ו-MeasuringPointLongText. הרשומה עוסקת ב-API " +
          "ולא בתצוגת ה-CDS עצמה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Measuring Point Data | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/3255e072e7de4324a289844bb14bce87.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "תיעוד ה-VDM של On-Premise מחזיר לחיפוש 'Measuring Point' תצוגה אחרת: 'CDS View Name " +
          "I_MeasuringPointData Data Category Dimension Status Released Data Extraction Type Full'; לפי הסניפט, " +
          "'This CDS view is modeled for usage as a DataSource in Business Warehouse. We strongly recommend that " +
          "you only use it for this purpose'. אין להחליף בינה לבין I_MeasuringPoint.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מגדירה את I_MeasuringPoint כתצוגת Interface (Basic) מעל IMPTT עם מפתח MeasuringPoint, " +
          "אסוציאציות _TechnicalObject / _MeasurementDocument / _Characteristic, וחלופת ECC: טבלת IMPTT, טרנזקציות " +
          "IK01/IK02/IK03 וסקירה IK07. הרשומה מסומנת במאגר כמאומתת, עם מקורות טקסטואליים ללא קישור רשמי; מיפוי " +
          "הטבלאות (data/cds-map.ts) מקשר את התצוגה ל-IMPTT במודול PM.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MeasuringPoint",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת CDS לנקודת מדידה (Measuring Point) בתחזוקת מפעל. בתיעוד ה-VDM של SAP S/4HANA Cloud Public Edition " +
        "2608 התצוגה I_MeasuringPoint מתועדת בסטטוס Released. עבור On-Premise לא נמצא עמוד VDM רשמי הנוקב בשם " +
        "התצוגה, והקישור ל-IMPTT מגיע ממיפוי הפרויקט בלבד.",
      edition: "public-cloud",
      release: "2608.500",
      source: MEASURING_POINT_VDM_CLOUD,
      recommendedAction:
        "לפני הסתמכות על I_MeasuringPoint בקוד Z או בדוחות במערכת On-Premise: לאמת במערכת היעד את קיום התצוגה " +
        "ואת ה-Release Status שלה (יישום View Browser או ADT), כפי שמפנה תיעוד ה-VDM. לקריאה ולעדכון של נקודות " +
        "מדידה מיישום חיצוני להעדיף את API_MEASURINGPOINT‏ (OData V4) המתועד ל-On-Premise 2025 FPS01. לחילוץ " +
        "ל-BW: התצוגה המתועדת ב-On-Premise היא I_MeasuringPointData, לא I_MeasuringPoint.",
    },
    xrefs: [
      "table:IMPTT", "table:IMRG", "tx:IK01", "tx:IK02", "tx:IK03", "tx:IK07",
      "cds:I_MeasurementDocument", "fm:BAPI_MEASUREMENTPOINT_CREATE",
      "fm:BAPI_MEASUREMENTPOINT_GETLIST",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "המקור הרשמי היחיד שנמצא הנוקב בשם I_MeasuringPoint הוא תיעוד ה-VDM של Cloud Public Edition (2608), ולכן " +
      "המהדורה ברשומת הסטטוס היא public-cloud. חיפוש בתיעוד On-Premise (2025 FPS01 ו-2023) על " +
      "'I_MeasuringPoint' ועל 'MeasuringPoint' החזיר רק את עמודי ה-API‏ (API_MEASURINGPOINT); חוברת ה-VDM של " +
      "On-Premise מתעדת את I_MeasuringPointData (חילוץ ל-BW) ואת I_MsrgPointProdnRsceTool בלבד. מסמך What's " +
      "New 2025 FPS01 (PDF רשמי, נקרא מקומית) אינו מכיל את המחרוזת I_MeasuringPoint; סעיף 3.1.1 שלו מתעד תוספת " +
      "Authorization Group ל-API_MEASURINGPOINT (זמינות: SAP S/4HANA Cloud Private Edition ו-SAP S/4HANA, רכיב " +
      "PM-EQM-SF-MPC). שמות השדות בדוגמת ה-ABAP של המאגר (TechnicalObject, MeasrmtReadingUnit, " +
      "MeasuringPointIsCounter) והאסוציאציות נשארים ברובד המאגר: הסניפט הרשמי של התצוגה מציג רק את המאפיין " +
      "MeasuringPoint, והשדות MeasuringPointIsCounter / TechnicalObjectType / MeasuringPointCategory שבסניפטים " +
      "שייכים ל-API ולא לתצוגה. יישום Fiori: המאגר נוקב ב-'Manage Measuring Points'; תיעוד On-Premise 2025 " +
      "FPS01 ('Process Measuring Point') קובע ששלושה יישומים ניתנים לעיבוד רשומות אב של נקודות מדידה, ובהם " +
      "Create Measuring Point ו-Display Measuring Point; כותרת תוצאת החיפוש בספריית Fiori Apps מציגה 'Process " +
      "Measuring Point' עם המזהה W0031 (גוף העמוד לא נקרא; המזהה אינו ברשומת ה-Fiori של הפרויקט ולכן אינו " +
      "ב-xrefs).",
  },
  {
    id: "cds:I_MeasurementDocument",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מתארת תצוגת Interface (Basic) של ה-VDM מעל טבלת IMRG: מפתח MeasurementDocument, אסוציאציות " +
          "_MeasuringPoint ו-_TechnicalObject, וחשיפה של קריאות המדידה (ערך מדוד, תאריך ושעה, הפרש מונה) שנרשמו " +
          "לנקודת מדידה; החלופה ב-ECC לפי הרשומה: טבלה IMRG וטרנזקציות IK11 (רישום) ו-IK13/IK17 (הצגה). הרשומה " +
          "מסומנת במאגר כמאומתת, עם מקורות טקסטואליים תבניתיים ללא קישור רשמי; המיפוי המקביל ב-data/cds-map.ts " +
          "נוקב גם בשכבת צריכה C_MeasurementDocument וביישום Fiori בשם 'Manage Measurement Documents' ללא מזהה " +
          "יישום.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MeasurementDocument",
      },
      MEASUREMENT_DOC_VDM_CLOUD,
      {
        sourceType: "sap_help",
        sourceTitle: "Measurement Document Data | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/85ffac7762ed452d928b8c5ac0abb336.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "תצוגת ה-VDM שהחיפוש במוצר On-Premise מחזיר למסמכי מדידה היא I_MeasurementDocumentData (שם טכני שונה " +
          "מרשומה זו): 'CDS View Name I_MeasurementDocumentData, Data Category Fact, Status Released, Data " +
          "Extraction Type Full', ללא פרמטרי קלט לפי התקציר ('This CDS view does not have any input parameters'), " +
          "עם DataSource (Extractor) 0I_MEASUREMENTDOCDATA לחילוץ ל-BW.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for BW Extraction | What's New in SAP S/4HANA 1809 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1809.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/1664545363ca4400ae16741ca529bf28.html?locale=en-US&state=PRODUCTION&version=1809.001",
        accessedAt: DATE2,
        claim:
          "לפי תקציר הנושא 'CDS Views for BW Extraction' ב-What's New in SAP S/4HANA 1809 FPS01: 'CDS (Core Data " +
          "Services) views have now been released for BW extraction' ובהן 'I_MEASUREMENTDOCUMENTDATA You can use " +
          "this CDS view to obtain information about the measurement document'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Measurement Document | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/1db7ad6b759248e7a6b5b2ff1311d2e6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "‏Measurement Document OData V4 API מתועד ל-On-Premise 2025 FPS01 תחת נתיב השירות " +
          "‎/sap/opu/odata4/sap/api_measurementdocument/srvd_a2x/sap/MeasurementDocument/0001 עם ישות " +
          "MeasurementDocument; לפי תקציר טבלת הפעולות: קריאה (GET), יצירה ו-$batch‏ (POST), עדכון (PUT) וטקסט " +
          "ארוך (MsmtDocumentLongText).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Measurement Document | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/6afa93607aa74b1bb0aebdbe2867c8f9.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "לפי התקציר: 'Service name: API_MEASUREMENTDOCUMENT. This synchronous inbound service enables you to " +
          "read, create and update one or more measurement documents'; אילוץ מפורש: 'This API does not support " +
          "soft or hard deletion of measurement documents'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "New Linear Asset Management Data Entity for OData APIs | What's New in SAP S/4HANA and SAP S/4HANA " +
          "Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/22604a4f79934eb3bc2222fbf94b4248.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "הנושא (סעיף 3.1.10 במסמך ה-PDF של What's New 2025 FPS01 שהורד ונקרא) מונה את Measurement Document " +
          "(API_MEASUREMENTDOCUMENT) בין שבעת ה-OData APIs שאליהם נוספה הישות A_LinearAssetManagementData; רכיבי " +
          "היישום שהסעיף מונה במקובץ כוללים PM-EQM-SF-MPC (Measuring Points and Counters) לצד PM-EQM-EQ, " +
          "PM-EQM-FL, PM-WOC-MN, PM-PRM-MP ו-PM-WOC-MO; זמינות לפי הסעיף: SAP S/4HANA Cloud Private Edition ו-SAP " +
          "S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData APIs: Measurement Document and Measuring Point | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/b2b19dde57ea4336a3e7c096c06ce4b4.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE2,
        claim:
          "לפי תקציר הנושא ב-What's New in SAP S/4HANA 2021 (תחום Asset Management, Maintenance Operations): 'With " +
          "the Measurement Document API, you can now create measurement document for a maintenance order, " +
          "operation, and suboperation'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת CDS של ה-VDM למסמכי מדידה (תחזוקת מפעל; מעל IMRG לפי נתוני הפרויקט). תיעוד SAP רשמי שאותר לשם " +
        "התצוגה: SAP S/4HANA Cloud Public Edition 2608.500, מצב Released. ל-On-Premise לא אותר עמוד VDM לשם זה, " +
        "ומבנה התצוגה (מפתח, אסוציאציות) נשען על נתוני הפרויקט בלבד.",
      edition: "public-cloud",
      release: "2608.500",
      source: MEASUREMENT_DOC_VDM_CLOUD,
      recommendedAction:
        "ב-On-Premise: לאמת את קיום התצוגה ואת מצב השחרור שלה במערכת (SE11 או View Browser) לפני שימוש בקוד " +
        "מותאם. לשילוב חיצוני של מסמכי מדידה להעדיף את ה-OData V4 API‏ API_MEASUREMENTDOCUMENT המתועד " +
        "ל-On-Premise 2025 FPS01; לחילוץ ל-BW להשתמש בתצוגה הרשמית I_MeasurementDocumentData.",
    },
    xrefs: [
      "table:IMRG", "table:IMPTT", "cds:I_MeasuringPoint", "tx:IK11", "tx:IK13", "tx:IK17",
      "fm:BAPI_MEASUREMENTDOCUM_CREATE", "fm:MEASUREM_DOCUM_RFC_SINGLE_001",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "השם I_MeasurementDocument אותר בתיעוד רשמי רק בדליברבל ה-VDM של SAP S/4HANA Cloud Public Edition " +
      "(2608.500, Released). בחיפוש המוצר SAP_S4HANA_ON-PREMISE (ארבע שאילתות, 21 תוצאות לכל אחת, כולל סינון " +
      "לגרסאות 2025.001 ו-2023.latest), ב-WebSearch בדומיינים הרשמיים ובשני מסמכי What's New שהורדו ונקראו " +
      "במלואם (2021 FPS01 ו-2025 FPS01) לא הוחזר עמוד On-Premise לשם התצוגה; לכן הסטטוס נכתב עם מהדורת Public " +
      "Cloud, וב-On-Premise נדרש אימות במערכת. התקציר הרשמי מאשר את השם, את מצב Released, את המאפיינים " +
      "MeasurementDocument ו-MeasuringPoint ואת השאלות העסקיות בלבד; גוף העמוד לא נקרא (JS shell), והמפתח " +
      "והאסוציאציות שברשומת ההעשרה נשענים על נתוני הפרויקט. שכבת הצריכה C_MeasurementDocument ויישום ה-Fiori " +
      "'Manage Measurement Documents' שבמיפוי הפרויקט (data/cds-map.ts) לא אותרו במקור רשמי ולא נוספו כ-xref " +
      "(אין יישום למסמכי מדידה ב-data/fiori/apps.ts). הדף המקביל ב-Cloud VDM (2608.500) מתעד גם את " +
      "I_MeasuringPoint במצב Released. ראיות ה-API (2021, 2023.latest, 2025 FPS01) מצוטטות כל אחת לתקציר הרשמי " +
      "שלה; במסמך ה-PDF של What's New 2021 FPS01 שנקרא אין אזכור למסמכי מדידה, והטענה על יצירה " +
      "לפקודה/פעולה/תת-פעולה נשענת על רשומת What's New in SAP S/4HANA 2021 (2021.000) בלבד.",
  },
  {
    id: "cds:I_MaintenancePlan",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle:
          "What's New in SAP S/4HANA 2021 FPS01 (PDF, Document Version 1.0, 2022-02-23) | 2.1.1 CDS Views for " +
          "Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.001",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2021.001/en-US/WN_OP2021_FPS01_EN.pdf",
        accessedAt: DATE2,
        claim:
          "גוף המסמך (עמודים 6 עד 7, נקרא במלואו) קובע: 'The following CDS views have been deprecated as of SAP " +
          "S/4HANA 2021' ובהן I_MaintenancePlan; 'These CDS views are no longer available by default and will be " +
          "deleted as of SAP S/4HANA 2023 release. We strongly recommend replacing any deprecated CDS views with " +
          "the successor at your earliest convenience'. טבלת Additional Details ממפה: Deprecated CDS View " +
          "I_MaintenancePlan, Successor CDS View I_MaintenancePlanBasic. פרטים טכניים בעמוד: Type Changed, Scope " +
          "Items 4HH, 4HI, BH1, BH2, BJ2, Application Component PM (Plant Maintenance), Valid as Of SAP S/4HANA " +
          "2021 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Maintenance Management | What's New in SAP S/4HANA 2021 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6ffb8fb9aee1469b9d4c506e1790da34.html?locale=en-US&state=PRODUCTION&version=2021.001",
        accessedAt: DATE2,
        claim:
          "רשומת שירות החיפוש של SAP Help (loio 6ffb8fb9aee1469b9d4c506e1790da34, versionId 2021.001) מציגה את " +
          "אותו פריט: 'The following CDS views have been deprecated as of SAP S/4HANA 2021', I_MaintenancePlan " +
          "מנויה בין שלוש התצוגות, 'These CDS views are no longer available by default and will be deleted as of " +
          "SAP S/4HANA 2023 release', וטבלת היורשים 'Deprecated CDS View / Successor CDS View: I_MaintenancePlan / " +
          "I_MaintenancePlanBasic'. סוג הפריט ברשומה: CDS View Changed, מודול PM, פריטי היקף BH1, BH2, BJ2.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/048dd3513ed34ccc8ffc1a51bc906f7c.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "עמוד ה-VDM לגרסת 2023 (loio 048dd3513ed34ccc8ffc1a51bc906f7c) מתעד את התצוגה היורשת: 'Maintenance Plan, " +
          "CDS View Name I_MaintenancePlanBasic, Status Released, Purpose: This CDS view helps you view details of " +
          "a maintenance plan', ומפנה ל-Supported Capabilities for CDS Views ולקריאת ערכי האנוטציה של התצוגה " +
          "ביישום View Browser לבירור מקרי השימוש הנתמכים (כלשון תקציר הרשומה; גוף העמוד לא נקרא).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה ומיפוי הטבלאות של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המאגר ממפה את התצוגה למודול תחזוקת מפעל (PM) מעל טבלאות MPLA (ראש תוכנית אחזקה) ו-MPOS (פריטי תוכנית), " +
          "עם שכבת צריכה C_MaintenancePlan ויישום Fiori 'Manage Maintenance Plans' (data/cds-map.ts:63); רשומת " +
          "ההעשרה מסומנת verified עם מקורות טקסטואליים ללא קישור רשמי, ומתארת תצוגת Interface (Composite) עם " +
          "associations _MaintenancePlanItem ו-_MaintenanceStrategy. הסימון אינו מתייחס לתיעוד ההסרה הרשמי ואינו " +
          "מזכיר deprecated או יורש.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MaintenancePlan",
      },
    ],
    xrefs: [
      "table:MPLA", "table:MPOS", "tx:IP01", "tx:IP02", "tx:IP03", "tx:IP10", "tx:IP30", "tx:IP24",
      "fiori:F4072", "fiori:F2828",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "תיעוד SAP רשמי (What's New 2021 FPS01, גוף ה-PDF נקרא) קובע ש-I_MaintenancePlan הוצאה משימוש " +
      "(deprecated) החל מ-SAP S/4HANA 2021, אינה זמינה כברירת מחדל ונמחקת החל ממהדורת 2023, והיורשת היא " +
      "I_MaintenancePlanBasic (Status Released בעמוד ה-VDM לגרסת 2023). סטטוס deprecated לא נכתב ברשומה זו כי " +
      "הסכימה דורשת יורש הקיים ביקום המזהים, ו-cds:I_MaintenancePlanBasic אינה רשומה עדיין ב-data/cds-map.ts " +
      "(מקור רשימת ה-CDS ב-route manifest); עד להוספתה הסטטוס הנגזר מרשומת ההעשרה (חדש ב-S/4HANA) סותר את " +
      "הראיות הרשמיות ויש ליישר אותו. עד לתיקון, הגלולה 'חדש ב-S/4HANA' המוצגת לרשומה זו נגזרת ממיפוי הפרויקט " +
      "בלבד ואינה משקפת את התיעוד הרשמי. מה שלא אומת: עמוד VDM ייעודי ל-I_MaintenancePlan עצמה לא נמצא בשירות " +
      "החיפוש לגרסאות 2023 ו-2025, בהתאם להודעת המחיקה; שם שכבת הצריכה C_MaintenancePlan שבמיפוי הפרויקט לא " +
      "הופיע באף רשומה רשמית (עמודי תוכנית האחזקה שנמצאו: I_MaintenancePlanBasic, I_MaintenancePlanStdVH, " +
      "C_MaintenancePlanDEX, I_MAINTENANCEPLANSCHEDULE, C_MaintPlanSchedgOvwQuery); שדות התצוגה, " +
      "ה-associations והמיפוי ל-MPLA/MPOS נשענים על נתוני הפרויקט בלבד, ללא מערכת SAP חיה (חיבור sc4sap MCP " +
      "נכשל). מהדורת S/4HANA Cloud Public Edition לא נבדקה.",
  },
  {
    id: "cds:I_ProductionOrder",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Header | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/c6c3a06854a44d9383b32946f008b1b8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "עמוד ה-VDM הרשמי: 'CDS View Name I_ProductionOrder', 'Analytical Data Category Dimension', 'This view " +
          "represents the SAP object type ProductionOrder (BusinessObject)'. מטרת התצוגה כלשונה: 'This CDS view " +
          "retrieves production order header data (tables AUFK and AFKO)', והיא משיבה על 'Which production orders " +
          "exist?'. הסניפט מונה בין השדות החשובים ProductionOrder‏, ProductionOrderType ו-CreationDate, וקובע " +
          "'Deltas are determined automatically by change data capture'.",
        verificationLevel: "sap_official_verified",
      },
      DISCRETE_MFG_CDS_WN2025_PRODORDER,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order - Standard Value Help | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/8fae5a9afce24674807ebed06aa46a13.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "עמוד תצוגת עזרת הערכים I_ProductionOrderStdVH‏ ('This view provides value help for a production order " +
          "operation') מפנה לתצוגה המלאה: 'If you intend to select the entire business data, use the view " +
          "I_ProductionOrder instead'. כלומר I_ProductionOrder היא תצוגת הנתונים העסקיים המלאה של כותרת הזמנת " +
          "הייצור, ו-StdVH נועדה לעזרת ערכים בלבד (שדותיה בסניפט: ProductionOrder‏, ProductionOrderText‏, " +
          "ProductionOrderType).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מתארת תצוגת Interface (Composite) לכותרת הזמנת ייצור מעל AFKO/AUFK, עם שדה מפתח " +
          "ManufacturingOrder, אסוציאציות לפריטים, פעולות, חומר ומפעל, וחלופת ECC של הטבלאות AFKO+AUFK+AFPO " +
          "והטרנזקציות CO01/CO02/CO03. הרשומה מסומנת 'verified' עם מחרוזות מקור תבניתיות ללא קישור; שם שדה המפתח " +
          "ודוגמת ה-ABAP שלה (ManufacturingOrder‏, ManufacturingOrderType) אינם מופיעים בסניפט הרשמי, שמונה " +
          "ProductionOrder ו-ProductionOrderType, ולכן פרטי השדות נשארים לאימות במערכת.",
        verificationLevel: "verification_required",
        repoRef: "data/cds-enrichment.ts#I_ProductionOrder",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת VDM של S/4HANA לכותרת הזמנת ייצור בדידה (תחום Discrete Manufacturing; רכיב היישום ברשומת ה-What's " +
        "New הוא PP-VDM) מעל הטבלאות AUFK ו-AFKO. רשומה כ-'Type New' ב-What's New של SAP S/4HANA 2025 תחת 'New " +
        "CDS Views Released for Discrete Manufacturing'. בפרויקט היא ממופה כתצוגת S/4HANA שחלופת ה-ECC שלה היא " +
        "קריאה ישירה מהטבלאות AFKO/AUFK/AFPO.",
      edition: "on-premise",
      release: "2025.000",
      source: DISCRETE_MFG_CDS_WN2025_PRODORDER,
      recommendedAction:
        "בקוד מותאם ובדוחות ב-S/4HANA לקרוא נתוני כותרת של הזמנות ייצור בדידות דרך I_ProductionOrder במקום " +
        "SELECT ישיר מ-AUFK/AFKO, ולוודא במערכת (SE11/ADT) את רשימת השדות ואת חוזה השחרור לפני שימוש: גוף העמוד " +
        "הרשמי אינו נשלף, והסניפט מונה ProductionOrder‏, ProductionOrderType ו-CreationDate ולא את שמות השדות " +
        "שברשומת הפרויקט (ManufacturingOrder). להזמנות תהליך (PP-PI) לא להניח שהתצוגה מכסה אותן: החיפוש הרשמי לא " +
        "העלה עמוד VDM ייעודי לכותרת הזמנת תהליך, וזה נשאר לאימות. במערכות לפני S/4HANA 2025 לבדוק את זמינות " +
        "התצוגה, כי עמוד ה-VDM מופיע גם בסט התיעוד 2023 Latest אך ה-What's New רושם אותה כחדשה ב-2025.",
    },
    xrefs: [
      "table:AUFK", "table:AFKO", "cds:I_ProductionOrderItem", "cds:I_ProductionOrderOperation",
      "cds:I_ProductionOrderComponent", "cds:I_ProductionOrderConfirmation", "tx:CO01", "tx:CO02",
      "tx:CO03", "tx:COOIS", "fiori:F2336",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "אומת מרשומות חיפוש רשמיות של help.sap.com (כותרת, deliverable, גרסה, סניפט); גוף עמודי ה-Help אינו " +
      "נשלף, ולכן רשימת השדות המלאה, האסוציאציות ושדה המפתח נשארים לאימות במערכת SAP חיה או ב-ADT. הקשר גרסה: " +
      "ה-What's New של 2025 רושם את התצוגה כ-New, אך עמוד ה-VDM שלה (אותו loio) מופיע גם בסט התיעוד 2023 " +
      "Latest (פורסם מחדש 2026-08-05) ואינו מופיע בסט 2022 Latest, כך שמועד השחרור הראשון לפני 2025 אינו " +
      "מוכרע; הסטטוס נצמד לרשומת ה-What's New. אותו עמוד VDM מפורסם גם ל-SAP S/4HANA Cloud Public Edition (סט " +
      "2608), ולכן התצוגה קיימת בשתי המהדורות; הרשומה כאן היא On-Premise. הבחנת PP מול PP-PI: המקור הרשמי " +
      "משייך את התצוגה ל-Discrete Manufacturing (הזמנות ייצור; רכיב יישום PP-VDM בסניפט), בעוד data/cds-map.ts " +
      "מתייג אותה במודול 'PP-PI'; התיוג במאגר דורש תיקון, ולא נמצא עמוד VDM רשמי לכותרת הזמנת תהליך. אין " +
      "להחליף אותה עם I_ProductionOrderTP (ממשק RAP Business Object המתועד ב-api.sap.com). הקישור בין היישום " +
      "Manage Production Orders (F2336) לתצוגה הזו הוא מנתוני הפרויקט בלבד (data/fiori/apps.ts, " +
      "data/centers/fiori.ts) ולא אומת מול מקור רשמי. הערת שם לתצוגה האחות: עמוד 'Production Order Operation' " +
      "הרשמי (2023 Latest) נוקב בשם I_ProductionOrderOperation_2, בעוד המאגר מחזיק I_ProductionOrderOperation. " +
      "לא נטען SAP Note או פריט פישוט לתצוגה עצמה; סניפט עמוד ה-What's New מפנה ל-SAP Note 3593337 בהקשר Data " +
      "Products for SAP S/4HANA Manufacturing (SAP Business Data Cloud) בלבד, ולכן אינו נרשם כאן כ-sapNote של " +
      "התצוגה.",
  },
  {
    id: "cds:I_ProductionOrderConfirmation",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Confirmation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/5e053c432869473e9cdea33d7e0118c0.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "תיעוד ה-VDM לגרסת 2023 Latest מגדיר: 'CDS View Name I_ProductionOrderConfirmation', 'Analytical Data " +
          "Category Fact', 'This view represents the SAP object type ProductionOrderConfirmation' ו-'Purpose This " +
          "CDS view retrieves production order confirmation data (table AFRU)'. התצוגה 'is enabled for data " +
          "extraction in full mode as well as in delta mode' ו-'Deltas are determined automatically by change data " +
          "capture'. בין השדות הנקובים בסניפט: MilestoneConfirmationType, IsConfirmedByMilestoneConf, Plant, " +
          "WorkCenter, ShiftGrouping, FinalConfirmationType, ConfirmationIsReversed, OrderConfirmationType. תנאי " +
          "מקדים לפי הסניפט: Users who want to use this CDS view must have a role with the following restriction " +
          "types set to read access: AUFART_WERKS (Order Type/Plant).",
        verificationLevel: "sap_official_verified",
      },
      DISCRETE_MFG_CDS_WN2025_CONFIRMATION,
      {
        sourceType: "sap_help",
        sourceTitle:
          "OData API: Production Order Confirmation | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private " +
          "Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/d98c121b7da04ed1830f9d99ab8c2b44.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "לצד תצוגת הקריאה קיים API לכתיבה: פריט What's New MAN-AB8C-2B44 לגרסת 2025 FPS01 קובע 'With the OData " +
          "API Production Order Confirmation (API_PROD_ORDER_CONFIRMATION_2_SRV), you can process confirmations " +
          "for production orders' (תחת Operations > Production Execution). הסניפט אינו מפרט את הישויות של ה-API או " +
          "את השינוי שנוסף ב-FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המיפוי במאגר מקשר את התצוגה לטבלת AFRU, לשכבת צריכה C_ProductionOrderConf וליישום Fiori בשם 'Confirm " +
          "Production Operation', ומשייך אותה למודול PP-PI. שכבת הצריכה ויישום ה-Fiori מקורם במאגר בלבד ולא אומתו " +
          "מול סניפט רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_ProductionOrderConfirmation",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת CDS של ה-Virtual Data Model ב-S/4HANA מעל טבלת האישורים AFRU (ב-ECC אין תצוגה מקבילה, קוראים את " +
        "AFRU ישירות). מתועדת בדליברבל Virtual Data Model and CDS Views (2023 Latest) ורשומה ב-What's New 2025 " +
        "בין תצוגות ה-CDS שהוצאו (released) עבור Production Operations בתחום Discrete Manufacturing.",
      edition: "on-premise",
      release: "2025.000",
      source: DISCRETE_MFG_CDS_WN2025_CONFIRMATION,
      recommendedAction:
        "בקוד חדש ובדוחות: לקרוא אישורי פקודות ייצור דרך I_ProductionOrderConfirmation (קטגוריה Fact; לפי תיעוד " +
        "ה-VDM מתאימה ל-Data Extraction במצב Full ו-Delta) במקום SELECT ישיר מ-AFRU. לכתיבת אישורים בממשקים: " +
        "OData API_PROD_ORDER_CONFIRMATION_2_SRV לפי What's New 2025 FPS01. לפני שימוש: לאמת במערכת היעד את מצב " +
        "השחרור (Release Contract) ואת ההרשאות (לפי הסניפט: סוג הגבלה AUFART_WERKS, Order Type/Plant, בקריאה), " +
        "שכן גוף העמוד לא נקרא.",
    },
    xrefs: [
      "table:AFRU", "tx:CO11N", "tx:CO13", "tx:CO14", "tx:CO15", "cds:I_ProductionOrder",
      "cds:I_ProductionOrderOperation", "enh:exit:CONFPP01", "enh:exit:CONFPP05",
      "enh:badi:WORKORDER_CONFIRM",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "גוף העמודים ב-help.sap.com לא נקרא (מעטפת JavaScript); כל ציטוט מוגבל לכותרת ולסניפט שהוחזרו משירות " +
      "החיפוש הרשמי. תיעוד ה-VDM לתצוגה אותר בגרסת 2023 Latest בלבד: חיפוש מוצמד ל-2025.001 לא החזיר עמוד " +
      "מדליברבל Virtual Data Model and CDS Views עבור תצוגה זו (הוחזרו עמודי APIs for Manufacturing ועמודים " +
      "אחרים בלבד). What's New 2025 מונה אותה בין התצוגות שהוצאו (released) בתחום Discrete Manufacturing; היחס " +
      "בין התיעוד ב-2023 לבין ההכרזה ב-2025 (למשל שחרור לשימוש לקוחות או ל-Data Extraction) אינו ניתן לקביעה " +
      "מהסניפטים. דליברבל ה-What's New מכסה גם S/4HANA Cloud Private Edition 2025; הרשומה נרשמת On-Premise " +
      "כברירת מחדל. המיפוי במאגר משייך את התצוגה ל-PP-PI, אך היא מייצגת את האובייקט " +
      "ProductionOrderConfirmation (פקודות ייצור, PP-SFC). לאישורי פקודות תהליך תיעוד ה-VDM מציג תצוגה נפרדת, " +
      "I_MfgOrderConfirmation (Basic, Dimension, Full extraction), המכסה את שני האובייקטים Production Order " +
      "Confirmation ו-Process Order Confirmation, ו-What's New 2025 FPS01 מונה ממשק אובייקט עסקי " +
      "I_PROCESSORDERCONFIRMATIONTP תחת Developer Extensibility; שתיהן אינן מזהים בדאטהסט ולכן אינן ב-xrefs. " +
      "שכבת הצריכה C_ProductionOrderConf, יישום ה-Fiori Confirm Production Operation, סוג התצוגה Interface " +
      "(Basic), המפתח Confirmation + ConfirmationCounter והאסוציאציות ברשומת ההעשרה (data/cds-enrichment.ts) " +
      "נשארים ברובד המאגר: לא נמצא סניפט רשמי הנוקב בהם, ויישום ה-Fiori אינו ברשימת האפליקציות של הפרויקט, לכן " +
      "אין לו xref. תמיכה לטבלת המקור: העמוד PS/PM/CS: Creating an Index for Table AFRU (Time Data Recording " +
      "and Administration, 2025 FPS01, loio 9e1bdd5321e8424de10000000a174cb4) קובע 'confirmations from the " +
      "Production Planning and Control (PP) component are also saved in table AFRU'.",
  },
  {
    id: "cds:I_MaterialDocumentItem",
    aliases: ["I_MATERIALDOCUMENTITEM"],
    evidence: [
      MATDOC_ITEM_DEPRECATION_WN2021,
      {
        sourceType: "sap_help",
        sourceTitle: "Material Document Item | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/14305f6e8cb842bbb1647ffd5a30ca31.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "עמוד ה-VDM הרשמי 'Material Document Item' נושא את השם הטכני I_MaterialDocumentItem_2, עם 'Analytical " +
          "Data Category Dimension' ו-'Status Released', וקובע: 'This view is the successor view for " +
          "I_MaterialDocumentItem'. השאלה העסקית שהעמוד מונה: 'What are the line items of posted material " +
          "documents?'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Enhancement of CDS View with Service Document Fields | What's New in SAP S/4HANA and SAP S/4HANA Cloud " +
          "Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/08fa98b25b0142f2a9c53e4ca44f7b3d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "ב-2025 FPS01 תצוגת היורש ממשיכה להתפתח: 'The CDS (Core Data Services) view I_MATERIALDOCUMENTITEM_2 has " +
          "been enhanced with service document fields', עם השדות ServiceDocument, ServiceDocumentItem " +
          "ו-ServiceDocumentType (Type: Changed; Scope Item BMC, Core Inventory Management).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Document Item (Deprecated) | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/ef886643123549ecb7b4278af6fbcb4c.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE2,
        claim:
          "בתיעוד ה-VDM של Public Edition 2608 העמוד של התצוגה נושא את הכותרת 'Material Document Item " +
          "(Deprecated)' עם 'Technical Name I_MATERIALDOCUMENTITEM'. הוצאת התצוגה משימוש חלה אפוא גם במהדורת הענן " +
          "הציבורי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מתארת תצוגת Interface (Composite) לפריט מסמך חומר מעל MATDOC, עם מפתח MaterialDocument + " +
          "MaterialDocumentYear + MaterialDocumentItem ואסוציאציות _MaterialDocument, _Product, _Plant, " +
          "_StorageLocation. היא מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, ואינה מזכירה את הוצאת התצוגה " +
          "משימוש ב-2021 או את היורש I_MaterialDocumentItem_2.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MaterialDocumentItem",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המיפוי מקשר את התצוגה לטבלאות MSEG, MKPF ו-MATDOC, לשכבת צריכה C_MaterialDocumentItem וליישום Fiori " +
          "'Material Documents Overview'. לשכבת הצריכה וליישום לא נמצאה רשומת חיפוש רשמית שמאשרת את הקישור לתצוגה " +
          "זו.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaterialDocumentItem",
      },
    ],
    status: {
      status: "deprecated",
      he:
        "תצוגת ה-Interface לפריט מסמך חומר הוצאה משימוש (deprecated) ב-SAP S/4HANA 2021. תצוגת היורש הרשמית היא " +
        "I_MaterialDocumentItem_2 (Material Document Item, Status Released), שממשיכה להתעדכן גם ב-2025 FPS01.",
      edition: "on-premise",
      release: "2021.000",
      source: MATDOC_ITEM_DEPRECATION_WN2021,
      successor: "obj:material-document",
      recommendedAction:
        "בקוד Z, בתצוגות CDS מותאמות, ב-Custom Analytical Queries ובחילוץ נתונים חדש לצרוך את " +
        "I_MaterialDocumentItem_2 ולא את I_MaterialDocumentItem. לסרוק פיתוחים קיימים (SELECT, association, " +
        "OData) שמפנים לתצוגה הישנה ולתכנן החלפה. ב-ECC אין תצוגת VDM מקבילה: המקור הוא MSEG ו-MKPF. שדות " +
        "ואסוציאציות של תצוגת היורש דורשים אימות במערכת (View Browser או ADT) לפני שימוש.",
    },
    xrefs: [
      "table:MSEG", "table:MKPF", "obj:material-document", "tx:MB51", "tx:MIGO",
      "fm:BAPI_GOODSMVT_CREATE", "fiori:F0843", "bp:matdoc-read-through-compatibility",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס 'לא אסטרטגי' מעוגן בסניפט רשמי של What's New 2021 הנוקב בשם התצוגה, ותצוגת היורש " +
      "I_MaterialDocumentItem_2 מאומתת מעמוד ה-VDM הרשמי. בשדה successor נרשם obj:material-document (קבוצת " +
      "מסמך החומר של המאגר) לפי התקדים של רשומת MSEG, כי cds:I_MaterialDocumentItem_2 אינו מזהה קיים ביקום " +
      "המזהים של הפרויקט; רישום התצוגה ב-data/cds-map.ts יאפשר להפנות אליה ישירות. הסטטוס הנגזר הקודם (חדש " +
      "ב-S/4HANA, לפי רשומת ההעשרה) סותר את התיעוד הרשמי ולכן הוחלף בסטטוס מחובר. רשומת ההעשרה במאגר " +
      "(Interface Composite, מפתח, אסוציאציות), שכבת הצריכה C_MaterialDocumentItem והקישור ליישום F0843 לא " +
      "נתמכו באף רשומת חיפוש רשמית ונשארים ברובד המאגר. בעמוד What's New 1809 'CDS Views for Inventory " +
      "Management' (versionId 1809.000) הסניפט מציין רק 'Several Core Data Services (CDS) views for Inventory " +
      "Management have now been released' ו-'CDS-Views for Stock and Material Documents', ללא שמות תצוגות; שנת " +
      "השחרור של I_MaterialDocumentItem עצמה לא אומתה מרשומה רשמית. גוף עמודי ה-Help לא נקרא בדפדפן; כל ציטוט " +
      "נלקח מכותרת ומסניפט של שירות החיפוש הרשמי.",
  },
  {
    id: "cds:I_ProductionVersion",
    aliases: ["I_PRODUCTIONVERSION"],
    evidence: [
      PRODUCTION_VERSION_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Standard Value Help for Production Version | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/6bf6498ac6ec4a48a3f1ade04ba3b240.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "תצוגת עזרת הערכים I_ProductionVersionBasicStdVH‏ (Analytical Data Category: Value Help, Status " +
          "Released) מספקת עזרת ערכים סטנדרטית לגרסאות ייצור עם השדות החשובים Product‏, Plant‏, ProductionVersion " +
          "ו-ProductionVersionTText; העמוד מנחה: התצוגה מיועדת לעזרת ערכים בלבד, ולשליפת מלוא הנתונים העסקיים יש " +
          "להשתמש בתצוגה 'Production Version' (כותרת העמוד של I_ProductionVersion באותו מדריך) במקומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Objects Released for Developer Extensibility in Production Engineering | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/7cc0f0ecdc154c6183be40b3f2cd50c1.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE2,
        claim:
          "ב-What's New של S/4HANA 2023 נרשמה תצוגה נוספת בשם I_ProductionVersionTP‏ ('CDS View Interface for BO " +
          "Production Version - TP', סוג New), המספקת מידע אילו גרסאות ייצור קיימות למפעל ולחומר מסוימים, במסגרת " +
          "האובייקטים ששוחררו להרחבת מפתחים (Developer Extensibility) ב-Production Engineering; זו תצוגה נפרדת " +
          "מ-I_ProductionVersion.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ההעשרה מתארת את I_ProductionVersion כתצוגת Interface (Basic) מעל MKAL עם מפתח Product + Plant + " +
          "ProductionVersion ואסוציאציות _Product‏, _Plant‏, _Routing ו-_BillOfMaterial, וכחלופת ECC: טבלת MKAL, " +
          "‏C223 ו-MM02 (תצוגת MRP4); מיפוי הפרויקט מקשר את התצוגה ל-MKAL ולאפליקציית Manage Production Versions. " +
          "רשימת השדות והאסוציאציות לא אומתה מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_ProductionVersion",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת CDS של מודל הנתונים הווירטואלי (VDM) של S/4HANA לגרסאות ייצור: לפי העמוד הרשמי (גרסת תיעוד 2023), " +
        "I_ProductionVersion היא תצוגת Basic/Dimension בסטטוס Released, החושפת אילו גרסאות ייצור קיימות לחומר " +
        "במפעל ואילו משויכות ל-BOM ולרשימת הפעולות. לפי רשומת המאגר, ב-ECC אין שכבת CDS כזו והחלופה היא קריאה " +
        "ישירה מטבלת MKAL‏ (C223, ‏MM02).",
      edition: "on-premise",
      release: "2023.latest",
      source: PRODUCTION_VERSION_VDM_2023,
      recommendedAction:
        "לשליפות קריאה של גרסאות ייצור ב-S/4HANA העדיפו את I_ProductionVersion על SELECT ישיר מ-MKAL, וודאו " +
        "הרשאת C_FVER_WRK למשתמש הקורא; לעזרת ערכים בלבד השתמשו ב-I_ProductionVersionBasicStdVH. לפני שימוש " +
        "במערכת 2025 ומעלה אמתו במערכת (SE11 או ADT) את רשימת השדות והאסוציאציות, כי עמוד ה-VDM הרשמי אותר לגרסת " +
        "תיעוד 2023 בלבד ורשימת השדות במאגר לא אומתה רשמית.",
    },
    xrefs: [
      "table:MKAL", "tx:C223", "tx:MM02", "fm:BAPI_PRODVERS_CREATE_REPLACE", "cds:I_BillOfMaterial",
      "cds:I_Routing",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "העמוד הרשמי של התצוגה אותר בשירות החיפוש של help.sap.com רק בגרסת התיעוד 2023 (versionId 2023.latest) " +
      "של S/4HANA On-Premise; חיפוש ממוקד בגרסאות 2025.000 ו-2025.001 החזיר רק את עמודי ה-API של גרסאות ייצור " +
      "(APIs for Manufacturing, למשל 'Operations for Production Versions', loio 2c77bb00) ולא את עמוד ה-VDM, " +
      "ולכן הקשר הגרסה של הסטטוס הוא 2023. גוף העמוד אינו נגיש ללא דפדפן, והטענות מוגבלות לכותרת ולסניפט: סוג " +
      "הנתונים, סטטוס Released, ההרשאה C_FVER_WRK והשאלות העסקיות. השדות והאסוציאציות ברשומת ההעשרה " +
      "(_Product‏, _Plant‏, _Routing‏, _BillOfMaterial) לא אומתו מול מקור רשמי; עמוד התצוגה ב-SAP Business " +
      "Accelerator Hub‏ (api.sap.com/cdsviews/I_PRODUCTIONVERSION) מחזיר מעטפת יישום בלבד עם כותרת גנרית וללא " +
      "שם התצוגה, זהה גם לנתיב בקרה של תצוגה שאינה קיימת, ולכן לא צוטט. בעמודי ה-VDM של Planned Order " +
      "(2025.001, loio d2bd7eb7) ו-Manufacturing Order (2023.latest, loio 6dec1267) מופיעה האסוציאציה " +
      "_ProductionVersion כאלמנט שהוצא משימוש (deprecated) עם היורש _ProductionVersion_2 או " +
      "_ProductionVersion2; הסניפט אינו מציין לאיזו תצוגה מצביע היורש, ואין בכך ראיה להוצאה משימוש של " +
      "I_ProductionVersion עצמה, שעמודה מציין Status Released. תצוגה נפרדת I_ProductionVersionTP שוחררה ב-2023 " +
      "להרחבת מפתחים. אפליקציית Manage Production Versions מתועדת ב-On-Premise 2025.001 (loio 2f691c43), אך " +
      "אין לה מזהה Fiori ביקום הפרויקט ולכן לא נוספה כ-xref. מיפוי הפרויקט: " +
      "data/cds-map.ts#I_ProductionVersion.",
  },
  {
    id: "cds:I_WorkCenterCostCenter",
    evidence: [
      WORKCENTER_COSTCENTER_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle:
          "CDS Views for Basic Work Center Data | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition " +
          "2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/21cd2fa6d9dd4855a02f7edc83dcfe22.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE2,
        claim:
          "עמוד ה-What's New לגרסת 2025 (‏2025.000) מדווח ששוחררו תצוגות CDS חדשות עבור Production Engineering " +
          "באזור Basic Work Center Data, ומונה את I_WorkCenterCostCenter (Work Center Cost Center) בטבלת 'CDS " +
          "Views Changed for Basic Work Center Data' לצד I_WorkCenter ו-I_WorkCenterText; בפרטים הטכניים שבסניפט: " +
          "ללא לוקליזציה, Scope Item לא רלוונטי, ורשימת Technical Object Name של העמוד מופיעה בסניפט קטועה " +
          "(מסתיימת ב-I_WorkCenterCostCen); השם המלא נקוב בטבלת CDS Views Changed של אותו עמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 SPS04 (PDF, Document Version 1.0, " +
          "2025-08-06) | Manufacturing: CDS Views for Basic Work Center Data",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.004",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2023.004/en-US/WN_OP2023_SPS04_EN.pdf",
        accessedAt: DATE2,
        claim:
          "מסמך ה-What's New ל-2023 SPS04 (PDF, פרק Manufacturing, עמודים 17-18, נקרא בפועל) מונה את " +
          "I_WorkCenterCostCenter בטבלה 'CDS Views Changed for Basic Work Center Data' כתצוגה שעודכנה בתוספות שדות " +
          "(field additions) עבור Production Engineering; בפרטים הטכניים: Type New, רכיב יישום PP-VDM (Virtual " +
          "Data Model in PP), זמינות SAP S/4HANA Cloud Private Edition ו-SAP S/4HANA, Valid as Of 2023 SPS04. " +
          "המסמך אינו מפרט אילו שדות נוספו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS ורשומת ההעשרה של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מיפוי הפרויקט מקשר את התצוגה (שם עברי: מרכז עלות למרכז עבודה, מודול PP-PI) לטבלאות CRCO ו-CSLA, ללא " +
          "שכבת צריכה וללא יישום Fiori; רשומת ההעשרה (data/cds-enrichment.ts#I_WorkCenterCostCenter) מסווגת אותה " +
          "Interface (Basic) מעל CRCO, מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, ומציגה אסוציאציות ודוגמת " +
          "SELECT עם שמות שדות שלא אומתו מול רשימת האלמנטים הרשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_WorkCenterCostCenter",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "תצוגת CDS של ה-Virtual Data Model לשיוך מרכז עלות וסוג פעילות למרכז עבודה (טבלת CRCO). התיעוד הרשמי " +
        "(VDM, 2023 Latest) מסווג אותה Basic, Dimension בסטטוס שחרור Released; מסמך ה-What's New ל-2023 SPS04 " +
        "מונה אותה בין התצוגות שעודכנו בתוספות שדות תחת Basic Work Center Data (רכיב PP-VDM), ועמוד ה-What's New " +
        "ל-2025 מונה אותה שוב בטבלת CDS Views Changed של אותו אזור. לא נמצאה הודעת deprecation או " +
        "decommissioning לתצוגה זו בחיפוש בתיעוד הרשמי.",
      edition: "on-premise",
      release: "2023.latest",
      source: WORKCENTER_COSTCENTER_VDM_2023,
      recommendedAction:
        "בקוד חדש ובדוחות ב-S/4HANA להעדיף קריאה דרך I_WorkCenterCostCenter על פני SELECT ישיר מ-CRCO, לשיוך " +
        "מרכז עלות וסוג פעילות למרכז עבודה או משאב בייצור ובתחזוקת מפעל. לפני שימוש לאמת את רשימת האלמנטים " +
        "במערכת (View Browser או SE11), כי התיעוד הפומבי מציג רק חלק מהמאפיינים והתצוגה עודכנה בתוספות שדות " +
        "ב-2023 SPS04. התצוגה מיועדת לקריאה; ליצירת השיוך להשתמש בשירות Create Work Center Cost Center (APIs for " +
        "Manufacturing, 2025 FPS01) המצוטט ברשומת table:CRCO; שירות עדכון (Update Work Center Cost Center) קיים " +
        "כרשומת תיעוד רשמית לגרסה 2025.001 אך אינו מצוטט ברשומה זו.",
    },
    xrefs: [
      "table:CRCO", "table:CSLA", "table:CRHD", "cds:I_WorkCenter", "tx:CR02", "tx:CR03", "tx:CRC3",
      "fm:CR_COST_CENTER_READ",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "שלוש ראיות רשמיות: דף ההגדרה של התצוגה ב-VDM (2023 Latest) עם שם טכני, סוג וסטטוס שחרור; עמוד ה-What's " +
      "New ל-2025 (2025.000); ומסמך ה-What's New ל-2023 SPS04 (PDF שנקרא בפועל, לא סניפט בלבד). חיפוש בגרסה " +
      "2025.001 החזיר רק דפי APIs for Manufacturing ולא את דף ה-VDM של התצוגה, ולכן סטטוס השחרור נרשם על 2023 " +
      "Latest והקיום ב-2025 נסמך על עמוד ה-What's New. הסניפט הרשמי נוקב רק בטבלת CRCO; CSLA שבמיפוי הפרויקט " +
      "היא טבלת האב של סוגי הפעילות ולא אומתה כמקור ישיר של התצוגה. שמות השדות והאסוציאציות ברשומת ההעשרה " +
      "(למשל CostCtrActivityType, _ActivityType) לא אומתו: גוף דף ה-Help הוא מעטפת JavaScript, וחיבור ה-MCP " +
      "למערכת חיה נכשל בסשן. I_WorkCenterCostCenterTP (What's New 2022, Objects Released for Developer " +
      "Extensibility) היא אובייקט נפרד ואינה התצוגה הזו. מסמך 2023 SPS04 מציין זמינות גם ב-SAP S/4HANA Cloud " +
      "Private Edition; המהדורה ברשומה נשארת On-Premise לפי ברירת המחדל של הפרויקט. שירות Create Work Center " +
      "Cost Center (APIs for Manufacturing, 2025 FPS01) מצוטט עם קישור ברשומת table:CRCO; שירות Update Work " +
      "Center Cost Center הופיע בחיפוש הרשמי לגרסה 2025.001 (loio 32ab5c8d33d64aab98a0331fef23cd86) ואינו " +
      "מצוטט כאן. ההקשר בתחזוקת מפעל, לפי רשומת CRCO במאגר: שיוך מרכז העלות וסוג הפעילות הוא הבסיס לתמחור " +
      "פעילויות בהזמנות תחזוקה וייצור.",
  },
  {
    id: "cds:I_Product",
    aliases: ["I_PRODUCT"],
    evidence: [
      PRODUCT_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Product Master | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/1b8964a0a8734596b251bf79aa415d7d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "פריט ה-What's New לגרסת 2025 FPS01 (מזהה פריט CA-AA41-5D7D בסניפט) קובע: 'With this release, the following field has been added to the I_Product CDS view: SegmentationStructure', עם הפרטים הטכניים 'Type Changed', 'Technical Object Name CDS View: I_Product', 'Application Component LO-MD-MM (Product Master)', 'Scope Item Not applicable', 'Functional Localization No localization' וזמינות 2025 FPS01. כלומר: התצוגה קיימת ומתוחזקת ב-SAP S/4HANA 2025 FPS01 On-Premise / Private Cloud, והשינוי המתועד הוא הוספת שדה, לא החלפה או הוצאה משימוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Replicating Custom Fields for Product Master Data | Integration with Industry Cloud Solutions from SAP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2de74e75ac4240c68ff125a948205aee/e10c73228f5448ccb0ca2345933f55d6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "העמוד לגרסת 2025 FPS01 מנחה להגדיר תצוגת הרחבה של I_Product לשכפול שדות מותאמים של אב המוצר: 'Define an extension view of the I_Product CDS view. In the MARA database table, identify the custom fields that you want to replicate', ודורש ששמות השדות המותאמים בתצוגת ההרחבה יתאימו לשמות בטבלת MARA. קוד הדוגמה בסניפט משתמש באנוטציות '@AbapCatalog.sqlViewAppendName' ו-'@EndUserText.label' וב-association '[1..1] to I_Product as _Product on $projection.Product = _Product.Product' עם השדות Product, ZZ_CUSTOM_FIELD1, ZZ_CUSTOM_FIELD2. זהו הקישור הרשמי בין תצוגת ה-CDS‏ I_Product לבין טבלת MARA (נתוני חומר כלליים).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט ורשומת ההעשרה של התצוגה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "המיפוי בפרויקט (data/cds-map.ts) מקשר את I_Product ('נתוני אב חומר (כללי)', מודול PP-PI) לטבלה MARA. רשומת ההעשרה (data/cds-enrichment.ts#I_Product) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור ('SAP S/4HANA CDS Views (VDM) - I_Product', 'SAP Help Portal - Product/Material Master'), מגדירה viewType 'Interface (Composite)', מפתח Product, associations ‏_ProductType‏, _ProductGroup‏, _BaseUnit‏, _ProductDescription‏, _Plant, ונוקבת בחלופת ECC‏: MARA+MAKT עם MM01/MM02/MM03. הערך viewType סותר את 'Data Category Dimension' שבסניפט הרשמי; ה-associations אינם מאומתים רשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_Product",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת CDS במודל הנתונים הווירטואלי (VDM) של SAP S/4HANA, מקטגוריית נתונים Dimension, בסטטוס שחרור Released לפי התיעוד הרשמי (Virtual Data Model and CDS Views, On-Premise 2023 Latest). התצוגה מספקת לצרכן רשימת מוצרים עם נתוני הבסיס שלהם (כלשון הסניפט), תצוגת הטקסט הקשורה היא I_ProductDescription, והתפקיד העסקי המשויך הוא SAP_BR_PRODMASTER_SPECIALIST. ב-2025 FPS01 נוסף לה השדה SegmentationStructure (What's New, רכיב LO-MD-MM), והתיעוד הרשמי קושר תצוגת הרחבה שלה לשדות טבלת MARA. ב-ECC אין תצוגת VDM מקבילה; המקור הקלאסי לפי מיפוי הפרויקט הוא MARA (ותיאור ב-MAKT). אותו נושא מתועד גם ב-Cloud Public Edition 2608.500, שם תצוגת הטקסט הקשורה נקראת I_ProductText.",
      edition: "on-premise",
      release: "2023.latest",
      source: PRODUCT_VDM_2023,
      recommendedAction: "לקריאה, לדיווח ולאנליטיקה על נתוני האב הכלליים של חומר / מוצר ב-S/4HANA (תעשיות תהליכיות ותחזוקת מפעל כאחד) להשתמש ב-I_Product (תצוגת Dimension משוחררת) עם I_ProductDescription לטקסט, במקום SELECT ישיר מ-MARA ו-MAKT. את רשימת השדות, ה-associations, שם ה-DataSource (Extractor) המקביל ופרטי ה-Delta לאמת מול גוף העמוד הרשמי או מול View Browser / SE11 במערכת חיה, כי הסניפט מונה רק את הכותרת, המטרה, הקטגוריה, הסטטוס, סוג החילוץ (Full) וסוגי האובייקט Material ו-Product. בהרחבת שדות מותאמים לעבוד לפי המדריך הרשמי: תצוגת הרחבה של I_Product עם שמות שדות זהים לאלה שב-MARA. ליצירה ולעדכון של אב מוצר לא לעבוד מול התצוגה אלא מול ה-OData API‏ API_PRODUCT_SRV (מדריך APIs for Product Master, 2025 FPS01; ראו הערות). לתקן את data/cds-enrichment.ts: הערך viewType 'Interface (Composite)' סותר את 'Data Category Dimension' הרשמי, וה-associations הרשומים שם אינם מאומתים.",
    },
    xrefs: ["table:MARA", "table:MAKT", "table:MARC", "table:T134", "table:T023", "table:T006", "tx:MM01", "tx:MM02", "tx:MM03", "fm:BAPI_MATERIAL_GET_DETAIL", "fm:BAPI_MATERIAL_SAVEDATA", "fm:MARA_SINGLE_READ", "fm:MAKT_SINGLE_READ", "idoc:msg:MATMAS", "idoc:basic:MATMAS05", "cds:I_ProductDescription", "cds:I_ProductPlant", "cds:I_ProductUnitOfMeasure"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ב-2026-09-14 ('I_Product', 'Product CDS View Name I_Product Related Text View I_ProductDescription', 'I_Product Data Category Dimension Status Released Data Extraction', 'Product CDS View Name I_Product Status Released' עם --version 2025.001, 'Product CDS View Name I_Product' עם --product SAP_S4HANA_CLOUD, 'I_Product deprecated CDS view successor', 'CDS Views for Product Master SegmentationStructure I_Product', 'App Extensibility: Manage Product Master I_PRODUCTWD C_PRODUCT E_PRODUCT MARA', 'Product Master (A2X) API_PRODUCT_SRV A_Product'), וחיפוש רשת מוגבל ל-help.sap.com ו-api.sap.com. שלושת ה-URL הרשמיים הועתקו כלשונם מהפלט (loio + versionId) ואומתו שוב בסבב הביקורת (HTTP 200, כותרת ו-versionId זהים), וכל טענה תחומה בכותרת ובסניפט; גופי העמודים לא נקראו (מעטפת JavaScript). אינדקס 2025.001 On-Premise לא החזיר את עמוד ה-VDM 'Product', ולכן הסטטוס Released נרשם על 2023.latest; קיום התצוגה ב-2025 FPS01 נתמך בפריט ה-What's New (הוספת SegmentationStructure) ובמדריך שכפול השדות המותאמים. רשומה רשמית נוספת שלא נכללה כראיה כדי לשמור על ארבע ראיות: 'Product' באותו loio במערך SAP_S4HANA_CLOUD, Cloud Public Edition 2608.500 (https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/af5c379f422e495c825802fcb9b0731f.html?locale=en-US&state=PRODUCTION&version=2608.500, הוחזר מהאינדקס ב-2026-09-14): 'CDS View Name I_Product', 'Related Text View I_ProductText', '(Product) BusinessObject', אותה הגדרת מטרה, וקבוצות הרשאה BEGRU_MAT, BEGRU_MATKL, BEGRU_MTART; שורת Status אינה בסניפט זה. ההבדל בין I_ProductDescription (On-Premise 2023) ל-I_ProductText (Cloud 2608) לא הוכרע. ממצא שלילי תחום בחיפוש: אף רשומה רשמית שנשלפה אינה מסמנת את I_Product כ-deprecated; עמוד 'Deprecated CDS Views' (What's New 2023, loio 82f5cad784a4447ea1139aaeeac0001e) עוסק בתצוגות Project System בלבד (I_Project, I_ProjectData). רשומות רשמיות משיקות לגרסת 2025.001 שלא נכללו: 'App Extensibility: Manage Product Master' (Product Master, loio ecb59556027ed75fe10000000a441470; הסניפט מונה I_PRODUCTWD, C_PRODUCT, E_PRODUCT ליד 'MARA, MAW' בהקשר עסקי 'Master Data: Product General'); 'Product Master (A2X)' (APIs for Product Master, loio 74aa2b58a333a107e10000000a441470; שירות API_PRODUCT_SRV עם A_Product לקריאה, יצירה, עדכון ומחיקה); עמודי APIs for Service (למשל loio 15245510dec64634a990b9ed430d0e49) שמפנים ל-I_Product כדי לאתר מוצרים זמינים לשדה Product. תצוגות Data Quality Analysis (VDM, למשל loio cda6e078b53544f98076b02719a3519c ב-2025.001) נוקבות ב-_Product(I_Product) כ-association, לצד I_ProductPlant ו-I_ProductUnitsOfMeasure. שים לב: הסניפט הרשמי נוקב ב-I_ProductUnitsOfMeasure (ברבים), בעוד מזהה ה-CDS בפרויקט (וה-xref ברשומה זו) הוא I_ProductUnitOfMeasure; אי-ההתאמה בשם לא הוכרעה ודורשת אימות מול מערכת חיה. אין xref ל-Fiori: המזהה F1602 (Manage Product Master Data) מופיע בסניפט הרשמי של 'Change Documents' (Product Master, 2025.001, loio 4715c453f57eb44ce10000000a174cb4: 'MM01(F1602): Created a product in the Manage Product Master Data app') אך אינו ברישום data/fiori/apps.ts. לא בוצעה בדיקה חיה במערכת SAP (חיבור sc4sap נכשל).",
  },
  {
    id: "cds:I_ProductPlant",
    aliases: ["I_PRODUCTPLANT"],
    evidence: [
      PRODUCT_PLANT_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Product Plant Active Core Entity | Virtual Data Model and CDS Views (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/e63ceee015814892862d40af7688aff1.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE14,
        claim: "אותו נושא (loio זהה) במערך התיעוד של SAP S/4HANA Cloud Public Edition, גרסה 2608 Latest: 'CDS View Name I_ProductPlant', אותה הגדרת מטרה ('This CDS view helps to retrieve plant related data of products'), ובנוסף: 'We recommend that you switch to the following successor CDS views: I_ProductPlantBasic: Core Product Plant Fields', עם הפניה לתהליך ה-deprecation של תצוגות CDS. כלומר בענן הציבורי התצוגה נמצאת בתהליך הוצאה משימוש עם יורש בשם I_ProductPlantBasic. הסניפט אינו נוקב בגרסה שבה החלה ההוצאה משימוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Overview Inventory Management | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/1286446c85fb4ff3b2cdca5fb2917d60.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE14,
        claim: "הקשר ליורש בסקופ On-Premise: רשומת What's New ל-SAP S/4HANA 2023 קובעת שאפליקציית Overview Inventory Management הורחבה בתצוגת CDS‏ 'Core Product Plant Fields (I_ProductPlantBasic)' ('the app was enhanced with the CDS view Core Product Plant Fields (I_ProductPlantBasic)'). כלומר תצוגת היורש שהתיעוד של הענן הציבורי ממליץ עליה קיימת גם ב-On-Premise החל מ-2023. הסניפט אינו קובע דבר על מעמד I_ProductPlant עצמה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Overview Inventory Processing | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/c63900bb82e241f29e84b8e9e40d1324.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "בתיעוד On-Premise 2025 FPS01 (MM-IM) התצוגה עדיין משמשת להרחבת מקור נתונים של האפליקציה: 'The I_ProductPlant CDS view is used for the Data Source Extension. You can extent the app for example with the MRP controller. But you can also use any other field from this extension view' [כך במקור], ובהיעדר חומר: 'there is no extension via I_ProductPlant possible. Hence, no filter from I_ProductPlant can be used or forwarded'. הסניפט אינו קובע סטטוס שחרור או הוצאה משימוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט ורשומת ההעשרה של התצוגה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "המיפוי בפרויקט מקשר את I_ProductPlant (נתוני אב חומר ברמת מפעל, מודול PP-PI) לטבלה MARC. רשומת ההעשרה (data/cds-enrichment.ts#I_ProductPlant) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, מגדירה viewType 'Interface (Composite)', מפתח Product + Plant, associations ‏_Product‏, _Plant‏, _MRPArea, ונוקבת בחלופת ECC: טבלה MARC הנצפית דרך MM03 (תצוגות MRP, עבודה ואחסון).",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_ProductPlant",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת CDS במודל הנתונים הווירטואלי (VDM) של SAP S/4HANA, Data Category Dimension, בסטטוס Released לפי התיעוד הרשמי ל-On-Premise 2023 Latest (Product Plant Active Core Entity), ומטרתה לפי הסניפט לאחזר נתוני מפעל של מוצרים. ב-ECC אין תצוגת VDM מקבילה; המקור הקלאסי לפי מיפוי הפרויקט הוא MARC, ותיעוד 2025 FPS01 עדיין מציג את התצוגה כתצוגת הרחבת מקור נתונים באפליקציות MM-IM. אזהרת מחזור חיים: באותו נושא במערך Cloud Public Edition 2608 מומלץ לעבור ליורש I_ProductPlantBasic (Core Product Plant Fields), ותצוגת היורש קיימת גם ב-On-Premise לפי What's New 2023. לסקופ On-Premise 2025 לא אותרה רשומת VDM לתצוגה, ולכן מעמד ההוצאה משימוש שם לא נקבע.",
      edition: "on-premise",
      release: "2023.latest",
      source: PRODUCT_PLANT_VDM_2023,
      recommendedAction: "לקריאה, לדיווח ולהרחבות של נתוני אב חומר ברמת מפעל ב-S/4HANA On-Premise ניתן להשתמש ב-I_ProductPlant (Released לפי 2023 Latest) במקום SELECT ישיר מ-MARC. בפיתוח חדש יש לבדוק תחילה את I_ProductPlantBasic (Core Product Plant Fields), היורש שהתיעוד הרשמי של הענן הציבורי ממליץ עליו והקיים ב-On-Premise מ-2023, ולאמת במערכת היעד (View Browser או ADT) את סטטוס השחרור וההוצאה משימוש של שתי התצוגות בגרסה המותקנת. שמות השדות, ה-associations והמפתח שברשומת ההעשרה לא אומתו מהסניפט ונשארים ברמת נדרש אימות. לתקן את data/cds-enrichment.ts: הערך viewType 'Interface (Composite)' סותר את 'Data Category Dimension' הרשמי.",
    },
    xrefs: ["table:MARC", "table:MARA", "cds:I_Product", "tx:MM01", "tx:MM02", "tx:MM03", "fm:MARC_SINGLE_READ", "fm:BAPI_MATERIAL_GET_DETAIL", "fm:BAPI_MATERIAL_SAVEDATA", "idoc:msg:MATMAS"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('I_ProductPlant', 'Product Plant Active Core Entity', 'I_ProductPlant released CDS view product plant', 'I_ProductPlantBasic Core Product Plant Fields', 'CDS Views for Product Master', 'I_ProductPlant_2', 'I_ProductPlant deprecated successor', בסקופ SAP_S4HANA_ON-PREMISE ב-2023.latest ו-2025.001 ובסקופ SAP_S4HANA_CLOUD‏ 2608.500) ורובד Tier-2 מהמאגר; חיפוש רשת חיצוני לא נדרש כי שירות החיפוש החזיר את נושא ה-VDM ישירות. גוף העמוד הרשמי אינו נשלף (מעטפת JavaScript), ולכן כל טענה מוגבלת לכותרת ולסניפט; רשימת השדות המלאה, ה-associations, המפתח וטבלת Business Objects של התצוגה לא אומתו. ב-On-Premise נושא ה-VDM מאונדקס רק תחת 2023 Latest; חיפושים תחת 2025.001 החזירו רק נושאי API (A_ProductPlant, Product Plant Data) ונושאי הרחבת אפליקציות, לא את נושא ה-VDM, ולכן הגרסה ברשומה היא 2023.latest. הבדל בין מהדורות שנרשם במפורש: במערך Cloud Public Edition 2608 אותו loio ממליץ לעבור ל-I_ProductPlantBasic, ועמוד הרשימה 'CDS Views for Product Master' באותו מערך (loio 5fbc1f91f9b246dd9208245f96ba7021) מנסח 'Product Plant Active Core Entity I_ProductPlant This view is deprecated. Use Core Product Plant Fields'; לסקופ On-Premise לא אותר ניסוח deprecation לתצוגה זו, ולכן הסטטוס המחובר נשאר s4_native ל-On-Premise 2023.latest עם אזהרה, ולא deprecated. היורש I_ProductPlantBasic אינו מזהה ביקום הרשומות (lib/route-manifest.generated.ts) ולכן לא נרשם בשדה successor; הוא מוזכר בטקסט בלבד. אנומליית תיעוד שלא נעשה בה שימוש: נושא 'Product Active Core Entity' במערך הענן (loio 02db5f685832426bae1aaf60c6d9a7ff) מציג בסניפט 'CDS View Name I_ProductPlant Status Released' אף שמטרתו 'list of all the active products'; נראה כשגיאת תיעוד ולכן לא צוטט. הנושא 'App Extensibility: Manage Product Master' (2025.001, loio ecb59556027ed75fe10000000a441470) מונה בהקשר העסקי PRODUCT_PLANT את I_PRODUCTPLANTWD, C_PRODUCTPLANT, E_PRODUCTPLANT, PLNT_INCL_EEW_PS ו-MARC; השם I_PRODUCTPLANT עצמו אינו נראה בסניפט הקטוע ולכן הנושא לא נרשם כראיה. הקישור ל-cds:I_Product נתמך בסניפט של 'Data Quality Analysis for Product Plant - Cube' (2023.latest, loio 993b42319d2042b4964f41b5ae8d4574) המציג association אל I_ProductPlant (שם ה-association עצמו קטוע בסניפט) ואת ה-association ‏_Product(I_Product); המאפיינים MRPGroup, MRPType, Plant, ProcurementType ו-PurchasingGroup שבאותו סניפט שייכים לקוביית איכות הנתונים ולא נטענים כשדות I_ProductPlant. ההפניות '_ProductPlant → _ProductPlant2' בנושאי Manufacturing Order ו-Planned Order הן הוצאה משימוש של association בתצוגות אחרות, תצוגת היעד אינה נקובה בסניפט, ולכן לא שימשו כראיה לרשומה זו. סתירה מול המאגר: data/cds-enrichment.ts מגדיר viewType 'Interface (Composite)' בעוד המקור הרשמי קובע 'Data Category Dimension'; ה-associations והמפתח שברשומת ההעשרה אינם מופיעים בסניפט. אין מזהה Fiori ביקום הרשומות לאפליקציה Manage Product Master, ולכן אין xref מסוג fiori. השיעור data/academy/lessons/pp-generated.ts מסמן את I_ProductPlant בדרגת verified-docs עם המקור 'SAP Help Portal'; במעבר זה הסימון שוחזר ממקור רשמי. חיבור sc4sap MCP נכשל בסשן זה, לכן לא בוצעה בדיקת ADT/SE11 חיה. ביקורת עצמאית 2026-09-14: ארבעת ה-URL מחזירים HTTP 200; ארבעת ה-loio, כותרותיהם, גרסאותיהם וכל המחרוזות המצוטטות שוחזרו מתקצירי שירות החיפוש (סקופ On-Premise 2023.latest, 2023.000, 2025.001 וסקופ Public Cloud 2608.500); הממצא השלילי ל-2025.001 שוחזר; רשומות cds-map ו-cds-enrichment תואמות לטענת המאגר; כל 10 ה-xrefs קיימים ביקום לפי משפחה.",
  },
  {
    id: "cds:I_BillOfMaterial",
    aliases: ["I_BILLOFMATERIAL"],
    evidence: [
      BOM_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Bill of Material | Virtual Data Model and CDS Views (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/064e64c0283b4230a27ee6f75ee205a2.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE14,
        claim: "נושא VDM נפרד במערך התיעוד של Cloud Public Edition (loio 064e64c0283b4230a27ee6f75ee205a2, שונה מה-loio של העמוד ב-On-Premise), גרסה 2608.500: 'CDS View Name I_BILLOFMATERIAL', 'Data Category Basic', ובקטע סניפט נוסף של אותה רשומה 'Status Released Purpose This CDS view provides the prerequisites for answering the following business questions'. הסניפט מונה כמאפיינים חשובים: Bill of Material Category, Bill of Material Variant Usage, Bill of Material, ושאלות עסקיות על BOM alternative, BOM usage, BOM version ו-BOM status. הטענה מוגבלת ל-Cloud Public Edition ואינה קובעת Release Status ב-On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Bills of Material (Version 2) | APIs for Product Lifecycle Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9f047b05da4545ca8f9ebfc22acefd06/ac29c05833e44980ab6b236e409f2429.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "מדריך ה-API של 2025 FPS01 מתעד את שירות ה-OData‏ 'Bills of Material (Version 2)' בנתיב /sap/opu/odata/SAP/API_BILL_OF_MATERIAL_SRV;v=2. קטעי הסניפט של אותה רשומה (תלויי שאילתה) מציגים: Read BOM Header (GET על הישות MaterialBOM עם המפתחות BillOfMaterial, BillOfMaterialCategory='M', BillOfMaterialVariant, BillOfMaterialVersion, EngineeringChangeDocument, Material ו-Plant), Read BOM Item (GET על הישות MaterialBOMItem), Update BOM Item (PATCH) ופעולת Release Version BOM (POST). הסניפט אינו נוקב בשם I_BillOfMaterial כתצוגה שמתחת לשירות, ולכן הקשר בין השניים אינו מאומת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Bill of Material | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/ec31096ce7a14d36be3f4130b7637671.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: "בתחזוקת מפעל, מדריך APIs for Maintenance Management (2023 Latest) מתעד את שירות ה-OData‏ API_MAINTENANCEBOM עם הישויות BOMHeader ו-BOMItem. קטעי הסניפט של אותה רשומה (תלויי שאילתה) מציגים: Read Maintenance BOM entities, Read Maintenance BOM Header (GET על BOMHeader עם המפתחות BillOfMaterial, BillOfMaterialCategory='E', BillOfMaterialVariant), Create Maintenance BOM Item (POST על BOMHeader עם אותם מפתחות), Read Maintenance BOM Item entities (GET על BOMItem), וכן את השדות TechnicalObject, Plant ו-EngineeringChangeDocument במפתח. הערך BillOfMaterialVariantUsage='4' מופיע ברשומה אחות באותו מדריך ('Read Maintenance BOM Item entities', loio 0491ef32396f42f28e3fe5f6c08b89a1). גם כאן הסניפט אינו נוקב בשם I_BillOfMaterial.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט ורשומת ההעשרה של התצוגה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "המיפוי בפרויקט מקשר את I_BillOfMaterial (עץ מוצר, כותרת; מודול PP-PI) לטבלאות MAST ו-STKO, ואת I_BillOfMaterialItem ל-STPO. רשומת ההעשרה (data/cds-enrichment.ts#I_BillOfMaterial) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, מגדירה viewType 'Interface (Composite)', מפתח BillOfMaterial, associations ‏_BillOfMaterialItem‏, _Material‏, _Plant, ונוקבת בחלופת ECC‏: MAST+STKO+STPO עם CS01/CS02/CS03. רשומת table:STKO באותו מאגר מצטטת את אותו עמוד VDM רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_BillOfMaterial",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת CDS של מודל הנתונים הווירטואלי (VDM) של SAP S/4HANA לכותרת עץ מוצר: לפי רשומת החיפוש הרשמית של מדריך Virtual Data Model and CDS Views (On-Premise, גרסת תיעוד 2023 Latest) השם הטכני הוא I_BillOfMaterial, סוג התצוגה Basic, והיא 'can determine a valid Bill of Material (BOM) header based on the requested BOM keys and expose BOM Header attributes', עם המאפיינים BillOfMaterial (מספר BOM), BillOfMaterialVariant (חלופה) ו-BillOfMaterialVariantUsage (שימוש). הסניפט של העמוד ב-On-Premise אינו מציג Release Status ואינו נוקב בטבלאות המקור. נושא VDM נפרד ב-Cloud Public Edition (2608.500, loio אחר) מציג 'CDS View Name I_BILLOFMATERIAL', 'Data Category Basic' ו-'Status Released', וזאת ל-Cloud בלבד. ב-ECC אין שכבת VDM כזו; המקור הקלאסי לפי מיפוי הפרויקט הוא MAST ו-STKO.",
      edition: "on-premise",
      release: "2023.latest",
      source: BOM_VDM_2023,
      recommendedAction: "לשליפות קריאה של כותרות עץ מוצר ב-S/4HANA (תעשיות תהליכיות ותחזוקת מפעל) העדיפו את I_BillOfMaterial על SELECT ישיר מ-MAST/STKO, ואת הפריטים דרך I_BillOfMaterialItem. לפני שימוש בקוד מותאם אמתו במערכת (View Browser או ADT) את ה-Release Status של התצוגה, את רשימת השדות המלאה ואת ה-associations, כי הסניפט הרשמי אינו מציג Release Status ורשימת ה-associations שברשומת ההעשרה לא אומתה. ליצירה ולשינוי של עצי מוצר עבדו מול ה-OData API‏ API_BILL_OF_MATERIAL_SRV (גרסה 2, עצי מוצר לחומר) או API_MAINTENANCEBOM (עצי מוצר לציוד ולמיקום פונקציונלי בתחזוקת מפעל) ולא מול התצוגה. לתקן את data/cds-enrichment.ts: הערך viewType 'Interface (Composite)' סותר את 'View Type Basic' הרשמי.",
    },
    xrefs: ["table:MAST", "table:STKO", "table:STPO", "table:STAS", "table:STZU", "tx:CS01", "tx:CS02", "tx:CS03", "tx:IB01", "fm:CSAP_MAT_BOM_READ", "fm:CS_BOM_EXPL_MAT_RC1", "fm:BAPI_MATERIAL_BOM_GROUP_CREATE", "cds:I_BillOfMaterialItem", "cds:I_BillOfMaterialItemAssgmt", "cds:I_ProductionVersion", "enh:exit:PCSD0002"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('I_BillOfMaterial', 'Bill of Material Virtual Data Model CDS view', 'I_BillOfMaterial released developer extensibility', 'Bill of Material Item I_BillOfMaterialItem', 'Maintenance BOM API_MAINTENANCEBOM', 'Bills of Material simplification S/4HANA', וכן 'I_BillOfMaterial' במערך SAP_S4HANA_CLOUD ובגרסה 2025.001), חיפוש רשת מוגבל-דומיין על help.sap.com/api.sap.com, ורובד Tier-2 מהמאגר. גוף העמוד הרשמי אינו נשלף (מעטפת JavaScript), ונתיבי PDF שנוסו למדריך ה-VDM תחת help.sap.com/doc החזירו page-not-found, ולכן כל טענה מוגבלת לכותרת ולסניפט של רשומת החיפוש. הסניפט של On-Premise מציג שם טכני, View Type Basic, מטרה ושלושה מאפיינים בלבד; Release Status ב-On-Premise, רשימת השדות המלאה, ה-associations והפרמטרים לא אומתו. הסטטוס s4_native נסמך על קיום התצוגה בתיעוד ה-VDM של S/4HANA ועל היעדר מקבילה ב-ECC, לא על Release Status שלא נראה. ב-On-Premise נושא ה-VDM אותר רק תחת 2023 Latest; חיפוש בגרסה 2025.001 החזיר רק עמודי API (APIs for Product Lifecycle Management, APIs for Maintenance Management), ולכן הגרסה ברשומה היא 2023.latest. במערך Cloud Public Edition (2608.500) אותר נושא VDM נפרד לאותה תצוגה (loio 064e64c0283b4230a27ee6f75ee205a2, שונה מה-loio של On-Premise) שהסניפט שלו מציג 'CDS View Name I_BILLOFMATERIAL', 'Data Category Basic' ו-'Status Released'; הוא נרשם כעדות public-cloud נפרדת ואינו משמש לקביעת Release Status ב-On-Premise. סתירה מול המאגר: data/cds-enrichment.ts מגדיר viewType 'Interface (Composite)' בעוד המקור הרשמי קובע 'View Type Basic'. אף מקור רשמי שאותר אינו מסמן את I_BillOfMaterial כמוצאת משימוש או מוחלפת, ולכן אין יורש. אפליקציית Maintain Bill of Material‏ (F1813) מוזכרת ברשומת table:MAST מתוך עמוד ההגירה הרשמי, אך אין לה מזהה ב-data/fiori/apps.ts ולכן לא נוספה כ-xref. API_BILL_OF_MATERIAL_SRV ו-API_MAINTENANCEBOM מוזכרים בטקסט בלבד כי אין להם מזהה קנוני ביקום הרשומות. ה-xref ל-IB01 (עץ מוצר לציוד, תחזוקת מפעל) נסמך על רשומת PM:STKO במאגר; הסניפט הרשמי של התצוגה אינו מציין אם היא מכסה עצי מוצר לציוד (קטגוריה E) או רק לחומר (קטגוריה M).",
  },
  {
    id: "cds:I_BillOfMaterialItem",
    aliases: ["I_BILLOFMATERIALITEM"],
    evidence: [
      BOM_ITEM_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Bill of Material | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/e46cc75700eebc38e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: "תצוגת הכותרת המקבילה באותו מדריך (loio e46cc757): 'Bill of Material Technical Name I_BillOfMaterial View Type Basic Purpose This view can determine a valid Bill of Material (BOM) header based on the requested BOM keys and expose BOM Header attributes' ... 'along with association to BOM items'. כלומר תצוגת הכותרת מקושרת באסוציאציה לפריטי ה-BOM; שם האסוציאציה ותצוגת היעד אינם נקובים בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Access Control for CDS Views | Last Mile Distribution for Direct Distribution",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e322becd165844e5868e590bc8efafaf/55511b38c25241019e5d005e92079ddc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "עמוד בקרת הגישה לתצוגות CDS בתיעוד Last Mile Distribution לגרסת 2025 FPS01 (loio 55511b38) מתאר DCL שמממש בדיקות הרשאה לתצוגות ה-CDS שמשמשות את שירות ה-OData‏ 'Mobile Data for Last Mile Distribution (LMD_MA)' כלשון הסניפט, ומונה בטבלת Function / CDS View / Authorization Objects את השורה 'Determine reusable packaging materials I_BillOfMaterialItem C_STUE_BER'. כלומר: התצוגה קיימת ונצרכת בתיעוד On-Premise 2025 FPS01, ובדיקת ההרשאה שלה בהקשר זה היא דרך אובייקט ההרשאה C_STUE_BER.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS ורשומת ההעשרה של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "מיפוי הפרויקט מקשר את התצוגה (פריטי עץ מוצר, מודול PP-PI) לטבלה STPO בלבד; רשומת ההעשרה (data/cds-enrichment.ts#I_BillOfMaterialItem) מסווגת אותה Interface (Basic) מעל STPO, עם מפתח צומת BOM ומספר פריט פנימי (BillOfMaterial + BillOfMaterialItemNodeNumber), אסוציאציות _BillOfMaterial‏, _Component ו-_MaterialAssignment, וחלופת ECC: טבלה STPO (עם STAS לתוקף) וטרנזקציות CS01/CS02/CS03. הרשומה מסומנת 'verified' עם מקורות טקסטואליים ללא קישור; רשימת השדות והאסוציאציות לא אומתה מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_BillOfMaterialItem",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת CDS של מודל הנתונים הווירטואלי (VDM) של S/4HANA לפריט עץ מוצר (BOM Item): לפי העמוד הרשמי (גרסת תיעוד 2023 Latest) I_BillOfMaterialItem היא תצוגת Basic שקובעת פריט BOM תקף לפי מפתחות ה-BOM המבוקשים וחושפת את מאפייני הפריט, כולל מספר BOM, חלופה, קטגוריית פריט ותאריך תחילת תוקף, עם אסוציאציות לכל קטגוריות ה-BOM הסטנדרטיות. תיעוד 2025 FPS01 מונה אותה כתצוגה נצרכת עם אובייקט ההרשאה C_STUE_BER. לפי רשומת המאגר, ב-ECC אין שכבת CDS כזו והחלופה היא קריאה ישירה מטבלת STPO (עם STAS) או CS03.",
      edition: "on-premise",
      release: "2023.latest",
      source: BOM_ITEM_VDM_2023,
      recommendedAction: "לשליפות קריאה של פריטי עץ מוצר ב-S/4HANA, בייצור, בתעשיות תהליכיות ובתחזוקת מפעל, העדיפו את I_BillOfMaterialItem (עם I_BillOfMaterial לכותרת) על SELECT ישיר מ-STPO, וודאו למשתמש הקורא הרשאת C_STUE_BER (ובתצוגת BOM גם C_STUE_WRK לפי עמוד Authorization Objects של Bill of Material (LO-MD-BOM), גרסת 2025 FPS01). לפני שימוש במערכת 2025 ומעלה אמתו במערכת (SE11, View Browser או ADT) את סטטוס השחרור, את רשימת השדות ואת האסוציאציות, כי עמוד ה-VDM הרשמי אותר לגרסת תיעוד 2023 בלבד, הסניפט אינו מציג Release Status, ורשימת השדות במאגר לא אומתה רשמית. לפיצוץ רב-מפלסי התצוגה לבדה אינה מספיקה; השתמשו בלוגיקת פיצוץ (CS11/CS12 או CS_BOM_EXPL_MAT_RC1).",
    },
    xrefs: ["table:STPO", "table:STKO", "table:MAST", "table:STAS", "tx:CS01", "tx:CS02", "tx:CS03", "tx:CS11", "tx:CS12", "tx:CS15", "tx:IB01", "tx:IB11", "fm:CSAP_MAT_BOM_READ", "fm:CSAP_BOM_ITEM_MAINTAIN", "fm:CSAP_MAT_BOM_MAINTAIN", "fm:CS_BOM_EXPL_MAT_RC1", "cds:I_BillOfMaterial", "enh:exit:PCSD0002"],
    lastVerifiedAt: DATE14,
    notes: "שבע ריצות של scripts/sap-help-search.mjs ב-2026-09-14 (השם הטכני, השם האנגלי עם Virtual Data Model, Developer Extensibility, Data Extraction, What's New 2025 ל-BOM, גרסה 2025.001 ומוצר Public Cloud). עמוד ה-VDM של התצוגה אותר בשירות החיפוש רק בגרסת התיעוד 2023 (versionId 2023.latest); חיפוש ממוקד בגרסה 2025.001 החזיר רק עמודי APIs for Product Lifecycle Management (API_BILL_OF_MATERIAL_SRV;v=2, ישות MaterialBOMItem, ניווט to_BillOfMaterialItem) ואת עמוד בקרת הגישה של Last Mile Distribution, ולכן הקשר הגרסה של הסטטוס הוא 2023 והקיום ב-2025 FPS01 נסמך על עמוד בקרת הגישה. גוף העמוד אינו נגיש ללא דפדפן, והטענות מוגבלות לכותרת ולסניפט: שם טכני, סוג Basic, המטרה וארבעת המאפיינים שבסניפט. הסניפט אינו מציג Release Status (בניגוד לעמודי I_Equipment ו-I_FunctionalLocation שבסניפט שלהם מופיע 'Release Status Released'), ולכן סטטוס השחרור לא נטען כאן. הסניפט אינו נוקב ב-STPO; הקישור תצוגה↔טבלה נשען על data/cds-map.ts בלבד, בעקביות עם רשומת table:STPO. השדות והאסוציאציות ברשומת ההעשרה (_BillOfMaterial‏, _Component‏, _MaterialAssignment‏, BillOfMaterialItemNodeNumber) לא אומתו מול מקור רשמי; חיבור ה-MCP למערכת חיה נכשל בסשן. אובייקטים שכנים שנראו בחיפוש ואינם התצוגה הזו: עמוד What's New in SAP S/4HANA Cloud 2302.1 'Objects Released for Developer Extensibility in BOM Management' (loio 6e186b7b, Public Cloud) עוסק באובייקטים ששוחררו להרחבה בניהול BOM, ושמות האובייקטים לא שוחזרו מהסניפט; I_BillOfMaterialItemDEX_3 ('Data Extraction for Bill of Material Item', Public Cloud 2608 Latest, loio 60aee780); חיפוש בשמות אלה במוצר On-Premise לא החזיר נושא VDM. עמוד ה-What's New ל-2025 'New and Enhanced CDS Views for Bill Of Material Management' (loio c4aa65d5, 2025.000) ועמוד 2023 'CDS Views: Enabled Data Extraction in BOM Management' (loio bb73931b, 2023.000) אינם נוקבים ב-I_BillOfMaterialItem בסניפט ולכן לא צוטטו. בעמוד ה-VDM של Planned Order Component (2023.latest, loio 9795f2e3) הסניפט מציג רשימת מיפוי שמות (BillOfMaterialItemNumber ל-BillOfMaterialItemNumber_2); שם האסוציאציה _BillOfMaterialItem לא נראה בסניפט ואין בעמוד ראיה על I_BillOfMaterialItem. עמודים רשמיים נוספים שנראו ולא צוטטו: 'Authorization Objects' (מדריך Bill of Material (LO-MD-BOM), loio 0b05c453, 2025.001; בסניפט: 'Display BOM, BOM group, and plant allocation C_STUE_BER (bill of material) C_STUE_WRK (plant)') ו-'Authorizations (PP-BD-BOM)' (loio 1470bd53, ארכוב). אין מזהה Fiori ל-BOM ביקום הפרויקט (F1813 Maintain Bill of Material אינה ב-data/fiori/apps.ts) ולכן אין xref ל-Fiori. cds:I_BillOfMaterialItemAssgmt לא נוסף כ-xref: data/cds-map.ts ממפה אותה ל-MAPL ואילו data/cds-enrichment.ts מציב אותה מעל MAST, ורשומת table:MAST מציינת שחיפוש רשמי בשם זה (2026-09-07) לא החזיר נושא VDM. מיפוי הפרויקט: data/cds-map.ts#I_BillOfMaterialItem.",
  },
  {
    id: "cds:I_Routing",
    aliases: ["I_ROUTING"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Bill Of Operations Change State | Virtual Data Model and CDS Views",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/8c9e297fe19b48f29f6310045e66eecc.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE14,
        claim: "עמוד ה-VDM הרשמי לכותרת רשימת הפעולות מעל PLKO (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest, loio 8c9e297f) נוקב בשם הטכני I_MfgBillOfOperationsChgSt‏ (Data Category: Basic, Dimension; Status: Released) ובמטרה 'retrieve header data of the change state (table PLKO) for a manufacturing bill of operations (routing/recipe)'. חיפוש בשם המדויק 'I_Routing' בשירות החיפוש של help.sap.com‏ (2026-09-14, מוצר SAP_S4HANA_ON-PREMISE) החזיר ארבעה עמודי לוקליזציה למלזיה שאינם קשורים, ובמוצר SAP_S4HANA_CLOUD שני עמודי API למחסן; לא אותר עמוד רשמי הנוקב בשם I_Routing, ולכן שם זה נשאר ללא אימות רשמי.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Bill of Operations | Virtual Data Model and CDS Views",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/3b079f8bcba04478808585d5217337c7.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE14,
        claim: "תצוגת הכותרת הראשית של רשימת הפעולות במדריך ה-VDM הרשמי (On-Premise 2023 Latest, loio 3b079f8b) נקראת I_MfgBillOfOperations‏ (Data Category: Basic, Dimension; Status: Released); לפי הסניפט היא שולפת נתוני כותרת מטבלת PLKZ עבור 'the manufacturing bill of operations (routing/ recipe)' ועונה על השאלה אילו רשימות פעולות קיימות. שש שאילתות נוספות בשירות החיפוש (routing CDS view, Virtual Data Model, Bill of Operations, I_RoutingOperation, task list released, ובגרסה 2025.001) החזירו את משפחת I_MfgBillOfOperations* ואת משפחת I_ProductionRouting*DEX בלבד, ולא תצוגה בשם I_Routing.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 SPS04 (PDF), section 4.1.2 CDS Views for Basic Routing Data",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2023.004/en-US/WN_OP2023_SPS04_EN.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 SPS04",
        accessedAt: DATE14,
        claim: "מסמך ה-What's New הרשמי (Document Version 1.0, 2025-08-06; נקרא במלואו כ-PDF, עמודים 18 עד 20) מונה בטבלה 'New CDS Views Released for Basic Routing Data' שלוש עשרה שורות (שנים עשר שמות טכניים שונים; השם I_ProdnRtgInspCharcAssgmtDEX מודפס פעמיים) של תצוגות חדשות ב-Production Engineering, ובהן 'Production Routing Main Header' בשם הטכני I_ProductionRoutingDEX ו-'Production Routing Header' בשם הטכני I_ProductionRoutingHeaderDEX, לצד I_ProdnRoutingSequenceDEX‏, I_ProdnRoutingMatlAssgmtDEX‏ ו-I_ProdnRoutingCompAllocDEX; רכיב יישום PP-VDM (Virtual Data Model in PP), Type: New, Valid as Of: 2023 SPS04, Availability: SAP S/4HANA Cloud Private Edition and SAP S/4HANA. בטקסט המלא של המסמך (100 עמודים) אין אף מופע של השם I_Routing. נושא באותו שם קיים גם ב-What's New 2025 המקוון (loio 0321ee78, versionId 2025.000), וסניפט שלו נוקב באותם שמות (I_ProductionRoutingDEX, I_ProductionRoutingHeaderDEX, PP-VDM) עם Valid as Of: 2025.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה ומיפוי הטבלאות של תצוגות ה-CDS בפרויקט",
        repoRef: "data/cds-enrichment.ts#I_Routing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת ההעשרה מתארת את I_Routing כתצוגת Interface (Composite) מעל PLKO עם מפתח Task List Group + Group Counter, אסוציאציות _RoutingOperation‏, _MaterialAssignment ו-_Plant, וכחלופת ECC: טבלת PLKO עם MAPL וטרנזקציות CA01, CA02, CA03; מיפוי הפרויקט (data/cds-map.ts#I_Routing) מקשר אותה ל-PLKO במודול PP-PI. הרשומה מסומנת 'verified', אך שני המקורות הרשומים בה הם מחרוזות תבנית (בנוסח 'SAP S/4HANA CDS Views (VDM)' ו-'SAP Help Portal / Routings, Task Lists') ללא כתובת URL, ולא נמצא להן עמוד רשמי הנוקב בשם התצוגה. סוג התצוגה, המפתח, האסוציאציות ודוגמת ה-SELECT הם תוכן מאגר בלבד.",
        verificationLevel: "verification_required",
      },
    ],
    xrefs: ["table:PLKO", "table:PLPO", "table:MAPL", "table:MKAL", "tx:CA01", "tx:CA02", "tx:CA03", "tx:C201", "tx:C203", "fm:BAPI_ROUTING_CREATE", "cds:I_RoutingOperation", "cds:I_ProductionVersion", "cds:I_WorkCenter"],
    lastVerifiedAt: DATE14,
    notes: "לא אותר תיעוד רשמי לתצוגה בשם I_Routing: חיפוש בשם המדויק ובשמות הקשורים (routing, task list, Bill of Operations, Virtual Data Model, What's New, Simplification) בשירות החיפוש של help.sap.com, חיפוש מוגבל לדומיינים הרשמיים, וקריאה מלאה של PDF ה-What's New 2023 SPS04 לא החזירו אף עמוד הנוקב בשם זה; הממצא השלילי תחום לאינדקס החיפוש במועד הבדיקה ואינו קביעה שהתצוגה אינה קיימת במערכת. התיעוד הרשמי מכסה את כותרת רשימת הפעולות בשמות אחרים: I_MfgBillOfOperationsChgSt (מעל PLKO) ו-I_MfgBillOfOperations (מעל PLKZ) במדריך ה-VDM לגרסת 2023 Latest, ומשפחת I_ProductionRouting*DEX (Basic Routing Data, PP-VDM, Valid as Of 2023 SPS04, מופיעה גם ב-What's New 2025). אף אחת מהתצוגות הרשמיות האלה אינה מזהה ביקום הפרויקט, ולכן אינה ב-xrefs ואינה נרשמת כיורש. נתיב ה-Business Accelerator Hub‏ api.sap.com/cdsviews/I_ROUTING החזיר HTTP 200 עם מעטפת התחברות קטנה (הפניית JavaScript ל-OAuth של ה-Hub, כ-660 בייט בבדיקת 2026-09-14), זהה לנתיב הבקרה של תצוגה שאינה קיימת (I_ZZZNOTAVIEW), ולכן אינו ראיה לכאן או לכאן. הסטטוס הנגזר שהאפליקציה מציגה כיום (חדש ב-S/4HANA, מאומת מול נתוני הפרויקט) נשען על הדגל 'verified' ברשומת ההעשרה שמקורותיה הם מחרוזות תבנית; רשומה זו מורידה את הרובד לנדרש אימות נוסף ואינה מציבה סטטוס מחברי. הרשומות הקיימות של PLKO ו-PLPO ב-data/verification/tables.ts ושל טרנזקציות המתכון ב-data/verification/transactions.ts כבר מסמנות את I_Routing ו-I_RoutingOperation כמיפוי מאגר ללא מקור רשמי, בעקביות עם רשומה זו. סניפטי What's New 2022 (CDS Views for Production Engineering, שם נקובות I_WorkCenterTP ו-I_WorkCenterPooledCapacityTP; Objects Released for Developer Extensibility in Production Engineering, שם נקובה I_WorkCenterPooledCapacityTP) ו-What's New 2021 (CDS Views for Production Planning) לא נקבו ב-I_Routing. גוף עמודי help.sap.com לא נקרא (מעטפת JavaScript); הטענות מוגבלות לכותרות ולסניפטים, למעט ה-PDF שנקרא במלואו. לאימות: בדיקה במערכת יעד (SE11 או ADT, כולל בדיקת Release Contract ב-API State) או ב-Hub עם כניסה; אם התצוגה קיימת כתצוגת לקוח, שותף או גרסה מאוחרת, יש לרשום זאת עם המקור.",
  },
  {
    id: "cds:I_RoutingOperation",
    aliases: ["I_ROUTINGOPERATION"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"I_RoutingOperation\", \"Routing Operation Virtual Data Model CDS view\", \"Production Routing Operation\", \"I_ProductionRoutingOperation\", \"PLPO task list operation CDS view\", \"Manufacturing Bill Of Operations PLPO\", \"CDS Views for Basic Routing Data\" (SAP_S4HANA_ON-PREMISE 2023.latest / 2025.000 / 2025.001 + SAP_S4HANA_CLOUD 2608.500); domain-restricted web search on help.sap.com and api.sap.com",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "ממצא שלילי: בשמונה וריאציות חיפוש בשירות החיפוש של help.sap.com (סקופ On-Premise בגרסאות 2023.latest, 2025.000 ו-2025.001 וסקופ Public Cloud 2608.500) ובחיפוש רשת מוגבל ל-help.sap.com ול-api.sap.com, אף רשומה אינה נוקבת בשם I_RoutingOperation בשדה CDS View Name. השאילתה בשם המדויק החזירה חמש רשומות ללא קשר לנושא (Contract Management 1709 FPS01 ונושאי לוקליזציה למלזיה, כולן עם סניפט ריק). התצוגות המתועדות לפעולות של רשימת פעולות או מתכון הן I_MfgBillOfOperationsOperation, I_MfgBOOOperationChangeState ו-I_MfgBOOSubOperationChgSt, ובמשפחת חילוץ הנתונים לניתוב ייצור (What's New 2025, 'CDS Views for Basic Routing Data') I_ProdnRtgSqncOpAssgmtDEX ו-I_ProdnRoutingOpSubordOpDEX. גם קורפוס הספרים במאגר (data/books) אינו מזכיר את השם.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Bill Of Operations Operation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/dac9192d15f04901b3e92f979831f7ed.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "הקשר בלבד (לא אישור לשם I_RoutingOperation): רשומת החיפוש של נושא ה-VDM הרשמי קובעת 'CDS View Name I_MfgBillOfOperationsOperation Data Category Basic, Dimension Status Released', ומטרתה לפי הסניפט: 'With this CDS view you can retrieve operation ... data (table PLAS) for manufacturing bill of operations (routing/recipe)', לשאלה העסקית 'Which operations exist for a manufacturing bill of operations?'. כלומר תצוגת הפעולות המתועדת של רשימת הפעולות או המתכון ב-S/4HANA On-Premise 2025 FPS01 נושאת שם זה, והסניפט מייחס אותה לטבלה PLAS ולא ל-PLPO. אותו loio מפורסם גם בסקופ Public Cloud 2608.500.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Bill of Operations: Suboperation Change State | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/a74c950059aa42ccb8f9ed8dd9462778.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: "הקשר בלבד: נושא ה-VDM 'Manufacturing Bill of Operations: Suboperation Change State' (2023 Latest) הוא רשומת ה-VDM היחידה שעלתה בחיפושים שבוצעו (2026-09-14) שבה סניפט הנושא נוקב בטבלה PLPO במפורש: 'retrieve change state data of the suboperation (routing or recipe) of the manufacturing bill of operations (tables PLPO, PLAS)', לשאלה 'Which change states exist for an suboperation of a manufacturing bill of operations?' [כך במקור]. רשומת החיפוש ב-On-Premise 2023 Latest קובעת: CDS View Name I_MfgBOOSubOperationChgSt, Data Category Composite, Dimension, Status Released; אותו loio מפורסם גם בסקופ Public Cloud 2608.500. השם I_RoutingOperation אינו מופיע גם כאן.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS ומיפוי הטבלאות הקלאסיות בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת ההעשרה מתארת את I_RoutingOperation כתצוגת Interface (Basic) מעל PLPO, עם מפתח 'רשימת פעולות + מספר פעולה', אסוציאציות _Routing ו-_WorkCenter, דוגמת SELECT עם השדות Routing, RoutingOperationInternalID, OperationText ו-WorkCenterInternalID, וחלופת ECC: טבלת PLPO דרך CA02/CA03; מיפוי הפרויקט (data/cds-map.ts) מקשר את התצוגה ל-PLPO במודול PP-PI בשם העברי 'פעולות מסלול / מתכון', ורשומות tx-intel של CA01, CA02, C201 ו-IA01 (data/tx-intel.ts, שדה s4Delta) מציינות שהתצוגות I_Routing ו-I_RoutingOperation מכסות את שכבת ה-VDM של רשימת הפעולות (CA03 מזכירה I_Routing בלבד). רשומת ההעשרה מסומנת verified, אך מקורותיה הם מחרוזות תבנית ללא קישור, ואת השם, השדות והאסוציאציות לא ניתן לאשר ממקור רשמי נגיש.",
        verificationLevel: "verification_required",
        repoRef: "data/cds-enrichment.ts#I_RoutingOperation",
      },
    ],
    status: {
      status: "verification_required",
      he: "תצוגת CDS לפעולות של רשימת פעולות (Routing) או מתכון אב, שהמאגר מציג כתצוגת Interface (Basic) מעל PLPO. בתיעוד SAP הרשמי הנגיש (מדריך Virtual Data Model and CDS Views בגרסאות 2023 Latest ו-2025 FPS01, What's New 2025, סקופ On-Premise ו-Public Cloud) לא אותר נושא הנוקב בשם I_RoutingOperation. תצוגת הפעולות המתועדת לרשימת פעולות או מתכון היא I_MfgBillOfOperationsOperation (Basic, Dimension, Status Released; הסניפט מייחס אותה לטבלה PLAS), לצד תצוגות מצב שינוי (I_MfgBOOOperationChangeState ו-I_MfgBOOSubOperationChgSt, האחרונה על PLPO ו-PLAS לפי הסניפט) ותצוגות DEX לניתוב ייצור. קיום התצוגה, מצב השחרור שלה, שדותיה וה-associations שברשומת ההעשרה דורשים אימות.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לאמת במערכת S/4HANA היעד (ADT או SE11, ואפליקציית View Browser) שהתצוגה I_RoutingOperation קיימת ומהו חוזה השחרור שלה לפני שימוש בקוד מותאם, בדוחות או בהרחבות. לקריאת פעולות של רשימת פעולות או מתכון אב המדריך הרשמי מתעד את I_MfgBillOfOperationsOperation (Status Released), לנתוני מצב שינוי את I_MfgBOOOperationChangeState ו-I_MfgBOOSubOperationChgSt, ולחילוץ נתונים לניתוב ייצור את משפחת ה-DEX (למשל I_ProdnRtgSqncOpAssgmtDEX). אין להציג את I_RoutingOperation כתצוגה משוחררת או מתועדת עד לאימות, ואין להסתמך על דוגמת ה-SELECT ושמות השדות שברשומת ההעשרה ללא בדיקה במערכת.",
    },
    xrefs: ["table:PLPO", "table:PLKO", "table:PLAS", "tx:CA01", "tx:CA02", "tx:CA03", "tx:C201", "tx:C202", "tx:C203", "cds:I_Routing", "cds:I_RoutingOperationComponent", "cds:I_WorkCenter", "fm:CP_DI_OPERATION_READ"],
    lastVerifiedAt: DATE14,
    notes: "לא אותר תיעוד רשמי לשם I_RoutingOperation: שמונה וריאציות חיפוש בשירות החיפוש של help.sap.com (2026-09-14; סקופ On-Premise בגרסאות 2023.latest, 2025.000 ו-2025.001 וסקופ Public Cloud 2608.500) וחיפוש רשת מוגבל ל-help.sap.com ול-api.sap.com לא העלו רשומה שבה CDS View Name הוא השם הזה; קורפוס הספרים במאגר אינו מזכיר אותו. אותה מסקנה חלה על התצוגה האחות I_Routing (הרשומה במאגר לכותרת). המשפחה הרשמית לפעולות של רשימת פעולות או מתכון במדריך ה-VDM נקראת Manufacturing Bill of Operations: I_MfgBillOfOperationsOperation (2025.001, loio dac9192d15f04901b3e92f979831f7ed, Basic, Dimension, Released, טבלה PLAS לפי הסניפט), I_MfgBOOOperationChangeState (2023.latest, loio fdaab9107154461ab2f39d7a7426b6d7; הסניפט מזכיר הרשאת C_ROUT להצגת רשימת פעולות לפי סוג) ו-I_MfgBOOSubOperationChgSt (2023.latest, loio a74c950059aa42ccb8f9ed8dd9462778, טבלאות PLPO ו-PLAS); לראש הרשימה I_MfgBillOfOperations (PLKZ לפי הסניפט) ו-I_MfgBillOfOperationsChgSt (PLKO). אף אחת מהן אינה מזהה ביקום הפרויקט (data/cds-map.ts), ולכן לא ניתן להצביע עליה כיורשת. עמוד ה-What's New 2025 'CDS Views for Basic Routing Data' (2025.000, loio 0321ee78cf3248329069729161d5cb39) מונה תצוגות DEX חדשות ל-Production Engineering (I_ProdnRtgSqncOpAssgmtDEX, I_ProdnRoutingOpSubordOpDEX, I_ProductionRoutingDEX ועוד), ללא I_RoutingOperation. אי-התאמות פנימיות במאגר: data/domain-detail.ts (שורה 306) ו-data/transactions.ts (שורה 103) כותבים 'I_RoutingHeader / I_RoutingOperation' בעוד cds-map ו-cds-enrichment משתמשים ב-I_Routing; רשומת tx-intel של CA03 מזכירה I_Routing בלבד; רשומת ההעשרה מייחסת את התצוגה ל-PLPO בעוד הסניפט הרשמי של תצוגת הפעולות המתועדת נוקב ב-PLAS. עמודי api.sap.com הם מעטפת יישום ללא גוף ולכן לא צוטטו; חיבור ה-MCP למערכת חיה (sc4sap) נכשל בסשן, כך שלא בוצעה בדיקת ADT/SE11. מה חסר לשדרוג: נושא רשמי ב-help.sap.com שבו CDS View Name הוא I_RoutingOperation, עמוד cdsviews ב-api.sap.com שנקרא בפועל, או בדיקה חיה במערכת היעד. גוף נושאי ה-Help הוא מעטפת JavaScript; כל הציטוטים לקוחים מכותרות ומסניפטים של שירות החיפוש בלבד.",
  },
  {
    id: "cds:I_WorkCenter",
    aliases: ["I_WORKCENTER"],
    evidence: [
      WORKCENTER_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Basic Work Center Data | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/21cd2fa6d9dd4855a02f7edc83dcfe22.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE14,
        claim: "עמוד ה-What's New לגרסת 2025 (2025.000, loio 21cd2fa6d9dd4855a02f7edc83dcfe22) מונה את I_WorkCenter (שם: Work Center) בטבלת 'CDS Views Changed for Basic Work Center Data' לצד I_WorkCenterCostCenter ו-I_WorkCenterText; בפרטים הטכניים שבסניפט: Type New, ללא לוקליזציה (No localization), Scope Item לא רלוונטי (Not applicable), ו-Technical Object Name 'CDS View: I_WorkCenter'. הסניפט אינו מפרט אילו שדות השתנו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 SPS04 (PDF, Document Version 1.0, 2025-08-06) | Manufacturing: 4.1.1 CDS Views for Basic Work Center Data",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.004",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2023.004/en-US/WN_OP2023_SPS04_EN.pdf",
        accessedAt: DATE14,
        claim: "מסמך ה-What's New ל-2023 SPS04 (PDF, פרק Manufacturing, סעיף 4.1.1, עמודים 17-18, נקרא בפועל) מונה את I_WorkCenter (Work Center) בטבלה 'CDS Views Changed for Basic Work Center Data', המוגדרת כתצוגות ש'were updated with field additions for Production Engineering under the Basic Work Center Data area'; בפרטים הטכניים של הסעיף: Type New, Technical Object Name כולל 'CDS View: I_WorkCenter', רכיב יישום PP-VDM (Virtual Data Model in PP), זמינות SAP S/4HANA Cloud Private Edition ו-SAP S/4HANA, Valid as Of 2023 SPS04. המסמך אינו מפרט אילו שדות נוספו ל-I_WorkCenter.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט ורשומת ההעשרה של התצוגה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "מיפוי הפרויקט (data/cds-map.ts) מקשר את I_WorkCenter (שם עברי: מרכז עבודה / משאב, מודול PP-PI) לטבלאות CRHD, CRTX, CRCA ו-KAKO. רשומת ההעשרה (data/cds-enrichment.ts#I_WorkCenter) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, מגדירה viewType 'Interface (Composite)', שדה מפתח WorkCenterInternalID, associations ‏_WorkCenterCategory‏, _Plant‏, _CostCenter, דוגמת SELECT עם השדות WorkCenterInternalID, WorkCenter, WorkCenterCategory ו-Plant, ונוקבת בחלופת ECC‏: CRHD+CRTX+CRCA+KAKO עם CR01/CR02/CR03. רשומות transactions.ts ו-domain-detail.ts מפנות אל I_WorkCenter כתצוגת ה-CDS של מרכז העבודה והמשאב.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_WorkCenter",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת CDS מסוג Basic, Dimension במודל הנתונים הווירטואלי (VDM) של SAP S/4HANA, בסטטוס שחרור Released לפי התיעוד הרשמי (Virtual Data Model and CDS Views, On-Premise 2023 Latest). לפי הסניפט התצוגה מספקת את מאפייני מרכז העבודה: סוג, מזהה פנימי, מפעל, מרכז עבודה, קטגוריה, מיקום ושימוש, ודורשת את ההרשאות C_ARPL_WRK ו-C_ARPL_ART. מסמך ה-What's New ל-2023 SPS04 (PDF שנקרא בפועל) מונה אותה בין התצוגות שעודכנו בתוספות שדות תחת Basic Work Center Data (רכיב PP-VDM), ועמוד ה-What's New ל-2025 מונה אותה שוב בטבלת CDS Views Changed של אותו אזור. לא נמצאה הודעת deprecation או החלפה לתצוגה זו בחיפוש בתיעוד הרשמי. המקור הקלאסי לפי מיפוי הפרויקט הוא CRHD עם CRTX, CRCA ו-KAKO (הסניפט הרשמי אינו נוקב בטבלת המקור). התצוגה משותפת לתחזוקת מפעל (מרכז העבודה הראשי והמבצע בהזמנת האחזקה) ולמשאבים בתעשיות תהליכיות, שכן שניהם חולקים את אותו מודל נתונים לפי רשומת CRHD במאגר.",
      edition: "on-premise",
      release: "2023.latest",
      source: WORKCENTER_VDM_2023,
      recommendedAction: "בקוד חדש, בדוחות ובאנליטיקה ב-S/4HANA לקרוא נתוני אב של מרכז עבודה ומשאב דרך I_WorkCenter (תצוגת Basic, Dimension משוחררת) במקום SELECT ישיר מ-CRHD, הן בתחזוקת מפעל והן בייצור ובתעשיות תהליכיות; לטקסטים תלויי שפה להשתמש ב-I_WorkCenterText ולשיוך מרכז עלות וסוג פעילות ב-I_WorkCenterCostCenter. לפני שימוש לאמת במערכת (View Browser או SE11) את רשימת האלמנטים המלאה, שדות המפתח וה-associations, כי התיעוד הפומבי מציג רק את המאפיינים הראשיים והתצוגה עודכנה בתוספות שדות ב-2023 SPS04. לוודא שלמשתמש הקורא יש את ההרשאות C_ARPL_WRK ו-C_ARPL_ART. התצוגה מיועדת לקריאה; ליצירה ולעדכון של מרכזי עבודה קיימים בתיעוד APIs for Manufacturing (2025 FPS01) דפי Create Work Center ו-Read Work Center (נתיב בסניפט: API_WORK_CENTERS) ו-Create Work Center Header (נתיב OData V4 בסניפט: api_work_center), שאינם מצוטטים כראיה ברשומה זו. לתקן את data/cds-enrichment.ts: הערך viewType 'Interface (Composite)' סותר את 'View Type Basic, Dimension' הרשמי.",
    },
    xrefs: ["table:CRHD", "table:CRTX", "table:CRCA", "table:KAKO", "table:CRCO", "cds:I_WorkCenterText", "cds:I_WorkCenterCostCenter", "cds:I_RoutingOperation", "cds:I_ProductionOrderOperation", "tx:CR01", "tx:CR02", "tx:CR03", "tx:CRC1", "tx:CRC2", "tx:CRC3", "tx:IR01", "tx:IR02", "tx:IR03", "fm:CR_WORK_CENTER_READ", "fm:CRAP_WORKCENTER_GET_DETAIL"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ('I_WorkCenter' במערכי On-Premise ו-SAP_S4HANA_CLOUD, 'I_WorkCenter' מוצמד לגרסה 2025.001, 'Work Center Virtual Data Model' מוצמד ל-2025.001, 'CDS Views for Basic Work Center Data', 'I_WorkCenter deprecated successor', ושתי שאילתות להרחבת הסניפט של עמוד ה-VDM), וקריאה בפועל של מסמך ה-What's New ל-2023 SPS04 (PDF, עמודים 17-18). גוף עמוד ה-Help הוא מעטפת JavaScript ולכן כל טענה מוגבלת לכותרת ולסניפט של רשומת החיפוש; רשימת האלמנטים המלאה, שדות המפתח, ה-associations והפרמטרים של התצוגה לא אומתו, וחיבור ה-MCP למערכת חיה נכשל בסשן. הסניפט של עמוד ה-VDM אינו נוקב בטבלת המקור; הקישור ל-CRHD נשען על מיפוי הפרויקט ועל עמוד האחות Work Center by Semantic Key (I_WorkCenterBySemanticKey, loio fdbddc4bc0704188a5ada9af57ebb5ed) שסניפטו נוקב ב-CRHD, ומצוטט ברשומת table:CRHD; CRTX, CRCA ו-KAKO שבמיפוי הפרויקט לא אומתו כמקורות ישירים של התצוגה. עמוד Work Center Text (loio add9ad94e7be47f2822099e9622b94b6, 2023 Latest) מציין בסניפט ש-I_WorkCenterText 'is used as an association in the view Work Center (I_WorkCenter)'; שם ה-association אינו נקוב. ב-On-Premise נושא ה-VDM מאונדקס רק תחת 2023 Latest (2023.latest); חיפוש I_WorkCenter מוצמד ל-2025.001 החזיר רק דפי APIs for Manufacturing (ודפים לא קשורים) ולא את דף ה-VDM, ועמוד ה-What's New 2025 מאונדקס תחת 2025.000; לכן הגרסה ברשומה היא 2023.latest והקיום ב-2025 נסמך על עמוד ה-What's New. אותו loio מופיע במערך SAP S/4HANA Cloud Public Edition בגרסה 2608.500 עם 'Technical Name I_WorkCenter View Type Basic, Dimension' (לא צוטט כראיה, המהדורה ברשומה נשארת On-Premise לפי ברירת המחדל של הפרויקט). מסמך 2023 SPS04 מציין זמינות גם ב-SAP S/4HANA Cloud Private Edition. סתירה מול המאגר: data/cds-enrichment.ts מגדיר viewType 'Interface (Composite)' בעוד המקור הרשמי קובע 'View Type Basic, Dimension'; שדה המפתח WorkCenterInternalID וה-associations ‏_WorkCenterCategory‏, _Plant‏, _CostCenter שברשומת ההעשרה אינם מופיעים בסניפט ונשארים ברמת נדרש אימות. data/cds-map.ts מסווג את התצוגה תחת PP-PI בלבד; ההקשר בתחזוקת מפעל (מרכז עבודה ראשי ומבצע בהזמנת אחזקה, IR01/IR02/IR03) נלקח מרשומת table:CRHD במאגר. I_WorkCenterTP (What's New 2022, Objects Released for Developer Extensibility, אובייקט RAP) ו-I_WorkCenterCapacity_3, I_WorkCenterCapIntvl_4 ושאר התצוגות החדשות שבסעיף 4.1.1 הם אובייקטים נפרדים ואינם התצוגה הזו. אף מקור רשמי אינו מסמן את I_WorkCenter כמוצאת משימוש או מוחלפת, ולכן אין יורש (החיפוש 'I_WorkCenter deprecated successor' החזיר רק דפים שאינם קשורים). אין xref ל-Fiori: Manage Work Centers (F6175) שמופיע בעמוד ההגירה Work center/Resource אינו קיים ב-data/fiori/apps.ts, ו-Manage Work Center Capacity (F3289) הקיים במאגר לא אומת כקשור לתצוגה. cds:I_WorkCenterBySemanticKey אינה קיימת ביקום הרשומות ולכן מוזכרת בטקסט בלבד. api.sap.com לא צוטט (מעטפת יישום ללא מפתח API). ביקורת עצמאית 2026-09-14: שלושת ה-URL מחזירים HTTP 200 (ה-PDF הורד ונקרא), ה-loio, הכותרות והגרסאות שוחזרו מרשומות שירות החיפוש, וכל המחרוזות המצוטטות נמצאו בתקצירים ובעמודי ה-PDF.",
  },
  {
    id: "cds:I_ProductionOrderItem",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Item | Virtual Data Model and CDS Views",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/82b728664a284a1796811c87221ae0e5.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE14,
        claim: "עמוד ה-VDM הרשמי (מדריך Virtual Data Model and CDS Views, On-Premise 2023 Latest, loio 82b728664a284a1796811c87221ae0e5): 'Production Order Item CDS View Name I_ProductionOrderItem', 'Analytical Data Category Fact', 'This view represents the SAP object type ProductionOrder (BusinessObject)'. מטרת התצוגה כלשונה: 'This CDS view retrieves production order item data (table AFPO)', והיא משיבה על 'Which items exist for a production order?' ו-'Which product belongs to a production order item?'. הסניפט מונה בין השדות החשובים ProductionOrder‏ (Production Order), ProductionOrderItem‏ (Production Order Item) ו-ProductionOrderType, וקובע 'Deltas are determined automatically by change data capture'.",
        verificationLevel: "sap_official_verified",
      },
      DISCRETE_MFG_CDS_WN2025_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "API_PRODUCTION_ORDERS - A_ProductionOrderItem: Read | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/93b5355889729344e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "תיעוד APIs for Manufacturing לגרסת 2025 FPS01 (loio 93b5355889729344e10000000a4450e5) מתאר את ישות ה-OData‏ A_ProductionOrderItem של השירות API_PRODUCTION_ORDERS: 'Item node that contains the production order item fields. To read production order items, you use the http method GET', עם דוגמה 'GET <host>/sap/opu/odata/sap/API_PRODUCTION_ORDERS/A_ProductionOrderItem' ושדות שהסניפט מונה: Unloading point‏, QuantityDistributionKey‏ (MRP distribution key), StockSegment ו-Batch. זהו אובייקט אינטגרציה נפרד מתצוגת ה-CDS‏ I_ProductionOrderItem; הרשומה מצוטטת כחלופת הקריאה החיצונית לפריט הזמנת ייצור, ולא כראיה למבנה התצוגה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת ההעשרה מתארת תצוגת Interface (Basic) לפריט הזמנת ייצור מעל AFPO, עם שדה מפתח 'ManufacturingOrder + ManufacturingOrderItem', אסוציאציות _ManufacturingOrder‏, _Material ו-_Plant, דוגמת SELECT על השדות ManufacturingOrder‏, ManufacturingOrderItem‏, Material ו-MfgOrderPlannedTotalQty, וחלופת ECC של הטבלה AFPO דרך CO02/CO03. הרשומה מסומנת 'verified' עם מחרוזות מקור תבניתיות ללא קישור; שמות השדות שברשומה אינם מופיעים בסניפט הרשמי, שמונה ProductionOrder‏, ProductionOrderItem ו-ProductionOrderType, ולכן שדה המפתח, האסוציאציות ודוגמת ה-ABAP נשארים לאימות במערכת (SE11/ADT).",
        verificationLevel: "verification_required",
        repoRef: "data/cds-enrichment.ts#I_ProductionOrderItem",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת VDM של S/4HANA לפריט הזמנת ייצור בדידה (תחום Discrete Manufacturing; רכיב היישום ברשומת ה-What's New הוא Virtual Data Model in PP) מעל הטבלה AFPO, בקטגוריה אנליטית Fact. רשומה כ-'Type New' ב-What's New של SAP S/4HANA 2025 תחת 'New CDS Views Released for Discrete Manufacturing', בזמינות SAP S/4HANA ו-SAP S/4HANA Cloud Private Edition. בפרויקט היא ממופה כתצוגת S/4HANA שחלופת ה-ECC שלה היא קריאה ישירה מהטבלה AFPO.",
      edition: "on-premise",
      release: "2025.000",
      source: DISCRETE_MFG_CDS_WN2025_ITEM,
      recommendedAction: "בקוד מותאם ובדוחות ב-S/4HANA לקרוא נתוני פריט של הזמנות ייצור בדידות (המוצר של הפריט, סטטוס אספקה מלאה וסובלנויות אספקה, כלשון שאלות העמוד הרשמי) דרך I_ProductionOrderItem במקום SELECT ישיר מ-AFPO, ולוודא במערכת (SE11/ADT) את רשימת השדות, שדה המפתח והאסוציאציות לפני שימוש: גוף העמוד הרשמי אינו נשלף, והסניפט מונה ProductionOrder‏, ProductionOrderItem ו-ProductionOrderType ולא את שמות השדות שברשומת הפרויקט (ManufacturingOrder‏, ManufacturingOrderItem‏, MfgOrderPlannedTotalQty). לאינטגרציה חיצונית לפריט להעדיף את ישות A_ProductionOrderItem של API_PRODUCTION_ORDERS (או את הדור השני API_PRODUCTION_ORDER_2_SRV שמופיע בעמודי ה-Read/Create של אותו מדריך) על פני קריאה מהתצוגה. להזמנות תהליך (תעשיות תהליכיות, PP-PI) לא להניח שהתצוגה מכסה אותן: החיפוש הרשמי לא העלה עמוד VDM ייעודי לפריט הזמנת תהליך, והתצוגה I_ManufacturingOrderItem (Manufacturing Order Item, מעל AFPO לפי הסניפט הרשמי) מתועדת בנפרד ברשומת table:AFPO; האם היא מכסה הזמנות תהליך נשאר לאימות במערכת. במערכות לפני S/4HANA 2025 לבדוק את זמינות התצוגה, כי עמוד ה-VDM מופיע גם בסט התיעוד 2023 Latest אך ה-What's New רושם אותה כחדשה ב-2025.",
    },
    xrefs: ["table:AFPO", "table:AUFK", "table:AFKO", "cds:I_ProductionOrder", "cds:I_ProductionOrderComponent", "cds:I_ProductionOrderOperation", "cds:I_ProductionOrderConfirmation", "tx:CO01", "tx:CO02", "tx:CO03", "tx:COOIS", "fiori:F2336", "fm:CO_ZF_ORDER_ITEM_READ"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: שש שאילתות ב-scripts/sap-help-search.mjs ('I_ProductionOrderItem', 'Production Order Item CDS view', 'Production Order Item Virtual Data Model', 'I_ProductionOrder CDS view', וכן 'I_ProductionOrderItem' מוצמד לסטים 2025.001 ו-2022.latest ולמוצר SAP_S4HANA_CLOUD) וחיפוש רשת מוגבל לדומיינים הרשמיים (שלא העלה רשומה טובה יותר); loio ו-versionId הועתקו מרשומות החיפוש. גוף עמודי ה-Help לא נקרא (מעטפת JavaScript), ולכן רשימת השדות המלאה, שדה המפתח, האסוציאציות והאנוטציות נשארים לאימות במערכת SAP חיה או ב-ADT (חיבור sc4sap נכשל בסשן). הקשר גרסה: ה-What's New של 2025 רושם את התצוגה כ-New, אך עמוד ה-VDM שלה (אותו loio) מופיע בסט התיעוד 2023 Latest (פורסם 2026-08-05) ואינו מוחזר בסט 2022 Latest (0 תוצאות) ולא כעמוד VDM ייעודי בסט 2025.001 (שם הוחזרו רק ישויות ה-API ו-Serial Number of Production Order Item, I_ProdnOrderItemSerialNumber); מועד השחרור הראשון לפני 2025 אינו מוכרע, והסטטוס נצמד לרשומת ה-What's New, כמו ברשומת האח cds:I_ProductionOrder. אותו עמוד VDM מפורסם גם ל-SAP S/4HANA Cloud Public Edition (סט 2608.500, loio זהה), ולכן התצוגה קיימת בשתי המהדורות; הרשומה כאן היא On-Premise. הבחנת PP מול PP-PI: המקור הרשמי משייך את התצוגה ל-Discrete Manufacturing, בעוד data/cds-map.ts מתייג אותה במודול 'PP-PI' (עם מיפוי נכון לטבלה AFPO); התיוג במאגר דורש תיקון, ולא נמצא עמוד VDM רשמי לפריט הזמנת תהליך. ראיית ה-API (A_ProductionOrderItem) היא אובייקט OData נפרד ואינה מעידה על מבנה התצוגה; ישות I_ProdnOrderItemSerialNumber (2025.001, loio 1fc2e4f313d74a2e98d34d47da5f6954, שדות ProductionOrder / ProductionOrderItem / SerialNumber) נצפתה ולא צוטטה כראיה כי אינה ביקום ה-xrefs. היישום Manage Production Orders (F2336) מקושר ב-data/fiori/apps.ts לתצוגת הכותרת I_ProductionOrder ולא לתצוגת הפריט; ה-xref כאן נובע מקרבת הכותרת והפריט, כברשומת האח cds:I_ProductionOrder, ולא אומת מול מקור רשמי; fm:CO_ZF_ORDER_ITEM_READ מקושר מכוח רשומת הבלופרינט PM:AFPO ולא ממקור רשמי. לא נטען SAP Note או פריט פישוט לתצוגה עצמה; סניפט עמוד ה-What's New מפנה ל-SAP Business Data Cloud בלי מספר הערה, ולכן לא נרשם sapNote. רשומת ה-What's New מוגדרת כקבוע משותף (DISCRETE_MFG_CDS_WN2025_ITEM) כך שה-status.source הוא אותו אובייקט של evidence[1], כברשומת האח.",
  },
  {
    id: "cds:I_ProductionOrderOperation",
    evidence: [
      PRODORDER_OPERATION_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Discrete Manufacturing | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/4d82c97578ab4e33be28f60a2163a4c6.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE14,
        claim: "עמוד ה-What's New של SAP S/4HANA 2025 ('New CDS views were released for Production Operations under the Discrete Manufacturing area') מונה בטבלת התצוגות את השורה 'Production Order Operation I_ProductionOrderOperation_2 Production Order Operation', לצד I_ProductionOrderOperationVH, I_ProdnOrderOperationCapacity, I_ProductionOrderSequence, I_ProductionOrderItem ו-I_ProductionOrder. רכיב היישום לפי הסניפט: 'PP-VDM (Virtual Data Model in PP)', זמינות: 'SAP S/4HANA Cloud Private Edition and SAP S/4HANA'. השם I_ProductionOrderOperation ללא הסיומת _2 אינו מופיע ברשומת החיפוש של עמוד זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Operation - Value Help | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/f46968ff7d6f4d98899e67b47c21cdc8.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: "עמוד תצוגת עזרת הערכים I_ProductionOrderOperationVH ('This view provides value help for order operations', 'This view should be used for value help purposes only' כלשון הסניפט) מפנה לתצוגת הנתונים העסקיים המלאה בשם המדויק: 'If you intend to select the entire business data, use the view I_ProductionOrderOperation_2 instead'. כלומר גם ההפניה הרשמית מתצוגת עזרת הערכים מכוונת לגרסה _2 ולא לשם שהמאגר מחזיק.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manufacturing Order Operation | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/afa5a1dc1d81424784b89e079cec0b48.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: "לצד תצוגת הזמנת הייצור קיים עמוד VDM רשמי נפרד לפעולת הזמנת ייצור כללית (Manufacturing Order): 'CDS View Name I_ManufacturingOrderOperation', 'Analytical Data Category Dimension', 'With this CDS view, you can retrieve manufacturing order operation data', עם שאלות עסקיות כגון 'Which manufacturing order operations are externally processed?' ו-'What are the earliest and latest scheduled start and end dates of a manufacturing order operation?'. הסניפט של אותו עמוד מציין גם '(tables AFVC, AFVV, AFVU) by internal key' ו-'Constraints Note At least one element of this CDS view was deprecated'. הסניפט אינו קובע אילו קטגוריות הזמנה (ייצור בדיד, הזמנת תהליך) התצוגה מכסה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת ההעשרה מתארת את I_ProductionOrderOperation כתצוגת Interface (Basic) מעל AFVC ו-AFFL, עם מפתח ManufacturingOrder + ManufacturingOrderOperation, אסוציאציות _ManufacturingOrder ו-_WorkCenter, דוגמת SELECT עם השדות ManufacturingOrder, ManufacturingOrderOperation ו-WorkCenterInternalID, וחלופת ECC של הטבלאות AFVC+AFFL דרך CO02/CO03. הרשומה מסומנת 'verified' עם מחרוזות מקור תבניתיות ללא קישור. שלושה פרטים בה אינם תואמים את הסניפט הרשמי של התצוגה המתועדת: השם (הרשמי הוא I_ProductionOrderOperation_2), הטבלאות (הרשמי מונה AFVC, AFVV, AFVU ולא AFFL) ושמות השדות (הרשמי מונה ProductionOrder ו-ProductionOrderOperation ולא ManufacturingOrder). לכן פרטי השדות והאסוציאציות נשארים לאימות במערכת.",
        verificationLevel: "verification_required",
        repoRef: "data/cds-enrichment.ts#I_ProductionOrderOperation",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "המיפוי מקשר את השם I_ProductionOrderOperation לטבלאות AFVC ו-AFFL ומתייג אותו במודול 'PP-PI' (תעשיות תהליכיות), ללא תצוגת צריכה וללא יישום Fiori. המקורות הרשמיים משייכים את התצוגה המתועדת לתחום Discrete Manufacturing, ואת AFFL לתצוגת הרצף I_ProductionOrderSequence, ולכן תיוג המודול ומיפוי AFFL במאגר דורשים תיקון.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_ProductionOrderOperation",
      },
    ],
    status: {
      status: "verification_required",
      he: "פעולת הזמנת ייצור ברובד ה-VDM של S/4HANA, מעל טבלאות הפעולות AFVC (ולפי המקור הרשמי גם AFVV ו-AFVU). תיעוד SAP Help אינו נוקב בתצוגה בשם I_ProductionOrderOperation: התצוגה המתועדת לפעולת הזמנת ייצור בדידה היא I_ProductionOrderOperation_2 (Analytical Data Category Fact, רשומה כ-New ב-What's New של 2025 תחת Discrete Manufacturing, רכיב יישום PP-VDM), תצוגת עזרת הערכים I_ProductionOrderOperationVH מפנה אליה במפורש, ולפעולות הזמנה כללית מתועדת I_ManufacturingOrderOperation. קיומה של תצוגה בשם המדויק שהמאגר מחזיק, סטטוס השחרור שלה ויחסה לגרסה _2 (קודמת, פנימית או שם שגוי במאגר) לא נמצאו באף רשומה רשמית ודורשים אימות במערכת.",
      edition: "on-premise",
      release: "2023.latest",
      source: PRODORDER_OPERATION_VDM_2023,
      recommendedAction: "לפני שימוש בשם I_ProductionOrderOperation בקוד Z, בתצוגת CDS מותאמת, ב-Custom Analytical Query או במסמך אפיון: לאמת במערכת S/4HANA (SE11 או ADT, ויישום View Browser) האם תצוגה בשם זה קיימת ומה סטטוס השחרור שלה. לקריאת פעולות של הזמנות ייצור בדידות (מרכז עבודה, עיבוד חיצוני, מפתחות פנימיים) להעדיף את התצוגה המתועדת I_ProductionOrderOperation_2 בהתאם להפניה הרשמית מתצוגת עזרת הערכים; לצרכי דוחות על פעולות הזמנה כללית לבדוק את I_ManufacturingOrderOperation (שים לב: לפי הסניפט הרשמי לפחות רכיב אחד בתצוגה זו הוצא משימוש, ולכן יש לבדוק את רשימת הרכיבים שהוצאו משימוש לפני שימוש). להזמנות תהליך (תעשיות תהליכיות) לא להניח כיסוי: המקורות הרשמיים משייכים את התצוגה ל-Discrete Manufacturing, והכיסוי של הזמנות תהליך נשאר לאימות. את שמות השדות, המפתח והאסוציאציות שברשומת ההעשרה (ManufacturingOrder, _WorkCenter) לא להעתיק כמות שהם, כי הסניפט הרשמי מונה ProductionOrder ו-ProductionOrderOperation; לאמת מול ה-DDL בפועל. ב-ECC אין תצוגת VDM מקבילה: המקור הוא AFVC (ו-AFVV) בקריאה ישירה או דרך CO03/COOIS.",
    },
    xrefs: ["table:AFVC", "table:AFFL", "table:AFKO", "table:AUFK", "table:CRHD", "cds:I_ProductionOrder", "cds:I_ProductionOrderItem", "cds:I_ProductionOrderComponent", "cds:I_ProductionOrderConfirmation", "cds:I_WorkCenter", "cds:I_RoutingOperation", "tx:CO02", "tx:CO03", "tx:COOIS", "tx:CO11N", "fm:CO_ZF_OPERATIONS_READ", "fiori:F2336"],
    lastVerifiedAt: DATE14,
    notes: "אומת מרשומות חיפוש רשמיות של help.sap.com בלבד (כותרת, deliverable, גרסה, loio, סניפט); גוף עמודי ה-Help אינו נשלף (מעטפת JavaScript), ולכן רשימת השדות המלאה, המפתח, האסוציאציות וחוזה השחרור נשארים לאימות במערכת SAP חיה או ב-ADT. הממצא המרכזי: אף רשומה רשמית (מספר שאילתות ממוקדות בסט On-Premise ואחת בסט Public Cloud 2608) אינה נוקבת בשם I_ProductionOrderOperation ללא סיומת; השם המתועד הוא I_ProductionOrderOperation_2 (אותו loio 60ade555aa3742b58cf83828022b6eac מפורסם גם לסט SAP S/4HANA Cloud Public Edition 2608.500). לא נמצא מקור רשמי שקובע שגרסה 1 הוצאה משימוש או הוחלפה, ולכן לא נרשם סטטוס 'הוחלף' ולא successor; הסיומת _2 לבדה אינה ראיה. הקשר גרסה: ה-What's New של 2025 רושם את _2 כ-New, אך עמוד ה-VDM שלה מופיע בסט 2023 Latest, וה-What's New של 2023 'CDS Views for Production Operations' (loio 479d02806f8947a7973590dc8c7d819a, Type New, רכיבי יישום PP-PI-POR, PP-SFC ו-PP-VDM, scope items BJ5 ו-BJ8) אינו מונה שמות תצוגות בסניפט, כך שמועד השחרור הראשון אינו מוכרע. פערים במאגר: data/cds-map.ts מתייג את התצוגה במודול 'PP-PI' בעוד המקור הרשמי משייך אותה ל-Discrete Manufacturing; המיפוי ל-AFFL אינו תואם את הסניפט הרשמי, שמונה AFVC, AFVV, AFVU לפעולה ואת AFFL לתצוגת הרצף 'Production Order Sequence' I_ProductionOrderSequence ('retrieves production order sequence data by semantic key (table AFFL)', loio 7b47cbb4384c497b993c670138aec9c7). AFVV ו-AFVU אינן חלק מיקום המזהים של הפרויקט ולכן אינן ב-xrefs. ההעשרה (data/cds-enrichment.ts) משתמשת בשמות שדות של Manufacturing Order (ManufacturingOrder, ManufacturingOrderOperation) שאינם בסניפט של התצוגה המתועדת; ייתכן שהם לקוחים מתצוגת I_ManufacturingOrderOperation, שעמודה הרשמי מתעד תצוגת Dimension נפרדת. עמוד ה-What's New 2025 'CDS Views for Discrete and Process Manufacturing' (loio d179056c52d24117a2fe1cbaf7025969, 2025.000) מונה בסניפט את I_Order ו-I_ManufacturingOrderStatus תחת 'CDS Views Changed for Discrete and Process Manufacturing' ואינו נוקב בתצוגת פעולה או שלב (phase), כך ששאלת הכיסוי של הזמנות תהליך נשארת פתוחה. הקישור ליישום Manage Production Orders (F2336) הוא מנתוני הפרויקט בלבד ולא אומת מול מקור רשמי. הסטטוס הנגזר הקודם (חדש ב-S/4HANA לפי רשומת ההעשרה המסומנת verified) הוחלף בסטטוס מחובר 'נדרש אימות נוסף' כי לא נמצא מקור רשמי לשם המדויק. לא נטען SAP Note, KBA או פריט פישוט לתצוגה. המהדורה שנרשמה היא On-Premise לפי מזהה המוצר בשירות החיפוש; ה-What's New של 2025 מכסה גם Private Edition. ביקורת עצמאית 2026-09-14: ארבעת ה-URL מחזירים HTTP 200, ה-loio, הכותרות והגרסאות שוחזרו מרשומות שירות החיפוש, וכל המחרוזות המצוטטות נמצאו בתקצירים.",
  },
  {
    id: "cds:I_ProductionOrderComponent",
    aliases: ["I_PRODUCTIONORDERCOMPONENT"],
    status: {
      status: "s4_native",
      he: "תצוגת VDM של S/4HANA לרכיבי הזמנת ייצור בדידה (תחום Discrete Manufacturing, רכיב יישום PP-VDM) מעל פריטי ההזמנה בטבלה RESB. רשומה כ-'Type New' ב-What's New של SAP S/4HANA 2025 ('New CDS views were released for Production Operations under the Discrete Manufacturing area'; 'The following table summarizes the new CDS views that were released'), לצד I_ProductionOrder, I_ProductionOrderStdVH ו-I_ProductionOrderConfirmation. עמוד ה-VDM הרשמי מגדיר אותה 'Analytical Data Category Fact' ומייצג את סוג האובייקט ProductionOrder (BusinessObject). בפרויקט היא ממופה כתצוגת S/4HANA שחלופת ה-ECC שלה היא קריאה ישירה מ-RESB.",
      edition: "on-premise",
      release: "2025.000",
      source: DISCRETE_MFG_CDS_WN2025_PRODORDERCOMP,
      recommendedAction: "בקוד מותאם ובדוחות ב-S/4HANA לקרוא רכיבי הזמנת ייצור בדידה (פריטי RESB של ההזמנה) דרך I_ProductionOrderComponent במקום SELECT ישיר מ-RESB, ולוודא במערכת (SE11/ADT או View Browser) את רשימת השדות, שדה המפתח והאסוציאציות לפני שימוש: גוף העמוד הרשמי אינו נשלף, והסניפט קובע שהתצוגה נשלפת 'by semantic key (reservation items, table RESB)', משיבה על 'Which components are assigned to a production order operation?' ומונה כשדות חשובים את Reservation‏, ReservationItem ו-ReservationRecordType; שמות השדות שברשומת הפרויקט (ManufacturingOrder, RequiredQuantity, WithdrawnQuantity) אינם מופיעים בסניפט. להזמנות תהליך (תעשיות תהליכיות, PP-PI) לא להניח שהתצוגה מכסה אותן: המקור הרשמי משייך אותה ל-Discrete Manufacturing, ולרכיבים גנריים של הזמנות ייצור ותהליך יש להשוות מול I_MfgOrderComponent. במערכות לפני S/4HANA 2025 לבדוק את זמינות התצוגה, כי עמוד ה-VDM מופיע בסט התיעוד 2023 Latest אך ה-What's New רושם אותה כחדשה ב-2025.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Component | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/fdbbfc2cda1e4c12bff09946e22ed8cb.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: "עמוד ה-VDM הרשמי (loio fdbbfc2cda1e4c12bff09946e22ed8cb, סט 2023 Latest, פורסם 2026-08-05) קובע: 'CDS View Name I_ProductionOrderComponent', 'Analytical Data Category Fact', 'Represented Objects This view represents the SAP object type ProductionOrder (BusinessObject)'. מטרת התצוגה כלשונה: 'This CDS view retrieves production order component data by semantic key (reservation items, table RESB)', והיא 'provides the data to answer the following business questions: Which components are assigned to a production order operation?'. תחת 'Structure Important Fields' הסניפט מונה את השדות Reservation‏, ReservationItem ו-ReservationRecordType, ומכיל קטע נקטע 'ProductionOrderOperation Production Order Ope[ration]'; הוא אינו מציין Release Status, שדה מפתח מוצהר, רשימת שדות מלאה או אסוציאציות.",
        verificationLevel: "sap_official_verified",
      },
      DISCRETE_MFG_CDS_WN2025_PRODORDERCOMP,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Component | Virtual Data Model and CDS Views (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/fdbbfc2cda1e4c12bff09946e22ed8cb.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE14,
        claim: "אותו עמוד VDM (loio fdbbfc2cda1e4c12bff09946e22ed8cb) מפורסם גם בסט התיעוד של SAP S/4HANA Cloud Public Edition 2608 (פורסם 2026-09-10), והסניפט שלו קובע 'Production Order Component CDS View Name I_ProductionOrderComponent Analytical Data Category'. כלומר התצוגה מתועדת בשתי המהדורות; פרטי המהדורה הציבורית אינם נבדלים בסניפט מגרסת ה-On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה ומפת ה-CDS של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "data/cds-map.ts ממפה את I_ProductionOrderComponent ל-'רכיבי פקודת ייצור (הזמנות מלאי)' מעל הטבלה RESB במודול 'PP-PI'; data/cds-enrichment.ts מתאר אותה כ-'Interface (Basic)' עם שדה מפתח 'ManufacturingOrder + Reservation Item', אסוציאציות _ManufacturingOrder/_Material/_Plant, דוגמת ABAP עם השדות RequiredQuantity ו-WithdrawnQuantity, וחלופת ECC של RESB דרך CO02/CO03/CO24. הרשומה מסומנת 'verified' עם מחרוזות מקור תבניתיות ללא קישור; שדה המפתח, האסוציאציות ושמות השדות אינם מופיעים בסניפט הרשמי; השדות החשובים שהסניפט הרשמי כן מונה (Reservation‏, ReservationItem‏, ReservationRecordType) שונים מהצהרת המפתח 'ManufacturingOrder + Reservation Item' שברשומת ההעשרה, ולכן פרטים אלה נשארים לאימות במערכת. מיפוי הטבלה RESB תואם לסניפט הרשמי ('reservation items, table RESB').",
        verificationLevel: "verification_required",
        repoRef: "data/cds-enrichment.ts#I_ProductionOrderComponent",
      },
    ],
    xrefs: ["table:RESB", "table:AFKO", "table:AUFK", "cds:I_ProductionOrder", "cds:I_ProductionOrderItem", "cds:I_ProductionOrderOperation", "cds:I_MfgOrderComponent", "tx:CO02", "tx:CO03", "tx:CO24", "tx:COOIS"],
    lastVerifiedAt: DATE14,
    notes: "אומת מרשומות חיפוש רשמיות של help.sap.com (כותרת, deliverable, גרסה, loio, סניפט); גוף עמודי ה-Help אינו נשלף, ולכן רשימת השדות המלאה, שדה המפתח, האסוציאציות ומעמד השחרור (Release Status / release contract) נשארים לאימות במערכת SAP חיה או ב-ADT. הקשר גרסה: ה-What's New של 2025 רושם את התצוגה כ-New, אך עמוד ה-VDM שלה (אותו loio) מופיע גם בסט התיעוד 2023 Latest (פורסם מחדש 2026-08-05) ולא עלה בחיפוש בסט 2022 Latest (ממצא שלילי מוגבל לחיפוש), כך שמועד השחרור הראשון לפני 2025 אינו מוכרע; הסטטוס נצמד לרשומת ה-What's New כמו ברשומת I_ProductionOrder. הבחנת PP מול PP-PI: המקור הרשמי משייך את התצוגה ל-Discrete Manufacturing (הזמנות ייצור בדידות), בעוד data/cds-map.ts מתייג אותה במודול 'PP-PI'; התיוג במאגר דורש תיקון, ולא נמצא עמוד VDM רשמי ייעודי לרכיבי הזמנת תהליך. בסט What's New 2025 קיים גם עמוד נפרד 'CDS Views for Discrete and Process Manufacturing' (loio d179056c52d24117a2fe1cbaf7025969, PP-VDM) שהסניפט שלו מונה I_Order‏, I_ProductionSchedgProfileVH‏, I_ManufacturingOrderStatus‏, I_MfgOrderWithStatus ו-I_MfgOrderProdnSupervisorStdVH, ולא את I_ProductionOrderComponent (ממצא מוגבל לסניפט). סתירה פנימית במאגר (audit/s4-enrichment/BASELINE.md): I_MfgOrderComponent ממופה על RESB עם AFFH נוסף בהעשרה, ורשומת ההעשרה שלה מציגה אותה כמקבילה גנרית (ייצור בדיד ותהליכי) ל-I_ProductionOrderComponent; היחס בין שתי התצוגות לא אומת מול מקור רשמי. אין לבלבל את התצוגה עם ישות ה-OData A_ProductionOrderComponent של השירות API_PRODUCTION_ORDERS (עמוד 'API_PRODUCTION_ORDERS - A_ProductionOrderComponent: Read' במדריך APIs for Manufacturing, 2025 FPS01), שהיא ישות API לקריאת רכיבי הזמנה ב-GET ולא תצוגת VDM; וכן לא עם התצוגה האחות 'Manufacturing Order Operation Component' שעלתה בחיפוש. סעיף חילוץ הנתונים (data extraction ל-SAP Business Data Cloud) בעמוד ה-What's New אינו מפרט האם I_ProductionOrderComponent כלולה בו. לא נטען SAP Note או פריט פישוט לתצוגה. הקישור ליישום Fiori לא נרשם: נתוני הפרויקט אינם קושרים יישום ספציפי לתצוגה זו, ולא אומת כזה מול מקור רשמי.",
  },
  {
    id: "cds:I_Batch",
    aliases: ["I_BATCH"],
    evidence: [
      BATCH_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Batch Management | What's New in SAP S/4HANA 1809",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1809.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/6a8dee318c524e13b62b01bea94a5d09.html?locale=en-US&state=PRODUCTION&version=1809.000",
        accessedAt: DATE14,
        claim: "נושא ה-What's New של S/4HANA 1809 (loio 6a8dee318c524e13b62b01bea94a5d09) קובע: 'Two Core Data Services (CDS) views for Batch Management have now been released', ומונה בסניפט 'Batch I_Batch' עם ההסבר 'You can use them to construct custom views or apps that need to retrieve batch' (הסניפט נקטע). כלומר: I_Batch שוחררה לניהול אצוות (Batch Management) בגרסת 1809 של S/4HANA On-Premise. שם התצוגה השנייה שברשימה אינו מופיע בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch (Successor available) | Virtual Data Model and CDS Views (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/c0c54048d35849128be8e872df5bea6d/e12c475aafa74089bfa01d85ea277f66.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE14,
        claim: "במערך התיעוד של Cloud Public Edition גרסה 2608.500 (loio e12c475aafa74089bfa01d85ea277f66, מסמך שונה מנושא ה-On-Premise) הנושא נושא את הכותרת 'Batch (Successor available)' ומציג 'Technical Name I_Batch View Type Composite', עם ההמלצה: 'We therefore recommend that you switch to the following successor CDS view: I_BatchWithPlant_2: Batch Information with Plant-Specific Data'. הסניפט שומר על אותה הערה: 'The CDS view I_Batch always contains at least one row for each batch, even if the batch has not been assigned to any plant', ומפנה ל-'Batch Distinct (Successor available) (I_BatchDistinct)'. ההיגד תקף למערך Public Cloud בלבד; במערך On-Premise לא נמצאה רשומה מקבילה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט ורשומת ההעשרה של התצוגה",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "המיפוי בפרויקט (data/cds-map.ts#I_Batch) מקשר את I_Batch (אצווה, מודול PP-PI) לטבלאות MCH1 ו-MCHA, נוקב בתצוגת צריכה C_BatchMaster ובאפליקציית Fiori‏ Manage Batches. רשומת ההעשרה (data/cds-enrichment.ts#I_Batch) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור, מגדירה viewType 'Interface (Composite)', מפתח 'Material + Batch (ברמת מפעל: + Plant)', associations ‏_Product‏, _Plant‏, _BatchCharacteristics, ונוקבת בחלופת ECC‏: MCH1/MCHA (ועוד MCHB לנתוני מלאי) עם MSC1N/MSC2N/MSC3N. ערך ה-viewType 'Composite' תואם את 'View Type Composite' הרשמי; ה-associations והשדות שבדוגמת ה-ABAP אינם מופיעים בסניפט הרשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_Batch",
      },
    ],
    status: {
      status: "s4_native",
      he: "תצוגת CDS מסוג Composite במודל הנתונים הווירטואלי (VDM) של SAP S/4HANA, בסטטוס שחרור Released לפי התיעוד הרשמי (Virtual Data Model and CDS Views, On-Premise 2023 Latest), ששוחררה לניהול אצוות (Batch Management) בגרסת 1809 לפי נושא ה-What's New. לפי הסניפט התצוגה מחזירה את האצוות יחד עם שיוכן למפעלים, ומכילה לפחות שורה אחת לכל אצווה גם כשהאצווה לא שויכה לאף מפעל; לשורה אחת בלבד לכל אצווה התיעוד מפנה ל-I_BatchDistinct. ב-ECC אין תצוגת VDM מקבילה; המקור הקלאסי לפי מיפוי הפרויקט הוא MCH1 (רמת חומר) ו-MCHA (רמת מפעל). במערך Cloud Public Edition (2608.500) אותה תצוגה מסומנת 'Successor available' עם המלצה לעבור ל-I_BatchWithPlant_2; במערך On-Premise לא נמצאה רשומה כזו, ולכן הסטטוס כאן נשאר לפי התיעוד המקומי.",
      edition: "on-premise",
      release: "2023.latest",
      source: BATCH_VDM_2023,
      recommendedAction: "לקריאה, לדיווח ולאנליטיקה על נתוני אב אצווה ב-S/4HANA On-Premise (תעשיות תהליכיות: אצוות חומרי גלם ותוצרים, תאריכי ייצור ותפוגה, סטטוס אצווה) להשתמש ב-I_Batch (תצוגת Composite משוחררת) במקום SELECT ישיר מ-MCH1/MCHA, ולזכור שלפי הסניפט היא מכילה לפחות שורה אחת לכל אצווה גם כשהאצווה לא שויכה לאף מפעל, ולכן עשויה להחזיר יותר משורה אחת לאצווה; כשנדרשת שורה אחת לכל אצווה ללא תלות ברמת האצווה להשתמש ב-I_BatchDistinct לפי הפניית התיעוד. את שמות השדות, ה-associations ‏(_Product‏, _Plant‏, _BatchCharacteristics ברשומת ההעשרה) והדוגמה ב-ABAP יש לאמת מול גוף העמוד הרשמי או מול מערכת חיה (View Browser), כי הסניפט אינו מונה אותם. בפיתוח חדש שאמור לרוץ גם ב-Cloud Public Edition, או במערכת On-Premise 2025 ואילך, לבדוק ב-View Browser אם I_Batch כבר מסומנת 'Successor available' ולשקול את I_BatchWithPlant_2 שהתיעוד ה-Cloud ממליץ עליה; לפעולות כתיבה על אצוות לא לעבוד מול התצוגה אלא לבדוק את ה-OData API‏ API_BATCH_SRV, ששמו מופיע בסניפט של הנושא 'Create Batch Text' (APIs for Logistics Cross Topics 2025 FPS01) בדוגמת POST ליצירת טקסט אצווה לאצווה קיימת; היקף הפעולות הנתמכות על ישות Batch עצמה לא אומת ברשומה זו.",
      secondary: ["fiori_alternative_available"],
    },
    xrefs: ["table:MCH1", "table:MCHA", "tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "tx:MSC4N", "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "fm:VB_BATCH_DETAIL_GET", "fiori:F1576", "cds:I_Product", "cds:I_MaterialStock", "enh:exit:SAPLV01Z"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('I_Batch', 'I_Batch Batch CDS view', 'Batch Management CDS views MCH1', 'CDS Views for Batch Management What's New', 'Deprecated and Decommissioned CDS Views I_Batch', 'I_BatchWithPlant_2', 'Batch (Successor available) I_Batch', וכן 'I_Batch' תחת --version 2025.001 ו-2025.000, ובמערך SAP_S4HANA_CLOUD‏ 'I_Batch Batch CDS view'), ורובד Tier-2 מהמאגר. גוף העמוד הרשמי אינו נשלף (מעטפת JavaScript), ולכן כל טענה מוגבלת לכותרת ולסניפט של רשומת החיפוש; רשימת השדות המלאה, ה-associations, הפרמטרים ורשימת ה-Business Objects של התצוגה לא אומתו. ב-On-Premise נושא ה-VDM‏ 'Batch' מאונדקס רק תחת 2023 Latest (2023.latest); חיפוש תחת 2025.001 החזיר נושאי API ‏(APIs for Logistics Cross Topics, APIs for Manufacturing) ונושאי ארכוב, וחיפוש תחת 2025.000 החזיר נושאי לוקליזציה ו-What's New 2025; אף אחד מהם לא החזיר את נושא ה-VDM, ולכן הגרסה ברשומה היא 2023.latest. הבדל בין מערכים: במערך Cloud Public Edition (2608.500) הנושא נקרא 'Batch (Successor available)' (loio e12c475aafa74089bfa01d85ea277f66) וממליץ לעבור ל-I_BatchWithPlant_2, ונושא 'Batch Information with Plant-Specific Data' (loio b0dacd62027e4f92849a6153b34ab367) מצהיר 'This CDS view is intended to replace the CDS view Batch (Successor available) (I_BATCH)'; חיפוש 'I_BatchWithPlant_2' במערך On-Premise לא החזיר אף רשומה רלוונטית, ולכן לא נכתב סטטוס replaced ל-On-Premise ואין יורש; I_BatchWithPlant_2 גם אינה קיימת ביקום המזהים של המאגר. אף רשומה רשמית במערך On-Premise אינה מסמנת את I_Batch כ-deprecated או decommissioned (ממצא מוגבל לחיפוש). המאגר: data/cds-enrichment.ts מגדיר viewType 'Interface (Composite)', בהתאמה ל-'View Type Composite' הרשמי; ה-associations, המפתח והדוגמה ב-ABAP שברשומת ההעשרה אינם מופיעים בסניפט ונשארים ברמת נדרש אימות. מזהה ה-Fiori‏ F1576 הוא מזהה המאגר (data/fiori/apps.ts); רשומת האימות fiori:F1576 מתעדת שהמקורות הרשמיים נוקבים ב-Manage Batches כ-F2462 (alias). API_BATCH_SRV ו-I_BatchDistinct מוזכרים בטקסט בלבד כי אין להם מזהה קנוני ביקום הרשומות. תצוגת הצריכה C_BatchMaster שבמיפוי המאגר לא נמצאה ברשומות החיפוש הרשמיות שנבדקו. ביקורת עצמאית 2026-09-14: שלושת ה-URL מחזירים HTTP 200, ה-loio, הכותרות והגרסאות שוחזרו מרשומות שירות החיפוש, וכל המחרוזות המצוטטות נמצאו בתקצירים.",
  },
  {
    id: "cds:I_MRPMaterial",
    aliases: ["I_MRPMATERIAL"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Master Data | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/c3190f002137401d8937c8fbc905af72.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "חיפוש השם I_MRPMaterial בתיעוד הרשמי (help.sap.com, מערך SAP_S4HANA_ON-PREMISE, 21 תוצאות) מחזיר רק את הישות A_MRPMaterial של שירות ה-OData‏ API_MRP_MATERIALS_SRV_01 ולא תצוגת CDS בשם I_MRPMaterial. רשומת החיפוש (loio c3190f002137401d8937c8fbc905af72, ‏2025 FPS01) קובעת: 'Master Data Technical name: A_MRPMaterial', 'For the A_MRPMaterial entity, you can use every property as a filter in your request', ומונה בין המאפיינים MaterialName, PlantName, MRPAreaText, MRPAreaCategory ו-MaterialType. עמוד האח 'Read Master Data' (loio c28343ecf3924ae8adad97043daf5f61) מדגים קריאה לפי מפתח Material, MRPPlant ו-MRPArea. אותם נושאים קיימים גם במערך SAP_S4HANA_CLOUD (2608.500).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.2.1 S4TWL - Logistic Information System in PP, p. 604",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE14,
        claim: "עמ' 604 של רשימת הפישוט (פריט 9.2.1, נקרא מקובץ ה-PDF) קובע לגבי טבלת LIS‏ S094 (תמונת מצב של תקבולים ודרישות לחומר): 'it is recommended to use the ODATA API \"API_MRP_MATERIALS_SRV_01\" to get the supply & demand and coverage information', ומפנה לעמוד ה-Help‏ 'Material Planning Data - Read' (loio ca111d6ed0004ac088b68f1360cf24fc, גרסה 2022.000). הרשימה אינה נוקבת בשם I_MRPMaterial ואינה מגדירה פריט פישוט לתצוגת CDS זו; ההקשר של MRP Live (פריט 9.5.2, עמ' 651 עד 655) מתועד ברשומת tx:MD01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Product MRP Area | Virtual Data Model and CDS Views",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/aac8ab3626db4020bd4fae921e203515.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE14,
        claim: "תצוגת ה-VDM המתועדת רשמית לפרמטרי ה-MRP של חומר ברמת אזור MRP נקראת I_ProductMRPArea: 'Product MRP Area CDS View Name I_ProductMRPArea Analytical Data Category DIMENSION Status Released', והיא עונה לפי הסניפט על השאלות 'Which control parameters and profiles are assigned to an MRP area of a product?' ו-'Which MRP controller is assigned to an MRP area of a product?', עם שדות MRPType, MRPController, MRPProfile, MRPPlanningCalendar, MRPPlanningCycle, LotSizingProcedure ו-SafetyTimePeriodProfile. לצדה מתועדת 'MRP Area Data for Product' (CDS View Name I_PRODUCTPLANTMRP, loio b4fead8797184f348b28738097c73ba6, שדות Product, MRPArea, Plant). שתי הרשומות אינן נוקבות בשם I_MRPMaterial.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מפת ה-CDS של הפרויקט ורשומת ההעשרה של I_MRPMaterial",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "מפת ה-CDS בפרויקט (data/cds-map.ts) מקשרת את I_MRPMaterial ('נתוני MRP לחומר/אזור', מודול תעשיות תהליכיות) לטבלאות MARC ו-MDMA, לתצוגת הצריכה C_MaterialCoverageNetwork ולאפליקציית Monitor Material Coverage. רשומת ההעשרה (data/cds-enrichment.ts#I_MRPMaterial) מסומנת 'verified' עם מקורות טקסטואליים ללא קישור ('SAP S/4HANA CDS Views (VDM) - I_MRPMaterial', 'SAP Help Portal - MRP Material Data'), מגדירה viewType 'Interface (Composite)', מפתח Product + Plant (+ MRPArea), associations ‏_Product, _Plant, _MRPArea, _MRPController, ונוקבת בחלופת ECC‏: MARC ו-MDMA דרך MM03 (תצוגות MRP 1 עד 4). data/library/pp-knowledge.ts (פרק 13, תכנון דרישות חומר) מונה לצדה גם C_MRPMaterials.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MRPMaterial",
      },
    ],
    xrefs: ["table:MARC", "table:MDMA", "table:MARA", "cds:I_ProductPlant", "tx:MD01", "tx:MD01N", "tx:MD04", "tx:MD07", "tx:MM03", "fiori:F0247A", "fiori:F0251", "fiori:F1339"],
    lastVerifiedAt: DATE14,
    notes: "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('I_MRPMaterial', 'MRP Material Virtual Data Model CDS view', 'I_MRPMaterial CDS View Name MRP Material', 'CDS Views for Material Requirements Planning', 'Product MRP Area CDS View Name', ובמערך SAP_S4HANA_CLOUD‏ 'I_MRPMaterial' ו-'MRP Material CDS View Name'), חיפוש רשת מוגבל ל-help.sap.com, api.sap.com, fioriappslibrary ו-fal.cloud.sap, וקריאת עמ' 604 של רשימת הפישוט 2025 FPS01 מקובץ ה-PDF. ממצא שלילי תחום לחיפוש: אף רשומה רשמית אינה נוקבת בתצוגת CDS בשם I_MRPMaterial; השם היחיד עם גזע זהה בתיעוד הרשמי הוא ישות ה-OData‏ A_MRPMaterial של API_MRP_MATERIALS_SRV_01 (What's New 2022, רכיב PP-FIO-MRP, loio 1af95104924f422bafc83918d12ea75e, 'Valid as Of SAP S/4HANA 2022'). ייתכן שהתצוגה קיימת במערכת כתצוגה לא משוחררת או כתצוגת בסיס של השירות, אך זו השערה שלא ניתן לאמת בלי מערכת חיה או View Browser. לכן לא נכתב סטטוס מוסמך; מנוע הגזירה של האפליקציה ממשיך להציג את הסטטוס הנגזר מ-data/cds-map.ts ו-data/cds-enrichment.ts ברמת 'מאומת מול נתוני הפרויקט'. סתירה פנימית: רשומת ההעשרה מסומנת 'verified' עם מקורות ללא URL, בעוד שהתיעוד הרשמי מתעד לפרמטרי MRP את I_ProductMRPArea ואת I_PRODUCTPLANTMRP (On-Premise 2023 Latest) ואת I_PRODUCTPLANTSUPPLYPLANNING (Cloud Public Edition 2608.500, loio b8fdc52dcd1649f881d82d6ec79319aa, 'What are the current MRP parameters (MRP type, MRP controller, lot sizing procedure)'); הערך perfNotes בהעשרה מפנה ל-F0247, בעוד שהמזהה הרשמי שקיים בדאטהסט הוא F0247A. לא אומתו: viewType, שדות, associations, סטטוס שחרור וגרסת שחרור של I_MRPMaterial; קיום תצוגת הצריכה C_MaterialCoverageNetwork ותצוגת C_MRPMaterials; קשר הביניים בין I_MRPMaterial ל-A_MRPMaterial. ה-xrefs cds:I_ProductPlant ו-fiori:F1339 נרשמו כהקשר: I_ProductPlant היא תצוגת המוצר ברמת מפעל המתועדת רשמית לצד I_PRODUCTPLANTMRP, ו-Schedule MRP Runs (F1339) הוא יישום תזמון ריצות MRP Live שרשומת tx:MD01N מפנה אליו; שניהם ממקורות המאגר ולא מסניפט הנוקב ב-I_MRPMaterial. גוף עמודי ה-Help לא נקרא (מעטפת JavaScript); כל טענה תחומה לכותרת ולתקציר של רשומת החיפוש או לעמוד ה-PDF שנקרא. ביקורת עצמאית 2026-09-14: שלושת ה-URL נפתרים, ה-loio, הכותרות והגרסאות שוחזרו מרשומות שירות החיפוש, כל המחרוזות המצוטטות נמצאו בתקצירים, הציטוט מעמ' 604 שוחזר מקובץ ה-PDF (השם I_MRPMaterial אינו מופיע בו כלל), והממצא השלילי שוחזר בסקופ On-Premise (21 תוצאות) ו-Public Cloud (8 תוצאות).",
  },
  {
    id: "cds:I_MaterialStock",
    aliases: ["I_MATERIALSTOCK"],
    evidence: [
      MATERIAL_STOCK_VDM_2023,
      {
        sourceType: "sap_help",
        sourceTitle: "IAM Objects in Inventory Management | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ec0466f50d294f9aaba6bdbec9e94e2a.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE14,
        claim: "עמוד What's New לגרסת SAP S/4HANA 2022 (ניהול מלאי) מונה את I_MATERIALSTOCK בין 'the following released APIs: CDS View-Entities (DDLS): I_CUSTOMERCOMPANYBYPLANT I_MATERIALDOCUMENTHEADER_2 I_MATERIALDOCUMENTITEM_2 I_MATERIALDOCUMENTITEMTP I_MATERIALDOCUMENTTP I_MATERIALSTOCK', וברשימת 'Interface Views (DDLS) and Behavior Definitions (BDEF)' מופיע הפריט 'DDLS, BDEF Material Stock Calculation (I_MATERIALSTOCK)', לצד 'Material Stock for Periods (I_MATERIALSTOCKTIMESERIES)' ו-'Stock At Key Date In Alternative UoM (I_MATLSTKATKEYDATEINALTUOM)'. הסניפט אינו מפרט את היקף השחרור (Developer Extensibility, Cloud Development) מעבר למילים 'released APIs'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "CDS Views for Inventory | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/78fedffaceff40aa86fa55fd5fa1f4a1.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE14,
        claim: "עמוד What's New 2022 'CDS Views for Inventory' קובע 'Some CDS (Core Data Services) views have been released or changed for Inventory' ומונה: 'Material Stock 2 I_MaterialStock_2 New This view provides the quantity of material for different stock identifying attributes'. הסניפט אינו מציג את I_MaterialStock כמוצאת משימוש ואינו מכריז על I_MaterialStock_2 כיורש שלה; עמוד ה-VDM הנפרד 'Material Stock 2' (2023 Latest, loio 0bb40d9e5cd14a6c8c556bacc8056e02) מתאר את I_MaterialStock_2 עם 'Analytical Data Category Interface Cube'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Stock - Read | APIs for Inventory",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/f68f51a4dc2e46779877a10a301d9138.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: "עמוד ה-API הרשמי (APIs for Inventory, 2025 FPS01) קובע: 'Material Stock - Read Technical name: API_MATERIAL_STOCK This service enables you to retrieve material stock information using the OData protocol', עם הישויות 'Material Master (A_MaterialStock)' ו-'Material Stock (A_MatlStkInAcctMod) Within this entity the stock quantity information is provided in an account model'. דוגמאות הקריאה בעמודים הסמוכים (Operations for Material Stock API, loio dfc5b3e292874297843ed6cfb08eb83a, 2025.001; Example: Get stock of a certain material ID, loio 9691f7013dae4076bc09d3e943716453, 2025.001) מציגות את הנתיב /sap/opu/odata/sap/API_MATERIAL_STOCK_SRV/A_MaterialStock ואת השדה MatlWrhsStkQtyInMatlBaseUnit בתגובה. הסניפט אינו קובע קשר טכני בין ה-API לתצוגת I_MaterialStock.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ההעשרה של תצוגות ה-CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת ההעשרה מתארת תצוגת Interface (Basic) של מלאי חומר מעל נתוני המלאי (MARD), עם מפתח Product + Plant + StorageLocation, אסוציאציות _Product, _Plant, _StorageLocation, הבחנה בין סוגי מלאי (Unrestricted / QI / Blocked), דוגמת SELECT של השדה MatlWrhsStkQtyInMatlBaseUnit וחלופת ECC MARD דרך MMBE/MB52. היא מסומנת 'verified' עם מקורות טקסטואליים ללא קישור. הסניפט הרשמי מתאר את התצוגה כ-'Interface' עם 'Dimension' ואינו משתמש במונח Basic, ואינו נוקב בטבלת מקור.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-enrichment.ts#I_MaterialStock",
      },
      {
        sourceType: "repository",
        sourceTitle: "מיפוי הטבלאות הקלאסיות לתצוגות CDS בפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "המיפוי מקשר את התצוגה (בכינוי 'מלאי חומר (NSDM)', מודול PP-PI) לטבלאות MARD ו-MCHB, לשכבת צריכה C_MaterialStock וליישום Fiori 'Manage Stock'. הקישור ל-MCHB מסומן במסמך הבסיס של הביקורת (audit/s4-enrichment/BASELINE.md) כדורש אימות. שמות תצוגות הצריכה שהסניפט הרשמי מונה הם C_MaterialStockActual ו-C_MaterialStockByKeyDate, לא C_MaterialStock, וליישום 'Manage Stock' לא נמצאה רשומת חיפוש רשמית הקושרת אותו לתצוגה זו.",
        verificationLevel: "repository_verified",
        repoRef: "data/cds-map.ts#I_MaterialStock",
      },
    ],
    status: {
      status: "s4_native",
      secondary: ["released_api_available"],
      he: "תצוגת CDS מסוג Interface (Dimension) במודל הנתונים הווירטואלי (VDM) של SAP S/4HANA, מתועדת במדריך Virtual Data Model and CDS Views (On-Premise 2023 Latest) כתצוגת הבסיס של תצוגות הצריכה Total Actual Stock Quantity (C_MaterialStockActual) ו-Material Stock at Posting Date (C_MaterialStockByKeyDate), ללא פרמטרי קלט, עם מדדי כמות מלאי, כניסה ויציאה ביחידת הבסיס של החומר. ב-What's New 2022 לניהול מלאי I_MATERIALSTOCK נמנית בין ה-CDS View-Entities המשוחררים כ-API ('Material Stock Calculation', DDLS + BDEF). ב-ECC אין תצוגת VDM מקבילה; המקור הקלאסי לפי מיפוי הפרויקט הוא MARD (ו-MCHB לאצוות, טרם אומת), ובמערכת S/4HANA המלאי מחושב ממסמכי MATDOC לפי רשומות MSEG ו-MARD במאגר.",
      edition: "on-premise",
      release: "2023.latest",
      source: MATERIAL_STOCK_VDM_2023,
      recommendedAction: "לקריאת כמויות מלאי נוכחיות ולבניית תצוגות צריכה או שאילתות אנליטיות מותאמות ב-S/4HANA להשתמש ב-I_MaterialStock (או בתצוגות הצריכה הרשמיות C_MaterialStockActual ו-C_MaterialStockByKeyDate) במקום SELECT ישיר מ-MARD/MCHB, בהתאם לפריט הפישוט של MM-IM (MATDOC) המתועד ברשומת MSEG. לתרחישי דיווח על מלאי לפי מאפייני מלאי מרובים לבדוק גם את I_MaterialStock_2 (Interface Cube, חדשה ב-2022); לצריכה חיצונית דרך OData קיים השירות API_MATERIAL_STOCK_SRV (Material Stock - Read). את רשימת השדות, המפתח, האסוציאציות וטבלאות המקור בפועל יש לאמת ב-View Browser או ב-ADT במערכת S/4HANA לפני שימוש, כי הסניפט הרשמי מונה רק דוגמאות למדדים. ב-ECC המקבילה נשארת MARD/MCHB דרך MMBE, MB52 ו-MB5B.",
    },
    xrefs: ["table:MARD", "table:MARC", "table:MSEG", "obj:material-document", "cds:I_MaterialDocumentItem", "cds:I_ProductPlant", "cds:I_Batch", "tx:MMBE", "tx:MB52", "tx:MB5B", "bp:matdoc-read-through-compatibility"],
    lastVerifiedAt: DATE14,
    notes: "הסטטוס 'חדש ב-S/4HANA' מעוגן בעמוד ה-VDM הרשמי הנוקב בשם הטכני I_MaterialStock; הדגל המשני 'קיים API משוחרר' מעוגן ברשימת ה-APIs המשוחררים ב-What's New 2022 (IAM Objects in Inventory Management), שבה I_MATERIALSTOCK מופיעה כ-DDLS + BDEF 'Material Stock Calculation'. סטטוס השחרור (Release Status) של התצוגה עצמה אינו מופיע בסניפט של עמוד ה-VDM, בניגוד לעמודי I_Equipment ו-I_FunctionalLocation. חיפושים על 'deprecated' ו-'I_MaterialStock_2' לא החזירו רשומת חיפוש רשמית שמוציאה את I_MaterialStock משימוש או מכריזה על I_MaterialStock_2 כיורש; הממצא השלילי מוגבל לרשומות החיפוש שנשלפו. סתירה ברובד המאגר: data/cds-map.ts נוקב בשכבת צריכה C_MaterialStock וביישום 'Manage Stock', בעוד הסניפט הרשמי מונה את C_MaterialStockActual (Total Actual Stock Quantity, loio 4b7c68579552346ae10000000a4450e5) ו-C_MaterialStockByKeyDate; אין יישום Fiori בתחום המלאי ב-data/fiori/apps.ts ולכן אין xref ליישום. הקישור ל-MCHB (מלאי אצוות) מסומן 'needs verification' ב-BASELINE.md ו-MCHB אינה מזהה טבלה ביקום המזהים, ולכן לא נרשמה ב-xrefs. טבלאות המקור בפועל (MARD, MCHB או MATDOC/NSDM) אינן נקובות בשום סניפט רשמי; ההקשר MATDOC/NSDM מיוחס לרשומות MSEG ו-MARD של המאגר. השדה MatlWrhsStkQtyInMatlBaseUnit מופיע בדוגמת ה-API הרשמית (API_MATERIAL_STOCK) ולא בסניפט של התצוגה, ולכן שייכותו ל-I_MaterialStock נשארת ברובד המאגר. עמוד ה-API ב-Business Accelerator Hub (api.sap.com/api/API_MATERIAL_STOCK_SRV/resource, כותרת 'Material Stock API') אותר בחיפוש מוגבל-דומיין בלבד; גופו לא נקרא. גוף עמודי ה-Help לא נקרא בדפדפן; כל ציטוט נלקח מכותרת ומסניפט של שירות החיפוש הרשמי (accessedAt 2026-09-14). מערכת SAP חיה לא הייתה זמינה (MANIFEST).",
  },
];
