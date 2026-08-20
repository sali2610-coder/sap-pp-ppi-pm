// Project NEO · NEO ERD — the payload shape and its presentation vocabulary.
//
// CLIENT SAFE. No data import, no node builtin, no React. This is the contract
// between the build-time catalogue (erd-catalog.ts, server only) and the
// workspace (erd-workspace.tsx, "use client"), so the browser can hold the
// types and the labels without ever pulling the SAP datasets into its bundle.
//
// COLOUR, per the form rule in app/globals.css above --mod-pm
//   MODULE is only ever surface tint, ring, line, edge or section marker. Every
//   entry below is a `var(--mod-*)` reference and never a literal hex, so the
//   two themes stay the globals' business. app/globals.css defines ten of these
//   tokens; the eight this route needs and globals does not declare are defined
//   in app/neo/erd.css, scoped to .ne, and are never redeclared here.

export type ModCode =
  | "PP"
  | "PP-PI"
  | "PM"
  | "MM"
  | "SD"
  | "QM"
  | "FI"
  | "CO"
  | "CS"
  | "BATCH"
  | "CLASS"
  | "IDOC"
  | "PIPO";

/** Reading order: logistics, then finance, then cross-application, then
 *  integration. The ORDER is presentation. The MEMBERSHIP behind each code is
 *  ERD_MODULES in app/sap-infrastructure/meta.ts, read verbatim. */
export const MODULE_ORDER: ModCode[] = [
  "PP",
  "PP-PI",
  "PM",
  "MM",
  "SD",
  "QM",
  "FI",
  "CO",
  "CS",
  "BATCH",
  "CLASS",
  "IDOC",
  "PIPO",
];

/* MODULE COLOUR IS THE OLD ERD'S, NOT A NEW ONE.
   The graph used to map modules onto the product's --mod-* tokens, which the
   NEO palette had already re-tuned for its own surfaces: PM resolved to teal
   #0f766e and PP-PI to blue #1d4ed8. The old production ERD paints PM ORANGE
   and PP-PI VIOLET, so a reader who knows the old graph could no longer
   recognise a module before reading its label — which is the whole job of
   module colour on a technical graph.

   These are the exact values out of public/sap-infrastructure/dataset.json,
   the palette the old ERD itself reads. They are NOT guessed and NOT re-derived.
   Scoped to the ERD via --erd-mod-* so Home and the module workspaces keep
   their own art direction; erd.css declares the literals. */
export const MOD_VAR: Record<string, string> = {
  PP: "var(--erd-mod-pp)",
  "PP-PI": "var(--erd-mod-pppi)",
  PM: "var(--erd-mod-pm)",
  MM: "var(--erd-mod-mm)",
  SD: "var(--erd-mod-sd)",
  QM: "var(--erd-mod-qm)",
  FI: "var(--erd-mod-fi)",
  CO: "var(--erd-mod-co)",
  CS: "var(--erd-mod-cs)",
  BATCH: "var(--erd-mod-batch)",
  CLASS: "var(--erd-mod-class)",
  IDOC: "var(--erd-mod-idoc)",
  PIPO: "var(--erd-mod-pipo)",
  HR: "var(--erd-mod-hr)",
  BW: "var(--erd-mod-bw)",
};

/** Module hue as a CSS var reference. Falls back to neutral ink — never to
 *  brand red, which is the global accent and never a data category. */
export const modVar = (m?: string): string => (m && MOD_VAR[m]) || "var(--ink-3)";

export type RelKind = "1-1" | "n-1" | "n-n" | "unstated";

export const REL_HE: Record<RelKind, string> = {
  "1-1": "1:1",
  "n-1": "N:1",
  "n-n": "N:N",
  unstated: "עוצמה לא מצוינת",
};

export const REL_ORDER: RelKind[] = ["1-1", "n-1", "n-n", "unstated"];

export const ZONE_HE: Record<string, string> = {
  Master: "נתוני אב",
  Transaction: "נתוני תנועה",
  Shared: "אובייקט משותף",
  Finance: "שכבת פיננסים",
  Integration: "שכבת אינטגרציה",
};

/** The progressive ladder. Nothing dumps every node at once: the overview is 13
 *  module nodes, a module is its curated ERD, a group narrows to one topic or
 *  one business object, and a table is the ego view plus the detail panel. */
export type Level = "overview" | "module" | "group" | "table";

export const LEVEL_HE: Record<Level, string> = {
  overview: "סקירה",
  module: "מודול",
  group: "נושא · אובייקט",
  table: "טבלה",
};

/* ------------------------------------------------------- analysis lenses

   PORTED, in behaviour, from the production Architecture Explorer's MODES
   strip (app/sap-infrastructure/page.tsx, read-only). The five questions are
   the same five questions; the wording and the surface are NEO's.

   Each lens is answered from the SAME modelled relation set the graph already
   draws. Nothing here invents a direction: an edge is parent→child because the
   dataset wrote it with a `role`, and "upstream" is simply that arrow read
   backwards. Where a lens has no evidence to work from the strip disables it
   and says so, rather than drawing an empty or a guessed picture. */

export type Analysis = "focus" | "dep" | "lineage" | "impact" | "flow";

export interface AnalysisDef {
  id: Analysis;
  he: string;
  en: string;
  /** What the lens answers, in one sentence, in the reader's language. */
  d: string;
  /** false only for the business-flow lens, which reads the module's own
   *  ordered object chain and therefore needs no table selected. */
  needsSel: boolean;
}

export const ANALYSIS: AnalysisDef[] = [
  {
    id: "focus",
    he: "מיקוד",
    en: "Focus",
    d: "מדגיש את הטבלה שנבחרה ואת שכנותיה הישירות (אב + צאצא) ומעמעם את השאר. הגרף אף פעם לא נעלם.",
    needsSel: true,
  },
  {
    id: "dep",
    he: "תלויות",
    en: "Dependencies",
    d: "כל שרשרת התלויות של הטבלה, מעלה ומטה, לאורך המודל כולו, לפי הקשרים שהמילון מתעד.",
    needsSel: true,
  },
  {
    id: "lineage",
    he: "שושלת",
    en: "Lineage",
    d: "מאיפה הנתונים מגיעים: כל הטבלאות שנמצאות במעלה הזרם ומחזיקות את המפתח הראשי.",
    needsSel: true,
  },
  {
    id: "impact",
    he: "השפעה",
    en: "Impact",
    d: "מה יושפע משינוי בטבלה: כל מה שנמצא במורד הזרם ומחזיק אליה מפתח זר. הכרעות S/4HANA מסומנות היכן שהפרויקט מחזיק אותן.",
    needsSel: true,
  },
  {
    id: "flow",
    he: "זרימה עסקית",
    en: "Business Flow",
    d: "כיוון הזרימה לאורך שרשרת האובייקטים העסקיים של המודול, כפי שהיא רשומה בפרויקט. פעיל גם ללא בחירת טבלה.",
    needsSel: false,
  },
];

/* ------------------------------------------------------------ S/4 standing

   Resolved at BUILD time by lib/s4.ts (the same resolver the production
   Architecture Explorer calls) and shipped as a flat record, so the browser
   never pulls data/s4-impact into its bundle. `t` is the trust the project
   itself declares: verified = the maintained Simplification-List knowledge,
   partial = derived from the dictionary's own S/4 column, and a table with no
   standing at all carries NO record here — the UI then says
   "לא קיים מידע מאומת בפרויקט" instead of guessing. */

export interface ErdS4 {
  /** Risk, verbatim from the resolver. */
  r: "high" | "medium" | "low";
  t: "verified" | "partial" | "needs";
  /** What changed, verbatim. */
  ch: string;
  /** Why it matters, verbatim. "" when the record does not say. */
  wy: string;
  /** SAP Note / Simplification reference, verbatim. "" when absent. */
  nt: string;
  /** Field names the record marks as affected. */
  fl: string[];
}

export const S4_RISK_HE: Record<ErdS4["r"], string> = {
  high: "סיכון גבוה",
  medium: "סיכון בינוני",
  low: "יציב",
};

export const S4_TRUST_HE: Record<ErdS4["t"], string> = {
  verified: "מאומת בפרויקט",
  partial: "חלקי · נדרש אימות SAP",
  needs: "נדרש אימות SAP",
};

/* --------------------------------------------------------------- the shape */

export interface ErdTable {
  n: string;
  he: string;
  en: string;
  m: ModCode;
  ms: ModCode[];
  z: string;
  o: string;
  f: [string, string, string, string][];
  fn: number;
  pk: string[];
  fk: string[];
  d: number;
  tc: string[];
  fi: string;
  s4: string;
  s4a: string;
  fu: string[];
  cds: string[];
  tp: string;
  g: string;
  pg: 0 | 1;
  r: 0 | 1;
  /** The project's S/4HANA standing for this table, or null where it holds
   *  none. Never a placeholder — null is the honest answer and the UI prints
   *  it as one. */
  s4v: ErdS4 | null;
}

export interface ErdEdgeOut {
  i: string;
  p: string;
  c: string;
  k: RelKind;
  cd: string;
  ds: string;
  x: 0 | 1;
  j: { m: string; j: string; d: string; pk: string; fk: string }[];
}

export interface ErdModuleOut {
  code: ModCode;
  he: string;
  en: string;
  purpose: string;
  core: string[];
  more: string[];
  reports: string[];
  flow: { he: string; en: string }[];
  objects: { he: string; en: string; t: string[] }[];
  topics: { t: string; ta: string[] }[];
  /** Two solved pictures, so switching between the curated ERD and the whole
   *  module is a change of PICTURE and never a graph with holes in it. Both are
   *  build-time dagre output; neither is re-solved in the browser. */
  pos: { n: string; x: number; y: number }[];
  w: number;
  h: number;
  posAll: { n: string; x: number; y: number }[];
  wAll: number;
  hAll: number;
  es: string[];
  ec: string[];
}

export interface ErdOverviewOut {
  pos: { code: ModCode; x: number; y: number }[];
  w: number;
  h: number;
  links: { a: ModCode; b: ModCode; n: number }[];
}

export interface ErdCatalog {
  tables: ErdTable[];
  edges: ErdEdgeOut[];
  modules: ErdModuleOut[];
  overview: ErdOverviewOut;
  shared: string[];
  nw: number;
  nh: number;
  mw: number;
  mh: number;
  stats: {
    modules: number;
    memberships: number;
    tables: number;
    edges: number;
    stated: number;
    unstated: number;
    cross: number;
    shared: number;
    isolated: number;
    withJoin: number;
    pages: number;
    /** Tables the project holds an S/4HANA standing for, and of those, the
     *  subset it marks as verified rather than derived. */
    s4known: number;
    s4verified: number;
  };
}
