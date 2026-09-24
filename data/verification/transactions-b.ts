/* Project NEO · S/4HANA verification overlay · transactions, shard B.
   ----------------------------------------------------------------------------
   Same contract as transactions.ts (VerificationRecord[], see lib/evidence/types.ts).
   A second research chain writes here while the first keeps transactions.ts, so
   two writers never edit one file; data/verification/index.ts merges both and
   throws on a duplicate id. Add DATE constants here as records need them.
   Batch 1 (research + adversarial audit 2026-09-24, written the same day): 8
   audited records for MM-IM / MM-PUR codes the PM and PP-PI processes call
   (MB04, MB05, MB22, MB56, MBRL, ME21N, ME24, ME25). Every claim is bounded by
   the search-record snippet, the topic body read through the portal content
   service, the Simplification List PDF page read, the fal-app.mjs output or the
   named repository record; auditor downgrades applied in full; no record carries
   a reviewer field. Open repository conflicts live in
   audit/s4-enrichment/research-queue-transactions-b.md.
   Batch 2 (research + adversarial audit 2026-09-24, written the same day): 7
   audited records for MM-PUR codes (ME27, ME28, ME2L, ME2M, ME2N, ME41, ME43);
   tx:ME42 was refuted at the gate and sits in the research queue. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE24 = "2026-09-24";

/* ------------------------------------------------------------- shared docs */

/** Simplification List for SAP S/4HANA 2023 FPS3 · item 27.6 (MM-IM-GF); the
 *  same helper as transactions.ts (re-declared: overlay files carry no value
 *  imports). */
const SIMPL2023_MMIM = (claim: string, accessedAt: string = DATE24): Evidence => ({
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

/* status sources that must be shared between evidence[] and status.source */

const MB04_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 15.3.9 S4TWL - AVAILABILITY " +
    "OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 15.3.9 (עמ' 1486-1487, Document Version 1.36) נוקב ב-MB04 פעמיים. ברשימת טרנזקציות ה-MB ש-'have " +
    "been replaced by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE " +
    "and BAPI_GOODSMVT_CANCEL' (‏'MB01, MB02, MB03, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, " +
    "MBRL, MBSF, MBSL, MBST, MBSU and MBBM'), ובסעיף הפתרון: 'Replace customer coding using the " +
    "transaction codes MB01, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL and " +
    "MBSU (e.g. by suing CALL TRANSACTION MBxy) by make use of function module BAPI_GOODSMVT_CREATE' " +
    "(כלשונו). הפריט קובע: 'These transaction do still exist as transaction codes but calling these " +
    "transaction codes from the menu has the consequence that an error message is raised', 'The " +
    "transaction codes will be deprecated in the near future', ולעניין ECC‏: 'Transaction were alreday " +
    "outdated in SAP ERP 6.0x' (כלשונו). ‏SAP Notes 2210569 ו-2319579 מודפסים בגוף הפריט. לפי כותרת המסמך " +
    "הוא חל גם על SAP S/4HANA Cloud Private Edition 2025 FPS1.",
  verificationLevel: "sap_official_verified",
};

const MB05_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 FPS1 · 15.3.9 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM " +
    "(MM-IM-GF)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "הרשימה העדכנית (Document Version 1.36, פריט 15.3.9, רכיב יישום MM-IM-GF, עמ' 1486-1487) חוזרת על " +
    "אותו פריט באותו נוסח: MB05 נמנית בשני המקומות, ברשימת הקודים ש-'have been replaced by the " +
    "single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
    "BAPI_GOODSMVT_CANCEL', וברשימת הקודים שקוד לקוח הקורא להם יש להחליף ב-BAPI_GOODSMVT_CREATE ('Replace " +
    "customer coding using the transaction codes MB01, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, " +
    "MBNL, MBRL, MBSF, MBSL and MBSU'). הפתרון בדיאלוג: 'Use transaction MIGO or MMBE in dialog.' הקודים " +
    "עדיין קיימים, קריאה מהתפריט מעלה הודעת שגיאה, והם 'will be deprecated in the near future'. הערת " +
    "ה-Business Impact נכתבת כאן 0002210569, ומנגנון הנעילה הישן מפנה ל-note 2319579. לפי כותרת המסמך " +
    "הפריט חל גם על SAP S/4HANA Cloud Private Edition 2025 FPS1. גם כאן אין תיאור של הפונקציה של MB05 " +
    "ואין אפליקציית Fiori או טרנזקציה ייעודית הנקובות עבורה.",
  verificationLevel: "sap_official_verified",
};

const MB22_ROLE_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Reservations (MM-IM) | Materials Management (MM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/5607b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE24,
  claim:
    "עמוד התפקיד Reservations (MM-IM) בדליברבל Materials Management (MM) לגרסת S/4HANA On-Premise 2025 " +
    "FPS01 (loio 5607b753128eb44ce10000000a174cb4, תאריך 2026-02-24) קובע בתקציר 'Technical name: " +
    "SAP_MM_IM_RESERVATION_MAINTAIN' ו-'The user has the task of creating, displaying, and if required, " +
    "changing reservations for material', ובטבלת 'Activities in Materials Management' מונה 'Create " +
    "Reservation MB21 Change Reservation MB22 Display Reservation MB23 List of Reservations MB25'. כלומר " +
    "בתיעוד 2025 FPS01 קוד הטרנזקציה של הפעילות Change Reservation (שינוי שמורה) הוא MB22. התקציר אינו " +
    "מזכיר החלפה, הסרה או אפליקציית Fiori; המשך התקציר ('He or she can also list reservations accordi') " +
    "נקטע ולא צוטט.",
  verificationLevel: "sap_official_verified",
};

const MB56_SIMPL2023: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 30.27 S4TWL - Batch History " +
    "(LO-BM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 30.27 (עמ' 798-799; SAP Note 2270242 כלשון המסמך) עוסק ב-Batch History, יומן השינויים של רשומת " +
    "אב אצווה בודדת ב-Batch Information Cockpit, וקובע במפורש שרשימת השימוש באצווה אינה מושפעת: 'No " +
    "influence on business processes expected. The batch-where used functionality (transaction MB56, " +
    "bottom-up/top-down analysis) are not affected at all.' הפריט מזהיר: 'It must NOT be confused with " +
    "the batch where-used list or the SAP Global Batch Traceability solution', ומוסיף שקודי הטרנזקציה של " +
    "Batch History עצמם 'are still available within SAP S/4HANA, on-premise edition when the respective " +
    "switch is activated'. זהו הפריט היחיד ברשימת 2023 FPS3 הנוקב ב-MB56; פריט 30.9 S4TWL - ANSI/ISA S95 " +
    "Interface (עמ' 751) אינו מזכיר אותה.",
  verificationLevel: "sap_official_verified",
};

const MBRL_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item " +
    "15.3.9 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF), pp. 1486-1487",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 15.3.9 (רכיב יישום MM-IM-GF) נקרא במלואו מהקובץ שהורד וחולץ לטקסט, ו-MBRL נקובה בו פעמיים. " +
    "ראשית ברשימת 'MB transactions' ש-'have been replaced by the single-screen generalized transaction " +
    "MIGO or the BAPI's BAPI_GOODSMVT_CREATE and BAPI_GOODSMVT_CANCEL' (הרשימה: MB01, MB02, MB03, MB04, " +
    "MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU and MBBM), ושנית בשורת " +
    "הפתרון: 'Replace customer coding using the transaction codes MB01, MB04, MB05, MB0A, MB11, MB1A, " +
    "MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL and MBSU (e.g. by suing CALL TRANSACTION MBxy) by make use " +
    "of function module BAPI_GOODSMVT_CREATE'. הפריט קובע: 'These transaction do still exist as " +
    "transaction codes but calling these transaction codes from the menu has the consequence that an " +
    "error message is raised', 'The transaction codes will be deprecated in the near future', 'Use " +
    "transaction MIGO or MMBE in dialog', ובסיבה: 'Transaction were alreday outdated in SAP ERP 6.0x'. " +
    "מ-S/4HANA OP1610 ומעלה MIGO ו-BAPI_GOODSMVT_CREATE משתמשים במנגנון נעילה חדש, והטרנזקציות הישנות " +
    "במנגנון הישן ('see note 2319579'), ולכן רישום מקבילי עלול ליצור אי-עקביות מלאי. הערת ה-Business " +
    "Impact 0002210569 'Obsolete Material inventory management transactions' מודפסת בטבלת הפריט; שני " +
    "המספרים מצוטטים מן המסמך בלבד.",
  verificationLevel: "sap_official_verified",
};

const ME21N_PROCESS_PO_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE24,
  claim:
    "בטבלת הפעילויות של Materials Management במהדורת 2025 FPS01 (versionId 2025.001, loio " +
    "8307b753128eb44ce10000000a174cb4) הפעילות 'Create purchase order' ממופה לטרנזקציה ME21N, לצד 'Create " +
    "purchase order - vendor unknown' ME25, 'Change purchase order' ME22N ו-'Display purchase order' " +
    "ME23N, וכן ME56, ME57 ו-ME58; כלשון הסניפט: 'It enables you not only to create and change purchase " +
    "orders, but also to convert requisitions into orders'. ME21N היא מיפוי הפעילות הסטנדרטי ליצירת הזמנת " +
    "רכש ב-S/4HANA On-Premise.",
  verificationLevel: "sap_official_verified",
};

const ME24_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item " +
    "14.2.8 S4TWL - Classic MM-PUR GUI Transactions replacement (MM-PUR-GF), pp. 1418-1419",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.2.8 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום MM-PUR-GF; הערת Business " +
    "Impact 0002267449 'Classic MM-PUR GUI Transactions replacement' בטבלת ה-Related Notes של הפריט) מונה " +
    "את ME24 בשמה בטבלה שכותרתה 'Transactions are NO longer supported in SAP S/4HANA on-premise edition', " +
    "לצד ME21, ME22, ME23, ME25, ME27, ME28, ME51, ME52, ME53, ME54, ME59, MR01 ו-MR1M, ובטבלה הסמוכה " +
    "'BAPIs are NO longer supported in SAP S/4HANA on-premise edition' את BAPI_PO_CREATE, " +
    "BAPI_REQUISITION_CREATE ו-BAPI_PO_GETDETAIL. תיאור הפריט בלשונו: 'Classic SAP ERP Materials " +
    "Management (MM) transactions and BAPIs for the business objects Purchase Order, Purchase " +
    "Requisition, and Supplier Invoice have been replaced by the corresponding transactions and BAPIs " +
    "made available with SAP R/3 Enterprise 4.70. With SAP S/4HANA, on-premise, these classic MM " +
    "transactions and BAPIs are NO longer supported. The replacements that are available since SAP R/3 " +
    "Enterprise 4.70 shall be used.'; תחת Business Process related information: 'No influence on business " +
    "processes expected.'; ותחת Required and Recommended Action(s): 'See SAP notes: 1803189: FAQ: End of " +
    "Support of ME21, ME51, and BAPI_PO_CREATE etc.' ו-'144081: Replacing MR01 / Functions of MR1M " +
    "(Release 4.6)'. הפריט אינו נוקב בטרנזקציה עוקבת ספציפית ל-ME24: ההחלפה מנוסחת למשפחה כולה.",
  verificationLevel: "sap_official_verified",
};

const ME25_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
    "Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 14.2.8 S4TWL - Classic MM-PUR GUI " +
    "Transactions replacement (MM-PUR-GF), pp. 1418-1419",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.2.8 ‏(Application Component: MM-PUR-GF; Business Impact note 0002267449 'Classic MM-PUR GUI " +
    "Transactions replacement', כפי שהודפס) מתחיל בעמ' 1418, ובעמ' 1419 מונה את ME25 בשמה בטבלת הפריט, " +
    "בשורה 'Transactions are NO longer supported in SAP S/4HANA on-premise edition', לצד ME21, ME22, " +
    "ME23, ME24, ME27, ME28, ME51, ME52, ME53, ME54, ME59, MR01 ו-MR1M (השורה השנייה, 'BAPIs are NO " +
    "longer supported in SAP S/4HANA on-premise edition', מונה את BAPI_PO_CREATE, BAPI_REQUISITION_CREATE " +
    "ו-BAPI_PO_GETDETAIL). ה-Description של הפריט: 'Classic SAP ERP Materials Management (MM) " +
    "transactions and BAPIs for the business objects Purchase Order, Purchase Requisition, and Supplier " +
    "Invoice have been replaced by the corresponding transactions and BAPIs made available with SAP R/3 " +
    "Enterprise 4.70. With SAP S/4HANA, on-premise, these classic MM transactions and BAPIs are NO longer " +
    "supported. The replacements that are available since SAP R/3 Enterprise 4.70 shall be used', ותחת " +
    "Business Process related information: 'No influence on business processes expected'. הפעולה הנדרשת " +
    "מפנה ל-SAP Notes: '1803189: FAQ: End of Support of ME21, ME51, and BAPI_PO_CREATE etc.' ו-'144081: " +
    "Replacing MR01 / Functions of MR1M (Release 4.6)'. הפריט אינו נוקב בטרנזקציה עוקבת ספציפית ל-ME25 " +
    "ואינו קובע גרסת הסרה; מספרי ה-SAP Notes מובאים כפי שהודפסו בפריט ולא נקראו. הטקסט נקרא מחילוץ ה-PDF " +
    "(Document Version 1.36, ‏1,514 עמודים); כתובת הקובץ החזירה ב-2026-09-24 ‏HTTP 200 עם content-length " +
    "של 10,585,218 בתים.",
  verificationLevel: "sap_official_verified",
};

/* batch 2 (2026-09-24): shared status sources for ME27, ME28, ME2L, ME2M, ME2N, ME41, ME43 */

const ME27_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (Document Version 1.36) · item " +
    "14.2.8 S4TWL - Classic MM-PUR GUI Transactions replacement (MM-PUR-GF), pp. 1418-1419",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.2.8 ברשימת הפישוט הרשמית של SAP S/4HANA 2025 FPS01 (רכיב יישום MM-PUR-GF; הערת Business " +
    "Impact 0002267449 'Classic MM-PUR GUI Transactions replacement') מונה את ME27 בשמה בטבלה שכותרתה " +
    "'Transactions are NO longer supported in SAP S/4HANA on-premise edition', לצד ME21, ME22, ME23, " +
    "ME24, ME25, ME28, ME51, ME52, ME53, ME54, ME59, MR01 ו-MR1M, ובטבלה הסמוכה 'BAPIs are NO longer " +
    "supported in SAP S/4HANA on-premise edition' את BAPI_PO_CREATE, BAPI_REQUISITION_CREATE " +
    "ו-BAPI_PO_GETDETAIL. תיאור הפריט בלשונו: 'Classic SAP ERP Materials Management (MM) transactions and " +
    "BAPIs for the business objects Purchase Order, Purchase Requisition, and Supplier Invoice have been " +
    "replaced by the corresponding transactions and BAPIs made available with SAP R/3 Enterprise 4.70. " +
    "With SAP S/4HANA, on-premise, these classic MM transactions and BAPIs are NO longer supported. The " +
    "replacements that are available since SAP R/3 Enterprise 4.70 shall be used.'; תחת Business Process " +
    "related information: 'No influence on business processes expected.'; ותחת Required and Recommended " +
    "Action(s): 'See SAP notes: 1803189: FAQ: End of Support of ME21, ME51, and BAPI_PO_CREATE etc.' " +
    "ו-'144081: Replacing MR01 / Functions of MR1M (Release 4.6)'. הפריט אינו נוקב בטרנזקציה עוקבת " +
    "ספציפית ל-ME27: ההחלפה מנוסחת למשפחה כולה של הטרנזקציות הקלאסיות.",
  verificationLevel: "sap_official_verified",
};

const ME28_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
    "Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 14.2.8 S4TWL - Classic MM-PUR GUI " +
    "Transactions replacement (MM-PUR-GF), pp. 1418-1419",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.2.8 (עמ' 1418-1419) קובע: 'Classic SAP ERP Materials Management (MM) transactions and BAPIs " +
    "for the business objects Purchase Order, Purchase Requisition, and Supplier Invoice have been " +
    "replaced by the corresponding transactions and BAPIs made available with SAP R/3 Enterprise 4.70. " +
    "With SAP S/4HANA, on-premise, these classic MM transactions and BAPIs are NO longer supported.' ME28 " +
    "מנוי כלשונו בטבלת 'Transactions are NO longer supported in SAP S/4HANA on-premise edition' (עמ' " +
    "1419, בין ME27 ל-ME51), לצד ME21, ME22, ME23, ME24, ME25, ME27, ME51-ME54, ME59, MR01, MR1M. הפריט " +
    "אינו נוקב בטרנזקציה עוקבת ייעודית ל-ME28; ה-Solution מפנה כלליות ל'replacements that are available " +
    "since SAP R/3 Enterprise 4.70' בלי לשמם עבור כל קוד בנפרד. ההערות המצוינות (כפי שהודפסו, לא נקראו): " +
    "1803189 ('FAQ: End of Support of ME21, ME51, and BAPI_PO_CREATE etc.'), 144081; Business Impact note " +
    "0002267449.",
  verificationLevel: "sap_official_verified",
};

const ME2L_ROLE_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Lists of Purchase Orders (MM-PUR) | Materials Management (MM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE24,
  claim:
    "הנושא Lists of Purchase Orders (MM-PUR) בתיעוד S/4HANA 2025 FPS01 (loio " +
    "8d06b753128eb44ce10000000a174cb4, versionId 2025.001, תאריך 2026-02-24; רשומת החיפוש אומתה " +
    "ב-sap-help-search.mjs). גוף הנושא, שנקרא דרך sap-help-body.mjs (deliverable 40374615), מונה בטבלת " +
    "'Activities in Materials Management' את השורה 'Purchase orders by vendor ME2L' לצד ME2M, ME2K, ME2J, " +
    "ME2C, ME2B, ME2N, ME2W, MSRV3 ו-ME2S, ומציג את השאלה העסקית 'What is the status of purchase orders " +
    "issued to a certain vendor?'. הסניפט של רשומת החיפוש מציג את הכותרת, את השם הטכני " +
    "SAP_MM_PUR_PURCHASEORDER_LISTS וחלק מהקודים (ME2W, MSRV3, ME2S, ME2J, ME2C, ME2B), לא את שורת ME2L " +
    "עצמה. זהו תיעוד פעיל של ME2L כטרנזקציית דיווח סטנדרטית במהדורה הנוכחית, לא הצהרה על שינוי מעמד.",
  verificationLevel: "sap_official_verified",
};

const ME2M_ROLE_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Lists of Purchase Orders (MM-PUR)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE24,
  claim:
    "העמוד 'Lists of Purchase Orders (MM-PUR)' (SAP S/4HANA 2025 FPS01, נושא Materials Management (MM)) " +
    "מציג את טבלת הפעילויות של הדיווח על הזמנות רכש ובה השורה: 'Purchase orders by material ME2M', לצד " +
    "ME2L (לפי ספק), ME2K (לפי הקצאת חשבון), ME2J (לפי פרויקט), ME2C (לפי קבוצת חומרים), ME2B, ME2N " +
    "ו-ME2W. הראיה מבססת ש-ME2M מתועדת כטרנזקציית הדיווח 'הזמנות רכש לפי חומר' במהדורת S/4HANA העדכנית " +
    "שנבדקה.",
  verificationLevel: "sap_official_verified",
};

const ME2N_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle:
    "Fiori Apps Library · App ME2N 'Display Purchasing Documents by Number' (SAP GUI), release S32OP (SAP " +
    "S/4HANA 2025 FPS01, On-Premise)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('ME2N')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת Fiori Apps Library למזהה 'ME2N' מציגה אותו כאפליקציית 'SAP GUI' בשם 'Display Purchasing " +
    "Documents by Number', סטטוס Published, רכיב MM-PUR (Purchasing), עם GUI transaction מוביל ME2N " +
    "(related: ME2N), technical catalog SAP_TC_PRC_BE_APPS:S4PRC, intent " +
    "PurchasingDocument-displayByDocumentNumber. שדה ה-releases מפרט זמינות רציפה מ-S6OP (SAP S/4HANA " +
    "1610) דרך S27OP (2023) ועד S32OP (2025 FPS01, On-Premise) ו-S32PCE (2025 FPS01, Private Cloud) כאחד; " +
    "predecessors ו-successors שניהם ריקים ('-').",
  verificationLevel: "sap_official_verified",
};

const ME41_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 14.4.1 S4TWL - RFQ Simplified " +
    "Transaction (Sourcing and Contract Management, MM-PUR-RFQ)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.4.1 (עמ' 1429-1430, SAP Note 2332710 מודפס בגוף הפריט) קובע: 'The following transactions are " +
    "deprecated in SAP S/4HANA: ME41 ME42 ME43 ME44 ME45 ME47 ME48 ME49 ME4B ME4C ME4L ME4M ME4N ME4S' " +
    "(כלשונו). הפריט מסביר שהגישה הקודמת ל-RFQ כללה שדה ספק חובה ומוגבל לספק אחד בלבד, ושהגישה החדשה " +
    "מאפשרת שליחת RFQ שנוצר באפליקציית Fiori לפלטפורמות sourcing חיצוניות בלי לנקוב ספק מדויק; לגבי " +
    "הטרנזקציות הקלאסיות (ME41 בכללן) נכתב במפורש: 'the functionality is currently available in SAP " +
    "S/4HANA but it is not considered as future technology and a functional equivalent is not available' " +
    "(כלשונו). בסעיף 'Business Process Related Information' נכתב: 'If you want to use functionality " +
    "related to sourcing of goods and services, you can use the following apps: Manage RFQs (F2049), " +
    "Monitor RFQ Items (F2425), Request for Quotation Types (F4149), Manage Supplier Quotations (F1991), " +
    "Compare Supplier Quotations (F2324)' (כלשונו); זו המלצה ברמת תהליך העסקי ולא הצהרה מפורשת שאפליקציה " +
    "בודדת היא היורשת הפורמלית של ME41.",
  verificationLevel: "sap_official_verified",
};

const ME43_SIMPL2023: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 38.7 S4TWL - RFQ Simplified " +
    "Transaction (SAP Note 2332710)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  accessedAt: DATE24,
  claim:
    "הפריט קובע במפורש (עמ' 957-958, Note 2332710 כלשון המסמך): 'The following transactions are " +
    "deprecated in SAP S/4HANA: ME41 ME42 ME43 ME44 ME45 ME47 ME48 ME49 ME4B ME4C ME4L ME4M ME4N ME4S' " +
    "(כלשונו), ורשימת שמות הטרנזקציות המקבילה כוללת עבור ME43 את 'Display'. תחת Business Process Related " +
    "Information הפריט מציע כחלופה עסקית לתהליכי sourcing את אפליקציות ה-Fiori 'Manage RFQs (F2049)', " +
    "'Monitor RFQ Items (F2425)', 'Request for Quotation Types (F4149)', 'Manage Supplier Quotations " +
    "(F1991)' ו-'Compare Supplier Quotations (F2324)', ומנחה לסגור (status 'Completed') RFQ שנוצרו " +
    "בטרנזקציות הישנות לפני המעבר לאפליקציות אלה. הפריט אינו קובע מיפוי 1:1 בין ME43 הספציפית לבין " +
    "אפליקציה יחידה מתוך החמש.",
  verificationLevel: "sap_official_verified",
};

export const TX_VERIFICATION_B: VerificationRecord[] = [
  {
    id: "tx:MB04",
    evidence: [
      MB04_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF " +
          "TRANSACTIONS IN MM-IM (MM-IM-GF)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט 27.6 (עמ' 644-646, Document Version 1.35, 2025-02-25) נושא את אותו טקסט: MB04 נמנית ברשימת " +
          "טרנזקציות ה-MB שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE ‏/ BAPI_GOODSMVT_CANCEL (עמ' 645), ושוב " +
          "ברשימת הקודים שיש להחליף בקוד לקוח ב-BAPI_GOODSMVT_CREATE (עמ' 645). אותן קביעות: הקודים עדיין " +
          "קיימים, קריאה מהתפריט מעלה הודעת שגיאה, והם 'will be deprecated in the near future'. אף אחת משתי " +
          "מהדורות הרשימה אינה נוקבת בגרסת הסרה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MRO Subcontracting in Goods Movements | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78dbc353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "תיעוד תחזוקת המפעל (Maintenance Management) של S/4HANA On-Premise 2025 FPS01 קובע בסניפט: 'You can " +
          "subsequently adjust subcontractor stock using the subcontracting subsequent adjustment function in " +
          "transactions MB04 or MIGO.' ‏MB04 עדיין מתועדת לצד MIGO לאותה פונקציה בתרחיש קבלנות משנה ל-MRO; עקבי " +
          "עם 'הקוד קיים' ואינו עקבי עם הסרה קשיחה. אותו loio מופיע גם בתיעוד SAP ERP 6.0 EHP8 (Plant " +
          "Maintenance) באותו נוסח.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Post Subsequent Adjustment | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/79824a704b7742ff8252c0c8575fbea3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט קובע: 'Post Subsequent Adjustment App ID: F5476 With this app, you can carry out a subsequent " +
          "correction posting of components from the subcontracting purchasing document.' וכן: 'Provide an " +
          "alternative option to subsequent posting instead of using the Post Goods Movement app (Web GUI app; " +
          "transaction code MIGO) with a separate process step (Subsequent Adjustment).' זו חלופת ה-Fiori " +
          "הרשמית לתרחיש של MB04, בשם ובמזהה אפליקציה, לצד הצעד Subsequent Adjustment ב-MIGO. הסניפט מציין גם: " +
          "'Posting of subcontracting with special stock E (Sales Order Stock) and Q (Project Stock) are not " +
          "supported in the cloud environment.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/3b07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "העמדה ב-ECC: תיעוד התפקיד Goods Movement (MM-IM) ‏('Technical name: SAP_MM_IM_GOODS_MOVEMENTS') " +
          "ב-SAP ERP 6.0 EHP8 (versionId 6.18.latest) מונה בטבלת הפעילויות את השורה 'Adjustment for Material " +
          "Provided MB04' (בסניפט היא מופיעה אחרי 'MBSU Subsequent' וקטיעה), לצד ME2O, MBST, MBSU ו-MB90. אותו " +
          "loio ברינדור S/4HANA On-Premise 2025.001 עדיין מציג את אותה שורה (רשומת חיפוש מיום 2026-09-24).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת MB04",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "הרשומה מתעדת את השימוש העסקי: התאמה מאוחרת (Subsequent Adjustment) לצריכת רכיבים שסופקו לקבלן משנה, " +
          "סוגי תנועה 543/544 ומלאי מיוחד O, בתהליך ME21N, ME2O/MB1B, MIGO ואז MB04. בשדה s4 היא קובעת 'זמין " +
          "ב-S/4HANA. תהליך subcontracting משופר ב-S/4 (Advanced Subcontracting Cockpit ו-Fiori)' ושדה fiori " +
          "ריק; מכאן בנאי הטרנזקציות גוזר 'unchanged' ברמת repository_verified (נמדד " +
          "ב-scratchpad/coverage-ids.json, ‏2026-09-24). הניסוח 'זמין' מקל מדי מול פריט הפישוט הרשמי, והשם " +
          "'Advanced Subcontracting Cockpit' לא נמצא באף רשומת Help רשמית (התיעוד הרשמי של MM-IM נוקב " +
          "ב-'Subcontracting Cockpit').",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB04",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MB04_SIMPL2025,
      he:
        "MB04 (התאמה מאוחרת לרכיבים שסופקו לקבלן משנה) נמנית ברשימת הפישוט הרשמית ל-S/4HANA 2025 FPS1 בין " +
        "טרנזקציות ה-MB שהוחלפו בטרנזקציית המסך האחיד MIGO או ב-BAPI_GOODSMVT_CREATE ‏/ BAPI_GOODSMVT_CANCEL " +
        "(פריט S4TWL - Availability of Transactions in MM-IM, ‏SAP Note 2210569; אותו טקסט בפריט 27.6 של " +
        "רשימת 2023 FPS3). קוד הטרנזקציה עדיין קיים, אך קריאה שלו מהתפריט מעלה הודעת שגיאה, ו-SAP מודיעה " +
        "שהקודים יוצאו משימוש בעתיד הקרוב. תיעוד ה-On-Premise של 2025 FPS01 עדיין מזכיר את MB04 לצד MIGO " +
        "לאותה פונקציה, ואפליקציית Fiori ‏Post Subsequent Adjustment ‏(F5476) מתועדת כחלופה לצעד זה.",
      recommendedAction:
        "לרשום התאמות מאוחרות לקבלנות משנה ב-MIGO (הפעולה Subsequent Adjustment) או באפליקציית Post " +
        "Subsequent Adjustment ‏(F5476) לפי תיעוד MM-IM. קוד לקוח שקורא ל-MB04 (למשל CALL TRANSACTION) יש " +
        "להחליף ב-BAPI_GOODSMVT_CREATE. לא לרשום במקביל דרך MB04 ודרך MIGO או ה-BAPI בגלל הבדלי מנגנון הנעילה " +
        "מ-OP1610 (SAP Note 2319579). ליישר את רשומת tx-intel: 'זמין ב-S/4HANA' מפריז, הקוד קיים אך חסום " +
        "מהתפריט; ולהחליף את 'Advanced Subcontracting Cockpit' בשם הרשמי Subcontracting Cockpit או להסירו.",
    },
    xrefs: [
      "tx:MIGO", "tx:MB01", "tx:MB05", "tx:MB1B", "tx:ME2O", "tx:MMBE", "fm:BAPI_GOODSMVT_CREATE",
      "table:MKPF", "table:MSEG", "obj:material-document", "bp:goods-movement-process",
      "bp:ecc-to-s4hana-migration-process",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "מקור הפסיקה: שתי מהדורות רשימת הפישוט הרשמית (PDF ב-help.sap.com): 2025 FPS1 פריט 15.3.9 (עמ' " +
      "1486-1487) ו-2023 FPS3 פריט 27.6 (עמ' 644-646). הטקסט נקרא מחילוץ הטקסט של הפרויקט " +
      "(scratchpad/official, 2026-09-22); ה-md5 של PDF 2025 שבדיסק ושל PDF 2023 שהורד מחדש ביום זה זהים " +
      "לאלה הרשומים ב-audit/master-completion/simpl-tcode-index.json, כך שהציטוטים תואמים את הקבצים " +
      "הרשמיים. שני הפריטים נוקבים ב-MB04 במפורש, גם ברשימת ההחלפה וגם בסעיף הפתרון לקוד לקוח, ולכן הסטטוס " +
      "replaced עם יורש MIGO מבוסס על לשון הפריט ולא על כותרתו. מספרי SAP Notes ‏2210569 ו-2319579 צוטטו " +
      "מגוף ה-PDF בלבד; שדה sapNote לא הוזן (me.sap.com דורש התחברות S-user), והתאריך המודפס בגרסת מסמך " +
      "1.36 של רשימת 2025 משובש ('2026-20-02' כלשונו) ולכן לא נורמל. סתירה תיעודית מוכרת, כמו ב-MB1B " +
      "וב-MB1C: דפי Help של 2025.001 (Maintenance Management, טבלת הפעילויות של MM-IM) עדיין מונים את MB04, " +
      "בעוד הפריט קובע שהוחלפה ושקריאה מהתפריט מעלה שגיאה; שני המקורות מתיישבים בקריאה 'הקוד קיים, מחוץ " +
      "למסלול המומלץ'. גופי דפי ה-Help לא נקראו: שירות התוכן החזיר 'Invalid input parameter' לשתי צורות " +
      "פרמטרים של deliverableMetadata ו-503 (connection limit) לקריאת pagecontent, ולכן כל טענה תחומה " +
      "בכותרת ובסניפט של רשומת החיפוש. ‏F5476 ‏(Post Subsequent Adjustment) אומת רק דרך דף MM-IM המדפיס " +
      "'App ID: F5476' (ומופיע כ-'App New' ב-What's New in SAP S/4HANA 2021, loio " +
      "19b17aaa3159495d933b4a3d829d91a9); חיפוש מוגבל-דומיין בספריית האפליקציות לא החזיר את דף האפליקציה, " +
      "והמזהה אינו קיים ב-data/fiori/apps.ts ולכן אינו ב-xrefs ולא יורש. ‏fiori:F0843 לא נוסף ל-xrefs " +
      "במכוון: לפי דף Help רשמי (loio 9ddf815494758c4ce10000000a4450e5) F0843 הוא Post Goods Receipt for " +
      "Purchasing Document, בעוד data/fiori/apps.ts מכנה אותו Post Goods Movement (שהוא, לפי Feature " +
      "Comparison for Goods Movement, אפליקציית ה-Web GUI במזהה MIGO); הסתירה נרשמה לקטלוג ה-Fiori. בתיעוד " +
      "CWM ל-ERP 6.0 EHP8 (loio b09dcf535b804808e10000000a174cb4) הסניפט קובע 'The standard transaction " +
      "MB04 for entering overconsumption or underconsumption calls transaction MIGO_GS in the background' " +
      "(הסניפט נקטע שם); ברינדור S/4HANA 2025.001 של אותו דף הסניפט מציג רק 'transaction MIGO_GS' ללא MB04, " +
      "ומאחר שהגוף לא נקרא לא נקבע אם MB04 הוסרה ממנו. סוגי התנועה 543/544 ומלאי מיוחד O נלקחו מרשומת " +
      "tx-intel בלבד. ‏BAPI_GOODSMVT_CANCEL, ‏MIGO_DIALOG ו-MBLB אינם מזהים בני-פענוח בדאטהסט ולכן אינם " +
      "ב-xrefs. לא בוצעה בדיקה במערכת SAP חיה (ה-MCP של sc4sap לא התחבר: 'MCP error -32000: Connection " +
      "closed').",
  },
  {
    id: "tx:MB05",
    evidence: [
      SIMPL2023_MMIM(
        "פריט 27.6 (עמ' 644-646, Document Version 1.35 מ-2025-02-25) נוקב ב-MB05 כלשונו פעמיים. בסעיף Symptom " +
        "היא נמנית עם טרנזקציות ה-MB להזנה ולהצגה של תנועות סחורה (MB01, MB02, MB03, MB04, MB05, MB0A, MB11, " +
        "MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU, MBBM) ש-'have been replaced by the " +
        "single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
        "BAPI_GOODSMVT_CANCEL'; בסעיף Solution היא נמנית עם הקודים שקוד לקוח הקורא להם יש להחליף " +
        "ב-BAPI_GOODSMVT_CREATE ('Replace customer coding using the transaction codes MB01, MB04, MB05, MB0A, " +
        "MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL and MBSU (e.g. by suing CALL TRANSACTION MBxy) " +
        "by make use of function module BAPI_GOODSMVT_CREATE'). הפריט קובע שהקודים עדיין קיימים אך קריאה " +
        "מהתפריט מעלה הודעת שגיאה ('These transaction do still exist as transaction codes but calling these " +
        "transaction codes from the menu has the consequence that an error message is raised'), ש-'The " +
        "transaction codes will be deprecated in the near future', ובסעיף Reason and Prerequisites: " +
        "'Transaction were alreday outdated in SAP ERP 6.0x.' (שגיאות הכתיב במקור). מספרי SAP Note 2210569 " +
        "(Business Impact) ו-2319579 (מנגנון הנעילה מ-OP1610) מופיעים כלשונם בגוף הפריט. הפריט אינו מתאר את " +
        "הפונקציה של MB05 ואינו נוקב באפליקציית Fiori עבורה; אפליקציית ה-Fiori היחידה הנזכרת (Stock Overview) " +
        "מתייחסת להחלפת MMBE_OLD ב-MMBE.",
        DATE24,
      ),
      MB05_SIMPL2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) (SAP Library - SAP ERP Central Component)",
        product: "SAP ERP Central Component (SAP Library, NetWeaver 7.0)",
        edition: "ecc",
        release: "SPS12",
        url: "https://help.sap.com/doc/saphelp_nw70/7.0.12/ja-JP/b5/2f2677d6f511d3b7f30000e82de955/content.htm?no_cache=true",
        accessedAt: DATE24,
        claim:
          "דף התפקיד הסטטי של ספריית SAP ל-ERP Central Component נקרא במלואו (HTML של 11,010 בתים; מטא-נתוני " +
          "הדף: product 'SAP NetWeaver 7.0', version 'SPS12', עדכון אחרון 2016-06-21; הטקסט באנגלית למרות מקטע " +
          "הנתיב ja-JP, והנתיב המקביל ב-en-US לא החזיר את גוף הדף ביום הגישה (HEAD: HTTP 403; GET: מעטפת של " +
          "פורטל העזרה ללא טקסט התפקיד)). התפקיד SAP_MM_IM_GOODS_MOVEMENTS מוגדר כרישום וביטול של תנועות סחורה " +
          "'goods receipts, goods issues, transfer postings, subsequent adjustments for subcontracting', וטבלת " +
          "'Activities in Materials Management' שלו מונה: Transfer Posting MB1B, Goods Receipt for Order " +
          "MIGO_GO, Goods Issue MIGO_GI, Goods Receipt from External Procurement MIGO_GR, Goods Movement MIGO, " +
          "Picking List MB26, Monitoring Subcontracting Stocks per Vendor ME2O, Cancel Material Document MBST, " +
          "Store Material Document MBSU, 'Subsequent Adjustment for Material Provided MB04', Output Processing " +
          "for Material Documents MB90. MB05 אינה מופיעה בדף: ההתאמה העוקבת לקבלנות משנה מתועדת ב-ECC תחת MB04 " +
          "(ותחת MIGO), לא תחת MB05. ממצא שלילי תחום לדף זה בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) - רשומת MB05",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המודיעין מתארת את MB05 כ'התאמת צריכה לפי תפוקה בעיבוד משנה (Subsequent Adjustment by Output " +
          "Quantity)', 'variant של subsequent adjustment הקשור ל-MB04', עם שדה s4 'זמין ב-S/4HANA במסגרת תהליכי " +
          "subcontracting.', ללא Fiori, שדה obsolete ריק, alternative MB04 וטבלאות MKPF, MSEG, MSLB. שני פערים " +
          "מול המקור הרשמי: (1) הרשומה מציגה את MB05 כזמינה ב-S/4HANA בלי לציין שפריט הפישוט מונה אותה בין " +
          "הקודים שהוחלפו ב-MIGO או ב-BAPI, שקריאה מהתפריט מעלה שגיאה ושקוד לקוח חייב לעבור " +
          "ל-BAPI_GOODSMVT_CREATE; (2) התיאור הפונקציונלי 'לפי תפוקה' (וכותרת האזור 'חיוב משנה לפי תפוקה') אינו " +
          "נתמך באף כותרת או סניפט רשמי שנמצא ביום הגישה, ולכן נשאר לא-מאומת. ל-MB05 אין רשומה " +
          "ב-data/lifecycle.ts, כך שאין סתירה נוספת בתוך המאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MB05",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MB05_SIMPL2025,
      he:
        "MB05 נמנית כלשונה, בשני מקומות בפריט S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM, עם טרנזקציות " +
        "ה-MB שהוחלפו בטרנזקציית המסך האחד MIGO או ב-BAPI_GOODSMVT_CREATE / BAPI_GOODSMVT_CANCEL (רשימת " +
        "הפישוט הרשמית ל-S/4HANA 2025 FPS1, פריט 15.3.9, ובאותו נוסח ב-2023 FPS3, פריט 27.6). קוד הטרנזקציה " +
        "עדיין קיים, אך קריאה מהתפריט מעלה הודעת שגיאה, ו-SAP מודיעה שהקודים יוצאו משימוש בעתיד הקרוב. הפריט " +
        "אינו מתאר את הפונקציה של MB05 ואינו נוקב באפליקציית Fiori או בטרנזקציה ייעודית אחרת עבורה; היורש " +
        "הנקוב הוא MIGO בדיאלוג ו-BAPI_GOODSMVT_CREATE בקוד.",
      recommendedAction:
        "לרשום התאמות עוקבות (Subsequent Adjustment) לקבלנות משנה ב-MIGO; תיעוד S/4HANA 2025 FPS01 מתעד את " +
        "הפונקציה 'in transactions MB04 or MIGO', ובממשק Fiori באפליקציית Post Subsequent Adjustment (App ID " +
        "F5476 בסניפט הרשמי; המקור אינו מקשר אותה ל-MB05 והיא אינה בקטלוג ה-Fiori של הפרויקט). קוד לקוח הקורא " +
        "ל-MB05 (למשל CALL TRANSACTION) יש להחליף ב-BAPI_GOODSMVT_CREATE. אין לרשום במקביל דרך MB05 ודרך MIGO " +
        "או ה-BAPI, בגלל הבדלי מנגנון הנעילה מגרסת OP1610 (SAP Note 2319579 בגוף הפריט). לעדכן את " +
        "tx-intel.ts: השדה s4 'זמין ב-S/4HANA' מקל מדי מול הפריט; להוסיף את שם הפריט, את חסימת התפריט ואת " +
        "ההחלפה בקוד, ולסמן את התיאור 'לפי תפוקה' כדורש אימות במערכת SAP.",
    },
    xrefs: [
      "tx:MIGO", "tx:MB04", "tx:MB01", "tx:MB1B", "tx:ME2O", "tx:MMBE", "fm:BAPI_GOODSMVT_CREATE",
      "table:MKPF", "table:MSEG", "obj:material-document", "bp:goods-movement-process",
      "bp:ecc-to-s4hana-migration-process",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "מקור הפסיקה: שתי רשימות הפישוט הרשמיות הורדו מחדש מ-help.sap.com ביום הגישה ונקראו כטקסט מלא " +
      "(pdftotext): SIMPL_OP2023.pdf (HTTP 200, 10,174,700 בתים, md5 909c6e9087b009e809c116d3c6cf2eec, " +
      "Document Version 1.35, 76,534 שורות) ו-SIMPL_OP2025.pdf (HTTP 200, 10,585,218 בתים, md5 " +
      "c1ccf8ebcd92d51fdc80e4b4873f3b73, Document Version 1.36, 70,530 שורות); שני ערכי ה-md5 זהים לאלה " +
      "שנרשמו בקטלוג הפונקציות ב-2026-09-23. MB05 מופיעה בכל אחת מהן בדיוק פעמיים (רשימת Symptom ורשימת " +
      "Solution של הפריט; שורות 33188 ו-33215 בחילוץ 2023, 69247 ו-69277 בחילוץ 2025), וכל ציטוט נבדק מילה " +
      "במילה. מספרי ה-SAP Notes 2210569 ו-2319579 מצוטטים מגוף הפריט בלבד; שדה sapNote לא הוזן במכוון (אין " +
      "קישור me.sap.com/notes נגיש ואין repoRef). status.release מתעד את מהדורת מסמך הפישוט (2025 FPS01), " +
      "כי אף מקור רשמי אינו נוקב בגרסת הסרה קשיחה; OP1610 נקוב רק לעניין מנגנון הנעילה. מה שהפריט אינו " +
      "אומר: הוא אינו מתאר מה MB05 עושה, אינו נוקב באפליקציית Fiori עבורה ואינו מבחין בינה לבין MB04. " +
      "חיפושים שבוצעו ב-help.sap.com ביום הגישה (S/4HANA On-Premise וגם SAP ERP 6.0 EHP8): 'MB05 subsequent " +
      "adjustment' (21 תוצאות בכל מוצר; אף כותרת או סניפט אינם נוקבים ב-MB05), 'MB05' לבדו (התוצאות הן " +
      "מחרוזות HCM ולוקליזציה כגון MB0/MB5, M105 ו-MP05, לא הטרנזקציה), 'subsequent adjustment " +
      "subcontracting components consumed', 'Post Subsequent Adjustment app F5476 subcontracting', " +
      "'subsequent adjustment active ingredient material batch-specific unit of measure', וכן WebSearch " +
      "מוגבל לדומיינים הרשמיים. תיעוד S/4HANA 2025.001 מתעד את פונקציית ההתאמה העוקבת לקבלנות משנה תחת MB04 " +
      "או MIGO ('the subcontracting subsequent adjustment function in transactions MB04 or MIGO', MRO " +
      "Subcontracting in Goods Movements, loio 78dbc353b677b44ce10000000a174cb4, סניפט), וטבלת הפעילויות של " +
      "MM מונה 'Subsequent Adjustment for Material Provided MB04' (Goods Movement (MM-IM), loio " +
      "3b07b753128eb44ce10000000a174cb4, סניפט; אותו נוסח בדף ה-ECC הסטטי שנקרא במלואו). גוף דפי ה-Help של " +
      "S/4HANA לא נקרא: שירות deliverableMetadata החזיר 'Invalid input parameter' ושירות pagecontent החזיר " +
      "HTTP 500 בכל צורת פרמטרים שנוסתה (כולל topic_url=<deliverable>/<loio>.html), ולכן הטענות מהם תחומות " +
      "לסניפט של רשומת החיפוש. אפליקציית Fiori בשם Post Subsequent Adjustment נושאת App ID F5476 בסניפט " +
      "הרשמי (Inventory Management and Inventory (MM-IM), loio 79824a704b7742ff8252c0c8575fbea3: 'an " +
      "alternative option to subsequent posting instead of using the Post Goods Movement app (Web GUI app; " +
      "transaction code MIGO) with a separate process step (Subsequent Adjustment)'); המקור אינו מקשר אותה " +
      "ל-MB05, והמזהה אינו קיים ב-data/fiori/apps.ts, ולכן אינו ב-xrefs ואינו נרשם כיורש. " +
      "BAPI_GOODSMVT_CANCEL, MSLB ו-MATDOC אינם מזהים בני-פענוח בדאטהסט ולכן אינם ב-xrefs. הסטטוס הנגזר " +
      "שהאפליקציה מציגה כיום ל-MB05 (מ-tx-intel, רמת אמון חלקית) הוא 'זמינה ב-S/4HANA', כי אף רשומת " +
      "tx-intel אינה מונה את MB05 בשדה obsolete והשדה s4 שלה אינו מכיל אות החלפה; רשומה זו מחליפה אותו " +
      "בסטטוס הרשמי 'הוחלפה'. רשומת האחות tx:MB04 נכתבה באותו באץ' לשארד זה (transactions-b.ts) ואינה נפסקת " +
      "כאן. לא בוצעה בדיקה במערכת SAP חיה (ה-MCP של sc4sap לא התחבר: MCP error -32000, Connection closed), " +
      "ולכן קיום הקוד בפועל, התנהגות הודעת השגיאה מהתפריט והפונקציה המדויקת של MB05 במערכת היעד נותרים " +
      "'דורש אימות במערכת SAP'. הרשומה אינה נושאת שדה reviewer: אף רשומה ב-data/verification/** אינה נושאת " +
      "אותו.",
  },
  {
    id: "tx:MB22",
    evidence: [
      MB22_ROLE_2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
          "Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 15.3.5 S4TWL - Blocked customer " +
          "or supplier in Inventory Management (MM-IM-GF), item begins p. 1473, MB22 sentence p. 1474",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (רכיב יישום MM-IM-GF; בטבלת ההערות שלו מודפסת הערת Business Impact 0002516223 'Blocked " +
          "customer or supplier in Inventory Management') נקרא במלואו מתוך ה-PDF הרשמי שהורד מ-help.sap.com. " +
          "הוא עוסק בבדיקת סיום המטרה של נתוני אב לקוח וספק: 'The end of purpose check for customer and " +
          "supplier master data has changed in Inventory Management. From SAP S/4HANA 1709 onwards the " +
          "following requirements must be fulfilled for blocking customer or supplier master data', ובין " +
          "הדרישות 'Open reservations that are related to the customer or supplier to be blocked must be " +
          "deleted'. תחת Required and Recommended Action(s) נכתב: 'Material documents, special stocks, physical " +
          "inventory documents and open reservations that are related to blocked customer or supplier master " +
          "data shall be archived or deleted before converting or upgrading to SAP S/4HANA 1709 (and above). " +
          "Open reservations can be deleted (or flagged for deletion) using transactions MB22 and MBVR.' זהו " +
          "האזכור היחיד של MB22 בכל המסמך (חיפוש טקסט מלא בקובץ שחולץ מה-PDF): הפריט נוקב ב-MB22 ככלי למחיקה או " +
          "לסימון מחיקה של שמורות פתוחות לפני ההמרה, ואינו קובע ש-MB22 הוחלפה, הוסרה או שונתה ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reservations (MM-IM) | Materials Management (MM)",
        product: "SAP ERP 6.0",
        edition: "ecc",
        release: "ECC 6.0 EHP8",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/5607b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו נושא תפקיד (loio 5607b753128eb44ce10000000a174cb4) קיים גם במערך התיעוד של SAP ERP 6.0 EHP8 " +
          "(versionId 6.18.latest, תאריך 2026-06-12) עם תקציר זהה: 'Technical name: " +
          "SAP_MM_IM_RESERVATION_MAINTAIN', 'The user has the task of creating, displaying, and if required, " +
          "changing reservations for material', וטבלת הפעילויות 'Create Reservation MB21 Change Reservation " +
          "MB22 Display Reservation MB23 List of Reservations MB25'. כלומר MB22 מתועדת ב-ECC 6.0 באותו תפקיד " +
          "ובאותה פעילות (Change Reservation) שבהם היא מתועדת ב-S/4HANA 2025 FPS01; ראיית ECC בלבד, ללא קביעה " +
          "על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Reservation Items | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/ab28858eb6aa459eb2c2723f8adc4aa0.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד האפליקציה בדליברבל Inventory Management and Inventory (MM-IM) לגרסת 2025 FPS01 (loio " +
          "ab28858eb6aa459eb2c2723f8adc4aa0, תאריך 2026-02-24) קובע בתקציר 'Manage Reservation Items App ID: " +
          "F5601 With this app, you can view, mark as deleted, or copy the items of a reservation as well as " +
          "create a new manual reservation', ובקטע תקציר אחר של אותה רשומה (תלוי שאילתה): 'Search and display " +
          "details of existing reservation items Edit manual reservations or stock transfer reservations " +
          "created by MRP' וכן 'Note All actions with reservations are subject to the implemented authorization " +
          "logic. You cannot change dependent reservations that are generated automatically by the system'. " +
          "העמוד מפנה ל-'App entry in the Fiori Apps Reference Library: Manage Reservation Items' ול-Manage " +
          "Manual Reservations כמידע קשור. העמוד אינו מזכיר את MB22 ואינו מציג את האפליקציה כמחליפה שלה; הוא " +
          "מתעד חלופת Fiori ב-S/4HANA 2025 FPS01 לעריכה, לסימון מחיקה ולהעתקה של פריטי שמורה ידנית.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: MB22_ROLE_2025,
      secondary: [
        "fiori_alternative_available",
      ],
      he:
        "MB22 (Change Reservation, שינוי שמורה) מתועדת ב-S/4HANA On-Premise 2025 FPS01 כקוד הטרנזקציה של " +
        "הפעילות Change Reservation בתפקיד Reservations (MM-IM) ‏(SAP_MM_IM_RESERVATION_MAINTAIN), באותו " +
        "תפקיד ובאותה פעילות שבהם היא מתועדת ב-SAP ERP 6.0 EHP8. שני פריטי הפישוט שנוקבים בה (2025 FPS01 פריט " +
        "15.3.5 ו-2023 FPS03 פריט 27.2, S4TWL - Blocked customer or supplier in Inventory Management) אינם " +
        "מחליפים, מסירים או משנים אותה: הם נוקבים בה, לצד MBVR, ככלי למחיקה או לסימון מחיקה של שמורות פתוחות " +
        "הקשורות ללקוח או לספק שחוסמים, לפני המרה או שדרוג ל-S/4HANA 1709 ואילך. לא נמצא מקור רשמי המכריז על " +
        "מחליף ל-MB22. לצדה מתועדות ב-2025 FPS01 אפליקציות Fiori לשמורות ידניות: Manage Reservation Items " +
        "‏(F5601; עריכה, סימון מחיקה והעתקה של פריטי שמורה ידנית או שמורת העברת מלאי שנוצרה ב-MRP) ו-Manage " +
        "Manual Reservations ‏(F4839); שתיהן אינן בקטלוג ה-Fiori של הפרויקט ולכן אינן מקושרות כאן. גבול " +
        "תפקודי לפי אותו תיעוד: שמורות תלויות שנוצרו אוטומטית (למשל מרכיבי פקודה) אינן ניתנות לשינוי ידני, לא " +
        "ב-MB22 ולא באפליקציה; משנים אותן דרך רכיבי הפקודה (נושא Reservation, loio " +
        "ade0ba538c95b54ce10000000a174cb4).",
      recommendedAction:
        "להמשיך להשתמש ב-MB22 לשינוי שמורות ידניות (כמות, תאריך דרישה, סימון מחיקה, סימון movement allowed) " +
        "בתחזוקת מפעל ובתעשיות תהליכיות; שמורות שנוצרו אוטומטית מפקודת תחזוקה או מפקודת תהליך משנים ברכיבי " +
        "הפקודה בטרנזקציית שינוי הפקודה (לפי רשומות המאגר: IW32 לפקודת תחזוקה, COR2 לפקודת תהליך) ולא ב-MB22. " +
        "בהכנה להמרה: אם חוסמים נתוני אב לקוח או ספק לפי פריט 15.3.5, למחוק או לסמן למחיקה את השמורות הפתוחות " +
        "הקשורות אליהם ב-MB22 או ב-MBVR לפני ההמרה, כלשון הפריט. לתרחישים חדשים בלוח ה-Fiori לבחון את Manage " +
        "Reservation Items ‏(F5601) ואת Manage Manual Reservations ‏(F4839) ולאמת במערכת היעד את זמינותן ואת " +
        "הקטלוג העסקי שלהן; לאינטגרציה במקום BDC על MB22 לבחון את פעולת Update Reservation Document של שירות " +
        "ה-OData‏ API_RESERVATION_DOCUMENT (עמוד 2025 FPS01, loio 18dea68a1d25444f85d2bc6e634b65d5). לתקן " +
        "במאגר את שדה ה-fiori של MB22 (ושל MB21) ב-data/tx-intel.ts: המחרוזת 'Manage Reservations (F1622)' לא " +
        "אומתה מול אף רשומה רשמית; השמות והמזהים המתועדים ב-2025 FPS01 הם Manage Manual Reservations ‏(F4839) " +
        "ו-Manage Reservation Items ‏(F5601).",
    },
    xrefs: [
      "table:RESB", "tx:MB21", "tx:MB23", "tx:MB24", "tx:MB25", "tx:MB26", "tx:MB1A", "tx:MIGO",
      "tx:MD04", "tx:IW32", "tx:COR2", "fm:BAPI_RESERVATION_CREATE1", "fm:RESERVATION_READ",
      "obj:reservation", "bp:material-staging-and-reservation",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה (2026-09-24; בתיעוד הרשמי ובמאגר, לא בוצעה בדיקה חיה במערכת SAP). (1) עשר שאילתות " +
      "ב-scripts/sap-help-search.mjs: 'MB22 change reservation' ו-'MB22' (בסינון 2025.001) בסקופ " +
      "SAP_S4HANA_ON-PREMISE, 'Change Reservation MB22' בסקופ SAP_ERP, 'Blocked customer or supplier in " +
      "Inventory Management', 'Manage Reservations app Fiori', 'Changing a Reservation manual reservation " +
      "MM-IM', 'Changing a Reservation' (בסינון 2025.001), 'MBVR reservations management program delete " +
      "reservations', 'F1622' ו-'\"Manage Reservations\" app'; לצדן שני חיפושי רשת מוגבלים ל-help.sap.com, " +
      "api.sap.com, fioriappslibrary.hana.ondemand.com ו-fal.cloud.sap. אף גוף עמוד של help.sap.com לא נקרא " +
      "(מעטפת JavaScript); כל ציטוט מעמודי Docs לקוח מתקציר רשומת החיפוש, וכל ציטוט מרשימות הפישוט לקוח " +
      "מהטקסט שחולץ משני קובצי ה-PDF הרשמיים שהורדו מ-help.sap.com באותו יום (HTTP 200; SIMPL_OP2025.pdf " +
      "בגודל 10,585,218 בתים, גרסת מסמך 1.36, 1,514 עמודים; SIMPL_OP2023.pdf בגודל 10,174,700 בתים, גרסת " +
      "מסמך 1.35). (2) רשימת הפישוט 2023 FPS03 (פריט 27.2, מתחיל בעמ' 625, משפט ה-MB22 בעמ' 626, רכיבי " +
      "יישום MM-IM-GF, BNS-INT-ARI-IM, MM-IM-RS ו-MM-IM-PI, הערת Business Impact 2516223) נקראה במלואה " +
      "ונושאת את אותו משפט מילה במילה: 'Open reservations can be deleted (or flagged for deletion) using " +
      "transactions MB22 and MBVR'; זהו האזכור היחיד של MB22 גם בה. הפריט לא נוסף כראיה נפרדת בגלל גבול " +
      "ארבע הראיות, והוא מצוטט מהמהדורה 2025 FPS01. בטקסט מדריך ההמרה CONV_OP2025 אין אזכור ל-MB22. (3) " +
      "רשומות רשמיות שנמצאו ולא נוספו כראיה נפרדת: נושא 'Reservation' בדליברבל Inventory Management and " +
      "Inventory (MM-IM) ‏2025.001 (loio ade0ba538c95b54ce10000000a174cb4; אותו loio קיים ב-SAP ERP " +
      "6.18.latest): 'You cannot manually process automatic reservations. For example, it is not possible " +
      "to change reservations for a order directly. You have to change the components in the order' (כלשון " +
      "התקציר); 'Changing a Reservation' 2025.001 תחת דליברבל Retail וגם תחת דליברבל Inventory Management " +
      "and Inventory (MM-IM) (loio 3b64bd534f22b44ce10000000a174cb4; ב-SAP ERP אותו loio יושב תחת MM-IM): " +
      "'You can change a manual reservation at any time, even if the reserved quantity has already been " +
      "withdrawn. You cannot process automatic reservations'; 'Manage Manual Reservations' 2025.001 (loio " +
      "75942fd967544365a2ac432f2aa43227): 'App ID: F4839 With this app, you can create and manage manual " +
      "reservations for goods movements for a warehouse'; What's New 2022 'Manage Reservation Items' (loio " +
      "2e975b324b0d42baa3599b6df42dde14): 'You can edit manual reservations or stock transfer reservations " +
      "created by MRP'; What's New 2023 'Change Documents for Reservations' (loio " +
      "e852d80f279344678cd83352edd65198): מסמכי שינוי נרשמים בשתי אפליקציות ה-Fiori; התקציר אינו אומר אם " +
      "MB22 מושפעת; 'Update Reservation Document' ב-APIs for Inventory 2025.001 (loio " +
      "18dea68a1d25444f85d2bc6e634b65d5): PUT על פריטי שמורה, 'Set the item is deleted indicator Set the " +
      "final issue for this reservation indicator'; 'Periodic Processing (MM-IM)' 2025.001 (loio " +
      "5007b753128eb44ce10000000a174cb4): 'Reservation Management Program MBVR'; 'Job Scheduling - Manual " +
      "Reservations' (F7554). (4) פערים: לא נמצא מקור רשמי הנוקב במחליף ל-MB22, ולכן אין successor; MBVR " +
      "ו-RKPF אינם מזהים ביקום הפרויקט ולכן אינם ב-xrefs; F4839, F5601 ו-F7554 אינם ב-data/fiori/apps.ts " +
      "ולכן אין xref מסוג fiori; ספריית אפליקציות ה-Fiori היא מעטפת JavaScript, וחיפוש הרשת החזיר את כתובת " +
      "רשומת F4839 בספרייה (Manage Manual Reservations) בלי שתוכנה נקרא, ותוצאה בשם 'Change Reservation - " +
      "SAP Fiori Apps Reference Library' שהצביעה על שורש הספרייה בלי מזהה אפליקציה, ולכן לא צוטטה. הצמדת " +
      "ה-Fiori במאגר, 'Manage Reservations (F1622)' ‏(data/tx-intel.ts#MB22 וגם #MB21), לא אומתה: שאילתת " +
      "'F1622' החזירה רק רשומות F1522, F1602, F1652 ו-F6122, ואף רשומה אינה נוקבת באפליקציה בשם Manage " +
      "Reservations. ה-BAdI‏ MB_RESERVATION_BADI ('Check/complete dialog data for transaction MB21/MB22') " +
      "נקוב בהערות השחרור של R/3 Enterprise 4.70 המצוטטות ב-data/verification/enhancements.ts, אך אינו מזהה " +
      "ביקום הפרויקט. (5) הסטטוס הנגזר שהאפליקציה מציגה כיום: רשומת tx-intel (s4: 'זמינה; מומלץ Fiori " +
      "Manage Reservations') נקראת על ידי הבונה כ-disposition 'available' ברמת אמון 'partial', כלומר " +
      "unchanged ברמת repository_verified; הסטטוס המחובר כאן מסכים על הטוקן ומעלה את הרמה " +
      "ל-sap_official_verified עם מקור. לפי מוסכמת data/verification/transactions.ts הרשומה אינה נושאת שדה " +
      "reviewer.",
  },
  {
    id: "tx:MB56",
    evidence: [
      MB56_SIMPL2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches (LO-BM) | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/24ffb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "תיעוד ניהול האצוות (LO-BM) לגרסת 2025 FPS01, בעמוד העוסק באצוות תיעודיות (documentary batches), " +
          "עדיין מפנה ל-MB56 כפונקציה זמינה: 'You can only use some of the current batch functions for " +
          "documentary batches. You can use the batch where-used list (transaction MB56) and the batch master " +
          "(MSC1N, MSC2N and MSC3N)', ולתרחיש ריקול: 'In the event of recall campaigns, you can use the " +
          "existing batch where-used list (transaction MB56) for affected documentary batches.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Display Batch Data | Single and Composite Roles (PFCG)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/7376b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "בתיעוד SAP ERP 6.0 EHP8 (גרסה 6.18.latest, תווית הגרסה בשירות החיפוש: '6.0 EHP8 Latest') התפקיד " +
          "'Display Batch Data' (Technical name: SAP_LO_BM_BATCH_DATA_DISPLAY; 'You use this role to get " +
          "information about batches') מונה את 'MB56 Display Batch Where-Used List' לצד 'MB57 Compile Batch " +
          "Where-Used File', 'BMBC Batch Information Cockpit', 'BMCC Integrity Check for Batch Classification' " +
          "ו-MB5M; זו העמדה ב-ECC: טרנזקציית תצוגה סטנדרטית של ניהול אצוות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Display Batch Usages - SAP Fiori Apps Reference Library (App ID: MB56)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=MB56",
        accessedAt: DATE24,
        claim:
          "ספריית האפליקציות של Fiori מכילה רשומה בשם 'Display Batch Usages' עם App ID: MB56 (כותרת תוצאת " +
          "החיפוש מוגבל-הדומיין וכתובת הרשומה). גוף הדף הוא מעטפת JavaScript שהחזירה דף נחיתה בלבד, ולכן סוג " +
          "האפליקציה, הגרסה, התפקיד והקטלוג לא נראו ואינם נטענים כאן.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2023 FPS03",
      source: MB56_SIMPL2023,
      he:
        "MB56 (Display Batch Where-Used List, רשימת השימוש באצווה) ממשיכה להתקיים ב-SAP S/4HANA On-Premise " +
        "בלי שינוי שנמצא לו מקור רשמי. הראיה המכריעה: פריט הפישוט 30.27 S4TWL - Batch History ברשימת הפישוט " +
        "של S/4HANA 2023 FPS3 קובע 'The batch-where used functionality (transaction MB56, bottom-up/top-down " +
        "analysis) are not affected at all'; הפריט עצמו עוסק ב-Batch History, לא ב-MB56 (ה-Business Function " +
        "LOG_PP_BATCH_HISTORY נזכרת בפריט 30.28 של אותה רשימה, S4TWL - Selected Business Functions in PP " +
        "area, עמ' 799-800, המפנה ל-separate note 2270242). תיעוד ניהול האצוות (LO-BM) לגרסת 2025 FPS01 עדיין " +
        "מפנה אליה ('You can use the batch where-used list (transaction MB56)') לצד MSC1N, MSC2N ו-MSC3N, " +
        "ותפקיד ה-PFCG 'Display Batch Data' מונה אותה בתיעוד SAP ERP 6.0 EHP8 (אותו עמוד קיים גם ב-2025.001, " +
        "ראו הערות). ספריית האפליקציות של Fiori מציגה אותה כ-'Display Batch Usages' עם App ID: MB56, כלומר " +
        "הטרנזקציה עצמה כאפליקציה, לא יורש. אף מקור רשמי שנמצא אינו נוקב ביורש או באפליקציית Fiori חלופית; " +
        "הפריט שהרמז ייחס לה (30.9 S4TWL - ANSI/ISA S95 Interface) אינו מזכיר אותה.",
      recommendedAction:
        "להשאיר את MB56 ככלי המעקב קדימה ואחורה (top-down / bottom-up) של אצוות ב-S/4HANA On-Premise, בייצור " +
        "בתעשיות תהליכיות ובתרחישי ריקול; לוודא שרשימת השימוש באצווה מופעלת ב-Customizing ושקובץ השימוש " +
        "(batch where-used file) בנוי, כתנאי שהתיעוד הרשמי מציב. בהמרת מערכת: פריט 30.27 נוגע ל-Batch History " +
        "ולא ל-MB56, ואין להסיק ממנו שינוי בה. בנתוני הפרויקט: להוסיף ל-MB56 רשומת tx-intel/lifecycle (כיום " +
        "אין, והבונה גוזר 'לא קיים תיעוד מאומת במאגר'), לתקן ב-audit/master-completion/simpl-tcode-index.json " +
        "את ייחוס האזכור מפריט 30.9 לפריט 30.27, ולא לטעון את CHVW כטבלת המקור של הרשימה בלי מקור רשמי.",
    },
    xrefs: [
      "tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "tx:MB51", "tx:MB5M", "obj:batch", "fiori:F2462",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: שבע שאילתות בשירות החיפוש של help.sap.com דרך scripts/sap-help-search.mjs ב-2026-09-24 " +
      "('MB56', 'batch where-used list', 'ANSI/ISA S95 interface', 'Display Batch Where-Used List', 'MB56 " +
      "batch where-used list' בסקופ SAP_ERP, 'batch where-used list What's New', 'CHVW batch where-used'), " +
      "שני חיפושי רשת מוגבלי-דומיין (fioriappslibrary/fal; help/api/fiori), וקריאה מלאה של פריט 30.27 מתוך " +
      "ה-PDF הרשמי של רשימת הפישוט 2023 FPS3 (העותק המקומי זהה ב-MD5 909c6e9087b009e809c116d3c6cf2eec " +
      "לרישום הכתובת הרשמית באינדקס; 1,482 עמודי PDF; משפט ה-MB56 בעמוד ה-PDF 799, שכותרתו התחתונה 'Page | " +
      "799', והפריט מתחיל בעמ' 798). ביקורת נגדית (2026-09-24) הורידה את ה-PDF מחדש מהכתובת הרשמית, אימתה " +
      "את ה-MD5 ומדדה ש-MB56 מופיעה פעם אחת בלבד בכל ה-PDF (פריט 30.27); ה-Business Function " +
      "LOG_PP_BATCH_HISTORY אינה נזכרת בפריט 30.27 אלא בפריט 30.28 S4TWL - Selected Business Functions in " +
      "PP area (עמ' 799-800, SAP Note 2271206 כלשון המסמך): 'Regarding the functions switched by business " +
      "function LOG_PP_BATCH_HISTORY please see the separate note 2270242'. תיקון לרמז האינדקס: הכותרות " +
      "'30.10S4TWL' עד '30.40S4TWL' ברשימת 2023 נכתבות בלי רווח אחרי המספר, ולכן " +
      "audit/master-completion/simpl-tcode-index.json ייחס את שורת ה-MB56 לפריט 30.9 (S4TWL - ANSI/ISA S95 " +
      "Interface); פריט 30.9 (עמ' 751, SAP Note 2268117) אינו מזכיר את MB56 כלל ועוסק בממשק S95 שהשימוש בו " +
      "אינו אפשרי ב-S/4HANA ('Use MES Integration or the POI Interface instead'). ברשימת 2025 FPS01 " +
      "(SIMPL_OP2025, גרסת מסמך 1.36) אין פריט הנוקב ב-MB56: פריט 9.3.6 S4TWL - Selected Business Functions " +
      "in PP area (עמ' 610-611) מונה את LOG_PP_BATCH_HISTORY בין ה-Business Functions שאינן ניתנות להפעלה " +
      "ומפנה ל-'separate note 2270242' בלי לנקוב ב-MB56, ופריט 9.3.3 הוא גרסת ה-S95 ואינו מזכיר אותה (נמדד " +
      "ב-grep על הטקסט המחולץ scratchpad/official/SIMPL_OP2025.pdf.txt). What's New: אף רשומה. מקורות " +
      "רשמיים שנראו ולא צורפו: 'Batch Where-Used List' בתיעוד CWM 2025.001 (loio " +
      "3d9dcf535b804808e10000000a174cb4: 'You can use transactions MB56 Display Batch Where-Used List and " +
      "MB57 Compile batch where-used file, for CW materials as wells as for non-CW materials'); 'Batch " +
      "Where-Used List' בתיעוד LO-BM 2025.001 (loio 64feb753128eb44ce10000000a174cb4: 'You can only create " +
      "a batch where-used list if the receipt records and issue records are stored in the batch where-used " +
      "file'); 'Building Up a Batch Where-Used File' (loio 67feb753128eb44ce10000000a174cb4: 'To carry out " +
      "the batch where-used list function, you need the batch where-used file'); 'Reporting in Inventory " +
      "Management' (loio 5863bd534f22b44ce10000000a174cb4) המונה את רשימת השימוש באצווה לצד רשימת מסמכי " +
      "החומר MB51; 'Business Add-Ins (BAdIs) for Batches' (loio 8ffdb753128eb44ce10000000a174cb4) הנוקב " +
      "ב-'Enhancement to Automatic Plant Determination in transaction MB56 (VB_GET_POS_PLANT)', BAdI שאינו " +
      "ב-data/exits.ts ולכן אינו ב-xrefs; ותאום ה-S/4HANA 2025.001 של עמוד התפקיד 'Display Batch Data' " +
      "(אותו loio 7376b6535fe6b74ce10000000a174cb4, " +
      "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/7376b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001) " +
      "עם אותה רשימת קודים. הטבלה CHVW שהמאגר מייחס ל-MB56 (data/tcode-directory.ts, " +
      "data/process-guides.ts) לא הופיעה באף רשומה רשמית בשאילתות אלו ואינה ביקום המזהים; לא נטענה. גופי " +
      "דפי ה-Help לא נקראו (מעטפת JavaScript): כל טענה מדפי Help נשענת על כותרת וסניפט; דף הספרייה של Fiori " +
      "ל-App ID MB56 החזיר דף נחיתה בלבד, ולכן רק השם 'Display Batch Usages' והמזהה נטענים. יורש: אף מקור " +
      "רשמי שנמצא אינו נוקב ביורש או באפליקציית Fiori חלופית ל-MB56; Manage Batches (F2462) היא אפליקציית " +
      "אב האצווה ואינה מתועדת כמחליפה של רשימת השימוש, ולכן אין דגל fiori_alternative_available. מספר SAP " +
      "Note 2270242 מצוטט כלשון ה-PDF; שדה sapNote לא הוזן (אין קישור me.sap.com נגיש או repoRef). מצב " +
      "המאגר: ל-MB56 אין רשומה ב-data/tx-intel.ts (היא נזכרת רק בתוך רשומות MSC1, MSC2 ו-MSC3), " +
      "ב-data/lifecycle.ts או ב-data/transactions.ts, ולכן הבונה גוזר היום 'לא קיים תיעוד מאומת במאגר' " +
      "(verification_required); רק data/tcode-directory.ts מתאר אותה ('Batch where-used list.'), ומדריכי " +
      "התהליך, מרכז ה-QA וה-solutions מזכירים אותה כצעד הריקול והמעקב. לא בוצעה בדיקת מערכת SAP חיה (ה-MCP " +
      "sc4sap לא התחבר). accessedAt = 2026-09-24, מועד הגישה בפועל.",
  },
  {
    id: "tx:MBRL",
    evidence: [
      MBRL_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (Document Version 1.35, 2025-02-25) " +
          "· item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF), pp. 644-645",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "רשימת הפישוט למהדורת 2023 FPS03 (חלה גם על SAP S/4HANA Cloud Private Edition 2023 FPS03) נושאת את " +
          "אותו פריט באותו נוסח, וגם בה MBRL מופיעה בדיוק פעמיים: ברשימת טרנזקציות ה-MB ש-'have been replaced " +
          "by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
          "BAPI_GOODSMVT_CANCEL', ובהוראת הפתרון להחליף קוד לקוח הקורא ל-MB01, MB04, MB05, MB0A, MB11, MB1A, " +
          "MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL ו-MBSU במודול הפונקציה BAPI_GOODSMVT_CREATE. הפריט חוזר על " +
          "הקביעה שהקודים עדיין קיימים, שקריאה מהתפריט מעלה הודעת שגיאה ושהם 'will be deprecated in the near " +
          "future'. ההחלפה אינה חידוש של מהדורת 2025: היא נקובה כבר במהדורת 2023 FPS03, עם הערת Business Impact " +
          "2210569 המודפסת בפריט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Return Delivery | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/e263bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט של רשומת החיפוש (loio e263bd534f22b44ce10000000a174cb4, ‏2025 FPS01) קובע: 'Activities " +
          "Posting a Return Delivery with Reference to the Material Document Choose the Enjoy transaction MIGO " +
          "for posting goods movements.' ו-'Enter the number of the material document and the material document " +
          "year.' כלומר, בתיעוד MM-IM של S/4HANA On-Premise 2025 FPS01 החזרת סחורה בהתייחס למסמך חומר, הפונקציה " +
          "ש-MBRL ביצעה, מתועדת דרך MIGO. הסניפט מוסיף: 'using movement type 103, you return them using " +
          "movement type 124 (return delivery from goods receipt blocked stock)'. גוף העמוד לא נקרא, ו-MBRL " +
          "אינה נזכרת בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (Retail) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/3807b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש של תיעוד SAP ERP 6.0 EHP8 (גרסה 6.18.latest, loio 3807b753128eb44ce10000000a174cb4) " +
          "מונה בסניפט, בטבלת 'Activities in Materials Management' של תפקיד Goods Movement (Retail), את הפעילות " +
          "'Return delivery for material document' עם קוד הטרנזקציה MBRL, לצד 'Transfer posting MB1B' ו-'Cancel " +
          "material document MBST'. זו העמדה ב-ECC: MBRL היא הטרנזקציה המתועדת להחזרת סחורה למסמך חומר. אותו " +
          "loio מוגש גם בתיעוד S/4HANA On-Premise 2025.001 באותו נוסח; מופע זה נרשם כגרירת תיעוד של תפריט " +
          "התפקיד ולא כהוכחה שהקריאה מהתפריט פועלת, משום שפריט הפישוט קובע שהקריאה מעלה הודעת שגיאה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת MBRL",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המודיעין: descHe 'החזרת סחורה למסמך חומר (Return Delivery for Material Document)', descTech " +
          "'טרנזקציה ל-return delivery עם reference למסמך חומר (movement 122 ל-PO GR, 124 ל-stock)', שדה s4 " +
          "הקורא לה 'זמינה' ומוסיף ש-MIGO Return Delivery היא 'הדרך המודרנית', alternative ['MIGO'], obsolete " +
          "[] ו-fiori 'Post Goods Movement (MIGO)'. הרשומה מקילה ביחס לעמדה הרשמית: היא קוראת ל-MBRL 'זמינה' " +
          "בעוד פריט הפישוט מונה אותה בין הטרנזקציות שהוחלפו, שקריאתן מהתפריט מעלה הודעת שגיאה ושאין להשתמש בהן " +
          "בקוד לקוח. ל-MBRL אין רשומה ב-data/lifecycle.ts (נבדק ב-grep, אפס מופעים).",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MBRL",
      },
    ],
    status: {
      status: "replaced",
      successor: "tx:MIGO",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MBRL_SIMPL2025,
      he:
        "MBRL (החזרת סחורה למסמך חומר, Return Delivery for Material Document) נמנית בשני פריטי הפישוט " +
        "הרשמיים, 15.3.9 במהדורת 2025 FPS01 ו-27.6 במהדורת 2023 FPS03 (S4TWL - AVAILABILITY OF TRANSACTIONS " +
        "IN MM-IM, הערת Business Impact 2210569), בין טרנזקציות ה-MB שהוחלפו בטרנזקציית המסך האחד MIGO " +
        "ובמודול הפונקציה BAPI_GOODSMVT_CREATE. קוד הטרנזקציה עדיין קיים, אך קריאה שלו מהתפריט מעלה הודעת " +
        "שגיאה, הוא משתמש במנגנון הנעילה הישן (note 2319579) ומיועד ליציאה משימוש; לפי הפריט הטרנזקציה הייתה " +
        "מיושנת כבר ב-SAP ERP 6.0. בתיעוד MM-IM של 2025 FPS01 החזרת סחורה בהתייחס למסמך חומר מתועדת דרך MIGO " +
        "(Return Delivery).",
      recommendedAction:
        "בדיאלוג להשתמש ב-MIGO, פעולת Return Delivery בהתייחס למסמך החומר (מספר מסמך ושנה), עם סוג התנועה " +
        "המתאים לתרחיש כמתועד בפרק Return Delivery של MM-IM; בקוד לקוח, ב-BDC ובממשקים להחליף CALL " +
        "TRANSACTION MBRL ב-BAPI_GOODSMVT_CREATE, כהוראת הפריט, בגלל מנגנון הנעילה הנפרד. בבדיקות המרה לסרוק " +
        "קוד לקוח, וריאנטי BDC ותפריטי תפקידים לקריאות MBRL. בנתוני הפרויקט: לנסח מחדש את שדה s4 ברשומת MBRL " +
        "ב-data/tx-intel.ts מ-'זמינה' ל-'replaced: הקוד קיים, קריאה מהתפריט חסומה בהודעת שגיאה', עם ציון פריט " +
        "הפישוט והערה 2210569, ולבדוק את שדה fiori 'Post Goods Movement (MIGO)' מול רשומת tx:MIGO (Post Goods " +
        "Movement הוא עטיפת Web GUI של MIGO, לא יישום Fiori נפרד להחזרות).",
    },
    xrefs: [
      "tx:MIGO", "tx:MBST", "tx:MB01", "tx:MB02", "tx:MB03", "tx:MB04", "tx:MB05", "tx:MB11",
      "tx:MB1A", "tx:MB1B", "tx:MB1C", "tx:MB31", "tx:MMBE", "tx:MB51", "tx:MIRO", "tx:ME23N",
      "table:MKPF", "table:MSEG", "fm:BAPI_GOODSMVT_CREATE", "cds:I_MaterialDocumentItem",
      "obj:material-document", "enh:badi:MB_MIGO_BADI",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (א) שני קובצי רשימת הפישוט הרשמיים (SIMPL_OP2025.pdf, Document Version 1.36, פריט 15.3.9 " +
      "בעמ' 1486-1487; SIMPL_OP2023.pdf, Document Version 1.35, פריט 27.6 בעמ' 644-645) הורדו " +
      "מ-help.sap.com/doc וחולצו לטקסט; הפריט נקרא במלואו בשניהם, ו-MBRL מופיעה בכל אחד מהם בדיוק פעמיים: " +
      "ברשימת ההחלפה ובשורת הפתרון המפנה ל-BAPI_GOODSMVT_CREATE. הציטוטים נשמרו בכתיב המקור, כולל שגיאות " +
      "ההקלדה שבו ('alreday', 'suing'). מספרי ההערות 2210569 ו-2319579 מצוטטים מגוף הפריט בלבד ולא הוזנו " +
      "בשדה sapNote (אין קישור me.sap.com נגיש ואין repoRef, כמוסכמת הקטלוג). (ב) רשומות חיפוש help.sap.com " +
      "‏(scripts/sap-help-search.mjs, 2026-09-24, שש שאילתות): 'MBRL' במוצר On-Premise מחזיר רשומה רלוונטית " +
      "אחת, תפקיד Goods Movement (Retail) ב-2025.001 (loio 3807b753128eb44ce10000000a174cb4, שם טכני " +
      "SAP_MM_IM_GM_FOR_RETAIL לפי הסניפט) שעדיין מונה 'Return delivery for material document MBRL'; אותו " +
      "loio במוצר SAP ERP 6.0 EHP8 (6.18.latest) הוא ראיית העמדה ב-ECC. מופע ה-2025.001 נרשם כגרירת תיעוד " +
      "של תפריט התפקיד ולא כהוכחת זמינות, מאותו טעם שנרשם ברשומות tx:MBST ו-tx:MB01. תפקיד Goods Movement " +
      "(MM-IM) ב-2025.001 (loio 3e07b753128eb44ce10000000a174cb4) מונה בסניפט MIGO, MIGO_GI ו-MIGO_GR בלי " +
      "MBRL. (ג) פרק Return Delivery של MM-IM 2025.001 מתעד את ההחזרה בהתייחס למסמך חומר דרך MIGO; סוגי " +
      "התנועה 122 ו-124 מופיעים בסניפטים של loio e563bd534f22b44ce10000000a174cb4 ‏('type 122 ( return " +
      "delivery to vendor )') ושל loio e863bd534f22b44ce10000000a174cb4 ‏('124 ( return delivery from GR " +
      "blocked stock ) instead of movement type 122 ( return delivery to vendor )'), בהלימה ל-descTech של " +
      "רשומת tx-intel. מה שלא אומת: גוף עמודי help.sap.com לא נקרא (מעטפות JavaScript), ולכן אין כאן טענה " +
      "על סוגי התנועה שמסך MIGO מציע להחזרה או על ההשפעה על היסטוריית ההזמנה ועל אימות החשבוניות; לא נמצא " +
      "דף What's New או פריט פישוט הקובע הסרה פיזית של קוד הטרנזקציה, ולכן הסטטוס הוא 'הוחלף' ולא 'לא " +
      "זמין'; אף מקור רשמי שנמצא אינו נוקב ביישום Fiori המחליף את הפונקציה של MBRL (הפריט נוקב ב-MIGO " +
      "וב-MMBE בלבד, ו-Fiori App Stock Overview רק כחלופה ל-MMBE_OLD), ולכן לא נרשם דגל חלופת Fiori; " +
      "BAPI_GOODSMVT_CANCEL ו-MIGO_DIALOG הנזכרים בפריט אינם מזהים בדאטהסט ולכן אינם ב-xrefs; טבלת MATDOC " +
      "אינה אובייקט בדאטהסט ומיוצגת דרך obj:material-document. ‏WebSearch מוגבל-דומיין החזיר את דף Return " +
      "Delivery ודפי SUPPORT_CONTENT שלא נקראו ולא צוטטו. לא בוצעה בדיקת מערכת SAP חיה. ממצא על המצב המוצג " +
      "כיום: ללא סטטוס מחובר, בנאי דף הטרנזקציה גוזר ל-MBRL את המצב 'ללא שינוי ב-S/4HANA' (disposition " +
      "available, רמת אמון חלקי), משום שאף רשומת tx-intel אינה מונה את MBRL בשדה obsolete ושדה s4 שלה " +
      "('זמינה') אינו מכיל אות החלפה; הסטטוס המחובר כאן ('הוחלף', עוקבת tx:MIGO) מתקן את התצוגה עד לתיקון " +
      "הנתונים. ‏status.release = 2025 FPS01, מהדורת פריט הפישוט המשמש כמקור הסטטוס; הפריט במהדורת 2023 " +
      "FPS03 מצוטט כראיה שנייה. ‏accessedAt = 2026-09-24, מועד הגישה בפועל.",
  },
  {
    id: "tx:ME21N",
    evidence: [
      ME21N_PROCESS_PO_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Enjoy Purchase Order | EXG - Exchanges",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b846b365dbf64aa3a251fbdb53f4c97e/8082cf535b804808e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "'The Enjoy purchase order (transactions ME21N, ME22N, ME23N) replaces the previous purchase order " +
          "(transactions ME21, ME22, ME23)'; ובהמשך הסניפט: 'However, you can still use transactions ME21, ME22 " +
          "and ME23, and there are no functional limitations'. ME21N היא היורשת המתועדת של ME21 הקלאסית, " +
          "והתיעוד במהדורת 2025.001 (loio 8082cf535b804808e10000000a174cb4) עדיין מתאר את הקלאסית כשמישה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Purchase Order - Advanced (ME21N, ME22N, ME23N) | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/28f492016a52485784d85b7a31f7542d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף הנושא (loio 28f492016a52485784d85b7a31f7542d) נקרא במלואו דרך שירות התוכן של הפורטל " +
          "(http.svc/pagecontent, deliverable_id 40374862, buildNo 1807, 16,990 תווים אחרי ניקוי HTML). העמוד " +
          "קובע: 'With this app, you can create, change, and display purchase orders on a single screen'; " +
          "'These modes correspond to the transactions ME21N, ME22N, and ME23N'; 'The Create Purchase Order - " +
          "Advanced app is a classic SAP GUI for HTML app'. תחת Recommendation: 'SAP recommends that you use " +
          "the Fiori app Manage Purchase Orders to create, change, and display purchase orders', ובהמשך: 'If a " +
          "purchase order has a feature that is not supported by the Fiori app, this is indicated by the icon " +
          "\"i\" (='Advanced' Purchase Order) in the list. In this case, you can jump directly from the list in " +
          "the Manage Purchase Orders app to the relevant purchase order that is then opened automatically in " +
          "the classic Create Purchase Order - Advanced app'. כלומר ME21N נשארת הנתיב לתכונות שאין להן כיסוי " +
          "ב-Fiori.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Managing, Creating and Changing Purchase Orders | Sourcing and Procurement",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/a6eabfe3a32e4b82b87073021da7f92d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף הנושא (loio a6eabfe3a32e4b82b87073021da7f92d) נקרא במלואו דרך שירות התוכן של הפורטל " +
          "(deliverable_id 40374862, buildNo 1807, 2,511 תווים). הטבלה משווה 'Manage Purchase Orders' (App ID " +
          "F0842A) מול 'Create, Change, and Display Purchase Orders' (App ID 'ME21N / ME22N'). רק בעמודת ME21N " +
          "/ ME22N מסומן Yes, בין השאר: 'Stock Transport Order, including ATP and Shipping', 'Custom document " +
          "types incl. configurable Field Control', 'Create Purchase Order from Template', 'Header Conditions', " +
          "'Park and Hold Purchase Orders', 'Advanced Return Management', 'Stock Transfer Items', 'Down " +
          "Payments', 'PO History', 'Classification'; רק בעמודת F0842A מסומן Yes: 'List View (with Filtering, " +
          "Sorting and Grouping)', 'Excel Export of PO List', 'Comments in Rework Workflow', 'Document Flow'. " +
          "הכותרות בטבלה מקשרות, כלשון העמוד, לתיעוד האפליקציה ולרשומתה ב-SAP Fiori Apps Reference Library.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "International Trade Compliance Checks for Purchase Orders and Scheduling Agreements | What's New in " +
          "SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/d207fe7bc07043bcb193d351b5afc731.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE24,
        claim:
          "לפי הסניפט של רשומת החיפוש (loio d207fe7bc07043bcb193d351b5afc731, מהדורת 2025, versionId 2025.000): " +
          "'During the creation of the purchase order in ME21N or change of the purchase order in ME22N, " +
          "dependent on the document type, the Trade Compliance checks are performed', ו-'The status will be " +
          "shown on header and item level in ME21N, ME22N, and ME23N on the Compliance tab'; לפי אותו סניפט " +
          "הבדיקה מבוצעת גם כאשר ההזמנה נוצרת או משתנה ב-Manage Purchase Orders. ME21N ממשיכה לקבל יכולות חדשות " +
          "במהדורת 2025 (לשונית Compliance). גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025, Feature Pack Stack 1 · items 14.2.1 S4TWL - Co-Deployment " +
          "of SAP SRM, 14.2.8 S4TWL - Classic MM-PUR GUI Transactions replacement, 14.2.12 S4TWL - CI Include " +
          "Conflicts in EKKO_INCL_EEW_PS and EKPO_INCL_EEW_PS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "ה-PDF (Document Version 1.36; בקשת HEAD ב-2026-09-24: HTTP 200, application/pdf, 10,585,218 בתים) " +
          "נקרא בשלושת הפריטים מתוך הטקסט שחולץ ממנו. (1) פריט 14.2.12 (MM-PUR-PO, SAP Note 3092824, עמ' " +
          "1425-1426): ME21N מופיעה רק ברשימת Other Terms ('Upgrade to 2022 S/4HANA and higher, CI Include, " +
          "EKPO, EKKO, CI_EKPODB, EEW, EKKO, ME21N, SPDD, EKPO_INCL_EEW_PS, MMPUR_S_EXT_LCL_PO_HEADER, " +
          "MMPUR_S_EXT_LCL_PO_ITEM, PRITEMFORGR, MMPUR_ANA_EKET, MLHELPDESK, MLREPEKPO'); גוף הפריט עוסק בשגיאת " +
          "האקטיבציה DT963 בשדרוג ל-S/4HANA 2022 ומעלה, כאשר CI_EKKODB ו-CI_EKPODB נכללים מעתה " +
          "ב-EKKO_INCL_EEW_PS וב-EKPO_INCL_EEW_PS: 'This change will allow On Premise customers to directly use " +
          "custom fields in CI Includes in Fiori applications without any data loss. These fields are then " +
          "available for both Fiori UI as well as GUI screens (VH)'. הפריט אינו קובע דבר על החלפה, הסרה או " +
          "הגבלה של ME21N. (2) פריט 14.2.1 (SRM-CAT, SAP Note 2271166, עמ' 1410-1411) נקרא במלואו ואינו נוקב " +
          "ב-ME21N; הוא עוסק בהסרת ה-AddOn של SAP SRM בהמרה ('a de-installation of the SRM AddOn is " +
          "necessary'). (3) פריט 14.2.8 (MM-PUR-GF, SAP Note 2267449, עמ' 1418-1419): 'Classic SAP ERP " +
          "Materials Management (MM) transactions and BAPIs for the business objects Purchase Order, Purchase " +
          "Requisition, and Supplier Invoice have been replaced by the corresponding transactions and BAPIs " +
          "made available with SAP R/3 Enterprise 4.70. With SAP S/4HANA, on-premise, these classic MM " +
          "transactions and BAPIs are NO longer supported. The replacements that are available since SAP R/3 " +
          "Enterprise 4.70 shall be used.' הטבלה מונה ME21 ME22 ME23 ME24 ME25 ME27 ME28 ME51 ME52 ME53 ME54 " +
          "ME59 MR01 MR1M ואת BAPI_PO_CREATE, BAPI_REQUISITION_CREATE ו-BAPI_PO_GETDETAIL; ME21N אינה ברשימה, " +
          "והפריט מפנה ל-SAP Note 1803189 'FAQ: End of Support of ME21, ME51, and BAPI_PO_CREATE etc.'. בחיפוש " +
          "טקסטואלי בכל ה-PDF המחרוזת ME21N מופיעה פעם אחת בלבד, ב-Other Terms של 14.2.12.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023, Feature Pack Stack 3 · items 38.2 S4TWL - Classic MM-PUR " +
          "GUI Transactions replacement, 38.9 S4TWL - Co-Deployment of SAP SRM, 38.13 S4TWL - CI Include " +
          "Conflicts in EKKO_INCL_EEW_PS and EKPO_INCL_EEW_PS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "ה-PDF (Document Version 1.35; בקשת HEAD ב-2026-09-24: HTTP 200, application/pdf, 10,174,700 בתים) " +
          "נושא את אותם שלושה פריטים באותו נוסח: 38.13 (MM-PUR-PO, SAP Note 3092824, עמ' 965-968) נוקב ב-ME21N " +
          "רק ב-Other Terms (עמ' 968) ואינו קובע דבר על מעמד הטרנזקציה; 38.9 (SRM-EBP-SHP, SRM-CAT, MM-PUR-GF, " +
          "SAP Note 2271166, עמ' 960-961) נקרא במלואו ואינו נוקב ב-ME21N; 38.2 (MM-PUR-GF, SAP Note 2267449, " +
          "עמ' 941-942) מונה את ME21, ME22, ME23, ME24, ME25, ME27, ME28, ME51, ME52, ME53, ME54, ME59, MR01 " +
          "ו-MR1M תחת 'Transactions are NO longer supported in SAP S/4HANA on-premise edition', ואת ME21N לא. " +
          "בחיפוש טקסטואלי בכל ה-PDF המחרוזת ME21N מופיעה פעם אחת בלבד, ב-Other Terms של 38.13.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Purchasing Applications in Single-Screen Transactions: Purchase Requisition and Purchase Order | " +
          "Purchasing (MM-PUR)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/967e1c2a6a8c4183b7e07d28e7574445/787db65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "מעמד ECC: בתיעוד SAP ERP 6.0 EHP8 (versionId 6.18.latest, loio 787db65334e6b54ce10000000a174cb4) " +
          "ME21N היא טרנזקציית המסך האחד ליצירת הזמנת רכש ('Create Purchase Order ... Create ME21N', לצד ME22N " +
          "ו-ME23N), והסניפט מונה בנפרד את הטרנזקציות הקודמות: 'Purchase order: Create ME21, Change ME22, and " +
          "Display ME23'. אותו מיפוי פעילות ('Create purchase order ME21N') מופיע גם בנושא Process Purchase " +
          "Orders (MM-PUR) של SAP ERP 6.18.latest (loio 8307b753128eb44ce10000000a174cb4) באותה ריצת חיפוש. " +
          "כלומר ME21N קיימת באותו תפקיד ב-ECC וב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Create Purchase Order, Create Purchase Order - Advanced | SAP Fiori Apps Reference Library, " +
          "Apps('ME21N'), release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01 (S32OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('ME21N')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה, כפי שהדפיס scripts/fal-app.mjs ב-2026-09-24 משירות ה-OData הציבורי של הספרייה למהדורה " +
          "S32OP (SAP S/4HANA 2025 FPS01): שם האפליקציה 'Create Purchase Order, Create Purchase Order - " +
          "Advanced', סוג ו-UI technology 'SAP GUI / SAP GUI', Published, רכיב יישום MM-PUR (Purchasing); " +
          "תפקידים SAP_BR_PURCHASER (R0128, Purchaser) ו-SAP_BR_CENTRAL_PURCHASER (R0128-119, Purchaser - " +
          "Central Procurement) לצד שני תפקידי ACM; קטלוגים עסקיים SAP_PRC_BC_PURCHASER_PO 'Purchasing - " +
          "Purchase Order Processing' ו-SAP_PRC_BC_PURCHASER_CPO 'Purchasing - Central Purchase Order " +
          "Processing'; intent PurchaseOrder-create; ללא שירות OData ('OData: -'); טרנזקציית GUI מובילה ME21N " +
          "(related ME21N); backend S4CORE 109 - SP 0001 / SAP S/4HANA 2025; רשימת המהדורות המודפסת נעה מ-S6OP " +
          "(1610) ועד S32OP ו-S32PCE (2025 FPS01) וכוללת גם S36 (2602) ו-S37 (2608); 'predecessors: -; " +
          "successors: -'. כלומר הספרייה מציגה את ME21N עצמה כאפליקציית SAP GUI בלוח ה-Fiori, ללא קודמת וללא " +
          "יורשת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Purchase Orders (Version 2) | SAP Fiori Apps Reference Library, Apps('F0842A'), release S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01 (S32OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0842A')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה, כפי שהדפיס scripts/fal-app.mjs ב-2026-09-24 למהדורה S32OP (SAP S/4HANA 2025 FPS01): " +
          "שם 'Manage Purchase Orders (Version 2)', סוג 'Transactional / SAP Fiori elements', Published, רכיב " +
          "יישום MM-FIO-PUR-PO (Fiori UI for Purchase Orders); תפקידים SAP_BR_PURCHASER (R0128) " +
          "ו-SAP_BR_CENTRAL_PURCHASER (R0128-119); קטלוגים עסקיים SAP_PRC_BC_PURCHASER_PO " +
          "ו-SAP_PRC_BC_PURCHASER_CPO; intent PurchaseOrder-manage; OData MM_PUR_PO_MAINT_V2_SRV 0001 (S4CORE " +
          "109); טרנזקציות GUI: מובילה ME21, related ME21N, ME22, ME22N, ME23, ME23N, ME9F, ME9FF; " +
          "'predecessors: F0842 Manage Purchase Orders; successors: -'. כלומר F0842A היא גרסה 2 של Manage " +
          "Purchase Orders ו-F0842 קודמתה, והספרייה מקשרת אותה ל-ME21N כטרנזקציה קשורה (related) ולא כיורשת של " +
          "ME21N.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL) ושכבת מחזור החיים, רשומות ME21N",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tx-intel.ts#ME21N: שדה s4 'זמין במלואו ב-S/4HANA. נשאר הטרנזקציה המרכזית; מומלץ להשתמש גם " +
          "באפליקציות Fiori Create Purchase Order. ME21 הישן (GUI לא-Enjoy) deprecated', obsolete: ['ME21'], " +
          "fiori: 'Create Purchase Order (Advanced) - F0842A' (במאגר מופיע קו מפריד ארוך), טבלאות " +
          "EKKO/EKPO/EKET/EKKN/EKPV, BAPIs BAPI_PO_CREATE1/BAPI_PO_GETDETAIL. data/lifecycle.ts#ME21N: Active, " +
          "ecc:true, s4:true, fiori 'Create Purchase Order (F0842A)'. שתי הרשומות תואמות את המקורות הרשמיים " +
          "לגבי הזמינות ולגבי היורשות של ME21; שתיהן מצמידות את המזהה F0842A לשם Create Purchase Order, בעוד " +
          "התיעוד הרשמי במהדורת 2025.001 (Feature Comparison, Further Information / Basic Functions) מצמיד " +
          "F0842A ל-Manage Purchase Orders ומזהה את Create Purchase Order - Advanced במזהה האפליקציה ME21N. " +
          "הסטטוס הנגזר שהאפליקציה הציגה לפני רשומה זו: המילה deprecated בשדה s4 (המתייחסת ל-ME21) נלכדת " +
          "ב-OBSOLETE_RE של components/neo-shell/data/tx-detail.ts (נמדד ב-2026-09-24: /deprecat/ תואם, " +
          "CHANGED_RE לא), ולכן buildS4 מחזיר disposition 'superseded' ברמת אמון partial וה-mapper מציג 'הוחלף " +
          "ב-S/4HANA' ללא יורשת, בניגוד למקורות הרשמיים.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME21N",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: ME21N_PROCESS_PO_2025,
      secondary: [
        "fiori_alternative_available",
      ],
      he:
        "ME21N היא טרנזקציית המסך האחד ליצירת הזמנת רכש, ומיפוי הפעילות הסטנדרטי 'Create purchase order' " +
        "ב-SAP S/4HANA On-Premise 2025 FPS01 (נושא Process Purchase Orders (MM-PUR)). היא היורשת המתועדת של " +
        "ME21 הקלאסית (נושא Enjoy Purchase Order), ובלוח ה-Fiori היא זמינה כאפליקציית SAP GUI for HTML בשם " +
        "Create Purchase Order - Advanced (app ID ME21N). SAP ממליצה על אפליקציית ה-Fiori Manage Purchase " +
        "Orders (F0842A) ליצירה, שינוי והצגה של הזמנות רכש, אך טבלת ההשוואה הרשמית מסמנת תכונות שרק " +
        "ME21N/ME22N מכסות (למשל הזמנת העברת מלאי עם ATP ומשלוח, תנאי כותרת, Park and Hold, יצירה מתבנית), " +
        "והזמנה עם תכונה כזו נפתחת מ-Manage Purchase Orders ישירות ב-Create Purchase Order - Advanced. " +
        "במהדורת 2025 נוספה לה לשונית Compliance (בדיקות סחר בינלאומי). שלושת פריטי הפישוט שנבדקו " +
        "(Co-Deployment of SAP SRM, Classic MM-PUR GUI Transactions replacement, CI Include Conflicts in " +
        "EKKO_INCL_EEW_PS) אינם מחליפים, מסירים או מגבילים את ME21N; הפריט השלישי רק מונה אותה ב-Other Terms.",
      recommendedAction:
        "להשאיר את ME21N כטרנזקציית הדיאלוג ליצירת הזמנות רכש ב-S/4HANA On-Premise, ולתעד לצדה את Manage " +
        "Purchase Orders (F0842A) כנתיב ה-Fiori שעליו SAP ממליצה לתרחישים סטנדרטיים; תרחישים שהטבלה הרשמית " +
        "מסמנת כלא נתמכים ב-Fiori (STO עם ATP ומשלוח, תנאי כותרת, Park and Hold, תבניות, סוגי מסמך עם Field " +
        "Control, מקדמות) נשארים ב-ME21N. בשדרוג ל-S/4HANA 2022 ומעלה, אם קיימים CI_EKKODB/CI_EKPODB, לבדוק " +
        "לפני SPDD את מיקומם מול EKKO_INCL_EEW_PS/EKPO_INCL_EEW_PS לפי פריט 14.2.12. במאגר: לנסח מחדש את שדה " +
        "s4 ברשומת ME21N ב-tx-intel.ts כך שלא יכיל את המילה deprecated (המתייחסת ל-ME21), מפני שמנגנון הגזירה " +
        "של דף הטרנזקציה קורא אותה כאילו ME21N עצמה הוחלפה; ולתקן ב-tx-intel.ts וב-lifecycle.ts את הצמדת " +
        "F0842A: F0842A היא Manage Purchase Orders, ו-Create Purchase Order - Advanced נושאת את מזהה " +
        "האפליקציה ME21N.",
    },
    xrefs: [
      "tx:ME21", "tx:ME22N", "tx:ME23N", "tx:ME25", "tx:ME29N", "tx:ME51N", "tx:ME57", "tx:ME59N",
      "tx:MIGO", "tx:MIRO", "bp:procure-to-pay-for-maintenance",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה (2026-09-24; תיעוד רשמי ומאגר בלבד, ללא בדיקה חיה במערכת SAP: ה-MCP של sc4sap לא התחבר בסשן זה, " +
      "'MCP error -32000: Connection closed', ולכן זמינות ME21N במהדורה המותקנת לא נבדקה ב-SE93). שירות " +
      "החיפוש של help.sap.com נשאל דרך scripts/sap-help-search.mjs בשש שאילתות במוצר SAP_S4HANA_ON-PREMISE " +
      "('ME21N create purchase order', 'Enjoy purchase order ME21N ME22N ME23N', 'Create Purchase Order " +
      "Advanced app F0842A', 'Manage Purchase Orders app purchase order', 'ME21N' מוגבל ל-2025.001, " +
      "'Feature Comparison for Managing, Creating and Changing Purchase Orders') ובשאילתה אחת במוצר " +
      "SAP_ERP; ה-url, ה-loio וה-versionId של כל ראיה הועתקו כלשונם מרשומות החיפוש. ארבעה גופי נושאים של " +
      "ה-deliverable Sourcing and Procurement 2025.001 נקראו במלואם דרך http.svc/deliverableMetadata " +
      "(product_url, deliverable_url, topic_url, version, language, state) ו-http.svc/pagecontent " +
      "(deliverable_id 40374862, buildNo 1807): Create Purchase Order - Advanced, Feature Comparison, " +
      "Further Information / Basic Functions ('If a back-end application is accessible on the SAP Fiori " +
      "launchpad, its transaction ID corresponds to the app ID'; 'the SAP Fiori launchpad app Create " +
      "Purchase Order - Advanced (app ID: ME21N) and the SAP Fiori launchpad app Manage Purchase Orders " +
      "(app ID F0842A)'), ו-Purchase Order – Single-Screen Transaction (ME21N, ME22N, and ME23N) (loio " +
      "7e80b65334e6b54ce10000000a174cb4, 8,408 תווים; תכונות Fast Change ו-Print Preview). כל ציטוט מגוף " +
      "מופיע בטקסט שהוחזר; ספירות התווים (16,990 / 2,511 / 8,408) הן אחרי ניקוי HTML, וקריאה חוזרת דרך " +
      "scripts/sap-help-body.mjs מוסיפה כותרת של שתי שורות (17,213 / 2,728 / 8,631), ללא הבדל בתוכן. רשימות " +
      "הפישוט נקראו מתוך הטקסט שחולץ משני ה-PDF הרשמיים, והכתובות אומתו בבקשת HEAD ביום הגישה. ההנחיה " +
      "לרשומה זו ציינה ש-ME21N נקראת בפריט 38.9 / 14.2.1 (Co-Deployment of SAP SRM): הפריט נקרא במלואו בשתי " +
      "הרשימות ואינו נוקב ב-ME21N; האזכור היחיד של ME21N בשתי הרשימות הוא ב-Other Terms של 38.13 / 14.2.12, " +
      "ואזכור כזה אינו פסק על מעמד הטרנזקציה. פריט 14.2.8 / 38.2 מוסיף ממצא שלא נרשם ברשומת tx:ME21 הקיימת " +
      "(שם נכתב שלא נמצא פריט פישוט ל-ME21): ME21, וגם ME22, ME23, ME24, ME25, ME27 ו-ME28, נמנות בפירוש " +
      "כ-'NO longer supported' (SAP Note 2267449, FAQ 1803189), בעוד דף Enjoy Purchase Order של 2025.001 " +
      "קובע 'you can still use transactions ME21, ME22 and ME23, and there are no functional limitations', " +
      "ודף Process Purchase Orders של אותה מהדורה עדיין ממפה את ME25; הסתירה נוגעת לרשומות הקלאסיות ולא " +
      "ל-ME21N, ומתועדת כאן לתיקון בקטלוג. הבדל בתוך התיעוד הרשמי לגבי מזהה האפליקציה: דפי What's New 2023 " +
      "FPS02 ו-2025 ('New Field: Contract Item for Limit') כותבים 'Manage Purchase Orders (App ID F0842)', " +
      "בעוד Sourcing and Procurement 2025.001 ו-What's New 2025 'Integration of Purchase Orders into " +
      "Disposal Channels' כותבים F0842A. ספריית האפליקציות של Fiori נשאלה ב-2026-09-24 דרך " +
      "scripts/fal-app.mjs (שירות ה-OData הציבורי של הספרייה, מהדורה S32OP = SAP S/4HANA 2025 FPS01), ושתי " +
      "הרשומות צוטטו כראיות fiori_library: Apps('ME21N') = 'Create Purchase Order, Create Purchase Order - " +
      "Advanced', SAP GUI, רכיב MM-PUR, טרנזקציה מובילה ME21N, ללא קודמת וללא יורשת; Apps('F0842A') = " +
      "'Manage Purchase Orders (Version 2)', SAP Fiori elements, OData MM_PUR_PO_MAINT_V2_SRV, קודמת F0842 " +
      "'Manage Purchase Orders'. ההבדל F0842 מול F0842A מוסבר אפוא בספרייה: F0842A היא גרסה 2 של האפליקציה " +
      "ו-F0842 קודמתה. F0842A אינה בין 34 מזהי ה-Fiori של data/fiori/apps.ts, ולכן אינה xref ואינה " +
      "successor. EKKO, EKPO, EKET, EKKN ו-BAPI_PO_CREATE1 אינם מזהים בני-פענוח ביקום הפרויקט " +
      "(lib/route-manifest.generated.ts), ולכן אינם ב-xrefs. מספרי SAP Notes בטקסט מצוטטים מה-PDF הציבורי " +
      "בלבד; ההערות עצמן לא נפתחו (S-user), ואף מספר לא נכתב מהזיכרון. מהדורת Public Cloud לא נחקרה. הסטטוס " +
      "'ללא שינוי' נבחר לפי מוסכמת הקטלוג (tx:MIGO, tx:IW31): הטרנזקציה נשארת מיפוי הפעילות הסטנדרטי ואינה " +
      "מוחלפת, מוסרת או מוגבלת; התוספת של מהדורת 2025 (לשונית Compliance) והמלצת SAP על Manage Purchase " +
      "Orders מתועדות בהסבר ובדגל המשני. הרשומה אינה נושאת שדה reviewer: אף רשומה ב-data/verification/** " +
      "אינה נושאת אותו.",
  },
  {
    id: "tx:ME24",
    evidence: [
      ME24_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (Document Version 1.35) · item 38.2 " +
          "S4TWL - Classic MM-PUR GUI Transactions replacement (MM-PUR-GF), pp. 941-942",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "אותו פריט מופיע כבר ברשימת הפישוט של SAP S/4HANA 2023 FPS03 כפריט 38.2 (Application Components: " +
          "MM-PUR-GF; הערת Business Impact 2267449 'S4TWL - Classic MM-PUR GUI Transactions replacement') " +
          "בניסוח זהה: ME24 מנויה בטבלה 'Transactions are NO longer supported in SAP S/4HANA on-premise " +
          "edition' (עמ' 941, בין ME23 ל-ME25), והתיאור קובע 'With SAP S/4HANA, on-premise, these classic MM " +
          "transactions and BAPIs are NO longer supported. The replacements that are available since SAP R/3 " +
          "Enterprise 4.70 shall be used.' הפריט מפנה ל-SAP Note 1803189 ('FAQ: End of Support of ME21, ME51, " +
          "and BAPI_PO_CREATE etc.'). כלומר מעמדה של ME24 כטרנזקציה קלאסית שאינה נתמכת ב-S/4HANA On-Premise " +
          "נשמר ללא שינוי בין מהדורת 2023 FPS03 למהדורת 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "השם הרשמי של הטרנזקציה בתיעוד S/4HANA 2025 FPS01: הנושא 'Process Purchase Orders (MM-PUR)' (loio " +
          "8307b753128eb44ce10000000a174cb4, תאריך 2026-02-24; גוף העמוד, 896 תווים, נקרא במלואו ב-2026-09-24 " +
          "דרך שירות התוכן של הפורטל, http.svc/deliverableMetadata ואחריו http.svc/pagecontent, deliverable_id " +
          "40374615, buildNo 1779) מתאר את התפקיד 'Technical name: SAP_MM_PUR_PURCHASEORDER' ('This role covers " +
          "all the activities necessary to process a purchase order') ומונה בטבלת Activities in Materials " +
          "Management את השורה 'Maintain PO supplement ME24' לצד 'Create purchase order ME21N', 'Change " +
          "purchase order ME22N', 'Display purchase order ME23N', ME25, ME56, ME57, ME58 ו-ME59. כלומר ME24 היא " +
          "תחזוקת תוספת להזמנת רכש (PO supplement), לא מסך השינוי הקלאסי של הזמנת רכש (זו ME22), ותיעוד התפקיד " +
          "במהדורה זו עדיין מונה אותה; אזכור בתיעוד תפקיד אינו הצהרת תמיכה ואינו סותר את פריט הפישוט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "מעמד ECC: אותו נושא במדריך Materials Management (MM) של SAP ERP 6.0 EHP8 (versionId 6.18.latest, " +
          "תאריך 2026-06-12; גוף העמוד, 896 תווים, נקרא במלואו ב-2026-09-24 דרך שירות התוכן של הפורטל, " +
          "deliverable_id 23795313, buildNo 533) זהה תו בתו לגרסת S/4HANA 2025 FPS01 ומונה את 'Maintain PO " +
          "supplement ME24' כפעילות סטנדרטית של התפקיד SAP_MM_PUR_PURCHASEORDER ('Process Purchase Orders'). " +
          "ב-ECC הטרנזקציה מתועדת כפעילות רגילה בעיבוד הזמנות רכש, ללא הסתייגות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת ME24",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת ME24 ב-data/tx-intel.ts רושמת s4: 'קיים ב-S/4HANA אך לא מומלץ; SAP מכוונת ל-ME22N / Fiori. " +
          "נחשב מיושן.', alternative: [\"ME22N\"], obsolete: [\"ME24\"] (רישום עצמי) ומתארת את הקוד כ'שינוי הזמנת " +
          "רכש במסך הקלאסי (לא-Enjoy)'. שדות verified ו-s4Delta אינם קיימים ברשומה, ואף רשומה אחרת ב-TX_INTEL " +
          "אינה מונה את ME24 ב-obsolete שלה; לפי כללי הגזירה של המעטפת (components/neo-shell/data/tx-detail.ts, " +
          "buildS4: רישום עצמי מדולג, הטקסט אינו תואם את OBSOLETE_RE או CHANGED_RE) הקוד מסווג היום 'זמינה " +
          "ב-S/4HANA' ברמת אמון חלקית; נמדד ב-scripts/report-coverage.mjs ב-2026-09-24: tx:ME24 status " +
          "unchanged, level repository_verified, depth 3, edition on-premise. data/lifecycle.ts, " +
          "data/s4-impact.ts ו-data/ecc-s4.ts אינם מזכירים את ME24. התיאור הפונקציונלי במאגר סותר את השם הרשמי " +
          "'Maintain PO supplement': מסך השינוי הקלאסי הוא ME22, לא ME24.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME24",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME24_SIMPL2025,
      he:
        "ME24 (Maintain PO supplement, תחזוקת תוספת להזמנת רכש) מכוסה בפריט הפישוט הרשמי S4TWL - Classic " +
        "MM-PUR GUI Transactions replacement (14.2.8 ברשימת 2025 FPS01, 38.2 ברשימת 2023 FPS03): הטרנזקציות " +
        "הקלאסיות של MM-PUR, וביניהן ME24 בשמה, 'are NO longer supported' ב-SAP S/4HANA On-Premise, והוחלפו " +
        "'by the corresponding transactions and BAPIs made available with SAP R/3 Enterprise 4.70'. הפריט " +
        "אינו נוקב בטרנזקציה עוקבת ספציפית ל-ME24, ולכן לא נרשם successor; תיעוד התפקיד Process Purchase " +
        "Orders במהדורת 2025 FPS01 עדיין מונה את הקוד, וזו גרירת תיעוד ולא הצהרת תמיכה.",
      recommendedAction:
        "לא לבסס תהליכים, הקלטות batch input או קוד לקוח על ME24 ב-S/4HANA On-Premise, ולהתייחס אליה " +
        "כטרנזקציה שאינה נתמכת לפי פריט הפישוט. לבדוק במערכת היעד היכן מתוחזקות תוספות וטקסטים של הזמנת רכש " +
        "בטרנזקציות המסך האחוד (ME22N) ולהעביר לשם את השימוש; אין ברשומה זו מקור רשמי הנוקב במחליפה ייעודית " +
        "ל-ME24. בהמרה: לקרוא את הפריט בקטלוג Simplification Item ואת SAP Notes 1803189 ו-2267449 בגישת " +
        "S-user, ולסרוק קוד לקוח ווריאנטים של batch input שקוראים ל-ME24. במאגר: לתקן את רשומת ME24 " +
        "ב-data/tx-intel.ts (שם ותיאור: תוספת להזמנת רכש, לא שינוי הזמנת רכש) ולהחליף את 'קיים אך לא מומלץ' " +
        "ב'לא נתמך לפי פריט פישוט'.",
    },
    xrefs: [
      "tx:ME21", "tx:ME22", "tx:ME23", "tx:ME25", "tx:ME27", "tx:ME28", "tx:ME21N", "tx:ME22N",
      "tx:ME23N",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "הסטטוס 'פריט פישוט' נבחר מפני שהמקור הרשמי היחיד שמכריע על ME24 הוא פריט הפישוט עצמו, והוא נוקב בקוד " +
      "בשמו בטבלת 'NO longer supported' בשתי המהדורות (2023 FPS03 עמ' 941-942, 2025 FPS01 עמ' 1418-1419; " +
      "שני קובצי ה-PDF הורדו מהכתובות הרשמיות ב-2026-09-24, 10,174,700 ו-10,585,218 בתים בהתאמה, זהה " +
      "ל-Content-Length שמחזיר השרת, 1,482 ו-1,514 עמודים; המספרים המודפסים 'Page | N' זהים למספרי העמודים " +
      "הפיזיים). הטוקנים 'הוחלף', 'לא אסטרטגי' ו'לא זמין' דורשים מזהה יורש שמקור רשמי נוקב בו, ואף מקור " +
      "רשמי שנמצא אינו נוקב במחליפה ייעודית ל-ME24: הפריט מנסח את ההחלפה למשפחה כולה, ועמוד Enjoy Purchase " +
      "Order (loio 8082cf535b804808e10000000a174cb4, 2025.001) נוקב רק ב-ME21, ME22 ו-ME23 כמוחלפות " +
      "ב-ME21N/ME22N/ME23N; ME22N שברשומת tx-intel הוא היסק, לא ציטוט, ולכן לא נרשם successor. הפריט אומר " +
      "'NO longer supported', לא 'removed': תיעוד התפקיד Process Purchase Orders במהדורת 2025 FPS01 עדיין " +
      "מונה 'Maintain PO supplement ME24', וזה נרשם כגרירת תיעוד, לא כהוכחת תמיכה. מספרי ה-SAP Notes ברשומה " +
      "(2267449, 1803189, 144081) מודפסים כלשונם בגוף הפריט ולא הוקלדו מהזיכרון; שדה sapNote לא הוזן (אין " +
      "קישור me.sap.com נגיש ללא S-user), ותוכן ההערות עצמן לא נקרא. השורה 'Custom Code related information " +
      "SAP Note: 2228261' המודפסת מיד מעל כותרת הפריט שייכת לפריט הקודם (38.1 / 14.2.7 S4TWL - MM-PUR " +
      "WebDynpro Applications), לא לפריט זה. סתירת מאגר: data/tx-intel.ts מתאר את ME24 כמסך השינוי הקלאסי " +
      "של הזמנת רכש וכחלופה ישנה ל-ME22N, בעוד השם הרשמי בשתי המהדורות הוא 'Maintain PO supplement' (מסך " +
      "השינוי הקלאסי הוא ME22); תיקון הרשומה נרשם לתור. ממצא גלישה: רשומות tx:ME21, tx:ME22 ו-tx:ME23 בשכבת " +
      "האימות קובעות שלא נמצא פריט פישוט למשפחה או משאירות את הבדיקה פתוחה, ואילו פריט 38.2 / 14.2.8 מונה " +
      "את שלושתן בשמן; סומן לתור. חיפוש Help ‏(On-Premise ו-SAP ERP) בשש וריאציות לא החזיר עמוד What's New " +
      "או עמוד תיעוד ייעודי ל-ME24 מעבר לטבלאות התפקיד; חיפוש רשת מוגבל לדומיינים הרשמיים החזיר את אותו " +
      "נושא תפקיד. לא בוצעה בדיקת מערכת SAP חיה (ה-MCP של sc4sap לא התחבר), ולכן קיום הקוד ב-SE93, התנהגותו " +
      "בקריאה והמסלול בפועל לתוספות הזמנת רכש במהדורה המותקנת נשארים לאימות במערכת. ‏accessedAt = " +
      "2026-09-24, מועד הגישה בפועל לשירות החיפוש, לשירות התוכן ולקובצי ה-PDF. הרשומה אינה נושאת שדה " +
      "reviewer, כמוסכמת הקטלוג; מסלול הביקורת (חוקר + מבקר אדברסרי, 2026-09-24) מתועד בהערות אלו.",
  },
  {
    id: "tx:ME25",
    evidence: [
      ME25_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 and SAP S/4HANA Cloud Private " +
          "Edition 2023 - Feature Pack Stack 3 (Document Version 1.35, 2025-02-25) · item 38.2 S4TWL - Classic " +
          "MM-PUR GUI Transactions replacement (MM-PUR-GF), pp. 941-942",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט 38.2 ‏(Application Components: MM-PUR-GF; Business Impact note 2267449 'S4TWL - Classic MM-PUR " +
          "GUI Transactions replacement') מונה את ME25 בעמ' 941 באותה שורת טבלה, 'Transactions are NO longer " +
          "supported in SAP S/4HANA on-premise edition' (ME21, ME22, ME23, ME24 ו-ME25 בעמ' 941; ME27, ME28, " +
          "ME51, ME52, ME53, ME54, ME59, MR01 ו-MR1M בעמ' 942), ובנוסח Description זהה לזה של 2025 FPS01: 'With " +
          "SAP S/4HANA, on-premise, these classic MM transactions and BAPIs are NO longer supported. The " +
          "replacements that are available since SAP R/3 Enterprise 4.70 shall be used', וכן 'No influence on " +
          "business processes expected'. גם פריט זה מפנה ל-SAP Notes 1803189 ו-144081 (כפי שהודפסו, לא נקראו) " +
          "ואינו נוקב ביורשת ספציפית ל-ME25. הטקסט נקרא מחילוץ ה-PDF; כתובת הקובץ החזירה ב-2026-09-24 ‏HTTP 200 " +
          "עם content-length של 10,174,700 בתים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (loio 8307b753128eb44ce10000000a174cb4, versionId 2025.001, תאריך 2026-02-24) וגוף " +
          "העמוד, שנקרא במלואו דרך שירות התוכן של הפורטל (help.sap.com/http.svc/pagecontent, ‏896 תווים לאחר " +
          "הסרת תגיות), מתעדים את תפקיד ה-PFCG‏ 'Technical name: SAP_MM_PUR_PURCHASEORDER' ('This role covers " +
          "all the activities necessary to process a purchase order') ואת טבלת 'Activities in Materials " +
          "Management' שלו, ובה השורה 'Create purchase order - vendor unknown ME25' מיד אחרי 'Create purchase " +
          "order ME21N' ולפני 'Change purchase order ME22N', 'Display purchase order ME23N', 'Assign source to " +
          "purchase requisition ME56', 'Assign and process purchase requisitions ME57', 'Order for assigned " +
          "purchase requisitions ME58', 'Generate purchase orders from requisitions automatically ME59' " +
          "ו-'Maintain PO supplement ME24'. כלומר תיעוד S/4HANA 2025 FPS01 עדיין מציג את ME25 כטרנזקציית התפקיד " +
          "הסטנדרטי ליצירת הזמנת רכש כשהספק אינו ידוע; העמוד אינו מזכיר פריט פישוט, הסרה או סטטוס תמיכה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/8307b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "בתיעוד SAP ERP 6.0 EHP8 (רשומת חיפוש בהיקף --product SAP_ERP, versionId 6.18.latest, אותו loio " +
          "8307b753128eb44ce10000000a174cb4; גוף העמוד נקרא במלואו דרך שירות התוכן של הפורטל) מופיעה אותה טבלת " +
          "פעילויות של התפקיד SAP_MM_PUR_PURCHASEORDER עם השורה 'Create purchase order - vendor unknown ME25', " +
          "תו בתו כמו במהדורת S/4HANA 2025 FPS01. זהו מעמד ה-ECC של הקוד: טרנזקציה סטנדרטית ומתועדת של רכש " +
          "(MM-PUR) ליצירת הזמנת רכש כשהספק אינו ידוע, בתפקיד עיבוד הזמנות הרכש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת ME25",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר (module MM, area 'רכש (Purchasing), הזמנות רכש') מתארת את ME25 כ'יצירת הזמנת רכש ע\"ב " +
          "Source Determination', מסך קלאסי (SAPMM06E) ליצירת PO עם ספק לא ידוע וקביעת מקור אוטומטית מ-source " +
          "list (EORD), עם הערת s4: 'קיים ב-S/4HANA אך מיושן; ME21N הוא הדרך המומלצת', alternative: ['ME21N'] " +
          "ו-obsolete: ['ME25'] (הרשומה מונה את עצמה). היא קושרת את הקוד ל-ME01 ול-ME11 (רשימת מקורות ורשומת " +
          "אינפו), לטבלאות EKKO, EKPO ו-EORD ול-BAPI_PO_CREATE1. הרשומה אינה מזכירה את פריט הפישוט ואינה מציינת " +
          "מקור לטענת 'מיושן'; אף שכבה אחרת במאגר (lifecycle, ecc-s4, s4-impact, tcode-catalog) אינה מכילה " +
          "רשומת ME25.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME25",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME25_SIMPL2025,
      he:
        "ME25 ‏(Create Purchase Order - Vendor Unknown, המסך הקלאסי ליצירת הזמנת רכש כשהספק אינו ידוע) נמנית " +
        "בשמה בפריט הפישוט הרשמי 'S4TWL - Classic MM-PUR GUI Transactions replacement' ‏(MM-PUR-GF): פריט " +
        "14.2.8 ברשימת הפישוט של SAP S/4HANA 2025 FPS01 ופריט 38.2 ברשימה של 2023 FPS03, בשורת הטבלה " +
        "'Transactions are NO longer supported in SAP S/4HANA on-premise edition' לצד ME21, ME22, ME23, ME24, " +
        "ME27, ME28, ME51, ME52, ME53, ME54, ME59, MR01 ו-MR1M. לפי הפריט, הטרנזקציות הקלאסיות של MM " +
        "לאובייקטים Purchase Order, Purchase Requisition ו-Supplier Invoice הוחלפו בטרנזקציות וב-BAPIs שסופקו " +
        "החל מ-SAP R/3 Enterprise 4.70, ובהן יש להשתמש; הפריט אינו נוקב ביורשת ספציפית ל-ME25 ואינו קובע הסרה " +
        "שלה מהמערכת, ותיעוד S/4HANA 2025 FPS01 עדיין מונה 'Create purchase order - vendor unknown ME25' " +
        "בטבלת הפעילויות של התפקיד SAP_MM_PUR_PURCHASEORDER. לכן הסטטוס הוא פריט פישוט: הקוד קיים ומתועד " +
        "במהדורה הנוכחית, אך רשימת הפישוט מסווגת אותו כטרנזקציה קלאסית שאינה נתמכת עוד ב-S/4HANA On-Premise.",
      recommendedAction:
        "לא לבסס תהליכים חדשים, הדרכות או פיתוחים על ME25 בהמרה ל-S/4HANA On-Premise: הקוד מופיע ברשימת " +
        "הפישוט תחת 'Transactions are NO longer supported in SAP S/4HANA on-premise edition'. את תרחיש 'ספק " +
        "לא ידוע' לבחון במסלול טרנזקציית המסך האחוד ME21N ‏(אותה טבלת פעילויות רשמית מציגה אותה כ-'Create " +
        "purchase order') או באפליקציית Fiori מתאימה, ולפני ההחלטה לקרוא את SAP Note 1803189 ‏('FAQ: End of " +
        "Support of ME21, ME51, and BAPI_PO_CREATE etc.'), שהפריט מפנה אליה ואשר לא נקראה כאן (דורשת S-user). " +
        "אף מקור רשמי שנקרא אינו קובע ש-ME21N היא היורשת המוצהרת של ME25 דווקא, ולכן לא נרשם successor; " +
        "במערכת היעד יש לבדוק ב-SE93 שהקוד עדיין קיים ולוודא שקביעת מקור האספקה (source list, info records, " +
        "outline agreements, quota arrangements) מכוסה במסלול החלופי שנבחר.",
    },
    xrefs: [
      "tx:ME21N", "tx:ME21", "tx:ME22", "tx:ME23", "tx:ME24", "tx:ME27", "tx:ME28", "tx:ME56",
      "tx:ME57", "tx:ME58", "tx:ME01",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) שני פריטי הפישוט הרשמיים (14.2.8 ברשימת 2025 FPS01, 38.2 ברשימת 2023 FPS03) מונים את " +
      "ME25 בשמה בשורה 'Transactions are NO longer supported in SAP S/4HANA on-premise edition'; הקריאה " +
      "שהקוד שייך לשורת הטרנזקציות ולא לשורת ה-BAPIs נובעת מפריסת הטבלה בחילוץ הטקסט (קודי טרנזקציה מול " +
      "שמות BAPI), והנוסח המלא מצוטט בראיות. הפריט מנוסח כפעולה קבוצתית לכל הטרנזקציות הקלאסיות של MM-PUR " +
      "ואינו מוסר פרטים ל-ME25 בנפרד. (2) גוף העמוד 'Process Purchase Orders (MM-PUR)' נקרא במלואו בשתי " +
      "המהדורות (S/4HANA 2025.001 ו-SAP ERP 6.18.latest) דרך help.sap.com/http.svc/deliverableMetadata " +
      "ו-http.svc/pagecontent, והשורה 'Create purchase order - vendor unknown ME25' זהה בשתיהן. (3) העמוד " +
      "'Creating Purchase Orders with Source Determination' (Sourcing and Procurement, S/4HANA 2025.001, " +
      "loio ab7fb65334e6b54ce10000000a174cb4, תאריך 2026-04-01) נקרא במלואו: הוא מתעד את המסלול 'Choose " +
      "Purchase order > Create > Vendor unknown', את קביעת המקור 'on the basis of existing quota " +
      "arrangements, source list records, outline agreements, and/or info records', את 'Edit > Assign " +
      "supply source', 'Edit > Generate purchase order' ו-'Purchase order > Save as requisition', אך אינו " +
      "מדפיס את הקוד ME25 (ולא ME21N); לכן הוא הקשר לתהליך ולא ראיה על הקוד, ולא נכלל כראיה. (4) העמוד " +
      "'Enjoy Purchase Order' (2025.001, loio 8082cf535b804808e10000000a174cb4) נקרא במלואו: 'The Enjoy " +
      "purchase order (transactions ME21N, ME22N, ME23N) replaces the previous purchase order (transactions " +
      "ME21, ME22, ME23). However, you can still use transactions ME21, ME22 and ME23, and there are no " +
      "functional limitations'; ME25 אינה מוזכרת בו, ולכן אין מקור רשמי הקובע יורשת פרטנית ל-ME25, והסטטוס " +
      "נכתב simplified ולא replaced. (5) הסתירה-לכאורה בין רשימת הפישוט ('NO longer supported') לבין המשך " +
      "הופעת הקוד בטבלת התפקיד במהדורה הנוכחית אינה מטופלת כ-conflicting_sources: מדובר בהצהרת תמיכה מול " +
      "נוכחות בתיעוד, אותו דפוס שנרשם ב-tx:ME21 ('הוחלפה אך לא הוסרה'). מה שלא אומת: (א) SAP Notes 2267449, " +
      "1803189 ו-144081 וקטלוג פריטי הפישוט דורשים S-user ולא נקראו; המספרים מצוטטים כפי שהודפסו ואינם " +
      "נישאים בשדה sapNote. (ב) לא נמצא עמוד What's New או עמוד help.sap.com אחר הנוקב ב-ME25 מלבד עמוד " +
      "התפקיד: החיפושים 'ME25' (21 רשומות, כולן נסקרו, רק loio 8307b753128eb44ce10000000a174cb4 מדפיס את " +
      "הקוד, גם בהיקף SAP_ERP), 'Create Purchase Order Vendor Unknown', 'ME25 source determination purchase " +
      "order', 'Classic MM-PUR GUI Transactions replacement' (אין נושא help.sap.com הנושא את שם הפריט; " +
      "הפריט קיים רק ברשימות ה-PDF), 'ME21 ME25 no longer supported', 'Creating a Purchase Order (ME21) " +
      "vendor unknown' ו-'Purchase Order Single-Screen Transaction ME21N source determination', ושני חיפושי " +
      "רשת מוגבלי-דומיין (ME25 vendor unknown; SAP Note 1803189, שהחזיר עמוד Support Content 'ME59N " +
      "trouble-shooting guide' ולא את ההערה עצמה; לא צוטט). (ג) אין אפליקציית Fiori לרכש בקטלוג " +
      "data/fiori/apps.ts, ולכן אין xref ל-Fiori; רשומות What's New ('New Field: Contract Item for Limit', " +
      "2023 FPS02 ו-2025) נוקבות ב-'Manage Purchase Orders (App ID F0842)' וב-'Create Purchase Order - " +
      "Advanced (App ID ME21N)', אך F0842 אינו מזהה בעולם המזהים של הפרויקט ואף מקור אינו קושר אפליקציה אלה " +
      "ל-ME25, ולכן לא נרשמו כיורשת. (ד) ה-MCP ל-ABAP‏ (sc4sap) לא התחבר בסשן זה ('Connection closed'), " +
      "ולכן אין בדיקת SE93 שהקוד קיים במערכת יעד. (ה) קובצי ה-PDF לא הורדו מחדש היום: הטקסט נקרא מחילוצי " +
      "pdftotext השמורים בפרויקט (scratchpad/official/SIMPL_OP2025.pdf.txt ו-SIMPL_OP2023.pdf.txt " +
      "מ-2026-09-22, לפי הכתובות הרשומות ב-audit/master-completion/simpl-tcode-index.json), ורק כותרות " +
      "ה-HTTP של שתי הכתובות נבדקו ב-2026-09-24. סטטוס נגזר לפני שכבת-העל, נמדד ב-2026-09-24 בהרצת " +
      "txDetail('ME25') ו-txStatusMap() מ-components/neo-shell/data/tx-detail.ts דרך " +
      "scripts/alias-loader.mjs (לא בדפדפן): disposition 'changed' ('משתנה ב-S/4HANA'), supersededBy ריק, " +
      "replaces ['ME25'], risk medium, trust partial, ו-txStatusMap()['ME25'] = 'changed'; הסיבה: אף רשומת " +
      "tx-intel אחרת אינה מונה את ME25 ב-obsolete (הרשומה מונה את עצמה, והאינדקס מדלג על כך), והערת ה-s4 " +
      "תואמת ל-CHANGED_RE דרך 'המומלצת'. סחף מאגר לתיקון בפס נפרד: ההערה 'מיושן' ברשומת tx-intel אינה מפנה " +
      "לפריט הפישוט, ו-obsolete: ['ME25'] מונה את הקוד את עצמו. ראיית ה-ECC נושאת release = 6.18.latest " +
      "(ה-versionId של רשומת החיפוש, כמוסכמת HOUSE-RULES); התווית האנושית SAP ERP 6.0 EHP8 נשמרת בטקסט " +
      "הטענה.",
  },
  {
    id: "tx:ME27",
    evidence: [
      ME27_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 and SAP S/4HANA Cloud Private " +
          "Edition 2023 - Feature Pack Stack 3 (Document Version 1.35) · item 38.2 S4TWL - Classic MM-PUR GUI " +
          "Transactions replacement (MM-PUR-GF), pp. 941-942",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "אותו פריט מופיע כבר ברשימת הפישוט של SAP S/4HANA 2023 FPS03 כפריט 38.2 (Application Components: " +
          "MM-PUR-GF; הערת Business Impact 2267449 'S4TWL - Classic MM-PUR GUI Transactions replacement') " +
          "בניסוח זהה: ME27 מנויה בטבלה 'Transactions are NO longer supported in SAP S/4HANA on-premise " +
          "edition' (עמ' 942, ברשימה הרציפה ME21 ME22 ME23 ME24 ME25 [עמ' 941] ME27 ME28 ME51 ME52 ME53 ME54 " +
          "ME59 MR01 MR1M), והתיאור זהה: 'With SAP S/4HANA, on-premise, these classic MM transactions and BAPIs " +
          "are NO longer supported. The replacements that are available since SAP R/3 Enterprise 4.70 shall be " +
          "used.' הפריט מפנה ל-SAP Notes 1803189 ו-144081 (כפי שהודפסו, לא נקראו). כלומר מעמדה של ME27 " +
          "כטרנזקציה קלאסית שאינה נתמכת ב-S/4HANA On-Premise נשמר ללא שינוי בין מהדורת 2023 FPS03 למהדורת 2025 " +
          "FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle:
          "Plant Return and Store Return with Stock Transport Order | Inventory Management and Inventory " +
          "(MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/b760bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף הנושא (loio b760bd534f22b44ce10000000a174cb4, deliverable 40374236, buildNo 1779, תאריך " +
          "2026-02-24) נקרא במלואו ב-2026-09-24 דרך שירות התוכן של הפורטל " +
          "(help.sap.com/http.svc/deliverableMetadata ואחריו http.svc/pagecontent). בסעיף Activities כתוב " +
          "כלשונו: 'Stock transport order (ME21N or ME27) Create a stock transport order and select Returns " +
          "Item. Note that you can remove this indicator again in the Enjoy order (ME21N), whereas the " +
          "indicator cannot be changed subsequently in the \"old\" order (ME21 and ME27).' כלומר בתיעוד S/4HANA " +
          "2025 FPS01 הנוכחי, ME27 עדיין מתועדת כדרך תקפה ליצירת הזמנת רכש להעברת מלאי (Stock Transport Order) " +
          "בתהליך Plant Return / Store Return, לצד ME21N, ומכונה 'the \"old\" order' (המסך הישן) לעומת ה-Enjoy " +
          "order ME21N. העמוד אינו מזכיר פריט פישוט או סטטוס תמיכה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Plant Return and Store Return with Stock Transport Order | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/b704a8db767040a08100adc846218964/b760bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (loio זהה, b760bd534f22b44ce10000000a174cb4, versionId 6.18.latest, תאריך 2026-06-12, " +
          "בהיקף --product SAP_ERP) מדפיסה את אותו קטע כלשונו בתקציר: 'Note that you can remove this indicator " +
          "again in the Enjoy order (ME21N), whereas the indicator cannot be changed subsequently in the \"old\" " +
          "order (ME21 and ME27) ... Activities Stock transport order(ME21N or ME27) Create a stock transport " +
          "order and select Returns Item.' הגוף המלא לא נקרא בהיקף זה (נקרא רק במהדורת S/4HANA 2025.001, אותו " +
          "loio); הטענה כאן מוגבלת לתקציר. זהו מעמד ה-ECC של הקוד: טרנזקציה מתועדת ליצירת STO בתהליך Plant " +
          "Return / Store Return, לצד ME21N.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת ME27",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת ME27 ב-data/tx-intel.ts (module MM, area 'רכש (Purchasing), הזמנות העברת מלאי') מתארת את הקוד " +
          "כ'יצירת הזמנת רכש להעברת מלאי (Stock Transport Order, STO) במסך הקלאסי, להעברת חומרים בין מפעלים " +
          "בתוך הארגון', document type UB (intra-company) / NB, כותבת EKKO/EKPO עם supplying plant; שדה s4: " +
          "'זמין ב-S/4HANA; ME21N עם doc type STO מועדף. Advanced Intercompany Sales/STO ב-S/4 מרחיב זאת.', " +
          "alternative: ['ME21N'], obsolete: [] (הרשומה אינה מונה את עצמה, בניגוד ל-ME24/ME25). 'Advanced " +
          "Intercompany Sales/STO' אינו שם מתועד באף מקור רשמי שנמצא כאן; אף שכבה אחרת במאגר (lifecycle, " +
          "ecc-s4, s4-impact, tcode-catalog) אינה מכילה רשומת ME27.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME27",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME27_SIMPL2025,
      he:
        "ME27 (המסך הקלאסי ליצירת הזמנת רכש להעברת מלאי בין מפעלים, Stock Transport Order, כמתואר ברשומת " +
        "המאגר) מכוסה בפריט הפישוט הרשמי S4TWL - Classic MM-PUR GUI Transactions replacement (14.2.8 ברשימת " +
        "2025 FPS01, 38.2 ברשימת 2023 FPS03, MM-PUR-GF): הטרנזקציות הקלאסיות של MM-PUR, וביניהן ME27 בשמה, " +
        "'are NO longer supported' ב-SAP S/4HANA On-Premise, והוחלפו 'by the corresponding transactions and " +
        "BAPIs made available with SAP R/3 Enterprise 4.70'. הפריט אינו נוקב בטרנזקציה עוקבת ספציפית ל-ME27; " +
        "עם זאת, נושא התיעוד 'Plant Return and Store Return with Stock Transport Order' במהדורת S/4HANA 2025 " +
        "FPS01 עדיין מתאר את ME27 כלשונו כדרך תקפה ליצירת Stock Transport Order (לצד ME21N), ומכנה אותה 'the " +
        "\"old\" order' לעומת ה-'Enjoy order' ME21N. לכן הסטטוס הוא פריט פישוט: הקוד קיים ומתועד להלכה במהדורה " +
        "הנוכחית כחלופת המסך הקלאסי ל-STO, אך רשימת הפישוט מסווגת אותו כטרנזקציה שאינה נתמכת עוד ב-S/4HANA " +
        "On-Premise.",
      recommendedAction:
        "לא לבסס תהליכים, הקלטות batch input או קוד לקוח על ME27 ב-S/4HANA On-Premise, ולהתייחס אליה " +
        "כטרנזקציה שאינה נתמכת לפי פריט הפישוט למרות שנושא Plant Return / Store Return עדיין מתעד אותה. לבחון " +
        "את יצירת ה-Stock Transport Order דרך ME21N (עם document type STO מתאים, UB/NB) כמסלול המסך האחוד " +
        "המתועד כתחליף ('Enjoy order'), ולפני ההחלטה לקרוא את SAP Note 1803189 ('FAQ: End of Support of ME21, " +
        "ME51, and BAPI_PO_CREATE etc.') שהפריט מפנה אליה ולא נקראה כאן (דורשת S-user). אין ברשומה זו מקור " +
        "רשמי הנוקב במחליפה ייעודית ל-ME27, ולכן לא נרשם successor; במערכת היעד יש לבדוק ב-SE93 שהקוד עדיין " +
        "קיים ולוודא שתרחיש Plant Return / Store Return (שדה Returns Item, שאינו ניתן לשינוי לאחור ב-ME27 כמו " +
        "ב-ME21N) מכוסה במסלול החלופי שנבחר. במאגר: לתקן את שדה s4 ברשומת ME27 ב-data/tx-intel.ts כך שלא " +
        "ייכתב 'זמין ב-S/4HANA' סתם, אלא שהקוד מכוסה בפריט הפישוט 'Classic MM-PUR GUI Transactions " +
        "replacement' ואינו נתמך עוד להלכה; 'Advanced Intercompany Sales/STO' אינו שם מתועד במקור רשמי שנמצא " +
        "ודורש בדיקה נפרדת.",
    },
    xrefs: [
      "tx:ME21N", "tx:ME21", "tx:ME24", "tx:ME25", "tx:ME28", "tx:MIGO", "tx:VL10B", "tx:VL02N",
      "tx:MB1B",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה (2026-09-24; תיעוד רשמי ומאגר בלבד, ללא בדיקה חיה במערכת SAP: ה-MCP של sc4sap לא התחבר בסשן זה, " +
      "לכן זמינות ME27 במהדורה המותקנת לא נבדקה ב-SE93). שירות החיפוש של help.sap.com נשאל דרך " +
      "scripts/sap-help-search.mjs בשלוש שאילתות ('ME27 stock transport order', 'ME27' פעמיים, בהיקף " +
      "SAP_S4HANA_ON-PREMISE ובהיקף --product SAP_ERP); הכתובת, ה-loio וה-versionId של כל ראיה הועתקו " +
      "כלשונם מרשומות החיפוש. גוף הנושא 'Plant Return and Store Return with Stock Transport Order' נקרא " +
      "במלואו דרך scripts/sap-help-body.mjs עבור מהדורת S/4HANA 2025.001 בלבד (deliverable 40374236, " +
      "buildNo 1779); מהדורת SAP ERP (אותו loio) לא נקראה בגוף מלא, והטענה עליה מוגבלת לתקציר החיפוש בלבד, " +
      "כנדרש בכללי ההתנהגות. שני פריטי הפישוט (14.2.8 ברשימת 2025 FPS01, 38.2 ברשימת 2023 FPS03) נקראו מתוך " +
      "חילוצי pdftotext השמורים בפרויקט (scratchpad/official/SIMPL_OP2025.pdf.txt, " +
      "scratchpad/official/SIMPL_OP2023.pdf.txt) ואומתו מול audit/master-completion/simpl-tcode-index.json " +
      "(רישומי ME27 לשני הקבצים). fal-app.mjs --tcode ME27 (מהדורת S32OP = 2025 FPS01) החזיר 'leading " +
      "app(s): none; GUI app entry: none': אין אפליקציית Fiori המובילה בקוד ME27, ולכן אין xref ל-Fiori " +
      "ואין fiori_alternative_available. ME2ST, EKKO, EKPO, EKET אינם מזהים בני-פענוח ביקום הפרויקט " +
      "(lib/route-manifest.generated.ts) ולכן אינם ב-xrefs; VL10B נבדק מול היקום, נפתר, ומודפס בגוף הנושא " +
      "במהדורת 2025.001 כפעילות ההמשך ('Delivery (VL10B)'), ולכן נכלל ב-xrefs. לא בוצעה בדיקת מערכת SAP " +
      "חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג; עברה סבב ביקורת אדברסרית ב-2026-09-24 (כתובות, " +
      "רשומות חיפוש, גוף העמוד, פריטי הפישוט ופלט fal-app נבדקו מחדש).",
  },
  {
    id: "tx:ME28",
    evidence: [
      ME28_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 and SAP S/4HANA Cloud Private " +
          "Edition 2023 - Feature Pack Stack 3 (Document Version 1.35, 2025-02-25) · item 38.2 S4TWL - Classic " +
          "MM-PUR GUI Transactions replacement (MM-PUR-GF), pp. 941-942",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "אותו פריט מופיע כבר ברשימת הפישוט של SAP S/4HANA 2023 FPS03 כפריט 38.2, בניסוח כמעט זהה: ME28 מנויה " +
          "בטבלת 'Transactions are NO longer supported in SAP S/4HANA on-premise edition' (עמ' 942, בין ME27 " +
          "ל-ME51; ME21 עד ME25 בעמ' 941), עם אותה הפניה ל-SAP Note 1803189. כלומר מעמד ME28 כטרנזקציה קלאסית " +
          "שאינה נתמכת ב-S/4HANA On-Premise נשמר ללא שינוי בין מהדורת 2023 FPS03 למהדורת 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Release Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/cf06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "הנושא 'Release Purchase Orders (MM-PUR)' (loio cf06b753128eb44ce10000000a174cb4, תאריך 2026-02-24; " +
          "גוף העמוד נקרא במלואו ב-2026-09-24 דרך שירות התוכן של הפורטל, deliverable_id 40374615, buildNo 1779) " +
          "מתאר את התפקיד 'Technical name: SAP_MM_PUR_PO_RELEASE': 'You can use this role to release (approve) " +
          "purchase orders. A purchase order may be blocked via a release procedure (if its total value exceeds " +
          "a predefined value - say $10,000 - for instance). Before this purchase order can be outputted..., it " +
          "must be approved (i.e. released).' ובטבלת Activities in Materials Management מונה שורה יחידה: " +
          "'Release purchase order ME28' (כלשונה). אזכור בתיעוד תפקיד אינו הצהרת תמיכה ואינו סותר במפורש את " +
          "פריט הפישוט, אך מראה שהקוד עדיין מתועד כפעילות תקנית במהדורה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Release Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/cf06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "מעמד ECC: אותו נושא במדריך Materials Management (MM) של SAP ERP 6.0 EHP8 (versionId 6.18.latest, " +
          "תאריך 2026-06-12; גוף העמוד נקרא במלואו ב-2026-09-24 דרך שירות התוכן של הפורטל, deliverable_id " +
          "23795313, buildNo 533) זהה תו בתו לגרסת S/4HANA 2025 FPS01, ומונה את 'Release purchase order ME28' " +
          "כפעילות תקנית של התפקיד SAP_MM_PUR_PO_RELEASE. ב-ECC הטרנזקציה מתועדת כפעילות רגילה בתהליך אישור " +
          "הזמנות רכש, ללא הסתייגות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · ME28 Release Purchase Orders (SAP GUI), S/4HANA 2025 FPS01 (S32OP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01 (S32OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('ME28')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ME28 בספריית אפליקציות ה-Fiori (fal-app.mjs, נקרא ב-2026-09-24) עבור S32OP=2025 FPS01 (המהדורה " +
          "On-Premise העדכנית ביותר בספרייה): שם 'Release Purchase Orders', UI Technology 'SAP GUI', סטטוס " +
          "'Deprecated', רכיב 'MM-PUR (Purchasing)', technical catalog 'SAP_TC_PRC_BE_APPS:S4PRC', intent " +
          "'PurchaseOrder-releaseMultiple', GUI transaction leading/related: ME28. שדות predecessors " +
          "ו-successors ריקים ('-') בכל טווח המהדורות המנוי (S6OP=1610 עד S32OP=2025 FPS01); הספרייה אינה נוקבת " +
          "בשום אפליקציית Fiori או טרנזקציה עוקבת רשמית ל-ME28. חיפוש --tcode ME28 החזיר את ME28 עצמה בלבד " +
          "כאפליקציית SAP GUI מובילה, ללא אפליקציית Fiori חלופית רשומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת ME28",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת ME28 ב-data/tx-intel.ts רושמת area 'רכש (Purchasing), אישור הזמנות', descHe 'שחרור/אישור " +
          "הזמנות רכש (Release PO), מסך קולקטיבי לאישור הזמנות לפי אסטרטגיית אישור (release strategy)', s4: " +
          "'זמין ב-S/4HANA; Fiori Approve Purchase Orders / flexible workflow מומלצים כחלופה מודרנית.', fiori: " +
          "'My Inbox / Approve Purchase Orders', alternative: ['ME29N'], obsolete: []. טענת ה-s4/fiori בשדה זה " +
          "(אפליקציית Fiori חלופית בשם) אינה מגובה באף מקור רשמי שנבדק ברשומה זו: ה-FAL אינו נוקב ב-successor " +
          "ל-ME28, ופריט הפישוט אינו נוקב במחליף שמי. זוהי סתירת מאגר מול המקורות הרשמיים, מסומנת לתיקון.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME28",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME28_SIMPL2025,
      he:
        "ME28 (Release Purchase Orders, שחרור/אישור הזמנות רכש) מכוסה בפריט הפישוט הרשמי S4TWL - Classic " +
        "MM-PUR GUI Transactions replacement (14.2.8 ברשימת 2025 FPS01, זהה ל-38.2 ברשימת 2023 FPS03): " +
        "הטרנזקציות הקלאסיות של MM-PUR, וביניהן ME28 בשמה, 'are NO longer supported' ב-SAP S/4HANA " +
        "On-Premise, לפי הפריט הוחלפו 'by the corresponding transactions and BAPIs made available with SAP " +
        "R/3 Enterprise 4.70'. הפריט אינו נוקב בטרנזקציה עוקבת ספציפית ל-ME28, ולכן לא נרשם successor. ספריית " +
        "אפליקציות ה-Fiori עדיין רושמת את ME28 כאפליקציית SAP GUI ב-2025 FPS01 (S32OP) בסטטוס 'Deprecated' " +
        "(לא 'Removed'), ללא predecessor/successor רשום; תיעוד התפקיד SAP_MM_PUR_PO_RELEASE במהדורת 2025 " +
        "FPS01 עדיין מונה את הקוד כפעילות תקנית. הפער בין 'NO longer supported' (פריט הפישוט) ל-'Deprecated' " +
        "עדיין קיים בספרייה נשאר לאימות במערכת חיה.",
      recommendedAction:
        "לא לבסס תהליכים חדשים, הקלטות batch input או קוד לקוח על ME28 ב-S/4HANA On-Premise, ולהתייחס אליה " +
        "כטרנזקציה שאינה נתמכת לפי פריט הפישוט. לבדוק במערכת היעד את אסטרטגיית ה-workflow הגמישה (Flexible " +
        "Workflow) לאישור הזמנות רכש ואת יכולות ה-My Inbox כחלופה מעשית, אך לתעד זאת כהמלצה מבוססת מדיניות " +
        "כללית ולא כ-successor רשמי הנוקב שמית ב-ME28 עד שיימצא מקור כזה. לפני המרה: לקרוא את SAP Notes " +
        "1803189 ו-144081 בגישת S-user, לבדוק בפועל אם הרצת ME28 ב-2025 FPS01 מפיקה הודעת שגיאה או פועלת " +
        "(סתירה בין הסטטוס 'Deprecated' בספריית ה-Fiori לבין 'NO longer supported' בפריט הפישוט), ולסרוק קוד " +
        "לקוח הקורא ל-ME28. במאגר: לתקן את שדות s4/fiori ברשומת data/tx-intel.ts#ME28 כך שלא יציגו ללא מקור " +
        "את 'Approve Purchase Orders' כ-successor רשמי.",
    },
    xrefs: [
      "tx:ME21", "tx:ME22", "tx:ME23", "tx:ME24", "tx:ME25", "tx:ME27", "tx:ME21N", "tx:ME22N",
      "tx:ME29N", "tx:MIGO", "tx:MIRO", "tx:ME9F",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "הסטטוס 'simplified' נבחר בהתאם לתבנית שכבר נקבעה עבור tx:ME24 ו-tx:ME25 באותו קובץ " +
      "(transactions-b.ts, אותו פריט פישוט בדיוק): המקור הרשמי היחיד שמכריע על ME28 הוא פריט הפישוט עצמו, " +
      "שנוקב בקוד בשמו בטבלת 'NO longer supported' בשתי המהדורות (2023 FPS03 עמ' 941-942, ME28 בעמ' 942; " +
      "2025 FPS01 עמ' 1418-1419, ME28 בעמ' 1419; שני קבצי ה-PDF נקראו מ-scratchpad/official/ שהופק מכתובות " +
      "help.sap.com הרשמיות). לא נמצא מקור רשמי הנוקב במחליפה ייעודית ל-ME28: לא ב-Simplification List " +
      "(שמנסחת את ההחלפה למשפחה כולה ולא לכל קוד בנפרד), ולא ב-Fiori Apps Library (fal-app.mjs --tcode ME28 " +
      "מחזיר את ME28 עצמה בלבד כ-'SAP GUI' עם predecessors/successors ריקים בכל טווח המהדורות, כולל " +
      "S32OP=2025 FPS01 העדכנית ביותר). נמצא פער בין ניסוח פריט הפישוט ('NO longer supported') לבין הסטטוס " +
      "'Deprecated' (לא 'Removed') הרשום ל-ME28 בספריית ה-Fiori עדיין עבור 2025 FPS01 - זו אינה סתירה " +
      "מוצהרת בין שני מקורות (הם עוסקים בשכבות שונות: מדיניות המרה מול מלאי מוצרים בספרייה), אך היא נרשמת " +
      "כנקודה פתוחה שדורשת קריאת SAP Notes 1803189/144081 בגישת S-user ובדיקה במערכת SAP חיה כדי להכריע אם " +
      "הריצה בפועל חסומה. נמצאה סתירת מאגר: data/tx-intel.ts#ME28 טוען ל-'Fiori Approve Purchase Orders' " +
      "כחלופה מומלצת ומציין 'My Inbox' כ-fiori בלי מקור רשמי שנבדק שתומך בכך כ-successor שמי; סומן לתור " +
      "התיקון בהערות אלו בלבד, קובץ המקור עצמו לא נערך על ידי הרשומה הזו. חיפוש Help (On-Premise ו-SAP ERP, " +
      "שלוש וריאציות: 'ME28 Release Purchase Order', 'Release Purchasing Document ME28' --product SAP_ERP, " +
      "וחיפוש נוסף בתוך fal-app.mjs) לא החזיר עמוד What's New או תיעוד ייעודי ל-ME28 מעבר לעמוד תפקיד ה-MM. " +
      "לא בוצעה בדיקת מערכת SAP חיה (ה-MCP של sc4sap לא התחבר), ולכן קיום הקוד ב-SE93, התנהגות זמן ריצה " +
      "בפועל (הודעת שגיאה או לא) והמצב במערכת המותקנת נשארים לאימות במערכת. accessedAt = 2026-09-24, מועד " +
      "הגישה בפועל לשירות החיפוש, לשירות התוכן, לקבצי ה-PDF ול-fal-app.mjs. הרשומה אינה נושאת שדה reviewer, " +
      "כמוסכמת הקטלוג.",
  },
  {
    id: "tx:ME2L",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Retail iViews (Simplification List for SAP S/4HANA 2025 FPS01, item 13.15.26, Application " +
          "Component MM-PUR-PO, SAP Note 0002370183 'Retail Buying iViews')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט עוסק בהסרת ה-iViews של Retail Buying (הטרנזקציות WRBDL ו-WRBDL2, שאינן זמינות עוד ב-S/4HANA), " +
          "ולא ב-ME2L עצמה. בסעיף Required and Recommended Action(s) נכתב: 'For open purchase orders there are " +
          "transaction ME2L, ME2M, ME2N or the purchase order Fiori app', כלומר ME2L מוצגת כאחת החלופות הקיימות " +
          "לצפייה במידע שה-iViews שהוסרו נתנו, לא כטרנזקציה שנבדקת או משתנה. הפריט אינו קובע דבר על מעמדה של " +
          "ME2L עצמה (לא 'הוחלפה', לא 'הוסרה', לא 'שונתה'); זהו אזכור בלבד, לא פסיקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Retail iViews (Simplification List for SAP S/4HANA 2023 FPS03, item 60.28, Application " +
          "Components MM-PUR, SAP Note 2370183 'S4TWL - Retail Buying iViews')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "אותו פריט וניסוח זהה מופיעים כבר ברשימת הפישוט של 2023 FPS03, שם הוא ממוספר 60.28 (לא 60.9 כפי שרשום " +
          "ברישום העזר של הפרויקט audit/master-completion/simpl-tcode-index.json; ראו הערה על כך בשדה notes). " +
          "גם כאן: 'For open purchase orders there are transaction ME2L, ME2M, ME2N or the purchase order Fiori " +
          "app' מופיע תחת Required and Recommended Action(s) של פריט Retail iViews, כחלופה לצפייה במקום " +
          "ה-iViews שהוסרו, ולא כפסיקה על ME2L.",
        verificationLevel: "sap_official_verified",
      },
      ME2L_ROLE_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Lists of Purchase Orders (MM-PUR) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו נושא (אותו loio) בתיעוד SAP ERP 6.0 EHP8 (versionId 6.18.latest, תאריך 2026-06-12). גוף הנושא, " +
          "שנקרא דרך sap-help-body.mjs (deliverable 23795313), מציג את אותה שורה 'Purchase orders by vendor " +
          "ME2L' באותה טבלת פעילויות ואת אותה שאלה עסקית. תיעוד ME2L ב-ECC ובמהדורת S/4HANA 2025 FPS01 זהה " +
          "בכותרת ובגוף שני הנושאים.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: ME2L_ROLE_2025,
      he:
        "ME2L (Purchase Orders by Vendor / Purchasing Documents per Vendor) מתועדת כטרנזקציית דיווח סטנדרטית " +
        "פעילה הן ב-SAP ERP 6.0 EHP8 והן ב-SAP S/4HANA 2025 FPS01 On-Premise, באותו נושא Help רשמי ובאותה " +
        "טבלת פעילויות MM-PUR. בחיפוש טקסטואלי בשתי רשימות הפישוט (2023 FPS03 ו-2025 FPS01) נמצא אזכור אחד " +
        "בלבד של הקוד בכל רשימה, בפריט S4TWL - Retail iViews (זהה בשתיהן), והוא אינו קובע דבר על מעמד ME2L " +
        "עצמה: הוא מציין אותה כחלופת דיווח קיימת לתפקוד ה-iViews של Retail Buying שהוסר, לא כטרנזקציה " +
        "שהוחלפה, השתנתה או הוסרה.",
      recommendedAction:
        "ניתן להמשיך להשתמש ב-ME2L לדיווח על הזמנות רכש לפי ספק ב-S/4HANA On-Premise; לא נמצא ברשימות הפישוט " +
        "2023 FPS03 ו-2025 FPS01 פריט המורה על הפסקת השימוש בה או על מעבר לחלופה מחייבת. מומלץ עם זאת לבדוק " +
        "אם קיימת אפליקציית Fiori רלוונטית לתפקוד זה (דוחות או רשימות הזמנות רכש) בקטלוג ה-Fiori Apps Library " +
        "של הארגון, שכן פריט הפישוט מזכיר 'the purchase order Fiori app' בלשון כללית בלבד, ללא מזהה יישום; " +
        "אימות סופי של קיום הטרנזקציה (SE93) ושל זמינותה בפועל בסביבת היעד דורש בדיקה במערכת SAP חיה, שלא " +
        "בוצעה.",
    },
    xrefs: ["tx:ME2M", "tx:ME2N", "tx:ME21N", "tx:ME23N"],
    lastVerifiedAt: DATE24,
    notes:
      "המצב 'unchanged' נשען על תיעוד Help זהה בשתי המהדורות (ECC 6.18.latest ו-S/4HANA 2025.001) המציג את " +
      "ME2L כפעילות תקנית בתפקיד Lists of Purchase Orders (MM-PUR); status.source הוא נושא ה-Help של " +
      "2025.001 (evidence[2]), בהתאם לתקדים tx:MB22 באותו קובץ. המסקנה 'ללא שינוי' היא היסק מהזהות בין שני " +
      "הנושאים ולא ציטוט מפורש של המילה. שני גופי הנושאים נקראו דרך sap-help-body.mjs ב-2026-09-24. חיפוש " +
      "טקסטואלי ב-scratchpad/official/SIMPL_OP2023.pdf.txt וב-SIMPL_OP2025.pdf.txt מצא שורה אחת עם ME2L בכל " +
      "קובץ (70372, 75297), שתיהן בתוך S4TWL - Retail iViews; פריט 14.2.8 S4TWL - Classic MM-PUR GUI " +
      "Transactions replacement ברשימת 2025 FPS01 מונה את ME21, ME22, ME23, ME24, ME25, ME27, ME28, ME51, " +
      "ME52, ME53, ME54, ME59, MR01 ו-MR1M כטרנזקציות שאינן נתמכות עוד, ואינו מונה את ME2L. ממצא תקינות " +
      "במאגר הפרויקט: audit/master-completion/simpl-tcode-index.json ממפה את ME2L בגרסת 2023 למספר פריט " +
      "'60.9' וכותרת 'S4TWL - Retail Additionals', אך שורת ה-PDF שהאינדקס עצמו מצביע עליה (70372) נמצאת " +
      "בפועל בתוך פריט 60.28 'S4TWL - Retail iViews' (כותרת הפריט בשורה 70337); פריט 60.9 (Retail " +
      "Additionals, SAP Note 2371631, מתחיל בשורה 69231) אינו מזכיר את ME2L. זהו באג במיפוי מספר/כותרת " +
      "הפריט באינדקס העזר, מדווח לתור לתיקון, ולא שימש בסיס לטענה כלשהי ברשומה זו. לא נמצא Fiori app ספציפי " +
      "(fal-app.mjs לא הופעל כי לא נמצא מזהה יישום רשמי לחפש; פריט הפישוט מזכיר 'the purchase order Fiori " +
      "app' בלשון כללית בלבד), ולכן אין xref ל-fiori: ואין successor. data/tx-intel.ts אינו מכיל רשומה " +
      "ל-ME2L (הקוד מופיע רק ברשימות alternative של ME23N ו-ME5A); זו הרשומה הראשונה עבור קוד זה בשכבת " +
      "האימות. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "tx:ME2M",
    evidence: [
      ME2M_ROLE_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Lists of Purchase Orders (MM-PUR)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו נושא בדיוק (loio זהה 8d06b753128eb44ce10000000a174cb4) מתועד גם בתיעוד SAP ERP 6.0 EHP8 Latest, " +
          "עם אותה שורת טבלה: 'Purchase orders by material ME2M'. הראיה מבססת ש-ME2M מתועדת באופן זהה גם בצד " +
          "ה-ECC, ולא נמצא שינוי בין שתי המהדורות בתיאור הפעילות הזו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Display Purchasing Documents by Material | SAP Fiori Apps Reference Library, Apps('ME2M'), release " +
          "S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01 (S32OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('ME2M')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ספריית אפליקציות ה-Fiori עבור Apps('ME2M') מציגה אפליקציית SAP GUI בשם 'Display Purchasing " +
          "Documents by Material', רכיב MM-PUR (Purchasing), תפקיד SAP_BR_PURCHASER (Purchaser), קטלוג עסקי " +
          "SAP_PRC_BC_PURCHASER_PO, קטלוג טכני SAP_TC_PRC_BE_APPS:S4PRC, טרנזקציית GUI מובילה ומשויכת ME2M; " +
          "שורת ה-releases ברשומה מונה כל מהדורת On-Premise מ-S6OP (S/4HANA 1610) ועד S32OP (2025 FPS01, " +
          "המהדורה העדכנית שנבדקה), ולצדן מהדורות Private Cloud (S29PCE עד S32PCE), עם predecessors: - " +
          "ו-successors: - (שני השדות ריקים). הראיה מבססת שהטרנזקציה קיימת ומתועדת בספריית ה-Fiori בכל המהדורות " +
          "שנבדקו, בלי יורש רשום.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 13.15.26 S4TWL - Retail " +
          "iViews (MM-PUR-PO); the same text is item 60.28 S4TWL - Retail iViews (Note Description: S4TWL - " +
          "Retail Buying iViews) in the 2023 FPS03 list",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "פריט הפישוט 13.15.26 (S4TWL - Retail iViews) עוסק בהסרת ה-iViews הישנים לרכש קמעונאי, לא ב-ME2M " +
          "עצמה: 'In SAP S/4HANA, retail buying iViews are not available anymore. Transactions WRBDL, WRBDL2 " +
          "are not available anymore'. בסעיף הפעולות הנדרשות הפריט קובע: 'For open purchase orders there are " +
          "transaction ME2L, ME2M, ME2N or the purchase order Fiori app', כלומר נוקב ב-ME2M כאחת משלוש " +
          "הטרנזקציות הקיימות המוצעות כחלופה למידע שהוצג בעבר דרך ה-iView שהוסר. הפריט אינו קובע דבר על שינוי, " +
          "הסרה או החלפה של ME2M עצמה, ואינו נוקב ביישום Fiori ספציפי ('the purchase order Fiori app' כללי, בלי " +
          "שם או מזהה).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: ME2M_ROLE_2025,
      he:
        "ME2M (Purchase Orders by Material, הזמנות רכש לפי חומר) מתועדת כטרנזקציית דיווח קיימת וזהה בתוכנה הן " +
        "בתיעוד SAP ERP 6.0 EHP8 והן בתיעוד SAP S/4HANA 2025 FPS01 On-Premise (נושא 'Lists of Purchase Orders " +
        "(MM-PUR)'); ספריית אפליקציות ה-Fiori מציגה אותה כאפליקציית SAP GUI, הרשומה בה מונה מהדורות מ-1610 " +
        "ועד 2025 FPS01, ללא predecessor וללא successor רשום. פריט הפישוט 13.15.26 (2025 FPS01) / 60.28 (2023 " +
        "FPS03) ('S4TWL - Retail iViews') נוקב בה רק כחלופה קיימת למידע שנמסר בעבר ב-iViews של רכש קמעונאי " +
        "שהוסרו (WRBDL, WRBDL2), ואינו קובע שינוי, הסרה או החלפה ל-ME2M עצמה. הסטטוס נקבע 'ללא שינוי " +
        "ב-S/4HANA' על סמך השוואת שני נושאי התיעוד ורשומת ה-Fiori Apps Library.",
      recommendedAction:
        "להמשיך להשתמש ב-ME2M לדיווח הזמנות רכש לפי חומר; אין מקור רשמי הקובע יורש ספציפי או תאריך הסרה. פריט " +
        "הפישוט 13.15.26 מזכיר 'the purchase order Fiori app' כללי בלי מזהה, ולכן לא נרשם successor או xref " +
        "לאפליקציית Fiori. אם נדרשת חלופת Fiori אמיתית לרשימת הזמנות רכש, יש לאתר את מזהה האפליקציה במקור " +
        "רשמי נפרד לפני קביעת xref; במערכת היעד מומלץ לוודא ב-SE93 שהקוד עדיין קיים ולבדוק שאין הגבלת הרשאה " +
        "ספציפית לתפקיד SAP_BR_PURCHASER.",
    },
    xrefs: ["tx:ME2L", "tx:ME2N", "tx:ME21N"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) עמוד 'Lists of Purchase Orders (MM-PUR)' (loio 8d06b753128eb44ce10000000a174cb4) נבדק " +
      "בשני ההיקפים (SAP_S4HANA_ON-PREMISE 2025.001 ו-SAP_ERP 6.18.latest) דרך scripts/sap-help-search.mjs; " +
      "שתי הרשומות מדפיסות את אותה שורת טבלה 'Purchase orders by material ME2M'. (2) scripts/fal-app.mjs " +
      "ME2M --release S32OP הריץ מול Fiori Apps Library והחזיר רשומה יחידה, SAP GUI app, שורת releases " +
      "מ-S6OP (1610) עד S32OP (2025 FPS01), predecessors/successors ריקים. (3) שני פריטי הפישוט (2025 FPS01 " +
      "13.15.26, 2023 FPS03 60.28) אותרו דרך audit/master-completion/simpl-tcode-index.json והטקסט נקרא " +
      "מתוך scratchpad/official/SIMPL_OP2025.pdf.txt ו-SIMPL_OP2023.pdf.txt (חילוצי pdftotext שמורים " +
      "בפרויקט מ-2026-09-22); שני הפריטים זהים בתוכנם ועוסקים בהסרת iViews לרכש קמעונאי, לא ב-ME2M. האינדקס " +
      "simpl-tcode-index.json מייחס לשורת 2023 את המספר 60.9 והכותרת 'S4TWL - Retail Additionals'; בטקסט " +
      "ה-PDF עצמו (שורה 70337) הכותרת היא '60.28 S4TWL - Retail iViews', והמספר נלקח מהטקסט ולא מהאינדקס. " +
      "מה שלא אומת: (א) לא בוצעה קריאת גוף עמוד נוספת דרך scripts/sap-help-body.mjs, כי קטעי החיפוש הספיקו " +
      "לביסוס כל טענה; לא בוצעה WebSearch. (ב) ה-MCP ל-ABAP (sc4sap) לא התחבר בסשן זה ('Connection " +
      "closed'), ולכן אין בדיקת SE93 חיה שהקוד קיים במערכת יעד. (ג) קובצי ה-PDF של רשימות הפישוט לא הורדו " +
      "מחדש היום; הראיה מסתמכת על אותה כתובת PDF שכבר צוטטה ברשומות אחרות בקובץ transactions-b.ts. (ד) 'the " +
      "purchase order Fiori app' בפריט הפישוט אינו מזהה אפליקציה ספציפית; לא בוצע חיפוש נוסף לזיהוי " +
      "אפליקציה זו כי אינה נדרשת לקביעת סטטוס ME2M. (ה) בדיקת data/tx-intel.ts העלתה שאין בו רשומה ייעודית " +
      "ל-ME2M (הקוד מוזכר ברשומת ME22N (together), ברשומת ME23N (alternative) ובטקסט של רשומת ME5A); " +
      "data/tcode-catalog.ts מונה אותה במודול MM, אזור 'רכש דיווח', שם אנגלי 'Purchase Orders by Material', " +
      "תואם לראיות ולא נמצאה סתירה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג. לא בוצעה בדיקה במערכת " +
      "SAP חיה.",
  },
  {
    id: "tx:ME2N",
    evidence: [
      ME2N_FAL_S32OP,
      {
        sourceType: "sap_help",
        sourceTitle: "Lists of Purchase Orders (MM-PUR) · role SAP_MM_PUR_PURCHASEORDER_LISTS (SAP S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (SAP S/4HANA 2025 FPS01, loio 8d06b753128eb44ce10000000a174cb4) נקרא במלואו דרך " +
          "deliverableMetadata + pagecontent: תחת התפקיד 'Lists of Purchase Orders (MM-PUR)' (Technical name: " +
          "SAP_MM_PUR_PURCHASEORDER_LISTS) מופיעה בטבלת הפעילויות השורה 'Purchase orders by PO number ME2N', " +
          "לצד ME2L, ME2M, ME2K, ME2J, ME2C, ME2B, ME2W, MSRV3, ME2S; שם הפעילות האנגלי תואם לשם 'Purchase " +
          "Orders by PO Number' ולתיאור העברי 'הזמנות רכש לפי מספר' ברשומת המאגר data/tcode-catalog.ts#ME2N. " +
          "אין בעמוד ציון של הסרה, שינוי או תחליף לטרנזקציה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Lists of Purchase Orders (MM-PUR) · SAP ERP, versionId 6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/8d06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש ב-help.sap.com בהיקף SAP_ERP (השאילתה 'ME2N purchase orders by PO number' עם --product " +
          "SAP_ERP, 21 תוצאות) מחזירה עמוד זהה בכותרתו ('Lists of Purchase Orders (MM-PUR)') וב-loio לעמוד " +
          "ה-S/4HANA, עם versionId 6.18.latest; קטע התצוגה מדפיס '...ME2B Purchase orders by PO number ME2N " +
          "Purchase orders by supplying...'. גוף העמוד בצד ECC נקרא דרך sap-help-body.mjs ומדפיס את אותה טבלת " +
          "פעילויות, 'Purchase orders by PO number ME2N' תחת SAP_MM_PUR_PURCHASEORDER_LISTS; כלומר אותה פעילות " +
          "ME2N מתועדת גם בצד ה-ECC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private " +
          "Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 13.15.26 S4TWL - Retail iViews " +
          "(MM-PUR-PO, SAP Note 0002370183 'Retail Buying iViews')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "הפריט (עמ' 1322, לפני 13.15.27 'Retail Factsheets') עוסק בהסרת ה-iViews לרכש קמעונאי ('In SAP " +
          "S/4HANA, retail buying iViews are not available anymore. Transactions WRBDL, WRBDL2 are not " +
          "available anymore') ולא ב-ME2N עצמה. תחת Required and Recommended Action(s) נכתב במפורש: 'For open " +
          "purchase orders there are transaction ME2L, ME2M, ME2N or the purchase order Fiori app'; כלומר הפריט " +
          "הרשמי מציין את ME2N כטרנזקציה זמינה וקיימת ב-S/4HANA 2025 FPS01, המשמשת כחלופה מומלצת ל-iViews " +
          "שהוסרו, ואין בפריט קביעה הנוגעת לסטטוס של ME2N עצמה. באינדקס הפרויקט (simpl-tcode-index.json) מספר " +
          "הפריט לשנת 2023 רשום כ-'60.9' ושמו 'S4TWL - Retail Additionals', אך שורת הטקסט המצוטטת (קו 70372 " +
          "בחילוץ ה-PDF) שייכת בפועל לפריט 60.28 'S4TWL - Retail iViews' (אותה הערה 2370183) בגוף PDF 2023 " +
          "FPS03; פער זה באינדקס מתועד כאן ולא תוקן.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      edition: "on-premise",
      release: "2025.001",
      source: ME2N_FAL_S32OP,
      he:
        "ME2N ‏(Display Purchasing Documents by Number / הזמנות רכש לפי מספר) הוא דוח GUI קלאסי לרשימת מסמכי " +
        "רכש, המתועד כפעילות פעילה בתפקיד 'Lists of Purchase Orders (MM-PUR)' " +
        "‏(SAP_MM_PUR_PURCHASEORDER_LISTS) בתיעוד S/4HANA 2025 FPS01 (המהדורה העדכנית ביותר On-Premise) לצד " +
        "ME2L/ME2M/ME2K/ME2J/ME2C/ME2B/ME2W. רשומת Fiori Apps Library מציגה אותו כאפליקציית SAP GUI זמינה " +
        "ברציפות מ-S/4HANA 1610 ועד 2025 FPS01 (S32OP), ללא predecessor וללא successor. פריט הפישוט 13.15.26 " +
        "‏(2025 FPS01) / 60.28 ‏(2023 FPS03) 'S4TWL - Retail iViews' אינו מסמן את ME2N כמושפעת מהפישוט, אלא " +
        "מפנה אליה כחלופה תקינה וקיימת להצגת הזמנות רכש פתוחות לאחר הסרת iViews קמעונאיים ישנים. לפיכך אין " +
        "מקור רשמי הקובע שינוי, החלפה או הפסקת תמיכה ב-ME2N עצמה; הקוד נותר זמין ומתועד כפי שהוא.",
      recommendedAction:
        "אפשר להמשיך ולבסס תהליכי דיווח רכש על ME2N ב-S/4HANA On-Premise; זו טרנזקציית GUI מתועדת ופעילה גם " +
        "ב-2025 FPS01 (S32OP), ללא successor רשמי. פריט הפישוט מפנה גם ל'אפליקציית Fiori להזמנת רכש' ללא שם " +
        "('the purchase order Fiori app'), ואף מקור רשמי שנקרא כאן אינו מצהיר על אפליקציה ספציפית כיורשת " +
        "פורמלית של ME2N, ולכן לא נרשם successor. לפני החלטת תהליך במערכת יעד יש לוודא ב-SE93 שהקוד עדיין " +
        "קיים ופעיל שם, בדיקה שלא בוצעה בסשן זה.",
    },
    xrefs: ["tx:ME2L", "tx:ME2M", "tx:ME21N", "tx:ME21"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) רשומת Fiori Apps Library ל-ME2N (fal-app.mjs ME2N --release S32OP) מציגה אותו כ-SAP " +
      "GUI app זמין רציף S6OP עד S32OP/S32PCE, predecessors/successors ריקים. (2) גוף העמוד 'Lists of " +
      "Purchase Orders (MM-PUR)' (S/4HANA 2025.001, loio 8d06b753128eb44ce10000000a174cb4) נקרא במלואו דרך " +
      "sap-help-body.mjs ומדפיס 'Purchase orders by PO number ME2N' תחת SAP_MM_PUR_PURCHASEORDER_LISTS, " +
      "תואם לשם ולתיאור ב-data/tcode-catalog.ts#ME2N. (3) אותו עמוד קיים בהיקף SAP_ERP (השאילתה 'ME2N " +
      "purchase orders by PO number' --product SAP_ERP, אותו loio, versionId 6.18.latest); גם הגוף בצד ECC " +
      "נקרא דרך sap-help-body.mjs (בביקורת) ומדפיס את אותה טבלה. השאילתה 'Lists of Purchase Orders " +
      "(MM-PUR)' בהיקף SAP_ERP מחזירה את אותה רשומה אך קטע התצוגה שלה נחתך לפני ME2N. (4) פריט הפישוט " +
      "'S4TWL - Retail iViews' (2025 FPS01 item 13.15.26, הערה 0002370183 / 2023 FPS03 item 60.28, הערה " +
      "2370183) נקרא מחילוץ ה-PDF השמור (scratchpad/official/SIMPL_OP2025.pdf.txt קו 75297, " +
      "scratchpad/official/SIMPL_OP2023.pdf.txt קו 70372) ומצטט את ME2N כחלופה מומלצת, לא כטרנזקציה מושפעת; " +
      "אי-התאמה בין מספר/שם הפריט באינדקס הפרויקט (simpl-tcode-index.json: '60.9 Retail Additionals') לבין " +
      "הפריט שנמצא בפועל בטקסט ('60.28 Retail iViews') מתועדת בראיית הפריט ולא תוקנה כחלק מהמשימה. הופעת " +
      "'RME2N' בפריט SAP Retail Store באותם קבצים היא קוד אחר ואינה נוגעת ל-ME2N. מה שלא אומת: (א) לא בוצעה " +
      "בדיקה חיה ב-SE93 שהקוד קיים במערכת יעד (MCP ABAP לא זמין בסשן זה). (ב) לא נמצא מקור רשמי הקושר " +
      "אפליקציית Fiori ספציפית כ-successor פורמלי ל-ME2N; לכן לא נרשם שדה successor. (ג) PDF-ים לא הורדו " +
      "מחדש היום; נעשה שימוש בחילוץ הטקסט השמור מ-2026-09-22 כפי שרשומות אחרות בקובץ זה כבר עושות. (ד) לא " +
      "בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:ME41",
    evidence: [
      ME41_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 38.7 S4TWL - RFQ Simplified " +
          "Transaction (MM-PUR-RFQ)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט 38.7 (עמ' 957-958, SAP Note 2332710 מודפס בגוף הפריט) מנוסח כמעט זהה לפריט 14.4.1 ברשימת 2025 " +
          "FPS01: אותה רשימת טרנזקציות 'deprecated in SAP S/4HANA' (ME41 ME42 ME43 ME44 ME45 ME47 ME48 ME49 " +
          "ME4B ME4C ME4L ME4M ME4N ME4S, כלשונו), אותו ניסוח 'a functional equivalent is not available', ואותה " +
          "המלצה ברמת תהליך על Manage RFQs (F2049), Monitor RFQ Items (F2425), Request for Quotation Types " +
          "(F4149), Manage Supplier Quotations (F1991) ו-Compare Supplier Quotations (F2324). שני הפריטים (38.7 " +
          "ו-14.4.1) מפרטים את אותה חלוקת תפקידים: SAP_BR_PURCHASER (Purchaser) ל-Manage RFQs, Monitor RFQ " +
          "Items, Manage Supplier Quotations ו-Compare Supplier Quotations, ו-SAP_BR_BUYER (Strategic Buyer) " +
          "ל-Request for Quotation Types (F4149).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process RFQ (MM-PUR) | Materials Management (MM)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/c306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (Technical name: SAP_MM_PUR_RFQ; נקרא במלואו דרך help.sap.com/http.svc/deliverableMetadata " +
          "ו-pagecontent) מפרט טבלת 'Activities in Materials Management': 'Create RFQ ME41', 'Change RFQ ME42', " +
          "'Display RFQ ME43', 'Maintain RFQ supplement ME44', 'Release RFQ ME45' (כלשונו), ומגדיר את התפקיד " +
          "כמכסה את כל הפעילויות הדרושות לעיבוד RFQ ב-SAP ERP. זה המקור הרשמי הקובע ש-ME41 היא טרנזקציית יצירת " +
          "ה-RFQ הקלאסית ב-ECC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת ME41",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר (module MM, area 'רכש (Purchasing), הצעות מחיר (RFQ)') מתארת את ME41 כ'יצירת בקשה להצעת " +
          "מחיר (Request for Quotation, RFQ) לשליחה לספקים פוטנציאליים לקבלת תמחור', מסמך רכש מסוג A (doc type " +
          "AN) במסך קלאסי, עם collective number לקיבוץ הצעות. שדה fiori ברשומה ריק, ושדה s4 קובע: 'זמין " +
          "ב-S/4HANA; לתהליכי sourcing מתקדמים SAP מכוונת ל-Ariba Sourcing / Central Procurement.' ושדה " +
          "consultant מוסיף 'ב-S/4 קיים RFx ב-Ariba/SAP Sourcing כחלופה אסטרטגית'; זהו ניסוח עצמאי של המאגר " +
          "שאינו מפנה לפריט הפישוט הרשמי ואינו נושא מקור לטענת ה-Ariba. הרשומה מקשרת את הקוד ל-ME9A, ME47, ME42 " +
          "(after) ול-ME51N, ME57 (before), ולטבלאות EKKO, EKPO, EKET.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME41",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · F2049 Manage RFQs, release S32OP (SAP S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2049')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library לאפליקציה Manage RFQs (F2049), רכיב MM-FIO-PUR-RFQ, תפקיד " +
          "SAP_BR_PURCHASER, OData MM_PUR_RFQ_MAINTAIN_SRV, מציגה שדה 'GUI transactions: leading ME41; related " +
          "ME42, ME43'; רשומת ה-FAL מתעדת את F2049 כאפליקציה שה-GUI transaction המוביל שלה הוא ME41, אך שדות " +
          "'predecessors: -; successors: -' באותה רשומה אינם מגדירים יחס predecessor/successor פורמלי. F2049 " +
          "אינה רשומה בקטלוג data/fiori/apps.ts של הפרויקט, ולכן לא נכללת ב-xrefs או כ-successor של הרשומה " +
          "הזאת.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME41_SIMPL2025,
      he:
        "ME41 (יצירת RFQ) מופיעה בשמה, יחד עם ME42/ME43/ME44/ME45/ME47/ME48/ME49 ורשימות התצוגה " +
        "(ME4B/ME4C/ME4L/ME4M/ME4N/ME4S), בפריט הפישוט הרשמי 'S4TWL - RFQ Simplified Transaction' (14.4.1 " +
        "ברשימת S/4HANA 2025 FPS01, 38.7 ברשימת 2023 FPS03) תחת הכותרת 'deprecated in SAP S/4HANA'. הפריט " +
        "קובע במפורש שהפונקציונליות זמינה במערכת S/4HANA אך אינה נחשבת ארכיטקטורת יעד, וש'a functional " +
        "equivalent is not available' לגישת ה-RFQ הקלאסית עם שדה ספק חובה ויחיד. הפריט אינו מכריז על טרנזקציה " +
        "או אפליקציית Fiori בודדת כיורשת ישירה של ME41 עצמה; הוא ממליץ ברמת תהליך העסקי על חבילת אפליקציות " +
        "Fiori (Manage RFQs F2049 ואחרות) ומתאר שליחת RFQ שנוצר ב-Fiori לפלטפורמות sourcing חיצוניות (הדוגמה " +
        "בפריט: SAP Ariba Sourcing), ורשומת ה-Fiori Apps Library של F2049 (S32OP) אכן מציגה את ME41 " +
        "כטרנזקציית ה-GUI המובילה שלה, אך אינה מגדירה אותה שם כ-successor פורמלי (predecessors/successors " +
        "רשומים כ-'-'). לכן הסטטוס נכתב כפריט פישוט (simplified): הקוד קיים ותקין להרצה ב-S/4HANA On-Premise, " +
        "מסווג 'deprecated' בפריט הרשמי, ללא הצהרה רשמית על יורשת בודדת שמאפשרת רישום שדה successor.",
      recommendedAction:
        "לא לבסס תהליכי RFQ חדשים, הדרכות או פיתוחים על ME41 במסלול ההמרה ל-S/4HANA On-Premise: הפריט הרשמי " +
        "מסווג אותה 'deprecated' ומציין שאין functional equivalent לגישה הקלאסית עם ספק חובה ויחיד. לבחון את " +
        "מעבר תהליך ה-sourcing לאפליקציות Fiori שהפריט מפנה אליהן (Manage RFQs, Monitor RFQ Items, Manage " +
        "Supplier Quotations, Compare Supplier Quotations, Request for Quotation Types) או לפלטפורמת sourcing " +
        "חיצונית (הפריט נוקב ב-SAP Ariba Sourcing כדוגמה), ולבדוק ב-SE93 במערכת היעד שהקוד עודנו קיים ומורשה " +
        "טרם החלטה על תהליך יעד קבוע. F2049 אינה רשומה עדיין בקטלוג ה-Fiori של הפרויקט (data/fiori/apps.ts); " +
        "יש להוסיפה שם ולקרוא SAP Note 2332710 (דורש S-user, לא נקרא כאן) לפני שניתן יהיה לקבוע successor " +
        "רשמי לרשומה הזאת.",
    },
    xrefs: ["tx:ME42", "tx:ME43", "tx:ME47", "tx:ME48", "tx:ME49", "tx:ME31K", "tx:ME21N", "tx:ME51N"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) שני פריטי הפישוט הרשמיים (14.4.1 ברשימת 2025 FPS01, 38.7 ברשימת 2023 FPS03) מונים את " +
      "ME41 בשמה ברשימת הטרנזקציות 'deprecated in SAP S/4HANA', עם הציטוט המלא 'the functionality is " +
      "currently available in SAP S/4HANA but it is not considered as future technology and a functional " +
      "equivalent is not available'; שני הטקסטים כמעט זהים מילה במילה. (2) גוף העמוד 'Process RFQ (MM-PUR)' " +
      "(SAP ERP 6.18.latest, loio c306b753128eb44ce10000000a174cb4) נקרא במלואו דרך " +
      "help.sap.com/http.svc/deliverableMetadata ו-http.svc/pagecontent ומאשר ש-Create RFQ = ME41 ב-ECC. " +
      "(3) scripts/fal-app.mjs F2049 --release S32OP אושר: F2049 (Manage RFQs) מתעדת GUI transaction מוביל " +
      "ME41, ללא predecessor/successor פורמלי רשום. מה שלא אומת: (א) SAP Note 2332710, המצוטט בשני הפריטים, " +
      "דורש S-user ולא נקרא; המספר מצוטט כפי שהודפס בפריט ואינו נישא בשדה sapNote. (ב) לא נמצא עמוד What's " +
      "New או עמוד help.sap.com נוסף המזכיר את ME41 ישירות (רק את F2049 ואת עמוד התפקיד ECC); חיפוש 'Manage " +
      "RFQs F2049' החזיר 21 רשומות, רק שתיים מהן עוסקות ישירות באפליקציה עצמה. (ג) לא בוצעה בדיקת SE93 " +
      "במערכת S/4HANA חיה שהקוד עדיין קיים; ה-MCP ל-ABAP (sc4sap) לא התחבר בסשן זה ('Connection closed'). " +
      "(ד) F2425, F4149, F1991, F2324 לא נבדקו דרך fal-app.mjs ואינן רשומות בקטלוג data/fiori/apps.ts; לכן " +
      "לא נכללות כ-xrefs. (ה) קובצי ה-PDF נקראו מחילוצי pdftotext השמורים בפרויקט " +
      "(scratchpad/official/SIMPL_OP2025.pdf.txt ו-SIMPL_OP2023.pdf.txt), לא הורדו מחדש היום; רק כותרות " +
      "ה-HTTP נבדקו ב-2026-09-24. לא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת " +
      "הקטלוג; עברה סבב ביקורת אדברסרית ב-2026-09-24, והורדות המבקר יושמו: הסרת קווים מפרידים ארוכים, ציטוט " +
      "מדויק של שדות s4 ו-consultant ברשומת tx-intel, חלוקת התפקידים זהה בשני הפריטים (לא תוספת של 38.7), " +
      "טווח העמודים 957-958 ברשימת 2023 FPS03, ו-SAP Ariba Sourcing מוצג כדוגמה בפריט ולא כהמלצה למעבר.",
  },
  {
    id: "tx:ME43",
    evidence: [
      ME43_SIMPL2023,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 14.4.1 S4TWL - RFQ Simplified " +
          "Transaction (SAP Note 2332710)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        accessedAt: DATE24,
        claim:
          "גרסת 2025 FPS01 של הפריט חוזרת על אותה רשימה במדויק (עמ' 1429-1430; מספר ה-Note מודפס שם " +
          "כ-0002332710): 'The following transactions are deprecated in SAP S/4HANA: ME41 ME42 ME43 ME44 ME45 " +
          "ME47 ME48 ME49 ME4B ME4C ME4L ME4M ME4N ME4S' (כלשונו), ומוסיפה בסעיף Reason and Prerequisites כי " +
          "הקונספט הישן התבסס על RFQ עם שדה ספק חובה ומוגבל לספק אחד, ואינו מתאים לתרחישי sourcing מרובי-ספקים " +
          "(כגון SAP Ariba Sourcing); הפריט מציין גם כי ה-IDocs REQOTE ו-QUOTES (Basic Type ORDERS05) הקשורים " +
          "ל-RFQ 'not considered as the target architecture', ללא קביעה נפרדת על ME43 מעבר להיותה חלק מהרשימה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · Manage RFQs (F2049), release S32OP (SAP S/4HANA 2025 FPS01, on-premise)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2049')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library לאפליקציה Manage RFQs (F2049), שרשימת הגרסאות on-premise שלה משתרעת " +
          "מ-1610 (S6OP) ועד 2025 FPS01 (S32OP), מפרטת בשדה ה-GUI Transactions: 'leading ME41; related ME42, " +
          "ME43' (כלשונו). כלומר, ME43 מודפסת ברשומת ה-Fiori Apps Library כטרנזקציית GUI 'related' לאפליקציה " +
          "F2049, אך אין ברשומה קביעת successor ייעודית (השדות predecessors/successors ריקים); F2049 היא אחת " +
          "מחמש האפליקציות שהפריט הפישוטי הציג כקבוצה, לא מיפוי בלעדי ל-ME43. F2049 עצמה אינה עדיין רשומה במאגר " +
          "ה-Fiori המקומי של הפרויקט (data/fiori/apps.ts), כך שלא ניתן להצביע עליה כ-successor הניתן לאימות " +
          "ברמת ה-xref.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: data/tx-intel.ts#ME43",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר הקיימת (לפני ביקורת) מתעדת את ME43 כטרנזקציית SAP GUI קלאסית להצגת RFQ בלבד (ללא עריכה) " +
          "מעל EKKO/EKPO (מסמך category A), וכי הרשומה מציינת 'זמין ב-S/4HANA' ללא הפניה לפריט הפישוט או לחלופת " +
          "Fiori; שדה ה-fiori ברשומה ריק. אין ברשומה קביעה עצמאית לגבי הפסקת שימוש עתידית.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME43",
      },
    ],
    status: {
      status: "fiori_alternative_available",
      edition: "on-premise",
      release: "2023 FPS03",
      source: ME43_SIMPL2023,
      he:
        "פריט הפישוט מונה את ME43 ברשימת הטרנזקציות ה-deprecated ומפנה לחמש אפליקציות Fiori כחלופה לתהליכי " +
        "RFQ; Manage RFQs (F2049) מודפסת ב-Fiori Apps Library עם ME43 כטרנזקציית GUI related. אף אחת " +
        "מהאפליקציות אינה במאגר הפרויקט, ולכן לא נקבע successor.",
      recommendedAction:
        "לתכנן מעבר ל-Manage RFQs (F2049) ולאפליקציות ה-RFQ הנלוות; לסגור RFQ פתוחים שנוצרו בטרנזקציות הישנות " +
        "(status Completed) לפני המעבר; לעדכן ל-deprecated עם successor לאחר הוספת F2049 " +
        "ל-data/fiori/apps.ts.",
    },
    xrefs: ["tx:ME41", "tx:ME42", "tx:ME47", "tx:ME48", "tx:ME49"],
    lastVerifiedAt: DATE24,
    notes:
      "שני פריטי הפישוט (2023 FPS03 §38.7, 2025 FPS01 §14.4.1) קובעים באופן מפורש וזהה ש-ME43 (בתוך קבוצת " +
      "ME4x) 'is deprecated' ב-S/4HANA, אך ללא קביעת מחליפה חד-ערכית: הם מפנים לחמש אפליקציות Fiori (Manage " +
      "RFQs F2049, Monitor RFQ Items F2425, Request for Quotation Types F4149, Manage Supplier Quotations " +
      "F1991, Compare Supplier Quotations F2324) כחלופה עסקית לקבוצה כולה. חיפוש שכבת ה-fal-app.mjs מאשר " +
      "ש-F2049 מודפסת עם ME43 כ-GUI transaction 'related', אך אף אחת מחמש האפליקציות אינה עדיין רשומה " +
      "ב-data/fiori/apps.ts (מאגר ה-Fiori המקומי), ולכן אין xref/successor הניתן לאימות לפי כללי הפרויקט; " +
      "לא נקבע status מסוג deprecated (המחייב successor שקיים ב-universe), ונרשם " +
      "fiori_alternative_available על סמך פריט 38.7 ורשומת ה-Fiori Apps Library של F2049, כאפשרות שהמבקר " +
      "הציע והכותב אימץ. חיפושי sap-help-search.mjs נוספים ('ME43 display RFQ', --size 12, ללא --product; " +
      "12 תוצאות, 7 הראשונות מ-2025.001) מראים ש-ME43 עדיין מתועדת ברשימות הפעילויות הרשמיות של S/4HANA " +
      "2025 FPS01 (למשל 'General Display Functions in Purchasing (MM-PUR)', 'Process RFQ (MM-PUR)') " +
      "כטרנזקציה קיימת, כך שהפסקת השימוש היא הודעת deprecation ולא הסרה בפועל. פעולה מומלצת להשלמת הרשומה: " +
      "להוסיף את F2049 (ואפליקציות ה-RFQ הנלוות) למאגר data/fiori/apps.ts, ואז לעדכן רשומה זו ל-status: " +
      "deprecated עם successor: fiori:F2049 מאומת. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג. לא בוצעה " +
      "בדיקה במערכת SAP חיה; אין תשובה רשמית האם קיים כלי המרה אוטומטי (SUM) ספציפי ל-ME43 מעבר לפריט " +
      "הפישוט.",
  },
];
