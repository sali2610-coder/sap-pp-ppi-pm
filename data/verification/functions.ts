/* Project NEO · verification overlay — function objects (`fm:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02): 12 audited records alongside the worked
   example. Tier-1 evidence comes from help.sap.com search records
   (scripts/sap-help-search.mjs; loio + versionId re-verified live) and from
   two fully-read SAP Library/NetWeaver pages; Tier-2 is the named repository
   record. Every claim is bounded by the snippet, the fully-read page or the
   named repository record; negative findings are search-bounded, never
   absolute. Open conflicts and deferred ids live in
   audit/s4-enrichment/research-queue-functions.md. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-01";
const DATE2 = "2026-09-02";

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
      "סניפט — לא נרשמו. סתירות שנרשמו גם בקובץ התור: (1) data/function-intel.ts קורא לחלופה 'API_PROCESSORDER_2' " +
      "בעוד השם הנקוב במקורות הרשמיים הוא API_PROCESS_ORDER_2_SRV‏ ('Process Order (Version 2)') — סטיית איות " +
      "במאגר שכדאי לנרמל; (2) data/bapi-enrichment.pppi.ts מסמן releasedStatus‏ 'Released · RFC' במקור 'SAP Help " +
      "Portal + SE37 metadata', אך לא נמצא עמוד Help ציבורי הנוקב בשם ה-BAPI — מצב השחרור הוא repository_verified " +
      "בלבד. ‏fm:BAPI_PROCORD_CREATE_FROM_PLORD אינו ב-xrefs כי אינו ביקום המזהים של הדאטהסט (נשאר בטקסט בלבד); " +
      "מזהה הווריאנט OP_API_PROCESS_ORDER_2_SRV_0001 שנכלל בטיוטה הוסר — אינו בר-אימות ללא מפתח Hub. תאריכי " +
      "הגישה לרשומות ה-Help הם 2026-09-02 לפי כותרת סקריפט החיפוש.",
  },
];
