// ===== SAP Digital Library =====
// Structural index of the 10 official SAP S/4HANA manuals in docs/.
// English chapter titles/abstracts are EXTRACTED from each PDF's table of
// contents (see scripts/extract-books.mjs). Hebrew is a professional
// translation authored for CBC. This is a chapter-level index — not the full
// 3,000-page text. Page numbers reference the source PDF.

export type LibModule = "PM" | "PP" | "PP-PI" | "QM" | "MM" | "WM" | "IBP" | "Fiori" | "Foundation";

export interface LibChapter {
  n: number;
  en: string;
  he: string;
  page?: number;
  bodyEn?: string; // verbatim excerpt extracted from the PDF chapter
  bodyHe?: string; // professional Hebrew translation of the excerpt
}

export interface LibBook {
  id: string;
  title: string;
  titleHe: string;
  publisher: string;
  module: LibModule;
  pages: number;
  summaryEn: string;
  summaryHe: string;
  chapters: LibChapter[];
}

export const LIBRARY: LibBook[] = [
  {
    id: "config-pm",
    title: "Configuring Plant Maintenance in SAP S/4HANA",
    titleHe: "הגדרת אחזקת מפעל (PM) ב-SAP S/4HANA",
    publisher: "SAP PRESS",
    module: "PM",
    pages: 729,
    summaryEn: "Implementation-grade customizing of SAP S/4HANA Asset Management: organizational structures, technical objects, the work-order cycle, preventive maintenance and Fiori launchpad setup.",
    summaryHe: "מדריך קונפיגורציה ברמת מימוש של ניהול נכסים (Asset Management) ב-S/4HANA: מבנים ארגוניים, אובייקטים טכניים, מחזור פקודת העבודה, אחזקה מונעת והקמת Fiori Launchpad — ליבת ה-Customizing של Project NEO בצד ה-PM.",
    chapters: [
      { n: 1, en: "SAP Projects in Plant Maintenance", he: "פרויקטי SAP בתחום אחזקת מפעל", page: 27 },
      { n: 2, en: "Configuring Organizational Structures", he: "הגדרת מבנים ארגוניים", page: 79 },
      { n: 3, en: "Configuring Generic Functions", he: "הגדרת פונקציות גנריות", page: 109 },
      { n: 4, en: "Configuring the Structure of Technical Systems", he: "הגדרת מבנה המערכות הטכניות (מיקומים פונקציונליים וציוד)", page: 169 },
      { n: 5, en: "Configuring the Work Order Cycle", he: "הגדרת מחזור פקודת העבודה (הודעה ➔ פק\"ע ➔ דיווח ➔ סגירה)", page: 249 },
      { n: 6, en: "Configuring Preventive Maintenance", he: "הגדרת אחזקה מונעת (תוכניות, אסטרטגיות ומשימות)", page: 415 },
      { n: 7, en: "Configuring Additional Business Processes", he: "הגדרת תהליכים עסקיים נוספים", page: 433 },
      { n: 9, en: "Usability (SAP Fiori Launchpad Configuration)", he: "שמישות והקמת SAP Fiori Launchpad", page: 623 },
    ],
  },
  {
    id: "pm-business-user",
    title: "Plant Maintenance with SAP S/4HANA — Business User Guide",
    titleHe: "אחזקת מפעל ב-SAP S/4HANA — מדריך למשתמש העסקי",
    publisher: "SAP PRESS",
    module: "PM",
    pages: 669,
    summaryEn: "End-user and process view of SAP S/4HANA Plant Maintenance: how to structure technical systems, run the work-order cycle, and operate preventive maintenance and controlling.",
    summaryHe: "מבט תהליכי ומשתמש-קצה על אחזקת מפעל ב-S/4HANA: בניית המערכות הטכניות, הפעלת מחזור פקודת העבודה, אחזקה מונעת ובקרת עלויות — משלים את ספר הקונפיגורציה עבור צוות התפעול ב-CBC.",
    chapters: [
      { n: 1, en: "Plant Maintenance with SAP S/4HANA (Introduction)", he: "אחזקת מפעל ב-SAP S/4HANA (מבוא)", page: 27 },
      { n: 2, en: "Organizational Structures", he: "מבנים ארגוניים", page: 55 },
      { n: 3, en: "Structuring of Technical Systems", he: "מבנה המערכות הטכניות", page: 67 },
      { n: 4, en: "Work Order Cycle", he: "מחזור פקודת העבודה", page: 151 },
      { n: 5, en: "Preventive Maintenance", he: "אחזקה מונעת", page: 233 },
      { n: 6, en: "Other Business Processes", he: "תהליכים עסקיים נוספים", page: 297 },
      { n: 8, en: "Plant Maintenance Controlling", he: "בקרת עלויות באחזקה (PM Controlling)", page: 437 },
      { n: 10, en: "Usability", he: "שמישות וחוויית משתמש", page: 569 },
    ],
  },
  {
    id: "production-planning",
    title: "Production Planning with SAP S/4HANA",
    titleHe: "תכנון ייצור (PP) ב-SAP S/4HANA",
    publisher: "SAP PRESS",
    module: "PP-PI",
    pages: 1087,
    summaryEn: "Comprehensive configuration and execution of discrete, process and repetitive manufacturing, MRP, demand management, S&OP, DDMRP and predictive planning (pMRP).",
    summaryHe: "קונפיגורציה והרצה מקיפה של ייצור בדיד, תהליכי וחוזר, MRP, ניהול ביקושים, S&OP, חידוש מונחה-ביקוש (DDMRP) ותכנון חיזוי — הליבה התיאורטית של מודול ה-PP-PI ב-CBC (ייצור משקאות תהליכי).",
    chapters: [
      { n: 3, en: "Discrete Manufacturing Configuration", he: "הגדרת ייצור בדיד", page: 75 },
      { n: 4, en: "Process Manufacturing Configuration", he: "הגדרת ייצור תהליכי (PP-PI)", page: 129 },
      { n: 5, en: "Repetitive Manufacturing Configuration", he: "הגדרת ייצור חוזר", page: 171 },
      { n: 6, en: "Production Planning for Discrete Manufacturing", he: "תכנון ייצור לייצור בדיד", page: 193 },
      { n: 7, en: "Production Planning for Process Manufacturing", he: "תכנון ייצור לייצור תהליכי", page: 277 },
      { n: 8, en: "Production Planning for Repetitive Manufacturing", he: "תכנון ייצור לייצור חוזר", page: 337 },
      { n: 9, en: "Kanban", he: "קנבן (Kanban)", page: 397 },
      { n: 10, en: "Batch Management", he: "ניהול אצוות (Batch)", page: 457 },
      { n: 11, en: "Sales and Operations Planning", he: "תכנון מכירות ותפעול (S&OP)", page: 545 },
      { n: 12, en: "Demand Management", he: "ניהול ביקושים", page: 617 },
      { n: 13, en: "Material Requirements Planning", he: "תכנון דרישות חומר (MRP)", page: 671 },
      { n: 14, en: "Demand-Driven Replenishment", he: "חידוש מונחה-ביקוש (DDMRP)", page: 769 },
      { n: 15, en: "Predictive Material and Resource Planning", he: "תכנון חומרים ומשאבים חיזויי (pMRP)", page: 837 },
    ],
  },
  {
    id: "pp-ds",
    title: "PP/DS with SAP S/4HANA",
    titleHe: "תכנון מפורט וסדר-עבודה (PP/DS) ב-SAP S/4HANA",
    publisher: "SAP PRESS",
    module: "PP-PI",
    pages: 639,
    summaryEn: "Embedded Production Planning and Detailed Scheduling: master data, configuration, planning runs, detailed scheduling, the alert monitor and migration to embedded PP/DS.",
    summaryHe: "תכנון ייצור ותזמון מפורט המוטמע ב-S/4HANA: נתוני אב, קונפיגורציה, הרצות תכנון, תזמון מפורט, מוניטור התראות ומיגרציה ל-PP/DS מוטמע — רלוונטי לתזמון פסי הייצור ב-CBC.",
    chapters: [
      { n: 1, en: "Introduction to PP/DS with SAP S/4HANA", he: "מבוא ל-PP/DS ב-SAP S/4HANA", page: 19 },
      { n: 2, en: "Master Data", he: "נתוני אב", page: 43 },
      { n: 3, en: "Configuration", he: "קונפיגורציה", page: 111 },
      { n: 4, en: "Data Transfer for Transaction Data", he: "העברת נתוני תנועה", page: 175 },
      { n: 5, en: "Production Planning", he: "תכנון ייצור", page: 217 },
      { n: 6, en: "Detailed Scheduling", he: "תזמון מפורט", page: 343 },
      { n: 7, en: "The Alert Monitor", he: "מוניטור ההתראות", page: 449 },
      { n: 8, en: "Advanced PP/DS Features", he: "יכולות PP/DS מתקדמות", page: 471 },
      { n: 10, en: "Administering PP/DS with SAP S/4HANA", he: "ניהול ותחזוקת PP/DS", page: 569 },
      { n: 11, en: "Migration to Embedded PP/DS", he: "מיגרציה ל-PP/DS מוטמע", page: 603 },
    ],
  },
  {
    id: "quality-management",
    title: "Quality Management with SAP S/4HANA",
    titleHe: "ניהול איכות (QM) ב-SAP S/4HANA",
    publisher: "SAP PRESS",
    module: "QM",
    pages: 939,
    summaryEn: "End-to-end QM: quality planning and inspection, integration with MM/PP/SD/PM, batch and sample management, certificates, notifications, ECM, audit and stability study.",
    summaryHe: "ניהול איכות מקצה-לקצה: תכנון ובדיקת איכות, אינטגרציה עם MM/PP/SD/PM, ניהול אצוות ודגימות, תעודות איכות, הודעות איכות, ניהול שינויים הנדסי (ECM), ביקורת ומחקרי יציבות — קריטי לבקרת איכות המשקה ב-CBC.",
    chapters: [
      { n: 1, en: "Quality Management in SAP S/4HANA", he: "ניהול איכות ב-SAP S/4HANA", page: 35 },
      { n: 2, en: "Quality Planning", he: "תכנון איכות", page: 57 },
      { n: 3, en: "Quality Inspection", he: "בדיקת איכות (Inspection Lot)", page: 109 },
      { n: 4, en: "Integrating with Materials Management", he: "אינטגרציה עם ניהול חומרים (MM)", page: 237 },
      { n: 5, en: "Integrating with Production Planning", he: "אינטגרציה עם תכנון ייצור (PP)", page: 281 },
      { n: 6, en: "Integrating with SAP S/4HANA Sales", he: "אינטגרציה עם מכירות (SD)", page: 309 },
      { n: 7, en: "Integrating with Plant Maintenance", he: "אינטגרציה עם אחזקת מפעל (PM)", page: 323 },
      { n: 9, en: "Batch Management", he: "ניהול אצוות", page: 389 },
      { n: 10, en: "Sample Management", he: "ניהול דגימות", page: 475 },
      { n: 11, en: "Quality Certificates", he: "תעודות איכות", page: 501 },
      { n: 12, en: "Quality Notification", he: "הודעות איכות", page: 523 },
      { n: 13, en: "Engineering Change Management", he: "ניהול שינויים הנדסי (ECM)", page: 585 },
      { n: 14, en: "Audit Management", he: "ניהול ביקורות", page: 621 },
      { n: 15, en: "Stability Study", he: "מחקר יציבות", page: 649 },
    ],
  },
  {
    id: "sourcing-procurement",
    title: "Sourcing and Procurement with SAP S/4HANA",
    titleHe: "רכש ומקורות אספקה (MM) ב-SAP S/4HANA",
    publisher: "SAP PRESS",
    module: "MM",
    pages: 709,
    summaryEn: "Procure-to-pay in SAP S/4HANA: organizational structure, master data, operational and automated procurement, inventory, contracts, supplier management and central procurement.",
    summaryHe: "תהליך רכש-עד-תשלום ב-S/4HANA: מבנה ארגוני, נתוני אב, רכש תפעולי ואוטומטי, ניהול מלאי, חוזים, ניהול ספקים ורכש מרכזי — תומך בשרשרת האספקה של חומרי הגלם והאריזה ב-CBC.",
    chapters: [
      { n: 1, en: "Introduction to Sourcing and Procurement", he: "מבוא לרכש ומקורות אספקה", page: 31 },
      { n: 2, en: "Implementation Options", he: "אפשרויות מימוש", page: 51 },
      { n: 3, en: "Organizational Structure", he: "מבנה ארגוני", page: 83 },
      { n: 4, en: "Master Data", he: "נתוני אב", page: 103 },
      { n: 5, en: "Operational Procurement", he: "רכש תפעולי", page: 139 },
      { n: 6, en: "Automated and Direct Procurement", he: "רכש אוטומטי וישיר", page: 187 },
      { n: 7, en: "Inventory Management", he: "ניהול מלאי", page: 237 },
      { n: 9, en: "Enterprise Contract Management and Assembly", he: "ניהול חוזים ארגוני והרכבה", page: 361 },
      { n: 10, en: "External Sourcing", he: "מקורות אספקה חיצוניים", page: 391 },
      { n: 11, en: "Product Sourcing", he: "מקורות אספקה למוצר", page: 419 },
      { n: 12, en: "Invoice and Payables Management", he: "ניהול חשבוניות וזכאים", page: 451 },
      { n: 13, en: "Supplier Management", he: "ניהול ספקים", page: 525 },
      { n: 14, en: "Centralized Procurement", he: "רכש מרכזי (Central Procurement)", page: 547 },
      { n: 15, en: "Sourcing and Procurement Analytics", he: "אנליטיקת רכש ומקורות אספקה", page: 593 },
    ],
  },
  {
    id: "fiori-apps",
    title: "SAP Fiori Apps for SAP S/4HANA — The Quick Reference Guide",
    titleHe: "אפליקציות SAP Fiori ל-SAP S/4HANA — מדריך עזר מהיר",
    publisher: "SAP PRESS",
    module: "Fiori",
    pages: 685,
    summaryEn: "A reference catalog of SAP Fiori apps by functional area, mapping classic transactions to their modern Fiori equivalents and App IDs.",
    summaryHe: "קטלוג עזר של אפליקציות Fiori לפי תחום פונקציונלי, הממפה טרנזקציות קלאסיות למקבילות Fiori המודרניות ול-App IDs — בסיס למיפוי ECC➔Fiori ב-Blueprint של Project NEO.",
    chapters: [
      { n: 1, en: "Financial Accounting", he: "הנהלת חשבונות פיננסית (FI)", page: 25 },
      { n: 3, en: "Sales and Distribution", he: "מכירות והפצה (SD)", page: 289 },
      { n: 4, en: "Inventory and Warehouse Management", he: "ניהול מלאי ומחסן", page: 369 },
      { n: 5, en: "Production Planning and Manufacturing", he: "תכנון ייצור וייצור", page: 397 },
      { n: 7, en: "Materials Management", he: "ניהול חומרים (MM)", page: 465 },
      { n: 8, en: "Quality Management", he: "ניהול איכות (QM)", page: 555 },
      { n: 9, en: "Project System", he: "מערכת פרויקטים (PS)", page: 569 },
      { n: 10, en: "Flexible Real Estate Management", he: "ניהול נדל\"ן גמיש", page: 577 },
      { n: 11, en: "Cross-Functional Apps", he: "אפליקציות חוצות-תחום", page: 585 },
      { n: 12, en: "Additional Resources", he: "משאבים נוספים", page: 605 },
    ],
  },
  {
    id: "ibp-sop",
    title: "Sales and Operations Planning with SAP IBP",
    titleHe: "תכנון מכירות ותפעול (S&OP) עם SAP IBP",
    publisher: "SAP PRESS",
    module: "IBP",
    pages: 923,
    summaryEn: "Sales & Operations Planning on SAP Integrated Business Planning: the IBP model, demand planning, unconstrained and constrained supply planning, consolidation and configuration.",
    summaryHe: "תכנון מכירות ותפעול על פלטפורמת SAP IBP: מודל ה-IBP וניווט, תכנון ביקושים, תכנון אספקה חסום ובלתי-חסום, קונסולידציה וקונפיגורציה — שכבת התכנון האסטרטגי מעל ה-PP-PI.",
    chapters: [
      { n: 1, en: "Introduction to Sales and Operations Planning", he: "מבוא לתכנון מכירות ותפעול (S&OP)", page: 23 },
      { n: 2, en: "SAP IBP Model and Navigation", he: "מודל SAP IBP וניווט", page: 51 },
      { n: 3, en: "Demand Planning", he: "תכנון ביקושים", page: 89 },
      { n: 4, en: "Unconstrained Supply Planning", he: "תכנון אספקה בלתי-חסום", page: 137 },
      { n: 5, en: "Constrained Supply Planning", he: "תכנון אספקה חסום", page: 181 },
      { n: 6, en: "Consolidation", he: "קונסולידציה", page: 225 },
    ],
  },
  {
    id: "warehouse-management",
    title: "Integrating Warehouse Management in SAP S/4HANA",
    titleHe: "אינטגרציית ניהול מחסן (WM/EWM) ב-SAP S/4HANA",
    publisher: "SAP PRESS",
    module: "WM",
    pages: 1341,
    summaryEn: "Integrating SAP S/4HANA Extended Warehouse Management with surrounding processes — transportation, automation, yard logistics, EHS and plant maintenance. (Chapter abstracts extracted from the source.)",
    summaryHe: "אינטגרציה של ניהול מחסן מורחב (EWM) ב-S/4HANA עם תהליכים סובבים — הובלה, אוטומציה, לוגיסטיקת חצר, בטיחות וסביבה (EHS) ואחזקת מפעל. (תקצירי הפרקים חולצו ישירות מהספר.)",
    chapters: [
      { n: 1, en: "Introductory chapter — thorough orientation to integrated warehouse management.", he: "פרק מבוא — התמצאות מקיפה בניהול מחסן משולב.", page: 1 },
      { n: 4, en: "Guidance on integration with SAP Transportation Management (SAP TM).", he: "אינטגרציה עם ניהול תחבורה (SAP TM).", page: 1 },
      { n: 6, en: "Warehouse automation components and how they integrate.", he: "רכיבי אוטומציית מחסן ואופן השתלבותם.", page: 1 },
      { n: 7, en: "Yard logistics — overview, functions and integration.", he: "לוגיסטיקת חצר (Yard Logistics) — סקירה, פונקציות ואינטגרציה.", page: 1 },
      { n: 8, en: "SAP EHS Management and its key capabilities.", he: "ניהול בטיחות וסביבה (SAP EHS) ויכולותיו המרכזיות.", page: 1 },
      { n: 9, en: "Integration of plant maintenance with warehouse processes.", he: "אינטגרציה של אחזקת מפעל עם תהליכי המחסן.", page: 1 },
    ],
  },
  {
    id: "bridge-foundation",
    title: "SAP S/4HANA Bridge Module — Consultant Foundation",
    titleHe: "מודול גשר ל-SAP S/4HANA — יסודות הייעוץ",
    publisher: "ZaranTech",
    module: "Foundation",
    pages: 193,
    summaryEn: "A 'Week 0' foundation for new SAP S/4HANA consultants: how enterprises and processes work, why ERP exists, the SAP ecosystem, landscapes, navigation and the consultant role.",
    summaryHe: "בסיס 'שבוע 0' ליועצי S/4HANA מתחילים: כיצד עובדים תהליכים ארגוניים, מדוע ERP קיים, מערכת ה-SAP, נופי מערכת, ניווט ותפקיד היועץ — מבוא מצוין לחברי צוות חדשים ב-Project NEO.",
    chapters: [
      { n: 1, en: "Understanding Modern Enterprises and Business Functions", he: "הבנת ארגונים מודרניים ופונקציות עסקיות", page: 1 },
      { n: 2, en: "From Functions to Business Processes", he: "מפונקציות לתהליכים עסקיים", page: 1 },
      { n: 3, en: "Why ERP Exists and What Problems It Solves", he: "מדוע ERP קיים ואילו בעיות הוא פותר", page: 1 },
      { n: 4, en: "ERP Concepts and the SAP Ecosystem", he: "מושגי ERP ומערכת ה-SAP", page: 1 },
      { n: 5, en: "System Landscapes, Clients, and Project Roles", he: "נופי מערכת, Clients ותפקידים בפרויקט", page: 1 },
      { n: 6, en: "SAP GUI and SAP Fiori — Navigating the SAP World", he: "SAP GUI ו-SAP Fiori — ניווט בעולם ה-SAP", page: 1 },
      { n: 7, en: "SAP Terminology and Structures for New Consultants", he: "מינוח ומבנים ב-SAP ליועצים חדשים", page: 1 },
      { n: 8, en: "From End User to Implementation Consultant", he: "ממשתמש קצה ליועץ מיישם", page: 1 },
      { n: 9, en: "Learning Strategy, Readiness Check, and Next Steps", he: "אסטרטגיית למידה, מבחן מוכנות וצעדים הבאים", page: 1 },
    ],
  },
];

// Attach the real extracted English body + authored Hebrew translation to
// every chapter (deep ingestion — see scripts/extract-book-content.mjs).
import CONTENT_EN from "./library-content.json";
import { CONTENT_HE } from "./library-content-he";

for (const book of LIBRARY) {
  const en = (CONTENT_EN as Record<string, Record<string, string>>)[book.id] ?? {};
  const he = CONTENT_HE[book.id] ?? {};
  for (const ch of book.chapters) {
    ch.bodyEn = en[String(ch.n)] ?? "";
    ch.bodyHe = he[ch.n] ?? "";
  }
}

export const LIBRARY_STATS = {
  books: LIBRARY.length,
  pages: LIBRARY.reduce((n, b) => n + b.pages, 0),
  chapters: LIBRARY.reduce((n, b) => n + b.chapters.length, 0),
};
