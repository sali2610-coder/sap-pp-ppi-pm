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
   audit/s4-enrichment/research-queue-fiori.md together with the refuted
   draft (F3289) and every open conflict. accessedAt / lastVerifiedAt carry
   the batch stamp 2026-09-02; live re-checks ran 2026-09-05 and 2026-09-07. */
import type { Evidence, VerificationRecord } from "@/lib/evidence/types";

const DATE = "2026-09-02";

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

const F3951_APP_TOPIC: Evidence = {
  sourceType: "sap_help",
  sourceTitle: "Capacity Scheduling Board | Production Planning and Control",
  product: "SAP S/4HANA",
  edition: "on-premise",
  release: "2025.001",
  url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/063ae12de0c74b01b6fd49c78e895564.html?locale=en-US&state=PRODUCTION&version=2025.001",
  accessedAt: DATE,
  claim:
    "תיעוד Production Planning and Control לגרסת 2025 FPS01 מתעד את היישום Capacity Scheduling Board: 'This app " +
    "was previously known as Monitor Work Center Schedules'; 'You can use this app to plan optimum utilization of " +
    "pacemaker work centers by matching their capacities with those of the orders that have to be dispatched'; " +
    "'Pacemaker work centers are critical as they help determine the schedule of an order'.",
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
        "היישומים הקלאסית, חיפוש רשת מוגבל לדומיינים הרשמיים), ובתוך המאגר הוא נושא שלושה שמות שונים. הכותרת Manage " +
        "Maintenance Orders שהרשומה המתוחזקת נושאת שייכת בתיעוד הרשמי של 2025 FPS01 ליישום F5241. לכן לא ניתן לקבוע " +
        "סטטוס S/4HANA ליישום 'F2731', והרשומה נשארת 'נדרש אימות נוסף' עד תיקון המזהה.",
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
    xrefs: ["tx:IW31", "tx:IW32", "tx:IW38", "fiori:F4604", "table:AUFK"],
    lastVerifiedAt: DATE,
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
      "2026-09-05.",
  },

  /* --------------------------------------------------------- fiori:F1511 */
  {
    id: "fiori:F1511",
    evidence: [
      {
        sourceType: "fiori_library",
        sourceTitle: "Request Maintenance - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F1511')/S24OP",
        accessedAt: DATE,
        claim:
          "דף הספרייה הרשמי שהוחזר עבור המזהה F1511 (כתובת Apps('F1511')) נושא את הכותרת 'Request Maintenance'. " +
          "אומתו הכותרת והכתובת בלבד; גוף הדף (תפקידים, קטלוגים, שירותי OData, גרסאות) הוא מעטפת JavaScript ולא נקרא.",
        verificationLevel: "sap_official_verified",
      },
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
        accessedAt: DATE,
        claim:
          "רשומת המאגר (trust: curated, מקור 'SAP Fiori Apps Library (curated)', נסקרה 2026-07-15) מכנה את F1511 " +
          "'Create Maintenance Request' / 'פתיחת בקשת אחזקה', עם IW21 כטרנזקציית ה-GUI, קטלוג SAP_EAM_BC_MAINT_WORKER, " +
          "תפקיד SAP_BR_MAINTENANCE_TECHNICIAN ושירות API_MAINTENANCENOTIFICATION. אותו שיוך שם-מזהה חוזר " +
          "ב-data/centers/fiori.ts, ב-data/lifecycle.ts (IW21) וב-data/tx-intel.ts (IW21, IW25). לפי המקורות הרשמיים " +
          "שלעיל השם 'Create Maintenance Request' שייך למזהה F1511A, ואילו F1511 הוא 'Request Maintenance'; פרטי " +
          "התפקיד, הקטלוג ושירות ה-OData שברשומה לא אומתו מול הספרייה ונשארים ללא אימות.",
        verificationLevel: "verification_required",
        repoRef: "data/fiori/apps.ts#F1511",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "F1511 היא אפליקציית SAP Fiori של S/4HANA המתועדת ב-Maintenance Management לגרסת 2025 FPS01 תחת השם " +
        "'Request Maintenance': בקשת עבודת תחזוקה או תיקון על אובייקט טכני, עם אריח מעקב 'Monitor Maintenance " +
        "Requests'. השם שבמאגר, 'Create Maintenance Request', הוא שמה של האפליקציה הנפרדת F1511A, שהתיעוד הרשמי " +
        "משווה אליה בעמוד ייעודי. לא נמצא רישום רשמי של הוצאה משימוש (deprecation) או החלפה עבור F1511.",
      edition: "on-premise",
      release: "2025.001",
      source: F1511_FEATURE_COMPARISON,
      recommendedAction:
        "לתקן את שם הרשומה במאגר ל-Request Maintenance (data/fiori/apps.ts, data/centers/fiori.ts, שורת IW21 " +
        "ב-lifecycle, s4Delta של IW21 ו-IW25 ב-tx-intel) ולהקים רשומה נפרדת ל-F1511A ‏'Create Maintenance Request' " +
        "לפני שמפנים אליה. בהטמעה חדשה של דיווח בקשות מהשטח להשוות את שתי האפליקציות לפי עמוד ההשוואה הרשמי; תפקיד, " +
        "קטלוג ושירות OData נלקחים מרשומת הספרייה ולא מרשומת המאגר.",
    },
    xrefs: ["tx:IW21", "table:QMEL", "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification"],
    lastVerifiedAt: DATE,
    notes:
      "מה שאומת: המזהה F1511, שמו הרשמי 'Request Maintenance' וכתובת הספרייה, מתוך כותרת רשומת הספרייה ומתוך שני " +
      "רישומי help.sap.com לגרסת 2025.001 (עמוד ההשוואה ונושא האפליקציה); רישום שלישי, 'App Implementation: Request " +
      "Maintenance' (Maintenance Management 2025.001), נושא בסניפט את קישור הספרייה appId=F1511 ואת הביטוי 'SAP " +
      "Fiori App \"Request Maintenance\"' ומתיישב עם הממצא. גופי הדפים לא נקראו (מעטפות JavaScript); כל טענה תחומה " +
      "בכותרת ובסניפט. מקורות Tier-2 במאגר מתיישבים עם הממצא הרשמי ולא עם רשומת ה-Fiori: הספר 'SAP Fiori Apps for " +
      "SAP S/4HANA' (book7) מכנה את F1511 ‏'Monitor Maintenance Requests', שהוא שם האריח השני של Request Maintenance, " +
      "ואת F1511A ‏'Create Maintenance Request'; ספר ה-PM (pm-textbook, פרק 8) מציג את המזהה F1511A לצד אריח בשם " +
      "Create Maintenance Request. F1511A אינה קיימת ב-data/fiori/apps.ts ולכן אינה ב-xrefs וגם לא נרשמה כיורשת; לא " +
      "נמצא רישום 'App Deprecated' או 'App Deleted' עבור F1511 בחיפושים שבוצעו, ושתי האפליקציות מתועדות זו לצד זו " +
      "ב-2025 FPS01, לכן הסטטוס אינו replaced. פרטי הטמעה (תפקיד עסקי, קטלוג, שירות OData, תצוגת CDS) לא אומתו מול " +
      "מקור רשמי.",
  },

  /* --------------------------------------------------------- fiori:F2730 */
  {
    id: "fiori:F2730",
    aliases: ["W0020"],
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
        "Maintenance Jobs (F5104A) כאפליקציה היורשת. המזהה F2730 שברשומת הפרויקט לא נמצא באף מקור רשמי, ולכן זהות " +
        "המזהה נותרת במחלוקת בין המאגר לבין מקורות SAP.",
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
    xrefs: ["fiori:F5104A", "tx:IW41", "tx:IW42", "table:AFRU", "fm:BAPI_ALM_CONF_CREATE"],
    lastVerifiedAt: DATE,
    notes:
      "זהות המזהה היא הפער המרכזי: שלושה מקורות רשמיים (What's New 2022, What's New 2023 וספריית ה-Fiori) קושרים את " +
      "השם Confirm Jobs למזהה W0020, ואף מקור רשמי שנמצא אינו מזכיר F2730; לכן רמת האימות של הרשומה היא 'מקורות " +
      "סותרים' ולא 'מאומת', אף שהסטטוס עצמו (נמחקה ב-2023, יורשת F5104A) נשען על סניפטים רשמיים כלשונם. פרטי role, " +
      "catalog ו-OData שברשומת המאגר לא אומתו: השירות המתועד לאישורי הזמנות תחזוקה בחוברת 'APIs for Maintenance " +
      "Management' נושא את השם הטכני API_MAINTORDERCONFIRMATION, לא API_MAINTENANCEORDERCONF, וההבדל נרשם כפער ולא " +
      "תוקן כאן. ההפניה 'Confirm Jobs (F2730)' ברשומת IW41 של tx-intel כבר סומנה כסותרת ברשומת tx:IW41. הכינוי " +
      "W0020 נוסף כדי שחיפוש לפי המזהה שבמקורות SAP יגיע לעמוד זה עד לתיקון הרשומה המתוחזקת. כתובות שני נושאי " +
      "ה-What's New נלקחו כלשונן מרשומות שירות החיפוש בריצה החיה (2022: deliverable f5d3e1005efd4e86acf9a65abf428082; " +
      "2023: deliverable f296651f454c4284ade361292c633d69).",
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
    ],
    xrefs: [
      "tx:IE01", "tx:IE02", "tx:IL01", "tx:IL02", "tx:IH08", "table:EQUI", "table:IFLOT", "table:ILOA",
      "cds:I_Equipment", "cds:I_FunctionalLocation", "fm:BAPI_EQUI_CREATE", "fm:BAPI_FUNCLOC_CREATE",
    ],
    lastVerifiedAt: DATE,
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
      "ברשומה המתוחזקת הוא החלטת מוצר.",
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
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F4072",
        accessedAt: DATE,
        claim:
          "רשומת SAP Fiori Apps Reference Library למזהה F4072 (appId=F4072) נושאת את השם Screen Maintenance Requests " +
          "(כותרת הרשומה בחיפוש מוגבל-דומיין). גוף העמוד (תפקיד עסקי, קטלוג, שירות OData) לא נקרא: העמוד נטען " +
          "כ-app shell.",
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
          "יישום ה-Fiori לתזמון תכניות אחזקה ב-Maintenance Management 2025 FPS01 מתועד תחת מזהה אחר: 'Mass Schedule " +
          "Maintenance Plans Use App ID: F2774 With this app, you can schedule all maintenance plans that are due " +
          "within a specific time frame'. המזהה F4072 אינו מופיע בקטע זה.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (data/fiori/apps.ts)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר מציגה את F4072 כ-'Schedule Maintenance Plans' (תזמון תכניות אחזקה), סוג Analytical, טרנזקציות " +
          "GUI IP10 / IP30 ושירות OData API_MAINTENANCEPLAN, ברמת trust 'curated'. אותו צימוד שם-מזהה חוזר " +
          "ב-data/centers/fiori.ts וב-s4Delta של IP01 / IP10 / IP41 ב-data/tx-intel.ts, בעוד האינדקס הפנימי " +
          "data/library/fiori-apps.json רושם F4072 = 'Screen Maintenance Requests'. השם 'Schedule Maintenance Plans' " +
          "עבור F4072 אינו נתמך באף רשומה רשמית שנמצאה.",
        verificationLevel: "conflicting_sources",
        repoRef: "data/fiori/apps.ts#F4072",
        conflictingEvidence: [F4072_SCREEN_MAINT_REQUESTS],
      },
    ],
    status: {
      status: "s4_native",
      he:
        "לפי Maintenance Management לגרסת 2025 FPS01 ולפי SAP Fiori Apps Reference Library, המזהה F4072 שייך ליישום " +
        "Screen Maintenance Requests (סינון וקבלה של בקשות אחזקה, תחום הודעות תחזוקת מפעל), ולא ליישום 'Schedule " +
        "Maintenance Plans' כפי שרשומת המאגר מציגה. היישום קיים ב-S/4HANA On-Premise; תזמון תכניות אחזקה ב-Fiori " +
        "מתועד תחת מזהה אחר (F2774 Mass Schedule Maintenance Plans).",
      edition: "on-premise",
      release: "2025.001",
      source: F4072_SCREEN_MAINT_REQUESTS,
      recommendedAction:
        "לתקן את רשומת המאגר: השם, סוג היישום, טרנזקציות ה-GUI ושירות ה-OData של F4072 צריכים להתאים ל-Screen " +
        "Maintenance Requests (בקשות אחזקה, QMEL / IW21 / IW28). את תוכן תזמון תכניות האחזקה (IP10 / IP30, " +
        "API_MAINTENANCEPLAN) להעביר לרשומה נפרדת שתאומת בנפרד; המזהה הרשמי שנמצא בחיפוש זה לתזמון תכניות אחזקה הוא " +
        "F2774, וכן Manage Maintenance Plans (F5325 בספרייה; What's New 2022 מתאר תזמון תכניות אחזקה ביישום זה), " +
        "שניהם דורשים רשומה ואימות נפרדים. עד לתיקון אין להציג את הדף הזה כחלופת Fiori ל-IP10 / IP30.",
    },
    xrefs: ["table:QMEL", "tx:IW21", "tx:IW28", "fiori:F1511", "tx:IP10", "tx:IP30"],
    lastVerifiedAt: DATE,
    notes:
      "ארבע רשומות help.sap.com עצמאיות (Maintenance Management 2025.001; What's New 2023 FPS02, 2025 ו-2025 FPS01) " +
      "ורשומת הספרייה הרשמית מסכימות: F4072 = Screen Maintenance Requests. לפי רשומת What's New in SAP S/4HANA 2021 " +
      "(Screen Maintenance Requests, סימון App New, SAP S/4HANA 2021) היישום הופיע לראשונה בגרסת 2021; המידע מהקטע " +
      "בלבד. הסתירה היא בין המאגר לתיעוד הרשמי, ולכן הפתרון הוא תיקון רשומת המאגר; לאחר התיקון ניתן להסיר את סימון " +
      "הסתירה ולהעלות את הרשומה ל-sap_official_verified. בספריית Fiori נמצאה רשומה בשם 'Schedule Maintenance Plan' " +
      "תחת appId=IP10 (קוד הטרנזקציה) ורשומה 'Maintenance Plan Scheduling Overview' תחת W0192; לא נמצא מזהה F ליישום " +
      "PM בשם 'Schedule Maintenance Plans'. ב-deliverable Service (2025.001) מתועד יישום 'Schedule Maintenance Plan - " +
      "Service' ללא מזהה בקטע. ב-SAP S/4HANA Cloud Public Edition 2608 עמוד F4072 נושא את הכותרת 'Screen Maintenance " +
      "Requests (Old Version)', והקטע שנחזר בחיפוש ממליץ על Manage Maintenance Notifications (F5777) ומציין ששני " +
      "היישומים מתקיימים במקביל; זו עדות לענן הציבורי בלבד. בחיפוש On-Premise 2025.001 לא נמצאה רשומה ל-F5777, ולכן " +
      "לא נרשם successor. תפקיד, קטלוג ושירות OData של F4072 לא נקראו (app shell). המזהה של Create Maintenance " +
      "Request בקטעים הרשמיים הוא F1511A בעוד המאגר מחזיק F1511; נושא לרשומת fiori:F1511. ה-xrefs ל-IP10 / IP30 " +
      "נשמרו כדי שהתיקון יהיה נגיש מדפי הטרנזקציות שמפנות היום ל-F4072.",
  },

  /* --------------------------------------------------------- fiori:F2336 */
  {
    id: "fiori:F2336",
    evidence: [
      {
        sourceType: "fiori_library",
        sourceTitle: "Manage Production Orders - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F2336",
        accessedAt: DATE,
        claim:
          "ספריית SAP Fiori Apps Reference Library (הספרייה הקלאסית) רושמת את המזהה F2336 תחת השם 'Manage Production " +
          "Orders': כותרת הרשומה שהוחזרה מחיפוש מוגבל-דומיין היא 'Manage Production Orders - SAP Fiori Apps Reference " +
          "Library' וכתובת ה-URL נושאת appId=F2336. הכתובת נפתחת (HTTP 200), אך נקודת הקצה מחזירה 200 לכל appId ולכן " +
          "אין בכך ראיה; זיהוי המזהה והשם נשען על כותרת רשומת החיפוש ועל סניפטי help.sap.com. גוף העמוד הוא מעטפת " +
          "JavaScript ולא נקרא, ולכן תפקיד, קטלוג ושירות OData אינם נלקחים מכאן.",
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
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS) ומרכז ה-Fiori",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הרשומה המתוחזקת (curated) מזהה את F2336 כ-Manage Production Orders (מודול PP, Transactional) עם guiTx " +
          "CO01/CO02/COOIS, טבלאות AUFK/AFKO/AFPO ו-similar אל Manage Process Orders (F3577), בהתאמה למקורות הרשמיים " +
          "לעיל. שני שדות אינם תואמים אותם: התפקיד SAP_BR_PRODN_OPERATOR_DISC סותר את תיאור התפקיד בעמוד הרשמי " +
          "('Production Supervisor - Discrete Manufacturing'), ושירות ה-OData הרשום API_PRODUCTION_ORDER_2 אינו השירות " +
          "שהסניפט הרשמי מציב לצד האפליקציה (PP_MPE_ORDER_MANAGE). הקטלוג SAP_PP_BC_PRODN_ORDER ותצוגת ה-CDS " +
          "I_ProductionOrder נשארים ברמת המאגר בלבד.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F2336 (+data/centers/fiori.ts#manage-production-orders)",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית SAP Fiori (Transactional) לניהול הזמנות ייצור בייצור בדיד, מודול PP. מתועדת כאפליקציה פעילה בתיעוד " +
        "Production Orders (PP-SFC) לגרסת S/4HANA On-Premise 2025 FPS01, מקבלת שיפורים ברשומת What's New 2025 FPS01, " +
        "ומושווית רשמית ל-COOIS ול-COHV. לפי רשומת המאגר, המקבילות ב-ECC הן מסכי CO01/CO02 ב-SAP GUI.",
      edition: "on-premise",
      release: "2025.001",
      source: F2336_APP_TOPIC,
      recommendedAction:
        "לצטט את עמוד האפליקציה הרשמי (Production Orders (PP-SFC), 2025 FPS01) ואת רשומת הספרייה (appId=F2336). לפני " +
        "הצגת תפקיד עסקי בממשק: לתקן את שדה role ברשומת data/fiori/apps.ts לתיאור הרשמי 'Production Supervisor - " +
        "Discrete Manufacturing' (השם הטכני של תבנית התפקיד דורש אימות מול הספרייה), ולסמן את API_PRODUCTION_ORDER_2 " +
        "כ-API אינטגרציה משוחרר ולא כשירות ה-UI של האפליקציה. להציג את האפליקציה כחלופת Fiori לתרחישי המעקב והעיבוד " +
        "ההמוני שהיא מושווית אליהם (COOIS, COHV) ולפעולות העריכה והשחרור שספר ה-Fiori Quick Reference (Tier 2) מתאר " +
        "עבורה, ולא כתחליף מלא לכל טרנזקציות PP-SFC.",
    },
    xrefs: [
      "tx:CO01", "tx:CO02", "tx:CO03", "tx:COOIS", "tx:COHV", "table:AUFK", "table:AFKO", "table:AFPO",
      "cds:I_ProductionOrder", "fiori:F3577",
    ],
    lastVerifiedAt: DATE,
    notes:
      "המזהה, השם וכתובת הספרייה מאומתים מול שלושה סניפטים רשמיים של 2025 FPS01 (PLM, השוואת ה-PEO, ועמוד Data " +
      "Migration 'PP - Production order (only open PO)' הנוקב ב-'Display Production Order (CO03) Manage Production " +
      "Orders (F2336)') ומול כותרת רשומת הספרייה. גוף עמודי help.sap.com והספרייה לא נקרא (מעטפות JavaScript), ולכן " +
      "קטלוג עסקי, תבנית תפקיד טכנית (SAP_BR_...), שירות ה-OData של האפליקציה ותצוגת ה-CDS שלה נשארים ברמת המאגר. " +
      "עמוד Schedule Order Release Runs (2025.001) מציג את השם הטכני SAP_BR_PRODN_SUPERVISOR_DISC לתיאור 'Production " +
      "Supervisor: Discrete Manufacturing', אך לא בהקשר F2336, ולכן לא נרשם כאן כעובדה. שדה ה-odata ברשומה " +
      "(API_PRODUCTION_ORDER_2) תואם בשמו ל-API המשוחרר API_PRODUCTION_ORDER_2_SRV (What's New 2020: 'This OData API " +
      "replaces the API Production Order (API_PRODUCTION_ORDERS)'), אך אף סניפט רשמי אינו קושר אותו לאפליקציה. יש " +
      "להבחין מהאפליקציה 'Manage Production Orders or Process Orders' (PP-MRP, מתכנן ה-MRP), שהיא אפליקציה אחרת עם " +
      "עמוד App Implementation נפרד, ולא לצטט אותו עבור F2336. מזהה פריט ההיקף BJ5 ורכיבי היישום PP-SFC-EXE / " +
      "PP-FIO-SFC לקוחים מסניפטים של What's New בלבד. ספר ה-Fiori Quick Reference (Tier 2, data/library/book7/ch5) " +
      "מתאר את האפליקציה כמיועדת ל-production supervisors עם AOR, בהתאמה לתיאור הרשמי.",
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
    xrefs: [
      "tx:COR1", "tx:COR2", "tx:COR3", "tx:COID", "tx:COOISPI", "tx:COHVPI", "table:AUFK", "table:AFKO",
      "table:AFPO", "table:AFVC", "fm:BAPI_PROCORD_CREATE", "fiori:F3364",
    ],
    lastVerifiedAt: DATE,
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
      "הקטלוג (SAP_PP_BC_PROCESS_ORDER) ושירות ה-OData (API_PROCESSORDER_2) שברשומת המאגר לא אומתו מול מקור רשמי; " +
      "רשומות ה-Help מתעדות את API_PROCESS_ORDERS ואת API_PROCESS_ORDER_2_SRV כשירותי ה-OData של הזמנת תהליך, ושם " +
      "השירות ברשומת המאגר אינו תואם לאף אחד מהם. F4587 ו-F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם ב-xrefs. " +
      "accessedAt = 2026-09-02 לפי תאריך האצווה; צמדי loio/versionId אומתו מחדש בריצה חיה.",
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
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS), רשומת F3364 (סותרת את המקורות הרשמיים)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "רשומת המאגר מקצה את המזהה F3364 לאפליקציה Confirm Process Order (PP-PI, Transactional, guiTx COR6N, OData " +
          "'API_PROCORDCONF', תפקיד SAP_BR_PRODN_OPERATOR_PROC, קטלוג SAP_PP_BC_PROCESS_ORDER), בסימון trust 'curated' " +
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
        "רשמי, אך תחת מזהה אחר.",
      edition: "on-premise",
      release: null,
      source: null,
      recommendedAction:
        "לא להציג את F3364 כמזהה ה-Fiori של Confirm Process Order. לתקן את רשומת המאגר (data/fiori/apps.ts, " +
        "data/centers/fiori.ts ושדות s4Delta של COR6N/COR6/CORK ב-data/tx-intel.ts) לאחת משתי החלופות המתועדות: " +
        "האפליקציה 'Confirm Process Order' עם App ID: CORK (אישור ברמת הזמנה), או פעולת 'Confirm Process Order " +
        "Operation' באפליקציות F4587/F5323 (On-Premise 2025 FPS01). לפני כל תיקון לאמת את המזהה הסופי, את התפקיד, " +
        "הקטלוג ושירות ה-OData מול SAP Fiori Apps Reference Library (fal.cloud.sap) בכניסה מדפדפן, ולעדכן xrefs רק " +
        "למזהים הקיימים בדאטהסט (F4587/F5323 אינם ב-data/fiori/apps.ts).",
    },
    xrefs: ["tx:COR6N", "tx:CORK", "table:AFRU", "table:RESB", "fm:BAPI_PROCORDCONF_CREATE_TT", "fiori:F3577", "fiori:F1576"],
    lastVerifiedAt: DATE,
    notes:
      "מה שאומת: השם 'Confirm Process Order' הוא שם אפליקציה רשמי, אך תחת App ID: CORK (Help של הענן הציבורי " +
      "2608.500 + רשומה קלאסית בספריית Fiori), ובמהדורת On-Premise 2025 FPS01 הנתיב המתועד לאישור פעולה הוא 'Confirm " +
      "Process Order Operation (COR6N)' בתוך F4587/F5323. מה שלא נמצא: אף מקור רשמי הנוקב ב-F3364 (שלושה חיפושי Help " +
      "ממוקדים ב-On-Premise, שניים ב-Public Cloud, ושני חיפושי דומיין בספרייה); חיפוש Help ייעודי ל-'F3364' החזיר " +
      "רק אפליקציות אחרות (F3464, F3384, F3346, F3664, F8364) ואת אינפוטייפ 3364. לכן נכתב סטטוס 'נדרש אימות נוסף' " +
      "ורמת הרשומה משקפת מקורות סותרים: מזהה המאגר מול המזהה הרשמי לאותו שם. רשומת Help נוספת של הענן הציבורי ('App " +
      "Extensibility in Production Operations', 2608.500, loio fad095a8b7314eefa7a8ebccb568ce90) מסווגת את 'Confirm " +
      "Process Order (CORK)' כ-SAP GUI Application; לא נכללה כראיה נפרדת. שירות ה-OData 'API_PROCORDCONF' שברשומת " +
      "המאגר לא נמצא במקור רשמי; רשומת What's New 2023 FPS03 (loio fe27113cd73e4219ac8dd23a4db1ef16) נוקבת בשם 'OData " +
      "API: Process Order Confirmation (API_PROC_ORDER_CONFIRMATION_2_SRV)', ותיעוד APIs for Manufacturing 2025.001 " +
      "מציג את הנתיב /sap/opu/odata/SAP/API_PROC_ORDER_CONFIRMATION_2_SRV. תפקיד וקטלוג (SAP_BR_PRODN_OPERATOR_PROC, " +
      "SAP_PP_BC_PROCESS_ORDER) נשארים Tier-2 ללא אימות. F4587/F5323 אינם קיימים ב-data/fiori/apps.ts ולכן אינם " +
      "ב-xrefs ולא נכתב successor. ספריית fal.cloud.sap והרשומה הקלאסית לא נפתחו כדפים (יישומי JS); בדיקת מערכת חיה " +
      "לא הייתה זמינה (ה-MCP sc4sap לא התחבר).",
  },

  /* --------------------------------------------------------- fiori:F1576 */
  {
    id: "fiori:F1576",
    aliases: ["F2462"],
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
        accessedAt: DATE,
        claim:
          "רשומת המאגר (trust: curated, מקור 'SAP Fiori Apps Library (curated)') רושמת את Manage Batches במזהה F1576, " +
          "עם קטלוג SAP_LO_BC_BATCH, תפקיד SAP_BR_WAREHOUSE_CLERK, שירות OData בשם API_BATCH, תצוגת CDS‏ I_Batch " +
          "וטרנזקציות MSC1N/MSC2N/MSC3N. המזהה F1576 סותר את המזהה F2462 שבתיעוד SAP Help ובכתובת ספריית ה-Fiori, ולא " +
          "נמצא באף רשומה רשמית; אותו מזהה משוכפל ב-data/centers/fiori.ts, ב-data/solutions.ts ובשדות s4Delta של " +
          "MSC1N ו-MSC3N ב-data/tx-intel.ts.",
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
    ],
    xrefs: [
      "tx:MSC1N", "tx:MSC2N", "tx:MSC3N", "table:MCH1", "table:MCHA", "cds:I_Batch",
      "fm:BAPI_BATCH_CREATE", "fm:BAPI_BATCH_GET_DETAIL",
    ],
    lastVerifiedAt: DATE,
    notes:
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
      "משטחים אלה לא טופלו במסגרת רשומה זו.",
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
        "Purchasing Document', קבלת סחורה בהתייחסות למסמכי רכש. השם 'Post Goods Movement' שהמאגר מצמיד למזהה זה שייך " +
        "ליישום אחר, שמזההו בתיעוד ובספריית ה-Fiori הוא MIGO‏ (Web GUI app).",
      edition: "on-premise",
      release: "2025.001",
      source: F0843_PGR_TOPIC,
      recommendedAction:
        "לתקן את רשומת הקטלוג: F0843 = Post Goods Receipt for Purchasing Document (קבלת סחורה למסמך רכש), ואת Post " +
        "Goods Movement להציג תחת המזהה MIGO‏ (Web GUI app; אינו מזהה מסוג F ולכן אינו ניתן לייצוג כרשומת fiori: " +
        "בסכימה הנוכחית). עד לתיקון אין להסתמך על ההצמדה 'Post Goods Movement (F0843)' במסכי ה-Fiori, בשכבת מחזור " +
        "החיים (MIGO, MB1A, MB1C) ובקטלוג הפתרונות.",
    },
    xrefs: [
      "tx:MIGO", "tx:MB01", "tx:MB31", "tx:MB1A", "tx:MB1C", "table:MSEG", "table:MKPF", "fm:BAPI_GOODSMVT_CREATE",
      "cds:I_MaterialDocumentItem", "obj:material-document", "enh:badi:MB_MIGO_BADI", "enh:exit:MBCF0002",
    ],
    lastVerifiedAt: DATE,
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
      "של הקטלוג (שתי ראיות מאגר ברמת נדרש אימות נוסף) שנכתבה ב-2026-09-01.",
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
        sourceType: "repository",
        sourceTitle: "רשומת ה-Fiori המתוחזקת של הפרויקט (FIORI_APPS)",
        product: "SAP S/4HANA",
        edition: "on-premise",
        accessedAt: DATE,
        claim:
          "הרשומה המתוחזקת (trust: curated) נושאת את המזהה F4604 בשם Manage Maintenance Notifications and Orders, " +
          "מודול PM, סוג Transactional, טרנזקציות GUI מקבילות IW28 ו-IW38 וטבלאות QMEL, AUFK, AFIH. פרטי התפקיד " +
          "SAP_BR_MAINTENANCE_PLANNER, הקטלוג SAP_EAM_BC_MAINT_PLANNER ושירות ה-OData‏ API_MaintenanceOrder מקורם " +
          "ברשומה בלבד ולא אותרו בסניפטים הרשמיים שנבדקו.",
        verificationLevel: "repository_verified",
        repoRef: "data/fiori/apps.ts#F4604",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית SAP Fiori לניהול הודעות ופקודות תחזוקת מפעל המעובדות לפי שלבים (phase-based). בתיעוד Maintenance " +
        "Management של SAP S/4HANA On-Premise 2025 FPS01 (2025.001) היא מתועדת כאפליקציה פעילה, וב-What's New in SAP " +
        "S/4HANA 2021 היא רשומה כ-Type: New (‏Scope Items 4HH/4HI, רכיב PM, Version: SAP S/4HANA 2021). לפי העמוד " +
        "הרשמי, הודעות ופקודות שמודל השלבים אינו מופעל עבורן אינן זמינות באפליקציה.",
      edition: "on-premise",
      release: "2025.001",
      source: F4604_APP_TOPIC,
      recommendedAction:
        "להגדיר את F4604 כמסך העבודה של מתכנן התחזוקה רק לאחר הפעלת מודל השלבים בקסטומיזציה לסוגי ההודעה והפקודה " +
        "הרלוונטיים; רשומות שאינן phase-based אינן מוצגות בה, ולכן נשארות ב-IW28/IW38 או באפליקציות Find. לפני הקצאת " +
        "הרשאות יש לאמת תפקיד עסקי, קטלוג ושירות OData מול ספריית ה-Fiori או מערכת חיה, כי פרטים אלה אינם נתמכים " +
        "בסניפטים הרשמיים שנבדקו.",
    },
    xrefs: [
      "tx:IW28", "tx:IW38", "tx:IW34", "tx:IW31", "table:QMEL", "table:AUFK", "table:AFIH",
      "fm:BAPI_ALM_ORDER_MAINTAIN", "fiori:F5104A",
    ],
    lastVerifiedAt: DATE,
    notes:
      "שיטה: scripts/sap-help-search.mjs בארבע שאילתות על SAP_S4HANA_ON-PREMISE (השם באנגלית, המזהה F4604, " +
      "'phase-based', ושאילתה נעוצה לגרסת 2021.000) ושאילתה אחת על SAP_S4HANA_CLOUD, וכן חיפוש רשת מוגבל-דומיין. " +
      "המזהה F4604 והשם מופיעים יחד בסניפטים רשמיים (2023.002, 2025.001), ולכן השם הקטוע 'Orders' שבאינדקס הדק " +
      "(data/library/fiori-apps.json) הוא פגם באינדקס ולא סתירה מול SAP. כתובת ספריית ה-Fiori ‏(appId=F4604) הוחזרה " +
      "בחיפוש תחת שם האפליקציה, אך גוף העמוד הוא יישום JS ולא נקרא, ולכן אינה רשומה כראיה. תיעוד Public Cloud " +
      "(2608.500) מציג אף הוא 'App ID: F4604' לאותו שם; הרשומה נשמרת במהדורת On-Premise. הסניפטים הרשמיים מצמידים " +
      "לאפליקציה את Manage Maintenance Orders ‏(F5241), Find Maintenance Orders ‏(F2175) ו-Find Maintenance Orders and " +
      "Operations ‏(F2173); שלושתן אינן קיימות ב-data/fiori/apps.ts ולכן אינן ב-xrefs (סתירת F2731 מול F5241 פתוחה " +
      "בתור ה-Fiori). יכולת ההמלצות מבוססות ה-AI מוצהרת בסניפט 2025.001 עבור SAP S/4HANA Cloud Private Edition בלבד " +
      "ואינה נטענת כאן למהדורת On-Premise. ה-BAdI‏ EAM_CROSS_APP_NAV_CONTROL נזכר רשמית (2023.002) עבור F2175 ו-F4604 " +
      "אך אינו קיים ב-data/exits.ts. אפליקציית שלב הסינון Screen Maintenance Requests אינה ב-xrefs: התיעוד הרשמי " +
      "(Maintenance Management 2025.001) מזהה אותה כ-F4072, בעוד הרשומה המתוחזקת data/fiori/apps.ts#F4072 נושאת את " +
      "השם Schedule Maintenance Plans; הסתירה נרשמה לתור ה-Fiori. ‏accessedAt לפי תאריך מחזור האיסוף (2026-09-02).",
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
    ],
    status: {
      status: "changed",
      he:
        "היישום Manage Material Coverage (F0251) זמין ומתועד ב-SAP S/4HANA 2025 FPS01 במהדורת On-Premise, בתוך קטלוג " +
        "MRP Cockpit‏ (SAP_SCM_BC_MRPCOCKPIT). מאז S/4HANA 2023 קיים לו יורש, Manage Material Coverage (F0251A), " +
        "שהתיעוד מציג כחלופה שניתן להשתמש בה, ובמקביל SAP קובעת ש-F0251 'will remain available until further notice'. " +
        "היישום אינו חדש ב-S/4HANA: הוא מתועד כבר ב-SAP Fiori 1.0 for SAP ERP (2017), ולכן הסטטוס הנגזר במאגר (חדש " +
        "ב-S/4HANA) מפריז. בחיפושים שבוצעו לא נמצאה הצהרת הוצאה משימוש (deprecation) או פריט פישוט ל-F0251 עצמו; " +
        "רשומות ההוצאה משימוש שנמצאו ב-PP-MRP נוגעות ליישומי Monitor (F2101).",
      edition: "on-premise",
      release: "2025.001",
      source: F0251_APP_TOPIC,
      recommendedAction:
        "להמשיך להשתמש ב-F0251 בסביבות On-Premise שבהן הוא כבר פרוס, ולבחון את F0251A (Fiori elements) לפריסות חדשות " +
        "רק לאחר בדיקה שהתכונות הנדרשות מכוסות בו. לא לסמן את F0251 כהוצא משימוש ללא רשומת What's New או פריט פישוט " +
        "שקובעים זאת. במאגר: להוסיף רשומה ל-F0251A ב-data/fiori/apps.ts כדי שניתן יהיה להצביע עליו כיורש; לנרמל את " +
        "שם שירות ה-OData ב-data/fiori/apps.ts#F0251 ל-PP_MRP_COCKPIT_SRV לפי דף App Implementation; ולתקן בחוברת " +
        "המקור (xlsx) את שורות CO24 ו-MD04 בגיליון 'מדריך טרנזקציות ודוחות ייצור' המכנות את F0251 'Monitor Material " +
        "Coverage - Net Segments', בעוד שהמזהה הרשמי של יישום ה-Monitor הוא F0247A.",
    },
    xrefs: ["fiori:F0247A", "tx:MD04", "tx:MD07", "tx:MD01N"],
    lastVerifiedAt: DATE,
    notes:
      "גוף דפי ה-Help לא נקרא (מעטפת JavaScript); כל טענה תחומה לכותרת ולתקציר של רשומת החיפוש הרשמית (loio " +
      "09cd1556d22c0033e10000000a44538d, c106b41442594c6797aad29381a6b521, d5e491523e65c04ae10000000a44176d, " +
      "80577252a187846ae10000000a423f68). דף App Implementation: Manage Material Coverage ‏" +
      "(https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/fe39e10a9a864a8f8dc9537704f0fa13/97e51a560e030033e10000000a44538d.html?locale=en-US&state=PRODUCTION&version=2025.001) " +
      "מונה בתקצירו את appId=F0251, את שירות ה-OData‏ PP_MRP_COCKPIT_SRV (1), את קטלוג הדוגמה SAP_SCM_BC_MRPCOCKPIT " +
      "ואת הדרישה להרשאות Back-End (התקציר נקטע אחרי required for changing; פירוט האובייקטים לא נקרא); " +
      "data/fiori/apps.ts#F0251 כותב PP_MRP_COCKPIT ללא הסיומת _SRV. רשומות רשמיות נוספות שנמצאו ולא נכנסו לרשימת " +
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
      "מכנה את F0251 'Monitor Material Coverage - Net Segments'.",
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
    ],
    status: {
      status: "s4_native",
      he:
        "אפליקציית SAP Fiori של MRP Cockpit, מתועדת במדריך Material Requirements Planning (PP-MRP) של SAP S/4HANA 2025 " +
        "FPS01 במהדורת On-Premise ומשויכת לקטלוג העסקי SAP_SCM_BC_MRPCOCKPIT. המזהה F0247A מאושר לצד השם ברשומת " +
        "What's New לגרסת 2025, בטבלת ההשוואה של PP-MRP 2025.001 ובעמוד האפליקציה של המהדורה הציבורית (App ID: " +
        "F0247A). לפי What's New 2021, אפליקציית 'Net Segments' הקודמת סומנה Obsolete והוסרה מה-launchpad, והיורשות " +
        "מבוססות SAP Fiori elements; רשומה זו מתייחסת ליורשת F0247A בלבד. המקבילות ב-SAP GUI לפי טבלת ההשוואה " +
        "הרשמית של PP-MRP: MD06 ו-MD07; במאגר גם MD04.",
      edition: "on-premise",
      release: "2025.001",
      source: F0247A_APP_TOPIC,
      recommendedAction:
        "להשתמש במזהה F0247A ובשם 'Monitor Material Coverage - Net Segments' בכל רישום של אפליקציית הניטור של MRP " +
        "Cockpit, וליישר את ההפניות ל-F0247 ברובד המתוחזק (data/centers/fiori.ts, data/lifecycle.ts, " +
        "data/solutions.ts) למזהה F0247A, תוך ציון שעמוד App Extensibility במדריך PP-MRP 2025.001 עדיין נוקב ב-F0247 " +
        "ושאין סניפט רשמי המצמיד את שני המזהים. שורות ה-blueprint ב-data/sapData.pppi.ts המצמידות את שם הניטור למזהה " +
        "F0251 (רשמית: Manage Material Coverage) נרשמות כסתירה בתור המחקר; הדאטהסט נוצר מהחוברות ואינו נערך ידנית. " +
        "לצטט את עמוד PP-MRP 2025.001 לתפקוד ולקטלוג; תפקיד, OData ו-CDS לא אומתו מול מקור רשמי ונשארים ברובד המאגר.",
    },
    xrefs: ["tx:MD04", "tx:MD06", "tx:MD07", "fiori:F0251"],
    lastVerifiedAt: DATE,
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
      "משתמשים ב-F0247. ל-MD01N אין הפניה ב-xrefs כי הסניפטים מדברים על 'MRP run' בלי לנקוב בטרנזקציה.",
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
        accessedAt: DATE,
        claim:
          "רשומת ה-What's New לגרסת 2023 FPS02 מאשרת את מזהה היישום בפרטים הטכניים: 'Technical Object Name App ID: " +
          "F3951', 'Scope Item 3LQ (Production Capacity Leveling)', 'Type Changed' (הרשומה מתארת שינוי ביישום קיים); " +
          "התוכן העסקי המצוין: 'the legend for orders are now changed to a blue palette'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "sap_help",
        sourceTitle: "Capacity Planning | Production Planning and Control",
        product: "SAP S/4HANA",
        edition: "on-premise",
        release: "2025.001",
        url: "https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/21aead0c98bd4755abdacd91c99e3393/96592cfe7187429c9a69fda4e6976c50.html?locale=en-US&state=PRODUCTION&version=2025.001",
        accessedAt: DATE,
        claim:
          "עמוד Capacity Planning לגרסת 2025 FPS01 מונה דרישת קדם: 'Install SAP liveCache (which is the HANA component " +
          "SAP LCA (also called LCAPPS- or liveCache Applications plugin) for Capacity Scheduling Table and Capacity " +
          "Scheduling Board apps', וכן 'Set the work center capacity to finite scheduling to get the capacity " +
          "requirements of the orders'; היישום מתואר כ-'Gives you an overview of the operations performed at your work " +
          "centers and a visual representation of the schedules over a time period'.",
        verificationLevel: "sap_official_verified",
      },
      {
        sourceType: "fiori_library",
        sourceTitle: "Capacity Scheduling Board - SAP Fiori Apps Reference Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/#/detail/Apps('F3951')/S22OP",
        accessedAt: DATE,
        claim:
          "SAP Fiori Apps Reference Library מפרסמת רשומה בשם Capacity Scheduling Board שכתובתה נושאת את המזהה " +
          "Apps('F3951'). גוף הדף הוא מעטפת JavaScript ולא נקרא: תפקיד עסקי, קטלוג טכני ושירותי OData של היישום לא " +
          "אומתו מול הספרייה.",
        verificationLevel: "sap_official_verified",
      },
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של S/4HANA לתזמון קיבולת גרפי במרכזי עבודה קובעי קצב (pacemaker), מתועד בגרסת 2025 FPS01 תחת " +
        "Production Planning and Control; לשעבר Monitor Work Center Schedules. מזהה היישום F3951 ופריט ההיקף 3LQ " +
        "(Production Capacity Leveling) מופיעים ברשומת ה-What's New לגרסת 2023 FPS02.",
      edition: "on-premise",
      release: "2025.001",
      source: F3951_APP_TOPIC,
      recommendedAction:
        "להעדיף את היישום לתזמון גרפי (Gantt) של פעולות במרכזי עבודה קובעי קצב כחלופה הגרפית ל-CM21/CM25 בתרחישים " +
        "חדשים (שיוך זה נשען על רשומות המאגר; אין הכרזת החלפה רשמית); לפני ההפעלה לוודא התקנת SAP liveCache (SAP LCA " +
        "/ LCAPPS) והגדרת קיבולת סופית (finite scheduling) במרכזי העבודה, ולאמת במערכת את התפקיד והקטלוג שהוקצו " +
        "למשתמשים.",
    },
    xrefs: [
      "tx:CM21", "tx:CM25", "tx:CM01", "table:CRHD", "table:KAKO", "table:AFVC", "fiori:F3289",
      "cds:I_WorkCenterCapacity",
    ],
    lastVerifiedAt: DATE,
    notes:
      "המזהה F3951, שם היישום וכתובת הספרייה הרשמית אומתו מול help.sap.com ומול SAP Fiori Apps Reference Library. " +
      "רכיב היישום PP-CFS-SCH (Capacity Scheduling) מופיע ברשומות What's New 2022 (loio " +
      "ff48005f013e4ddf900a56dcd0092d2b) ו-2023 FPS03 (loio 5725869ed3af4b029cf6335154ed07f1); שינוי השם מ-Monitor " +
      "Work Center Schedules מתועד ב-What's New 2021 (loio da7f859ccb984e7ba8d79076d390c6e4); תמיכה בתעשייה תהליכית " +
      "(Process industry) נוספה לפי What's New 2020 (loio 04954c60c551476881c9eaf28161729b), נקודה רלוונטית ל-PP-PI. " +
      "היישום מתועד גם ב-SAP S/4HANA Cloud Public Edition (What's New 2508, loio b3dfa98f72334a8985c185bd1e5740d6, " +
      "ו-2608, loio d8c4a7f6d57a4f9bb62041bc8473cae4). לא אומתו במקור רשמי: התפקיד SAP_BR_PRODN_PLNR, הקטלוג " +
      "SAP_SCM_BC_CFS ושירות ה-OData/CDS שברשומת המאגר (data/fiori/apps.ts#F3951); סעיף F3951 בספר 7 " +
      "(data/library/book7/ch5.sections.json) אינו נוקב בתפקיד, ומשפט SAP_BR_PRODN_PLNR שבחילוץ שייך ליישום הקודם " +
      "F6798 Capacity Evaluation. סתירה במאגר: data/lifecycle.ts#CM21, data/transactions.ts (CM01), " +
      "data/pppi-master-data-facets.ts ו-data/academy/lessons/pp-generated.ts מתייגים את היישום כ-'(PP-DS)', " +
      "ו-data/domain-detail.ts (תחום הקיבולת של PP-PI) מפנה ל-'PP-DS Planning Board' / 'PP-DS Scheduling Board' בלי " +
      "לנקוב בשם היישום; המקורות הרשמיים משייכים אותו לרכיב PP-CFS ולפריט ההיקף 3LQ, לא ל-PP/DS (שם הלוח שם הוא " +
      "Advanced Scheduling Board / DS Planning Board). אף מקור רשמי שנראה אינו מכריז על CM21/CM25 כמוחלפות על ידי " +
      "היישום; ההצגה כחלופת Fiori ל-CM21/CM25 נשענת על רשומות המאגר בלבד.",
  },

  /* --------------------------------------------------------- fiori:F2176 */
  {
    id: "fiori:F2176",
    evidence: [
      {
        sourceType: "fiori_library",
        sourceTitle: "Production Scheduling Board - Fiori Apps Library",
        product: "SAP S/4HANA",
        edition: "on-premise",
        url: "https://fioriappslibrary.hana.ondemand.com/sap/fix/externalViewer/?appId=F2176",
        accessedAt: DATE,
        claim:
          "ספריית SAP Fiori Apps Reference Library הרשמית רושמת את מזהה היישום F2176 תחת השם 'Production Scheduling " +
          "Board' (כותרת העמוד כפי שהוחזרה בחיפוש מוגבל-דומיין). גוף העמוד (תפקיד עסקי, קטלוג, שירות OData, זמינות " +
          "לפי מהדורה) הוא מעטפת JavaScript ולא נקרא; המזהה והשם בלבד מאומתים כאן.",
        verificationLevel: "sap_official_verified",
      },
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
    ],
    status: {
      status: "s4_native",
      he:
        "יישום Fiori של PP/DS ב-S/4HANA: מדריך PP/DS לגרסת 2025 FPS01 מתעד אותו כיישום לתכנון ואופטימיזציה של לוח " +
        "המשאבים ושל תאריכי ושעות ההזמנות (order dates and times, כלשון המקור) תוך התחשבות בזמינות משאבים ורכיבים, " +
        "והוא רשום כפריט What's New של SAP S/4HANA 1610 תחת Fiori Apps in PP/DS. יישום Fiori זה לא היה קיים ב-ECC; " +
        "לפי נתוני הפרויקט (data/fiori/apps.ts#F2176) המקבילה הקלאסית היא לוח התזמון המפורט (DS Board) של APO.",
      edition: "on-premise",
      release: "2025.001",
      source: F2176_APP_TOPIC,
      recommendedAction:
        "לתכנון מפורט (finite) של קווי המילוי והריאקטורים ב-CBC: להעריך את היישום מול Capacity Scheduling Board " +
        "(F3951) בהתאם להיקף ה-PP/DS שמופעל במערכת. לפני הקצאה למשתמשים לאמת בסביבת S/4HANA את הפעלת PP/DS, את " +
        "התפקיד העסקי, הקטלוג ושירות ה-OData, שלא אומתו מול הספרייה הרשמית.",
    },
    xrefs: ["fiori:F3951", "tx:CM21", "tx:CO03", "table:AFKO", "table:AFVC", "table:CRHD"],
    lastVerifiedAt: DATE,
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
      "מנסח את שכבת ה-OData/CDS כפריט עתידי במקום כ'לא אומת'; כדאי לתקן את הניסוח.",
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
    xrefs: [
      "tx:IW41", "tx:IW42", "tx:IW44", "tx:IW48", "tx:IK11", "tx:IK34", "table:AFRU", "table:AUFK",
      "fm:BAPI_ALM_CONF_CREATE", "fm:BAPI_ALM_ORDER_MAINTAIN", "fiori:F2730", "fiori:F4604",
    ],
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
      "2026-09-02 לפי הוראת האיסוף; ריצות החיפוש של 2026-09-07 החזירו את אותן רשומות (loio זהה).",
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
    xrefs: [
      "tx:IW21", "tx:IW24", "tx:IW26", "tx:IW41", "table:QMEL", "table:AUFK", "table:AFIH", "table:AFRU",
      "fm:BAPI_ALM_NOTIF_CREATE", "cds:I_MaintenanceNotification", "fiori:F5104A", "fiori:F1511",
      "enh:badi:NOTIF_EVENT_SAVE",
    ],
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
      "ולכן לא נטענו.",
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
    xrefs: [
      "tx:IW28", "tx:IW29", "tx:IW38", "tx:IW39", "table:QMEL", "table:AUFK", "table:EBAN", "cds:I_MaintenanceOrder",
      "cds:I_MaintenanceNotification", "fiori:F4604", "fiori:F2731",
    ],
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
      "במערכת SAP חיה (חיבור sc4sap MCP נכשל).",
  },
];
