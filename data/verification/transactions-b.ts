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
   tx:ME42 was refuted at the gate and sits in the research queue.
   Batch 3 (research + adversarial audit 2026-09-24, written the same day): 8
   audited records for the MM-PUR quotation codes, the purchase requisition
   code, the MIGO goods-receipt code and the MK vendor-purchasing family (ME47,
   ME48, ME49, ME51N, MIGO_GR, MK01, MK02, MK03); no record refuted. A sapNote
   field is carried only where the validator allows it (me.sap.com url or
   repoRef); note numbers printed by a Simplification List item stay in prose.
   Batch 4 (re-audit 2026-09-24, written the same day): tx:ME42, refuted in
   batch 2 and re-drafted, written from verdict.fixedRecord as `restricted`
   (F2049 is not in data/fiori/apps.ts, so no successor can resolve); no
   record refuted. The status source is the shared ME42_SIMPL2025 const (the
   2025 FPS01 item row, also evidence[1]) instead of the shortened re-typed
   copy the verdict carried. Writer corrections: reviewer field dropped (house
   convention); an audit-trail sentence and the sentence that the generated
   tx:ME42 record in transactions-auto.ts is superseded appended to notes.
   Batch 5 (research + adversarial audit 2026-09-24, written the same day): 8
   audited records for the MK vendor block / deletion codes and material master,
   inventory and valuation codes (MK05, MK06, MM17, MMBE, MMBE_OLD, MMPV, MR21,
   OMS2); no record refuted. Six taken from verdict.fixedRecord, MM17 as drafted
   (its re-audit after the repair round listed no downgrade), OMS2 re-derived from
   the draft with the four listed downgrades. Every status source is a shared
   const (the record's own evidence row) instead of the pointer string, the
   placeholder or the shortened copy the verdicts carried; no reviewer field.
   Batch 6 (research + adversarial audit 2026-09-24, written 2026-09-25, access
   date stamped 2026-09-24): 7 audited records for the material number length
   code, the XK central vendor family and QMIS analyses (OMSL, XK01, XK02, XK03,
   MCVA, MCXB, MCXC); tx:MCXA refuted and queued. Five taken from
   verdict.fixedRecord, XK02 and MCVA re-derived from the draft with the listed
   downgrades. Every status source is a shared const (the record's own item row);
   no reviewer field.
   Batch 7 (research + adversarial audit 2026-09-25, written the same day, access
   date stamped 2026-09-25): 9 audited records for QMIS analyses, the MSC*N batch
   master codes and QM inspection-lot and certificate codes (MCXA, MCXX, MSC1N,
   MSC2N, MSC3N, MSC4N, QA32, QC20, QC21); no record refuted. tx:MCXA, refuted in
   batch 6, was re-drafted and re-audited with no problem and is written as
   drafted (its rows first read 2026-09-24 keep DATE24); the other eight are
   taken from verdict.fixedRecord. Every status source is a shared const (the
   record's own evidence row); the QC20 item rows carry the SAP Note number in
   prose only, without a sapNote field; no reviewer field. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE24 = "2026-09-24";
const DATE25 = "2026-09-25";

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

/* batch 3 status sources */

const ME47_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 14.4.1 S4TWL - RFQ Simplified " +
    "Transaction (MM-PUR-RFQ, SAP Note 2332710)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.4.1 (עמ' 1429-1430, Note Number מודפס כ-0002332710) קובע במפורש: 'The following transactions are " +
    "deprecated in SAP S/4HANA: ME41 ME42 ME43 ME44 ME45 ME47 ME48 ME49 ME4B ME4C ME4L ME4M ME4N ME4S' " +
    "(כלשונו), כאשר טבלת התיאורים הצמודה משייכת ל-ME47 את הפעולה 'Maintain'. הפריט מוסיף בסעיף Solution: " +
    "'This means that the functionality is currently available in SAP S/4HANA but it is not considered as " +
    "future technology and a functional equivalent is not available.' בסעיף Business Process Related " +
    "Information: 'If you want to use functionality related to sourcing of goods and services, you can use " +
    "the following apps: Manage RFQs (F2049), Monitor RFQ Items (F2425), Request for Quotation Types " +
    "(F4149), Manage Supplier Quotations (F1991), Compare Supplier Quotations (F2324)', ולפני כן: 'Before " +
    "you start to use Fiori apps mentioned above you need to close your open RFQs, that were created via old " +
    "transactions, and set them to status \"Completed\".' הפריט אינו קובע יחס replacement/successor פורמלי " +
    "חד-ערכי בין ME47 עצמה לאפליקציה בודדת; הוא מפנה לחמש האפליקציות כקבוצה לכלל תהליך ה-sourcing.",
  verificationLevel: "sap_official_verified",
};

const ME48_SIMPL2023: Evidence = {
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
    "הפריט קובע במפורש (עמ' 957-958, Note 2332710 כלשון המסמך): 'The following transactions are deprecated " +
    "in SAP S/4HANA: ME41 ME42 ME43 ME44 ME45 ME47 ME48 ME49 ME4B ME4C ME4L ME4M ME4N ME4S' (כלשונו), " +
    "כלומר ME48 מנויה בשמה, ובעמודת השמות המקבילה הפריט מדפיס עבורה 'Display' בלבד (השם המלא Display " +
    "Quotation לקוח מרשומת המאגר data/tx-intel.ts#ME48). תחת Business Process Related Information הפריט " +
    "מציע כחלופה עסקית לתהליכי sourcing את אפליקציות ה-Fiori 'Manage RFQs (F2049)', 'Monitor RFQ Items " +
    "(F2425)', 'Request for Quotation Types (F4149)', 'Manage Supplier Quotations (F1991)' ו-'Compare " +
    "Supplier Quotations (F2324)', ומנחה לסגור (status 'Completed') RFQ שנוצרו בטרנזקציות הישנות לפני " +
    "המעבר לאפליקציות אלה. הפריט אינו קובע מיפוי 1:1 בין ME48 הספציפית לבין אפליקציה יחידה מתוך החמש.",
  verificationLevel: "sap_official_verified",
};

const ME51N_FEATURE_COMPARISON_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Feature Comparison for Managing and Creating Purchase Requisitions",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af9ef57f504840d2b81be8667206d485/b0eba26b711340eda3c39f6830c88da3.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  verificationLevel: "sap_official_verified",
  claim:
    "גוף הדף (נקרא במלואו דרך שירות התוכן) משווה בין שתי דרכי עבודה ליצירה/ניהול של דרישת רכש בודדת: " +
    "'Manage Purchase Requisitions - Professional' (App ID F2229) לעומת עמודה שכותרתה 'Create Purchase " +
    "Requisition - Advanced' המזוהה שם ב-App ID כ-'ME51N / ME52N'. הטבלה משווה יכולות בין השתיים שורה-שורה " +
    "(למשל 'Create Purchase Requisition from Free-Text or Material: Yes / Yes') מבלי לסמן את עמודת " +
    "ME51N/ME52N כמיושנת או כבטלה. הדף מתועד תחת S/4HANA on-premise 2025 FPS01 (version 2025.001) ומציג את " +
    "ME51N/ME52N כדרך עבודה מתועדת ליצירה ולניהול של דרישת רכש בודדת, לצד אפליקציית ה-Fiori F2229.",
};

const MIGO_GR_GOODS_MOVEMENT_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle:
    "Goods Movement (MM-IM) (deliverable Materials Management (MM), topic loio 3b07b753128eb44ce10000000a174cb4)",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3b07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "הסניפט מגרסת S/4HANA 2025 FPS01 (versionId 2025.001) קובע: 'With the transaction code MIGO_GO, the user " +
    "can only post goods receipts for orders; with MIGO_GR, he or she can only post goods receipts from " +
    "external procurement; and with MIGO_GI, he or she can only...' כלומר MIGO_GR הוא קוד טרנזקציה שמגביל " +
    "את MIGO לרישום קבלת סחורה מרכש חיצוני בלבד. אותו loio מוחזר גם תחת productId SAP_ERP (חיפוש נפרד, " +
    "אותה כתובת עם /docs/SAP_ERP/ ו-version 6.18.latest), כך שההגדרה מתועדת הן ב-ECC והן ב-S/4HANA " +
    "On-Premise 2025 FPS01, ללא שינוי בין הגרסאות.",
  verificationLevel: "sap_official_verified",
};

const MK01_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
    "Approach",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  verificationLevel: "sap_official_verified",
  claim:
    "הפריט (עמ' 136-138) חוזר על אותה קביעה בניסוח מעודכן: 'the specific transactions like XD01, XD02, XD03 " +
    "or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, MK03, etc. are not available in SAP S/4HANA. These " +
    "will be redirected to transaction BP'. הטבלה 'Transactions not available in SAP S/4HANA on-premise " +
    "edition' מפרטת תחת 'Transactions that get redirected to transaction BP' את MK01, MK02, MK03 (וגם MK05, " +
    "MK06) לצד משפחות FD/VD/XD/FK/XK המקבילות.",
};

const MK02_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
    "Approach (LO-MD-BP, Business Impact Note 0002265093, p. 136-138)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט הפישוט (נקרא מקובץ ה-PDF הרשמי, Document Version 1.36) קובע כלשונו: 'the specific transactions " +
    "like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, MK03, etc. are not available " +
    "in SAP S/4HANA. These will be redirected to transaction BP.' ובטבלה המצורפת, תחת הכותרת 'Transactions " +
    "not available in SAP S/4HANA on-premise edition', רשומה השורה 'Transactions that get redirected to " +
    "transaction BP: ... FK01, FK02, FK03, FK05, FK06, MK01, MK02, MK03, MK05, MK06, XK01, XK02, XK03 ...'. " +
    "סעיף Symptom: 'system conversion to SAP S/4HANA, any of the releases'.",
  verificationLevel: "sap_official_verified",
};

const MK03_SIMPL2023: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
    "Approach (SAP Note 2265093)",
  url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023 FPS03",
  accessedAt: DATE24,
  claim:
    "הפריט (Note Number 2265093, עמ' 153-155) קובע כי ממשק המשתמש ב-S/4HANA הוא טרנזקציית BP וכי 'the " +
    "specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, MK03 " +
    "etc. are not available in SAP S/4HANA on-premise'; בטבלת הטרנזקציות שברשומה, MK03 מופיעה תחת הכותרת " +
    "'Transactions not available in SAP S/4HANA on-premise edition' ותחת 'Transactions that get redirected " +
    "to transaction BP' (כלשונו: 'FD01,FD02,FD03, FK01,FK02,FK03,MAP1,MAP2,MAP3, MK01, MK02, MK03, ...'). " +
    "כלומר הפריט קובע במפורש ש-MK03 אינה זמינה כטרנזקציית SAP GUI ב-S/4HANA on-premise ומנותבת לטרנזקציית " +
    "BP; אין בפריט קביעה על אפליקציית Fiori חלופית.",
  verificationLevel: "sap_official_verified",
};

/* batch 4 status source (2026-09-24): tx:ME42, the 2025 FPS01 item row, shared by evidence[1] and
   status.source */

const ME42_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition " +
    "2025 - Feature Pack Stack 1 (Document Version 1.36) · item 14.4.1 S4TWL - RFQ Simplified Transaction " +
    "(MM-PUR-RFQ, Sourcing and Contract Management), pp. 1429-1431",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  accessedAt: DATE24,
  claim:
    "פריט 14.4.1 'S4TWL - RFQ Simplified Transaction' (Application Component: MM-PUR-RFQ; Related Notes: " +
    "0002332710 'S4TWL-RFQ Simplified Transaction') נושא נוסח זהה לפריט 38.7 ברשימת 2023 FPS03: אותו טקסט " +
    "Reason and Prerequisites/Solution (RFQ עם שדה ספק חובה והגבלה לספק אחד, מול RFQ שנוצר באפליקציית Fiori " +
    "ונשלח לפלטפורמות sourcing חיצוניות; REQOTE ו-QUOTES מוחלפים ב-cXML), ואותה קביעה: '...the functionality " +
    "is currently available in SAP S/4HANA but it is not considered as future technology and a functional " +
    "equivalent is not available'. אחר כך: 'The following transactions are deprecated in SAP S/4HANA' ואחריה " +
    "טבלה של 14 קודים עם תיאור: ME41 Create, ME42 Change, ME43 Display, ME44 Maintain Supplement, ME45 " +
    "Release, ME47 Maintain, ME48 Display, ME49 Price Comparison List, ME4B, ME4C, ME4L, ME4M, ME4N, ME4S " +
    "(דוחות RFQs by Requirement Tracking Number / Material Group / Vendor / Material / RFQ Number / per " +
    "Collective Number); ME42 מופיעה בשורה 'Change'. תחת Business Process Related Information הפריט מדפיס: " +
    "'If you want to use functionality related to sourcing of goods and services, you can use the following " +
    "apps: Manage RFQs (F2049), Monitor RFQ Items (F2425), Request for Quotation Types (F4149), Manage " +
    "Supplier Quotations (F1991), Compare Supplier Quotations (F2324)', ומוסיף: 'Before you start to use " +
    "Fiori apps mentioned above you need to close your open RFQs, that were created via old transactions, and " +
    "set them to status \"Completed\"'. תחת Required and Recommended Action(s) נקוב התפקיד SAP_BR_PURCHASER " +
    "(Purchaser) עבור Manage RFQs ו-Monitor RFQ Items (וגם F1991, F2324), ו-SAP_BR_BUYER (Strategic Buyer) " +
    "עבור Request for Quotation Types. הפריט אינו ממפה טרנזקציה בודדת לאפליקציה בודדת ואינו קובע גרסת הסרה. " +
    "עמודים: תחילת הפריט בעמ' 1429, רשימת הטרנזקציות והאפליקציות בעמ' 1430, שורת SAP_BR_BUYER בעמ' 1431. " +
    "כתובת קובץ ה-PDF החזירה HTTP 200 ב-2026-09-24; הטקסט נקרא מחילוץ pdftotext השמור בפרויקט.",
  verificationLevel: "sap_official_verified",
};

/* batch 5 status sources (2026-09-24): one evidence row per record, shared by evidence[] and
   status.source (MK05, MK06, MM17, MMBE, MMBE_OLD, MMPV, MR21, OMS2) */

const MK05_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
    "Approach",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט הפישוט 'S4TWL - Business Partner Approach' ברשימת S/4HANA 2025 FPS01 (Document Version 1.36, עמ' " +
    "136-137) קובע: 'The user interface for SAP S/4HANA is transaction BP. There is no specific user " +
    "interface for customer/vendor like known from SAP Business Suite'. בטבלה 'Transactions not available in " +
    "SAP S/4HANA on-premise edition', תחת 'Transactions that get redirected to transaction BP', מופיעה " +
    "הרשימה: 'FD01, FD02, FD03, FD05, FD06, VD01, VD02, VD03, VD05, VD06, XD01, XD02, XD03, XD05, XD06, " +
    "FK01, FK02, FK03, FK05, FK06, MK01, MK02, MK03, MK05, MK06, XK01, XK02, XK03, XK05, XK06, MAP1, MAP2, " +
    "MAP3, V03, V-04, V-05, V-06, V-07, V-08, V-09, V-11, VAP1, VAP2, VAP3'; MK05 נוקבת בה בשמה. באותה טבלה, " +
    "הרשימה 'Transactions that are obsolete: MK12, MK18, MK19, XD07, XK07, V+21, V+22, V+23' אינה כוללת את " +
    "MK05.",
  verificationLevel: "sap_official_verified",
};

const MK06_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
    "Approach (SAP Note 0002265093)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "הפריט (מתחיל בעמ' 136, הטבלה בעמ' 137-138, Document Version 1.36) מסווג את MK06 אחרת ממהדורת 2023: " +
    "הטבלה מציגה את MK06 תחת השורה 'Transactions that get redirected to transaction BP: FD01, FD02, FD03, " +
    "FD05, FD06, VD01, VD02, VD03, VD05, VD06, XD01, XD02, XD03, XD05, XD06, FK01, FK02, FK03, FK05, FK06, " +
    "MK01, MK02, MK03, MK05, MK06, XK01, XK02, XK03, XK05, XK06, ...' (כלשונה, כולל MK06), ואת הרשימה הנפרדת " +
    "'Transactions that are obsolete: MK12, MK18, MK19, XD07, XK07, V+21, V+22, V+23' ללא MK06. כלומר " +
    "במהדורת 2025 FPS01 MK06 מופיעה ברשימת הניתוב ל-BP ולא ברשימת ה-obsolete, בדומה לניסוח מסמך What's New " +
    "2022.",
  verificationLevel: "sap_official_verified",
};

const MM17_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle: "S4TWL - Manufacturer Part Number (SAP S/4HANA 2025 FPS01 Simplification List, item 13.1.3)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 13.1.3 'S4TWL - Manufacturer Part Number' (Application Component: IS-ADEC-MPN) ברשימת הפישוט 2025 " +
    "FPS01 (טקסט מחולץ: scratchpad/official/SIMPL_OP2025.pdf.txt; אותו משפט מודפס גם בפריט 48.5 באותו שם " +
    "ברשימת 2023 FPS03, scratchpad/official/SIMPL_OP2023.pdf.txt) קובע תחת הכותרת 'Following online " +
    "transaction will not work after system conversion with MPN materials in SAP S/4HANA' כלשונו: " +
    "'Transactions MM17 and MMCC are not available for MPN materials in SAP S/4HANA.' הפריט מציין: 'MPN " +
    "functionality is activated when you select 'Activate Inventory-Managed MPN' in Customizing'. הפריט אינו " +
    "אומר דבר, לכאן או לכאן, על MM17 עבור חומרים שאינם MPN. SAP Note 2348023 מודפס כ-Business Impact note של " +
    "הפריט, ותחת 'Required and Recommended Action(s)' מודפסים SAP Notes 2334012, 2334008, 2270836 ו-2360860; " +
    "הם לא נקראו (דורשים S-user).",
  verificationLevel: "sap_official_verified",
};

const MMBE_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (Simplification List for SAP S/4HANA 2025, Feature Pack " +
    "Stack 1, item 15.3.9; אותו נוסח בפריט 27.6 ברשימת 2023 FPS03)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "הפריט (SAP Note 2210569, 'Obsolete Material inventory management transactions') מונה את טרנזקציות ה-MB " +
    "שהוחלפו ב-MIGO או ב-BAPI_GOODSMVT_CREATE ו-BAPI_GOODSMVT_CANCEL, ובנפרד קובע: 'The transaction MMBE_OLD " +
    "has been replaced by transaction MMBE. Alternatively there is also the Fiori App Stock Overview'. MMBE " +
    "אינה ברשימת טרנזקציות ה-MB המוחלפות, ופסקת הפתרון מנחה 'Use transaction MIGO or MMBE in dialog'.",
  verificationLevel: "sap_official_verified",
};

const MMBE_OLD_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1, item 15.3.9 S4TWL - AVAILABILITY OF " +
    "TRANSACTIONS IN MM-IM (MM-IM-GF)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 15.3.9 (Document Version 1.36, סעיף Symptom, עמ' 1486) קובע: 'The transaction MMBE_OLD has been " +
    "replaced by transaction MMBE. Alternatively there is also the Fiori App Stock Overview.' לגבי קבוצת " +
    "הטרנזקציות שהפריט מונה (טרנזקציות ה-MB ו-MMBE_OLD) הוא מוסיף שהן 'do still exist as transaction codes' " +
    "אך 'calling these transaction codes from the menu has the consequence that an error message is raised', " +
    "ושהן 'will be deprecated in the near future' (ללא ציון גרסת הסרה). בסעיף Solution: 'Use transaction " +
    "MIGO or MMBE in dialog.'",
  verificationLevel: "sap_official_verified",
};

const MMPV_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "MMPV: Close Periods (Fiori Apps Library, S32OP = SAP S/4HANA 2025 FPS01, On-Premise)",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MMPV')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "רשומת ה-Fiori Apps Library (scripts/fal-app.mjs MMPV --release S32OP) רושמת את MMPV כ-App ID בשם 'Close " +
    "Periods', סוג SAP GUI / SAP GUI, סטטוס Published, רכיב LO-MD-MM (Material Master), תפקיד " +
    "SAP_BR_PRODMASTER_SPECIALIST, קטלוג עסקי SAP_CMD_BC_PR_ADMIN, GUI transactions 'leading MMPV; related " +
    "MMPV', predecessors '-' ו-successors '-'. רשימת הגרסאות כוללת את גרסאות On-Premise מ-S6OP (1610) עד " +
    "S32OP (2025 FPS01). הערות RIN מודפסות: 3493254 (Front-End Server) ו-3671888 (Back-End Server).",
  verificationLevel: "sap_official_verified",
};

const MR21_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1, item 15.3.2 S4TWL - Material Ledger " +
    "Obligatory for Material Valuation (זהה ב-2023 FPS03 item 27.7, SAP Note 2267834)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "הפריט (סעיף Business Process related information, עמ' 1470) נוקב במפורש ב-MR21 וקובע שינוי התנהגות, לא " +
    "החלפה: 'If customers are not already using the material ledger, it will be activated during the " +
    "conversion process. In MM02 and MR21 material prices can now be maintained in multiple currencies' " +
    "(כלשונו). כלומר, Material Ledger הופך לחובה, ובעקבות זאת MR21 (יחד עם MM02) מקבלת יכולת תחזוקת מחיר " +
    "במספר מטבעות; אין בפריט קביעה שהטרנזקציה הוחלפה, הוסרה או deprecated. אותו נוסח בדיוק אומת גם בגרסת " +
    "2023 FPS03 (item 27.7, עמ' 649).",
  verificationLevel: "sap_official_verified",
};

const OMS2_HELP_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Information Sheet on Transferring Article Master Data (Retail)",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/fb17bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE24,
  claim:
    "רשומת החיפוש (help.sap.com, S/4HANA On-Premise 2025 FPS01, loio fb17bf53d25ab64ce10000000a174cb4) מציגה " +
    "בסניפט את הרצף 'Define Attributes of Material Types (transaction OMS2) General Control, Retail Master " +
    "Data...', כלומר מאשרת ש-OMS2 (הגדרת תכונות סוגי חומר) קיימת ומתועדת בתיעוד הרשמי לגרסת S/4HANA 2025 " +
    "FPS01 On-Premise. הטענה מוגבלת לסניפט; גוף העמוד לא נקרא.",
  verificationLevel: "sap_official_verified",
};

/* batch 6 status sources (2026-09-25): one evidence row per record, shared by evidence[] and
   status.source (OMSL, XK01, XK02, XK03, MCVA, MCXB, MCXC) */

const OMSL_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.5 S4TWL - Material Number " +
    "Field Length Extension",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 5.1.5 (מתחיל בעמ' 95; ציטוט OMSL בעמ' 101; SAP Note 0002267140 מודפס בפריט) קובע, בפרק 'System " +
    "Settings to Activate the Extended Material Number Functionality', שהרחבת שדה מספר החומר ל-40 תווים " +
    "כבויה כברירת מחדל, ושתי הגדרות נדרשות להפעלתה: הפעלת השדות המורחבים דרך ה-IMG או דרך טרנזקציית FLETS " +
    "(לתחזוקת הטבלה נדרשת קבוצת ההרשאות FLE, אובייקט S_TABU_DIS), ושינוי פורמט מספר החומר. הציטוט: " +
    "'Transaction OMSL allows a customer-specific settings regarding the material number field length. Here " +
    "the settings need to be adapted to allow a field length of more than 18 characters.' הפריט מציג את OMSL " +
    "כטרנזקציית ה-Customizing להתאמת אורך שדה מספר החומר בתהליך ההפעלה, ואינו קובע לגביה החלפה, הגבלה או " +
    "הוצאה משימוש.",
  verificationLevel: "sap_official_verified",
};

const XK01_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
    "Approach",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "הפריט (עמ' 136-138, Document Version 1.36) קובע: 'The user interface for SAP S/4HANA is transaction BP. " +
    "There is no specific user interface for customer/vendor like known from SAP Business Suite (the " +
    "specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, MK03, " +
    "etc. are not available in SAP S/4HANA. These will be redirected to transaction BP.)'. בטבלה " +
    "'Transactions not available in SAP S/4HANA on-premise edition', תחת 'Transactions that get redirected " +
    "to transaction BP', מופיעה XK01 בשמה (לצד XK02, XK03, XK05, XK06); היא אינה ברשימה 'Transactions that " +
    "are obsolete: MK12, MK18, MK19, XD07, XK07, V+21, V+22, V+23'.",
  verificationLevel: "sap_official_verified",
};

const XK02_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.27 " +
    "S4TWL - Business Partner Approach (SAP Note 2265093)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 5.1.27 'S4TWL - Business Partner Approach' ברשימת הפישוט ל-S/4HANA 2025 FPS01 (SAP Note 2265093, " +
    "עמ' 136-138) קובע: 'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, " +
    "XK03 or MK01, MK02, MK03, etc. are not available in SAP S/4HANA. These will be redirected to " +
    "transaction BP.' בטבלה 'Transactions not available in SAP S/4HANA on-premise edition', XK02 מופיעה תחת " +
    "'Transactions that get redirected to transaction BP' (לצד XK01, XK03, XK05, XK06); הרשימה הנפרדת " +
    "'Transactions that are obsolete: MK12, MK18, MK19, XD07, XK07, V+21, V+22, V+23' אינה כוללת את XK02. " +
    "סעיף Symptom: 'You are doing a system conversion to SAP S/4HANA, any of the releases.'",
  verificationLevel: "sap_official_verified",
};

const XK03_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.27 " +
    "S4TWL - Business Partner Approach",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט הפישוט 'S4TWL - Business Partner Approach' ברשימת הפישוט הרשמית (2025 FPS01, גרסת מסמך 1.36, עמ' " +
    "136-138) קובע במפורש: 'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, " +
    "XK03 or MK01, MK02, MK03, etc. are not available in SAP S/4HANA. These will be redirected to " +
    "transaction BP.' הטבלה שבפריט מונה את XK03 בשורה 'Transactions not available in SAP S/4HANA on-premise " +
    "edition' תחת הכותרת 'Transactions that get redirected to transaction BP', לצד XK01, XK02, XK05, XK06 " +
    "ומשפחות FD/VD/XD/FK/MK המקבילות.",
  verificationLevel: "sap_official_verified",
};

const MCVA_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.8 " +
    "S4TWL - Quality Management Information System (QMIS)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 9.6.8 'S4TWL - Quality Management Information System (QMIS)' (Application Component QM-QC-IS, SAP " +
    "Note 2270193) קובע כי מערכת המידע לניהול איכות (QMIS) המבוססת על Logistics Information System (LIS), " +
    "הכוללת את משפחת הטרנזקציות MCOx/MCVx/MCXx, היא חלק מ-compatibility scope של SAP S/4HANA עם זכויות שימוש " +
    "מוגבלות (לפי SAP Note 2269324, מזוהה שם תחת ID 473) ואינה ה-target architecture. הפריט נוקב בקוד MCVA " +
    "במפורש פעמיים: תחת רשימת הטרנזקציות ה'מוחלפות ב-Fiori apps מקבילים ב-QM Analytics' ('MCVZ MCVP MCVX " +
    "MCVD MCVB MCVM MCVK MCVI MCVG MCVE MCVC MCVA') וגם תחת 'Other Terms'. הפריט קובע שהטרנזקציות הללו " +
    "'יוסרו מה-Fiori launchpad עבור SAP S/4HANA', ומפרט שבע אפליקציות Fiori בקטגוריית QM Analytics " +
    "(Inspection Lot Analytics Last 365 Days F3239, Inspection Lot Detailed Analytics F3273, Characteristic " +
    "Analytics Last 365 Days F3383, Characteristic Detailed Analytics F3382, Results History F2428, " +
    "Nonconformance Analytics Last 365 Days F3584, Nonconformance Detailed Analytics F3583) כקבוצת החלפה " +
    "כללית לכל 36 הטרנזקציות יחד; הפריט אינו קובע מיפוי 1:1 בין MCVA הספציפית לבין אחת מהאפליקציות הללו.",
  verificationLevel: "sap_official_verified",
};

const MCXB_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.8 " +
    "S4TWL - Quality Management Information System (QMIS)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "הפריט 'S4TWL - Quality Management Information System (QMIS)' נוקב ב-MCXB ברשימת הקודים ('MCXP MCXV MCXX " +
    "MCXD MCXB MCXM MCXK MCXI MCXG MCXE MCXC MCXA') וקובע לגבי הקבוצה כולה: 'The Quality Management " +
    "Information System (QMIS) based on Logistics Information System (LIS) is part of the SAP S/4HANA " +
    "compatibility scope, which comes with limited usage rights'. לפרטי התפוגה הוא מפנה ל-SAP Note 2269324, " +
    "שבמטריצת התאימות שלו ה-QMIS מופיע תחת מזהה 473. עוד נכתב: 'is not the target architecture', ו-'The " +
    "following transactions are replaced by corresponding Fiori apps in QM Analytics ... The transactions " +
    "will be removed in the SAP Fiori launchpad for SAP S/4HANA'. הפריט מונה אפליקציות QM Analytics בשלוש " +
    "קטגוריות (Inspection lot analytics, Characteristic analytics, Nonconformance analytics), כל אחת עם מזהה " +
    "אפליקציה (למשל Characteristic Analytics Last 365 Days‏ F3383, Characteristic Detailed Analytics‏ F3382, " +
    "Results History‏ F2428), עבור קבוצת הקודים כולה, בלי לשייך אפליקציה מסוימת ל-MCXB.",
  verificationLevel: "sap_official_verified",
};

const MCXC_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.8 " +
    "S4TWL - Quality Management Information System (QMIS)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "אותו פריט 'S4TWL - Quality Management Information System (QMIS)' ברשימת 2025 FPS01 נוקב ב-MCXC פעמיים: " +
    "בשדה Other Terms וברשימה שאחרי 'The following transactions are replaced by corresponding Fiori apps in " +
    "QM Analytics'. הנוסח זהה לגבי compatibility scope עם זכויות שימוש מוגבלות (SAP Note 2269324, ID 473), " +
    "לגבי 'is not the target architecture' ולגבי 'The transactions will be removed in the SAP Fiori " +
    "launchpad for SAP S/4HANA'. גם כאן מוצגת קבוצת אפליקציות QM Analytics (F3239, F3273, F3383, F3382, " +
    "F2428, F3584, F3583) ללא שיוך פרטני ל-MCXC.",
  verificationLevel: "sap_official_verified",
};

/* batch 7 status sources (2026-09-25): one evidence row per record, shared by evidence[] and
   status.source (MCXA, MCXX, MSC1N, MSC2N, MSC3N, MSC4N, QA32, QC20, QC21) */

const MCXA_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.8 " +
    "S4TWL - Quality Management Information System (QMIS)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE24,
  claim:
    "פריט 9.6.8 'S4TWL - Quality Management Information System (QMIS)' (רכיב יישום QM-QC-IS, הערת Business " +
    "Impact 0002270193) נוקב ב-MCXA פעמיים: ברשימת Other Terms וברשימה 'The following transactions are " +
    "replaced by corresponding Fiori apps in QM Analytics'. כל אחת משתי הרשימות מונה 36 קודים (12 MCO*, 12 " +
    "MCV*, 12 MCX*), ו-MCXA ביניהם. הפריט קובע: 'The Quality Management Information System (QMIS) based on " +
    "Logistics Information System (LIS) is part of the SAP S/4HANA compatibility scope, which comes with " +
    "limited usage rights', מפנה ל-SAP note 2269324 לפרטי היקף התאימות ומועד התפוגה שלו, ומציין שבמטריצת " +
    "התאימות המצורפת לה QMIS מבוסס LIS מופיע תחת ID 473. עוד נקבע ש-QMIS 'is not the target architecture " +
    "(functionality available in SAP S/4HANA but not considered as future technology)' ו-'The transactions " +
    "will be removed in the SAP Fiori launchpad for SAP S/4HANA.' טבלת QM Analytics בפריט מונה שבע " +
    "אפליקציות: Inspection Lot Analytics Last 365 Days F3239, Inspection Lot Detailed Analytics F3273, " +
    "Characteristic Analytics Last 365 Days F3383, Characteristic Detailed Analytics F3382, Results History " +
    "F2428, Nonconformance Analytics Last 365 Days F3584, Nonconformance Detailed Analytics F3583. הפריט " +
    "אינו משייך את MCXA לאפליקציה מסוימת אחת.",
  verificationLevel: "sap_official_verified",
  conflictingEvidence: [
    {
      sourceType: "fiori_library",
      sourceTitle:
        "Fiori Apps Library · App MCXA 'Inspection Lot KPIs - Overview by Material' (SAP GUI), release S32OP " +
        "(S/4HANA 2025 FPS01)",
      url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MCXA')/S32OP",
      product: "SAP S/4HANA",
      edition: "on-premise",
      release: "2025.001",
      accessedAt: DATE24,
      claim:
        "פלט scripts/fal-app.mjs MCXA --release S32OP: ספריית אפליקציות Fiori רושמת את MCXA בשם 'Inspection Lot " +
        "KPIs - Overview by Material', מסוג SAP GUI, בסטטוס Published, רכיב QM-QC-IS (Information System), קטלוג " +
        "טכני SAP_TC_QM_BE_APPS:S4QM, intent InspectionLot-displayKPIOverviewByMaterial, 'GUI transactions: " +
        "leading MCXA; related MCXA', ללא predecessors וללא successors, והערות RIN 3493254 (Front-End Server) " +
        "ו-3671888 (Back-End Server). רשימת המהדורות כוללת את S32OP (2025 FPS01 On-Premise) ומהדורות On-Premise " +
        "קודמות החל מ-S6OP (1610). הרישום במהדורה העדכנית עומד במתח עם הנוסח בלשון עתיד בפריט 9.6.8, 'The " +
        "transactions will be removed in the SAP Fiori launchpad for SAP S/4HANA'; הפריט אינו נוקב מועד להסרה.",
      verificationLevel: "sap_official_verified",
    },
  ],
};

const MCXX_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.8 " +
    "S4TWL - Quality Management Information System (QMIS)",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE25,
  claim:
    "הפריט (Application Component QM-QC-IS, SAP Note 0002270193) קובע כלשונו: 'The Quality Management " +
    "Information System (QMIS) based on Logistics Information System (LIS) is part of the SAP S/4HANA " +
    "compatibility scope, which comes with limited usage rights' וכי 'is not the target architecture'. תחת " +
    "'Other Terms' ובשורת ההחלפה מופיע MCXX בשורה 'MCXP MCXV MCXX MCXD MCXB MCXM MCXK MCXI MCXG MCXE MCXC " +
    "MCXA'. הפריט ממשיך: 'The following transactions are replaced by corresponding Fiori apps in QM " +
    "Analytics' ומכסה את אותה שורת קודים, ומסיים: 'The transactions will be removed in the SAP Fiori " +
    "launchpad for SAP S/4HANA'. הפניה ל-SAP Note 2269324 (מטריצת compatibility scope, ID 473) לתוקף ולפרטים " +
    "נוספים. הפריט אינו משייך אפליקציית Fiori ספציפית ל-MCXX; הוא מפנה לעמוד 'QM Analytics' ב-help.sap.com " +
    "ומונה אפליקציות QM Analytics לפי קטגוריות ניתוח (בדיקות, מאפיינים, אי-התאמות).",
  verificationLevel: "sap_official_verified",
};

const MSC1N_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Fiori Apps Library · App MSC1N 'Create Batch' (SAP GUI), release S32OP (S/4HANA 2025 FPS01)",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MSC1N')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE25,
  claim:
    "ספריית אפליקציות ה-Fiori (scripts/fal-app.mjs MSC1N --release S32OP) רושמת את MSC1N כאפליקציית SAP GUI " +
    "בשם 'Create Batch', סטטוס 'Published', רכיב יישום LO-BM, קטלוג עסקי SAP_SCM_BC_BATCH_MGMT ('Batch " +
    "Management - Batches'), תפקידים SAP_BR_PRODN_SUPERVISOR_PROC ו-SAP_BR_QUALITY_TECHNICIAN, וללא " +
    "predecessors וללא successors רשומים ('predecessors: -; successors: -'). רשימת ה-releases שבפלט כוללת את " +
    "S6OP (1610) ועד S32OP (2025 FPS01) ברצף.",
  verificationLevel: "sap_official_verified",
};

const MSC2N_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 – Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition " +
    "2025 – Feature Pack Stack 1 · item 5.1.8 S4TWL - Logistics Batch Management",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE25,
  claim:
    "הפריט (עמ' 104-105, רכיב LO-BM-MD, הערה 0002267298) קובע כי הטרנזקציות MSC1, MSC2, MSC3 ו-MSC4 אינן " +
    "זמינות ב-SAP S/4HANA on-premise edition 1511, ומפרט את המקבילה הפונקציונלית; הציטוט: 'The functional " +
    "equivalent in SAP S/4HANA, on-premise edition 1511 are the following transactions: MSC1N Create Batch, " +
    "MSC2N Change Batch, MSC3N Display Batch, MSC4N Display Change Documents for Batch.' הפריט מוסיף שהמעבר " +
    "לקודי ה-MSC*N הומלץ כבר מאז מהדורה 4.6A. ביחס ל-MSC2N עצמה הפריט אינו קובע הגבלה או הוצאה משימוש; הוא " +
    "מציין אותה בשמה כטרנזקציית ההמשך.",
  verificationLevel: "sap_official_verified",
};

const MSC3N_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.8 " +
    "S4TWL - Logistics Batch Management",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE25,
  claim:
    "פריט 5.1.8 'S4TWL - Logistics Batch Management' (Application Component LO-BM-MD, Note 2267298) קובע " +
    "במפורש לגבי MSC3N: הטרנזקציות הישנות MSC1, MSC2, MSC3, MSC4 אינן זמינות ב-SAP S/4HANA On-Premise 1511 " +
    "ואילך, וה'functional equivalent' שלהן הן MSC1N, MSC2N, MSC3N ו-MSC4N; ציטוט מדויק: 'The following " +
    "transactions related to Logistics Batch Management are not available in SAP S/4HANA, on-premise edition " +
    "1511: MSC1, MSC2, MSC3 and MSC4. The functional equivalent in SAP S/4HANA, on-premise edition 1511 are " +
    "the following transactions: MSC1N Create Batch, MSC2N Change Batch, MSC3N Display Batch, MSC4N Display " +
    "Change Documents for Batch'. הפריט מוסיף שכבר מגרסת 4.6A הומלץ להשתמש בקודי MSC*N, ושאין השפעה על " +
    "התהליך העסקי מעבר לשימוש בקוד המומלץ. כלומר: MSC3N עצמו אינו מוסר או מוחלף; הוא הקוד שממשיך לשמש (ולא " +
    "הוקם מחדש) לתצוגת אצווה ב-S/4HANA, בעוד שהקוד הישן MSC3 (ללא N) הוסר.",
  verificationLevel: "sap_official_verified",
};

const MSC4N_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Fiori Apps Library · App MSC4N 'Display Batch Changes' (SAP GUI), release S32OP (S/4HANA 2025 FPS01)",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MSC4N')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE25,
  claim:
    "ספריית האפליקציות של Fiori רושמת את MSC4N כאפליקציית SAP GUI בשם 'Display Batch Changes', בסטטוס " +
    "Published, רכיב LO-BM (Batch Management), תפקידים SAP_BR_PRODN_SUPERVISOR_PROC " +
    "ו-SAP_BR_QUALITY_TECHNICIAN, קטלוג טכני SAP_TC_SCM_PP_BE_APPS:S4PP, קטלוג עסקי SAP_SCM_BC_BATCH_MGMT " +
    "'Batch Management - Batches', intent Batch-displayChanges, טרנזקציית GUI מובילה MSC4N. רשימת המהדורות " +
    "בספרייה כוללת את S6OP (1610) עד S32OP (2025 FPS01, המהדורה העדכנית ל-On-Premise), וכן גרסאות PCE. " +
    "predecessor ו-successor אינם רשומים ('-').",
  verificationLevel: "sap_official_verified",
};

const QA32_F2343_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle:
    "Fiori Apps Library · App F2343 'Manage Inspection Lots' (SAP Fiori elements), release S32OP (SAP " +
    "S/4HANA 2025 FPS01, On-Premise)",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2343')/S32OP",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE25,
  claim:
    "רשומת Fiori Apps Library ל-F2343 מציגה אפליקציה טרנזקציונית 'Manage Inspection Lots' (SAP Fiori " +
    "elements), סטטוס Published, רכיב QM-FIO-IM, תפקידים SAP_BR_MAINTENANCE_PLANNER, SAP_BR_QUALITY_ENGINEER " +
    "ו-SAP_BR_QUALITY_TECHNICIAN, business catalogs SAP_EAM_BC_INSPCHKLST ו-SAP_QM_BC_INSPECTION_LOT, intent " +
    "InspectionLot-manage, OData QM_INSPLOTMNG_SRV, GUI transactions: leading QA32; related QA03, QA33. שדה " +
    "ה-releases כולל את S32OP (2025 FPS01, On-Premise).",
  verificationLevel: "sap_official_verified",
};

const QC20_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.6 " +
    "S4TWL - ITS services in QM",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE25,
  claim:
    "פריט 9.6.6 (SAP Note 2270126, 'S4TWL - ITS services in QM') קובע ששירותי ה-ITS של QM ל-Internet " +
    "Application Components (IAC) אינם זמינים ב-S/4HANA On-Premise ('the ITS services for the Internet " +
    "Application Components (IAC) in QM are not available within SAP S/4HANA, on-premise edition 1511'). " +
    "לעניין תעודות איכות הפריט קובע: 'Certificates: No WebDynpro application available. However, existing QM " +
    "transactions are still available, such as QC20, QC21'. הפריט אינו מטיל שינוי על QC20 ומונה אותו כחלופה " +
    "הזמינה לאחר הסרת שירותי ה-ITS/IAC (הטבלה בפריט מונה, בין היתר, את QC40, QC40A, QC42, QEW01, QEW01V, " +
    "QMW1, QISR, QISRW).",
  verificationLevel: "sap_official_verified",
};

const QC21_SIMPL2025: Evidence = {
  sourceType: "simplification_item",
  sourceTitle:
    "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 9.6.6 " +
    "S4TWL - ITS services in QM",
  url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025 FPS01",
  accessedAt: DATE25,
  claim:
    "הפריט 'S4TWL - ITS services in QM' קובע ששירותי ITS עבור IAC ב-QM (למשל QC40) אינם זמינים ב-SAP S/4HANA " +
    "on-premise. לגבי תעודות הוא קובע: 'No WebDynpro application available. However, existing QM " +
    "transactions are still available, such as QC20, QC21'. הפריט אינו מבטל, מחליף או מגביל את QC21; הוא " +
    "מציין אותה כטרנזקציה קיימת שמשמשת חלופה לשירות ה-ITS שהוסר עבור תעודות.",
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
  {
    id: "tx:ME47",
    evidence: [
      ME47_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 38.7 S4TWL - RFQ Simplified " +
          "Transaction (MM-PUR-RFQ, SAP Note 2332710)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט 38.7 (עמ' 957-958, Note Number 2332710) נוקב כמעט מילה במילה כפריט 14.4.1 ברשימת 2025 FPS01: " +
          "אותה רשימת 14 הקודים 'The following transactions are deprecated in SAP S/4HANA' (הכוללת את ME47), " +
          "אותו ניסוח 'a functional equivalent is not available', ואותה רשימת חמש האפליקציות תחת Business " +
          "Process Related Information (Manage RFQs F2049, Monitor RFQ Items F2425, Request for Quotation Types " +
          "F4149, Manage Supplier Quotations F1991, Compare Supplier Quotations F2324) עם אותה הנחיה לסגור RFQ " +
          "פתוחים ('set them to status \"Completed\"') לפני מעבר לאפליקציות. נקרא מחילוץ ה-PDF השמור " +
          "(scratchpad/official/SIMPL_OP2023.pdf.txt), לא הורד מחדש היום.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Quotation (MM-PUR) | Materials Management (MM) · SAP ERP",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/9306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (Technical name: SAP_MM_PUR_QUOTATION; נקרא במלואו דרך " +
          "help.sap.com/http.svc/deliverableMetadata ו-pagecontent, SAP ERP 6.0 EHP8 Latest) קובע: 'You can use " +
          "the activities of this role to record and maintain the data submitted to you by a vendor in a " +
          "quotation (e.g. prices, conditions, and terms of delivery) in your SAP System', ומפרט טבלת " +
          "'Activities in Materials Management': 'Enter quotation ME47', 'Display quotation ME48', 'Quotation " +
          "price comparison list ME49' (כלשונו). זהו המקור הרשמי הקובע ש-ME47 היא טרנזקציית הזנת ה-quotation " +
          "הקלאסית ב-ECC, בהמשך ישיר ל-RFQ (ME41).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Quotation (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/9306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "אותו loio (9306b753128eb44ce10000000a174cb4) בתיעוד SAP S/4HANA 2025 FPS01 (versionId 2025.001), גוף " +
          "העמוד נקרא במלואו דרך help.sap.com/http.svc/deliverableMetadata ו-pagecontent: אותו טקסט תפקיד " +
          "(Technical name: SAP_MM_PUR_QUOTATION) ואותה טבלת 'Activities in Materials Management': 'Enter " +
          "quotation ME47', 'Display quotation ME48', 'Quotation price comparison list ME49' (כלשונו). כלומר " +
          "ME47 עדיין מתועדת כפעילות של התפקיד בתיעוד S/4HANA On-Premise 2025 FPS01; העמוד אינו אומר דבר על " +
          "הפסקת שימוש עתידית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · F1991 Manage Supplier Quotations, release S32OP (SAP S/4HANA 2025 FPS01, " +
          "on-premise)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1991')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library לאפליקציה Manage Supplier Quotations (F1991), רכיב MM-FIO-PUR-RFQ, תפקיד " +
          "SAP_BR_PURCHASER (R0128), business catalog SAP_PRC_BC_PURCHASER_PIR 'Purchasing - Source " +
          "Assignment', OData MM_PUR_QTN_MAINTAIN_SRV 0001 (S4CORE 109), מציגה שדה 'GUI transactions: leading " +
          "ME47; related ME48' (כלשונו); קשר קוד-לאפליקציה ספציפי וישיר, חזק יותר מהרשימה הקבוצתית בפריט " +
          "הפישוט. השדות 'predecessors: -; successors: -' באותה רשומה אינם מגדירים יחס predecessor/successor " +
          "פורמלי. F1991 מתועדת ברשימת הגרסאות on-premise מ-1610 (S6OP) ועד 2025 FPS01 (S32OP). F1991 אינה " +
          "רשומה כיום בקטלוג data/fiori/apps.ts של הפרויקט.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "fiori_alternative_available",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME47_SIMPL2025,
      he:
        "פריט הפישוט הרשמי (14.4.1 ברשימת 2025 FPS01, 38.7 ברשימת 2023 FPS03, שני הטקסטים כמעט זהים) מונה את " +
        "ME47 בשמה ברשימת 14 הטרנזקציות 'deprecated in SAP S/4HANA', וקובע שהפונקציונליות זמינה ב-S/4HANA אך " +
        "אינה ארכיטקטורת היעד, וש-'a functional equivalent is not available' לגישת ה-RFQ/quotation הקלאסית עם " +
        "שדה ספק חובה. הפריט מפנה ברמת תהליך לחמש אפליקציות Fiori (Manage RFQs F2049, Monitor RFQ Items F2425, " +
        "Request for Quotation Types F4149, Manage Supplier Quotations F1991, Compare Supplier Quotations " +
        "F2324), ללא הכרזה על יורשת בודדת ל-ME47 עצמה. עם זאת, רשומת ה-Fiori Apps Library של F1991 (S32OP) " +
        "מציגה קשר קוד-ספציפי וישיר: 'GUI transactions: leading ME47; related ME48'; F1991 היא האפליקציה " +
        "שה-GUI transaction המוביל שלה הוא ME47 עצמה, בניגוד לקבוצת האפליקציות הכללית שהפריט מציע. לכן " +
        "הסטטוס נכתב fiori_alternative_available: הפונקציונליות זמינה כיום ב-S/4HANA On-Premise לפי לשון " +
        "הפריט ('currently available'), ME47 עדיין מתועדת בעמוד התפקיד של S/4HANA 2025 FPS01, היא מסווגת " +
        "deprecated בפריט הרשמי, וקיימת אפליקציית Fiori רשמית (F1991) שה-Fiori Apps Library עצמה קושרת אליה " +
        "ישירות כטרנזקציית ה-GUI המובילה שלה.",
      recommendedAction:
        "לא לבסס תהליכי הזנת quotation חדשים, הדרכות או פיתוחים על ME47 במסלול ההמרה ל-S/4HANA On-Premise: " +
        "הפריט הרשמי מסווג אותה deprecated ומציין שאין functional equivalent לגישה הקלאסית. לבחון מעבר " +
        "ל-Manage Supplier Quotations (F1991), שה-Fiori Apps Library קושרת אליה ישירות כ-leading GUI " +
        "transaction של ME47 (הפריט מונה באותה רשימה גם את Compare Supplier Quotations F2324). לסגור RFQ " +
        "פתוחים שנוצרו בטרנזקציות הישנות (status Completed) לפני המעבר, כפי שהפריט מנחה. F1991 טרם רשומה " +
        "בקטלוג ה-Fiori של הפרויקט (data/fiori/apps.ts); יש להוסיפה שם, ורק לאחר מכן לרשום xref/successor " +
        "רשמיים אליה ברשומה זו. לקרוא SAP Note 2332710 (דורש S-user, לא נקרא כאן) לפני החלטת תהליך יעד " +
        "קבועה, ולבדוק ב-SE93 במערכת היעד שהקוד עודנו קיים ומורשה.",
    },
    xrefs: ["tx:ME41", "tx:ME42", "tx:ME43", "tx:ME48", "tx:ME49", "tx:ME21N"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) שני פריטי הפישוט הרשמיים (14.4.1 ברשימת 2025 FPS01, 38.7 ברשימת 2023 FPS03) מונים את " +
      "ME47 בשמה ברשימת הטרנזקציות 'deprecated in SAP S/4HANA', עם אותו ציטוט 'the functionality is currently " +
      "available in SAP S/4HANA but it is not considered as future technology and a functional equivalent is " +
      "not available'. (2) גוף העמוד 'Maintain Quotation (MM-PUR)' נקרא במלואו בשני מוצרים דרך " +
      "help.sap.com/http.svc/deliverableMetadata ו-pagecontent: SAP ERP 6.18.latest (loio " +
      "9306b753128eb44ce10000000a174cb4) ו-SAP S/4HANA On-Premise 2025.001 (אותו loio), שניהם מאשרים 'Enter " +
      "quotation ME47, Display quotation ME48, Quotation price comparison list ME49' באותו נוסח מדויק, מה " +
      "שמבסס עמידה בשתי המהדורות; שני העמודים מצוטטים כשורות ראיה נפרדות. (3) scripts/fal-app.mjs F1991 " +
      "--release S32OP אושר (והורץ שוב בכתיבה ב-2026-09-24 עם אותו פלט): F1991 (Manage Supplier Quotations) " +
      "מתעדת GUI transaction מוביל ME47 (related ME48), ללא predecessor/successor פורמלי רשום, ורשימת " +
      "הגרסאות on-premise מתחילה ב-1610 (S6OP). מה שלא אומת: (א) SAP Note 2332710, המצוטט בשני הפריטים, " +
      "דורש S-user ולא נקרא; המספר מצוטט כפי שהודפס בפריט ואינו נישא בשדה sapNote. (ב) F2049, F2425, F4149, " +
      "F2324 (שאר קבוצת חמש האפליקציות) לא נבדקו דרך fal-app.mjs לרשומה זו ואינן רשומות בקטלוג " +
      "data/fiori/apps.ts; לכן אינן נכללות כ-xrefs או כ-successor, והפריט אינו מדרג אותן לפי קרבה ל-ME47 או " +
      "ל-ME49. (ג) לא בוצעה בדיקת SE93 במערכת S/4HANA חיה שהקוד עדיין קיים; ה-MCP ל-ABAP (sc4sap) לא התחבר " +
      "בסשן זה. (ד) קובץ ה-PDF של 2023 FPS03 נקרא מחילוץ pdftotext שמור בפרויקט " +
      "(scratchpad/official/SIMPL_OP2023.pdf.txt), לא הורד מחדש היום; PDF 2025 FPS01 נקרא מאותו חילוץ שמור " +
      "(SIMPL_OP2025.pdf.txt); רק כותרות ה-HTTP והעמודים הרשמיים נבדקו ב-2026-09-24. (ה) שדה status.source " +
      "מצביע לרשומת evidence[0] (פריט הפישוט 2025 FPS01), כמוסכמת הקובץ. (ו) שדה status.successor " +
      "(fiori:F1991) ו-xref fiori:F1991 הושמטו כי F1991 אינה עדיין בקטלוג data/fiori/apps.ts; יש להחילם רק " +
      "לאחר מיזוג catalogPatch מלא (לפי FioriApp ב-lib/fiori/types.ts), אחרת ייכשל dangling-xref; הערכים " +
      "התחומים לטיוטת ה-catalogPatch רשומים ב-audit/s4-enrichment/research-queue-transactions-b.md, ושדות " +
      "purpose/problem/explain טרם נכתבו ממקור רשמי. לא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה " +
      "reviewer, כמוסכמת הקטלוג; עברה סבב ביקורת אדברסרית ב-2026-09-24, והורדות המבקר יושמו: תיקון טווח " +
      "הגרסאות של F1991 ל-1610 (S6OP) ואילך, הסרת קווים מפרידים ארוכים, הוספת שורת ראיה לעמוד S/4HANA " +
      "2025.001. בכתיבה צומצמו שלושה ניסוחים ללשון המקור: 'הקוד קיים ותקין להרצה' הוחלף בלשון הפריט " +
      "('currently available'), ההשוואה בין F2324 ל-ME49 הוסרה (אין מקור המדרג את האפליקציות), וההנחיה " +
      "לסגירה מתייחסת ל-RFQ פתוחים שנוצרו בטרנזקציות הישנות, כלשון הפריט.",
  },
  {
    id: "tx:ME48",
    evidence: [
      ME48_SIMPL2023,
      {
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
          "גרסת 2025 FPS01 של הפריט חוזרת על אותה רשימה במדויק (עמ' 1429-1430; מספר ה-Note מודפס שם " +
          "כ-0002332710): 'The following transactions are deprecated in SAP S/4HANA: ME41 ME42 ME43 ME44 ME45 " +
          "ME47 ME48 ME49 ME4B ME4C ME4L ME4M ME4N ME4S' (כלשונו), וגם כאן ME48 מנויה בשמה. הפריט מסביר " +
          "שהגישה הקודמת ל-RFQ כללה שדה ספק חובה ומוגבל לספק אחד בלבד, ושהגישה החדשה מאפשרת שליחת RFQ שנוצר " +
          "באפליקציית Fiori לפלטפורמות sourcing חיצוניות בלי לנקוב ספק מדויק; לגבי הטרנזקציות הקלאסיות (ME48 " +
          "בכללן) נכתב במפורש: 'the functionality is currently available in SAP S/4HANA but it is not " +
          "considered as future technology and a functional equivalent is not available' (כלשונו). בסעיף " +
          "Business Process Related Information נכתב: 'If you want to use functionality related to sourcing " +
          "of goods and services, you can use the following apps: Manage RFQs (F2049), Monitor RFQ Items " +
          "(F2425), Request for Quotation Types (F4149), Manage Supplier Quotations (F1991), Compare Supplier " +
          "Quotations (F2324)' (כלשונו); זו המלצה ברמת תהליך העסקי ולא הצהרה מפורשת שאפליקציה בודדת היא " +
          "היורשת הפורמלית של ME48.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · Manage RFQs (F2049), release S32OP (SAP S/4HANA 2025 FPS01, on-premise)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2049')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library לאפליקציה Manage RFQs (F2049) מפרטת בשדה ה-GUI Transactions: 'leading " +
          "ME41; related ME42, ME43' ובשדות 'predecessors: -; successors: -' (כלשונו; scripts/fal-app.mjs F2049 " +
          "--release S32OP הורץ שוב בסבב הביקורת ב-2026-09-24); ME48 אינה מודפסת שם כלל, לא כ-leading ולא " +
          "כ-related. כלומר ה-Fiori Apps Library אינה מקשרת את F2049 ל-ME48 באופן ישיר, אף שפריט הפישוט מונה " +
          "את ME41 ואת ME48 יחד ברשימת ה-deprecated. F2049 אינה רשומה עדיין בקטלוג data/fiori/apps.ts של " +
          "הפרויקט, ולכן אינה יכולה להירשם כ-successor הניתן לאימות ברמת xref בכל מקרה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: data/tx-intel.ts#ME48",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר הקיימת (לפני ביקורת) מתארת את ME48 כ-'תצוגת הצעת מחיר (Display Quotation): צפייה " +
          "במחירים ובתנאים שהזין ספק על RFQ, ללא עריכה' (פיסוק מותאם: במקור קו מפריד ארוך במקום הנקודתיים, " +
          "התוכן ללא שינוי), טרנזקציית מסך קלאסי הקוראת EKKO/EKPO/KONP במצב display בלבד; שדה ה-s4 ברשומה " +
          "קובע 'זמין ב-S/4HANA' ללא כל הפניה לפריט הפישוט או לחלופת Fiori, ושדה ה-fiori ריק. הרשומה מקשרת את " +
          "הקוד ל-ME47 (before) ול-ME49, ME21N (after). אין ברשומה קביעה עצמאית לגבי הפסקת שימוש עתידית; זהו " +
          "ניסוח שנכתב ללא הפניה לפריט הפישוט הרשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME48",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Quotation (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/9306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'ME48 display quotation', --size 12, ללא --product; loio " +
          "9306b753128eb44ce10000000a174cb4, versionId 2025.001) מדפיסה ב-snippet: 'Activities in Materials " +
          "Management Activity Transaction Enter quotation ME47 Display quotation ME48 Quotation price " +
          "comparison list ME49' ו-'Technical name: SAP_MM_PUR_QUOTATION' (כלשונו). כלומר תיעוד התפקיד " +
          "ב-S/4HANA 2025 FPS01 עדיין מונה את ME48 כפעילות Display quotation, ופריט הפישוט הוא הודעת " +
          "deprecation ולא הסרה. גוף העמוד לא נקרא לרשומה זו (snippet בלבד).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "General Display Functions in Purchasing (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/a806b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "אותו חיפוש (loio a806b753128eb44ce10000000a174cb4, versionId 2025.001) מדפיס ב-snippet את טבלת " +
          "הפעילויות של התפקיד: 'Display purchase requisition ME53N Display purchase order ME23N Display RFQ " +
          "ME43 Display quotation ME48' (כלשונו, מקוצר). גם עמוד זה בתיעוד S/4HANA 2025 FPS01 מונה את ME48 " +
          "כפעילות Display quotation. גוף העמוד לא נקרא (snippet בלבד).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · F1991 Manage Supplier Quotations, release S32OP (SAP S/4HANA 2025 FPS01, " +
          "on-premise)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1991')/S32OP",
        accessedAt: DATE24,
        claim:
          "פלט scripts/fal-app.mjs F1991 --release S32OP (הורץ בכתיבה ב-2026-09-24; אותה רשומה נבדקה בסבב " +
          "הביקורת של tx:ME47): Manage Supplier Quotations, רכיב MM-FIO-PUR-RFQ, תפקיד SAP_BR_PURCHASER " +
          "(R0128), 'GUI transactions: leading ME47; related ME48', 'predecessors: -; successors: -' (כלשונו). " +
          "כלומר ME48 מודפסת ברשומה כטרנזקציית GUI related של F1991, לא כ-leading, וללא יחס successor פורמלי. " +
          "F1991 אינה רשומה בקטלוג data/fiori/apps.ts של הפרויקט.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "fiori_alternative_available",
      edition: "on-premise",
      release: "2023 FPS03",
      source: ME48_SIMPL2023,
      he:
        "שני פריטי הפישוט הרשמיים (38.7 ברשימת 2023 FPS03, 14.4.1 ברשימת 2025 FPS01) מונים את ME48 בשמה " +
        "ברשימת הטרנזקציות ה-deprecated ומפנים ברמת תהליך העסקי לחמש אפליקציות Fiori של תחום ה-RFQ. רשומת " +
        "Manage RFQs (F2049) ב-Fiori Apps Library מפרטת GUI transactions leading ME41 ו-related ME42/ME43, " +
        "ו-ME48 אינה מודפסת בה; רשומת Manage Supplier Quotations (F1991) מפרטת 'leading ME47; related ME48', " +
        "כלומר ME48 מופיעה שם כטרנזקציית GUI related, ללא יחס successor פורמלי. אף אחת מחמש האפליקציות אינה " +
        "רשומה בקטלוג data/fiori/apps.ts של הפרויקט, ולכן לא נקבע successor. עמודי התפקיד הרשמיים של S/4HANA " +
        "2025 FPS01 (Maintain Quotation (MM-PUR), General Display Functions in Purchasing (MM-PUR)) עדיין מונים " +
        "את ME48 כפעילות Display quotation, כלומר מדובר בהודעת deprecation ולא בהסרה.",
      recommendedAction:
        "לא לבסס תהליכי בדיקת הצעות מחיר חדשים על ME48 במסלול ההמרה ל-S/4HANA On-Premise: הפריט הרשמי מסווג " +
        "אותה 'deprecated'. לבחון מעבר לאפליקציות ה-Fiori שהפריט מפנה אליהן ברמת תהליך; הפריט אינו מדרג את " +
        "חמש האפליקציות לפי קרבה ל-ME48, ואיזו מהן מכסה את תפקיד התצוגה/ההשוואה דורש אימות (fal-app.mjs לכל " +
        "אחת ובדיקה במערכת). רשומת ה-Fiori Apps Library של Manage Supplier Quotations (F1991) מונה את ME48 " +
        "כטרנזקציית GUI related, ואף אחת משתי הרשומות שנבדקו (F2049, F1991) אינה מגדירה יחס successor. יש " +
        "להוסיף את חמש האפליקציות לקטלוג data/fiori/apps.ts ולקרוא SAP Note 2332710 (דורש S-user, לא נקרא " +
        "כאן) לפני שניתן יהיה לקבוע successor רשמי לרשומה הזאת, ולבדוק ב-SE93 במערכת היעד שהקוד עודנו קיים " +
        "ומורשה.",
    },
    xrefs: ["tx:ME41", "tx:ME43", "tx:ME47", "tx:ME49", "tx:ME21N"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) שני פריטי הפישוט הרשמיים (38.7 ברשימת 2023 FPS03, 14.4.1 ברשימת 2025 FPS01, אותם קבצי PDF " +
      "שכבר שימשו לרשומות tx:ME41 ו-tx:ME43 בקובץ זה) מונים את ME48 בשמה ברשימת 'deprecated in SAP " +
      "S/4HANA', עם אותו ציטוט מילה במילה בשתי הגרסאות; בעמודת השמות המקבילה מודפס עבור ME48 'Display' בלבד. " +
      "(2) scripts/fal-app.mjs F2049 --release S32OP הורץ ב-2026-09-24 (סבב הביקורת): GUI transactions " +
      "leading ME41; related ME42, ME43; predecessors: -; successors: -; ME48 אינה מודפסת. (3) " +
      "scripts/fal-app.mjs F1991 --release S32OP (נבדק בסבב הביקורת של tx:ME47 והורץ שוב בכתיבה " +
      "ב-2026-09-24): 'GUI transactions: leading ME47; related ME48', 'predecessors: -; successors: -'. (4) " +
      "sap-help-search.mjs 'ME48 display quotation' --size 12 ללא --product: 21 רשומות, שתיים מדפיסות " +
      "'Display quotation ME48' ב-snippet (Maintain Quotation (MM-PUR) loio 9306b753128eb44ce10000000a174cb4; " +
      "General Display Functions in Purchasing (MM-PUR) loio a806b753128eb44ce10000000a174cb4, שתיהן " +
      "2025.001); גוף העמודים לא נקרא. מה שלא אומת: (א) F2425, F4149, F2324 (שאר האפליקציות שהפריט מציין) לא " +
      "נבדקו דרך fal-app.mjs; אף אחת מחמש האפליקציות אינה רשומה בקטלוג data/fiori/apps.ts, ולכן אף אחת אינה " +
      "נכללת כ-successor או xref, והפריט אינו מדרג אותן לפי קרבה לתפקיד ה-display/comparison של ME48. (ב) SAP " +
      "Note 2332710, המצוטט בשני הפריטים, דורש S-user ולא נקרא; המספר מוזכר כפי שהודפס בגוף הפריט ואינו נישא " +
      "בשדה sapNote נפרד. (ג) לא בוצעה בדיקת SE93 במערכת S/4HANA חיה שהקוד עדיין קיים ומורשה; ה-MCP ל-ABAP " +
      "(sc4sap) לא היה זמין בסשן זה. לא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת " +
      "הקטלוג; עברה סבב ביקורת אדברסרי ב-2026-09-24 והורדות המבקר יושמו (ייחוס השם Display Quotation לרשומת " +
      "המאגר, source משותף לפריט 2023, הסרת הדירוג הלא-מתועד של F2324/F1991, שורות ראיה לשני עמודי התפקיד " +
      "של 2025.001, הסרת קו מפריד ארוך). שורת F1991 נוספה בכתיבה מפלט fal-app.mjs, כדי שהרשומה תהיה עקבית " +
      "עם tx:ME47.",
  },
  {
    id: "tx:ME49",
    evidence: [
      ME41_SIMPL2025,
      ME43_SIMPL2023,
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Quotation (MM-PUR) | Materials Management (MM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/9306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs, 'ME49 price comparison list', --size 8) מציגה את הפריט 'Maintain " +
          "Quotation (MM-PUR)' בגרסת S/4HANA 2025 FPS01 (versionId 2025.001) עם הסניפט 'Activities in " +
          "Materials Management Activity Transaction Enter quotation ME47 Display quotation ME48 Quotation " +
          "price comparison list ME49 …' (כלשונו); אותה רשומה בדיוק (אותו loio) חוזרת בחיפוש מקביל תחת " +
          "--product SAP_ERP (versionId 6.18.latest) עם אותו סניפט. כלומר, ME49 עדיין מופיעה בטבלת הפעילויות " +
          "של התפקיד SAP_MM_PUR_QUOTATION כ-'Quotation price comparison list', הן בתיעוד S/4HANA On-Premise " +
          "2025 FPS01 והן בתיעוד ECC; הסניפט בלבד אינו קובע דבר על מצב הטרנזקציה במערכת או על הפסקת תמיכה " +
          "עתידית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומת ME49",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר (module MM, area 'רכש (Purchasing): הצעות מחיר (RFQ)') מתארת את ME49 כדוח 'Price " +
          "Comparison List' המקבץ הצעות (quotations) לפי collective number ומדרג אותן לפי מחיר (reference " +
          "quotation, mean value, market price, effective price); שדה fiori ברשומה ריק, ושדה s4 קובע: 'זמין " +
          "ב-S/4HANA; Ariba Sourcing מספק award/scoring מתקדם כחלופה'; זהו ניסוח עצמאי של המאגר שאינו מפנה " +
          "לפריט הפישוט הרשמי ואינו נושא מקור לטענת ה-Ariba. הרשומה מקשרת את הקוד ל-ME47, ME48 (before) " +
          "ול-ME21N, ME11 (after) ולטבלאות EKKO, EKPO, KONP.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME49",
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
          "פלט scripts/fal-app.mjs F2049 --release S32OP (הורץ מחדש בסבב הביקורת ב-2026-09-24): Manage RFQs, " +
          "רכיב MM-FIO-PUR-RFQ, תפקיד SAP_BR_PURCHASER (R0128), 'GUI transactions: leading ME41; related ME42, " +
          "ME43' ו-'predecessors: -; successors: -' (כלשונו). ME49 אינה מופיעה בשדה ה-GUI transactions, " +
          "והרשומה אינה מגדירה יחס predecessor/successor. F2049 אינה רשומה בקטלוג data/fiori/apps.ts של " +
          "הפרויקט.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "simplified",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME41_SIMPL2025,
      he:
        "ME49 (Price Comparison List) מופיעה בשמה, יחד עם ME41/ME42/ME43/ME44/ME45/ME47/ME48 ורשימות התצוגה " +
        "(ME4B/ME4C/ME4L/ME4M/ME4N/ME4S), בפריט הפישוט הרשמי 'S4TWL - RFQ Simplified Transaction' (14.4.1 " +
        "ברשימת S/4HANA 2025 FPS01, 38.7 ברשימת 2023 FPS03) תחת הכותרת 'deprecated in SAP S/4HANA', עם אותו " +
        "ניסוח לגבי כלל הקבוצה: 'the functionality is currently available in SAP S/4HANA but it is not " +
        "considered as future technology and a functional equivalent is not available'. הפריט אינו נוקב " +
        "ב-ME49 בנפרד, ואינו מכריז על טרנזקציה או אפליקציית Fiori בודדת כיורשת ישירה שלה; רשומת ה-Fiori Apps " +
        "Library של Manage RFQs (F2049, S32OP), המצורפת כשורת ראיה ברשומה זו, מפרטת בשדה 'GUI transactions' " +
        "רק 'leading ME41; related ME42, ME43' (ME49 אינה מופיעה שם), כך שלא נמצא מקור רשמי המקשר את ME49 " +
        "ספציפית לאפליקציית Fiori בודדת. במקביל, חיפוש נפרד ('ME49 price comparison list' / 'ME49 quotation " +
        "price comparison') מראה שהטרנזקציה עדיין מתועדת בעמוד 'Maintain Quotation (MM-PUR)' של S/4HANA 2025 " +
        "FPS01. לכן הסטטוס נכתב כפריט פישוט (simplified): הפונקציונליות זמינה כיום ב-S/4HANA On-Premise לפי " +
        "לשון הפריט ('currently available'), ומסווגת 'deprecated' בפריט הפישוט הקבוצתי, ללא הצהרה רשמית על " +
        "יורשת בודדת המאפשרת רישום שדה successor.",
      recommendedAction:
        "לא לבסס תהליכי השוואת הצעות מחיר חדשים על ME49 במסלול ההמרה ל-S/4HANA On-Premise: הפריט הרשמי מסווג " +
        "אותה 'deprecated' כחלק מקבוצת ME4x ומציין שאין functional equivalent לגישה הקלאסית. לבחון את " +
        "אפליקציות ה-Fiori שהפריט מפנה אליהן ברמת התהליך (Manage RFQs, Monitor RFQ Items, Manage Supplier " +
        "Quotations, Compare Supplier Quotations, Request for Quotation Types) או פלטפורמת sourcing חיצונית " +
        "(הפריט נוקב ב-SAP Ariba Sourcing כדוגמה), ולבדוק ב-SE93 במערכת היעד שהקוד עודנו קיים ומורשה טרם " +
        "החלטה על תהליך יעד קבוע. אף אחת מחמש האפליקציות אינה עדיין רשומה בקטלוג ה-Fiori של הפרויקט " +
        "(data/fiori/apps.ts); אין ברשומה זו קביעת successor.",
    },
    xrefs: ["tx:ME41", "tx:ME43", "tx:ME47", "tx:ME48", "tx:ME21N"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) שני פריטי הפישוט הרשמיים (14.4.1 ברשימת 2025 FPS01, 38.7 ברשימת 2023 FPS03) מונים את " +
      "ME49 בשמה ברשימת הטרנזקציות 'deprecated in SAP S/4HANA' של קבוצת ME4x, עם ההנחיה ברמת תהליך העסקי " +
      "לאפליקציות Fiori (Manage RFQs F2049, Monitor RFQ Items F2425, Request for Quotation Types F4149, " +
      "Manage Supplier Quotations F1991, Compare Supplier Quotations F2324), ללא קביעת מיפוי 1:1 ל-ME49 " +
      "עצמה. (2) חיפוש נפרד באמצעות scripts/sap-help-search.mjs (שני חיפושים: 'ME49 price comparison list' " +
      "ללא --product, ו-'ME49 quotation price comparison' עם --product SAP_ERP) מראה שהעמוד 'Maintain " +
      "Quotation (MM-PUR)' (אותו loio בשתי הגרסאות) עדיין מציג את ME49 כטרנזקציה מתועדת הן בגרסת S/4HANA " +
      "2025 FPS01 והן בתיעוד ECC; לא נקרא גוף העמוד המלא דרך sap-help-body.mjs מעבר לסניפט, כי הסניפט הספיק " +
      "לקביעה שהקוד עדיין מתועד. (3) scripts/fal-app.mjs F2049 --release S32OP הורץ מחדש בביקורת " +
      "ב-2026-09-24 ואישר ש-F2049 אינה מציגה את ME49 בשדה GUI transactions שלה (רק ME41/ME42/ME43) ואינה " +
      "רשומה בקטלוג data/fiori/apps.ts של הפרויקט; מסקנה זו חלה במלואה גם על ME49 ולכן לא הוצג שדה " +
      "successor. מה שלא אומת: (א) לא בוצעה בדיקה חיה ב-SE93 שהקוד קיים במערכת יעד (MCP ABAP לא זמין בסשן " +
      "זה). (ב) לא נמצא מקור רשמי הקושר אפליקציית Fiori ספציפית כ-successor פורמלי ל-ME49; לכן לא נרשם שדה " +
      "successor. (ג) SAP Note 2332710 (מודפס בגוף שני פריטי הפישוט) לא נקרא (דורש S-user). (ד) לא בוצעה " +
      "בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג; עברה סבב ביקורת אדברסרית " +
      "ב-2026-09-24, והורדות המבקר יושמו: הסרת קווים מפרידים ארוכים, 'מתועדת' במקום 'פעילה', לשון הפריט " +
      "('currently available') במקום 'הקוד קיים ותקין להרצה', ושורת ראיה ל-F2049 ברשומה זו. בכתיבה נוסף: " +
      "רשומת F1991 (Manage Supplier Quotations, fal-app.mjs S32OP, נבדקה לרשומת tx:ME47) מפרטת 'leading " +
      "ME47; related ME48', ו-ME49 אינה מופיעה בה; F2425, F4149, F2324 לא נבדקו.",
  },
  {
    id: "tx:ME51N",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - MM-PUR WebDynpro Applications (Simplification List for SAP S/4HANA 2023 - Feature Pack " +
          "Stack 3, item 38.1)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        verificationLevel: "sap_official_verified",
        claim:
          "הפריט (עמ' 939-940 במסמך, SAP Note 2267445) עוסק בהסרת אפליקציות WebDynpro של MM ב-S/4HANA " +
          "on-premise 1511 ואילך, ומציג טבלת מיפוי בין כל אפליקציית WebDynpro לתחליף שלה. עבור " +
          "'MMPUR_SPPR_MAIN_APPL' (Purchase Requisition Processing) התחליף הרשום הוא: 'SAP GUI transaction " +
          "ME51N, Fiori Application' (כלשונו). הפריט אינו קובע ל-ME51N עצמה סטטוס של deprecated, replaced או " +
          "removed; הוא נוקב בה כיעד ההמשכיות של אפליקציית ה-WebDynpro שהוסרה, לא כטרנזקציה שעצמה מוחלפת.",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - MM-PUR WebDynpro Applications (Simplification List for SAP S/4HANA 2025 - Feature Pack " +
          "Stack 1, item 14.2.7)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        verificationLevel: "sap_official_verified",
        claim:
          "הפריט המקביל (עמ' 1416-1417, מבוסס אותו SAP Note 2267445 כמו פריט 38.1 של 2023) חוזר על אותה " +
          "קביעה: אפליקציות WebDynpro של MM אינן זמינות מ-S/4HANA on-premise 1511 ואילך, ועבור " +
          "'MMPUR_SPPR_MAIN_APPL' (Purchase Requisition Processing) התחליף הרשום זהה: 'SAP GUI transaction " +
          "ME51N, Fiori Application' (כלשונו). גם כאן אין קביעה על הפסקת השימוש ב-ME51N עצמה, רק אזכור כיעד " +
          "ההמשכיות.",
      },
      ME51N_FEATURE_COMPARISON_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Process Purchase Requisition (MM-PUR)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/ed06b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        verificationLevel: "sap_official_verified",
        claim:
          "רשומת החיפוש (Materials Management (MM), S/4HANA on-premise 2025 FPS01, loio " +
          "ed06b753128eb44ce10000000a174cb4) מתארת את התפקיד Process Purchase Requisition (MM-PUR), שם טכני " +
          "SAP_MM_PUR_PURCHASEREQUISITION, ובקטע 'Activities in Materials Management' מונה: 'Create purchase " +
          "requisition ME51N', 'Change purchase requisition ME52N', 'Display purchase requisition ME53N' (מתוך " +
          "ה-snippet). הקטע מתעד את ME51N כפעילות בתפקיד ב-S/4HANA 2025 FPS01; לא נקרא גוף הדף המלא.",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Manage Purchase Requisition Professional (F2229), SAP Fiori Apps Reference Library, S/4HANA 2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2229')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        verificationLevel: "sap_official_verified",
        claim:
          "פלט fal-app.mjs F2229 --release S32OP: אפליקציה Transactional / SAP Fiori elements, רכיב " +
          "MM-FIO-PUR-REQ-PRF, תפקיד SAP_BR_PURCHASER (R0128), קטלוג עסקי SAP_PRC_BC_PURCHASER_PR, intent " +
          "PurchaseRequisition-maintain, OData MM_PUR_PR_PROFNL_MAINTAIN_SRV. בשדה GUI transactions: 'leading " +
          "ME51N; related ME52N, ME53N' (כלשונו). ללא predecessors/successors רשומים. הרשומה מקשרת את ME51N " +
          "לאפליקציית ה-Fiori כטרנזקציה המובילה, לא כטרנזקציה מוחלפת.",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#ME51N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME51N",
        claim:
          "רשומת המאגר מתעדת את ME51N כטרנזקציית Enjoy ליצירת דרישת רכש (טבלאות EBAN/EBKN), עם שדה s4: 'זמין " +
          "במלואו ב-S/4HANA; Fiori Create Purchase Requisition / Self-Service Procurement. ME51 הישן " +
          "deprecated' (כלשונו) ושדה fiori: 'Create Purchase Requisition - F1643 / Create Purchase Requisition " +
          "Advanced' (במקור מקף ארוך). שדה ה-fiori לא אומת מול מקור רשמי במסגרת מחקר זה: מספר האפליקציה שאותר " +
          "בפועל בחיפושי help.sap.com, בהשוואת Feature Comparison וב-Fiori Apps Library הוא F2229, לא F1643, כך " +
          "שאין כאן קביעה מי משני המספרים נכון.",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "ME51N ממשיכה להיות מתועדת כטרנזקציה בשימוש ב-SAP S/4HANA on-premise 2025 FPS01 (version 2025.001): " +
        "מופיעה כפעילות 'Create purchase requisition' בתפקיד העסקי Process Purchase Requisition (MM-PUR), " +
        "ומופיעה כעמודת השוואה מלאה מול אפליקציית ה-Fiori Manage Purchase Requisitions - Professional (F2229) " +
        "במסמך Feature Comparison, ללא סימון כמיושנת. שני פריטי 'S4TWL - MM-PUR WebDynpro Applications' (2023 " +
        "FPS03 §38.1, 2025 FPS01 §14.2.7) מזכירים אותה רק כיעד ההמשכיות עבור אפליקציית WebDynpro שהוסרה " +
        "(MMPUR_SPPR_MAIN_APPL), לא כטרנזקציה שעצמה מוחלפת.",
      edition: "on-premise",
      release: "2025.001",
      source: ME51N_FEATURE_COMPARISON_2025,
      recommendedAction:
        "להמשיך להשתמש ב-ME51N ליצירת דרישות רכש ידניות; לשקול בהדרגה מעבר לאפליקציית Fiori 'Manage Purchase " +
        "Requisitions - Professional' (F2229) בהתאם למפת הדרך של הלקוח.",
    },
    xrefs: ["tx:ME52N", "tx:ME53N", "tx:ME54N", "table:EBAN", "table:EBKN"],
    lastVerifiedAt: DATE24,
    notes:
      "נבדק: שאילתת sap-help-search.mjs 'ME51N Create Purchase Requisition' על SAP_S4HANA_ON-PREMISE (21 " +
      "תוצאות; הרלוונטיות מ-2025.001 ומ-2023.latest), קריאת גוף הדף 'Feature Comparison for Managing and " +
      "Creating Purchase Requisitions' דרך sap-help-body.mjs, רשומת החיפוש 'Process Purchase Requisition " +
      "(MM-PUR)' (snippet בלבד, הגוף לא נקרא), fal-app.mjs F2229 (S32OP = 2025 FPS01, leading ME51N), ועיון " +
      "בשני פריטי S4TWL 'MM-PUR WebDynpro Applications' (2023 FPS03 §38.1 עמ' 939-940, 2025 FPS01 §14.2.7 עמ' " +
      "1416-1417) מתוך scratchpad/official. שדה ה-fiori ברשומת tx-intel.ts (F1643) אינו זהה ל-F2229 שאותר " +
      "בפועל במקורות הרשמיים; ההבדל בין השניים לא נפתר כאן ונותר לבירור נפרד, ללא קביעה מי מהם נכון; F2229 " +
      "אינו עדיין ב-data/fiori/apps.ts ולכן אין xref ל-fiori:F2229, ויש לתעד אותו שם לפני קביעת xref רשמי " +
      "אליו. status source הוא ראיית ה-Feature Comparison. SAP Note 2267445 מודפס בשני הפריטים ומצוטט " +
      "בפרוזה בלבד: שדה sapNote מחייב לפי כלל sap-note-format קישור me.sap.com או repoRef. ביקורת אדברסרית " +
      "2026-09-24: הורדות הוחלו (source לסטטוס, שורת ראיה לדף התפקיד, תיקון טווח עמודים 2023, הסרת מקף " +
      "ארוך, צמצום ניסוח ראיה 2). הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג. לא בוצעה בדיקה במערכת " +
      "SAP חיה.",
  },
  {
    id: "tx:MIGO_GR",
    evidence: [
      MIGO_GR_GOODS_MOVEMENT_2025,
      {
        sourceType: "sap_help",
        sourceTitle:
          "Goods Movement (MM-IM) (deliverable Materials Management (MM), topic loio " +
          "3e07b753128eb44ce10000000a174cb4)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3e07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט (אותה גרסה 2025.001) מציג טבלת פעילויות: 'Goods Movement MIGO Goods Issue MIGO_GI Goods " +
          "Receipt from External Procurement MIGO_GR Goods Receipt for Order MIGO_GO Transfer Posting MB1B " +
          "Cancel Material Document MBST Store Material Document MBSU Output Processing for Material Documents " +
          "MB90'. הרשומה מציגה את MIGO_GR לצד MIGO ושאר הקודים המגבילים כפעילות מתועדת בגרסה הנוכחית, ולא " +
          "מזכירה אותה כמוחלפת או מוסרת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (Simplification List for SAP S/4HANA 2025 - Feature " +
          "Pack Stack 1, item 15.3.9; מקביל לפריט 27.6 ב-2023 FPS03, הבדלי עימוד בלבד)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "הפריט נוקב ברשימת קודי הטרנזקציה המוחלפים במלים: 'The following transactions for entering and " +
          "displaying goods movements (material documents) called \"MB transactions\" - below, have been " +
          "replaced by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and " +
          "BAPI_GOODSMVT_CANCEL: MB01, MB02, MB03, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, " +
          "MBSF, MBSL, MBST, MBSU and MBBM'; MIGO_GR אינו ברשימה הזו. השם 'MIGO_GR' מופיע בשדה 'Other Terms' " +
          "בתחתית הפריט ('MIGO_GR, MIGO_GI, MIGO_ST, BAPI_GOODSMVT_CANCEL, NSDM_MESSAGES499, NSDM_MESSAGES-499, " +
          "omcq; MMBE') בלבד, ללא קביעה לגבי מעמדו. הפריט אינו קובע ל-MIGO_GR מעמד של הוחלף, הוסר או " +
          "deprecated; הוא קוד המגביל את MIGO, שאליה הפריט מפנה כפתרון ('Use transaction MIGO or MMBE in " +
          "dialog').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Document Flow Consistency for Goods Receipt to Inbound Delivery (Simplification List for SAP " +
          "S/4HANA 2025 - Feature Pack Stack 1, items 15.3.6 ו-15.3.12; טקסט הבדיקה זהה לפריט 27.3 ב-2023 " +
          "FPS03, ששורת Application Component שלו מונה גם MM-IM-GR ו-LE-SHP-DL-LA)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "בתנאי הרלוונטיות של הבדיקה נכתב: 'Goods receipt postings or return delivery postings are done with " +
          "reference to inbound deliveries using transaction MIGO. Check table MSEG for entries with " +
          "VGART_MKPF = \"WE\", TCODE2_MKPF = MIGO_GR, VBELN_IM is not initial, and VBELP_IM is not initial'. " +
          "כלומר MIGO_GR משמש כאן כערך זיהוי (TCODE2_MKPF) של רשומות MSEG שנוצרו דרך קבלת סחורה ב-MIGO מול " +
          "תעודת משלוח נכנסת, לצורך בדיקת עקביות זרימת המסמכים (Document Flow Consistency) בהמרה ל-S/4HANA. " +
          "הפריט אינו קובע דבר על זמינות MIGO_GR עצמה; הוא בודק את איכות הנתונים בתנועות שכבר נרשמו דרכה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: data/tx-intel.ts#MIGO_GR",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מתארת את MIGO_GR כ'וריאנט של MIGO הממוקד בקליטת סחורה (Goods Receipt)' עם action 'Goods " +
          "Receipt' מוגדר מראש, ושדה s4 קובע: 'זמין ב-S/4HANA. Fiori 'Goods Receipt for Purchase Order' היא " +
          "החלופה.' (שדה fiori: 'Goods Receipt for Purchase Order'). שדה consultant מונה את המשפחה 'MIGO_GO (GI), " +
          "MIGO_TR (transfer), MIGO_GS', בעוד שתי רשומות החיפוש הרשמיות שלעיל מגדירות את MIGO_GO כ-'Goods Receipt " +
          "for Order' ואת MIGO_GI כ-'Goods Issue'; ייחוס GI ל-MIGO_GO במאגר אינו תואם את המקור הרשמי. שם " +
          "אפליקציית ה-Fiori שבמאגר לא נבדק מול מקור רשמי במחקר זה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MIGO_GR",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "MIGO_GR הוא קוד טרנזקציה המגביל את MIGO לקבלת סחורה מרכש חיצוני (Goods Receipt from External " +
        "Procurement), מתועד באותה צורה ב-ECC וב-S/4HANA On-Premise 2025 FPS01. פריט הפישוט S4TWL - " +
        "AVAILABILITY OF TRANSACTIONS IN MM-IM אינו כולל את MIGO_GR ברשימת קודי ה-MB המוחלפים, ומזכיר אותו רק " +
        "בשדה Other Terms; פריט S4TWL - Document Flow Consistency for Goods Receipt to Inbound Delivery מזכיר " +
        "אותו כערך שדה טכני (TCODE2_MKPF) בבדיקת עקביות נתונים, לא כקוד שמעמדו משתנה. אין אימות שהוא הוסר, " +
        "הוחלף או שונה במעבר ל-S/4HANA.",
      edition: "on-premise",
      release: "2025.001",
      source: MIGO_GR_GOODS_MOVEMENT_2025,
      recommendedAction:
        "להשאיר את MIGO_GR כקוד תקין של MIGO לתרחיש קבלת סחורה מרכש חיצוני; בבדיקות המרה ל-S/4HANA לבחון " +
        "רשומות MSEG עם TCODE2_MKPF = MIGO_GR מול תעודות משלוח נכנסות, כנדרש בפריט Document Flow Consistency, " +
        "ולוודא שדות VBELN_IM ו-VBELP_IM מלאים לפני קבלת הסחורה. פריט S4TWL - AVAILABILITY OF TRANSACTIONS IN " +
        "MM-IM מייחס את מנגנון הנעילה המשופר (S/4HANA OP1610 ומעלה) ל-MIGO ול-BAPI_GOODSMVT_CREATE ואינו נוקב " +
        "ב-MIGO_GR בהקשר זה; לתאם את ההנחיה עם רשומת tx:MIGO.",
    },
    xrefs: ["tx:MIGO", "tx:MB04", "table:MSEG", "table:MKPF"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (א) שתי רשומות sap_help נפרדות (deliverable Materials Management (MM), 2025 FPS01) מגדירות " +
      "MIGO_GR כ-'Goods Receipt from External Procurement', קוד המגביל את MIGO, מתועד לצד MIGO_GI/MIGO_GO; " +
      "אותו loio מוחזר גם תחת productId SAP_ERP (6.18.latest). (ב) שני פריטי הפישוט נקראו במלואם מטקסט " +
      "ה-PDF שחולץ (scratchpad/official/SIMPL_OP2025.pdf.txt ו-SIMPL_OP2023.pdf.txt): פריט 15.3.9 (2025) / " +
      "27.6 (2023), Availability of Transactions in MM-IM, אינו כולל MIGO_GR ברשימת הקודים המוחלפים, רק " +
      "ב-Other Terms; פריט 15.3.6/15.3.12 (2025) / 27.3 (2023), Document Flow Consistency, מזכיר MIGO_GR כערך " +
      "שדה בתנאי בדיקה טכני, לא כקביעה על מעמד הקוד. טקסט הבדיקה זהה בין 2023 ל-2025; שורת Application " +
      "Component שונה (2023 מונה גם MM-IM-GR ו-LE-SHP-DL-LA). שני פריטי 2025 (15.3.6 ו-15.3.12) זהים בתוכן " +
      "ומצוטטים כרשומה אחת. (ג) רשומת מאגר ייעודית קיימת: data/tx-intel.ts#MIGO_GR (מצוטטת כשורת ראיה; שדה " +
      "consultant שלה מייחס ל-MIGO_GO את GI, בניגוד לרשומות החיפוש הרשמיות); MIGO_GR מופיע גם כ-xref בתוך " +
      "tx:MIGO (data/verification/transactions.ts) וב-data/verification/enhancements.ts. היסטוריה: טיוטת " +
      "המחקר קבעה 'לא נמצאה רשומה ייעודית ל-MIGO_GR ב-data/**', קביעה שגויה שתוקנה בכתיבה (ישן → חדש). (ד) " +
      "לא בוצע fal-app.mjs: במקורות הרשמיים שנקראו לא הוצג יישום Fiori עצמאי כתחליף ל-MIGO_GR, וההנחיה " +
      "בפריט ('Use transaction MIGO or MMBE in dialog') מפנה ל-MIGO עצמה, שכבר מתועדת ברשומת tx:MIGO; שם " +
      "האפליקציה שבמאגר ('Goods Receipt for Purchase Order') לא נבדק מול Fiori Apps Library (למשל " +
      "fal-app.mjs --tcode MIGO_GR). ביקורת אדברסרית 2026-09-24: כל הכתובות " +
      "נפתחות, שתי רשומות החיפוש אומתו מחדש בשני ה-scopes, כל הציטוטים מה-PDF אומתו מול הטקסט שחולץ; תוקנו " +
      "כותרות המקור, ניסוח ה-'screen variant' והמלצה ללא מקור בנושא BDC. בכתיבה הוסרה המילה 'ופעילה' משורת " +
      "הראיה השנייה (הסניפט מתעד פעילות ואינו מעיד על מצב הקוד במערכת). הרשומה אינה נושאת שדה reviewer, " +
      "כמוסכמת הקטלוג. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "tx:MK01",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
          "Approach",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        verificationLevel: "sap_official_verified",
        claim:
          "הפריט (עמ' 153-155) קובע שב-SAP S/4HANA האובייקט המוביל היחיד לתחזוקת שותפים עסקיים, לקוחות וספקים " +
          "הוא Business Partner (טרנזקציה BP): 'the specific transactions like XD01, XD02, XD03 or VD01, VD02, " +
          "VD03/XK01, XK02, XK03 or MK01, MK02, MK03 etc. are not available in SAP S/4HANA on-premise'. בטבלת " +
          "הטרנזקציות שאינן זמינות, תחת הכותרת 'Transactions that get redirected to transaction BP' מופיעים " +
          "במפורש MK01, MK02, MK03.",
      },
      MK01_SIMPL2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Vendor Master Jurisdiction Code (MM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8999cee59b7c44fdb53fbbb4d703f8e6/896bd0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        verificationLevel: "conflicting_sources",
        claim:
          "דף תפעולי תחת אותו מוצר ומהדורה בדיוק (SAP_S4HANA_ON-PREMISE, versionId 2025.001) כותב במפורש: 'You " +
          "can also use transaction MK01 to create or MK02 to change' - בסתירה ישירה לפריט הפישוט. שני המקורות " +
          "רשמיים ונשמרים כסתירה; ההסבר הסביר הוא סחף תיעוד של דף תפעולי (אותו דפוס שתועד ל-tx:MB01 / tx:MBST " +
          "/ tx:MBRL בשרשרת זו), ופריט הפישוט S4TWL נשאר המקור הקובע לסטטוס. מה שיכריע: הפעלת MK01 במערכת SAP " +
          "S/4HANA On-Premise חיה ובדיקה האם היא מנותבת ל-BP.",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business " +
              "Partner Approach",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            verificationLevel: "sap_official_verified",
            claim:
              "'the specific transactions like ... or MK01, MK02, MK03, etc. are not available in SAP S/4HANA. " +
              "These will be redirected to transaction BP'.",
          },
        ],
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#MK01",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MK01",
        claim:
          "שדה s4 ברשומה הקיימת: 'חסומה ב-S/4HANA. הקמת קטע רכש של ספק מתבצעת דרך BP בתפקיד FLVN01 (Supplier)' " +
          "- עקבי עם קביעת פריטי הפישוט שנקראו כעת (המאגר כבר קלט את המסקנה הנכונה עוד לפני מחקר זה).",
      },
    ],
    status: {
      status: "replaced",
      he:
        "MK01 אינה זמינה ב-SAP S/4HANA, מהדורת On-Premise; קריאה לטרנזקציה מנותבת ישירות למסך Business " +
        "Partner (טרנזקציה BP). יצירת קטע הרכש (Purchasing View) של הספק מתבצעת ב-BP לאחר שה-Customer/Vendor " +
        "Integration (CVI) הופעל והושלם; פריט הפישוט נוקב רק בטרנזקציה BP, ותפקיד השותף העסקי Supplier " +
        "(FLVN01) מקורו ברשומת המאגר tx-intel.ts#MK01 בלבד.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MK01_SIMPL2025,
      recommendedAction:
        "יש להשתמש בטרנזקציה BP (תפקיד Supplier / FLVN01 לפי רשומת המאגר) במקום MK01 ליצירת קטע הרכש של ספק, " +
        "ולוודא שה-CVI (Customer/Vendor Integration) הופעל והושלם לפני המרה ל-S/4HANA.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:MK02", "tx:MK03"],
    lastVerifiedAt: DATE24,
    notes:
      "נבדק מבוסס על קובץ: פריט הפישוט S4TWL - Business Partner Approach בשתי המהדורות (2023 FPS03 פריט " +
      "3.19, 2025 FPS01 פריט 5.1.27), נקרא במלואו מ-scratchpad/official/SIMPL_OP2023.pdf.txt " +
      "ו-SIMPL_OP2025.pdf.txt; שתיהן נוקבות ב-MK01 בטבלת הטרנזקציות שאינן זמינות ומנותבות ל-BP. חיפוש " +
      "sap-help-search.mjs על 'Create Vendor Purchasing MK01' (--product SAP_S4HANA_ON-PREMISE) העלה דף " +
      "תפעולי (2025.001) שממשיך להנחות MK01/MK02 (המשפט מופיע גם ב-snippet וגם בגוף הדף שנקרא דרך " +
      "sap-help-body.mjs) - זהו סחף תיעוד ככל הנראה, לא הפרכה, ותועד כראיה נפרדת מסוג conflicting_sources. " +
      "לא בוצע חיפוש fal-app.mjs: אף מקור רשמי שנקרא לא נקב Fiori app ייעודי ל-MK01 או ל-BP-Purchasing-View, " +
      "רק את טרנזקציית BP עצמה - לכן אין successor מסוג fiori. לא בוצעה בדיקה במערכת SAP חיה. tx:XK01 " +
      "ו-tx:FK01 (הטרנזקציות המקבילות למשפחת FK/XK שנזכרות באותם פריטים) אין להן רשומת overlay קיימת ולא " +
      "נבנתה כזו כאן - מחוץ להיקף המשימה. ביקורת אדברסרית 2026-09-24: טווחי העמודים תוקנו (2023: 153-155, " +
      "2025: 136-138), הטענה על גישה לנתוני LFM1 דרך BP הוסרה (אין לה מקור), FLVN01 מיוחס לרשומת המאגר " +
      "בלבד, ושורת הסתירה מציינת מה יכריע. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MK02",
    evidence: [
      MK02_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
          "Approach (LO-MD-BP, Business Impact Note 2265093, p. 153-158)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "אותו פריט ברשימת 2023 FPS03 קובע: 'the specific transactions like XD01, XD02, XD03 or VD01, VD02, " +
          "VD03/XK01, XK02, XK03 or MK01, MK02, MK03 etc. are not available in SAP S/4HANA on-premise' ומפרט " +
          "בטבלה 'Transactions not available in SAP S/4HANA on-premise edition', 'Transactions that get " +
          "redirected to transaction BP: FD01,FD02,FD03, FK01,FK02,FK03,MAP1,MAP2,MAP3, MK01, MK02, MK03, ...'. " +
          "סעיף Symptom: המרה מ-on-premise editions 1511, 1610, 1709, 1809, 1909, 2020, 2021, 2022.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Vendor Master Jurisdiction Code (MM) | SAP ERP",
        url: "https://help.sap.com/docs/SAP_ERP/3318ebc75ddc4d2994ca75b5fe521f24/896bd0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "גוף העמוד (נקרא דרך שירות התוכן, sap-help-body.mjs, deliverable 23795521) מפרט תחת Procedure: 'From " +
          "the SAP Easy Access screen, choose Logistics > Materials Management > Purchasing > Master Data > " +
          "Vendor > Purchasing > Create/Change. You can also use transaction MK01 to create or MK02 to change. " +
          "To maintain the jurisdiction code, choose Address or Control Data.' הסניפט של רשומת החיפוש אינו " +
          "כולל את המשפט; הוא מאשר את MK02 כטרנזקציית שינוי ספק בצד הרכש ב-SAP ERP.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Vendor Master Jurisdiction Code (MM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8999cee59b7c44fdb53fbbb4d703f8e6/896bd0531d8b4208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        verificationLevel: "conflicting_sources",
        claim:
          "אותו עמוד תפעולי בתיעוד SAP S/4HANA On-Premise (versionId 2025.001, loio " +
          "896bd0531d8b4208e10000000a174cb4; מצוטט גם ברשומת tx:MK01) מדפיס ב-snippet של רשומת החיפוש " +
          "(sap-help-search.mjs 'Create Vendor Purchasing MK01' --product SAP_S4HANA_ON-PREMISE, 21 רשומות): " +
          "'You can also use transaction MK01 to create or MK02 to change' (כלשונו), בסתירה לפריט הפישוט הקובע " +
          "ש-MK02 אינה זמינה ב-S/4HANA ומנותבת ל-BP. שני המקורות רשמיים ונשמרים כסתירה; ההסבר הסביר הוא סחף " +
          "תיעוד של דף תפעולי (אותו דפוס שתועד ל-tx:MK01), ופריט הפישוט נשאר המקור הקובע לסטטוס. מה שיכריע: " +
          "הפעלת MK02 במערכת SAP S/4HANA On-Premise חיה ובדיקה האם היא מנותבת ל-BP.",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business " +
              "Partner Approach",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            verificationLevel: "sap_official_verified",
            claim:
              "'the specific transactions like ... or MK01, MK02, MK03, etc. are not available in SAP S/4HANA. " +
              "These will be redirected to transaction BP'.",
          },
        ],
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MK02 ו-tx-intel.ts#MK02",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tcode-catalog.ts מגדיר את MK02 כמודול MM, 'שינוי ספק (רכש)', en 'Change Vendor (Purchasing)'; " +
          "data/tx-intel.ts#MK02 קובע s4: 'חסומה ב-S/4HANA. עדכון נתוני רכש של ספק דרך BP.' (alternative: " +
          "XK02, BP). תיאור המאגר בלבד, אינו מקור רשמי, אך עקבי עם פריט הפישוט שלעיל.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MK02",
      },
    ],
    status: {
      status: "replaced",
      he:
        "MK02 (שינוי ספק, תצוגת רכש) אינה זמינה ב-SAP S/4HANA on-premise; פריט הפישוט הרשמי 'S4TWL - Business " +
        "Partner Approach' מונה את MK02 בפירוש הן ברשימת הטרנזקציות שאינן זמינות והן ברשימת הטרנזקציות " +
        "המנותבות מחדש לטרנזקציה BP (Business Partner). תחזוקת נתוני ספק עוברת לטרנזקציית BP.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MK02_SIMPL2025,
      recommendedAction:
        "לתחזק ספקים דרך טרנזקציית BP; לפני המרה ל-S/4HANA לוודא Customer/Vendor Integration (CVI) מלא, ולא " +
        "להסתמך על MK02 בפרוצדורות תפעוליות עתידיות.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:MK01", "tx:MK03"],
    lastVerifiedAt: DATE24,
    notes:
      "פריט הפישוט 'S4TWL - Business Partner Approach' (SAP Note 2265093, מודפס בפריט) נוקב ב-MK02 בשמה " +
      "המפורש בשתי גרסאות הרשימה (2023 FPS03 פריט 3.19, 2025 FPS01 פריט 5.1.27), הן ברשימת הטרנזקציות שאינן " +
      "זמינות והן ברשימת הטרנזקציות המנותבות ל-BP. הצד ECC נבדק בנפרד ואינו סותר: MK02 מתועדת שם כטרנזקציית " +
      "שינוי ספק; הסניפט של עמוד SAP ERP אינו מכיל את משפט MK02, המשפט נקרא מגוף העמוד דרך שירות התוכן. לא " +
      "בוצעה בדיקה במערכת SAP חיה לאימות התנהגות ה-redirect בפועל; לא אותרה Fiori app נפרדת עבור MK02 עצמה " +
      "מעבר ליעד BP. מספר ה-Note מצוטט בכותרות ובפרוזה בלבד ולא בשדה sapNote: כלל sap-note-format מחייב " +
      "קישור me.sap.com או repoRef. ביקורת אדברסרית 2026-09-24: הורדות הוחלו (source משותף לפריט 2025, " +
      "הסרת קווים מפרידים ארוכים, ציטוט גוף העמוד במקום 'סניפט', תיקון רשומת המאגר, הסרת שם אפליקציה ללא " +
      "מקור, טווח עמודים 153-158). בכתיבה נוספה שורת סתירה (conflicting_sources) לעמוד 'Maintaining Vendor " +
      "Master Jurisdiction Code (MM)' בתיעוד S/4HANA 2025.001, שה-snippet שלו מדפיס 'MK02 to change', כמו " +
      "ברשומת tx:MK01 באותה אצווה; לכן הרשומה מסומנת כסותרת עד לבדיקה במערכת חיה. הרשומה אינה נושאת שדה " +
      "reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MK03",
    evidence: [
      MK03_SIMPL2023,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
          "Approach (SAP Note 2265093)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "גרסת 2025 FPS01 של אותו פריט פישוט (Note Number 2265093, עמ' 136-137) חוזרת על אותה קביעה במדויק: " +
          "'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, " +
          "MK03, etc. are not available in SAP S/4HANA. These will be redirected to transaction BP', וברשימת " +
          "'Transactions not available in SAP S/4HANA on-premise edition · Transactions that get redirected to " +
          "transaction BP' מופיעה שוב 'MK01, MK02, MK03' (כלשונו). ברשימת 'Transactions that are obsolete' " +
          "(MK12, MK18, MK19 וכו') MK03 אינה נכללת, כלומר הפריט מבחין בין הקוד המנותב (MK03) לבין קודים " +
          "שהוגדרו obsolete ממש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: data/tx-intel.ts#MK03",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר הקיימת מתעדת את MK03 כטרנזקציית display (read-only) של קטע הרכש ברשומת אב ספק " +
          "(LFA1+LFM1, ללא LFB1), ומציינת בשדה s4: 'חסומה ב-S/4HANA. הצגת נתוני רכש של ספק דרך BP' " +
          "וב-alternative: 'BP'; עקבי עם הפריט הרשמי שקובע ניתוב לטרנזקציית BP.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MK03",
      },
    ],
    status: {
      status: "replaced",
      he:
        "פריט הפישוט S4TWL - Business Partner Approach (Note 2265093, זהה בשתי המהדורות שנבדקו) קובע ש-MK03 " +
        "אינה זמינה יותר כטרנזקציית SAP GUI ב-S/4HANA on-premise ומנותבת לטרנזקציית BP (Business Partner), שם " +
        "מתבצעת הצגת נתוני הרכש של הספק במסגרת ה-Business Partner Approach המחייב.",
      edition: "on-premise",
      release: "2023 FPS03",
      source: MK03_SIMPL2023,
      recommendedAction:
        "לתעד למשתמשים ש-MK03 אינה זמינה ב-S/4HANA on-premise ולהפנות לטרנזקציית BP (תפקיד ספק/Purchasing) " +
        "לצפייה בנתוני הרכש של הספק; לוודא שהמרת Customer/Vendor Integration (CVI) הושלמה לפני ההמרה, כנדרש " +
        "בפריט.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:MK01", "tx:MK02", "tx:XK03", "tx:FK03"],
    lastVerifiedAt: DATE24,
    notes:
      "שני פריטי הפישוט (2023 FPS03 §3.19, 2025 FPS01 §5.1.27, שניהם עם Note Number 2265093) קובעים במפורש " +
      "ש-MK03 מנותבת לטרנזקציית BP, שהיא ממשק המשתמש לתחזוקת שותפים עסקיים ב-S/4HANA; לא נמצאה אפליקציית " +
      "Fiori רשמית הנקובה עבור MK03 ספציפית (הפריט מדבר על ה-Business Partner Approach הכללי, לא על אפליקציית " +
      "Fiori אחת), ולכן לא נקבע successor מסוג fiori. חיפושי sap-help-search.mjs נוספים ('MK03 display vendor " +
      "purchasing', 'Business Partner Approach S4TWL', 'MK03 successor Fiori', בהיקף --product " +
      "SAP_S4HANA_ON-PREMISE ו-SAP_ERP) לא העלו רשומה רשמית נפרדת המוקדשת ל-MK03 עצמה מעבר לשני פריטי הפישוט " +
      "שצוטטו. חיפוש sap-help-search.mjs \"MK03\" (היקף ברירת המחדל SAP S/4HANA, --size 12) החזיר 21 תוצאות; " +
      "אחת מהן, הדף \"Transactions: JIT Outbound\" (SAP S/4HANA 2025.001), מדפיסה בטבלת הטרנזקציות \"Process " +
      "Vendor Master MK03\"; אין זו רשומה המוקדשת ל-MK03 ואין בה קביעה על זמינות המסך הקלאסי, ולכן אינה סותרת " +
      "את הניתוב ל-BP. לא הופעל fal-app.mjs מכיוון שאין מועמד Fiori ID רשמי לבדוק. data/tcode-catalog.ts " +
      "מוסיף רק תיאור קצר ('הצגת ספק (רכש)') ללא מידע נוסף על S/4. לא בוצעה בדיקה במערכת SAP חיה. הרשומה " +
      "אינה נושאת שדה reviewer, כמוסכמת הקטלוג; עברה סבב ביקורת אדברסרית ב-2026-09-24 (כתובות, ציטוטים מול " +
      "scratchpad/official, xrefs, רשומות המאגר).",
  },
  {
    id: "tx:ME42",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 and SAP S/4HANA Cloud Private Edition " +
          "2023 - Feature Pack Stack 3 (Document Version 1.35, 2025-02-25) · item 38.7 S4TWL - RFQ Simplified " +
          "Transaction (MM-PUR-RFQ), pp. 957-959",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        accessedAt: DATE24,
        claim:
          "פריט 38.7 'S4TWL - RFQ Simplified Transaction' (Application Components: MM-PUR-RFQ; Related Notes: " +
          "2332710 'S4TWL-RFQ Simplified Transaction', Business Impact). תחת Reason and Prerequisites: הקונספט " +
          "הקודם התבסס על RFQ עם שדה ספק חובה ועם הגבלה לספק אחד בכל RFQ, מגבלה שאינה מתאימה לתרחישי sourcing כגון " +
          "Sourcing with SAP Ariba Sourcing. תחת Solution: קונספט חדש מאפשר לשלוח RFQ שנוצר באפליקציית Fiori " +
          "לפלטפורמות sourcing חיצוניות בלי לנקוב בספק מדויק; ה-IDoc-ים REQOTE ו-QUOTES מוחלפים בהודעות cXML. הפריט " +
          "קובע: 'Following IDOCS and transactions related to RFQ are not considered as the target architecture. " +
          "This means that the functionality is currently available in SAP S/4HANA but it is not considered as " +
          "future technology and a functional equivalent is not available'. אחר כך: 'The following transactions are " +
          "deprecated in SAP S/4HANA' ואחריה טבלה של 14 קודים עם תיאור: ME41 Create, ME42 Change, ME43 Display, " +
          "ME44 Maintain Supplement, ME45 Release, ME47 Maintain, ME48 Display, ME49 Price Comparison List, ME4B, " +
          "ME4C, ME4L, ME4M, ME4N, ME4S (דוחות RFQs by Requirement Tracking Number / Material Group / Vendor / " +
          "Material / RFQ Number / per Collective Number); ME42 מופיעה בשורה 'Change'. תחת Business Process Related " +
          "Information הפריט מדפיס: 'If you want to use functionality related to sourcing of goods and services, " +
          "you can use the following apps: Manage RFQs (F2049), Monitor RFQ Items (F2425), Request for Quotation " +
          "Types (F4149), Manage Supplier Quotations (F1991), Compare Supplier Quotations (F2324)', ומוסיף: 'Before " +
          "you start to use Fiori apps mentioned above you need to close your open RFQs, that were created via old " +
          "transactions, and set them to status \"Completed\"'. תחת Required and Recommended Action(s) נקוב התפקיד " +
          "SAP_BR_PURCHASER (Purchaser) עבור Manage RFQs, Monitor RFQ Items, Manage Supplier Quotations ו-Compare " +
          "Supplier Quotations, והתפקיד SAP_BR_BUYER (Strategic Buyer) עבור Request for Quotation Types. הפריט אינו " +
          "ממפה טרנזקציה בודדת לאפליקציה בודדת ואינו קובע גרסת הסרה. עמודים: תחילת הפריט בעמ' 957, רשימת הטרנזקציות " +
          "והאפליקציות בעמ' 958, סוף רשימת התפקידים בעמ' 959.",
        verificationLevel: "sap_official_verified",
      },
      ME42_SIMPL2025,
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage RFQs (F2049) · SAP Fiori Apps Reference Library · S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2049')/S32OP",
        accessedAt: DATE24,
        claim:
          "פלט scripts/fal-app.mjs F2049 --release S32OP: 'Manage RFQs | Transactional / SAP Fiori elements | " +
          "Published | component MM-FIO-PUR-RFQ'; תפקיד SAP_BR_PURCHASER (R0128, Purchaser); business catalog " +
          "SAP_PRC_BC_PURCHASER_PIR 'Purchasing - Source Assignment'; technical catalog SAP_TC_PRC_COMMON; intent " +
          "RequestForQuotation-manage; OData MM_PUR_RFQ_MAINTAIN_SRV 0001 (S4CORE 109); 'GUI transactions: leading " +
          "ME41; related ME42, ME43'. רשימת ה-releases המודפסת כוללת גרסאות on-premise מ-S6OP=1610 ועד S32OP=2025 " +
          "FPS01 (וכן S36=2602, S37=2608); predecessors ו-successors: לא הודפסו ('-'); RIN notes כפי שהודפסו: " +
          "3493254 (Front-End Server), 3671888 (Back-End Server). הבהרה: scripts/fal-app.mjs --tcode ME42 --release " +
          "S32OP מחזיר 'leading app(s): none; GUI app entry: none', משום ש-ME42 היא טרנזקציה קשורה (related) של " +
          "F2049 ולא טרנזקציה מובילה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process RFQ (MM-PUR)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/c306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "סניפט תוצאת החיפוש (deliverable: Materials Management (MM), loio c306b753128eb44ce10000000a174cb4) " +
          "מדפיס: 'Technical name: SAP_MM_PUR_RFQ' ובטבלת הפעילויות: 'Create RFQ ME41 Change RFQ ME42 Display RFQ " +
          "ME43 Maintain RFQ supplement ME44 Release RFQ ME45'. כלומר תיעוד התפקיד במהדורת 2025 FPS01 ממשיך למנות " +
          "את ME42 כפעילות 'Change RFQ'. גוף העמוד לא נקרא; רק הסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process RFQ (MM-PUR)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/6cfdc7caaef746cd9c7543e32e7e87c0/c306b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio בהיקף SAP ERP (versionId 6.18.latest): הסניפט מדפיס את אותה שורת פעילויות 'Create RFQ ME41 " +
          "Change RFQ ME42 Display RFQ ME43 Maintain RFQ supplement ME44 Release RFQ ME45', כלומר בצד ECC ME42 היא " +
          "טרנזקציית MM-PUR לשינוי RFQ. גוף העמוד לא נקרא; רק הסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מודיעין הטרנזקציות של הפרויקט (tx-intel.ts), רשומת ME42",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "שדה descHe (כלשונו, המקף הארוך הוחלף בפסיק): 'שינוי בקשה להצעת מחיר (RFQ) קיימת, עדכון פריטים, ספקים, " +
          "deadline או כמויות לפני שליחה/השלמה.'; שדה descTech כלשונו: 'שינוי מסמך RFQ (category A) ב-EKKO/EKPO. " +
          "תיעוד שינויים. מסך קלאסי.'; שדה s4: 'זמין ב-S/4HANA; Ariba Sourcing חלופה אסטרטגית.', בלי אזכור פריט " +
          "הפישוט. נמדד ב-2026-09-24 דרך scripts/alias-loader.mjs (לא בדפדפן): txDetail('ME42') מחזיר " +
          "s4.disposition 'available', supersededBy ריק, risk 'low', trust 'partial', ו-txStatusMap()['ME42'] מחזיר " +
          "'unchanged'. שני פריטי הפישוט מונים את ME42 ברשימת 'deprecated in SAP S/4HANA'; זהו סחף מאגר, מחוץ לטווח " +
          "משימה זו.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#ME42",
      },
    ],
    status: {
      status: "restricted",
      edition: "on-premise",
      release: "2025 FPS01",
      source: ME42_SIMPL2025,
      he:
        "ME42 ('Change' ברשימת הפריט, שינוי RFQ קיים) נמנית בפריט הפישוט 'S4TWL - RFQ Simplified Transaction' " +
        "(פריט 38.7 ברשימת 2023 FPS03, פריט 14.4.1 ברשימת 2025 FPS01, אותו נוסח) ברשימת הטרנזקציות 'deprecated in " +
        "SAP S/4HANA', לצד ME41, ME43, ME44, ME45, ME47, ME48, ME49 ושישה דוחות ME4x נוספים; הפריט קובע " +
        "שהפונקציונליות זמינה כיום אך אינה ארכיטקטורת יעד. הפריט מפנה לאפליקציות Fiori לתהליכי sourcing, ובראשן " +
        "Manage RFQs (F2049), שרשומתה בספריית ה-Fiori מונה את ME42 כטרנזקציית GUI קשורה (leading: ME41). מזהה " +
        "F2049 אינו בקטלוג ה-Fiori של הפרויקט (data/fiori/apps.ts), ולכן לא ניתן לרשום אותו כ-successor בסכימה; " +
        "מסיבה זו, ומכיוון שהפריט עצמו קובע 'a functional equivalent is not available', הסטטוס נרשם כ'מוגבל' " +
        "(restricted) ולא כ'הוצאה משימוש' עם יורש. תיעוד התפקיד 'Process RFQ (MM-PUR)' במהדורת 2025 FPS01 עדיין " +
        "מונה את ME42 כפעילות 'Change RFQ'.",
      recommendedAction:
        "לא לבסס תהליכי sourcing חדשים על ME42 ב-S/4HANA On-Premise, משום שפריט הפישוט מסמן אותה כמחוץ " +
        "לארכיטקטורת היעד. לתהליכי sourcing חדשים לבחון את Manage RFQs (F2049) ואת האפליקציות הנוספות שהפריט " +
        "מונה: F2425, F1991 ו-F2324 בתפקיד SAP_BR_PURCHASER (כמו F2049), ו-Request for Quotation Types (F4149) " +
        "בתפקיד SAP_BR_BUYER; לפני המעבר לאפליקציות יש לסגור RFQ פתוחים שנוצרו בטרנזקציות הישנות ולהעבירם לסטטוס " +
        "Completed, כפי שהפריט דורש. את המשך השימוש ב-ME42 לתרחישי RFQ קלאסיים מומלץ לבחון מול SAP Note 2332710 " +
        "('S4TWL-RFQ Simplified Transaction'), שלא נקראה כאן (דורשת S-user). במערכת היעד לוודא ב-SE93 שהקוד קיים, " +
        "ולבדוק את שדה s4 ברשומת tx-intel.ts#ME42, שאינו משקף כרגע את פריט הפישוט.",
    },
    xrefs: ["tx:ME41", "tx:ME43", "tx:ME47", "tx:ME48", "tx:ME49"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) שני פריטי הפישוט (38.7 ברשימת 2023 FPS03, עמ' 957-959; 14.4.1 ברשימת 2025 FPS01, עמ' " +
      "1429-1431) מונים את ME42 בשורה 'Change' בטבלת 14 הטרנזקציות 'deprecated in SAP S/4HANA', באותו נוסח; " +
      "הטקסט נקרא מחילוצי pdftotext השמורים בפרויקט (scratchpad/official/SIMPL_OP2023.pdf.txt, " +
      "SIMPL_OP2025.pdf.txt), ושתי כתובות ה-PDF החזירו HTTP 200 ב-2026-09-24. (2) בשני הפריטים, תחת Business " +
      "Process Related Information, מודפסות האפליקציות Manage RFQs (F2049), Monitor RFQ Items (F2425), Request " +
      "for Quotation Types (F4149), Manage Supplier Quotations (F1991), Compare Supplier Quotations (F2324), " +
      "והדרישה לסגור RFQ פתוחים מהטרנזקציות הישנות לסטטוס Completed לפני המעבר. (3) עמוד 'Process RFQ (MM-PUR)' " +
      "(loio c306b753128eb44ce10000000a174cb4) נבדק כסניפט חיפוש בלבד בשני ההיקפים (S/4HANA 2025.001, SAP ERP " +
      "6.18.latest), ומדפיס 'Change RFQ ME42' בטבלת הפעילויות. (4) scripts/fal-app.mjs F2049 --release S32OP: " +
      "Manage RFQs, SAP_BR_PURCHASER (R0128), OData MM_PUR_RFQ_MAINTAIN_SRV 0001, 'GUI transactions: leading " +
      "ME41; related ME42, ME43'. (5) scripts/fal-app.mjs --tcode ME42 --release S32OP החזיר 'leading app(s): " +
      "none; GUI app entry: none'; הבדיקה מכסה רק אפליקציות שבהן ME42 מובילה. ME42 מודפסת ברשומת F2049 בספריית " +
      "ה-Fiori כטרנזקציית GUI קשורה (related), לצד ME43; הטרנזקציה המובילה היא ME41. (6) txDetail('ME42') נמדד " +
      "ב-2026-09-24 דרך scripts/alias-loader.mjs (לא בדפדפן): s4.disposition 'available', supersededBy ריק, " +
      "risk 'low', trust 'partial'; txStatusMap()['ME42'] = 'unchanged'. סחף מול פריט הפישוט, מתועד בראיית " +
      "repository ומחוץ לטווח המשימה. (7) fiori:F2049 אינה ב-data/fiori/apps.ts (0 הופעות), ולכן אינה ב-xrefs " +
      "ואינה successor. מה שלא אומת: (א) SAP Note 2332710 דורשת S-user ולא נקראה; מספרה מצוטט כפי שהודפס בפריט " +
      "ואינו נישא בשדה sapNote. (ב) לא בוצעה קריאת גוף מלא (sap-help-body.mjs) לעמוד help.sap.com; רק סניפטים. " +
      "(ג) ה-MCP ל-ABAP (sc4sap) לא היה זמין בסשן, ולכן אין בדיקת SE93. (ד) נמצאה אפליקציית Fiori שהפריט מונה " +
      "(Manage RFQs F2049) ושרשומתה מונה את ME42 כקשורה; לא נמצא מיפוי אחד-לאחד של ME42 לאפליקציה או ל-API " +
      "במקורות שנבדקו. לא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג; הטיוטה " +
      "נדחתה בשער הביקורת האדברסרית בסבב 2 (2026-09-24), תוקנה ועברה ביקורת חוזרת באותו יום, ושתי הורדות המבקר " +
      "(F4149 בתפקיד SAP_BR_BUYER ב-recommendedAction; 'לתהליכי sourcing' ב-status.he) כלולות ברשומה. הרשומה " +
      "מחליפה את הרשומה שנוצרה אוטומטית ל-ME42 ב-data/verification/transactions-auto.ts.",
  },
  {
    id: "tx:MK05",
    evidence: [
      MK05_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
          "Approach (SAP Note 2265093)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "אותו פריט ברשימת 2023 FPS03 (פריט 3.19, עמ' 153-155, Note 2265093 מודפס בפריט) מפרט רשימת הפניה " +
          "לטרנזקציית BP הכוללת FD01-FD03, FK01-FK03, MK01, MK02, MK03, VD01-VD03, XD01-XD03, XK01-XK03 ועוד, " +
          "ורשימת 'obsolete' נפרדת הכוללת FD06, FK06, MK06, MK12, MK18, MK19, VD06, XD06, V+21-V+23; MK05 אינה " +
          "נמנית באף אחת מהן. אין בכך קביעה שהקוד היה זמין ב-2023 FPS03: המסמך באותה גרסה פשוט אינו נוקב ב-MK05, " +
          "בניגוד לרשימת 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Configure Goods Receipt Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/1fd5fc0b81db4825a4d7681e8f6228c3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת חיפוש (sap-help-search.mjs 'MK05 block vendor purchasing', סקופ ברירת המחדל " +
          "SAP_S4HANA_ON-PREMISE, 21 רשומות) מתיעוד EWM ל-S/4HANA 2025 FPS01 (versionId 2025.001, loio " +
          "1fd5fc0b81db4825a4d7681e8f6228c3) מדפיסה בסניפט: 'Supplier Block (transaction MK05). … you can ignore a " +
          "vendor block or the system can display a warning or an information message for a blocked vendor or " +
          "product'. העמוד מציג את MK05 כנתיב גישה לחסימת ספק, בעוד פריט הפישוט מונה את MK05 ברשימת הטרנזקציות " +
          "המנותבות ל-BP; שני המקורות רשמיים ונשמרים כסתירה. ההסבר הסביר הוא סחף תיעוד (אותו דפוס שתועד ב-tx:MK01 " +
          "וב-tx:MK02), ופריט הפישוט נשאר המקור לסטטוס. מה שיכריע: SE93 או הפעלת MK05 במערכת S/4HANA On-Premise " +
          "חיה. גוף העמוד לא נקרא מעבר לסניפט.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
              "Approach",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            claim:
              "'Transactions that get redirected to transaction BP: ... MK01, MK02, MK03, MK05, MK06, XK01, XK02, XK03 " +
              "...'.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MK05",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת הקטלוג רושמת את MK05 כ-module 'MM', area 'ספק', שם עברי 'חסימת ספק (רכש)', שם אנגלי 'Block Vendor " +
          "(Purchasing)'; רשומת קטלוג בלבד (code/module/he/en/area), ללא שדות סטטוס S/4, טבלאות, BAPIs או תהליך. " +
          "לא נמצאה רשומה ייעודית ל-MK05 ב-tx-intel.ts או ב-tx-detail.ts; הקוד מופיע שם רק כהפניה בשדה whenNot של " +
          "רשומת MK02 (tx-intel.ts), כיעד לחסימה לרכש.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MK05",
      },
    ],
    status: {
      status: "replaced",
      he:
        "פריט הפישוט 'S4TWL - Business Partner Approach' ברשימת S/4HANA 2025 FPS01 מונה את MK05 בשמה ברשימת " +
        "הטרנזקציות שאינן זמינות ב-S/4HANA on-premise ומנותבות (redirected) לטרנזקציית BP; לפי הפריט, 'There is " +
        "no specific user interface for customer/vendor like known from SAP Business Suite'.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MK05_SIMPL2025,
      recommendedAction:
        "לתעד תהליכי חסימת ספק לרכש דרך טרנזקציית BP ולא דרך MK05 בסביבת S/4HANA On-Premise; לבדוק ב-SE93 במערכת " +
        "היעד את הניתוב בפועל, ולוודא ש-Customer Vendor Integration (CVI) הושלם, שכן לפי הפריט 'A system where " +
        "the CVI is not in place will be declined for the transition'.",
      successor: "tx:BP",
    },
    xrefs: ["tx:MK01", "tx:MK02", "tx:MK03", "tx:BP"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: פריט הפישוט 'S4TWL - Business Partner Approach' (רשימת 2025 FPS01, Document Version 1.36, " +
      "פריט 5.1.27) נוקב ב-MK05 בשמה ברשימת 'Transactions that get redirected to transaction BP', לצד MK01, " +
      "MK02, MK03, MK06 ועוד. בחיפושים שבוצעו זו הרשומה הרשמית היחידה שנמצאה הנוקבת ב-MK05 ביחס לגישת BP. " +
      "הפריט המקביל בגרסת 2023 FPS03 (פריט 3.19, SAP Note 2265093 מודפס בפריט) נבדק: MK05 אינה נמנית בו, לא " +
      "ברשימת ההפניה ולא ברשימת ה-obsolete; לכן הסטטוס וה-release נקבעו לפי 2025 FPS01 בלבד. מספר ה-Note מצוטט " +
      "בכותרת ובפרוזה בלבד ולא בשדה sapNote, לפי כלל sap-note-format. החיפוש 'MK05 block vendor purchasing' " +
      "(סקופ SAP_S4HANA_ON-PREMISE, 21 רשומות) העלה עמוד EWM ב-2025.001 שהסניפט שלו מדפיס 'Supplier Block " +
      "(transaction MK05)'; השורה נשמרת כ-conflicting_sources מול פריט הפישוט, כמו ברשומות tx:MK01 ו-tx:MK02, " +
      "עד בדיקה במערכת חיה. מה שלא אומת: (א) לא בוצעה בדיקה ב-SE93 במערכת יעד שהקוד מנותב ל-BP בפועל (MCP ABAP " +
      "לא זמין בסשן זה). (ב) לא נקרא גוף עמוד ה-EWM מעבר לסניפט. (ג) לא הורץ fal-app.mjs, מאחר שהיורש הוא " +
      "טרנזקציית BP ולא אפליקציית Fiori, ולא נמצא מקור רשמי הנוקב באפליקציית Fiori כיורשת של MK05. (ד) לא " +
      "בוצעה בדיקה במערכת SAP חיה. (ה) ליד שלא נקרא לעניין MK05: הנושא 'Re-direction to Business Partner (BP) " +
      "Transaction' (What's New in SAP S/4HANA 2022, versionId 2022.000, loio " +
      "220bd05aa56c49318c4fae0173cc10d4); גופו נקרא ברשומת tx:MK06 לעניין MK06, ומה שהוא קובע לגבי MK05 לא " +
      "נבדק. הוא עשוי להכריע את מעמד MK05 במהדורות שלפני 2025. רשומה מחקרית זו מחליפה את הרשומה שנוצרה " +
      "אוטומטית ל-tx:MK05 ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, 'מה שהפריטים קובעים לגבי הקוד טרם " +
      "נקרא'; חדש: replaced לפי פריט 5.1.27). ביקורת אדברסרית 2026-09-24: status.source הופנה לשורת 2025 " +
      "FPS01, שדה sapNote הוסר, קווים מפרידים ארוכים הוסרו, טענת אי-קיום ב-status.he הוחלפה בציטוט, שורת EWM " +
      "סומנה כסותרת. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MK06",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Re-direction to Business Partner (BP) Transaction | What's New in SAP S/4HANA 2022",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/220bd05aa56c49318c4fae0173cc10d4.html?locale=en-US&state=PRODUCTION&version=2022.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        accessedAt: DATE24,
        claim:
          "גוף הנושא נקרא במלואו דרך sap-help-body.mjs (loio 220bd05aa56c49318c4fae0173cc10d4, deliverable 'What's " +
          "New in SAP S/4HANA 2022', Application Component LO-MD-BP, Type 'Function Changed', 'Valid as Of SAP " +
          "S/4HANA 2022'). הטקסט קובע כלשונו: 'Hence, the classical transaction codes XD06, XK06, MK06, FK06, " +
          "FD06, VD06 are now deprecated. When you access or execute these transaction codes, you will be " +
          "redirected to the Business Partner screen for maintenance (BP T-code).' הטבלה המצורפת מגדירה את MK06 " +
          "כלשונה: 'MK06 Mark vendor for deletion (purchasing org level)'. כלומר הקוד הקלאסי MK06 מוגדר deprecated " +
          "ומנותב למסך טרנזקציית BP, בתוקף החל מגרסת S/4HANA 2022.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
          "Approach (SAP Note 2265093)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "הפריט (מתחיל בעמ' 153, הטבלה בעמ' 155, Document Version 1.35) מפרט בטבלת 'Transactions not available in " +
          "SAP S/4HANA on-premise edition' שתי רשימות: 'Transactions that get redirected to transaction BP' (רשימה " +
          "שאינה כוללת את MK06) ולידה 'Transactions that are obsolete: FD06, FK06, MK06, MK12, MK18, MK19, VD06, " +
          "XD06, V+21, V+22, V+23' (כלשונה, כולל MK06). סיווג זה ('obsolete', ללא ניתוב ל-BP) סותר את מסמך What's " +
          "New 2022 ואת רשימת 2025 FPS01, שבהם MK06 מנותבת ל-BP. מה שיכריע: הפעלת MK06 או בדיקת SE93 במערכת " +
          "S/4HANA 2023 On-Premise.",
        verificationLevel: "conflicting_sources",
      },
      MK06_SIMPL2025,
      {
        sourceType: "repository",
        sourceTitle: "קטלוג הטרנזקציות של הפרויקט (tcode-catalog.ts), רשומת MK06",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "הרשומה (module MM, area 'ספק') מתעדת את MK06 עם שם עברי 'סימון ספק למחיקה (רכש)' ושם אנגלי 'Mark Vendor " +
          "for Deletion (Purchasing)'. אין ברשומה שדה status, fiori או successor; לא נמצאה רשומה מקבילה " +
          "ב-data/tx-intel.ts או ב-components/neo-shell/data/tx-detail.ts עבור MK06.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MK06",
      },
    ],
    status: {
      status: "replaced",
      he:
        "MK06 (סימון ספק למחיקה ברמת ארגון רכש) מופיעה ברשימת הפישוט הרשמית של S/4HANA 2025 FPS01 (S4TWL - " +
        "Business Partner Approach) בין הטרנזקציות המנותבות לטרנזקציית BP, וכך גם במסמך What's New של SAP " +
        "S/4HANA 2022 ('Re-direction to Business Partner (BP) Transaction'), שמגדיר אותה deprecated. רשימת 2023 " +
        "FPS03 מסווגת אותה 'obsolete', והפער בין המהדורות נרשם כסתירה; היורש הנקוב במקורות שנקראו הוא טרנזקציית " +
        "BP.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MK06_SIMPL2025,
      recommendedAction:
        "לא לתחזק תהליכי סימון ספק למחיקה חדשים דרך MK06 ב-S/4HANA On-Premise: הגישה לקוד מנותבת למסך BP. לבצע " +
        "את הפעולה בטרנזקציית BP. לא נמצא מקור רשמי הנוקב באפליקציית Fiori בודדת עבור MK06, ולכן אין לרשום " +
        "successor מסוג fiori עד שיימצא מקור כזה.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:MK01", "tx:MK02", "tx:MK03", "tx:MK05"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) גוף מסמך What's New in SAP S/4HANA 2022 ('Re-direction to Business Partner (BP) " +
      "Transaction', loio 220bd05aa56c49318c4fae0173cc10d4) נקרא במלואו דרך sap-help-body.mjs ומגדיר את MK06 " +
      "בשמה כטרנזקציה deprecated המנותבת ל-BP, בתוקף מ-S/4HANA 2022. (2) שני פריטי הפישוט הרשמיים (3.19 ברשימת " +
      "2023 FPS03, 5.1.27 ברשימת 2025 FPS01, שניהם נקראו מחילוץ הטקסט המלא ב-scratchpad/official/) נוקבים " +
      "ב-MK06 כלשונה, עם סיווג שונה בין המהדורות (obsolete במהדורת 2023 FPS03, redirected to BP במהדורת 2025 " +
      "FPS01 ובמסמך What's New 2022), שנרשם כסתירה (conflicting_sources); מה שיכריע: הפעלת MK06 או SE93 במערכת " +
      "S/4HANA 2023. (3) רשומת קטלוג הטרנזקציות של הפרויקט (data/tcode-catalog.ts) אומתה כמקור לשם העברי " +
      "והאנגלי ולתחום (ספק, MM). מה שלא אומת: (א) לא בוצעה בדיקה חיה ב-SE93 או ב-BP שהקוד אכן מנותב במערכת יעד " +
      "קונקרטית (MCP ה-ABAP לא זמין בסשן זה). (ב) לא נמצאה רשומה קיימת ב-data/tx-intel.ts או " +
      "ב-components/neo-shell/data/tx-detail.ts עבור MK06 לצורך הצלבה נוספת. (ג) לא נמצאה אפליקציית Fiori " +
      "חלופית ספציפית: אף מקור רשמי שנקרא אינו נוקב באפליקציה כזו עבור MK06, ולכן לא נוסף successor מסוג fiori " +
      "ו-fal-app.mjs לא הופעל בהיעדר מזהה יעד. (ד) העמדה ב-ECC נלמדת מהניסוח 'classical transaction codes' " +
      "במסמך What's New ומרשומת הקטלוג; חיפושי sap-help-search.mjs עם --product SAP_ERP (שתי שאילתות: 'MK06 " +
      "vendor deletion', 'MK06 mark vendor deletion purchasing') לא החזירו כותרת או סניפט ECC ייעודיים הנוקבים " +
      "ב-MK06. ביקורת אדברסרית 2026-09-24: שורת 2023 סומנה כסתירה, מקור הסטטוס הועבר לרשימת 2025 FPS01, הוסרו " +
      "מההמלצה אפליקציית Fiori והרשאות ללא מקור, טווחי העמודים תוקנו. לא בוצעה בדיקה במערכת SAP חיה. הרשומה " +
      "אינה נושאת שדה reviewer, כמוסכמת הקטלוג. רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:MK06 " +
      "ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, verification_required; חדש: replaced, יורש tx:BP).",
  },
  {
    id: "tx:MM17",
    evidence: [
      MM17_SIMPL2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Maintenance of Material Master Data",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/bd9b645296991257e10000000a445394.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'MM17 mass maintenance material', תחום SAP_S4HANA_ON-PREMISE, " +
          "deliverable Logistics General (LO), versionId 2025.001) מציגה את הסניפט: 'The mass maintenance tool " +
          "(transaction MM17) enables you to change a large group of master data records at once. You can select " +
          "the mass maintenance tool within a number of master data transactions.' כלומר MM17 מתועדת בתיעוד " +
          "S/4HANA On-Premise 2025 FPS01 ככלי התחזוקה ההמונית לרשומות אב. גוף העמוד לא נקרא, והסניפט אינו אומר דבר " +
          "על זמינות בפועל במערכת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Display and Change Master Data",
        url: "https://help.sap.com/docs/SAP_ERP/83ae2fb47d3f45099dc6d121b0a7706c/3acfcc5340487214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'mass maintenance material master MM17', --product SAP_ERP, " +
          "deliverable Defense Forces & Public Security, versionId 6.18.latest) מציגה את הסניפט: 'Mass Change to " +
          "Material Master Data In the transaction for making mass changes to material master data (transaction " +
          "code MM17), four DFPS-specific fields are available in table MARA'. כלומר בצד ה-ECC, MM17 מתועדת " +
          "כטרנזקציה לשינוי המוני של אב החומר. גוף העמוד לא נקרא, והסניפט אינו אומר דבר מעבר לכך.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "מדריך הטרנזקציות של הפרויקט (TCODE_DIRECTORY), רשומת MM17",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר (module MM) מגדירה את MM17 כ-'שינוי המוני אב חומר' (Mass maintenance material.) עם מילות " +
          "המפתח mass, שינוי המוני, MASS. הרשומה אינה מפנה לפריט הפישוט או לתרחיש MPN.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-directory.ts#MM17",
      },
    ],
    status: {
      status: "restricted",
      he:
        "פריט הפישוט 'S4TWL - Manufacturer Part Number' ברשימת 2025 FPS01 קובע ש-MM17 ו-MMCC 'not available for " +
        "MPN materials in SAP S/4HANA', ולכן הסטטוס restricted: ההגבלה המתועדת חלה על חומרי MPN. הפריט אינו אומר " +
        "דבר, לכאן או לכאן, על חומרים שאינם MPN; עמוד 'Mass Maintenance of Material Master Data' בתיעוד 2025 " +
        "FPS01 מתאר את MM17 ככלי התחזוקה ההמונית לרשומות אב.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MM17_SIMPL2025,
      recommendedAction:
        "לפני ההמרה לבדוק אם הגדרת ה-Customizing 'Activate Inventory-Managed MPN' מופעלת ואילו חומרים מנוהלים " +
        "כ-MPN, ולתכנן עבורם דרך עבודה אחרת לשינוי המוני, שכן הפריט קובע ש-MM17 אינה זמינה עבורם ב-S/4HANA. " +
        "לעיין ב-SAP Notes 2348023, 2334012, 2334008, 2270836 ו-2360860 שהפריט מפנה אליהם. לוודא ב-SE93 במערכת " +
        "היעד שהקוד קיים ומורשה.",
    },
    xrefs: ["tx:MM01", "tx:MM02", "table:MARA"],
    lastVerifiedAt: DATE24,
    notes:
      "מה נבדק: (1) פריט הפישוט 'S4TWL - Manufacturer Part Number' (13.1.3 ברשימת 2025 FPS01; אותו משפט בפריט " +
      "48.5 ברשימת 2023 FPS03) נקרא בטקסט המחולץ של ה-PDF. (2) חיפוש sap-help-search.mjs 'MM17 mass " +
      "maintenance material' בתחום SAP_S4HANA_ON-PREMISE: 21 תוצאות, ביניהן 'Mass Maintenance of Material " +
      "Master Data' (2025.001). (3) חיפוש 'mass maintenance material master MM17' עם --product SAP_ERP: 21 " +
      "תוצאות, ביניהן 'Display and Change Master Data' (DFPS, 6.18.latest). לא נקרא גוף עמוד דרך " +
      "sap-help-body.mjs; הטענות מוגבלות לכותרות ולסניפטים. fal-app.mjs לא הורץ: הפריט אינו נוקב באפליקציית " +
      "Fiori או ביורשת, ולכן לא נרשם successor. תיקון לאחר ביקורת: הטיוטה הקודמת הציגה URL של עמוד PP/DS " +
      "('Mass Maintenance of Master Data Objects') כאילו הוא עמוד רשימת הפישוט, ייחסה לפריט 13.1.3 מספר SAP " +
      "Note שהפריט אינו מדפיס (הוא מודפס בפריטים 13.1.1 ו-13.1.2), וייחסה את סניפט ה-DFPS לעמוד 'Changing " +
      "Material PP-SATST01'; שלושתם תוקנו, ומקור הסטטוס הוחלף ל-PDF של רשימת הפישוט 2025 FPS01. מה לא נבדק: " +
      "SE93 במערכת יעד (MCP ABAP לא זמין), SAP Notes שהפריט מפנה אליהם (דורשים S-user), ואילו חומרים אצל הלקוח " +
      "מנוהלים כ-MPN. לא בוצעה בדיקה במערכת SAP חיה. ביקורת אדברסרית חוזרת (2026-09-24) אישרה את הרשומה " +
      "המתוקנת ללא הורדות. רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:MM17 ב-transactions-auto.ts " +
      "(ישן: ללא הכרעת מעמד, verification_required; חדש: restricted לפי פריט הפישוט). הרשומה אינה נושאת שדה " +
      "reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MMBE",
    evidence: [
      MMBE_SIMPL2025,
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library: MMBE, Display Stock Overview (SAP GUI), S/4HANA 2025 FPS01 On-Premise (S32OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MMBE')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "רשומת ה-Fiori Apps Library למזהה MMBE (fal-app.mjs MMBE --release S32OP) מציגה רישום Launchpad מפורסם " +
          "(Published) מסוג SAP GUI, רכיב LO-MD-MM, תפקידים SAP_BR_INVENTORY_MANAGER, SAP_BR_MATL_PLNR_EXT_PROC, " +
          "SAP_BR_PRODN_PLNR ו-SAP_BR_WAREHOUSE_CLERK, קטלוגים עסקיים SAP_MM_BC_IM_MANAGE " +
          "ו-SAP_MM_BC_IM_MAT_STOCK_DSP, קטלוג טכני SAP_TC_PRC_IM_BE_APPS:S4PRC, intent " +
          "Material-displayStockOverviewInWebGUI, GUI transactions 'leading MMBE', ללא predecessor או successor. " +
          "רשימת ה-releases מתחילה ב-S6OP (1610) ומגיעה עד S32OP (2025 FPS01).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Stock Overview: Company Code/Plant/Storage Location/Batch (MMBE)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/b8fbc492055a4801b92456ff68a6d971.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "סניפט רשומת החיפוש (sap-help-search.mjs, SAP_S4HANA_ON-PREMISE, deliverable Retail, תאריך 2026-02-24): " +
          "'The stock overview gives you an overview of the stocks of the material across all organizational " +
          "levels along with the segmentation ... Execute transaction MMBE. ... On the Stock Overview: Company " +
          "Code/Plant/Storage Location/Batch screen, enter the material.' הנושא מתעד את הרצת MMBE בגרסה זו; הסניפט " +
          "אינו מציג אותה כמוחלפת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Stock Overview: Company Code/Plant/Storage Location/Batch (MMBE)",
        url: "https://help.sap.com/docs/SAP_ERP/f48e74ad3b3740bc8c9eaade394a3c1e/b8fbc492055a4801b92456ff68a6d971.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "אותו loio (b8fbc492055a4801b92456ff68a6d971), אותה כותרת ואותו סניפט מופיעים תחת SAP_ERP, deliverable " +
          "Fashion Management, 6.0 EHP8 Latest (תאריך 2026-06-12): 'Execute transaction MMBE'. זה מתעד את MMBE בצד " +
          "ה-ECC; זהות הסניפטים אינה הצהרה של SAP על זהות תפקודית.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "MMBE (סקירת מלאי) מתועדת ב-SAP ERP 6.0 EHP8 וב-S/4HANA On-Premise 2025 FPS01, ומפורסמת ב-Fiori Apps " +
        "Library כרישום Launchpad מסוג SAP GUI מ-1610 ועד 2025 FPS01 ללא predecessor או successor. פריט הפישוט " +
        "'S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM' קובע ש-MMBE_OLD הוחלפה ב-MMBE ומנחה 'Use transaction " +
        "MIGO or MMBE in dialog'; MMBE אינה ברשימת טרנזקציות ה-MB שהוחלפו.",
      edition: "on-premise",
      release: "2025.001",
      source: MMBE_SIMPL2025,
      recommendedAction:
        "להמשיך להשתמש ב-MMBE לבדיקת חתך מלאי רגעי לפי רמות ארגון וסוגי מלאי; לזמינות עתידית להפנות ל-MD04 או " +
        "CO09, ולמלאי מחסן להפנות ל-MB52. לא לבלבל בין MMBE ל-MMBE_OLD המוחלפת. לבדוק במערכת היעד את שיוך " +
        "הקטלוגים SAP_MM_BC_IM_MANAGE או SAP_MM_BC_IM_MAT_STOCK_DSP למשתמשים לפני קביעת נתיב גישה דרך Launchpad. " +
        "במערכות IS-OIL עם הרחבת UoM Group יש לבדוק את תצוגת MMBE ליחידות מידה שנוספו לקבוצה, לפי הפריט 'S4TWL - " +
        "Unit of Measure (UoM) Group enahncement'.",
    },
    xrefs: ["tx:MB52", "tx:MD04", "tx:CO09"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: (1) הפריט 'S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM' נקרא במלואו משני קובצי ה-PDF שחולצו " +
      "(SIMPL_OP2023 פריט 27.6, SIMPL_OP2025 פריט 15.3.9), והנוסח זהה בשניהם. הפריט מבחין בין רשימת טרנזקציות " +
      "ה-MB שהוחלפו ב-MIGO לבין המשפט הנפרד על MMBE_OLD מול MMBE. (2) הרצנו את fal-app.mjs MMBE ואת " +
      "fal-app.mjs --tcode MMBE על release S32OP: רישום Launchpad יחיד ללא predecessor או successor, מ-1610 " +
      "ועד 2025 FPS01. (3) שני חיפושים ב-sap-help-search.mjs: 'Stock Overview MMBE' ללא --product (21 תוצאות) " +
      "ו-'MMBE stock overview' עם --product SAP_ERP (21 תוצאות). נבחר נושא שחוזר עם אותו loio בשני המוצרים " +
      "(deliverable Retail ב-S/4 ו-Fashion Management ב-ECC); רק הסניפט נקרא. (4) פריטי הרמז: 'S4TWL - Data " +
      "Model in Oil & Gas Inventory management' (56.9 ברשימת 2023, 13.13.33 ברשימת 2025) אינו מזכיר את MMBE. " +
      "לעומת זאת, 'S4TWL - Unit of Measure (UoM) Group enahncement' (IS-OIL-DS-HPM, 13.13.4 ברשימת 2025, 56.21 " +
      "ברשימת 2023) מזכיר את MMBE בתצוגת מלאי ליחידת מידה שנוספה לקבוצה, למשל 'stock in MBL will be shown as 0 " +
      "in MMBE for newly added UoM (i.e. MBL)'. הפריט הזה ספציפי לענף IS-OIL ולכן לא שימש מקור לסטטוס הכללי. " +
      "מה שלא אומת: (א) לא נבדק ב-SE93 במערכת יעד שהקוד קיים ומורשה, כי ה-MCP ל-ABAP לא היה זמין. (ב) שדה " +
      "fiori ברשומת המאגר data/tx-intel.ts#MMBE ('Stock - Single Material, F1077'; במקור מופרד במקף ארוך) נבדק " +
      "מול fal-app.mjs F1077: F1077 הוא 'Material Documents Overview' המוביל את MB51, לא את MMBE. אי-ההתאמה " +
      "מחוץ להיקף משימה זו ומתועדת כאן בלבד. (ג) האפליקציה 'Stock - Single Material' מופיעה ברשומת החיפוש " +
      "'Material inventory balance' (Data Migration, 2025.001) כ-'Stock - Single Material (F1076)', ובעמוד " +
      "ברזיל 'Moving Goods Out of the Issuing Plant' (2025.001) לצד MMBE ('... app ... or the Stock Overview " +
      "(MMBE) transaction'). fal-app.mjs לא הורץ עבור F1076, והמזהה אינו ב-data/fiori/apps.ts, ולכן הוא אינו " +
      "xref ואינו successor. לא בוצעה בדיקה במערכת SAP חיה. רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית " +
      "ל-tx:MMBE ב-transactions-auto.ts; לפני כתיבתה הציג report-coverage.mjs --ids סטטוס נגזר 'unchanged' " +
      "ברמת repository_verified, וכעת הסטטוס unchanged נשען על פריט הפישוט. הרשומה אינה נושאת שדה reviewer, " +
      "כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MMBE_OLD",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#MMBE_OLD",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר ממקמת את MMBE_OLD במודול MM, תחת האזור 'ניהול מלאי / נתוני אב (Material Master)'. שאר שדות " +
          "הרשומה (תיאור עסקי, תהליך, טבלאות, BAPI) מתארים בפועל את MM02 ואינם רלוונטיים ל-MMBE_OLD; אינם משמשים " +
          "כאן כראיה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#MMBE_OLD",
      },
      MMBE_OLD_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3, item 27.6 S4TWL - AVAILABILITY OF " +
          "TRANSACTIONS IN MM-IM (MM-IM-GF)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "פריט 27.6 (Document Version 1.35, עמ' 644-645) נושא את אותו טקסט: 'The transaction MMBE_OLD has been " +
          "replaced by transaction MMBE. Alternatively there is also the Fiori App Stock Overview', עם אותה קביעה " +
          "לגבי קבוצת הטרנזקציות המנויות: הקודים קיימים אך קריאתם מהתפריט מעלה הודעת שגיאה, והם ייצאו משימוש בעתיד " +
          "הקרוב. אותה הנחיה בסעיף Solution: 'Use transaction MIGO or MMBE in dialog.' שתי מהדורות הרשימה עקביות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "List Displays (MM-IM) | Materials Management (MM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3507b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הסניפט של רשומת החיפוש לתיעוד MM-IM ב-S/4HANA On-Premise 2025 FPS01 מציג את השורה 'Activity Transaction " +
          "Code Stock Overview MMBE List of Material Documents MB51', כלומר MMBE מתועדת תחת הפעילות 'Stock " +
          "Overview'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "replaced",
      he:
        "פריט הפישוט S4TWL - Availability of Transactions in MM-IM (SAP Note 2210569) קובע ש-MMBE_OLD הוחלפה " +
        "בטרנזקציה MMBE, ומציין את אפליקציית ה-Fiori 'Stock Overview' כחלופה נוספת (מזהה אפליקציה לא צוין במקור " +
        "ולא אותר ב-fal-app.mjs). לגבי קבוצת הטרנזקציות המנויות בפריט, הקודים עדיין קיימים אך קריאתם מהתפריט " +
        "מעלה הודעת שגיאה, ו-SAP מודיעה שייצאו משימוש בעתיד הקרוב ללא תאריך יעד.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MMBE_OLD_SIMPL2025,
      recommendedAction:
        "לעבור לטרנזקציה MMBE לתצוגת מלאי בדיאלוג, או לאפליקציית ה-Fiori 'Stock Overview' שהפריט מציין (לא נמצא " +
        "לה App ID דרך fal-app.mjs; יש לאתר אותה בקטלוג המערכת בפועל לפני מיפוי סופי). לא להשאיר קוד לקוח שקורא " +
        "ל-MMBE_OLD, שכן הפריט קובע שהקודים המנויים בו לא ישמשו בקוד לקוח ושקריאתם מהתפריט מעלה הודעת שגיאה.",
      successor: "tx:MMBE",
    },
    xrefs: ["tx:MMBE"],
    lastVerifiedAt: DATE24,
    notes:
      "נבדק מול קובצי רשימת הפישוט המקומיים (SIMPL_OP2025.pdf.txt, SIMPL_OP2023.pdf.txt): שתי המהדורות נושאות " +
      "את אותו משפט לגבי MMBE_OLD. מקור הסטטוס: שורת הראיה של פריט 15.3.9 ברשימת 2025 FPS01. אפליקציית ה-Fiori " +
      "'Stock Overview' המוזכרת בפריט אינה מזוהה במזהה אפליקציה (fal-app.mjs --tcode MMBE_OLD: none; --tcode " +
      "MMBE: רק ערך SAP GUI 'MMBE Display Stock Overview', 0 successors), ולכן לא נרשם xref ל-fiori:. מספר " +
      "ה-SAP Note 2210569 מופיע בפריט עצמו ונשמר בטקסט בלבד, ללא שדה sapNote (אין url של me.sap.com). רשומת " +
      "המאגר tx-intel.ts#MMBE_OLD פגומה מבחינת התוכן העסקי (מתארת את MM02) ושימשה רק לשדות module/area. לא " +
      "בוצעה בדיקה במערכת SAP חיה. רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:MMBE_OLD " +
      "ב-transactions-auto.ts (ישן: report-coverage.mjs --ids הציג לפני כתיבתה סטטוס נגזר 'unchanged' ברמת " +
      "repository_verified; חדש: replaced, יורש tx:MMBE, לפי פריט הפישוט). הרשומה אינה נושאת שדה reviewer, " +
      "כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MMPV",
    evidence: [
      MMPV_FAL_S32OP,
      {
        sourceType: "sap_help",
        sourceTitle: "Close Period for Product Master | Product Master (SAP S/4HANA 2025 FPS01)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/bc6b9325fedd4344a84412b2195064fa/18d9464a79084a51a9c5d54fc31f3672.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'MMPV Close Periods material ledger') מציגה את הסניפט: 'Close Period " +
          "for Material Master Records When the system is in operation, you normally run the period closing " +
          "program RMMMPERI using the transaction MMPV once a month at the beginning of a new period ... Close " +
          "Period for Product Master You can use one of the following apss to close a period: Close Period for " +
          "Product Master (Fiori app) Close Period for Material Master Records (Classic SAP GUI'. התיעוד של 2025 " +
          "FPS01 מתאר הרצת RMMMPERI באמצעות MMPV, ומונה את Close Period for Material Master Records (Classic SAP " +
          "GUI) לצד אפליקציית Fiori בשם Close Period for Product Master. גוף העמוד לא נקרא, רק הסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 6.5.10 S4TWL - Technical Changes " +
          "in Material Ledger with Actual Costing (SAP Note 2354768)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "פריט 6.5.10 (רכיב יישום CO-PC-ACT; Business Impact note 2354768) עוסק בשינוי מודל הנתונים של Material " +
          "Ledger עם Actual Costing: טבלאות MLDOC/MLDOCCCS מחליפות בין היתר את CKMLPP, CKMLCR ו-MLCD, ו-MLRUNLIST " +
          "מחליפה את CKMLMV011. הפריט מזכיר את MMPV במשפט: 'During period shift (transaction MMPV) the tables " +
          "MLDOC_EXTRACT and MLDOCCCS_EXTRACT will be compressed automatically for periods older than previous " +
          "period'. הפריט אינו קובע הסרה, שינוי מסך או יורשת לטרנזקציה MMPV; האזכור מתאר כיווץ אוטומטי של שתי " +
          "טבלאות בעת הרצת ה-period shift.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 12.4 S4TWL - Technical Changes " +
          "in Material Ledger with Actual Costing (SAP Note 2354768)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "פריט 12.4 ברשימת 2023 FPS03 (רכיבי יישום FIN-MIG-ML, CO-PC-ACT; Business Impact note 2354768) מזכיר את " +
          "MMPV באותו נוסח: 'During period shift (transaction MMPV) the tables MLDOC_EXTRACT and MLDOCCCS_EXTRACT " +
          "will be compressed automatically for periods older than previous period'. המסמך מתאר את MMPV כטרנזקציית " +
          "ה-period shift ואינו קובע שינוי, הסרה או יורשת לקוד עצמו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle:
          "רשומות המאגר: tcode-catalog.ts / tcode-directory.ts / troubleshooting-ext.ts / troubleshooting-ext2.ts, " +
          "MMPV",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "קטלוג הטרנזקציות מתאר את MMPV כ'סגירת תקופות (סגירת תקופה MM)' / 'Close Periods (MM Period Closing)', " +
          "ו-tcode-directory.ts כ'פתיחת תקופת MM'. שתי רשומות troubleshooting (period-close-mmrv-ob52-mismatch, " +
          "period-mm-not-open) מתעדות תרחישי שגיאה M7053 סביב MMPV מול MMRV ו-OB52, " +
          "ו-best-practices/cross-processes-2.ts מקשר את MMPV לרשימת טרנזקציות הכוללת tx:MMRV, tx:IW31, tx:IW32, " +
          "tx:COR1, tx:COR2, tx:COR3, tx:COR6N ו-tx:CO11N. הרשומות אינן קובעות status או release; הן משמשות הקשר.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MMPV",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "MMPV (Close Periods) רשומה ב-Fiori Apps Library כאפליקציית SAP GUI בסטטוס Published בגרסאות On-Premise " +
        "מ-1610 עד S/4HANA 2025 FPS01, ללא predecessor או successor, ותיעוד 2025 FPS01 מונה את האפשרות הקלאסית " +
        "ב-SAP GUI לצד אפליקציית Fiori לסגירת תקופה. פריט הפישוט 'S4TWL - Technical Changes in Material Ledger " +
        "with Actual Costing' (2023 FPS03 ו-2025 FPS01) מזכיר את MMPV בהקשר כיווץ הטבלאות " +
        "MLDOC_EXTRACT/MLDOCCCS_EXTRACT בעת ה-period shift, ואינו קובע שינוי, הסרה או יורשת לטרנזקציה.",
      edition: "on-premise",
      release: "2025.001",
      source: MMPV_FAL_S32OP,
      recommendedAction:
        "ניתן להמשיך להשתמש ב-MMPV לסגירה ופתיחה של תקופת MM ב-S/4HANA On-Premise. כאשר Material Ledger Actual " +
        "Costing פעיל, יש לבדוק מול פריט הפישוט את מודל הנתונים החדש (MLDOC וכו') ואת שלב ההמרה M10 (Migrate " +
        "Material Ledger Master Data). מומלץ לבדוק ב-SE93 במערכת היעד שהקוד קיים ומורשה, ולבחון את אפליקציית " +
        "Fiori 'Close Period for Product Master' כחלופת Fiori כשהיא מתאימה לתהליך.",
    },
    xrefs: ["tx:MMRV", "tx:OB52", "tx:MR21", "tx:CKM3"],
    lastVerifiedAt: DATE24,
    notes:
      "מה אומת: (1) רשומת ה-Fiori Apps Library (fal-app.mjs MMPV --release S32OP) מציגה את MMPV כ-App מסוג SAP " +
      "GUI, Published, ברשימת גרסאות S6OP (1610) עד S32OP (2025 FPS01), ללא predecessor או successor; זהו " +
      "ה-source של הסטטוס. (2) sap-help-search.mjs 'MMPV Close Periods material ledger' החזיר את העמוד 'Close " +
      "Period for Product Master' (2025.001, loio 18d9464a79084a51a9c5d54fc31f3672), שהסניפט שלו מתאר הרצת " +
      "RMMMPERI באמצעות MMPV ומונה את האפשרות הקלאסית ב-SAP GUI לצד אפליקציית Fiori; גוף העמוד לא נקרא. (3) " +
      "פריטי הפישוט 12.4 (2023 FPS03) ו-6.5.10 (2025 FPS01), שניהם Business Impact note 2354768, נקראו מהטקסט " +
      "המחולץ ב-scratchpad/official; שניהם מזכירים את MMPV בהקשר כיווץ MLDOC_EXTRACT/MLDOCCCS_EXTRACT בעת " +
      "ה-period shift, ואינם קובעים דבר על הטרנזקציה עצמה. מה לא אומת: (א) לא בוצעה בדיקה ב-SE93 במערכת יעד. " +
      "(ב) SAP Note 2354768 עצמו לא נקרא (נדרש S-user). (ג) לא נמצא מקור רשמי שמגדיר את 'Close Period for " +
      "Product Master' כיורשת של MMPV, ולכן לא נרשם successor. לא בוצעה בדיקה במערכת SAP חיה. רשומה מחקרית זו " +
      "מחליפה את הרשומה שנוצרה אוטומטית ל-tx:MMPV ב-transactions-auto.ts; לפני כתיבתה הציג report-coverage.mjs " +
      "--ids סטטוס נגזר 'unchanged' ברמת repository_verified, וכעת הסטטוס unchanged נשען על רשומת ספריית " +
      "ה-Fiori. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MR21",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MR21",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר המקומית מתעדת את MR21 כ'שינוי מחיר' (Price Change), מודול MM, תחום 'הערכת מלאי'; ללא קביעת " +
          "מעמד S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MR21",
      },
      MR21_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1, item 15.3.10 S4TWL - Material " +
          "Valuation - Statistical moving average price (זהה ב-2023 FPS03 item 27.8)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הפריט (עמ' 1489) קובע שבמצב שבו הלקוח בוחר באפשרות להגביר את התפוקה הטרנזקציונית בתנועות מלאי, המערכת " +
          "מפסיקה לחשב את המחיר הממוצע הנע הסטטיסטי, ובעקבות זאת: 'the \"statistical\" moving average price and the " +
          "value based on the \"statistical\" moving average price are no longer available on the user interface. " +
          "This concerns the following transaction codes: MM01, MM02, MM03, CKM3 and MR21' (כלשונו). כלומר MR21 " +
          "עצמה ממשיכה להתקיים; משתנה רק הצגת שדה אחד במסך שלה, ורק כאשר האפשרות הופעלה (בחירה בלתי הפיכה). אותו " +
          "נוסח בדיוק אומת גם בגרסת 2023 FPS03 (item 27.8).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Material Valuations and Price Changes | Controlling (CO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/1703f29f66e94ab8a23e016f9f7f2b89.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד רשמי (נקרא בגוף מלא דרך sap-help-body.mjs, loio 1703f29f66e94ab8a23e016f9f7f2b89) שתיאורו 'Find " +
          "out about the differences between the app Manage Material Valuations and transactions MM03, CKM3, MR21, " +
          "MR22, CKME and CKMPRPN', מציג טבלת השוואת יכולות בין האפליקציה F2680 'Manage Material Valuations' לבין " +
          "MR21 ('Change Material Prices') ושאר הטרנזקציות; בשורה 'Change material costs' שתי העמודות (F2680 " +
          "ו-MR21) מסומנות 'Yes'. זהו מסמך השוואת תכונות בין שני כלים קיימים במקביל, ואינו מכריז על F2680 " +
          "כ-successor של MR21 (אין בעמוד ניסוח replace/deprecate/successor).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App F6489 'Change Material Prices' (Transactional / SAP Fiori elements), release " +
          "S32OP (S/4HANA 2025 FPS01, on-premise)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F6489')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת ספריית ה-Fiori של F6489 (component CO-FIO-ML, roles SAP_BR_INVENTORY_ACCOUNTANT, OData " +
          "UI_FML_CHG_MATERIAL_PRICES 0001, זמינה בכל המהדורות מ-S27OP=2023 עד S32OP=2025 FPS01) מדפיסה 'GUI " +
          "transactions: leading -; related -' וכן 'predecessors: -; successors: -'. כלומר הספרייה עצמה אינה " +
          "מכריזה על F6489 כ-successor רשמי של MR21 (אין GUI-transaction וגם אין predecessor/successor מקושרים).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "changed",
      he:
        "MR21 ('שינוי מחיר', תחזוקת מחירי חומר) ממשיכה להתקיים ב-S/4HANA On-Premise ולא הוחלפה ולא הוסרה. שני " +
        "פריטי הפישוט הרשמיים (S4TWL - Material Ledger Obligatory for Material Valuation; S4TWL - Material " +
        "Valuation - Statistical moving average price) קובעים שתי השפעות על הטרנזקציה: בעקבות הפיכת Material " +
        "Ledger לחובה, MR21 (יחד עם MM02) מאפשרת כעת תחזוקת מחיר במספר מטבעות; ובמערכות שבהן נבחרה האפשרות " +
        "הבלתי-הפיכה להגברת התפוקה הטרנזקציונית בתנועות מלאי, שדה המחיר הממוצע הנע הסטטיסטי אינו מוצג עוד במסך " +
        "MR21. אין מקור רשמי המכריז על מחליפה: אפליקציית ה-Fiori F6489 'Change Material Prices' מדפיסה " +
        "predecessors/successors ריקים, ועמוד ההשוואה הרשמי מציג את F2680 'Manage Material Valuations' כאפליקציה " +
        "חופפת-חלקית, לא כמחליפה.",
      edition: "on-premise",
      release: "2025.001",
      source: MR21_SIMPL2025,
      recommendedAction:
        "לאמת בסביבת S/4HANA של CBC אם Material Ledger פעיל ואם אפשרות הגברת התפוקה הטרנזקציונית בתנועות מלאי " +
        "הופעלה, כדי לדעת אם שדה המחיר הממוצע הנע הסטטיסטי אכן מוצג ב-MR21 בפועל אצלם (פריט 15.3.10, בחירה בלתי " +
        "הפיכה); לוודא שתחזוקת מחיר במספר מטבעות דרך MR21/MM02 מתאימה לתהליך (פריט 15.3.2); לבחון את F6489 " +
        "'Change Material Prices' כאפליקציית Fiori נוספת לשינוי מחירים, בלי לראות בה מחליפה, שכן רשומת הספרייה " +
        "שלה מדפיסה predecessors/successors ריקים.",
    },
    xrefs: ["tx:MM02", "tx:MR22", "tx:CKM3", "table:MBEW"],
    lastVerifiedAt: DATE24,
    notes:
      "מחקר בוצע במסלול הרשמי בלבד לפי HOUSE-RULES: (1) grep בקוד המקור איתר רשומת tcode-catalog.ts#MR21 וכן " +
      "רשומה אוטומטית קיימת (ללא הכרעת מעמד) ב-data/verification/transactions-auto.ts, ששימשה נקודת מוצא " +
      "לזיהוי המקורות הרלוונטיים ואומתה מחדש ישירות מול הקבצים הרשמיים. (2) פריטי הפישוט 15.3.2/15.3.10 (2025 " +
      "FPS01) ו-27.7/27.8 (2023 FPS03) נקראו במלואם מ-scratchpad/official/SIMPL_OP2025.pdf.txt " +
      "ו-SIMPL_OP2023.pdf.txt (לא סניפט בלבד); הציטוטים ב-2023 FPS03 זהים מילה-במילה לאלה שצוטטו מ-2025 FPS01, " +
      "ולכן לא נכללו כראיה נפרדת כדי לא לחרוג ממספר הראיות המומלץ, אך מתועדים כאן: item 27.7 עמ' 649 ('In MM02 " +
      "and MR21 material prices can now be maintained in multiple currencies'), item 27.8 עמ' 651 ('MM01, " +
      "MM02, MM03, CKM3 and MR21'). (3) sap-help-search.mjs 'MR21 material price change' (ללא --product, size " +
      "8) החזיר 21 תוצאות; שתיים מהן (Feature Comparison for Material Valuations and Price Changes; Valuation " +
      "of Material Components) שימשו את המחקר, האחרונה נקראה כסניפט בלבד ולכן לא נכללה כראיה נפרדת (מסתפקת " +
      "ברשומה האוטומטית). (4) הגוף המלא של עמוד Feature Comparison נקרא עם sap-help-body.mjs ואישר ש-F2680 " +
      "'Manage Material Valuations' חופפת חלקית ל-MR21 ולא מוצגת כמחליפה. (5) scripts/fal-app.mjs F6489 " +
      "--release S32OP הריץ מול ספריית ה-Fiori: predecessors/successors ריקים, אין GUI transaction מקושרת; " +
      "F2680, F4006 ו-F6684 (שהרשומה האוטומטית איתרה כבעלות MR21 כקוד מוביל) אינן ב-data/fiori/apps.ts ולכן " +
      "אינן xref/successor. (6) data/library/book7/raw/ch2.json (סעיף Change Material Prices (F6489), ספר NEO, " +
      "secondary source) מציין ש-SAP ממליצה על MR21 כש-universal parallel accounting אינו מופעל; מקור זה אינו " +
      "help.sap.com רשמי ולכן לא נכלל כראיה sap_official אלא צוין כאן בלבד. status נקבע 'changed' (לא " +
      "'unchanged', כדי לשקף את שני השינויים המתועדים; לא 'replaced'/'deprecated' כי אין מקור רשמי הקובע כך). " +
      "הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג. לא בוצעה בדיקה במערכת SAP חיה. רשומה מחקרית זו מחליפה " +
      "את הרשומה שנוצרה אוטומטית ל-tx:MR21 ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, verification_required; " +
      "חדש: changed).",
  },
  {
    id: "tx:OMS2",
    evidence: [
      OMS2_HELP_2025,
      {
        sourceType: "sap_help",
        sourceTitle: "Information Sheet on Transferring Media Product Master Data",
        url: "https://help.sap.com/docs/SAP_ERP/3cf673c3a0394db0aabd89d79986cbe0/387ace53118d4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (help.sap.com, SAP ERP 6.0 EHP8, --product SAP_ERP) מציגה בסניפט 'Define Attributes of " +
          "Material Types (transaction OMS2)', ומאשרת שגם בצד ה-ECC טרנזקציית OMS2 מתועדת תחת אותו שם פונקציונלי. " +
          "הטענה מוגבלת לסניפט; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.24 S4TWL - Simplified " +
          "Product Master Tables Related to OMSR Transaction",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "פריט 5.1.24 (עמ' 128-129, Note מס' 0002267138) עוסק בטבלאות הקשורות לטרנזקציית OMSR ('Field groups and " +
          "Field selection for data screens'), כגון T130F, T130A ו-T133F, שמחלקת המסירה שלהן משתנה ל-E ב-S/4HANA " +
          "(לעומת G ב-Business Suite). בתוך תיאור התהליך המומלץ, הפריט קובע במפורש: 'The created field reference " +
          "can be assigned to required material type / plant. To assign it to a material type, go to transaction " +
          "OMS2.' כלומר OMS2 מוזכרת בשמה כטרנזקציה להצמדת Field Reference לסוג חומר, ולא כאובייקט שהפריט עצמו " +
          "מפשט, מחליף, מגביל או מסיר; הפריט אינו קובע לגבי OMS2 עצמה החלטה כלשהי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.21 S4TWL - Simplified Product " +
          "Master Tables Related to OMSR Transaction",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "פריט 3.21 (עמ' 161-162, Note מס' 2267138) הוא הפריט הקודם באותו נושא (טבלאות OMSR: T130F/T130A/T133F, " +
          "מחלקת מסירה E). נוסח התהליך המומלץ תואם לזה של פריט 5.1.24 בגרסת 2025 FPS01, כולל אותו משפט: 'To assign " +
          "it to a material type, go to transaction OMS2.' כך שהימצאות OMS2 בתהליך המתועד אינה אזכור חד-פעמי אלא " +
          "עקבית לאורך שתי גרסאות רשימת פישוט עוקבות (2023 FPS03 ו-2025 FPS01); גם כאן הפריט אינו קובע דבר לגבי " +
          "OMS2 עצמה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טרנזקציית OMS2 (הגדרת תכונות סוגי חומר, Define Attributes of Material Types) מתועדת בתיעוד הרשמי של SAP " +
        "S/4HANA On-Premise 2025 FPS01 באותו שם פונקציונלי שבו היא מתועדת ב-SAP ERP 6.0 EHP8, ומוזכרת בשמה " +
        "כטרנזקציה להצמדת Field Reference לסוג חומר גם בתוך שני פריטי הפישוט העוקבים 5.1.24 (2025 FPS01) ו-3.21 " +
        "(2023 FPS03) 'S4TWL - Simplified Product Master Tables Related to OMSR Transaction'. שני הפריטים " +
        "משפיעים על מחלקת המסירה של טבלאות תלויות (T130F, T130A, T133F) ולא על OMS2 עצמה; אף מקור רשמי שנבדק " +
        "בסבב זה אינו קובע לגבי OMS2 החלפה, הגבלה, הוצאה משימוש או יורשת.",
      edition: "on-premise",
      release: "2025.001",
      source: OMS2_HELP_2025,
      recommendedAction:
        "להמשיך לתחזק סוגי חומר דרך OMS2 (Define Attributes of Material Types), ולוודא בפרויקט ההמרה שהצמדת " +
        "Field Reference לסוג חומר (לפי תהליך פריט הפישוט של OMSR) עדיין מתבצעת דרך OMS2 כמתואר. שינוי מחלקת " +
        "המסירה של הטבלאות הנלוות (T130F/T130A/T133F ל-E) אינו דורש שינוי בדרך העבודה עם OMS2 עצמה, אך מומלץ " +
        "לבדוק קוד מותאם או Z-reports שמניחים מחלקת מסירה G על טבלאות אלה, ולהפסיק Customizing של field " +
        "selection במרחב השם של SAP (בהתאם להנחיית הפריטים). לאמת ב-SE93 במערכת יעד שהקוד עודנו פעיל, שכן לא " +
        "בוצעה בדיקה חיה בסבב זה.",
    },
    xrefs: ["table:T134", "tx:MM01", "tx:MM02", "tx:MM03", "tx:SPRO"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) grep על OMS2 במאגר (data/tcode-catalog.ts, data/table-enrichment.ts, data/tx-intel.ts, " +
      "data/verification/tables.ts#table:T134): הפרויקט מסווג OMS2 במודול MM, אזור 'קונפיגורציה', שם אנגלי " +
      "'Material Type Configuration'; זהו סיווג מבנה פרויקטלי ולא ראיה רשמית. (2) ארבעה חיפושים דרך " +
      "scripts/sap-help-search.mjs: 'OMS2 material type' (ברירת מחדל S/4HANA On-Premise), 'Material Type " +
      "Configuration OMS2', 'OMS2 material type' עם --product SAP_ERP, ו-'Define Attributes of Material " +
      "Types'. שלושת המקורות ה-sap_help שהתקבלו הם סניפטים בלבד; לא הורץ sap-help-body.mjs כי הסניפטים הספיקו " +
      "לקביעת קיום התיעוד, ולא לטענה עמוקה יותר. (3) שני פריטי הפישוט הרשמיים (2023 FPS03 §3.21, 2025 FPS01 " +
      "§5.1.24) נקראו במלואם מהטקסט המחולץ ב-scratchpad/official/. (4) לא הורץ fal-app.mjs: אין רמז לאפליקציית " +
      "Fiori חלופית ל-OMS2 באף מקור שנבדק, וגם לא ל-Fiori בתוך פריטי הפישוט (הם מפנים רק לטרנזקציות " +
      "OMSR/OMS9/OMS2/OMSA). מה שלא אומת: (א) מבנה השדות המלא של המסך/הטבלאות שמאחורי OMS2 (T134 ונלוות); לא " +
      "הורחב מעבר לרשומת table:T134 הקיימת. (ב) SAP Note 2267138 (מודפס בגוף שני פריטי הפישוט) לא נקרא בנפרד " +
      "(דורש S-user). (ג) OMSR ו-OMSA מוזכרות בתהליך אך אינן ברשימת הטרנזקציות של " +
      "lib/route-manifest.generated.ts ולכן לא הופיעו כ-xref, רק בפרוזה. (ד) לא בוצעה בדיקה במערכת SAP חיה; " +
      "הכל מבוסס על תיעוד רשמי (snippet-level) ועל פריטי פישוט רשמיים שנקראו במלואם. ביקורת אדברסרית " +
      "2026-09-24: נתיב ה-IMG שלא הודפס במקור הוסר מההמלצה, מקור הסטטוס הופנה לשורת הראיה הראשונה, קווים " +
      "מפרידים ארוכים הוסרו, והניסוח על פריט 3.21 תוקן ('נוסח התהליך המומלץ תואם', 'אזכור חד-פעמי'). בכתיבה " +
      "הוסרו 'בלבד' ו'הפעילה' מ-status.he ומשורת הראיה של פריט 5.1.24 (הפריט מנחה 'go to transaction OMS2' " +
      "ואינו מתאר את מצב הקוד). רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:OMS2 " +
      "ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, verification_required; חדש: unchanged). הרשומה אינה נושאת " +
      "שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:OMSL",
    evidence: [
      OMSL_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.22 S4TWL - Material Number " +
          "Field Length Extension",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "פריט 3.22 (מתחיל בעמ' 162; ציטוט OMSL בעמ' 169; SAP Note 2267140 מודפס בפריט) הוא הפריט המקביל בגרסה " +
          "הקודמת, ונוסח הפרק 'System Settings to Activate the Extended Material Number Functionality' בו זהה לזה " +
          "שבפריט 5.1.5, כולל הציטוט: 'Transaction OMSL allows a customer-specific settings regarding the material " +
          "number field length.' כך ש-OMSL מוזכרת בשמה בתהליך ההפעלה בשתי רשימות פישוט עוקבות (2023 FPS03 ו-2025 " +
          "FPS01); גם כאן הפריט אינו קובע דבר לגבי OMSL עצמה מעבר לתפקידה בתהליך.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Configure Material Number Length and Format (PEO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/68af7d1184344c55859b9cd38b6c9b56.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (Production Engineering and Operations for Complex Assembly, גרסה 2025 FPS01, loio " +
          "68af7d1184344c55859b9cd38b6c9b56) מציגה בסניפט: 'In your PEO system, launch transaction OMSL. Set the " +
          "material number length to the same value as defined in your ERP system.' כלומר OMSL מוזכרת בשמה " +
          "כטרנזקציה שמפעילים במערכת PEO כדי לקבוע את אורך מספר החומר זהה להגדרה במערכת ה-ERP. הטענה תחומה בסניפט; " +
          "גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#OMSL",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "המאגר מסווג את OMSL במודול MM, אזור 'קונפיגורציה', שם אנגלי 'Define Material Number Length'; זהו סיווג " +
          "פרויקטלי פנימי ולא ראיה רשמית, ומצוטט כדי לתעד את ההקשר שבו הפרויקט מציג את הטרנזקציה.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#OMSL",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "טרנזקציית OMSL (הגדרת אורך מספר חומר) מוזכרת בשמה כטרנזקציית ה-Customizing להתאמת אורך שדה מספר החומר " +
        "ב-S/4HANA On-Premise 2025 FPS01, בפריט הפישוט 5.1.5 'S4TWL - Material Number Field Length Extension' " +
        "ובתיעוד PEO מאותה גרסה, ואותו ציטוט חוזר בפריט המקביל 3.22 בגרסת 2023 FPS03. אף אחד מהמקורות אינו קובע " +
        "לגבי OMSL החלפה, הגבלה או הוצאה משימוש; בתיעוד S/4HANA היא מתוארת כחלק מהתהליך להפעלת הרחבת שדה מספר " +
        "החומר ל-40 תווים, שכבויה כברירת מחדל.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: OMSL_SIMPL2025,
      recommendedAction:
        "להמשיך להשתמש ב-OMSL להגדרת אורך ופורמט מספר החומר, ולזכור שהרחבת השדה ל-40 תווים אינה מופעלת כברירת " +
        "מחדל: ההפעלה דורשת הפעלת השדות המורחבים דרך ה-IMG או דרך FLETS (לתחזוקת הטבלה ב-FLETS נדרשת קבוצת " +
        "ההרשאות FLE, אובייקט S_TABU_DIS), וכן עדכון ההגדרה ב-OMSL. מומלץ לבצע סקר ממשקים וקוד מותאם שמניחים " +
        "אורך של 18 תווים לפני הפעלת ההרחבה, כמתואר בפריט 'S4TWL - Material Number Field Length Extension', " +
        "ולאמת ב-SE93 במערכת היעד שהטרנזקציה פעילה, שכן לא בוצעה בדיקה במערכת SAP חיה.",
    },
    xrefs: ["tx:OMS2", "tx:MM01", "tx:MM02", "tx:MM03"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) grep על OMSL במאגר: data/tcode-catalog.ts מסווג אותה במודול MM, אזור קונפיגורציה, שם אנגלי " +
      "'Define Material Number Length'; data/library/book3-full.json (הערת מומחה, לא מקור רשמי) מתאר את אותו " +
      "תהליך הפעלה. (2) חיפושים דרך scripts/sap-help-search.mjs: 'OMSL material number format' ו-'Define " +
      "Output Format of Material Number' (S/4HANA On-Premise) איתרו את מסמך ה-PEO שמזכיר OMSL בשמה; 'Define " +
      "Output Format of Material Number OMSL' ו-'OMSL transaction material number' (--product SAP_ERP) החזירו " +
      "21 רשומות כל אחד, ואף אחת מהן אינה מדפיסה את OMSL בכותרת או בסניפט (שלילה מתועדת, לא קביעה שהשם אינו " +
      "קיים ב-ECC). (3) שני פריטי הפישוט (2023 FPS03 §3.22 מעמ' 162, ציטוט OMSL בעמ' 169; 2025 FPS01 §5.1.5 " +
      "מעמ' 95, ציטוט OMSL בעמ' 101) נקראו מהטקסט המחולץ ב-scratchpad/official/. לא הורץ sap-help-body.mjs; " +
      "טענת ה-PEO תחומה בסניפט. (4) ביקורת 2026-09-24: הרצת 'node scripts/fal-app.mjs --tcode OMSL' הדפיסה " +
      "'OMSL @ S32OP: leading app(s): none; GUI app entry: none'. פתוח: שם OMSL בצד ה-ECC נשען על סיווג המאגר " +
      "בלבד; מבנה המסך וטבלת ה-Customizing שמאחורי OMSL לא נבדקו; SAP Note 2267140 לא נקרא בנפרד (דורש " +
      "S-user); FLETS אינה ב-lib/route-manifest.generated.ts ולכן מוזכרת בפרוזה בלבד. לא בוצעה בדיקה במערכת " +
      "SAP חיה. ביקורת אדברסרית 2026-09-24: מספרי העמודים תוקנו (2025 FPS01: הפריט מתחיל בעמ' 95 וציטוט OMSL " +
      "בעמ' 101; 2023 FPS03: הפריט מתחיל בעמ' 162 וציטוט OMSL בעמ' 169), השוואת הנוסח בין המהדורות הוגבלה לפרק " +
      "'System Settings to Activate the Extended Material Number Functionality', קבוצת ההרשאות FLE יוחסה " +
      "לתחזוקת הטבלה ב-FLETS כלשון המקור, הסדר הקשיח בין שתי ההגדרות הוסר (המקור מונה אותן כרשימה), 'טרנזקציה " +
      "פעילה' ו'ממשיכה לשמש' הוסרו, ומקור הסטטוס הופנה לשורת הראיה של הפריט 'S4TWL - Material Number Field " +
      "Length Extension' (2025 FPS01). רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:OMSL " +
      "ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, verification_required לפי report-coverage.mjs --ids; חדש: " +
      "unchanged). הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:XK01",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#XK01",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר משייכת את XK01 למודול MM, לאזור ניהול נתוני האב של ספקים (Central Vendor Master). שדה " +
          "descTech מתאר טרנזקציה מרכזית המעדכנת את LFA1 (כללי), LFB1 (קוד חברה) ו-LFM1 (ארגון רכש), מבוססת קבוצת " +
          "חשבונות (Account Group). שדה s4 רושם שהטרנזקציה חסומה ב-S/4HANA, שהקמת ספק מתבצעת דרך טרנזקציה BP " +
          "במסגרת Business Partner Approach, ושנתוני LFA1/LFB1/LFM1 מתוחזקים דרך CVI (Customer-Vendor " +
          "Integration). אלה טענות המאגר, לא מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#XK01",
      },
      XK01_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
          "Approach",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "הפריט באותו שם ברשימת 2023 FPS03 (עמ' 153-155) קובע: 'The user interface for SAP S/4HANA is transaction " +
          "BP. There is no specific user interface for customer/vendor like known from SAP Business Suite (the " +
          "specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, MK03 " +
          "etc. are not available in SAP S/4HANA on-premise)'. בטבלה, תחת 'Transactions that get redirected to " +
          "transaction BP', מודפס '... XK01, XK06, XK07, XK02, XK03'. הפריט מוסיף: 'Only SAP Business Suite " +
          "customer with C/V integration in place can move to SAP S/4HANA, on-premise(Conversion approach)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Partners",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/bfd8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "דף תפעולי בתיעוד Warranty Claim Processing (deliverable Maintenance Management, versionId 2025.001, " +
          "loio bfd8c353b677b44ce10000000a174cb4) מנחה בסעיף Activities: 'Choose transactions XK01, XK02, XK03 to " +
          "create, change and display vendors/creditors.' המשפט מופיע בסניפט של רשומת החיפוש ובגוף הדף שנקרא דרך " +
          "sap-help-body.mjs. הוא סותר את פריט הפישוט 'S4TWL - Business Partner Approach' באותה מהדורה, הקובע " +
          "ש-XK01 אינה זמינה ומנותבת ל-BP. שני המקורות רשמיים ונשמרים כסתירה; הסבר אפשרי הוא סחף תיעוד בדף " +
          "התפעולי, והדבר לא הוכרע. מה שיכריע: הפעלת XK01 במערכת SAP S/4HANA On-Premise חיה ובדיקה האם היא מנותבת " +
          "ל-BP.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
              "Approach",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            claim:
              "'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, " +
              "MK03, etc. are not available in SAP S/4HANA. These will be redirected to transaction BP.'",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customizing for Stock Transfer",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/240fcdcc71c640ea9aa9691500b34889/b5a2cf8b170c40d6bfda2523c7bda7d7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "דף Customizing בתיעוד הלוקליזציה להודו (deliverable India, versionId 2025.001, loio " +
          "b5a2cf8b170c40d6bfda2523c7bda7d7) מנחה, בשלב שיוך ספק למפעל השולח: 'Execute transaction XK01 and " +
          "provide the vendor, company code, and purchasing organization details'. המשפט מופיע בסניפט של רשומת " +
          "החיפוש ובגוף הדף שנקרא דרך sap-help-body.mjs. הוא סותר את פריט הפישוט 'S4TWL - Business Partner " +
          "Approach' באותה מהדורה. שני המקורות רשמיים ונשמרים כסתירה, והדבר לא הוכרע. מה שיכריע: הפעלת XK01 במערכת " +
          "SAP S/4HANA On-Premise חיה ובדיקה האם היא מנותבת ל-BP.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.27 S4TWL - Business Partner " +
              "Approach",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            claim:
              "'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, " +
              "MK03, etc. are not available in SAP S/4HANA. These will be redirected to transaction BP.'",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
    ],
    status: {
      status: "replaced",
      he:
        "לפי פריט הפישוט 'S4TWL - Business Partner Approach' (2025 FPS01), XK01 (יצירת ספק, מרכזי) אינה זמינה " +
        "ב-SAP S/4HANA On-Premise וקריאה אליה מנותבת לטרנזקציה BP. דפי עזרה תפעוליים באותה מהדורה (2025.001) " +
        "עדיין מנחים להשתמש ב-XK01; ייתכן שמדובר בסחף תיעוד. הסתירה לא הוכרעה ומתועדת בשורות conflicting_sources.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: XK01_SIMPL2025,
      recommendedAction:
        "ליצור, לשנות ולהציג ספקים ב-S/4HANA On-Premise דרך טרנזקציה BP במקום XK01. לפני המרה בגישת Conversion " +
        "לוודא שה-Customer/Vendor Integration (CVI) פעיל, שכן פריט הפישוט מתנה את המעבר ב-C/V integration. לאמת " +
        "במערכת היעד את הניתוב בפועל ל-BP, כי לא בוצעה בדיקה במערכת SAP חיה.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:XK02", "tx:XK03", "tx:FK01", "tx:MK01"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) מאגר: data/tx-intel.ts#XK01 (מודול, אזור, descTech, s4). השם האנגלי 'Create Vendor " +
      "(Centrally)' והשם העברי 'יצירת ספק (מרכזי)' מקורם ב-data/tcode-catalog.ts:1753, לא ב-tx-intel.ts. אין " +
      "ברשומת tx-intel.ts#XK01 תפקיד FLVN01, ולכן לא נקוב תפקיד BP בהמלצה. (2) פריטי פישוט נקראו " +
      "מ-scratchpad/official/SIMPL_OP2025.pdf.txt ו-SIMPL_OP2023.pdf.txt לפי האינדקס " +
      "audit/master-completion/simpl-tcode-index.json (חמישה אזכורים): 5.1.27 ו-3.19 כשורות Evidence. פריט " +
      "5.1.30 'S4TWL - Business Partner Approach for SAP MDG' (2025 FPS01, עמ' 143) מתועד בהערות; הוא מדפיס: " +
      "'The SAP MDG ERP Customer and Vendor Like User Interfaces (UI) copy the look and feel of SAP ERP based " +
      "maintenance transactions for customer and vendor master data (for example XD01, XD02, XK01, XK03, and " +
      "so on). These old SAP ERP-based transactions are replaced by transaction BP.' הפריט 'S4TWL - Specific " +
      "fields on Business Partner' (2025 FPS01 פריט 13.14.1; 2023 FPS03 פריט 59.7) מונה את XK01 תחת " +
      "'Transaction not available in SAP S/4HANA' בהקשר שדות US Federal Financials. (3) חיפוש רשמי: node " +
      "scripts/sap-help-search.mjs \"XK01\" --size 12 --json (scope SAP_S4HANA_ON-PREMISE) החזיר 21 רשומות, כולן " +
      "2025.001. שני דפים תפעוליים מנחים להשתמש ב-XK01 ונקראו במלואם דרך sap-help-body.mjs, ושניהם מתועדים " +
      "כשורות conflicting_sources: 'Partners' (Maintenance Management, loio bfd8c353b677b44ce10000000a174cb4) " +
      "ו-'Customizing for Stock Transfer' (India, loio b5a2cf8b170c40d6bfda2523c7bda7d7). סניפטים נוספים " +
      "שמדפיסים את XK01: 'Maintaining Master Data' (SAP Oil & Gas PRA: 'Maintain Owner Info - XK01'), " +
      "'Processing of Maintenance Orders with Warranty-Related Items' ו-'Processing of Service Orders with " +
      "Warranty-Related Items' (PLM: 'vendor master (XK01, 02, 03)'). החיפוש החזיר גם את 'Transactions' " +
      "(Logistics General) ואת 'Transaction Codes for VMS' (Automotive), שהסניפט שלהם מתחיל ב-XK02 ואינו מדפיס " +
      "את XK01. כלומר פריטי הפישוט קובעים את ההכרעה, ודפי עזרה תפעוליים באותה מהדורה עדיין מזכירים את XK01; " +
      "הסתירה לא הוכרעה. מה שיכריע: הפעלת XK01 במערכת SAP S/4HANA On-Premise חיה ובדיקה האם היא מנותבת ל-BP. " +
      "(4) לא הורץ scripts/fal-app.mjs: אף מקור שנקרא לא נוקב באפליקציית Fiori עבור XK01. (5) לא נקרא SAP Note " +
      "2265093 (מודפס בפריטי הפישוט; דורש S-user). היסטוריה: רשומה אוטומטית " +
      "ב-data/verification/transactions-auto.ts (ללא הכרעת מעמד: שורות הקשר מהמאגר, מסניפטים של help.sap.com " +
      "ומפריטי הפישוט; לפני כתיבת רשומה זו הציג report-coverage.mjs --ids סטטוס נגזר 'unchanged' ברמת " +
      "repository_verified) → רשומה זו (replaced, successor tx:BP, עם שתי שורות conflicting_sources). טיוטה " +
      "קודמת נדחתה בביקורת על השמטת הדפים הסותרים, טענת עקביות, מקפים ארוכים, release של status, source " +
      "כמחרוזת, שם תפקיד ללא מקור ושיוך שם אנגלי ל-tx-intel.ts; בביקורת השנייה נוספה שורה לדף ההודי, רוככה " +
      "קביעת סחף התיעוד והוסרה המלצה ללא מקור על קוד מותאם. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג. לא " +
      "בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "tx:XK02",
    evidence: [
      XK02_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 3.19 S4TWL - Business Partner " +
          "Approach (SAP Note 2265093)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "אותו פריט ברשימת 2023 FPS03 (עמ' 153-155) קובע: 'the specific transactions like XD01, XD02, XD03 or " +
          "VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, MK03 etc. are not available in SAP S/4HANA " +
          "on-premise', ללא המשפט 'These will be redirected to transaction BP' שמופיע במהדורת 2025. בטבלה " +
          "'Transactions not available in SAP S/4HANA on-premise edition', תחת 'Transactions that get redirected " +
          "to transaction BP', מודפסת הרשימה (כלשונה): 'FD01,FD02,FD03, FK01,FK02,FK03,MAP1,MAP2,MAP3, MK01, MK02, " +
          "MK03, V-03,V-04,V-05,V-06,V-07,V-08,V-09, V-11, VAP1, VAP2, VAP3, VD01, VD02,VD03, XD01, XD02, XD03, " +
          "XK01, XK06, XK07, XK02, XK03', ולצידה 'Transactions that are obsolete: FD06, FK06, MK06, MK12, MK18, " +
          "MK19, VD06, XD06, V+21, V+22, V+23'. הרשימות שונות ממהדורת 2025 FPS01: ב-2023 XK07 ברשימת הניתוב ל-BP " +
          "ו-XK05 אינה מופיעה, וב-2025 XK07 ברשימת ה-obsolete. XK02 מופיעה ברשימת הניתוב ל-BP בשתי המהדורות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 13.14.1 S4TWL - Specific fields " +
          "on Business Partner (SAP Note 2270420)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "פריט 13.14.1 (Application Component PSM-FG, עמ' 1274-1275) מדפיס תחת הכותרת 'Transaction not available " +
          "in SAP S/4HANA' את הרשימה 'FK01 FK02 FK03 XK01 XK02 XK03 FD01 FD02 FD03 XD01 XD02 XD03' (כלשונה), " +
          "וקובע: 'Business Partner transaction 'BP' is now used to create, change or display customer or vendor " +
          "data' ו-'The business process is not affected, only a different transaction needs to be used'. הפריט " +
          "מפנה לפריט Business Partner Approach בשמו: 'Refer to the simplification item for business partner for " +
          "general information (Business Partner Approach)'. ההקשר שלו הוא שדות ייעודיים ל-US Federal Financials.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 15.3.5 S4TWL - Blocked customer " +
          "or supplier in Inventory Management (SAP Note 2516223)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "פריט 15.3.5 (עמ' 1473-1474) קובע בסעיף 'Required and Recommended Action(s)' שנתונים הקשורים ללקוח או " +
          "ספק חסומים 'shall be archived or deleted before converting or upgrading to SAP S/4HANA 1709 (and " +
          "above)', ממשיך 'Furthermore, blocked customers and suppliers shall be removed from plant and storage " +
          "location data', ומנחה: 'The assignment of a blocked supplier to a plant can be removed via transaction " +
          "XK02 -> Purchasing data -> Extras -> Additional Purchasing Data.' (כלשונו). סעיף התיאור של הפריט מוסיף: " +
          "'In case of an upgrade from 1511/1610/1709 to 1709-FPS01 or higher, please read note 2629400'. במסלול " +
          "שדרוג כזה מערכת המקור היא כבר SAP S/4HANA (1511/1610/1709), ולכן ההנחיה להשתמש ב-XK02 עומדת במתח מול " +
          "פריט Business Partner Approach, שחל על 'system conversion to SAP S/4HANA, any of the releases' וקובע " +
          "ש-XK02 אינה זמינה ב-S/4HANA ומנותבת ל-BP. הפריט אינו מציין באיזו מערכת מופעלת XK02. השורה נשמרת כחלק " +
          "מקבוצת המקורות הסותרים; מה שיכריע: הפעלת XK02 במערכת SAP S/4HANA on-premise חיה ובדיקה האם היא מנותבת " +
          "ל-BP, וקריאת SAP Note 2629400 (דורש S-user).",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.27 " +
              "S4TWL - Business Partner Approach (SAP Note 2265093)",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            claim:
              "'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, " +
              "MK03, etc. are not available in SAP S/4HANA. These will be redirected to transaction BP.'",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Partners",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/bfd8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'XK02' --size 20, loio bfd8c353b677b44ce10000000a174cb4, versionId " +
          "2025.001) מדפיסה בסניפט: 'Choose transactions XK01, XK02, XK03 to create, change and display " +
          "vendors/creditors' (כלשונו). כלומר עמוד בתיעוד SAP S/4HANA On-Premise 2025.001 עדיין מפנה ל-XK02 לשינוי " +
          "ספק, בסתירה לפריט Business Partner Approach. גוף העמוד לא נקרא; הטענה מוגבלת לסניפט. מה שיכריע: הפעלת " +
          "XK02 במערכת SAP S/4HANA on-premise חיה ובדיקה האם היא מנותבת ל-BP.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.27 " +
              "S4TWL - Business Partner Approach (SAP Note 2265093)",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            claim:
              "'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, " +
              "MK03, etc. are not available in SAP S/4HANA. These will be redirected to transaction BP.'",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Transactions",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/bcd8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'XK02' --size 20, loio bcd8c353b677b44ce10000000a174cb4, versionId " +
          "2025.001) מדפיסה בסניפט: ', XK02, XK03 Create, change and display supplier (creditor) centrally' " +
          "(כלשונו). עמוד נוסף בתיעוד SAP S/4HANA On-Premise 2025.001 שמציג את XK02 כטרנזקציה לשינוי ספק מרכזי, " +
          "בסתירה לפריט Business Partner Approach. גוף העמוד לא נקרא; הטענה מוגבלת לסניפט. מה שיכריע: הפעלת XK02 " +
          "במערכת SAP S/4HANA on-premise חיה ובדיקה האם היא מנותבת ל-BP.",
        verificationLevel: "conflicting_sources",
        conflictingEvidence: [
          {
            sourceType: "simplification_item",
            sourceTitle:
              "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.27 " +
              "S4TWL - Business Partner Approach (SAP Note 2265093)",
            url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025 FPS01",
            accessedAt: DATE24,
            claim:
              "'the specific transactions like XD01, XD02, XD03 or VD01, VD02, VD03/XK01, XK02, XK03 or MK01, MK02, " +
              "MK03, etc. are not available in SAP S/4HANA. These will be redirected to transaction BP.'",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: data/tx-intel.ts#XK02 ו-data/tcode-catalog.ts#XK02",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "data/tx-intel.ts#XK02 משייכת את XK02 למודול MM, בתחום ניהול נתוני אב של ספקים (Central Vendor Master), " +
          "ומציינת בשדה s4: 'חסומה ב-S/4HANA. שינוי ספק מתבצע דרך BP. שדות LFA1/LFB1/LFM1 מתוחזקים דרך CVI.'; " +
          "data/tcode-catalog.ts#XK02 נותן לה את הכותרת האנגלית 'Change Vendor (Centrally)'. תיאור המאגר בלבד, " +
          "אינו מקור רשמי; עקבי עם פריטי הפישוט שלעיל.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#XK02",
      },
    ],
    status: {
      status: "replaced",
      he:
        "XK02 (שינוי ספק מרכזי) אינה זמינה ב-SAP S/4HANA on-premise לפי פריט הפישוט 'S4TWL - Business Partner " +
        "Approach' (SAP Note 2265093), שמונה אותה ברשימת הטרנזקציות המנותבות לטרנזקציה BP בשתי מהדורות הרשימה " +
        "(2025 FPS01 ו-2023 FPS03); פריט 'S4TWL - Specific fields on Business Partner' מונה אותה תחת " +
        "'Transaction not available in SAP S/4HANA'. עמודי Help של S/4HANA 2025.001 שעדיין מזכירים את XK02 נרשמו " +
        "כמקורות סותרים. תחזוקת הספק עוברת לטרנזקציית BP.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: XK02_SIMPL2025,
      recommendedAction:
        "לתחזק ספקים דרך טרנזקציית BP; לפני המרה ל-S/4HANA לוודא Customer/Vendor Integration (CVI) מלא. קוד לקוח " +
        "שיוצר או משנה נתוני ספק בכתיבה ישירה לטבלאות שב-piece list SI_MD_BP יש להתאים ל-API של Business Partner " +
        "(CVI_EI_ADAPTER, או CL_MD_BP_MAINTAIN אם כבר בשימוש), לפי סעיף Custom Code Adaption בפריט Business " +
        "Partner Approach. הסרת שיוך ספק חסום למפעל, שפריט 'S4TWL - Blocked customer or supplier in Inventory " +
        "Management' מתעד כפעולה דרך XK02, יש לתכנן לפני ההמרה או השדרוג ולאמת במערכת באיזה שלב ובאיזו מערכת היא " +
        "מתבצעת.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:XK01", "tx:XK03"],
    lastVerifiedAt: DATE24,
    notes:
      "מקור ההכרעה: פריט הפישוט 'S4TWL - Business Partner Approach' (SAP Note 2265093) בשתי מהדורות (2025 " +
      "FPS01 פריט 5.1.27, עמ' 136-138; 2023 FPS03 פריט 3.19, עמ' 153-155), שנקראו מחילוץ הטקסט של הפרויקט " +
      "(scratchpad/official/SIMPL_OP2025.pdf.txt, SIMPL_OP2023.pdf.txt). הנוסח ורשימות הטרנזקציות שונים בין " +
      "המהדורות (ראו evidence[1]); XK02 ברשימת הניתוב ל-BP בשתיהן. פריט 'S4TWL - Specific fields on Business " +
      "Partner' (SAP Note 2270420; 2025 FPS01 פריט 13.14.1, עמ' 1274-1275) מונה את XK02 תחת 'Transaction not " +
      "available in SAP S/4HANA'; פריט 59.7 באותו שם ברשימת 2023 FPS03 (עמ' 1355-1356) מדפיס את אותה רשימת " +
      "קודים, כל קוד בשורה נפרדת. פריט 'S4TWL - Blocked customer or supplier in Inventory Management' (SAP " +
      "Note 2516223; 2025 FPS01 פריט 15.3.5, עמ' 1473-1474; פריט 27.2 באותו שם ברשימת 2023 FPS03 מדפיס את אותו " +
      "משפט XK02) מנחה הסרת שיוך ספק חסום למפעל דרך XK02 ומזכיר מסלול שדרוג מ-1511/1610/1709, ולכן נרשם כמקור " +
      "במתח מול פריט Business Partner Approach. חיפוש sap-help-search.mjs 'XK02' --size 20 (ללא דגל product, " +
      "הורץ מחדש בסבב התיקון 2026-09-24) החזיר 21 רשומות, כולן SAP S/4HANA בגרסה 2025.001, ובסניפט של כל אחת " +
      "מודפס XK02: 'Partners' (loio bfd8c353b677b44ce10000000a174cb4), 'Transactions' (loio " +
      "bcd8c353b677b44ce10000000a174cb4), 'Transaction Codes for VMS' (loio 81dcc353b677b44ce10000000a174cb4, " +
      "סניפט ', XK02 Create, Change Supplier (Vendor) Centrally'), ו-18 עמודי תפקידים 'Master Data Governance " +
      "for Supplier/Customer: Specialist/Requester'; 16 מהם מדפיסים 'XK02 Change Vendor (Centrally)' בהקשר " +
      "'transactions, which are necessary for the CVI implementation', ושניים (loio " +
      "060619494dfa4ae1b8e4b4017c1254c5, 433f0a2508934b119a88f31cd170c9ff) מדפיסים 'XK02 Change vendor " +
      "(centrally)' בהקשר 'as they are called by the CVI implementation'. 'Partners' ו-'Transactions' נרשמו " +
      "כשורות conflicting_sources מול פריט 5.1.27, באותו דפוס של tx:MK02; גוף העמודים לא נקרא. הסטטוס replaced " +
      "עם tx:BP נשמר לפי פריט הפישוט; ההכרעה בסתירה דורשת בדיקה במערכת חיה. fal-app.mjs --tcode XK02 --release " +
      "S32OP החזיר 'leading app(s): none; GUI app entry: none', ולכן אין successor מסוג fiori:. מספרי SAP " +
      "Notes 2265093, 2270420, 2516223 ו-2629400 מודפסים בגוף הפריטים ומצוטטים בפרוזה בלבד; שדה sapNote לא " +
      "הוזן (me.sap.com דורש S-user). הצד ECC מתועד כאן רק דרך רשומת המאגר. xrefs (tx:BP, tx:XK01, tx:XK03) " +
      "קיימים ב-lib/route-manifest.generated.ts. לא בוצעה בדיקה במערכת SAP חיה. היסטוריה, ביקורת אדברסרית " +
      "2026-09-24 (ישן → חדש): הטיוטה טענה שחיפושי Help לא סתרו את ההכרעה ולא רשמה סתירה → נוספו שורות " +
      "conflicting_sources ל-'Partners' ול-'Transactions' ופריט 15.3.5 סומן כחלק מהסתירה; שורת 2023 טענה נוסח " +
      "זהה ל-2025 → תוקן לפי ההבדלים בפועל והציטוט תוקן; שורת 13.14.1 ערבבה שתי מהדורות → הוגבלה ל-2025 " +
      "והאזכור של 2023 עבר לכאן; ההמלצה על CALL TRANSACTION הוחלפה בנוסח סעיף Custom Code Adaption. ביקורת " +
      "שנייה 2026-09-24: תיאור 18 עמודי התפקידים פוצל לפי הסניפטים בפועל (16 ו-2). רשומה מחקרית זו מחליפה את " +
      "הרשומה שנוצרה אוטומטית ל-tx:XK02 ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, ולפני כתיבתה הציג " +
      "report-coverage.mjs --ids סטטוס נגזר 'changed' ברמת repository_verified; חדש: replaced, יורש tx:BP). " +
      "הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:XK03",
    evidence: [
      XK03_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 (document version 1.36) · item 5.1.30 " +
          "S4TWL - Business Partner Approach for SAP MDG",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE24,
        claim:
          "פריט הפישוט 'S4TWL - Business Partner Approach for SAP MDG' (עמ' 143-144), שעוסק בהשפעת גישת ה-Business " +
          "Partner על ממשקי SAP MDG Central Governance, נוקב ב-XK03 כדוגמה ('for example XD01, XD02, XK01, XK03, " +
          "and so on') וקובע: 'These old SAP ERP-based transactions are replaced by transaction BP.' הפריט עצמו " +
          "עוסק בהחלפת ממשקי MDG (BS_OVP_CU_CL / BS_OVP_SP_VL) בממשקי BS_OVP_CU / BS_OVP_SP; קביעת 'replaced by " +
          "transaction BP' מתייחסת לטרנזקציות ה-ERP שהממשקים חיקו, ותואמת את ניסוח פריט 'S4TWL - Business Partner " +
          "Approach'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tx-intel.ts#XK03",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מתארת את XK03 כהצגה (read-only) של רשומת אב ספק מרכזית, מודול MM, תחום 'ניהול נתוני אב, " +
          "ספקים (Central Vendor Master)'; הכותרת האנגלית 'Display Vendor (Centrally)' מופיעה " +
          "ב-data/tcode-catalog.ts#XK03. סיווג פרויקטלי בלבד, לא ראיה רשמית לגבי מעמד S/4HANA.",
        verificationLevel: "repository_verified",
        repoRef: "data/tx-intel.ts#XK03",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Partners | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/bfd8c353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש הרשמית (Maintenance Management, versionId 2025.001) היא נושא של Warranty Claim Processing: " +
          "'Master records have to exist in the system for all warranty partners in Warranty Claim Processing...', " +
          "ובסניפט: 'Activities Choose transactions XK01, XK02, XK03 to create, change and display " +
          "vendors/creditors.' ניסוח זה אינו מתיישב עם פריט הפישוט 'S4TWL - Business Partner Approach', שקובע " +
          "ש-XK03 אינה זמינה ומנותבת ל-BP; אי-ההתאמה בין שני המקורות הרשמיים לא נפתרה בסבב זה (ראו notes).",
        verificationLevel: "conflicting_sources",
      },
    ],
    status: {
      status: "replaced",
      he:
        "פריט הפישוט 'S4TWL - Business Partner Approach' (2025 FPS01) מונה את XK03 (Display Vendor (Centrally)) " +
        "ברשימת הטרנזקציות שאינן זמינות ב-SAP S/4HANA On-Premise ומנותבות לטרנזקציית BP, ופריט 'S4TWL - Business " +
        "Partner Approach for SAP MDG' קובע כי טרנזקציות ERP אלה 'are replaced by transaction BP'. נושא תיעוד " +
        "נפרד של Warranty Claim Processing ('Partners', Maintenance Management, 2025.001) עדיין מזכיר את " +
        "XK01/XK02/XK03, ואי-ההתאמה לא נפתרה בסבב זה.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: XK03_SIMPL2025,
      recommendedAction:
        "להשתמש בטרנזקציית BP (Business Partner) עם התפקיד המתאים לספק להצגת נתוני אב של ספק במקום XK03, ולוודא " +
        "בפרויקט ההמרה שה-Customer/Vendor Integration (CVI) מיושם במלואו, כתנאי מעבר הנדרש בפריט הפישוט 'S4TWL - " +
        "Business Partner Approach'. יש לבדוק קוד מותאם, דוחות Z וקיצורי דרך בתפריטים שמניחים XK03 כטרנזקציה " +
        "עצמאית, ולעדכנם בהתאם. אי-ההתאמה מול נושא ה-Warranty Claim Processing 'Partners' (Maintenance " +
        "Management, 2025.001) טרם נפתרה; מומלץ לאמת ב-SE93 במערכת יעד חיה אם הקוד מנותב ל-BP, שכן לא בוצעה " +
        "בדיקה במערכת SAP חיה בסבב זה.",
      successor: "tx:BP",
    },
    xrefs: ["tx:BP", "tx:XK01", "tx:XK02"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) grep על XK03 במאגר: data/verification/transactions-auto.ts מכיל רשומה מיוצרת אוטומטית (ללא " +
      "הכרעת מעמד, הקשר בלבד) עם ציטוטי sap_help של נושא 'Partners' (Maintenance Management 2025.001; " +
      "Logistics, SAP ERP 6.18.latest) ואזכורי פריטי הפישוט; data/verification/transactions-b.ts מכיל xref " +
      "בלבד ל-tx:XK03 (מרשומת tx:MK03), ללא רשומה משלה. (2) חיפושים דרך scripts/sap-help-search.mjs: 'XK03 " +
      "Display Vendor Centrally' (21 תוצאות, ברירת מחדל S/4HANA On-Premise) העלה בעיקר נושאי תפקידי SAP MDG " +
      "(Specialist/Requester לספק וללקוח) המזכירים XK03 ברשימת טרנזקציות של תפקיד הרשאה, לא כטענת זמינות; " +
      "חיפוש האודיט 'Partners warranty claim XK03' החזיר את נושא 'Partners' (Maintenance Management, 2025.001) " +
      "כלשונו. (3) node scripts/fal-app.mjs --tcode XK03 --release S32OP: 'leading app(s): none; GUI app " +
      "entry: none'. הפלט ריק בגרסה זו (ממצא שלילי מתועד, לא קביעת היעדר); פריטי הפישוט שנקראו מפנים " +
      "לטרנזקציית BP. (4) פריטי פישוט נוספים שנקראו מ-scratchpad/official/: 'S4TWL - Business Partner " +
      "Approach' (2023 FPS03, 3.19, עמ' 154-155) נושא את אותה טבלה עם השורה 'Transactions that get redirected " +
      "to transaction BP' הכוללת את XK03; 'S4TWL - Specific fields on Business Partner' (2023 FPS03, 59.7, עמ' " +
      "1355-1356; 2025 FPS01, 13.14.1, עמ' 1274-1275; רכיב PSM-FG) מונה את XK03 בטבלה 'Transaction not " +
      "available in SAP S/4HANA' וקובע ש-'Business Partner transaction BP is now used to create, change or " +
      "display customer or vendor data', ללא שורת ניתוב. הם לא נכתבו כשורות evidence נפרדות. (5) קונפליקט לא " +
      "פתור: נושא 'Partners' (Maintenance Management, 2025.001), העוסק בשותפי אחריות ב-Warranty Claim " +
      "Processing, עדיין מנוסח כאילו XK01/XK02/XK03 זמינות; ייתכן תוכן שיורי שלא עודכן, אך הדבר לא נקבע ממקור " +
      "רשמי. (6) לא בוצעה בדיקה במערכת SAP חיה; לא נקראו בנפרד SAP Note 2265093 (מודפס בפריט 'S4TWL - Business " +
      "Partner Approach for SAP MDG') ו-SAP Note 2270420 (מודפס בפריט 'S4TWL - Specific fields on Business " +
      "Partner'), שכן הם דורשים S-user. לאימות: SE93 במערכת יעד, ופתרון הסתירה מול נושא ה-Partners. הרשומה " +
      "מחליפה עבור tx:XK03 את הרשומה האוטומטית ב-transactions-auto.ts (שהייתה ללא הכרעת מעמד). לפני כתיבתה " +
      "הציג report-coverage.mjs --ids עבור tx:XK03 סטטוס נגזר 'unchanged' ברמת repository_verified (ישן); חדש: " +
      "replaced, יורש tx:BP. ביקורת אדברסרית 2026-09-24: פריטי הפישוט מצוטטים בשמם, הטענה על ניסוח טבלאי זהה " +
      "בכל הפריטים הוסרה, נושא 'Partners' מתואר כנושא של Warranty Claim Processing, ה-release של שורות רשימת " +
      "הפישוט יושר ל-2025 FPS01, ופלט fal-app הריק נוסח כממצא שלילי מתועד. הרשומה אינה נושאת שדה reviewer, " +
      "כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MCVA",
    evidence: [
      MCVA_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.1 " +
          "S4TWL - Quality Management Information System (QMIS)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "הפריט הקודם באותה סדרה (Application Component QM-QC-IS) קובע נוסח זהה ל-9.6.8: QMIS מבוסס LIS, כולל את " +
          "MCVA, הוא חלק מ-compatibility scope עם זכויות שימוש מוגבלות ואינו target architecture; MCVA נוקבת בשורה " +
          "'MCVC MCVA MCXP MCXV MCXX MCXD MCXB MCXM MCXK MCXI MCXG' וגם תחת 'Other Terms'. עקביות הנוסח על פני שתי " +
          "גרסאות רשימת פישוט עוקבות (2023 FPS03, 2025 FPS01) מחזקת שמדובר בעמדה יציבה של SAP ולא באזכור חד-פעמי, " +
          "אך גם כאן אין מיפוי 1:1 ל-MCVA ספציפית.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App MCVA 'Inspection Lot KPIs - Overview by Supplier' (SAP GUI), release S32OP " +
          "(SAP S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MCVA')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "ספריית האפליקציות הרשמית של Fiori (scripts/fal-app.mjs MCVA --release S32OP) רושמת את MCVA עצמה " +
          "כאפליקציה 'Inspection Lot KPIs - Overview by Supplier' מטכנולוגיית SAP GUI, בסטטוס Published, רכיב " +
          "QM-QC-IS, תחת קטלוג טכני SAP_TC_QM_BE_APPS:S4QM, intent InspectionLot-displayKPIOverviewBySupplier, GUI " +
          "transaction מובילה ומקושרת MCVA. רשימת ה-releases ב-fal כוללת את S6OP (1610) עד S14OP (1809 FPS02) ואת " +
          "S18OP (2020) עד S32OP (2025 FPS01, המהדורה העדכנית On-Premise); מהדורות 1909 אינן מופיעות ברשימה. אין " +
          "predecessors ואין successors רשומים (שני השדות ריקים ב-fal). RIN notes: 3493254 (Front-End Server), " +
          "3671888 (Back-End Server).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MCVA",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מסווגת את MCVA במודול QM, תחום 'דיווח/ניתוח', שם עברי 'הודעות QM: סקירה', שם אנגלי 'QM " +
          "Notifications: Overview'; זהו סיווג מבנה פרויקטלי, לא ראיה רשמית. התווית 'QM Notifications: Overview' " +
          "אינה תואמת את השם הרשמי ב-Fiori Apps Library ('Inspection Lot KPIs - Overview by Supplier') ואת טבלה " +
          "18.1 בספר הלימוד שבמאגר (data/library/book5-full.json: בשורת Supplier, עמודת Inspection Lot, Overview " +
          "הוא MCVA, וסקירת ההודעות לספק היא MCVZ), ולכן התווית ב-data/tcode-catalog.ts דורשת תיקון.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MCVA",
      },
    ],
    status: {
      status: "compatibility_scope",
      he:
        "טרנזקציית MCVA מופיעה ב-Fiori Apps Library בשם Inspection Lot KPIs - Overview by Supplier (SAP GUI, " +
        "רכיב QM-QC-IS); התווית במאגר ('הודעות QM: סקירה') אינה תואמת את השם הרשמי. הספרייה מתעדת אותה כאפליקציה " +
        "מפורסמת (Published) במהדורות S6OP (1610) עד S32OP (SAP S/4HANA 2025 FPS01, המהדורה העדכנית הזמינה " +
        "On-Premise), למעט 1909, שאינה ברשימת ה-releases, ללא predecessor או successor רשומים. במקביל, שני פריטי " +
        "S4TWL עוקבים ('S4TWL - Quality Management Information System (QMIS)', 2023 FPS03 §34.1 ו-2025 FPS01 " +
        "§9.6.8) מגדירים את כל משפחת ה-QMIS (כולל MCVA בפירוש) כחלק מ-compatibility scope עם זכויות שימוש " +
        "מוגבלות (SAP Note 2269324, ID 473), שאינו target architecture, וקובעים שהטרנזקציות הללו יוסרו מה-Fiori " +
        "launchpad. שני המקורות אינם סותרים: MCVA נותרת פונקציונלית ומתועדת רשמית, אך אינה בכיוון הפיתוח העתידי. " +
        "אף מקור רשמי שנבדק אינו קובע successor ספציפי ל-MCVA; פריטי הפישוט מציגים קבוצת אפליקציות QM Analytics " +
        "כללית לכל 36 הטרנזקציות המוזכרות יחד, לא מיפוי אחד-לאחד.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MCVA_SIMPL2025,
      recommendedAction:
        "להמשיך להשתמש ב-MCVA לסקירת מדדי מנות בדיקה (Inspection Lot KPIs) לפי ספק במידת הצורך, מאחר שהיא מתועדת " +
        "כ-Published ב-Fiori Apps Library נכון ל-2025 FPS01, אך לא להשקיע בפיתוח Z-קוד או תלות חדשה סביבה: פריטי " +
        "ה-S4TWL מסמנים אותה כחלק מ-compatibility scope שאינו target architecture. מומלץ לבחון מול הצוות העסקי " +
        "את אפליקציות QM Analytics שהפריט מציג (לדוגמה Inspection Lot Analytics Last 365 Days F3239, Inspection " +
        "Lot Detailed Analytics F3273, Characteristic Analytics Last 365 Days F3383, Nonconformance Analytics " +
        "Last 365 Days F3584, Nonconformance Detailed Analytics F3583) כתחליף אפשרי לצורכי הדיווח, לאחר בדיקת " +
        "התאמה פונקציונלית פרטנית, מכיוון שאף מקור רשמי לא קבע מיפוי ישיר בין MCVA לאפליקציה ספציפית מביניהן. " +
        "לעקוב אחרי תוקף ה-compatibility scope לפי SAP Note 2269324 (דורש S-user, לא נקרא בסבב זה) ולאמת ב-SE93 " +
        "במערכת יעד שהטרנזקציה עדיין פעילה שם; לא בוצעה בדיקה במערכת SAP חיה.",
    },
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: (1) grep במאגר: data/tcode-catalog.ts (סיווג QM/דיווח-ניתוח), data/library/qm-textbook/ch18.ts " +
      "ו-data/library/book5-full.json (טבלת 18.1 Standard Analyses ב-QM, מציגה MCVA כ-Overview בשורת Supplier " +
      "תחת עמודת Inspection Lot (הודעות לספק: MCVZ/MCVP/MCVX) ולצידה MCVC/MCVE/MCVG/MCVI/MCVK/MCVM כתת-אנליזות " +
      "מקבילות), data/verification/transactions-auto.ts (רשומה אוטומטית קיימת ל-tx:MCVA, כל שדותיה " +
      "context:true, ללא הכרעת מעמד; הרשומה הזו מחליפה אותה), lib/route-manifest.generated.ts (MCVA קיימת " +
      "ב-tcodes, מאפשרת xref עתידי במידת הצורך). (2) שלושה חיפושי sap-help-search.mjs: 'MCVA quality " +
      "management information system' (21 תוצאות, ללא פגיעה ב-MCVA עצמה, כולן על Batch Management/FS-PM), 'QM " +
      "Notifications Overview MCVA' (21 תוצאות, עמודי QM כלליים ללא MCVA בפירוש), 'MCVA' עם --product SAP_ERP " +
      "(21 תוצאות, ללא פגיעה, כולן MCA/MCHA). מסקנה: שלושת החיפושים לא החזירו עמוד תיעוד ייעודי ל-MCVA, לא " +
      "ב-S/4HANA On-Premise ולא ב-ECC; זהו ממצא שלילי מתועד, לא קביעה שעמוד כזה אינו קיים. חיפוש רביעי 'QM " +
      "Analytics Fiori' אימת את הקשר הכללי לקטגוריית QM Analytics (What's New 1909, scope item 2V0) ללא פגיעה " +
      "ב-MCVA עצמה. (3) scripts/fal-app.mjs MCVA --release S32OP: החזיר רשומה מלאה (ראו evidence[2]); לא הורץ " +
      "sap-help-body.mjs כי אף סניפט חיפוש לא נגע ב-MCVA ישירות ולא היה גוף עמוד רלוונטי לקרוא מעבר למה " +
      "שה-snippet/fal כבר סיפקו. (4) שני פריטי הפישוט 'S4TWL - Quality Management Information System (QMIS)' " +
      "(2025 FPS01 §9.6.8, 2023 FPS03 §34.1) נקראו במלואם מ-scratchpad/official/SIMPL_OP2025.pdf.txt (שורות " +
      "45806-45877) ו-SIMPL_OP2023.pdf.txt (שורות 45061-45155). מה שלא אומת: (א) SAP Note 2269324 (מפרט את " +
      "מטריצת ה-compatibility scope ותוקפה) ו-SAP Note 2270193 לא נקראו בנפרד, דורשים S-user. (ב) לא אומת אם " +
      "קיימת אפליקציית Fiori ספציפית שנועדה כתחליף 1:1 ל-MCVA (Overview by Supplier) לעומת שאר הניתוחים " +
      "הסטנדרטיים לספק (MCVB עד MCVZ); הפריטים מדברים על כל 36 הטרנזקציות כקבוצה אחת מול 7 אפליקציות יחד. (ג) " +
      "לא בוצעה בדיקה במערכת SAP חיה (SE93/הרצת MCVA בפועל). (ד) התווית במאגר (data/tcode-catalog.ts#MCVA: " +
      "הודעות QM: סקירה) סותרת את השם הרשמי ב-Fiori Apps Library (Inspection Lot KPIs - Overview by Supplier) " +
      "ואת טבלה 18.1 בספר; נדרש תיקון רשומת המאגר. המידע מבוסס כולו על רשימות פישוט רשמיות שנקראו במלואן ועל " +
      "פלט מדויק של scripts/fal-app.mjs; אין נתון מומצא. ביקורת אדברסרית 2026-09-24: מספר הטרנזקציות תוקן ל-36 " +
      "(שלוש שורות של 12 בכל פריט), שמות האפליקציות הועתקו כלשונם ('Last 365 Days'), רשימת ה-releases תוארה " +
      "כפי שהודפסה (מהדורות 1909 אינן בה), תיאור MCVA הותאם לשם הרשמי 'Inspection Lot KPIs - Overview by " +
      "Supplier' במקום תווית המאגר, והקו המפריד הארוך הוסר. בכתיבה: ניסוח השלילה בסעיף (2) הוגבל לתוצאות " +
      "החיפושים, שם הפריט נוסף בסעיף (4), ורכיב QM-QC-IS נוסף לשורת ספריית ה-Fiori לפי פלט fal-app.mjs שהמבקר " +
      "הריץ מחדש. לפני כתיבת רשומה זו הציג report-coverage.mjs --ids עבור tx:MCVA את הרמה " +
      "verification_required (ישן); חדש: compatibility_scope. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MCXB",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MCXB",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim: "רשומת המאגר מתארת את MCXB כ'ניתוח תוצאות בדיקה QM', מודול QM, תחום 'דיווח/ניתוח'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MCXB",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App MCXB 'Inspection Characteristic KPIs - By Material' (SAP GUI), release S32OP " +
          "(S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MCXB')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "ספריית האפליקציות של Fiori רושמת את MCXB כאפליקציה 'Inspection Characteristic KPIs - By Material' " +
          "בסטטוס Published, מסוג SAP GUI, קטלוג טכני SAP_TC_QM_BE_APPS:S4QM, רכיב QM-QC-IS (Information System), " +
          "טרנזקציית GUI מובילה MCXB. רשימת הגרסאות המודפסת כוללת את 1610 עד 2025 FPS01 (S32OP), בלי גרסאות 1909. " +
          "השדות predecessors ו-successors ריקים ('predecessors: -; successors: -'), ולכן הספרייה אינה נוקבת " +
          "באפליקציה יורשת.",
        verificationLevel: "sap_official_verified",
      },
      MCXB_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.1 " +
          "S4TWL - Quality Management Information System (QMIS)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "הפריט 'S4TWL - Quality Management Information System (QMIS)' נוקב ב-MCXB ברשימת הקודים ('MCVC MCVA MCXP " +
          "MCXV MCXX MCXD MCXB MCXM MCXK MCXI MCXG') ומביא את אותו נוסח לגבי הקבוצה כולה: QMIS מבוסס LIS הוא חלק " +
          "מ-compatibility scope (SAP Note 2269324, מזהה 473), 'The following transactions are replaced by " +
          "corresponding Fiori apps in QM Analytics' ו-'The transactions will be removed in the SAP Fiori " +
          "launchpad for SAP S/4HANA'. הפריט מונה את אותן אפליקציות QM Analytics לפי קטגוריות, בלי לשייך אפליקציה " +
          "מסוימת ל-MCXB.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "compatibility_scope",
      he:
        "MCXB נמנה עם קודי QMIS (מבוסס LIS) שהפריט 'S4TWL - Quality Management Information System (QMIS)' (2025 " +
        "FPS01) מגדיר כחלק מ-compatibility scope עם זכויות שימוש מוגבלות ולא כארכיטקטורת היעד. אותו פריט קובע " +
        "שהטרנזקציות מוחלפות באפליקציות Fiori של QM Analytics ויוסרו מ-SAP Fiori launchpad, בלי לשייך אפליקציה " +
        "מסוימת ל-MCXB; ספריית Fiori רושמת את MCXB (SAP GUI) כ-Published ב-S32OP ללא successor.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MCXB_SIMPL2025,
      recommendedAction:
        "לבדוק ב-SAP Note 2269324 (מטריצת compatibility scope, מזהה 473) את תאריך התפוגה, ולתכנן מעבר לאפליקציות " +
        "QM Analytics שהפריט מונה (למשל בקטגוריית Characteristic analytics). את האפליקציה החלופית ל-MCXB עצמו יש " +
        "לאמת מול תהליך הדיווח בפועל, כי אף מקור רשמי שנקרא אינו משייך אפליקציה ל-MCXB.",
    },
    xrefs: [],
    lastVerifiedAt: DATE24,
    notes:
      "שני הפריטים 'S4TWL - Quality Management Information System (QMIS)' (2023 FPS03 ו-2025 FPS01) נקראו " +
      "במלואם מהטקסט המחולץ scratchpad/official/SIMPL_OP2023.pdf.txt ו-SIMPL_OP2025.pdf.txt. שניהם נוקבים " +
      "ב-MCXB, אך קובעים מעמד לקבוצת קודי QMIS כולה ולא לקוד בודד. חיפושים: sap-help-search.mjs 'Quality " +
      "Management Information System QMIS compatibility scope' (SAP_S4HANA_ON-PREMISE, 21 רשומות, 0 מצוטטות; " +
      "בהן 'Quality Evaluations (QMIS)', שאינה נוקבת ב-MCXB) ו-'MCXB' (21 רשומות, 0 מצוטטות, נושאי HR " +
      "ופיננסים). fal-app.mjs MCXB --release S32OP רץ בהצלחה: MCXB רשום כאפליקציית SAP GUI בסטטוס Published, " +
      "successors ריק. אפליקציות QM Analytics שהפריט מונה (למשל F3383, F3382, F2428) אינן " +
      "ב-data/fiori/apps.ts, ולכן לא נרשמו successor או xref ל-fiori:*. לא נבדק קשר תפעולי לקודים אחרים במשפחה " +
      "(MCXA, MCXC וכו'), ולכן אין xrefs. לא בוצעה בדיקה במערכת SAP חיה; SE93 במערכת היעד יאשר את קיום " +
      "הטרנזקציה בפועל. ביקורת אדברסרית 2026-09-24: נוספה רמת האימות לשורת ספריית ה-Fiori, רשימת הגרסאות תוארה " +
      "כפי שהודפסה (בלי 1909), מזהי אפליקציות QM Analytics שהפריט מונה נוספו לשורת הפריט, הפריטים מצוטטים " +
      "בשמם, ומשפט על טבלאות שאף מקור מצוטט אינו מדפיס הוסר. רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית " +
      "ל-tx:MCXB ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, verification_required לפי report-coverage.mjs " +
      "--ids; חדש: compatibility_scope). הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MCXC",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.1 " +
          "S4TWL - Quality Management Information System (QMIS)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE24,
        claim:
          "פריט 'S4TWL - Quality Management Information System (QMIS)' (2023 FPS03) קובע: 'The Quality Management " +
          "Information System (QMIS) based on Logistics Information System (LIS) is part of the SAP S/4HANA " +
          "compatibility scope, which comes with limited usage rights', ומפנה ל-SAP Note 2269324 (ID 473 במטריצת " +
          "התאימות). MCXC מופיע ברשימה שאחרי המשפט 'The following transactions are replaced by corresponding Fiori " +
          "apps in QM Analytics', והפריט מוסיף: 'The transactions will be removed in the SAP Fiori launchpad for " +
          "SAP S/4HANA'. הפריט מציג קבוצת אפליקציות QM Analytics (F3239, F3273, F3383, F3382, F2428, F3584, F3583) " +
          "בלי לשייך אפליקציה מסוימת לכל טרנזקציה.",
        verificationLevel: "sap_official_verified",
      },
      MCXC_SIMPL2025,
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App MCXC 'Inspection Lot KPIs - Quantity Overview by Material' (SAP GUI), release " +
          "S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MCXC')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "ספריית האפליקציות של Fiori רושמת את MCXC כאפליקציית SAP GUI בשם 'Inspection Lot KPIs - Quantity " +
          "Overview by Material', בסטטוס Published במהדורה S32OP (2025 FPS01), רכיב QM-QC-IS, קטלוג טכני " +
          "SAP_TC_QM_BE_APPS:S4QM, intent InspectionLot-displayKPIQuantityOverviewByMaterial. הרשומה אינה מציגה " +
          "predecessor או successor.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MCXC",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "הקטלוג הפנימי מגדיר את MCXC כטרנזקציית QM, אזור 'דיווח/ניתוח', שם אנגלי 'QM Vendor Analysis (Inspection " +
          "Lots)' ושם עברי 'ניתוח ספקים QM (מנות בדיקה)'. התווית הזו שונה מהכותרת הרשמית בספריית Fiori ('Quantity " +
          "Overview by Material'), ולכן מושא הניתוח דורש בדיקה ב-SE93 או בתפריט במערכת.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MCXC",
      },
    ],
    status: {
      status: "compatibility_scope",
      he:
        "פריט 'S4TWL - Quality Management Information System (QMIS)' קובע ש-QMIS מבוסס LIS הוא חלק " +
        "מ-compatibility scope עם זכויות שימוש מוגבלות ואינו ארכיטקטורת היעד, ומונה את MCXC (בספריית Fiori: " +
        "'Inspection Lot KPIs - Quantity Overview by Material') בין הטרנזקציות שמוחלפות באפליקציות Fiori ב-QM " +
        "Analytics ויוסרו מה-SAP Fiori launchpad. הפריט אינו משייך אפליקציה מסוימת ל-MCXC.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MCXC_SIMPL2025,
      recommendedAction:
        "לבדוק את תוקף ה-compatibility scope ב-SAP Note 2269324 (ID 473); לבחור במערכת היעד את אפליקציית QM " +
        "Analytics המתאימה לשימוש בפועל מתוך הקבוצה שהפריט מונה, ולאמת ב-SE93 את מושא הדוח (לפי חומר או לפי " +
        "ספק), שכן תווית המאגר והכותרת הרשמית שונות.",
    },
    xrefs: ["tx:MCXA", "tx:MCXB", "tx:MCXX", "tx:MCVA"],
    lastVerifiedAt: DATE24,
    notes:
      "מה נבדק: (1) הפריט 'S4TWL - Quality Management Information System (QMIS)' נקרא בטקסט המחולץ של שתי " +
      "רשימות הפישוט (scratchpad/official/SIMPL_OP2023.pdf.txt ו-SIMPL_OP2025.pdf.txt). האינדקס " +
      "audit/master-completion/simpl-tcode-index.json רושם את MCXC תחת פריט 34.1 ב-2023 FPS03 (שורות 45105 " +
      "ו-45154) ותחת פריט 9.6.8 ב-2025 FPS01 (שורות 45825 ו-45847). (2) node scripts/fal-app.mjs MCXC: רשומה " +
      "ב-S32OP בסטטוס Published, 'Inspection Lot KPIs - Quantity Overview by Material', ללא predecessor וללא " +
      "successor. (3) node scripts/sap-help-search.mjs \"MCXC\" --json (ברירת מחדל size 10, סקופ " +
      "SAP_S4HANA_ON-PREMISE): 10 רשומות, אף אחת אינה עוסקת ב-MCXC, 0 מצוטטות. (4) אותו חיפוש עם --product " +
      "SAP_ERP: 16 רשומות, אף אחת אינה עוסקת ב-MCXC, 0 מצוטטות. לא נקבע successor, כי הפריט וספריית Fiori אינם " +
      "משייכים ל-MCXC אפליקציה מסוימת. תיקון מול טיוטה קודמת: כתובת ה-PDF של 2025 הוחלפה בכתובת הרשמית " +
      "(2025.latest), תווית 'ניתוח ספקים' הוסרה מהסטטוס. הרשומה הדטרמיניסטית tx:MCXC ב-transactions-auto.ts " +
      "מוחלפת ברשומה זו (ישן: ללא הכרעת מעמד, verification_required לפי report-coverage.mjs --ids; חדש: " +
      "compatibility_scope). לא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MCXA",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MCXA",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מתארת את MCXA כ'ניתוח מנות בדיקה QM' (QM Inspection Lots Analysis), מודול QM, תחום " +
          "'דיווח/ניתוח'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MCXA",
      },
      MCXA_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.1 " +
          "S4TWL - Quality Management Information System (QMIS)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "פריט 34.1 'S4TWL - Quality Management Information System (QMIS)' (רכיב יישום QM-QC-IS, הערת Business " +
          "Impact 2270193) נוקב ב-MCXA פעמיים: ברשימה שבגוף הפריט 'The following transactions are replaced by " +
          "corresponding Fiori apps in QM Analytics' וברשימת Other Terms שבסוף הפריט, אחרי טבלת אפליקציות QM " +
          "Analytics. כל אחת משתי הרשימות מונה 36 קודים (12 MCO*, 12 MCV*, 12 MCX*), ו-MCXA ביניהם. הנוסח זהה " +
          "לפריט 9.6.8 ב-2025 FPS01 בנקודות הבאות: QMIS מבוסס LIS 'is part of the SAP S/4HANA compatibility scope, " +
          "which comes with limited usage rights' (SAP note 2269324, ID 473), 'is not the target architecture', " +
          "ו-'The transactions will be removed in the SAP Fiori launchpad for SAP S/4HANA.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Quality Evaluations (QMIS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/e30db753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "רשומת החיפוש (sap-help-search.mjs 'Quality Management Information System QMIS', סקופ " +
          "SAP_S4HANA_ON-PREMISE; דליברבל Single and Composite Roles (PFCG), versionId 2025.001, loio " +
          "e30db753128eb44ce10000000a174cb4, תאריך 2026-02-24) מציגה בתקציר 'Technical name: SAP_QM_QC_QMIS' " +
          "ו-'The single role Quality Evaluations (QMIS) covers functions for displaying key figures and " +
          "evaluations for original documents in … the QM component'. זה תקציר בלבד; גוף העמוד לא נקרא. התקציר " +
          "אינו נוקב ב-MCXA.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "compatibility_scope",
      he:
        "פריט 9.6.8 'S4TWL - Quality Management Information System (QMIS)' ברשימת הפישוט 2025 FPS01 מציב את QMIS " +
        "מבוסס LIS בהיקף התאימות של SAP S/4HANA עם זכויות שימוש מוגבלות, קובע שאינו ארכיטקטורת היעד, ונוקב " +
        "ב-MCXA בין 36 הטרנזקציות שמוחלפות באפליקציות QM Analytics ושיוסרו מ-SAP Fiori launchpad. ספריית " +
        "אפליקציות Fiori עדיין רושמת את MCXA ב-S32OP כאפליקציית SAP GUI בסטטוס Published; זהו מתח בין המקורות, " +
        "לא סתירה מוכחת.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MCXA_SIMPL2025,
      recommendedAction:
        "לסמן את MCXA כפונקציונליות בהיקף תאימות עם זכויות שימוש מוגבלות ולבדוק ב-SAP note 2269324 (ID 473) את " +
        "מועד התפוגה של היקף התאימות; לתכנן מעבר לאפליקציות QM Analytics שהפריט מונה, למשל Inspection Lot " +
        "Analytics Last 365 Days (F3239) ו-Inspection Lot Detailed Analytics (F3273); לבדוק במערכת היעד (SE93 " +
        "ותוכן ה-Launchpad) אם MCXA עדיין זמינה ב-Launchpad. לא בוצעה בדיקה במערכת SAP חיה.",
    },
    xrefs: ["tx:MCVA", "tx:QA32", "tx:QA33"],
    lastVerifiedAt: DATE25,
    notes:
      "שיטה: (1) במאגר, MCXA מופיעה ב-data/tcode-catalog.ts (מודול QM, 'דיווח/ניתוח') " +
      "וב-data/library/qm-textbook/ch18.ts (הקשר הדרכה, לא ראיה). (2) חיפוש 'MCXA' ב-sap-help-search.mjs בסקופ " +
      "SAP_S4HANA_ON-PREMISE: 21 רשומות, 0 צוטטו. (3) חיפוש 'Quality Management Information System QMIS' באותו " +
      "סקופ: 21 רשומות; צוטט תקציר אחד (Quality Evaluations (QMIS)); sap-help-body.mjs לא הופעל ולכן אין ציטוט " +
      "מגוף עמוד. (4) פריטי הפישוט 'S4TWL - Quality Management Information System (QMIS)' (9.6.8 ב-2025 FPS01, " +
      "34.1 ב-2023 FPS03) נקראו מהטקסט המחולץ ב-scratchpad/official/. (5) scripts/fal-app.mjs MCXA --release " +
      "S32OP הופעל ישירות. היסטוריה: הרשומה האוטומטית tx:MCXA ב-data/verification/transactions-auto.ts הביאה " +
      "את אותם מקורות כהקשר בלבד וללא הכרעת מעמד (verification_required לפי report-coverage.mjs --ids, נמדד " +
      "לפני הכתיבה) → רשומה זו קובעת compatibility_scope לפי פריט 9.6.8. טיוטה קודמת קבעה conflicting_sources " +
      "ומנתה כ-34 טרנזקציות → המבקר הוריד ל-compatibility_scope, והספירה תוקנה ל-36 לפי שני הפריטים. ביקורת " +
      "סבב ראשון טענה שלפריט 34.1 ב-2023 FPS03 אין סעיף Other Terms, והטיוטה המתוקנת כתבה זאת → בפועל הסעיף " +
      "מופיע בסוף הפריט, אחרי טבלת האפליקציות, עם אותם 36 קודים כולל MCXA. המתח: רשימת הפישוט אומרת " +
      "שהטרנזקציות יוסרו מ-SAP Fiori launchpad (לשון עתיד, בלי מועד), וספריית Fiori רושמת את MCXA כ-Published " +
      "ב-S32OP בלי successor. מה שיכריע: בדיקה במערכת S/4HANA 2025 FPS01 (SE93 ותוכן קטלוג " +
      "SAP_TC_QM_BE_APPS:S4QM ב-Launchpad). אפליקציות F3239, F3273, F3383, F3382, F2428, F3584, F3583 נזכרות " +
      "בפרוזה בלבד ואינן xref. לא בוצעה בדיקה במערכת SAP חיה. ביקורת אדברסרית חוזרת (2026-09-25) אישרה את " +
      "הטיוטה המתוקנת ללא בעיות וללא הורדות. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MCXX",
    evidence: [
      MCXX_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.1 " +
          "S4TWL - Quality Management Information System (QMIS)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "הפריט הקודם באותה סדרה (Application Component QM-QC-IS) נוקב ב-MCXX פעמיים, בשורה 'MCVC MCVA MCXP MCXV " +
          "MCXX MCXD MCXB MCXM MCXK MCXI MCXG' (שורות 45104 ו-45153 בטקסט המחולץ), ונושא נוסח זהה לגבי הקבוצה " +
          "כולה: חלק מ-compatibility scope עם זכויות שימוש מוגבלות, אינו target architecture, מוחלף באפליקציות QM " +
          "Analytics ויוסר מה-launchpad. הנוסח זהה בשתי גרסאות רשימת הפישוט (2023 FPS03, 2025 FPS01); גם כאן אין " +
          "מיפוי 1:1 ל-MCXX.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App MCXX 'KPIs - Defects by Material' (SAP GUI), release S32OP (SAP S/4HANA 2025 " +
          "FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MCXX')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "ספריית האפליקציות הרשמית של Fiori (scripts/fal-app.mjs MCXX --release S32OP) רושמת את MCXX עצמה " +
          "כאפליקציה 'KPIs - Defects by Material' מטכנולוגיית SAP GUI, בסטטוס Published, רכיב QM-QN (Quality " +
          "Notifications), תחת קטלוג טכני SAP_TC_QM_BE_APPS:S4QM, intent Material-displayKPIDefects, GUI " +
          "transaction מובילה ומקושרת MCXX. רשימת ה-releases כוללת את S6OP (1610) עד S32OP (2025 FPS01, המהדורה " +
          "העדכנית On-Premise), ללא גרסאות 1909. אין predecessors ואין successors רשומים (שני השדות ריקים). RIN " +
          "notes: 3493254 (Front-End Server), 3671888 (Back-End Server).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MCXX",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "רשומת המאגר מסווגת את MCXX במודול QM, תחום 'דיווח/ניתוח', שם עברי 'מדדי ביצוע: פגמים לפי חומר', שם " +
          "אנגלי 'KPIs - Defects by Material'; זהו סיווג מבנה פרויקטלי, לא ראיה רשמית. התווית תואמת את השם הרשמי " +
          "בספריית Fiori.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MCXX",
      },
    ],
    status: {
      status: "compatibility_scope",
      he:
        "MCXX נמנה עם קודי QMIS (מבוסס LIS) שהפריט 'S4TWL - Quality Management Information System (QMIS)' (2025 " +
        "FPS01 §9.6.8, ובנוסח זהה ב-2023 FPS03 §34.1) מגדיר כחלק מ-compatibility scope עם זכויות שימוש מוגבלות " +
        "ולא כארכיטקטורת היעד (SAP Note 2269324, ID 473). אותו פריט קובע שהטרנזקציות ברשימה, כולל MCXX, מוחלפות " +
        "באפליקציות Fiori של QM Analytics ויוסרו מ-SAP Fiori launchpad, בלי לשייך אפליקציה מסוימת ל-MCXX; ספריית " +
        "Fiori רושמת את MCXX עצמו (SAP GUI, 'KPIs - Defects by Material') כ-Published ב-S32OP ללא successor.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MCXX_SIMPL2025,
      recommendedAction:
        "לבדוק ב-SAP Note 2269324 (מטריצת compatibility scope, מזהה 473) את תוקף הזכויות המוגבלות, ולתכנן מעבר " +
        "לאפליקציית QM Analytics המתאימה לדיווח על פגמים לפי חומר (מתוך הקבוצה שהפריט מפנה אליה, לדוגמה " +
        "Nonconformance Analytics), לאחר בדיקת התאמה פונקציונלית פרטנית, מכיוון שאף מקור רשמי לא קבע מיפוי ישיר " +
        "בין MCXX לאפליקציה ספציפית מביניהן. לאמת ב-SE93 במערכת יעד שהטרנזקציה עדיין פעילה שם; לא בוצעה בדיקה " +
        "במערכת SAP חיה.",
    },
    xrefs: ["tx:MCXA", "tx:MCXB", "tx:MCXC", "tx:MCVA"],
    lastVerifiedAt: DATE25,
    notes:
      "שיטה: (1) grep במאגר: data/tcode-catalog.ts (סיווג QM/דיווח-ניתוח, תואם לשם הרשמי בספריית Fiori; " +
      "אי-התאמה לשם 'QM Notifications Analysis' שסופק כרמז למחקר צוינה ולא נעשה בה שימוש), " +
      "data/verification/transactions-auto.ts (רשומה אוטומטית קיימת ל-tx:MCXX, כל שדותיה context:true, ללא " +
      "הכרעת מעמד; רשומה זו מחליפה אותה; ישן: verification_required לפי report-coverage.mjs --ids, חדש: " +
      "compatibility_scope), lib/route-manifest.generated.ts (MCXX קיימת ב-tcodes). (2) חיפושי " +
      "sap-help-search.mjs: 'MCXX' עם --product SAP_S4HANA_ON-PREMISE (21 תוצאות, 0 פגיעה ב-MCXX, כולן " +
      "HCM/Retail/אבטחה), 'MCXX' עם --product SAP_ERP (21 תוצאות, 0 פגיעה, MCSX/כלליות), 'KPIs Defects by " +
      "Material QM Analytics' (21 תוצאות, כולל עמוד 'Quality Management' הכללי, 'Standard Analyses: Quality " +
      "Management Information System' ו-'Nonconformance Analytics' מ-What's New 1909, ללא פגיעה ישירה ב-MCXX). " +
      "מסקנה: החיפושים לא החזירו עמוד תיעוד ייעודי ל-MCXX, לא ב-S/4HANA On-Premise ולא ב-ECC; ממצא שלילי " +
      "מתועד, לא קביעה שעמוד כזה אינו קיים. לא הורץ sap-help-body.mjs, כי אף סניפט חיפוש לא נגע ב-MCXX ישירות. " +
      "(3) node scripts/fal-app.mjs MCXX --release S32OP: רשומה מלאה (ראו evidence[2]) כולל רכיב QM-QN, קטלוג " +
      "SAP_TC_QM_BE_APPS:S4QM, intent Material-displayKPIDefects; פרטים מלאים יותר מהרשומה האוטומטית הקודמת " +
      "(שם, סוג וסטטוס בלבד). (4) שני פריטי הפישוט נקראו במלואם: scratchpad/official/SIMPL_OP2025.pdf.txt " +
      "שורות 45806-45880 ו-SIMPL_OP2023.pdf.txt שורות 45061-45155 (אינדקס: " +
      "audit/master-completion/simpl-tcode-index.json מפנה ל-MCXX תחת 34.1/2023 ו-9.6.8/2025). מה שלא אומת: " +
      "(א) SAP Note 2269324 ו-2270193 לא נקראו בנפרד, דורשים S-user. (ב) לא אומתה אפליקציית Fiori ספציפית " +
      "שנועדה כתחליף 1:1 ל-MCXX מתוך קבוצת אפליקציות QM Analytics שהפריט מונה (F3239, F3273, F3383, F3382, " +
      "F2428, F3584, F3583); אף אחת מהן אינה ב-data/fiori/apps.ts, ולכן לא נרשם successor או xref ל-fiori:*. " +
      "(ג) לא בוצעה בדיקה במערכת SAP חיה (SE93/הרצת MCXX בפועל). (ד) הרמז 'QM Notifications Analysis' שסופק " +
      "למחקר אינו תואם את tcode-catalog.ts ('KPIs - Defects by Material') ואת השם הרשמי ב-Fiori Apps Library; " +
      "ייתכן שמדובר בבלבול עם MCVA ('QM Notifications: Overview' לפי תווית המאגר, ראה tx:MCVA). הרשומה אינה " +
      "נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MSC1N",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - Logistics Batch Management (SAP S/4HANA 2025 Feature Pack Stack 1 Simplification List, item " +
          "5.1.8, Application Component LO-BM-MD)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE25,
        claim:
          "פריט S4TWL - Logistics Batch Management קובע כי בהמרה ל-S/4HANA on-premise edition 1511 הטרנזקציות " +
          "הישנות MSC1, MSC2, MSC3 ו-MSC4 אינן זמינות עוד, וכי 'The functional equivalent in SAP S/4HANA, " +
          "on-premise edition 1511 are the following transactions: MSC1N Create Batch MSC2N Change Batch MSC3N " +
          "Display Batch MSC4N Display Change Documents for Batch'. הפריט מוסיף כי החל ממהדורה 4.6A תחזוקת רשומת " +
          "האצווה נבנתה מחדש והוקצתה לקודי ה-N, ושכבר אז הומלץ להשתמש בהם ('Already at this point in time it was " +
          "recommended to use the new transaction codes (MSC*N)'). לגבי MSC1N עצמו הפריט אינו קובע החלפה, הסרה או " +
          "שינוי: הוא מוזכר כשקול הפונקציונלי, ולא כקוד המושפע.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Batch Data (Single and Composite Roles (PFCG))",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/a976b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת החיפוש הרשמית (loio a976b6535fe6b74ce10000000a174cb4, versionId 2025.001) מציגה בסניפט: " +
          "'Activities in Batch Management Transaction Activity MSC1N Create Batch MSC2N Change Batch MSC3N " +
          "Display Batch MSC4N Display Changes MSC5N Mass Processing MSC6N ...'. לפי הסניפט, MSC1N מתועד בתפקידי " +
          "ה-PFCG של S/4HANA 2025 FPS01 כטרנזקציית 'Create Batch' ברשימת הפעילויות של ניהול אצוות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Batch Data (Single and Composite Roles (PFCG))",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/a976b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE25,
        claim:
          "אותה רשומת חיפוש, בסקופ SAP_ERP (6.0 EHP8 Latest, versionId 6.18.latest, loio זהה), מציגה סניפט זהה: " +
          "'Activities in Batch Management Transaction Activity MSC1N Create Batch MSC2N Change Batch MSC3N " +
          "Display Batch MSC4N Display Changes MSC5N Mass Processing MSC6N ...'. בצד ה-ECC (SAP ERP 6.0 EHP8) " +
          "MSC1N מופיע כ-'Create Batch' ברשימת הפעילויות של ניהול אצוות.",
        verificationLevel: "sap_official_verified",
      },
      MSC1N_FAL_S32OP,
    ],
    status: {
      status: "unchanged",
      he:
        "MSC1N (Create Batch) ממשיכה להתקיים ב-S/4HANA on-premise בלי שינוי שנמצא לו מקור רשמי. פריט הפישוט " +
        "S4TWL - Logistics Batch Management (5.1.8 ברשימת 2025 FPS01, 3.3 ברשימת 2023 FPS03) מסיר את הקודים " +
        "הישנים MSC1, MSC2, MSC3 ו-MSC4 ומציין את MSC1N כשקול הפונקציונלי שלהם, הקיים מאז מהדורה 4.6A. ספריית " +
        "אפליקציות ה-Fiori מציגה אותה כאפליקציית SAP GUI בסטטוס Published עד S/4HANA 2025 FPS01, ללא יורש רשום.",
      edition: "on-premise",
      release: "2025.001",
      source: MSC1N_FAL_S32OP,
      recommendedAction:
        "לא נדרשת פעולת המרה עבור MSC1N עצמו. יש להחליף כל שימוש קיים בקודים הישנים MSC1, MSC2, MSC3 ו-MSC4 " +
        "(תפריטים, CALL TRANSACTION, תפקידים) בקודי ה-N המקבילים (MSC1N, MSC2N, MSC3N, MSC4N), לפי פריט הפישוט " +
        "S4TWL - Logistics Batch Management.",
    },
    xrefs: [
      "tx:MSC2N",
      "tx:MSC3N",
      "tx:MSC4N",
      "table:MCH1",
      "table:MCHA",
      "fiori:F2462",
      "fm:BAPI_BATCH_CREATE",
      "cds:I_Batch",
    ],
    lastVerifiedAt: DATE25,
    notes:
      "רשומות המאגר: data/tx-intel.ts#MSC1N נותנת מודול QM ותחום 'ניהול אצוות (Batch Management)'; " +
      "data/tcode-catalog.ts#MSC1N נותנת מודול PP-PI, תחום 'אצוות' וכותרת אנגלית 'Create Batch'. פריט הפישוט " +
      "S4TWL - Logistics Batch Management נקרא במלואו בשתי רשימות הפישוט הרשמיות (2025 FPS01 פריט 5.1.8, 2023 " +
      "FPS03 פריט 3.3, באותו נוסח): הוא עוסק בהסרת MSC1/MSC2/MSC3/MSC4, ואת MSC1N הוא מזכיר כשקול הפונקציונלי. " +
      "Old → New: רשומה גנרית קודמת (data/verification/transactions-auto.ts#MSC1N, נוצרה ב-2026-09-24 ללא " +
      "הכרעת מעמד; לפני כתיבת רשומה זו הציג report-coverage.mjs --ids סטטוס נגזר 'unchanged' ברמת " +
      "repository_verified) מוחלפת ברשומה זו; חדש: unchanged. לא בוצעה בדיקה במערכת SAP חיה; תפקידי ה-PFCG " +
      "והקטלוגים נלקחו מפלט הכלים הרשמיים (sap-help-search.mjs, fal-app.mjs) ולא מקריאת גוף עמוד. הרשומה אינה " +
      "נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MSC2N",
    evidence: [
      MSC2N_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 – Feature Pack Stack 3 and SAP S/4HANA Cloud Private Edition " +
          "2023 – Feature Pack Stack 3 · item 3.3 S4TWL - Logistics Batch Management",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "פריט 3.3 (עמ' 127-128, אותו רכיב LO-BM-MD והערה 2267298) מדפיס נוסח זהה לזה שבפריט 5.1.8 ברשימת 2025 " +
          "FPS01: MSC1, MSC2, MSC3, MSC4 אינן זמינות ב-on-premise edition 1511, והמקבילה הפונקציונלית היא " +
          "MSC1N/MSC2N/MSC3N/MSC4N. שני הפריטים מדפיסים את אותה קביעה מילה במילה; MSC2N מופיעה בשניהם כמקבילה " +
          "הפונקציונלית, ואף אחד מהם אינו קובע לגביה החלפה או הוצאה משימוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App MSC2N 'Change Batch' (SAP GUI), release S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MSC2N')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "ספריית האפליקציות הרשמית של Fiori רושמת את MSC2N כאפליקציה 'Change Batch' מסוג SAP GUI, סטטוס " +
          "Published, ברכיב LO-BM (Batch Management), עם תפקידים SAP_BR_PRODN_SUPERVISOR_PROC (R0115-11) " +
          "ו-SAP_BR_QUALITY_TECHNICIAN (R0134), קטלוג עסקי SAP_SCM_BC_BATCH_MGMT וקטלוג טכני " +
          "SAP_TC_SCM_PP_BE_APPS:S4PP; טרנזקציית ה-GUI המובילה והקשורה היא MSC2N עצמה, ורשימת המהדורות משתרעת " +
          "מ-S6OP (1610) ועד S32OP (2025 FPS01) ללא predecessor/successor רשומים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating Batch Master Records | Extended Warehouse Management (EWM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/6f1076bd3394434e8891bbbaceb41575.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת החיפוש הרשמית (Extended Warehouse Management (EWM), S/4HANA On-Premise 2025 FPS01, versionId " +
          "2025.001, loio 6f1076bd3394434e8891bbbaceb41575) מציגה בסניפט: 'You can change batch master records in " +
          "the Change Batch app (transaction MSC2N).' כלומר MSC2N מתועדת בשמה כטרנזקציה שמאחורי אפליקציית Change " +
          "Batch בתיעוד S/4HANA 2025 FPS01; הטענה תחומה בסניפט, גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "פריט הפישוט 'S4TWL - Logistics Batch Management' (5.1.8 ברשימת 2025 FPS01, 3.3 ברשימת 2023 FPS03, שני " +
        "הפריטים בנוסח זהה) קובע כי MSC1, MSC2, MSC3 ו-MSC4 אינן זמינות ב-SAP S/4HANA on-premise edition 1511, " +
        "ומציין את MSC2N בשמה כמקבילה הפונקציונלית לטרנזקציית MSC2 שאינה זמינה עוד: 'MSC2N Change Batch'. ספריית " +
        "האפליקציות הרשמית של Fiori מאשרת ש-MSC2N היא אפליקציית SAP GUI קטלוגית (Published) עם תפקידים וקטלוג " +
        "עסקי, לאורך רצף מהדורות on-premise מ-1610 ועד 2025 FPS01, ותיעוד S/4HANA 2025 FPS01 מתאר אותה כטרנזקציה " +
        "שמאחורי אפליקציית Change Batch. אף מקור רשמי שנבדק בסבב זה אינו קובע לגבי MSC2N עצמה הגבלה, שינוי מבני " +
        "או הוצאה משימוש.",
      edition: "on-premise",
      release: "2025.001",
      source: MSC2N_SIMPL2025,
      recommendedAction:
        "להמשיך לעבוד עם MSC2N (אפליקציית Change Batch) לתחזוקת נתוני אצווה, ולוודא בפרויקט ההמרה שקוד מותאם " +
        "וממשקים אינם עדיין קוראים לטרנזקציות הישנות MSC1/MSC2/MSC3/MSC4 שאינן זמינות ב-S/4HANA on-premise; יש " +
        "להסב קריאות כאלה ל-MSC1N/MSC2N/MSC3N/MSC4N לפי הצורך. מומלץ לאמת ב-SE93 במערכת היעד שהקוד פעיל ושתפקידי " +
        "ה-Fiori (SAP_BR_PRODN_SUPERVISOR_PROC, SAP_BR_QUALITY_TECHNICIAN) מוקצים כנדרש, שכן לא בוצעה בדיקה " +
        "במערכת SAP חיה בסבב זה.",
    },
    xrefs: ["tx:MSC1N", "tx:MSC3N", "tx:MSC4N"],
    lastVerifiedAt: DATE25,
    notes:
      "שיטה: (1) grep על MSC2N במאגר: data/tcode-catalog.ts#MSC2N מסווג אותה במודול PP-PI, אזור 'אצוות', שם " +
      "אנגלי 'Change Batch' (סיווג פרויקטלי, לא ראיה רשמית); data/sap-notes.ts ו-data/troubleshooting-ext.ts " +
      "מזכירים MSC2N בהקשרי תחזוקת מאפייני אצווה ותהליכי איכות; data/cds-enrichment.ts#eccAlternative מציין " +
      "MSC1N/MSC2N/MSC3N כחלופת ECC לטבלאות MCH1/MCHA. רשומה זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:MSC2N " +
      "ב-data/verification/transactions-auto.ts (2026-09-24, ללא הכרעת מעמד; רשומות המאגר tx-intel.ts#MSC2N " +
      "במודול QM ו-tcode-catalog.ts#MSC2N, וסניפטים רשמיים מ-Single and Composite Roles (PFCG) ומ-Retail); ישן " +
      "→ חדש: ללא מעמד (לפני כתיבת רשומה זו הציג report-coverage.mjs --ids סטטוס נגזר 'unchanged' ברמת " +
      "repository_verified) → s4_native. (2) חיפושים דרך scripts/sap-help-search.mjs: 'MSC2N Change Batch' " +
      "(ברירת מחדל S/4HANA On-Premise, 21 תוצאות, כמה מדפיסות MSC2N בסניפט במפורש, כולל התוצאה שצוטטה); לא " +
      "הורצו חיפושים נוספים עם --product SAP_ERP, וההיסק על הצד ECC (זמינות עד 1511) נשען על פריט הפישוט עצמו " +
      "ולא על חיפוש ECC נפרד. לא הורץ sap-help-body.mjs; הסניפטים הספיקו לקביעת הטענות. (3) שני פריטי הפישוט " +
      "(2025 FPS01 §5.1.8, 2023 FPS03 §3.3) נקראו במלואם מהטקסט המחולץ " +
      "ב-scratchpad/official/SIMPL_OP2025.pdf.txt ו-SIMPL_OP2023.pdf.txt. (4) node scripts/fal-app.mjs MSC2N " +
      "--release S32OP הריץ בהצלחה והחזיר רשומה מלאה (Published, SAP GUI, roles, קטלוגים, רצף מהדורות מ-S6OP " +
      "עד S32OP, ללא predecessor/successor). מה שלא אומת: (א) מבנה השדות המלא של מסך MSC2N או הטבלה מאחוריו. " +
      "(ב) SAP Note 2267298 (מודפס בגוף שני פריטי הפישוט) לא נקרא בנפרד (דורש S-user). (ג) tx:MSC1, tx:MSC2, " +
      "tx:MSC3, tx:MSC4 ו-tx:MSC1N/MSC3N/MSC4N עצמן לא נחקרו בסבב זה; נכללו כ-xref בלבד כי הם מופיעים " +
      "ב-lib/route-manifest.generated.ts. (ד) לא בוצעה בדיקה במערכת SAP חיה; אין אימות SE93 לרישום התוכנית " +
      "מאחורי MSC2N. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MSC3N",
    evidence: [
      MSC3N_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 3.3 " +
          "S4TWL - Logistics Batch Management",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "פריט 3.3 'S4TWL - Logistics Batch Management' (Application Component LO-BM-MD, Note 2267298) בגרסת 2023 " +
          "FPS03 נוקב באותו נוסח מילה במילה כמו הפריט המקביל ב-2025 FPS01: MSC1, MSC2, MSC3, MSC4 אינם זמינים " +
          "ב-S/4HANA On-Premise 1511 ואילך, ו-MSC3N ('Display Batch') הוא ה-'functional equivalent' של MSC3 שממשיך " +
          "לשמש, ללא השפעה על התהליך העסקי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Batch Data | Single and Composite Roles (PFCG)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/a976b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת החיפוש הרשמית (Single and Composite Roles (PFCG), 2025 FPS01, versionId 2025.001, loio " +
          "a976b6535fe6b74ce10000000a174cb4, תאריך פרסום 2026-02-24) מציגה את MSC3N ברשימת הפעילויות של Batch " +
          "Management עם התיאור 'MSC3N Display Batch', כלומר MSC3N מופיע ברשימת הפעילויות של Batch Management " +
          "בתיעוד התפקידים (PFCG) של S/4HANA On-Premise 2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library · App MSC3N 'Display Batch' (SAP GUI), release S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MSC3N')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "ספריית האפליקציות הרשמית של Fiori רושמת את MSC3N כאפליקציית SAP GUI 'Display Batch' בסטטוס Published, " +
          "ברכיב LO-BM (Batch Management), עם קטלוג טכני SAP_TC_SCM_PP_BE_APPS:S4PP; היא מופיעה ברציפות מגרסת S6OP " +
          "(S/4HANA 1610) ועד S32OP (2025 FPS01), ושדות predecessors ו-successors ריקים, כלומר הספרייה אינה רושמת " +
          "קוד מחליף ל-MSC3N עצמו.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "MSC3N (תצוגת אצווה) הוא הקוד המומלץ לתצוגת נתוני אצווה מאז גרסת 4.6A, ופריט הפישוט נוקב בו כקוד שמשמש " +
        "ב-SAP S/4HANA On-Premise; פריט הפישוט S4TWL - Logistics Batch Management קובע שהקוד הישן MSC3 (ללא N) " +
        "הוסר וש-MSC3N הוא ה'functional equivalent' שלו, ואינו קובע כל שינוי או החלפה עבור MSC3N עצמו.",
      edition: "on-premise",
      release: "2025.001",
      source: MSC3N_SIMPL2025,
      recommendedAction:
        "להמשיך להשתמש ב-MSC3N לתצוגת אצווה; אם קיימת עדיין תלות בקוד הישן MSC3 (ללא N), לעדכן לפי פריט הפישוט " +
        "אל MSC3N.",
    },
    xrefs: ["tx:MSC1N", "tx:MSC2N", "tx:MSC4N", "tx:MSC3", "table:MCH1", "table:MCHA"],
    lastVerifiedAt: DATE25,
    notes:
      "החוקר קרא את פריט הפישוט עצמו (לא רק את הכותרת) בשני הקטעים המקומיים שהוצאו " +
      "מ-scratchpad/official/SIMPL_OP2025.pdf.txt (שורות 5388-5433) ו-SIMPL_OP2023.pdf.txt (שורות 7916-7963): " +
      "הפריט דן בארבעת הקודים הישנים MSC1-MSC4 ולא ב-MSC3N; MSC3N מוזכר בו כ-functional equivalent שממשיך " +
      "לשמש. הרצת שני חיפושי sap-help-search (MSC3N Display Batch, סקופ SAP_S4HANA_ON-PREMISE ו-SAP_ERP, 21 " +
      "תוצאות כל אחד) החזירה בשני הסקופים את עמוד ה-PFCG ‏Maintain Batch Data, שנוקב ב-MSC3N Display Batch " +
      "ברשימת הפעילויות (S/4HANA ‏2025.001; ECC ‏6.18.latest). הרצת fal-app.mjs MSC3N --release S32OP אישרה " +
      "זמינות רציפה מ-1610 עד 2025 FPS01 ללא predecessor/successor. לא בוצעה בדיקה במערכת SAP חיה; אין ראיה " +
      "ל-Fiori app מספרי (F-id) ייעודי ל-MSC3N מעבר לעטיפת ה-SAP GUI ברשימת האפליקציות. רשומה מחקרית זו מחליפה " +
      "את הרשומה שנוצרה אוטומטית ל-tx:MSC3N ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, ולפני כתיבתה הציג " +
      "report-coverage.mjs --ids סטטוס נגזר 'unchanged' ברמת repository_verified; חדש: unchanged). הרשומה אינה " +
      "נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:MSC4N",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 5.1.8 S4TWL - Logistics Batch " +
          "Management (LO-BM-MD)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE25,
        claim:
          "פריט 5.1.8 'S4TWL - Logistics Batch Management' (רכיב יישום LO-BM-MD, עמ' 104, Document Version 1.36) " +
          "קובע: 'The following transactions related to Logistics Batch Management are not available in SAP " +
          "S/4HANA, on-premise edition 1511: MSC1, MSC2, MSC3 and MSC4. The functional equivalent in SAP S/4HANA, " +
          "on-premise edition 1511 are the following transactions: MSC1N Create Batch, MSC2N Change Batch, MSC3N " +
          "Display Batch, MSC4N Display Change Documents for Batch. As of Release 4.6A, the maintenance of batch " +
          "master data has been completely reworked and assigned to new transaction codes.' לעניין התהליך העסקי " +
          "נכתב: 'No influence on the business process'. הפריט עוסק בקודים MSC1/MSC2/MSC3/MSC4 שאינם זמינים " +
          "ב-S/4HANA, ומונה את MSC4N (Display Change Documents for Batch) כתחליף הפונקציונלי ל-MSC4; הפריט מציין " +
          "שקודי MSC*N הומלצו לשימוש כבר מאז מהדורה 4.6A. Related Note 0002267298 מודפס בפריט. אותו נוסח מופיע גם " +
          "ברשימת 2023 FPS03, פריט 3.3.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Batch Data | Single and Composite Roles (PFCG)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/a976b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת החיפוש הרשמית (Single and Composite Roles (PFCG), SAP S/4HANA 2025 FPS01, versionId 2025.001, " +
          "loio a976b6535fe6b74ce10000000a174cb4, כותרת Maintain Batch Data) מונה את MSC4N ברשימת הפעילויות: " +
          "'Activities in Batch Management Transaction Activity MSC1N Create Batch MSC2N Change Batch MSC3N " +
          "Display Batch MSC4N Display Changes MSC5N Mass Processing MSC6N ...'.",
        verificationLevel: "sap_official_verified",
      },
      MSC4N_FAL_S32OP,
      {
        sourceType: "sap_help",
        sourceTitle: "Maintain Batch Data | Single and Composite Roles (PFCG)",
        url: "https://help.sap.com/docs/SAP_ERP/666b7ae6edfe4c05a90ac0150637f964/a976b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE25,
        claim:
          "בתיעוד SAP ERP 6.0 EHP8 (versionId 6.18.latest) אותה רשומה מונה את MSC4N Display Changes ברשימת " +
          "הפעילויות של ניהול אצוות: 'Activities in Batch Management Transaction Activity MSC1N Create Batch MSC2N " +
          "Change Batch MSC3N Display Batch MSC4N Display Changes MSC5N Mass Processing MSC6N ...'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#MSC4N",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "הקטלוג הפנימי (data/tcode-catalog.ts#MSC4N) מגדיר את MSC4N כטרנזקציית PP-PI, אזור 'אצוות', שם עברי " +
          "'הצגת מסמכי שינוי לאצווה' ושם אנגלי 'Display Change Documents for Batch'. רשומת data/tx-intel.ts#MSC4N " +
          "משייכת אותו למודול QM, אזור 'ניהול אצוות (Batch Management)'; שני התיוגים נשמרים כפי שהם במאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#MSC4N",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "MSC4N (Display Change Documents for Batch) מתועד הן ב-SAP ECC (תיעוד התפקידים של SAP ERP 6.0 EHP8) והן " +
        "ב-SAP S/4HANA On-Premise. פריט הפישוט 'S4TWL - Logistics Batch Management' (2025 FPS01, סעיף 5.1.8) " +
        "מונה אותו כתחליף הפונקציונלי ל-MSC4 שאינו זמין ב-S/4HANA, וספריית האפליקציות של Fiori רושמת אותו " +
        "כאפליקציית SAP GUI בסטטוס Published עד S32OP (2025 FPS01), ללא successor.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: MSC4N_FAL_S32OP,
      recommendedAction:
        "לאתר במערכת המקור שימוש בקודים הישנים MSC1/MSC2/MSC3/MSC4 (תפריטים, תפקידים, קוד לקוח) ולהפנות אותם " +
        "לקודי ה-N המקבילים, ובהם MSC4N במקום MSC4, לפי הפריט 'S4TWL - Logistics Batch Management'. לאמת במערכת " +
        "היעד את הקצאת MSC4N לתפקידים הרלוונטיים.",
    },
    xrefs: ["tx:MSC1N", "tx:MSC2N", "tx:MSC3N"],
    lastVerifiedAt: DATE25,
    notes:
      "מה נבדק: (1) הפריט 'S4TWL - Logistics Batch Management' נקרא בטקסט המחולץ של רשימת 2025 FPS01 " +
      "(scratchpad/official/SIMPL_OP2025.pdf.txt, שורות 5388-5433, פריט 5.1.8, עמ' 104) ושל 2023 FPS03 " +
      "(SIMPL_OP2023.pdf.txt, שורות 7916-7971, פריט 3.3); הנוסח זהה. (2) node scripts/sap-help-search.mjs " +
      "\"MSC4N\" --size 12 --json (סקופ SAP_S4HANA_ON-PREMISE): 21 רשומות; מצוטטת הרשומה 'Maintain Batch Data' " +
      "(loio a976b6535fe6b74ce10000000a174cb4, versionId 2025.001). (3) אותו חיפוש עם --product SAP_ERP: 21 " +
      "רשומות; מצוטטת אותה רשומה (versionId 6.18.latest) כשורת ECC נפרדת. (4) node scripts/fal-app.mjs MSC4N " +
      "--release S32OP: Published, LO-BM, ללא predecessor וללא successor; רשימת המהדורות מתחילה ב-S6OP (1610) " +
      "ומגיעה עד S32OP ל-On-Premise, וכוללת גם גרסאות PCE ואת S36 (2602) ו-S37 (2608). status.source הוא שורת " +
      "ה-fiori_library (evidence[2]). לא נקבע successor, כי אף מקור אינו רושם כזה. תיוג המודול במאגר אינו אחיד " +
      "(tcode-catalog.ts: PP-PI; tx-intel.ts: QM); הרכיב ב-FAL הוא LO-BM. לא בוצעה בדיקה במערכת SAP חיה. רשומה " +
      "מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:MSC4N ב-transactions-auto.ts (ישן: ללא הכרעת מעמד, " +
      "ולפני כתיבתה הציג report-coverage.mjs --ids סטטוס נגזר 'unchanged' ברמת repository_verified; חדש: " +
      "unchanged). הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:QA32",
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - QM WEB Workplace (MiniApps) based on ITS Services (Simplification List for SAP S/4HANA 2023 - " +
          "Feature Pack Stack 3, item 34.7)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "הפריט (עמ' 882-883) קובע ש-SAP Internet Transaction Server (ITS) ו-mySAP Workplace אינם זמינים ב-SAP " +
          "S/4HANA, ולכן ה-MiniApps המבוססים עליהם אינם זמינים; כחלופה הוא מפנה לטרנזקציות ה-QM המקבילות ב-SAP GUI " +
          "for HTML או לאפליקציות Web Dynpro בתפקיד SAP_SR_QUALITY_INSPECT_5. ברשימת 'Transaction not available in " +
          "SAP S/4HANA on-premise edition 1511' מופיעים, בין היתר, QA32WP ('QA32 - Call from Workplace/MiniApp'), " +
          "QPQA32 ('QM MiniApp Selection Variant'), WAO_QA32WP ('QA32 -Call from Workplace/MiniApp') ו-WAO_QPQA32 " +
          "('QM iView Selection Variant Insp.Lot'). QA32 מופיע בטקסט התיאור של QA32WP ו-WAO_QA32WP, ולא כקוד נפרד " +
          "ברשימה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle:
          "S4TWL - QM WEB Workplace (MiniApps) based on ITS Services (Simplification List for SAP S/4HANA 2025 - " +
          "Feature Pack Stack 1, item 9.6.4)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE25,
        claim:
          "אותו נוסח חוזר בגרסת 2025 FPS01 (עמ' 817-818): ITS ו-mySAP Workplace אינם זמינים ב-SAP S/4HANA ולכן " +
          "ה-MiniApps אינם זמינים. ברשימת 'Transaction not available in SAP S/4HANA on-premise edition 1511' " +
          "מופיעים QA32WP ('QA32 Call from Workplace/MiniApp'), QPQA32 ('QM MiniApp Selection Variant'), " +
          "WAO_QA32WP ('QA32 -Call from Workplace/MiniApp') ו-WAO_QPQA32 ('QM iView Selection Variant Insp.Lot'); " +
          "QA32 מופיע בטקסט התיאור של QA32WP ו-WAO_QA32WP, ולא כקוד נפרד ברשימה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Edit Inspection Lot - Transaction",
        url: "https://help.sap.com/docs/SAP_ERP/2ff9f2a003194e3b93e8201a0b44618f/76c2b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE25,
        claim:
          "רשומת החיפוש (Business Package for Quality Inspector 1.3, SAP ERP 6.0 EHP8) מתעדת iView בשם 'Edit " +
          "Inspection Lot' מסוג ITS/SAP GUI for HTML, ומציינת את QA32 כמקור הנתונים שלו ('Data origin Transaction: " +
          "QA32'), לפי תקציר רשומת החיפוש.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App QA32 'Process Inspection Lots - Worklist' (SAP GUI), release S32OP (SAP " +
          "S/4HANA 2025 FPS01, On-Premise)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('QA32')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "רשומת Fiori Apps Library למזהה 'QA32' מציגה אותו כאפליקציית SAP GUI בשם 'Process Inspection Lots - " +
          "Worklist', סטטוס Published, רכיב QM-PT-BD, תפקידים SAP_BR_QUALITY_ENGINEER, SAP_BR_QUALITY_MANAGER " +
          "ו-SAP_BR_QUALITY_TECHNICIAN, business catalog SAP_QM_BC_INSP_LOT_MNTRG, intent " +
          "InspectionLot-changeWorklist, GUI transaction מוביל QA32. שדה ה-releases כולל את S32OP (2025 FPS01, " +
          "On-Premise); predecessors ו-successors שניהם ריקים ('-'). חיפוש לפי tcode QA32 ב-S32OP מחזיר ארבע " +
          "אפליקציות מובילות: F2343 Manage Inspection Lots, F2360 Quality Engineer Overview, F2361 Quality " +
          "Technician Overview ו-QA32 עצמו.",
        verificationLevel: "sap_official_verified",
      },
      QA32_F2343_FAL_S32OP,
    ],
    status: {
      status: "fiori_alternative_available",
      he:
        "QA32 רשומה בספריית ה-Fiori במהדורה S32OP (SAP S/4HANA 2025 FPS01) כאפליקציית SAP GUI בשם Process " +
        "Inspection Lots - Worklist ללא אפליקציה מחליפה רשומה, ואפליקציית ה-Fiori F2343 Manage Inspection Lots " +
        "רשומה כמובילה עם הקוד QA32. פריט הפישוט S4TWL - QM WEB Workplace (MiniApps) based on ITS Services נוקב " +
        "ב-QA32WP, ב-WAO_QA32WP ובווריאנטי הבחירה QPQA32 ו-WAO_QPQA32, ולא ב-QA32 כקוד נפרד.",
      edition: "on-premise",
      release: "2025.001",
      source: QA32_F2343_FAL_S32OP,
      recommendedAction:
        "לפני ההמרה לבדוק שימוש ב-QA32WP, ב-WAO_QA32WP ובווריאנטי QPQA32 / WAO_QPQA32 (MiniApps ו-ITS של QM) " +
        "ולתכנן חלופה לפי הפריט: טרנזקציות ה-QM ב-SAP GUI for HTML או אפליקציות Web Dynpro. לבחון את F2343 " +
        "Manage Inspection Lots (תפקידים SAP_BR_QUALITY_ENGINEER, SAP_BR_QUALITY_TECHNICIAN, " +
        "SAP_BR_MAINTENANCE_PLANNER) כממשק Fiori לעבודה עם מנות בדיקה לצד QA32.",
    },
    xrefs: ["tx:QA33", "tx:QA03"],
    lastVerifiedAt: DATE25,
    notes:
      "מה נבדק: פריט הפישוט S4TWL - QM WEB Workplace (MiniApps) based on ITS Services נקרא ישירות מהטקסט " +
      "המחולץ (scratchpad/official/SIMPL_OP2023.pdf.txt, פריט 34.7, עמ' 882-883; SIMPL_OP2025.pdf.txt, פריט " +
      "9.6.4, עמ' 817-818). הקודים בפריט שבשמם מופיע QA32 הם QA32WP, WAO_QA32WP, QPQA32 ו-WAO_QPQA32; לא QA32 " +
      "כקוד נפרד. fal-app.mjs רץ שלוש פעמים ב-S32OP: '--tcode QA32' (ארבע אפליקציות מובילות: F2343, F2360 " +
      "Quality Engineer Overview, F2361 Quality Technician Overview ו-QA32), 'QA32' (רשומת ה-GUI, successors " +
      "ריק) ו-'F2343'. F2343, F2360 ו-F2361 אינם רשומים ב-data/fiori/apps.ts ולכן אינם ב-xrefs. " +
      "sap-help-search.mjs 'Edit Inspection Lot Transaction QA32' (--product SAP_ERP, 21 תוצאות) החזיר את " +
      "רשומת ה-ECC; לא נקרא גוף עמוד ב-sap-help-body.mjs, הטענה תחומה בתקציר. tx:QA33 ו-tx:QA03 נכללו כ-xrefs " +
      "לפי שורת 'related' ברשומת F2343 ונמצאו ב-lib/route-manifest.generated.ts. תיקון מביקורת: Old → New: " +
      "מקור הסטטוס הצביע על כתובת F2343 עם טענה על רשומת ה-GUI של QA32 → שתי שורות fiori_library נפרדות, " +
      "והסטטוס מצביע על שורת F2343; נוסח 'אך ורק' ושם עברי שאינו מודפס במקור הוסרו. לא בוצעה בדיקה במערכת SAP " +
      "חיה. רשומה מחקרית זו מחליפה את הרשומה שנוצרה אוטומטית ל-tx:QA32 ב-transactions-auto.ts (ישן: ללא הכרעת " +
      "מעמד, ולפני כתיבתה הציג report-coverage.mjs --ids סטטוס נגזר 'unchanged' ברמת repository_verified; חדש: " +
      "fiori_alternative_available). הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:QC20",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#QC20",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "רשומת המאגר מתארת את QC20 כ'יצירת תעודות איכות לאספקות' (Create Quality Certificates - For Deliveries), " +
          "מודול QM, תחום 'תעודות איכות'.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#QC20",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App QC20 'Create Quality Certificates - For Deliveries' (SAP GUI / SAP GUI), " +
          "release S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('QC20')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "ספריית האפליקציות של Fiori (scripts/fal-app.mjs QC20 --release S32OP) רושמת את QC20 בסטטוס 'Published', " +
          "סוג UI 'SAP GUI / SAP GUI', רכיב QM-CA-MD (Basic Data for Quality Certificates), תפקיד " +
          "SAP_BR_QUALITY_TECHNICIAN (R0134), קטלוג עסקי SAP_QM_BC_CERT_OUTGOING, GUI transactions: leading QC20. " +
          "רשימת ה-releases כוללת את S6OP (1610) ועד S32OP (2025 FPS01), בנוסף ל-PCE מ-S29PCE; S15OP ו-S16OP " +
          "(1909, 1909 FPS01) אינם מופיעים ברשימה. predecessor/successor אינם רשומים ('predecessors: -; " +
          "successors: -'). RIN notes: 3493254, 3671888.",
        verificationLevel: "sap_official_verified",
      },
      QC20_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.6 " +
          "S4TWL - ITS services in QM",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "פריט 34.6 (SAP Note 2270126, אותה כותרת) חוזר על אותו נוסח בגרסה מוקדמת יותר של הרשימה: 'Certificates: " +
          "No WebDynpro application available. However, existing QM transactions are still available, such as " +
          "QC20, QC21'. הנוסח עקבי בין 2023 FPS03 ל-2025 FPS01: QC20 מוזכר כטרנזקציה קיימת וזמינה, לא כמוחלפת או " +
          "מוסרת.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "QC20 נשאר זמין ב-SAP S/4HANA On-Premise, ופריט הפישוט אינו מטיל עליו שינוי. פריט הפישוט 'S4TWL - ITS " +
        "services in QM' (SAP Note 2270126) מסיר את שירותי ה-ITS/IAC הישנים של QM, ולעניין תעודות איכות קובע " +
        "שאין אפליקציית WebDynpro חלופית וש-'existing QM transactions are still available, such as QC20, QC21'. " +
        "ספריית אפליקציות Fiori רושמת את QC20 בסטטוס Published כאפליקציית SAP GUI ב-S32OP (2025 FPS01), ללא " +
        "predecessor או successor.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: QC20_SIMPL2025,
      recommendedAction:
        "אין צורך בפעולת מיגרציה עבור QC20 עצמו: הטרנזקציה זמינה ב-S/4HANA On-Premise (2025 FPS01) ורשומה " +
        "כאפליקציה בספריית Fiori. מה שהוסר הם שירותי ה-ITS/IAC הנפרדים (למשל QC40), לא QC20.",
    },
    xrefs: ["tx:QC21"],
    lastVerifiedAt: DATE25,
    notes:
      "נקראו שני הפריטים המלאים מתוך רשימות הפישוט שחולצו ב-scratchpad/official/SIMPL_OP2025.pdf.txt (שורה " +
      "45477) ו-SIMPL_OP2023.pdf.txt (שורה 45672), לפי audit/master-completion/simpl-tcode-index.json, והורץ " +
      "scripts/fal-app.mjs QC20 --release S32OP. חיפושים ב-scripts/sap-help-search.mjs ('S4TWL - ITS services " +
      "in QM', '2270126', 'ITS services in QM QC20', 'Create Quality Certificates Deliveries', סקופ " +
      "SAP_S4HANA_ON-PREMISE) לא החזירו רשומה שמצטטת את QC20 בשמו; מספר תוצאות לא נרשם. הרשומה מחליפה את " +
      "הרשומה האוטומטית ב-data/verification/transactions-auto.ts (ישן: ללא הכרעת מעמד, verification_required " +
      "לפי report-coverage.mjs --ids → חדש: unchanged לפי הפריט 'S4TWL - ITS services in QM'). לא בוצעה בדיקה " +
      "במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
  {
    id: "tx:QC21",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: tcode-catalog.ts#QC21",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE25,
        claim:
          "רשומת המאגר מתארת את QC21 כ'תחזוקת פרופיל תעודה' (Maintain Certificate Profile), מודול QM, תחום 'תעודות " +
          "איכות'. תיאור זה אינו תואם לשם הרשמי בספריית Fiori (Create Quality Certificate - For Inspection Lot) " +
          "ודורש תיקון במאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/tcode-catalog.ts#QC21",
      },
      {
        sourceType: "fiori_library",
        sourceTitle:
          "Fiori Apps Library · App QC21 'Create Quality Certificate - For Inspection Lot' (SAP GUI), release " +
          "S32OP (S/4HANA 2025 FPS01)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('QC21')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE25,
        claim:
          "ספריית האפליקציות הרשמית של Fiori רושמת את QC21 כאפליקציית SAP GUI בשם 'Create Quality Certificate - " +
          "For Inspection Lot', בסטטוס Published, ברכיב QM-CA-MD, עם טרנזקציית GUI מובילה QC21 וקטלוג עסקי " +
          "SAP_QM_BC_CERT_OUTGOING. רשימת המהדורות של הרשומה נפתחת ב-S6OP (1610) ומגיעה עד S32OP (2025 FPS01), " +
          "וכוללת גם מהדורות Private Cloud. S15OP ו-S16OP (1909, 1909 FPS01) אינן מופיעות בה. הספרייה אינה מציגה " +
          "predecessor או successor.",
        verificationLevel: "sap_official_verified",
      },
      QC21_SIMPL2025,
      {
        sourceType: "simplification_item",
        sourceTitle:
          "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 (document version 1.35) · item 34.6 " +
          "S4TWL - ITS services in QM",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE25,
        claim:
          "אותו פריט (S4TWL - ITS services in QM) ברשימת הפישוט של 2023 FPS03 חוזר על אותה קביעה: 'existing QM " +
          "transactions are still available, such as QC20, QC21', כחלופה לשירותי ה-ITS שהוסרו עבור תעודות (QC40 " +
          "ודומיו). אין בפריט קביעה נוספת לגבי QC21.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "unchanged",
      he:
        "QC21 (בספריית Fiori: 'Create Quality Certificate - For Inspection Lot', יצירת תעודת איכות למנת בדיקה) " +
        "נשארת זמינה ב-SAP S/4HANA on-premise. הפריט 'S4TWL - ITS services in QM' ב-2023 FPS03 וב-2025 FPS01 " +
        "מציין אותה כטרנזקציה קיימת, וספריית Fiori מציגה אותה כאפליקציית SAP GUI בסטטוס Published עד S32OP, ללא " +
        "predecessor וללא successor.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: QC21_SIMPL2025,
      recommendedAction:
        "להמשיך להשתמש ב-QC21 ליצירת תעודת איכות למנת בדיקה ב-S/4HANA on-premise, ולא להסתמך על שירותי ה-ITS " +
        "הישנים לתעודות (למשל QC40) שהוסרו לפי אותו פריט. יש לתקן את תיאור הקוד ב-data/tcode-catalog.ts, שאינו " +
        "תואם לשם הרשמי בספריית Fiori. לפני המרת המערכת, לאמת ב-SE93 במערכת היעד את קיום הטרנזקציה, התוכנית " +
        "והמסך.",
    },
    xrefs: ["tx:QC20"],
    lastVerifiedAt: DATE25,
    notes:
      "מחקר QM/QC21. היסטוריה: הרשומה הדטרמיניסטית (data/verification/transactions-auto.ts) איתרה את שני פריטי " +
      "'S4TWL - ITS services in QM' (2023 FPS03, 2025 FPS01) כמזכירים את QC21, אך לא קבעה מעמד (ישן: " +
      "verification_required לפי report-coverage.mjs --ids; חדש: unchanged). מחקר זה קרא את שני הפריטים " +
      "(scratchpad/official/SIMPL_OP2023.pdf.txt סביב שורה 45672, SIMPL_OP2025.pdf.txt סביב שורה 45477). שניהם " +
      "עוסקים בהסרת שירותי ITS עבור IAC (למשל QC40) ומזכירים את QC20 ו-QC21 כטרנזקציות קיימות שמשמשות חלופה, " +
      "לא כטרנזקציות שהפריט משנה. אי-התאמה בשם: המאגר מתאר את QC21 כ-'Maintain Certificate Profile', וספריית " +
      "Fiori (S32OP) מציגה 'Create Quality Certificate - For Inspection Lot' (Old → New); השם הרשמי הוא " +
      "המחייב, ותיאור המאגר ממתין לתיקון. fal-app.mjs QC21 --release S32OP: SAP GUI, Published, QM-CA-MD, ללא " +
      "predecessor או successor; רשימת המהדורות מ-S6OP עד S32OP אינה כוללת את S15OP ו-S16OP. חיפושי " +
      "sap-help-search.mjs ('QC21 Maintain Certificate Profile', 'QC21', 'ITS services in QM') לא החזירו רשומה " +
      "שמצטטת את QC21 ישירות; זו תוצאה שלילית מתועדת, לא הכרעה. לא בוצעה בדיקה במערכת SAP חיה; אימות מלא דורש " +
      "SE93 במערכת היעד. הרשומה אינה נושאת שדה reviewer, כמוסכמת הקטלוג.",
  },
];
