/* Project NEO · verification overlay — enhancements (`enh:badi:` / `enh:exit:`
   / `enh:technique:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02): 14 records carrying Tier-1 evidence from
   help.sap.com (search records with loio + versionId; two What's New / release-notes
   PDFs read in full; the static SAP Library 4.6C "Develop Enhancements" page read in
   full in EN and DE) alongside Tier-2 repository, migration-workbook and SAP PRESS
   evidence. Every claim is bounded by the snippet or the document actually read. No
   official S/4HANA page names most of the legacy customer exits, so those records
   either carry no authored status (the mapper derives one from the exits.ts ECC-vs-S/4
   block) or an explicit verification_required one. Refuted drafts and open repository
   conflicts live in audit/s4-enrichment/research-queue-enhancements.md.
   Batch 2 (written 2026-09-15, access date stamped 2026-09-14, const DATE14): 9 further
   records from the PP / PP-PI / cross-module extension families (PPCO0001, PPCO0007,
   CONFPP05, M61X0001, SAPLV01Z, MBCF0002, MB_MIGO_BADI, WORKORDER_GOODSMVT and the
   key-user-extensibility technique), each written from its auditor's fixedRecord with the
   listed downgrades already applied. Four of them mark the repository row conflicting_sources
   because the official pages name a different function-module, purpose or transaction scope;
   two carry an authored verification_required status so a derived verdict the overlay cannot
   support stops rendering beside an official pill. Six audited drafts were refuted at the
   gate and are queued, not written.
   Batch 3 (written and access-stamped 2026-09-21, const DATE21): the 8 extension-technique
   records that close the enh:technique family (customer-exit, classic-badi, new-badi,
   explicit-enhancement, implicit-enhancement, field-exit, bte, user-exit), each written from
   its auditor's fixedRecord with the listed downgrades applied. Two of them (customer-exit,
   field-exit) carry an authored verification_required status because no official page states the
   technique's S/4HANA standing; classic-badi is the only "replaced" status in the catalog and
   names enh:technique:new-badi as its successor; explicit-enhancement and user-exit mark the
   contradicting repository row conflicting_sources. Writer deviations from the fixedRecords, all
   measured against the official search service on 2026-09-21, are recorded in each record's
   notes: the ABAP platform product string is stored verbatim as "ABAP platform"; three snippet
   fragments the auditors marked truncated came back complete and are quoted in full; and the
   simplification-list negative for BTE is stated as a standalone-token count.
   Batch 4 (written and access-stamped 2026-09-21, const DATE21): the 7 PP / PP-PI extension
   records that close the catalog's production and MRP families (CONFPP01, PPCO0021, PCSD0002,
   MD_PLDORD_POST, MD_ADD_ELEMENTS, substitution-validation, transaction-variant). Five were
   written from their auditor's fixedRecord; MD_PLDORD_POST was re-derived from its verdict text
   with the six listed downgrades applied, and PCSD0002 is the submitted draft with exactly the
   two patched fields. Two of the seven (MD_PLDORD_POST, MD_ADD_ELEMENTS) join enh:exit:M61X0001 as
   the catalog's only "simplified" statuses, both anchored on item 9.5.2 "S4TWL - MRP in HANA" of the 2025 FPS01
   simplification list, whose rotated BAdI table was read with `pdftotext -raw` and cross-checked
   against the normally-typeset 2023 FPS3 printing; neither names a successor, because the AMDP
   BAdI PPH_MRP_RUN_BADI is not an id in this project's universe and no official page declares it
   a successor. CONFPP01 and PPCO0021 carry an authored verification_required status: no official
   S/4HANA or SAP ERP page names either enhancement, so the derived "changed" verdict from the
   exits.ts ECC-vs-S/4 block must not render beside an official pill. PCSD0002 marks the
   contradicting repository row conflicting_sources (the workbook and the catalog give the exit
   two different purposes, neither of which is the documented "Customer fields in item").
   transaction-variant carries six evidence entries, inside the catalog's measured 4-to-7 range
   (18 records at 4, 13 at 5, 6 at 6, and enh:exit:IMRC0001 at 7): the Restrictions page and the
   Variant Transactions page were added at the gate because the recommendation leans on them, and
   because the SE93 variant transaction is classified Modification while the variant itself is
   Customizing. Two audited drafts (enhancement-spot, vofm) were refuted at the gate and are
   queued, not written.
   Batch 5 (written and access-stamped 2026-09-22, const DATE22): the two re-drafted techniques that
   batch 4 refuted, enhancement-spot and vofm, each the audited draft with the verdict downgrades
   applied (neither verdict carried a fixedRecord). Both carry an authored "unchanged" status bounded
   to documentation continuity: the technique is documented on the SAP ERP and S/4HANA 2025 FPS01
   sides and no official source found describes a change. vofm keeps its repository row at
   verification_required for the Access Key, BAdI-preference and PP-example parts.
   Batch 6 (written 2026-09-25, access-stamped 2026-09-24, const DATE24): five audited deepenings of
   existing records (user-exit, customer-exit, explicit-enhancement, field-exit, IWO10009), each the
   auditor's fixedRecord, or the draft with the verdict downgrades applied where no fixedRecord was
   given (explicit-enhancement, field-exit). user-exit, customer-exit and explicit-enhancement each
   gain one SAP S/4HANA Cloud Public Edition row (2608.500) whose claim is bounded to the page text
   read with scripts/sap-help-body.mjs; none of those pages names the classic technique, which is
   recorded as a bounded negative and changes no status. IWO10009 gains the What's New 2022 SPS03
   row and the 2023 body reading; field-exit re-stamps its four rows after the 2026-09-24 re-check.
   Writer deviations: IWO10009 carries no reviewer field (no record in data/verification/** has one,
   and several records' notes say so); customer-exit bounds its absence statements to the text body
   read, because the user-exit auditor found an interactive diagram on the same page (loio
   533228e1e854433ab16d013f161ca509) that sap-help-body.mjs does not return.
   Batch 7 (written 2026-09-25, access-stamped 2026-09-24, const DATE24): four audited deepenings of
   existing records (IWO10012, IWO10018, QQMA0014, CONFPM01). IWO10012, IWO10018 and QQMA0014 are
   the auditor's fixedRecord; CONFPM01 is the draft with the verdict downgrades applied. Each gains
   one row: the Public Cloud Extensibility page (2608.500) for IWO10012, Find Maintenance Orders (Key
   User) for IWO10018, 'Objects Released for Developer Extensibility in Quality Management'
   (2023.000) for QQMA0014, and the Public Cloud page 'Extensibility: Maintenance Order Operation
   Confirmation' for CONFPM01. No status token, successor or xref changed; rows not re-read keep
   their original DATE. Writer deviations, listed in the queue file: the IWO10012 Extensibility claims
   are bounded to the text body read (same page and diagram as batch 6); notes history that the
   IWO10018 and CONFPM01 drafts dropped was restored from the live records; the CONFPM01
   WORKORDER_CONFIRM negative is bounded to S/4HANA pages, because enh:badi:WORKORDER_CONFIRM cites
   the R/3 Enterprise 4.70 release notes that name the BAdI. enh:exit:QQMA0001 was refuted at the
   gate and is queued, not written. */
import type { VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-02";
const DATE14 = "2026-09-14";
const DATE21 = "2026-09-21";
const DATE22 = "2026-09-22";
const DATE24 = "2026-09-24";

export const ENH_VERIFICATION: VerificationRecord[] = [
  {
    id: "enh:exit:IWO10009",
    aliases: ["EXIT_SAPLCOIH_009"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements (SAP Library - System Enhancements and Data Transfer)",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm?no_cache=true",
        product: "SAP R/3 4.6C",
        edition: "ecc",
        release: "R/3 4.6C",
        accessedAt: DATE,
        claim: "עמוד ספריית SAP לגרסת R/3 4.6C‏ 'Develop Enhancements (System Enhancements and Data Transfer)' מונה את ההרחבה IWO10009 בשם 'Maintenance order: Customer check for \"Saving\"' ברשימת הרחבות הזמנת התחזוקה (IWO10001 עד IWO10029). העמוד אינו נוקב בשם מודול הפונקציה ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Erweiterungen entwickeln (SAP-Bibliothek - Systemanpassungen und Datenübernahme)",
        url: "https://help.sap.com/saphelp_46c/helpdata/de/35/6f4073268b2239e10000009b38f984/content.htm?no_cache=true",
        product: "SAP R/3 4.6C",
        edition: "ecc",
        release: "R/3 4.6C",
        accessedAt: DATE,
        claim: "הגרסה הגרמנית של אותו עמוד ספריית SAP 4.6C מונה את IWO10009 בשם 'IH-Auftrag: Kundenprüfung zum Zeitpunkt \"Sichern\"'. גם עמוד זה אינו נוקב בשם מודול הפונקציה ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Use of User Data | Orders (CS-SE/PM-WOC-MO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/50c7b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim: "תיעוד Orders (CS-SE/PM-WOC-MO) לגרסת S/4HANA 2025 FPS01 (סניפט רשומת החיפוש, נקרא שוב ב-2026-09-24 בשאילתת 'IWO10009') מתאר Customer Exits של הזמנת התחזוקה (IWO10015 ו-IWO10016 מופיעות גם ברשימת 4.6C שבראיה הקודמת): 'You can use customer exit IWO10015 to request input options in a user data field' ו-'You can use customer exit IWO10016 to run your own checks for the user data fields', עם הפניה ל-Tools > ABAP Workbench > Utilities > Enhancements > Definition. IWO10009 אינה נזכרת בסניפט; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Further Processing Changes to Orders | What's New in SAP S/4HANA 2023",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/e59b1d858a57444a8f928dead0f11263.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE24,
        claim: "What's New in SAP S/4HANA 2023‏: 'The Business Add-In WORKORDER_UPDATE, which you can use to further process or prohibit changes to orders, has been enhanced with a new BAdI implementation'. גוף העמוד (נקרא ב-2026-09-24) מציין את מימוש ה-BAdI CO_SPLIT_COMPONENT_POST_GI ואת המתודה COMP_RQMT_DATE_TIME_SET, תחת רכיב היישום PP-SFC-EXE ופריט ההיקף BJ5 (Make-to-Stock Production - Discrete Manufacturing). הרשומה אינה קובעת ש-WORKORDER_UPDATE מחליף את IWO10009 ואינה מזכירה הזמנת תחזוקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Further Processing Changes to Orders | What's New in SAP S/4HANA 2022 SPS03",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/86956eb2f92146db85b12838f4affeb8.html?locale=en-US&state=PRODUCTION&version=2022.003",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.003",
        accessedAt: DATE24,
        claim: "What's New in SAP S/4HANA 2022 SPS03: 'The Business Add-In WORKORDER_UPDATE, which you can use to further process or prohibit changes to orders, has been enhanced with a new method COMP_RQMT_DATE_TIME_SET'. גוף העמוד (נקרא ב-2026-09-24) משייך את השינוי לרכיב היישום PP-SFC-EXE ולפריט ההיקף BJ5 (Make-to-Stock Production - Discrete Manufacturing). הרשומה אינה מזכירה הזמנת תחזוקה או את IWO10009.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת IWO10009",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת הקטלוג: Customer Exit במודול PM, אובייקט 'Enhancement IWO10009 · EXIT_SAPLCOIH_009', נקודת הפעלה בעת שמירת ההזמנה (IW31/IW32) לפני commit, טרנזקציות IW31, IW32, CMOD. בלוק ECC מול S/4HANA ברשומה: 'Customer Exit נתמך ב-S/4 (SAP GUI)' ו-'Clean Core מעדיף BAdI WORKORDER_UPDATE'. שם מודול הפונקציה ותחולת S/4HANA נשענים על רשומה זו בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#IWO10009",
      },
    ],
    xrefs: [
      "enh:badi:WORKORDER_UPDATE",
      "enh:technique:customer-exit",
      "enh:exit:IWO10012",
      "enh:exit:IWO10018",
      "tx:IW31",
      "tx:IW32",
      "tx:CMOD",
      "tx:SMOD",
      "table:AUFK",
      "table:AFIH",
    ],
    lastVerifiedAt: DATE24,
    notes: "היסטוריה (2026-09-02 → 2026-09-24). ממצא קודם (2026-09-02): חיפוש בשירות החיפוש הרשמי של SAP Help (scripts/sap-help-search.mjs, המוצרים SAP_S4HANA_ON-PREMISE ו-SAP_ERP) לא החזיר עמוד שמזכיר את IWO10009 או את EXIT_SAPLCOIH_009 בכותרת או בסניפט. לא נכתב מעמד S/4HANA מאומת: המעמד הנגזר לפי המיפוי של בלוק ECC מול S/4HANA ברשומת המאגר (data/exits.ts) היה 'משתנה ב-S/4HANA' (קיימת הערת שינוי), והוא נשאר ברובד המאגר. עמוד Logistics 'Enterprise Asset Management Part 4'‏ (loio 3346ac67364447a3ba2f4efa65b8c014, 2025.001) תואר לפי הסניפט כ-'Customer enhancements converted to BAdIs' עבור IMRC0001 עד IMRC0003 (נקודות מדידה); הסניפט לא כלל את IWO10009 וגוף העמוד לא נקרא. רשומת What's New 2023 צוטטה אז לפי הסניפט בלבד, עם הערה שאינה מונה שמות מתודות. חדש (2026-09-24): גוף העמוד של What's New 2023 נקרא דרך scripts/sap-help-body.mjs ומציין את CO_SPLIT_COMPONENT_POST_GI ואת COMP_RQMT_DATE_TIME_SET, ולכן ההערה הקודמת תוקנה בראיה המתאימה; נוספה ראיה נפרדת לעמוד What's New 2022 SPS03 (loio 86956eb2f92146db85b12838f4affeb8, 2022.003), שגם גופו נקרא. חיפושים שבוצעו ב-2026-09-24: 'IWO10009' (SAP_S4HANA_ON-PREMISE, 8 תוצאות בהרצת החוקר ו-9 בהרצה החוזרת של המבקר באותו יום: שלוש מ-Orders (CS-SE/PM-WOC-MO) 2025.001 שהסניפטים שלהן מזכירים את IWO10015, IWO10016, IWO10029 ו-IWO10011, והיתר ללא סניפט מתחומים אחרים); 'WORKORDER_UPDATE BAdI order changes' (SAP_S4HANA_ON-PREMISE, 21 תוצאות); 'maintenance order customer check saving exit' (SAP_ERP, 21 תוצאות); 'customer exits classic extensibility restriction' (SAP_S4HANA_CLOUD, 21 תוצאות); 'extensibility classic customer exits SAP GUI' (SAP_S4HANA_ON-PREMISE, 21 תוצאות). אף תוצאה אינה נוקבת ב-IWO10009 או ב-EXIT_SAPLCOIH_009 בכותרת או בסניפט, ואף תוצאה אינה קובעת ש-WORKORDER_UPDATE מחליף את IWO10009. עמודי WORKORDER_UPDATE שנבדקו: What's New 2023 ו-What's New 2022 SPS03 (גוף נקרא, PP-SFC-EXE), 'Check Production Order Release' (Production Engineering and Operations for Complex Assembly, loio 356578be84de41f2b78b1f36a98b0615, 2025.001, סניפט בלבד: יישום WORKORDER_UPDATE דרך SE18), וכן 'Check Projects for Parameter Effectivity' ו-'Check the Sequence of Network Activities' (אותו מדריך, 2025.001, סניפט: בדיקת autyp '20' לרשת). עמודי What's New שנבדקו משויכים ל-PP-SFC-EXE ולפריט ההיקף BJ5, ועמודי Complex Assembly לרשת פרויקט (autyp '20') או לשחרור הזמנת ייצור; אף אחד מהם אינו מזכיר הזמנת תחזוקה או את IWO10009 בכותרת, בסניפט או בגוף שנקרא. יתר תוצאות WORKORDER_UPDATE באותו חיפוש (למשל 'Order Split' ב-What's New 2023, 'BAdI Implementations for Online Check', עמוד Field Logistics ב-2023.003, 'Individual Object List' ב-Production Orders (PP-SFC)) נקראו ברמת הסניפט בלבד ואינן נוקבות ב-IWO10009. באותו חיפוש הופיעה גם 'BAdI: Evaluation of Maintenance Order Data Including Buffer' (What's New 2023 FPS02, loio 6bf41002c3dc4701aa525d0de9094417, 2023.002); הסניפט שלה עוסק בנתוני הזמנת תחזוקה אך אינו נוקב ב-WORKORDER_UPDATE או ב-IWO10009, וגוף העמוד לא נקרא. עמוד 'Enterprise Asset Management Part 4' הופיע בחיפוש זה עם סניפט על BAPI_ALM_ORDER_MAINTAIN ו-BAPI_ALM_ORDER_GET_DETAIL, ללא IWO10009; גוף העמוד לא נקרא. שם ההרחבה מאומת מעמודי הרשימה של ספריית SAP 4.6C, אנגלית וגרמנית (נקראו ב-2026-09-02); חמשת החיפושים של 2026-09-24 לא החזירו עמוד נוסף הנוקב ב-IWO10009, ומשפחת ה-Customer Exits של הזמנת התחזוקה מתועדת בסניפטים של Orders (CS-SE/PM-WOC-MO) 2025.001; סניפט 'Use of User Data' נקרא שוב ב-2026-09-24 והסניפט שלו זהה לציטוט הקודם. לכן לא נכתב authored status ולא הוגדר יורש; הקביעה ש-WORKORDER_UPDATE היא חלופת Clean Core ל-IWO10009 נשארת ברובד המאגר (data/exits.ts). לא בוצעה בדיקה במערכת SAP חיה: קיום EXIT_SAPLCOIH_009 ב-SMOD/CMOD והפעלתו בשמירת הזמנת תחזוקה דורשים אימות במערכת.",
  },
  {
    id: "enh:exit:IWO10012",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements (SAP Library - System Enhancements and Data Transfer)",
        product: "SAP R/3 (SAP Library 4.6C, Plant Maintenance and Customer Service)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
        accessedAt: DATE,
        claim: "העמוד נקרא במלואו (גרסת EN). תחת 'Area: Maintenance and service orders' הוא מונה את ההרחבה הסטנדרטית IWO10012 בשם 'Maintenance order: Priority treatment on central header'. באותה רשימה: IWO10007 'Maintenance order: Customer enhancement for permits in order' ו-IWO10009 'Maintenance order: Customer check for \"Saving\"'. העמוד מציין שכל customer exit מתועד בנפרד דרך 'Display documentation' בפעילות Develop enhancements; שם מודול הפונקציה של ה-Exit ופרמטריו אינם מופיעים בעמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Erweiterungen entwickeln (SAP-Bibliothek - Systemanpassungen und Datenübernahme)",
        product: "SAP R/3 (SAP Library 4.6C, גרמנית)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/de/35/6f4073268b2239e10000009b38f984/content.htm?no_cache=true",
        accessedAt: DATE,
        claim: "הגרסה הגרמנית של אותו עמוד ספריית SAP 4.6C (נקראה במלואה) מונה את IWO10012 בשם 'IH-Auftrag: Prioritätsbehandlung auf Kopf Zentral'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Use of User Data | Orders (CS-SE/PM-WOC-MO)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/50c7b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim: "תיעוד ההזמנות (CS-SE/PM-WOC-MO) לגרסת 2025 FPS01 עדיין מונה customer exits ממשפחת IWO1 לפעולת ההזמנה: 'You can use customer exit IWO10015 to request input options in a user data field' ו-'You can use customer exit IWO10016 to run your own checks for the user data fields', ומפנה ל-Tools, ABAP Workbench, Utilities, Enhancements, Definition. הסניפט שהוחזר אינו נוקב ב-IWO10012; אותו עמוד (loio 50c7b65334e6b54ce10000000a174cb4) מפורסם גם בספריית SAP ERP 6.18. הסניפט נקרא שוב ב-2026-09-24 והוא זהה לציטוט הקודם; אינו נוקב ב-IWO10012.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility | Extend and Integrate Your SAP S/4HANA Cloud Public Edition",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/533228e1e854433ab16d013f161ca509.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE24,
        claim: "טקסט גוף העמוד נקרא דרך scripts/sap-help-body.mjs (התרשים האינטראקטיבי שבעמוד לא נקרא). לפי העמוד ('consists of the following options'), ההרחבה ב-SAP S/4HANA Cloud Public Edition כוללת שלוש אפשרויות: Key User Extensibility (Released object types: BAdIs, CDS views), Developer Extensibility (BAdIs, classes, interfaces, CDS views, behavior definitions, authorization objects) ו-Side-by-Side Extensibility (BAPIs, IDocs, OData APIs, SOAP APIs, events, ב-SAP BTP). טקסט גוף העמוד שנקרא אינו מזכיר Customer Exits קלאסיים (SMOD/CMOD). זו עדות כללית על מסגרת ה-Extensibility ב-Public Cloud; הטקסט שנקרא אינו דן ב-IWO10012 או בהזמנת תחזוקה, ואינו קובע מפורשות שהטכניקה הקלאסית אינה זמינה שם. היעדר אזכור הוא ממצא תחום (bounded negative), לא הצהרת אי-זמינות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת IWO10012 (סותרת את הטקסט הקצר הרשמי)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת המאגר מתארת את IWO10012 כ'ברירות מחדל לפעולת פקודה' (ברירות מחדל וולידציה לפעולות הזמנת אחזקה, טריגר בעיבוד פעולות, טרנזקציות IW31 ו-IW32), עם בלוק ECC מול S/4HANA 'נתמך' / 'העדף BAdI', ומסומנת inferred: true. התיאור סותר את הטקסט הקצר בספריית SAP (טיפול בעדיפות בכותרת המרכזית של ההזמנה), ולכן אינו משמש כאן כראיה לתכלית ה-Exit; בלוק ECC מול S/4HANA שלו נשאר ברמת המאגר בלבד.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#IWO10012",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט שנגזר מחוברת ההגירה של PM, גיליון Custom Code, שורה 26 (סותרת את הטקסט הקצר הרשמי)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "גיליון ה-Custom Code של חוברת PM מסווג את IWO10012 כ-'User Exit' תחת '7. פקודות עבודה (פק\"ע)' בתיאור 'בדיקת אישורי עבודה (Permits) בפק\"ע', סטטוס 'To review', והמלצה 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני'. לפי הרשימה בספריית SAP, ההרחבה לאישורי עבודה היא IWO10007 ולא IWO10012; הסיווג, הסטטוס וההמלצה הם נתוני מאגר, התיאור סותר.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/sapData.pm.ts#customCode row 26 (IWO10012)",
      },
    ],
    xrefs: [
      "tx:IW31",
      "tx:IW32",
      "tx:CMOD",
      "tx:SMOD",
      "table:AUFK",
      "enh:exit:IWO10009",
      "enh:badi:WORKORDER_UPDATE",
      "enh:technique:customer-exit",
    ],
    lastVerifiedAt: DATE24,
    notes: "היסטוריה (2026-09-02 → 2026-09-24). מה שאומת מול help.sap.com: הטקסט הקצר של IWO10012 הוא 'Maintenance order: Priority treatment on central header' (עמוד Develop Enhancements בספריית SAP 4.6C, נקרא במלואו; בגרסה הגרמנית של אותו עמוד: 'IH-Auftrag: Prioritätsbehandlung auf Kopf Zentral'). אלו העמודים הרשמיים היחידים שנמצאו הנוקבים בשם ההרחבה, והם מתקופת R/3, לכן נרשמו במהדורה 'ecc' וגרסה 4.6C. שני תיאורי המאגר (data/exits.ts: 'ברירות מחדל לפעולת פקודה'; חוברת PM, גיליון Custom Code: 'בדיקת אישורי עבודה (Permits)') אינם תואמים לטקסט הרשמי; לפי אותו עמוד, Permits הם IWO10007 ובדיקת שמירה היא IWO10009. שם עברי מוצע לתיקון הקטלוג: 'הזמנת תחזוקה: טיפול בעדיפות בכותרת המרכזית'. ממצא 2026-09-02: לא נמצא עמוד S/4HANA (On-Premise, 100 עד 2025.001) או SAP ERP 6.18 הנוקב ב-IWO10012 בכותרת או בסניפט, בחיפושים IWO10012; IWO10012 maintenance order operation default values; customer exits maintenance order IWO10009 IWO10012; Enhancements Maintenance Order SMOD customer exits IWO1; Priority in the maintenance order header; Develop Enhancements standard enhancements Plant Maintenance Customer Service. חדש (2026-09-24): שלוש שאילתות נוספות ב-scripts/sap-help-search.mjs. 'IWO10012' (SAP_S4HANA_ON-PREMISE, 7 תוצאות): אף כותרת או סניפט אינם נוקבים ב-IWO10012; התוצאה הראשונה היא Use of User Data שכבר ברשומה. 'IWO10012 priority treatment central header maintenance order' (SAP_S4HANA_ON-PREMISE, 21 תוצאות): אף כותרת או סניפט אינם נוקבים ב-IWO10012; התוצאה 'Preparing PM/CS Orders for the CMC' (2025.001, loio 13f8c353b677b44ce10000000a174cb4) מציינת בסניפט 'The Priority field on the Create Order: Initial Screen and on the Header Data tabstrip on the Create XX order: Central Header screen is not used by the CMC functions'. היא עוסקת בשדה Priority בכותרת המרכזית אך אינה נוקבת ב-IWO10012, ולכן לא נכנסה כראיה. 'customer exits classic extensibility Public Cloud key user developer' (SAP_S4HANA_CLOUD, 21 תוצאות): הובילה לעמוד Extensibility (2608.500) שנוסף כראיה. טקסט גופו נקרא (התרשים האינטראקטיבי שבעמוד לא נקרא) ומונה Key User, Developer ו-Side-by-Side Extensibility ללא אזכור Customer Exits קלאסיים (SMOD/CMOD). זהו ממצא תחום על מסגרת ההרחבה ב-Public Cloud, לא קביעה על IWO10012, ולכן אינו מבסס authored status. תיעוד ההזמנות לגרסת 2025 FPS01 מונה חברים אחרים במשפחה (IWO10011, IWO10015, IWO10016, IWO10029), ואין בכך ראיה על IWO10012 עצמו. לכן לא נכתב סטטוס S/4HANA (כולל Private Cloud, שאין לגביה מקור נפרד מ-On-Premise ברשומה): קיום ההרחבה ב-SMOD במערכת S/4HANA, שם מודול הפונקציה של ה-Exit, פרמטריו ומעמדו בקטלוג הפישוט דורשים אימות במערכת SAP או פריט פישוט חתום-גרסה (ה-MCP של sc4sap לא התחבר; קטלוג הפישוט ו-SAP Notes חסומים בהתחברות S-user). המלצת 'העדף BAdI' וה-BAdI WORKORDER_UPDATE הם רובד מאגר; עמודי What's New (SAP S/4HANA 2022 SPS03 ו-2023) מתארים את WORKORDER_UPDATE כ-BAdI 'to further process or prohibit changes to orders', אך לא נמצא מקור רשמי הממפה את IWO10012 אליו, ולכן לא נרשם יורש. הראיה מעמוד Use of User Data נכללת רק כהקשר משפחתי ב-S/4HANA 2025.001. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "enh:exit:IWO10018",
    status: {
      status: "verification_required",
      he: "Customer Exit של תחזוקת מפעל לשדות משתמש בכותרת הזמנת התחזוקה. שמה ותפקידה של ההרחבה מאומתים מול ספריית SAP הרשמית לגרסה R/3 4.6C ('IWO10018 IH-Auftrag: User-Felder am Auftragskopf'); לא נמצא מקור רשמי מאוחר יותר הנוקב בשם. באף רשומת חיפוש של help.sap.com ל-S/4HANA On-Premise (2025 FPS01 וגרסאות קודמות) או ל-SAP ERP 6.18 לא מופיע השם IWO10018 בכותרת או בסניפט. לכן זמינות ההרחבה ב-S/4HANA (SMOD), מבנה ה-CI_AUFK ומודולי ה-EXIT_ שלה טרם אומתו. מה שכן מתועד ב-S/4HANA 2025 FPS01: שדות ייעודיים ללקוח בכותרת ההזמנה (שינוי המוני, פונקציה עסקית LOG_EAM_CI_12) ושדות לקוח דרך Key User Extensibility בהקשר העסקי Asset Management: Maintenance Order (EAMS_ORD), הן ביישום Manage Maintenance Orders והן ביישום Find Maintenance Orders.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לאמת במערכת S/4HANA חיה ב-SMOD (קיום ההרחבה IWO10018 ורכיביה: מודולי EXIT_ ומסך המשנה), ב-CMOD (פרויקט פעיל) וב-SE11 (מבנה CI_AUFK). להסבה: לשדות לקוח חדשים בהזמנה להעדיף את הנתיב המתועד ב-S/4HANA, Custom Fields בהקשר העסקי EAMS_ORD, כך שהשדות זמינים ביישומי Manage Maintenance Orders ו-Find Maintenance Orders וב-API של ההזמנה; לפיתוחי ECC קיימים לבדוק ב-ATC/SCMON; לוגיקת ולידציה של שדות הלקוח ניתן לשקול להעביר ל-BAdI WORKORDER_UPDATE, ואילו למסך המשנה עצמו לא נמצא במאגר או במקור רשמי תחליף BAdI. אין להציג את ההרחבה כזמינה או כמוחלפת ב-S/4HANA לפני בדיקת SMOD.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Erweiterungen entwickeln (SAP-Bibliothek - Systemanpassungen und Datenübernahme)",
        product: "SAP R/3 (SAP Library 4.6C, גרמנית)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/de/35/6f4073268b2239e10000009b38f984/content.htm?no_cache=true",
        accessedAt: DATE,
        claim: "עמוד ספריית SAP הרשמי לגרסה R/3 4.6C נקרא במלואו ומונה את ההרחבה בשמה המדויק: 'IWO10018 IH-Auftrag: User-Felder am Auftragskopf' (הזמנת תחזוקה: שדות משתמש בכותרת ההזמנה), לצד שאר הרחבות ההזמנה IWO10001 עד IWO10029, ובהן IWO10009 (בדיקת לקוח בזמן שמירה), IWO10015 ו-IWO10016 (שדות המשתמש בפעולה). העמוד אינו מזכיר CI_AUFK או מודולי EXIT_ ספציפיים, ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 12 | Logistics",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/adf6ac3fb6624eb3b934e145f6aed4d7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim: "תיעוד הפונקציה העסקית Enterprise Asset Management Part 12 ל-S/4HANA 2025 FPS01 קובע: 'You can perform a mass change in maintenance orders for additional order header data and customer-specific fields', ו-'The additional fields are located on various tab pages that correspond to the tab pages when processing the order header'. גוף העמוד (נקרא מחדש ב-2026-09-24) מאשר שקיימים ב-S/4HANA שדות ייעודיים ללקוח בכותרת הזמנת התחזוקה; הוא אינו נוקב בשם IWO10018.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Manage Maintenance Orders (Key User) | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/0b67655d18b7494baa813f1fa6caffb2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim: "לפי גוף העמוד (נקרא מחדש ב-2026-09-24), ניתן להוסיף שדות ליישום Manage Maintenance Orders בהרחבת Key User: 'You can add fields to the following UI elements using key user adaptation', בהקשר העסקי 'Asset Management: Maintenance Order (EAMS_ORD)'; בתרחישים העסקיים של היישום מופיעים גם ההקשרים Maintenance Plan (EAMS_MPLA) ו-Maintenance Item (EAMS_MPOS). זהו הנתיב המתועד ב-S/4HANA לשדות לקוח בהזמנת תחזוקה ב-Fiori; העמוד אינו מתייחס ל-Customer Exits.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Find Maintenance Orders (Key User) | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/a4dd584ee92142e5836c001f1007cd91.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim: "גוף העמוד (נקרא ב-2026-09-24 דרך sap-help-body.mjs) מפרט הוספת Custom Fields ליישום Find Maintenance Orders בהקשר העסקי Asset Management: Maintenance Order (EAMS_ORD), בלשוניות General Information, Operations, Organizational Data ו-Account Assignment של פרטי ההזמנה ובמסנני הרשימה, וכן Additional Standard Fields. העמוד אינו מזכיר Customer Exits או IWO10018.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "Configuring Plant Maintenance in SAP S/4HANA (SAP PRESS), פרק 9",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הספר מונה את ההרחבה ברשימת ה-Customer Exits של הזמנת התחזוקה כ-IWO10018: User fields in order header, לצד IWO10015 ו-IWO10016 לשדות המשתמש בפעולה. הספר אינו מפרט CI_AUFK, מודולי EXIT_ או סטטוס ב-S/4HANA.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/library/book1/ch9.sections.json",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP ERP (ECC) / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת המאגר מסווגת את IWO10018 כ-Customer Exit של תחזוקת מפעל להוספת שדות לקוח לכותרת הזמנת התחזוקה דרך מסך משנה (subscreen) ו-CI_AUFK, מופעלת ב-IW31 וב-IW32, וממליצה ב-S/4HANA להעדיף Key-User Extensibility (Custom Fields). פרטי CI_AUFK, מודולי ה-EXIT_ והמסך הנוסף מקורם במאגר בלבד ולא אומתו מול מקור SAP רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#IWO10018",
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:technique:key-user-extensibility",
      "enh:exit:IWO10009",
      "enh:badi:WORKORDER_UPDATE",
      "tx:IW31",
      "tx:IW32",
      "tx:CMOD",
      "tx:SMOD",
      "tx:SE11",
      "table:AUFK",
    ],
    lastVerifiedAt: DATE24,
    notes: "היסטוריה (2026-09-02 → 2026-09-24). ממצא קודם (2026-09-02): נותר מפורט להלן, ללא שינוי במסקנה. חדש (2026-09-24): הורצו מחדש ארבעה חיפושים בשירות הרשמי: (1) 'IWO10018' בהיקף ברירת המחדל SAP_S4HANA_ON-PREMISE: 9 תוצאות (8 בהרצה חוזרת ב-2026-09-25), אף אחת אינה נוקבת ב-IWO10018 בכותרת או בסניפט (התוצאה הראשונה, 'Use of User Data', 2025.001, loio 50c7b65334e6b54ce10000000a174cb4, מזכירה את IWO10015/IWO10016 ולא את IWO10018; זהה למצב שתועד ב-2026-09-02); (2) 'IWO10018 user fields order header customer exit' עם --product SAP_ERP: 21 תוצאות, ללא IWO10018 בכותרת או בסניפט (התוצאות הרלוונטיות ביותר: 'Use of User Data' ERP 6.18, ושורת 'Special Business Cases in Declarations' עם EXIT_SAPLV50E_* שאינם קשורים); (3) 'maintenance order header user fields Key User Extensibility custom fields': 21 תוצאות, כולל יישום Key User חדש שלא צוטט קודם: 'App Extensibility: Find Maintenance Orders (Key User)' (2025.001, loio a4dd584ee92142e5836c001f1007cd91), שנוסף כראיה נפרדת לעיל כתוספת הקשר לנתיב ה-Key User (לא כאישור ל-IWO10018 עצמה); (4) 'Simplification maintenance order customer exit header': 21 תוצאות, אף אחת אינה פריט Simplification List או עמוד הנוקב ב-IWO10018; ההתאמות הקרובות ביותר ('Maintenance Order: Changing the Header Notification in the Object List', What's New 1709/100) עוסקות בהודעת כותרת ברשימת אובייקטים ולא בהרחבת IWO10018. גופי העמודים Enterprise Asset Management Part 12, Manage Maintenance Orders (Key User) ו-Find Maintenance Orders (Key User) נקראו דרך sap-help-body.mjs; אף אחד מהם אינו נוקב ב-IWO10018. לא נמצאה רשומת What's New, Simplification Item, SAP Note או KBA הנוקבת ב-IWO10018 או ב-EXIT_ המתאים לה. סתירה פנימית במאגר שהמקור הרשמי מכריע (ללא שינוי): data/exits.ts מתאר את IWO10018 כשדות לקוח בכותרת ההזמנה (תואם לשם הרשמי ב-4.6C), בעוד גיליון ה-Custom Code של חוברת ה-PM (data/sapData.pm.ts, שורה 27 בגיליון) מתאר 'בדיקת/הרחבת רכיבים' ו-data/workbenches-ext.ts מתאר 'בדיקות בעת שחרור (REL)'; שני התיאורים האחרונים אינם תואמים לשם הרשמי ומומלץ לתקנם (החוברת מתוקנת רק במקור ה-xlsx). data/tx-intel.ts משייך את IWO10018 לטרנזקציות רשימות משימות (IA01, IA02, IA06, IA08, IA11, IA12) בשדה userExits; לפי המקור הרשמי זו הרחבת כותרת הזמנה (IW31/IW32) ולא הרחבת רשימת משימות, ומומלץ לתקן. ממצאי 2026-09-02 נוספים (ללא שינוי): גוף הגרסה שנקראה של 'Use of User Data' (ERP 7.0) מזכיר את IWO10015 ו-IWO10016 לשדות המשתמש בפעולה ולא את IWO10018, ולכן לא צוטט; הנושא 'Extensibility for Maintenance Order (Version 2) API' (APIs for Maintenance Management, 2025 FPS01, loio 221fe759ed294021a2a249ff04ddde83) מאשר את ההקשר EAMS_ORD גם לישות MaintenanceOrder ב-API. אין xref ליישום Fiori: מזהי ה-Fiori F2731/F5241 ליישום Manage Maintenance Orders נותרו בסתירה פתוחה ברשומות אחרות. חיבור ה-SAP MCP החי לא היה זמין בסשן זה; בדיקת SMOD/CMOD/SE11 לא בוצעה; לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "enh:exit:QQMA0001",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements | System Enhancements and Data Transfer (SAP Library 4.6C)",
        product: "SAP R/3 (SAP Library 4.6C)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/doc/saphelp_46c/4.6C/en-US/35/6f4073268b2239e10000009b38f984/content.htm?no_cache=true",
        accessedAt: DATE,
        claim: "העמוד נקרא במלואו (HTML סטטי של ספריית SAP, לא מעטפת JS). הוא מונה את ההרחבות הסטנדרטיות של Plant Maintenance and Customer Service לפי אזור, ובאזור 'Maintenance and service notifications' רושם: 'QQMA0001 User subscreen for notification header'. באותו אזור, 'Checks before saving notification' היא ההרחבה QQMA0014 ו-'Default values when adding notification' היא QQMA0025. העמוד אינו מזכיר את מודול הפונקציה EXIT_SAPLIQS0_001 ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
        conflictingEvidence: [
          {
            sourceType: "repository",
            sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
            product: "SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE,
            claim: "רשומת הקטלוג מתארת את QQMA0001 כ-Customer Exit ל'ולידציה/השלמה של נתוני הודעת אחזקה/איכות בשמירה', עם טריגר 'בעת שמירת הודעה (IW21/IW22/QM01)' ואובייקט 'Enhancement QQMA0001 · EXIT_SAPLIQS0_001'; בבלוק ECC מול S/4HANA: 'נתמך' ו'העדף BAdI NOTIF_EVENT_SAVE'. תיאור זה (בדיקה בשמירה) שונה מהטקסט הרשמי של ההרחבה (subscreen לכותרת ההודעה), והרשומה אינה מסומנת inferred.",
            verificationLevel: "repository_verified",
            repoRef: "data/exits.ts#QQMA0001",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Comparison of Classic BAdIs with Previous Techniques | Flexible Real Estate Management (RE-FX)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/3683a11901b74d8fa71f35d86abaaae1/eb3e7ceb940e11d295df0000e82de14a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "ראיה ברמת הטכניקה בלבד (העמוד אינו מזכיר QQMA0001): תיעוד S/4HANA 2025 FPS01 קובע לגבי הרחבות SMOD/CMOD, הטכניקה שאליה שייכת QQMA0001: 'Making enhancements using transactions SMOD/CMOD has the following disadvantages: This enhancement technique assumes a two-tiered system infrastructure'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements to the SAP System in the Area of PLM | Bill of Material (LO-MD-BOM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/2d0fc4528342494ee10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "ראיה ברמת הטכניקה בלבד (תחום PLM, לא הודעות תחזוקה): תיעוד S/4HANA 2025 FPS01 עדיין מתאר את מנגנון ה-Customer Exits: 'The customer exits are programmed as function module exits. You create an enhancement project by editing an enhancement that SAP has supplied' (כלשון הסניפט). אין בכך אמירה על זמינות QQMA0001 ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "בלופרינט ההגירה PM: גיליון 'Custom Code Check · User Exits / BAdIs' (customCode), שורה 17",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הבלופרינט מסווג את QQMA0001 כ-User Exit בקטגוריה '5. קטלוגים, קודים ופרופילים' עם התיאור 'בדיקות כלליות בקטלוגים/קודים (משותף QM-PM)', סטטוס 'To review' והפעולה 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני'. זהו תיאור שלישי, שונה מזה של exits.ts ומזה של העמוד הרשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#QQMA0001",
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:technique:classic-badi",
      "enh:exit:QQMA0014",
      "enh:badi:NOTIF_EVENT_SAVE",
      "tx:IW21",
      "tx:IW22",
      "tx:QM01",
      "tx:CMOD",
      "tx:SMOD",
      "table:QMEL",
    ],
    lastVerifiedAt: DATE,
    notes: "מקורות סותרים ברמת התיאור: ספריית SAP 4.6C (עמוד רשמי שנקרא במלואו) מגדירה את QQMA0001 כ-'User subscreen for notification header', בעוד data/exits.ts מתאר בדיקת נתונים בשמירה (ההרחבה הרשמית לבדיקות לפני שמירה היא QQMA0014) ו-data/domain-detail.ts מייחס ל-QQMA0014 'ברירות מחדל' (בעמוד הרשמי: QQMA0025). data/workbenches-ext.ts תואם לעמוד הרשמי (PBO/PAI על מסכי IW21/IW22, 'verify SE37'). ההכרעה דורשת בדיקה חיה ב-SMOD/CMOD (ה-MCP של sc4sap לא התחבר במושב זה). לא נמצא עמוד S/4HANA On-Premise או SAP ERP ב-help.sap.com המזכיר את QQMA0001 (שירות החיפוש: 'QQMA0001', 'EXIT_SAPLIQS0_001', 'customer exits maintenance notification QQMA', 'customer exits notifications QQMA0014 QQMA0025', 'QQMA' בשני המוצרים; WebSearch מוגבל לדומיינים הרשמיים), ולכן לא נכתב סטטוס: מעמד ההרחבה ב-S/4HANA, שם מודול הפונקציה EXIT_SAPLIQS0_001 והמלצת המעבר ל-BAdI NOTIF_EVENT_SAVE נשארים ברמת המאגר. הסטטוס המוצג ('משתנה ב-S/4HANA') נגזר מבלוק ה-ECC מול S/4HANA ברשומת exits.ts.",
  },
  {
    id: "enh:exit:QQMA0014",
    aliases: [
      "EXIT_SAPMIWO0_020",
    ],
    status: {
      status: "verification_required",
      he: "הרחבת לקוח (SMOD) לבדיקות לפני שמירת הודעה, לפי הספרייה הרשמית של R/3 4.6C. לא נמצא דף help.sap.com לגרסת S/4HANA (סט התיעוד 2025 FPS01, מהדורות What's New ורשימות הפישוט) הנוקב ב-QQMA0014 או במודול הפונקציה EXIT_SAPMIWO0_020, ורשימת המוצרים ב-KBA 2553412 ('SAP S/4HANA all versions') אינה הצהרת זמינות או שינוי. חיפוש נוסף (2026-09-24) אחר BAdI חלופי לבדיקות לפני שמירת הודעה לא העלה תוצאה: BAdI לאירוע Save שעלה בחיפוש מתועד לפקודות תחזוקה ולא להודעות, ולכן לא נרשם כאן; שני ה-BAdI שנמצאו במפורש להודעות איכות, QN_CHECK_BEFORE_DEL_HEADER ו-QN_CHECK_BEFORE_DEL_ITEM, מופעלים במחיקה לוגית ולא בשמירה. הפסיקה נשארת 'נדרש אימות נוסף'.",
      edition: "on-premise",
      release: null,
      source: {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements (SAP Library - System Enhancements and Data Transfer)",
        product: "SAP R/3 4.6C (SAP Library)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
        accessedAt: DATE,
        claim: "עמוד ספרייה סטטי מדור קודם (saphelp_46c, ללא loio/versionId; נפתח דרך הפניה ל-?no_cache=true), נקרא במלואו: עמוד הספרייה הרשמי (R/3 4.6C) מונה את ההרחבה QQMA0014 כ-'Checks before saving notification'. ערכי ברירת מחדל בעת הוספת הודעה שייכים להרחבה נפרדת באותו עמוד: QQMA0025 'Default values when adding notification'; שותף ברירת מחדל ל-QQMA0019 'Default partner when adding notification'.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "לתקן את שם הרשומה ותיאורה בקטלוג ההרחבות לפי התיעוד הרשמי (בדיקות לפני שמירת הודעה; מודול פונקציה EXIT_SAPMIWO0_020 לפי כותרת ה-KBA). לפני התחייבות בפרויקט: לאמת ב-SMOD/CMOD במערכת היעד שההרחבה קיימת ופעילה, לבדוק את הקוד ב-ATC/SCMON לפי המלצת הבלופרינט, ולבדוק אילו מסלולי יצירה מפעילים אותה (BAPI_QUALNOT_CREATE אינו קורא לה, לפי כותרת ה-KBA). לחלופת clean-core: נכון לגרסאות שנבדקו, לא אותר BAdI רשמי שמחליף את בדיקת ה-Save עבור הודעות; QN_CHECK_BEFORE_DEL_HEADER/ITEM (2023) מיועדים לבדיקות בעת מחיקה לוגית ואינם תחליף פונקציונלי לבדיקת השמירה.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements (SAP Library - System Enhancements and Data Transfer)",
        product: "SAP R/3 4.6C (SAP Library)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
        accessedAt: DATE,
        claim: "עמוד ספרייה סטטי מדור קודם (saphelp_46c, ללא loio/versionId; נפתח דרך הפניה ל-?no_cache=true), נקרא במלואו: עמוד הספרייה הרשמי (R/3 4.6C) מונה את ההרחבה QQMA0014 כ-'Checks before saving notification'. ערכי ברירת מחדל בעת הוספת הודעה שייכים להרחבה נפרדת באותו עמוד: QQMA0025 'Default values when adding notification'; שותף ברירת מחדל ל-QQMA0019 'Default partner when adding notification'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Erweiterungen entwickeln (SAP-Bibliothek - Systemanpassungen und Datenübernahme)",
        product: "SAP R/3 4.6C (SAP Library, גרמנית)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/de/35/6f4073268b2239e10000009b38f984/content.htm?no_cache=true",
        accessedAt: DATE,
        claim: "הגרסה הגרמנית של אותו עמוד ספריית SAP 4.6C (נקראה במלואה) מונה את QQMA0014 בשם 'Prüfungen vor dem Sichern einer Meldung', את QQMA0025 בשם 'Default-Werte beim Hinzufügen einer Meldung' ואת QQMA0019 בשם 'Default-Partner beim Hinzufügen einer Meldung'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "kba",
        sourceTitle: "2553412 - BAPI BAPI_QUALNOT_CREATE does not call the Enhancement QQMA0014 (User Exit EXIT_SAPMIWO0_020)",
        url: "https://me.sap.com/notes/2553412",
        kba: "2553412",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "כותרת ה-KBA קושרת את ההרחבה QQMA0014 למודול הפונקציה EXIT_SAPMIWO0_020 וקובעת ש-BAPI_QUALNOT_CREATE אינו קורא לה. רשימת המוצרים בתצוגה המקדימה כוללת 'SAP S/4HANA all versions' לצד SAP ERP, ECC ו-R/3, וסעיף Environment מונה SAP S/4HANA, on-premise. הכותרת ורשימת המוצרים נקראו מדף התצוגה המקדימה הפומבי (userapps.support.sap.com); סעיפי הסיבה והפתרון דורשים התחברות S-user ולא נקראו.",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Quality Notification: Extensibility | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/c7fae83def1b4f92a9f78af4e3848982.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE,
        claim: "רשומת What's New לגרסת 2022 מתעדת BAdI לערכי ברירת מחדל בהודעות איכות באפליקציית Custom Logic: 'BADI_QQM_NOTIF_DEFAULT_VAL_CLD (Set Default Values and Default Partners When Creating a Notification) This BAdI is used to set the values of header parameters and partners as default values when creating a quality notification'. לפי הכותרת (Quality Notification: Extensibility) והסניפט שהוחזר משירות החיפוש, הרשומה עוסקת בהודעות איכות; חיפוש \"QQMA0014\" בכלי החיפוש הרשמי אינו מחזיר רשומה זו. גוף העמוד לא נקרא (מעטפת JS).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Objects Released for Developer Extensibility in Quality Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/ea86d066e03b4b2ca0c2c0457cc98714.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE24,
        claim: "העמוד נקרא במלואו (deliverableMetadata + pagecontent, לא מעטפת JS). ברשימת האובייקטים שנוספו לפיתוח משוחרר (developer extensibility) ל-QM ב-S/4HANA 2023 מופיעים שני BAdI חדשים: 'Execution of Checks Before Logical Deletion of Quality Notifications' (QN_CHECK_BEFORE_DEL_HEADER) ו-'Execution of Checks Before Logical Deletion of Quality Notification Items' (QN_CHECK_BEFORE_DEL_ITEM), שניהם 'New' ומיועדים לבדיקות נוספות בעת מחיקה לוגית של הודעת איכות/פריט הודעה. העמוד אינו מזכיר QQMA0014 ואינו מגדיר BAdI לבדיקות בעת שמירה (Save); אירוע ה-Trigger המתועד לשני ה-BAdI הוא מחיקה, לא שמירה, כך שאין לראות בהם יורש פונקציונלי של QQMA0014.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "גיליון customCode של בלופרינט PM ('Custom Code Check · User Exits / BAdIs', SAP_PM_ECC6_to_S4_Migration.xlsx), שורה 19",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "שורת הבלופרינט (עמודות 'מודול / נושא', 'סוג (Type)', 'קוד / שם טכני', 'תיאור (Hebrew)', 'סטטוס בדיקה', 'המלצת מעבר ל-S/4'): '6. הודעות אחזקה (Notifications)', 'User Exit', QQMA0014, 'בדיקת לקוח לפני שמירת הודעה (Check before save)', סטטוס 'To review', פעולה 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני'. התיאור תואם את העמוד הרשמי ואינו תואם את שם הרשומה בקטלוג ההרחבות של הפרויקט (data/exits.ts: 'ברירות מחדל להודעה', מסומנת inferred).",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#QQMA0014",
      },
    ],
    xrefs: [
      "tx:IW21",
      "tx:IW22",
      "tx:QM01",
      "tx:CMOD",
      "tx:SMOD",
      "tx:SE37",
      "enh:exit:QQMA0001",
      "enh:badi:NOTIF_EVENT_SAVE",
      "enh:technique:customer-exit",
      "enh:technique:classic-badi",
      "enh:technique:key-user-extensibility",
      "table:QMEL",
      "fm:BAPI_ALM_NOTIF_CREATE",
      "cds:I_MaintenanceNotification",
    ],
    lastVerifiedAt: DATE24,
    notes: "שם הרשומה בקטלוג ('ברירות מחדל להודעה') אינו נתמך באף מקור. העמוד הרשמי (ספריית R/3 4.6C, אנגלית וגרמנית), כותרת KBA 2553412, שורת הבלופרינט ושני ספרי SAP PRESS שבמאגר (Configuring Plant Maintenance §9.3.4 ו-Plant Maintenance Business User Guide §10.4.4, סעיף 'Customer Exits': 'customized data checks when saving orders (IWO10009) or notifications (QQMA0014)') מתארים את QQMA0014 כבדיקות לפני שמירת הודעה; ההרחבה לערכי ברירת מחדל בהוספת הודעה היא QQMA0025 לפי אותו עמוד רשמי, ו-QQMA0025 אינה קיימת ב-data/exits.ts ובמניפסט המסלולים (השם מופיע כמחרוזת בלבד ברשימת ההרחבות של data/domain-detail.ts, שורה 74). גם data/workbenches-ext.ts מתאר את QQMA0014 כבדיקות לפני שמירה, בעוד data/domain-detail.ts חוזר על 'ברירות מחדל'. מומלץ לתקן ב-data/exits.ts את he, purpose, trigger, example ו-object (EXIT_SAPMIWO0_020 לפי כותרת ה-KBA) ואת domain-detail.ts. הראיה הרשמית לגרסת 2022 מתעדת BAdI לערכי ברירת מחדל בהודעות איכות ואינה יורש של QQMA0014. סבב מחקר נוסף (2026-09-24, עומק 2, יעד sap_official_verified): הורצו 5 שאילתות חדשות בכלי החיפוש הרשמי - 'QQMA0014', 'EXIT_SAPMIWO0_020', 'NOTIF_EVENT_SAVE', 'customer exit maintenance notification enhancement spot', 'quality notification check before saving BAdI' - וגם סבב עם --product SAP_ERP; נקראו שני גופי עמוד נוספים. אף רשומת S/4HANA שהחזיר שירות החיפוש אינה נוקבת ב-QQMA0014 או ב-EXIT_SAPMIWO0_020. הממצא החדש: עמוד 'Objects Released for Developer Extensibility in Quality Management' (S/4HANA 2023) מתעד שני BAdI חדשים למחיקה לוגית של הודעת איכות (QN_CHECK_BEFORE_DEL_HEADER / QN_CHECK_BEFORE_DEL_ITEM); מאחר שאלה מופעלים במחיקה ולא בשמירה, אין לראות בהם יורש ל-QQMA0014, וזה נרשם כפער מפורש ולא כסטטוס. BAdI לאירוע Save שעלה בחיפוש מתועד לפקודות תחזוקה ולא להודעות; הוא רלוונטי לרשומה enh:exit:IWO10009 ולא נוסף לכאן. סטטוס S/4HANA מכריע לא נכתב, והרשומה נושאת 'נדרש אימות נוסף' במפורש: לא נמצא דף help.sap.com לגרסת S/4HANA הנוקב ב-QQMA0014 (12 שאילתות בכלי החיפוש הרשמי ושתי שאילתות WebSearch מוגבלות-דומיין ב-2026-09-02, וסבב נוסף של 5-6 שאילתות ב-2026-09-24); הראיה היחידה להקשר S/4HANA היא רשימת המוצרים ב-KBA ('SAP S/4HANA all versions'), שאינה בדומיין Tier-1 ואינה הצהרת זמינות או שינוי. מה שחסר לסטטוס: דף Help או פריט פישוט חתום-גרסה הקובע קיום, שינוי או החלפה של QQMA0014 ב-S/4HANA, ואימות ב-SMOD/CMOD במערכת היעד (MCP של sc4sap לא זמין במושב זה). לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "enh:exit:CONFPM01",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements (SAP Library - System Enhancements and Data Transfer)",
        product: "SAP R/3 4.6C (SAP Library)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
        accessedAt: DATE,
        claim: "ספריית SAP לגרסה 4.6C מונה תחת 'Area: Maintenance order confirmations' את ההרחבות: 'CONF0001: Deactivation of functions', 'CONFPM01: Determine customer-specific default values', 'CONFPM02: Customer-specific entry checks 1', 'CONFPM03: Customer-specific check by operation selection', 'CONFPM04: Customer-specific entry checks 2', 'CONFPM05: Customer-specific additions when saving'. כלומר, לפי SAP, CONFPM01 מיועדת לקביעת ערכי ברירת מחדל ספציפיים ללקוח באישור הזמנת תחזוקה, ובדיקות הקלט שייכות ל-CONFPM02 ול-CONFPM04.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Confirmation List | Business Package for Maintenance Worker 1.61",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/a42179879e964bed83862a727d6191bb/fbdc468b695a4fc29a68c97275284093.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "תיעוד SAP ERP 6.0 EHP8 (Business Package for Maintenance Worker 1.61, נושא 'Confirmation List') קובע לפי רשומת החיפוש: 'You can use customer exits CONFPM02 and CONFPM04 to implement customer-specific authorization checks for confirmation'. בדיקות הרשאה באישור מתועדות על CONFPM02 ו-CONFPM04; ה-snippet ברשומת החיפוש אינו מזכיר את CONFPM01 (גוף העמוד לא נקרא).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Order Operation Confirmation | APIs for Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9a02a02d849d4b38a7320d94a71d2a22/7d6c7de7b9234747978552d4ca44466b.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim: "ב-S/4HANA On-Premise (2023 Latest) מתועד שירות OData לאישורי הזמנות תחזוקה: 'Technical name: API_MAINTORDERCONFIRMATION. This synchronous inbound service enables you to create new maintenance order confirmations and cancel confirmations'. רשומת החיפוש אינה מזכירה Customer Exits; היא מובאת כהקשר S/4HANA לערוץ יצירת אישורים שאינו עובר דרך מסכי IW41/IW42.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility: Maintenance Order Operation Confirmation | Overview of Changes in Extensibility Objects, SAP S/4HANA Cloud Public Edition",
        product: "SAP S/4HANA Cloud",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/f9ba73d1b8c543c2bd2ba1666271af86/fba520fc50964a04bf1ee385d2496ed1.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE24,
        claim: "גוף העמוד (נקרא ב-2026-09-24 דרך scripts/sap-help-body.mjs, SAP S/4HANA Cloud Public Edition 2608 Latest) קובע: 'As a key user, you can extend the OData service API_MAINTORDERCONFIRMATION according to your business needs... using the business context Maintenance Order Operation Confirmation...'; בטבלת הישויות מופיעה הישות MaintOrderConfirmation עם Business Context 'Maintenance Order Confirmation (EAMS_AFRU)'. זהו מנגנון Key User Extensibility (הוספת Custom Fields ב-OData) עבור נתוני אישור הזמנת תחזוקה ב-Public Cloud; העמוד אינו מזכיר Customer Exits, BAdI, ואת CONFPM01 בשמה, ואינו עוסק בולידציה/ברירות מחדל אלא בהוספת שדות מותאמים. מובא כהקשר נפרד ומתויג ל-Public Cloud בלבד: אין בו קביעה על מעמד CONFPM01.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת המאגר מתארת את CONFPM01 כ'בדיקות באישור אחזקה': ולידציה/לוגיקה באישור פעולות הזמנת תחזוקה ב-IW41/IW42 לפני רישום, עם דוגמה של חסימת אישור שעות, ובבלוק ECC מול S/4HANA: 'נתמך.' ו-'Clean Core → BAdI WORKORDER_CONFIRM'. תיאור זה סותר את תיאור SAP, שלפיו CONFPM01 קובעת ערכי ברירת מחדל ובדיקות הקלט הן CONFPM02 ו-CONFPM04.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#CONFPM01",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Develop Enhancements (SAP Library - System Enhancements and Data Transfer)",
            product: "SAP R/3 4.6C (SAP Library)",
            edition: "ecc",
            release: "4.6C",
            url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
            accessedAt: DATE,
            claim: "ספריית SAP לגרסה 4.6C מונה תחת 'Area: Maintenance order confirmations' את ההרחבות: 'CONF0001: Deactivation of functions', 'CONFPM01: Determine customer-specific default values', 'CONFPM02: Customer-specific entry checks 1', 'CONFPM03: Customer-specific check by operation selection', 'CONFPM04: Customer-specific entry checks 2', 'CONFPM05: Customer-specific additions when saving'. כלומר, לפי SAP, CONFPM01 מיועדת לקביעת ערכי ברירת מחדל ספציפיים ללקוח באישור הזמנת תחזוקה, ובדיקות הקלט שייכות ל-CONFPM02 ול-CONFPM04.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:badi:WORKORDER_CONFIRM",
      "enh:exit:CONFPP01",
      "tx:IW41",
      "tx:IW42",
      "tx:IW44",
      "tx:CMOD",
      "tx:SMOD",
      "fm:BAPI_ALM_CONF_CREATE",
      "table:AFRU",
      "fiori:F2730",
    ],
    lastVerifiedAt: DATE24,
    notes: "היסטוריה (2026-09-02 → 2026-09-24). ממצא 2026-09-02: אין סטטוס מחובר; בחיפושי help.sap.com שבוצעו (CONFPM01, CONFPM02, CONFPM05, customer exit confirmation maintenance order, Develop Enhancements, Confirmation List) לא אותר עמוד של SAP S/4HANA On-Premise או של SAP ERP 6.0 EHP8 המזכיר את CONFPM01 בשמה; המקור הרשמי היחיד לתיאורה הוא ספריית SAP לגרסה 4.6C. זמינות ההרחבה ב-S/4HANA ושמות ה-Function Exits שלה דורשים אימות ב-SMOD במערכת (ה-MCP ל-ABAP לא היה זמין). סתירה פתוחה: המאגר (data/exits.ts, וברשומות הנגזרות ב-data/domain-detail.ts, data/transactions.ts, data/consultant-notes.ts, data/troubleshooting.ts, data/centers/debugging.ts, data/process-guides.ts) מציג את CONFPM01 כבדיקות באישור; לפי SAP היא לערכי ברירת מחדל, ובדיקות הקלט הן CONFPM02 ו-CONFPM04 (ו-CONFPM05 לתוספות בשמירה). מומלץ לתקן את שם הרשומה, המטרה והדוגמה, ולהוסיף את CONFPM02, CONFPM04 ו-CONFPM05 לקטלוג. BAdI WORKORDER_CONFIRM כתחליף Clean Core: במאגר הוא משויך ל-PP (CO11N/COR6N); הפעלתו באישור הזמנת תחזוקה דורשת אימות ב-SE18, ולכן לא נרשם כאן successor. חדש (2026-09-24): חמישה חיפושים ממוקדים דרך scripts/sap-help-search.mjs: 'CONFPM01' (SAP_S4HANA_ON-PREMISE, 18 תוצאות: אף אחת אינה נוקבת ב-CONFPM01 בכותרת או בסניפט; הקרובות ביותר עוסקות ב-CONFPP05/CONFPP07 של PP-SFC), 'WORKORDER_CONFIRM BAdI' (SAP_S4HANA_ON-PREMISE, 21 תוצאות: אף תוצאה אינה נוקבת ב-WORKORDER_CONFIRM או ב-CONFPM01), 'customer exit CONFPM01 maintenance order confirmation' (SAP_S4HANA_ON-PREMISE, 21 תוצאות: התגלה עמוד 'Preparation and Customizing' 2025 FPS01 עם נתיב IMG 'Enhancements in Order Confirmation → Customer Specific Input Checks When Saving', אך גוף העמוד (נקרא) עוסק ב-EXIT_SAPLCORF_105/CONFPP05 של PP-SFC, לא ב-PM וב-CONFPM01), 'key user extensibility maintenance order confirmation' (SAP_S4HANA_CLOUD, 21 תוצאות: איתר את עמוד ה-Public Cloud Extensibility שנוסף כראיה רביעית), 'released extension points maintenance order confirmation cloud' (SAP_S4HANA_CLOUD, 21 תוצאות: 'Objects Released for Developer Extensibility in Maintenance Management' 2308.500; גוף העמוד נקרא, מונה CDS Views ו-Business Object Interface לנתוני הזמנת תחזוקה, ללא BAdI או Customer Exit הקשור לאישור/ולידציה; לא נוסף כראיה כי אינו נוגע ל-CONFPM01). שני גופי עמוד נקראו במלואם (Preparation and Customizing; Extensibility: Maintenance Order Operation Confirmation). אף חיפוש לא הניב עמוד רשמי S/4HANA או SAP ERP הנוקב ב-CONFPM01 בשמה מעבר לספריית 4.6C הקיימת; הסתירה מול data/exits.ts (המתאר CONFPM01 כבדיקות באישור, בעוד SAP מתאר אותה כערכי ברירת מחדל, ובדיקות הקלט הן CONFPM02/CONFPM04) נותרה פתוחה וללא פתרון. הפרדת מהדורות: On-Premise: עמוד ה-IMG של 2025 FPS01 שנקרא (PP-SFC, CONFPP05) מתעד את טכניקת ה-Customer Exit (SMOD/CMOD) באישורי ייצור, לא ב-PM ולא ב-CONFPM01; Private Cloud: לא נבדק מקור ייעודי; Public Cloud: לא נמצא נתיב Customer Exit קלאסי בחיפושים שבוצעו; המנגנון המתועד לנתוני אישור הזמנת תחזוקה הוא Key User Extensibility על OData API_MAINTORDERCONFIRMATION (Custom Fields, הקשר עסקי EAMS_AFRU), שהוא הוספת שדות ולא ולידציה/ברירת מחדל, ולכן אינו נרשם כ-successor או כ-clean-core alternative ל-CONFPM01 עצמה. BAdI WORKORDER_CONFIRM (רובד המאגר, data/exits.ts) לא אותר באף עמוד S/4HANA רשמי שנבדק ב-2026-09-24 או ב-2026-09-02 (הרשומה enh:badi:WORKORDER_CONFIRM מצטטת את הערות השחרור של SAP R/3 Enterprise 4.70 הנוקבות בו, ברמת legacy_context_only); לכן אינו נרשם כ-xref מאומת רשמית (נשאר כ-xref כי רשומת המאגר data/exits.ts#CONFPM01 מפנה אליו, אך אינו נרשם כ-successor). לא נכתב authored status: הראיה החדשה אינה נוגעת ל-CONFPM01 עצמה, וסתירת המאגר נותרה ללא הכרעה רשמית. לא בוצעה בדיקה במערכת SAP חיה: קיום EXIT_ / SMOD-CMOD עבור CONFPM01 ב-S/4HANA וזמינות ה-BAdI WORKORDER_CONFIRM דורשים אימות במערכת.",
  },
  {
    id: "enh:exit:IPRM0001",
    aliases: ["IPRM0001 (תזמון תכנית)"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Optimizing the Maintenance Plan | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/17a9ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "עמוד ה-Maintenance Planning של S/4HANA 2025 FPS01 קובע: 'The table describes how you can use customer exits to adjust the functions of the maintenance plan to better meet the individual requirements of your company'. הסניפט שהוחזר משירות החיפוש מונה את IPRM0003 (שדות לקוח לפריט התחזוקה, לשונית 'Customer exit: Item') ואת IPRM0004 (EXIT_SAPLIPWP3_004, בדיקות לקוח בשמירת תוכנית תחזוקה). שירות החיפוש החזיר את העמוד לשאילתה 'IPRM0001', אך IPRM0001 עצמו אינו מופיע בסניפט; שורת הטבלה שלו לא נראתה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Optimizing the Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/05a9ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "עמוד התאמת התזמון של S/4HANA 2025 FPS01 מייחס את קביעת המועדים המתוכננים ל-IPRM0002: 'You can use this customer exit to specify the next planned dates for performance-based and time-based maintenance plans. This exit consists of several function modules' (בהם EXIT_SAPLIPM5_002 לתוכניות מבוססות זמן), ואת מועדי תוכניות אסטרטגיה מבוססות ביצועים ל-IPRM0005. לתוכניות מונים מרובים העמוד מונה את ה-BAdIs ‏IPRM_MCP_DATE_I_PAST ו-IPRM_CHECK_UPD_SCHED. IPRM0001 אינו נזכר בסניפט שהוחזר.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Optimizing the Maintenance Plan | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/11825b10747e4ee4b91ecc1dba612536/17a9ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "אותו נושא (loio זהה) מופיע גם בתיעוד SAP ERP 6.0 EHP8 עם אותו סניפט: IPRM0004 ‏(EXIT_SAPLIPWP3_004) לבדיקות בשמירת תוכנית תחזוקה ו-IPRM0003 לשדות לקוח בפריט התחזוקה. טבלת ה-Customer Exits של תוכנית התחזוקה מתועדת באותה כותרת ב-ECC וב-S/4HANA 2025 FPS01; גם כאן IPRM0001 אינו מופיע בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת IPRM0001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הקטלוג מתאר את IPRM0001 כ-'תזמון תכנית אחזקה': 'התערבות בלוגיקת תזמון תכנית אחזקה (חישוב מועדי קריאה)', טריגר 'בעת תזמון (IP10/IP30)', ניפוי דרך CMOD, ובלוק ECC מול S/4HANA: 'נתמך' / 'העדף BAdI לתזמון'. הרשומה מסומנת inferred: true, כלומר התיאור הוסק ולא אומת מול מקור. אותו ייחוס (IPRM0001 = תזמון) חוזר גם ב-data/domain-detail.ts, data/process-guides.ts ו-data/troubleshooting.ts; ב-data/transactions.ts (IP01) וב-data/troubleshooting-ext2.ts ההרחבה רק רשומה ברשימת ה-exits, ללא תיאור תזמון.",
        verificationLevel: "verification_required",
        repoRef: "data/exits.ts#IPRM0001",
        conflictingEvidence: [
          {
            sourceType: "repository",
            sourceTitle: "גיליון הקוד המותאם של חוברת ההגירה PM (custom-code), שורה 42: IPRM0001",
            product: "SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE,
            claim: "גיליון הקוד המותאם מסווג את IPRM0001 כ-'User Exit' בפרק '11. אחזקה מונעת ותוכניות' עם התיאור 'הרחבת לקוח לתכניות אחזקה (Maintenance Plans)', סטטוס 'To review' והפעולה 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני'. השורה הבאה (43) מייחסת את 'הרחבת לוגיקת תזמון (Scheduling)' ל-IPRM0002, לא ל-IPRM0001.",
            verificationLevel: "repository_verified",
            repoRef: "data/sapData.pm.ts#IPRM0001",
          },
          {
            sourceType: "sap_help",
            sourceTitle: "Optimizing the Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025.001",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/05a9ce5314894208e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
            accessedAt: DATE,
            claim: "עמוד התאמת התזמון של S/4HANA 2025 FPS01 מייחס את קביעת המועדים המתוכננים ל-IPRM0002: 'You can use this customer exit to specify the next planned dates for performance-based and time-based maintenance plans. This exit consists of several function modules' (בהם EXIT_SAPLIPM5_002 לתוכניות מבוססות זמן), ואת מועדי תוכניות אסטרטגיה מבוססות ביצועים ל-IPRM0005. לתוכניות מונים מרובים העמוד מונה את ה-BAdIs ‏IPRM_MCP_DATE_I_PAST ו-IPRM_CHECK_UPD_SCHED. IPRM0001 אינו נזכר בסניפט שהוחזר.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "tx:IP10",
      "tx:IP30",
      "tx:IP01",
      "tx:IP02",
      "tx:CMOD",
      "table:MPLA",
      "table:MPOS",
      "table:MHIS",
      "fm:MAINTENANCE_PLAN_SCHEDULE",
      "cds:I_MaintenancePlan",
      "fiori:F4072",
      "enh:exit:IMRC0001",
    ],
    lastVerifiedAt: DATE,
    notes: "אף רשומה רשמית שנשלפה (שירות החיפוש של SAP Help, S/4HANA 2025 FPS01 ו-SAP ERP 6.0 EHP8) אינה מזכירה את IPRM0001 בכותרת או בסניפט; גוף העמודים אינו נגיש ללא דפדפן, ולכן תפקיד ההרחבה, מודולי הפונקציה שלה וסטטוס S/4HANA שלה לא אומתו. קיימת סתירה במאגר: data/exits.ts מייחס ל-IPRM0001 את לוגיקת התזמון, בעוד גיליון הקוד המותאם של חוברת ההגירה מתאר אותה כהרחבת לקוח כללית לתוכניות תחזוקה ומייחס את התזמון ל-IPRM0002; העמוד הרשמי 'Optimizing the Scheduling' מייחס אף הוא את המועדים המתוכננים ל-IPRM0002 ו-IPRM0005. לא הוגדר סטטוס מחברי: אין מקור רשמי ל-IPRM0001, ואין יורש מאומת (ה-BAdIs שהעמוד הרשמי מונה, IPRM_MCP_DATE_I_PAST ו-IPRM_CHECK_UPD_SCHED, אינם בקטלוג הפרויקט; BADI_EAM_EXIT_DUE_DT שנזכר ב-domain-detail לא נמצא בתיעוד שנשלף). אימות נדרש: SMOD/CMOD במערכת חיה (רכיבי ההרחבה IPRM0001 ומודולי EXIT_ שלה), או קריאת טבלת העמוד 'Optimizing the Maintenance Plan' בדפדפן. עד אז יש לקרוא את התיאור 'תזמון' כהשערה של המאגר.",
  },
  {
    id: "enh:exit:ITOB0001",
    aliases: ["ITOB0001 (התאמת אובייקט טכני)"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Device | Increased Efficiency IS-U/CCS – Available Optimization Options",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/9d26d418309b4028a09f4944f370fef9/906dce53118d4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "תיעוד SAP ERP 6.0 EHP8 (ניהול מכשירים IS-U) נוקב בשם ההרחבה ITOB0001 במפורש: 'You do this by using transaction IQ01 to define enhancement ITOB0001. This is not possible via transaction IQ04.' התקציר מאשר שקיימת הרחבה (enhancement) בשם ITOB0001, שלפי לשונו מוגדרת דרך טרנזקציה IQ01 ולא דרך IQ04; סוג ההרחבה (SMOD) ומה שמוגדר דרכה לא נקראו מגוף העמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"ITOB0001\", \"ITOB customer exits\", \"IQ01 define enhancement ITOB0001 device\", \"customer exit technical objects equipment functional location\" (SAP_S4HANA_ON-PREMISE) + חיפוש רשת מוגבל ל-help.sap.com / api.sap.com / fal.cloud.sap / fioriappslibrary",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ממצא שלילי מוגבל לחיפוש: בארבע וריאציות שאילתה בשירות החיפוש של SAP Help לקורפוס S/4HANA On-Premise, ובחיפוש רשת מוגבל לדומיינים הרשמיים, אף כותרת או תקציר אינם נוקבים ב-ITOB0001. ההרחבה היחידה ממשפחת ITOB הנזכרת בקורפוס 2025 FPS01 היא ITOB0002 (עמוד 'Automatic Creation of Equipment', Customer Service). לא אותר תיעוד S/4HANA רשמי המאשר או שולל את זמינות ITOB0001 ב-S/4HANA.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת הקטלוג מגדירה את ITOB0001 כ-Customer Exit של תחזוקת מפעל לוולידציה או השלמה של אובייקט טכני (ציוד או מיקום פונקציונלי) בשמירה, בטרנזקציות IE01, IE02, IL01 ו-IL02, עם ניפוי דרך CMOD ונקודת עצירה ב-EXIT_ של ההרחבה. בלוק ECC מול S/4HANA ברשומה: 'נתמך' ו-'העדף BAdI BADI_EAM_TOB'. הרשומה עצמה אינה מסומנת inferred, אך רשומת ה-BAdI היעד BADI_EAM_TOB מסומנת inferred: true.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#ITOB0001",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "‏What's New ל-2025 FPS01 מכריז על BAdI חדש, 'BAdI for Functional Location (BADI_ASM_MD_FUNCLOC)', ש-'allows you to add custom validations while creating or updating' מיקומים פונקציונליים; לפי התקציר המימוש נוצר ב-Customizing תחת Master Data in Plant Maintenance and Customer Service, Technical Objects, Functional Locations, והעמוד נוקב ב-IL02, באפליקציית Web Dynpro‏ Process Technical Object (W0029) וב-API למיקום פונקציונלי. התקציר אינו מזכיר את ITOB0001; העמוד מובא כהקשר לכיוון ההרחבה המודרני לוולידציות של מיקומים פונקציונליים בלבד, לא של ציוד.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:badi:BADI_EAM_TOB",
      "enh:exit:IEQM0001",
      "tx:IE01",
      "tx:IE02",
      "tx:IL01",
      "tx:IL02",
      "tx:IQ01",
      "tx:CMOD",
      "tx:SMOD",
      "table:EQUI",
      "table:IFLOT",
      "table:ILOA",
      "fm:BAPI_EQUI_CREATE",
      "fm:BAPI_FUNCLOC_CREATE",
      "fiori:F2730A",
    ],
    lastVerifiedAt: DATE,
    notes: "קיום ההרחבה ITOB0001 מאומת מול תיעוד SAP רשמי רק בקורפוס SAP ERP (הקשר IS-U ו-IQ01); בקורפוס S/4HANA On-Premise לא אותר אזכור, ולכן לא נקבע כאן מעמד S/4HANA מחובר: המעמד הנגזר 'משתנה ב-S/4HANA' נשען על הערת 'העדף BAdI BADI_EAM_TOB' ברשומת המאגר בלבד. שם ה-BAdI היורש אינו מאומת: קטלוג ההרחבות נוקב BADI_EAM_TOB (inferred), גיליון ה-Custom Code של בלופרינט PM (data/sapData.pm.ts, customCode שורות 3, 8, 13) נוקב BADI_EAM_TECHNICAL_OBJECT, ואף אחד משני השמות לא הופיע בחיפוש SAP Help; ה-BAdI היחיד שאותר רשמית לוולידציות של אובייקט טכני הוא BADI_ASM_MD_FUNCLOC (2025 FPS01, מיקומים פונקציונליים בלבד), ואינו קיים כרשומה ביקום הפרויקט. אותו גיליון בלופרינט (customCode שורה 1) מסווג את ITOB0001 'User Exit' במעמד 'To review' עם ההמלצה 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני', בעוד הקטלוג מסווג 'Customer Exit'. סיווג ההרחבה כ-SMOD הוא קריאת המאגר והבלופרינט, לא לשון help.sap.com (התקציר הרשמי נוקב 'enhancement' בלבד). רכיבי ההרחבה (מודולי EXIT_, מסכים) לא אומתו ודורשים SMOD במערכת; העמוד ב-S/4HANA 2025 FPS01 הנוקב ב-ITOB0002 (Automatic Creation of Equipment, Customer Service, loio f47cc1536ca9b54ce10000000a174cb4) נוגע להרחבה אחות ואינו ראיה ל-ITOB0001.",
  },
  {
    id: "enh:exit:IEQM0001",
    aliases: ["IEQM0001 (מסך נוסף לציוד)"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Develop Enhancements | System Enhancements and Data Transfer (SAP Library, Release 4.6C)",
        product: "SAP R/3 4.6C (SAP Library)",
        edition: "ecc",
        release: "4.6C",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
        accessedAt: DATE,
        claim: "עמוד סטטי של ספריית SAP (Release 4.6C) שנקרא במלואו: 'The following standard enhancements are available for Plant Maintenance and Customer Service', ותחת 'Area: Equipment' הוא מונה 'IEQM0001 Additional checks when installing equipment at functional locations', לצד IEQM0002 (equipment hierarchies), IEQM0003 (before updating equipment), IEQM0004 עד IEQM0006 (הרשאת אובייקט לחוזה) ו-IEQM0007 (שדה היצרן). העמוד אינו מתאר את IEQM0001 כמסך נוסף או כ-subscreen לציוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Connection | Increased Efficiency IS-U/CCS – Available Optimization Options",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/9d26d418309b4028a09f4944f370fef9/9c6dce53118d4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "רשומת החיפוש של SAP ERP 6.0 EHP8 קובעת: 'There are seven enhancements, IEQM0001 to IEQM0007, each with one customer exit. Table EQUI contains connection data (equipment data).' כלומר IEQM0001 היא הרחבה (Enhancement) עם יציאת לקוח אחת, בהקשר נתוני ציוד בטבלת EQUI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Device Management Attachment | Increased Efficiency IS-U/CCS – Available Optimization Options",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/9d26d418309b4028a09f4944f370fef9/a56dce53118d4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE,
        claim: "הסניפט מונה את תיאורי ההרחבות IEQM לפי סדרן: הראשון, שלפני IEQM0002, הוא '(Additional checks when installing equipment at technical location)', ואחריו 'IEQM0002 (Additional checks when defining equipment hierarchies) IEQM0003 (Additional checks before posting equipment)' עד 'IEQM0007 (Check / change manufacturer field for equipment master)'. בהמשך: 'Customer Exits: EXIT_SAPLIEL2_002 (Check user defined rules on installation', 'EXIT_SAPLIEL2_001 (Check customer-specific regulations for defining equipment)', 'EXIT_SAPMIEQ0_001 (Check customer-specific regulations before posting equipment)'. הצימוד המפורש IEQM0001 = EXIT_SAPLIEL2_002 אינו כתוב בסניפט; הוא עולה רק מסדר הרשימות ומהתאמת התיאורים, ולכן שם מודול היציאה נשאר 'נדרש אימות'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Create Technical Object | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/492e78c03822483d92ee023cdc13dca6.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "תיעוד Maintenance Management לגרסת 2025 FPS01 קובע: 'As a key user, you can extend the Create Technical Object app according to your business needs', ומונה BAdI בשם 'Field Control for Technical Object (EAM_TECHNOBJECT_FIELD_CONTROL)' בהקשר העסקי Equipment, וכן: 'The extensibility of the initial screen is not supported'. העמוד אינו נוקב ב-IEQM0001 ואינו מציג אותה כמוחלפת; הוא מתעד את נתיב הרחבת משתמש המפתח לאפליקציית Fiori של אובייקטים טכניים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "Configuring Plant Maintenance in SAP S/4HANA‏ (SAP PRESS), נספח A.4 'Customer Exits for SAP S/4HANA Asset Management' (עמ' 705), דרך ספריית הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הנספח מציג 'a list of the most important customer exits available for SAP S/4HANA Asset Management' ותחת Master data מונה: 'IEQM0001: Additional checks when installing equipment in a functional location'; יציאות ה-subscreen ברשימה זו הן ITOB0001 ו-ITOB0003, לא IEQM0001. הספר אינו נוקב בגרסת S/4HANA ואינו מקור לסטטוס.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/library/book1/raw/ch9.json#text (A.4, עמ' 705); data/library/book1/he/ch9.json#9.4",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת IEQM0001 (סותרת את המקורות הרשמיים)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת המאגר מכנה את IEQM0001 'מסך נוסף לציוד', מטרה 'הוספת מסך/שדות מותאמים לנתוני ציוד', טריגר 'בעיבוד נתוני ציוד (subscreen)', טרנזקציות IE01/IE02/IE03, בלוק ECC מול S/4HANA: 'נתמך (GUI)' / 'ב-S/4 Custom Fields ל-Fiori' / Fiori 'Custom Fields and Logic', ומסומנת inferred: true. התיאור סותר את ספריית SAP (4.6C), את רשומות SAP ERP 6.0 EHP8 ואת נספח הספר, שכולם מתארים את IEQM0001 כבדיקות נוספות בהתקנת ציוד במיקום פונקציונלי, לא כמסך נוסף.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#IEQM0001",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Develop Enhancements | System Enhancements and Data Transfer (SAP Library, Release 4.6C)",
            product: "SAP R/3 4.6C (SAP Library)",
            edition: "ecc",
            release: "4.6C",
            url: "https://help.sap.com/saphelp_46c/helpdata/en/35/6f4073268b2239e10000009b38f984/content.htm",
            accessedAt: DATE,
            claim: "עמוד סטטי של ספריית SAP (Release 4.6C) שנקרא במלואו: 'The following standard enhancements are available for Plant Maintenance and Customer Service', ותחת 'Area: Equipment' הוא מונה 'IEQM0001 Additional checks when installing equipment at functional locations', לצד IEQM0002 (equipment hierarchies), IEQM0003 (before updating equipment), IEQM0004 עד IEQM0006 (הרשאת אובייקט לחוזה) ו-IEQM0007 (שדה היצרן). העמוד אינו מתאר את IEQM0001 כמסך נוסף או כ-subscreen לציוד.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
    ],
    xrefs: [
      "tx:IE01",
      "tx:IE02",
      "tx:IE03",
      "tx:IL02",
      "tx:CMOD",
      "tx:SMOD",
      "table:EQUI",
      "enh:exit:ITOB0001",
      "enh:badi:BADI_EAM_TOB",
      "enh:technique:customer-exit",
      "enh:technique:key-user-extensibility",
      "fiori:F2730A",
      "cds:I_Equipment",
    ],
    lastVerifiedAt: DATE,
    notes: "מה אומת: IEQM0001 היא הרחבה (Enhancement) של תחזוקת מפעל בתחום הציוד, ותיאורה במקורות SAP הוא 'Additional checks when installing equipment at functional locations' (ספריית SAP 4.6C, עמוד שנקרא במלואו; רשומות SAP ERP 6.0 EHP8; נספח A.4 של הספר). השם והמטרה ברשומת המאגר ('מסך נוסף לציוד', subscreen) אינם נתמכים באף מקור, ולכן רמת הרשומה היא 'מקורות סותרים' עד שיתוקנו data/exits.ts#IEQM0001 (שם, מטרה, טריגר, דוגמה, debugging), data/domain-detail.ts:46 ('IEQM0001 (מסך נוסף לציוד)'), data/academy/lessons/pm-generated.ts:230 ('Exit: מסך נוסף לציוד' בתווית trust 'verified-docs' שאין לה עמוד Help תואם) ו-data/workbenches-ext.ts:164 (מכנה אותה BAdI לאימות ב-SE18; לפי SAP ERP זו הרחבה עם יציאת לקוח אחת, לא BAdI). לאחר התיקון ניתן להוריד את ראיית המאגר ל-repository_verified ורמת הרשומה תעלה ל'מאומת מול תיעוד SAP רשמי'. מה חסר לסטטוס S/4HANA: אף עמוד Help של S/4HANA On-Premise שהוחזר בחיפושים (IEQM0001, IEQM0001 to IEQM0007, EXIT_SAPLIEL2_002, customer exits technical objects) אינו נוקב ב-IEQM0001; רק הספר (Tier-2) מונה אותה כזמינה ב-S/4HANA Asset Management, ולפי המניפסט ספר אינו מקור יחיד לסטטוס. לכן לא נכתב סטטוס, והסטטוס הנגזר 'משתנה' (מבלוק ECC מול S/4HANA של הרשומה, inferred) נשאר כפי שהוא ומבוסס על התיאור השגוי; בדיקת SE37/SMOD במערכת חיה לא בוצעה (חיבור sc4sap MCP לא היה זמין). ערך edition 'ecc' בראיית 4.6C מציין ספריית R/3 מתקופת ECC ואינו תיעוד ECC 6.0; לעמוד זה אין loio או versionId (עמוד helpdata סטטי), והוא מצוטט לפי גוף העמוד שנקרא. שם מודול היציאה EXIT_SAPLIEL2_002 מופיע בסניפט הרשמי ללא צימוד מפורש ל-IEQM0001, אין לו מזהה בדאטהסט ולכן אינו ב-xrefs; גם IEQM0002 עד IEQM0007, ILOM0001, ITOB0003, האפליקציה Find Technical Object (F2072) ו-BAPI_EQMT_INSTALLFL אינם מזהים בני פענוח במאגר. הרשומה מסתמכת על סניפטים של שירות החיפוש ועל עמוד ספרייה סטטי; גופי עמודי help.sap.com/docs אינם נשלפים.",
  },
  {
    id: "enh:exit:IMRC0001",
    aliases: ["IMRC0001 (בדיקת קריאה)"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Customer Exit IMRC0001 | Customer Service (CS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25de5f7eadc94d688aa3ce34de0cd09b/396cb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "עמוד 'Customer Exit IMRC0001' מתועד ב-SAP S/4HANA 2025 FPS01 (חבילת Customer Service) וקובע: 'You can use this customer exit and the function modules behind it to: Define particular field contents in measuring points, counters and measurement documents', 'trigger automated business processes' ו-'Update customer-specific tables'. לפי הסניפט: 'Scheduling is started each time a measurement document is saved', ואת הוצאת אזהרה או שגיאה בחריגה מהטווח מגדירים ב-'Customizing for Measuring Points, Counters and Measurement Documents'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Notes about the Function Modules | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6470b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "תיעוד Maintenance Management לגרסת 2025 FPS01 קובע: 'From Release 3.1I / 4.0B, you can use the following Customer Exits for measuring points and measurement documents: IMRC0001 runs before the update and enables you to define particular field contents' [...] 'in measurement points and measurement documents, to generate workflow events and to update customer-specific tables'; IMRC0002 ו-IMRC0003 הם menu exits בעיבוד המקוון של נקודות מדידה ומסמכי מדידה; הרחבת הטבלאות IMPTT ו-IMRG בשדות לקוח נעשית דרך Customizing includes CI_IMPTT או CI_IMRG.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "עמוד הפונקציה העסקית Enterprise Asset Management Part 4 (שם טכני LOG_EAM_CI_4; 'Availability SAP S/4HANA, on-premise') קובע: 'These BAdIs have the same functions as the existing customer enhancements: IMRC0001: MeasPoint/MeasDoc: Exit before update (after COMMIT WORK) = BAdI: Filling of Customer Fields for Measuring Points and ...' (שם ה-BAdI נחתך בסניפט אחרי המילה and; הקטע הסמוך 'Documents IMRC0002:' מרמז שהשם מסתיים ב-Documents, אך זו הסקה ולא טקסט שנראה; השם הטכני של ה-BAdI לא הופיע). באותו עמוד: 'The new API MEASUREM_DOCUM_RFC_CANCEL enables partners and customers to cancel measurement documents in their own developments'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Calling up Documentation for the Exit | Customer Service (CS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25de5f7eadc94d688aa3ce34de0cd09b/426cb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "עמוד 'Calling up Documentation for the Exit' (Customer Service, 2025 FPS01) מנחה 'Enter IMRC0001 and select Documentation as the object component' דרך Tools > ABAP Workbench > Utilities > Enhancements > Project management, ובנפרד 'Enter EXIT_SAPLIMR0_001 and select Interface as the object component' דרך Development > Function Builder. כלומר מודול הפונקציה EXIT_SAPLIMR0_001 נזכר בתיעוד הרשמי כרכיב של ההרחבה IMRC0001; רכיבים נוספים של ההרחבה לא הופיעו בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת IMRC0001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "קטלוג ההרחבות של הפרויקט מגדיר את IMRC0001 כ-Customer Exit של תחזוקת מפעל ('בדיקת קריאת מדידה'): ולידציה של מסמך מדידה ברישום קריאה ב-IK11 לפני שמירה, דוגמה של חסימת קריאת מונה הנמוכה מהקודמת, ניפוי דרך CMOD. בלוק ECC מול S/4HANA ברשומה: 'נתמך' לצד הערת שינוי 'אינטגרציית IoT ב-S/4 דרך APIs'; הרשומה כולה מסומנת inferred: true.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#IMRC0001",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט שנגזר מחוברת ההגירה של PM, גיליון קוד לקוח (custom-code), שורה 14",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "חוברת ההגירה של PM מונה את IMRC0001 תחת '4. נקודות מדידה ומונים' כ-User Exit בתיאור 'הרחבת בדיקות בעת קליטת מסמך מדידה', סטטוס 'To review', והנחיה: 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#custom-code row 14 (IMRC0001)",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "Configuring Plant Maintenance in SAP S/4HANA (SAP PRESS), פרק 9, דרך עותק הספרייה של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "פרק 9 של הספר מונה תחת 'נקודות מדידה' את IMRC0001 (תוכן שדה לנקודות ומסמכי מדידה), IMRC0002 (menu exit לנקודת מדידה), IMRC0003 (menu exit למסמך מדידה), IMRC0004 (בדיקות למסמך מדידה חדש) ו-IMRC0005 (exit ב-AUTHORITY_CHECK_IMPT). תיאור IMRC0001 בספר תואם את 'define particular field contents' שבתיעוד הרשמי.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/library/book1/he/ch9.json",
      },
    ],
    status: {
      status: "unchanged",
      he: "Customer Exit IMRC0001 (MeasPoint/MeasDoc: Exit before update, after COMMIT WORK) מתועד ב-SAP S/4HANA 2025 FPS01 On-Premise כהרחבה זמינה: הגדרת תוכן שדות בנקודות מדידה, מונים ומסמכי מדידה, הפעלת תהליכים אוטומטיים בשמירת מסמך מדידה (תזמון תכניות אחזקה, אירועי workflow) ועדכון טבלאות לקוח. עמוד הפונקציה העסקית LOG_EAM_CI_4 מציין BAdI 'Filling of Customer Fields for Measuring Points and ...' (השם נחתך בסניפט) עם אותן פונקציות, ללא הצהרה על הסרת ה-Exit.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Customer Exit IMRC0001 | Customer Service (CS)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25de5f7eadc94d688aa3ce34de0cd09b/396cb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim: "עמוד 'Customer Exit IMRC0001' מתועד ב-SAP S/4HANA 2025 FPS01 (חבילת Customer Service) וקובע: 'You can use this customer exit and the function modules behind it to: Define particular field contents in measuring points, counters and measurement documents', 'trigger automated business processes' ו-'Update customer-specific tables'. לפי הסניפט: 'Scheduling is started each time a measurement document is saved', ואת הוצאת אזהרה או שגיאה בחריגה מהטווח מגדירים ב-'Customizing for Measuring Points, Counters and Measurement Documents'.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "בהמרה: לשמור את המימוש הקיים של EXIT_SAPLIMR0_001 ולבדוק אותו ב-Custom Code Migration (SCMON/ATC) לפי הנחיית חוברת ההגירה, שורה 14. לפיתוח חדש בגישת Clean Core להעדיף את ה-BAdI המקביל שנזכר בעמוד LOG_EAM_CI_4; השם הטכני שלו לא הופיע בסניפט, לאמת ב-SE18 או בעץ ה-IMG של Plant Maintenance and Customer Service תחת System Enhancements and Data Transfer > Business Add-Ins. לשים לב שהכותרת הרשמית של ההרחבה היא 'Exit before update (after COMMIT WORK)': השימוש בה כנקודת ולידציה חוסמת בדיאלוג (כפי שמתאר קטלוג הפרויקט) לא נתמך בסניפטים שנמצאו ודורש אימות מול תיעוד ה-Exit ב-SMOD במערכת.",
    },
    xrefs: [
      "enh:technique:customer-exit",
      "tx:IK11",
      "tx:IK17",
      "tx:CMOD",
      "tx:SMOD",
      "table:IMRG",
      "table:IMPTT",
      "cds:I_MeasurementDocument",
      "cds:I_MeasuringPoint",
      "fm:MEASUREM_DOCUM_RFC_SINGLE_001",
      "fm:BAPI_MEASUREMENTDOCUM_CREATE",
    ],
    lastVerifiedAt: DATE,
    notes: "גוף עמודי SAP Help לא נקרא (מעטפת JavaScript); כל טענה רשמית תחומה בכותרת ובסניפט של רשומת החיפוש (scripts/sap-help-search.mjs), עם loio ו-versionId כפי שהוחזרו. הסטטוס 'ללא שינוי' נסמך על כך שההרחבה מתועדת כזמינה ב-2025 FPS01 ושעמוד LOG_EAM_CI_4 מדבר על 'existing customer enhancements' בלי הצהרת הסרה; המונח 'הוצא משימוש' לא הופיע באף רשומה. שלוש רשומות רשמיות נוספות (Maintenance Management, 2025.001) לא נכללו כראיות אך תומכות באותה תמונה: 'Measuring Point' (loio 606cb65334e6b54ce10000000a174cb4: הפעלת אירוע המשך כגון הודעה או הזמנה בחריגה מטווח המדידה), 'Condition-Based Maintenance' (loio 356db65334e6b54ce10000000a174cb4: תהליך לדוגמה עם PM-PCS Interface ו-IMRC0001, הפעלת workflow לקוח להודעת תקלה) ו-'Entering Measurement and Counter Readings As Bar Codes' (loio 476db65334e6b54ce10000000a174cb4: יצירת הודעות תקלה אוטומטיות לפי קודי הערכה). פערים: (1) השם הטכני וסוג ה-BAdI המקביל (קלאסי או Enhancement Spot) לא הופיעו, וגם כותרת ה-BAdI נראתה רק חלקית (נחתכה אחרי 'Measuring Points and'), ולכן אין xref לטכניקת BAdI ואין יורש; (2) רכיבי ההרחבה מלבד EXIT_SAPLIMR0_001 והממשק שלהם לא אומתו; (3) הרשומה במאגר מתארת ולידציה חוסמת ב-IK11 לפני שמירה, בעוד הכותרת הרשמית היא 'Exit before update (after COMMIT WORK)' והוצאת אזהרה או שגיאה בחריגה מטווח מיוחסת ל-Customizing; ההבדל נרשם כדורש אימות ולא כסתירה, כי רשומת המאגר מסומנת inferred; (4) הערת השינוי 'אינטגרציית IoT ב-S/4 דרך APIs' בבלוק ה-ECC/S/4 של המאגר אינה נתמכת באף רשומה רשמית על IMRC0001 ואינה משפיעה על הסטטוס; (5) חיפוש במוצר SAP S/4HANA Cloud Public Edition לא החזיר עמוד שמזכיר IMRC0001 (ממצא תחום בחיפוש, לא נטענת זמינות או אי-זמינות במהדורה זו); (6) אפליקציות Fiori למסמכי מדידה אינן ביקום ה-Fiori של המאגר ולכן אין xref לאפליקציה. ספר Plant Maintenance with SAP S/4HANA: Business User Guide (פרק 5, data/library/book9/he/ch5.json) מזכיר את IMRC0001 כמפעיל פעולות אוטומטיות בחריגת ספים דרך PM-PCS Interface; לא נכלל כראיה נפרדת כדי לא לחרוג מהיקף הרשומה.",
  },
  {
    id: "enh:badi:WORKORDER_UPDATE",
    aliases: ["WORKORDER_UPDATE (PM)", "WORKORDER_UPDATE (במעבר להזמנה)", "WORKORDER_UPDATE (אכיפת היתרים)"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Further Processing Changes to Orders | What's New in SAP S/4HANA 2022 SPS03 (PDF, סעיף 5.1.1)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.003",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2022.003/en-US/WN_OP2022_SPS03_EN.pdf",
        accessedAt: DATE,
        claim: "מסמך ה-What's New הרשמי (PDF) נקרא במלואו: 'The Business Add-In WORKORDER_UPDATE, which you can use to further process or prohibit changes to orders, has been enhanced with a new method COMP_RQMT_DATE_TIME_SET'. פרטים טכניים כלשון המסמך: Type: Changed; Scope Item: BJ5 (Make-to-Stock Production - Discrete Manufacturing); Application Component: PP-SFC-EXE (Order Processing); Valid as Of: SAP S/4HANA 2022 SPS03. המתודה 'is called when the requirement date and time and the latest requirement date of a component are updated from order scheduling'. אותו נושא מפורסם גם כעמוד Help (loio 86956eb2f92146db85b12838f4affeb8, גרסה 2022.003).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Using Expected Goods Receipts | Extended Warehouse Management (EWM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9832125c23154a179bfa1784cdc9577a/c9e9a85296007b6ae10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "תיעוד EWM לגרסת 2025 FPS01 נוקב בשם התיאורי הרשמי של ה-BAdI, הכולל את תחזוקת המפעל (PM), ובתחולתו על שתי המערכות: 'If you use SAP ERP or SAP S/4HANA as your enterprise management system and want to use the automated process, implement the Business Add-In PM/PP/PS/PI Orders Operation: UPDATE (WORKORDER_UPDATE'. אותו ניסוח מופיע ב-What's New של S/4HANA 1909 FPS01, 'Enhancements to Production Processes' (loio 3732bb48ebdd44159393ea9b027074a0).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Check Projects for Parameter Effectivity | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/dab4d6a0480245889474eea97ed4dbc9.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "דוגמת מימוש רשמית בגרסת 2025 FPS01: 'In BAdI Builder (transaction SE18), create a new implementation of BAdI WORKORDER_UPDATE', עם קוד לדוגמה במתודה 'IF_EX_WORKORDER_UPDATE~AT_SAVE' ובדיקת סוג הפקודה 'IF is_header_dialog-autyp <> '20'. EXIT.' (רשת פרויקט). עמוד אח באותו deliverable, 'Check Production Order Release' (loio 356578be84de41f2b78b1f36a98b0615), מביא דוגמה במתודה 'IF_EX_WORKORDER_UPDATE~AT_RELEASE' עם 'IF is_header_dialog-autyp <> '10'' (פקודת ייצור).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins for Production Orders and Process Orders | PP Production Planning and Control, Release Notes SAP R/3 Enterprise Release 4.70 (PDF, סעיף 19.2.1)",
        product: "SAP R/3 Enterprise",
        edition: "ecc",
        release: "R/3 Enterprise Core 4.70 (SAP_APPL 470)",
        url: "https://help.sap.com/saphelp_crm60/helpdata/en/06/fb4d40eae76f13e10000000a1550b0/19_pp_en.pdf",
        accessedAt: DATE,
        claim: "הערות השחרור הרשמיות (PDF) נקראו במלואן. תחת 'The following BAdIs were changed': 'BAdI WORKORDER_UPDATE was extended by the BEFORE_UPDATE method. This method is implemented directly before calling the posting. The order data is provided in table form as is the existing customer exit PPCO0001. Modifications to this data can no longer be made, but subsequent processes can be derived and triggered.' באותו סעיף: 'BAdI WORKORDER_CONFIRM was extended by the BEFORE_UPDATE BAdI method'. המסמך עוסק בפקודות ייצור ותהליך (PP-SFC), לא בהזמנות תחזוקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת המאגר מתארת BAdI מרכזי להתערבות במחזור החיים של הזמנת תחזוקה או פקודת ייצור (בדיקות, עדכונים ואכיפת כללים) במתודות BEFORE_UPDATE, AT_SAVE ו-IN_UPDATE, עם הטרנזקציות IW31, IW32, CO01, COR1 ו-SE19, ומציגה אותו כדרך המומלצת בגישת Clean Core במקום Customer Exits דוגמת IWO10009. מבין קביעות אלה, המתודה IN_UPDATE וההמלצה 'Clean Core' נשענות על המאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#WORKORDER_UPDATE",
      },
    ],
    status: {
      status: "changed",
      edition: "on-premise",
      release: "2022.003",
      source: {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Further Processing Changes to Orders | What's New in SAP S/4HANA 2022 SPS03 (PDF, סעיף 5.1.1)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.003",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2022.003/en-US/WN_OP2022_SPS03_EN.pdf",
        accessedAt: DATE,
        claim: "מסמך ה-What's New הרשמי (PDF) נקרא במלואו: 'The Business Add-In WORKORDER_UPDATE, which you can use to further process or prohibit changes to orders, has been enhanced with a new method COMP_RQMT_DATE_TIME_SET'. פרטים טכניים כלשון המסמך: Type: Changed; Scope Item: BJ5 (Make-to-Stock Production - Discrete Manufacturing); Application Component: PP-SFC-EXE (Order Processing); Valid as Of: SAP S/4HANA 2022 SPS03. המתודה 'is called when the requirement date and time and the latest requirement date of a component are updated from order scheduling'. אותו נושא מפורסם גם כעמוד Help (loio 86956eb2f92146db85b12838f4affeb8, גרסה 2022.003).",
        verificationLevel: "sap_official_verified",
      },
      he: "ה-BAdI ‏WORKORDER_UPDATE (בשמו התיאורי הרשמי: PM/PP/PS/PI Orders Operation: UPDATE) ממשיך להתקיים ב-SAP S/4HANA On-Premise באותו שם ומיושם ב-SE18, כפי שמתועד בדוגמאות הרשמיות של גרסת 2025 FPS01. השינוי שתועד רשמית הוא תוספתי: ב-S/4HANA 2022 SPS03 נוספה המתודה COMP_RQMT_DATE_TIME_SET ‏(Type: Changed, רכיב PP-SFC-EXE). לא נמצא מקור רשמי המכריז על פריט פישוט, הוצאה משימוש או יורש ל-BAdI, והמתודה BEFORE_UPDATE שעליה נשען מאגר הפרויקט מתועדת רשמית מאז SAP R/3 Enterprise 4.70.",
      recommendedAction: "במעבר מ-ECC ל-S/4HANA: לשמור את המימושים הקיימים של WORKORDER_UPDATE, לבדוק אותם ב-SE18/SE19 ולהריץ QA של שמירה ושחרור ב-IW31/IW32 (תחזוקת מפעל) וב-CO01 או COR1 (ייצור ותעשיות תהליכיות). לבחון אם המתודה COMP_RQMT_DATE_TIME_SET ‏(2022 SPS03) וההרחבות שנוספו ב-2023 (ראו הערות) רלוונטיות לתהליכי הייצור בארגון. לאמת במערכת חיה את רשימת המתודות המלאה של IF_EX_WORKORDER_UPDATE, ובפרט את IN_UPDATE שאינה מופיעה באף מקור רשמי שנמצא, ולא להסתמך על תיעוד הפרויקט לפרמטרים. עבור S/4HANA Cloud Public Edition לא נמצא תיעוד ל-BAdI זה, ולכן אין להניח זמינות שם ללא אימות.",
    },
    xrefs: [
      "enh:technique:classic-badi",
      "enh:exit:IWO10009",
      "enh:exit:PPCO0001",
      "enh:badi:WORKORDER_CONFIRM",
      "tx:IW31",
      "tx:IW32",
      "tx:CO01",
      "tx:COR1",
      "tx:SE18",
      "tx:SE19",
    ],
    lastVerifiedAt: DATE,
    notes: "שיטה: שבע שאילתות ב-scripts/sap-help-search.mjs ‏(On-Premise, SAP ERP, Public Cloud), שני חיפושי רשת מוגבלי-דומיין, ושני מסמכי PDF רשמיים מ-help.sap.com שהורדו ונקראו במלואם (What's New 2022 SPS03; הערות השחרור של PP ל-R/3 Enterprise 4.70). שני עמודי Help בפורמט /doc/ שהוחזרו מחיפוש הרשת (What's New 1610) חזרו ריקים ולא צוטטו. מה שאומת רשמית: השם, השם התיאורי הכולל PM/PP/PS/PI, מימוש ב-SE18, הממשק IF_EX_WORKORDER_UPDATE והמתודות BEFORE_UPDATE ‏(R/3 4.70), AT_SAVE ו-AT_RELEASE ‏(דוגמאות 2025 FPS01) ו-COMP_RQMT_DATE_TIME_SET ‏(2022 SPS03). ה-What's New של S/4HANA 2023 (loio e59b1d858a57444a8f928dead0f11263) ועמוד 'Order Split' (loio 981c11df67df4b3eb91aa449f5dc1e72) מתעדים גם הטמעת BAdI חדשה CO_SPLIT_COMPONENT_POST_GI ומכנים את WORKORDER_UPDATE 'enhancement spot'; SAP משתמשת בשני המונחים (Business Add-In ו-enhancement spot), ולכן הסיווג 'BAdI קלאסי' ב-xrefs משקף את סיווג המאגר בלבד. לא אומת: המתודה IN_UPDATE, רשימת המתודות המלאה, ושם מחלקת הדוגמה (CL_EX_WORKORDER_UPDATE הופיע רק בתקציר חיפוש של עמוד שגופו לא נקרא, ולכן אינו נטען). לא נמצא עמוד ב-deliverable ‏Maintenance Management המתאר את ה-BAdI; תחולתו על הזמנות תחזוקה נשענת על השם התיאורי הרשמי ועל רציפות ECC ל-S/4HANA של הנושא 'Individual Object List' (loio f404b753128eb44ce10000000a174cb4, SAP ERP 6.0 EHP8 וגם S/4HANA 2025 FPS01: 'Mass processing logs for an order are only displayed ... if you have activated the BAdI WORKORDER_UPDATE'). חיפוש תחת SAP S/4HANA Cloud Public Edition לא החזיר אף רשומה הנוקבת בשם ה-BAdI. הסטטוס הנגזר במאגר (בלוק ECC מול S/4HANA: 'משתנה') תואם לסטטוס המאומת; הפרשנות 'Clean Core' שבמאגר אינה נתמכת במקור רשמי ונשארת המלצת פרויקט.",
  },
  {
    id: "enh:badi:NOTIF_EVENT_SAVE",
    aliases: ["IF_EX_NOTIF_EVENT_SAVE"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins (BAdIs) in Quality Management | Quality Management",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/d1e58be39d884a0dbf75a7526a9acbf4/fc8dfd714048409fb544921b94278a55.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE,
        claim: "עמוד ה-BAdIs של ניהול איכות ב-SAP S/4HANA Cloud Public Edition (2608) מונה 'Check/Change Notification When Saving (BADI_QQM_NOTIF_EVENT_SAVE_CLD)' בהקשר העסקי Notification_Header (Quality Notification), בלשון הסניפט: 'Retrieve and change notification data when the notification [...] is saved' (ההשמטה היא של שירות החיפוש). זהו BAdI מוכן לענן לאירוע שמירת הודעת איכות במהדורה הציבורית; העמוד אינו נוקב בשם NOTIF_EVENT_SAVE.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Quality Notification: Extensibility | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/c7fae83def1b4f92a9f78af4e3848982.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE,
        claim: "רשומת What's New ל-SAP S/4HANA 2022 (On-Premise, רכיב QM-QN, פריטי היקף 2F9, 2FA, 2QP): 'With this feature you can create implementations of the following Business Add-Ins (BAdIs) for quality notifications in the Custom Logic app: BADI_QQM_NOTIF_DEFAULT_VAL_CLD' וכן 'BADI_QQM_NOTIF_EVENT_POST_CLD (BAdI After Saving Notification) This BAdI enables you to retrieve quality notification data after a notification is saved'. הסניפט שהוחזר אינו מציג את BADI_QQM_NOTIF_EVENT_SAVE_CLD ואינו מזכיר את NOTIF_EVENT_SAVE.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Create Maintenance Request | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/e316a5e269a942b6b937c26e3bbaea42.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "עמוד ההרחבה של האפליקציה Create Maintenance Request (תחזוקת מפעל, 2025 FPS01) מונה BAdIs להודעת תחזוקה בהקשר העסקי Maintenance Notification (EAMS_NTF), ובהם 'BADI_EVENT_PRIORITIZATION (Maintenance Event Prioritization)', ומציין: 'You can transfer the custom field data from a maintenance notification to a maintenance order by enabling the business scenario EAM_NTF_TO_ORD'. הסניפט שהוחזר אינו מזכיר BAdI לאירוע שמירת ההודעה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת NOTIF_EVENT_SAVE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הקטלוג רושם את NOTIF_EVENT_SAVE כ-BAdI במודול PM להתערבות באירוע שמירת הודעת אחזקה או איכות (ולידציה ועדכונים נלווים), אובייקט 'BAdI NOTIF_EVENT_SAVE · IF_EX_NOTIF_EVENT_SAVE', טרנזקציות IW21, IW22 ו-SE19, ובבלוק ECC מול S/4HANA: 'נתמך' ו'מועדף על QQMA exits'. הטריגר נרשם שם כ'method SAVE'. רשומת IW21 ב-tx-intel מונה לצדו את NOTIF_EVENT_POST ו-NOTIF_CREATE_USER.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#NOTIF_EVENT_SAVE; data/tx-intel.ts#IW21.badis",
      },
      {
        sourceType: "repository",
        sourceTitle: "גיליון 'Custom Code Check · User Exits / BAdIs' בחוברת ההגירה של PM, שורה 23 (NOTIF_EVENT_SAVE)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הגיליון (data/sapData.pm.ts, PM_DATA.customCode, נושא '6. הודעות אחזקה (Notifications)') רושם 'BAdI' NOTIF_EVENT_SAVE כ'BAdI לאירוע שמירת הודעה (בדיקות לפני commit)', בעמודת 'סטטוס בדיקה' הערך 'To review', ובעמודת 'המלצת מעבר ל-S/4': 'אמת תאימות ה-BAdI ב-S/4 (SPAU_ENH); ודא חתימה ומימוש אקטיבי לאחר השדרוג'.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#PM_DATA.customCode row 23 (NOTIF_EVENT_SAVE)",
      },
    ],
    status: {
      status: "verification_required",
      he: "ה-BAdI הקלאסי NOTIF_EVENT_SAVE אינו נזכר באף כותרת או סניפט רשמי ציבורי בשירות החיפוש של help.sap.com (S/4HANA On-Premise, SAP ERP, Cloud Public Edition). רובד המאגר רושם 'נתמך' ו'מועדף על QQMA exits' (data/exits.ts) לצד 'To review' בגיליון הקוד המותאם. הראיות הרשמיות ברשומה מתעדות את החלופות המוכנות לענן (BADI_QQM_NOTIF_EVENT_SAVE_CLD ב-Public Edition 2608, BADI_QQM_NOTIF_EVENT_POST_CLD ב-On-Premise 2022) ולא את ה-BAdI עצמו, ולכן הסטטוס נשאר לאימות.",
      edition: "on-premise",
      release: null,
      source: {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת NOTIF_EVENT_SAVE",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "הקטלוג רושם את NOTIF_EVENT_SAVE כ-BAdI במודול PM להתערבות באירוע שמירת הודעת אחזקה או איכות (ולידציה ועדכונים נלווים), אובייקט 'BAdI NOTIF_EVENT_SAVE · IF_EX_NOTIF_EVENT_SAVE', טרנזקציות IW21, IW22 ו-SE19, ובבלוק ECC מול S/4HANA: 'נתמך' ו'מועדף על QQMA exits'. הטריגר נרשם שם כ'method SAVE'. רשומת IW21 ב-tx-intel מונה לצדו את NOTIF_EVENT_POST ו-NOTIF_CREATE_USER.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#NOTIF_EVENT_SAVE; data/tx-intel.ts#IW21.badis",
      },
      recommendedAction: "אמת ב-SE18 במערכת S/4HANA היעד את קיום ה-BAdI NOTIF_EVENT_SAVE, את הממשק IF_EX_NOTIF_EVENT_SAVE ואת שמות המתודות; הרץ SPAU_ENH לאחר ההמרה וודא מימוש פעיל. להודעות איכות בחן ב-Custom Logic app אם BADI_QQM_NOTIF_EVENT_SAVE_CLD זמין במהדורה שלך.",
    },
    xrefs: [
      "enh:exit:QQMA0001",
      "enh:exit:QQMA0014",
      "enh:technique:classic-badi",
      "tx:IW21",
      "tx:IW22",
      "tx:QM01",
      "tx:SE18",
      "tx:SE19",
      "table:QMEL",
      "fm:BAPI_ALM_NOTIF_SAVE",
      "cds:I_MaintenanceNotification",
      "fiori:F1511",
      "fiori:F2023",
    ],
    lastVerifiedAt: DATE,
    notes: "לא נמצא עמוד ציבורי ב-help.sap.com או ב-api.sap.com הנוקב בשם NOTIF_EVENT_SAVE בכותרת או בסניפט, לא ב-S/4HANA On-Premise ולא ב-SAP ERP; קיום ה-BAdI, הממשק IF_EX_NOTIF_EVENT_SAVE ושם המתודה נשענים על רובד המאגר בלבד ודורשים אימות ב-SE18 במערכת. שם המתודה 'SAVE' ברשומת המאגר חשוד: כותרת KBA 2302851 (סביבת SAP ERP, support.sap.com) נוקבת עבור ה-BAdI האח NOTIF_EVENT_POST בפרמטר IV_DELETE, והתקציר הנגיש שלה מונה את הממשק IF_EX_NOTIF_EVENT_POST ואת המתודה CHECK_DATA_AT_POST; לא נגזרת מכך מסקנה על NOTIF_EVENT_SAVE. KBA 3127355 (סביבה: iMRO 6.0 by HCL for S/4HANA) מכיל את המחרוזת notif_event_save במקטע Keywords בלבד ואינו ראיה לסטטוס. מספרי ה-KBA (2302851, 3127355) מובאים כפי שהופיעו בכותרות התקצירים הציבוריים ב-support.sap.com (userapps), שאינו דומיין מותר לראיה; me.sap.com/notes החזיר 401 ללא S-user ולכן לא נרשמו כראיה ואינם תומכים בסטטוס. המקבילה המוכנה לענן BADI_QQM_NOTIF_EVENT_SAVE_CLD מתועדת ב-Public Edition (2608) להודעות איכות; ב-On-Premise תועדו ב-What's New 2022 רק BADI_QQM_NOTIF_DEFAULT_VAL_CLD ו-BADI_QQM_NOTIF_EVENT_POST_CLD, והסניפט של העמוד המקביל ל-2025 FPS01 (Extensibility for Quality Notification Apps, loio b392cc6291ea442a8c7636f05284dd24) אינו מציג את שם ה-SAVE_CLD, ולכן זמינותו ב-On-Premise נשארת לאימות. להודעות תחזוקה (PM-WOC-MN) העמודים הרשמיים שנמצאו מתעדים BAdIs ברמת אפליקציות Fiori (EAMS_NTF) ולא BAdI לאירוע שמירה. הסטטוס נכתב ידנית כ-verification_required (מקור: רובד המאגר) כדי שהמפה לא תציג 'משתנה' לצד פיל אימות רשמי: רמת האימות הרשמית של הרשומה משקפת את החלופות המתועדות ולא את ה-BAdI עצמו.",
  },
  {
    id: "enh:badi:BADI_EAM_TOB",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומה מסומנת inferred",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת הקטלוג מתארת את BADI_EAM_TOB כ-'Enhancement Spot BADI_EAM_TOB' להרחבת אובייקטים טכניים (ציוד ומיקום פונקציונלי): ולידציה, שדות ולוגיקה בגישת Clean Core, באירועי עיבוד ושמירה של האובייקט (IE01, IL01, SE19), ומסומנת inferred: true. רשומת ITOB0001 באותו קובץ מפנה אליה כחלופה מועדפת ('העדף BAdI BADI_EAM_TOB'). המאגר עצמו אינו טוען לאימות השם.",
        verificationLevel: "verification_required",
        repoRef: "data/exits.ts#BADI_EAM_TOB",
      },
      {
        sourceType: "repository",
        sourceTitle: "הדאטהסט המחולל של בלופרינט PM, גיליון Custom Code Check · User Exits / BAdIs (שורות 3, 8, 13)",
        product: "SAP ECC 6.0 / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "חוברת המיגרציה אינה נוקבת בשם BADI_EAM_TOB כלל. היא מונה בשם BADI_EAM_TECHNICAL_OBJECT ‏(סוג BAdI) בשלושה נושאים: 'BAdI מרכזי להרחבת לוגיקת אובייקטים טכניים ב-S/4HANA' (מבנה ארגוני ותשתית), 'הרחבת לוגיקת ציוד/אובייקט טכני ב-S/4HANA' (ציוד ונתוני מאסטר) ו-'שיוך BOM לאובייקט טכני ב-S/4' (עצי מוצר של אחזקה), כולן בסטטוס בדיקה 'To review' עם ההמלצה 'אמת תאימות ה-BAdI ב-S/4 (SPAU_ENH)'. שני שמות שונים במאגר לאותו רעיון, ואף אחד מהם אינו מאומת מול מקור רשמי.",
        verificationLevel: "repository_verified",
        repoRef: "data/sapData.pm.ts#customCode (Custom Code Check, שורות 3/8/13)",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "help.sap.com search: \"BADI_EAM_TOB\", \"BADI_EAM_TECHNICAL_OBJECT\", \"BADI EAM TOB technical object\" (SAP_S4HANA_ON-PREMISE + SAP_ERP) ומסמכי What's New: WN_OP2020_EN.pdf (2020.000), WN_OP2022_SPS03_EN.pdf (2022.003), WN_OP2025_FPS01_EN.pdf (2025.001, Document Version 1.0, 2026-02-25)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "ממצא שלילי: שש שאילתות בשירות החיפוש של SAP Help (שלוש וריאציות בכל אחד משני המוצרים) לא החזירו אף רשומה הנוקבת בשם BADI_EAM_TOB או BADI_EAM_TECHNICAL_OBJECT בכותרת או בתקציר; לשאילתות השם המדויק הוחזרו התאמות מטושטשות בלבד, כולן עם תקציר ריק. שלושת מסמכי What's New הרשמיים (2020, 2022 SPS03, 2025 FPS01) הורדו ונקראו כטקסט מלא: אפס מופעים לשני השמות. היעדר מהתיעוד אינו הוכחת אי-קיום של הגדרת BAdI במערכת.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Objects on the Web User Interface (PM-EQM) | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/12573553b57be647e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "הקשר בלבד (לא טענת זהות): ה-BAdI המתועד ב-SAP Help לשדות לקוח של אובייקטים טכניים נושא שם אחר. לפי התקציר (שני קטעים): 'You can use the Business Add-In BAdI: Modification of Data in BAPIs for Technical Objects (BADI_EAM_ITOB_BAPI_CUST_FIELDS) to check and adjust field values that are transferred in your customer-specific [...] fields using the appropriate BAPIs'. אותו loio מאונדקס גם תחת SAP ERP 6.18 עם אותו תקציר, כלומר השם מתועד גם בתיעוד ECC. השם BADI_EAM_TOB אינו מופיע ברשומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Change Technical Object | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/cae1af52ad8743cda5e339e5ad051d7c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "הקשר בלבד: עבור אפליקציית ה-Fiori‏ Change Technical Object, העמוד מונה BAdIs ללוגיקה מותאמת של Key User. לפי התקציר: 'Field Control for Technical Object (EAM_TECHNOBJECT_FIELD_CONTROL)' בהקשרים העסקיים Equipment (EAMS_EQUI) ו-Functional Location (EAMS_FL), לשינוי מאפייני שדות הכותרת 'without changing the standard logic' (בתקציר רשומה זו הניסוח הוא 'technical order header fields'; ברשומות Create / Display / Find Technical Object: 'technical object header fields'). אותה רשימה מופיעה גם ברשומות Create / Display / Find Technical Object. השם BADI_EAM_TOB אינו מופיע.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim: "הקשר בלבד (לא טענת יורש): פריט What's New 2025 FPS01, שנקרא במלואו במסמך ה-PDF הרשמי WN_OP2025_FPS01_EN.pdf (סעיף 3.1.15), מציג BAdI חדש 'BAdI for Functional Location (BADI_ASM_MD_FUNCLOC)' להוספת ולידציות מותאמות ביצירה ובעדכון של מיקום פונקציונלי (נתוני בסיס, כתובת, אחריות יצרן, שותפים) דרך IL01/IL02, האפליקציה Process Technical Object (W0029), ה-API‏ API_FUNCTIONALLOCATION, האפליקציה Migrate Your Data (F3473) וה-BAPIs‏ BAPI_FUNCLOC_CREATE / BAPI_FUNCLOC_CHANGE. רכיב יישום PM-EQM-FL, זמינות 'SAP S/4HANA Cloud Private Edition and SAP S/4HANA', תקף מ-2025 FPS01. באותו מסמך (סעיף 3.1.16) מתועד גם BAdI‏ Validation of Reference Equipment (ASM_BADI_REFEQ_VALIDATION) לציוד ייחוס בלבד. השם BADI_EAM_TOB אינו מופיע במסמך.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he: "BAdI שמוצג במאגר כהרחבה המרכזית לאובייקטים טכניים (ציוד ומיקום פונקציונלי) ב-S/4HANA, בשם שלא נמצא לו תיעוד ב-SAP Help באף גרסה (S/4HANA On-Premise או SAP ERP). המאגר עצמו נושא שני שמות שונים לאותו רעיון (BADI_EAM_TOB בקטלוג ההרחבות, BADI_EAM_TECHNICAL_OBJECT בחוברת המיגרציה), ורשומת הקטלוג מסומנת inferred. ה-BAdIs לאובייקטים טכניים ששמם מתועד ב-SAP Help הם BADI_EAM_ITOB_BAPI_CUST_FIELDS ‏(שדות לקוח בערוץ ה-BAPI), EAM_TECHNOBJECT_FIELD_CONTROL ‏(בקרת שדות באפליקציות Fiori) ו-BADI_ASM_MD_FUNCLOC ‏(ולידציות למיקום פונקציונלי, 2025 FPS01); אין מקור רשמי הקושר בין אחד מהם לשם שבמאגר.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לאמת ב-SE18 במערכת SAP חיה האם קיימת הגדרת BAdI או Enhancement Spot בשם BADI_EAM_TOB או BADI_EAM_TECHNICAL_OBJECT, ולתעד את השם המדויק (חיבור sc4sap MCP לא היה זמין בסשן זה). עד אז אין להציג את השם כעובדה ואין להפנות אליו כיורש של ITOB0001. לוולידציה של אובייקטים טכניים יש להפנות ל-BAdIs המתועדים: BADI_EAM_ITOB_BAPI_CUST_FIELDS לשדות לקוח בערוץ ה-BAPI, EAM_TECHNOBJECT_FIELD_CONTROL לבקרת שדות באפליקציות Fiori (Custom Fields and Logic, לפי רשומת IEQM0001 במאגר), ו-BADI_ASM_MD_FUNCLOC לוולידציות של מיקום פונקציונלי מגרסת 2025 FPS01. את מימוש ITOB0001 הקיים יש לבדוק ב-Custom Code Migration (ATC), כהמלצת חוברת המיגרציה.",
    },
    xrefs: [
      "enh:exit:ITOB0001",
      "enh:exit:IEQM0001",
      "enh:technique:new-badi",
      "enh:technique:key-user-extensibility",
      "tx:IE01",
      "tx:IE02",
      "tx:IL01",
      "tx:IL02",
      "tx:SE18",
      "tx:SE19",
      "table:EQUI",
      "table:IFLOT",
      "fm:BAPI_EQUI_CREATE",
      "fm:BAPI_FUNCLOC_CREATE",
      "fm:BAPI_FUNCLOC_CHANGE",
    ],
    lastVerifiedAt: DATE,
    notes: "מה חסר בדיוק: עמוד רשמי (help.sap.com / api.sap.com) הנוקב בשם BADI_EAM_TOB או BADI_EAM_TECHNICAL_OBJECT, או בדיקת SE18 במערכת חיה. מה נבדק בפועל: שש שאילתות בשירות החיפוש של SAP Help בשני המוצרים (אפס נוקבות בשם), WebSearch מוגבל לדומיינים רשמיים (ללא תוצאה לשם), ושלושה מסמכי What's New רשמיים (2020, 2022 SPS03, 2025 FPS01) שנקראו כטקסט מלא ללא מופע. הראיות הרשמיות ברשומה הן הקשר בלבד: הן מאמתות אילו BAdIs לאובייקטים טכניים מתועדים ב-S/4HANA 2025 FPS01, לא את השם שבמאגר, ולכן הסטטוס נשאר verification_required והרמה הרשמית של הרשומה אינה מאמתת את קיום ה-BAdI. הסיווג verification_required ולא conflicting_sources: רשומת המאגר מסומנת inferred: true והבלופרינט מסמן 'To review', כך שאף מקור במאגר אינו טוען לאימות (אותו כלל כמו ברשומות ה-FM המסומנות inferred). לא נוסף alias בין שני השמות, כי זהותם לא אומתה. W0029 ו-F3473 הנזכרים במסמך 2025 FPS01 אינם קיימים בקטלוג ה-Fiori של הפרויקט ולכן לא קושרו. ITOB0001 נשאר Customer Exit בתוקף לפי המאגר; המלצת ההעדפה של BADI_EAM_TOB ברשומת ITOB0001 (data/exits.ts) מצביעה על שם לא מאומת ויש לתקן אותה יחד עם רשומה זו.",
  },
  {
    id: "enh:badi:WORKORDER_CONFIRM",
    aliases: ["IF_EX_WORKORDER_CONFIRM"],
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim: "רשומת המאגר מגדירה את WORKORDER_CONFIRM כ-BAdI (מודול PP, אובייקט 'BAdI WORKORDER_CONFIRM · IF_EX_WORKORDER_CONFIRM') להתערבות באישור פקודת ייצור או פקודת תהליך: ולידציה ועדכונים במתודות האישור, בטרנזקציות CO11N ו-COR6N, עם מימוש ב-SE19. בבלוק ECC מול S/4HANA הרשומה אומרת 'נתמך' ו'מועדף על CONFPP exits', ורשומות ה-Customer Exits‏ CONFPP01 ו-CONFPM01 באותו קטלוג מפנות אליו כיעד ה-Clean Core לבדיקות באישור.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#WORKORDER_CONFIRM",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP Production Planning and Control, Release Notes, SAP R/3 Enterprise Release 4.70 (PDF)",
        product: "SAP R/3 Enterprise",
        edition: "ecc",
        release: "4.70 (SAP_APPL 470)",
        url: "https://help.sap.com/saphelp_crm60/helpdata/en/06/fb4d40eae76f13e10000000a1550b0/19_pp_en.pdf",
        accessedAt: DATE,
        claim: "הערות השחרור הרשמיות של PP ל-SAP R/3 Enterprise Release 4.70 (PDF שנקרא במלואו), סעיף 19.2.1 'Business Add-Ins for Production Orders and Process Orders', קובעות תחת 'The following BAdIs were changed': 'BAdI WORKORDER_CONFIRM was extended by the BEFORE_UPDATE BAdI method. This allows, aside from the standard check for whether the selected confirmation can be cancelled, the execution of additional, customer-specific checks', ובסיכום השינויים: 'Enhancement of BAdI WORKORDER_CONFIRM (production and process orders)'. המסמך מתעד את ה-BAdI בקו R/3 Enterprise 4.70 (SAP_APPL 470) בלבד ואינו אומר דבר על S/4HANA.",
        verificationLevel: "legacy_context_only",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Checking Confirmations | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/da357e700f8c4592b25a317c0d171cb8.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim: "פריט What's New לגרסת SAP S/4HANA 2023 (Manufacturing > Production Operations > Production Execution) קובע: 'The new Business Add-In (BAdI) Checks for Confirmations (BD_WORKORDER_CONFIRM) enables you to implement own checks for confirmations and display respective error messages'. הרשומה נוקבת ב-BAdI חדש בשם BD_WORKORDER_CONFIRM ואינה מזכירה את ה-BAdI הקלאסי WORKORDER_CONFIRM. ראיה עקיפה: המקור עוסק ב-BAdI אחר (BD_WORKORDER_CONFIRM); חסר מקור רשמי הקושר אותו ל-WORKORDER_CONFIRM הקלאסי או הנוקב בזמינות ה-BAdI הקלאסי ב-S/4HANA.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Objects Released for Developer Extensibility in Production Operations (Execution and Control) | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/ac42a1c2eac84149a352e95f4df1d4cc.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim: "רשימת האובייקטים ששוחררו ל-Developer Extensibility ב-SAP S/4HANA 2023 מונה: 'BAdI Check for Confirmations BD_WORKORDER_CONFIRM New You can use this BAdI to implement own checks for confirmations and display respective error messages that can be up to 200 characters long'. הכותרת מגדירה אותו כאובייקט משוחרר (released); הסניפט אינו מפרט מתודות, פרמטרים או Enhancement Spot. ראיה עקיפה: המקור עוסק ב-BAdI אחר (BD_WORKORDER_CONFIRM); חסר מקור רשמי הקושר אותו ל-WORKORDER_CONFIRM הקלאסי או הנוקב בזמינות ה-BAdI הקלאסי ב-S/4HANA.",
        verificationLevel: "verification_required",
      },
    ],
    xrefs: [
      "enh:technique:classic-badi",
      "enh:technique:key-user-extensibility",
      "enh:exit:CONFPP01",
      "enh:exit:CONFPM01",
      "enh:badi:WORKORDER_UPDATE",
      "enh:badi:WORKORDER_GOODSMVT",
      "tx:CO11N",
      "tx:COR6N",
      "tx:IW41",
      "tx:IW42",
      "tx:SE19",
      "table:AFRU",
      "cds:I_ProductionOrderConfirmation",
      "fiori:F3364",
      "fiori:F2730",
      "fm:BAPI_PROCORDCONF_CREATE_TT",
      "fm:BAPI_ALM_CONF_CREATE",
    ],
    lastVerifiedAt: DATE,
    notes: "ה-BAdI הקלאסי WORKORDER_CONFIRM לא אותר באף רשומה רשמית של SAP S/4HANA On-Premise בשירות החיפוש של SAP Help (חיפושים: WORKORDER_CONFIRM, IF_EX_WORKORDER_CONFIRM, BAdI confirmation production order, BAdI maintenance order confirmation, Business Add-Ins confirmation PP-SFC); הימצאותו ב-S/4HANA נשענת על רובד המאגר (data/exits.ts) ועל תיעוד R/3 Enterprise 4.70 בלבד, ולכן הסטטוס ב-S/4HANA נגזר מבלוק ה-ECC מול S/4HANA ברשומת המאגר ('מועדף על CONFPP exits') ולא נקבע ידנית. התיעוד הרשמי של S/4HANA נוקב ב-BAdI אחר, BD_WORKORDER_CONFIRM (חדש ב-2023, משוחרר ל-Developer Extensibility, בדיקות באישורים עם הודעות שגיאה עד 200 תווים); היחס בינו לבין ה-BAdI הקלאסי (מחליף, משלים או מקביל) אינו נאמר בסניפטים, והוא אינו מזהה בדאטהסט ולכן אינו xref ואינו successor. תיעוד ECC לתעשיות תהליכיות (Insertion of Customer-Specific Fields, SAP ERP 6.0 EHP7, loio 3a00b753128eb44ce10000000a174cb4) נוקב ב-BAdI אח, WORKORDER_CONFIRM_CUST_SUBSCR, לעיצוב ה-subscreen של שדות לקוח באישור; אותו עמוד קיים ב-S/4HANA 2025 FPS01 (Production Planning and Control) אך הסניפט שלו אינו נוקב בשם ה-BAdI. גוף העמודים ב-help.sap.com לא נקרא (מעטפת JavaScript); רק ה-PDF של הערות השחרור נקרא במלואו. המתודות 'BEFORE/AFTER confirmation', ממשק IF_EX_WORKORDER_CONFIRM והשיוך לאישורי תחזוקת מפעל (IW41/IW42) נשארים ברובד המאגר ולא אומתו מול מקור רשמי שנקרא; הערות השחרור מתעדות מתודה אחת בשם BEFORE_UPDATE ותחולה על 'production and process orders'.",
  },
  {
    id: "enh:exit:PPCO0001",
    aliases: ["EXIT_SAPLCOBT_001"],
    status: {
      status: "unchanged",
      he: "Customer Exit של הזמנות ייצור (PP-SFC) המתועד בתיעוד SAP S/4HANA 2025 FPS01 On-Premise כהרחבה זמינה לתכנות ולהפעלה: תרחיש ה-Workflow 'Production Order Changes (PP-SFC)' מורה לתכנת ולהפעיל את מודול הפונקציה EXIT_SAPLCOBT_001 (הרחבת לקוח PPCO0001) כדי להפעיל את המשימה הסטנדרטית TS20000623 (יידוע בקר ה-MRP על שינוי בהזמנה); לפי אותו עמוד הטבלאות הפנימיות של ה-Exit מכילות מידע על כותרות ההזמנה, הפריטים והפעולות במצב הישן והחדש. לא נמצא בחיפוש הרשמי פריט פישוט, הערת הסרה או יורש מוצהר להרחבה זו. שם מודול הפונקציה שברשומת המאגר (EXIT_SAPLCOZF_001) אינו מופיע באף מקור רשמי שנמצא, ולכן רמת הרשומה היא מקורות סותרים.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Preparation and Customizing (Production Order Changes, PP-SFC) | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/c66cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש הרשמית (title 'Preparation and Customizing', deliverable 'Workflow', loio c66cb6531de6b64ce10000000a174cb4, גרסה 2025 FPS01) נושאת בסניפט את כותרת המשנה 'Function Module Exit EXIT_SAPLCOBT_001 (Customer Enhancement PPCO0001)' ואת המשפטים: 'To start the standard task TS20000623, you have to program and activate the function module exit EXIT_SAPLCOBT_001 (customer enhancement PPCO0001)'; 'The various internal tables in the function module exit EXIT_SAPLCOBT_001 ... contain information on the old and new order headers, order items, and operations'; 'An example of how to start the standard task TS20000623 ... is provided in the include PPCOX001'. במשפט על הטבלאות הפנימיות המקור עצמו כותב PPCO001 בחמש ספרות, ככל הנראה שגיאת דפוס בתיעוד SAP, ולכן הציטוט מקוצר ב-... . גוף העמוד לא נקרא (מעטפת JS); הציטוטים מסניפטים של שירות החיפוש בלבד.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "להמשיך להשתמש ב-PPCO0001 (EXIT_SAPLCOBT_001) בתרחישי GUI של הזמנות ייצור ב-S/4HANA On-Premise, ולהפעיל את ה-Exit דרך פרויקט CMOD פעיל. לפיתוח חדש ולנתיב Clean Core להעדיף את ה-BAdI WORKORDER_UPDATE (המתודה BEFORE_UPDATE מספקת לפי הערות השחרור של R/3 Enterprise 4.70 את נתוני ההזמנה בצורת טבלאות 'as is the existing customer exit PPCO0001', להפעלת תהליכי המשך ולא לשינוי הנתונים). לאמת במערכת S/4HANA חיה ב-SMOD/SE37 אילו מודולי EXIT_ מכילה ההרחבה PPCO0001, את פרמטרי ה-Exit ואת הפעלתו גם בשמירת הזמנות תהליך (COR1/COR2), שאינה מתועדת בסניפטים הרשמיים שנמצאו.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Preparation and Customizing (Production Order Changes, PP-SFC) | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/c66cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש הרשמית (title 'Preparation and Customizing', deliverable 'Workflow', loio c66cb6531de6b64ce10000000a174cb4, גרסה 2025 FPS01) נושאת בסניפט את כותרת המשנה 'Function Module Exit EXIT_SAPLCOBT_001 (Customer Enhancement PPCO0001)' ואת המשפטים: 'To start the standard task TS20000623, you have to program and activate the function module exit EXIT_SAPLCOBT_001 (customer enhancement PPCO0001)'; 'The various internal tables in the function module exit EXIT_SAPLCOBT_001 ... contain information on the old and new order headers, order items, and operations'; 'An example of how to start the standard task TS20000623 ... is provided in the include PPCOX001'. במשפט על הטבלאות הפנימיות המקור עצמו כותב PPCO001 בחמש ספרות, ככל הנראה שגיאת דפוס בתיעוד SAP, ולכן הציטוט מקוצר ב-... . גוף העמוד לא נקרא (מעטפת JS); הציטוטים מסניפטים של שירות החיפוש בלבד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Production Order Changes (PP-SFC) | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/a86cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד המטרה של תרחיש ה-Workflow (loio a86cb6531de6b64ce10000000a174cb4, 2025 FPS01) קובע לפי הסניפט: 'SAP Business Workflow can inform an MRP controller when a production order is changed'; 'The MRP controller then receives a work item with which he or she can maintain the production order directly'; 'You can program the changes for which the MRP controller is to be informed as described below - in the function module exit EXIT_SAPLCOBT_001 (customer enhancement PPCO0001)'. ההקשר המתועד הוא הזמנות ייצור (PP-SFC); הזמנות תהליך אינן נזכרות בסניפט. גוף העמוד לא נקרא (מעטפת JS).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Technical Implementation (Production Order Changes, PP-SFC) | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/c36cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד המימוש הטכני של אותו תרחיש (loio c36cb6531de6b64ce10000000a174cb4, 2025 FPS01) קובע לפי הסניפט: 'Standard task : TS20000623 Identifier: InfDispOrder Name: Inform MRP controller about order change'; 'Referenced object method, properties Object type: BUS2005 Method: Edit Properties: synchronous, with dialog'; 'You can define the changes for which the MRP controller is to be informed in the function module exit EXIT_SAPLCOBT_001 (customer enhancement PPCO0001)'. סוג האובייקט המתועד הוא BUS2005 (הזמנת ייצור) בלבד. גוף העמוד לא נקרא (מעטפת JS).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP Production Planning and Control, SAP R/3 Enterprise Release 4.70, Release Notes (PDF, מתארח תחת נתיב help.sap.com/saphelp_crm60), section 19.2.1 Business Add-Ins for Production Orders and Process Orders",
        url: "https://help.sap.com/saphelp_crm60/helpdata/en/06/fb4d40eae76f13e10000000a1550b0/19_pp_en.pdf",
        product: "SAP R/3 Enterprise 4.70",
        edition: "ecc",
        release: "R/3 Enterprise 4.70 (SAP_APPL 470)",
        accessedAt: DATE14,
        claim: "המסמך הורד ונקרא (סעיף 19.2.1, 'Business Add-Ins for Production Orders and Process Orders'). כלשונו: 'BAdI WORKORDER_UPDATE was extended by the BEFORE_UPDATE method. This method is implemented directly before calling the posting. The order data is provided in table form as is the existing customer exit PPCO0001. Modifications to this data can no longer be made, but subsequent processes can be derived and triggered.' המסמך מציג את PPCO0001 כ-Exit קיים שמקבל את נתוני ההזמנה בצורת טבלאות ואת BEFORE_UPDATE כמתודת BAdI מקבילה; הוא אינו קובע ש-PPCO0001 הוסר או הוחלף, ואינו מתאר את ה-Exit כבדיקת ולידציה החוסמת שמירה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת PPCO0001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת המאגר מתארת את PPCO0001 כ'בדיקות בשמירת פקודת ייצור/תהליך': ולידציה/לוגיקה בשמירת הזמנת ייצור (CO01) או תהליך (COR1), טריגר 'בעת שמירת הפקודה, לפני commit', אובייקט 'Enhancement PPCO0001 · EXIT_SAPLCOZF_001', טרנזקציות CO01, CO02, COR1, COR2, CMOD; בלוק ECC מול S/4HANA: 'נתמך (GUI).' ו-'Clean Core → BAdI WORKORDER_UPDATE.'. שם מודול הפונקציה ברשומה (EXIT_SAPLCOZF_001) אינו מופיע באף עמוד רשמי שנמצא, בעוד שלושה עמודי Workflow רשמיים משייכים ל-PPCO0001 את EXIT_SAPLCOBT_001; התיעוד הרשמי אינו מונה את כלל מודולי הפונקציה של ההרחבה, ולכן זו סתירה פתוחה ולא הפרכה. גם תיאור 'בדיקות' ותחולת הזמנות התהליך אינם נתמכים בסניפטים הרשמיים.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#PPCO0001",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Preparation and Customizing (Production Order Changes, PP-SFC) | Workflow",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/c66cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025.001",
            accessedAt: DATE14,
            claim: "כותרת המשנה בסניפט של הרשומה הרשמית (title 'Preparation and Customizing', deliverable 'Workflow'): 'Function Module Exit EXIT_SAPLCOBT_001 (Customer Enhancement PPCO0001)'. שלוש רשומות של אותו תרחיש Workflow (loio c66cb6531de6b64ce10000000a174cb4, a86cb6531de6b64ce10000000a174cb4, c36cb6531de6b64ce10000000a174cb4, כולן 2025.001) משייכות ל-PPCO0001 את מודול הפונקציה EXIT_SAPLCOBT_001; חיפוש רשמי על המחרוזת EXIT_SAPLCOZF_001 אינו מחזיר אף עמוד שמזכיר את השם.",
            verificationLevel: "sap_official_verified",
          }
        ],
      }
    ],
    xrefs: [
      "enh:badi:WORKORDER_UPDATE",
      "enh:technique:customer-exit",
      "enh:exit:PPCO0007",
      "enh:exit:IWO10009",
      "tx:CO01",
      "tx:CO02",
      "tx:COR1",
      "tx:COR2",
      "tx:CMOD",
      "tx:SMOD",
      "table:AUFK",
      "table:AFKO",
      "table:AFPO"
    ],
    lastVerifiedAt: DATE14,
    notes: "המקור הרשמי היחיד ב-S/4HANA שמזכיר את PPCO0001 בסניפט הוא תרחיש ה-Workflow 'Production Order Changes (PP-SFC)' בשלושת עמודיו (Purpose, Technical Implementation, Preparation and Customizing; 2025 FPS01). לפיו ה-Exit הוא EXIT_SAPLCOBT_001, הטבלאות הפנימיות שלו מכילות מידע על כותרת ההזמנה, הפריטים והפעולות במצב ישן וחדש, וההקשר הוא הזמנות ייצור (אובייקט BUS2005). מכאן שלוש הסתייגויות לרשומת המאגר: (1) שם מודול הפונקציה ברשומת המאגר, EXIT_SAPLCOZF_001, אינו מופיע באף עמוד רשמי שנמצא; התיעוד הרשמי אינו מונה את כלל מודולי הפונקציה שמכילה ההרחבה PPCO0001, ולכן אי אפשר לקבוע מהתיעוד בלבד שהשם שגוי. לפני עדכון data/exits.ts (שדות object ו-debugging) יש לאמת ב-SMOD/SE37 אילו מודולי EXIT_ שייכים להרחבה. (2) התיאור 'בדיקות/ולידציה בשמירה' אינו מופיע במקור הרשמי, שמתאר את ה-Exit כנקודה שבה נתוני ההזמנה זמינים להפעלת תהליכי המשך (Workflow); הערות השחרור של R/3 Enterprise 4.70 מתארות את WORKORDER_UPDATE BEFORE_UPDATE כמקבילה שבה 'Modifications to this data can no longer be made', ולכן שימוש ב-PPCO0001 לחסימת שמירה או לשינוי נתונים דורש אימות בתיעוד ה-Exit ב-SMOD. (3) תחולת הזמנות תהליך (COR1/COR2) אינה נזכרת באף סניפט רשמי; כותרת סעיף הערות השחרור 'for Production Orders and Process Orders' מתייחסת ל-BAdIs ולא בהכרח ל-Exit. הסטטוס 'ללא שינוי ב-S/4HANA' נשען על כך שתיעוד 2025 FPS01 עדיין מורה לתכנת ולהפעיל את ה-Exit, ולא נמצא פריט פישוט או הערת הסרה; הוא אינו אומר שהתנהגות ה-Exit או פרמטריו אומתו במערכת חיה. עמודי help.sap.com לגרסת S/4HANA הם מעטפת JS, כך שכל הציטוטים מהם הם מכותרות ומסניפטים של שירות החיפוש; מסמך ה-PDF של הערות השחרור נקרא בפועל (סעיף 19.2.1). עמוד תוכן התמיכה 'User exists and BADIs of production order' (help.sap.com/docs/SUPPORT_CONTENT/prodord/3138698565.html) מחזיר 200 אך גופו לא נקרא (מעטפת JS) ולכן לא צוטט. ה-PDF של הערות השחרור ל-EHP6 (PP) הורד ונבדק ואינו מזכיר את PPCO0001 כלל. What's New 2023 (loio e59b1d858a57444a8f928dead0f11263, 'BAdI for Further Processing Changes to Orders') מתעד הרחבה של WORKORDER_UPDATE אך אינו קובע שהוא מחליף את PPCO0001, ולכן לא הוגדר יורש. חיבור ה-SAP MCP החי לא היה זמין; בדיקת SMOD/CMOD/SE37 לא בוצעה.",
  },
  {
    id: "enh:exit:PPCO0007",
    aliases: ["EXIT_SAPLCOZV_001"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancement when Saving an Order (Header Fields) (SAP Library - Shop Floor Control)",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/35/71883286c2223ae10000009b38f984/content.htm?no_cache=true",
        product: "SAP R/3 4.6C (SAP Library)",
        edition: "ecc",
        release: "R/3 4.6C",
        accessedAt: DATE14,
        claim: "עמוד ספריית SAP לגרסת R/3 4.6C‏ (Shop Floor Control) נקרא במלואו: 'The following enhancement is available for production orders: PPCO0007 Exit when saving production order'. לפי העמוד ההרחבה משמשת ל-'Check data when an order is saved and decline to save the order if necessary' ול-'Change data in the order header', והיא מכילה רכיב אחד: 'Function exit EXIT_SAPLCOZV_001 Check or change header fields'. העמוד מדבר על פקודות ייצור (production orders) בלבד, מפנה ליצירת פרויקט הרחבה והפעלתו (העמוד אינו נוקב בשם הטרנזקציה), ואינו אומר דבר על S/4HANA. באחת השורות מודפס 'Enhancement PPCO007' (שגיאת הקלדה בעמוד עצמו).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Erweiterung beim Sichern eines Auftrags (Kopffelder) (SAP-Bibliothek - Fertigungssteuerung)",
        url: "https://help.sap.com/saphelp_46c/helpdata/de/35/71883286c2223ae10000009b38f984/content.htm?no_cache=true",
        product: "SAP R/3 4.6C (SAP Library)",
        edition: "ecc",
        release: "R/3 4.6C",
        accessedAt: DATE14,
        claim: "הגרסה הגרמנית של אותו עמוד ספריית SAP 4.6C נקראה במלואה ומאשרת את אותו תוכן: 'PPCO0007 Exit beim Sichern Fertigungsauftrag', מטרה: בדיקת נתונים בשמירת הפקודה עם אפשרות לדחות את השמירה, ושינוי נתונים בכותרת הפקודה; רכיב ההרחבה: 'Funktionsexit EXIT_SAPLCOZV_001 Prüfen bzw. Ändern von Kopffeldern'. גם עמוד זה אינו מזכיר שינוי סטטוס, שחרור או TECO, ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Document Integration in the Production Order | Production Orders (PP-SFC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/b0ffb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש של תיעוד Production Orders (PP-SFC) לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio b0ffb753128eb44ce10000000a174cb4) מציגה ב-snippet: 'Customer enhancements The following customer enhancements are available: PPCO0015: Additional attributes for document links PPCO0016: Generating document links from master data PPCO0017: Additional'. כלומר, הרחבות לקוח ממשפחת PPCO לפקודות ייצור עדיין מתועדות ב-S/4HANA On-Premise. ה-snippet אינו מזכיר את PPCO0007, וגוף העמוד לא נקרא; רשומה זו מובאת כהקשר בלבד ואינה ראיה לזמינות PPCO0007 ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת המאגר מתארת את PPCO0007 כ'שינוי סטטוס פקודה': התערבות בעת שינוי סטטוס פקודת ייצור או תהליך (שחרור/TECO), טרנזקציות CO02 ו-COR2, דוגמה של שליחת הודעה ל-MES כשפקודה משוחררת, שדה object 'Enhancement PPCO0007' ללא שם Function Exit, ובבלוק ECC מול S/4HANA: 'נתמך.' ו-'העדף BAdI.'. תיאור זה סותר את תיעוד SAP, שלפיו PPCO0007 היא 'Exit when saving production order' עם ה-Function Exit ‏EXIT_SAPLCOZV_001 לבדיקה או שינוי של שדות כותרת בשמירת פקודת ייצור, ללא אזכור לשינוי סטטוס.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#PPCO0007",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Enhancement when Saving an Order (Header Fields) (SAP Library - Shop Floor Control)",
            url: "https://help.sap.com/saphelp_46c/helpdata/en/35/71883286c2223ae10000009b38f984/content.htm?no_cache=true",
            product: "SAP R/3 4.6C (SAP Library)",
            edition: "ecc",
            release: "R/3 4.6C",
            accessedAt: DATE14,
            claim: "עמוד ספריית SAP לגרסת R/3 4.6C‏ (Shop Floor Control) נקרא במלואו: 'PPCO0007 Exit when saving production order', משמש ל-'Check data when an order is saved and decline to save the order if necessary' ול-'Change data in the order header', ומכיל את 'Function exit EXIT_SAPLCOZV_001 Check or change header fields'. אין בעמוד אזכור לשינוי סטטוס, לשחרור או ל-TECO.",
            verificationLevel: "sap_official_verified",
          }
        ],
      }
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:exit:PPCO0001",
      "enh:exit:PPCO0021",
      "enh:badi:WORKORDER_UPDATE",
      "tx:CO01",
      "tx:CO02",
      "tx:COR1",
      "tx:COR2",
      "tx:CMOD",
      "tx:SMOD",
      "table:AUFK",
      "table:AFKO"
    ],
    lastVerifiedAt: DATE14,
    notes: "שיטה: שמונה שאילתות ב-scripts/sap-help-search.mjs ‏(SAP S/4HANA On-Premise, SAP ERP ו-SAP S/4HANA Cloud Public Edition: PPCO0007, PPCO0007 status change production order customer exit, customer exit production order status change PPCO, PPCO0001 PPCO0007 Develop Enhancements, enhancement production order status change WORKORDER_UPDATE, customer enhancements production order PPCO, customer enhancement PPCO0006 PPCO0007 order header, Enhancement when Saving an Order Header Fields), שני חיפושי רשת מוגבלים ל-help.sap.com ו-api.sap.com, ושני עמודי ספריית SAP סטטיים לגרסת 4.6C ‏(EN ו-DE) שהורדו ונקראו במלואם. מה שאומת רשמית: השם הטכני PPCO0007, השם 'Exit when saving production order', המטרה (בדיקת נתונים בשמירת פקודת ייצור עם אפשרות לדחות את השמירה, ושינוי שדות כותרת) וה-Function Exit ‏EXIT_SAPLCOZV_001, הכול לפי ספריית 4.6C. אין סטטוס מחובר: אף רשומת חיפוש של SAP S/4HANA On-Premise, של SAP ERP 6.0 EHP8 או של S/4HANA Cloud Public Edition אינה נוקבת בשם PPCO0007 בכותרת או ב-snippet; שני עמודי help.sap.com שהוחזרו מחיפוש הרשת (SUPPORT_CONTENT 'User exists and BADIs of production order' ו-'PP - Production order', שהתברר כאובייקט Data Migration) חזרו כמעטפת JavaScript ריקה ולא צוטטו. הסטטוס הנגזר במאגר (בלוק ECC מול S/4HANA: 'משתנה', בזכות ההערה 'העדף BAdI.') נשען על המאגר בלבד ואינו נתמך במקור רשמי; לא נמצא פריט פישוט, הודעת הוצאה משימוש או יורש ל-PPCO0007. סתירה פתוחה: המאגר (data/exits.ts, וברשומות הנגזרות ב-data/domain-detail.ts שורה 369 'PPCO0007 (סטטוס)', data/centers/debugging.ts, data/verification/transactions.ts ב-xrefs של COR2) מציג את PPCO0007 כהרחבה לשינוי סטטוס (שחרור/TECO) עם דוגמת הודעה ל-MES; לפי SAP היא הרחבה לבדיקה או שינוי של שדות כותרת בשמירת פקודת ייצור. מומלץ לתקן את השם, המטרה, הטריגר, הדוגמה ושדה ה-object (להוסיף EXIT_SAPLCOZV_001), ולבדוק במערכת (SMOD, שאילתת CMOD) האם ההרחבה פעילה על פקודות תהליך (COR1/COR2), שכן עמוד 4.6C מדבר על פקודות ייצור בלבד. ה-BAdI ‏WORKORDER_UPDATE מתועד רשמית ב-S/4HANA (What's New 2022 SPS03, loio 86956eb2f92146db85b12838f4affeb8; ראו רשומת enh:badi:WORKORDER_UPDATE) כדרך לעיבוד או מניעה של שינויים בפקודות, ולכן הוא חלופה סבירה ללוגיקה בשמירה; אין מקור רשמי המכריז עליו כיורש של PPCO0007, ולכן לא נרשם כאן successor. זמינות ההרחבה ב-S/4HANA On-Premise, ממשק ה-Function Exit הנוכחי (פרמטרים, מבנה הכותרת) ומצבה ב-S/4HANA Cloud Public Edition דורשים אימות במערכת SAP חיה (ה-MCP ל-ABAP לא היה זמין בסשן זה).",
  },
  {
    id: "enh:exit:CONFPP05",
    aliases: ["EXIT_SAPLCORF_105"],
    status: {
      status: "unchanged",
      he: "לפי תיעוד ה-Workflow של SAP S/4HANA On-Premise 2025 FPS01 (תרחיש 'Confirmation Variances (PP-SFC)'), ההרחבה CONFPP05 עם ה-Function Exit‏ EXIT_SAPLCORF_105 עדיין מתועדת כהרחבה שיש לתכנת ולהפעיל כדי להודיע למתכנן החומרים (MRP controller) על חריגות באישור הזמנת ייצור; ברשומות החיפוש שנבדקו לא נמצאה הערת פישוט, הסרה או החלפה. הסטטוס מתייחס לקיום ההרחבה ולתפקידה המתועד בלבד, לא לתיאור 'תנועות מלאי באישור' שברשומת המאגר, שאינו נתמך במקורות שאותרו.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Confirmation Variances (PP-SFC) | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/ab6cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש של help.sap.com לנושא 'Confirmation Variances (PP-SFC)' (deliverable: Workflow, SAP S/4HANA 2025 FPS01, loio ab6cb6531de6b64ce10000000a174cb4) קובעת: 'The function module exit EXIT_SAPLCORF_105 (customer enhancement CONFPP05) must be programmed for this scenario', ומתארת כי מתכנן החומרים מקבל פריט עבודה שממנו הוא יכול לערוך את הזמנת הייצור, ליצור הזמנה חדשה, לבטל את האישור או ליצור אישור חדש. הסניפט אינו מזכיר תנועות סחורה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "לפני הסתמכות על CONFPP05 ללוגיקה של תנועות מלאי, לאמת ב-SMOD במערכת היעד את ממשק EXIT_SAPLCORF_105 (אילו טבלאות אישור ותנועות סחורה מועברות אליו) וב-CMOD את הפרויקט הפעיל והקוד הקיים; לבדוק בהסבה ב-ATC/SCMON את השימוש בפועל. ללוגיקה של תנועות סחורה מהפקודה לבחון את BAdI WORKORDER_GOODSMVT, שמופיע ברשומת החיפוש 'Create Equipment Hierarchy' (deliverable: Production Engineering and Operations for Complex Assembly, S/4HANA 2025 FPS01, loio 4f2fcd19248d43169325a397abc51cac) כ-Enhancement Spot שנקרא ב-SE18, בלי לרשום אותו כמחליף עד לאימות ב-SE18 במערכת. לתקן את שם הרשומה ותיאור ההפעלה במאגר לפי התיעוד: הרחבת אישור של הזמנת ייצור (PP-SFC), המשמשת בתיעוד SAP לתרחיש חריגות אישור.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Confirmation Variances (PP-SFC) | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/ab6cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש של help.sap.com לנושא 'Confirmation Variances (PP-SFC)' (deliverable: Workflow, SAP S/4HANA 2025 FPS01, loio ab6cb6531de6b64ce10000000a174cb4) קובעת: 'The function module exit EXIT_SAPLCORF_105 (customer enhancement CONFPP05) must be programmed for this scenario', ומתארת כי מתכנן החומרים מקבל פריט עבודה שממנו הוא יכול לערוך את הזמנת הייצור, ליצור הזמנה חדשה, לבטל את האישור או ליצור אישור חדש. הסניפט אינו מזכיר תנועות סחורה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Preparation and Customizing | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/cc6cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש לנושא 'Preparation and Customizing' (deliverable: Workflow, SAP S/4HANA 2025 FPS01, loio cc6cb6531de6b64ce10000000a174cb4) קובעת: 'To trigger the BUS2116.MaxDifferenceExceeded event, you must first program and activate the function module exit EXIT_SAPLCORF_105 (customer enhancement CONFPP05)' וכי 'An example of how to program the function module exit EXIT_SAPLCORF_105 (customer enhancement CONFPP05) is provided in the include CORUX105'. אותה רשומה נוקבת גם במשימה הסטנדרטית TS20000563: 'Display and enter the standard task TS20000563' ו-'Link the standard task TS20000563 to its possible agents'. גוף העמוד לא נקרא; רשימת הפרמטרים של ה-Function Exit אינה מופיעה בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Variances in Confirmations (SAP Library - Shop Floor Control)",
        url: "https://help.sap.com/saphelp_46c/helpdata/en/ad/9b466f0e18d311ae620060b03c9bbe/content.htm?no_cache=true",
        product: "SAP R/3 4.6C",
        edition: "ecc",
        release: "R/3 4.6C",
        accessedAt: DATE14,
        claim: "עמוד ספריית SAP לגרסת R/3 4.6C‏ 'Variances in Confirmations' (Shop Floor Control), שנקרא במלואו (HTTP 200), מתאר את תרחיש ה-Workflow לחריגות באישור בארבעה צעדים: קישור המשימה הסטנדרטית TS20000563 למעבדים; קישור מתכנן החומרים (אובייקט ארגוני T024D) לניהול הארגוני; הפעלת קישור האירוע בין TS20000563 לאירוע BUS2116.MaxDifferenceExceeded; ולבסוף 'Program and activate function module text EXIT_SAPLCORF_105 in customer enhancement CONFPP05' (כלשון העמוד, כולל המילה text). העמוד מפנה ל-'the documentation for Customer enhancement CONFPP05' (לא אותר כעמוד ציבורי) ואינו מזכיר תנועות סחורה או Backflush.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת המאגר מתארת את CONFPP05 כ'תנועות סחורה באישור': התערבות בתנועות מלאי (Backflush/GR) שנוצרות באישור, הפעלה 'בעת יצירת תנועות סחורה מאישור', טרנזקציות CO11N ו-COR6N, ובבלוק ECC מול S/4HANA: 'נתמך.' ו-'תנועות ל-MATDOC ב-S/4'. הרשומה אינה נוקבת בשם ה-Function Exit. תיאור זה אינו נתמך ברשומות help.sap.com שאותרו: שם מתעדת SAP את CONFPP05 / EXIT_SAPLCORF_105 כהרחבה שמתוכנתת לתרחיש חריגות אישור בהזמנות ייצור (PP-SFC), ללא אזכור תנועות סחורה וללא אזכור הזמנות תהליך (COR6N).",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#CONFPP05",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Preparation and Customizing | Workflow",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/cc6cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025.001",
            accessedAt: DATE14,
            claim: "רשומת החיפוש לנושא 'Preparation and Customizing' (Workflow, SAP S/4HANA 2025 FPS01) קובעת: 'To trigger the BUS2116.MaxDifferenceExceeded event, you must first program and activate the function module exit EXIT_SAPLCORF_105 (customer enhancement CONFPP05)'. הסניפט אינו מזכיר תנועות סחורה.",
            verificationLevel: "sap_official_verified",
          }
        ],
      }
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:exit:CONFPP01",
      "enh:badi:WORKORDER_CONFIRM",
      "enh:badi:WORKORDER_GOODSMVT",
      "tx:CO11N",
      "tx:CO15",
      "tx:CMOD",
      "tx:SMOD",
      "tx:COGI",
      "table:AFRU",
      "table:AFKO"
    ],
    lastVerifiedAt: DATE14,
    notes: "מה שאומת: CONFPP05 היא הרחבת לקוח (Customer Exit) של אישורי הזמנות ייצור (PP-SFC) עם ה-Function Exit‏ EXIT_SAPLCORF_105 ו-include לדוגמה CORUX105, והיא עדיין מתועדת ב-SAP S/4HANA On-Premise 2025 FPS01 בשלוש רשומות של אותו תרחיש Workflow: 'Confirmation Variances (PP-SFC)' (loio ab6cb6531de6b64ce10000000a174cb4), 'Preparation and Customizing' (loio cc6cb6531de6b64ce10000000a174cb4, שבסניפט שלה מופיעה גם המשימה הסטנדרטית TS20000563) ו-'Technical Implementation' (loio c96cb6531de6b64ce10000000a174cb4, שבסניפט שלה: 'You can define the variances of which the MRP controller is to be informed in the function exit EXIT_SAPLCORF_105'). שלוש הרשומות הוחזרו בשירות החיפוש ב-versionId 2025.001; גרסאות קודמות לא נבדקו ולא נטענות כאן. התיעוד הרשמי שאותר (S/4HANA 2025 FPS01 וספריית R/3 4.6C) מתאר את ההרחבה כמקום שבו מגדירים אילו חריגות אישור מדווחות למתכנן החומרים דרך SAP Business Workflow. מה שלא אומת: (1) התיאור במאגר 'תנועות מלאי באישור' וההפעלה 'בעת יצירת תנועות סחורה מאישור' אינם מופיעים באף רשומה רשמית שאותרה; חיפושי 'CONFPP05 goods movement' ו-'confirmation goods movements customer exit production order' החזירו רק עמודי Goods Movement Overview, Reprocessing Goods Movements ו-APIs for Manufacturing, ללא אזכור ההרחבה. אם הפרויקט משתמש ב-EXIT_SAPLCORF_105 לשינוי תנועות סחורה, יש לאמת ב-SMOD/SE37 את ממשק ה-Function Exit במערכת (ה-MCP ל-ABAP לא היה זמין). (2) שיוך ל-COR6N (הזמנות תהליך): כל הרשומות הרשמיות שאותרו משייכות את CONFPP05 ל-PP-SFC; חיפוש 'CONFPI05' החזיר את אותם עמודי Workflow של PP-SFC בלבד, ולכן הרחבות אישור להזמנות תהליך נשארות ללא אימות והטרנזקציה COR6N לא נכללה ב-xrefs. (3) הערת 'תנועות ל-MATDOC ב-S/4' בבלוק המאגר היא שינוי כללי בניהול המלאי ולא שינוי בהרחבה עצמה. (4) BAdI WORKORDER_GOODSMVT מופיע ברשומת החיפוש 'Create Equipment Hierarchy' (deliverable: Production Engineering and Operations for Complex Assembly, S/4HANA 2025 FPS01, loio 4f2fcd19248d43169325a397abc51cac), שהסניפט שלה קובע: 'In BAdI Builder (transaction SE18), call up the enhancement spot WORKORDER_GOODSMVT'; לא נמצא עמוד רשמי המציג אותו כמחליף של CONFPP05, ולכן לא נרשם successor. (5) לא נמצאה אפליקציית Fiori לאישור הזמנת ייצור בקטלוג data/fiori/apps.ts (קיימות F2730 Confirm Jobs ל-PM ו-F3364 Confirm Process Order ל-PP-PI), ולכן אין xref ל-Fiori; רשומת What's New 'Production Order Confirmation (SAP S/4HANA)' נוקבת ב-Technical Name of Product Feature F2265_S4OP, שאינו מזהה אפליקציה בקטלוג הפרויקט ולכן לא נרשם. (6) הסטטוס נשען על המשך התיעוד בגרסת 2025 FPS01 ועל היעדר הערת פישוט ברשומות שנבדקו, ולא על בדיקה במערכת חיה.",
  },
  {
    id: "enh:exit:M61X0001",
    aliases: ["M61X0001 (בדיקות MRP)"],
    status: {
      status: "simplified",
      he: "Customer Exit‏ M61X0001 (סינון חומרים בריצת התכנון הכוללת של MRP) מכוסה בפריט הפישוט הרשמי 'S4TWL - MRP in HANA' ‏(PP-MRP): טבלת 'Classic BAdI or extension / AMDP BAdI' ברשימת הפישוט של SAP S/4HANA 2023 FPS3 מונה את 'Extension M61X0001' תחת 'Material selection for MRP run' ומצמידה לה את ה-AMDP BAdI‏ PPH_MRP_NETTING_BADI, מתודה AT_PLANNING_FILE_ENTRIES_READ. לפי אותו פריט, הרחבות ומימושי BAdI של ה-MRP הקלאסי אינם פועלים ב-MRP Live לחומרים הנתמכים ומתוכננים בו, ואילו לחומר ש-MRP Live מנתב ל-MRP הקלאסי 'the existing classic BAdI implementation still can be used'. המשפט שלפיו מימושים קלאסיים נשארים נתמכים בטרנזקציות שאינן מותאמות ל-HANA (MD50, MD51, LTP) מנוסח בפריט הפישוט לגבי מימושי BAdI המשפיעים על תהליך קריאת הנתונים של ה-MRP הקלאסי (לדוגמה MD_CHANGE_MRP_DATA), והפריט אינו מחיל אותו במפורש על M61X0001. תיעוד PP-MRP 2025 FPS01 עדיין מתעד את ההרחבה בשמה, ועמוד 'MRP Live: Incompatible Changes' מאשר: 'MRP Live (transaction MD01N) does not process BAdIs for materials that are completely planned in SAP HANA'.",
      edition: "on-premise",
      release: "2023 FPS03",
      source: {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 30.2 S4TWL - MRP in HANA (PP-MRP), pp. 732-738",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE14,
        claim: "טבלת 'Classic BAdI or extension / AMDP BAdI' בפריט 30.2 'S4TWL - MRP in HANA' כוללת בעמ' 738 את השורה: Purpose 'Material selection for MRP run', Classic BAdI or extension 'Extension M61X0001', AMDP BAdI 'PPH_MRP_NETTING_BADI => AT_PLANNING_FILE_ENTRIES_READ'. בעמ' 735 נדרש 'Re-implement BAdI implementations and extensions of the classic MRP as AMDP BAdI'.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "לסווג את M61X0001 כפריט פישוט ולא כהרחבה שהוסרה: פריט הפישוט אינו מבטל אותה אלא מורה לממש אותה מחדש כ-AMDP BAdI, וקובע שלחומר ש-MRP Live מנתב ל-MRP הקלאסי המימוש הקלאסי הקיים עדיין שמיש, בעוד MRP Live ‏(MD01N, Schedule MRP Runs) אינה מעבדת BAdIs לחומרים המתוכננים במלואם ב-SAP HANA. המשך פעולתה של ההרחבה בריצת ה-MRP הקלאסי עצמה (MD01, MDBT) אינו נאמר במפורש באף מקור רשמי שנקרא ודורש אימות במערכת. לפני המעבר ל-MRP Live: (1) לממש מחדש את לוגיקת סינון החומרים כ-AMDP BAdI‏ PPH_MRP_NETTING_BADI במתודה AT_PLANNING_FILE_ENTRIES_READ, כפי שמורה טבלת פריט הפישוט; (2) לבדוק אילו חומרים דורשים עיבוד של BAdI או הרחבה בריצת ה-MRP ולסמן אותם ב-'Plan in Classic MRP' בטרנזקציה MD_MRP_FORCE_CLASSIC (לפי סניפט העמוד 'When to Plan in MRP Live and When to Plan with Classic MRP'); (3) לתקן את רובד הפרויקט: מטרת הרשומה ('בחירת מקור, פרמטרים') והדוגמה ('בחירת מקור אספקה') אינן תואמות את SAP, שמגדירה את ההרחבה כסינון חומרים בריצת התכנון הכוללת; בחירת מקור אספקה משויכת ב-SAP ל-MD_MODIFY_SOURCE / PPH_MRP_SOURCING_BADI, והיורש הנקוב בטבלה הוא PPH_MRP_NETTING_BADI ולא 'BAdI MD_*'.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "User Exit: Material Selection for the Total Planning Run | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/5598b6535fe6b74ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "תיעוד PP-MRP לגרסת S/4HANA 2025 FPS01 (loio 5598b6535fe6b74ce10000000a174cb4) מתעד את ההרחבה בשמה: 'The name of the enhancement is M61X0001'. לפי רשומת החיפוש, מטרת ה-User Exit היא סינון חומרים בריצת התכנון הכוללת: 'You can use this user exit, which is predefined by SAP, to restrict the total planning run to certain materials that fulfil freely definable' (הסניפט נקטע כאן), ותנאי מקדים: 'You have defined the key and descriptive text for the user exit in Customizing for MRP in the IMG activity User exit: Material selection for planning run'. אותו loio מופיע גם ב-deliverable‏ 'Sourcing and Procurement'. הסניפט אינו נוקב בשם מודול ה-Function Exit ואינו מזכיר את MRP Live; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 30.2 S4TWL - MRP in HANA (PP-MRP), pp. 732-738",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE14,
        claim: "פריט 30.2 (רכיב יישום PP-MRP; Business Impact note 2268085 'S4TWL - MRP Live on SAP HANA - MD01N'; Document Version 1.35, נקרא מקובץ ה-PDF) קובע בעמ' 735 בין הפעולות הנדרשות: 'Re-implement BAdI implementations and extensions of the classic MRP as AMDP BAdI', ובעמ' 736 תחת 'BAdI related information': 'Enhancements or BAdI implementations of the classic MRP run does not work with MRP Live if the material is supported/planned within MRP Live. Please note: MRP Live can force materials into classic MRP if materials use a setup which is not supported in MRP live', ובהמשך הדוגמה שם: 'The second material B is not supported in MD01N and the planning run routes this material B into classic MRP. Therefore the existing classic BAdI implementation still can be used for material B'. בפסקה נפרדת, שפותחת ב-'Existing BAdI implementations which influence the data reading process of the classic MRP (e.g. BAdI MD_CHANGE_MRP_DATA)', נכתב: 'If the planning transactions are not optimized for HANA (like MD50, MD51 or all Long-Term-Planning (LTP) planning transactions), then the classic BAdIs/extension with their implementations will still be supported'. הטבלה 'Classic BAdI or extension / AMDP BAdI' (עמ' 736 עד 738) כוללת בעמ' 738 את השורה: Purpose 'Material selection for MRP run', Classic BAdI or extension 'Extension M61X0001', AMDP BAdI 'PPH_MRP_NETTING_BADI => AT_PLANNING_FILE_ENTRIES_READ'. בעמ' 736 נכתב גם: 'A new set of AMDP BAdIs will be available for MRP Live from SAP S/4HANA on-premise edition 1603'. מספרי ה-SAP Notes מובאים כפי שהודפסו בפריט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "MRP Live: Incompatible Changes | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/1d4ee5514ec5c90ae10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "תיעוד PP-MRP לגרסת S/4HANA 2025 FPS01 (loio 1d4ee5514ec5c90ae10000000a44176d) מציג טבלת שינויים לא תואמים: 'The following tables contain a list of the incompatible changes that you must take into account when working with MRP Live', ובה השורה 'BAdIs no Longer Supported' עם ההסבר: 'MRP Live (transaction MD01N) does not process BAdIs for materials that are completely planned in SAP HANA'. הסניפט אינו נוקב ב-M61X0001 או ב-Customer Exits בשמם; הקישור להרחבה זו נובע מהטבלה שברשימת הפישוט (ראיה קודמת), שבה 'Extension M61X0001' נמנית לצד ה-BAdIs הקלאסיים. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת M61X0001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת הקטלוג: Customer Exit במודול PP בשם 'בדיקות MRP', מטרה 'התערבות בלוגיקת תכנון MRP (בחירת מקור, פרמטרים)', נקודת הפעלה 'בעת ריצת MRP (MD01/MD02)', אובייקט 'Enhancement M61X0001', דוגמה 'התאמת בחירת מקור אספקה לפי כללי ארגון', ובבלוק ECC מול S/4HANA: 'נתמך ב-classic MRP', 'ב-MRP Live חלק מההרחבות לא נתמכות → BAdI MD_*', 'Exits מסוימים לא פעילים ב-MRP Live', עם דגל inferred. תיאור המטרה והדוגמה סותרים את התיעוד הרשמי: לפי SAP ההרחבה מיועדת לסינון חומרים בריצת התכנון הכוללת (Material selection for the total planning run), ובחירת מקור אספקה משויכת בטבלת רשימת הפישוט ל-MD_MODIFY_SOURCE / MD_MODIFY_PRODVERS / MD_EXT_SUP ול-PPH_MRP_SOURCING_BADI. הרשומה אינה נוקבת בשם מודול ה-Function Exit.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#M61X0001",
      }
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:badi:MD_ADD_ELEMENTS",
      "tx:MD01",
      "tx:MDBT",
      "tx:MD01N",
      "tx:MD50",
      "tx:MD51",
      "tx:CMOD",
      "tx:SMOD",
      "fiori:F1339"
    ],
    lastVerifiedAt: DATE14,
    notes: "שיטה: שירות החיפוש הרשמי של SAP Help ‏(scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE; השאילתות 'M61X0001', 'User Exit: Material Selection for the Total Planning Run', 'MRP Live Incompatible Changes', 'BAdIs no Longer Supported MRP Live', 'customer exits total planning run MRP', 'M61X0002', 'PPH_MRP_NETTING_BADI'), וקריאת פריטי 'S4TWL - MRP in HANA' מקובצי ה-PDF של רשימות הפישוט 2023 FPS3 ו-2025 FPS1. שלושת ה-URL שברשומה נפתרים (HTTP 200) ב-2026-09-14. הסטטוס 'פריט פישוט' נכתב עם גרסת 2023 FPS03 משום שרק במסמך ההוא טבלת ההרחבות ניתנת לקריאה: ברשימת הפישוט של 2025 FPS1 (https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf, פריט 9.5.2 'S4TWL - MRP in HANA' המתחיל בעמ' 651) המשפט 'Re-implement BAdI implementations and extensions of the classic MRP as AMDP BAdI' וההפניה ל-'BAdI related information' מופיעים בעמ' 655, אך הטבלה עצמה מודפסת בעמודים שלאחריו כטקסט מסובב שאינו ניתן לחילוץ, ולכן לא ניתן לאשר מהמסמך של 2025 שהשורה של M61X0001 נשמרה ללא שינוי. סניפט העמוד 'When to Plan in MRP Live and When to Plan with Classic MRP' (loio 8b1f7d5128f6563ce10000000a423f68, 2025.001) קובע 'You should check which materials require the processing of a BAdI during the MRP run' ומזכיר את הטרנזקציה md_mrp_force_classic ואת SAP Note 1914010 (מספר המופיע כלשונו בסניפט ובפריט הפישוט); הטרנזקציה MD_MRP_FORCE_CLASSIC וה-BAdI‏ PPH_MRP_NETTING_BADI אינם קיימים בדאטהסט, ולכן אינם ב-xrefs ולא נרשם successor. לא אומת: שם מודול ה-Function Exit של M61X0001 (אף מקור רשמי שנקרא אינו נוקב בו; רשומת המאגר כותבת 'breakpoint ב-EXIT_' ללא שם), רכיבי ההרחבה ב-SMOD, משמעות 'freely definable' בהמשך הסניפט הקטוע, והמשך פעולתה של ההרחבה בריצת MD01/MDBT הקלאסית. הקישור ל-MD02 ברשומת המאגר אינו נתמך בסניפט הרשמי, שמדבר על ריצת התכנון הכוללת (Total Planning Run). enh:badi:MD_ADD_ELEMENTS נרשם כהקשר: פריט הפישוט מגדירו כ-BAdI ה-ABAP החלופי לתהליכי קריאת הנתונים המותאמים ל-HANA גם ב-MRP הקלאסי (MD01, MD02, MD03), לא כיורש של M61X0001. עמוד תוכן התמיכה 'User exits and BADIs of MRP' ‏(help.sap.com/docs/SUPPORT_CONTENT/mrp/3138698509.html) אותר בכותרתו בלבד וגופו לא נקרא. גוף עמודי ה-Help לא נקרא (מעטפת JavaScript); כל ציטוט תחום לכותרת ולסניפט של רשומת החיפוש או לעמודי ה-PDF שנקראו. ה-MCP ל-ABAP לא היה זמין; אימות ההפעלה בפועל דורש SMOD/CMOD במערכת S/4HANA חיה.",
  },
  {
    id: "enh:exit:SAPLV01Z",
    aliases: ["SAPLV1ZN", "EXIT_SAPLV01Z_014"],
    status: {
      status: "verification_required",
      he: "המפתח SAPLV01Z שבקטלוג ההרחבות לא נמצא באף רשומת חיפוש רשמית של SAP Help כשם של הרחבת SMOD. רשומות החיפוש לגרסת SAP S/4HANA 2025 FPS01 (On-Premise) נוקבות בהרחבה SAPLV1ZN, שרכיב ה-Customer Exit הנקוב בה הוא EXIT_SAPLV01Z_014 (המחרוזת SAPLV01Z מופיעה בהן רק כחלק משם מודול הפונקציה). התיעוד מייעד את SAPLV1ZN להשפעה על סיווג האצווה בזמן קבלת טובין להזמנת ייצור ולהזמנת רכש ולאכלוס שדות אב האצווה; אף עמוד רשמי שאותר אינו מייחס לה קביעת אצווה (Batch Determination), שהיא התכלית שהקטלוג מתאר. ה-BAdI לקביעת אצווה שהתיעוד נוקב בשמו הוא VB_BD_SELECTION, ולא 'VB_BD_*'. ההרחבה SAPLV1ZN עדיין מתוארת כשמישה בעמודי 2025 FPS01, אך מאחר שהשם, התכלית, הטרנזקציות והיורש שברשומת הקטלוג אינם נתמכים בתיעוד, המעמד נשאר 'נדרש אימות נוסף' עד תיקון הקטלוג ובדיקת SMOD במערכת S/4HANA.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לתקן את רשומת הקטלוג: מפתח SAPLV1ZN (שם ההרחבה כפי שהיא מתועדת) עם SAPLV01Z ו-EXIT_SAPLV01Z_014 ככינויים, תכלית 'אכלוס שדות אב האצווה וסיווג האצווה בקבלת טובין להזמנת ייצור ולהזמנת רכש', והסרת התיאור 'קביעת אצווה'. לאמת במערכת S/4HANA חיה: SMOD (קיום ההרחבה SAPLV1ZN ורשימת רכיבי ה-EXIT שלה), CMOD (פרויקט פעיל), SE37 (מודול הפונקציה EXIT_SAPLV01Z_014). ללוגיקת בחירה בקביעת אצווה (FEFO, חסימת אצוות שנפסלו ב-QM) לבחון את ה-BAdI המתועד VB_BD_SELECTION ואת ה-BAdI להצעת כמות LOBM_BATCH_DET_QTY_PROPOSAL, ולא לרשום יורש לפני שמקור רשמי קובע החלפה. לפיתוחי ECC קיימים: בדיקה ב-ATC ו-SCMON.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Alternative Units of Measure in Production | Production Orders (PP-SFC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/10cec353b677b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת החיפוש של help.sap.com לעמוד 'Alternative Units of Measure in Production' במדריך Production Orders (PP-SFC) לגרסת SAP S/4HANA 2025 FPS01 (loio 10cec353b677b44ce10000000a174cb4) קובעת: 'You can use the customer exit EXIT_SAPLV01Z_014 (enhancement SAPLV1ZN) to influence the batch classification at time of goods receipt for the production order and for the purchase order'. לפי הסניפט שם ההרחבה הוא SAPLV1ZN ורכיב ה-Exit הוא EXIT_SAPLV01Z_014, והמחרוזת SAPLV01Z מופיעה בו רק כחלק משם מודול הפונקציה. הסניפט עוסק בסיווג אצווה בזמן קבלת טובין (הזמנת ייצור והזמנת רכש) ואינו מזכיר קביעת אצווה (Batch Determination). גוף העמוד לא נקרא; רכיבי EXIT נוספים של ההרחבה אינם נזכרים בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins (BAdIs) for Batches | Batch Management (LO-BM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/8ffdb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד 'Business Add-Ins (BAdIs) for Batches' במדריך Batch Management (LO-BM) לגרסת SAP S/4HANA 2025 FPS01 (loio 8ffdb753128eb44ce10000000a174cb4). מן הסניפטים: 'Batch Determination You can find the BAdI Preselection of Batches Within Batch Determination (VB_BD_SELECTION) in Customizing for Logistics - General under Batch Management Batch Determination and Batch ...' וכן 'Batch Master You can find these BAdIs in Customizing for Logistics - General under Batch Management Batch Master: Enhancements for Batch Master Transactions (BATCH_MASTER) ... BAdI: Additional Custom Fields and Tab in Batch Master Transactions (VB_BM_ADD_SCREEN_FIELDS)'. VB_BD_SELECTION הוא ה-BAdI היחיד לקביעת אצווה הנקוב בשמו בסניפטים שנצפו; השם VB_BD_BATCH_DETERMINATION שבמאגר אינו מופיע בהם. הסניפטים אינם קובעים ש-BAdI כלשהו מחליף את ההרחבה SAPLV1ZN ואינם מזכירים אותה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Documentary Batches (LO-BM) | Batch Management (LO-BM)",
        url: "https://help.sap.com/docs/SAP_ERP/3db8848948314edeabbea684714e1055/24ffb753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE14,
        claim: "אותו עמוד (loio 24ffb753128eb44ce10000000a174cb4) מפורסם גם במדריך Batch Management (LO-BM) של SAP ERP 6.0 EHP8 (versionId 6.18.latest): 'You can use the enhancement SAPLV1ZN to fill the batch master fields or the batch classification', ולצדו טבלת הפונקציות של אצוות תיעודיות שבסניפט שלה 'Where-used list Yes Batch determination No'. הסניפט מאשר שההרחבה SAPLV1ZN מתועדת גם ב-ECC באותו תפקיד (אכלוס שדות אב האצווה או סיווג האצווה) ואינו מייחס לה קביעת אצווה. אותו loio מוחזר גם עבור SAP S/4HANA 2025 FPS01 באותו נוסח.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility for Quantity Proposal in Batch Determination | Batch Management (LO-BM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/bade65d5ffd049249bbd22cc0c672898.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד 'Extensibility for Quantity Proposal in Batch Determination' במדריך Batch Management (LO-BM) לגרסת 2025 FPS01 (loio bade65d5ffd049249bbd22cc0c672898) נוקב בשם הטכני של ה-BAdI להצעת כמות בקביעת אצווה: 'You can implement custom logic for the following Business Add-Ins (BAdIs) ... Procedures for Quantity Proposal (LOBM_BATCH_DET_QTY_PROPOSAL)'. הסניפט אינו קושר את ה-BAdI להרחבה SAPLV1ZN ואינו קובע החלפה של הרחבה כלשהי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת SAPLV01Z (סותרת את התיעוד הרשמי)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת המאגר מגדירה את SAPLV01Z כ-Customer Exit במודול PP בשם 'קביעת אצווה', תכלית 'התאמת לוגיקת קביעת אצווה אוטומטית (Batch Determination)', אובייקט 'Enhancement (FG SAPLV01Z)', טרנזקציות CO11N, COR6N, VL02N, בלוק ECC מול S/4HANA 'נתמך' / 'ב-S/4 BAdI VB_BD_* לקביעת אצווה', ומסומנת inferred: true. שלוש נקודות אינן נתמכות ברשומות SAP Help: המפתח (התיעוד נוקב בהרחבה SAPLV1ZN, ורשומת המאגר עצמה מתארת את SAPLV01Z כשם קבוצת הפונקציות), התכלית (סיווג אצווה ואכלוס אב האצווה בקבלת טובין, ולא קביעת אצווה) והיורש ('VB_BD_*' אינו שם BAdI; התיעוד נוקב ב-VB_BD_SELECTION לקביעת אצווה, ללא קביעת החלפה). לכן הרשומה אינה משמשת כאן כראיה לתכלית ההרחבה או למעמדה.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#SAPLV01Z",
      }
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "tx:SMOD",
      "tx:CMOD",
      "tx:SE37",
      "tx:MIGO",
      "tx:CO11N",
      "tx:COR6N",
      "tx:VL02N",
      "tx:MSC2N",
      "tx:MSC3N",
      "table:MCH1",
      "table:MCHA",
      "fm:BAPI_BATCH_CREATE",
      "cds:I_Batch",
      "fiori:F1576"
    ],
    lastVerifiedAt: DATE14,
    notes: "מה שאומת מול help.sap.com (שירות החיפוש, scripts/sap-help-search.mjs, 2026-09-14): ההרחבה מתועדת בשם SAPLV1ZN, עם רכיב ה-Exit EXIT_SAPLV01Z_014, בעמודי 2025 FPS01 (On-Premise) ובעמודי SAP ERP 6.0 EHP8 באותם loio: 'Alternative Units of Measure in Production' (10cec353b677b44ce10000000a174cb4), 'Prerequisites/Customizing' (a7fdb753128eb44ce10000000a174cb4, 'You can also fill batch master fields or the batch classification using the enhancement SAPLV1ZN') ו-'Documentary Batches (LO-BM)' (24ffb753128eb44ce10000000a174cb4). בשלושתם התפקיד הוא אכלוס שדות אב האצווה או סיווג האצווה בקבלת טובין; אף אחד מהם אינו מייחס להרחבה קביעת אצווה. חיפוש המחרוזת SAPLV01Z לבדה (S/4HANA On-Premise ו-SAP ERP) מחזיר רק את העמודים הנוקבים ב-EXIT_SAPLV01Z_014; לא אותרה רשומת חיפוש המתארת SAPLV01Z כשם הרחבה, ואי-מציאה זו אינה ראיה לאי-קיום ההרחבה במערכת. עמוד 'Develop Enhancements' של ספריית SAP 4.6C (רשימת ההרחבות של PM/CS) נקרא במלואו ואינו כולל הרחבות אצווה. לקביעת אצווה עצמה התיעוד נוקב בשני BAdI: VB_BD_SELECTION ('Business Add-Ins (BAdIs) for Batches', 8ffdb753128eb44ce10000000a174cb4, 2025.001) ו-LOBM_BATCH_DET_QTY_PROPOSAL להצעת כמות ('Extensibility for Quantity Proposal in Batch Determination', bade65d5ffd049249bbd22cc0c672898, 2025.001; אותו BAdI מוצג בשמו התיאורי ב-'BAdI for Quantity Proposal Procedures in Batch Determination', What's New in SAP S/4HANA 2021, 62512a20dd7641b396f5c7e72739c3a4). שני השמות לא אומתו ב-SE18 במערכת ואינם קיימים כרשומות במאגר, ולכן לא נרשם יורש ולא נוסף xref. השם VB_BD_BATCH_DETERMINATION, המופיע במאגר (troubleshooting, solutions, process-guides, centers/debugging, academy), לא נמצא באף רשומת SAP Help. הטרנזקציות CO11N, COR6N ו-VL02N שברשומת המאגר אינן נזכרות בסניפטים הרשמיים (המתארים קבלת טובין להזמנת ייצור ולהזמנת רכש), ונשמרות כ-xref בהקשר המאגר בלבד. רכיבי EXIT נוספים של SAPLV1ZN, הפרמטרים של EXIT_SAPLV01Z_014 ומעמד ההרחבה בקטלוג הפישוט דורשים בדיקה ב-SMOD/SE37 במערכת S/4HANA חיה או פריט פישוט חתום-גרסה (ה-MCP של sc4sap לא התחבר במושב זה; קטלוג הפישוט ו-SAP Notes חסומים בהתחברות S-user). גוף עמודי help.sap.com לא נקרא; כל טענה תחומה בכותרת ובסניפט של רשומת החיפוש. רשומת ה-CDS I_Batch (data/verification/cds.ts) מפנה ל-enh:exit:SAPLV01Z, ולכן מזהה הרשומה נשמר כ-SAPLV01Z ו-SAPLV1ZN נרשם ככינוי.",
  },
  {
    id: "enh:exit:MBCF0002",
    aliases: ["EXIT_SAPMM07M_001", "MBCF0002 (בדיקת תנועת סחורה)"],
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Connecting an External Warehouse Management System | Library of ALE Business Processes",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/61af834e09164854993e81aa39be576d/a228bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת SAP Help לגרסת S/4HANA 2025 FPS01 (loio a228bd534f22b44ce10000000a174cb4) מפנה בסניפט למדריך היישום של Materials Management: 'Inventory Management and Physical Inventory > Maintain Customer Exits and Business Add-Ins > Maintain Customer Exits for Inventory Management (for MB_CF001) and Maintain Business Add-Ins for Inventory Management (for BAdI MB_DOCUMENT_BADI)'. כלומר צומת ה-IMG לתחזוקת Customer Exits של ניהול המלאי מתועד בגרסת 2025 FPS01. ההרחבה MBCF0002 עצמה אינה נזכרת בכותרת או בסניפט; הסניפט נוקב רק ב-MB_CF001 וב-MB_DOCUMENT_BADI, שאינם מזהים בדאטהסט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility for Characteristic Value Modification for Batch | Batch Management (LO-BM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/ff4093b764ac47d68561a94358273d5b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת Batch Management (LO-BM) לגרסת 2025 FPS01 (loio ff4093b764ac47d68561a94358273d5b) קובעת בסניפט: 'To classify user-defined characteristics automatically during goods movements in Inventory Management you can also use SAP enhancement MBCFC004 EXIT_SAPMM07M_004', לצד ה-BAdI‏ 'Characteristic Value Modification for Batch in Goods Movement Processes (LOBM_PROC_GM_CHARC_VAL_MODIF)'. זו ראיה לכך שהרחבת לקוח מסוג SMOD של ניהול המלאי מתועדת כזמינה לשימוש בגרסת 2025 FPS01. הרשומה אינה מזכירה את MBCF0002 או את EXIT_SAPMM07M_001, ואינה אומרת דבר על תחולתה של הרחבה זו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.9 S4TWL - Performance optimizations within Material Document Processing - lock behavior and stock underrun protection (MM-IM, MM-IM-GF)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE14,
        claim: "פריט הפישוט 27.9 (רכיבי יישום MM-IM ו-MM-IM-GF; הערת Business Impact 2319579 מצוטטת מן הפריט בלבד) נקרא במלואו מקובץ ה-PDF הרשמי. תחת הכותרת 'Customer modifications' הוא קובע: 'Real modification of SAP coding by customers in the area of function group MBWL or the MIGO main program SAPMM07M and its includes using stock aggregate data from the internal tables XMabc must be refactored. Implemented BAdI methods are not affected by this.' הפריט מסביר שעם מודל הנתונים החדש של MM-IM (מגרסת OP1511) אין עוד UPDATE על שדות כמות המלאי אלא INSERT בלבד לטבלת מסמך החומר החדשה, ושהוא מציג את BADI_NSDM_READ_STOCK. הפריט אינו נוקב בשם MBCF0002 או בשם Customer Exit כלשהו של SAPMM07M, ואינו מכריז על הסרה או החלפה של Customer Exits.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 · item 27.6 S4TWL - AVAILABILITY OF TRANSACTIONS IN MM-IM (MM-IM-GF)",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE14,
        claim: "פריט הפישוט 27.6 (רכיב יישום MM-IM-GF; הערת Business Impact 2210569 מצוטטת מן הפריט בלבד) נקרא במלואו מאותו PDF וקובע כלשונו: 'The following transactions for entering and displaying goods movements (material documents) - called \"MB transactions\" - below, have been replaced by the single-screen generalized transaction MIGO or the BAPI's BAPI_GOODSMVT_CREATE and BAPI_GOODSMVT_CANCEL: MB01, MB02, MB03, MB04, MB05, MB0A, MB11, MB1A, MB1B, MB1C, MB31, MBNL, MBRL, MBSF, MBSL, MBST, MBSU and MBBM', וכן 'These transaction do still exist as transaction codes but calling these transaction codes from the menu has the consequence that an error message is raised'. הפריט מפנה לשימוש ב-MIGO או ב-BAPI_GOODSMVT_CREATE. ההקשר לרשומה זו: MB31, MB01, MB11, MB1A ו-MB1C המופיעות ב-xrefs נמנות ברשימת הטרנזקציות שהוחלפו. הפריט אינו מזכיר Customer Exits ואינו אומר דבר על MBCF0002.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת MBCF0002",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת הקטלוג: Customer Exit במודול Cross, שם עברי 'בדיקת תנועת סחורה', אובייקט 'Enhancement MBCF0002 · EXIT_SAPMM07M_001', מטרה 'ולידציה/התערבות בתנועות מלאי (GI/GR)', נקודת הפעלה 'בעת רישום תנועת סחורה (MIGO)', טרנזקציות MIGO, MB31, CMOD, ודוגמה של חסימת GI מאצווה חסומה לאיכות. בלוק ECC מול S/4HANA ברשומה: 'נתמך.' לצד הערת השינוי 'ב-S/4 תנועות ל-MATDOC; BAdI MB_MIGO_BADI' והצמדת Fiori‏ 'Post Goods Movement'. שם מודול הפונקציה, נקודת ההפעלה, השיוך לתוכנית SAPMM07M (הנגזר משם מודול הפונקציה בלבד) והקשר ל-MB_MIGO_BADI נשענים על רשומה זו בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#MBCF0002",
      }
    ],
    xrefs: [
      "enh:badi:MB_MIGO_BADI",
      "enh:technique:customer-exit",
      "tx:MIGO",
      "tx:MB31",
      "tx:MB1A",
      "tx:MB1C",
      "tx:MB01",
      "tx:MB11",
      "tx:CMOD",
      "tx:SMOD",
      "table:MKPF",
      "table:MSEG",
      "fm:BAPI_GOODSMVT_CREATE",
      "cds:I_MaterialDocumentItem",
      "fiori:F0843",
      "obj:material-document",
      "bp:matdoc-read-through-compatibility"
    ],
    lastVerifiedAt: DATE14,
    notes: "מה שאומת: (א) שירות החיפוש הרשמי של SAP Help (scripts/sap-help-search.mjs, המוצר SAP_S4HANA_ON-PREMISE) אינו מחזיר אף עמוד שמזכיר את MBCF0002 או את EXIT_SAPMM07M_001 בכותרת או בסניפט, לא בגרסה 2025.001 ולא בגרסאות קודמות; גם חיפוש WebSearch מוגבל ל-help.sap.com ו-api.sap.com לא החזיר עמוד כזה. (ב) צומת ה-IMG‏ 'Maintain Customer Exits for Inventory Management' תחת 'Maintain Customer Exits and Business Add-Ins' מתועד ב-2025 FPS01, והרחבת SMOD אחרת של תנועות סחורה (MBCFC004 / EXIT_SAPMM07M_004) מתועדת כזמינה לשימוש; זו ראיה עקיפה בלבד לכך שמנגנון ה-Customer Exits של MM-IM לא הוסר, ולא ראיה על MBCF0002 עצמה. הקישור בין EXIT_SAPMM07M_001 לתוכנית SAPMM07M נגזר משם מודול הפונקציה ברשומת המאגר, ואינו נאמר באף מקור רשמי. (ג) פריט הפישוט 27.9 (2023 FPS3) דורש refactoring רק ל-modifications אמיתיות בקוד SAP של MBWL או SAPMM07M שמשתמשות בטבלאות הפנימיות XMabc, וקובע שמימושי BAdI אינם מושפעים; Customer Exits אינם נזכרים בפריט. אותו נוסח בדיוק אומת גם במהדורת 2025 FPS1, פריט 15.3.7 (https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf), שנקראה אף היא כטקסט מלא. (ד) פריט 27.6 (2023 FPS3), ומקבילו 15.3.9 באותו PDF של 2025 FPS1, מונים את MB01, MB11, MB1A, MB1C ו-MB31 בין טרנזקציות ה-MB שהוחלפו ב-MIGO וב-BAPI_GOODSMVT_CREATE; לכן ה-xrefs לטרנזקציות אלה הם הקשר היסטורי של תנועות סחורה ולא טענה שההרחבה נקראת מהן ב-S/4HANA. לכן לא נכתב מעמד S/4HANA מאומת לרשומה זו, והמעמד שהאפליקציה מציגה נגזר מבלוק ה-ECC מול S/4HANA ברשומת המאגר: 'משתנה ב-S/4HANA' (קיימת הערת שינוי). פערים: (1) שם ההרחבה MBCF0002, מודול הפונקציה EXIT_SAPMM07M_001, הממשק שלו ונקודת ההפעלה המדויקת לא הופיעו באף רשומה רשמית ודורשים אימות ב-SMOD ו-CMOD במערכת S/4HANA חיה; (2) ה-BAdI‏ MB_MIGO_BADI, שרשומת המאגר מציגה כחלופת S/4HANA, לא הוחזר בכותרת או בסניפט של אף רשומה רשמית בחיפוש שבוצע, ולכן אינו מוגדר כיורש ואין לו מקור רשמי ברשומה זו; (3) MB_CF001 ו-MB_DOCUMENT_BADI, הנקובים בסניפט הרשמי כאובייקטי ה-IMG של ניהול המלאי, אינם ביקום המזהים של הדאטהסט ולכן אינם ב-xrefs; (4) ההצמדה לאפליקציית Fiori: רשומת 'Process Extensibility for Documents in Inventory' (loio ed827c12afa7489d90b0013fd2733b3e, 2025.001) מציגה את Post Goods Movement כיישום Web GUI שקוד הטרנזקציה שלו MIGO, בעוד F0843 הוא Post Goods Receipt for Purchasing Document (ראו רשומת fiori:F0843); ה-xref ל-F0843 מבטא הקשר של רישום קבלת סחורה בלבד, ולא נטען שההרחבה רצה ביישום זה; (5) הערת המאגר 'ב-S/4 תנועות ל-MATDOC' תואמת את תיאור מודל הנתונים בפריט 27.9 אך MATDOC אינה אובייקט בדאטהסט ולכן אין xref לטבלה, והייצוג הוא דרך obj:material-document; (6) הצמדת MB31 בקטלוג (קבלת תוצרת מהזמנת ייצור) נשענת על רשומת המאגר בלבד; (7) לא נמצא עמוד רשמי במהדורת Public Cloud שמזכיר את ההרחבה, ולא נטענת זמינות או אי-זמינות שם. גוף עמודי SAP Help לא נקרא (מעטפת JavaScript); כל טענה רשמית תחומה בכותרת ובסניפט של רשומת החיפוש, למעט שני פריטי הפישוט שנקראו במלואם מקובצי ה-PDF.",
  },
  {
    id: "enh:badi:MB_MIGO_BADI",
    aliases: ["IF_EX_MB_MIGO_BADI"],
    status: {
      status: "verification_required",
      he: "BAdI קלאסי של ניהול המלאי (MM-IM) להרחבת טרנזקציית MIGO במסכי משנה חיצוניים (external detail subscreens). שמו, ייעודו ומועד הופעתו מאומתים מול הערות השחרור הרשמיות של SAP R/3 Enterprise 4.70 בלבד. באף רשומת חיפוש של help.sap.com ל-SAP S/4HANA On-Premise (2025 FPS01, 2023, What's New) לא נמצא עמוד שמזכיר את MB_MIGO_BADI בשמו, ולכן לא ניתן לקבוע מתיעוד רשמי אם ה-BAdI ללא שינוי, השתנה או הוגבל ב-S/4HANA. מה שכן מתועד ל-S/4HANA 2025 FPS01: הטרנזקציה MIGO ממשיכה להופיע בתפקיד העסקי Goods Movement (MM-IM), וצומת ה-IMG 'Maintain Customer Exits and Business Add-Ins' של ניהול המלאי עדיין נזכר (עבור MB_CF001 ו-MB_DOCUMENT_BADI). ב-S/4HANA 2023 נוסף BAdI חדש לבדיקת פריטי מסמך חומר (BADI_MMIM_CHECK_MATDOC_ITEM) המכסה גם את MIGO, בלי שהתיעוד מציג אותו כיורש של MB_MIGO_BADI.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לאמת במערכת S/4HANA היעד ב-SE18 את קיום הגדרת ה-BAdI ‏MB_MIGO_BADI ואת רשימת המתודות של הממשק שלה, וב-SE19 את המימושים הפעילים שהגיעו מ-ECC. לכל מימוש שקורא או כותב נתוני מסמך חומר: לבדוק גישות ישירות ל-MSEG ו-MKPF מול מודל הנתונים MATDOC של S/4HANA ולהריץ QA של קבלת סחורה (101) ושל ניפוק לפקודה (261) ב-MIGO, בתחזוקת מפעל (ניפוק להזמנת תחזוקה) ובתעשיות תהליכיות (ניפוק וקליטה לפקודת תהליך). לבדיקות נתונים חדשות במסמך החומר לשקול את ה-BAdI הרשמי BADI_MMIM_CHECK_MATDOC_ITEM ‏(S/4HANA 2023), המכסה גם את MIGO וגם את ממשקי ה-SOAP וה-OData; בחיפושים שנערכו לא נמצא תיעוד רשמי המציג חלופה להרחבות מסך של MIGO ביישומי ה-Fiori לקבלת סחורה, ותיעוד ה-App Extensibility שלהם ל-2025 FPS01 נוקב ב-BAdIs נפרדים (MMIM_GR4XY_CHECK_DATA, BADI_MMIM_CHECK_MATDOC_ITEM), ולכן מסכי משנה מותאמים דורשים תכנון מחדש אם התהליך עובר ל-Fiori.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins in Inventory Management (new) | SAP R/3 Enterprise Release 4.70 Release Notes (PDF RN_470_EN, סעיף 13.9.3.1, עמוד מודפס 326)",
        url: "https://help.sap.com/saphelp_470/helpdata/en/c7/220b694a70954c8c95f236ea88d695/RN_470_EN.pdf",
        product: "SAP R/3 Enterprise",
        edition: "ecc",
        release: "R/3 Enterprise Core 4.70 (SAP_APPL 470)",
        accessedAt: DATE14,
        claim: "מסמך הערות השחרור הרשמי (PDF, 1,365 עמודים) הורד ונקרא בקטע הרלוונטי. סעיף 13.9.3.1 'Business Add-Ins in Inventory Management (new)' תחת MM-IM-GF Basic Functions: 'As of SAP R/3 Enterprise Core 4.70 (SAP_APPL 470), the following Business Add-Ins (BAdI) are available: Change item data in transaction MIGO (MB_MIGO_ITEM_BADI); Maintain external detail subscreens for transaction MIGO (MB_MIGO_BADI); Check/complete dialog data for transaction MB21/MB22 (MB_RESERVATION_BADI)'. תחת Effects on Customizing: 'Maintain these Business Add-Ins in Customizing for Inventory Management under Maintain Customer Exits and Business Add-Ins'. סעיף 13.9.4.3 'Functional Enhancements in MIGO (Changed)' מפנה לאותה הערה: 'New Business Add-Ins for MIGO. There are new Business Add-Ins available for MIGO'. המסמך אינו נוקב בשם הממשק ובשמות המתודות ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Connecting an External Warehouse Management System | Logistics Execution (LE)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9609b5f9e9304ef6850945b359a1f5d4/a228bd534f22b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת חיפוש של help.sap.com ל-SAP S/4HANA On-Premise 2025 FPS01 (loio a228bd534f22b44ce10000000a174cb4): 'For more information, see Inventory Management and Physical Inventory > Maintain Customer Exits and Business Add-Ins > Maintain Customer Exits for Inventory Management (for MB_CF001) and Maintain Business Add-Ins for Inventory Management (for BAdI MB_DOCUMENT_BADI) in the Implementation Guide for Materials Management'. כלומר צומת ה-IMG שבו הערת השחרור של 4.70 ממקמת את MB_MIGO_BADI עדיין נזכר בתיעוד S/4HANA 2025 FPS01, אך הרשומה עצמה נוקבת רק ב-MB_CF001 וב-MB_DOCUMENT_BADI ואינה מזכירה את MB_MIGO_BADI.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Goods Movement (MM-IM) | Materials Management (MM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8a57feade137489098f59374c06f1e0e/3b07b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת חיפוש של help.sap.com ל-SAP S/4HANA On-Premise 2025 FPS01 (loio 3b07b753128eb44ce10000000a174cb4), התפקיד העסקי 'Goods Movement (MM-IM)', שם טכני SAP_MM_IM_GOODS_MOVEMENTS: הסניפט מונה בטבלת הפעילויות 'MIGO_GR Goods Movement MIGO Picking List MB26 ... Cancel Material Document MBST'. כלומר הטרנזקציה MIGO נזכרת בתיעוד התפקיד לגרסת 2025 FPS01. הרשומה אינה מזכירה BAdI כלשהו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Objects Released for Developer Extensibility | What's New in SAP S/4HANA 2023",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/2967d1e9d1584d44a77559227678d836.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE14,
        claim: "רשומת What's New in SAP S/4HANA 2023 (loio 2967d1e9d1584d44a77559227678d836): 'Business Add-In (BAdI) Check Item Data in Material Document BADI_MMIM_CHECK_MATDOC_ITEM New. You can use this BAdI to check the data in the material document header and material document item ... The following processes are supported: SOAP APIs, OData APIs, Goods receipts without references, MIGO, Goods issue, transfer posting scenarios'. רשומה אחות באותו deliverable ובאותו versionId, 'BAdI: Check Item Data in Material Document' (loio 696c01cb793c4394b7bbe14a40b3a319), נושאת בשורת האינדקס של הסניפט 'Development Changed BMC MM-IM SAP S/4HANA 2023'. אף אחת מהרשומות אינה מזכירה את MB_MIGO_BADI ואינה מציגה את ה-BAdI החדש כיורש שלו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Post Goods Receipt for Purchasing Document | Inventory Management and Inventory (MM-IM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/df404e3e691f44eabd3fa2ee0412010d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "רשומת חיפוש של help.sap.com ל-SAP S/4HANA On-Premise 2025 FPS01 (loio df404e3e691f44eabd3fa2ee0412010d): 'BADI_MMIM_CHECK_MATDOC_ITEM Check Item Data in Material Document Material Document Item (MATERIALDOCUMENTITEM) ... MMIM_GR4XY_CHECK_DATA Check Header and Item Data in Goods Receipts Inventory Management: Goods Receipt for ProdnOrd, PurOrd, NoRef, InbDeliv'. כלומר ליישום ה-Fiori לקבלת סחורה כנגד מסמך רכש מתועדים BAdIs משלו, ו-MB_MIGO_BADI אינו נזכר בסניפט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת MB_MIGO_BADI",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת הקטלוג: BAdI חוצה מודולים, 'BAdI ל-MIGO', ייעוד: הרחבת מסך ולוגיקה של MIGO (לשוניות, שדות, בדיקות בתנועת סחורה), אובייקט 'BAdI MB_MIGO_BADI · IF_EX_MB_MIGO_BADI', נקודת הפעלה 'באירועי MIGO (PBO/PAI/POST)', טרנזקציות MIGO ו-SE19, ניפוי ב-SE19 עם breakpoint במתודות ה-BAdI. בלוק ECC מול S/4HANA ברשומה: 'נתמך.', 'תנועות ל-MATDOC.', Fiori 'Post Goods Movement'. שם הממשק, האירועים ברמת המתודה, תחולת S/4HANA וההצמדה ליישום Fiori נשענים על רשומה זו בלבד; הערת השחרור הרשמית של 4.70 מתארת את ה-BAdI רק כ-'Maintain external detail subscreens for transaction MIGO'.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#MB_MIGO_BADI",
      }
    ],
    xrefs: [
      "enh:technique:classic-badi",
      "enh:exit:MBCF0002",
      "enh:badi:WORKORDER_GOODSMVT",
      "tx:MIGO",
      "tx:MIGO_GR",
      "tx:MBST",
      "tx:SE18",
      "tx:SE19",
      "table:MSEG",
      "table:MKPF",
      "fm:BAPI_GOODSMVT_CREATE",
      "cds:I_MaterialDocumentItem",
      "obj:material-document",
      "fiori:F0843"
    ],
    lastVerifiedAt: DATE14,
    notes: "שיטה: שתים-עשרה שאילתות בשירות החיפוש הרשמי של SAP Help (scripts/sap-help-search.mjs; המוצרים SAP_S4HANA_ON-PREMISE, SAP_ERP ו-SUPPORT_CONTENT), ארבעה חיפושי רשת מוגבלים לדומיינים הרשמיים, ושלושה מסמכי PDF רשמיים מ-help.sap.com שהורדו ונקראו בקטעים הרלוונטיים (הערות השחרור המלאות של R/3 Enterprise 4.70, RN_470_EN; הערות השחרור MM ל-ECC 6.0, פרק 13; הערות השחרור Procurement and Logistics Execution ל-EHP4). מה שאומת רשמית: השם MB_MIGO_BADI, ייעודו (מסכי משנה חיצוניים ב-MIGO), מועד ההופעה (R/3 Enterprise Core 4.70, SAP_APPL 470) וצומת ה-IMG שלו; וכן, בנפרד, שהטרנזקציה MIGO מופיעה בתפקיד העסקי Goods Movement (MM-IM) בתיעוד S/4HANA 2025 FPS01 (loio 3b07b753128eb44ce10000000a174cb4, SAP_MM_IM_GOODS_MOVEMENTS). מה שלא נמצא: אף עמוד help.sap.com ל-S/4HANA (2023, 2025 FPS01, What's New, Simplification) המזכיר את MB_MIGO_BADI בכותרת או בסניפט; PDF ההערות של ECC 6.0 ו-EHP4 אינם מזכירים אותו. שם הממשק IF_EX_MB_MIGO_BADI ושמות המתודות אינם מופיעים באף מקור רשמי שנמצא ונשענים על קטלוג הפרויקט בלבד. עמוד Support Content אחד בדומיין help.sap.com (תוכן שמקורו בוויקי הקהילה, loio 3353523494) מונה בשורת אינדקס כותרת 'How to access to the attibuts of Class LCL_MIGO_KERNEL in Badi MB_MIGO_BADI'; הוא אינו מצוטט כראיה כי גוף העמוד אינו נגיש (מעטפת JavaScript) ומקורו קהילתי. ההצמדה 'Post Goods Movement (F0843)' ברשומת הקטלוג אינה מדויקת לפי רשומת ה-Fiori של הפרויקט: F0843 הוא Post Goods Receipt for Purchasing Document; ליישומי ה-Fiori לקבלת סחורה תיעוד App Extensibility משלהם (2025 FPS01, deliverable Inventory Management and Inventory) הנוקב ב-BAdIs נפרדים (MMIM_GR4XY_CHECK_DATA, BADI_MMIM_CHECK_MATDOC_ITEM) ולא ב-MB_MIGO_BADI. לא נמצא SAP Note או KBA בעמוד ציבורי רשמי; לא הוקלד מספר מהזיכרון. אין MCP חי, ולכן קיום ה-BAdI ורשימת המתודות ב-S/4HANA דורשים אימות ב-SE18 במערכת היעד.",
  },
  {
    id: "enh:badi:WORKORDER_GOODSMVT",
    status: {
      status: "unchanged",
      he: "ה-BAdI WORKORDER_GOODSMVT קיים ב-SAP S/4HANA On-Premise 2025 FPS01 באותו שם: התיעוד הרשמי של Production Engineering and Operations מכנה אותו enhancement spot ו-BAdI definition, מפנה למימוש ב-SE18 ומציין מימוש לדוגמה מסופק על ידי SAP (MPE_CREATE_EQUIP_HIERARCHY). לא אותר מקור רשמי המכריז על פריט פישוט, הוצאה משימוש, שינוי בממשק או יורש ל-BAdI זה. BAdI נפרד, BD_WORKORDER_GOODSMOVT_BKF_GDR (חדש ב-S/4HANA 2022), מתועד לשינוי נתוני תנועות הסחורה הנרשמות ואינו מוצג במקור כמחליף. השינוי שהמאגר מציין ('תנועות ל-MATDOC') נוגע לשכבת השמירה של מסמכי החומר ולא לממשק ה-BAdI, ולא נמצא מקור רשמי הקושר בין השניים.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Create Equipment Hierarchy | Production Engineering and Operations for Complex Assembly",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/4f2fcd19248d43169325a397abc51cac.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד רשמי של SAP S/4HANA On-Premise 2025 FPS01 (deliverable: Production Engineering and Operations for Complex Assembly, loio 4f2fcd19248d43169325a397abc51cac) נוקב ב-BAdI בשמו ומתאר מימוש שלו ב-SE18: 'In BAdI Builder (transaction SE18), call up the enhancement spot WORKORDER_GOODSMVT. Choose Implementations.'; 'You can use an example implementation of the BAdI definition WORKORDER_GOODSMVT to build equipment hierarchies during assembly.'; 'You see a list of implementations for the BAdI definition WORKORDER_GOODSMVT. Activate the example implementation MPE_CREATE_EQUIP_HIERARCHY in the class CL_IM_MPE_EQUIP_HIERARCY' (שם המחלקה כפי שמופיע בסניפט); 'If you want to create equipment hierarchies differently, create your own implementation of the same enhancement spot.' SAP מכנה את האובייקט גם enhancement spot וגם BAdI definition. הסניפט אינו מפרט ממשק, מתודות או פרמטרים של ה-BAdI, אינו מזכיר Backflush, MATDOC או הזמנות תחזוקה, ועוסק בתרחיש PEO (בניית היררכיית ציוד בהרכבה).",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "במעבר מ-ECC ל-S/4HANA: לשמור את המימושים הקיימים של WORKORDER_GOODSMVT ולבדוק אותם ב-SE18/SE19; לאמת במערכת חיה את הממשק, רשימת המתודות והפרמטרים, שאינם מופיעים באף מקור רשמי שנמצא. להריץ QA של תנועות הסחורה הנוצרות מאישורים (CO11N בייצור, COR6N ו-CORK בתעשיות תהליכיות) כולל Backflush, קבלת תוצר ועיבוד חוזר ב-COGI, ולוודא שהמימוש אינו מניח את מבנה MKPF/MSEG של ECC. אם הדרישה היא לשנות נתוני תנועת סחורה באישור, לבחון לפי התיעוד הרשמי את ה-BAdI BD_WORKORDER_GOODSMOVT_BKF_GDR (S/4HANA 2022). התחולה על הזמנות תחזוקה (IW42, IW3K) נשענת על המאגר בלבד ודורשת אימות במערכת. עבור S/4HANA Cloud Public Edition לא נמצא תיעוד ל-BAdI זה, ולכן אין להניח זמינות שם ללא אימות.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Create Equipment Hierarchy | Production Engineering and Operations for Complex Assembly",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/4f2fcd19248d43169325a397abc51cac.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד רשמי של SAP S/4HANA On-Premise 2025 FPS01 (deliverable: Production Engineering and Operations for Complex Assembly, loio 4f2fcd19248d43169325a397abc51cac) נוקב ב-BAdI בשמו ומתאר מימוש שלו ב-SE18: 'In BAdI Builder (transaction SE18), call up the enhancement spot WORKORDER_GOODSMVT. Choose Implementations.'; 'You can use an example implementation of the BAdI definition WORKORDER_GOODSMVT to build equipment hierarchies during assembly.'; 'You see a list of implementations for the BAdI definition WORKORDER_GOODSMVT. Activate the example implementation MPE_CREATE_EQUIP_HIERARCHY in the class CL_IM_MPE_EQUIP_HIERARCY' (שם המחלקה כפי שמופיע בסניפט); 'If you want to create equipment hierarchies differently, create your own implementation of the same enhancement spot.' SAP מכנה את האובייקט גם enhancement spot וגם BAdI definition. הסניפט אינו מפרט ממשק, מתודות או פרמטרים של ה-BAdI, אינו מזכיר Backflush, MATDOC או הזמנות תחזוקה, ועוסק בתרחיש PEO (בניית היררכיית ציוד בהרכבה).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE14,
        claim: "רשומת המאגר מגדירה את WORKORDER_GOODSMVT כ-BAdI (מודול PP, אובייקט 'BAdI WORKORDER_GOODSMVT') להתערבות בתנועות מלאי הקשורות לפקודה (ניפוק, קבלה, Backflush), עם הפעלה 'ביצירת תנועות סחורה מהפקודה', הטרנזקציות CO11N, COR6N, MIGO ו-SE19, ודוגמה של קביעת אצווה מותאמת לקבלת תוצר. בבלוק ECC מול S/4HANA הרשומה אומרת 'נתמך.' ו-'תנועות ל-MATDOC.', והיא מסומנת inferred. רשומת ה-Customer Exit PPCO0021 באותו קטלוג מפנה אליו ('העדף BAdI WORKORDER_GOODSMVT'), רשומות ה-tx-intel של CO01, CORK, IW3K ו-IW42 מונות אותו בין ה-BAdIs שלהן, ו-data/workbenches-ext.ts מתייג אותו 'verify SE18'. השיוך להזמנות תחזוקה (IW42, IW3K) והממשק נשענים על המאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#WORKORDER_GOODSMVT",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Change of Goods Movement Data | What's New in SAP S/4HANA 2022",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/b2955f4446fc4c3cb76d7c1f7a22bf0e.html?locale=en-US&state=PRODUCTION&version=2022.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        accessedAt: DATE14,
        claim: "פריט What's New לגרסת SAP S/4HANA 2022 (Manufacturing > Production Operations > Production Execution, loio b2955f4446fc4c3cb76d7c1f7a22bf0e) קובע: 'The new Business Add-In (BAdI) Change of Goods Movement Data (BD_WORKORDER_GOODSMOVT_BKF_GDR) enables you to influence the data that will be posted for the goods' (הסניפט נחתך כאן). הרשומה נוקבת ב-BAdI חדש ונפרד, BD_WORKORDER_GOODSMOVT_BKF_GDR, ואינה מזכירה את WORKORDER_GOODSMVT. ראיה עקיפה: חסר מקור רשמי הקושר בין שני ה-BAdIs (מחליף, משלים או מקביל).",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins for Production Orders and Process Orders | PP Production Planning and Control, Release Notes SAP R/3 Enterprise Release 4.70 (PDF, סעיף 19.2.1)",
        url: "https://help.sap.com/saphelp_crm60/helpdata/en/06/fb4d40eae76f13e10000000a1550b0/19_pp_en.pdf",
        product: "SAP R/3 Enterprise",
        edition: "ecc",
        release: "R/3 Enterprise Core 4.70 (SAP_APPL 470)",
        accessedAt: DATE14,
        claim: "הערות השחרור הרשמיות (PDF, 54 עמודים, הורד והטקסט שלו נסרק במלואו) מונות בסעיף 19.2.1 'Business Add-Ins for Production Orders and Process Orders' את ה-BAdIs החדשים WORKORDER_INFOSYSTEM ו-WORKORDER_REWORK ואת השינויים ב-WORKORDER_UPDATE וב-WORKORDER_CONFIRM; השם WORKORDER_GOODSMVT אינו מופיע במסמך כלל. ממצא שלילי: המסמך אינו מתעד את ה-BAdI הזה, ואינו אומר דבר על S/4HANA.",
        verificationLevel: "legacy_context_only",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-In for Backflush in Repetitive Manufacturing (New) | PP Production Planning and Control, Release Notes SAP ERP Central Component Release 6.0 (PDF, סעיף 18.9.1)",
        url: "https://help.sap.com/doc/ecedecf75e7c48498161e79546881b7b/6.00.29/en-US/Chapter_18__PP_Production_Planning_and_ControlE_(2).PDF",
        product: "SAP ERP Central Component",
        edition: "ecc",
        release: "SAP ECC 6.0 (SAP_APPL 600)",
        accessedAt: DATE14,
        claim: "הערות השחרור הרשמיות של PP ל-SAP ERP Central Component 6.0 (PDF, 31 עמודים, הורד והטקסט שלו נסרק במלואו) מתעדות בסעיף 18.9.1, תחת PP-REM (ייצור חוזר), BAdI אחד בלבד לתנועות סחורה: 'As of SAP ECC 6.0 (SAP_APPL 600) you can use the Business Add-In (BAdI) Goods Movements in Backflush(RM_BFLUSH_GOODSMVT) in Repetitive Manufacturing to modify the automatically determined goods movements in the backflush according to you own requirements, or to add new goods movements' (כלשון המסמך). ה-BAdI הזה שייך לייצור חוזר ואינו WORKORDER_GOODSMVT; השם WORKORDER_GOODSMVT אינו מופיע במסמך כלל. ממצא שלילי: גם הערות השחרור של ECC 6.0 אינן מתעדות את ה-BAdI הזה, וקיומו ב-ECC ממשיך להישען על המאגר בלבד.",
        verificationLevel: "legacy_context_only",
      }
    ],
    xrefs: [
      "enh:technique:classic-badi",
      "enh:technique:enhancement-spot",
      "enh:badi:WORKORDER_CONFIRM",
      "enh:badi:WORKORDER_UPDATE",
      "enh:badi:MB_MIGO_BADI",
      "enh:exit:CONFPP05",
      "enh:exit:PPCO0021",
      "tx:CO11N",
      "tx:COR6N",
      "tx:CORK",
      "tx:MIGO",
      "tx:COGI",
      "tx:SE18",
      "tx:SE19",
      "tx:IW42",
      "tx:IW3K",
      "table:RESB",
      "table:MSEG",
      "obj:material-document",
      "fm:BAPI_GOODSMVT_CREATE",
      "fm:BAPI_PROCORDCONF_CREATE_TT",
      "cds:I_MaterialDocumentItem",
      "fiori:F0843",
      "fiori:F3364"
    ],
    lastVerifiedAt: DATE14,
    notes: "שיטה: תשע שאילתות ב-scripts/sap-help-search.mjs (On-Premise, SAP ERP, Public Cloud; בהן WORKORDER_GOODSMVT, enhancement spot WORKORDER_GOODSMVT, BAdI goods movement order, Business Add-Ins production order goods movements, Movement Types for PM/CS Orders BAdI, PM/PP/PS/PI Orders goods movements BAdI, BD_WORKORDER_GOODSMOVT_BKF_GDR), חיפוש רשת אחד מוגבל לדומיינים הרשמיים, ושני מסמכי PDF רשמיים שהורדו ונסרקו במלואם ומצוטטים כראיות: הערות השחרור של PP ל-R/3 Enterprise 4.70 (54 עמודים) והערות השחרור של PP ל-SAP ERP Central Component 6.0, פרק 18 (31 עמודים), שמתעד רק את RM_BFLUSH_GOODSMVT לייצור חוזר ואינו מזכיר את WORKORDER_GOODSMVT. מה שאומת רשמית: השם, הסיווג (enhancement spot / BAdI definition), מימוש ב-SE18, וקיומו של מימוש לדוגמה מסופק MPE_CREATE_EQUIP_HIERARCHY לתרחיש PEO ב-2025 FPS01. ארבעת הציטוטים מעמוד 'Create Equipment Hierarchy' אומתו מילה במילה, אך לא בשאילתה אחת: חלון הסניפט משתנה לפי השאילתה, ושם המחלקה CL_IM_MPE_EQUIP_HIERARCY עלה רק בשאילתה ממוקדת אליו. לא אומת: הממשק (שם IF_EX_ לא הופיע באף מקור, ולכן אין alias), רשימת המתודות והפרמטרים, המונח 'קלאסי' לעומת 'Enhancement Spot' (SAP משתמשת בשני המונחים באותו עמוד, ולכן שני ה-xrefs לטכניקות משקפים את הניסוח הרשמי ולא הכרעה), והתחולה על הזמנות תחזוקה. עמוד 'Movement Types for PM/CS Orders' (PLM, 2025.001, loio 8ad7c353b677b44ce10000000a174cb4) מזכיר 'a customer-defined key that is read by a BAdI' בלי לנקוב בשם ה-BAdI, ולכן לא נכלל כראיה. גוף עמודי help.sap.com לא נקרא (מעטפת JavaScript); כל טענה רשמית תחומה בכותרת ובסניפט, למעט שני ה-PDF שנקראו במלואם. שם המחלקה CL_IM_MPE_EQUIP_HIERARCY מצוטט כפי שהופיע בסניפט ולא תוקן. חיפוש תחת SAP S/4HANA Cloud Public Edition לא החזיר אף רשומה הנוקבת בשם ה-BAdI (ממצא תחום בחיפוש, לא נטענת אי-זמינות). הסטטוס הנגזר שהאפליקציה מציגה כיום (בלוק ECC מול S/4HANA ברשומת exits.ts: 'משתנה', מסומן inferred ולכן ברמת 'נדרש אימות נוסף') שונה מהסטטוס המחובר 'ללא שינוי': הערת השינוי במאגר מתייחסת ל-MATDOC (שכבת השמירה של מסמכי החומר) ולא לממשק ה-BAdI, ואף מקור רשמי אינו קושר בין ה-BAdI ל-MATDOC. ה-BAdI BD_WORKORDER_GOODSMOVT_BKF_GDR אינו מזהה בדאטהסט ולכן אינו xref ואינו successor. ה-MCP ל-ABAP לא היה זמין; אימות SE18 במערכת חיה לא בוצע.",
  },
  {
    id: "enh:technique:key-user-extensibility",
    aliases: ["Key User Extensibility", "Custom Fields and Logic"],
    status: {
      status: "s4_native",
      he: "טכניקת הרחבה של S/4HANA ליישומי Fiori: הוספת שדות לקוח להקשר עסקי (Custom Fields) והתאמת הלוגיקה העסקית (Custom Logic) דרך היישום Custom Fields and Logic, כמתועד ב-SAP Fiori Overview לגרסת S/4HANA On-Premise 2025 FPS01. בתחזוקת מפעל התיעוד הרשמי מונה את ההקשר העסקי Asset Management: Maintenance Order (EAMS_ORD) ליישום Manage Maintenance Orders, ובתעשיות תהליכיות רשומת What's New 2022 מתעדת הפעלת שדות נוספים על ידי Key Users ביישום Manage Process Orders. אף עמוד רשמי שנמצא אינו מתייחס ל-ECC; ההיעדר ב-ECC הוא קביעת המאגר בלבד.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Field and Business Logic Extensibility for SAP Fiori Apps | SAP Fiori Overview",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/5c8209be60f34e3e9921f2bbc129f082.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד SAP Fiori Overview לגרסת S/4HANA On-Premise 2025 FPS01 (loio 5c8209be60f34e3e9921f2bbc129f082) מגדיר את הטכניקה: 'Add customer-specific fields to your SAP Fiori app and adapt the business logic as required' ו-'The field extensibility capability of SAP Fiori apps enables you to add customer-specific fields (custom fields) to a business context of an application in a one-to-one relation'. סניפט נוסף של אותה רשומה מוסיף: 'ABAP Platform provides the Custom Fields app and the Custom Logic app to create your own fields and enhancement implementations, to customize applications and their UIs, reports, email templates, and form' (הסניפט נקטע כאן). גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "לשדות לקוח חדשים ביישומי Fiori של תחזוקת מפעל ותעשיות תהליכיות להעדיף את הנתיב המתועד: יצירת השדה ביישום Custom Fields and Logic בהקשר העסקי המתאים (למשל EAMS_ORD להזמנת תחזוקה) והפעלתו ביישומים הרלוונטיים, ולוגיקה דרך Custom Logic על BAdI שהעמוד הרשמי של היישום מונה. לפני המימוש לבדוק בעמוד App Extensibility של היישום הספציפי אילו הקשרים עסקיים ואילו BAdIs זמינים, שכן הרשימה שונה מיישום ליישום. הרחבות ECC קיימות (Customer Exits, CI_AUFK) אינן מוחלפות אוטומטית: מיפוי שלהן לשדות לקוח ולוגיקה חדשים דורש בדיקה במערכת S/4HANA.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Field and Business Logic Extensibility for SAP Fiori Apps | SAP Fiori Overview",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/22bbe89ef68b4d0e98d05f0d56a7f6c8/5c8209be60f34e3e9921f2bbc129f082.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד SAP Fiori Overview לגרסת S/4HANA On-Premise 2025 FPS01 (loio 5c8209be60f34e3e9921f2bbc129f082) מגדיר את הטכניקה: 'Add customer-specific fields to your SAP Fiori app and adapt the business logic as required' ו-'The field extensibility capability of SAP Fiori apps enables you to add customer-specific fields (custom fields) to a business context of an application in a one-to-one relation'. סניפט נוסף של אותה רשומה מוסיף: 'ABAP Platform provides the Custom Fields app and the Custom Logic app to create your own fields and enhancement implementations, to customize applications and their UIs, reports, email templates, and form' (הסניפט נקטע כאן). גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Manage Maintenance Orders (Key User) | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/0b67655d18b7494baa813f1fa6caffb2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE14,
        claim: "עמוד Maintenance Management לגרסת 2025 FPS01 (loio 0b67655d18b7494baa813f1fa6caffb2): 'As a key user, you can extend the Manage Maintenance Orders app according to your business needs' ו-'You can add fields to the following UI elements using key user adaptation', עם ההקשר העסקי 'Asset Management: Maintenance Order (EAMS_ORD)' וטכנולוגיית UI‏ SAP Fiori. הסניפט אינו מונה את שמות ה-BAdIs של היישום; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Key User Extensibility for Manage Maintenance Orders App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/e765a4541f49412b9508fdab1ecaf2c9.html?locale=en-US&state=PRODUCTION&version=2025.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        accessedAt: DATE14,
        claim: "רשומת What's New לגרסת S/4HANA 2025 (loio e765a4541f49412b9508fdab1ecaf2c9, מזהה פריט ASM-1ECA-F2C9): 'As a key user, you can now enhance order operations in the Manage Maintenance Orders app (F5241) with custom fields that' (הסניפט נקטע כאן). הרשומה מצמידה את הרחבת ה-Key User לפעולות ההזמנה למזהה היישום F5241 החל מגרסה 2025; אינה מפרטת הקשר עסקי או שדות.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Extensibility: Manage Process Orders | What's New in SAP S/4HANA 2022",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/1a20fcb6b10f4c699b9881725d257284.html?locale=en-US&state=PRODUCTION&version=2022.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        accessedAt: DATE14,
        claim: "רשומת What's New לגרסת S/4HANA 2022 (loio 1a20fcb6b10f4c699b9881725d257284) לתעשיות תהליכיות: 'Key users can enable additional fields in the Manage Process Orders app', מסווגת בסניפט כ-Extensibility, New, פריט היקף BJ8, רכיב PP-FIO-PI, SAP S/4HANA 2022. הסניפט אינו נוקב בהקשר העסקי או במזהה היישום; גוף העמוד לא נקרא. רשומה מקבילה באותה גרסה קיימת ל-Manage Process Order Operations (loio cfa1ded421e34d4c9717c49ead0edca8).",
        verificationLevel: "sap_official_verified",
      }
    ],
    xrefs: [
      "fiori:F2731",
      "fiori:F3577",
      "fiori:F1511",
      "enh:exit:IWO10018",
      "enh:badi:WORKORDER_UPDATE",
      "enh:technique:new-badi",
      "enh:technique:enhancement-spot",
      "enh:technique:customer-exit",
      "tx:SE18",
      "tx:SE19"
    ],
    lastVerifiedAt: DATE14,
    notes: "מה שאומת מול help.sap.com (שירות החיפוש הרשמי, scripts/sap-help-search.mjs, המוצר SAP_S4HANA_ON-PREMISE, 2026-09-14): הטכניקה מתועדת לגרסת 2025 FPS01 בעמוד SAP Fiori Overview כהרחבת שדות ולוגיקה ליישומי Fiori דרך היישום Custom Fields and Logic; יישומה בתחזוקת מפעל (EAMS_ORD ליישום Manage Maintenance Orders, וב-What's New 2025 שדות לקוח לפעולות ההזמנה) ובתעשיות תהליכיות (Manage Process Orders ו-Manage Process Order Operations, What's New 2022). רשומות רשמיות נוספות שנראו ולא צוטטו: 'What's New Viewer: Unified Category for Extensibility Changes' (2023 FPS01, loio 52e97019b1324f72a5c8ea3d52c6c22d) המונה 'developer extensibility, key user extensibility, or side-by-side extensibility' כשלוש קטגוריות; עמודי App Extensibility של Maintenance Management ל-Create Technical Object, Change Technical Object, Display Maintenance Item ו-Report Malfunction (2025.001) המפנים לתיעוד ה-BAdI בתוך היישום Custom Fields and Logic ('Custom Logic, your implementation, BAdI Documentation'); ו-'Creating Custom Fields and Custom Business Logic' (SAP Fiori Overview, loio 40d3a9b11e77438e865bdff21d9cff72). מה שלא אומת: שמות ה-BAdIs הזמינים ל-Custom Logic בכל יישום (מופיעים רק בגוף העמודים, שלא נקרא); Custom CDS Views ו-Custom Business Objects כחלק מהטכניקה וההגדרה 'Developer Extensibility = ABAP Cloud' שברשומת המאגר (data/enhancements.ts#key-user-extensibility) לא נתמכו בסניפט שנמצא; הסיווג 'Clean Core' ו-'הדרך המומלצת' שברשומת המאגר אינם מופיעים באף עמוד רשמי שנמצא, ולכן נשארו ברמת המאגר ולא נכתבו בסטטוס. ההיעדר ב-ECC ('לא קיים') הוא קביעת המאגר; העמודים הרשמיים אינם מתייחסים ל-ECC. סתירת מזהה ידועה: התיעוד הרשמי מצמיד את Manage Maintenance Orders למזהה F5241, בעוד קטלוג ה-Fiori של הפרויקט רושם F2731 (ראו רשומת fiori:F2731), ולכן ה-xref כאן מפנה ל-F2731. ה-xref ל-WORKORDER_UPDATE הוא הקשר של BAdI להזמנת תחזוקה בלבד; לא נמצא עמוד רשמי הקובע שהוא חשוף ב-Custom Logic. המעמד הנגזר שהאפליקציה הציגה לפני הרשומה: 'משתנה ב-S/4HANA' לפי בלוק ECC מול S/4HANA ברשומת הטכניקה.",
  },
  {
    id: "enh:technique:customer-exit",
    aliases: ["Customer Exits", "SMOD/CMOD", "Function Module Exit"],
    status: {
      status: "verification_required",
      he: "הטכניקה מתועדת בתוך ערכת התיעוד של SAP S/4HANA On-Premise: הרשומות של 'Changing the SAP Standard "
        + "(BC)' מגדירות את מושג ההרחבה ומונות את נושאי המשנה של הטכניקה, ובהם Exit Types, Searching for "
        + "Applications with Exits, Creating Add-On Projects, Activating and Deactivating Projects "
        + "ו-Transporting Add-On Projects, ובגרסת 2025 FPS01 תיעוד תחזוקת מפעל ותעשיות תהליכיות עדיין מפנה "
        + "להרחבות לקוח ולטרנזקציה CMOD. עם זאת, אף עמוד רשמי שנמצא אינו קובע את מעמד הטכניקה ב-S/4HANA ביחס "
        + "ל-ECC: לא נמצאו פריט פישוט, הערת הסרה או הכרזת יורש לטכניקה כולה, ומנגד עמוד ה-Customer Exits עצמו "
        + "מציג הגירה ל-Business Add-Ins ככיוון. הסטטוס הנגזר שהאפליקציה מציגה כיום, 'משתנה ב-S/4HANA', נשען על "
        + "שורת המאגר 'נתמך; מועדף BAdI.' (data/enhancements.ts#customer-exit) שאין לה מקור רשמי, ולכן נרשם כאן "
        + "סטטוס לאימות במקומו."
        + " לגבי SAP S/4HANA Cloud Public Edition: עמוד ה-Extensibility הרשמי (גרסה 2608.500) מונה שלוש אפשרויות "
        + "הרחבה, Key User Extensibility, Developer Extensibility דרך ה-ABAP Environment ו-Side-by-Side "
        + "Extensibility דרך SAP BTP, והמונחים Customer Exit, SMOD ו-CMOD אינם מופיעים בטקסט גוף העמוד שנקרא "
        + "(התרשים האינטראקטיבי שבעמוד לא נקרא); זהו ממצא על עמוד אחד ושלוש שאילתות חיפוש, לא קביעת אי-זמינות. מעמד "
        + "הטכניקה ב-SAP S/4HANA Cloud Private Edition לא נבדק בנפרד.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "בהיקף מיגרציה: לאתר את פרויקטי ה-CMOD הפעילים ואת מודולי ה-EXIT_ שהם מפעילים (CMOD לפרויקטים, SMOD "
        + "לתיעוד ההרחבה) ולהריץ עליהם Custom Code Migration/ATC לפני ההמרה. לכל הרחבה קיימת לבדוק בתיעוד היישום "
        + "הספציפי בגרסת היעד אם SAP מספקת BAdI מקביל, ולהעדיף אותו: בתחזוקת מפעל, עמוד פונקציית העסק LOG_EAM_CI_4 "
        + "שברשומת הראיה החמישית קובע שהרחבות לקוח מסוימות הומרו ל-BAdIs, ומצמיד ל-IMRC0001 את 'BAdI: Filling of "
        + "Customer Fields for Measuring Points and ... Documents'. לפיתוח חדש להעדיף Business Add-Ins דרך "
        + "SE18/SE19 ואת הרחבת ה-Key User; ראו ברשומות enh:technique:new-badi "
        + "ו-enh:technique:key-user-extensibility בקטלוג זה, הנושאות ראיות משלהן. בסביבת SAP S/4HANA Cloud Public "
        + "Edition, עמוד ה-Extensibility שצוטט כאן מתאר את מסלולי ההרחבה Key User Extensibility, Developer "
        + "Extensibility ו-Side-by-Side Extensibility ואינו מזכיר את CMOD או SMOD בטקסט שנקרא ממנו; לפני תכנון "
        + "הרחבה על בסיס Customer Exit בסביבה זו יש לאמת את זמינותה בתיעוד היישום הספציפי. אין להסיק מרשומה זו "
        + "שהרחבת לקוח קיימת הוסרה או נפסלה; מעמדה במערכת היעד נבדק בתיעוד ההרחבה ב-SMOD ובכלי התאמת השינויים שלאחר "
        + "השדרוג (SPAU).",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements to the SAP Standard with Customer Exits | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2b28ffa716c24348903f8ffbfeb81df8/c81975d943b111d1896f0000e8322d00.html?locale=en-US&state=PRODUCTION&version=1709.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709.latest",
        accessedAt: DATE21,
        claim: "רשומת שירות החיפוש של help.sap.com למוצר SAP S/4HANA On-Premise (deliverable 'Changing the SAP "
          + "Standard (BC)', versionId 1709.latest, loio c81975d943b111d1896f0000e8322d00) מציגה את הגדרת "
          + "הטכניקה: 'The enhancement concept allows you to add your own functionality to SAP's standard "
          + "business applications without having to modify the original applications', ו-'These customer objects "
          + "are linked to standard applications, but exist separately from SAP's standard software package'. "
          + "הסניפט נקטע ב-'If you want to enhance the functionality of your'. גוף העמוד לא נקרא (מעטפת "
          + "JavaScript), ואין בסניפט אמירה על S/4HANA לעומת ECC.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customer Exits | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2b28ffa716c24348903f8ffbfeb81df8/c81975cc43b111d1896f0000e8322d00.html?locale=en-US&state=PRODUCTION&version=1709.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709.latest",
        accessedAt: DATE21,
        claim: "הרשומה 'Customer Exits' באותה ערכת תיעוד (loio c81975cc43b111d1896f0000e8322d00, versionId "
          + "1709.latest) מונה בסניפט את נושאי המשנה של הטכניקה: 'Enhancements of the SAP Standard with Customer "
          + "Exits Exit Types Searching for Applications with Exits Creating Add-On Projects Activating and "
          + "Deactivating Projects Transporting Add-On Projects', ומציגה את כיוון ההגירה: 'To make enhancements "
          + "of the SAP standard more uniform, you can migrate customer exits to Business Add-Ins'. סניפט שני של "
          + "אותה רשומה, בשאילתה אחרת, מוסיף: 'Caution If you used transaction SMOD to migrate customer exits, "
          + "the enhancement projects of the customer that belong to the customer exits must be migrated to "
          + "implementations of business add-ins in order' (נקטע כאן). שמות סוגי ה-Exit עצמם אינם מופיעים בסניפט, "
          + "אלא רק כותרת הנושא 'Exit Types'. הסניפטים אינם קובעים שהטכניקה הוסרה, הוגבלה או הוצאה משימוש "
          + "ב-S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Notes about the Function Modules | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6470b65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת Maintenance Management לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio "
          + "6470b65334e6b54ce10000000a174cb4, כותרת 'Notes about the Function Modules'): 'From Release 3.1I / "
          + "4.0B, you can use the following Customer Exits for measuring points and measurement documents: "
          + "IMRC0001 runs before the update and enables you to define particular field contents' (הסניפט נקטע "
          + "כאן), וכן 'IMRC0002 and IMRC0003 make available menu exits in the online processing of measuring "
          + "points and measurement documents, so that you can trigger customer-specific functions or call up "
          + "customer-defined screens'. כלומר בתחזוקת מפעל הרחבות לקוח, ובהן סוג ה-Menu Exit, עדיין מתועדות "
          + "בתיעוד 2025 FPS01. הסניפט אינו אומר דבר על מעמדן ביחס ל-ECC; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customizing for Process Management | Single and Composite Roles (PFCG)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/69c3a05bb8d44f02bdd2abe5e822da8e/d124bf53d25ab64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת תיעוד לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio d124bf53d25ab64ce10000000a174cb4, כותרת "
          + "'Customizing for Process Management') מציגה טבלת 'Object Type Meaning Customizing Activity' ובה "
          + "'FUGS SAP part of an enhancement Use Function Exit for Automatic Char.Value Assignment in section "
          + "Process Messages -> Process Message Characteristics', 'FUGX ... Customer-specific part of an "
          + "enhancement Use Function Exit for Automatic Char.Value Assignment in section Process Messages -> "
          + "Process Message Characteristics' ו-'CMOD Project management for enhancements'. כלומר בניהול התהליך "
          + "של תעשיות תהליכיות הטרנזקציה CMOD, קודי סוג האובייקט FUGS ו-FUGX ופעילות ה-Customizing להפעלת "
          + "Function Exit עדיין מתועדים בגרסת 2025 FPS01. הסניפט אינו נוקב בשם ההרחבה עצמה, וגוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enterprise Asset Management Part 4 | Logistics",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/77c07c8d30664260a0b3ff864e6b5e78/3346ac67364447a3ba2f4efa65b8c014.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת Logistics לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio 3346ac67364447a3ba2f4efa65b8c014, "
          + "כותרת 'Enterprise Asset Management Part 4') היא עמוד פונקציית עסק: 'Technical Name of Business "
          + "Function LOG_EAM_CI_4', 'Type of Business Function Enterprise Business Function', 'Availability SAP "
          + "S/4HANA, on-premise'. הסניפט כולל את הכותרת 'Customer enhancements converted to BAdIs' ואת המשפט 'To "
          + "enable partners to extend the existing solution and pro' (נקטע כאן), וכן 'These BAdIs have the same "
          + "functions as the existing customer enhancements: IMRC0001: MeasPoint/MeasDoc: Exit before update "
          + "(after COMMIT WORK) = BAdI: Filling of Customer Fields for Measuring Points and ... Documents' (שלוש "
          + "הנקודות הן קטיעה בתוך הסניפט עצמו) ו-'IMRC0002: MeasPoint: Menu exit for customer-specific function "
          + "= BAdI: Additional Function Code in Measuring Point Transactions'. ההמרה שהעמוד מתאר חלה על הרחבות "
          + "תחזוקת מפעל מסוימות במסגרת אותה פונקציית עסק; העמוד אינו קובע דבר על מעמד טכניקת הרחבת הלקוח ככלל "
          + "ב-S/4HANA. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility | Extend and Integrate Your SAP S/4HANA Cloud Public Edition",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/533228e1e854433ab16d013f161ca509.html?locale=en-US&state=PRODUCTION&version=2608.500",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        accessedAt: DATE24,
        claim: "רשומת שירות החיפוש הרשמית למוצר SAP S/4HANA Cloud Public Edition (deliverable 'Extend and Integrate Your "
          + "SAP S/4HANA Cloud Public Edition', versionId 2608.500, loio 533228e1e854433ab16d013f161ca509, כותרת "
          + "'Extensibility'); טקסט גוף העמוד נקרא דרך scripts/sap-help-body.mjs (התרשים האינטראקטיבי שבעמוד לא "
          + "נקרא): 'Extensibility in SAP S/4HANA Cloud Public Edition consists of the following options: Key User "
          + "Extensibility through built-in capabilities Developer Extensibility through the SAP S/4HANA Cloud ABAP "
          + "Environment Side-by-Side Extensibility through SAP BTP'. בטבלת ההשוואה שבעמוד, שורת 'Released object "
          + "types' מונה: 'BAdIs, CDS views BAdIs, classes, interfaces, CDS views, behavior definitions, "
          + "authorization objects BAPIs, IDocs, OData APIs, SOAP APIs, events'. המונחים Customer Exit, SMOD ו-CMOD "
          + "אינם מופיעים בטקסט גוף העמוד שנקרא; זהו ממצא על עמוד זה ואינו קובע את מעמד הטכניקה ב-SAP S/4HANA Cloud "
          + "Public Edition.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:user-exit",
      "enh:technique:classic-badi",
      "enh:technique:new-badi",
      "enh:technique:key-user-extensibility",
      "enh:exit:IMRC0001",
      "enh:exit:IWO10009",
      "enh:exit:PPCO0001",
      "enh:exit:CONFPP05",
      "tx:CMOD",
      "tx:SMOD",
      "tx:SE18",
      "tx:SE19",
      "tx:IK11",
    ],
    lastVerifiedAt: DATE24,
    notes: "שיטה (סבב 2026-09-21): תשע שאילתות ב-scripts/sap-help-search.mjs תחת המוצר SAP_S4HANA_ON-PREMISE, וחיפוש "
      + "רשת אחד מוגבל ל-help.sap.com, api.sap.com, fioriappslibrary.hana.ondemand.com ו-fal.cloud.sap. שיטה (סבב "
      + "2026-09-24): שלוש שאילתות ב-scripts/sap-help-search.mjs תחת המוצר SAP_S4HANA_CLOUD ('developer "
      + "extensibility classic enhancement techniques not released', 'extensibility model key user developer "
      + "side-by-side SAP S/4HANA Cloud', 'SMOD CMOD classic customer exit not available Cloud'; 21 רשומות לכל "
      + "אחת), וטקסט הגוף של עמוד 'Extensibility' (loio 533228e1e854433ab16d013f161ca509) נקרא דרך "
      + "scripts/sap-help-body.mjs; התרשים האינטראקטיבי שבעמוד לא נקרא. שאילתת ביקורת 'Customer Exits' תחת אותו "
      + "מוצר החזירה 21 רשומות: עשר מהן מ-deliverable 'Integration with SAP Field Service and Asset Management', "
      + "שבהן המונח 'customer exit' מתאר נקודות הרחבה של תרשימי אינטגרציה ולא את טכניקת SMOD/CMOD, והיתר רשומות "
      + "שכותרותיהן אינן עוסקות בטכניקה (Receivables Management, India, South Korea, Australia, New Zealand, "
      + "Master Data); אף אחת לא צוטטה כראיה. הרשומה 'Handle Your Extensions' (Manage Your SAP S/4HANA Cloud "
      + "Public Edition, 2608.500, loio be44d6b8f0944c0c81107e34e7232fff) נקראה בגוף: היא מתארת אפליקציה של שירות "
      + "test data refresh, והמשפט 'SAP differentiates between two extensibility options' וההערה 'Side-by-Side "
      + "Extensibility through SAP BTP is not supported' חלים בהקשר אותה אפליקציה; לכן לא צוטטה כראיה לטכניקה. מה "
      + "שאומת: קיומה והגדרתה של הטכניקה בערכת התיעוד של S/4HANA On-Premise, שמות נושאי המשנה (ובהם 'Exit "
      + "Types'), כיוון ההגירה ל-Business Add-Ins, הימצאות הרחבות לקוח פעילות בתיעוד 2025 FPS01 בתחזוקת מפעל "
      + "ובתעשיות תהליכיות, והמרתן של הרחבות תחזוקת מפעל מסוימות ל-BAdIs במסגרת פונקציית העסק LOG_EAM_CI_4; ובסבב "
      + "2026-09-24: עמוד ה-Extensibility של SAP S/4HANA Cloud Public Edition (2608.500) מונה שלוש אפשרויות הרחבה "
      + "(Key User, Developer, Side-by-Side), והמונחים Customer Exit, SMOD ו-CMOD אינם מופיעים בטקסט גוף העמוד "
      + "שנקרא; זהו ממצא על עמוד אחד ושלוש שאילתות ולא קביעת אי-זמינות, ולכן לא נכתב סטטוס נגזר ל-Public Cloud. "
      + "רשומות רשמיות נוספות שנראו ולא צוטטו כראיה: 'Use of User Data' (Orders CS-SE/PM-WOC-MO, 2025.001, loio "
      + "50c7b65334e6b54ce10000000a174cb4) שאומר 'You can use customer exit IWO10016 to run your own checks for "
      + "the user data fields'; ההרחבה IWO10016 אינה קיימת בקטלוג ההרחבות של הפרויקט (data/exits.ts) ולכן לא נרשם "
      + "אליה xref. 'Including Customer-Specific Screens on Tab Pages' (2025.001, loio "
      + "b0d8c353b677b44ce10000000a174cb4) המורה להציג את רכיבי הרחבת הלקוח WTY00002 דרך SMOD ולהפעיל את הפרויקט. "
      + "'Customer Exit MILLOC01' (Production Orders PP-SFC, 2025.001, loio c5cec353b677b44ce10000000a174cb4): "
      + "'Before you can use the customer exit, you must create a customer project in transaction CMOD'. שתי "
      + "רשומות Workflow בגרסת 2025.001 המצמידות מודולי Function Exit להרחבות PP המוכרות לפרויקט "
      + "(EXIT_SAPLCORF_105 ל-CONFPP05, loio cc6cb6531de6b64ce10000000a174cb4; EXIT_SAPLCOBT_001 ל-PPCO0001, loio "
      + "c66cb6531de6b64ce10000000a174cb4). 'Comparison of Classic BAdIs with Previous Techniques' (RE-FX, "
      + "2025.001, loio eb3e7ceb940e11d295df0000e82de14a) המונה את חסרונות SMOD/CMOD ('This enhancement technique "
      + "assumes a two-tiered system infrastructure'), ו-'Classic BAdIs' (RE-FX, 2025.001, loio "
      + "e6d54d3c596f0b26e10000000a11402f). מה שלא אומת: רשימת סוגי ה-Exit המלאה (Function, Screen, Menu, Field, "
      + "Documentation) בגוף עמוד 'Exit Types', שלא נקרא; מעמד הטכניקה ב-SAP S/4HANA Cloud Public Edition (Old: "
      + "'לא הורצה שאילתה תחת אותו מוצר' → New: שלוש שאילתות וגוף עמוד אחד, ללא אזכור הטכניקה וללא קביעה רשמית); "
      + "מעמד הטכניקה ב-SAP S/4HANA Cloud Private Edition (לפי הערת scripts/sap-help-search.mjs אין מזהה מוצר "
      + "נפרד ל-Private Edition בשירות החיפוש, ולא נבדק בנפרד); קיומו או היעדרו של פריט פישוט ייעודי "
      + "(Simplification Item Catalog דורש התחברות S-user לפי MANIFEST); וכל בדיקה במערכת SAP חיה (חיבור ה-MCP "
      + "ל-ABAP לא היה זמין, ולכן CMOD, SMOD ו-SPAU לא נבדקו לא ב-On-Premise ולא ב-Cloud). הסתייגות גרסה: ערכת "
      + "התיעוד 'Changing the SAP Standard (BC)', שהיא המקור הרשמי היחיד שנמצא להגדרת הטכניקה עצמה, מופיעה בשירות "
      + "החיפוש רק תחת versionId 1709.latest של המוצר SAP S/4HANA On-Premise; בשאילתות שהורצו לא הוחזרה גרסה חדשה "
      + "יותר שלה, וזה ממצא תחום בשאילתות ולא קביעה שהעמוד הוסר מגרסאות מאוחרות. ליד שלא צוטט: חיפוש הרשת החזיר "
      + "את עמוד ABAP Keyword Documentation 7.51 בהקשר CALL CUSTOMER-FUNCTION, ומנוע החיפוש סיכם ממנו שהפעלת "
      + "הרחבות דרך CMOD 'obsolete'; העמוד עצמו לא נקרא, הוא תיעוד שפת ABAP ואינו מתפרסם תחת מוצר S/4HANA עם "
      + "edition, ולכן אינו ראיה כאן. הערת כתיבה: בעת כתיבת הרשומה נבדק מחדש שם ה-BAdI שבראיה החמישית, והסניפט "
      + "מחזיר אותו ארוך יותר מן הצורה שצוינה בביקורת ('Measuring Points and ... Documents' ולא 'Measuring Po'), "
      + "ולכן נכתבה כאן הצורה הארוכה שנמדדה בפועל. מוסכמה: הרשומה אינה נושאת שדה reviewer, כמו כל תשעת קבצי "
      + "data/verification/**.",
  },
  {
    id: "enh:technique:classic-badi",
    aliases: ["Classic BAdIs", "Classic BAdI Concept"],
    status: {
      status: "replaced",
      he: "מושג ה-BAdI הקלאסי הוחלף בתוך ה-Enhancement Framework: עמוד 'Classic BAdIs' בערכת התיעוד של SAP "
        + "S/4HANA On-Premise 2025 FPS01 קובע 'The new BAdIs have completely replaced the classic BAdIs' ומוסיף "
        + "כי 'A migration tool is available for converting the classic BAdIs into new BAdIs', ועמוד 'Business "
        + "Add-Ins (BAdIs)' של ה-Enhancement Framework קובע שבתוך המסגרת המונח BAdI מתייחס ל-BAdIs "
        + "מבוססי-Kernel, ושהמושג הקודם מכונה classic BAdI concept. ההחלפה היא ברמת המושג ושל פיתוח חדש: תיעוד "
        + "המושג הקלאסי עדיין נכלל בערכת 2025 FPS01, והוראות רשמיות באותה גרסה עדיין עובדות מול מימוש שהומר "
        + "(שדה 'Migrated from classic BAdI impl.'). לא נמצא מקור רשמי הקובע שמימושים קלאסיים קיימים חדלו לפעול "
        + "ב-S/4HANA.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Classic BAdIs | Internal Service Request",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9e21827baabc46ee86355f6b3bae53b5/eea1d548892b11d295d60000e82de14a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית לעמוד 'Classic BAdIs' תחת המוצר SAP S/4HANA On-Premise בגרסה 2025 FPS01 (loio "
          + "eea1d548892b11d295d60000e82de14a) כוללת את המשפטים: 'Classic BAdIs Business Add-Ins (BAdIs) are "
          + "enhancements to the standard version'; 'As of Release 7.0 of the Application Server ABAP (SAP "
          + "NetWeaver 7.0), there is a new type of BAdI. Creation of these BAdIs is integrated into the "
          + "Enhancement Framework'; 'Execution of these BAdIs is integrated, for performance reasons, into the "
          + "ABAP language. The new BAdIs have completely replaced the classic BAdIs'; 'A migration tool is "
          + "available for converting the classic BAdIs into new BAdIs'; 'In contrast to customer exits, Business "
          + "Add-Ins no longer assume a two-level infrastructure (SAP and customer solutions), but instead allow "
          + "for a multi-level system landscape (SAP, country-specific versions' (הסניפט נקטע כאן); 'You can "
          + "create definitions and implementations of Business Add-Ins at any level of the system landscape. SAP "
          + "guarantees the upward compatibility of all Business Add-In interfaces'; ו-'BAdIs that have replaced "
          + "function modules exits since Release 4.6d'. הציטוטים נאספו מכמה שאילתות לאותה רשומה, שכן חלון הסניפט "
          + "משתנה לפי השאילתה. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "בפרויקט ההסבה: למפות את הגדרות ומימושי ה-BAdI הקלאסיים במערכת המקור (SE18 להגדרה, SE19 למימוש) "
        + "ולכלול אותם בבדיקת הקוד המותאם יחד עם ה-Customer Exits. לפיתוח חדש בתחזוקת מפעל ובתעשיות תהליכיות "
        + "להגדיר רק BAdIs מבוססי-Kernel תחת Enhancement Spot, בהתאם להמלצה שבעמוד Migrating Classic BAdIs. "
        + "להמרת הגדרות קיימות קיים כלי המרה, אך התיעוד קובע שהמרה אוטומטית מלאה אינה אפשרית, ולכן יש לתכנן "
        + "בדיקה ידנית של הקריאות, של ערכי הפילטר ושל מימושים מרובים. לאחר שדרוג או המרה לעבור ב-SPAU על "
        + "הפריטים שבקטגוריית Migrations, לפי עמוד Object List and Adjustment Tabs (loio "
        + "aa70160d221d48a5b214f7ca26379853) שנצפה ולא צורף כראיה. לשדות ולוגיקה חדשים ביישומי Fiori לשקול "
        + "תחילה את נתיב ה-Key-User (Custom Fields and Logic) לפני הרחבה קלאסית.",
      successor: "enh:technique:new-badi",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Classic BAdIs | Internal Service Request",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9e21827baabc46ee86355f6b3bae53b5/eea1d548892b11d295d60000e82de14a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית לעמוד 'Classic BAdIs' תחת המוצר SAP S/4HANA On-Premise בגרסה 2025 FPS01 (loio "
          + "eea1d548892b11d295d60000e82de14a) כוללת את המשפטים: 'Classic BAdIs Business Add-Ins (BAdIs) are "
          + "enhancements to the standard version'; 'As of Release 7.0 of the Application Server ABAP (SAP "
          + "NetWeaver 7.0), there is a new type of BAdI. Creation of these BAdIs is integrated into the "
          + "Enhancement Framework'; 'Execution of these BAdIs is integrated, for performance reasons, into the "
          + "ABAP language. The new BAdIs have completely replaced the classic BAdIs'; 'A migration tool is "
          + "available for converting the classic BAdIs into new BAdIs'; 'In contrast to customer exits, Business "
          + "Add-Ins no longer assume a two-level infrastructure (SAP and customer solutions), but instead allow "
          + "for a multi-level system landscape (SAP, country-specific versions' (הסניפט נקטע כאן); 'You can "
          + "create definitions and implementations of Business Add-Ins at any level of the system landscape. SAP "
          + "guarantees the upward compatibility of all Business Add-In interfaces'; ו-'BAdIs that have replaced "
          + "function modules exits since Release 4.6d'. הציטוטים נאספו מכמה שאילתות לאותה רשומה, שכן חלון הסניפט "
          + "משתנה לפי השאילתה. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins (BAdIs) | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/8ff2e540f8648431e10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "עמוד 'Business Add-Ins (BAdIs)' של ה-Enhancement Framework בתיעוד ABAP platform, גרסה 202510.001 "
          + "(loio 8ff2e540f8648431e10000000a1550b0), קובע את הבחנת המונחים: 'Note When the term BAdI is used "
          + "within the Enhancement Framework, it always refers to kernel-based BAdIs. The previous (legacy) BAdI "
          + "concept is referred to as classic BAdI concept'. סניפטים נוספים של אותה רשומה מוסיפים: 'The "
          + "kernel-based BAdIs add some major improvements to the classic BAdIs such as better performance. The "
          + "kernel-based BAdIs are integrated in the kernel and are switchable' ו-'Kernel-Based BAdI Technology "
          + "The kernel-based BAdI concept takes advantage of SAP's extensive experience in offering customers "
          + "different ways to enhance the standard SAP system'. גוף העמוד לא נקרא; הציטוטים לקוחים מרשומות שירות "
          + "החיפוש הרשמי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Migrating Classic BAdIs | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/0e4d3e42fc94aa04e10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "עמוד 'Migrating Classic BAdIs' של ה-Enhancement Framework (ABAP platform 202510.001, loio "
          + "0e4d3e42fc94aa04e10000000a1550b0) נושא את ההמלצה: 'Migrating Classic BAdIs Note Due to that fact "
          + "that calling kernel-based BAdIs is significantly faster, we recommend that you define only "
          + "kernel-based BAdIs and migrate all classic BAdIs and their calls ... to kernel-based BAdIs' (שלוש "
          + "הנקודות הן קטיעה של הסניפט), ובנוסף: 'A completely automated migration of all existing classic BAdIs "
          + "is impossible because of the existing differences between classic and kernel-based BAdIs' ו-'See "
          + "also: Differences Between Classic and New BAdIs'. הפניה זו נוקבת בשם 'New BAdIs' בעוד כותרת העמוד "
          + "המקושר בגרסה זו היא 'Differences Between Classic and Kernel-Based BAdIs'; שני הניסוחים מופיעים "
          + "בשירות החיפוש הרשמי. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create BAdI Implementation to Activate PEO-ERP Goods Movements Integration | Production Engineering "
          + "and Operations for Complex Assembly",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/4d5b50c278a645fc91f1fc4c4f9538ff.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "הוראה רשמית בגרסת S/4HANA On-Premise 2025 FPS01 (loio 4d5b50c278a645fc91f1fc4c4f9538ff) עדיין עובדת "
          + "מול מימוש BAdI שהומר מן המושג הקלאסי: 'Create BAdI Implementation to Activate PEO-ERP Goods "
          + "Movements Integration Activate the Business Add-In (BAdI) implementation CORU_INT_MB_ENH to the "
          + "enable integration of goods movements between PEO and' (הסניפט נקטע כאן), 'In Customizing for "
          + "Production, navigate to Materials Management Inventory Management and Physical Inventory Maintain "
          + "Customer Exits and Business Add-Ins BAdI: Creation of Material Document', ו-'Display the BAdI "
          + "implementation CORU_INT_MB_ENH. Double click on CORU_INT_MB_DOC_BADI in the Migrated from classic "
          + "BAdI impl. field. On the subsequent screen that appears, switch to edit mode and Activate the "
          + "implementation'. הרשומה שייכת ל-Production Engineering and Operations ואינה עוסקת בתחזוקת מפעל; היא "
          + "מובאת כעדות לכך ששדה 'Migrated from classic BAdI impl.' ומימושים שמקורם במושג הקלאסי עדיין מופיעים "
          + "בהוראות רשמיות של 2025 FPS01, ולא כעדות על תחולה בתחזוקת מפעל.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:new-badi",
      "enh:technique:enhancement-spot",
      "enh:technique:customer-exit",
      "enh:technique:key-user-extensibility",
      "enh:badi:WORKORDER_UPDATE",
      "enh:badi:MB_MIGO_BADI",
      "tx:SE18",
      "tx:SE19",
      "tx:SPAU",
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: שאילתות ב-scripts/sap-help-search.mjs על ארבעה מוצרים (SAP_S4HANA_ON-PREMISE, "
      + "ABAP_PLATFORM_NEW, SAP_ERP, SAP_S4HANA_CLOUD), חיפוש רשת אחד מוגבל ל-help.sap.com, ועמוד סטטי אחד של "
      + "ספריית SAP שהורד ונקרא במלואו. ארבע הרשומות שצוטטו אומתו מחדש בשירות החיפוש הרשמי, והכותרת, "
      + "ה-deliverable, ה-loio וה-versionId חזרו זהים בכל אחת. קוד HTTP 200 על עמוד /docs/ אינו ראיה בפני "
      + "עצמו, שכן גם loio בדוי מחזיר 200, ולכן האימות נשען על רשומת החיפוש בלבד. מה שאומת רשמית: הבחנת "
      + "המונחים בתוך ה-Enhancement Framework, הגדרת ה-BAdI הקלאסי, המשפט 'The new BAdIs have completely "
      + "replaced the classic BAdIs', קיום כלי ההמרה, ההמלצה להגדיר רק BAdIs מבוססי-Kernel, והימצאות תיעוד "
      + "המושג הקלאסי בערכת S/4HANA 2025 FPS01. אותו נושא 'Classic BAdIs' מוגש תחת כמה deliverables: בערכת "
      + "S/4HANA 2025 FPS01 תחת 'Internal Service Request' (loio eea1d548892b11d295d60000e82de14a) ותחת "
      + "'Flexible Real Estate Management (RE-FX)' (loio אחות e6d54d3c596f0b26e10000000a11402f), ותחת ABAP "
      + "platform 202510.001 ב-'ABAP Workbench Tools' וב-'Changing the SAP Standard (BC)'; שם ה-deliverable "
      + "אינו מעיד על תחום עסקי, זהו תיעוד ABAP Workbench כללי. העמוד הסטטי 'Business Add-Ins (BAdIs)' של "
      + "ספריית NetWeaver 7.5 נקרא במלואו והוא אותו נושא בגרסת פלטפורמה ישנה יותר; שם הניסוח הוא 'Within the "
      + "Enhancement Framework, a new BAdI is always meant when the term BAdI is used. If there is an "
      + "explicit reference to the previous BAdI concept, such BAdIs are referred to as classic BAdIs', והוא "
      + "גם מגדיר 'A BAdI is an object-oriented enhancement option, a hook for an object plug-in and thus the "
      + "most sophisticated enhancement type'. הניסוח שצוטט ברשומה הוא של ABAP platform 202510.001. מה שלא "
      + "אומת: אף עמוד שנמצא בערכת 2025 FPS01 של Maintenance Management או של תעשיות תהליכיות אינו מכנה BAdI "
      + "ספציפי של תחזוקת מפעל 'classic BAdI', ולכן ה-xrefs ל-WORKORDER_UPDATE ול-MB_MIGO_BADI משקפים את "
      + "סיווג המאגר (data/exits.ts, kind='BAdI') ולא הכרעה רשמית; בתיעוד הרשמי WORKORDER_UPDATE מכונה גם "
      + "enhancement spot. הזוג SE18/SE19 נלקח מרשומת המאגר data/enhancements.ts#classic-badi; שני עמודים "
      + "רשמיים שראיתי ולא צירפתי כראיה תומכים בשימוש ב-BAdI Builder: 'Changes to Definitions of Classic "
      + "BAdIs' (2025.001, loio 4fa9f496099ce148bd064b82af19bae7) הכולל 'In the BAdI Builder, call up "
      + "transaction SE19', ו-'Migrating BAdIs' (ABAP platform 202510.001, loio "
      + "27703b42ea85b26be10000000a155106) הכולל 'Call the classical BAdI Builder (transaction SE18)', "
      + "'Choose Utilities -> Migrate Classic BAdI' ו-'Delete the classic BAdI'. ה-xref ל-SPAU נשען על "
      + "'Object List and Adjustment Tabs' (loio aa70160d221d48a5b214f7ca26379853) שמתעד קטגוריית Migrations "
      + "הכוללת 'implementations of BAdIs that have been migrated by SAP from the classic to the kernel "
      + "BAdI'; גם רשומה זו נראתה ולא צורפה כראיה. ה-xref ל-SE20 הוסר: רשומת המאגר "
      + "data/enhancements.ts#classic-badi נוקבת ב-SE18 וב-SE19 בלבד, SE20 מופיע שם תחת new-badi "
      + "ו-enhancement-spot, ואף מקור רשמי שצוטט אינו קושר אותו למושג הקלאסי. שדה product ברשומות ה-ABAP נרשם "
      + "'ABAP platform', כפי ששירות החיפוש מחזיר אותו מילה במילה; שתי רשומות ישנות יותר "
      + "ב-data/verification/tables.ts כתבו 'ABAP Platform', והפער נרשם כאן ולא תוקן שם. חיפוש תחת SAP "
      + "S/4HANA Cloud Public Edition (2608.500) לא החזיר רשומה הנוקבת במושג classic BAdI, והרשומות שהוחזרו "
      + "מתארות מימושי BAdI דרך ADT או דרך היישום Custom Logic; זהו ממצא תחום בחיפוש ולא טענת אי-זמינות. "
      + "הסטטוס שהאפליקציה הציגה עד כה לרשומה זו נגזר מבלוק ECC מול S/4HANA של "
      + "data/enhancements.ts#classic-badi דרך fromEccS4Block (components/neo-shell/reference/enh-data.ts) "
      + "והוא 'משתנה ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט'; הסטטוס המחובר כאן חזק ממנו משום שהמקור הרשמי "
      + "נוקב ב-'completely replaced' וממליץ להגדיר רק BAdIs מבוססי-Kernel. ניסוח המאגר 'נתמך; מומר בהדרגה "
      + "ל-New BAdI / Enhancement Spot' רך מן הניסוח הרשמי ומומלץ לחדדו. גוף עמודי /docs/ של help.sap.com "
      + "אינו נגיש (מעטפת JavaScript), ולכן כל טענה רשמית כאן תחומה בכותרת ובסניפט של שירות החיפוש, למעט "
      + "העמוד הסטטי שנקרא במלואו. ה-MCP ל-ABAP לא היה זמין במושב זה; בדיקה חיה ב-SE18, SE19 או SPAU לא "
      + "בוצעה. לא נבדקו SAP Notes ולא KBAs: me.sap.com דורש התחברות S-user, ולכן אין ברשומה מספר Note או "
      + "KBA. הרשומה אינה נושאת שדה reviewer, בהתאם למוסכמת data/verification/**.",
  },
  {
    id: "enh:technique:new-badi",
    aliases: ["Kernel-Based BAdI", "Kernel BAdI", "New BAdI (Enhancement Spot)"],
    status: {
      status: "unchanged",
      he: "BAdI מבוסס kernel (New BAdI) הוא מנגנון ה-BAdI של ה-Enhancement Framework: הגדרת BAdI definition "
        + "בתוך Enhancement Spot, מימוש במחלקה המממשת את ממשק ה-BAdI, וסינון מימושים לפי filter. בתיעוד ABAP "
        + "platform לגרסת 2025 FPS01 נכתב על ה-BAdIs מבוססי ה-kernel שהם 'integrated in the kernel and are "
        + "switchable' ושהם מספקים 'considerably more flexibility ... through properties such as contexts and "
        + "more filtering options than classic BAdIs'. בתיעוד SAP S/4HANA On-Premise לגרסת 2025 FPS01 הטכניקה "
        + "היא הנתיב המונחה: העמוד Create BAdI Implementation to Restrict Authorization to Maintain BOMs (ERP) "
        + "מנחה ליצור 'enhancement implementation for a new BAdI' על ה-Enhancement Spot ES_BOM_AUTH, והעמוד "
        + "BAdI: Validate BOM Before Saving מתאר BAdI definition תחת Enhancement Spot ES_BOM_UPDATE. בצד ה-ECC, "
        + "עמוד של תיעוד SAP ERP 6.0 EHP8 מתעד את בורר 'New BAdI' עם Enhancement Spot ES_EDOCUMENT, כלומר "
        + "הטכניקה מתועדת בשני הצדדים. אף עמוד רשמי שנמצא אינו מתאר שינוי בטכניקה עצמה במעבר מ-ECC ל-S/4HANA, "
        + "ולכן המעמד הוא זמינות ללא שינוי ברמת הטכניקה, ולא קביעה על BAdI ספציפי. הערה על מקור: העמוד Classic "
        + "BAdIs (המצוטט בראיות) הוא נושא פלטפורמה משותף שתיעוד S/4HANA 2025 FPS01 מציג תחת ספרים שאינם קשורים "
        + "לתחום, ומשפטיו על מקור הטכניקה ב-Application Server ABAP 7.0 אינם אמירה ייעודית ל-S/4HANA.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Create BAdI Implementation to Restrict Authorization to Maintain BOMs (ERP) | Production Engineering "
          + "and Operations for Complex Assembly",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/afa0b5c5206f4dcdab4a8c7a39ef9a29.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת העמוד Create BAdI Implementation to Restrict Authorization to Maintain BOMs (ERP) בספר "
          + "Production Engineering and Operations for Complex Assembly לגרסת S/4HANA 2025 FPS01 (loio "
          + "afa0b5c5206f4dcdab4a8c7a39ef9a29) מדגימה את הטכניקה בתחום הייצור: 'Create an implementation of "
          + "enhancement spot ES_BOM_AUTH if you want to restrict bill of material maintenance in your ERP "
          + "system' ו-'Create an enhancement implementation for a new BAdI by entering enhancement spot "
          + "ES_BOM_AUTH. Specify the name of your BAdI implementation for BAdI definition "
          + "CS_MBOM_AUTH_MAINTAIN'. הסניפט אינו מונה את מתודות הממשק, אינו נוקב בשם מחלקת המימוש ואינו מתייחס "
          + "להזמנת תחזוקה.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "בהרחבות חדשות בתחזוקת מפעל ובתעשיות תהליכיות להגדיר את נקודת ההרחבה כ-BAdI definition בתוך "
        + "Enhancement Spot ולממש אותה כמחלקה המממשת את ממשק ה-BAdI. את הגדרות התקן של ה-BAdI (filter, שימוש "
        + "יחיד או מרובה) ניתן לראות בלשונית Enhancement Spot Element Definitions ב-BAdI Builder (טרנזקציה "
        + "SE18), כפי שהעמוד BAdI: Validate BOM Before Saving של 2025 FPS01 מנחה. שאר הטרנזקציות בקטלוג (SE19, "
        + "SE20, SE80, SPAU) הן הקשר הפרויקט: אף אחת מהראיות המצוטטות כאן אינה נוקבת בהן, ובסניפטים שנמצאו SE19 "
        + "מופיעה בהקשר של מימוש BAdI קלאסי. בתכנון המרה מ-ECC ל-S/4HANA לבדוק לכל BAdI בשימוש אם הוא קלאסי או "
        + "מבוסס kernel: עמוד Migrating Classic BAdIs של ABAP platform 2025 FPS01 ממליץ 'define only "
        + "kernel-based BAdIs and migrate all classic BAdIs and their calls ... to kernel-based BAdIs' ומציין "
        + "ש-'A completely automated migration of all existing classic BAdIs is impossible'. שמות ה-Enhancement "
        + "Spot, ה-BAdI definition, הממשק והמתודות תלויים בגרסה ובחבילת התמיכה, ויש לאמת אותם ב-SE18 במערכת "
        + "לפני המימוש.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Business Add-Ins (BAdIs) | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/8ff2e540f8648431e10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "רשומת העמוד Business Add-Ins (BAdIs) בספר Enhancement Framework של ABAP platform לגרסת 2025 FPS01 "
          + "(loio 8ff2e540f8648431e10000000a1550b0) מגדירה את הטכניקה ואת הגבול מול ה-BAdI הקלאסי: הערה בעמוד "
          + "קובעת שבמסגרת ה-Enhancement Framework המונח BAdI מתייחס ל-BAdIs מבוססי kernel, ומוסיפה 'The previous "
          + "(legacy) BAdI concept is referred to as classic BAdI concept'. הסניפט ממשיך: 'The kernel-based BAdIs "
          + "add some major improvements to the classic BAdIs such as better performance. The kernel-based BAdIs "
          + "are integrated in the kernel and are switchable', ובשאילתה נוספת על אותה רשומה: 'The kernel-based "
          + "BAdIs provide considerably more flexibility in the conversion of predefined enhancement options "
          + "through properties such as contexts and more filtering options than classic BAdIs'. סניפט שלישי של "
          + "אותה רשומה מוסיף: 'When defining a BAdI, you determine its interface - the methods offered by the "
          + "BAdI. BAdI implementations are classes that implement the BAdI interface'. הסניפט אינו מונה "
          + "טרנזקציות, שמות ממשק קונקרטיים או שלבי יצירה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Migrating Classic BAdIs | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/0e4d3e42fc94aa04e10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "רשומת העמוד Migrating Classic BAdIs בספר Enhancement Framework של ABAP platform לגרסת 2025 FPS01 "
          + "(loio 0e4d3e42fc94aa04e10000000a1550b0) נושאת את המלצת SAP ואת מגבלתה: 'Note Due to that fact that "
          + "calling kernel-based BAdIs is significantly faster, we recommend that you define only kernel-based "
          + "BAdIs and migrate all classic BAdIs and their calls ... to kernel-based BAdIs' וכן 'A completely "
          + "automated migration of all existing classic BAdIs is impossible because of the existing differences "
          + "between classic and kernel-based BAdIs'. הסניפט אינו מפרט את שלבי כלי ההמרה, אינו נוקב בשם טרנזקציה "
          + "ואינו מגביל את ההמלצה למודול מסוים. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Classic BAdIs | Internal Service Request",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9e21827baabc46ee86355f6b3bae53b5/eea1d548892b11d295d60000e82de14a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית לעמוד 'Classic BAdIs' תחת המוצר SAP S/4HANA On-Premise בגרסה 2025 FPS01 (loio "
          + "eea1d548892b11d295d60000e82de14a) כוללת את המשפטים: 'Classic BAdIs Business Add-Ins (BAdIs) are "
          + "enhancements to the standard version'; 'As of Release 7.0 of the Application Server ABAP (SAP "
          + "NetWeaver 7.0), there is a new type of BAdI. Creation of these BAdIs is integrated into the "
          + "Enhancement Framework'; 'Execution of these BAdIs is integrated, for performance reasons, into the "
          + "ABAP language. The new BAdIs have completely replaced the classic BAdIs'; 'A migration tool is "
          + "available for converting the classic BAdIs into new BAdIs'; 'In contrast to customer exits, Business "
          + "Add-Ins no longer assume a two-level infrastructure (SAP and customer solutions), but instead allow "
          + "for a multi-level system landscape (SAP, country-specific versions' (הסניפט נקטע כאן); 'You can "
          + "create definitions and implementations of Business Add-Ins at any level of the system landscape. SAP "
          + "guarantees the upward compatibility of all Business Add-In interfaces'; ו-'BAdIs that have replaced "
          + "function modules exits since Release 4.6d'. הציטוטים נאספו מכמה שאילתות לאותה רשומה, שכן חלון הסניפט "
          + "משתנה לפי השאילתה. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create BAdI Implementation to Restrict Authorization to Maintain BOMs (ERP) | Production Engineering "
          + "and Operations for Complex Assembly",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/afa0b5c5206f4dcdab4a8c7a39ef9a29.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת העמוד Create BAdI Implementation to Restrict Authorization to Maintain BOMs (ERP) בספר "
          + "Production Engineering and Operations for Complex Assembly לגרסת S/4HANA 2025 FPS01 (loio "
          + "afa0b5c5206f4dcdab4a8c7a39ef9a29) מדגימה את הטכניקה בתחום הייצור: 'Create an implementation of "
          + "enhancement spot ES_BOM_AUTH if you want to restrict bill of material maintenance in your ERP "
          + "system' ו-'Create an enhancement implementation for a new BAdI by entering enhancement spot "
          + "ES_BOM_AUTH. Specify the name of your BAdI implementation for BAdI definition "
          + "CS_MBOM_AUTH_MAINTAIN'. הסניפט אינו מונה את מתודות הממשק, אינו נוקב בשם מחלקת המימוש ואינו מתייחס "
          + "להזמנת תחזוקה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Enhancement Implementation of BAdI EDOC_ADAPTOR | Greece",
        url: "https://help.sap.com/docs/SAP_ERP/15191d60e46142ff9af8bfd3449e55d8/b34020bdbae9406182f0081d6410b4ad.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE21,
        claim: "רשומת העמוד Create Enhancement Implementation of BAdI EDOC_ADAPTOR בספר Greece של תיעוד SAP ERP, "
          + "תווית הגרסה '6.0 EHP8 Latest' (versionId 6.18.latest, loio b34020bdbae9406182f0081d6410b4ad), מראה "
          + "שנתיב ה-New BAdI מתועד גם בצד ה-ECC: 'Create Enhancement Implementation of BAdI EDOC_ADAPTOR You use "
          + "the BAdI: Enhancements for eDocument (EDOC_ADAPTOR) BAdI to make enhancements to the processing of "
          + "eDocuments', 'Choose the New BAdI radio button in the Create Implementation group box and enter "
          + "ES_EDOCUMENT as the Enhancement Spot. Choose Create' ו-'Choose EDOC_ADAPTOR in the BAdI Definition'. "
          + "הרשומה שייכת לתחום לוקליזציה (eDocument יוון) ואינה מתייחסת לתחזוקת מפעל או לתעשיות תהליכיות; היא "
          + "אינה נוקבת בשם טרנזקציה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Validate BOM Before Saving | Bill of Material (LO-MD-BOM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/aa6a8c61616b41009c448721163b891c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת העמוד BAdI: Validate BOM Before Saving בספר Bill of Material (LO-MD-BOM) לגרסת S/4HANA 2025 "
          + "FPS01 (loio aa6a8c61616b41009c448721163b891c) מראה את מבנה הרשומה של BAdI מבוסס Enhancement Spot "
          + "בגרסה זו: 'BAdI definition:BOM_BEFORE_SAVE. This BAdI is created under Enhancement Spot "
          + "ES_BOM_UPDATE. This BAdI definition uses the standard interface IF_BOM_BEFORE_SAVE', 'For more "
          + "information about the standard settings (filters, single or multiple uses), see the Enhancement Spot "
          + "Element Definitions tab in the BAdI Builder (transaction SE18)' ו-'BAdI settings: Multi-Use BAdI Not "
          + "filter-dependent'. הרשומה אינה נוקבת במתודות הממשק ואינה מזכירה את SE19.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:classic-badi",
      "enh:technique:enhancement-spot",
      "enh:technique:explicit-enhancement",
      "enh:technique:customer-exit",
      "enh:technique:key-user-extensibility",
      "enh:badi:WORKORDER_UPDATE",
      "enh:badi:WORKORDER_GOODSMVT",
      "enh:badi:BADI_EAM_TOB",
      "tx:SE18",
      "tx:SE19",
      "tx:SE20",
      "tx:SE80",
      "tx:SPAU",
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: ריצות של scripts/sap-help-search.mjs ב-2026-09-21 על שלושה מערכי מוצר (SAP_S4HANA_ON-PREMISE, "
      + "ABAP_PLATFORM_NEW, SAP_ERP), ובדיקת HTTP לכל כתובת. כל שש הכתובות מחזירות 200, וכל loio, versionId, "
      + "כותרת וציטוט אומתו מול רשומת שירות החיפוש. גוף עמודי help.sap.com לא נקרא (מעטפת JavaScript), ולכן "
      + "כל טענה רשמית תחומה בכותרת ובסניפט של רשומת החיפוש. מה שאומת: המונח kernel-based BAdI ומעמדו כמנגנון "
      + "ה-BAdI של ה-Enhancement Framework, לצד ההערה ש-'The previous (legacy) BAdI concept is referred to as "
      + "classic BAdI concept'; השילוב בקרנל והיכולת לכבות אותם (switchable); contexts ואפשרויות סינון רחבות "
      + "יותר מהקלאסי; הקביעה ש-'BAdI implementations are classes that implement the BAdI interface'; המלצת "
      + "SAP להגדיר רק BAdIs מבוססי kernel ולהמיר את הקלאסיים, לצד הקביעה שהמרה אוטומטית מלאה אינה אפשרית; "
      + "מקור הטכניקה ב-Application Server ABAP 7.0 והמשפט 'The new BAdIs have completely replaced the "
      + "classic BAdIs' בתיעוד S/4HANA 2025 FPS01; יישום בתחום הייצור בגרסת 2025 FPS01 (Enhancement Spot "
      + "ES_BOM_AUTH עם BAdI definition CS_MBOM_AUTH_MAINTAIN, וכן ES_BOM_UPDATE עם BOM_BEFORE_SAVE והממשק "
      + "IF_BOM_BEFORE_SAVE, שם גם SE18 מוזכרת ללשונית Enhancement Spot Element Definitions); ובצד ה-ECC בורר "
      + "'New BAdI' עם Enhancement Spot ES_EDOCUMENT בתיעוד SAP ERP 6.0 EHP8 (versionId 6.18.latest), בספר "
      + "לוקליזציה יוונית. רשומות רשמיות נוספות שנראו ולא צוטטו כראיה: 'Differences Between Classic and "
      + "Kernel-Based BAdIs' (Enhancement Framework, ABAP platform 2025 FPS01, loio "
      + "ee6f3b42ea85b26be10000000a155106), הקובעת 'In the case of kernel-based BadIs, you create a BAdI "
      + "object with the ABAP statement GET BADI as a handle for the calls of BAdI methods' (שגיאת הכתיב "
      + "BadIs מופיעה כך בסניפט המקורי); 'BAdIs Embedded in the Enhancement Framework' (loio "
      + "bd523842134bad04e10000000a1550b0): 'A simple enhancement spot for BAdIs can contain several BAdI "
      + "definitions as enhancement spot element definitions'; 'Creating a BAdI' (loio "
      + "32a83942424dac04e10000000a1550b0): 'Start the Object Navigator (SE80). Open an enhancement spot'; "
      + "'Creating an Enhancement Implementation and BAdI Implementation' (ABAP Development Tools for "
      + "Eclipse, loio 18ef8ab2bd604516bbe7c0d297ee2476): 'Run transaction SE20. The Enhancements: Initial "
      + "Screen is opened'; 'Creating BAdI Enhancement Spots' (ADT, loio 2101737de99648dca92e692a2a4ec46e); "
      + "'Adjustment Category: Migrations' (Changing the SAP Standard (BC), loio "
      + "1157fd0875eb49b09b0aa814268465d7, זמין גם תחת S/4HANA 1709 Latest וגם תחת ABAP platform 202510.001): "
      + "'A BAdI has been migrated by SAP from a classic to a kernel BAdI. In this case, the implementations "
      + "need to be migrated to an implementation of the new kernel BAdI', ו-'Object List and Adjustment "
      + "Tabs' (loio aa70160d221d48a5b214f7ca26379853) משייכת רשימה זו ל-SPAU, ולכן SPAU נכלל ב-xrefs; "
      + "'Migration of Classic BAdIs to New BAdI Infrastructure' (What's New in SAP S/4HANA 1809, loio "
      + "5a40e6a9cea94f24a53f0b28a7129fce) עוסקת ב-Policy Management (FS-PM) ולא ב-PM או ב-PP-PI. מה שלא "
      + "אומת: אף עמוד רשמי שנמצא אינו קובע שהטכניקה השתנתה במעבר מ-ECC ל-S/4HANA, ולכן המעמד unchanged נשען "
      + "על תיעוד הטכניקה בשני הצדדים ועל היעדר אמירת שינוי, ולא על אמירה מפורשת; הזמינות ב-ECC מתועדת רשמית "
      + "רק בספר לוקליזציה (EDOC_ADAPTOR, יוון) ולא בתחום PM או PP-PI; SE19 אינה נזכרת באף רשומה רשמית שנמצאה "
      + "בהקשר של BAdI מבוסס kernel, ובסניפטים שנמצאו היא מופיעה בהקשר של מימוש BAdI קלאסי, ולכן ה-xref אליה "
      + "הוא הקשר קטלוגי בלבד; הניסוח ברשומת המאגר data/enhancements.ts#new-badi ('הדרך המומלצת להרחבה (Clean "
      + "Core) לצד Extension Points', 'זמין מ-NW7.0; פחות נפוץ') לא נתמך כלשונו: המונח Clean Core וההערכה "
      + "'פחות נפוץ' אינם מופיעים באף רשומה רשמית שנמצאה, ולכן נשארו ברמת המאגר ולא נכתבו במעמד; לא נמצא עמוד "
      + "רשמי הנוקב בשם Enhancement Spot להזמנת תחזוקה (WORKORDER_GOODSMVT מתועד כ-enhancement spot רק בספר "
      + "Production Engineering and Operations, loio 4f2fcd19248d43169325a397abc51cac), ולכן ה-xrefs "
      + "ל-WORKORDER_UPDATE, WORKORDER_GOODSMVT ו-BADI_EAM_TOB הם הקשר הקטלוג של הפרויקט ולא קביעה רשמית על "
      + "סיווגם כקלאסיים או כמבוססי kernel; רשימת המתודות, מצבי ה-instantiation ומהדורת Public Cloud לא "
      + "נבדקו. סתירה מול הנגזר: המעמד שהאפליקציה מציגה היום לרשומה זו הוא 'משתנה ב-S/4HANA' ברמת 'מאומת מול "
      + "נתוני הפרויקט', שנגזר ב-fromEccS4Block מבלוק ECC מול S/4HANA של data/enhancements.ts#new-badi (שדה "
      + "s4 מלא ולכן נגזרת הערת שינוי); המעמד המחובר כאן מחליף אותו ב'ללא שינוי ב-S/4HANA' על בסיס התיעוד "
      + "הרשמי, משום ששדה ה-s4 במאגר הוא המלצה ולא תיאור שינוי. הערת מקור: העמוד Classic BAdIs הוא נושא "
      + "פלטפורמה משותף שתיעוד S/4HANA מציג תחת הספרים Internal Service Request ו-Flexible Real Estate "
      + "Management (RE-FX) (loio e6d54d3c596f0b26e10000000a11402f באותו נוסח), ותחת ABAP platform 202510.001 "
      + "אותו loio מופיע בספר ABAP Workbench Tools; הציטוט נלקח כפי שהוחזר, והמעמד עוגן בעמוד ה-PEO ולא בו. "
      + "ה-MCP ל-ABAP לא היה זמין, ולא בוצע אימות ב-SE18, SE19, SE20 או SPAU במערכת חיה.",
  },
  {
    id: "enh:technique:explicit-enhancement",
    aliases: ["Explicit Enhancement", "ENHANCEMENT-POINT", "ENHANCEMENT-SECTION", "Explicit Enhancement Option"],
    status: {
      status: "restricted",
      he: "נקודת ההרחבה המפורשת מתועדת כטכניקה פעילה במדריך Enhancement Framework של ABAP platform 2025 FPS01: "
        + "הלקוח בוחר עמדה או קטע תוכנית בקוד ABAP כנקודת הרחבה מפורשת, ומחבר אליה Source Code Plug-In. יחד עם "
        + "זאת, תיעוד S/4HANA On-Premise 2025 FPS01 מגביל את השימוש בנקודות שסיפקה SAP: לפי עמוד Business "
        + "Function, SAP אינה מתחייבת שהממשקים וקיומן של נקודות ההרחבה המפורשות יישארו יציבים בקוד המקור, "
        + "הרחבות לקוח שהוטמעו בנקודות שהגדירה SAP 'can be made ineffective', והתיעוד ממליץ בתוקף שלא להשתמש "
        + "בנקודות ENHANCEMENT-POINT ו-ENHANCEMENT-SECTION שסיפקה SAP להרחבות לקוח, ומציע במקומן BAdI או נקודות "
        + "הרחבה משתמעות. ההגבלה נוסחה בתיעוד לגבי נקודות שסיפקה SAP; הסניפטים אינם אומרים דבר על נקודות הרחבה "
        + "מפורשות שהלקוח מגדיר בתוכניות שלו."
        + " עבור SAP S/4HANA Cloud Public Edition לא נמצא עמוד רשמי הנוקב בטכניקה זו; ראו הערות.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Business Function | Introduction: Enhancement Packages and Business Functions",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6534305c0e2c49ddb96177c90df13e28/979bddd4cebe423f9eb5767a275b2d78.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד Business Function במדריך Introduction: Enhancement Packages and Business Functions לגרסת "
          + "S/4HANA On-Premise 2025 FPS01 (loio 979bddd4cebe423f9eb5767a275b2d78, תאריך פרסום 2026-02-25) קובע: "
          + "'SAP does not guarantee that the interfaces and the existence of these explicit enhancement options "
          + "will remain stable in the source code', ומוסיף: 'Caution If you implement your own customer "
          + "enhancements at the explicit enhancement options that SAP defined with the statements "
          + "ENHANCEMENT-POINT or ENHANCEMENT-SECTION, these can be made ineffective' (הסניפט נקטע כאן), "
          + "'Therefore we strongly recommend that you not use the enhancement options provided by SAP and "
          + "defined with ENHANCEMENT-POINT or ENHANCEMENT-SECTION for your own customer enhancements' ומפנה "
          + "לחלופה: 'We recommend that you use , for example, Business Add-Ins (BAdIs) or implicit enhancement "
          + "options instead. For more information, see Enhancement Framework' (הרווח לפני הפסיק כפי שהוחזר "
          + "בסניפט). ארבעת הציטוטים הוחזרו בסניפטים שונים של אותה רשומת חיפוש; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "לפני הטמעת לוגיקה בנקודת הרחבה מפורשת שסיפקה SAP בתחזוקת מפעל או בתעשיות תהליכיות, לבחון תחילה את "
        + "החלופות שהתיעוד עצמו מונה: BAdI או נקודת הרחבה משתמעת לאותו תהליך. עמוד Business Function של S/4HANA "
        + "2025 FPS01 ממליץ שלא להשתמש בנקודות שסיפקה SAP להרחבות לקוח. הרחבות קיימות בנקודות כאלה יש לתעד ולבדוק "
        + "מחדש אחרי כל שדרוג או Support Package, מכיוון שאותו תיעוד אינו מתחייב ליציבות הנקודות בקוד המקור ומציין "
        + "שהרחבה כזו עלולה לאבד תוקף. איתור הנקודות הקיימות והמימושים שלהן (SE80, SE19) והשפעת מתגי Business "
        + "Function על ההרחבה דורשים בדיקה במערכת S/4HANA On-Premise. ב-SAP S/4HANA Cloud Public Edition, לבחון "
        + "תחילה את Key User Extensibility ואת Developer Extensibility ב-SAP S/4HANA Cloud ABAP Environment, שתי "
        + "אפשרויות ההרחבה שעמוד Handle Your Extensions מונה; זמינות נקודת הרחבה מפורשת שם לא אומתה.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Business Function | Introduction: Enhancement Packages and Business Functions",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6534305c0e2c49ddb96177c90df13e28/979bddd4cebe423f9eb5767a275b2d78.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד Business Function במדריך Introduction: Enhancement Packages and Business Functions לגרסת "
          + "S/4HANA On-Premise 2025 FPS01 (loio 979bddd4cebe423f9eb5767a275b2d78, תאריך פרסום 2026-02-25) קובע: "
          + "'SAP does not guarantee that the interfaces and the existence of these explicit enhancement options "
          + "will remain stable in the source code', ומוסיף: 'Caution If you implement your own customer "
          + "enhancements at the explicit enhancement options that SAP defined with the statements "
          + "ENHANCEMENT-POINT or ENHANCEMENT-SECTION, these can be made ineffective' (הסניפט נקטע כאן), "
          + "'Therefore we strongly recommend that you not use the enhancement options provided by SAP and "
          + "defined with ENHANCEMENT-POINT or ENHANCEMENT-SECTION for your own customer enhancements' ומפנה "
          + "לחלופה: 'We recommend that you use , for example, Business Add-Ins (BAdIs) or implicit enhancement "
          + "options instead. For more information, see Enhancement Framework' (הרווח לפני הפסיק כפי שהוחזר "
          + "בסניפט). ארבעת הציטוטים הוחזרו בסניפטים שונים של אותה רשומת חיפוש; גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Explicit Enhancement Options in ABAP Source Code | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/56ee9441026aae5fe10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "עמוד Explicit Enhancement Options in ABAP Source Code במדריך Enhancement Framework לגרסת ABAP "
          + "platform 2025 FPS01 (loio 56ee9441026aae5fe10000000a1550b0) מגדיר: 'In ABAP programs, you can select "
          + "either a position or a program section as an explicit enhancement option', ומתאר את יצירתה: 'To "
          + "create an explicit enhancement option in the ABAP source code, proceed as follows: In the ABAP "
          + "Editor, open the program you want to edit. Switch to change mode'. סניפטים נוספים של אותה רשומה "
          + "מוסיפים: 'Source code plug-ins for an enhancement are either entered at such a position or they "
          + "replace the selected section', את ההצהרה 'ENHANCEMENT-POINT <name> SPOTS <spot1> [<spot2>] "
          + "[STATIC]', את ההבחנה בין 'Static enhancement statement - for example, additional data declaration' "
          + "לבין 'Dynamic enhancement statement - for example, additional source code', את הסיומת "
          + "'END-ENHANCEMENT-SECTION' ואת המגבלה 'Form routines, methods, and local classes cannot be part of "
          + "dynamic enhancement points and sections'. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancement Technologies | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/7063da4023a28631e10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "עמוד Enhancement Technologies באותו מדריך (loio 7063da4023a28631e10000000a1550b0, ABAP platform 2025 "
          + "FPS01) ממקם את הטכניקה מול BAdI: 'There are two types of explicit enhancement options: BAdIs and "
          + "explicit enhancement points or sections, where you can insert source code plug-ins', ומבחין בין "
          + "נקודה לקטע: 'While a source code plug-in at an enhancement point is processed in addition to the "
          + "original code, the code of an enhancement section is substituted by the respective source code "
          + "plug-in'. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancement Options | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/fbe3d8403e37762ae10000000a155106.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE21,
        claim: "עמוד Enhancement Options באותו מדריך (loio fbe3d8403e37762ae10000000a155106, ABAP platform 2025 "
          + "FPS01) מבדיל בין שני סוגי נקודות ההרחבה: 'Explicit enhancement options can currently be defined by: "
          + "Explicitly flagging source code points or sections in ABAP programs' ו-'Explicit Enhancement Options "
          + "Explicit enhancement options are defined by a developer in a central initial system. Enhancements "
          + "are made in follow-on systems', לעומת 'Implicit enhancement options are provided by the framework' "
          + "ש-'do not require enhancement spots'. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג טכניקות ההרחבה של הפרויקט, רשומת explicit-enhancement (סותרת את ההמלצה הרשמית)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת המאגר מגדירה את הטכניקה כ'נקודות הרחבה ש-SAP הגדירה מראש בקוד (ENHANCEMENT-POINT / "
          + "ENHANCEMENT-SECTION)', דרך מימוש 'מאתרים את ה-Point בקוד, יוצרים Enhancement Implementation, "
          + "מוסיפים/מחליפים לוגיקה', טרנזקציות SE80 ו-SE19, ובלוק ECC מול S/4HANA: ECC 'Enhancement Framework', "
          + "S/4HANA 'נתמך ומועדף על Implicit'. ההגדרה ודרך המימוש עולות בקנה אחד עם התיעוד הרשמי, אך קביעת "
          + "ההעדפה סותרת ישירות את עמוד Business Function של S/4HANA 2025 FPS01, הממליץ שלא להשתמש בנקודות "
          + "שסיפקה SAP להרחבות לקוח ומציע במקומן BAdI או נקודות הרחבה משתמעות. הדוגמאות שברשומה "
          + "('ENHANCEMENT-POINT בעיבוד הזמנת אחזקה', 'ENHANCEMENT-SECTION בחישוב עלות פקודה') הן המחשה ואינן "
          + "מגובות באף עמוד רשמי שנמצא.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/enhancements.ts#explicit-enhancement",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Handle Your Extensions | Manage Your SAP S/4HANA Cloud Public Edition",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/a630d57fc5004c6383e7a81efee7a8bb/be44d6b8f0944c0c81107e34e7232fff.html?locale=en-US&state=PRODUCTION&version=2608.500",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        accessedAt: DATE24,
        claim: "עמוד Handle Your Extensions (loio be44d6b8f0944c0c81107e34e7232fff, 2608 Latest) מתעד את האפליקציה "
          + "Handle Your Extensions של שירות test data refresh ב-SAP S/4HANA Cloud Public Edition. בגוף העמוד (נקרא "
          + "דרך scripts/sap-help-body.mjs) נכתב: 'SAP differentiates between two extensibility options in SAP "
          + "S/4HANA Cloud: Key User Extensibility through built-in capabilities' ו-'Developer Extensibility through "
          + "the SAP S/4HANA Cloud ABAP Environment', ובהערה: 'Side-by-Side Extensibility through SAP BTP is not "
          + "supported'. העמוד אינו נוקב ב-ENHANCEMENT-POINT או ב-ENHANCEMENT-SECTION, ואינו קובע אם הטכניקה זמינה או "
          + "חסומה ב-Public Cloud.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:implicit-enhancement",
      "enh:technique:enhancement-spot",
      "enh:technique:new-badi",
      "enh:technique:classic-badi",
      "enh:technique:key-user-extensibility",
      "tx:SE80",
      "tx:SE19",
      "tx:SE20",
      "tx:SE18",
    ],
    lastVerifiedAt: DATE24,
    notes: "מה נבדק בפועל (2026-09-21): שאילתות בשירות החיפוש הרשמי של SAP Help דרך scripts/sap-help-search.mjs "
      + "בשני המוצרים ABAP_PLATFORM_NEW ו-SAP_S4HANA_ON-PREMISE, וחיפוש רשת מוגבל לדומיינים המותרים. המוצר "
      + "ABAP_PLATFORM_NEW הוא זה שמחזיק את מדריך Enhancement Framework; המוצר SAP_S4HANA_ON-PREMISE אינו "
      + "מחזיק אותו, אך מחזיק את עמוד Business Function שממנו נלקחה ההגבלה. מה אומת מול המקור: השם, ההגדרה, "
      + "שתי ההוראות ENHANCEMENT-POINT ו-ENHANCEMENT-SECTION, ההבחנה בין הוספה (point) להחלפה (section), "
      + "ההבחנה Static מול Dynamic, המגבלה על Form routines, מתודות ומחלקות מקומיות בנקודות דינמיות, ההבחנה "
      + "מול נקודות משתמעות, וההגבלה, ההמלצה והחלופה שבתיעוד S/4HANA 2025 FPS01. מה לא אומת: אף עמוד רשמי "
      + "שנמצא אינו נוקב בנקודת הרחבה מפורשת בתוך עיבוד הזמנת תחזוקה או פקודת תהליך, ולכן שתי הדוגמאות "
      + "שברשומת המאגר נותרות ללא גיבוי רשמי; טענת ההעדפה על פני Implicit ('מועדף על Implicit') לא נמצאה באף "
      + "סניפט רשמי והיא סותרת את ההמלצה שבעמוד Business Function; לא נמצא סניפט רשמי הקובע אם ההוראה "
      + "ENHANCEMENT-POINT מותרת או אסורה בגרסת השפה ABAP for Cloud Development (הממצא תחום בחיפוש ואינו "
      + "קביעה על זמינות); ההתאמה בין ABAP platform 2025 FPS01 (versionId 202510.001) לבין S/4HANA 2025 FPS01 "
      + "(versionId 2025.001) לא אומתה מסניפט רשמי, אך שתי רשומות החיפוש מחזירות את תווית הגרסה '2025 FPS01 "
      + "(Feb 2026)', וכל versionId נרשם כפי שהוחזר. גוף עמודי help.sap.com לא נקרא: נבדק בפועל שכל הכתובות "
      + "מחזירות HTTP 200 עם מעטפת JavaScript בת 1,160 בתים ללא טקסט תוכן, ושירות pagecontent החזיר HTTP 500, "
      + "ולכן כל טענה כאן תחומה בכותרת ובסניפט של רשומת החיפוש. שדה product ברשומות ה-ABAP נרשם 'ABAP "
      + "platform', מילה במילה כפי ששירות החיפוש מחזיר אותו. רשומות רשמיות שנראו ולא צוטטו: Switch States "
      + "במדריך Switch Framework (loio 4e708441fd86030de10000000a1550b0, ABAP platform 2025 FPS01) המפנה "
      + "ל-'See the ABAP statements ENHANCEMENT POINT and ENHANCEMENT - SECTION with the STATIC addition' "
      + "וקובע ש-'STAND BY Switches on all declarative repository objects, that is, all switchable objects of "
      + "the ABAP Dictionary and all static source code enhancements'; Source Code Plug-Ins במדריך "
      + "Application Development on AS ABAP (loio e5dca35db39546569b2a35a359f816b4) הקובע 'Positions for "
      + "source code plug-ins are defined by the commands ENHANCEMENT-POINT, ENHANCEMENT-SECTION, and "
      + "ENDENHANCEMENT-SECTION'; Enhancement with Source Code Plug-ins במדריך ADT (loio "
      + "4ec1abd36e391014adc9fffe4e204223); ו-Cases When ABAP Source Code Needs Adjustment (loio "
      + "819a3942ec4ae22ce10000000a1550b0) הקובע 'A conflict has occurred between source code plug-ins for "
      + "enhancements defined with ENHANCEMENT-SECTION'. הסטטוס הנגזר שהאפליקציה מציגה כיום לרשומה זו הוא "
      + "'משתנה ב-S/4HANA' (fromEccS4Block על בלוק ECC מול S/4HANA ברשומת data/enhancements.ts, שדה S/4HANA "
      + "אינו ריק) ברמת 'נדרש אימות נוסף'; הסטטוס המחובר כאן הוא 'מוגבל ב-S/4HANA', ורמת האימות של הרשומה "
      + "תיקרא 'מקורות סותרים' בגלל שורת המאגר, לפי אותה מוסכמה שננקטה באצווה 2 של קטלוג זה. ה-MCP ל-ABAP לא "
      + "היה זמין בהרצה זו ולא בוצעה בדיקה במערכת SAP חיה; איתור נקודות ההרחבה המפורשות הקיימות בתוכניות PM "
      + "ו-PP-PI, מימושיהן ומצב המתגים שלהן דורש בדיקה ב-SE80 וב-SE19 במערכת."
      + " סבב 2026-09-24: ארבע שאילתות ב-scripts/sap-help-search.mjs במוצר SAP_S4HANA_CLOUD ('explicit "
      + "enhancement options', 'extensibility model classic ABAP customer exit', 'in-app extensibility key user', "
      + "'classic extensibility not supported SAP S/4HANA Cloud'). כל אחת החזירה 21 רשומות בעמוד התוצאות של "
      + "הסקריפט, ואף רשומה אינה נוקבת בכותרת או בסניפט ב-ENHANCEMENT-POINT או ב-ENHANCEMENT-SECTION (החיפוש חזר "
      + "ונספר ב-2026-09-24). גוף העמוד Handle Your Extensions (Manage Your SAP S/4HANA Cloud Public Edition, "
      + "loio be44d6b8f0944c0c81107e34e7232fff, versionId 2608.500, deliverable 41170528) נקרא דרך "
      + "scripts/sap-help-body.mjs: זהו עמוד אפליקציה של שירות test data refresh, והמשפט על שתי אפשרויות ההרחבה "
      + "מופיע בו כרקע. היעדר אזכור של הטכניקה בעמוד זה הוא ממצא שלילי מתועד ולא הכרעה על זמינות, ולכן המעמד "
      + "המחובר נשאר מעוגן ב-On-Premise 2025.001. Private Cloud לא נבדק בנפרד בסבב זה, ולא בוצעה בדיקה במערכת חיה.",
  },
  {
    id: "enh:technique:implicit-enhancement",
    aliases: ["Implicit Enhancement", "Implicit Enhancement Options", "Implicit Enhancement Points"],
    status: {
      status: "unchanged",
      he: "נקודות הרחבה משתמעות נותרות חלק מ-Enhancement Framework גם בתיעוד SAP S/4HANA On-Premise 2025 FPS01. "
        + "עמוד Business Function של אותה גרסה ממליץ להשתמש ב-BAdI או בנקודות הרחבה משתמעות במקום בנקודות "
        + "ההרחבה המפורשות ש-SAP הגדירה בפקודות ENHANCEMENT-POINT ו-ENHANCEMENT-SECTION, ומוסיף ש-SAP אינה "
        + "מתחייבת ליציבות הממשקים ולהמשך קיומן של הנקודות המפורשות בקוד המקור. במדריך Geographical Enablement "
        + "Framework באותה גרסה מובאת דוגמה לשימוש: הרחבה משתמעת המוכנסת בתחילת המתודה SET_RESPONSE בתחביר "
        + "ENHANCEMENT 1 ZENHANCE_CORS. מיקומי הנקודות עצמם נקראו במלואם בעמוד ספריית SAP של Enhancement "
        + "Framework: תחילת וסוף FORM, FUNCTION ו-METHOD, סוף include, סוף חלקי PUBLIC, PROTECTED ו-PRIVATE "
        + "SECTION של מחלקה לוקלית, לפני ENDCLASS של חלק המימוש, לפני ENDINTERFACE, סוף הגדרת מבנה ולפני "
        + "ENDENHANCEMENT. בשאילתות שבוצעו לא נמצא עמוד רשמי הקובע שינוי במנגנון בין SAP ERP ל-S/4HANA, ולכן "
        + "נרשם מעמד של היעדר שינוי ולא מעמד של שינוי; ממצא זה תחום בחיפוש ואינו הוכחת היעדר.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Business Function | Introduction: Enhancement Packages and Business Functions",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6534305c0e2c49ddb96177c90df13e28/979bddd4cebe423f9eb5767a275b2d78.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית של help.sap.com לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio "
          + "979bddd4cebe423f9eb5767a275b2d78, המדריך Introduction: Enhancement Packages and Business Functions) "
          + "מחזירה בסניפטים של רשומת החיפוש ארבעה קטעים: 'Caution If you implement your own customer "
          + "enhancements at the explicit enhancement options that SAP defined with the statements "
          + "ENHANCEMENT-POINT or ENHANCEMENT-SECTION, these can be made ineffective' (הסניפט נקטע כאן), 'SAP "
          + "does not guarantee that the interfaces and the existence of these explicit enhancement options will "
          + "remain stable in the source code', 'Therefore we strongly recommend that you not use the enhancement "
          + "options provided by SAP and defined with ENHANCEMENT-POINT or ENHANCEMENT-SECTION for your own "
          + "customer enhancements' ו-'We recommend that you use , for example, Business Add-Ins (BAdIs) or "
          + "implicit enhancement options instead. For more information, see Enhancement Framework' (הפיסוק "
          + "המשובש הוא כפי שהוחזר). ארבעת הקטעים הוחזרו בשאילתות שונות על אותה רשומה; גוף העמוד עצמו לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "בתחזוקת מפעל ובתעשיות תהליכיות להשתמש בהרחבה משתמעת רק כשאין BAdI או נקודת הרחבה ייעודית ליחידת הקוד "
        + "הרלוונטית: לבדוק תחילה ב-SE18 ובעמוד ההרחבות של היישום אם קיים BAdI מתאים, ולהעדיף אותו. כשנבחרת "
        + "הרחבה משתמעת, להציג את הנקודות ב-ABAP Editor דרך Edit -> Enhancement Operations -> Show Implicit "
        + "Enhancement Options, למקם את הקוד באחת הנקודות שהתיעוד מונה (תחילת או סוף FORM, FUNCTION או METHOD) "
        + "ולזכור שהתיעוד מציין הגבלות, למשל שאין נקודה בסוף include של מתודה. לתעד את יחידת הקוד המורחבת ואת "
        + "סיבת הבחירה, ולכלול את ההרחבה ברשימת ההתאמות לשדרוג ולהמרה: התיעוד הרשמי מפנה ל-SPDD, ל-SPAU "
        + "ול-SPAU_ENH להתאמת מודיפיקציות והרחבות, ומציין ששינוי באובייקט המורחב עלול לבטל את תוקף מימוש "
        + "ההרחבה. לשדות ולוגיקה ביישומי Fiori של הזמנת תחזוקה ופקודת תהליך לבחון תחילה את נתיב Key User "
        + "Extensibility, והמלצה זו היא של הפרויקט ולא קביעה של המקורות המצוטטים כאן.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Implicit Enhancement Options in ABAP Source Code (SAP Library - Enhancement Framework)",
        url: "https://help.sap.com/doc/saphelp_nw75/7.5.5/en-US/29/e59441026aae5fe10000000a1550b0/content.htm?no_cache=true",
        product: "SAP NetWeaver AS ABAP (Enhancement Framework)",
        edition: "ecc",
        release: "SAP NetWeaver 7.5 (SAP Library 7.5.5)",
        accessedAt: DATE21,
        claim: "עמוד ספריית SAP הסטטי 'Implicit Enhancement Options in ABAP Source Code' תחת Enhancement Framework "
          + "(הורד ונקרא במלואו) קובע: 'Implicit enhancement options always exist and they are not assigned to an "
          + "enhancement spot', ומונה את המקומות שבהם הן מוגדרות מראש בתוכניות ABAP: 'At the end of an include. "
          + "There are some restrictions, for example, not at the end of a method include', סוף חלקי PUBLIC, "
          + "PROTECTED ו-PRIVATE SECTION של מחלקה לוקלית, לפני ה-ENDCLASS של חלק המימוש, לפני ENDINTERFACE, סוף "
          + "הגדרת מבנה (לפני TYPES END OF, DATA END OF, CONSTANTS END OF ו-STATICS END OF), 'At the beginning "
          + "and at the end of a procedure (FORM, FUNCTION, METHOD). That is, after commands FORM, FUNCTION, and "
          + "METHOD, and before statements ENDFORM, ENDFUNCTION, and ENDMETHOD', סוף רשימת פרמטרי CHANGING, "
          + "IMPORTING ו-EXPORTING של מתודה במחלקה לוקלית, ולפני השורה הראשונה ואחרי השורה האחרונה של תוסף קוד "
          + "מקור (אחרי ENHANCEMENT ולפני ENDENHANCEMENT). העמוד מוסיף: 'The implicit enhancement options can be "
          + "displayed in the ABAP Editor by following the path: Edit -> Enhancement Operations -> Show Implicit "
          + "Enhancement Options, and then enhanced using source code plug-ins'. העמוד שייך לתיעוד SAP NetWeaver "
          + "7.5 ואינו אומר דבר על S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Function | Introduction: Enhancement Packages and Business Functions",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6534305c0e2c49ddb96177c90df13e28/979bddd4cebe423f9eb5767a275b2d78.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית של help.sap.com לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio "
          + "979bddd4cebe423f9eb5767a275b2d78, המדריך Introduction: Enhancement Packages and Business Functions) "
          + "מחזירה בסניפטים של רשומת החיפוש ארבעה קטעים: 'Caution If you implement your own customer "
          + "enhancements at the explicit enhancement options that SAP defined with the statements "
          + "ENHANCEMENT-POINT or ENHANCEMENT-SECTION, these can be made ineffective' (הסניפט נקטע כאן), 'SAP "
          + "does not guarantee that the interfaces and the existence of these explicit enhancement options will "
          + "remain stable in the source code', 'Therefore we strongly recommend that you not use the enhancement "
          + "options provided by SAP and defined with ENHANCEMENT-POINT or ENHANCEMENT-SECTION for your own "
          + "customer enhancements' ו-'We recommend that you use , for example, Business Add-Ins (BAdIs) or "
          + "implicit enhancement options instead. For more information, see Enhancement Framework' (הפיסוק "
          + "המשובש הוא כפי שהוחזר). ארבעת הקטעים הוחזרו בשאילתות שונות על אותה רשומה; גוף העמוד עצמו לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "ICF Service Enhancement | Geographical Enablement Framework",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/86dbe289f813483abd78de6a52458bff/963f4458eee22060e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio 963f4458eee22060e10000000a44147b, "
          + "המדריך Geographical Enablement Framework) מצטטת: 'For example, with ABAP Source Code Enhancements, "
          + "an implicit enhancement can be inserted at the start of method SET_RESPONSE: ENHANCEMENT 1 "
          + "ZENHANCE_CORS'. רשומה מקבילה באותה גרסה ובאותו מדריך, 'Configure JSONP' (loio "
          + "f8414458eee22060e10000000a44147b), מצטטת: 'The following is an example of an implicit enhancement "
          + "made to the method SET_RESPONSE:Sample Code ENHANCEMENT 1 ZENHANCE_JSONP'. שתי הרשומות מראות "
          + "שהטכניקה מתועדת בשימוש בגרסת 2025 FPS01 בתחביר ENHANCEMENT בתחילת מתודה. ההקשר הוא Geographical "
          + "Enablement Framework ולא תחזוקת מפעל או תעשיות תהליכיות; גוף העמודים לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Flow | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2b28ffa716c24348903f8ffbfeb81df8/57f148a3c3eb4689aca27f2e4fb1aec3.html?locale=en-US&state=PRODUCTION&version=1709.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709.latest",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית של המדריך Changing the SAP Standard (BC) תחת מוצר SAP S/4HANA On-Premise, גרסה "
          + "1709.latest (loio 57f148a3c3eb4689aca27f2e4fb1aec3), מצטטת: 'To adjust enhancement implementations, "
          + "perform transaction SPAU_ENH in order to find out whether some of your enhancement implementations "
          + "need to be adapted to changes of the enhanced object' ו-'Note Changes to enhanced objects can "
          + "invalidate the corresponding enhancement implementations' (הסניפט הוחזר במלואו בשאילתה SPAU_ENH "
          + "adjust enhancement implementations enhanced object). רשומה נוספת באותו מדריך ובאותה גרסה, 'Adjusting "
          + "Remaining Objects with Transaction SPAU' (loio a4126b64e72d4402aac34acd01efea3c), מצטטת: 'To adjust "
          + "enhancements of repository objects, open transaction SPAU_ENH'. רשומה שלישית, 'Custom Code "
          + "Adaptation | Conversion Guide for SAP S/4HANA 1709' (loio 5e291b03aba1415abc57d302896b950a), מצטטת: "
          + "'You need to adapt any modifications and enhancements using the standard transactions SPDD, SPAU and "
          + "SPAU_ENH'. שלוש הרשומות עוסקות במימושי הרחבה בכלל ואינן מייחדות את הדיון להרחבה משתמעת. חיפוש מוגבל "
          + "לגרסת 2025.001 לא החזיר את עמודי המדריך הזה; ממצא זה תחום בחיפוש ואינו קביעה על היעדרם.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:explicit-enhancement",
      "enh:technique:enhancement-spot",
      "enh:technique:classic-badi",
      "enh:technique:new-badi",
      "enh:technique:user-exit",
      "enh:technique:customer-exit",
      "enh:technique:key-user-extensibility",
      "enh:badi:WORKORDER_UPDATE",
      "enh:badi:WORKORDER_CONFIRM",
      "tx:SE80",
      "tx:SE38",
      "tx:SE37",
      "tx:SE24",
      "tx:SE19",
      "tx:SE18",
      "tx:SPAU",
      "tx:SPDD",
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: שמונה שאילתות ב-scripts/sap-help-search.mjs (SAP_S4HANA_ON-PREMISE, SAP_ERP "
      + "ו-SAP_S4HANA_CLOUD, בהן implicit enhancement options, implicit enhancement point, Enhancement "
      + "Framework modification-free, enhancement options provided by SAP ENHANCEMENT-POINT "
      + "ENHANCEMENT-SECTION recommend, Enhancements to source code Enhancement Framework implicit, SPAU_ENH "
      + "adjust enhancement implementations after upgrade, maintenance order implicit enhancement function "
      + "module, process order implicit enhancement ABAP source code), חיפוש רשת אחד מוגבל ל-help.sap.com, "
      + "ועמוד ספריית SAP סטטי אחד שהורד ונקרא במלואו. מה שאומת מול המקור: ההגדרה המלאה של מיקומי נקודות "
      + "ההרחבה המשתמעות (מהעמוד שנקרא במלואו, לא מסניפט); שימוש מתועד בטכניקה בשתי רשומות של S/4HANA "
      + "On-Premise 2025 FPS01 באותו מדריך; והמלצת SAP באותה גרסה להשתמש ב-BAdI או בנקודות הרחבה משתמעות "
      + "במקום בנקודות ההרחבה המפורשות. סתירה מול המאגר: רשומת data/enhancements.ts#implicit-enhancement "
      + "קובעת בשדה s4 'נתמך; להעדיף נקודות מפורשות/BAdI כשקיימות', רשומת data/exits.ts בשם Implicit "
      + "Enhancement קובעת 'שביר בשדרוג; תעד; העדף נקודות מפורשות/BAdI', ורשומת "
      + "data/enhancements.ts#explicit-enhancement קובעת על ההרחבה המפורשת 'נתמך ומועדף על Implicit'. עמוד "
      + "Business Function של 2025 FPS01 אומר את ההפך לגבי מחצית ההמלצה: הוא ממליץ שלא להשתמש בנקודות ההרחבה "
      + "המפורשות ש-SAP הגדירה, ומציע BAdI או נקודות הרחבה משתמעות במקומן. מחצית ההמלצה שעניינה העדפת BAdI "
      + "עולה בקנה אחד עם המקור הרשמי. שלוש רשומות המאגר האלה דורשות תיקון; הן לא שונו כאן, והסטטוס שנכתב "
      + "עוקב אחר המקור הרשמי. החלק של המאגר שכן נתמך במקור הוא הסיכון בשדרוג, אך בניסוח רחב יותר: התיעוד "
      + "קובע ששינוי באובייקט המורחב עלול לבטל את תוקף מימוש ההרחבה ושיש להתאים מודיפיקציות והרחבות ב-SPDD, "
      + "ב-SPAU וב-SPAU_ENH, בלי לייחד את האמירה להרחבה משתמעת. מה שלא אומת: לא נמצא עמוד בתוך עץ המוצר SAP "
      + "S/4HANA On-Premise שמגדיר את נקודות ההרחבה המשתמעות (ההגדרה חיה בספריית NetWeaver, ולכן נרשמה "
      + "במהדורת ecc לפי התקדים ב-data/verification/functions.ts; המהדורה ecc מציינת כאן בסיס NetWeaver "
      + "מתקופת ECC (SAP NetWeaver 7.5 הוא הבסיס של SAP ERP 6.0 EHP8), ולא תיעוד ECC עצמו); לא נמצא עמוד רשמי "
      + "הקושר את הטכניקה לתחזוקת מפעל או לתעשיות תהליכיות, ולכן אין דוגמה רשמית ברמת מודול; חיפוש תחת SAP "
      + "S/4HANA Cloud Public Edition לא החזיר אף רשומה הנוגעת לטכניקה, ולכן אין כאן קביעה על זמינותה או על "
      + "הגבלתה במהדורת הענן הציבורית או במודל ABAP Cloud; שמות הפקודות ENHANCEMENT ו-ENDENHANCEMENT "
      + "והדוגמאות ZENHANCE_CORS ו-ZENHANCE_JSONP מצוטטים כפי שהופיעו ולא הושלמו. הטרנזקציה SPAU_ENH מצוטטת "
      + "מהמקור הרשמי אך אינה קיימת במדריך הטרנזקציות של הפרויקט (lib/route-manifest.generated.ts), ולכן היא "
      + "נזכרת בטקסט בלי xref; SPAU ו-SPDD כן קיימות ומקושרות. הרשומה בשם Implicit Enhancement "
      + "שב-data/exits.ts מייצרת מזהה enh:badi:IMPLICIT ENHANCEMENT שאינו יכול לעבור את כלל תחביר המזהים בשל "
      + "הרווח, ולכן רשומת הטכניקה הזו היא הבית של הראיות ואותה שורה לא נכתבה. הרשומה אינה נושאת שדה "
      + "reviewer: אף רשומה ב-data/verification/** אינה נושאת אותו. הסטטוס הנגזר שהאפליקציה הציגה לפני "
      + "הרשומה: 'משתנה ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', לפי בלוק ECC מול S/4HANA של רשומת הטכניקה "
      + "במאגר. ה-MCP ל-ABAP לא היה זמין; לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "enh:technique:field-exit",
    aliases: ["Field Exit", "Field Exits", "Field Exit (Legacy)"],
    status: {
      status: "verification_required",
      he: "טכניקת הרחבה ותיקה ברמת שדה קלט במסך dynpro. המקור הרשמי היחיד שנמצא ומתעד את הטכניקה עצמה הוא העמוד "
        + "'Field exits' באוסף Support Content של help.sap.com, והוא קובע שהטכנולוגיה מושבתת כברירת מחדל מאז "
        + "NetWeaver 6.10 ומיושנת מאז SAP Basis 4.6a. אותו עמוד אינו משויך למערך תיעוד של מוצר S/4HANA ואינו נושא "
        + "גרסת S/4HANA. בשאילתות שנבדקו בשירות החיפוש הרשמי תחת המוצר SAP S/4HANA On-Premise, אף אחת מהרשומות "
        + "שהוחזרו (עד 21 לשאילתה) אינה מזכירה field exit בכותרת או בסניפט, וזהו ממצא תחום של חיפוש ולא הוכחת "
        + "היעדר. ב-2026-09-24 חיפושים חוזרים תחת SAP S/4HANA On-Premise (כולל שאילתות ממוקדות ל-ABAP Cloud ולהרחבת "
        + "משתמש מפתח) ותחת SAP S/4HANA Cloud Public Edition (השאילתה field exit) לא החזירו, בין 21 הרשומות לכל "
        + "שאילתה, אף רשומה שמזכירה field exit בכותרת או בסניפט. בתיעוד ABAP platform לגרסת 2025 FPS01 הטכניקה "
        + "נזכרת בשני עמודי כלים בלבד (מגבלת מצב דיבוג בדיבאגר, ותכונת שדה בכלי Screen Analysis) ללא הגדרה, ללא "
        + "אופן מימוש וללא קביעת מעמד. לכן מעמד הטכניקה ב-S/4HANA, כלומר זמינות, תמיכה והמלצה, אינו נקבע ברשומה זו "
        + "ודורש אימות במערכת היעד ובמקור רשמי ייעודי.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לפני כל החלטה לאמת במערכת S/4HANA היעד שני דברים: את ערכו של פרמטר הפרופיל abap/fieldexit (RZ11 "
        + "לצפייה, RZ10 לעריכת הפרופיל) ואת קיומם של field exits פעילים בפועל, באמצעות הרצת התוכנית RSMODPRF "
        + "ב-SE38 כמתואר בעמוד הרשמי (השארת שדה אלמנט הנתונים ריקה מציגה את כל ה-field exits הקיימים). לכל "
        + "field exit שנמצא בקוד הלקוח לתעד את אלמנט הנתונים, את מודול הפונקציה FIELD_EXIT_<data element> ואת "
        + "המסכים המושפעים, ולהעריך מחדש את הלוגיקה: התיעוד הרשמי מגביל את הטכניקה ל-dynpro בלבד, ולכן היא אינה "
        + "חלה על יישומי Fiori של תחזוקת מפעל ושל תעשיות תהליכיות. לבחינת חלופה לבדוק בתיעוד גרסת היעד אילו "
        + "טכניקות הרחבה מתועדות שם, למשל Custom Fields and Logic בהקשר העסקי הרלוונטי, BAdI, או ולידציה "
        + "בתהליך; רשומה זו אינה מביאה מקור רשמי לאף אחת מהן כחלופה ל-field exit, ואין לרשום כאן תחליף מוסמך: "
        + "אף מקור רשמי שנמצא אינו קובע תחליף מוגדר ל-field exit. אין להציג את הטכניקה כנתמכת או כזמינה "
        + "ב-S/4HANA לפני בדיקה במערכת.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Field exits | ABAP Development",
        url: "https://help.sap.com/docs/SUPPORT_CONTENT/abap/3353525738.html?locale=en-US&state=PRODUCTION&version=1.0",
        product: "Support Content",
        edition: "on-premise",
        release: "1.0 (אוסף Support Content, deliverable ABAP Development)",
        accessedAt: DATE24,
        claim: "העמוד 'Field exits' במדריך ABAP Development שבאוסף Support Content של help.sap.com (loio 3353525738, "
          + "גרסה 1.0, תאריך 2026-07-01) הוא העמוד הרשמי היחיד שנמצא ומתעד את הטכניקה. ארבעה חלונות סניפט שהוחזרו "
          + "בארבע שאילתות נפרדות: (1) 'Field exit technology is deactivated by default since NetWeaver 6.10 and "
          + "is obsolete since SAP Basis 4.6a. More information can be found here: FAQs: field exits "
          + "(restrictions, etc.)'; (2) 'Field exits Introduction A field exit is an old enhancement technology "
          + "linked to a screen input field (only dynpro technology is supported) which executes custom ABAP "
          + "code, that is allowed to: change' (הסניפט נקטע ומתחדש) 'the value of the field trigger an error "
          + "message on that field A field exit applies to a given data element and a given dynpro or all "
          + "dynpros, and is active for all clients'; (3) 'It calls a function module with a special name that "
          + "needs to be registered via program RSMODPRF (see below how to implement)' וכן 'Note: if you just "
          + "want to display all existing field exits, leave the data element field blank. It then displays a "
          + "screen with function module FIELD_EXIT_<data_element>' ולאחר מכן 'Run transaction SE38, execute "
          + "program RSMODPRF Enter the data element of the field to be enhanced'; (4) 'The field exits cannot be "
          + "called in releases 6.10 (and after) if the \"abap/fieldexit\" profile parameter' (נקטע) "
          + "ו-'Implementing a field exit In releases 6.10 and after, the \"abap/fieldexit\" profile parameter must "
          + "be changed from 0 to 1 (transaction RZ10 or RZ11)', וכן 'Check box of your field exit, and select "
          + "menu Fieldexit | Activate. Note: You have to enter a workbench transport request (object of type "
          + "R3TR XDYN)' ו-'After transport of the field exit in a target system, you must call program RSMODFDG "
          + "in the target system (any client) to activate the field exit'. העמוד אינו נוקב בגרסת S/4HANA כלשהי "
          + "ואינו משויך למערך תיעוד של מוצר S/4HANA. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Layout of the User Interface | ABAP Test and Analysis Tools",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/ba879a6e2ea04d9bb94c7ccd7cdac446/4917c5f1a2e314d3e10000000a42189b.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001 (ABAP platform 2025 FPS01)",
        accessedAt: DATE24,
        claim: "בתיעוד ABAP platform לגרסת 2025 FPS01 (versionId 202510.001, loio 4917c5f1a2e314d3e10000000a42189b, "
          + "תאריך 2026-07-27), נושא 'Layout of the User Interface' במדריך ABAP Test and Analysis Tools קובע "
          + "בסניפט: 'Debugging mode is not possible for conversion or field exits'. זו ההתייחסות היחידה ל-field "
          + "exits בסניפט: העמוד אינו מגדיר את הטכניקה, אינו מתאר כיצד לממש אותה ואינו קובע את מעמדה. המשמעות "
          + "התחומה היא שהפלטפורמה שמתחת ל-S/4HANA בגרסת 2025 עדיין מכירה במושג field exit, וששינוי ערכים של "
          + "field exit אינו ניתן לדיבוג בכלי. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Screen Analysis | ABAP Test and Analysis Tools",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/ba879a6e2ea04d9bb94c7ccd7cdac446/8dad1fbc3c094a77aeb0b1e46d44d1cd.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001 (ABAP platform 2025 FPS01)",
        accessedAt: DATE24,
        claim: "באותו מערך תיעוד ובאותה גרסה (loio 8dad1fbc3c094a77aeb0b1e46d44d1cd, תאריך 2026-07-27), נושא 'Screen "
          + "Analysis' קובע בסניפט: 'You use the Screen Analysis tool to display the current runtime "
          + "representation of screens' וכן 'Special Attr Special Attr. contains information about conversion "
          + "exits, user field exits, foreign key checks and switches'. כלומר כלי ניתוח המסכים של הפלטפורמה בגרסת "
          + "2025 FPS01 עדיין מציג מידע על user field exits ברמת שדה מסך. הסניפט אינו קובע שניתן ליצור field exit "
          + "חדש, אינו מזכיר את CMOD ואינו מזכיר את S/4HANA. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "קובץ טכניקות ההרחבה של הפרויקט, רשומת field-exit",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim: "רשומת הטכניקה במאגר (data/enhancements.ts#field-exit) מגדירה 'ולידציה ברמת שדה מסך (ישן מאוד): כמעט לא "
          + "בשימוש כיום', מתארת את המימוש כ-'הוגדר דרך CMOD/Field Exit; הוחלף ע\"י screen logic/BAdI', מסווגת ECC "
          + "כ-'Legacy; נדיר' ו-S/4HANA כ-'מיושן: אל תשתמש; העדף BAdI/validation', רושמת את הטרנזקציה CMOD בלבד "
          + "ונושאת את ההערה 'מיושן: נכלל לשלמות היסטורית בלבד' (הציטוטים מובאים בפיסוק מותאם: המקף הארוך שבמקור "
          + "הוחלף בנקודתיים). כיוון הרשומה (טכנולוגיה מיושנת) תואם את העמוד הרשמי; ההיגד 'הוחלף ע\"י screen "
          + "logic/BAdI' אינו נתמך באף מקור רשמי שנמצא ולכן נשאר ברמת המאגר.",
        verificationLevel: "repository_verified",
        repoRef: "data/enhancements.ts#field-exit",
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:technique:classic-badi",
      "enh:technique:new-badi",
      "enh:technique:key-user-extensibility",
      "enh:technique:transaction-variant",
      "tx:CMOD",
      "tx:SE38",
      "tx:RZ10",
      "tx:RZ11",
    ],
    lastVerifiedAt: DATE24,
    notes: "שיטה (2026-09-21): למעלה מעשרים שאילתות ב-scripts/sap-help-search.mjs על פני שישה מערכי מוצר "
      + "(SAP_S4HANA_ON-PREMISE, SAP_S4HANA_CLOUD, SAP_ERP, ABAP_PLATFORM, ABAP_PLATFORM_NEW, "
      + "SUPPORT_CONTENT) ושני חיפושי רשת מוגבלים ל-help.sap.com. מה שאומת מול המקור, כולו מעמוד אחד ('Field "
      + "exits', אוסף Support Content, deliverable ABAP Development, גרסה 1.0, loio 3353525738): ההגדרה של "
      + "הטכניקה, הקשירה שלה לאלמנט נתונים ולמסך dynpro, התוקף לכל הלקוחות (clients), מודול הפונקציה "
      + "FIELD_EXIT_<data_element>, הרישום דרך התוכנית RSMODPRF ב-SE38, ההפעלה דרך התפריט Fieldexit | "
      + "Activate ובקשת העברה מסוג R3TR XDYN, ההפעלה במערכת היעד דרך RSMODFDG, פרמטר הפרופיל abap/fieldexit "
      + "(שינוי מ-0 ל-1 ב-RZ10 או RZ11) והמשפט 'deactivated by default since NetWeaver 6.10 and is obsolete "
      + "since SAP Basis 4.6a'. ארבעת חלונות הסניפט צוטטו משאילתות שונות, כי חלון הסניפט משתנה לפי השאילתה. "
      + "אותו עמוד אינו מערך תיעוד של מוצר S/4HANA ואינו נושא גרסת S/4HANA, ולכן הוא אינו יכול לשמש ראיה "
      + "למעמד הטכניקה ב-S/4HANA. ממצא תחום של חיפוש, לא הוכחת היעדר: בשאילתה 'field exits' תחת המוצר "
      + "SAP_S4HANA_ON-PREMISE עם size 21, אף אחת מ-21 הרשומות שהוחזרו אינה מכילה את הצירוף field exit בכותרת "
      + "או בסניפט; אותו הדבר תחת המוצר SAP_S4HANA_CLOUD, וכן בשאילתות 'RSMODPRF', 'FIELD_EXIT function "
      + "module data element' ו-'abap/fieldexit'. שים לב שהשדה total בפלט הסקריפט הוא מספר הרשומות שהוחזרו "
      + "בעמוד ולא גודל הקורפוס. השאילתות 'field exit', 'field exits CMOD', 'field exit data element screen "
      + "field validation', 'field exit simplification' ו-'field exits no longer supported' תחת "
      + "SAP_S4HANA_ON-PREMISE החזירו רק עמודי user exit בתחומים אחרים (Special Purpose Ledgers, Incentive "
      + "and Sales Force Management, Document Management, Maintenance Management עם WTY00001/WTY00002) ואת "
      + "המדריך 'Changing the SAP Standard (BC)' בגרסה 1709.latest, שעמודיו ('Types of Exits', "
      + "'Enhancements', 'Changing Field Texts', 'Creating Customer-Specific Subscreens') עוסקים ב-Customer "
      + "Exits ובשינוי טקסטי שדה דרך SMOD/CMOD ולא ב-field exits. תחת המוצר SAP_ERP החזירה השאילתה 'field "
      + "exit' רק עמודי User Exits for the Rollup ו-User Exit CACS2004. מה שלא אומת: מעמד ה-field exit "
      + "ב-S/4HANA (אין עמוד רשמי שנמצא הקובע אותו), קיומו של תחליף מוסמך ולכן אין successor ברשומה, ערך "
      + "ברירת המחדל של abap/fieldexit במערכת S/4HANA קונקרטית, וההיגד שברשומת המאגר 'הוחלף ע\"י screen "
      + "logic/BAdI'. נתיב המימוש הרשמי היחיד שנמצא בסניפטים הוא SE38 עם RSMODPRF. עם זאת העמוד 'Ways to find "
      + "a userexit' (אותו אוסף, loio 3353525969) מחזיר בסניפט את הצירוף 'FAQs: Field exits (CMOD)' לצד "
      + "'Field Exit Report RSMODPRF' ו-'Customer Exits(SMOD/CMOD)', כלומר הקישור בין CMOD ל-field exits כן "
      + "מופיע במקור רשמי, כהפניה ל-FAQ בלבד וללא תיאור הליך תחזוקה. לכן ה-xref ל-tx:CMOD נשען על סניפט רשמי "
      + "ועל רשומת המאגר גם יחד, אך הליך התחזוקה דרך CMOD עצמו לא אומת. ה-xrefs האחרים הם הקשר בלבד: "
      + "customer-exit, classic-badi, new-badi, key-user-extensibility ו-transaction-variant הן הטכניקות "
      + "השכנות בקטלוג הפרויקט, ואף מקור רשמי אינו מציג אותן כחלופה מוסמכת ל-field exit. אזהרת בלבול מונחים: "
      + "העמוד 'Processing Input/Output Fields' במדריך Classic Screen Programming (ABAP platform 2025 FPS01, "
      + "loio 4a43fbfd5bc52baee10000000a421937) מכיל את הצירוף 'the dynpro field exit (value X)', אך שם מדובר "
      + "ביציאה ממסך בתכנות dynpro קלאסי ולא בטכניקת ההרחבה שברשומה זו, ולכן העמוד לא נכלל כראיה. הסטטוס "
      + "הנגזר שהאפליקציה הציגה לפני רשומה זו: 'משתנה ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', שכן "
      + "components/neo-shell/reference/enh-data.ts מעביר את השדה s4 של הרשומה כ-changed ל-fromEccS4Block. "
      + "הסטטוס המחובר כאן הוא verification_required כדי שלא תיטען המשכיות מ-ECC ל-S/4HANA שאין לה מקור. גוף "
      + "עמודי help.sap.com לא נקרא באף שלב (מעטפת JavaScript; curl ל-loio 3353525738 החזיר 1,160 בתים ללא "
      + "גוף, וכך גם עמוד abapdocu_latest_index_htm/abapcall_customer-function.htm), ה-MCP ל-ABAP לא היה זמין "
      + "(Connection closed), ולא בוצעה בדיקה במערכת SAP חיה."
      + " עדכון 2026-09-24: הורצו שלוש שאילתות נוספות ב-scripts/sap-help-search.mjs עם size 21: 'field exit ABAP "
      + "Cloud' ו-'field exit key user extensibility' תחת SAP_S4HANA_ON-PREMISE, ו-'field exit' תחת "
      + "SAP_S4HANA_CLOUD (Public Edition). בשלושתן אף אחת מ-21 הרשומות שהוחזרו אינה מזכירה field exit בכותרת או "
      + "בסניפט; זהו ממצא תחום של חיפוש ולא הוכחת היעדר. שלוש רשומות help.sap.com שבראיות חזרו באותו יום בחיפוש "
      + "עם URL זהה: 'Field exits' (שאילתה 'field exits' תחת SUPPORT_CONTENT), 'Layout of the User Interface' "
      + "(שאילתה 'debugging mode conversion field exits' תחת ABAP_PLATFORM_NEW) ו-'Screen Analysis' (loio "
      + "8dad1fbc3c094a77aeb0b1e46d44d1cd, שאילתה 'Screen Analysis user field exits' תחת ABAP_PLATFORM_NEW, "
      + "והסניפט שוב מכיל 'user field exits'); רשומת המאגר נקראה מחדש ללא שינוי בתוכן. לכן עודכן רק accessedAt, "
      + "ותוכן הראיות נשמר; בציטוטי המאגר הוחלף המקף הארוך בנקודתיים. מזהי המוצר SAP_S4HANA_PRIVATE_CLOUD, "
      + "SAP_S4HANA_CLOUD_PRIVATE ו-SAP_S4HANA_CLOUD_PRIVATE_EDITION החזירו 0 רשומות בסקריפט בשאילתה 'field "
      + "exit', ולא זוהה מזהה מוצר ייעודי למהדורת Private Cloud. לא נקרא גוף עמוד ב-sap-help-body.mjs, לא הורץ "
      + "חיפוש חדש תחת Simplification Item או RIN, והסטטוס verification_required לא השתנה. לא בוצעה בדיקה במערכת "
      + "SAP חיה.",
  },
  {
    id: "enh:technique:bte",
    aliases: ["Business Transaction Events", "Open FI", "FIBF"],
    status: {
      status: "unchanged",
      he: "התיעוד הרשמי של SAP S/4HANA On-Premise 2025 FPS01 ממשיך לתעד את טכניקת ההרחבה בשם Business "
        + "Transaction Events ואת הטרנזקציה FIBF בשמה המלא 'SAP Business Framework: Business Transactions "
        + "Events', באותם מזהי loio המוגשים גם בתיעוד SAP ERP 6.0 EHP8 Latest. רשימת הפישוט הציבורית לגרסת 2025 "
        + "FPS01, שנקראה כטקסט מלא (1,514 עמודים), אינה נוקבת במונחים Business Transaction Event, BTE או FIBF "
        + "באף מקום, ולכן הטכניקה עצמה אינה פריט פישוט. 'ללא שינוי' מתייחס כאן להמשכיות התיעוד, השם והטרנזקציה "
        + "בלבד, ולא לרשימת האירועים עצמם: רשומת What's New לגרסת 2025 מוסיפה הפעלת BTEs עבור מסמכים שנוצרים "
        + "בעיבוד ההמשך של MRP Live, ובמקביל רשומת What's New in Transactional Banking לאותה גרסה מוחקת אירועי "
        + "BTE מסוימים ברכיב FS-AM, ופריט פישוט 6.7.5 מוציא משימוש שני מודולי Open FI של הלוקליזציה הרוסית. לא "
        + "נבדק כל אירוע BTE בנפרד.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Business Transaction Events | Payments and Bank Communication",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e200555127f24878bed8d1481c9d5a0b/4defc5536a51204be10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Business Transaction Events' מתוך המדריך Payments and Bank Communication לגרסת SAP S/4HANA "
          + "On-Premise 2025 FPS01 (loio 4defc5536a51204be10000000a174cb4) מגדיר את הטכניקה: 'The business "
          + "transaction event is an event for which an SAP program extends the system without modification, "
          + "depending on the settings in Customizing'. הסניפט ממשיך: 'At this event you can call up a separately "
          + "developed function module that determines the general ledger group (for example, an industry) from "
          + "business partner data' ו-'You use events to add in' (הסניפט נקטע כאן). בסניפט המילים מופיעות "
          + "כ-'eventis' בלי רווח, וצוטטו כאן עם רווח. אותו loio מוגש גם תחת SAP ERP עם תווית הגרסה '6.0 EHP8 "
          + "Latest' (versionId 6.18.latest) במדריך Bank Customer Accounts (BCA), עם אותו נוסח סניפט. גוף העמוד "
          + "לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "לפני שימוש ב-BTE בפרויקט מיגרציה יש לאתר את האירוע הרלוונטי בטרנזקציה FIBF ולאשר במערכת S/4HANA "
        + "המותקנת שהאירוע ומודול הפונקציה הרשום אליו קיימים. שתי ראיות מגרסת 2025 מראות שרשימת האירועים אינה "
        + "יציבה: אירועי BTE נמחקו ברכיב FS-AM, ומודולי Open FI מקומיים הוצאו משימוש בפריט פישוט 6.7.5 עם הפניה "
        + "ל-BAdI FIGLO_PMNT_FIELDS. התיעוד הרשמי ממקם את מקור הטכניקה ב-Financial Accounting (Open FI) ומתאר "
        + "את ה-BAdI כהכללה שלה, ולכן בתרחיש הרחבה חדש בתחזוקת מפעל או בתעשיות תהליכיות כדאי לבחון תחילה BAdI "
        + "קיים או הרחבת Key User, ולשמור את ה-BTE לאירועים ש-SAP עצמה מתעדת (למשל רשימות ה-BTE של עצי מוצר ושל "
        + "נתוני אב חומר). לא נמצא עמוד רשמי הקובע את מעמד הטכניקה ביחס ל-ABAP Cloud או ל-Clean Core, ולכן "
        + "בסביבה המיישרת קו עם Clean Core יש לברר זאת מול צוות הפלטפורמה לפני המימוש.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Business Transaction Events | Payments and Bank Communication",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e200555127f24878bed8d1481c9d5a0b/4defc5536a51204be10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Business Transaction Events' מתוך המדריך Payments and Bank Communication לגרסת SAP S/4HANA "
          + "On-Premise 2025 FPS01 (loio 4defc5536a51204be10000000a174cb4) מגדיר את הטכניקה: 'The business "
          + "transaction event is an event for which an SAP program extends the system without modification, "
          + "depending on the settings in Customizing'. הסניפט ממשיך: 'At this event you can call up a separately "
          + "developed function module that determines the general ledger group (for example, an industry) from "
          + "business partner data' ו-'You use events to add in' (הסניפט נקטע כאן). בסניפט המילים מופיעות "
          + "כ-'eventis' בלי רווח, וצוטטו כאן עם רווח. אותו loio מוגש גם תחת SAP ERP עם תווית הגרסה '6.0 EHP8 "
          + "Latest' (versionId 6.18.latest) במדריך Bank Customer Accounts (BCA), עם אותו נוסח סניפט. גוף העמוד "
          + "לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Defining Business Transaction Event (BTE) for Electronic Documents | Israel",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8684a9474f284ef0a2207fc66d4d97f7/4ff96b93116b4199939841e4d72b1006.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Defining Business Transaction Event (BTE) for Electronic Documents' מתוך המדריך Israel לגרסת "
          + "S/4HANA On-Premise 2025 FPS01 (loio 4ff96b93116b4199939841e4d72b1006) נוקב בשם המלא של הטרנזקציה: "
          + "'Go to the SAP Business Framework: Business Transactions Events (FIBF) transaction and choose More "
          + "Settings Identification SAP Applications. Select New Entries'. בסניפט המקורי מופיעים רצפי nbsp בין "
          + "פריטי התפריט, וצוטטו כאן כרווחים. המשך הסניפט: 'To enable the creation of electronic documents for "
          + "accounting documents using the eDocument Cockpit (EDOC_COCKPIT) transa' (נקטע). לפי הכותרת, שם "
          + "המדריך והסניפט העמוד עוסק בהגדרת מסמכים אלקטרוניים; גוף העמוד לא נקרא, ולכן לא נטען מה עוד הוא מכיל.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Comparison of Classic BAdIs with Previous Techniques | Flexible Real Estate Management (RE-FX)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/3683a11901b74d8fa71f35d86abaaae1/eb3e7ceb940e11d295df0000e82de14a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Comparison of Classic BAdIs with Previous Techniques' לגרסת S/4HANA On-Premise 2025 FPS01 "
          + "(loio eb3e7ceb940e11d295df0000e82de14a, המדריך Flexible Real Estate Management) ממקם את הטכניקה מול "
          + "טכניקות אחרות: 'Business Transaction Events (Open FI) The Open FI enhancement technique was "
          + "developed in the Financial Accounting component', 'Business Add-Ins are to be seen as a type of "
          + "generalization of business transaction events' ו-'The concepts behind the Business Add-Ins "
          + "enhancement technique and Open FI are roughly the same with the following exceptions: Open FI can "
          + "only be used to make program enhancements, that is, enhancements' (הסניפט נקטע כאן). שלושת הקטעים "
          + "התקבלו משתי שאילתות נפרדות של אותה רשומה, שכן חלון הסניפט משתנה לפי השאילתה. העמוד אינו קובע שה-BTE "
          + "הוצא משימוש. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Transaction Events in MRP Live | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private "
          + "Edition 2025",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/2278cd20aacc4fa99aa4dcefc5be0a82.html?locale=en-US&state=PRODUCTION&version=2025.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        accessedAt: DATE21,
        claim: "רשומת What's New בשם 'Business Transaction Events in MRP Live' לגרסת S/4HANA 2025 (loio "
          + "2278cd20aacc4fa99aa4dcefc5be0a82) נוקבת: 'With this feature, BTE events are now also generated "
          + "during the MRP Live run'. משפט הפתיחה התקבל בשני חלונות סניפט נפרדים שחופפים זה לזה, ולכן הוא מורכב "
          + "כאן משניהם ולא צוטט מחלון אחד: 'This feature enables materials relevant for SAP Integrated Business "
          + "Planning (SAP IBP) or Production Planning and Detailed Scheduling (PP/DS) integration to be planned "
          + "using MRP live, followed by triggering the Business Transaction Events (BTEs) for documents created "
          + "during post-processing'. שורת הסיווג בסניפט היא 'Availability SAP S/4HANA Cloud Private Edition and "
          + "SAP S/4HANA Valid as Of 2025', ובשורת הפריט מופיעים 'Changed n/a PP-MRP 2025'. הרשומה אינה נוקבת "
          + "בקוד טרנזקציה, בשם אירוע BTE או במודול פונקציה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Transaction Events | What's New in Transactional Banking",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/6e60ffb0b059423eb2d5b1bbdccde6a0/f75b8739a00849f0a1f51b696011f140.html?locale=en-US&state=PRODUCTION&version=2025.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        accessedAt: DATE21,
        claim: "רשומת What's New in Transactional Banking לגרסת S/4HANA 2025 (loio f75b8739a00849f0a1f51b696011f140) "
          + "מראה שרשימת אירועי ה-BTE כן משתנה: 'Business Transaction Events The following Process Business "
          + "Transaction Events (BTEs) were deleted: 0BCA3055 Payment items: Add new positions 0BCA3090 Payment "
          + "items: Bank network affiliation and reference' (הסניפט נקטע כאן). חלון סניפט אחר של אותה רשומה מוסיף "
          + "את שורת הסיווג 'Technical Details Type Deleted Functional Localization Not applicable Application "
          + "Component FS-AM (Account Management)', וכן 'Instead of the deleted BTE you need to use an active "
          + "implementation of the corresponding multiple-use Business' (נקטע). המחיקה חלה על אירועים מסוימים "
          + "ברכיב ניהול חשבונות, ולא על טכניקת ההרחבה או על הטרנזקציה FIBF. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private "
          + "Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 6.7.5 S4TWL - Russia Manage "
          + "Additional Payment Attributes app, pp. 392-393",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "רשימת הפישוט הציבורית לגרסת 2025 FPS01 (גרסת מסמך 1.36, 1,514 עמודים) חולצה כטקסט מלא ונסרקה: אין בה "
          + "אף מופע של 'Business Transaction Event', אף מופע של 'FIBF' ואף מופע של המונח BTE כמילה עצמאית. שלושת "
          + "רצפי האותיות BTE שנמצאו הם חלק ממזהי אובייקט ולא מן המונח (RSWUVWIZBTE ברשימת דוחות Workflow, WBTE "
          + "ברשימת דוחות מיושנים, ו-get_stock_change_for_bte בקטע קוד של ניהול מלאי). הטכניקה עצמה אינה פריט "
          + "פישוט ברשימה. המחרוזת 'Open FI' מופיעה אך ורק בפריט 6.7.5 S4TWL - Russia Manage Additional Payment "
          + "Attributes app (עמ' 392 עד 393), שבו נכתב שמסך תכונות התשלום 'Open FI Functional Modules "
          + "J_3RF_PDOCV_2218 and J_3RF_PDOC1430) is obsolete within these releases' מגרסת 1909 ואילך, וכן 'If "
          + "you have made customer enhancements to the obsoleted Open FI function modules, check if you need to "
          + "reimplement them in the new Fiori App. Custom logic can be implemented in the BAdI "
          + "FIGLO_PMNT_FIELDS'. מדובר בשני מודולי Open FI של הלוקליזציה הרוסית, ולא בטכניקה כולה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:classic-badi",
      "enh:technique:new-badi",
      "enh:technique:enhancement-spot",
      "enh:technique:customer-exit",
      "enh:technique:key-user-extensibility",
      "tx:SE18",
      "tx:SE19",
      "tx:SMOD",
      "tx:CMOD",
      "tx:MD01N",
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: שאילתות ב-scripts/sap-help-search.mjs תחת SAP_S4HANA_ON-PREMISE, SAP_ERP ו-SAP_S4HANA_CLOUD, "
      + "וקריאה מלאה של קובץ ה-PDF של רשימת הפישוט, כולן ב-2026-09-21. מה שאומת מול המקור: השם Business "
      + "Transaction Events בתיעוד S/4HANA 2025 FPS01, ההגדרה כהרחבה ללא מודיפיקציה דרך Customizing, השם המלא "
      + "של הטרנזקציה FIBF, מקור הטכניקה ב-Financial Accounting תחת השם Open FI, היחס בין BAdI ל-BTE "
      + "('generalization'), הרחבת המנגנון ברשומת What's New לגרסת 2025 (MRP Live), ומחיקת אירועי BTE מסוימים "
      + "ברכיב FS-AM באותה גרסה. ההמשכיות בין ECC ל-S/4HANA נמדדה כך: loio 4defc5536a51204be10000000a174cb4 "
      + "(עמוד ההגדרה) ו-loio e204c453f57eb44ce10000000a174cb4 (עמוד ה-BOM) מוגשים גם תחת SAP_ERP עם תווית "
      + "גרסה '6.0 EHP8 Latest' ו-versionId 6.18.latest, עם אותו נוסח סניפט. הנגטיב על פריט הפישוט נמדד ולא "
      + "הוסק: קובץ SIMPL_OP2025.pdf בגרסת מסמך 1.36 (1,514 עמודים) חולץ כטקסט מלא, ובו אפס מופעים של "
      + "'Business Transaction Event', אפס של 'FIBF' ואפס של BTE כמילה עצמאית; המחרוזת 'Open FI' מופיעה אך "
      + "ורק בפריט 6.7.5. רשומות רשמיות נוספות שנראו ולא צוטטו כראיה: 'User Exits in Incentive and Commission "
      + "Management' (2025.001, loio c678cb53f0f67314e10000000a174cb4) הנוקב 'There are two types of "
      + "interface: Publish & Subscribe interfaces'; 'Registering Function Modules for Electronic Documents' "
      + "(Spain, 2025.001, loio b8969066aa744296b4aa3ce8350fa832); 'Enhancements using Business Transaction "
      + "Events (BOMs)' (Document Management, 2025.001, loio e204c453f57eb44ce10000000a174cb4); 'Enhancements "
      + "Using Business Transaction Events (Material Master)' (Product Master, 2025.001, loio "
      + "5914c453f57eb44ce10000000a174cb4); ו-'Enhancements in BOMs' (Bill of Material (LO-MD-BOM), 2025.001, "
      + "loio c204c453f57eb44ce10000000a174cb4). מה שלא אומת: אף עמוד רשמי שנמצא אינו מקשר BTE להזמנת תחזוקה, "
      + "לפקודת תהליך או לאישור ייצור, ולכן הדוגמה שברשומת המאגר (data/enhancements.ts#bte, 'אירוע בעיבוד "
      + "מסמך חומר מפקודת ייצור') נשארת ברמת המאגר ולא נכתבה בסטטוס; מספרי אירועי ה-BTE, שמות מודולי הפונקציה "
      + "ורשימות הפרמטרים מופיעים רק בגוף העמודים, שלא נקרא, שכן help.sap.com מגיש מעטפת JavaScript. גם בדיקת "
      + "HTTP אינה מהווה אימות קיום בפורטל: loio מזויף תחת מדריך אמיתי מחזיר גם הוא קוד 200, ולכן קיומו של כל "
      + "עמוד כאן נסמך על רשומת החיפוש ולא על תגובת ה-HTTP. מעמד הטכניקה ב-SAP S/4HANA Cloud Public Edition "
      + "לא נקבע: חיפוש תחת SAP_S4HANA_CLOUD (הרשומות שהוחזרו נשאו versionId 2608.500 ו-2602.500) לא החזיר אף "
      + "רשומה הנוקבת ב-Business Transaction Events כטכניקת הרחבה, וזהו ממצא תחום בחיפוש ולא קביעה של "
      + "אי-זמינות. לא נרשם מספר הערת SAP או KBA כלשהו, משום שאף מקור שנקרא אינו נוקב במספר הנוגע לטכניקה. "
      + "הטרנזקציה FIBF אינה קיימת ב-lib/route-manifest.generated.ts ולכן tx:FIBF אינו מופיע כ-xref, אף שהוא "
      + "מצוטט מילה במילה בראיה השנייה; ה-xref ל-tx:MD01N נסמך על צירוף רשומת ה-What's New של MRP Live עם "
      + "רשומת MD01N במאגר, בעוד רשומת ה-What's New עצמה נוקבת ב-MRP Live ולא בקוד הטרנזקציה. הסטטוס הנגזר "
      + "שהאפליקציה הציגה לפני רשומה זו היה 'משתנה ב-S/4HANA', משום "
      + "ש-components/neo-shell/reference/enh-data.ts קורא ל-fromEccS4Block עם השדה s4 כ-changed, "
      + "ו-fromEccS4Block (lib/evidence/s4-status.ts) ממפה כל טקסט לא ריק בשדה s4 ל-changed; הסטטוס המחובר "
      + "מחליף אותו על בסיס המקורות הרשמיים לעיל. אימות SE18, SE19 או FIBF במערכת חיה לא בוצע: ה-MCP ל-ABAP "
      + "לא היה זמין. הרשומה אינה נושאת שדה reviewer, לפי המוסכמה בכל קבצי data/verification.",
  },
  {
    id: "enh:technique:user-exit",
    aliases: ["User Exit", "User Exits", "Application-Specific User Exits"],
    status: {
      status: "unchanged",
      he: "הטכניקה ממשיכה להופיע בתיעוד SAP לגרסת S/4HANA On-Premise 2025 FPS01: נושא 'Enhancements Using User "
        + "Exits (Document)' מתפרסם באותו loio גם תחת SAP ERP 6.0 EHP8 Latest וגם תחת S/4HANA 2025 FPS01 עם "
        + "אותו ניסוח, ותיעוד תכנון התחזוקה של 2025 FPS01 מציע user exit (CNEX0027) כאפשרות מימוש לצד BAdI. "
        + "הנושא הנושא את השם בגרסת 2025.001 הוא נושא של ניהול מסמכים (DMS) המתפרסם בשלושה ספרים (Document "
        + "Management, Change Management (LO-ECH), Order BOMs (PP-BD-BOM)), ולכן 'ללא שינוי' נאמר על המשך פרסום "
        + "התיעוד ולא על בדיקה בתחום תחזוקת מפעל או תעשיות תהליכיות. לא אותר עמוד SAP הקובע הסרה, הגבלה או "
        + "החלפה של הטכניקה ב-S/4HANA. הסטטוס 'ללא שינוי' נכתב במובן הצר: נושא התיעוד של הטכניקה נשמר בין ECC "
        + "ל-S/4HANA, ולא נבדקה כאן זמינותו של exit ספציפי בגרסה מותקנת. מה ש-SAP מתעדת תחת השם הזה שונה "
        + "מ-Customer Exit: לפי ספר ה-BC סוג ה-Application-Specific User Exits הוא Modification, בעוד על "
        + "Customer Exits נכתב באותו ספר 'They do not affect software updates'.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Enhancements Using User Exits (Document) | Order BOMs (PP-BD-BOM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af7b53c5551645ef806bdca5d990bac5/5fe6e4535dd4414de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "נושא התיעוד 'Enhancements Using User Exits (Document)' (loio 5fe6e4535dd4414de10000000a174cb4) מוחזר "
          + "בשירות החיפוש תחת SAP S/4HANA On-Premise גרסה 2025 FPS01 בספר 'Order BOMs (PP-BD-BOM)', בספר 'Change "
          + "Management (LO-ECH)' ובספר 'Document Management', וקובע: 'Unlike customer exits, you can use user "
          + "exits to access program parts and data objects in the standard system', 'In Customizing for Document "
          + "Management, you can use user exits to create enterprise-specific enhancements and extensions for "
          + "editing documents' ו-'You can also use them to enhance the standard SAP system with "
          + "enterprise-specific' (הסניפט נקטע כאן). אותו loio מוחזר גם תחת מוצר SAP ERP בתווית הגרסה '6.0 EHP8 "
          + "Latest' (versionId 6.18.latest), בספר 'Bill of Material (PP-BD-BOM)', עם אותו נוסח סניפט. גוף העמוד "
          + "לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      recommendedAction: "להתייחס ל-User Exit הקלאסי כמודיפיקציה: לפי ספר ה-BC סוג הטכניקה הוא Modification, ולכן קוד כזה נופל "
        + "למסלול התאמת המודיפיקציות בהמרה (SPDD במהלך ההמרה, SPAU ו-SPAU_ENH אחריה), כפי שנושא Custom Code "
        + "Adaptation שברשומת הראיה הרביעית קובע, ולא למסלול ההרחבות המנוהלות. את רשימת ה-User Exits של רכיב "
        + "היישום יש לאתר ב-SAP Reference IMG כפי שמורה עמוד ה-BC (ב-SD: Sales and Distribution ואז System "
        + "Modification ואז User exits). לפני שמייחסים הרחבה קיימת לטכניקה הזאת יש לאמת במערכת אם מדובר ב-User "
        + "Exit או בהרחבת SMOD המנוהלת בפרויקט CMOD, שכן שני הסיווגים מעורבבים בנתוני הפרויקט. בתחזוקת מפעל "
        + "ובתעשיות תהליכיות, כאשר התיעוד הנוכחי מציע לאותה הכרעה גם BAdI וגם user exit (למשל "
        + "DI_WPS_PLANT_STORLOC מול CNEX0027), לבחור לפי עמוד התיעוד של אותו אובייקט ולאמת ב-SE18 או ב-SE80 "
        + "לפני המימוש.",
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Application-Specific User Exits | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2b28ffa716c24348903f8ffbfeb81df8/bfec07a25db911d295ae0000e82de14a.html?locale=en-US&state=PRODUCTION&version=1709.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709.latest",
        accessedAt: DATE21,
        claim: "עמוד ה-BC 'Application-Specific User Exits' בספר 'Changing the SAP Standard (BC)' תחת מוצר SAP "
          + "S/4HANA On-Premise (גרסה 1709 Latest, loio bfec07a25db911d295ae0000e82de14a) מציג את הטכניקה בטבלת "
          + "מאפיינים שבה השדה 'Type (Behavior at Upgrade, Transport)' נושא את הערך 'Modification', ומגדיר: "
          + "'Description of Function User exits allow you to add additional functions to the SAP standard'. "
          + "באותה רשומה מופיעים גם 'Range (Validity) Throughout the entire system', 'Access in the System SAP "
          + "Reference IMG', 'User exits are primarily used in the sales and distribution component' וכן 'You can "
          + "find an overview of user exits as well as a description of those user exits that exist in SD in the "
          + "SAP Reference IMG under Sales and Distribution System Modification User exits'. גוף העמוד לא נקרא; "
          + "הטענה תחומה בכותרת ובסניפטים של שירות החיפוש הרשמי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements Using User Exits (Document) | Order BOMs (PP-BD-BOM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/af7b53c5551645ef806bdca5d990bac5/5fe6e4535dd4414de10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "נושא התיעוד 'Enhancements Using User Exits (Document)' (loio 5fe6e4535dd4414de10000000a174cb4) מוחזר "
          + "בשירות החיפוש תחת SAP S/4HANA On-Premise גרסה 2025 FPS01 בספר 'Order BOMs (PP-BD-BOM)', בספר 'Change "
          + "Management (LO-ECH)' ובספר 'Document Management', וקובע: 'Unlike customer exits, you can use user "
          + "exits to access program parts and data objects in the standard system', 'In Customizing for Document "
          + "Management, you can use user exits to create enterprise-specific enhancements and extensions for "
          + "editing documents' ו-'You can also use them to enhance the standard SAP system with "
          + "enterprise-specific' (הסניפט נקטע כאן). אותו loio מוחזר גם תחת מוצר SAP ERP בתווית הגרסה '6.0 EHP8 "
          + "Latest' (versionId 6.18.latest), בספר 'Bill of Material (PP-BD-BOM)', עם אותו נוסח סניפט. גוף העמוד "
          + "לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Creating a PM/CS Order Referencing a Central Task List | Maintenance Planning (CS-AG/PM-PRM-MP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/f271ed1433b148248e4637d2fb7ee2aa.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד תכנון התחזוקה 'Creating a PM/CS Order Referencing a Central Task List' (ספר Maintenance "
          + "Planning (CS-AG/PM-PRM-MP), SAP S/4HANA On-Premise 2025 FPS01, loio "
          + "f271ed1433b148248e4637d2fb7ee2aa) מוחזר בשירות החיפוש עם הכותרת 'User Exit CNEX0027' ועם המשפטים "
          + "'You can use the user exit CNEX0027 to perform a plant determination or a storage location "
          + "determination for a component' ו-'Determination of Plant and Storage Location for Components in Task "
          + "Lists You can use the Business Add-In (BAdI) DI_WPS_PLANT_STORLOC or the user exit CNEX0027 to "
          + "implement your own customer-specific logic' (הסניפט ממשיך ב-'Note The BAdI DI_WPS_PLANT_STORLOC is' "
          + "ונקטע שם). הטענה התחומה: בתיעוד תחזוקת המפעל של גרסת 2025 FPS01 מוצע user exit כאפשרות מימוש לצד "
          + "BAdI. בסניפטים שהוחזרו לא הופיע סיווג של CNEX0027 כ-Modification ולא הפניה ל-SMOD או ל-CMOD, אך גוף "
          + "העמוד לא נקרא ולכן אין כאן קביעה על תוכנו המלא. שני עמודים נוספים באותה גרסה ובאותו ספר מצמידים את "
          + "אותו user exit ל-BAdI: 'Storage Location Determination for Components' (loio "
          + "95139a0602af4c26a3e4a5a6a782356a) חוזר על הזיווג עם DI_WPS_PLANT_STORLOC ('You can implement the "
          + "BAdI DI_WPS_PLANT_STORLOC or the user exit CNEX0027 to find a storage location according to your own "
          + "logic'), ואילו 'Changing the Maintenance Location for an Existing PM/CS Order' (loio "
          + "9da79ba177fa4a25beb8fbd30005bcd9) מצמיד אותו ל-BAdI אחר: 'You can use the Business Add-In (BAdI) "
          + "CHANGE_PLANT_STORLOC or the user exit CNEX0027 to define how the system determines the valid plant "
          + "and storage location for the components indicated in the task list'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Custom Code Adaptation | Conversion Guide for SAP S/4HANA 1709",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/1a8702ed544f46be9b339b44d4580b6b/5e291b03aba1415abc57d302896b950a.html?locale=en-US&state=PRODUCTION&version=1709.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709.latest",
        accessedAt: DATE21,
        claim: "נושא 'Custom Code Adaptation' בספר 'Conversion Guide for SAP S/4HANA 1709' (loio "
          + "5e291b03aba1415abc57d302896b950a) קובע: 'You need to adapt any modifications and enhancements using "
          + "the standard transactions SPDD, SPAU and SPAU_ENH' ו-'Custom Code Adaptation After the Software "
          + "Update Manager (SUM) has done the technical conversion, you can start adapting your custom code'. "
          + "זהו המקור התחום להמלצת ההמרה שברשומה. שאילתה מסוננת לגרסה 2025.001 לא החזירה נושא מקביל, ולכן המקור "
          + "נרשם בגרסה 1709 Latest כפי שהוא. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "נתוני הפרויקט: גיליון Custom Code של חוברת PM מול קטלוג ההרחבות בשם ורשומות המושגים (סיווג סותר)",
        product: "SAP ERP (ECC) / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "בתוך המאגר אותם אובייקטים מסווגים בשתי דרכים. גיליון ה-Custom Code שנגזר מחוברת ההגירה של תחזוקת "
          + "מפעל מסווג 27 שורות כ-'User Exit'; עשרה מהשמות האלה מופיעים גם בקטלוג ההרחבות בשם, וכולם מסווגים שם "
          + "'Customer Exit': ITOB0001, IEQM0001, PCSD0002, IMRC0001, QQMA0001, QQMA0014, IWO10009, IWO10012, "
          + "IWO10018 ו-IPRM0001. בקטלוג עצמו יש 20 רשומות Customer Exit, 8 רשומות BAdI ורשומה אחת Enhancement "
          + "Spot, ואפס רשומות מסוג 'User Exit', אף שהטיפוס ExitKind מגדיר את הערך וכותרת הקובץ היא 'User Exit / "
          + "BAdI Center'. בנוסף, רשומת המושג user-exit מביאה 'EXIT_SAPL*' כדוגמה ל-User Exit, אף שמוסכמת השמות "
          + "EXIT_ שייכת ל-Function Module Exits של Customer Exits לפי עמודי ה-BC, ורשומת הטכניקה מפנה לאימות "
          + "ב-SMOD, שהיא טרנזקציית הרחבות ה-Customer Exit. המשפט 'נתמך אך לא מומלץ — Clean Core מעדיף "
          + "BAdI/Extension Point' שברשומת הטכניקה לא נמצא באף עמוד SAP שאותר בסבב הזה.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/sapData.pm.ts#customCode · data/exits.ts · data/concepts.ts#user-exit · data/enhancements.ts#user-exit",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Enhancements to the SAP Standard with Customer Exits | Changing the SAP Standard (BC)",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2b28ffa716c24348903f8ffbfeb81df8/c81975d943b111d1896f0000e8322d00.html?locale=en-US&state=PRODUCTION&version=1709.latest",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "1709.latest",
            accessedAt: DATE21,
            claim: "באותו ספר BC, העמוד 'Enhancements to the SAP Standard with Customer Exits' (loio "
              + "c81975d943b111d1896f0000e8322d00) מתאר מנגנון אחר: 'SAP creates customer exits for specific "
              + "programs, screens, and menus within standard applications. These exits do not contain any "
              + "functionality. Instead, the customer exits act as hooks', 'You can hang your own add-on "
              + "functionality onto these hooks', 'Customer exits are not available for all programs and screens "
              + "found in the SAP System. You can only use customer exits if they already exist in the SAP System' "
              + "ו-'They do not affect software updates'. ההפרש מול רשומת ה-User Exit באותו ספר, שסוגה "
              + "'Modification', הוא הבסיס לסתירה מול סיווגי המאגר. גוף העמוד לא נקרא.",
            verificationLevel: "sap_official_verified",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility | Extend and Integrate Your SAP S/4HANA Cloud Public Edition",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/0f69f8fb28ac4bf48d2b57b9637e81fa/533228e1e854433ab16d013f161ca509.html?locale=en-US&state=PRODUCTION&version=2608.500",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        accessedAt: DATE24,
        claim: "עמוד ה-Extensibility (loio 533228e1e854433ab16d013f161ca509, גרסה 2608 Latest): טקסט גוף העמוד נקרא "
          + "באמצעות sap-help-body.mjs (התרשים האינטראקטיבי שבעמוד לא נקרא) וקובע: 'Extensibility in SAP S/4HANA "
          + "Cloud Public Edition consists of the following options: Key User Extensibility through built-in "
          + "capabilities, Developer Extensibility through the SAP S/4HANA Cloud ABAP Environment, Side-by-Side "
          + "Extensibility through SAP BTP'. הטבלה המשווה בעמוד מפרטת 'Released object types' לכל אפשרות: 'BAdIs, CDS "
          + "views' עבור Key User Extensibility, ו-'BAdIs, classes, interfaces, CDS views, behavior definitions, "
          + "authorization objects' עבור Developer Extensibility; Side-by-Side נשען על 'BAPIs, IDocs, OData APIs, "
          + "SOAP APIs, events'. העמוד קובע גם ש-'SAP software updates don't depend on extensions from customers or "
          + "partners' וש-'extensions in the SAP S/4HANA Cloud Public Edition core don't affect upgrades, they're "
          + "upgrade-proof'. טקסט גוף העמוד שנקרא אינו נוקב במילים 'User Exit', 'Customer Exit', 'SMOD' או 'CMOD', לא "
          + "בטבלת האובייקטים המשוחררים ולא בטקסט הרץ; זהו ממצא תחום בהיקף הטקסט שנקרא, ואינו קביעה של SAP על "
          + "אי-זמינות הטכניקה הקלאסית ב-Public Cloud Edition.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:technique:classic-badi",
      "enh:technique:key-user-extensibility",
      "enh:technique:vofm",
      "enh:exit:ITOB0001",
      "enh:exit:IEQM0001",
      "tx:SE38",
      "tx:SE80",
      "tx:SPDD",
      "tx:SPAU",
    ],
    lastVerifiedAt: DATE24,
    notes: "שיטה (2026-09-21): שאילתות חוזרות ב-scripts/sap-help-search.mjs מול המוצרים SAP_S4HANA_ON-PREMISE "
      + "ו-SAP_ERP, ובהן שאילתות מסוננות לגרסה 2025.001, חיפוש רשת אחד מוגבל ל-help.sap.com, ומסמך PDF רשמי "
      + "אחד שהורד ונסרק: 'Custom Code Migration Guide for SAP S/4HANA 2025 Feature Package Stack 01' (How-to "
      + "Guide, PUBLIC, 2026-02-25). הסעיף 'Running Transactions SPDD, SPAU, and SPAU_ENH' (עמוד 63 לפי תוכן "
      + "העניינים) נקרא ככתבו: 'SAP provides the adjustment tools SPDD, SPAU, and SPAU_ENH, which enable you "
      + "to reimplement any modifications related to ABAP Dictionary objects and development objects (such as "
      + "programs, function modules, screens, interfaces, and documentation) in system upgrades', והוא מפנה "
      + "את הקורא ל-Product Assistance של S/4HANA On-Premise בנתיב שמסתיים ב-'Changing the SAP Standard (BC)' "
      + "וכן לפתק SAP שמספרו 2168190, כפי שהוא מופיע באותו סעיף של המדריך. הפתק עצמו לא נפתח (נדרשת הזדהות "
      + "S-user), ולכן מספרו נרשם בהערות בלבד ולא כשדה sapNote. המדריך אינו מצוטט כרשומת ראיה משום שלא נרשמה "
      + "לו כתובת קבועה מותרת; במקומו נוספה רשומת ראיה רביעית, נושא 'Custom Code Adaptation' מתוך Conversion "
      + "Guide for SAP S/4HANA 1709, שנושא את אותו משפט על SPDD, SPAU ו-SPAU_ENH ושכתובתו ב-help.sap.com "
      + "נבדקה. מה שאומת: השם ש-SAP משתמשת בו לטכניקה ('Application-Specific User Exits'), סיווגה "
      + "כ-Modification, מקום הגישה (SAP Reference IMG), מוקד השימוש ב-SD, ההבחנה המפורשת מול Customer Exits "
      + "בשתי גרסאות (1709 Latest ו-2025 FPS01), והמשך התיעוד של הטכניקה בגרסת 2025 FPS01 בתחום תחזוקת המפעל. "
      + "מה שלא אומת: שמות של User Exits קלאסיים בתעשיות תהליכיות (אף שאילתה לא החזירה עמוד PP-PI הנוקב בשם "
      + "user exit קלאסי, וממצא זה תחום בשאילתות שהורצו ואינו טענת אי-קיום); רשימת ה-includes מסוג MV או "
      + "SAPMV שברשומת המאגר; הדרישה ל-Access Key; מעמדה של הטכניקה ב-S/4HANA Cloud Public Edition; ותוכנו של "
      + "הפתק 2168190. הערת גרסה והיקף: ספר 'Changing the SAP Standard (BC)' מוחזר תחת מוצר S/4HANA "
      + "On-Premise בגרסה 1709 Latest בלבד, ולא נמצאה לו גרסה 2025.001 בשאילתה המסוננת; מנגד מדריך Custom "
      + "Code Migration של 2025 FPS01 עדיין מפנה אליו, ולכן צוטט כפי שהוא. הנושא היחיד הנושא את השם 'User "
      + "Exits' שאותר בגרסת 2025.001 הוא נושא של ניהול מסמכים (DMS) המתפרסם בשלושה ספרים, ולכן הסטטוס 'ללא "
      + "שינוי' מתייחס להמשך פרסום התיעוד של הטכניקה ולא לבדיקה בתחום תחזוקת מפעל או תעשיות תהליכיות. סתירה "
      + "פתוחה: הסיווג הכפול של אותם אובייקטים בין גיליון ה-Custom Code של חוברת PM (27 שורות 'User Exit') "
      + "לבין קטלוג ההרחבות בשם (עשרה שמות חופפים, כולם 'Customer Exit'), יחד עם הדוגמה 'EXIT_SAPL*' וההפניה "
      + "ל-SMOD ברשומות המושג והטכניקה. הסתירה נרשמה כרשומת ראיה מסוג repository ברמת 'מקורות סותרים', והיא "
      + "מושכת את רמת הרשומה כולה לשם. ראוי לציין ש-SAP עצמה משתמשת במונח 'user exit' באופן רחב בעמודי תחזוקת "
      + "מפעל של 2025 FPS01 (CNEX0027), ולכן הערבוב במאגר משקף גם שימוש רופף במקור; ספר ה-BC, לעומת זאת, "
      + "מבחין בין שני המנגנונים במפורש. הפער הנגזר: הסטטוס שהאפליקציה מציגה היום לרשומה זו הוא 'משתנה "
      + "ב-S/4HANA', שנגזר על ידי fromEccS4Block מזוג המשפטים ecc/s4 ברשומת הטכניקה; המשפט 'נתמך אך לא מומלץ "
      + "— Clean Core מעדיף BAdI/Extension Point' אינו נתמך במקור SAP שאותר, ולכן הסטטוס המחובר כאן שונה "
      + "ממנו. הערת קטלוג נוספת: קטלוג ההרחבות בשם אינו מכיל אף רשומה מסוג 'User Exit', ולכן דף הטכניקה מציג "
      + "אפס הרחבות בשם משויכות. הרשומה אינה נושאת שדה reviewer, בהתאם למוסכמה בכל קבצי data/verification/**. "
      + "ה-MCP ל-ABAP לא היה זמין בסשן; בדיקת SMOD, SE38, SE18 או SPAU במערכת חיה לא בוצעה."
      + " עדכון (2026-09-24, העמקה, ניסיון להגיע לעומק 4): נוספו 4 חיפושים נוספים ב-scripts/sap-help-search.mjs "
      + "('user exits S/4HANA Cloud extensibility' ללא סינון מוצר, 'classic extensibility BAdI user exit SAP "
      + "S/4HANA Cloud Public Edition' עם --product SAP_S4HANA_CLOUD, 'SMOD CMOD user exit restricted objects "
      + "extensibility' ו-'restricted development objects classic ABAP' עם --product SAP_S4HANA_CLOUD; בכל חיפוש "
      + "הוחזרו 21 רשומות, ואף אחת מהן אינה נוקבת ב-User Exit, SMOD או CMOD בכותרת או בסניפט), וקריאת טקסט הגוף "
      + "של עמוד 'Extensibility' תחת Extend and Integrate Your SAP S/4HANA Cloud Public Edition (2608 Latest) עם "
      + "scripts/sap-help-body.mjs; התרשים האינטראקטיבי שבעמוד לא נקרא. מה שאומת: שלוש אפשרויות ההרחבה של Public "
      + "Cloud Edition (Key User, Developer, Side-by-Side) וטיפוסי האובייקטים המשוחררים לכל אחת; הטקסט שנקרא אינו "
      + "כולל User Exit, SMOD או CMOD ברשימה. מה שלא אומת: קביעה רשמית מפורשת לפיה הטכניקה הקלאסית חסומה, מוגבלת "
      + "או בלתי זמינה ב-Public Cloud (העדרה מהטבלה הוא ממצא תחום, לא קביעת SAP); מעמד הטכניקה ב-Private Cloud "
      + "Edition; וחלופת Clean Core בשם עבור Application-Specific User Exits ספציפית. לכן לא נוסף status חדש ולא "
      + "הורחב recommendedAction; הסתירה הקיימת מול קטלוג ההרחבות בשם (repository, conflicting_sources) לא נפתרה. "
      + "ה-MCP ל-ABAP לא היה זמין; בדיקה במערכת SAP חיה לא בוצעה גם בסבב הזה.",
  },
  {
    id: "enh:exit:CONFPP01",
    aliases: ["EXIT_SAPLCORF_101"],
    status: {
      status: "verification_required",
      he: "אף עמוד רשמי של SAP S/4HANA On-Premise או של SAP ERP שאותר אינו נוקב בשם ההרחבה CONFPP01 או במודול EXIT_SAPLCORF_101. המסמך הרשמי היחיד שנמצא, נקרא ונוקב בשמם הוא מדריך היישום של SAP לחיבור מקורות נתונים חיצוניים ל-SAP Business Suite‏ (Plant Connectivity 15.0, 2014), והוא מתאר תרחיש דוגמה אחד: קריאת נתוני מכונה חיצוניים לשדות האישור בטרנזקציה CO11N, כאשר לפי המדריך קוד ה-user exit מעובד בעת לחיצה על הלחצן Propose actual data. המדריך אינו מונה את כלל רכיבי ה-Function Exit של ההרחבה, אינו מגדיר את תחולתה ואינו שולל שימושים אחרים בה. לכן מעמד ההרחבה ב-S/4HANA, וכן תיאור המאגר שלפיו היא משמשת לבדיקות באישור לפני רישום, נשארים ללא אימות עד בדיקה ב-SMOD וב-CMOD במערכת היעד.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction: "לאמת במערכת היעד לפני ההסבה: ב-SMOD את קיום ההרחבה CONFPP01 ואת רשימת רכיבי ה-Function Exit שלה, ב-SE37 את ממשק EXIT_SAPLCORF_101 ואת ה-include שבו נכתב הקוד (מדריך ה-PCo נוקב בשני שמות שונים, ZXCOFU06 בפסקת היישום ו-ZXCOFU11 בצעד 5 ובכותרת הקוד לדוגמה), וב-CMOD את הפרויקט הפעיל. לסרוק ב-ATC וב-SCMON את השימוש בפועל. את תיאור הקטלוג כבדיקת קלט החוסמת שמירה יש להשאיר מסומן כלא מאומת עד שתיעוד ההרחבה ב-SMOD במערכת יאשר זאת: התיעוד לגרסת 2025 FPS01 נוקב בפעילות Customizing בשם Customer Specific Input Checks When Saving תחת Enhancements in Order Confirmation, ומביא אותה בהקשר של CONFPP05 ושל EXIT_SAPLCORF_105. למסלול הרחבה מתועד ב-S/4HANA לאישור הזמנת ייצור אפשר לבחון את הרחבת שירות ה-OData‏ API_PROD_ORDER_CONFIRMATION_2_SRV בשדות לקוח דרך אפליקציית Custom Fields (הקשר עסקי PP_ORDER_CONFIRMATION), בלי לרשום אותו כמחליף כל עוד אין מקור רשמי הקובע החלפה."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Implementation Guide for the Connection of External Data Sources to SAP Business Suite Applications, Plant Connectivity 15.0 (PDF)",
        url: "https://help.sap.com/doc/60061f3f73f1400292090f713729563b/15.3.0/en-US/PCO15_BS_IMPL_G_FINAL.pdf",
        product: "SAP Plant Connectivity 15.0 / SAP Business Suite",
        edition: "ecc",
        release: "PCo 15.0, Version 1.0 (April 2014)",
        accessedAt: DATE21,
        claim: "המסמך הורד (HTTP 200, ‏1,146,306 בתים) וחולץ לטקסט; הציטוטים לקוחים מעמודים 19 ו-20 מתוך 34, ועמוד 19 הוא העמוד היחיד שבו מופיעים השמות CONFPP01 ו-EXIT_SAPLCORF_101. תחת הכותרת 'Default values for order confirmation' מתאר המדריך תרחיש דוגמה: 'In this scenario, production progress of a discrete manufacturing facility is monitored via confirmations. For this, the user creates a time ticket confirmation in transaction CO11N. After pressing the pushbutton Propose actual data, the input fields are prefilled with the corresponding data of the operation.' בסעיף היישום: 'A suitable coding section for the implementation of the corresponding PCo query would be the Include ZXCOFU06, which belongs to the user exit CONFPP01. The coding of the user exit is processed when the user presses the pushbutton Propose actual data.' צעדי היישום באותו עמוד: '1. Start transaction CMOD and create a new project. 2. Assign the enhancement CONFPP01. 3. Switch to the component view and position the cursor on the entry EXIT_SAPLCORF_101 of the function module exit', ובצעד 5: 'Create the implementation for the user exit by putting the cursor on ZXCOFU11 and double-clicking it' (כותרת הקוד לדוגמה, בעמוד 20: 'Include ZXCOFU11'). כלומר המדריך משייך את EXIT_SAPLCORF_101 להרחבה CONFPP01, ונוקב בשני שמות include שונים לאותו יישום. המדריך אינו מונה רכיבי Function Exit נוספים של ההרחבה, אינו מגדיר את תחולתה ואינו מזכיר הזמנות תהליך או את הטרנזקציה COR6N. שער המסמך נושא 'Plant Connectivity 15.0' ו-'Implementation Guide for SAP Business Suite Integration with PCo Rel. 15.0, Version 1.0', סעיף 'Version overview' בעמוד 6 נוקב ב-'Version 1.0 (April 2014)' והעמוד השני נושא '© Copyright 2014 SAP AG', בעוד מקטע הגרסה בכתובת הוא 15.3.0; אותו קובץ בדיוק (אותו md5) מוגש גם תחת מקטע הגרסה 15.5.0 בכתובת https://help.sap.com/doc/3520c88dce6b44a6a8bf01d3a92e42c4/15.5.0/en-US/PCO15_BS_IMPL_G_FINAL.pdf.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Preparation and Customizing | Workflow",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/0f18dddf28764f5b807ecd80549044cc/cc6cb6531de6b64ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש של help.sap.com לנושא 'Preparation and Customizing' (deliverable: Workflow, SAP S/4HANA 2025 FPS01, ‏loio cc6cb6531de6b64ce10000000a174cb4, תאריך 2026-02-24) הוחזרה במספר שאילתות נפרדות במוצר SAP_S4HANA_ON-PREMISE, ובסניפטים שלה (הנחתכים לפי השאילתה) מופיעים המקטעים הבאים כלשונם: 'System Modifications → Enhancements in Order Confirmation → Customer Specific Input Checks When Saving'; 'Then program and activate the function module exit EXIT_SAPLCORF_105 (customer enhancement CONFPP05).'; 'Further information on the function module exit EXIT_SAPLCORF_105 is available in Customizing under Production → Shop Floor Control → Workflows → Variances in Confirmations or Production → Shop Floor Control ...' (הסניפט נקטע שם). מכאן ששני דברים מתועדים בגרסת 2025 FPS01: צומת ה-Customizing‏ 'Enhancements in Order Confirmation' עצמו, והפעילות 'Customer Specific Input Checks When Saving' שהסניפט מביא בהקשר של CONFPP05 ושל EXIT_SAPLCORF_105. הסניפט אינו מונה את שאר הפעילויות תחת אותו צומת, אינו מזכיר את CONFPP01 ואינו אומר דבר על תחולתה. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Extensibility: Production Order Confirmation | APIs for Manufacturing",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/a6f0333202384ba2b48a841a4a6deb1b/5545b66fed454b2ab591e54921110c04.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש לנושא 'Extensibility: Production Order Confirmation' (deliverable: APIs for Manufacturing, SAP S/4HANA 2025 FPS01, ‏loio 5545b66fed454b2ab591e54921110c04, תאריך 2026-02-24) קובעת: 'You can extend the OData Service API_PROD_ORDER_CONFIRMATION_2_SRV according to your business needs'; 'Features Key users can extend the OData Service in the Custom Fields app using the following business context: Manufacturing: Order Confirmation (PP_ORDER_CONFIRMATION)'; ולגבי הנתונים: 'your custom fields for the data source Production Order Confirmation in the OData APIs section of the Custom Fields app and publish them'. הסניפט מתאר הרחבת שדות לקוח לשירות ה-OData בלבד: הוא אינו מזכיר את CONFPP01, אינו נוקב בהרחבת SMOD כלשהי ואינו קובע החלפה של הרחבת לקוח. הוא מובא כהקשר למסלול ההרחבה המתועד באישור הזמנת ייצור ב-2025 FPS01, לא כיורש. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת CONFPP01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת המאגר מתארת את CONFPP01 כ'בדיקות באישור ייצור': מטרה 'ולידציה/לוגיקה באישור פעולת ייצור/תהליך', טריגר 'בעת אישור (CO11N/COR6N), לפני רישום', אובייקט 'Enhancement CONFPP01 · EXIT_SAPLCORF_101', טרנזקציות CO11N, COR6N ו-CMOD, דוגמה 'חסימת אישור כמות תוצר החורגת מ-110% מכמות הפקודה', ובבלוק ECC מול S/4HANA: 'נתמך.' ו-'Clean Core → BAdI WORKORDER_CONFIRM.'. צמד השמות CONFPP01 ו-EXIT_SAPLCORF_101 נתמך במדריך ה-PCo שנקרא. שלושה חלקים אחרים ברשומה לא אותרו באף מקור רשמי שנבדק: התיאור כבדיקת ולידציה לפני רישום, השיוך להזמנות תהליך ולטרנזקציה COR6N, וההפניה ל-BAdI WORKORDER_CONFIRM כיעד Clean Core (שם שאינו מופיע באף עמוד רשמי של S/4HANA, כפי שמתועד ברשומת enh:badi:WORKORDER_CONFIRM). זהו פער אימות ולא הפרכה: המקורות שנמצאו אינם מונים את תחולת ההרחבה ואינם שוללים את השימושים האלה.",
        verificationLevel: "verification_required",
        repoRef: "data/exits.ts#CONFPP01"
      }
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:exit:CONFPP05",
      "enh:exit:CONFPM01",
      "enh:exit:PPCO0001",
      "enh:badi:WORKORDER_CONFIRM",
      "tx:CO11N",
      "tx:CMOD",
      "tx:SMOD",
      "table:AFRU",
      "table:AFKO",
      "cds:I_ProductionOrderConfirmation"
    ],
    lastVerifiedAt: DATE21,
    notes: "מה אומת בפועל: השיוך CONFPP01 ↔ EXIT_SAPLCORF_101 מופיע במסמך רשמי של SAP שנקרא (מדריך היישום של Plant Connectivity 15.0, עמוד 19 מתוך 34), יחד עם צעדי ההפעלה ב-CMOD ועם תרחיש הדוגמה שבו קוד ה-Exit מעובד בלחיצה על Propose actual data בטרנזקציה CO11N. אותו מדריך נוקב בשני שמות include שונים לאותו יישום, ZXCOFU06 בפסקת היישום (עמוד 19) ו-ZXCOFU11 בצעד 5 (עמוד 19) ובכותרת הקוד לדוגמה (עמוד 20); אי-ההתאמה היא בתוך המקור עצמו ולא הוכרעה כאן. מה שלא אומת: תיאור המאגר שלפיו ההרחבה משמשת לוולידציה החוסמת רישום, השיוך להזמנות תהליך ול-COR6N, ויעד ה-Clean Core‏ BAdI WORKORDER_CONFIRM. הבדיקה השלילית שבוצעה, ורק היא: שירות החיפוש של SAP Help נשאל בשלושה מוצרים (SAP_S4HANA_ON-PREMISE, SAP_ERP, SAP_S4HANA_CLOUD) בשלוש שאילתות ('CONFPP01', 'EXIT_SAPLCORF_101', ושאילתה משולבת עם production order confirmation), תשעה צירופים בסך הכול, ובאף אחת מ-138 הרשומות שהוחזרו (בין 2 ל-21 לצירוף) לא הופיעה המחרוזת CONFPP01 או SAPLCORF_101 בכותרת או בסניפט; WebSearch מוגבל ל-help.sap.com, api.sap.com, fioriappslibrary ו-fal לא החזיר עמוד S/4HANA הנוקב בשם; רשימת הפישוט SIMPL_OP2025.pdf ומסמך What's New לגרסת 2025 FPS01 (Document Version 1.0, ‏2026-02-25) חולצו לטקסט ואינם מכילים את המחרוזות CONFPP01, ‏SAPLCORF_101, ‏CONFPP או CONFPM אף לא פעם אחת. אין מכך מסקנה על מה שאין בו מקור: היעדר אזכור אינו הסרה, ובדיקת SMOD במערכת חיה לא בוצעה (חיבור ה-MCP ל-ABAP נכשל בפתיחת ההפעלה). הרחבות אחיות שכן מתועדות: CONFPP05 עם EXIT_SAPLCORF_105 בשלושה עמודי Workflow ב-2025 FPS01 (רשומת enh:exit:CONFPP05 בקובץ זה), ו-CONFPP07 להגדרת מסכים משלך. העמוד 'Entering Confirmations' (deliverable Production Orders (PP-SFC), ‏loio fe03b753128eb44ce10000000a174cb4) נקרא במלואו בעיבוד הסטטי שלו בכתובת https://help.sap.com/doc/7205b753128eb44ce10000000a174cb4/1610%20002/en-US/fe03b753128eb44ce10000000a174cb4.html ‏(HTTP 200, ‏17,755 בתים; מטא-נתוני העמוד: product 'SAP S/4HANA', version '1610 FPS02 (May 2017)'): הוא מתאר את ערוצי הזנת האישור (time ticket, ‏progress, אירוע זמן, רמת כותרת, התייחסות לאישור קיים, Collective Entry, ‏Fast Entry עם 'The system only executes limited checks' ועדכון בתוכנית CORUPROC1, ו-Single Screen Entry), וההרחבה היחידה שהוא נוקב בשמה היא CONFPP07: 'If the predefined screens are not sufficient, you can define your own screens in the customer enhancement CONFPP07'; השמות CONFPP01 ו-EXIT_SAPLCORF_101 אינם מופיעים בו. אותו loio מוחזר בשירות החיפוש גם לגרסת 2025 FPS01 עם אותו משפט על CONFPP07 בסניפט (https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/fe03b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001), אך גוף הגרסה ההיא לא נקרא. הטרנזקציה COR6N לא נכללה ב-xrefs מאותה סיבה שבה לא נכללה ברשומת CONFPP05: אין מקור רשמי המשייך את ההרחבה להזמנות תהליך. לא נרשם xref ל-Fiori: קטלוג האפליקציות של הפרויקט מכיל את F2730 ‏(Confirm Jobs, ‏PM) ואת F3364 ‏(Confirm Process Order, ‏PP-PI) ואין בו אפליקציית אישור להזמנת ייצור. הרשומה אינה נושאת שדה reviewer: אף רשומה ב-data/verification/** אינה נושאת אותו. הסטטוס נכתב ידנית כ-verification_required כדי שלא ייגזר מבלוק ה-ECC מול S/4HANA שבמאגר פסק דין שהתיעוד אינו תומך בו, לצד פיל אימות רשמי. המצב שנמדד לפני הרשומה, בהרצת fromEccS4Block ו-evidenceBlock על data/exits.ts#CONFPP01: הבלוק מכיל גם unchanged ‏('נתמך.') וגם changed ‏('Clean Core → BAdI WORKORDER_CONFIRM.'), ה-changed מנצח במפה, והאפליקציה הציגה 'משתנה ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', needsVerification=false, עומק L1. עם הרשומה הזו הסטטוס הופך ל'נדרש אימות נוסף' עם needsVerification=true, בעוד רמת הראיות עולה ל'מאומת מול תיעוד SAP רשמי' על סמך שלוש הראיות הרשמיות. גרסה קודמת של רשומה זו נפסלה בביקורת של מנה 2 משום שייחסה למדריך ה-PCo קביעה בלעדית ('ערכי ברירת מחדל ולא בדיקות קלט') שאינה מופיעה בו; הנוסח הנוכחי מביא רק את מה שהמדריך אומר."
  },
  {
    id: "enh:exit:PPCO0021",
    status: {
      status: "verification_required",
      he: "אף רשומה רשמית בשירות החיפוש של help.sap.com אינה נוקבת בשם PPCO0021 בכותרת או בסניפט, לא תחת SAP S/4HANA On-Premise, לא תחת SAP ERP 6.0 EHP8 ולא תחת SAP S/4HANA Cloud Public Edition; גם רשימת הפישוט לגרסת 2025 FPS01, שחולצה כטקסט מלא, אינה מכילה אף מופע של הרצף 'PPCO'. לכן אי אפשר לקבוע מתיעוד ציבורי אם ההרחבה קיימת ב-S/4HANA, מה בדיוק היא עושה ומה ממשקה, והסטטוס נשאר לאימות. הסטטוס שהאפליקציה גזרה עד כה, 'משתנה ב-S/4HANA', מקורו בהערת השינוי 'העדף BAdI WORKORDER_GOODSMVT' שבבלוק ECC מול S/4HANA של data/exits.ts; אותה רשומה מסומנת שם inferred, ולא נמצא מקור רשמי התומך בהמלצה הזו או מציג את WORKORDER_GOODSMVT כיורש של PPCO0021.",
      edition: "on-premise",
      release: null,
      source: {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת PPCO0021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת המאגר מתארת את PPCO0021 כ-Customer Exit במודול PP בשם 'בדיקת רכיבי פקודה': ולידציה או התאמה של רכיבי הפקודה (Components/Reservations), טריגר 'בעיבוד רכיבים בפקודה', שדה object 'Enhancement PPCO0021' ללא שם מודול פונקציה, הטרנזקציות CO02 ו-COR2, דוגמה של אכיפת אצווה ספציפית לרכיב רגיש בפקודת תהליך, ובבלוק ECC מול S/4HANA: 'נתמך.' ו-'העדף BAdI WORKORDER_GOODSMVT.'. הרשומה מסומנת inferred. רשומות נגזרות במאגר מנסחות זאת אחרת: data/workbenches-ext.ts כותב 'Exit בעת יצירת רכיבי הזמנה / חישוב מחדש של RESB', data/domain-detail.ts שורה 369 מקצר ל-'PPCO0021 (רכיבים)', ו-data/troubleshooting-ext2.ts מפנה אליו בתרחיש 'פיצוץ BOM ללא רכיבים בפקודה'. data/transactions.ts מונה אותו בין ההרחבות של CO01 לצד PPCO0001 ו-PPCO0007. כל אלה הם רובד המאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#PPCO0021; data/workbenches-ext.ts#PPCO0021; data/domain-detail.ts:369"
      },
      recommendedAction: "לאמת במערכת S/4HANA היעד ב-SMOD את קיום ההרחבה PPCO0021, את הטקסט הקצר שלה, את רכיביה (מודולי EXIT_, מסכים או includes) ואת נקודת ההפעלה, ובשאילתת CMOD אם היא משויכת לפרויקט פעיל לאחר ההמרה; אין להסתמך על תיאור המאגר לפרמטרים או להיקף. לפיתוח חדש בכיוון Clean Core כדאי לבחון תחילה את שני ה-BAdIs שכן מתועדים רשמית ב-S/4HANA: WORKORDER_UPDATE, שלפי What's New לגרסת 2022 SPS03 משמש לעיבוד המשך או למניעה של שינויים בפקודות ושנוספה לו המתודה COMP_RQMT_DATE_TIME_SET (לפי רשומת ה-PEO של What's New 2023: Change Component Requirement Date and Time from Scheduling, תחת צומת ה-Customizing 'BAdI: Order Change'), ו-WORKORDER_GOODSMVT לתנועות הסחורה של הפקודה (ראו רשומת enh:badi:WORKORDER_GOODSMVT). אף מקור רשמי אינו מציג אחד מהם כיורש של PPCO0021, ולכן לא נרשם successor. בבדיקות QA לאחר ההמרה להריץ את תרחישי הרכיבים בפקודת ייצור (CO02) ובפקודת תהליך בתעשיות תהליכיות (COR2), ולוודא שהלוגיקה הקיימת עדיין נורית ושרזרבציות RESB נוצרות ומתעדכנות כמצופה."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI for Further Processing Changes to Orders | What's New in SAP S/4HANA 2022 SPS03",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/86956eb2f92146db85b12838f4affeb8.html?locale=en-US&state=PRODUCTION&version=2022.003",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.003",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית (title 'BAdI for Further Processing Changes to Orders', deliverable 'What's New in SAP S/4HANA 2022 SPS03', loio 86956eb2f92146db85b12838f4affeb8, גרסה 2022 SPS03 (Nov 2023), תאריך פרסום 2023-11-15) נושאת בסניפט: 'The Business Add-In WORKORDER_UPDATE, which you can use to further process or prohibit changes to orders, has been enhanced with a new method COMP_RQMT_DATE_TIME_SET'. זהו המקור הרשמי שנוקב בשם ה-BAdI ובשם המתודה גם יחד. הרשומה אינה מזכירה את PPCO0021 ואינה קובעת יחס כלשהו בין ה-BAdI לבין הרחבת הלקוח. גוף העמוד לא נקרא (help.sap.com מגיש מעטפת JavaScript); הציטוט מסניפט שירות החיפוש בלבד.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customizing Activities and Business Add-Ins for PEO | What's New in SAP S/4HANA 2023",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/d1d5db5f2df54e78a956b573e1d3327a.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית (title 'Customizing Activities and Business Add-Ins for PEO', deliverable 'What's New in SAP S/4HANA 2023', loio d1d5db5f2df54e78a956b573e1d3327a, גרסה 2023 (Oct 2023), תאריך פרסום 2024-10-08) נושאת בסניפט: 'Production Shop Floor Control System Modifications Business Add-Ins BAdI: Order Change You can use the new method COMP_RQMT_DATE_TIME_SET (Change Component Requirement Date and Time from Scheduling' (הסניפט נקטע כאן), וכן 'Configuration Changed n/a PP-PEO SAP S/4HANA 2023' ו-'Related Information BAdI for Further Processing Changes to Orders'. מכאן נלמדים נתיב ה-Customizing (Production, Shop Floor Control, System Modifications, Business Add-Ins), שם הצומת 'BAdI: Order Change' והשם התיאורי של המתודה, הנוגע לתאריך ולשעת הדרישה של רכיב מתוך תזמון הפקודה. הסניפט עצמו אינו מקשר במפורש בין שם הצומת לבין השם הטכני WORKORDER_UPDATE; הקישור נשען על הרשומה האחרת באותו סניפט תחת Related Information ועל רשומת 2022 SPS03. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 (Document Version 1.36, 1,514 עמודים)",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "רשימת הפישוט הציבורית לגרסת 2025 FPS01 הורדה מהכתובת שבשדה ה-url, חולצה כטקסט מלא (3,623,854 בתים, 3,603,831 תווים, 1,514 עמודים) ונסרקה: אפס מופעים של הרצף 'PPCO' ואפס מופעים של הרצף 'WORKORDER'. הממצא השלילי תחום ומשמעותי, שכן אותו מסמך כן עוסק בתחום: 23 מופעים של 'PP-SFC', 59 מופעים של 'production order' (ללא תלות ברישיות; 48 מהם באיות אותיות קטנות בלבד) ושלושה מופעים של 'Shop Floor Control'. כלומר לא קיים ברשימה זו פריט פישוט הנוקב בשם PPCO0021 או בשם כל הרחבת PPCO אחרת, וגם לא ב-WORKORDER_UPDATE או ב-WORKORDER_GOODSMVT. אין בכך קביעה על קיומה או אי-קיומה של ההרחבה במערכת.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת PPCO0021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת המאגר מתארת את PPCO0021 כ-Customer Exit במודול PP בשם 'בדיקת רכיבי פקודה': ולידציה או התאמה של רכיבי הפקודה (Components/Reservations), טריגר 'בעיבוד רכיבים בפקודה', שדה object 'Enhancement PPCO0021' ללא שם מודול פונקציה, הטרנזקציות CO02 ו-COR2, דוגמה של אכיפת אצווה ספציפית לרכיב רגיש בפקודת תהליך, ובבלוק ECC מול S/4HANA: 'נתמך.' ו-'העדף BAdI WORKORDER_GOODSMVT.'. הרשומה מסומנת inferred. רשומות נגזרות במאגר מנסחות זאת אחרת: data/workbenches-ext.ts כותב 'Exit בעת יצירת רכיבי הזמנה / חישוב מחדש של RESB', data/domain-detail.ts שורה 369 מקצר ל-'PPCO0021 (רכיבים)', ו-data/troubleshooting-ext2.ts מפנה אליו בתרחיש 'פיצוץ BOM ללא רכיבים בפקודה'. data/transactions.ts מונה אותו בין ההרחבות של CO01 לצד PPCO0001 ו-PPCO0007. כל אלה הם רובד המאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#PPCO0021; data/workbenches-ext.ts#PPCO0021; data/domain-detail.ts:369"
      }
    ],
    xrefs: [
      "enh:badi:WORKORDER_UPDATE",
      "enh:badi:WORKORDER_GOODSMVT",
      "enh:technique:customer-exit",
      "enh:technique:classic-badi",
      "enh:exit:PPCO0001",
      "enh:exit:PPCO0007",
      "enh:exit:CONFPP05",
      "enh:exit:PCSD0002",
      "tx:CO01",
      "tx:CO02",
      "tx:COR1",
      "tx:COR2",
      "tx:CMOD",
      "tx:SMOD",
      "tx:SE18",
      "tx:SE19",
      "table:AUFK",
      "table:AFKO",
      "table:AFPO",
      "table:RESB"
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה, הכול ב-2026-09-21: ארבע-עשרה שאילתות ב-scripts/sap-help-search.mjs תחת שלושה מוצרים (SAP_S4HANA_ON-PREMISE: PPCO0021; PPCO0021 enhancement; customer enhancement production order components PPCO check; customer exit order components PPCO0021 reservation; Enhancements in Production Order PPCO0009 PPCO0021; PPCO0020 PPCO0021 PPCO0022 enhancement SMOD; Document Integration in the Production Order customer enhancements PPCO0015 PPCO0016 PPCO0017; BAdI for Further Processing Changes to Orders COMP_RQMT_DATE_TIME_SET; Customizing Activities and Business Add-Ins for PEO COMP_RQMT_DATE_TIME_SET Order Change; Process Orders customer enhancements components material list PPCO. SAP_ERP: PPCO0021; implement enhancement PPCO0021 transaction SMOD CMOD; Enhancements Shop Floor Control production order SMOD CMOD customer exit list. SAP_S4HANA_CLOUD: PPCO0021 customer exit order components), חיפוש רשת אחד מוגבל ל-help.sap.com, וחמישה מסמכים רשמיים שהורדו ונקראו או נסרקו בפועל. הסניפטים תלויי-שאילתה: הסניפט המצוטט מרשומת ה-PEO (loio d1d5db5f2df54e78a956b573e1d3327a) מוחזר בשאילתה 'BAdI for Further Processing Changes to Orders', בעוד שהשאילתה 'Customizing Activities and Business Add-Ins for PEO COMP_RQMT_DATE_TIME_SET Order Change' מחזירה את אותה רשומה עם סניפט כללי. כמו כן שירות החיפוש מחזיר את אותו loio תחת שלושה מקטעי deliverable שונים לפי השאילתה (f5d3e1005efd4e86acf9a65abf428082, f296651f454c4284ade361292c633d69, e296651f454c4284ade361292c633d69); כל הצורות פתירות, והכתובת שנבחרה אינה קנונית. מה שאומת רשמית: רק עובדות ה-BAdI, לא PPCO0021 עצמה. השם PPCO0021 אינו מופיע באף כותרת או סניפט שהוחזרו. הרשומות הרשמיות היחידות ממשפחת PPCO שכן הוחזרו נוגעות להרחבות אחרות: PPCO0001 (שלושת עמודי תרחיש ה-Workflow 'Production Order Changes (PP-SFC)', 'Preparation and Customizing' ו-'Technical Implementation', 2025.001, שבסניפטיהם 'the function module exit EXIT_SAPLCOBT_001 (customer enhancement PPCO0001)'), PPCO0005 ('Implement Enhancement to Clear Backflush Indicator (ERP)', loio c80069c184f841f9ada8b58506a491dd, 2025.001) ו-PPCO0015/PPCO0016/PPCO0017 ('Document Integration in the Production Order', loio b0ffb753128eb44ce10000000a174cb4, 2025.001). ממצאים שליליים, כולם נמדדו ולא הוסקו, כל מסמך עם כתובת פתירה: (1) רשימת הפישוט SIMPL_OP2025.pdf (ראו הראיה השלישית); (2) הערות השחרור הרשמיות של PP ל-SAP ERP Central Component 6.0, פרק 18 (https://help.sap.com/doc/ecedecf75e7c48498161e79546881b7b/6.00.29/en-US/Chapter_18__PP_Production_Planning_and_ControlE_(2).PDF, 31 עמודים) הורדו וחולצו כטקסט: שלושת המופעים היחידים של 'PPCO' נמצאים בסעיף 18.7.3, 'Business Add-In for Document Links in the Production Order (New)', שבו נכתב 'The BAdI is an alternative to or enhancement of the following Customer Exits: PPCO0015 (Additional check for document links from BOMs) PPCO0016 (Additional check for document links from master data) PPCO0017 (Additional check for dialog processing of document links)'; המחרוזת PPCO0021 אינה מופיעה במסמך; (3) הערות השחרור של SAP enhancement package 6 for SAP ERP 6.0, פרק 15 PP (https://help.sap.com/doc/34b5fbaa4d02406bba63ccfcfbe5f52b/6.06.19/en-US/SAP_ERP_-_Chapter_15_-_PP_Production_Planning_and_ControlE.PDF, 33 עמודים, ובו סעיף 15.2 PP-SFC Production Orders) הורדו וחולצו כטקסט: אפס מופעים של 'PPCO' ואפס של 'WORKORDER'; (4) עמוד ספריית SAP לגרסת 4.6C 'Enhancement when Saving an Order (Header Fields)' (https://help.sap.com/saphelp_46c/helpdata/en/35/71883286c2223ae10000009b38f984/content.htm?no_cache=true) הורד ונקרא: הוא מתעד את PPCO0007 בלבד ('The following enhancement is available for production orders: PPCO0007 Exit when saving production order') ואינו רשימה כוללת של הרחבות פקודת הייצור, ולכן היעדר PPCO0021 ממנו אינו ממצא. עמוד 4.6C 'Develop Enhancements' (loio 35/6f4073268b2239e10000009b38f984) נקרא אף הוא ונמצא שהוא רשימת ההרחבות של תחזוקת מפעל ושירות לקוחות בלבד (IEQM, ILOM, IMRC, IQSM, IPRM, IWOC, QQMA, IWO1), אפס מופעי 'PPCO', ולכן גם הוא אינו ממצא לגבי PP. מה שלא אומת ואינו נטען ברשומה: הטקסט הקצר הרשמי של PPCO0021, שמות מודולי ה-EXIT_ שלה, רשימת הפרמטרים, נקודת ההפעלה המדויקת, תחולתה על פקודות תהליך (COR1/COR2) לצד פקודות ייצור, וקיומה בגרסת S/4HANA היעד; הרשומה אינה מציעה השערה על משמעות שמה. סתירות ושתיקות במאגר: שדה object ברשומת data/exits.ts נושא 'Enhancement PPCO0021' ללא שם Function Exit, ושלוש רשומות נגזרות מנסחות את תפקיד ההרחבה בשלוש דרכים שונות (בדיקת רכיבים, יצירת רכיבי הזמנה וחישוב מחדש של RESB, פיצוץ BOM); לא נמצא מקור רשמי שיכריע ביניהן, ולכן הן נרשמו כרובד מאגר ולא כסתירה מול SAP. חיבור ה-MCP למערכת ABAP חיה לא היה זמין בסשן זה, ובדיקת SMOD/CMOD/SE37 לא בוצעה. הרשומה אינה נושאת שדה reviewer, בהתאם למוסכמה בכל קבצי data/verification/**."
  },
  {
    id: "enh:exit:PCSD0002",
    aliases: ["PCSD0002 (בדיקת פריט BOM)", "PCSD0002 (פריט BOM)"],
    status: {
      status: "unchanged",
      he: "ההרחבה PCSD0002 מתועדת ב-SAP S/4HANA On-Premise 2025 FPS01 בעמוד 'Enhancements Using Customer Exits (BOMs)' כאחת מהרחבות קבוצת הפונקציות XCSA, בתיאור 'Customer fields in item'. ברשומות החיפוש שנסרקו לא נמצאה עבורה הערת פישוט, הוצאה משימוש, הגבלה או הכרזת יורש. הסטטוס מתייחס להימצאות ההרחבה בסט התיעוד הנוכחי של S/4HANA On-Premise ולתיאור המתועד שלה בלבד: גוף העמוד לא נקרא, ואותו loio מופיע גם בסט התיעוד של SAP ERP 6.18, כך שההימצאות אינה מעידה על בדיקה מחודשת של ההרחבה לקראת S/4HANA.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Enhancements Using Customer Exits (BOMs) | Bill of Material (LO-MD-BOM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/e504c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש של העמוד 'Enhancements Using Customer Exits (BOMs)' (loio e504c453f57eb44ce10000000a174cb4, תאריך 2026-02-24) מופיעה בתיעוד SAP S/4HANA On-Premise 2025 FPS01 וקובעת: 'In order to optimize the BOM processing processes in your business, you can change some functions of the SAP System in BOMs by using Customer Exits'. הסניפט מציג את הטבלה 'Enhancements for Function Group XCSA' בעמודות Description / Enhancement / Function Modules, ובה: 'Enhance maintenance of material BOMs PCSD0001 EXIT_SAPLCSDI_001', ואחריה 'Customer fields in item PCSD0002', ולאחר סימן השמטה בסניפט 'EXIT_SAPLCSDI_002 EXIT_SAPLCSDI_003 Customer fields in header PCSD0003 EXIT_SAPLCSDI_004 EXIT_SAPLCSDI_005 BOM comparison PCSD0004 EXIT_RCS14001_001 EXIT_RCS14001_002'; בחלון סניפט שני של אותו loio מופיעות גם השורות 'Component check for material items PCSD0005 EXIT_SAPLCSDI_006', 'Mass Changes PCSD0006 EXIT_SAPMC29M_001', 'Check on the changes to BOM header PCSD0007 EXIT_SAPLCSDI_007' ו-'PCSD0010 EXIT_SAPLCSSO_002'. כלומר ההרחבה PCSD0002 מתועדת בגרסת 2025 FPS01 בתיאור 'Customer fields in item'. גוף העמוד לא נקרא (מעטפת JavaScript), ובסניפטים לא הופיעה הצהרה על הוצאה משימוש, הגבלה או יורש.",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "בהמרה: לשמר את מימוש ההרחבה הקיים ולבחון אותו בכלי Custom Code Migration ‏(SCMON/ATC) לפי הנחיית חוברת ההגירה בשורה 11, ולאמת ב-SMOD את רכיבי ההרחבה בגרסה המותקנת לפני שמסתמכים על תיאור הפרויקט. לפיתוח חדש בגישת Clean Core בתחום עצי מוצר מציג תיעוד 2025 FPS01 שתי נקודות הרחבה מודרניות: BOM_BEFORE_SAVE (הגדרת BAdI תחת Enhancement Spot‏ ES_BOM_UPDATE, ממשק IF_BOM_BEFORE_SAVE, מתודה HANDLE_BEFORE_SAVE) לוולידציה של עץ המוצר לפני שמירה, ו-BOM_UPDATE (מתודה CHANGE_ADD_SAVE) ליצירת אירוע המפעיל workflow בעקבות שינוי בעץ. אף אחד משני העמודים אינו מגדיר את עצמו כיורש של PCSD0002, ולכן לא נרשם successor. לתיקון רובד הפרויקט: השם BADI_BOM_CHANGES שברשומת הקטלוג לא אותר כטוקן עצמאי באף כותרת או סניפט שנסרקו ויש להחליפו בשם מאומת או לסמנו כדורש אימות ב-SE18, ותיאור המטרה ('ולידציה של פריטי עץ מוצר') אינו תואם את התיאור הרשמי 'Customer fields in item', שבו הבדיקה על רכיבי חומר מיוחסת להרחבה אחרת (PCSD0005)."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements Using Customer Exits (BOMs) | Bill of Material (LO-MD-BOM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/e504c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש של העמוד 'Enhancements Using Customer Exits (BOMs)' (loio e504c453f57eb44ce10000000a174cb4, תאריך 2026-02-24) מופיעה בתיעוד SAP S/4HANA On-Premise 2025 FPS01 וקובעת: 'In order to optimize the BOM processing processes in your business, you can change some functions of the SAP System in BOMs by using Customer Exits'. הסניפט מציג את הטבלה 'Enhancements for Function Group XCSA' בעמודות Description / Enhancement / Function Modules, ובה: 'Enhance maintenance of material BOMs PCSD0001 EXIT_SAPLCSDI_001', ואחריה 'Customer fields in item PCSD0002', ולאחר סימן השמטה בסניפט 'EXIT_SAPLCSDI_002 EXIT_SAPLCSDI_003 Customer fields in header PCSD0003 EXIT_SAPLCSDI_004 EXIT_SAPLCSDI_005 BOM comparison PCSD0004 EXIT_RCS14001_001 EXIT_RCS14001_002'; בחלון סניפט שני של אותו loio מופיעות גם השורות 'Component check for material items PCSD0005 EXIT_SAPLCSDI_006', 'Mass Changes PCSD0006 EXIT_SAPMC29M_001', 'Check on the changes to BOM header PCSD0007 EXIT_SAPLCSDI_007' ו-'PCSD0010 EXIT_SAPLCSSO_002'. כלומר ההרחבה PCSD0002 מתועדת בגרסת 2025 FPS01 בתיאור 'Customer fields in item'. גוף העמוד לא נקרא (מעטפת JavaScript), ובסניפטים לא הופיעה הצהרה על הוצאה משימוש, הגבלה או יורש.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Workflow: Implement BOM Change | Logistics — General (LO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/25a41481f62e469ba0e61015a0d39d20/3a481ce17bac4ce6ab5d04c7fd1f73f7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש של העמוד 'Workflow: Implement BOM Change' (חבילת Logistics — General (LO), loio 3a481ce17bac4ce6ab5d04c7fd1f73f7, תאריך 2026-02-24) בתיעוד SAP S/4HANA On-Premise 2025 FPS01 קובעת בסעיף התנאים המקדימים: 'You have created an implementation for the Business Add-In BOM_UPDATE (method CHANGE_ADD_SAVE) that creates the triggering event following a BOM change'. כלומר השם BOM_UPDATE, שבו נוקבת חוברת ההגירה של תחזוקת מפעל בשורה 12, מתועד כ-BAdI בגרסת 2025 FPS01 עם המתודה CHANGE_ADD_SAVE. הסניפט אינו נוקב ב-PCSD0002 ואינו מצהיר שה-BAdI מחליף הרחבת לקוח כלשהי.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "BAdI: Validate BOM Before Saving | Bill of Material (LO-MD-BOM)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/aa6a8c61616b41009c448721163b891c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "רשומת החיפוש של העמוד 'BAdI: Validate BOM Before Saving' (loio aa6a8c61616b41009c448721163b891c) בתיעוד SAP S/4HANA On-Premise 2025 FPS01 קובעת: 'This Business Add-In (BAdI) is used in the component Bill of Material (LO-MD-BOM). You can use this BAdI to custom validate the bill of material before saving'; 'The BAdI consists of the following method: HANDLE_BEFORE_SAVE: This method allows you to read the BOM-related data and validate the BOM before saving'; 'BAdI definition:BOM_BEFORE_SAVE'; 'This BAdI is created under Enhancement Spot ES_BOM_UPDATE. This BAdI definition uses the standard interface IF_BOM_BEFORE_SAVE'; ובהגדרות: 'Multi-Use BAdI Not filter-dependent'. הסניפט אינו נוקב ב-PCSD0002 ואינו מגדיר את ה-BAdI כיורש של הרחבת לקוח.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS) וגיליון קוד הלקוח של חוברת ההגירה לתחזוקת מפעל",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת הקטלוג מגדירה את PCSD0002 כ-Customer Exit במודול PP בשם 'בדיקת פריט BOM', מטרה 'ולידציה/השלמה של פריטי עץ מוצר בשמירה', טריגר 'בשמירת BOM (CS01/CS02)', אובייקט 'Enhancement PCSD0002', דוגמה 'אכיפת יחידת מידה תקנית לרכיבי אריזה', ניפוי דרך CMOD, ובבלוק ECC מול S/4HANA: 'נתמך.' לצד 'ב-S/4 BADI_BOM_CHANGES מועדף.'; הרשומה מסומנת inferred: true. הדאטהסט שנגזר מחוברת ההגירה של תחזוקת מפעל מונה תחת '3. עצי מוצר של אחזקה (BOM)' את PCSD0001 בתיאור 'הרחבת לקוח לעצי מוצר (BOM) - בדיקות פריטים' (שורה 10), את PCSD0002 בתיאור 'ברירות מחדל לפריטי עץ מוצר' (שורה 11) ואת BOM_UPDATE כ-BAdI בתיאור 'BAdI לעדכון/בדיקת עצי מוצר (אמת ב-SE18)' (שורה 12), שלושתם בסטטוס 'To review'. עמודת ההמלצה של שורות 10 ו-11 נושאת את אותו טקסט, 'בדוק ב-Custom Code Migration (SCMON/ATC); שקול מעבר ל-BAdI/Enhancement Spot מודרני.', ואילו שורה 12 נושאת 'אמת תאימות ה-BAdI ב-S/4 (SPAU_ENH); ודא חתימה ומימוש אקטיבי לאחר השדרוג.'. שני התיאורים שהמאגר נותן ל-PCSD0002 סותרים זה את זה וגם את טבלת התיעוד הרשמי לגרסת 2025 FPS01, שבה PCSD0002 מתוארת 'Customer fields in item', 'Component check for material items' מיוחס ל-PCSD0005 ו-'Enhance maintenance of material BOMs' ל-PCSD0001.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/exits.ts#PCSD0002; data/sapData.pm.ts#custom-code rows 10-12 (PCSD0001, PCSD0002, BOM_UPDATE)",
        conflictingEvidence: [
          {
            sourceType: "sap_help",
            sourceTitle: "Enhancements Using Customer Exits (BOMs) | Bill of Material (LO-MD-BOM)",
            url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/18ee18df146f46e9a7738186eebceaa7/e504c453f57eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
            product: "SAP S/4HANA",
            edition: "on-premise",
            release: "2025.001",
            accessedAt: DATE21,
            claim: "בטבלת 'Enhancements for Function Group XCSA' שבסניפט העמוד, השורה של PCSD0002 נושאת את התיאור 'Customer fields in item', ואילו התיאור 'Component check for material items' מופיע בשורה של PCSD0005 והתיאור 'Enhance maintenance of material BOMs' בשורה של PCSD0001. התיעוד אינו מייחס ל-PCSD0002 בדיקת רכיבים או ברירות מחדל.",
            verificationLevel: "sap_official_verified"
          }
        ]
      }
    ],
    xrefs: [
      "enh:technique:customer-exit",
      "enh:technique:new-badi",
      "tx:CS01",
      "tx:CS02",
      "tx:CS03",
      "tx:CMOD",
      "tx:SMOD",
      "tx:SE18",
      "table:MAST",
      "table:STKO",
      "table:STPO",
      "table:STAS",
      "cds:I_BillOfMaterial",
      "cds:I_BillOfMaterialItem",
      "fm:CSAP_MAT_BOM_MAINTAIN",
      "fm:CSAP_BOM_ITEM_MAINTAIN"
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: שירות החיפוש הרשמי של SAP Help ‏(scripts/sap-help-search.mjs) בשלושה מוצרים ב-2026-09-21, בשאילתות 'PCSD0002', 'BOM_UPDATE Business Add-In', 'Enhancements Using Business Add-Ins BOM bill of material', 'EXIT_SAPLCSDI_002 customer fields in item', 'Customer fields in item PCSD0002 EXIT_SAPLCSDI_002 function group XCSA', 'BAdI Validate BOM Before Saving Enhancement Spot ES_BOM_UPDATE', 'BOM_BEFORE_SAVE enhancement spot ES_BOM_UPDATE standard interface IF_BOM_BEFORE_SAVE', 'BADI_BOM_CHANGES', 'Enhancements in BOMs customer exits function exits SAP enhancement concept', 'Custom Fields at BOM Item Level' ו-'BAdI Validate BOM Before Updating BOM_BEFORE_UPDATE', לצד שני חיפושי רשת מוגבלים ל-help.sap.com, api.sap.com, fioriappslibrary ו-fal. שלושת ה-URL שברשומה מחזירים HTTP 200 ב-2026-09-21. תיקון לטיוטה שנפסלה בביקורת: הטענה שהשם BOM_UPDATE אינו מופיע באף כותרת או סניפט רשמיים הופרכה. העמוד 'Workflow: Implement BOM Change' ‏(loio 3a481ce17bac4ce6ab5d04c7fd1f73f7, גרסה 2025.001) נוקב בו במפורש, והרשומה בנויה עליו. שלילה שנמדדה ולא הוסקה: השם BADI_BOM_CHANGES, שרשומת הקטלוג מציעה כמועדף ב-S/4HANA, לא הופיע כטוקן עצמאי באף כותרת או סניפט מתוך 105 רשומות שהוחזרו בחמש שאילתות במוצר SAP S/4HANA On-Premise, ולא בשתי הרשומות שהוחזרו במוצר SAP S/4HANA Cloud Public Edition. המדידה מוגבלת לרשומות שהוחזרו ואינה ראיה לאי-קיום האובייקט במערכת. אותו עמוד, ארבעה renderings: ה-loio ‏e504c453f57eb44ce10000000a174cb4 הוחזר תחת ארבעה deliverables, כל אחד בנתיב guide משלו: Bill of Material (LO-MD-BOM), Product Lifecycle Management (PLM), Document Management ו-Order BOMs (PP-BD-BOM). ברשומה נשמר ה-URL של Bill of Material (LO-MD-BOM); מדובר במקור אחד ולא בארבעה. אותו loio מופיע גם בסט התיעוד של SAP ERP ‏(versionId 6.18.latest, deliverable Order BOMs (PP-BD-BOM)), ולכן הימצאותו ב-2025.001 מלמדת שהעמוד חלק מסט התיעוד הנוכחי של S/4HANA On-Premise בלבד. מה לא אומת: (1) שיוך מודולי הפונקציה EXIT_SAPLCSDI_002 ו-EXIT_SAPLCSDI_003 ל-PCSD0002 נשען על סדר העמודות בסניפט, ובין שם ההרחבה לבין שני המודולים מופיע סימן השמטה; לכן השיוך לא נרשם כ-alias והוא דורש אימות ב-SMOD; (2) גוף עמודי help.sap.com לא נקרא (מעטפת JavaScript) וכל ציטוט תחום לכותרת ולסניפט של רשומת החיפוש; (3) לא אותר פריט פישוט, הודעת הוצאה משימוש או הכרזת יורש ל-PCSD0002, ולכן הרשומה נטולת successor; (4) במוצר SAP S/4HANA Cloud Public Edition לא הוחזרה רשומה הנוקבת ב-PCSD0002 (ארבע שאילתות, 49 רשומות שנסרקו); זהו ממצא שתחום לחיפוש ואינו טענה על זמינות במהדורה זו; (5) ב-Public Cloud מתועד BAdI אחר לוולידציה של עץ מוצר, 'Validate BOM Before Updating' ‏(BOM_BEFORE_UPDATE), למשל בעמוד 'BAdI: Validate BOM Before Updating' ‏(R&D / Engineering, versionId 2608.500) ובעמוד What's New של S/4HANA Cloud 2408.1; הוא לא נכלל כראיה משום שהרשומה מוגבלת ל-On-Premise; (6) בקטלוג ה-Fiori של הפרויקט אין אפליקציית עץ מוצר (נמדד: אפס התאמות ב-data/fiori/apps.ts) ולכן אין xref לאפליקציה; (7) PCSD0001 ו-PCSD0005, שהתיעוד הרשמי נוקב בהם לצד PCSD0002, אינם קיימים ביקום הפרויקט ולכן אינם ב-xrefs; (8) גם BOM_UPDATE ו-BOM_BEFORE_SAVE אינם רשומות בפרויקט ולכן מוזכרים בטקסט בלבד. עמוד What's New ‏'Custom Fields at BOM Item Level' ‏(loio 77bef09007f04eeab48726d55b210ae7, versionId 2021.000) נבדק ולא נכלל כראיה: לפי הסניפט הוא משויך ל-Application Component‏ 'Extended Production Engineering and Operations' ועוסק בהוספת שדות לקוח באפליקציות מסוימות, היקף צר מזה של הרשומה. ה-MCP ל-ABAP לא היה זמין בסשן זה; אימות ההפעלה בפועל דורש SMOD/CMOD ו-SE18 במערכת S/4HANA חיה. הרשומה אינה נושאת שדה reviewer, בהתאם למוסכמה בכל קבצי data/verification/**."
  },
  {
    id: "enh:badi:MD_PLDORD_POST",
    aliases: [
      "BAdI MD_PLDORD_POST",
      "MD_PLDORD_POST (BAdI להזמנה מתוכננת)",
      "Update Planned Orders (MD_PLDORD_POST)"
    ],
    status: {
      status: "simplified",
      he: "ה-BAdI‏ MD_PLDORD_POST (עיבוד נוסף של הזמנות מתוכננות שנרשמו) מכוסה בפריט הפישוט הרשמי 'S4TWL - MRP in HANA' ‏(רכיב יישום PP-MRP) ברשימת הפישוט של SAP S/4HANA 2025 FPS1: בטבלת 'Purpose / Classic BAdI or extension / AMDP BAdI' מודפסת השורה 'Change planned orders created by MRP' עם ה-BAdIs הקלאסיים 'MD_PLDORD_CHANGE, MD_PLDORD_POST' ומולם ה-AMDP BAdI‏ 'PPH_MRP_RUN_BADI => PLANORD_BEFORE_UPDATE_ADJUST'. הפריט מורה 'Re-implement BAdI implementations and extensions of the classic MRP as AMDP BAdI' וקובע ש'Enhancements or BAdI implementations of the classic MRP run does not work with MRP Live if the material is supported/planned within MRP Live', ואילו לחומר שריצת התכנון מנתבת ל-MRP הקלאסי 'the existing classic BAdI implementation still can be used'. ההסתייגות האחרונה מנוסחת בפריט על מימושים המשפיעים על 'the planning process and storing behavior of the classic MRP', ובאותה פסקה המקור מפנה במפורש אל 'the new BAdIs (see table below)' - כלומר אל הטבלה שבה נמנה MD_PLDORD_POST עצמו. אין במקור קביעה על תכליתו של MD_PLDORD_POST מול הניסוח הזה, והערת השחרור של SAP מתארת אותו כעיבוד נוסף של הזמנות שכבר נרשמו, עם הדוגמה 'log any changes made'. אף מקור רשמי שנקרא אינו מגדיר את ה-BAdI כמוסר, כלא זמין או כבעל יורש מוכרז: רשימת הפישוט מציגה אותו כמימוש קלאסי שיש לתרגם ל-AMDP BAdI במעבר ל-MRP Live.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.2 S4TWL - MRP in HANA (PP-MRP), Document Version 1.36, item begins p. 651",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "טבלת 'Purpose / Classic BAdI or extension / AMDP BAdI' בפריט 9.5.2 ‏'S4TWL - MRP in HANA' כוללת את השורה: Purpose ‏'Change planned orders created by MRP', Classic BAdI or extension ‏'MD_PLDORD_CHANGE, MD_PLDORD_POST', AMDP BAdI‏ 'PPH_MRP_RUN_BADI => PLANORD_BEFORE_UPDATE_ADJUST', ותא ה-Comment של השורה ריק. בעמ' 655, תחת 'Required and Recommended Action(s)', נדרש 'Re-implement BAdI implementations and extensions of the classic MRP as AMDP BAdI (see \"BAdI related information\" below for further details)'.",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "לסווג את MD_PLDORD_POST כפריט פישוט ולא כהרחבה שהוסרה: רשימת הפישוט אינה מבטלת אותו אלא מורה לממש אותו מחדש כ-AMDP BAdI. לפני המעבר ל-MRP Live: (1) לממש מחדש את לוגיקת העיבוד שלאחר רישום ההזמנה המתוכננת ב-AMDP BAdI‏ PPH_MRP_RUN_BADI, מתודה PLANORD_BEFORE_UPDATE_ADJUST, כפי שמצמידה טבלת פריט הפישוט לשורה 'Change planned orders created by MRP'; (2) למפות אילו חומרים תלויים במימוש הקלאסי, שכן לפי אותו פריט 'the existing classic BAdI implementation still can be used' לחומר שריצת התכנון מנתבת ל-MRP הקלאסי, בעוד לחומר המתוכנן ב-MRP Live המימוש הקלאסי אינו מעובד; (3) לתקן את רובד הפרויקט: לפי הערת השחרור של SAP R/3 Enterprise 4.70 ה-BAdI מיועד ל-'further process the data from planned orders, which are posted in the planning run or posted during manual planned order processing', עם הדוגמה 'You can, for example, log any changes made', בעוד שינוי נתוני ההזמנה לפני הרישום משויך ב-SAP ל-BAdI נפרד בשם MD_PLDORD_CHANGE. הרשומה בקטלוג הפרויקט מתארת התערבות ביצירה ובעדכון ומגבילה את ההפעלה לרישום ע\"י MRP בלבד, ולכן היא ממזגת שני BAdIs שונים ומשמיטה את ההפעלה בעיבוד ידני של הזמנה מתוכננת; (4) לאמת במערכת S/4HANA חיה, ב-SE18 ו-SE19, את קיום ה-BAdI, את ממשק המתודות ואת המימושים הפעילים, שכן אף עמוד תיעוד רשמי של S/4HANA שנקרא אינו מתעד את הממשק."
    },
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 · item 9.5.2 S4TWL - MRP in HANA (PP-MRP), Document Version 1.36, item begins p. 651",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "פריט 9.5.2 ‏'S4TWL - MRP in HANA' (רכיב יישום PP-MRP) קובע בעמ' 655 בין הפעולות הנדרשות: 'Re-implement BAdI implementations and extensions of the classic MRP as AMDP BAdI', ומוסיף 'Please note that it might be necessary to adjust certain BAdI implementations even if you still use classic MRP. This is since the data reading processes of some classic MRP transaction (like MD01, MD02, MD03, etc.) have been optimized for HANA database accesses'. תחת 'BAdI related information' נכתב 'Enhancements or BAdI implementations of the classic MRP run does not work with MRP Live if the material is supported/planned within MRP Live. Please note: MRP Live can force materials into classic MRP if materials use a setup which is not supported in MRP live', ובדוגמה שבהמשך 'The second material B is not supported in MD01N and the planning run routes this material B into classic MRP. Therefore the existing classic BAdI implementation still can be used for material B. This refers only to all BAdI implementations which influence the planning process and storing behavior of the classic MRP'. בטבלת 'Purpose / Classic BAdI or extension / AMDP BAdI' מודפסת השורה: Purpose ‏'Change planned orders created by MRP', Classic BAdI or extension ‏'MD_PLDORD_CHANGE, MD_PLDORD_POST', AMDP BAdI‏ 'PPH_MRP_RUN_BADI => PLANORD_BEFORE_UPDATE_ADJUST', ותא ה-Comment של השורה ריק. פריט 9.5.2 משתרע במסמך זה על עמ' 651 עד 777, משום שסעיף 'BAdI related information' והטבלה מודפסים כטקסט מסובב הנפרש על עמודים רבים. אותה שורה מודפסת מילה במילה גם ברשימת הפישוט של 2023 FPS3 בעמ' 737.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP Production Planning and Control - Release Notes, SAP R/3 Enterprise · 19.1.1 Business Add-Ins in MRP",
        url: "https://help.sap.com/saphelp_crm60/helpdata/en/06/fb4d40eae76f13e10000000a1550b0/19_pp_en.pdf",
        product: "SAP R/3 Enterprise",
        edition: "ecc",
        release: "4.70 (SAP_APPL 470)",
        accessedAt: DATE21,
        claim: "הערת השחרור 19.1.1 ‏'Business Add-Ins in MRP' פותחת ב-'As of SAP R/3 Enterprise 4.70 (SAP_APPL 470) Business Add-Ins (BAdIs) are available for the following functions in material requirements planning (MRP)', ומונה תחת הכותרת 'MRP Procurement Proposal (PP-MRP-PP)' את הרשומה: 'Processing planned orders further: MD_PLDORD_POST - Using this BAdI, you can further process the data from planned orders, which are posted in the planning run or posted during manual planned order processing. You can, for example, log any changes made'. באותה רשימה, ובאותו רכיב יישום, מופיע בנפרד 'Changing planned orders: MD_PLDORD_CHANGE - Using this BAdI, you can change the data from planned orders before posting in the planning run, or before posting during manual planned order changes', וכן MD_PLDORD_TIME_STAMP ו-MD_PLDORD_SCHEDULING. תחת 'Effects on Customizing' נכתב 'To activate a Business Add-In, you have to create an active implementation. To do this, choose Tools -> ABAP Workbench -> Utilities -> Business Add-Ins -> Implementation in the SAP menu'. המסמך נקרא במלואו כקובץ PDF.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PP Production Planning and Control - Release Notes, SAP ERP Central Component · 18.6.1 Business Add-Ins in Material Requirements Planning (New/Enhanced)",
        url: "https://help.sap.com/doc/ecedecf75e7c48498161e79546881b7b/6.00.29/en-US/Chapter_18__PP_Production_Planning_and_ControlE_(2).PDF",
        product: "SAP ERP Central Component",
        edition: "ecc",
        release: "ECC 6.0 (SAP_APPL 600)",
        accessedAt: DATE21,
        claim: "הערת השחרור 18.6.1 בפרק PP-MRP קובעת 'As of SAP ECC 6.0 (SAP_APPL 600) you can use the following Business Add-Ins (BAdIs)', ומונה את הפריט 'Update Planned Orders ( MD_PLDORD_POST) (Enhanced) - Up to and including SAP ECC 5.0 it was only possible to use the BAdI to publish the header data and components of planned orders. You can now use this BAdI to publish capacity data and/or its change status as well'. בהערת השחרור הזאת ה-BAdI נקרא 'Update Planned Orders', בעוד הערת השחרור של R/3 Enterprise 4.70 מכנה אותו 'Processing planned orders further'; זהו גם המקור להיקף הנתונים שהוא מפרסם ב-ECC 6.0: נתוני כותרת, רכיבים ונתוני קיבולת או מצב השינוי שלהם. המסמך נקרא במלואו כקובץ PDF.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת MD_PLDORD_POST",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת הקטלוג: BAdI במודול PP בשם 'BAdI להזמנה מתוכננת', מטרה 'התערבות ביצירה/עדכון של הזמנות מתוכננות מ-MRP', נקודת הפעלה 'בעת רישום הזמנה מתוכננת ע\"י MRP', אובייקט 'BAdI MD_PLDORD_POST', טרנזקציות MD01N, MD02 ו-SE19, דוגמה 'הוספת נתון מותאם להזמנה מתוכננת לצורך תכנון מתקדם', איתור תקלות 'SE19 מימוש; breakpoint; הרץ MRP', ובבלוק ECC מול S/4HANA: 'נתמך', 'תואם MRP Live (מועדף על M61X exits)' ו-'QA: לוגיקת הזמנה מתוכננת ב-MD01N'. שלושה פערים מול התיעוד הרשמי שנקרא: המטרה והדוגמה מתארות התערבות בנתוני ההזמנה, בעוד SAP מגדירה את MD_PLDORD_POST כעיבוד נוסף של הזמנות שכבר נרשמו ומשייכת את שינוי הנתונים לפני הרישום ל-BAdI נפרד MD_PLDORD_CHANGE; נקודת ההפעלה מוגבלת לרישום ע\"י MRP, בעוד הערת השחרור מוסיפה 'posted during manual planned order processing'; והמשפט 'תואם MRP Live' הפוך לכיוון שרשימת הפישוט קובעת, שכן שם MD_PLDORD_POST נמנה עם ה-BAdIs הקלאסיים שיש לתרגם ל-AMDP BAdI ושאינם מעובדים לחומר המתוכנן ב-MRP Live.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#MD_PLDORD_POST"
      }
    ],
    xrefs: [
      "enh:technique:classic-badi",
      "enh:exit:M61X0001",
      "enh:badi:MD_ADD_ELEMENTS",
      "tx:MD01N",
      "tx:MD01",
      "tx:MD02",
      "tx:MD03",
      "tx:MD11",
      "tx:MD12",
      "tx:SE18",
      "tx:SE19",
      "fiori:F1339"
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: ארבעה מסמכי PDF רשמיים מ-help.sap.com שנקראו, ושש שאילתות בשירות החיפוש הרשמי, אחת מהן בשני מוצרים (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE ו-SAP_ERP: 'MD_PLDORD_POST', 'BAdI planned order MRP saving', 'PPH_MRP_RUN_BADI planned order', 'BAdIs no Longer Supported MRP Live planned orders', 'Seasons in Planned Orders PLANORD_BEFORE_UPDATE_ADJUST', 'Information and Settings for Materials in MRP on HANA Plan in Classic MRP BAdI') וחיפוש רשת מוגבל ל-help.sap.com, ‏api.sap.com, ‏fioriappslibrary ו-fal, שדרכו אותרו שתי הערות השחרור של PP. שלושת ה-URL שברשומה, וכן ה-URL של רשימת הפישוט 2023 FPS3 המוזכר להלן, הוחזרו ב-HTTP 200 ביום 2026-09-21. קטע הגרסה ב-URL של רשימת הפישוט 2025 הוא 2025.latest, כינוי נייד: /2025/, /2025.000/ ו-/latest/ החזירו HTTP 403 באותו יום, ולכן זהו הנתיב הזמין היחיד. העוגן הקבוע לגרסה שנקראה הוא Document Version 1.36 שבעמוד השער, והוא נרשם ב-sourceTitle. ממצא מרכזי: השם הטכני MD_PLDORD_POST אינו מופיע בכותרת או בסניפט של אף רשומת חיפוש של SAP S/4HANA On-Premise או של SAP ERP; שאילתת השם הטכני במוצר SAP_S4HANA_ON-PREMISE החזירה עמודי Malaysia, Romania ו-Material Ledger ללא סניפט וללא קשר לנושא, ובמוצר SAP_ERP החזירה רשומות לא קשורות באותו אופן. המקורות הרשמיים שכן נוקבים בשמו הם קובצי PDF בלבד: שתי הערות שחרור של PP ושתי רשימות פישוט (2025 FPS1 ו-2023 FPS3). טבלת ה-BAdIs ברשימת הפישוט של 2025 FPS1 מודפסת כטקסט מסובב שאינו נקרא כשורות טבלה בחילוץ רגיל (החילוץ הרגיל מחזיר את התאים כעמודות תווים זו לצד זו); היא שוחזרה כאן באמצעות pdftotext -raw על עמודים 656 עד 677, שמחזיר תו בשורה, ושרשור התווים לפי סדר הקריאה. השחזור אומת מול המסמך של 2023 FPS3, שבו אותה טבלה מודפסת בכיוון רגיל בעמ' 737 ‏(https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf) ושורת MD_PLDORD_CHANGE / MD_PLDORD_POST זהה בשני המסמכים. השחזור גם מיישב את סדר התאים: הערת ה-Comment ‏'See simplification item 2.1.11.7 Simplified Sourcing' שייכת לשורת 'Source of supply determination in MRP' שמתחתיה ולא לשורת ההזמנות המתוכננות, ולכן תא ה-Comment של שורת MD_PLDORD_POST ריק. מה שלא נכתב כ-successor: ה-AMDP BAdI‏ PPH_MRP_RUN_BADI והמתודה PLANORD_BEFORE_UPDATE_ADJUST מופיעים בטבלה כמקבילה המודרנית, אך PPH_MRP_RUN_BADI אינו קיים בקטלוג ההרחבות של הפרויקט ולכן אין לו מזהה שניתן לאמת, וגם אין עמוד רשמי המכריז עליו כיורש רשמי של MD_PLDORD_POST; מסיבה זו לא נרשם שדה successor ולא נוסף xref. שתי רשומות חיפוש נוספות לגרסת 2025 FPS01 מחזקות את התמונה אך לא נכללו כראיות מכיוון שגוף העמודים לא נקרא (מעטפת JavaScript): 'Seasons in Planned Orders' ‏(loio 9a84e8f5276f459d9494a0119a4cf865, deliverable Retail, versionId 2025.001), שבסניפט שלה 'You can use the BAdI method PLANORD_BEFORE_UPDATE_ADJUST in PPH_MRP_RUN_BADI to implement the logic as per business need to fill the season data for planned orders created through MRP Live', ו-'MRP Live: Incompatible Changes' ‏(loio 1d4ee5514ec5c90ae10000000a44176d, deliverable Material Requirements Planning (PP-MRP), versionId 2025.001), שבסניפט שלה 'BAdIs no Longer Supported MRP Live (transaction MD01N) does not process BAdIs for materials that are completely planned in SAP HANA' ו-'For such materials, you have to force the MRP Live run to call classic MRP by setting the Plan in Classic MRP indicator in transaction MD_MRP_FORCE_CLASSIC'. המשפט הזה מופיע גם בגוף רשימת הפישוט של 2025 שנקראה: 'Corresponding materials can be set using transaction MD_MRP_FORCE_CLASSIC in such a way that they are automatically redirected to classic MRP in MRP Live', ולכן הוא נשען על מסמך שנקרא ולא רק על סניפט. הטרנזקציה MD_MRP_FORCE_CLASSIC אינה קיימת בדאטהסט ולכן אינה ב-xrefs. ה-xref ל-fiori:F1339 נשען על רשומת What's New 1809 FPS02 ‏(loio 4f972af74c8d42a29a6ae5ba0bb0c8bc), שבסניפט שלה 'MRP Runs app (transaction MD01N or app ID F1339)'. ה-xrefs ל-tx:MD11 ו-tx:MD12 הם ניווט בלבד: הערת השחרור מדברת על 'manual planned order processing' ואינה נוקבת בשם טרנזקציה. לא אומת: ממשק ה-BAdI (שם ה-Enhancement Spot, שמות המתודות והפרמטרים), קיומו בפועל בגרסת S/4HANA On-Premise 2025, מצבו ב-SAP S/4HANA Cloud Public Edition, והאם הוא עדיין נקרא בעיבוד ידני של הזמנה מתוכננת ב-S/4HANA. אף עמוד תיעוד של S/4HANA שנקרא אינו מזכיר אותו בשמו, ולכן האימות הזה דורש SE18/SE19 במערכת חיה; ה-MCP ל-ABAP לא היה זמין בסשן. הרשומה אינה נושאת שדה reviewer, לפי המוסכמה בכל קובצי data/verification/**."
  },
  {
    id: "enh:badi:MD_ADD_ELEMENTS",
    aliases: ["MD_ADD_ELEMENTS (תצוגת MD04)", "BAdI MD_ADD_ELEMENTS"],
    status: {
      status: "simplified",
      he: "ה-BAdI‏ MD_ADD_ELEMENTS (אלמנטי MRP מותאמים בתצוגת מצב המלאי והדרישות) נקוב בשמו בפריט הפישוט הרשמי 'S4TWL - MRP in HANA' (רכיב יישום PP-MRP), ויש לו בפריט שני תפקידים נפרדים. ראשית, הוא עצמו נמנה בטבלת ההמרה ל-AMDP: השורה 'User-defined MRP elements in MRP' מצמידה ל-Classic BAdI 'MD_ADD_ELEMENTS' את ה-AMDP BAdI‏ 'PPH_MRP_RUN_BADI => MDPS_ADJUST', תחת המשפט הפותח 'BAdI implementations of the classic MRP should be translated into AMDP BAdI implementations if still required. This affects the following BAdIs:'. קיים אפוא מקור רשמי שנוקב עבורו במקבילה ב-AMDP, ולא ניתן לומר שאין כזו. שנית, אותו פריט מציג אותו כ-BAdI ה-ABAP החלופי לתהליכי קריאת הנתונים המותאמים ל-HANA ב-MRP הקלאסי: 'If the planning transactions are optimized for HANA (like MD01, MD02, MD03, materials forced to classic MRP by MRP Live), then it is required to use an alternative ABAP BAdI. In this case BAdI MD_ADD_ELEMENTS has to be used to adjust the data determined by the HANA optimized reading processes', ובשורת MD_CHANGE_MRP_DATA שבטבלה מופיעה ההערה 'Use BAdI MD_ADD_ELEMENTS for classic MRP transactions which are optimized for HANA'. שני התפקידים נשענים על אותה הבחנה שהפריט עושה בנוסח 2023 FPS3 שלו (עמ' 736): 'Enhancements or BAdI implementations of the classic MRP run does not work with MRP Live if the material is supported/planned within MRP Live'; המשפט הזה אינו מופיע ברינדור של אותו פריט במסמך 2025 FPS01. מדריך התפעול של S/4HANA 1709 מוסיף היכן ה-BAdI מעובד: 'The BAdI MD_ADD_ELEMENTS is processed in MRP evaluations such as MD04 or MD07 and is processed in the classic MRP transactions MD01 or MD02 or if you have set the Plan in Classic MRP indicator'. אף מקור רשמי שנקרא אינו מסמן את ה-BAdI כהרחבה שהוסרה, ואינו מגדיר את PPH_MRP_RUN_BADI כיורש המבטל אותו, אלא כמקבילה שיש לממש כשהלוגיקה נדרשת ב-MRP Live.",
      edition: "on-premise",
      release: "2025 FPS01",
      source: {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 9.5.2 S4TWL - MRP in HANA, pp. 651-777",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "פריט 9.5.2 'S4TWL - MRP in HANA' (Application Component: PP-MRP; Related Notes: Business Impact 0002268085 'MRP Live on SAP HANA - MD01N') נפרש בעמ' 651 עד 777 של גרסת המסמך 1.36. טבלת 'Purpose / Classic BAdI or extension / AMDP BAdI / Comment' מודפסת במסמך זה כטקסט מסובב; pdftotext -raw מחלץ אותה במלואה, אך תו בכל שורה, ולכן התאמת מחרוזת מחייבת הסרת רווחים וירידות שורה לפני החיפוש (grep ישיר על הפלט מחזיר אפס תוצאות). בעמ' 656 (ושוב ברינדור ההמשך בעמ' 698, 702 ו-735) מופיעה השורה: Purpose 'User-defined MRP elements in MRP', Classic BAdI or extension 'MD_ADD_ELEMENTS', AMDP BAdI 'PPH_MRP_RUN_BADI => MDPS_ADJUST', ועמודת ה-Comment של שורה זו ריקה. באותה טבלה, שורת 'Reading material receipts and requirements' / 'MD_CHANGE_MRP_DATA' / 'PPH_MRP_RUN_BADI => MDPS_ADJUST' נושאת את ההערה 'Use BAdI MD_ADD_ELEMENTS for classic MRP transactions which are optimized for HANA'. הטקסט הרץ שלפני הטבלה (אותו רינדור; המשפט נפרש על פני עמ' 685 עד 686) קובע: 'If the planning transactions are optimized for HANA (like MD01, MD02, MD03, materials forced to classic MRP by MRP Live), then it is required to use an alternative ABAP BAdI. In this case BAdI MD_ADD_ELEMENTS has to be used to adjust the data determined by the HANA optimized reading processes.' ומיד אחריו: 'A new set of AMDP BAdIs will be available for MRP Live from SAP S/4HANA on-premise edition 1603. BAdI implementations of the classic MRP should be translated into AMDP BAdI implementations if still required. This affects the following BAdIs:'. באותה טבלה נמנית גם השורה 'Material selection for MRP run' / 'Extension M61X0001' / 'PPH_MRP_NETTING_BADI => AT_PLANNING_FILE_ENTRIES_READ' (עמ' 752). גודל הקובץ שנקרא, 10,585,218 בתים, זהה ל-content-length שמחזירה help.sap.com לכתובת זו.",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "לסווג את MD_ADD_ELEMENTS כפריט פישוט ולא כהרחבה 'נתמכת ללא הסתייגות': הפריט אינו מבטל אותה, אך מצמיד לה מקבילה ב-AMDP עבור MRP Live. בפרויקט המרה: (1) למפות את מימושי ה-BAdI הקיימים ולהחליט לכל מימוש אם הלוגיקה שלו נדרשת בריצת MRP Live; אם כן, לממש אותה מחדש ב-PPH_MRP_RUN_BADI במתודה MDPS_ADJUST, כפי שקובעת טבלת פריט הפישוט. (2) להשאיר את המימוש הקלאסי לתצוגות ה-MRP (MD04, MD07) ולטרנזקציות ה-MRP הקלאסי המותאמות ל-HANA (MD01, MD02), שבהן מדריך התפעול מורה במפורש להשתמש ב-MD_ADD_ELEMENTS להתאמת הנתונים שקריאת ה-HANA מחזירה. (3) לחומרים שהתכנון שלהם דורש עיבוד BAdI בריצת ה-MRP, לבדוק את סימון 'Plan in Classic MRP' שמדריך התפעול נוקב בו לפני המעבר ל-MD01N. (4) לתקן את רובד הפרויקט: data/exits.ts רושם 'נתמך.' ללא ההסתייגות של MRP Live, מציג את Fiori 'Monitor Material Coverage' כמקבילה ל-BAdI, ומגדיר נקודת הפעלה 'MD04/MD05'. אף מקור רשמי שנקרא אינו קובע שלאלמנטים שנוספו דרך ה-BAdI יש ייצוג באפליקציות Fiori, ואינו נוקב ב-MD05; התיעוד הרשמי נוקב ב-MD04, MD07, MD01 ו-MD02. (5) לוודא בסביבת בדיקות שהאלמנטים המותאמים עדיין מוצגים ב-MD04 וב-MD07 אחרי ההמרה, ולתעד את התוצאה כבדיקה שבוצעה במערכת."
    },
    evidence: [
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 9.5.2 S4TWL - MRP in HANA, pp. 651-777",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE21,
        claim: "פריט 9.5.2 'S4TWL - MRP in HANA' (Application Component: PP-MRP; Related Notes: Business Impact 0002268085 'MRP Live on SAP HANA - MD01N') נפרש בעמ' 651 עד 777 של גרסת המסמך 1.36. טבלת 'Purpose / Classic BAdI or extension / AMDP BAdI / Comment' מודפסת במסמך זה כטקסט מסובב; pdftotext -raw מחלץ אותה במלואה, אך תו בכל שורה, ולכן התאמת מחרוזת מחייבת הסרת רווחים וירידות שורה לפני החיפוש (grep ישיר על הפלט מחזיר אפס תוצאות). בעמ' 656 (ושוב ברינדור ההמשך בעמ' 698, 702 ו-735) מופיעה השורה: Purpose 'User-defined MRP elements in MRP', Classic BAdI or extension 'MD_ADD_ELEMENTS', AMDP BAdI 'PPH_MRP_RUN_BADI => MDPS_ADJUST', ועמודת ה-Comment של שורה זו ריקה. באותה טבלה, שורת 'Reading material receipts and requirements' / 'MD_CHANGE_MRP_DATA' / 'PPH_MRP_RUN_BADI => MDPS_ADJUST' נושאת את ההערה 'Use BAdI MD_ADD_ELEMENTS for classic MRP transactions which are optimized for HANA'. הטקסט הרץ שלפני הטבלה (אותו רינדור; המשפט נפרש על פני עמ' 685 עד 686) קובע: 'If the planning transactions are optimized for HANA (like MD01, MD02, MD03, materials forced to classic MRP by MRP Live), then it is required to use an alternative ABAP BAdI. In this case BAdI MD_ADD_ELEMENTS has to be used to adjust the data determined by the HANA optimized reading processes.' ומיד אחריו: 'A new set of AMDP BAdIs will be available for MRP Live from SAP S/4HANA on-premise edition 1603. BAdI implementations of the classic MRP should be translated into AMDP BAdI implementations if still required. This affects the following BAdIs:'. באותה טבלה נמנית גם השורה 'Material selection for MRP run' / 'Extension M61X0001' / 'PPH_MRP_NETTING_BADI => AT_PLANNING_FILE_ENTRIES_READ' (עמ' 752). גודל הקובץ שנקרא, 10,585,218 בתים, זהה ל-content-length שמחזירה help.sap.com לכתובת זו.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2023 - Feature Pack Stack 3 and SAP S/4HANA Cloud Private Edition 2023 - Feature Pack Stack 3 (Document Version 1.35, 2025-02-25) · item 30.2 S4TWL - MRP in HANA, pp. 732-738",
        url: "https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023 FPS03",
        accessedAt: DATE21,
        claim: "במסמך של 2023 FPS3 אותו פריט (30.2, Application Components: PP-MRP, Business Impact note 2268085 'S4TWL - MRP Live on SAP HANA - MD01N') מודפס בפריסה רגילה וקריא ללא היפוך. עמ' 736 קובע: 'If the planning transactions are optimized for HANA (like MD01, MD02, MD03, materials forced to classic MRP by MRP Live), then it is required to use an alternative ABAP BAdI. In this case BAdI MD_ADD_ELEMENTS has to be used to adjust the data determined by the HANA optimized reading processes.', ומיד אחריו 'A new set of AMDP BAdIs will be available for MRP Live from SAP S/4HANA on-premise edition 1603. BAdI implementations of the classic MRP should be translated into AMDP BAdI implementations if still required. This affects the following BAdIs:'. באותו עמוד מופיעה שורת 'Reading material receipts and requirements' / 'MD_CHANGE_MRP_DATA' / 'PPH_MRP_RUN_BADI => MDPS_ADJUST' עם ההערה 'Use BAdI MD_ADD_ELEMENTS for classic MRP transactions which are optimized for HANA'. בעמ' 737 מופיעה השורה של ה-BAdI עצמו: Purpose 'User-defined MRP elements in MRP', Classic BAdI or extension 'MD_ADD_ELEMENTS', AMDP BAdI 'PPH_MRP_RUN_BADI => MDPS_ADJUST'. עמ' 736 קובע גם: 'Enhancements or BAdI implementations of the classic MRP run does not work with MRP Live if the material is supported/planned within MRP Live', ובהמשך שם: 'The second material B is not supported in MD01N and the planning run routes this material B into classic MRP. Therefore the existing classic BAdI implementation still can be used for material B'. גודל הקובץ שנקרא, 10,174,700 בתים, זהה ל-content-length שמחזירה help.sap.com לכתובת זו.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Material Requirements Planning | Operations Guide for SAP S/4HANA 1709",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/300497627ccc47bb9454af54ccf76a60/b53c01562b16612de10000000a441470.html?locale=en-US&state=PRODUCTION&version=1709.latest",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709.latest",
        accessedAt: DATE21,
        claim: "רשומת החיפוש הרשמית (loio b53c01562b16612de10000000a441470, deliverable 'Operations Guide for SAP S/4HANA 1709', versionId 1709.latest, תאריך פרסום 2025-06-25) נוקבת ב-BAdI בשמו: 'If you have and if the BAdI only adds data to MRP evaluations such as MD04, re-implement your BAdI implementations in BAdI MD_ADD_ELEMENTS' וכן 'Note The BAdI MD_ADD_ELEMENTS is processed in MRP evaluations such as MD04 or MD07 and is processed in the classic MRP transactions MD01 or MD02 or if you have set the Plan in Classic MRP indicator for' (הסניפט נקטע כאן). שאילתה אחרת על אותה רשומה מחזירה גם 'Check which materials require the processing of a BAdI during the MRP run and set the Plan in Classic MRP indicator for these materials'. זהו העמוד היחיד שמחזיר שירות החיפוש של help.sap.com במוצר SAP_S4HANA_ON-PREMISE עם השם MD_ADD_ELEMENTS בכותרת או בסניפט (6 תוצאות לשאילתה, חמש האחרות אינן מזכירות אותו). העמוד שייך למערך התיעוד של 1709 ולא לגרסה הנוכחית, וגופו לא נקרא (מעטפת JavaScript); כל הציטוטים כאן תחומים לסניפט.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג ההרחבות בשם של הפרויקט (EXITS), רשומת MD_ADD_ELEMENTS",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE21,
        claim: "רשומת הקטלוג: BAdI במודול PP בשם 'BAdI לאלמנטים ב-MD04', מטרה 'הוספת אלמנטי תכנון מותאמים לתצוגת מצב מלאי/דרישות (MD04)', נקודת הפעלה 'בעת בניית תצוגת MD04/MD05', אובייקט 'BAdI MD_ADD_ELEMENTS', טרנזקציות MD04 ו-SE19, דוגמה 'הצגת דרישות ממערכת תכנון חיצונית כאלמנט ב-MD04', ובבלוק ECC מול S/4HANA: 'נתמך.', 'Fiori Monitor Material Coverage מקביל.', שדה fiori 'Monitor Material Coverage' והערת הגירה 'QA: אלמנטים מותאמים ב-MD04/Fiori', עם דגל inferred. מכאן נגזר המעמד שהאפליקציה הציגה עד כה: 'משתנה ב-S/4HANA' לפי בלוק ECC מול S/4HANA (קיימת הערת שינוי), ברמת אימות 'נדרש אימות נוסף' בשל הדגל inferred. מטרת הרשומה עולה בקנה אחד עם עמודת Purpose שבטבלת פריט הפישוט ('User-defined MRP elements in MRP'), אך שלושה פרטים ברשומה אינם נתמכים במקורות שנקראו: (א) 'נתמך.' נאמר ללא ההסתייגות שפריט הפישוט קובע לגבי MRP Live ולגבי ההמרה ל-AMDP; (ב) נקודת ההפעלה 'MD04/MD05' נוקבת ב-MD05, שאינה מופיעה באף מקור רשמי שנקרא לגבי BAdI זה, ומשמיטה את MD07, MD01 ו-MD02 שהתיעוד הרשמי נוקב בהם; (ג) 'Fiori Monitor Material Coverage מקביל' מציג אפליקציית Fiori כמקבילה לנקודת הרחבה בקוד ABAP. אף מקור רשמי שנקרא אינו קובע שאלמנטים שנוספו דרך ה-BAdI מוצגים באפליקציות Fiori, ולפי דפי ההשוואה הרשמיים שתועדו ברשומת tx:MD04 השם Monitor Material Coverage - Net Segments (F0247A) משויך ל-MD07 ואילו Manage Material Coverage (F0251) ל-MD04.",
        verificationLevel: "repository_verified",
        repoRef: "data/exits.ts#MD_ADD_ELEMENTS"
      }
    ],
    xrefs: [
      "enh:exit:M61X0001",
      "enh:badi:MD_PLDORD_POST",
      "enh:technique:classic-badi",
      "enh:technique:new-badi",
      "tx:MD04",
      "tx:MD07",
      "tx:MD01",
      "tx:MD02",
      "tx:MD03",
      "tx:MD01N",
      "tx:SE19"
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה: שירות החיפוש הרשמי של SAP Help (scripts/sap-help-search.mjs, מוצר SAP_S4HANA_ON-PREMISE; השאילתות 'MD_ADD_ELEMENTS', 'BAdI MD_ADD_ELEMENTS MRP evaluations', 'User-defined MRP elements stock requirements list', 'Add Elements to Stock Requirements List BAdI', 'Enhancements MRP Business Add-In stock requirements list MD04', 'Plan in Classic MRP indicator materials BAdI', 'MRP Live BAdIs no longer supported', 'Custom Code MRP Live BAdI implementations AMDP', 'user-defined MRP elements BAdI classic MRP AMDP', 'PPH_MRP_RUN_BADI MDPS_ADJUST'), WebSearch מוגבל ל-help.sap.com / api.sap.com / fioriappslibrary / fal, וקריאת פריט 'S4TWL - MRP in HANA' משני קובצי ה-PDF של רשימות הפישוט. שלושת ה-URL שברשומה נפתרים ב-2026-09-21: שני קובצי ה-PDF מחזירים HTTP 200 עם content-length הזהה לגודל הקבצים שנקראו (10,585,218 ו-10,174,700 בתים), ועמוד מדריך התפעול מחזיר HTTP 200. נבדקו גם שני URL שאינם ראיה ברשומה: עמוד תוכן התמיכה ומדריך Advanced MD04. תיקון לממצא קודם בקטלוג: רשומת enh:exit:M61X0001 כותבת בהערותיה שטבלת ההרחבות ברשימת הפישוט של 2025 FPS1 'מודפסת כטקסט מסובב שאינו ניתן לחילוץ'. הטבלה אכן מסובבת, אך pdftotext -raw (בניגוד ל-pdftotext -layout) מחלץ אותה במלואה, אם כי תו בכל שורה, כך שיש להסיר רווחים לפני החיפוש: בקובץ 1.36 היא מופיעה בעמ' 656 ובחזרות רינדור בעמ' 685 עד 705 ובעמ' 729, 735 ו-752, ובה גם שורת MD_ADD_ELEMENTS (עמ' 656, 698, 702 ו-735) וגם שורת Extension M61X0001 (עמ' 729 ו-752); בעמ' 753 מתחילה כבר טבלת 'Table related information' של אותו פריט, והפריט עצמו מסתיים בעמ' 777 (פריט 9.5.3 'S4TWL - Storage Location MRP' פותח בעמ' 778). לכן הצמדת ה-AMDP מאושרת כאן גם מהמסמך הנוכחי של 2025 FPS01 ולא רק מזה של 2023 FPS3, ויש לעדכן את הערת M61X0001 בהתאם. לא נרשם successor: PPH_MRP_RUN_BADI והמתודה MDPS_ADJUST אינם אובייקטים ביקום המזהים של הפרויקט (data/exits.ts, lib/route-manifest.generated.ts), ומעבר לכך פריט הפישוט מציג את ה-AMDP BAdI כמקבילה שיש לממש כשהלוגיקה נדרשת ב-MRP Live, ולא כאובייקט שמבטל את ה-BAdI הקלאסי. מקורות רשמיים נוספים שנראו ולא צורפו כראיה: 'MRP Live: Incompatible Changes' (loio 1d4ee5514ec5c90ae10000000a44176d, 2025.001), שהסניפט שלו קובע 'BAdIs no Longer Supported. MRP Live (transaction MD01N) does not process BAdIs for materials that are completely planned in SAP HANA' אך אינו נוקב ב-MD_ADD_ELEMENTS; 'Information and Settings for Materials in MRP on HANA' (loio fea55f5353496655e10000000a423f68, 2025.001) ו-'When to Plan in MRP Live and When to Plan with Classic MRP' (loio 8b1f7d5128f6563ce10000000a423f68, 2025.001), העוסקים בסימון Plan in Classic MRP בטרנזקציה md_mrp_force_classic ומפנים ל-SAP Note 1914010; ושתי רשומות Retail בגרסה 2025.001 ('Seasons in Planned Orders', loio 9a84e8f5276f459d9494a0119a4cf865, ו-'Seasons in Purchase Requisitions', loio cfa1f8237bcb4e92b2e2d54d0c16aa5b) המאשרות ש-PPH_MRP_RUN_BADI מתועד בגרסה הנוכחית עם המתודות PLANORD_BEFORE_UPDATE_ADJUST ו-PURREQ_BEFORE_UPDATE_ADJUST; אף אחת מהן אינה נוקבת במתודה MDPS_ADJUST, ששמה מגיע מטבלת פריט הפישוט בלבד. מה לא אומת: שם ממשק ה-BAdI, שמות המתודות והפרמטרים של MD_ADD_ELEMENTS, האם הוא Filter-enabled או Multiple-use, והאם הוא מתוחזק ב-SE18 או ב-SE19 (רשומת המאגר נוקבת ב-SE19 בלבד); אף מקור רשמי שנקרא אינו נוקב בהם, ואימותם דורש SE18/SE19 או ADT במערכת S/4HANA חיה. נקודת ההפעלה MD05 שברשומת המאגר לא אושרה ולכן tx:MD05 אינו ב-xrefs, כפי שנעשה גם ברשומת M61X0001 לגבי MD02. אפליקציות Fiori אינן ב-xrefs מאותו טעם. עמוד תוכן התמיכה 'User exits and BADIs of MRP' (help.sap.com/docs/SUPPORT_CONTENT/mrp/3138698509.html) הורד ב-2026-09-21, מחזיר HTTP 200 אך גופו ריק (1,160 בתים של מעטפת JavaScript, ללא טקסט תוכן כלשהו), ולכן לא צוטט. מדריך 'Advanced MD04' (help.sap.com/doc/2d1f4f3d24da48d7b3d0d842e7c0ab2d/2022.1/en-US/MD4_EN.pdf) הורד ונסרק כטקסט מלא: אפס מופעים של MD_ADD_ELEMENTS, והוא ממילא שייך למוצר נפרד (Advanced MD04) ולא ל-S/4HANA On-Premise. גופי עמודי ה-Help לא נקראו (מעטפת JavaScript); כל ציטוט מהם תחום לכותרת ולסניפט של רשומת החיפוש, ושני פריטי הפישוט נקראו מקובצי ה-PDF. ה-MCP למערכת ABAP לא היה זמין בהרצה זו, ולכן לא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer: אף רשומה ב-data/verification/** אינה נושאת אותו."
  },
  {
    id: "enh:technique:substitution-validation",
    aliases: [
      "Substitution & Validation",
      "Substitution and Validation",
      "Validations, Substitutions, and Rules",
      "Validation/Substitution"
    ],
    status: {
      status: "unchanged",
      he: "התיעוד הרשמי של SAP S/4HANA On-Premise 2025 FPS01 ממשיך לתעד את הטכניקה בשני מדריכים: נושא 'Validations, Substitutions, and Rules' במדריך Special Purpose Ledgers מגדיר אותה כתוכנת ולידציה והחלפה הפועלת בזמן הזנת הנתונים ב-FI-SL ובמערכות SAP נוספות, ונושא 'Validation and Substitution' במדריך Controlling (CO) נוקב בנתיב ההגדרה שלה תחת Account Assignment Logic. ההמשכיות בין ECC ל-S/4HANA נמדדה ולא הוסקה: loio 700ad553088f4308e10000000a174cb4 של נושא ה-CO מוגש גם תחת SAP ERP עם תווית הגרסה '6.0 EHP8 Latest' (versionId 6.18.latest), וכך גם נושאי Validation / Substitution: Overview,‏ Application Areas ו-Setting the User Exit File Name; הנושא Using the Analysis Tool חזר פעם ב-6.18.latest ופעם ב-6.17.latest. רשימת הפישוט הציבורית לגרסת 2025 FPS01, שחולצה כטקסט מלא (1,514 עמודים), אינה נוקבת ב-GGB0, ב-GGB1, ב-OB28 או ב-OKC7 באף מקום. פריט הפישוט היחיד הנוגע למסגרת שבה מתועדת הטכניקה, 6.1.32 S4TWL - Special Purpose Ledger, פותח דווקא בהגבלה: 'The usage of special purpose ledger is partly included in the SAP S/4HANA compatibility scope, which comes with limited usage rights', ומפנה להערה 2269324 ולמזהה 430 במטריצת התאימות; מיד לאחר מכן הוא מבחין בין השימושים ובין המסגרת עצמה וקובע 'Generally, special purpose ledger as framework is not part of compatibility scope, which means it will be available and supported beyond the compatibility scope expiry date'. ההגבלות שהפריט מונה נוגעות לספרים שהוגדרו ליישומים שבהיקף התאימות (EC-PCA planning, Cost of Sales ledger, Consolidation preparation) ואינן נוקבות בוולידציות, בהחלפות או בקודי הטרנזקציה שלהן. 'ללא שינוי' נאמר כאן במובן צר: המשכיות התיעוד, נתיבי ההגדרה והיעדר פריט פישוט הנוקב בטכניקה, ולא קביעה שכל כלל קיים עובר המרה ולא קביעה על מעמד התאימות של ספרים מסוימים. עמוד ה-CO עצמו מסייג שהמערכת אינה ממירה כללי החלפה וולידציה בשלמותם עבור טרנזקציות עסקיות פנימיות ב-CO ובהן יישוב הזמנות.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Validations, Substitutions, and Rules | Special Purpose Ledgers",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b6995ca88c524372b0609345b693f8d5/73a4c4530b29b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Validations, Substitutions, and Rules' מתוך המדריך Special Purpose Ledgers לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio 73a4c4530b29b44ce10000000a174cb4) מגדיר את הטכניקה: 'With the validations and substitutions software, you can validate and/or substitute data at the time of entry in the FI-SL System and other SAP Systems'. הסניפט ממשיך: 'Validation rules are stored in the Rule Manager; as data is entered, the Integration Manager validates the data against the validation rules stored in the Rule Manager' ו-'Substitution Substitution rules are stored in the Rule Manager. When data is entered in the system, it is substituted by the Integration Manager. The Integration Manager calls the Rule Manager'. שני הקטעים התקבלו משתי שאילתות נפרדות של אותה רשומה, שכן חלון הסניפט משתנה לפי השאילתה. הסניפט אינו נוקב בקוד טרנזקציה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "בפרויקט מיגרציה יש לרשום תחילה את כל הוולידציות וההחלפות הפעילות לפי אזור יישום ונקודת קריאה (Application Area / Callup Point) ולאמת במערכת המותקנת אילו מהן עדיין נדרשות. עמוד ה-Controlling לגרסת 2025 FPS01 מסייג במפורש שהמערכת אינה ממירה כללי החלפה וולידציה בשלמותם עבור טרנזקציות עסקיות פנימיות ב-CO ובהן יישוב הזמנות, ולכן כללים הנוגעים ליישוב הזמנת תחזוקה או פקודת תהליך דורשים בדיקה ידנית ובדיקת רגרסיה אחרי ההמרה. כלל המסתמך על User Exit מסוג FORM routine דורש אימות נפרד של שם ה-form pool בטבלת T80D. אם הכלל מוגדר על ספר ייעודי שהוגדר ליישום שנמצא בהיקף התאימות, יש לבדוק את פריט הפישוט 6.1.32 ואת הערה 2269324 לפני שנשענים עליו לטווח ארוך. לתרחיש הרחבה חדש הנוגע לרישומי FI כדאי לבחון תחילה את היישום Manage Substitution/Validation Rules, שתיעוד ה-Finance של 2025 FPS01 מונה אותו בין אפשרויות ההרחבה, ולבדוק בעמוד ההקשרים העסקיים שלו אם ההקשר הדרוש נתמך. כל קוד טרנזקציה וכל כלל ספציפי דורשים אימות במערכת SAP המותקנת."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Validations, Substitutions, and Rules | Special Purpose Ledgers",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/b6995ca88c524372b0609345b693f8d5/73a4c4530b29b44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Validations, Substitutions, and Rules' מתוך המדריך Special Purpose Ledgers לגרסת SAP S/4HANA On-Premise 2025 FPS01 (loio 73a4c4530b29b44ce10000000a174cb4) מגדיר את הטכניקה: 'With the validations and substitutions software, you can validate and/or substitute data at the time of entry in the FI-SL System and other SAP Systems'. הסניפט ממשיך: 'Validation rules are stored in the Rule Manager; as data is entered, the Integration Manager validates the data against the validation rules stored in the Rule Manager' ו-'Substitution Substitution rules are stored in the Rule Manager. When data is entered in the system, it is substituted by the Integration Manager. The Integration Manager calls the Rule Manager'. שני הקטעים התקבלו משתי שאילתות נפרדות של אותה רשומה, שכן חלון הסניפט משתנה לפי השאילתה. הסניפט אינו נוקב בקוד טרנזקציה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Validation and Substitution | Controlling (CO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/5e23dc8fe9be4fd496f8ab556667ea05/700ad553088f4308e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "עמוד 'Validation and Substitution' מתוך המדריך Controlling (CO) לגרסת S/4HANA On-Premise 2025 FPS01 (loio 700ad553088f4308e10000000a174cb4) נוקב בנתיב ההגדרה: 'You make the settings for validation and substitution in Customizing for Controlling, under Controlling General Account Assignment Logic Define Validation or Define Substitution', ומוסיף 'Validation and Substitution Use You can validate or substitute data directly at the input stage' ו-'Note Substitution and validation are only intended for actual postings'. חלון סניפט נוסף של אותה רשומה מוסיף את הסייג 'The SAP System cannot convert substitutions or validation rules completely for the following CO-internal business transactions: Order settlement Assessment, distribution, periodic reposting, indirect activity' (הסניפט נקטע כאן). בסניפט המקורי מופיעים רצפי nbsp בין פריטי נתיב ההגדרה, וצוטטו כאן כרווחים. אותו loio מוגש גם תחת SAP ERP עם תווית הגרסה '6.0 EHP8 Latest' (versionId 6.18.latest) במדריך Cost Center Accounting (CO-OM-CCA). גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Set values are overwritten when transport validation and substitution | Financial Accounting",
        url: "https://help.sap.com/docs/SUPPORT_CONTENT/fiaccounting/3361880664.html?locale=en-US&state=PRODUCTION&version=1.0",
        product: "Support Content",
        edition: "on-premise",
        release: "1.0",
        accessedAt: DATE21,
        claim: "רשומת תוכן התמיכה של SAP בפורטל help.sap.com בשם 'Set values are overwritten when transport validation and substitution' (המדריך Financial Accounting, המוצר Support Content בגרסה 1.0, loio 3361880664, תאריך 2026-07-01) היא המקור הרשמי היחיד שנמצא הנוקב בשלושת קודי הטרנזקציה שרשומת המאגר מונה, והיא עושה זאת במשפט אחד: 'However, there is a default check on \"Transport Sets\" within validation and substitutions steps (GGB1, GGB0, OB28, OBBH)'. המשפט מונה את הקודים כשלבים של ולידציה והחלפה ואינו מייחס קוד מסוים לפעולה מסוימת. הרשומה היא תוכן תמיכה ואינה תיעוד מוצר הקשור לגרסת S/4HANA מסוימת, והערכים edition ו-release נרשמו כאן רק משום שהסכימה דורשת אותם. גוף העמוד לא נקרא: הבדיקה הראתה שהעמוד מוגש כמעטפת JavaScript בת 1,160 בתים ללא טקסט גוף.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 6.1.32 S4TWL - Special Purpose Ledger, pp. 247-248",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.latest",
        accessedAt: DATE21,
        claim: "רשימת הפישוט הציבורית לגרסת 2025 FPS01 (גרסת מסמך 1.36, 1,514 עמודים) הורדה, חולצה כטקסט מלא ונסרקה: אין בה אף מופע של 'GGB0', של 'GGB1', של 'OB28' או של 'OKC7'. המחרוזת 'substitution' מופיעה שש פעמים בלבד, כולן בהקשרים אחרים: פריט 13.17.22 S4TWL - Substitution of IS-U Backlog Reduction Engine by BPEM, החלפת פריטי תצורה ב-Variant Configuration, ההחלפות המוגדרות ב-OKC9 בתוך פריט 6.5.11 S4TWL - Profitability Analysis, ומודרניזציה של כללי היישוב של רכיבי WBS ב-OPS_PS_CI_1. פריט הפישוט היחיד הנוגע למסגרת שבה מתועדת הטכניקה הוא 6.1.32 S4TWL - Special Purpose Ledger (עמ' 247 עד 248, רכיב יישום FI-SL, הערת ההשפעה העסקית מופיעה בקובץ כ-'0003015013'). הפריט פותח בהגבלה: 'The usage of special purpose ledger is partly included in the SAP S/4HANA compatibility scope, which comes with limited usage rights', מפנה להערה 2269324 ולמזהה 430 במטריצת התאימות, ורק אז מבחין בין השימושים ובין המסגרת: 'Generally, special purpose ledger as framework is not part of compatibility scope, which means it will be available and supported beyond the compatibility scope expiry date'. הפריט מגביל ספרים מסוימים (EC-PCA planning, Cost of Sales ledger, Consolidation preparation) ואינו נוקב בוולידציות, בהחלפות או בקודי הטרנזקציה שלהן. שני מספרי ההערות שצוטטו כאן נקראו בתוך קובץ ה-PDF עצמו ולא הוזנו מזיכרון.",
        verificationLevel: "sap_official_verified"
      }
    ],
    xrefs: ["enh:technique:user-exit", "enh:technique:key-user-extensibility", "tx:KO88"],
    lastVerifiedAt: DATE21,
    notes: "שיטה: שאילתות ב-scripts/sap-help-search.mjs תחת SAP_S4HANA_ON-PREMISE, SAP_ERP, SAP_S4HANA_CLOUD ו-SUPPORT_CONTENT, שני חיפושי רשת מוגבלים לדומיינים הרשמיים, הורדה וחילוץ טקסט מלא של קובץ רשימת הפישוט, ובדיקת HTTP אחת של עמוד תוכן תמיכה, כולן ב-2026-09-21. מה שאומת מול המקור: השם, ההגדרה והבסיס הבוליאני של הטכניקה בתיעוד 2025 FPS01; נתיב ההגדרה ב-Controlling; הסייג על המרה חלקית של כללים בטרנזקציות פנימיות ב-CO ובהן יישוב הזמנות; קיומם של שלושת קודי הטרנזקציה GGB1, GGB0 ו-OB28 בעמוד תוכן תמיכה אחד; והיעדר פריט פישוט הנוקב בטכניקה או בקודיה. רשומות רשמיות נוספות שנראו ולא צוטטו כראיה: 'Validation / Substitution: Overview' (2025.001, loio 3bbed953189a424de10000000a174cb4), 'What Are Validations?' (loio 25bed953189a424de10000000a174cb4), 'What Are Substitutions?' (loio 71d0d7537c98424de10000000a174cb4), 'Validation/Substitution Callup Points' (loio 30bed953189a424de10000000a174cb4), 'Boolean Classes' (loio 33bed953189a424de10000000a174cb4, הנוקב בשדות COBK ו-COBL), 'Boolean Logic Statements and Rules' (loio 2abed953189a424de10000000a174cb4), 'Application Areas' (loio 2dbed953189a424de10000000a174cb4, המונה את אזורי היישום AM, CO, CS, FI, GL, LC, PC ואחרים), 'User Exits in Validations/Substitutions/Rules' (loio 0bacc2531bb9b44ce10000000a174cb4, שבסניפטים שלו מופיעים גם 'User exits are user-defined FORM routines that are used to calculate and/or replace values within a validation, substitution, or rule' וגם 'Table T80D contains the form pool names for the user exits used in validations, substitutions, and rules') ו-'Setting the User Exit File Name' (loio aebed953189a424de10000000a174cb4: 'The form pool name of the user exit is configurable and must be stored in the table for client-dependent user exits (table T80D) in Customizing'), כולם במדריך Special Purpose Ledgers לגרסת 2025.001; 'Extensibility Options for Finance' (FI-GL, 2025.001, loio 266cb949a0414d1bb30c4a6550d55835) המונה 'Substitution/Validation Rules Use rules to fill fields automatically or to substitute and validate field values automatically using the Manage Substitution/Validation Rules app'; ועמוד הלוקליזציה 'Customizing for Payment Release List and Payment Program' (China, 2025.001, loio 817949523e85d130e10000000a44538d) שהוא תיעוד המוצר היחיד שנמצא הנוקב בקוד OB28, בניסוח 'Validation in Accounting Documents (transaction ob28)' באותיות קטנות. ייחוס הקודים לפעולות נשען על עמודי תוכן תמיכה נוספים שנראו ולא צוטטו: loio 3361881895 ('Go to GGB0 - To maintain the validations' ובחלון סניפט אחר 'Define Validations for Posting Go to OB28'), loio 3361878698 ('GGB0: Define Validation GGB4: Activate Validation GCT9: Transport Validation'), loio 3361880922 של המדריך Financials - Controlling ('Go to transaction GGB1 and see under the node profit center accounting' בהקשר החלפת מרכז רווח), ו-loio 3363505912 הנוקב ב-'T Code OKC7'. סתירה לכאורה שנבדקה ויושבה: חלון סניפט אחד של עמוד 'Transaction code list' (loio 3361880659) משטח את הטבלה לכדי 'Validation Maintenance GGB1 Substitution Maintenance GGB3 Maintain Boolean Class GGB4' ונראה כמצמיד שם לקוד הלא נכון, אך חלון סניפט רחב יותר של אותה רשומה מגיש 'GD64 Code combinations deactivation GGB0 Validation Maintenance GGB1 Substitution Maintenance GGB3 Maintain', כלומר הקוד מקדים את תיאורו והטבלה תואמת ל-GGB0 = Validation Maintenance ול-GGB1 = Substitution Maintenance; תימוכין נוסף בעמוד 'SAP Profit Center relevant T-codes' (loio 3361880916): 'OBBH - C FI Maintain Table T001Q (Document) GGB1 ... - Substitution Maintenance'. ייחוס GGB0 לוולידציה ו-GGB1 להחלפה נתמך אפוא בעמודי תוכן התמיכה, ועדיין אינו מופיע באף עמוד של תיעוד המוצר של S/4HANA. מה שלא אומת: אף עמוד רשמי שנמצא אינו מקשר ולידציה או החלפה להזמנת תחזוקה או לפקודת תהליך, ולכן שתי הדוגמאות שברשומת המאגר ('אימות ייחוס חשבונאי בהזמנת אחזקה', 'החלפת מרכז רווח בעלות פק\"ע') נשארות ברמת המאגר ולא נכתבו בסטטוס; הקביעה שברשומת המאגר שלפיה 'חלק מההחלפות מומרות ל-BAdI/BRF+' לא נתמכה באף מקור רשמי שנמצא, ואף עמוד אינו קובע ש-BRF+ מחליף את הטכניקה; הטרנזקציה OKC7 שברשומת המאגר מופיעה בעמוד תוכן תמיכה אחד בלבד ולא בתיעוד המוצר. היישום Manage Substitution/Validation Rules נמצא בתיעוד 2025.001 של FI-GL, Group Reporting, Financial Planning and Analysis ו-Service, ומזהה היישום F4406 מופיע ברשומת S/4HANA Cloud (loio 5c8c2825535f4e3aa9b7f716a0085221, versionId 2608.500, 'Manage Substitution/Validation Rules App ID: F4406') ובספריית יישומי Fiori; אף עמוד רשמי שנמצא אינו קובע שהיישום מחליף את GGB0 או את GGB1, ולכן אין כאן סטטוס 'הוחלף' ואין successor. מזהי F4406, F4407, F7818 ו-F4886 אינם קיימים בקטלוג ה-Fiori של הפרויקט (data/fiori/apps.ts, עשרים מזהים) ולכן אינם xrefs. קודי הטרנזקציה GGB0, GGB1, OB28 ו-OKC7 אינם קיימים ב-lib/route-manifest.generated.ts ולכן אינם מופיעים כ-xrefs אף שהם מצוטטים בראיה השלישית; ה-xref ל-tx:KO88 נסמך על הסייג בעמוד ה-CO הנוקב בטרנזקציה העסקית 'Order settlement' ולא בקוד הטרנזקציה עצמו, וקוד KO88 נבחר משום שהוא קוד יישוב ההזמנות בקטלוג הפרויקט. הטבלאות COBK, COBL ו-T80D המצוטטות בעמודים הרשמיים אינן קיימות בקטלוג הטבלאות של הפרויקט ולכן אינן xrefs. פריט 6.5.1 S4TWL - TECHNICAL CHANGES IN CONTROLLING ברשימת הפישוט קובע שלא ניתן עוד להסיר את הדגל 'CoCd Validation' באזור הבקרה; זו בדיקת קוד חברה ולא כלל ולידציה שהמשתמש מגדיר, ולכן לא נכתב כראיה. מעמד הטכניקה ב-SAP S/4HANA Cloud Public Edition לא נקבע: חיפוש תחת SAP_S4HANA_CLOUD לא החזיר אף רשומה הנוקבת ב-GGB0 או ב-GGB1, וזהו ממצא תחום בחיפוש ולא קביעה של אי-זמינות. שירות החיפוש אינו יציב לגבי תווית הגרסה של loio c3bed953189a424de10000000a174cb4 ('Using the Analysis Tool') תחת SAP_ERP: שאילתה אחת החזירה 6.18.latest ואחרת 6.17.latest; ארבעת ה-loio האחרים חזרו עקבית ב-6.18.latest. גוף עמודי help.sap.com לא נקרא (מעטפת JavaScript), למעט קובץ ה-PDF של רשימת הפישוט שנסרק במלואו; כל טענה רשמית כאן תחומה בכותרת ובסניפט של רשומת החיפוש. לא נרשם מספר הערת SAP או KBA בשדה ייעודי: שני המספרים שנקראו בפועל (0003015013 כהערת ההשפעה העסקית של פריט 6.1.32, ו-2269324 כהערת היקף התאימות שאליה הפריט מפנה) נוגעים למסגרת ולהיקף התאימות ולא לטכניקה עצמה, ומספר ההערה על אפשרויות ההרחבה ב-Finance (2453614) מופיע בסניפט של loio 266cb949a0414d1bb30c4a6550d55835 אך לא אומת מול תוכן ההערה, שדורש התחברות S-user. הסטטוס הנגזר שהאפליקציה הציגה לפני רשומה זו היה 'משתנה ב-S/4HANA', משום ש-components/neo-shell/reference/enh-data.ts קורא ל-fromEccS4Block עם השדה s4 כ-changed, ו-fromEccS4Block (lib/evidence/s4-status.ts) ממפה כל טקסט לא ריק בשדה s4 ל-changed. אימות GGB0, GGB1 או OB28 במערכת חיה לא בוצע: ה-MCP ל-ABAP לא היה זמין. הרשומה אינה נושאת שדה reviewer, לפי המוסכמה בכל קבצי data/verification."
  },
  {
    id: "enh:technique:transaction-variant",
    aliases: ["Transaction Variant", "Screen Variant", "Transaction and Screen Variants"],
    status: {
      status: "unchanged",
      he: "התיעוד הרשמי ממשיך לתעד את טכניקת וריאנט הטרנזקציה והמסך בגרסה הנוכחית ובאותו שם: העמוד Transaction Variants and Screen Variants במדריך Changing the SAP Standard (BC) מוגש בתיעוד ABAP platform לגרסת 2025 FPS01, מסווג את וריאנט הטרנזקציה והמסך כ-Customizing מבחינת ההתנהגות בשדרוג ובהעברה, ומפנה לטרנזקציה SHD0. באותו מדריך ובאותה גרסה, העמוד Variant Transactions מסווג דווקא Modification את טרנזקציית הווריאנט שמנגישה את הווריאנט למשתמשים, ולכן הסיווג Customizing אינו חל על כל שלבי המימוש. הרצף מול ECC נמדד על אותו נושא תיעוד עצמו: העמוד Definition of Variants (loio 3c05b753128eb44ce10000000a174cb4) מוגש גם בתיעוד SAP ERP 6.0 EHP8 תחת הספר Production Planning - Process Industries (PP-PI) וגם בתיעוד SAP S/4HANA On-Premise 2025 FPS01 תחת הספר Production Planning and Control, ובשתי הגרסאות מופיעה אותה דוגמה המגדירה וריאנט טרנזקציה בטרנזקציה SHD0. בתחזוקת מפעל, העמוד Customizing for Partners בספר Orders (CS-SE/PM-WOC-MO) לגרסת 2025 FPS01 עדיין מנחה להגדיר וריאנט טרנזקציה ולשייך אותו לפונקציית שותף. הקביעה 'ללא שינוי' מתייחסת כאן להמשכיות התיעוד, לשם הטכניקה, לטרנזקציה SHD0, לסיווגים ולדוגמאות היישום בתעשיות תהליכיות ובתחזוקת מפעל בלבד, ולא להצהרת SAP על מעמד הטכניקה בהמרה. לא אותרה רשומת What's New ולא פריט פישוט הנוגעים לטכניקה, ולא אותר עמוד רשמי הקובע שהטכניקה חלה על יישומי Fiori.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Definition of Variants | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/3c05b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "העמוד Definition of Variants בספר Production Planning and Control של SAP S/4HANA On-Premise לגרסת 2025 FPS01 (loio 3c05b753128eb44ce10000000a174cb4, תאריך 2026-02-24) מונה את וריאנט הטרנזקציה בין טכניקות ההתאמה של עיבוד המוני ושל מערכת מידע ההזמנות, ומדגים את הגדרתו. שלושה חלונות סניפט משלוש שאילתות נפרדות: (1) 'Defining a transaction variant Using transaction SHD0, you define the transaction variant Z_LV01_01 for report transaction Z_LV01_T. You hide the Production orders and Planned orders fields'; (2) 'Variant transaction A variant transaction is used to call up a transaction variant (see Maintaining Transactions and Variant Transactions )' ולאחריו 'Defining a variant transaction Using transaction SE93, you define the variant transaction ZLV01 for transaction variant Z_LV01_01 of report transaction Z_LV01_T.', וכן 'You can put together user-dependent report variants, report transactions, and variant transactions to provide every user with the exact range of functions required'; (3) 'Transaction for process order: COHVPI Logistics Production - Process Process Order Tools Mass Processing Report variant Report : PPIO_ENTRY, Variant : SAP&HVOM or SAP&HVOMPI Order Information' וכן 'Transaction for process order: COOISPI'. אותו חלון סניפט, בשאילתה זהה, חזר גם מהרשומה התאומה של אותו נושא בספר Production Orders (PP-SFC) באותה גרסה (loio 3c05b753128eb44ce10000000a174cb4-431), ובשתיהן הופיע גם הניסוח 'Transaction variants With a transaction variant (see Maintaining Transactions and Variant Transactions ) you can also hide fields or specify default values for them (for example, the parameters for mass' (נקטע). הסניפט אינו מתייחס להזמנת תחזוקה ואינו אומר דבר על יישומי Fiori. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "להתאמת מסכים ללא קוד בטרנזקציות SAP GUI של תחזוקת מפעל ושל תעשיות תהליכיות, הנתיב המתועד בגרסת 2025 FPS01 הוא הגדרת הווריאנט בטרנזקציה SHD0 והנגשתו למשתמשים דרך טרנזקציית וריאנט הנוצרת ב-SE93, כפי שהעמוד Definition of Variants מדגים בהקשר של פקודות התהליך (COHVPI לעיבוד המוני, COOISPI למערכת מידע ההזמנות). בתחזוקת מפעל, כאשר המטרה היא כתובת שותף נוספת בהזמנה, ההנחיה הרשמית לגרסת 2025 FPS01 היא להגדיר וריאנט טרנזקציה ולשייך אותו לפונקציית השותף תחת הנתיב General Settings, Field Display Characteristics, Configure Application Transaction Fields. שים לב שהעמוד Variant Transactions באותו מדריך ובאותה גרסה מסווג את שלב ה-SE93 כ-Modification מבחינת ההתנהגות בשדרוג ובהעברה, בשונה מהווריאנט עצמו שמסווג Customizing, ויש לתכנן את שלב זה בהתאם. לפני מימוש לעבור על מגבלות הטכניקה בעמוד Transaction Variants and Screen Variants: Restrictions שבאותו מדריך: לא ניתן להוסיף אלמנטים חדשים למסך באמצעות וריאנט טרנזקציה או וריאנט מסך, ולא ניתן לאחד מסכים. הנחיית הפרויקט, ולא קביעה של SAP: מכיוון שאף מקור רשמי שנבדק אינו נוקב בחלופה, הוספת שדה חדש נשארת משימה של הרחבת Key User או של הרחבה קלאסית, ויש לאמת זאת מול התיעוד הרלוונטי לפני החלטה. שמות הווריאנטים, מספרי המסכים וההקצאות תלויים בגרסה ובחבילת התמיכה ויש לאמת אותם ב-SHD0 במערכת לפני ההטמעה."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Transaction Variants and Screen Variants | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/2b28ffa716c24348903f8ffbfeb81df8/bfec07845db911d295ae0000e82de14a.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001 (ABAP platform 2025 FPS01)",
        accessedAt: DATE21,
        claim: "בתיעוד ABAP platform לגרסת 2025 FPS01 (versionId 202510.001), העמוד Transaction Variants and Screen Variants במדריך Changing the SAP Standard (BC) (loio bfec07845db911d295ae0000e82de14a) מגדיר את הטכניקה ואת סיווגה. הסניפט שהוחזר תחת מוצר זה: 'SHD0) More Information Transaction Variants and Screen Variants' וכן 'Transaction Variants and Screen Variants Type (Behavior at Upgrade, Transport) Customizing Description of Function Transaction variants simplify transaction flow by: Inserting default values in' (הסניפט נקטע ומתחדש) 'fields Changing the ready-for-input status of fields Hiding various screen elements and menu functions,' (נקטע). כלומר תיעוד ABAP platform לגרסת 2025 FPS01 עדיין מתעד את הטכניקה באותו שם, מסווג אותה כ-Customizing מבחינת התנהגות בשדרוג ובהעברה, ומפנה לטרנזקציה SHD0. הסניפט אינו קובע שגרסה זו של ABAP platform היא הפלטפורמה שמתחת ל-SAP S/4HANA 2025, וקישור זה אינו נלמד מהמקור. הסניפט אינו נוקב בגרסת S/4HANA ואינו מתייחס לתחזוקת מפעל או לתעשיות תהליכיות. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Definition of Variants | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/3c05b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "העמוד Definition of Variants בספר Production Planning and Control של SAP S/4HANA On-Premise לגרסת 2025 FPS01 (loio 3c05b753128eb44ce10000000a174cb4, תאריך 2026-02-24) מונה את וריאנט הטרנזקציה בין טכניקות ההתאמה של עיבוד המוני ושל מערכת מידע ההזמנות, ומדגים את הגדרתו. שלושה חלונות סניפט משלוש שאילתות נפרדות: (1) 'Defining a transaction variant Using transaction SHD0, you define the transaction variant Z_LV01_01 for report transaction Z_LV01_T. You hide the Production orders and Planned orders fields'; (2) 'Variant transaction A variant transaction is used to call up a transaction variant (see Maintaining Transactions and Variant Transactions )' ולאחריו 'Defining a variant transaction Using transaction SE93, you define the variant transaction ZLV01 for transaction variant Z_LV01_01 of report transaction Z_LV01_T.', וכן 'You can put together user-dependent report variants, report transactions, and variant transactions to provide every user with the exact range of functions required'; (3) 'Transaction for process order: COHVPI Logistics Production - Process Process Order Tools Mass Processing Report variant Report : PPIO_ENTRY, Variant : SAP&HVOM or SAP&HVOMPI Order Information' וכן 'Transaction for process order: COOISPI'. אותו חלון סניפט, בשאילתה זהה, חזר גם מהרשומה התאומה של אותו נושא בספר Production Orders (PP-SFC) באותה גרסה (loio 3c05b753128eb44ce10000000a174cb4-431), ובשתיהן הופיע גם הניסוח 'Transaction variants With a transaction variant (see Maintaining Transactions and Variant Transactions ) you can also hide fields or specify default values for them (for example, the parameters for mass' (נקטע). הסניפט אינו מתייחס להזמנת תחזוקה ואינו אומר דבר על יישומי Fiori. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Definition of Variants | Production Planning - Process Industries (PP-PI)",
        url: "https://help.sap.com/docs/SAP_ERP/698b19fa88b846359bc611f11184c810/3c05b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest (SAP ERP 6.0 EHP8)",
        accessedAt: DATE21,
        claim: "אותו מזהה נושא (loio 3c05b753128eb44ce10000000a174cb4) מוגש גם בתיעוד SAP ERP 6.0 EHP8, תחת הספר Production Planning - Process Industries (PP-PI), עם אותו תוכן: 'Defining a transaction variant Using transaction SHD0, you define the transaction variant Z_LV01_01 for report transaction Z_LV01_T. You hide the Production orders and Planned orders fields' וכן 'Techniques Used Report variants With a report variant, (see Variant Maintenance ) you can specify default values for fie' (הסניפט נקטע). זו הראיה לצד ה-ECC של ההשוואה: אותו נושא תיעוד, אותה טרנזקציה SHD0 ואותה דוגמה, מוגשים גם בתיעוד SAP ERP וגם בתיעוד SAP S/4HANA On-Premise 2025 FPS01. הסניפט אינו אומר דבר על מעבר ל-S/4HANA. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Customizing for Partners | Orders (CS-SE/PM-WOC-MO)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/efc7922405fd4d56b7571930c5eaa798/90dfb65334e6b54ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE21,
        claim: "בספר Orders (CS-SE/PM-WOC-MO) של SAP S/4HANA On-Premise לגרסת 2025 FPS01, העמוד Customizing for Partners (loio 90dfb65334e6b54ce10000000a174cb4) מנחה להשתמש בטכניקה בהקשר של הזמנת תחזוקה ושירות: 'You define a transaction variant for the transaction in which an additional partner address is to be entered' ו-'Afterwards, you assign the transaction variant to the respective partner function General Settings Field Display Characteristics Configure Application Transaction Fields You can create a transaction' (הסניפט נקטע ומתחדש) 'variant per partner function, which defines the'. חלון סניפט נוסף מאותה רשומה מוסיף: 'Selection for List Display of Address Data There is an additional partner address per partner function in the order'. הסניפט אינו נוקב בקודי הטרנזקציות IW31 או IW32 ואינו נוקב בשם הווריאנט. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Transaction Variants and Screen Variants: Restrictions | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/2b28ffa716c24348903f8ffbfeb81df8/7df63a1c015111d396480000e82de14a.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001 (ABAP platform 2025 FPS01)",
        accessedAt: DATE21,
        claim: "העמוד Transaction Variants and Screen Variants: Restrictions באותו מדריך Changing the SAP Standard (BC) של ABAP platform לגרסת 2025 FPS01 (loio 7df63a1c015111d396480000e82de14a) מונה את מגבלות הטכניקה. הסניפט: 'Additional Screen Elements You cannot use transaction variants and screen variants to add additional elements to a screen' וכן 'Consolidating Screens You cannot use transaction variants to hide fields in various screens and subsequently consolidate these screens into a single new screen' וכן 'No Screen Sequence Control in Transaction Variants Function codes are only stored in transaction variants if a screen is to be hidden using a variant'. זו הראיה למגבלה שבשדה ההמלצה. הסניפט אינו נוקב בחלופה להוספת שדה ואינו מתייחס לתחזוקת מפעל או לתעשיות תהליכיות. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Variant Transactions | Changing the SAP Standard (BC)",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/2b28ffa716c24348903f8ffbfeb81df8/bfec07875db911d295ae0000e82de14a.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001 (ABAP platform 2025 FPS01)",
        accessedAt: DATE21,
        claim: "העמוד Variant Transactions באותו מדריך ובאותה גרסה (loio bfec07875db911d295ae0000e82de14a) מסווג את טרנזקציית הווריאנט אחרת מווריאנט הטרנזקציה עצמו. הסניפט: 'Variant Transactions Type (Behavior at Upgrade, Transport) Modification Description of Function In order to assign transaction variants to specific users, you must first define a variant transaction' וכן 'When defining a variant transaction you must enter the name of the transaction and the name of the variant'. כלומר הסיווג Customizing חל על וריאנט הטרנזקציה והמסך, ואילו טרנזקציית הווריאנט שמנגישה אותו למשתמשים מסווגת Modification מבחינת ההתנהגות בשדרוג ובהעברה. הסניפט אינו אומר דבר על S/4HANA, על תחזוקת מפעל או על תעשיות תהליכיות. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      }
    ],
    xrefs: [
      "tx:SHD0",
      "tx:SE93",
      "tx:COHVPI",
      "tx:COOISPI",
      "tx:IW31",
      "tx:IW32",
      "enh:technique:key-user-extensibility",
      "enh:technique:customer-exit",
      "enh:technique:field-exit"
    ],
    lastVerifiedAt: DATE21,
    notes: "שיטה (2026-09-21): כעשר שאילתות ב-scripts/sap-help-search.mjs על פני ארבעה מערכי מוצר (SAP_S4HANA_ON-PREMISE, SAP_S4HANA_CLOUD, SAP_ERP, ABAP_PLATFORM_NEW) וחיפוש רשת אחד מוגבל לדומיינים הרשמיים. כל הציטוטים הועתקו מחלונות הסניפט של שירות החיפוש לאחר ניקוי ישויות HTML (nbsp, ndash, amp) וכיווץ רווחים, ולכן הרווחים הפנימיים אינם בהכרח זהים לפלט הגולמי. מה שאומת מול המקור: השם Transaction Variants and Screen Variants, הסיווג Customizing של וריאנט הטרנזקציה והמסך מבחינת התנהגות בשדרוג ובהעברה לעומת הסיווג Modification של טרנזקציית הווריאנט, הטרנזקציה SHD0, יכולות הטכניקה (ערכי ברירת מחדל, ביטול סטטוס מוכן-לקלט, הסתרת אלמנטים ותפריטים), טרנזקציית הווריאנט הנוצרת ב-SE93, והשימוש בפועל בתעשיות תהליכיות (COHVPI, COOISPI) ובתחזוקת מפעל (שיוך וריאנט לפונקציית שותף). הרשומה נושאת שש ראיות. העמוד Restrictions והעמוד Variant Transactions נכתבו כראיות 5 ו-6 לאחר ביקורת נגדית, מפני ששדה ההמלצה נשען עליהם: מגבלת הוספת האלמנטים, והסיווג Modification של שלב ה-SE93 שאינו זהה לסיווג Customizing של הווריאנט עצמו. שאר קטלוג ההרחבות נושא בין ארבע לשבע ראיות לרשומה, ולכן שש אינו חורג מהמוסכמה. ראיה משלימה שנראתה ולא נכתבה: העמוד Transport באותו מדריך ובאותה גרסה (loio 7df63a07015111d396480000e82de14a) קובע 'For a transaction variant R3TR STVI <name of transaction variant>, For a screen variant R3TR SCVI <name of screen variant>'. ועוד: אותו מדריך Changing the SAP Standard (BC) מוגש גם תחת מערך התיעוד של SAP S/4HANA On-Premise, אך בגרסת 1709 Latest בלבד (אותו loio bfec07845db911d295ae0000e82de14a, https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/2b28ffa716c24348903f8ffbfeb81df8/bfec07845db911d295ae0000e82de14a.html?locale=en-US&state=PRODUCTION&version=1709.latest), ושם הוחזרו חלונות סניפט נוספים: 'Restrictions May not be used with selection screens Range (Validity) Transactions, both client-dependent and cross-client Access in the System Tools > Accelerated SAP > Personalization (transaction' (נקטע), 'Hiding various screen elements and menu functions, or even entire screens Adjusting table control settings' ו-'You may also assign different variants to specific users. You can do this by using variant transactions'. מפני שגרסת ההגשה הזו היא 1709, הראיה שנכתבה לגרסה הנוכחית היא ההגשה של ABAP platform. מה שלא אומת: אף עמוד רשמי שנמצא אינו קובע את מעמד הטכניקה בהמרה ל-S/4HANA במפורש, ולכן הקביעה 'ללא שינוי' נשענת על המשכיות התיעוד ועל אותו מזהה נושא בשני מערכי המוצר, ולא על הצהרת SAP ייעודית. ממצאים תחומים של חיפוש, לא הוכחות היעדר: בשאילתה 'What's New transaction variant screen variant SHD0' תחת SAP_S4HANA_ON-PREMISE עם size 21, אף אחת מ-21 הרשומות שהוחזרו אינה שייכת למערך What's New; בשאילתה 'transaction variant simplification not supported S/4HANA' לא הוחזרה רשומת פישוט הנוגעת לטכניקה; בשאילתה 'SHD0' באותו מוצר עם size 21, 19 מ-21 הרשומות מכילות את המחרוזת SHD0 בכותרת או בסניפט, בהן עמודי 2025 FPS01 מהתחומים Retail, JIT, Revenue and Cost Accounting, Policy Management, Sales, FI-GL, Financial Operations ו-Production Orders (PP-SFC). שים לב שהשדה total בפלט הסקריפט הוא מספר הרשומות שהוחזרו בעמוד ולא גודל הקורפוס. Public Cloud: תחת המוצר SAP_S4HANA_CLOUD השאילתה 'SHD0' החזירה שלוש רשומות בלבד, כולן עמודי API שאינם עוסקים בטכניקה (APIs for Sales, APIs for Warehousing), והשאילתה 'transaction variant' לא החזירה עמוד המגדיר את הטכניקה; במקום זאת התיעוד של Public Cloud מתאר התאמת מסכים קלאסיים דרך SAP Screen Personas ('Adapting UIs for Classic Applications', loio 2515e5ca2de74bc18255e5a62ecd2a0d, גרסה 2608.500), ועמוד Flavor Maintenance במדריך הניהול של Screen Personas מונה 'How to Create a Transaction Variant' תחת Related Information. לא נטען מכך שהטכניקה אינה זמינה ב-Public Cloud. השוואה לרשומת המאגר (data/enhancements.ts#transaction-variant): ההגדרה 'התאמת מסך ללא קוד, הסתרה/חובה/ערך ברירת מחדל לשדות בטרנזקציה', דרך המימוש 'SHD0 (Transaction Variant) / Screen Variant; שיוך לטרנזקציה או Variant Transaction' והטרנזקציה SHD0 נתמכות במקורות הרשמיים שצוטטו. החצי השני של השדה s4 ברשומת המאגר, 'ב-Fiori התאמה דרך UI Adaptation', אינו נתמך כאמירה על וריאנט טרנזקציה: העמוד Adapt User Interfaces at Runtime בספר SAP Fiori Overview לגרסת 2025 FPS01 (loio a80e623dc43a4fe5b1531695c2f7aeb5) אכן קובע 'UI adaptation at runtime enables key users to perform certain code-free adaptations of SAP Fiori apps' ו-'UI adaptation at runtime (RTA) is a plug-in for the SAP Fiori launchpad', אך אינו מזכיר וריאנטי טרנזקציה ואינו מציג את עצמו כתחליף להם, ולכן לא נכתב successor ולא סומן דגל חלופת Fiori. אזהרת שגיאת כתיב במקור: העמוד Technical Information on Transaction Variants בספר Repetitive Manufacturing (PP-REM) קיים בשתי הגרסאות (SAP S/4HANA 2025 FPS01 ו-SAP ERP 6.18, loio be68b6531de6b64ce10000000a174cb4) ומתאר 'A transaction variant consists of several screen variants', ובשתי ההגשות כאחת הסניפט כולל את הצירוף 'Creating your own variants: You can also create your own transaction and screen variants without using existing ones (transaction SDH0)'; SDH0 היא שגיאת כתיב של SAP עצמה, היא שרדה גם לגרסת 2025.001, ואין לרשום אותה כטרנזקציה. ה-xrefs: tx:SHD0, tx:SE93, tx:COHVPI ו-tx:COOISPI נקובים בראיות; tx:IW31 ו-tx:IW32 הם הקשר הפרויקט בלבד ואינם נקובים בעמוד התחזוקה שצוטט; שלוש הטכניקות השכנות הן הקשר קטלוגי, ואף מקור רשמי אינו מציג אותן כחלופה מוסמכת לוריאנט טרנזקציה. הסטטוס הנגזר שהאפליקציה מציגה לפני רשומה זו: 'משתנה ב-S/4HANA' ברמת 'מאומת מול נתוני הפרויקט', שכן components/neo-shell/reference/enh-data.ts מעביר את השדה s4 של הרשומה כ-changed ל-fromEccS4Block. גוף עמודי help.sap.com לא נקרא באף שלב (מעטפת JavaScript), ה-MCP ל-ABAP לא היה זמין (Connection closed), ולא בוצעה בדיקה במערכת SAP חיה. הרשומה אינה נושאת שדה reviewer: אף רשומה בתשעת קבצי data/verification/** אינה נושאת אותו."
  },
  {
    id: "enh:technique:enhancement-spot",
    aliases: [
      "Enhancement Spot",
      "Simple Enhancement Spot",
      "Composite Enhancement Spot"
    ],
    status: {
      status: "unchanged",
      he: "Enhancement Spot הוא המיכל של ה-Enhancement Framework: לפי מדריך Enhancement Framework של ABAP platform 2025 FPS01, כל enhancement spot element definition חייבת להיות משויכת לפחות ל-Enhancement Spot אחד, כל BAdI הוא חלק מ-Enhancement Spot, וה-Spot הוא שמשמש כאובייקט ההעברה (transport object). הטכניקה מתועדת בשני הצדדים: בתיעוד SAP ERP 6.0 EHP8 (Enterprise Services in Logistics) BAdI זמין 'in enhancement spot ECH_SPOT_SE_ECO', ובתיעוד פקודות הייצור (PP-SFC) של SAP S/4HANA On-Premise 2025 FPS01 מופעל מימוש BAdI בתוך Enhancement Spot בשם WORKORDER_UPDATE. אף עמוד רשמי שנמצא אינו מתאר שינוי בטכניקה עצמה במעבר מ-ECC ל-S/4HANA, ולכן המעמד הוא זמינות ללא שינוי ברמת הטכניקה, ולא קביעה על Enhancement Spot ספציפי או על נקודות ההרחבה המפורשות ש-SAP סיפקה בתוכו.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Cost Distribution at Order Split | Production Orders (PP-SFC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/8200b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת העמוד Cost Distribution at Order Split בספר Production Orders (PP-SFC) לגרסת S/4HANA On-Premise 2025 FPS01 (loio 8200b753128eb44ce10000000a174cb4, תאריך 2026-02-24) מחזירה שני קטעי סניפט נפרדים, המופרדים בסימן השמטה של שירות החיפוש: 'spot WORKORDER_UPDATE.' ו-'automatically post the goods issue for the by-product in the child order, activate the BAdI implementation CO_SPLIT_COMPONENT_POST_GI (Automatic GI for By-Product in Child Order of Order Split) in the enhancement'. הקטעים מראים ש-Enhancement Spot בשם WORKORDER_UPDATE משמש בתיעוד פקודות הייצור של S/4HANA 2025 FPS01 כמיכל שבו מפעילים מימוש BAdI. בשאילתה אחרת על אותה רשומה ('Cost Distribution at Order Split enhancement spot WORKORDER_UPDATE') הסניפט מחזיר גם את הקטע 'Order of Order Split) in the enhancement spot WORKORDER_UPDATE.', הקושר בתוך קטע אחד את סוף שם המימוש לשם ה-Spot. הסניפט אינו נוקב בשם BAdI definition, בממשק או בטרנזקציה, ואינו מתייחס להזמנת תחזוקה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "בהרחבות חדשות בתחזוקת מפעל ובתעשיות תהליכיות לרכז את הגדרות ה-BAdI ואת נקודות ההרחבה של תהליך אחד בתוך Enhancement Spot, משום שלפי מדריך Enhancement Framework ה-Spot הוא אובייקט ההעברה של ה-BAdIs שבו. לפני מימוש בנקודת הרחבה מפורשת ש-SAP סיפקה בתוך Spot, לעיין ברשומה enh:technique:explicit-enhancement, שבה מתועדת ההמלצה של תיעוד S/4HANA שלא להשתמש בנקודות כאלה להרחבות לקוח. שם ה-Spot, ה-BAdI definitions שבו והמימושים הקיימים תלויים בגרסה ובחבילת התמיכה, ויש לאמת אותם במערכת (SE18, SE20, SE80) לפני המימוש."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancement Spots | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/91f1e540f8648431e10000000a1550b0.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE22,
        claim: "רשומת העמוד Enhancement Spots בספר Enhancement Framework של ABAP platform לגרסת 2025 FPS01 (loio 91f1e540f8648431e10000000a1550b0) קובעת: 'The enhancement spot element definition and the corresponding enhancement spot element calls make up the definition of an explicit enhancement option', 'Each enhancement spot element definition must be assigned to at least one enhancement spot' ו-'Note Implicit enhancement options do not need to be assigned to enhancement spots'. הסניפט אינו נוקב בטרנזקציה ואינו מתייחס ל-S/4HANA או ל-ECC. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancement Concept | Enhancement Framework",
        url: "https://help.sap.com/docs/ABAP_PLATFORM_NEW/46a2cfc13d25463b8b9a3d2a3c3ba0d9/42d356adddec036fe10000000a114cbd.html?locale=en-US&state=PRODUCTION&version=202510.001",
        product: "ABAP platform",
        edition: "on-premise",
        release: "202510.001",
        accessedAt: DATE22,
        claim: "רשומת העמוד Enhancement Concept בספר Enhancement Framework של ABAP platform לגרסת 2025 FPS01 (loio 42d356adddec036fe10000000a114cbd) קובעת: 'Each BAdI is part of an enhancement spot and it is the spot that functions as a transport object', ומגדירה enhancement options כ-'positions in repository objects where you can make enhancements'. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Find Engineering Change Request by Material | Enterprise Services in Logistics",
        url: "https://help.sap.com/docs/SAP_ERP/1a781c11dd4f41829c798db4d8ff3a41/9f99eaf0ba7711da2b24000f20dac9ef.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE22,
        claim: "רשומת העמוד Find Engineering Change Request by Material בספר Enterprise Services in Logistics של תיעוד SAP ERP, תווית הגרסה '6.0 EHP8 Latest' (versionId 6.18.latest, loio 9f99eaf0ba7711da2b24000f20dac9ef), מראה שהטכניקה מתועדת גם בצד ה-ECC: 'The Inbound/Outbound processing BAdI for ECR by Material (ECH_SE_ECR_SMPL_BY_MAT_QR) Business Add-In (BAdI) is available in enhancement spot ECH_SPOT_SE_ECO'. הרשומה עוסקת בשירות ארגוני לבקשת שינוי הנדסי, לא בתחזוקת מפעל או בתעשיות תהליכיות, ואינה נוקבת בטרנזקציה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Cost Distribution at Order Split | Production Orders (PP-SFC)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/8200b753128eb44ce10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת העמוד Cost Distribution at Order Split בספר Production Orders (PP-SFC) לגרסת S/4HANA On-Premise 2025 FPS01 (loio 8200b753128eb44ce10000000a174cb4, תאריך 2026-02-24) מחזירה שני קטעי סניפט נפרדים, המופרדים בסימן השמטה של שירות החיפוש: 'spot WORKORDER_UPDATE.' ו-'automatically post the goods issue for the by-product in the child order, activate the BAdI implementation CO_SPLIT_COMPONENT_POST_GI (Automatic GI for By-Product in Child Order of Order Split) in the enhancement'. הקטעים מראים ש-Enhancement Spot בשם WORKORDER_UPDATE משמש בתיעוד פקודות הייצור של S/4HANA 2025 FPS01 כמיכל שבו מפעילים מימוש BAdI. בשאילתה אחרת על אותה רשומה ('Cost Distribution at Order Split enhancement spot WORKORDER_UPDATE') הסניפט מחזיר גם את הקטע 'Order of Order Split) in the enhancement spot WORKORDER_UPDATE.', הקושר בתוך קטע אחד את סוף שם המימוש לשם ה-Spot. הסניפט אינו נוקב בשם BAdI definition, בממשק או בטרנזקציה, ואינו מתייחס להזמנת תחזוקה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      }
    ],
    xrefs: [
      "enh:technique:new-badi",
      "enh:technique:classic-badi",
      "enh:technique:explicit-enhancement",
      "enh:technique:implicit-enhancement",
      "enh:badi:WORKORDER_UPDATE",
      "tx:SE18",
      "tx:SE19",
      "tx:SE20",
      "tx:SE80"
    ],
    lastVerifiedAt: DATE22,
    notes: "שיטה: ריצות של scripts/sap-help-search.mjs ב-2026-09-22 על שלושה מערכי מוצר (SAP_S4HANA_ON-PREMISE, ABAP_PLATFORM_NEW, SAP_ERP). כל כתובת, loio ו-versionId הועתקו מרשומת שירות החיפוש כפי שהוחזרה; גוף עמודי help.sap.com לא נקרא (מעטפת JavaScript), ולכן כל טענה רשמית תחומה בכותרת ובסניפט של הרשומה. לא נטען אימות HTTP של הכתובות: הכתובות מאומתות משום ששירות החיפוש החזיר אותן, לא משום שהן מחזירות קוד 200. המעמד עוגן ישירות בעמוד S/4HANA On-Premise בגרסת 2025.001, ולכן לא נדרש גשר בין מספרי הגרסה של ABAP platform (202510.001) לבין S/4HANA (2025.001); שני מרחבי ה-versionId נשמרו נפרדים בכל ראיה. רשומות רשמיות נוספות שנראו ולא צוטטו כראיה: 'Order Split' (What's New in SAP S/4HANA 2023, versionId 2023.000, loio 981c11df67df4b3eb91aa449f5dc1e72, https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/981c11df67df4b3eb91aa449f5dc1e72.html?locale=en-US&state=PRODUCTION&version=2023.000), שבה המשפט הרציף 'A new BAdI implementation CO_SPLIT_COMPONENT_POST_GI (Automatic GI for By-Product in Child Order of Order Split) is now available in the enhancement spot WORKORDER_UPDATE' (רכיב PP-PEO-SFE); 'ABAP Platform' (ABAP platform 202510.001, loio 48ba073157b85295e10000000a42189b): 'ABAP platform is the basis of the SAP S/4HANA product line'; 'BAdI Implementations for Online Check' (Product Safety and Stewardship, S/4HANA 2025.001, loio d4a1ce5314894208e10000000a174cb4): 'If the relevant BAdI was migrated to an enhancement spot, create an enhancement spot implementation. Use the transaction BAdI Builder: Initial Screen for Definitions ( SE18 )'; 'Creating an Enhancement Implementation and BAdI Implementation' (ABAP Development Tools for Eclipse, loio 18ef8ab2bd604516bbe7c0d297ee2476): 'Run transaction SE20. The Enhancements: Initial Screen is opened'; רשומה נוספת של ABAP platform (loio 2be79195cf874bd3bd612ac30159dcb8) מזכירה 'the SMIME enhancement spot in Enhancements (transaction SE20)'; 'How to Implement a BAdI' (Enhancement Framework, loio 44f518d884056c30e10000000a114a6b): 'In the Object Navigator (transaction SE80), open the enhancement spot'; וכן 'Creating, Editing, and Deleting Enhancement Spots' (loio 3b0a39426f79f83ae10000000a1550b0), 'Enhancement Builder' (loio 099bf240a5668d38e10000000a155106) ו-'Creating BAdI Enhancement Spots' (ADT, loio 2101737de99648dca92e692a2a4ec46e). SE19 לא הופיעה באף סניפט שנמצא בהקשר של Enhancement Spot, ולכן ה-xref אליה הוא הקשר הקטלוג בלבד ואינה נזכרת בפעולה המומלצת. מול רשומת המאגר data/enhancements.ts#enhancement-spot: התיאור 'מיכל המגדיר נקודות הרחבה מפורשות ו-BAdIs חדשים' תואם את הסניפטים; 'SE20 ליצירת Spot' נתמך חלקית (SE20 מופיעה בסניפטים כמסך Enhancements, לא כהוראת יצירה של Spot); 'זמין מ-NW7.0' ו-'Clean Core' לא אומתו באף רשומה רשמית שנמצאה ולכן לא נכתבו במעמד. לפי תור המחקר (audit/s4-enrichment/research-queue-enhancements.md) המעמד הנגזר שהאפליקציה מציגה היום לרשומה זו הוא 'משתנה ב-S/4HANA', שנגזר מבלוק ה-s4 של רשומת המאגר; המעמד המחובר כאן מחליף אותו ב'ללא שינוי ב-S/4HANA' כמו בתקדים enh:technique:new-badi, משום ששדה ה-s4 במאגר הוא המלצה ולא תיאור שינוי. המעמד unchanged נשען על תיעוד הטכניקה בשני הצדדים ועל היעדר אמירת שינוי, לא על אמירה רשמית מפורשת שהטכניקה לא השתנתה. ההגבלה על נקודות הרחבה מפורשות ש-SAP סיפקה (ENHANCEMENT-POINT ו-ENHANCEMENT-SECTION) מתועדת ברשומה enh:technique:explicit-enhancement ואינה מצוטטת כאן כראיה. לא נמצא עמוד רשמי הנוקב בשם Enhancement Spot ייעודי להזמנת תחזוקה (PM) או לפקודת תהליך (PP-PI); הקשר של WORKORDER_UPDATE לפקודות ייצור נשען על עמוד PP-SFC, והרשומה enh:badi:WORKORDER_UPDATE נושאת את שמו התיאורי הרשמי. מהדורת Public Cloud לא נבדקה. ה-MCP ל-ABAP לא היה זמין, ולא בוצע אימות ב-SE18, SE20 או SE80 במערכת חיה."
  },
  {
    id: "enh:technique:vofm",
    status: {
      status: "unchanged",
      he: "בתיעוד SAP S/4HANA On-Premise לגרסה 2025 FPS01 הטרנזקציה VOFM עדיין מתועדת ככלי לשגרות לקוח: בספר Sales, בנושא 'Maintaining Free Goods Master Data', נכתב 'You can enhance the rules for determining the free goods quantity with your own routines (Transaction VOFM' ... '(Transaction VOFM in menu point Formulas )', שני חלקים של אותו סניפט המופרדים בסימן השמטה של שירות החיפוש, ואותו נושא (אותו loio) נושא את אותו משפט גם תחת SAP ERP 6.18. רשימת הפישוט לגרסה 2025 FPS01 אינה מכילה פריט פישוט ל-VOFM: המחרוזת מופיעה בה פעם אחת, בפריט של OGSD שאינו עוסק בטכניקה עצמה. לכן 'ללא שינוי' כאן פירושו המשך התיעוד של הטכניקה ב-On-Premise ולא יותר. המשפט במאגר 'נתמכות; להעדיף BAdI/Extension כשאפשר', שממנו נגזר עד כה 'משתנה ב-S/4HANA', אינו נתמך באף מקור SAP שאותר.",
      edition: "on-premise",
      release: "2025.001",
      source: {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Free Goods Master Data | Sales",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/5f8bc95360267214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת החיפוש של help.sap.com לנושא 'Maintaining Free Goods Master Data' (deliverable: Sales, SAP S/4HANA 2025 FPS01, loio 5f8bc95360267214e10000000a174cb4, תאריך 2026-02-24) מביאה בסניפט: 'You can enhance the rules for determining the free goods quantity with your own routines (Transaction VOFM' ... '(Transaction VOFM in menu point Formulas )', שני חלקים של אותו סניפט המופרדים בסימן השמטה של שירות החיפוש, ובשאילתה אחרת גם 'The condition technique is used for free goods in the same way as for pricing'. כלומר בגרסה 2025 FPS01 מתועדת הרחבת כללי כמות מוצרי החינם בשגרות לקוח דרך VOFM, תחת Formulas. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      recommendedAction: "לפני ההסבה: לרשום במערכת המקור את השגרות שהלקוח יצר ב-VOFM (Requirements, Formulas, Data Transfer) ואת המקומות שבהם הן משויכות, למשל נוהל תמחור, בקרת העתקה ו-OVA8 לשגרת No Check באשראי, ולהריץ ATC ו-SCMON על הקוד שלהן. לאמת במערכת היעד את דרישת ה-Access Key שבמאגר, שלא נמצא לה מקור. הרשומה אינה קובעת דבר על S/4HANA Cloud Public Edition, ואינה ממליצה על מעבר ל-BAdI כל עוד אין מקור רשמי הנוקב בחלופה."
    },
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Free Goods Master Data | Sales",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/5f8bc95360267214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת החיפוש של help.sap.com לנושא 'Maintaining Free Goods Master Data' (deliverable: Sales, SAP S/4HANA 2025 FPS01, loio 5f8bc95360267214e10000000a174cb4, תאריך 2026-02-24) מביאה בסניפט: 'You can enhance the rules for determining the free goods quantity with your own routines (Transaction VOFM' ... '(Transaction VOFM in menu point Formulas )', שני חלקים של אותו סניפט המופרדים בסימן השמטה של שירות החיפוש, ובשאילתה אחרת גם 'The condition technique is used for free goods in the same way as for pricing'. כלומר בגרסה 2025 FPS01 מתועדת הרחבת כללי כמות מוצרי החינם בשגרות לקוח דרך VOFM, תחת Formulas. גוף העמוד לא נקרא (מעטפת JavaScript).",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintaining Free Goods Master Data | Basic Functions and Master Data in SD Processing (SD-BF)",
        url: "https://help.sap.com/docs/SAP_ERP/a428aae377ba4a1199c3ecc8b7f5f33d/5f8bc95360267214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        product: "SAP ERP 6.0",
        edition: "ecc",
        release: "6.18.latest",
        accessedAt: DATE22,
        claim: "רשומת החיפוש במוצר SAP_ERP לאותו loio (5f8bc95360267214e10000000a174cb4), בגרסה 6.18.latest ובספר SD-BF, מביאה בסניפט: 'You can enhance the rules for determining the free goods quantity with your own routines (Transaction VOFM'. עד המקום שבו הסניפט נקטע, זהו אותו משפט שמופיע תחת אותו loio בגרסת S/4HANA 2025 FPS01 (ראיה 1). כלומר נושא זה מתועד ב-ECC וב-S/4HANA באותו נוסח לפחות בחלק שהסניפטים מציגים. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Fields Used in Pricing Enhancements | Service",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/c9b5e9de6e674fb99fff88d72c352291/8402608dfbe34b7abfede95d315a076e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת החיפוש לנושא 'Fields Used in Pricing Enhancements' (deliverable: Service, SAP S/4HANA 2025 FPS01, loio 8402608dfbe34b7abfede95d315a076e, תאריך 2026-02-24) מביאה בסניפט: 'You can use pricing routines (for example transaction VOFM) and user exits to enhance the pricing functionality', וכן 'To ensure that the fields of the communication structures KOMK and KOMP are populated with data for executing the pricing routines and user exits during the pricing run, you need to list them in Customizing'. הסניפט מציג את שגרות התמחור ואת ה-user exits כשני אמצעים לצד זה, ואינו קובע ביניהם העדפה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Exceptions (No Check and Released Documents) | Sales",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/6c9a234520db4d5eb06179328c46b70f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת החיפוש לנושא 'Exceptions (No Check and Released Documents)' (deliverable: Sales, SAP S/4HANA 2025 FPS01, loio 6c9a234520db4d5eb06179328c46b70f, תאריך 2026-02-24) מביאה בסניפט: 'With a No Check routine, the SAP Credit Check can be bypassed. This routine can be created and maintained in transaction VOFM and assigned to the relevant combination in transaction OVA8', וכן 'The two requirements, 001 \"Order, example\" and 002 \"Delivery, example,\" contain an e...' (הסניפט נקטע שם). כלומר שגרת דרישה לבדיקת אשראי נוצרת ב-VOFM ומשויכת ב-OVA8. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Product Selection in Deliveries | Sales",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/7b24a64d9d0941bda1afa753263d9e39/fe89c95360267214e10000000a174cb4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE22,
        claim: "רשומת החיפוש לנושא 'Product Selection in Deliveries' (deliverable: Sales, SAP S/4HANA 2025 FPS01, loio fe89c95360267214e10000000a174cb4, תאריך 2026-02-24) מביאה בסניפט: 'Note that if the main item is weight/volume relevant, you must create a new VOFM copy routine to copy this value from the ...' (הסניפט נקטע שם). זו הראיה לשגרת העתקה (copy routine) ב-VOFM בגרסה 2025 FPS01, בהקשר של בחירת מוצר באספקה. גוף העמוד לא נקרא.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "simplification_item",
        sourceTitle: "Simplification List for SAP S/4HANA 2025 - Feature Pack Stack 1 and SAP S/4HANA Cloud Private Edition 2025 - Feature Pack Stack 1 (Document Version 1.36) · item 13.13.19 S4TWL - OGSD - Classic OGSD Interfaces, p. 1237",
        url: "https://help.sap.com/doc/0df2ffddebab40cf9338488b2f18dc41/2025.latest/en-US/SIMPL_OP2025.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01",
        accessedAt: DATE22,
        claim: "טקסט רשימת הפישוט שחולץ בתיקיית העבודה (scratchpad/SIMPL_OP2025.pdf.txt, 2,796,452 בתים, 85,712 שורות) נסרק: למחרוזת 'VOFM' יש בו מופע אחד בלבד, בפריט 13.13.19 'S4TWL - OGSD - Classic OGSD Interfaces' (עמוד 1237 לפי תוכן העניינים, רכיב IS-OIL-DS-OGSD), במשפט 'You are using the OGSD application \"Classic Interfaces\" to process (mostly inbound) IDocs using VOFM-style customer enhancements via form routines'. הפריט עוסק בממשקי OGSD הקלאסיים ולא בטרנזקציה VOFM או בשגרות התמחור וההעתקה. אין ברשימה פריט פישוט שכותרתו או נושאו VOFM. אין בכך קביעה על מה שהרשימה אינה מכסה.",
        verificationLevel: "sap_official_verified"
      },
      {
        sourceType: "repository",
        sourceTitle: "קטלוג טכניקות ההרחבה של הפרויקט (ENHANCEMENTS), רשומת vofm",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE22,
        claim: "רשומת המאגר מסווגת את VOFM כ-kind 'Exit' ומתארת: 'שגרות התאמה ל-SD/לוגיסטיקה (תמחור, דרישות, העברת נתונים, נוסחאות)', 'VOFM; שגרות Requirements/Data Transfer/Formulas; נדרש Access Key; משויכות ב-Customizing', ecc 'נפוצות ב-SD/תמחור', s4 'נתמכות; להעדיף BAdI/Extension כשאפשר', דוגמת PP 'שגרת דרישה לקביעת מקור/אספקה' והערה המבקשת לאמת את הרלוונטיות מחוץ ל-SD ולוגיסטיקה. התיאור הכללי ושלוש קטגוריות השגרות נתמכים בסניפטים הרשמיים שבראיות 1 עד 5 (Formulas, requirement routine, copy routine). שלושה חלקים לא אותרו באף מקור רשמי שנבדק: הדרישה ל-Access Key, ההמלצה להעדיף BAdI או Extension, ודוגמת ה-PP. זהו פער אימות ולא הפרכה.",
        verificationLevel: "verification_required",
        repoRef: "data/enhancements.ts#vofm"
      }
    ],
    xrefs: [
      "enh:technique:user-exit",
      "enh:technique:customer-exit",
      "tx:VOFM",
      "tx:OVA8"
    ],
    lastVerifiedAt: DATE22,
    notes: "שיטה (2026-09-22): שש שאילתות ב-scripts/sap-help-search.mjs במוצר SAP_S4HANA_ON-PREMISE, כל אחת עם 21 רשומות ('VOFM transaction routine', 'VOFM', 'VOFM pricing routine formula', 'VOFM copy requirements data transfer routine', 'Oil Gas VOFM', 'VOFM requirement routine production'), שאילתה אחת 'VOFM' במוצר SAP_ERP ושאילתה אחת 'VOFM' במוצר SAP_S4HANA_CLOUD, חיפוש רשת אחד מוגבל ל-help.sap.com ול-api.sap.com, וסריקת הטקסט של רשימות הפישוט 2025 FPS01 ו-2023 FPS03. ספירה נמדדת: ב-S/4HANA 2025.001 המחרוזת VOFM מופיעה בסניפט של 13 נושאים שונים (לפי loio) בשישה ספרים: Sales (שישה נושאים), Service (שניים), Retail (שניים), Invoicing, China ו-Peru (אחד בכל אחד). נספרו רק רשומות שהסניפט שלהן מכיל VOFM. Oil & Gas אינו נכלל בספירה: שני נושאי התמחור שלו, 'Day of the Week and Time Pricing' (loio f98dcf535b804808e10000000a174cb4) ו-'Date and Time Pricing' (loio f08dcf535b804808e10000000a174cb4), מביאים בסניפט רק את נתיב ה-Customizing 'Sales and Distribution > System Modification > Routines > Define formulas for pricing' ואינם נוקבים ב-VOFM; הנושא 'Routine Setups' (PRA) אינו נוקב ב-VOFM; והשאילתה 'Oil Gas VOFM' החזירה 21 רשומות שבאף אחת מהן VOFM אינו בסניפט. לכן הרשומה אינה מייחסת לתיעוד Oil & Gas שימוש ב-VOFM ואינה גוזרת ממנו סיווג של הטכניקה. S/4HANA Cloud Public Edition: 21 רשומות, ו-VOFM אינו מופיע באף סניפט; ממצא תחום לשאילתה זו ואינו טענת אי-זמינות. תעשיות תהליכיות: בשאילתה 'VOFM requirement routine production' הופיע VOFM רק בסניפטים של Sales ו-Service, ולא נמצא נושא PP או PP-PI הנוקב ב-VOFM; דוגמת ה-PP שבמאגר נשארת לא מאומתת. תחזוקת מפעל: המאגר עצמו אינו נותן דוגמת PM, ולא נמצא נושא PM הנוקב ב-VOFM. רשימת הפישוט 2023 FPS03: הנתיב שנרשם בטיוטה (scratchpad/official/SIMPL_OP2023.pdf.txt) אינו קיים. הכותב חזר על הסריקה ב-2026-09-22 בקובץ scratchpad/SIMPL_OP2023.pdf.txt (2,486,408 בתים) ומצא בו מופע יחיד של VOFM, באותו משפט של פריט OGSD Classic Interfaces. הסריקה הזו אינה מצוטטת כראיה, משום שלקובץ אין כתובת רשמית ברשומה. חיפוש הרשת החזיר עמוד R/3 ישן 'Routines (SAP Library - Shipping)' (saphelp_pserv464); ההורדה הפנתה למסך הזדהות ולא נקראה, ולכן לא צוטט. הסטטוס נכתב ידנית כ-'unchanged' במקום הנגזר 'משתנה ב-S/4HANA', שנשען רק על משפט המאגר 'להעדיף BAdI/Extension כשאפשר'; משמעותו המשך תיעוד ב-On-Premise 2025 FPS01, לא בדיקה במערכת. ה-MCP ל-ABAP לא היה זמין בסשן; בדיקת VOFM, SE38 או ATC במערכת חיה לא בוצעה. הרשומה אינה נושאת שדה reviewer, בהתאם למוסכמה ב-data/verification/**."
  },
];
