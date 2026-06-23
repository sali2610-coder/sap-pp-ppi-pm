// ===== S/4HANA Architecture Maps — ECC vs S/4 enterprise landscape =====
// Real SAP landscape knowledge. Each row pairs an ECC landscape component with
// its S/4HANA successor, with what stays / what's gone / risk and deep links to
// the relevant Transformation-Center sections. trust: curated.

export type ArchStatus = "Replaced" | "Enhanced" | "New" | "Stays";
export interface ArchComp {
  id: string;
  layer: string; layerHe: string;
  ecc: string;            // ECC component (or "—" if new in S/4)
  s4: string;             // S/4 successor
  status: ArchStatus;
  eccDesc: string;        // how it worked in ECC
  s4Desc: string;         // how it works in S/4
  stays: string;          // what remains
  gone: string;           // what disappears / deprecated
  risk: "high" | "medium" | "low";
  links: { label: string; href: string }[];
}

export const ARCH_STATUS: Record<ArchStatus, { he: string; c: string }> = {
  Replaced: { he: "הוחלף", c: "#2563eb" },
  Enhanced: { he: "שודרג", c: "#d97706" },
  New: { he: "חדש", c: "#16a34a" },
  Stays: { he: "נשאר", c: "#64748b" },
};

export const ARCH: ArchComp[] = [
  {
    id: "core", layer: "Core ERP", layerHe: "ליבת ERP",
    ecc: "SAP ECC 6", s4: "SAP S/4HANA", status: "Replaced", risk: "high",
    eccDesc: "ERP על any-DB; מודל נתונים עם טבלאות סיכום/אינדקס וכפילות נתונים.",
    s4Desc: "ERP מותאם-HANA; מודל נתונים רזה, חישוב מצרפים בזמן ריצה, תהליכים חדשים (MRP Live, aATP).",
    stays: "רוב הליבה הפונקציונלית (PP/PM/MM/SD/FI) — אותם תהליכים עסקיים.",
    gone: "טבלאות סיכום/אינדקס רבות, תהליכים מיושנים, חלק מהטרנזקציות.",
    links: [{ label: "מודל נתונים", href: "/sap-infrastructure/" }, { label: "ECC ↔ S/4", href: "/ecc-s4/" }],
  },
  {
    id: "db", layer: "Database", layerHe: "מסד נתונים",
    ecc: "Any-DB (Oracle/DB2/MSSQL)", s4: "SAP HANA", status: "Replaced", risk: "high",
    eccDesc: "מסד נתונים מבוסס-דיסק; אגרגציות מאוחסנות; דיווח על מערכת נפרדת (BW).",
    s4Desc: "מסד In-Memory עמודי; pushdown של לוגיקה ל-DB; דיווח חי על נתוני התפעול.",
    stays: "הנתונים העסקיים; ABAP open SQL.",
    gone: "טבלאות אגרגציה (חישוב on-the-fly); סקירת ביצועים מבוססת-דיסק.",
    links: [{ label: "טבלאות שהשתנו", href: "/ecc-s4/" }],
  },
  {
    id: "ui", layer: "User Experience", layerHe: "חוויית משתמש",
    ecc: "SAP GUI (SAP Logon)", s4: "SAP Fiori (Launchpad)", status: "Enhanced", risk: "medium",
    eccDesc: "מסכי Dynpro/SAP GUI; ניווט מבוסס-טרנזקציות (IW31, CO01...).",
    s4Desc: "Fiori Launchpad מבוסס-תפקיד; אפליקציות Fiori + GUI נתמך לטרנזקציות שאין להן Fiori.",
    stays: "SAP GUI עדיין נתמך; חלק מהטרנזקציות הקלאסיות.",
    gone: "GUI כממשק ראשי; חלק ממסכי ה-Dynpro הוחלפו.",
    links: [{ label: "GUI ← Fiori", href: "/s4hana/#fiori" }],
  },
  {
    id: "gateway", layer: "API / Gateway", layerHe: "שכבת API",
    ecc: "NetWeaver Gateway (Hub)", s4: "Embedded Gateway · OData/RAP", status: "Replaced", risk: "medium",
    eccDesc: "Gateway כשרת hub נפרד; שירותי OData נבנו ידנית.",
    s4Desc: "Gateway מוטמע ב-S/4; שירותי OData נגזרים מ-CDS + RAP; פחות שכבות.",
    stays: "פרוטוקול OData; שירותים קיימים.",
    gone: "שרת Gateway hub נפרד (לרוב); מודל הבנייה הידני הישן.",
    links: [{ label: "אינטגרציות", href: "/s4hana/#integration" }],
  },
  {
    id: "integration", layer: "Integration", layerHe: "אינטגרציה",
    ecc: "SAP PI / PO", s4: "SAP Integration Suite (CPI)", status: "Replaced", risk: "high",
    eccDesc: "Middleware on-prem (PI dual-stack / PO single-stack); iFlows on-prem.",
    s4Desc: "SAP Integration Suite בענן (Cloud Integration / CPI); PO ב-maintenance עד 2027/2030.",
    stays: "IDoc/SOAP/REST channels; לוגיקת מיפוי (להגירה).",
    gone: "PI dual-stack; פיתוח on-prem ארוך-טווח.",
    links: [{ label: "אינטגרציות", href: "/s4hana/#integration" }, { label: "ממשקי PI/PO", href: "/sap-infrastructure/" }],
  },
  {
    id: "analytics", layer: "Analytics & Reporting", layerHe: "אנליטיקה ודיווח",
    ecc: "SAP BW + Extractors", s4: "Embedded Analytics · Datasphere · SAC", status: "Replaced", risk: "medium",
    eccDesc: "BW נפרד; חילוץ דרך Extractors קלאסיים; דיווח לא בזמן אמת.",
    s4Desc: "Embedded Analytics (CDS) לדיווח חי; Datasphere ל-DWC ענן; SAC לדשבורדים; ODP/CDS extraction.",
    stays: "BW/4HANA לתרחישי DWH מורכבים; שאילתות.",
    gone: "Extractors קלאסיים רבים; דיווח BW-only על תפעול.",
    links: [{ label: "מודול BW", href: "/sap-infrastructure/" }],
  },
  {
    id: "alm", layer: "ALM / Operations", layerHe: "ניהול וטיוב",
    ecc: "SAP Solution Manager", s4: "SAP Cloud ALM", status: "Replaced", risk: "low",
    eccDesc: "SolMan on-prem: ניהול פרויקט, תיעוד, ChaRM, ניטור.",
    s4Desc: "Cloud ALM (SaaS) לפרויקטי ענן/היברידי + תפעול; SolMan נתמך עד 2027.",
    stays: "תהליכי ALM (יישום + תפעול).",
    gone: "SolMan on-prem כיעד ארוך-טווח.",
    links: [{ label: "Cutover", href: "/s4hana/#cutover" }],
  },
  {
    id: "mdg", layer: "Master Data", layerHe: "נתוני אב",
    ecc: "—", s4: "SAP MDG (Master Data Governance)", status: "New", risk: "low",
    eccDesc: "ב-ECC: ניהול נתוני אב ידני / כלי MDM חיצוני; ללא ממשל מובנה.",
    s4Desc: "MDG מוטמע ב-S/4: ממשל, אישורים, איכות ושכפול נתוני אב (חומר/ספק/לקוח).",
    stays: "—",
    gone: "—",
    links: [{ label: "מודל נתונים", href: "/sap-infrastructure/" }],
  },
];
