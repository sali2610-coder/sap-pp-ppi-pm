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
   The honesty trap the plan names still holds: data/cds-enrichment.ts marks
   views "verified" with templated source strings, not URLs, so that layer
   stays repository_verified (or verification_required) here. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE2 = "2026-09-02";

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
];
