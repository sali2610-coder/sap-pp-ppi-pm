// Canonical registry of the platform "centers" (Phase 5–9 consultant hubs).
// Single source of truth for navigation surfaces: mobile tab bar, command
// palette, knowledge directory and the RelatedCenters cross-link strip.
import { Compass, Cable, ShieldCheck, Orbit, LayoutDashboard } from "lucide-react";

export interface CenterDef {
  id: string;
  href: string;
  he: string;          // short label
  en: string;
  desc: string;        // one-liner for directory / tooltip
  kw: string;          // search keywords (lowercased english + hebrew)
  Icon: typeof Compass;
}

export const CENTERS: CenterDef[] = [
  {
    id: "delivery", href: "/delivery/", he: "ניהול פרויקט", en: "Project Delivery",
    desc: "מתודולוגיית SAP Activate (6 שלבים), Cutover, בדיקות, ניהול פגמים, סדנאות ו-Blueprint.",
    kw: "delivery מסירה פרויקט project sap activate discover prepare explore realize deploy run cutover blueprint workshop fit-to-standard wave defect",
    Icon: Compass,
  },
  {
    id: "integration", href: "/integration/", he: "אינטגרציה", en: "Integration",
    desc: "IDoc/ALE/RFC/tRFC/qRFC, PI/PO, CPI, Integration Suite, OData, APIs, Event Mesh — ארכיטקטורה, זרימה, ניטור ותקלות.",
    kw: "integration אינטגרציה ממשק interface idoc ale rfc trfc qrfc pi po cpi cloud integration integration suite odata api event mesh sxmb_moni smq",
    Icon: Cable,
  },
  {
    id: "security", href: "/security/", he: "אבטחה והרשאות", en: "Security & Authorizations",
    desc: "SU01, PFCG, SU53, STAUTHTRACE, SUIM, אובייקטי הרשאה, פרופילים, תפקידים ומודל Fiori/IAM.",
    kw: "security אבטחה הרשאות authorization pfcg su01 su53 stauthtrace suim role profile sap_all s_rfc s_tcode s_service derived composite single role business role iam",
    Icon: ShieldCheck,
  },
  {
    id: "alm", href: "/alm/", he: "ALM", en: "Application Lifecycle Management",
    desc: "Solution Manager, Focused Build ו-Cloud ALM — מחזור חיים, טרנספורטים (CTS/STMS/Retrofit), שינויים, בדיקות וניטור.",
    kw: "alm application lifecycle solution manager solman focused build cloud alm charm itsm transport stms cts retrofit bpmon rca earlywatch work package release monitoring",
    Icon: Orbit,
  },
  {
    id: "fiori", href: "/fiori/", he: "Fiori / UX", en: "Fiori & UX",
    desc: "ארכיטקטורת Fiori, סוגי אפליקציות, OData (SEGW/IWFND/IWBEP), UI5 (MVC), RAP (CDS/Behavior/Service Binding).",
    kw: "fiori ux ui5 odata rap cds mvc gateway segw iwfnd iwbep launchpad fact sheet analytical transactional metadata entity set service binding behavior definition fiori elements",
    Icon: LayoutDashboard,
  },
];

export const centersExcept = (id?: string) => (id ? CENTERS.filter((c) => c.id !== id) : CENTERS);
