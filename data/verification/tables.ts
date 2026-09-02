/* Project NEO · verification overlay — tables (`table:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-01): 13 records carrying Tier-1 evidence from
   help.sap.com search records (scripts/sap-help-search.mjs; loio + versionId
   re-verified live) alongside Tier-2 repository evidence. Every claim is
   bounded by the snippet or the named repository record; refuted drafts and
   open conflicts live in audit/s4-enrichment/research-queue-tables.md. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";

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

/* ---------------------------------------------------------------- records */

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
];
