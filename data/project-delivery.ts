// SAP Project Delivery Center — based on SAP Activate methodology (Discover →
// Prepare → Explore → Realize → Deploy → Run), SAP Best Practices, Fit-to-
// Standard, SAP Cloud ALM / Solution Manager, Signavio. Standard, well-
// established SAP delivery knowledge. trust: curated. No fabricated specifics.

export interface Phase {
  id: string; n: number; he: string; en: string; color: string; goal: string;
  objectives: string[]; deliverables: string[]; roles: string[]; meetings: string[];
  templates: string[]; risks: string[]; mistakes: string[]; example: string; scenario?: string;
  links?: { label: string; href: string }[];
}

export const PHASES: Phase[] = [
  {
    id: "discover", n: 1, he: "גילוי", en: "Discover", color: "#0ea5e9",
    goal: "להבין את הערך העסקי, להגדיר חזון וסקופ ראשוני, ולהחליט על מעבר ל-S/4HANA.",
    objectives: ["Business case + הערכת ערך", "חזון פתרון וסקופ ראשוני", "הערכת מוכנות (Readiness Check)", "החלטת גישת המרה (Greenfield/Brownfield/Selective)"],
    deliverables: ["Digital Discovery Assessment", "Business Case + ROI", "Solution Scope ראשוני", "Trial/Demo system"],
    roles: ["Executive Sponsor", "Value Advisor", "Enterprise Architect", "Business stakeholders"],
    meetings: ["Discovery Workshop", "Value Discovery session"],
    templates: ["Value Assessment", "Scope Statement", "Business Case"],
    risks: ["ערך עסקי לא ברור → אין מימון", "סקופ רחב מדי / לא מוגדר"],
    mistakes: ["דילוג על Discovery וקפיצה ל-Realize", "החלטת Brownfield/Greenfield ללא ניתוח קוד מותאם"],
    example: "הרצת SAP Readiness Check על מערכת ECC קיימת לזיהוי Simplification Items ו-Custom Code Impact לפני החלטת גישה.",
    scenario: "בארגון: הערכת ערך למעבר S/4 — דיווח מלאי תרכיזים בזמן אמת (Embedded Analytics) כמניע ערך מרכזי.",
    links: [{ label: "Readiness Center", href: "/s4-readiness/" }, { label: "מרכז S/4", href: "/s4hana/" }],
  },
  {
    id: "prepare", n: 2, he: "הכנה", en: "Prepare", color: "#6366f1",
    goal: "להקים את הפרויקט: ממשל, צוות, תוכנית, סביבות וגישת עבודה.",
    objectives: ["הקמת ממשל ותוכנית פרויקט", "הקמת צוות + RACI", "הקמת סביבות (Sandbox/DEV)", "תוכנית ניהול סיכונים"],
    deliverables: ["Project Charter", "Team & Governance (RACI)", "Project Plan + Schedule", "RAID Log", "Environment setup"],
    roles: ["Project Manager", "Solution Architect", "Module Leads (PP/PM/MM/FI...)", "Basis", "Change Manager"],
    meetings: ["Project Kickoff", "Governance/Steering setup"],
    templates: ["Project Charter", "RACI Matrix", "RAID Log", "Communication Plan"],
    risks: ["משאבים/זמינות מומחים", "ממשל לא ברור → החלטות איטיות"],
    mistakes: ["צוות ללא Process Owners מהעסק", "אין סביבת Sandbox ל-Fit-to-Standard"],
    example: "הקמת RACI שמפריד בין החלטות עיצוב (Process Owner) למימוש (Consultant) ולאישור (Steering).",
    scenario: "בארגון: Module Leads ל-PP-PI, PM ו-QM מונו מהשטח (מתכנן ייצור, מהנדס אחזקה) — לא רק IT.",
    links: [{ label: "Cutover Center", href: "/delivery/#cutover" }],
  },
  {
    id: "explore", n: 3, he: "חקירה", en: "Explore", color: "#7c3aed",
    goal: "Fit-to-Standard: התאמת התהליכים ל-Best Practices, זיהוי פערים ובניית Backlog.",
    objectives: ["סדנאות Fit-to-Standard לכל תהליך", "זיהוי פערים (Gaps) ו-WRICEF", "בניית Backlog מתועדף", "עיצוב פתרון (Solution Design)"],
    deliverables: ["Fit-Gap Analysis", "Solution Backlog", "WRICEF list", "Process design (BPML/Signavio)", "Functional designs"],
    roles: ["Functional Consultants", "Process Owners", "Solution Architect", "Developers (לאומדן WRICEF)"],
    meetings: ["Fit-to-Standard Workshops (לפי תהליך)", "Design authority / Backlog grooming"],
    templates: ["Fit-Gap Sheet", "Backlog (User stories)", "WRICEF list", "Process flow (Signavio)"],
    risks: ["ניפוח פערים → קסטומיזציה מיותרת", "Process Owners לא זמינים לסדנאות"],
    mistakes: ["Custom-first במקום Fit-to-Standard", "תיעוד דרישות ללא Backlog מתועדף"],
    example: "סדנת Fit-to-Standard ל-Process Order: הצגת תהליך Best Practice → תיעוד delta → החלטת Config/Enhancement/Workaround.",
    scenario: "בארגון: סדנת Fit-to-Standard לפקודת תהליך — רוב התהליך תאם Best Practice; פער יחיד בקביעת אצווה (FEFO) טופל ב-Config.",
    links: [{ label: "Workshop Center", href: "/delivery/#workshop" }, { label: "Blueprint Center", href: "/delivery/#blueprint" }, { label: "מודל נתונים", href: "/sap-infrastructure/" }],
  },
  {
    id: "realize", n: 4, he: "מימוש", en: "Realize", color: "#16a34a",
    goal: "מימוש איטרטיבי: קונפיגורציה, פיתוח WRICEF, אינטגרציות, הגירת נתונים ובדיקות.",
    objectives: ["קונפיגורציה לפי Backlog (Sprints)", "פיתוח WRICEF + ATC", "בניית אינטגרציות (CPI/IDoc)", "בניית הגירת נתונים (LTMC)", "Unit + String + SIT"],
    deliverables: ["Configured system", "WRICEF objects", "Integration flows", "Migration objects", "Test scripts + results"],
    roles: ["Config Consultants", "ABAP Developers", "Integration Consultant", "Data Migration Lead", "QA Lead"],
    meetings: ["Sprint Planning/Review", "Daily Stand-up", "Solution walkthrough"],
    templates: ["Config Rationale", "Functional/Technical Spec (FS/TS)", "Test Script", "Defect Log"],
    risks: ["Scope creep ב-Sprints", "אינטגרציות/הגירה מתגלות מאוחר"],
    mistakes: ["פיתוח WRICEF ללא ATC/Readiness", "בדיקות נדחות לסוף"],
    example: "Sprint שמסיים תהליך Order-to-Confirm מקצה לקצה: Config + Backflush + אישור + בדיקת SIT.",
    scenario: "בארגון: Sprint לייצור — גרסת ייצור (MKAL), מתכון, Backflush ו-COGI נבדקו כיחידת תהליך אחת.",
    links: [{ label: "Test Center", href: "/delivery/#test" }, { label: "Migration Cockpit", href: "/migration-cockpit/" }, { label: "Object Explorer", href: "/s4hana/" }],
  },
  {
    id: "deploy", n: 5, he: "הטמעה", en: "Deploy", color: "#dc2626",
    goal: "מעבר לפרודקשן: Cutover, הגירת נתונים, Dress Rehearsal, UAT, הדרכה ו-Go-Live.",
    objectives: ["UAT + הדרכת משתמשים", "Dress Rehearsal (חזרה כללית)", "Cutover Plan מפורט + Freeze", "הגירת נתונים סופית + Reconciliation", "Go-Live + Hypercare"],
    deliverables: ["UAT sign-off", "Cutover Plan + Runbook", "Migrated production data", "Training materials", "Go-Live + Hypercare plan"],
    roles: ["Cutover Manager", "Data Migration Lead", "Trainers", "QA Lead", "Command Center"],
    meetings: ["Cutover command calls", "Go/No-Go decision", "UAT defect triage"],
    templates: ["Cutover Plan", "Runbook", "Go/No-Go checklist", "Hypercare log"],
    risks: ["חלון Cutover קצר מדי", "נתוני פתיחה לא מאוזנים (Reconciliation)"],
    mistakes: ["Dress Rehearsal לא מלא / לא נמדד", "Fallback Plan חסר"],
    example: "Dress Rehearsal מלא של ה-Cutover עם מדידת זמנים, כדי לוודא שהחלון ב-Go-Live ריאלי.",
    scenario: "בארגון: Dress Rehearsal של העלאת יתרות מלאי (LTMC) — נמדד 6 שעות; חלון ה-Go-Live תוכנן ל-8.",
    links: [{ label: "Cutover Center", href: "/delivery/#cutover" }, { label: "Migration Cockpit", href: "/migration-cockpit/" }],
  },
  {
    id: "run", n: 6, he: "תפעול", en: "Run", color: "#0d9488",
    goal: "תמיכה שוטפת, שיפור מתמיד ומדידת ערך — Operate & Optimize.",
    objectives: ["מודל תמיכה (AMS/Hypercare→BAU)", "ניטור ותפעול (Cloud ALM)", "שיפור מתמיד + Innovation cycle", "מדידת KPIs וערך"],
    deliverables: ["Support model + SLAs", "Operations runbooks", "KPI dashboard", "Continuous improvement backlog"],
    roles: ["Application Support (AMS)", "Product Owner", "Basis/Ops", "Center of Excellence"],
    meetings: ["Change Advisory Board (CAB)", "Service review", "Improvement backlog review"],
    templates: ["SLA / OLA", "KPI Dashboard", "Change Request", "Knowledge base (KB)"],
    risks: ["ידע לא מועבר (KT) → תלות ביועצים", "Backlog שיפורים נזנח"],
    mistakes: ["אין Center of Excellence", "Hypercare מסתיים בלי KT מסודר"],
    example: "Cloud ALM לניטור תפעולי + KPIs (זמני תגובה MRP, תקלות COGI) שמזינים את ה-improvement backlog.",
    scenario: "בארגון: KPI חודשי — מספר רשומות COGI פתוחות, זמן סגירת חודש, אחוז Backflush מוצלח.",
    links: [{ label: "Readiness Center", href: "/s4-readiness/" }, { label: "מרכז תקלות", href: "/incidents/" }],
  },
];

/* ── Test Management Center ── */
export const TEST_LEVELS: { he: string; sub: string; entry: string; exit: string }[] = [
  { he: "Unit Test", sub: "בדיקת יחידת קוד/קונפיג בודדת", entry: "אובייקט פותח + ATC עבר", exit: "כל היחידות עוברות" },
  { he: "String / Scenario", sub: "שרשרת פעולות בתהליך אחד", entry: "Units עברו", exit: "התהליך רץ מקצה לקצה" },
  { he: "SIT — Integration", sub: "תהליך חוצה-מודולים + ממשקים", entry: "תהליכים בודדים עברו", exit: "אין פגמים חוסמים בזרימה" },
  { he: "UAT — User Acceptance", sub: "משתמשים עסקיים על תרחישים אמיתיים", entry: "SIT עבר + הדרכה", exit: "Sign-off עסקי" },
  { he: "Regression", sub: "השוואת תוצאות ECC↔S/4 / לפני-אחרי", entry: "Build יציב", exit: "אין רגרסיות" },
  { he: "Performance", sub: "MRP/Backflush/חישוב שכר בנפח", entry: "סביבה דמוית-פרוד", exit: "עמידה ביעדי תגובה" },
];
export const TEST_TOOLS = ["SAP Cloud ALM — Test Management", "Tricentis (SAP-endorsed)", "ABAP Unit + ATC", "Solution Manager Test Suite (legacy)"];

/* ── Defect Management Center ── */
export const DEFECT_SEVERITY: { sev: string; he: string; sla: string; c: string }[] = [
  { sev: "S1", he: "חוסם — תהליך עסקי תקוע", sla: "טיפול מיידי / שעות", c: "#dc2626" },
  { sev: "S2", he: "חמור — אין Workaround סביר", sla: "1–2 ימי עבודה", c: "#f97316" },
  { sev: "S3", he: "בינוני — קיים Workaround", sla: "Sprint נוכחי/הבא", c: "#d97706" },
  { sev: "S4", he: "נמוך — קוסמטי/שיפור", sla: "Backlog", c: "#16a34a" },
];
export const DEFECT_FLOW = ["New", "Analysis (root cause)", "In Fix", "Retest", "Closed / Rejected"];

/* ── Workshop Center (Fit-to-Standard) ── */
export const WORKSHOP_TYPES: { he: string; sub: string }[] = [
  { he: "Fit-to-Standard", sub: "הצגת תהליך Best Practice → תיעוד delta → החלטת Config/Gap" },
  { he: "Process Discovery", sub: "מיפוי התהליך הקיים (As-Is) ב-Signavio" },
  { he: "Design Authority", sub: "אישור עיצוב פתרון + החלטות Gap/WRICEF" },
  { he: "Data Migration", sub: "מיפוי מקור→יעד, חוקי טרנספורמציה, רצף טעינה" },
  { he: "Integration", sub: "מיפוי ממשקים, פרוטוקולים ו-touchpoints" },
];
export const WORKSHOP_PREP = ["סוכן/אג'נדה מראש", "תרחישי Best Practice להצגה", "Process Owners נוכחים", "Sandbox מוכן", "תבנית Fit-Gap לתיעוד חי"];

/* ── Blueprint Center ── */
export const BLUEPRINT = {
  approachHe: "S/4HANA Activate מחליף את 'Business Blueprint' הקלאסי ב-Fit-to-Standard: מתחילים מ-Best Practice (לא מדף ריק), מתעדים פערים בלבד.",
  items: [
    { he: "Business Process Master List (BPML)", sub: "רשימת כל התהליכים בסקופ + Scope Items של Best Practices" },
    { he: "Scope Items", sub: "תהליכי Best Practice מוכנים (לדוגמה: Make-to-Stock Production)" },
    { he: "Fit-Gap / Delta Design", sub: "מה תואם סטנדרט מול מה דורש Config/Enhancement" },
    { he: "WRICEF Inventory", sub: "Workflows/Reports/Interfaces/Conversions/Enhancements/Forms" },
    { he: "Solution Design Documents", sub: "עיצוב פונקציונלי לכל פער מאושר" },
  ],
};

export const PD_META = { phases: PHASES.length, testLevels: TEST_LEVELS.length, defectSev: DEFECT_SEVERITY.length, workshops: WORKSHOP_TYPES.length };
