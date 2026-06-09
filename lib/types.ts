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

export interface SAPTable {
  id: string; // `${module}:${tableName}` — stable localStorage key
  module: Module;
  topicIdx: number;
  topicTitle: string;
  tableName: string; // src.name
  descriptionHe: string; // src.he
  descriptionEn: string; // src.en
  tcodes: string; // src.tcodes (raw, as authored)
  sqlJoinSnippet: string; // src.join (real JOIN syntax, may be multiline)
  guideHe: string; // src.guide
  s4Note: string; // src.s4 (S/4HANA simplification note)
  helpUrl?: string;
  helpLbl?: string;
  funcs: [string, string][]; // BAPIs / function modules [name, he-desc]
  progs: [string, string][]; // programs [name, he-desc]
  fields: SAPField[];
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

export interface SAPModuleData {
  module: Module;
  title: string;
  topics: SAPTopic[];
  joins: SAPJoin[];
  tcodesDir: string[][]; // T-code directory (tuple rows; column count varies by module)
  tools?: string[][]; // PP-PI: implementer tools_dir
  ppvs?: string[][]; // PP-PI: production-version comparison rows
  simplification?: unknown; // PM: S/4 simplification list (kept verbatim)
  config?: unknown; // PM: customizing/config (kept verbatim)
  statuses: string[];
}
