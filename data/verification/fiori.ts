/* Project NEO · verification overlay — Fiori apps (`fiori:` ids).
   TYPE-ONLY IMPORTS. Loaded by node --test with no loader.
   Catalog data commit (2026-09-02, graduated): 19 audited records (the
   foundation worked example fiori:F0843 superseded by its audited record).
   Tier-1 evidence comes from help.sap.com search records
   (scripts/sap-help-search.mjs; loio + versionId re-verified live at audit),
   from What's New PDFs read in full, and from SAP Fiori Apps Reference Library
   search titles carrying the app id in the URL (the library page body is a
   JavaScript shell and is never quoted; only F2828 was read in a browser).
   Tier-2 is the named repository record (data/fiori/apps.ts and its
   consumers) or the SAP PRESS Fiori quick reference. Every claim is bounded by
   the snippet, the read document or the named repository record; negative
   findings ("no official record names id X") are search-bounded, never
   absolute. Eight records carry conflicting_sources because the curated id or
   name in data/fiori/apps.ts disagrees with the official record (F2731,
   F2730, F2730A, F4072, F3577, F3364, F1576, F0843); the fix is a product
   decision on the curated file, logged in
   audit/s4-enrichment/research-queue-fiori.md together with every open
   conflict. fiori:F3289, refuted on 2026-09-02, was rewritten and added on
   2026-09-22 (DATE22). accessedAt / lastVerifiedAt carry
   the batch stamp 2026-09-02; live re-checks ran 2026-09-05 and 2026-09-07.
   2026-09-24 (DATE24): F2731, F1511, F2730, F2730A, F4072 and F2774 re-checked
   through the Fiori Apps Library's public OData service (scripts/fal-app.mjs,
   S32OP = 2025 FPS01 and S27OP = 2023) and re-audited; the role, catalog, OData
   and GUI transactions the library prints for F1511, F4072 and F2774 were copied
   into data/fiori/apps.ts. Second batch the same day: F5325, F2336, F3577,
   F3364, F1576 and F0843 (library values copied into data/fiori/apps.ts for
   F5325 and F2336; F3577 and F3364 return no library record on S32OP/S27OP,
   and the library assigns F1576 to Supplier Evaluation Response). Third batch the same day:
   F4604, F0251, F0247A, F3951, F2176 and F3289 (library values copied into data/fiori/apps.ts
   for all six; F0247A keeps its curated name, because help.sap.com and the library's catalog
   name disagree, and now carries conflicting_sources; F3951 and F0251 keep their curated GUI
   transactions where the library prints none). */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-02";
const DATE22 = "2026-09-22";
const DATE23 = "2026-09-23";
const DATE24 = "2026-09-24";

/* ------------------------------------------------------------- shared docs */

const F2731_MANAGE_MAINT_ORDERS_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Maintenance Orders | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/55828a51fe634affb76fe4283f71c1d9.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "עמוד היישום בתיעוד Maintenance Management של S/4HANA On-Premise 2025 FPS01 פותח במילים 'Manage Maintenance " +
    "Orders App ID: F5241 This app offers both a comprehensive list view of maintenance orders and the possibility " +
    "to process individual maintenance orders'. הכותרת שהקטלוג המתוחזק מייחס ל-F2731 שייכת בתיעוד הרשמי למזהה F5241.",
  verificationLevel: "sap_official_verified",
  conflictingEvidence: [
    {
      sourceType: "repository",
      sourceTitle: "הקטלוג המתוחזק של יישומי ה-Fiori בפרויקט (FIORI_APPS)",
      product: "SAP S/4HANA",
      edition: "on-premise",
      accessedAt: DATE,
      claim:
        "רשומת המאגר רושמת את המזהה F2731 תחת השם Manage Maintenance Orders בסימון אמון 'curated' וללא כתובת של " +
        "ספריית היישומים הרשמית; אותו צימוד חוזר ב-data/centers/fiori.ts:20 וברשומות IW32, IW33, IW37N, IW38, IW39 " +
        "ו-IW40 ב-data/tx-intel.ts.",
      verificationLevel: "verification_required",
      repoRef: "data/fiori/apps.ts#F2731",
    },
    {
      sourceType: "repository",
      sourceTitle: "שכבת מחזור החיים של הטרנזקציות (LIFECYCLE) ומפת הפתרונות (SOLUTIONS)",
      product: "SAP S/4HANA",
      edition: "on-premise",
      accessedAt: DATE,
      claim:
        "רשומת IW31 ב-data/lifecycle.ts ושורה 42 ב-data/solutions.ts מייחסות את אותו מזהה F2731 לשם אחר, 'Create " +
        "Maintenance Order'; בתוך המאגר עצמו F2731 נושא אפוא שני שמות שונים.",
      verificationLevel: "verification_required",
      repoRef: "data/lifecycle.ts#IW31",
    },
    {
      sourceType: "repository",
      sourceTitle: "ספר הלימוד QM של הפרויקט, פרק 18 (Manage Usage Decisions)",
      product: "SAP S/4HANA",
      edition: "on-premise",
      accessedAt: DATE,
      claim:
        "שורה 1363 בספר הלימוד QM מייחסת את F2731 ליישום Manage Usage Decisions של ניהול איכות, בעוד שרשומת החיפוש " +
        "הרשמית 'Manage Usage Decisions | Quality Management' (2025.001, loio 85fae2574096f432e10000000a441470) נוקבת " +
        "'App ID: F2345'. שם שלישי לאותו מזהה בתוך המאגר, וגם הוא אינו נתמך רשמית.",
      verificationLevel: "verification_required",
      repoRef: "data/library/qm-textbook/ch18.ts:1363",
    },
  ],
};

const F1511_FEATURE_COMPARISON: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Feature Comparison - Request Maintenance and Create Maintenance Request | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5d2fbff31efc440b8200fbad95a68dfe.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "עמוד ההשוואה הרשמי (Maintenance Management, ‏2025 FPS01) מציב זו לצד זו שתי אפליקציות נפרדות לבקשת תחזוקה: " +
    "'Request Maintenance' עם המזהה F1511 ו-'Create Maintenance Request' עם המזהה F1511A, כלשון הסניפט: 'Compared " +
    "Features Request Maintenance Create Maintenance Request F1511 F1511A'. הסניפט מעיד שהטבלה משווה יכולות בין " +
    "שתי האפליקציות (הפריט הראשון: זמינות טיוטות של בקשות תחזוקה, עם הערכים No / Yes ללא שיוך ודאי לעמודות); ערכי " +
    "ההשוואה עצמם לא נקראו מגוף הדף.",
  verificationLevel: "sap_official_verified",
};

const F2730_DELETION_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
  accessedAt: DATE,
  claim:
    "רשומת ה-What's New לגרסת SAP S/4HANA 2023 קובעת, כלשון הסניפט: 'The Confirm Jobs app (W0020) has been deleted " +
    "and is no longer available on the SAP Fiori launchpad', ומפנה לאפליקציות יורשות: 'You can use the following " +
    "successor apps which are available on the SAP Fiori launchpad to review, execute, and report the findings for " +
    "the jobs dispatched for execution: Perform Maintenance Jobs (F5104A'. מזהה האפליקציה שנמחקה הוא W0020, לא F2730.",
  verificationLevel: "sap_official_verified",
};

const F4072_SCREEN_MAINT_REQUESTS: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Screen Maintenance Requests | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5ae0d3b492dc4df3a0eb1b8cad02cda3.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "עמוד Maintenance Management לגרסת 2025 FPS01 מזהה את F4072 כיישום Screen Maintenance Requests: 'In the Create " +
    "Maintenance Request app (F1511A) and the Screen Maintenance Requests app (F4072), when you remove a technical " +
    "object or change the notification type...'; תיאור היישום בקטע: 'With this app, you can screen and accept " +
    "maintenance requests'.",
  verificationLevel: "sap_official_verified",
};

const F2336_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Production Orders | Production Orders (PP-SFC)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/34de0103497c4b80a7c7fbf6952ff971/0a4622d10e7e49478943891624ea7ca8.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "עמוד האפליקציה בתיעוד Production Orders (PP-SFC) לגרסת 2025 FPS01 קובע: 'With this app, you can monitor the " +
    "progress of production' ו-'You can use this app if the role Production Supervisor - Discrete Manufacturing is " +
    "assigned to your user'; תחת Key Features: 'Display a list of productions orders for your area of " +
    "responsibility using a range of different filters' [כך בלשון הסניפט]; Supported Device Types: Desktop, Tablet.",
  verificationLevel: "sap_official_verified",
};

const F3577_FEATURE_COMPARISON: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "טבלת ההשוואה הרשמית לגרסת 2025 FPS01 מונה: 'App Name Monitor Process / Planned Orders Mass Processing: Process " +
    "Orders Manage Process Orders / Manage Process Order Operations App ID COOISPI COHVPI F4587/ F5323'. כלומר, " +
    "מזהה היישום Manage Process Orders בתיעוד SAP הוא F4587 (ולצדו F5323 ל-Manage Process Order Operations); " +
    "המזהה F3577 אינו מופיע בסניפט הרשומה (גוף העמוד לא נקרא).",
  verificationLevel: "sap_official_verified",
};

const F3577_APP_TOPIC_2025: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Process Orders | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/a84b0308f73c43f29154fbb7e54e15d3.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "נושא היישום במדריך Production Planning and Control לגרסת 2025 FPS01 קובע: 'With this app, you can manage the " +
    "progress of process orders. You have an overview of the current situation with all the information you need to " +
    "solve any issues', ומפנה ל-Confirm Process Orders ול-Confirm Process Order Operations להזנת אישורים " +
    "ול-Manage Inspection Lots לפרטי מנות בדיקה (כלשון הסניפט). היישום מתועד בגרסה הנוכחית של S/4HANA On-Premise.",
  verificationLevel: "sap_official_verified",
};

const F3577_WHATS_NEW_2020: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Process Orders | What's New in SAP S/4HANA 2020",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2020.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/dc987ea755344b219964916762803a47.html?locale=en-US&state=PRODUCTION&version=2020.000",
  accessedAt: DATE,
  claim:
    "רשומת What's New לגרסת SAP S/4HANA 2020: 'With this feature, you can manage the progress of process orders', " +
    "ופרטי הרשומה בסניפט: 'App New BJ8 PP-FIO-PI SAP S/4HANA 2020' (לפי מבנה טבלאות What's New: קטגוריה App, סוג " +
    "New, פריט היקף BJ8, רכיב יישום PP-FIO-PI, גרסה SAP S/4HANA 2020). היישום הוצג כחדש בגרסת 2020.",
  verificationLevel: "sap_official_verified",
};

const F0843_PGR_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Post Goods Receipt for Purchasing Document | Inventory Management and Inventory (MM-IM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/9ddf815494758c4ce10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "רשומת החיפוש של help.sap.com לגרסת On-Premise 2025 FPS01 (מדריך MM-IM) קובעת: 'Post Goods Receipt for " +
    "Purchasing Document App ID: F0843 With this app, you can post the receipt of goods with reference to the " +
    "different types of purchasing documents'. כלומר המזהה F0843 שייך ליישום קבלת סחורה בהתייחסות למסמך רכש, ולא " +
    "ליישום Post Goods Movement.",
  verificationLevel: "sap_official_verified",
};

const F4604_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Maintenance Notifications and Orders | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/d8a94ddd0c514780a9836aa04524f96f.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "עמוד האפליקציה בתיעוד Maintenance Management לגרסת 2025 FPS01 קובע: 'With this app, you can manage maintenance " +
    "notifications and maintenance orders that are processed by phases', וכן 'Maintenance notifications and orders " +
    "for which the phase model has not been activated are not available in this app'. סוגי מכשירים נתמכים לפי " +
    "הסניפט: Desktop, Tablet, Smartphone.",
  verificationLevel: "sap_official_verified",
};

const F0251_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Material Coverage (F0251) | Material Requirements Planning (PP-MRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/09cd1556d22c0033e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "תיעוד PP-MRP לגרסת 2025 FPS01 מתעד את היישום Manage Material Coverage תחת המזהה F0251: 'With this app, you " +
    "can resolve any coverage issues for your materials based on the settings you made in the Monitor Material " +
    "Coverage app'. העמוד קובע: 'This app is the predecessor of the app Manage Material Coverage (F0251A), which " +
    "you can use as an alternative', ומציין שהיישום כלול בקטלוג העסקי Production Planning - MRP Cockpit‏ " +
    "(SAP_SCM_BC_MRPCOCKPIT).",
  verificationLevel: "sap_official_verified",
};

const F0247A_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Monitor Material Coverage - Net Segments | Material Requirements Planning (PP-MRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/5ab21556d22c0033e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "עמוד האפליקציה במדריך PP-MRP לגרסת 2025 FPS01 קובע: 'You can use this app to monitor all the make-to-stock and " +
    "collective requirements materials in a selected area of responsibility'; המשתמש מקבל 'a list of all materials " +
    "with net requirements segments that might have coverage issues according to a specified shortage definition'; " +
    "והאפליקציה 'is contained in the business catalog Production Planning - MRP Cockpit (SAP_SCM_BC_MRPCOCKPIT)'. " +
    "הסניפט אינו נוקב במזהה F של האפליקציה.",
  verificationLevel: "sap_official_verified",
};

const F3289_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Work Center Capacity | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/74e3356c89914b1495667e7d1f76eb23.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE22,
  claim:
    "עמוד היישום בתיעוד Production Planning and Control של S/4HANA On-Premise 2025 FPS01 (לפי קטע תוצאת החיפוש; " +
    "גוף הדף לא נקרא): 'With this app, you can visualize the capacities of work centers, and the load on work " +
    "centers', 'Manage shifts for a work center to enable a better utilization spread across an evaluation " +
    "horizon', 'Copy shifts across multiple work centers within your area of responsibility' ו-'Navigate to apps " +
    "that let you manage orders and operations'.",
  verificationLevel: "sap_official_verified",
};

const F3951_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Capacity Scheduling Board | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/063ae12de0c74b01b6fd49c78e895564.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE24,
  claim:
    "עמוד היישום המלא (נקרא דרך sap-help-body.mjs, deliverable 40374808, loio 063ae12de0c74b01b6fd49c78e895564) פותח: " +
    "'This app was previously known as Monitor Work Center Schedules. With this app, you get an overview of the " +
    "operations performed at your work centers by visualizing their schedules over a time period. Pacemaker work " +
    "centers are critical as they help determine the schedule of an order.' רשימת Key Features כוללת Dispatch, " +
    "Deallocate ו-Reschedule של פעולה; Component for Customer Incidents: PP-CFS-GNT; Supported Device Types: Desktop, " +
    "Tablet.",
  verificationLevel: "sap_official_verified",
};

const F2176_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Production Scheduling Board | Production Planning and Detailed Scheduling (PP/DS)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/e5a89957c59f6c10e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "מדריך PP/DS לגרסת 2025 FPS01 מתעד את היישום: 'With this app, you can optimize and plan the resource schedule " +
    "and the order dates and times in detail by taking resource and component availability into account'. תחת Key " +
    "Features נמנים בתקציר: 'Select a period of time for scheduling production', 'Select resources that you want to " +
    "use for production scheduling', 'Define conditions for the resources'.",
  verificationLevel: "sap_official_verified",
};

const F5104A_WHATS_NEW_2021: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Perform Maintenance Jobs | What's New in SAP S/4HANA 2021",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2021.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/a526d447a7ee4d668f84942d56be0fab.html?locale=en-US&state=PRODUCTION&version=2021.000",
  accessedAt: DATE,
  claim:
    "רשומת What's New של SAP S/4HANA 2021: 'With this app, as a Maintenance Technician, you can review all the " +
    "dispatched order operations and suboperations and continue to perform the maintenance task or job assigned to " +
    "you or your work center (team)'. הסניפט מסווג את הרשומה 'App New 4HH 4HI PM SAP S/4HANA 2021', כלומר " +
    "אפליקציה חדשה במהדורת 2021 עם פריטי ההיקף 4HH ו-4HI.",
  verificationLevel: "sap_official_verified",
};

const F1339_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Schedule MRP Runs | Material Requirements Planning (PP-MRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/fdd11356c16b8222e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "תיעוד PP-MRP לגרסת 2025 FPS01 קובע: 'With this app you can create and schedule a job for executing your MRP " +
    "runs'; תבנית ה-Job הנבחרת היא 'Material Requirements Planning (MRP)'; 'This app is available for the roles: " +
    "SAP_BR_MATL_PLNR_EXT_PROC (Material Planner - External Procurement) SAP_BR_PRODN_PLNR (Production Planner)'; " +
    "רכיב לתקלות: PP-MRP; אפליקציות קשורות: Monitor Material Coverage, Display MRP Key Figures, Display MRP Master " +
    "Data Issues.",
  verificationLevel: "sap_official_verified",
};

const F2023_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Report and Repair Malfunction | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/13b3075824570746e10000000a441470.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "מדריך Maintenance Management ל-S/4HANA On-Premise 2025 FPS01 מתעד את היישום: 'You can use this app to easily " +
    "report that a technical object has a malfunction, plan the required repair work, as well as document and " +
    "confirm the maintenance work'; 'This app is available for the Maintenance Technician role'; ותחת Key Features: " +
    "'Three tiles are provided for this app: The Report Malfunction tile for creating malfunction reports, the " +
    "Manage Malfunction Reports tile that provides a list of malfunction reports that have already been created, and " +
    "the Repair Malfunctions - My Job List tile that provides a list of all work items assigned to you or to your team'.",
  verificationLevel: "sap_official_verified",
};

const F2828_LIBRARY: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Maintenance Planning Overview | SAP Fiori Apps Reference Library (classic), App ID F2828",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F2828",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  accessedAt: DATE,
  claim:
    "עמוד היישום בספריית SAP Fiori Apps Reference Library (הגרסה הקלאסית; נטען ונקרא בדפדפן, נתיב הפירוט " +
    "Apps('F2828')) מציג: App ID 'F2828', שם 'Maintenance Planning Overview' (for Maintenance Planner), Application " +
    "Type 'Analytical (SAP Fiori elements: Overview Page)', Required Back-End Product 'SAP S/4HANA', Database 'HANA " +
    "DB exclusive', Device Type(s) 'Desktop, Smartphone, Tablet', Line of Business הכולל 'Asset Management'. חבילות " +
    "המוצר: 'SAP S/4HANA (Private Cloud and On-Premise)' ו-'SAP S/4HANA Public Cloud'; רשימת הגרסאות הזמינות נעה " +
    "מ-'1809' ועד '2025 FPS01 (On-Premise)' ו-'2025 FPS01 (Private Cloud)'. בלשונית Implementation Information " +
    "לגרסת 2025 FPS01: SAPUI5 Application 'EAM_ORD_MONS1', Software Component Version 'UIS4H 109 - SP 0001' " +
    "(front-end) ו-'S4CORE 109 - SP 0001' (back-end), Application Component 'PM-FIO' עם הטקסט 'Fiori User Interface " +
    "(UI) for PM'. קישור App Documentation מפנה לנושא help.sap.com עם loio 17248e4667fb433a9c3f944000fada3f בגרסה " +
    "2025.001. טבלאות Business Role(s), Business Catalog(s), Technical Catalog(s), OData Service(s) ו-Target " +
    "Mapping(s) הוצגו כ-'No data' בתצוגה ללא התחברות.",
  verificationLevel: "sap_official_verified",
};

/* ------------------------- 2026-09-23 batch: status sources (see records) */

const F5241_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Maintenance Orders | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/55828a51fe634affb76fe4283f71c1d9.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "עמוד היישום ב-Maintenance Management לגרסת 2025 FPS01 (loio 55828a51fe634affb76fe4283f71c1d9): 'Manage Maintenance " +
    "Orders App ID: F5241 This app offers both a comprehensive list view of maintenance orders and the possibility to " +
    "process individual maintenance orders.' ובקטע נפרד: 'This includes the possibility to manage the assignment of the " +
    "selected orders to a maintenance event or a revision.'",
  verificationLevel: "sap_official_verified",
};

const F2072_APM_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Integration with SAP APM Assessments | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/1563a9bd3b1c4844ad5dd1a3a7d6a156.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "מדריך Maintenance Management לגרסת 2025 FPS01 (loio 1563a9bd3b1c4844ad5dd1a3a7d6a156) מצמיד את השם למזהה: 'If you " +
    "have set up the integration with SAP APM, you can view details of these assessments in the Find Technical Object " +
    "app (F2072).'",
  verificationLevel: "sap_official_verified",
};

const W0029_WHATS_NEW_2025_FPS01: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "BAdI: Functional Location Management | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/41a47f86d1d449318dee191474b5f64e.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "רשומת What's New לגרסת 2025 FPS01 (loio 41a47f86d1d449318dee191474b5f64e) נוקבת במזהה לצד השם: 'Web Dynpro app - " +
    "Process Technical Object (W0029) to create or change technical objects'. באותה רשימה מופיעים 'IL02 (Change " +
    "Functional Location)' ו-'API - Functional Location (API_FUNCTIONALLOCATION)'; כותרת הרשימה אינה בקטע.",
  verificationLevel: "sap_official_verified",
};

const W0028_MIGRATION_EQUIPMENT: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "PM - Equipment | Data Migration",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/2f60604160f141be904d23b23e69c3a6.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "תיעוד ההגירה של אובייקט PM - Equipment לגרסת 2025 FPS01 (loio 2f60604160f141be904d23b23e69c3a6) נוקב במזהה לצד השם: " +
    "'Equipment Number Display Technical Object (app ID W0028) BAPI_EQUI_CREATE'.",
  verificationLevel: "sap_official_verified",
};

const F8669_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Technical Object Structures | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/15df8bf64aef43f9bd8680bb0d711f3e.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "עמוד היישום ב-Maintenance Management לגרסת 2025 FPS01 (loio 15df8bf64aef43f9bd8680bb0d711f3e): 'Manage Technical " +
    "Object Structures App ID: F8669 With this app, you can create and manage draft technical object structures.'; 'When " +
    "the objects in the draft technical object structure are created, you can generate a technical object structure.'; " +
    "'View the application logs for details about the creation of the technical object structure, including information " +
    "on whether the process was successful or failed.'",
  verificationLevel: "sap_official_verified",
};

const F4587_FEATURE_COMPARISON: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "טבלת ההשוואה לגרסת 2025 FPS01 (loio 0af42d30f5654313ac5d7a0ff9f36094): 'App Name Monitor Process / Planned Orders Mass " +
    "Processing: Process Orders Manage Process Orders / Manage Process Order Operations App ID COOISPI COHVPI F4587/ " +
    "F5323'. לפי סדר הערכים משני צידי הלוכסן, F4587 הוא Manage Process Orders ו-F5323 הוא Manage Process Order " +
    "Operations; הטבלה מציבה את שניהם לצד COOISPI ו-COHVPI.",
  verificationLevel: "sap_official_verified",
};

const F2462_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Batches | Batch Management (LO-BM)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/34b021588aee0a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "עמוד היישום ב-Batch Management (LO-BM) לגרסת 2025 FPS01 (loio 34b021588aee0a02e10000000a44147b): 'Manage Batches App " +
    "ID: F2462 Use With this app you can display and edit existing and create new batches.'; 'the possibility to search " +
    "for batches that are managed at specific plants.'; 'View batch-relevant information, for example: Plants at which " +
    "the batch is managed Inspection lots of the selected batch'.",
  verificationLevel: "sap_official_verified",
};

const F1511A_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Create Maintenance Request | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/78732361f0b94fe1b1711632af4362b3.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "עמוד היישום ב-Maintenance Management לגרסת 2025 FPS01 (loio 78732361f0b94fe1b1711632af4362b3): 'In the Create " +
    "Maintenance Request app (F1511A) and the Screen Maintenance Requests app (F4072), when you remove a technical object " +
    "or change the notification type'; 'Create Maintenance Request With this app, you can create maintenance requests.'; " +
    "'The My Drafts button allows you to view all your drafts in the My Maintenance Requests app.'",
  verificationLevel: "sap_official_verified",
};

const F0251A_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Manage Material Coverage (F0251A) | Material Requirements Planning (PP-MRP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/beea5a0c485340769ad37d33537ad962.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "עמוד היישום ב-PP-MRP לגרסת 2025 FPS01 (loio beea5a0c485340769ad37d33537ad962): 'Manage Material Coverage (F0251A) App " +
    "ID: F0251A With this app, you can display and analyze coverage issues that exist for selected materials.'; 'Note " +
    "This app is the successor of the app Manage Material Coverage (F0251).'; 'However, this app does not yet fully cover " +
    "all aspects of the current Manage Material Coverage (F0251) app.'",
  verificationLevel: "sap_official_verified",
};

const F5460_WHATS_NEW_2025_FPS01: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Enhancements for Advanced Scheduling Board | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/65074cb6e3be4f958e16d5c14d83e2a8.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE23,
  claim:
    "רשומת What's New לגרסת 2025 FPS01 (loio 65074cb6e3be4f958e16d5c14d83e2a8): 'This release delivers functional and " +
    "configurational enhancements across the Advanced Scheduling Board (ASB) application including updates'; בפרטים " +
    "הטכניים: 'Technical Details Type Changed Functional Localization No localization Scope Item Not applicable Technical " +
    "Object Name App ID: F5460 Application Component SCM-APO-PPS-DS'.",
  verificationLevel: "sap_official_verified",
};

const W0020_DELETION_2023: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2023.000",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
  accessedAt: DATE23,
  claim:
    "רשומת What's New לגרסת SAP S/4HANA 2023 (loio 22fd7c9f368f454fad5b3acfa5a26b6d): 'The Confirm Jobs app (W0020) has " +
    "been deleted and is no longer available on the SAP Fiori launchpad.'; 'You can use the following successor apps " +
    "which are available on the SAP Fiori launchpad to review, execute, and report the findings for the jobs dispatched " +
    "for execution: Perform Maintenance Jobs (F5104A'; 'Report and Repair Malfunction (F2023).'; בשורת הסיכום: 'See More " +
    "App Deleted BH1 BJ2 PM SAP S/4HANA 2023'.",
  verificationLevel: "sap_official_verified",
};

/* ------------------------- 2026-09-24 batch: status sources (see records) */

const F1511_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "SAP Fiori Apps Reference Library: Request Maintenance (F1511), S/4HANA 2025 FPS01",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1511')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת הספרייה ל-F1511 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, לא ה-JS shell): " +
    "AppName 'Request Maintenance', EnglishTitle 'Monitor Maintenance Requests, Request Maintenance', Published, " +
    "ApplicationType Transactional, UITechnology 'SAP Fiori (SAPUI5)', ApplicationComponent PM-FIO-WOC-MN (Fiori UI for " +
    "PM Maintenance Notifications). תפקיד עסקי מוביל (isLeading) SAP_BR_EMPLOYEE_MAINTENANCE (R0056-10, Employee - " +
    "Maintenance Info); תפקידים נוספים SAP_BR_EMPLOYEE, SAP_BR_MAINTENANCE_PLANNER, SAP_BR_MAINTENANCE_TECHNICIAN. " +
    "קטלוגים עסקיים SAP_EAM_BC_MREQ (EAM - Maintenance Request) ו-SAP_EAM_BC_TO; קטלוג טכני SAP_TC_EAM_COMMON. שירות " +
    "OData יחיד EAM_NTF_CREATE גרסה 0001 (S4CORE 109). Semantic Object/Action מוביל " +
    "MaintenanceNotification/create_simple. טרנזקציית GUI מובילה IW21, קשורות IW22/IW23/IW26/IW27/IW28. " +
    "NumberofSuccessors=1: F1511A 'Create Maintenance Request'; שורות היחס שחזרו בשאילתת S32OP נושאות " +
    "predecessorReleaseId S32PCE (קבוצה 'SAP S/4HANA (Private Cloud and On-Premise)') ו-successorReleaseId S32PCE " +
    "ו-S37 (Public Cloud); היקף היחס ל-On-Premise לא נקבע מהרשומה, ושתי האפליקציות מתועדות זו לצד זו ב-2025 FPS01. " +
    "הודעות RIN: 3493254 (Front-End), 3671888 (Back-End). AppDocumentationLink זהה לרשומת ה-sap_help לעיל. בהרצה " +
    "נפרדת על S27OP (2023) חוזרים אותם תפקידים, קטלוגים, שירות OData וטרנזקציות GUI, עם OData על S4CORE 108 ומספרי " +
    "RIN 3336823/3351047.",
  verificationLevel: "sap_official_verified",
};

const F2774_MAINT_MGMT: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Mass Schedule Maintenance Plans | Maintenance Management",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/12f60922946c4ec49807c81ad93d5ba4.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE22,
  claim:
    "Maintenance Management לגרסת 2025 FPS01: 'Mass Schedule Maintenance Plans Use App ID: F2774 With this app, " +
    "you can schedule all maintenance plans that are due within a specific time frame'.",
  verificationLevel: "sap_official_verified",
};

const F2336_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "SAP Fiori Apps Reference Library: Manage Production Orders (F2336), S/4HANA 2025 FPS01",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2336')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת הספרייה ל-F2336 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData של הספרייה (scripts/fal-app.mjs, לא מעטפת " +
    "ה-JavaScript): AppName 'Manage Production Orders', isPublished Published, ApplicationType Transactional, " +
    "UITechnology 'SAP Fiori (SAPUI5)', ApplicationComponent PP-FIO-SFC (Fiori UI for Production Orders). התפקיד " +
    "העסקי המוביל (isLeading) הוא SAP_BR_PRODN_SUPERVISOR_DISC (R0115-01, 'Production Supervisor - Discrete " +
    "Manufacturing'); רשימת התפקידים מדפיסה שורה אחת. הקטלוג העסקי SAP_SCM_BC_PRODN_ORD_MNTR ('Production Control " +
    "(Discrete) - Order Monitoring'); הקטלוג הטכני SAP_TC_SCM_PP_COMMON. Semantic Object/Action: " +
    "ManufacturingOrderItem-manage. שירות ה-OData הראשי (PrimaryODataServiceName) הוא PP_MPE_ORDER_MANAGE גרסה 0001; " +
    "לצידו מודפסים LO_VCHCLF, MPE_HOLD_SRV, MPE_MATERIAL_POVER, MPE_PRODNORD_POVER, MPE_WORKCENTER_POVER ו-PP_MPE_AOR " +
    "(כולם 0001, S4CORE 109), וקבוצת השירות V4 PP_MPE_AOR_SRV (מופיעה פעמיים ברשימה). טרנזקציית GUI מובילה CO02; " +
    "טרנזקציות קשורות CO05, CO05N, CO09, CO0R5, CO20, CO21, CO22, CO23, CO26, COHV, COOIS; CO01 אינה מופיעה ברשימה " +
    "שהספרייה מדפיסה. NumberofPredecessors=0, NumberofSuccessors=0. הודעות RIN: 3493254 (Front-End Server), 3671888 " +
    "(Back-End Server). Backend S4CORE 109 SP 0001 (SAP S/4HANA 2025); UI UIS4H 109 SP 0001. AppDocumentationLink " +
    "מפנה ל-help.sap.com (outputlink, version=2025.001, topic ee813158edcc9144e10000000a4450e5).",
  verificationLevel: "sap_official_verified",
};

const F5325_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Manage Maintenance Plans (F5325), SAP Fiori Apps Reference Library, S32OP (S/4HANA 2025 FPS01)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F5325')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת הספרייה ל-F5325 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, לא ה-JS shell): " +
    "Published, ApplicationType Transactional, UITechnology 'SAP Fiori elements', ApplicationComponent PM-FIO-PRM-MP " +
    "(Fiori UI for PM Maintenance Plans). תפקיד עסקי מוביל SAP_BR_MAINTENANCE_PLANNER (R0088, Maintenance Planner), " +
    "תפקיד נוסף SAP_BR_MD_SPECIALIST_EAM (R0097-180, Master Data Specialist - Maintenance Management). קטלוגים עסקיים " +
    "SAP_EAM_BC_MPLAN (EAM - Maintenance Plan) ו-SAP_EAM_BC_MP_MNG (EAM - Maintenance Planning Management); קטלוג " +
    "טכני SAP_TC_EAM_COMMON. שלושה שירותי OData: /SSB/SMART_BUSINESS_RUNTIME_SRV, C_MAINTPLANACTVSYSTSTATUSQ_CDS, " +
    "UI_MAINTENANCE_PLAN (כולם גרסה 0001, S4COREOP 109). טרנזקציית GUI מובילה IP01, טרנזקציות קשורות IP02, IP03, " +
    "IP04, IP05, IP06, IP16. קודמים רשומים: F3622 (Find Maintenance Plans), F5009 (Find Maintenance Plans - Service), " +
    "W0026 (Manage Maintenance Plan and Item List) (הספרייה משייכת את F3622 ו-F5009 ל-S32PCE ול-S37, ואת W0026 " +
    "ל-S26OP); ללא יורשים. הספרייה משייכת את היישום לפריטי ההיקף 4HI (Proactive Maintenance) ו-BJ2 (Preventive " +
    "Maintenance). רשומת S27OP (2023) הציגה אותו תפקיד מוביל, אותם קטלוגים ואותן טרנזקציות GUI, עם שירות OData יחיד " +
    "(UI_MAINTENANCE_PLAN על S4COREOP 108), והתפקיד SAP_BR_MD_SPECIALIST_EAM אינו מודפס שם. הקודמים F3622, F5009 " +
    "ו-W0026 אינם ביקום המזהים של הפרויקט ולכן אינם ב-xrefs.",
  verificationLevel: "sap_official_verified",
};

/* ----------------------- 2026-09-24 batch 3: status sources (see records) */

const F0247A_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Monitor Material Coverage (Version 2) - SAP Fiori Apps Reference Library (Apps('F0247A')/S32OP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0247A')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת ספריית ה-Fiori (S32OP = 2025 FPS01, scripts/fal-app.mjs) מציגה את F0247A כ-'Monitor Material Coverage " +
    "(Version 2)', Transactional / SAP Fiori elements, סטטוס Published, רכיב PP-FIO-MRP; תפקידים " +
    "SAP_BR_MATL_PLNR_EXT_PROC (R0100-21) ו-SAP_BR_PRODN_PLNR (R0114); קטלוג עסקי SAP_SCM_BC_MRPCOCKPIT, קטלוג טכני " +
    "SAP_TC_SCM_PP_COMMON; intent MRPMaterial-monitorSegment; שירותי OData PP_MRP_AOR_SRV, " +
    "PP_MRP_MATERIAL_COVERAGE_POVER_SRV_ ו-PP_MRP_MATERIAL_COVERAGE_SRV (כולם S4CORE 109); טרנזקציית GUI מובילה MB53, " +
    "קשורות MD04/MD06/MD07/MS06/MS07; backend S4CORE 109 SP 0001, UI UIS4H 109; קודמת: F0247 'Monitor Material " +
    "Coverage - Net Segments'; אין יורשת; RIN notes 3493254 (Front-End) ו-3671888 (Back-End); קישור התיעוד מפנה " +
    "ל-loio 5d0feac5e1c447f2a2bab0976215f3b2.",
  verificationLevel: "sap_official_verified",
};

const F2176_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "Production Scheduling Board - SAP Fiori Apps Library, structured record (F2176, S32OP)",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2176')/S32OP",
  accessedAt: DATE24,
  claim:
    "node scripts/fal-app.mjs F2176 --release S32OP מחזיר את רשומת ה-xsodata המובנית (לא מעטפת JS): 'AppName': " +
    "'Production Scheduling Board', 'Description': 'An application to monitor and schedule the capacity of production " +
    "resources', 'ApplicationType': 'Transactional', 'UITechnology': 'SAP Fiori (SAPUI5)', 'ApplicationComponent': " +
    "'SCM-APO-PPS-DS' (Detailed Scheduling), 'isPublished': 'Published' תחת ReleaseName 'S/4HANA 2025 FPS01'. " +
    "SplitBusinessRole: 'BusinessRoleName': 'SAP_BR_PRODN_PLNR' (RoleID R0114, Production Planner, isLeading X). " +
    "SplitBusinessCatalog: 'BusinessCatalogName': 'SAP_SCM_BC_CAPA_PLAN' ('Capacity - Capacity Planning'). " +
    "SplitTechnicalCatalogs: 'SAP_TC_SCM_APS_COMMON'. SplitAdditionalIntents: SemanticObject 'CRPResource', " +
    "SemanticAction 'schedule'. RequiredODataServices/ODataServices: TechnicalName 'PPDS_RES_SCHEDULE', Version " +
    "'0001', SoftwareComponentName 'S4CORE 109'. fuzzy.LeadingTransactionCodes: '/SAPAPO/CDPS0'; " +
    "fuzzy.TransactionCodes (related): '/SAPAPO/CDPS1, /SAPAPO/CDPS2, /SAPAPO/CDPS3, /SAPAPO/RPT'. " +
    "RetrofittedSWCBackend 'S4CORE 109 - SP 0001' / RetrofittedSWCUI 'UIS4H 109 - SP 0001', " +
    "ProductVersionOfficialNameBackend 'SAP S/4HANA 2025'. NumberofPredecessors 0, NumberofSuccessors 0 " +
    "(PredecessorDetails ו-Successors ריקים). AppDocumentationLink מפנה לנושא help.sap.com עם loio " +
    "E5A89957C59F6C10E10000000A441470, גרסה 2025.001.",
  verificationLevel: "sap_official_verified",
};

const F3289_FAL_S32OP: Evidence = {
  sourceType: "fiori_library",
  sourceTitle: "SAP Fiori Apps Reference Library: Manage Work Center Capacity (F3289), S/4HANA 2025 FPS01",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3289')/S32OP",
  accessedAt: DATE24,
  claim:
    "רשומת הספרייה ל-F3289 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, לא ה-JS shell): " +
    "AppName ו-EnglishTitle 'Manage Work Center Capacity', Published, ApplicationType 'Transactional, Analytical', " +
    "UITechnology 'SAP Fiori elements', ApplicationComponent PP-CFS-CE (Capacity Evaluation). תפקיד עסקי מוביל " +
    "(isLeading) SAP_BR_PRODN_PLNR (R0114, Production Planner). קטלוג עסקי SAP_SCM_BC_CFS (Production Planning - " +
    "Capacity Evaluation); קטלוג טכני SAP_TC_SCM_PP_COMMON. שני שירותי OData: PP_CFS_CAPEVAL_SRV גרסה 0001 " +
    "ו-PP_MRP_AOR_SRV גרסה 0001, שניהם S4CORE 109. Semantic Object/Action WorkCenter/evaluateCapacity. טרנזקציית GUI " +
    "מובילה CM01; רשימת הטרנזקציות הקשורות (related) ריקה. NumberofPredecessors=0, NumberofSuccessors=0: אין יחסי " +
    "החלפה רשומים. ScopeItems: 31L 'Production Capacity Evaluation'. הודעות RIN: 3493254 (Front-End), 3671888 " +
    "(Back-End). AppDocumentationLink נושא את אותו loio (74e3356c89914b1495667e7d1f76eb23) כמו רשומת ה-sap_help " +
    "הראשונה למעלה, כלומר אותו עמוד תיעוד.",
  verificationLevel: "sap_official_verified",
};

/* ---------------------------------------------------------------- records */

export const FIORI_VERIFICATION: VerificationRecord[] = [
  /* --------------------------------------------------------- fiori:F2731 */
  {
    id: "fiori:F2731",
    evidence: [
      F2731_MANAGE_MAINT_ORDERS_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements for Manage Maintenance Orders App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/ec6bf626bf8246439f2795f31e7f07c3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "'New features are available in the Manage Maintenance Orders app (F5241)'. פריט ה-What's New של 2025 FPS01 " +
          "(ASM-1E7F-07C3) מצמיד את השם Manage Maintenance Orders למזהה F5241 גם במהדורה הנוכחית של On-Premise ושל " +
          "Cloud Private Edition.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library, externalViewer appId=F2731",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F2731",
        accessedAt: DATE,
        claim:
          "הכתובת מחזירה את מעטפת ה-JS הגנרית של הספרייה (כותרת 'SAP Fiori Apps Reference Library') ללא שם יישום. " +
          "חיפוש רשת מוגבל לדומיינים fioriappslibrary.hana.ondemand.com ו-fal.cloud.sap לא החזיר אף עמוד ספרייה עבור " +
          "F2731, בעוד שעבור F5241 קיים עמוד ספרייה שכותרתו 'Manage Maintenance Orders - Fiori Apps Library'. " +
          "הספרייה החדשה fal.cloud.sap מפנה להתחברות OAuth ואינה ניתנת לבדיקה ללא משתמש. שני חיפושי help.sap.com על " +
          "'F2731' (On-Premise ו-Public Cloud) לא החזירו אף רשומה הנוקבת במזהה זה.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library, F2731 (S32OP / S27OP) and leading apps for IW31 (S32OP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2731')/S32OP",
        accessedAt: DATE24,
        claim:
          "node scripts/fal-app.mjs F2731 החזיר 'not in this release (empty Results)' גם ב-S32OP (S/4HANA 2025 FPS01) " +
          "וגם ב-S27OP (S/4HANA 2023). חיפוש --tcode IW31 ב-S32OP מונה חמישה יישומים מובילים: F2023 Report and Repair " +
          "Malfunction, F2953 My Inbox - Maintenance Management, F5241 Manage Maintenance Orders [SAP Fiori elements], " +
          "IW31 Create Order [SAP GUI] ו-W0017 Process Maintenance Order [Web Dynpro]; F2731 אינו ביניהם. הממצא השלילי " +
          "מוגבל לשתי המהדורות שנבדקו.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "sap_press_book",
        sourceTitle: "SAP Fiori Apps for SAP S/4HANA: The Quick Reference Guide, פרק Plant Maintenance, ערך F5241",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הספר (Tier-2, ספריית הפרויקט) מתעד 'Manage Maintenance Orders (F5241) Application Type: Transactional' " +
          "כיישום המציג רשימה מקיפה של הזמנות תחזוקה ומאפשר יצירה, תכנון וסילוק (settlement) של הזמנות; אין בו ערך " +
          "למזהה F2731. גם אינדקס 1,450 היישומים במאגר (data/library/fiori-apps.json) רושם F5241 = Manage Maintenance " +
          "Orders ואינו מכיל F2731.",
        verificationLevel: "supported_secondary_source",
        repoRef: "data/library/book7-full.json:7696-7698",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "המזהה F2731 אינו מופיע באף רשומה רשמית שנמצאה (חיפושי help.sap.com ל-On-Premise ול-Public Cloud, ספריית " +
        "היישומים הקלאסית, חיפוש רשת מוגבל לדומיינים הרשמיים, ובדיקה חוזרת ב-2026-09-24 שהחזירה Results ריקים ב-S32OP " +
        "וב-S27OP), ובתוך המאגר הוא נושא שלושה שמות שונים. הכותרת Manage Maintenance Orders שהרשומה המתוחזקת נושאת " +
        "שייכת בתיעוד הרשמי של 2025 FPS01 ליישום F5241, שמופיע בספרייה בין היישומים המובילים של קוד הטרנזקציה IW31 " +
        "(לצד F2023, F2953, W0017 ו-IW31 עצמו). לכן לא ניתן לקבוע סטטוס S/4HANA ליישום 'F2731', והרשומה נשארת 'נדרש " +
        "אימות נוסף' עד תיקון המזהה.",
      edition: "on-premise",
      release: "2025.001",
      source: F2731_MANAGE_MAINT_ORDERS_TOPIC,
      recommendedAction:
        "לתקן את המזהה ברשומה המתוחזקת ל-F5241 (data/fiori/apps.ts, data/centers/fiori.ts, רשומות IW32, IW33, IW37N, " +
        "IW38, IW39 ו-IW40 ב-data/tx-intel.ts) ולצרף לאחר התיקון את כתובת ספריית היישומים appId=F5241; ליישב את " +
        "'Create Maintenance Order (F2731)' ב-data/lifecycle.ts וב-data/solutions.ts, כי לא נמצא מקור רשמי המצמיד שם " +
        "זה ל-F2731; לתקן את ההפניה ל-F2731 בספר הלימוד QM ל-F2345 לפי רשומת Manage Usage Decisions הרשמית. עד אז " +
        "להציג את 'F2731' עם פסיקת 'נדרש אימות נוסף' ולא כיישום S/4HANA מאומת.",
    },
    xrefs: ["tx:IW31", "tx:IW32", "tx:IW38", "fiori:F4604", "table:AUFK", "fiori:F5241"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: scripts/sap-help-search.mjs בחמש שאילתות (Manage Maintenance Orders, F5241, F2731 ב-On-Premise " +
      "וב-Public Cloud, App ID: F2731, Manage Usage Decisions App ID), חיפוש רשת מוגבל-דומיין לספריית ה-Fiori " +
      "ול-help.sap.com, בדיקת HTTP ישירה של externalViewer?appId=F2731 (מעטפת JS), של SingleApp.xsodata (HTTP 400 " +
      "ללא הזדהות) ושל fal.cloud.sap/app/F2731 (הפניה ל-OAuth), ורובד Tier-2 מהמאגר. סתירה: הקטלוג המתוחזק, " +
      "data/centers/fiori.ts ורשומות tx-intel קוראים ל-F2731 'Manage Maintenance Orders'; data/lifecycle.ts " +
      "ו-data/solutions.ts קוראים לו 'Create Maintenance Order'; ספר הלימוד QM קורא לו 'Manage Usage Decisions' " +
      "(רשמית F2345). אף מקור רשמי אינו נוקב ב-F2731, ולכן הכותרת האמיתית של F2731 לא נקבעה: ייתכן שהמזהה אינו קיים " +
      "בספרייה, וייתכן שהוא שייך ליישום שאינו מאונדקס בחיפוש; רק ספריית היישומים עם משתמש מחובר תכריע. רשומות What's " +
      "New של 2025 (loio e765a4541f49412b9508fdab1ecaf2c9) מצמידות ל-F5241 את פריטי ההיקף 4HH, 4HI, BH1 ו-BJ2; מרכיב " +
      "היישום של היישום עצמו לפי רשומת ec6bf626bf8246439f2795f31e7f07c3 הוא PM-FIO-WOC-MO (Fiori UI for PM " +
      "Maintenance Orders), ופריט Email Templates for Maintenance Orders (loio 8b01a44fc81a4eacb35cdc17114c6afd, 2025 " +
      "FPS01) נוקב ל-F5241 את המרכיב PM-WOC-MO-PRI. מהדורה ראשונה של F5241, תפקיד עסקי, קטלוג ושירות ה-OData לא " +
      "אומתו מול מקור רשמי ואינם נטענים כאן. fiori:F5241 אינו קיים ב-data/fiori/apps.ts ולכן אינו ב-xrefs ואינו יורש; " +
      "לא הוגדר alias, כדי ש-F5241 לא יפוענח לרשומה שגויה. cds:C_MaintOrderListReport שברשומה המתוחזקת אינו במניפסט " +
      "המסלולים ולכן אינו ב-xrefs. תאריך הגישה הוטבע כ-2026-09-02 לפי מדיניות הסבב; ריצת כלי החיפוש עצמה דיווחה " +
      "2026-09-05. תוספת 2026-09-23: היישום הרשמי Manage Maintenance Orders נכנס לקטלוג כ-fiori:F5241, ונוסף כאן כקישור; ההערה הקודמת שלפיה F5241 אינו בקטלוג נכונה לתאריכה. הכרעה אם לפרוש או למפתח מחדש את הרשומה האצורה F2731 נשארת החלטת מוצר. " +
      "תוספת 2026-09-24: node scripts/fal-app.mjs F2731 החזיר 'not in this release (empty Results)' גם ב-S32OP וגם " +
      "ב-S27OP; חיפוש --tcode IW31 ב-S32OP מונה חמישה יישומים מובילים (F2023, F2953, F5241 Manage Maintenance Orders " +
      "[SAP Fiori elements], IW31 [SAP GUI], W0017 [Web Dynpro]) ואינו כולל את F2731. הממצא השלילי מוגבל לשתי " +
      "המהדורות שנבדקו.",
  },

  /* --------------------------------------------------------- fiori:F1511 */
  {
    id: "fiori:F1511",
    evidence: [
      F1511_FEATURE_COMPARISON,
      {
        sourceType: "sap_help",
        sourceTitle: "Request Maintenance | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/e0a05d562fc7f64ee10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיאור האפליקציה בתיעוד Maintenance Management לגרסת 2025 FPS01: 'You can use this app to easily request " +
          "that maintenance work or repairs be done on a technical object'. לאפליקציה אריח שני, 'Monitor Maintenance " +
          "Requests', הפותח רשימת הודעות למעקב אחר כל בקשות התחזוקה שהוגשו (כלשון הסניפט). רכיב היישום לדיווח " +
          "תקלות: PM-FIO. העמוד מפנה ל-'App Implementation: Request Maintenance' ול-'App Extensibility: Request " +
          "Maintenance'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS), רשומת F1511",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-24 רשומת המאגר (trust: curated, מקור 'SAP Fiori Apps Library (curated)', נסקרה 2026-07-15) כינתה " +
          "את F1511 'Create Maintenance Request' / 'פתיחת בקשת אחזקה', עם IW21 כטרנזקציית ה-GUI, קטלוג " +
          "SAP_EAM_BC_MAINT_WORKER, תפקיד SAP_BR_MAINTENANCE_TECHNICIAN ושירות API_MAINTENANCENOTIFICATION. הראיה " +
          "הרשמית של ספריית היישומים (להלן) קובעת שם רשמי אחר ('Request Maintenance'), תפקיד מוביל שונה " +
          "(SAP_BR_EMPLOYEE_MAINTENANCE), קטלוג שונה (SAP_EAM_BC_MREQ) ושירות OData שונה (EAM_NTF_CREATE); IW21 בלבד " +
          "תאם. ב-2026-09-24 עודכנו ברשומה השם (Request Maintenance), התפקיד, הקטלוג, שירות ה-OData, טרנזקציות ה-GUI " +
          "(IW21, IW22, IW23, IW26, IW27, IW28), המקור ורמת ה-trust (verified-docs) לפי רשומת הספרייה; השם העברי " +
          "וה-slug נשארו. הצימוד הישן של השם למזהה חוזר עדיין ב-data/centers/fiori.ts, ב-data/lifecycle.ts (IW21) " +
          "וב-data/tx-intel.ts (IW21, IW25).",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F1511",
      },
      F1511_FAL_S32OP,
    ],
    status: {
      status: "s4_native",
      he:
        "F1511 היא אפליקציית Fiori של S/4HANA, מתועדת ב-Maintenance Management לגרסת 2025 FPS01 תחת App ID F1511 " +
        "ובספריית יישומי ה-Fiori (ערוץ OData הרשמי) תחת השם 'Request Maintenance': בקשת עבודת תחזוקה או תיקון על " +
        "אובייקט טכני, עם אריח מעקב 'Monitor Maintenance Requests'. הספרייה מאשרת Published הן על S32OP (2025 FPS01) " +
        "והן על S27OP (2023), עם תפקיד עסקי מוביל Employee - Maintenance Info, קטלוג עסקי SAP_EAM_BC_MREQ ושירות " +
        "EAM_NTF_CREATE. השם שהמאגר נשא עד 2026-09-24, 'Create Maintenance Request', שייך לאפליקציה נפרדת, F1511A, " +
        "שהתיעוד הרשמי משווה אליה בעמוד ייעודי. רשומת הספרייה מציגה את F1511A כיורשת של F1511 (NumberofSuccessors=1) " +
        "בשורות יחס המסומנות S32PCE (Private Cloud and On-Premise) ו-S37 (Public Cloud); היקף היחס ל-On-Premise לא " +
        "הוכרע, ושתי האפליקציות מתועדות זו לצד זו ב-2025 FPS01. לא נמצא רישום רשמי של הוצאה משימוש עבור F1511 " +
        "ב-On-Premise.",
      edition: "on-premise",
      release: "2025.001",
      source: F1511_FAL_S32OP,
      recommendedAction:
        "פרטי הספרייה הרשמיים (שם Request Maintenance, תפקיד SAP_BR_EMPLOYEE_MAINTENANCE, קטלוג SAP_EAM_BC_MREQ, שירות " +
        "EAM_NTF_CREATE, טרנזקציות GUI IW21/IW22/IW23/IW26/IW27/IW28) הועתקו ב-2026-09-24 לרשומת הקטלוג " +
        "data/fiori/apps.ts#F1511 במקום פרטי הרשומה האצורה; נותר לתקן את אותו צימוד שם-מזהה ב-data/centers/fiori.ts, " +
        "בשורת IW21 ב-lifecycle וב-s4Delta של IW21 ו-IW25 ב-tx-intel, ולהקים/לעדכן רשומה נפרדת ל-F1511A 'Create " +
        "Maintenance Request'. בהטמעה חדשה של דיווח בקשות מהשטח להשוות בין F1511 ו-F1511A לפי עמוד ההשוואה הרשמי; " +
        "לפני בחירה בין האפליקציות, גם ב-On-Premise, לבדוק את משמעות יחס ה-successor ל-F1511A שהספרייה מציגה (שורות " +
        "S32PCE ו-S37).",
    },
    xrefs: ["tx:IW21", "table:QMEL", "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification", "fiori:F1511A"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: בנוסף לכותרת ולעמוד ההשוואה שכבר תועדו ב-2026-09-02, ריצה ישירה של scripts/fal-app.mjs (ערוץ ה-OData " +
      "הרשמי של ספריית ה-Fiori, לא JS shell) על S32OP ו-S27OP החזירה רשומה מלאה של F1511: Published, שם רשמי 'Request " +
      "Maintenance', תפקיד/קטלוגים/שירות OData/טרנזקציות GUI/הודעות RIN, ואותם תפקידים, קטלוגים, שירות וטרנזקציות " +
      "בשתי המהדורות (גרסת S4CORE ומספרי ה-RIN שונים). פרטי הרשומה הרשמית סתרו את פרטי ההטמעה שהרשומה האצורה במאגר " +
      "נשאה עד 2026-09-24 (תפקיד, קטלוג, שירות OData); ה-GUI IW21 בלבד תאם. שאילתת S32OP מחזירה את F1511A כיורשת " +
      "(שורות S32PCE ו-S37); F1511 עצמה Published ב-S32OP וב-S27OP ומתועדת לצד F1511A, ולכן הסטטוס נשאר s4_native; " +
      "היקף יחס ה-successor ל-On-Premise נשאר פתוח. לא בוצעה בדיקה במערכת SAP חיה. תוספת ל-2026-09-24: catalogPatch " +
      "המצורף לוקח את השם, התפקיד, הקטלוג, השירות והטרנזקציות ישירות מרשומת S32OP; הוא הוחל באותו יום על " +
      "data/fiori/apps.ts#F1511 (השם העברי וה-slug נשארו, ומשפט explain.technical שנקב ב-API_MAINTENANCENOTIFICATION " +
      "הוחלף בשירות שהספרייה מדפיסה). היסטוריה (Old → New): ב-2026-09-02 אומתו רק הכותרת וכתובת הספרייה (S24OP, " +
      "מעטפת JavaScript) ושני רישומי help.sap.com; מקורות Tier-2 (book7: F1511 בשם Monitor Maintenance Requests, " +
      "F1511A בשם Create Maintenance Request; pm-textbook פרק 8: F1511A) התיישבו עם הממצא; לא נמצא רישום App " +
      "Deprecated או App Deleted עבור F1511 בחיפושים שבוצעו; F1511A לא נרשמה אז כיורשת, ושינוי שם הרשומה האצורה " +
      "הוגדר ב-2026-09-23 כהחלטת מוצר. ב-2026-09-24 הוחלפה שורת S24OP ברשומת OData של S32OP, ונרשם יחס ה-successor " +
      "שהספרייה מציגה.",
  },

  /* --------------------------------------------------------- fiori:F2730 */
  {
    id: "fiori:F2730",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of Confirm Jobs | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/af315b2ddb3e488eb3999f4ae144f0ed.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE,
        claim:
          "רשומת ה-What's New לגרסת SAP S/4HANA 2022 קובעת, כלשון הסניפט: 'The Confirm Jobs app (W0020) is deprecated " +
          "and will be deleted from the SAP Fiori launchpad in an upcoming release'. הסניפט מונה את האפליקציה היורשת: " +
          "'The following successor apps are available on the SAP Fiori Launchpad: Perform Maintenance Jobs (F5104A)', " +
          "ומסווג את הרשומה כ-'App Deprecated' עבור פריטי ההיקף BH1 ו-BJ2 (PM, Plant Maintenance).",
        verificationLevel: "sap_official_verified",
      },
      F2730_DELETION_2023,
      {
        sourceType: "fiori_library",
        sourceTitle: "Confirm Jobs - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('W0020')/S11OP",
        accessedAt: DATE,
        claim:
          "תוצאת החיפוש הרשמית של SAP Fiori Apps Reference Library נושאת את הכותרת 'Confirm Jobs - SAP Fiori Apps " +
          "Reference Library', וכתובת הרשומה מזהה את האפליקציה כ-Apps('W0020'). הדף עצמו הוא יישום JS; פרטי תפקיד, " +
          "קטלוג ו-OData לא נקראו ממנו, וחיפוש מקביל של המזהה F2730 בספרייה לא החזיר אף רשומה בשם Confirm Jobs.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Apps('F2730') S32OP / S27OP ו---tcode IW41 (S32OP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025 FPS01 (S32OP)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2730')/S32OP",
        accessedAt: DATE24,
        claim:
          "הרצה חוזרת של scripts/fal-app.mjs F2730 בגרסאות S32OP (SAP S/4HANA 2025 FPS01) וב-S27OP (SAP S/4HANA 2023) " +
          "החזירה Results ריק בשתי הגרסאות: 'F2730 @ S32OP: not in this release (empty Results)' ו-'F2730 @ S27OP: not " +
          "in this release (empty Results)'. חיפוש משלים לפי הטרנזקציה המתוחזקת, node scripts/fal-app.mjs --tcode IW41, " +
          "מחזיר ב-S32OP את F5104A 'Perform Maintenance Jobs' כאפליקציית ה-SAP Fiori המובילה עבור IW41 (Enter PM Order " +
          "Confirmation, SAP GUI), בהתאמה לרשומות ה-What's New שמזהות את F5104A כיורשת של Confirm Jobs (W0020).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר (trust: curated) רושמת את Confirm Jobs תחת המזהה F2730, עם role SAP_BR_MAINTENANCE_TECHNICIAN, " +
          "catalog SAP_EAM_BC_MAINT_WORKER ו-OData בשם API_MAINTENANCEORDERCONF, ומסמנת s4OnPrem: yes ו-cloud: yes. " +
          "חיפוש 'F2730' בשירות החיפוש של help.sap.com ובספריית ה-Fiori לא החזיר אף רשומה הקושרת את F2730 לאפליקציה " +
          "כלשהי; המקורות הרשמיים קושרים את השם Confirm Jobs למזהה W0020, שנמחק ב-SAP S/4HANA 2023. הרשומה סותרת את " +
          "המקורות הרשמיים הן בזהות המזהה והן בזמינות ב-S/4HANA.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F2730",
        conflictingEvidence: [F2730_DELETION_2023],
      },
    ],
    status: {
      status: "not_available",
      he:
        "אפליקציית Confirm Jobs, שמזהה ה-Fiori שלה במקורות SAP הוא W0020, הוצאה משימוש ב-SAP S/4HANA 2022 ונמחקה " +
        "מה-SAP Fiori Launchpad ב-SAP S/4HANA 2023, לפי רשומות ה-What's New של SAP. רשומת המחיקה נוקבת ב-Perform " +
        "Maintenance Jobs (F5104A) כאפליקציה היורשת. בדיקה חוזרת ב-scripts/fal-app.mjs נכון ל-2026-09-24 החזירה תוצאה " +
        "ריקה עבור המזהה F2730 בספריית ה-Fiori בגרסה 2025 FPS01 (S32OP) ובגרסת 2023 (S27OP). המזהה F2730 שברשומת " +
        "הפרויקט לא נמצא באף מקור רשמי, ולכן זהות המזהה נותרת במחלוקת בין המאגר לבין מקורות SAP.",
      edition: "on-premise",
      release: "2023.000",
      source: F2730_DELETION_2023,
      successor: "fiori:F5104A",
      recommendedAction:
        "לאישור עבודות של טכנאי תחזוקת מפעל יש להפנות לאפליקציית Perform Maintenance Jobs (F5104A) או לטרנזקציות " +
        "IW41/IW42 ב-SAP GUI; אין לתכנן תרחישים חדשים על Confirm Jobs. ברמת המאגר יש לתקן את רשומת data/fiori/apps.ts: " +
        "השם Confirm Jobs שייך למזהה W0020, ויש להסיר את ההפניה 'Confirm Jobs (F2730)' מרשומת IW41 ב-tx-intel ומשורת " +
        "confirm-jobs ב-data/centers/fiori.ts.",
    },
    xrefs: ["fiori:F5104A", "tx:IW41", "tx:IW42", "table:AFRU", "fm:BAPI_ALM_CONF_CREATE", "fiori:W0020"],
    lastVerifiedAt: DATE24,
    notes:
      "זהות המזהה היא הפער המרכזי: שלושה מקורות רשמיים (What's New 2022, What's New 2023 וספריית ה-Fiori) קושרים את " +
      "השם Confirm Jobs למזהה W0020, ואף מקור רשמי שנמצא אינו מזכיר F2730; לכן רמת האימות של הרשומה היא 'מקורות " +
      "סותרים' ולא 'מאומת', אף שהסטטוס עצמו (נמחקה ב-2023, יורשת F5104A) נשען על סניפטים רשמיים כלשונם. פרטי role, " +
      "catalog ו-OData שברשומת המאגר לא אומתו: השירות המתועד לאישורי הזמנות תחזוקה בחוברת 'APIs for Maintenance " +
      "Management' נושא את השם הטכני API_MAINTORDERCONFIRMATION, לא API_MAINTENANCEORDERCONF, וההבדל נרשם כפער ולא " +
      "תוקן כאן. ההפניה 'Confirm Jobs (F2730)' ברשומת IW41 של tx-intel כבר סומנה כסותרת ברשומת tx:IW41. הכינוי " +
      "W0020 נוסף כדי שחיפוש לפי המזהה שבמקורות SAP יגיע לעמוד זה עד לתיקון הרשומה המתוחזקת. כתובות שני נושאי " +
      "ה-What's New נלקחו כלשונן מרשומות שירות החיפוש בריצה החיה (2022: deliverable f5d3e1005efd4e86acf9a65abf428082; " +
      "2023: deliverable f296651f454c4284ade361292c633d69). 2026-09-23: הכינוי W0020 הוסר מרשומה זו, כי W0020 נוסף " +
      "לקטלוג כרשומה עצמאית (fiori:W0020, לא זמין מ-2023 עם היורש F5104A), והרשומה מפנה אליו כעת ב-xrefs בלבד. " +
      "2026-09-24: הרצה חוזרת של scripts/fal-app.mjs (F2730 על S32OP ו-S27OP, ו---tcode IW41) החזירה שוב תוצאה ריקה " +
      "עבור F2730 בשתי הגרסאות, ו---tcode IW41 מונה את F5104A (Perform Maintenance Jobs) כאפליקציית ה-SAP Fiori " +
      "המובילה לטרנזקציה. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* -------------------------------------------------------- fiori:F2730A */
  {
    id: "fiori:F2730A",
    evidence: [
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS) ומרכז ה-Fiori",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר המתוחזקת (curated) מזהה את היישום 'Manage Technical Objects' במזהה F2730A, עם הטרנזקציות IE01 / " +
          "IL01 / IH08 ועם API_EQUIPMENT / API_FUNCTIONALLOCATION; אותו מזהה חוזר ב-data/centers/fiori.ts. המזהה " +
          "F2730A לא נמצא באף רשומת חיפוש של help.sap.com (כל המהדורות) ולא בחיפוש מוגבל לדומיינים הרשמיים " +
          "(fioriappslibrary / fal / api.sap.com), והשם 'Manage Technical Objects' אינו מופיע כשם אפליקציה בתיעוד " +
          "הרשמי שנמצא. המאגר עצמו נוקב בשני מזהים נוספים לאותו שם: F2079 (blueprint של תחזוקת מפעל) ו-F1827 " +
          "(מודיעין הטרנזקציות, IE01).",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F2730A",
        conflictingEvidence: [
          {
            sourceType: "repository",
            sourceTitle: "ה-Blueprint של תחזוקת מפעל (חוברת המיגרציה, sapData.pm.ts)",
            product: "SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE,
            claim:
              "עמודת ה-Fiori של טבלאות האובייקטים הטכניים ב-blueprint של תחזוקת מפעל (IFLOT, IFLOS, ILOA ועוד, 7 " +
              "טבלאות) נוקבת ב-'Manage Technical Objects (F2079)'. המזהה F2079 לא נמצא באף רשומה רשמית; סותר את " +
              "F2730A שברשומה המתוחזקת.",
            verificationLevel: "verification_required",
            repoRef: "data/sapData.pm.ts#IFLOT",
          },
          {
            sourceType: "repository",
            sourceTitle: "מודיעין הטרנזקציות של הפרויקט (TX_INTEL), רשומות IE01 / IL01 / IH08",
            product: "SAP S/4HANA",
            edition: "on-premise",
            accessedAt: DATE,
            claim:
              "שדה ה-Fiori של IE01 נוקב ב-'Manage Technical Objects (F1827 / Equipment)', של IL01 ב-'Manage Technical " +
              "Objects (Functional Location)' ושל IH08 ב-'Manage Technical Objects' ללא מזהה. המזהה F1827 לא נמצא באף " +
              "רשומה רשמית; מזהה שלישי במאגר לאותו שם.",
            verificationLevel: "verification_required",
            repoRef: "data/tx-intel.ts#IE01",
          },
        ],
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Display Master Data Information Center Apps | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/1fae728c81b34dbb8294e903cec45e6e.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim:
          "רשומת ה-What's New לגרסת 2023 קובעת: 'You can use the following successor app which is available on the SAP " +
          "Fiori launchpad: Find Technical Object (F2072)'. האפליקציה היורשת של אפליקציות Display Master Data " +
          "Information Center שנמחקו היא Find Technical Object, ומזהה ה-Fiori שהתיעוד נוקב בו לאיתור אובייקטים טכניים " +
          "הוא F2072, לא F2730A.",
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
        claim:
          "רשומת ה-What's New לגרסת 2025 FPS01 מונה את הערוצים ליצירה ולשינוי של מיקומים פונקציונליים: 'Web Dynpro " +
          "app - Process Technical Object (W0029) to create or change technical objects' ו-'API - Functional Location " +
          "(API_FUNCTIONALLOCATION)'. יצירה ושינוי של אובייקטים טכניים מתועדים באפליקציית Web Dynpro בשם Process " +
          "Technical Object (W0029), לא באפליקציית Fiori בשם Manage Technical Objects.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Technical Object Structures | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/15df8bf64aef43f9bd8680bb0d711f3e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "בחיפוש 'Manage Technical Objects' בתיעוד ניהול התחזוקה לגרסת 2025 FPS01, הרשומה הקרובה ביותר בשמה היא Manage " +
          "Technical Object Structures: 'App ID: F8669 With this app, you can create and manage draft technical object " +
          "structures'. המזהה F8669 והיקף האפליקציה (מבני אובייקטים טכניים בטיוטה) שונים מרשומת F2730A.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library, app id F2730A (S32OP and S27OP lookup)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2730A')/S32OP",
        accessedAt: DATE24,
        claim:
          "scripts/fal-app.mjs F2730A החזיר \"not in this release (empty Results)\" ב-S32OP (S/4HANA 2025 FPS01) וב-S27OP " +
          "(2023); חיפוש --tcode IE01 ב-S32OP החזיר כאפליקציות מובילות את IE01 Create Equipment - Plant (SAP GUI) ואת " +
          "W0029 Process Technical Object (Web Dynpro).",
        verificationLevel: "conflicting_sources",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library, app id W0028 (S32OP lookup)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('W0028')/S32OP",
        accessedAt: DATE24,
        claim:
          "scripts/fal-app.mjs W0028 ב-S32OP (S/4HANA 2025 FPS01) מחזיר: Display Technical Object, Web Dynpro, Published; " +
          "תפקיד SAP_BR_MAINTENANCE_TECHNICIAN (R0090); קטלוג עסקי SAP_EAM_BC_TO_MW; intent MaintenanceObject-display; " +
          "טרנזקציה מובילה IQ09. מזהה ושם שונים מרשומת F2730A.",
        verificationLevel: "sap_official_verified",
      },
    ],
    xrefs: ["tx:IE01", "tx:IE02", "tx:IL01", "tx:IL02", "tx:IH08", "table:EQUI", "table:IFLOT", "table:ILOA", "cds:I_Equipment", "cds:I_FunctionalLocation", "fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE", "fiori:F2072", "fiori:W0029", "fiori:W0028", "fiori:F8669"],
    lastVerifiedAt: DATE24,
    notes:
      "הכותרת המתוחזקת נבדקה ונמצאה בסתירה: המזהה F2730A לא נמצא באף מקור רשמי (חיפוש help.sap.com JSON בכל " +
      "המהדורות וחיפוש מוגבל לדומיינים fioriappslibrary / fal / api.sap.com, בריצות אצוות האימות). גם F2730 (Confirm " +
      "Jobs ברשומת המאגר) אינו מופיע באף רשומה רשמית; רשומת tx:IW41 כבר קבעה ש-Confirm Jobs היא W0020 (הוצאה משימוש " +
      "ב-2022, נמחקה ב-2023), ומקור המזהה F2730A ברשומה המתוחזקת אינו מתועד. האפליקציות המתועדות לאובייקטים טכניים " +
      "ב-S/4HANA On-Premise 2025 FPS01: Find Technical Object (F2072, Fiori; דף המוצר: 'With this app, you can list " +
      "the technical objects in your system', כולל Manage Structure להתקנה ופירוק של ציוד מגרסת 2023), Process " +
      "Technical Object (W0029, Web Dynpro; דף המוצר: 'Three apps are provided for processing a technical object: " +
      "Create Technical Object, Change Technical Object, and Display Technical Object'), Display Technical Object " +
      "(W0028, לפי דפי Data Migration של PM - Equipment ו-PM - Functional location) ו-Manage Technical Object " +
      "Structures (F8669, חדשה ב-2025 FPS01 לפי רשומת ה-What's New). כתובות ספריית ה-Fiori שעלו בחיפוש הדומיינים " +
      "נושאות appId=W0029 ו-appId=W0028, אך הדפים עצמם לא נטענו ולכן לא נרשמו כראיה. הרשומה המתוחזקת מתארת מיזוג של " +
      "F2072 (רשימה ופרטים, מבנה) ושל W0029 (יצירה ושינוי), לא אפליקציה אחת. פרטי התפקיד, הקטלוג וה-OData ברשומה " +
      "(SAP_BR_MAINTENANCE_PLANNER / SAP_EAM_BC_TECH_OBJ / API_EQUIPMENT) לא אומתו. לא נקבע סטטוס: אין רשומה רשמית " +
      "לאפליקציה במזהה זה, והסטטוס הנגזר כיום (חדש ב-S/4HANA, מאומת מול נתוני הפרויקט) אינו נתמך במקור. תיקון המזהה " +
      "ברשומה המתוחזקת הוא החלטת מוצר. תוספת 2026-09-23: ארבעת יישומי האובייקט הטכני המתועדים נכנסו לקטלוג (F2072, W0029, W0028, F8669) ונוספו כאן כקישורים; ההערה הקודמת שלפיה אף אחד מהם אינו בקטלוג נכונה לתאריכה. הגורל של הרשומה האצורה F2730A נשאר החלטת מוצר. " +
      "תוספת 2026-09-24: הרצה ישירה של scripts/fal-app.mjs F2730A ב-S32OP (2025 FPS01) וב-S27OP (2023) החזירה בשתיהן " +
      "'not in this release (empty Results)', כלומר המזהה F2730A לא הוחזר מהספרייה באף אחת משתי המהדורות שנבדקו " +
      "(S32OP, S27OP) נכון לתאריך זה; זהו ממצא שלילי מתועד ולא קביעת אי-קיום. חיפוש --tcode IE01 ב-S32OP החזיר את " +
      "IE01 Create Equipment - Plant (SAP GUI) ואת Process Technical Object (W0029, Web Dynpro); התוצאה תואמת את רשומת " +
      "ה-What's New של 2025 FPS01. באותו יום אומת W0028 ישירות בספרייה (S32OP: Display Technical Object, Web Dynpro, " +
      "Published) ונוסף כשורת ראיה; ייחוס W0028 לדפי Data Migration נשאר בהערה כהיסטוריה, ודפים אלה לא צוטטו כראיה. " +
      "ערכי התפקיד, הקטלוג, ה-OData וה-guiTx ברשומה המתוחזקת data/fiori/apps.ts#F2730A לא שונו במעבר זה ונשארים לא " +
      "מאומתים. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F4072 */
  {
    id: "fiori:F4072",
    evidence: [
      F4072_SCREEN_MAINT_REQUESTS,
      {
        sourceType: "fiori_library",
        sourceTitle: "Screen Maintenance Requests - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4072')/S32OP",
        accessedAt: DATE24,
        claim:
          "הרשומה המלאה שהוחזרה מהשירות הרשמי של הספרייה (scripts/fal-app.mjs, S32OP = S/4HANA 2025 FPS01) עבור " +
          "F4072 Screen Maintenance Requests: Published, Transactional, SAP Fiori app variant; תפקיד עסקי מוביל " +
          "SAP_BR_MAINT_SUPERVISOR (R0198, Maintenance Supervisor); קטלוג עסקי SAP_EAM_BC_MREQ_DSP (EAM - " +
          "Maintenance Requests Display); קטלוג טכני SAP_TC_EAM_COMMON; אובייקט/פעולה סמנטיים " +
          "MaintenanceWorkRequest-edit; שירות OData UI_MAINTWORKREQUESTOVW_V2 גרסה 0001 (S4CORE 109) וקבוצת שירותי " +
          "V4 UI_PRIORITIZATION_PROFILE; רכיב אפליקציה PM-FIO-WOC-MN (Fiori UI for PM Maintenance Notifications); " +
          "רכיב תוכנה בשרת S4CORE 109 SP0001 / SAP S/4HANA 2025, בחזית UIS4H 109 SP0001; טרנזקציית GUI מובילה " +
          "IW21, וקשורות IW22, IW23, IW28, IW29; אפס קודמים ואפס יורשים רשומים (NumberofPredecessors=0, " +
          "NumberofSuccessors=0); הערות RIN 3493254 (Front-End) ו-3671888 (Back-End); סעיפי היקף (Scope Items) " +
          "40G, 4HH, 4HI. אותם נתוני תפקיד, קטלוג, OData ו-GUI-tx חוזרים ברשומת S27OP (S/4HANA 2023, S4CORE 108, RIN " +
          "3336823 / 3351047).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Schedule Maintenance Plans | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/12f60922946c4ec49807c81ad93d5ba4.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "יישום ה-Fiori לתזמון תכניות תחזוקה ב-Maintenance Management 2025 FPS01 מתועד תחת מזהה אחר: 'Mass Schedule " +
          "Maintenance Plans Use App ID: F2774 With this app, you can schedule all maintenance plans that are due " +
          "within a specific time frame'. המזהה F4072 אינו מופיע בקטע זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (data/fiori/apps.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-22 רשומת המאגר הציגה את F4072 כ-'Schedule Maintenance Plans' (תזמון תכניות תחזוקה), סוג Analytical, " +
          "טרנזקציות GUI IP10 / IP30 ושירות OData API_MAINTENANCEPLAN, ברמת trust 'curated', ואותו צימוד שם-מזהה חזר " +
          "ב-data/centers/fiori.ts וב-s4Delta של IP01 / IP02 / IP03 / IP10 / IP30 / IP41 ב-data/tx-intel.ts. תוקן " +
          "ב-2026-09-22: הרשומה שונתה ל-Screen Maintenance Requests (slug screen-maintenance-requests, trust " +
          "verified-docs; תפקיד, קטלוג, OData, טרנזקציות GUI וטבלאות הושארו ריקים כי המקורות אינם מציינים אותם), " +
          "רשומת מרכז ה-Fiori תוקנה בהתאם, וההפניות ל-F4072 ב-tx-intel הוחלפו בשמות היישומים המתועדים לתזמון " +
          "(F2774 / F5325, שלא היו להם רשומות בפרויקט באותה שעה; שתיהן נוספו מאוחר יותר באותו יום). data/library/fiori-apps.json רשם מלכתחילה F4072 = Screen Maintenance " +
          "Requests. ב-2026-09-24 הושלמו ברשומה התפקיד, הקטלוג, שירות ה-OData וטרנזקציות ה-GUI מרשומת הספרייה " +
          "(SAP_BR_MAINT_SUPERVISOR, SAP_EAM_BC_MREQ_DSP, UI_MAINTWORKREQUESTOVW_V2, IW21 / IW22 / IW23 / IW28 / IW29), " +
          "והשם העברי עודכן ל-'סינון וקבלת בקשות תחזוקה' (HOUSE-RULES §7: תחזוקה, לא אחזקה).",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F4072",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "לפי Maintenance Management לגרסת 2025 FPS01 ולפי SAP Fiori Apps Reference Library (S32OP וגם S27OP), המזהה " +
        "F4072 שייך ליישום Screen Maintenance Requests (סינון וקבלה של בקשות תחזוקה, תחום הודעות תחזוקת מפעל), ולא " +
        "ליישום 'Schedule Maintenance Plans' כפי שרשומת המאגר הציגה עד 2026-09-22 (תוקן). היישום קיים ב-S/4HANA " +
        "On-Premise; תזמון תכניות תחזוקה ב-Fiori מתועד תחת מזהה אחר (F2774 Mass Schedule Maintenance Plans).",
      edition: "on-premise",
      release: "2025.001",
      source: F4072_SCREEN_MAINT_REQUESTS,
      recommendedAction:
        "רשומת המאגר תוקנה ב-2026-09-22 (שם, סוג, slug); ב-2026-09-24 הושלמו גם תפקיד, קטלוג ושירות OData מרשומת " +
        "הספרייה הרשמית (SAP_BR_MAINT_SUPERVISOR, SAP_EAM_BC_MREQ_DSP, UI_MAINTWORKREQUESTOVW_V2, טרנזקציות GUI " +
        "IW21/IW22/IW23/IW28/IW29). תוכן תזמון תכניות התחזוקה (IP10 / IP30, API_MAINTENANCEPLAN) לא הועבר לרשומה זו; " +
        "המזהים הרשמיים לתזמון הם F2774 (Mass Schedule Maintenance Plans) ו-F5325 (Manage Maintenance Plans, What's " +
        "New 2022), ולכל אחד מהם רשומת אימות נפרדת.",
    },
    xrefs: [
      "table:QMEL", "tx:IW21", "tx:IW22", "tx:IW23", "tx:IW28", "tx:IW29",
      "fiori:F1511", "tx:IP10", "tx:IP30", "fiori:F1511A",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "ארבע רשומות help.sap.com עצמאיות (Maintenance Management 2025.001; What's New 2023 FPS02, 2025 ו-2025 FPS01) " +
      "ורשומת הספרייה הרשמית מסכימות: F4072 = Screen Maintenance Requests (רשומת המאגר תוקנה בהתאם ב-2026-09-22 " +
      "וסימון הסתירה הוסר). לפי רשומת What's New in SAP S/4HANA 2021 " +
      "(Screen Maintenance Requests, סימון App New, SAP S/4HANA 2021) היישום הופיע לראשונה בגרסת 2021; המידע מהקטע " +
      "בלבד. הסתירה היא בין המאגר לתיעוד הרשמי, ולכן הפתרון הוא תיקון רשומת המאגר; לאחר התיקון ניתן להסיר את סימון " +
      "הסתירה ולהעלות את הרשומה ל-sap_official_verified. בספריית Fiori נמצאה רשומה בשם 'Schedule Maintenance Plan' " +
      "תחת appId=IP10 (קוד הטרנזקציה) ורשומה 'Maintenance Plan Scheduling Overview' תחת W0192; לא נמצא מזהה F ליישום " +
      "PM בשם 'Schedule Maintenance Plans'. ב-deliverable Service (2025.001) מתועד יישום 'Schedule Maintenance Plan - " +
      "Service' ללא מזהה בקטע. ב-SAP S/4HANA Cloud Public Edition 2608 עמוד F4072 נושא את הכותרת 'Screen Maintenance " +
      "Requests (Old Version)', והקטע שנחזר בחיפוש ממליץ על Manage Maintenance Notifications (F5777) ומציין ששני " +
      "היישומים מתקיימים במקביל; זו עדות לענן הציבורי בלבד. בחיפוש On-Premise 2025.001 לא נמצאה רשומה ל-F5777, ולכן " +
      "לא נרשם successor. תפקיד, קטלוג ושירות OData של F4072 לא נקראו (app shell). המזהה של Create Maintenance " +
      "Request בקטעים הרשמיים הוא F1511A בעוד המאגר החזיק אז F1511; נושא לרשומת fiori:F1511. ה-xrefs ל-IP10 / IP30 " +
      "נשמרו כדי שהתיקון יהיה נגיש מדפי הטרנזקציות שמפנות היום ל-F4072. תוספת 2026-09-23: fiori:F1511A (Create Maintenance Request) נכנס לקטלוג ונוסף כאן כקישור ניווט. F5777 לא נוסף: רק רשומות Public Cloud נוקבות בו. " +
      "תוספת 2026-09-24: הרצה חוזרת של scripts/fal-app.mjs (S32OP וגם S27OP) החזירה הפעם רשומה מלאה מהשירות הרשמי " +
      "(לא app shell): תפקיד SAP_BR_MAINT_SUPERVISOR, קטלוג עסקי SAP_EAM_BC_MREQ_DSP, קטלוג טכני SAP_TC_EAM_COMMON, " +
      "שירות OData UI_MAINTWORKREQUESTOVW_V2, טרנזקציות GUI IW21 (מובילה) / IW22 / IW23 / IW28 / IW29, ואפס " +
      "קודמים/יורשים בשתי הגרסאות. הנתונים הועברו לרשומת המאגר data/fiori/apps.ts#F4072. ספריית ה-Fiori (S32OP) רושמת " +
      "אפס יורשים, ובחיפוש On-Premise 2025.001 לא נמצאה רשומה ל-F5777; לכן לא נרשם successor, והסטטוס נשאר " +
      "s4_native. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F2336 */
  {
    id: "fiori:F2336",
    evidence: [
      F2336_FAL_S32OP,
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Manage Production Orders (F2336), S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2336')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותה שאילתה על S27OP (2023) מחזירה Published, Transactional, SAP Fiori (SAPUI5) ו-PP-FIO-SFC, עם אותו תפקיד " +
          "מוביל SAP_BR_PRODN_SUPERVISOR_DISC (R0115-01), אותו קטלוג עסקי SAP_SCM_BC_PRODN_ORD_MNTR, קטלוג טכני " +
          "SAP_TC_SCM_PP_COMMON, intent ManufacturingOrderItem-manage, שירות OData ראשי PP_MPE_ORDER_MANAGE 0001 ואותה " +
          "רשימת טרנזקציות GUI (מובילה CO02; קשורות CO05, CO05N, CO09, CO0R5, CO20, CO21, CO22, CO23, CO26, COHV, COOIS). " +
          "שירותי ה-OData רצים כאן על S4CORE 108, וה-UI על UIS4HOP1 900. הודעות RIN: 3336823 (Front-End Server), 3351047 " +
          "(Back-End Server). NumberofPredecessors=0, NumberofSuccessors=0.",
        verificationLevel: "sap_official_verified",
      },
      F2336_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Processing Production Orders and Operations | Production Engineering and Operations for Complex Assembly",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9c4986bda35f4840ae438960ffbef64d/5fe6af156e554b1e81118df2e7f6e3a7.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "טבלת ההשוואה הרשמית לגרסת 2025 FPS01 מונה תחת App Name / App ID את 'Order Information System - COOIS', " +
          "'Mass Processing of Process and Production Orders - COHV', 'Manage Production Orders' ו-'Manage Production " +
          "Operations' עם המזהים 'COOIS COHV F2336 F2335' בהתאמה; הסניפט מזכיר גם 'Tablet-enabled' ו-'Manage " +
          "order-specific routings ... Supports shop floor orders only', בלי שניתן לשייך כל תא לעמודה מתוך הסניפט לבדו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Production Orders | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/08ce000f41c24de7ade93f215be7898e.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE,
        claim:
          "רשומת What's New 2020 לאפליקציה: 'This feature supports you in your daily work as a production supervisor'; " +
          "Technical Details: Type Changed, Scope Item BJ5 (Make-to-Stock Production - Discrete Manufacturing), " +
          "Application Component PP-SFC-EXE. רשומות What's New בשם 'Manage Production Orders' קיימות גם לגרסאות 1709, " +
          "1909, 2021, 2022, 2023 (שם: 'App Changed BJ5 PP-FIO-SFC') ו-2025 FPS01 ('Additional information in the " +
          "dialog for exchanging a component for an alternative component'), וכן ברשומת 'What's New in SAP S/4HANA' " +
          "עם versionId 100 ('With this app you can monitor the progress of production').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Characteristics as Custom Fields | Product Lifecycle Management (PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/ed8ef9ad029a421d829e5d393873d741.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד PLM לגרסת 2025 FPS01 מונה בטבלת הרחבת השדות: 'Production Order Manage Production Orders (F2336) " +
          "Capacity Scheduling Table (F3770) PP_MPE_ORDER_MANAGE PP_SCHEDULEPRODUCTION_SRV', ומסביר שהמנגנון 'helps " +
          "to extend the apps such as Manage Batches, Manage Production Orders and Capacity Scheduling Table with " +
          "characteristic fields in the search using data source extension'. מהסניפט עולה שהשירות המוצב לצד F2336 הוא " +
          "PP_MPE_ORDER_MANAGE; ההקצאה המדויקת לעמודות הטבלה לא נקראה מגוף העמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS) ומרכז ה-Fiori, רשומת F2336",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-24 רשומת המאגר data/fiori/apps.ts#F2336 (trust: curated) נשאה role SAP_BR_PRODN_OPERATOR_DISC, " +
          "catalog SAP_PP_BC_PRODN_ORDER, odata API_PRODUCTION_ORDER_2, cds I_ProductionOrder ו-guiTx " +
          "['CO01','CO02','COOIS'] ו-relatedTables AUFK/AFKO/AFPO; רשומת מרכז ה-Fiori " +
          "data/centers/fiori.ts#manage-production-orders נושאת את אותם ערכי catalog/role/odata ו-'CO01 / CO02 / COOIS'. " +
          "ארבעת השדות שונים מהערכים ששתי רשומות ספריית ה-Fiori לעיל מחזירות: התפקיד המוביל הוא " +
          "SAP_BR_PRODN_SUPERVISOR_DISC, הקטלוג העסקי SAP_SCM_BC_PRODN_ORD_MNTR, שירות ה-OData הראשי PP_MPE_ORDER_MANAGE, " +
          "וטרנזקציית ה-GUI המובילה CO02; CO01 אינה מופיעה ברשימת הטרנזקציות שהספרייה מדפיסה לאפליקציה. השם וה-Type " +
          "(Transactional) תואמים. תצוגת ה-CDS I_ProductionOrder נשארת ברמת המאגר. catalogPatch המצורף לרשומה זו מעתיק את " +
          "ארבעת השדות (role/catalog/odata/guiTx) כלשונם מהספרייה.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2336 (+data/centers/fiori.ts#manage-production-orders)",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית SAP Fiori (Transactional, SAPUI5) לניהול הזמנות ייצור בייצור בדיד, מודול PP. ספריית יישומי ה-Fiori " +
        "מחזירה Published הן על S/4HANA 2025 FPS01 (S32OP) והן על S/4HANA 2023 (S27OP), עם תפקיד עסקי מוביל Production " +
        "Supervisor - Discrete Manufacturing, קטלוג עסקי Production Control (Discrete) - Order Monitoring, שירות OData " +
        "ראשי PP_MPE_ORDER_MANAGE וטרנזקציית GUI מובילה CO02; עמוד האפליקציה בתיעוד Production Orders (PP-SFC) מציין את " +
        "אותו תפקיד ומתאר מעקב אחר התקדמות הייצור. הספרייה רושמת אפס קודמים ואפס יורשים (NumberofPredecessors=0, " +
        "NumberofSuccessors=0).",
      edition: "on-premise",
      release: "2025.001",
      source: F2336_FAL_S32OP,
      recommendedAction:
        "ה-catalogPatch הוחל ב-2026-09-24 על data/fiori/apps.ts#F2336: role SAP_BR_PRODN_SUPERVISOR_DISC, catalog " +
        "SAP_SCM_BC_PRODN_ORD_MNTR, odata PP_MPE_ORDER_MANAGE, ו-guiTx לפי רשימת הספרייה עם CO02 כמובילה. רשומת " +
        "data/centers/fiori.ts#manage-production-orders אינה נכללת בו: היא נושאת את אותם ערכים שאינם תואמים לספרייה " +
        "ודורשת תיקון נפרד. להציג את האפליקציה כמסך מעקב ועריכה לאחראי ייצור (Production Supervisor) בייצור בדיד, שמושווה " +
        "בתיעוד ל-COOIS ול-COHV, ולא כתחליף מלא לכל מסכי PP-SFC.",
    },
    xrefs: [
      "tx:CO02", "tx:CO03", "tx:CO05N", "tx:CO09", "tx:COHV", "tx:COOIS", "table:AUFK", "table:AFKO", "table:AFPO",
      "cds:I_ProductionOrder",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "עודכן ב-2026-09-24: רשומת F2336 בספריית ה-Fiori נקראה דרך ערוץ ה-OData של הספרייה (scripts/fal-app.mjs) על S32OP " +
      "(2025 FPS01) ועל S27OP (2023), וגוף עמוד האפליקציה ב-help.sap.com (loio 0a4622d10e7e49478943891624ea7ca8, " +
      "2025.001) נקרא מחדש דרך sap-help-body.mjs ומכיל את כל הציטוטים בשורת F2336_APP_TOPIC. Old → New: (1) שורת " +
      "הספרייה הקלאסית (appId=F2336, כותרת רשומת חיפוש 'Manage Production Orders - SAP Fiori Apps Reference Library', " +
      "גוף מעטפת JavaScript שלא נקרא) הוחלפה בשתי רשומות הספרייה שנקראו ב-OData; המזהה והשם שנשענו עליה אושרו. (2) " +
      "השאלות הפתוחות על התפקיד ועל שירות ה-OData נסגרו: קודם, עמוד Schedule Order Release Runs (2025.001) הציג את " +
      "SAP_BR_PRODN_SUPERVISOR_DISC לתיאור 'Production Supervisor: Discrete Manufacturing' שלא בהקשר F2336, והסניפט של " +
      "PLM הציב את PP_MPE_ORDER_MANAGE לצד האפליקציה; כעת fal-app מחזיר את שניהם לרשומת F2336 עצמה. שדה ה-odata במאגר " +
      "(API_PRODUCTION_ORDER_2) תואם בשמו ל-API API_PRODUCTION_ORDER_2_SRV שרשומת What's New 2020 מתארת ('This OData " +
      "API replaces the API Production Order (API_PRODUCTION_ORDERS)'), אך אף מקור שנקרא אינו קושר אותו ל-F2336. (3) " +
      "xref tx:CO03 נשמר על סמך עמוד Data Migration 'PP - Production order (only open PO)' (2025 FPS01), שהסניפט שלו " +
      "נוקב ב-'Display Production Order (CO03) Manage Production Orders (F2336)'. (4) הוסרו מה-xrefs tx:CO01 (מקורו " +
      "ב-guiTx של רשומת המאגר; CO01 אינה ברשימת הטרנזקציות שהספרייה מדפיסה) ו-fiori:F3577 (similar ברשומת המאגר, לא יחס " +
      "קודם/יורש בספרייה). (5) יש להבחין מהאפליקציה 'Manage Production Orders or Process Orders' (PP-MRP, למתכנן " +
      "ה-MRP), שהיא אפליקציה אחרת עם עמוד App Implementation נפרד, ולא לצטט אותה עבור F2336. (6) פריט ההיקף BJ5 ורכיבי " +
      "היישום PP-SFC-EXE (What's New 2020) ו-PP-FIO-SFC (What's New 2023 ו-fal-app) לקוחים מהמקורות שצוינו. (7) ספר " +
      "ה-Fiori Quick Reference (Tier 2, data/library/book7/ch5) מתאר את האפליקציה כמיועדת ל-production supervisors עם " +
      "AOR, בהתאמה לתיאור הרשמי. Related_Apps (relationType Navigation Target: F0251, F2180, F2261, F2262, F2265, F2335 " +
      "ועוד) אינם יחס קודם/יורש ולא נרשמו כ-xref. הרשומה אינה נושאת שדה reviewer. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F3577 */
  {
    id: "fiori:F3577",
    evidence: [
      F3577_FEATURE_COMPARISON,
      F3577_APP_TOPIC_2025,
      F3577_WHATS_NEW_2020,
      {
        sourceType: "sap_help",
        sourceTitle: "Segmentation Enhancements in Process Order Related Fiori Apps | What's New in SAP S/4HANA 2021 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/77ff56ba8e584f4cb537b660e7810fd7.html?locale=en-US&state=PRODUCTION&version=2021.001",
        accessedAt: DATE,
        claim:
          "רשומת What's New לגרסת 2021 FPS01 מונה את היישומים שהורחבו במידע Stock Segment: 'Apps that have been " +
          "enhanced with the stock segment information include: Process Order Object Page (F2263) Process Order " +
          "Confirmation Object Page (F2266) Manage Process Orders (F4587)'. המזהה F4587 מופיע בסניפט בצמוד לשם היישום.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (F3577) מול אינדקס ה-Fiori של הספרייה ומול חוברת הבלופרינט PP-PI",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר data/fiori/apps.ts מזהה את Manage Process Orders במזהה F3577 (trust: curated, מקור 'SAP Fiori " +
          "Apps Library (curated)' ללא כתובת). אותו שם מופיע במאגר תחת שני מזהים נוספים: F4587 באינדקס " +
          "data/library/fiori-apps.json ובספר ה-Fiori (book7, פרק 5, data/library/book7/ch5.sections.json, 'Manage " +
          "Process Orders (F4587)'), ו-F4512 בבלופרינט PP-PI (data/sapData.pppi.ts, שורות COOISPI ו-COR1/COR2/COR3), " +
          "כאשר אותו אינדקס מזהה את F4512 כ-Manage Launchpad Pages. F3577 אינו מופיע באינדקס כלל. שלושה מקורות מאגר, " +
          "שלושה מזהים שונים לאותו יישום.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F3577",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Library: F3577 @ S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3577')/S32OP",
        accessedAt: DATE24,
        claim:
          "node scripts/fal-app.mjs F3577 --release S32OP החזיר 'F3577 @ S32OP: not in this release (empty Results)' " +
          "(S/4HANA 2025 FPS01, On-Premise). הממצא השלילי מוגבל לגרסה זו ואינו קביעה על קיום המזהה בגרסאות אחרות.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Library: F3577 @ S27OP (S/4HANA 2023)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3577')/S27OP",
        accessedAt: DATE24,
        claim:
          "node scripts/fal-app.mjs F3577 --release S27OP החזיר 'F3577 @ S27OP: not in this release (empty Results)' " +
          "(S/4HANA 2023, On-Premise). הממצא השלילי מוגבל לגרסה זו ואינו קביעה על קיום המזהה בגרסאות אחרות.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Library: F4587 Manage Process Orders @ S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4587')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה ל-F4587 בגרסת S32OP: 'Manage Process Orders', Transactional / SAP Fiori elements, סטטוס Published, " +
          "רכיב PP-FIO-PI (Fiori UI for Process Order). תפקיד: SAP_BR_PRODN_SUPERVISOR_PROC (R0115-11, Production " +
          "Supervisor - Process Manufacturing). קטלוג עסקי: SAP_SCM_BC_PROC_ORD_MGMT 'Production Control (Process) - Order " +
          "Management'; קטלוג טכני: SAP_TC_SCM_PP_COMMON; intent: ProcessOrder-manage. OData: PP_MPE_AOR 0001 " +
          "ו-PP_PROCESS_ORDER_MANAGE_SRV 0001 (S4CORE 109), קבוצת V4: PP_MPE_AOR_SRV. שדות טרנזקציות ה-GUI (מובילה וקשורה) " +
          "מודפסים '-'. backend: S4CORE 109 SP 0001; UI: UIS4H 109 SP 0001. רשימת הגרסאות של הרשומה נפתחת ב-S18OP (2020) " +
          "וממשיכה עד S37 (2608); הגרסה האחרונה ב-On-Premise ברשימה היא S32OP (2025 FPS01). שדות הקודמים והיורשים מודפסים " +
          "'-'. הערות RIN: 3493254 (Front-End Server), 3671888 (Back-End Server).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "Manage Process Orders (ניהול הזמנות תהליך, PP-PI, תעשיות תהליכיות) הוא יישום Fiori שהוצג כחדש ב-SAP S/4HANA " +
        "2020 (רכיב PP-FIO-PI) ומתועד בגרסת 2025 FPS01 של S/4HANA On-Premise. מזהה היישום בתיעוד SAP הוא F4587, לצד " +
        "Manage Process Order Operations (F5323). המזהה F3577 שברשומת המאגר לא נמצא באף מקור רשמי ולא באינדקס הספרייה " +
        "של הפרויקט: קיום היישום מאומת, המזהה שגוי ככל הנראה.",
      edition: "on-premise",
      release: "2020.000",
      source: F3577_WHATS_NEW_2020,
      recommendedAction:
        "לתקן את המזהה ברשומת data/fiori/apps.ts מ-F3577 ל-F4587 ולהשאיר F3577 ככינוי (alias) כדי שהקישורים הקיימים " +
        "ימשיכו להתפענח; לתקן באותה הזדמנות את ההפניות ל-F3577 ב-data/tx-intel.ts (s4Delta של COR1, COR2, COR3, COR7, " +
        "C202), ב-data/solutions.ts וב-data/centers/fiori.ts. את F4512 שבחוברת הבלופרינט PP-PI יש לתקן בקובץ ה-xlsx " +
        "המקורי ולא בקובץ המחולל. עד לתיקון, להציג את F3577 כמזהה שנוי במחלוקת ולא כעובדה.",
    },
    xrefs: ["tx:COR1", "tx:COR2", "tx:COR3", "tx:COID", "tx:COOISPI", "tx:COHVPI", "table:AUFK", "table:AFKO", "table:AFPO", "table:AFVC", "fm:BAPI_PROCORD_CREATE", "fiori:F3364", "fiori:F4587", "fiori:F5323"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: חיפוש ה-JSON של help.sap.com דרך scripts/sap-help-search.mjs ('Manage Process Orders', 'F3577', " +
      "'F4587', 'Manage Process Orders F4587', \"What's New Manage Process Orders\", 'Process Order " +
      "API_PROCESS_ORDER_2 OData'), חיפוש רשת מוגבל-דומיין על fioriappslibrary / fal.cloud.sap / help.sap.com, " +
      "ורובד Tier-2 מהמאגר. מה שאומת ברמת sap_official_verified: קיום היישום, שמו, הרכיב PP-FIO-PI, גרסת ההצגה " +
      "(2020) והמזהה F4587, בשלוש רשומות רשמיות נפרדות (השוואת היכולות 2025 FPS01; What's New 2021 FPS01 'Manage " +
      "Process Orders (F4587)'; נושא Retail 2025 FPS01 'Fashion Enablement in Standard Manufacturing Apps'). מה שלא " +
      "נמצא: אף רשומה רשמית הנוקבת ב-F3577 (חיפוש המזהה החזיר רשומות לא קשורות בלבד), ודף ספרייה ישיר ל-F4587 " +
      "(fioriappslibrary ו-fal.cloud.sap מחזירים מעטפת JavaScript ללא התחברות; שירות ה-xsodata מחזיר HTTP 400), ולכן " +
      "F4587 נשען על סניפטים של help.sap.com, מספיק לפי ה-MANIFEST. רמת הרשומה 'מקורות סותרים' משקפת את פער המזהים " +
      "במאגר (F3577 מול F4587 מול F4512) ולא ספק בקיום היישום. ספר ה-Fiori (book7, Tier-2, " +
      "data/library/book7/ch5.sections.json, מקטע F4587) מתאר את F4587 כיישום Transactional עם KPI לפי סטטוס עיבוד, " +
      "איכות, זמינות רכיבים וכמות, ופעולות עריכה, שחרור, אישור והשלמה טכנית. פרטי התפקיד (SAP_BR_PRODN_OPERATOR_PROC), " +
      "הקטלוג (SAP_PP_BC_PROCESS_ORDER) ושירות ה-OData שברשומת המאגר לא אומתו מול מקור רשמי; " +
      "רשומות ה-Help מתעדות את API_PROCESS_ORDERS ואת API_PROCESS_ORDER_2_SRV כשירותי ה-OData של הזמנת תהליך; שם " +
      "השירות ברשומת המאגר (API_PROCESSORDER_2 עד 2026-09-21) נורמל ל-API_PROCESS_ORDER_2_SRV. F4587 ו-F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם ב-xrefs. " +
      "accessedAt = 2026-09-02 לפי תאריך האצווה; צמדי loio/versionId אומתו מחדש בריצה חיה. תוספת 2026-09-23: Manage Process Orders נכנס לקטלוג כ-fiori:F4587 ו-Manage Process Order Operations כ-fiori:F5323, ושניהם נוספו כאן כקישורים. הפיכת F3577 לכינוי של F4587 מחייבת קודם הסרה של F3577 מהקטלוג (כלל התנגשות הכינויים), ולכן נשארת החלטת מוצר. " +
      "תוספת 2026-09-24: fal-app.mjs החזיר Results ריק עבור F3577 ב-S32OP וב-S27OP; F4587 נקרא מהספרייה ב-S32OP (תפקיד " +
      "SAP_BR_PRODN_SUPERVISOR_PROC, קטלוג SAP_SCM_BC_PROC_ORD_MGMT, OData PP_PROCESS_ORDER_MANAGE_SRV 0001). הפרטים " +
      "SAP_BR_PRODN_OPERATOR_PROC ו-SAP_PP_BC_PROCESS_ORDER שברשומת המאגר F3577 אינם תואמים לרשומת הספרייה של F4587. " +
      "גרסאות אחרות לא נבדקו עבור F3577. קודם: דף הספרייה של F4587 לא היה נגיש (מעטפת JavaScript); עכשיו: הרשומה נקראה " +
      "דרך scripts/fal-app.mjs. חיפוש מתועד: fal-app.mjs --tcode COR1 --release S32OP: GUI app entry COR1 Create " +
      "Process Order (SAP GUI, 0 successors); COR2 ו-COID לא נבדקו. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F3364 */
  {
    id: "fiori:F3364",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Confirm Process Order (CORK) | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/2bba750d1e124e1ea2a039bb1cd9b6c5/d50388eb8dbd469db5f36f7ad71bc585.html?locale=en-US&state=PRODUCTION&version=2608.500",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        accessedAt: DATE,
        claim:
          "תיעוד הענן הציבורי (2608) מציג את האפליקציה 'Confirm Process Order (CORK)' עם 'App ID: CORK (Fiori Apps " +
          "Reference Library)': 'With this app, you can confirm process orders on order level'; 'If you confirm orders " +
          "on order level, the planned values are posted for the phases'. האפליקציה הרשמית ששמה Confirm Process Order " +
          "נושאת את המזהה CORK, לא F3364 (מהדורת public-cloud מתויגת בנפרד).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Process Orders | Production Planning and Control",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/0af42d30f5654313ac5d7a0ff9f36094.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim:
          "דף ההשוואה הרשמי ל-S/4HANA On-Premise 2025 FPS01 מונה 'App ID COOISPI COHVPI F4587/ F5323' ואת השורה " +
          "'Confirm Process Order Operation (COR6N) No No Yes': אישור פעולת הזמנת תהליך זמין באפליקציות Manage Process " +
          "Orders / Manage Process Order Operations (F4587/F5323). המזהה F3364 אינו מופיע ברשומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Confirm Process Order - SAP Fiori Apps Reference Library",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('CORK')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "חיפוש מוגבל-דומיין בספריית האפליקציות הקלאסית החזיר רשומה אחת בשם 'Confirm Process Order' שכתובתה נפתרת " +
          "ל-Apps('CORK'); חיפוש זהה ל-'F3364' לא החזיר אף רשומה בשם זה. גוף הדף הוא יישום JS ולא עובד, ולכן מיפוי " +
          "CORK = Confirm Process Order נשען על רשומת ה-Help של הענן הציבורי (הראיה הראשונה), והתפקיד, הקטלוג " +
          "והמהדורות של האפליקציה לא נקראו.",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library: Apps('F3364')/S32OP (תוצאה ריקה)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3364')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הרצת scripts/fal-app.mjs F3364 --release S32OP (S/4HANA 2025 FPS01, on-premise) הדפיסה 'F3364 @ S32OP: not in " +
          "this release (empty Results)'. Apps('F3364') לא נמצאה במהדורה S32OP (2025 FPS01) נכון לתאריך השליפה.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library: Apps('F3364')/S27OP (תוצאה ריקה)",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3364')/S27OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE24,
        claim:
          "אותה הרצה מול S27OP (S/4HANA 2023, on-premise) הדפיסה 'F3364 @ S27OP: not in this release (empty Results)'. " +
          "Apps('F3364') לא נמצאה גם ב-S27OP (2023) נכון לתאריך השליפה.",
        verificationLevel: "verification_required",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Fiori Apps Library: TransactionCode COR6N / S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE24,
        claim:
          "הרצת scripts/fal-app.mjs --tcode COR6N --release S32OP החזירה רשומת SAP GUI בשם 'Confirm Process Order Phase' " +
          "(fioriId COR6N, SemanticObject ProcessOrderConfirmation, SemanticAction createTimeTicket, isPublished " +
          "'Published'), NumberofSuccessors: 0, ולא הוחזרה אפליקציית F/W המובילה עם COR6N. החיפוש סורק את השדה " +
          "LeadingTransactionCodes; רשימת TransactionCodes הקשורה לא נסרקה, והסקריפט לא הדפיס קישור לרשומה זו.",
        verificationLevel: "supported_secondary_source",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS), רשומת F3364 (סותרת את המקורות הרשמיים)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר מקצה את המזהה F3364 לאפליקציה Confirm Process Order (PP-PI, Transactional, guiTx COR6N, OData " +
          "'API_PROC_ORDER_CONFIRMATION_2_SRV' מאז 2026-09-21, קודם 'API_PROCORDCONF'; תפקיד SAP_BR_PRODN_OPERATOR_PROC, " +
          "קטלוג SAP_PP_BC_PROCESS_ORDER), בסימון trust 'curated' " +
          "ובלי קישור לספריית Fiori; אותו מזהה חוזר ב-data/centers/fiori.ts ובשדות s4Delta של COR6N, COR6 ו-CORK " +
          "ב-data/tx-intel.ts, ואינו קיים באינדקס 1,450 האפליקציות (data/fiori.ts) ולא בספר ה-Fiori המורשה (book7). " +
          "המזהה סותר חזיתית את תיעוד SAP, שבו האפליקציה ששמה Confirm Process Order נושאת App ID: CORK.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F3364",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "המזהה F3364 לא נמצא באף מקור SAP רשמי: לא בחיפוש SAP Help ל-S/4HANA On-Premise (2025 FPS01), לא בחיפוש " +
        "ל-S/4HANA Cloud Public Edition (2608) ולא בחיפוש מוגבל-דומיין בספריית האפליקציות של Fiori. האפליקציה ששמה " +
        "'Confirm Process Order' מתועדת אצל SAP עם App ID: CORK (תיעוד הענן הציבורי 2608 והרשומה הקלאסית בספריית " +
        "Fiori), ובמהדורת On-Premise 2025 FPS01 פעולת האישור 'Confirm Process Order Operation (COR6N)' ניתנת " +
        "באפליקציות Manage Process Orders / Manage Process Order Operations (F4587/F5323). לכן המזהה F3364 שברשומת " +
        "המאגר סותר את המקורות הרשמיים ואינו ניתן להצגה כעובדה; השם 'Confirm Process Order' עצמו מאומת כשם אפליקציה " +
        "רשמי, אך תחת מזהה אחר. " +
        "ב-2026-09-24 שליפה ישירה של Apps('F3364') מספריית ה-Fiori לא החזירה רשומה במהדורות S32OP ו-S27OP.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לא להציג את F3364 כמזהה ה-Fiori של Confirm Process Order. לתקן את רשומת המאגר (data/fiori/apps.ts, " +
        "data/centers/fiori.ts ושדות s4Delta של COR6N/COR6/CORK ב-data/tx-intel.ts) לאחת משתי החלופות המתועדות: " +
        "האפליקציה 'Confirm Process Order' עם App ID: CORK (אישור ברמת הזמנה), או פעולת 'Confirm Process Order " +
        "Operation' באפליקציות F4587/F5323 (On-Premise 2025 FPS01). לפני כל תיקון לאמת את המזהה הסופי, את התפקיד, " +
        "הקטלוג ושירות ה-OData מול SAP Fiori Apps Reference Library (fal.cloud.sap) בכניסה מדפדפן, ולעדכן xrefs רק " +
        "למזהים הקיימים בדאטהסט (F4587/F5323 קיימים ב-data/fiori/apps.ts מאז 2026-09-23).",
    },
    xrefs: ["tx:COR6N", "tx:CORK", "table:AFRU", "table:RESB", "fm:BAPI_PROCORDCONF_CREATE_TT", "fiori:F3577", "fiori:F1576", "fiori:F4587", "fiori:F5323"],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת: השם 'Confirm Process Order' הוא שם אפליקציה רשמי, אך תחת App ID: CORK (Help של הענן הציבורי " +
      "2608.500 + רשומה קלאסית בספריית Fiori), ובמהדורת On-Premise 2025 FPS01 הנתיב המתועד לאישור פעולה הוא 'Confirm " +
      "Process Order Operation (COR6N)' בתוך F4587/F5323. מה שלא נמצא: אף מקור רשמי הנוקב ב-F3364 (שלושה חיפושי Help " +
      "ממוקדים ב-On-Premise, שניים ב-Public Cloud, ושני חיפושי דומיין בספרייה); חיפוש Help ייעודי ל-'F3364' החזיר " +
      "רק אפליקציות אחרות (F3464, F3384, F3346, F3664, F8364) ואת אינפוטייפ 3364. לכן נכתב סטטוס 'נדרש אימות נוסף' " +
      "ורמת הרשומה משקפת מקורות סותרים: מזהה המאגר מול המזהה הרשמי לאותו שם. רשומת Help נוספת של הענן הציבורי ('App " +
      "Extensibility in Production Operations', 2608.500, loio fad095a8b7314eefa7a8ebccb568ce90) מסווגת את 'Confirm " +
      "Process Order (CORK)' כ-SAP GUI Application; לא נכללה כראיה נפרדת. שירות ה-OData 'API_PROCORDCONF' שהיה ברשומת " +
      "המאגר עד 2026-09-21 לא נמצא במקור רשמי ונורמל ל-API_PROC_ORDER_CONFIRMATION_2_SRV; רשומת What's New 2023 FPS03 (loio fe27113cd73e4219ac8dd23a4db1ef16) נוקבת בשם 'OData " +
      "API: Process Order Confirmation (API_PROC_ORDER_CONFIRMATION_2_SRV)', ותיעוד APIs for Manufacturing 2025.001 " +
      "מציג את הנתיב /sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV. תפקיד וקטלוג (SAP_BR_PRODN_OPERATOR_PROC, " +
      "SAP_PP_BC_PROCESS_ORDER) נשארים Tier-2 ללא אימות. F4587/F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם " +
      "ב-xrefs ולא נכתב successor. ספריית fal.cloud.sap והרשומה הקלאסית לא נפתחו כדפים (יישומי JS); בדיקת מערכת חיה " +
      "לא הייתה זמינה (ה-MCP sc4sap לא התחבר). תוספת 2026-09-23: F4587 ו-F5323 נכנסו לקטלוג ונוספו כאן כקישורים. CORK עדיין אינו מזהה fiori: תקף לפי כלל הצורה, ולכן אינו מיוצג. " +
      "תוספת 2026-09-24: הרצת scripts/fal-app.mjs F3364 מול S32OP (S/4HANA 2025 FPS01) ומול S27OP (S/4HANA 2023) הדפיסה " +
      "'not in this release (empty Results)' בשתיהן; Apps('F3364') לא נמצאה בספרייה בשתי המהדורות נכון לתאריך השליפה, " +
      "וזו ראיה שלילית מתועדת ולא הכרעה. הרצת scripts/fal-app.mjs --tcode COR6N --release S32OP החזירה רשומת SAP GUI " +
      "בשם 'Confirm Process Order Phase' (SemanticObject ProcessOrderConfirmation, SemanticAction createTimeTicket) עם " +
      "NumberofSuccessors: 0; חיפוש לפי LeadingTransactionCodes לא החזיר אפליקציית Fiori (F/W) המובילה עם COR6N; רשימת " +
      "TransactionCodes הקשורה לא נסרקה, ולכן אין בכך קביעה לגבי אפליקציות Fiori אחרות הקשורות ל-COR6N. F3364 נשאר מזהה " +
      "שלא נמצא באף מקור רשמי; לא נכתב successor ולא נכתב catalogPatch, כי הספרייה לא החזירה עבור F3364 אף ערך של " +
      "תפקיד, קטלוג, OData או guiTx. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F1576 */
  {
    id: "fiori:F1576",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Batches | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/34b021588aee0a02e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד האפליקציה בתיעוד Batch Management (LO-BM) לגרסת 2025 FPS01 פותח ב-'Manage Batches App ID: F2462' " +
          "וקובע 'With this app you can display and edit existing and create new batches'; הסניפט מונה חיפוש אצוות " +
          "המנוהלות במפעלים מסוימים, סיווגי אצווה, מידע על אצוות ספק ומנות בדיקה של האצווה שנבחרה (סניפט שהוחזר " +
          "לשאילתה \"Manage Batches inspection lots\"). המזהה F1576 אינו מופיע ברשומה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Manage Batches | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/006de05317e74e5399d82fb88f21810d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד היישום מפנה לנתוני היישום ב-SAP Fiori apps reference library עם 'appId=F2462', וקובע שבהתאם לרמת " +
          "האצווה יש להפעיל במערכת ה-backend אחד ממחברי החיפוש (search connectors), למשל BATCH_PLANT_H לרמת מפעל " +
          "(כלשון הסניפט; יתר המחברים לא נראו).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Characteristics as Custom Fields | Product Lifecycle Management (PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/ed8ef9ad029a421d829e5d393873d741.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "טבלת 'Business Contexts and Fiori Applications' בעמוד ה-PLM לגרסת 2025 FPS01 מונה את השורה " +
          "'BATCH_CLASSIFICATION_CFE Batch Manage Batches (F2462) LO_BM_BATCH_SRV': ההקשר העסקי לסיווג אצווה, האובייקט " +
          "Batch, האפליקציה Manage Batches במזהה F2462 ומקור הנתונים הניתן להרחבה LO_BM_BATCH_SRV.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Batches - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F2462')/S16OP",
        accessedAt: DATE,
        claim:
          "חיפוש מוגבל-דומיין החזיר דף ספרייה רשמי שכותרתו 'Manage Batches' וכתובתו נושאת את המזהה F2462. גוף הדף " +
          "(תפקיד עסקי, קטלוג, שירות OData, גרסת שחרור) הוא מעטפת JavaScript ולא נקרא; רק שם האפליקציה, המזהה " +
          "והכתובת מצוטטים כאן.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS): מזהה F1576",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "רשומת המאגר (trust: curated, מקור 'SAP Fiori Apps Library (curated)') רושמת את Manage Batches במזהה F1576, " +
          "עם קטלוג SAP_LO_BC_BATCH, תפקיד SAP_BR_WAREHOUSE_CLERK, שירות OData בשם API_BATCH, תצוגת CDS‏ I_Batch " +
          "וטרנזקציות MSC1N/MSC2N/MSC3N. המזהה F1576 סותר את המזהה F2462 שבתיעוד SAP Help ובכתובת ספריית ה-Fiori; " +
          "רשומת ספריית ה-Fiori עבור F1576 (S32OP ו-S27OP) משייכת את המזהה לאפליקציה Supplier Evaluation Response. אותו " +
          "מזהה משוכפל ב-data/centers/fiori.ts, ב-data/solutions.ts ובשדות s4Delta של MSC1N ו-MSC3N ב-data/tx-intel.ts. " +
          "טקסט ה-explain.consultant של רשומת F2462 באותו קובץ מציין שהרשומה המתוחזקת F1576 נושאת את אותה כותרת בלי מקור " +
          "רשמי ומפנה לרשומת האימות fiori:F1576.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F1576",
      },
      {
        sourceType: "repository",
        sourceTitle: "אינדקס אפליקציות ה-Fiori של הספרייה (fiori-apps.json)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "האינדקס הרזה (1,450 רשומות) רושם 'Manage Batches' במזהה F2462 מסוג Transactional, בהתאמה לתיעוד הרשמי; " +
          "המזהה F1576 אינו מופיע באינדקס. סתירת המזהים בין האינדקס לרשומה המתוחזקת תועדה כבר " +
          "ב-audit/s4-enrichment/BASELINE.md.",
        verificationLevel: "repository_verified",
        repoRef: "data/library/fiori-apps.json#F2462",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Apps('F1576')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1576')/S32OP",
        accessedAt: DATE24,
        claim:
          "node scripts/fal-app.mjs F1576 על S32OP (SAP S/4HANA 2025 FPS01) מחזיר AppName 'Supplier Evaluation Response', " +
          "Published, Transactional, UITechnology 'SAP Fiori (SAPUI5)', ApplicationComponent SLC-EVL (Supplier Evaluation), " +
          "OData SLC_QUESTIONNAIRE_RESPONSE_SRV 0001, תפקידים: SAP_BR_BUYER, SAP_BR_EMPLOYEE, SAP_BR_EMPLOYEE_PROCUREMENT, " +
          "SAP_BR_PURCHASER, קטלוגים עסקיים SAP_PRC_BC_CATEGORY_MGT ו-SAP_PRC_BC_SUP_EVAL_APPRSL. שורת טרנזקציות ה-GUI " +
          "מודפסת 'leading -; related -'. זו אפליקציה שונה מ-Manage Batches שהרשומה המתוחזקת רושמת תחת F1576.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Apps('F1576')/S27OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F1576')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותה הרצה על S27OP (SAP S/4HANA 2023) מחזירה שוב 'Supplier Evaluation Response' (SLC-EVL, OData " +
          "SLC_QUESTIONNAIRE_RESPONSE_SRV 0001, אותם תפקידים וקטלוגים, 'leading -; related -'), כך שהשיוך של F1576 " +
          "לאפליקציה זו מופיע בשתי המהדורות שנבדקו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Apps('F2462')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2462')/S32OP",
        accessedAt: DATE24,
        claim:
          "node scripts/fal-app.mjs F2462 על S32OP מחזיר AppName 'Manage Batches', Published, Transactional, SAP Fiori " +
          "elements, ApplicationComponent LO-BM-FIO, OData LO_BM_BATCH_SRV 0001, GUI transactions: leading MSC1N; related " +
          "MSC2N, MSC3N; תפקידים כולל SAP_BR_WAREHOUSE_CLERK. רשומה זו נושאת את השם Manage Batches ואת הטרנזקציות " +
          "MSC1N/MSC2N/MSC3N שהרשומה המתוחזקת מייחסת ל-F1576.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "המזהה F1576 משויך בספריית ה-Fiori לאפליקציה Supplier Evaluation Response, ואילו המאגר רושם תחתיו את Manage " +
        "Batches; השיוך במאגר דורש תיקון לפני קביעת סטטוס.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "להשתמש ב-F2462 (Manage Batches) ולתקן את המזהה במאגר כהחלטת מוצר.",
    },
    xrefs: [
      "tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "table:MCH1", "table:MCHA", "cds:I_Batch",
      "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL", "fiori:F2462",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "2026-09-24: Old → New: הממצא הקודם (לא ידוע אם F1576 מזהה של אפליקציה אחרת או מזהה שאינו קיים) הוחלף: " +
      "fal-app.mjs F1576 על S32OP ו-S27OP מחזיר Supplier Evaluation Response (SLC-EVL). זו סתירה בין רשומה רשמית לרשומת " +
      "המאגר (כלל 4): ספריית ה-Fiori משייכת את F1576 ל-Supplier Evaluation Response, והמאגר (data/fiori/apps.ts#F1576) " +
      "רושם תחתיו את Manage Batches. מה שיכריע: תיקון המזהה במאגר ל-F2462 כהחלטת מוצר. לכן נכתב status מסוג " +
      "verification_required, כדי שה-s4_native הנגזר מרישום המאגר לא יוצג כסטטוס של הרשומה. הרצות מתועדות: fal-app.mjs " +
      "--tcode MSC1N על S32OP: F2462 Manage Batches [SAP Fiori elements] ו-MSC1N Create Batch [SAP GUI]; --tcode MSC2N " +
      "ו-MSC3N: האפליקציה המובילה שהודפסה היא רשומת ה-GUI של הטרנזקציה עצמה (MSC2N Change Batch, MSC3N Display Batch); " +
      "F1576 לא הופיע באף אחת מההרצות. לא נכתב successor: F2462 אינו מחליף את F1576 אלא מזהה נפרד הנושא את השם העסקי " +
      "שהמאגר הציג תחת F1576. עדכון שורת המאגר (data/fiori/apps.ts#F1576) ב-2026-09-24: Old: 'ולא נמצא באף רשומה " +
      "רשמית'; New: רשומת ספריית ה-Fiori עבור F1576 משייכת את המזהה ל-Supplier Evaluation Response; נוספה הפניה לטקסט " +
      "ה-explain.consultant של F2462. לא נקראו גופי עמודים ב-help.sap.com עבור Supplier Evaluation Response. בדיקת " +
      "מערכת SAP חיה לא בוצעה. 2026-09-02 (Old, הוחלף ברישום 2026-09-24): " +
      "סתירת מזהה: כל המקורות הרשמיים שנמצאו (עמוד האפליקציה ועמוד היישום ב-Batch Management (LO-BM) 2025 FPS01, " +
      "עמוד ה-PLM Manage Characteristics as Custom Fields, וכתובת ספריית ה-Fiori) נוקבים ב-Manage Batches כ-F2462. " +
      "חיפוש help.sap.com וחיפוש מוגבל-דומיין בספריית ה-Fiori לא החזירו אף רשומה עבור F1576, כך שלא ידוע אם F1576 " +
      "הוא מזהה של אפליקציה אחרת או מזהה שאינו קיים. הרשומה נשמרת תחת fiori:F1576 כי זהו המזהה ביקום המזהים של " +
      "המאגר (data/fiori/apps.ts); F2462 נרשם כ-alias כדי שהפניות למזהה הרשמי יתפענחו לרשומה זו. התיקון המומלץ " +
      "במאגר: שינוי המזהה ל-F2462 ב-data/fiori/apps.ts, ב-data/centers/fiori.ts, ב-data/solutions.ts ובשדות s4Delta " +
      "של MSC1N ו-MSC3N ב-data/tx-intel.ts, ואז מפתוח הרשומה מחדש והסרת ה-alias. מה שלא אומת: תפקיד עסקי, קטלוג, " +
      "שירות OData וגרסת השחרור הראשונה של האפליקציה (דף הספרייה הוא מעטפת JavaScript). שדה odata 'API_BATCH' ברשומת " +
      "המאגר אינו נתמך במקור שנמצא: התיעוד הרשמי מכיר את LO_BM_BATCH_SRV כמקור הנתונים של האפליקציה ואת " +
      "API_BATCH_SRV כ-Batch API, ואינו קובע שהאפליקציה בנויה על API_BATCH_SRV. לא נכתב סטטוס מחובר: הסטטוס s4_native " +
      "הנגזר מרישום ה-Fiori של המאגר נשאר, ורמת הרשומה משקפת מקורות סותרים עד שהמזהה יתוקן. הקשר תעשיות תהליכיות: " +
      "המזהה F1576 מופיע גם בפרקי הספרייה (pp-textbook ch10, qm-textbook ch18, mm-textbook ch04) ובשיעורי האקדמיה; " +
      "משטחים אלה לא טופלו במסגרת רשומה זו. 2026-09-23: הכינוי F2462 הוסר מרשומה זו, כי F2462 נוסף לקטלוג כרשומה " +
      "עצמאית (fiori:F2462, Manage Batches) והרשומה מפנה אליו כעת ב-xrefs; לא נכתב יורש, כי F2462 הוא המזהה הרשמי של " +
      "אותו יישום ולא יישום שמחליף אותו.",
  },

  /* --------------------------------------------------------- fiori:F0843 */
  {
    id: "fiori:F0843",
    evidence: [
      F0843_PGR_TOPIC,
      {
        sourceType: "fiori_library",
        sourceTitle: "Post Goods Receipt for Purchasing Document | SAP Fiori Apps Reference Library, Apps('F0843')",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F0843')/S23OP",
        accessedAt: DATE,
        claim:
          "דף הספרייה שהוחזר בחיפוש מוגבל-דומיין עבור Apps('F0843') נושא את הכותרת 'Post Goods Receipt for Purchasing " +
          "Document', והמזהה F0843 מופיע בכתובת עצמה. הדף הוא מעטפת JavaScript, ולכן נקראו רק הכותרת והכתובת; " +
          "תפקידים, קטלוגים ושירותי OData של היישום לא נקראו ממנו.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Process Extensibility for Documents in Inventory | Inventory Management and Inventory (MM-IM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/91b21005dded4984bcccf4a69ae1300c/ed827c12afa7489d90b0013fd2733b3e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "רשומת החיפוש לגרסת 2025 FPS01 פותחת את רשימת היישומים הניתנים להרחבה כך: 'Post Goods Movement (Web GUI " +
          "app; transaction code MIGO)'. כלומר Post Goods Movement מזוהה בקוד הטרנזקציה MIGO ולא במזהה F0843. רשומת " +
          "'Feature Comparison for Goods Movement' (loio de29287f0c0840caacbbc6f79c8d6242, אותו מדריך, 2025.001) " +
          "מציגה בשורת App ID את הערכים MIGO ו-F0843 כשני מזהים נפרדים.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Post Goods Receipt for Purchasing Document - SAP Fiori Apps Reference Library, Apps('F0843')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0843')/S32OP",
        accessedAt: DATE24,
        claim:
          "הרשומה שהוחזרה מהשירות הרשמי של הספרייה (scripts/fal-app.mjs, S32OP = S/4HANA 2025 FPS01) עבור F0843: 'Post " +
          "Goods Receipt for Purchasing Document', Transactional / SAP Fiori (SAPUI5), Published, רכיב אפליקציה " +
          "MM-FIO-IM-SGM (Fiori UI for Stock and Goods Movements); תפקידים SAP_BR_INVENTORY_MANAGER (R0082), " +
          "SAP_BR_OPERATION_CLERK_ACM (R0260AC), SAP_BR_SETTLEMENT_CLERK_ACM (R0149AC), SAP_BR_WAREHOUSE_CLERK (R0170); " +
          "קטלוגים עסקיים SAP_MM_BC_IM_GR_PROCESS (Materials Management - Goods Receipt Processing) ו-SAP_MM_BC_IM_PROCESS " +
          "(Materials Management - Warehouse Processing); קטלוג טכני SAP_TC_PRC_IM_COMMON; אובייקט/פעולה סמנטיים " +
          "PurchaseOrder-createGR; שירותי OData MMIM_GR4PO_DL_SRV ו-MMIM_MATERIAL_DATA_SRV גרסה 0001 (S4CORE 109); " +
          "טרנזקציית GUI מובילה MB01, וקשורות MB0A, MB1A, MB1C, MIGO, MIGO_GR; רכיב תוכנה בשרת S4CORE 109 SP 0001 / SAP " +
          "S/4HANA 2025, בחזית UIS4H 109 SP 0001; אין קודמים ואין יורשים רשומים; הערות RIN 3493254 (Front-End Server) " +
          "ו-3671888 (Back-End Server); קישור התיעוד מפנה ל-topic 9ddf815494758c4ce10000000a4450e5, גרסה 2025.001.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Post Goods Receipt for Purchasing Document - SAP Fiori Apps Reference Library, Apps('F0843')/S27OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0843')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותו שירות עבור F0843 בגרסת S27OP (S/4HANA 2023) מחזיר את אותו שם 'Post Goods Receipt for Purchasing Document', " +
          "אותם סוג, רכיב אפליקציה, תפקידים, קטלוגים, אובייקט/פעולה סמנטיים, שירותי OData (כאן S4CORE 108) וטרנזקציות GUI " +
          "כמו ב-S32OP; אין קודמים ואין יורשים רשומים; הערות RIN 3336823 (Front-End Server) ו-3351047 (Back-End Server); " +
          "קישור התיעוד מפנה לאותו topic, 9ddf815494758c4ce10000000a4450e5, בגרסה 2023.000.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Goods Movement, Post Goods Movement - SAP Fiori Apps Reference Library, Apps('MIGO')/S32OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('MIGO')/S32OP",
        accessedAt: DATE24,
        claim:
          "הרשומה שהוחזרה מהשירות הרשמי של הספרייה (scripts/fal-app.mjs MIGO, S32OP = S/4HANA 2025 FPS01): כותרת 'Goods " +
          "Movement, Post Goods Movement', טכנולוגיית UI 'SAP GUI / SAP GUI', Published, רכיב אפליקציה MM-IM (Inventory " +
          "Management); שורת ה-intent כפי שהסקריפט מדפיס אותה: 'Material,Material-postGoodsMovementInWebGUI,goodsReceipt'; " +
          "טרנזקציית GUI מובילה MIGO; אין שירות OData ואין קישור תיעוד. כלומר הספרייה רושמת את Post Goods Movement תחת " +
          "המזהה MIGO, בנפרד מ-F0843. התווית 'Web GUI app' אינה מודפסת ברשומה זו; מקורה ברשומת 'Process Extensibility for " +
          "Documents in Inventory'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט ושכבת מחזור החיים (סותרות את התיעוד הרשמי)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר מצמידה את המזהה F0843 לשם 'Post Goods Movement' ‏(slug post-goods-movement, trust curated, מקור " +
          "'SAP Fiori Apps Library (curated)'), ושכבת מחזור החיים חוזרת על אותה הצמדה ברשומות MIGO, MB1A ו-MB1C ‏" +
          "('Post Goods Movement (F0843)'); גם data/solutions.ts (goods-movement) ו-data/tx-intel.ts (שדה s4Delta " +
          "ברשומות IW3K, MB1A, MB1B, MB31; שדה fiori ברשומת ME23N נושא את הצמד 'Display Purchase Order — F0843', " +
          "וברשומת MIGO את הצמד 'Post Goods Receipt for Purchasing Document — F0843A', שהמזהה עם הסיומת A שבו לא " +
          "הוחזר באף רשומה רשמית) נושאים אותה. ההצמדה סותרת את שלושת המקורות הרשמיים ברשומה זו: F0843 הוא Post Goods " +
          "Receipt for Purchasing Document, ו-Post Goods Movement נושא את המזהה MIGO.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F0843",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "המזהה F0843 מתועד ב-S/4HANA On-Premise 2025 FPS01 (מדריך MM-IM) כיישום ה-Fiori‏ 'Post Goods Receipt for " +
        "Purchasing Document', קבלת סחורה בהתייחסות למסמכי רכש, ורשומת הספרייה ב-S32OP וב-S27OP מציגה אותו בשם זה " +
        "כ-Published. השם 'Post Goods Movement' שהמאגר מצמיד למזהה זה שייך ליישום אחר: התיעוד מתאר אותו כ-'Web GUI app; " +
        "transaction code MIGO', והספרייה רושמת אותו תחת Apps('MIGO') בכותרת 'Goods Movement, Post Goods Movement' עם " +
        "טכנולוגיית UI 'SAP GUI / SAP GUI'.",
      edition: "on-premise",
      release: "2025.001",
      source: F0843_PGR_TOPIC,
      recommendedAction:
        "לתקן את רשומת הקטלוג: F0843 = Post Goods Receipt for Purchasing Document (קבלת סחורה למסמך רכש), ואת Post " +
        "Goods Movement להציג תחת המזהה MIGO‏ (Web GUI app; אינו מזהה מסוג F ולכן אינו ניתן לייצוג כרשומת fiori: " +
        "בסכימה הנוכחית). עד לתיקון אין להסתמך על ההצמדה 'Post Goods Movement (F0843)' במסכי ה-Fiori, בשכבת מחזור " +
        "החיים (MIGO, MB1A, MB1C) ובקטלוג הפתרונות. " +
        "התפקידים, הקטלוגים, שירותי ה-OData וטרנזקציות ה-GUI שהספרייה מדפיסה עבור F0843 (ראיות S32OP ו-S27OP) לא הועתקו " +
        "ל-data/fiori/apps.ts: הם שייכים ליישום קבלת הסחורה, וההעתקה תלויה בהחלטת המוצר על זהות הרשומה.",
    },
    xrefs: [
      "tx:MIGO", "tx:MB01", "tx:MB31", "tx:MB1A", "tx:MB1C", "table:MSEG", "table:MKPF", "fm:BAPI_GOODSMVT_CREATE",
      "cds:I_MaterialDocumentItem", "obj:material-document", "enh:badi:MB_MIGO_BADI", "enh:exit:MBCF0002",
      "tx:MIGO_GR",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "מה שאומת (help.sap.com, On-Premise 2025.001, וספריית ה-Fiori): המזהה F0843 שייך ליישום 'Post Goods Receipt " +
      "for Purchasing Document', ו-'Post Goods Movement' הוא יישום Web GUI שמזההו MIGO. רשומות מאששות נוספות שלא " +
      "נכללו כראיות: What's New 2022 'Keep Alive Feature: Data Persistence in Inventory Management Apps' ‏(loio " +
      "0c199d4135434761bb20e2da82ded9d3, 2022.000) מונה 'Goods Receipt for Purchasing Document F0843'; 'App " +
      "Implementation: Post Goods Receipt for Purchasing Document' ‏(loio 312713569e800033e10000000a44538d, 2025.001) " +
      "מכיל 'appId=F0843'; דף Public Cloud 'Post Goods Movement' ‏(loio 38b1ba53422bb54ce10000000a174cb4, 2608.500) " +
      "קובע 'App ID: MIGO'; ודף הספרייה Apps('MIGO')/S19OP נושא את הכותרת 'Goods Movement, Post Goods Movement'. לכן " +
      "רמת הרשומה היא מקורות סותרים: ההצמדה במאגר שגויה, לא המזהה עצמו. מה שלא אומת: תפקיד SAP_BR_WAREHOUSE_CLERK, " +
      "קטלוג SAP_MM_BC_GOODS_MVT, שירות API_MATERIAL_DOCUMENT_SRV ותצוגת I_MaterialDocumentItem שברשומת המאגר נטענים " +
      "ללא מקור נקרא (דפי הספרייה ו-api.sap.com הם מעטפות JavaScript). המזהה MIGO אינו עומד בתחביר fiori: של הסכימה " +
      "(F או W ואחריהן ארבע ספרות), ולכן ייצוג Post Goods Movement כרשומת fiori: דורש החלטת מוצר או סכימה; עד אז " +
      "מקומו הטבעי הוא רשומת tx:MIGO עם דגל חלופת Fiori. מקומות נוספים במאגר הנושאים הצמדה שגויה למזהה: " +
      "data/lifecycle.ts (MB1A, MB1C, MIGO), data/solutions.ts (goods-movement), data/tx-intel.ts (IW3K, MB1A, MB1B, " +
      "MB31, ME23N, MIGO), data/sapData.pppi.ts (שם המסמך המקורי נושא את הסימון '(אמת ID)'), רשומת tx:MB1B " +
      "ב-data/verification/transactions.ts שמפנה ל-fiori:F0843 כחלופת Fiori של MB1B, ורשומת tx:ME23N באותו קובץ " +
      "שמצטטת מ-tx-intel את הצמד 'Display Purchase Order — F0843' כייחוס Tier-2. רשומה זו מחליפה את דוגמת היסוד " +
      "של הקטלוג (שתי ראיות מאגר ברמת נדרש אימות נוסף) שנכתבה ב-2026-09-01. " +
      "תוספת 2026-09-24: node scripts/fal-app.mjs F0843 החזיר רשומה מלאה מהשירות הרשמי של הספרייה ב-S32OP (2025 FPS01) " +
      "וב-S27OP (2023), ושתיהן נוספו כראיות: השם 'Post Goods Receipt for Purchasing Document', Published, תפקידים " +
      "SAP_BR_INVENTORY_MANAGER / SAP_BR_WAREHOUSE_CLERK / SAP_BR_OPERATION_CLERK_ACM / SAP_BR_SETTLEMENT_CLERK_ACM, " +
      "קטלוגים SAP_MM_BC_IM_GR_PROCESS ו-SAP_MM_BC_IM_PROCESS, שירותי OData MMIM_GR4PO_DL_SRV ו-MMIM_MATERIAL_DATA_SRV, " +
      "טרנזקציית GUI מובילה MB01 וקשורות MB0A / MB1A / MB1C / MIGO / MIGO_GR, ואין קודמים או יורשים רשומים. מספרי הערות " +
      "ה-RIN (3493254 / 3671888 ב-S32OP, 3336823 / 3351047 ב-S27OP) מצוטטים בראיות הספרייה כפי ש-fal-app מדפיס אותם; לא " +
      "נקרא תוכן ההערות עצמן. הרצת fal-app.mjs MIGO ב-S32OP החזירה 'Goods Movement, Post Goods Movement' עם טכנולוגיית " +
      "UI 'SAP GUI / SAP GUI' ו-intent שכולל Material-postGoodsMovementInWebGUI; הספרייה אינה מדפיסה את התווית 'Web GUI " +
      "app', ומקור התווית הוא רשומת Process Extensibility for Documents in Inventory. רשומת F0843 בספרייה מאששת רק את " +
      "שם היישום F0843 ואת MIGO כטרנזקציית GUI קשורה; הקישור בין MIGO לשם Post Goods Movement נשען על רשומת Process " +
      "Extensibility ועל רשומת Apps('MIGO')/S32OP. ה-loio וה-versionId של שתי רשומות help.sap.com " +
      "(9ddf815494758c4ce10000000a4450e5 ו-ed827c12afa7489d90b0013fd2733b3e, 2025.001) אומתו מחדש בחיפוש חי באותו יום. " +
      "נוסף xref ל-tx:MIGO_GR; MB0A לא נוסף כי אין לו נתיב במאגר. ערכי הספרייה לתפקיד, קטלוג, OData ו-GUI לא הועתקו " +
      "ל-data/fiori/apps.ts: רשומת המאגר מתארת את Post Goods Movement (slug, שם עברי, מודול, מטרה, CDS), ושינוי השם " +
      "בלבד היה משאיר אותה סותרת את עצמה; ההחלטה על זהות הרשומה נותרת החלטת מוצר, כמו ב-F2730A. SAP_BR_WAREHOUSE_CLERK " +
      "(R0170) מודפס כעת ברשומת הספרייה של F0843 (S32OP/S27OP) וגם של MIGO (S32OP), ולכן הערת \"מה שלא אומת\" לעיל נסגרת " +
      "לגביו; SAP_MM_BC_GOODS_MVT, API_MATERIAL_DOCUMENT_SRV ו-I_MaterialDocumentItem אינם מודפסים באף אחת משלוש רשומות " +
      "הספרייה שנקראו. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F4604 */
  {
    id: "fiori:F4604",
    evidence: [
      F4604_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Notifications and Orders | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/e5b77db1b0194806b3431e1739eebc96.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE,
        claim:
          "ב-What's New in SAP S/4HANA 2021 האפליקציה מופיעה עם 'Technical Details Type New', ‏Scope Item ‏4HH " +
          "(Reactive Maintenance) ו-4HI (Proactive Maintenance), רכיב יישום PM (Plant Maintenance), ובעמודת Version: " +
          "'SAP S/4HANA 2021'. תחת Effects on Customizing: 'To be able to use this app, you need to set up your system " +
          "for the phase-based maintenance process.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Reactive Maintenance: Creating an Order with Reference | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/8f958dbed1454edc9d3437f8c40ce3a0.html?locale=en-US&state=PRODUCTION&version=2023.002",
        accessedAt: DATE,
        claim:
          "הסניפט קושר את השם למזהה: 'create reactive maintenance orders in the Manage Maintenance Notifications and " +
          "Orders (F4604) app and use an existing order as a reference or template', ובפרטים הטכניים: 'Technical " +
          "Object Name App ID: F4604', ‏'Application Component PM-WOC-MO', ‏Scope Item 4HH (Reactive Maintenance).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Manage Maintenance Notifications and Orders | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/6cc76d00742743179f9491357279b04f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד היישום (App Implementation) לגרסת 2025.001 קובע תחת Prerequisites: 'This app only displays " +
          "maintenance notifications and maintenance orders that are processed according to phases', כולל סעיף 'Tile " +
          "Type for Launching App'; חיפוש לפי המזהה מחזיר מעמוד זה את המחרוזת 'appId=F4604' (הפניית ספריית ה-Fiori " +
          "שבעמוד).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Manage Maintenance Notifications and Orders (F4604), S/4HANA 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4604')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה ל-F4604 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData של הספרייה (scripts/fal-app.mjs, לא מעטפת " +
          "ה-JavaScript): AppName 'Manage Maintenance Notifications and Orders', isPublished Published, ApplicationType " +
          "Transactional, UITechnology 'SAP Fiori (SAPUI5)', ApplicationComponent PM-FIO (Fiori User Interface (UI) for " +
          "PM). תפקיד עסקי SAP_BR_MAINTENANCE_PLANNER (R0088, Maintenance Planner). קטלוג עסקי SAP_EAM_BC_MNTWRK_MNG ('EAM " +
          "- Maintenance Work Management'); קטלוג טכני SAP_TC_EAM_COMMON. Semantic Object/Action: MaintenanceOrder-plan. " +
          "שירות ה-OData הראשי (PrimaryODataServiceName) הוא UI_MAINTWRKREQ_ORD_MANAGE גרסה 0001; הספרייה מדפיסה ארבעה " +
          "שירותים: EAM_OBJPG_MAINTENANCEORDER_SRV, EAM_OBJPG_MAINTNOTIFICATION_SRV, UI_MAINTWORKREQUESTOVW_V2 " +
          "ו-UI_MAINTWRKREQ_ORD_MANAGE (כולם 0001, S4CORE 109). טרנזקציות GUI: leading '-', related '-'. predecessors '-', " +
          "successors '-' (NumberofPredecessors=0, NumberofSuccessors=0). הודעות RIN: 3493254 (Front-End Server), 3671888 " +
          "(Back-End Server). Backend S4CORE 109 SP 0001 (SAP S/4HANA 2025); UI UIS4H 109 SP 0001.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Manage Maintenance Notifications and Orders (F4604), S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F4604')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותה שאילתה על S27OP (2023) מחזירה Published, Transactional, SAP Fiori (SAPUI5) ו-PM-FIO, עם אותו תפקיד " +
          "SAP_BR_MAINTENANCE_PLANNER (R0088), אותו קטלוג עסקי SAP_EAM_BC_MNTWRK_MNG, קטלוג טכני SAP_TC_EAM_COMMON, intent " +
          "MaintenanceOrder-plan ואותם ארבעה שירותי OData (כולם 0001, S4CORE 108; שירות ראשי UI_MAINTWRKREQ_ORD_MANAGE). " +
          "טרנזקציות GUI: leading '-', related '-'; predecessors '-', successors '-'. Backend S4CORE 108 SP 0000 (SAP " +
          "S/4HANA 2023); UI UIS4HOP1 900 SP 0000. הודעות RIN: 3336823 (Front-End Server), 3351047 (Back-End Server). רשימת " +
          "המהדורות שהספרייה מדפיסה: S21OP=2021 עד S32OP=2025 FPS01 (תווית On-Premise מודפסת מ-S29OP ואילך), S29PCE עד " +
          "S32PCE (Private Cloud), וכן S36=2602 ו-S37=2608 ללא תווית מהדורה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-24 הרשומה המתוחזקת data/fiori/apps.ts#F4604 (trust: curated) נשאה את המזהה F4604 בשם Manage " +
          "Maintenance Notifications and Orders, מודול PM, סוג Transactional, טבלאות QMEL, AUFK, AFIH, תפקיד " +
          "SAP_BR_MAINTENANCE_PLANNER, קטלוג SAP_EAM_BC_MAINT_PLANNER, odata API_MaintenanceOrder ו-guiTx IW28, IW38. השם, " +
          "הסוג והתפקיד תואמים לשתי רשומות הספרייה לעיל; הקטלוג, שירות ה-OData ו-guiTx שונים מהערכים שהספרייה מחזירה. " +
          "ב-2026-09-24 הועתקו לרשומה המתוחזקת ערכי הספרייה לקטלוג, ל-OData ול-guiTx.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F4604",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית SAP Fiori (Transactional, SAPUI5) לניהול הודעות ופקודות תחזוקה המעובדות לפי שלבים (phase-based), מודול " +
        "PM. בתיעוד Maintenance Management של SAP S/4HANA On-Premise 2025 FPS01 (2025.001) יש לה עמוד אפליקציה, וב-What's " +
        "New in SAP S/4HANA 2021 היא רשומה כ-Type: New (‏Scope Items 4HH/4HI, רכיב PM, Version: SAP S/4HANA 2021). ספריית " +
        "ה-Fiori Apps מחזירה Published הן על 2025 FPS01 (S32OP) והן על 2023 (S27OP), עם תפקיד עסקי " +
        "SAP_BR_MAINTENANCE_PLANNER, קטלוג עסקי SAP_EAM_BC_MNTWRK_MNG וארבעה שירותי OData; הספרייה אינה מדפיסה לה GUI " +
        "Transaction Code מוביל או קשור, ולא Predecessor או Successor. לפי העמוד הרשמי, הודעות ופקודות שמודל השלבים אינו " +
        "מופעל עבורן אינן זמינות באפליקציה.",
      edition: "on-premise",
      release: "2025.001",
      source: F4604_APP_TOPIC,
      recommendedAction:
        "להגדיר את F4604 כמסך העבודה של מתכנן התחזוקה רק לאחר הפעלת מודל השלבים בקסטומיזציה לסוגי ההודעה והפקודה " +
        "הרלוונטיים; רשומות שאינן phase-based אינן מוצגות בה. לבסס את הקצאת ההרשאות על ערכי הספרייה (תפקיד " +
        "SAP_BR_MAINTENANCE_PLANNER, קטלוג עסקי SAP_EAM_BC_MNTWRK_MNG) ולאמת אותם במערכת; ערכים אלה הועתקו ב-2026-09-24 " +
        "ל-data/fiori/apps.ts#F4604. הספרייה אינה מדפיסה Leading או Related GUI Transaction Code עבור F4604; IW28/IW38 " +
        "מקורם ברשומה המתוחזקת בלבד ונשארים כקישורי ניווט, לא כמיפוי רשמי.",
    },
    xrefs: [
      "tx:IW28", "tx:IW38", "tx:IW34", "tx:IW31", "table:QMEL", "table:AUFK", "table:AFIH",
      "fm:BAPI_ALM_ORDER_MAINTAIN", "fiori:F5104A", "fiori:F5241",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE (השם באנגלית, המזהה F4604, " +
      "'phase-based', ושאילתה נעוצה לגרסת 2021.000) ושאילתה אחת על SAP_S4HANA_CLOUD, וכן חיפוש רשת מוגבל-דומיין. המזהה " +
      "F4604 והשם מופיעים יחד בסניפטים רשמיים (2023.002, 2025.001), ולכן השם הקטוע 'Orders' שבאינדקס הדק " +
      "(data/library/fiori-apps.json) הוא פגם באינדקס ולא סתירה מול SAP. תיעוד Public Cloud (2608.500) מציג אף הוא 'App " +
      "ID: F4604' לאותו שם; הרשומה נשמרת במהדורת On-Premise. הסניפטים הרשמיים מצמידים לאפליקציה את Manage Maintenance " +
      "Orders ‏(F5241), Find Maintenance Orders ‏(F2175) ו-Find Maintenance Orders and Operations ‏(F2173); F2175 " +
      "ו-F2173 אינן קיימות ב-data/fiori/apps.ts ולכן אינן ב-xrefs (בנוסח 2026-09-02: שלושתן, כולל F5241, לא היו בקטלוג; " +
      "סתירת F2731 מול F5241 נרשמה בתור ה-Fiori). יכולת ההמלצות מבוססות ה-AI מוצהרת בסניפט 2025.001 עבור SAP S/4HANA " +
      "Cloud Private Edition בלבד ואינה נטענת כאן למהדורת On-Premise. ה-BAdI‏ EAM_CROSS_APP_NAV_CONTROL נזכר רשמית " +
      "(2023.002) עבור F2175 ו-F4604 אך אינו קיים ב-data/exits.ts. אפליקציית שלב הסינון Screen Maintenance Requests " +
      "אינה ב-xrefs: התיעוד הרשמי (Maintenance Management 2025.001) מזהה אותה כ-F4072, בעוד הרשומה המתוחזקת " +
      "data/fiori/apps.ts#F4072 נשאה בנוסח 2026-09-02 את השם Schedule Maintenance Plans (תוקן ב-2026-09-22); הסתירה " +
      "נרשמה לתור ה-Fiori. ‏accessedAt לפי תאריך מחזור האיסוף (2026-09-02). תוספת 2026-09-23: fiori:F5241 נכנס לקטלוג " +
      "ונוסף כאן כקישור; F2175 ו-F2173 עדיין אינם בקטלוג. עדכון 2026-09-24: אומת מול ספריית ה-Fiori Apps דרך " +
      "scripts/fal-app.mjs (ערוץ ה-OData, S32OP=2025 FPS01 ו-S27OP=2023), בשיטת F2336 מאותו יום; שתי רשומות " +
      "fiori_library נוספו אחרי ארבע ראיות ה-sap_help, שנשמרו ללא שינוי. Old → New: הרשומה הקודמת קבעה שהתפקיד, הקטלוג " +
      "ושירות ה-OData מקורם ברשומה המתוחזקת בלבד ולא אותרו בסניפטים רשמיים, וכתובת הספרייה (appId=F4604) לא נרשמה כראיה " +
      "כי מעטפת ה-JS לא נקראה → ערוץ ה-OData של הספרייה מחזיר תפקיד זהה (SAP_BR_MAINTENANCE_PLANNER), קטלוג עסקי " +
      "SAP_EAM_BC_MNTWRK_MNG, ארבעה שירותי OData (ראשי UI_MAINTWRKREQ_ORD_MANAGE), ו-'-' ב-leading/related GUI " +
      "transactions. ספריית ה-Fiori מדפיסה כ-App Documentation Link את outputlink topic " +
      "d8a94ddd0c514780a9836aa04524f96f, שמפנה (301) לעמוד הקנוני של F4604_APP_TOPIC. catalogPatch: role " +
      "SAP_BR_MAINTENANCE_PLANNER, catalog SAP_EAM_BC_MNTWRK_MNG, odata UI_MAINTWRKREQ_ORD_MANAGE " +
      "(ה-PrimaryODataServiceName של הספרייה, כמו ב-F2336; שלושת השירותים האחרים רשומים בראיות), guiTx ריק לפי ה-'-' " +
      "שהספרייה מדפיסה, type Transactional ו-name ללא שינוי; ה-patch הוחל ב-2026-09-24 על data/fiori/apps.ts#F4604. " +
      "IW28/IW38 נשארים בטקסט ה-problem וה-ecc המתוחזק, שמחוץ ל-patch. explain.consultant ב-data/fiori/apps.ts#F4604 " +
      "עדיין מציין 'API_MaintenanceOrder' וסותר את שדה odata לאחר ה-patch. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F0251 */
  {
    id: "fiori:F0251",
    evidence: [
      F0251_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Material Coverage (F0251A) | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/c106b41442594c6797aad29381a6b521.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim:
          "רשומת What's New לגרסת S/4HANA 2023 מציגה את F0251A כיישום חדש: 'The app is a successor of the app Manage " +
          "Material Coverage (F0251), providing an improved look-and-feel', וקובעת לגבי היישום הקיים: 'The current " +
          "Manage Material Coverage (F0251) app will remain available until further notice'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Material Coverage | SAP Fiori 1.0 for SAP ERP",
        product: "SAP Fiori for SAP Business Suite",
        edition: "ecc",
        release: "1.0 2017-07",
        url: "https://help.sap.com/docs/SAP_FIORI/5d441ea8c6ba4ee798d1a679165b3970/d5e491523e65c04ae10000000a44176d.html?locale=en-US&state=PRODUCTION&version=1.0%202017-07",
        accessedAt: DATE,
        claim:
          "היישום מתועד כבר בחבילת SAP Fiori 1.0 for SAP ERP (מהדורת 2017-07), כלומר עבור SAP ERP לפני S/4HANA: 'With " +
          "the transactional app Manage Material Coverage, you can check the coverage of your materials based on the " +
          "settings you made in the Monitor Material Coverage app'. הקישור בין יישום ה-ERP הזה למזהה F0251 נתמך ברשומה " +
          "הרשמית האחות App Implementation: Manage Material Coverage באותה חבילה (loio 80577252a187846ae10000000a423f68), " +
          "שתקצירה מציין appId=F0251; לכן F0251 אינו יישום חדש של S/4HANA.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Material Coverage - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F0251')/S8OP",
        accessedAt: DATE,
        claim:
          "ספריית SAP Fiori Apps Reference Library מפרטת את המזהה F0251 תחת השם Manage Material Coverage (כותרת " +
          "הרשומה בלבד; דף הספרייה נטען כאפליקציית JavaScript, ולכן פרטי התפקיד, הקטלוג ושירות ה-OData לא נקראו ממנו).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Material Coverage (F0251) - SAP Fiori Apps Reference Library, release S32OP (SAP S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0251')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ספריית היישומים (נשלפה בכלי scripts/fal-app.mjs F0251) מציגה את F0251 כ-Published ב-S32OP (S/4HANA 2025 " +
          "FPS01): AppName 'Manage Material Coverage', ApplicationType 'Transactional', UITechnology 'SAP Fiori (SAPUI5)', " +
          "ApplicationComponent PP-FIO-MRP. תפקידים: SAP_BR_PRODN_PLNR (Production Planner, isLeading=X), " +
          "SAP_BR_MATL_PLNR_EXT_PROC (Material Planner - External Procurement), SAP_BR_RPLNMT_SPCLST_DC_RFM (Replenishment " +
          "Specialist - Distribution Center (Retail)). קטלוגים עסקיים: SAP_SCM_BC_MRPCOCKPIT ('Production Planning - MRP " +
          "Cockpit') ו-SAP_RFM_BC_DC_RPLNMT ('Retail Replenishment - Distribution Center'); קטלוג טכני " +
          "SAP_TC_SCM_PP_COMMON. Semantic Object/Action: MRPMaterial/manage (ומיפוי נוסף MRPPlanningSegment/manage). שירות " +
          "OData: PP_MRP_COCKPIT_SRV גרסה 0001 (NameSpace ODATA_PP_MRP, S4CORE 109). backend: S4CORE 109 - SP 0001 (SAP " +
          "S/4HANA 2025); UI: UIS4H 109 - SP 0001. שדות GUI transactions (leading/related) מוצגים כ-'-' ברשומה זו. רשימת " +
          "המהדורות כוללת משלוחי wave מ-W3 (Delivery Q1/2014) ועד W13 (Delivery Q3/2016) ומהדורות On-Premise מ-S3OP (1511) " +
          "ועד S32OP, לצד רשומות PCE ו-S36/S37. NumberofSuccessors=1, NumberofPredecessors=0; היורשת: F0251A 'Manage " +
          "Material Coverage (Version 2)'. RIN notes: 3493254 (Front-End Server), 3671888 (Back-End Server), 2352789 (BOM, " +
          "General Note). AppDocumentationLink מפנה ל-topic 09CD1556D22C0033E10000000A44538D בגרסה 2025.001.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Material Coverage (F0251) - SAP Fiori Apps Reference Library, release S27OP (SAP S/4HANA 2023)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0251')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותה רשומה נשלפה גם ל-S27OP (S/4HANA 2023): Published, אותו שם, תפקידים, קטלוגים ושירות OData " +
          "(PP_MRP_COCKPIT_SRV 0001, S4CORE 108), אותה יורשת F0251A; RIN notes לגרסה זו: 3336823 (Front-End Server), " +
          "3351047 (Back-End Server), 2352789 (BOM, General Note).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "changed",
      he:
        "היישום Manage Material Coverage (F0251) זמין ומתועד ב-SAP S/4HANA 2025 FPS01 במהדורת On-Premise, בתוך קטלוג MRP " +
        "Cockpit‏ (SAP_SCM_BC_MRPCOCKPIT), וספריית ה-Fiori מציגה אותו כ-Published ב-S32OP וב-S27OP עם תפקיד מוביל " +
        "SAP_BR_PRODN_PLNR ושירות OData‏ PP_MRP_COCKPIT_SRV. מאז S/4HANA 2023 קיים לו יורש, Manage Material Coverage " +
        "(F0251A), שהתיעוד מציג כחלופה שניתן להשתמש בה, ובמקביל SAP קובעת ש-F0251 'will remain available until further " +
        "notice'. היישום אינו חדש ב-S/4HANA: הוא מתועד כבר ב-SAP Fiori 1.0 for SAP ERP (2017-07), ורשימת המהדורות בספרייה " +
        "כוללת משלוחי wave מ-Delivery Q1/2014; לכן הסטטוס הנגזר במאגר (חדש ב-S/4HANA) מפריז. בחיפושים שבוצעו לא נמצאה " +
        "הצהרת הוצאה משימוש (deprecation) או פריט פישוט ל-F0251 עצמו; רשומות ההוצאה משימוש שנמצאו ב-PP-MRP נוגעות ליישומי " +
        "Monitor (F2101).",
      edition: "on-premise",
      release: "2025.001",
      source: F0251_APP_TOPIC,
      recommendedAction:
        "ה-catalogPatch הוחל ב-2026-09-24 על data/fiori/apps.ts#F0251: role SAP_BR_PRODN_PLNR (התפקיד המוביל בספרייה), " +
        "catalog SAP_SCM_BC_MRPCOCKPIT (ללא שינוי), odata PP_MRP_COCKPIT_SRV, guiTx ללא שינוי (הספרייה אינה מפרטת " +
        "טרנזקציית GUI מובילה או קשורה; MD04/MD07 נותרים כידע מאגר עד לאימות), וכן source ותאריך סקירה. להמשיך להשתמש " +
        "ב-F0251 בסביבות On-Premise שבהן הוא כבר פרוס, ולבחון את F0251A (Fiori elements) לפריסות חדשות רק לאחר בדיקה " +
        "שהתכונות הנדרשות מכוסות בו. לא לסמן את F0251 כהוצא משימוש ללא רשומת What's New או פריט פישוט שקובעים זאת. לתקן " +
        "בחוברת המקור (xlsx) את שורות CO24 ו-MD04 בגיליון 'מדריך טרנזקציות ודוחות ייצור' המכנות את F0251 'Monitor " +
        "Material Coverage - Net Segments', בעוד שהמזהה הרשמי של יישום ה-Monitor הוא F0247A.",
      successor: "fiori:F0251A",
    },
    xrefs: ["fiori:F0247A", "tx:MD04", "tx:MD07", "tx:MD01N", "fiori:F0251A"],
    lastVerifiedAt: DATE24,
    notes:
      "גוף דפי ה-Help לא נקרא (מעטפת JavaScript); כל טענה תחומה לכותרת ולתקציר של רשומת החיפוש הרשמית (loio " +
      "09cd1556d22c0033e10000000a44538d, c106b41442594c6797aad29381a6b521, d5e491523e65c04ae10000000a44176d, " +
      "80577252a187846ae10000000a423f68). דף App Implementation: Manage Material Coverage ‏" +
      "(https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/97e51a560e030033e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001) " +
      "מונה בתקצירו את appId=F0251, את שירות ה-OData‏ PP_MRP_COCKPIT_SRV (1), את קטלוג הדוגמה SAP_SCM_BC_MRPCOCKPIT " +
      "ואת הדרישה להרשאות Back-End (התקציר נקטע אחרי required for changing; פירוט האובייקטים לא נקרא); " +
      "data/fiori/apps.ts#F0251 כתב עד 2026-09-24 PP_MRP_COCKPIT ללא הסיומת _SRV. רשומות רשמיות נוספות שנמצאו ולא נכנסו לרשימת " +
      "הראיות: דף F0251A לגרסת 2025 FPS01 ‏(loio beea5a0c485340769ad37d33537ad962) הקובע 'this app does not yet fully " +
      "cover all aspects of the current Manage Material Coverage (F0251) app'; רשומות What's New 2025 ‏(Accept Planning " +
      "Result of MRP Run, loio 3720a102615c4e409d545c039c60837d; Rescheduling Proposals for MRP Elements, loio " +
      "cd777a64504842beaefc7b491cb0dc5f; Planning Time Fence and Last MRP Run, loio f8f10d3bf22b4ceeba8a774106825acd) " +
      "המונות את App ID F0251 לצד F0251A ואת הרכיב PP-FIO-MRP, ומזהות את Monitor Material Coverage - Net Segments " +
      "כ-F0247A; הצהרת ההוצאה משימוש של F2101 מופיעה ברשומת What's New 2025 Obsoletion of Monitor Material Coverage - " +
      "Net and Individual Segments (F2101), loio dd551695d56646978c38574e61660bf8, גרסה 2025.000. רשומת Help ל-F0251 " +
      "קיימת גם תחת SAP_S4HANA_CLOUD (Production Planning and Control, גרסה 2608.500, loio " +
      "31c16f543e0de830e10000000a44538d, תקציר: Manage Material Coverage App ID: F0251, predecessor של F0251A); הרשומה " +
      "כאן מחוברת ל-On-Premise בלבד, ומהדורת Public Cloud לא נכללה בראיות. לא אומתו בסשן זה: התפקיד " +
      "SAP_BR_MRP_CONTROLLER, הקשר ל-CDS I_MRPMaterial ‏(data/cds-enrichment.ts:428, טענת מאגר בלבד) והטבלאות " +
      "MDKP/MDTB. סתירה פנימית במאגר: data/sapData.pppi.ts (שורות CO24 ו-MD04 בגיליון 'מדריך טרנזקציות ודוחות ייצור') " +
      "מכנה את F0251 'Monitor Material Coverage - Net Segments'. תוספת 2026-09-23: F0251A נכנס לקטלוג ונוסף כאן כקישור, כך שהפעולה המומלצת להוסיף אותו לקטלוג בוצעה. המעמד נשאר changed." +
      " תוספת 2026-09-24: הורצו scripts/fal-app.mjs F0251 (ברירת מחדל S32OP) ו-scripts/fal-app.mjs F0251 --release " +
      "S27OP; שתי הרשומות חזרו Published עם נתונים מובנים (תפקידים, קטלוגים, OData, RIN notes, יורשת), ונוספו כשתי " +
      "שורות fiori_library. Old: שורת S8OP (כותרת בלבד, מעטפת JavaScript) → New: שורות S32OP ו-S27OP דרך fal-app.mjs; " +
      "שורת S8OP נשמרת לתיעוד ההיסטוריה. שדה AppDocumentationLink ברשומת הספרייה מפנה לאותו loio " +
      "09cd1556d22c0033e10000000a44538d של F0251_APP_TOPIC. שינוי 2026-09-24: status changed נשמר; role " +
      "SAP_BR_MRP_CONTROLLER → SAP_BR_PRODN_PLNR; odata PP_MRP_COCKPIT → PP_MRP_COCKPIT_SRV (catalogPatch, הוחל על " +
      "data/fiori/apps.ts#F0251). שדה guiTx בקטלוג (MD04, MD07) נשאר ללא שינוי: הספרייה מציגה leading/related כ-'-', " +
      "וזהו היעדר פירוט ולא קביעה. לא הורצו חיפושי sap-help-search נוספים בסשן זה; התיעוד הקיים (F0251_APP_TOPIC, רשומת " +
      "What's New 2023, רשומת Fiori 1.0) נשמר. לא הועתקו ל-data/fiori/apps.ts#F0251 התפקידים המשניים והקטלוג המשני " +
      "SAP_RFM_BC_DC_RPLNMT (ה-catalogPatch מעתיק את התפקיד המוביל ואת קטלוג MRP Cockpit). לא אומתו בסשן זה: רשימת " +
      "ה-ScopeItems שהחזירה הספרייה, שדות CDS I_MRPMaterial והטבלאות MDKP/MDTB. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* -------------------------------------------------------- fiori:F0247A */
  {
    id: "fiori:F0247A",
    aliases: ["F0247"],
    evidence: [
      F0247A_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Accept Planning Result of MRP Run | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/3720a102615c4e409d545c039c60837d.html?locale=en-US&state=PRODUCTION&version=2025.000",
        accessedAt: DATE,
        claim:
          "רשומת What's New לגרסת 2025 (מסמך משותף ל-SAP S/4HANA ול-SAP S/4HANA Cloud Private Edition) נוקבת במזהה " +
          "לצד השם: 'The Monitor Material Coverage - Net Segments (F0247A) and Monitor Material Coverage - Net and " +
          "Individual Segments (F2101A) apps now contain an additional filter and column named MRP Result Accepted'; " +
          "בפרטים הטכניים: 'Technical Object Name App ID: F0247A F02101A F0251A F0251' [כך בסניפט]; בשורת הסיכום: " +
          "קטגוריה 'App Changed', רכיבים PP-FIO-MRP ו-PP-MRP, גרסה 2025 (שדה Type בפרטים הטכניים: 'New').",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Monitoring Material Coverage | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/f8323a1b1ddb4d538bce5c3aa3588e1b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "טבלת ההשוואה במדריך PP-MRP לגרסת 2025 FPS01 מונה בשורת App Name את 'Collective Display of MRP List', " +
          "'Collective Display of Stock / Requirements List', 'Monitor Material Coverage - Net Segments' ו-'Monitor " +
          "Material Coverage - Net and Individual Segments', ובשורת המזהים 'App ID MD06 MD07 F0247A'. הסניפט נקטע אחרי " +
          "F0247A, ולכן המזהה הרביעי אינו מצוטט.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecated Apps in Material Requirements Planning | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/35ca4a0647bf489892ac8ccfd43c1e17.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE,
        claim:
          "רשומת What's New לגרסת 2021 מונה, בין האפליקציות שיורשיהן מבוססים על 'the SAP Fiori elements framework': " +
          "'Monitor Material Coverage - Net Segments (Obsolete) (removed from the SAP Fiori launchpad)', לצד 'Monitor " +
          "Material Coverage - Net and Individual Segments (deprecated)'; היורשות 'cover the same functionality as the " +
          "apps that were deprecated or removed' (קטגוריה 'App Deprecated', שדה Type 'Deprecated', פריט היקף J44, רכיב " +
          "PP-MRP, SAP S/4HANA 2021). הסניפט אינו נוקב במזהי F של הקודמת או של היורשת.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitor Material Coverage - Net Segments | Production Planning and Control (SAP S/4HANA Cloud Public Edition)",
        product: "SAP S/4HANA Cloud Public Edition",
        edition: "public-cloud",
        release: "2608.500",
        url: "https://help.sap.com/docs/SAP_S4HANA_CLOUD/2bba750d1e124e1ea2a039bb1cd9b6c5/cdbf6f543e0de830e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2608.500",
        accessedAt: DATE,
        claim:
          "עמוד האפליקציה במדריך Production Planning and Control של המהדורה הציבורית (2608) פותח ב-'Monitor Material " +
          "Coverage - Net Segments App ID: F0247A' וקובע: 'From this app, you can directly navigate to the Manage " +
          "Material Coverage (F0251) or Manage Material Coverage (F0251A)'. אישור מפורש של המזהה במהדורת הענן הציבורי; " +
          "אינו ראיה למהדורת On-Premise.",
        verificationLevel: "sap_official_verified",
      },
      F0247A_FAL_S32OP,
      {
        sourceType: "fiori_library",
        sourceTitle: "Monitor Material Coverage (Version 2) - SAP Fiori Apps Reference Library (Apps('F0247A')/S27OP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F0247A')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותה רשומה בספריית ה-Fiori תחת S27OP (2023) מציגה את F0247A באותו שם 'Monitor Material Coverage (Version 2)', " +
          "אותם תפקידים וקטלוגים, אותה טרנזקציית GUI מובילה MB53 וקשורות MD04/MD06/MD07/MS06/MS07, ואותה קודמת F0247. " +
          "שירותי ה-OData מודפסים כאן כ-PP_MRP_AOR_SRV, PP_MRP_MATERIAL_COVERAGE_POVER_SRV (ללא הקו התחתון הסופי שמופיע " +
          "ב-S32OP) ו-PP_MRP_MATERIAL_COVERAGE_SRV, כולם S4CORE 108; backend S4CORE 108 SP 0000, רכיב UI UIS4HOP1 900; RIN " +
          "notes 3336823 (Front-End) ו-3351047 (Back-End). רשימת הגרסאות שהרשומה מדפיסה מתחילה ב-S12OP (1809).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Monitor Material Coverage - Net Segments (Fashion and Segmentation)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/5d0feac5e1c447f2a2bab0976215f3b2.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד התיעוד (גוף הדף נקרא דרך scripts/sap-help-body.mjs; loio 5d0feac5e1c447f2a2bab0976215f3b2, אותו loio " +
          "שספריית ה-Fiori מציגה כקישור התיעוד של F0247A) נושא כותרת 'Monitor Material Coverage - Net Segments (Fashion and " +
          "Segmentation)' וקובע: 'With this app, you can monitor all the materials in a selected area of responsibility... " +
          "You can use this app for segmented materials and articles.' זמין לתפקידים SAP_BR_PRODN_PLNR (Production Planner) " +
          "ו-SAP_BR_DEMAND_PLANNER_RFM (Demand Planner (Retail)); מנווט ל-Monitor Stock/Requirement List (Generic " +
          "Material); הניווט ל-Manage Material Coverage אינו נתמך לחומרים וארטיקלים מסוגמנים. הכותרת שומרת את הניסוח 'Net " +
          "Segments' שרשימת הקטלוג של ספריית ה-Fiori אינה משתמשת בו עבור F0247A.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-24 רשומת המאגר (trust: curated) רשמה את F0247A בשם 'Monitor Material Coverage - Net Segments' עם role " +
          "SAP_BR_MRP_CONTROLLER, catalog SAP_SCM_BC_MRPCOCKPIT ו-guiTx MD07/MD04, ללא שדה OData. ספריית ה-Fiori (S32OP " +
          "ו-S27OP) מדפיסה את התפקידים SAP_BR_MATL_PLNR_EXT_PROC ו-SAP_BR_PRODN_PLNR, שלושה שירותי OData וטרנזקציה מובילה " +
          "MB53, ושם קטלוג 'Monitor Material Coverage (Version 2)'; הקטלוג העסקי זהה. התפקיד SAP_BR_MRP_CONTROLLER אינו " +
          "מופיע באף אחד משני המקורות הרשמיים שנקראו. ב-2026-09-24 הועתקו לרשומת המאגר התפקידים, שירותי ה-OData וטרנזקציות " +
          "ה-GUI שהספרייה מדפיסה; השם נשאר 'Monitor Material Coverage - Net Segments', כבעמודי help.sap.com, והסתירה מול שם " +
          "הקטלוג בספרייה פתוחה.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F0247A",
        conflictingEvidence: [F0247A_FAL_S32OP],
      },
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית SAP Fiori של MRP Cockpit, מאושרת כמפורסמת (Published) בספריית ה-Fiori הרשמית הן ב-S32OP (2025 FPS01) " +
        "והן ב-S27OP (2023), עם רכיב PP-FIO-MRP, קטלוג עסקי SAP_SCM_BC_MRPCOCKPIT ושלושה שירותי OData. קיימת סתירה בין " +
        "ערוצים רשמיים סביב השם: עמודי help.sap.com (What's New 2025, טבלת Feature Comparison, עמוד המהדורה הציבורית) " +
        "מכנים את F0247A 'Monitor Material Coverage - Net Segments', ואילו רשימת הקטלוג של ספריית ה-Fiori מכנה אותו " +
        "'Monitor Material Coverage (Version 2)' ומצמידה את השם 'Net Segments' לקודמת F0247; עם זאת, עמוד התיעוד שהספרייה " +
        "עצמה מקשרת ל-F0247A נושא כותרת 'Monitor Material Coverage - Net Segments (Fashion and Segmentation)'. תפקידים, " +
        "קטלוג טכני, OData וטרנזקציות GUI (MB53 מובילה; MD04/MD06/MD07/MS06/MS07 קשורות) אושרו כעת מול הספרייה עצמה, לא " +
        "רק מול תקצירי חיפוש.",
      edition: "on-premise",
      release: "2025.001",
      source: F0247A_FAL_S32OP,
      recommendedAction:
        "שדות role/catalog/odata/guiTx ב-data/fiori/apps.ts#F0247A הוצמדו ב-2026-09-24 לערכים שספריית ה-Fiori מדפיסה " +
        "ב-S32OP. את סתירת השם בין 'Net Segments' (help.sap.com ועמוד התיעוד המקושר) ל-'(Version 2)' (רשימת הקטלוג של " +
        "הספרייה) יש לפתור כהחלטת מוצר לפני שינוי שם היישום בקטלוג המתוחזק; סתירת השם וסתירת התפקיד מול הרשומה המתוחזקת " +
        "רשומות ב-audit/s4-enrichment/research-queue-fiori.md. לשמור את F0247 כאליאס; הספרייה מדפיסה אותו כקודמת של " +
        "F0247A.",
    },
    xrefs: ["tx:MD04", "tx:MD06", "tx:MD07", "fiori:F0251", "fiori:F0251A"],
    lastVerifiedAt: DATE24,
    notes:
      "שיטה: scripts/sap-help-search.mjs בשש שאילתות (השם המלא, F0247A, F0247, 'obsolete removed', שאילתות גרסה " +
      "1909/2020, והשם עם --product SAP_S4HANA_CLOUD), חיפוש רשת מוגבל-דומיין וניסיון גישה ישיר לספריית ה-Fiori. " +
      "ממצאים: (1) שלוש רשומות רשמיות של S/4HANA 2025 נוקבות ב-F0247A לצד השם 'Monitor Material Coverage - Net " +
      "Segments': What's New 2025 'Accept Planning Result of MRP Run' ו-'Rescheduling Proposals for MRP Elements' " +
      "(loio cd777a64504842beaefc7b491cb0dc5f), וטבלת 'Feature Comparison for Monitoring Material Coverage' במדריך " +
      "PP-MRP 2025.001 שבה 'App ID MD06 MD07 F0247A'; עמוד המהדורה הציבורית קובע 'App ID: F0247A'. (2) באותו מדריך " +
      "PP-MRP 2025.001 קיים עמוד 'App Extensibility: Monitor Material Coverage - Net Segments (F0247)' (loio " +
      "35dd4a56c4139d21e10000000a44538d), וספריית ה-Fiori הקלאסית מציגה שם זה תחת appId=F0247; לפי What's New 2021 " +
      "אפליקציית 'Net Segments (Obsolete)' הוסרה מה-launchpad והיורשות מבוססות Fiori elements. אף סניפט אינו מצמיד " +
      "במפורש F0247 ל-F0247A כקודמת/יורשת, ולכן הקשר נרשם כקריאה ולא כעובדה מצוטטת; האליאס F0247 נרשם רק כדי שהפניות " +
      "המאגר יתפענחו לרשומה זו. (3) ספריית ה-Fiori (fal.cloud.sap וה-externalViewer) היא מעטפת JavaScript ושירותי " +
      "ה-xsodata מחזירים 400/404 ללא הרשאה; לא נמצא URL ספרייה שכותרתו נושאת F0247A, ולכן הראיות הן עמודי SAP Help " +
      "בלבד. (4) הסטטוס 'חדש ב-S/4HANA' הוא סטטוס הקטלוג לאפליקציות Fiori; הסניפטים מתעדים את האפליקציה תחת S/4HANA " +
      "(On-Premise, Private Edition ו-Public Edition) ואינם מציינים מהדורת SAP ERP, אך לא נבדקה ספריית Fiori של ECC. " +
      "What's New 1809 'Enhancements in Material Requirements Planning (MRP)' (loio b2aafd49b9b44300b624e5f99be72a90) " +
      "מונה את השם ללא מזהה, ולכן אינו קובע גרסת הצגה ראשונה ל-F0247A. (5) פרטי הרשומה המתוחזקת (תפקיד " +
      "SAP_BR_MRP_CONTROLLER, gateway, OData, CDS) לא אומתו מול מקור רשמי; שדה ה-technical ברשומה מכיל ניסוח זמני " +
      "לגבי CDS ('טרם אומת') שיש להחליף בניסוח כן. (6) סתירות מאגר: data/sapData.pppi.ts מצמיד את השם 'Monitor " +
      "Material Coverage - Net Segments' למזהה F0251; data/centers/fiori.ts, data/lifecycle.ts ו-data/solutions.ts " +
      "משתמשים ב-F0247. ל-MD01N אין הפניה ב-xrefs כי הסניפטים מדברים על 'MRP run' בלי לנקוב בטרנזקציה." +
      " תוספת 2026-09-24 (לרשומה מ-2026-09-02): שלוש ראיות רשמיות חדשות, שתיים מספריית ה-Fiori (S32OP ו-S27OP, " +
      "scripts/fal-app.mjs) ואחת מעמוד תיעוד שגופו נקרא (scripts/sap-help-body.mjs), ושורת מאגר בסימון " +
      "conflicting_sources. הרשומה הקודמת ציינה שהספרייה היא מעטפת JavaScript ושירותי ה-xsodata מחזירים 400/404; הפעם " +
      "השירות הציבורי xsodata החזיר תוצאה מלאה בשתי הגרסאות. אין שינוי בסטטוס s4_native; ה-source בשדה status מצביע כעת " +
      "על שורת הספרייה S32OP (קודם F0247A_APP_TOPIC). היסטוריה: הממצא הקודם (חוסר ראיות ספרייה, תפקיד/OData לא מאומתים) " +
      "→ חדש (תפקיד/קטלוג/OData/GUI מאומתים מול הספרייה, אך סתירת שם חדשה נפתחה). ישן: אף סניפט אינו מצמיד F0247 " +
      "ל-F0247A (האליאס קריאה) → חדש: ספריית ה-Fiori (S32OP ו-S27OP) מדפיסה את F0247 Monitor Material Coverage - Net " +
      "Segments כקודמת של F0247A. status.he ו-recommendedAction אינם קובעים עובדה חד-משמעית לגבי השם התקני; הסתירה " +
      "מתועדת בשורת המאגר (conflicting_sources) ובשורות ה-evidence הרשמיות, ואינה מוכרעת ב-status. ב-2026-09-24 הועתקו " +
      "ל-data/fiori/apps.ts#F0247A התפקידים, שירותי ה-OData וטרנזקציות ה-GUI שהספרייה מדפיסה ב-S32OP; שם היישום לא " +
      "שונה. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F3951 */
  {
    id: "fiori:F3951",
    evidence: [
      F3951_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Capacity Scheduling Board | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/f8533e55baea483b95f40bf666d9a9ad.html?locale=en-US&state=PRODUCTION&version=2023.002",
        accessedAt: DATE24,
        claim:
          "רשומת ה-What's New לגרסת 2023 FPS02 מאשרת את מזהה היישום בפרטים הטכניים: 'Technical Object Name App ID: F3951', " +
          "'Scope Item 3LQ (Production Capacity Leveling)', 'Type Changed'; התוכן העסקי המצוין: 'the legend for orders are " +
          "now changed to a blue palette'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Capacity Scheduling Board - SAP Fiori Apps Reference Library (S32OP = S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3951')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת ה-xsodata של ספריית ה-Fiori (scripts/fal-app.mjs F3951, found=true) עבור S32OP (ReleaseName 'S/4HANA 2025 " +
          "FPS01') מדפיסה: AppName 'Capacity Scheduling Board', ApplicationType 'Transactional', UITechnology 'SAP Fiori " +
          "(SAPUI5)', ApplicationComponent 'PP-CFS-GNT' (Monitor Work Center Schedule Gantt view), isPublished 'Published'. " +
          "תפקיד מוביל SAP_BR_PRODN_PLNR (R0114, Production Planner). קטלוג עסקי SAP_SCM_BC_CFS 'Production Planning - " +
          "Capacity Evaluation'; קטלוג טכני SAP_TC_SCM_PP_COMMON. RequiredODataServices: PP_MNTR_WRKCTR_SRV 0001 " +
          "ו-PP_MRP_AOR_SRV 0001 (S4CORE 109). SemanticObject/Action: WorkCenter / monitorSchedules. RetrofittedSWCBackend " +
          "'S4CORE 109 - SP 0001'; RetrofittedSWCUI 'UIS4H 109 - SP 0001'. NumberofPredecessors=0, NumberofSuccessors=0: " +
          "הספרייה אינה רושמת יישום קודם או מחליף. GUI transactions: 'leading -; related -'. AppDocumentationLink מפנה " +
          "ל-topic 063ae12de0c74b01b6fd49c78e895564. Notes (RIN): 3493254 (Front-End Server) ו-3671888 (Back-End Server). " +
          "ScopeItems: 3LQ 'Production Capacity Leveling'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Capacity Scheduling Board - SAP Fiori Apps Reference Library (S27OP = S/4HANA 2023)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3951')/S27OP",
        accessedAt: DATE24,
        claim:
          "אותה רשומה עבור S27OP (ReleaseName 'S/4HANA 2023', found=true) חוזרת עם אותם ערכים: תפקיד SAP_BR_PRODN_PLNR, " +
          "קטלוג עסקי SAP_SCM_BC_CFS, קטלוג טכני SAP_TC_SCM_PP_COMMON, אותם שני שירותי OData (PP_MNTR_WRKCTR_SRV, " +
          "PP_MRP_AOR_SRV, גרסה 0001) תחת S4CORE 108; isPublished 'Published'; GUI transactions: 'leading -; related -'; " +
          "Notes (RIN): 3336823 (Front-End Server) ו-3351047 (Back-End Server).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Capacity Planning | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/96592cfe7187429c9a69fda4e6976c50.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד Capacity Planning לגרסת 2025 FPS01 מונה דרישת קדם: 'Install SAP liveCache (which is the HANA component SAP " +
          "LCA (also called LCAPPS- or liveCache Applications plugin) for Capacity Scheduling Table and Capacity Scheduling " +
          "Board apps', וכן 'Set the work center capacity to finite scheduling to get the capacity requirements of the " +
          "orders'; היישום מתואר כ-'Gives you an overview of the operations performed at your work centers and a visual " +
          "representation of the schedules over a time period'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA לתזמון קיבולת גרפי (Gantt) במרכזי עבודה קובעי קצב (pacemaker), מתועד בגרסת 2025 FPS01 תחת " +
        "Production Planning and Control ומפורסם (Published) ב-SAP Fiori Apps Reference Library ב-S32OP וב-S27OP; לשעבר " +
        "Monitor Work Center Schedules. מזהה היישום F3951 ופריט ההיקף 3LQ (Production Capacity Leveling) מופיעים ברשומת " +
        "ה-What's New לגרסת 2023 FPS02 וברשומת הספרייה.",
      edition: "on-premise",
      release: "2025.001",
      source: F3951_APP_TOPIC,
      recommendedAction:
        "להעדיף את היישום לתזמון גרפי (Gantt) של פעולות במרכזי עבודה קובעי קצב כחלופה הגרפית ל-CM21/CM25 בתרחישים חדשים " +
        "(שיוך זה נשען על רשומות המאגר; הספרייה אינה מדפיסה קוד GUI מוביל או קשור ל-F3951); לפני ההפעלה לוודא התקנת SAP " +
        "liveCache (SAP LCA / LCAPPS) והגדרת קיבולת סופית (finite scheduling) במרכזי העבודה, ולאמת בסביבת S/4HANA את " +
        "התפקיד SAP_BR_PRODN_PLNR ואת שני שירותי ה-OData (PP_MNTR_WRKCTR_SRV, PP_MRP_AOR_SRV) שהוקצו למשתמשים.",
    },
    xrefs: [
      "tx:CM21", "tx:CM25", "tx:CM01", "table:CRHD", "table:KAKO", "table:AFVC", "fiori:F3289",
      "cds:I_WorkCenterCapacity",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "עדכון 2026-09-24: F3951 נבדק מול SAP Fiori Apps Reference Library דרך scripts/fal-app.mjs בשני שחרורים (S32OP, " +
      "S27OP); שתי הקריאות החזירו found=true עם JSON מובנה ואפשרו לאמת את התפקיד SAP_BR_PRODN_PLNR והקטלוג " +
      "SAP_SCM_BC_CFS שברשומת המאגר data/fiori/apps.ts#F3951, ואת שירותי ה-OData PP_MNTR_WRKCTR_SRV ו-PP_MRP_AOR_SRV " +
      "(במאגר השדה technical כתוב כרגע כ-'טרם אומת'). עמוד היישום (loio 063ae12de0c74b01b6fd49c78e895564) נקרא דרך " +
      "sap-help-body.mjs. אין predecessor/successor ברשומת הספרייה (NumberofPredecessors=0, NumberofSuccessors=0). " +
      "סתירת מאגר: הספרייה מדפיסה 'leading -; related -' ל-F3951 בשני השחרורים, בעוד data/fiori/apps.ts#F3951 מציג " +
      "guiTx: ['CM21','CM25']; השיוך נשען על רשומת המאגר בלבד, ה-xrefs וה-guiTx לא הוסרו, וההחלטה נותרת למוביל הפרויקט. " +
      "ה-catalogPatch הוחל ב-2026-09-24 על data/fiori/apps.ts#F3951 (odata PP_MNTR_WRKCTR_SRV, PP_MRP_AOR_SRV; source; " +
      "trust), ו-guiTx נשאר CM21/CM25. לא בוצעה בדיקה במערכת SAP חיה. היסטוריה (Old → New): Old: שורת fiori_library " +
      "S22OP (externalViewer/#/detail/Apps('F3951')/S22OP) נרשמה כמעטפת JavaScript, ותפקיד/קטלוג/OData לא אומתו; New: " +
      "xsodata S32OP/S27OP אימת אותם. Old: שורת עמוד היישום (F3951_APP_TOPIC) נשענה על תקציר רשומת החיפוש (2026-09-02) " +
      "וציטטה ממנו גם 'You can use this app to plan optimum utilization of pacemaker work centers by matching their " +
      "capacities with those of the orders that have to be dispatched'; New: הציטוטים בשורה נלקחו מגוף הדף שנקרא " +
      "ב-2026-09-24. הערות קודמות (נשמרות): המזהה F3951, שם היישום וכתובת הספרייה הרשמית אומתו מול help.sap.com ומול " +
      "SAP Fiori Apps Reference Library. רכיב היישום PP-CFS-SCH (Capacity Scheduling) מופיע ברשומות What's New 2022 " +
      "(loio ff48005f013e4ddf900a56dcd0092d2b) ו-2023 FPS03 (loio 5725869ed3af4b029cf6335154ed07f1); שינוי השם " +
      "מ-Monitor Work Center Schedules מתועד ב-What's New 2021 (loio da7f859ccb984e7ba8d79076d390c6e4); תמיכה בתעשייה " +
      "תהליכית (Process industry) נוספה לפי What's New 2020 (loio 04954c60c551476881c9eaf28161729b), נקודה רלוונטית " +
      "ל-PP-PI. היישום מתועד גם ב-SAP S/4HANA Cloud Public Edition (What's New 2508, loio " +
      "b3dfa98f72334a8985c185bd1e5740d6, ו-2608, loio d8c4a7f6d57a4f9bb62041bc8473cae4). סעיף F3951 בספר 7 " +
      "(data/library/book7/ch5.sections.json) אינו נוקב בתפקיד, ומשפט SAP_BR_PRODN_PLNR שבחילוץ שייך ליישום הקודם F6798 " +
      "Capacity Evaluation. סתירה במאגר: data/lifecycle.ts#CM21, data/transactions.ts (CM01), " +
      "data/pppi-master-data-facets.ts ו-data/academy/lessons/pp-generated.ts מתייגים את היישום כ-'(PP-DS)', " +
      "ו-data/domain-detail.ts (תחום הקיבולת של PP-PI) מפנה ל-'PP-DS Planning Board' / 'PP-DS Scheduling Board' בלי " +
      "לנקוב בשם היישום; המקורות הרשמיים משייכים אותו לרכיב PP-CFS ולפריט ההיקף 3LQ, לא ל-PP/DS. אף מקור רשמי שנראה " +
      "אינו מכריז על CM21/CM25 כמוחלפות על ידי היישום; ההצגה כחלופת Fiori ל-CM21/CM25 נשענת על רשומות המאגר בלבד.",
  },

  /* --------------------------------------------------------- fiori:F2176 */
  {
    id: "fiori:F2176",
    evidence: [
      F2176_FAL_S32OP,
      F2176_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Production Scheduling Board (SAP S/4HANA) | What's New in SAP S/4HANA 1610",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1610 000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/d30029644b29447398daa3a6abe62e6a.html?locale=en-US&state=PRODUCTION&version=1610%20000",
        accessedAt: DATE,
        claim:
          "היישום רשום כפריט What's New של SAP S/4HANA 1610 תחת הנתיב 'Enterprise Business Applications > " +
          "Manufacturing > Production Planning and Detailed Scheduling (PP/DS) > Fiori Apps in PP/DS > Production " +
          "Scheduling Board' (כלשון התקציר). רשימת Related Information של הפריט מפנה ל-'Production Planning and " +
          "Detailed Scheduling (PP/DS) (SAP S/4HANA)' ולנושא 'Monitor …' (קטוע בתקציר).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Tools for Interactive Planning | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.latest",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/234617503ebcbc10e10000000a423f68.html?locale=en-US&state=PRODUCTION&version=2023.latest",
        accessedAt: DATE,
        claim:
          "בטבלת כלי התכנון האינטראקטיבי של מדריך PP/DS (גרסת 2023 Latest) מופיע 'Production Scheduling Board' עם " +
          "התיאור 'Gantt charts that show the time position of activities, operations and orders on the resources'. " +
          "בתקציר קודמות לשם היישום המילים 'Process industry', אך שיוך העמודה לשורה זו לא אומת ללא גוף העמוד.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת המאגר: data/fiori/apps.ts#F2176 (הקטלוג המתוחזק)",
        product: "SAP ECC / SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-24 הרשומה המתוחזקת הציגה role 'SAP_BR_PRODN_PLNR' (תואם לספרייה), catalog 'SAP_SCM_BC_CFS' ו-guiTx " +
          "['CM21','CO03']. שני הערכים האחרונים לא תאמו את מה שהספרייה מדווחת (catalog 'SAP_SCM_BC_CAPA_PLAN', leading " +
          "tcode '/SAPAPO/CDPS0'); ב-2026-09-24 הועתקו לרשומה ערכי הספרייה. ראו notes.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2176",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של PP/DS ב-S/4HANA (רכיב SCM-APO-PPS-DS, Detailed Scheduling), מפורסם (Published) בגרסת S32OP לפי " +
        "ספריית ה-Fiori Apps הרשמית. לפי הרשומה המובנית: תפקיד עסקי מוביל SAP_BR_PRODN_PLNR, קטלוג עסקי " +
        "SAP_SCM_BC_CAPA_PLAN, קטלוג טכני SAP_TC_SCM_APS_COMMON, שירות OData PPDS_RES_SCHEDULE 0001 על גבי S4CORE 109. " +
        "אין קודמים או יורשים רשומים (NumberofPredecessors/Successors = 0). יישום Fiori זה לא היה קיים ב-ECC; לפי נתוני " +
        "הפרויקט המקבילה הקלאסית היא לוח התזמון המפורט (DS Board) של APO.",
      edition: "on-premise",
      release: "2025.001",
      source: F2176_FAL_S32OP,
      recommendedAction:
        "לתכנון מפורט (finite) של קווי המילוי והריאקטורים ב-CBC: להעריך את היישום מול Capacity Scheduling Board (F3951) " +
        "בהתאם להיקף ה-PP/DS שמופעל במערכת. ה-catalogPatch הוחל ב-2026-09-24 על data/fiori/apps.ts#F2176: catalog " +
        "SAP_SCM_BC_CAPA_PLAN (במקום SAP_SCM_BC_CFS), odata PPDS_RES_SCHEDULE ו-guiTx לפי ספריית ה-Fiori (/SAPAPO/CDPS0 " +
        "כמובילה; /SAPAPO/CDPS1-3 ו-/SAPAPO/RPT כקשורות) במקום CM21/CO03, שאינם ברשימה שהספרייה מדפיסה ליישום זה. לפני " +
        "הקצאה למשתמשים ב-CBC לאמת בסביבה חיה שה-PP/DS מופעל ושהתפקיד SAP_BR_PRODN_PLNR הוקצה.",
    },
    xrefs: ["fiori:F3951", "fiori:F5460", "table:AFKO", "table:AFVC", "table:CRHD"],
    lastVerifiedAt: DATE24,
    notes:
      "1) הספרייה הרשמית אישרה מזהה ושם בלבד; התפקיד SAP_BR_PRODN_PLNR, הקטלוג SAP_SCM_BC_CFS, שירות OData/CDS " +
      "והזמינות ב-Public Cloud שברשומת data/fiori/apps.ts#F2176 נותרו ברמת נתוני הפרויקט ולא אומתו מול הספרייה (גוף " +
      "העמוד אינו נקרא ללא דפדפן). 2) חיפוש Help במוצר SAP S/4HANA Cloud Public Edition לא החזיר נושא 'Production " +
      "Scheduling Board'; הסימון cloud: yes ברשומת הפרויקט דורש אימות. 3) רשומת ה-What's New המצטברת של הנושא (loio " +
      "aeb92f3177eb4eee866c3526ee043b19, deliverable What's New in SAP S/4HANA, versionId 100) מציגה בתקציר רק את " +
      "משפט ה-Use ואת כותרות העמודות (Type, Scope Item, App); סיווג Type New, רכיב היישום SCM-APO-PPS-ERP ו-S4H-OP " +
      "1610 000 מופיעים בתקציר של רשומת האב Production Planning and Detailed Scheduling (PP/DS) (SAP S/4HANA) (loio " +
      "1f6abe00db174d12b36996cba791a153) המונה את The Production Scheduling Board app, ושל רשומת Monitor Capacity " +
      "Utilization (loio 0c1ae643f8c04730adb03bdb30fb33a4). שתיהן לא צורפו כראיה בגלל מזהה הגרסה הכללי (100) של " +
      "אותו deliverable. 4) קיים נושא רשמי 'App Extensibility: Production Scheduling Board' (PP/DS, 2025.001, loio " +
      "2e439ab2b2ca4667882f6deb9082bcdb) המתאר הרחבה בשדות לקוח על ישות Operation בפאנל הצד 'Additional " +
      "Information'. 5) Advanced Scheduling Board הוא יישום PP/DS חדש מגרסת 2022 (What's New 2022: 'new application " +
      "which supports Production Planner'); הספרייה מציגה אותו כ-F5460 (כותרת עמוד appId=F5460 בחיפוש מוגבל-דומיין), " +
      "מזהה שאינו ביקום הפרויקט. לא נמצאה רשומה רשמית המכריזה על החלפה או הוצאה משימוש של F2176, ולכן לא נרשם יורש. " +
      "6) אי-עקביות במאגר: data/library/wm-textbook/ch09.ts:39 ו-data/academy/lessons/wm-generated.ts משייכים את " +
      "F2176 לפרק חלקי חילוף PM/EWM, בעוד המקור הרשמי ממקם אותו ב-PP/DS. 7) שדה explain.technical ברשומת apps.ts " +
      "מנסח את שכבת ה-OData/CDS כפריט עתידי במקום כ'לא אומת'; כדאי לתקן את הניסוח. תוספת 2026-09-23: Advanced Scheduling Board נכנס לקטלוג כ-fiori:F5460 ונוסף כאן כקישור; לא נמצאה רשומה רשמית הקובעת החלפה של F2176." +
      " עדכון 2026-09-24 (fal-app.mjs, שתי ריצות S32OP ו-S27OP): בניגוד לרשומות קודמות בקובץ זה שציינו כי גוף עמוד " +
      "הספרייה הוא מעטפת JavaScript שאינה נקראת, node scripts/fal-app.mjs מחזיר רשומת xsodata מובנית מלאה (לא מעטפת JS) " +
      "עבור F2176 בשתי המהדורות. ב-S27OP התפקיד, הקטלוגים, שירות ה-OData וקודי ה-GUI זהים; משתנים רכיבי התוכנה (S4CORE " +
      "108 - SP 0000 / UIS4HOP1 900 - SP 0000 מול S4CORE 109 - SP 0001 / UIS4H 109 - SP 0001) ומספרי ה-RIN. ממצא מרכזי: " +
      "קטלוג הפרויקט (data/fiori/apps.ts#F2176) רשם עד 2026-09-24 catalog 'SAP_SCM_BC_CFS' ו-guiTx ['CM21','CO03'], " +
      "בעוד הספרייה הרשמית מדווחת catalog 'SAP_SCM_BC_CAPA_PLAN' ו-leading tcode '/SAPAPO/CDPS0' (עם related " +
      "/SAPAPO/CDPS1-3, /SAPAPO/RPT); אלה קודי SAPAPO (APO), לא CM21/CO03 של ECC/S4 הקלאסי. קודים אלה אינם ביקום ה-xref " +
      "של הפרויקט (lib/route-manifest.generated.ts) ולכן לא נוספו כ-xref; tx:CM21 ו-tx:CO03 הוסרו מה-xrefs, כי מקורם " +
      "ב-guiTx של רשומת המאגר והספרייה אינה מדפיסה אותם ליישום זה. ה-catalogPatch הוחל ב-2026-09-24 על " +
      "data/fiori/apps.ts#F2176 (catalog, odata, guiTx, source, trust). לא נמצא קודם או יורש רשמי " +
      "(NumberofPredecessors=NumberofSuccessors=0), ולכן לא נרשם successor. Old → New: שורת הספרייה הקלאסית " +
      "(externalViewer/?appId=F2176, כותרת 'Production Scheduling Board - Fiori Apps Library') אימתה מזהה ושם דרך חיפוש " +
      "מוגבל-דומיין ('גוף העמוד הוא מעטפת JavaScript ולא נקרא'); היא הוחלפה ברשומת ה-xsodata המובנית של S32OP, שקוראת " +
      "role/catalog/OData/guiTx בפועל. fiori:F5460 (Advanced Scheduling Board) נשאר xref ניווט; הספרייה לא מכריזה עליו " +
      "כיורש F2176. לא בוצעה בדיקה במערכת SAP חיה; הפעלת PP/DS והקצאת התפקיד לא אומתו.",
  },

  /* -------------------------------------------------------- fiori:F5104A */
  {
    id: "fiori:F5104A",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Perform Maintenance Jobs | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/3da57072a73444f18b5ad8785bc2900e.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "תיעוד Maintenance Management לגרסת 2025 FPS01 (תחזוקת מפעל): 'As a maintenance technician, you can use this " +
          "app to review, execute, and report the findings for jobs that have been dispatched for execution'. פעילות " +
          "ה-Customizing בשם Define Control Parameters for Perform Maintenance Jobs מציעה אפשרויות תצורה, בהן " +
          "'Self-assignment of jobs' ו-'Confirming jobs assigned to other maintenance' (כלשון הסניפט).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03 (PDF, Document Version 1.0, 2025-02-26), section 3.1.11 Enhancements for Perform Maintenance Jobs App",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2023.003/en-US/WN_OP2023_FPS03_EN.pdf",
        accessedAt: DATE,
        claim:
          "מסמך ה-What's New (PDF שנקרא בפועל), סעיף 3.1.11, טבלת Technical Details: Type 'Changed'; Technical Object " +
          "Name 'App ID: F5104A'; Application Component 'PM-FIO (Fiori UI for Plant Maintenance)'; Availability 'SAP " +
          "S/4HANA and SAP S/4HANA Cloud Private Edition'; Scope Item 4HH (Reactive Maintenance), 4HI (Proactive " +
          "Maintenance), BH1 (Corrective Maintenance), BJ2 (Preventive Maintenance); Valid as Of '2023 FPS03'. גוף " +
          "הסעיף: ניתן לרשום החלפות מונה בלשונית Measurements, לרשום אישורי זמן כנגד מרכז העבודה בלבד (טכנאים ללא " +
          "נתוני אב עובד), ולרשום נתוני תקלה כשאין הודעה רלוונטית לעבודה (המערכת יוצרת הודעה חדשה בהתייחס לאובייקט " +
          "הטכני בכותרת ההזמנה).",
        verificationLevel: "sap_official_verified",
      },
      F5104A_WHATS_NEW_2021,
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Confirm Jobs App | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/22fd7c9f368f454fad5b3acfa5a26b6d.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE,
        claim:
          "רשומת What's New של SAP S/4HANA 2023: 'The Confirm Jobs app (W0020) has been deleted and is no longer " +
          "available on the SAP Fiori launchpad'. הסניפט ממשיך: 'You can use the following successor apps which are " +
          "available on the SAP Fiori launchpad to review, execute, and report the findings for the jobs dispatched " +
          "for execution: Perform Maintenance Jobs (F5104A', כלומר F5104A נמנית בין האפליקציות היורשות של W0020.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Perform Maintenance Jobs - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F5104A",
        accessedAt: DATE,
        claim:
          "כותרת רשומת החיפוש הרשמית היא 'Perform Maintenance Jobs - SAP Fiori Apps Reference Library' וכתובתה נושאת " +
          "appId=F5104A; הכתובת נבדקה בפועל (HTTP 200). גוף הדף הוא יישום JavaScript ולא נקרא: תפקיד עסקי, קטלוג טכני, " +
          "שירות OData ומהדורת הזמינות המדויקת לא אומתו ממנו.",
        verificationLevel: "verification_required",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "Perform Maintenance Jobs ‏(F5104A) היא אפליקציית Fiori שנוספה ב-S/4HANA: רשומת What's New של SAP S/4HANA " +
        "2021 מסווגת אותה 'App New' עם פריטי ההיקף 4HH ו-4HI ורכיב PM, והיא ממשיכה להיות מתועדת ומורחבת בתיעוד " +
        "Maintenance Management ובמהדורות What's New עד 2025 FPS01 (רכיב יישום PM-FIO, מזהה App ID: F5104A במסמך " +
        "2023 FPS03). ב-ECC אין לה מקבילה; המסכים המקבילים ב-SAP GUI לפי נתוני הפרויקט הם IW41/IW42/IW44/IW48 " +
        "לאישורים ו-IK11/IK34 למדידות.",
      edition: "on-premise",
      release: "2021.000",
      source: F5104A_WHATS_NEW_2021,
      recommendedAction:
        "להקצות את האפליקציה לטכנאי תחזוקה כנקודת העבודה המרכזית לביצוע ולדיווח עבודות (זמן, רכיבים, מדידות ונתוני " +
        "תקלה) ולהגדיר את אפשרויות התצורה תחת Define Control Parameters for Perform Maintenance Jobs (שיוך עצמי של " +
        "עבודות, אישור עבודות שהוקצו לטכנאים אחרים). אין להפנות טכנאים לאפליקציית Confirm Jobs ‏(W0020): לפי רשומת " +
        "What's New ‏2023 היא נמחקה מה-Fiori Launchpad, ו-Perform Maintenance Jobs ‏(F5104A) נמנית בין האפליקציות " +
        "היורשות. תפקיד עסקי, קטלוג טכני ושירות OData דורשים אימות בספריית ה-Fiori או במערכת SAP.",
    },
    xrefs: ["tx:IW41", "tx:IW42", "tx:IW44", "tx:IW48", "tx:IK11", "tx:IK34", "table:AFRU", "table:AUFK", "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_ALM_ORDER_MAINTAIN", "fiori:F2730", "fiori:F4604", "fiori:W0020"],
    lastVerifiedAt: DATE,
    notes:
      "זהות האפליקציה אוששה ב-Tier-1 משלושה כיוונים עצמאיים: השם Perform Maintenance Jobs בתיעוד Maintenance " +
      "Management ‏2025.001, המזהה F5104A בטבלת Technical Details של מסמך What's New ‏2023 FPS03 (PDF שנקרא בפועל, לא " +
      "סניפט) וכן בסניפטים של What's New ‏2023 ('Deletion of Confirm Jobs App'), 2025 ו-2025 FPS01 ('Perform " +
      "Maintenance Jobs app (F5104A)'), וכתובת ספריית ה-Fiori עם appId=F5104A (כותרת רשומת החיפוש הרשמית; גוף הדף לא " +
      "נקרא ולכן הראיה ברמת נדרש אימות נוסף, כמו ברשומת tx:IW41). הסטטוס 'חדש ב-S/4HANA' נשען על רשומת What's New ‏" +
      "2021 המסווגת 'App New'; תווית הגרסה של הרשומה היא '2021 (Oct 2021)', כלומר משלוח 2021 הראשוני (versionId " +
      "2021.000). רשומת What's New ‏2023 (Deletion of Confirm Jobs App) נוקבת ב-Perform Maintenance Jobs ‏(F5104A) " +
      "כאפליקציה יורשת של Confirm Jobs ‏(W0020); רשומות 2022 (Deprecation of Confirm Jobs) ו-2023 (Deletion of Display " +
      "Job List App) מצוטטות ברשומת tx:IW41. רשומת המאגר F2730 בשם 'Confirm Jobs' ב-data/fiori/apps.ts וההפניה " +
      "'Confirm Jobs (F2730)' ב-tx-intel של IW41 אינן מאוששות רשמית וסותרות זאת, וההפניה fiori:F2730 כאן היא לצורך " +
      "ניווט לסתירה בלבד. תפקיד SAP_BR_MAINTENANCE_TECHNICIAN, קטלוג SAP_EAM_BC_MAINT_WORKER ושירות OData שברשומת " +
      "המאגר לא היו ניתנים לאימות מהסניפטים ונשארים ברמת נתוני הפרויקט. זמינות במהדורת Public Cloud ‏(2105 לפי רשומת " +
      "המאגר) לא נבדקה; המסמך הרשמי נוקב ב-'SAP S/4HANA and SAP S/4HANA Cloud Private Edition'. ‏accessedAt נחתם " +
      "2026-09-02 לפי הוראת האיסוף; ריצות החיפוש של 2026-09-07 החזירו את אותן רשומות (loio זהה). תוספת 2026-09-23: Confirm Jobs (W0020) נכנס לקטלוג כרשומה נפרדת במעמד not_available, עם F5104A כיורש.",
  },

  /* --------------------------------------------------------- fiori:F1339 */
  {
    id: "fiori:F1339",
    evidence: [
      {
        sourceType: "fiori_library",
        sourceTitle: "Schedule MRP Runs - SAP Fiori Apps Reference Library",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F1339')/S18OP",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "ספריית SAP Fiori Apps Reference Library מפרסמת רשומה למזהה F1339 תחת השם 'Schedule MRP Runs' (כותרת " +
          "התוצאה הרשמית). גוף העמוד (תפקידים, קטלוגים, OData) לא נקרא, משום שהספרייה נטענת כאפליקציית JavaScript.",
        verificationLevel: "sap_official_verified",
      },
      F1339_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Schedule MRP Runs | Material Requirements Planning (PP-MRP)",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/e5f613565b4b7278e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim:
          "מדריך היישום קובע כתנאי מוקדם: 'The user needs authorization to schedule corresponding batch jobs'; יש לוודא " +
          "שרשומת קטלוג ה-Job SAP_SCM_MRP מתוחזקת בפעילות ה-Customizing‏ 'Activation of Scope-Dependent Application Job " +
          "Catalog Entries (S/4HANA)'; אובייקטי ההרשאה הנדרשים: S_PROGRAM עם P_GROUP = PPH_MRP, ו-S_PROGNAM עם " +
          "P_PROGNAM = PPH_MRP_START (בשניהם ערכי P_ACTION‏: BTCSUBMIT, SUBMIT, VARIANT).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Replenishment: Logistical Products | Retail",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/fe85afc5f89d4e4e94d9ce609702b5ab.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim:
          "העמוד מונה, תחת 'MRP Live optimized for SAP HANA', את 'Schedule MRP Runs app (transaction MD01N or app ID " +
          "F1339)', ותחת 'Classic MRP' את 'Schedule MRP Runs app (transaction MD01)' לצד MD02 (Single-Item, " +
          "Multi-Level) ו-MD03 (Single Level).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית Fiori של S/4HANA לתזמון Job להרצת MRP (MRP Live, MD01N). מתועדת ב-PP-MRP לגרסת 2025 FPS01 ורשומה " +
        "בספריית SAP Fiori Apps Reference Library תחת המזהה F1339.",
      edition: "on-premise",
      release: "2025.001",
      source: F1339_APP_TOPIC,
      recommendedAction:
        "לתזמן ריצות MRP Live דרך F1339 במקום תזמון ידני של MD01 / MDBT ברקע; לפני ההפעלה לוודא את רשומת קטלוג ה-Job‏ " +
        "SAP_SCM_MRP ואת הרשאות ה-batch לפי מדריך היישום; להקצות את התפקידים המתועדים SAP_BR_MATL_PLNR_EXT_PROC או " +
        "SAP_BR_PRODN_PLNR, ולא SAP_BR_MRP_CONTROLLER המופיע ברשומת המאגר.",
    },
    xrefs: ["tx:MD01N", "tx:MD01", "tx:MDBT", "fiori:F0247A", "fiori:F0251"],
    lastVerifiedAt: DATE,
    notes:
      "המזהה, השם והתיעוד הרשמי אומתו: ספריית Fiori (F1339 = Schedule MRP Runs) ותיעוד PP-MRP לגרסת 2025 FPS01. " +
      "סתירה מול רשומת המאגר: data/fiori/apps.ts מציין role SAP_BR_MRP_CONTROLLER, בעוד התיעוד הרשמי לגרסת 2025 FPS01 " +
      "מונה SAP_BR_MATL_PLNR_EXT_PROC ו-SAP_BR_PRODN_PLNR; הרשומה המתוחזקת דורשת תיקון (נרשם בקובץ התור). רשומת " +
      "קטלוג ה-Job‏ SAP_SCM_MRP והדוח PPH_MRP_START אושרו במדריך היישום. הטבלאות MDKP ו-MDTB שברשומת המאגר אינן " +
      "ביקום המזהים ולכן אינן ב-xrefs; הקישור ל-MDBT נשען על סקירת הטרנזקציות של CBP בתיעוד (MDBT = total planning " +
      "ברקע) ועל tx-intel של הפרויקט. לא אומתו: שירות OData / תצוגות CDS של האפליקציה, הקטלוג העסקי ל-On-Premise, " +
      "וגרסת ההשקה הראשונה של האפליקציה. מקורות נוספים שלא נכללו כרשומות ראיה: תיעוד Public Edition 2608 (loio " +
      "3e467f54737c8c4ce10000000a4450e5) המציין 'App ID: F1339'; What's New 1809 FPS02 (loio " +
      "4f972af74c8d42a29a6ae5ba0bb0c8bc) עם אותו צימוד MD01N / F1339; What's New Public Edition 2508 המזכיר את הקטלוג " +
      "העסקי SAP_SCM_BC_MRPRUN_MC ('Production Planning - MRP Runs'), ללא אישור לגבי On-Premise. בדיקת מבקר " +
      "(2026-09-07): חיפוש בתיעוד SAP ERP (מוצר SAP_ERP) אחר Schedule MRP Runs app לא העלה נושא בשם זה; ההיעדר תומך " +
      "ב-s4_native אך אינו הוכחה חיובית.",
  },

  /* --------------------------------------------------------- fiori:F2023 */
  {
    id: "fiori:F2023",
    aliases: ["Report and Repair Malfunction", "Manage Malfunction Reports"],
    evidence: [
      {
        sourceType: "fiori_library",
        sourceTitle: "Report and Repair Malfunction - Fiori Apps Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F2023')/S14OP",
        accessedAt: DATE,
        claim:
          "SAP Fiori Apps Reference Library מזהה את היישום 'Report and Repair Malfunction' במזהה F2023 (כותרת תוצאת " +
          "החיפוש של עמוד הספרייה, מסלול Apps('F2023')). פרטי התפקיד, הקטלוג ושירות ה-OData בעמוד הספרייה הם מעטפת " +
          "JavaScript ולא נקראו.",
        verificationLevel: "sap_official_verified",
      },
      F2023_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Report and Repair Malfunction | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/07308ceeb52449dfa04eac2df1120fcc.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד App Implementation ל-2025 FPS01 נושא את המזהה 'appId=F2023' וקובע: 'When a malfunction report is " +
          "created via this Fiori app, the system determines the notification type from the planning plant of the " +
          "technical object'; דרישות המערכת מפנות ל-SAP Fiori Overview.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of Confirm Jobs | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/af315b2ddb3e488eb3999f4ae144f0ed.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE,
        claim:
          "What's New ל-S/4HANA 2022: 'The Confirm Jobs app (W0020) is deprecated and will be deleted from the SAP " +
          "Fiori launchpad in an upcoming release' (App Deprecated, Valid as Of SAP S/4HANA 2022, רכיב PM, פריטי היקף " +
          "BH1 ו-BJ2), ו-'The following successor apps are available on the SAP Fiori Launchpad: Perform Maintenance " +
          "Jobs (F5104A) Report and Repair Malfunction (F2023'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA: מתועד במדריך Maintenance Management לגרסת 2025 FPS01 (On-Premise) לתפקיד Maintenance " +
        "Technician, מזוהה כ-F2023 בעמוד App Implementation ובספריית Fiori Apps Reference Library, ונקוב ב-What's New " +
        "2022 כאחד משני היישומים היורשים של Confirm Jobs (W0020).",
      edition: "on-premise",
      release: "2025.001",
      source: F2023_APP_TOPIC,
      recommendedAction:
        "לתקן את רשומת המאגר: השם הרשמי הוא Report and Repair Malfunction, ו-Manage Malfunction Reports ו-Report " +
        "Malfunction הם אריחים של אותו יישום ולא יישומים נפרדים. להחליף את הערת 'טרם אומת' בשדה הטכני של OData/CDS " +
        "בניסוח שמציין שהשירות דורש אימות מול מקור רשמי. היישום Confirm Jobs שהוצא משימוש ב-2022 ונמחק ב-2023 נושא " +
        "במקור הרשמי את המזהה W0020; רשומת F2730 ב-data/fiori/apps.ts המכנה את עצמה Confirm Jobs לא אומתה מול מקור " +
        "רשמי (כפי שכבר נרשם ברשומת tx:IW41), ולכן אין להסתמך עליה כחלופה חיה ואין להעביר אליה את פרטי ההוצאה " +
        "משימוש ללא אימות. את התפקיד הטכני SAP_BR_MAINTENANCE_TECHNICIAN והקטלוג SAP_EAM_BC_MAINT_WORKER לאמת " +
        "בספריית Fiori או במערכת היעד לפני שמסתמכים עליהם.",
    },
    xrefs: ["tx:IW21", "tx:IW24", "tx:IW26", "tx:IW41", "table:QMEL", "table:AUFK", "table:AFIH", "table:AFRU", "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification", "fiori:F5104A", "fiori:F1511", "enh:badi:NOTIF_EVENT_SAVE", "fiori:W0020"],
    lastVerifiedAt: DATE,
    notes:
      "שם ומזהה: המזהה F2023 והשם Report and Repair Malfunction אומתו משלושה מקורות רשמיים בלתי תלויים (כותרת ספריית " +
      "Fiori, עמוד App Implementation עם appId=F2023, ו-What's New 2022). האינדקס של 1,450 היישומים " +
      "(data/library/fiori-apps.json, מקורו בספר 7) מכנה את F2023 בשם 'Manage Malfunction Reports', ובפרק 6 של ספר 7 " +
      "מופיעים תחת F2023 שני פריטים ('Manage Malfunction Reports (F2023)' ו-'Report Malfunction (F2023)'); לפי התיעוד " +
      "הרשמי אלה שניים משלושת האריחים של היישום, כלומר הבדל בין שם אריח לשם יישום ולא סתירת מזהה. ספר 1 פרק 8 (טבלת " +
      "היישומים) רושם 'F2023 Report and Repair Malfunction' עם נתיב ICF eam_malf_mans1 ושירות OData בשם " +
      "EAM_MALFUNCTION_MANAGE; זה מקור משני בלבד ושם השירות לא אומת מול api.sap.com. חוברת ההגירה של PM " +
      "(data/sapData.pm.ts) רושמת 'Report Malfunction (F2215)' על טבלאות משפחת QMEL; שום רשומה רשמית בשירות החיפוש לא " +
      "נוקבת ב-F2215, והתיעוד הרשמי משייך את האריח Report Malfunction ל-F2023, ולכן F2215 נשאר לא מאומת ולא נוסף " +
      "כ-alias. Confirm Jobs: המזהה הרשמי של Confirm Jobs הוא W0020 (What's New 2022 ו-2023); הזיהוי F2730 = Confirm " +
      "Jobs ב-data/fiori/apps.ts וב-tx-intel לא נמצא באף מקור רשמי ונשאר סתירת מאגר פתוחה, כפי שכבר נרשם ברשומת " +
      "tx:IW41, ולכן F2730 לא נוסף כ-xref. תפקיד: הסניפט הרשמי נוקב בשם התפקיד העסקי 'Maintenance Technician' בלבד; " +
      "המזהה הטכני SAP_BR_MAINTENANCE_TECHNICIAN והקטלוג SAP_EAM_BC_MAINT_WORKER שברשומת המאגר לא אומתו (עמוד הספרייה " +
      "אינו קריא). גרסה: רשומת המאגר אומרת 'S/4HANA Cloud 1708/1709+'; נמצאה רשומה רשמית 'Report and Repair " +
      "Malfunction' ב-What's New in SAP S/4HANA 1709 (On-Premise, loio b2faa84553414ac5b45c58e003824990) תחת Apps for " +
      "Plant Maintenance, ואילו מהדורת Cloud 1708 לא נבדקה. רשומות רשמיות נוספות שנראו ולא צוטטו כראיה: What's New " +
      "2023 'Deletion of Confirm Jobs App' ו-'Deletion of Display Job List App' (loio 22fd7c9f368f454fad5b3acfa5a26b6d, " +
      "23af34d1571e4aa7925b3933bb084c35) המונות את F5104A ו-F2023 כיישומים הזמינים 'to review, execute, and report " +
      "the findings for the jobs dispatched for execution'; ועמודי App Extensibility ל-Report Malfunction, Manage " +
      "Malfunction Reports ו-Repair Malfunctions (2025.001) עם ההקשרים העסקיים EAMS_NTF, EAMS_EQUI, EAMS_FL ו-EAMS_ORD. " +
      "דרישות Customizing (פרופיל סטטוס כולל, סוג הודעה לפי מפעל תכנון) הופיעו רק בסיכום של מנוע החיפוש ולא בסניפט, " +
      "ולכן לא נטענו. תוספת 2026-09-23: W0020 (Confirm Jobs, נמחק ב-2023) נכנס לקטלוג; רשומת המחיקה נוקבת גם ב-F2023 בין היורשים.",
  },

  /* --------------------------------------------------------- fiori:F2828 */
  {
    id: "fiori:F2828",
    evidence: [
      F2828_LIBRARY,
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Planning Overview | Maintenance Management",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/17248e4667fb433a9c3f944000fada3f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        accessedAt: DATE,
        claim:
          "נושא 'Maintenance Planning Overview' במדריך Maintenance Management (loio 17248e4667fb433a9c3f944000fada3f, " +
          "versionId 2025.001, תחת Apps for Maintenance Management; רשומת שירות החיפוש וגוף העמוד שנקרא בדפדפן): 'This " +
          "app supports you in the planning and execution of your maintenance work and allows effective monitoring of " +
          "important, time-sensitive process steps'; המערכת מנתחת, לפי קריטריוני בחירה ותקופת ייחוס, גורמים קריטיים " +
          "כגון 'open or outstanding maintenance notifications that have not yet been assigned, missing spare parts or " +
          "overdue orders', וכרטיסים מציגים את התוצאות בספרות ובתרשימים צבעוניים עם ניווט לרשימות לעריכת המסמכים או " +
          "ליצירת קשר עם האחראים. Key Features (בתנאי 'If you have the maintenance planner user role'): ניתוח הודעות " +
          "אחזקה פתוחות שטרם טופלו ושטרם שויכו לפקודת אחזקה; פקודות אחזקה בתכנון שטרם שוחררו; דרישות רכש או הזמנות " +
          "רכש שטרם שוחררו לחומרים לא-מלאיים הנדרשים כחלפים בפקודות; דרישות רכש מאושרות לחומרים לא-מלאיים ללא הזמנת " +
          "רכש; חומרים לא-מלאיים שהוזמנו ועלולים לא להיות זמינים במועד הדרישה; פקודות משוחררות שתאריך הסיום שלהן עבר " +
          "וטרם אושרו סופית; פקודות מאושרות שתאריך הסיום הנדרש שלהן בתקופת הייחוס וטרם נסגרו טכנית או עסקית. " +
          "Supported Device Types: Desktop, Tablet, Smartphone. גוף העמוד אינו מציין App ID, טרנזקציית GUI, שירות " +
          "OData או תפקיד עסקי טכני.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "What's New in SAP S/4HANA 1809 (PDF, Document Version 1.0, 2018-09-21) | 2.1.10 Maintenance Planning Overview",
        url: "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/1809.000/en-US/WN_OP1809_EN.pdf",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1809.000",
        accessedAt: DATE,
        claim:
          "קובץ ה-PDF הרשמי What's New in SAP S/4HANA 1809 (הורד ונקרא), סעיף 2.1.10 'Maintenance Planning Overview' " +
          "(עמודים 27-28, פרק Asset Management): תיאור זהה לנושא התיעוד; Technical Details: 'Product feature is: New', " +
          "'Country Dependency: Valid for all countries', 'Application Component: PM (Plant Maintenance)', " +
          "'Availability: SAP S/4HANA 1809'; Additional Details: 'This app is available for the Maintenance Planner " +
          "user role'; See Also מפנה למסלול SAP Web User Interface for Plant Maintenance (PM), Apps for Plant " +
          "Maintenance, Maintenance Planning Overview. אותו פריט מוחזר משירות החיפוש כנושא loio " +
          "1ee3b37c9ff64c3aa4c523de5987470f (versionId 1809.000). הסעיף אינו נוקב ב-App ID.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Multiple Apps: Improved Selection of Maintenance Events or Revisions | What's New in SAP S/4HANA 2023",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/fd64dddf3de2414eb82f13e7c0a66bde.html?locale=en-US&state=PRODUCTION&version=2023.000",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        accessedAt: DATE,
        claim:
          "רשומת שירות החיפוש של SAP Help (loio fd64dddf3de2414eb82f13e7c0a66bde, versionId 2023.000), כלשון הסניפט: " +
          "'The relevant filters and value helps have been changed in the following apps: Find Maintenance Orders " +
          "(F2175) Find Maintenance Orders and Operations (F2173) Maintenance Planning Overview (F2828'. בקובץ ה-PDF " +
          "What's New in SAP S/4HANA 2023 (Document Version 1.0, 2023-10-11; הורד ונקרא; " +
          "https://help.sap.com/doc/b870b6ebcd2e4b5890f16f4b06827064/2023.000/en-US/WN_OP2023_EN.pdf), סעיף 3.1.31 " +
          "(עמודים 98-99): Type 'Changed', Scope Item '4HH (Reactive Maintenance)', '4HI (Proactive Maintenance)', 'BH1 " +
          "(Corrective Maintenance)', 'BH2 (Emergency Maintenance)', 'BJ2 (Preventive Maintenance)', Application " +
          "Component 'PM-FIO (Fiori UI for Plant Maintenance)', Valid as Of 'SAP S/4HANA 2023'; השינוי: עזרי ערכים " +
          "ומסננים נפרדים ל-Maintenance Event ול-Revision, והמסננים שונו לשם 'Maintenance Event/Revision'; היישומים " +
          "המושפעים כוללים גם Maintenance Order Costs (F4603) ו-Manage Maintenance Notifications and Orders (F4604). " +
          "זהו הקישור הרשמי היחיד שנמצא ב-help.sap.com בין המזהה F2828 לשם היישום.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori אנליטי מסוג Overview Page למתכנן האחזקה (תחזוקת מפעל). לפי What's New 1809 הוא נכנס כ-Product " +
        "feature 'New' עם זמינות SAP S/4HANA 1809, וספריית SAP Fiori Apps Reference Library מתעדת אותו לכל הגרסאות " +
        "מ-1809 ועד 2025 FPS01 (On-Premise ו-Private Cloud) וגם ל-SAP S/4HANA Public Cloud. הספרייה מונה SAP S/4HANA " +
        "בלבד כ-Required Back-End Product (HANA DB exclusive), ללא מהדורת SAP ERP.",
      edition: "on-premise",
      release: "2025.001",
      source: F2828_LIBRARY,
      recommendedAction:
        "בהמרת CBC ל-S/4HANA: לכלול את F2828 בהיקף תפקיד מתכנן האחזקה כתחליף לסריקת רשימות ה-SAP GUI (IW28/IW29 " +
        "להודעות, IW38/IW39 לפקודות) לזיהוי הודעות שטרם שויכו, פקודות שלא שוחררו, פקודות באיחור ודרישות או הזמנות " +
        "רכש לחלפים לא-מלאיים. לפני ההפעלה: לאמת בספריית Fiori (לאחר התחברות, או בספרייה החדשה fal.cloud.sap) או " +
        "ב-PFCG את ה-Business Role וה-Business Catalog של גרסת היעד, להפעיל את ה-ICF node של היישום EAM_ORD_MONS1 " +
        "ואת שירותי ה-OData שהספרייה מציגה לגרסה לאחר התחברות (ללא התחברות הטבלה מוצגת כ-No data), ולהתאים את פריטי " +
        "ההיקף שנוקבו ב-What's New 2023 (4HH/4HI/BH1/BH2/BJ2) לתהליך האחזקה שנבחר. היישום דורש HANA DB, ולכן אינו " +
        "חלק מתרחיש ECC.",
    },
    xrefs: ["tx:IW28", "tx:IW29", "tx:IW38", "tx:IW39", "table:QMEL", "table:AUFK", "table:EBAN", "cds:I_MaintenanceOrder", "cds:I_MaintenanceNotification", "fiori:F4604", "fiori:F2731", "fiori:F5241"],
    lastVerifiedAt: DATE,
    notes:
      "מזהה, שם ו-URL אומתו מול ספריית SAP Fiori Apps Reference Library (F2828, Maintenance Planning Overview) ומול " +
      "What's New 2023 (loio fd64dddf3de2414eb82f13e7c0a66bde); שם הרשומה במאגר תואם. Business Role " +
      "SAP_BR_MAINTENANCE_PLANNER ו-Business Catalog SAP_EAM_BC_ORD_MC שברשומת המאגר (data/fiori/apps.ts#F2828) לא " +
      "אומתו: טבלאות התפקידים, הקטלוגים, שירותי ה-OData ומיפויי היעד בספרייה הוצגו כ-'No data' ללא התחברות, והתיעוד " +
      "הרשמי אומר רק 'maintenance planner user role'. רשומת המאגר מציינת guiTx IP10/IP30/IW38 וטבלאות MPLA/MHIS/AUFK " +
      "(תוכניות אחזקה), בעוד התיאור הרשמי עוסק בהודעות, בפקודות ובדרישות/הזמנות רכש לחלפים לא-מלאיים; אף עמוד רשמי " +
      "אינו נוקב בטרנזקציית GUI ליישום, ולכן ה-xrefs כאן (IW28/IW29/IW38/IW39, QMEL/AUFK/EBAN) הם עזרי ניווט של " +
      "המאגר ולא מיפוי רשמי. רשימת תשעת הכרטיסים (Missing Components, Orders for Planning, Purchase Requisitions Not " +
      "Approved, Notifications for Screening, Overdue Orders, Purchase Requisitions Not Converted to Purchase Orders, " +
      "Orders for Completion, Purchase Orders Not Approved, Quick List) ויעדי הניווט F2827/F2175/F2071/F2173/F3065 " +
      "מופיעים במדריך SAP PRESS Fiori Quick Reference (data/library/book7/ch6, רובד 2); ארבעה משמות הכרטיסים מאושרים " +
      "בסניפטים הרשמיים של הנושאים Procurement for Maintenance Planner (Purchase Order) (loio " +
      "c49240406e974ddf86f5cda76e3672ed) ו-(Purchase Requisition) (loio 07899ae25f1c4c5bbc6a7b93a48fd041) לגרסת " +
      "2025.001; יעדי הניווט אינם ביקום המזהים של הפרויקט ולכן אינם ב-xrefs. אותו נושא (loio " +
      "17248e4667fb433a9c3f944000fada3f) קיים גם תחת SAP S/4HANA Cloud Public Edition (Asset Management, versionId " +
      "2608.500) והספרייה מונה SAP S/4HANA Public Cloud; מהדורת הענן הציבורי לא נבחנה מעבר לכך והרשומה מסומנת " +
      "On-Premise. הספרייה הקלאסית מציגה הודעת פרישה המפנה ל-fal.cloud.sap; העמוד החדש לא נקרא. לא בוצעה בדיקה " +
      "במערכת SAP חיה (חיבור sc4sap MCP נכשל). תוספת 2026-09-23: fiori:F5241 נכנס לקטלוג ונוסף כאן כקישור ניווט.",
  },
  /* ---- F2774, added 2026-09-22 (master completion §12), enriched 2026-09-24 through the
     SAP Fiori Apps Reference Library's public OData service (scripts/fal-app.mjs), which
     returned the app on S32OP (2025 FPS01) and S27OP (2023) with the same role, catalogs,
     OData service and GUI transactions. F5325, added the same day (2026-09-22), was
     enriched the same way on 2026-09-24 (fal-app.mjs on S32OP and S27OP, plus its app
     documentation page read via sap-help-body.mjs); see its record. ---- */
  {
    id: "fiori:F2774",
    evidence: [
      F2774_MAINT_MGMT,
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Schedule Maintenance Plans | What's New in SAP S/4HANA 1709",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "1709 000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/ef815ff35f454fb389d17bbae8ac7250.html?locale=en-US&state=PRODUCTION&version=1709%20000",
        accessedAt: DATE22,
        claim:
          "What's New 1709 מונה את Mass Schedule Maintenance Plans תחת Apps for Plant Maintenance, 'to schedule all " +
          "maintenance plans that are due within a specific time': היישום זמין מ-S/4HANA 1709.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Mass Schedule Maintenance Plans | What's New in SAP S/4HANA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "100",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4c6c3c99e6e94a92a626f424add61cba/6f39ce28d1e14e57adaf45dcf1beed30.html?locale=en-US&state=PRODUCTION&version=100",
        accessedAt: DATE22,
        claim:
          "'As a maintenance planner, you can use this app to schedule all maintenance plans that are due within a " +
          "specific time frame': היישום מיועד למתכנן התחזוקה. הקטע אינו נוקב בשם הטכני של התפקיד העסקי.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Scheduling and Automatic Scheduling | Maintenance Planning (CS-AG/PM-PRM-MP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f7d969cde600466b96094e772632c3f3/2d396b50389ff015e10000000a44176d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE22,
        claim:
          "קטע החיפוש של תיעוד התזמון ב-2025 FPS01: 'Mass schedule maintenance plans (transaction IP30H) In the " +
          "maintenance planning menu, choose Scheduling for Maintenance Plans Mass Schedule Maintenance Plans'. הקטע " +
          "קושר את השם לטרנזקציית ה-GUI IP30H; הוא אינו קובע שהיישום F2774 עוטף אותה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Mass Schedule Maintenance Plans (F2774), SAP Fiori Apps Reference Library, S32OP (S/4HANA 2025 FPS01)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F2774')/S32OP",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה ל-F2774 על S32OP (2025 FPS01), שנקראה דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs, לא ה-JS " +
          "shell): Published, ApplicationType Transactional, UITechnology 'SAP Fiori: Generic Job Scheduling " +
          "Framework', ApplicationComponent PM-FIO. תפקיד עסקי מוביל SAP_BR_MAINTENANCE_PLANNER (R0088, Maintenance " +
          "Planner). קטלוגים עסקיים SAP_EAM_BC_MPLAN (EAM - Maintenance Plan) ו-SAP_EAM_BC_SHMP_MNG (EAM - " +
          "Maintenance Plans Scheduling); קטלוג טכני SAP_TC_EAM_COMMON. שירות OData יחיד APJ_JOB_MANAGEMENT_SRV " +
          "(גרסה 0001, SAP_BASIS 816). טרנזקציית GUI מובילה IP30, טרנזקציה קשורה IP30H (TransactionCodes). ללא קודמים " +
          "וללא יורשים רשומים. אותם תפקיד, קטלוגים, שירות OData וטרנזקציות GUI חוזרים ברשומת S27OP (2023), עם OData " +
          "על SAP_BASIS 758.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori לתזמון המוני של תכניות תחזוקה, מתועד ב-Maintenance Management לגרסת 2025 FPS01 תחת App ID F2774 " +
        "וזמין מ-S/4HANA 1709 (What's New 1709). מיועד למתכנן התחזוקה (SAP_BR_MAINTENANCE_PLANNER). ספריית יישומי " +
        "ה-Fiori מאשרת Published על S32OP (2025 FPS01) ועל S27OP (2023), עם אותו תפקיד, קטלוגים ושירות OData, " +
        "טרנזקציית GUI מובילה IP30 וטרנזקציה קשורה IP30H; אין קביעה שהיישום עוטף את IP30H כלוגיקה.",
      edition: "on-premise",
      release: "2025.001",
      source: F2774_MAINT_MGMT,
      recommendedAction:
        "להשתמש ב-F2774 כנתיב ה-Fiori לתזמון המוני (תפקיד Maintenance Planner, קטלוגים SAP_EAM_BC_MPLAN / " +
        "SAP_EAM_BC_SHMP_MNG, שירות APJ_JOB_MANAGEMENT_SRV), לצד טרנזקציית IP30H (ראו רשומת tx:IP30H לפריט הפישוט " +
        "'S4TWL - Scheduling of Maintenance Plan').",
    },
    xrefs: ["tx:IP30H", "tx:IP30", "tx:IP10", "fiori:F5325", "cds:I_MaintenancePlan"],
    lastVerifiedAt: DATE24,
    notes:
      "נוסף 2026-09-22: הראיות היו כותרות וקטעים של רשומות חיפוש SAP Help רשמיות שהוחזרו באותו יום " +
      "(scripts/sap-help-search.mjs), וסוג היישום Transactional ברשומת הקטלוג נגזר אז מהפונקציה המתועדת (תזמון יוצר " +
      "רשומות קריאה) ולא נקרא מהספרייה. הועשר 2026-09-24 מספריית יישומי ה-Fiori דרך ערוץ ה-OData הרשמי " +
      "(fal-app.mjs), שאינו נתקל בבעיית ה-JS shell של הדפדפן: הספרייה מדפיסה ApplicationType Transactional, והתפקיד, " +
      "הקטלוגים, שירות ה-OData והטרנזקציות הוצלבו בין S32OP ל-S27OP ונמצאו זהים. הודעות RIN שהספרייה מדפיסה (3493254 " +
      "ו-3671888 על S32OP; 3336823 ו-3351047 על S27OP) הן הודעות שחרור טכניות ולא נרשמו כ-sapNote כי לא נקראו " +
      "כ-KBA/OSS Note בתוכן. ה-catalogPatch הוחל באותו יום על data/fiori/apps.ts#F2774, יחד עם הערת הבלוק, " +
      "explain.technical ו-explain.consultant. לא בוצעה בדיקה במערכת SAP חיה.",
  },
  {
    id: "fiori:F5325",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of Manage Maintenance Plan and Item List App | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/9fe2ab1a1d5f4f1482ebebdfb9a875d2.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE22,
        claim:
          "What's New 2022: היישום Manage Maintenance Plan and Item List הוצא משימוש ('Valid as Of SAP S/4HANA 2022'), " +
          "'You can use the following successor apps which are available on the SAP Fiori launchpad: Manage " +
          "Maintenance Plans (F5325'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Manage Maintenance Plan and Item List App | What's New in SAP S/4HANA 2023 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/0e83f36ad7914324976ddc9db47621fc.html?locale=en-US&state=PRODUCTION&version=2023.001",
        accessedAt: DATE22,
        claim:
          "What's New 2023 FPS01: היישום הישן נמחק; 'You can use the following successor apps which are available on " +
          "the SAP Fiori launchpad: Manage Maintenance Plans (F5325) and Manage Maintenance Items (F5356)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Filter by Plan Description in the Manage Maintenance Plans App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/a0c0e9f184f24910b2985d6a7cccb43a.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE22,
        claim:
          "What's New 2025 FPS01, Technical Details: 'Scope Item 4HI (Proactive Maintenance) BJ2 (Preventive " +
          "Maintenance) Technical Object Name App ID: F5325'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Maintenance plan | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/b97c17855d78480ead0cebb32c4a346f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE22,
        claim:
          "אובייקט ההגירה 'PM - Maintenance plan' ב-2025 FPS01: 'In addition, you can also use the following app or " +
          "apps: App: Manage Maintenance Plans (F5325) Display Maintenance Plan (IP16) Display Maintenance Plan (IP03)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Authorization Object for Maintenance Plans | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/d3629c11d9c442798d1df074e58ea49f.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE22,
        claim:
          "What's New 2023: 'The new authorization object Maintenance Plan Category (I_MPTYP) is available in the apps " +
          "Manage Maintenance Plans (F5325'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Plans | Maintenance Management (app documentation page)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/f0e9632b0e654fbeae597bad6abb823c.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE24,
        claim:
          "עמוד תיעוד היישום ב-2025 FPS01, נקרא במלואו דרך שירות התוכן (scripts/sap-help-body.mjs): 'Manage Maintenance " +
          "Plans App ID: F5325 With this app, you can manage maintenance plans.' העמוד מפרט צפייה בתכניות תחזוקה לפי חיפוש, " +
          "סינון וסטטוס, יצירה, הפעלה והשבתה, סימון למחיקה והסרת הסימון, יצירה ושיוך של פריטי תחזוקה (עם הפניה ל-Manage " +
          "Maintenance Items), צפייה בקריאות התחזוקה שנוצרות בתזמון התכנית ועריכה המונית (Mass Editing of Maintenance " +
          "Plans). קישור התיעוד שספריית ה-Fiori מדפיסה עבור F5325 מפנה לאותו loio (f0e9632b0e654fbeae597bad6abb823c).",
        verificationLevel: "sap_official_verified",
      },
      F5325_FAL_S32OP,
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori לניהול תכניות תחזוקה, היורש של Manage Maintenance Plan and Item List (W0026) שהוצא משימוש ב-S/4HANA " +
        "2022 ונמחק ב-2023 FPS01. ספריית יישומי ה-Fiori מציגה Published על S32OP (2025 FPS01) ועל S27OP (2023): תפקיד " +
        "מוביל SAP_BR_MAINTENANCE_PLANNER, קטלוגים SAP_EAM_BC_MPLAN ו-SAP_EAM_BC_MP_MNG, טרנזקציית GUI מובילה IP01 " +
        "וטרנזקציות קשורות IP02 עד IP06 ו-IP16; הספרייה ו-What's New 2025 FPS01 משייכים אותו לפריטי ההיקף 4HI (Proactive " +
        "Maintenance) ו-BJ2 (Preventive Maintenance), ואובייקט ההרשאה I_MPTYP זמין בו מ-2023.",
      edition: "on-premise",
      release: "2025.001",
      source: F5325_FAL_S32OP,
      recommendedAction:
        "להשתמש ב-F5325 (ובזוגו Manage Maintenance Items, F5356, שאין לו רשומה בפרויקט) במקום היישום הישן Manage " +
        "Maintenance Plan and Item List, עם התפקיד Maintenance Planner ובמידת הצורך Master Data Specialist - Maintenance " +
        "Management, הקטלוגים SAP_EAM_BC_MPLAN / SAP_EAM_BC_MP_MNG ושירותי ה-OData /SSB/SMART_BUSINESS_RUNTIME_SRV, " +
        "C_MAINTPLANACTVSYSTSTATUSQ_CDS ו-UI_MAINTENANCE_PLAN. לפני הפעלה: לאמת בגרסת היעד שהתפקידים והקטלוגים מוקצים " +
        "למשתמשים ושהשירותים פעילים.",
    },
    xrefs: [
      "tx:IP01", "tx:IP02", "tx:IP03", "tx:IP04", "tx:IP05", "tx:IP06", "tx:IP16", "fiori:F2774",
      "cds:I_MaintenancePlan", "table:MPLA",
    ],
    lastVerifiedAt: DATE24,
    notes:
      "נוסף 2026-09-22 על בסיס כותרות וקטעים של רשומות חיפוש SAP Help רשמיות. הועשר 2026-09-24: נקרא במלואו עמוד תיעוד " +
      "היישום ב-help.sap.com (loio f0e9632b0e654fbeae597bad6abb823c, scripts/sap-help-body.mjs), שאליו מפנה גם קישור " +
      "התיעוד שבספרייה, ונשלפה רשומת ספריית יישומי ה-Fiori דרך ערוץ ה-OData הרשמי (scripts/fal-app.mjs) על S32OP (2025 " +
      "FPS01) ו-S27OP (2023). Old → New: ב-2026-09-22 status.source היה null, סוג היישום Transactional נגזר מהפונקציה " +
      "המתועדת, והתפקיד, הקטלוג ושירות ה-OData לא נקראו מהספרייה; ב-2026-09-24 status.source מצביע על ראיית הספרייה " +
      "(evidence[6], קבוע משותף F5325_FAL_S32OP בדומה ל-F2774_MAINT_MGMT), והספרייה מדפיסה ApplicationType " +
      "Transactional. ה-catalogPatch (role, catalog, odata, guiTx, type, name, source, lastReviewed) מוחל על " +
      "data/fiori/apps.ts#F5325 יחד עם explain.technical (במקום 'תפקיד עסקי, קטלוג ושירות OData לא נקראו מספריית " +
      "ה-Fiori ולכן אינם מוצגים'), explain.consultant והערת הבלוק שם; הערת הבלוק מעל fiori:F2774 בקובץ זה מתעדכנת כך " +
      "שלא תקבע עוד שהתפקיד, הקטלוג וה-OData של F5325 אינם מוצגים. שירותי ה-OData יושבים לפי הספרייה על S4COREOP 109 " +
      "ב-S32OP ועל S4COREOP 108 ב-S27OP. הקודמים F3622, F5009 ו-W0026 שהספרייה מדפיסה אינם ביקום המזהים המתוחזק בפרויקט " +
      "(data/fiori/apps.ts) ולכן אינם ב-xrefs; F5356 (Manage Maintenance Items), שהמקורות מזכירים כזוג של F5325, גם הוא " +
      "ללא רשומה בפרויקט. IP04, IP05 ו-IP06 נוספו ל-xrefs כי הם ברשימת הטרנזקציות הקשורות שהספרייה מדפיסה והם קיימים " +
      "ביקום (lib/route-manifest.generated.ts). הודעות RIN שהספרייה מדפיסה (3493254 ו-3671888 על S32OP; 3336823 " +
      "ו-3351047 על S27OP) לא נרשמו כ-sapNote כי לא נקראו כ-KBA/OSS Note בתוכן. לא בוצעה בדיקה במערכת SAP חיה (אין " +
      "חיבור sc4sap MCP בהרצה זו).",
  },

  /* --------------------------------------------------------- fiori:F3289 */
  {
    id: "fiori:F3289",
    evidence: [
      F3289_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Work Center Capacity | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/2acb634615974535b4fabdc710937599.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE22,
        claim:
          "רשומת What's New לגרסת 2020 מציגה בפרטים הטכניים 'App New 31L PP-CFS-CE SAP S/4HANA 2020', כלומר רכיב " +
          "PP-CFS-CE ופריט היקף 31L; התוכן העסקי בקטע: 'You can edit the start and end time of a shift from the " +
          "Shifts tab directly'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Work Center Capacity | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/7b61621545224d24be7b20624523dcdf.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE22,
        claim:
          "רשומת What's New לגרסת 2021 חוזרת על 'App New 31L PP-CFS-CE' עבור S/4HANA 2021; התוכן העסקי בקטע: 'you " +
          "can select a date range or set an offset value before and after the current date in the Evaluation " +
          "Horizon filter'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Work Center Capacity | Planning",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f296651f454c4284ade361292c633d69/ce274262f5584b0f9049022063100935.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE22,
        claim: "רשומת What's New לגרסת 2023 מציגה בפרטים הטכניים 'App Changed 3LQ PP-CFS-CE SAP S/4HANA 2023'.",
        verificationLevel: "sap_official_verified",
      },
      F3289_FAL_S32OP,
      {
        sourceType: "fiori_library",
        sourceTitle: "SAP Fiori Apps Reference Library: Manage Work Center Capacity (F3289), S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/index.html#/detail/Apps('F3289')/S27OP",
        accessedAt: DATE24,
        claim:
          "רשומת הספרייה ל-F3289 על S27OP (2023), שנקראה באותו ערוץ: אותו AppName/EnglishTitle, Published, ApplicationType " +
          "'Transactional, Analytical', UITechnology 'SAP Fiori elements', ApplicationComponent PP-CFS-CE. אותו תפקיד מוביל " +
          "SAP_BR_PRODN_PLNR (R0114), אותו קטלוג עסקי SAP_SCM_BC_CFS וקטלוג טכני SAP_TC_SCM_PP_COMMON. אותם שני שירותי " +
          "OData PP_CFS_CAPEVAL_SRV ו-PP_MRP_AOR_SRV גרסה 0001, כאן על S4CORE 108. אותה טרנזקציית GUI מובילה CM01, ורשימת " +
          "ה-related ריקה. NumberofPredecessors=0, NumberofSuccessors=0. אותו ScopeItem 31L 'Production Capacity " +
          "Evaluation'. הודעות RIN שונות לגרסה זו: 3336823 (Front-End), 3351047 (Back-End). לפיכך תפקיד, קטלוגים, שירותי " +
          "OData וטרנזקציית ה-GUI המובילה זהים בשתי המהדורות (S32OP, S27OP).",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS), רשומת F3289",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE24,
        claim:
          "עד 2026-09-24 רשומת המאגר (trust: curated) נשאה role SAP_BR_PRODN_PLNR ו-catalog SAP_SCM_BC_CFS, זהים לרשומת " +
          "הספרייה הרשמית; guiTx נשא CM01 ו-CM07 (הספרייה מדפיסה CM01 כמובילה, ורשימת ה-related ריקה); שדה odata לא היה " +
          "קיים והתיעוד הפנימי סימן את ה-OData וה-CDS כטרם אומתו; type היה 'Transactional', לעומת 'Transactional, " +
          "Analytical' שהספרייה מדפיסה. relatedTables CRHD/KAKO לא אומתו מול רשומת הספרייה (הספרייה אינה מדפיסה טבלאות). " +
          "ב-2026-09-24 הועתקו לרשומה odata ו-guiTx לפי הספרייה; type נשאר 'Transactional' כי FioriType מקבל ערך אחד.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F3289",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "F3289 היא אפליקציית Fiori Elements של S/4HANA: 'Manage Work Center Capacity', להצגת הקיבולות והעומס על מרכזי " +
        "עבודה ולניהול משמרות. ספריית יישומי ה-Fiori (ערוץ ה-OData הרשמי) מציגה Published הן על S32OP (2025 FPS01) והן על " +
        "S27OP (2023), עם תפקיד עסקי מוביל SAP_BR_PRODN_PLNR, קטלוג עסקי SAP_SCM_BC_CFS, קטלוג טכני SAP_TC_SCM_PP_COMMON, " +
        "שני שירותי OData (PP_CFS_CAPEVAL_SRV, PP_MRP_AOR_SRV) וטרנזקציית GUI מובילה CM01, ללא predecessor/successor " +
        "רשומים. תיעוד ה-Help Portal ל-2025 FPS01 (אותו loio שמדפיסה רשומת הספרייה) מתאר את השימוש העסקי. What's New " +
        "2020/2021 משייכים את האפליקציה לפריט היקף 31L (PP-CFS-CE), ו-What's New 2023 מציין 'App Changed' תחת 3LQ; רשומת " +
        "הספרייה, על שתי המהדורות שנבדקו, מדפיסה את ScopeItem 31L.",
      edition: "on-premise",
      release: "2025.001",
      source: F3289_FAL_S32OP,
      recommendedAction:
        "להשתמש ביישום F3289 להצגת עומס מול קיבולת במרכזי עבודה ולניהול משמרות; תפקיד SAP_BR_PRODN_PLNR, קטלוג עסקי " +
        "SAP_SCM_BC_CFS, קטלוג טכני SAP_TC_SCM_PP_COMMON, שירותי OData PP_CFS_CAPEVAL_SRV ו-PP_MRP_AOR_SRV, וטרנזקציית " +
        "GUI מובילה CM01, לפי רשומת הספרייה שהתקבלה ב-2026-09-24 על S32OP ו-S27OP כאחד. לאמת במערכת חיה את פריט ההיקף " +
        "שהופעל בפועל (31L או 3LQ) ואת ההרשאות ל-CRHD/KAKO, ששניהם עדיין ללא ראיה רשמית ישירה.",
    },
    xrefs: ["tx:CM01", "tx:CM07", "table:CRHD", "table:KAKO", "fiori:F3951"],
    lastVerifiedAt: DATE24,
    notes:
      "מה נבדק ב-2026-09-24: הרצת scripts/fal-app.mjs F3289 מול ערוץ ה-OData הרשמי של ספריית ה-Fiori (לא JS shell) על " +
      "S32OP (2025 FPS01) ועל S27OP (2023) החזירה שתי רשומות Published זהות בתוכן (role, catalog, OData services, GUI " +
      "מוביל, ScopeItem 31L), עם מספרי RIN וגרסת S4CORE שונים כצפוי. זה מיישב שני פערים שנשארו פתוחים ברשומה שנרשמה " +
      "ב-2026-09-22 (מזהה F3289 לא הופיע בקטעי חיפוש help.sap.com, ותפקיד/קטלוג/טבלאות לא אומתו מול מקור רשמי): מזהה " +
      "F3289 מאושר כעת ישירות מהספרייה כ-App ID רשמי ומפורסם, ותפקיד+קטלוג עסקי תואמים במדויק את מה שרשומת המאגר כבר " +
      "נשאה (SAP_BR_PRODN_PLNR, SAP_SCM_BC_CFS); קטלוג טכני, שני שירותי OData, וטרנזקציית GUI מובילה (CM01; CM07 אינה " +
      "ברשימה שהספרייה מדפיסה) הם תוספת חדשה. עדיין לא אומתו מול מקור רשמי: הטבלאות CRHD/KAKO (הספרייה אינה מדפיסה " +
      "טבלאות), הזמינות מ-Cloud 2002 והטענה שהיישום תומך רק במרכזי עבודה של PP ולא PM (data/fiori/apps.ts#F3289 " +
      "המקורי); אלה נשארות בגדר claims לא מאומתים ולא הוסרו, רק לא נכללו בסטטוס. סתירת פריט ההיקף בין What's New (31L " +
      "ב-2020/2021, 3LQ 'Changed' ב-2023) מול ScopeItems של הספרייה (31L בשתי המהדורות) לא הוכרעה. לא בוצעה בדיקה " +
      "במערכת SAP חיה. History (Old → New): הרשומה מ-2026-09-22 סימנה role/catalog/CRHD/KAKO/Cloud-2002/PP-only כלא " +
      "מאומתים ב-notes; ב-2026-09-24 role ו-catalog אומתו מול ספריית ה-Fiori והתווספו odata + technical catalog + guiTx " +
      "מדויק (CM01), ואילו CRHD/KAKO/Cloud-2002/PP-only עדיין לא אומתו. ה-catalogPatch הוחל ב-2026-09-24 על " +
      "data/fiori/apps.ts#F3289 (odata, guiTx CM01, source, trust); type נשאר Transactional כי FioriType מקבל ערך אחד, " +
      "והספרייה מדפיסה 'Transactional, Analytical'. שורת המאגר מ-2026-09-22 (guiTx CM01/CM07 ותיאור ECC) הוחלפה בשורת " +
      "המאגר המתוארכת. הערות קודמות (2026-09-22, נשמרות): נוסף 2026-09-22 כטיוטה מחודשת לרשומה שנדחתה ב-2026-09-02: " +
      "הציטוט 'View the capacity requirement and available capacity for work centers. Reschedule the operation start " +
      "and end date if required' הוסר, כי אינו מופיע באף קטע חיפוש וגוף הדף הוא מעטפת JavaScript. סתירה בשיוך פריט " +
      "ההיקף: What's New 2020 (loio 2acb634615974535b4fabdc710937599) ו-2021 (loio 7b61621545224d24be7b20624523dcdf) " +
      "נוקבים ב-'31L PP-CFS-CE'; What's New 2023 (loio ce274262f5584b0f9049022063100935, 2023.000) מציג 'App Changed " +
      "3LQ PP-CFS-CE'; What's New של Cloud 2408.2 (loio a16c230ccde2438c93f700e0e5565124, 2408.07) מתייג את קבוצת " +
      "יישומי Capacity Planning, ובהם Manage Work Center Capacity, כ-'Scope Item 3LQ (Production Capacity Leveling) 31L " +
      "(Production Capacity Evaluation)'. הרכיב PP-CFS-CE עקבי בכל הרשומות. המזהה F3289 אינו מופיע בקטעי החיפוש של " +
      "On-Premise; הוא מופיע בכתובת SAP Fiori Apps Library בכותרת 'Manage Work Center Capacity - Fiori Apps Library' " +
      "(https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F3289')/S21OP, גוף הדף לא " +
      "נקרא) וברשומות What's New של Cloud Public Edition, למשל 2602 (loio ddbe768b47ca46b39d466cb7315c1081, 2602.00): " +
      "'App ID: F3289 New 31L PP-CFS-CE' ו-'Application Component PP-CFS-CE-2CL (Capacity Evaluation)'. לא אומתו במקור " +
      "של SAP: התפקיד SAP_BR_PRODN_PLNR, הקטלוג SAP_SCM_BC_CFS, הטבלאות CRHD/KAKO, הזמינות מ-Cloud 2002 והטענה שהיישום " +
      "תומך רק במרכזי עבודה של PP ולא PM (data/fiori/apps.ts#F3289); קטע What's New של Cloud 2408.2 מזכיר הצגת תאריכי " +
      "פעולה של פקודות תחזוקה ביישומי Capacity Planning, ולכן טענת ה-PP בלבד דורשת בדיקה. לא בוצעה בדיקה במערכת SAP " +
      "חיה.",
  },

  /* ---- 2026-09-23 batch: official App IDs that the records above already named (F5241, F2072,
     W0029, W0028, F8669, F4587, F5323, F2462, F1511A, F0251A, F5460, W0020), now catalog entries in
     data/fiori/apps.ts. Every quotation is a fragment of a help.sap.com search snippet saved on
     that date (scripts/sap-help-search.mjs --json); topic bodies are JS shells and were not
     read. F5777 was not added: no SAP_S4HANA_ON-PREMISE record names it. ---- */

  /* --------------------------------------------------------- fiori:F5241 */
  {
    id: "fiori:F5241",
    evidence: [
      F5241_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Maintenance Orders App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS03",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.003",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/dd84263e832b4c3b83d35d4be9653f39.html?locale=en-US&state=PRODUCTION&version=2023.003",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2023 FPS03 (loio dd84263e832b4c3b83d35d4be9653f39): 'With this app, you can display a " +
          "comprehensive list view of maintenance orders, create maintenance orders and process individual orders.'; 'Technical " +
          "Details Type New'; 'Scope Item 4HH (Reactive Maintenance) 4HI (Proactive Maintenance) BH1 (Corrective Maintenance) " +
          "BJ2'; 'Technical Object Name App ID: F5241 Application Component PM-FIO-WOC-MO (Fiori UI for PM Maintenance Orders) " +
          "Availability SAP S/4HANA and SAP S/4HANA Cloud Private Edition'; 'Valid as Of 2023 FPS03'. היישום נוסף כחדש " +
          "ב-2023 FPS03.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Enhancements for Manage Maintenance Orders App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/ec6bf626bf8246439f2795f31e7f07c3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2025 FPS01 (loio ec6bf626bf8246439f2795f31e7f07c3): 'New features are available in the " +
          "Manage Maintenance Orders app (F5241).' היישום ממשיך לקבל הרחבות במהדורה הנוכחית.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA לניהול פקודות אחזקה: What's New 2023 FPS03 רושם אותו כחדש (Type New) ברכיב PM-FIO-WOC-MO " +
        "ובזמינות SAP S/4HANA ו-SAP S/4HANA Cloud Private Edition, והוא מתועד ב-Maintenance Management לגרסת 2025 FPS01 " +
        "תחת App ID F5241.",
      edition: "on-premise",
      release: "2025.001",
      source: F5241_APP_TOPIC,
      recommendedAction:
        "להשתמש במזהה F5241 לכותרת Manage Maintenance Orders. הרשומה המתוחזקת F2731 נושאת את אותה כותרת בלי מקור רשמי " +
        "(ראו fiori:F2731). לקרוא מספריית ה-Fiori את התפקיד העסקי, הקטלוג ושירות ה-OData לפני שיוצגו.",
    },
    xrefs: ["fiori:F2731", "fiori:F4604"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE (שם היישום עם המזהה " +
      "בגרסה 2025.001, שאילתה ללא גרסה, ושתי שאילתות נעוצות לגרסה 2023.003 לפרטים הטכניים). הראיות הן כותרות וקטעים של " +
      "רשומות החיפוש; גופי הדפים לא נקראו. רשומת What's New 2025 (loio e765a4541f49412b9508fdab1ecaf2c9) מתעדת הרחבה " +
      "בשדות Key User לפעולות ההזמנה ביישום F5241. לא אומתו: תפקיד עסקי, קטלוג, שירות OData, תצוגות CDS, טרנזקציות GUI " +
      "מקבילות וזמינות ב-Public Cloud. ה-xref ל-F4604 הוא עזר ניווט (שני היישומים נמנים יחד בקטעים רשמיים, למשל EAM, " +
      "Inspection Checklists לגרסת 2025.001), לא מיפוי רשמי. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F2072 */
  {
    id: "fiori:F2072",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Find Technical Object | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/4dd5a057b76f9f2de10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "נושא היישום ב-Maintenance Management לגרסת 2025 FPS01 (loio 4dd5a057b76f9f2de10000000a44147b): 'Find Technical " +
          "Object Use With this app, you can list the technical objects in your system.'; תחת Key Features: 'List technical " +
          "objects Filter technical objects by various parameters, such as type, location, manufacturer, and status Search for " +
          "technical objects Display a single technical object'. קטע הנושא אינו נוקב במזהה.",
        verificationLevel: "sap_official_verified",
      },
      F2072_APM_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Equipment | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/08c1d29f1acc4d459ecc198dc18ee6ce.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "תיעוד ההגירה של אובייקט PM - Equipment לגרסת 2025 FPS01 (loio 08c1d29f1acc4d459ecc198dc18ee6ce): 'In addition, you " +
          "can also use the following app or apps: App: Find Technical Object (F2072) Create Equipment (IE01) Change Equipment " +
          "(IE02) Display Equipment (IE03)'. הקטע מונה את היישום לצד טרנזקציות הציוד ואינו קובע שהוא מחליף אותן.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Structure in Find Technical Object App | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/5e0bcb6d686840e0b6bd02f1628c00bb.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2023 (loio 5e0bcb6d686840e0b6bd02f1628c00bb): 'You can now install equipment on the " +
          "equipment or dismantle equipment from the equipment using the options that are available in the Manage Structure " +
          "dropdown list in the Find Technical'; בשורת הסיכום: 'App Changed 4HH 4HI 4VT 4WM PM-EQM SAP S/4HANA 2023'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Deletion of Display Master Data Information Center Apps | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/1fae728c81b34dbb8294e903cec45e6e.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2023 (loio 1fae728c81b34dbb8294e903cec45e6e): 'The Display Master Data Information Center " +
          "apps (W0011 and W0012) have been deleted and are no longer available on the SAP Fiori launchpad.'; 'You can use the " +
          "following successor app which is available on the SAP Fiori launchpad: Find Technical Object (F2072).'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Finding Technical Objects and Maintenance Execution Data | What's New in SAP S/4HANA",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "100",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4c6c3c99e6e94a92a626f424add61cba/aaa3b71a56074367b64a0e06477988f1.html?locale=en-US&state=PRODUCTION&version=100",
        accessedAt: DATE23,
        claim:
          "רשומת What's New in SAP S/4HANA (versionId 100, loio aaa3b71a56074367b64a0e06477988f1): 'with the Maintenance " +
          "Technician role: Find Technical Object Find Maintenance Notification Find Maintenance Order Find'; 'Technical Name of " +
          "Product Feature Find Technical Object: F2072_S4OP'. הקטע אינו קובע גרסת הצגה ראשונה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA לאיתור אובייקטים טכניים, מתועד ב-Maintenance Management לגרסת 2025 FPS01 תחת App ID F2072, " +
        "ורשום במסמך What's New in SAP S/4HANA (100) בין היישומים של תפקיד Maintenance Technician (שם המאפיין הטכני " +
        "F2072_S4OP). מ-2023 הוא היישום היורש של Display Master Data Information Center (W0011, W0012).",
      edition: "on-premise",
      release: "2025.001",
      source: F2072_APM_TOPIC,
      recommendedAction:
        "להשתמש ב-F2072 לאיתור, להצגה ולעריכה המונית של אובייקטים טכניים ולניהול המבנה (התקנה ופירוק של ציוד). הרשומה " +
        "המתוחזקת F2730A (Manage Technical Objects) אינה נתמכת במקור רשמי (ראו fiori:F2730A). לקרוא מספריית ה-Fiori את " +
        "התפקיד העסקי, הקטלוג ושירות ה-OData לפני שיוצגו.",
    },
    xrefs: ["fiori:F2730A", "fiori:W0028", "tx:IE01", "tx:IE02", "tx:IE03"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בחמש שאילתות על SAP_S4HANA_ON-PREMISE (המזהה עם השם, תיאור " +
      "היישום, רשומת המחיקה של 2023, שאילתה על רשומות What's New ללא גרסה ושאילתה נעוצה לגרסה 1610) ובשתי שאילתות על " +
      "SAP_ERP ו-SAP_FIORI. " +
      "העריכה ההמונית נשענת על נושא Mass Editing of Technical Objects (2025.001, loio 3affff95fad94b9fb3b81730a5f880b1) " +
      "שקטעו אומר שביישום ניתן לשנות פרמטרים של כמה אובייקטים טכניים בבת אחת. What's New 1610 (loio " +
      "f49b0833772e4599b58e342fa7f3fd19) מונה את Finding Technical Objects and Maintenance Execution Data עם חמישה " +
      "יישומים; הקטע אינו נוקב במזהה ואינו קובע שהיישום חדש, ולכן releaseInfo ריק. חיפוש שם היישום במוצרים SAP_ERP " +
      "ו-SAP_FIORI (21 רשומות בכל אחד) לא החזיר רשומה בשם זה ולא את המזהה; ההיעדר תחום לחיפוש ואינו הוכחה. " +
      "ה-xrefs ל-IE01/IE02/IE03 ול-W0028 נשענים על קטעי ההגירה של PM - Equipment, שמונים אותם כיישומים נוספים לאותו " +
      "אובייקט; זה עזר ניווט ולא מיפוי החלפה. לא אומתו: תפקיד עסקי, קטלוג, שירות OData, תצוגות CDS וזמינות ב-Public " +
      "Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:W0029 */
  {
    id: "fiori:W0029",
    evidence: [
      W0029_WHATS_NEW_2025_FPS01,
      {
        sourceType: "sap_help",
        sourceTitle: "Process Technical Object | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/60021e57f2f40a75e10000000a4450e5.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "נושא Process Technical Object ב-Maintenance Management לגרסת 2025 FPS01 (loio 60021e57f2f40a75e10000000a4450e5): " +
          "'Process Technical Object Use Three apps are provided for processing a technical object: Create Technical Object, " +
          "Change Technical Object, and Display Technical Object.'; 'As a maintenance planner, you can create and change " +
          "technical objects to efficiently manage and evaluate technical assets and maintenance objects and monitor the costs " +
          "involved.'; 'Supported Device Types Desktop Relevant Business Catalog EAM - Technical Object (SAP_EAM_BC_TO)'. קטע " +
          "הנושא אינו נוקב ב-W0029; הקישור בין הנושא למזהה נשען על זהות הכותרת עם רשומת ה-What's New.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Business Package for Generic EAM Functions 1.61 | Business Package for Generic EAM Functions 1.61",
        product: "SAP ERP 6.0",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/8c7d68c3fa98477780473f8525c7588d/698fc7b98cb84b61b24965d10b95faf5.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE23,
        claim:
          "תיעוד SAP ERP 6.0 EHP8 (loio 698fc7b98cb84b61b24965d10b95faf5): 'The Business Package for Generic EAM Functions " +
          "contains Web Dynpro applications for the following business'; בטבלת המצבים: 'Object Type Available Modes Technical " +
          "object Change, create, and display'. אפליקציות Web Dynpro ליצירה, לשינוי ולהצגה של אובייקט טכני מתועדות כבר " +
          "ב-SAP ERP; הקטע אינו נוקב ב-W0029, ולכן הזהות בינן לבין W0029 אינה מוכחת.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "Process Technical Object (W0029) היא אפליקציית Web Dynpro ליצירה ולשינוי של אובייקטים טכניים, מתועדת ב-S/4HANA " +
        "On-Premise 2025 FPS01 (What's New 2025 FPS01 ונושא Maintenance Management). תיעוד SAP ERP 6.0 EHP8 מתאר כבר " +
        "אפליקציות Web Dynpro ליצירה, לשינוי ולהצגה של אובייקט טכני ב-Business Package for Generic EAM Functions 1.61, " +
        "ולכן לא נקבע אם W0029 חדשה ב-S/4HANA או אותה אפליקציה מ-SAP ERP; הקטעים אינם מכריעים.",
      edition: "on-premise",
      release: "2025.001",
      source: W0029_WHATS_NEW_2025_FPS01,
      recommendedAction:
        "להציג את W0029 כזמינה ב-S/4HANA On-Premise 2025 FPS01 בלי לסמן אותה כחדשה ב-S/4HANA. לאמת במערכת או בספריית " +
        "ה-Fiori את שם אפליקציית ה-Web Dynpro ואת התפקיד העסקי, ולהשוות לאפליקציות של Business Package for Generic EAM " +
        "Functions ב-ECC לפני שמכריעים אם היא חדשה או ממשיכה אפליקציה קיימת.",
    },
    xrefs: ["tx:IL02", "fiori:W0028", "fiori:F2730A"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE 2025.001 (המזהה, שאילתה " +
      "ממוקדת לרשומת ה-BAdI, קטלוג הנושא ותיאור תפקיד המתכנן) ובשאילתה אחת על SAP_ERP. הקטלוג SAP_EAM_BC_TO ברשומת הקטלוג " +
      "נלקח מנושא Process Technical Object, שקטעו אינו נוקב במזהה; הקישור נשען על זהות הכותרת. סוג היישום Transactional " +
      "ברשומת הקטלוג הוא ערך הסכימה הקרוב (אין בסכימה ערך Web Dynpro). הסטטוס 'נדרש אימות נוסף' נכתב במקום 'חדש " +
      "ב-S/4HANA' בגלל הראיה מ-SAP ERP; זמינות היישום ב-S/4HANA On-Premise 2025 FPS01 עצמה מאומתת. לא אומתו: תפקיד עסקי, " +
      "שם אפליקציית ה-Web Dynpro, זמינות ב-Public Cloud וגרסת הצגה ראשונה. ה-xref ל-IL02 נשען על רשומת ה-What's New " +
      "שמונה את שניהם ברשימה אחת; זה עזר ניווט ולא מיפוי החלפה. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:W0028 */
  {
    id: "fiori:W0028",
    evidence: [
      W0028_MIGRATION_EQUIPMENT,
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Functional location | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/7c5578ab53e0457f905145bc535839cf.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "אותו צימוד באובייקט ההגירה PM - Functional location לגרסת 2025 FPS01 (loio 7c5578ab53e0457f905145bc535839cf): " +
          "'Functional Location Display Technical Object (app ID W0028) BAPI_FUNCLOC_CREATE'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "PM - Functional location | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/b6207b9f98d3490c81b2b5550e315273.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "נושא הגירה נוסף של PM - Functional location לגרסת 2025 FPS01 (loio b6207b9f98d3490c81b2b5550e315273): 'The Display " +
          "Technical Object app shows only the data relevant for the logon language.'",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Display Technical Object | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/f11f4d57001c0922e10000000a44147b.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "נושא Display Technical Object ב-Maintenance Management לגרסת 2025 FPS01 (loio f11f4d57001c0922e10000000a44147b): " +
          "'Display Technical Object Use As a maintenance technician, you can use this app to view technical objects that have " +
          "been created to efficiently manage and evaluate technical assets and maintenance objects'; 'Supported Device Types " +
          "Desktop Relevant Business Catalog EAM - Technical Object MW (SAP_EAM_BC_TO_MW)'; 'Note If you have the business role " +
          "Maintenance Planner, you can also use this app as well as access the apps Create Technical Object and Change " +
          "Technical Object.' קטע הנושא אינו נוקב ב-W0028; הקישור נשען על זהות הכותרת עם רשומות ההגירה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Display Technical Object | Business Package for Generic EAM Functions 1.61",
        product: "SAP ERP 6.0",
        edition: "ecc",
        release: "6.18.latest",
        url: "https://help.sap.com/docs/SAP_ERP/8c7d68c3fa98477780473f8525c7588d/a4628cb3d1de4d89bffa676e976f7cab.html?locale=en-US&state=PRODUCTION&version=6.18.latest",
        accessedAt: DATE23,
        claim:
          "תיעוד SAP ERP 6.0 EHP8 (loio a4628cb3d1de4d89bffa676e976f7cab): 'You can use this iView to display a technical " +
          "object.'; 'Technical Name of the iView com.sap.pct.erp.eam.gen.eam_technical_object_display Runtime Technology " +
          "ABAP/Web Dynpro'. iView מבוסס Web Dynpro באותו שם מתועד כבר ב-SAP ERP; הקטע אינו נוקב ב-W0028, ולכן הזהות " +
          "ביניהם אינה מוכחת.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "verification_required",
      he:
        "Display Technical Object (W0028) מתועדת ב-S/4HANA On-Premise 2025 FPS01 בתיעוד ההגירה של ציוד ושל מיקום פונקציונלי " +
        "ובנושא Maintenance Management כאפליקציה שבה טכנאי האחזקה צופה באובייקטים טכניים. תיעוד SAP ERP 6.0 EHP8 מתאר iView " +
        "מבוסס Web Dynpro באותו שם ב-Business Package for Generic EAM Functions 1.61, ולכן לא נקבע אם W0028 חדשה ב-S/4HANA " +
        "או אותה אפליקציה מ-SAP ERP; הקטעים אינם מכריעים.",
      edition: "on-premise",
      release: "2025.001",
      source: W0028_MIGRATION_EQUIPMENT,
      recommendedAction:
        "להציג את W0028 כזמינה ב-S/4HANA On-Premise 2025 FPS01 בלי לסמן אותה כחדשה ב-S/4HANA, ולזכור שלפי תיעוד ההגירה היא " +
        "מציגה רק את נתוני שפת ההתחברות. לאמת במערכת או בספריית ה-Fiori את שם אפליקציית ה-Web Dynpro ואת התפקיד העסקי " +
        "לפני שמכריעים אם היא חדשה או ממשיכה את ה-iView של SAP ERP.",
    },
    xrefs: ["tx:IE03", "tx:IL03", "fiori:F2072", "fiori:W0029", "fiori:F2730A"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בשתי שאילתות על SAP_S4HANA_ON-PREMISE 2025.001 (המזהה עם השם, " +
      "וקטלוג הנושא) ובשתי שאילתות על SAP_ERP. הקטלוג SAP_EAM_BC_TO_MW ברשומת הקטלוג נלקח מנושא Display Technical Object, " +
      "שקטעו אינו נוקב במזהה; הקישור נשען על זהות הכותרת. סוג היישום Transactional ברשומת הקטלוג הוא ערך הסכימה הקרוב " +
      "לאפליקציית תצוגה; הקטעים אינם מציינים את טכנולוגיית הממשק של W0028. אותו iView מופיע גם ב-Business Package for " +
      "Maintenance Worker 1.61 (SAP ERP 6.0 EHP6 on HANA ו-EHP8). הסטטוס 'נדרש אימות נוסף' נכתב במקום 'חדש ב-S/4HANA' בגלל הראיה " +
      "מ-SAP ERP; הזמינות ב-S/4HANA On-Premise 2025 FPS01 עצמה מאומתת. ה-xrefs ל-IE03 ול-IL03 נשענים על קטעי ההגירה של " +
      "PM - Equipment ו-PM - Functional location, שמונים את Display Equipment (IE03) ואת Display Functional Location (IL03) " +
      "לצד היישום; זה עזר ניווט ולא מיפוי החלפה. לא אומתו: תפקיד עסקי, שם אפליקציית ה-Web Dynpro, זמינות ב-Public Cloud " +
      "וגרסת הצגה ראשונה. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F8669 */
  {
    id: "fiori:F8669",
    evidence: [
      F8669_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Technical Object Structures App | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/6b9a013a2f4649708c2b9c7238271c85.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2025 FPS01 (loio 6b9a013a2f4649708c2b9c7238271c85): 'Technical Details Type New Functional " +
          "Localization No localization Scope Item Not applicable Technical Object Name App ID: F8669 Application Component " +
          "PM-EQM-RS'; 'With the Manage Technical Object Structures (F8669) app, you can view and manage hierarchical " +
          "structures.' היישום חדש ב-2025 FPS01.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori חדש ב-S/4HANA 2025 FPS01 (What's New 2025 FPS01: Type New, רכיב PM-EQM-RS) ליצירה ולניהול של מבני " +
        "אובייקטים טכניים בטיוטה, מתועד ב-Maintenance Management לגרסת 2025 FPS01 תחת App ID F8669.",
      edition: "on-premise",
      release: "2025.001",
      source: F8669_APP_TOPIC,
      recommendedAction:
        "לשקול את F8669 לבניית מבנים חדשים של אובייקטים טכניים כטיוטה לפני יצירתם במערכת (זמין מ-2025 FPS01). היישום אינו " +
        "מחליף את הרשומה המתוחזקת F2730A (Manage Technical Objects), שאינה נתמכת במקור רשמי. לקרוא מספריית ה-Fiori את " +
        "התפקיד העסקי, הקטלוג ושירות ה-OData לפני שיוצגו.",
    },
    xrefs: ["fiori:F2730A"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בשתי שאילתות על SAP_S4HANA_ON-PREMISE 2025.001 (המזהה עם השם, " +
      "ושאילתה ממוקדת לפרטים הטכניים של רשומת ה-What's New). רכיב היישום נקטע בקטע אחרי 'PM-EQM-RS'. אובייקט ההרשאה " +
      "I_DRTOS (Authorization for Draft Technical Object Structure) מתועד ב-What's New 2025 FPS01 (loio " +
      "0d8840e3e7384c1c9e73bbcb8ea8cd71) עם הפניה ל-Manage Technical Object Structures, אך הקטע אינו קובע שהוא נבדק " +
      "ביישום, ולכן אינו ברשומת הקטלוג. לא אומתו: תפקיד עסקי, קטלוג, שירות OData וזמינות ב-Public Cloud. לא בוצעה בדיקה " +
      "במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F4587 */
  {
    id: "fiori:F4587",
    evidence: [
      F4587_FEATURE_COMPARISON,
      {
        sourceType: "sap_help",
        sourceTitle: "Segmentation Enhancements in Process Order Related Fiori Apps | What's New in SAP S/4HANA 2021 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/77ff56ba8e584f4cb537b660e7810fd7.html?locale=en-US&state=PRODUCTION&version=2021.001",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2021 FPS01 (loio 77ff56ba8e584f4cb537b660e7810fd7): 'Apps that have been enhanced with the " +
          "stock segment information include: Process Order Object Page (F2263) Process Order Confirmation Object Page (F2266) " +
          "Manage Process Orders (F4587)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Fashion Enablement in Standard Manufacturing Apps | Retail",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/21d0d1f8e18e41ebbc93d2a8a4c51d97.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "תיעוד Retail לגרסת 2025 FPS01 (loio 21d0d1f8e18e41ebbc93d2a8a4c51d97): 'Manage Process Orders (F4587) Features You " +
          "can display fashion related information'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Process Orders | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/a84b0308f73c43f29154fbb7e54e15d3.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "נושא היישום לגרסת 2025 FPS01 (loio a84b0308f73c43f29154fbb7e54e15d3): 'Manage Process Orders With this app, you can " +
          "manage the progress of process orders. You have an overview of the current situation with all the information you " +
          "need to solve any issues.'; 'Manage the entire lifecycle of your process order from creation to completion.'; " +
          "'Manage Process Order Operations to view the operation level details of the process order.' קטע הנושא אינו נוקב " +
          "במזהה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Process Orders | What's New in SAP S/4HANA 2020",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2020.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/dc987ea755344b219964916762803a47.html?locale=en-US&state=PRODUCTION&version=2020.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2020 (loio dc987ea755344b219964916762803a47): 'Manage Process Orders With this feature, you " +
          "can manage the progress of process orders.'; 'See More App New BJ8 PP-FIO-PI SAP S/4HANA 2020'. הרשומה נוקבת " +
          "בכותרת ולא במזהה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA לניהול הזמנות תהליך (PP-PI), מתועד ב-Production Planning and Control לגרסת 2025 FPS01. " +
        "המזהה F4587 מופיע לצד השם בטבלת ההשוואה של 2025 FPS01, ב-What's New 2021 FPS01 ובתיעוד Retail לגרסת 2025 FPS01; " +
        "What's New 2020 רושם את Manage Process Orders כיישום חדש ברכיב PP-FIO-PI (לפי הכותרת).",
      edition: "on-premise",
      release: "2025.001",
      source: F4587_FEATURE_COMPARISON,
      recommendedAction:
        "להשתמש במזהה F4587 לכותרת Manage Process Orders. המזהה F3577 שברשומה המתוחזקת אינו מופיע באף מקור רשמי (ראו " +
        "fiori:F3577). לקרוא מספריית ה-Fiori את התפקיד העסקי, הקטלוג ושירות ה-OData לפני שיוצגו.",
    },
    xrefs: ["fiori:F3577", "fiori:F5323", "tx:COOISPI", "tx:COHVPI"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE (המזהה עם השם בגרסה " +
      "2025.001, תיאור היישום, ושתי שאילתות נעוצות לגרסאות 2021.001 ו-2020.000). releaseInfo ברשומת הקטלוג (SAP S/4HANA " +
      "2020) נשען על רשומת What's New 2020 הנוקבת בכותרת Manage Process Orders בלי מזהה; הקישור למזהה F4587 נשען על זהות " +
      "הכותרת. ה-xrefs ל-COOISPI ול-COHVPI נשענים על טבלת ההשוואה; זה עזר ניווט ולא מיפוי החלפה. לא אומתו: תפקיד עסקי, " +
      "קטלוג, שירות OData, תצוגות CDS וזמינות ב-Public Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F5323 */
  {
    id: "fiori:F5323",
    evidence: [
      F4587_FEATURE_COMPARISON,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Process Order Operations | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/48d4f057b6a44fb59d3c3d85500a9f42.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "נושא היישום לגרסת 2025 FPS01 (loio 48d4f057b6a44fb59d3c3d85500a9f42): 'Manage Process Order Operations With this " +
          "app, you can monitor the progress of process orders at the detailed operations level.'; 'View the details of all the " +
          "operations involved in a process order.' קטע הנושא אינו נוקב במזהה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Process Order Operations | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/579f4687ec304f5eb19e2b1fefa09d84.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2021 (loio 579f4687ec304f5eb19e2b1fefa09d84): 'Technical Details Type New Functional " +
          "Localization Not applicable Scope Item BJ8(Make-to-Stock - Process Manufacturing Based on Process Order) Application " +
          "Component PP-FIO-PI'; 'Valid as Of SAP S/4HANA 2021'. הרשומה נוקבת בכותרת ולא במזהה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA למעקב אחר הזמנות תהליך ברמת הפעולה, חדש ב-SAP S/4HANA 2021 לפי What's New 2021 (רכיב " +
        "PP-FIO-PI, פריט היקף BJ8) ומתועד ב-Production Planning and Control לגרסת 2025 FPS01. המזהה F5323 נשען על טבלת " +
        "ההשוואה של 2025 FPS01 בלבד, בקריאה לפי סדר הערכים.",
      edition: "on-premise",
      release: "2025.001",
      source: F4587_FEATURE_COMPARISON,
      recommendedAction:
        "להשתמש ב-F5323 לצד Manage Process Orders (F4587) למעקב ברמת הפעולה. מכיוון שהמזהה נשען על רשומה רשמית אחת בקריאה " +
        "לפי סדר הערכים, לאמת אותו בספריית ה-Fiori יחד עם התפקיד העסקי, הקטלוג ושירות ה-OData לפני שמציגים אותו ללקוח.",
    },
    xrefs: ["fiori:F4587", "fiori:F3577"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בשמונה שאילתות. חיפוש המזהה F5323 לבדו ללא גרסה על " +
      "SAP_S4HANA_ON-PREMISE החזיר רשומה אחת בלבד הנוקבת במזהה (טבלת ההשוואה); חיפוש השם עם המזהה בסוגריים בגרסאות " +
      "2022.000, 2023.000 ו-2025.000 (21 רשומות בכל אחת) לא החזיר צימוד נוסף, וגם חיפוש על SAP_S4HANA_CLOUD לא החזיר " +
      "רשומה הנוקבת ב-F5323 (בקטע טבלת ההשוואה בענן המזהים נקטעו). releaseInfo ברשומת הקטלוג (SAP S/4HANA 2021) נשען על " +
      "רשומת What's New הנוקבת בכותרת בלבד. What's New 2022 (loio cfa1ded421e34d4c9717c49ead0edca8) מתעד הרחבת Key User " +
      "ליישום. לא אומתו: תפקיד עסקי, קטלוג, שירות OData וזמינות ב-Public Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F2462 */
  {
    id: "fiori:F2462",
    evidence: [
      F2462_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "App Implementation: Manage Batches | Batch Management (LO-BM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/4eb099dbc8a6435c9b36a854a7e05522/006de05317e74e5399d82fb88f21810d.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "עמוד ה-App Implementation לגרסת 2025 FPS01 (loio 006de05317e74e5399d82fb88f21810d) מכיל את 'appId=F2462.' וקובע: " +
          "'Please also note that depending on the batch level one of the following search connectors needs to be activated " +
          "in the back-end system: Batch Level Search Connector Plant level BATCH_PLANT_H'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Characteristics as Custom Fields | Product Lifecycle Management (PLM)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/36802406aebb4b96b1598246e1d316ee/ed8ef9ad029a421d829e5d393873d741.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "טבלה בעמוד ה-PLM לגרסת 2025 FPS01 (loio ed8ef9ad029a421d829e5d393873d741) שכותרות העמודות שלה בקטע הן 'Business " +
          "Context Business Object Fiori Applications Data Source to be Extended', ובה השורה 'BATCH_CLASSIFICATION_CFE Batch " +
          "Manage Batches (F2462) LO_BM_BATCH_SRV'. LO_BM_BATCH_SRV הוא מקור הנתונים של היישום להרחבה בשדות מאפיין.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Batch unique at plant level | Data Migration",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/29193bf0ebdd4583930b2176cb993268/3504f738294541709a8c2dff2dbb5b30.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "תיעוד ההגירה לגרסת 2025 FPS01 (loio 3504f738294541709a8c2dff2dbb5b30): 'In addition, you can also use the following " +
          "app or apps: App: Manage Batches (F2462) Display Batch (MSC3N)'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA לניהול אצוות, מתועד ב-Batch Management (LO-BM) לגרסת 2025 FPS01 תחת App ID F2462. בחיפושי " +
        "SAP ERP ו-SAP Fiori for SAP Business Suite לא נמצאה רשומה בשם Manage Batches; גרסת ההצגה הראשונה לא נקבעה.",
      edition: "on-premise",
      release: "2025.001",
      source: F2462_APP_TOPIC,
      recommendedAction:
        "להשתמש במזהה F2462 לכותרת Manage Batches. המזהה F1576 שברשומה המתוחזקת אינו מופיע באף מקור רשמי (ראו " +
        "fiori:F1576). לפני ההפעלה להפעיל ב-back-end את מחבר החיפוש המתאים לרמת האצווה (למשל BATCH_PLANT_H לרמת מפעל), " +
        "ולקרוא מספריית ה-Fiori את התפקיד העסקי והקטלוג.",
    },
    xrefs: ["fiori:F1576", "tx:MSC3N"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בשאילתה אחת על SAP_S4HANA_ON-PREMISE 2025.001 (המזהה עם השם) " +
      "ובשתי שאילתות על SAP_ERP ו-SAP_FIORI; שתי האחרונות (21 רשומות בכל אחת) לא החזירו רשומה בשם Manage Batches ולא את " +
      "המזהה, וההיעדר תחום לחיפוש. המודול LO-BM נקבע לפי ה-deliverable ‏Batch Management (LO-BM); הרשומה המתוחזקת F1576 " +
      "מסווגת את אותו יישום תחת PP-PI. שדה odata ברשומת הקטלוג (LO_BM_BATCH_SRV) הוא מקור הנתונים שהטבלה ב-PLM מציגה " +
      "ליישום (Data Source to be Extended); רשימת השירותים המלאה של היישום לא נקראה, והתיעוד מכיר גם את API_BATCH_SRV " +
      "כ-Batch API בלי לקשור אותו ליישום. ה-xref ל-MSC3N נשען על קטע ההגירה; זה עזר ניווט ולא מיפוי החלפה. לא אומתו: " +
      "תפקיד עסקי, קטלוג, גרסת הצגה ראשונה וזמינות ב-Public Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* -------------------------------------------------------- fiori:F1511A */
  {
    id: "fiori:F1511A",
    evidence: [
      F1511A_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison - Request Maintenance and Create Maintenance Request | Maintenance Management",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e72f747389b340229f7fa343975bfa57/5d2fbff31efc440b8200fbad95a68dfe.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "עמוד ההשוואה לגרסת 2025 FPS01 (loio 5d2fbff31efc440b8200fbad95a68dfe): 'Compared Features Request Maintenance " +
          "Create Maintenance Request F1511 F1511A Draft maintenance requests are available.' שתי אפליקציות נפרדות: לפי סדר " +
          "הכותרות והמזהים, F1511 היא Request Maintenance ו-F1511A היא Create Maintenance Request.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Maintenance Activity Type in Maintenance Requests | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2025 FPS01",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/77a5d29949fd4a7494731ff6b4152e6f.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2025 FPS01 (loio 77a5d29949fd4a7494731ff6b4152e6f): 'You can now add a maintenance activity " +
          "type for a maintenance request in Create Maintenance Request app (F1511A)'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Create Maintenance Request | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/7a645d9e5e7841af8a6309e117e3bedf.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2021 (loio 7a645d9e5e7841af8a6309e117e3bedf): 'Create Maintenance Request With this app, you " +
          "can create maintenance requests.'; 'The maintenance requests created by you are also available in My Maintenance " +
          "Requests app.' הרשומה נוקבת בכותרת ולא במזהה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Phase Model for the Maintenance Process | What's New in SAP S/4HANA 2021",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2021.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/155d60bad23c421ca95ba64c68ce96fa.html?locale=en-US&state=PRODUCTION&version=2021.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2021 (loio 155d60bad23c421ca95ba64c68ce96fa): 'For more information, see the following " +
          "What's New documents about new apps designed for this end-to-end process: Create Maintenance Request My Maintenance " +
          "Requests Screen Maintenance Requests'. Create Maintenance Request נמנה בין היישומים החדשים של מודל השלבים (לפי " +
          "הכותרת).",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA ליצירת בקשות אחזקה, מתועד ב-Maintenance Management לגרסת 2025 FPS01 תחת App ID F1511A, ונמנה " +
        "ב-What's New 2021 בין היישומים החדשים של מודל השלבים בתהליך האחזקה (לפי הכותרת). יישום נפרד מ-Request Maintenance " +
        "(F1511).",
      edition: "on-premise",
      release: "2025.001",
      source: F1511A_APP_TOPIC,
      recommendedAction:
        "להשתמש במזהה F1511A לכותרת Create Maintenance Request. הרשומה המתוחזקת F1511 נושאת את הכותרת הזו, בעוד שלפי התיעוד " +
        "F1511 הוא Request Maintenance (ראו fiori:F1511). לקרוא מספריית ה-Fiori את התפקיד העסקי, הקטלוג ושירות ה-OData לפני " +
        "שיוצגו.",
    },
    xrefs: ["fiori:F1511", "fiori:F4072"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE (המזהה עם השם בגרסה " +
      "2025.001, שאילתה ללא גרסה ושתי שאילתות נעוצות לגרסה 2021.000). releaseInfo ברשומת הקטלוג (SAP S/4HANA 2021) נשען על " +
      "רשומות What's New 2021 הנוקבות בכותרת בלי מזהה; הקטע של רשומת Create Maintenance Request עצמה אינו מציג סיווג 'App " +
      "New'. במהדורת SAP S/4HANA Cloud Public Edition (2608.500, loio 78732361f0b94fe1b1711632af4362b3) קטע הנושא של " +
      "F1511A פותח ב-'Create Maintenance Request - Old Version (F1511A) Manage Maintenance Notifications - New Version " +
      "(F5777)'; זו עדות לענן הציבורי בלבד ואינה ראיה כאן. לא אומתו: " +
      "תפקיד עסקי, קטלוג, שירות OData וזמינות ב-Public Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* -------------------------------------------------------- fiori:F0251A */
  {
    id: "fiori:F0251A",
    evidence: [
      F0251A_APP_TOPIC,
      {
        sourceType: "sap_help",
        sourceTitle: "Manage Material Coverage (F0251A) | What's New in SAP S/4HANA 2023",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/c106b41442594c6797aad29381a6b521.html?locale=en-US&state=PRODUCTION&version=2023.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2023 (loio c106b41442594c6797aad29381a6b521): 'The app is a successor of the app Manage " +
          "Material Coverage (F0251), providing an improved look-and-feel based on the Fiori elements framework'; 'See More App " +
          "New J44 PP-FIO-MRP SAP S/4HANA 2023'; 'Technical Details Type New'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Feature Comparison for Managing Material Coverage | Material Requirements Planning (PP-MRP)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/0fc6b5b8da9d4138a73a65a46ee01038.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "טבלת ההשוואה ב-PP-MRP לגרסת 2025 FPS01 (loio 0fc6b5b8da9d4138a73a65a46ee01038): 'App Name Monitor Stock / " +
          "Requirements List Manage Material Coverage (F0251) Manage Material Coverage (F0251A) App ID MD04 F0251 F0251A'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori חדש ב-SAP S/4HANA 2023 (What's New 2023: App New, פריט היקף J44, רכיב PP-FIO-MRP), היורש של Manage " +
        "Material Coverage (F0251), מתועד ב-PP-MRP לגרסת 2025 FPS01 תחת App ID F0251A. לפי אותו תיעוד הוא עדיין אינו מכסה " +
        "את כל ההיבטים של F0251 (ראו fiori:F0251).",
      edition: "on-premise",
      release: "2025.001",
      source: F0251A_APP_TOPIC,
      recommendedAction:
        "לבחון את F0251A לפריסות חדשות של MRP Cockpit רק לאחר בדיקה, לפי טבלת ההשוואה הרשמית, שהתכונות הנדרשות מכוסות בו. " +
        "לקרוא מספריית ה-Fiori את התפקיד העסקי, הקטלוג ושירות ה-OData לפני שיוצגו.",
    },
    xrefs: ["fiori:F0251", "fiori:F0247A", "tx:MD04"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE (המזהה עם השם בגרסה " +
      "2025.001, שתי שאילתות נעוצות לגרסה 2023.000, ושאילתת תפקידים וקטלוג שלא החזירה תפקיד או קטלוג ל-F0251A). ה-xref " +
      "ל-F0247A נשען על נושא Monitor Material Coverage - Net Segments (2025.001, loio 5ab21556d22c0033e10000000a44538d), " +
      "שממנו ניתן לנווט ל-F0251 או ל-F0251A; ה-xref ל-MD04 נשען על טבלת ההשוואה. כתובת What's New 2023 נלקחה כלשונה " +
      "מרשומת החיפוש (deliverable f5d3e1005efd4e86acf9a65abf428082). לא אומתו: תפקיד עסקי, קטלוג, שירות OData וזמינות " +
      "ב-Public Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:F5460 */
  {
    id: "fiori:F5460",
    evidence: [
      F5460_WHATS_NEW_2025_FPS01,
      {
        sourceType: "sap_help",
        sourceTitle: "Advanced Scheduling Board | What's New in SAP S/4HANA and SAP S/4HANA Cloud Private Edition 2023 FPS02",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2023.002",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/0931e75179fb4fb38e66fc45218b0ba1.html?locale=en-US&state=PRODUCTION&version=2023.002",
        accessedAt: DATE23,
        claim:
          "רשומה שכותרתה Advanced Scheduling Board ב-What's New לגרסת 2023 FPS02 (loio 0931e75179fb4fb38e66fc45218b0ba1): " +
          "'Technical Details Type New Functional Localization Not applicable Scope Item Not applicable Technical Object Name " +
          "App ID: F5460 Application Component SCM-APO-PPS-DS'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Advanced Scheduling Board | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/e296651f454c4284ade361292c633d69/10b3ef999b2245618091a7c467384129.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת 2022 (loio 10b3ef999b2245618091a7c467384129): 'Advanced Scheduling Board is a new " +
          "application which supports Production Planner in creation and Detailed Scheduling of a feasible production plan.'; " +
          "'See More App New n/a SCM-APO-PPS'. הרשומה נוקבת בכותרת ולא במזהה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Chart Selector | Production Planning and Detailed Scheduling (PP/DS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f899ce30af9044299d573ea30b533f1c/dd540abcec6c474692097a58e8ab5abb.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE23,
        claim:
          "מדריך PP/DS לגרסת 2025 FPS01 (loio dd540abcec6c474692097a58e8ab5abb): 'The Advanced Scheduling Board app has four " +
          "Gantt Charts and two Time Continuous charts which are listed below: Resource Chart Product Chart Order Chart " +
          "Operations Chart Product Stock Visualization'.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של PP/DS ב-S/4HANA: What's New 2022 מציג את Advanced Scheduling Board כיישום חדש (App New, רכיב " +
        "SCM-APO-PPS), ו-What's New 2023 FPS02 ו-2025 FPS01 נוקבים ב-App ID F5460 ברכיב SCM-APO-PPS-DS; ב-2025 FPS01 היישום " +
        "מקבל הרחבות, והוא מתועד במדריך PP/DS לגרסה זו.",
      edition: "on-premise",
      release: "2025.001",
      source: F5460_WHATS_NEW_2025_FPS01,
      recommendedAction:
        "להעריך את F5460 לתזמון מפורט במסגרת PP/DS לצד Production Scheduling Board (F2176), לפי היקף ה-PP/DS המופעל " +
        "במערכת; לא נמצאה רשומה רשמית הקובעת שאחד מהם מחליף את השני. לקרוא מספריית ה-Fiori את התפקיד העסקי, הקטלוג ושירות " +
        "ה-OData לפני שיוצגו.",
    },
    xrefs: ["fiori:F2176"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23. שיטה: scripts/sap-help-search.mjs בחמש שאילתות על SAP_S4HANA_ON-PREMISE (השם עם המזהה בגרסה " +
      "2025.001, המזהה לבדו, שאילתה נעוצה לגרסה 2022.000, ושתי שאילתות על נושאי היישום ב-PP/DS). What's New 2023 FPS03 " +
      "(loio fe0642d015544dbc8216b3af69b993a6) ו-What's New 2025 (loio 3032bd1ab4c54a9189ba6e67a2fbdaa7) נוקבים אף הם " +
      "ב-'App ID: F5460' ברשומות שכותרתן Advanced Scheduling Board. releaseInfo ברשומת הקטלוג (SAP S/4HANA 2022) נשען על " +
      "רשומת What's New 2022 הנוקבת בכותרת בלי מזהה. המודול PP נקבע לפי תחום ה-deliverable ‏Production Planning and " +
      "Detailed Scheduling (PP/DS), כמו ברשומת F2176; רכיב היישום הרשמי הוא SCM-APO-PPS-DS. ה-xref ל-F2176 הוא עזר ניווט " +
      "בין שני לוחות PP/DS ולא מיפוי רשמי. לא אומתו: תפקיד עסקי, קטלוג, שירות OData, דרישות liveCache וזמינות ב-Public " +
      "Cloud. לא בוצעה בדיקה במערכת SAP חיה.",
  },

  /* --------------------------------------------------------- fiori:W0020 */
  {
    id: "fiori:W0020",
    evidence: [
      {
        sourceType: "sap_help",
        sourceTitle: "Deprecation of Confirm Jobs | What's New in SAP S/4HANA 2022",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2022.000",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/f5d3e1005efd4e86acf9a65abf428082/af315b2ddb3e488eb3999f4ae144f0ed.html?locale=en-US&state=PRODUCTION&version=2022.000",
        accessedAt: DATE23,
        claim:
          "רשומת What's New לגרסת SAP S/4HANA 2022 (loio af315b2ddb3e488eb3999f4ae144f0ed): 'The Confirm Jobs app (W0020) is " +
          "deprecated and will be deleted from the SAP Fiori launchpad in an upcoming release.'; 'Valid as Of SAP S/4HANA 2022 " +
          "Additional Details The following successor apps are available on the SAP Fiori Launchpad: Perform Maintenance Jobs " +
          "(F5104A)'; בשורת הסיכום: 'See More App Deprecated BH1 BJ2 PM'.",
        verificationLevel: "sap_official_verified",
      },
      W0020_DELETION_2023,
    ],
    status: {
      status: "not_available",
      he:
        "אפליקציית Confirm Jobs (W0020) הוצאה משימוש ב-SAP S/4HANA 2022 ונמחקה מה-SAP Fiori launchpad ב-SAP S/4HANA 2023, " +
        "לפי רשומות What's New של SAP. רשומת המחיקה מונה כיישומים יורשים את Perform Maintenance Jobs (F5104A) ואת Report and " +
        "Repair Malfunction (F2023).",
      edition: "on-premise",
      release: "2023.000",
      source: W0020_DELETION_2023,
      successor: "fiori:F5104A",
      recommendedAction:
        "לא לתכנן תרחישים חדשים על W0020. לביצוע ולדיווח של עבודות שהוקצו לטכנאי האחזקה להפנות ל-Perform Maintenance Jobs " +
        "(F5104A) או ל-Report and Repair Malfunction (F2023). הרשומה המתוחזקת F2730 בשם Confirm Jobs אינה נתמכת במקור רשמי " +
        "(ראו fiori:F2730).",
    },
    xrefs: ["fiori:F2730", "fiori:F5104A", "fiori:F2023"],
    lastVerifiedAt: DATE23,
    notes:
      "נוסף 2026-09-23 כרשומה עצמאית למזהה הרשמי של Confirm Jobs; עד תאריך זה W0020 היה alias של fiori:F2730, והכינוי הוסר " +
      "משם. שיטה: scripts/sap-help-search.mjs בחמש שאילתות על SAP_S4HANA_ON-PREMISE, נעוצות לגרסאות 2022.000 ו-2023.000. " +
      "שירות החיפוש החזיר לאותו loio של 2022 שני מזהי deliverable בכתובת (e296651f454c4284ade361292c633d69 " +
      "ו-f5d3e1005efd4e86acf9a65abf428082); הכתובת כאן היא זו שהוחזרה עם קטע היורשים, והיא זהה לכתובת שברשומת fiori:F2730. " +
      "היורש ברשומה הוא F5104A, היישום הראשון שרשומת המחיקה מונה; F2023 מופיע ב-xrefs. עמוד ספריית ה-Fiori ‏Apps('W0020') " +
      "המוזכר ברשומת fiori:F2730 לא נפתח בסבב זה ואינו ראיה כאן. סוג היישום Transactional ברשומת הקטלוג נגזר מהפונקציה " +
      "(אישור עבודות); הקטעים אינם מציינים את טכנולוגיית הממשק. לא אומתו: תפקיד עסקי, קטלוג, שירות OData, זמינות ב-SAP ERP " +
      "ובענן הציבורי וגרסת הצגה ראשונה. לא בוצעה בדיקה במערכת SAP חיה.",
  },

];
