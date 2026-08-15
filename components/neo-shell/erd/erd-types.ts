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

export const MOD_VAR: Record<string, string> = {
  PP: "var(--mod-pp)",
  "PP-PI": "var(--mod-pppi)",
  PM: "var(--mod-pm)",
  MM: "var(--mod-mm)",
  SD: "var(--mod-sd)",
  QM: "var(--mod-qm)",
  FI: "var(--mod-fi)",
  CO: "var(--mod-co)",
  CS: "var(--mod-cs)",
  BATCH: "var(--mod-batch)",
  CLASS: "var(--mod-class)",
  IDOC: "var(--mod-idoc)",
  PIPO: "var(--mod-pipo)",
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
  };
}
