/* Project NEO · verification overlay — transactions (`tx:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02): 16 records carrying Tier-1 evidence from
   help.sap.com search records and the official Simplification List PDFs
   (scripts/sap-help-search.mjs; loio + versionId re-verified live at audit),
   alongside Tier-2 repository evidence, plus the tx:MIGO worked example.
   Every claim is bounded by the snippet or the named repository record;
   auditor downgrades applied in full. Open conflicts live in
   audit/s4-enrichment/research-queue-transactions.md. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";

/* ------------------------------------------------------------- shared docs */

/** Simplification List for SAP S/4HANA 2023 FPS3 · item 27.6 (MM-IM-GF). */
const SIMPL2023_MMIM = (claim: string): Evidence => ({
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 — Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt: DATE2,
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

/* ---------------------------------------------------------------- records */

export const TX_VERIFICATION: VerificationRecord[] = [
  {
    id: "tx:MIGO",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "שכבת מחזור החיים של הטרנזקציות בפרויקט (LIFECYCLE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "MIGO פעילה ומרכזית ב-S/4HANA: תנועות הסחורה נרשמות ל-MATDOC, והיא החלופה לטרנזקציות ה-MB " +
          "שהוסרו (MB1A, MB1B, MB1C ודומותיהן). כחלופת Fiori רשומה Post Goods Movement (F0843).",
        verificationLevel: "repository_verified",
        repoRef: "data/lifecycle.ts#MIGO",
      },
    ],
    xrefs: ["table:MSEG", "table:MKPF", "fm:BAPI_GOODSMVT_CREATE", "fiori:F0843"],
    lastVerifiedAt: DATE,
    notes: "רשומת עבודה של שלב היסוד: ראיה אחת מן המאגר; תיעוד רשמי יתווסף בשלב האיסוף.",
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
];
