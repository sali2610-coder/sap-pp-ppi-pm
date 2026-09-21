/* Project NEO · verification overlay — function objects (`fm:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02): 12 audited records alongside the worked
   example. Functions batch 2 (2026-09-14): 14 more audited records (PM
   notification/confirmation BAPIs, BAPI_GOODSMVT_CREATE, and eight classic
   FMs that stay verification_required).
   Functions batch 3 (2026-09-21): 7 more audited records - the technical-object
   master-data family (BAPI_EQUI_CHANGE, BAPI_EQUI_GETDETAIL, BAPI_FUNCLOC_CREATE,
   BAPI_FUNCLOC_CHANGE, BAPI_FUNCLOC_GETDETAIL), BAPI_ALM_ORDER_GET_DETAIL and
   BAPI_MATERIAL_SAVEDATA - each merged from its adversarial verdict (fixedRecord
   where one was supplied, otherwise the listed downgrades applied to the draft);
   all seven carry released_api_available on a documented OData alternative, none
   claims a successor. fm:BAPI_EQUI_CREATE was refuted and queued.
   Functions batch 4 (2026-09-21): 8 more audited records - the process-order
   execution family (BAPI_PROCORD_GET_DETAIL, BAPI_PROCORD_GET_LIST,
   BAPI_PROCORDCONF_CREATE_TT, BAPI_PROCORDCONF_GETLIST), the measuring-point /
   measurement-document pair (BAPI_MEASUREMENTDOCUM_CREATE,
   BAPI_MEASUREMENTPOINT_CREATE) and the batch master pair (BAPI_BATCH_CREATE,
   BAPI_BATCH_GET_DETAIL). Six carry released_api_available on a documented OData
   alternative; the two measurement ids stay verification_required because the
   repository contradicts itself about whether the name exists at all, and that
   contradiction is written as conflictingEvidence, not only as a note. None
   claims a successor; none carries a SAP Note or KBA number. 0 refuted.
   Functions batch 5 (2026-09-21, written 2026-09-22): 4 more audited records -
   the remaining maintenance-notification BAPIs (BAPI_ALM_NOTIF_SAVE,
   BAPI_ALM_NOTIF_LIST_FILTER, BAPI_ALM_NOTIF_TASK_ADD) and
   BAPI_ALM_ORDERHEAD_GET_LIST. Two carry released_api_available on a documented
   OData alternative (SAVE, ORDERHEAD_GET_LIST); LIST_FILTER and TASK_ADD stay
   verification_required at conflicting_sources because the repository
   contradicts itself about whether the name exists at all (the measurement-id
   treatment). One KBA number is carried (3379615 on SAVE, read from its public
   preview, cited by its me.sap.com/notes url). None claims a successor. 0 refuted.
   Functions batch 6 (2026-09-22): 4 more audited records - BAPI_BUPA_CREATE_FROM_DATA
   (business partner creation, cross-module), BAPI_GOODSMVT_GETDETAIL (material
   document read), BAPI_CENTRAL_CHARACT_CREATE and BAPI_EQMT_INSTALL. Two carry
   released_api_available on a documented OData alternative (Business Partner (A2X)
   for BUPA, Read Material Documents for GOODSMVT_GETDETAIL); the two contested
   names stay verification_required at conflicting_sources because the repository
   contradicts itself about whether the name exists at all (the measurement-id
   treatment). One SAP Note number is carried (2265093 on BUPA, read from the
   Simplification List text and the blueprints, on the repository claim with a
   repoRef). None claims a successor. 0 refuted.
   Tier-1 evidence comes from
   help.sap.com search records (scripts/sap-help-search.mjs; loio + versionId
   re-verified live), from the fully-read Simplification List PDF, from the
   fully-read ECC 6.0 EHP3 and EHP5 Release Notes PDFs and from
   three fully-read static NetWeaver documentation pages (help.sap.com/doc/saphelp_*); api.sap.com is cited only by
   the title a domain-restricted search returned; Tier-2 is the named
   repository record. Every claim is bounded by the snippet, the fully-read
   page or the named repository record; negative findings are search-bounded,
   never absolute. Open conflicts and deferred ids live in
   audit/s4-enrichment/research-queue-functions.md. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";
const DATE14 = "2026-09-14";
const DATE21 = "2026-09-21";
const DATE22 = "2026-09-22";

/* ------------------------------------------------------------- shared docs */

/** fm:CM_FV_PROD_VERS_READ — the repository claim that carries its status. */
const CMFV_INTEL: Evidence = {
  sourceType: "repository",
  sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI, מסומנת inferred)",
  product: "SAP ECC / SAP S/4HANA",
  edition: "on-premise",
  accessedAt: DATE2,
  claim:
    "רשומת המאגר מתארת קריאת גרסאות ייצור (MKAL) לפי חומר ומפעל בזיקה ל-C223; שדה ה-ECC נושא הסתייגות מפורשת " +
    "'אמת ב-SE37', שדה ה-S/4 טוען זמינות ללא הסתייגות, והרשומה כולה מסומנת inferred: true.",
  verificationLevel: "repository_verified",
  repoRef: "data/function-intel.ts#CM_FV_PROD_VERS_READ",
};

/** fm:BAPI_ALM_ORDER_MAINTAIN — the official page naming the released V2 API. */
const ALM_V2_OPS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Maintenance Order (Entity) - Version 2 | APIs for Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/a77ab811acd34f38a715f8093eb68ead.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE2,
  claim:
    "‏Maintenance Order (Version 2) OData API מתועד ל-On-Premise תחת נתיב השירות " +
    "‎/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2, כולל פעולות ברמת הישות.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_GOODSMVT_CREATE — the official OData service documented beside the BAPI (also its status source). */
const GOODSMVT_ODATA_API: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Material Documents - Read, Create | APIs for Inventory",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: 
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/d4c919581bc30a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE14,
  claim: 
    "שירות ה-OData‏ Material Documents - Read, Create מתועד למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
    "Inventory: 'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following operations for " +
    "material documents: Retrieve material documents, Create material documents, Cancel material documents at " +
    "header level, Cancel material documents at [item level]'. רשומת 'Operations for Material Document API' " +
    "באותו מדריך (loio 1aef4e402acd4c8b8ec2ea2bfda7715b, 2025.001) מציגה את נתיב היצירה POST " +
    "‎<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader ואת פעולות הביטול ברמת כותרת " +
    "ופריט. רשומות What's New מתעדות הרחבות שוטפות של השירות: 2023 ‏(loio 71c0f9113d2a47cca1de911185cb89af, " +
    "'enhanced with additional properties', רכיב MM-IM-GF) ו-2025 FPS01 ‏(loio " +
    "bfe185a3e1ea4fe0a39b12d0683853ff, 'enhanced with Warehouse Handling Unit field'). אף אחת מהרשומות אינה " +
    "מציגה את ה-API כמחליף של BAPI_GOODSMVT_CREATE; הן מתעדות אותו כשירות OData לרישום מסמכי חומר לצד ה-BAPI.",
  verificationLevel: "sap_official_verified",
};


/** fm:BAPI_EQUI_CHANGE — the Equipment API operations page (also its status source). */
const EQUI_OPS_WRITE: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Equipment | APIs for Maintenance Management",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d1e3c797d3f44120b552d0e64680e445.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: "2026-09-21",
  claim: "עמוד הפעולות של שירות ה-OData‏ Equipment למהדורת On-Premise‏ 2025 FPS01 פותח ב-'Operations for " +
         "Equipment The Equipment API offers these operations' ומונה בטבלת הפעולות את 'Read Equipment " +
         "GET', את יצירת הציוד בשיטת POST על ‎/sap/opu/odata/sap/API_EQUIPMENT/Equipment ואת 'Update " +
         "Equipment PATCH' על אותו נתיב, לצד 'Create Equipment Classification Data POST' / 'Update " +
         "Equipment Classification Data PATCH' על EquipmentClassification ו-'Create Equipment Text POST' " +
         "על EquipmentLongText. התקציר קובע גם: 'For this service, the If-Match header must be set for " +
         "all change operations'. זו חלופת OData מתועדת לתרחיש שינוי נתוני אב של ציוד; העמוד אינו נוקב " +
         "בשם BAPI_EQUI_CHANGE.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_EQUI_GETDETAIL — the same operations page, bounded to its read operations (also its status source). */
const EQUI_OPS_READ: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Equipment | APIs for Maintenance Management",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d1e3c797d3f44120b552d0e64680e445.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: "2026-09-21",
  claim: "‏העמוד מונה את פעולות שירות ה-OData‏ Equipment API למהדורת On-Premise 2025 FPS01. כלשון התקציר: " +
         "'The Equipment API offers these operations: Operation HTTP Method Sample URL Read Equipment GET " +
         "‎/sap/opu/odata/sap/API_EQUIPMENT/Equipment (Equipment='217100091')', ולצידה 'Batch Request " +
         "BATCH ‎/sap/opu/odata/sap/API_EQUIPMENT/$batch' ו-'Read Equipment Text GET ... " +
         "‎/sap/opu/odata/sap/API_EQUIPMENT/EquipmentLongText'. קיימת אפוא פעולת קריאה רשמית לנתוני ציוד " +
         "בשיטת GET תחת השירות API_EQUIPMENT. רשימת הפעולות המלאה, הפרמטרים ומבנה התשובה אינם מופיעים " +
         "בתקציר.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_FUNCLOC_CREATE — the Functional Location OData service topic (also its status source). */
const FLOC_API_CREATE: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Functional Location | APIs for Maintenance Management",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: "2026-09-21",
  claim: "מדריך APIs for Maintenance Management לגרסת On-Premise 2025 FPS01 מתעד את השירות: 'Functional " +
         "Location Technical name: API_FUNCTIONALLOCATION', וקובע 'The service enables the following " +
         "operations for the functional location: Read functional location master data Create functional " +
         "location master data Update functional location master data Delete'. הנושא המשלים Operations " +
         "for Functional Location ‏(loio f69f391c38104f75ae5792155a88ce05, גרסה 2023.latest) מציג בטבלת " +
         "הפעולות 'Create Functional Location POST " +
         "/sap/opu/odata/sap/API_FUNCTIONALLOCATION/FunctionalLocation' לצד Read ו-Update, והנושא " +
         "Extensibility: Functional Location API ‏(loio 5e1d4eabc0b541c28c3888006d2ada6f, גרסה 2025.001) " +
         "קובע 'you can extend the OData Service API_FUNCTIONALLOCATION according to your business needs' " +
         "דרך היישום Custom Fields and Logic בהקשר העסקי Functional Location ובישות A_FUNCTIONALLOCATION. " +
         "אף אחת מהרשומות האלה אינה מציגה את השירות כמחליף של BAPI_FUNCLOC_CREATE.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_FUNCLOC_GETDETAIL — the same service topic, bounded to its read operation (also its status source). */
const FLOC_API_READ: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Functional Location | APIs for Maintenance Management",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: "2026-09-21",
  claim: "‏המדריך APIs for Maintenance Management למהדורת On-Premise 2025 FPS01 מתעד שירות OData למיקום " +
         "פונקציונלי (תחזוקת מפעל): 'Functional Location Technical name: API_FUNCTIONALLOCATION " +
         "Functional location represents a place in which a maintenance task has to be performed', ומונה " +
         "'The service enables the following operations for the functional location: Read functional " +
         "location master data, Create functional location master data, Update functional location master " +
         "data, Delete ...' (התקציר נקטע אחרי Delete). רשומת 'Operations for Functional Location' באותו " +
         "מדריך (loio f69f391c38104f75ae5792155a88ce05, 2023.latest) מציגה בטבלת הפעולות את 'Read " +
         "Functional Location' בשיטת GET תחת הנתיב ‎/sap/opu/odata/sap/API_FUNCTIONALLOCATION, ורשומת " +
         "'Read Functional Location' (loio f4966d57034b436a907099bdfb374e2b, 2025.001) מנסחת את היקף " +
         "הפעולה: 'Read all functional locations, Read a functional location'. אף רשומה מאלה אינה נוקבת " +
         "ב-BAPI_FUNCLOC_GETDETAIL ואינה מציגה את השירות כמחליף שלו.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_ALM_ORDER_GET_DETAIL — the v2 operations page read in full detail (also its status source). */
const ALM_ORDER_OPS_V2: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Maintenance Order (Entity) - Version 2 | APIs for Maintenance Management",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/a77ab811acd34f38a715f8093eb68ead.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: "2026-09-21",
  claim: "העמוד מונה את פעולות ישות Maintenance Order בגרסה 2 עבור On-Premise 2025 FPS01, ובהן פעולות " +
         "קריאה בשיטת GET: 'Read All Maintenance Orders (Version 2)' ו-'Read Maintenance Order Header " +
         "(Version 2)' בנתיב " +
         "<host>/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2/MaintenanceOrder('4012109')‎, לצד 'Read " +
         "Maintenance Order Operation Details of an Order (Version 2)' ופעולות על פריטי רשימת האובייקטים " +
         "('Create Object List Item (Version 2)' ו-'Read Object L…', כפי שמופיע בתקציר לפני הקיטוע). " +
         "באותו מדריך ובאותה מהדורה, רשומת 'Operations Supported for Maintenance Order (Entity)'‏ (loio " +
         "34d39907b5644cdb8900ac69e1c71b2d) מציגה פעולות קריאה מקבילות בנתיב גרסה 1 " +
         "‎/sap/opu/odata/sap/API_MAINTENANCEORDER/MaintenanceOrder, ובהן 'Read All Maintenance Orders' " +
         "ו-'Read Maintenance Order Header'. רשומת 'Maintenance Order (Deprecated)'‏ (loio " +
         "d3f02cfccf00407ab9776ea2ec2030d3) נושאת את השם הטכני API_MAINTENANCEORDER, מונה את ישויות גרסה " +
         "1 כשהקישור לפרטים נושא את הסיומת '(Deprecated)' (למשל 'Maintenance Order Object List Item " +
         "(Deprecated)'), ומתארת את ישות Maintenance Order כמאפשרת לקרוא את נתוני כותרת פקודת האחזקה " +
         "('Allows to read the maintenance order header data', כלשון התקציר); תיאור ישות Maintenance " +
         "Order Operation נקטע בתקציר ואינו נרשם.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_MATERIAL_SAVEDATA — the Product Master (A2X) OData service topic (also its status source). */
const PRODUCT_A2X: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Product Master (A2X) | APIs for Product Master",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18fe3fab96864826bfa0be0de4f65b85/74aa2b58a333a107e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: "2026-09-21",
  claim: "עמוד Product Master (A2X) לגרסת 2025 FPS01 נוקב בסניפט: 'Product Master (A2X) Use Technical " +
         "name: API_PRODUCT_SRV This synchronous inbound service enables you to create, read, update, and " +
         "delete (CRUD operations) the master data for products by exposing the', ומדגים נתיבי שירות תחת " +
         "‎/sap/opu/odata/SAP/API_PRODUCT_SRV/A_Product. זו חלופת OData רשמית ומתועדת לכתיבת נתוני אב " +
         "מוצר; הסניפט אינו מזכיר את ה-BAPI ואינו מציג אותו כמוחלף.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_PROCORD_GET_LIST — the Process Order (Version 2) operations page (also its status source). */
const PROCORD_OPS_V2: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Process Order (Version 2) | APIs for Manufacturing",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/fe301c889827445095bd5e66e6c0a3ee.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE21,
  claim: "‏עמוד הפעולות של שירות ה-OData‏ Process Order (Version 2) במדריך APIs for Manufacturing למהדורת " +
         "On-Premise‏ 2025 FPS01 פותח ב-'Operations for Process Order (Version 2) The OData API Process Order " +
         "(Version 2) offers the following operations' ומונה בטבלת הפעולות את 'Operation HTTP Method Sample URL " +
         "Read Process Order GET GET " +
         "<host>/sap/opu/odata/sap/API_PROCESS_ORDER_2_SRV/A_ProcessOrder_2('1234567')', את 'Create Process Order " +
         "POST' על ‎/API_PROCESS_ORDER_2_SRV/A_ProcessOrder_2, את 'Update Process Order PATCH' על אותה ישות, את " +
         "'Read Process Order Component GET' ואת 'Convert Planned Order into Process Order POST ... " +
         "/ConvertPlannedOrder?'. התקציר מוסיף הערה החלה על כלל פעולות הקריאה: 'Note For all Read operations (HTTP " +
         "method GET), you can use the standard OData system query options like $top, $skip, $filter, $orderby, or " +
         "$expand.' קיימת אפוא דרך מתועדת לשלוף אוסף של פקודות תהליך לפי תנאי סינון ומיון. העמוד אינו נוקב בשם " +
         "BAPI_PROCORD_GET_LIST.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_PROCORDCONF_CREATE_TT — the Time Ticket Confirmation operations page (also its status source). */
const PROCONF_TT_OPS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Time Ticket Confirmation | APIs for Manufacturing",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/347e141637354ad4acf603c8cdeeb07d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE21,
  claim: "עמוד הפעולות לדיווח Time Ticket במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01 פותח בסניפט " +
         "ב-'Time Ticket Confirmation For time ticket confirmations, the Process Order Confirmation API offers the " +
         "operations listed in the following table', ומציג בטבלה את 'Create Time Ticket Confirmation POST POST " +
         "<host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/ProcOrdConf2' לצד 'Fetch Proposals for " +
         "Quantities, Activities, Dates and Times, Personnel Data POST', 'Cancel Confirmation POST POST " +
         "<host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/CancelProcOrdConf' ו-'Fetch Proposals for " +
         "Goods Movements POST POST <host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/GetGdsMvtProposal'. " +
         "זו חלופת OData מתועדת ליצירת דיווח Time Ticket לפקודת תהליך, כלומר לאותו תרחיש עסקי של ה-BAPI. יש להבחין " +
         "בין עמוד זה לבין עמוד באותו שם במדריך המתאר את שירות פקודות הייצור הדיסקרטי " +
         "(API_PROD_ORDER_CONFIRMATION_2_SRV, loio a1f8c8c3e63d4dac90c198d1d0506676). העמוד אינו נוקב בשם ה-BAPI.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_BATCH_CREATE — the Batch Master Record OData service topic (also its status source). */
const BATCH_MASTER_API: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Batch Master Record | APIs for Logistics Cross Topics",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1841426f60f4e50913ec9a64aba8332/48b3c2ac60154137bb1d6411c7047e16.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE21,
  claim: "עמוד השירות Batch Master Record במדריך APIs for Logistics Cross Topics לגרסת On-Premise 2025 FPS01 נוקב " +
         "בשם הטכני כלשונו: 'Batch Master Record Technical name: API_BATCH_SRV This service enables you to " +
         "retrieve batches and their classification data', ומוסיף 'In addition, batches and classification data " +
         "can be created and updated. The service is based on the OData protocol, and can be consumed by external " +
         "systems and user interfaces'. שאילתה נוספת על אותו loio מחזירה מאותו עמוד גם את מבנה השירות: 'Service " +
         "Structure The batch itself is modelled in the entity Batches (Batch), Plant-specific Batch Information " +
         "(BatchPlant), and Batch Texts (BatchText)', ואת האירוע העסקי 'Topic Topic Description BO/Batch/Created " +
         "Batch master record is created'. הסניפטים אינם נוקבים בשם מודול פונקציה כלשהו ואינם מציגים את השירות " +
         "כמחליף של BAPI.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_BATCH_GET_DETAIL — the Batch API operations page, bounded to its read operations (also its status source). */
const BATCH_OPS_API: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Batch API | APIs for Logistics Cross Topics",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1841426f60f4e50913ec9a64aba8332/3d366e68d53345b4bad055ec8fe85d6e.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE21,
  claim: "‏העמוד מונה את פעולות שירות ה-OData‏ Batch API למהדורת On-Premise 2025 FPS01. כלשון התקציר: 'The Batch " +
         "API offers the following operations: Operation HTTP Method Sample URL Retrieve Batch GET GET " +
         "<host>/sap/opu/odata/SAP/API_BATCH_SRV/Batch(Material='TG21',BatchIdentifyingPlant', ולצידה 'Query Batch " +
         "GET GET <host>/sap/opu/odata/SAP/API_BATCH_SRV/Batch? ... $filter=ShelfLifeExpirationDate ge " +
         "datetime'2019-05-01T00:00:00''. התקציר מוסיף: 'For this service, the If-Match header must be set for all " +
         "change operations'. קיימות אפוא שתי פעולות קריאה רשמיות לנתוני אצווה בשיטת GET תחת השירות API_BATCH_SRV. " +
         "סניפט שורת ה-Retrieve נחתך אחרי BatchIdentifyingPlant, ולכן מבנה המפתח המלא אינו נטען כאן; רשימת הפעולות " +
         "המלאה, הפרמטרים ומבנה התשובה אינם מופיעים בתקציר.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_ALM_NOTIF_SAVE: the Maintenance Notification API operations page, bounded to its create/read/update rows (also its status source). */
const MAINTNOTIF_OPS_CRUD: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE21,
  claim: "בחוברת 'APIs for Maintenance Management' לגרסת S/4HANA On-Premise 2025 FPS01: 'The " +
         "API_MAINTNOTIFICATION API offers these operations', ובהן Read Maintenance Notification (GET), Create " +
         "Maintenance Notification (POST) ו-Update Maintenance Notification (PATCH) תחת נתיב השירות " +
         "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification, וכן שימוש ב-ETags (כלשון הסניפט). " +
         "זו חלופת OData רשמית לרצף יצירה ושמירה של הודעת תחזוקת מפעל; העמוד אינו נוקב בשם ה-BAPI, ושלב שמירה " +
         "נפרד אינו מופיע בחלון הסניפט.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_ALM_ORDERHEAD_GET_LIST: the Read All Maintenance Orders (Version 2) operation page (also its status source). */
const ALM_ORDER_READ_ALL_V2: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Read All Maintenance Orders (Version 2) | APIs for Maintenance Management",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/50ded8443fd649b0bb3fa841da1e5eb6.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE21,
  claim: "רשומת 'Read All Maintenance Orders (Version 2)' במדריך APIs for Maintenance Management למהדורת " +
         "On-Premise 2025 FPS01 קובעת, כלשון התקציר: 'With this operation, you use the HTTP method GET to " +
         "retrieve a list of all maintenance orders. You can use filters to limit the list results. ... " +
         "Response The operation returns the success status code 200 OK with the header details of all " +
         "maintenance orders that correspond to your filter settings.' באותו מדריך ובאותה מהדורה, רשומת " +
         "'Operations for Maintenance Order (Entity) - Version 2' (loio a77ab811acd34f38a715f8093eb68ead) מונה " +
         "'Read All Maintenance Orders (Version 2) GET' לצד 'Read Maintenance Order Header (Version 2) GET " +
         "<host>/sap/opu/odata/sap/API_MAINTENANCEORDER;v=2/MaintenanceOrder('4012109')'; כתובת הדוגמה של " +
         "פעולת Read All עצמה נקטעת בתקציר ואינה נרשמת. רשומת השירות 'Maintenance Order (Version 2)' (loio " +
         "c1457e0e539740a29932fbdcf36fea3c, 2025.001) פותחת ב-'This service enables you to create, read, " +
         "update and delete maintenance order data in an API call', מציגה את הישות 'Maintenance Order " +
         "(MaintenanceOrder) Allows to read the maintenance order header data' ונושאת בתקציר את השם " +
         "API_MAINTENANCEORDER_0002; אותו שם מופיע ב-What's New 2025 FPS01 (loio " +
         "5bde6113f9fd41afba2740a652612498; בקובץ WN_OP2025_FPS01_EN.pdf עמ' 37, סעיף 3.1.5 'OData API: " +
         "Maintenance Order'). היסטוריית השירות לפי רשומות What's New: 2021 (loio " +
         "be4e2d6267d844a89f99119c1d5215ef): 'The OData API Maintenance Order - Read (API_MAINTENANCEORDER) is " +
         "a synchronous inbound service that allows you to read header, operation, component, object list " +
         "item, and operation relationship data of maintenance orders'; 2022 (loio " +
         "600107c46bea4b0fbb32575531821dce): 'Up to now, you could only use the OData API to read maintenance " +
         "order data' ו-'the API has been renamed from Maintenance Order - Read to Maintenance Order'. רשומת " +
         "'Maintenance Order (Deprecated)' (loio d3f02cfccf00407ab9776ea2ec2030d3, 2025.001) קובעת: 'We " +
         "recommend that you switch to the following successor API as soon as possible: Maintenance Order " +
         "(Version 2) (API_MaintenanceOrder_002)'; הצהרת יורש זו נוגעת לגרסה 1 מול גרסה 2 של שירות ה-OData, לא " +
         "ל-BAPI. אף אחת מהרשומות אינה נוקבת בשם BAPI_ALM_ORDERHEAD_GET_LIST.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_BUPA_CREATE_FROM_DATA: the Business Partner (A2X) OData service page (also its status source). */
const BP_A2X_API: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Business Partner (A2X) | APIs for Business Partner",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/44e06f22436c43e582db6ccd5250e29b/85043858ea0f9244e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE22,
  claim: "עמוד Business Partner (A2X) בחוברת APIs for Business Partner לגרסת 2025 FPS01 נוקב בסניפט: 'Business " +
         "Partner (A2X) Use Technical name: API_BUSINESS_PARTNER This service enables you to create, display, " +
         "update, and delete (CRUD) data related to Business Partner, Supplier, and Customer with', ובטבלת " +
         "הישויות: 'Business partner Supported: CREATE, READ, UPDATE' ו-'Business partner address Supported: " +
         "CREATE, READ, UPDATE, DELETE'. זו חלופת OData מתועדת ליצירת שותף עסקי, ספק ולקוח ב-S/4HANA " +
         "On-Premise. הסניפט אינו מזכיר את ה-BAPI, אינו מציג אותו כמוחלף ואינו נוקב במילה released.",
  verificationLevel: "sap_official_verified",
};

/** fm:BAPI_GOODSMVT_GETDETAIL: the Read Material Documents operation page (also its status source). */
const MATDOC_READ_API: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Read Material Documents | APIs for Inventory",
  url:
    "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/eb2a39dd0c124fed8252f684002d55e1/78f5a8461d554cc38b3af2d07d6f9c8e.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE22,
  claim: "פעולת הקריאה של שירות ה-OData למסמכי חומר מתועדת למהדורת On-Premise 2025 FPS01 במדריך APIs for " +
         "Inventory: 'To read material documents, you use the http method GET on the A_MaterialDocumentHeader " +
         "or the A_MaterialDocumentItem entity ... With this operation, you can retrieve material documents as " +
         "follows: Request material documents or items by using their keys Use system query options to filter " +
         "a collection of material documents or items', עם הדוגמה 'GET " +
         "<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentItem?' ו-'the GET request needs " +
         "to be based on the material document item entity (A_MaterialDocumentItem)'. רשומות נוספות מאותו " +
         "מדריך ואותה מהדורה: 'Material Documents - Read, Create' ‏(loio d4c919581bc30a02e10000000a44147b): " +
         "'Technical name: API_MATERIAL_DOCUMENT ... This service enables the following operations for " +
         "material documents: Retrieve material documents Create material documents Cancel material documents " +
         "at header level Cancel material documents at [item level]' ו-'Depending on the operation, material " +
         "document header and item detail data is sent in the response'; 'Operations for Material Document " +
         "API' ‏(loio 1aef4e402acd4c8b8ec2ea2bfda7715b): 'Read Material Documents GET GET " +
         "<host>/sap/opu/odata/sap/API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader'; 'Cancel Material " +
         "Documents at Item Level' ‏(loio 2b1124c6321a47559518f5b5bdc1db72): 'To cancel a material document at " +
         "item level, you use the http method POST to call the CancelItem function import' ו-'The new material " +
         "document includes the ReversedMaterialDocument, ReversedMaterialYear and ReversedMaterialItem " +
         "properties to refer to the material document item that was canceled'; מפתח הכותרת " +
         "MaterialDocumentYear ו-MaterialDocument מופיע בתקציר 'Cancel Material Documents at Header Level' " +
         "‏(loio 3ffc5cb1a13a43928313477bf5bc98dd): " +
         "'/A_MaterialDocumentHeader(MaterialDocumentYear='2017',MaterialDocument='5000021256')'. אף אחת " +
         "מהרשומות אינה נוקבת ב-BAPI_GOODSMVT_GETDETAIL ואינה מציגה את השירות כמחליף שלו; הן מתעדות חלופת " +
         "OData לקריאת מסמכי חומר לצד ה-BAPI.",
  verificationLevel: "sap_official_verified",
};

/* ---------------------------------------------------------------- records */

export const FM_VERIFICATION: VerificationRecord[] = [
  {
    id: "fm:BAPI_TRANSACTION_COMMIT",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ביצוע COMMIT WORK חיצוני לאחר קריאות BAPI: הנתונים נשמרים במסד הנתונים רק לאחר קריאה זו. " +
          "לפי הרשומה: Released, RFC, קבוצת פונקציות BAPT (SAP_BASIS); נתמך ב-ECC וב-S/4HANA On-Premise. " +
          "יש להעביר WAIT='X' כאשר הנתונים נקראים מיד לאחר ה-COMMIT.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_TRANSACTION_COMMIT",
      },
    ],
    xrefs: ["fm:BAPI_TRANSACTION_ROLLBACK", "fm:BAPI_ALM_NOTIF_SAVE", "bp:bapi-commit-discipline"],
    lastVerifiedAt: DATE,
    notes:
      "רשומת עבודה של שלב היסוד. סימון released_api_available יינתן רק עם ראיה מ-api.sap.com; " +
      "עד אז הרשומה נשענת על נתוני המאגר בלבד.",
  },

  /* --------------------------------------- fm:ACCOUNT_ASSIGNMENT_READ */
  {
    id: "fm:ACCOUNT_ASSIGNMENT_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle:
          'help.sap.com search: "ACCOUNT_ASSIGNMENT_READ", "ACCOUNT_ASSIGNMENT_READ function module", ' +
          '"read account assignment purchase requisition RFC" (SAP_S4HANA_ON-PREMISE)',
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ממצא שלילי: אף רשומה משירות החיפוש של SAP Help — 47 תוצאות בשלוש וריאציות שאילתה — אינה נוקבת בשם " +
          "ACCOUNT_ASSIGNMENT_READ בכותרת או בתקציר; לא אותר תיעוד SAP Help רשמי למודול פונקציה זה.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PM — רשומת EBKN (נושא 9: אינטגרציית מלאי ורכש PM-MM)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "חוברת המיגרציה מייחסת ל-ACCOUNT_ASSIGNMENT_READ בטבלת EBKN (ייחוס חשבונאי לדרישת רכש) את התיאור " +
          "'קריאת נתוני חיוב לדרישה' בנושא 9 — אינטגרציית מלאי ורכש (PM-MM), בהקשר ME51N/ME52N.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#EBKN",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת הקטלוג הקיימת מסומנת inferred: true, ושדות ה-ecc/s4 שלה עצמם מורים 'אמת ב-SE37' / 'אמת ב-S/4' — " +
          "כלומר המאגר עצמו אינו טוען לקיום מאומת או לסטטוס שחרור. אובייקטים קשורים ברשומה: EBKN, EBAN, ME53N, " +
          "תהליך PM-7; המודול נמנה גם ב-data/domain-detail.ts (pm-spare-parts).",
        verificationLevel: "verification_required",
        repoRef: "data/function-intel.ts#ACCOUNT_ASSIGNMENT_READ",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Purchase Requisition - OData V4 | APIs for Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91af7f8d3acd47da90d33aaacfcd0d59/dad2402e2ff543e7971d788bf35b12c1.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "הקשר בלבד (לא טענת יורש): ה-OData V4 API המתועד רשמית לדרישות רכש כולל ישות Item Account Assignment ‏" +
          "(A_PurchaseReqnAcctAssgmt_2) לקריאת נתוני הייחוס החשבונאי של דרישת רכש; הסניפט נוקב בשם הישות. באותה " +
          "חוברת מתועדת גם וריאציית OData V2 ‏(A_PurReqnAcctAssgmt).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "מודול פונקציה לקריאת נתוני ייחוס חשבונאי של דרישת רכש (EBKN) בתהליך רכש חלפים של תחזוקת מפעל (PM-MM). " +
        "לא נמצא לו תיעוד רשמי ב-SAP Help או ב-SAP Business Accelerator Hub, ולכן אין לראות בו ממשק משוחרר או " +
        "מתועד. הרישום מקורו בחוברת המיגרציה של הפרויקט בלבד, ונדרש אימות קיום וסטטוס שחרור ב-SE37 במערכת SAP.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "אמת ב-SE37 (קיום, קבוצת פונקציות, סטטוס Released) במערכת ECC וב-S/4HANA לפני כל שימוש. לקריאת ייחוס " +
        "דרישת רכש בתצורה נתמכת העדף את BAPI_REQUISITION_GETDETAIL (קיים בדאטהסט) או את ה-OData API המתועד רשמית " +
        "לדרישות רכש, שכולל ישות Account Assignment. אל תציג את המודול הזה כממשק משוחרר.",
    },
    xrefs: ["table:EBKN", "table:EBAN", "tx:ME51N", "tx:ME52N", "tx:ME53N", "fm:BAPI_REQUISITION_GETDETAIL"],
    lastVerifiedAt: DATE2,
    notes:
      "לא קיים תיעוד רשמי ל-ACCOUNT_ASSIGNMENT_READ: שלוש וריאציות חיפוש בשירות החיפוש של help.sap.com (סקופ " +
      "On-Premise, ‏2026-09-02, ‏47 תוצאות שנסקרו) לא העלו אף כותרת או תקציר הנוקבים בשם, וחיפוש רשת מוגבל " +
      "לדומיינים הרשמיים (help.sap.com / api.sap.com / me.sap.com / support.sap.com) החזיר רק עמודי נושא כלליים " +
      "של Account Assignment; לא נמצאה רשומת api.sap.com ולכן אין לצטטו כ-API משוחרר. המודול נעדר גם " +
      "מ-lib/bapi-registry.ts (רק lib/route-manifest.generated.ts המחולל מהדהד את הדאטהסט). מה חסר לשדרוג: עמוד " +
      "רשמי ב-help.sap.com או api.sap.com הנוקב בשם, או בדיקת SE37 חיה (קיום, קבוצת פונקציות, סטטוס Released) " +
      "ב-ECC 6.0 וב-S/4HANA היעד — חיבור sc4sap MCP נכשל בסשן זה. סטטוס replaced/deprecated/not_available אינו " +
      "בר-טענה כי אף מקור רשמי אינו נוקב ביורש; ציטוט ה-OData הוא הקשר לאותם נתונים עסקיים, לא הצהרת יורש. " +
      "מקורות הרישום במאגר: data/sapData.pm.ts#EBKN (נגזר מחוברת העבודה), data/function-intel.ts (inferred: true), " +
      "data/domain-detail.ts.",
  },

  /* ----------------------------------------- fm:ARCHIVE_DELETE_FROM_DB */
  {
    id: "fm:ARCHIVE_DELETE_FROM_DB",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Developing a Delete Program | Data Management in HCM",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/19fd959a061b4cccbbda9081688d41e9/9d944b243e614469a909399863acfaf2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "בתיעוד S/4HANA 2025 FPS01: ‏'The program uses ADK function modules to read the archive files and " +
          "deletes the data from the database tables and the archive file'. כלומר, תוכנית המחיקה קוראת בעזרת " +
          "מודולי ADK ומוחקת בלוגיקה שלה. חיפוש הטקסט המלא בשירות החיפוש של SAP Help אינו מעלה רשומה הנוקבת בשם " +
          "ARCHIVE_DELETE_FROM_DB.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Introduction: Technical Basis of Data Destruction | Data Management in HCM",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/19fd959a061b4cccbbda9081688d41e9/2160e92e598249ad91119d82924d68fc.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "‏ADK קיים ב-S/4HANA ומספק את התשתית: 'The Archive Development Kit comprises the services and functions " +
          "required to develop and run archiving objects and programs: Application programming interface (API)'. " +
          "ההקשר (ADK, ארכוב) מאומת מהסניפט; שם המודול אינו עולה בחיפוש הטקסט המלא של החוברת בשירות החיפוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deleting Archived Data from the Database | Data Archiving in the ABAP Application System",
        product: "SAP NetWeaver AS ABAP (ADK)",
        edition: "ecc",
        release: "NW 7.31.19",
        url: "https://help.sap.com/doc/saphelp_nw73ehp1/7.31.19/en-us/4d/8c788a910b154ee10000000a42189e/content.htm",
        accessedAt: DATE2,
        claim:
          "העמוד הרשמי על מחיקת נתונים מאורכבים נקרא במלואו: שלב המחיקה מבוצע על ידי תוכנית המחיקה, המתוזמנת " +
          "מ-Archive Administration ‏(SARA) או דרך התוכנית RSARCHD. המחרוזת ARCHIVE_DELETE_FROM_DB אינה מופיעה " +
          "בעמוד. אותו מסמך (loio 4d8c788a910b154ee10000000a42189e) מפורסם גם תחת ABAP Platform ותחת S/4HANA " +
          "On-Premise 1709.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "ADK Interface | Archive Development Kit (SAP Library)",
        product: "SAP NetWeaver (ADK, SAP Library EM 7.0 EHP1)",
        edition: "ecc",
        release: "7.0.1",
        url: "https://help.sap.com/doc/saphelp_em700_ehp01/7.0.1/en-US/2a/fa03ec493111d182b70000e829fbfe/content.htm",
        accessedAt: DATE2,
        claim:
          "עמוד ADK Interface נקרא במלואו ומונה את מודולי הממשק של ADK‏ (ARCHIVE_OPEN_FOR_WRITE/DELETE/READ, " +
          "ARCHIVE_NEW_OBJECT, ARCHIVE_SAVE_OBJECT, ARCHIVE_GET_NEXT_OBJECT, ARCHIVE_GET_NEXT_RECORD ועוד). " +
          "‏ARCHIVE_DELETE_FROM_DB אינו ברשימה, והעמוד קובע: 'These function modules cannot be used for the actual " +
          "deletion of data from the database or reloading of data into the database. Your program must handle " +
          "these actions'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת הפרויקט מסומנת inferred: true ומורה במפורש לאמת את קיום המודול ב-SE37‏ (ECC) וב-S/4‏ (ILM/ADK). " +
          "כלומר, הדאטהסט עצמו אינו טוען לאימות של שם המודול.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#ARCHIVE_DELETE_FROM_DB",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PM — טבלת ADMI_RUN (נושא 12: היסטוריה וארכיון)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המודול משויך בבלופרינט לטבלת ADMI_RUN (ריצות ארכוב, SARA/AOBJ/DB15) לצד ARCHIVE_OPEN_FOR_WRITE " +
          "ו-ARCHIVE_GET_NEXT_OBJECT ולצד התוכנית RIARCPM1 לארכוב פקודות אחזקה. זהו הקשר שימוש בפרויקט בלבד, " +
          "לא אימות SAP.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#ADMI_RUN",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "השם ARCHIVE_DELETE_FROM_DB לא אותר באף מקור SAP רשמי, לא בחיפוש Help של S/4HANA On-Premise ולא בשני " +
        "עמודי ADK רשמיים שנקראו במלואם. תיעוד ADK הרשמי קובע שמודולי הממשק של ADK אינם מוחקים נתונים ממסד " +
        "הנתונים: המחיקה מתבצעת על ידי תוכנית המחיקה של אובייקט הארכוב, המתוזמנת דרך SARA או RSARCHD. רשומת " +
        "הפרויקט עצמה מסומנת inferred: true.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לאמת את קיום המודול ושמו המדויק ב-SE37 במערכת חיה. עד אז אין להציג את המודול כעובדה; לתהליך העסקי " +
        "(מחיקה אחרי ארכוב, כולל פקודות אחזקה בתחזוקת מפעל) יש להפנות לשלב ה-Delete של אובייקט הארכוב דרך SARA, " +
        "שהוא המנגנון המתועד רשמית.",
    },
    xrefs: ["table:ADMI_RUN", "tx:SARA", "fm:ARCHIVE_OPEN_FOR_WRITE", "fm:ARCHIVE_GET_NEXT_OBJECT"],
    lastVerifiedAt: DATE2,
    notes:
      "מה חסר בדיוק: עמוד רשמי (help.sap.com/api.sap.com) הנוקב בשם ARCHIVE_DELETE_FROM_DB, או בדיקת SE37 " +
      "במערכת חיה — חיבור sc4sap MCP לא היה זמין בסשן זה ולכן בדיקת SE37 לא בוצעה. מה נבדק בפועל: חיפוש Help " +
      "בשלוש וריאציות ללא אף רשומה הנוקבת בשם; WebSearch מוגבל לדומיינים רשמיים החזיר את עמוד Deleting Archived " +
      "Data from the Database ואת עמוד ADK Interface, שניהם נקראו במלואם ואינם מזכירים את המודול; עמוד ADK " +
      "Interface אף מונה את רשימת מודולי הממשק בלעדיו וקובע שמודולי ADK אינם מוחקים מהמסד. ראיות S/4 עדכניות " +
      "(2023.latest, 2025.001) מאמתות שה-ADK ותהליך המחיקה קיימים ב-S/4HANA, אך לא את שם המודול. היעדר מהתיעוד " +
      "אינו הוכחת אי-קיום ואין מקור רשמי הנוקב במחליף — לכן 'נדרש אימות' ולא not_available. סתירה פנימית: " +
      "data/function-intel.ts מתאר את המודול כמבצע את שלב המחיקה של ADK, בעוד עמוד ADK Interface הרשמי אינו מונה " +
      "מודול בשם זה וקובע שמודולי הממשק אינם מוחקים מהמסד; הרשומה מסומנת inferred: true ולכן הסיווג " +
      "verification_required ולא conflicting_sources — נרשם גם בקובץ התור. ערך edition ‏'ecc' בשתי ראיות " +
      "ה-NetWeaver מציין בסיס NetWeaver מתקופת ECC‏ (SAP NetWeaver 7.31 / SAP Library EM 7.0 EHP1), לא תיעוד ECC " +
      "עצמו. תואם לרישום הקיים בציר ה-BAPI/FM של הפרויקט (48 רשומות requires-verification).",
  },

  /* -------------------------------------------- fm:CARO_TASKLIST_READ */
  {
    id: "fm:CARO_TASKLIST_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "PM - General maintenance task list | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/d24a211cfa404cdd908cbee5fef91904.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "קיים ב-S/4HANA אובייקט הגירה רשמי לרשימת פעולות כללית בתחזוקת מפעל (PM). לפי העמוד, בהגירה משמשים " +
          "מודולי פונקציה ייעודיים להגירה (CNV_PE_S4_PM_EAM_TASKLIST‏, CNV_PE_S4_PM_EAM_TASKLIST_DEP) העושים " +
          "שימוש ב-APIs/BAPIs כגון EAM_TASKLIST_CREATE/CHANGE/POST. חיפוש בשירות החיפוש הרשמי של SAP Help אינו " +
          "מעלה את השם CARO_TASKLIST_READ בכותרת או בתקציר של עמוד זה או של כל עמוד אחר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מאגר הפרויקט מתעד את CARO_TASKLIST_READ כמודול פונקציה לקריאת רשימת פעולות תחזוקה (כותרת ופעולות, " +
          "PLKO/PLPO) בזיקה ל-IA05/IA08, ומסמן את הרשומה inferred: true עם הנחיה מפורשת לאמת ב-SE37 וב-S/4.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CARO_TASKLIST_READ",
      },
      {
        sourceType: "repository",
        sourceTitle: "מנוע האימות של המאגר — רשימת התבניות החשודות (SUSPICIOUS)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מנוע האימות של המאגר מסווג שמות מודולי פונקציה בתבנית ^CARO_ כחשודים (ככל הנראה נורמליזציה של " +
          "הדאטהסט, אובייקט מותאם אישית או שם לא ודאי), ולכן CARO_TASKLIST_READ נכלל אוטומטית בממצא Suspicious " +
          "FM mappings.",
        verificationLevel: "repository_verified",
        repoRef: "lib/verification.ts#SUSPICIOUS",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PM — רשומת PLKO (נושא 11, רשימת פעולות)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "בבלופרינט ההגירה של PM (הנגזר מחוברת העבודה SAP_PM_ECC6_to_S4_Migration.xlsx) מופיע CARO_TASKLIST_READ " +
          "תחת טבלת PLKO בתיאור 'קריאת רשימת פעולות', לצד BAPI_TASKLIST_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PLKO",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "מודול הפונקציה CARO_TASKLIST_READ מתועד רק בנתוני המאגר, כרשומה מסומנת inferred, ולא נמצא אף מקור SAP " +
        "רשמי הנוקב בשמו. קיומו, הממשק שלו וזמינותו ב-S/4HANA טרם אומתו.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לאמת קיום וממשק ב-SE37 במערכת S/4HANA חיה (או דרך חיבור SAP MCP כשיהיה זמין). עד אז להציג את הרשומה " +
        "כדורשת אימות, לא להציג את יכולות ה-FM כעובדה, ולהפנות את המשתמש לעצמים המאומתים סביבו: PLKO/PLPO " +
        "ו-IA05/IA08.",
    },
    xrefs: ["table:PLKO", "table:PLPO", "tx:IA05", "tx:IA08", "fm:BAPI_TASKLIST_CREATE"],
    lastVerifiedAt: DATE2,
    notes:
      "לא נמצא תיעוד רשמי. שני ניסוחי חיפוש בשירות החיפוש של SAP Help‏ (SAP_S4HANA_ON-PREMISE) בתאריך 2026-09-02 " +
      "ועוד חיפוש רשת מוגבל לדומיינים help.sap.com, api.sap.com, fioriappslibrary.hana.ondemand.com, " +
      "fal.cloud.sap לא החזירו אף עמוד שכותרתו או התקציר שלו נוקבים בשם CARO_TASKLIST_READ. עמוד ההגירה הרשמי של " +
      "רשימת פעולות כללית ב-PM‏ (S/4HANA 2025 FPS01) נוקב ב-CNV_PE_S4_PM_EAM_TASKLIST_DEP ולא במודול זה. בדיקה " +
      "במערכת חיה (SE37) לא התאפשרה — חיבור sc4sap MCP נכשל בסשן זה. לכן: אין אישור קיום רשמי, אין טענת סטטוס " +
      "(זמין/הוחלף/הוצא משימוש), אין יורש, והרמה נשארת verification_required; הרקורד נשמר כהקשר מהבלופרינט בלבד. " +
      "חוסר עקביות פנימי במאגר: data/transactions.ts‏ (IA05), ‏data/troubleshooting-ext2.ts‏ " +
      "(tasklist-not-in-plan) ו-data/domains.ts מציגים את המודול כשמיש, בעוד lib/verification.ts מסווג את התבנית " +
      "^CARO_ כחשודה ו-data/function-intel.ts מסמן inferred: true; בנוסף data/academy/lessons/pm-generated.ts " +
      "מסמן את הרפרנס בתווית trust ‏'verified-docs' שחיפושי הסשן לא שחזרו — הסתירות נרשמו גם בקובץ התור. שדות " +
      "product/edition בראיות המאגר הם הקשר הרשומה בפרויקט; הקבצים עצמם אינם טוענים מהדורה.",
  },

  /* -------------------------------------------- fm:CATALOG_PROFILE_READ */
  {
    id: "fm:CATALOG_PROFILE_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Catalog Profile | Notifications (CS-CM-SN/PM-WOC-MN)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7f05ca069f8744759f48892c6d307fab/6c11bf532e64b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "התיעוד הרשמי של S/4HANA מגדיר את פרופיל הקטלוג: הוא מציין אילו קבוצות קוד יש להשתמש בהן ('which code " +
          "groups should be used', כלשון הסניפט) עבור אובייקט ייחוס מסוים בהודעות אחזקה/שירות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Catalog Profile | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/d1012f86677c47d083e0601f67850d0e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "‏S/4HANA מציע API רשמי מסוג OData בשם 'Catalog Profile - Read' עם פעולות GET, למשל Get All Catalog " +
          "Profiles דרך ‎/sap/opu/odata4/sap/api_catalogprofile (לפי הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Get Single Catalog Profile | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/0d119276ff6e4cc5bd5ee3439db0da27.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "פעולת Get Single Catalog Profile של ה-API מקבלת את MaintNotifCatalogProfile כמאפיין חובה (לפי הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Catalog Profile | Notifications (CA-NO)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.06.latest",
        url: "https://help.sap.com/docs/SAP_ERP/4c76355840064bd48d4336fea9c87809/b30ec55398dd1f4be10000000a174cb4.html?version=6.06.latest",
        accessedAt: DATE2,
        claim:
          "מושג פרופיל הקטלוג מתועד רשמית גם ב-SAP ERP‏ (6.0 EHP6): הסניפט קובע 'Standard catalog profile — This " +
          "is the catalog profile assigned to a notification type...'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט — CATALOG_PROFILE_READ",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר: ה-FM קורא פרופיל קטלוג (קבוצות קוד מותרות לפגם/סיבה/פעילות לפי סוג הודעה/אובייקט), מודול " +
          "PM, בזיקה ל-QS41 ולטבלאות QPGR/QPCD; מסומן זמין ב-ECC וב-S/4HANA — ברשומת המאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CATALOG_PROFILE_READ",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PM — רשומת T352B",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "‏CATALOG_PROFILE_READ מופיע בדאטהסט ההגירה המחולל של PM בין ה-BAPIs/FMs של רשומת הטבלה T352B.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#T352B",
      },
      {
        sourceType: "repository",
        sourceTitle: "שיעור ה-QM המחולל של הפרויקט — רפרנסים לאובייקטים",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "שיעור QM במאגר מונה את CATALOG_PROFILE_READ כ-FM לקריאת פרופיל קטלוג (קבוצות קוד/קודים לפי סוג הודעה), " +
          "לצד QPK1_CODE_TEXT_READ.",
        verificationLevel: "repository_verified",
        repoRef: "data/academy/lessons/qm-generated.ts#CATALOG_PROFILE_READ",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "פונקציית מודול לקריאת פרופיל קטלוג בהודעות תחזוקה (תחזוקת מפעל) ואיכות: אילו קבוצות קוד וקודים מותרים " +
        "לסוג הודעה או לאובייקט טכני. הזמינות ב-ECC וב-S/4HANA מבוססת על נתוני המאגר המאומתים בלבד; אף מקור רשמי " +
        "אינו מכריז על החלפה או הוצאה משימוש. מושג פרופיל הקטלוג מתועד רשמית ב-S/4HANA 2025 FPS01, וקיים API " +
        "רשמי מסוג OData בשם Catalog Profile - Read לקריאת פרופילי קטלוג.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "דורש אימות במערכת SAP חיה (SE37): פרמטרים מדויקים וזמינות בפועל של ה-FM. לפיתוחים וממשקים חדשים מומלץ " +
        "לבחון את ה-API הרשמי Catalog Profile - Read ‏(OData v4), המתועד ב-APIs for Maintenance Management.",
    },
    xrefs: ["tx:QS41", "table:QPGR", "table:QPCD", "table:T352", "fm:QPK1_CODE_TEXT_READ", "fm:T352_READ"],
    lastVerifiedAt: DATE2,
    notes:
      "עובדות ברמת ה-FM נשארות 'נדרש אימות': חיפוש ישיר של \"CATALOG_PROFILE_READ\" בשירות החיפוש של SAP Help ‏" +
      "(On-Premise) החזיר בהרצה החוזרת של 2026-09-02 שתי תוצאות בלבד, שאף אחת מהן אינה מזכירה את ה-FM, וחיפוש " +
      "רשת מוגבל לדומיינים הרשמיים (help.sap.com / api.sap.com / fioriappslibrary / fal) לא העלה עמוד רשמי הנוקב " +
      "בשם. חתימת ה-FM וסטטוס השחרור ניתנים לאישוש רק במערכת חיה (SE37) — חיבור sc4sap נכשל בסשן זה. מה שכן " +
      "מאומת רשמית: אובייקט פרופיל הקטלוג העסקי (S/4HANA On-Premise 2025.001 וכן SAP ERP 6.06) ו-API רשמי " +
      "'Catalog Profile - Read' ‏(OData) עם פעולות GET ומפתח חובה MaintNotifCatalogProfile. אף מקור רשמי אינו " +
      "מציג את ה-OData API כיורש של ה-FM, ולכן לא נטענת החלפה והיורש נשאר ריק; טענת הזמינות היא " +
      "repository_verified בלבד (data/function-intel.ts). שתי התוצאות הלא-קשורות מהחיפוש הישיר לא צוטטו.",
  },

  /* ------------------------------------------ fm:CO_BT_ORDER_TYPE_CHECK */
  {
    id: "fm:CO_BT_ORDER_TYPE_CHECK",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle:
          'help.sap.com search (SAP_S4HANA_ON-PREMISE): "CO_BT_ORDER_TYPE_CHECK", "CO_BT_ORDER_TYPE_CHECK ' +
          'function module"; domain-restricted WebSearch on official SAP domains',
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ממצא שלילי: אף עמוד SAP רשמי (רשומות חיפוש Help Portal, ‏Business Accelerator Hub, ספריית Fiori) אינו " +
          "נוקב בשם CO_BT_ORDER_TYPE_CHECK; כל התוצאות שהוחזרו אינן קשורות. קיום, ממשק וזמינות ב-S/4HANA אינם " +
          "מאומתים רשמית.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "דאטהסט הפרויקט מתאר את ה-FM כבדיקת תקינות סוג פקודה (AUART/מפעל) לפני יצירת פקודה באחזקה/ייצור, " +
          "בזיקה לטבלאות T003O ו-T399X; הרשומה מסומנת במפורש inferred: true ומורה לאמת ב-SE37 ב-ECC וב-S/4HANA. " +
          "אינה ראיה לקיום.",
        verificationLevel: "verification_required",
        repoRef: "data/function-intel.ts#CO_BT_ORDER_TYPE_CHECK",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PM — רשומת T003O (סוגי פקודות)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "דאטהסט ההגירה המחולל של PM מקשר את CO_BT_ORDER_TYPE_CHECK ('בדיקת תקינות סוג פקודה') לטבלת " +
          "ה-Customizing‏ T003O, לצד ORDER_TYPE_READ; השיוך מאומת מול הדאטהסט בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#T003O",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PP-PI — רשומת T003O (סוגי פקודות)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "דאטהסט ההגירה המחולל של PP-PI מונה את CO_BT_ORDER_TYPE_CHECK ('בדיקת סוג פק\"ע') תחת טבלת T003O; " +
          "השיוך מאומת מול הדאטהסט בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#T003O",
      },
      {
        sourceType: "repository",
        sourceTitle: "מרכז הדיבוג של הפרויקט — נתיב Debug לשמירת פקודת אחזקה",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "תוכן הדיבוג של הפרויקט מציע נקודת עצירה ב-CO_BT_ORDER_TYPE_CHECK בניתוח שמירת פקודת אחזקה (IW32); " +
          "הנחיית שימוש בלבד, לא ראיה לקיום ה-FM או לממשק שלו.",
        verificationLevel: "repository_verified",
        repoRef: "data/centers/debugging.ts#pm-order-save",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "מודול פונקציה (ככל הנראה פנימי, על פי מוסכמת השמות CO_BT_*; לא אומת) המתואר במאגר הפרויקט כבדיקת תקינות " +
        "סוג פקודה (AUART) מול מפעל, המשויך לטבלת T003O בתהליכי פקודות ייצור ותחזוקת מפעל (כולל תעשיות " +
        "תהליכיות). לא נמצא תיעוד רשמי ציבורי ב-SAP Help או ב-Business Accelerator Hub עבור מודול זה, ולכן " +
        "קיומו, הממשק שלו וזמינותו ב-S/4HANA דורשים אימות במערכת SAP.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "אימות במערכת SAP: בדיקת קיום המודול והממשק ב-SE37‏ (ECC וגם S/4HANA) ו-Where-Used. עד לאימות אין להציג " +
        "פרמטרים, סטטוס החלפה או מחליף.",
    },
    xrefs: ["table:T003O", "table:T399X", "fm:ORDER_TYPE_READ"],
    lastVerifiedAt: DATE2,
    notes:
      "אין ראיה רשמית ל-FM זה. נבדק 2026-09-02: (1) חיפוש JSON של help.sap.com‏ (SAP_S4HANA_ON-PREMISE) בשתי " +
      "וריאציות שאילתה — כ-15 ו-21 תוצאות (המונים משתנים מעט בין הרצות; אומת מחדש 2026-09-02: 15 ו-21), אף אחת " +
      "אינה נוקבת ב-FM בכותרת או בתקציר; (2) חיפוש רשת מוגבל לדומיינים help.sap.com / api.sap.com / " +
      "fioriappslibrary / fal / support.sap.com / me.sap.com — אף תוצאה אינה נוקבת בשם; (3) בביקורת נבדק גם " +
      "המוצר SAP_ERP‏ (ECC) בשירות החיפוש — שלילי אף הוא. ההערכה שמודולי CO_BT_* הם רוטינות פנימיות " +
      "(לא-משוחררות) של Business Transaction בפקודות ייצור/אחזקה היא ידע מקצועי, לא מקור מצוטט, ועקבית עם " +
      "ההחמצה. רובד המאגר נושא רק רשומת העשרה מסומנת inferred‏ (data/function-intel.ts) ושיוכי T003O מחוללים " +
      "ב-PM וב-PP-PI. מה חסר לשדרוג: עמוד או Note רשמי הנוקב בשם ה-FM, או בדיקת מערכת חיה (SE37/Where-Used) — " +
      "חיבור sc4sap MCP נכשל בסשן זה. לא ניתן לטעון replaced/deprecated/not_available ללא מקור רשמי הנוקב ביורש; " +
      "sap_official_verified אינו בר-השגה עם המקורות הנוכחיים.",
  },

  /* -------------------------------------------- fm:CO_ZF_OPERATIONS_READ */
  {
    id: "fm:CO_ZF_OPERATIONS_READ",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PM (דאטהסט מחולל) — רשומת AFVC",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "חוברת המיגרציה של תחזוקת מפעל מקשרת את CO_ZF_OPERATIONS_READ לטבלת AFVC בתיאור 'קריאת פעולות הפקודה', " +
          "לצד BAPI_ALM_ORDER_MAINTAIN.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#AFVC",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המודיעין בפרויקט מתארת את ה-FM כקריאת פעולות פקודה (AFVC/AFVV) לפי AUFNR, אך מסומנת במפורש " +
          "inferred: true עם הנחיה לאמת ב-SE37 וב-S/4; אינה אישור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CO_ZF_OPERATIONS_READ",
      },
      {
        sourceType: "sap_help",
        sourceTitle: 'SAP Help search: "CO_ZF_OPERATIONS_READ" — no matching document',
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://help.sap.com",
        accessedAt: DATE2,
        claim:
          "חיפוש SAP Help ‏(SAP_S4HANA_ON-PREMISE, כולל שתי וריאציות שאילתה) וחיפוש מוגבל לדומיינים help.sap.com " +
          "/ api.sap.com / fioriappslibrary לא החזירו אף מסמך שכותרתו או הקטע שלו מזכיר את ה-FM.",
        verificationLevel: "verification_required",
      },
    ],
    xrefs: ["table:AFVC", "tx:IW33", "fm:CO_ZF_ORDER_HEADER_READ", "fm:CO_ZF_ORDER_ITEM_READ", "fm:BAPI_ALM_ORDER_MAINTAIN"],
    lastVerifiedAt: DATE2,
    notes:
      "אין תיעוד רשמי ציבורי ל-FM זה: חיפוש SAP Help ‏(on-premise) ו-WebSearch מוגבל לדומיינים הרשמיים לא העלו " +
      "אף מסמך ששמו או הקטע שלו כולל את CO_ZF_OPERATIONS_READ; דף SUPPORT_CONTENT של COOIS נבדק ב-WebFetch והוא " +
      "מעטפת יישום ללא גוף טקסט. ה-MCP למערכת SAP חיה (sc4sap) לא התחבר בסשן זה, ולכן לא בוצעה בדיקת SE37 " +
      "בפועל. שם ה-FM קיים רק בנתוני הפרויקט: בחוברת המיגרציה של תחזוקת מפעל (טבלת AFVC) וברשומת function-intel " +
      "המסומנת inferred. חסר לאימות: קיום ה-FM ב-SE37, קבוצת הפונקציות, פרמטרי הממשק (AUFNR, טבלת הפעולות) " +
      "וזמינותו ב-S/4HANA. אין לקבוע סטטוס הוצאה משימוש, החלפה או אי-זמינות ללא מקור רשמי הנוקב במחליף, ולכן לא " +
      "נכתב סטטוס והרמה verification_required ברמת ה-FM. עמוד תהליך PM-7 וטבלת AFVV נזכרים כהקשר בלבד ואינם " +
      "ב-xrefs‏ (process אינו סוג מזהה קנוני, ו-AFVV אינה ביקום המזהים של הדאטהסט). ערך edition בראיות המאגר " +
      "נגזר מהקשר ההמרה ECC6 ל-S/4 של הבלופרינט (מבוסס SUM); המקורות עצמם אינם נוקבים במהדורה — רק שורת החיפוש " +
      "הרשמית תחומה ל-On-Premise. מבוסס על קובץ / דורש אימות במערכת SAP.",
  },

  /* -------------------------------------------------- fm:CP_RECIPE_READ */
  {
    id: "fm:CP_RECIPE_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Master Recipe | Logistics — General (LO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/2b92b215838249038d290f5041e78836.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "האובייקט העסקי מתכון אב (Master Recipe) מתאר תהליך ארגוני בתעשיות תהליכיות, ללא זיקה להזמנה מסוימת " +
          "('the description of an enterprise-specific process in process industries, that does not relate to a " +
          "specific order'). הראיה מאמתת את האובייקט הנקרא בלבד, לא את מודול הפונקציה CP_RECIPE_READ.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Routings for Configurable Materials | Variant Configuration (LO-VC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a73402f511734e6eac56063e631bf24e/d362b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "לפי העמוד: 'In the processing industries, master recipes are used instead of task lists' — בתעשיות " +
          "התהליך משתמשים במתכוני אב במקום רשימות פעולות (task lists; העמוד עצמו משווה 'routing (or task list)'). " +
          "העמוד תומך בשמירת ההבחנה בין מתכון אב לבין Routing.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום הפונקציות המועשר של הפרויקט (function-intel)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "הפרויקט מתעד את CP_RECIPE_READ כמודול פונקציה של PP-PI לקריאת מתכון אב: פעולות, שלבים (Phases) " +
          "והוראות תהליך. קלט PLNTY/PLNNR, טבלאות קשורות PLKO/PLPO, טרנזקציה C203. הזמינות ב-ECC וב-S/4HANA " +
        "רשומה בנתוני הפרויקט בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CP_RECIPE_READ",
      },
      {
        sourceType: "repository",
        sourceTitle: "מאגר הנתונים שנוצר מחוברות ההגירה (PP-PI) — רשומת PLKO",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "חוברת ההגירה של PP-PI מציינת את CP_RECIPE_READ בשם 'קריאת מתכון ייצור' על רשומת הטבלה PLKO (כותרת " +
          "מתכון אב, PLNTY='2'), לצד Fiori‏ Manage Master Recipes.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#PLKO",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (tx-intel) — C201",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ברמת הפרויקט: C201 יוצר מתכון אב מבוסס Operations ו-Phases‏ (Task List Type 2, ‏PLKO/PLPO), בניגוד " +
          "ל-Routing שנוצר ב-CA01 בייצור בדיד. מחזק את ההבחנה מתכון אב מול Routing.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#C201",
      },
    ],
    xrefs: ["fm:CP_DI_OPERATION_READ", "fm:BAPI_ROUTING_GETDETAIL", "tx:C201", "tx:C203", "table:PLKO", "table:PLPO"],
    lastVerifiedAt: DATE2,
    notes:
      "שם מודול הפונקציה CP_RECIPE_READ לא נמצא באף מקור רשמי: חיפוש שירות העזרה של SAP Help (שתי וריאציות " +
      "שאילתה ב-SAP_S4HANA_ON-PREMISE ואחת ב-SAP_S4HANA_CLOUD, ‏2026-09-02) החזיר לשאילתת השם 3 רשומות What's " +
      "New כלליות (SAP S/4HANA 1709) עם תקצירים ריקים, ללא אזכור השם בכותרת או בתקציר; חיפוש מוגבל דומיינים על " +
      "help.sap.com, api.sap.com, fioriappslibrary ו-fal.cloud.sap לא החזיר תיעוד לשם הזה. לכן קיום המודול, " +
      "הממשק שלו (פרמטרים), מצב השחרור והזמינות ב-S/4HANA נשארים ברמת verification_required, ולא נכתב סטטוס: " +
      "אין מקור רשמי שקובע replaced/deprecated/not_available ואין מקור רשמי שמציין מחליף. מה שחסר בדיוק: אימות " +
      "SE37/מערכת חיה או דף רשמי (SAP Help / api.sap.com) שנוקב בשם CP_RECIPE_READ. הראיות הרשמיות שצורפו " +
      "מאמתות רק את ההקשר: אובייקט מתכון האב בתעשיות תהליכיות ואת ההבחנה מתכון אב מול Routing, ויש לשמר הבחנה " +
      "זו בכל ניסוח (מתכון אב = PP-PI, ‏Task List Type 2; ‏Routing = ייצור בדיד). נתוני המאגר (function-intel, " +
      "sapData.pppi, tx-intel) הם Tier-2 בלבד ואין לסמנם כרשמיים.",
  },

  /* -------------------------------------------- fm:CM_FV_PROD_VERS_READ */
  {
    id: "fm:CM_FV_PROD_VERS_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Production Versions | Product Master",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/31c5bf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תיעוד רשמי של 2025 FPS01 לאובייקט גרסת הייצור: ‏'a production version determines the various " +
          "production techniques that can be used to produce a material'. הקשר דומייני בלבד; הסניפט אינו נוקב " +
          "בשם מודול הפונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production version | Migration Objects for SAP S/4HANA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/d3a3eb7caa1842858bf0372e17ad3909/eacf3a5d51224118a4e480911569d19e.html?locale=en-US&state=PRODUCTION&version=2021.002",
        accessedAt: DATE2,
        claim:
          "‏Production Version הוא אובייקט הגירה זמין ב-S/4HANA‏ ('Available Migration Objects in SAP S/4HANA ... " +
          "Related Business Object: Production Version'). הקשר דומייני בלבד; הסניפט אינו נוקב בשם מודול " +
          "הפונקציה.",
        verificationLevel: "sap_official_verified",
      },
      CMFV_INTEL,
      {
        sourceType: "repository",
        sourceTitle: "ספריית הטרנזקציות של הפרויקט — רשומת C223",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת C223 (תחזוקת גרסאות ייצור, MKAL) מונה את CM_FV_PROD_VERS_READ לצד BAPI_PRODVERS_CREATE_REPLACE " +
          "בין מודולי הפונקציה הקשורים.",
        verificationLevel: "repository_verified",
        repoRef: "data/transactions.ts#C223",
      },
      {
        sourceType: "repository",
        sourceTitle: "היבטי נתוני האב של PP-PI — היבט גרסת הייצור",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "היבט נתוני האב של גרסת ייצור (טבלאות MKAL/PLKO/MARC/MAST, ‏CDS‏ I_ProductionVersion) מונה את " +
          "CM_FV_PROD_VERS_READ בין ה-BAPIs/FMs שלו.",
        verificationLevel: "repository_verified",
        repoRef: "data/pppi-master-data-facets.ts#MKAL",
      },
      {
        sourceType: "repository",
        sourceTitle: "תרחישי פתרון התקלות של הפרויקט — בחירת גרסת ייצור",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "תרחיש פתרון התקלות של בחירת גרסת ייצור שגויה (C223/MD04/OPL8, טבלת MKAL) מונה את CM_FV_PROD_VERS_READ " +
          "כמודול פונקציה לניתוח.",
        verificationLevel: "repository_verified",
        repoRef: "data/troubleshooting-ext2.ts#production-version-selection",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "לפי נתוני הפרויקט (רשומה המסומנת inferred): פונקציה לקריאת גרסאות ייצור (MKAL) לפי חומר ומפעל, בהקשר " +
        "C223 ותעשיות תהליכיות. קיום הפונקציה והממשק שלה לא אותרו באף מקור SAP רשמי ציבורי שנבדק, ולכן נדרש " +
        "אימות במערכת SAP ‏(SE37) לפני כל שימוש בנתון.",
      edition: "on-premise",
      release: null,
      source: CMFV_INTEL,
      recommendedAction:
        "אימות ב-SE37 במערכת חיה: קיום הפונקציה, סטטוס שחרור (Released) ופרמטרים. עד אז אין להציג זמינות " +
        "ב-S/4HANA כעובדה מאומתת; להצגה רשמית של הדומיין השתמשו בתיעוד Production Versions ב-help.sap.com.",
    },
    xrefs: ["tx:C223", "table:MKAL", "fm:BAPI_PRODVERS_CREATE_REPLACE", "cds:I_ProductionVersion"],
    lastVerifiedAt: DATE2,
    notes:
      "אף מקור רשמי אינו נוקב בשם ה-FM. נבדק 2026-09-02: (1) חיפוש שירות העזרה " +
      "\"CM_FV_PROD_VERS_READ production version\"‏ (21 תוצאות) והשם המדויק (9 תוצאות) — אף כותרת או תקציר אינם " +
      "מזכירים את ה-FM; ההתאמות היו עמודי נושא כלליים של גרסת ייצור ועמודי What's New, שאינם ברי-ציטוט עבור " +
      "ה-FM; (2) חיפוש רשת מוגבל ל-help.sap.com / api.sap.com / fioriappslibrary / fal, רגיל ובמירכאות — אף " +
      "עמוד רשמי אינו נוקב בשם. SAP Help אינו מפרסם תיעוד פר-מודול ל-FM קלאסי זה של PP; הדבר ניתן לאישוש רק " +
      "ב-SE37/מערכת חיה, וחיבור ה-MCP‏ sc4sap נכשל בסשן זה (לפי כללי ה-fallback של MANIFEST עובדות ממשק כאלה " +
      "נשארות 'נדרש אימות'). רובד Tier-2 עקבי בחמישה קבצים (function-intel — עצמו מסומן inferred: true, " +
      "transactions#C223, ‏pppi-master-data-facets, ‏troubleshooting-ext2, ‏knowledge/object-intel#MKAL): ה-FM " +
      "קורא גרסאות ייצור (MKAL) לפי חומר/מפעל. לא נטענת החלפה או הוצאה משימוש ולכן אין יורש. הראיות הרשמיות " +
      "שצורפו מכסות את הדומיין בלבד (הגדרה, אובייקט הגירה), לא את ה-FM. אפליקציית ה-Fiori‏ 'Manage Production " +
      "Versions' אינה ב-xrefs: מזהה האפליקציה אינו עקבי במאגר (F2568 ב-data/library/fiori-apps.json מול F2703 " +
      "ב-data/sapData.pppi.ts) ואף מזהה לא אומת מול SAP בסשן זה — נרשם בקובץ התור. תווית ה-trust‏ " +
      "'verified-docs' על רפרנס ה-FM ב-data/academy/lessons/pp-generated.ts לא שוחזרה בחיפושי הסשן — נרשם בקובץ " +
      "התור.",
  },

  /* -------------------------------------------- fm:CR_COST_CENTER_READ */
  {
    id: "fm:CR_COST_CENTER_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Read Work Center Cost Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/6934e7f603234b848d9a48c2331cd12f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "ב-S/4HANA On-Premise קוראים את מרכז העלות של מרכז עבודה דרך ה-Work Center OData API‏: HTTP GET על " +
          "ישות WorkCenterCostCenter (הסניפט: 'To retrieve the workcenter Cost Center, you use the HTTP method " +
          "GET in the WorkCenterCostCenter entity').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Work Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/befc0d2c369c4d92a1ced6d6dc26a2e4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "שירות ה-OData V4‏ api_work_center חושף פעולת GET בשם 'Read Work Center Cost Center' (הסניפט מציג " +
          "GET ‏<host>/sap/opu/odata4/sap/api_work_center/srvd_a2x/sap/workcenter/0001/WorkCenterCostCenter" +
          "(WorkCenterInternalID=...)).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/62ec4758c3f90a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "ישות ה-API‏ 'Cost Center Allocation (A_WorkCenterCostCenter)' מחזיקה מידע על הקצאות מרכז העלות של " +
          "מרכז עבודה או משאב (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Work Center | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/f7e7144c65a647c3a68d84db06bc54c4.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE2,
        claim:
          "‏Work Center OData V4 API (יצירה, קריאה ועדכון של מרכזי עבודה) נמסר כחדש ב-SAP S/4HANA 2021 (הסניפט: " +
          "'you can create, read, and update work centers using an API service based on OData V4 protocol').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Linking of Cost Centers and Business Processes | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/cd94d7531a4d414de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "הכלל העסקי שמאחורי נתוני ה-FM‏: 'A work center can only be assigned to one cost center. However, you " +
          "can assign more than one work center to a cost center' (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PP-PI — רשומת CRCO (נושא 5, משאבים)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "חוברת ההגירה המאומתת של PP-PI מונה את CR_COST_CENTER_READ ('קריאת שיוך מרכז עלות') כ-FM הקריאה המשויך " +
          "לטבלת CRCO (שיוך מרכז עבודה למרכז עלות; טרנזקציות CR01/CR02/KS01; הערת S/4: הנהלת חשבונות ב-ACDOCA, " +
          "השיוך נשמר).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#CRCO",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מודיעין המאגר מתאר את ה-FM כקורא את שיוך מרכז העלות / סוג הפעילות של מרכז עבודה או משאב מ-CRCO (קלט " +
          "OBJID + תאריך; בזיקה ל-CR03 ול-CRCO), ומסמן את הרשומה במפורש inferred: true עם 'אמת ב-SE37' בהערת " +
          "ה-ECC.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CR_COST_CENTER_READ",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "מודול פונקציה לקריאת שיוך מרכז עלות וסוג פעילות של מרכז עבודה או משאב (טבלת CRCO) בתעשיות תהליכיות. " +
        "השם CR_COST_CENTER_READ לא אותר בחיפושים בתיעוד SAP הרשמי הפומבי, ולכן זמינותו ב-S/4HANA טעונה אימות " +
        "במערכת (SE37). נתיב רשמי מתועד לקריאת מרכז העלות של מרכז עבודה ב-S/4HANA הוא Work Center OData API, " +
        "ישות WorkCenterCostCenter.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לאמת קיום וזמינות ב-SE37 במערכת חיה; לאינטגרציות חדשות להעדיף את Work Center OData API (ישות " +
        "WorkCenterCostCenter / A_WorkCenterCostCenter), הזמין החל מ-S/4HANA 2021.",
    },
    xrefs: ["table:CRCO", "table:CRHD", "table:CSLA", "fm:CR_WORK_CENTER_READ", "cds:I_WorkCenterCostCenter", "tx:CR03"],
    lastVerifiedAt: DATE2,
    notes:
      "אף עמוד help.sap.com או api.sap.com אינו נוקב בשם ה-FM‏ CR_COST_CENTER_READ (שלוש וריאציות חיפוש בשירות " +
      "החיפוש של Help ועוד חיפוש רשת מוגבל דומיינים; כל הפגיעות בשם היו התאמות שווא, למשל API_COSTCENTER_SRV‏ " +
      "'Cost Center - Read (A2X)' — נתוני אב של מרכז עלות, לא ה-FM הזה). מודולי CR* קלאסיים הם אובייקטי " +
      "Workbench ללא תיעוד ציבורי, ולכן לא ניתן לטעון סטטוס או החלפה רשמיים: הסטטוס נשאר 'נדרש אימות' ללא יורש. " +
      "בדיקת מערכת חיה (SE37 / Where-Used) לא התאפשרה — חיבור ה-MCP‏ sc4sap נכשל בסשן זה. מה שכן מאומת רשמית " +
      "(2025.001): נתיב הקריאה המודרני לאותם נתונים — Work Center OData V4 API, ישות WorkCenterCostCenter / " +
      "A_WorkCenterCostCenter, שנמסר חדש ב-S/4HANA 2021; זוהי חלופה, לא החלפה מתועדת של ה-FM. רובד המאגר מאשר " +
      "שהחוברת קושרת את ה-FM ל-CRCO; רשימת הפרמטרים ב-data/function-intel.ts מסומנת inferred: true ואין להציגה " +
      "כמאומתת. סתירה: data/academy/lessons/pp-generated.ts (שתי רשומות עם תווית trust‏ 'verified-docs' שמקורן " +
      "'SAP Help Portal — Production Planning (S/4HANA)') מציג את ה-FM כמתועד, בעוד שאף עמוד Help ציבורי אינו " +
      "נוקב בשמו — התווית מפריזה על הראיות; נרשם גם בקובץ התור. שם השירות api_work_center נשאר בטקסט בלבד ואינו " +
      "ב-xrefs (אין סוג מזהה קנוני ל-API).",
  },

  /* ---------------------------------------- fm:CVI_VENDOR_TO_BP_CONVERT */
  {
    id: "fm:CVI_VENDOR_TO_BP_CONVERT",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Business Partner Approach (Customer/Supplier Integration) | SAP Business Partner",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/74b0b157c81944ffaac6ebc07245b9dc/25b46c8241fd4852bf7876d87bed8fd0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "גישת השותף העסקי (Customer/Supplier Integration) מתועדת רשמית כנושא הרלוונטי בעיקר ללקוחות העוברים " +
          "מ-SAP ERP ל-SAP S/4HANA; תחזוקת לקוח/ספק מתבצעת דרך השותף העסקי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "SAP Business Partner | SAP Business Partner",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/74b0b157c81944ffaac6ebc07245b9dc/45653b5856de0846e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "העמוד הרשמי מפנה ל-SAP Note 2265093 עבור גישת השותף העסקי ו-CVI ועבור פעילויות המרת שותף עסקי מ-SAP " +
          "ERP ל-SAP S/4HANA (מספר ההערה נקרא מהסניפט הרשמי עצמו).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Supplier | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/db7415b7245c42f9889b6f7bacca5606.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תנאי מקדים רשמי להגירת ספקים: הגדרת כל ה-Customizing המחייב של customer-vendor integration ‏(CVI) " +
          "במערכת היעד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Partner Conversion Activities (Document Version 5.0, 2020-04-08)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1610",
        url: "https://help.sap.com/doc/f2ca09fbcb444d0c906dedacc1775288/1610/en-US/loiocef3a8570239a30be10000000a44147b.pdf",
        accessedAt: DATE2,
        claim:
          "המסמך הרשמי קובע שכל הלקוחות והספקים חייבים להיות מומרים לשותף עסקי לפני ההמרה, ומציג ככלים הרשמיים " +
          "את MDS_LOAD_COCKPIT ‏(Synchronization Cockpit), את הדוחות CVI_UPGRADE_CHECK_RESOLVE ‏(SAP Note " +
          "2344034) ו-PRECHECK_UPGRADATION_REPORT ‏(SAP Note 2211312) ואת טבלאות הקישור CVI_VEND_LINK " +
          "ו-CVI_CUST_LINK (מספרי ההערות נקראו מגוף המסמך).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Partner Conversion Activities (Document Version 5.0, 2020-04-08)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1610",
        url: "https://help.sap.com/doc/f2ca09fbcb444d0c906dedacc1775288/1610/en-US/loiocef3a8570239a30be10000000a44147b.pdf",
        accessedAt: DATE2,
        claim:
          "השם CVI_VENDOR_TO_BP_CONVERT אינו מופיע בטקסט המלא של מסמך פעילויות ההמרה הרשמי (נבדק בקובץ המלא, " +
          "אפס מופעים), וחיפוש help.sap.com אינו מחזיר אף עמוד רשמי המזכיר שם זה. קיום הפונקציה, הפרמטרים שלה " +
          "ומעמדה דורשים אימות במערכת SAP.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Synchronization Cockpit | SAP S/4HANA and SAP S/4HANA Cloud Private Edition",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e6d301d54584a33cd04a9861bc52/cea0c753b1081d4be10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE2,
        claim:
          "ה-Synchronization Cockpit (טרנזקציה MDS_LOAD_COCKPIT) הוא ממשק המשתמש לסנכרון נתוני אב במערכת SAP " +
          "(כלשון הסניפט); לפי מסמך פעילויות ההמרה הרשמי (הראיה הקודמת) ניתן להשתמש בו להמרת נתוני לקוח/ספק " +
          "לשותף עסקי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום הפונקציות המועשר של הפרויקט (function-intel)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר מתארת את המזהה כהמרת ספק (LFA1) לשותף עסקי במסגרת CVI, צעד חובה בהכנת נתוני אב להמרה, עם " +
          "קישור ל-MDS_LOAD_COCKPIT‏, MDS_PPO2‏, LFA1‏, BUT000 ו-CVI_VEND_LINK. תיאור זה קיים במאגר בלבד ואינו " +
          "נתמך באף מקור רשמי הנוקב בשם הפונקציה.",
        verificationLevel: "verification_required",
        repoRef: "data/function-intel.ts#CVI_VENDOR_TO_BP_CONVERT",
      },
    ],
    xrefs: ["tx:BP", "table:BUT000", "fm:BAPI_BUPA_CREATE_FROM_DATA"],
    lastVerifiedAt: DATE2,
    notes:
      "הנושא העסקי מאומת רשמית: בהמרה ל-S/4HANA כל הלקוחות והספקים חייבים להיות מומרים לשותף עסקי " +
      "(Customer/Vendor Integration), וזהו תנאי מקדים מתועד גם בהגירת נתוני ספקים. לעומת זאת, שם הפונקציה " +
      "CVI_VENDOR_TO_BP_CONVERT עצמו לא נמצא באף מקור רשמי: חיפוש help.sap.com אינו מחזיר עמוד המזכיר אותו, " +
      "והמסמך הרשמי Business Partner Conversion Activities נקרא במלואו ומכיל אפס מופעים של השם. המסמך נוקב " +
      "בכלים אחרים: MDS_LOAD_COCKPIT ‏(Synchronization Cockpit), הדוחות CVI_UPGRADE_CHECK_RESOLVE " +
      "ו-PRECHECK_UPGRADATION_REPORT, טבלאות הקישור CVI_VEND_LINK ו-CVI_CUST_LINK וה-BAdI ברירת המחדל " +
      "CVI_CUSTOM_MAPPER. לכן לא נכתב סטטוס: אין ראיה רשמית לקיום הפונקציה, לממשק שלה או למעמד שחרור, ואין " +
      "לקבוע replaced או not_available ללא מקור רשמי הנוקב ביורש. מה שחסר לאימות: בדיקת SE37 במערכת SAP חיה או " +
      "מקור רשמי (help.sap.com, api.sap.com, SAP Note) המזכיר את השם. סתירה: קבצי המאגר (data/function-intel.ts, " +
      "data/sapData.pppi.ts, data/sapData.pm.ts, data/ecc-s4.ts, data/troubleshooting-ext2.ts) מציגים את " +
      "הפונקציה כקיימת עם קלט ופלט, בעוד המסמך הרשמי והחיפוש אינם מזכירים אותה; מומלץ לתקן את תוכן המאגר כך " +
      "שיפנה לכלים המתועדים (MDS_LOAD_COCKPIT ודוחות ה-Pre-Check) — נרשם גם בקובץ התור. המזהים " +
      "MDS_LOAD_COCKPIT‏, MDS_PPO2‏, LFA1 ו-CVI_VEND_LINK נשארים בטקסט בלבד ואינם ב-xrefs כי אין להם מזהה " +
      "בר-פענוח בדאטהסט של הפרויקט. הערות SAP‏ 2265093, ‏2344034 ו-2211312 נקובות בגוף הטענות בלבד — מקורן " +
      "בעמודים ובמסמך הרשמיים שצוטטו; אין קישור me.sap.com נגיש ולכן שדה sapNote לא הוזן. דורש אימות במערכת SAP.",
  },

  /* ---------------------------------------- fm:BAPI_ALM_ORDER_MAINTAIN */
  {
    id: "fm:BAPI_ALM_ORDER_MAINTAIN",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "‏BAPI_ALM_ORDER_MAINTAIN משמש לעיבוד פקודות אחזקה ושירות והורחב (למשל תמיכה בפקודות שיפוץ — " +
          "Refurbishment); מתועד כשמיש ב-S/4HANA 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Functional Enhancements for Billable Maintenance Orders | What's New in SAP S/4HANA and SAP S/4HANA " +
          "Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/072a9841d72c469bbe1f3b925cce7399.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "החל מ-2025 FPS01 ניתן לערוך ולהמיר פקודות אחזקה חייבות בחיוב (Billable) באמצעות " +
          "BAPI_ALM_ORDER_MAINTAIN.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order - Read | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/be4e2d6267d844a89f99119c1d5215ef.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE2,
        claim:
          "‏API_MAINTENANCEORDER ‏(Maintenance Order - Read) הוא שירות OData נכנס סינכרוני לקריאת נתוני כותרת, " +
          "פעולות, רכיבים ורשימת אובייקטים של פקודת אחזקה.",
        verificationLevel: "sap_official_verified",
      },
      ALM_V2_OPS,
      {
        sourceType: "sap_help",
        sourceTitle:
          "BAdI: Evaluation of Maintenance Order Data Including Buffer | What's New in SAP S/4HANA and SAP " +
          "S/4HANA Cloud Private Edition 2023 FPS02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/6bf41002c3dc4701aa525d0de9094417.html?locale=en-US&state=PRODUCTION&version=2023.002",
        accessedAt: DATE2,
        claim:
          "SAP מתעדת עיבוד פקודות הן דרך ה-BAPI‏ BAPI_ALM_ORDER_MAINTAIN והן דרך ה-API מבוסס ה-RAP‏ Maintenance " +
          "Order (Version 2)‏ ('via the BAPI BAPI_ALM_ORDER_MAINTAIN via the RAP-based API Maintenance Order " +
          "(Version 2)', כלשון הסניפט); שני הממשקים מתקיימים זה לצד זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Overview | Maintenance Order (OP_API_MAINTENANCEORDER_0001)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://api.sap.com/api/OP_API_MAINTENANCEORDER_0001/overview",
        accessedAt: DATE2,
        claim:
          "‏OP_API_MAINTENANCEORDER_0001 ‏(Maintenance Order) רשום ב-SAP Business Accelerator Hub; הרישום תומך " +
          "בקיומו של ה-API הרשמי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Overview | Maintenance Order - Read (API_MAINTENANCEORDER)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://api.sap.com/api/API_MAINTENANCEORDER/overview",
        accessedAt: DATE2,
        claim: "‏API_MAINTENANCEORDER ‏(Maintenance Order - Read) רשום ב-SAP Business Accelerator Hub.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט — BAPI_ALM_ORDER_MAINTAIN",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "המאגר כבר מתעד: זמין ב-S/4HANA, חלופה מודרנית OData‏ API_MAINTENANCEORDER / Fiori‏ Manage Maintenance " +
          "Orders — עקבי עם המקורות הרשמיים.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "העשרה מאומתת: אובייקט BOR‏ BUS2007, טרנזקציות IW31/IW32/IW38, טבלאות AUFK/AFIH/AFVC/AFVV/RESB, " +
          "מונחה-שיטות דרך IT_METHODS.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_MAINTAIN",
      },
    ],
    status: {
      status: "released_api_available",
      he:
        "ה-BAPI זמין ומתועד ב-S/4HANA On-Premise עד גרסה 2025 FPS01 ליצירה ולשינוי של פקודות אחזקה (תחזוקת " +
        "מפעל). קיימת חלופת API רשמית משוחררת: OData Maintenance Order‏ (OP_API_MAINTENANCEORDER_0001) ב-SAP " +
        "Business Accelerator Hub, כולל גרסה 2 מבוססת RAP. אין תיעוד רשמי על הוצאה משימוש של ה-BAPI.",
      edition: "on-premise",
      release: "2025.001",
      source: ALM_V2_OPS,
      recommendedAction:
        "להמשיך להשתמש ב-BAPI בתרחישי אינטגרציה וטעינה קיימים; לאינטגרציות חדשות להעדיף את ה-OData API הרשמי ‏" +
        "(Maintenance Order, כולל גרסה 2), ולאמת פרטי ישויות ופרמטרים מול ה-Business Accelerator Hub (דורש מפתח " +
        "API) או מול מערכת חיה.",
    },
    xrefs: ["fm:BAPI_ALM_ORDER_GET_DETAIL", "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_ALM_NOTIF_CREATE"],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס: ה-BAPI פעיל ואינו מוצא משימוש — עמודי help.sap.com של 2025 FPS01 מתעדים שימוש פעיל והרחבות " +
      "פונקציונליות עדכניות (פקודות Billable, פקודות שיפוץ, פקודות המשך); 'קיים API משוחרר' נסמך על רישומי " +
      "api.sap.com‏ (OP_API_MAINTENANCEORDER_0001‏, API_MAINTENANCEORDER) ועל עמודי APIs for Maintenance " +
      "Management ‏(2025.001) המתעדים את שירות ה-OData כולל גרסה 2. מיפוי ה-API הוא חלופה משוחררת, לא טענת " +
      "החלפה רשמית; אף מקור רשמי אינו מוציא את ה-BAPI משימוש, ולכן אין יורש והוא נשאר בפרוזה בלבד. פרטי ישויות " +
      "ופרמטרים ברמת ה-Hub לא היו ברי-שליפה ללא מפתח API ונשארים 'נדרש אימות' לפי כללי ה-fallback של MANIFEST. " +
      "ערך edition בשתי רשומות api.sap.com נשען על מוסכמת השמות OP_ ועל מיקום החבילה ב-S/4HANA, לא על טקסט " +
      "רישום בר-ציטוט. ניואנס שמות (לא סתירת מאגר): api.sap.com מכתיר את API_MAINTENANCEORDER בשם 'Maintenance " +
      "Order - Read', בעוד help.sap.com‏ 2025.001 מתעד פעולות כתיבה תחת אותו נתיב שירות (כולל ‎;v=2); רישום " +
      "ה-Hub בעל יכולת הכתיבה ל-On-Premise הוא OP_API_MAINTENANCEORDER_0001 — יש לרשום את שני השמות; נרשם גם " +
      "בקובץ התור. רשומות המאגר (data/function-intel.ts, data/bapi-enrichment.pm.ts) עקביות עם המיפוי; לא נמצאו " +
      "סתירות מול המאגר.",
  },

  /* -------------------------------------------- fm:BAPI_PROCORD_CREATE */
  {
    id: "fm:BAPI_PROCORD_CREATE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "API_PROCESS_ORDERS - A_ProcessOrder: Create, Read, Update | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/39f02f5883fa9244e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "ה-OData API‏ API_PROCESS_ORDERS ל-On-Premise חושף את הישות A_ProcessOrder ליצירה, קריאה ועדכון של " +
          "פקודות תהליך (נקודת קצה ‎/sap/opu/odata/sap/API_PROCESS_ORDERS/A_ProcessOrder), מתועד תחת APIs for " +
          "Manufacturing לגרסת S/4HANA 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Process Order | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/42992e123a2b44f7a894e731bd9ecdb9.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE2,
        claim:
          "הסניפט: 'With this OData API (API_PROCESS_ORDERS), you can now read, create, and update process " +
          "orders.' — יכולת קריאה, יצירה ועדכון של פקודות תהליך מתועדת ב-What's New של SAP S/4HANA 2020.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Process Order (Version 2) | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ad8865210f7d4afd89c3be3650f4289e.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE2,
        claim:
          "הסניפט: 'This OData API replaces the API Process Order (API_PROCESS_ORDERS).' — הצהרת ההחלפה נוגעת " +
          "ל-OData V1 מול V2 בלבד; ה-BAPI אינו נזכר בה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Overview | Process Order (Version 2) — SAP Business Accelerator Hub",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://api.sap.com/api/API_PROCESS_ORDER_2_SRV/overview",
        accessedAt: DATE2,
        claim:
          "‏api.sap.com מפרסם עמודי יעד ל-OData API‏ 'Process Order (Version 2)' ‏(API_PROCESS_ORDER_2_SRV) " +
          "ול-API_PROCESS_ORDERS; המזהה API_PROCESS_ORDER_2_SRV נקוב בסניפטים רשמיים של What's New " +
          "ב-help.sap.com. תוכן עמודי ה-Hub עצמם אינו בר-אימות ללא מפתח API.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Process order (only open PO) | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/011bdaaa5ce047f690cb9f8319c6efed.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "אובייקט ההגירה 'PP - Process order (only open PO)' קיים: כינוי PP_PROCORD, רכיב PP-PI-POR, נתונים " +
          "תנועתיים. הסניפט המוחזר אינו נוקב ב-APIs/BAPIs שהאובייקט משתמש בהם.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Migration Object: PP - Process Order (Only Open PO) | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/e01aae9cfba24c608e22f71737d37a26.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE2,
        claim:
          "פקודות תהליך בסטטוס Created או Released ניתנות להגירה; לאחר ההגירה כל פקודות התהליך בסטטוס Created.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Segregation of Duties for Order Change and Release | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ecc7e8cbe9cd4556a0694596dc4a2347.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE2,
        claim:
          "הסניפט מונה 'Create Process Order COR1'‏, 'Change Process Order COR2'‏, 'Create Process Order w/o " +
          "Material CORO' בין טרנזקציות S/4HANA — יצירת פקודות תהליך היא פונקציה חיה ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (tx-intel) — COR1",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "‏COR1 מונה את BAPI_PROCORD_CREATE (ואת BAPI_PROCORD_CREATE_FROM_PLORD) בין ה-BAPIs שלו; ‏s4Delta: " +
          "נשמרת ב-S/4HANA‏ (PP-PI), חלופת Fiori‏ Manage Process Orders ‏(F3577). גם CORO‏ " +
          "(data/tx-intel.ts#CORO) מונה את BAPI_PROCORD_CREATE.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#COR1",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט — BAPI_PROCORD_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מתעד קלט ORDERDATA (חומר, מפעל, כמות, סוג פקודה, גרסת ייצור), פלטים ORDERNUMBERS + RETURN ודרישת " +
          "COMMIT; ‏ecc: זמין וסטנדרטי; ‏s4: זמין ב-S/4HANA עם חלופה מודרנית OData/Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_PROCORD_CREATE",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PP-PI enrichment)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת הרישום: אובייקט BOR‏ BUS2116, ‏BAPI כותב (מחייב BAPI_TRANSACTION_COMMIT), ‏releasedStatus‏ " +
          "'Released · RFC', תמיכת ECC ו-S/4 On-Premise, רצף Create ← Release ← Confirm ← Goods Movement ← " +
          "Commit.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PROCORD_CREATE",
      },
    ],
    xrefs: ["tx:COR1", "tx:CORO", "fm:BAPI_PROCORDCONF_CREATE_TT"],
    lastVerifiedAt: DATE2,
    notes:
      "הכיסוי הרשמי חזק לנתיב ה-API המודרני, אך המחרוזת BAPI_PROCORD_CREATE אינה מופיעה באף כותרת או סניפט של " +
      "help.sap.com / api.sap.com (חמש שאילתות בשירות החיפוש ועוד WebSearch מוגבל דומיינים; עמוד ההגירה של " +
      "פקודות תהליך ככל הנראה כולל סעיף APIs/BAPIs, אך גוף העמוד הוא מעטפת JS והסניפט אינו חושף אותו) — ולכן " +
      "טענות ברמת ה-BAPI (פרמטרים, שימוש בהגירה, זמינות) נשארות ברובד המאגר. לא נקבע סטטוס 'הוחלף': הצהרת " +
      "ה-replaces הרשמית היחידה (What's New 2020) היא OData V1 מול V2, לא BAPI מול OData; לא נכתב סטטוס מוסמך " +
      "והרשומה נשענת על הרישום הנגזר מרובד המאגר. הנחיה: להשאיר את ה-BAPI בתרחישי טעינה ואינטגרציה קיימים; " +
      "בפיתוחים חדשים להעדיף את ה-OData API לפקודות תהליך (Process Order גרסה 2). לא נמצאו מספרי SAP Note באף " +
      "סניפט — לא נרשמו. סתירות שנרשמו גם בקובץ התור: (1) data/function-intel.ts קרא לחלופה 'API_PROCESSORDER_2' " +
      "בעוד השם הנקוב במקורות הרשמיים הוא API_PROCESS_ORDER_2_SRV‏ ('Process Order (Version 2)') — סטיית איות " +
      "שנורמלה בכל אתרי המאגר ב-2026-09-21 (סבב 2 של ביקורת העיצוב); (2) data/bapi-enrichment.pppi.ts מסמן releasedStatus‏ 'Released · RFC' במקור 'SAP Help " +
      "Portal + SE37 metadata', אך לא נמצא עמוד Help ציבורי הנוקב בשם ה-BAPI — מצב השחרור הוא repository_verified " +
      "בלבד. ‏fm:BAPI_PROCORD_CREATE_FROM_PLORD אינו ב-xrefs כי אינו ביקום המזהים של הדאטהסט (נשאר בטקסט בלבד); " +
      "מזהה הווריאנט OP_API_PROCESS_ORDER_2_SRV_0001 שנכלל בטיוטה הוסר — אינו בר-אימות ללא מפתח Hub. תאריכי " +
      "הגישה לרשומות ה-Help הם 2026-09-02 לפי כותרת סקריפט החיפוש.",
  },

  /* ------------------------------------ fm:BAPI_ALM_NOTIF_CREATE */
  {
    id: "fm:BAPI_ALM_NOTIF_CREATE",
    aliases: ["BAPI_ALM_NOTIF_CREATE"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: 
          "אובייקט ההגירה 'PM - Maintenance notification' בתיעוד Data Migration לגרסת 2025 FPS01 נוקב " +
          "ב-BAPI_ALM_NOTIF_CREATE וב-BAPI_ALM_NOTIF_SAVE תחת 'APIs/BAPIs', לצד מודול הפונקציה " +
          "CNV_PE_S4_PM_NOTIF_CREATE (כלשון הסניפט). הסניפט מונה את השמות בלבד ואינו מתאר את אופן השימוש בהם.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Notification | What's New in SAP S/4HANA 2021",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/2fb95f8272f343e68f4bf384f1d2bfcb.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: DATE14,
        claim: 
          "רשומת What's New לגרסת S/4HANA 2021 מתעדת את ה-API כחדש (‏'API New', ‏'SAP S/4HANA 2021'): 'The " +
          "Maintenance Notification API enables you to create, read, and update data related to maintenance " +
          "notifications', בזיקה לפריטי היקף 4HH, 4HI, BH1, BH2 ו-BJ2 (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: 
          "בחוברת 'APIs for Maintenance Management' לגרסת 2025 FPS01: 'The API_MAINTNOTIFICATION API offers these " +
          "operations', ובהן Read Maintenance Notification (GET) ו-Create Maintenance Notification, תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification (כלשון הסניפט). עמוד נפרד באותה חוברת, " +
          "'Create Maintenance Notification' (loio 3ee214cf240f495cb767765d1a7f773e, 2025.001), מדגים בסניפט POST " +
          "לאותה ישות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Maintenance Notification | SAP Business Accelerator Hub",
        url: "https://api.sap.com/api/API_MAINTNOTIFICATION/resource",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "‏API_MAINTNOTIFICATION ‏(Maintenance Notification) רשום ב-SAP Business Accelerator Hub; חיפוש " +
          "מוגבל-דומיין החזיר את עמוד ה-API בכותרת 'Maintenance Notification'. הרישום תומך בקיומו של ה-API הרשמי; " +
          "רשימת הישויות והפרמטרים לא נקראה (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "released_api_available",
      he: 
        "ה-BAPI ליצירת הודעת תחזוקת מפעל נקוב ב-S/4HANA On-Premise 2025 FPS01 תחת 'APIs/BAPIs' של אובייקט ההגירה " +
        "'PM - Maintenance notification', יחד עם BAPI_ALM_NOTIF_SAVE. קיימת חלופת API רשמית משוחררת: OData " +
        "Maintenance Notification ‏(API_MAINTNOTIFICATION), חדשה מגרסת S/4HANA 2021, עם פעולות יצירה, קריאה " +
        "ועדכון, הרשומה ב-SAP Business Accelerator Hub. לא נמצא תיעוד רשמי על הוצאה משימוש של ה-BAPI.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: 
          "בחוברת 'APIs for Maintenance Management' לגרסת 2025 FPS01: 'The API_MAINTNOTIFICATION API offers these " +
          "operations', ובהן Read Maintenance Notification (GET) ו-Create Maintenance Notification, תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification (כלשון הסניפט). עמוד נפרד באותה חוברת, " +
          "'Create Maintenance Notification' (loio 3ee214cf240f495cb767765d1a7f773e, 2025.001), מדגים בסניפט POST " +
          "לאותה ישות.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: 
        "להמשיך להשתמש ב-BAPI בתרחישי אינטגרציה וטעינה קיימים, ברצף BAPI_ALM_NOTIF_CREATE ואז BAPI_ALM_NOTIF_SAVE " +
        "ואז BAPI_TRANSACTION_COMMIT על אותו חיבור RFC. לאינטגרציות חדשות (מובייל, IoT, middleware) להעדיף את " +
        "ה-OData API הרשמי API_MAINTNOTIFICATION, ולאמת ישויות ופרמטרים מול ה-Business Accelerator Hub (דורש מפתח " +
        "API) או מול מערכת חיה. לתקן את שם השירות ברשומת F1511 במאגר (API_MAINTENANCENOTIFICATION) לשם המתועד " +
        "API_MAINTNOTIFICATION.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_SAVE",
      "fm:BAPI_ALM_NOTIF_DATA_ADD",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:BAPI_TRANSACTION_COMMIT",
      "tx:IW21",
      "tx:IW22",
      "table:QMEL",
      "table:QMFE",
      "cds:I_MaintenanceNotification",
      "fiori:F1511",
      "fiori:F4604",
      "enh:badi:NOTIF_EVENT_SAVE",
      "enh:exit:QQMA0001",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "מה שאומת: שם ה-BAPI בעמוד רשמי אחד בלבד בשירות החיפוש של help.sap.com (Data Migration, אובייקט 'PM - " +
      "Maintenance notification', 2025 FPS01); שם ה-OData API‏ API_MAINTNOTIFICATION, גרסת השחרור (S/4HANA 2021) " +
      "והמשכיות התיעוד עד 2025 FPS01 (רשומות What's New לגרסאות 2022, 2023, 2023 FPS02, 2025 ו-2025 FPS01 מתעדות " +
      "הרחבות לאותו API); הרישום ב-api.sap.com. מה שלא אומת: גוף העמודים ב-help.sap.com וב-api.sap.com לא נקרא " +
      "(מעטפת JavaScript), ולכן פרמטרי ה-BAPI (NOTIF_TYPE, NOTIFHEADER, NOTIFHEADER_EXPORT), סטטוס ה-Released, " +
      "קבוצת הפונקציות והרישום ב-BOR (BUS2038) נשארים ברובד המאגר בלבד (data/bapi-enrichment.pm.ts, " +
      "data/function-intel.ts, data/sapData.pm.ts) ולא נבדקו במערכת חיה; חיבור sc4sap MCP נכשל בסשן. לא נמצא " +
      "עמוד רשמי הנושא כותרת 'Maintenance Notification BAPIs' או עמוד ALE הנוקב בשם ה-BAPI; העמודים 'Maintenance " +
      "Notification' (Maintenance Management, 2025 FPS01) ו-What's New EHP7/EHP8 ל-ERP 6.0 נוקבים רק ב-BAdI‏ " +
      "IWON_NOTIFICATION ‏('Modification of Data in Notification BAPIs') באופן כללי. ה-API אינו מתועד כיורש " +
      "המחליף את ה-BAPI אלא כחלופה מודרנית, ולכן הסטטוס הוא 'קיים API משוחרר' ולא 'הוחלף'. חיפוש מוגבל-דומיין " +
      "החזיר כותרות של SAP KBA על התנהגות שדות ב-BAPI (למשל 2525235, 2482578, 1619709, לפי הכותרות בלבד; גוף " +
      "ה-KBA לא נקרא ודורש כניסת S-user), ולכן הן נרשמות כאן כהפניה ולא כראיה. שם השירות ברשומת ה-Fiori F1511 " +
      "במאגר (API_MAINTENANCENOTIFICATION; רשומת F4604 נוקבת ב-API_MaintenanceOrder ואינה חלק מהפער) אינו תואם " +
      "לשם המתועד API_MAINTNOTIFICATION; הפער כבר נרשם ברשומות cds:I_MaintenanceNotification ו-tx:IW21 ומצריך " +
      "תיקון בקטלוג ה-Fiori. המודול נעדר מ-lib/bapi-registry.ts; הרישום שלו במאגר מגיע " +
      "מ-data/bapi-enrichment.pm.ts (verified-docs, Released, RFC, BUS2038) ומ-data/function-intel.ts.",
  },

  /* ------------------------------------- fm:BAPI_ALM_CONF_CREATE */
  {
    id: "fm:BAPI_ALM_CONF_CREATE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7d6c7de7b9234747978552d4ca44466b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: 
          "רשומת החיפוש מתעדת שירות OData נכנס סינכרוני לאישורי פקודות תחזוקה: 'Technical name: " +
          "API_MAINTORDERCONFIRMATION. This synchronous inbound service enables you to create new maintenance order " +
          "confirmations and cancel confirmations'; הישות LongText 'Allows you to create long text for a given " +
          "confirmation'. שם ה-BAPI‏ BAPI_ALM_CONF_CREATE אינו מופיע בכותרת או בסניפט; הזיקה היא זהות המטרה העסקית " +
          "(יצירת אישור לפעולת פקודת תחזוקה), לא הצהרת החלפה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create a Single Order Operation Confirmation | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/25fae824604447bb9a2dddc6363ce51b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "ב-S/4HANA On-Premise 2025 FPS01 מתועדת פעולת יצירה של אישור פעולה בודד בפקודת תחזוקה דרך שירות ה-OData: " +
          "'Create a single order operation confirmation ... POST: " +
          "<host>/sap/opu/odata/sap/API_MAINTORDERCONFIRMATION/MaintOrderConfirmation' (כלשון הסניפט). ערוץ היצירה " +
          "של אישורי תחזוקת מפעל ב-API הרשמי מתועד אפוא גם בגרסה העדכנית; ה-BAPI עצמו אינו מוזכר ברשומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Overview | Maintenance Order Operation Confirmation",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://api.sap.com/api/OP_API_MAINTORDERCONFIRMATION_0001/overview",
        accessedAt: DATE14,
        claim: 
          "‏OP_API_MAINTORDERCONFIRMATION_0001 ‏(Maintenance Order Operation Confirmation) רשום ב-SAP Business " +
          "Accelerator Hub; הרישום (כותרת וכתובת בלבד) תומך בקיומו של ה-API הרשמי. ישויות, פרמטרים ומצב השחרור בעמוד " +
          "ה-Hub לא נקראו: העמוד מחזיר 401 ל-HEAD ומפנה להתחברות OAuth ב-GET, ולכן תוכנו לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PM) לצד רישום ה-BAPI המועשר",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "המאגר מתאר את ה-BAPI כאישור ביצוע פקודת אחזקה (שעות, כמויות, מרכז עבודה) בזיקה ל-IW41/IW42 ולטבלאות " +
          "AFRU/AFKO, וקובע 'זמין ב-ECC' ו-'זמין ב-S/4HANA; חלופה: Fiori Confirm Maintenance Order'. רישום ה-BAPI " +
          "המועשר (data/bapi-enrichment.pm.ts) מוסיף פרמטרים TIMETICKETS (BAPI_ALM_TIMECONFIRMATION), DETAIL_RETURN " +
          "ו-RETURN, ומיקום בשרשרת ORDER_CHAIN בין שחרור הפקודה להשלמה טכנית. רשומת function-intel נוקבת בטבלת קלט " +
          "CONFIRMATIONS (ORDERID, OPERATION, WORK, FIN_CONF) ואילו bapi-enrichment.pm.ts נוקב ב-TIMETICKETS; שני " +
          "מקורות הפרויקט אינם מסכימים על שם הפרמטר ואף אחד מהם לא אומת רשמית. שם החלופה 'Confirm Maintenance Order' " +
          "אינו מזהה Fiori (F-ID) בקטלוג האפליקציות של הפרויקט, וזמינות ה-BAPI ב-S/4HANA נשענת על נתוני הפרויקט " +
          "בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_CONF_CREATE",
      },
    ],
    status: {
      status: "released_api_available",
      he: 
        "ל-BAPI_ALM_CONF_CREATE (יצירת אישור פעולה בפקודת תחזוקת מפעל: שעות עבודה, אישור סופי) קיימת חלופת API " +
        "רשמית: שירות ה-OData‏ API_MAINTORDERCONFIRMATION ‏(Maintenance Order Operation Confirmation; רישום Hub‏ " +
        "OP_API_MAINTORDERCONFIRMATION_0001), המתועד ב-S/4HANA On-Premise ליצירה ולביטול של אישורים, כולל פעולת " +
        "POST ליצירת אישור בודד ב-2025 FPS01. זמינות ה-BAPI עצמו ב-S/4HANA נשענת על נתוני הפרויקט: אף רשומת חיפוש " +
        "רשמית שנמצאה אינה נוקבת בשמו, ולא נמצא תיעוד רשמי על הוצאתו משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Create a Single Order Operation Confirmation | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/25fae824604447bb9a2dddc6363ce51b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "ב-S/4HANA On-Premise 2025 FPS01 מתועדת פעולת יצירה של אישור פעולה בודד בפקודת תחזוקה דרך שירות ה-OData: " +
          "'Create a single order operation confirmation ... POST: " +
          "<host>/sap/opu/odata/sap/API_MAINTORDERCONFIRMATION/MaintOrderConfirmation' (כלשון הסניפט). ערוץ היצירה " +
          "של אישורי תחזוקת מפעל ב-API הרשמי מתועד אפוא גם בגרסה העדכנית; ה-BAPI עצמו אינו מוזכר ברשומה.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: 
        "להמשיך להשתמש ב-BAPI בממשקי דיווח שעות קיימים (IW41/IW42, AFRU) ולוודא ב-SE37 במערכת היעד את קיומו ואת " +
        "הפרמטרים שברשומת המאגר לפני הסתמכות; לאינטגרציות חדשות (דיווח מנייד, IoT) להעדיף את ה-OData API הרשמי " +
        "API_MAINTORDERCONFIRMATION, ולאמת ישויות, פרמטרים ומצב שחרור מול ה-Business Accelerator Hub (דורש מפתח " +
        "API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_ALM_ORDER_MAINTAIN",
      "fm:BAPI_TRANSACTION_COMMIT",
      "tx:IW41",
      "tx:IW42",
      "table:AFRU",
      "fiori:F5104A",
      "enh:exit:CONFPM01",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "ממצא שלילי תחום בחיפוש: שש שאילתות בשירות החיפוש של help.sap.com (מוצר SAP_S4HANA_ON-PREMISE) ושאילתה אחת " +
      "במוצר SAP_ERP לא החזירו רשומה שכותרתה או הסניפט שלה נוקבים ב-BAPI_ALM_CONF_CREATE; גם חיפוש מוגבל " +
      "ל-help.sap.com ו-api.sap.com לא החזיר עמוד כזה. לכן קיום ה-BAPI ותכולת הפרמטרים שלו נשארים ברמת נתוני " +
      "הפרויקט (data/function-intel.ts, data/bapi-enrichment.pm.ts) ודורשים אימות ב-SE37. הסטטוס 'קיים API " +
      "משוחרר' נסמך על רשומות APIs for Maintenance Management (2023 Latest ו-2025 FPS01) ועל רישום api.sap.com; " +
      "זו חלופה משוחררת לאותה מטרה עסקית, לא הצהרת החלפה רשמית, ולכן אין יורש. ערך edition ברשומת ה-Hub נשען על " +
      "מוסכמת השמות OP_ ועל שיוך החוברת ל-S/4HANA On-Premise, לא על טקסט רישום בר-ציטוט. רשומת What's New 2021 " +
      "'Maintenance Order Operation Confirmation Events' (אירועי Created/Canceled של אובייקט האישור) אותרה ולא " +
      "צורפה כראיה, כי אינה נוגעת ל-BAPI. ניואנס מאגר: החלופה 'Fiori Confirm Maintenance Order' שברשומת " +
      "function-intel אינה תואמת שם אפליקציה בקטלוג; רשומת fiori:F2730 בשכבת האימות מפנה טכנאים ל-Perform " +
      "Maintenance Jobs (F5104A) או ל-IW41/IW42, ולכן F5104A נרשם כהפניה צולבת ולא כטענת החלפה. השם הטכני של " +
      "השירות הוא API_MAINTORDERCONFIRMATION (לא API_MAINTENANCEORDERCONF). ערכי verified-docs, s4OnPremSupport " +
      "yes ו-Released · RFC ברישום bapi-enrichment.pm.ts הם ברירות מחדל של התבנית g() המוחלות על כל רשומת PM, לא " +
      "נתון ייעודי ל-BAPI זה.",
  },

  /* -------------------------------- fm:BAPI_ALM_NOTIF_GET_DETAIL */
  {
    id: "fm:BAPI_ALM_NOTIF_GET_DETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: 
          "help.sap.com search: \"BAPI_ALM_NOTIF_GET_DETAIL\", \"BAPI_ALM_NOTIF\", \"BAPI_ALM_NOTIF_SAVE\", \"BAPI " +
          "maintenance notification read PM notification BAPI\" (SAP_S4HANA_ON-PREMISE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי: בארבע שאילתות לשירות החיפוש של SAP Help אף רשומה אינה נוקבת בשם BAPI_ALM_NOTIF_GET_DETAIL " +
          "בכותרת או בתקציר. ארבע התוצאות לשם המדויק שייכות לחוברות שאינן קשורות (Brazil, Treasury and Risk " +
          "Management, APIs for Warehousing, What's New 1709 FPS02) ותקציריהן ריקים. לא אותר תיעוד SAP Help רשמי " +
          "הנוקב ב-BAPI הקריאה של הודעת האחזקה (תחזוקת מפעל); הממצא תחום לחיפוש ואינו הוכחה להיעדר תיעוד.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "העמוד מתעד את הפעולות של API_MAINTNOTIFICATION ל-S/4HANA On-Premise 2025 FPS01, ובהן 'Read Maintenance " +
          "Notification' בשיטת GET תחת הנתיב /sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification, כלשון " +
          "התקציר. התקציר מוסיף שכותרת If-Match חובה בכל פעולות השינוי של השירות; פירוט פעולות השינוי עצמן אינו " +
          "מופיע בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Notification | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/2fb95f8272f343e68f4bf384f1d2bfcb.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE14,
        claim: 
          "רשומת What's New לגרסת S/4HANA 2021 מציגה את Maintenance Notification API כשירות המאפשר ליצור, לקרוא " +
          "ולעדכן נתוני הודעות אחזקה ('enables you to create, read, and update data related to maintenance " +
          "notifications', כלשון התקציר).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "עמוד אובייקט המיגרציה של הודעת אחזקה ב-2025 FPS01 נוקב תחת 'APIs/BAPIs' ב-BAPI_ALM_NOTIF_CREATE " +
          "וב-BAPI_ALM_NOTIF_SAVE (ובמודול הפונקציה CNV_PE_S4_PM_NOTIF_CREATE), ומשייך אותו ל-Business Object‏ " +
          "Maintenance Notification. שני אחים ממשפחת ה-BAPI של הודעת האחזקה מתועדים אפוא ב-S/4HANA 2025 FPS01; " +
          "ה-BAPI הקורא BAPI_ALM_NOTIF_GET_DETAIL עצמו אינו נזכר בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Overview | Maintenance Notification",
        url: "https://api.sap.com/api/OP_API_MAINTNOTIFICATION/overview",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "‏OP_API_MAINTNOTIFICATION ‏(Maintenance Notification) רשום ב-SAP Business Accelerator Hub; הרישום תומך " +
          "בקיומו של ה-API הרשמי. פרטי ישויות ופרמטרים לא נקראו (העמוד הוא מעטפת JavaScript ודורש מפתח API).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment) והקטלוג הפונקציונלי",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת ההעשרה מתארת BAPI מסוג Read (קריאה בלבד, ללא SAVE/COMMIT) על אובייקט BOR‏ BUS2038, בזיקה " +
          "ל-IW21/IW22/IW23/IW28/IW29 ולטבלאות QMEL/QMFE/QMUR/QMMA/QMSM, עם סיכום פרמטרים 'IMP NUMBER · EXP " +
          "NOTIFHEADER_EXPORT · NOTIFHDTEXT · TAB NOTLONGTXT · NOTITEM · NOTIFCAUS · NOTIFACTV · NOTIFTASK · " +
          "NOTIFPARTNR · RETURN', סטטוס 'Released · RFC · created 4.6 (110)', verificationStatus verified-docs, " +
          "תמיכת S/4HANA On-Premise 'yes' ותמיכת Cloud 'unknown'. רשומת הקטלוג (data/function-intel.ts) מציינת " +
          "כחלופה OData בשם API_MAINTENANCENOTIFICATION, שם שאינו תואם לשם הטכני המתועד API_MAINTNOTIFICATION.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_GET_DETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: 
        "לקריאת הודעות אחזקה (תחזוקת מפעל) קיים ב-S/4HANA On-Premise ממשק OData רשמי: API_MAINTNOTIFICATION עם " +
        "פעולת Read Maintenance Notification (GET), מתועד ב-APIs for Maintenance Management לגרסת 2025 FPS01, מוצג " +
        "כחדש ב-What's New 2021 ורשום ב-Business Accelerator Hub כ-OP_API_MAINTNOTIFICATION. ה-BAPI עצמו, " +
        "BAPI_ALM_NOTIF_GET_DETAIL, אינו נזכר באף רשומת SAP Help שנסרקה; זמינותו ב-S/4HANA נשענת על רשומת המאגר " +
        "(verified-docs, Released RFC) ועל כך שאחיו למשפחה BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_NOTIF_SAVE נקובים " +
        "בתיעוד המיגרציה של 2025 FPS01. לא נמצא תיעוד רשמי על הוצאתו משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "העמוד מתעד את הפעולות של API_MAINTNOTIFICATION ל-S/4HANA On-Premise 2025 FPS01, ובהן 'Read Maintenance " +
          "Notification' בשיטת GET תחת הנתיב /sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification, כלשון " +
          "התקציר. התקציר מוסיף שכותרת If-Match חובה בכל פעולות השינוי של השירות; פירוט פעולות השינוי עצמן אינו " +
          "מופיע בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: 
        "בממשקי RFC קיימים אפשר להמשיך להשתמש ב-BAPI לקריאת כותרת, פריטים, סיבות, פעילויות, משימות ושותפים של " +
        "ההודעה, לאחר אימות קיומו וסטטוס השחרור שלו במערכת היעד (SE37 או BAPI Explorer). לאינטגרציות חדשות, " +
        "ובמיוחד לתרחישי OData/REST, להעדיף את API_MAINTNOTIFICATION (Read Maintenance Notification) ולאמת את " +
        "רשימת הישויות והשדות מול ה-Business Accelerator Hub (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_CREATE",
      "fm:BAPI_ALM_NOTIF_SAVE",
      "fm:BAPI_ALM_ORDER_GET_DETAIL",
      "fm:NOTIF_ITEM_READ",
      "table:QMEL",
      "table:QMFE",
      "table:QMUR",
      "table:QMMA",
      "table:QMSM",
      "tx:IW23",
      "tx:IW53",
      "cds:I_MaintenanceNotification",
      "cds:I_MaintNotificationItem",
      "fiori:F4604",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "(1) הסטטוס 'קיים API משוחרר' נסמך על עמוד Operations for Maintenance Notifications (2025.001), על רשומת " +
      "What's New 2021 (loio 2fb95f8272f343e68f4bf384f1d2bfcb) ועל רישום OP_API_MAINTNOTIFICATION ב-api.sap.com; " +
      "זו חלופה משוחררת ולא טענת החלפה רשמית, ולכן אין יורש. (2) שם ה-BAPI עצמו לא נמצא באף רשומת help.sap.com; " +
      "קיומו, סטטוס השחרור שלו ורשימת הפרמטרים (NOTIFHEADER_EXPORT, NOTITEM, NOTIFCAUS, NOTIFACTV, NOTIFTASK, " +
      "NOTIFPARTNR) נשענים על רשומת המאגר בלבד ודורשים אימות ב-SE37 במערכת היעד. (3) גופי עמודי ה-Help לא נקראו; " +
      "כל טענה תחומה בכותרת ובתקציר של רשומת החיפוש; ספירות התוצאות של שירות החיפוש אינן יציבות בין הרצות ולכן " +
      "אינן נרשמות. (4) רישום api.sap.com אותר בכותרתו בלבד ('Overview | Maintenance Notification'); ערך edition " +
      "נשען על מוסכמת השמות OP_, כמו ברשומת BAPI_ALM_ORDER_MAINTAIN. (5) סטייה בשם במאגר: data/function-intel.ts " +
      "כותב API_MAINTENANCENOTIFICATION בעוד השם הטכני המתועד הוא API_MAINTNOTIFICATION; אין סתירה בסטטוס, רק " +
      "בשם. (6) BAPI_ALM_NOTIF_LIST_FILTER לא נכלל ב-xrefs: המאגר (data/bapi-enrichment.pm.ts) מסמן אותו כשם לא " +
      "תקני; NOTIF_ITEM_READ נשמר כ-xref משום שרשומת הסריקה שלו מפנה ל-BAPI זה כחלופה, אך שמו מסומן במאגר כלא " +
      "מאומת. (7) מהדורות Cloud לא נבדקו ברשומה זו.",
  },

  /* ------------------------------------- fm:BAPI_ALM_NOTIF_CLOSE */
  {
    id: "fm:BAPI_ALM_NOTIF_CLOSE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification Function Import | APIs for Maintenance Management",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7bd31588632341a59ea17bcc32812498.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE14,
        claim: 
          "בשירות ה-OData של הודעת האחזקה (תחזוקת מפעל) קיימת פעולת Function Import להשלמת הודעה (הסניפט מציג את שם " +
          "הפעולה חלקית: \"...Maintenance Notification\") המציבה את סטטוס המערכת NOCO (Notification completed) יחד עם " +
          "תאריך ושעת ייחוס; לצידה קיימת הפעולה Set Maintenance Notification To In Process המציבה NOPR. הסניפט אינו " +
          "מזכיר את BAPI_ALM_NOTIF_CLOSE; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: 
          "ה-API‏ API_MAINTNOTIFICATION מתועד ל-S/4HANA On-Premise 2025 FPS01 עם הפעולות קריאה (GET), יצירה (POST) " +
          "ועדכון (PATCH) של הודעת אחזקה תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification; כותרת If-Match נדרשת לכל פעולות " +
          "השינוי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_api_hub",
        sourceTitle: "Maintenance Notification",
        url: "https://api.sap.com/api/API_MAINTNOTIFICATION/resource",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "חיפוש רשת מוגבל ל-api.sap.com מחזיר את הכותרת \"Maintenance Notification\" לכתובת " +
          "/api/API_MAINTNOTIFICATION/resource, ומכאן שה-API‏ API_MAINTNOTIFICATION רשום ב-SAP Business Accelerator " +
          "Hub. עמוד ה-Hub עצמו הוא מעטפת JavaScript עם הפניה להתחברות (666 בתים ב-curl, זהה לעמוד של שם API לא " +
          "קיים), ולכן הישויות והפרמטרים לא נקראו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment) והקטלוג הפונקציונלי",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת את BAPI_ALM_NOTIF_CLOSE כהשלמה/סגירה של הודעת אחזקה הקובעת סטטוס מערכת NOCO, אובייקט " +
          "BOR‏ BUS2038, קבוצת פונקציות IWOPM, פרמטרים IMP NUMBER / SYSTSTAT / TESTRUN, EXP SYSTEMSTATUS / " +
          "USERSTATUS, TAB RETURN, וסטטוס 'Released · RFC · created 4.6 (110)'; שדות ה-ECC וה-S/4HANA On-Premise " +
          "מסומנים 'yes' במקור המאגר (verified-docs), ללא עמוד SAP Help בר-ציטוט הנוקב בשם ה-BAPI.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_CLOSE",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "‏BAPI להשלמת הודעת אחזקה (תחזוקת מפעל): קביעת סטטוס המערכת NOCO להודעה שמורה. זמינות ה-BAPI ב-S/4HANA " +
        "On-Premise, חתימת הממשק וסטטוס השחרור נשענים על נתוני המאגר בלבד; חיפוש ישיר של שם ה-BAPI בשירות החיפוש " +
        "של SAP Help (On-Premise ו-SAP ERP) לא העלה סניפט רשמי הנוקב בו, ותוצאת חיפוש רשת אחת (עמוד Data " +
        "Migration) אינה ניתנת לאימות ללא גוף העמוד. מה שמתועד רשמית: מושג ההשלמה (NOCO) וה-API הרשמי מסוג OData‏ " +
        "API_MAINTNOTIFICATION, הכולל Function Import להשלמת הודעה (הצבת NOCO עם תאריך ושעת ייחוס) המבצע את אותה " +
        "פעולה עסקית; שם הפעולה המלא לא נראה בסניפט. אף מקור רשמי אינו מכריז על הוצאה משימוש או על החלפה של " +
        "ה-BAPI.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: 
        "דורש אימות במערכת SAP חיה (SE37 / BAPI Explorer): קיום ה-BAPI, פרמטרי הממשק (SYSTSTAT, TESTRUN, " +
        "SYSTEMSTATUS, USERSTATUS) וסטטוס השחרור. באינטגרציות קיימות לשמור על רצף הקריאות: CLOSE ואחריו " +
        "BAPI_ALM_NOTIF_SAVE ו-BAPI_TRANSACTION_COMMIT על אותו חיבור RFC, ולבדוק את טבלת RETURN. לאינטגרציות חדשות " +
        "לבחון את ה-Function Import להשלמת הודעה של API_MAINTNOTIFICATION (שמו המלא דורש אימות מול ה-Hub או מערכת " +
        "חיה), ולאמת את פרטי הפעולה מול ה-Business Accelerator Hub (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_CREATE",
      "fm:BAPI_ALM_NOTIF_SAVE",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT",
      "fm:BAPI_ALM_NOTIF_PUTINPROGRESS",
      "fm:BAPI_TRANSACTION_COMMIT",
      "tx:IW22",
      "table:QMEL",
      "table:JEST",
      "cds:I_MaintenanceNotification",
      "fiori:F4604",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "עובדות ברמת ה-BAPI נשארות 'נדרש אימות': חיפוש ישיר של \"BAPI_ALM_NOTIF_CLOSE\" בשירות החיפוש של SAP Help " +
      "ב-2026-09-14 (מוצר On-Premise וגם SAP ERP) החזיר רק תוצאות לא קשורות ללא סניפט. חיפוש רשת מוגבל " +
      "ל-help.sap.com עם השם המדויק החזיר את עמוד ה-Data Migration‏ 'PM - Maintenance notification' ‏(2025.001) " +
      "כתוצאה, אך הסניפט הרשמי של העמוד מציג רק את השמות BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_NOTIF_SAVE (הסניפט " +
      "קטוע) ואינו מציג את CLOSE, ולכן העמוד לא צוטט כראיה; הוא מעיד שמשפחת ה-BAPI פעילה ב-S/4HANA 2025 FPS01 " +
      "ותו לא. גופי העמודים של help.sap.com הם מעטפת JavaScript (1160 בתים ב-curl) ולא נקראו; כל טענה תחומה " +
      "בכותרת ובסניפט. עמוד ה-Function Import נמצא בגרסה 2023.latest בלבד (גם בחיפוש עם version=2025.001); עמוד " +
      "הפעולות של אותו שירות נמצא ב-2025.001. שם ה-Function Import המלא אינו נראה בסניפט (מוצג '...Maintenance " +
      "Notification' לפני תיאור הצבת NOCO). ה-OData API אינו מוצג באף מקור רשמי כיורש של ה-BAPI, ולכן לא נטענת " +
      "החלפה והיורש נשאר ריק. ראיית api.sap.com נשענת על כותרת תוצאת חיפוש ('Maintenance Notification' בכתובת " +
      "/resource) ולא על טקסט עמוד; ערך edition ברשומה זו נשען על תיעוד אותו שם שירות בעמוד On-Premise 2025.001. " +
      "חיבור sc4sap (מערכת חיה) נכשל בסשן זה. הסטטוס הנגזר במאגר (unchanged, מאומת מול נתוני הפרויקט) אינו סותר " +
      "את הממצאים; הרשומה המפורשת מורידה את רמת הביטחון בלבד. עמוד 'Configuring Events to Adapt the Maintenance " +
      "Process' ‏(2025.001) מאשש בסניפט שהודעות מוצבות ל-Notification Completed (NOCO), ועמוד ההודעות " +
      "הכלל-יישומי 'Process Notification' ‏(2025.001, מסווג תחת Internal Service Request / CO) מאשש בסניפט את " +
      "הכלל שאין להשלים הודעה עם משימות פתוחות, בהתאמה לרשימת הכשלים ברשומת המאגר.",
  },

  /* ----------------------------- fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT */
  {
    id: "fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: 
          "help.sap.com search: \"BAPI_ALM_NOTIF_CHANGEUSRSTAT\", \"BAPI_ALM_NOTIF\", \"BAPI_ALM_NOTIF change user status " +
          "maintenance notification\", \"maintenance notification user status API\", \"BUS2038 maintenance notification " +
          "BAPI\", \"BAPIs maintenance notification PM-WOC-MN\" ועוד (SAP_S4HANA_ON-PREMISE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי: 12 שאילתות בשירות החיפוש של SAP Help (242 רשומות, כולל חוברות Maintenance Management, APIs " +
          "for Maintenance Management, What's New 2021 עד 2025 FPS01 ו-Notifications CS-CM-SN/PM-WOC-MN) וחיפוש " +
          "מוגבל לדומיינים help.sap.com / api.sap.com / fioriappslibrary / fal.cloud.sap לא העלו אף רשומה שנוקבת בשם " +
          "BAPI_ALM_NOTIF_CHANGEUSRSTAT בכותרת או בתקציר; שאילתת השם חזרה על עצמה גם בסקופ SAP_ERP ובסקופ " +
          "SAP_S4HANA_CLOUD ללא רשומה הנוקבת בשם. לא אותר תיעוד SAP רשמי ציבורי למודול, לפרמטרים שלו או לסטטוס " +
          "השחרור שלו ב-S/4HANA.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-BAPI של הפרויקט (PM_ADDITIONS, משפחת הודעות תחזוקה BUS2038)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת שינוי סטטוס משתמש (User Status) של הודעת תחזוקה, להבדיל מסטטוס מערכת, עם פרמטרים IMP " +
          "NUMBER, USR_STATUS, SET_INACTIVE, TESTRUN, EXP SYSTEMSTATUS, USERSTATUS, TAB RETURN; טרנזקציות " +
          "IW21/IW22/IW23/IW28/IW29; טבלאות QMEL, QMFE, QMUR, QMMA, QMSM; רצף חובה SAVE ואז BAPI_TRANSACTION_COMMIT " +
          "על אותו חיבור RFC. הרשומה מסומנת verified-docs עם מקור 'SAP Help (BUS2038) + SE37 metadata (fn group " +
          "IWOPM) + KBA 1923267' מ-2026-07-14, ללא URL. רשומת SWEEP מקבילה (data/bapi-enrichment.sweep.ts) נוקבת " +
          "בשמות פרמטרים אחרים (USER_STATUS / USER_ST_CODE), אך לפי audit/s4-enrichment/baseline-inventories.json " +
          "היא 'dead patch' שאינה מגיעה לרישום; שמות הפרמטרים לא אומתו ב-SE37 במסגרת בדיקה זו.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_CHANGEUSRSTAT",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Changing the User Status in the Notification | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/a6d17e55b6b5d572e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "הקשר פונקציונלי בלבד (לא טענה על ה-BAPI): לפי התקציר, סטטוסי משתמש מוגדרים בפרופיל סטטוס ב-Customizing של " +
          "תחזוקת מפעל ושירות לקוחות (נתיב Maintenance and Service Processing, Maintenance and Service " +
          "Notifications, Notification Processing, User Status for Notifications), ובעל ההרשאות המתאימות יכול " +
          "להגדיר, לשנות ולמחוק סטטוסי משתמש ברמת כותרת וברמת משימה בהודעות תחזוקה ב-S/4HANA 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Carry Out a Mass Change | Notifications (CS-CM-SN/PM-WOC-MN)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7f05ca069f8744759f48892c6d307fab/69cab65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "הקשר בלבד: תיעוד S/4HANA 2025 FPS01 של שינוי המוני בהודעות (IW28) עדיין מפנה למשפחת ה-BAPI של הודעות דרך " +
          "ה-BAdI 'Modification of Data in Notification BAPIs (IWON_NOTIFICATION)' לשיוך ולתקפות של שדות לקוח. " +
          "התקציר אינו נוקב בשם BAPI_ALM_NOTIF_CHANGEUSRSTAT ואינו קובע דבר על סטטוס השחרור שלו.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "BAPI לשינוי סטטוס משתמש (User Status) של הודעת תחזוקה (BUS2038) בתחזוקת מפעל, לפי רשומת המאגר. לא נמצא לו " +
        "תיעוד SAP רשמי ציבורי ב-SAP Help או ב-SAP Business Accelerator Hub, ואף מקור רשמי לא נוקב בסטטוס השחרור " +
        "שלו או בשינוי שלו ב-S/4HANA. ה-OData API המתועד להודעות תחזוקה (API_MAINTNOTIFICATION) אינו נזכר בתקצירי " +
        "SAP Help כמחליף של BAPI זה ולא נמצאה בו פעולה מתועדת לסטטוס משתמש. נדרש אימות קיום, סטטוס שחרור (SE37, " +
        "Release Information) ושמות הפרמטרים במערכת SAP.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: 
        "לאמת ב-SE37 במערכת S/4HANA את קיום המודול, את סטטוס השחרור (Released / Not Released) ואת שמות הפרמטרים " +
        "(USR_STATUS / SET_INACTIVE לעומת USER_STATUS / USER_ST_CODE), ולתעד את הממצא ברשומה. עד אז לתכנן ממשקי " +
        "סטטוס משתמש בהנחה שהמודול קיים אך לא מתועד רשמית, לשמור על רצף SAVE ואז BAPI_TRANSACTION_COMMIT, ולבדוק " +
        "אם ה-OData API להודעות תחזוקה מכסה את הצורך לפני כתיבת RFC חדש.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_SAVE",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fm:BAPI_ALM_NOTIF_PUTINPROGRESS",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "tx:IW22",
      "tx:IW28",
      "table:QMEL",
      "table:JEST",
      "table:TJ30",
      "cds:I_MaintenanceNotification",
      "fiori:F4604",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "הסטטוס הנגזר כיום באפליקציה (מרישום הפונקציות: verified-docs, תמיכת S/4HANA On-Premise 'כן', 'Released · " +
      "RFC · created 4.6 (110)') מציג 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט'; רשומה זו מורידה אותו " +
      "ל'נדרש אימות נוסף' משום שמקור ה-verified-docs של המאגר אינו נושא URL ולא אותר בשירות החיפוש הרשמי. שתי " +
      "הראיות הרשמיות כאן הן הקשר בלבד (ניהול סטטוס משתמש בהודעות, ומשפחת 'Notification BAPIs' דרך " +
      "IWON_NOTIFICATION) ואינן מאמתות את המודול עצמו. ה-OData API להודעות תחזוקה מתועד רשמית (Operations for " +
      "Maintenance Notifications, APIs for Maintenance Management, 2025.001, loio " +
      "061b31b90a88432fad5e710aa9cd175c) אך התקצירים שנבדקו מציגים קריאה, יצירה ועדכון של ההודעה ולא פעולה " +
      "לסטטוס משתמש; פעולות UpdateUserStatus שעלו בחיפוש הרשמי שייכות ל-API_CHANGE_RECORD (PLM, APIs for Product " +
      "Lifecycle Management 2025.001) ולישות Maintenance Planning Bucket (What's New 2025 FPS01), לא להודעות " +
      "תחזוקה. KBA 1923267 מופיע רק ברשומת המאגר ולא אומת. סוגי הודעה 01/02/03 שברשומת המאגר לא נבדקו מול מקור " +
      "רשמי.",
  },

  /* ---------------------------------- fm:BAPI_ALM_NOTIF_DATA_ADD */
  {
    id: "fm:BAPI_ALM_NOTIF_DATA_ADD",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Create Notification Item | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/abf44d7da8114c3a9b958cf9f8366fce.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "תיעוד ה-API הרשמי ל-S/4HANA On-Premise 2025 FPS01 מתעד פעולת OData ליצירת פריט להודעת תחזוקה קיימת: 'With " +
          "this operation, you can create item for existing notification using POST requests', תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION (כלשון הסניפט). זו חלופת OData רשמית לתרחיש הוספת פריט להודעה " +
          "קיימת; המיפוי לפעולת הפריטים של ה-BAPI הוא של הפרויקט, העמוד אינו נוקב בשם ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "טבלת הפעולות של API_MAINTNOTIFICATION ‏(2025.001) מונה 'Create Notification Item Activity POST' על הישות " +
          "MaintNotificationItemActivity ו-'Create Notification Partner POST' על הישות " +
          "MaintenanceNotificationPartner, לצד Read/Update להודעה; כלומר הוספת פעילויות ושותפים להודעה מכוסה ב-OData " +
          "API הרשמי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78c09d53839cca11e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "עמוד הודעת התחזוקה ב-Maintenance Management‏ 2025 FPS01 מפנה ל-BAdI‏ 'Modification of Data in " +
          "Notification BAPIs (IWON_NOTIFICATION)' לבדיקת נתונים; כלומר BAdI למשפחת ה-Notification BAPIs מתועד בגרסה " +
          "זו. הסניפט אינו נוקב בשם BAPI_ALM_NOTIF_DATA_ADD.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: 
          "help.sap.com search: \"BAPI_ALM_NOTIF_DATA_ADD\", \"BAPI_ALM_NOTIF\", \"Notification BAPIs maintenance " +
          "notification\" (SAP_S4HANA_ON-PREMISE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי תחום-חיפוש: הרצות חוזרות של שאילתת השם הטכני ב-2026-09-14 החזירו בין רשומה אחת לארבע רשומות " +
          "מתחומים שאינם תחזוקת מפעל (Social Media Integration, Defense & Security, Brazil, PP, ובהרצה אחת גם " +
          "Insurance), אף אחת מהן אינה נוקבת ב-BAPI_ALM_NOTIF_DATA_ADD בכותרתה והסניפט שלהן ריק; שאילתת " +
          "BAPI_ALM_NOTIF (12 רשומות, סניפטים ריקים) ושאילתת Notification BAPIs maintenance notification (21 רשומות) " +
          "לא החזירו עמוד המתעד את ה-BAPI בשמו. סטטוס השחרור (Released) ורשימת הפרמטרים של ה-BAPI לא אומתו מול מקור " +
          "רשמי.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment) ורשומת קטלוג הפונקציות",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "המאגר מתעד את ה-BAPI כחלק ממשפחת BUS2038: הוספת פריטים, סיבות, פעילויות, משימות ושותפים להודעה (טבלאות " +
          "NOTITEM, NOTIFCAUS, NOTIFACTV, NOTIFTASK, NOTIFPARTNR לפי parameterSummary), verified-docs, תמיכה " +
          "ב-S/4HANA On-Premise: כן, Public Cloud: לא צוין; רצף כתיבה CREATE ← DATA_ADD ← SAVE ← " +
          "BAPI_TRANSACTION_COMMIT. רשומת הקטלוג משייכת אותו ל-IW22, לטבלאות QMFE/QMUR ולתהליך PM-6, וה-BAPI רשום גם " +
          "תחת QMEL ו-QMFE בדאטהסט הבלופרינט (data/sapData.pm.ts).",
        verificationLevel: "repository_verified",
        repoRef: 
          "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_DATA_ADD; data/function-intel.ts#BAPI_ALM_NOTIF_DATA_ADD; " +
          "data/sapData.pm.ts#QMEL,QMFE",
      },
    ],
    status: {
      status: "released_api_available",
      he: 
        "קיימת חלופת API רשמית לפעולות ה-BAPI: OData‏ API_MAINTNOTIFICATION ב-S/4HANA On-Premise 2025 FPS01 מתעד " +
        "יצירת פריט להודעה קיימת, יצירת פעילות פריט ויצירת שותף להודעה. ה-BAPI עצמו אינו נזכר בשמו באף רשומת " +
        "help.sap.com שאותרה; זמינותו ב-S/4HANA נשענת על נתוני הפרויקט ועל כך שמשפחת Notification BAPIs מתועדת " +
        "ב-2025 FPS01 דרך ה-BAdI IWON_NOTIFICATION. לא אותר תיעוד רשמי על הוצאה משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Create Notification Item | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/abf44d7da8114c3a9b958cf9f8366fce.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "תיעוד ה-API הרשמי ל-S/4HANA On-Premise 2025 FPS01 מתעד פעולת OData ליצירת פריט להודעת תחזוקה קיימת: 'With " +
          "this operation, you can create item for existing notification using POST requests', תחת נתיב השירות " +
          "‎/sap/opu/odata/sap/API_MAINTNOTIFICATION (כלשון הסניפט). זו חלופת OData רשמית לתרחיש הוספת פריט להודעה " +
          "קיימת; המיפוי לפעולת הפריטים של ה-BAPI הוא של הפרויקט, העמוד אינו נוקב בשם ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: 
        "בתרחישי RFC קיימים להמשיך ברצף CREATE ← DATA_ADD ← SAVE ← COMMIT על אותו חיבור, ולאמת ב-SE37 במערכת היעד " +
        "את סטטוס השחרור ואת טבלאות הפרמטרים (NOTITEM, NOTIFCAUS, NOTIFACTV, NOTIFTASK, NOTIFPARTNR). לאינטגרציות " +
        "חדשות להעדיף את OData‏ API_MAINTNOTIFICATION (פריט, פעילות, שותף) ולאמת את כיסוי הסיבות (Causes) והמשימות " +
        "(Tasks) מול תיעוד ה-API בגרסת היעד.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_CREATE",
      "fm:BAPI_ALM_NOTIF_SAVE",
      "fm:BAPI_ALM_NOTIF_DATA_MODIFY",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:BAPI_TRANSACTION_COMMIT",
      "table:QMEL",
      "table:QMFE",
      "table:QMUR",
      "table:QMMA",
      "table:QMSM",
      "tx:IW22",
      "cds:I_MaintNotificationItem",
      "cds:I_MaintNotifActivity",
      "fiori:F4604",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "הסטטוס 'קיים API משוחרר' נסמך על עמודי APIs for Maintenance Management‏ 2025.001 (Create Notification " +
      "Item; Operations for Maintenance Notifications) המתעדים יצירת פריט, פעילות פריט ושותף להודעה קיימת " +
      "ב-API_MAINTNOTIFICATION; זו חלופה רשמית, לא טענת החלפה, ולכן אין יורש. עמוד Create Notification Item " +
      "Cause אותר בחיפוש רק בגרסת 2023 latest ולא צורף כראיה, ולכן כיסוי הסיבות ב-OData נשאר לאימות. אף רשומת " +
      "help.sap.com שאותרה אינה נוקבת ב-BAPI_ALM_NOTIF_DATA_ADD בשמו: המסמך היחיד ברמת BAPI הוא עמוד Maintenance " +
      "Notification‏ 2025.001 המפנה ל-BAdI IWON_NOTIFICATION למשפחת ה-Notification BAPIs; ה-BAdI אינו קיים ביקום " +
      "ה-xrefs של הפרויקט ולכן נשאר בפרוזה. סטטוס Released, קבוצת הפונקציות וטבלאות הפרמטרים מגיעים מנתוני " +
      "הפרויקט בלבד (verified-docs מ-2026-07-14) ולא אומתו מול מקור רשמי. ניואנס מאגר (לא סתירה): " +
      "data/function-intel.ts מתאר הוספה 'להודעה שטרם נשמרה' בעוד data/bapi-enrichment.pm.ts מתאר 'הודעה קיימת'; " +
      "שני השימושים אפשריים לפי הרצף המתועד במאגר, אך ההתנהגות מול הודעה שמורה לא אומתה רשמית. כיסוי משימות " +
      "(NOTIFTASK) ב-OData: רשומת What's New 2021 FPS01 מדברת על 'task list' ב-Maintenance Notification API, " +
      "וניסוח זה לא הוצלב מול עמוד פעולות 2025.001, לכן נשאר לאימות. עמוד api.sap.com/api/API_MAINTNOTIFICATION " +
      "אותר ב-WebSearch אך גופו הוא מעטפת JS ולא נקרא; לא נרשם כראיה. Public Cloud לא נבדק.",
  },

  /* ------------------------------------- fm:BAPI_GOODSMVT_CREATE */
  {
    id: "fm:BAPI_GOODSMVT_CREATE",
    aliases: ["BAPI_GOODSMVT_CREATE (אם נדרש)", "BAPI_GOODSMVT_CREATE - פליטת חומר לפק\"ע (261)"],
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle: 
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF " +
          "TRANSACTIONS IN MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE14,
        claim: 
          "פריט 27.6 (עמ' 644-645) קובע שטרנזקציות ה-MB לרישום ולהצגה של תנועות סחורה (MB01, MB02, MB03, MB04, MB05, " +
          "MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU, MBBM) 'have been replaced by the " +
          "single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and BAPI_GOODSMVT_CANCEL'. " +
          "מ-S/4HANA OP1610 ומעלה הוכנס מנגנון נעילה חדש ומשופר ל-MIGO ול-BAPI_GOODSMVT_CREATE ('a new enhanced and " +
          "improved lock concept has been introduced for transaction MIGO and the BAPI BAPI_GOODSMVT_CREATE'), בעוד " +
          "הטרנזקציות הישנות עדיין משתמשות במנגנון הישן (note 2319579), ולכן רישום מקבילי דרכן ודרך MIGO או ה-BAPI " +
          "עלול ליצור אי-עקביות מלאי. בסעיף הפתרון: להחליף קוד לקוח הקורא ל-MB01, MB04, MB05, MB0A, MB11, MB1A, " +
          "MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL ו-MBSU (למשל CALL TRANSACTION MBxy) בשימוש במודול הפונקציה " +
          "BAPI_GOODSMVT_CREATE; את MBST ב-BAPI_GOODSMVT_CANCEL; את MB02/MB03 ב-MIGO_DIALOG. באותו מסמך, פריט 27.9 " +
          "(Performance optimizations within Material Document) מונה את BAPI_GOODSMVT_CREATE ב-Other Terms, ופריט " +
          "27.12 (CWM in SAP S/4HANA) מציג בטבלת ה-BOR את הצמד BUS2017 / CREATEFROMDATA / BAPI_GOODSMVT_CREATE " +
          "כ-BAPI סטנדרטי מורחב-CWM. ‏SAP Notes 2210569 ו-2319579 מופיעים כלשונם בגוף הפריט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: 
          "Communication of Goods Movements from Inventory Management to EWM | Extended Warehouse Management (EWM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/8a532e4e6aaf4f4b97fd2f014f9837e0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "הסניפט לגרסת On-Premise 2025 FPS01 קובע: 'You can also post and cancel goods movements using the " +
          "following Inventory Management BAPIs: BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_CANCEL'. כלומר ה-BAPI מתועד " +
          "כממשק פעיל לרישום תנועות סחורה בניהול מלאי בגרסה 2025 FPS01. רשומות נוספות מאותו חיפוש ואותה גרסה: " +
          "'Extensibility for Goods Movements' ב-What's New 2025 FPS01 ‏(loio d4538b721f6d47d9a1fa076b82c1bf77): " +
          "'The default implementation of the BAdI calls Business Application Programming Interface (BAPI) " +
          "BAPI_GOODSMVT_CREATE'; 'Integration of a Decentralized WMS' ‏(loio b7706754e90d8c4ce10000000a4450e5): " +
          "ה-WMS המבוזר משכפל שינויים למערכת S/4HANA דרך BAPI_GOODSMVT_CREATE; ורשומת 'BAPIs and APIs used in " +
          "Synchronous Goods Movements' ב-What's New 2020 ‏(loio 73cf65e8275d4b279973c9a368890896, 2020.000) מונה " +
          "תחת Inventory Management BAPIs את BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL עם התהליכים הנתמכים 'Goods " +
          "receipt and goods issue, Stock transfer postings, Goods receipt for orders'.",
        verificationLevel: "sap_official_verified",
      },
      GOODSMVT_ODATA_API,
      {
        sourceType: "repository",
        sourceTitle: 
          "רשומת קטלוג הפונקציות של הפרויקט, רישום ה-BAPI המועשר (PP-PI, sweep) ומצב האובייקטים ב-S/4 - " +
          "BAPI_GOODSMVT_CREATE",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "המאגר מתעד: 'זמין ב-S/4HANA. חלופה: OData API_MATERIAL_DOCUMENT' ‏(data/function-intel.ts), סטטוס stays " +
          "עם 'נשמר ועובד מול MATDOC; ה-API היציב לכתיבת מלאי' ‏(data/s4-objects.ts, trust: curated), ורישום מועשר: " +
          "אובייקט BOR‏ BUS2017, ללא COMMIT פנימי, פרמטרים IMP GOODSMVT_HEADER, GOODSMVT_CODE · TAB GOODSMVT_ITEM, " +
          "RETURN · EXP MATERIALDOCUMENT, MATDOCUMENTYEAR, טרנזקציות MIGO/MB1A/MB31, טבלאות MSEG/MKPF/MATDOC " +
          "‏(data/bapi-enrichment.pppi.ts; data/bapi-enrichment.sweep.ts: verified-docs, s4OnPremSupport yes, " +
          "requiresCommit yes). הזמינות ב-S/4HANA, החלופה OData API_MATERIAL_DOCUMENT ואובייקט ה-BOR‏ BUS2017 עקביים " +
          "עם המקורות הרשמיים ברשומה זו; שמות הפרמטרים והכתיבה ל-MATDOC נשענים על המאגר בלבד, כי אף סניפט רשמי שנקרא " +
          "אינו מונה אותם.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_GOODSMVT_CREATE",
      },
    ],
    status: {
      status: "released_api_available",
      he: 
        "‏BAPI_GOODSMVT_CREATE הוא ה-BAPI לרישום תנועות סחורה (יצירת מסמך חומר) והוא מתועד כממשק פעיל ב-S/4HANA " +
        "On-Premise 2025 FPS01 (ניהול מלאי, אינטגרציית EWM, WMS מבוזר, מימוש ברירת המחדל של BAdI לתנועות סחורה). " +
        "לפי פריט הפישוט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM הוא היעד המומלץ לקוד לקוח במקום טרנזקציות " +
        "ה-MB הישנות, ומ-OP1610 הוא חולק עם MIGO מנגנון נעילה חדש. לצדו קיים שירות OData מתועד לקריאה, יצירה " +
        "וביטול של מסמכי חומר: Material Documents - Read, Create ‏(API_MATERIAL_DOCUMENT, נתיב " +
        "API_MATERIAL_DOCUMENT_SRV), המורחב בגרסאות 2020 עד 2025 FPS01. לא נמצא תיעוד רשמי המוציא את ה-BAPI משימוש " +
        "או מכריז על מחליף.",
      edition: "on-premise",
      release: "2025.001",
      source: GOODSMVT_ODATA_API,
      recommendedAction: 
        "להשאיר את BAPI_GOODSMVT_CREATE כממשק הכתיבה לתנועות סחורה בממשקים קיימים (אישורי ייצור בתעשיות תהליכיות, " +
        "ניפוק חלפים לפקודות תחזוקת מפעל, קבלות טובין), ולנתב אליו כל קוד לקוח שעדיין קורא " +
        "ל-MB01/MB11/MB1A/MB1B/MB1C/MB31 ודומיהן דרך CALL TRANSACTION, כנדרש בפריט הפישוט; ביטולים דרך " +
        "BAPI_GOODSMVT_CANCEL (אינו רשומה בדאטהסט). לכל קריאה: בדיקת טבלת RETURN וקריאה ל-BAPI_TRANSACTION_COMMIT, " +
        "ואימות המסמך ב-MB51 או דרך I_MaterialDocumentItem. לאינטגרציות חדשות מבוססות HTTP להעדיף את שירות " +
        "ה-OData‏ Material Documents - Read, Create ‏(API_MATERIAL_DOCUMENT_SRV) ולאמת ישויות, שדות ופעולות מול " +
        "המדריך APIs for Inventory ומול מערכת חיה; אין להתייחס ל-API כמחליף חובה של ה-BAPI. בבדיקות המרה: רישום " +
        "261 לפקודה, 101 לקבלה וביטול, במקביל ולא בערבוב עם טרנזקציות MB ישנות בגלל מנגנון הנעילה הנפרד.",
    },
    xrefs: [
      "tx:MIGO",
      "tx:MB11",
      "tx:MB1A",
      "tx:MB1B",
      "tx:MB1C",
      "tx:MB31",
      "tx:MB51",
      "table:MSEG",
      "table:MKPF",
      "table:RESB",
      "cds:I_MaterialDocumentItem",
      "fiori:F0843",
      "obj:material-document",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fm:BAPI_GOODSMVT_GETDETAIL",
      "fm:BAPI_GOODSMVT_GETITEMS",
      "fm:BAPI_PROCORDCONF_CREATE_TT",
      "fm:BAPI_RESERVATION_CREATE1",
      "enh:badi:MB_MIGO_BADI",
      "enh:exit:MBCF0002",
      "bp:matdoc-read-through-compatibility",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "מה שאומת: (א) רשימת הפישוט ל-S/4HANA 2023 FPS3 ‏(SIMPL_OP2023.pdf) חולצה לטקסט ופריט 27.6 נקרא במלואו, " +
      "כולל הסעיפים Symptom ו-Solution; הציטוטים נבדקו מילה במילה. אותו פריט מופיע ללא שינוי מהותי ברשימת הפישוט " +
      "ל-2025 FPS1 ‏(SIMPL_OP2025.pdf, פריט 15.3.9, עמ' 1486, " +
      "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf) שנקרא אף " +
      "הוא; לא נוסף כראיה נפרדת כדי להישאר בגבול ארבע ראיות. (ב) רשומות help.sap.com למהדורת On-Premise 2025.001 " +
      "המונות את ה-BAPI כממשק פעיל (EWM, WMS מבוזר, BAdI לתנועות סחורה, Retail‏ 'BAPI_GOODSMVT_CREATE is used to " +
      "create goods movement documents', ואובייקט ההגירה 'MM - Material inventory balance' במדריך Data " +
      "Migration, loio c1af02cdf5344d7ab71306ef1fed3e5d, המזכיר גם את היישום Material Document עם המזהה F1807). " +
      "(ג) המדריך APIs for Inventory ורשומות What's New 2020/2021/2022/2023/2025/2025 FPS01 לשירות " +
      "API_MATERIAL_DOCUMENT. מה שלא אומת: גופי עמודי help.sap.com הם מעטפות JavaScript ולא נקראו; רק כותרת, " +
      "מדריך, גרסה ו-snippet של כל רשומה. רשימת הפרמטרים (GOODSMVT_HEADER, GOODSMVT_CODE, GOODSMVT_ITEM, " +
      "MATERIALDOCUMENT, MATDOCUMENTYEAR) והכתיבה לטבלת MATDOC נשענות על המאגר בלבד ונשארות ברמת 'מאומת מול " +
      "נתוני הפרויקט'. רישום ה-Business Accelerator Hub‏ 'Material Documents - Read, Create' " +
      "‏(https://api.sap.com/api/API_MATERIAL_DOCUMENT_SRV/resource) הוחזר בחיפוש מוגבל-דומיין, אך לא נכלל כראיה " +
      "כי החבילה והמהדורה שלו לא נקראו (הדף מעטפת JavaScript ובתוצאות מופיעה גם חבילת Public Edition); מקור " +
      "הסטטוס הוא עמוד help.sap.com למהדורת On-Premise. 'קיים API משוחרר' מתאר חלופה מתועדת, לא החלפה: אף מקור " +
      "רשמי שנמצא אינו מוציא את ה-BAPI משימוש, ולכן אין שדה successor. BAPI_GOODSMVT_CANCEL, MIGO_DIALOG " +
      "ו-MB_CREATE_GOODS_MOVEMENT הנזכרים בפריטי הפישוט אינם מזהים בדאטהסט ואינם ב-xrefs; טבלת MATDOC מיוצגת דרך " +
      "obj:material-document; F1807 אינו בקטלוג ה-Fiori של הפרויקט. מספרי SAP Note ‏(2210569, 2319579) מצוטטים " +
      "מגוף הפריט בלבד ולא הוזנו בשדה sapNote, כמוסכמת הקטלוג. ממצא על המצב המוצג כיום: ללא סטטוס מחובר, דף " +
      "הפונקציה גוזר 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט' מתוך רישום האובייקטים (verified-docs + " +
      "s4OnPremSupport yes), בעוד מסמך ה-BASELINE מתעד לאותו דף טון S/4 'changed' שנגזר מהצמדת טבלת MSEG; הסטטוס " +
      "המחובר כאן מציג את התמונה הרשמית: BAPI פעיל עם שירות OData מתועד לצדו.",
  },

  /* ------------------------------- fm:CKMVFM_MATERIAL_PRICE_READ */
  {
    id: "fm:CKMVFM_MATERIAL_PRICE_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Installation: Actual Costing/Material Ledger | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/97f1d353ca9f4408e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "תיעוד רשמי של 2025 FPS01 קובע: 'the material ledger is mandatory as of Release SAP S/4HANA. Actual " +
          "costing is still optional'. הסניפט מפנה כלשונו ל-'SAP Note 2577551 - Material Ledger Production " +
          "Installation in SAP S/4HANA (Greenfield Approach)'. הקשר דומייני בלבד; הכותרת והסניפט אינם נוקבים בשם " +
          "מודול הפונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Price Control and Material Price Determination | Logistics — General (LO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/481dfb55cdbc7b43e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "הסניפט הרשמי מונה בטבלת Material Valuation ‏(MBEW) את השדות MLAST ‏(Material Price Determination: " +
          "Control) ו-MLMAA ‏(Material Ledger Activated at Material Level), בהקשר תחזוקת בקרת מחיר וקביעת מחיר חומר. " +
          "הקשר דומייני לטבלת המקור שהרשומה במאגר מייחסת לפונקציה; הסניפט אינו נוקב בשם מודול הפונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitor for Price Difference Account Balances | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/bb5cdfce59c443d3bcbcca4fdcf80f04.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "רשומה רשמית שהסניפט שלה מכיל כלשונו את המחרוזת CKMVFM: הדוח Monitor for Price Difference Account Balances " +
          "קורא רשומות Universal Journal Entry Line Items ו'can take over some of the tasks previously handled by " +
          "the value flow monitor, transaction CKMVFM'. הסניפט מתייחס לטרנזקציה CKMVFM ‏(Value Flow Monitor) בלבד, " +
          "לא למודול פונקציה בשם זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Product Valuation active core entity | Virtual Data Model and CDS Views",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/ee6ff9b281d8448f96b4fe6c89f2bdc8/8714b71e39c74e5282995db629c8749c.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE14,
        claim: 
          "הסניפט הרשמי (VDM, 2023 Latest) נוקב: 'CDS View Name I_ProductValuation Status Released' ומתאר תצוגה " +
          "בסיסית 'for maintaining multiple Valuation Areas for a Product'. חלופת קריאה מתועדת לנתוני הערכת חומר; " +
          "הסניפט אינו מונה שדות מחיר ואינו נוקב בשם מודול הפונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI, תמחיר)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת קריאת מחיר חומר (מחיר תקן / ממוצע נע) מטבלת MBEW לפי חומר ותחום הערכה (MATNR/BWKEY), " +
          "בזיקה ל-MM03 ו-CK13N ולתהליך PP-PI-6; שדה ה-ECC נוקב 'זמין ב-ECC' ושדה ה-S/4 נוקב 'זמין ב-S/4 (Material " +
          "Ledger חובה)'. הרשומה אינה מסומנת inferred, אך אינה נושאת מקור רשמי או אימות SE37.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CKMVFM_MATERIAL_PRICE_READ",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "לפי נתוני הפרויקט: מודול פונקציה לקריאת מחיר חומר (מחיר תקן / ממוצע נע) מטבלת MBEW, בהקשר תמחיר ייצור " +
        "בתעשיות תהליכיות. קיום הפונקציה, הממשק שלה וסטטוס השחרור לא אותרו באף מקור SAP רשמי ציבורי שנבדק; המקורות " +
        "הרשמיים מאששים רק את הדומיין (Material Ledger חובה ב-S/4HANA, שדות בקרת המחיר ב-MBEW, תצוגת CDS‏ " +
        "I_ProductValuation). נדרש אימות במערכת SAP ‏(SE37) לפני כל שימוש בנתון.",
      edition: "on-premise",
      release: null,
      source: {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI, תמחיר)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת קריאת מחיר חומר (מחיר תקן / ממוצע נע) מטבלת MBEW לפי חומר ותחום הערכה (MATNR/BWKEY), " +
          "בזיקה ל-MM03 ו-CK13N ולתהליך PP-PI-6; שדה ה-ECC נוקב 'זמין ב-ECC' ושדה ה-S/4 נוקב 'זמין ב-S/4 (Material " +
          "Ledger חובה)'. הרשומה אינה מסומנת inferred, אך אינה נושאת מקור רשמי או אימות SE37.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CKMVFM_MATERIAL_PRICE_READ",
      },
      recommendedAction: 
        "אימות ב-SE37 במערכת חיה: האם מודול פונקציה בשם זה קיים כלל (הקידומת CKMVFM שייכת לטרנזקציה Value Flow " +
        "Monitor, וייתכן בלבול שם), קבוצת הפונקציות, סטטוס השחרור (Released) והפרמטרים (MATNR/BWKEY וערכי המחיר " +
        "המוחזרים). עד אז אין להציג זמינות ב-S/4HANA כעובדה מאומתת ואין לתאר את הפונקציה כמשוחררת. לקריאת נתוני " +
        "הערכת חומר בתשתית מתועדת יש להסתמך על תצוגת ה-CDS‏ I_ProductValuation ועל תיעוד Material Ledger " +
        "ו-Material Price Analysis ב-help.sap.com.",
    },
    xrefs: [
      "table:MBEW",
      "table:ACDOCA",
      "tx:MM03",
      "tx:CK11N",
      "tx:CK13N",
      "tx:CKM3N",
      "fm:BAPI_MATERIAL_SAVEDATA",
      "cds:I_ProductValuation",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "אף מקור רשמי אינו נוקב בשם ה-FM. נבדק 2026-09-14: (1) שירות החיפוש של help.sap.com עם השם המדויק (5 " +
      "תוצאות בסך הכול: עמודי What's New 1709 ו-1709 FPS01 ועמוד APIs for Quality Management, כולן ללא סניפט), " +
      "'CKMVFM material price read function module' (התאמות בתמחיר ומחירי מכירה, ללא השם), 'material price read " +
      "Material Ledger function module', 'Material Ledger mandatory S/4HANA simplification', 'material valuation " +
      "price MBEW Material Ledger S/4HANA' ו-'Product Valuation Price CDS view Virtual Data Model'. אף כותרת או " +
      "סניפט אינם מזכירים את ה-FM. (2) חיפוש רשת מוגבל ל-help.sap.com / api.sap.com / fioriappslibrary / fal, " +
      "רגיל ובמירכאות: אף עמוד רשמי אינו נוקב בשם; חיפוש רשת בלתי מוגבל החזיר רק תוכן על הטרנזקציה CKMVFM " +
      "‏(Value Flow Monitor), ולכן ייתכן שהשם במאגר הוא הרכבה של קידומת הטרנזקציה עם תיאור פונקציונלי; הדבר לא " +
      "הוכרע וניתן לאישוש רק ב-SE37, וחיבור ה-MCP‏ sc4sap נכשל בסשן זה (לפי כללי ה-fallback של MANIFEST עובדות " +
      "ממשק כאלה נשארות 'נדרש אימות'). (3) הראיות הרשמיות שצורפו (loio ו-versionId הועתקו כלשונם מפלט " +
      "scripts/sap-help-search.mjs --json) מכסות את הדומיין בלבד: Material Ledger חובה ב-S/4HANA, שדות " +
      "MLAST/MLMAA ב-MBEW, הדוח שמחליף חלק ממשימות CKMVFM, ותצוגת ה-CDS‏ I_ProductValuation; גופי העמודים לא " +
      "נקראו (מעטפת JavaScript). SAP Note 2577551 מוזכר רק כי הוא מופיע כלשונו בסניפט הרשמי; לא אומת מול " +
      "me.sap.com ולכן לא נרשם בשדה sapNote. (4) רובד Tier-2 עקבי בשלושה קבצים: function-intel (ללא סימון " +
      "inferred, ללא מקור), בלופרינט PP-PI:MBEW ב-data/sapData.pppi.ts (מונה את ה-FM כ'קריאת מחיר חומר' לצד " +
      "BAPI_MATERIAL_SAVEDATA, עם הערת S/4 'Material Ledger חובה; הערכה ב-ACDOCA/ACDOCC'), " +
      "ו-data/transactions.ts#CK11N (מונה את ה-FM ברשימת הפונקציות של חישוב עלות תקן). (5) לא נטענת החלפה או " +
      "הוצאה משימוש ולכן אין יורש. השירות הרשמי Material Price - Update ‏(API_MATERIAL_VALUATION_SRV, APIs for " +
      "Financial Planning and Analysis, 2025.001, loio 9318a0fe2606406dbaa49246c3d93bde) אינו יורש: לפי הסניפט " +
      "הוא שירות לשינוי מחירי חומרים ('enables you to change the prices of your materials'); הסניפט אינו מתאר " +
      "קריאה, ואין לו מזהה ביקום הרשומות. תצוגת ה-CDS‏ I_ProductValuation קיימת ביקום הרשומות ומתועדת רשמית " +
      "(VDM, 2023 Latest, Status Released לפי הסניפט) ולכן צורפה כ-xref וכראיה; שדות המחיר שלה " +
      "(StandardPrice/MovingAveragePrice) מופיעים רק ב-data/cds-enrichment.ts (Tier-2) ולא בסניפט הרשמי. המזהים " +
      "I_MaterialPrice / I_ProductValuationBasic אינם קיימים ביקום. (6) הערת המאגר 'ACDOCA/ACDOCC' בבלופרינט לא " +
      "אוששה מול מקור רשמי בסשן זה; xref ל-ACDOCA נשמר בזכות הבלופרינט בלבד.",
  },

  /* ---------------------------------- fm:CO_ZF_ORDER_HEADER_READ */
  {
    id: "fm:CO_ZF_ORDER_HEADER_READ",
    aliases: ["CO_ZF_ORDER_HEADER_READ"],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של PM (דאטהסט מחולל) - רשומת AFKO",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "חוברת המיגרציה של תחזוקת מפעל (נושא 7, פקודות עבודה) מונה את CO_ZF_ORDER_HEADER_READ ברשומת הטבלה AFKO " +
          "בתיאור 'קריאת כותרת הפקודה', לצד הטרנזקציות IW32 ו-IW37N והדוח RIAUFK20. הערת ה-S/4 של הרשומה היא 'מותאם " +
          "(תואם עם פישוטי תזמון)', הטבלה החליפית 'AFKO (זהה)', והערת ה-SUM דורשת Regression Test ובדיקת User Exits " +
          "ודוחות מותאמים; הרשומה אינה נוקבת בסטטוס S/4 של ה-FM עצמו.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#AFKO",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המודיעין בפרויקט מתארת את ה-FM כקריאת כותרת פקודה (AFKO/AUFK) לפי AUFNR, במודול PM ובזיקה ל-IW33. " +
          "שדה ה-ECC שלה מציין שהשם תלוי גרסה, מפנה לאימות ב-SE37 ומפנה ל-BAPI_ALM_ORDER_GET_DETAIL; שדה ה-S/4 מפנה " +
          "לאימות ב-S/4 ול-CDS I_MaintenanceOrder, והרשומה כולה מסומנת inferred: true; אינה אישור רשמי ואינה מאשרת " +
          "פרמטרי ממשק.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CO_ZF_ORDER_HEADER_READ",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "SAP Help search: \"CO_ZF_ORDER_HEADER_READ\" - no matching document",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://help.sap.com",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי תחום לחיפוש: שאילתות SAP Help בסקופ SAP_S4HANA_ON-PREMISE ('CO_ZF_ORDER_HEADER_READ' - 5 " +
          "תוצאות, 'CO_ZF_ORDER_HEADER_READ function module' - 21 תוצאות, 'maintenance order header read function " +
          "module') וחיפוש רשת מוגבל לדומיינים help.sap.com / api.sap.com / fioriappslibrary / fal.cloud.sap (10 " +
          "תוצאות) לא החזירו אף מסמך שכותרתו או הקטע שלו מזכיר את שם ה-FM.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order (Version 2) | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/c1457e0e539740a29932fbdcf36fea3c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "הקשר בלבד (הדף אינו מזכיר את CO_ZF_ORDER_HEADER_READ): המדריך הרשמי APIs for Maintenance Management " +
          "ל-On-Premise 2025 FPS01 מתעד את הישות Maintenance Order (MaintenanceOrder) של ה-API Maintenance Order " +
          "(Version 2) בתיאור 'Allows to read the maintenance order header data', ואת הישות Maintenance Order " +
          "Operation (MaintenanceOrderOperation) בתיאור 'Allows to read the maintenance order operation data'. זהו " +
          "הערוץ המתועד לקריאת כותרת פקודת אחזקה ב-S/4HANA; הוא אינו מוצג כמחליף של ה-FM.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "table:AFKO",
      "table:AUFK",
      "tx:IW33",
      "tx:IW32",
      "fm:CO_ZF_OPERATIONS_READ",
      "fm:BAPI_ALM_ORDER_GET_DETAIL",
      "fm:BAPI_ALM_ORDER_MAINTAIN",
      "cds:I_MaintenanceOrder",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "אין תיעוד רשמי ציבורי ל-FM זה: חיפוש SAP Help (SAP_S4HANA_ON-PREMISE, שלוש וריאציות שאילתה) וחיפוש רשת " +
      "מוגבל לדומיינים הרשמיים לא העלו אף מסמך ששמו או הקטע שלו כולל את CO_ZF_ORDER_HEADER_READ. ה-MCP למערכת " +
      "SAP חיה (sc4sap) לא התחבר בסשן זה, ולכן לא בוצעה בדיקת SE37 בפועל. שם ה-FM קיים רק בנתוני הפרויקט: בחוברת " +
      "המיגרציה של תחזוקת מפעל (רשומת AFKO), ברשומת function-intel המסומנת inferred, וכן ברשימות ההקשר של " +
      "domain-detail (פקודות אחזקה ופקודות תהליך), centers/debugging ושיעור האקדמיה של PP; כל אלה נגזרים מאותו " +
      "מקור ואינם אימות עצמאי. שיעור האקדמיה (data/academy/lessons/pp-generated.ts) מתייג את ההפניה trust " +
      "verified-docs עם המקור SAP Help Portal, אך כותרת הקובץ מתעדת שהשיעור חולל מנתוני domain-detail " +
      "ו-function-finder של הפרויקט, וחיפושי help.sap.com לא שחזרו את השם; התיוג אינו נחשב אימות רשמי. חסר " +
      "לאימות: קיום ה-FM ב-SE37, קבוצת הפונקציות, פרמטרי הממשק (AUFNR והמבנה המוחזר, שברשומת המאגר מופיע רק " +
      "כ'Header' ללא שם מבנה), וזמינותו ב-S/4HANA. אין לקבוע סטטוס הוצאה משימוש, החלפה או אי-זמינות ללא מקור " +
      "רשמי הנוקב במחליף, ולכן לא נכתב סטטוס והרמה verification_required ברמת ה-FM; הסטטוס הנגזר במפה נשאר 'נדרש " +
      "אימות נוסף' (bapi-registry, requires-verification). דף ה-API הרשמי Maintenance Order (Version 2) מובא " +
      "כהקשר לקריאת כותרת פקודת אחזקה ב-S/4HANA ולא כיורש של ה-FM; הרשומה cds:I_MaintenanceOrder בפרויקט מתעדת " +
      "בעצמה שהשם I_MaintenanceOrder לא נמצא בתיעוד ה-VDM הרשמי, ולכן ההפניה אליו מרשומת function-intel אינה " +
      "מחזקת את האימות. ערך edition בראיות המאגר נגזר מהקשר ההמרה ECC6 ל-S/4 של הבלופרינט (מבוסס SUM); המקורות " +
      "עצמם אינם נוקבים במהדורה. מבוסס על קובץ / דורש אימות במערכת SAP.",
  },

  /* ------------------------------------ fm:CO_ZF_ORDER_ITEM_READ */
  {
    id: "fm:CO_ZF_ORDER_ITEM_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: 
          "help.sap.com search: \"CO_ZF_ORDER_ITEM_READ\", \"CO_ZF_ORDER_ITEM_READ function module\", \"read order item " +
          "AFPO function module\" (SAP_S4HANA_ON-PREMISE)",
        url: "https://help.sap.com",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי תחום לחיפוש: שלוש וריאציות שאילתה בשירות החיפוש של SAP Help (סקופ On-Premise, 21 תוצאות לכל " +
          "שאילתה) לא העלו אף רשומה שכותרתה או תקצירה נוקבים בשם CO_ZF_ORDER_ITEM_READ; חיפוש רשת מוגבל לדומיינים " +
          "help.sap.com / api.sap.com / fioriappslibrary / fal / me.sap.com / support.sap.com החזיר רק עמודים כלליים " +
          "של פריטי הזמנה (מכירות, רכש) שאינם מזכירים את השם. לא אותר תיעוד SAP Help רשמי למודול פונקציה זה.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה של תחזוקת מפעל (דאטהסט מחולל): רשומת AFPO, נושא 7 פקודות עבודה",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "חוברת המיגרציה של תחזוקת מפעל מקשרת את CO_ZF_ORDER_ITEM_READ לטבלת AFPO (פריטי פקודה, Order item) בתיאור " +
          "'קריאת פריט הפקודה', לצד הדוח RIAFPO00 'ניתוח פריטי פקודה'; לטבלה עצמה נרשם s4Note 'מותאם (תואם)' " +
          "ו-s4AltTable 'AFPO (זהה)', בהקשר IW32/IW33. הרשומה אינה נוקבת בסטטוס שחרור, בקבוצת פונקציות או בפרמטרים " +
          "של ה-FM.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#AFPO",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (מסומנת inferred)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת הקטלוג מתארת קריאת פריט פקודה (AFPO) לפי AUFNR עם פלט 'פריט (AFPO)', מודול PM, תחום 'פקודות אחזקה', " +
          "אובייקטים קשורים IW33, CO03, AFPO ותהליך PM-7; שדה ה-ECC נושא הסתייגות 'אמת ב-SE37', שדה ה-S/4 מורה 'אמת " +
          "ב-S/4', והרשומה כולה מסומנת inferred: true. כלומר המאגר עצמו אינו טוען לקיום מאומת, לממשק מאומת או לסטטוס " +
          "שחרור.",
        verificationLevel: "verification_required",
        repoRef: "data/function-intel.ts#CO_ZF_ORDER_ITEM_READ",
      },
      {
        sourceType: "sap_help",
        sourceTitle: 
          "Archiving Maintenance and Service Orders (PM-SMA-SC/PM-WOC-MO) | Data Archiving in Plant Maintenance and " +
          "Customer Service (PM/CS)",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/15e1b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: 
          "הקשר לטבלת היעד בלבד (לא טענה על ה-FM): תיעוד הארכוב של פקודות תחזוקה ושירות ב-S/4HANA 2025 FPS01 מונה את " +
          "AFPO כ-'Order item' בין טבלאות הפקודה, וקובע: 'Table AFPO is only available for refurbishment orders and " +
          "is therefore only archived for these orders'. כלומר, בפקודת תחזוקה רגילה אין רשומת פריט AFPO; פריט הפקודה " +
          "קיים בפקודות שיפוץ (refurbishment) בלבד.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "מודול פונקציה לקריאת פריט פקודה (AFPO) לפי מספר פקודה, הרשום בבלופרינט תחזוקת מפעל תחת טבלת AFPO ובקטלוג " +
        "הפונקציות של הפרויקט. לא נמצא לו תיעוד רשמי ב-SAP Help, ב-SAP Business Accelerator Hub או בספריית " +
        "אפליקציות Fiori, ולכן אין לראות בו ממשק משוחרר או מתועד. לפי התיעוד הרשמי, טבלת AFPO קיימת בפקודות תחזוקה " +
        "רק עבור פקודות שיפוץ, כך שקריאת פריט רלוונטית לפקודות שיפוץ ולפקודות ייצור (ראה רשומת table:AFPO) ולא " +
        "לפקודת תחזוקה רגילה. נדרש אימות קיום, קבוצת פונקציות, פרמטרים וסטטוס שחרור ב-SE37 במערכת SAP.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: 
        "אמת ב-SE37 (קיום, קבוצת פונקציות, פרמטרי הממשק, סטטוס Released) במערכת ECC 6.0 וב-S/4HANA היעד לפני כל " +
        "שימוש בקוד מותאם. לקריאת נתוני פקודת תחזוקה בתצורה מתועדת העדף את BAPI_ALM_ORDER_GET_DETAIL (קיים " +
        "בדאטהסט) או את ה-OData API המתועד רשמית Maintenance Order (Version 2), המצוטט ברשומת " +
        "fm:BAPI_ALM_ORDER_MAINTAIN; לפריטי פקודת ייצור ראה את תצוגת ה-CDS ‏I_ProductionOrderItem ואת ישות " +
        "A_ProductionOrderItem המתועדות ברשומת cds:I_ProductionOrderItem. אל תציג את המודול הזה כממשק משוחרר.",
    },
    xrefs: [
      "table:AFPO",
      "table:AUFK",
      "tx:IW32",
      "tx:IW33",
      "tx:CO03",
      "fm:CO_ZF_ORDER_HEADER_READ",
      "fm:CO_ZF_OPERATIONS_READ",
      "fm:BAPI_ALM_ORDER_GET_DETAIL",
      "fm:BAPI_ALM_ORDER_MAINTAIN",
      "cds:I_ProductionOrderItem",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "לא קיים תיעוד רשמי ציבורי ל-CO_ZF_ORDER_ITEM_READ: שלוש וריאציות שאילתה בשירות החיפוש של help.sap.com " +
      "(סקופ On-Premise, 2026-09-14, 21 תוצאות לכל שאילתה, כולן נסקרו) וחיפוש רשת מוגבל לדומיינים הרשמיים לא " +
      "העלו אף כותרת או תקציר הנוקבים בשם; לא נמצאה רשומת api.sap.com ולכן אין לצטטו כ-API משוחרר. חיבור ה-MCP " +
      "למערכת SAP חיה (sc4sap) נכשל בסשן זה, ולכן לא בוצעה בדיקת SE37 בפועל. שם ה-FM קיים רק בנתוני הפרויקט: " +
      "בחוברת המיגרציה של תחזוקת מפעל (טבלת AFPO) וברשומת function-intel המסומנת inferred; המודול נעדר " +
      "מ-lib/bapi-registry.ts ומ-data/domain-detail.ts (שם מופיע רק CO_ZF_ORDER_HEADER_READ), " +
      "ו-lib/route-manifest.generated.ts המחולל רק מהדהד את הדאטהסט. מה חסר לשדרוג: עמוד רשמי ב-help.sap.com או " +
      "api.sap.com הנוקב בשם, או בדיקת SE37 חיה (קיום, קבוצת פונקציות, פרמטרים, סטטוס Released) ב-ECC 6.0 " +
      "וב-S/4HANA היעד. סטטוס replaced/deprecated/not_available אינו בר-טענה כי אף מקור רשמי אינו נוקב ביורש; " +
      "ציטוט ה-OData וה-CDS הוא הקשר לאותם נתונים עסקיים, לא הצהרת יורש. הערת הקשר עסקי (מבוסס על מקור רשמי): " +
      "עמוד הארכוב קובע שטבלת AFPO קיימת בפקודות PM/CS רק עבור פקודות שיפוץ, ולכן תרחיש ה-QA ברשומת " +
      "function-intel ('פקודה ללא פריט') צפוי להיות המקרה הרגיל בפקודת תחזוקה שאינה פקודת שיפוץ; שיוך המודול " +
      "ל'פקודות אחזקה' בקטלוג ראוי לסייג זה. אפליקציית Fiori 'Find Maintenance Order (F2393)' הרשומה בבלופרינט " +
      "של AFPO אינה ביקום מזהי ה-Fiori של הפרויקט (data/fiori/apps.ts) ולכן לא נוספה ל-xrefs. ערך edition בראיות " +
      "המאגר נגזר מהקשר ההמרה ECC6 ל-S/4 של הבלופרינט; המקורות עצמם אינם נוקבים במהדורה. מבוסס על קובץ / דורש " +
      "אימות במערכת SAP.",
  },

  /* ------------------------------------- fm:CP_DI_OPERATION_READ */
  {
    id: "fm:CP_DI_OPERATION_READ",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Master Recipe | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/4d9ed891a8c547c493e70dbfdcbea7bb.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "העמוד מתעד את שירות ה-OData‏ API_MASTER_RECIPE‏ ל-S/4HANA On-Premise 2025 FPS01: 'Technical name: " +
          "API_MASTER_RECIPE This synchronous inbound service enables you to view, create and update all details of " +
          "a master recipe and its relationships', עם הישויות Operation‏ (MasterRecipeOperation) 'Specifies the list " +
          "of operations of a master recipe' ו-Phase‏ (MasterRecipePhase) 'list of all phases of a master recipe'. " +
          "הראיה מאמתת קיום API משוחרר לקריאת פעולות ופאזות של מתכון אב בתעשיות תהליכיות; היא אינה מזכירה את מודול " +
          "הפונקציה CP_DI_OPERATION_READ ואינה מאמתת אותו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Master Recipe | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/9dccec3170974ece83918a3f2d001b29.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE14,
        claim: 
          "רשומת What's New לגרסת SAP S/4HANA 2020 מציגה את OData API: Master Recipe כתכונה חדשה: 'you can view, " +
          "create, and update specific properties of master recipe header, material assignment, operation, phase, " +
          "secondary resource, component allocation'. הרשומה תוחמת את הגרסה שבה ה-API הופיע לפי What's New (2020). " +
          "רשומת What's New המקבילה לגרסת 2025 FPS01 (loio 0c7a514cff8e461ba20b964ee2054557, versionId 2025.001) " +
          "מוסיפה לפי תקצירה: 'The OData API has been enhanced to support assignment of inspection characteristics " +
          "to an operation or phase'. אף אחת מהרשומות אינה מזכירה מודולי פונקציה קלאסיים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום הפונקציות המועשר של הפרויקט (function-intel)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת את CP_DI_OPERATION_READ כקריאת פעולות של רשימת פעולות או מתכון (PLPO) עם קלט " +
          "PLNNR/PLNAL ופלט טבלת Operations, משויכת למודול PM (אחזקה מונעת, תהליך PM-11) ולטבלאות PLPO/PLKO. שדה " +
          "ה-ECC נושא הסתייגות מפורשת 'קיים ב-ECC (אמת ב-SE37)', שדה ה-S/4 אומר 'אמת ב-S/4', והרשומה כולה מסומנת " +
          "inferred: true. רישום אובייקטי הפונקציה (lib/bapi-registry) גוזר ממנה verificationStatus " +
          "'requires-verification' עם תמיכה 'unknown' ב-ECC וב-S/4HANA.",
        verificationLevel: "verification_required",
        repoRef: "data/function-intel.ts#CP_DI_OPERATION_READ",
      },
      {
        sourceType: "repository",
        sourceTitle: "מאגר הנתונים שנוצר מחוברות ההגירה (PP-PI ו-PM), רשומות הטבלה PLPO",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "שתי חוברות ההגירה מציינות את המודול על רשומת PLPO: חוברת PP-PI בשם 'CP_DI_OPERATION_READ - קריאת " +
          "פעולות/פאזות' (טרנזקציות C201, C202, C203, CA02; Fiori‏ Manage Master Recipes; הערת S/4 'ללא שינוי; ביצוע " +
          "דרך Control Recipe / PI sheet'), וחוברת PM (data/sapData.pm.ts#PLPO) בשם 'קריאת פעולות הרשימה' (טרנזקציות " +
          "IA01/IA05; IA06; הערת S/4 'ללא שינוי (תואם)'). כלומר המאגר משייך את אותו מודול לשני הקשרים: פעולות ופאזות " +
          "של מתכון אב בתעשיות תהליכיות, ופעולות רשימות פעולות של תחזוקת מפעל.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pppi.ts#PLPO",
      },
    ],
    xrefs: [
      "fm:CP_RECIPE_READ",
      "fm:BAPI_ROUTING_GETDETAIL",
      "tx:C201",
      "tx:C202",
      "tx:C203",
      "tx:IA05",
      "tx:IA06",
      "table:PLPO",
      "table:PLKO",
      "table:PLAS",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "שם מודול הפונקציה CP_DI_OPERATION_READ לא נמצא באף מקור רשמי: שאילתת השם בשירות החיפוש של SAP Help " +
      "(SAP_S4HANA_ON-PREMISE, 2026-09-14) החזירה 7 רשומות לא קשורות עם תקצירים ריקים (What's New 1709, " +
      "Malaysia, Transactional Banking), וחיפוש מוגבל דומיינים על help.sap.com, api.sap.com, fioriappslibrary " +
      "ו-fal.cloud.sap לא החזיר דף שנוקב בשם. לכן קיום המודול, הממשק שלו (PLNNR/PLNAL וטבלת הפעולות שמתאר " +
      "המאגר), מצב השחרור והזמינות ב-S/4HANA נשארים ברמת verification_required, ולא נכתב סטטוס מחברי. מה שחסר " +
      "בדיוק: אימות SE37 במערכת חיה (ECC ו-S/4HANA) או דף רשמי שנוקב בשם. הראיות הרשמיות מאמתות רק את ההקשר של " +
      "PP-PI: קיים OData API משוחרר, API_MASTER_RECIPE, עם ישויות MasterRecipeOperation ו-MasterRecipePhase " +
      "לקריאת פעולות ופאזות של מתכון אב (מופיע ב-What's New של S/4HANA 2020, מתועד ב-APIs for Manufacturing " +
      "2025.001). זו חלופה משוחררת לקריאה חיצונית, לא טענת החלפה רשמית של המודול, ולכן אין יורש. הסתייגות הקשר: " +
      "המאגר משייך את המודול גם לרשימות פעולות של תחזוקת מפעל (PLPO, IA05/IA06), ו-API_MASTER_RECIPE אינו מכסה " +
      "רשימות פעולות של PM; לכן לא נכתב סטטוס released_api_available ברמת הרשומה, והממצא נשאר בראיות ובהערה. " +
      "ראיות המאגר (function-intel, sapData.pppi, sapData.pm) הן Tier-2 בלבד ואין לסמנן כרשמיות; ההבחנה מתכון אב " +
      "(PP-PI, Task List Type 2) מול Routing ורשימת פעולות PM נשמרת בכל ניסוח.",
  },

  /* --------------------------------------- fm:CR_WORKCENTER_READ */
  {
    id: "fm:CR_WORKCENTER_READ",
    aliases: ["CR_WORKCENTER_READ"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: 
          "help.sap.com search: \"CR_WORKCENTER_READ\", \"CR_WORKCENTER_READ function module\", \"work center read " +
          "function module RFC\" (SAP_S4HANA_ON-PREMISE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי: שלוש וריאציות שאילתה בשירות החיפוש של SAP Help (סקופ On-Premise, 3 + 21 + 21 רשומות שנסקרו) " +
          "לא העלו אף כותרת או תקציר הנוקבים בשם CR_WORKCENTER_READ; שלוש הרשומות שהוחזרו לשם המדויק (Work Center " +
          "Groups - Replicate, Read Standard Work Formula Parameter Group, Create Project Network Activity Milestone " +
          "Details) הן עמודי API ללא תקציר ואינן מזכירות את המודול. חיפוש רשת מוגבל לדומיינים הרשמיים החזיר רק עמודי " +
          "מרכז עבודה כלליים ו-KBAs שאינם נוקבים בשם. לא אותר תיעוד SAP רשמי למודול פונקציה זה.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Read Work Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/1e5f218e776d4dbebc7955a12e35c86f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "קריאת נתוני מרכז עבודה ב-S/4HANA On-Premise 2025 FPS01 מתועדת רשמית דרך ה-OData API‏ API_WORK_CENTERS: " +
          "הסניפט מציג GET על הישות A_WorkCenters לפי WorkCenterInternalID ו-WorkCenterTypeCode, ניווט " +
          "to_WorkCenterDescription לתיאור, שליפת שיוכי מרכז עלות ('Fetch details of cost center assignments to a " +
          "work center') ושליפה עמוקה של ישויות המרכז ('Fetch deep entities of a work center').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Work Center | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/abb8f6a759924372b850ebdd0a7c4a11.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE14,
        claim: 
          "רשומת What's New של SAP S/4HANA 2021 (סוג הרשומה לפי הסניפט: API, Changed, פריט היקף BJ5, רכיב PP-BD-WKC) " +
          "מתעדת OData API בשם Work Center‏ (API_WORK_CENTERS) לקריאה, יצירה ועדכון של כל פרטי מרכז העבודה ('you can " +
          "read, create, and update all details of a work center', כלשון הסניפט); מצב Batch נתמך ליצירה ולעדכון של " +
          "ישויות מסוימות במרכז העבודה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/4e366afdf7604bc9b25f39b4aff05cb2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "בתיעוד Maintenance Management לגרסת 2025 FPS01 מוגדר מרכז עבודה ראשי (Main work center) כמרכז העבודה " +
          "המשויך להזמנת האחזקה ברמת הכותרת, ומרכז עבודה מתחזק (Maintenance work center) כמרכז האחראי לביצוע משימת " +
          "האחזקה, שיכול להיות המרכז הראשי או המרכז המבצע; המרכז הראשי של ההזמנה יכול להיות שונה מהמרכז המבצע של " +
          "פעולת ההזמנה. הסניפט אינו נוקב בשם טבלה או מודול פונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PM, רשומת CRHD (נושא 1: מבנה ארגוני ותשתית)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "חוברת המיגרציה של PM מייחסת ל-CR_WORKCENTER_READ את התיאור 'קריאת נתוני מרכז עבודה' בטבלת CRHD (כותרת " +
          "מרכז עבודה / משאב, קודי טרנזקציה IR01/IR02/IR03, CR05, CR06), לצד CRAP_WORKCENTER_GET_DETAIL; פסק " +
          "הבלופרינט לטבלה: 'ללא שינוי (תואם)'. הבלופרינט של PP-PI נוקב לאותה טבלה בשם מודול שונה, " +
          "CR_WORK_CENTER_READ.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#CRHD",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PM, מרכזי עבודה)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת הקטלוג מתארת קריאת נתוני מרכז עבודה (קיבולת, נוסחאות, שיוך עלות) לפי ARBPL/WERKS בזיקה ל-IR03/CR03 " +
          "ולטבלאות CRHD/CRCA (תהליך PM-1), וכותבת 'זמין ב-ECC' / 'זמין ב-S/4HANA' ללא דגל inferred וללא מקור; טענת " +
          "הזמינות היא רשומת מאגר שלא אומתה מול תיעוד רשמי או מערכת חיה.",
        verificationLevel: "verification_required",
        repoRef: "data/function-intel.ts#CR_WORKCENTER_READ",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "מודול פונקציה קלאסי לקריאת נתוני אב של מרכז עבודה (CRHD) בתחזוקת מפעל ובייצור. לא נמצא לו תיעוד רשמי " +
        "ב-SAP Help, ולכן אין לראות בו ממשק משוחרר או מתועד; קיומו וסטטוס השחרור שלו ב-S/4HANA לא אומתו. לאותם " +
        "נתונים עסקיים SAP מתעדת רשמית את ה-OData API‏ Work Center‏ (API_WORK_CENTERS, פעולת Read Work Center) ואת " +
        "תצוגת ה-CDS המשוחררת I_WorkCenter; הציטוט הוא הקשר, לא הצהרת יורש.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: 
        "אמת ב-SE37 (קיום, קבוצת פונקציות, סטטוס Released) במערכת ECC וב-S/4HANA היעד לפני כל שימוש בממשק, ובדוק " +
        "היכן קוד מותאם קורא לו (SE37 where-used). לקריאת מרכז עבודה באינטגרציות חדשות העדף את ה-OData API המתועד " +
        "רשמית Work Center‏ (API_WORK_CENTERS, ישות A_WorkCenters עם ניווט לתיאור, לשיוך מרכז עלות ולקיבולת) או את " +
        "תצוגות ה-CDS המשוחררות I_WorkCenter‏, I_WorkCenterText‏, I_WorkCenterCostCenter ו-I_WorkCenterCapacity; " +
        "אל תציג את המודול הזה כממשק משוחרר.",
    },
    xrefs: [
      "table:CRHD",
      "table:CRTX",
      "table:CRCA",
      "table:CRCO",
      "table:KAKO",
      "tx:IR01",
      "tx:IR02",
      "tx:IR03",
      "tx:CR03",
      "tx:CRC3",
      "fm:CRAP_WORKCENTER_GET_DETAIL",
      "fm:CR_WORK_CENTER_READ",
      "fm:CR_TEXT_READ",
      "fm:CY_CAPACITY_LOAD",
      "cds:I_WorkCenter",
      "cds:I_WorkCenterText",
      "cds:I_WorkCenterCostCenter",
      "cds:I_WorkCenterCapacity",
      "fiori:F3289",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "לא קיים תיעוד רשמי ל-CR_WORKCENTER_READ: שלוש וריאציות חיפוש בשירות החיפוש של help.sap.com (סקופ " +
      "On-Premise, 2026-09-14, 45 רשומות שנסקרו) לא העלו כותרת או תקציר הנוקבים בשם, וחיפוש רשת מוגבל לדומיינים " +
      "הרשמיים (help.sap.com / api.sap.com / fioriappslibrary / fal.cloud.sap / me.sap.com / support.sap.com) " +
      "החזיר רק עמודי מרכז עבודה כלליים ו-KBAs על נושאים אחרים. חיבור ה-MCP למערכת SAP חיה נכשל בסשן, ולכן " +
      "הקיום, קבוצת הפונקציות, הפרמטרים (ARBPL/WERKS ברשומת המאגר) וסטטוס השחרור לא אומתו ב-SE37. מה חסר לשדרוג: " +
      "עמוד רשמי ב-help.sap.com או api.sap.com הנוקב בשם, או בדיקת SE37 חיה ב-ECC 6.0 וב-S/4HANA היעד. סטטוס " +
      "replaced/deprecated/not_available אינו בר-טענה כי אף מקור רשמי אינו נוקב ביורש למודול; " +
      "released_api_available לא נכתב כי ה-API הרשמי מתעד את האובייקט העסקי (מרכז עבודה) ולא את המודול, וסטטוס " +
      "המודול עצמו ב-S/4HANA לא הוכרע. ראיות רשמיות (loio + versionId הועתקו כלשונם מרשומות החיפוש): Read Work " +
      "Center (APIs for Manufacturing, 2025.001, loio 1e5f218e), OData API: Work Center (What's New 2021, loio " +
      "abb8f6a7) ועמוד Work Center בתיעוד Maintenance Management (2025.001, loio 4e366afd). רשומת What's New " +
      "מקבילה קיימת גם לגרסת 2020 (loio a6318cd9, 2020.000), ולכן ה-API קדם ל-2021; רשומת ה-New של 2021 (loio " +
      "f7e7144c) היא שירות ה-OData V4. גוף דפי ה-Help הוא מעטפת JavaScript ולכן כל טענה תחומה בכותרת ובסניפט. " +
      "הקשר נוסף שלא צוטט כראיה: עמוד ה-VDM של I_WorkCenter (Virtual Data Model and CDS Views, 2023 Latest, loio " +
      "c90e05a792674f7d8bbae247c5200999: Technical Name I_WorkCenter, Basic/Dimension, Release Status Released) " +
      "ועמוד What's New 2025 CDS Views for Basic Work Center Data (loio 21cd2fa6d9dd4855a02f7edc83dcfe22) המונה " +
      "את I_WorkCenter, I_WorkCenterCostCenter ו-I_WorkCenterText בטבלת ה-CDS Views שהשתנו; עמוד Work Center " +
      "בתיעוד APIs for Manufacturing (2025.001, loio d01ff746f7934178ac5c84b15778b05d) נוקב בשם השירות " +
      "API_WORK_CENTER (OData V4, SRVD_A2X) לצד נתיב ה-V2‏ API_WORK_CENTERS; רשימת הישויות והפרמטרים המלאה לא " +
      "אומתה. חיפושי Simplification / deprecation ברכיב PP-BD-WKC החזירו רשומות What's New על ממשקי API ויישומי " +
      "Fiori של מרכז עבודה (בהן OData API: Work Center 2020 ו-2021, SOAP API: Work Center - Replicate 2020, " +
      "Manage Work Center Groups 2020 ו-2021, Workcenter Groups - Replicate 2023) ועמודי ארכוב PP-BD-WKC, ללא " +
      "פריט פישוט או הודעת הוצאה משימוש למרכז העבודה. אי-התאמות במאגר: data/academy/lessons/pm-generated.ts:171 " +
      "מסמן את המודול בדרגת אמון verified-docs עם מקור 'SAP Help Portal - Plant Maintenance (S/4HANA)', סימון " +
      "שהחיפושים הרשמיים של הסשן אינם משחזרים; data/function-intel.ts כותב 'זמין ב-S/4HANA' ללא הסתייגות וללא " +
      "דגל inferred; data/domains.ts (pm-work-centers) מונה את המודול תחת bapis אף שאינו BAPI. הבלופרינט של " +
      "PP-PI נוקב לאותה טבלה בשם CR_WORK_CENTER_READ; שני השמות קיימים כמזהים בדאטהסט ואף אחד מהם לא אומת. F6175 " +
      "(Manage Work Centers) נוקב בעמוד רשמי אך אינו ב-data/fiori/apps.ts ולכן אינו ב-xrefs; fiori:F3289 (Manage " +
      "Work Center Capacity) קיים בדאטהסט. tx:IR02 ו-tx:IR03 קיימים במניפסט הטרנזקציות ויש להם דף באפליקציה; הם " +
      "נוספו ל-xrefs לצד tx:IR01.",
  },

  /* ------------------------------- fm:CRAP_WORKCENTER_GET_DETAIL */
  {
    id: "fm:CRAP_WORKCENTER_GET_DETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/62ec4758c3f90a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "תיעוד APIs for Manufacturing לגרסת 2025 FPS01 מתעד שירות OData לקריאת פרטי מרכז עבודה: 'Work Center " +
          "Technical name: API_WORK_CENTERS This service enables you to read, create and update all details of a " +
          "work center' (כלשון הסניפט), כולל ישויות קיבולת כגון Capacity Shift Version 2 " +
          "(A_WorkCenterCapacityShift_2). הקשר דומייני בלבד; הסניפט אינו נוקב בשם CRAP_WORKCENTER_GET_DETAIL ואינו " +
          "קושר את השירות למודול פונקציה קלאסי כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Read Work Center | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/1e5f218e776d4dbebc7955a12e35c86f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "דף הפעולה Read Work Center (2025 FPS01) קובע: 'To retrieve the work centers, use the GET HTTP method' על " +
          "הישות A_WorkCenters בנתיב /sap/opu/odata/sap/API_WORK_CENTERS (מפתח WorkCenterInternalID " +
          "ו-WorkCenterTypeCode לפי הסניפט), עם ניווט to_WorkCenterDescription ושליפת 'details of cost center " +
          "assignments to a work center'. זהו ערוץ הקריאה המתועד רשמית לפרטי מרכז עבודה ב-S/4HANA; הסניפט אינו מזכיר " +
          "את ה-FM.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Work Center | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/4e366afdf7604bc9b25f39b4aff05cb2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "עמוד Work Center בתיעוד Maintenance Management לגרסת 2025 FPS01 מגדיר את מושגי מרכז העבודה בתחזוקת מפעל: " +
          "'Main work center The work center that is assigned to a maintenance order at the header level' " +
          "ו-'Maintenance work center The work center that is in charge when a maintenance task is performed', שיכול " +
          "להיות מרכז העבודה הראשי או המבצע. הקשר דומייני בלבד; הסניפט אינו נוקב בשם מודול הפונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Work center | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/fbb00ccf1fde4610b35b39caac89dc0c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "עמוד אובייקט ההגירה PP - Work center (Data Migration, 2025 FPS01, מקור ERP) קובע לפי הסניפט: 'This " +
          "migration object automatically selects all work centers from the CRHD table for the derived plants', " +
          "ומונה תחת 'APIs/BAPIs Used in Migration-Specific Function Modules' את 'Function Module: " +
          "CNV_PE_S4_PM_CREATE_WORKCENTER APIs/BAPI CRAP_WORKCENTER_CREATE', לצד האפליקציה Display Work Center (app " +
          "ID CR03). זהו אזכור רשמי לבן משפחה של CRAP_WORKCENTER_ ב-S/4HANA 2025 (יצירה בלבד); הסניפט אינו נוקב בשם " +
          "CRAP_WORKCENTER_GET_DETAIL ואינו אומר דבר על סטטוס השחרור של אף אחד מהם.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PM, מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת שליפת פרטי מרכז עבודה (קיבולת, נוסחאות תזמון, שיוך מרכז עלות) לפי מזהה OBJID/ARBPL, " +
          "בהקשר IR03/CR03 וטבלאות CRHD/CRCA ו-CDS I_WorkCenter; שדה ה-ECC נושא הסתייגות מפורשת 'שם תלוי גרסה, אמת " +
          "ב-SE37; ראה גם CR_WORK_CENTER_READ', שדה ה-S/4 אומר 'אמת ב-S/4', והרשומה כולה מסומנת inferred: true. שני " +
          "ה-blueprints מונים את ה-FM תחת CRHD (PM: 'שליפת פרטי מרכז עבודה', PP-PI: 'שליפת פרטי משאב').",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CRAP_WORKCENTER_GET_DETAIL",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "לפי נתוני הפרויקט (רשומה המסומנת inferred): מודול פונקציה לשליפת פרטי מרכז עבודה או משאב (כותרת CRHD, " +
        "קיבולת CRCA/KAKO, שיוך מרכז עלות CRCO), בשימוש תחזוקת מפעל (IR01/IR03) ותעשיות תהליכיות (CRC1/CRC3). קיום " +
        "הפונקציה, סטטוס השחרור שלה והממשק שלה לא אותרו באף מקור SAP רשמי ציבורי שנבדק, ולכן נדרש אימות במערכת SAP " +
        "(SE37) לפני כל שימוש בנתון. מקור רשמי נוקב רק בבן המשפחה CRAP_WORKCENTER_CREATE (עמוד ההגירה PP - Work " +
        "center, 2025 FPS01). ערוץ הקריאה המתועד רשמית לפרטי מרכז עבודה ב-S/4HANA הוא שירות ה-OData Work Center " +
        "(API_WORK_CENTERS, APIs for Manufacturing 2025 FPS01), שאינו מוצג כאן כיורש כי אין מקור רשמי הקושר אותו " +
        "ל-FM זה.",
      edition: "on-premise",
      release: null,
      source: {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PM, מסומנת inferred)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת שליפת פרטי מרכז עבודה (קיבולת, נוסחאות תזמון, שיוך מרכז עלות) לפי מזהה OBJID/ARBPL, " +
          "בהקשר IR03/CR03 וטבלאות CRHD/CRCA ו-CDS I_WorkCenter; שדה ה-ECC נושא הסתייגות מפורשת 'שם תלוי גרסה, אמת " +
          "ב-SE37; ראה גם CR_WORK_CENTER_READ', שדה ה-S/4 אומר 'אמת ב-S/4', והרשומה כולה מסומנת inferred: true. שני " +
          "ה-blueprints מונים את ה-FM תחת CRHD (PM: 'שליפת פרטי מרכז עבודה', PP-PI: 'שליפת פרטי משאב').",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#CRAP_WORKCENTER_GET_DETAIL",
      },
      recommendedAction: 
        "אימות ב-SE37 במערכת S/4HANA היעד: קיום הפונקציה, קבוצת הפונקציות, סטטוס השחרור (Released / Not released) " +
        "והפרמטרים, ובדיקת Where-Used בהתאמות אישיות שקוראות אותה. עד אז אין להציג זמינות ב-S/4HANA כעובדה מאומתת. " +
        "לפיתוח חדש ולממשקים להעדיף את הערוצים המתועדים רשמית: לקריאת נתוני אב של מרכז עבודה את תצוגת ה-CDS " +
        "המשוחררת I_WorkCenter (עם I_WorkCenterText ו-I_WorkCenterCostCenter), ולקריאה ועדכון בממשקים את שירות " +
        "ה-OData Work Center (API_WORK_CENTERS, דף Read Work Center) בתיעוד APIs for Manufacturing. ב-Clean Core " +
        "יש להניח שמודול פונקציה מסדרת CRAP_ אינו משוחרר עד להוכחה הפוכה מהמערכת.",
    },
    xrefs: [
      "table:CRHD",
      "table:CRCA",
      "table:CRCO",
      "table:CRTX",
      "table:KAKO",
      "cds:I_WorkCenter",
      "cds:I_WorkCenterCapacity",
      "cds:I_WorkCenterCostCenter",
      "cds:I_WorkCenterText",
      "tx:IR01",
      "tx:IR03",
      "tx:CR03",
      "tx:CRC3",
      "fm:CR_WORKCENTER_READ",
      "fm:CR_WORK_CENTER_READ",
      "fm:CR_TEXT_READ",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "אף מקור רשמי אינו נוקב בשם ה-FM. נבדק 2026-09-14: (1) שירות החיפוש של help.sap.com " +
      "(scripts/sap-help-search.mjs, סקופ On-Premise) בשם המדויק (10 תוצאות: עמודי APIs for Sourcing / Project " +
      "System / Manufacturing ו-What's New 1709, אף כותרת או סניפט אינם מזכירים את ה-FM), 'work center BAPI " +
      "GetDetail' (21), 'Work Center API Manufacturing OData' (21), 'work center CRHD read function module', " +
      "'Work Center Virtual Data Model I_WorkCenter', 'BAPI_WORKCENTER work center BAPI', 'Manage Work Centers " +
      "app' ו-'work center function module released API alternative clean core' (8 שאילתות); (2) חיפוש רשת מוגבל " +
      "לדומיינים הרשמיים, בשם במירכאות, החזיר רק עמודי מרכז עבודה כלליים (Work Center, Creating Changing and " +
      "Displaying Work Centers, Manage Work Center Capacity F3289) ואף אחד לא נוקב בשם. בחיפושי הסשן לא אותר " +
      "ב-SAP Help תיעוד פר-מודול ל-FM קלאסי זה; הדבר ניתן לאישוש רק ב-SE37 / מערכת חיה, וחיבור ה-MCP sc4sap נכשל " +
      "בסשן (לפי כללי ה-fallback של MANIFEST עובדות ממשק כאלה נשארות 'נדרש אימות'). חיפוש רשת פתוח העלה שרשור " +
      "SAP Community (Tier 3, גילוי בלבד) על חלופה משוחררת ל-FM האח CRAP_WORKCENTER_CREATE ב-S/4HANA 2023; " +
      "ה-WebFetch החזיר HTTP 403 ולכן תוכנו לא נקרא ואינו מצוטט; אתרי צד-שלישי המונים CRAP_WORKCENTER_CREATE / " +
      "CRAP_WORKCENTER_CHANGE אינם ברשימת הדומיינים המותרים ואף אחד מהם לא הראה את GET_DETAIL. ארבע הראיות " +
      "הרשמיות (loio 62ec4758, 1e5f218e, 4e366afd, fbb00ccf; כולן 2025.001, URL ו-loio הועתקו כלשונם מרשומות " +
      "החיפוש) מכסות את הדומיין ואת המשפחה בלבד: שירות ה-OData Work Center (API_WORK_CENTERS; קיים גם שירות בשם " +
      "API_WORK_CENTER, loio d01ff746, נתיב /sap/opu/odata4/ לפי הרשומה Operations for Work Center loio " +
      "befc0d2c, לא צוטט), מושגי מרכז העבודה בתחזוקת מפעל, ועמוד ההגירה PP - Work center. גוף דפי ה-Help הוא " +
      "מעטפת JavaScript ולכן כל טענה תחומה בכותרת ובסניפט. שני עמודי ההגירה PP - Work center (Data Migration, " +
      "2025.001; loio fbb00ccf למקור ERP, loio 70a186f1 למקור AFS) קובעים שאובייקט ההגירה 'automatically selects " +
      "all work centers from the CRHD table' ונוקבים, לפי הסניפט, במודול ההגירה הייעודי " +
      "(CNV_PE_S4_PM_CREATE_WORKCENTER בגרסת ERP, CNV_PE_S4_AFS_CREAT_WORKCENTER בגרסת AFS) וב-API/BAPI שבו הוא " +
      "משתמש: CRAP_WORKCENTER_CREATE. זהו אזכור רשמי לבן משפחה של CRAP_WORKCENTER_ ב-S/4HANA 2025, אך לא " +
      "ל-GET_DETAIL ולא לסטטוס שחרור; fm:CRAP_WORKCENTER_CREATE אינו ביקום ולכן אין xref. רובד Tier-2 עקבי בשישה " +
      "קבצים (function-intel, מסומן inferred: true; sapData.pm#CRHD; sapData.pppi#CRHD; domains#pm-work-centers; " +
      "domain-detail#pm-work-centers; transactions#IR01): ה-FM שולף פרטי מרכז עבודה או משאב. סתירות פנימיות: " +
      "academy/lessons/pm-generated.ts:171 מסמן את ההפניה trust 'verified-docs' ממקור 'SAP Help Portal - Plant " +
      "Maintenance (S/4HANA)', תווית שחיפושי הסשן לא שחזרו; lib/verification.ts מסווג את התבנית ^CRAP_ כחשודה " +
      "בעוד domains / transactions מציגים את ה-FM כשמיש; שם ה-FM האח לקריאה כתוב CR_WORKCENTER_READ ב-PM " +
      "ו-CR_WORK_CENTER_READ ב-PP-PI (שני המזהים ביקום, שניהם ב-xrefs, אף אחד לא אומת), " +
      "ו-data/bapi-enrichment.sweep.ts:85 מסמן את CR_WORK_CENTER_READ כלא מאומת בשם זה (invalid) ומפנה " +
      "ל-CR_WORKSTATION_READ / CR_RFC_WORKCENTER_LIST, שאינם ביקום; ה-xref fm:CR_WORK_CENTER_READ נשמר רק כמזהה " +
      "קיים ביקום, לא כשם מאומת. לא נטענת החלפה או הוצאה משימוש ולכן אין יורש; API_WORK_CENTERS ו-I_WorkCenter " +
      "מוזכרים בהמלצה כערוצים מתועדים, לא כיורשים. אין xref ל-Fiori: Manage Work Centers (F6175, נקוב בעמוד " +
      "ההגירה Work center/Resource loio d1c46c79) אינו ב-data/fiori/apps.ts, ו-F3289 (Manage Work Center " +
      "Capacity) לא אומת כקשור ל-FM. api.sap.com לא צוטט (מעטפת יישום ללא מפתח API).",
  },

  /* -------------------------------------- fm:CS_BOM_EXPL_EQU_RC1 */
  {
    id: "fm:CS_BOM_EXPL_EQU_RC1",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: 
          "help.sap.com search: \"CS_BOM_EXPL_EQU_RC1\", \"CS_BOM_EXPL_EQU_V2\", \"CS_BOM_EXPL\", \"equipment BOM " +
          "explosion\", \"BOM explosion function module equipment\" (SAP_S4HANA_ON-PREMISE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "ממצא שלילי: בחמש וריאציות שאילתה בשירות החיפוש של SAP Help (סקופ On-Premise, 2026-09-14) אף כותרת או " +
          "תקציר אינם נוקבים בשם CS_BOM_EXPL_EQU_RC1 או בשם מודול פונקציה אחר לפיצוץ עץ מוצר של ציוד; חיפוש רשת העלה " +
          "רק כותרות KBA (מארח userapps.support.sap.com, שאינו ברשימת ההיתר, לא צוטט) הנוקבות ב-CS_BOM_EXPL_MAT_V2 " +
          "לעץ מוצר של חומר; לא אותר שם וריאנט לציוד.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: 
          "רשומת קטלוג הפונקציות של הפרויקט (PM, אובייקטים טכניים) והדאטהסט המחולל של בלופרינט PM (EQST, נושא 3: עצי " +
          "מוצר של אחזקה)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: 
          "רשומת המאגר מתארת פיצוץ עץ מוצר של ציוד (Equipment BOM) רב-שלבי או חד-שלבי לפי ציוד, מפעל ותאריך, עם טבלת " +
          "פלט STB, בזיקה ל-IB03/IB13 ולטבלאות EQST ו-STPO (תהליך PM-2); חוברת המיגרציה מייחסת את המודול לטבלת EQST " +
          "(קישור ציוד לעץ מוצר) לצד התוכנית RCSBI010. שדות ה-ecc/s4 ברשומה ('זמין') אינם נושאים מקור, ורישום " +
          "אובייקטי הפונקציה גוזר לה requires-verification / confidence: derived. לשם המקביל CS_BOM_EXPL_MAT_RC1 (עץ " +
          "מוצר של חומר) סריקת האימות של המאגר קבעה invalid-name והפנתה ל-CS_BOM_EXPL_MAT_V2; לווריאנט הציוד אין " +
          "רשומת סריקה.",
        verificationLevel: "repository_verified",
        repoRef: 
          "data/function-intel.ts#CS_BOM_EXPL_EQU_RC1; data/sapData.pm.ts#EQST (funcs/progs, נושא 3); " +
          "data/bapi-enrichment.sweep.ts#CS_BOM_EXPL_MAT_RC1; lib/bapi-registry.ts#deriveRegistry",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment BOM | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/71ffeafd52694ddeab9b1397362c3e9e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "הקשר בלבד (לא טענת יורש): אובייקט המיגרציה הרשמי לעץ מוצר של ציוד מתועד ל-On-Premise 2025 FPS01 עם מודול " +
          "פונקציה ייעודי למיגרציה CNV_PE_S4_PM_EQUIPMENT_BOM, וה-API הנקוב בתקציר תחת 'APIs/BAPIs' הוא " +
          "CSAI_BOM_MAINTAIN; הטרנזקציות הנקובות הן IB02 (שינוי) ו-IB03 (תצוגה, 'Display Equipment BOM'). התקציר " +
          "אינו נוקב ב-CS_BOM_EXPL_EQU_RC1.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Bill of Material (BOM) Categories in Plant Maintenance | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: 
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/a071b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE14,
        claim: 
          "תיעוד תחזוקת מפעל ל-2025 FPS01 קובע: 'The following types of BOM are found in Plant Maintenance: Material " +
          "BOMs, Equipment BOMs, Functional location BOMs', וסוג ה-BOM נקבע לפי סוג רשומת האב שאליה משויך העץ; כלומר " +
          "עץ מוצר של ציוד הוא סוג נפרד מעץ מוצר של חומר.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he: 
        "מודול פונקציה לפיצוץ עץ מוצר של ציוד (Equipment BOM, קטגוריית BOM נפרדת מעץ מוצר של חומר) בתחזוקת מפעל. " +
        "לא נמצא לו תיעוד רשמי ב-SAP Help, ואף מקור רשמי אינו נוקב בשם עם הסיומת _RC1; לשם המקביל לחומר " +
        "(CS_BOM_EXPL_MAT_RC1) המאגר כבר קבע invalid-name. הרישום מקורו בחוברת המיגרציה ובקטלוג הפונקציות של " +
        "הפרויקט בלבד, ונדרש אימות קיום, קבוצת פונקציות וסטטוס שחרור ב-SE37.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: 
        "אמת ב-SE37 במערכת ECC וב-S/4HANA אם השם CS_BOM_EXPL_EQU_RC1 קיים כלל, ואם הווריאנט התקני לפיצוץ עץ מוצר " +
        "של ציוד נושא שם אחר (בדוק את קבוצת הפונקציות של CS_BOM_EXPL_MAT_V2 באותו מסך). אל תשתמש במודול לפיצוץ עץ " +
        "מוצר של חומר ואל תציג אותו כממשק משוחרר. לאימות תפקודי השתמש ב-IB03 (תצוגת עץ מוצר של ציוד) מול טבלאות " +
        "EQST/STKO/STPO; למיגרציה השתמש באובייקט המיגרציה הרשמי PM - Equipment BOM.",
    },
    xrefs: [
      "table:EQST",
      "table:STKO",
      "table:STPO",
      "table:EQUI",
      "tx:IB01",
      "tx:IB03",
      "tx:IB13",
      "fm:CS_BOM_EXPL_MAT_RC1",
      "fm:CS_BOM_EXPL_FLO_RC1",
      "cds:I_BillOfMaterial",
      "cds:I_Equipment",
    ],
    lastVerifiedAt: DATE14,
    notes: 
      "לא קיים תיעוד רשמי ל-CS_BOM_EXPL_EQU_RC1 (בדיקה מ-2026-09-14). שתי רשומות חיפוש נוספות רלוונטיות להמשך " +
      "אימות ולא נכללו כראיה: 'BOM Explosion Level by Level' (LO-MD-BOM, 2025.001, loio " +
      "ebb1b853ff98b44ce10000000a174cb4) שתקצירו מונה את סוגי ה-BOM הנתמכים בדיווח הפיצוץ 'Material BOMs, Order " +
      "BOMs, Work breakdown structure BOMs' בלי לנקוב בעצי מוצר של ציוד; ו-'Equipment Link for Bill of Material' " +
      "(Virtual Data Model, 2023.latest, loio e3ab68f03b744658b9e4beeeda8afe42) שתקצירו נוקב ב-CDS View בסיסי " +
      "I_EQUIPMENTBOMLINK בסטטוס Released עם מאפייני Equipment Number, Plant, BOM Variant, BOM Variant Usage; " +
      "ה-View אינו קיים בקטלוג ה-CDS של הפרויקט ולכן אינו מצוין כ-xref או כיורש. פרמטרי הממשק (EQUNR/PLANT/DATE, " +
      "STB) הם תיאור המאגר בלבד ולא אומתו. ההבחנה בין עץ מוצר של ציוד לעץ מוצר של חומר נשמרת: ה-xref " +
      "ל-CS_BOM_EXPL_MAT_RC1 הוא הפניה לשם המקביל בלבד ואינו טענת חלופה.",
  },


  /* ==================== functions batch 3 (2026-09-21) ==================== */
  /* ------------------------------------------- fm:BAPI_EQUI_CHANGE */
  {
    id: "fm:BAPI_EQUI_CHANGE",
    evidence: [
      EQUI_OPS_WRITE,
      {
        sourceType: "sap_help",
        sourceTitle: "Release Notes · SAP enhancement package 3 for SAP ERP 6.0, קובץ " +
                     "Chapter_03__Release_Notes_Corporate_ServicesE.PDF, סעיף 'LOG_EAM_CI_2: BAPIs for " +
                     "Technical Objects (new and enhanced)' (PDF, נקרא במלואו)",
        url: "https://help.sap.com/doc/e5af5c111fde4fa5bf3fc521b113a7cf/6.03.18/en-US/Chapter_03__Release_Notes_Corporate_ServicesE.PDF",
        product: "SAP ERP 6.0 EHP3 (EA-PLM 603)",
        edition: "ecc",
        release: "6.03",
        accessedAt: "2026-09-21",
        claim: "מסמך Release Notes רשמי שהורד ונקרא במלואו קובע תחת הכותרת 'LOG_EAM_CI_2: BAPIs for " +
               "Technical Objects (new and enhanced)': 'As of SAP ECC 6.0, Enterprise Extension PLM, " +
               "Enhancement Package 3 (EA-PLM 603), business function Enterprise Asset Management " +
               "(LOG_EAM_CI_2), the following BAPIs are available for functional locations: " +
               "BAPI_FUNCLOC_INHERIT_CHANGE ... BAPI_FUNCLOC_STRUC_ASSIGN, BAPI_FUNCLOC_STRUC_UNASSIGN, " +
               "BAPI_FUNCLOC_STRUC_REPLACE', ומיד לאחר מכן: 'The BAPI BAPI_EQUI_CHANGE has also been " +
               "extended. You can use this BAPI to change the material/serial number of a piece of " +
               "equipment.' זהו המקור הרשמי היחיד שאותר הנוקב בשם BAPI_EQUI_CHANGE. הוא מתעד הרחבה של " +
               "ה-BAPI ב-ECC 6.0 EHP3 בהקשר פונקציית העסקים LOG_EAM_CI_2 בלבד, ואינו קובע דבר על סטטוס " +
               "השחרור של ה-BAPI, על הפרמטרים שלו או על מצבו ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 3 | Logistics",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/b23236698f104768955c692e03d00b79.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "עמוד Logistics של S/4HANA On-Premise‏ 2025 FPS01 מתעד את פונקציית העסקים LOG_EAM_CI_2 " +
               "‏('Technical Name of Business Function LOG_EAM_CI_2 ... Availability SAP S/4HANA, " +
               "on-premise') ומונה בין הפונקציות שהפעלתה מעמידה לרשות הלקוח את 'BAPIs for technical " +
               "objects'. התקציר כולל את המשפטים 'for Technical Objects (new and enhanced) New BAPIs are " +
               "available for functional locations' ו-'An existing BAPI was extended. You can use it to " +
               "change material/serial numbers for a piece of equipment'. כלומר תוכן LOG_EAM_CI_2 שנוקב " +
               "ב-ECC בשם BAPI_EQUI_CHANGE מתועד גם במהדורת S/4HANA 2025 FPS01, אך העמוד עצמו אינו נוקב " +
               "בשם ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישומי ה-BAPI של הפרויקט (PM enrichment, sweep, קטלוג הפונקציות) ודאטהסט הבלופרינט " +
                     "של PM",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "המאגר מתאר שינוי רשומת אב של ציוד קיים כמקבילת ה-API לטרנזקציה IE02: העברת מספר הציוד " +
               "בפרמטר EQUIPMENT יחד עם מבני הנתונים ודגלי העדכון שלהם ‏(DATA_GENERAL(+X)‎, " +
               "DATA_SPECIFIC(+X)‎, ובקטלוג הפונקציות 'DATA_GENERAL + DATA_GENERALX'), טבלת RETURN, וחובת " +
               "BAPI_TRANSACTION_COMMIT; טבלאות מושפעות EQUI, EQUZ ו-ILOA, תצוגת CDS‏ I_Equipment, תהליך " +
               "PM-2, והטעות הנפוצה המתועדת היא עדכון שדה בלי הדלקת דגל ה-X. רישום ה-BAPI מסמן " +
               "verificationStatus‏ verified-docs, eccSupport ‏'כן', s4OnPremSupport ‏'כן', cloudSupport " +
               "‏'לא צוין' ו-releasedStatus ‏'Released · RFC'; שדה המקור של רשומת ה-sweep הוא התווית 'SAP " +
               "Help Portal — verified 2026-07-15' ללא URL, ושל רשומת ה-PM enrichment ‏'SE37 metadata " +
               "mirror (sapdatasheet.org) + SAP Community', שתיהן ללא קישור רשמי. ה-BAPI רשום גם בדאטהסט " +
               "הבלופרינט תחת EQUI.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_EQUI_CHANGE; " +
                 "data/bapi-enrichment.sweep.ts#BAPI_EQUI_CHANGE; " +
                 "data/function-intel.ts#BAPI_EQUI_CHANGE; data/sapData.pm.ts#EQUI",
      },
    ],
    status: {
      status: "released_api_available",
      he: "לתרחיש של ה-BAPI, שינוי נתוני אב של ציוד קיים, קיימת חלופת OData מתועדת: שירות API_EQUIPMENT " +
          "במהדורת On-Premise‏ 2025 FPS01 מציג את הפעולה 'Update Equipment' בשיטת PATCH על הישות " +
          "Equipment, עם דרישת כותרת If-Match לכל פעולת שינוי, לצד עדכון סיווג וטקסט ארוך. ה-BAPI עצמו " +
          "נוקב בשמו רק במסמך Release Notes של ECC 6.0 EHP3 ‏(LOG_EAM_CI_2), המתעד את הרחבתו לשינוי מספר " +
          "חומר ומספר סידורי של ציוד; אותה פונקציית עסקים מתועדת גם בעמוד Logistics של S/4HANA 2025 FPS01 " +
          "ללא נקיבת שם ה-BAPI. לא אותר תיעוד SAP רשמי הקובע הוצאה משימוש, החלפה או הגבלה של " +
          "BAPI_EQUI_CHANGE ב-S/4HANA, ולא אותר מקור רשמי הקובע את סטטוס השחרור שלו או את רשימת הפרמטרים " +
          "שלו; אלה מגיעים מנתוני הפרויקט בלבד.",
      edition: "on-premise",
      release: "2025.001",
      source: EQUI_OPS_WRITE,
      recommendedAction:
        "בממשקי RFC קיימים להמשיך בדפוס המתועד במאגר: EQUIPMENT יחד עם מבנה הנתונים ומבנה ה-X המקביל " +
        "לשדות שמשתנים, בדיקת טבלת RETURN ‏(TYPE = E/A) ואז BAPI_TRANSACTION_COMMIT; לאמת ב-SE37 במערכת " +
        "היעד את סטטוס השחרור ואת שמות מבני הפרמטרים לפני שמסתמכים על נתוני המאגר. לאינטגרציות חדשות, " +
        "לעדכון המוני ולתרחישי ענן להעדיף את שירות ה-OData‏ API_EQUIPMENT ‏(Update Equipment בשיטת PATCH, " +
        "עם כותרת If-Match). לשינוי מספר חומר או מספר סידורי של ציוד לבדוק תחילה אם פונקציית העסקים " +
        "LOG_EAM_CI_2 פעילה במערכת, ולשים לב שלפי עמוד Material Serial Number ‏(APIs for Maintenance " +
        "Management, 2025.001) שירות המספר הסידורי אינו מעדכן נתוני ציוד ‏('This API does not update the " +
        "data related to an equipment') ועדכון נתוני הציוד נעשה דרך Equipment API.",
    },
    xrefs: [
      "fm:BAPI_EQUI_CREATE",
      "fm:BAPI_EQUI_GETDETAIL",
      "fm:BAPI_EQUI_INSTALL",
      "fm:BAPI_FUNCLOC_CHANGE",
      "fm:BAPI_TRANSACTION_COMMIT",
      "table:EQUI",
      "table:EQKT",
      "table:EQUZ",
      "table:ILOA",
      "tx:IE02",
      "tx:IE05",
      "tx:IE4N",
      "cds:I_Equipment",
      "fiori:F2730A",
      "enh:badi:BADI_EAM_TOB",
      "enh:exit:IEQM0001",
      "enh:exit:ITOB0001",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "הסטטוס הנגזר כיום באפליקציה (מרישום הפונקציות: verified-docs, תמיכת S/4HANA On-Premise 'כן', " +
      "'Released · RFC') מציג 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט'. רשומה זו מעלה את הרמה " +
      "ל'מאומת מול תיעוד SAP רשמי' עבור החלופה הרשמית בלבד ומשנה את הסטטוס ל'קיים API משוחרר'; היא אינה " +
      "מאמתת את סטטוס השחרור של ה-BAPI עצמו ואינה טוענת החלפה, ולכן אין יורש. היקף הרשומה הוא שינוי ציוד " +
      "קיים בלבד: ראיית ה-Release Notes של ECC 6.0 EHP3 נוגעת להרחבת BAPI_EQUI_CHANGE למספר חומר/מספר " +
      "סידורי, לא ליצירת ציוד, ופעולות ההתקנה והפירוק שבעמוד הסקירה של APIs for Maintenance Management " +
      "‏('Install and dismantle equipment without data transfer') שייכות לתרחיש אחר. ממצא שלילי " +
      "תחום-חיפוש: שבע-עשרה שאילתות בשירות החיפוש של help.sap.com ב-2026-09-21 (בהן 'BAPI_EQUI_CHANGE' " +
      "בסקופ SAP_S4HANA_ON-PREMISE, שבו שירות החיפוש החזיר בהרצות חוזרות בין שבע לתשע רשומות, ואף אחת מהן " +
      "אינה נוקבת בשם ה-BAPI בכותרת או בתקציר; 'BAPI_EQUI_CHANGE equipment BAPI BUS0028' בסקופ SAP_ERP; " +
      "'Equipment API_EQUIPMENT OData service'; 'Update Equipment PATCH equipment master data'; " +
      "'Operations for Equipment API_EQUIPMENT'; 'Simplification equipment technical objects plant " +
      "maintenance S/4HANA'; 'BAdI Modification of Data in BAPIs for Technical Objects'; 'BAPIs for " +
      "technical objects change material serial number equipment existing BAPI extended') וכן שתי הרצות " +
      "WebSearch מוגבלות ל-help.sap.com / api.sap.com / fioriappslibrary / fal.cloud.sap לא העלו אף עמוד " +
      "HTML של S/4HANA הנוקב בשם ה-BAPI; שלושה מסמכי PDF רשמיים נוספים שהורדו ונסרקו " +
      "(IntegrationGuide_SAP_PdMS_OP_FP05, ACF_Integration_ExtensibilityGuide, SAP_ASPM_IntegrationGuide) " +
      "אינם נוקבים בו, והראשון נוקב ב-BAPI_EQUI_GETDETAIL בלבד. עמוד הסקירה APIs for Maintenance " +
      "Management ‏(loio 13d40bd35fc74d289e81fc284a928448, 2025.001) מונה 'Update equipment master data' " +
      "ו-'Mass create, read, and update equipment master data' כפעולות השירות, ורשומת What's New‏ 'ODATA " +
      "API: Equipment' ‏(loio 41934c850eff4b02955311bb1d3abf8f, גרסה 2020.000) מתארת אותו שירות " +
      "כ-'synchronous inbound service' ליצירה, עדכון וקריאה של ציוד; שתיהן הקשר תומך ולא צורפו כראיה " +
      "נפרדת. ההקשר הפונקציונלי לשינוי ציוד מתועד בעמוד Changing a Piece of Equipment ‏(Technical Objects " +
      "CS-BD/PM-EQM, loio da78bb53707db44ce10000000a174cb4, 2025.001). כותרת השער של קובץ ה-PDF שנקרא היא " +
      "'Release Notes · Reporting Financials · SAP enhancement package 3 for SAP ERP 6.0' בעוד שהקובץ " +
      "עצמו הוא פרק Corporate Services שבתוכו סעיפי LOG_EAM_CI_2; הציטוט לקוח מגוף הפרק. שמות מבני " +
      "הפרמטרים ודגלי ה-X, קבוצת הפונקציות וסטטוס Released לא אומתו מול מקור רשמי ולא מול SE37. זמינות " +
      "ב-S/4HANA Cloud Public Edition לא נבדקה. הפניית enh:badi:BADI_EAM_TOB ושתי הפניות ה-Customer Exit " +
      "הן קישורי הקשר מקטלוג ההרחבות של הפרויקט; ה-BAdI‏ 'Modification of Data in BAPIs for Technical " +
      "Objects' שמופיע ברשומות What's New מ-1610 עד 2020 לא הוצלב לשם טכני ואינו נטען כאן.",
  },

  /* ------------------------------------------- fm:BAPI_EQUI_GETDETAIL */
  {
    id: "fm:BAPI_EQUI_GETDETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"BAPI_EQUI_GETDETAIL\" (SAP_S4HANA_ON-PREMISE), " +
                     "\"BAPI_EQUI_GETDETAIL equipment read BAPI\" (SAP_ERP), \"BAPI_EQUI_CREATE " +
                     "BAPI_EQUI_CHANGE equipment master BAPI\", \"Simplification technical objects " +
                     "equipment BAPI deprecated Plant Maintenance S/4HANA\"",
        product: "SAP S/4HANA / SAP ERP 6.0",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "ממצא שלילי: בארבע שאילתות לשירות החיפוש של SAP Help, בשני מערכי המוצר " +
               "SAP_S4HANA_ON-PREMISE ו-SAP_ERP, אף רשומה אינה נוקבת בשם BAPI_EQUI_GETDETAIL בכותרת או " +
               "בתקציר. התוצאות לשם המדויק במערך S/4HANA שייכות לחוברות שאינן קשורות (Brazil, What's New " +
               "in Transactional Banking, APIs for Sales) ותקציריהן ריקים, ובמערך SAP ERP הוחזרו נושאי " +
               "Enterprise Asset Management ו-BAdI שאינם נוקבים בשמו. לא אותרה רשומת SAP Help הנוקבת " +
               "ב-BAPI לקריאת ציוד (תחזוקת מפעל); הממצא תחום לשאילתות שהורצו ואינו הוכחה להיעדר תיעוד.",
        verificationLevel: "verification_required",
      },
      EQUI_OPS_READ,
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment | Data Migration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/2f60604160f141be904d23b23e69c3a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "‏עמוד אובייקט ההגירה PM - Equipment במהדורת 2025 FPS01 נוקב בתקציר ב-BAPI_EQUI_CREATE לצד " +
               "אפליקציית Display Technical Object (app ID W0028), במודולי ההגירה CNV_PE_S4_PM_EQUI_USTAT " +
               "ו-CNV_PE_S4_CA_DIR_OBJ_LINKS וב-BAPI_DOCUMENT_CHANGE2, ומציין את קודי הטרנזקציה IE02 " +
               "לשינוי ו-IE03 להצגה. אח ממשפחת ה-BAPI של הציוד מתועד אפוא ב-S/4HANA 2025 FPS01; ה-BAPI " +
               "הקורא BAPI_EQUI_GETDETAIL עצמו אינו נזכר בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM ו-sweep) והקטלוג הפונקציונלי",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "רשומת ההעשרה מתארת BAPI מסוג Read (קריאה בלבד, ללא COMMIT) על אובייקט BOR‏ EquipmentPM, " +
               "בזיקה לטרנזקציה IE03 ולטבלאות EQUI ו-EQKT, עם סיכום פרמטרים 'IMP EQUIPMENT · EXP " +
               "DATA_GENERAL_EXP, DATA_SPECIFIC_EXP · TAB RETURN'. רשומת הסריקה מסמנת אותו verified עם " +
               "RFC וללא COMMIT ומתארת 'הצגת פרטי ציוד (כללי/ספציפי/מיקום)', ואילו רשומת הקטלוג " +
               "(data/function-intel.ts) מונה כפלט את DATA_GENERAL_EXP בלבד וקובעת ל-S/4 'זמין ב-S/4HANA' " +
               "בלי לנקוב בחלופת OData. ברובד המאגר הרשומה נושאת גם stability 'Released' " +
               "ו-s4OnPremSupport 'yes'; אלה נתוני פרויקט ולא הצהרת שחרור רשמית של SAP. מקור האימות " +
               "שברשומת הסריקה הוא מחרוזת תבניתית ללא קישור, המציינת אימות מול SAP Help Portal בתאריך " +
               "2026-07-15, ואינו ראיה רשמית.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_EQUI_GETDETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: "לקריאת נתוני אב של ציוד (תחזוקת מפעל) קיים ב-S/4HANA On-Premise ממשק OData רשמי: " +
          "API_EQUIPMENT, שעמוד Operations for Equipment במדריך APIs for Maintenance Management למהדורת " +
          "2025 FPS01 מציג בו את הפעולה Read Equipment בשיטת GET תחת הנתיב " +
          "‎/sap/opu/odata/sap/API_EQUIPMENT/Equipment, לצד Read Equipment Text ובקשת Batch. ה-BAPI עצמו, " +
          "BAPI_EQUI_GETDETAIL, אינו נזכר באף רשומת SAP Help שנסרקה, לא במערך S/4HANA On-Premise ולא " +
          "במערך SAP ERP; זמינותו ב-S/4HANA נשענת על רשומות המאגר (verified-docs, RFC לקריאה בלבד) ועל כך " +
          "שאחיו למשפחה BAPI_EQUI_CREATE נקוב בעמוד אובייקט ההגירה PM - Equipment של 2025 FPS01. לא אותר " +
          "תיעוד רשמי המכריז עליו כמוחלף או כמוצא משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: EQUI_OPS_READ,
      recommendedAction:
        "בממשקי RFC קיימים אפשר להמשיך לקרוא נתוני ציוד דרך ה-BAPI, לאחר אימות קיומו, סטטוס השחרור שלו " +
        "ורשימת הפרמטרים בפועל במערכת היעד (SE37 או BAPI Explorer). לאינטגרציות חדשות ולתרחישי OData או " +
        "REST להעדיף את API_EQUIPMENT (Read Equipment), ולדיווח, לאנליטיקה ולפיתוח ABAP חדש להעדיף את " +
        "תצוגת ה-CDS‏ I_Equipment על פני SELECT ישיר מ-EQUI ומ-EQKT. את רשימת הישויות, השדות והמגבלות של " +
        "השירות יש לאמת מול Business Accelerator Hub (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_EQUI_CREATE",
      "fm:BAPI_EQUI_CHANGE",
      "fm:BAPI_FUNCLOC_GETDETAIL",
      "fm:BAPI_ALM_ORDER_GET_DETAIL",
      "fm:EQUIPMENT_TEXT_READ",
      "table:EQUI",
      "table:EQKT",
      "table:EQUZ",
      "table:ILOA",
      "table:IFLOT",
      "tx:IE01",
      "tx:IE02",
      "tx:IE03",
      "tx:IH08",
      "cds:I_Equipment",
      "cds:I_EquipmentTimeSegment",
      "cds:I_FunctionalLocation",
      "fiori:F2730A",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "(1) הסטטוס 'קיים API משוחרר' נסמך על עמוד Operations for Equipment ‏(loio " +
      "d1e3c797d3f44120b552d0e64680e445, ‏2025.001). זו חלופה משוחררת ולא טענת החלפה רשמית של ה-BAPI, " +
      "ולכן אין יורש ברשומה. (2) שם ה-BAPI עצמו לא נמצא באף רשומת help.sap.com, לא במערך " +
      "SAP_S4HANA_ON-PREMISE ולא במערך SAP_ERP; קיומו, סטטוס השחרור שלו ורשימת הפרמטרים (EQUIPMENT, " +
      "DATA_GENERAL_EXP, DATA_SPECIFIC_EXP, RETURN) נשענים על רשומות המאגר בלבד ודורשים אימות ב-SE37 " +
      "במערכת היעד. (3) גופי עמודי ה-Help לא נקראו (מעטפת JavaScript), ולכן כל טענה תחומה בכותרת ובתקציר " +
      "של רשומת החיפוש; ספירות התוצאות של שירות החיפוש אינן יציבות בין הרצות ולכן אינן נרשמות. (4) רשומות " +
      "רשמיות נוספות אותרו באותם חיפושים ולא נשמרו כראיות נפרדות: 'Read Equipment' ‏(loio " +
      "53d9e679e7834421b2a1ef3070d44890, ‏2025.001), 'APIs for Maintenance Management' ‏(loio " +
      "13d40bd35fc74d289e81fc284a928448, ‏2025.001; התקציר מונה קריאה, יצירה ועדכון של נתוני אב ציוד " +
      "ומחיקה של הקצאת סיווג בלבד, ומציין שהשדה UniqueItemIdentifier אינו נתמך עדיין), ורשומת What's New " +
      "לגרסת 2025 ‏'OData API: Equipment' ‏(loio 7ceae65191e944648db4b3a4f76661ae, ‏2025.000). רישום " +
      "ה-Hub ‏https://api.sap.com/api/OP_API_EQUIPMENT/overview אותר בחיפוש מוגבל-דומיין בכותרתו בלבד " +
      "‏('Overview | Equipment | SAP Business Accelerator Hub'); בקשת curl לא מאומתת לעמוד זה מחזירה HTTP " +
      "401, ולכן תוכנו לא נקרא. (5) סתירות פנימיות במאגר: data/bapi-enrichment.sweep.ts מתאר החזרת נתוני " +
      "מיקום, בעוד data/bapi-enrichment.pm.ts מונה רק DATA_GENERAL_EXP ו-DATA_SPECIFIC_EXP, " +
      "ו-data/function-intel.ts מונה רק DATA_GENERAL_EXP וקובע זמינות ב-S/4HANA בלי לנקוב בחלופת OData, " +
      "אף שברשומת BAPI_EQUI_CHANGE הוא כן נוקב ב-API_EQUIPMENT. (6) מזהה האפליקציה W0028 ‏(Display " +
      "Technical Object) שמופיע בעמוד ההגירה אינו קיים ביקום מזהי ה-Fiori של הפרויקט, ולכן ה-xref מפנה " +
      "ל-fiori:F2730A ‏(Manage Technical Objects) שהוא מזהה מאגר ולא אומת מול ספריית האפליקציות במעבר זה. " +
      "(7) מהדורות Cloud לא נבדקו ברשומה זו. (8) לא צוטט פריט פישוט, SAP Note או KBA: אף אחת מהשאילתות לא " +
      "החזירה כזה הנוקב ב-BAPI.",
  },

  /* ------------------------------------------- fm:BAPI_FUNCLOC_CREATE */
  {
    id: "fm:BAPI_FUNCLOC_CREATE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA " +
                     "Cloud Private Edition 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "רשומת What's New לגרסת On-Premise 2025 FPS01 מציגה את ה-BAdI החדש 'BAdI for Functional " +
               "Location (BADI_ASM_MD_FUNCLOC)' ש'allows you to add custom validations while creating or " +
               "updating' מיקומים פונקציונליים, תחת Scope Item 4HH ‏(Reactive Maintenance) ו-4HI " +
               "‏(Proactive Maintenance). הסניפט מונה את נקודות הכניסה שעליהן חלה הוולידציה, החל מאמצע " +
               "הרשימה: IL02 ‏(Change Functional Location), יישום Web Dynpro‏ 'Process Technical Object " +
               "(W0029) to create or change technical objects', 'API - Functional Location " +
               "(API_FUNCTIONALLOCATION)' ו-'SAP Fiori app - Migrate Your Data (F3473)', ומוסיף: 'You can " +
               "also add validations for the header details of functional locations by using the " +
               "following business application programming interfaces (BAPIs): PM BAPI: Create Functional " +
               "Location (BAPI_FUNCLOC_CREATE) PM BAPI: Change Functional Location " +
               "(BAPI_FUNCLOC_CHANGE)'. כלומר BAPI_FUNCLOC_CREATE מתועד בגרסה 2025 FPS01 כערוץ יצירה פעיל " +
               "של מיקום פונקציונלי, בשמו הרשמי 'PM BAPI: Create Functional Location', ומימוש ה-BAdI החדש " +
               "חל גם על קריאות דרכו. ‏IL01 אינו נראה בסניפט עצמו (הקטע נפתח בסוגר סוגר שמעיד על פריט " +
               "שקדם לו), והוא מאומת דרך המסמך הרשמי WN_OP2025_FPS01_EN.pdf סעיף 3.1.15 כמתועד " +
               "ב-data/verification/enhancements.ts.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Functional location | Data Migration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/7c5578ab53e0457f905145bc535839cf.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "אובייקט ההגירה PM - Functional location ‏(מדריך Data Migration, 2025 FPS01) מתואר בסניפט " +
               "כ-'This migration object enables you to migrate functional location data from the source " +
               "ERP system to the target system based on the default selection criteria', ונכתב בו " +
               "ש-'This migration object automatically selects functional locations from the ILOA table " +
               "for the derived plants'. בין שלבי ההעברה מופיעים 'Create Functional Location Creates the " +
               "functional location in the target system. All instances that qualify for this transfer " +
               "option are relevant to the transfer step' ו-'Change Data Origin Changes the data origin " +
               "data in the target system'. תחת הכותרת 'APIs/BAPIs Used in Migration-Specific Function " +
               "Modules' נכתב 'A migration-specific function module is used in this migration object' " +
               "ו-'This function module uses standard BAPIs or other function modules to complete the " +
               "migration scope'. בסניפטים של אותו נושא מופיעים בשמם BAPI_FUNCLOC_CREATE, מודול ההגירה " +
               "CNV_PE_S4_PM_FNLOC_USTAT והיישום 'Display Technical Object (app ID W0028)'.",
        verificationLevel: "sap_official_verified",
      },
      FLOC_API_CREATE,
      {
        sourceType: "repository",
        sourceTitle: "רשומות הפרויקט ל-BAPI_FUNCLOC_CREATE: קטלוג הפונקציות, רישום ה-BAPI המועשר (PM + " +
                     "sweep) והבלופרינט של IFLOT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "המאגר מתעד: 'זמין ב-ECC' ו-'זמין ב-S/4HANA. חלופה: OData API_FUNCTIONALLOCATION / Fiori' " +
               "‏(data/function-intel.ts), רישום sweep מסוג verified-docs עם s4OnPremSupport yes, RFC yes " +
               "ו-requiresCommit yes ‏(data/bapi-enrichment.sweep.ts), ורישום PM מועשר: אובייקט BOR‏ " +
               "FunctLocation, טרנזקציה IL01, טבלאות IFLOT/IFLOTX/ILOA, אובייקטי הרשאה I_ILOA ו-I_TL " +
               "‏(data/bapi-enrichment.pm.ts). הבלופרינט מונה את ה-BAPI תחת טבלת IFLOT בתיאור 'יצירת " +
               "מיקום פונקציונלי דרך ממשק תקני' ‏(data/sapData.pm.ts). הזמינות ב-S/4HANA והחלופה " +
               "API_FUNCTIONALLOCATION עקביות עם המקורות הרשמיים ברשומה זו. לעומת זאת שמות הפרמטרים " +
               "סותרים בתוך המאגר עצמו: data/function-intel.ts נוקב ב-FUNCTLOC ככניסה וב-FUNCTLOCATION " +
               "כיציאה, data/bapi-enrichment.pm.ts נוקב ב-'IMP EXTERNAL_NUMBER, DATA_GENERAL, " +
               "DATA_SPECIFIC · TAB RETURN', ו-data/bapi-enrichment.sweep.ts נוקב ב-'IN: FUNCTLOCATION, " +
               "DATA_GENERAL, DATA_SPECIFIC · OUT: FUNCTLOCATION, RETURN'. אף סניפט רשמי שנקרא אינו נוקב " +
               "בפרמטר כלשהו, ולכן הממשק נשאר בלתי מאומת ואינו נטען ברשומה זו.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_FUNCLOC_CREATE",
      },
    ],
    status: {
      status: "released_api_available",
      he: "‏BAPI_FUNCLOC_CREATE, בשמו הרשמי 'PM BAPI: Create Functional Location', הוא ה-BAPI ליצירת " +
          "מיקום פונקציונלי בתחזוקת מפעל, והוא מתועד כערוץ יצירה פעיל ב-S/4HANA On-Premise 2025 FPS01: " +
          "רשומת ה-What's New של ה-BAdI החדש BADI_ASM_MD_FUNCLOC מונה אותו יחד עם IL01, IL02, יישום ה-Web " +
          "Dynpro‏ Process Technical Object ‏(W0029), שירות ה-OData‏ API_FUNCTIONALLOCATION והיישום " +
          "Migrate Your Data ‏(F3473) כנקודות הכניסה שעליהן חלות הוולידציות החדשות, ואובייקט ההגירה PM - " +
          "Functional location ב-Migration Cockpit מונה אותו בין ה-BAPIs שמודול ההגירה משתמש בהם. לצדו " +
          "מתועד שירות OData לקריאה, יצירה, עדכון ומחיקה של אב-נתוני מיקום פונקציונלי, ‏Functional " +
          "Location ‏(API_FUNCTIONALLOCATION), עם פעולת POST אל " +
          "‎/sap/opu/odata/sap/API_FUNCTIONALLOCATION/FunctionalLocation. בחיפושים שבוצעו לא נמצא תיעוד " +
          "רשמי המוציא את ה-BAPI משימוש, מסמן אותו כפריט פישוט או נוקב ביורש.",
      edition: "on-premise",
      release: "2025.001",
      source: FLOC_API_CREATE,
      recommendedAction:
        "להשאיר את BAPI_FUNCLOC_CREATE כערוץ הכתיבה ליצירת מיקומים פונקציונליים בממשקי RFC/ALE קיימים " +
        "ובטעינות הקמה של מבנה הנכסים, ולשמור על רצף הקריאה: בדיקת טבלת RETURN, ואם אין הודעת שגיאה קריאה " +
        "ל-BAPI_TRANSACTION_COMMIT, ואז אימות המיקום ב-IL03 או מול IFLOT. לאינטגרציות HTTP חדשות להעדיף " +
        "את שירות ה-OData‏ API_FUNCTIONALLOCATION ולאמת ישויות, שדות ופעולות מול המדריך APIs for " +
        "Maintenance Management ומול מערכת חיה; אין להתייחס לשירות כמחליף חובה של ה-BAPI. בהגירת נתונים " +
        "להשתמש באובייקט 'PM - Functional location' של ה-Migration Cockpit במקום בסקריפט קריאות BAPI " +
        "עצמאי. מגרסה 2025 FPS01 ואילך, ולידציות לקוח על יצירה ועדכון של מיקום פונקציונלי צריכות לעבור " +
        "למימוש ה-BAdI‏ BADI_ASM_MD_FUNCLOC, שחל על ה-BAPI כשם שהוא חל על IL01/IL02, על W0029 ועל השירות. " +
        "לפני טעינה גדולה לאמת במערכת היעד את מחוון המבנה ואת מסכת העריכה של המיקום, את התנהגות התיוג " +
        "החלופי ‏(IFLOS) ואת שמות הפרמטרים בפועל ב-SE37, כי אלה אינם מתועדים באף מקור רשמי שנקרא כאן.",
    },
    xrefs: [
      "table:IFLOT",
      "table:IFLOS",
      "table:ILOA",
      "table:EQUI",
      "tx:IL01",
      "tx:IL02",
      "tx:IL03",
      "tx:IH01",
      "tx:IH06",
      "cds:I_FunctionalLocation",
      "fm:BAPI_FUNCLOC_CHANGE",
      "fm:BAPI_FUNCLOC_GETDETAIL",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fm:BAPI_EQUI_CREATE",
      "fm:ILOA_INHERIT_FROM_FUNCLOC",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "מה שאומת: חמש רשומות חיפוש רשמיות אומתו מחדש מול שירות החיפוש של help.sap.com " +
      "‏(scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE, 2026-09-21) לפי כותרת, מדריך, " +
      "versionId, loio וסניפט: loio 41a47f86 ‏(What's New 2025 FPS01), loio 7c5578ab ‏(Data Migration " +
      "2025.001), loio b6a1e644 ‏(APIs for Maintenance Management 2025.001), loio f69f391c ‏(Operations " +
      "for Functional Location, 2023.latest) ו-loio 5e1d4eab ‏(Extensibility: Functional Location API, " +
      "APIs for Maintenance Management, 2025.001). אימות הכתובות נשען על התאמת כותרת, מדריך, versionId " +
      "ו-loio בפלט scripts/sap-help-search.mjs; קוד HTTP אינו ראיה, שכן help.sap.com מחזיר 200 גם ל-loio " +
      "שאינו קיים. לגבי שאלת הפתיחה מתור המחקר של הטבלאות: שם השירות API_FUNCTIONALLOCATION מאומת כאן " +
      "רשמית פעמיים, גם במדריך ה-API וגם ברשומת ה-What's New של ה-BAdI שמונה אותו לצד ה-BAPI; מה שנותר " +
      "מיפוי מאגר בלבד הוא הקישור בין השירות ובין הטבלה IFLOT, כפי ש-research-queue-tables.md מתעד, ולכן " +
      "הרשומה כאן אינה טוענת שהשירות קורא או כותב ל-IFLOT. מה שלא אומת: גופי עמודי help.sap.com הם מעטפות " +
      "JavaScript ולא נקראו כאן, אלא רק כותרת, מדריך, גרסה וסניפט של כל רשומה. יוצא דופן: פריט ה-What's " +
      "New לגרסת 2025 FPS01 נקרא במלואו במסמך הרשמי WN_OP2025_FPS01_EN.pdf ‏(סעיף 3.1.15) בפס ההרחבות, " +
      "ורשומת data/verification/enhancements.ts מאשרת ממנו את רשימת נקודות הכניסה המלאה ‏(IL01/IL02, " +
      "W0029, API_FUNCTIONALLOCATION, F3473), את שני ה-BAPIs, את רכיב היישום PM-EQM-FL ואת הזמינות 'SAP " +
      "S/4HANA Cloud Private Edition and SAP S/4HANA'. ממשק ה-BAPI (שמות פרמטרים ומבנים) אינו מופיע גם " +
      "באותו מסמך, והמאגר עצמו סותר את עצמו בשלוש גרסאות שונות של רשימת הפרמטרים (ראו הראיה מהמאגר), ולכן " +
      "אין ברשומה זו שום טענה על הממשק; אימות ב-SE37 או ב-ADT נשאר פתוח (חיבור ה-MCP למערכת SAP חיה נכשל, " +
      "ראו MANIFEST). ‏api.sap.com: חיפוש מוגבל-דומיין החזיר את הכתובת " +
      "https://api.sap.com/api/API_FUNCTIONALLOCATION/overview בכותרת 'Overview | Functional Location', " +
      "אך היא לא נוספה כראיה כי הדף מעטפת JavaScript והחבילה והמהדורה שלו לא נקראו; מקור הסטטוס הוא עמוד " +
      "help.sap.com למהדורת On-Premise. ‏Fiori: הסניפטים הרשמיים נוקבים ב-W0029 ‏(Process Technical " +
      "Object), ב-W0028 ‏(Display Technical Object) וב-F3473 ‏(Migrate Your Data), וחיפוש מוגבל-דומיין " +
      "החזיר את דפי ספריית ה-Fiori של W0028 ו-W0029; אף אחד משלושת המזהים אינו קיים ב-data/fiori/apps.ts, " +
      "ולכן לא נוסף xref מסוג fiori. מזהה יישום האובייקטים הטכניים סותר בתוך המאגר ‏(F2079 בבלופרינט, " +
      "F2730A ב-data/fiori/apps.ts, F1827 ב-data/tx-intel.ts) ודורש אימות נפרד, כמתועד " +
      "ב-research-queue-fiori.md וב-research-queue-tables.md. הרחבות: BADI_ASM_MD_FUNCLOC (חדש ב-2025 " +
      "FPS01) וכן BAdI: Modification of Data in BAPIs for Technical Objects " +
      "‏(BADI_EAM_ITOB_BAPI_CUST_FIELDS, נקוב בנושא Technical Objects on the Web User Interface (PM-EQM), " +
      "loio 12573553b57be647e10000000a441470, גרסה 2025.001) מתועדים רשמית למשפחת ה-BAPIs הזו, אך אף אחד " +
      "מהם אינו מזהה ביקום של הפרויקט ולכן אינו xref; enh:badi:BADI_EAM_TOB קיים ביקום אך מסומן לא מאומת " +
      "ב-research-queue-enhancements.md ולא נוסף. ממצאים שליליים כאן תחומים לחיפוש: סריקה אחרי פריט פישוט " +
      "או הצהרת deprecation למשפחת ה-BAPIs של אובייקטים טכניים לא החזירה רשומה כזו ב-help.sap.com, וחיפוש " +
      "במוצר SAP_ERP לא החזיר נושא שנוקב ב-BAPI_FUNCLOC_CREATE, ולכן הזמינות ב-ECC נשענת על המאגר בלבד " +
      "ואינה נטענת כראיה רשמית. לא נטען שום מספר SAP Note או KBA. הסטטוס 'קיים API משוחרר' מתאר חלופה " +
      "מתועדת ולא החלפה, ולכן אין שדה successor. מה שהדף מציג היום בלי הרשומה הזו: סטטוס נגזר 'ללא שינוי " +
      "ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', מתוך רישום אובייקטי הפונקציה ‏(verified-docs + " +
      "s4OnPremSupport yes ב-data/bapi-enrichment.sweep.ts ו-data/bapi-enrichment.pm.ts); הרשומה כאן מעלה " +
      "את הדרגה לאימות רשמי ומוסיפה את ערוץ ה-OData ואת ה-BAdI החדש.",
  },

  /* ------------------------------------------- fm:BAPI_FUNCLOC_CHANGE */
  {
    id: "fm:BAPI_FUNCLOC_CHANGE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA " +
                     "Cloud Private Edition 2025 FPS01",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "פריט What's New של 2025 FPS01 נוקב ב-BAPI בשמו המלא. לפי התקציר: 'The new Business Add-In " +
               "(BAdI) BAdI for Functional Location (BADI_ASM_MD_FUNCLOC) allows you to add custom " +
               "validations while creating or updating ... functional locations by using the following " +
               "business application programming interfaces (BAPIs): PM BAPI: Create Functional Location " +
               "(BAPI_FUNCLOC_CREATE) PM BAPI: Change Functional Location (BAPI_FUNCLOC_CHANGE ...)'. " +
               "הציטוט מורכב משני קטעי הדגשה של אותה רשומת חיפוש. כלומר ‏BAPI_FUNCLOC_CHANGE מתועד " +
               "ב-S/4HANA On-Premise‏ 2025 FPS01 תחת השם 'PM BAPI: Change Functional Location' כערוץ " +
               "שינוי פעיל של מיקום פונקציונלי, ונכלל בהיקף ה-BAdI החדש. התקציר אינו נוקב בהוצאה משימוש, " +
               "ביורש או בהגבלה של ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Functional Location | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "מדריך APIs for Maintenance Management במהדורת On-Premise‏ 2025 FPS01 מתעד שירות OData " +
               "למיקום פונקציונלי: 'Functional Location Technical name: API_FUNCTIONALLOCATION ... The " +
               "service enables the following operations for the functional location: Read functional " +
               "location master data Create functional location master data Update functional location " +
               "master data', הישות 'Functional Location (A_FunctionalLocation) Allows you to create, " +
               "read, and update a functional location', ותמיכה ב-'This service also supports deep entity " +
               "for POST operation and batch processing'. הרשומה מתעדת ערוץ עדכון רשמי למיקום פונקציונלי; " +
               "היא אינה מציגה את השירות כמחליף של BAPI_FUNCLOC_CHANGE ואינה נוקבת ב-BAPI כלל.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Functional Location | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/f69f391c38104f75ae5792155a88ce05.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: "2026-09-21",
        claim: "רשומת הפעולות של אותו שירות מפרטת את טבלת הפעולות: 'The Functional Location API offers " +
               "these operations: Operation HTTP Method Sample URL Read Functional Location GET " +
               "‎/sap/opu/odata/sap/API_FUNCTIONALLOCATION/FunctionalLocation(FunctionalLocation='1710') " +
               "Create Functional Location POST " +
               "‎/sap/opu/odata/sap/API_FUNCTIONALLOCATION/FunctionalLocation Update Functional Location " +
               "PATCH ...'. מיפוי פעולת ה-Update‏ (PATCH) לפעולת השינוי של ה-BAPI הוא של הפרויקט; העמוד " +
               "אינו נוקב בשם ה-BAPI. הרשומה מאונדקסת לגרסת 2023 Latest; באותו מדריך במהדורת 2025 FPS01 " +
               "קיימות רשומות עדכון נפרדות לישויות המשנה, וכל אחת מהן נוקבת ב-PATCH בתקציר שלה: Update " +
               "Functional Location Text ‏(loio b423d1418d714a198f9df673a6c0711c), Update Functional " +
               "Location Partner ‏(loio 0ec960aec1db423d9f36f680cdf9f8cb), Update Functional Location " +
               "Warranty ‏(loio e67788faefcb4943b34e5c408617c2a1) ו-Update Functional Location " +
               "Characteristic Values ‏(loio 6f69362c9ba74cbe9c21a5d9e0c75ef2).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר, סריקת האימות ורשומת קטלוג הפונקציות של הפרויקט (PM)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "היקף הפעולה לפי נתוני הפרויקט: שינוי אב-נתונים של מיקום פונקציונלי קיים (תחזוקת מפעל), " +
               "פעולה מסוג Change בעלת כתיבה, אובייקט BOR‏ FunctLocation, מקבילת API לטרנזקציה IL02, " +
               "טבלאות IFLOT ו-ILOA. פרמטרים לפי data/bapi-enrichment.pm.ts " +
               "ו-data/bapi-enrichment.sweep.ts: IMPORT‏ FUNCTLOCATION, DATA_GENERAL(+X), " +
               "DATA_SPECIFIC(+X); TABLES‏ RETURN. נתוני הפרויקט מחייבים קריאת BAPI_TRANSACTION_COMMIT " +
               "לאחר הקריאה, ו-data/function-intel.ts מציין ששכחת מבני ה-X היא כשל נפוץ. " +
               "data/bapi-enrichment.sweep.ts מסמן את המודול verified-docs, RFC‏, דורש COMMIT, יציבות " +
               "Released, תמיכה ב-ECC וב-S/4HANA On-Premise; data/function-intel.ts מוסיף קישור לתצוגת " +
               "ה-CDS‏ I_FunctionalLocation ולטרנזקציה IL02, אך נוקב בחתימת פרמטרים שונה " +
               "‏(DATA_FLOC_CHANGE + X). הסתירה נרשמה בקובץ התור ואינה מוכרעת כאן.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_FUNCLOC_CHANGE",
      },
    ],
    status: {
      status: "released_api_available",
      he: "‏BAPI_FUNCLOC_CHANGE ‏('PM BAPI: Change Functional Location') זמין ומתועד ב-SAP S/4HANA " +
          "On-Premise עד 2025 FPS01 כערוץ שינוי של מיקום פונקציונלי בתחזוקת מפעל: פריט ה-What's New של " +
          "2025 FPS01 נוקב בו בשמו ומכליל אותו בהיקף ה-BAdI החדש BADI_ASM_MD_FUNCLOC לוולידציות מותאמות " +
          "ביצירה ובעדכון. לצדו מתעד מדריך APIs for Maintenance Management שירות OData רשמי, " +
          "API_FUNCTIONALLOCATION, עם פעולת Update ‏(PATCH) על אותו אובייקט עסקי. אף מקור רשמי שנמצא " +
          "בחיפושים אינו נוקב בהוצאה משימוש, ביורש או בפריט פישוט ל-BAPI עצמו, ולכן אין כאן טענת החלפה " +
          "אלא קיום חלופה משוחררת לצד ה-BAPI.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Functional Location | APIs for Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/b6a1e644059f4d53b11201b9c0aaefd7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "מדריך APIs for Maintenance Management במהדורת On-Premise‏ 2025 FPS01 מתעד שירות OData " +
               "למיקום פונקציונלי: 'Functional Location Technical name: API_FUNCTIONALLOCATION ... The " +
               "service enables the following operations for the functional location: Read functional " +
               "location master data Create functional location master data Update functional location " +
               "master data', והישות 'Functional Location (A_FunctionalLocation) Allows you to create, " +
               "read, and update a functional location'. הרשומה אינה מציגה את השירות כמחליף של " +
               "BAPI_FUNCLOC_CHANGE ואינה נוקבת ב-BAPI כלל.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction:
        "להמשיך להשתמש ב-BAPI בממשקים, בהעמסות ובמיגרציות קיימות, עם BAPI_TRANSACTION_COMMIT אחרי כל " +
        "קריאה ועם מבני ה-X מסומנים לכל שדה שמתעדכן. לאינטגרציות חדשות להעדיף את שירות ה-OData‏ " +
        "API_FUNCTIONALLOCATION (פעולת Update בשיטת PATCH). בהמרה ל-S/4HANA: להריץ ATC‏ (Custom Code " +
        "Migration) על קוד לקוח הקורא ל-BAPI, ומגרסת 2025 FPS01 לשקול העברת ולידציות לקוח אל ה-BAdI‏ " +
        "BADI_ASM_MD_FUNCLOC לפי פריט ה-What's New. את רשימת הפרמטרים והשדות יש לאמת ב-SE37 או מול SAP " +
        "Business Accelerator Hub לפני בנייה: התיעוד הרשמי הפתוח אינו מפרט את חתימת ה-BAPI, ונתוני " +
        "הפרויקט חלוקים לגביה.",
    },
    xrefs: [
      "fm:BAPI_FUNCLOC_CREATE",
      "fm:BAPI_FUNCLOC_GETDETAIL",
      "fm:BAPI_TRANSACTION_COMMIT",
      "tx:IL02",
      "table:IFLOT",
      "table:ILOA",
      "cds:I_FunctionalLocation",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שיטה: שבע שאילתות ב-scripts/sap-help-search.mjs למוצר SAP_S4HANA_ON-PREMISE (השם הטכני, השם " +
      "האנגלי, What's New, Simplification, APIs for Maintenance Management, הוצאה משימוש/יורש) ושאילתה " +
      "אחת למוצר SAP_ERP, בתוספת WebSearch מוגבל-דומיין ל-api.sap.com. גופי הנושאים ב-help.sap.com הם " +
      "יישומי JavaScript ולא ניתנים לשליפה, ולכן כל ציטוט כאן תחום לכותרת ולתקציר שהחזיר שירות החיפוש. מה " +
      "לא אומת: חתימת ה-BAPI (שמות הפרמטרים, מבני ה-X והשדות) אינה מופיעה באף עמוד רשמי שנמצא, ונתוני " +
      "הפרויקט עצמם חלוקים לגביה; אימותה דורש SE37 במערכת חיה או מסמך Hub עם מפתח API, וחיבור ה-MCP " +
      "‏sc4sap לא היה זמין בסשן זה. חיפוש במוצר SAP_ERP לא החזיר אף רשומה הנוקבת ב-BAPI, ולכן בסיס ה-ECC " +
      "נשען על המאגר ולא על תיעוד ECC רשמי. ממצאים שליליים תחומי-חיפוש: לא נמצא פריט פישוט, הוצאה משימוש " +
      "או יורש ל-BAPI_FUNCLOC_CHANGE. הסתייגות על החלופה: רשומת What's New‏ 2023 'Deprecation of Property " +
      "for Functional Location' ‏(loio 20b815a95ed74708a82851b999581685) מתעדת שב-API_FUNCTIONALLOCATION " +
      "וב-API_FUNCNLLOC_STRUCLIST המאפיין FunctionalLocationIsActive מוצא משימוש ויימחק, עם מאפיין עוקב " +
      "FunctionalLocationIsCreated; זו הסתייגות ברמת מאפיין בשירות ה-OData, לא ברמת ה-BAPI. הסתייגות על " +
      "ניסוח: רשומת 'Enterprise Asset Management Part 3' ‏(loio b23236698f104768955c692e03d00b79, " +
      "2025.001) כותבת 'New BAPIs are available for functional locations' בלי לנקוב בשמות, ולכן לא נלקח " +
      "ממנה שם. הרשומה האחות enh:badi:BADI_EAM_TOB ב-data/verification/enhancements.ts כבר קראה את המסמך " +
      "הרשמי WN_OP2025_FPS01_EN.pdf (סעיף 3.1.15) במלואו ומתעדת שם את אותם שני שמות BAPI, רכיב יישום " +
      "PM-EQM-FL וזמינות 'SAP S/4HANA Cloud Private Edition and SAP S/4HANA'; כאן לא נקרא ה-PDF, והציטוט " +
      "תחום לתקציר. הסטטוס הנגזר שהאפליקציה הציגה עד כה היה 'ללא שינוי' מ-lib/bapi-registry דרך " +
      "data/bapi-enrichment.sweep.ts (verified-docs + תמיכה ב-On-Premise, רמה repository_verified); " +
      "הרשומה מעלה אותו ל-'קיים API משוחרר' ברמה הרשמית בלי לסתור אותו ובלי לטעון להחלפה. api.sap.com: " +
      "חיפוש מוגבל-דומיין החזיר את רישום ה-Hub‏ 'Functional Location' בכתובת " +
      "https://api.sap.com/api/API_FUNCTIONALLOCATION/resource וגם 'Functional Location Hierarchy - Read' " +
      "‏(OP_API_FUNCNLLOCSTRUCLIST); לא צוטט כראיה נפרדת מפני ששתי רשומות help.sap.com כבר מתעדות את " +
      "השירות, ורשימות ישויות ומאפיינים ברמת ה-Hub נשארות 'נדרש אימות' לפי כללי ה-fallback של MANIFEST. " +
      "W0029 ו-F3473 הנזכרים בפריט 2025 FPS01 אינם קיימים ב-data/fiori/apps.ts ולכן לא קושרו, כמו ברשומות " +
      "tx:IL01 ו-enh:badi:BADI_EAM_TOB. ה-BAdI‏ BADI_ASM_MD_FUNCLOC אינו קיים ב-data/exits.ts או " +
      "ב-data/enhancements.ts ולכן אין לו xref.",
  },

  /* ------------------------------------------- fm:BAPI_FUNCLOC_GETDETAIL */
  {
    id: "fm:BAPI_FUNCLOC_GETDETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"BAPI_FUNCLOC_GETDETAIL\" ו-\"BAPI_FUNCLOC\" " +
                     "(SAP_S4HANA_ON-PREMISE), \"BAPI_FUNCLOC_GETDETAIL functional location detail\" " +
                     "(SAP_ERP), \"PM Functional location Data Migration migration object APIs BAPIs\", " +
                     "\"Simplification functional location technical objects deprecated Plant " +
                     "Maintenance\"",
        product: "SAP S/4HANA / SAP ERP 6.0",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "ממצא שלילי תחום-חיפוש: בחמש שאילתות לשירות החיפוש של SAP Help, לקטלוג S/4HANA On-Premise " +
               "ולקטלוג SAP ERP כאחד, אף רשומה אינה נוקבת בשם BAPI_FUNCLOC_GETDETAIL בכותרת או בתקציר. " +
               "התוצאות לשם המדויק שייכות לחוברות שאינן קשורות ותקציריהן ריקים; בהרצת אימות חוזרת הוחזרו " +
               "Production Planning and Control, Automotive, Public Sector, Public Sector Management, " +
               "Retail ו-Logistics - General. רשימת החוברות משתנה בין הרצות ולכן אינה נרשמת כנתון קבוע. " +
               "שתי רשומות סמוכות נוגעות ל-BAPIs של מיקום פונקציונלי בלי לנקוב ב-GETDETAIL: 'BAdI: " +
               "Functional Location Management' ‏(loio 41a47f86d1d449318dee191474b5f64e, 2025.001) " +
               "שתקצירה נקטע אחרי 'PM BAPI: Create Functional', ועמוד אובייקט המיגרציה 'PM - Functional " +
               "location' ‏(loio 7c5578ab53e0457f905145bc535839cf, 2025.001) הנוקב תחת APIs/BAPIs במודול " +
               "IBAPI_FUNCLOC_USERSTATUS_CHANG בלבד. כמו כן לא אותרה רשומה המציגה את ה-BAPI כמוצא משימוש " +
               "או כפריט פישוט. הממצא תחום לשאילתות שהורצו ואינו הוכחה להיעדר תיעוד.",
        verificationLevel: "verification_required",
      },
      FLOC_API_READ,
      {
        sourceType: "sap_help",
        sourceTitle: "ODATA API: Functional Location | What's New in SAP S/4HANA 2020",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/0c5d626cd4d54b1a843f8cc402df2a00.html?locale=en-US&state=PRODUCTION&version=2020.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        accessedAt: "2026-09-21",
        claim: "רשומת What's New לגרסת S/4HANA 2020 מציגה את השירות כחדש: 'With this synchronous inbound " +
               "service, you can create, update, and read functional location', מסווגת אותו Category API, " +
               "Type New ומשייכת אותו לרכיב היישום PM-EQM-FL. השירות ממשיך להתפתח במהדורות הבאות לפי " +
               "רשומות באותו ערוץ: תכונה חדשה ב-2021 FPS02 ‏(loio 00f01ed1c5fc48198c3654e103adcb34, " +
               "המאפיין FuncnlLocPosInSuperiorTechObj), פעולות השבתה/הפעלה וסימון למחיקה ב-2023 ‏(loio " +
               "302b25297d2c448db0d24ade7023f84a), ה-function import GetRootFunctionalLocation ב-2025 " +
               "‏(loio 60f092bd26b444e1aaf19ff228e5e779) וישות Linear Asset Management ב-2025 FPS01 " +
               "‏(loio 22604a4f79934eb3bc2222fbf94b4248), שתקצירה מונה את API_FUNCTIONALLOCATION בין " +
               "השירותים המושפעים ואת PM-EQM-FL בין רכיבי היישום של הרשומה, בלי למפות שירות לרכיב. הרשומה " +
               "'Deprecation of Property for Functional Location' ‏(2023, loio " +
               "20b815a95ed74708a82851b999581685) מסמנת כמוצא משימוש את המאפיין " +
               "FunctionalLocationIsActive בלבד, ולא את השירות עצמו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment), סריקת §6 והקטלוג הפונקציונלי",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "רשומת ההעשרה מתארת BAPI מסוג Read (קריאה בלבד, ללא SAVE/COMMIT) על אובייקט BOR‏ " +
               "FunctLocation, בזיקה ל-IL03 ולטבלאות IFLOT ו-IFLOTX, עם סיכום פרמטרים 'IMP FUNCTLOCATION " +
               "· EXP DATA_GENERAL_EXP · TAB RETURN'. הערכים verificationStatus verified-docs, " +
               "releasedStatus 'Released · RFC', eccSupport yes, s4OnPremSupport yes ו-cloudSupport " +
               "unknown מגיעים מברירות המחדל של תבנית g() בקובץ זה ואינם נתון ייחודי לרשומה, ומקור האימות " +
               "הרשום הוא מראת מטא-נתוני SE37 בתוספת SAP Community, לא תיעוד SAP רשמי. סיכום הפרמטרים " +
               "אינו עקבי בתוך המאגר: data/bapi-enrichment.sweep.ts גורס 'IN: FUNCTLOCATION · OUT: " +
               "DATA_GENERAL_EXP, DATA_SPECIFIC_EXP, RETURN', ואילו data/function-intel.ts גורס פלט בשם " +
               "DATA_FLOC_EXP. אף אחת משלוש הגרסאות לא אומתה מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_FUNCLOC_GETDETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: "לקריאת נתוני מיקום פונקציונלי (תחזוקת מפעל) קיים ב-S/4HANA On-Premise ממשק OData מתועד: " +
          "API_FUNCTIONALLOCATION, שהמדריך APIs for Maintenance Management לגרסת 2025 FPS01 מונה בו פעולת " +
          "קריאה של נתוני אב המיקום, ורשומת הפעולות שלו מציגה 'Read Functional Location' בשיטת GET. " +
          "השירות מוצג כחדש ברשומת What's New לגרסת S/4HANA 2020 תחת רכיב היישום PM-EQM-FL וממשיך להתרחב " +
          "עד 2025 FPS01. ה-BAPI עצמו, BAPI_FUNCLOC_GETDETAIL, אינו נזכר באף רשומת SAP Help שנסרקה, לא " +
          "בקטלוג S/4HANA ולא בקטלוג SAP ERP; זמינותו ומעמדו נשענים על רשומות המאגר בלבד. לא נמצא תיעוד " +
          "רשמי המציג אותו כמוצא משימוש או כמוחלף.",
      edition: "on-premise",
      release: "2025.001",
      source: FLOC_API_READ,
      recommendedAction:
        "בממשקי RFC קיימים אפשר להמשיך לקרוא נתוני מיקום פונקציונלי דרך ה-BAPI, לאחר אימות קיומו, מעמד " +
        "השחרור ורשימת הפרמטרים שלו במערכת היעד (SE37 או BAPI Explorer), משום שרשומות המאגר חלוקות בשמות " +
        "פרמטרי הפלט. לאינטגרציות חדשות, ובפרט לתרחישי OData/REST, להעדיף את API_FUNCTIONALLOCATION " +
        "‏(Read Functional Location) ולאמת את רשימת הישויות והשדות מול SAP Business Accelerator Hub (דורש " +
        "מפתח API) או מול מערכת חיה. לקריאה בתוך ABAP ב-S/4HANA להעדיף את תצוגת ה-CDS‏ " +
        "I_FunctionalLocation על פני SELECT ישיר מ-IFLOT/ILOA.",
    },
    xrefs: [
      "fm:BAPI_FUNCLOC_CREATE",
      "fm:BAPI_FUNCLOC_CHANGE",
      "fm:BAPI_EQUI_GETDETAIL",
      "table:IFLOT",
      "table:ILOA",
      "table:IFLOS",
      "tx:IL03",
      "tx:IL01",
      "tx:IL02",
      "tx:IH01",
      "cds:I_FunctionalLocation",
      "fiori:F2730A",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "(1) הסטטוס 'קיים API משוחרר' נסמך על עמוד Functional Location במדריך APIs for Maintenance " +
      "Management (2025.001) ועל רשומת What's New 2020; זו חלופה מתועדת ולא טענת החלפה רשמית, ולכן אין " +
      "יורש. (2) שם ה-BAPI עצמו לא נמצא באף רשומת help.sap.com בחמש השאילתות שהורצו, גם לא בקטלוג SAP " +
      "ERP; קיומו, מעמד השחרור שלו ורשימת הפרמטרים שלו נשענים על רשומות המאגר בלבד ודורשים אימות ב-SE37 " +
      "במערכת היעד. (3) סתירה פנימית במאגר בשמות פרמטרי הפלט: data/bapi-enrichment.pm.ts גורס " +
      "DATA_GENERAL_EXP, data/bapi-enrichment.sweep.ts גורס DATA_GENERAL_EXP יחד עם DATA_SPECIFIC_EXP, " +
      "ו-data/function-intel.ts גורס DATA_FLOC_EXP; הסתירה נרשמת ואינה מוכרעת כאן. (4) הערכים " +
      "verified-docs / Released · RFC / s4OnPremSupport yes ברשומת ההעשרה הם ברירות מחדל של תבנית g() " +
      "המשותפת לכל רשומות המשפחה, ולא נתון שנבדק לרשומה זו; מקור האימות שלה הוא מראת SE37 ו-SAP " +
      "Community, לא תיעוד רשמי. (5) גופי עמודי help.sap.com לא נקראו (מעטפת JavaScript); כל טענה תחומה " +
      "בכותרת ובתקציר של רשומת החיפוש, וספירות התוצאות ורשימת החוברות אינן יציבות בין הרצות ולכן אינן " +
      "נרשמות כנתון קבוע. (6) חיפוש מוגבל-דומיין החזיר רישום ב-SAP Business Accelerator Hub בנתיב " +
      "/api/OP_API_FUNCTIONALLOCATION/resource, אך הכותרת שהוחזרה גנרית ('SAP Business Accelerator Hub') " +
      "והעמוד הוא מעטפת JavaScript, ולכן הרישום אינו מצוטט כראיה. (7) table:IFLOTX אינה ב-xrefs משום " +
      "שאינה קיימת ביקום המזהים של הפרויקט, אף שרשומת ההעשרה מונה אותה; cds:I_FunctionalLocationText " +
      "ו-fiori:F3473 הושמטו מאותה סיבה. (8) מזהה fiori:F2730A ‏(Manage Technical Objects) הוא ערך מתוחזק " +
      "בפרויקט שטרם אומת מול ספריית ה-Fiori, כמצוין גם ברשומת cds:I_FunctionalLocation. (9) מהדורות Cloud " +
      "לא נבדקו ברשומה זו.",
  },

  /* ------------------------------------------- fm:BAPI_ALM_ORDER_GET_DETAIL */
  {
    id: "fm:BAPI_ALM_ORDER_GET_DETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "תחת הכותרת 'Enhancements to Maintenance Order BAPIs' מתעד העמוד את " +
               "BAPI_ALM_ORDER_GET_DETAIL כ-BAPI הקורא נתוני פקודות אחזקה ושירות ('BAPI " +
               "BAPI_ALM_ORDER_GET_DETAIL, which reads maintenance and service order data', כלשון " +
               "התקציר), ומציין שהורחב גם לקריאת נתונים ייעודיים של פקודות שיפוץ ('has also been enhanced " +
               "to read refurbishment order specific data'). תחת אותה כותרת מופיע גם " +
               "BAPI_ALM_ORDER_MAINTAIN. הרשומה שייכת לתיעוד S/4HANA On-Premise לגרסת 2025 FPS01, כלומר " +
               "ה-BAPI מתועד כשמיש במהדורה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Maintenance Order - Read | What's New in SAP S/4HANA 2021",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/be4e2d6267d844a89f99119c1d5215ef.html?locale=en-US&state=PRODUCTION&version=2021.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        accessedAt: "2026-09-21",
        claim: "שירות ה-OData‏ API_MAINTENANCEORDER ‏(Maintenance Order - Read) מתועד כשירות נכנס " +
               "סינכרוני המאפשר לקרוא נתוני כותרת, פעולה, רכיב, פריט רשימת אובייקטים וקשרי פעולות של " +
               "פקודות אחזקה ('is a synchronous inbound service that allows you to read header, " +
               "operation, component, object list item, and operation relationship data of maintenance " +
               "orders', כלשון התקציר). הרשומה שייכת ל-What's New של S/4HANA 2021, רכיב Asset Management " +
               "/ Maintenance Operations.",
        verificationLevel: "sap_official_verified",
      },
      ALM_ORDER_OPS_V2,
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "רשומת ההעשרה מתארת BAPI מסוג Read (קריאה בלבד, ללא SAVE או COMMIT) על אובייקט BOR‏ " +
               "BUS2007, בזיקה ל-IW33 ולטבלאות AUFK, AFIH ו-AFVC, עם סיכום פרמטרים 'IMP NUMBER · EXP " +
               "ES_HEADER · TAB ET_OPERATIONS, ET_COMPONENTS, ET_COSTS, RETURN', סטטוס 'Released · RFC', " +
               "‏verificationStatus‏ verified-docs, תמיכת ECC ותמיכת S/4HANA On-Premise 'yes' ותמיכת " +
               "Cloud 'unknown'. מקור האימות הרשום למשפחה זו הוא 'SE37 metadata mirror (sapdatasheet.org) " +
               "+ SAP Community'.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_ORDER_GET_DETAIL",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת סריקת ה-BAPI של הפרויקט",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "רשומת הסריקה נוקבת באותו BAPI כקריאה בלבד (RFC) לפרטי פקודת אחזקה, עם סיכום פרמטרים " +
               "מצומצם יותר: 'IN: NUMBER · OUT: ES_HEADER, ET_OPERATIONS, ET_COMPONENTS, RETURN.' ‏(ללא " +
               "ET_COSTS), ומצהירה על מקור אימות 'SAP Help Portal — verified 2026-07-15'.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.sweep.ts#BAPI_ALM_ORDER_GET_DETAIL",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הקטלוג הפונקציונלי של הפרויקט",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "רשומת הקטלוג מתארת קריאת פרטי פקודת אחזקה (כותרת, פעולות, רכיבים) בזיקה ל-IW33 ולטבלאות " +
               "AUFK ו-AFVC, וכותבת בשדה ה-S/4‏ 'זמין ב-S/4HANA; חלופה: API_MAINTENANCEORDER'.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_ALM_ORDER_GET_DETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: "‏BAPI_ALM_ORDER_GET_DETAIL מתועד ב-help.sap.com למהדורת S/4HANA On-Premise 2025 FPS01 כ-BAPI " +
          "הקורא נתוני פקודות אחזקה ושירות, והורחב בה לקריאת נתוני פקודות שיפוץ; אף רשומה רשמית שנסרקה " +
          "אינה מוציאה אותו משימוש. במקביל קיים ממשק OData רשמי לקריאת אותם נתונים: ‏API_MAINTENANCEORDER " +
          "‏(Maintenance Order - Read), המתועד ב-What's New 2021 כשירות נכנס סינכרוני לקריאת כותרת, " +
          "פעולה, רכיב, פריט רשימת אובייקטים וקשרי פעולות, ושפעולות הקריאה שלו מפורטות במדריך APIs for " +
          "Maintenance Management לגרסת 2025 FPS01, כולל גרסה 2 בנתיב ‎API_MAINTENANCEORDER;v=2. ישויות " +
          "גרסה 1 של אותו שירות מופיעות באותו מדריך עם הסיומת '(Deprecated)'.",
      edition: "on-premise",
      release: "2025.001",
      source: ALM_ORDER_OPS_V2,
      recommendedAction:
        "להמשיך להשתמש ב-BAPI לקריאת כותרת, פעולות ורכיבים בממשקי RFC ובדוחות קיימים, לאחר אימות שמות " +
        "הפרמטרים המדויקים ב-SE37 או ב-BAPI Explorer במערכת היעד. לאינטגרציות חדשות, ובמיוחד בתרחישי " +
        "OData או REST, להעדיף את API_MAINTENANCEORDER בגרסה 2 ‏(‎;v=2), משום שישויות גרסה 1 מופיעות " +
        "במדריך 2025 FPS01 עם הסיומת '(Deprecated)'; לאמת את רשימת הישויות והשדות מול SAP Business " +
        "Accelerator Hub (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_ALM_ORDER_MAINTAIN",
      "fm:BAPI_ALM_ORDERHEAD_GET_LIST",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:CO_ZF_ORDER_HEADER_READ",
      "table:AUFK",
      "table:AFIH",
      "table:AFVC",
      "table:AFKO",
      "tx:IW33",
      "tx:IW38",
      "cds:I_MaintenanceOrder",
      "fiori:F2731",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "(1) הסטטוס 'קיים API משוחרר' נשען על שלוש רשומות help.sap.com: Enterprise Asset Management Part 4 " +
      "‏(loio 3346ac67364447a3ba2f4efa65b8c014, ‏2025.001) הנוקבת בשם ה-BAPI ובתפקידו, What's New 2021 " +
      "‏(loio be4e2d6267d844a89f99119c1d5215ef) המתארת את שירות הקריאה, ועמוד פעולות גרסה 2 ‏(loio " +
      "a77ab811acd34f38a715f8093eb68ead, ‏2025.001). זו חלופה משוחררת ולא טענת החלפה: אין מקור רשמי שנסרק " +
      "המכריז על ה-BAPI כמוחלף, ולכן לא נרשם יורש. (2) הסיומת '(Deprecated)' במדריך APIs for Maintenance " +
      "Management מתייחסת לישויות גרסה 1 של שירות ה-OData, לא ל-BAPI. (3) ממשק ה-BAPI עצמו (NUMBER, " +
      "ES_HEADER, ET_OPERATIONS, ET_COMPONENTS, ET_COSTS, RETURN) מופיע ברשומות המאגר בלבד; אף עמוד רשמי " +
      "שנסרק אינו מפרט את הפרמטרים, והם נשארים לאימות ב-SE37 או ב-BAPI Explorer. (4) סתירה פנימית במאגר: " +
      "data/bapi-enrichment.pm.ts מונה ET_COSTS ו-data/bapi-enrichment.sweep.ts אינו מונה אותו; לפי מיזוג " +
      "הרישומים ב-lib/bapi-registry.ts שורה 215 ‏(enrichAll = spread של שלושת הקבצים) ערך הסריקה מחליף את " +
      "ערך קובץ ה-PM במלואו עבור מזהה זה, כך שהפירוט BUS2007‏/IW33‏/AUFK‏/AFIH‏/AFVC שבקובץ ה-PM אינו " +
      "מגיע לטלאי הרישום. נרשם לקובץ התור. (5) מקור האימות של משפחת ה-PM בקובץ ההעשרה הוא 'SE37 metadata " +
      "mirror (sapdatasheet.org) + SAP Community', ערוץ Tier-3 לפי MANIFEST, בעוד רשומת הסריקה מצהירה " +
      "'SAP Help Portal'; קיום ה-BAPI ותפקידו מעוגנים מעתה בעמוד רשמי, הממשק אינו. (6) גופי עמודי ה-Help " +
      "לא נקראו: כל טענה תחומה בכותרת ובתקציר של רשומת החיפוש. ספירות התוצאות של שירות החיפוש אינן יציבות " +
      "בין הרצות ולכן אינן נרשמות. (7) בחיפוש לשם המדויק לא נמצאה רשומת Simplification Item הנוקבת ב-BAPI " +
      "זה; הממצא תחום לחיפוש ואינו הוכחה להיעדר פריט. (8) רישומי api.sap.com ‏(API_MAINTENANCEORDER, " +
      "‏OP_API_MAINTENANCEORDER_0001) כבר מצוטטים ברשומה האחות fm:BAPI_ALM_ORDER_MAINTAIN ואינם נכפלים " +
      "כאן; פירוט ישויות ושדות ב-Hub דורש מפתח API. (9) ‏fiori:F2731 נשמר כהפניה ניווטית מדאטהסט הפרויקט " +
      "בלבד. שיוך המזהה עצמו שנוי במחלוקת ונרשם כ-conflicting_sources ב-data/verification/fiori.ts: " +
      "התיעוד הרשמי מייחס את השם Manage Maintenance Orders למזהה F5241, ו-F5241 אינו קיים " +
      "ב-data/fiori/apps.ts. אין מקור רשמי הקושר את ה-BAPI לאפליקציה כלשהי. (10) מהדורות Cloud לא נבדקו " +
      "ברשומה זו.",
  },

  /* ------------------------------------------- fm:BAPI_MATERIAL_SAVEDATA */
  {
    id: "fm:BAPI_MATERIAL_SAVEDATA",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Segmentation: Enhancements to Material Master | Retail",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/2f88245323a27b0ce10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "רשומת חיפוש רשמית לגרסת 2025 FPS01 (חבילת Retail) נוקבת בשם המודול כלשונו: 'Note You can " +
               "also perform flexible segmentation through BAPI (BAPI_MATERIAL_SAVEDATA), IDOC (MATMAS), " +
               "MM17 and any other material master transactions'. מכאן שה-BAPI מתועד בגרסה זו כערוץ " +
               "תחזוקה פעיל של אב החומר, לצד סוג ההודעה MATMAS והטרנזקציה MM17. הסניפט אינו מונה את " +
               "פרמטרי המודול ואינו קובע את סטטוס השחרור שלו. שירות החיפוש מחזיר לאותו loio גם את שם " +
               "החוברת 'Logistics - General (LO)', ולכן שם החבילה אינו נרשם כנתון יציב.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Application Programming Interface (BAPI) | Production Planning and " +
                     "Detailed Scheduling (PP/DS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/a6385057cf924c59827936db4affb72a.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: "2026-09-21",
        claim: "עמוד ה-BAPI של PP/DS לגרסת 2023 Latest קובע בסניפט: 'The following Business Application " +
               "Programming Interface (BAPI)s have been enhanced to respect the Scope Limitation and " +
               "Scope Profile during the material master creation: BAPI_MATERIAL_SAVEDATA During material " +
               "creation, user will be allowed to pass Scope Limitation and Scope Profile values to the " +
               "BAPIs'; בסניפט עצמו שני הצירופים Scope Limitation ו-Scope Profile מופיעים במשפט השני בתוך " +
               "מרכאות בודדות. שאילתה נוספת על אותו loio מחזירה מאותו עמוד גם את השם " +
               "BAPI_MATERIAL_SAVEREPLICA. כלומר המודול קיים ב-S/4HANA והורחב בו לשדות התכנון המתקדם. " +
               "הסניפט אינו מונה את שאר הפרמטרים ואינו קובע סטטוס שחרור.",
        verificationLevel: "sap_official_verified",
      },
      PRODUCT_A2X,
      {
        sourceType: "sap_help",
        sourceTitle: "APIs for Product Master | APIs for Product Master",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18fe3fab96864826bfa0be0de4f65b85/a8661dda13ef407abc16902e4da68361.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: "2026-09-21",
        claim: "עמוד הסקירה APIs for Product Master לגרסת 2025 FPS01 נוקב בסניפט: 'The following APIs are " +
               "available for replicating product master data: ODATA APIs API Technical Name Use " +
               "Operations Entities Product Master (A2X) API_PRODUCT_SRV This synchronous inbound " +
               "service', ומוסיף: 'Note SAP recommends that you use Product Master (A2X) API for the " +
               "following entities: Sales Text Basic Text Purchase Text Plant Text For all other " +
               "entities, use Product (Version 2) API'. זו ההמלצה הרשמית לחלוקה בין שני שירותי ה-OData " +
               "לפי ישות. הסניפט אינו מזכיר את ה-BAPI ואינו מציג אותו כמוחלף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI, נתוני אב חומר)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: "2026-09-21",
        claim: "רשומת המאגר מתארת יצירה ועדכון של אב חומר לפי תצוגות: HEADDATA עם MATERIAL, MATL_TYPE " +
               "ו-IND_SECTOR ודגלי תצוגה, מבני CLIENTDATA ו-PLANTDATA עם דגלי ...X לעדכון שדה, החזרת " +
               "BAPIRET2 בטבלת RETURN וחובת COMMIT. הרשומה משייכת את המודול ל-MM01, MM02 ו-MM03, לטבלאות " +
               "MARA, MARC ו-MAKT, ל-IDoc‏ MATMAS ולתצוגת ה-CDS‏ I_Product. שדה ה-ECC נוקב 'זמין ב-ECC' " +
               "ושדה ה-S/4 נוקב 'זמין ב-S/4HANA אך עם מגבלות (אורך MATNR 40, שדות חדשים)' ומפנה לחלופת " +
               "OData‏ API_PRODUCT ולאפליקציית Fiori‏ Manage Product Master. הרשומה אינה מסומנת inferred " +
               "ואינה נושאת URL רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_MATERIAL_SAVEDATA",
      },
    ],
    status: {
      status: "released_api_available",
      he: "מודול הפונקציה זמין ומתועד ב-S/4HANA On-Premise עד גרסת 2025 FPS01 כערוץ תחזוקה של אב חומר " +
          "(Material Master): שמו נקוב כלשונו בעמוד Segmentation: Enhancements to Material Master של 2025 " +
          "FPS01 לצד סוג ההודעה MATMAS והטרנזקציה MM17, והוא הורחב בגרסת 2023 כדי לקבל את שדות Scope " +
          "Limitation ו-Scope Profile בעת יצירת אב חומר לתכנון מתקדם. במקביל קיימת חלופת API רשמית " +
          "מתועדת: שירות ה-OData‏ Product Master (A2X), שם טכני API_PRODUCT_SRV, המתועד בפרק APIs for " +
          "Product Master כשירות נכנס סינכרוני ליצירה, קריאה, עדכון ומחיקה של נתוני אב מוצר. בחיפושים " +
          "שבוצעו לא אותר מקור SAP רשמי המוציא את ה-BAPI משימוש, מסמן אותו כמוחלף או מגביל אותו, ולכן אין " +
          "יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: PRODUCT_A2X,
      recommendedAction:
        "להמשיך להשתמש ב-BAPI בטעינות המוניות ובממשקים קיימים של אב חומר, כולל בשלב ההסבה. לממשקים חדשים " +
        "להעדיף את שירות ה-OData‏ Product Master (A2X)‏ (API_PRODUCT_SRV), ולשים לב לחלוקה שעמוד APIs for " +
        "Product Master ממליץ עליה בין A2X לבין Product (Version 2) לפי הישות. לפני טעינה גדולה לאמת " +
        "במערכת היעד (SE37 או BAPI Explorer) את מבנה הפרמטרים בגרסה בפועל, את דגלי ה-X לעדכון שדה ואת " +
        "הצורך ב-BAPI_TRANSACTION_COMMIT, וכן את התנהגות המודול כאשר מספר החומר המורחב מופעל. שאלת אורך " +
        "MATNR נשארת פתוחה ברשומת table:MARA ואין להכריע אותה מעמוד BAPI.",
    },
    xrefs: [
      "table:MARA",
      "table:MARC",
      "table:MAKT",
      "tx:MM01",
      "tx:MM02",
      "tx:MM03",
      "tx:MM17",
      "fm:BAPI_MATERIAL_GET_DETAIL",
      "fm:BAPI_TRANSACTION_COMMIT",
      "idoc:msg:MATMAS",
      "idoc:basic:MATMAS05",
      "cds:I_Product",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "ארבע הראיות הרשמיות נשלפו ב-2026-09-21 מ-scripts/sap-help-search.mjs --json, וה-url, ה-loio " +
      "וה-versionId הועתקו כלשונם מפלט ה-JSON; גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו, " +
      "ולכן כל טענה תחומה בכותרת ובסניפט של רשומת החיפוש בלבד. תשע השאילתות שבוצעו: " +
      "'BAPI_MATERIAL_SAVEDATA', 'Product APIs for Product Master OData service', 'Material Number Field " +
      "Length Extension simplification BAPI interface', 'Material Master simplification MM01 MMH1 SAP " +
      "S/4HANA', 'Business Application Programming Interface BAPI material master scope limitation', " +
      "'BAPI_MATERIAL_SAVEREPLICA', 'Product Master (A2X)', 'MM - Material master migration object " +
      "S4_MM_MATERIAL_MASTER' ו-'material master BAPI deprecated not available S/4HANA', בתוספת חיפוש רשת " +
      "מוגבל ל-api.sap.com ול-help.sap.com. אף רשומה לא הציגה הוצאה משימוש, הגבלה או החלפה של ה-BAPI, " +
      "ולכן הממצא השלילי תחום בשאילתות אלה ואינו טענה מוחלטת. (1) המשפט 'SAP recommends that you use " +
      "Product Master (A2X) API…' מוחזר בהרצת אימות של 2026-09-21 בסניפט של שתי רשומות החיפוש כאחת, גם " +
      "עמוד Product Master (A2X)‏ (loio 74aa2b58a333a107e10000000a441470) וגם עמוד הסקירה APIs for " +
      "Product Master‏ (loio a8661dda13ef407abc16902e4da68361), שתיהן בגרסה 2025.001. שתי הרשומות נרשמות " +
      "כאן בנפרד, וכל טענה תחומה בסניפט של הרשומה שלה. (2) אורך MATNR לא הוכרע כאן ואינו נושא הרשומה: הוא " +
      "נשאר פתוח ברשומת table:MARA ובתור הטבלאות (האם MATNR עצמו הופך ל-CHAR 40 או שרק MATNR_EXTERNAL). " +
      "נמצא עמוד רשמי רלוונטי שלא נכלל כראיה כדי לא לגרור הכרעה כזו מעמוד BAPI: 'Material Field Length " +
      "Extension for IS-OIL Downstream'‏ (What's New in SAP S/4HANA, versionId 100, loio " +
      "c7eddd705d5048aea51e5ddc48d7f28e, וכפילות ב-1610 000, loio 540a46dde33c4b5794b2b0095aebe907), " +
      "שהסניפט שלו קובע 'With extended material number activation, in relevant external communication " +
      "interfaces, such as BAPIs and IDocs, the system uses only the extended version of the field, for " +
      "example MATERIAL_LONG'. הסניפט תחום בפונקציונליות IS-OIL Downstream, אינו נוקב בשם ה-BAPI הנדון " +
      "ואינו קובע את אורך ה-DDIC של MATNR; לכן הוא נרשם כאן כהפניה בלבד. (3) אותרה רשומת Data Migration " +
      "לגרסת 2025 FPS01 שהסניפט שלה נוקב 'Related Business Object: Material Master … Component: LO-MD-MM " +
      "… Name of this migration object: S4_MM_MATERIAL_MASTER Name of the BAPI used in this migration " +
      "object: BAPI_MATERIAL_SAVEREPLICA'‏ (loio b7c452a7d4494ffcb0c5d7c432a708cc). הרשומה לא נכללה כראיה " +
      "משתי סיבות: הכותרת שהאינדקס מחזיר עבורה ('FI - Accounts payable open item (tax line) " +
      "(Customer-specific) (AFS)') אינה תואמת את תוכן הסניפט, ו-BAPI_MATERIAL_SAVEREPLICA אינו מזהה קיים " +
      "ביקום הרשומות של הפרויקט ולכן אינו xref ואינו יורש. (4) מזהה Fiori: הסניפטים הרשמיים נוקבים " +
      "ב-'Manage Product Master (F1602)'‏ (Mass Change Documents, What's New 2020 FPS01, loio " +
      "d9984d7a40a74991876a338a080dc61e) וב-'MM01(F1602): Created a product in the Manage Product Master " +
      "Data app'‏ (Change Documents, Product Master, 2025.001, loio 4715c453f57eb44ce10000000a174cb4), אך " +
      "F1602 אינו קיים ב-data/fiori/apps.ts ולכן אין xref ל-Fiori, בעקביות עם רשומת table:MARA. (5) חיפוש " +
      "רשת מוגבל-דומיין החזיר את רישום ה-Hub‏ 'Product Master (A2X)' בכתובת " +
      "https://api.sap.com/api/API_PRODUCT_SRV/resource; הוא לא נרשם כראיה כי עמודי api.sap.com הם מעטפת " +
      "ללא מפתח API, לפי כללי ה-fallback של MANIFEST. לכן גם אין כאן טענה על סטטוס שחרור של השירות: אף " +
      "סניפט שנשלף אינו נוקב במילה released. (6) הרשומה הרשמית 'Product (Version 1) (Deprecated)'‏ (APIs " +
      "for Product Master, 2025.001, loio 1ecb2c0208184e18b0173847d8d1457f) עוסקת בשירות Product בגרסה 1 " +
      "ולא ב-BAPI; היא אינה טענת הוצאה משימוש של המודול. (7) רובד Tier-2: data/function-intel.ts מפורט " +
      "ועקבי עם המקורות הרשמיים, אך הערכים releasedStatus 'Released · RFC', verificationStatus " +
      "'verified-docs', s4OnPremSupport 'yes' ו-stability 'Released' ב-data/bapi-enrichment.pppi.ts הם " +
      "ברירות מחדל של פונקציית העזר def() ולא נתון ייחודי לרשומה; בנוסף SWEEP_ENRICHMENT " +
      "ב-data/bapi-enrichment.sweep.ts דורס את התיאור, את מקור האימות ואת parameterSummary של אותה רשומה " +
      "(שם הפרמטרים נרשמים 'IN: HEADDATA, CLIENTDATA(X), PLANTDATA(X), VALUATIONDATA(X) · OUT: RETURN'). " +
      "אף אחד מפרטי הפרמטרים לא אומת מול מקור רשמי, ולכן לא נרשמו xrefs לטבלאות MARM ו-MBEW הנגזרות מהם. " +
      "(8) ללא סטטוס מחובר, הרכיב components/neo-shell/reference/bapi-data.ts גוזר דרך fromFuncRegistry " +
      "את הסטטוס 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', בעוד שדה ה-S/4 של function-intel " +
      "כותב 'זמין ב-S/4HANA אך עם מגבלות'; הסטטוס המחובר כאן מיישר את התצוגה עם התמונה הרשמית, כפי שנעשה " +
      "קודם ב-fm:BAPI_GOODSMVT_CREATE. (9) לא בוצעה בדיקה חיה במערכת SAP: חיבור ה-MCP‏ sc4sap נכשל בסשן " +
      "זה, ולכן קיום הפרמטרים, קבוצת הפונקציות וסטטוס השחרור ברמת SE37 נשארים לא מאומתים. (10) המשפט על " +
      "הסגמנטציה הגמישה מופיע באותו נוסח גם ברשומה מוקדמת יותר שכותרתה 'Flexible Segmentation'‏ (What's " +
      "New in SAP S/4HANA 2021, 2021.000, loio b04cfd1f240741f693e2a1fd8d809445) ובשכפול תחת versionId " +
      "100; נבחרה הרשומה של 2025 FPS01, שכותרתה 'Segmentation: Enhancements to Material Master', כי היא " +
      "הגרסה העדכנית ביותר הנוקבת בשם המודול.",
  },

  /* -------------------------- fm:BAPI_PROCORD_GET_DETAIL */
  {
    id: "fm:BAPI_PROCORD_GET_DETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Read Process Order | APIs for Manufacturing",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/091b4556227a4b31a821bd07008dde4c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Read Process Order' במדריך APIs for Manufacturing לגרסת S/4HANA On-Premise 2025 FPS01 מתעד קריאת " +
               "פקודת תהליך דרך שירות ה-OData‏ API_PROCESS_ORDER_2_SRV: 'To read the values of the header entity of a " +
               "process order, you use the HTTP method GET on the A_ProcessOrder_2 entity'. אותו סניפט קובע במפורש את " +
               "היקף הקריאה: 'When reading the header entity, you can as well retrieve information on order items, order " +
               "operations, order components, order status, and production resources/tools related to that process " +
               "order'. הסניפט אף מביא שתי דוגמאות ניווט: ‎GET " +
               "<host>/sap/opu/odata/sap/API_PROCESS_ORDER_2_SRV/A_ProcessOrder_2('1068400')/to_ProcessOrderOperation " +
               "‏('The operation returns all process order operations that are related to process order 1068400') ואותה " +
               "כתובת עם to_ProcessOrderComponent. כלומר כותרת פקודת התהליך, פעולותיה ורכיביה נקראים בממשק רשמי במהדורה " +
               "זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Order | APIs for Manufacturing",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/10e72f5883fa9244e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד השירות הוותיק 'Process Order' באותו מדריך ובאותה מהדורה נושא בסניפט אזהרה: 'Caution There is a new " +
               "version of this OData API service that contains important corrections and useful new functions', ומוסיף " +
               "'This OData API service offers extensibility options only for reading the header data of a process " +
               "order'. הסניפט מונה גם פעולות של אותו שירות ותיק ‏(Set a deletion flag, ‏Set a deletion indicator, " +
               "‏Discard a process order, ‏Schedule process order operation). שם השירות API_PROCESS_ORDERS אינו נקוב " +
               "בכותרת או בסניפט של עמוד זה אלא בעמודים סמוכים באותו מדריך ובאותה מהדורה ‏(loio " +
               "39f02f5883fa9244e10000000a4450e5, ‏'API_PROCESS_ORDERS - A_ProcessOrder: Create, Read, Update'). בפיתוח " +
               "חדש יש להעדיף אפוא את גרסה 2 של השירות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת סריקת ה-BAPI של הפרויקט",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת הסריקה מתארת קריאה בלבד ב-RFC של פרטי פקודת תהליך בתעשיות תהליכיות ‏(PP-PI): כותרת, פעולות ופאזות " +
               "ורכיבים, עם סיכום פרמטרים 'IN: NUMBER, ORDER_OBJECTS · OUT: HEADER, POSITION, OPERATION, RETURN.', " +
               "‏verificationStatus‏ verified-docs, ‏eccSupport ו-s4OnPremSupport בערך 'yes', ‏cloudSupport ‏'unknown', " +
               "‏stability‏ 'Released', ומקור אימות SAP Help Portal שאומת ב-2026-07-15. זו הרשומה שמנצחת במיזוג " +
               "ב-lib/bapi-registry.ts, ולכן היא שמזינה את הסטטוס הנגזר שהאפליקציה מציגה.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.sweep.ts#BAPI_PROCORD_GET_DETAIL",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הקטלוג הפונקציונלי של הפרויקט",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת הקטלוג מתארת 'קריאת פרטי פקודת תהליך, כותרת, פעולות, רכיבים' לשימושי אינטגרציה, מערכות MES ודוחות " +
               "ב-PP-PI, עם קלט NUMBER ופלט 'HEADER/POSITION/SEQUENCE', בזיקה ל-COR3 ולטבלאות AFKO ו-AFPO; שדה ה-ECC " +
               "נוקב ב'זמין ב-ECC' ושדה ה-S/4 ב'זמין ב-S/4HANA; חלופה: API_PROCESS_ORDER_2_SRV' (מאז תיקון 2026-09-21; " +
               "לפני כן נקב בשם API_PROCESSORDER_2, שאינו השם שבתיעוד הרשמי, שבו השירות נקרא API_PROCESS_ORDER_2_SRV).",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_PROCORD_GET_DETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: "לקריאת פרטי פקודת תהליך קיים ב-SAP S/4HANA On-Premise 2025 FPS01 ממשק OData רשמי: השירות " +
          "API_PROCESS_ORDER_2_SRV ‏(Process Order גרסה 2). עמוד 'Read Process Order' במדריך APIs for Manufacturing " +
          "לאותה מהדורה מתעד קריאת ישות הכותרת A_ProcessOrder_2 בפעולת GET וקובע שקריאת הכותרת מאפשרת גם שליפת " +
          "פריטי הפקודה, פעולותיה, רכיביה וסטטוסיה, כלומר אותו היקף נתונים שרשומות המאגר מייחסות " +
          "ל-BAPI_PROCORD_GET_DETAIL. עמוד השירות הוותיק 'Process Order' נושא באותה מהדורה אזהרה על קיומה של גרסה " +
          "חדשה. אין כאן טענת החלפה: אף רשומה רשמית שנסרקה אינה נוקבת בשם ה-BAPI ואינה מוציאה אותו משימוש, ולכן לא " +
          "נרשם יורש, ומעמד ה-BAPI עצמו נשען על רשומות המאגר בלבד.",
      edition: "on-premise",
      release: "2025.001",
      source: {
          sourceType: "sap_help",
          sourceTitle: "Read Process Order | APIs for Manufacturing",
          url:
            "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/091b4556227a4b31a821bd07008dde4c.html?locale=en-US&state=PRODUCTION&version=2025.001",
          product: "SAP S/4HANA",
          edition: "on-premise",
          release: "2025.001",
          accessedAt: DATE21,
          claim: "עמוד 'Read Process Order' במדריך APIs for Manufacturing לגרסת S/4HANA On-Premise 2025 FPS01 מתעד קריאת " +
                 "פקודת תהליך דרך שירות ה-OData‏ API_PROCESS_ORDER_2_SRV: 'To read the values of the header entity of a " +
                 "process order, you use the HTTP method GET on the A_ProcessOrder_2 entity'. אותו סניפט קובע במפורש את " +
                 "היקף הקריאה: 'When reading the header entity, you can as well retrieve information on order items, order " +
                 "operations, order components, order status, and production resources/tools related to that process " +
                 "order'.",
          verificationLevel: "sap_official_verified",
      },
      recommendedAction:
        "לשמר את BAPI_PROCORD_GET_DETAIL בממשקי RFC ובדוחות קיימים, ולאמת את שמות הפרמטרים המדויקים ב-SE37 או " +
        "ב-BAPI Explorer במערכת היעד לפני הסתמכות עליהם: רשומות המאגר חלוקות בשאלה אם ORDER_OBJECTS הוא פרמטר " +
        "כניסה או פרמטר יציאה, ואף עמוד רשמי שנסרק אינו נוקב בפרמטר כלשהו. לאינטגרציות חדשות, ובייחוד בתרחישי " +
        "OData או REST, להעדיף את API_PROCESS_ORDER_2_SRV בגרסה 2 על פני השירות הוותיק, שעמודו נושא אזהרה על קיום " +
        "גרסה חדשה. את רשימת הישויות והשדות יש לאמת מול SAP Business Accelerator Hub ‏(דורש מפתח API) או מול " +
        "מערכת חיה.",
    },
    xrefs: [
      "tx:COR3",
      "tx:COR1",
      "tx:COR2",
      "fm:BAPI_PROCORD_CREATE",
      "fm:BAPI_PROCORD_GET_LIST",
      "fm:BAPI_PROCORD_RELEASE",
      "fm:BAPI_PROCORDCONF_CREATE_TT",
      "table:AUFK",
      "table:AFKO",
      "table:AFPO",
      "table:AFVC",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שיטה: עשר שאילתות בשירות החיפוש הרשמי (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE) ושני " +
      "חיפושי רשת מוגבלי דומיין. שתי הכתובות שצוטטו נבדקו חיות ב-2026-09-21 ומחזירות HTTP 200 בגודל 1,160 בתים, " +
      "כלומר מעטפת JavaScript; גופי העמודים לא נקראו, וכל ציטוט תחום לכותרת ולסניפט של רשומת החיפוש. ה-loio, " +
      "ה-versionId וה-version ‏('2025 FPS01 (Feb 2026)') של שתי הראיות הרשמיות אומתו מחדש בהרצה נפרדת. הסתייגות " +
      "ציטוט: שם השירות API_PROCESS_ORDERS אינו מופיע בכותרת או בסניפט של loio " +
      "10e72f5883fa9244e10000000a4450e5; הוא נלקח מעמודים סמוכים באותו מדריך ובאותה מהדורה ‏(loio " +
      "39f02f5883fa9244e10000000a4450e5 ו-loio 4c05f425520a4dbb9529d1b27d0128f3) ומ-What's New 2020 ‏(loio " +
      "42992e123a2b44f7a894e731bd9ecdb9, 'With this OData API (API_PROCESS_ORDERS)'), ולכן לא נכתב בראיה כאילו " +
      "העמוד עצמו נוקב בו. ממצא שלילי תחום לחיפוש ולא הוכחת היעדר: המחרוזת BAPI_PROCORD_GET_DETAIL אינה מופיעה " +
      "בכותרת או בסניפט של אף רשומה שהוחזרה. שאילתת השם המדויק החזירה ארבע רשומות בלבד, ושלוש מהן זרות לנושא " +
      "('Product Change (Account) (OR_COP)' מ-Transactional Banking, ‏'Segment E1BP_MARAX' מ-Retail, ו-'Inform " +
      "of Purchase Order Creation' מ-Enterprise Services in Logistics). הרשומה הרביעית, 'Technical " +
      "Communication' ‏(deliverable‏ Production Planning and Control, ‏2025.001, ‏loio " +
      "0672b6535fe6b74ce10000000a174cb4), עוסקת בהעברת נתונים בין PP-PI לבין מערכת הבקרה ומונה 'Function " +
      "modules' ו-'BAPIs' כטכנולוגיות חלופיות בלי לנקוב בשם ה-BAPI הזה; היא לא צוטטה. יחס לרשומה האחות: " +
      "fm:BAPI_PROCORD_CREATE נשען על הרישום הנגזר ואינו נושא סטטוס מוסמך, ואילו כאן נכתב " +
      "released_api_available. ההבדל מכוון ונובע מכך שעמוד 'Read Process Order' במהדורת היעד מתעד במפורש את " +
      "אותו היקף קריאה (כותרת, פריטים, פעולות, רכיבים, סטטוס), בעוד ברשומת היצירה לא נמצא עמוד המכסה את היקף " +
      "הכתיבה באותה מידה. רשומות רשמיות שנראו ולא צוטטו: 'Operations for Process Order (Version 2)' ‏(loio " +
      "fe301c889827445095bd5e66e6c0a3ee, ‏2025.001) המציגה את טבלת הפעולות ובה 'Read Process Order GET'; " +
      "‏'Process Order (Version 2)' ‏(loio c4e613a7bf9c40a39cda9ae048e5e2b7, ‏2025.001) הקובעת 'This OData API " +
      "is the new version of the OData API Process Order'; עמודי הקריאה הייעודיים לפעולה, לפריט, לרכיב ולסטטוס " +
      "‏(loio fdd9b109a456457f9154d52d549e2799, ‏2494f0c1f628402fb17be8ea1de89e3e, " +
      "‏50782631745a46f588c1b1fc84a6a68b ו-188d4f0903f042a89f50dcb616dfe8e3, כולן 2025.001); ורצף רשומות What's " +
      "New לשירות גרסה 2 ‏(2020: ad8865210f7d4afd89c3be3650f4289e, ובה 'This OData API replaces the API Process " +
      "Order (API_PROCESS_ORDERS)'; ‏2021: a52f48a873d049c9b56a65176cae3b20; ‏2022: " +
      "ab8d1159bb674414aebd2c1d00e09c7e; ‏2023: 88348d109efc4c9796d39c25fc56077c; ‏2023 FPS03: " +
      "819376ea260c46248b73e2ce63b383c6; ‏2025: 416a177f863f4f96823c1c7a11cd22f6, המתעדת שיפורים בגרסה 1.3.0 של " +
      "השירות). הצהרת ה-replaces של 2020 נוגעת ל-OData גרסה 1 מול גרסה 2 ואינה נוגעת ל-BAPI, ולכן לא נרשם יורש, " +
      "בדיוק כפי שנקבע ברשומה האחות fm:BAPI_PROCORD_CREATE. ‏api.sap.com: חיפוש מוגבל דומיין החזיר את " +
      "https://api.sap.com/api/API_PROCESS_ORDER_2_SRV/overview בכותרת 'Overview | Process Order (Version 2)'. " +
      "תוכן ה-Hub אינו בר-שליפה ללא מפתח API, כתובת ה-overview כבר מצוטטת ברשומת fm:BAPI_PROCORD_CREATE ברמת " +
      "'נדרש אימות', ולכן לא נכפלה כאן, והמזהה OP_API_PROCESS_ORDER_2_SRV_0001 לא נכתב כראיה. ממצאי מאגר שנמדדו " +
      "בהרצה ולא רק נקראו: (1) המיזוג ב-lib/bapi-registry.ts ‏(enrichAll, פריסה של קובץ ה-PM ואז PP-PI ואז " +
      "הסריקה) החליף עד 2026-09-21 עבור מזהה זה את רשומת ה-PP-PI במלואה ברשומת הסריקה, כך שערכי ה-PP-PI ‏(טרנזקציה COR3, " +
      "טבלאות AFKO/AFPO/AFVC, אובייקט BOR‏ BUS2116 וסיכום הפרמטרים 'IMP NUMBER · EXP ORDER_OBJECTS · TAB " +
      "RETURN') אינם מגיעים לרישום כלל. זהו אותו כשל מבני שכבר נרשם ברשומת fm:BAPI_ALM_ORDER_GET_DETAIL. (2) " +
      "בעקבותיו, אובייקט הרישום הממוזג נושא טבלאות וטרנזקציות שאינן שייכות לפקודת תהליך אלא לרשימות פעולות " +
      "ולמתכוני אב: טבלאות PLAS, ‏PLFL, ‏PLMZ, ‏MAPL, ‏FHMI, ‏PLZU, ‏TC60, ‏TCA01, ‏AFPO, ‏AFVC, ‏AFFH, ‏AFFL " +
      "וטרנזקציות C202, ‏C203, ‏CS08, ‏CA01, ‏CA02, ‏CA03, ‏C201, ‏CFV1, ‏CFV2, ‏CFV3, ‏C298, ‏CC01. המקור הוא " +
      "הבסיס הנגזר מהבלופרינט: ב-data/sapData.pppi.ts הצמד BAPI_PROCORD_CREATE ו-BAPI_PROCORD_GET_DETAIL הוא " +
      "ערך ברירת המחדל של עמודת הפונקציות בשורות נושא של רשימות פעולות ושל אמצעי ייצור (למשל PLAS עם C202 " +
      "ו-C203), והוא נאסף משם. התוצאה הייתה שעמוד ה-BAPI בקוקפיט קישר לטרנזקציות מסלול ייצור במקום ל-COR3. תוקן " +
      "ב-2026-09-21 (סבב 2 של ביקורת העיצוב): המיזוג ב-lib/bapi-registry.ts הפך למיזוג לפי שדות (mergePatch), " +
      "הרשומה הממוזגת נושאת COR3 ו-AFKO/AFPO/AFVC מרשומת ה-PP-PI, ועמוד ה-BAPI מציג את טבלאות הבלופרינט וטרנזקציותיהן " +
      "בתווית שיוך עקיף. (3) סתירת פרמטרים בתוך המאגר: הסריקה נוקבת ב-'IN: NUMBER, ORDER_OBJECTS', " +
      "‏data/bapi-enrichment.pppi.ts ב-'IMP NUMBER · EXP ORDER_OBJECTS · TAB RETURN' ו-data/function-intel.ts " +
      "בפלט 'HEADER/POSITION/SEQUENCE'; כלומר ORDER_OBJECTS מופיע פעם כפרמטר כניסה ופעם כפרמטר יציאה. אף עמוד " +
      "רשמי שנסרק אינו מכריע, והפרמטרים נשארים לאימות ב-SE37 או ב-BAPI Explorer. (4) סטיית שם: " +
      "data/function-intel.ts קרא לחלופה API_PROCESSORDER_2 במקום API_PROCESS_ORDER_2_SRV, אותה סטייה שכבר " +
      "נרשמה ברשומת fm:BAPI_PROCORD_CREATE; נורמלה בכל אתרי המאגר ב-2026-09-21. המצב שנמדד לפני הרשומה, בהרצת " +
      "fromFuncRegistry ו-evidenceBlock על האובייקט הממוזג: האפליקציה הציגה 'ללא שינוי ב-S/4HANA' ברמת 'מאומת " +
      "מול נתוני הפרויקט', ‏derivedFrom‏ bapi-registry, ‏release ו-source בערך null, ‏needsVerification=false, " +
      "עומק L3, ורשימת מקורות ריקה. עם הרשומה הזו הסטטוס הופך ל'קיים API משוחרר' ורמת הראיות עולה ל'מאומת מול " +
      "תיעוד SAP רשמי', ועומק הרשומה עולה ל-L5 (ארבע ראיות, שתיים מהן רשמיות עם כתובת, אחד-עשר xrefs שכולם " +
      "נפתרים, ‏lastVerifiedAt‏ 2026-09-21). מה לא נכלל ומדוע: ‏fiori:F3577 אינו ב-xrefs מאותו טעם שנרשם ברשומת " +
      "tx:COR3, שכן התיעוד הרשמי מייחס את השם Manage Process Orders למזהה F4587 ו-data/verification/fiori.ts " +
      "מסמן את F3577 כמקורות סותרים; ‏F4587 ו-F5323 אינם קיימים ב-data/fiori/apps.ts. אין ביקום המזהים תצוגת " +
      "CDS לפקודת תהליך (קיימות I_ProductionOrder ו-I_MaintenanceOrder בלבד), ולכן לא נרשם xref ל-CDS. ‏tx:COR1 " +
      "ו-tx:COR2 נכללים כהקשר מחזור החיים של פקודת התהליך ולא משום שמקור רשמי קושר אותם ל-BAPI. לא נמצא מספר " +
      "SAP Note או KBA באף סניפט, ולכן לא נרשם אף מספר. פריט פישוט הנוקב ב-BAPI זה לא נמצא בחיפוש; הממצא תחום " +
      "לחיפוש. מהדורות ענן לא נבדקו ברשומה זו. בדיקה במערכת SAP חיה לא בוצעה: ה-MCP‏ sc4sap לא התחבר בפתיחת " +
      "ההפעלה ‏(MCP error -32000: Connection closed).",
  },

  /* ---------------------------- fm:BAPI_PROCORD_GET_LIST */
  {
    id: "fm:BAPI_PROCORD_GET_LIST",
    aliases: ["BAPI_PROCORD_GET_LIST"],
    evidence: [
      PROCORD_OPS_V2,
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Process Order (Version 2) | What's New in SAP S/4HANA 2020",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ad8865210f7d4afd89c3be3650f4289e.html?locale=en-US&state=PRODUCTION&version=2020.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        accessedAt: DATE21,
        claim: "‏הסניפט: 'With the new OData API Process Order (Version 2) (API_PROCESS_ORDER_2_SRV), you can read " +
               "process orders with their details, create process orders from scratch or by converting planned orders, " +
               "and update specific properties of existing process orders.' קריאת פקודות תהליך על פרטיהן דרך שירות OData " +
               "מתועדת כבר ב-What's New של SAP S/4HANA 2020, והשם הטכני של השירות הוא API_PROCESS_ORDER_2_SRV.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Order Information System | Production Planning and Control",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/e804b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "‏רשומת מדריך Production Planning and Control למהדורת On-Premise‏ 2025 FPS01 קובעת: 'The following " +
               "documentation on the order information system relates to the transactions COOIS (Production Order " +
               "Information System) and COOISPI (Process Order Information System); these replace the previous [...]', " +
               "ומציגה את נתיב התפריט 'Production - Process → Process Order → Reporting → Order Information System → " +
               "Process Order Information System' עם ההנחיה 'Select production orders, process orders, or planned orders " +
               "and enter the necessary data'. שליפת רשימת פקודות תהליך לפי קריטריוני בחירה מתועדת אפוא כפונקציה חיה " +
               "במהדורה זו. הרשומה אינה נוקבת בשם BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PP-PI enrichment)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת ההעשרה מתארת BAPI מסוג Read (קריאה בלבד, ללא SAVE או COMMIT) על אובייקט BOR‏ BUS2116, בזיקה " +
               "ל-COOISPI ול-COHV ולטבלאות AFKO ו-AUFK, עם סיכום פרמטרים 'IMP PLANT, SELPROD… · TAB PROCESS_ORDERS, " +
               "RETURN', ‏releasedStatus‏ 'Released · RFC', ‏verificationStatus‏ verified-docs, תמיכת ECC ותמיכת S/4HANA " +
               "On-Premise 'yes' ותמיכת Cloud 'unknown'. מקור האימות הרשום למשפחה זו הוא 'SE37 metadata mirror " +
               "(sapdatasheet.org)'. רשומת הסריקה (data/bapi-enrichment.sweep.ts) נוקבת באותו BAPI כקריאה בלבד (RFC) עם " +
               "סיכום פרמטרים אחר, 'IN: selection ranges (order/plant/material) · OUT: order list, RETURN.', ורשומת " +
               "הקטלוג (data/function-intel.ts) נוקבת בקלט 'Selection' ובפלט 'ORDER_OBJECTS' וכותבת 'זמין ב-ECC' ו-'זמין " +
               "ב-S/4HANA'.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_PROCORD_GET_LIST",
      },
    ],
    status: {
      status: "released_api_available",
      he: "‏שליפת רשימת פקודות תהליך לפי קריטריוני בחירה נשארת תרחיש חי ב-SAP S/4HANA: מדריך Production Planning " +
          "and Control לגרסת On-Premise‏ 2025 FPS01 מתעד את מערכת המידע לפקודות בטרנזקציות COOIS ו-COOISPI ואת " +
          "בחירת פקודות התהליך בה. במקביל קיים ממשק OData מתועד לאותו תרחיש: API_PROCESS_ORDER_2_SRV‏ (Process " +
          "Order גרסה 2), שמתועד ב-What's New של S/4HANA 2020 ככזה שמאפשר לקרוא פקודות תהליך על פרטיהן, ושעמוד " +
          "הפעולות שלו במדריך APIs for Manufacturing לגרסת 2025 FPS01 מציג פעולת Read Process Order בשיטת GET על " +
          "הישות A_ProcessOrder_2 ומתיר על כלל פעולות הקריאה את אפשרויות השאילתה התקניות ‎$top, ‎$skip, ‎$filter, " +
          "‎$orderby ו-‎$expand. אף רשומה רשמית שנסרקה אינה נוקבת בשם BAPI_PROCORD_GET_LIST, לא כזמין ולא כמוצא " +
          "משימוש, ולכן לא נרשם יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: PROCORD_OPS_V2,
      recommendedAction:
        "לאמת תחילה את השם הטכני המדויק ואת שמות הפרמטרים ב-SE37 או ב-BAPI Explorer במערכת היעד, משום שפרטים אלה " +
        "נשענים על מראת SE37 (ערוץ Tier-3) ולא על תיעוד SAP רשמי; לאחר אימות זה ניתן להמשיך להשתמש ב-BAPI בממשקי " +
        "RFC ובדוחות קיימים לשליפת רשימות פקודות תהליך. לאינטגרציות חדשות ולתרחישי OData או REST להעדיף את " +
        "API_PROCESS_ORDER_2_SRV עם ‎$filter, ‎$top ו-‎$orderby על הישות A_ProcessOrder_2; לדוחות ולאנליטיקה " +
        "פנימיים להעדיף CDS ואת מערכת המידע COOISPI. את רשימת הישויות והשדות יש לאמת מול SAP Business Accelerator " +
        "Hub (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_PROCORD_GET_DETAIL",
      "fm:BAPI_PROCORD_CREATE",
      "fm:BAPI_PROCORDCONF_GETLIST",
      "table:AFKO",
      "table:AUFK",
      "tx:COOISPI",
      "tx:COOIS",
      "tx:COHV",
      "fiori:F3577",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שיטה: שש שאילתות בשירות החיפוש הרשמי (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE: " +
      "'BAPI_PROCORD_GET_LIST', 'BAPI_PROCORD', 'BAPIs for Process Order BUS2116', 'process order BAPI GetList " +
      "selection criteria', 'Process Order Version 2 operations API_PROCESS_ORDER_2_SRV', 'Simplification " +
      "process order information system COOIS COOISPI') וחיפוש רשת אחד מוגבל ל-help.sap.com, ‏api.sap.com, " +
      "‏fioriappslibrary ו-fal. שלוש הכתובות אומתו מול שירות החיפוש הרשמי: כל אחת הוחזרה עם ה-loio, הכותרת, שם " +
      "המדריך ומזהה הגרסה התואמים לרשום ברשומה. קוד HTTP אינו ראיה כאן, שכן help.sap.com היא מעטפת JavaScript " +
      "המחזירה 200 גם ל-loio שאינו קיים. (1) ממצא שלילי תחום-חיפוש, לא הוכחת היעדר: המחרוזת BAPI_PROCORD אינה " +
      "מופיעה בכותרת או בסניפט של אף רשומה רלוונטית; השאילתה 'BAPI_PROCORD' החזירה ארבע רשומות בלבד, כולן זרות " +
      "לנושא (E1BP_MARCX, ‏E1BP_MARAX, ‏BAPI Processes and Limitations בחבילת India, ‏Alignment - Purchase " +
      "Requisition to Purchase Order), ולכן קיום ה-BAPI, תפקידו ופרמטריו נשענים על רובד המאגר בלבד. (2) הסטטוס " +
      "'קיים API משוחרר' הוא טענת חלופה משוחררת ולא טענת החלפה: אין מקור רשמי שנסרק המכריז על ה-BAPI כמוחלף, " +
      "ולכן לא נרשם יורש. הצהרת ההחלפה היחידה שנמדדה במשפחה זו נוגעת ל-OData גרסה 1 מול גרסה 2 ולא ל-BAPI מול " +
      "OData: רשומת 'OData API: Process Order' ב-What's New 2020 (loio 42992e123a2b44f7a894e731bd9ecdb9) קובעת " +
      "'There is a new version of this OData API service that contains important corrections and useful new " +
      "functions, Process Order (Version 2) (API_PROCESS_ORDER_2_SRV)', והרשומה האחות fm:BAPI_PROCORD_CREATE " +
      "מתעדת מהרצה קודמת משפט 'replaces' על רשומת גרסה 2; אף אחד מהשניים אינו נוגע ל-BAPI. כן נמדדו ברצף רשומות " +
      "What's New לאותו שירות בגרסאות 2021 ‏(loio a52f48a873d049c9b56a65176cae3b20), ‏2022 ‏(loio " +
      "ab8d1159bb674414aebd2c1d00e09c7e), ‏2023 ‏(loio 88348d109efc4c9796d39c25fc56077c), ‏2023 FPS03 ו-2025 " +
      "‏(loio 416a177f863f4f96823c1c7a11cd22f6). (3) סתירת שמות פנימית במאגר: הכתיב הקנוני בפרויקט מוכרע, שכן " +
      "lib/route-manifest.generated.ts נוקב ב-BAPI_PROCORD_GET_LIST וגם שדה ה-name ב-data/function-intel.ts הוא " +
      "BAPI_PROCORD_GET_LIST, אך שדה ה-why באותה שורה נושא את האמרה 'שם תקני: GETLIST', והרשומה האחות " +
      "BAPI_PROCORDCONF_GETLIST אכן נטולת קו תחתון. הכתיב מול מערכת SAP חיה לא אומת באף מקור ציבורי ודורש SE37 " +
      "או BAPI Explorer; עד אז נשמר הכתיב שבמניפסט. (4) שלושה קבצי מאגר מתארים את אותו אובייקט בשלושה סיכומי " +
      "פרמטרים שונים: 'IMP PLANT, SELPROD… · TAB PROCESS_ORDERS, RETURN' (bapi-enrichment.pppi.ts), 'IN: " +
      "selection ranges (order/plant/material) · OUT: order list, RETURN.' (bapi-enrichment.sweep.ts) " +
      "ו-'Selection → ORDER_OBJECTS' (function-intel.ts). לפי מיזוג הרישומים ב-lib/bapi-registry.ts שורה 215 " +
      "(enrichAll = spread של שלושת הקבצים) ערך הסריקה מחליף את ערך קובץ ה-PP-PI במלואו עבור מזהה זה, כך " +
      "שהפירוט BUS2116‏/COOISPI‏/AFKO‏/AUFK שבקובץ ה-PP-PI אינו מגיע לטלאי הרישום. נרשם לקובץ התור. (5) רשומת " +
      "הסריקה מצהירה מקור אימות 'SAP Help Portal — verified 2026-07-15', אך לא נמצא בהרצה זו עמוד Help ציבורי " +
      "הנוקב בשם ה-BAPI; מקור ה-PP-PI הוא מראת SE37, ערוץ Tier-3 לפי MANIFEST. מצב ה-Released הוא " +
      "repository_verified בלבד. (6) הסטטוס הנגזר שהאפליקציה הציגה לפני רשומה זו, לפי fromFuncRegistry על " +
      "הרישום הממוזג (verificationStatus verified-docs, ‏s4OnPremSupport yes): 'ללא שינוי ב-S/4HANA' ברמת " +
      "'מאומת מול נתוני הפרויקט'. (7) לא נמצאו מספרי SAP Note או KBA באף סניפט ולכן לא נרשמו; לא נמצאה רשומת " +
      "Simplification Item הנוקבת ב-BAPI זה או במערכת המידע לפקודות, וגם ממצא זה תחום לחיפוש. (8) לא נרשם xref " +
      "ל-CDS: ביקום המזהים של הפרויקט קיימת משפחת I_ProductionOrder בלבד ואין בו תצוגת CDS לפקודת תהליך. (9) " +
      "‏fiori:F3577 נשמר כהפניה ניווטית מדאטהסט הפרויקט בלבד. שיוך המזהה שנוי במחלוקת ורשום ככזה " +
      "ב-data/verification/fiori.ts: התיעוד הרשמי מייחס את השם Manage Process Orders למזהה F4587 ‏(לצד Manage " +
      "Process Order Operations‏ F5323), ושני המזהים אינם קיימים ב-data/fiori/apps.ts. אין מקור רשמי הקושר את " +
      "ה-BAPI לאפליקציה כלשהי. (10) ‏api.sap.com לא צוטט: תוכן ה-Hub אינו בר-אימות ללא מפתח API, ורשומת Hub " +
      "ל-API_PROCESS_ORDER_2_SRV כבר מצוטטת עם אותה הסתייגות ברשומה האחות fm:BAPI_PROCORD_CREATE. (11) גופי " +
      "עמודי ה-Help לא נקראו (מעטפת JavaScript); כל טענה תחומה בכותרת ובתקציר של רשומת החיפוש, וישויות HTML " +
      "נוקו מהציטוטים כך שהרווחים הפנימיים אינם בהכרח זהים לפלט הגולמי. ספירות התוצאות של שירות החיפוש אינן " +
      "יציבות בין הרצות ולכן אינן נרשמות. (12) אותו loio של רשומת מערכת המידע " +
      "(e804b753128eb44ce10000000a174cb4) מוגש גם תחת מערך Production Orders (PP-SFC) בכתובת " +
      "‎/34de0103497c4b80a7c7fbf6952ff971/‎ באותה גרסה; נבחרה ההגשה תחת Production Planning and Control, ושתי " +
      "ההגשות אומתו בשירות החיפוש. (13) מהדורות Cloud לא נבדקו ברשומה זו, ותמיכת Cloud ברשומת המאגר היא " +
      "'unknown'.",
  },

  /* ----------------------- fm:BAPI_PROCORDCONF_CREATE_TT */
  {
    id: "fm:BAPI_PROCORDCONF_CREATE_TT",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Process Order Confirmation | APIs for Manufacturing",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/fc8dbf5e46004f1c9069b6ac4301c384.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד השירות במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01 קובע בסניפט: 'Process Order " +
               "Confirmation Technical name: API_PROC_ORDER_CONFIRMATION_2_SRV This service enables you to process " +
               "confirmations for process orders, namely time ticket and time event confirmations for ... operations of " +
               "process orders and confirmations on order level', ומונה בטבלת הישויות את 'Process Order Confirmation " +
               "(ProcOrdConf2) Time ticket/time event confirmation or confirmation on order level' ואת 'Process Order " +
               "Confirmation Material Movements'. קיים אפוא שירות OData רשמי ומתועד לדיווחי פקודת תהליך בתעשיות " +
               "תהליכיות, והוא מכסה במפורש גם את דיווח ה-Time Ticket. הסניפט אינו נוקב בשם BAPI_PROCORDCONF_CREATE_TT " +
               "ואינו מציג את השירות כמחליף שלו.",
        verificationLevel: "sap_official_verified",
      },
      PROCONF_TT_OPS,
      {
        sourceType: "sap_help",
        sourceTitle: "Integration of Extended Warehouse Management into PP With Synchronous Goods Movements | Extended " +
                     "Warehouse Management Integration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/b9cc83277e5645d780aba27800777163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "שאילתה על השם הטכני BAPI_PROCORDCONF_CREATE_TT במוצר SAP_S4HANA_ON-PREMISE מחזירה עמוד זה לגרסת 2025 " +
               "FPS01. סניפט רשומת החיפוש מורכב משני קטעים, המוצגים בו בסדר הפוך לסדר הקריאה ומופרדים בסימן השמטה: קטע " +
               "אחד הוא 'The synchronous goods movements are also possible when using the following PP BAPIs and PP " +
               "APIs: BAPI_PRODORDCONF_CREATE_HDR BAPI_', והקטע השני הוא 'BAPI_PRODORDCONF_CANCEL " +
               "BAPI_PROCORDCONF_CREATE_HDR BAPI_PROCORDCONF_CREATE_TT BAPI_PROCORDCONF_CANCEL " +
               "API_PROD_ORDER_CONFIRMATION_2_SRV API_PROC_ORDER_CONFIRMATION_2_SRV Repetitive Manufacturing'. שם ה-BAPI " +
               "נקוב אפוא כלשונו בתיעוד הרשמי של הגרסה העדכנית, ברשימת ה-PP BAPIs וה-PP APIs לתנועות סחורה סינכרוניות, " +
               "לצד שירות ה-OData המקביל. הסניפט מונה שמות בלבד: הוא אינו מתאר את פרמטרי ה-BAPI, אינו קובע את מצב השחרור " +
               "שלו ואינו מציג את ה-API כמחליף. הרצף המלא של הרשימה בגוף העמוד לא נקרא, משום שגוף עמודי help.sap.com הוא " +
               "מעטפת JavaScript.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI, אישורי ייצור) לצד שני רישומי ה-BAPI המועשרים",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת המאגר מתארת דיווח ביצוע של פקודת תהליך בשיטת Time Ticket (אישור פעולה או שלב, כמויות, זמנים " +
               "ו-Backflush), בזרימה Operation/Phase אל Confirmation ואל Backflush ו-GR. היא נוקבת בטבלת קלט TIMETICKETS " +
               "עם השדות ORDERID, OPERATION, YIELD, SCRAP, WORK ו-FIN_CONF, בטבלת GOODSMOVEMENTS לתנועות הנלוות ובפלטים " +
               "DETAIL_RETURN ו-RETURN, משייכת את המודול ל-COR6N, CORK ו-COGI ולטבלאות AFRU, AFKO ו-RESB, וקובעת 'זמין " +
               "ב-ECC' ו-'זמין ב-S/4HANA. חלופה: OData/Fiori Confirm Process Order'. הרישום המועשר " +
               "data/bapi-enrichment.pppi.ts מוסיף אובייקט BOR BUS2116, סיווג BAPI כותב המחייב BAPI_TRANSACTION_COMMIT, " +
               "releasedStatus 'Released · RFC', תמיכת ECC ו-S/4 On-Premise, ופרמטרים 'IMP POST_WRONG_ENTRIES · TAB " +
               "TIMETICKETS, GOODSMOVEMENTS, LINK_CONF_GOODSMOV, DETAIL_RETURN, RETURN' עם הטרנזקציות CORK ו-CORR. " +
               "הרישום data/bapi-enrichment.sweep.ts, הנטען אחרון ודורס את קודמו, רושם לאותו מודול 'IN: TIMETICKETS " +
               "(ORDERID, PHASE, YIELD, SCRAP, activities) · OUT: RETURN, CONFIRMATIONS' ומכנה אותו 'מקבילת API " +
               "ל-COR6N'. שלושת מקורות הפרויקט חלוקים על שמות הפרמטרים (OPERATION מול PHASE, DETAIL_RETURN מול " +
               "CONFIRMATIONS), ואף אחד מהם לא אומת מול מקור SAP רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_PROCORDCONF_CREATE_TT",
      },
    ],
    status: {
      status: "released_api_available",
      he: "מודול הפונקציה נקוב בשמו בתיעוד SAP הרשמי לגרסת S/4HANA On-Premise 2025 FPS01, ברשימת ה-PP BAPIs וה-PP " +
          "APIs התומכים בתנועות סחורה סינכרוניות, ולכן הוא מתועד שם כערוץ דיווח פעיל של פקודות תהליך. במקביל קיימת " +
          "חלופת API רשמית לאותה מטרה עסקית: שירות ה-OData Process Order Confirmation, שם טכני " +
          "API_PROC_ORDER_CONFIRMATION_2_SRV, המתועד במדריך APIs for Manufacturing כמעבד דיווחים לפקודות תהליך, " +
          "ובכללם דיווחי Time Ticket ודיווחי Time Event לפעולות ודיווח ברמת הפקודה. עמוד הפעולות Time Ticket " +
          "Confirmation באותו מדריך מציג במפורש את הפעולה Create Time Ticket Confirmation בשיטת POST על " +
          "ProcOrdConf2, כלומר קיימת חלופה משוחררת בדיוק לתרחיש של ה-BAPI. בחיפושים שבוצעו לא אותר מקור SAP רשמי " +
          "המוציא את ה-BAPI משימוש, מסמן אותו כמוחלף או מגביל אותו, ולכן אין יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: PROCONF_TT_OPS,
      recommendedAction:
        "להמשיך להשתמש ב-BAPI בממשקי דיווח קיימים מול רצפת הייצור ומול מערכות MES, בהתאמה ל-COR6N, CORK ו-CORR, " +
        "ולאמת ב-SE37 או ב-BAPI Explorer במערכת היעד את שמות הפרמטרים בפועל לפני הסתמכות, משום ששלוש רשומות המאגר " +
        "חלוקות ביניהן. בכל קריאה לבדוק את טבלאות RETURN ו-DETAIL_RETURN, לקרוא ל-BAPI_TRANSACTION_COMMIT על אותו " +
        "LUW, ולסרוק את COGI לאיתור תנועות Backflush וקבלת תוצרת שנכשלו. לאינטגרציות HTTP חדשות להעדיף את שירות " +
        "ה-OData API_PROC_ORDER_CONFIRMATION_2_SRV, ולאמת את הישויות, השדות והפעולות מול המדריך APIs for " +
        "Manufacturing בגרסת היעד ומול מערכת חיה; אין להתייחס לשירות כמחליף חובה של ה-BAPI, שכן אף מקור רשמי " +
        "שנמצא אינו קובע זאת. לשים לב שהתיעוד הרשמי מבחין בין שירות פקודות התהליך לבין שירות פקודות הייצור " +
        "הדיסקרטי (API_PROD_ORDER_CONFIRMATION_2_SRV), ואין להחליף ביניהם.",
    },
    xrefs: [
      "tx:COR6N",
      "tx:CORK",
      "tx:CORR",
      "tx:CORS",
      "tx:COGI",
      "table:AFRU",
      "table:AFKO",
      "table:AFVC",
      "table:RESB",
      "fm:BAPI_PROCORDCONF_CANCEL",
      "fm:BAPI_PROCORDCONF_GETLIST",
      "fm:BAPI_PROCORD_CREATE",
      "fm:BAPI_GOODSMVT_CREATE",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fiori:F3364",
      "enh:exit:CONFPP01",
      "enh:exit:CONFPP05",
      "enh:badi:WORKORDER_CONFIRM",
      "obj:material-document",
      "bp:bapi-commit-discipline",
      "bp:matdoc-read-through-compatibility",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שלוש הראיות הרשמיות נשלפו ב-2026-09-21 באמצעות scripts/sap-help-search.mjs --json, וה-url, ה-loio " +
      "וה-versionId הועתקו כלשונם מפלט ה-JSON; גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו, ולכן כל " +
      "טענה כאן תחומה בכותרת ובסניפט של רשומת החיפוש. יש לשים לב ששירות החיפוש מחזיר סניפט תלוי-שאילתה, " +
      "ושהסניפט מציג קטעים לא רציפים ולעתים בסדר שאינו סדר הקריאה בעמוד; הציטוטים כאן מסומנים לפי קטעים ולא " +
      "כרצף אחד. השאילתות שבוצעו: 'BAPI_PROCORDCONF_CREATE_TT' (במוצר SAP_S4HANA_ON-PREMISE ובמוצר SAP_ERP), " +
      "'Process Order Confirmation API OData', 'API_PROC_ORDER_CONFIRMATION_2_SRV', 'Time Ticket Confirmation " +
      "APIs for Manufacturing process order', 'Time Ticket Confirmation', 'Process Order Confirmation Technical " +
      "name API_PROC_ORDER_CONFIRMATION_2_SRV service', 'Process Order Confirmation ProcOrdConf2 entity time " +
      "ticket', 'Create Time Ticket Confirmation POST ProcOrdConf2', 'CancelProcOrdConf', 'Fetch Proposals for " +
      "Goods Movements', 'Process Order Confirmation Simplification List conversion', 'OData API Process Order " +
      "Confirmation What's New' ו-'process order confirmation BAPI deprecated not available successor S/4HANA', " +
      "בתוספת חיפוש רשת מוגבל ל-api.sap.com. (1) ממצא שלילי תחום בשאילתות אלה: אף רשומה לא הציגה הוצאה משימוש, " +
      "פריט פישוט, הגבלה או הצהרת החלפה של ה-BAPI, ולכן לא נרשם יורש ולא נרשם סטטוס 'הוחלף'. שאילתת " +
      "BAPI_PROCORDCONF_CREATE_TT במוצר SAP_S4HANA_ON-PREMISE מחזירה מספר קטן של רשומות שאינו יציב בין הרצות: " +
      "באותו יום נמדדו שש רשומות בהרצה אחת וחמש בהרצה שנייה, ובכל ההרצות אותן שתי רשומות נוקבות בשם ה-BAPI " +
      "בסניפט (עמוד ה-EWM לגרסה 2025.001 ורשומת What's New לגרסת 2020). שאילתה מקבילה במוצר SAP_ERP החזירה 19 " +
      "רשומות ואף אחת מהן אינה נוקבת בשם ה-BAPI בכותרת או בסניפט, ולכן גם ההיסטוריה ב-ECC נשארת ברובד המאגר. " +
      "(2) עמודים רשמיים נוספים שאותרו ולא צורפו כראיה נפרדת, כדי להישאר בגבול ארבע ראיות: 'BAPIs and APIs used " +
      "in Synchronous Goods Movements' (What's New in SAP S/4HANA 2020, versionId 2020.000, loio " +
      "73cf65e8275d4b279973c9a368890896), שהסניפט שלו מציב זה לצד זה 'Process Industry BAPIs: " +
      "BAPI_PROCORDCONF_CREATE_HDR BAPI_PROCORDCONF_CREATE_TT' ו-'Production Planning BAPIs: " +
      "BAPI_PRODORDCONF_CREATE_HDR'; 'OData API: Process Order Confirmation' (What's New in SAP S/4HANA and SAP " +
      "S/4HANA Cloud Private Edition 2023 FPS03, versionId 2023.003, loio fe27113cd73e4219ac8dd23a4db1ef16), " +
      "שהיא רשומת ה-What's New העדכנית ביותר לשירות זה מבין אלה שהוחזרו (הרשומות האחרות לשירות הן 2020.000, " +
      "2021.000, 2022.000 ו-2023.000; לגרסת 2025 FPS01 קיימת רשומת What's New לשירות פקודות הייצור בלבד, loio " +
      "d98c121b7da04ed1830f9d99ab8c2b44); ועמודי הפעולות של שירות פקודות התהליך 'Create Time Ticket " +
      "Confirmation' (loio 8d79e53582f346e28c6b09bc563b69f9), 'Read Time Ticket Confirmation' (loio " +
      "7ef3438b73c74b0581aa3f7934e3ca53), 'Confirmation on Order Level' (loio 4352179c8db64ed1ab99afd36e077233) " +
      "ו-'Time Event Confirmation' (loio 339e4e993f1647e28739d04686b7506d), כולם במדריך APIs for Manufacturing " +
      "בגרסה 2025.001. (3) חיפוש רשת מוגבל דומיין החזיר את רישום ה-Hub שכותרתו 'Overview | Process Order " +
      "Confirmation' בכתובת https://api.sap.com/api/API_PROC_ORDER_CONFIRMATION_2_SRV; הוא לא נרשם כראיה, כי " +
      "עמודי api.sap.com הם מעטפת ללא מפתח API לפי כללי ה-fallback שב-MANIFEST, ולכן אין כאן טענה על מצב השחרור " +
      "של השירות ב-Hub. (4) הפניית ה-Fiori היא הפניה בלבד ולא טענת החלפה: fiori:F3364 הוא המזהה הקיים ביקום " +
      "הפרויקט, אך לפי audit/s4-enrichment/research-queue-fiori.md הוא אינו מופיע באף רשומה רשמית, השם Confirm " +
      "Process Order מופיע בספריית ה-Fiori תחת App ID CORK, והתיעוד ל-On-Premise 2025.001 מתאר את נתיב הדיווח " +
      "כ-'Confirm Process Order Operation (COR6N)' בתוך F4587 / F5323, שאינם ביקום. לכן לא נרשמה כאן טענת חלופת " +
      "Fiori. (5) מזהים שלא נרשמו כהפניה צולבת משום שאינם ביקום המזהים של הפרויקט: " +
      "fm:BAPI_PROCORDCONF_CREATE_HDR (האח ברמת כותרת, הנקוב בשני הסניפטים הרשמיים), table:AFFW (טבלת כשלי " +
      "ה-Backflush שתקנון tx-intel מפנה אליה), enh:badi:WORKORDER_CONFIRM_UPDATE ו-table:MATDOC. " +
      "cds:I_ProcessOrderConfirmation אינו ביקום, ו-cds:I_ProductionOrderConfirmation שקיים בו מתייחס לפקודות " +
      "ייצור דיסקרטיות ולכן לא נרשם. (6) סתירת מאגר שנרשמה בראיה: data/bapi-enrichment.sweep.ts נטען אחרון " +
      "ב-lib/bapi-registry.ts (הצבה enrichAll = { ...PM_ENRICHMENT, ...PPPI_ENRICHMENT, ...SWEEP_ENRICHMENT }) " +
      "ודורס את התיאור, את parameterSummary ואת מקור האימות של הרשומה מ-data/bapi-enrichment.pppi.ts, כך " +
      "שפרמטרי ה-BAPI המוצגים באפליקציה ('IN: TIMETICKETS (ORDERID, PHASE, YIELD, SCRAP, activities) · OUT: " +
      "RETURN, CONFIRMATIONS') שונים משני המקורות האחרים במאגר. הערכים verificationStatus 'verified-docs', " +
      "s4OnPremSupport 'yes', releasedStatus 'Released · RFC' ו-stability 'Released' הם ברירות מחדל של פונקציות " +
      "העזר def() ו-verified(), לא נתון ייעודי לרשומה זו. (7) ללא סטטוס מוסמך, שכבת המיפוי גוזרת דרך " +
      "fromFuncRegistry את הסטטוס 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט'; הסטטוס שנכתב כאן מיישר " +
      "את התצוגה עם התמונה הרשמית, כפי שנעשה קודם ב-fm:BAPI_GOODSMVT_CREATE וב-fm:BAPI_MATERIAL_SAVEDATA. (8) " +
      "לא בוצעה בדיקה חיה במערכת SAP: חיבור ה-MCP sc4sap נכשל בסשן זה, ולכן קיום הפרמטרים, קבוצת הפונקציות ומצב " +
      "השחרור ברמת SE37 נשארים לא מאומתים, וכך גם היקף השחרור של השירות ל-Public Cloud.",
  },

  /* ------------------------- fm:BAPI_PROCORDCONF_GETLIST */
  {
    id: "fm:BAPI_PROCORDCONF_GETLIST",
    aliases: ["BAPI_PROCORDCONF_GET_LIST"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Confirmation on Order Level | APIs for Manufacturing",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/4352179c8db64ed1ab99afd36e077233.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "‏API‏ Process Order Confirmation מציע פעולת קריאה לרשימת אישורים ברמת פקודה, בלשון הסניפט: 'For " +
               "confirmations on order level, the Process Order Confirmation API offers the operations listed in the " +
               "following table ... Operation HTTP Method Sample URL Read Confirmation on Order Level GET GET " +
               "<host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/ProcOrdConf2? ... $filter=((OrderID eq " +
               "'1234567') and (OrderOperationInternalID eq '00000000'))'. זהו נתיב שליפה מסונן של אישורי פקודת תהליך " +
               "במהדורת On-Premise 2025 FPS01. שם ה-BAPI אינו מופיע ברשומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Order Confirmation | APIs for Manufacturing",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/fc8dbf5e46004f1c9069b6ac4301c384.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד זהות השירות במדריך APIs for Manufacturing לגרסת On-Premise 2025 FPS01: 'Process Order Confirmation " +
               "Technical name: API_PROC_ORDER_CONFIRMATION_2_SRV This service enables you to process confirmations for " +
               "process orders, namely time ticket and time event confirmations for ... operations of process orders and " +
               "confirmations on order level', והישות 'Process Order Confirmation (ProcOrdConf2) Time ticket/time event " +
               "confirmation or confirmation on order level'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "OData API: Process Order Confirmation | What's New in SAP S/4HANA 2023",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/b36db5f76f0a4883bdc8bd75a59008af.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE21,
        claim: "רשומת What's New לגרסת 2023 קובעת בסניפט: 'You can use the shift properties when creating a time ticket " +
               "confirmation or a confirmation on order level. This API is available on the SAP Business Accelerator Hub " +
               "(https://api.sap.com).' ‏API_PROC_ORDER_CONFIRMATION_2_SRV מפורסם אפוא ב-Hub הרשמי מאז 2023.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Integration of Extended Warehouse Management into PP With Synchronous Goods Movements | Extended " +
                     "Warehouse Management Integration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2d95c3180a974e0aad07556ee4d28e94/b9cc83277e5645d780aba27800777163.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד On-Premise 2025 FPS01 נוקב בשמות BAPIs של אישורי ייצור ותהליך בלשון הסניפט: 'goods movements are " +
               "also possible when using the following PP BAPIs and PP APIs: BAPI_PRODORDCONF_CREATE_HDR " +
               "BAPI_PRODORDCONF_CREATE_TT BAPI_PRODORDCONF_CANCEL BAPI_PROCORDCONF_CREATE_HDR " +
               "BAPI_PROCORDCONF_CREATE_TT ... You can use the synchronous goods movements with the following PP " +
               "application components: Production (PP) Production - Process Industries (PP-PI) Repetitive Manufacturing " +
               "(PP-R' (הסניפט נפתח ונחתך באמצע משפט). כלומר שני חברים במשפחת BAPI_PROCORDCONF_, הם CREATE_HDR " +
               "ו-CREATE_TT, מתועדים בגרסת 2025 FPS01, ובהקשר צר של תנועות סחורה סינכרוניות מול EWM מוטמע בלבד. העמוד " +
               "אינו אומר דבר על שאר המשפחה, אינו מתייחס לממשקי קריאה, ואינו נוקב ב-BAPI_PROCORDCONF_GETLIST.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI) לצד שני רישומי ה-BAPI המועשרים",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "המאגר מתאר שליפת רשימת אישורי פקודת תהליך לפי טווחי בחירה, קריאה בלבד ב-RFC, עם פלט CONF_LIST ו-RETURN, " +
               "בזיקה לטבלת AFRU; ‏ecc: 'זמין ב-ECC', ‏s4: 'זמין ב-S/4HANA' ללא הסתייגות. שני רישומי ההעשרה חלוקים על " +
               "מקור האימות: data/bapi-enrichment.pppi.ts נוקב ב-'SE37 metadata mirror (sapdatasheet.org)' ואילו " +
               "data/bapi-enrichment.sweep.ts נוקב ב-'SAP Help Portal — verified 2026-07-15'; שדות eccSupport, " +
               "s4OnPremSupport ו-releasedStatus בשני הקבצים הם ברירות מחדל של פונקציות התבנית def() ו-verified() " +
               "המוחלות על כל רשומה, לא נתון ייעודי ל-BAPI זה. ‏data/bapi-enrichment.pppi.ts שייך לו עד 2026-09-21 טרנזקציה בשם " +
               "'COConf', שאינה טרנזקציה ביקום המזהים של הדאטהסט; מאז התיקון הרשומה נוקבת ב-COR6, COR6N, CORK, CORS ו-CORT " +
               "לפי העמוד הרשמי 'Documentary Batches in Production'.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_PROCORDCONF_GETLIST",
      },
    ],
    status: {
      status: "released_api_available",
      he: "ל-BAPI_PROCORDCONF_GETLIST (שליפת רשימת אישורי פקודת תהליך לפי טווחי בחירה, קריאה בלבד) קיים ב-S/4HANA " +
          "On-Premise שירות OData משוחרר לאותה מטרה עסקית: ‏API_PROC_ORDER_CONFIRMATION_2_SRV ‏(Process Order " +
          "Confirmation), שבו הפעולה Read Confirmation on Order Level מבצעת GET על הישות ProcOrdConf2 עם סינון לפי " +
          "OrderID ו-OrderOperationInternalID, ולצדה פעולות קריאה לאישורי Time Ticket ו-Time Event. אין מקור רשמי " +
          "הקובע שהשירות מחליף את ה-BAPI או שהוא חלופה מוצהרת לו; הזיקה היא זהות מטרה עסקית בלבד. זמינות ה-BAPI " +
          "עצמו ב-S/4HANA נשענת על נתוני הפרויקט בלבד: אף רשומת חיפוש רשמית שנמצאה אינה נוקבת בשמו, ולא נמצא תיעוד " +
          "רשמי המוציא אותו משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: {
          sourceType: "sap_help",
          sourceTitle: "Confirmation on Order Level | APIs for Manufacturing",
          url:
            "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/4352179c8db64ed1ab99afd36e077233.html?locale=en-US&state=PRODUCTION&version=2025.001",
          product: "SAP S/4HANA",
          edition: "on-premise",
          release: "2025.001",
          accessedAt: DATE21,
          claim: "‏API‏ Process Order Confirmation מציע פעולת קריאה לרשימת אישורים ברמת פקודה, בלשון הסניפט: 'For " +
                 "confirmations on order level, the Process Order Confirmation API offers the operations listed in the " +
                 "following table ... Read Confirmation on Order Level GET GET " +
                 "<host>/sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV/ProcOrdConf2? ... $filter=((OrderID eq " +
                 "'1234567') and (OrderOperationInternalID eq '00000000'))'. שם ה-BAPI אינו מופיע ברשומה.",
          verificationLevel: "sap_official_verified",
      },
      recommendedAction:
        "להשאיר את ה-BAPI בממשקי קריאה ודיווח קיימים, ולאמת ב-SE37 במערכת היעד את קיומו ואת שמות הפרמטרים שברשומת " +
        "המאגר (CONF_LIST, ‏RETURN) לפני הסתמכות. לאינטגרציות חדשות להעדיף את שירות ה-OData‏ " +
        "API_PROC_ORDER_CONFIRMATION_2_SRV, ולאמת ישויות ותכונות מול SAP Business Accelerator Hub (דורש מפתח API) " +
        "או מול מערכת חיה. לשים לב להבחנה בין BAPI_PROCORDCONF_GETLIST (פקודת תהליך, PP-PI) לבין " +
        "BAPI_PRODORDCONF_GETLIST (פקודת ייצור, PP-SFC): שמות דומים ואובייקטים שונים.",
    },
    xrefs: [
      "fm:BAPI_PROCORDCONF_CREATE_TT",
      "fm:BAPI_PROCORDCONF_CANCEL",
      "table:AFRU",
      "tx:COR6N",
      "tx:CORK",
      "tx:CORS",
      "tx:CORT",
      "tx:COOISPI",
      "fiori:F3364",
      "enh:exit:CONFPP01",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "ממצא שלילי תחום בחיפוש, לא הוכחת היעדר: שבע שאילתות בשירות החיפוש של help.sap.com " +
      "‏(scripts/sap-help-search.mjs) ושני חיפושי רשת מוגבלים לדומיינים הרשמיים לא החזירו ולו רשומה אחת שכותרתה " +
      "או הסניפט שלה נוקבים במחרוזת BAPI_PROCORDCONF_GETLIST. לכן קיום ה-BAPI, חתימתו ומצב השחרור שלו נשארים " +
      "ברובד נתוני הפרויקט ודורשים אימות ב-SE37. אזהרת בלבול שמות שנמדדה בפועל: השאילתה על השם המדויק החזירה את " +
      "העמוד 'Troubleshooting in PEO-ERP Integration' ‏(loio a3efc4219e234f38a98ce23064bdbdf9, ‏2025.001), " +
      "שהסניפט שלו נוקב ב-BAPI_PRODORDCONF_GETLIST ‏('the system first checks if the confirmation already " +
      "exists by calling the BAPI BAPI_PRODORDCONF_GETLIST in the ERP system'). זהו ה-BAPI של פקודת ייצור, " +
      "אובייקט אחר, והוא לא נרשם כראיה ולא כ-alias. ה-alias‏ BAPI_PROCORDCONF_GET_LIST נרשם כלוכד שגיאת כתיב " +
      "בלבד: הוא אינו מופיע באף רשומה רשמית, אינו ביקום המזהים ואינו בשימוש באף קובץ במאגר; השם התקני הוא " +
      "GETLIST ללא קו תחתון. הסטטוס 'קיים API משוחרר' נסמך על מדריך APIs for Manufacturing לגרסת 2025 FPS01; זו " +
      "חלופה לאותה מטרה עסקית ולא הצהרת החלפה, ולכן לא נרשם יורש. רשומות רשמיות נוספות שנראו ולא צורפו כראיה: " +
      "'Read Confirmation on Order Level' ‏(loio c0823780d5ca4d17b9bb9093b4f878f1, אותו מדריך ואותה גרסה); " +
      "'Read Time Ticket Confirmation' ‏(loio 7ef3438b73c74b0581aa3f7934e3ca53) ו-'Read Time Event " +
      "Confirmation' ‏(loio 71ec7e98676a4702844979a6979b29e3), שניהם על ProcOrdConf2; ו-'BAPIs and APIs used in " +
      "Synchronous Goods Movements' ב-What's New לגרסת 2020 ‏(loio 73cf65e8275d4b279973c9a368890896), שהסניפט " +
      "שלו קובע 'API_PROC_ORDER_CONFIRMATION_2_SRV: Create, Read and Cancel confirmations either as Time Ticket " +
      "or on Order Level'. יש להיזהר בין המזהים הכמעט-זהים של גרסת פקודת התהליך (ProcOrdConf2) ושל גרסת פקודת " +
      "הייצור (ProdnOrdConf2): לכל נושא במדריך יש שני עמודים נפרדים באותה כותרת (למשל 'Read Time Event " +
      "Confirmation' ‏loio 3bc6aeaf9cf040ce9e58513c674e2e44 ו-'Read Confirmation on Order Level' ‏loio " +
      "5d72dd6361b44e2a913a6f1c3a5dfc74 הם עמודי פקודת הייצור). מה שנמדד ולא צוטט: רישום ה-Hub בכתובת " +
      "https://api.sap.com/api/API_PROC_ORDER_CONFIRMATION_2_SRV מחזיר HTTP 200 ‏(668 בתים), אך העמוד הוא מעטפת " +
      "JavaScript ותוכנו לא נקרא; חבילת Hub נוספת שהוחזרה בחיפוש נושאת 'storecontenttest' בנתיבה, והורדת המסמך " +
      "שלה דרך catalog.svc החזירה HTTP 404 ‏'Entity not found'; עמוד תוכן התמיכה " +
      "help.sap.com/docs/SUPPORT_CONTENT/prodord/3138697834.html מחזיר HTTP 200 עם 1,160 בתים של מעטפת " +
      "JavaScript וללא טקסט תוכן (המחרוזת 3138697834 היא מקטע בנתיב הכתובת, לא מספר SAP Note ולא מספר KBA). " +
      "ארבע כתובות ה-Help שברשומה נבדקו ב-2026-09-21 ומחזירות HTTP 200 עם 1,160 בתים כל אחת, כלומר הכתובת נפתרת " +
      "אך הגוף הוא מעטפת JavaScript; ה-loio, הכותרת ומזהה הגרסה של כל אחת אומתו מול שירות החיפוש, שהוא הראיה " +
      "כאן, ולא מול קוד ה-HTTP. גופי עמודי ה-Help לא נקראו באף שלב; כל ציטוט תחום לכותרת ולסניפט של רשומת " +
      "החיפוש. ה-MCP למערכת ABAP לא היה זמין בהרצה זו ‏(Connection closed), ולא בוצעה בדיקה במערכת SAP חיה. " +
      "הסטטוס הנגזר שהאפליקציה הציגה לפני רשומה זו: 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', שכן " +
      "fromFuncRegistry מקבל verificationStatus‏ 'verified-docs' ו-s4OnPremSupport‏ 'yes' מרישום ה-BAPI המועשר; " +
      "הרשומה הזו מחליפה אותו ב-'קיים API משוחרר'. אובייקט רשמי נוסף לפקודת תהליך שאותר ולא נרשם כ-xref: הסניפט " +
      "של 'Objects Changed for Developer Extensibility in Production Operations' ‏(loio " +
      "6af9237e91bb4682bfa8363bdd7a26de, ‏2025.001) נוקב ב-Business object interface " +
      "‏I_PROCESSORDERCONFIRMATIONTP. זהו ממשק אובייקט עסקי ולא תצוגת VDM, והוא אינו ביקום המזהים, ולכן לא נרשם " +
      "xref. סתירות מאגר שנרשמו ותוקנו ב-2026-09-21 (סבב 2 של ביקורת העיצוב): ‏(1) data/bapi-enrichment.pppi.ts שייך ל-BAPI טרנזקציה בשם 'COConf' " +
      "שאינה קיימת ביקום המזהים ואינה מופיעה באף רשומה רשמית; לעומתה, סניפט העמוד 'Documentary Batches in " +
      "Production' ‏(loio 36ffb753128eb44ce10000000a174cb4, ‏2025.001) מונה את טרנזקציות האישור לפקודת תהליך " +
      "בלשונו: 'Time Ticket for Process Order (COR6, COR6N) Confirmation of process order (CORK) Cancel " +
      "Confirmation for Process Order (CORS) (display only) Display Confirmation for Process Order (CORT)'; " +
      "‏(2) data/fiori/apps.ts#F3364 רשם odata‏ 'API_PROCORDCONF' בעוד השם הטכני הרשמי הוא " +
      "API_PROC_ORDER_CONFIRMATION_2_SRV — נורמל (גם ב-data/centers/fiori.ts); ‏(3) שני רישומי ההעשרה נוקבים בשני מקורות " +
      "אימות שונים לאותו אובייקט. במדריך Virtual Data Model לא נמצאה תצוגת CDS ייעודית לאישורי פקודת תהליך; " +
      "I_ProductionOrderConfirmation ‏(loio 5e053c432869473e9cdea33d7e0118c0) מוגדרת בסניפט שלה כשולפת נתוני " +
      "אישורי פקודת ייצור מטבלת AFRU ולכן לא נרשמה. לא נמצאו מספרי SAP Note או KBA באף סניפט, ולכן לא נרשמו.",
  },

  /* --------------------- fm:BAPI_MEASUREMENTDOCUM_CREATE */
  {
    id: "fm:BAPI_MEASUREMENTDOCUM_CREATE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Function Module MEASUREM_DOCUM_RFC_SINGLE_001 | Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6770b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "מדריך Maintenance Management למהדורת On-Premise 2025 FPS01 מתעד את מודול הפונקציה " +
               "MEASUREM_DOCUM_RFC_SINGLE_001 כממשק RFC ליצירת מסמך מדידה. כלשון הכותרת והתקציר: 'Function Module " +
               "MEASUREM_DOCUM_RFC_SINGLE_001 Task RFC Measurement document: Individual processing, Create Use This RFC " +
               "enables the following remote calls for creating measurement documents'. בטבלת הפרמטרים שבתקציר: " +
               "'DOCUMENT CHAR 20 Measurement document (primary key) COMPLETE_DOCUMENT See IMRG structure See IMRG " +
               "structure Complete measurement document NOTIFICATION CHAR 12 Notification'. כותרת הרשומה ותקצירה אינם " +
               "נוקבים בשם BAPI_MEASUREMENTDOCUM_CREATE ואינם נוקבים בשם BAPI כלשהו; גוף העמוד לא נשלף (מעטפת " +
               "JavaScript).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Measurement Document | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/dd3cdfa1a9834a24a90a59187ce68303.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE21,
        claim: "מדריך APIs for Maintenance Management מתעד פעולת יצירה למסמך מדידה: 'Create Measurement Document With " +
               "this operation, you can create a measurement document for a measuring point or counter type of measuring " +
               "point object. Request This is a POST operation', ובהמשך 'Response The response of the create operation " +
               "will return all the fields that are maintained in Measurement Documents'. זו חלופת API מתועדת לתרחיש " +
               "יצירת מסמך מדידה. התקציר נוקב בשיטת ה-POST ואינו נוקב בשם השירות; שיוך הפעולה לשירות OData " +
               "API_MEASUREMENTDOCUMENT נשען על הראיה הבאה, עמוד Operations for Measurement Document. כותרת הרשומה " +
               "ותקצירה אינם נוקבים בשם BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Measurement Document | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/1db7ad6b759248e7a6b5b2ff1311d2e6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד Operations for Measurement Document למהדורת 2025 FPS01 קובע בתקציר: 'Operations for Measurement " +
               "Document Measurement Document API offers these operations: Operation HTTP Method Sample URL Read " +
               "Measurement Documents GET GET <host>/sap/opu/odata4/sap/api_measurementdocument', ובהמשך 'Against " +
               "Maintenance Order POST POST: " +
               "<host>/sap/opu/odata4/sap/api_measurementdocument/srvd_a2x/sap/MeasurementDocument/0001/MeasurementDocument " +
               "Content-Type: application/json'. כלומר פעולות מסמך המדידה מוגשות בשירות OData v4 בנתיב " +
               "api_measurementdocument. התקציר אינו נוקב בשם BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Measurement document | Data Migration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/3ed6702ecafa4258ae9d4f0a1f073d98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד אובייקט ההגירה 'PM - Measurement document' במדריך Data Migration לגרסת 2025 FPS01 מציג בתקציר את " +
               "הרצף 'Function Module: CNV_PE_S4_PM_MEASUREM_DOCUM APIs/BAPIs MEASUREM_DOCUM_RFC_SINGLE_001', כלומר תחת " +
               "הכותרת APIs/BAPIs נקוב מודול הפונקציה MEASUREM_DOCUM_RFC_SINGLE_001 ולא שם BAPI. בהרצת חיפוש נוספת באותו " +
               "יום החזיר אותו עמוד את הרצף 'Measurement Document Display Measurement Document (app ID IK13) " +
               "CNV_PE_S4_PM_MEASUREM_DOCUM APIs/BAPIs Used in Migration-Specific Function Modules'. התקצירים מוגשים עם " +
               "השמטות, ולכן נטען כאן רק מה שהופיע ברצף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ההעשרה של אובייקטי ה-BAPI של תחזוקת מפעל בפרויקט (תיקון שם)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת ההעשרה מסמנת את השם BAPI_MEASUREMENTDOCUM_CREATE כ-verificationStatus 'invalid-name' ברמת ביטחון " +
               "גבוהה, עם הערת QA 'אומת: אינו אובייקט SAP סטנדרטי (לא נמצא ב-SE37). אין לפרסם כשם תקין', ומפנה במקומו " +
               "למודול הפונקציה MEASUREM_DOCUM_RFC_SINGLE_001. אותה רשומה מסמנת כך גם את BAPI_MEASUREMENTDOCUM_CREATEM, " +
               "ומורה לקרוא בלולאה ל-MEASUREM_DOCUM_RFC_SINGLE_001 במקום לחפש BAPI לעיבוד מרובה. בדיקת SE37 עצמה לא " +
               "בוצעה בסשן זה, והרשומה אינה נושאת קישור למקור SAP רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_MEASUREMENTDOCUM_CREATE; " +
                 "data/bapi-enrichment.pm.ts#BAPI_MEASUREMENTDOCUM_CREATEM",
        conflictingEvidence: [
          {
            sourceType: "repository",
            sourceTitle: "קטלוג הפונקציות של הפרויקט וחוברת ההגירה של תחזוקת מפעל",
            product: "SAP ECC 6.0 / SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE21,
            claim: "שתי רשומות מאגר אחרות מציגות את אותו שם כאובייקט קיים: קטלוג הפונקציות מתאר 'יצירת מסמך קריאת מדידה " +
                   "(Measurement Document) לנקודת מדידה/מונה', מונה פרמטרים MEASUREMENT_POINT, READING / RECORDED_VALUE " +
                   "ו-MEASUREMENT_DOCUMENT, וקובע 'זמין ב-ECC' ו'זמין ב-S/4HANA' בלי סימון inferred; ובחוברת ההגירה של " +
                   "תחזוקת מפעל השם מופיע ברשימת הפונקציות של הטבלה IMRG עם התיאור 'יצירת מסמך מדידה', לצד " +
                   "BAPI_MEASUREMENTDOCUM_CREATEM ו-MEASUREM_DOCUM_RFC_SINGLE_001. שתי הרשומות סותרות את סימון invalid-name, " +
                   "ואף אחת מהן אינה נסמכת על מקור SAP רשמי.",
            verificationLevel: "repository_verified",
            repoRef: "data/function-intel.ts#BAPI_MEASUREMENTDOCUM_CREATE; data/sapData.pm.ts#IMRG",
          },
        ],
      },
    ],
    status: {
      status: "verification_required",
      he: "השם BAPI_MEASUREMENTDOCUM_CREATE לא אותר באף רשומה רשמית של SAP במעבר זה, לא בסקופ SAP S/4HANA " +
          "On-Premise ולא בסקופ SAP ERP 6.0 EHP8. התיעוד הרשמי מייעד ליצירת מסמך מדידה בתחזוקת מפעל שני ממשקים " +
          "בשמות אחרים: מודול הפונקציה MEASUREM_DOCUM_RFC_SINGLE_001 ('RFC Measurement document: Individual " +
          "processing, Create', מדריך Maintenance Management 2025 FPS01) ופעולת 'Create Measurement Document' " +
          "בשירות ה-OData של מסמכי המדידה. נתוני הפרויקט עצמם חלוקים על קיום האובייקט: רישום ההעשרה של ה-BAPI מסמן " +
          "את השם כלא תקני, בעוד קטלוג הפונקציות וחוברת ההגירה מציגים אותו כאובייקט קיים וזמין ב-S/4HANA. לכן לא " +
          "נקבע כאן סטטוס S/4HANA לאובייקט: קיומו טרם אומת, והיעדר רשומה רשמית הוא ממצא תחום-חיפוש ולא אמירה רשמית " +
          "על אי-זמינות.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לאמת ב-SE37 במערכת ECC וב-S/4HANA היעד אם קיים אובייקט בשם BAPI_MEASUREMENTDOCUM_CREATE ומה סטטוס השחרור " +
        "שלו, לפני כל הסתמכות על השם בקוד, בממשק או בחומר הדרכה. ליצירת מסמך מדידה בקריאת RFC להשתמש במודול " +
        "המתועד MEASUREM_DOCUM_RFC_SINGLE_001 (להרחבות לקוח דרך הפרמטר USER_DATA, כפי שמצוטט מאותו עמוד ברשומת " +
        "האימות table:IMRG). לשילוב חיצוני, לעדכון המוני ולתרחישי ענן להעדיף את שירות ה-OData של מסמכי המדידה ואת " +
        "פעולת 'Create Measurement Document' שבו. להעברת נתונים להשתמש באובייקט ההגירה PM - Measurement document, " +
        "שבו SAP נוקבת תחת הכותרת APIs/BAPIs במודול MEASUREM_DOCUM_RFC_SINGLE_001. עד לבדיקת SE37 אין להציג את " +
        "השם הזה בקטלוג כ-BAPI משוחרר, ואין להציג את רשימת הפרמטרים שבקטלוג הפונקציות כעובדה מאומתת.",
    },
    xrefs: [
      "table:IMRG",
      "table:IMPTT",
      "fm:MEASUREM_DOCUM_RFC_SINGLE_001",
      "fm:BAPI_MEASUREMENTDOCUM_CREATEM",
      "fm:BAPI_MPID_CREATE",
      "cds:I_MeasurementDocument",
      "tx:IK11",
      "tx:IK13",
      "tx:IK17",
      "tx:IK01",
      "tx:IK34",
      "enh:exit:IMRC0001",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "מה נבדק בפועל: אחת-עשרה שאילתות בשירות החיפוש של help.sap.com דרך scripts/sap-help-search.mjs " +
      "ב-2026-09-21 ('BAPI_MEASUREMENTDOCUM_CREATE', 'Measurement Document BAPI', " +
      "'MEASUREM_DOCUM_RFC_SINGLE_001', 'Measurement Document API Maintenance Management', 'Measurement " +
      "Document API technical name API_MEASUREMENTDOCUMENT service', 'Notes about the Function Modules " +
      "measurement document measuring point RFC', 'Simplification measurement document BAPI replaced deprecated " +
      "plant maintenance', 'Create Measurement Document operation POST measuring point counter' בסינון גרסה " +
      "2025.001, 'measurement document BAPI create BUS business object', 'BAPI list plant maintenance measuring " +
      "point measurement document' ו-'BAPI_MEASUREMENTDOCUM measurement document BAPI'), מהן שתיים הורצו בסקופ " +
      "המוצר SAP_ERP (6.0 EHP8 Latest), לצד שתי הרצות WebSearch מוגבלות ל-help.sap.com / api.sap.com / " +
      "fioriappslibrary.hana.ondemand.com / fal.cloud.sap. סריקה תבניתית של כל רשומות ה-JSON שהוחזרו (עד 21 " +
      "רשומות לשאילתה) על המחרוזת 'MEASUREMENTDOCUM_' העלתה אפס התאמות בכותרות ובתקצירים; ההתאמות היחידות " +
      "למחרוזת 'MEASUREMENTDOCUM' הן שם שירות ה-OData API_MEASUREMENTDOCUMENT ונתיבו api_measurementdocument. " +
      "הממצא השלילי תחום לכותרות ולתקצירים של רשומות החיפוש ולשתי הרצות ה-WebSearch, ואינו אמירה גורפת " +
      "שהאובייקט אינו קיים במערכת. הסטטוס הנגזר כיום באפליקציה מגיע מרישום אובייקטי הפונקציה " +
      "(verificationStatus 'invalid-name') ומוצג כ'לא רלוונטי' ברמת 'מאומת מול נתוני הפרויקט'; רשומה זו מחליפה " +
      "אותו ב'נדרש אימות נוסף' ומורידה את דרגת האימות ל'מקורות סותרים', משום שהסתירה בין רשומות המאגר נרשמת " +
      "כ-conflictingEvidence ולא רק בהערות: היא נוגעת לשאלת קיום האובייקט, שהיא עצם נושא הרשומה. BASELINE.md " +
      "מתעד את אותה תופעה במחלקה שלמה: השם מופיע ברשימת 18 המזהים המסומנים invalid-name, ו-13 מהם נושאים רשומת " +
      "קטלוג פונקציות לא-inferred הטוענת זמינות ב-S/4HANA. מקורות רשמיים נוספים שנמצאו ולא צורפו כראיות נפרדות: " +
      "'Measurement Document | APIs for Maintenance Management' (loio 6afa93607aa74b1bb0aebdbe2867c8f9, " +
      "2023.latest), הקובע 'Service name: API_MEASUREMENTDOCUMENT This synchronous inbound service enables you " +
      "to read, create and update one or more measurement documents' ואת האילוץ 'This API does not support soft " +
      "or hard deletion of measurement documents'; שלוש פעולות יצירה נוספות במהדורת 2025 FPS01 ('Create " +
      "Measurement Document for a Counter', loio 31a2e7bdb9404fcd9fbc6e0e73fc652d; 'Create Measurement Document " +
      "Against Maintenance Order', loio 8b4a67d53d534b18a31dce7dbbbf843a; 'Create Measurement Document for a " +
      "Maintenance Order and Operation', loio 6c20813e74244296821e1ea2482fadae); 'OData APIs: Measurement " +
      "Document and Measuring Point' (loio b2b19dde57ea4336a3e7c096c06ce4b4, 2021.000), 'With the Measurement " +
      "Document API, you can now create measurement document for a maintenance order, operation, and " +
      "suboperation'; 'Notes about the Function Modules' (loio 6470b65334e6b54ce10000000a174cb4, 2025.001), " +
      "'All individual functions are performed in the SAP System using RFC-enabled function modules (Remote " +
      "Function Call)'; 'Function Module MEASUREM_DOCUM_RFC_SINGLE_002' (loio 6a70b65334e6b54ce10000000a174cb4, " +
      "2025.001) לשינוי, הצגה וקריאה; ו-'Enterprise Asset Management Part 4' (loio " +
      "3346ac67364447a3ba2f4efa65b8c014, 2025.001), 'The new API MEASUREM_DOCUM_RFC_CANCEL enables partners and " +
      "customers to cancel measurement documents in their own developments'. מה שלא אומת: קיום האובייקט ב-SE37 " +
      "(חיבור sc4sap MCP נכשל בסשן זה, ולכן לא בוצעה בדיקה במערכת חיה); רשימת הפרמטרים שבקטלוג הפונקציות " +
      "(MEASUREMENT_POINT, READING / RECORDED_VALUE, MEASUREMENT_DOCUMENT) ואובייקט ה-BOR שלו; סטטוס שחרור; " +
      "זמינות ב-SAP S/4HANA Cloud Public Edition; ולא אותרו SAP Note או KBA רלוונטיים (me.sap.com/notes וקטלוג " +
      "פריטי הפישוט דורשים התחברות S-user). שדה המפתח של מסמך המדידה אינו נקבע ברשומה זו: רשומת האימות " +
      "table:IMRG כבר קבעה שהוא נשען על נתוני הפרויקט בלבד. לא נטען יורש (successor) משום שהסטטוס אינו " +
      "replaced, deprecated או not_available, ומשום שיורש מחייב אמירה רשמית על החלפה. אין xref ליישום Fiori: " +
      "אין יישום למסמכי מדידה ב-data/fiori/apps.ts, ו-help.sap.com מתעד יישומים בשמות 'Process Measurement " +
      "Document' ו-'Process Measuring Point' בלי מזהה F/W; הקטלוג העסקי SAP_EAM_BC_MEAPT נקוב בתקציר של " +
      "'Process Measuring Point' בלבד; הצירוף '(app ID IK13)' שבעמוד ההגירה הוא קוד טרנזקציה ולא מזהה Fiori. " +
      "ה-xref אל fm:BAPI_MPID_CREATE ואל enh:exit:IMRC0001 הם עוגני ניווט לרשומות שכנות שתיעודן במאגר בלבד " +
      "(רשומת IMRC0001 מסומנת inferred). המזהה fm:BAPI_MEASUREMENTDOCUM_CREATEM סובל מאותה סתירה בדיוק ומתאים " +
      "לאותו טיפול בהמשך הקטלוג; המודולים MEASUREM_DOCUM_RFC_SINGLE_002 ו-MEASUREM_DOCUM_RFC_CANCEL אינם ביקום " +
      "המזהים ולכן אינם xrefs.",
  },

  /* --------------------- fm:BAPI_MEASUREMENTPOINT_CREATE */
  {
    id: "fm:BAPI_MEASUREMENTPOINT_CREATE",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01 (PDF, נקרא במלואו)",
        url:
          "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2025.001/en-US/WN_OP2025_FPS01_EN.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "מסמך ה-What's New הרשמי לגרסת 2025 FPS01 ‏(Document Version 1.0, 2026-02-25) הורד ב-2026-09-21 ‏(HTTP " +
               "200, ‏12,864,449 בתים) וחולץ לטקסט מלא. סעיף 3.1.1 שלו, 'OData API: Measuring Point', קובע: 'The OData " +
               "API Measuring Point (API_MEASURINGPOINT) now has an attribute called the Authorization Group that allows " +
               "you to control access to edit the measuring point', ורושם בטבלת הפרטים הטכניים 'Type Changed', " +
               "‏'Technical Object Name API: API_MEASURINGPOINT', ‏'Application Component PM-EQM-SF-MPC (Measuring " +
               "Points and Counters)', ‏'Availability SAP S/4HANA Cloud Private Edition and SAP S/4HANA' ו-'Valid as Of " +
               "2025 FPS01'. סעיף 3.1.10 מונה את 'Measuring Point (API_MEASURINGPOINT)' בין שבעת שירותי ה-OData שאליהם " +
               "נוספה הישות A_LinearAssetManagementData. ממצא שלילי התחום לאותה קריאה: המחרוזות MEASUREMENTPOINT, ‏MPID " +
               "ו-MP_RFC אינן מופיעות בטקסט המסמך אף לא פעם אחת, בעוד API_MEASURINGPOINT מופיע בו ארבע פעמים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Measuring point | Data Migration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/5385d17be2c74424bbcd6300e602e595.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד אובייקט המיגרציה הרשמי 'PM - Measuring point' למהדורת On-Premise‏ 2025 FPS01 רושם בתקציר, בשורת צעד " +
               "ההעברה 'Create Measuring Point' ובעמודת מודול הפונקציה שלצד אפליקציית ה-Fiori, את המחרוזת 'Measuring " +
               "Point Display Measuring Point (app ID W0030) MP_RFC_SINGLE_CREATE'. כותרת אותה עמודה כפי שהיא מופיעה " +
               "בתקציר היא 'Navigation Function Module', ולכן אי אפשר לקבוע מהתקציר בלבד אם MP_RFC_SINGLE_CREATE הוא " +
               "המודול המבצע את היצירה או המודול שדרכו מנווטים לאפליקציה; בעמודי אחים באותו מדריך מופיע באותה עמודה " +
               "מודול המיגרציה הייעודי, למשל CNV_PE_S4_PM_MEASUREM_DOCUM בעמוד 'PM - Measurement document'. התקציר מוסיף " +
               "'Navigation Function Module Migrate Measuring Point All instances of this migration object are relevant " +
               "to the transfer option', מתאר את צעד ההעברה 'Create Measuring Point Creates a measuring point in the " +
               "target system. All instances that qualify for this transfer option are relevant to the transfer step', " +
               "וקובע על שיטת ההעברה 'This migration technique transfers data to the target system using Business " +
               "Application Programming Interfaces (BAPIs)'. השם שהעמוד נוקב בו הוא MP_RFC_SINGLE_CREATE; השם " +
               "BAPI_MEASUREMENTPOINT_CREATE אינו מופיע בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Measuring Point | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/8cdfef769b2b4f7195a5f296982e2fe6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד השירות הרשמי למהדורת On-Premise‏ 2025 FPS01 קובע בתקצירו: 'Measuring Point Service name: " +
               "API_MEASURINGPOINT This synchronous inbound service enables you to create, read, and update a measuring " +
               "point or a collection of measuring points through an external application', ומוסיף 'The payload used to " +
               "create a measuring point through this API is sent in JSON format as a request object' ו-'Measuring " +
               "points are located on technical objects such as pieces of equipment or at functional locations'. העמוד " +
               "אינו נוקב בשם BAPI_MEASUREMENTPOINT_CREATE ואינו מציג את השירות כמחליף של מודול פונקציה כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Measuring Point | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/5088e7c7ba7f47d8a97ca99268da613e.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE21,
        claim: "רשומת 'Operations for Measuring Point' באותו מדריך, בגרסה שהחיפוש מחזיר עבורה versionId‏ 2023.latest, " +
               "מציגה בתקצירה את פעולות השירות כלשונן: 'Operations for Measuring Point The Measuring Point API offers " +
               "these operations: Operation HTTP Method Sample URL Read All Measuring Points GET', ‏'Create Measuring " +
               "Point POST <host>/sap/opu/odata4/sap/api_measuringpoint/srvd_a2x/sap/MeasuringPoint/0001/MeasuringPoint' " +
               "ו-'Batch Request - Create Measuring Point'. זו חלופת OData מתועדת לתרחיש יצירת נקודת מדידה; גם עמוד זה " +
               "אינו נוקב בשם BAPI_MEASUREMENTPOINT_CREATE.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שתי רשומות מאגר סותרות לאותו שם: סריקת האימות של קטלוג ה-BAPI מול קטלוג הפונקציות",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "‏data/bapi-enrichment.pm.ts מסמן לשם זה verificationStatus‏ 'invalid-name' ב-confidence‏ 'high', בנוסח " +
               "'אינו קיים. השתמש ב-BAPI_MPID_CREATE (או FM MP_RFC_SINGLE_CREATE)', ובהערת ה-QA 'אומת: אינו אובייקט SAP " +
               "סטנדרטי (לא נמצא ב-SE37). אין לפרסם כשם תקין'; מקור האימות הרשום שם הוא מראת מטא-נתונים של SE37 באתר " +
               "חיצוני יחד עם SAP Community, ושניהם אינם ברשימת ההיתר של הפרויקט. מנגד data/function-intel.ts רושם לאותו " +
               "שם תיאור מלא ('יצירת נקודת מדידה/מונה לאובייקט טכני'), פרמטר קלט POINT ופרמטר פלט MEASUREMENT_POINT, " +
               "שיוך ל-IK01 ולטבלת IMPTT, ושדות 'זמין ב-ECC' ו'זמין ב-S/4HANA' בלי מקור. שתי הרשומות סותרות זו את זו " +
               "בשאלת עצם קיום השם, ואף אחת מהן אינה נסמכת על עמוד SAP רשמי. הדאטהסט המחולל של בלופרינט PM מונה את השם " +
               "במערך funcs של טבלת IMPTT ('רשומת אב של נקודת מדידה / מונה'), וזה מקור הרישום.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_MEASUREMENTPOINT_CREATE; " +
                 "data/function-intel.ts#BAPI_MEASUREMENTPOINT_CREATE; data/sapData.pm.ts#IMPTT (funcs)",
      },
    ],
    status: {
      status: "verification_required",
      he: "מודול הפונקציה רשום בקטלוג הפרויקט כערוץ ליצירת נקודת מדידה (Measuring Point) על אובייקט טכני, בזיקה " +
          "ל-IK01 ולטבלת IMPTT, אך שם האובייקט עצמו לא אושר באף מקור SAP רשמי שנבדק: שאילתות חוזרות בשירות החיפוש " +
          "של SAP Help (סקופ On-Premise, ‏2026-09-21) לא החזירו כותרת או תקציר הנוקבים בו, ובמסמך What's New של " +
          "2025 FPS01 שנקרא במלואו המחרוזת MEASUREMENTPOINT אינה מופיעה. התיעוד של אותה גרסה נוקב בשני שמות אחרים " +
          "בהקשר יצירת נקודת מדידה: השם MP_RFC_SINGLE_CREATE, שעמוד אובייקט המיגרציה 'PM - Measuring point' רושם " +
          "בעמודת מודול הפונקציה של צעד 'Create Measuring Point' (תפקידו המדויק אינו נקבע מהתקציר), ושירות ה-OData‏ " +
          "API_MEASURINGPOINT, שעמודו הרשמי מתאר אותו כשירות נכנס סינכרוני ליצירה, קריאה ועדכון של נקודת מדידה. " +
          "בתוך המאגר שתי רשומות סותרות זו את זו בשאלת קיום השם, ולכן הסטטוס נשאר פתוח עד בדיקה ב-SE37 או ב-BAPI " +
          "Explorer במערכת היעד.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לפני שימוש בשם זה בקוד Z, בממשק או במסמך אפיון: לבדוק ב-SE37 או ב-BAPI Explorer במערכת ECC וב-S/4HANA אם " +
        "BAPI_MEASUREMENTPOINT_CREATE קיים כאובייקט סטנדרטי, ואם אינו קיים לתקן את ההפניה בשתי רשומות המאגר. " +
        "ליצירת נקודת מדידה בממשק חדש להעדיף את שירות ה-OData‏ API_MEASURINGPOINT ואת פעולת Create Measuring " +
        "Point שלו; בטעינת נתונים ראשונית להשתמש באובייקט המיגרציה הרשמי 'PM - Measuring point', שהתיעוד רושם בו " +
        "את השם MP_RFC_SINGLE_CREATE בעמודת מודול הפונקציה של צעד היצירה. לאימות תפקודי להשוות מול IK01, לבדוק את " +
        "השורה שנוצרה ב-IMPTT ואת קריאות המדידה ב-IMRG, ולזכור שכתיבה דרך מודול פונקציה מחייבת COMMIT מפורש. אין " +
        "להציג את השם כממשק משוחרר כל עוד לא נמצא לו מקור רשמי או בדיקה במערכת.",
    },
    xrefs: [
      "table:IMPTT",
      "table:IMRG",
      "table:EQUI",
      "table:IFLOT",
      "tx:IK01",
      "tx:IK02",
      "tx:IK03",
      "fm:BAPI_MPID_CREATE",
      "fm:BAPI_MEASUREMENTPOINT_GETLIST",
      "fm:MEASUREMENT_POINT_READ",
      "fm:MEASUREM_DOCUM_RFC_SINGLE_001",
      "fm:BAPI_TRANSACTION_COMMIT",
      "cds:I_MeasuringPoint",
      "cds:I_MeasurementDocument",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שיטה (2026-09-21): שאילתות חוזרות ב-scripts/sap-help-search.mjs תחת המוצר SAP_S4HANA_ON-PREMISE סביב השם " +
      "עצמו, סביב BAPI_MPID_CREATE, סביב שירות ה-OData‏ API_MEASURINGPOINT, סביב מדריך APIs for Maintenance " +
      "Management, סביב אובייקט המיגרציה 'PM - Measuring point' וסביב מודולי ה-RFC של נקודות מדידה ומסמכי " +
      "מדידה, בתוספת חיפוש רשת מוגבל ל-help.sap.com ול-api.sap.com. ה-url, ה-loio וה-versionId של הראיות " +
      "הרשמיות הועתקו כלשונם מפלט ה-JSON. גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו, ולכן כל טענה " +
      "מהם תחומה בכותרת ובתקציר של רשומת החיפוש; היוצא מן הכלל הוא מסמך ה-What's New של 2025 FPS01, שהורד ונקרא " +
      "כטקסט מלא. (1) הממצא השלילי על השם תחום לשאילתות ולמסמך שנקרא ואינו הוכחת היעדר: שירות החיפוש של SAP " +
      "Help אינו מתעד כל מודול פונקציה בשמו, ובדיקת SE37 במערכת חיה לא בוצעה (חיבור ה-MCP‏ sc4sap נכשל בפתיחת " +
      "ההפעלה). השאילתה על השם המדויק מחזירה שלוש עד ארבע רשומות בלבד, כולן ממדריכים אחרים, כולן ללא תקציר ואף " +
      "אחת אינה נוגעת לנקודות מדידה; הרכב התוצאות משתנה בין הרצה להרצה של שירות החיפוש ולכן אינו נרשם כאן " +
      "כרשימה סגורה. השאילתה על BAPI_MPID_CREATE מחזירה כארבע-עשרה רשומות ממדריכי APIs for Manufacturing, " +
      "‏Controlling, ‏Brazil ואחרים, ואף אחת אינה נוקבת בשם. (2) הסטטוס הנגזר שהאפליקציה מציגה היום, כפי שנמדד " +
      "בהרצת fromFuncRegistry ב-2026-09-21: 'לא רלוונטי' ברמת 'מאומת מול נתוני הפרויקט', עם הנימוק 'לפי רישום " +
      "אובייקטי הפונקציה של הפרויקט: השם אינו אובייקט SAP תקני; תמיכה ב-S/4HANA On-Premise: לא צוין' וההמלצה " +
      "'השם אינו אובייקט SAP תקני; לתקן את ההפניה במאגר'. הערכים שנכנסים למיפוי הם verificationStatus‏ " +
      "'invalid-name' מ-PM_ENRICHMENT ו-s4OnPremSupport‏ 'unknown' מהרשומה הנגזרת, שכן פונקציית העזר inv() אינה " +
      "קובעת שדות תמיכה. רשומה זו מחליפה את התצוגה ב'נדרש אימות נוסף' ברמת 'מקורות סותרים': 'לא רלוונטי' ברמת " +
      "מאגר מאומת הוא פסק דין חזק מדי לשם שהמאגר עצמו סותר את עצמו לגביו ושאין עליו מקור רשמי. (3) מדוע " +
      "conflicting_sources ולא 'מאומת מול תיעוד SAP רשמי': הראיות הרשמיות מאמתות את הערוצים הקיימים ליצירת " +
      "נקודת מדידה בגרסה 2025 FPS01, לא את נושא הרשומה עצמו; הסתירה הפנימית בין שתי רשומות המאגר היא עובדה על " +
      "הרשומה הזו, והיא מסומנת כאן באותו דפוס שבו סומנו רשומות מאגר סותרות בקטלוג ההרחבות. (4) אין successor: " +
      "אף מקור רשמי שנמצא אינו מציג אובייקט כלשהו כיורש של השם השנוי במחלוקת. MP_RFC_SINGLE_CREATE אינו מזהה " +
      "קיים ביקום הרשומות של הפרויקט (lib/route-manifest.generated.ts) ולכן אינו xref ואינו יורש; " +
      "BAPI_MPID_CREATE קיים ביקום ונרשם כ-xref בלבד, מפני שאף עמוד SAP רשמי שנבדק אינו נוקב בשמו וההפניה אליו " +
      "מקורה בסריקת המאגר. (5) אפליקציית Fiori: התקציר הרשמי של עמוד אובייקט המיגרציה נוקב ב-'Display Measuring " +
      "Point (app ID W0030)', ועמוד 'Process Measuring Point' לגרסת 2025 FPS01 ‏(loio " +
      "d0051e57f2f40a75e10000000a4450e5) קובע 'Three apps are provided for processing master records for " +
      "measuring points: Create Measuring Point, Change Measuring Point, and Display Measuring Point'. W0030 " +
      "אינו קיים ב-data/fiori/apps.ts, ולכן לא נרשם xref ל-Fiori. (6) מקורות רשמיים נוספים שנראו ולא נכתבו " +
      "כראיה: 'Notes about the Function Modules' במדריך Maintenance Management לגרסת 2025 FPS01 ‏(loio " +
      "6470b65334e6b54ce10000000a174cb4), שתקצירו קובע 'All individual functions are performed in the SAP " +
      "System using RFC-enabled function modules (Remote Function Call)' ו-'The function modules for " +
      "measurement documents and measuring points are able to return the complete object data to the calling " +
      "application from Release 3.1'; 'Function Module MEASUREM_DOCUM_RFC_SINGLE_002' באותו מדריך ובאותה גרסה " +
      "‏(loio 6a70b65334e6b54ce10000000a174cb4), המלמד ש-SAP מתעדת מודולי RFC של נקודות מדידה ומסמכי מדידה " +
      "בעמוד ייעודי הנושא את שמם המלא, ובדיקה ייעודית העלתה שאין עמוד מקביל בשם 'Function Module " +
      "MP_RFC_SINGLE_CREATE'; הווריאנט השני של עמוד אובייקט המיגרציה ‏(loio 0474e551b7ba40058459b270bb7ff002), " +
      "שתקצירו נוקב ב-Object Alias‏ EAM_MEAS_PNT וברכיב PM-EQM-SF-MPC; ורשומת 'Batch Request - Create Measuring " +
      "Point' לגרסת 2025.001 ‏(loio 0a945167ec6a4c8481e8c65f7e3f95c0). חיפוש הרשת המוגבל החזיר גם את רישום " +
      "ה-Hub‏ 'Overview | Measuring Point' בכתובת https://api.sap.com/api/MEASURINGPOINT_0001/overview; הוא לא " +
      "נרשם כראיה מפני שעמודי api.sap.com הם מעטפת ללא מפתח API, לפי כללי ה-fallback של MANIFEST. (7) מה שנשאר " +
      "פתוח: קיום השם ב-SE37, קבוצת הפונקציות שלו וסטטוס השחרור שלו; הפרמטרים POINT ו-MEASUREMENT_POINT שרשומת " +
      "function-intel נוקבת בהם, שאינם מופיעים באף מקור רשמי שנבדק ולכן אינם נטענים כאן; תפקידו המדויק של " +
      "MP_RFC_SINGLE_CREATE בטבלת צעדי ההעברה; והשאלה אם MP_RFC_SINGLE_CREATE ו-BAPI_MPID_CREATE הם שני שמות " +
      "לאותו ממשק או שני ממשקים נפרדים. לא נוסף alias בין שני השמות, משום שזהותם לא אומתה ומשום " +
      "ש-BAPI_MPID_CREATE הוא מזהה נפרד הקיים ביקום.",
  },

  /* -------------------------------- fm:BAPI_BATCH_CREATE */
  {
    id: "fm:BAPI_BATCH_CREATE",
    aliases: ["BAPI_BATCH_CREATE"],
    evidence: [
      BATCH_MASTER_API,
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Batch API | APIs for Logistics Cross Topics",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1841426f60f4e50913ec9a64aba8332/3d366e68d53345b4bad055ec8fe85d6e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד Operations for Batch API באותו מדריך ובאותה גרסה מונה את פעולות השירות: 'Operations for Batch API " +
               "The Batch API offers the following operations: Operation HTTP Method Sample URL Retrieve Batch GET GET " +
               "<host>/sap/opu/odata/SAP/API_BATCH_SRV/Batch(Material='TG21',BatchIdentifyingPlant ... Create Batch POST " +
               "POST <host>/sap/opu/odata/SAP/API_BATCH_SRV/Batch Change Batch PATCH PATCH " +
               "<host>/sap/opu/odata/SAP/API_BATCH_SRV', ומוסיף 'For this service, the If-Match header must be set for " +
               "all change operations'. כלומר יצירת אצווה דרך השירות היא POST על הישות Batch. הסניפט של שורת ה-Retrieve " +
               "נחתך אחרי BatchIdentifyingPlant, ולכן מבנה המפתח המלא אינו נטען כאן. הסניפט אינו נוקב במילה released, " +
               "אינו מונה פרמטרים של מודול פונקציה ואינו מזכיר BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Plant-specific Batch Information | APIs for Logistics Cross Topics",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e1841426f60f4e50913ec9a64aba8332/260260d87a504b77b1d3c1f24714fd4e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד הישות Plant-specific Batch Information באותו מדריך ובאותה גרסה קובע: 'Plant-specific Batch " +
               "Information Technical name: BatchPlant Use Entity that contains all batch properties which are related " +
               "to a plant where the batch can or could be found', וקושר את מבנה השירות להגדרת רמת האצווה בשתי אמירות: " +
               "'BatchIdentifyingPlant Depends on the batch level: If batch unique at plant level: the plant to which " +
               "the batch belongs, always the same as Plant Otherwise: not relevant, always initial value', וכן 'The " +
               "cardinality of this entity depends on the batch level: If batches are unique at plant level, each Batch " +
               "entity has exactly one BatchPlant entity (1:1)'. הסניפט אינו נוקב בשם טבלה: ההצמדה של רמת מפעל לטבלה " +
               "MCHA ושל רמת חומר או לקוח לטבלה MCH1 מתועדת ברשומות table:MCHA ו-table:MCH1 של הפרויקט, ולא בעמוד זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.8 S4TWL - Logistics Batch " +
                     "Management (LO-BM-MD, pp. 104-105)",
        url:
          "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "רשימת הפישוט של SAP S/4HANA 2025 FPS1 הורדה מחדש ב-2026-09-21 מהכתובת הזו (HTTP 200, כ-10.6MB), חולצה " +
               "לטקסט מלא (pdftotext -layout, 70,529 שורות) ונסרקה. חיפוש טקסט מלא על המחרוזות 'BAPI_BATCH' " +
               "ו-'BATCH_CREATE' מחזיר אפס מופעים בכל המסמך. פריט הפישוט של ניהול האצוות הלוגיסטי, 5.1.8 S4TWL - " +
               "Logistics Batch Management תחת רכיב היישום LO-BM-MD, עוסק בטרנזקציות בלבד: 'The following transactions " +
               "related to Logistics Batch Management are not available in SAP S/4HANA, on-premise edition 1511: MSC1, " +
               "MSC2, MSC3 and MSC4', המקבילות הפונקציונליות הן MSC1N Create Batch, MSC2N Change Batch, MSC3N Display " +
               "Batch ו-MSC4N Display Change Documents for Batch, וההשפעה העסקית היא 'No influence on the business " +
               "process – alternatively mentioned transaction codes need to be used'. מספר ההערה הנקוב במסמך: " +
               "0002267298.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "released_api_available",
      he: "ליצירת אב אצווה קיים ב-S/4HANA On-Premise ערוץ API רשמי ומתועד: שירות ה-OData Batch Master Record, שם " +
          "טכני API_BATCH_SRV, שתיעוד 2025 FPS01 מתאר ככולל יצירה ועדכון של אצוות ושל נתוני הסיווג שלהן, ופעולת " +
          "היצירה שלו היא POST על הישות Batch. מבנה השירות נגזר מהגדרת רמת האצווה: השדה BatchIdentifyingPlant נושא " +
          "את המפעל כשהאצווה ייחודית ברמת מפעל ונשאר ריק אחרת, ולכל אצווה ישות BatchPlant אחת ברמת מפעל; זו אותה " +
          "הגדרה שקובעת אם רשומת האב יושבת ב-MCHA או ב-MCH1. לגבי מודול הפונקציה עצמו: בחיפושים שבוצעו לא אותרה אף " +
          "רשומה רשמית של SAP הנוקבת בשם BAPI_BATCH_CREATE, לא כמודול קיים ולא כמודול שהוצא משימוש, ושתי רשימות " +
          "הפישוט שנסרקו במלואן אינן מזכירות אותו. זמינות המודול ב-S/4HANA ומעמד השחרור שלו נשענים על נתוני הפרויקט " +
          "בלבד ונשארים לאימות ב-SE37 או ב-BAPI Explorer. לא נמצא מקור רשמי המכריז על יורש, ולכן הרשומה אינה נושאת " +
          "יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: BATCH_MASTER_API,
      recommendedAction:
        "לאמת תחילה במערכת היעד (SE37 או BAPI Explorer) שהמודול קיים, את מבנה הפרמטרים שלו ואת הצורך " +
        "ב-BAPI_TRANSACTION_COMMIT: אף מקור רשמי שנבדק אינו מאשר אף אחד מאלה. בממשקים חדשים להעדיף את שירות " +
        "ה-OData‏ Batch Master Record‏ (API_BATCH_SRV), עם POST על הישות Batch ליצירה ו-PATCH עם כותרת If-Match " +
        "לשינוי. לפני מימוש לבדוק בהגדרות ('Specify Batch Level and Activate Status Management') מהי רמת האצווה " +
        "בפועל: ברמת מפעל השדה BatchIdentifyingPlant נושא את המפעל ולכל אצווה ישות BatchPlant אחת, וברמת חומר או " +
        "לקוח השדה נשאר ריק; אותה הגדרה קובעת גם אם רשומת האב יושבת ב-MCHA או ב-MCH1 ואיזה סוג מחלקת סיווג משמש. " +
        "את סיווג האצווה לתכנן כערוץ נפרד (למשל BAPI_OBJCL_CREATE או ישויות הסיווג של API_BATCH_SRV) ולא להניח " +
        "שהוא מתבצע בתוך קריאת ה-BAPI: רשומות המאגר עצמן חלוקות בנקודה זו ואף אחת מהן לא אומתה מול מקור רשמי.",
    },
    xrefs: [
      "table:MCHA",
      "table:MCH1",
      "tx:MSC1N",
      "tx:MSC2N",
      "tx:MSC3N",
      "tx:MSC4N",
      "fm:BAPI_BATCH_GET_DETAIL",
      "fm:BAPI_OBJCL_CREATE",
      "fm:BAPI_TRANSACTION_COMMIT",
      "cds:I_Batch",
      "fiori:F1576",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שלוש הראיות הרשמיות מ-help.sap.com נשלפו ב-2026-09-21 מ-scripts/sap-help-search.mjs --json, וה-url, " +
      "ה-loio וה-versionId הועתקו כלשונם מפלט ה-JSON (48b3c2ac60154137bb1d6411c7047e16, " +
      "3d366e68d53345b4bad055ec8fe85d6e, 260260d87a504b77b1d3c1f24714fd4e, כולן 2025.001 בתאריך פרסום " +
      "2026-02-24); גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו, ולכן כל טענה תחומה בכותרת ובסניפט של " +
      "רשומת החיפוש. (1) הממצא השלילי המרכזי: שאילתה על השם הטכני 'BAPI_BATCH_CREATE' החזירה 21 תוצאות שאף אחת " +
      "מהן אינה נוקבת בשם המודול בכותרת או בסניפט; כך גם שש השאילתות הנוספות 'Batch Management BAPI create " +
      "batch', 'Create Batch API_BATCH_SRV Logistics Cross Topics', 'Batch API key fields BatchIdentifyingPlant " +
      "batch level', 'Creating a Batch Master Record', 'Batch Management BAPI ALE distribution batch master' " +
      "ו-'batch BAPI BUS1001 business object batch management', ושאילתה מקבילה בסקופ SAP_ERP. חיפוש רשת מוגבל " +
      "ל-help.sap.com, api.sap.com, fioriappslibrary.hana.ondemand.com ו-fal.cloud.sap החזיר עמודים על יצירת אב " +
      "אצווה (Creating a Batch Master Record, Create Batch, Creating Batch Master Records ב-EWM) שאף אחד מהם " +
      "אינו נוקב בשם ה-BAPI. הממצא תחום לשאילתות אלה ואינו טענה מוחלטת. (2) שתי רשימות הפישוט הורדו מחדש בסשן " +
      "זה וחולצו ב-pdftotext: 2025 FPS01 (SIMPL_OP2025.pdf, 70,529 שורות) ו-2023 FPS03 (SIMPL_OP2023.pdf); " +
      "בשתיהן אפס מופעים למחרוזות 'BAPI_BATCH' ו-'BATCH_CREATE'. רק רשימת 2025 נרשמה כראיה; תוצאת 2023 מובאת " +
      "כאן כאישוש. (3) רובד Tier-2 של המאגר: data/function-intel.ts#BAPI_BATCH_CREATE מתאר יצירת אצווה לחומר " +
      "מנוהל-אצוות עם קלט MATERIAL/PLANT ו-BATCHATTRIBUTES, פלט BATCH, שדה ECC 'זמין ב-ECC' ושדה S/4 'זמין " +
      "ב-S/4HANA' ללא הסתייגות, ומשייך לטרנזקציות MSC1N ו-COB1 ולטבלאות MCHA ו-MCH1. אותה רשומה כותבת בשדה " +
      "ה-what שלה 'כולל סיווג מאפיינים', כלומר היא נוטה לצד רשומת הסריקה בשאלת הסיווג, והמאגר חלוק אפוא 2 מול 1 " +
      "ולא 1 מול 1 (ראו סעיף 4). הרשומה אינה מסומנת inferred ואינה נושאת URL רשמי, ולכן אינה אימות. (4) סתירה " +
      "פנימית במאגר שלא הוכרעה כאן: data/bapi-enrichment.pppi.ts רושם 'יצירת אצווה (סיווג נעשה בנפרד)' עם " +
      "parameterSummary 'IMP MATERIAL, PLANT, BATCH, BATCHATTRIBUTES · TAB RETURN · EXP BATCH' וטבלאות MCH1, " +
      "MCHA, MCHB, בעוד SWEEP_ENRICHMENT ב-data/bapi-enrichment.sweep.ts דורס את התיאור ל'יצירת אצווה (Batch) " +
      "לחומר batch-managed, כולל סיווג (Class Type 023)' ואת parameterSummary ל'IN: MATERIAL, PLANT, BATCH / " +
      "BATCHATTRIBUTES · OUT: BATCH, RETURN'. השאלה אם הסיווג מתבצע בתוך הקריאה או בערוץ נפרד נשארת פתוחה, אף " +
      "פרמטר לא אומת מול מקור רשמי, ולכן לא נרשמה כאן טענת פרמטרים ולא xref לטבלאות הסיווג. (5) הערכים " +
      "releasedStatus 'Released · RFC', s4OnPremSupport 'yes', stability 'Released' ו-verificationStatus " +
      "'verified-docs' של הרשומה ב-data/bapi-enrichment.pppi.ts הם ברירות מחדל של פונקציית העזר def() ולא ממצא " +
      "ייחודי לרשומה; ללא סטטוס מחובר היה components/neo-shell/reference/bapi-data.ts גוזר דרך fromFuncRegistry " +
      "את 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', קביעה רחבה מהראיות. הסטטוס המחובר כאן מיישר את " +
      "התצוגה עם התמונה הרשמית, כפי שנעשה קודם ב-fm:BAPI_GOODSMVT_CREATE וב-fm:BAPI_MATERIAL_SAVEDATA. (6) פער " +
      "קטלוגי שנרשם ותוקן ב-2026-09-21: data/bapi-enrichment.pppi.ts נקב באובייקט העסקי 'BUS1001_BATCH', בעוד העמוד " +
      "הרשמי 'Reference Objects | Production Planning and Control' לגרסת 2025.001 (loio " +
      "62d3b65334e6b54ce10000000a174cb4) מונה בסניפט 'BUS1001 Material BUS1001002 Batch'. העמוד עוסק באובייקטי " +
      "ייחוס של PP ולא ב-BAPI, ולכן לא נרשם כראיה ברשומה זו; הרשומה נוקבת כעת ב-BUS1001002. (7) xrefs שלא נכתבו מחוסר " +
      "מזהה ביקום הפרויקט: table:MCHB, table:AUSP, table:INOB, fm:BAPI_BATCH_CHANGE ו-tx:COB1 (האחרון מופיע " +
      "ב-function-intel כטרנזקציה קשורה). (8) fiori:F1576 נכתב לפי מזהה היקום של הפרויקט (data/fiori/apps.ts, " +
      "Manage Batches). רשומת האימות fiori:F1576 עצמה מתעדת סתירת מזהה פתוחה: לפי אותה רשומה המקורות הרשמיים " +
      "שנמצאו נוקבים ב-Manage Batches כ-F2462, ו-F2462 רשום שם כ-alias. ארבע הראיות שברשומה הנוכחית אינן נוקבות " +
      "במספר אפליקציה כלל: עמודי LO-BM נוקבים בשמות בלבד, 'Create Batch' ו'Manage Batches', ולכן אין כאן טענת " +
      "מזהה אפליקציה וה-xref נשען על מזהה המאגר. (9) אף אחת מארבע הראיות אינה מציגה את שירות ה-OData כמחליף " +
      "פורמלי של המודול: אין סניפט הנוקב בהחלפה, בהוצאה משימוש או בהגבלה, ולכן הרשומה אינה נושאת successor. " +
      "(10) לא בוצעה בדיקה חיה במערכת SAP: חיבור ה-MCP‏ sc4sap נכשל בסשן זה, ולכן קיום המודול, קבוצת הפונקציות, " +
      "הפרמטרים וסטטוס השחרור ברמת SE37 נשארים לא מאומתים. נבדק בפועל: חיפושי help.sap.com ושתי רשימות הפישוט " +
      "שהורדו ונסרקו. מבוסס על קובץ: רובד המאגר. דורש אימות במערכת SAP: קיום המודול ופרמטריו.",
  },

  /* ---------------------------- fm:BAPI_BATCH_GET_DETAIL */
  {
    id: "fm:BAPI_BATCH_GET_DETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"BAPI_BATCH_GET_DETAIL\" (SAP_S4HANA_ON-PREMISE), \"BAPI_BATCH_GET_DETAIL batch read " +
                     "BAPI\" (SAP_ERP), \"BAPIs Batch Management LO-BM batch master record BAPI\", \"BatchMaster BAPI business " +
                     "object batch\" (SAP_ERP), \"BAPI_BATCH_CREATE\", \"BAPI_BATCH_GET_DETAIL classification of batches\" " +
                     "(SUPPORT_CONTENT)",
        product: "SAP S/4HANA / SAP ERP 6.0",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "ממצא שלילי: בשש שאילתות לשירות החיפוש של SAP Help, בשלושה מערכי מוצר (SAP_S4HANA_ON-PREMISE‏, SAP_ERP " +
               "ו-SUPPORT_CONTENT), אף רשומה אינה נוקבת בשם BAPI_BATCH_GET_DETAIL בכותרת או בתקציר. התוצאות לשם המדויק " +
               "במערך S/4HANA שייכות לחוברות שאינן קשורות (בהרצת האימות: Logistics — General‏, Brazil‏, Retail‏, Public " +
               "Sector Management ואחרות) ותקציריהן ריקים; רשימת החוברות משתנה בין הרצות ולכן אינה נרשמת כממצא יציב. " +
               "במערך SAP ERP הוחזרו נושאי BAPI כלליים ‏(Actions by the BAPI Developer‏, Logon with Standardized BAPIs) " +
               "ונושאי אצוות שאינם נוקבים בשמו; במערך SUPPORT_CONTENT הוחזרו נושאי ניהול אצוות וסיווג ‏(Classification " +
               "of Batches‏, Automatic Creation of Batches for Production Orders) בלי שם ה-BAPI. גם שם ה-BAPI האחי " +
               "BAPI_BATCH_CREATE לא נמצא באף רשומה. הממצא תחום לשאילתות שהורצו ואינו הוכחה להיעדר תיעוד.",
        verificationLevel: "verification_required",
      },
      BATCH_OPS_API,
      {
        sourceType: "sap_help",
        sourceTitle: "OData API for Batch Master Record | What's New in SAP S/4HANA 2020",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/3b9d2b151cfb42358961c1ef7f752c02.html?locale=en-US&state=PRODUCTION&version=2020.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        accessedAt: DATE21,
        claim: "נושא ה-What's New של S/4HANA 2020 ‏(loio 3b9d2b151cfb42358961c1ef7f752c02) קובע בתקציר: 'The OData " +
               "service Batch Master Record (API_BATCH_SRV) enables you to retrieve batches and their classification in " +
               "an API call', ומוסיף 'In addition, batches can be created and updated'. התקציר מסווג את הרשומה 'API New " +
               "BLF LO-BM-INT SAP S/4HANA 2020'. כלומר: השירות API_BATCH_SRV מתועד כחדש במהדורת 2020 של S/4HANA‏ " +
               "On-Premise לרכיב ניהול אצוות, וכולל קריאת אצוות ונתוני הסיווג שלהן. רשימת הישויות, השדות והמגבלות אינה " +
               "מופיעה בתקציר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PP-PI ו-sweep) והקטלוג הפונקציונלי",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "שלוש רשומות מאגר מתארות את ה-BAPI כפעולת קריאה בלבד על נתוני אב אצווה, ללא COMMIT‏: רשומת ההעשרה של " +
               "PP-PI נוקבת בסיכום הפרמטרים 'IMP MATERIAL, BATCH, PLANT · EXP BATCHATTRIBUTES · TAB RETURN', בקבוצת " +
               "הפונקציות VBWB, בטרנזקציה MSC3N ובטבלאות MCH1 ו-MCHA; רשומת הסריקה מסמנת אותו verified עם RFC וללא " +
               "COMMIT ומתארת 'הצגת פרטי אצווה (תכונות, סיווג, תוקף)'; רשומת הקטלוג ‏(data/function-intel.ts) מגדירה " +
               "מודול PP-PI, תחום 'ניהול אצוות', וקובעת ל-S/4 ‏'זמין ב-S/4HANA' בלי לנקוב בחלופת OData. ברובד המאגר " +
               "הרשומה נושאת גם stability‏ 'Released' ו-s4OnPremSupport‏ 'yes', אך אלה ברירות מחדל של התבניות ואינן נתון " +
               "ייעודי ל-BAPI זה: הפונקציה verified() בקובץ הסריקה קובעת s4OnPremSupport‏ 'yes' ו-stability‏ 'Released' " +
               "לכל רשומה שאינה פנימית, והפונקציה def() ברשומת PP-PI גוזרת את stability מתחילית השם ‏(/^BAPI_/ ‏מוביל " +
               "ל-'Released') וקובעת s4OnPremSupport‏ 'yes' לכל רשומה. אלה נתוני פרויקט ולא הצהרת שחרור רשמית של SAP. " +
               "מקור האימות שברשומת הסריקה הוא מחרוזת תבניתית ללא קישור ואינו ראיה רשמית; מקור האימות של רשומת PP-PI, " +
               "שממנה נלקחים סיכום הפרמטרים וקבוצת הפונקציות VBWB, הוא SE37 metadata mirror ‏(sapdatasheet.org), מראה " +
               "מטא-נתונים של צד שלישי ולא מקור SAP רשמי. רשומת הפתרון ‏(data/solutions.ts) כבר נוקבת בשירות " +
               "API_BATCH_SRV לצד ה-BAPI, בהתאמה לשם שבתיעוד הרשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pppi.ts#BAPI_BATCH_GET_DETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: "לקריאת נתוני אב של אצווה (ניהול אצוות, תעשיות תהליכיות) קיים ב-S/4HANA On-Premise ממשק OData רשמי: " +
          "API_BATCH_SRV‏, שעמוד Operations for Batch API במדריך APIs for Logistics Cross Topics למהדורת 2025 FPS01 " +
          "מציג בו את הפעולות Retrieve Batch ו-Query Batch בשיטת GET תחת הנתיב " +
          "‎/sap/opu/odata/SAP/API_BATCH_SRV/Batch, לרבות סינון לפי ShelfLifeExpirationDate. השירות מתועד כחדש כבר " +
          "במהדורת 2020 לפי נושא ה-What's New. ה-BAPI עצמו, BAPI_BATCH_GET_DETAIL, אינו נזכר באף רשומת SAP Help " +
          "שנסרקה: לא במערך S/4HANA On-Premise, לא במערך SAP ERP ולא במערך תוכן התמיכה; זמינותו ב-S/4HANA נשענת על " +
          "רשומות המאגר (verified-docs‏, RFC לקריאה בלבד). לא אותר תיעוד רשמי המכריז עליו כמוחלף או כמוצא משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: BATCH_OPS_API,
      recommendedAction:
        "בממשקי RFC קיימים אפשר להמשיך לקרוא פרטי אצווה דרך ה-BAPI, לאחר אימות קיומו, סטטוס השחרור שלו ורשימת " +
        "הפרמטרים בפועל במערכת היעד ‏(SE37 או BAPI Explorer). לאינטגרציות חדשות ולתרחישי OData או REST להעדיף את " +
        "API_BATCH_SRV‏ (Retrieve Batch לאצווה בודדת, Query Batch לסינון, למשל לפי תאריך תפוגה), ולדיווח, " +
        "לאנליטיקה ולפיתוח ABAP חדש להעדיף את תצוגת ה-CDS‏ I_Batch על פני SELECT ישיר מ-MCH1 ומ-MCHA. את היקף " +
        "נתוני הסיווג שחוזרים בקריאה אחת יש לאמת: רשומות המאגר מייחסות ל-BAPI החזרת תכונות, סיווג ותוקף במבנה " +
        "BATCHATTRIBUTES, ואילו התיעוד הרשמי של השירות מציג ישויות נפרדות לנתוני הסיווג. את רשימת הישויות, השדות " +
        "והמגבלות של השירות יש לאמת מול Business Accelerator Hub‏ (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_BATCH_CREATE",
      "fm:VB_BATCH_DETAIL_GET",
      "fm:VB_BATCH_VERIFY",
      "fm:BAPI_MATERIAL_GET_DETAIL",
      "table:MCH1",
      "table:MCHA",
      "tx:MSC1N",
      "tx:MSC2N",
      "tx:MSC3N",
      "tx:MSC4N",
      "cds:I_Batch",
      "fiori:F1576",
      "enh:exit:SAPLV01Z",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "(1) הסטטוס 'קיים API משוחרר' נסמך על עמוד Operations for Batch API ‏(loio " +
      "3d366e68d53345b4bad055ec8fe85d6e, ‏2025.001). זו חלופה מתועדת ולא טענת החלפה רשמית של ה-BAPI, ולכן אין " +
      "יורש ברשומה. (2) שם ה-BAPI עצמו לא נמצא באף רשומת help.sap.com בשלושת מערכי המוצר שנבדקו, וגם לא שם " +
      "ה-BAPI האחי BAPI_BATCH_CREATE; קיומו, סטטוס השחרור שלו, קבוצת הפונקציות VBWB ורשימת הפרמטרים " +
      "‏(MATERIAL‏, BATCH‏, PLANT‏, BATCHATTRIBUTES‏, RETURN) נשענים על רשומות המאגר בלבד ודורשים אימות ב-SE37 " +
      "במערכת היעד. מקור רשומת PP-PI לפרמטרים ול-VBWB הוא מראה מטא-נתונים של צד שלישי ‏(SE37 metadata mirror, " +
      "‏sapdatasheet.org), וערכי stability‏ 'Released' ו-s4OnPremSupport‏ 'yes' הם ברירות מחדל של התבנית " +
      "המוחלות על כל רשומה, לא נתון ייעודי ל-BAPI זה. (3) גופי עמודי ה-Help לא נקראו (מעטפת JavaScript); שתי " +
      "בקשות curl לעמודי SUPPORT_CONTENT החזירו HTTP 200 עם גוף של 1,160 בתים ללא תוכן הנושא. לכן כל טענה תחומה " +
      "בכותרת ובתקציר של רשומת החיפוש; ספירות התוצאות ורשימות החוברות של שירות החיפוש אינן יציבות בין הרצות " +
      "ולכן אינן נרשמות. סניפטי שירות החיפוש תלויי-שאילתה: בביקורת האחות fm:BAPI_BATCH_CREATE נמדד שסניפט שורת " +
      "ה-Retrieve של אותו loio נחתך אחרי BatchIdentifyingPlant בשש שאילתות שונות, ולכן צומצם כאן הציטוט של אותה " +
      "שורה ומבנה המפתח המלא אינו נטען. (4) רשומות רשמיות נוספות אותרו באותם חיפושים ולא נשמרו כראיות נפרדות: " +
      "'Batch Master Record' ‏(loio 48b3c2ac60154137bb1d6411c7047e16, ‏2025.001; התקציר: 'Technical name: " +
      "API_BATCH_SRV This service enables you to retrieve batches and their classification data ...'), " +
      "'Retrieve Batch' ‏(loio eccdab2044c0496c996b886cb2554fa7, ‏2025.001), 'Query Batch' ‏(loio " +
      "b999196c85b1441587c0598717e00b23, ‏2025.001), ועמודי הישויות הנפרדות של השירות: Change Batch ‏(loio " +
      "318d52d13b234c9096bfaf30a926fa78), BatchText ‏(loio bb0cc125edde4b65a3e8a9b2a8dec4e7), BatchClass ‏(loio " +
      "4c8b91162e4246e884386c2a59b9b3a4) ו-BatchCharcValue ‏(loio a6e45859d61a423fab551a7831d86878), כולם " +
      "2025.001. (5) הבדל בין מערכים: אותו נושא Operations for Batch API מאונדקס גם במערך Cloud Public Edition " +
      "תחת גרסה 2608.500 עם אותו loio; רשומה זו נשארת On-Premise ואינה קובעת דבר על היקף השירות ב-Public Cloud. " +
      "(6) לא צוטט פריט פישוט, SAP Note או KBA: אף אחת מהשאילתות לא החזירה רשומה כזו הנוקבת ב-BAPI או ב-BAPI של " +
      "אצוות. ממצא תחום לחיפוש. (7) סתירות פנימיות במאגר: data/bapi-enrichment.sweep.ts מייחס ל-BAPI החזרת " +
      "'תכונות, סיווג, תוקף' בעוד סיכום הפרמטרים מונה BATCHATTRIBUTES ו-RETURN בלבד, ו-data/function-intel.ts " +
      "קובע 'זמין ב-S/4HANA' בלי לנקוב בחלופת OData אף שברשומת BAPI_MATERIAL_GET_DETAIL הוא כן נוקב " +
      "ב-API_PRODUCT; data/bapi-enrichment.pppi.ts מוסיף את קבוצת הפונקציות VBWB, שאינה מופיעה באף מקור רשמי " +
      "שנסרק. (8) מזהה ה-Fiori‏ F1576 הוא מזהה המאגר ‏(data/fiori/apps.ts); רשומת האימות fiori:F1576 מתעדת " +
      "שהמקורות הרשמיים נוקבים ב-Manage Batches כ-F2462 ורושמת אותו כ-alias. (9) רישום ה-Hub‏ " +
      "https://api.sap.com/api/API_BATCH_SRV/overview אותר בחיפוש מוגבל-דומיין; בקשת curl לא מאומתת מחזירה HTTP " +
      "200 עם גוף של 666 בתים שאינו מכיל את שם השירות, כלומר מעטפת JavaScript, ולכן תוכנו לא נקרא. (10) ה-xref " +
      "ל-enh:exit:SAPLV01Z הוא הקשר ניהול אצוות במאגר (קביעת אצווה) ולא טענה שה-BAPI קורא ל-exit הזה. (11) המצב " +
      "שנמדד לפני הרשומה: הסטטוס הנגזר מ-lib/bapi-registry הוא 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני " +
      "הפרויקט', בעומק L3. עם הרשומה הזו הסטטוס הופך ל'קיים API משוחרר' ברמת 'מאומת מול תיעוד SAP רשמי' ועומק " +
      "הרשומה עולה ל-L5. ספירות הכיסוי ברמת הקטלוג נמדדות למנה כולה ולא לרשומה בודדת, ולכן אינן נרשמות כאן.",
  },

  /* ------------------------------ fm:BAPI_ALM_NOTIF_LIST_FILTER */
  {
    id: "fm:BAPI_ALM_NOTIF_LIST_FILTER",
    aliases: ["BAPI_ALM_NOTIF_LIST_FILTER"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Operations for Maintenance Notifications' במדריך APIs for Maintenance Management למהדורת " +
               "On-Premise‏ 2025 FPS01 קובע בתקצירו: 'The API_MAINTNOTIFICATION API offers these operations: " +
               "Operation HTTP Method Sample URL Read Maintenance Notification GET', ומציג שתי דוגמאות GET: על סט " +
               "הישויות ‎<host>/sap/opu/odata/sap/API_MAINTNOTIFICATION/MaintenanceNotification ועל מפתח בודד " +
               "‎.../MaintenanceNotification(MaintenanceNotification='10101798'), לצד Create Maintenance " +
               "Notification‏ (POST) ו-Update Maintenance Notification‏ (PATCH). זהו ערוץ OData מתועד לקריאת הודעות " +
               "תחזוקת מפעל ב-S/4HANA. התקציר אינו מציג פרמטרי $filter או קריטריוני סינון, אינו נוקב בשם " +
               "BAPI_ALM_NOTIF_LIST_FILTER ואינו מציג את השירות כמחליף של מודול פונקציה כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/f430cbb1950c4880810e27a8308db301.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        accessedAt: DATE21,
        claim: "עמוד השירות 'Maintenance Notification' באותו מדריך, בגרסה שהחיפוש מחזיר עבורה versionId‏ " +
               "2023.latest, מונה בתקצירו את פונקציות השירות כלשונן: 'Create maintenance notification data Read " +
               "maintenance notification data Update maintenance notification data Mass create, read and update of " +
               "maintenance notification data', וקובע: 'This service enables you to create, read, and update data " +
               "related to maintenance notification. The data is provided in the payload, in an API call'. רשומת " +
               "What's New לגרסת 2021 ‏(loio 2fb95f8272f343e68f4bf384f1d2bfcb, ‏versionId‏ 2021.000) מתעדת את ה-API " +
               "כחדש: 'The Maintenance Notification API enables you to create, read, and update data related to " +
               "maintenance notifications', ורשומת What's New לגרסת 2025 FPS01 ‏(loio " +
               "fd9c0988b37243f0a030624c3b43bcc8, ‏2025.001) רושמת 'Object Name API: API_MAINTNOTIFICATION', " +
               "‏'Application Component PM-WOC-MN (Maintenance Notification)' ו-'Availability SAP S/4HANA Cloud " +
               "Private Edition and SAP S/4HANA'. אף אחד מהתקצירים אינו נוקב בשם ה-BAPI ואינו מפרט קריטריוני סינון " +
               "לקריאה מרובה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Find Maintenance Notification | Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/e994a057b4010322e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד האפליקציה 'Find Maintenance Notification' במדריך Maintenance Management למהדורת 2025 FPS01 קובע " +
               "בתקצירו: 'With this app, you can list the maintenance notifications in your system and find the one " +
               "you need', ומונה בין הפעולות 'Export the search result tables into a spreadsheet file', ‏'Assign a " +
               "maintenance notification or several notifications to an existing maintenance order' ו-'Display the " +
               "change log of the maintenance notification'. רשומת What's New לגרסת 2022 ‏(loio " +
               "9af70b1f8d894091a637d2c7ddbcb3a1, ‏2022.000) מוסיפה: 'In the Find Maintenance Notification app, you " +
               "can now filter maintenance notifications by an equipment or a functional location', ורשומת 'Deletion " +
               "of Manage Notification List App' לגרסת 2023 FPS01 ‏(loio b34107a2f922449b908eb9e44cd3c610, " +
               "‏2023.001) נוקבת במזהה האפליקציה: 'You can use the following successor app which is available on the " +
               "SAP Fiori launchpad: Find Maintenance Notification (F2071)'. זו חלופת משתמש מתועדת לרשימת הודעות " +
               "מסוננת; אף אחד מהתקצירים אינו נוקב בשם ה-BAPI, וההחלפה המתועדת היא של אפליקציית Fiori קודמת, לא של " +
               "מודול פונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שלוש שכבות מאגר סותרות לאותו שם: תיקוני קטלוג ה-BAPI מול קטלוג הפונקציות ומול הבלופרינט המחולל",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "‏data/bapi-enrichment.pm.ts מסמן לשם זה verificationStatus‏ 'invalid-name' ב-confidence‏ 'high', " +
               "בנוסח 'אינו FM סטנדרטי. משפחת ה-LIST מפוצלת לפי קריטריון: LIST_EQUI · LIST_FUNCLOC · LIST_PARTNER · " +
               "LIST_PLANGROUP · LIST_SORTFIELD', ובהערת ה-QA 'אימות: אין וריאנט FILTER גנרי. אין לפרסם כשם תקין'; " +
               "מקור האימות הרשום שם הוא מחרוזת ללא קישור ('SAP Help (BUS2038 · S/4HANA On-Premise) + SE37 metadata " +
               "(fn group IWOPM) · SAP KBA 1923267'), ושמות המשפחה החלופיים שהוא מציע אינם מזהים ביקום הרשומות ולא " +
               "נמצאו באף רשומת SAP Help. מנגד data/function-intel.ts רושם לאותו שם רשומה מלאה שאינה מסומנת " +
               "inferred: 'שליפת רשימת הודעות אחזקה לפי קריטריוני סינון (סוג, מצב, אובייקט, תאריכים)', קלט 'Filter " +
               "(type/status/dates/object)', טבלת פלט NOTIFICATIONS, ‏'זמין ב-ECC', ‏'זמין ב-S/4HANA; חלופה: Fiori " +
               "\"Find Maintenance Notifications\" / OData', טרנזקציות IW28 ו-IW29 וטבלת QMEL, בלי מקור. מקור הרישום " +
               "הוא הדאטהסט המחולל של בלופרינט PM: נושא 12 'היסטוריה וארכיון', שורת QMEL ('הודעות (כולל היסטוריות) " +
               "לניתוח אמינות', טרנזקציות 'IW64; IW66/IW67'), מונה את השם במערך funcs בתווית 'סינון הודעות לפי " +
               "קריטריון'; data/transactions.ts (IW28) ו-data/domain-detail.ts (pm-notifications) חוזרים על השם. " +
               "audit/s4-enrichment/baseline-inventories.json רושם את הסתירה בין function-intel לרישום על 13 מזהי " +
               "invalid-name, וזה אחד מהם. אף שכבה אינה נסמכת על עמוד SAP רשמי.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_LIST_FILTER; " +
                 "data/function-intel.ts#BAPI_ALM_NOTIF_LIST_FILTER; data/sapData.pm.ts#PM:QMEL (topic 12, funcs); " +
                 "data/transactions.ts#IW28; data/domain-detail.ts#pm-notifications",
      },
    ],
    status: {
      status: "verification_required",
      he: "מודול הפונקציה רשום בקטלוג הפרויקט כשליפת רשימת הודעות תחזוקת מפעל לפי קריטריוני סינון (סוג, מצב, " +
          "אובייקט, תאריכים), בזיקה ל-IW28/IW29 ולטבלת QMEL, אך שם האובייקט עצמו לא אושר באף מקור SAP רשמי " +
          "שנבדק: שאילתות חוזרות בשירות החיפוש של SAP Help (סקופ On-Premise וסקופ SAP ERP, ‏2026-09-21) לא " +
          "החזירו כותרת או תקציר הנוקבים בו, גם לא בשמות המשפחה החלופיים שרשומת המאגר מציעה, וחיפוש רשת מוגבל " +
          "ל-help.sap.com ול-api.sap.com לא העלה אותו. בתוך המאגר שתי רשומות סותרות זו את זו בשאלת עצם קיום השם " +
          "(invalid-name מול רשומת intel מלאה). התיעוד הרשמי לגרסת 2025 FPS01 מתעד ערוצים אחרים לקריאת רשימת " +
          "הודעות: שירות ה-OData‏ API_MAINTNOTIFICATION עם פעולת Read Maintenance Notification‏ (GET) על סט " +
          "הישויות MaintenanceNotification, ואפליקציית Fiori‏ Find Maintenance Notification‏ (F2071) המציגה " +
          "רשימת הודעות ומסננת, מגרסת 2022, גם לפי ציוד או מיקום פונקציונלי. הסטטוס נשאר פתוח עד בדיקה ב-SE37 " +
          "או ב-BAPI Explorer במערכת היעד.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לפני שימוש בשם זה בקוד Z, בממשק או במסמך אפיון: לבדוק ב-SE37 או ב-BAPI Explorer (שיטות האובייקט " +
        "BUS2038) במערכת ECC וב-S/4HANA אם BAPI_ALM_NOTIF_LIST_FILTER קיים כאובייקט סטנדרטי. אם אינו קיים, " +
        "לתקן את ההפניה בבלופרינט PM (המקור של data/sapData.pm.ts המחולל), ב-data/function-intel.ts, " +
        "ב-data/transactions.ts (IW28) וב-data/domain-detail.ts; אם קיים, להסיר את סימון invalid-name " +
        "ב-data/bapi-enrichment.pm.ts ולתעד את הפרמטרים שנמדדו. לשליפה מסוננת של הודעות בממשק חדש להעדיף את " +
        "שירות ה-OData‏ API_MAINTNOTIFICATION‏ (GET על סט הישויות MaintenanceNotification), ולאמת את אפשרויות " +
        "הסינון מול המטא-דאטה של השירות ב-Business Accelerator Hub או במערכת חיה, שכן התקציר הרשמי אינו מציג " +
        "אותן; בתרחישי דיווח לבחון גם את תצוגת ה-CDS‏ I_MaintenanceNotification (רשומה נפרדת בקטלוג). " +
        "למשתמשים: Find Maintenance Notification‏ (F2071) או IW28/IW29. לאימות תפקודי להשוות את התוצאה מול " +
        "IW28 ומול QMEL. אין להציג את השם כממשק משוחרר כל עוד לא נמצא לו מקור רשמי או בדיקה במערכת.",
    },
    xrefs: [
      "table:QMEL",
      "table:QMFE",
      "tx:IW28",
      "tx:IW29",
      "tx:IW64",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:BAPI_ALM_NOTIF_CREATE",
      "cds:I_MaintenanceNotification",
      "cds:I_MaintNotificationItem",
      "fiori:F4604",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שיטה (2026-09-21): שאילתות ב-scripts/sap-help-search.mjs תחת המוצר SAP_S4HANA_ON-PREMISE על השם " +
      "המדויק, על הקידומת BAPI_ALM_NOTIF_LIST, על השם החלופי BAPI_ALM_NOTIF_LIST_EQUI, על ה-OData API " +
      "להודעות תחזוקה, על אפליקציית Find Maintenance Notification, על IW28/IW29 ועל האובייקט BUS2038, " +
      "ושאילתות נוספות תחת המוצר SAP_ERP על השם המדויק ועל שיטות ה-BAPI של הודעות תחזוקה; בתוספת חיפוש רשת " +
      "מוגבל ל-help.sap.com, ‏api.sap.com, ‏fioriappslibrary ו-fal.cloud.sap. ה-url, ה-loio וה-versionId של " +
      "הראיות הרשמיות הועתקו כלשונם מפלט ה-JSON. גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו " +
      "(ניסיון WebFetch על עמוד Operations for Maintenance Notifications החזיר כותרת בלבד), ולכן כל טענה " +
      "תחומה בכותרת ובתקציר של רשומת החיפוש. (1) הממצא השלילי על השם תחום לשאילתות ואינו הוכחת היעדר: שירות " +
      "החיפוש אינו מתעד כל מודול פונקציה בשמו, ובדיקת SE37 במערכת חיה לא בוצעה (חיבור ה-MCP‏ sc4sap נכשל " +
      "בפתיחת ההפעלה). השאילתה על השם המדויק החזירה בסקופ On-Premise ארבע עד חמש רשומות ובסקופ SAP ERP " +
      "חמש-עשרה עד שמונה-עשרה (בשתי הרצות, 2026-09-21 ו-2026-09-22), כולן ממדריכים כלליים על BAPI או " +
      "ממדריכים שאינם קשורים, כולן ללא תקציר; שאילתת הקידומת LIST ושאילתת LIST_EQUI החזירו רשומות כלליות " +
      "בלבד; הרכב התוצאות משתנה בין הרצות ולכן אינו נרשם כרשימה סגורה. חיפוש הרשת המוגבל על השם המדויק " +
      "החזיר עמודי מבוא כלליים ל-BAPI ואת העמוד 'List of BAPI's' ב-SUPPORT_CONTENT של help.sap.com, שגופו " +
      "לא נקרא (מעטפת). (2) הסטטוס הנגזר שהאפליקציה מציגה היום, כפי שנמדד בהרצת fromFuncRegistry " +
      "ב-2026-09-21 עם ערכי הרישום (verificationStatus‏ 'invalid-name' מתיקוני PM_ENRICHMENT, " +
      "‏s4OnPremSupport‏ 'unknown' מהרשומה הנגזרת, שכן רשומת התיקון אינה קובעת שדות תמיכה): 'לא רלוונטי' " +
      "ברמת 'מאומת מול נתוני הפרויקט', עם הנימוק 'לפי רישום אובייקטי הפונקציה של הפרויקט: השם אינו אובייקט " +
      "SAP תקני; תמיכה ב-S/4HANA On-Premise: לא צוין' וההמלצה 'השם אינו אובייקט SAP תקני; לתקן את ההפניה " +
      "במאגר'. רשומה זו מחליפה את התצוגה ב'נדרש אימות נוסף' ברמת 'מקורות סותרים', באותו דפוס שבו נכתבו " +
      "BAPI_MEASUREMENTPOINT_CREATE ו-BAPI_MEASUREMENTDOCUM_CREATE: 'לא רלוונטי' ברמת מאגר מאומת הוא פסק " +
      "דין חזק מדי לשם שהמאגר עצמו סותר את עצמו לגביו ושאין עליו מקור רשמי. (3) מדוע לא " +
      "released_api_available כמו ברשומות האחיות BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_NOTIF_GET_DETAIL: שם " +
      "ה-BAPI עצמו שנוי במחלוקת במאגר, וסטטוס 'קיים API משוחרר' היה מציג שם שאולי אינו קיים כאובייקט תקין " +
      "עם חלופה; הראיות הרשמיות מאמתות את ערוצי הקריאה הקיימים בגרסה 2025 FPS01, לא את נושא הרשומה. (4) אין " +
      "successor: אף מקור רשמי אינו מציג אובייקט כלשהו כיורש של השם; ה-OData API הוא חלופה מתועדת ולא טענת " +
      "החלפה; ההחלפה היחידה המתועדת (Manage Notification List אל F2071) היא בין אפליקציות Fiori; F2071 אינה " +
      "קיימת ב-data/fiori/apps.ts ולכן לא נרשם לה xref, ו-fiori:F4604 ‏(Manage Maintenance Notifications " +
      "and Orders) נרשם כ-xref בלבד. שמות המשפחה החלופיים שרשומת bapi-enrichment מציעה (LIST_EQUI, " +
      "‏LIST_FUNCLOC, ‏LIST_PARTNER, ‏LIST_PLANGROUP, ‏LIST_SORTFIELD) אינם מזהים ביקום הרשומות, לא נמצאו " +
      "באף רשומת SAP Help ואינם נטענים כאן כשמות תקינים. (5) מקורות רשמיים נוספים שנראו ולא נכתבו כראיה: " +
      "'Linear Data in Reports' במדריך Maintenance Management לגרסת 2025 FPS01 ‏(loio " +
      "2807244d6b50403682bfb72dce26e428), שתקצירו מונה 'IW28, IW29, IW58, IW59' מיד לפני 'Notification " +
      "(Multilevel) IW30' בטבלת טרנזקציות הדוחות, כלומר בין דוחות רשימת ההודעות (תווית השורה שלפני IW28 " +
      "אינה נראית בתקציר); 'Selection of Notifications' במדריך Notifications (CS-CM-SN/PM-WOC-MN) לאותה " +
      "גרסה ‏(loio c485c1536ca9b54ce10000000a174cb4): 'You can display the notifications in either a single " +
      "or multi-level list'; 'Extensibility: Maintenance Notification API' ‏(loio " +
      "211d0924bec64fdc89388d4aa82e66ca, ‏2025.001): 'you can extend the OData Service " +
      "API_MAINTNOTIFICATION'; ובהקשר ECC בלבד, רשומת What's New ל-EHP8 ‏(SAP_ERP, ‏6.18.latest, ‏loio " +
      "6b5b1cb694a64bc1886f179b625229d0) 'Maintenance Notification: New Fields in Mass Change', שתקצירה " +
      "נוקב ב-'Notification BAPIs (IWON_NOTIFICATION)' וב-'list in the SAP GUI transaction IW28'; ה-BAdI‏ " +
      "IWON_NOTIFICATION אינו קיים ב-data/exits.ts או ב-data/enhancements.ts ולכן אינו xref. (6) מספר " +
      "ה-KBA‏ 1923267 מופיע רק במחרוזת המקור של רשומת bapi-enrichment, לא אומת ולא נרשם כשדה sapNote/kba. " +
      "(7) סטייה בשם במאגר: function-intel כותב 'Find Maintenance Notifications' (רבים) בעוד כותרת " +
      "האפליקציה הרשמית היא 'Find Maintenance Notification' ‏(F2071); הכותרת ברבים קיימת רשמית רק לווריאנט " +
      "Defense & Security ‏(F4633, ‏loio 7d118fa07a2248c2afb2747625734639). (8) מה שנשאר פתוח: קיום השם " +
      "ב-SE37, קבוצת הפונקציות שלו, סטטוס השחרור שלו ופרמטריו (הקלט 'Filter (type/status/dates/object)' " +
      "וטבלת הפלט NOTIFICATIONS שרשומת function-intel נוקבת בהם אינם מופיעים באף מקור רשמי ואינם נטענים " +
      "כאן); אפשרויות ה-$filter של ה-OData API; מהדורות Cloud לא נבדקו ברשומה זו.",
  },

  /* ------------------------------------- fm:BAPI_ALM_NOTIF_SAVE */
  {
    id: "fm:BAPI_ALM_NOTIF_SAVE",
    aliases: ["BAPI_ALM_NOTIF_SAVE"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "אובייקט ההגירה 'PM - Maintenance notification' בחוברת Data Migration לגרסת S/4HANA On-Premise 2025 " +
               "FPS01 נוקב ב-BAPI_ALM_NOTIF_SAVE בשמו, לצד BAPI_ALM_NOTIF_CREATE, תחת 'APIs/BAPIs' של מודול הפונקציה " +
               "הייעודי להגירה CNV_PE_S4_PM_NOTIF_CREATE ('Function Module: CNV_PE_S4_PM_NOTIF_CREATE APIs/BAPIs " +
               "BAPI_ALM_NOTIF_CREATE BAPI_ALM_NOTIF_SAVE', כלשון הסניפט). חלונות סניפט נוספים של אותו עמוד (loio " +
               "c03f981dd76f4fc7a241f17adc80758b): 'This migration technique transfers data to the target system " +
               "using Application Programming Interfaces (APIs)', 'Create Maintenance Notification Creates the " +
               "maintenance notification in' ו-'Out of Scope Status handling Addresses Change documents Reference " +
               "objects Measurement documents Long texts for DIR object links'. אותו loio מופיע גם בחוברת 'Migration " +
               "Objects for SAP S/4HANA' לגרסת 2021 FPS02 (versionId 2021.002) עם סניפט זהה. הסניפט מונה את שמות " +
               "ה-BAPI בלבד ואינו מתאר פרמטרים או סטטוס שחרור.",
        verificationLevel: "sap_official_verified",
      },
      MAINTNOTIF_OPS_CRUD,
      {
        sourceType: "kba",
        sourceTitle: "3379615 - BAPI_ALM_NOTIF_SAVE doesn't return notification number",
        url: "https://me.sap.com/notes/3379615",
        kba: "3379615",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "סעיף ה-Symptom בתצוגה המקדימה הפומבית של ה-KBA (userapps.support.sap.com, ללא התחברות) קובע: 'When " +
               "you use the Notification BAPI \"BAPI_ALM_NOTIF_CREATE\" to create a notification, BAPI_ALM_NOTIF_SAVE " +
               "and BAPI_TRANSACTION_COMMIT are called as suggested. However, you failed to find out which " +
               "notification number was created.' סעיף Environment מונה 'SAP S/4HANA, on-premise' ו-'SAP S/4HANA " +
               "Cloud Private Edition' לצד SAP ERP, ECC ו-R/3, רשימת המוצרים כוללת 'SAP S/4HANA all versions', " +
               "ומילות המפתח: 'KBA, PM-WOC-MN, Maintenance Notifications, How To'. סעיפי הסיבה והפתרון דורשים " +
               "התחברות S-user ולא נקראו.",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ה-BAPI המועשר של הפרויקט (PM enrichment), רשומת קטלוג הפונקציות, דאטהסט הבלופרינט ופרקטיקת " +
                     "משמעת ה-COMMIT",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת המאגר מתארת את BAPI_ALM_NOTIF_SAVE כשמירת ההודעה למסד הנתונים והקצאת המספר הסופי: אובייקט BOR‏ " +
               "BUS2038, פרמטרים 'IMP NUMBER · TOGETHER_WITH_ORDER · EXP NOTIFHEADER · TAB RETURN', סטטוס 'Released " +
               "· RFC · created 4.6 (110)', requiresCommit: yes, תמיכה ב-ECC וב-S/4HANA On-Premise: yes, Public " +
               "Cloud: unknown, verified-docs מ-2026-07-14, ורצף הכתיבה CREATE, אחר כך DATA_ADD / DATA_MODIFY / " +
               "DATA_DELETE, אחר כך PUTINPROGRESS / CHANGEUSRSTAT / CLOSE, אחר כך SAVE ולבסוף " +
               "BAPI_TRANSACTION_COMMIT. רשומת הקטלוג (function-intel) רושמת קלט NUMBER (מספר זמני) ופלט NOTIFHEADER " +
               "(מספר סופי) עם 'חובה אחריו BAPI_TRANSACTION_COMMIT', והבלופרינט רושם את ה-BAPI תחת QMEL כ'שמירת " +
               "ההודעה'. פרקטיקת bapi-commit-discipline קובעת שהמספר הסופי של ההודעה נוצר רק ב-SAVE.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_SAVE; data/function-intel.ts#BAPI_ALM_NOTIF_SAVE; " +
                 "data/sapData.pm.ts#QMEL; data/best-practices/pm.ts#bapi-commit-discipline",
      },
    ],
    status: {
      status: "released_api_available",
      he: "ה-BAPI לשמירת הודעת תחזוקת מפעל והקצאת המספר הסופי נקוב בשמו ב-S/4HANA On-Premise 2025 FPS01 תחת " +
          "'APIs/BAPIs' של אובייקט ההגירה 'PM - Maintenance notification', יחד עם BAPI_ALM_NOTIF_CREATE, לצד " +
          "מודול הפונקציה הייעודי להגירה CNV_PE_S4_PM_NOTIF_CREATE (כלשון הסניפט). קיימת חלופת API רשמית " +
          "משוחררת: OData‏ API_MAINTNOTIFICATION עם פעולות יצירה (POST), קריאה (GET) ועדכון (PATCH) המתועדות " +
          "ל-2025 FPS01; שלב שמירה נפרד אינו מופיע בסניפט הפעולות, ולכן הרצף CREATE, SAVE, COMMIT הוא מאפיין של " +
          "ממשק ה-BAPI (לפי נתוני המאגר ולפי סעיף ה-Symptom של KBA 3379615). לא אותר תיעוד רשמי על הוצאה משימוש " +
          "או החלפה של ה-BAPI, ולכן אין יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: MAINTNOTIF_OPS_CRUD,
      recommendedAction:
        "באינטגרציות RFC קיימות לשמור על הרצף: BAPI_ALM_NOTIF_CREATE (ולפי הצורך DATA_ADD או DATA_MODIFY), " +
        "אחר כך BAPI_ALM_NOTIF_SAVE עם המספר הזמני שהוחזר, בדיקת טבלת RETURN, ואז BAPI_TRANSACTION_COMMIT " +
        "(WAIT='X' כשקוראים את ההודעה מיד) על אותו חיבור RFC; לקרוא את המספר הסופי מהפרמטר NOTIFHEADER המוחזר " +
        "מ-SAVE, ואם אינו מוחזר לפנות ל-KBA 3379615 (דורש S-user). לאמת ב-SE37 במערכת היעד את הפרמטר " +
        "TOGETHER_WITH_ORDER ואת סטטוס השחרור. לאינטגרציות חדשות להעדיף את OData‏ API_MAINTNOTIFICATION (POST " +
        "/ PATCH) ולאמת ישויות ופרמטרים מול ה-Business Accelerator Hub (דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_CREATE",
      "fm:BAPI_ALM_NOTIF_DATA_ADD",
      "fm:BAPI_ALM_NOTIF_DATA_MODIFY",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:BAPI_ALM_NOTIF_CLOSE",
      "fm:BAPI_ALM_NOTIF_PUTINPROGRESS",
      "fm:BAPI_ALM_NOTIF_CHANGEUSRSTAT",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fm:BAPI_TRANSACTION_ROLLBACK",
      "tx:IW21",
      "tx:IW22",
      "tx:IW23",
      "table:QMEL",
      "table:QMFE",
      "cds:I_MaintenanceNotification",
      "fiori:F1511",
      "fiori:F4604",
      "enh:badi:NOTIF_EVENT_SAVE",
      "enh:exit:QQMA0001",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "מה שאומת: שם ה-BAPI בעמוד רשמי אחד בשירות החיפוש של help.sap.com (Data Migration, אובייקט 'PM - " +
      "Maintenance notification', loio c03f981dd76f4fc7a241f17adc80758b, 2025.001), שאותר גם בגרסת 2021 " +
      "FPS02 (חוברת 'Migration Objects for SAP S/4HANA', versionId 2021.002) עם סניפט זהה; שאילתת אותו שם " +
      "עם version=2020.latest, 2022.latest ו-2023.latest החזירה 0 רשומות (ממצא תחום-חיפוש, לא היעדר). " +
      "שאילתת השם במוצר SAP_ERP החזירה 7 עמודי BAPI כלליים ללא סניפט (ספירה מיום הביקורת 2026-09-21; המדד " +
      "משתנה) ואף אחד מהם אינו נוקב בשם; במוצר SAP_S4HANA_CLOUD: 0 רשומות, ולכן זמינות ב-Public Cloud לא " +
      "מאומתת (cloudSupport: unknown גם במאגר). גופי העמודים ב-help.sap.com הם מעטפת JavaScript (1160 בתים " +
      "ב-curl) ולא נקראו; כל טענה תחומה בכותרת ובסניפט. ה-KBA‏ 3379615 נקרא מדף התצוגה המקדימה הפומבי " +
      "(userapps.support.sap.com, ללא התחברות): כותרת, Symptom, Environment, Product ו-Keywords; סעיפי " +
      "הסיבה והפתרון לא נקראו, ולכן אופן החזרת המספר הסופי (NOTIFHEADER) לא אומת רשמית ונשען על המאגר; " +
      "כתובת me.sap.com/notes/3379615 עצמה דורשת S-user. KBA נוסף שאותר בחיפוש מוגבל-דומיין: 2541226 " +
      "'Phase/Status inconsistency when using Notification BAPi's', שסעיף ה-Symptom הפומבי שלו עוסק " +
      "ב-BAPI_ALM_NOTIF_PUTINPROGRESS (אי-התאמה בין QMEL-PHASE לסטטוס המערכת) ומילות המפתח שלו כוללות " +
      "BAPI_ALM_NOTIF_SAVE; לא צורף כראיה כי גופו לא נקרא. חיפוש מוגבל ל-api.sap.com החזיר את הכותרת " +
      "'Overview | Maintenance Notification' בכתובת /api/API_MAINTNOTIFICATION/overview (שם ה-API בלבד; " +
      "מעטפת JavaScript). סטטוס Released, קבוצת הפונקציות IWOPM, הפרמטר TOGETHER_WITH_ORDER ורישום BOR‏ " +
      "BUS2038 מגיעים מנתוני הפרויקט בלבד (verified-docs מ-2026-07-14 ללא URL) ולא נבדקו במערכת חיה; חיבור " +
      "sc4sap MCP נכשל בסשן. ה-OData API אינו מוצג באף מקור רשמי כיורש של ה-BAPI, ולכן הסטטוס הוא 'קיים API " +
      "משוחרר' ולא 'הוחלף'; גרסת השחרור של ה-API (S/4HANA 2021) מתועדת ברשומת fm:BAPI_ALM_NOTIF_CREATE ולא " +
      "הוכפלה כאן. הסטטוס הנגזר במאגר (unchanged, מאומת מול נתוני הפרויקט, bapi-registry) אינו סותר את " +
      "הממצאים. ניואנס מאגר: data/bapi-enrichment.pm.ts מציין SAP KBA 1923267 כמקור ל'save/commit contract' " +
      "ללא URL; המספר לא אומת בסשן ולא הוזן בשדה kba. שדה reviewer אינו נכתב לפי מוסכמת הבית (אף קובץ " +
      "overlay אינו נושא אותו).",
  },

  /* --------------------------------- fm:BAPI_ALM_NOTIF_TASK_ADD */
  {
    id: "fm:BAPI_ALM_NOTIF_TASK_ADD",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"BAPI_ALM_NOTIF_TASK_ADD\" (SAP_S4HANA_ON-PREMISE, SAP_ERP), " +
                     "\"BAPI_ALM_NOTIF_DATA_ADD\" (SAP_S4HANA_ON-PREMISE, SAP_ERP), \"maintenance notification tasks BAPI " +
                     "NOTIFTASK add task\", \"BUS2038 maintenance notification BAPI\"",
        product: "SAP S/4HANA / SAP ERP",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "ממצא שלילי תחום-חיפוש: שאילתת השם המדויק BAPI_ALM_NOTIF_TASK_ADD בשירות החיפוש של SAP Help החזירה " +
               "ב-2026-09-21 11 רשומות בסקופ SAP S/4HANA On-Premise (חוברות Convergent Invoicing ו-SAP S/4HANA " +
               "Insurance for reinsurance management) ו-13 רשומות בסקופ SAP ERP (חוברות BAPI כלליות של " +
               "Cross-Application Components, Transaction Manager, SAP for Insurance ועוד; בהרצה חוזרת ב-2026-09-22 " +
               "הוחזרו 15 רשומות מאותו סוג), כולן עם תקציר ריק ואף אחת אינה נוקבת בשם בכותרתה. שאילתת השם " +
               "BAPI_ALM_NOTIF_DATA_ADD, שרישום ההעשרה של הפרויקט מפנה אליו כחלופה, החזירה 2 רשומות ב-On-Premise " +
               "(Social Media Integration 1709, Download of Characteristic Data Using BAPIs) ו-11 רשומות ב-SAP ERP, " +
               "אף אחת אינה נוקבת בשם. השאילתות 'maintenance notification tasks BAPI NOTIFTASK add task' ו-'BUS2038 " +
               "maintenance notification BAPI' (21 רשומות כל אחת) לא החזירו עמוד המתעד BAPI להוספת משימות להודעת " +
               "תחזוקה. שתי הרצות WebSearch מוגבלות ל-help.sap.com / api.sap.com / " +
               "fioriappslibrary.hana.ondemand.com / fal.cloud.sap לא החזירו עמוד הנוקב באחד משני השמות. הממצא תחום " +
               "לכותרות ולתקצירים של רשומות החיפוש ואינו אמירה שהאובייקט אינו קיים במערכת.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Maintenance Notifications (PM-WOC-MN) | Data Archiving in Plant Maintenance and Customer " +
                     "Service (PM/CS)",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6156bc8f0d324ad384cd1641a5145711/60adb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד הארכוב של הודעות אחזקה בגרסת 2025 FPS01 קובע בתקציר: 'Archiving object PM_QMEL with which you " +
               "can archive maintenance notifications in the Plant Maintenance component' ו-'The archiving object " +
               "PM_QMEL for maintenance notifications is composed of the following tables: Table Name Contents QMEL " +
               "Notification header data QMFE Items QMMA Activities QMSM', והתקציר נקטע מיד אחרי QMSM. עמוד האח " +
               "לשירות, 'Archiving of Service Notifications (PM-SMA-SC)' (loio 63adb6531de6b64ce10000000a174cb4, " +
               "2025.001), מציג את אותה רשימה עבור SM_QMEL עם הרצף 'QMMA Activities QMSM Tasks'. כלומר QMSM היא טבלת " +
               "המשימות של ההודעה בגרסה הנוכחית של תחזוקת מפעל; העמוד אינו נוקב ב-BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/c03f981dd76f4fc7a241f17adc80758b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד אובייקט ההגירה של הודעת האחזקה בגרסת 2025 FPS01 מציג בתקציר את הרצף 'Function Module: " +
               "CNV_PE_S4_PM_NOTIF_CREATE APIs/BAPIs BAPI_ALM_NOTIF_CREATE BAPI_ALM_NOTIF_SAVE Function Module: " +
               "CNV_PE_S4_CA_DIR_OBJ_LINKS APIs/BAPIs BAPI_DOCUMENT_CHANGE2', כלומר ברצף שהוחזר נקובים תחת " +
               "APIs/BAPIs של מודול ההגירה של ההודעה שני שמות, ו-BAPI_ALM_NOTIF_TASK_ADD אינו ביניהם. בהרצה אחרת " +
               "באותו יום החזיר אותו עמוד את הרצף 'Maintenance notifications with OSNO or OSTS statuses at the " +
               "header level and TSOS status at the task level' ואת 'In Scope The following data is set for " +
               "migration: Notifications header data Items Items/causes Items/tasks', כלומר משימות ההודעה נכללות " +
               "בהיקף ההגירה של האובייקט. התקצירים מוגשים עם השמטות, ולכן נטען כאן רק מה שהופיע ברצף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Realization (PM-WOC-MN / Completing a Task) | PM/CS - Plant Maintenance and Customer " +
                     "Service: Workflow Scenarios",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/805892ef876c41ad886c213b03c7194c/8266b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד תרחיש ה-Workflow להשלמת משימה בהודעת אחזקה בגרסת 2025 FPS01 קובע בתקציר: 'In this standard " +
               "task, a task is completed in a maintenance notification' ו-'Object type QM/SM (task) A task " +
               "corresponds to object type QMSM. You can find the attributes, methods, and events for object type " +
               "QMSM in the Business Object Repository of the SAP system'. כלומר משימת ההודעה היא אובייקט BOR נפרד " +
               "מסוג QMSM, לצד BUS2038 של ההודעה עצמה ('BUS2038 refers to notifications while QMSM refers to tasks', " +
               "עמוד Entering Responsibilities (Workflow Connection), loio 2a85c1536ca9b54ce10000000a174cb4, " +
               "2025.001). שמות המתודות של אובייקט QMSM אינם מופיעים בתקציר, ולכן לא ניתן לגזור מכאן שם BAPI להוספת " +
               "משימה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Operations for Maintenance Notifications | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/061b31b90a88432fad5e710aa9cd175c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "טבלת הפעולות של API_MAINTNOTIFICATION בגרסת 2025 FPS01 מונה בתקצירים שהוחזרו: 'Read Maintenance " +
               "Notification GET', 'Create Maintenance Notification' (POST על MaintenanceNotification), 'Create " +
               "Notification Item Activity POST' על MaintNotificationItemActivity, 'Update Notification Item " +
               "Activity PATCH', 'Create Notification Item Cause POST' על MaintNotificationItemCause ו-'Update " +
               "Notification Item Cause PATCH'; עדכון ההודעה עצמה (PATCH) מתועד בעמוד נפרד באותה חוברת, 'Update " +
               "Maintenance Notification' (loio 8bd7929a37cb4107acc617fcc4ea4dd9, 2025.001). עמודים נפרדים באותה " +
               "חוברת מתעדים Create Notification Item (loio abf44d7da8114c3a9b958cf9f8366fce, 2025.001), Create " +
               "Notification Partner ו-Create Notification Item Cause (2023.latest) ו-Create Notification Failure " +
               "Effect (2023.latest). באף רשומה מרשומות החוברת שהוחזרו בשלוש שאילתות ממוקדות לא הופיעה פעולה או ישות " +
               "למשימות ההודעה (Notification Task); רשומת What's New 2021 FPS01 'Create, Update, or Delete Task list " +
               "Using Maintenance Notification API' (loio 33364ab200b24a5bb1c413fb04a24b21) עוסקת לפי לשונה ב-task " +
               "list (רשימת משימות אחזקה) ולא במשימת ההודעה, וההבחנה לא אומתה מגוף העמוד. גוף עמוד הפעולות לא נקרא, " +
               "ולכן כיסוי משימות ההודעה ב-OData נשאר לא מוכרע.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רישום ההעשרה של אובייקטי ה-BAPI של תחזוקת מפעל בפרויקט (תיקון שם)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת ההעשרה מסמנת את השם BAPI_ALM_NOTIF_TASK_ADD כ-verificationStatus 'invalid-name' ברמת ביטחון " +
               "גבוהה, עם התיאור 'אינו FM סטנדרטי. להוספת משימות השתמש ב-BAPI_ALM_NOTIF_DATA_ADD (טבלת NOTIFTASK)' " +
               "והערת QA 'אימות: לא נמצא ב-SE37 / מראות מטא-דאטה. אין לפרסם כשם תקין', ומפנה " +
               "ל-BAPI_ALM_NOTIF_TASK_COMPLETE ול-BAPI_ALM_NOTIF_TASK_RELEASE כאובייקטים קשורים (שני שמות שאינם " +
               "ביקום המזהים של הפרויקט ולא אומתו). מקור האימות הרשום הוא מחרוזת כללית של הקובץ ('SAP Help (BUS2038 " +
               "· S/4HANA On-Premise) + SE37 metadata (fn group IWOPM) · SAP KBA 1923267', תאריך 2026-07-14) ולא " +
               "קישור לעמוד SAP; בדיקת SE37 עצמה לא בוצעה בסשן זה. רישום אובייקטי הפונקציה (lib/bapi-registry.ts) " +
               "גוזר מסימון זה יציבות 'Obsolete' ותמיכת S/4HANA On-Premise 'לא צוין'.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_ALM_NOTIF_TASK_ADD; lib/bapi-registry.ts#deriveStability",
        conflictingEvidence: [
          {
            sourceType: "repository",
            sourceTitle: "קטלוג הפונקציות של הפרויקט, חוברת ההגירה של תחזוקת מפעל ורשומת האימות table:QMSM",
            product: "SAP ECC 6.0 / SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE21,
            claim: "שלוש רשומות מאגר אחרות מציגות את אותו שם כאובייקט קיים: קטלוג הפונקציות מתאר 'הוספת משימה (Task) " +
                   "להודעת אחזקה', מונה פרמטרים NUMBER (import, חובה), NOTIFTASK (table) ו-RETURN, קובע 'זמין ב-ECC.' " +
                   "ו'זמין ב-S/4HANA.' ללא סימון inferred, ומשייך ל-IW22, לטבלה QMSM ולתהליך PM-6; בחוברת ההגירה השם " +
                   "מופיע ברשימת הפונקציות של הטבלה PM:QMSM עם התיאור 'הוספת משימה', לצד NOTIF_TASK_READ; ורשומת האימות " +
                   "table:QMSM (data/verification/tables.ts) נוקבת בו בראיית המאגר שלה ומפנה אליו ב-xrefs. BASELINE.md " +
                   "מונה את השם בין 18 המזהים המסומנים invalid-name ובין 13 מהם שקטלוג הפונקציות סותר. אף אחת מהרשומות " +
                   "אינה נסמכת על מקור SAP רשמי.",
            verificationLevel: "repository_verified",
            repoRef: "data/function-intel.ts#BAPI_ALM_NOTIF_TASK_ADD; data/sapData.pm.ts#PM:QMSM; " +
                     "data/verification/tables.ts#table:QMSM; audit/s4-enrichment/BASELINE.md",
          },
        ],
      },
    ],
    status: {
      status: "verification_required",
      he: "השם BAPI_ALM_NOTIF_TASK_ADD לא אותר באף רשומה רשמית של SAP במעבר זה, לא בסקופ SAP S/4HANA On-Premise " +
          "ולא בסקופ SAP ERP, וגם השם החלופי שהמאגר מפנה אליו, BAPI_ALM_NOTIF_DATA_ADD, אינו נקוב באף רשומה. " +
          "התיעוד הרשמי של 2025 FPS01 קובע שמשימות ההודעה נשמרות בטבלה QMSM (אובייקט הארכוב PM_QMEL) ושהמשימה " +
          "היא אובייקט BOR מסוג QMSM לצד BUS2038 של ההודעה, ובתקציר חוברת ההגירה נקובים תחת APIs/BAPIs של " +
          "ההודעה BAPI_ALM_NOTIF_CREATE ו-BAPI_ALM_NOTIF_SAVE ולא השם הזה. ב-OData API_MAINTNOTIFICATION לא " +
          "אותרה פעולה למשימות ההודעה. נתוני הפרויקט עצמם חלוקים על קיום האובייקט: רישום ההעשרה מסמן את השם כלא " +
          "תקני, בעוד קטלוג הפונקציות, חוברת ההגירה ורשומת table:QMSM מציגים אותו כאובייקט זמין ב-S/4HANA. לכן " +
          "לא נקבע כאן סטטוס S/4HANA לאובייקט: קיומו טרם אומת, היעדר רשומה רשמית הוא ממצא תחום-חיפוש ולא אמירה " +
          "רשמית על אי-זמינות, ולא נקבע יורש.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לאמת ב-SE37 במערכת ECC ובמערכת S/4HANA היעד אם קיים אובייקט בשם BAPI_ALM_NOTIF_TASK_ADD, ובאותה " +
        "בדיקה גם אם BAPI_ALM_NOTIF_DATA_ADD קיים ונושא טבלת NOTIFTASK, לפני כל הסתמכות על אחד השמות בקוד, " +
        "בממשק או בחומר הדרכה. עד אז להוסיף משימות להודעת תחזוקה בתרחישי RFC רק ברצף שהמאגר מתעד למשפחת " +
        "BUS2038 (BAPI_ALM_NOTIF_CREATE או הודעה קיימת, אחר כך BAPI_ALM_NOTIF_DATA_ADD עם טבלת NOTIFTASK, אחר " +
        "כך BAPI_ALM_NOTIF_SAVE ואז BAPI_TRANSACTION_COMMIT על אותו חיבור), ולאמת ב-BAPI Explorer את סטטוס " +
        "השחרור. לאינטגרציות חדשות להשתמש ב-OData API_MAINTNOTIFICATION לכותרת, לפריטים, לסיבות, לפעילויות " +
        "ולשותפים של ההודעה, ולאמת מול תיעוד ה-API בגרסת היעד או מול ה-Business Accelerator Hub אם קיימת ישות " +
        "למשימות ההודעה לפני שמתכננים עליה. לא להציג את השם בקטלוג כ-BAPI משוחרר ולא להציג את רשימת הפרמטרים " +
        "שבקטלוג הפונקציות כעובדה מאומתת עד לבדיקת SE37, וליישר את רשומת table:QMSM ואת חוברת ההגירה עם תוצאת " +
        "הבדיקה.",
    },
    xrefs: [
      "fm:BAPI_ALM_NOTIF_DATA_ADD",
      "fm:BAPI_ALM_NOTIF_DATA_MODIFY",
      "fm:BAPI_ALM_NOTIF_CREATE",
      "fm:BAPI_ALM_NOTIF_SAVE",
      "fm:BAPI_ALM_NOTIF_GET_DETAIL",
      "fm:NOTIF_TASK_READ",
      "fm:BAPI_TRANSACTION_COMMIT",
      "table:QMSM",
      "table:QMEL",
      "tx:IW22",
      "tx:IW52",
      "tx:IW66",
      "cds:I_MaintenanceNotification",
      "fiori:F4604",
      "enh:badi:NOTIF_EVENT_SAVE",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "מה נבדק בפועל: עשר שאילתות בשירות החיפוש של help.sap.com דרך scripts/sap-help-search.mjs " +
      "ב-2026-09-21 ('BAPI_ALM_NOTIF_TASK_ADD' ו-'BAPI_ALM_NOTIF_DATA_ADD', כל אחת בסקופ " +
      "SAP_S4HANA_ON-PREMISE ובסקופ SAP_ERP; 'maintenance notification task API_MAINTNOTIFICATION'; 'Create " +
      "Notification Task API_MAINTNOTIFICATION MaintenanceNotificationTask'; 'Read Notification Task " +
      "maintenance notification OData'; 'PM_QMEL archiving maintenance notifications QMSM'; 'Maintenance " +
      "Notification Task What's New'; 'BUS2038 maintenance notification BAPI'; 'maintenance notification " +
      "tasks BAPI NOTIFTASK add task'; 'I_MaintNotificationTaskData Maintenance Notification Task Data' " +
      "בסינון 2025.001; 'Quality Notification Task QualityNotificationTask API'; ושאילתה ממוקדת לתקציר " +
      "APIs/BAPIs של עמוד ההגירה בסינון 2025.001), לצד שתי הרצות WebSearch מוגבלות ל-help.sap.com / " +
      "api.sap.com / fioriappslibrary.hana.ondemand.com / fal.cloud.sap. סריקה של כל רשומות ה-JSON שהוחזרו " +
      "על המחרוזות 'TASK_ADD' ו-'NOTIF_DATA_ADD' העלתה אפס התאמות בכותרות ובתקצירים. ארבע הכתובות שברשומה " +
      "נבדקו ב-2026-09-21 והחזירו HTTP 200; ה-loio וה-versionId הועתקו מרשומות ה-JSON. גופי עמודי " +
      "help.sap.com לא נקראו (מעטפת JavaScript), ולכן כל טענה תחומה בכותרת ובתקציר של רשומת החיפוש; ספירות " +
      "התוצאות אינן יציבות בין הרצות ונרשמות כמדידה של אותו יום בלבד. הסטטוס הנגזר כיום באפליקציה נמדד בסשן " +
      "זה דרך fromFuncRegistry: 'לא רלוונטי' (not_applicable) ברמת 'מאומת מול נתוני הפרויקט', עם ההסבר 'לפי " +
      "רישום אובייקטי הפונקציה של הפרויקט: השם אינו אובייקט SAP תקני; תמיכה ב-S/4HANA On-Premise: לא צוין'; " +
      "רשומה זו מחליפה אותו ב'נדרש אימות נוסף' ומורידה את דרגת האימות ל'מקורות סותרים', משום שהסתירה בין " +
      "רשומות המאגר נוגעת לשאלת קיום האובייקט, שהיא עצם נושא הרשומה, ולכן נרשמת כ-conflictingEvidence ולא " +
      "רק בהערות (אותו טיפול שניתן ל-fm:BAPI_MEASUREMENTDOCUM_CREATE). BASELINE.md מתעד את אותה תופעה " +
      "במחלקה שלמה של 18 מזהים invalid-name, ובהם גם fm:BAPI_ALM_NOTIF_LIST_FILTER מאותה משפחה. עמודים " +
      "רשמיים נוספים שנצפו ולא צורפו כראיות: 'Maintenance Notification | Maintenance Management' (loio " +
      "78c09d53839cca11e10000000a44176d, 2025.001), 'Task Data You can enter tasks, set the status for one " +
      "or more tasks, and remove tasks' על SAP Web UI for Plant Maintenance; 'Maintenance Notification Task " +
      "Data | Virtual Data Model and CDS Views' (loio 161e8aa6a3d14a1aba33a9e8f490b29b, 2023.latest), תצוגת " +
      "CDS‏ I_MaintNotificationTaskData במעמד Released עם 'It is 1 when the status of the maintenance " +
      "notification task is TSOS (Outstanding) or TSRL (Released)', שלא הוחזרה בסינון 2025.001 ואינה ביקום " +
      "ה-cds של הפרויקט ולכן אינה xref; 'Location Analysis Cube' (loio 9cebb3d3cfd449dab1c434cf247f5ba3, " +
      "2025.001) עם המדד NumberOfMaintNotifTasks; 'Operations for Quality Notifications' ו-'Quality " +
      "Notification Task' במדריך APIs for Quality Management (loio 9d9f91a2b3954ec48d1a12d54a0909a7 " +
      "ו-471cda8852a04d75bfe1ddb2ebed81af, 2025.001), שבהם קיימת פעולת 'Read Quality Notification Task GET' " +
      "וישות QualityNotificationTask להודעות איכות בלבד, לא להודעות תחזוקה; ו-'Task Definition: Maintenance " +
      "Notification' (App ID F3359, Environment, Health, and Safety, 2025.001), יישום ניהול אירועי EHS ולא " +
      "ממשק למשימות הודעת תחזוקה, ואינו בקטלוג ה-Fiori של הפרויקט. מה שלא אומת: קיום האובייקט ב-SE37 (חיבור " +
      "sc4sap MCP נכשל בסשן, לא בוצעה בדיקה במערכת חיה); רשימת הפרמטרים שבקטלוג הפונקציות (NUMBER, " +
      "NOTIFTASK, RETURN) ומבנה טבלת NOTIFTASK; שיוך ל-BOR ולקבוצת פונקציות; סטטוס שחרור; זמינות במהדורות " +
      "Cloud; SAP KBA 1923267 מופיע רק במחרוזת המקור הכללית של קובץ ההעשרה ולא צורף. לא נטען יורש: הסטטוס " +
      "אינו replaced, deprecated או not_available, ההפניה ל-BAPI_ALM_NOTIF_DATA_ADD היא של המאגר בלבד, ושם " +
      "זה עצמו אינו נקוב באף רשומה רשמית. ה-xref אל fm:BAPI_ALM_NOTIF_DATA_ADD ואל fm:NOTIF_TASK_READ הם " +
      "עוגני ניווט לרשומות שכנות שתיעודן במאגר בלבד; BAPI_ALM_NOTIF_TASK_COMPLETE " +
      "ו-BAPI_ALM_NOTIF_TASK_RELEASE אינם ביקום המזהים ולכן אינם xrefs.",
  },

  /* ----------------------------- fm:BAPI_ALM_ORDERHEAD_GET_LIST */
  {
    id: "fm:BAPI_ALM_ORDERHEAD_GET_LIST",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Ranges Table - SAP Documentation | SAP NetWeaver Gateway (help.sap.com/doc/saphelp_ssb)",
        url:
          "https://help.sap.com/doc/saphelp_ssb/1.0/en-US/b5/525672853e47d08cf123247955eb86/content.htm?no_cache=true",
        product: "SAP NetWeaver Gateway",
        edition: "ecc",
        release: "saphelp_ssb 1.0",
        accessedAt: DATE21,
        claim: "עמוד התיעוד של SAP NetWeaver Gateway (ערכת התיעוד saphelp_ssb לפי נתיב הכתובת; כותרת העמוד 'Ranges " +
               "Table - SAP Documentation'; העמוד מפנה תחת More Information למסמך 'SAP NetWeaver Gateway Generators " +
               "Cookbook' ולנושא 'Mapping the Query Operation'; שם המדריך האב אינו כתוב ב-HTML הסטטי) נקרא במלואו " +
               "כ-HTML סטטי (20,557 בתים, לא מעטפת JavaScript) ונוקב בשם ה-BAPI במפורש בדוגמה שלו: 'Using an example " +
               "based on the BOR object, MaintenanceOrderBAPI, you can map the method OrderHeadGetList to the query " +
               "operation for the Data Model. The method, OrderHeadGetList, is implemented by the BAPI " +
               "BAPI_ALM_ORDERHEAD_GET_LIST, which contains an input range table ItRanges. This is a generic range " +
               "table which can hold selection for various fields.' בהמשך: 'to support filtering using Order Enter " +
               "Date, first obtain details about the method from the documentation for the specific BAPI. According " +
               "to the documentation, to support such filtering, the constant value, OPTIONS_FOR_ENTER_DATE should " +
               "be assigned to the field, FIELD_NAME in the table, ItRanges', והמחולל זיהה בטבלת הטווחים את השדות " +
               "'Sign and Option' ואת 'LOW_VALUE and HIGH_VALUE'. העמוד מעיד על קיום ה-BAPI, על שיוכו למתודת ה-BOR " +
               "OrderHeadGetList ועל טבלת טווחים גנרית כקלט; זהו תיעוד NetWeaver Gateway מתקופת Business Suite, והוא " +
               "אינו אומר דבר על S/4HANA. שמות הפרמטרים מצוטטים בכתיב שבעמוד (ItRanges בכתיב ה-Gateway); שם פרמטר " +
               "ה-ABAP בכתיב הטכני אינו מופיע בעמוד, ואף פרמטר פלט (כגון ET_HEADER) אינו נזכר בו. הטקסט חולץ מ-HTML, " +
               "ולכן הרווחים סביב סימני הפיסוק בציטוטים נורמלו.",
        verificationLevel: "sap_official_verified",
      },
      ALM_ORDER_READ_ALL_V2,
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
                     "Edition 2025 - Feature Pack Stack 1 · item 4.1.4 S4TWL - Batch Input for Enterprise Asset Management " +
                     "(EAM), pp. 77-78",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "מסמך רשימת הפישוט הרשמית SIMPL_OP2025.pdf הורד מ-help.sap.com (10.6MB, 1,514 עמודים, Document " +
               "Version 1.36) והטקסט חולץ ונקרא (pdftotext -layout: 70,529 שורות; pdftotext רגיל: 85,712 שורות): " +
               "המחרוזת BAPI_ALM_ORDERHEAD_GET_LIST אינה מופיעה ולו פעם אחת בשתי ההפקות, וגם המחרוזת " +
               "API_MAINTENANCEORDER אינה מופיעה; לפיכך אין ברשימת הפישוט של 2025 FPS01 פריט הנוקב ב-BAPI זה (ממצא " +
               "תחום לטקסט המחולץ). ה-BAPI היחיד של פקודות אחזקה שהמסמך נוקב בו הוא BAPI_ALM_ORDER_MAINTAIN, בפריט " +
               "4.1.4 S4TWL - Batch Input for Enterprise Asset Management (EAM) (Application Component: PM, עמ' 77 " +
               "עד 78): 'Plant Maintenance offers a set of API´s which are supporting the creation / change of Plant " +
               "Maintenance data like: ... Maintenance Order • BAPI_ALM_ORDER_MAINTAIN', ובהמלצה: 'Recommendation " +
               "within EAM is to use the API´s wherever possible'. זו רשימת ממשקי יצירה ושינוי, ו-BAPI הקריאה לרשימת " +
               "כותרות אינו נמנה בה; הפריט עצמו עוסק ב-Batch Input (טרנזקציית IBIP) ולא ב-BAPI זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת סריקת ה-BAPI של הפרויקט, לצד רשומת ההעשרה של PM ורשומת הקטלוג הפונקציונלי",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת הסריקה (data/bapi-enrichment.sweep.ts, שורה 93, תבנית verified) מתארת BAPI קריאה בלבד עם RFC " +
               "לשליפת רשימת כותרות פקודות אחזקה לפי קריטריוני בחירה, עם סיכום פרמטרים 'IN: selection ranges " +
               "(plant/status/dates) · OUT: order-header list, RETURN.', verificationStatus verified-docs, תמיכת ECC " +
               "ותמיכת S/4HANA On-Premise 'yes', תמיכת Cloud 'unknown', יציבות Released, ומקור אימות מוצהר 'SAP Help " +
               "Portal' בתאריך 2026-07-15. רשומת ההעשרה של PM (data/bapi-enrichment.pm.ts, שורה 232, תבנית g) " +
               "מוסיפה: פעולת Read ללא SAVE או COMMIT, קטגוריה Execution, תהליך Maintenance Order, אובייקט BOR " +
               "BUS2007, טרנזקציות IW38 ו-IW39, טבלאות AUFK ו-AFIH, אובייקט קשור BAPI_ALM_ORDER_GET_DETAIL, סיכום " +
               "'IMP selection · TAB ET_HEADER, RETURN', releasedStatus 'Released · RFC', ומקור אימות 'SE37 metadata " +
               "mirror (sapdatasheet.org) + SAP Community' (ערוץ Tier-3 לפי MANIFEST). רשומת הקטלוג הפונקציונלי " +
               "(data/function-intel.ts, שורה 194) מתארת קלט 'Selection ranges' (import), פלט ET_HEADER ו-RETURN, " +
               "וכותבת בשדה ה-S/4 'זמין ב-S/4HANA' ללא חלופת OData; היא מפנה ל-IW38, IW39, AUFK ולתהליך PM-7. דאטהסט " +
               "ה-blueprint (data/sapData.pm.ts) מונה את ה-BAPI פעמיים תחת נושאי AUFK כשליפת רשימת פקודות עבודה. " +
               "שלוש הרשומות מסכימות על התרחיש; אף אחת אינה נשענת על עמוד רשמי שנמצא בהרצה זו לגבי S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/bapi-enrichment.sweep.ts#BAPI_ALM_ORDERHEAD_GET_LIST",
      },
    ],
    status: {
      status: "released_api_available",
      he: "BAPI_ALM_ORDERHEAD_GET_LIST נזכר בתיעוד SAP רשמי רק בעמוד 'Ranges Table' של תיעוד SAP NetWeaver " +
          "Gateway (saphelp_ssb), המעיד על קיומו, על מתודת ה-BOR OrderHeadGetList ועל טבלת טווחים גנרית כקלט; " +
          "אף רשומת help.sap.com למהדורת S/4HANA On-Premise שנסרקה אינה נוקבת בשמו, ורשימת הפישוט 2025 FPS01 " +
          "שנקראה במלואה אינה נוקבת בו, כך שזמינותו ב-S/4HANA נשענת על רובד המאגר בלבד (verified-docs, " +
          "s4OnPremSupport yes; מקור משפחת ה-PM הוא מראת SE37). במקביל קיים ממשק OData רשמי לאותו תרחיש של " +
          "שליפת רשימת כותרות פקודות אחזקה לפי קריטריונים: הפעולה 'Read All Maintenance Orders (Version 2)' " +
          "במדריך APIs for Maintenance Management לגרסת 2025 FPS01, שבשיטת GET מחזירה 'the header details of " +
          "all maintenance orders that correspond to your filter settings' תחת שירות Maintenance Order (Version " +
          "2) בנתיב API_MAINTENANCEORDER;v=2 (שם ה-Hub API_MAINTENANCEORDER_0002); ישויות גרסה 1 של אותו שירות " +
          "מסומנות '(Deprecated)' עם המלצה לעבור לגרסה 2. זו טענת חלופה משוחררת ולא טענת החלפה: אין מקור רשמי " +
          "שנסרק המכריז על ה-BAPI כמוחלף, ולכן לא נרשם יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: ALM_ORDER_READ_ALL_V2,
      recommendedAction:
        "לאמת תחילה במערכת היעד, ב-SE37 או ב-BAPI Explorer ובתיעוד ה-BAPI עצמו, את שם טבלת הטווחים ואת ערכי " +
        "FIELD_NAME הנתמכים (העמוד הרשמי מזכיר רק את OPTIONS_FOR_ENTER_DATE כדוגמה) ואת טבלת הפלט של הכותרות " +
        "(ET_HEADER מופיע ברשומות המאגר בלבד); לאחר האימות להמשיך להשתמש ב-BAPI בממשקי RFC ובדוחות קיימים " +
        "לשליפת רשימות כותרות, ולהצר טווחי בחירה רחבים בהתאם להערת ה-QA שברשומת המאגר. לאינטגרציות חדשות, " +
        "לתרחישי OData או REST ולהרחבות Fiori להעדיף את API_MAINTENANCEORDER בגרסה 2 (;v=2) עם הפעולה Read " +
        "All Maintenance Orders (Version 2) וסינון $filter, ולא את גרסה 1 המסומנת '(Deprecated)'. לדיווח " +
        "ולאנליטיקה פנימיים לשקול את תצוגת ה-CDS I_MaintenanceOrder הקיימת ביקום המזהים של הפרויקט (לא אומתה " +
        "מול רשומה רשמית במעבר זה). את רשימת הישויות, השדות ואפשרויות הסינון לאמת מול SAP Business " +
        "Accelerator Hub (OP_API_MAINTENANCEORDER_0002, דורש מפתח API) או מול מערכת חיה.",
    },
    xrefs: [
      "fm:BAPI_ALM_ORDER_GET_DETAIL",
      "fm:BAPI_ALM_ORDER_MAINTAIN",
      "table:AUFK",
      "table:AFIH",
      "tx:IW38",
      "tx:IW39",
      "cds:I_MaintenanceOrder",
      "fiori:F4604",
    ],
    lastVerifiedAt: DATE21,
    notes:
      "שיטה: שירות החיפוש הרשמי (scripts/sap-help-search.mjs) בשש-עשרה שאילתות: השם המדויק תחת " +
      "SAP_S4HANA_ON-PREMISE (גם מוצמד ל-2025.001), תחת SAP_ERP, תחת SUPPORT_CONTENT ותחת SAP_S4HANA_CLOUD; " +
      "'ALM_ORDERHEAD'; 'OrderHeadGetList' (On-Premise ו-SAP_ERP); 'Maintenance Order Header list BAPI'; " +
      "'Read All Maintenance Orders API_MAINTENANCEORDER'; 'Read All Maintenance Orders (Version 2)'; " +
      "'OData API Maintenance Order Read synchronous inbound service'; 'Maintenance Order (Version 2) " +
      "API_MAINTENANCEORDER_0002 read the maintenance order header data'; 'Operations for Maintenance Order " +
      "(Deprecated) Read All Maintenance Orders'; 'Simplification maintenance order BAPI list'; " +
      "'Maintenance Order BAPIs BAPI_ALM_ORDER_MAINTAIN BAPI_ALM_ORDERHEAD_GET_LIST'; 'I_MaintenanceOrder " +
      "CDS view'; 'IW38 IW39 order list change display maintenance orders'; 'BAPI maintenance order ALM " +
      "order list' (SAP_ERP); 'Maintenance Order Integration BAPIs maintenance orders'. שני חיפושי רשת " +
      "מוגבלים ל-help.sap.com, api.sap.com, fioriappslibrary ו-fal. שלושה מסמכי PDF רשמיים הורדו ונקראו " +
      "כטקסט: SIMPL_OP2025.pdf, WN_OP2025_FPS01_EN.pdf ו-CONV_OP2025.pdf. עמוד ה-Gateway נקרא במלואו כ-HTML " +
      "סטטי; שאר עמודי help.sap.com הם מעטפת JavaScript וכל טענה עליהם תחומה בכותרת ובתקציר של רשומת " +
      "החיפוש; ישויות HTML נוקו מהציטוטים. (1) ממצא שלילי תחום-חיפוש: שאילתות השם המדויק על S/4HANA " +
      "On-Premise החזירו רשומות עם תקציר ריק בלבד ('List of Available BAPIs', Logistics - General, " +
      "2023.latest, loio 7481c1536ca9b54ce10000000a174cb4; 'BAPI Objects', 2025.001, loio " +
      "6b81c1536ca9b54ce10000000a174cb4; 'Operations for Service Order (A2X)'), ואף אחת אינה מציגה את השם " +
      "בכותרת או בתקציר, ולכן לא צוטטו. חיפוש הרשת המוגבל החזיר לשם המדויק גם את עמוד 'Maintenance Order' " +
      "במדריך Maintenance Management (loio b1b69953d1ddb27ae10000000a423f68, 2025.001), אך תקציר החיפוש שלו " +
      "אינו מציג את השם וגופו אינו נשלף, ולכן אינו מצוטט כעמוד הנוקב ב-BAPI. ספירות התוצאות של שירות החיפוש " +
      "אינן יציבות בין הרצות ואינן נרשמות. (2) שלושת ה-PDF: רשימת הפישוט (1,514 עמודים) ללא מופע של השם; " +
      "What's New 2025 FPS01 (728 עמודים, Document Version 1.0 מיום 2026-02-25, 38,829 שורות) ללא מופע של " +
      "השם, כאשר BAPI_ALM_ORDER_MAINTAIN נזכר בעמ' 99 (סעיף 3.1.58, פקודות אחזקה לחיוב) " +
      "ו-API_MAINTENANCEORDER_0002 בעמ' 37 (סעיף 3.1.5) ובעמ' 43 (ישות Linear Asset Management Data); מדריך " +
      "ההסבה CONV_OP2025.pdf (46 עמודים) ללא מופע. כתובות ההורדה של WN_OP2025_FPS01_EN.pdf " +
      "ו-CONV_OP2025.pdf לא נרשמו במעבר זה; שני הקבצים אינם משמשים כמקור ראיה בעל URL אלא כבדיקה שלילית " +
      "תחומה לטקסט המחולץ. (3) הסטטוס 'קיים API משוחרר' הוא טענת חלופה משוחררת ולא טענת החלפה; הצהרת היורש " +
      "היחידה שנמדדה במשפחה נוגעת לגרסה 1 מול גרסה 2 של שירות ה-OData ('Maintenance Order (Deprecated)', " +
      "loio d3f02cfccf00407ab9776ea2ec2030d3). מצב ה-Released של ה-BAPI עצמו וזמינותו ב-S/4HANA הם " +
      "repository_verified בלבד: אף עמוד רשמי למהדורת S/4HANA שנסרק אינו נוקב בשמו. (4) ממשק ה-BAPI: רק " +
      "טבלת טווחים גנרית כקלט מעוגנת בעמוד רשמי (ItRanges בכתיב ה-Gateway, שדות FIELD_NAME, SIGN, OPTION, " +
      "LOW_VALUE, HIGH_VALUE והקבוע OPTIONS_FOR_ENTER_DATE כדוגמה); טבלת הפלט ET_HEADER מופיעה ברשומות " +
      "המאגר בלבד. שלושה קבצי מאגר מסכמים את הפרמטרים בשלושה נוסחים ('IN: selection ranges " +
      "(plant/status/dates) · OUT: order-header list, RETURN.' בסריקה, 'IMP selection · TAB ET_HEADER, " +
      "RETURN' בקובץ ה-PM, 'Selection ranges' אל ET_HEADER בקטלוג הפונקציונלי); לפי מיזוג השדות " +
      "ב-lib/bapi-registry.ts (mergePatch, מאז 2026-09-21) ערכי הסריקה גוברים על סקלרים שהיא מגדירה ומערכים " +
      "מאוחדים, כך שסיכום הסריקה הוא המוצג. (5) רשומת הסריקה מצהירה מקור אימות 'SAP Help Portal' בתאריך " +
      "2026-07-15, אך בהרצה זו לא נמצא עמוד Help ציבורי למהדורת S/4HANA הנוקב ב-BAPI; מקור משפחת ה-PM הוא " +
      "מראת SE37 (Tier-3). (6) אובייקט BOR: קובץ ה-PM נוקב ב-BUS2007, ועמוד ה-Gateway נוקב בשם האובייקט " +
      "'MaintenanceOrderBAPI'; אף מקור שנקרא אינו קושר את שני השמות, והקשר לא נרשם כעובדה. (7) הסטטוס הנגזר " +
      "שהאפליקציה מציגה לפני רשומה זו, לפי קריאת fromFuncRegistry על הרישום הממוזג (verificationStatus " +
      "verified-docs, s4OnPremSupport yes, releasedStatus 'Released · RFC'): 'ללא שינוי ב-S/4HANA' ברמת " +
      "'מאומת מול נתוני הפרויקט'; scripts/report-coverage.mjs לא רץ בסביבה זו (כשל פענוח הכינוי @/data), " +
      "ולכן הנגזרת נקבעה מקריאת הקוד ולא ממדידה חיה. (8) לא נרשם מספר SAP Note או KBA: פריט הפישוט 4.1.4 " +
      "מפנה להערת Business Impact הדורשת משתמש S, ואין ברשומה כתובת me.sap.com. (9) Fiori: המזהים F2175 " +
      "(Find Maintenance Orders) ו-F5241 (Manage Maintenance Orders) נזכרים ברשומות אחיות כשמות רשמיים אך " +
      "אינם קיימים ב-data/fiori/apps.ts, ולכן לא נרשמו כ-xref; fiori:F4604 קיים בקטלוג ונזכר ברשומת tx:IW38 " +
      "כאפליקציית רשימה רשמית; אין מקור רשמי הקושר את ה-BAPI לאפליקציה כלשהי, ו-fiori:F2731 (שיוך שנוי " +
      "במחלוקת ב-data/verification/fiori.ts) לא נרשם. (10) cds:I_MaintenanceOrder נרשם כ-xref ניווטי מיקום " +
      "המזהים; השאילתה 'I_MaintenanceOrder CDS view' לא החזירה רשומה רשמית הנוקבת בתצוגה. (11) api.sap.com: " +
      "חיפוש הרשת החזיר את כתובות ה-Hub ל-OP_API_MAINTENANCEORDER_0002 ול-CE_API_MAINTENANCEORDER_0002 עם " +
      "כותרת גנרית; תוכן ה-Hub אינו בר-אימות ללא מפתח API ולא צוטט, ורשומת Hub למשפחה זו כבר מצוטטת ברשומה " +
      "האחות fm:BAPI_ALM_ORDER_MAINTAIN. (12) עמוד ה-Gateway שייך לערכת התיעוד saphelp_ssb (כותרת העמוד " +
      "'Ranges Table - SAP Documentation'; 'Mapping the Query Operation' ו-'SAP NetWeaver Gateway " +
      "Generators Cookbook' מופיעים בו רק כקישורי More Information, ושם המדריך האב אינו כתוב ב-HTML הסטטי); " +
      "מחרוזת הגרסה '1.0' נלקחה מנתיב הכתובת, גרסת ה-Gateway אינה כתובה בעמוד, והמהדורה נרשמה 'ecc' משום " +
      "שזהו תיעוד NetWeaver מתקופת Business Suite ולא תיעוד S/4HANA. (13) מהדורות Cloud לא נבדקו מעבר " +
      "לשאילתת השם המדויק תחת SAP_S4HANA_CLOUD, שהחזירה רשומה אחת זרה לנושא עם תקציר ריק; תמיכת Cloud " +
      "ברשומת המאגר נשארת 'unknown'.",
  },

  /* ----------------------------- fm:BAPI_BUPA_CREATE_FROM_DATA */
  {
    id: "fm:BAPI_BUPA_CREATE_FROM_DATA",
    aliases: ["BAPI_BUPA_CREATE_FROM_DATA - יצירת שותף עסקי"],
    evidence: [
      BP_A2X_API,
      {
        sourceType: "sap_help",
        sourceTitle: "Editing Business Partner Data | SAP Business Partner",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/74b0b157c81944ffaac6ebc07245b9dc/64af8d5377a0ec23e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "עמוד Editing Business Partner Data בחוברת SAP Business Partner לגרסת 2025 FPS01 קובע בסניפט: 'You " +
               "can create, edit, and manage business partners, and integrate them with other functions' ו-'You can " +
               "use the following channels: Dialog (SAP GUI) Business Application Programming Interfaces (BAPIs) " +
               "Central API', וכן 'Creating business partners Depending on the settings made in Customizing and the " +
               "role selected, different tab pages and data are available to edit business partners'. כלומר ערוץ " +
               "ה-BAPI ליצירה ולעריכה של שותף עסקי מתועד בגרסה זו לצד הדיאלוג וה-Central API. הסניפט אינו נוקב בשם " +
               "של BAPI מסוים ואינו מונה את המודולים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "User Exit CACS3000: Role Determinat.for New BP Through HR Compar. | Incentive and Sales Force " +
                     "Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/71aa2fd6b79b47beac41cfc05182a54c/5571cb53f0f67314e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "עמוד User Exit CACS3000 בחוברת Incentive and Sales Force Management לגרסת 2025 FPS01 נוקב בסניפט: " +
               "'You can create a business partner with the BAPI CreateFromData of the business object Business " +
               "Partner', 'The additional roles are added to the newly created business partner with the BAPI " +
               "AddRole' ו-'The HR data that is read is imported to the corresponding BAPI structures (basic data, " +
               "personal data, address data, telephone of employee, e-mail and bank details)'. זהו התיעוד הרשמי " +
               "הקרוב ביותר שנמצא למודול: שיטת ה-BOR‏ CreateFromData של אובייקט Business Partner מתועדת בגרסת 2025 " +
               "FPS01 כדרך ליצירת שותף עסקי. הסניפט אינו מדפיס את השם הטכני BAPI_BUPA_CREATE_FROM_DATA; הזיהוי בין " +
               "השיטה לבין מודול הפונקציה הוא ידע מקצועי ונשאר לאימות ב-BAPI Explorer במערכת היעד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
                     "Edition 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner Approach (LO-MD-BP, pp. " +
                     "136-140)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE22,
        claim: "מסמך רשימת הפישוט הרשמי SIMPL_OP2025.pdf (Document Version 1.36, 1,514 עמודים, 10,585,218 בתים; " +
               "הכתובת נבדקה ב-2026-09-22 ומחזירה HTTP 200 עם content-length זהה לקובץ שנשמר) חולץ לטקסט מלא " +
               "(pdftotext -layout, 70,529 שורות) ונסרק. המחרוזת BAPI_BUPA_CREATE_FROM_DATA אינה מופיעה בו ולו פעם " +
               "אחת; ה-BAPI-ים היחידים ממשפחת BUPA שהמסמך נוקב בהם הם BAPI_BUPA_CREDIT_STANDING_GET/SET (עמ' 130, " +
               "פריט של SAP Business Partner for Financial Services) ו-BAPI_BUPA_ROLE_ADD_2 (עמ' 1082, פריט 13.3.1 " +
               "S4TWL - Business User integration of BPs with user name and personal number, רכיב FS-BP). פריט " +
               "5.1.27 S4TWL - Business Partner Approach (רכיב יישום LO-MD-BP, Business Impact Note 0002265093, עמ' " +
               "136 עד 140) קובע: 'In SAP S/4HANA, Business Partner is the leading object and single entry point to " +
               "maintain Business Partner, Customer and Supplier (formerly known as Vendor) master data' ו-'Only SAP " +
               "Business Suite customer with CVI in place can move to SAP S/4HANA (Conversion approach). It is " +
               "recommended but not mandatory that BuPa ID and Customer-ID / Vendor ID are the same', וכן: 'The user " +
               "interface for SAP S/4HANA is transaction BP. There is no specific user interface for customer/vendor " +
               "like known from SAP Business Suite (the specific transactions like XD01, XD02, XD03 or VD01, VD02, " +
               "VD03/XK01, XK02, XK03 or MK01, MK02, MK03, etc. are not available in SAP S/4HANA. These will be " +
               "redirected to transaction BP.)', ומפנה לבדיקת העקביות CVI_MIGRATION_PRECHK, לסנכרון דרך " +
               "Synchronization Cockpit‏ (MDS_LOAD_COCKPIT) ולעיבוד המשך דו-כיווני בין שותף עסקי ללקוח/ספק. הממצא " +
               "השלילי תחום לטקסט המחולץ של מסמך זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט (PP-PI, שותף עסקי), שכבת הסריקה ושורות BUT000 בשתי החוברות",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE22,
        sapNote: "2265093",
        claim: "רשומת המאגר data/function-intel.ts מתארת את המודול (מודול PP-PI, תחום תהליך 'שותף עסקי (BP)') כיצירת " +
               "שותף עסקי מנתונים: קלט חובה PARTNERCATEGORY / CENTRALDATA / ADDRESSDATA, פלט BUSINESSPARTNER (מספר " +
               "ה-BP שנוצר) ו-RETURN, שדה ECC 'BP קיים אך לקוח/ספק נוהלו בנפרד (XD01/XK01)', שדה S/4 'BP הוא הגישה " +
               "היחידה (תהליך CVI חובה). חלופה: OData API_BUSINESS_PARTNER', כשלים אופייניים 'Number " +
               "Range/Grouping', 'תפקיד חסר' ו-'ללא COMMIT', תלויות 'Grouping (BP)' ו-'CVI Customizing', וקישור ל-BP " +
               "ול-BUT000; הרשומה אינה מסומנת inferred. שכבת הסריקה data/bapi-enrichment.sweep.ts רושמת 'יצירת שותף " +
               "עסקי (SAP BP) מנתונים שסופקו. דורש COMMIT.' עם op Create, קטגוריה MasterData, RFC ו-COMMIT, אך " +
               "הערכים verificationStatus 'verified-docs', eccSupport 'yes', s4OnPremSupport 'yes' ו-stability " +
               "'Released' הם ברירות המחדל של פונקציית העזר verified() ולא נתון ייחודי לרשומה, ומחרוזת המקור שלה " +
               "נוקבת ב-'SAP Help Portal + SE37 metadata (sapdatasheet.org)' עם תאריך 2026-07-14 וללא URL, כלומר " +
               "מראה של צד שלישי לצד הפורטל. שתי החוברות נושאות את המודול בשורת BUT000: PP-PI נושא 7 " +
               "('BAPI_BUPA_CREATE_FROM_DATA - יצירת שותף עסקי', s4Note 'הוחלף - Business Partner חובה (CVI); ראה " +
               "SAP Note 2265093.', helpLbl 'SAP Note 2265093 (BP)') ו-PM נושא 9 ('יצירת שותף עסקי'); שורת T134 " +
               "בחוברת PP-PI נושאת אותו בטעות (נרשם בתור הטבלאות, אצווה 9). data/pm-master-data-facets.ts מונה אותו " +
               "לצד BAPI_BUPA_CENTRAL_CHANGE בפאסט השותפים של תחזוקת מפעל. אף שכבה במאגר אינה נושאת URL רשמי הנוקב " +
               "בשם המודול, ורשימת הפרמטרים לא אומתה מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_BUPA_CREATE_FROM_DATA; " +
                 "data/bapi-enrichment.sweep.ts#BAPI_BUPA_CREATE_FROM_DATA; data/sapData.pppi.ts#BUT000 (SAP Note " +
                 "2265093 in s4Note/helpLbl); data/sapData.pm.ts#BUT000; data/pm-master-data-facets.ts (partner facet)",
      },
    ],
    status: {
      status: "released_api_available",
      he: "ערוץ ה-BAPI לנתוני שותף עסקי מתועד ב-S/4HANA On-Premise 2025 FPS01: עמוד Editing Business Partner " +
          "Data מונה 'Dialog (SAP GUI) Business Application Programming Interfaces (BAPIs) Central API' כערוצי " +
          "היצירה והעריכה, ועמוד User Exit CACS3000 באותה גרסה מתאר יצירת שותף עסקי 'with the BAPI " +
          "CreateFromData of the business object Business Partner'. רשימת הפישוט של 2025 FPS01, שנקראה במלואה, " +
          "אינה נוקבת ב-BAPI_BUPA_CREATE_FROM_DATA ואינה מציגה אותו כמוחלף, כמוגבל או כלא זמין; פריט הפישוט " +
          "הרלוונטי, 5.1.27 Business Partner Approach, עוסק במודל הנתונים: השותף העסקי הוא האובייקט המוביל " +
          "ונקודת הכניסה היחידה ללקוח ולספק, ו-CVI פעיל הוא תנאי להמרה, והטרנזקציות XD01, XK01 ו-MK01 מנותבות " +
          "בו לטרנזקציה BP. במקביל קיימת חלופת API מתועדת: שירות ה-OData‏ Business Partner (A2X), שם טכני " +
          "API_BUSINESS_PARTNER, ליצירה, הצגה, עדכון ומחיקה של שותף עסקי, ספק ולקוח. אף מקור רשמי שנמצא אינו " +
          "מדפיס את השם הטכני של המודול, ולכן קיומו בגרסה בפועל, הפרמטרים שלו וסטטוס השחרור ברמת SE37 נשארים " +
          "ברובד המאגר ודורשים אימות במערכת SAP; לא נמצא מקור המוציא אותו משימוש, ולכן אין יורש.",
      edition: "on-premise",
      release: "2025.001",
      source: BP_A2X_API,
      recommendedAction: "בתחזוקת מפעל ובתעשיות תהליכיות ספקים, קבלנים ואנשי קשר מוקמים ב-S/4HANA כשותף עסקי בטרנזקציה BP, ולא " +
                         "ב-XK01 או XD01, ולכן ממשק שיוצר שותף עסקי חייב לעבוד מול מודל ה-BP, קבוצת המספרים (Grouping) ותפקידי " +
                         "ה-BP שהוגדרו ב-CVI. לממשקים חדשים להעדיף את שירות ה-OData‏ Business Partner (A2X)‏ " +
                         "(API_BUSINESS_PARTNER), שמתועד ליצירה ב-POST גם עם payload עמוק; להגירה ראשונית להשתמש באובייקטי " +
                         "ההגירה של Migrate Your Data‏ (Business partner, Supplier), המבוססים על CMD_MIG_BP_CVI_CREATE, ולא " +
                         "בקריאה ישירה ל-BAPI. בממשקים קיימים שממשיכים לקרוא ל-BAPI: לאמת במערכת היעד (SE37 או BAPI Explorer) " +
                         "את קיום המודול, את מבנה הפרמטרים ואת דגל השחרור בגרסה בפועל, לוודא הגדרות CVI ו-Customizing של שותף " +
                         "עסקי (קטגוריות תפקיד, טווחי מספרים), לקרוא ל-BAPI_TRANSACTION_COMMIT אחרי היצירה, ולבדוק את הרשומה " +
                         "ב-BUT000 ואת הסנכרון ללקוח/ספק ב-Synchronization Cockpit‏ (MDS_LOAD_COCKPIT) לפני טעינה גדולה.",
    },
    xrefs: [
      "tx:BP",
      "table:BUT000",
      "table:KNA1",
      "table:EBAN",
      "tx:XK01",
      "tx:XD01",
      "tx:MK01",
      "fm:BAPI_TRANSACTION_COMMIT",
      "fm:CVI_VENDOR_TO_BP_CONVERT",
    ],
    lastVerifiedAt: DATE22,
    notes:
      "ארבע הראיות הרשמיות נשלפו ב-2026-09-22 מ-scripts/sap-help-search.mjs --json (שלוש רשומות חיפוש) " +
      "ומקובץ PDF רשמי שנקרא במלואו (רשימת הפישוט); ה-url, ה-loio וה-versionId של רשומות החיפוש הועתקו " +
      "כלשונם מפלט ה-JSON. גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו, ולכן כל טענה על עמוד נושא " +
      "תחומה בכותרת ובסניפט של רשומת החיפוש בלבד. (1) השאילתות שבוצעו על מוצר SAP_S4HANA_ON-PREMISE: " +
      "'BAPI_BUPA_CREATE_FROM_DATA' (6 רשומות, כולן עם סניפט ריק, אף כותרת אינה נוקבת בשם), השאילתה המדויקת " +
      "'\"BAPI_BUPA_CREATE_FROM_DATA\"' (בהרצת הכותב 2 רשומות עם סניפט ריק: 'BAPI Objects' בחוברת Logistics - " +
      "General, loio 6b81c1536ca9b54ce10000000a174cb4, ו-'Data Extraction' בחוברת Poland; בהרצת האימות של " +
      "2026-09-22 הוחזרה רשומת 'BAPI Objects' בלבד; תוכנן לא נראה ולכן אינן ראיה), 'BUPA_CREATE_FROM_DATA', " +
      "'BusinessPartner CreateFromData BAPI', 'Business Partner BAPI create BUPA', 'APIs for Business " +
      "Partner Business Partner (A2X)', 'Business Partner (A2X)', 'API_BUSINESS_PARTNER', 'SAP Business " +
      "Partner BAPIs business partner interfaces function modules', 'BADI_ICL_BP_OUT " +
      "BAPI_BUPA_CREATE_FROM_DATA', 'BAPI_BUPA_CREATE_FROM_DATA BAPI_BUPA_CENTRAL_CHANGE RFC function " +
      "module', 'CMD_MIG_BP_CVI_CREATE BAPI_BUPA_CREATE_FROM_DATA', 'Business Partner Approach " +
      "(Customer/Supplier Integration)', 'Editing Business Partner Data BAPIs Central API SAP Business " +
      "Partner', 'CreateFromData business object Business Partner BAPI roles', 'BAPI Objects Logistics " +
      "General business partner', 'BAPI Objects BusinessPartner BUS1006 methods' ו-'business partner BAPIs " +
      "BUS1006 CreateFromData'; על מוצר SAP_ERP: השם הטכני, השאילתה המדויקת, 'Business Partner BAPI " +
      "CreateFromData business object' ו-'Editing Business Partner Data BAPIs Central API'; ובנוסף חיפוש " +
      "רשת מוגבל לדומיינים help.sap.com, api.sap.com, fioriappslibrary.hana.ondemand.com ו-fal.cloud.sap. " +
      "אף סניפט רשמי אינו מדפיס את המחרוזת BAPI_BUPA_CREATE_FROM_DATA; הממצא השלילי תחום לשאילתות אלה ואינו " +
      "טענה מוחלטת. (2) העמודים הרשמיים הקרובים ביותר שלא נכללו כראיה: 'BAdI: Business Partner Interface " +
      "(BADI_ICL_BP_OUT)' בחוברת Claim (2025.001, loio 28fa4389ed2f4d1aad5d523db00056e1), שטבלת מיפוי ה-RFC " +
      "שלו נוקבת באחים ממשפחת BUPA‏ BAPI_BUPA_CENTRAL_CHANGE ו-BAPI_BUPA_CENTRAL_GETDETAIL ('This BAPI is " +
      "not called by RFC and is therefore not entered in Customizing') אך הסניפט אינו מציג את המודול הנדון; " +
      "'BAPIs for Central Business Partner (IS-U)' בחוברת Master Data (2025.001, loio " +
      "3771ce53118d4308e10000000a174cb4) הנוקב ב-UtilBusinessPartner.CreateFromData, שהוא אובייקט עסקי אחר " +
      "של IS-U; ו-'Transfer data from external systems and source systems' בחוברת Business Partner for " +
      "Financial Services (2025.001, loio 4e96edaa3b564cc7e10000000a42189d): 'You use the existing Business " +
      "Application Programming Interfaces (BAPIs) for the business partner, which can be called from the " +
      "Data Transfer Workbench' ו-'choose Goto BAPIs to Display All in BAPI Explorer'. (3) עמוד סטטי " +
      "ומסמכים שנקראו במלואם לצורך ממצא שלילי: הערת השחרור 'Time Dependency of Central Business Partner " +
      "Data (New)' בספריית saphelp_snc70 " +
      "(help.sap.com/saphelp_snc70/helpdata/EN/f4/bc1c420d9ede2ce10000000a1550b0/content.htm, ‏27,567 בתים) " +
      "נוקבת בשישה BAPI-ים ממשפחת BUPA‏ (CENTRAL_CHANGE, CENTRAL_GETDETAIL, CENTRAL_GETLIST, " +
      "CENTRAL_MAINT_PERIOD, SEARCH, SEARCH_2) ולא במודול הנדון; קובץ PDF ב-help.sap.com שחיפוש הרשת העלה " +
      "(SAP Policy Management 5.3 Installation Guide, 2016, 44 עמודים) הורד וחולץ לטקסט ואינו מכיל אף " +
      "מחרוזת BAPI_BUPA; גם What's New 2025 FPS01‏ (WN_OP2025_FPS01_EN.pdf, טקסט שמור של 38,829 שורות) אינו " +
      "מכיל אותה, ומזכיר את API_BUSINESS_PARTNER בלבד. (4) What's New: 'OData Service for Business Partner' " +
      "בחוברת What's New in SAP S/4HANA 1709 (versionId '1709 000', loio 92f95cd638914ceeb977978961f235aa; " +
      "כפילות תחת versionId 100, loio ee6086bd3ac74807a4bb78eea15624dc, שסניפטה קובע 'With the OData " +
      "service for Business Partner (API_BUSINESS_PARTNER), you can create, display, update, and delete " +
      "(CRUD) data related to Business Partner, Supplier, and'), 'OData API: Business Partner (A2X)' " +
      "ב-What's New 2025 FPS01‏ (loio 518aa2698ad647b78334a3db58c6bd40, שדות חדשים לישות Customer) " +
      "ו-'Duplicate Check Operation for OData API: Business Partner (A2X)' (loio " +
      "4b293e7a8f724faea5fc81d329db5621, 'Technical Object Name API_BUSINESS_PARTNER Application Component " +
      "LO-MD-BP-ODT'). אף אחת מהן אינה מזכירה את ה-BAPI. (5) חוברת APIs for Business Partner: עמוד הסקירה " +
      "(2025.001, loio 9fca825858239244e10000000a4450e5) מונה 'Business Partner (A2X) IDocs DEBMAS and " +
      "CREMAS' ושירותי SOAP‏ 'Business Partner - Replicate from Client' ו-'Business Partner - Replicate to " +
      "Client' וקובע 'You can replicate Business Partner, Customer and Supplier master data to and from an " +
      "external system such as SAP ERP that is connected to SAP S/4 HANA system'; 'Create Business Partner " +
      "Data' (loio cfb5c8a12cd44100a9ea939ce6a23118): 'Sample URL: " +
      "/sap/opu/odata/SAP/API_BUSINESS_PARTNER/A_BusinessPartner You can create master data records using " +
      "POST request also with deep payload'; 'Operations in Business Partner' (loio " +
      "4bf0db9c8cac4fbfa6846b1ca79341da): 'POST /sap/opu/odata/SAP/API_BUSINESS_PARTNER/A_BusinessPartner'. " +
      "אלה חלופות מתועדות, לא יורש: אף עמוד אינו מציג את ה-BAPI כמוחלף. (6) חיפוש רשת מוגבל-דומיין החזיר את " +
      "רישומי ה-Hub‏ 'Business Partner (A2X) API' בכתובת https://api.sap.com/api/API_BUSINESS_PARTNER/ " +
      "ו-'Overview | Business Partner (A2X)' בכתובת " +
      "https://api.sap.com/api/OP_API_BUSINESS_PARTNER_SRV/overview; הם לא נרשמו כראיה כי עמודי api.sap.com " +
      "הם מעטפת ללא מפתח API לפי כללי ה-fallback של MANIFEST, ולכן גם אין כאן טענה על סטטוס שחרור של " +
      "השירות. (7) הגירה: אובייקט ההגירה 'Business partner' (Data Migration, 2025.001, loio " +
      "61bca3e722954443b88eee2839e41610) מציג 'Manage Business Partner Master Data (app ID F3163) " +
      "CMD_MIG_BP_CVI_CREATE' ואובייקט 'Supplier' (loio db7415b7245c42f9889b6f7bacca5606) מציג 'Manage " +
      "Supplier Master Data (app ID F1053A) CMD_MIG_BP_CVI_CREATE'; המזהים F3163 ו-F1053A אינם קיימים " +
      "ב-data/fiori/apps.ts ולכן אין xref ל-Fiori, בעקביות עם רשומת table:BUT000. תצוגת ה-CDS‏ " +
      "I_BusinessPartner (עמוד 'Business Partner' בחוברת Virtual Data Model and CDS Views, 2023.latest, " +
      "loio 35a5898d9b584438abfc178650d12d50: 'CDS View Name I_BUSINESSPARTNER', 'Status Released') וסוגי " +
      "ההודעה DEBMAS ו-CREMAS אינם ביקום המזהים של הפרויקט, ולכן נשארים בטקסט בלבד. (8) עמוד Business " +
      "Partner Approach (Customer/Supplier Integration)‏ (SAP Business Partner, 2025.001, loio " +
      "25b46c8241fd4852bf7876d87bed8fd0), העוגן של רשומת table:BUT000, נשלף שוב היום: 'primarily relevant " +
      "to customers who are migrating from SAP ERP to SAP S/4HANA' ו-'You can process both " +
      "Customer/Supplier master records from business partner maintenance, as well as maintain data from " +
      "customer/supplier processing to the business partner'; לא נוסף כראיה חמישית כדי לשמור על ארבע ראיות " +
      "עם URL, ואותה קביעה נישאת כאן בפריט 5.1.27 של רשימת הפישוט. תאומי ה-ECC של שני עמודי S/4HANA (SAP " +
      "ERP 6.18.latest: CACS3000 באותו loio 5571cb53f0f67314e10000000a174cb4 עם אותו משפט על BAPI " +
      "CreateFromData; Editing Business Partner Data באותו loio 64af8d5377a0ec23e10000000a174cb4 תחת חוברת " +
      "SAP Business Partner for Financial Services) מראים שערוץ ה-BAPI ושיטת ה-BOR קדמו ל-S/4HANA ונמשכים " +
      "בו. (9) רובד Tier-2 והסטטוס הנגזר: ללא סטטוס מחובר, components/neo-shell/reference/bapi-data.ts גוזר " +
      "דרך fromFuncRegistry את הסטטוס 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', משום ששכבת " +
      "הסריקה מסמנת verified-docs עם s4OnPremSupport 'yes'; שני הערכים הם ברירות מחדל של verified() ומחרוזת " +
      "המקור שלהם נשענת גם על מראה צד שלישי (sapdatasheet.org) ללא URL, ולכן הסטטוס המחובר כאן מיישר את " +
      "התצוגה עם התמונה הרשמית, כפי שנעשה ב-fm:BAPI_MATERIAL_SAVEDATA. רשומת function-intel משייכת את " +
      "המודול למודול PP-PI, בעוד העמודים הרשמיים משייכים את השותף העסקי לרכיב LO-MD-BP; הוא חוצה-מודולים " +
      "ומשרת גם את תחזוקת מפעל (ספקים בדרישות רכש, EBAN.FLIEF = BUT000.PARTNER בחוברת PM). שיוך המודול " +
      "לשורת T134 בחוברת PP-PI הוא שגיאת חוברת שכבר נרשמה בתור הטבלאות (אצווה 9). (10) SAP Note 2265093 " +
      "נקרא מטקסט רשימת הפישוט ומהחוברות; שדה sapNote הוזן רק בראיית המאגר (repoRef), כי me.sap.com דורש " +
      "S-user וגוף ההערה, כולל מסמך BP_Conversion Document.pdf המצורף לה, לא נקרא. (11) מה חסר בדיוק: עמוד " +
      "רשמי (help.sap.com, api.sap.com או SAP Note נגיש) המדפיס את השם הטכני BAPI_BUPA_CREATE_FROM_DATA, או " +
      "בדיקת SE37 / BAPI Explorer במערכת SAP חיה לקיום המודול, לקבוצת הפונקציות, לדגל השחרור ולמבנה " +
      "הפרמטרים (PARTNERCATEGORY, CENTRALDATA, ADDRESSDATA, BUSINESSPARTNER, RETURN); חיבור ה-MCP‏ sc4sap " +
      "נכשל בסשן זה (Connection closed), ולכן לא בוצעה בדיקה חיה. (12) שדה reviewer אינו נכתב לפי מוסכמת " +
      "הבית (אף רשומה ב-data/verification/functions.ts אינה נושאת אותו).",
  },

  /* ----------------------------- fm:BAPI_CENTRAL_CHARACT_CREATE */
  {
    id: "fm:BAPI_CENTRAL_CHARACT_CREATE",
    aliases: ["BAPI_CENTRAL_CHARACT_CREATE"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Characteristic | Data Migration",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/48425c3cee4e45e7a82373753b7182dc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "עמוד אובייקט המיגרציה הרשמי 'Characteristic' במדריך Data Migration למהדורת On-Premise‏ 2025 FPS01 " +
               "(loio 48425c3cee4e45e7a82373753b7182dc, תאריך פרסום 2026-02-24) רושם בתקצירו: 'Function Module: " +
               "CNV_PE_S4_CA_CHAR_CUD APIs/BAPIs BAPI_CHARACT_CREATE BAPI_CHARACT_CHANGE CTMV_CHARACT_CHANGE_KNOWL " +
               "CTMV_CHARACT_CHANGE_KNOWL_VAL Accessing SAP Fiori Apps from the Migrate', ובריצה נוספת של אותה " +
               "רשומה: 'Characteristic Name Characteristics, Display Characteristic, Manage Characteristics (app ID " +
               "CT04) CNV_PE_S4_CA_CHAR_CUD APIs/BAPIs Used in Migration-Specific Function Modules'. כלומר ה-BAPI " +
               "שהתיעוד הרשמי קושר ליצירה ולשינוי של מאפיין סיווג הוא BAPI_CHARACT_CREATE לצד BAPI_CHARACT_CHANGE, " +
               "ואפליקציית התחזוקה הנקובה היא Manage Characteristics עם מזהה האפליקציה CT04. השם " +
               "BAPI_CENTRAL_CHARACT_CREATE אינו מופיע בתקציר. התקציר אינו מונה פרמטרים של מודול פונקציה ואינו נוקב " +
               "במעמד השחרור של ה-BAPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Characteristic Data for Classification | APIs for Product Lifecycle Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9f047b05da4545ca8f9ebfc22acefd06/5c3fb6b558b1482491fd786ec7fa0c26.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "עמוד השירות הרשמי למהדורת On-Premise‏ 2025 FPS01 (loio 5c3fb6b558b1482491fd786ec7fa0c26, תאריך פרסום " +
               "2026-02-24) קובע בתקצירו: 'Characteristic Data for Classification Technical name: " +
               "API_CLFN_CHARACTERISTIC Create, read, update, and delete characteristic data with this synchronous " +
               "inbound service', מוסיף 'Characteristics describe attributes of the objects to be classified. Using " +
               "the API you can maintain characteristic header data, descriptions, references, restrictions and " +
               "values', ומונה בטבלת הישויות 'A_ClfnCharacteristicForKeyDate Characteristic Header Classification " +
               "Characteristic Header Data A_ClfnCharcDescForKeyDate Characteristic Description Classification'. זהו " +
               "ערוץ OData מתועד ליצירת מאפיין סיווג ב-S/4HANA On-Premise. התקציר אינו נוקב בשם BAPI כלשהו, אינו " +
               "נוקב במילה released ואינו מציג את השירות כמחליף של מודול פונקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 10.4.9 S4TWL - Classification " +
                     "(CA-CL, pp. 927-929)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE22,
        claim: "רשימת הפישוט של SAP S/4HANA 2025 FPS1 הורדה ב-2026-09-22 מהכתובת הזו (HTTP 200, ‏10,585,218 בתים, " +
               "1,514 עמודים), חולצה לטקסט מלא (pdftotext -layout, ‏70,529 שורות) ונסרקה. חיפוש טקסט מלא על המחרוזות " +
               "'CENTRAL_CHARACT', 'BAPI_CHARACT', 'CHARACT_CREATE', 'CABN' ו-'API_CLFN' מחזיר אפס מופעים בכל המסמך. " +
               "פריט הפישוט של הסיווג, 10.4.9 S4TWL - Classification תחת רכיב היישום CA-CL (הערת Business Impact " +
               "הנקובה במסמך: 0002267878), קובע: 'With SAP S/4HANA, on-premise edition 1511 transactions of the " +
               "Classification are renovated so that transactions may have changed functionality or may be " +
               "completely removed within SAP Product Lifecycle Management (SAP PLM)', ומונה ארבעה שינויים: 'User " +
               "Defined Data Type (031) for characteristics has been removed', 'Rename Characteristic functionality " +
               "has been disabled', 'Parameter Effectivity has been hidden' ו-'Due to security reasons batch import " +
               "has been limited and batch import is possible only from presentation server'. בטבלת הטרנזקציות שאינן " +
               "זמינות מאז 1511 מופיעים CT01 Create Characteristic, CT02 Change Characteristic, CT03 Display " +
               "Characteristic, CT05 Create Characteristic ו-CT06 Display Characteristic, והחלופה הרשומה לכולם היא " +
               "'CT04 Characteristics'; CT11 מוחלפת ב-CT12, ו-CL20, CL22 ו-CL24 מוחלפות ב-CL20N, CL22N ו-CL24N. " +
               "הפעולה הנדרשת: 'No special actions required', ובשורת הקוד המותאם: 'SAP note: 2213569'. הפריט עוסק " +
               "בטרנזקציות ובפונקציונליות מסך ואינו מזכיר BAPI, טבלה או שירות OData.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שלוש רשומות מאגר סותרות לאותו שם: סריקת האימות של קטלוג ה-BAPI, קטלוג הפונקציות והבלופרינט של PP-PI",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE22,
        claim: "‏data/bapi-enrichment.sweep.ts מסמן לשם זה verificationStatus‏ 'invalid-name' ב-confidence‏ 'high', " +
               "בנוסח 'אינו קיים בשם זה. ליצירת מאפיין סיווג השתמש ב-BAPI_CHARACT_CREATE (RFC משוחרר)', עם " +
               "relatedObjects‏ ['BAPI_CHARACT_CREATE'] ובהערת ה-QA של פונקציית העזר invalid(): 'אומת מול מקורות SAP " +
               "רשמיים: שם זה אינו אובייקט סטנדרטי. ראה החלופה המומלצת'; מקור האימות הרשום לפריט הוא 'SAP Help " +
               "Portal + SE37 metadata (sapdatasheet.org)' בתאריך 2026-07-14, כלומר מראת מטא-נתונים חיצונית שאינה " +
               "ברשימת ההיתר של הפרויקט, ללא URL. מנגד data/function-intel.ts רושם לאותו שם תיאור מלא ('יצירת מאפיין " +
               "מרכזי (Characteristic) למערכת הסיווג'), פרמטר קלט CHARACTDETAIL ('שם, סוג נתונים, אורך'), טבלת קלט " +
               "'CHARVALUESNUM/CHAR' ('ערכים מותרים'), שיוך ל-CT04 ולטבלת AUSP, ושדות 'זמין ב-ECC' ו'זמין ב-S/4HANA' " +
               "בלי מקור. הדאטהסט המחולל של בלופרינט PP-PI (data/sapData.pppi.ts) מונה את השם במערך funcs של שתי " +
               "טבלאות בהקשר QM ולא בהקשר סיווג: PLKO ('יצירת מאפיין בדיקה ראשי (QM)') ו-PLMK " +
               "('BAPI_CENTRAL_CHARACT_CREATE - יצירת מאפיין בדיקה'), וזה מקור הרישום ביקום הפרויקט. " +
               "audit/s4-enrichment/BASELINE.md מונה את השם בין 13 מזהי invalid-name שקטלוג הפונקציות סותר. שלוש " +
               "הרשומות סותרות זו את זו בשאלת עצם קיום השם ובשאלת התחום העסקי שלו (מאפיין סיווג CA-CL מול מאפיין " +
               "בדיקה ראשי QM), ואף אחת מהן אינה נסמכת על עמוד SAP רשמי.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/bapi-enrichment.sweep.ts#BAPI_CENTRAL_CHARACT_CREATE; " +
                 "data/function-intel.ts#BAPI_CENTRAL_CHARACT_CREATE; data/sapData.pppi.ts#PLKO,PLMK (funcs); " +
                 "audit/s4-enrichment/BASELINE.md",
      },
    ],
    status: {
      status: "verification_required",
      he: "מודול הפונקציה רשום בקטלוג הפרויקט כערוץ ליצירת מאפיין (Characteristic) למערכת הסיווג, בזיקה ל-CT04 " +
          "ולטבלת AUSP, ובבלופרינט PP-PI כיצירת מאפיין בדיקה ראשי (QM) לצד PLKO ו-PLMK, אך שם האובייקט עצמו לא " +
          "אושר באף מקור SAP רשמי שנבדק: שאילתות על השם המדויק בשירות החיפוש של SAP Help (סקופ On-Premise, ‏ERP " +
          "ו-Cloud, ‏2026-09-22) לא החזירו כותרת או תקציר הנוקבים בו, חיפוש רשת מוגבל לדומיינים הרשמיים לא " +
          "החזיר אף עמוד הנוקב בשם (בין תוצאותיו עמודים על BAPI_CHARACT_CREATE ועמודים כלליים על BOR ועל " +
          "פרמטרים סטנדרטיים של BAPI), וברשימת הפישוט 2025 FPS01 שנסרקה במלואה המחרוזת CENTRAL_CHARACT אינה " +
          "מופיעה. התיעוד הרשמי של 2025 FPS01 נוקב בשני ערוצים אחרים ליצירת מאפיין סיווג: ה-BAPI‏ " +
          "BAPI_CHARACT_CREATE, שאובייקט המיגרציה 'Characteristic' רושם בשורת ה-APIs/BAPIs שלו, ושירות ה-OData‏ " +
          "API_CLFN_CHARACTERISTIC, שעמודו מתאר אותו כשירות נכנס סינכרוני ליצירה, קריאה, עדכון ומחיקה של נתוני " +
          "מאפיין. סריקת האימות של המאגר מסמנת את השם invalid-name ומפנה ל-BAPI_CHARACT_CREATE, בעוד קטלוג " +
          "הפונקציות והבלופרינט מציגים אותו כקיים, בשני תחומים עסקיים שונים; לכן הסטטוס נשאר פתוח עד בדיקה " +
          "ב-SE37 או ב-BAPI Explorer במערכת היעד. לא נרשם יורש: BAPI_CHARACT_CREATE אינו מזהה ביקום הפרויקט, " +
          "ואף מקור רשמי שנקרא אינו מציג את שירות ה-OData כמחליף של מודול פונקציה.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לפני שימוש בשם זה בקוד Z, בממשק או במסמך אפיון: לבדוק ב-SE37 או ב-BAPI Explorer במערכת ECC " +
                         "וב-S/4HANA אם BAPI_CENTRAL_CHARACT_CREATE קיים כאובייקט סטנדרטי, ואם אינו קיים לתקן את ההפניה בקטלוג " +
                         "הפונקציות ובבלופרינט. להכריע תחילה מהו הצורך העסקי: מאפיין סיווג (CA-CL, מתוחזק ב-CT04; טבלאות CABN " +
                         "ו-CAWN לפי רשומות המאגר) או מאפיין בדיקה ראשי (QM, נוצר ב-QS21; אובייקט BOR‏ QPMK לפי דף המידע הרשמי " +
                         "על העברת מאפייני בדיקה ראשיים). ליצירת מאפיין סיווג בממשק חדש להעדיף את שירות ה-OData‏ " +
                         "API_CLFN_CHARACTERISTIC (Characteristic Data for Classification), ובטעינת נתונים ראשונית את אובייקט " +
                         "המיגרציה הרשמי 'Characteristic', שהתיעוד רושם לו את BAPI_CHARACT_CREATE ו-BAPI_CHARACT_CHANGE בשורת " +
                         "ה-APIs/BAPIs. לזכור שכתיבה דרך מודול פונקציה מחייבת COMMIT מפורש (BAPI_TRANSACTION_COMMIT), ושפריט " +
                         "הפישוט 10.4.9 מסיר ב-S/4HANA את CT01, CT02, CT03, CT05 ו-CT06 לטובת CT04, מסיר את סוג הנתונים המותאם " +
                         "031 ומשבית שינוי שם של מאפיין, כך שבדיקות של מאפיינים קיימים ייעשו מול CT04. אין להציג את השם כממשק " +
                         "משוחרר כל עוד לא נמצא לו מקור רשמי או בדיקה במערכת.",
    },
    xrefs: [
      "table:PLMK",
      "table:PLKO",
      "tx:CT04",
      "tx:QS21",
      "fm:BAPI_OBJCL_CREATE",
      "fm:QPK1_INSPCHAR_READ",
      "fm:BAPI_TRANSACTION_COMMIT",
    ],
    lastVerifiedAt: DATE22,
    notes:
      "שיטה: שלוש הראיות הרשמיות נשלפו ב-2026-09-22 (שעון מקומי; שדה accessedAt של הכלי מדפיס 2026-09-21 " +
      "לפי UTC) מ-scripts/sap-help-search.mjs --json, וה-url, ה-loio וה-versionId הועתקו כלשונם מפלט " +
      "ה-JSON; גופי עמודי help.sap.com הם מעטפת JavaScript ולא נקראו, ולכן כל טענה תחומה בכותרת ובתקציר של " +
      "רשומת החיפוש, פרט לרשימת הפישוט שהורדה ונקראה בטקסט מלא. (1) הממצא השלילי המרכזי, תחום לשאילתות " +
      "שבוצעו ואינו טענה מוחלטת: השם המדויק 'BAPI_CENTRAL_CHARACT_CREATE' החזיר בסקופ On-Premise שתי רשומות " +
      "זרות לנושא עם תקציר ריק (Public Sector), בסקופ SAP_ERP שבע רשומות שאף אחת מהן אינה נוקבת בשם, ובסקופ " +
      "SAP_S4HANA_CLOUD שלוש רשומות זרות לנושא; חיפוש רשת מוגבל ל-help.sap.com, api.sap.com, " +
      "fioriappslibrary.hana.ondemand.com ו-fal.cloud.sap לא החזיר אף עמוד הנוקב בשם; בין תוצאותיו עמודי " +
      "SUPPORT_CONTENT על ה-BAPI האח, 'BAPI_CHARACT_CREATE - Create Characteristic' (sapclass/3363507392), " +
      "'BAPI_CHARACT_CHANGE - Change Characteristic' (3363507389), 'BAPI_CHARACT_GETDETAIL' (3363507394), " +
      "'Characteristics and Characteristics Values' (3363506311) ו-'CT04 - Characteristic Maintenance' " +
      "(3363506306), לצד עמודים כלליים על ה-Business Object Repository, על OTR ועל פרמטרים סטנדרטיים של " +
      "BAPI. עמודי ה-SUPPORT_CONTENT נמשכו ב-curl והם מעטפת JavaScript של 1,160 בתים עם כותרת גנרית, וכיוון " +
      "שמקורם בתוכן ויקי תמיכה שהועבר לדומיין, רק כותרותיהם מרשימת החיפוש נרשמות כאן והם לא צוטטו כראיה. " +
      "(2) רשימת הפישוט: אפס מופעים למחרוזות שנסרקו; שני פריטי CA-CL בלבד במסמך, 10.4.9 (הראיה השלישית) " +
      "ו-10.4.12 S4TWL - Classification - Data Cleanup before Migration (עמ' 931, הערת Business Impact " +
      "הנקובה במסמך 0002949845), הקובע שבהמרה ל-1909 ומעלה לוגיקת ההמרה הממלאת את הטבלה CLF_HDR מחייבת " +
      "שטבלת INOB לא תכיל כפילויות ומפנה ל-SAP Note 2948953 לטיפול באי-עקביות; הפריט אינו נוגע ל-BAPI ולכן " +
      "נרשם כאן בלבד. (3) ההיבט של QM: דף המידע הרשמי 'Information Sheet on Transferring QM Master " +
      "Inspection Characteristics' (Quality Management, loio 7767b65334e6b54ce10000000a174cb4, ‏2025.001) " +
      "מציג בתקצירו 'Name of business object (BOR object) QPMK', 'Business object method SaveReplica " +
      "Message type QPMK IDoc type QPMK01' ואת הטבלאות הראשיות 'QPMK (master inspection characteristic) " +
      "QPMT (short texts for master inspection characteristic)'; עמוד אובייקט המיגרציה 'QM - Master " +
      "inspection characteristic' (Data Migration, loio ecc1d803a3ed4b948b8d30e96e55e479, ‏2025.001) נוקב " +
      "באפליקציות 'Display Master Inspection Characteristic (F2219)' ו-'Create Master Inspection " +
      "Characteristic (QS21)'. אף אחד משני העמודים אינו נוקב בשם BAPI_CENTRAL_CHARACT_CREATE, ולכן קריאת " +
      "הבלופרינט ('יצירת מאפיין בדיקה ראשי (QM)') נשארת ללא מקור רשמי כמו קריאת קטלוג הפונקציות (מאפיין " +
      "סיווג). F2219 אינו קיים ב-data/fiori/apps.ts ולכן אינו xref. (4) שירות ה-OData מתועד גם תחת מדריך " +
      "Classification (CA-CL) בכותרת 'Characteristic Data for Classification - Create, Read, Update, " +
      "Delete' (loio 30c05f971088481d8d9cd9b4350d2403, ‏2025.001, תקציר: 'Technical name: " +
      "API_CLFN_CHARACTERISTIC This service enables you to create, read, update and delete characteristic " +
      "data that is ... valid on a given date'), ורשומת What's New באותה כותרת קיימת במדריך 'What's New in " +
      "SAP S/4HANA 1809' (loio ff52d2071e1a41239f1daf05e0b3d28a, ‏versionId 1809.000), כך שלפי אותה רשומה " +
      "השירות מתועד מאז 1809. חיפוש הרשת החזיר גם את כתובת ה-Hub‏ " +
      "api.sap.com/api/API_CLFN_CHARACTERISTIC_SRV/overview בכותרת 'Overview | Characteristic Data for " +
      "Classification'; עמוד ה-Hub הוא מעטפת של 664 בתים ללא מפתח API, ולכן שם השירות המלא " +
      "API_CLFN_CHARACTERISTIC_SRV, תרחיש התקשורת ונתיב השירות שהופיעו בסיכום מנוע החיפוש לא נרשמו כעובדה. " +
      "(5) עמודי הרשימות של מדריך Logistics General (LO) לגרסת 2025.001: 'List of Available Function " +
      "Groups' (loio 5f81c1536ca9b54ce10000000a174cb4) קובע 'The BAPIs for variant configuration and " +
      "classification are in package CL' ו-'Function group CACL (Classification)'; 'List of Available " +
      "BAPIs' (loio 7481c1536ca9b54ce10000000a174cb4) מציג בתקציריו את הקבוצה 'CACTM Group: Maintain " +
      "Characteristics Data' עם CAMA_CHARACT_MAINTAIN ו-CAMA_CHARACT_SAVE ואת 'CACTR Group: Read " +
      "Characteristics Data' עם CARD_CHARACTERISTIC_READ. אף תקציר אינו נוקב בשם הנבדק; קבוצת הפונקציות של " +
      "BAPI_CHARACT_CREATE לא נראתה באף תקציר ולא נרשמה. (6) הסטטוס הנגזר שהאפליקציה מציגה לפני רשומה זו, " +
      "לפי קריאת הקוד ולא ממדידה חיה: deriveRegistry ב-lib/bapi-registry.ts בונה את הרשומה ממערכי funcs של " +
      "הבלופרינט (verificationStatus requires-verification, s4OnPremSupport unknown), הסריקה דורסת " +
      "ל-invalid-name ב-confidence high, deriveStability מסמן 'Obsolete', ו-fromFuncRegistry " +
      "ב-lib/evidence/s4-status.ts ממפה invalid-name ל-not_applicable ('לא רלוונטי') ברמת 'מאומת מול נתוני " +
      "הפרויקט' עם ההסבר 'השם אינו אובייקט SAP תקני; תמיכה ב-S/4HANA On-Premise: לא צוין'. הסטטוס המחובר " +
      "כאן, verification_required, מחליף את הנגזרת (pickStatus מעדיף טענה מחוברת), בהתאם לטיפול במזהי " +
      "המדידה וההודעות בקבצי 4 ו-5: המאגר חלוק בשאלת עצם קיום השם, וזה נכתב כ-conflictingEvidence ולא רק " +
      "כהערה. (7) שדות ה-ECC וה-S/4 של קטלוג הפונקציות ('זמין ב-ECC', 'זמין ב-S/4HANA') הם ללא מקור; שאילתת " +
      "BAPI_CHARACT_CREATE בסקופ SAP_ERP לא החזירה אף רשומה הנוקבת אפילו ב-BAPI האח, ולכן גם זמינות ב-ECC " +
      "לא אומתה. (8) xrefs: table:PLMK ו-table:PLKO לפי מערכי funcs של הבלופרינט (רשומת table:PLMK כבר מפנה " +
      "לכאן); tx:CT04 לפי קטלוג הפונקציות, התקציר הרשמי 'Manage Characteristics (app ID CT04)' ופריט " +
      "הפישוט; tx:QS21 לפי עמוד המיגרציה של QM ורשומת tx-intel QS21 ('יצירת מאפיין בדיקה ראשי'); " +
      "fm:BAPI_OBJCL_CREATE כ-BAPI האח של הסיווג ביקום; fm:QPK1_INSPCHAR_READ הרשום לצד השם ב-PLMK; " +
      "fm:BAPI_TRANSACTION_COMMIT לדרישת ה-COMMIT. אינם מזהים ביקום ולכן לא נרשמו: fm:BAPI_CHARACT_CREATE, " +
      "fm:BAPI_CHARACT_CHANGE, table:CABN, table:CAWN, table:AUSP, table:QPMK, tx:CT01, tx:CT05, fiori " +
      "F2219 ותצוגת CDS כלשהי לסיווג (אין כזו ב-cds של המניפסט); מכאן שלא נרשם successor. (9) לא נרשם מספר " +
      "SAP Note או KBA בשדות הרשומה; המספרים בטענת רשימת הפישוט מצוטטים מטקסט ה-PDF כלשונם. (10) לא בוצעה " +
      "בדיקה חיה במערכת SAP: חיבור ה-MCP‏ sc4sap נכשל בסשן זה, ולכן קיום המודול, קבוצת הפונקציות, הפרמטרים " +
      "ומעמד השחרור ברמת SE37 נשארים לא מאומתים. נבדק בפועל: חיפושי help.sap.com בשלושה סקופים, חיפוש רשת " +
      "בדומיינים הרשמיים, משיכת עמודי SUPPORT_CONTENT וה-Hub ב-curl, ורשימת הפישוט שהורדה ונסרקה במלואה. " +
      "מבוסס על קובץ: רובד המאגר (סריקה, קטלוג פונקציות, בלופרינט, BASELINE). דורש אימות במערכת SAP: קיום " +
      "המודול ופרמטריו. מהדורות Cloud לא נבדקו מעבר לשאילתת השם המדויק; תמיכת Cloud ברשומת המאגר נשארת " +
      "unknown.",
  },

  /* ----------------------------- fm:BAPI_EQMT_INSTALL */
  {
    id: "fm:BAPI_EQMT_INSTALL",
    aliases: ["BAPI_EQMT_INSTALLFL"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "APIs for Maintenance Management | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/13d40bd35fc74d289e81fc284a928448.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "עמוד הסקירה הרשמי של מדריך APIs for Maintenance Management למהדורת On-Premise‏ 2025 FPS01 קובע " +
               "בתקצירו: 'An equipment can be installed or dismantled at functional locations', מונה בין יכולות " +
               "שירות הציוד 'Mass create, read, and update equipment master data Install and dismantle equipment " +
               "without data transfer Attach documents', ומפנה לנושא הקשור 'Install or Dismantle Equipment'. בהרצה " +
               "נוספת של אותה רשומה התקציר מוסיף 'Equipment Technical name: API_EQUIPMENT An equipment is an asset " +
               "or an individual object that can be maintained independently'. כלומר לתרחיש התקנה ופירוק של ציוד " +
               "קיימת ב-2025 FPS01 יכולת מתועדת בשירות ה-OData‏ API_EQUIPMENT. התקציר אינו נוקב בשם " +
               "BAPI_EQMT_INSTALL ואינו נוקב בשם BAPI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Install Equipment at Functional Location | APIs for Maintenance Management",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/923c8b020caf441c8abca41c416501fd.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "עמוד הפעולה הרשמי למהדורת On-Premise‏ 2025 FPS01 מתעד את ה-Function Import להתקנת ציוד במיקום " +
               "פונקציונלי. כלשון התקציר: 'Install Equipment at Functional Location Request You can include the " +
               "following properties in the request's URL: Property Necessity Comment Equipment ValidityEndDate " +
               "SuperordinateEquipment', ובדוגמה: 'Request POST - " +
               "<host>/sap/opu/odata/sap/API_EQUIPMENT/InstallEquipment?' עם הפרמטרים " +
               "'Equipment=%2710084475%27&ValidityEndDate=datetime%279999-12-31T00%3A00%27&FunctionalLocation=' " +
               "בכתובת (התקציר נקטע אחרי FunctionalLocation=). זו פעולת ה-OData המתועדת לתרחיש שהרשומה מתארת; " +
               "המאפיין SuperordinateEquipment מופיע ברשימת המאפיינים, אך עמודת Necessity אינה נראית בתקציר ולכן " +
               "חובת כל מאפיין אינה נקבעת ממנו. העמוד אינו נוקב בשם BAPI_EQMT_INSTALL ולא בשם BAPI_EQUI_INSTALL.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Release-Informationen für Corporate Services, SAP-Erweiterungspaket 5 für SAP ERP 6.0 (What's New? " +
                     "Release Notes), Kapitel_07__Corporate_ServicesD.PDF (PDF בגרמנית, 97 עמודים, נקרא במלואו)",
        url:
          "https://help.sap.com/doc/e0fcbcc544ee4985ab885b2667b3a336/6.05.16/de-DE/Kapitel_07__Corporate_ServicesD.PDF",
        product: "SAP ERP 6.0 EHP5 (EA-PLM 605)",
        edition: "ecc",
        release: "6.05",
        accessedAt: DATE22,
        claim: "מסמך Release Notes רשמי של ECC 6.0 EHP5 שהורד ב-2026-09-22 ‏(HTTP 200, ‏708,093 בתים, 97 עמודים) " +
               "וחולץ לטקסט מלא קובע בעמוד 15 של הקובץ (לפי ספירת עמודי ה-PDF; הכותרת מופיעה גם בתוכן העניינים בעמוד " +
               "3) תחת הכותרת 'LOG_EAM_CI_4: BAPIs für den Ein- und Ausbau nicht serialisierter " +
               "Stücklistenpositionen (Neu)': 'Ab SAP Erweiterungspaket 5 für SAP ERP 6.0, Enterprise Extension PLM " +
               "(EA-PLM 605), Business Function LOG_EAM_CI_4, stehen die BAPIs BAPI_IE4N_BOM_REMOVE und " +
               "BAPI_IE4N_BOM_INSTALL zur Verfügung', לפירוק ולהתקנה של חומר לא סידורי בכותרת עץ המוצר של ציוד 'ohne " +
               "dass dazu Benutzeraktionen in Transaktion IE4N erforderlich sind'. ממצא שלילי התחום לאותה קריאה: " +
               "שמות ה-BAPI היחידים בטקסט המסמך הם BAPI_ALM_ORDER_GET_DETAIL, ‏BAPI_ALM_ORDER_MAINTAIN, " +
               "‏BAPI_IE4N_BOM_INSTALL ו-BAPI_IE4N_BOM_REMOVE; המחרוזות BAPI_EQMT_INSTALL, ‏BAPI_EQUI_INSTALL " +
               "ו-BAPI_EQUI_DISMANTLE אינן מופיעות בו. מנוע החיפוש המוגבל ל-help.sap.com החזיר את המסמך לשאילתה " +
               "המדויקת \"BAPI_EQUI_INSTALL\", אך זהו שיוך של המנוע ולא אזכור בטקסט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ארבע שכבות מאגר סותרות לאותו שם: סריקת האימות של קטלוג ה-BAPI, קטלוג הפונקציות, הדאטהסט המחולל של " +
                     "בלופרינט PM ותוכן האקדמיה",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE22,
        claim: "‏data/bapi-enrichment.pm.ts מסמן לשם זה verificationStatus‏ 'invalid-name' ב-confidence‏ 'high', " +
               "בנוסח 'אינו קיים. להתקנת ציוד השתמש ב-BAPI_EQUI_INSTALL (זוג: BAPI_EQUI_DISMANTLE)' ובהערת ה-QA " +
               "'אומת: אינו אובייקט SAP סטנדרטי (לא נמצא ב-SE37). אין לפרסם כשם תקין'; מקור האימות הרשום שם הוא מראת " +
               "מטא-נתונים של SE37 באתר חיצוני יחד עם SAP Community, ושניהם אינם ברשימת ההיתר של הפרויקט. מנגד " +
               "data/function-intel.ts רושם לאותו שם רשומה מלאה שאינה מסומנת inferred: 'התקנת ציוד במיקום פונקציונלי " +
               "/ ציוד-על', קלט EQUIPMENT (חובה) ו-'FUNCTLOC/SUPEQUI' (יעד התקנה), פלט RETURN, השדות 'זמין ב-ECC' " +
               "ו-'זמין ב-S/4HANA (IE4N)' ללא מקור, וזיקה ל-IE4N, IE02, EQUI, ILOA ולתהליך PM-2. הדאטהסט המחולל של " +
               "בלופרינט PM מונה את השם במערך funcs של טבלת EQUI ('התקנת ציוד במיקום/ציוד אב'), וזה מקור הרישום; " +
               "data/domain-detail.ts מונה אותו בין פונקציות תחום הציוד; ושיעור האקדמיה המחולל של PM נוקב באיות " +
               "שלישי, BAPI_EQMT_INSTALLFL ('התקנת ציוד במיקום/ציוד-אב'), תחת trust‏ 'verified-docs' ומקור טקסטואלי " +
               "SAP Help Portal, Plant Maintenance (S/4HANA), ללא URL. השם שהמאגר מציג כנכון, BAPI_EQUI_INSTALL, " +
               "קיים רק כתוספת PM ‏(PM_ADDITIONS) עם eccSupport‏ 'yes', s4OnPremSupport‏ 'yes' ו-'Released · RFC' " +
               "מאותו מקור מראה חיצוני; רשומת ה-sweep שלו (תווית SAP Help Portal עם ציון verified 2026-07-15, ללא " +
               "URL) אינה מגיעה לרשומה, כפי שנמדד היום בהרצת registry(): השורה נושאת את מקור התוספת ואת התאריך " +
               "2026-07-14. השכבות סותרות זו את זו בשאלת עצם קיום השם, ואף אחת אינה נסמכת על עמוד SAP רשמי.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/bapi-enrichment.pm.ts#BAPI_EQMT_INSTALL; data/function-intel.ts#BAPI_EQMT_INSTALL; " +
                 "data/sapData.pm.ts#EQUI (funcs); data/domain-detail.ts#pm-equipment; " +
                 "data/academy/lessons/pm-generated.ts (BAPI_EQMT_INSTALLFL); " +
                 "data/bapi-enrichment.pm.ts#BAPI_EQUI_INSTALL (PM_ADDITIONS)",
      },
    ],
    status: {
      status: "verification_required",
      he: "השם BAPI_EQMT_INSTALL רשום בקטלוג הפרויקט כערוץ להתקנת ציוד במיקום פונקציונלי או בציוד-על (תחזוקת " +
          "מפעל), בזיקה ל-IE02, ל-IE4N ולטבלאות EQUI, EQUZ ו-ILOA, אך שם האובייקט עצמו לא אושר באף מקור SAP " +
          "רשמי שנבדק: 21 שאילתות בשירות החיפוש של SAP Help ב-2026-09-22 (סקופ On-Premise ו-SAP ERP) לא החזירו " +
          "כותרת או תקציר הנוקבים בו, ושני מסמכי Release Notes רשמיים של ECC 6.0 (EHP3 באנגלית, EHP5 בגרמנית) " +
          "שחולצו לטקסט מלא אינם מכילים אותו. אותו ממצא שלילי חל גם על השם שהמאגר מציג כנכון, " +
          "BAPI_EQUI_INSTALL, ועל בן זוגו BAPI_EQUI_DISMANTLE. התיעוד הרשמי של 2025 FPS01 מתעד לתרחיש עצמו " +
          "חלופת OData: ה-Function Import‏ InstallEquipment של שירות API_EQUIPMENT (עמוד 'Install Equipment at " +
          "Functional Location', עם המאפיינים Equipment, ValidityEndDate, SuperordinateEquipment " +
          "ו-FunctionalLocation), ועמוד הסקירה של המדריך קובע 'Install and dismantle equipment without data " +
          "transfer'. בתוך המאגר ארבע שכבות סותרות זו את זו בשאלת קיום השם (invalid-name מול רשומת תיאור מלאה, " +
          "רישום בבלופרינט EQUI ואיות שלישי BAPI_EQMT_INSTALLFL באקדמיה), ולכן הסטטוס נשאר פתוח עד בדיקה ב-SE37 " +
          "או ב-BAPI Explorer במערכת היעד.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לפני שימוש בשם זה בקוד Z, בממשק או במסמך אפיון: לבדוק ב-SE37 או ב-BAPI Explorer במערכת ECC " +
                         "וב-S/4HANA אם BAPI_EQMT_INSTALL קיים כאובייקט סטנדרטי, ובאותה בדיקה לאמת גם את השם שהמאגר מציע " +
                         "במקומו, BAPI_EQUI_INSTALL, ואת בן זוגו BAPI_EQUI_DISMANTLE, שגם להם לא נמצא מקור רשמי; אם השם אינו " +
                         "קיים לתקן את ההפניה בכל ארבע שכבות המאגר (קטלוג הפונקציות, בלופרינט EQUI, domain-detail ושיעור " +
                         "האקדמיה). להתקנת ציוד בממשק חדש להעדיף את ה-Function Import‏ InstallEquipment של שירות ה-OData‏ " +
                         "API_EQUIPMENT (POST, עם Equipment, ValidityEndDate ויעד ההתקנה FunctionalLocation או " +
                         "SuperordinateEquipment), ולפירוק את DismantleEquipment, שהתיעוד מציג אותו בעמוד Function Imports for " +
                         "Equipment בגרסה 2023 בלבד. בעבודה ידנית להשתמש בפונקציות ההתקנה והפירוק שברשומת המיקום הפונקציונלי " +
                         "או ברשומת הציוד (עמודי Technical Objects; במאגר: IE02) או ב-IE4N כשנדרשת תנועת סחורה. לאימות תפקודי " +
                         "לבדוק שנוצרה רשומה חדשה ברשימת השימוש של הציוד (התיעוד הרשמי: \"creates a new entry in the equipment " +
                         "usage list\"), שלפי רשומות המאגר של EQUZ ו-ILOA היא פלח זמן ב-EQUZ המפנה דרך ILOAN אל ILOA, ולזכור " +
                         "שכתיבה דרך מודול פונקציה מחייבת BAPI_TRANSACTION_COMMIT מפורש. אין להציג את השם כממשק משוחרר כל עוד " +
                         "לא נמצא לו מקור רשמי או בדיקה במערכת.",
    },
    xrefs: [
      "fm:BAPI_EQUI_INSTALL",
      "fm:BAPI_EQUI_CREATE",
      "fm:BAPI_EQUI_CHANGE",
      "fm:BAPI_EQUI_GETDETAIL",
      "fm:EQUIPMENT_DISMANTLE",
      "fm:EQUI_TIMESEGMENT_READ",
      "fm:BAPI_TRANSACTION_COMMIT",
      "table:EQUI",
      "table:EQUZ",
      "table:ILOA",
      "table:IFLOT",
      "tx:IE01",
      "tx:IE02",
      "tx:IE03",
      "tx:IE4N",
      "cds:I_Equipment",
      "cds:I_EquipmentTimeSegment",
      "cds:I_FunctionalLocation",
      "enh:exit:IEQM0001",
      "bp:bapi-commit-discipline",
    ],
    lastVerifiedAt: DATE22,
    notes:
      "שיטה (2026-09-22): 21 שאילתות ב-scripts/sap-help-search.mjs, רובן תחת המוצר SAP_S4HANA_ON-PREMISE " +
      "ושלוש תחת SAP_ERP, סביב השם עצמו, סביב BAPI_EQUI_INSTALL ו-BAPI_EQUI_DISMANTLE, סביב הפעולות " +
      "InstallEquipment ו-DismantleEquipment של שירות API_EQUIPMENT, סביב עמודי Technical Objects להתקנה " +
      "ופירוק, סביב IE4N, סביב What's New, סביב אובייקט המיגרציה 'PM - Equipment' וסביב האובייקט העסקי " +
      "EquipmentPM; בתוספת שתי הרצות WebSearch מוגבלות ל-help.sap.com, api.sap.com, fioriappslibrary " +
      "ו-fal.cloud.sap. ה-url, ה-loio וה-versionId של הראיות הרשמיות הועתקו כלשונם מפלט ה-JSON. גופי עמודי " +
      "help.sap.com הם מעטפת JavaScript ולא נקראו, ולכן כל טענה מהם תחומה בכותרת ובתקציר של רשומת החיפוש; " +
      "היוצאים מן הכלל הם ארבעה מסמכי PDF שהורדו וחולצו לטקסט מלא. עמוד ה-SUPPORT_CONTENT 'List of BAPI's' " +
      "שהחיפוש החזיר נטען כמעטפת ריקה ואינו מצוטט. (1) הממצא השלילי על השם תחום לשאילתות ולמסמכים שנקראו " +
      "ואינו הוכחת היעדר: שירות החיפוש של SAP Help אינו מתעד כל מודול פונקציה בשמו, ובדיקת SE37 במערכת חיה " +
      "לא בוצעה (חיבור ה-MCP‏ sc4sap נכשל בפתיחת ההפעלה). השאילתה על השם המדויק החזירה בסקופ On-Premise תשע " +
      "רשומות ובסקופ SAP ERP תשע רשומות, כולן ממדריכים אחרים וללא תקציר, ואף אחת אינה נוקבת בשם; " +
      "'BAPI_EQUI_INSTALL' החזירה שש ועשר רשומות בהתאמה, אף אחת אינה נוקבת בשם; 'BAPI_EQUI_DISMANTLE' " +
      "החזירה רשומה אחת בלבד (API Extensibility Enablement, מדריך אחר). הרכב התוצאות משתנה בין הרצה להרצה " +
      "ולכן אינו נרשם כרשימה סגורה. (2) הסטטוס הנגזר שהאפליקציה מציגה היום, כפי שנמדד בהרצת " +
      "fromFuncRegistry דרך scripts/alias-loader.mjs ב-2026-09-22: 'לא רלוונטי' ברמת 'מאומת מול נתוני " +
      "הפרויקט', עם הנימוק 'לפי רישום אובייקטי הפונקציה של הפרויקט: השם אינו אובייקט SAP תקני; תמיכה " +
      "ב-S/4HANA On-Premise: לא צוין' וההמלצה 'השם אינו אובייקט SAP תקני; לתקן את ההפניה במאגר'. הערכים " +
      "שנכנסים למיפוי הם verificationStatus‏ 'invalid-name' מ-PM_ENRICHMENT ו-s4OnPremSupport‏ 'unknown' " +
      "מהרשומה הנגזרת, שכן פונקציית העזר inv() אינה קובעת שדות תמיכה; אותה שורה נושאת עדיין את הטרנזקציות " +
      "IE01, IE02, IE03, IH08, IE05 ואת טבלת EQUI מרשומת הבלופרינט הנגזרת, ואת stability‏ 'Released' שנגזר " +
      "לפני החלת התיקון, סטייה פנימית שנמדדה ואינה מתוקנת כאן. רשומה זו מחליפה את התצוגה ב'נדרש אימות נוסף' " +
      "ברמת 'מקורות סותרים', באותו דפוס שבו נכתבו BAPI_MEASUREMENTPOINT_CREATE, ‏BAPI_ALM_NOTIF_LIST_FILTER " +
      "ו-BAPI_ALM_NOTIF_TASK_ADD: 'לא רלוונטי' ברמת מאגר מאומת הוא פסק דין חזק מדי לשם שהמאגר עצמו סותר את " +
      "עצמו לגביו ושאין עליו מקור רשמי. (3) מדוע conflicting_sources ולא 'מאומת מול תיעוד SAP רשמי': שלוש " +
      "הראיות הרשמיות מאמתות את ערוץ ה-OData להתקנת ציוד ב-2025 FPS01 ואת ה-BAPIs של IE4N ב-ECC 6.0 EHP5, " +
      "לא את נושא הרשומה עצמו. (4) אין successor: אף מקור רשמי אינו מציג אובייקט כיורש של השם השנוי " +
      "במחלוקת; שירות API_EQUIPMENT ופעולת InstallEquipment אינם מזהים ביקום הרשומות של הפרויקט " +
      "(cds:I_Equipment היא תצוגת VDM ולא השירות); BAPI_EQUI_INSTALL קיים ביקום ונרשם כ-xref בלבד, מפני שאף " +
      "עמוד SAP רשמי שנבדק אינו נוקב בשמו; BAPI_EQUI_DISMANTLE, ‏BAPI_IE4N_BOM_INSTALL " +
      "ו-BAPI_IE4N_BOM_REMOVE אינם מזהים ביקום ולכן אינם xref. הכינוי BAPI_EQMT_INSTALLFL נרשם כ-alias כדי " +
      "שאיות האקדמיה יגיע לרשומה זו, לא כאישור לקיומו. (5) עמוד 'Function Imports for Equipment' ‏(loio " +
      "4373216a4f874dc1aa4b40b742998066) עלה בשש שאילתות, בכל שש ההרצות ב-versionId‏ 2023.latest ולא פעם " +
      "אחת ב-2025.001, גם בשאילתה שננעלה ל---version 2025.001; תקציריו מציגים 'Install equipment with " +
      "functional location POST - <host>/sap/opu/odata/sap/API_EQUIPMENT/InstallEquipment?', 'Install " +
      "equipment with superordinate equipment POST' על אותו נתיב ו-'Dismantle equipment for functional " +
      "location or superordinate equipment POST - " +
      "<host>/sap/opu/odata/sap/API_EQUIPMENT/DismantleEquipment'. רשומת 'Equipment Events' במדריך ה-API " +
      "‏(2023.latest, loio 2316c15a8dba438e9e9d1fa73e139174) ורשומת What's New של 2023 FPS03 ‏(loio " +
      "7b5769ebec5b4b0b8727dea03e1cf8e9) נוקבות באירועים Equipment.InstdAtFuncLoc, DsmtldFrmFuncLoc, " +
      "InstdOnSuprEquip ו-DsmtldFrmSuprEquip. כל אלה הקשר תומך ולא צורפו כראיה בגלל אי-התאמת הגרסה. (6) " +
      "עמודי ההקשר התפקודי במדריך Technical Objects (CS-BD/PM-EQM) לגרסת 2025.001 שנראו: 'Installing " +
      "Equipment' ‏(loio 0479bb53707db44ce10000000a174cb4), 'Installing/Dismantling from the Equipment " +
      "Master Record' ‏(0d79bb53707db44ce10000000a174cb4), 'Installing/Dismantling Equipment from the " +
      "Functional Location Master Record' ‏(0179bb53707db44ce10000000a174cb4), 'Installing Equipment in a " +
      "Superior Piece of Equipment' ‏(2579bb53707db44ce10000000a174cb4), 'Installing Equipment with " +
      "Simultaneous Material Movement' ‏(a47abb53707db44ce10000000a174cb4) ו-'Dismantling Equipment' " +
      "‏(0779bb53707db44ce10000000a174cb4); אף תקציר אינו נוקב בשם BAPI או בקוד טרנזקציה. המשפט המצוטט " +
      "בהמלצה, 'creates a new entry in the equipment usage list', נמדד בכתיבה ב-2026-09-22 בתקצירי שני " +
      "עמודי Installing/Dismantling (loio 0d79bb53 ו-0179bb53, 2025.001) בנוסח המלא 'When you install a " +
      "piece of equipment, the system - if it is set up accordingly - creates a new entry in the equipment " +
      "usage list. This contains the current data for the piece of equipment'; יצירת הרשומה מותנית אפוא " +
      "בהגדרות המערכת, ואף תקציר אינו נוקב בשמות הטבלאות EQUZ או ILOA. תצוגת ה-VDM‏ 'Equipment " +
      "Install/Dismantle History' ‏(I_EquipInstallationHistoryC, ‏2023.latest, loio " +
      "a18e976c8a244478a79e3b4177d525dc) אינה xref כי אין לה דף בדאטהסט. (7) מסמך ה-Release Notes של ECC " +
      "6.0 EHP3 ‏(Chapter_03__Release_Notes_Corporate_ServicesE.PDF, זה שנקרא במלואו ברשומת " +
      "BAPI_EQUI_CHANGE) הורד וחולץ שוב היום (HTTP 200, ‏279,538 בתים): הוא נוקב ב-BAPI_EQUI_CHANGE ובמשפחת " +
      "BAPI_FUNCLOC_* של LOG_EAM_CI_2, ובכללם 'BAPI_FUNCLOC_STRUC_ASSIGN, BAPI_FUNCLOC_STRUC_UNASSIGN, " +
      "BAPI_FUNCLOC_STRUC_REPLACE You can use these BAPIs to install, dismantle, or exchange a functional " +
      "location at a superior functional location', כלומר התקנת מיקום פונקציונלי ולא ציוד; המחרוזות EQMT " +
      "ו-EQUI_INSTALL אינן מופיעות בו. כתובת המקבילה האנגלית של מסמך EHP5 שנוחשה לפי דפוס הכתובת החזירה " +
      "מעטפת HTML ולא מסמך, ולכן רק הגרסה הגרמנית מצוטטת. מדריך היישום של PEO ‏(2021) ומדריך ACF " +
      "Integration Extensibility ‏(2211), שני PDF שהחיפוש החזיר לשם המדויק, הורדו ונסרקו: אינם מכילים EQMT " +
      "או EQUI_INSTALL, וה-ACF נוקב רק ב-BAPI_ITOB_SEL_OBJECTTYPE ו-BAPI_ITOB_T_SEL_OBJECTTYPE. (8) שמות " +
      "פרמטר יעד ההתקנה נכתבים בשלושה איותים במאגר, אף אחד לא אומת ב-SE37: 'FUNCTLOC/SUPEQUI' בקטלוג " +
      "הפונקציות, 'FUNCLOC / SUPEQUI' בתוספת PM ו-'FUNCLOC / SUPERIOR_EQUIPMENT, INSTALL_DATE' ברשומת " +
      "ה-sweep של BAPI_EQUI_INSTALL; הרשומה מצטטת ואינה מכריעה. זמינות ב-S/4HANA Cloud Public Edition לא " +
      "נבדקה. אין xref לאפליקציית Fiori: הבלופרינט נוקב 'Manage Technical Objects (F2079)' " +
      "ו-data/fiori/apps.ts נוקב F2730A, ואף מזהה לא אומת מול ספריית ה-Fiori; עמוד 'Find Technical Object' " +
      "‏(Maintenance Management, 2025.001, loio 4dd5a057b76f9f2de10000000a44147b) מתאר התקנה ופירוק של ציוד " +
      "משני עם כללי תאריך באפליקציה שמזהה שלה אינו בתקציר. מספר ה-KBA‏ 2878950 שמופיע בתקציר אובייקט " +
      "המיגרציה 'PM - Equipment' אינו נרשם, כי אין לו כתובת me.sap.com או repoRef.",
  },

  /* ----------------------------- fm:BAPI_GOODSMVT_GETDETAIL */
  {
    id: "fm:BAPI_GOODSMVT_GETDETAIL",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "BAPIs/IDocs in SAP S/4HANA Cloud Public Edition | Extend and Integrate Your SAP S/4HANA Cloud Public " +
                     "Edition",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/2cf48091d5864284ac4541b86a8737fd.html?locale=en-US&state=PRODUCTION&version=2608.500",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        accessedAt: DATE22,
        claim: "תקציר העמוד למהדורת Public Edition 2608 נוקב בשם BAPI_GOODSMVT_GETDETAIL כלשונו בטבלת ה-BAPIs של " +
               "העמוד (עמודות 'Technical Name Description Communication Scenario'), מיד אחרי השורה " +
               "'BAPI_GOODSMVT_CREATE Goods Movement ‒ Create SAP_COM_0156, SAP_COM_0108'; פרגמנט אחר של אותו תקציר " +
               "מציג את השורה 'Goods Movement ‒ Read SAP_COM_0108' מיד לפני 'BAPI_GOODSMVT_GETITEMS Goods Movement ‒ " +
               "Read Items SAP_COM_0108, SAP_COM_0156', ולצדן 'BAPI_GOODSMVT_CANCEL Goods Movement ‒ Cancel " +
               "SAP_COM_0108' וה-IDocs‏ MBGMCA ('Goods Movement ‒ Cancel SAP_COM_0108') ו-MBGMCR (התקציר נקטע אחרי " +
               "'MBGMCR Goods', ולכן תיאורו לא נטען). העמוד פותח: 'You can use BAPIs (Business Application " +
               "Programming Interface) and IDocs to connect business ... processes across your system landscape or " +
               "to integrate SAP S/4HANA Cloud Public Edition with external systems' וקובע: 'The BAPIs and IDocs are " +
               "part of predefined communication scenarios'. שיוך השורה 'Goods Movement ‒ Read / SAP_COM_0108' " +
               "ל-BAPI_GOODSMVT_GETDETAIL נובע מסדר הטבלה (בין CREATE ל-GETITEMS) ולא מטקסט רציף בפרגמנט אחד. הרשומה " +
               "מתעדת את מהדורת הענן הציבורי בלבד ואינה קובעת דבר על On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      MATDOC_READ_API,
      {
        sourceType: "sap_help",
        sourceTitle: "Archiving Material Documents (MM-IM) | Supply Chain",
        url:
          "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/677f0a4e71d7487ebb70683014761789/75bcb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "מודל הנתונים של מסמכי החומר ב-S/4HANA On-Premise 2025 FPS01: 'in the MM-IM area: There is a new " +
               "single table MATDOC instead of the existing tables MKPF and MSEG', 'You use the archiving object " +
               "MM_MATBEL to archive data from the following table: MATDOC (material documents)' ו-'The delete " +
               "program deletes the archived material documents from the database table MATDOC'. רשומה נוספת מאותו " +
               "חיפוש ואותה מהדורה, 'Purging and Precompacting of Material Document Data: Lifecycle Management' " +
               "(Supply Chain, loio 7a29ed568b0c41828a4e2c8da9ae1082): 'Material document posting data is written in " +
               "the table MATDOC which combines header as well as item [information]' ו-'The data in table MATDOC " +
               "with RecordTypes MDOC and MDOC_CP represents material documents and is used first to display " +
               "material document postings, for example, via SAP Fiori app Material Document Overview'. אף אחד משני " +
               "העמודים אינו נוקב ב-BAPI; הקביעה שה-BAPI קורא נתונים שמקורם ב-MATDOC היא טענת מאגר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת קטלוג הפונקציות של הפרויקט, רישום ה-BAPI המועשר (sweep) והבלופרינט של תחזוקת מפעל - " +
                     "BAPI_GOODSMVT_GETDETAIL",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE22,
        claim: "המאגר מתעד: שליפת פרטי מסמך חומר (תנועת מלאי), כותרת ופריטים לפי מספר מסמך ושנה; 'MM-IM, נלווה " +
               "לתנועות פקודות ייצור/אחזקה (GI/GR). QA בודק תנועה שנרשמה מול פקודה'; ECC: 'זמין ב-ECC (MKPF/MSEG)'; " +
               "S/4: 'זמין ב-S/4HANA; הנתונים מ-MATDOC (MKPF/MSEG כ-Compatibility Views)'; פרמטרי קלט " +
               "MATERIALDOCUMENT / MATDOCUMENTYEAR (חובה), פלט GOODSMVT_HEADER / GOODSMVT_ITEMS ו-RETURN; טרנזקציות " +
               "קשורות MB03 ו-MIGO, טבלאות MATDOC ו-MSEG, מודול PP-PI ‏(data/function-intel.ts). רישום ה-sweep: הצגת " +
               "פרטי מסמך חומר, כותרת ופריטים, קריאה בלבד; verified-docs, s4OnPremSupport yes, cloudSupport unknown, " +
               "operationType Read, קטגוריה GoodsMovement, RFC yes, requiresCommit no, stability Released, כאשר ערכי " +
               "s4OnPremSupport ו-stability הם ברירות המחדל של תבנית ה-sweep ולא נתון ייעודי " +
               "‏(data/bapi-enrichment.sweep.ts). הבלופרינט של תחזוקת מפעל מצמיד את הפונקציה לטבלת MKPF בנושא 9 " +
               "(אינטגרציית מלאי ורכש PM-MM) בתווית 'שליפת פרטי מסמך חומר', כשלטבלה עצמה רשומה הערת S/4 'הוחלף - " +
               "מאוחד ב-MATDOC' ו-'MATDOC (MKPF=View תאימות)' ‏(data/sapData.pm.ts). data/s4-objects.ts אינו נושא " +
               "רשומה ל-GETDETAIL (רק ל-BAPI_GOODSMVT_CREATE), ו-BASELINE.md מתעד לדף הפונקציה טון S/4 'changed' " +
               "שנגזר מהצמדת MKPF. שמות הפרמטרים, אובייקט ה-BOR והקריאה ללא COMMIT נשענים על המאגר בלבד, כי אף תקציר " +
               "רשמי שנקרא אינו מונה אותם.",
        verificationLevel: "repository_verified",
        repoRef: "data/function-intel.ts#BAPI_GOODSMVT_GETDETAIL",
      },
    ],
    status: {
      status: "released_api_available",
      he: "‏BAPI_GOODSMVT_GETDETAIL הוא ה-BAPI לקריאת מסמך חומר בודד (כותרת ופריטים לפי מספר מסמך ושנה), הצד " +
          "הקורא של BAPI_GOODSMVT_CREATE. במערך התיעוד של S/4HANA On-Premise לא נמצאה רשומת help.sap.com " +
          "שתקצירה נוקב בשמו: ארבע הרשומות שהחיפוש המדויק החזיר חזרו ללא תקציר, ותקצירי עמודי ניהול המלאי, EWM " +
          "ו-WMS מבוזר במהדורת 2025 FPS01 מונים רק את BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL. השם כן מופיע " +
          "כלשונו בתיעוד רשמי של SAP S/4HANA Cloud Public Edition 2608, בטבלת ה-BAPIs/IDocs לצד " +
          "BAPI_GOODSMVT_CANCEL, BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_GETITEMS כחלק מתרחישי תקשורת מוגדרים " +
          "מראש, ובנושא What's New של SAP ERP 6.0 EHP7 (מצוטט בהערות); זמינותו במהדורת On-Premise נשענת על רובד " +
          "המאגר (verified-docs, s4OnPremSupport yes). ב-S/4HANA מסמכי החומר נשמרים בטבלה אחת, MATDOC, במקום " +
          "MKPF ו-MSEG, ולכן קריאה דרך ה-BAPI מחזירה נתונים שמקורם ב-MATDOC כשהטבלאות הישנות משמשות תצוגות " +
          "תאימות בלבד; שמות הפרמטרים (MATERIALDOCUMENT, MATDOCUMENTYEAR, GOODSMVT_HEADER, GOODSMVT_ITEMS, " +
          "RETURN) נשענים על המאגר בלבד. לצד ה-BAPI קיים שירות OData מתועד לאותו תרחיש קריאה: Material " +
          "Documents - Read, Create ‏(API_MATERIAL_DOCUMENT, נתיב API_MATERIAL_DOCUMENT_SRV), שעמוד Read " +
          "Material Documents במדריך APIs for Inventory למהדורת 2025 FPS01 מתעד בו GET על הישויות " +
          "A_MaterialDocumentHeader ו-A_MaterialDocumentItem, לפי מפתח או בסינון, עם החזרת נתוני כותרת ופריט " +
          "בתגובה. זו טענת חלופה מתועדת ולא טענת החלפה: אף מקור רשמי שנסרק אינו מוציא את ה-BAPI משימוש או מכריז " +
          "על יורש, ולכן אין שדה successor.",
      edition: "on-premise",
      release: "2025.001",
      source: MATDOC_READ_API,
      recommendedAction: "בממשקי RFC קיימים (בקרת ניפוק 261 לפקודת תחזוקת מפעל, בדיקת קבלה 101 לפקודת תהליך בתעשיות תהליכיות, " +
                         "השוואת מסמך חומר מול הפקודה) אפשר להמשיך לקרוא מסמכי חומר דרך BAPI_GOODSMVT_GETDETAIL, לאחר אימות " +
                         "קיומו, סטטוס השחרור שלו ורשימת הפרמטרים בפועל במערכת היעד ‏(SE37 או BAPI Explorer), כי אף תקציר " +
                         "On-Premise אינו נוקב בשמו; הקריאה אינה דורשת BAPI_TRANSACTION_COMMIT לפי המאגר. לאינטגרציות חדשות " +
                         "מבוססות HTTP להעדיף את שירות ה-OData‏ Material Documents - Read, Create " +
                         "‏(API_MATERIAL_DOCUMENT_SRV): GET על A_MaterialDocumentHeader או A_MaterialDocumentItem לפי מפתח " +
                         "הכותרת (MaterialDocumentYear, MaterialDocument, כמודגם בתקציר Cancel Material Documents at Header " +
                         "Level) או בסינון; מפתח הפריט המלא לא הוחזר באף תקציר ויש לאמתו מול השירות, ולאמת ישויות, שדות " +
                         "ומגבלות מול המדריך APIs for Inventory ומול מערכת חיה; אין להתייחס ל-API כמחליף חובה של ה-BAPI. " +
                         "לדיווח ולפיתוח ABAP חדש להעדיף תצוגת CDS על SELECT ישיר מ-MKPF ומ-MSEG, ולשים לב שהתצוגה " +
                         "I_MaterialDocumentItem הוצאה משימוש ב-2021 לטובת I_MaterialDocumentItem_2 (אינה מזהה בדאטהסט). " +
                         "בבדיקות המרה: לקרוא דרך ה-BAPI מסמך שנרשם ב-MIGO או ב-BAPI_GOODSMVT_CREATE, להשוות מול MB03 ומול " +
                         "MB51, ולזכור שקריאה ישירה מ-MKPF/MSEG בקוד לקוח מנותבת לתצוגות תאימות מעל MATDOC.",
    },
    xrefs: [
      "fm:BAPI_GOODSMVT_CREATE",
      "fm:BAPI_GOODSMVT_GETITEMS",
      "table:MKPF",
      "table:MSEG",
      "obj:material-document",
      "cds:I_MaterialDocumentItem",
      "tx:MB03",
      "tx:MIGO",
      "tx:MB51",
      "fiori:F0843",
      "bp:matdoc-read-through-compatibility",
    ],
    lastVerifiedAt: DATE22,
    notes:
      "(1) הסטטוס 'קיים API משוחרר' נסמך על עמוד Read Material Documents ‏(loio " +
      "78f5a8461d554cc38b3af2d07d6f9c8e, ‏2025.001) במדריך APIs for Inventory; זו חלופה מתועדת ולא טענת " +
      "החלפה רשמית של ה-BAPI, ולכן אין יורש ברשומה. הראיה חופפת בחלקה לקבוע המשותף GOODSMVT_ODATA_API " +
      "שברשומת fm:BAPI_GOODSMVT_CREATE ‏(Material Documents - Read, Create, loio " +
      "d4c919581bc30a02e10000000a44147b); כאן נבחר עמוד פעולת הקריאה כמקור הסטטוס כי הוא זה שמתעד את GET. " +
      "(2) חיפוש השם המדויק במערך S/4HANA On-Premise החזיר ארבע רשומות ללא תקציר ('BAPIs for the Log', " +
      "Logistics General, 2025.001, loio 8081c1536ca9b54ce10000000a174cb4; 'Deep Create Characteristic " +
      "Value Combination and Time Series', APIs for Availability Checks, 2023.latest; שני נושאי What's New " +
      "1709), ולכן אף אחת מהן אינה מצוטטת: שאילתת המשך על 'BAPIs for the Log' החזירה תקציר על " +
      "CALO_DB_LOG_ON_OFF בלבד. תקצירי העמודים On-Premise 2025 FPS01 שנוקבים ב-BAPIs של ניהול מלאי " +
      "('Communication of Goods Movements from Inventory Management to EWM', loio " +
      "8a532e4e6aaf4f4b97fd2f014f9837e0; 'Integration of a Decentralized WMS', loio " +
      "b7706754e90d8c4ce10000000a4450e5) מונים רק את BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL. ממצא תחום " +
      "לחיפוש, לא שלילה. (3) מקור רשמי נוסף שנוקב בשם ולא נשמר כראיה נפרדת (גבול ארבע ראיות): 'Material " +
      "Segmentation Across Logistics (New)' ב-What's New in SAP Enhancement Package 7 for ERP 6.0 ‏(SAP " +
      "ERP, 6.17.latest, loio da262953587d2c3ee10000000a423f68, " +
      "https://help.sap.com/docs/SAP_ERP/e8497383bec444069418aba9a1f578de/da262953587d2c3ee10000000a423f68.html?locale=en-US&state=PRODUCTION&version=6.17.latest), " +
      "שתקצירו מונה 'BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_GETDETAIL BAPI_GOODSMVT_GETITEMS " +
      "BAPI_INCOMINGINVOICE_GETDETAIL BAPI_INCOMINGINVOICE_COMPLAIN BAPI_MATPHYSINV_GETDETAIL " +
      "BAPI_MATPHYSINV_GETITEMS BAPI_RESERVATION_CREATE1' ובפרגמנט אחר 'BAPI_DELIVERY_GETLIST " +
      "BAPI_GOODSMVT_CREATE BAPI_GOODSMVT_GETDETAIL'; המשפט המקדים לרשימה לא הוחזר באף תקציר, ולכן לא נטען " +
      "מה הרשימה קובעת. זו ראיית ECC (מהדורת ecc), לא S/4HANA. (4) רשימות הפישוט נבדקו על הטקסט המלא " +
      "המאוחסן: SIMPL_OP2023.pdf ‏(2023 FPS3, גרסת מסמך 1.35, 1482 עמודים) ו-SIMPL_OP2025.pdf ‏(2025 FPS1, " +
      "1514 עמודים); המחרוזת BAPI_GOODSMVT_GETDETAIL אינה מופיעה באף אחת מהן. פריט 27.6 ‏(2023 FPS3) / " +
      "15.3.9 ‏(2025 FPS1) S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM, כפי שנקרא ברשומת " +
      "fm:BAPI_GOODSMVT_CREATE, מפנה את MB02/MB03 ל-MIGO_DIALOG ואת קוד הלקוח ל-BAPI_GOODSMVT_CREATE " +
      "ול-BAPI_GOODSMVT_CANCEL בלבד; הוא אינו נוקב ב-BAPI לקריאה, ו-BUS2017 מופיע שם רק לצד CREATEFROMDATA " +
      "/ BAPI_GOODSMVT_CREATE. (5) ראיית Public Edition: טבלת ה-BAPIs היא בעמודות Technical Name / " +
      "Description / Communication Scenario; שיוך השורה 'Goods Movement ‒ Read / SAP_COM_0108' " +
      "ל-BAPI_GOODSMVT_GETDETAIL נובע מסדר הטבלה (בין CREATE ל-GETITEMS) ולא מטקסט רציף בתקציר אחד; מזהה " +
      "תרחיש התקשורת SAP_COM_0108 מופיע כלשונו בתקציר, אך שמו התיאורי של התרחיש לא הוחזר באף תקציר ולכן לא " +
      "נטען. תיאור ה-IDoc‏ MBGMCR נקטע בתקציר אחרי 'MBGMCR Goods' ולכן לא נטען. הרשומה מתעדת זמינות בענן " +
      "הציבורי בלבד; הזמינות ב-On-Premise נשארת מבוססת מאגר. (6) תצוגת ה-CDS: הנושא 'Deprecation of CDS " +
      "Views' ב-What's New 2021 ‏(loio 6eac4f4b1c024fc5a0d48c51ca66e83c, ‏2021.000) קובע 'The following CDS " +
      "views were deprecated in SAP S/4HANA 2021: Material Document Header (I_MaterialDocumentHeader) " +
      "Material Document Item (I_MaterialDocumentItem)', ועמוד ה-VDM 'Material Document Item' " +
      "‏(2023.latest, loio 14305f6e8cb842bbb1647ffd5a30ca31) קובע 'CDS View Name I_MaterialDocumentItem_2 " +
      "... Status Released ... This view is the successor view for I_MaterialDocumentItem'. לכן הרמז 'CDS " +
      "I_MaterialDocumentItem כיורש' לא אומץ: התצוגה עצמה הוצאה משימוש, יורשתה I_MaterialDocumentItem_2 " +
      "אינה מזהה בדאטהסט, ואף מקור רשמי אינו מציג תצוגת CDS כמחליף של ה-BAPI. ה-xref " +
      "ל-cds:I_MaterialDocumentItem נשמר כקשר לרשומת האימות שלה, שמתעדת את ההוצאה משימוש. (7) גופי עמודי " +
      "help.sap.com הם מעטפות JavaScript ולא נקראו; רק כותרת, מדריך, גרסה ותקציר של כל רשומה. עמוד תוכן " +
      "התמיכה 'Goods Movements with BAPI' " +
      "‏(https://help.sap.com/docs/SUPPORT_CONTENT/erpscm/3362167803.html) שהוחזר בחיפוש מוגבל-דומיין נבדק " +
      "ב-WebFetch והחזיר כותרת בלבד ללא גוף, ולכן אינו מצוטט. מדריך SAP Digital Manufacturing Integration " +
      "Guide (מהדורת מסמך 2502, 582 עמודים), שהחיפוש קישר לשם, הורד ונסרק במלואו: המחרוזת GETDETAIL אינה " +
      "מופיעה בו והוא נוקב ב-MB_MES_GOODSMVT_CREATE בלבד. רישום ה-Business Accelerator Hub לשירות " +
      "API_MATERIAL_DOCUMENT_SRV לא נקרא (מעטפת JavaScript, דורש מפתח API). (8) מה שנשען על המאגר בלבד: " +
      "שמות הפרמטרים (MATERIALDOCUMENT, MATDOCUMENTYEAR, GOODSMVT_HEADER, GOODSMVT_ITEMS, RETURN), אובייקט " +
      "ה-BOR של ה-BAPI, הקריאה ללא COMMIT, וערכי stability 'Released' ו-s4OnPremSupport 'yes' שהם ברירות " +
      "מחדל של תבנית ה-sweep. אימות ב-SE37 / BAPI Explorer במערכת היעד נדרש לפני הסתמכות. (9) xrefs: " +
      "fiori:F0843 ‏(Post Goods Movement) הוא יישום הרישום ולא יישום הצגה; יישום Material Documents " +
      "Overview ‏(F1077, הנזכר ברשומת tx:MB03, ובעמוד ה-Lifecycle כ-'Material Document Overview') אינו מזהה " +
      "בקטלוג ה-Fiori של הפרויקט. BAPI_GOODSMVT_CANCEL, MIGO_DIALOG ו-I_MaterialDocumentItem_2 אינם מזהים " +
      "בדאטהסט; טבלת MATDOC מיוצגת דרך obj:material-document. bp:matdoc-read-through-compatibility מקושר " +
      "בגלל ניתוב הקריאה מ-MKPF/MSEG לתצוגות תאימות. (10) המצב שנמדד לפני הרשומה: fromFuncRegistry על שורת " +
      "ה-sweep (verified-docs, s4OnPremSupport yes) מחזיר 'ללא שינוי ב-S/4HANA' ברמת 'מאומת מול נתוני " +
      "הפרויקט' (נמדד בהרצת lib/evidence/s4-status.ts ב-Node 26), בעוד BASELINE.md:56 מתעד לאותו דף טון S/4 " +
      "'changed' שנגזר מהצמדת טבלת MKPF ‏(GETDETAIL→MKPF). data/s4-objects.ts אינו נושא רשומה ל-GETDETAIL " +
      "(רק ל-CREATE). עם הרשומה הזו הסטטוס המחובר מציג את התמונה הרשמית: BAPI שממשיך להישלח (Public Edition " +
      "2608) עם שירות OData מתועד לקריאה לצדו. (11) לא צוטט SAP Note או KBA: אף שאילתה לא החזירה רשומה כזו " +
      "הנוקבת ב-BAPI. ספירות התוצאות של שירות החיפוש אינן יציבות בין הרצות ולכן אינן נרשמות. תאריך הגישה " +
      "המוטבע הוא 2026-09-22 (כלי החיפוש מדפיס 2026-09-21 לפי אזור זמן). (12) תיקוני ביקורת: ה-loio " +
      "75bcb6531de6b64ce10000000a174cb4 ‏(Archiving Material Documents (MM-IM)) מוחזר מהאינדקס תחת המדריך " +
      "Supply Chain (נתיב 677f0a4e71d7487ebb70683014761789) ולא תחת Sourcing and Procurement; ה-URL והכותרת " +
      "תוקנו בהתאם. מפתח הפריט של פעולת הביטול ברמת פריט (MaterialDocumentYear, MaterialDocument, " +
      "MaterialDocumentItem) לא הוחזר באף תקציר של loio 2b1124c6321a47559518f5b5bdc1db72 ולכן הוסר מהראיה " +
      "ומההמלצה; נשמרו רק הפרגמנטים שהוחזרו (CancelItem function import, מאפייני Reversed*, ומפתח הכותרת " +
      "מתקציר Cancel at Header Level).",
  },
];
