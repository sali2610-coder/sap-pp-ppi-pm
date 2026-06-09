// ===== Project NEO Cockpit — domain model =====
// Superset of the PRD `SAPTable` interface: preserves 100% of the fields
// extracted from the standalone HTML knowledge bases (nothing truncated).

export type Module = "PM" | "PP-PI";

// Exact status values used by the source files (the SC map). Order matters
// for the progress charts (worst -> best).
export const MIGRATION_STATUSES = [
  "Not started",
  "In analysis",
  "In conversion",
  "Tested",
  "Done",
] as const;

export type MigrationStatus = (typeof MIGRATION_STATUSES)[number];

export interface SAPField {
  tech: string; // technical field name (MATNR, EQUNR, ...)
  en: string;
  he: string;
  dt: string; // data type (CHAR, QUAN, ...)
  len: string; // length, e.g. "18->40"
  key: string; // "PK" | "FK" | "-"
}

// Parent-child relationship from the ER / Join Map (e.g. EQUI→EQKT, PLKO→PLPO)
export interface SAPRelation {
  role: "parent" | "child"; // is THIS table the parent (PK) or child (FK)?
  table: string; // the related table
  fkField?: string;
  pkField?: string;
  card?: string; // cardinality e.g. 1:1, N:1
  join: string; // JOIN ON SQL
  desc: string; // Hebrew relationship description
}

export interface SAPTable {
  id: string; // `${module}:${tableName}` — stable localStorage key
  module: Module;
  topicIdx: number;
  topicTitle: string;
  tableName: string;
  descriptionHe: string;
  descriptionEn: string;
  tcodes: string; // ECC transactions (Main & Secondary)
  sqlJoinSnippet: string; // JOIN ON (SQL / CDS) — may be multiline
  guideHe: string; // functional Hebrew explanation
  s4Note: string; // S/4HANA status / gap note
  s4AltTable?: string; // alternative table/field in S/4
  s4AltTcode?: string; // replacement transaction/program in S/4
  sumNote?: string; // SUM conversion note (PM)
  fioriApp?: string; // Fiori app + ID
  helpUrl?: string;
  helpLbl?: string; // SAP Help / Knowledge reference
  funcs: [string, string][]; // BAPIs / FMs / IDocs [name, he-desc] (incl Zetes/Daymax)
  progs: [string, string][]; // programs / reports [name, he-desc]
  fields: SAPField[];
  relations: SAPRelation[]; // parent-child links from the ER map
  migrationStatus: MigrationStatus; // seed default; live value comes from localStorage
}

export interface SAPTopic {
  idx: number;
  module: Module;
  title: string;
  theme?: string;
  tables: SAPTable[];
  ops: {
    tcodes: string[][]; // [tcode, fiori-name, fiori-id?]
    interfaces: string[][]; // [kind(BAPI/IDoc), name, ...] — IDoc rows carry Zetes/Daymax
  };
}

export interface SAPJoin {
  table: string;
  join: string; // SQL JOIN snippet
  he: string;
}

// A generic directory sheet kept verbatim (header + rows) for lossless rendering.
export interface SAPSheet {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface SAPModuleData {
  module: Module;
  title: string;
  topics: SAPTopic[];
  relations: SAPRelation[]; // full ER / Join Map for the module
  joins: SAPJoin[]; // flattened JOIN ON snippets (back-compat)
  tcodesDir?: SAPSheet; // transactions & reports directory
  tools?: SAPSheet; // implementer / Basis toolkit
  ppvs?: SAPSheet; // PP vs PP-PI comparison
  simplification?: SAPSheet; // S/4 simplification item list
  config?: SAPSheet; // configuration guide (SPRO)
  customCode?: SAPSheet; // custom code check (user exits / BAdIs)
  statuses: string[];
}
