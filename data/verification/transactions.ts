/* Project NEO · verification overlay — transactions (`tx:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02): 16 records carrying Tier-1 evidence from
   help.sap.com search records and the official Simplification List PDFs
   (scripts/sap-help-search.mjs; loio + versionId re-verified live at audit),
   alongside Tier-2 repository evidence, plus the tx:MIGO worked example.
   Batch 2 (2026-09-07, written 2026-09-14): 16 more audited records (PM
   notifications/orders/plans/technical objects, PP-PI process orders and
   master recipe, PP production order/confirmation, MRP, MIGO); the tx:MIGO
   foundation seed was replaced by its full record. Every claim is bounded by
   the snippet, the PDF page read, or the named repository record; auditor
   downgrades applied in full; no record carries a reviewer field. Open
   conflicts live in audit/s4-enrichment/research-queue-transactions.md. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";
const DATE3 = "2026-09-07";

/* ------------------------------------------------------------- shared docs */

/** Simplification List for SAP S/4HANA 2023 FPS3 · item 27.6 (MM-IM-GF). */
const SIMPL2023_MMIM = (claim: string, accessedAt: string = DATE2): Evidence => ({
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 — Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt,
  claim,
  verificationLevel: "sap_official_verified",
});

const DOC_BATCHES_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/dcfeb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001";
const MIGO_EXG_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/7782cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001";
const ENJOY_PO_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/8082cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001";
const NON_ASSIGNED_PUR_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/b406b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001";
const INFOUPDATE_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/517fb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001";
const SLS_CONSTRAINTS_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/03a7c7536e8e2a4be10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001";
const FEATURE_CMP_PI_URL =
  "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001";

/* status sources that must be shared between evidence[] and status.source */

const MB01_SIMPL: Evidence = SIMPL2023_MMIM(
  "פריט 27.6 קובע שטרנזקציות ה-MB‏ (ובהן MB01, MB02, MB03, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, " +
    "MBRL, MBSF, MBSL, MBST, MBSU, MBBM) ‏'have been replaced by the single-screen generalized transaction MIGO or " +
    "the BAPI's BAPI_GOODSMVT_CREATE and BAPI_GOODSMVT_CANCEL'. הקודים עדיין קיימים אך קריאה מהתפריט מעלה הודעת " +
    "שגיאה ('calling these transaction codes from the menu has the consequence that an error message is raised'), " +
    "'The transaction codes will be deprecated in the near future', ואין להשתמש בהם בקוד לקוח ('shall not be used " +
    "in customer coding') — במיוחד מ-S/4HANA OP1610 ומעלה, בגלל מנגנון נעילה ישן וסיכון אי-עקביות מלאי. מספרי " +
    "SAP Note 2210569 ‏('Obsolete Material inventory management transactions') ו-2319579 מופיעים כלשונם בגוף המסמך.",
);

const MB02_SIMPL: Evidence = SIMPL2023_MMIM(
  "טרנזקציות ה-MB, ובהן MB02, הוחלפו ב-MIGO חד-המסך או ב-BAPI_GOODSMVT_CREATE ‏/ BAPI_GOODSMVT_CANCEL. קודי " +
    "הטרנזקציה עדיין קיימים, אך קריאה מהתפריט מעלה הודעת שגיאה והם מיועדים ליציאה משימוש. קוד לקוח המשתמש ב-MB02 " +
    "וב-MB03 יש להחליף במודול הפונקציה MIGO_DIALOG. מ-OP1610 ומעלה הטרנזקציות הישנות משתמשות במנגנון הנעילה הישן " +
    "(note 2319579), כך שרישום מקבילי מולן ומול MIGO ‏/ BAPI_GOODSMVT_CREATE עלול ליצור אי-עקביות מלאי. ‏SAP Note " +
    "2210569 מופיע כלשונו בפריט.",
);

const MB03_EXG_DISPLAY: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Displaying Exchange Data in a Material Document and in an Accounting Document | EXG - Exchanges",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/7e81cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "הנוהל להצגת מסמך חומר של קבלת טובין מנחה: 'Choose transaction MB03.' — ‏MB03 היא טרנזקציית הצגה מתועדת " +
    "בתיעוד ה-On-Premise של 2025 FPS01, בדפים שצוטטו ברשומה זו.",
  verificationLevel: "sap_official_verified",
};

const MB11_SIMPL: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 FPS1-3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt: DATE2,
  claim:
    "MB11 נמנית בין טרנזקציות ה-MB שהוחלפו בטרנזקציית המסך האחד MIGO או ב-BAPI_GOODSMVT_CREATE ‏/ " +
    "BAPI_GOODSMVT_CANCEL; קודי הטרנזקציה עדיין קיימים אך קריאה מהתפריט מעלה הודעת שגיאה, ואין להשתמש בהם בקוד " +
    "לקוח ('shall not be used in customer coding'). ‏SAP Note 2210569 ‏('Obsolete Material inventory management " +
    "transactions') נקוב כלשונו בפריט (Document Version 1.35,‏ 2025-02-25). המסמך חל גם על " +
    "SAP S/4HANA Cloud Private Edition 2023 FPS3.",
  verificationLevel: "sap_official_verified",
};

const MB1A_SIMPL1610: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 1610 Initial Shipment Stack · section 2.1.10.2 Availability of Transactions in MM-IM",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "1610",
  url: "https://help.sap.com/doc/PRODUCTION/pdfa4322f56824ae221e10000000a4450e5/1610%20000/en-US/SIMPL_OP1610.pdf",
  accessedAt: DATE,
  claim:
    "MB1A נמנית בין טרנזקציות ה-MB‏ (MB01, MB02, MB03, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, " +
    "MBSF, MBSL, MBST, MBSU) ש-'have been replaced by the single-screen generalized transaction MIGO'; הקודים " +
    "עדיין קיימים אך קריאה מהתפריט מעלה הודעת שגיאה, 'will be deprecated in the near future', וקוד לקוח צריך " +
    "להשתמש ב-BAPI_GOODSMVT_CREATE במקומם. טקסט הסעיף אינו מדפיס מספר SAP Note, ולכן לא צוטט מספר.",
  verificationLevel: "sap_official_verified",
};

const MB1C_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 FPS1 · 15.3.9 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE2,
  claim:
    "MB1C נמנית במפורש עם טרנזקציות ה-MB שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE ‏/ BAPI_GOODSMVT_CANCEL. קודי " +
    "הטרנזקציה עדיין קיימים, אך קריאה מהתפריט מעלה הודעת שגיאה, והקודים יוצאו משימוש בעתיד הקרוב ('will be " +
    "deprecated in the near future'). ‏SAP Note 2210569 מופיע כלשונו בגוף הפריט (בכתיב 0002210569).",
  verificationLevel: "sap_official_verified",
};

const MB31_DOC_BATCHES: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Documentary Batches in Inventory Management | Batch Management (LO-BM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: DOC_BATCHES_URL,
  accessedAt: DATE,
  claim:
    "הסניפט קובע: 'Note MB* transactions (for example, MB01, MB03, MB31, and MB11) are not supported', ובאותו " +
    "loio: ‏'Goods receipt for order and goods issue for order and network You can post the goods movements for " +
    "various order categories in the transaction MIGO'.",
  verificationLevel: "sap_official_verified",
};

const MBST_SIMPL: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 — Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (pp. 644-645)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03 (SIMPL_OP2023)",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt: DATE2,
  claim:
    "טרנזקציות ה-MB, ובהן MBST, הוחלפו ב-MIGO חד-המסך או ב-BAPI_GOODSMVT_CREATE ‏/ BAPI_GOODSMVT_CANCEL; קודי " +
    "הטרנזקציה עדיין קיימים אך קריאה מהתפריט מעלה הודעת שגיאה. הוראת הפריט: 'Replace customer coding using the " +
    "transaction MBST by making use of function module BAPI_GOODSMVT_CANCEL'. מנגנון הנעילה הישן (note 2319579) " +
    "מסכן עקביות מלאי ברישום מקבילי מול MIGO. ‏SAP Note 2210569 ‏('Obsolete Material inventory management " +
    "transactions') מופיע כלשונו במסמך, החל גם על SAP S/4HANA Cloud Private Edition 2023 FPS3.",
  verificationLevel: "sap_official_verified",
};

const ME21_ENJOY: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Enjoy Purchase Order | EXG - Exchanges",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: ENJOY_PO_URL,
  accessedAt: DATE2,
  claim:
    "'The Enjoy purchase order (transactions ME21N, ME22N, ME23N) replaces the previous purchase order " +
    "(transactions ME21, ME22, ME23)'; ובהמשך הסניפט: 'However, you can still use transactions ME21, ME22 and " +
    "ME23, and there are no functional limitations' — הטרנזקציות הקלאסיות עדיין שמישות.",
  verificationLevel: "sap_official_verified",
};

const ME22_ENJOY: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Enjoy Purchase Order | EXG - Exchanges",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: ENJOY_PO_URL,
  accessedAt: DATE2,
  claim:
    "'The Enjoy purchase order (transactions ME21N, ME22N, ME23N) replaces the previous purchase order " +
    "(transactions ME21, ME22, ME23)' — ‏ME22N נקובה כמחליפתה של ME22; הסניפט מוסיף שהטרנזקציות הקלאסיות עדיין " +
    "שמישות ('However, you can still use transactions ME21, ME22 and ME23').",
  verificationLevel: "sap_official_verified",
};

const ME23_ENJOY: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Enjoy Purchase Order | EXG - Exchanges",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: ENJOY_PO_URL,
  accessedAt: DATE2,
  claim:
    "טרנזקציות ה-Enjoy‏ ME21N/ME22N/ME23N מחליפות את ME21/ME22/ME23 ('replaces the previous purchase order'), " +
    "והעמוד מוסיף שהטרנזקציות הקודמות עדיין ניתנות לשימוש ('However, you can still use transactions ME21, ME22 " +
    "and ME23'). המחליפה של ME23 היא ME23N.",
  verificationLevel: "sap_official_verified",
};

const IW31_MES: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "DRF Integration for MES Processes | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/ad3345ec490e46e787e670334d8ab8ba.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE2,
  claim:
    "תיעוד 2025 FPS01 מונה בטבלת הטרנזקציות שלו 'IW31 Create maintenance order' ו-'IW32 Change maintenance order'.",
  verificationLevel: "sap_official_verified",
};

const IW41_SERVICE_APPS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Apps Used in Service with Advanced Execution | Service",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c9b5e9de6e674fb99fff88d72c352291/13972e812fd6416f950b9afd83900ecf.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE2,
  claim:
    "תיעוד 2025 FPS01 מונה את 'Enter PM Order Confirmation (IW41)' בין האפליקציות שבשימוש — ‏IW41 מתועדת בשימוש " +
    "במהדורת ה-On-Premise הנוכחית.",
  verificationLevel: "sap_official_verified",
};

const COR1_RETAIL: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Creating a Process Order | Retail",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/4671c13d2e5e498eb6978ed5ca6cb870.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE2,
  claim:
    "'Alternatively, you can use the transaction COR1 to create process order.' — ‏COR1 מתועדת כזמינה ליצירת " +
    "הזמנת תהליך בתיעוד SAP S/4HANA 2025 FPS01.",
  verificationLevel: "sap_official_verified",
};

const COR6N_SHIFT: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Shift-Related Confirmation | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/3400b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE2,
  claim:
    "הסניפט מונה 'Time ticket (single-screen entry) CO11N/COR6N' ולצדו 'Confirmation production/process order " +
    "(order header) CO15/CORK' — ‏COR6N היא דיווח ה-Time Ticket חד-המסך בצד הזמנות התהליך.",
  verificationLevel: "sap_official_verified",
};

/* ---------------------- status sources of the 2026-09-07 batch (16 records) */

const IW21_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Linear Data in Maintenance Documents | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/3a576ff7b13d4f59851307b8d49e0623.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Maintenance Management לגרסת 2025 FPS01 מונה את IW21 בטבלת הטרנזקציות של מסמכי התחזוקה שבהם " +
    "משולבים נתונים ליניאריים: 'Maintenance document Transaction Maintenance Notification IW21, IW22, " +
    "IW23, …' וכן 'Notification Item IW21, IW22, IW23, IW25, IW26' (כלשון הסניפט). IW21 מתועדת כטרנזקציית " +
    "הודעת תחזוקה ב-S/4HANA On-Premise 2025.001.",
  verificationLevel: "sap_official_verified",
};

const IW22_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Changing the Notification Type | Notifications (CS-CM-SN/PM-WOC-MN)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7f05ca069f8744759f48892c6d307fab/b0e2855487f92257e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד PM-WOC-MN למהדורת 2025 FPS01 מונה את IW22 כטרנזקציית השינוי של הודעות תחזוקה ושירות: 'you can " +
    "assign a different notification type when creating and changing maintenance and service " +
    "notifications (transactions iw21, iw22, iw51, and iw52) by choosing the Change Notification Type " +
    "pushbutton'. הסניפט מוסיף שניתן לשנות סוג הודעה רק כל עוד ההודעה טרם הושלמה ('you can only change " +
    "the notification type of maintenance and service notifications if the notification has not yet been " +
    "completed'), וההרשאה לכך נקבעת ב-Customizing for Plant Maintenance and Customer Service תחת " +
    "Maintenance and Service Processing, Maintenance and Service Notifications, Notification Creation, " +
    "Notification Types.",
  verificationLevel: "sap_official_verified",
};

const IW32_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Apps Used in Service with Advanced Execution | Service",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c9b5e9de6e674fb99fff88d72c352291/13972e812fd6416f950b9afd83900ecf.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Service של 2025 FPS01 מונה ברשימת האפליקציות שבשימוש, תחת הכותרת 'Apps Used in Maintenance " +
    "Management' (הסניפט ממשיך 'App Name Change' ונקטע), את 'Maintenance Order (IW32)' לצד 'Display " +
    "Maintenance Order (IW33)', 'Change PM Orders (IW38)' ו-'Enter PM Order Confirmation (IW41)'. המילה " +
    "'Change' לפני 'Maintenance Order (IW32)' נמצאת מעבר לקיטוע הסניפט; שם האפליקציה המלא נתמך בכותרת " +
    "רשומת ספריית ה-Fiori (ראיה נפרדת ברשומה).",
  verificationLevel: "sap_official_verified",
};

const IW38_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Working with Billable Maintenance Orders in List Views | Orders (CS-SE/PM-WOC-MO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/1e20f71ea1904df98d7d1386ddb73436.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Orders (CS-SE/PM-WOC-MO) של 2025 FPS01 קובע: 'You can work with billable maintenance orders in " +
    "list views using both SAP GUI and SAP Fiori apps' וכן 'You can view a list of billable maintenance " +
    "orders in SAP GUI transaction IW38 and in SAP Fiori apps for processing maintenance orders such as " +
    "Find Maintenance Orders and Operations, Find Maintenance Orders …' (הסניפט נקטע כאן). לעריכה בודדת: " +
    "'You can edit a billable maintenance order in SAP GUI transaction IW32 or in the Manage Maintenance " +
    "Orders app'. כלומר IW38 מתועדת ב-2025.001 כטרנזקציית SAP GUI פעילה לתצוגת רשימת הזמנות תחזוקה, לצד " +
    "אפליקציות ה-Fiori.",
  verificationLevel: "sap_official_verified",
};

const IP10_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Scheduling and Automatic Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/2d396b50389ff015e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Maintenance Planning לגרסת 2025 FPS01 מונה את אפשרויות התזמון: 'Schedule individual " +
    "maintenance plans (transaction IP10)', לצד 'Deadline monitoring (transaction IP30)', 'Mass schedule " +
    "maintenance plans (transaction IP30H)' ויומן התזמון ('transaction IBIPA or SLG1'). הקטע קובע: 'To do " +
    "this, it starts the scheduling of individual maintenance plans (transaction IP10)', וכי בתזמון " +
    "אוטומטי ניתן לתזמן תוכנית תחזוקה בפעם הראשונה או לתזמן אותה מחדש.",
  verificationLevel: "sap_official_verified",
};

const IP30_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Scheduling and Automatic Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/2d396b50389ff015e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Maintenance Planning של 2025 FPS01 מונה את IP30 בשמה המלא: 'In the transaction IP30 Deadline " +
    "Monitoring for Maintenance Plans, select the Application Log indicator' (הפקת יומן תזמון), ומציג " +
    "אותה בטבלת הפעילויות לצד 'Scheduling individual maintenance plans (transaction IP10)' ו-'Mass " +
    "schedule maintenance plans (transaction IP30H)'. אובייקט היומן של ניטור המועדים הוא IBIP ושל IP30H " +
    "הוא IP30H, כלשון הסניפט.",
  verificationLevel: "sap_official_verified",
};

const IE01_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Select Main Partner for a Technical Object | Technical Objects (CS-BD/PM-EQM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/6900131d1f9149fea8cdbc03e4e96188.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד האובייקטים הטכניים (CS-BD/PM-EQM) למהדורת 2025 FPS01 קובע: 'Equipment In Create Equipment app " +
    "(IE01) and Change Equipment app (IE02), you can select main partners for an equipment.' התקציר ממשיך " +
    "ב-'In Display Equipment app (IE03), you ca' ונקטע שם. IE01 מתועדת במהדורה הנוכחית כאפליקציית Create " +
    "Equipment הפעילה, לצד IE02 ו-IE03.",
  verificationLevel: "sap_official_verified",
};

const IL01_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Select Main Partner for a Technical Object | Technical Objects (CS-BD/PM-EQM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e98c7c41bbe8439e90daa5c114a7573b/6900131d1f9149fea8cdbc03e4e96188.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Technical Objects (CS-BD/PM-EQM) לגרסת 2025 FPS01 קובע: 'In Create Functional Location app " +
    "(IL01) and Change Functional Location (IL02), you can select main partners for a functional " +
    "location', וכן 'In the Display Functional Location app (IL03), you can view the main partners'. IL01 " +
    "נקובה בשמה כאפליקציית יצירת מיקום פונקציונלי בתיעוד ה-On-Premise העדכני (loio 6900131d); פריט " +
    "ה-What's New המקביל לגרסת 2022 (loio 1fdf47f4, רכיב PM-EQM-FL) מתעד את אותה יכולת כתקפה מ-SAP " +
    "S/4HANA 2022.",
  verificationLevel: "sap_official_verified",
};

const COR2_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Material Staging (with EWM) | Production Orders (PP-SFC)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/8800b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד S/4HANA On-Premise 2025 FPS01 מונה את COR2 כטרנזקציה פעילה להזמנות תהליך: 'Staging of Pick " +
    "Parts Directly in the Production or Process Order (Transactions CO02 and COR2)' וכן 'For process " +
    "orders, you can use transaction COR2 or COHVPI to trigger material staging' (כלשון הסניפט). CO02 " +
    "מיועדת להזמנת ייצור ו-COR2 להזמנת תהליך.",
  verificationLevel: "sap_official_verified",
};

const COR3_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Displaying a Process Order | Logistics — General (LO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/9e3388f3b5824635a8cb9207dd62d2eb.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "נוהל 'Displaying a Process Order' בתיעוד Logistics - General של S/4HANA 2025 FPS01 מנחה: " +
    "'Alternatively, you can use the transaction COR3 to display a process order. The initial screen for " +
    "display a process order appears.' נתיב התפריט המתועד: Logistics, Production-Process, Process Order, " +
    "Display, ולאחריו הזנת מספר ההזמנה (Order number).",
  verificationLevel: "sap_official_verified",
};

const CO01_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Order Integration | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/7d61c9ecd5754e8cb0e925639b5d8bb0.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד Production Planning and Control של 2025 FPS01 (שילוב הזמנת ייצור מול MES, loio " +
    "7d61c9ecd5754e8cb0e925639b5d8bb0) מנחה: 'You create a production order (for example, using " +
    "transaction CO01, Create Production Order). You release the production order.' ובהמשך: 'You make " +
    "changes to the production order already distributed (for example, using transaction CO02, Change " +
    "Production Order).' CO01 מתועדת כטרנזקציית היצירה של הזמנת ייצור במהדורה 2025.001.",
  verificationLevel: "sap_official_verified",
};

const CO11N_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Goods Movements in the Confirmation Transaction | Production Orders (PP-SFC)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/f3bbb8535c39b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "תיעוד SAP S/4HANA 2025 FPS01 (מדריך Production Orders, PP-SFC; loio " +
    "f3bbb8535c39b44ce10000000a174cb4) מתעד את CO11N כטרנזקציית ההזנה של Time Ticket להזמנת ייצור: 'In " +
    "the Enter time ticket for production order transaction (CO11N; referred to below as the time " +
    "ticket/confirmation transaction), you can post ...'. הסניפט קובע גם: 'In the time " +
    "ticket/confirmation transaction, automatic goods receipt and backflush are possible as long as you " +
    "have not created WIP batches for the production order'. כלומר CO11N מתועדת בשימוש במהדורת " +
    "ה-On-Premise הנוכחית, כולל קליטת מוגמר אוטומטית ו-Backflush.",
  verificationLevel: "sap_official_verified",
};

const MD01_STATUS_SRC: Evidence = {
  sourceType: "simplification_item",
  sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.2 S4TWL - MRP in HANA (PP-MRP), pp. 651-655",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE3,
  claim:
    "פריט 9.5.2 (רכיב יישום PP-MRP; Business Impact note 0002268085 'MRP Live on SAP HANA - MD01N') נוקב " +
    "ב-MD01 תחת 'Other Terms' וקובע בעמ' 653: 'Classic MRP (transactions MD01, MD02, MD03, MD40, MD41, " +
    "MD42, MD43, MD50, MD51 and jobs RMMRP000, RMMPS000) are still available in SAP S/4HANA but MRP live " +
    "(transaction MD01N) is considered the future technology. Classic MRP transactions are not part of " +
    "the compatibility pack. An end-of-life date for the classic MRP has not yet been defined.' בעמ' 655: " +
    "קובץ התכנון החדש PPH_DBVM משמש גם את ה-MRP הקלאסי ('the new planning file is also used by classic " +
    "MRP (transaction MD01, MD02, ...)'), וקריאת הנתונים של הטרנזקציות הקלאסיות (MD01, MD02, MD03) עברה " +
    "אופטימיזציה ל-HANA באמצעות AMDP ואינה ניתנת לכיבוי ב-S/4HANA ('not switchable in SAP S/4HANA as it " +
    "was possible in SAP ECC 617 and 618'). Simplified Sourcing חל גם על MD01 ('used in both the classic " +
    "MRP transactions MD01, MD02, etc. as well as in MRP live'). מספרי SAP Notes 2268085, 1914010, " +
    "2268069 ו-2268088 מופיעים כלשונם בגוף הפריט (Document Version 1.36). המסמך חל גם על SAP S/4HANA " +
    "Cloud Private Edition 2025 FPS1.",
  verificationLevel: "sap_official_verified",
};

const MD04_STATUS_SRC: Evidence = {
  sourceType: "simplification_item",
  sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 30.30 S4TWL - Graphical display of available quantity in MRP evaluations (PP-MRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt: DATE3,
  claim:
    "פריט 30.30 (רכיב PP-MRP; מספר SAP Note 3018123 מופיע כלשונו בגוף המסמך) קובע: 'In SAP ERP, within " +
    "the Stock and Requirements List (MD04), a graphical display of available quantity was available. " +
    "With the advancement of web-based applications, old chart technology like used here is no longer " +
    "supported.' לפי הפריט, תצוגה גרפית חדשה של הכמות הזמינה זמינה באפליקציות Manage או Check Material " +
    "Coverage, והפעולה הנדרשת: 'If planners are using the graphical display of available quantity in " +
    "Stock and Requirements List, encourage them to switch to the Manage or Check Material Coverage apps " +
    "for graphical evaluations.' בטקסט הפריט אין אמירה על הסרה או החלפה של הטרנזקציה MD04 עצמה.",
  verificationLevel: "sap_official_verified",
};

const MIGO_SIMPL: Evidence = SIMPL2023_MMIM(
    "פריט 27.6 קובע שטרנזקציות ה-MB להזנה ולהצגה של תנועות סחורה (MB01, MB02, MB03, MB04, MB05, MB0A, " +
    "MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU, MBBM) ‏'have been replaced by the " +
    "single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
    "BAPI_GOODSMVT_CANCEL', ובסעיף הפתרון: 'Use transaction MIGO or MMBE in dialog'. הפריט מציין שמגרסת " +
    "S/4HANA OP1610 הוכנס ל-MIGO ול-BAPI_GOODSMVT_CREATE מנגנון נעילה חדש ומשופר ('a new enhanced and " +
    "improved lock concept has been introduced for transaction MIGO and the BAPI BAPI_GOODSMVT_CREATE'), " +
    "בעוד הטרנזקציות הישנות עדיין משתמשות במנגנון הישן (note 2319579). בשדה Other Terms מופיעים MIGO_GR, " +
    "MIGO_GI ו-MIGO_ST. מספר SAP Note 2210569 מופיע כלשונו בטבלת ההערות של הפריט.",
  DATE3,
);

const MIGO_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3e07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "רשומת החיפוש של help.sap.com לגרסת On-Premise 2025 FPS01 (מדריך Materials Management) מונה תחת " +
    "'Activities in Materials Management' את הצמדים 'Goods Movement MIGO', 'Goods Issue MIGO_GI', 'Goods " +
    "Receipt from External Procurement MIGO_GR' ו-'Goods Receipt for Order'. כלומר MIGO ווריאנטי הכניסה " +
    "שלה מתועדים במהדורה הנוכחית כקודי טרנזקציה לתנועות סחורה; באותה רשימה מופיעים גם MB1B (Transfer " +
    "Posting), MBST (Cancel Material Document), MBSU ו-MB90.",
  verificationLevel: "sap_official_verified",
};

const C201_STATUS_SRC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Creating a Master Recipe | Logistics — General (LO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/6b0f0159d0cd4d1d8227a1427b40bfe2.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE3,
  claim:
    "נוהל 'Creating a Master Recipe' בתיעוד 2025 FPS01 קובע: 'Alternatively, you can also use the " +
    "transaction C201 to create a master recipe. Enter the following mandatory fields: Material Plant'. " +
    "הנוהל מתואר להקשר של חומרים רלוונטיים לסגמנטציה ('a completely new master recipe for segmentation " +
    "relevant materials') תחת Manufacturing, Production Engineering, Recipe/Routing Management.",
  verificationLevel: "sap_official_verified",
};

/* ---------------------------------------------------------------- records */

export const TX_VERIFICATION: VerificationRecord[] = [
  /* ----------------------------------------------------- tx:MIGO */
  {
    id: "tx:MIGO",
    evidence: [
      MIGO_SIMPL,
      MIGO_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Process Extensibility for Documents in Inventory | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/ed827c12afa7489d90b0013fd2733b3e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "הסניפט לגרסת 2025 FPS01 פותח את רשימת היישומים הניתנים להרחבה כך: 'Post Goods Movement (Web GUI app; " +
          "transaction code MIGO)'. רשומת הסקירה 'Inventory Management and Inventory (MM-IM)' ‏(loio " +
          "38b1ba53422bb54ce10000000a174cb4, אותו מדריך, 2025.001) מפנה ל-'Feature Comparison for Goods " +
          "Movement' להשוואת 'the Post Goods Movement (MIGO) app' מול יישומים אחרים בניהול מלאי, ורשומת ההשוואה " +
          "עצמה (loio de29287f0c0840caacbbc6f79c8d6242) מונה לצדו את Post Goods Receipt for Purchasing " +
          "Document, Post Goods Receipt for Inbound Delivery, Post Goods Receipt for Production Order ו-Post " +
          "Goods Receipt without Reference. כלומר בלוח ה-Fiori‏ 'Post Goods Movement' הוא MIGO עצמה כיישום Web " +
          "GUI, ולצדה יישומי Fiori ייעודיים לתרחישי קבלת סחורה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Goods Movement, Post Goods Movement | SAP Fiori Apps Reference Library, Apps('MIGO')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('MIGO')/S19OP",
        accessedAt: DATE3,
        claim:
          "דף הספרייה שהוחזר בחיפוש מוגבל-דומיין עבור Apps('MIGO') נושא את הכותרת 'Goods Movement, Post Goods " +
          "Movement', והמזהה MIGO מופיע בכתובת עצמה. הדף הוא מעטפת JavaScript, ולכן נקראו רק הכותרת והכתובת; " +
          "תפקידים, קטלוגים ומהדורות היעד של היישום לא נקראו ממנו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הטרנזקציות (LIFECYCLE) ומודיעין הטרנזקציות (TX_INTEL), רשומות MIGO",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת מחזור החיים: סטטוס Active, ecc:true, s4:true, ‏'מרכזי ב-S/4; תנועות נרשמות ל-MATDOC. החלופה " +
          "ל-MB*.' עם חלופת Fiori‏ 'Post Goods Movement (F0843)'. רשומת המודיעין: 'זמין במלואו ב-S/4HANA; נשאר " +
          "מרכזי' עם שדה fiori‏ 'Post Goods Receipt for Purchasing Document' והמזהה F0843A. הסטטוס הפעיל " +
          "והחלופה ל-MB* עקביים עם המקורות הרשמיים ברשומה זו; שתי ההצמדות למזהה Fiori אינן: לפי התיעוד הרשמי " +
          "Post Goods Movement נושא את המזהה MIGO (יישום Web GUI), F0843 הוא Post Goods Receipt for Purchasing " +
          "Document, והמזהה F0843A לא הוחזר באף רשומה רשמית בחיפושים שבוצעו. הסתירה על המזהה מתועדת ומוכרעת " +
          "ברשומת fiori:F0843.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MIGO",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: MIGO_STATUS_SRC,
      secondary: ["fiori_alternative_available"],
      he:
        "MIGO היא טרנזקציית המסך האחד לתנועות סחורה, מתועדת ב-S/4HANA On-Premise 2025 FPS01 לצד וריאנטי " +
        "הכניסה MIGO_GI ו-MIGO_GR, והיא היעד הרשמי של משפחת טרנזקציות ה-MB לפי פריט הפישוט S4TWL - " +
        "AVAILABILITY OF TRANSACTIONS IN MM-IM ‏('Use transaction MIGO or MMBE in dialog'). מגרסת OP1610 היא " +
        "משתמשת במנגנון נעילה חדש המשותף לה ול-BAPI_GOODSMVT_CREATE (פריט 27.6); הרישום ל-MATDOC מתועד ברשומת " +
        "מחזור החיים של המאגר בלבד. בלוח ה-Fiori היא מופיעה כיישום Web GUI בשם Post Goods Movement " +
        "(transaction code MIGO; בספריית ה-Fiori תחת Apps('MIGO')); לתרחיש קבלת סחורה למסמך רכש קיים יישום " +
        "Fiori ייעודי, Post Goods Receipt for Purchasing Document (F0843).",
      recommendedAction:
        "להשאיר את MIGO כטרנזקציית הדיאלוג לתנועות סחורה ולנתב אליה (או ל-BAPI_GOODSMVT_CREATE בקוד) כל שימוש " +
        "בטרנזקציות ה-MB, בפרט ממשקי BDC ו-CALL TRANSACTION, בגלל מנגנון הנעילה הנפרד. לתקן במאגר את הצמדת " +
        "ה-Fiori‏: ב-lifecycle.ts להחליף את 'Post Goods Movement (F0843)' ב-'Post Goods Movement (MIGO, Web " +
        "GUI)', וב-tx-intel.ts להסיר את המזהה F0843A שלא אומת ולהציג את F0843 רק כיישום קבלת סחורה למסמך רכש. " +
        "בבדיקות המרה: רישום GR/GI/העברה ב-MIGO ואימות השורה במסמך החומר, כמתועד ב-obj:material-document. " +
        "בנוסף, לנסח מחדש את שדה s4 ברשומת MIGO ב-tx-intel.ts כך שלא יכיל את המילה deprecated (המתייחסת לקודי " +
        "ה-MB), מפני שמנגנון הגזירה של דף הטרנזקציה קורא אותה כאילו MIGO עצמה הוחלפה.",
    },
    xrefs: ["tx:MB01", "tx:MB02", "tx:MB03", "tx:MB04", "tx:MB05", "tx:MB11", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31", "tx:MBRL", "tx:MBST", "tx:MMBE", "tx:MMBE_OLD", "tx:MIGO_GR", "tx:MB26", "table:MSEG", "table:MKPF", "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem", "obj:material-document", "fiori:F0843", "enh:badi:MB_MIGO_BADI", "enh:exit:MBCF0002"],
    lastVerifiedAt: DATE3,
    notes:
      "מה שאומת: (א) רשימת הפישוט הרשמית ל-S/4HANA 2023 FPS3 הורדה וחולצה לטקסט, ופריט 27.6 נקרא במלואו; " +
      "הציטוטים נבדקו מילה במילה, ושני מספרי ה-SAP Notes ‏(2210569, 2319579) מצוטטים מן הפריט בלבד ולא " +
      "הוזנו בשדה sapNote (אין קישור me.sap.com/notes נגיש ואין repoRef, כמוסכמת הקטלוג). (ב) רשומות " +
      "help.sap.com לגרסת On-Premise 2025.001 המונות את MIGO ואת וריאנטי הכניסה שלה, ואת Post Goods " +
      "Movement כיישום Web GUI שקוד הטרנזקציה שלו MIGO; דף Public Cloud‏ 'Post Goods Movement' ‏(loio " +
      "38b1ba53422bb54ce10000000a174cb4, 2608.500) קובע 'App ID: MIGO' ולא נכלל כראיה כי מהדורתו שונה. (ג) " +
      "כותרת דף ספריית ה-Fiori‏ Apps('MIGO'). מה שלא אומת: גוף העמודים (מעטפות JavaScript) לא נקרא, ולכן " +
      "רשימת סוגי התנועה, התפקידים והקטלוגים של Post Goods Movement אינם נטענים כאן; BAPI_GOODSMVT_CANCEL " +
      "ו-MIGO_DIALOG, הנזכרים בפריט הפישוט, אינם מזהים בדאטהסט ולכן אינם ב-xrefs; טבלת MATDOC אינה אובייקט " +
      "בדאטהסט ומיוצגת דרך obj:material-document. ‏status.release מתעד את מהדורת התיעוד שבו MIGO מופיעה " +
      "כפעילה (2025.001); פריט הפישוט (2023 FPS3) הוא מקור ההחלפה של משפחת ה-MB, לא מקור לשינוי ב-MIGO " +
      "עצמה. הדגל המשני 'קיימת חלופת Fiori' מוגבל לתרחיש קבלת סחורה למסמך רכש (F0843) ולעטיפת ה-Web GUI; " +
      "אין ברשומה זו טענה שיישום Fiori יחיד מחליף את MIGO כולה. ממצא על המצב המוצג כיום: ללא סטטוס מחובר, " +
      "דף הטרנזקציה גוזר ל-MIGO את המצב 'הוחלף ב-S/4HANA' (disposition superseded, אמון חלקי, ללא עוקבת) " +
      "משום שהביטוי הרגולרי של הבנאי מזהה את המילה deprecated בשדה s4 של רשומת tx-intel, שם היא מתארת את " +
      "MB01/MB1A/MB1B/MB1C ולא את MIGO; הסטטוס המחובר כאן (ללא שינוי) מתקן את התצוגה עד לתיקון הנתונים. " +
      "רשומה זו מחליפה את דוגמת היסוד של הקטלוג (ראיה אחת מן המאגר) מ-2026-09-01.",
  },

  /* ------------------------------------------------------------ tx:MB01 */
  {
    id: "tx:MB01",
    evidence: [
      MB01_SIMPL,
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches in Inventory Management | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: DOC_BATCHES_URL,
        accessedAt: DATE,
        claim:
          "הסניפט קובע כלשונו: 'Note MB* transactions (for example, MB01, MB03, MB31, and MB11) are not " +
          "supported.' ההיקף: פונקציונליות Documentary Batches בלבד — במסגרתה ההזנה נתמכת ב-MIGO ולא " +
          "בטרנזקציות ה-MB; אין להסיק מכך אמירה רחבה יותר מלשון הסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MRO Subcontracting in Goods Movements | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78dbc353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד Maintenance Management העדכני (2025 FPS01) עדיין מתאר קבלת חלק מתוקן 'Using the Goods Receipt " +
          "for Purchase Order function (transaction code MB01)' — עקבי עם 'הקוד קיים' ואינו עקבי עם הסרה קשיחה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt (MIGO) | EXG - Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: MIGO_EXG_URL,
        accessedAt: DATE,
        claim:
          "'With the Enjoy transaction MIGO you can post goods receipts with reference to a purchase order'; " +
          "העמוד ממפה את פונקציות קבלת הטובין הקלאסיות באזור ה-Exchanges אל MIGO ‏(MB01 קבלה להזמנה ידועה, MB02 " +
          "שינוי מסמך, MB03 הצגה, MBST ביטול) — תמיכה ב-MIGO כמחליפה לקבלת טובין מול הזמנת רכש, בהיקף המוצהר בעמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MB01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר: סטטוס Obsolete‏, s4:false, חלופה MIGO,‏ 'הוסר ב-S/4HANA — GR להזמנת רכש דרך MIGO.'. " +
          "מפריזה ביחס לעמדה הרשמית: לפי הפריט הרשמי קוד הטרנזקציה עדיין קיים, וקריאה מהתפריט מעלה הודעת שגיאה.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MB01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המודיעין: 'הוחלף בפועל ב-MIGO אך עדיין קיים' (descTech), ובשדה s4‏: 'ב-S/4HANA SAP ממליצה " +
          "במפורש להשתמש ב-MIGO; טרנזקציות MB0x נחשבות legacy/obsolete גם אם קיימות'. חסר בה שקריאה מהתפריט " +
          "מעלה הודעת שגיאה ושקוד לקוח חייב לעבור ל-BAPI_GOODSMVT_CREATE ‏(Note 2210569).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך הקונפליקט הפתוח על משפחת MB1A (16 קודים)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המסמך מתעד ש-lifecycle.ts ו-tx-intel.ts סותרים זה את זה בכל 16 הקודים של המחלקה, כולל MB01, ושאין " +
          "מנגנון הכרעה; סעיף 7 שלו מבקש בדיוק את הראיות שסופקו כאן (שם פריט, הכרעה, גרסה).",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/SOURCE_CONFLICT_MB1A.md",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2023 FPS3",
      source: MB01_SIMPL,
      he:
        "הוחלפה ב-MIGO (וב-BAPI_GOODSMVT_CREATE בקוד). לפי רשימת הפישוט הרשמית, קוד הטרנזקציה עדיין קיים " +
        "ב-S/4HANA אך קריאה מהתפריט מעלה הודעת שגיאה, והשימוש בו אסור בקוד לקוח, במיוחד מגרסת OP1610 בגלל מנגנון " +
        "נעילה חדש של MIGO. ‏SAP מציינת שהקודים יוצאו משימוש בעתיד הקרוב.",
      recommendedAction:
        "ליישר את שני מקורות הנתונים למצב רשמי אחיד: replaced ולא not_available. לעדכן את lifecycle.ts ‏" +
        "(s4:false מפריז — הקוד קיים אך חסום מהתפריט) ואת tx-intel.ts (להוסיף שקריאה מהתפריט נחסמת בהודעת שגיאה " +
        "ושקוד לקוח חייב לעבור ל-BAPI_GOODSMVT_CREATE). לרשום על הרשומה את פריט הפישוט S4TWL - AVAILABILITY OF " +
        "TRANSACTIONS IN MM-IM ואת SAP Note 2210569.",
    },
    xrefs: [
      "tx:MB02", "tx:MB03", "tx:MB04", "tx:MB05", "tx:MB11", "tx:MB1A", "tx:MB1B", "tx:MB1C",
      "tx:MB31", "tx:MBRL", "tx:MBST", "tx:MMBE", "tx:MIGO",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "מקור הפסיקה: רשימת הפישוט הרשמית ל-S/4HANA 2023 FPS3 (פריט 27.6, רכיב MM-IM-GF), שהורדה וחולצה לטקסט; כל " +
      "ציטוט נבדק מילה במילה, ושני מספרי ה-SAP Notes מופיעים כלשונם ב-PDF — אף מספר לא הוקלד מהזיכרון. שדה sapNote " +
      "לא הוזן במכוון: אין קישור me.sap.com/notes נגיש ואין repoRef, והמספרים מצוטטים בגוף הטענה בלבד (כמוסכמת " +
      "קטלוג הטבלאות). ‏status.release מתעד את מהדורת מסמך הפישוט (2023 FPS3) כי אף מקור רשמי אינו נוקב בגרסת הסרה " +
      "קשיחה; OP1610 נקוב רק לעניין מנגנון הנעילה. הרשומה מיישבת את סתירת lifecycle.ts מול tx-intel.ts במצב שלישי " +
      "מדויק: הוחלפה + חסומה מהתפריט + הקוד קיים, כהמלצת SOURCE_CONFLICT_MB1A.md. אותו טקסט פריט מכסה את כל " +
      "משפחת ה-MB, ולכן הראיה מיישבת גם את רשומות האחיות. חלק מקודי המשפחה (MB0A, MBNL, MBSF, MBSL, MBSU, MBBM) " +
      "אינם מזהים בני-פענוח בדאטהסט ולכן אינם ב-xrefs. הסתירות המלאות נרשמו ב-" +
      "audit/s4-enrichment/research-queue-transactions.md.",
  },

  /* ------------------------------------------------------------ tx:MB02 */
  {
    id: "tx:MB02",
    evidence: [
      MB02_SIMPL,
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt (MIGO) | EXG - Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: MIGO_EXG_URL,
        accessedAt: DATE,
        claim:
          "בהיקף קבלות הטובין באזור ה-Exchanges, העמוד קובע ש-MIGO מחליפה: רישום קבלת טובין להזמנת רכש ידועה " +
          "(MB01), שינוי מסמך חומר מקבלות טובין (MB02), הצגת מסמך חומר (MB03) וביטול מסמך חומר (MBST).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Printing the Form M-11 | Ukraine",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0d0bed912ebd477fa72a08a9441fd7ea/0913fa513b3b7b38e10000000a445394.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד הלוקליזציה הנוכחי (2025 FPS01) עדיין קובע: 'You can also print the form when you change a " +
          "material document (transaction MB02)' — ‏MB02 נותרת מתועדת בשימוש פעיל בחלקים מהתיעוד הנוכחי (אותו " +
          "ניסוח גם בעמוד Form M-4‏, loio ‏e114fa513b3b7b38e10000000a445394).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "kba",
        sourceTitle: "3553174 - How to change a Material Document - SAP ERP & SAP S/4HANA",
        product: "SAP ERP & SAP S/4HANA",
        edition: "on-premise",
        url: "https://me.sap.com/notes/3553174",
        kba: "3553174",
        accessedAt: DATE,
        claim:
          "KBA ציבורי ייעודי לשינוי מסמך חומר ב-ERP וב-S/4HANA; התקציר הציבורי שנשלף קובע ש-MB02 היא 'obsolete " +
          "in higher S/4HANA releases', ו-MIGO מופיעה לאורך הקשר שינוי-המסמך בתקציר. גוף ה-KBA המלא דורש התחברות " +
          "S-user, ולכן הניסוח המדויק של הצהרת ההחלפה לא אומת.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המודיעין: MB02 משנה רק שדות שאינם כמות במסמך חומר (טקסטים, מספרי תעודת משלוח); שינוי כמות דורש " +
          "MBST ורישום מחדש. שדה ה-s4 קובע: זמין ב-S/4HANA, רוב פעולות השינוי דרך MIGO,‏ MB02 נחשב legacy. " +
          "טבלאות MKPF/MSEG; לצד MIGO/MB03/MBST.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB02",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MB02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר מסמנת את MB02 בסטטוס Obsolete‏, ecc:true‏, s4:false, חלופה MIGO, תחום פישוט MM-IM, " +
          "השפעה Medium, וטקסט הגירה: הוסר — שינוי מסמך חומר דרך MIGO.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MB02",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2023 FPS3",
      source: MB02_SIMPL,
      he:
        "הוחלפה. משפחת טרנזקציות MB, ובכללה MB02 לשינוי מסמך חומר, הוחלפה בטרנזקציה MIGO וב-BAPI_GOODSMVT_CREATE ‏" +
        "/ BAPI_GOODSMVT_CANCEL. קוד הטרנזקציה עדיין קיים במערכת, אך קריאה שלו מהתפריט מעלה הודעת שגיאה, ו-SAP " +
        "מציינת שהקודים יוצאו משימוש בהמשך. בקוד לקוח יש להחליף שימוש ב-MB02 וב-MB03 במודול הפונקציה MIGO_DIALOG. " +
        "הטרנזקציות הישנות משתמשות במנגנון נעילה ישן, ולכן רישום מקבילי מולן ומול MIGO עלול ליצור אי-עקביות במלאי.",
      recommendedAction:
        "ליישר את שתי רשומות המאגר לניסוח הרשמי: data/lifecycle.ts צריך לומר הוחלפה (ולא הוסרה — הקוד קיים אך " +
        "קריאה מהתפריט מעלה הודעת שגיאה), וב-data/tx-intel.ts יש להחליף את 'זמין ב-S/4HANA' בניסוח 'הוחלפה " +
        "ב-MIGO; קריאה מהתפריט מעלה הודעת שגיאה'. לרשום את SAP Note 2210569 (המופיע כלשונו ברשימת הפישוט " +
        "הרשמית) על הרשומה, ולהחיל את אותה הכרעה על רשומת tx:MB01 שבאותה אצווה ועל שאר משפחת ה-MB ‏" +
        "(MB03/MB1A/MB1B/MB1C/MB11/MB31/MBST) לשם עקביות.",
    },
    xrefs: [
      "tx:MB01", "tx:MB03", "tx:MBST", "tx:MIGO", "tx:MMBE",
      "fm:BAPI_GOODSMVT_CREATE", "table:MKPF", "table:MSEG",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "סתירת מחזור החיים יושבה בראיית Tier-1: פריט 27.6 ברשימת הפישוט 2023 FPS3 (עמ' 644-646, נקרא ישירות מן " +
      "ה-PDF). סיכון מנגנון הנעילה מצוין עבור OP1610 ומעלה; status.release מתעד את מהדורת מסמך הפישוט. שני מספרי " +
      "ה-Notes ‏(2210569, 2319579) מופיעים כלשונם במסמך הרשמי ומצוטטים בגוף הטענות בלבד — שדה sapNote לא הוזן " +
      "(אין קישור me.sap.com נגיש). נותר לא מאומת: הגרסה המדויקת שבה הופעלה חסימת התפריט (הפריט אומר 'will be " +
      "deprecated in the near future'), וגוף ה-KBA ‏3553174 המלא (חסום S-user) — ולכן ראייתו נותרת ברמת 'נדרש " +
      "אימות נוסף'. ‏MIGO_DIALOG ו-BAPI_GOODSMVT_CANCEL אינם מזהים בני-פענוח בדאטהסט ולכן אינם ב-xrefs. חיפוש " +
      "SAP_S4HANA_CLOUD לא נדרש (חיפוש ה-On-Premise החזיר תוצאות). הסתירות נרשמו בקובץ התור.",
  },

  /* ------------------------------------------------------------ tx:MB03 */
  {
    id: "tx:MB03",
    evidence: [
      MB03_EXG_DISPLAY,
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt (MIGO) | EXG - Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: MIGO_EXG_URL,
        accessedAt: DATE,
        claim:
          "'With regard to goods receipts in the Exchanges area, the transaction MIGO replaces the following " +
          "transactions: ... Display a material document from goods receipts (transaction MB03) ...' — הצהרת " +
          "החלפה ממוקדת-יכולת בהיקף אזור ה-Exchanges (קבלות טובין), לא הכרעת מחזור-חיים כלל-מערכתית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Display Function for Archived Material Documents (MM-IM) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/3981c1536ca9b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "'In all cases transaction MB03 is called for the actual single document display'; ‏MB03 משמשת גם " +
          "להצגת מסמכי חומר מקוריים במסד הנתונים, 'but archived material documents can no longer be modified'. " +
          "(אותו loio מפורסם גם תחת ה-deliverable של Supply Chain; כאן מצוטט Sourcing and Procurement בלבד.)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches in Inventory Management | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: DOC_BATCHES_URL,
        accessedAt: DATE,
        claim:
          "מגבלה ממוקדת-יכולת בלבד: עבור Documentary Batches‏, 'MB* transactions (for example, MB01, MB03, MB31, " +
          "and MB11) are not supported.' — מגבלה פונקציונלית של Documentary Batches, לא הצהרת מחזור חיים או הסרה " +
          "של MB03.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Material Documents Overview - Fiori Apps Library (App ID F1077)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F1077')/S15OP",
        accessedAt: DATE,
        claim:
          "אפליקציית Fiori‏ F1077 קיימת ושמה בערך הספרייה הרשמי הוא 'Material Documents Overview'. כותרת הערך " +
          "אינה קובעת שהאפליקציה מחליפה את MB03.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Material Documents Overview | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/faed135668bb792de10000000a44538d.html",
        accessedAt: DATE,
        claim:
          "קיים מדריך יישום רשמי ל-On-Premise עבור אפליקציית Material Documents Overview (ראיה ברמת כותרת לקיום " +
          "האפליקציה ב-S/4HANA On-Premise; בכתובת שהוחזרה אין פרמטר גרסה).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Documents Overview | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/7cc07e548af58e4ce10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "הסניפט קובע 'Material Documents Overview App ID: F1077' — אישור רשמי חתום-גרסה (2025.001) לשם " +
          "האפליקציה ולמזהה שלה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB03",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המודיעין: MB03 זמינה ב-S/4HANA ‏('זמין ב-S/4HANA'), הצגה לקריאה בלבד של MKPF/MSEG, עם " +
          "Fiori‏ 'Material Documents Overview' כחלופה מודרנית ו-MIGO כחלופה נוספת.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB03",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MB03 (שנויה במחלוקת)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "lifecycle.ts מסמנת את MB03 כ-Obsolete‏, s4:false ‏('הוסר'), Fiori‏ 'Display Material Documents " +
          "(F1077)', חלופות 'MIGO / MB51', תחום פישוט MM-IM, השפעה Low. קביעת הסרה זו אינה נתמכת באף מקור רשמי, " +
          "אינה נוקבת במזהה פריט פישוט או SAP Note, וסותרת את tx-intel ואת נוהלי SAP Help ‏2025.001 העדכניים.",
        verificationLevel: "verification_required",
        repoRef: "data/lifecycle.ts#MB03",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך התיקון הפתוח: סתירות מחזור חיים, קבוצה A",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MB03 מנויה בקבוצה A (מחלוקת אמיתית) יחד עם MB01/MB02/MB11/MB1A/MB1B/MB1C/MB31/MBST‏: lifecycle.ts " +
          "אומרת הוסר, פרוזת NEO אומרת זמין. הראיות הנדרשות: מזהה פריט פישוט עם disposition לגרסה, הצהרת Help " +
          "חתומת-גרסה, או SAP Note; במאגר אין מספר SAP Note עבור MB03.",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: MB03_EXG_DISPLAY,
      he:
        "טרנזקציית MB03 (הצגת מסמך חומר) עדיין מתועדת בתיעוד הרשמי של SAP S/4HANA 2025 FPS01 במהדורת On-Premise: " +
        "התיעוד מנחה במפורש לבחור בטרנזקציה MB03 להצגת מסמך חומר, והיא זו שנקראת גם להצגת מסמכי חומר מהארכיון. " +
        "אין הצהרת הסרה בתיעוד הציבורי שנבדק, אך בתיעוד ה-Exchanges קיימת הצהרה נקודתית שלפיה MIGO מחליפה את " +
        "MB01/MB02/MB03/MBST לקבלות טובין באזור זה; לא נמצאה בחיפושים שבוצעו הצהרת מחליף כלל-מערכתית או פריט " +
        "פישוט. הדרך המודרנית לעבודה שוטפת היא MIGO ואפליקציית Fiori בשם Material Documents Overview (מזהה " +
        "F1077). שימו לב: פונקציונליות Documentary Batches אינה תומכת בטרנזקציות MB*, ובהן MB03 — זו מגבלה " +
        "פונקציונלית נקודתית ולא סטטוס הסרה. בפרויקט קיימת סתירה פנימית מול data/lifecycle.ts המסמנת את MB03 " +
        "כ-Obsolete, וקביעת הסרה תדרוש אסמכתה מקטלוג פריטי הפישוט.",
      recommendedAction:
        "להתייחס ל-MB03 כזמינה (הצגה בלבד) לפי SAP Help ‏2025.001; להציג את MIGO ואת אפליקציית Fiori‏ " +
        "Material Documents Overview‏ (F1077) כנתיב המודרני. אין לפרסם את קביעת lifecycle.ts ‏(Obsolete/s4:false) " +
        "ללא מזהה פריט פישוט או הצהרת הסרה רשמית; לתקן ב-lifecycle.ts את שם האפליקציה F1077 ל-Material Documents " +
        "Overview.",
    },
    xrefs: ["tx:MB01", "tx:MB02", "tx:MBST", "tx:MB51", "tx:MIGO"],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשלוש וריאציות שאילתה (SAP_S4HANA_ON-PREMISE, תוצאות מלאות — ללא צורך " +
      "ב-fallback ענן), חיפוש רשת מוגבל-דומיין לשם האפליקציה F1077, ורובד Tier-2 מהמאגר. הסטטוס 'ללא שינוי' נשען " +
      "על סניפטים רשמיים של 2025.001 המנחים שימוש פעיל ב-MB03. אין הצהרת הסרה רשמית פומבית שנמצאה בחיפושים " +
      "שבוצעו; דף ה-EXG קובע הצהרת החלפה בהיקף אזור ה-Exchanges בלבד, ולכן לא נרשם יורש. מה שחסר להכרעת 'הוסר': " +
      "מזהה פריט הפישוט המכסה את טרנזקציות מסמכי החומר ב-MM-IM וה-disposition שלו לגרסת היעד (הקטלוג דורש התחברות " +
      "S-user), או מספר SAP Note — אין כזה בנתוני המאגר המאומתים ואף מספר לא הוקלד מהזיכרון. בשונה מ-MB01 (רישום), " +
      "MB03 היא תצוגה בלבד — עקבי עם כך שהתיעוד הנוכחי עדיין קורא לה. הערה צולבת: פריט הפישוט 27.6 (המצוטט " +
      "ברשומות tx:MB01/tx:MB02/tx:MBST) מונה גם את MB03 במשפחת הקודים שהוחלפו — מתח רשמי-מול-רשמי שנרשם בקובץ " +
      "התור. ‏fiori:F1077 אינו מזהה בדאטהסט (data/fiori/apps.ts) ולכן אינו ב-xrefs.",
  },

  /* ------------------------------------------------------------ tx:MB11 */
  {
    id: "tx:MB11",
    evidence: [
      MB11_SIMPL,
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches in Inventory Management | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: DOC_BATCHES_URL,
        accessedAt: DATE2,
        claim:
          "'Note MB* transactions (for example, MB01, MB03, MB31, and MB11) are not supported.' (מילה במילה); " +
          "לפי הסניפטים, Documentary Batches ניתנות להזנה מקוונת ובפונקציות מסוימות בלבד (למשל קבלת טובין " +
          "בטרנזקציה MIGO); עבור קבלנות משנה, תנועות טובין נרשמות רק ב-MIGO.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Additional Movement Types | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/d9f8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תיעוד Maintenance Management הנוכחי (שיפוץ חלקים) עדיין מנחה: טרנזקציה MB11 לניפוק סחורה וטרנזקציה " +
          "IW8W לקבלת סחורה. זהו הצד המתועד-עדיין של סתירת מחזור החיים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movements for Stock Difference Postings | Project System (PS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4dd8cb7b1c484b4b93af84d00f60fdb8/dcf4c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תיעוד PS הנוכחי עדיין מונה את MB11 לצד MBST/MIGO כטרנזקציות רישום לסוגי תנועה של הפרשי מלאי (למשל " +
          "501, 505) עם מלאי פרויקט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MB11",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר מסמנת את MB11 כ-Obsolete‏, s4:false, חלופה MIGO, תחום פישוט MM-IM, וטקסט הגירה הקובע " +
          "שהוסרה. מפריזה: הפריט הרשמי אומר שהקוד עדיין קיים אך חסום מהפעלה בתפריט.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MB11",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB11",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המודיעין מתארת את MB11 כ-legacy שהוחלפה ב-MIGO אך קובעת שהיא עדיין קיימת ושימושית להזנה " +
          "מהירה. מקילה מדי: לפי הפריט הרשמי קריאה מהתפריט מעלה הודעת שגיאה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB11",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך התיקון הפתוח: סתירות מחזור חיים, קבוצה A — שורת MB11",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "MB11 היא אחד מ-12 קודי המחלוקת האמיתית שעבורם מסמך התיקון דורש פריט פישוט או דף Help לגרסת היעד; " +
          "רשומה זו מספקת את פריט רשימת הפישוט המצטט את SAP Note 2210569 (ארטיפקט בסגנון אופציה 2 של המסמך); " +
          "הכרעת ה-disposition פר-גרסה בקטלוג פריטי הפישוט נותרה פתוחה (חסום בהתחברות).",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2023 FPS03",
      source: MB11_SIMPL,
      he:
        "טרנזקציית MB11 (רישום תנועת סחורה) הוחלפה ב-MIGO. קוד הטרנזקציה עדיין קיים במערכת, אך קריאה שלו מהתפריט " +
        "מעלה הודעת שגיאה, ואסור להשתמש בו בקוד לקוח בגלל מנגנון נעילה ישן. לרישום תנועות מלאי משתמשים ב-MIGO " +
        "בדיאלוג או ב-BAPI_GOODSMVT_CREATE בקוד. שימו לב: תיעוד עדכני של תחזוקת מפעל (שיפוץ חלקים) ושל מערכת " +
        "פרויקטים עדיין מזכיר את MB11, וזו סתירה מתועדת בתיעוד הרשמי.",
      recommendedAction:
        "ליישר את שתי רשומות המאגר: data/lifecycle.ts מציגה הסרה מלאה ו-data/tx-intel.ts מציגה זמינות לשימוש; " +
        "הניסוח המדויק לפי הרשימה הרשמית הוא replaced — הקוד קיים אך חסום מהתפריט, והמחליפה היא MIGO.",
    },
    xrefs: [
      "tx:MB01", "tx:MIGO", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31", "tx:MBST",
      "tx:IW8W", "fm:BAPI_GOODSMVT_CREATE",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "הפסיקה הרשמית: רשימת הפישוט ל-S/4HANA 2023 FPS1-3 (PDF ציבורי ב-help.sap.com, ‏Document Version 1.35,‏ " +
      "2025-02-25), פריט 27.6: ‏MB11 בין 18 טרנזקציות MB שהוחלפו ב-MIGO או ב-BAPIs; הקודים קיימים אך קריאה " +
      "מהתפריט מעלה שגיאה; אסורים בקוד לקוח (מנגנון נעילה ישן; המספרים 2210569 ו-2319579 מופיעים כלשונם במסמך — " +
      "לא הוקלדו מהזיכרון; שדה sapNote לא הוזן באין קישור me.sap.com או repoRef). רשימת 1610 (סעיף 2.1.10.2, " +
      "שאומתה ברשומת tx:MB1A) נושאת את אותה קביעה מאז 2016, כך שהפסיקה עומדת בטווח 1610-2023; רשימת הפישוט " +
      "למהדורת 2025 ‏(SIMPL_OP2025) אומתה ברשומת tx:MB1C באצווה זו (פריט 15.3.9) — כאן המקור המצוטט הוא מהדורת " +
      "2023 FPS03. פערים שנותרו: (1) ה-disposition פר-גרסה בקטלוג פריטי הפישוט חסום-התחברות ולא נבדק; (2) התנהגות " +
      "בפועל במערכת של CBC דורשת אימות במערכת SAP (ה-MCP המקומי sc4sap לא התחבר בסשן). דפי 2025 FPS01 שעדיין " +
      "מתעדים את MB11 נרשמו כסתירות בקובץ התור, לא כראיית זמינות. ‏accessedAt נקבע 2026-09-02 — מועד הגישה בפועל.",
  },

  /* ------------------------------------------------------------ tx:MB1A */
  {
    id: "tx:MB1A",
    evidence: [
      MB1A_SIMPL1610,
      {
        sourceType: "sap_help",
        sourceTitle: "Entry of Additional Quantities and Quantity Conversion Factors | Oil & Gas",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f4ab800d01c4366b0c9aaff06a64320/7183cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד 2025 FPS01 עדיין מתעד את MB1A בשם העסקי 'goods issue' ומכנה אותה במפורש אחת הטרנזקציות " +
          "ה'ישנות': ‏\"the dialog box appears in the 'old' transactions ... (for example, MB1A - goods issue, " +
          "MB1B - trans...\" (הסניפט נקטע שם; ההשלמה אינה מצוטטת).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3b07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "בקטלוג הפעילויות של MM-IM ‏(2025 FPS01) פעילות ניפוק הסחורה משויכת ל-MIGO_GI, כלשון הסניפט של ה-loio " +
          "המצוטט: 'Activity Transaction Code Transfer Posting MB1B Goods Receipt for Order MIGO_GO Goods Issue " +
          "MIGO_GI' — משפחת MIGO היא נקודת הכניסה הנוכחית לניפוק.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB1A",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "בסיס Tier-2 מהמאגר: MB1A היא טרנזקציית ניפוק הסחורה הקלאסית של ECC (סוגי תנועה 201/261/551/901, " +
          "יוצרת MKPF/MSEG ומסמך FI‏, BAPI_GOODSMVT_CREATE, אובייקטי הרשאה M_MSEG_BWA/M_MSEG_WMB/M_MSEG_WWA); " +
          "שדה ה-s4 שלה אומר: זמינה אך מסומנת legacy‏; SAP ממליצה MIGO; הקוד עדיין רץ ברוב המערכות; חלופות " +
          "MIGO/MIGO_GI.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB1A",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "1610",
      source: MB1A_SIMPL1610,
      he:
        "MB1A (ניפוק סחורה, Goods Issue) הוחלפה ב-S/4HANA בטרנזקציה המאוחדת MIGO. לפי רשימת הפישוט הרשמית של " +
        "SAP S/4HANA 1610 (סעיף 2.1.10.2), קוד הטרנזקציה עדיין קיים אך קריאה שלו מהתפריט מעלה הודעת שגיאה, והוא " +
        "מיועד להוצאה משימוש. בקוד לקוח יש להחליף את הקריאה ב-BAPI_GOODSMVT_CREATE. תיעוד העזרה של 2025 FPS01 " +
        "עדיין מזכיר את MB1A כטרנזקציה ישנה בהקשרים נקודתיים (Oil & Gas), ואילו קטלוג הפעילויות של MM-IM מפנה " +
        "לניפוק דרך MIGO_GI. הקשר פרויקט: רלוונטי גם לניפוק רכיבים להוראות תחזוקת מפעל ולהזמנות ייצור בתעשיות " +
        "תהליכיות.",
      recommendedAction:
        "להשתמש ב-MIGO (ניפוק, MIGO_GI) לכל ניפוקי הסחורה; להחליף קוד מותאם או Batch Input שקורא ל-MB1A " +
        "ב-BAPI_GOODSMVT_CREATE. ליישר את ניסוח ה-s4 ב-tx-intel.ts עם מחזור החיים הרשמי (הוחלפה; קריאה מהתפריט " +
        "מעלה הודעת שגיאה), בדומה לרשומת tx:MB01.",
    },
    xrefs: ["tx:MB01", "tx:MIGO", "tx:MB1B", "tx:MB1C", "fm:BAPI_GOODSMVT_CREATE"],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשלוש וריאציות (On-Premise), חיפוש רשת מוגבל-דומיין, והורדת PDF רשימת " +
      "הפישוט 1610 הרשמי מ-help.sap.com (אומת מקומית ב-pdftotext; ‏MB1A נקובה בסעיף 2.1.10.2, אזור עמ' 121; " +
      "הקובץ אומת חי — HTTP 200, ‏application/pdf). הסטטוס 'הוחלף' נשען על ה-PDF הרשמי הנוקב ב-MIGO כיורשת. " +
      "הניואנס נשמר: הקוד קיים פיזית אך הפעלה מהתפריט נחסמת בשגיאה והוכרזה הוצאה משימוש עתידית; קורפוס 2025.001 " +
      "מזכיר את MB1A רק כטרנזקציה 'ישנה' בנושאי תעשייה נקודתיים. סעיף 2.1.10.2 אינו מדפיס מספר SAP Note ואין " +
      "מספר במאגר המאומת — לכן לא צוטט מספר (Note 28022 הסמוך שייך לסעיף הקודם). עמוד Documentary Batches " +
      "(המציין ש-MB* אינן נתמכות לאותה יכולת) לא שימש ראיית מחזור חיים כי הוא ממוקד-הקשר.",
  },

  /* ------------------------------------------------------------ tx:MB1B */
  {
    id: "tx:MB1B",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3b07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד MM-IM של S/4HANA 2025 FPS01 עדיין מונה 'Transfer Posting MB1B' בטבלת הפעילויות של Materials " +
          "Management, לצד MIGO_GO ו-MIGO_GI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Provision of Parts to Subcontractor | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/ee21e0ae312545beb1f6ec2811634716.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד קבלנות המשנה בתחזוקת מפעל מציע שתי אפשרויות מקבילות: פונקציית Transfer Posting‏ (MB1B) " +
          "בהתייחסות להזמנת קבלנות המשנה, או פונקציית Transfer Posting Purchase Order ב-MIGO‏ ('Using MB1B or " +
          "MIGO, you can do multiple postings').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Entry of Additional Quantities and Quantity Conversion Factors | Oil & Gas",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f4ab800d01c4366b0c9aaff06a64320/7183cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "הטקסט הרשמי של 2025 FPS01 מכנה את MB1B אחת הטרנזקציות ה'ישנות' ('for example, MB1A - goods issue, " +
          "MB1B - trans...') — אות לאופי legacy, ללא קביעת הסרה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches in Inventory Management | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: DOC_BATCHES_URL,
        accessedAt: DATE,
        claim:
          "עבור Documentary Batches, טרנזקציות MB* אינן נתמכות (בדוגמאות הנקובות: MB01, MB03, MB31, MB11) " +
          "ותנועות הטובין נרשמות ב-MIGO. המגבלה ממוקדת-יכולת; הסניפט אינו מונה את MB1B.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt (MIGO) | EXG - Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: MIGO_EXG_URL,
        accessedAt: DATE,
        claim:
          "באזור קבלות הטובין של Exchanges‏, MIGO מחליפה את MB01 וטרנזקציות נוספות המנויות בעמוד. הסניפט אינו " +
          "מונה את MB1B, ולכן העמוד אינו משמש הצהרת יורש עבור MB1B.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Transfer Stock - In Plant - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/",
        accessedAt: DATE,
        claim:
          "קיים דף ספרייה רשמי שכותרתו 'Transfer Stock - In Plant', אך המזהה F1061 אינו מופיע בכותרת או בכתובת " +
          "שהוחזרה, ולכן הקישור ל-F1061 הנטען ב-data/lifecycle.ts אינו מאושש מתוצאה זו. (שדה המהדורה כאן הוא " +
          "אילוץ סכימה ואינו נטען מן המקור.)",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB1B",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המודיעין: MB1B היא Transfer Posting (סוגי תנועה 301/311/321/343/309 ועוד), מוצגת כזמינה-כ-legacy ‏" +
          "('זמינה כ-legacy; SAP ממליצה MIGO/MIGO_TR'); ‏s4Delta מעדיף MIGO / Fiori F0843; הרישומים נכתבים " +
          "ל-MATDOC.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB1B",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MB1B (סותרת את המודיעין)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר: MB1B בסטטוס Obsolete‏, s4:false ‏('הוסר ב-S/4HANA'), חלופה MIGO,‏ Fiori‏ 'Transfer Stock " +
          "(F1061) / Post Goods Movement', השפעה High — בסתירה חזיתית לרשומת tx-intel ולנוהלי SAP Help ‏2025.001 " +
          "המתעדים עבודה ב-MB1B. שני מקורות המאגר אינם ניתנים ליישוב ללא פריט פישוט או הצהרת Help חתומת-גרסה.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/lifecycle.ts#MB1B",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך התיקון הפתוח: סתירות מחזור חיים, קבוצה A",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "פתוח מאז 2026-08-24: ‏12 קודים ובהם MB1B ו-MB01 נושאים שתי טענות מאגר בלתי-מתיישבות (הוסר מול " +
          "legacy-זמין). הראיות הנדרשות: מזהה פריט פישוט, דף Help חתום-גרסה הקובע קיום או הסרה, או SAP Note; " +
          "ההכרעה תלויה גם בגרסת יעד שטרם נקבעה לפרויקט.",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md",
      },
    ],
    xrefs: [
      "tx:MB01", "tx:MIGO", "tx:MB1A", "tx:MB1C", "tx:MB11", "tx:MB31", "tx:MBST", "fiori:F0843",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "סתירת מחזור חיים באותה תבנית של MB01, שלא יושבה במקור רשמי פומבי הנוקב ב-MB1B עצמה. מה שאומת מול " +
      "help.sap.com ‏(On-Premise 2025.001): התיעוד עדיין מונה את MB1B כפעילות ה-Transfer Posting, מציע MIGO " +
      "במקביל לאותם רישומים (כולל קבלנות משנה בתחזוקת מפעל), ומכנה אותה טרנזקציה 'ישנה' בנושא Oil & Gas. מה שחסר " +
      "לכל סטטוס replaced/deprecated/not_available: מקור רשמי פומבי הנוקב ב-MB1B וקובע הסרה או יורש — לא נמצא " +
      "בחיפושים שבוצעו (2026-09-01). הארטיפקטים המוסמכים לשאלה זו (פריט בקטלוג הפישוט, SAP Note על משפחת MB*) " +
      "חסומים בהתחברות S-user, ואין מספר Note במאגר המאומת — לכן לא נרשם מספר. ההחלטה תלוית-גרסה והפרויקט ללא " +
      "גרסת יעד מוגדרת (MANIFEST‏, LIFECYCLE_EVIDENCE_REQUIRED.md). לכן לא נכתב סטטוס, ורמת הרשומה משקפת מקורות " +
      "סותרים. המלצה: להשאיר תיוג כפול ב-UI, להציג את MB1B כ-legacy עם המלצת MIGO ‏(Tier-2), לא להציג 'הוסר " +
      "ב-S/4HANA' כעובדה, ולסמן את שורת מחזור החיים 'דורש אימות במערכת SAP'. סתירת מזהי ה-Fiori‏ (F1061 " +
      "ב-lifecycle מול F0843 ב-tx-intel) פתוחה; F1061 אינו קיים ב-data/fiori/apps.ts ולכן אינו ב-xrefs. הערת " +
      "אצווה: פריט הפישוט 27.6 (רשומות tx:MB01/tx:MB02/tx:MBST) מונה גם את MB1B במשפחת הקודים שהוחלפו — נרשם " +
      "בקובץ התור.",
  },

  /* ------------------------------------------------------------ tx:MB1C */
  {
    id: "tx:MB1C",
    evidence: [
      MB1C_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 FPS1 · 15.3.9 · Solution",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE2,
        claim:
          "הפתרון הרשמי: שימוש ב-MIGO (או MMBE) בדיאלוג, והחלפת קוד לקוח שקורא ל-MB1C ב-BAPI_GOODSMVT_CREATE. " +
          "הטרנזקציות הישנות משתמשות במנגנון הנעילה הישן, ורישום מקבילי מולן ומול MIGO / ה-BAPI עלול ליצור " +
          "אי-עקביות במלאי (SAP Note 2319579 מופיע בגוף המסמך).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (Retail) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3807b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "טבלת הפעילויות של MM בתיעוד S/4HANA 2025 FPS01 עדיין מציגה את MB1C כקוד הטרנזקציה של Other goods " +
          "receipt. זהו מקור הסתירה התיעודית מול פריט הפישוט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Stock | What's New in SAP S/4HANA 1909",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1909.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/df9855579fd74683b047eba89711203c.html?locale=en-US&state=PRODUCTION&version=1909.000",
        accessedAt: DATE,
        claim:
          "אפליקציית Fiori בשם Manage Stock תומכת בקליטת מלאי פתיחה (initial entry of stock balances), ולחלופין, " +
          "בכפוף להרשאות, ניתן להשתמש באפליקציית Post Goods Movement לאותה מטרה (תנועה 561). זו החלופה המודרנית " +
          "לתרחיש המרכזי של MB1C.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הטרנזקציות בפרויקט (LIFECYCLE) — רשומת MB1C",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "המאגר מסמן את MB1C כ-Obsolete עם s4:false, חלופה MIGO ו-Fiori בשם Post Goods Movement ‏(F0843), " +
          "ובניסוח 'הוסר ב-S/4HANA'. הניסוח 'הוסר' חזק מדי ביחס למקור הרשמי, שקובע שהקוד קיים אך קריאה מהתפריט " +
          "נחסמת בשגיאה.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MB1C",
      },
      {
        sourceType: "repository",
        sourceTitle: "TX_INTEL · רשומת MB1C (קבלות סחורה אחרות)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המודיעין מתעדת את השימוש העסקי: קליטת מלאי ללא הזמנת רכש, ובראשה תנועה 561 לקליטת מלאי פתיחה, " +
          "וכן 501/511/521/563. עם זאת היא קובעת 'זמינה כ-legacy; MIGO היא הסטנדרט' — ניסוח מקל מדי מול הקביעה " +
          "הרשמית שהוחלפה ושקריאה מהתפריט מעלה שגיאה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB1C",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MB1C_SIMPL2025,
      he:
        "MB1C (קבלות סחורה אחרות) הוחלפה ב-S/4HANA בטרנזקציית המסך האחיד MIGO או ב-BAPI_GOODSMVT_CREATE ‏/ " +
        "BAPI_GOODSMVT_CANCEL, לפי רשימת הפישוט הרשמית ל-S/4HANA 2025 FPS1 (פריט S4TWL - Availability of " +
        "Transactions in MM-IM‏, SAP Note 2210569). קוד הטרנזקציה עדיין קיים, אך קריאה שלו מהתפריט מעלה הודעת " +
        "שגיאה, ו-SAP מודיעה שהקודים יוצאו משימוש בעתיד הקרוב.",
      recommendedAction:
        "להשתמש ב-MIGO לכל קבלות הסחורה האחרות, כולל קליטת מלאי פתיחה בתנועות 561/501. קוד לקוח שקורא ל-MB1C יש " +
        "להחליף ב-BAPI_GOODSMVT_CREATE. ב-Fiori: אפליקציית Manage Stock תומכת בקליטת מלאי פתיחה, ולחלופין Post " +
        "Goods Movement. אין לרשום במקביל דרך הטרנזקציות הישנות ודרך MIGO או ה-BAPI, בגלל הבדלי מנגנון הנעילה " +
        "(SAP Note 2319579).",
    },
    xrefs: ["tx:MB01", "tx:MIGO", "tx:MMBE", "fm:BAPI_GOODSMVT_CREATE"],
    lastVerifiedAt: DATE2,
    notes:
      "הקונפליקט נסגר במקור רשמי פומבי: רשימת הפישוט ל-SAP S/4HANA 2025 FPS1 ‏(PDF רשמי ב-help.sap.com, פריט " +
      "15.3.9, רכיב MM-IM-GF, עמ' 1486-1487) מונה את MB1C בין טרנזקציות ה-MB שהוחלפו ב-MIGO או ב-BAPIs, מציינת " +
      "שהקודים קיימים אך קריאה מהתפריט מעלה שגיאה, ושהם יוצאו משימוש. מספרי ה-SAP Notes ‏2210569 ו-2319579 " +
      "מופיעים מילה במילה בגוף המסמך הרשמי ולכן צוטטו — בגוף הטענות בלבד; שדה sapNote לא הוזן (me.sap.com דורש " +
      "התחברות S-user). חיפוש ה-Help הפנימי לא העלה דף Docs המנסח את ההחלפה במפורש; דפי הפעילויות של 2025.001 " +
      "עדיין מציגים את MB1C, ולכן נרשמה סתירה תיעודית (קובץ התור). ‏fiori:F0843 ‏(Post Goods Movement) המופיע " +
      "ב-data/lifecycle.ts לא אומת כאן מול ספריית האפליקציות; שמות האפליקציות Manage Stock ו-Post Goods Movement " +
      "אומתו מתוך What's New 1909, ללא מזהה אפליקציה. ‏BAPI_GOODSMVT_CANCEL אינו מזהה בר-פענוח בדאטהסט ולכן אינו " +
      "ב-xrefs. ‏baseline-inventories.json מתעד את פער מחזור החיים הזה כפריט פתוח מ-2026-08-24, והראיות כאן " +
      "סוגרות אותו עבור MB1C.",
  },

  /* ------------------------------------------------------------ tx:MB31 */
  {
    id: "tx:MB31",
    evidence: [
      MB31_DOC_BATCHES,
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3b07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "קטלוג הפעילויות הנוכחי של MM משייך את 'Goods Receipt for Order' לטרנזקציה MIGO_GO, לצד Goods Issue‏ " +
          "MIGO_GI ו-Goods Receipt from External Procurement‏ MIGO_GR.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Post Goods Receipt for Production Order | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/f3af578e66ec405ebe2c814c18f4d735.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "אפליקציית Fiori בשם 'Post Goods Receipt for Production Order' קיימת ב-SAP S/4HANA וניתנת להרחבה " +
          "על-ידי משתמש-מפתח (key user); הסניפט שנשלף אינו נוקב במזהה האפליקציה, ולכן לא נרשם ממנו מזהה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Post Goods Receipt for Production Order | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/819c7ae2d9754969a865280f0e9ec5ca.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "הסניפט קובע 'App ID: F3110' — אישוש רשמי למזהה אפליקציית קבלת הטובין מהזמנת ייצור. מכאן ש-F0843 " +
          "שב-data/tx-intel.ts מציין אפליקציה אחרת (Post Goods Movement), שמזההּ לא אושש באף סניפט שנשלף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MB31",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המודיעין מתארת את MB31 כקבלת התוצרת הקלאסית מהזמנת ייצור/תהליך (תנועה 101, טבלאות " +
          "MKPF/MSEG/AUFM‏, BAPI_GOODSMVT_CREATE, כתיבה ל-MATDOC ב-S/4), אך שדה ה-s4 שלה אומר 'זמינה כ-legacy; " +
          "MIGO/MIGO_GR הם הסטנדרט' ו-s4Delta נוקב ב-Fiori‏ 'Post Goods Movement (F0843)'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB31",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MB31",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר מסמנת את MB31 כ-Obsolete עם s4:false, תחום פישוט MM-IM, חלופה 'MIGO ‏(101)', ‏Fiori‏ " +
          "'Post Goods Movement', הערת הגירה 'הוסר. GR מפקודה דרך MIGO/אישור עם auto-GR', השפעה Medium.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MB31",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך התיקון הפתוח: סתירות מחזור חיים, קבוצה A — שורת MB31",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MB31 היא אחד מ-9 קודי MB* בסט 'המחלוקת האמיתית' המתועד: lifecycle.ts אומרת הוסר בעוד פרוזת TX_INTEL " +
          "אומרת זמין/legacy; החלופה הרשומה היא MIGO. זו סתירת מחזור החיים שאליה מפנה התור (אותה מחלקה כמו MB01).",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2025.001",
      source: MB31_DOC_BATCHES,
      he:
        "MB31 (קליטת תוצרת מהזמנת ייצור או הזמנת תהליך, סוג תנועה 101) אינה נתמכת עוד לפי התיעוד הרשמי: הוא קובע " +
        "שטרנזקציות MB*, ובהן MB31 במפורש, אינן נתמכות, ושתנועות סחורה עבור קטגוריות ההזמנה השונות — ובכללן " +
        "הזמנות ייצור ותהליך — נרשמות בטרנזקציה MIGO. ברשימת הפעילויות הרשמית של MM-IM, קליטת תוצרת להזמנה " +
        "משויכת ל-MIGO_GO. קיימת גם אפליקציית Fiori בשם Post Goods Receipt for Production Order ‏(App ID: F3110 " +
        "לפי סניפט רשמי). רלוונטי לזרימות ייצור בתעשיות תהליכיות (PP-PI) וב-PP.",
      recommendedAction:
        "ליישר את data/tx-intel.ts (רשומת MB31): להחליף את הניסוח 'זמינה כ-legacy' בסטטוס הוחלפה ב-MIGO/MIGO_GO, " +
        "בהתאם ל-Help הרשמי ול-data/lifecycle.ts. את מזהה אפליקציית ה-Fiori‏ F0843 שבקוד הקיים להשאיר כטעון אימות " +
        "עד שיימצא מקור רשמי הנוקב בו; מזהה האפליקציה לקבלת טובין מהזמנת ייצור אושש רשמית כ-F3110.",
    },
    xrefs: [
      "tx:MB01", "tx:MIGO", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB02", "tx:MB03", "tx:MB11",
      "tx:MBST", "obj:material-document",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס 'הוחלף' מעוגן בשני דפי 2025 FPS01 רשמיים: עמוד Documentary Batches ‏(LO-BM) שהסניפט שלו נוקב " +
      "ב-MB31 בין טרנזקציות MB* שאינן נתמכות וקובע שתנועות לקטגוריות הזמנה נרשמות ב-MIGO, ועמוד Goods Movement ‏" +
      "(MM-IM) המשייך את קבלת התוצרת להזמנה ל-MIGO_GO. הקביעה ש'הפונקציה העסקית של MB31 נישאת ב-MIGO_GO/MIGO' " +
      "היא סינתזה של שתי הראיות עם נתוני המאגר — לא ציטוט של עמוד יחיד (MB31 אינה נזכרת בעמוד הפעילויות). אזהרת " +
      "יושרה שנשמרה: משפט 'not supported' יושב בעמוד ניהול מלאי/אצוות, לא בעמוד פישוט ייעודי; פריט הפישוט הגלובלי " +
      "ל-MB* ומספר ה-SAP Note שלו חסומים ב-S-user והמספר אינו בנתוני המאגר המאומתים — לפי כלל אל-תנחש לא צוטט " +
      "מספר ברשומה זו. חיפוש SAP_S4HANA_CLOUD לא נדרש. מזהה ה-Fiori‏ F0843 ‏(Post Goods Movement) לא אושש באף " +
      "סניפט רשמי שנשלף ונשאר טעון אימות; שם האפליקציה 'Post Goods Receipt for Production Order' ומזההּ F3110 " +
      "אוששו רשמית. תיקון מאגר מומלץ: יישור tx-intel מול lifecycle, סוגר את מחלוקת קבוצה A ‏(תבנית MB01).",
  },

  /* ------------------------------------------------------------ tx:MBST */
  {
    id: "tx:MBST",
    evidence: [
      MBST_SIMPL,
      {
        sourceType: "sap_help",
        sourceTitle: "Cancellation of Goods Movements | Product Lifecycle Management (PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/7bdbc353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תיעוד 2025 FPS01 עדיין מתאר את פונקציית הביטול ב-MBST: ‏'The Cancel Material Document function in " +
          "transactions MBST and MIGO cancels the material document \"as-is\" with all assigned serial numbers, " +
          "quantities, batches, and so on.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3e07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "עמוד ההרשאות של MM-IM ב-2025 FPS01 עדיין מונה 'Cancel Material Document MBST' בין טרנזקציות תנועות " +
          "הסחורה ('...Transfer Posting MB1B Cancel Material Document MBST Store Material Document MBSU...').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת MBST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר מסמנת את MBST כ-Obsolete‏, s4:false, חלופה 'MIGO ‏(Cancellation)', תחום פישוט MM-IM, " +
          "וטקסט הגירה 'הוסר — ביטול מסמך דרך MIGO.'.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MBST",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת MBST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "פרוזת המודיעין אומרת 'זמין ב-S/4HANA. ביטול דרך MIGO/Fiori מומלץ' ונוקבת ב-BAPI_GOODSMVT_CANCEL; " +
          "סותרת את lifecycle.ts בשאלת הזמינות.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MBST",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך התיקון הפתוח: סתירות מחזור חיים, קבוצה A — שורת MBST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "MBST היא אחד מ-12 קודי המחלוקת האמיתית בקבוצה A; מסמך הביקורת דרש פריט פישוט, דף Help או SAP Note " +
          "מצוטט עם המזהה שלו לפני כל שינוי נתונים — וזה מה שרשומה זו מספקת.",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2023 FPS03",
      source: MBST_SIMPL,
      he:
        "MBST (ביטול מסמך חומר) הוחלפה ב-S/4HANA בטרנזקציית המסך האחד MIGO וב-BAPI_GOODSMVT_CANCEL, לפי פריט " +
        "הפישוט S4TWL - Availability of Transactions in MM-IM ‏(SAP Note 2210569). קוד הטרנזקציה עדיין קיים, אך " +
        "קריאה שלו מהתפריט מעלה הודעת שגיאה, והוא משתמש במנגנון נעילה ישן שעלול ליצור אי-עקביות מלאי מול MIGO.",
      recommendedAction:
        "בדיאלוג להשתמש ב-MIGO ‏(Cancellation); בקוד לקוח, ב-BDC ובממשקים להחליף קריאות MBST " +
        "ב-BAPI_GOODSMVT_CANCEL. בנתוני הפרויקט: לעדכן את data/lifecycle.ts (במקום 'הוסר') ואת data/tx-intel.ts " +
        "(במקום 'זמין') לניסוח 'replaced: הקוד קיים, קריאה מהתפריט חסומה בהודעת שגיאה', עם ציון פריט הפישוט " +
        "ו-SAP Note 2210569.",
    },
    xrefs: [
      "tx:MB01", "tx:MB02", "tx:MB03", "tx:MB11", "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31",
      "tx:MBRL", "tx:MIGO", "fm:BAPI_GOODSMVT_CREATE",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "סתירת מחזור החיים יושבה במקור רשמי פומבי, מחלקת יישוב זהה ל-MB01. הראיה המוסמכת: רשימת הפישוט 2023 FPS3 ‏" +
      "(פריט 27.6, עמ' 644-645, הורדה וחולצה לטקסט) מונה את MBST ברשימת ה-MB שהוחלפו ב-MIGO ‏/ " +
      "BAPI_GOODSMVT_CANCEL, קובעת שהקודים קיימים אך קריאה מהתפריט מעלה שגיאה, ומדפיסה את SAP Note 2210569 ואת " +
      "note 2319579 כלשונם — שני המספרים ניתנים לציטוט בלי להמציאם; שדה sapNote לא הוזן (אין קישור me.sap.com " +
      "נגיש או repoRef). הסטטוס המדויק: 'הוחלף' ולא 'הוסר' (lifecycle מפריזה) ולא 'זמין' (tx-intel מקילה); " +
      "היורשת בדיאלוג MIGO, בקוד BAPI_GOODSMVT_CANCEL ‏(אינו מזהה בר-פענוח בדאטהסט ולכן אינו ב-xrefs). חיפוש " +
      "Help ‏(On-Premise) בשלוש וריאציות: אין עמוד 2025.001 הקובע הסרה, ודפי 2025.001 שעדיין מתעדים את MBST " +
      "נרשמו כסתירת גרירת-תיעוד, לא כהוכחת זמינות. ממצא גלישה לתור: MBRL מופיעה באותה רשימת החלפה בפריט 27.6 " +
      "בעוד data/tx-intel.ts קוראת לה 'זמינה' — סומן tx:MBRL לטיפול זהה (קובץ התור). לא בוצעה בדיקת מערכת SAP " +
      "חיה; כל הטענות ממסמכים רשמיים מפורסמים ומקובצי המאגר. ‏accessedAt = 2026-09-02, מועד הגישה בפועל.",
  },

  /* ------------------------------------------------------------ tx:ME21 */
  {
    id: "tx:ME21",
    evidence: [
      ME21_ENJOY,
      {
        sourceType: "sap_help",
        sourceTitle: "Further Details about Dependent Objects | Financial Operations",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/3cb1182b4a184bdd93f8d62e3f1f0741/33b9cc6371324d529178c27cf315353c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "פריטי הזמנת רכש יש ליצור ולתחזק ב-ME21N וב-ME22N; ‏'The ME21N and ME22N transactions replaced the " +
          "previous ME21 and ME22 transactions.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Non-Assigned Purchasing Functions (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: NON_ASSIGNED_PUR_URL,
        accessedAt: DATE2,
        claim:
          "תיעוד S/4HANA 2025 FPS01 עדיין מונה 'Create purchase order ME21' (וכן ME22 ו-ME23) תחת Non-Assigned " +
          "Purchasing Functions — הטרנזקציות הקלאסיות עדיין מתועדות כקיימות במהדורה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Updating Info Records (InfoUpdate) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: INFOUPDATE_URL,
        accessedAt: DATE2,
        claim:
          "התיעוד הנוכחי מכנה את ME21/ME22/ME23 ‏'the conventional purchase order' ועדיין מתאר את התנהגותן " +
          "(ארבעה ערכי InfoUpdate) לצד ME21N/ME22N/ME23N חד-המסך (שני ערכים).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "מיפוי הפעילויות הסטנדרטי הנוכחי ל'Create purchase order' הוא ME21N (שינוי ME22N, הצגה ME23N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת ME21N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "מודיעין המאגר רושם את ME21 כקודמתה הלא-Enjoy שהוצאה משימוש של ME21N ‏(הערת s4‏: 'ME21 הישן (GUI " +
          "לא-Enjoy) deprecated', ‏obsolete: [\"ME21\"]); אין רשומת ME21 קלאסית ייעודית, ו-data/s4-impact.ts אינו " +
          "מזכיר את ME21.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME21N",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:ME21N",
      edition: "on-premise",
      release: "2025.001",
      source: ME21_ENJOY,
      he:
        "הוחלפה בטרנזקציית המסך האחוד ME21N ‏(Enjoy). לפי התיעוד הרשמי של SAP S/4HANA 2025 FPS01, הטרנזקציה " +
        "הקלאסית ME21 עדיין קיימת וניתנת לשימוש, אך היא מתועדת כפונקציה קונבנציונלית שאינה משויכת לתהליך " +
        "הסטנדרטי, ואינה המסלול המומלץ ליצירת הזמנות רכש.",
      recommendedAction:
        "ליצור הזמנות רכש ב-ME21N או באפליקציית Fiori המתאימה. אין לבסס תהליכים חדשים על ME21 הקלאסית; תהליכים " +
        "ישנים שמסתמכים עליה מומלץ להעביר ל-ME21N.",
    },
    xrefs: ["tx:ME21N", "tx:ME22", "tx:ME23", "tx:ME22N", "tx:ME23N", "tx:ME25", "tx:ME24"],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס 'הוחלף' עם היורשת ME21N נתמך ישירות בשני דפי help.sap.com רשמיים במהדורה הנוכחית (2025 FPS01 / " +
      "‏2025.001): עמוד Enjoy Purchase Order ‏('replaces the previous purchase order (transactions ME21, ME22, " +
      "ME23)') והערת האובייקטים התלויים של Financial Operations ‏('ME21N and ME22N transactions replaced the " +
      "previous ME21 and ME22'). ניואנס מחזור החיים יושב: ME21 הוחלפה אך לא הוסרה — אותה מהדורה עדיין מונה אותה " +
      "תחת Non-Assigned Purchasing Functions ומתארת את התנהגות ה-InfoUpdate שלה, ועמוד ה-Enjoy קובע שעדיין ניתן " +
      "להשתמש בה. אף מקור רשמי פומבי שנמצא אינו קובע הסרה, גרסת הסרה או פריט פישוט ל-ME21; קטלוג פריטי הפישוט " +
      "ו-SAP Notes דורשים התחברות S-user, ולכן לא צוטט מספר (כלל אל-תנחש). ‏accessedAt משקף את מועד הגישה בפועל " +
      "של שירות החיפוש (2026-09-02). ‏Tier-2: רשומת ME21N במאגר כבר מסמנת את ME21 כ-obsolete/deprecated — עקבי " +
      "עם ההצהרות הרשמיות.",
  },

  /* ------------------------------------------------------------ tx:ME22 */
  {
    id: "tx:ME22",
    evidence: [
      ME22_ENJOY,
      {
        sourceType: "sap_help",
        sourceTitle: "Changing a Purchase Order (ME22) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/e57eb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "ME22 עדיין מתועדת כנוהל שינוי ב-deliverable של Sourcing and Procurement לגרסת 2025.001 ‏('Choose " +
          "Purchase Order > Change... Specify the number of the purchase order to be changed').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Changing, Canceling, and Blocking Purchase Orders (ME22) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/e27eb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "קיים נושא ייעודי ל-ME22 בתיעוד S/4HANA הנוכחי ('You can change, cancel, and block purchase orders') " +
          "— הטרנזקציה הקלאסית נותרת מתועדת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "SLS: Constraints | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: SLS_CONSTRAINTS_URL,
        accessedAt: DATE2,
        claim:
          "הזמנות רכש קיבוציות 'can only be edited using transactions ME22 and ME22N' — תרחיש ה-Retail " +
          "ב-S/4HANA עדיין מתעד עבודה ב-ME22 לצד ME22N.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Non-Assigned Purchasing Functions (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: NON_ASSIGNED_PUR_URL,
        accessedAt: DATE2,
        claim:
          "התפקיד ששמו הטכני SAP_MM_PUR_ADDITIONAL_FUNC ‏('Non-Assigned Purchasing Functions', פעילויות נוספות " +
          "שאינן מכוסות בתפקידים אחרים) מכסה הזמנות רכש קונבנציונליות: Create Purchase Order‏ ME21, ‏Change " +
          "Purchase Order‏ ME22 — הטרנזקציה הקלאסית קיימת אך מחוץ לפעילויות המשויכות הסטנדרטיות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Further Details about Dependent Objects | Accounting and Financial Close",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8fbeed5f2046489696a50ac7fd76f9c6/33b9cc6371324d529178c27cf315353c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "מגבלה פונקציונלית ב-S/4HANA: ‏'Purchase order items that are created and maintained using " +
          "transactions ME21 or ME22 won't be included in an organizational change'; באותו סניפט גם: 'The ME21N " +
          "and ME22N transactions replaced the previous ME21 and ME22 transactions.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת ME22",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר מסמנת את ME22 כ-Obsolete עם s4:false, חלופה ME22N, וטקסט הגירה 'הוסר' — טענת הזמינות " +
          "(s4:false) סותרת את התיעוד הרשמי של 2025 FPS01 לעיל; טענת היורשת (ME22N) תואמת אותו.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#ME22",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת ME22N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ME22N מתועדת כטרנזקציית שינוי ההזמנה המודרנית; הרשומה מונה את ME22 הקלאסית תחת obsolete/alternative " +
          "וקובעת בשדה ה-s4 ש-ME22 הישנה deprecated. ‏ב-tx-intel.ts אין רשומת ME22 עצמאית.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME22N",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:ME22N",
      edition: "on-premise",
      release: "2025.001",
      source: ME22_ENJOY,
      he:
        "ME22N ‏(Enjoy) מחליפה את ME22 לפי תיעוד SAP‏: 'ME21N, ME22N, ME23N replaces the previous purchase order " +
        "(ME21, ME22, ME23)'. אין בתיעוד הרשמי עדות להסרתה: נהלי ME22 עדיין מתועדים ב-2025 FPS01, וב-Retail " +
        "עריכת הזמנות קולקטיביות מתועדת כאפשרית רק ב-ME22 או ב-ME22N. הטרנזקציה הקלאסית משויכת לתפקיד " +
        "SAP_MM_PUR_ADDITIONAL_FUNC (פונקציות רכש שאינן משויכות), ופריטים שמתוחזקים בה אינם נכללים " +
        "ב-Organizational Change. לא נמצא בחיפושים שבוצעו מקור רשמי הקובע שהיא אינה זמינה.",
      recommendedAction:
        "לתקן את data/lifecycle.ts: לשנות s4 ל-true ולנסח 'הוחלפה ב-ME22N, עדיין זמינה ומתועדת ב-S/4HANA " +
        "On-Premise' במקום 'הוסר' (מבוסס תיעוד רשמי; בדיקת Simplification Item עדיין פתוחה); להנחות משתמשים " +
        "לעבוד ב-ME22N (או Manage Purchase Orders ב-Fiori) ולהשאיר את ME22 לתרחישי legacy/Retail בלבד. אותו " +
        "תיקון נדרש ב-ME21 (אותו דפוס, data/lifecycle.ts#ME21).",
    },
    xrefs: ["tx:ME21", "tx:ME22N", "tx:ME23"],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: scripts/sap-help-search.mjs על SAP_S4HANA_ON-PREMISE ‏('ME22 Change Purchase Order', ‏'Non-Assigned " +
      "Purchasing Functions conventional purchase order') ורובד Tier-2 מהמאגר; כל הטענות הרשמיות תחומות בכותרות " +
      "ובסניפטים של רשומות החיפוש, והמהדורה 2025.001 היא ה-versionId שהוחזר על כל רשומה. הסטטוס 'הוחלף' מותר כי " +
      "עמוד רשמי (Enjoy Purchase Order) נוקב ב-ME21N/ME22N/ME23N כמחליפות; 'לא זמין' אינו נתמך — התיעוד הנוכחי " +
      "עדיין מתעד נהלי ME22. מסקנת אי-ההסרה נשענת על ההצהרה הפונקציונלית של SLS: Constraints ‏('can only be " +
      "edited using transactions ME22 and ME22N') ועל סניפט Further Details — לא על עצם קיום נוהל בתיעוד. נותר " +
      "לא מאומת: פריט הפישוט / ה-SAP Note הפורמליים שמסווגים את מעמד ME22 ‏(SIC ו-me.sap.com/notes דורשים " +
      "התחברות S-user לפי audit/s4-enrichment/MANIFEST.md) — לא צוטט מספר מסיבה זו. ‏accessedAt רוענן ל-2026-09-02, " +
      "מועד ההרצה בפועל.",
  },

  /* ------------------------------------------------------------ tx:ME23 */
  {
    id: "tx:ME23",
    evidence: [
      ME23_ENJOY,
      {
        sourceType: "sap_help",
        sourceTitle: "Non-Assigned Purchasing Functions (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: NON_ASSIGNED_PUR_URL,
        accessedAt: DATE2,
        claim:
          "'Display purchase order ME23' עדיין מנויה בתיעוד S/4HANA 2025, בתפקיד המכסה פעילויות נוספות שאינן " +
          "מכוסות בתפקידים אחרים (שם טכני SAP_MM_PUR_ADDITIONAL_FUNC), בהקשר הזמנות הרכש הקונבנציונליות " +
          "(ME21, ME22).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "General Display Functions in Purchasing (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/a806b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "פעילות 'Display purchase order' המנויה בתפקיד התצוגה הסטנדרטי הזה היא ME23N.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "SLS: Constraints | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: SLS_CONSTRAINTS_URL,
        accessedAt: DATE2,
        claim:
          "תיעוד ה-Retail של S/4HANA 2025 עדיין נוקב ב-ME23 וב-ME23N ‏(Display Purchase Order) כטרנזקציות " +
          "להזמנות רכש קיבוציות — ‏ME23 מתועדת כשמישה ב-2025.001.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Updating Info Records (InfoUpdate) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: INFOUPDATE_URL,
        accessedAt: DATE2,
        claim:
          "ME21/ME22/ME23 מכונות טרנזקציות 'the conventional purchase order', עם התנהגות InfoUpdate ‏(ארבעה " +
          "ערכים) שונה מזו של ME21N/ME22N/ME23N חד-המסך (שני ערכים), ועדיין מתועדות ב-2025.001.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט — רשומת ME23",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר מסמנת את ME23 כ-Obsolete‏, s4:false, חלופה ME23N, טקסט הגירה 'הוסר'. טענת ההסרה " +
          "(s4:false) סותרת את המקורות הרשמיים של 2025.001 לעיל ואינה נתמכת באף מקור רשמי שנמצא; טענת היורשת " +
          "(ME23N) תואמת אותם.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#ME23",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת ME23N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת ME23N מונה את ME23 ב-obsolete:[\"ME23\"] וקובעת 'ME23 deprecated', ונוקבת ב-ME23N כטרנזקציית " +
          "התצוגה המודרנית (Fiori‏: 'Display Purchase Order — F0843' לפי הרשומה — ייחוס Tier-2 בלבד).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME23N",
      },
      {
        sourceType: "repository",
        sourceTitle: "מסמך התיקון הפתוח: סתירות מחזור חיים, קבוצה A — שורת ME23",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "ME23 היא אחת מ-12 סתירות מחזור החיים של קבוצה A‏: lifecycle.ts אומרת 'Obsolete, s4:false' בעוד " +
          "tx-intel של NEO אומרת 'superseded' (רמת אמון verified); שני הצדדים נוקבים ב-ME23N כיורשת.",
        verificationLevel: "repository_verified",
        repoRef: "audit/repair/LIFECYCLE_EVIDENCE_REQUIRED.md",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:ME23N",
      edition: "on-premise",
      release: "2025.001",
      source: ME23_ENJOY,
      he:
        "הטרנזקציה הקלאסית ME23 (הצגת הזמנת רכש) הוחלפה בטרנזקציית ה-Enjoy‏ ME23N, לפי דף SAP Help‏ Enjoy " +
        "Purchase Order. עם זאת, בתיעוד S/4HANA 2025 FPS01 ‏ME23 עדיין מתועדת כניתנת לשימוש (לדוגמה להצגת " +
        "הזמנות רכש קיבוציות ב-Retail) ומסווגת כטרנזקציה קונבנציונלית שאינה משויכת לתפקידים הסטנדרטיים; פעילות " +
        "התצוגה בתפקידים היא ME23N. כלומר: הוחלפה, אך לא הוסרה.",
      recommendedAction:
        "לתקן את data/lifecycle.ts (רשומת ME23): לשנות מ'Obsolete / s4:false / הוסר' לסטטוס הוחלפה " +
        "(superseded) — הוחלפה ב-ME23N אך עדיין קיימת לתאימות לאחור — בהתאם לדף Enjoy Purchase Order בגרסה " +
        "2025.001. לקבל את אותה החלטה יחד עם tx:ME21 ו-tx:ME22, שלושתן אותו דפוס בדיוק.",
    },
    xrefs: ["tx:ME21", "tx:ME22", "tx:ME21N", "tx:ME23N"],
    lastVerifiedAt: DATE2,
    notes:
      "הסטטוס 'הוחלף' עם היורשת ME23N מעוגן בעמוד Enjoy Purchase Order הרשמי (2025 FPS01, ‏versionId ‏2025.001), " +
      "שהסניפט שלו קובע שה-Enjoy‏ ME21N/ME22N/ME23N מחליפות את ME21/ME22/ME23. לא 'לא זמין': שלושה דפי 2025.001 " +
      "נפרדים עדיין מתעדים את ME23 כקיימת ושמישה, ולכן אין להדהד את טענת ההסרה של lifecycle.ts. לא נרשמו מזהה " +
      "SAP Note או פריט פישוט: הערוצים האלה חסומים ב-S-user לפי audit/s4-enrichment/MANIFEST.md (שורות 25-27), " +
      "ואף מספר אינו מופיע בנתוני המאגר המאומתים או בסניפט רשמי פומבי — דבר לא הומצא. טענת אפליקציית ה-Fiori " +
      "היורשת (F0843 לפי tx-intel) נשארת Tier-2 בלבד ואינה נטענת כרשמית. החיפוש רץ מול SAP_S4HANA_ON-PREMISE; " +
      "וריאנט הענן לא נדרש. ‏accessedAt = 2026-09-02 — המועד שהדפיס כלי החיפוש בזמן הריצה בפועל. טבלאות " +
      "EKKO/EKPO/EKBE אינן מזהים בני-פענוח בדאטהסט ולכן אינן ב-xrefs.",
  },

  /* ------------------------------------------------------------ tx:IW31 */
  {
    id: "tx:IW31",
    evidence: [
      IW31_MES,
      {
        sourceType: "sap_help",
        sourceTitle: "EAM, Inspection Checklists | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/9098b757f4244870a2c62ac9d4a0c6af.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תיעוד ה-Logistics של 2025.001 מתאר: 'In the order object list in maintenance order transactions " +
          "IW31, IW32, IW33 and IW81, the new Collective Checklist indicator is available' (היכולת הוצגה " +
          "ב-What's New של S/4HANA 2021).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating Follow-On Orders | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/6e2286549fcf2257e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "'You can create follow-on orders directly (transaction iw31)' — יצירת הזמנות תחזוקה כהזמנות המשך " +
          "ישירות ב-IW31, לפי תיעוד PM-WOC-MO הנוכחי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Orders | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/55828a51fe634affb76fe4283f71c1d9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "'App ID: F5241' — אפליקציית Manage Maintenance Orders מציעה תצוגת רשימה מקיפה של הזמנות תחזוקה " +
          "ועיבוד הזמנות תחזוקה בודדות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a Maintenance Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/c0146ece9f304378804fa395ac851f98.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "'In the Manage Maintenance Orders app (F5241), you can create new maintenance orders of different " +
          "order types and use existing maintenance orders as a template.' (העמוד אינו מזכיר את IW31.)",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Maintenance Orders - Fiori Apps Library (appId=F5241)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F5241",
        accessedAt: DATE2,
        claim:
          "כתובת ספריית האפליקציות ‏(appId=F5241) נגישה; הדף עצמו הוא יישום JS ולא עובד תוכן ממנו — זיהוי " +
          "F5241 = Manage Maintenance Orders נשען על סניפטי ה-Help הרשמיים (הראיות הקודמות ברשומה).",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת IW31",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רובד Tier-2 מהמאגר מסמן את IW31 כזמינה ב-S/4HANA ללא הוצאה משימוש פונקציונלית (הטבלאות הקלאסיות " +
          "AUFK/AFKO/AFVC/RESB ללא שינוי), ונוקב ב-'Create Maintenance Order ‏(F2773 / Manage Maintenance " +
          "Orders)' כחלופת ה-Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW31",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IW31_MES,
      he:
        "טרנזקציית IW31 ליצירת הזמנת תחזוקה זמינה ומתועדת במלואה בתיעוד הרשמי של SAP S/4HANA On-Premise, כולל " +
        "מהדורת 2025 FPS01, ומופיעה גם ביכולות שנוספו במהדורות S/4HANA (למשל מחוון Collective Checklist ברשימת " +
        "האובייקטים של הזמנות תחזוקה). בתיעוד Maintenance Management של מהדורת 2025.001, יצירת הזמנות תחזוקה " +
        "מתועדת באפליקציית Manage Maintenance Orders ‏(F5241), המאפשרת יצירת הזמנות תחזוקה מסוגים שונים ועיבוד " +
        "הזמנות בודדות.",
      recommendedAction:
        "להשאיר את IW31 רשומה כזמינה ב-S/4HANA On-Premise (לא נמצאה הצהרת הוצאה משימוש או יורש בחיפושים " +
        "שבוצעו). לתעד את Manage Maintenance Orders ‏(F5241) כנתיב ה-Fiori המתועד ליצירת הזמנות תחזוקה " +
        "ולעיבודן, וליישב את ההפניה הישנה ל-F2773 ב-data/tx-intel.ts מול F5241 (וכן F2731 ברשומות IW32/IW33).",
    },
    xrefs: ["tx:IW32", "tx:IW33", "tx:IW34", "fiori:F4604"],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשתי שאילתות (On-Premise, ‏21 תוצאות כל אחת), חיפוש רשת מוגבל-דומיין " +
      "לספריית ה-Fiori, ורובד Tier-2 מהמאגר. ‏IW31 מופיעה ב-deliverables רבים של 2025.001 ‏(Maintenance " +
      "Management / Logistics / PP) כולל תוספות יכולת מ-2021-2025, כך שהסטטוס 'ללא שינוי' נתמך ישירות; אף מקור " +
      "רשמי שנמצא אינו קובע הוצאה משימוש או יורש, ולכן אין יורש ברשומה. אף מקור רשמי אינו ממנה חלופת Fiori " +
      "יחידה ל-IW31 (תיעוד Service מפנה גם לאפליקציית 'Create Maintenance Order (IW31)', והמאגר נוקב ב-F2773) — " +
      "לכן F5241 מוצגת כנתיב המתועד, לא כחלופה ממונה, וסתירת המזהים נרשמה בקובץ התור. ‏F5241 אינה קיימת " +
      "ב-data/fiori/apps.ts ולכן אין fiori:F5241 ב-xrefs; פרטי תפקיד/קטלוג/OData של האפליקציה לא אומתו ואינם " +
      "נטענים. ‏accessedAt = 2026-09-02 — התאריך שהטביע כלי החיפוש בפועל.",
  },

  /* ------------------------------------------------------------ tx:IW41 */
  {
    id: "tx:IW41",
    evidence: [
      IW41_SERVICE_APPS,
      {
        sourceType: "sap_help",
        sourceTitle: "Linear Data in Maintenance Documents | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/3a576ff7b13d4f59851307b8d49e0623.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תיעוד Maintenance Management הנוכחי (2025 FPS01) מקבץ את IW41 עם IW43/IW45 כטרנזקציות ה-Confirmation, " +
          "להבדיל מדיווח הזמן הקיבוצי IW42/IW44/IW48.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 10 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/51a4b1cf35ff4886854a2ca1fba16f55.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "'You can do this in the Individual Time Confirmation application (transaction IW41)' — ‏IW41 היא " +
          "אפליקציית דיווח הזמן הפרטני, ועדיין מוזכרת בתיעוד EAM של 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Perform Maintenance Jobs | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/3da57072a73444f18b5ad8785bc2900e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "Perform Maintenance Jobs היא האפליקציה שבה טכנאי תחזוקה סוקר, מבצע ומדווח ממצאים עבור עבודות ששובצו " +
          "('review, execute, and report the findings for jobs that have been dispatched').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Confirmation Scenarios | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/7c1190a34ad244b7b63feb1443db1622.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "תהליך דיווח הזמן הסטנדרטי רץ באפליקציית Perform Maintenance Jobs ‏('You can enhance the standard " +
          "time confirmation process in the Perform Maintenance Jobs app').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements for Perform Maintenance Jobs App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/9ebc3d9ab0c1442db364c2543457421e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "מזהה האפליקציה של Perform Maintenance Jobs הוא F5104A, כלשון הסניפט: 'Perform Maintenance Jobs app " +
          "(F5104A)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Perform Maintenance Jobs - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F5104A",
        accessedAt: DATE2,
        claim:
          "כתובת ספריית האפליקציות ‏(appId=F5104A) נגישה (HTTP 200); הדף הוא יישום JS ותוכן הרישום לא אומת ממנו " +
          "— זהות F5104A נשענת על סניפט ה-What's New (הראיה הקודמת) ועל סניפטים רשמיים נוספים ב-2025.001.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of Confirm Jobs | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/af315b2ddb3e488eb3999f4ae144f0ed.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE2,
        claim:
          "'The Confirm Jobs app (W0020) is deprecated and will be deleted from the SAP Fiori launchpad in an " +
          "upcoming release' — האפליקציה הוצאה משימוש ב-S/4HANA 2022.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE2,
        claim:
          "'The Confirm Jobs app (W0020) has been deleted and is no longer available on the SAP Fiori " +
          "launchpad' — נמחקה החל מ-S/4HANA 2023; אינה חלופה תקפה ל-IW41.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת IW41",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר: IW41 זמינה ב-S/4HANA, הדיווחים נכתבים ל-AFRU ועלות הפעילות זורמת ל-Universal Journal ‏" +
          "(ACDOCA); ‏s4Delta מונה חלופות Fiori‏ 'Perform Maintenance Jobs (F5104A) / Confirm Jobs (F2730)'. " +
          "‏F5104A תואם את המקורות הרשמיים; החלק 'Confirm Jobs (F2730)' סותר אותם.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW41",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IW41_SERVICE_APPS,
      he:
        "טרנזקציית IW41 (אישור זמן פרטני להזמנת תחזוקה) זמינה ב-S/4HANA On-Premise ומתועדת בתיעוד הרשמי של " +
        "ניהול התחזוקה (תחזוקת מפעל) בגרסת 2025 FPS01. חלופת ה-Fiori לטכנאי היא האפליקציה Perform Maintenance " +
        "Jobs ‏(F5104A), שבה מתבצע תהליך אישור הזמן הסטנדרטי. אפליקציית Confirm Jobs ‏(W0020) הוצאה משימוש " +
        "ב-2022 ונמחקה ב-2023.",
      recommendedAction:
        "IW41 נשארת בשימוש ב-S/4HANA; לטכנאי שטח מומלץ לעבוד באפליקציית Fiori בשם Perform Maintenance Jobs ‏" +
        "(F5104A). אין להפנות לאפליקציית Confirm Jobs ‏(W0020) שנמחקה החל מ-S/4HANA 2023.",
    },
    xrefs: [
      "tx:IW42", "tx:IW43", "tx:IW44", "tx:IW45", "tx:IW31", "tx:IW32",
      "fiori:F5104A", "fm:BAPI_ALM_CONF_CREATE", "table:AFRU",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "זמינות ב-S/4 אוששה ב-Tier-1 על מהדורת 2025.001: ‏'Enter PM Order Confirmation (IW41)' מופיעה ברשימות " +
      "האפליקציות הנוכחיות ו-IW41 מתועדת כטרנזקציית ה-Individual Time Confirmation בניהול התחזוקה. חלופת ה-Fiori " +
      "אוששה רשמית: Perform Maintenance Jobs, מזהה F5104A ‏(סניפט ה-What's New נוקב במזהה כלשונו; כתובת ספריית " +
      "ה-Fiori נושאת appId=F5104A אך הדף עצמו לא עובד ולכן ראייתו ברמת 'נדרש אימות נוסף'). הסטטוס 'ללא שינוי', " +
      "לא 'הוחלף': אף מקור רשמי אינו נוקב בטרנזקציה יורשת, ואפליקציית ה-Fiori נרשמת כחלופה בלבד. סתירת מאגר " +
      "סומנה: 'Confirm Jobs (F2730)' ב-tx-intel אינה מאוששת וסותרת את רשומות ההוצאה משימוש (2022) והמחיקה (2023) " +
      "של W0020 — חיפוש נגדי 'Confirm Jobs F2730' לא מצא מקור רשמי הקושר את F2730 לאפליקציה (קובץ התור). פרטי " +
      "תפקיד/קטלוג/OData לא היו ניתנים לאימות מהסניפטים ואינם נטענים. ‏accessedAt = 2026-09-02 — מועד הריצות " +
      "בפועל.",
  },

  /* ------------------------------------------------------------ tx:COR1 */
  {
    id: "tx:COR1",
    evidence: [
      COR1_RETAIL,
      {
        sourceType: "sap_help",
        sourceTitle: "Hide Pricing Information for Production and Process Orders | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ada2cd83fb27435f8b11e0421d299b56.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE2,
        claim:
          "ה-What's New הרשמי מונה 'COR1 - Create Process Order' בנפרד מ-'CO01 - Create Production Order' — " +
          "הזמנת התהליך נשמרת כאובייקט נפרד מהזמנת הייצור ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Segregation of Duties for Order Change and Release | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/ecc7e8cbe9cd4556a0694596dc4a2347.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE2,
        claim:
          "ה-What's New של S/4HANA 2022 מונה את 'Create Process Order COR1' בין טרנזקציות הזמנות התהליך המכוסות " +
          "בהפרדת התפקידים לשינוי ולשחרור הזמנות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: FEATURE_CMP_PI_URL,
        accessedAt: DATE2,
        claim:
          "דף ההשוואה הרשמי מונה: 'App Name Monitor Process / Planned Orders Mass Processing: Process Orders " +
          "Manage Process Orders / Manage Process Order Operations App ID COOISPI COHVPI F4587/ F5323' — " +
          "האפליקציות Manage Process Orders ‏(F4587) ו-Manage Process Order Operations ‏(F5323) לצד COOISPI " +
          "ו-COHVPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Process Order Operations - Fiori Apps Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F5323",
        accessedAt: DATE2,
        claim:
          "ספריית האפליקציות הרשמית מונה את 'Manage Process Order Operations' כאפליקציה F5323 ‏(appId=F5323 " +
          "בכתובת; תוצאת החיפוש המוגבל-דומיין: Apps('F5323')/S23OP).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Display Process Order - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=COR3",
        accessedAt: DATE2,
        claim:
          "ספריית האפליקציות הרשמית מונה את 'Display Process Order' תחת מזהה האפליקציה COR3.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "My Area of Responsibility – Production Supervisor | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/59143de39e7b46d49f1f1d32a12e9400.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE2,
        claim:
          "SAP מתחזקת רכיב Fiori UI ייעודי להזמנות תהליך: PP-FIO-PI ‏(Fiori UI for Process Order), בנפרד " +
          "מ-PP-FIO-SFC ‏(Fiori UI for Production Orders).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת COR1",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "בסיס Tier-2: ‏COR1 יוצרת הזמנת תהליך (קטגוריית הזמנה 40) מ-Master Recipe עם פאזות ו-Control " +
          "Recipes; שדה ה-s4 אומר שהיא קיימת ב-S/4HANA עם חלופות Fiori, אך ה-s4Delta נוקב ב-'Manage Process " +
          "Orders (F3577)' — בסתירה ל-F4587 הרשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#COR1",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: COR1_RETAIL,
      secondary: ["fiori_alternative_available"],
      he:
        "טרנזקציה COR1 (יצירת הזמנת תהליך) זמינה ב-SAP S/4HANA On-Premise, כולל 2025 FPS01: התיעוד הרשמי מציין " +
        "במפורש שניתן להשתמש ב-COR1 ליצירת הזמנת תהליך. הזמנת תהליך (PP-PI, תעשיות תהליכיות) נשמרת כאובייקט " +
        "נפרד מהזמנת ייצור (CO01) גם ב-S/4HANA. חלופת ה-Fiori לפי דף השוואת היכולות של SAP‏: Manage Process " +
        "Orders ‏(F4587) ו-Manage Process Order Operations ‏(F5323).",
      recommendedAction:
        "להשאיר את COR1 כנתיב יצירת הזמנות התהליך ב-S/4HANA On-Premise; להציג את Manage Process Orders ‏(F4587) " +
        "ואת Manage Process Order Operations ‏(F5323) כחלופת ה-Fiori לפי דף ההשוואה הרשמי. לתקן את " +
        "data/tx-intel.ts ‏(s4Delta של COR1), המצטט F3577 במקום F4587 המתועד רשמית.",
    },
    xrefs: [
      "tx:CO01", "tx:COR2", "tx:COR3", "tx:COR8", "tx:COR6N", "tx:CORK", "tx:C201",
      "tx:COOISPI", "tx:COHVPI",
    ],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('COR1 create process order', " +
      "'Manage Process Orders Fiori app'), חיפוש רשת מוגבל-דומיין על fioriappslibrary/fal.cloud.sap, ורובד " +
      "Tier-2 מהמאגר. הזמינות ברמת sap_official_verified: סניפט עמוד ה-Retail של 2025 FPS01 מנחה במפורש שימוש " +
      "ב-COR1, ודפי What's New ‏2021/2022 נוקבים בה בשמה. ההפרדה הזמנת תהליך / הזמנת ייצור רשמית (COR1 מול CO01 " +
      "זו לצד זו; רכיבי Fiori נפרדים PP-FIO-PI מול PP-FIO-SFC). חלופת ה-Fiori‏: 'Manage Process Orders' = F4587 " +
      "לפי סניפט ההשוואה הרשמי; דף ספרייה ישיר ל-F4587 לא נשלף ללא התחברות, ולכן F4587 נשען על סניפט help.sap.com " +
      "— מספיק לפי ה-MANIFEST. ‏F4587 ו-F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם ב-xrefs ‏(COOISPI " +
      "ו-COHVPI נרשמו כ-tx). סתירת F3577 נרשמה בקובץ התור. אף מקור רשמי אינו מסמן את COR1 כמוצאת משימוש או " +
      "מוחלפת — לכן 'ללא שינוי' בלי יורש. ‏accessedAt = 2026-09-02 — מועד הגישה שהדפיס הכלי בפועל.",
  },

  /* ----------------------------------------------------------- tx:COR6N */
  {
    id: "tx:COR6N",
    evidence: [
      COR6N_SHIFT,
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Receipt of Co-Products in Confirmation | Production Orders (PP-SFC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/2deac353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "'Enter Time Ticket for Process Order COR6N' נמנית בין טרנזקציות הדיווח בתיעוד S/4HANA 2025 FPS01 — " +
          "עדיין מתועדת במהדורה הנוכחית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: FEATURE_CMP_PI_URL,
        accessedAt: DATE2,
        claim:
          "דף ההשוואה הרשמי מציין 'App ID COOISPI COHVPI F4587/ F5323' ואת השורה 'Confirm Process Order " +
          "Operation (COR6N) No No Yes' — פעולת האישור זמינה באפליקציות Manage Process Orders / Manage Process " +
          "Order Operations ‏(F4587/F5323) ולא ב-COOISPI/COHVPI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/a84b0308f73c43f29154fbb7e54e15d3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE2,
        claim:
          "אפליקציית Manage Process Orders מציעה 'Confirm Process Orders and Confirm Process Order Operations " +
          "to enter confirmations against process orders and operations' — נתיב Fiori לדיווח (העמוד אינו נוקב " +
          "בקוד COR6N).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Confirm Process Order Phase (COR6N) | SAP S/4HANA Cloud Public Edition",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/2bba750d1e124e1ea2a039bb1cd9b6c5/65be51e410d44d46b333342ed51d61c5.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE2,
        claim:
          "בענן הציבורי COR6N ניתנת גם כאפליקציה בשם 'Confirm Process Order Phase', ‏'App ID: COR6N' בספריית " +
          "האפליקציות של Fiori; ‏'you can partially or finally confirm a phase of a process order by entering a " +
          "time ticket'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Process Order Operations - Fiori Apps Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F5323",
        accessedAt: DATE2,
        claim:
          "כתובת ספריית האפליקציות ‏(appId=F5323) לא עובדה כדף (יישום JS); מיפוי F5323 = Manage Process Order " +
          "Operations מאושש עצמאית בדף ההשוואה הרשמי (הראיה השלישית ברשומה).",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) — רשומת COR6N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "רשומת המאגר: COR6N היא דיווח הפאזה של PP-PI (מקבילת CO11N): מעדכנת AFRU, ‏Backflush 261 / ‏Auto GR " +
          "101 ל-MATDOC, שגיאות ל-COGI, ביטול דרך CORS, ‏BAPI_PROCORDCONF_CREATE_TT; נשמרה ב-S/4HANA. ה-s4Delta " +
          "שלה נוקב בחלופת Fiori‏ 'Confirm Process Order (F3364)' — מזהה שאף מקור רשמי לא אושש.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#COR6N",
      },
      {
        sourceType: "repository",
        sourceTitle: "העשרת הטבלאות של הפרויקט — רשומת AFRU (purposeDeep)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE2,
        claim:
          "העשרת המאגר קובעת שכל דיווח CO11N/COR6N יוצר רשומת AFRU ומפעיל Backflush ו-Auto GR.",
        verificationLevel: "repository_verified",
        repoRef: "data/table-enrichment.ts#AFRU",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: COR6N_SHIFT,
      he:
        "COR6N, דיווח פאזה של הזמנת תהליך במסך אחד (Time Ticket), זמינה ומתועדת ב-SAP S/4HANA On-Premise ‏2025 " +
        "FPS01 עבור תעשיות תהליכיות (PP-PI). בענן הציבורי (2608) היא ניתנת גם כאפליקציה בשם Confirm Process " +
        "Order Phase עם App ID: COR6N בספריית האפליקציות של Fiori. חלופת Fiori מודרנית: האפליקציות Manage " +
        "Process Orders ‏(F4587) ו-Manage Process Order Operations ‏(F5323), הכוללות לפי ההשוואה הרשמית של SAP " +
        "את פעולת האישור Confirm Process Order Operation.",
      recommendedAction:
        "להשאיר; לתקן את מזהה חלופת ה-Fiori במאגר: להחליף את F3364 הלא-מאושש בחלופות המתועדות — פעולת Confirm " +
        "Process Order Operation באפליקציות F4587/F5323 ‏(On-Premise, לפי דף ההשוואה), והאפליקציה 'Confirm " +
        "Process Order Phase' ‏(App ID: COR6N) המתועדת ל-S/4HANA Cloud Public Edition 2608.",
    },
    xrefs: ["tx:CO11N", "tx:COR6", "tx:CORK", "tx:CORS", "tx:CORZ", "table:AFRU"],
    lastVerifiedAt: DATE2,
    notes:
      "הזמינות ב-On-Premise ‏2025 FPS01 נשענת על שלוש רשומות Help של 2025.001 הנוקבות ב-COR6N ‏(דיווח משמרות; " +
      "קבלת תוצרי-לוואי; דף ההשוואה) ועוד רשומה המתעדת את נתיב הדיווח ב-Fiori; אף מקור רשמי שנמצא אינו מסמן " +
      "אותה כמוחלפת או כמוצאת משימוש, ולכן הסטטוס 'ללא שינוי' בלי יורש. חלופת ה-Fiori מעוגנת כפליים: (1) דף " +
      "ההשוואה הרשמי מסמן את 'Confirm Process Order Operation (COR6N)' כזמינה ב-F4587/F5323; ‏(2) תיעוד הענן " +
      "הציבורי מוסר את COR6N עצמה כאפליקציית 'Confirm Process Order Phase' ‏(מהדורת public-cloud מתויגת בנפרד " +
      "בראיה). מזהה F3364 שבמאגר הוא הנתון הלא-מאושש היחיד ונרשם כסתירה בקובץ התור (חיפוש מוגבל-דומיין החזיר דף " +
      "ספרייה קלאסי בשם 'Confirm Process Order' שנפתר ל-Apps('CORK'); תיעוד רשמי מציג את 'Confirm Process Order " +
      "(CORK)' עם App ID: CORK). פרטי BAPI/user-exit נשארים Tier-2 בלבד (בדיקות מערכת חיה לא זמינות בסשן: " +
      "ה-MCP‏ sc4sap לא התחבר). ‏F4587/F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם ב-xrefs. ‏accessedAt = " +
      "2026-09-02 — מועד הגישה בפועל.",
  },

  /* ----------------------------------------------------- tx:IW21 */
  {
    id: "tx:IW21",
    evidence: [
      IW21_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/71b5125d83124e369aea0167e539af4f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה של הודעת תחזוקה (deliverable Data Migration, ‏2025 FPS01) מפנה לאימות הנתונים במערכת " +
          "היעד דרך הטרנזקציות: 'Transaction: Create PM Notification (IW21) Change PM Notification (IW22) " +
          "Display PM Notification (IW23)'. כאפליקציות נוספות הסניפט מונה 'Display PM Notification (IW23)' " +
          "ו-'Process Maintenance Notification (Planner) (W0003)'; אפליקציית Fiori ליצירת הודעה אינה מופיעה " +
          "בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Intelligent Task List Search for Maintenance Orders | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/984b5422dcb243e9b66f77f775850271.html?locale=en-US&state=PRODUCTION&version=2023.003",
        accessedAt: DATE3,
        claim:
          "רשומת What's New של 2023 FPS03 מונה תחת Technical Object Name: 'Transaction: IW31 Transaction: IW32 " +
          "Transaction: IW21 Transaction: IW22', רכיב יישום PM-WOC (Maintenance Processing). היכולת מוסיפה 'A " +
          "new type-ahead search in the Description field of maintenance orders and notifications', כלומר IW21 " +
          "קיבלה תוספת יכולת במהדורת S/4HANA זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Intelligent Task List Search | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/be97f1b1aba241c5bb48a411bfc7532f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד Orders (CS-SE/PM-WOC-MO) לגרסת 2025 FPS01 קובע: 'When you enable this feature for maintenance " +
          "orders and maintenance notifications, the following additional features are available in the " +
          "relevant SAP GUI transactions IW21, IW22, IW31, and IW32', ובהמשך 'Creating Consistent Short " +
          "Descriptions in Maintenance Notifications and Orders'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Notification | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78c09d53839cca11e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד ה-Web UI for Plant Maintenance בתיעוד 2025 FPS01 קובע: 'On the SAP Web UI for Plant " +
          "Maintenance, you can create, change, and display maintenance notifications' ו-'This application " +
          "provides the essential functions of the SAP GUI transactions IW21, IW22, and IW23'. זהו הממשק החלופי " +
          "היחיד שנמצא בתיעוד הרשמי כמכסה במפורש את פונקציות IW21; העמוד מדבר על ה-SAP Web UI for Plant " +
          "Maintenance ולא על אפליקציית Fiori.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IW21_STATUS_SRC,
      he:
        "טרנזקציית IW21 ליצירת הודעת תחזוקה (Create PM Notification) זמינה ומתועדת ב-SAP S/4HANA On-Premise " +
        "2025 FPS01 בכמה deliverables (Maintenance Management, Data Migration, Orders) ואף קיבלה תוספת יכולת " +
        "במהדורת S/4HANA 2023 FPS03 (Intelligent Task List Search). לא נמצאה בחיפושים שבוצעו כל הצהרת פישוט, " +
        "הוצאה משימוש או יורש עבור IW21. התיעוד הרשמי מציין את ה-Web UI for Plant Maintenance כממשק המספק את " +
        "הפונקציות העיקריות של IW21/IW22/IW23; אפליקציות Fiori לבקשות תחזוקה (Request Maintenance F1511, " +
        "Create Maintenance Request F1511A) ו-Manage Maintenance Notifications and Orders (F4604) מתועדות " +
        "בנפרד, אך אף עמוד רשמי שנמצא אינו ממנה אותן כחלופה ל-IW21.",
      recommendedAction:
        "להשאיר את IW21 רשומה כזמינה ללא שינוי ב-S/4HANA On-Premise ולהמשיך להשתמש בה בתרחישי GUI. לתרחישי " +
        "דיווח תקלה מהשטח לשקול את אפליקציות בקשת התחזוקה (F1511 Request Maintenance / F1511A Create " +
        "Maintenance Request) ולניהול הודעות והזמנות במודל השלבים את F4604, לאחר אימות זמינותן במערכת הלקוח. " +
        "לתקן במאגר את צימוד השם למזהה: 'Create Maintenance Request' הוא F1511A ולא F1511 " +
        "(data/lifecycle.ts#IW21, data/tx-intel.ts#IW21).",
    },
    xrefs: ["tx:IW22", "tx:IW23", "tx:IW28", "tx:IW31", "table:QMEL", "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification", "fiori:F1511", "fiori:F4604", "enh:badi:NOTIF_EVENT_SAVE", "enh:exit:QQMA0001"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות (On-Premise, 21 תוצאות כל אחת) וחיפוש רשת מוגבל-דומיין " +
      "לספריית ה-Fiori; גופי עמודי ה-Help לא נקראו, כל טענה תחומה בכותרת ובסניפט של הרשומה. הסטטוס 'ללא " +
      "שינוי' נתמך ישירות: IW21 מופיעה ב-deliverables של 2025.001 ובתוספת יכולת מ-2023 FPS03. חלופת Fiori: " +
      "לא נמצא עמוד רשמי הממנה חלופת Fiori ל-IW21, ולכן לא נרשם דגל fiori_alternative_available ולא יורש; " +
      "עמוד ההשוואה הרשמי (Maintenance Management 2025.001, loio 5d2fbff31efc440b8200fbad95a68dfe) מציב " +
      "'Request Maintenance' = F1511 ו-'Create Maintenance Request' = F1511A, ודף הספרייה Apps('F1511A') " +
      "נושא את הכותרת 'Create Maintenance Request'; F1511A אינה קיימת ב-data/fiori/apps.ts ולכן אינה " +
      "ב-xrefs, ו-fiori:F1511 מקושרת עם ההסתייגות ששמה במאגר שגוי (הסתירה כבר רשומה " +
      "ב-audit/s4-enrichment/research-queue-fiori.md). F4604 (Manage Maintenance Notifications and Orders) " +
      "מתועדת ב-2025.001 (loio d8a94ddd0c514780a9836aa04524f96f) כאפליקציה שבה 'you can manage maintenance " +
      "notifications and maintenance orders that are processed by phases' (כלשון הסניפט); יצירת הודעה אינה " +
      "מוזכרת בסניפט. האפליקציה W0003 (Process Maintenance Notification (Planner)) שנקבה רשומת ה-Data " +
      "Migration אינה במאגר ולכן אינה מקושרת. שכבת ה-lifecycle במאגר גוזרת כיום 'ללא שינוי' עם דגל חלופת " +
      "Fiori על בסיס 'Create Maintenance Request (F1511)'; הרשומה כאן מחליפה את הגזירה במקור רשמי ומסמנת את " +
      "צימוד השם למזהה לתיקון. accessedAt = 2026-09-07 (תאריך הגישה לרשומות החיפוש).",
  },

  /* ----------------------------------------------------- tx:IW22 */
  {
    id: "tx:IW22",
    evidence: [
      IW22_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Intelligent Task List Search for Maintenance Orders | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/984b5422dcb243e9b66f77f775850271.html?locale=en-US&state=PRODUCTION&version=2023.003",
        accessedAt: DATE3,
        claim:
          "רשומת What's New של 2023 FPS03 נוקבת ב-'Transaction: IW22' (לצד 'Transaction: IW21' ו-'Transaction: " +
          "IW32', ובהמשך 'IW22, IW31, and IW32') כאובייקט טכני של היכולת, עם 'Application Component PM-WOC " +
          "(Maintenance Processing)' ו-'Availability SAP S/4HANA and SAP S/4HANA Cloud Private Edition'; שורת " +
          "הטבלה בסניפט מציגה את הערכים 'New', 'PM-WOC' ו-'2023 FPS03'. היכולת: 'An additional Recommend task " +
          "lists option in the header data screen of a maintenance order under Extras, Task List Selection'. " +
          "כלומר, הרשומה מתעדת יכולת שנוספה ל-IW22 במהדורת S/4HANA, לא הוצאה משימוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance notification | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/71b5125d83124e369aea0167e539af4f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מדריך ה-Data Migration של 2025 FPS01 (אובייקט ההגירה PM - Maintenance notification) מפנה לאימות " +
          "הנתונים ב-back end דרך 'Change PM Notification (IW22)', לצד Create PM Notification (IW21) ו-Display " +
          "PM Notification (IW23), ובנוסף מונה את האפליקציות 'Display PM Notification (IW23)' ו-'Process " +
          "Maintenance Notification (Planner) (W0003)' עם הפניה ל-SAP Fiori apps reference library.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Maintenance Notification | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/0149035773b15632e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד Maintenance Management של 2025 FPS01 קובע: 'Three apps are provided for processing a " +
          "maintenance notification: Create Maintenance Notification, Change Maintenance Notification, and " +
          "Display Maintenance Notification', וכי ניתן ליצור, לשנות ולהציג הודעות כמתכנן תחזוקה וכטכנאי תחזוקה. " +
          "הסניפט אינו נוקב במזהי אפליקציה ואינו מזכיר את IW22.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IW22",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רובד Tier-2 מהמאגר מסמן את IW22 כזמינה ב-S/4HANA (verified), ללא טרנזקציה עוקבת (obsolete ריק), עם " +
          "הטבלאות QMEL/QMFE/QMUR/QMMA/QMSM/JEST וה-BAPI‏ BAPI_ALM_NOTIF_DATA_MODIFY, ונוקב ב-'Process " +
          "Maintenance Notification' וב-'Manage Maintenance Notifications and Orders (F4604)' כחלופות ה-Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW22",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IW22_STATUS_SRC,
      he:
        "טרנזקציית IW22 לשינוי הודעת תחזוקה מתועדת כפעילה בתיעוד הרשמי של SAP S/4HANA On-Premise למהדורת 2025 " +
        "FPS01 (Notifications PM-WOC-MN, Maintenance Management, Data Migration), וב-What's New של 2023 FPS03 " +
        "היא מופיעה כאובייקט טכני של יכולת חדשה (Intelligent Task List Search). בחיפושים שבוצעו לא נמצאה " +
        "הצהרת הוצאה משימוש, פריט פישוט או יורש. במקביל, מדריך ה-Data Migration נוקב ב-Process Maintenance " +
        "Notification (Planner) ‏(W0003), ותיעוד Maintenance Management מתעד את אפליקציית Change Maintenance " +
        "Notification (ללא מזהה) כנתיב ה-Fiori לעיבוד הודעת תחזוקה.",
      recommendedAction:
        "להשאיר את IW22 רשומה כזמינה ללא שינוי ב-S/4HANA On-Premise. לתעד את Change Maintenance Notification " +
        "/ Process Maintenance Notification (Planner) ‏(W0003) כנתיב ה-Fiori המתועד, ולתקן את הסטטוס הנגזר " +
        "במאגר: שדה s4Delta ברשומת tx-intel גורם לבונה tx-detail להציג 'משתנה ב-S/4HANA' אף שאין ברשומה הצהרת " +
        "שינוי. ההפניה ל-F4604 כחלופה נשארת ברמת המאגר עד שיימצא מקור רשמי הקושר אותה ל-IW22.",
    },
    xrefs: ["tx:IW21", "tx:IW23", "tx:IW28", "tx:IW31", "tx:IW34", "table:QMEL", "table:QMFE", "table:QMSM", "fm:BAPI_ALM_NOTIF_DATA_MODIFY", "fm:BAPI_ALM_NOTIF_SAVE", "cds:I_MaintenanceNotification", "fiori:F4604", "enh:badi:NOTIF_EVENT_SAVE", "enh:exit:QQMA0001"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות (IW22; Change Maintenance Notification; Manage " +
      "Maintenance Notifications and Orders F4604; Change Maintenance Notification app ID; " +
      "API_MAINTNOTIFICATION; Simplification maintenance notification IW22), חיפוש רשת מוגבל-דומיין לספריית " +
      "ה-Fiori, ורובד Tier-2 מהמאגר. גופי העמודים ב-help.sap.com הם מעטפת JavaScript ולא נקראו; כל טענה " +
      "תחומה בכותרת ובסניפט של רשומת החיפוש. ‏IW22 מופיעה ב-deliverables של 2025.001 (Notifications " +
      "PM-WOC-MN, Maintenance Management, Data Migration, Logistics) וב-What's New 2023 FPS03, כך שהסטטוס " +
      "'ללא שינוי' נתמך ישירות; אף מקור רשמי שנמצא אינו קובע הוצאה משימוש, פריט פישוט או יורש, ולכן אין " +
      "יורש ברשומה. אף מקור רשמי אינו ממנה אפליקציית Fiori יחידה כתחליף ל-IW22: מדריך ה-Data Migration נוקב " +
      "ב-W0003 ‏(Process Maintenance Notification (Planner)), תיעוד Maintenance Management מתאר את Change " +
      "Maintenance Notification ללא מזהה, והמאגר נוקב ב-F4604 (מתועד רשמית כאפליקציה לעיבוד הודעות והזמנות " +
      "לפי שלבים, ללא קישור ל-IW22). ‏W0003 אינה קיימת ב-data/fiori/apps.ts ולכן אין fiori:W0003 ב-xrefs. " +
      "פער נתונים: data/lifecycle.ts אינו מכיל שורת IW22 (רק IW21), ונושא ההשוואה notifications-s4 " +
      "ב-data/ecc-s4.ts מסמן את התחום כ-Changed ברמת UX בלבד, ללא סתירה לזמינות הטרנזקציה. accessedAt = " +
      "2026-09-07, התאריך שהטביע כלי החיפוש בפועל. ביקורת אדברסרית (2026-09-08): ארבעת ה-loio אותרו מחדש " +
      "בכלי החיפוש עם כותרת ו-versionId זהים; ציטוט 'has not yet been completed' תוקן לנוסח הסניפט " +
      "(maintenance and service notifications); הערכים New / PM-WOC / 2023 FPS03 ברשומת What's New נוסחו " +
      "כערכי שורת טבלה ולא כציטוט רציף.",
  },

  /* ----------------------------------------------------- tx:IW32 */
  {
    id: "tx:IW32",
    evidence: [
      IW31_MES,
      IW32_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Creating Follow-On Orders | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/6e2286549fcf2257e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "'The Create Follow-On Order pushbutton is available when you change or display an order " +
          "(transactions iw32 and iw33) as well as in the confirmation (transaction iw41)': יצירת הזמנת המשך " +
          "מתוך שינוי הזמנה ב-IW32, לפי תיעוד PM-WOC-MO של 2025.001.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order: Cancelation of System Status \"Do not Execute\" | What's New in SAP S/4HANA 2020 FPS02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/f7d433f42ea8430c85bb488b27e23b84.html?locale=en-US&state=PRODUCTION&version=2020.002",
        accessedAt: DATE3,
        claim:
          "'Available As Of SAP S/4HANA 2020 FPS02 ... You can now cancel the status Do Not Execute of a " +
          "maintenance order in transactions IW32, IW37N, and IW38': ביטול הסטטוס Do Not Execute ב-IW32 מתועד " +
          "ברשומת What's New של 2020 FPS02; רשומה מקבילה באותה כותרת ב-What's New המאוחד (loio " +
          "ec86ee6af49a4abc9b1bbf2f648b0ecd) נוקבת ב-'Available As Of SAP S/4HANA 1909 SPS04', ולכן מהדורת " +
          "ההצגה המדויקת אינה נקבעת כאן. לפי הסניפט, לאחר הביטול ההזמנה ניתנת לשינוי שוב, היתרים ניתנים לאישור " +
          "מחדש ודגל המחיקה של הרזרבציה ודרישות הרכש מבוטל (הסניפט נקטע במילה 'cancel').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Changing the System Status in the Order | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/8816295411158c24e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "'You can perform status changes for individual maintenance orders in the Change Maintenance Order " +
          "app or in the Manage Maintenance Orders app'; בתנאים המוקדמים: 'In the Change Maintenance Order app, " +
          "some status changes are only available if you have activated the relevant business functions: " +
          "Simplified Management of EAM Functions 3 (LOG_EAM_SIMPLICITY ... _3) Simplified Management of EAM " +
          "Functions 17 (LOG_EAM_SIMPLICITY_17)'. השם הטכני של פונקציה 3 מפוצל בקיטוע הסניפט, של פונקציה 17 " +
          "נראה במלואו. העמוד אינו נוקב בקוד IW32 ולא במזהה אפליקציה; זיהוי 'Change Maintenance Order' כ-IW32 " +
          "נשען על תיעוד Service ועל ספריית האפליקציות (ראיות אחרות ברשומה).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements for Manage Maintenance Orders App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/ec6bf626bf8246439f2795f31e7f07c3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: "2026-09-08",
        claim:
          "'New features are available in the Manage Maintenance Orders app (F5241).': רשומת What's New של 2025 " +
          "FPS01 מייחסת את השם Manage Maintenance Orders למזהה F5241. הרשומה אינה נוקבת בקוד טרנזקציה ואינה " +
          "מכריזה על יורש ל-IW32.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Change Maintenance Order - SAP Fiori Apps Reference Library (appId=IW32)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=IW32",
        accessedAt: DATE3,
        claim:
          "חיפוש רשת מוגבל-דומיין החזיר בספריית האפליקציות הרשמית רשומה שכותרתה 'Change Maintenance Order - SAP " +
          "Fiori Apps Reference Library' תחת appId=IW32; הדף עצמו הוא יישום JS ותוכנו לא נקרא, ולכן נטען כאן רק " +
          "הזיווג שם-מזהה-כתובת. סוג האפליקציה (SAP GUI / Web UI), תפקידים וקטלוגים לא אומתו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 — Feature Pack Stack 3 (SIMPL_OP2023.pdf), בדיקת טקסט מלא",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: "2026-09-08",
        claim:
          "בדיקת טקסט מלא של ה-PDF (1,482 עמודים): אף פריט פישוט אינו נוקב ב-IW32; המופע היחיד של המחרוזת הוא " +
          "שורת טבלה '/SAPCEM/IW32' (ETM). פריט 29.9 'Changes In List Reports For Order and Notification' " +
          "(PM-WOC-MO) עוסק ב-IW37 ו-IW49 בלבד. היעדר פריט אינו הצהרה מפורשת 'ללא שינוי'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IW32",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רובד Tier-2 מהמאגר מסמן את IW32 כזמינה ב-S/4HANA ('זמינה ב-S/4HANA. חלופת Fiori Manage Maintenance " +
          "Orders'), מקשר אותה ל-BAPI_ALM_ORDER_MAINTAIN, ל-BAdI WORKORDER_UPDATE ולהרחבות IWO10009/IWO10018 " +
          "(גם ב-data/exits.ts), ונוקב ב-s4Delta במזהה F2731 עבור Manage Maintenance Orders.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW32",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IW32_STATUS_SRC,
      he:
        "טרנזקציית IW32 לשינוי הזמנת תחזוקה מתועדת בתיעוד הרשמי של SAP S/4HANA On-Premise במהדורת 2025 FPS01: " +
        "ברשימת האפליקציות של Maintenance Management בתיעוד Service ('Maintenance Order (IW32)'), בטבלת " +
        "הטרנזקציות בתיעוד Production Planning ('IW32 Change maintenance order') ובתיעוד PM-WOC-MO ליצירת " +
        "הזמנות המשך מתוך שינוי הזמנה. הטרנזקציה קיבלה יכולות חדשות במהדורות S/4HANA (למשל ביטול הסטטוס Do " +
        "Not Execute, המתועד ב-What's New של 2020 FPS02). אף רשומה רשמית שנמצאה אינה מכריזה על הוצאה משימוש " +
        "או על יורש, ורשימת הפישוט של 2023 FPS3 אינה נוקבת ב-IW32. בתיעוד Maintenance Management של 2025.001 " +
        "שינוי סטטוס של הזמנה בודדת מתועד גם באפליקציית Manage Maintenance Orders (F5241, לפי What's New 2025 " +
        "FPS01), לצד אפליקציית Change Maintenance Order.",
      recommendedAction:
        "להשאיר את IW32 רשומה כזמינה ב-S/4HANA On-Premise (לא נמצאה הצהרת הוצאה משימוש, פריט פישוט או יורש " +
        "בחיפושים שבוצעו). לתעד את Manage Maintenance Orders (F5241) כנתיב ה-Fiori המתועד לשינוי סטטוס " +
        "ולעיבוד הזמנות בודדות, וליישב את ההפניה ל-F2731 ב-data/tx-intel.ts (s4Delta של IW32) מול F5241, יחד " +
        "עם IW31/IW33 (ראו תור ה-Fiori). לפני המרה לבדוק את ה-Business Functions הנדרשים לשינויי סטטוס " +
        "באפליקציית Change Maintenance Order: Simplified Management of EAM Functions 17 " +
        "(LOG_EAM_SIMPLICITY_17, כלשון הסניפט) ו-Simplified Management of EAM Functions 3 (השם הטכני מפוצל " +
        "בסניפט ודורש אימות ב-SFW5 במערכת SAP).",
    },
    xrefs: ["tx:IW31", "tx:IW33", "tx:IW37N", "tx:IW38", "tx:IW41", "table:AUFK", "table:AFIH", "fm:BAPI_ALM_ORDER_MAINTAIN", "enh:badi:WORKORDER_UPDATE", "enh:exit:IWO10009", "enh:exit:IWO10018", "cds:I_MaintenanceOrder"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בחמש שאילתות (On-Premise, 21 תוצאות כל אחת: 'IW32', 'IW32 change " +
      "maintenance order', 'Change Maintenance Order app Maintenance Management', 'What's New maintenance " +
      "order transaction IW32', 'Simplification maintenance order transactions IW32 IW33'), חיפוש רשת " +
      "מוגבל-דומיין (help.sap.com, fioriappslibrary, fal, api.sap.com), בדיקת טקסט מלא של Simplification " +
      "List 2023 FPS3 (PDF ציבורי ב-help.sap.com, נבדק 2026-09-08) ורובד Tier-2 מהמאגר. IW32 מופיעה " +
      "ב-deliverables רבים של 2025.001 (Maintenance Management: Linear Data loio " +
      "3a576ff7b13d4f59851307b8d49e0623, Compatible Unit Management loio b674344393df4c928cc9248d0ba1684b " +
      "בשם 'Change work order'; Finance: Operation Account Assignment loio " +
      "9bb499bb5d794b35b23d438eb28d7079; Logistics: EAM Inspection Checklists loio " +
      "9098b757f4244870a2c62ac9d4a0c6af) וב-What's New של 2021, 2021 FPS01, 2022, 2023 FPS03 ו-2025, כך " +
      "שהסטטוס 'ללא שינוי' נתמך ישירות; רשומות אלה לא נטענו כראיות כדי לשמור על רשומה קריאה. אף מקור רשמי " +
      "שנמצא אינו קובע פריט פישוט, הוצאה משימוש או יורש ל-IW32, ולכן אין יורש ברשומה; SAP Notes דורשים " +
      "S-user ולא נבדקו. הרשומה הרשמית ב-Fiori Apps Reference Library נושאת את המזהה IW32 ואת השם 'Change " +
      "Maintenance Order' (כותרת תוצאת החיפוש); גוף הדף לא נקרא. F5241 אינה קיימת ב-data/fiori/apps.ts ולכן " +
      "אין fiori:F5241 ב-xrefs; המזהה F2731 שבמאגר אינו מופיע באף רשומה רשמית (סתירה פתוחה בתור ה-Fiori). " +
      "מועד ההצגה של ביטול Do Not Execute אינו נקבע: What's New 2020 FPS02 נוקב ב-2020 FPS02, ה-What's New " +
      "המאוחד באותה כותרת נוקב ב-1909 SPS04. גופי העמודים ב-help.sap.com הם יישומי JS ולא נקראו; כל טענה " +
      "תחומה בסניפט של רשומת החיפוש. accessedAt = 2026-09-07 (הרצת החוקר) למעט הראיה המשותפת IW31_MES " +
      "‏(2026-09-02) ושתי ראיות שהוסיף המבקר (2026-09-08).",
  },

  /* ----------------------------------------------------- tx:IW38 */
  {
    id: "tx:IW38",
    evidence: [
      IW38_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 8 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/73868e161e224523a5ee74dd1b6cdae3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "השם הרשמי באנגלית בתיעוד Logistics של 2025.001 הוא 'Change PM Orders (transaction IW38)'. הסניפט " +
          "קובע: 'You can launch the Material Availability Check in the Change PM Orders application " +
          "(transaction IW38), from the List of Orders screen, using the Environment' (תפריט), וכן שנתוני " +
          "קריאות תוכנית תחזוקה זמינים ב-'Change Orders and Operations (transaction IW37N) and Change PM Orders " +
          "(transaction IW38) applications'. אותו נוסח מופיע ברשומות What's New in SAP S/4HANA 1610 FPS02 (loio " +
          "b96ed7506b6e42deadc9ba04be892723 ו-f568ede21cc84a83860ec71a380ce127), כלומר יכולות שנוספו ל-IW38 " +
          "במהדורת S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Changes for Maintenance Orders and Operations | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/521cbb3e5a574bdcadc89ea6a8ed8f64.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "'The following apps allow you to perform mass changes on maintenance orders: Manage Maintenance " +
          "Orders (F5241) Find Maintenance Orders (F2175) Find Maintenance …' (הסניפט נקטע), ובהמשך 'Manage " +
          "Maintenance Notifications and Orders' ופעולת 'Edit Orders or Edit'. זהו נתיב ה-Fiori המתועד " +
          "ב-2025.001 לשינוי גורף של הזמנות תחזוקה, התרחיש שרשומת tx-intel (Tier-2) מייחסת ל-IW38; הסניפט אינו " +
          "מזכיר את IW38 ואינו ממנה לה יורש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Change for Billable Maintenance Orders | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/093dd40d9e174a9fa0d814caf4ca13b8.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "רשומת What's New של 2025 FPS01 קובעת: 'You can now perform mass changes on several billable " +
          "maintenance orders in the SAP GUI transactions IW38 and IW37N, and the following Fiori apps for " +
          "processing maintenance orders: Find Maintenance Orders and Operations, Find Maintenance Orders, " +
          "Manage Maintenance Notifications and Orders, and Manage Maintenance Orders'. כלומר יכולת השינוי " +
          "הגורף של IW38 הורחבה במהדורה זו להזמנות תחזוקה לחיוב, לצד אפליקציות ה-Fiori.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Linear Data in Reports | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/2807244d6b50403682bfb72dce26e428.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "טבלת הדוחות של 2025.001 מונה תחת 'Maintenance Order' את 'IW38, IW39, IW72, IW73', תחת 'Maintenance " +
          "Order (Multilevel)' את IW40, ותחת 'Maintenance Order and Operation' את 'IW37N, IW49N (only available " +
          "in software component EA-APPL)'. IW38 נמנית אפוא בין דוחות הרשימה שבהם מוצגים נתונים ליניאריים " +
          "במהדורה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת IW38",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת המאגר מסמנת את IW38 כ-'זמינה ב-S/4HANA' (verified), ללא רשימת obsolete, וב-s4Delta: 'נשמרת " +
          "ב-S/4HANA' עם חלופות Fiori בשם Manage Maintenance Orders (F2731) ו-Maintenance Planning Overview " +
          "(F2828). מפני שקיים שדה s4Delta, בונה tx-detail מסווג את הטרנזקציה כ-'משתנה ב-S/4HANA' (changed, " +
          "risk medium), אף שהטקסט עצמו אומר שהיא נשמרת. המזהה F2731 סותר את F5241 שבתיעוד הרשמי (ראו " +
          "research-queue-fiori.md, סעיף fiori:F2731).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW38",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IW38_STATUS_SRC,
      he:
        "טרנזקציית IW38 (Change PM Orders, עריכת רשימת הזמנות תחזוקה) מתועדת בתיעוד SAP S/4HANA On-Premise " +
        "2025 FPS01 כטרנזקציית SAP GUI פעילה לעבודה עם רשימות הזמנות תחזוקה, לצד אפליקציות Fiori. היא קיבלה " +
        "תוספות יכולת במהדורות S/4HANA (בדיקת זמינות חומר ממסך List of Orders, עמודות קריאות תוכנית תחזוקה, " +
        "מ-1610 FPS02; שינוי גורף להזמנות תחזוקה לחיוב, מ-2025 FPS01), ואף מקור רשמי שנמצא אינו קובע הוצאה " +
        "משימוש או יורש. תרחיש השינוי הגורף מתועד ב-Fiori באפליקציות Manage Maintenance Orders (F5241), Find " +
        "Maintenance Orders (F2175) ו-Manage Maintenance Notifications and Orders (F4604).",
      recommendedAction:
        "להשאיר את IW38 כזמינה ב-S/4HANA On-Premise ללא יורש. לתקן את הסטטוס הנגזר 'משתנה ב-S/4HANA' המוצג " +
        "כיום: הוא נובע מעצם קיומו של שדה s4Delta ברשומת tx-intel (שאומר 'נשמרת'), לא מהצהרה רשמית. לתקן " +
        "ב-data/tx-intel.ts (IW38, שדה s4Delta; השדות fiori ו-alternative נוקבים בשם האפליקציה בלבד, ללא " +
        "מזהה) את ההפניה 'Manage Maintenance Orders (F2731)' ל-F5241 לפי התיעוד הרשמי. למשתמשי Fiori: לתעד את " +
        "F5241 / F2175 / F4604 כנתיב המתועד לשינוי גורף של הזמנות תחזוקה, כחלופה זמינה ולא כתחליף ממונה.",
    },
    xrefs: ["tx:IW39", "tx:IW32", "tx:IW31", "tx:IW37N", "tx:IW72", "tx:IW73", "tx:IW40", "fiori:F4604", "table:AUFK", "table:AFIH", "fm:BAPI_ALM_ORDERHEAD_GET_LIST"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בחמש שאילתות מול SAP_S4HANA_ON-PREMISE (IW38 change orders list; " +
      "list editing maintenance orders IW38 IW39; Change PM Orders IW38; Manage Maintenance Orders list " +
      "view app; Find Maintenance Orders F2175 list mass edit), חיפוש רשת מוגבל לדומיינים הרשמיים, ורובד " +
      "Tier-2 מהמאגר. IW38 מופיעה ב-deliverables של 2025.001 (Orders PM-WOC-MO, Logistics, Maintenance " +
      "Management, What's New 2025 FPS01, וגם Service: 'Apps Used in Service with Advanced Execution', loio " +
      "13972e812fd6416f950b9afd83900ecf, מונה 'Change PM Orders (IW38)'), ולכן 'ללא שינוי' נתמך ישירות. " +
      "אזהרה: רשומות What's New 'Deprecation of Manage Maintenance Order List App' (2022, loio " +
      "cbfa493335814710ac08f8e4ec6494cf) ו-'Deletion of Manage Order List App' (2023 FPS01, loio " +
      "fa214493e8fd4b6796c8ff94c578d1eb) מדברות על הוצאה משימוש ומחיקה של אפליקציית Fiori, וסניפטיהן נוקבים " +
      "ביורשות Find Maintenance Orders (F2175) ו-Find Maintenance Orders and Operations (F2173); זו " +
      "אפליקציית Fiori, לא הטרנזקציה IW38, ואין להסיק ממנה על IW38. מזהה F4604 (Manage Maintenance " +
      "Notifications and Orders) לקוח מ-data/fiori/apps.ts ומרשומת What's New 2025 'Processing Billable " +
      "Maintenance Orders in SAP Fiori Apps' (loio e78469e89d7047489a3b3b5e574382ee, versionId 2025.000), " +
      "שסניפטה נוקב ב-'Manage Maintenance Notifications and Orders (F4604)'; המזהה אינו מופיע ברשומות הראיה " +
      "עצמן. fiori:F5241 ו-fiori:F2175 אינם ב-data/fiori/apps.ts ולכן אינם ב-xrefs; fiori:F2731 קיים במאגר " +
      "אך מזהה זה אינו מופיע באף מקור רשמי כ-Manage Maintenance Orders ולכן לא נוסף. לא נרשמו SAP Note או " +
      "פריט פישוט: הערוצים חסומים ב-S-user (MANIFEST שורות 25-27) ואף מספר לא הופיע בסניפט רשמי. גופי הדפים " +
      "לא נקראו (JS shell); כל טענה מוגבלת לכותרת ולסניפט. פרטי מסך הבחירה, ה-logical database והפעולות " +
      "הגורפות הכלליות של IW38 שברשומת tx-intel נשארים Tier-2. accessedAt = 2026-09-07, התאריך שהדפיס כלי " +
      "החיפוש בפועל.",
  },

  /* ----------------------------------------------------- tx:IP10 */
  {
    id: "tx:IP10",
    evidence: [
      IP10_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Specifying End Date and End Counter | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/240a205cebe6470496d25e5689c636d7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "'The end dates and end counters are considered during scheduling no matter whether you start the " +
          "scheduling of individual maintenance plans (transaction IP10) or select multiple maintenance plans " +
          "... or all maintenance plans within a specific time-frame for automatic scheduling (transactions " +
          "IP30 or IP30H)'. IP10 היא תזמון תוכנית בודדת; IP30 ו-IP30H הן התזמון האוטומטי של תוכניות מרובות, לפי " +
          "אותו עמוד ב-2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Scheduling and Automatic Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/11825b10747e4ee4b91ecc1dba612536/2d396b50389ff015e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE3,
        claim:
          "אותו עמוד (loio 2d396b50389ff015e10000000a44176d) קיים גם בתיעוד SAP ERP 6.0 EHP8 (גרסה 6.18.latest) " +
          "ומכיל את אותה קביעה: 'To do this, it starts the scheduling of individual maintenance plans " +
          "(transaction IP10)'; הסניפט מוסיף: 'The system goes through all maintenance plans taking parameters " +
          "such as date, maintenance strategies, and counter readings into account and determines whether a " +
          "maintenance plan is due to be scheduled'. זהו בסיס ה-ECC של הטרנזקציה; העמוד אינו אומר דבר על " +
          "S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Schedule Maintenance Plans | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/12f60922946c4ec49807c81ad93d5ba4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "יישום ה-Fiori לתזמון תוכניות תחזוקה המתועד ב-Maintenance Management 2025 FPS01 הוא 'Mass Schedule " +
          "Maintenance Plans Use App ID: F2774 With this app, you can schedule all maintenance plans that are " +
          "due within a specific time frame'; הקטע מוסיף: 'This simplifies the creation of maintenance call " +
          "objects for maintenance plans, especially if you need to schedule large numbers of maintenance " +
          "plans'. הקטע אינו מזכיר את IP10 ואינו נוקב במזהה F4072.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Plans | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/a784971bbee742b2bc491a97583a3621.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE3,
        claim:
          "רשומת What's New לגרסת 2022 קובעת: 'With the Manage Maintenance Plans app, you as a maintenance " +
          "planner can view, create, change, schedule, activate, and delete maintenance plans', בתוקף 'Valid as " +
          "Of SAP S/4HANA 2022'. מזהה היישום (App ID) אינו מופיע בקטע שנחזר, ולכן אינו נטען כאן.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IP10",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רובד Tier-2 מהמאגר מסמן את IP10 כזמינה ב-S/4HANA (s4: 'זמינה ב-S/4HANA'), מקשר אותה לטבלאות MPLA, " +
          "MHIS, MPOS ול-IP30 כניטור המועדים ההמוני, ונוקב ב-'Schedule Maintenance Plans (F4072)' כחלופת " +
          "ה-Fiori. הצימוד F4072 = Schedule Maintenance Plans אינו נתמך ברשומות הרשמיות שנמצאו (ראו רשומת " +
          "fiori:F4072 ורשומת Mass Schedule Maintenance Plans לעיל).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP10",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IP10_STATUS_SRC,
      he:
        "טרנזקציית IP10 לתזמון תוכנית תחזוקה בודדת מתועדת בתיעוד Maintenance Planning (CS-AG/PM-PRM-MP) של " +
        "SAP S/4HANA On-Premise במהדורת 2025 FPS01 כאחת מאפשרויות התזמון, לצד ניטור המועדים IP30, התזמון " +
        "ההמוני IP30H ויומן התזמון (IBIPA / SLG1). אותו תוכן מופיע גם בתיעוד SAP ERP 6.0 EHP8, כך שהפונקציה " +
        "נמשכת מ-ECC ל-S/4HANA ללא הצהרת שינוי או הוצאה משימוש ברשומות שנמצאו. ב-Fiori, תזמון תוכניות תחזוקה " +
        "מתועד ביישום Mass Schedule Maintenance Plans (F2774, תזמון כל התוכניות שמועדן חל בטווח זמן, המקבילה " +
        "של IP30 ולא של IP10) וביישום Manage Maintenance Plans (What's New 2022: תזמון תוכניות בין יכולותיו).",
      recommendedAction:
        "להשאיר את IP10 רשומה כזמינה ב-S/4HANA On-Premise (לא נמצאה הצהרת הוצאה משימוש או יורש). לתקן את " +
        "הפניית ה-Fiori ברשומת tx-intel (s4Delta / fiori): המזהה F4072 שייך לפי התיעוד הרשמי ליישום Screen " +
        "Maintenance Requests (ראו רשומת fiori:F4072), ולכן אין להציגו כחלופת Fiori ל-IP10. לתעד במקומו את " +
        "Mass Schedule Maintenance Plans (F2774) כמסלול ה-Fiori לתזמון המוני ואת Manage Maintenance Plans " +
        "כמסלול לתזמון תוכנית בודדת, לאחר שרשומות Fiori נפרדות יאומתו עבורם. בהמרה: לבדוק את ה-Job של IP30 " +
        "(Batch Input IP10) ואת פרמטרי התזמון, ולוודא שקריאות ב-MHIS ואובייקטי קריאה ב-MHIO נוצרים כמצופה.",
    },
    xrefs: ["tx:IP30", "tx:IP01", "tx:IP02", "tx:IP03", "tx:IP15", "tx:IP16", "tx:IP24", "table:MPLA", "table:MHIS", "table:MHIO", "cds:I_MaintenancePlan", "fiori:F4072"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות On-Premise (21 תוצאות כל אחת) ושאילתה אחת על SAP_ERP, " +
      "חיפוש רשת מוגבל-דומיין לספריית ה-Fiori ול-api.sap.com, ורובד Tier-2 מהמאגר. הריצה בפועל בוצעה " +
      "ב-2026-09-08; accessedAt נושא את חותמת האצווה 2026-09-07 לפי הנחיית העורך, וכל הכתובות המצוטטות " +
      "החזירו HTTP 200 בבדיקה חיה. IP10 מופיעה ב-deliverables של 2025.001 (Maintenance Planning, " +
      "Maintenance Management: 'IP10 Schedule maintenance plan' ברשימת הטרנזקציות ל-Compatible Unit " +
      "Management, loio b674344393df4c928cc9248d0ba1684b; Service: 'Schedule Maintenance Plan (IP10)' " +
      "ברשימת היישומים, loio 13972e812fd6416f950b9afd83900ecf; Logistics EAM Part 8: 'Deadline Monitoring " +
      "for Maintenance Plans (Batch Input IP10) (transaction IP30)', loio " +
      "73868e161e224523a5ee74dd1b6cdae3). עמוד Change Documents (loio f1a8ce5314894208e10000000a174cb4) " +
      "מקשר עדכון תזמון ב-IP10 לשדות MHIO (ADDAT, ADUHR) ול-LRMDT, ADCONFTIME, RZAEH. הבסיס ב-ECC: אותו " +
      "עמוד 'Specifying End Date and End Counter' קיים ב-SAP ERP 6.18.latest (loio " +
      "240a205cebe6470496d25e5689c636d7) ו-What's New EHP8 מזכיר את IP10; רשומת What's New 'Call Horizon in " +
      "Days' של ERP 6.0 מונה 'Transaction for scheduling maintenance plans (IP10 and IP30)'. ברשומת " +
      "'Renaming of Apps in Maintenance Management' (What's New 2025) הקטע מונה שינויי שם ל-IP15 / IP16 / " +
      "IP17 / IP18 / IP40; IP10 אינה נראית בקטע, וגוף העמוד לא נקרא. ספריית ה-Fiori הרשמית מחזיקה רשומה " +
      "'Schedule Maintenance Plan' תחת appId=IP10 (כתובת " +
      "fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=IP10, HTTP 200, גוף app shell), " +
      "ורשומות Mass Schedule Maintenance Plans (F2774), Maintenance Plan Scheduling Overview (W0192) " +
      "ו-Manage Maintenance Plans (F5325 בכותרת הספרייה); אף אחד מהמזהים F2774 / W0192 / F5325 אינו קיים " +
      "ב-data/fiori/apps.ts ולכן אין להם xref. What's New 2021 FPS01 (loio " +
      "b49aca3380b5436aa4e5c494fc0fd33d) מתאר תזמון ו-restart של תוכניות דרך ה-Maintenance Plan API " +
      "(OData); שם ה-API הטכני API_MAINTENANCEPLAN מופיע בסניפט רשומת What's New 2025 FPS01 'OData API: " +
      "Maintenance Plan' (loio 880c79762567475fa24fdd9a0c41f500: 'With the OData API Maintenance Plan " +
      "(API_MAINTENANCEPLAN), you can now perform the following operations: Release Maintenance Call') " +
      "ובכותרת עמוד api.sap.com/api/API_MAINTENANCEPLAN/overview שלא נקרא (app shell); רשומת fm נפרדת לא " +
      "נוצרה כאן ולא נטען סטטוס released_api_available עבור IP10 עצמה, כי הרשומה עוסקת בטרנזקציה ולא ב-API. " +
      "הסטטוס 'ללא שינוי' נשען על התיעוד הרשמי בלבד; אין מקור רשמי הקובע הוצאה משימוש או יורש, ולכן אין " +
      "successor. הסתירה בין tx-intel (F4072 = Schedule Maintenance Plans) לתיעוד הרשמי (F4072 = Screen " +
      "Maintenance Requests) כבר רשומה ברשומת fiori:F4072 ובקובץ התור של ה-Fiori; כאן היא מצוינת בהמלצה ולא " +
      "כסימון conflicting_sources, כי סטטוס IP10 עצמו אינו שנוי במחלוקת. הסטטוס הנגזר שהאפליקציה מציגה היום " +
      "ל-IP10 הוא 'משתנה ב-S/4HANA' (tx-intel): הבונה מעלה disposition 'changed' לכל רשומה שבה שדה s4Delta " +
      "מאוכלס, אף שהטקסט עצמו אומר 'נשמרת ב-S/4HANA'; הרשומה הזו מחליפה אותו ב'ללא שינוי' על בסיס התיעוד " +
      "הרשמי.",
  },

  /* ----------------------------------------------------- tx:IP30 */
  {
    id: "tx:IP30",
    evidence: [
      IP30_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 8 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/73868e161e224523a5ee74dd1b6cdae3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד Enterprise Asset Management Part 8 בתיעוד Logistics של 2025 FPS01 קובע: 'You can filter for " +
          "planning plants in the Deadline Monitoring for Maintenance Plans (Batch Input IP10) application " +
          "(transaction IP30)'. כלומר IP30 קיימת ב-S/4HANA On-Premise 2025 FPS01 עם סינון לפי מפעל תכנון; אותו " +
          "עמוד מונה גם 'Displaying Maintenance Plan Call Information in Order List'. היכולת מופיעה גם ברשומת " +
          "What's New של S/4HANA 1610 FPS02 באותו שם (loio abf10f8a6121496ebc3566fdc72e5459, versionId 1610 " +
          "002).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Plan Scheduling 1 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/c9e717b3620e4898a1aba5db9bf03afc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "ה-Business Function‏ LOG_EAM_MPS1 ('Enterprise Business Function', 'Available From SAP S/4HANA, " +
          "on-premise edition') 'introduces the scheduling function Mass Schedule Maintenance Plans " +
          "(transaction IP30H), which is used to schedule a defined selection of maintenance plans', ומאפשרת " +
          "'to carry out the mass scheduling of maintenance plans faster and more easily'. הסניפט אינו קובע " +
          "ש-IP30 מוחלפת או יוצאת משימוש; IP30H מוצגת כפונקציית תזמון נוספת התלויה בהפעלת ה-Business Function.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Schedule Maintenance Plans | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/12f60922946c4ec49807c81ad93d5ba4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "'App ID: F2774 With this app, you can schedule all maintenance plans that are due within a specific " +
          "time frame' (תיעוד Maintenance Management של 2025 FPS01; האפליקציה מופיעה גם ברשומת What's New של " +
          "S/4HANA 1709 (loio ef815ff35f454fb389d17bbae8ac7250, versionId 1709 000)). זהו נתיב ה-Fiori המתועד " +
          "לתזמון המוני של תכניות תחזוקה; בסניפט שנשלף אין אזכור ל-IP30 ואין הכרזת יורש, ולכן F2774 נרשמת כנתיב " +
          "מקביל ולא כמחליפה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IP30",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רובד Tier-2 מסמן את IP30 כ'זמינה ב-S/4HANA' (verified) ומשייך אליה את הטבלאות MPLA/MHIS/MPOS/MMPT, " +
          "את ה-Customer Exit‏ IPRM0001 ואת אובייקטי ההרשאה I_TCODE/I_SWERK/I_INGRP. שדה s4Delta ברשומה מפנה " +
          "ל'חלופות Fiori קיימות לתזמון בודד (F4072)', מזהה שקובץ התור " +
          "audit/s4-enrichment/research-queue-fiori.md מייחס, על סמך רשומה רשמית, ל-Screen Maintenance Requests " +
          "ולא לתזמון תכניות; אותו שדה הוא שגורם לאפליקציה לגזור כיום סטטוס 'משתנה ב-S/4HANA' ל-IP30.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP30",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IP30_STATUS_SRC,
      he:
        "טרנזקציית IP30 ‏(Deadline Monitoring for Maintenance Plans) מתועדת בתיעוד הרשמי של SAP S/4HANA " +
        "On-Premise, מהדורת 2025 FPS01, כפעילות ניטור המועדים במדריך Maintenance Planning, לצד IP10 לתזמון " +
        "תכנית תחזוקה בודדת ו-IP30H לתזמון המוני שנוסף דרך ה-Business Function‏ LOG_EAM_MPS1. סינון לפי מפעל " +
        "תכנון מתועד עבורה ברשומת What's New של 1610 FPS02. אף רשומה רשמית שנמצאה אינה קובעת הוצאה משימוש, " +
        "יורש או פריט פישוט; נתיב ה-Fiori המתועד לתזמון המוני הוא Mass Schedule Maintenance Plans ‏(F2774), " +
        "כנתיב מקביל ולא כמחליף.",
      recommendedAction:
        "להשאיר את IP30 רשומה כזמינה ללא שינוי ב-S/4HANA On-Premise ולהמשיך להריצה כ-Job רקע תקופתי; לבחון את " +
        "IP30H (דורשת LOG_EAM_MPS1) לתזמון המוני מהיר יותר ואת F2774 כנתיב Fiori. במאגר: להחליף את סטטוס " +
        "'משתנה' שהאפליקציה גוזרת כיום מרובד tx-intel ברשומה מאומתת זו, ולתקן את ההפניה ל-F4072 בשדה s4Delta " +
        "של tx-intel (המזהה מתועד רשמית כ-Screen Maintenance Requests).",
    },
    xrefs: ["tx:IP10", "tx:IP01", "tx:IP24", "table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO", "fm:MAINTENANCE_PLAN_SCHEDULE", "fm:ISCHED_CALL_GENERATE", "cds:I_MaintenancePlan", "enh:exit:IPRM0001"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות On-Premise ('IP30 deadline monitoring maintenance " +
      "plans', 'Deadline Monitoring for Maintenance Plans', 'IP30H', 'Mass Schedule Maintenance Plans app " +
      "ID', 'Maintenance Plan API schedule', 'LOG_EAM_MPS1'; 21 תוצאות כל אחת), חיפוש רשת מוגבל-דומיין " +
      "לספריית ה-Fiori (appId=F2774 מחזיר HTTP 200 אך הדף הוא יישום JS ולא נקרא תוכן ממנו), בדיקת HTTP חיה " +
      "לכל כתובת מצוטטת (200), ורובד Tier-2 מהמאגר. גוף עמודי ה-Help לא נקרא; כל טענה מוגבלת לכותרת ולסניפט " +
      "של רשומת החיפוש. ההבחנה מ-IP10 לפי הרשומה הרשמית: IP10 היא 'Scheduling individual maintenance " +
      "plans', IP30 היא 'Deadline Monitoring for Maintenance Plans (Batch Input IP10)' על מבחר תכניות, " +
      "ו-IP30H היא 'Mass schedule maintenance plans' התלויה ב-LOG_EAM_MPS1; IP30H אינה ביקום המאגר ולכן אין " +
      "אליה xref. רשומות רשמיות נוספות שנמצאו ולא נכללו כראיות: What's New 1610 FPS02 'Planning Plant in " +
      "Maintenance Schedule Date Monitoring' (loio abf10f8a6121496ebc3566fdc72e5459), What's New 1709 'Mass " +
      "Schedule Maintenance Plans' (loio ef815ff35f454fb389d17bbae8ac7250), 'Specifying End Date and End " +
      "Counter' 2025.001 (loio 240a205cebe6470496d25e5689c636d7, 'automatic scheduling (transactions IP30 " +
      "or IP30H)'), 'Scheduling a Maintenance Plan Automatically' 2025.001 (loio " +
      "378b6950e6b6294be10000000a445394), What's New 2021 FPS01 'Schedule Maintenance Plans using " +
      "Maintenance Plan API' (loio b49aca3380b5436aa4e5c494fc0fd33d) ו-What's New 2025 FPS01 'OData API: " +
      "Maintenance Plan' (loio 880c79762567475fa24fdd9a0c41f500, API_MAINTENANCEPLAN). לא נמצאה רשומת " +
      "Simplification Item הנוקבת ב-IP30; היעדר תוצאה בחיפוש אינו הוכחה להיעדר פריט. שם התוכנית RISTRA20 " +
      "מופיע רק במילות המפתח של tx-intel ולא נמצא במקור רשמי, ולכן אינו נטען; כך גם " +
      "BAPI_MAINTENANCEPLAN_SCHEDULE שברשומת tx-intel, שאינו ביקום המאגר. F2774 ו-F5325 אינם " +
      "ב-data/fiori/apps.ts ולכן אין fiori: ב-xrefs; F4072 ו-F2828 שבמאגר לא צורפו כ-xref כי מיפוין ל-IP30 " +
      "הוא אוצרות המאגר ולא מיפוי רשמי. קישורי ה-FM וה-Customer Exit ב-xrefs הם שיוכי Tier-2 " +
      "(function-intel ו-exits.ts, חלקם מסומנים inferred) ולא מיפוי רשמי. לא בוצעה בדיקה במערכת SAP חיה. " +
      "accessedAt = 2026-09-07 לפי הנחיית ה-workflow; הרצת הכלי בפועל הטביעה 2026-09-08. אימות אדברסרי " +
      "2026-09-14: ארבע רשומות ה-Help אושרו מחדש בחיפוש חי (כותרת, versionId 2025.001, loio), ארבע הכתובות " +
      "מחזירות HTTP 200, 11 ה-xrefs פותרים ביקום החי, ורשומת tx-intel#IP30 תואמת מילה במילה.",
  },

  /* ----------------------------------------------------- tx:IE01 */
  {
    id: "tx:IE01",
    aliases: ["IE01 (יצירת ציוד)"],
    evidence: [
      IE01_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Renaming of Apps in Maintenance Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/c9959e6129174269adf7632bb60c4ed8.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE3,
        claim:
          "רשומת ה-What's New למהדורת 2025 קובעת: 'Various apps in Maintenance Management had duplicate app " +
          "titles, and were renamed for reasons of consistency and for more clarity.' רשימת ה-App ID בתקציר " +
          "כוללת את IE01, IE03, IE05 ו-IE08; בהמשך התקציר, לפני השורה 'IE03 Display Equipment (IE03) Display " +
          "Equipment', מופיעות הכותרות 'Create Equipment' ו-'Create Equipment - Plant' כשהמזהה שלפניהן קטוע, " +
          "ו-IE08 מופיע במפורש לצד 'Create Equipment' ו-'Create Equipment - Customer'. ייחוס הצמד 'Create " +
          "Equipment' / 'Create Equipment - Plant' ל-IE01 וכיוון השינוי (כותרת קודמת, כותרת חדשה) הם הסקה מסדר " +
          "העמודות ומהסבר הרשומה על כותרות כפולות; המזהה IE01 עצמו נותר כפי שהוא, והשינוי נוגע לכותרת האפליקציה " +
          "בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Technical Object | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/60021e57f2f40a75e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיעוד Maintenance Management למהדורת 2025 FPS01 קובע: 'Three apps are provided for processing a " +
          "technical object: Create Technical Object, Change Technical Object, and Display Technical Object.' " +
          "וכן 'As a maintenance planner, you can create and change technical objects'. התקציר נוקב בקטלוג " +
          "העסקי 'EAM - Technical Object (SAP_EAM_BC_TO)'; הוא אינו מזכיר את IE01, אינו נוקב במזהה אפליקציה " +
          "ואינו מציין את טכנולוגיית הממשק (הזיהוי כ-Web Dynpro W0029 נשען על רשומת fiori:F2730A).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Create Equipment - SAP Fiori Apps Reference Library (Apps('IE01'))",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020 (S18OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('IE01')/S18OP",
        accessedAt: DATE3,
        claim:
          "חיפוש מוגבל-דומיין החזיר את רשומת ספריית האפליקציות של Fiori שכותרתה 'Create Equipment' תחת " +
          "Apps('IE01'). דף הרשומה הוא יישום JS; שירות ה-OData של הספרייה באותו דומיין (SingleApp.xsodata, " +
          "DetailsParameters(inpfioriId='IE01',inpreleaseId='S18OP',inpLanguage='EN')/Results) מחזיר לרשומה זו: " +
          "Title 'Create Equipment', ApplicationType / UITechnology 'SAP GUI', ReleaseName 'S/4HANA 2020' (מקטע " +
          "S18OP), ApplicationComponent 'PM-EQM-EQ', TechnicalCatalogName " +
          "'SAP_TC_EAM_BE_APPS:S4EAM|SAP_TC_DFS_BE_APPS:S4DFS', NumberofSuccessors '0'. הטרנזקציה רשומה בספרייה " +
          "כאפליקציית SAP GUI במזהה IE01 למהדורת 2020; זמינות במהדורות מאוחרות יותר לא נשאלה בשירות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת IE01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת המאגר (verified) מתארת את IE01 כיצירת רשומת ציוד הכותבת ל-EQUI/EQKT/ILOA עם מקטע זמן ב-EQUZ, " +
          "נוקבת ב-BAPI_EQUI_CREATE כמקבילת ה-API, ב-CDS I_Equipment, ביציאות הלקוח ITOB0001/IEQM0001, ובשדה " +
          "s4: 'זמינה ב-S/4HANA ללא שינוי מהותי'. שדה ה-Fiori שלה נוקב ב-'Manage Technical Objects (F1827 / " +
          "Equipment)', מזהה ושם שלא נמצאו באף מקור רשמי (הסתירה מתועדת ברשומת fiori:F2730A).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IE01",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IE01_STATUS_SRC,
      he:
        "טרנזקציית IE01 ליצירת ציוד (תחזוקת מפעל, אובייקטים טכניים) זמינה ומתועדת ב-SAP S/4HANA On-Premise " +
        "2025 FPS01: תיעוד CS-BD/PM-EQM הנוכחי מתאר אותה כאפליקציית Create Equipment (IE01) שבה בוחרים שותף " +
        "ראשי לציוד, וספריית האפליקציות של Fiori רושמת אותה כאפליקציית SAP GUI במזהה IE01. לפי תקציר רשומת " +
        "ה-What's New למהדורת 2025 (סדר העמודות: מזהה, כותרת קודמת, כותרת חדשה), כותרת האפליקציה שונתה " +
        "ל-'Create Equipment - Plant' כדי להבחין אותה מ-IE08 ('Create Equipment - Customer'); הקוד לא הוחלף, " +
        "ולא נמצאה הצהרת הוצאה משימוש או יורש בחיפושים שבוצעו. נתיב נוסף מתועד ליצירת אובייקטים טכניים " +
        "במהדורה זו הוא אפליקציית Create Technical Object (Process Technical Object; Web Dynpro W0029 לפי " +
        "רשומת fiori:F2730A).",
      recommendedAction:
        "להשאיר את IE01 רשומה כזמינה ב-S/4HANA On-Premise. לעדכן את שדה ה-Fiori ב-data/tx-intel.ts (IE01): " +
        "להחליף את 'Manage Technical Objects (F1827)' הלא-מאושש בנתיבים המתועדים, Create Technical Object " +
        "(Process Technical Object, W0029 לפי רשומת fiori:F2730A) ו-Find Technical Object (F2072). לתעד " +
        "בתסריטי הדרכה ובקטלוגי לוח המשימות את כותרת האפליקציה 'Create Equipment - Plant' ממהדורת 2025 (לפי " +
        "תקציר רשומת ה-What's New), כדי שמשתמשים לא יחפשו את הכותרת הישנה.",
    },
    xrefs: ["tx:IE02", "tx:IE03", "tx:IL01", "tx:IE4N", "table:EQUI", "table:EQKT", "table:EQUZ", "table:ILOA", "fm:BAPI_EQUI_CREATE", "cds:I_Equipment", "enh:exit:ITOB0001"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות (SAP_S4HANA_ON-PREMISE) ושאילתה אחת ב-SAP_ERP, וחיפוש " +
      "רשת מוגבל לדומיינים help.sap.com / fioriappslibrary / fal. IE01 מופיעה ב-deliverables רבים של " +
      "2025.001 (Technical Objects CS-BD/PM-EQM, רשימת ה-Transactions של Service, Data Migration 'PM - " +
      "Equipment', Warranty Objects של Service, Linear Assets של Maintenance Management), וגם בתיעוד SAP " +
      "ERP 6.0 EHP8 (אותו loio של 'Defining a Function Identifier' קיים בשתי המהדורות), כך שהסטטוס 'ללא " +
      "שינוי' נתמך ישירות; אף מקור רשמי שנמצא אינו קובע הוצאה משימוש או יורש, ולכן אין יורש ברשומה. החיפוש " +
      "החזיר גם רשומות What's New הנוקבות ב-IE01 עבור יכולות שנוספו במהדורות 2021 (תאריך סיום שימוש), 2021 " +
      "FPS01 (מאפייני סיווג) ו-2022 (שותף ראשי); הן לא נוספו כראיות כדי לשמור על רשומה קומפקטית, ורק היכולת " +
      "של 2022 נשענת על ראיה ברשומה (התיעוד הנוכחי של 2025.001). שינוי הכותרת ל-'Create Equipment - Plant' " +
      "נקרא מסדר העמודות בתקציר (מזהה, כותרת קודמת, כותרת חדשה) בהתאם להסבר הרשומה על כותרות כפולות; המזהה " +
      "שלפני צמד הכותרות קטוע בתקציר וגוף הדף לא נקרא. אף מקור רשמי אינו נוקב באפליקציה בשם 'Manage " +
      "Technical Objects' או במזהים F1827 / F2730A / F2079 שבמאגר; האפליקציות המתועדות לאובייקטים טכניים הן " +
      "Find Technical Object (F2072), Process Technical Object (W0029, Web Dynpro) ו-Display Technical " +
      "Object (W0028), כמפורט ברשומת fiori:F2730A, ולכן אין xref ל-Fiori ברשומה זו (F2072 ו-W0029 אינם " +
      "קיימים ב-data/fiori/apps.ts). דף ספריית ה-Fiori של Apps('IE01') הוא יישום JS; פרטי הרשומה נקראו " +
      "משירות ה-OData של הספרייה (SingleApp.xsodata) למקטע S18OP = S/4HANA 2020: אפליקציית SAP GUI, רכיב " +
      "PM-EQM-EQ, תפקיד עסקי 'Technical Officer - Armed Forces', ללא יורשים רשומים; זמינות במהדורות 2021 " +
      "ואילך לא נשאלה בשירות. לא נמצא פריט פישוט (Simplification Item) הנוקב ב-IE01 בחיפושים; היעדר בחיפוש " +
      "אינו הוכחה להיעדר בקטלוג הפריטים (דורש S-user). יציאת הלקוח IEQM0001 לא נוספה ל-xrefs מפני שרשומת " +
      "ההרחבה מתעדת סתירה בין תיאור המאגר לתיאור SAP ('Additional checks when installing equipment at " +
      "functional locations'). הסטטוס הנגזר כיום באפליקציה הוא 'משתנה ב-S/4HANA' (tx-intel, אמון מאומת) " +
      "משום שה-builder קורא את המילה 'ממליצה' ואת שדה s4Delta כאות לשינוי; הסטטוס המחובר כאן מחליף אותו על " +
      "סמך הרשומות הרשמיות. בדיקת מערכת חיה לא הייתה זמינה (ה-MCP sc4sap לא התחבר). החיפושים בוצעו בפועל " +
      "ב-2026-09-08; תאריך הגישה הוטבע לפי תאריך האצווה 2026-09-07 שנקבע למשפחה.",
  },

  /* ----------------------------------------------------- tx:IL01 */
  {
    id: "tx:IL01",
    evidence: [
      IL01_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "פריט What's New לגרסת 2025 FPS01 (רכיב PM-EQM-FL, זמינות 'SAP S/4HANA Cloud Private Edition and SAP " +
          "S/4HANA', תקף מ-2025 FPS01) מונה את הערוצים שבהם ניתן להוסיף ולידציות לפרטי מיקום פונקציונלי: 'SAP " +
          "GUI transactions IL01 (Create Functional Location) IL02 (Change Functional Location) Web Dynpro app " +
          "- Process Technical Object (W0029) to create or change technical objects API - Functional Location " +
          "(API_FUNCTIONALLOCATION) SAP Fiori app - Migrate' (הסניפט נקטע אחרי 'Migrate'). IL01 מופיעה כערוץ " +
          "יצירה פעיל ב-2025 FPS01 לצד W0029 ו-API_FUNCTIONALLOCATION; הסניפט אינו נוקב ביורש ל-IL01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Renaming of Apps in Maintenance Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/c9959e6129174269adf7632bb60c4ed8.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE3,
        claim:
          "פריט What's New לגרסת 2025 (בשורת ה-See More: 'App Changed', 'PM', '2025') קובע: 'Various apps in " +
          "Maintenance Management had duplicate app titles, and were renamed for reasons of consistency and for " +
          "more clarity'. ברשימת 'Object Name App ID' של הפריט (תחילת הכותרת נקטעה בסניפט) מופיע IL01 לצד IE01, " +
          "IE03, IE05, IE08, IH03, IH04, IH06, IH07, IH08, IH09, IL05, IL08, IL12 ו-IL15, והסניפט מציג את השורה " +
          "'IL01 Create Functional Location' (הכותרת הישנה); בסניפט אחר נראית תחילת הכותרת החדשה 'Create " +
          "Functional Locations - ' והמשכה נקטע, ולכן הכותרת החדשה המלאה של IL01 לא נקראה. השינוי המתועד בפריט " +
          "הוא בכותרת האפליקציה בלבד.",
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
          "אובייקט ההגירה PM - Functional location (מדריך Data Migration, 2025 FPS01) קובע לבדיקת הנתונים לאחר " +
          "ההגירה: 'You also have the option of validating your data in the back end using the following " +
          "transactions: Transaction: Create Functional Location (IL01) Change Functional Location (IL02) " +
          "Display Functional' וכן 'In addition, you can also use the following app or apps: App: Create " +
          "Functional Location (IL01) Change Functional Location (IL02) Display Functional Location (IL03) " +
          "Display Technical Object'. העמוד מוסיף: 'In SAP S/4HANA, if the Labeling System for Functional " +
          "Locations is used, the object only supports installing the superior functional location " +
          "automatically'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 – Feature Pack Stack 1 (Document Version 1.36)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE3,
        claim:
          "המסמך המלא (1514 עמודים) הומר לטקסט ב-pdftotext ונסרק: אפס מופעים של IL01, IL02, IL03 או IE01; שבעת " +
          "המופעים של 'Functional Location' עוסקים באובייקטי EAM באופן כללי (רשימות אובייקטים, BOM של מיקום " +
          "פונקציונלי) ולא בטרנזקציה. לא נמצא פריט פישוט הנוקב ב-IL01. היעדר פריט אינו הצהרה מפורשת 'ללא " +
          "שינוי'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IL01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רובד Tier-2 מהמאגר (verified: 'verified') מסמן את IL01 כזמינה ב-S/4HANA עם מודל נתונים " +
          "IFLOT/IFLOS/ILOA זהה ותצוגת CDS‏ I_FunctionalLocation, ונוקב ב-'Manage Technical Objects (Functional " +
          "Location)' כחלופת ה-Fiori; הבלופרינט של תחזוקת מפעל (data/sapData.pm.ts, טבלת IFLOT) כותב " +
          "'s4AltTcode: IL01-03 נתמכים; אסטרטגי: Fiori'. הסטטוס הנגזר במאגר הוא 'משתנה ב-S/4HANA' בגלל טקסט " +
          "ה-delta (CDS וחלופת Fiori), לא בגלל שינוי מתועד בטרנזקציה עצמה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IL01",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: IL01_STATUS_SRC,
      he:
        "טרנזקציית IL01 ליצירת מיקום פונקציונלי (Create Functional Location) בתחזוקת מפעל זמינה ומתועדת " +
        "בתיעוד הרשמי של SAP S/4HANA On-Premise עד 2025 FPS01 כולל: תיעוד Technical Objects (PM-EQM) מתאר בה " +
        "יכולות עדכניות (בחירת שותף ראשי, תקף מ-2022), פריט What's New 2025 FPS01 מונה אותה כערוץ יצירה פעיל " +
        "לצד Process Technical Object (W0029) ו-API_FUNCTIONALLOCATION, ומדריך ה-Data Migration של 2025 FPS01 " +
        "מפנה אליה לבדיקת נתונים לאחר הגירה. אף מקור רשמי שנמצא אינו נוקב ביורש, בהוצאה משימוש או בפריט פישוט " +
        "ל-IL01 (מסמכי ה-Simplification List לגרסאות 2023 ו-2025 נסרקו כטקסט מלא ללא מופע של IL01). השינוי " +
        "היחיד שתועד לגבי IL01 ב-2025 הוא שינוי כותרת האפליקציה במסגרת 'Renaming of Apps in Maintenance " +
        "Management' (סוג App Changed); לא נמצא מקור רשמי המתעד שינוי בקוד הטרנזקציה או בתפקודה.",
      recommendedAction:
        "להשאיר את IL01 רשומה כזמינה וללא שינוי ב-S/4HANA On-Premise. בהמרה אין פעולת המרה ייעודית לטרנזקציה, " +
        "ומומלץ Regression Test לפרופילי המסך, למחוון המבנה (structure indicator) ולוולידציות לקוח: ההרחבה " +
        "ITOB0001, ומגרסת 2025 FPS01 גם ה-BAdI‏ BADI_ASM_MD_FUNCLOC לפי פריט ה-What's New. לאחר שדרוג ל-2025 " +
        "לעדכן קטלוגי תפקידים והדרכות לכותרת האפליקציה החדשה של IL01 (הכותרת עצמה טרם אומתה). לתרחישי Fiori " +
        "לתעד את Process Technical Object (W0029, Web Dynpro) ואת API_FUNCTIONALLOCATION כערוצים המתועדים " +
        "ב-2025 FPS01, ולתקן במאגר את ההפניה ל-'Manage Technical Objects (Functional Location)' (F2730A), " +
        "שמזהה ושם זה לא נמצאו באף מקור רשמי לפי רשומת fiori:F2730A.",
    },
    xrefs: ["tx:IL02", "tx:IL03", "tx:IL05", "tx:IH01", "tx:IH06", "tx:IE01", "table:IFLOT", "table:IFLOS", "table:ILOA", "cds:I_FunctionalLocation", "fm:BAPI_FUNCLOC_CREATE", "fm:BAPI_FUNCLOC_CHANGE", "enh:exit:ITOB0001", "fiori:F2730A"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות למוצר SAP_S4HANA_ON-PREMISE ובשאילתה אחת למוצר SAP_ERP " +
      "(הכלי הטביע בפועל את התאריך 2026-09-08; הרשומה נושאת את תאריך האצווה 2026-09-07 לפי ההנחיה). IL01 " +
      "מופיעה ב-deliverables רבים של 2025.001 (Technical Objects, Maintenance Management: Linear Assets, " +
      "Warranty Objects, Technical Objects on the Web User Interface; Logistics: Enterprise Asset " +
      "Management Part 8 ו-Part 17; Data Migration) ובפריטי What's New מ-1610 FPS02 ועד 2025 FPS01, כך " +
      "שהסטטוס 'ללא שינוי' נתמך ישירות. רציפות מ-ECC: הנושא 'Transactions' (loio bcd8c353) מופיע גם " +
      "ב-deliverable של SAP ERP 6.18 (Customer Service) עם אותה שורה 'IL01, IL02, IL03 Create, change and " +
      "display functional location'; נראה ברשומת החיפוש ולא צוטט כראיה נפרדת כדי לשמור על רשומה קצרה. " +
      "Simplification List: מסמך SIMPL_OP2025.pdf (help.sap.com/doc) מצוטט כראיה לאחר סריקת טקסט מלא; מסמך " +
      "SIMPL_OP2023.pdf (אותה כתובת בסיס, גרסת 2023 FPS3) נסרק באותו אופן עם אפס מופעים של IL01, IL02, IL03 " +
      "או IE01; המופעים של 'Functional Location' בשניהם עוסקים באובייקטי EAM באופן כללי ולא בטרנזקציה. " +
      "Fiori: אף מקור רשמי אינו ממנה יורש Fiori יחיד ל-IL01; פריט ה-What's New של 2025 FPS01 נוקב ב-Process " +
      "Technical Object (W0029, Web Dynpro) וב-API_FUNCTIONALLOCATION, ומדריך ה-Data Migration נוקב " +
      "ב-Display Technical Object (W0028 לפי נושא האח loio 7c5578ab). W0028 ו-W0029 (וכן F2072, Find " +
      "Technical Object, הנקוב ברשומת PM - Equipment | Data Migration 2025.001, loio 08c1d29f, ולא ברשומות " +
      "רשומה זו) אינם קיימים ב-data/fiori/apps.ts ולכן לא קושרו; fiori:F2730A קושרה כי היא קיימת בקטלוג " +
      "הפרויקט ורשומת האימות שלה מתעדת שהמזהה לא נמצא באף מקור רשמי (מקורות סותרים). חיפוש רשת מוגבל-דומיין " +
      "החזיר כתובות ספרייה עם appId ל-IL03 ול-IH01 בלבד, ולא כתובת הנושאת appId=IL01; דפי הספרייה הם יישומי " +
      "JS ולכן לא נוספה ראיה מסוג fiori_library. הכותרת החדשה של IL01 לאחר שינוי השמות ב-2025 לא נקראה " +
      "במלואה: מסמך ה-PDF‏ WN_OP2025_EN.pdf מוחזר מ-help.sap.com כמעטפת HTML ולא כ-PDF, והסניפט נקטע אחרי " +
      "'Create Functional Locations - '. הסטטוס הנגזר במאגר ('משתנה ב-S/4HANA', מ-tx-intel) נובע מטקסט " +
      "ה-delta על CDS וחלופת Fiori ולא משינוי מתועד; רשומה זו קובעת 'ללא שינוי' על סמך הראיות הרשמיות. " +
      "בדיקה במערכת SAP חיה (SE93, פרופיל מסך) לא בוצעה: חיבור sc4sap MCP לא היה זמין.",
  },

  /* ----------------------------------------------------- tx:COR2 */
  {
    id: "tx:COR2",
    evidence: [
      COR2_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Transaction Codes in Cost Object Controlling | Controlling (CO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/ebc64252eaa43507e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "טבלת קודי הטרנזקציה של Cost Object Controlling ב-2025 FPS01 מונה 'COR2 Change process order' עבור " +
          "Process orders, בנפרד מ-'CO02 Change PP production order' עבור Production orders with quantity " +
          "structure, ולצדה 'COR3 Display process order'. הזמנת תהליך והזמנת ייצור הן שני אובייקטי עלות נפרדים " +
          "עם קודי טרנזקציה נפרדים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Segregation of Duties for Order Change and Release | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/ecc7e8cbe9cd4556a0694596dc4a2347.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE3,
        claim:
          "ה-What's New של S/4HANA 2022 מונה 'Change Process Order COR2' בין טרנזקציות הזמנת התהליך (לצד COR1, " +
          "CORO, COR5, COR7, COR8, COR7_PC ו-COHVPI) שעליהן חל אובייקט ההרשאה החדש C_AFKO_REL, אשר 'enables you " +
          "to separate the authorization for creating and changing production orders or process orders from' " +
          "(המשך המשפט מופיע מעבר לסניפט; כותרת הרשומה היא Order Change and Release). הסניפט מוסיף: 'Valid as " +
          "Of SAP S/4HANA 2022', 'Application Component PP-SFC (Production Orders) PP-PI-POR (Process Orders)' " +
          "וכן 'Effects on Existing Data Existing roles are not automatically updated.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "דף ההשוואה הרשמי ל-2025 FPS01 מונה 'App Name Monitor Process / Planned Orders Mass Processing: " +
          "Process Orders Manage Process Orders / Manage Process Order Operations App ID COOISPI COHVPI F4587/ " +
          "F5323' ואת השורה 'Change Order (CO02) Yes Yes Yes': פעולת שינוי ההזמנה זמינה בשלושת נתיבי ה-Fiori " +
          "להזמנות תהליך. השורה נושאת את התווית CO02 גם בדף הזמנות התהליך; הסניפט אינו נוקב ב-COR2.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת COR2",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת המאגר: COR2 מעדכנת הזמנת תהליך (שחרור REL, תזמון מחדש, שינוי פאזות ורכיבים, יצירת Control " +
          "Recipe, TECO), כותבת AUFK/AFKO/AFPO/AFVC/RESB/JEST, ונוקבת ב-BAPI_PROCORD_CHANGE, " +
          "BAPI_PROCORD_RELEASE ו-BAPI_PROCORD_COMPLETE_TECH וב-user exits PPCO0001/PPCO0007. שדה s4: 'קיימת " +
          "ב-S/4HANA'; ה-s4Delta נוקב בחלופת Fiori 'Manage Process Orders (F3577)', מזהה שאף רשומה רשמית לא " +
          "אוששה (המתועד: F4587). בגלל ה-s4Delta הלא-ריק ה-builder גוזר כיום 'משתנה ב-S/4HANA' (changed) ברמת " +
          "אמון 'מאומת'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#COR2",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: COR2_STATUS_SRC,
      secondary: ["fiori_alternative_available"],
      he:
        "טרנזקציה COR2 (שינוי הזמנת תהליך) זמינה ומתועדת ב-SAP S/4HANA On-Premise 2025 FPS01: תיעוד " +
        "ה-Material Staging מנחה במפורש שימוש ב-'transaction COR2 or COHVPI' להזמנות תהליך, וטבלת קודי " +
        "הטרנזקציה של Cost Object Controlling מונה אותה כ-'COR2 Change process order' בנפרד מ-CO02 (הזמנת " +
        "ייצור). הזמנת תהליך (PP-PI, תעשיות תהליכיות) נשמרת כאובייקט נפרד מהזמנת ייצור גם ב-S/4HANA. שינוי " +
        "S/4HANA שנוגע ל-COR2: מגרסת 2022 אובייקט ההרשאה C_AFKO_REL מפריד בין הרשאת שינוי ההזמנה להרשאת " +
        "השחרור. חלופת ה-Fiori לפי דף ההשוואה הרשמי: Manage Process Orders (F4587) ו-Manage Process Order " +
        "Operations (F5323), שבהן פעולת שינוי ההזמנה זמינה.",
      recommendedAction:
        "להשאיר את COR2 כנתיב השינוי והשחרור של הזמנות התהליך ב-S/4HANA On-Premise. בתכנון ההרשאות ל-S/4HANA " +
        "2022 ומעלה להחליט אם להפריד הרשאת שינוי מהרשאת שחרור באמצעות C_AFKO_REL, ולבדוק את התאמת התפקידים " +
        "הקיימים (ה-What's New מציין: 'Existing roles are not automatically updated'). להציג את Manage " +
        "Process Orders (F4587) ואת Manage Process Order Operations (F5323) כחלופת ה-Fiori. לתקן את " +
        "data/tx-intel.ts (s4Delta של COR2), המצטט F3577 במקום F4587 המתועד; לאחר התיקון הסטטוס הנגזר במאגר " +
        "יחזור ל-'זמינה' במקום 'משתנה'.",
    },
    xrefs: ["tx:COR1", "tx:COR3", "tx:CO02", "tx:COHVPI", "tx:COOISPI", "tx:COR5", "tx:COR7", "tx:COR8", "tx:CORO", "tx:COR6N", "tx:CORK", "tx:CO53", "fm:BAPI_PROCORD_RELEASE", "fm:BAPI_PROCORD_COMPLETE_TECH", "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:RESB", "table:JEST", "enh:exit:PPCO0001", "enh:exit:PPCO0007", "enh:exit:PPCO0021", "enh:badi:WORKORDER_UPDATE", "fiori:F3577"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ('COR2 change process order', " +
      "'Changing a Process Order', 'process order Manage Process Orders Fiori', 'process order PP-PI " +
      "simplification transaction', 'Feature Comparison for Process Orders', וכן 'Change Process Order " +
      "(COR2)' במוצר SAP_S4HANA_CLOUD), חיפוש רשת מוגבל-דומיין על fioriappslibrary / fal.cloud.sap / " +
      "help.sap.com, ורובד Tier-2 מהמאגר. מה שאומת ברמת sap_official_verified: הזמינות ב-On-Premise 2025 " +
      "FPS01 (שתי רשומות 2025.001 הנוקבות ב-COR2 בשמה: Material Staging with EWM; טבלת קודי הטרנזקציה של " +
      "Cost Object Controlling), ההפרדה הזמנת תהליך מול הזמנת ייצור (COR2 מול CO02 זו לצד זו בשתי רשומות, " +
      "וב-What's New 2021 'CO02 - Change Production Order COR2 - Change Process Order', loio " +
      "ada2cd83fb27435f8b11e0421d299b56), אובייקט ההרשאה C_AFKO_REL (What's New 2022), וחלופת ה-Fiori " +
      "F4587/F5323 (דף ההשוואה 2025.001). אף רשומה רשמית שנמצאה אינה מסמנת את COR2 כמוחלפת, מוגבלת או לא " +
      "אסטרטגית, ואף פריט Simplification בשם לא עלה בחיפוש; לכן 'ללא שינוי' בלי יורש, עם דגל חלופת Fiori. " +
      "רשומות נוספות שנמצאו ולא נכללו כראיות: (1) תוצאת חיפוש רשת מפנה לדף ספרייה בכתובת " +
      "fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=COR2 בכותרת 'Change Process Order - " +
      "SAP Fiori Apps Reference Library'; שליפה ישירה מחזירה HTTP 200 עם כותרת המעטפת הכללית 'SAP Fiori " +
      "Apps Reference Library' בלבד (גוף הדף לא נקרא); (2) בענן הציבורי 2608.500 הרשומות 'Maintain " +
      "Collective Order' (loio c704b753128eb44ce10000000a174cb4) ו-'Settlement Rules of Manufacturing " +
      "Orders' (loio a464ad1a48ca4c5e976ed6534153d8ff) נוקבות ב-'Change Process Order (COR2)' כאפליקציה, " +
      "כלומר COR2 קיימת גם ב-S/4HANA Cloud Public Edition; הרשומה 'Business Transaction Control for Process " +
      "Orders' (SAP_S4HANA_CLOUD 2208.500, loio 3f1abc9dd8d14ab6a17ceb73b8d68169) נוקבת ב-'Manage Process " +
      "Orders (F4587)' במפורש, אך היא ענן ציבורי ואינה ראיה לסטטוס On-Premise; (3) הנושא 'Changing a " +
      "Process Order' (Logistics General, 2025.001, loio 5f54d355c1f348468e4e71e2886672c3) מתאר את נוהל " +
      "השינוי דרך התפריט, אך הסניפט אינו נוקב בקוד הטרנזקציה. F4587 ו-F5323 אינם קיימים " +
      "ב-data/fiori/apps.ts ולכן אינם ב-xrefs; fiori:F3577 נכלל כי זו רשומת המאגר של Manage Process Orders " +
      "(המזהה שנוי במחלוקת, ראו רשומת fiori:F3577 וקובץ התור של ה-Fiori). פרטי BAPI, user exit ואובייקטי " +
      "הרשאה נשארים Tier-2 בלבד: בדיקת מערכת חיה לא הייתה זמינה (ה-MCP sc4sap לא התחבר), " +
      "ו-BAPI_PROCORD_CHANGE אינו ביקום המזהים ולכן אינו ב-xrefs. PPCO0021 מגיע מ-data/exits.ts (tcodes " +
      "CO02/COR2, מסומן inferred: true) ולא מרשומת tx-intel. תאריך הגישה שהוטבע הוא תאריך האצווה " +
      "(2026-09-07); הכלי הדפיס accessedAt 2026-09-08 בריצה בפועל.",
  },

  /* ----------------------------------------------------- tx:COR3 */
  {
    id: "tx:COR3",
    evidence: [
      COR3_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Process order (only open PO) | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/011bdaaa5ce047f690cb9f8319c6efed.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מדריך ההגירה של 2025 FPS01 לאובייקט 'PP - Process order (only open PO)' מציע לאמת את הנתונים " +
          "המהוגרים ב-back end דרך 'Transaction: Display Process Order (COR3)' ומוסיף: 'App: Display Process " +
          "Order (COR3) Open the SAP Fiori apps reference library by choosing the app name above'. הסניפט מציין " +
          "שמדובר בהגירת הזמנות תהליך בסטטוס Created או Released.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "דף ההשוואה הרשמי להזמנות תהליך (2025 FPS01) משווה, כלשונו, 'the features offered by various apps for " +
          "processing process orders and process operations', ומונה בכותרת הטבלה: 'App Name Monitor Process / " +
          "Planned Orders Mass Processing: Process Orders Manage Process Orders / Manage Process Order " +
          "Operations App ID COOISPI COHVPI F4587/ F5323'. הסניפט מציג שורות כגון 'Change Order (CO02) Yes Yes " +
          "Yes' ו-'Confirm Process Order Operation (COR6N) No No Yes'; שורה ייעודית להצגת הזמנת תהליך לא נראתה " +
          "בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Display Process Order (COR3) | SAP S/4HANA Cloud Public Edition",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/2bba750d1e124e1ea2a039bb1cd9b6c5/1c9478a673e84ce3bc8bc634308eb354.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE3,
        claim:
          "בתיעוד SAP S/4HANA Cloud Public Edition 2608 קיים עמוד בשם 'Display Process Order (COR3)' הנושא 'App " +
          "ID:COR3' ומתאר: 'With this app you can you can check the details of a process order'; לפי הסניפט " +
          "ניתן גם לחפש הזמנות תהליך לפי קריטריונים ולהציג את התוצאות ברשימה, ומתוך רשימת התוצאות: 'Display " +
          "details of the process order Edit the details of the process order'. מהדורת ענן ציבורי, מתויגת בנפרד " +
          "מה-On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת COR3",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "בסיס Tier-2: רשומת המאגר מגדירה את COR3 כטרנזקציית הצגה בלבד של הזמנת תהליך (קוראת " +
          "AFKO/AFPO/AFVC/RESB/JEST ומציגה document flow, עלויות וסטטוסים, ללא יכולת עדכון), עם s4 = 'זמין " +
          "ב-S/4HANA', BAPI קשור BAPI_PROCORD_GET_DETAIL ואובייקטי הרשאה C_AFKO_AWK ו-C_AFKO_ATY. ה-s4Delta שלה " +
          "נוקב ב-'עלויות מ-ACDOCA; חלופת Fiori - F3577'; מזהה F3577 אינו מופיע באף רשומה רשמית שנמצאה (דף " +
          "ההשוואה הרשמי נוקב ב-F4587).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#COR3",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: COR3_STATUS_SRC,
      secondary: ["fiori_alternative_available"],
      he:
        "טרנזקציה COR3 (הצגת הזמנת תהליך) זמינה ומתועדת ב-SAP S/4HANA On-Premise 2025 FPS01 עבור תעשיות " +
        "תהליכיות (PP-PI): נוהל ההצגה הרשמי מנחה במפורש 'you can use the transaction COR3 to display a " +
        "process order', ומדריך ההגירה של אותה מהדורה מונה אותה גם כאפליקציה 'Display Process Order (COR3)' " +
        "בספריית האפליקציות של Fiori. דף ההשוואה הרשמי להזמנות תהליך מונה כאפליקציות לעיבוד הזמנות תהליך את " +
        "COOISPI, את COHVPI ואת Manage Process Orders (F4587) / Manage Process Order Operations (F5323). אופי " +
        "'הצגה בלבד' של הטרנזקציה נשען על רשומת המאגר (tx-intel); הסניפט של עמוד הענן הציבורי (2608) לאותה " +
        "אפליקציה מונה גם 'Edit the details of the process order' מתוך רשימת התוצאות. בענן הציבורי COR3 " +
        "מתועדת כאפליקציה עם App ID: COR3.",
      recommendedAction:
        "להשאיר את COR3 כנתיב ההצגה של הזמנות תהליך ב-S/4HANA On-Premise, כולל לתפקידי בקרה ותמיכה שאינם " +
        "זקוקים ל-COR2 (אופי ההצגה בלבד נשען על רשומת המאגר, לא על סניפט רשמי). להציג כחלופות Fiori את Manage " +
        "Process Orders (F4587) ואת Manage Process Order Operations (F5323), האפליקציות שדף ההשוואה הרשמי " +
        "מונה לעיבוד הזמנות תהליך. לתקן את data/tx-intel.ts (s4Delta של COR3), המצטט F3577 במקום F4587 " +
        "המתועד. הטענה 'עלויות מ-ACDOCA' שב-s4Delta לא אוששה במקור רשמי ברשומה זו ונשארת ברמת המאגר.",
    },
    xrefs: ["tx:COR1", "tx:COR2", "tx:CO03", "tx:COOISPI", "tx:COHVPI", "tx:COR6N", "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:RESB", "table:JEST", "fm:BAPI_PROCORD_GET_DETAIL"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ('COR3 display process order', " +
      "'Display Process Order', 'COR3', 'Displaying Process Orders app', 'simplification process order " +
      "transaction PP-PI', 'process order API_PROCESSORDER_2 CDS view I_ProcessOrder', וחיפוש מקביל במוצר " +
      "SAP_S4HANA_CLOUD), חיפוש רשת מוגבל-דומיין על fioriappslibrary/fal/help/api, ורובד Tier-2 מהמאגר " +
      "(tx-intel). הזמינות ב-On-Premise 2025 FPS01 נשענת על נוהל ההצגה (Logistics - General) הנוקב ב-COR3 " +
      "בשמה, ועל מדריך ההגירה של 2025 FPS01 המונה אותה כטרנזקציה וכאפליקציה בספריית Fiori. רשומות רשמיות " +
      "נוספות שנמצאו ולא צוטטו כראיה: What's New 2021 'Hide Pricing Information for Production and Process " +
      "Orders' (loio ada2cd83fb27435f8b11e0421d299b56) המונה 'COR3 - Display Process Order' בין האפליקציות " +
      "המושפעות מהרשאת הצגת מחירים; 'Transaction Codes in Cost Object Controlling' (Controlling, 2025.001, " +
      "loio ebc64252eaa43507e10000000a441470) המונה 'COR3 Display process order Process orders'; תפקיד PFCG " +
      "'Display Process Order' (2025.001, loio 2b25bf53d25ab64ce10000000a174cb4) בשם טכני " +
      "SAP_PP_PI_PROC_ORDER_STD; ודפי App Implementation של PP-MRP (2025.001) המונים 'Display Process Order " +
      "(COR3)' כטרנזקציית back end הנפתחת מאפליקציית Manage Production Orders or Process Orders. חיפוש " +
      "מוגבל-דומיין החזיר את דף הספרייה הקלאסית 'Display Process Order - SAP Fiori Apps Reference Library' " +
      "בכתובת fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('COR3')/S20OP; גוף " +
      "הדף לא נקרא (יישום JS). אותו loio (1c9478a673e84ce3bc8bc634308eb354) מופיע בתיעוד On-Premise " +
      "2025.001 תחת הכותרת 'Displaying Process Orders' (הסניפט שם אינו נוקב בקוד COR3) ובתיעוד הענן הציבורי " +
      "2608 תחת 'Display Process Order (COR3)'. אף מקור רשמי שנמצא אינו מסמן את COR3 כמוחלפת, כמוצאת משימוש " +
      "או כפריט פישוט, ולכן הסטטוס 'ללא שינוי' בלי יורש, עם דגל משני של חלופת Fiori. הסטטוס הנגזר " +
      "שהאפליקציה מציגה כיום ('משתנה ב-S/4HANA', מקור tx-intel) נובע רק מקיומו של טקסט s4Delta ברשומת המאגר " +
      "ולא מאות רשמי לשינוי. לא אומתו ברשומה זו: 'עלויות מ-ACDOCA', אובייקטי ההרשאה C_AFKO_AWK / C_AFKO_ATY " +
      "ופרטי BAPI_PROCORD_GET_DETAIL (Tier-2 בלבד; בדיקת מערכת חיה לא זמינה בסשן, ה-MCP sc4sap לא התחבר). " +
      "F4587 ו-F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם ב-xrefs; fiori:F3577 שבמאגר אינו מקושר בגלל " +
      "הסתירה הרשומה בקובץ התור של Fiori. הסניפט של What's New 2021 FPS01 (loio " +
      "77ff56ba8e584f4cb537b660e7810fd7) מונה 'Process Order Object Page (F2263)'; המזהה אינו ביקום ולא " +
      "צורף. מועד ריצת הכלי בפועל: 2026-09-08; החותמת accessedAt נקבעה ל-2026-09-07 לפי הוראת האצווה. " +
      "ביקורת אדברסרית 2026-09-14: כל ארבע רשומות help.sap.com אומתו מחדש (כותרת, loio, versionId); השורה " +
      "'Display process order Yes Yes Yes' לא הופיעה באף אחת מחמש גרסאות הסניפט שנשלפו ל-loio " +
      "0af42d30f5654313ac5d7a0ff9f36094 ולכן הוסרה מהטענה, והטענה 'קריאה בלבד' הוצמדה לרשומת המאגר בלבד; " +
      "הרשומה המתוקנת עברה validateRecords מול היקום האמיתי ומול קובץ ה-TX הקיים ללא בעיות.",
  },

  /* ----------------------------------------------------- tx:CO01 */
  {
    id: "tx:CO01",
    evidence: [
      CO01_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Segregation of Duties for Order Change and Release | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ecc7e8cbe9cd4556a0694596dc4a2347.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE3,
        claim:
          "ה-What's New של S/4HANA 2022 (רכיבי יישום PP-SFC ו-PP-PI-POR, 'Valid as Of SAP S/4HANA 2022') קובע: " +
          "'To enable this feature, you need to add the authorization object C_AFKO_REL to the roles that " +
          "contain the following apps: Production Order Create Production Order CO01 Change Production Order'. " +
          "הרשימה בסניפט מונה גם 'Create Production Order w/o Material CO07', 'Create Production Order with " +
          "Sales Order CO08', 'Create Production Order with Project CO10', 'Release Production Orders CO05N, " +
          "CO05, COHVOMRELEASE', 'Converting Planned Order - to Production Order CO40', 'Convert Planned Orders " +
          "- to Production Orders CO41' ו-'Convert Planned Order - to Production Order CO48'. הסניפט נקטע " +
          "במילים 'Existing roles are not automatically'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Hide Pricing Information for Production and Process Orders | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ada2cd83fb27435f8b11e0421d299b56.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE3,
        claim:
          "ה-What's New של S/4HANA 2021 מונה 'CO01 - Create Production Order' בנפרד מ-'COR1 - Create Process " +
          "Order', לצד 'CO02 - Change Production Order', 'CO03 - Display Production Order', 'COOIS - Monitor " +
          "Production / Planned Orders' ו-'COHV - Mass Processing Production Orders', כאפליקציות שהיכולת החדשה " +
          "להסתרת מידע תמחור לפי תפקיד משפיעה עליהן ('The following apps are affected'). שורת הפרטים הטכניים " +
          "בסניפט: 'Authorization New BJ5 PP-PI-POR PP-SFC SAP S/4HANA 2021' ו-'Valid as Of SAP S/4HANA 2021', " +
          "כלומר Scope Item BJ5 ורכיבי היישום PP-SFC (Production Orders) ו-PP-PI-POR (Process Order). שם פריט " +
          "ההיקף BJ5 אינו מופיע בסניפט של דף זה. הזמנת הייצור (ייצור בדיד) והזמנת התהליך (תעשיות תהליכיות) " +
          "נשמרות כאובייקטים נפרדים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Processing Production Orders and Operations | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/5fe6af156e554b1e81118df2e7f6e3a7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "דף ההשוואה הרשמי של 2025 FPS01 מונה: 'App Name Order Information System - COOIS Mass Processing of " +
          "Process and Production Orders - COHV Manage Production Orders Manage Production Operations App ID " +
          "COOIS COHV F2336 F2335'. כלומר Manage Production Orders = F2336 ו-Manage Production Operations = " +
          "F2335, לצד COOIS ו-COHV, כאפליקציות לעיבוד הזמנות ייצור ופעולות ייצור ('apps for processing " +
          "production orders and production operations'). הדף שייך ל-deliverable של PEO ואינו מזכיר את CO01 " +
          "בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP - Production order (only open PO) | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/bcac78c2e4454b0a8f1409a06e447b2f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "אובייקט ההגירה של 2025 FPS01 (loio bcac78c2e4454b0a8f1409a06e447b2f) מזוהה בסניפט כ-'Object Alias " +
          "PP_PRODNORD Business Object Component PP-SFC Business Object Type Transactional data', וקובע לבדיקת " +
          "התוצאה: 'App: Display Production Order (CO03) Manage Production Orders (F2336)'. זהו אישוש נוסף " +
          "למיפוי Manage Production Orders = F2336 ולשיוך הזמנת הייצור לרכיב PP-SFC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת CO01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רובד Tier-2: לפי הרשומה CO01 יוצרת הזמנת ייצור (סוג הזמנה PP01) מ-BOM ו-Routing עם תזמון, פיצוץ BOM, " +
          "תמחור מתוכנן ובדיקת זמינות, ונשמרת בטבלאות AUFK/AFKO/AFPO/AFVC/RESB/AFVV. שדה ה-s4 אומר 'קיימת " +
          "וזמינה ב-S/4HANA ללא שינוי מהותי'; ה-s4Delta נוקב ב-'Manage Production Orders (F2336)' כחלופת Fiori " +
          "(תואם למקור הרשמי) וב'עלויות ל-Universal Journal (ACDOCA)' (לא אומת באצווה זו); שדה ה-fiori נוקב " +
          "ב-'Create Production Order (תחליפי; ברירת מחדל עדיין GUI CO01)', שם שלא נמצא כאפליקציית Fiori " +
          "ייעודית באף מקור רשמי שנבדק.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO01",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: CO01_STATUS_SRC,
      secondary: ["fiori_alternative_available"],
      he:
        "טרנזקציה CO01 (יצירת הזמנת ייצור, ייצור בדיד, רכיב יישום PP-SFC) זמינה ב-SAP S/4HANA On-Premise כולל " +
        "2025 FPS01: תיעוד Production Planning and Control של המהדורה מנחה במפורש ליצור הזמנת ייצור בעזרת " +
        "CO01, ודפי What's New של 2021 ו-2022 נוקבים בה בשמה, בנפרד מ-COR1 להזמנת תהליך בתעשיות תהליכיות. לא " +
        "נמצא מקור רשמי המסמן הוצאה משימוש, פריט פישוט או יורש. חלופת ה-Fiori לפי דף ההשוואה הרשמי: Manage " +
        "Production Orders (F2336) ו-Manage Production Operations (F2335). שינוי אחד שנמצא ברמת ההרשאות: " +
        "מ-S/4HANA 2022, כדי להפעיל הפרדת תפקידים בין שינוי לשחרור הזמנה יש להוסיף את אובייקט ההרשאה " +
        "C_AFKO_REL לתפקידים המכילים את CO01.",
      recommendedAction:
        "להשאיר את CO01 כנתיב יצירת הזמנות הייצור הבדידות ב-S/4HANA On-Premise; להציג את Manage Production " +
        "Orders (F2336) ואת Manage Production Operations (F2335) כחלופת ה-Fiori לפי דף ההשוואה הרשמי, ולא " +
        "'Create Production Order' כשם אפליקציה (כפי שמופיע בשדה fiori ב-data/tx-intel.ts " +
        "וב-data/transactions.ts). בתכנון תפקידים ל-S/4HANA 2022 ומעלה לבדוק את C_AFKO_REL אם נדרשת הפרדה בין " +
        "שינוי לשחרור. בתעשיות תהליכיות (PP-PI) להשתמש ב-COR1 ולא ב-CO01. את הסטטוס הנגזר 'משתנה ב-S/4HANA' " +
        "שהאפליקציה מציגה כיום (נגזר מעצם קיום טקסט s4Delta ב-tx-intel) יש להחליף ב'ללא שינוי' עם חלופת " +
        "Fiori.",
    },
    xrefs: ["tx:CO02", "tx:CO03", "tx:COOIS", "tx:COHV", "tx:CO40", "tx:CO41", "tx:CO05N", "tx:COR1", "tx:CO11N", "tx:C223", "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "table:RESB", "cds:I_ProductionOrder", "fiori:F2336", "enh:badi:WORKORDER_UPDATE", "enh:exit:PPCO0001"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשבע שאילתות On-Premise ('CO01 create production order', 'Manage " +
      "Production Orders F2336', 'Feature Comparison for Production Orders', 'Hide Pricing Information for " +
      "Production and Process Orders CO01', 'I_ProductionOrder Virtual Data Model production order', " +
      "'Creating a Production Order Manually PP-SFC', 'Simplification production order PP-SFC " +
      "transaction'), חיפוש רשת מוגבל-דומיין לספריית ה-Fiori, ורובד Tier-2 מהמאגר. הזמינות ברמת " +
      "sap_official_verified: CO01 נקובה בשמה בסניפטים של deliverables של 2025.001 (Production Planning and " +
      "Control, Retail, PEO, EWM, Data Migration) וב-What's New של 2021, 2022 ו-2025 FPS01. אף מקור רשמי " +
      "שנמצא אינו מסמן את CO01 כמוצאת משימוש, כפריט פישוט או כמוחלפת, ולכן 'ללא שינוי' בלי יורש. רשומות " +
      "רשמיות נוספות שנמצאו ולא נטענו כראיות באצווה זו (ניתן לקדם אותן בביקורת עתידית): 'DRF Integration " +
      "for MES Processes' (2025.001, loio ad3345ec490e46e787e670334d8ab8ba, טבלת טרנזקציות: CO01, CO02, " +
      "CO40, CO41); 'Manual Dispatching of Operations for Shop Floor Orders' (What's New 2025 FPS01, מונה " +
      "'Create Production Order (transaction CO01)' בהקשר Shop Floor Orders של PEO); 'Production Orders " +
      "(PP-SFC)' (סקירת הרכיב, 2025.001); 'Production Order Header' (Virtual Data Model, CDS view " +
      "I_ProductionOrder, 2025.001); 'API_PRODUCTION_ORDERS - A_ProductionOrder: Read, Create, Update' " +
      "(APIs for Manufacturing, 2025.001). ספריית ה-Fiori: החיפוש המוגבל-דומיין החזיר 'Manage Production " +
      "Orders - SAP Fiori Apps Reference Library' בכתובת appId=F2336 ו-'Create Production Order - SAP Fiori " +
      "Apps Reference Library' בכתובת Apps('CO01')/S22OP; הדפים עצמם הם יישומי JS ולא נקרא מהם תוכן, ולכן " +
      "זיהוי F2336 נשען על סניפטי help.sap.com (Feature Comparison + Data Migration). פרטי תפקיד, קטלוג " +
      "ו-OData של F2336 (המאגר נוקב ב-API_PRODUCTION_ORDER_2 וב-I_ProductionOrder) לא אומתו באצווה זו. " +
      "הטענה ב-tx-intel על 'עלויות ל-Universal Journal (ACDOCA)' לא נבדקה מול מקור רשמי כאן. שם פריט ההיקף " +
      "BJ5 ('Make-to-Stock Production - Discrete Manufacturing') מופיע בסניפטים של רשומות What's New אחרות " +
      "(למשל 'Customizing for Production Operations (Execution and Control)', 2022.000) ולא בסניפט של דף " +
      "Hide Pricing שצוטט. הסטטוס הנגזר שהאפליקציה מציגה כיום הוא 'משתנה ב-S/4HANA' (tx-detail: קיום " +
      "s4Delta מעלה disposition changed) והרשומה הזו מחליפה אותו. מועד ההרצה בפועל לפי פלט הכלי: " +
      "2026-09-08; החותמת 2026-09-07 היא מועד האצווה שהוגדר. ביקורת אדברסרית 2026-09-14: חמש הכתובות " +
      "מחזירות HTTP 200, ה-loio וה-versionId אומתו מחדש מול פלט הכלי, כל הציטוטים באנגלית נמצאו כלשונם " +
      "בסניפטים, וכל 19 ה-xrefs נפתרים ביקום.",
  },

  /* ---------------------------------------------------- tx:CO11N */
  {
    id: "tx:CO11N",
    evidence: [
      CO11N_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Processing Production Orders and Operations | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/5fe6af156e554b1e81118df2e7f6e3a7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "דף ההשוואה הרשמי (loio 5fe6af156e554b1e81118df2e7f6e3a7; רשומת החיפוש מחזירה אותו במדריך Production " +
          "Engineering and Operations for Complex Assembly 2025.001, ונושאי Manage Production Operations במדריך " +
          "PP-SFC מפנים אליו בשמו) מונה 'App ID COOIS COHV F2336 F2335' (Manage Production Orders / Manage " +
          "Production Operations) ומציג בשורת 'Confirm operation (time ticket)' את הערכים 'No Yes No, only via " +
          "navigation to CO11N'; הסניפט אינו מאפשר לשייך כל תא לאפליקציה מסוימת. בטבלת הניווט של אותו נושא: " +
          "'Confirm Production Order Operation (CO11N) No Yes, but requires SAP business role Production " +
          "Operator - Discrete Manufacturing' (השם הטכני של הרול נקטע בסניפט אחרי SAP_BR_PRODN_OPTR_DISC ולכן " +
          "אינו נטען במלואו). כלומר: ב-On-Premise 2025 FPS01 דיווח פעולה מאפליקציות ה-Fiori לניהול ייצור מתבצע " +
          "דרך ניווט אל CO11N ובכפוף לרול.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Confirming Production Order Operations | Production Planning and Control (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/2bba750d1e124e1ea2a039bb1cd9b6c5/a5f1ab154c8d41889fede84b3583bffe.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE3,
        claim:
          "בענן הציבורי (מהדורה 2608) דף ההשוואה לדיווח פעולות של הזמנות ייצור מציג: 'App Name Confirm " +
          "Production Order Operation (CO11N) Confirm Production Operation App ID CO11N F3069'. כלומר CO11N " +
          "ניתנת שם כאפליקציה בשם Confirm Production Order Operation עם App ID: CO11N, ולצדה האפליקציה Confirm " +
          "Production Operation עם App ID F3069. מיפוי F3069 מאושש ברשומה זו למהדורת public-cloud בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Confirmation | APIs for Manufacturing",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/e77b762e243b4045ad1f1f048f6aab87.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "מדריך APIs for Manufacturing ל-2025 FPS01 מתעד: 'Technical name: API_PROD_ORDER_CONFIRMATION_2_SRV " +
          "This service enables you to process confirmations for production orders, namely time ticket and time " +
          "event confirmations' ... 'for operations of production orders and confirmations on order level', עם " +
          "הישות 'Production Order Confirmation (ProdnOrdConf2)'. כלומר לדיווח Time Ticket שנעשה ב-CO11N קיים " +
          "שירות OData מתועד ב-On-Premise; רשומות What's New בשם 'OData API: Production Order Confirmation' " +
          "קיימות למהדורות 2020, 2021, 2022, 2023, 2023 FPS03 ו-2025 FPS01. פרטי הישויות והפרמטרים לא נקראו " +
          "מגוף העמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת CO11N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת המאגר: CO11N היא דיווח הפעולה (Time Ticket) של הזמנות ייצור: מעדכנת AFRU, מבצעת Backflush " +
          "(261) ו-Auto GR (101), שגיאות תנועה נופלות ל-COGI, ביטול ב-CO13, ו-CO11 מסומנת כמיושנת לעומתה; " +
          "הרשומה מסומנת verified והמפה הנגזרת מציגה 'זמינה ב-S/4HANA'. ה-s4Delta קובע שהיא נשמרת ב-S/4HANA, " +
          "שהתנועות נרשמות ל-MATDOC ושחלופת ה-Fiori היא Confirm Production Operation (F3069). הזמינות אוששה " +
          "במקורות הרשמיים; מיפוי F3069 אושש לענן הציבורי בלבד; רשימות ה-BAPI, ה-BAdI וה-user exits ברשומה " +
          "נשארות ברמת המאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#CO11N",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: CO11N_STATUS_SRC,
      he:
        "CO11N, דיווח פעולה של הזמנת ייצור במסך אחד (Time Ticket), זמינה ומתועדת ב-SAP S/4HANA On-Premise " +
        "2025 FPS01 במדריך Production Orders (PP-SFC): קליטת מוגמר אוטומטית ו-Backflush אפשריים בה כל עוד לא " +
        "נוצרו אצוות WIP להזמנה. בצד ה-Fiori של On-Premise, דף ההשוואה הרשמי (COOIS, COHV, F2336, F2335) מציג " +
        "בשורת דיווח הפעולה 'No Yes No, only via navigation to CO11N'; רשומת Manage Production Operations " +
        "(F2335, 2025.001) קובעת שדיווח פעולות מתבצע דרך ניווט אל CO11N ומחייב את הרול Production Operator - " +
        "Discrete Manufacturing בנוסף לרול המפקח, ואילו התא של Manage Production Orders (F2336) אינו ניתן " +
        "לקביעה מהסניפט. בענן הציבורי (2608) CO11N ניתנת כאפליקציה בשם Confirm Production Order Operation " +
        "(App ID: CO11N) לצד האפליקציה Confirm Production Operation (F3069). אף מקור רשמי שנמצא אינו מסמן " +
        "אותה כמוחלפת או כמוצאת משימוש.",
      recommendedAction:
        "להשאיר את CO11N בשימוש ב-S/4HANA On-Premise; לא נמצאה טרנזקציה יורשת במקורות הרשמיים. לנתיב Fiori " +
        "במפעל: Manage Production Operations (F2335, אינה ב-data/fiori/apps.ts) עם ניווט אל CO11N, ולהקצות " +
        "למשתמש את הרול Production Operator - Discrete Manufacturing בנוסף לרול המפקח; Manage Production " +
        "Orders (F2336) היא אפליקציית ההזמנות, ותא הדיווח שלה לא נקבע מהסניפט. את חלופת F3069 שברשומת המאגר " +
        "יש לסמן כמאוששת לענן הציבורי בלבד עד שיימצא תיעוד On-Premise. לאינטגרציה (למשל MES) קיים שירות OData " +
        "מתועד לדיווחי Time Ticket: API_PROD_ORDER_CONFIRMATION_2_SRV.",
    },
    xrefs: ["tx:CO12", "tx:CO13", "tx:CO14", "tx:CO15", "tx:CO1F", "tx:CO1P", "tx:CO16N", "tx:COGI", "tx:COR6N", "tx:CO02", "tx:MIGO", "table:AFRU", "table:AFKO", "table:AFVC", "table:RESB", "fiori:F2336", "cds:I_ProductionOrderConfirmation", "enh:exit:CONFPP01", "enh:exit:CONFPP05", "enh:badi:WORKORDER_CONFIRM"],
    lastVerifiedAt: DATE3,
    notes:
      "הזמינות ב-On-Premise 2025 FPS01 נשענת על כמה רשומות Help של 2025.001 הנוקבות ב-CO11N בשמה: Goods " +
      "Movements in the Confirmation Transaction (מקור הסטטוס), Shift-Related Confirmation ('Time ticket " +
      "(single-screen entry) CO11N/COR6N'), Enhancement of Quantity Fields ('Enter Time Ticket for " +
      "Production Order (CO11N)'), Documentary Batches in Production ('Enter Time Ticket for Production " +
      "Order (CO11, CO11N)'), Goods Receipt of Co-Products in Confirmation ודף ההשוואה; רשומת Manage Work " +
      "Center Queue (מדריך PEO 2025.001 ו-What's New 2020) מנסחת 'you navigate to the Confirm Production " +
      "Order Operation app (transaction CO11N)', כלומר גם ב-On-Premise CO11N חשופה כאפליקציה בשם Confirm " +
      "Production Order Operation. אף מקור רשמי אינו מסמן אותה כמוחלפת, ולכן הסטטוס 'ללא שינוי' בלי יורש; " +
      "חיפוש 'simplification' לא העלה פריט פישוט הנוקב ב-CO11N (היעדר ממצא, לא הוכחת היעדר). דף ההשוואה " +
      "(loio 5fe6af15...) מוחזר על ידי שירות החיפוש רק תחת מדריך Production Engineering and Operations for " +
      "Complex Assembly (9c4986bd...); מעטפת ה-Help מחזירה HTTP 200 לכל נתיב, גם ל-loio שאינו קיים, ולכן " +
      "בדיקת 200 אינה ראיה לנתיב תקף. חלופת ה-Fiori ב-On-Premise: רשומת Manage Production Operations " +
      "(F2335, PP-SFC 2025.001) קובעת 'Confirm production order operations' ושנדרש הרול Production Operator " +
      "- Discrete Manufacturing בנוסף לרול המפקח; שיוך התא של F2336 בשורת 'Confirm operation (time ticket)' " +
      "אינו ניתן לקביעה מהסניפט. F3069 (Confirm Production Operation) אוששה רק ברשומות הענן הציבורי " +
      "2608.500 (דף ההשוואה לדיווח פעולות; Shift-Related Confirmation בענן), ובנוסף קיים שם עמוד ייעודי " +
      "'Confirm Production Order Operation (CO11N)' עם 'App ID: CO11N (Fiori Apps Reference Library)' " +
      "ו-'partially or finally confirm an operation of a production order by entering a time ticket'; " +
      "חיפושים במוצר On-Premise לא החזירו רשומה הנוקבת ב-F3069, ולכן זמינותה ב-On-Premise נשארת נדרשת " +
      "אימות. F3069 ו-F2335 אינם קיימים ב-data/fiori/apps.ts ולכן אינם ב-xrefs. החיפוש מוגבל-הדומיין החזיר " +
      "את הכותרת 'Confirm Production Order Operation - Fiori Apps Library' (Apps('CO11N')); הדף הוא יישום " +
      "JS ותוכנו לא נקרא. ה-BAdI ‏/SAPMP/SPLIT_CO11N מופיע כלשונו בסניפט Quantity Distribution for Goods " +
      "Receipts (MM-IM 2025.001) אך אינו קיים ב-data/exits.ts ואינו ב-xrefs. רשימות ה-BAPI שברשומת המאגר " +
      "(BAPI_PRODORDCONF_CREATE_TT ודומיו) אינן ביקום המזהים ולא אומתו בסבב זה: בדיקות מערכת חיה לא היו " +
      "זמינות (ה-MCP‏ sc4sap לא התחבר) ודפי ה-Business Accelerator Hub הם יישומי JS. רשומות מהדורת " +
      "public-cloud מתויגות בנפרד. accessedAt נחתם 2026-09-07 לפי מועד האצווה; החיפושים בוצעו ב-2026-09-08 " +
      "ואומתו שוב בביקורת ב-2026-09-14.",
  },

  /* ----------------------------------------------------- tx:MD01 */
  {
    id: "tx:MD01",
    evidence: [
      MD01_STATUS_SRC,
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.6 S4TWL - Planning File (PP-MRP), pp. 790-791",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE3,
        claim:
          "פריט 9.5.6 (רכיב יישום PP-MRP; Business Impact note 0002268088 'Planning File') קובע בעמ' 791: 'SAP " +
          "S/4HANA, on-premise editions no longer supports net change planning in the planning horizon " +
          "(processing key NETPL). MRP always determines material shortages for all known material " +
          "requirements... This is valid both for the classic MRP and MRP Live.' בטבלת 'Transaction not " +
          "available in SAP S/4HANA on-premise edition' מופיעות MDAB ו-MDRE ('batch versions of above reports " +
          "for operative planning file entries replaced by PPH_MDAB'); הדוחות RMMDVM10/RMMDVM20 להקמת קובץ " +
          "התכנון מוחלפים ב-PPH_SETUP_MRPRECORDS. מספר ה-SAP Note מצוטט כפי שהודפס בפריט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Carrying Out the Planning Run Using MRP Live | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/bc5a76513feb1f66e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "הסניפט הרשמי (loio bc5a76513feb1f66e10000000a441470, ‏2025 FPS01) קובע: 'The transaction MD01N is a " +
          "copy of the transaction MD01', ושדוח MRP Live ‏(PPH_MRP_DISPATCHER) 'is a copy of the report " +
          "RMMRP000'; MRP Live ‏(MD01N) יכולה לקרוא ל-MRP הקלאסי ('MRP Live (transaction MD01N) calls classic " +
          "MRP'), והעמוד מפנה ל-'When to Plan in MRP Live and When to Plan with Classic MRP' ול-'MRP Live: " +
          "Incompatible Changes'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Overview of the Main Transaction Codes for CBP | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/757db6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "טבלת קודי הטרנזקציה בתיעוד 2025 FPS01 (loio 757db6535fe6b74ce10000000a174cb4) מונה: 'MD01 Carry out " +
          "total planning online', ‏'MD03 Carry out single-item, single-level planning', ‏'MDBT Carry out total " +
          "planning in background mode', לצד MD04, MD05, MD06, MD07 ו-MDLD להערכות MRP; MD01 נמנית בטבלת קודי " +
          "הטרנזקציה של תיעוד המהדורה הנוכחית (הקשר CBP, תכנון מבוסס צריכה); הסניפט מונה קודים ופעילויות בלבד " +
          "ואינו קובע סטטוס.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Replenishment: Logistical Products | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/fe85afc5f89d4e4e94d9ce609702b5ab.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "הסניפט (deliverable של Retail, ‏2025 FPS01, loio fe85afc5f89d4e4e94d9ce609702b5ab) מציג את ריצת " +
          "התכנון בשני נתיבים: 'Classic MRP: Schedule MRP Runs app (transaction MD01)', ‏'MRP - Single-Item, " +
          "Multi-Level app (transaction MD02)', ‏'MRP-Individual Planning-Single Level app (transaction MD03)', " +
          "ולצדם 'MRP Live optimized for SAP HANA: Schedule MRP Runs' ‏'(transaction MD01N or app ID F1339)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הפרויקט (LIFECYCLE) - רשומת MD01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת המאגר מסמנת את MD01 כ-'Deprecated' (קיימת ב-ECC וב-S/4HANA, ללא חלופת Fiori, alt: 'MD01N (MRP " +
          "Live)', simplification: 'MRP in S/4HANA (MRP Live)', impact: Medium) עם הערת ההגירה 'קיים אך לא " +
          "אסטרטגי; MRP Live (MD01N) מועדף. חלק מהפרמטרים/Exits לא נתמכים ב-Live.'. חזקה מהניסוח הרשמי, שקובע " +
          "זמינות ללא תאריך סיום חיים.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MD01",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת MD01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "רשומת המודיעין מנסחת בשדה s4: 'ב-S/4HANA הוחלף ב-MRP Live (MD01N) הרץ על HANA; MD01 הקלאסי עדיין " +
          "קיים אך MD01N מומלץ', מציינת Fiori 'Schedule MRP Runs / Mass Processing' ללא מזהה אפליקציה, ממליצה " +
          "על תזמון ברקע ב-MDBT, מונה 'אי-תחזוקת Planning File (MDAB/MDRE)' בין הטעויות הנפוצות, מונה NETPL בין " +
          "מפתחות העיבוד (NEUPL/NETCH/NETPL), ומפרטת BAdIs ‏MD_MRP_LIST, MD_PURREQ_CHANGE, MD_PLDORD_CHANGE " +
          "ויציאות משתמש M61X0001, M61X0002. MDAB/MDRE ו-NETPL סותרים את פריט 9.5.6.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MD01",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MD01_STATUS_SRC,
      he:
        "MD01 (ריצת MRP כוללת, MRP קלאסי) מכוסה בפריט הפישוט הרשמי 'S4TWL - MRP in HANA' ‏(PP-MRP) ברשימת " +
        "הפישוט של SAP S/4HANA 2025 FPS1: הטרנזקציות הקלאסיות (MD01, MD02, MD03 ועוד) עדיין זמינות ב-SAP " +
        "S/4HANA, אינן חלק מחבילת התאימות (compatibility pack), ולא הוגדר להן תאריך סיום חיים; MRP Live " +
        "‏(MD01N) נחשבת לטכנולוגיית העתיד. ב-S/4HANA גם MD01 עובדת עם קובץ התכנון החדש PPH_DBVM, קוראת נתונים " +
        "דרך AMDP ללא אפשרות כיבוי, ומשתמשת ב-Simplified Sourcing; מפתח העיבוד NETPL אינו נתמך עוד (פריט " +
        "9.5.6 Planning File). לפי תיעוד PP-MRP 2025 FPS01, MD01N היא העתק של MD01 ודוח PPH_MRP_DISPATCHER " +
        "הוא העתק של RMMRP000.",
      recommendedAction:
        "להשאיר את MD01 זמינה ולסווגה כפריט פישוט, לא כמוצאת משימוש: אין במקור הרשמי הצהרת יורש או תאריך סיום " +
        "חיים. להעביר את ריצות התכנון ל-MRP Live ‏(MD01N) או לאפליקציית Schedule MRP Runs ‏(F1339) לפי הנחיית " +
        "SAP ('You can start using MRP Live rather than the classic MRP at any time'), ולפני המעבר: לממש מחדש " +
        "BAdI והרחבות של ה-MRP הקלאסי כ-AMDP BAdI, לבדוק את ההבדלים שמונה פריט 9.5.2 (MD50/MD51 אינן מותאמות " +
        "ל-HANA; רשימות MRP ותכנון מבוסס תחזית VV נמצאים בהיקף התאימות; אין מחווני יצירה ב-MRP Live) ואת דף " +
        "העזרה 'MRP Live: Incompatible Changes' שאליו מפנה תיעוד PP-MRP (גופו לא נקרא), ולעדכן את רובד " +
        "הפרויקט: lifecycle 'Deprecated' ו-TX_INTEL 'הוחלף' חזקים מהניסוח הרשמי; MDAB/MDRE שמוזכרות " +
        "ב-TX_INTEL אינן זמינות ב-S/4HANA On-Premise (הוחלפו ב-PPH_MDAB לפי פריט 9.5.6), ו-NETPL אינו נתמך " +
        "עוד.",
    },
    xrefs: ["tx:MD01N", "tx:MD02", "tx:MD03", "tx:MDBT", "tx:MD04", "tx:MD50", "tx:MD51", "tx:MDAB", "fiori:F1339"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות (On-Premise, ‏21 תוצאות כל אחת), חיפוש רשת " +
      "מוגבל-דומיין, והורדת SIMPL_OP2025.pdf ‏(1,514 עמודים, Document Version 1.36) עם קריאה מלאה של פריט " +
      "9.5.2 (עמ' 651-655), פריט 9.5.6 Planning File (עמ' 790-791: 'SAP S/4HANA, on-premise editions no " +
      "longer supports net change planning in the planning horizon (processing key NETPL)... valid both for " +
      "the classic MRP and MRP Live'; MDAB/MDRE בטבלת 'Transaction not available in SAP S/4HANA on-premise " +
      "edition', הוחלפו ב-PPH_MDAB) ופריט 13.15.58 Replenishment (עמ' 1360-1361, הקשר Retail בלבד: 'Generic " +
      "Materials Requirements Planning (MRP) functionality is available (main transaction MD01)'). גופי דפי " +
      "ה-Help לא נקראו (מעטפת JS); הציטוטים מהם מוגבלים לסניפטים של שירות החיפוש. הסטטוס 'פריט פישוט' נבחר " +
      "על פני 'לא אסטרטגי' כי המקור הרשמי קובע במפורש שהטרנזקציות הקלאסיות זמינות, אינן בחבילת התאימות ושלא " +
      "הוגדר תאריך סיום חיים; הניסוח 'considered the future technology' נמסר כלשונו ולא הוקשח ליורש, ולכן " +
      "אין successor ברשומה. רובד הפרויקט (lifecycle 'Deprecated' + TX_INTEL 'הוחלף' + domain-detail 'MD01 " +
      "קלאסי → MD01N') חזק מהמקור הרשמי ונרשם כסתירה לקובץ התור; ההמלצה ב-TX_INTEL על MDAB/MDRE ועל NETPL " +
      "סותרת את פריט 9.5.6. ‏F1339 ‏(Schedule MRP Runs) מתועדת כאפליקציית התזמון של MRP Live ('(transaction " +
      "MD01N or app ID F1339)', אותו ניסוח גם ב-What's New של 1809 FPS02, loio " +
      "4f972af74c8d42a29a6ae5ba0bb0c8bc); סניפט ה-Retail מכנה גם את MD01 הקלאסית 'Schedule MRP Runs app " +
      "(transaction MD01)', ולכן F1339 מוצגת כנתיב Fiori מתועד ולא כיורש; במאגר data/fiori/apps.ts#F1339 " +
      "ממופה ל-MD01N (guiTx) ומזכיר MD01 רק בשדה ecc. אפליקציית 'Monitor Material Coverage' נזכרת בפריט " +
      "בשמה בלבד, ללא מזהה, ואינה ב-xrefs (במאגר קיימת רק F0247A בשם 'Monitor Material Coverage - Net " +
      "Segments'). המזהה MD_MRP_FORCE_CLASSIC (מחוון Plan in Classic MRP, מופיע בסניפטים הרשמיים של 'When " +
      "to Plan in MRP Live and When to Plan with Classic MRP' ו-'MRP Live: Incompatible Changes', 2025.001) " +
      "אינו קיים ביקום המזהים ולא נקשר. מספרי ה-SAP Notes נמסרים רק כפי שהודפסו ב-PDF, בלי קריאת גוף ה-Note " +
      "(דורש S-user). לא בוצעה בדיקה במערכת SAP חיה (ה-MCP‏ sc4sap לא התחבר). accessedAt הוטבע 2026-09-07 " +
      "לפי הוראת הריצה; החיפושים וההורדה בוצעו בפועל ב-2026-09-08, והביקורת האדברסרית חזרה על ההורדה, על " +
      "קריאת העמודים ועל שאילתות החיפוש ב-2026-09-14 (loio, versionId וסניפטים תואמים).",
  },

  /* ----------------------------------------------------- tx:MD04 */
  {
    id: "tx:MD04",
    evidence: [
      MD04_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Managing Material Coverage | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/0fc6b5b8da9d4138a73a65a46ee01038.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "דף ההשוואה הרשמי של 2025 FPS01 מונה: 'App Name Monitor Stock / Requirements List Manage Material " +
          "Coverage (F0251) Manage Material Coverage (F0251A) App ID MD04 F0251 F0251A' - כלומר MD04 מתועדת " +
          "ב-S/4HANA כאפליקציה 'Monitor Stock / Requirements List' (App ID = MD04), ומושווית לאפליקציות Manage " +
          "Material Coverage ‏(F0251) ו-Manage Material Coverage ‏(F0251A) בטבלה 'for identifying material " +
          "coverage issues and solving then as they occur' (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Accept Planning Result of MRP Run | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/3720a102615c4e409d545c039c60837d.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE3,
        claim:
          "ה-What's New של S/4HANA 2025 קובע: 'You can accept and subsequently, revoke the acceptance of the " +
          "planning result of the MRP run from the Display Stock/Requirements Situation (MD04) and Current " +
          "Material Overview (MD07) transactions'; רכיב PP-FIO-MRP (Fiori UI for Material Requirements " +
          "Planning), רכיב נוסף מופיע בסניפט קטוע; זמינות 'SAP S/4HANA Cloud Private Edition and SAP S/4HANA'; " +
          "'Valid as Of 2025'. כלומר MD04 ממשיכה לקבל פונקציונליות חדשה ב-2025. הטענה נשענת על כותרת וסניפט " +
          "רשומת החיפוש בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 30.2 S4TWL - MRP in HANA (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE3,
        claim:
          "פריט 30.2 (רכיב PP-MRP; מספר SAP Note 2268085 'S4TWL - MRP Live on SAP HANA - MD01N' מופיע כלשונו) " +
          "קובע תחת 'MRP Lists': ‏'With HANA, stock/requirements lists can be read with high speed. The MRP " +
          "apps determine materials with issues in real-time. In SAP S/4HANA there is no need for outdated MRP " +
          "lists.' לקריאת רשימת המלאי/דרישות המסמך נוקב ב-'BAPI BAPI_MATERIAL_STOCK_REQ_LIST is official " +
          "released function module and therefore recommended to use', בעוד 'MD_MDPSX_READ_API is not official " +
          "released'. לטרנזקציות תכנון המותאמות ל-HANA המסמך קובע: 'BAdI MD_ADD_ELEMENTS has to be used to " +
          "adjust the data determined by the HANA optimized reading processes'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים ומודיעין הטרנזקציות של הפרויקט - רשומות MD04",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "בסיס Tier-2: ‏data/lifecycle.ts מסמן את MD04 כ-Active ‏(ecc: true, s4: true, impact Low) עם 'Monitor " +
          "Material Coverage - Net Segments' כמקבילת ה-Fiori; ‏data/tx-intel.ts ‏(verified) " +
          "ו-data/transactions.ts מתארים תצוגה דינמית בזמן אמת של היצע מול ביקוש (MARC/MARD, PLAF, EBAN, RESB) " +
          "ונוקבים באותה מקבילה. הרישום הזה אינו תואם את דפי ההשוואה הרשמיים: Monitor Material Coverage - Net " +
          "Segments ‏(F0247A) מושווית שם ל-MD07 (גישה קולקטיבית), ואילו MD04 (גישה פרטנית) מושווית ל-Manage " +
          "Material Coverage ‏(F0251 / F0251A). ‏data/sapData.pppi.ts אף מכנה את F0251 בשם 'Monitor Material " +
          "Coverage' וכותב שהיא 'מחליף את MD04' - אף מקור רשמי שנבדק אינו אומר זאת.",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MD04; data/tx-intel.ts#MD04; data/transactions.ts#MD04; data/sapData.pppi.ts#F0251 (שורה 7577)",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2023 FPS03",
      source: MD04_STATUS_SRC,
      secondary: ["fiori_alternative_available"],
      he:
        "טרנזקציה MD04 (רשימת מלאי/דרישות, Stock/Requirements List) ממשיכה להתקיים ב-SAP S/4HANA On-Premise: " +
        "תיעוד 2025 FPS01 מונה אותה כאפליקציה 'Monitor Stock / Requirements List' (App ID MD04), וה-What's " +
        "New של 2025 מוסיף לה יכולת חדשה (אישור וביטול אישור של תוצאת ריצת ה-MRP). עם זאת היא מכוסה בפריט " +
        "פישוט רשמי: פריט 30.30 ברשימת הפישוט של S/4HANA 2023 FPS3 מסיר את התצוגה הגרפית של הכמות הזמינה מתוך " +
        "MD04 ומפנה לאפליקציות Manage / Check Material Coverage. חלופת ה-Fiori לגישה הפרטנית לפי דף ההשוואה " +
        "הרשמי: Manage Material Coverage ‏(F0251) ויורשתה F0251A. רשימות ה-MRP (MRP lists) הן שנמצאות לפי " +
        "פריט 30.2 בהיקף התאימות (compatibility scope) עם זכויות שימוש מוגבלות (SAP Note 2269324, ID 443, " +
        "כלשון הפריט), לא רשימת המלאי/דרישות; הפריט אינו נוקב ב-MD05 בשמה.",
      recommendedAction:
        "להשאיר את MD04 כמסך הבקרה היומי של מתכנן החומרים ב-S/4HANA On-Premise, כולל בתעשיות תהליכיות " +
        "(PP-PI). בהמרת מערכת לעבור על פריט הפישוט 30.30 ולהפנות מתכננים שנשענו על התצוגה הגרפית של הכמות " +
        "הזמינה אל Manage Material Coverage ‏(F0251 / F0251A). לתקן את data/lifecycle.ts, data/tx-intel.ts " +
        "ו-data/transactions.ts, המציינים 'Monitor Material Coverage - Net Segments' כמקבילת ה-Fiori של MD04: " +
        "לפי התיעוד הרשמי זו המקבילה של MD07, והמקבילה של MD04 היא Manage Material Coverage. לאינטגרציות " +
        "חדשות שקוראות את רשימת המלאי/דרישות, להעדיף את BAPI_MATERIAL_STOCK_REQ_LIST על פני " +
        "MD_MDPSX_READ_API, כלשון פריט 30.2.",
    },
    xrefs: ["tx:MD05", "tx:MD07", "tx:MD06", "tx:MD01N", "tx:MD01", "tx:MD02", "tx:MD03", "tx:CO09", "tx:MD14", "tx:MD16", "tx:MMBE", "fiori:F0251", "fiori:F0247A", "enh:badi:MD_ADD_ELEMENTS", "table:MARC", "table:MARD", "table:RESB"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('MD04 stock requirements list', " +
      "'Stock/Requirements List MRP evaluation', 'Monitor Material Coverage Net Segments', 'MRP Live " +
      "simplification MRP list MD05', 'Feature Comparison for Managing Material Coverage MD04', 'Monitor " +
      "Stock / Requirements List app MD04', 'Display Stock/Requirements Situation MD04 What's New'), חיפוש " +
      "רשת מוגבל-דומיין על fioriappslibrary/fal/help.sap.com, וקריאה מלאה של פריטים 30.2 ו-30.30 מתוך ה-PDF " +
      "הרשמי של רשימת הפישוט 2023 FPS3 (הקובץ המקומי זהה בגודלו, 10,174,700 בתים, לקובץ שבכתובת " +
      "help.sap.com; גרסת מסמך 1.35 מיום 2025-02-25). גופי דפי ה-Help לא נקראו (מעטפת JavaScript): כל טענה " +
      "מדפי Help נשענת על כותרת וסניפט בלבד; שני פריטי הפישוט נקראו במלואם. הריצות בפועל בוצעו ב-2026-09-08 " +
      "לפי פלט הכלי; ‏accessedAt נרשם 2026-09-07 לפי הנחיית האצווה. מקורות רשמיים נוספים שנראו ולא צורפו: " +
      "'Feature Comparison for Monitoring Material Coverage' ‏(loio f8323a1b1ddb4d538bce5c3aa3588e1b, " +
      "‏2025.001) המשווה MD06/MD07 ל-F0247A/F2101A; דף האפליקציה 'Monitor Stock / Requirements List' ‏(loio " +
      "daf35d93b67542c0b1f6a18807e9f6e9) הנוקב בתפקיד SAP_BR_PRODN_PLNR במצב תצוגה; דף 'Manage Material " +
      "Coverage (F0251A)' ‏(loio beea5a0c485340769ad37d33537ad962, ‏2025.001) שהסניפט שלו נוקב ב-'Accept " +
      "the planning result of the MRP run for the selected material'; רשומת ספריית Fiori ‏\"Monitor Stock / " +
      "Requirements List - Fiori Apps Library\" ‏(Apps('MD04')); Operations Guide for SAP S/4HANA 1709 " +
      "‏(loio b53c01562b16612de10000000a441470) שהסניפט שלו קובע 'The BAdI MD_ADD_ELEMENTS is processed in " +
      "MRP evaluations such as MD04 or MD07'. הסטטוס 'פריט פישוט' נבחר כי מקור רשמי נוקב ב-MD04 בשמה בפריט " +
      "30.30; אף מקור רשמי שנבדק אינו מסמן את MD04 כמוצאת משימוש או מוחלפת, ולכן אין יורש. אזהרות: ‏F0251A, " +
      "‏F2101A, ‏MD04P ו-BAPI_MATERIAL_STOCK_REQ_LIST אינם קיימים ביקום המזהים של הפרויקט ולכן אינם " +
      "ב-xrefs; ‏'Check Material Coverage' שבפריט 30.30 מתועדת בדף 'Manage Material Coverage (F0251)' " +
      "‏(loio 09cd1556d22c0033e10000000a44538d, ‏2025.001) כאריח (tile) שמספקת SAP ומפעיל את Manage " +
      "Material Coverage לחומר בודד ('start the Manage Material Coverage app directly from the Check " +
      "Material Coverage tile, which is also delivered by SAP'), ולא כאפליקציה נפרדת; פריט 30.x של Fashion " +
      "(S4TWL - Fashion Functionality) עוסק ב-FSH_MD04 ולא ב-MD04 הרגילה. הסטטוס הנגזר שהאפליקציה הציגה עד " +
      "כה: 'משתנה ב-S/4HANA' מתוך tx-intel (קיום שדה s4Delta ברשומת MD04 נקרא על ידי הבונה כאות שינוי; " +
      "verified), ברמה 'מאומת מול נתוני הפרויקט'. ה-s4Delta של tx-intel דווקא נוקב ב-'MRP Cockpit " +
      "(F0247A/F0251)' כחלופת Fiori, בעוד שדה fiori של אותה רשומה ו-lifecycle נוקבים רק ב-Net Segments.",
  },

  /* ----------------------------------------------------- tx:C201 */
  {
    id: "tx:C201",
    evidence: [
      C201_STATUS_SRC,
      {
        sourceType: "sap_help",
        sourceTitle: "Routings for Configurable Materials | Variant Configuration (LO-VC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a73402f511734e6eac56063e631bf24e/d362b6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "התיעוד קובע: 'In the processing industries, master recipes are used instead of task lists. Master " +
          "recipes contain all the recipe objects that are required for all product variants', ומפנה ל-'PP-PI " +
          "Master Recipes / Creating Master Recipes' בנפרד מ-'PP Routings / Creating a Routing'. העמוד (2025 " +
          "FPS01) מפנה למתכוני אב ול-Routings כשני נושאים נפרדים; ההבחנה בין מתכון אב (PP-PI, תעשיות תהליכיות) " +
          "ל-Routing (PP, ייצור דיסקרטי) נשענת על נוסח זה בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Master recipe | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/aa818997f3524905ab7bb863aceddb81.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "עמוד אובייקט ההגירה 'Master recipe' ‏(Object Alias PP_MSTRRCP, רכיב PP-PI, סוג Master data) מגדיר: " +
          "'A description of an enterprise-specific process in the process industry that doesn't relate to a " +
          "specific order', ומונה לאימות הנתונים: 'App: Display Master Recipe (C203) Manage Master Recipes " +
          "(F5426)' וכן 'Transaction: Display Master Recipe (C203)'. אפליקציית Manage Master Recipes ‏(F5426) " +
          "היא חלופת ה-Fiori המתועדת לניהול מתכוני אב ב-2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Master Recipes | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/044193180a83415f93949c9939015206.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE3,
        claim:
          "תיאור האפליקציה (2025 FPS01) קובע: 'With this app, you can search through existing master recipes " +
          "and also navigate to the relevant apps to create new master recipes and change existing master " +
          "recipes', וכן 'From the Manage Master Recipes app, you then navigate to the Change Master Recipe app " +
          "using the Change button'. העמוד מגדיר: 'The business object master recipe is the description of an " +
          "enterprise-specific process in process industries, that does not relate to a specific order'. הסניפט " +
          "אינו נוקב במזהה האפליקציה; המזהה F5426 נלקח מעמוד ההגירה 'Master recipe'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 — Feature Pack Stack 3 · item 30.8 S4TWL - ABAP-List-Based PI-Sheets (PP-PI-PMA-MGT)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE3,
        claim:
          "פריט 30.8 ‏(רכיב PP-PI-PMA-MGT; SAP Note 2268116 מופיע כלשונו בגוף המסמך) קובע שגיליונות PI מבוססי " +
          "ABAP-list הוחלפו: יעדי Control Recipe מסוג 1 יש להחליף ביעדים מסוג X ‏(Execution Sheets, מ-S/4HANA " +
          "2023) או מסוג 4 ‏(browser-based PI sheets) בגרסאות S/4HANA נמוכות מ-2023, ו-'This replacement mostly " +
          "affects the used master recipes and process orders'; 'Transactions CO56 and CO58 have been " +
          "deactivated in SAP S/4HANA (on-premise and Private Cloud Edition [PCE])'. הפריט אינו מזכיר את C201 " +
          "ואינו עוסק ביצירת מתכון האב עצמה; חיפוש טקסט מלא בקובץ ה-PDF לא מצא את המחרוזת C201.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת C201",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE3,
        claim:
          "בסיס Tier-2: ‏C201 יוצרת Master Recipe ‏(Task List type 2) עם Operations, Phases, Resources, " +
          "Standard Values, רשימת חומרים ו-Process Instructions ל-Control Recipe, ונשמרת ב-PLKO/PLPO; שרשרת " +
          "התהליך במאגר: CRC1 (Resource) ← C201 (Master Recipe) ← C223 (Production Version) ← COR1 (Process " +
          "Order); שדה s4: 'קיימת ב-S/4HANA; ניהול Master Recipe נתמך גם דרך Fiori'; שדה fiori ריק; s4Delta " +
          "טוען ש-CDS I_Routing / I_RoutingOperation מכסים את שכבת ה-VDM של המתכון, טענה שלא נמצא לה מקור רשמי " +
          "בחיפוש. data/transactions.ts#C201 מציין Fiori 'Manage Master Recipes' וטבלאות PLKO/PLPO/PLMK, " +
          "ו-data/pppi-master-data-facets.ts מקשר C201 ל-C202/C203/C223.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#C201",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: C201_STATUS_SRC,
      secondary: ["fiori_alternative_available"],
      he:
        "טרנזקציה C201 (יצירת מתכון אב) זמינה ב-SAP S/4HANA On-Premise, כולל 2025 FPS01: התיעוד הרשמי מנחה " +
        "במפורש 'you can also use the transaction C201 to create a master recipe'. מתכון האב הוא רשימת " +
        "המשימות של תעשיות תהליכיות (PP-PI) ומשמש במקום Routing ‏('master recipes are used instead of task " +
        "lists'), ולפי שרשרת התהליך במאגר (C201 ← C223 ← COR1) הוא הבסיס להזמנת התהליך; תיעוד PP-PI-POR מציין " +
        "שהזמנות התהליך ממלאות ב-PP-PI את תפקיד הזמנות הייצור. חלופת ה-Fiori לפי תיעוד ההגירה הרשמי: Manage " +
        "Master Recipes ‏(F5426), שממנה, לפי תיאור האפליקציה, מנווטים לאפליקציות היצירה והשינוי של מתכונים. " +
        "אף מקור רשמי שנבדק אינו מסמן את C201 כמוחלפת או כמוצאת משימוש.",
      recommendedAction:
        "להשאיר את C201 כנתיב יצירת מתכוני האב ב-S/4HANA On-Premise ולהציג את Manage Master Recipes ‏(F5426) " +
        "כחלופת ה-Fiori. בהמרה לבדוק את יעדי ה-Control Recipe שבמתכונים: יעדים מסוג 1 (גיליונות PI מבוססי " +
        "ABAP-list) מוחלפים בסוג X (מ-S/4HANA 2023) או בסוג 4 בגרסאות נמוכות מ-2023 לפי פריט הפישוט 30.8, " +
        "ו-CO56/CO58 אינן פעילות. לתקן את הסטטוס הנגזר במאגר: ה-s4Delta של C201 ב-data/tx-intel.ts מפעיל " +
        "'משתנה ב-S/4HANA' אף שהטקסט עצמו אומר שהמבנה ללא שינוי; ולסמן את טענת ה-CDS ‏(I_Routing / " +
        "I_RoutingOperation למתכוני אב) כדורשת אימות.",
    },
    xrefs: ["tx:C202", "tx:C203", "tx:C298", "tx:C223", "tx:CA01", "tx:COR1", "tx:CRC1", "table:PLKO", "table:PLPO", "table:PLMZ", "table:PLMK", "fm:CP_RECIPE_READ", "fm:CP_DI_OPERATION_READ"],
    lastVerifiedAt: DATE3,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ‏('C201 create master recipe', " +
      "'master recipe PP-PI creating a master recipe', 'master recipe routing difference process " +
      "industries', 'Master Recipe PP-PI-MD-MRC', 'Manage Master Recipes F5426', 'simplification master " +
      "recipe C201'), חיפוש רשת מוגבל-דומיין על fioriappslibrary/fal.cloud.sap/help.sap.com, grep על טקסט " +
      "ה-PDF של רשימות הפישוט 2023 FPS3 ו-2025 ושל CONV_OP2025, ורובד Tier-2 מהמאגר. הזמינות ברמת " +
      "sap_official_verified: סניפט הנוהל 'Creating a Master Recipe' ‏(LO, 2025 FPS01) מנחה במפורש שימוש " +
      "ב-C201, וסניפטים נוספים באותה גרסה נוקבים בה בשמה ('Task List Changes and Delete Task List for " +
      "Master Recipe', Retail, loio 586237731eda49d0b9d2d6940feac5a0; 'Manage Change Records', Change " +
      "Management, loio d1c63dbe742b45ad98efa0e726da74a5). הבחנת מתכון מול Routing: סניפט LO-VC ‏('master " +
      "recipes are used instead of task lists'), ו-'Process Orders (PP-PI-POR)' ‏(loio " +
      "ef72be532789b44ce10000000a174cb4) שהסניפט שלו מציין 'Prepare cost determination using the master " +
      "recipe' ושהזמנות התהליך ממלאות ב-PP-PI את תפקיד הזמנות הייצור. צד ה-Fiori: תיאור האפליקציה 'Manage " +
      "Master Recipes' ‏(Production Planning and Control, loio 044193180a83415f93949c9939015206) מצוטט " +
      "כראיה; What's New 2022 מונה אפליקציה 'Create Master Recipe' ‏(App Changed, PP-PI-MD-MRC, scope item " +
      "BJ8, loio 5b40f8503a2d4d2e91b48890e5517b70) ו-'Manage Master Recipes' חדשה ב-2021 ‏(loio " +
      "7ab570e3ca6e45f7ad5887ba9baba217) נותרים כהקשר תומך; חיפוש הרשת החזיר את כותרת הספרייה 'Manage " +
      "Master Recipes' עם appId=F5426 בכתובת, אך עבור 'Create Master Recipe' הכתובת שהוחזרה לא נשאה appId " +
      "ודף appId=C201 מחזיר כותרת גנרית, ולכן רשומת הספרייה של C201 לא צוטטה. ‏F5426 אינה קיימת " +
      "ב-data/fiori/apps.ts ולכן אינה ב-xrefs. אין פריט פישוט הנוקב ב-C201; פריט 30.8 (גיליונות PI) נרשם " +
      "כאזהרת המרה על יעדי Control Recipe בלבד. API: What's New 2025 FPS01 מזכיר OData API_MASTER_RECIPE " +
      "‏(loio 0c7a514cff8e461ba20b964ee2054557) אך דף api.sap.com לא נשלף, ולכן לא נרשם סטטוס " +
      "released_api_available. סתירה פנימית במאגר: הסטטוס הנגזר כיום הוא 'משתנה ב-S/4HANA' ברמת אמון " +
      "'מאומת' רק משום ש-s4Delta אינו ריק, בעוד הטקסט אומר 'המבנה PLKO/PLPO ללא שינוי'; הרשומה המחברת " +
      "מכריעה 'ללא שינוי' על סמך המקור הרשמי. תאריך accessedAt = 2026-09-07 לפי תאריך הבאץ'; ריצת הכלי " +
      "בפועל הודפסה 2026-09-08, והאימות האדברסרי חזר על החיפושים והוריד את ה-PDF ב-2026-09-14.",
  },
];
