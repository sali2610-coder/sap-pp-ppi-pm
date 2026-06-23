// SAP ALM (Application Lifecycle Management) Center — Phase 8.
// Solution Manager 7.2, Focused Build, and SAP Cloud ALM; the end-to-end
// lifecycle (Discover→Operate), transport management (CTS/STMS/CTS+/Retrofit),
// change & incident management, test management and monitoring. Standard SAP
// ALM knowledge — tools, tcodes and SAP Note refs are search keywords +
// component (NOT fabricated numbers). trust: curated.

export interface AlmLink { label: string; href: string }
export interface AlmCap { he: string; en: string; desc: string }
export interface AlmPlatform {
  id: string;
  he: string;
  en: string;
  color: string;
  tagline: string;
  what: string;
  when: string;
  capabilities: AlmCap[];
  tools: string[];        // tcodes / Fiori apps / web apps
  ecc: string;
  s4: string;
  tips: string[];
  notes: string[];
  cbc: string;
  links: AlmLink[];
}

const DELIVERY: AlmLink = { label: "מסירה (Delivery)", href: "/delivery/" };
const S4: AlmLink = { label: "S/4HANA", href: "/s4hana/" };
const SEC: AlmLink = { label: "אבטחה", href: "/security/" };
const MIG: AlmLink = { label: "Migration", href: "/migration-cockpit/" };

export const PLATFORMS: AlmPlatform[] = [
  {
    id: "solman", he: "Solution Manager 7.2", en: "SAP Solution Manager", color: "#2563eb",
    tagline: "פלטפורמת ALM ה-on-prem הקלאסית — תיעוד, שינויים, בדיקות, ניטור ו-RCA.",
    what: "SolMan 7.2 מנהל את כל מחזור החיים של נוף SAP: Solution Documentation (תהליכים), ChaRM (ניהול שינויים+טרנספורטים), ITSM (תקלות/בקשות), Test Suite, BPMon (ניטור תהליכים עסקיים) ו-Root Cause Analysis. נדרש SAP_BASIS + Managed System setup.",
    when: "נופים on-prem; ניהול שינויים מבוקר; תיעוד פתרון; ניטור טכני ועסקי; אינטגרציה עם CTS. סיום תחזוקה מרכזית 2027 (extended 2030).",
    capabilities: [
      { he: "ChaRM", en: "Change Request Management", desc: "ניהול שינויים מבוקר מעל CTS — Change Documents (Normal/Urgent), שחרור ושינוע טרנספורטים בשרשרת DEV→QA→PRD." },
      { he: "ITSM", en: "IT Service Management", desc: "ניהול תקלות (Incidents), בקשות שירות, וקישור לבעיה/שינוי. Service Desk משולב." },
      { he: "Test Suite", en: "Test Management", desc: "Test Plans, Test Packages, TBOM, ו-CBTA (Component-Based Test Automation); ניתוח השפעת שינוי (BPCA)." },
      { he: "BPMon", en: "Business Process Monitoring", desc: "ניטור KPI של תהליכים עסקיים (תורי הזמנות, IDocs תקועים, backlog) עם התראות." },
      { he: "RCA", en: "Root Cause Analysis", desc: "ניתוח שורש חוצה-רכיבים — E2E trace, Workload/EarlyWatch, exception analysis." },
      { he: "Solution Documentation", en: "Solution Documentation", desc: "מאגר התהליכים, אובייקטי הפיתוח, היררכיית Solution/Branch — בסיס לבדיקות ולשינויים." },
    ],
    tools: ["SOLMAN_SETUP", "SM_WORKCENTER", "SOLMAN_WORKCENTER", "SMSY/LMDB", "CHARM_*", "SOLAR_PROJECT_ADMIN (legacy)", "SE38/EWA"],
    ecc: "מנוהל מערכות ECC דרך Managed System config; ChaRM מעל CTS.", s4: "תומך גם ב-S/4 on-prem; אך SAP מכוונת ל-Cloud ALM לתרחישים חדשים/היברידיים.",
    tips: ["Managed System + LMDB חייבים להיות מעודכנים ל-RCA/ניטור", "ChaRM דורש משמעת cycle (phases)", "תכנן מעבר ל-Cloud ALM לקראת 2027"],
    notes: ["Solution Manager 7.2 managed system setup · SV-SMG-SET", "ChaRM change document transport · SV-SMG-CM", "BPMon alert configuration · SV-SMG-MON-BPM"],
    cbc: "ב-CBC: ChaRM שימש לשנע תיקון PP-PI דרך DEV→QA→PRD עם תיעוד מלא; BPMon התריע על backlog אישורי ייצור.",
    links: [{ label: "Transport Mgmt", href: "/alm/#transport" }, DELIVERY, S4],
  },
  {
    id: "fb", he: "Focused Build", en: "SAP Focused Build (SolMan add-on)", color: "#7c3aed",
    tagline: "תוסף ל-SolMan 7.2 לניהול דרישות והטמעה מובנית בקנה מידה גדול.",
    what: "Focused Build מוסיף ל-SolMan תהליך מובנה ל-requirements-to-deploy: ניהול דרישות (Requirements) → Work Packages → Work Items → Releases, עם ממשקי Fiori ייעודיים ו-Solution Readiness Dashboard. אכיפת ממשל טרנספורטים מעל ChaRM.",
    when: "פרויקטי הטמעה/transformation גדולים (SAP Activate); כשצריך מעקב דרישות→פיתוח→בדיקה→שחרור בקנה מידה ובשקיפות.",
    capabilities: [
      { he: "Requirements", en: "Requirements Management", desc: "תפיסת דרישות עסקיות, תיעדוף, שיוך לתהליכים ב-Solution Documentation." },
      { he: "Work Packages", en: "Work Packages", desc: "אריזת דרישה לחבילת עבודה עם spec פונקציונלי; אבן בניין לתכנון release." },
      { he: "Work Items", en: "Work Items", desc: "יחידות העבודה הטכניות (פיתוח/קונפיג) תחת Work Package; קשורות לטרנספורטים." },
      { he: "Releases / Waves", en: "Release & Wave Planning", desc: "תכנון גלי שחרור, חבילות וזמנים; Solution Readiness Dashboard למעקב התקדמות." },
      { he: "Transport Governance", en: "Transport Governance", desc: "אכיפת רצף וסטטוס טרנספורטים מעל ChaRM — gate לפני QA/PRD." },
    ],
    tools: ["Fiori: Process Management", "Fiori: My Work Packages / My Work Items", "Solution Readiness Dashboard", "SOLDOC", "ChaRM (בסיס)"],
    ecc: "פועל על SolMan 7.2 שמנהל נופי ECC/S4.", s4: "נפוץ בפרויקטי S/4 transformation (SAP Activate); מקביל מודרני: Cloud ALM Implementation.",
    tips: ["Work Item ↔ Transport — שמור על המיפוי", "Solution Readiness Dashboard = תמונת מצב להנהלה", "Focused Build דורש SolMan 7.2 SP מתאים"],
    notes: ["Focused Build work package work item · SV-SMG-FB", "Solution Readiness Dashboard · SV-SMG-FB"],
    cbc: "ב-CBC: דרישה לדוח תחזוקה (PM) נוהלה כ-Work Package עם 3 Work Items (CDS, Fiori, הרשאה); שוחררה ב-wave מתוכנן.",
    links: [{ label: "SAP Activate", href: "/delivery/" }, { label: "אבטחה — תפקידים", href: "/security/" }, S4],
  },
  {
    id: "calm", he: "Cloud ALM", en: "SAP Cloud ALM", color: "#0d9488",
    tagline: "פלטפורמת ALM הענן-נייטיב המודרנית — Implementation + Operations, ללא תשתית.",
    what: "SAP Cloud ALM (חלק מ-Enterprise Support / BTP) היא ALM כ-SaaS: Implementation (tasks, processes, test, deploy לפי SAP Activate) ו-Operations (Health/Integration/Job/Business/User/Real-User monitoring + Analytics). ללא Managed System on-prem — מתחבר דרך connectivity ל-S/4 Cloud והיברידי.",
    when: "S/4HANA Cloud, RISE with SAP, נופים היברידיים; פרויקטים חדשים; כשרוצים ALM ללא תחזוקת תשתית. היורש האסטרטגי של SolMan.",
    capabilities: [
      { he: "Implementation", en: "Implementation", desc: "ניהול פרויקט לפי SAP Activate — Processes, Requirements, User Stories, Tasks, Test, Deploy; אינטגרציה ל-Signavio/Best Practices." },
      { he: "Operations", en: "Operations", desc: "מטרייה לכל הניטור התפעולי + Analytics ו-Tasks/Alerts מנוהלים." },
      { he: "Health Monitoring", en: "Health Monitoring", desc: "בריאות מערכות מנוהלות — זמינות, ביצועים, exceptions." },
      { he: "Integration Monitoring", en: "Integration & Exception Monitoring", desc: "ניטור ממשקים (CPI/iFlows, IDoc, API) חוצה-מערכות + exceptions." },
      { he: "Job Monitoring", en: "Job & Automation Monitoring", desc: "ניטור עבודות רקע/job chains וזמני ריצה מול SLA." },
      { he: "Business / Real-User", en: "Business Process & Real-User Monitoring", desc: "ניטור KPI עסקיים (מקביל ל-BPMon) + חוויית משתמש בפועל." },
    ],
    tools: ["Cloud ALM Web UI", "BTP Cockpit", "Cloud ALM API", "Landscape Management (managed components)"],
    ecc: "לא מיועד ל-ECC טהור; מתמקד ב-Cloud/S4/היברידי.", s4: "ה-ALM המומלץ ל-S/4HANA Cloud / RISE; Implementation מבוסס SAP Activate, Operations מחליף ניטור SolMan.",
    tips: ["Cloud ALM = SaaS — אין תשתית לתחזק", "Implementation ↔ Operations שתי הזרועות", "מתאים במיוחד ל-RISE with SAP"],
    notes: ["SAP Cloud ALM implementation operations setup · SV-CLM", "Cloud ALM integration monitoring · SV-CLM-OP-IM", "Cloud ALM health monitoring · SV-CLM-OP-HM"],
    cbc: "ב-CBC (הערכת S/4): Cloud ALM שימש לתכנון Tasks לפי Activate ול-Integration Monitoring של iFlows ל-MES.",
    links: [{ label: "אינטגרציה — CPI", href: "/integration/#cpi" }, { label: "מסירה — Activate", href: "/delivery/" }, MIG, S4],
  },
];

export const PLATFORM_NOTE = "SolMan 7.2 = on-prem קלאסי (תחזוקה עד 2027/2030). Focused Build = תוסף הטמעה מובנה ל-SolMan. Cloud ALM = היורש הענני המודרני ל-S/4 Cloud/RISE.";

// 4. End-to-end lifecycle
export const LIFECYCLE: { phase: string; en: string; color: string; tool: string; activities: string[] }[] = [
  { phase: "Discover", en: "Discover", color: "#6366f1", tool: "Cloud ALM / Best Practices", activities: ["הערכת ערך + scope", "Trial / Best Practices", "Readiness Check"] },
  { phase: "Design", en: "Design", color: "#8b5cf6", tool: "Solution Documentation / Process Mgmt", activities: ["Fit-to-Standard", "תיעוד תהליכים", "דרישות + User Stories"] },
  { phase: "Build", en: "Build", color: "#0ea5e9", tool: "Focused Build / Cloud ALM Tasks", activities: ["Work Items / Tasks", "פיתוח + קונפיג", "טרנספורטים"] },
  { phase: "Test", en: "Test", color: "#16a34a", tool: "Test Suite / CBTA / Cloud ALM Test", activities: ["Test Plans + TBOM", "SIT / UAT", "BPCA impact"] },
  { phase: "Deploy", en: "Deploy", color: "#d97706", tool: "ChaRM / STMS / Cutover", activities: ["שחרור טרנספורטים", "Cutover + Go-Live", "Hypercare"] },
  { phase: "Operate", en: "Operate", color: "#dc2626", tool: "Operations / BPMon / RCA", activities: ["Monitoring (Health/Integration/Job)", "ITSM + תקלות", "EarlyWatch / RCA"] },
];

// 5. Transport management
export const TRANSPORT_FLOW = ["DEV (פיתוח)", "Release (SE10)", "STMS Import Queue", "QA (בדיקות)", "STMS Import", "PRD (פרודקשן)"];
export const TRANSPORT_CONCEPTS: { he: string; en: string; desc: string }[] = [
  { he: "סוגי בקשה", en: "Workbench vs Customizing", desc: "Workbench (אובייקטי repository, חוצה-client) מול Customizing (טבלאות config, client-specific)." },
  { he: "STMS / TMS", en: "Transport Management System", desc: "ניהול Transport Domain, נתיבי שינוע (transport routes) ו-Import Queues בין מערכות הנוף." },
  { he: "CTS+", en: "Enhanced CTS", desc: "הרחבת CTS לשינוע אובייקטים non-ABAP (Java, Portal, BO, PI directory) באותו מנגנון." },
  { he: "Retrofit", en: "Retrofit (SCWB)", desc: "סנכרון שינויים בין נתיב maintenance (תיקוני פרודקשן) לנתיב project (פיתוח) — מונע אובדן שינויים בנופי N+N." },
  { he: "ChaRM-controlled", en: "Controlled transports", desc: "שחרור/שינוע דרך Change Documents ב-ChaRM במקום STMS ידני — ממשל ועקיבות." },
  { he: "Client copy", en: "SCC1 / client transport", desc: "העתקת customizing בין clients (SCC1 לפי בקשה) — נפרד משינוע בין מערכות." },
];
export const TRANSPORT_TCODES = ["SE01", "SE09", "SE10", "STMS", "STMS_IMPORT", "SCC1", "SCWB (retrofit)", "SPAM/SAINT"];

// 6. Incident & Change management
export const CHANGE_TYPES: { he: string; en: string; desc: string; c: string }[] = [
  { he: "Normal Change", en: "Normal Change", desc: "שינוי מתוכנן עם מחזור מלא: פיתוח→בדיקה→אישור→שחרור מבוקר.", c: "#2563eb" },
  { he: "Urgent Change", en: "Urgent Change", desc: "תיקון דחוף (hotfix) עם מסלול מקוצר לפרודקשן — עדיין מתועד ומבוקר.", c: "#dc2626" },
  { he: "Standard Change", en: "Standard Change", desc: "שינוי שגרתי מאושר-מראש (pre-approved) עם נמוכת-סיכון.", c: "#16a34a" },
  { he: "Admin / General", en: "Administrative Change", desc: "שינוי ללא טרנספורט (למשל פעולת תחזוקה) — תיעוד בלבד.", c: "#64748b" },
];
export const CHANGE_FLOW = ["Created", "In Development", "To Be Tested", "Tested OK", "Authorized", "Go-Live (Imported)", "Closed"];
export const ITSM_NOTE = "ITSM (Incidents/Service Requests) ← Problem ← Change: תקלה חוזרת → Problem → Change Document שמייצר טרנספורט. ChaRM שולט בשינוי, ITSM בתקלה.";

// 7. Test management
export const TEST_CAPS: { he: string; en: string; desc: string }[] = [
  { he: "Test Plan / Package", en: "Test Plan & Package", desc: "ארגון מקרי בדיקה לפי scope; הקצאה לבודקים ומעקב סטטוס." },
  { he: "TBOM", en: "Technical Bill of Materials", desc: "רישום האובייקטים הטכניים שתהליך נוגע בהם — בסיס לניתוח השפעה." },
  { he: "BPCA", en: "Business Process Change Analyzer", desc: "מנתח אילו תהליכים/בדיקות מושפעים מטרנספורט/תיקון נכנס — סקופ בדיקות ממוקד." },
  { he: "CBTA", en: "Component-Based Test Automation", desc: "אוטומציית בדיקות מבוססת רכיבים ב-SolMan Test Suite." },
  { he: "Cloud ALM Test", en: "Cloud ALM Test Management", desc: "ניהול בדיקות ידני/אוטומטי בענן, משולב ב-Implementation." },
];

// 8. Monitoring
export const MONITOR_TYPES: { he: string; en: string; tool: string; desc: string; c: string }[] = [
  { he: "System / Health", en: "System / Health Monitoring", tool: "SolMan Tech-Mon / Cloud ALM Health", desc: "זמינות, ביצועים, ניצול משאבים, exceptions של מערכות מנוהלות.", c: "#2563eb" },
  { he: "Business Process", en: "BPMon / Business Monitoring", tool: "SolMan BPMon / Cloud ALM BPM", desc: "KPI עסקיים: backlog, תורים, מסמכים תקועים, מדדי תהליך.", c: "#16a34a" },
  { he: "Integration", en: "Integration Monitoring", tool: "Cloud ALM Integration / SolMan IF-Mon", desc: "ניטור ממשקים: CPI/iFlows, IDoc, API, PI/PO — חוצה-מערכות.", c: "#7c3aed" },
  { he: "Job", en: "Job & Automation Monitoring", tool: "SolMan Job-Mon / Cloud ALM Job", desc: "עבודות רקע, job chains, זמני ריצה מול SLA.", c: "#d97706" },
  { he: "RCA", en: "Root Cause Analysis", tool: "SolMan RCA / E2E Trace", desc: "ניתוח שורש חוצה-רכיבים, E2E trace, exception analysis.", c: "#dc2626" },
  { he: "EarlyWatch", en: "EarlyWatch Alert (EWA)", tool: "SolMan / Cloud ALM", desc: "דוח בריאות תקופתי אוטומטי עם המלצות (ביצועים, אבטחה, יציבות).", c: "#0891b2" },
];

// 9. Interview questions
export const ALM_INTERVIEW: { q: string; a: string }[] = [
  { q: "מה ההבדל בין Solution Manager ל-Cloud ALM?", a: "SolMan = ALM on-prem קלאסי (תשתית מנוהלת, ChaRM/CTS, תחזוקה עד 2027/2030). Cloud ALM = SaaS מודרני ל-S/4 Cloud/RISE, ללא תשתית, מחולק ל-Implementation ו-Operations." },
  { q: "מה תפקיד ChaRM מול CTS?", a: "CTS = מנגנון הטרנספורטים הטכני (STMS). ChaRM = שכבת ממשל מעליו: Change Documents שמבקרים מתי/מי משחרר ומשנע, עם מחזור סטטוסים ועקיבות." },
  { q: "מהו Retrofit ולמה צריך אותו?", a: "סנכרון שינויים בין נתיב maintenance (תיקוני פרודקשן) לנתיב project (פיתוח) בנופי dual-track — מונע דריסה/אובדן של תיקונים כשמשחררים פיתוח." },
  { q: "מה ההבדל בין Normal ל-Urgent Change?", a: "Normal = מחזור מלא מתוכנן (פיתוח→בדיקה→אישור→שחרור). Urgent = מסלול מקוצר לתיקון דחוף בפרודקשן, עדיין מתועד ומבוקר." },
  { q: "מה זה Focused Build ומתי משתמשים בו?", a: "תוסף ל-SolMan 7.2 לניהול מובנה של requirements→work packages→work items→releases בפרויקטי הטמעה גדולים, עם Solution Readiness Dashboard ואכיפת ממשל טרנספורטים." },
  { q: "מהו BPCA ואיך הוא עוזר לבדיקות?", a: "Business Process Change Analyzer מנתח (מול TBOM) אילו תהליכים/בדיקות מושפעים מטרנספורט נכנס, ומאפשר scope בדיקות ממוקד במקום regression מלא." },
  { q: "אילו סוגי ניטור מספק Cloud ALM Operations?", a: "Health, Integration & Exception, Job & Automation, Business Process, Real-User, ועוד — מטרייה תפעולית עם Analytics ו-Alerts מנוהלים." },
  { q: "תאר את מחזור החיים End-to-End ב-ALM.", a: "Discover → Design (Fit-to-Standard) → Build (work items/transports) → Test (Test Suite/BPCA) → Deploy (ChaRM/Cutover) → Operate (Monitoring/RCA/ITSM)." },
];

export const ALM_META = {
  he: "מרכז ALM של SAP",
  sub: "Solution Manager 7.2, Focused Build ו-Cloud ALM — מחזור חיים End-to-End, ניהול טרנספורטים (CTS/STMS/CTS+/Retrofit), שינויים ותקלות, בדיקות וניטור. ידע SAP סטנדרטי. trust: curated.",
  count: PLATFORMS.length,
};
