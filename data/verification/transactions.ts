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
   conflicts live in audit/s4-enrichment/research-queue-transactions.md.
   Batch 3 (2026-09-24): 6 audited records (IP19, IW37, IW49, CL6O, CO54,
   CO55) carrying the 2025 FPS01 / 2023 FPS03 Simplification List items read
   from the local PDFs plus help.sap.com bodies read through the portal content
   service where the record says so; IW37 / CO55 from verdict.fixedRecord, the
   other four from the drafts with the auditors' downgrades applied verbatim.
   Batch 4 (2026-09-24): 5 audited records; tx:COHVPI (written in the
   interrupted previous run) re-worded per its verdict so the ECC/S4 comparison
   is bounded to the identical search snippet; CO60, COPC, CORZ and CPC1 from
   verdict.fixedRecord (status sources point at the shared CO60_SIMPL_ITEM and
   CORZ_FAL consts; CPC1 verification_required; COPC evidence only). tx:C223
   refuted at the gate and queued.
   Batch 5 (2026-09-24): 4 audited records (CK11N, CL20N, CL24N, CL30N) from
   verdict.fixedRecord; status sources point at the shared CK11N_FAL,
   CL20N_SIMPL_ITEM, CL24N_SIMPL_ITEM_2025 and CL30N_WHATSNEW consts; the CL30N
   Fiori Apps Library row is kept as conflicting_sources ('(Deprecated)' name
   variant at S32OP that no other cited record confirms). tx:CM01 and tx:CM02
   refuted at the gate and queued.
   Batch 6 (2026-09-24): 6 audited capacity-planning records (CM03, CM04, CM05,
   CM07, CM21, CM25) from verdict.fixedRecord, all resting on the 2025 FPS01
   item 'S4TWL - Graphical Planning Table' (CM21 also on its 2023 FPS03
   counterpart); the unaudited tx:CM04 draft left by the interrupted previous
   run was replaced by its audited version. Status sources point at the shared
   CM03_SIMPL_ITEM, CM04_SIMPL_ITEM, CM07_SIMPL_ITEM, CM21_SIMPL_ITEM_2025 and
   CM25_SIMPL_ITEM consts; CM05 carries evidence only (no authored status, as
   audited). None refuted.
   Batch 7 (2026-09-24): tx:C223, refuted in batch 4 and re-drafted, written
   from the draft with its auditor's one downgrade (the evidence[0] title says
   'באותה כותרת' for the 2023 FPS03 item instead of 'זהה'); status source =
   the shared C223_FAL const. Writer corrections: status s4_native (label 'חדש
   ב-S/4HANA') written as unchanged, the COHVPI / CORZ / CK11N pattern, since an
   SAP ERP 6.18 search record prints C223; the Data Migration row titled
   'Production version | Data Migration' (verbatim record title and
   deliverable); the F2568 facts attributed to the library records that print
   them. The generated tx:C223 record in transactions-auto.ts is superseded. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";
const DATE3 = "2026-09-07";
const DATE21 = "2026-09-21";
const DATE22 = "2026-09-22";
const DATE24 = "2026-09-24";

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

/* 2026-09-21 (design audit round 2): the official Simplification List names IP30
   and RISTRA20 explicitly. Read from the PDF itself (Document Version 1.36), not
   from a search snippet. */
const IP30_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 4.1.2 S4TWL - " +
    "Scheduling of Maintenance Plan (PM-PRM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE21,
  claim:
    "פריט 4.1.2 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום PM-PRM; הערת Business Impact " +
    "0002270078 'Scheduling of Maintenance Plan', כפי שמופיעה בטבלת ה-Related Notes של הפריט) קובע בלשונו: " +
    "'Transaction IP30 is doing scheduling for Maintenance Plans. Within this scheduling outdated technology " +
    "(Batch Input) is used. Functionality available in SAP S/4HANA on-premise edition 1511 delivery but not " +
    "considered as future technology. Functional equivalent is not available yet. We plan to discontinue this in " +
    "one of the next Releases. The new transaction for doing mass scheduling is IP30H which is optimized for HANA " +
    "and is offering parallel processing at a much hiher speed' [כך במקור]; תחת Business Process related " +
    "information: 'No influence on business processes expected'; ותחת Required and Recommended Action(s): 'Review " +
    "your background Jobs which you most probably have scheduled periodically for transaction IP30 (Reports " +
    "RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)'. כלומר IP30 עדיין זמינה ב-S/4HANA " +
    "On-Premise, מכוסה בפריט פישוט המסמן אותה כטכנולוגיה שאינה עתידית עם כוונת הפסקה במהדורה עתידית, והנתיב " +
    "המומלץ לתזמון המוני הוא IP30H (תוכנית RISTRA20H).",
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

/* ---------------------- batch 3 (2026-09-24) status sources, shared with evidence[0] */

const IP19_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item " +
    "4.1.10 S4TWL - SAP Graphics in EAM Transactions (PM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 4.1.10 ברשימת הפישוט של SAP S/4HANA 2025 FPS01 (רכיב יישום PM; הערת Business Impact 0002482659 " +
    "'Usage of SAP Business Graphics' כפי שמופיעה בטבלת ה-Related Notes של הפריט; הקובץ " +
    "SIMPL_OP2025.pdf, גרסת מסמך 1.36, md5 c1ccf8ebcd92d51fdc80e4b4873f3b73, נקרא מקומית במלואו, עמוד " +
    "83) קובע בלשונו: 'The graphical output in Enterprise Asset Management transactions using SAP " +
    "Business Graphics, e.g. in transaction IP19, is not available in SAP S/4HANA. Generally SAP " +
    "Business Graphics used in Plant Maintenance applications are no longer supported in SAP S/4HANA. " +
    "The attached pdf gives some of the examples where these charts are used'; תחת Business Process " +
    "related information: 'No influence on business processes expected'; ותחת Required and Recommended " +
    "Action(s): 'Please use the tabular display options'. כלומר הפריט אינו מבטל את IP19 ואינו נוקב " +
    "ביורש: הוא קובע שהפלט הגרפי שלה ב-SAP Business Graphics אינו זמין ב-S/4HANA ומפנה לתצוגות הטבלאיות. " +
    "הקובץ המצורף לפריט ('attached pdf') אינו חלק מה-PDF הציבורי ולא נקרא, וגוף ההערה 2482659 דורש כניסת " +
    "S-user ולא נקרא.",
  verificationLevel: "sap_official_verified",
};

const IW37_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item " +
    "4.1.7 S4TWL - Changes In List Reports For Order and Notification (PM-WOC-MO), p. 80",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 4.1.7 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (הקובץ SIMPL_OP2025.pdf, גרסת מסמך 1.36, " +
    "1,514 עמודים, הורד ונקרא מקומית בטקסט מלא; הפריט בעמ' 80, רכיב יישום PM-WOC-MO; הערת Business " +
    "Impact 0002270108 'Changes In List Reports For Order and Notification' בטבלת Related Notes של " +
    "הפריט) נוקב ב-IW37 בשמה. תחת Description: 'Within Enterprise Asset Management we plan to " +
    "discontinue IW37, IW49 in a future release. It is recommend to use transaction IW37n, IW49n " +
    "instead' [כך במקור], ותחת Required and Recommended Action(s): 'In case you use the transaction " +
    "IW37, IW49, please use IW37n or IW49n instead'. הפריט קובע 'No influence on business processes " +
    "expected', ומציב כתנאי מוקדם להרצת דוחות הרשימה להזמנות ולהודעות ב-S/4HANA את 'the performance " +
    "improvements described in notes 393393 and 551133', עם הרצת הדוחות 'QM_PHASE_FILL' " +
    "ו-'RIAFVC_IPHAS_FILL' לפני ההסבה ('before the ugrade to SAP S/4HANA if not done yet', שגיאת הכתיב " +
    "במקור). הפריט אינו מכריז שהטרנזקציה הוסרה ואינו נוקב במהדורת יעד להפסקתה; המחרוזת IW37 מופיעה בכל " +
    "הקובץ בשלוש שורות בלבד, כולן בפריט הזה.",
  verificationLevel: "sap_official_verified",
};

const IW49_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item " +
    "4.1.7 S4TWL - Changes In List Reports For Order and Notification (PM-WOC-MO)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 4.1.7 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום PM-WOC-MO; הערת Business " +
    "Impact 0002270108 'Changes In List Reports For Order and Notification', כפי שמופיעה בטבלת ה-Related " +
    "Notes של הפריט; עמוד 80 של המסמך שהורד ונקרא מקומית) קובע בלשונו תחת Description: 'Prerequisite for " +
    "executing the list reports for orders and notifications in SAP S/4HANA are the performance " +
    "improvements described in notes 393393 and 551133. The reports listed there need to be executed. " +
    "Within Enterprise Asset Management we plan to discontinue IW37, IW49 in a future release. It is " +
    "recommend to use transaction IW37n, IW49n instead' [כך במקור]; תחת Business Process related " +
    "information: 'No influence on business processes expected'; ותחת Required and Recommended " +
    "Action(s): 'Implement the notes if needed and run the reports QM_PHASE_FILL and RIAFVC_IPHAS_FILL " +
    "before the ugrade to SAP S/4HANA if not done yet' [כך במקור] ו-'In case you use the transaction " +
    "IW37, IW49, please use IW37n or IW49n instead'. כלומר הפריט אינו מסיר את IW49 ואינו מחליף אותה " +
    "במהדורה זו: הוא מודיע על כוונה להפסיקה במהדורה עתידית ומפנה במפורש ל-IW49N כטרנזקציה המומלצת " +
    "במקומה. הפריט אינו נוקב במהדורת ההפסקה או בתאריכה ואינו מזכיר אפליקציית Fiori.",
  verificationLevel: "sap_official_verified",
};

const CL6O_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 Feature Pack Stack 1 (Document Version 1.36) · item 10.4.9 " +
    "S4TWL - Classification (CA-CL)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 10.4.9 ‏(רכיב יישום CA-CL, עמודים 927 עד 929; הערת Business Impact הנקובה במסמך: 0002267878 " +
    "'Classification') קובע: 'With SAP S/4HANA, on-premise edition 1511 transactions of the " +
    "Classification are renovated so that transactions may have changed functionality or may be " +
    "completely removed within SAP Product Lifecycle Management (SAP PLM)'. בטבלה שכותרת העמודה השמאלית " +
    "שלה היא 'Transaction not available since SAP S/4HANA on-premise edition 1511' והימנית 'Available " +
    "alternative transactions and reports' מופיעה השורה 'CL6O Plus-Minus Object Display' (עמוד 929), " +
    "ובעמודת החלופות מול הרצף CL6D, CL6M, CL6O מופיעים שלושה מקפים ('- - -') אחרי 'CL6BN Object List' " +
    "(החלופה של CL6B), כלומר לא נקובה ל-CL6O שום טרנזקציה או דוח חלופיים; ההתאמה בין העמודות נקראת לפי " +
    "סדר השורות בטבלה. 'Required and Recommended Action(s)': 'No special actions required.'; 'Custom " +
    "Code related information': 'SAP note: 2213569' (המספר מופיע כלשונו בגוף המסמך). הפריט אינו מציין " +
    "תאריך הסרה מאוחר יותר ואינו מזכיר אפליקציית Fiori.",
  verificationLevel: "sap_official_verified",
};

const CO54_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
    "Edition 2025 - Feature Pack Stack 1 · item 9.3.16 S4TWL - Process Messages (PP-PI-PMA-MSG)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 9.3.16 (רכיב יישום PP-PI-PMA-MSG, SAP Note 2270231 מסוג Business Impact כפי שהודפס בפריט, עמ' " +
    "630-633 ב-PDF) נוקב בטרנזקציה בשמה בשורת Other Terms: 'Process Management; PI Sheet; Transactions " +
    "CO54, CO54XT'. הפריט קובע: 'Usage of process messages in conjunction with browser-based PI sheets " +
    "(PP-PI) and work instructions (PP-SFC) is part of the compatibility scope', 'This usage comes with " +
    "limited usage rights' (SAP Note 2269324, פריט היקף תאימות 'item ID 455', כלשון הפריט), ואילו 'The " +
    "usage of process messages is possible in conjunction with Manufacturing Execution Connect (classic) " +
    "or in conjunction with Execution Sheets. This usage is not part of the compatibility scope'. עוד " +
    "נכתב: 'No influence on business processes expected as long as you continue to use process " +
    "messages', 'Immediate action is not required', 'Process messages in conjunction with browser-based " +
    "PI sheets/work instructions (PP-SFC) can be used until the expiry date of the compatibility pack " +
    "license', וכי ניתן להשתמש גם ביכולות המובנות של S/4HANA לביצוע ייצור: 'Transactions CORK, COR6N, " +
    "CORZ' ו-'Apps for the production operator role SAP_BR_PRODN_OPTR_PROC'; 'New process order " +
    "integration capabilities will be offered with new SOAP and OData APIs' ו-'Process orders " +
    "confirmations can be received from a MES, that is SAP Digital Manufacturing, with new OData APIs'. " +
    "בסעיף Further information (עמ' 632): Manufacturing Execution Connect (classic) הוצג ב-S/4HANA 2022 " +
    "FPS2 ותומך בהודעות תהליך (PP-PI-PMA-MSG) יחד עם ממשק PI-PCS בסוגי יעד 2 ו-3, ואילו סוג יעד 4 (PI " +
    "Sheets מבוססי-דפדפן) שייך להיקף התאימות; עמ' 633 חוזר גם על הקביעות 'The listed content of the " +
    "compatibility scope is not further supported after the end of usage rights', תום התמיכה ב-PI Sheets " +
    "מבוססי ABAP list (SAP Note 2268116) וסעיף Custom Code Check / Adaption (SAP Note 2268070), המצוטטים " +
    "בראיה של רשימת 2023. הפריט אינו קובע שהטרנזקציה CO54 הוסרה או הוחלפה: היא נזכרת כמונח חיפוש של " +
    "הפריט, וההגבלה חלה על תרחיש השימוש (הודעות תהליך עם PI Sheet מבוסס-דפדפן) ולא על קוד הטרנזקציה.",
  verificationLevel: "sap_official_verified",
};

const CO55_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item " +
    "9.3.18 S4TWL - Browser-based Process Instruction-Sheets/Electronic Work Instructions " +
    "(PP-PI-PMA-PMC), pp. 636-644",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 9.3.18 (רכיב PP-PI-PMA-PMC; SAP Note 2268070 מודפס בטבלת ההערות של הפריט כ-0002268070) נוקב " +
    "ב-CO55 בשמה: תחת 'Transactions (no call or clone in custom code)' מופיע 'CO55 Worklist for " +
    "Maintaining PI Sheets' לצד CO60, CO60E, CO60XT, CO64 ו-CO67 (עמ' 641), תחת 'Programs (no call or " +
    "clone in custom code)' מופיע 'RCOPOC_CO55 Worklist for Maintaining PI Sheets' (עמ' 642), וב-'Other " +
    "Terms': 'Packages COPOC, CMX_POC, CMX_PII, Transactions CO55, CO60, CO60E, CO60XT, CO64, CO67' (עמ' " +
    "637). על תקפות הפונקציה הפריט קובע: 'The functionality of browser-based PI sheets (PP-PI) and " +
    "browser-based work instructions (PP-SFC) is still available in SAP S/4HANA. But it is not " +
    "considered as future technology' (עמ' 637); 'Browser-based PI Sheets and work instructions (PP-SFC) " +
    "only run in SAP GUI for Windows' ו-'cannot run in SAP GUI for HTML or SAP Fiori' (עמ' 640); 'With " +
    "SAP S/4HANA 2023, SAP delivered browser-based XStep-based Execution Sheets' ש-'can be displayed and " +
    "maintained using SAP GUI for Windows and SAP GUI for HTML' (עמ' 640); ובסעיף Custom Code: 'Make " +
    "sure that with end of support of the compatibility scope item' אין קוד לקוח שמעביר או שומר נתונים " +
    "של גיליונות PI מבוססי דפדפן (עמ' 641). הפריט אינו מכריז על הסרת CO55 ואינו נוקב ביורש ברמת " +
    "טרנזקציה; ההפניה קדימה היא ל-Execution Sheets ול-SAP Digital Manufacturing ('mid-to long-term'). " +
    "מספרי SAP Notes 3156433, 3156434, 3413777, 3417131, 3413719 ו-397504 מופיעים כלשונם בגוף הפריט.",
  verificationLevel: "sap_official_verified",
};

const COHVPI_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle:
    "Mass Processing: Process Orders - SAP Fiori Apps Reference Library (App ID COHVPI, release S32OP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('COHVPI')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת ספריית האפליקציות (scripts/fal-app.mjs COHVPI --release S32OP) מכניסה את COHVPI תחת השם " +
    "'Mass Processing: Process Orders', סוג UI 'SAP GUI', סטטוס 'Published', רכיב PP-PI-POR (Process " +
    "Order), תפקיד עסקי SAP_BR_PRODN_SUPERVISOR_PROC (Production Supervisor - Process Manufacturing) " +
    "וקטלוג עסקי SAP_SCM_BC_PROC_ORD_MGMT ('Production Control (Process) - Order Management'). שדה " +
    "ה-releases מפרט זמינות רציפה מ-S6OP (1610) דרך S30OP (2023 FPS03) ועד S32OP (2025 FPS01), ושדות " +
    "predecessors ו-successors שניהם ריקים: הרשומה אינה נוקבת ביורש או בקודם.",
  verificationLevel: "sap_official_verified",
};

const CO60_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item " +
    "9.3.18 S4TWL - Browser-based Process Instruction-Sheets/Electronic Work Instructions " +
    "(PP-PI-PMA-PMC), pp. 636-644",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 9.3.18 (רכיב PP-PI-PMA-PMC; SAP Note 2268070 מודפס בטבלת ההערות של הפריט כ-0002268070, הקובץ " +
    "SIMPL_OP2025.pdf גרסת מסמך 1.36 נקרא מקומית במלואו) נוקב ב-CO60 בשמה: תחת 'Transactions (no call or " +
    "clone in custom code)' מופיעה השורה 'CO60 Find PI Sheet' (עמ' 641) לצד CO55, CO60E, CO60XT, CO64 " +
    "ו-CO67, וב-'Other Terms' (עמ' 637): 'Packages COPOC, CMX_POC, CMX_PII, Transactions CO55, CO60, " +
    "CO60E, CO60XT, CO64, CO67'. על תקפות הפונקציה הפריט קובע: 'The functionality of browser-based PI " +
    "sheets (PP-PI) and browser-based work instructions (PP-SFC) is still available in SAP S/4HANA. But " +
    "it is not considered as future technology' (עמ' 637); 'Browser-based PI Sheets and work instructions " +
    "(PP-SFC) only run in SAP GUI for Windows' ואינם רצים ב-SAP GUI for HTML או ב-SAP Fiori (עמ' 640); " +
    "'With SAP S/4HANA 2023, SAP delivered browser-based XStep-based Execution Sheets' שרצות גם ב-SAP GUI " +
    "for HTML (עמ' 640); ובסעיף Custom Code: 'Make sure that with end of support of the compatibility " +
    "scope item' אין קוד לקוח שקורא, משכפל או שומר נתונים של CO60 ושל שאר הטרנזקציות ברשימה (עמ' 641). " +
    "הפריט אינו מכריז על הסרת CO60 ואינו נוקב ביורש ברמת קוד טרנזקציה; ההפניה קדימה היא ל-Execution " +
    "Sheets ול-SAP Digital Manufacturing ('mid-to long-term').",
  verificationLevel: "sap_official_verified",
};

const CORZ_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle:
    "Fiori Apps Library: CORZ - Confirm Time Event - Process Order Phase (SAP GUI, component " +
    "PP-PI-POR-OPC)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CORZ')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת ה-Fiori Apps Library (S32OP = SAP S/4HANA 2025 FPS01 On-Premise) מציגה את CORZ עצמה כאפליקציית " +
    "SAP GUI בשם Confirm Time Event - Process Order Phase, סטטוס Published, רכיב יישום PP-PI-POR-OPC, " +
    "קטלוג טכני SAP_TC_SCM_PP_BE_APPS:S4PP, intent ProcessOrderConfirmation-createTimeEvent; שדות " +
    "ה-Predecessors וה-Successors ריקים; רשימת ה-releases מראה פרסום רציף מ-S6OP (1610) ועד S32OP (2025 " +
    "FPS01), ללא הפסקה. לפי הרשומה הרשמית CORZ אינה מוחלפת וממשיכה להתפרסם כטרנזקציית SAP GUI לכל אורך " +
    "S/4HANA On-Premise עד המהדורה העדכנית שנבדקה.",
  verificationLevel: "sap_official_verified",
};

const CK11N_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle:
    "Fiori Apps Library: CK11N - Create Material Cost Estimates (SAP GUI, component CO-PC-PCP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CK11N')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת ה-Fiori Apps Library (scripts/fal-app.mjs CK11N --release S32OP; S32OP = SAP S/4HANA 2025 FPS01 " +
    "On-Premise) מציגה את CK11N כאפליקציית SAP GUI בשם 'Create Material Cost Estimates', סטטוס Published, רכיב " +
    "יישום CO-PC-PCP, תפקיד עסקי SAP_BR_INVENTORY_ACCOUNTANT (Cost Accountant - Inventory), קטלוגים עסקיים " +
    "SAP_SFIN_BC_IA_MCE / SAP_SFIN_BC_IA_MCE_NPA. שדה ה-releases מפרט זמינות רציפה מ-S10OP (1709 FPS01) ועד " +
    "S32OP (2025 FPS01), ושדות Predecessors ו-Successors שניהם ריקים: הרשומה אינה נוקבת ביורש או בקודם.",
  verificationLevel: "sap_official_verified",
};

const CL20N_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 10.4.9 " +
    "S4TWL - Classification (CA-CL)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "הפריט נקרא במלואו (הקובץ המקומי scratchpad/official/SIMPL_OP2025.pdf.txt, שורות סביב 52115-52200, ומקבילו " +
    "הזהה בנוסחו ברשימת 2023 FPS03, פריט 28.5, scratchpad/official/SIMPL_OP2023.pdf.txt שורות סביב 36110-36230; " +
    "רכיב היישום הנקוב בשניהם: CA-CL). הוא קובע שהטרנזקציה CL20 (Assign Object to Classes) הוסרה: 'Transaction " +
    "not available since SAP S/4HANA on-premise edition 1511', ובטבלת 'Available alternative transactions and " +
    "reports' רושם במפורש את CL20N (Assign Object to Classes) כטרנזקציה החלופית הזמינה במקומה, לצד CL22N ו-CL24N " +
    "עבור CL22 ו-CL24 שהוסרו. הפריט אינו רושם את CL20N עצמה כטרנזקציה שהוסרה או שהשתנתה בשמה; הוא מציין שינוי " +
    "כללי לקבוצת טרנזקציות הסיווג (הסרת User Defined Data Type למאפיינים, נטרול Rename Characteristic, הסתרת " +
    "Parameter Effectivity, הגבלת ייבוא Batch לשרת ההצגה בלבד) בלי לפרט אילו מהשינויים האלה חלים דווקא על CL20N " +
    "לעומת CL22N/CL24N.",
  verificationLevel: "sap_official_verified",
};

const CL24N_SIMPL_ITEM_2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "S4TWL - Classification (Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1, item 10.4.9)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "הפריט (10.4.9, רכיב CA-CL) חוזר על אותו תוכן: שתי כותרות טבלה נפרדות, 'Transaction not available since SAP " +
    "S/4HANA on-premise edition 1511' ו-'Available alternative transactions and reports', שבהן CL24 (Assign " +
    "Objects to One Class) רשום בטור הראשון והקוד CL24N (Assign Objects / Classes to Class) מופיע באותה שורה בטור " +
    "השני כחלופה הזמינה. גם כאן אין ציון ש-CL24N עצמה הוסרה או שונתה מבחינה פונקציונלית.",
  verificationLevel: "sap_official_verified",
};

const CL30N_WHATSNEW: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Create Link to Manage Change Records App from Transaction CL30N – Find Objects in Classes (What's New in " +
    "SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.003",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/e52f8f2b15ad4a95a12fa4175786adc6.html?locale=en-US&state=PRODUCTION&version=2023.003",
  accessedAt: DATE24,
  claim:
    "גוף הדף (versionId 2023.003, loio e52f8f2b15ad4a95a12fa4175786adc6, deliverable 'What's New in SAP S/4HANA " +
    "and SAP S/4HANA Cloud Private Edition 2023 FPS03', נקרא במלואו דרך שירות התוכן ואומת שוב על ידי המבקר) מתעד " +
    "תוספת פונקציונלית ל-CL30N עצמה: 'You can create a link from the transaction CL30N – Find Objects in Classes " +
    "to the Manage Change Records app by enabling the execute button with transaction /PLMI/CR_NAV_CL30N.' פרטי " +
    "היישום: הגדרה ב-CL30N תחת Environment → Define function, Cat=T (transaction), Function=/PLMI/CR_NAV_CL30N; " +
    "לאחר מכן בחירת רשומת שינוי מתוצאות החיפוש ו-Execute פותחת אותה ב-Manage Change Records app. שדות טכניים: " +
    "Type=New, Application Component=PLM-CR (Change Record), Technical Object Name=F2097, Availability='SAP " +
    "S/4HANA and SAP S/4HANA Cloud Private Edition', Valid as Of='2023 FPS03'. זהו שינוי מתועד בדף What's New, " +
    "ייחודי ל-CL30N, החל ממהדורת On-Premise 2023 FPS03.",
  verificationLevel: "sap_official_verified",
};

const CM03_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle: "S4TWL - Graphical Planning Table (SAP S/4HANA 2025 FPS01 Simplification List, item 9.5.4)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "פריט 9.5.4 (S4TWL - Graphical Planning Table, SAP Note 2268050, סעיף Exceptions) קובע במפורש: 'The following " +
    "CM* transactions do not use graphical planning boards. Therefore, they are not part of SAP S/4HANA " +
    "compatibility scope. CM01, CM02, CM03, CM04, CM05, CM07, CM26, CM28, CM34, CM35, CM37, CM38, CM50, CM53, " +
    "CM56.' כלומר הפריט קובע ש-CM03 אינה מבוססת Gantt-Chart גרפי, ולכן אינה כפופה למגבלת ה-compatibility scope " +
    "(הזמנית, בעלת תוקף פקיעה) שחלה על CM21/CM22/CM23/CM25 וכדומה; הפריט אינו קובע לגבי CM03 עצמה החלפה, הסרה או " +
    "שינוי פונקציונלי, אלא הוצאה מרשימת הקוד הכפוף ל-compatibility scope.",
  verificationLevel: "sap_official_verified",
};

const CM04_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 9.5.4 S4TWL - " +
    "Graphical Planning Table (PP-CRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 9.5.4 עוסק בלוח התכנון הגרפי (Graphical Planning Table / Gantt-Chart) בטרנזקציות CM* ומסמן שהוא חלק מ-SAP " +
    "S/4HANA compatibility scope עם זכויות שימוש מוגבלות (סעיף Solution, הפניה ל-SAP Note 2269324). תחת הכותרת " +
    "Exceptions נכתב במפורש: 'The following CM* transactions do not use graphical planning boards. Therefore, they " +
    "are not part of SAP S/4HANA compatibility scope. CM01, CM02, CM03, CM04, CM05, CM07, CM26, CM28, CM34, CM35, " +
    "CM37, CM38, CM50, CM53, CM56.' כלומר CM04 מנוי בפירוש כטרנזקציה שאינה כפופה למגבלת ה-compatibility scope " +
    "שהפריט קובע לטרנזקציות עם לוח תכנון גרפי (CM21/CM22/CM23/CM25 וכד'); הפריט אינו קובע ל-CM04 סטטוס של החלפה, " +
    "הפסקה או הגבלה.",
  verificationLevel: "sap_official_verified",
};

const CM07_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 9.5.4 S4TWL - " +
    "Graphical Planning Table (PP-CRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 9.5.4 (הערת SAP 0002268050, רכיב יישום PP-CRP) עוסק בלוח התכנון הגרפי (Graphical Planning Table / " +
    "Gantt-Chart) בטרנזקציות CM* ומסמן שהוא חלק מ-SAP S/4HANA compatibility scope עם זכויות שימוש מוגבלות (סעיף " +
    "Solution, הפניה ל-SAP Note 2269324, מזהה 451 במטריצת ה-compatibility). תחת הכותרת Exceptions נכתב במפורש: 'The " +
    "following CM* transactions do not use graphical planning boards. Therefore, they are not part of SAP S/4HANA " +
    "compatibility scope. CM01, CM02, CM03, CM04, CM05, CM07, CM26, CM28, CM34, CM35, CM37, CM38, CM50, CM53, " +
    "CM56.' כלומר CM07 מנויה בפירוש כטרנזקציה שאינה כפופה למגבלת ה-compatibility scope שהפריט קובע לטרנזקציות עם " +
    "לוח תכנון גרפי (CM21/CM22/CM23/CM25 וכד', וכן לוח התכנון הגרפי של MF50). בפריט לא נקבע ל-CM07 סטטוס של החלפה, " +
    "הפסקה או הגבלה; הוא מוציא אותה מהמגבלה.",
  verificationLevel: "sap_official_verified",
};

const CM21_SIMPL_ITEM_2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 (Document Version 1.36) · item 9.5.4 S4TWL - " +
    "Graphical Planning Table (PP-CRP, SAP Note 2268050)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 9.5.4 (SAP Note 2268050) מדפיס תחת 'Other Terms': 'Gantt-Chart; Graphical Planning Board; Capacity " +
    "Levelling; Transactions CM21, CM22, CM23, CM25, CM29, MF50; REO; DMC'. הוא קובע ש-'Transactions CM21, CM22, " +
    "CM23, CM25, etc with graphical planning table are part of the SAP S/4HANA compatibility scope' עם זכויות שימוש " +
    "מוגבלות (מפנה ל-SAP Note 2269324, מזהה 451), וכי 'Transactions CM* with graphical planning board can be " +
    "replaced by one of the following modules: Capacity Planning and Scheduling CPS; Production Planning and " +
    "Detailed Scheduling PP/DS'. תחת CPS מפורטות האפליקציות 'Manage Work Center Capacity' (F3289) לניטור עומסים, " +
    "ו-'Capacity Planning Table (F3770)' או 'Capacity Planning Board (F3951)' לאיזון קיבולת בפועל. הפריט מציין " +
    "רשימת חריגים (CM01, CM02, CM03, CM04, CM05, CM07, CM26, CM28, CM34, CM35, CM37, CM38, CM50, CM53, CM56) שאינן " +
    "משתמשות בלוח הגרפי ולכן אינן ב-compatibility scope; CM21 אינה ברשימת החריגים הזו.",
  verificationLevel: "sap_official_verified",
};

const CM25_SIMPL_ITEM: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - " +
    "Feature Pack Stack 1 (Document Version 1.36) · item 9.5.4 S4TWL - Graphical Planning Table, pp. 779-780",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  verificationLevel: "sap_official_verified",
  claim:
    "פריט הפישוט 9.5.4 S4TWL - Graphical Planning Table (הערה 0002268050, רכיב היישום PP-CRP) נקרא בטקסט המלא " +
    "מ-scratchpad/official/SIMPL_OP2025.pdf.txt (שורות 43080-43170). תחת Other Terms מופיעים הקודים 'Transactions " +
    "CM21, CM22, CM23, CM25, CM29, MF50'. בפרק Solution הפריט קובע במפורש: 'Transactions CM21, CM22, CM23, CM25, " +
    "etc with graphical planning table are part of the SAP S/4HANA compatibility scope'. פרק Exceptions מונה את " +
    "הקודים CM01, CM02, CM03, CM04, CM05, CM07, CM26, CM28, CM34, CM35, CM37, CM38, CM50, CM53, CM56 כטרנזקציות " +
    "שאינן משתמשות בלוח תכנון גרפי ולכן אינן ב-compatibility scope הזה; CM25 אינה ברשימת החריגים. הפריט מסביר שלוח " +
    "התכנון הגרפי (classic Gantt-chart control) של CM25 וטרנזקציות דומות פועל רק ב-SAP GUI ואינו תואם ל'Zero " +
    "footprint' של S/4HANA, ולכן כפוף לזכויות שימוש מוגבלות ולתאריך תפוגה של ה-compatibility scope לפי הערה 2269324 " +
    "(מזוהה שם תחת ID 451), ומציע כחלופה מודולית את Capacity Planning and Scheduling (CPS), הכוללת במפורש את 'App " +
    "Manage Work Center Capacity (F3289)' לאיתור עומסי יתר, או Production Planning and Detailed Scheduling (PP/DS).",
};

/* ---------------------- batch 7 (2026-09-24) status source, shared with evidence[2] */

const C223_FAL: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "C223: Manage Production Versions (SAP GUI), Fiori Apps Library, S32OP",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('C223')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "רשומת ה-FAL עבור C223 (SAP GUI, רכיב PP-PI-MD) מוגדרת Published בגרסת S/4HANA 2025 FPS01 On-Premise " +
    "(S32OP), עם התפקידים SAP_BR_PRODN_ENG_DISC ו-SAP_BR_PRODN_ENG_PROC, וללא predecessor או successor רשומים " +
    "('predecessors: -; successors: -'). רשימת ה-releases שברשומה רציפה מ-S6OP=1610 דרך S9OP=1709 ועד " +
    "S32OP=2025 FPS01. בנוסף קיימת אפליקציית Fiori elements נפרדת F2568 'Manage Production Versions' (רשומה " +
    "נפרדת בספרייה, Apps('F2568')/S32OP: רכיב PP-PEO, OData MPE_MANAGE_PRODVER_SRV) שהטרנזקציה המובילה שלה היא " +
    "C223; גם בה אין predecessor או successor רשומים, כך שאין קשר successor רשמי בין השתיים. F2568 אינה רשומה " +
    "ב-data/fiori/apps.ts ולכן אינה מצוטטת כ-xref.",
  verificationLevel: "sap_official_verified",
};

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
    xrefs: ["tx:IW32", "tx:IW33", "tx:IW34", "fiori:F4604", "fiori:F5241"],
    lastVerifiedAt: DATE2,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשתי שאילתות (On-Premise, ‏21 תוצאות כל אחת), חיפוש רשת מוגבל-דומיין " +
      "לספריית ה-Fiori, ורובד Tier-2 מהמאגר. ‏IW31 מופיעה ב-deliverables רבים של 2025.001 ‏(Maintenance " +
      "Management / Logistics / PP) כולל תוספות יכולת מ-2021-2025, כך שהסטטוס 'ללא שינוי' נתמך ישירות; אף מקור " +
      "רשמי שנמצא אינו קובע הוצאה משימוש או יורש, ולכן אין יורש ברשומה. אף מקור רשמי אינו ממנה חלופת Fiori " +
      "יחידה ל-IW31 (תיעוד Service מפנה גם לאפליקציית 'Create Maintenance Order (IW31)', והמאגר נוקב ב-F2773) — " +
      "לכן F5241 מוצגת כנתיב המתועד, לא כחלופה ממונה, וסתירת המזהים נרשמה בקובץ התור. ‏F5241 אינה קיימת " +
      "ב-data/fiori/apps.ts ולכן אין fiori:F5241 ב-xrefs; פרטי תפקיד/קטלוג/OData של האפליקציה לא אומתו ואינם " +
      "נטענים. ‏accessedAt = 2026-09-02 — התאריך שהטביע כלי החיפוש בפועל. תוספת 2026-09-23: Manage Maintenance Orders נכנס לקטלוג כ-fiori:F5241 ונוסף ל-xrefs; המשפט הקודם על היעדרו נכון לתאריכו.",
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
    xrefs: ["tx:IW31", "tx:IW33", "tx:IW37N", "tx:IW38", "tx:IW41", "table:AUFK", "table:AFIH", "fm:BAPI_ALM_ORDER_MAINTAIN", "enh:badi:WORKORDER_UPDATE", "enh:exit:IWO10009", "enh:exit:IWO10018", "cds:I_MaintenanceOrder", "fiori:F5241"],
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
      "‏(2026-09-02) ושתי ראיות שהוסיף המבקר (2026-09-08). תוספת 2026-09-23: Manage Maintenance Orders נכנס לקטלוג כ-fiori:F5241 ונוסף ל-xrefs; המשפט הקודם על היעדרו נכון לתאריכו.",
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
    xrefs: ["tx:IW39", "tx:IW32", "tx:IW31", "tx:IW37N", "tx:IW72", "tx:IW73", "tx:IW40", "fiori:F4604", "table:AUFK", "table:AFIH", "fm:BAPI_ALM_ORDERHEAD_GET_LIST", "fiori:F5241"],
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
      "החיפוש בפועל. תוספת 2026-09-23: Manage Maintenance Orders נכנס לקטלוג כ-fiori:F5241 ונוסף ל-xrefs; המשפט הקודם על היעדרו נכון לתאריכו.",
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
      IP30_SIMPL_ITEM,
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
        accessedAt: DATE22,
        claim:
          "רובד Tier-2 מסמן את IP30 כ'זמינה ב-S/4HANA' (verified) ומשייך אליה את הטבלאות MPLA/MHIS/MPOS/MMPT, " +
          "את ה-Customer Exit‏ IPRM0001 ואת אובייקטי ההרשאה I_TCODE/I_SWERK/I_INGRP. שדה s4Delta ברשומה, בנוסחו " +
          "מ-2026-09-22, אומר: 'נשמרת ב-S/4HANA כ-Job לתזמון המוני, ולפי פריט הפישוט S4TWL - Scheduling of " +
          "Maintenance Plan הנתיב המומלץ לתזמון המוני הוא IP30H (RISTRA20H); חלופת Fiori לפי תיעוד SAP: Mass " +
          "Schedule Maintenance Plans (F2774)'. (באותו יום נוסף ל-F2774 רשום בקטלוג הפרויקט, ולכן הושמטה מהשדה " +
          "ההערה שלא הייתה לו רשומה.) עד אותו יום השדה הפנה ל-F4072 " +
          "כחלופת תזמון, מזהה שהתיעוד הרשמי מייחס ל-Screen Maintenance Requests (ראו רשומת fiori:F4072).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP30",
      },
    ],
    status: {
      // 2026-09-22: 'simplified' -> 'deprecated' (לא אסטרטגי). The Simplification
      // Item's own words ("not considered as future technology ... We plan to
      // discontinue this in one of the next Releases") in the 2025 FPS01 and
      // 2023 lists are the release-appropriate evidence; IP30H is now a native
      // record of the project, so the successor is linked. The item itself
      // stays as the secondary reading.
      status: "deprecated",
      secondary: ["simplified"],
      successor: "tx:IP30H",
      edition: "on-premise",
      release: "2025 FPS01",
      source: IP30_SIMPL_ITEM,
      he:
        "טרנזקציית IP30 ‏(Deadline Monitoring for Maintenance Plans) מכוסה בפריט הפישוט הרשמי 4.1.2 'S4TWL - " +
        "Scheduling of Maintenance Plan' ‏(PM-PRM) ברשימת הפישוט של SAP S/4HANA 2025 FPS01: הטרנזקציה זמינה " +
        "ב-S/4HANA On-Premise (היא מתועדת גם במדריך Maintenance Planning של 2025 FPS01 לצד IP10 לתזמון תכנית " +
        "בודדת), אך SAP מגדירה את טכנולוגיית ה-Batch Input שבה כ'לא עתידית', מציינת שאין עדיין מקבילה תפקודית " +
        "מלאה, ומודיעה על כוונה להפסיקה באחת המהדורות הבאות. הנתיב שהפריט מפנה אליו לתזמון המוני הוא IP30H " +
        "(תוכנית RISTRA20H, מותאמת HANA עם עיבוד מקבילי), שהתיעוד מקשר ל-Business Function‏ LOG_EAM_MPS1; נתיב " +
        "ה-Fiori המתועד הוא Mass Schedule Maintenance Plans ‏(F2774). מ-2026-09-22 IP30H היא רשומת טרנזקציה " +
        "מקורית של המאגר (tx:IP30H) ולכן רשומה כאן כיורשת מקושרת, והסטטוס הוא 'לא אסטרטגי ב-S/4HANA' כלשון " +
        "הפריט ('not considered as future technology'), עם פריט הפישוט כקריאה משנית.",
      recommendedAction:
        "לפי הפריט: לסקור את עבודות הרקע התקופתיות של IP30 (תוכנית RISTRA20) וליצור עבודות רקע חדשות ל-IP30H " +
        "(תוכנית RISTRA20H); אין השפעה צפויה על התהליך העסקי. במאגר (בוצע 2026-09-22): IP30H נוספה כרשומת " +
        "טרנזקציה מקורית והסטטוס שודרג ל'לא אסטרטגי' עם יורשת מקושרת; ההפניה ל-F4072 בשדה s4Delta של tx-intel " +
        "תוקנה באותו יום (המזהה מתועד רשמית כ-Screen Maintenance Requests; s4Delta מפנה עכשיו ל-IP30H ול-F2774 לפי " +
        "תיעוד SAP).",
    },
    xrefs: ["tx:IP30H", "tx:IP10", "tx:IP01", "tx:IP24", "table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO", "fm:MAINTENANCE_PLAN_SCHEDULE", "fm:ISCHED_CALL_GENERATE", "cds:I_MaintenancePlan", "enh:exit:IPRM0001", "fiori:F2774", "fiori:F5325"],
    lastVerifiedAt: DATE22,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות On-Premise ('IP30 deadline monitoring maintenance " +
      "plans', 'Deadline Monitoring for Maintenance Plans', 'IP30H', 'Mass Schedule Maintenance Plans app " +
      "ID', 'Maintenance Plan API schedule', 'LOG_EAM_MPS1'; 21 תוצאות כל אחת), חיפוש רשת מוגבל-דומיין " +
      "לספריית ה-Fiori (appId=F2774 מחזיר HTTP 200 אך הדף הוא יישום JS ולא נקרא תוכן ממנו), בדיקת HTTP חיה " +
      "לכל כתובת מצוטטת (200), ורובד Tier-2 מהמאגר. גוף עמודי ה-Help לא נקרא; כל טענה מוגבלת לכותרת ולסניפט " +
      "של רשומת החיפוש. ההבחנה מ-IP10 לפי הרשומה הרשמית: IP10 היא 'Scheduling individual maintenance " +
      "plans', IP30 היא 'Deadline Monitoring for Maintenance Plans (Batch Input IP10)' על מבחר תכניות, " +
      "ו-IP30H היא 'Mass schedule maintenance plans' התלויה ב-LOG_EAM_MPS1; עד 2026-09-21 IP30H לא הייתה ביקום " +
      "המאגר ולכן לא היה אליה xref (מאז היא רשומה ומקושרת). רשומות רשמיות נוספות שנמצאו ולא נכללו כראיות: What's New 1610 FPS02 'Planning Plant in " +
      "Maintenance Schedule Date Monitoring' (loio abf10f8a6121496ebc3566fdc72e5459), What's New 1709 'Mass " +
      "Schedule Maintenance Plans' (loio ef815ff35f454fb389d17bbae8ac7250), 'Specifying End Date and End " +
      "Counter' 2025.001 (loio 240a205cebe6470496d25e5689c636d7, 'automatic scheduling (transactions IP30 " +
      "or IP30H)'), 'Scheduling a Maintenance Plan Automatically' 2025.001 (loio " +
      "378b6950e6b6294be10000000a445394), What's New 2021 FPS01 'Schedule Maintenance Plans using " +
      "Maintenance Plan API' (loio b49aca3380b5436aa4e5c494fc0fd33d) ו-What's New 2025 FPS01 'OData API: " +
      "Maintenance Plan' (loio 880c79762567475fa24fdd9a0c41f500, API_MAINTENANCEPLAN). תיקון 2026-09-21 (סבב 2 " +
      "של ביקורת העיצוב): הטענה הקודמת 'לא נמצאה רשומת Simplification Item הנוקבת ב-IP30' והקביעה ש-RISTRA20 " +
      "לא נמצא במקור רשמי הוסרו; פריט 4.1.2 'S4TWL - Scheduling of Maintenance Plan' ברשימת הפישוט הרשמית " +
      "של 2025 FPS01 (הקובץ SIMPL_OP2025.pdf, גרסת מסמך 1.36, נקרא במלואו ולא דרך סניפט) נוקב במפורש ב-IP30, " +
      "ב-RISTRA20, ב-IP30H וב-RISTRA20H, והסטטוס עודכן מ'ללא שינוי' ל'פריט פישוט' עם הפריט כמקור. " +
      "BAPI_MAINTENANCEPLAN_SCHEDULE שברשומת tx-intel עדיין לא נמצא במקור רשמי ואינו ביקום המאגר. F2774 ו-F5325 לא היו " +
      "ב-data/fiori/apps.ts עד 2026-09-22 ולכן לא היו ב-xrefs; באותו יום נוספו לקטלוג עם רשומות אימות משלהן " +
      "(fiori:F2774, fiori:F5325) וצורפו כאן. F4072 ו-F2828 שבמאגר לא צורפו כ-xref כי מיפוין ל-IP30 " +
      "הוא אוצרות המאגר ולא מיפוי רשמי. קישורי ה-FM וה-Customer Exit ב-xrefs הם שיוכי Tier-2 " +
      "(function-intel ו-exits.ts, חלקם מסומנים inferred) ולא מיפוי רשמי. לא בוצעה בדיקה במערכת SAP חיה. " +
      "accessedAt = 2026-09-07 לפי הנחיית ה-workflow; הרצת הכלי בפועל הטביעה 2026-09-08. אימות אדברסרי " +
      "2026-09-14: ארבע רשומות ה-Help אושרו מחדש בחיפוש חי (כותרת, versionId 2025.001, loio), ארבע הכתובות " +
      "מחזירות HTTP 200, 11 ה-xrefs דאז פותרים ביקום החי, ורשומת tx-intel#IP30 תאמה מילה במילה את הנוסח שצוטט " +
      "אז (הציטוט הוחלף ב-2026-09-22 לנוסח הנוכחי של s4Delta). עדכון 2026-09-22 " +
      "(המשך ביקורת העיצוב, §18 IP30/IP30H): IP30H נוספה ל-data/transactions.ts (ולכן לרישום, לדף " +
      "/neo/transactions/IP30H/ ולמניפסט המסלולים) ולשכבת האימות (tx:IP30H, s4_native); הסטטוס כאן שודרג " +
      "מ'פריט פישוט' ל'לא אסטרטגי' עם successor tx:IP30H ו-secondary 'simplified', על סמך לשון הפריט בשתי " +
      "רשימות הפישוט (2025 FPS01 פריט 4.1.2; 2023 FPS03 פריט 29.6, אותו נוסח). סקירת איכות תוכן 2026-09-22: מספר " +
      "הפריט ברשימת 2023 תוקן מ-29.7 ל-29.6 (29.7 הוא Mobile Asset Management) והרכיבים ל-PM, PM-PRM לפי הקובץ " +
      "המקומי; ראיית המאגר על s4Delta עודכנה לנוסח הנוכחי; 12 ה-xrefs פותרים ביקום החי. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* ----------------------------------------------------- tx:IP30H */
  {
    id: "tx:IP30H",
    aliases: ["IP30H (Mass Schedule Maintenance Plans)"],
    evidence: [
      IP30_SIMPL_ITEM,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 (SIMPL_OP2023.pdf) · item 29.6 S4TWL - Scheduling of Maintenance " +
          "Plan (PM, PM-PRM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE22,
        claim:
          "רשימת הפישוט של SAP S/4HANA 2023 (הקובץ SIMPL_OP2023.pdf, נקרא מקומית במלואו) נושאת את אותו פריט באותו " +
          "נוסח: 'The new transaction for doing mass scheduling is IP30H which is optimized for HANA and is " +
          "offering parallel processing at a much hiher speed' [כך במקור], ותחת Required and Recommended " +
          "Action(s): 'Review your background Jobs which you most probably have scheduled periodically for " +
          "transaction IP30 (Reports RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)'. " +
          "כלומר IP30H היא הנתיב הרשמי לתזמון המוני לפחות ממהדורת 2023 ועד 2025 FPS01.",
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
          "'to carry out the mass scheduling of maintenance plans faster and more easily'. זהו תיעוד ה-Help " +
          "הרשמי של הטרנזקציה ב-2025 FPS01; לפי הסניפט, IP30H תלויה בהפעלת ה-Business Function.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "kba",
        sourceTitle: "3776496 - Plan is unable to schedule in IP30H due to error IP735",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://me.sap.com/notes/3776496",
        kba: "3776496",
        accessedAt: DATE22,
        claim:
          "תקציר ה-KBA הרשמי (עמוד התצוגה המקדימה userapps.support.sap.com/sap/support/knowledge/en/3776496, " +
          "ללא כניסה; הקישור הקנוני הוא me.sap.com/notes/3776496) מונה בין המוצרים את SAP S/4HANA (on-premise " +
          "ו-Cloud Private Edition) ואת SAP ERP, ומתאר את התסמין: 'The plan can be scheduled in IP10 and IP30 " +
          "without issue, but unable to schedule via IP30H or RISTRA20H due to error IP735'. כלומר SAP מתעדת " +
          "את IP30H ואת התוכנית RISTRA20H כנתיב תזמון פעיל לצד IP10 ו-IP30. גוף ה-KBA המלא דורש כניסת S-user " +
          "ולא נקרא; לפי כללי השכבה, KBA שנקרא מתקציר נרשם כמקור תומך ולא כאימות רשמי.",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת הטרנזקציות המקורית של הפרויקט (data/transactions.ts#IP30H)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE22,
        claim:
          "IP30H נוספה ב-2026-09-22 לקובץ הטרנזקציות המקורי של הפרויקט על סמך המקורות הרשמיים שלעיל (מודול PM, " +
          "נושא 'אחזקה מונעת'); שדות הטבלאות והאובייקטים משקפים את רשומת IP30 המקורית (MHIS/MHIO, Maintenance " +
          "Plan / Maintenance Order) ואינם מיפוי רשמי; אין לה רשומת tx-intel ואין מודולי פונקציה משויכים.",
        verificationLevel: "repository_verified",
        repoRef: "data/transactions.ts#IP30H",
      },
    ],
    status: {
      status: "s4_native",
      edition: "on-premise",
      release: "2025 FPS01",
      source: IP30_SIMPL_ITEM,
      he:
        "IP30H ‏(Mass Schedule Maintenance Plans, תוכנית RISTRA20H) היא הטרנזקציה החדשה של S/4HANA לתזמון המוני " +
        "של תכניות תחזוקה לפי תיעוד S/4HANA: פריט הפישוט 4.1.2 'S4TWL - Scheduling of Maintenance Plan' (2025 FPS01; " +
        "אותו נוסח בפריט 29.6 של רשימת 2023 FPS03) מציג אותה כ'optimized for HANA' עם עיבוד מקבילי, ומורה להעביר " +
        "אליה את עבודות הרקע של IP30 (RISTRA20). תיעוד ה-Help של 2025 FPS01 מקשר אותה ל-Business Function‏ " +
        "LOG_EAM_MPS1 ('Available From SAP S/4HANA, on-premise edition'), ו-KBA 3776496 מתעד אותה כנתיב תזמון " +
        "פעיל לצד IP10 ו-IP30. גבול הטענה: 'חדשה' נאמר ביחס ל-IP30 ועל סמך תיעוד S/4HANA בלבד; תקציר ה-KBA מונה " +
        "גם SAP ERP בין המוצרים, וזמינות IP30H במערכת ECC לא נבדקה ואינה נשללת כאן.",
      recommendedAction:
        "ליצור עבודות רקע תקופתיות ל-IP30H (RISTRA20H) במקום אלה של IP30 (RISTRA20), כהוראת הפריט; לוודא שה-Business " +
        "Function‏ LOG_EAM_MPS1 מופעלת במערכת; בבדיקות: אותה בחירת תכניות מפיקה אותן קריאות, וריצה חוזרת " +
        "אינה מכפילה קריאות; יומן התזמון נקרא ב-SLG1.",
    },
    xrefs: ["tx:IP30", "tx:IP10", "table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO", "cds:I_MaintenancePlan"],
    lastVerifiedAt: DATE22,
    notes:
      "שיטה (2026-09-22, המשך ביקורת העיצוב §18): קריאה מלאה של שני קובצי רשימת הפישוט הרשמיים שבמאגר המקומי " +
      "(SIMPL_OP2025.pdf גרסת מסמך 1.36, פריט 4.1.2; SIMPL_OP2023.pdf גרסת מסמך 1.35, Feature Pack Stack 3, " +
      "פריט 29.6 'S4TWL - Scheduling of Maintenance Plan', רכיבים PM, PM-PRM; שניהם נוקבים במפורש " +
      "ב-IP30H וב-RISTRA20H); רשומת ה-Help 'Maintenance Plan Scheduling 1' (2025.001, loio c9e717b3…) " +
      "שאומתה כבר ברשומת tx:IP30; תקציר KBA 3776496 (userapps.support.sap.com, HTTP 200, תצוגה מקדימה ללא " +
      "כניסה); חיפוש רשת מוגבל ל-help.sap.com. עמוד ה-Help loio 2d396b50389ff015e10000000a44176d (מסמכי " +
      "S/4HANA On-Premise) הוחזר כמעטפת JavaScript ללא תוכן ולכן אינו ראיה. IP30H אינה ברישום הרוחבי " +
      "(TCODE_CATALOG/TCODE_DIRECTORY) ואינה בבלופרינטים; היא נרשמה ב-data/transactions.ts (הרובד המקורי " +
      "העמוק) ולכן מקבלת דף /neo/transactions/IP30H/ ומזהה במניפסט המסלולים. הסטטוס s4_native ולא " +
      "released_api_available: ה-OData API‏ API_MAINTENANCEPLAN (What's New 2025 FPS01) הוא נתיב נפרד שלא נכלל " +
      "כראיה כאן. לא בוצעה בדיקה במערכת SAP חיה (sc4sap לא התחבר).",
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

  /* ----------------------------------------------------- tx:IP19 */
  {
    id: "tx:IP19",
    aliases: ["IP19 (Maintenance Plan Scheduling Overview and Simulation)"],
    evidence: [
      IP19_SIMPL_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "Scheduling Overview and Simulation | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/52d5c2537d3ab74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף העמוד במהדורת 2025 FPS01 (נקרא במלואו דרך שירות התוכן של פורטל ה-Help, deliverable 40374650 " +
          "build 1779) מונה את סוגי סקירת התזמון 'Call history', 'Scheduling overview and simulation' " +
          "ו-'Scheduling overview as a list', וקובע שבסקירת התזמון והסימולציה 'you can select one of the " +
          "following display variants: As a table in the SAP List Viewer Tabular with additional navigation " +
          "tree'; לתצוגה עם עץ הניווט: 'Release, skip, and fix maintenance calls; set and reset deletion flags " +
          "for maintenance plans; activate and deactivate maintenance plans. Change between simulation mode " +
          "and overview mode'. וריאנט תצוגה גרפי אינו מופיע בגוף העמוד במהדורה זו, ועמוד 'Displaying " +
          "Scheduling Overview or Simulation Directly' (loio 8fa8ce5314894208e10000000a174cb4, אותו " +
          "deliverable, נקרא במלואו) מורה: 'Select the display variant: tabular or tabular with navigation " +
          "tree'. שני העמודים אינם נוקבים בקוד הטרנזקציה IP19; הקישור לקוד נשען על פריט הפישוט (ראיה 1), על " +
          "טבלת מסמכי השינוי (ראיה 3) ועל הערות השחרור של ECC 6.0 (ראו notes).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Change Documents | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/f1a8ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "סניפט רשומת החיפוש וגוף העמוד (נקרא במלואו דרך שירות התוכן, 2025 FPS01) נוקבים ב-IP19 בטבלת הפעולות " +
          "שמעדכנות מסמכי שינוי בתוכניות תחזוקה (עמודות: תוכנית מחזור יחיד זמן/ביצועים, תוכנית אסטרטגיה " +
          "זמן/ביצועים, תוכנית מונים מרובים): לפעולה 'Release' (שדה TSABR) מופיעות השורות 'IP10 X X X X X IP30 " +
          "X X X X X IP19 X X X X X'; לפעולה 'Ignore' (שדה TSTAT) השורות 'IP10 X X X X X IP19 X X X X X'; " +
          "ולפעולה 'Fix' (TSTAT) השורות 'IP10 X Not relevant X Not relevant Not relevant IP19 X Not relevant X " +
          "Not relevant Not relevant', כלומר קיבוע רלוונטי בתוכניות מבוססות זמן בלבד. כלומר בתיעוד S/4HANA " +
          "On-Premise 2025 FPS01 IP19 היא טרנזקציה פעילה שממנה משחררים, מדלגים ומקבעים קריאות תחזוקה, ופעולות " +
          "אלה נרשמות במסמכי שינוי. אותו loio קיים גם בתיעוד SAP ERP 6.0 EHP8 (6.18.latest, רשומת חיפוש תחת " +
          "SAP_ERP); גוף גרסת ה-ERP של עמוד זה לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Scheduling Overview and Simulation | Maintenance Planning (CS-AG/PM-PRM-MP) (SAP ERP 6.0 EHP8)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/11825b10747e4ee4b91ecc1dba612536/52d5c2537d3ab74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio (52d5c2537d3ab74ce10000000a174cb4) בתיעוד SAP ERP 6.0 EHP8 (גוף העמוד נקרא במלואו דרך " +
          "שירות התוכן, deliverable 23795294 build 533, '6.0 EHP8 Latest') מונה שלושה וריאנטים לסקירת התזמון " +
          "והסימולציה: 'In a graphic as a Gantt diagram As a table in the SAP List Viewer As a table in an " +
          "additional navigation tree', ומפרט: 'Scheduling overview and simulation: graphic (Gantt diagram) " +
          "The graphical scheduling overview consists of the following components: Graphical display of the " +
          "simulation of maintenance schedules Graphical representation of the capacity load Detail " +
          "screen(s)'. עמוד ההמשך 'Scheduling Overview and Simulation: Working with the Graphic' (loio " +
          "a1a8ce5314894208e10000000a174cb4, 6.18.latest, נקרא במלואו) מתאר את בלוקי הצבע של מועדי הקריאה " +
          "וההזמנות ואת גרף העומס: 'The system displays a business graphic of the capacity load for the period " +
          "of time you specified. You can display the capacity load in 2D or 3D'. זהו בסיס ה-ECC של הפונקציה " +
          "הגרפית שפריט הפישוט מתייחס אליה; אותו עמוד המשך אינו קיים ב-deliverable של S/4HANA 2025 FPS01 " +
          "(שירות התוכן החזיר HTTP 404 ל-loio זה ב-deliverable 40374650 build 1779 של גרסה 2025.001, וחיפוש " +
          "ה-Help מחזיר אותו רק תחת SAP_ERP). העמוד אינו נוקב ב-IP19.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IP19",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רובד Tier-2 מסמן את IP19 כ'קיים ב-S/4HANA; קיימות אפליקציות Fiori לסקירת תזמון' (verified), נוקב " +
          "ב-'Schedule Maintenance Plans' בשדה fiori וב-s4Delta: 'נשמרת ב-S/4HANA; דשבורד Fiori Maintenance " +
          "Planning Overview (F2828) נותן תמונת תכנון מודרנית', ומשייך את הטרנזקציה לטבלאות MHIS ו-MPLA. " +
          "הרשומה אינה מזכירה את פריט הפישוט ואת אי-זמינות הפלט הגרפי; הצימודים ל-'Schedule Maintenance Plans' " +
          "ול-F2828 הם אוצרות המאגר ואינם נתמכים ברשומה רשמית שנמצאה עבור IP19.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IP19",
      },
    ],
    status: {
      status: "restricted",
      secondary: ["simplified"],
      edition: "on-premise",
      release: "2025 FPS01",
      source: IP19_SIMPL_ITEM,
      he:
        "טרנזקציית IP19 (סקירת תזמון וסימולציה של תוכניות תחזוקה; לפי הערות השחרור של ECC 6.0 שמה שונה אז " +
        "מ-'Graphical Maintenance Plan Scheduling Overview and Simulation' ל-'Maintenance Plan Scheduling " +
        "Overview and Simulation' עם הוספת התצוגות הטבלאיות) ממשיכה להתקיים ב-SAP S/4HANA On-Premise: תיעוד " +
        "Maintenance Planning של 2025 FPS01 נוקב בה בטבלת מסמכי השינוי (שחרור, דילוג וקיבוע של קריאות " +
        "תחזוקה), הרול SAP_PM_PRM_MAIN_PLANS_SCHEDULE מונה 'Maintenance scheduling overview (graphical, " +
        "list)' בין פעילויותיו, ולפי כותרת תוצאת חיפוש רשת, ספריית יישומי ה-Fiori מחזיקה רשומה 'Maintenance " +
        "scheduling overview' תחת appId=IP19 (גוף העמוד הוא app shell שלא נקרא). עם זאת, פריט הפישוט 4.1.10 " +
        "'S4TWL - SAP Graphics in EAM Transactions' (2025 FPS01; אותו נוסח בפריט 29.12 של רשימת 2023 FPS03) " +
        "קובע שהפלט הגרפי ב-SAP Business Graphics, 'e.g. in transaction IP19', אינו זמין ב-S/4HANA ומורה " +
        "להשתמש בתצוגות הטבלאיות. תיעוד ה-Help של 2025 FPS01 תואם: וריאנט הגאנט שמתועד ב-SAP ERP 6.0 EHP8 " +
        "('In a graphic as a Gantt diagram') נעדר מעמוד 'Scheduling Overview and Simulation' של S/4HANA, " +
        "שמונה רק 'As a table in the SAP List Viewer' ו-'Tabular with additional navigation tree'. לכן " +
        "הסטטוס 'מוגבל ב-S/4HANA' עם פריט הפישוט כקריאה משנית; אין הצהרת הוצאה משימוש ואין יורש רשמי.",
      recommendedAction:
        "בהמרה: לוודא שמשתמשי IP19 עוברים לווריאנטים הטבלאיים (ALV או טבלה עם עץ ניווט) כהוראת הפריט, ולבדוק " +
        "וריאנטי בחירה שמורים (Customizing 'Set list editing' לסקירת התזמון) שמפנים לתצוגה הגרפית; להתאים " +
        "חומרי הדרכה ושמות בתפריטים. לסקירה אנליטית ב-S/4HANA לבחון את 'Maintenance Plan Scheduling " +
        "Overview' (App ID W0192, CDS C_MaintPlanSchedgOvwQuery) המתועד ב-Maintenance Management 2025 FPS01, " +
        "בלי להציגו כיורש: אף מקור רשמי אינו מכריז על החלפה. במאגר: לעדכן את s4Delta ואת שדה fiori ברשומת " +
        "tx-intel של IP19 כך שיזכירו את פריט הפישוט ואת אי-זמינות הפלט הגרפי ולהסיר את הצימוד הלא מתועד " +
        "ל-'Schedule Maintenance Plans'; לתקן את אינדקס הפריטים " +
        "(audit/master-completion/simpl-tcode-index.json) שמשייך את אזכור IP19 ברשימת 2023 לפריט 29.9 במקום " +
        "29.12.",
    },
    xrefs: ["tx:IP24", "tx:IP10", "tx:IP30", "tx:IP15", "tx:IP16", "table:MPLA", "table:MPOS", "table:MHIS", "table:MHIO", "cds:I_MaintenancePlan", "fm:SCHEDULING_HISTORY_READ", "obj:maintenance-plan", "bp:preventive-maintenance-process"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה (2026-09-24): scripts/sap-help-search.mjs ב-13 שאילתות On-Premise ('IP19 Maintenance " +
      "Scheduling Overview', 'Maintenance Scheduling Overview graphical', 'IP19', 'SAP Graphics in EAM " +
      "Transactions', 'Changes In List Reports For Order and Notification', 'maintenance scheduling " +
      "overview graphic list IP24', 'Scheduling overview maintenance plans graphic list transaction', " +
      "'Scheduling Overview and Simulation', 'Displaying Scheduling Overview or Simulation Directly', " +
      "'Scheduling Overview and Simulation Working with the Graphic', 'SAP Graphics not available EAM " +
      "transactions Gantt', 'Maintenance Planning Overview F2828', 'Maintenance Plan Scheduling Overview'; " +
      "8 או 6 תוצאות נשלפו מכל שאילתה, השירות מדווח total 21) ושתיים על SAP_ERP ('IP19 maintenance " +
      "scheduling overview', 'maintenance scheduling overview graphic'); קריאה מלאה של 11 גופי עמודים דרך " +
      "שירות התוכן של הפורטל (deliverableMetadata ואז pagecontent); קריאה מקומית מלאה של שני קובצי רשימת " +
      "הפישוט (SIMPL_OP2025.pdf גרסת מסמך 1.36, md5 c1ccf8ebcd92d51fdc80e4b4873f3b73; SIMPL_OP2023.pdf " +
      "גרסת מסמך 1.35, md5 909c6e9087b009e809c116d3c6cf2eec); הורדה וקריאה של הערות השחרור PM של ECC 6.0 " +
      "(help.sap.com/doc/3b20fc4a5ffa4e79b77bec20d88fa2dc/6.00.29/en-US/Chapter_16__PM_Plant_MaintenanceE_(2).PDF, " +
      "14 עמודים, HTTP 200); חיפוש רשת מוגבל-דומיין לספריית ה-Fiori; בדיקת HTTP חיה לכל כתובת מצוטטת " +
      "(200). לא בוצעה בדיקה במערכת SAP חיה (sc4sap לא התחבר). מדידות על רשימות הפישוט: ברשימת 2023 FPS03 " +
      "IP19 נזכרת בפריט 29.12 'S4TWL - SAP Graphics in EAM Transactions' (עמוד 729 לפי תוכן העניינים, רכיב " +
      "PM, הערה 2482659, אותו נוסח כמו 4.1.10 של 2025), ולא בפריט 29.9 'S4TWL - Changes In List Reports " +
      "For Order and Notification' כפי שאינדקס הפרויקט (audit/master-completion/simpl-tcode-index.json) " +
      "מציין: פריט 29.9 (רכיבים PM-WOC-MN, PM-WOC-MO, PM; הערה 2270108) עוסק בהערות הביצועים 393393 " +
      "ו-551133, בדוחות QM_PHASE_FILL ו-RIAFVC_IPHAS_FILL ובכוונה להפסיק את IW37 ו-IW49 לטובת IW37N " +
      "ו-IW49N, ואינו מזכיר את IP19; השיוך השגוי נובע מכותרות 29.10 עד 29.12 שנדפסות בתמצית הטקסט ללא רווח " +
      "('29.12S4TWL') ולכן לא זוהו כפריטים. פריט 4.1.7 של רשימת 2025 (המקבילה של 29.9) גם הוא אינו מזכיר " +
      "את IP19. הערות השחרור של ECC 6.0, סעיף 16.5.1.1 'Graphical Maintenance Scheduling Overview and " +
      "Simulation (Changed)': 'As of SAP ECC 6.0 (SAP_APPL 600), you can use the tabular display and the " +
      "tabular display with navigation tree for the maintenance plan scheduling overview and simulation " +
      "(transaction IPI9) [כך במקור] as an alternative to the graphical display' ו-'Due to the enhancement " +
      "of the transaction IP19, the description Graphical Maintenance Plan Scheduling Overview and " +
      "Simulation was changed to Maintenance Plan Scheduling Overview and Simulation'; כלומר התצוגות " +
      "הטבלאיות שאליהן מפנה פריט הפישוט קיימות ב-IP19 מאז ECC 6.0. תיעוד S/4HANA נוסף שנמצא ולא נכלל " +
      "כראיה: הרול 'Scheduling of Maintenance Plans' (loio f267b65334e6b54ce10000000a174cb4, Maintenance " +
      "Management 2025.001, גוף העמוד נקרא במלואו: 'Scheduling a maintenance plan Deadline monitoring " +
      "Maintenance scheduling overview (graphical, list)'; אינו נוקב בקוד); 'Process Scheduling Overview " +
      "and Simulation' (loio b9a8ce5314894208e10000000a174cb4, 2025.001, נקרא במלואו: מונה 'Calling Up " +
      "Directly', 'From the Maintenance Plan', 'Using List Editing', 'Simulating Changes', 'Scheduling " +
      "Overview as List', בעוד סניפט גרסת ERP 6.18.latest של אותו loio מונה גם 'Working with the Graphic', " +
      "'Shifting the Call in the Graphic', 'Changing the Call in the Graphic'); עמוד הסקירה 'Maintenance " +
      "Planning (CS-AG/PM-PRM-MP)' ב-Maintenance Management 2025.001 (loio " +
      "16adb853dcfcb44ce10000000a174cb4, נקרא במלואו) עדיין מונה תחת Additional Functions 'Scheduling " +
      "overview and simulation In a graphic as a Gantt diagram As a table in the SAP List Viewer As a " +
      "table in an additional navigation tree', וסניפט 'Displaying a Scheduling Overview from the " +
      "Maintenance Plan' (loio 92a8ce5314894208e10000000a174cb4, 2025.001) עדיין אומר 'If you display the " +
      "graphical scheduling overview or simulation directly'; משפטים אלה נותרו מנוסח ה-ERP ואינם תואמים את " +
      "עמוד הנושא של אותה מהדורה. אי-העקביות מתועדת כאן ולא נפתרה, ולכן השאלה אם תרשים הגאנט עצמו עדיין " +
      "נטען ב-IP19 ב-S/4HANA 2025 FPS01 או רק פלט ה-SAP Business Graphics (גרף העומס) נותרת 'דורש אימות " +
      "במערכת SAP'; הסטטוס 'מוגבל' תקף בשני המקרים. 'Renaming of Apps in Maintenance Management' (What's " +
      "New 2025, loio c9959e6129174269adf7632bb60c4ed8, גוף העמוד נקרא במלואו) מונה 30 קודים ששמם שונה; " +
      "IP19 ו-IP24 אינם ביניהם. 'Maintenance Plan Scheduling Overview' (loio " +
      "2a63f2a0afc24eef88a9b8f86027dc6a, Maintenance Management 2025.001, נקרא במלואו): 'App ID: W0192 " +
      "With this app, you can view maintenance plan scheduling details based on the defined selection " +
      "criteria', מבוסס CDS 'C_MaintPlanSchedgOvwQuery'; העמוד אינו מזכיר את IP19, והמזהה W0192 אינו " +
      "ב-data/fiori/apps.ts ולכן אין לו xref. ספריית ה-Fiori: רשומה בשם 'Maintenance scheduling overview' " +
      "תחת fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=IP19 (HTTP 200, גוף app shell " +
      "שלא נקרא; הכותרת מתוצאת חיפוש הרשת). F2828 (Maintenance Planning Overview) שברשומת tx-intel קיים " +
      "במאגר אך לא צורף כ-xref: מיפויו ל-IP19 הוא אוצרות המאגר, ורשומת What's New 1809 (loio " +
      "1ee3b37c9ff64c3aa4c523de5987470f) מתארת אותו כיישום תכנון וניטור ולא כיורש של IP19. IP19 מופיעה " +
      "ברישום הרוחבי (TCODE_CATALOG: 'סקירת תזמון תחזוקה (גרף)') ובתחום pm-maintenance-planning, אך לא " +
      "ברשומות הטרנזקציות המקוריות (data/transactions.ts) ולא בבלופרינטים. הסטטוס הנגזר שהאפליקציה מציגה " +
      "היום ל-IP19 הוא 'משתנה ב-S/4HANA' (הבונה מעלה 'changed' לכל רשומת tx-intel עם s4Delta מאוכלס, " +
      "ב-trust 'verified'); הרשומה הזו מחליפה אותו ב'מוגבל ב-S/4HANA' עם פריט פישוט כקריאה משנית, ובמסך " +
      "הטרנזקציה הכותרת תהיה 'מוגבל ב-S/4HANA' על disposition 'changed'. accessedAt = 2026-09-24 לכל " +
      "הראיות (תאריך הגישה בפועל).",
  },

  /* ----------------------------------------------------- tx:IW37 */
  {
    id: "tx:IW37",
    aliases: ["IW37 (Change Operations)"],
    evidence: [
      IW37_SIMPL_ITEM,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 – Feature Pack Stack 3 (Document Version 1.35) · item 29.9 " +
          "S4TWL - Changes In List Reports For Order and Notification (PM-WOC-MN, PM-WOC-MO, PM), pp. 726-727",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "רשימת הפישוט של SAP S/4HANA 2023 FPS03 (הקובץ SIMPL_OP2023.pdf, גרסת מסמך 1.35 מ-2025-02-25, 1,482 " +
          "עמודים, נקראה מקומית בטקסט מלא) נושאת את אותו פריט כסעיף 29.9 בעמ' 726-727, באותו נוסח: 'Within " +
          "Enterprise Asset Management we plan to discontinue IW37, IW49 in a future release. It is recommend " +
          "to use transaction IW37n, IW49n instead' ו-'In case you use the transaction IW37, IW49, please use " +
          "IW37n or IW49n instead', וכן 'No influence on business processes expected'. ההבדלים בין המהדורות: " +
          "2023 רושמת 'Application Components:PM-WOC-MN, PM-WOC-MO, PM' ואילו 2025 רושמת 'Application " +
          "Component: PM-WOC-MO' בלבד; מספר ההערה נכתב ב-2023 כ-2270108 ללא אפסים מובילים; ותיאור ההערה בטבלת " +
          "Related Notes נכתב ב-2023 כ-'S4TWL - Changes In List Reports For Order and Notification' ואילו " +
          "ב-2025 ללא הקידומת S4TWL. כלומר הכוונה להפסיק את IW37 וההמלצה לעבור ל-IW37N עומדות ללא שינוי לפחות " +
          "ממהדורת 2023 FPS03 ועד 2025 FPS01. המחרוזת IW37 מופיעה בכל הקובץ בשלוש שורות בלבד, כולן בפריט הזה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Linear Data in Reports | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/2807244d6b50403682bfb72dce26e428.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש של help.sap.com למדריך Maintenance Management של SAP S/4HANA On-Premise 2025 FPS01 " +
          "(versionId 2025.001, loio 2807244d6b50403682bfb72dce26e428, תאריך 2026-02-24) מונה בסניפט את דוחות " +
          "הרשימה שבהם מוצגים נתונים ליניאריים: 'Maintenance Order IW38, IW39, IW72, IW73 Maintenance Order " +
          "(Multilevel) IW40 Order Operation IW37, IW49 Maintenance Order and Operation IW37N, IW49N (only " +
          "available [...] in software component EA-APPL)' (הסניפט מקוצר במקום המסומן). IW37 נמנית אפוא " +
          "במהדורה זו, לצד IW49, כדוח הרשימה ברמת פעולת ההזמנה ('Order Operation'), בנפרד מ-IW37N/IW49N ברמת " +
          "'Maintenance Order and Operation'; הסניפט אינו קובע דבר על הוצאה משימוש או על יורשת. אותו loio " +
          "מופיע גם במוצר SAP ERP (deliverable 'Plant Maintenance (PM)', versionId 6.18.latest, כתובת " +
          "https://help.sap.com/docs/SAP_ERP/61f8c51bfee94fa78c8835db685249eb/2807244d6b50403682bfb72dce26e428.html) " +
          "עם אותה טבלה בסניפט, ושם הביטוי '(only available in software component EA-APPL)' מופיע ברצף; כלומר " +
          "IW37 מתועדת באותו אופן ב-SAP ERP 6.0 EHP8.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת IW37",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רובד Tier-2 מסמן את IW37 כ-'זמינה אך מומלץ IW37N' (verified) ומתאר אותה כ'גרסה ישנה (לא-list)' " +
          "שקדמה ל-IW37N. שדה obsolete של הרשומה מונה את הקוד עצמו ('IW37'), שבונה tx-detail מדלג עליו במכוון " +
          "(קוד אינו יורש של עצמו), ושדה s4Delta אומר 'נשמרת ב-S/4HANA; חלופות Fiori לניהול עומס - " +
          "F3289/F3951'. מפני שקיים שדה s4Delta, הבונה מסווג את הטרנזקציה כיום כ-'משתנה ב-S/4HANA' (changed, " +
          "risk medium, trust verified), וזה הסטטוס הנגזר שהאפליקציה מציגה (scratchpad/coverage-ids.json: " +
          "status changed, level repository_verified, depth 3). הרשומה משייכת ל-IW37 את הטבלאות " +
          "AFVC/AFVV/AFKO, את BAPI_ALM_ORDER_MAINTAIN, את ה-BAdI WORKORDER_UPDATE, את ההרחבות " +
          "IWO10009/CYPP0001 ואת אובייקטי ההרשאה I_AUART/I_IWERK/I_VORG_ORD; אף אחד מהשיוכים האלה לא נמצא " +
          "במקור רשמי, ו-F3289/F3951 הן אפליקציות קיבולת של PP שהתיעוד הרשמי אינו מקשר ל-IW37. אין ל-IW37 " +
          "רשומה ב-data/lifecycle.ts, ב-data/transactions.ts (רובד authored) או ב-data/s4-objects.ts.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW37",
      },
    ],
    status: {
      status: "deprecated",
      secondary: ["simplified"],
      successor: "tx:IW37N",
      edition: "on-premise",
      release: "2025 FPS01",
      source: IW37_SIMPL_ITEM,
      he:
        "טרנזקציית IW37 (Change Operations, דוח הרשימה לשינוי פעולות של הזמנות תחזוקה) מכוסה בפריט הפישוט " +
        "הרשמי 4.1.7 'S4TWL - Changes In List Reports For Order and Notification' (PM-WOC-MO) ברשימת הפישוט " +
        "של SAP S/4HANA 2025 FPS01, ובאותו נוסח בפריט 29.9 של רשימת 2023 FPS03. הטרנזקציה זמינה ב-S/4HANA " +
        "On-Premise: מדריך Maintenance Management של 2025 FPS01 מונה אותה, לצד IW49, כדוח הרשימה ברמת 'Order " +
        "Operation' בטבלת הדוחות המציגים נתונים ליניאריים, בנפרד מ-IW37N/IW49N. עם זאת SAP מודיעה בפריט: 'we " +
        "plan to discontinue IW37, IW49 in a future release' וממליצה 'to use transaction IW37n, IW49n " +
        "instead', בלי לנקוב במהדורת יעד ובלי להכריז על הסרה, ומציינת שאין השפעה צפויה על התהליך העסקי. לכן " +
        "הסטטוס הוא 'לא אסטרטגי ב-S/4HANA' עם IW37N (Change Orders and Operations, דוח הרשימה המשולב להזמנות " +
        "ולפעולות) כיורשת המקושרת, ופריט הפישוט כקריאה משנית. רשומות What's New רשמיות ממהדורות 1809 FPS02 " +
        "עד 2025 FPS01 מוסיפות יכולות ל-IW37N (שינוי גורף, שדות משתמש, ביטול הסטטוס Do Not Execute, הזמנות " +
        "תחזוקה לחיוב) ואינן נוקבות ב-IW37, בהתאם לכיוון הזה. אף מקור רשמי שנמצא אינו ממנה אפליקציית Fiori " +
        "כיורשת של IW37.",
      recommendedAction:
        "לפי הפריט: בכל מקום שבו משתמשים ב-IW37 (וב-IW49 להצגה) לעבור ל-IW37N (ול-IW49N), כולל וריאנטים של " +
        "בחירה, תפריטי משתמש, תפקידים (I_TCODE) והנחיות עבודה פנימיות; אין השפעה צפויה על התהליך העסקי. לפני " +
        "ההסבה ל-S/4HANA: ליישם במידת הצורך את ההערות 393393 ו-551133 ולהריץ את הדוחות QM_PHASE_FILL " +
        "ו-RIAFVC_IPHAS_FILL, כדרישת הפריט (תוכן ההערות לא נקרא כאן; דורש אימות במערכת SAP). במאגר: לתקן את " +
        "הסטטוס הנגזר 'משתנה ב-S/4HANA' המוצג כיום ל'לא אסטרטגי' עם יורשת IW37N; ברשומת " +
        "data/tx-intel.ts#IW37 לשקול להעביר את 'IW37' משדה obsolete של הרשומה עצמה לשדה obsolete של רשומת " +
        "IW37N (כך הבונה יפיק יחס יורש מוצהר ולא ידלג עליו), ולהחליף בשדה s4Delta את ההפניה ל-F3289/F3951 " +
        "(אפליקציות קיבולת של PP ללא קישור רשמי ל-IW37) בהפניה לפריט הפישוט ול-IW37N. למשתמשי Fiori: הנתיב " +
        "המתועד לעבודה עם רשימות הזמנות ופעולות הוא האפליקציות Manage Maintenance Orders (F5241), Manage " +
        "Maintenance Notifications and Orders (F4604) ו-Find Maintenance Orders and Operations (ללא רשומה " +
        "בקטלוג המאגר); הן נרשמות כחלופות מתועדות בלבד ולא כיורשות.",
    },
    xrefs: ["tx:IW37N", "tx:IW49", "tx:IW49N", "tx:IW38", "tx:IW32", "tx:IW31", "tx:IW41", "table:AFVC", "table:AFKO", "table:AUFK", "fm:BAPI_ALM_ORDER_MAINTAIN", "enh:badi:WORKORDER_UPDATE", "enh:exit:IWO10009", "cds:I_MaintenanceOrder", "fiori:F5241", "fiori:F4604"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: scripts/sap-help-search.mjs בתשע שאילתות ב-2026-09-24 ('IW37'; 'Change Operations IW37 " +
      "maintenance order list'; 'Changes In List Reports For Order and Notification'; 'IW37' בסקופ " +
      "SAP_ERP; 'Selection of Order Operations change display IW37 IW49'; 'Changing and Displaying Order " +
      "and Operation Lists IW37N'; 'operation list change IW37 hold operations work list'; 'Change " +
      "Operations transaction IW37'; 'What's New IW37 IW49 operation list'; 21 תוצאות לכל שאילתה), חיפוש " +
      "רשת מוגבל לדומיינים הרשמיים (ספריית ה-Fiori לא החזירה רשומה ל-appId=IW37; חיפוש '2270108' לא החזיר " +
      "עמוד ציבורי), שני קובצי Simplification List רשמיים שהורדו ונקראו במלואם (SIMPL_OP2025.pdf: " +
      "10,585,218 בתים, 1,514 עמודים, גרסת מסמך 1.36; SIMPL_OP2023.pdf: 10,174,700 בתים, 1,482 עמודים, " +
      "גרסת מסמך 1.35; גודל הקבצים המקומיים זהה ל-Content-Length שהכתובות הרשמיות מחזירות; הפקה " +
      "ב-pdftotext -layout: 70,529 ו-76,533 שורות), בדיקת HTTP חיה לכל כתובת מצוטטת (200), ורובד Tier-2 " +
      "מהמאגר. גוף עמודי ה-Help לא נקרא: המעטפת מחזירה 1,160 בתים של JavaScript, וניסיון קריאה דרך שירות " +
      "התוכן של הפורטל (http.svc/deliverableMetadata) החזיר 'Invalid input parameter' בפרמטרים שנוסו; לכן " +
      "כל טענה מעמודי Help תחומה לכותרת, לדליברבל ולסניפט של רשומת החיפוש. רשומות רשמיות נוספות שנמצאו ולא " +
      "נכללו כראיות: 'Holding a Plant Maintenance (PM) Order' (Logistics Execution, 2025.001, loio " +
      "faa9cf535b804808e10000000a174cb4), שסניפטו מונה בטבלת Work list 'Operation list - change IW37 - The " +
      "Change Operations - Selection of Order Operations screen RIAFVC20' ו-'Operation list - display " +
      "IW49', ומתאר שניתן להשהות פעולות 'from the PM order work list (IW37)'; 'Operation Account " +
      "Assignment' (Finance, 2025.001, loio 9bb499bb5d794b35b23d438eb28d7079): 'Operations: Selection of " +
      "order operations (change, display) IW37, IW49' בין הטרנזקציות שבהן זמינה הקצאת חשבון ברמת פעולה. " +
      "שלושת ה-loio האלה (2807244d..., faa9cf53..., 9bb499bb...) מופיעים גם במוצר SAP ERP 6.0 EHP8 " +
      "(versionId 6.18.latest) באותו נוסח, ולכן מעמד ה-ECC של IW37 הוא טרנזקציית רשימה סטנדרטית ומתועדת; " +
      "שם התוכנית RIAFVC20 נשען על סניפט בלבד. רשומות What's New שמזכירות IW37N ולא IW37: 'Order and " +
      "Operation List: Mass Change' (1809 FPS02, loio 3af6386d6117494d8b3d8cc476ee5ee8), 'Maintenance " +
      "Order: Cancelation of System Status Do not Execute' (2020 FPS02, loio " +
      "f7d433f42ea8430c85bb488b27e23b84), 'EAM Inspection Checklists' (2021, loio " +
      "efbe41b505c74ad8bcadffec475bacf3), 'Order and Operation List: Processing User Fields' (2023, loio " +
      "69c73ffb302c4118bbb1cd61d39a242e), 'Mass Change for Billable Maintenance Orders' (2025 FPS01, loio " +
      "093dd40d9e174a9fa0d814caf4ca13b8). רשומות Help התומכות בנתיב ה-Fiori שב-recommendedAction: 'Mass " +
      "Changes for Maintenance Orders and Operations' (Maintenance Management, 2025.001, loio " +
      "521cbb3e5a574bdcadc89ea6a8ed8f64), שסניפטה קובע 'The following app allows you to perform mass " +
      "changes on maintenance order operations: Find Maintenance Orders and Operations' ומונה 'Manage " +
      "Maintenance Orders (F5241) Find Maintenance Orders (F2175)'; ו-'Working with Billable Maintenance " +
      "Orders in List Views' (Orders CS-SE/PM-WOC-MO, 2025.001, loio 1e20f71ea1904df98d7d1386ddb73436): " +
      "'SAP Fiori apps for processing maintenance orders such as Find Maintenance Orders and Operations'. " +
      "F2175 ו-Find Maintenance Orders and Operations אינן בקטלוג המאגר ולכן לא קושרו. מספרי ההערות " +
      "0002270108, 393393 ו-551133 מצוטטים מתוך ה-PDF ולא הוזנו בשדה sapNote (אין קישור me.sap.com/notes " +
      "נגיש ואין repoRef); תוכנן לא נקרא. xrefs: הקישורים ל-AFVC/AFKO/AUFK, ל-BAPI_ALM_ORDER_MAINTAIN, " +
      "ל-WORKORDER_UPDATE ול-IWO10009 הם שיוכי Tier-2 (tx-intel, exits.ts) ולא מיפוי רשמי; AFVV ו-CYPP0001 " +
      "שברשומת tx-intel אינם ביקום המאגר ולכן לא קושרו; F3289/F3951 שבשדה s4Delta לא קושרו (אפליקציות " +
      "קיבולת PP ללא קישור רשמי ל-IW37); F5241/F4604 קושרו כנתיבי Fiori מתועדים לרשימות הזמנות, לא " +
      "כיורשות. הסטטוס נכתב deprecated עם successor ו-secondary simplified לפי התקדים של tx:IP30 (פריט " +
      "4.1.2, אותה לשון 'plan to discontinue'). לא בוצעה בדיקה במערכת SAP חיה. אימות אדברסרי 2026-09-24: " +
      "כל הכתובות 200 בדומיין מאושר; ציטוטי ה-PDF, מספרי העמודים, גרסאות המסמך, מספרי העמודים הכוללים " +
      "וגודלי הקבצים אומתו מול הקבצים המקומיים; loio/versionId אומתו מחדש; לוגיקת הבונה " +
      "(components/neo-shell/data/tx-detail.ts) והשורה ב-scratchpad/coverage-ids.json אומתו; " +
      "validateRecords מול היקום המלא החזיר אפס בעיות.",
  },

  /* ----------------------------------------------------- tx:IW49 */
  {
    id: "tx:IW49",
    evidence: [
      IW49_SIMPL_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "Linear Data in Reports | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/2807244d6b50403682bfb72dce26e428.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף העמוד נקרא במלואו דרך שירות התוכן של הפורטל (deliverable_id 40374871, build 1780, 5,671 תווים). " +
          "טבלת 'Report / Transaction' של הפונקציה Linear Data in Reports במדריך Maintenance Management ל-2025 " +
          "FPS01 מונה תחת 'Order Operation' את 'IW37, IW49' ותחת 'Maintenance Order and Operation' את 'IW37N, " +
          "IW49N (only available in software component EA-APPL)', לצד 'Maintenance Order: IW38, IW39, IW72, " +
          "IW73', 'Maintenance Order (Multilevel): IW40' ו-'Confirmation: IW47'. העמוד קובע: 'You can use " +
          "linear data as selection criteria and display the result lists with linear data in the following " +
          "reports' ו-'The SAP List Viewer is available for displaying and formatting the lists with linear " +
          "data. You can store information on the column setup, sort criteria, and filter conditions in " +
          "layouts'. כלומר IW49 מתועדת ב-2025 FPS01 כדוח רשימה פעיל ברמת פעולת ההזמנה, ו-IW49N היא דוח ההזמנה " +
          "והפעולה המשולב, שהעמוד מתנה ברכיב התוכנה EA-APPL. העמוד אינו מזכיר הוצאה משימוש של IW49.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Holding a Plant Maintenance (PM) Order | Logistics Execution (LE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9609b5f9e9304ef6850945b359a1f5d4/faa9cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף העמוד נקרא במלואו דרך שירות התוכן של הפורטל (deliverable_id 40374609, build 1779, 1,911 תווים). " +
          "טבלת 'Work list / Transaction / Program' קובעת: 'Operation list - display | IW49 – The Display " +
          "Operations: Selection of Order Operations screen | RIAFVC20' ולצדה 'Operation list – change | IW37 " +
          "– The Change Operations – Selection of Order Operations screen | RIAFVC20', כלומר שתי רשימות " +
          "הפעולות רצות על אותה תוכנית ABAP, RIAFVC20, ושם המסך המתועד של IW49 ב-2025 FPS01 הוא 'Display " +
          "Operations: Selection of Order Operations'. העמוד מוסיף: 'The standard SAP PM order work lists " +
          "allow operations and components to be held and released' ו-'The following work lists allow you to " +
          "display the hold flag on operations'. העמוד עוסק בפונקציית ה-Hold של RLM (כלשון העמוד) ואינו קובע " +
          "דבר על עתידה של IW49.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Linear Data in Reports | Plant Maintenance (PM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/61f8c51bfee94fa78c8835db685249eb/2807244d6b50403682bfb72dce26e428.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש של תיעוד SAP ERP 6.0 EHP8 (מדריך Plant Maintenance (PM), versionId 6.18.latest, אותו " +
          "loio כמו עמוד ה-S/4HANA) מביאה את אותה טבלת דוחות: 'Maintenance Order IW38, IW39, IW72, IW73 " +
          "Maintenance Order (Multilevel) IW40 Order Operation IW37, IW49 … Maintenance Order and Operation " +
          "IW37N, IW49N (only available in software component EA-APPL) Maintenance Item IP17, IP18 " +
          "Confirmation IW47'. כלומר IW49 היא דוח רשימת פעולות ההזמנה הקיים כבר ב-ECC 6.0, וגם IW49N מתועדת שם " +
          "באותה התניה על EA-APPL; ההבחנה בין IW49 ל-IW49N אינה חדשה ב-S/4HANA. גוף העמוד במהדורת ERP לא נקרא; " +
          "הטענה מוגבלת לסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת IW49",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת tx-intel ל-IW49 (module PM, area 'דוחות וניהול רשימות - פעולות') מתארת 'הצגת רשימת פעולות " +
          "תחזוקה (Display List of Operations)' ברמת פעולה (AFVC/AFVV) ממספר הזמנות, לתכנון עומסי עבודה וניתוח " +
          "backlog; s4: 'זמינה ב-S/4HANA. מומלצות אפליקציות Fiori לתכנון תחזוקה ו-resource scheduling', fiori: " +
          "'Find Maintenance Orders', obsolete ריק, verified: 'verified', ו-s4Delta המציין שהיא נשמרת " +
          "ב-S/4HANA ומפנה לחלופות Fiori לניהול עומס, Manage Work Center Capacity (F3289) ו-Capacity " +
          "Scheduling Board (F3951). מפני שקיים שדה s4Delta, בונה tx-detail מסווג את הטרנזקציה כ'משתנה " +
          "ב-S/4HANA' (changed, risk medium, trust verified), ומפת הסטטוס הנגזרת (lib/evidence/s4-status.ts) " +
          "מציגה 'changed' ממקור tx-intel; אף רשומת tx-intel אחרת אינה מונה את IW49 ב-obsolete. הרשומה אינה " +
          "מזכירה את פריט הפישוט ואינה נוקבת ב-IW49N כיורשת; ה-BAPI שברשומה, BAPI_ALM_ORDER_GET_LIST, אינו " +
          "קיים ביקום המזהים של המאגר (הקיים הוא BAPI_ALM_ORDERHEAD_GET_LIST).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#IW49",
      },
    ],
    status: {
      status: "deprecated",
      secondary: ["simplified"],
      successor: "tx:IW49N",
      edition: "on-premise",
      release: "2025 FPS01",
      source: IW49_SIMPL_ITEM,
      he:
        "טרנזקציית IW49 (Display Operations: Selection of Order Operations, דוח רשימת פעולות ההזמנה על " +
        "תוכנית RIAFVC20) מכוסה בפריט הפישוט הרשמי 4.1.7 'S4TWL - Changes In List Reports For Order and " +
        "Notification' (PM-WOC-MO) ברשימת הפישוט של SAP S/4HANA 2025 FPS01, ובפריט 29.9 באותו נוסח ברשימת " +
        "2023 FPS03: הטרנזקציה זמינה ב-S/4HANA On-Premise 2025 FPS01 (היא מתועדת בטבלת הדוחות של Linear Data " +
        "in Reports, בטבלת רשימות העבודה של Holding a Plant Maintenance (PM) Order, בטבלת הטרנזקציות של " +
        "Operation Account Assignment ובתנאי ההרשאה של תצוגת ה-CDS I_MaintOrderOperation_DEX), אך SAP מודיעה " +
        "'we plan to discontinue IW37, IW49 in a future release' וממליצה 'use transaction IW37n, IW49n " +
        "instead'. הפריט אינו נוקב במהדורת ההפסקה, קובע 'No influence on business processes expected' ואינו " +
        "ממנה אפליקציית Fiori. לכן הסטטוס הוא 'לא אסטרטגי ב-S/4HANA' כלשון הפריט, כמו tx:IP30 שנכתבה על " +
        "הצהרת כוונת הפסקה מאותו סוג, עם IW49N (רשומת קטלוג קיימת במאגר עם דף משלה) כיורשת המקושרת ופריט " +
        "הפישוט כקריאה משנית; ההפסקה עצמה טרם בוצעה במהדורה המתועדת.",
      recommendedAction:
        "לפי הפריט: לפני השדרוג ל-S/4HANA ליישם את ההערות הנדרשות ולהריץ את הדוחות QM_PHASE_FILL " +
        "ו-RIAFVC_IPHAS_FILL אם טרם בוצעו; להחליף שימוש ב-IW49 ב-IW49N (ובמקביל IW37 ב-IW37N) בתפריטים, " +
        "בתפקידים, בווריאנטים של בחירה ובעבודות רקע, בזכירה שהתיעוד מתנה את IW37N/IW49N ברכיב התוכנה EA-APPL " +
        "כלשון העמוד. במאגר: להוסיף ל-data/tx-intel.ts (IW49) הפניה לפריט הפישוט ול-IW49N כיורשת, ולתקן את " +
        "שם ה-BAPI ל-BAPI_ALM_ORDERHEAD_GET_LIST או להסירו; הסטטוס הנגזר 'משתנה ב-S/4HANA' המוצג כיום נובע " +
        "רק מקיום שדה s4Delta ולא מהצהרה רשמית, ורשומת האימות הזו מחליפה אותו. למשתמשי Fiori: האפליקציה " +
        "המתועדת לרשימת הזמנות ופעולות היא Find Maintenance Orders and Operations (F2173), שאינה בקטלוג " +
        "ה-Fiori של המאגר ולכן אינה מקושרת; היא חלופה מתועדת ולא היורשת שהפריט ממנה.",
    },
    xrefs: ["tx:IW49N", "tx:IW37", "tx:IW37N", "tx:IW33", "tx:IW38", "tx:IW39", "tx:IW40", "tx:IW47", "table:AFVC", "table:AFKO", "table:AUFK"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: scripts/sap-help-search.mjs בתשע שאילתות מול SAP_S4HANA_ON-PREMISE (IW49 display operations; " +
      "IW49N orders and operations; Changes In List Reports For Order and Notification; Display Orders and " +
      "Operations IW49N; IW37 IW49 IW37N IW49N discontinue; Find Maintenance Orders and Operations; IW49N; " +
      "displaying operations list editing maintenance order; Changing and Displaying Order and Operation " +
      "Lists עם version 2025.001) ואחת מול SAP_ERP (IW49 operations list), שני חיפושי רשת מוגבלים " +
      "לדומיינים הרשמיים, קריאת שני פריטי הפישוט מקובצי הטקסט המקומיים של הרשימות " +
      "(scratchpad/official/SIMPL_OP2025.pdf.txt שורות 4150-4182, Document Version 1.36; " +
      "SIMPL_OP2023.pdf.txt שורות 38660-38700, Document Version 1.35 מ-2025-02-25, עמודים 726-727: פריט " +
      "29.9 'S4TWL - Changes In List Reports For Order and Notification' עם Application Components " +
      "PM-WOC-MN, PM-WOC-MO, PM והערה 2270108, באותו נוסח מילה במילה, כולל 'we plan to discontinue IW37, " +
      "IW49 in a future release' ו-'In case you use the transaction IW37, IW49, please use IW37n or IW49n " +
      "instead'), וקריאה מלאה של חמישה גופי עמודים דרך שירות התוכן של הפורטל (deliverableMetadata ואז " +
      "pagecontent). עמודים רשמיים נוספים ל-2025.001 הנוקבים ב-IW49 ואינם ברשימת הראיות: 'Operation " +
      "Account Assignment' (loio 9bb499bb5d794b35b23d438eb28d7079, מופיע במדריכי Logistics ו-Finance; גוף " +
      "נקרא במלואו, 2,338 תווים: Business Function LOG_EAM_OLC, 'Available As Of SAP S/4HANA, on-premise " +
      "edition 1511', רכיב PM-WOC-MO-OLC, ובטבלת הטרנזקציות 'Operations: Selection of order operations " +
      "(change, display) IW37, IW49'); 'Maintenance Order Operation Data' במדריך Virtual Data Model and " +
      "CDS Views (loio 18610efa4d9e49bbba55a03a762ad524; גוף נקרא במלואו, 3,216 תווים: CDS View Name " +
      "I_MaintOrderOperation_DEX, Status Released, מיועדת לשימוש כ-DataSource ב-BW, ותנאי מוקדם 'You have " +
      "authorizations to display the relevant maintenance order operations in transactions IW33 and IW49' " +
      "על השדות I_KOSTL, I_INGRP, I_IWERK, I_SWERK, I_BEGRP ו-I_AUART; הגרסה המסומנת Deprecated באותו " +
      "מדריך היא loio 593e11eb7b4a486fa948041cf837a994 ב-2023.latest; התצוגה אינה ביקום ה-CDS של המאגר " +
      "ולכן אינה ב-xrefs); 'Selecting Logbook Data' במדריך PLM (loio e2e7c353b677b44ce10000000a174cb4, " +
      "סניפט: 'This option uses the operation selection report IW49 to select data into the logbook'); " +
      "'Inspection Rounds' במדריך Maintenance Management (loio 1065bd534f22b44ce10000000a174cb4, סניפט: " +
      "'In order lists and operation lists (IW37N/IW49N), you can select operations by searching for " +
      "functional locations and equipment in the operations'); ו-'Changing and Displaying Order and " +
      "Operation Lists' במדריך Orders (CS-SE/PM-WOC-MO) (loio 4fcab65334e6b54ce10000000a174cb4, 2025.001; " +
      "גוף נקרא במלואו, 1,390 תווים: נתיבי התפריט 'Operation List → Change/Display' ו-'Order- and " +
      "Operation Lists → Change/Display' בלי קודי טרנזקציה). ספריית ה-Fiori הקלאסית מחזירה HTTP 200 (מעטפת " +
      "JavaScript בלי גוף) לכתובת externalViewer/?appId=IW49, וחיפוש רשת מוגבל לדומיין החזיר אותה בכותרת " +
      "'Display Operations - SAP Fiori Apps Reference Library'; לא נרשמה כראיה כי הכותרת מגיעה מתוצאת " +
      "חיפוש ולא מעמוד שנקרא, ולכתובת appId=IW49N לא הוחזרה כותרת. tx:IW49N קיימת במאגר כרשומת קטלוג " +
      "(data/tcode-catalog.ts: 'Display Orders and Operations', 'הצגת הזמנות ופעולות') ובמניפסט הנתיבים, " +
      "אך אין לה רשומת tx-intel ואין לה עדיין רשומת אימות; היורשת מקושרת על סמך לשון הפריט בלבד. רשומות " +
      "What's New 'Deprecation of Manage Maintenance Order List App' (2022) ו-'Deletion of Manage Order " +
      "List App' (2023 FPS01, loio fa214493e8fd4b6796c8ff94c578d1eb) נוקבות ביורשות Find Maintenance " +
      "Orders (F2175) ו-Find Maintenance Orders and Operations (F2173); זו אפליקציית Fiori, לא IW49, ואין " +
      "להסיק ממנה על הטרנזקציה. F2173 אינה ב-data/fiori/apps.ts ולכן אינה ב-xrefs; F3289 ו-F3951 " +
      "(מ-s4Delta של tx-intel) הן אפליקציות PP במאגר ואף מקור רשמי אינו קושר אותן ל-IW49, ולכן לא נוספו. " +
      "ה-xref לטבלאות AFVC, AFKO ו-AUFK ולטרנזקציות IW33, IW38, IW39, IW40 ו-IW47 הוא עוגן ניווט משורות " +
      "הטבלאות הרשמיות (Linear Data in Reports, VDM) ומשכבת המאגר, לא קביעה על מקור הנתונים של הדוח. ספרי " +
      "SAP PRESS במאגר (Book 1 פרקים 3 ו-9, Book 9 פרק 8, pm-textbook פרק 3) מונים 'פעולות (IW37, IW49)' " +
      "ו-'רשימת הזמנות/פעולות משולבת (IW37N, IW49N)' בין רשימות ה-PM, הקשר Tier-2 בלבד. לא נרשמו SAP Note " +
      "או KBA כשדות: המספרים 2270108, 393393 ו-551133 מצוטטים כפי שהם מודפסים בפריט ולא נקראו (ערוץ " +
      "ה-Notes חסום ב-S-user). accessedAt = 2026-09-24, התאריך שהדפיס כלי החיפוש בפועל.",
  },

  /* ----------------------------------------------------- tx:CL6O */
  {
    id: "tx:CL6O",
    aliases: ["CL6O (Plus-Minus Object Display)", "CL6O (סקירת אובייקטים)"],
    evidence: [
      CL6O_SIMPL_ITEM,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 Feature Pack Stack 3 (Document Version 1.35) · item 28.5 " +
          "S4TWL - Classification (CA-CL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט 28.5 ‏(Application Components: CA-CL, עמודים 674 עד 678; הערת Business Impact הנקובה במסמך: " +
          "2267878 'S4TWL - Classification') נושא את אותו נוסח: 'With SAP S/4HANA, on-premise edition 1511 " +
          "transactions of the Classification are renovated so that transactions may have changed " +
          "functionality or may be completely removed within SAP Product Lifecycle Management (SAP PLM)'. " +
          "בטבלת 'Transaction not available since SAP S/4HANA on-premise edition 1511' מול 'Available " +
          "alternative transactions and reports' השורה בעמוד 676 נקראת בפריסת העמוד במלואה: 'CL6O Plus-Minus " +
          "Object Display -', כלומר CL6O רשומה כלא זמינה ומקף בלבד בעמודת החלופה; בשורות הסמוכות CL6B מקבלת את " +
          "CL6BN ‏(Object List) ו-CL2B את O1CL ‏(Class Types). 'Required and Recommended Action(s)': 'No " +
          "special actions required.'; 'Custom Code related information': 'SAP note:2213569' (עמוד 678, כלשונו " +
          "במסמך).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Classifications | Cross-Application Components (CA)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/849930ca4c3349b5a117bf279a72b34f/f786c4535cdeb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד התפקיד Create Classifications ‏(Technical name: SAP_CA_CL_MAINTAIN, 2025 FPS01) נקרא במלואו " +
          "דרך שירות התוכן של הפורטל (deliverable_id 40374515, buildNo 1779; 1,324 תווים). טבלת 'Activities in " +
          "the Classification System' שלו מונה תחת 'Reporting Functions' את 'CL6AN Class list (ALV)', 'CL6A " +
          "Class list', 'CL6D Class without superior', 'CL6C Class hierarchy', 'CL6BN Object list (ALV)', " +
          "'CL6B Object list', 'CL60 Object comparison' ו-'CL2A Classification status', ותחת 'Classification' " +
          "את 'CL30N Find objects in classes'. המחרוזת CL6O אינה מופיעה בגוף העמוד, וגם לא הביטוי 'Plus-Minus' " +
          "או 'Object Overview'. הגרסה המקבילה בסקופ SAP ERP ‏(6.18.latest, deliverable_id 23795156, buildNo " +
          "541) זהה תו לתו, כך שגם היא אינה נוקבת ב-CL6O. זהו ממצא שלילי תחום לעמוד הזה; CL60 ‏(עם אפס) היא " +
          "טרנזקציה אחרת, 'Object comparison'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות המאומת של הפרויקט (TCODE_CATALOG) ושכבות המאגר הנוקבות ב-CL6O",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "בסיס Tier-2: ‏data/tcode-catalog.ts רושם את CL6O כ-'Object Overview' ‏/ 'סקירת אובייקטים', מודול " +
          "PP-PI, תחום 'מערכת מחלקות', בלי שדה S/4 ובלי מקור; אין ל-CL6O רשומה ב-data/tx-intel.ts ולא " +
          "ב-data/transactions.ts, ולכן הסטטוס הנגזר שהאפליקציה מציגה היום (לפי קריאת " +
          "components/neo-shell/data/tx-detail.ts) הוא 'לא קיים תיעוד מאומת במאגר' ברמת אמון 'needs'. רשומות " +
          "tx-intel של CL01 ו-CL02 מונות את CL6O בשדה alternative ו-CL30N בשדה similar; " +
          "data/troubleshooting.ts ‏(char-batch-classification-missing) ו-data/troubleshooting-ext.ts " +
          "‏(batch-valuation-class-mismatch) מנחים להשתמש ב-CL6O לרשימת אצוות לפי מחלקה, ל-reclassification " +
          "ולעבודת רקע תקופתית; data/best-practices/pppi-processes.ts ‏(batch-management-process) מקשר אליה " +
          "כ'רשימת אובייקטים לפי מחלקה'. הכותרת 'Object Overview' אינה נתמכת באף מקור רשמי שנבדק: שתי רשימות " +
          "הפישוט קוראות לטרנזקציה 'Plus-Minus Object Display'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CL6O",
      },
    ],
    status: {
      status: "legacy_ecc_only",
      secondary: ["simplified"],
      edition: "on-premise",
      release: "2025 FPS01",
      source: CL6O_SIMPL_ITEM,
      he:
        "טרנזקציה CL6O ‏(Plus-Minus Object Display, מערכת המחלקות CA-CL) רשומה בפריט הפישוט הרשמי 'S4TWL - " +
        "Classification' ‏(10.4.9 ברשימת 2025 FPS01, 28.5 ברשימת 2023 FPS03) בעמודה 'Transaction not " +
        "available since SAP S/4HANA on-premise edition 1511', ובעמודת 'Available alternative transactions " +
        "and reports' מופיע מולה מקף בלבד: SAP אינה נוקבת בטרנזקציה, בדוח או באפליקציית Fiori שמחליפים אותה. " +
        "לכן הסטטוס הוא 'ECC בלבד': הטרנזקציה שייכת לעולם ECC ואינה זמינה ב-S/4HANA On-Premise מאז 1511, " +
        "והפריט עצמו הוא הקריאה המשנית. הסטטוס 'לא זמין ב-S/4HANA' לא נכתב כי כללי השכבה דורשים לו יורש " +
        "מקושר, והמקור הרשמי לא נוקב ביורש; שיוך CL6BN ‏(Object List) ל-CL6O היה המצאה, שכן הפריט מצמיד אותה " +
        "ל-CL6B בלבד. עמוד התפקיד Create Classifications של 2025 FPS01 מונה דוחות רשימת אובייקטים והשוואת " +
        "אובייקטים (CL6BN, CL6B, CL60) בלי לנקוב ב-CL6O.",
      recommendedAction:
        "לפי הפריט: 'No special actions required' בהמרה. במאגר: להתייחס ל-CL6O כטרנזקציית ECC בלבד ולא לתכנן " +
        "עליה תרחישי S/4HANA; לתקן את הכותרת ב-data/tcode-catalog.ts מ-'Object Overview' ל-'Plus-Minus " +
        "Object Display' (סקירת אובייקטים פלוס-מינוס); לסמן בעברית 'ECC בלבד' את שלבי CL6O " +
        "ב-data/troubleshooting.ts ‏(char-batch-classification-missing), ב-data/troubleshooting-ext.ts " +
        "‏(batch-valuation-class-mismatch, כולל צעד המניעה 'Job ל-CL6O') וב-batch-management-process, ולהסיר " +
        "את CL6O משדות alternative ו-similar של CL01, CL02 ו-CL30N ב-tx-intel או לסמנם כהקשר ECC. איזה דוח " +
        "מכסה ב-S/4HANA את צורך תצוגת הפלוס-מינוס דורש אימות במערכת SAP: המקור הרשמי אינו נוקב בחלופה, " +
        "ותיעוד התפקיד מונה רק את CL6BN, CL6B ו-CL60 כדוחות אובייקטים.",
    },
    xrefs: ["tx:CL01", "tx:CL02", "tx:CL03", "tx:CL20N", "tx:CL24N", "tx:CL30N", "tx:CT04", "tx:MSC2N", "tx:MSC3N", "table:MCHA", "table:MCH1", "fm:BAPI_OBJCL_CREATE", "cds:I_Batch", "fiori:F1576", "bp:batch-management-process"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה (2026-09-24): scripts/sap-help-search.mjs בחמש שאילתות בסקופ On-Premise ‏('CL6O object " +
      "overview classification', 'Classification System CA-CL simplification S/4HANA', 'CL6O', 'Activities " +
      "in the Classification System transaction object list', 'Plus-Minus Object Display') ובשתיים בסקופ " +
      "SAP_ERP ‏('CL6O object overview', 'Plus-Minus Object Display'); אף רשומת חיפוש אינה נוקבת ב-CL6O " +
      "בכותרת או בסניפט, והרשומות היחידות של מערכת המחלקות הן שני עמודי התפקיד (Create Classifications, " +
      "loio f786c4535cdeb44ce10000000a174cb4; Display Classification Data, loio " +
      "e9e4e4535dd4414de10000000a174cb4, SAP_CA_CL_DISPLAY), שגופם נקרא במלואו בשני הסקופים דרך " +
      "http.svc/deliverableMetadata ואחריו http.svc/pagecontent; עמוד Display Classification Data ‏(460 " +
      "תווים) מונה 'CL6AN, CL6A, CL30N, CL6BN, CL6B, CL60' בלבד. הרשומה 'Object Overview' של SAP ERP " +
      "‏(PP-PI, loio f104b753128eb44ce10000000a174cb4) עוסקת בסקירת אובייקטים של הזמנות תהליך ואינה קשורה " +
      "ל-CL6O; היא לא צוטטה. שני חיפושי רשת מוגבלי-דומיין החזירו עמודי Support Content של help.sap.com " +
      "(CL6BN, CL6AN, CT04, CL30N); העמוד CL6BN ‏(3363507276) נשלף כמעטפת בלי גוף, וסיכום מנוע החיפוש שקרא " +
      "ל-CL6O 'Object Comparison' בלבל אותה עם CL60 ולא שימש מקור. רשימות הפישוט: SIMPL_OP2025.pdf ‏(1,514 " +
      "עמודים, md5 c1ccf8ebcd92d51fdc80e4b4873f3b73) ו-SIMPL_OP2023.pdf ‏(1,482 עמודים, md5 " +
      "909c6e9087b009e809c116d3c6cf2eec), זהים לרשום ב-audit/master-completion/simpl-tcode-index.json, " +
      "נקראו בפריסת עמוד (pdftotext -layout) בעמודים 927 עד 929 ו-674 עד 678; ברשימת 2025 טבלת הפריט " +
      "מחולצת כעמודות שבורות ולכן ההתאמה CL6O ↔ מקף נקראת לפי סדר השורות (שלושה מקפים אחרי CL6BN מול CL6D, " +
      "CL6M, CL6O), וברשימת 2023 השורה מודפסת שלמה. מדריך ההמרה CONV_OP2025.pdf ו-What's New 2025 FPS01 " +
      "ו-2021 (WN_OP2025_FPS01_EN.pdf, WN_OP2021_EN.pdf) אינם מזכירים CL6O. עמדת ECC: לא נמצא עמוד רשמי " +
      "בסקופ SAP ERP הנוקב ב-CL6O (עמודי התפקיד זהים בשני הסקופים ואינם מונים אותה); קיומה לפני S/4HANA " +
      "נשען על נוסח הפריט 'not available since SAP S/4HANA on-premise edition 1511' ועל רישום המאגר, ודורש " +
      "אימות במערכת ECC ‏(SE93). מזהה Fiori: אין; הפריט ועמודי התפקיד אינם מזכירים אפליקציה. בחירת הטוקן: " +
      "'not_available' דורש בכללי השכבה יורש מקושר ו-SAP לא נוקבת ביורש, 'simplified' היה ממעיט (הפריט " +
      "מסיר את הטרנזקציה, לא רק מזכיר אותה), ולכן 'legacy_ecc_only' עם 'simplified' כקריאה משנית; ה-UI " +
      "מציג legacy_ecc_only כ'הוסרה' בתרשים ה-ERD וכ'superseded' בעמוד הטרנזקציה. מספרי ההערות 2267878 " +
      "ו-2213569 מובאים כפי שהם מודפסים בפריט ולא הוקלדו מהזיכרון; גופן לא נקרא (דורש כניסת S-user). " +
      "accessedAt = תאריך ריצת הכלים בפועל. הרשומה אינה נושאת שדה reviewer: אף רשומה " +
      "ב-data/verification/** אינה נושאת אותו. לא בוצעה בדיקה חיה במערכת SAP: חיבור ה-MCP של sc4sap נכשל " +
      "בתחילת הסשן.",
  },

  /* ----------------------------------------------------- tx:CO54 */
  {
    id: "tx:CO54",
    evidence: [
      CO54_SIMPL_ITEM,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 and SAP S/4HANA Cloud Private " +
          "Edition 2023 - Feature Pack Stack 3 · item 30.18 S4TWL - Process Messages (PP-PI-PMA-MSG)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "אותו פריט ברשימת הפישוט של 2023 FPS3 (פריט 30.18, PP-PI-PMA-MSG, SAP Note 2270231 כפי שהודפס, עמ' " +
          "768-772; גרסת מסמך 1.35 מיום 2025-02-25) נושא את אותה שורת Other Terms: 'Process Management; PI " +
          "Sheet; Transactions CO54, CO54XT' (עמ' 772) ואת אותה קביעת היקף התאימות (עמ' 769; SAP Note 2269324, " +
          "'item ID 455'). נוסח 2023 מנסח את החלופה כך: 'The usage of process messages in conjunction with " +
          "linking process control systems/other external systems is possible using Manufacturing Execution " +
          "Connect (classic). This usage is not part of the compatibility scope', ומביא בעמ' 772 את אותם " +
          "סעיפים המופיעים גם בנוסח 2025 (עמ' 633): 'The listed content of the compatibility scope is not " +
          "further supported after the end of usage rights'; 'The support of ABAP list-based PI Sheets " +
          "(PP-PI-PMA-MGT - control recipe destination type 1 - Transfer to an ABAP list-based PI sheet) has " +
          "already ended. For details, see SAP Note 2268116'; ובסעיף Custom Code Check / Adaption, לאחר מעבר " +
          "מ-PI Sheets מבוססי-דפדפן לפתרון עוקב כגון SAP Digital Manufacturing: 'Check your custom code for " +
          "usage of usage of process messages' (כך במקור), 'Clean up your custom code that makes use of " +
          "process messages', ולוודא שעם תום התמיכה בהיקף התאימות 'no data is saved (insert or update) through " +
          "browser-based PI Sheets/work instructions (PP-SFC) through process messages with any custom code' " +
          "(SAP Note 2268070). גם כאן אין קביעה שהטרנזקציה עצמה הוסרה או הוחלפה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Message Monitoring | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/1dd5bd53e3acb64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש הרשמית (Production Planning and Control, S/4HANA On-Premise 2025 FPS01, תאריך " +
          "2026-02-24, loio 1dd5bd53e3acb64ce10000000a174cb4) מתעדת את מוניטור הודעות התהליך במהדורה הנוכחית: " +
          "'The message monitor is a tool which enables you to display all pr' (הסניפט נקטע כאן), 'To achieve " +
          "truly reliable process management and documentation, it is essential that all created process " +
          "messages reach their destinations', ומונה את תתי-הנושאים 'Sending messages Deleting messages " +
          "Display of Process Message Lists Message Detail Display Process Message Logs Message Processing in " +
          "the Monitor'. הסניפט אינו מדפיס את קוד הטרנזקציה CO54; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Message Monitoring | Process Management (PP-PI-PMA)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/4560a9d24fef480fa127472cca3733b8/1dd5bd53e3acb64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו עמוד (loio 1dd5bd53e3acb64ce10000000a174cb4) קיים גם בתיעוד SAP ERP 6.0 EHP8 (גרסה " +
          "6.18.latest) תחת המדריך Process Management (PP-PI-PMA), עם אותן קביעות: 'The message monitor is a " +
          "tool which enables you to display all pr' ו-'it is essential that all created process messages " +
          "reach their destinations'. זהו בסיס ה-ECC של הטרנזקציה; העמוד אינו אומר דבר על S/4HANA. בחיפוש " +
          "במוצר SAP_ERP ('process message monitor CO54', 21 תוצאות) אף סניפט אינו מדפיס את הקוד CO54; רשומות " +
          "ECC סמוכות מדפיסות קודים אחרים בלבד: 'Process Message Creation' (CO69, CO57) ו-'Accessing ABAP " +
          "List-Based PI Sheets' (CO56, CO58).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות ורשומת הטרנזקציה של הפרויקט - CO54",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת data/transactions.ts: מודול PP-PI, נושא 'אינטגרציית MES', כותרת 'ניטור הודעות תהליך', מטרה " +
          "'עיבוד הודעות תהליך שחזרו מ-MES/רצפה', tables ['AFKO'], funcs ['PPCC1'], שדה fiori ללא ערך, ללא " +
          "בלוק eccS4; data/tcode-catalog.ts: 'Process Messages: Process Message Monitor' / 'מוניטור הודעות " +
          "תהליך' (תחום 'הודעות תהליך'); data/tcode-directory.ts: 'ניטור הודעות תהליך' / 'Process message " +
          "monitor.'. אין רשומת TX_INTEL ואין רשומת lifecycle ל-CO54, ולכן הבונה " +
          "(components/neo-shell/data/tx-detail.ts, buildS4) גוזר disposition 'unknown' ברמת אמון 'needs', " +
          "והאפליקציה מציגה כיום 'נדרש אימות נוסף' עם ההסבר 'לא קיים תיעוד מאומת במאגר' (inferred). " +
          "data/bapi-enrichment.pppi.ts#PPCC1 מסמן את PPCC1 כ-'requires-verification' ('אינו מודול פונקציה; " +
          "מהותו לא אומתה במקור רשמי') ומפנה לניטור ההודעות ב-CO54. הטבלה AFKO שברשומה היא כותרת ההזמנה; " +
          "הרשומה הרשמית של ה-CDS View ‏I_ProcessMessage (Virtual Data Model and CDS Views, 2023.latest) מזהה " +
          "את טבלת הודעות התהליך כ-COMH, שאינה מופיעה ברשומת המאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/transactions.ts#CO54; data/tcode-catalog.ts#CO54; data/tcode-directory.ts#CO54; data/bapi-enrichment.pppi.ts#PPCC1; components/neo-shell/data/tx-detail.ts#buildS4",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: CO54_SIMPL_ITEM,
      he:
        "טרנזקציה CO54 (מוניטור הודעות תהליך, Process Message Monitor, ניהול תהליך PP-PI בתעשיות תהליכיות) " +
        "נזכרת בשמה בפריט הפישוט הרשמי 'S4TWL - Process Messages' (PP-PI-PMA-MSG) ברשימת הפישוט של SAP " +
        "S/4HANA 2025 FPS1 (פריט 9.3.16) וברשימת 2023 FPS3 (פריט 30.18), בשורת Other Terms: 'Transactions " +
        "CO54, CO54XT'. הפריט אינו מסיר ואינו מחליף את הטרנזקציה: הוא קובע ששימוש בהודעות תהליך יחד עם PI " +
        "Sheets מבוססי-דפדפן (PP-PI) והוראות עבודה (PP-SFC) נמצא בהיקף התאימות (compatibility scope) עם " +
        "זכויות שימוש מוגבלות עד תאריך תום רישיון חבילת התאימות (SAP Note 2269324, 'item ID 455', כלשון " +
        "הפריט), בעוד ששימוש בהודעות תהליך יחד עם Manufacturing Execution Connect (classic) או עם Execution " +
        "Sheets אינו חלק מהיקף התאימות. תיעוד S/4HANA On-Premise 2025 FPS01 ממשיך לתעד את מוניטור הודעות " +
        "התהליך (Process Message Monitoring), ורשומות נוספות באותה מהדורה נוקבות בווריאנט CO54XT להוראות " +
        "עבודה ול-Execution Sheets (ראו הערות). לא נמצא מקור רשמי הנוקב ביורש לטרנזקציה או באפליקציית Fiori " +
        "חלופית; הפריט מונה כיכולות מובנות לביצוע ייצור את CORK, COR6N, CORZ ואת אפליקציות התפקיד " +
        "SAP_BR_PRODN_OPTR_PROC, ומפנה ל-SOAP/OData APIs חדשים ול-SAP Digital Manufacturing כחלופות " +
        "לאינטגרציית MES.",
      recommendedAction:
        "להשאיר את CO54 כמסך הניטור, התיקון והשליחה החוזרת של הודעות התהליך ב-S/4HANA On-Premise ולסווגה " +
        "כפריט פישוט, לא כמוצאת משימוש: אין במקור הרשמי יורש או תאריך סיום לטרנזקציה עצמה. בתכנון ההמרה " +
        "למפות את תרחישי השימוש לפי סוג היעד: הודעות תהליך שמקורן ב-PI Sheets מבוססי-דפדפן (סוג יעד 4) " +
        "נמצאות בהיקף התאימות (פריט 455), ולכן לבדוק את תאריך תום זכויות השימוש ב-SAP Note 2269324 ולתכנן " +
        "מעבר ל-Execution Sheets, ל-Manufacturing Execution Connect (classic) או ל-SAP Digital " +
        "Manufacturing; הודעות תהליך מ-MES דרך ממשק PI-PCS (סוגי יעד 2 ו-3) עם MEC (classic) אינן בהיקף " +
        "התאימות. לבצע את בדיקת הקוד המותאם שהפריט דורש (שימוש בהודעות תהליך בקוד לקוח, SAP Note 2268070) " +
        "ולוודא שאין הסתמכות על PI Sheets מבוססי ABAP list, שתמיכתם הסתיימה (SAP Note 2268116). לעדכן את " +
        "רובד הפרויקט: להוסיף רשומת tx-intel ל-CO54 (כיום הבונה גוזר 'לא קיים תיעוד מאומת במאגר'), להסיר את " +
        "ההסתמכות על PPCC1 כשם אובייקט, ולשקול את COMH כטבלת הודעות התהליך לפי רשומת I_ProcessMessage (הטבלה " +
        "אינה ביקום המזהים של הפרויקט).",
    },
    xrefs: ["tx:CO53", "tx:CO55", "tx:CO57", "tx:CO60", "tx:CORK", "tx:COR6N", "tx:CORZ", "tx:COR2", "table:AFKO", "fm:PPCC1"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשאילתות 'CO54 process message monitor', 'Process Message " +
      "Monitor', 'CO54', 'S4TWL Process Messages simplification', 'ANSI/ISA S95 interface process " +
      "messages', 'process messages What's New', 'process messages Fiori app', 'process message PI-PCS " +
      "interface control recipe MES', 'I_ProcessMessage process message CDS view', 'COMH process message " +
      "header table', 'CO54XT', 'Manufacturing Execution Connect classic process messages' " +
      "(SAP_S4HANA_ON-PREMISE, 21 תוצאות כל אחת), 'process message monitor CO54' במוצר SAP_ERP ו-'process " +
      "message monitor' במוצר SAP_S4HANA_CLOUD; חיפוש רשת מוגבל-דומיין על fioriappslibrary / fal.cloud.sap " +
      "/ help.sap.com; והורדת שני קובצי ה-PDF הרשמיים של רשימת הפישוט: SIMPL_OP2025.pdf (10,585,218 בתים, " +
      "1,514 עמודים, Document Version 1.36 כפי שהודפס) ו-SIMPL_OP2023.pdf (10,174,700 בתים, 1,482 עמודים, " +
      "גרסה 1.35 מיום 2025-02-25), עם קריאה מלאה של פריט 9.3.16 (עמ' 630-633) ופריט 30.18 (עמ' 768-772). " +
      "המחרוזת CO54 מופיעה בכל אחד מהקבצים פעם אחת בלבד, בשורת Other Terms של פריט Process Messages (עמ' " +
      "630 ב-2025, עמ' 772 ב-2023); באותה דרך פריט 9.3.17 'S4TWL - Control Recipes/Instructions' (2025, " +
      "עמ' 633) נוקב ב-'CO53, CO53XT' בשורת Other Terms, ליד לרשומת tx:CO53. הליד השני מקובץ התור, פריט " +
      "30.9 'S4TWL - ANSI/ISA S95 Interface' (2023 FPS3, עמ' 751; מקבילו 9.3.3 ב-2025 FPS1, עמ' 608; רכיב " +
      "LO-S95, SAP Note 2268117), נקרא במלואו ואינו נוקב ב-CO54 ולא בשום קוד טרנזקציה; הוא קובע רק 'Usage " +
      "of the ANSI /ISA S95 interface is not possible in S/4HANA. Use MES Integration or the POI Interface " +
      "instead' ו-'Use the POI interface or the MES interface to connect SAP S/4HANA to an MES system or a " +
      "planning system', ולכן אינו ראיה לסטטוס הטרנזקציה. הסטטוס 'פריט פישוט' נבחר על פי התקדים של MD01 " +
      "ו-MD04: מקור רשמי נוקב בטרנזקציה בשמה בפריט פישוט, אך אינו מסמן אותה כמוסרת או מוחלפת, ולכן אין " +
      "יורש ברשומה; היקף התאימות חל על תרחיש השימוש (הודעות תהליך עם PI Sheets מבוססי-דפדפן) ונמסר בהסבר " +
      "ולא כדגל נפרד. רשומות רשמיות נוספות שנראו ולא צורפו כראיות (2025.001 אלא אם צוין אחרת): 'Worklist " +
      "for Execution Sheets' (Production Orders (PP-SFC), loio 79707a5aa5a24ba2b5da5845487b4ed9) שהסניפט " +
      "שלו נוקב ב-'process message monitor transaction CO54XT' וב-'monitor transaction CO53XT'; 'Worklist " +
      "for Work Instructions' (loio 5e00b753128eb44ce10000000a174cb4): 'In the process message monitor " +
      "(transaction CO54XT), you will find notes on errors that have occurred'; 'Browser-Based Process " +
      "Management Applications' (loio 47523da0fdb1450fb2178282ed6b34b2): 'The maintenance transactions for " +
      "browser-based applications like CO60/CO60XT (maintenance of PI sheets/work instructions) cannot be " +
      "called from user interface technologies like the SAP Fiori launchpad' ו-'Execution sheets are new " +
      "browser-based process management applications'; 'Process Management (PP-PI-PMA)' (loio " +
      "c387bf53f106b44ce10000000a174cb4): 'process management comprises the message monitor and the " +
      "control recipe monitor tools'; 'Accessing the Message Monitor' (loio " +
      "2388bf53f106b44ce10000000a174cb4, קיים גם ב-SAP ERP 6.18): 'On the Process Management screen, " +
      "choose Message Message monitor'; 'Carrying Out Separate Goods Issue Posting' (Logistics General, " +
      "loio af26bd534f22b44ce10000000a174cb4): נתיב התפריט 'Logistics Production - Process Process " +
      "Management Message Message Monitor' והמסך 'Process Message Monitor: Initial Screen'; תפקיד PFCG " +
      "'Edit Process Message' SAP_PP_PI_PROC_MESSAGE_EXP (loio 4525bf53d25ab64ce10000000a174cb4, גם ב-SAP " +
      "ERP 6.06): 'You can use this role to call up the process message monitor'; 'Process Message " +
      "Creation' (loio 0c88bf53f106b44ce10000000a174cb4) הנוקב ב-CO69 וב-CO57; רשומת ה-CDS View 'Process " +
      "Message' (Virtual Data Model and CDS Views, 2023.latest, loio cf5b2e1e721c4e4ea7aca9224afd428a): " +
      "'CDS View Name I_ProcessMessage ... helps to select process messages (table COMH)', ו-'CDS Views " +
      "for Production Operations' (What's New in SAP S/4HANA 2022, loio dc636740588c48faba8fe41404025229) " +
      "המסמנת את I_ProcessMessage כחדשה. אף סניפט רשמי של S/4HANA אינו מדפיס את הקוד CO54 לבדו; הקוד מודפס " +
      "רק ב-PDF של רשימת הפישוט, ובסניפטים מודפס הווריאנט CO54XT. חיפוש ספריית ה-Fiori ('process message' " +
      "PP-PI app) החזיר אפליקציות שאינן קשורות (Process Physical Inventory, Monitor Message Flows F1435 " +
      "ועוד), ולכן לא נרשמה חלופת Fiori; חיפוש הענן הציבורי החזיר רק ניטור הודעות AIF ולא את מוניטור " +
      "הודעות התהליך של PP-PI, ולא נטענת מכך מסקנה על מהדורת הענן הציבורי. גופי דפי ה-Help לא נקראו: שירות " +
      "התוכן של הפורטל (http.svc/deliverableMetadata) החזיר 'Invalid input parameter' בכל וריאנט פרמטרים " +
      "שנוסה ב-2026-09-24, ומעטפת הדף (index-_Fe4m-PC.js) אינה מכילה את שמות השירותים; WebFetch מחזיר " +
      "מעטפת ללא גוף. CO54XT, CO69, O13C, COMH, TC50 ו-I_ProcessMessage אינם ביקום המזהים ולכן אינם " +
      "ב-xrefs; fm:PPCC1 נכלל רק כקישור המאגר הקיים, עם הסתייגות רשומת bapi-enrichment. מספרי ה-SAP Notes " +
      "נמסרים רק כפי שהודפסו ב-PDF, בלי קריאת גוף ה-Note (דורש S-user); תאריך תום זכויות השימוש בהיקף " +
      "התאימות אינו ידוע כאן. לא בוצעה בדיקה במערכת SAP חיה (ה-MCP‏ sc4sap לא התחבר: 'MCP error -32000: " +
      "Connection closed'). הרשומה כתובה ללא שדה reviewer, לפי מוסכמת הקבצים ב-data/verification/**. ריצות " +
      "החיפוש וההורדות בוצעו ב-2026-09-24, והוא גם תאריך ה-accessedAt שהוטבע.",
  },

  /* ----------------------------------------------------- tx:CO55 */
  {
    id: "tx:CO55",
    evidence: [
      CO55_SIMPL_ITEM,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (Document Version 1.35) · item " +
          "30.39 S4TWL - Browser-based Process Instruction-Sheets/Electronic Work Instructions " +
          "(PP-PI-PMA-PMC), pp. 823-834; item 30.9 S4TWL - ANSI/ISA S95 Interface (LO-S95), p. 751",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "ברשימת 2023 FPS03 המחרוזת CO55 מופיעה שלוש פעמים, כולן בפריט 30.39: 'CO55 Worklist for Maintaining " +
          "PI Sheets' תחת 'Transactions (no call or clone in custom code)' (עמ' 828), 'RCOPOC_CO55 Worklist " +
          "for Maintaining PI Sheets' תחת 'Programs' (עמ' 830) ו-'Transactions CO55, CO60, CO60E, CO60XT, " +
          "CO64, CO67' ב-'Other Terms' (עמ' 834). נוסח הפריט זהה לפריט 9.3.18 של 2025 FPS01: 'still available " +
          "in SAP S/4HANA. But it is not considered as future technology' (עמ' 823), 'Starting with SAP R/3 " +
          "4.6 C, formerly used ABAP-list based process instruction sheets have been replaced by browser-based " +
          "PI sheets (see SAP Note 397504)' ו-'In SAP S/4HANA, ABAP-list based PI Sheets are no longer " +
          "supported' (עמ' 826-827). פריט 30.9 (LO-S95; SAP Note 2268117 מופיע כלשונו בפריט; עמ' 751) נקרא כפי " +
          "שדרשה ההפניה במאגר: הוא קובע 'Usage of the ANSI /ISA S95 interface is not possible in S/4HANA. Use " +
          "MES Integration or the POI Interface instead' ואינו נוקב באף קוד טרנזקציה, ובכלל זה CO55; ייחוס " +
          "האזכור לפריט 30.9 באינדקס master-completion של הפרויקט הוא שגיאת מיפוי, האזכורים נמצאים בפריט 30.39.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Worklist for Processing PI Sheets | Process Management (PP-PI-PMA)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.0 EHP8 (6.18.latest)",
        url: "https://help.sap.com/docs/SAP_ERP/4560a9d24fef480fa127472cca3733b8/968bbf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "גוף הנושא נקרא במלואו דרך שירות התוכן של הפורטל (deliverable 23795355, build 541) וקובע: 'To call " +
          "up the worklist for maintaining PI sheets, proceed as follows: In the SAP menu, choose Logistics -> " +
          "Production - Process -> Process Management -> PI Sheet -> Worklist - Maintain', עם וריאנט הבחירה " +
          "SAP&PI_WL_WRK, וריאנט התצוגה 0PI_WL_WRK ופרמטר המשתמש PI_VAR_WL_WRK, והפונקציות 'Display PI sheet', " +
          "'Process PI Sheet' ו-'Print as PDF'. הנושא אינו מדפיס את הקוד CO55; הזיהוי של 'Worklist - Maintain' " +
          "עם CO55 נשען על השורה 'CO55 Worklist for Maintaining PI Sheets' ברשימות הפישוט. אותו loio מפורסם " +
          "בנוסח זהה גם במדריך Production Planning and Control של SAP S/4HANA 2025 FPS01 (versionId 2025.001, " +
          "deliverable 40374808, build 1779), כך שהפונקציה מתועדת בשתי המהדורות. נושא ECC נוסף באותו מדריך, " +
          "'Accessing ABAP List-Based PI Sheets' (loio 6789bf53f106b44ce10000000a174cb4, נקרא במלואו), קובע " +
          "'As of Release 4.6C, there are a number of different transactions in the PI Sheet menu that you can " +
          "use to select PI sheets' ומייחד את CO56 ו-CO58 לגיליונות מבוססי ABAP-list בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Browser-Based Process Management Applications | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/47523da0fdb1450fb2178282ed6b34b2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף הנושא נקרא במלואו (deliverable 40374808, build 1779) וקובע: 'SAP GUI for Windows is the only " +
          "technology that provides the required functionality to generate and update the HTML content of the " +
          "mentioned browser-based applications'; 'the browser-based PI sheets, work instructions, and process " +
          "manufacturing cockpits cannot be displayed or maintained with UI technologies like SAP GUI for Java " +
          "or the SAP GUI for HTML. The maintenance transactions for browser-based applications like CO60 / " +
          "CO60XT (maintenance of PI sheets/work instructions) cannot be called from user interface " +
          "technologies like the SAP Fiori launchpad'; ולעומתן 'The maintenance transaction for execution " +
          "sheets (CMX_XSH_OBJ_WORKLIST) can be called from user interface technologies like the SAP Fiori " +
          "launchpad. The SAP Fiori launchpad would open this transaction using SAP GUI for HTML'. העמוד נוקב " +
          "ב-CO60 וב-CO60XT כדוגמאות ולא ב-CO55; המגבלה מנוסחת על כלל יישומי הניהול מבוססי הדפדפן, ש-CO55 " +
          "(רשימת העבודה לתחזוקת גיליונות PI) נמנית עמם לפי רשימת הפישוט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Execution Sheets | What's New in SAP S/4HANA 2023 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/2cd8e1d26dde44db978d2de29a32d4a3.html?locale=en-US&state=PRODUCTION&version=2023.001",
        accessedAt: DATE24,
        claim:
          "גוף הנושא נקרא במלואו דרך שירות התוכן של הפורטל (deliverable 33925102, build 790; רכיב PP-PI-PMA, " +
          "פריטי scope‏ 2UG, 3L7, 3OK, BJ5, BJ8) וקובע: 'Easy migration by exchanging the leading control " +
          "recipe or instruction destinations (destination type = 4) against XStep destinations of (new) " +
          "destination type 'X'', וב-'Effects on Customizing': 'To generate execution sheets, you need to " +
          "maintain new destinations of type X' דרך 'Maintain Destination (transaction CMX_XSH_DEST_SETUP)' " +
          "תחת Production Planning for Process Industries -> Process Management -> Destinations. הנושא אינו " +
          "נוקב ב-CO55 ואינו מגדיר יורש ברמת טרנזקציה; הוא מתעד את נתיב המעבר מגיליונות PI מבוססי דפדפן " +
          "ל-Execution Sheets שהמלצת הפעולה ברשומה זו נשענת עליו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ספריית הקודים וקטלוג הטרנזקציות של הפרויקט - רשומות CO55",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רובד Tier-2 דל וסותר בשם: data/tcode-directory.ts מגדיר את CO55 כ-'PI Sheet' עם התיאור 'Maintain PI " +
          "sheet.' (מודול PP-PI, מילות מפתח 'PI sheet', 'גליון תהליך'), ואילו data/tcode-catalog.ts מכנה אותה " +
          "'Self-Defined Maintenance of Process Messages' (תחום 'הודעות תהליך'), כותרת שאינה תואמת את השם " +
          "ברשימות הפישוט, 'Worklist for Maintaining PI Sheets'. data/troubleshooting-ext2.ts (תרחיש " +
          "pi-sheet-incomplete) ו-data/qa-center.ts משבצים את CO55 לצד CO54, CO60 ו-CO53 בבדיקת גיליון PI " +
          "פתוח. אין רשומת tx-intel, lifecycle או ecc-s4 ל-CO55, ולכן הסטטוס הנגזר שהאפליקציה מציגה הוא 'נדרש " +
          "אימות נוסף' (depth 1).",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-directory.ts#CO55",
      },
    ],
    status: {
      status: "restricted",
      secondary: ["deprecated"],
      edition: "on-premise",
      release: "2025 FPS01",
      source: CO55_SIMPL_ITEM,
      he:
        "טרנזקציה CO55 (Worklist for Maintaining PI Sheets, תוכנית RCOPOC_CO55) היא רשימת העבודה של מפעיל " +
        "התהליך לתחזוקת גיליונות הוראות תהליך (PI Sheets) מבוססי דפדפן בתעשיות תהליכיות (PP-PI-PMA). לפי " +
        "פריט הפישוט 9.3.18 ברשימת SAP S/4HANA 2025 FPS01 הפונקציה 'still available in SAP S/4HANA' אך 'not " +
        "considered as future technology', והיא מוגבלת טכנולוגית: גיליונות PI מבוססי דפדפן רצים רק ב-SAP GUI " +
        "for Windows ולא ב-SAP GUI for HTML או ב-SAP Fiori, ותיעוד 2025 FPS01 קובע שטרנזקציות התחזוקה שלהם " +
        "אינן ניתנות לקריאה מה-Fiori Launchpad. הפריט מונה את CO55 ברשימת הטרנזקציות שאין לקרוא או לשכפל " +
        "בקוד לקוח, מזכיר 'end of support of the compatibility scope item' ומפנה קדימה ל-Execution Sheets " +
        "(מ-S/4HANA 2023; טרנזקציית התחזוקה CMX_XSH_OBJ_WORKLIST לפי תיעוד העזרה) ול-SAP Digital " +
        "Manufacturing בטווח הבינוני והארוך, אך אינו מסמן את CO55 כמוסרת ואינו נוקב ביורש ברמת קוד טרנזקציה. " +
        "לכן הסטטוס הוא 'מוגבל ב-S/4HANA' עם קריאה משנית 'לא אסטרטגי', וללא successor: CMX_XSH_OBJ_WORKLIST " +
        "ו-Execution Sheets אינם רשומות בפרויקט. ב-ECC (SAP ERP 6.0 EHP8) הפונקציה מתועדת באותו נושא עזרה " +
        "('PI Sheet -> Worklist - Maintain'); הרשימה מציינת שגיליונות מבוססי דפדפן החליפו את גיליונות " +
        "ה-ABAP-list החל מ-R/3 4.6C, בעוד CO56 ו-CO58 (ABAP-list) הושבתו ב-S/4HANA.",
      recommendedAction:
        "לשמר את CO55 בתהליך רצפת הייצור של PP-PI רק בתחנות עם SAP GUI for Windows, ולהעריך מעבר ל-Execution " +
        "Sheets (יעדים מסוג X, טרנזקציית ה-IMG CMX_XSH_DEST_SETUP לפי What's New 2023 FPS01) שרצים גם ב-SAP " +
        "GUI for HTML. בהמרה לבצע את בדיקת הקוד שהפריט דורש: אין קריאה או שכפול של CO55 / RCOPOC_CO55 בקוד " +
        "לקוח ואין שמירה ישירה לטבלאות POC_DB_*, ולעבור ל-HTML5 generation mode לפי SAP Notes 3156433 " +
        "ו-3156434 כלשון הפריט. במאגר: לתקן את הכותרת האנגלית של CO55 ב-data/tcode-catalog.ts ('Self-Defined " +
        "Maintenance of Process Messages') לשם 'Worklist for Maintaining PI Sheets', ולתקן את אינדקס " +
        "master-completion שמייחס את האזכור ברשימת 2023 לפריט 30.9 במקום 30.39.",
    },
    xrefs: ["tx:CO60", "tx:CO53", "tx:CO54", "tx:COR2", "tx:C201", "obj:process-order", "obj:master-recipe", "bp:process-order-process", "bp:master-recipe-process", "bp:process-industries-plan-to-produce"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ב-2026-09-24 ('CO55 PI sheet', " +
      "'Maintain PI Sheet browser-based process instruction sheet', 'Execution Sheets browser-based PI " +
      "sheets migration', 'ANSI/ISA S95 interface process management', 'Worklist for PI Sheets " +
      "transactions PI Sheet menu process management', 'self-defined maintenance process messages', " +
      "'Functions in Browser-Based PI Sheets', 'Worklist for Maintaining PI Sheets CO55' ו-'CO55' על " +
      "SAP_S4HANA_ON-PREMISE ועל SAP_ERP), חיפוש רשת מוגבל-דומיין (help.sap.com, api.sap.com, " +
      "fioriappslibrary, fal.cloud.sap), הורדה מחדש של שני קובצי ה-PDF של רשימות הפישוט (2023 FPS03: 1482 " +
      "עמודים, Document Version 1.35; 2025 FPS01: 1514 עמודים, Document Version 1.36) וקריאת גופי נושאים " +
      "דרך שירות התוכן של הפורטל (deliverableMetadata + pagecontent). אף רשומת חיפוש של help.sap.com אינה " +
      "מדפיסה את המחרוזת CO55 בכותרת או בסניפט, בשני המוצרים; זהות הקוד ('Worklist for Maintaining PI " +
      "Sheets', תוכנית RCOPOC_CO55) נשענת על שתי רשימות הפישוט בלבד, ותיעוד העזרה מתאר את הפונקציה בשם " +
      "התפריט 'Worklist - Maintain'. גופים שנקראו במלואם, וכל ציטוט מהם מופיע בטקסט שהוחזר: 'Process " +
      "Instruction Sheets (PI Sheets)' (loio d588bf53f106b44ce10000000a174cb4, 2025.001 וגם 6.18.latest): " +
      "'In SAP S/4HANA, only PI sheets of type Browser-Based PI Sheet can be created and maintained. The " +
      "creation and maintenance of ABAP list-based PI sheets is not possible'; 'Worklist for PI Sheets' " +
      "(loio 0b8bbf53f106b44ce10000000a174cb4, 2025.001): 'The following transactions are available for a " +
      "specific PI sheet selection: Worklist - Maintain, Worklist - Complete, Worklist - Check' ו-'the " +
      "process operator is responsible for maintaining them'; תפקיד 'Maintain PI Sheet' " +
      "SAP_PP_PI_PI_SHEET_EXP (loio 5424bf53d25ab64ce10000000a174cb4, 2025.001): 'You can use this role to " +
      "call up the worklist for maintaining PI sheets'; 'Optical Archiving of PI Sheets and Work " +
      "Instructions' (PP-SFC, loio 1317b753128eb44ce10000000a174cb4, 2025.001) הנוקב ב-'Find PI Sheets " +
      "(CO60)' ו-'Find Work Instructions (CO60XT)'; 'Process Management (PP-PI-PMA)' (loio " +
      "c387bf53f106b44ce10000000a174cb4, 2025.001); ו-What's New 2023 FPS01 'Execution Sheets' (loio " +
      "2cd8e1d26dde44db978d2de29a32d4a3, versionId 2023.001, PP-PI-PMA, scope items 2UG, 3L7, 3OK, BJ5, " +
      "BJ8): 'Easy migration by exchanging the leading control recipe or instruction destinations " +
      "(destination type = 4) against XStep destinations of (new) destination type X' ו-'Maintain " +
      "Destination (transaction CMX_XSH_DEST_SETUP)'. Fiori: חיפוש הרשת המוגבל לספריית האפליקציות לא החזיר " +
      "אפליקציה לגיליונות PI או ל-Execution Sheets, ודפי fal/fioriappslibrary הם מעטפות JS; לכן אין " +
      "secondary 'קיימת חלופת Fiori', ותיעוד 2025 FPS01 אף קובע שטרנזקציות התחזוקה מבוססות הדפדפן אינן " +
      "ניתנות לקריאה מה-Fiori Launchpad. הקודים CO64, CO67, CO60E, CO60XT, CO56, CO58, " +
      "CMX_XSH_OBJ_WORKLIST ו-CMX_XSH_DEST_SETUP אינם קיימים ביקום המזהים של הפרויקט ולכן אינם ב-xrefs " +
      "ואינם successor. ה-BAdIs שהפריט מונה (BADI_CMX_POC_ASYNC_SIGN, BADI_CMX_POC_DYN_SIGN_STRAT, " +
      "BADI_CMX_POC_REASON_VAL_CHG) ונקודות ההרחבה (ES_RCOPOC_WKLT, ES_SSAPLCMX_PII_CP_SRV_DST_PMC) אינם " +
      "ב-data/exits.ts או ב-data/enhancements.ts. ה-MCP המקומי sc4sap לא התחבר בסשן, ולכן לא בוצעה בדיקה " +
      "חיה במערכת SAP: קיום הקוד במערכת CBC, מצב יעדי מרשם הבקרה (סוג 1, 4 או X) ומצב ה-HTML generation " +
      "mode דורשים אימות במערכת SAP. הסטטוס הנגזר שהאפליקציה מציגה היום ל-CO55 הוא 'נדרש אימות נוסף' (אין " +
      "רשומת tx-intel); הרשומה המחברת מכריעה 'מוגבל' על סמך לשון הפריט 'still available' יחד עם מגבלת " +
      "ה-UI, ו'לא אסטרטגי' נשאר קריאה משנית כי אין יורש ברמת טרנזקציה ביקום. תיקונים למאגר שנמדדו היום: " +
      "(1) data/tcode-catalog.ts מכנה את CO55 'Self-Defined Maintenance of Process Messages', כותרת שאין " +
      "לה תימוכין באף מקור רשמי שנבדק, בעוד data/tcode-directory.ts ורשימות הפישוט מתארות תחזוקת גיליון " +
      "PI; (2) audit/master-completion/simpl-tcode-index.json מייחס את אזכור CO55 ברשימת 2023 FPS03 לפריט " +
      "30.9 (S95), בעוד בקובץ ה-PDF שנקרא היום פריט 30.9 משתרע על עמ' 751 בלבד ואינו נוקב באף קוד, ושלושת " +
      "האזכורים נמצאים בפריט 30.39 (עמ' 828, 830, 834); שורת 'Other Terms' נמצאת בסוף הפריט ב-2023 (עמ' " +
      "834) ובתחילתו ב-2025 (עמ' 637). accessedAt = 2026-09-24 לכל המקורות. הערת ביקורת (2026-09-24): " +
      "חיפוש 'Worklist for Processing PI Sheets' על שני המוצרים החזיר גם את הנושא 'PI Sheet Worklist' " +
      "(loio 107aa72e7f404018917a0df251243c62, 2025.001 וגם 6.18.latest) שסניפטו מזכיר תפקיד mid market‏ " +
      "SAP_MMKT_PI_SHFLR_OPR 'to view and maintain PI sheets'; גופו לא נקרא וטכנולוגיית ה-UI שלו לא נבדקה, " +
      "ולכן הקביעה שאין רשימת עבודה חלופית מחוץ ל-SAP GUI for Windows מוגבלת לרשימות הפישוט ולנושא " +
      "'Browser-Based Process Management Applications'.",
  },
  {
    id: "tx:COHVPI",
    evidence: [
      COHVPI_FAL,
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Processing of Process and Production Orders (Production Planning and Control, SAP S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/1b05b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט שהוחזר בחיפוש (scripts/sap-help-search.mjs) על נושא זה, בגרסת S/4HANA 2025 FPS01 (loio " +
          "1b05b753128eb44ce10000000a174cb4), קובע: 'The following documentation on mass processing relates " +
          "to the transactions COHV (Mass Processing Production Orders) and COHVPI (Mass Processing Process " +
          "Orders), which replace the transactions CO28 ...'. כלומר לפי S/4HANA 2025 FPS01, COHVPI היא " +
          "טרנזקציית העיבוד ההמוני לרשומה של הזמנות תהליך, וירשה בעבר את מקום CO28 (יחס היסטורי, ללא ציון " +
          "מועד המעבר).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Processing of Process and Production Orders (Production Planning - Process Industries (PP-PI), SAP ERP 6.0 EHP8)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/698b19fa88b846359bc611f11184c810/1b05b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio (1b05b753128eb44ce10000000a174cb4) מוחזר גם בחיפוש על SAP_ERP, עם אותו סניפט: הנושא " +
          "מתעד את COHV ו-COHVPI כטרנזקציות העיבוד ההמוני, 'which replace the transactions CO28...', כלומר " +
          "הסניפט של הנושא זהה בשני המוצרים (אותו loio); גוף הנושא לא נקרא, ולכן ההשוואה מוגבלת לסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "S4TWL - Selection by characteristics in mass processing of orders (SAP S/4HANA 2025 FPS01 Simplification List, item 13.12.6; זהה ל-2023 FPS03, item 52.6)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (רכיב IS-MP-PP, מפנה ל-SAP Note 2381891 בשדה Related Notes) קובע במפורש: 'As of SAP S/4HANA 1610, the feature " +
          "selection by characteristics in mill specific transaction /SAPMP/PP_COHV is merged into " +
          "transactions for Mass processing of Production orders (COHV) and Mass Processing of Process " +
          "Orders (COHVPI)', ומוסיף: 'Customers using transaction /SAPMP/PP_COHV in the past now need to " +
          "shift to transaction COHV and/or COHVPI instead. Please refer SAP note 2358159.' כלומר הפריט אינו " +
          "מסמן את COHVPI כמוסרת, משתנה מבנית או מוגבלת: הוא קובע ש-COHVPI (יחד עם COHV) היא יעד ההעברה " +
          "עבור משתמשי הטרנזקציה הספציפית לתעשיית המתכת/נייר /SAPMP/PP_COHV, ושהיכולת שלה לבחירה לפי מאפיינים " +
          "(characteristics) כבר משולבת בה מאז S/4HANA 1610. הרלוונטיות מותנית בהפעלת Business Function " +
          "DIMP_SDUD (Discrete Indus. - Mill Products), הנבדקת בפועל רק דרך SFW_BROWSER במערכת חיה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: COHVPI_FAL,
      he:
        "COHVPI (Mass Processing: Process Orders, מודול PP-PI, רכיב PP-PI-POR) היא טרנזקציית SAP GUI קיימת " +
        "וזמינה ב-SAP S/4HANA 2025 FPS01 לפי ספריית אפליקציות ה-Fiori, שמראה זמינות רציפה מ-S/4HANA 1610 " +
        "ועד 2025 FPS01 ללא יורש (successor) וללא קודם (predecessor) רשומים. נושא העזרה 'Mass Processing of " +
        "Process and Production Orders' מוחזר באותו loio ובאותו סניפט הן ב-SAP ERP 6.0 EHP8 והן ב-SAP S/4HANA 2025 FPS01, " +
        "ומגדיר את COHV ו-COHVPI כטרנזקציות העיבוד ההמוני להזמנות ייצור ותהליך בהתאמה. פריט הפישוט 13.12.6 " +
        "(זהה ל-52.6 ב-2023 FPS03) מוסיף רק שמאז S/4HANA 1610 שולבה ב-COHVPI (וב-COHV) גם יכולת הבחירה לפי " +
        "מאפיינים (characteristics) שהייתה בעבר ייחודית לטרנזקציית התעשייה הספציפית /SAPMP/PP_COHV (Mill " +
        "Products), ושמשתמשי אותה טרנזקציה עוברים ל-COHV/COHVPI; הפריט אינו קובע ל-COHVPI עצמה שינוי, הגבלה " +
        "או הוצאה משימוש.",
      recommendedAction:
        "להמשיך להשתמש ב-COHVPI כטרנזקציית SAP GUI לעיבוד המוני של הזמנות תהליך; ספריית ה-Fiori אינה מפרטת " +
        "אפליקציית Fiori חלופית עבורה (predecessors/successors ריקים ברשומה שנקראה). לקוחות שהשתמשו בעבר " +
        "בטרנזקציית התעשייה הספציפית /SAPMP/PP_COHV (רלוונטי רק אם Business Function DIMP_SDUD פעילה) " +
        "נדרשים לעבור ל-COHV ו/או COHVPI, לפי SAP Note 2358159 (לא נקרא כאן, מוזכר בפריט הפישוט בלבד).",
    },
    xrefs: ["tx:COHV", "tx:COR1", "tx:COR2", "tx:COR3", "table:AUFK", "table:AFKO", "table:AFPO", "obj:process-order"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) נבדק המאגר - COHVPI מופיעה ב-data/tcode-catalog.ts (מודול PP-PI, תחום 'הזמנות תהליך') " +
      "וכ-xref קיים בשתי רשומות אימות אחרות (COR2, COR3); אין לה רשומת tx-detail, function-intel או " +
      "verification קודמת משלה, ולכן הסטטוס הנגזר שהאפליקציה הציגה עד כה היה 'נדרש אימות נוסף'. (2) שלוש " +
      "שאילתות ב-scripts/sap-help-search.mjs: 'COHVPI Mass Processing Process Orders' (S/4HANA On-Premise, " +
      "21 תוצאות), 'Mass Processing of Process Orders COHVPI' (SAP_ERP, 21 תוצאות) ו-'Mass Processing of " +
      "Manufacturing Orders with Characteristic Selection' (עלה כתוצאה בחיפוש הראשון). לא נקרא גוף נושא " +
      "דרך scripts/sap-help-body.mjs: הסניפטים ששתי החיפושים החזירו (זהים ב-loio, שונים בגרסה) הספיקו לביסוס " +
      "הטענות. (3) scripts/fal-app.mjs COHVPI --release S32OP הוחזר במלואו (ראו evidence[0]); " +
      "scripts/fal-app.mjs --tcode COHVPI אישש שהיא מופיעה כ-'leading app' תחת אותו App ID. לא בוצע WebSearch. " +
      "פריט הפישוט 52.6/13.12.6 הוא ליד (lead) שמוזכר בהינט המשימה; נקרא במלואו משני קובצי ה-PDF המקומיים " +
      "(scratchpad/official/SIMPL_OP2023.pdf.txt שורה 61014, scratchpad/official/SIMPL_OP2025.pdf.txt שורה " +
      "69185) ונקבע במפורש שהוא עוסק במיזוג יכולת מ-/SAPMP/PP_COHV אל COHV/COHVPI, ולא בשינוי, הגבלה או " +
      "הסרה של COHVPI עצמה; לכן status.source מצביע על ראיית ה-Fiori Library (evidence[0]) ולא על פריט " +
      "הפישוט, ופריט הפישוט משמש כ-evidence תומך בלבד. SAP Note 2358159 (מוזכר בפריט הפישוט כהפניה למעבר " +
      "ממש /SAPMP/PP_COHV) לא נקרא: אינו זמין דרך help.sap.com search/body. אין הבחנה בפריט הפישוט לגבי " +
      "Public Cloud; COHVPI לא נבדקה בטווח S/4HANA Cloud. ה-MCP המקומי sc4sap לא התחבר בסשן, ולכן לא בוצעה " +
      "בדיקה חיה במערכת SAP: קיום/הרשאות COHVPI במערכת CBC, הפעלת Business Function DIMP_SDUD, ותהליך עבודה " +
      "בפועל דורשים אימות במערכת SAP חיה.",
  },
  /* ----------------------------------------------------- tx:CO60 */
  {
    id: "tx:CO60",
    evidence: [
      CO60_SIMPL_ITEM,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (Document Version 1.35) · item 30.39 " +
          "S4TWL - Browser-based Process Instruction-Sheets/Electronic Work Instructions (PP-PI-PMA-PMC), pp. " +
          "823-834; item 30.9 S4TWL - ANSI/ISA S95 Interface (LO-S95), p. 751",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "ברשימת 2023 FPS03 המחרוזת CO60 מופיעה באותו פריט המקביל ל-9.3.18 (30.39): 'CO60 Find PI Sheet' תחת " +
          "'Transactions (no call or clone in custom code)' (עמ' 828) וב-'Other Terms': 'Packages COPOC, " +
          "CMX_POC, CMX_PII, Transactions CO55, CO60, CO60E, CO60XT, CO64, CO67' (עמ' 834), בנוסח זהה לפריט " +
          "9.3.18 של 2025 FPS01: 'still available in SAP S/4HANA. But it is not considered as future " +
          "technology' (עמ' 823). פריט 30.9 (LO-S95; SAP Note 2268117 מופיע כלשונו בפריט; עמ' 751; מקבילו " +
          "ב-2025 FPS01 הוא פריט 9.3.3, עמ' 608) נקרא כפי שדרש הרמז במשימה, וקובע רק 'Usage of the ANSI /ISA " +
          "S95 interface is not possible in S/4HANA. Use MES Integration or the POI Interface instead'; הוא " +
          "אינו נוקב באף קוד טרנזקציה, ובכלל זה CO60. פריט 30.9/9.3.3 הוא אזכור בלבד (mention) ואינו פוסק דבר " +
          "לגבי CO60; הפסיקה על CO60 נשענת אך ורק על פריט 30.39/9.3.18.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Browser-Based Process Management Applications | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/47523da0fdb1450fb2178282ed6b34b2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף הנושא נקרא במלואו דרך שירות התוכן של הפורטל (deliverable 40374808, build 1779) וקובע: 'the " +
          "browser-based PI sheets, work instructions, and process manufacturing cockpits cannot be displayed " +
          "or maintained with UI technologies like SAP GUI for Java or the SAP GUI for HTML. The maintenance " +
          "transactions for browser-based applications like CO60 / CO60XT (maintenance of PI sheets/work " +
          "instructions) cannot be called from user interface technologies like the SAP Fiori launchpad. The " +
          "SAP Fiori launchpad would open these transactions using SAP GUI for HTML'. לעומת זאת: 'The " +
          "maintenance transaction for execution sheets (CMX_XSH_OBJ_WORKLIST) can be called from user " +
          "interface technologies like the SAP Fiori launchpad'. העמוד נוקב ב-CO60 במפורש כדוגמה לטרנזקציית " +
          "תחזוקה מבוססת דפדפן שאינה קריאה מה-Fiori launchpad; הוא אינו קובע שהטרנזקציה הוסרה ואינו נוקב ביורש " +
          "Fiori ל-CO60 עצמה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "ספריית הקודים וקטלוג הטרנזקציות של הפרויקט - רשומות CO60",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tcode-directory.ts מגדיר את CO60 כ-'מרשם בקרה' (מודול PP-PI, תיאור 'Find/maintain control " +
          "recipe.', מילת מפתח 'control recipe'), ואילו data/tcode-catalog.ts נותן לה שם אנגלי 'Find PI Sheet' " +
          "('חיפוש גיליון PI', תחום 'גיליונות PI'). data/troubleshooting-ext2.ts (תרחיש pi-sheet-incomplete) " +
          "ו-data/best-practices/pppi-processes.ts משבצים את CO60 לצד CO53 (הצגת מרשם) ו-CO54 (הודעות תהליך) " +
          "כטרנזקציית עיבוד גיליון PI. אין רשומת tx-intel, lifecycle או ecc-s4 ל-CO60, ולכן הסטטוס הנגזר " +
          "שהאפליקציה מציגה כרגע הוא 'נדרש אימות נוסף' (depth 1).",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-directory.ts#CO60",
      },
    ],
    status: {
      status: "restricted",
      secondary: ["deprecated"],
      edition: "on-premise",
      release: "2025 FPS01",
      source: CO60_SIMPL_ITEM,
      he:
        "טרנזקציה CO60 (Find PI Sheet, מרשם בקרה/חיפוש גיליון PI מבוסס דפדפן, PP-PI-PMA-PMC) פועלת ב-S/4HANA " +
        "לפי פריט הפישוט 9.3.18 (2025 FPS01) ו-30.39 (2023 FPS03), אך שתיהן מגדירות אותה 'still available... " +
        "but not considered as future technology' וברשימת הטרנזקציות שאין לקרוא או לשכפל בקוד לקוח, בהיקף " +
        "התאימות (compatibility scope). גיליונות PI מבוססי דפדפן, וכך גם CO60, רצים רק ב-SAP GUI for Windows " +
        "ואינם ניתנים לפתיחה מה-Fiori launchpad, לפי תיעוד העזרה שנקרא. הפריטים אינם מכריזים על הסרת CO60 " +
        "ואינם נוקבים ביורש ברמת קוד טרנזקציה; ההפניה קדימה היא ל-Execution Sheets (מ-S/4HANA 2023, טרנזקציית " +
        "התחזוקה CMX_XSH_OBJ_WORKLIST לפי אותו תיעוד עזרה) ול-SAP Digital Manufacturing בטווח הבינוני-ארוך, " +
        "אך אף אחד מהם אינו רשום בפרויקט ולכן אינו יכול לשמש successor מאומת.",
      recommendedAction:
        "לשמר את השימוש ב-CO60 רק בתחנות עם SAP GUI for Windows, ולהעריך מעבר ל-Execution Sheets (יעדי XStep " +
        "מסוג X) שנתמכים גם ב-SAP GUI for HTML ופתוחים מה-Fiori launchpad. בהמרה לבצע את בדיקת הקוד שהפריט " +
        "9.3.18/30.39 דורש: לוודא שאין קריאה או שכפול של CO60/RCOPOC_CO60E בקוד לקוח ואין שמירה ישירה לטבלאות " +
        "POC_DB_* של גיליונות PI מבוססי דפדפן.",
    },
    xrefs: ["tx:CO55", "tx:CO53", "tx:CO54", "tx:COR2", "tx:C201", "obj:process-order", "obj:master-recipe", "bp:process-order-process", "bp:master-recipe-process", "bp:process-industries-plan-to-produce"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: node scripts/sap-help-search.mjs עם השאילתות 'CO60 Find PI Sheet' (SAP_S4HANA_ON-PREMISE) " +
      "ו-'Find PI Sheet transaction CO60' (--product SAP_ERP) ב-2026-09-24, קריאת גוף שני נושאים דרך " +
      "scripts/sap-help-body.mjs ('MiniApp: Worklist for PI Sheets' ו-'Browser-Based Process Management " +
      "Applications'), node scripts/fal-app.mjs --tcode CO60 (התוצאה: 'leading app(s): none' ב-S32OP, כלומר " +
      "אין אפליקציית Fiori שמובילה מ-CO60), וקריאה מקומית מלאה של שני קובצי רשימת הפישוט " +
      "(SIMPL_OP2025.pdf.txt, SIMPL_OP2023.pdf.txt ב-scratchpad/official/) לאיתור כל מופעי המחרוזת CO60 " +
      "בהקשרן. הפריט 30.9/9.3.3 (ANSI/ISA S95) הוא רק אזכור ברמז המשימה ואינו נוקב ב-CO60 כלל; אין לו נפקות " +
      "סטטוס. לא נמצאה אפליקציית Fiori חלופית רשמית ל-CO60 (successor נשאר לא מאומת: CMX_XSH_OBJ_WORKLIST " +
      "ו-Execution Sheets אינם רשומים בפרויקט). לא בוצעה בדיקה במערכת SAP חיה. ביקורת נגדית 2026-09-24: " +
      "שלוש כתובות ה-URL נבדקו (HTTP 200, help.sap.com), רשומת החיפוש (loio " +
      "47523da0fdb1450fb2178282ed6b34b2, versionId 2025.001) וגוף הנושא אומתו מחדש, fal-app --tcode CO60 " +
      "החזיר none, עמודי הפריטים ברשימות הפישוט אומתו מול הטקסט המקומי (9.3.18 עמ' 636-644, 30.39 עמ' " +
      "823-834, 30.9 עמ' 751, 9.3.3 עמ' 608).",
  },
  /* ----------------------------------------------------- tx:COPC */
  {
    id: "tx:COPC",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1, item 6.7.7 'S4TWL - Electronic " +
          "Payment Integration for China'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (רכיב XX-CSC-CN-EPIC, הערה 3087756) עוסק ב'Cash Operations for China (COPC)': פתרון ניהול " +
          "מזומנים סיני שיצא משלב הפיתוח והוצא משימוש (deprecated) החל מ-S/4HANA 2023, ומוחלף ב-Cash and " +
          "Liquidity Management (FIN-FSCM-CLM). ה-'COPC' כאן הוא ראשי תיבות של פונקציית פיננסים, לא הטרנזקציה " +
          "tx:COPC; הפריט אינו נוקב בטרנזקציה COPC ואינו עוסק ב-PP-PI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of Cash Operations for China (COPC)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/851e53f518ef4c6482d3cf9c43ab4495.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE24,
        claim:
          "נושא העזרה (S/4HANA 2023, רכיב FI-LOC-EPI-CN) קובע ש-Cash Operations for China (COPC) הוצא משימוש " +
          "(Deprecated, Valid as Of SAP S/4HANA 2023) ושהפונקציות שלו הוחלפו ב-Cash and Liquidity Management " +
          "(FIN-FSCM-CLM). מדובר בפתרון פיננסי לסין, לא בטרנזקציה tx:COPC של PP-PI; הנושא אינו נוקב בקוד " +
          "טרנזקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1, item 9.5.18 'S4TWL - Production " +
          "Campaign (ERP)'",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "פריט זה (רכיב PP-PI-PCM, הערה 2270216) עוסק בפונקציונליות Production Campaign, שנשארת בטווח התאימות " +
          "(compatibility scope) עם הטרנזקציות CPCN, PCA1, PCA2, PCA3, PCCO ('Backend transactions CPCN, PCA1, " +
          "PCA2, PCA3 and PCCO are still available'), ומ-S/4HANA 2023 זמין פתרון מותאם דרך אפליקציית Fiori " +
          "'Manage Production Campaign' (F7260), שאיתו הפונקציונליות הופכת לחלק מהטווח הקבוע (perpetual scope). " +
          "שדה 'Other Terms' מציין 'Package COPC; Transactions CPCN, PCA1, PCA2, PCA3, PCCO', כלומר COPC כאן " +
          "הוא שם חבילת פיתוח (development package) המכילה את חמש הטרנזקציות שצוינו, לא הטרנזקציה tx:COPC (PI " +
          "Sheet: Browser); הפריט אינו נוקב ב-COPC כקוד טרנזקציה ואינו קובע לגביה מאום.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Browser-Based Process Management Applications",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/47523da0fdb1450fb2178282ed6b34b2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הנושא (אותו loio 47523da0 מופיע גם במוצר SAP ERP, versionId 6.18.latest, לפי " +
          "scripts/sap-help-search.mjs --product SAP_ERP) מתאר את משפחת האפליקציות מבוססות הדפדפן (גיליונות PI, " +
          "הוראות עבודה, לוחות בקרת מפעיל תהליך): הן רצות רק ב-SAP GUI for Windows, ו'The maintenance " +
          "transactions for browser-based applications like CO60 / CO60XT (maintenance of PI sheets/work " +
          "instructions) cannot be called from user interface technologies like the SAP Fiori launchpad'. הגוף " +
          "נוקב מפורשות רק ב-CO60 ו-CO60XT כטרנזקציות התחזוקה; אינו מזכיר את COPC בשם, ואינו קובע לגביה סטטוס. " +
          "משמש כאן כהקשר כללי למשפחת גיליונות ה-PI מבוססי הדפדפן שאליה שייכת COPC לפי הקטלוג, לא כמקור לקביעת " +
          "סטטוס.",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#COPC",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "הקטלוג המקומי מגדיר את COPC כמודול PP-PI, שם אנגלי 'PI Sheet: Browser', אזור 'גיליונות PI' (שם עברי " +
          "'דפדפן גיליון PI'); ללא BAPI/IDoc/CDS מקושרים ברישום זה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#COPC",
      },
    ],
    xrefs: ["tx:CO55", "tx:COPI", "tx:CO60"],
    lastVerifiedAt: DATE24,
    notes:
      "COPC הוזכרה כרמז (lead) בשני פריטי פישוט (2023 FPS03: 11.1, 30.9-אינדקס שגוי לפריט 30.16 ולא 30.9; " +
      "2025 FPS01: 6.7.7, 9.5.18), אך שתי הבדיקות (חיפוש ה-JSON וקריאת גוף הנושאים דרך " +
      "scripts/sap-help-search.mjs ו-scripts/sap-help-body.mjs, וקריאת שני קובצי הפישוט המלאים " +
      "ב-scratchpad/official/) מראות ששני האזכורים הם התנגשות שמות: פריט 6.7.7/11.1 עוסק ב-Cash Operations " +
      "for China (ראשי תיבות COPC, תחום פיננסים), ופריט 9.5.18/30.16 מזכיר 'Package COPC' כשם חבילת פיתוח " +
      "המכילה את הטרנזקציות CPCN/PCA1/PCA2/PCA3/PCCO, לא את הטרנזקציה COPC (PI Sheet: Browser) של " +
      "PP-PI-PMA. חיפושים נוספים שרצו (כולם דרך scripts/sap-help-search.mjs, size 12, מוצר " +
      "SAP_S4HANA_ON-PREMISE ו-SAP_ERP): 'COPC transaction PI sheet browser', 'Browser-Based PI Sheets " +
      "transactions COPC', 'PI Sheet Browser selection transaction code', 'Display browser-based PI sheet " +
      "transaction', וחיפוש מדויק '\"COPC\"' בשני המוצרים (21 תוצאות בכל חיפוש) לא החזירו אף רשומה שמדפיסה את " +
      "המחרוזת COPC ככותרת טרנזקציה או בסניפט בהקשר PP-PI; נושאי העזרה של PI Sheets/Worklist מתארים את " +
      "הפונקציות בשמות תפריט ('Worklist - Maintain', 'Display PI sheet', 'Process PI Sheet') ולא בקוד " +
      "טרנזקציה בן ארבע אותיות, כפי שנצפה גם ברשומת tx:CO55. אין רשומת אינדקס simpl-tcode-index.json שגויה " +
      "נוספת שנבדקה מעבר לתיקון פריט 30.9->30.16 (2023). קודי CO69, OPMC, CO56, CO58, CO59, CO60XT " +
      "ו-CMX_XSH_OBJ_WORKLIST אינם ביקום המזהים של הפרויקט ולכן אינם ב-xrefs. ביקורת (2026-09-24): שתי " +
      "ההפניות לפריטי הפישוט הופנו ל-PDF של 2025 FPS01 (הטיוטה הצביעה על קישורי 2023), ונושא העזרה " +
      "'Deprecation of Cash Operations for China (COPC)' (2023.000) נוסף כשורה נפרדת. לא בוצעה בדיקה חיה " +
      "במערכת SAP (ה-MCP המקומי לא זמין בסשן): קיום הטרנזקציה COPC במערכת CBC, תוכנית ה-ABAP שמאחוריה והבדל " +
      "מדויק שלה מול COPI (PI Sheet: Maintain) נשארים לאימות במערכת חיה. accessedAt = 2026-09-24 לכל " +
      "המקורות.",
  },
  /* ----------------------------------------------------- tx:CORZ */
  {
    id: "tx:CORZ",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#CORZ",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "מאגר הפרויקט (data/tcode-catalog.ts) רושם את CORZ במודול PP-PI, אזור 'אישורים', עם השם האנגלי " +
          "Process Order: Time Event Confirmation והשם העברי אישור אירוע זמן להזמנת תהליך; זו רשומת קטלוג בלבד " +
          "ואינה קובעת סטטוס S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CORZ",
      },
      CORZ_FAL,
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches in Production (help.sap.com, Batch Management LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/36ffb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "קטע החיפוש בדף עדכני ל-SAP S/4HANA 2025 FPS01 On-Premise (loio 36ffb753128eb44ce10000000a174cb4, " +
          "versionId 2025.001) מונה בין טרנזקציות האישור להזמנת תהליך את Enter Time Event (CORZ), לצד COR6N, " +
          "CORK, CORS ו-CORT; נקראו רק כותרת וקטע (snippet), גוף הדף לא נשלף.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · items " +
          "9.3.16 'S4TWL - Process Messages' (עמ' 630) ו-9.3.17 'S4TWL - Control Recipes/Instructions' (עמ' " +
          "633); המקבילות ב-2023 FPS03 הן פריטים 30.18 (עמ' 768) ו-30.19 (עמ' 772)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "שני הפריטים קובעים תחת Business Process related information: 'No influence on business processes " +
          "expected as long as you continue to use process messages / control recipes/instructions', ומוסיפים: " +
          "'It is also possible to use the built-in features of SAP S/4HANA for production execution, that is: " +
          "Transactions CORK, COR6N, CORZ; Apps for the production operator role SAP_BR_PRODN_OPTR_PROC' (פריט " +
          "Process Messages מסיים את הרשימה ב-'And so on'; פריט Control Recipes/Instructions מסיים אותה " +
          "ב-SAP_BR_PRODN_OPTR_PROC). הפריטים מזכירים את CORZ כדוגמה לטרנזקציית ליבה זמינה, חלופה לתרחיש " +
          "ה-compatibility scope של process messages/control recipes מול MES חיצוני; אין בהם הצהרה על ביטול, " +
          "שינוי או יורש ל-CORZ עצמה. פריט 30.9 'S4TWL - ANSI/ISA S95 Interface' ב-2023 FPS03 (עמ' 751) נקרא " +
          "במלואו ואינו מזכיר CORZ כלל; שיוך CORZ לפריט 30.9 (כפי שמופיע " +
          "ב-audit/master-completion/simpl-tcode-index.json ובברייף המשימה) אינו נתמך בטקסט הקובץ, ותוקן כאן " +
          "ל-30.18/30.19.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: CORZ_FAL,
      he:
        "CORZ (Confirm Time Event - Process Order Phase) ממשיכה להתקיים כטרנזקציית SAP GUI לאישור אירוע זמן " +
        "להזמנת תהליך גם ב-SAP S/4HANA 2025 FPS01 On-Premise, ללא יורש או אפליקציית Fiori חלופית ברשומת " +
        "ה-Fiori Apps Library; שני פריטי הפישוט מזכירים אותה כדוגמה לחלופה מובנית מול תרחיש MES מבוסס process " +
        "messages/control recipes, לא כטרנזקציה שהשתנתה או שיש לה יורש.",
      recommendedAction:
        "אין צורך בפעולת הסבה: להמשיך להשתמש ב-CORZ לאישור אירועי זמן להזמנת תהליך; ברשומת ה-Fiori Apps " +
        "Library אין יורש רשום, וברשימות הפישוט 2023 FPS03 ו-2025 FPS01 אין הכרזה על ביטול או שינוי לטרנזקציה " +
        "עצמה.",
    },
    xrefs: ["tx:CORK", "tx:COR6N", "tx:CORS", "tx:CORT", "table:AFRU"],
    lastVerifiedAt: DATE24,
    notes:
      "חיפושים שהורצו: sap-help-search.mjs \"CORZ\" (--product ברירת מחדל S/4HANA On-Premise, 21 תוצאות), " +
      "\"Process Order Time Event Confirmation\" (S/4HANA On-Premise, 21 תוצאות), \"CORZ time event " +
      "confirmation\" (--product SAP_ERP, 21 תוצאות, מאמת שהתיאור זהה גם בצד ECC 6.18.latest); fal-app.mjs " +
      "--tcode CORZ ו-fal-app.mjs CORZ --release S32OP (רשומת האפליקציה המלאה). לא הורץ גוף דף עם " +
      "sap-help-body.mjs מכיוון שהכותרות והקטעים הספיקו לביסוס הטענות; לא בוצע WebSearch. לא בוצעה בדיקה " +
      "חיה במערכת SAP (ה-MCP המקומי sc4sap לא זמין בסשן זה): קיום הקוד במערכת CBC בפועל, הרשאות תפקיד " +
      "SAP_BR_PRODN_OPTR_PROC וזמינות בפועל דורשים אימות במערכת חיה. תוקנה בזאת טעות שיוך בין " +
      "הברייף/האינדקס לבין תוכן ה-PDF: פריט 30.9 (S95 Interface) ב-2023 FPS03 אינו מכיל את המחרוזת CORZ; " +
      "המחרוזת מופיעה בפועל בפריטים 30.18 ו-30.19 (Process Messages / Control Recipes-Instructions, כותרות " +
      "בקובץ הטקסט '30.18S4TWL' / '30.19S4TWL' ללא רווח אחרי המספר, שורות 40486 ו-40626), המקבילים " +
      "ל-9.3.16/9.3.17 ב-2025 FPS01. ביקורת עצמאית (2026-09-24) אישרה מחדש: כתובות URL נפתחות, רשומת ה-FAL " +
      "ב-S32OP תואמת מילה במילה, רשומת החיפוש (loio/versionId/snippet) קיימת, כל ה-xrefs קיימים " +
      "ב-route-manifest.",
  },
  /* ----------------------------------------------------- tx:CPC1 */
  {
    id: "tx:CPC1",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#CPC1",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tcode-catalog.ts רושם את CPC1 במודול PP-PI, אזור 'נתוני תהליך', עם השם העברי 'תיעוד נתוני " +
          "תהליך: מסמכים' והשם האנגלי 'Process Data Documentation: Documents'. זו רשומת קטלוג בלבד וללא תימוכין " +
          "ממקור רשמי שנבדק היום.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CPC1",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 12.11 S4TWL - ACTIVITY-BASED " +
          "COSTING (CO-OM-ABC), p. 361",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (פריט 12.11, רכיב יישום CO-OM-ABC, עמ' 361) קובע לגבי משפחת טרנזקציות תחזוקת המחזורים (cycles) " +
          "ל-Indirect Activity Allocation את הציטוט: 'The same applies to the transactions to maintain cycles " +
          "so CPV1-3 are covered by KSV1-3, CPP1-3 by KSU1-3 and CPC1-3 by KSC1-3'. כלומר CPC1 בפריט זה הוא " +
          "טרנזקציה לתחזוקת מחזור (cycle) של הקצאת פעילות עקיפה במודול CO-OM-ABC (Activity-Based Costing), ולא " +
          "הטרנזקציה שהמאגר מייחס ל-PP-PI. הפריט נקרא במלואו בטקסט המקומי ואינו נוקב בשם 'Process Data " +
          "Documentation' או במודול PP-PI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.5.2 S4TWL - ACTIVITY-BASED " +
          "COSTING (CO-OM-ABC), pp. 320-323",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (מתחיל בעמ' 320, רכיב יישום CO-OM-ABC; המשפט המצוטט בעמ' 322-323) חוזר על אותו ציטוט מילה " +
          "במילה: 'CPC1-3 by KSC1-3', באותו הקשר של תחזוקת מחזורי הקצאת פעילות עקיפה ל-Activity-Based Costing. " +
          "הפריט נקרא במלואו בטקסט המקומי ואין בו אזכור ל-PP-PI, ל-'Process Data Documentation' או " +
          "למסמכים/ארכיון אופטי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Data Documentation",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/098abf53f106b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "נושא העזרה (deliverable 'Production Planning and Control', loio 098abf53f106b44ce10000000a174cb4) " +
          "מאשר ש-'Process Data Documentation' הוא רכיב של PP-PI. הגוף נקרא במלואו דרך שירות התוכן: ארכוב Order " +
          "records ו-Batch records בארכיון אופטי, עם קישור לנושא 'Optical Archiving of Batch Records'. הגוף " +
          "אינו מדפיס שום קוד טרנזקציה לפונקציה הזאת; מסלול גישה או שם טרנזקציה אינם מוזכרים.",
        verificationLevel: "supported_secondary_source",
      },
    ],
    status: {
      status: "verification_required",
      edition: "on-premise",
      release: null,
      source: null,
      he:
        "הקוד CPC1 מודפס במקורות הרשמיים שנבדקו כטרנזקציית CO-OM-ABC לתחזוקת מחזור הקצאת פעילות עקיפה, בעוד " +
        "המאגר משייך אותו ל-PP-PI (תיעוד נתוני תהליך: מסמכים). שום מקור רשמי שנבדק אינו קושר את הקוד " +
        "לפונקציית PP-PI-PDO, ולכן מעמד הרשומה כפי שהמאגר מגדיר אותה דורש אימות.",
      recommendedAction:
        "לאמת במערכת SAP חיה (SE93 או הפעלת הקוד) איזו פונקציה נפתחת תחת CPC1 ולתקן את " +
        "data/tcode-catalog.ts#CPC1 בהתאם; אם הקוד הוא טרנזקציית CO, לבחון את פריט 'S4TWL - ACTIVITY-BASED " +
        "COSTING' ואת KSC1 כטרנזקציה המכסה.",
    },
    xrefs: [],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. הממצא המרכזי: שני פריטי הפישוט שמזכירים 'CPC1' (2023 FPS03 פריט " +
      "12.11, 2025 FPS01 פריט 6.5.2, שניהם 'S4TWL - ACTIVITY-BASED COSTING', רכיב יישום CO-OM-ABC) עוסקים " +
      "בטקסט זהה בטרנזקציית תחזוקת מחזור הקצאת פעילות עקיפה ב-CO-OM-ABC (Activity-Based Costing): CPC1-3 " +
      "מכוסות לפי הפריט ב-KSC1-3, ו-CPC5 מוחלפת ב-KSC5 (הפריטים אינם מזכירים CPC7-9/CPCB). חיפוש עצמאי נוסף " +
      "('CPC1' בהיקף SAP_S4HANA_ON-PREMISE ובהיקף SAP_ERP, 21 תוצאות בכל אחד) מאשר זאת: נושא 'Controlling " +
      "and Project System' (loio a4e7cc53a8b77214e10000000a174cb4, אותו loio ב-SAP_ERP 6.18.latest " +
      "וב-2025.001) מפרט בגוף גרסת 2025.001 'Indirect activity allocation (transactions KSC1, KSC2, KSC3, " +
      "KSC5, CPC1, CPC2, CPC3, CPC5, ...)', כלומר הפונקציה רשומה גם ב-ECC וגם ב-S/4HANA On-Premise ללא " +
      "סימון הסרה בנושא זה. לא נמצא אף מקור רשמי (לא בפריטי הפישוט, לא בנושא 'Process Data Documentation', " +
      "לא בחיפוש 'Process Data Documentation CPC1', 21 תוצאות ללא נושא PDO הנוקב בקוד) שמקשר את הקוד CPC1 " +
      "לפונקציה PP-PI-PDO 'Process Data Documentation: Documents' שהמאגר רושם. לכן זו נראית התנגשות מזהה " +
      "(code collision) בין רשומת הקטלוג של הפרויקט לבין מה שכל מקור רשמי שנבדק מתאר תחת הקוד CPC1: אין " +
      "ביסוס רשמי לכך שה-CPC1 שבפרויקט (PP-PI) הוא אותה טרנזקציה שהפריטים דנים בה (CO-OM-ABC), ולכן שני " +
      "הפריטים אינם פוסקים לגבי הקוד כפי שהמאגר מגדיר אותו, וה-status נקבע verification_required. לא נקבע " +
      "successor: KSC1 מתועד כמכסה רק ביחס לפונקציית ה-CO, לא ביחס לרשומת ה-PP-PI של הפרויקט, ו-KSC1 אינו " +
      "קיים ביקום המזהים (lib/route-manifest.generated.ts) ולכן לא יכול לשמש xref או successor בכל מקרה. " +
      "xrefs הושאר ריק: לא אותר קוד טרנזקציה, טבלה, BAPI או אובייקט רשום שקשור ישירות לפונקציית ה-PDO " +
      "הספציפית הזו ביקום המזהים של הפרויקט. תיקון מומלץ למאגר (לא בוצע כאן, מחוץ לתפקיד המחקר): לבדוק מחדש " +
      "את מקור הנתונים של data/tcode-catalog.ts#CPC1, ואם אין מקור רשמי התומך בשיוך PP-PI, לסמן 'דורש " +
      "אימות' או לתקן את הרשומה. הערת ביקורת: audit/master-completion/simpl-tcode-index.json משייך את שורת " +
      "ה-CPC1 של 2023 לפריט 12.9 'S4TWL - TECHNICAL CHANGES IN CONTROLLING' בטעות (הכותרת 12.11 מודפסת " +
      "בטקסט ללא רווח, '12.11S4TWL'); הפריט הנכון הוא 12.11.",
  },

  /* ----------------------------------------------------- tx:CK11N */
  {
    id: "tx:CK11N",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#CK11N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "מאגר הפרויקט (data/tcode-catalog.ts) רושם את CK11N במודול CO, אזור 'תמחיר מוצר', עם השם העברי 'יצירת " +
          "אומדן עלות חומר עם מבנה כמותי' והשם האנגלי 'Create Material Cost Estimate with Quantity Structure'. זו " +
          "רשומת קטלוג בלבד ואינה קובעת סטטוס S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CK11N",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Cost Estimate with Quantity Structure (help.sap.com, Controlling (CO))",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/3395d7531a4d414de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "נושא העזרה העדכני ל-SAP S/4HANA 2025 FPS01 On-Premise (loio 3395d7531a4d414de10000000a174cb4, versionId " +
          "2025.001, אותו topic id המודפס גם ברשומת ה-Fiori Apps Library של CK11N כ-docs link) מתאר את המסך 'Create " +
          "Material Cost Estimate with Quantity Structure' ואת הנתיב 'Accounting > Controlling > Product Cost " +
          "Controlling > Product Cost Planning > Material Costing > Cost Estimate with Quantity Structure > Create'; " +
          "נקראו רק כותרת וקטע (snippet), גוף הדף לא נשלף.",
        verificationLevel: "sap_official_verified",
      },
      CK11N_FAL,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 6.5.9 " +
          "S4TWL - Reporting/Analytics in Controlling (Application Component CO-OM-IS), pp. 339-341; טקסט זהה " +
          "בתוכנו לפריט 12.16 (לא 12.9) של Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3, pp. " +
          "372-375",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (רכיב יישום CO-OM-IS; המקביל ב-2023 FPS03 מוסיף גם CO-PA-IS/CO-PC-IS) עוסק בדיווח/אנליטיקה " +
          "ב-Controlling לאחר מעבר ל-Universal Journal, וקובע תחת זמינות טרנזקציות: 'Transaction not available in " +
          "SAP S/4HANA on-premise edition 1511 → All transactions available, but are making use of compatibility " +
          "views'. בסעיף Required and Recommended Action(s) מופיע הציטוט: 'Please ensure that the transactions " +
          "such as CK11N (create standard cost estimate), CO01-CO03 (create/change/display production order) and " +
          "CR01-CR03 (create/change/display process order) are calling ABAP List Views rather than the old Report " +
          "Writer reports. To do this, choose transaction OKN0, select the tab \"Report Selection\" and ensure that " +
          "the flags \"Flexible itemization\", \"Flexible cost component report\" and \"Flexible cost display\" are " +
          "active.' הפריט אינו מכריז על ביטול, שינוי מבני או יורש ל-CK11N עצמה; הוא רק דורש אימות הגדרת דיווח " +
          "(OKN0) בעת ההסבה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: CK11N_FAL,
      he:
        "CK11N (יצירת אומדן עלות חומר עם מבנה כמותי) ממשיכה להתקיים כטרנזקציית SAP GUI פעילה ב-SAP S/4HANA " +
        "On-Premise עד 2025 FPS01 (S32OP) ברשומת ה-Fiori Apps Library, ללא יורש או אפליקציית Fiori חלופית רשומה, " +
        "ונושא העזרה התואם (2025.001) מתאר את אותו מסך ונתיב תפריט ללא שינוי מבני. פריט הפישוט 'Reporting/Analytics " +
        "in Controlling' (זהה בשני המסמכים) מזכיר את CK11N כדוגמה לטרנזקציה שיש לוודא לגביה, ב-OKN0, שהיא מפיקה " +
        "ABAP List Views במקום דוחות Report Writer ישנים; זו דרישת תצורת דיווח בעת ההסבה, לא ביטול או שינוי " +
        "לטרנזקציה עצמה.",
      recommendedAction:
        "להמשיך להשתמש ב-CK11N ליצירת אומדני עלות חומר עם מבנה כמותי; בעת פרויקט הסבה לוודא ב-OKN0 (לשונית Report " +
        "Selection) שהדגלים Flexible itemization, Flexible cost component report ו-Flexible cost display פעילים, " +
        "כנדרש בפריט הפישוט 'Reporting/Analytics in Controlling', כדי שהדיווח ייקרא מ-ABAP List Views ולא מדוחות " +
        "Report Writer ישנים.",
    },
    xrefs: ["tx:CK13N", "tx:CK24", "table:MBEW"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. הרשומה במאגר (tcode-catalog.ts) רושמת מודול CO, ולא PP כפי שצוין ברמז " +
      "המשימה. חיפושים שהורצו: sap-help-search.mjs 'CK11N' (--product ברירת מחדל S/4HANA On-Premise, 21 תוצאות), " +
      "'Creating Material Cost Estimates' (21 תוצאות, מניבה את התוצאה המדויקת של נושא העזרה שנבחר), ללא WebSearch; " +
      "fal-app.mjs CK11N --tcode ו--release S32OP; קריאת שני קטעי הפישוט המלאים בקובצי הטקסט המקומיים " +
      "(SIMPL_OP2023.pdf.txt סביב שורה 20407, SIMPL_OP2025.pdf.txt סביב שורה 18689). ממצא מרכזי: " +
      "audit/master-completion/simpl-tcode-index.json משייך את אזכור CK11N ב-2023 FPS03 לפריט 12.9 'S4TWL - " +
      "TECHNICAL CHANGES IN CONTROLLING'; קריאה ישירה של קובץ הטקסט מראה ששורת האזכור (20407) נמצאת בפועל תחת " +
      "פריט 12.16 'S4TWL - Reporting/Analytics in Controlling' (הכותרת מודפסת בקובץ ללא רווח כ-'12.16S4TWL', כפי " +
      "הנראה מקור הטעות באינדקס), הזהה בתוכנו לפריט 6.5.9 ב-2025 FPS01, אותו סוג טעות שנמצא קודם עבור tx:CPC1. " +
      "אומת על ידי המבקר: שני הפריטים זהים בגוף הטקסט למעט שורת רכיבי היישום, שבירת שורות ו-'CO01-CO03' לעומת " +
      "'CO01CO03'. דורש אימות במערכת חיה: התנהגות בפועל של CK11N בסביבת CBC (הרשאות, Report Selection ב-OKN0), " +
      "ותאריך תוקף ה-RIN notes 3493254/3671888 המודפסים ברשומת ה-FAL (לא נקראו במלואם, רק צוטטו כשדה מהרשומה).",
  },

  /* ----------------------------------------------------- tx:CL20N */
  {
    id: "tx:CL20N",
    evidence: [
      CL20N_SIMPL_ITEM,
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Library, CL20N @ S32OP (SAP S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CL20N')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת ה-FAL (scripts/fal-app.mjs CL20N) מדפיסה AppName/EnglishTitle: 'Assign Object to Classes " +
          "(Deprecated), Manage Object Assignments', ApplicationType/UITechnology 'SAP GUI', isPublished " +
          "'Published', CrossProductStackStatus 'RELEASED', NumberofSuccessors 0 (predecessors: -; successors: -). " +
          "הקטלוג העסקי SAP_PLM_BC_CLF ('Tools - Classification Handling'), רכיב היישום CA-CL-CL. הרשומה מפורסמת " +
          "ברציפות מ-S6OP (1610) ועד S32OP (2025 FPS01) (וברשימת הגרסאות מופיעים גם S36=2602 ו-S37=2608), כלומר " +
          "האפליקציה/הטרנזקציה עדיין זמינה וקוראת ל-CL20N בגרסה הנוכחית, אך כותרתה נושאת את התווית 'Deprecated' " +
          "בלי שנרשם מחליף (successor count 0).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Classification (deliverable: Defense Forces & Public Security)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b4e911a8e3504d24876c4bfcb42c4704/a3c0cc5340487214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (loio a3c0cc5340487214e10000000a174cb4, היקף SAP_S4HANA_ON-PREMISE 2025.001, שאילתה 'CL20N " +
          "Assignment of Object to Classes', 21 תוצאות) מדפיסה בסניפט: 'Assign Object to Class (transaction CL20N)' " +
          "לצד 'Assign Objects/Classes to Class application (transaction CL24N)'. הסניפט בלבד נקרא (לא הגוף המלא); " +
          "הוא מאשר ש-CL20N מוכרת כטרנזקציית סיווג פעילה בתיעוד S/4HANA On-Premise 2025 FPS01, ובסניפט שנקרא אין " +
          "סימון הסרה או שינוי שם.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Classification (deliverable: Defense Forces & Public Security)",
        url: "https://help.sap.com/docs/SAP_ERP/83ae2fb47d3f45099dc6d121b0a7706c/a3c0cc5340487214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio (a3c0cc5340487214e10000000a174cb4) עולה גם בהיקף SAP_ERP 6.18.latest (שאילתה 'Classification " +
          "transaction CL20N', 21 תוצאות) ומדפיס בסניפט: 'to Class application (transaction CL24N) Assign Object " +
          "to Class (transaction CL20N)'. הסניפט בלבד נקרא; הוא מאשר ש-CL20N מוכרת בתיעוד צד ה-ECC (SAP ERP 6.0 " +
          "EHP8), ובסניפט שנקרא אין סימון הסרה או שינוי שם.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "changed",
      edition: "on-premise",
      release: "2025.001",
      source: CL20N_SIMPL_ITEM,
      he:
        "CL20N היא הטרנזקציה הפעילה לשיוך אובייקט למחלקות סיווג הן ב-ECC והן ב-S/4HANA On-Premise 2025 FPS01, " +
        "ומשמשת כחלופה הרשומה במפורש לטרנזקציה CL20 שהוסרה החל מגרסת S/4HANA On-Premise 1511. עם זאת, ב-SAP Fiori " +
        "Apps Library כותרת הרשומה עצמה נושאת את התווית 'Deprecated' בלי שנרשם מחליף (successor count אפס), כך " +
        "שבמקורות הרשמיים שנבדקו (פריט הפישוט, ה-FAL, סניפטי help.sap.com) לא נרשם מחליף ולא נקבע מועד הסרה.",
      recommendedAction:
        "להמשיך להשתמש ב-CL20N לשיוך אובייקטים למחלקות בגרסה הנוכחית; לעקוב מעת לעת אחרי SAP Fiori Apps Library " +
        "(scripts/fal-app.mjs CL20N) לבדוק אם נרשם מחליף רשמי לתווית ה-Deprecated, ולבחון בעת המרה בפועל את פריט " +
        "'S4TWL - Classification' לגבי מגבלות הסיווג הכלליות (User Defined Data Type, Rename Characteristic, " +
        "Parameter Effectivity, ייבוא Batch).",
    },
    xrefs: ["tx:CL01", "tx:CL02", "tx:CL03", "tx:CL24N", "tx:CL30N", "tx:CT04", "fm:BAPI_OBJCL_CREATE"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שרצו: 'CL20N Assignment of Object to Classes' " +
      "(SAP_S4HANA_ON-PREMISE, 21 תוצאות) ו-'Classification transaction CL20N' (SAP_ERP, 21 תוצאות); שני פריטי " +
      "הפישוט (2023 FPS03 §28.5, 2025 FPS01 §10.4.9 'S4TWL - Classification', שניהם ברכיב CA-CL ובאותו נוסח) " +
      "נקראו במלואם מהקבצים המקומיים ב-scratchpad/official/; scripts/fal-app.mjs CL20N נבדק ישירות מול ה-Fiori " +
      "Apps Library. status.source הוא פריט הפישוט (מגדיר את הרציפות מ-CL20 הישנה); ה-FAL מספק את תווית " +
      "ה-Deprecated. לא נמצא successor רשום באף מקור, ולכן לא נקבע status='deprecated' (הכלל " +
      "replacement-no-successor דורש מחליף בר-פתרון). data/tx-intel.ts#CL20N (המאגר) מתאר תוכן דומה (שיוך " +
      "אובייקטים למחלקה, קשר ל-CL01/CT04/CL24N/CL30N) ותואם למקורות הרשמיים; לא אותרה סתירה בין המאגר לבין " +
      "המקורות שנבדקו. ביקורת יריבה 2026-09-24: שתי כתובות ה-URL מחזירות 200, ה-loio אומת בשני ההיקפים, ערכי " +
      "ה-FAL אומתו מילה במילה, כל ה-xrefs קיימים ב-lib/route-manifest.generated.ts (tcodes/bapiFm).",
  },

  /* ----------------------------------------------------- tx:CL24N */
  {
    id: "tx:CL24N",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#CL24N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tcode-catalog.ts רושם את CL24N במודול PP-PI, אזור 'מערכת מחלקות', עם השם העברי 'שיוך מחלקות' והשם " +
          "האנגלי 'Class Assignments'. זו רשומת קטלוג בלבד וללא תימוכין ממקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CL24N",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Classification (Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3, item 28.5)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        accessedAt: DATE24,
        claim:
          "הפריט (28.5, רכיב CA-CL) קובע שהטרנזקציות של הסיווג עברו חידוש (renovated) החל מ-SAP S/4HANA on-premise " +
          "1511 ('transactions of the Classification are renovated so that transactions may have changed " +
          "functionality or may be completely removed'), עם רשימה כללית: סוג נתונים מוגדר-משתמש 031 למאפיינים " +
          "הוסר, פונקציית Rename Characteristic בוטלה, Parameter Effectivity הוסתר, ו-batch import הוגבל לפעולה " +
          "מעמדת העבודה (presentation server) בלבד. בטבלת 'Transaction not available since SAP S/4HANA on-premise " +
          "edition 1511 / Available alternative transactions and reports' הקוד CL24 (Assign Objects to One Class) " +
          "מופיע כטרנזקציה שהוסרה, ומולו כטרנזקציה החלופית הזמינה מופיע CL24N בשם 'Assign Objects / Classes to " +
          "Class'. הפריט אינו מציין ש-CL24N עצמה הוסרה או הוחלפה; הוא מציג אותה כטרנזקציה החלופית שנותרה זמינה.",
        verificationLevel: "sap_official_verified",
      },
      CL24N_SIMPL_ITEM_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Assortment List",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/5507a8b592ea4caf86487201a44b0e74/f03f6c52001f294fe10000000a445394.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "קטע החיפוש מתעד ש-'You use Assign Objects/Classes to Class (transaction CL24N) to assign an article to " +
          "the class number with the class type Material', ומוסיף ש-CL24N משמשת גם לשיוך ערך מאפיין מרשימת ערכים " +
          "אפשריים שהוגדרה ב-CT04. מאשר קיום ושימוש בטרנזקציה CL24N בצד ה-ECC (SAP ERP, versionId 6.18.latest).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Classification",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b4e911a8e3504d24876c4bfcb42c4704/a3c0cc5340487214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "קטע החיפוש מזכיר במפורש את 'the ... Classes to Class application (transaction CL24N)' לצד 'Assign Object " +
          "to Class (transaction CL20N)', כחלק ממערכת הסיווג המשמשת לשיוך classes ל-force element ב-SAP S/4HANA " +
          "2025 FPS01. מאשר שהטרנזקציה CL24N מתועדת וקיימת גם בצד S/4HANA on-premise 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: CL24N_SIMPL_ITEM_2025,
      he:
        "CL24N (שיוך אובייקטים/מחלקות ל-Class) קיימת ומתועדת הן ב-SAP ERP 6.18.latest (ECC) והן ב-SAP S/4HANA " +
        "on-premise 2025 FPS01. רשימת הפישוט 'S4TWL - Classification' (28.5 / 10.4.9) אינה מציינת ש-CL24N עצמה " +
        "הוסרה או שונתה: היא מוצגת שם כטרנזקציה החלופית הזמינה במקום הקוד הישן CL24 שהוסר. שינויים אחרים " +
        "שמתוארים בפריט (הסרת סוג נתונים 031, ביטול Rename Characteristic, הסתרת Parameter Effectivity, הגבלת " +
        "batch import) מתייחסים לקבוצת טרנזקציות הסיווג ככלל ואינם מיוחסים במפורש ל-CL24N.",
      recommendedAction:
        "להמשיך להשתמש ב-CL24N לשיוך אובייקטים למחלקות ב-S/4HANA on-premise; אם נעשה שימוש בפונקציונליות הכללית " +
        "שהוגבלה (batch import, Rename Characteristic, Parameter Effectivity, סוג נתונים 031), לבדוק בנפרד את " +
        "ההשפעה מול פריט הפישוט 'S4TWL - Classification' ולתעד ב-CT04 בהתאם.",
    },
    xrefs: ["tx:CL20N", "tx:CT04", "tx:CL6O"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. ה-status מבוסס על כך שרשימת הפישוט מציגה את CL24N כחלופה הזמינה במקום CL24 " +
      "שהוסר, ולא על היגד מפורש 'CL24N ללא שינוי פונקציונלי'; ה-source מצביע על פריט הפישוט 2025 FPS01 (10.4.9), " +
      "שמציג את CL24N כחלופה הזמינה ל-CL24. חיפושים: sap-help-search 'CL24N' (S/4HANA scope, 2025.001) ו-'CL24N' " +
      "--product SAP_ERP (6.18.latest). CL6R (Direct Input for Classes) רשומה באותו פריט כלא זמינה מאז 1511 ללא " +
      "חלופה, ולכן אינה מומלצת לתיעוד.",
  },

  /* ----------------------------------------------------- tx:CL30N */
  {
    id: "tx:CL30N",
    aliases: ["CL30N (Find Objects in Classes)"],
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 – Feature Pack Stack 3 (Document Version 1.35) · item 28.5 " +
          "S4TWL - Classification (CA-CL), pp. 674-676; ואותו פריט ברשימת הפישוט של 2025 FPS01 (Document Version " +
          "1.36) · item 10.4.9 S4TWL - Classification, pp. 927-928",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט S4TWL - Classification (הערה 2267878, מודפסת בכותרת הפריט בשני הקבצים) נקרא בטקסט מלא בשני הקבצים " +
          "המקומיים (SIMPL_OP2023.pdf ו-SIMPL_OP2025.pdf, זהים בתוכן). הפריט קובע ש-'With SAP S/4HANA, on-premise " +
          "edition 1511 transactions of the Classification are renovated so that transactions may have changed " +
          "functionality or may be completely removed', ומפרט שינויים כלליים: הוסר סוג הנתונים User Defined Data " +
          "Type (031) למאפיינים, הושבתה פונקציית שינוי שם מאפיין (Rename Characteristic), הוסתר Parameter " +
          "Effectivity, והוגבל batch import לשרת ההצגה (presentation server) בלבד; אלה תוארו כחלים על " +
          "'transactions of the Classification' באופן כללי, ללא ייחוס מפורש ל-CL30N. בטבלה שכותרותיה 'Transaction " +
          "not available since SAP S/4HANA on-premise edition 1511' ו-'Available alternative transactions and " +
          "reports' מופיע הקוד CL30 (Find Objects in Classes) בטור הקודים שאינם זמינים, ולצדו CL30N (Find Objects " +
          "in Classes, אותו שם פונקציונלי) בטור החלופות הזמינות. כלומר CL30N עצמה אינה מופיעה בטור הקודים שאינם " +
          "זמינים; היא מוזכרת רק כחלופה הזמינה ל-CL30. הפריט אינו מייחס ל-CL30N באופן ישיר אף אחד מהשינויים " +
          "הפונקציונליים שפורטו לעיל.",
        verificationLevel: "sap_official_verified",
      },
      CL30N_WHATSNEW,
      {
        sourceType: "sap_help",
        sourceTitle: "Create Classifications (Cross-Application Components (CA))",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/849930ca4c3349b5a117bf279a72b34f/f786c4535cdeb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש של help.sap.com למדריך Create Classifications, מהדורת S/4HANA On-Premise 2025 FPS01 " +
          "(versionId 2025.001, loio f786c4535cdeb44ce10000000a174cb4), מונה בטבלת הפעילויות: 'Activities in the " +
          "Classification System Transaction Activity ... Classification CL30N Find objects in classes CL31 Find by " +
          "class type ...'. כלומר CL30N מתועדת כטרנזקציית 'Find objects in classes' גם במהדורת 2025 FPS01, ולא רק " +
          "ב-2023 FPS03. אותו loio מופיע גם במוצר SAP ERP (versionId 6.18.latest, כתובת " +
          "https://help.sap.com/docs/SAP_ERP/cf37e689fcbb4b67a4197897e0622b5f/f786c4535cdeb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest) " +
          "עם אותה שורת טבלה 'Classification CL30N Find objects in classes'; כלומר CL30N מתועדת באותו אופן גם " +
          "ב-SAP ERP 6.0 EHP8, ללא הבדל בשם הפונקציונלי בין הצדדים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: troubleshooting.ts#batch-determination-fail",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת פתרון התקלות 'batch-determination-fail' (PP-PI) מונה את CL30N בשדה analyzeTcodes כטרנזקציית ניתוח " +
          "בעת בעיית קביעת אצווה, לצד CU70/MSC3N/COR6N; אין ברשומה זו כל קביעה לגבי מעמד CL30N ב-S/4HANA, רק שימוש " +
          "תפעולי שוטף.",
        repoRef: "data/troubleshooting.ts#batch-determination-fail",
        verificationLevel: "repository_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library: CL30N - Find Objects in Classes / Find Objects in Classes (Deprecated) (SAP GUI, " +
          "component CA-CL-CL)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CL30N')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library (S32OP = SAP S/4HANA 2025 FPS01 On-Premise, נשלפה עם scripts/fal-app.mjs " +
          "CL30N --release S32OP וגם דרך --tcode CL30N) מציגה את CL30N כאפליקציית SAP GUI בסטטוס Published, רכיב " +
          "יישום CA-CL-CL (Classification), קטלוג עסקי SAP_PLM_BC_CLF 'Tools - Classification Handling', intent " +
          "Classification-findObjectsInClasses, טרנזקציה מובילה CL30N, תפקידים SAP_BR_ADMINISTRATOR_RCP_DEV, " +
          "SAP_BR_BOM_ENGINEER, SAP_BR_BOM_ENG_CUST_ORDER, SAP_BR_MAINTENANCE_PLANNER, SAP_BR_MD_SPECIALIST_EAM; " +
          "שדות Predecessors ו-Successors ריקים; רשימת ה-releases רציפה מ-S6OP (1610) ועד S32OP (2025 FPS01) " +
          "וכוללת גם S36 (2602) ו-S37 (2608). עם זאת, ברשומת S32OP מודפסים שני שמות לאפליקציה: 'Find Objects in " +
          "Classes' ו-'Find Objects in Classes (Deprecated)', בעוד שרשומת S30OP (2023 FPS03) מדפיסה שם יחיד 'Find " +
          "Objects in Classes'. סימון ה-(Deprecated) בשם עומד בסתירה לתיעוד Create Classifications 2025.001 " +
          "(evidence[2]) המונה את CL30N כפעילות רגילה, ואף רשומה רשמית מצוטטת אינה מדפיסה קוד יורש או הערת SAP " +
          "המסבירה אותו; מה שיכריע: הערת SAP על CL30N שתודפס ברשומה רשמית, או בדיקה במערכת 2025 FPS01 חיה.",
        verificationLevel: "conflicting_sources",
      },
    ],
    status: {
      status: "changed",
      edition: "on-premise",
      release: "2023 FPS03",
      source: CL30N_WHATSNEW,
      he:
        "CL30N (Find Objects in Classes) מתועדת ב-SAP S/4HANA On-Premise גם במהדורה 2025 FPS01 (מדריך Create " +
        "Classifications) ומופיעה ברשימת הפישוט רק כחלופה הזמינה לקוד CL30, שאינו זמין מאז מהדורה 1511. השינוי " +
        "המתועד ל-CL30N עצמה הוא תוספת פונקציונלית: החל ממהדורת On-Premise 2023 FPS03 ניתן לקשר מ-CL30N ישירות " +
        "ל-Manage Change Records app (Technical Object Name F2097, רכיב PLM-CR) דרך Environment → Define function " +
        "עם הטרנזקציה /PLMI/CR_NAV_CL30N. לצד זאת, רשומת ה-Fiori Apps Library ל-2025 FPS01 (S32OP) מדפיסה " +
        "לאפליקציית ה-SAP GUI גם את השם 'Find Objects in Classes (Deprecated)' ללא קוד יורש; סימון זה אינו מאושש " +
        "באף רשומה רשמית אחרת שנבדקה ודורש אימות.",
      recommendedAction:
        "להמשיך להשתמש ב-CL30N; במידת הצורך להפעיל את הקישור ל-Manage Change Records app (החל מ-2023 FPS03) דרך " +
        "Environment → Define function עם /PLMI/CR_NAV_CL30N. לפני תכנון פרישה של הקוד יש לאמת את סימון " +
        "ה-(Deprecated) שמדפיסה רשומת ה-Fiori Apps Library ל-2025 FPS01, שכן לא צוין קוד יורש באף רשומה שנבדקה.",
    },
    xrefs: [],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שבוצעו ב-scripts/sap-help-search.mjs: 'CL30N Find Objects in " +
      "Classes' (ברירת מחדל SAP_S4HANA_ON-PREMISE, 21 תוצאות) ואותו חיפוש עם --product SAP_ERP (21 תוצאות); גוף " +
      "דף ה-What's New 2023 FPS03 נקרא עם scripts/sap-help-body.mjs (ואומת שוב בביקורת); פריט הפישוט S4TWL - " +
      "Classification נקרא מהקבצים המקומיים SIMPL_OP2023.pdf.txt (item 28.5, pp. 674-676) ו-SIMPL_OP2025.pdf.txt " +
      "(item 10.4.9, pp. 927-928), טקסט זהה. פריט הפישוט עצמו אינו מייחס ל-CL30N שינוי פונקציונלי ישיר; היא " +
      "מוזכרת בו רק כחלופה הזמינה ל-CL30 שאינו זמין מאז 1511. הקוד CL30 אינו קיים ביקום ה-xrefs (אין tx:CL30 " +
      "ב-route-manifest.generated.ts), ולכן לא צוין כ-xref ולא כ-successor הפוך; fiori:F2097 אינו קיים " +
      "ב-data/fiori/apps.ts ולכן נזכר בפרוזה בלבד. הרצות scripts/fal-app.mjs: '--tcode CL30N', 'CL30N --release " +
      "S32OP', 'CL30N --release S30OP'. ממצא סותר: רשומת S32OP מדפיסה שני שמות, 'Find Objects in Classes' ו-'Find " +
      "Objects in Classes (Deprecated)', ללא predecessor/successor, בעוד S30OP מדפיסה שם יחיד; מדריך Create " +
      "Classifications 2025.001 מונה את CL30N כפעילות רגילה. הסטטוס נותר 'changed' (source: דף ה-What's New 2023 " +
      "FPS03) והסתירה סומנה בשורת ה-Fiori Apps Library כ-conflicting_sources. מה שיכריע: הערת SAP על CL30N " +
      "שתודפס ברשומה רשמית (אף רשומה מצוטטת אינה מדפיסה כזו, ולכן לא צוין מספר), או בדיקה במערכת 2025 FPS01 " +
      "חיה.",
  },

  /* ----------------------------------------------------- tx:CM03 */
  {
    id: "tx:CM03",
    evidence: [
      CM03_SIMPL_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "גוף דף התפקיד 'Evaluate Capacity Planning' (Technical name: SAP_PP-CAPA_PLAN_EVAL), שנקרא במלואו עם " +
          "scripts/sap-help-body.mjs במהדורת On-Premise 2025 FPS01, מפרט תחת Activities את הפונקציה 'CM03 Capacity " +
          "evaluation work center view: Pool' לצד CM01/CM02/CM04/CM05/CM07/CM50 עד CM55, במסגרת המשימה 'You execute " +
          "capacity planning'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "בצד ה-ECC (SAP ERP 6.0 EHP8), גוף דף התפקיד 'Evaluate Capacity Planning' (Technical name: " +
          "SAP_PP-CAPA_PLAN_EVAL), שנקרא עם scripts/sap-help-body.mjs, מפרט את 'CM03 Capacity evaluation work " +
          "center view: Pool' באותו נוסח ובאותה רשימת פעילויות כמו בדף המקביל של S/4HANA 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library: CM03 - Capac. planning, work center pool (SAP GUI, component PP-CRP-ALY)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CM03')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library (S32OP = SAP S/4HANA 2025 FPS01 On-Premise, נשלפה עם scripts/fal-app.mjs CM03 " +
          "--release S32OP וגם עם --tcode CM03) מציגה את CM03 כאפליקציית SAP GUI בסטטוס Published, רכיב יישום " +
          "PP-CRP-ALY (Capacity Evaluations), קטלוג טכני SAP_TC_SCM_PP_BE_APPS:S4PP, intent " +
          "WorkCenterUtilization-displayPool, טרנזקציה מובילה CM03; שדות Predecessors ו-Successors ריקים (0 " +
          "successors); רשימת ה-releases רציפה מ-S6OP (1610) ועד S32OP (2025 FPS01), ללא מהדורה שבה האפליקציה חסרה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: CM03_SIMPL_ITEM,
      he:
        "CM03 (Capacity evaluation work center view: Pool; ב-Fiori Apps Library: Capac. planning, work center pool) " +
        "נותרה זמינה ב-SAP S/4HANA On-Premise עד למהדורה 2025 FPS01: פריט הפישוט 9.5.4 'S4TWL - Graphical Planning " +
        "Table' מוציא אותה במפורש מרשימת ה-CM* הכפופה ל-compatibility scope, כיוון שאינה מבוססת Gantt-Chart גרפי, " +
        "ורשומת ה-Fiori Apps Library מציגה אותה כאפליקציית SAP GUI רציפה מ-1610 ועד 2025 FPS01 ללא קוד יורש. לא " +
        "אותרה קביעה רשמית להחלפה, הסרה או שינוי פונקציונלי בקוד עצמו.",
      recommendedAction:
        "להמשיך להשתמש ב-CM03 להערכת קיבולת לפי מאגר (Pool); לפי פריט הפישוט היא אינה כפופה למגבלת ה-compatibility " +
        "scope שחלה על טרנזקציות ה-Gantt-Chart הגרפיות, ואין צורך במעבר לאפליקציה חלופית בשלב זה.",
    },
    xrefs: [],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שבוצעו עם scripts/sap-help-search.mjs: 'CM03 Capacity Planning Pool' " +
      "(ברירת מחדל SAP_S4HANA_ON-PREMISE, 21 תוצאות) ואותו חיפוש עם --product SAP_ERP (21 תוצאות); שניהם החזירו את " +
      "רשומת התפקיד 'Evaluate Capacity Planning' (loio d724bf53d25ab64ce10000000a174cb4). גוף הדף נקרא עם " +
      "scripts/sap-help-body.mjs הן על כתובת ה-2025 FPS01 והן על כתובת SAP_ERP 6.18.latest (אומת מחדש על ידי " +
      "המבקר). פריט הפישוט S4TWL - Graphical Planning Table נקרא מהקובץ המקומי " +
      "scratchpad/official/SIMPL_OP2025.pdf.txt (item 9.5.4, עמ' 779-780, סעיף Exceptions); הפריט מציין את CM03 " +
      "בסעיף Exceptions כדי לשלול ממנה את מגבלת ה-compatibility scope, ואינו קובע דבר על שינוי, הסרה או החלפה של " +
      "הקוד עצמו. scripts/fal-app.mjs הורץ עם 'CM03 --release S32OP' וגם עם '--tcode CM03'; שתי ההרצות מאששות " +
      "אפליקציית SAP GUI רציפה מ-S6OP ועד S32OP ללא successor. לא נמצא Fiori id (F####) עבור CM03, ולכן לא נכלל " +
      "xref לקטלוג ה-Fiori. סטטוס 'unchanged' נבחר משום שאין ראיה רשמית לשינוי פונקציונלי, הסרה או החלפה; אם תתגלה " +
      "בעתיד הודעת SAP או פריט פישוט נוסף העוסק ב-CM03 עצמה יש לעדכן את הרשומה.",
  },

  /* ----------------------------------------------------- tx:CM04 */
  {
    id: "tx:CM04",
    evidence: [
      CM04_SIMPL_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט של הנושא 'Evaluate Capacity Planning' בתיעוד S/4HANA On-Premise (2025.001) מדפיס תחת Activities " +
          "את השורה 'CM04 Capacity evaluation work center view: Backlog' לצד CM01, CM02, CM03, CM05, CM07 ו-CM50, " +
          "כלומר CM04 מופיעה ברשימת הטרנזקציות של נושא זה במהדורה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio בהיקף SAP ERP (6.18.latest) מדפיס את אותה שורה 'CM04 Capacity evaluation work center view: " +
          "Backlog', כלומר CM04 מופיעה באותו נושא גם בצד ECC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#CM04",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        repoRef: "data/tx-intel.ts#CM04",
        claim:
          "הרשומה הפנימית מתעדת את CM04 כהערכת קיבולת בפיגור (Capacity Evaluation: Backlog), מ-CM01 family, ומציינת " +
          "'s4: זמינה ב-S/4HANA'; זוהי רשומת מאגר פנימית ולא מקור רשמי.",
        verificationLevel: "repository_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "פריט הפישוט הרשמי 'S4TWL - Graphical Planning Table' (S/4HANA 2025 FPS01) מציין במפורש ש-CM04 אינה משתמשת " +
        "בלוח תכנון גרפי, ולכן אינה חלק ממגבלת ה-compatibility scope שחלה על טרנזקציות כמו CM21/CM22/CM23/CM25. " +
        "תיעוד הנושא 'Evaluate Capacity Planning' ל-2025 FPS01 (On-Premise) ולצד ECC מונה את CM04 ברשימת הטרנזקציות " +
        "של הנושא.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: CM04_SIMPL_ITEM,
      recommendedAction:
        "להמשיך להשתמש ב-CM04 להערכת קיבולת בפיגור; בשונה מטרנזקציות עם לוח תכנון גרפי (למשל CM21), CM04 אינה כפופה " +
        "למגבלות ה-compatibility scope וזכויות השימוש המוגבלות של פריט הפישוט 'S4TWL - Graphical Planning Table'.",
    },
    xrefs: ["tx:CM01", "tx:CM02", "tx:CM05", "tx:CM21"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שבוצעו ב-scripts/sap-help-search.mjs: 'CM04 capacity' (ברירת מחדל " +
      "SAP_S4HANA_ON-PREMISE, 21 תוצאות), 'Capacity Evaluation Backlog CM04' (21 תוצאות), ו-'CM04' עם --product " +
      "SAP_ERP (21 תוצאות); בכולם ההיט המוביל היה 'Evaluate Capacity Planning' (loio " +
      "d724bf53d25ab64ce10000000a174cb4). פריט הפישוט 9.5.4 'S4TWL - Graphical Planning Table' נקרא מהקובץ המקומי " +
      "SIMPL_OP2025.pdf.txt (עמ' 779-780). הפריט המקביל בגרסת 2023 FPS03 (item 30.35, SIMPL_OP2023.pdf.txt) עוסק " +
      "באותו נושא אך אינו מכיל סעיף Exceptions ואינו מזכיר את CM04; לכן לא נטען כאן דבר על סמך מהדורת 2023. " +
      "scripts/fal-app.mjs --tcode CM04 מדפיס את רשומת ה-SAP GUI 'CM04 Capac. planning, work center backlog' עם 0 " +
      "successors וללא deep link, כך שלא נוספה שורת fiori_library ולא צוין successor. לא נמצאה רשומה רשמית הקובעת " +
      "ל-CM04 סטטוס של deprecated/replaced.",
  },

  /* ----------------------------------------------------- tx:CM05 */
  {
    id: "tx:CM05",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Graphical Planning Table (Simplification List for SAP S/4HANA 2025 Feature Pack Stack 1, item " +
          "9.5.4)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "הפריט עוסק בטרנזקציות עם graphical planning board (CM21, CM22, CM23, CM25 וכו') הנכללות ב-compatibility " +
          "scope; בסעיף 'Exceptions' הוא קובע במפורש: 'The following CM* transactions do not use graphical planning " +
          "boards. Therefore, they are not part of SAP S/4HANA compatibility scope. CM01, CM02, CM03, CM04, CM05, " +
          "CM07, CM26, CM28, CM34, CM35, CM37, CM38, CM50, CM53, CM56.' כלומר CM05 מוחרגת מנושא הפריט " +
          "(compatibility scope של לוח התכנון הגרפי) בגלל שאינה משתמשת בלוח כזה כלל; הפריט אינו קובע דבר נוסף לגבי " +
          "מעמד CM05 עצמה, זמינותה, או קוד יורש עבורה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת חיפוש (loio d724bf53d25ab64ce10000000a174cb4) מדף תפקיד PFCG 'Evaluate Capacity Planning', מהדורה " +
          "2025 FPS01: הקטע המצוטט מרשימת הפעילויות מדפיס 'CM04 Capacity evaluation work center view: Backlog CM05 " +
          "Capacity evaluation work center view: Overload CM07 Variable capacity evaluation CM50 Extended " +
          "evaluation: Work ...'; כלומר נכון למהדורת On-Premise 2025 FPS01, CM05 עדיין מודפסת ברשימת הפעילויות של " +
          "תפקיד PFCG זה כהערכת קיבולת מסוג Overload ברמת מרכז עבודה. לא נקרא גוף הדף המלא (רק הקטע המוצג בתוצאת " +
          "החיפוש).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio (d724bf53d25ab64ce10000000a174cb4) קיים גם תחת היקף SAP ERP 6.0 EHP8 Latest, עם אותה שורת טקסט " +
          "המדפיסה 'CM05 Capacity evaluation work center view: Overload'; כלומר CM05 מתועדת באותו אופן, כאותה " +
          "פעילות תפקיד, גם בצד ה-ECC, ללא הבדל פונקציונלי מודפס בין הצדדים בקטע זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library: CM05 Capacity plan.:Work center overload (SAP GUI)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('CM05')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הרשומה נשלפה עם scripts/fal-app.mjs --tcode CM05 במהדורה S32OP (SAP S/4HANA 2025 FPS01 On-Premise): " +
          "'CM05 Capacity plan.:Work center overload [SAP GUI]; GUI app entry: CM05 Capacity plan.:Work center " +
          "overload (SAP GUI, successors 0)'. כלומר CM05 מוגדרת בספריית אפליקציות ה-Fiori כאפליקציית SAP GUI " +
          "מפורסמת (leading app) במהדורה זו, ללא קוד יורש מודפס (0 successors); זוהי שלילה מתועדת, לא הכרעה על " +
          "הפסקת שימוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#CM05",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מתעדת את CM05 כטרנזקציית הערכת קיבולת (Capacity Evaluation) מתמחית בעומס-יתר (Overload) ברמת " +
          "מרכז עבודה, בסיסה טבלאות KBED/KAKO/CRHD, בשרשרת CO01 → CM05 → CM21. שדה s4 ברשומה קובע 'זמינה ב-S/4HANA' " +
          "ללא ציון מקור רשמי או מהדורה: קביעה תפעולית של המאגר, לא ראיה רשמית עצמאית.",
        repoRef: "data/tx-intel.ts#CM05",
        verificationLevel: "repository_verified",
      },
    ],
    xrefs: ["tx:CM01", "tx:CM21", "tx:CO01"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שבוצעו ב-scripts/sap-help-search.mjs: 'CM05 capacity evaluation' " +
      "(SAP_S4HANA_ON-PREMISE, 21 תוצאות) ו-'CM05' עם --product SAP_ERP (21 תוצאות); שני החיפושים מחזירים את אותה " +
      "רשומה מובילה (loio d724bf53d25ab64ce10000000a174cb4, 'Evaluate Capacity Planning') בשני הצדדים. פריט הפישוט " +
      "S4TWL - Graphical Planning Table (2025 FPS01, item 9.5.4, עמ' 779-780 בקובץ המקומי " +
      "scratchpad/official/SIMPL_OP2025.pdf.txt, שורות 43080-43170; אותו מיקום מאושר גם " +
      "ב-audit/master-completion/simpl-tcode-index.json) מזכיר את CM05 ברשימת 'Exceptions': טרנזקציות שאינן משתמשות " +
      "בלוח תכנון גרפי ולכן אינן נדונות בהיקף הפריט. זהו מקור רשמי, אך הוא אינו מכריע לגבי CM05 עצמה: אינו קובע " +
      "שהיא הוחלפה, הוסרה, שונתה, או נותרה ללא שינוי, אלא שהיא מחוץ לנושא הפריט. scripts/sap-help-body.mjs לא " +
      "הופעל: קטע החיפוש (snippet) הספיק כדי לתחום את הטענות ולא נדרשה קריאת גוף עמוד נוסף. scripts/fal-app.mjs " +
      "הופעל פעמיים: '--tcode CM05' ו-'CM05 --release S32OP' (אותה תוצאה); הרשומה מציגה 0 successors, שלילה מתועדת " +
      "בלבד. status הושמט: לפי כלל הפרויקט, קוד שפריט הפישוט אינו מכריע לגביו נשאר verification_required עם " +
      "החיפושים הרשומים כאן; אין ברשומות הרשמיות שנקראו כל קביעה על טרנזקציית יורשת או אפליקציית Fiori חלופית " +
      "ל-CM05, ולכן לא נקבע successor. tx:CM01 מופיע ב-xrefs כטרנזקציה קרובה מבחינה תפקודית (Capacity Evaluation: " +
      "Load מול Overload) הקיימת ביקום ה-xrefs (route-manifest.generated.ts), אך תזכורת: tx:CM01 עצמה טרם נכתבה " +
      "בקובץ הזה (רשומת אימות עבורה סורבה בשער וממתינה בתור, לפי ההערה בראש הקובץ); ה-xref מפנה לקוד הקיים ביקום, " +
      "לא לרשומת אימות קיימת.",
  },

  /* ----------------------------------------------------- tx:CM07 */
  {
    id: "tx:CM07",
    evidence: [
      CM07_SIMPL_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט מתעד תחת פעילויות התפקיד 'Evaluate Capacity Planning' בתיעוד S/4HANA On-Premise 2025 FPS01 את " +
          "השורה 'CM07 Variable capacity evaluation' לצד CM01, CM02, CM04, CM05 ו-CM50 (כפי שהם מודפסים בסניפט), " +
          "כלומר CM07 מופיעה בפעילויות תפקיד התקן SAP_PP-CAPA_PLAN_EVAL במהדורה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Evaluate Capacity Planning",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/d724bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio בהיקף SAP ERP 6.0 EHP8 מדפיס אותה שורה 'CM07 Variable capacity evaluation', כלומר CM07 מופיעה " +
          "באותו תפקיד גם בצד ECC, באותה שורה כמו בתיעוד S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#CM07",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        repoRef: "data/tcode-catalog.ts#CM07",
        claim:
          "רשומת קטלוג הטרנזקציות הפנימית מתעדת את CM07 כ-'Capacity Planning: Variable Evaluation' (module PP, area " +
          "תכנון קיבולת); זוהי רשומת מאגר פנימית ולא מקור רשמי.",
        verificationLevel: "repository_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "פריט הפישוט הרשמי 9.5.4 (S4TWL - Graphical Planning Table, S/4HANA 2025 FPS01) מציין במפורש ש-CM07 אינה " +
        "משתמשת בלוח תכנון גרפי, ולכן אינה חלק ממגבלת ה-compatibility scope שחלה על טרנזקציות כמו " +
        "CM21/CM22/CM23/CM25 ועל לוח התכנון הגרפי של MF50. תיעוד התפקיד 'Evaluate Capacity Planning' ל-2025 FPS01 " +
        "(On-Premise) ולצד ECC (6.0 EHP8) מציג את CM07 בשורה 'Variable capacity evaluation' בפעילויות התפקיד, באותה " +
        "שורה בשני הצדדים.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: CM07_SIMPL_ITEM,
      recommendedAction:
        "ניתן להמשיך להשתמש ב-CM07 להערכת קיבולת משתנה ללא מגבלת compatibility scope; אין צורך בפעולת מעבר ייעודית " +
        "לקוד זה עצמו. יש להבחין בינו לבין טרנזקציות ה-CM* עם לוח תכנון גרפי (כגון CM21, CM25), שהן חלק " +
        "מה-compatibility scope, ובין MF50, שבה רק לוח התכנון הגרפי כפוף ל-compatibility scope; תאריך התפוגה מפורט " +
        "ב-SAP Note 2269324.",
    },
    xrefs: ["tx:CM01", "tx:CM02", "tx:CM05", "tx:CM21"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שבוצעו ב-scripts/sap-help-search.mjs: 'CM07 capacity planning " +
      "variable evaluation' (ברירת מחדל SAP_S4HANA_ON-PREMISE, 21 תוצאות) ו-'CM07 Variable capacity evaluation' עם " +
      "--product SAP_ERP (21 תוצאות); בשניהם ההיט המוביל היה 'Evaluate Capacity Planning' (loio " +
      "d724bf53d25ab64ce10000000a174cb4). פריט הפישוט 9.5.4 נקרא מהקובץ המקומי SIMPL_OP2025.pdf.txt (עמ' 779-780), " +
      "הכולל סעיף Exceptions המפרט את CM07 יחד עם CM01-CM05, CM26, CM28, CM34, CM35, CM37, CM38, CM50, CM53, CM56. " +
      "הפריט המקביל במהדורת 2023 FPS03 (item 30.35, SIMPL_OP2023.pdf.txt, עמ' 809) עוסק באותו נושא אך אינו מכיל " +
      "סעיף Exceptions ואינו מזכיר את CM07; לכן לא נטען כאן דבר על סמך מהדורת 2023, וה-status מוגבל למהדורת 2025 " +
      "FPS01. scripts/fal-app.mjs --tcode CM07 מדפיס 'CM07 @ S32OP: leading app(s): none; GUI app entry: none'; אין " +
      "רשומת Fiori Apps Library מובילה ל-CM07, ולכן לא נוספה שורת fiori_library ולא צוין successor (לא נדרש עבור " +
      "status='unchanged'). האפליקציות F3289 (Manage Work Center Capacity), F3770 (Capacity Planning Table) ו-F3951 " +
      "(Capacity Planning Board) שהפריט מזכיר במסגרת CPS מוצגות כחלופה לטרנזקציות CM* עם לוח תכנון גרפי, לא ל-CM07 " +
      "שהוצאה מפורשות מהמגבלה; לכן לא צוינו כ-successor או כ-xref, כדי לא לרמז על קשר שהמקור לא קבע. לא נמצאה רשומה " +
      "רשמית הקובעת ל-CM07 סטטוס deprecated, replaced או not_available.",
  },

  /* ----------------------------------------------------- tx:CM21 */
  {
    id: "tx:CM21",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 – Feature Pack Stack 3 · item 30.35 S4TWL - Graphical Planning " +
          "Table (PP-CRP, SAP Note 2268050)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "הפריט (SAP Note 2268050, רכיב PP-CRP) עוסק בלוח התכנון הגרפי (Graphical Planning Table / Gantt) ומזכיר " +
          "את CM21 במפורש: 'SAP offered basic capacity planning by means of transactions CM21, CM22, etc.'. הוא " +
          "קובע ש-'Transactions CM21, CM22, CM23, CM25, etc with graphical planning table are still available in " +
          "SAP S/4HANA on-premise edition, but not considered as the target architecture', וכי הלוח הגרפי הוא חלק " +
          "מ-SAP S/4HANA compatibility scope עם זכויות שימוש מוגבלות (מפנה ל-SAP Note 2269324, מזהה 451 במטריצת " +
          "התאימות). הפריט ממליץ לשקול מעבר לאפליקציות 'Manage Work Center Capacity', 'Capacity Scheduling Table' " +
          "ו-'Capacity Scheduling Board' (זמינות החל ממהדורת On-Premise 1909 / Cloud 1908), או REO, או PP/DS משובץ.",
        verificationLevel: "sap_official_verified",
      },
      CM21_SIMPL_ITEM_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Execute Capacity Planning (Single and Composite Roles (PFCG))",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/2225bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "גוף התיעוד (נקרא עם scripts/sap-help-body.mjs, מהדורת S/4HANA On-Premise 2025 FPS01, versionId 2025.001, " +
          "loio 2225bf53d25ab64ce10000000a174cb4) מפרט את פעילויות התפקיד SAP_PP_CAPA_PLAN ומדפיס את השורה: " +
          "'Function Transaction CM21 Capacity leveling work center view - Capacity planning table'. כלומר CM21 " +
          "מופיעה ברשימת הפעילויות של התפקיד בתיעוד מהדורת 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומות המאגר: tcode-catalog.ts#CM21, troubleshooting.ts#capacity-overload, fiori/apps.ts#F3951",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tcode-catalog.ts#CM21 מתעד את השם העברי 'איזון קיבולת: תכנון מפורט' והאנגלי 'Capacity Leveling: " +
          "Detailed Planning' באזור 'תכנון קיבולת', מודול PP. data/troubleshooting.ts#capacity-overload מונה את " +
          "CM21 בשדות analyzeTcodes ו-fix כטרנזקציית איזון (לצד CM01, CM25 ו-CR03) בתרחיש עומס יתר על מרכז עבודה; " +
          "אין ברשומה זו קביעה על מעמד CM21 ב-S/4HANA. data/fiori/apps.ts#F3951 (Capacity Scheduling Board) מונה את " +
          "CM21 בשדה guiTx לצד CM25 ומתאר 'תזמון גס ב-CM21/CM25' שהאפליקציה הגרפית (Gantt) משפרת; רשומה זו אינה " +
          "קובעת את CM21 כ-predecessor או successor רשמי (ב-Fiori Apps Library, רשומת F3951 מדפיסה שדות GUI " +
          "transaction ו-predecessors/successors ריקים; ראו notes).",
        repoRef: "data/tcode-catalog.ts#CM21; data/troubleshooting.ts#capacity-overload; data/fiori/apps.ts#F3951",
        verificationLevel: "repository_verified",
      },
    ],
    status: {
      status: "compatibility_scope",
      edition: "on-premise",
      release: "2025 FPS01",
      he:
        "CM21 (איזון קיבולת, תצוגת מרכז עבודה עם לוח תכנון קיבולת) זמינה ב-SAP S/4HANA On-Premise ומופיעה ברשימת " +
        "הפעילויות של תפקיד SAP_PP_CAPA_PLAN בתיעוד 2025 FPS01. פריטי הפישוט S4TWL - Graphical Planning Table (SAP " +
        "Note 2268050) של 2023 FPS03 ו-2025 FPS01 קובעים שהלוח הגרפי (Gantt) שבו משתמשת CM21 הוא חלק מ-SAP S/4HANA " +
        "compatibility scope עם זכויות שימוש מוגבלות (SAP Note 2269324, מזהה 451 במטריצת התאימות), ואינו ארכיטקטורת " +
        "היעד; CM21 אינה ברשימת החריגים של הפריט, ולכן היא בהיקף התאימות.",
      source: CM21_SIMPL_ITEM_2025,
      recommendedAction:
        "להמשיך להשתמש ב-CM21 בתוך היקף התאימות (compatibility scope) ולעקוב אחר תאריך הפקיעה לפי SAP Note 2269324 " +
        "(מזהה 451). לתכנן מעבר לאפליקציות שהפריט מציין כתחליף למשפחת CM*: Manage Work Center Capacity (F3289) " +
        "לניטור עומסים, ו-Capacity Planning Table (F3770) או Capacity Planning Board (F3951) לאיזון בפועל, או " +
        "להעריך מעבר ל-PP/DS משובץ לבעיות תזמון מורכבות. רשומת Fiori Apps Library של F3951 אינה מדפיסה קישור ישיר " +
        "ל-CM21 (שדות GUI transaction ו-predecessors/successors ריקים), ולכן לא נקבע מחליף יחיד.",
    },
    xrefs: ["fiori:F3289", "fiori:F3951"],
    lastVerifiedAt: DATE24,
    notes:
      "לא בוצעה בדיקה במערכת SAP חיה. חיפושים שבוצעו ב-scripts/sap-help-search.mjs: 'CM21 Capacity Leveling " +
      "Detailed Planning' (ברירת מחדל SAP_S4HANA_ON-PREMISE, 21 תוצאות) ו-'Execute Capacity Planning' (loio " +
      "2225bf53d25ab64ce10000000a174cb4, versionId 2025.001). הקשר ECC מגיע מרשימת הפישוט 2025 עצמה: 'In SAP ECC, " +
      "SAP offered basic capacity planning by means of transactions CM21, CM22, CM25, etc.'. גופי דף נקראו עם " +
      "scripts/sap-help-body.mjs עבור 'Capacity Leveling (PP-CRP-LVL)' (אינו מזכיר את CM21 בשמה ולכן אינו מצוטט) " +
      "ועבור 'Execute Capacity Planning' (מזכיר את CM21 בשורה מפורשת, evidence[2]). scripts/fal-app.mjs הופעל על " +
      "F3951 כדי לבדוק קישור GUI transaction ל-CM21: 'GUI transactions: leading -; related -' ו-'predecessors: -; " +
      "successors: -', ולכן לא נקבע successor. פער לבדיקת עורך: audit/master-completion/simpl-tcode-index.json " +
      "מייחס לשורות 42097, 42099 ו-42141 ב-SIMPL_OP2023.pdf.txt את הכותרת 'S4TWL - ANSI/ISA S95 Interface', פריט " +
      "30.9, אך הטקסט באותן שורות הוא פריט 30.35 'S4TWL - Graphical Planning Table' (אותו SAP Note 2268050 כמו פריט " +
      "9.5.4 ב-2025 FPS01). הציטוט מבוסס על הטקסט שנקרא בפועל. F3770 ('Capacity Planning Table') אינו קיים " +
      "ב-data/fiori/apps.ts ולכן הוא מוזכר בפרוזה בלבד ולא כ-xref. סבב ביקורת (2026-09-24): הוסרו קווים ארוכים, " +
      "התיאור 'ברמת הזמנת ייצור' הוחלף בתיאור 'תצוגת מרכז עבודה' מגוף התיעוד, והניסוח 'טרנזקציה פעילה ותקפה' רוכך.",
  },

  /* ----------------------------------------------------- tx:CM25 */
  {
    id: "tx:CM25",
    aliases: ["CM25 (Variable capacity leveling: Online)"],
    evidence: [
      CM25_SIMPL_ITEM,
      {
        sourceType: "sap_help",
        sourceTitle: "Execute Capacity Planning",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/2225bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        verificationLevel: "sap_official_verified",
        claim:
          "רשומת החיפוש (loio 2225bf53d25ab64ce10000000a174cb4, PFCG Role 'Execute Capacity Planning', SAP S/4HANA " +
          "2025 FPS01) מציגה ב-snippet את השורה 'CM25 Variable capacity leveling: Online' בתוך רשימת הטרנזקציות של " +
          "התפקיד, לצד CM23 ו-CM40. הדבר מאשר ש-CM25 מוגדרת בתפקיד PFCG תקני ב-S/4HANA On-Premise 2025 FPS01 תחת " +
          "השם 'Variable capacity leveling: Online', ומראה שהקוד מופיע בתפקיד תקני בגרסה זו.",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#CM25 ו-domains.ts#pppi-capacity-planning",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#CM25",
        claim:
          "הרשומה ב-tcode-catalog.ts מזהה את CM25 כ'תכנון קיבולת: איזון גרפי' (Capacity Planning: Leveling " +
          "(Graphical)), מודול PP, תחום 'תכנון קיבולת'. רשומת התחום pppi-capacity-planning ב-domains.ts כוללת את " +
          "CM25 ברשימת ה-tcodes של תהליך איזון הקיבולת, יחד עם CM01, CM21, CM07 ו-CM50.",
      },
    ],
    status: {
      status: "compatibility_scope",
      he:
        "CM25 (תכנון קיבולת: איזון גרפי), יחד עם קבוצת הטרנזקציות המבוססות על לוח תכנון גרפי (Gantt-chart, כגון " +
        "CM21-CM23, CM29; ב-MF50 רק לוח התכנון הגרפי כפוף ל-scope), נכללת ב-SAP S/4HANA compatibility scope: זמינה " +
        "בגרסת On-Premise אך כפופה לזכויות שימוש מוגבלות ולתאריך תפוגה לפי הערה 2269324, מכיוון שלוח התכנון הגרפי " +
        "שלה פועל רק ב-SAP GUI ואינו תואם לדרישת Zero footprint של S/4HANA.",
      edition: "on-premise",
      release: "2025.001",
      source: CM25_SIMPL_ITEM,
      recommendedAction:
        "לתעד את היקף השימוש הנוכחי ב-CM25 ובקבוצת ה-CM* המבוססת על לוח תכנון גרפי, ולבחון מעבר הדרגתי, לפני תפוגת " +
        "ה-compatibility scope, למודול Capacity Planning and Scheduling (CPS, הכולל את האפליקציה Manage Work Center " +
        "Capacity F3289 לזיהוי עומסי יתר) או ל-Production Planning and Detailed Scheduling (PP/DS); הפריט הרשמי " +
        "אינו מייעד אפליקציית Fiori יחידה כמחליפה ישירה של CM25 עצמה.",
    },
    xrefs: ["tx:CM21", "fiori:F3289"],
    lastVerifiedAt: DATE24,
    notes:
      "הליד מהאינדקס simpl-tcode-index.json ל-2023 (שורות 42099 ו-42142 ב-scratchpad/official/SIMPL_OP2023.pdf.txt) " +
      "תויג בטעות כפריט 30.9 S4TWL - ANSI/ISA S95 Interface. השורות שייכות בפועל לפריט 30.35 S4TWL - Graphical " +
      "Planning Table (2023 FPS03, הערה 2268050), הקובע: 'Transactions CM21, CM22, CM23, CM25, etc with graphical " +
      "planning table are still available in SAP S/4HANA on-premise edition, but not considered as the target " +
      "architecture' ומשייך את Graphical Planning Table ל-compatibility scope; הדבר עקבי עם פריט 9.5.4 ב-2025 ואינו " +
      "סותר אותו. פריט 30.9 עצמו (שורות 39835-39859, רכיב LO-S95) נבדק ואינו מזכיר את CM25 (Old: ליד 30.9 → New: " +
      "30.35). בדיקת scripts/fal-app.mjs --tcode CM25 --release S32OP החזירה תוצאה שלילית מתועדת: 'leading app(s): " +
      "none; GUI app entry: none', כלומר אין ב-Fiori Apps Library רשומת אפליקציה שמובילה במפורש מ-CM25 בשחרור זה. " +
      "לא בוצעה בדיקה חיה במערכת SAP (sc4sap MCP לא זמין בסשן זה).",
  },

  /* ----------------------------------------------------- tx:C223 */
  {
    id: "tx:C223",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - BOM, Routing, Production Version (SAP S/4HANA 2025 FPS01 Simplification List, item 10.4.26; " +
          "באותה כותרת ב-2023 FPS03, item 28.7)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הפריט קובע ש'Production versions are mandatory in S/4HANA': MRP, יצירת הזמנה מתוכננת ויצירת הזמנת ייצור " +
          "מוצאות חלופת BOM ו-Routing רק אם קיימת גרסת ייצור מתוחזקת ('MRP, planned order creation, and production " +
          "order creation only find a BOM and routing alternative if a production version is maintained'). קוד " +
          "הטרנזקציה C223 מופיע רק ברשימת 'Other Terms' של הפריט, לצד MM01, MM02 ואחרים; גוף הפריט אינו קובע " +
          "החלפה, הסרה או שינוי של C223 עצמה, ולכן זהו אזכור בלבד ולא פסיקה על סטטוס הטרנזקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production version | Data Migration",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/7616dd5674514f31ad3b7e1db5bba0cd.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "המדריך מציין שלאימות נתוני גרסת ייצור לאחר מיגרציה ניתן להשתמש ב-'App: Manage Production Versions (C223)' " +
          "או בטרנזקציה 'Maintain Production Versions (C223)' (לצד Display Material MM03, מסך MRP 4). כלומר במדריך " +
          "2025 FPS01, C223 מוצעת כאפליקציה וכטרנזקציית GUI תקפות לאימות גרסאות ייצור לאחר מיגרציה.",
        verificationLevel: "sap_official_verified",
      },
      C223_FAL,
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#C223",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מגדירה את C223 כ'תחזוקת גרסת ייצור' (Maintain Production Version), מודול PP, תחום 'מסלולי " +
          "ייצור'; תואם לשם שבמקורות הרשמיים.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#C223",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "C223 (תחזוקת גרסת ייצור) מתועדת ב-FAL כ-Published ב-SAP S/4HANA on-premise 2025 FPS01 (S32OP), ללא " +
        "predecessor או successor, ברשימת releases רציפה מ-1610. פריט ה-S4TWL 'BOM, Routing, Production Version' " +
        "קובע שגרסת ייצור היא חובה ב-S/4HANA, אך אינו קובע החלפה או שינוי של הטרנזקציה C223 עצמה.",
      edition: "on-premise",
      release: "2025.001",
      source: C223_FAL,
      recommendedAction:
        "להמשיך להשתמש ב-C223 לתחזוקת גרסאות ייצור, ולוודא לפני המרה שקיימת גרסת ייצור מתוחזקת לכל חומר שעובר MRP " +
        "והזמנות ייצור, שכן לפי פריט ה-S4TWL גרסת ייצור היא חובה ב-S/4HANA. אפליקציית Fiori elements F2568 מבוססת " +
        "על אותה טרנזקציה מובילה, אך אינה רשומה כ-successor.",
    },
    xrefs: ["tx:C201", "tx:C202", "tx:C203", "tx:MM02", "table:MKAL", "table:MAST"],
    lastVerifiedAt: DATE24,
    notes:
      "נבדק: sap-help-search ('C223 production version') הניב את מדריך Data Migration 2025.001 (loio " +
      "7616dd5674514f31ad3b7e1db5bba0cd) שמציע את C223 כאפליקציה וכטרנזקציה לאימות גרסאות ייצור לאחר מיגרציה. " +
      "fal-app.mjs C223 --release S32OP מאשר Published, ללא predecessor או successor; fal-app.mjs --tcode C223 " +
      "--release S32OP מונה גם את F2568 (Fiori elements) כאפליקציה שמובילה מ-C223, ו-fal-app.mjs F2568 --release " +
      "S32OP מראה שגם לה אין predecessor או successor, כך שאין קשר successor רשמי ביניהן; F2568 לא נוספה כ-xref כי " +
      "אינה קיימת ב-data/fiori/apps.ts. פריט S4TWL 'BOM, Routing, Production Version' (2025 FPS01 item 10.4.26) " +
      "נקרא בטקסט המלא (scratchpad/official/SIMPL_OP2025.pdf.txt, שורות 53199-53288): הוא עוסק בחובת גרסת ייצור, " +
      "ו-C223 מופיע בו ברשימת Other Terms (שורה 53228, המופע היחיד של המחרוזת בקובץ). ברשימת 2023 FPS03 הפריט " +
      "באותה כותרת הוא item 28.7 ו-C223 מופיע ב-Other Terms שלו (SIMPL_OP2023.pdf.txt שורה 36655, לפי " +
      "simpl-tcode-index.json); גופי שני הפריטים לא הושוו זה לזה. סטטוס: הטיוטה נשאה s4_native, שהתווית שלו 'חדש " +
      "ב-S/4HANA' מתארת אובייקט ללא מקבילה ישירה ב-ECC; אף מקור שנבדק אינו קובע זאת, ורשומת החיפוש של SAP ERP 6.0 " +
      "EHP8 'Transactions' (SAP for Automotive, versionId 6.18.latest, loio 4ce6c353b677b44ce10000000a174cb4) " +
      "מדפיסה בסניפט 'You can also maintain the production version in transaction C223'. לכן נכתב unchanged, כנוהג " +
      "הרשומות COHVPI, CORZ ו-CK11N (Published ב-FAL, ללא successor) (Old: s4_native → New: unchanged). הרשומה " +
      "מחליפה את הרשומה שנוצרה אוטומטית ל-C223 ב-data/verification/transactions-auto.ts. לא בוצעה בדיקה במערכת " +
      "SAP חיה.",
  },
];
