// Canonical registry of the platform "centers" (Phase 5–9 consultant hubs).
// Single source of truth for every navigation surface: the Centers Command Hub
// (desktop mega panel + mobile bottom-sheet), mobile tab bar, command palette,
// knowledge directory and the RelatedCenters cross-link strip.
//
// Metrics are content-derived (real counts from the data arrays) — no invented
// totals. `accent` drives per-center theming in the command hub.
import { Compass, Cable, ShieldCheck, Orbit, LayoutDashboard } from "lucide-react";

export interface CenterMetric { value: string; label: string }
export interface CenterStart { label: string; href: string }
export interface CenterDef {
  id: string;
  href: string;
  he: string;          // short label
  en: string;
  desc: string;        // one-sentence — "enter a department of SAP"
  kw: string;          // search keywords (lowercased english + hebrew)
  Icon: typeof Compass;
  accent: string;      // theme color
  metrics: CenterMetric[];   // 2 meaningful, content-derived metrics
  inside: string[];          // "what's inside" — top topics/technologies
  popular: string[];         // most-referenced topics/objects
  start: CenterStart;        // recommended starting point (deep link)
  updated: string;           // last-updated marker
  isNew?: boolean;           // surfaces a NEW badge
}

export const CENTERS: CenterDef[] = [
  {
    id: "delivery", href: "/delivery/", he: "ניהול פרויקט", en: "Project Delivery",
    desc: "איך פרויקט S/4HANA נמסר בפועל — SAP Activate מקצה לקצה.",
    kw: "delivery מסירה פרויקט project sap activate discover prepare explore realize deploy run cutover blueprint workshop fit-to-standard wave defect",
    Icon: Compass, accent: "#4f46e5",
    metrics: [{ value: "6", label: "שלבי Activate" }, { value: "5", label: "מרכזי מסירה" }],
    inside: ["SAP Activate", "Cutover", "בדיקות", "ניהול פגמים", "Blueprint"],
    popular: ["Fit-to-Standard", "Cutover Plan", "Dress Rehearsal"],
    start: { label: "מתודולוגיית Activate", href: "/delivery/#activate" },
    updated: "Phase 5",
  },
  {
    id: "integration", href: "/integration/", he: "אינטגרציה", en: "Integration",
    desc: "כל טכנולוגיות האינטגרציה של SAP — מ-classic ל-cloud.",
    kw: "integration אינטגרציה ממשק interface idoc ale rfc trfc qrfc pi po cpi cloud integration integration suite odata api event mesh sxmb_moni smq",
    Icon: Cable, accent: "#2563eb",
    metrics: [{ value: "11", label: "טכנולוגיות" }, { value: "6", label: "תקלות מתועדות" }],
    inside: ["IDoc / ALE", "RFC / qRFC", "PI/PO", "CPI", "Event Mesh"],
    popular: ["IDoc 68", "qRFC SMQ2", "CPI iFlow", "RFC SM59"],
    start: { label: "מחזור חיי IDoc", href: "/integration/#idoc" },
    updated: "Phase 6",
  },
  {
    id: "security", href: "/security/", he: "אבטחה והרשאות", en: "Security & Authorizations",
    desc: "הרשאות SAP מקצה לקצה — משתמשים, תפקידים, אבחון ומודל Fiori/IAM.",
    kw: "security אבטחה הרשאות authorization pfcg su01 su53 stauthtrace suim role profile sap_all s_rfc s_tcode s_service derived composite single role business role iam",
    Icon: ShieldCheck, accent: "#0d9488",
    metrics: [{ value: "12", label: "תחומים" }, { value: "7", label: "סביבות עבודה" }],
    inside: ["PFCG", "SU53", "STAUTHTRACE", "אובייקטי הרשאה", "Fiori / IAM"],
    popular: ["SU53 אבחון", "Derived Roles", "S_SERVICE", "SAP_ALL"],
    start: { label: "זרימת אבחון הרשאות", href: "/security/#flow" },
    updated: "Phase 7",
  },
  {
    id: "alm", href: "/alm/", he: "ALM", en: "Application Lifecycle Management",
    desc: "ניהול מחזור החיים — Solution Manager, Focused Build ו-Cloud ALM.",
    kw: "alm application lifecycle solution manager solman focused build cloud alm charm itsm transport stms cts retrofit bpmon rca earlywatch work package release monitoring",
    Icon: Orbit, accent: "#1e3a8a",
    metrics: [{ value: "3", label: "פלטפורמות" }, { value: "6", label: "סוגי ניטור" }],
    inside: ["SolMan 7.2", "Cloud ALM", "ChaRM", "CTS / STMS", "Retrofit"],
    popular: ["ChaRM", "Cloud ALM Ops", "Transport DEV→PRD"],
    start: { label: "מחזור חיים End-to-End", href: "/alm/#lifecycle" },
    updated: "Phase 8",
  },
  {
    id: "fiori", href: "/fiori/", he: "Fiori / UX", en: "Fiori & UX",
    desc: "שכבת ה-UX של SAP — ארכיטקטורה, OData, UI5 ו-RAP.",
    kw: "fiori ux ui5 odata rap cds mvc gateway segw iwfnd iwbep launchpad fact sheet analytical transactional metadata entity set service binding behavior definition fiori elements",
    Icon: LayoutDashboard, accent: "#0e7490",
    metrics: [{ value: "9", label: "מקטעים" }, { value: "6", label: "תקלות נפוצות" }],
    inside: ["ארכיטקטורת Fiori", "OData", "UI5 / MVC", "RAP", "Catalogs / Spaces"],
    popular: ["App not found", "RAP", "Metadata cache", "S_SERVICE"],
    start: { label: "ארכיטקטורת Fiori", href: "/fiori/#arch" },
    updated: "Phase 9", isNew: true,
  },
];

export const centersExcept = (id?: string) => (id ? CENTERS.filter((c) => c.id !== id) : CENTERS);
