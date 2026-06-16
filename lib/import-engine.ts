// SAP Import Engine — ARCHITECTURE ONLY (no live connection). Defines the
// extraction package (which SAP repository objects to export) + parser/mapper
// interfaces that would normalize raw SE16/RFC exports into NEO data files.
// Flip ENABLED + inject an adapter (RFC / sc4sap MCP / file upload) to activate.

export const ENABLED = false;

// ---- Raw source record shapes (mirror real SAP table columns) ----
export interface TSTC_Row { TCODE: string; PGMNA?: string; DYPNO?: string }          // transaction → program/screen
export interface TSTCT_Row { SPRSL: string; TCODE: string; TTEXT: string }            // transaction texts (language)
export interface DD02L_Row { TABNAME: string; TABCLASS: string; AS4LOCAL: string }    // tables (header)
export interface DD03L_Row { TABNAME: string; FIELDNAME: string; KEYFLAG: string; ROLLNAME?: string; DATATYPE?: string; LENG?: string } // fields
export interface TADIR_Row { PGMID: string; OBJECT: string; OBJ_NAME: string; DEVCLASS?: string } // repository objects
export interface SE93_Export { TCODE: string; type: string; program?: string; transaction_variant?: string }

// ---- Extraction package: what to export from SAP (read-only) ----
export interface ExtractItem { source: string; tx: string; selection: string; fields: string; target: string }
export const EXTRACTION_PACKAGE: ExtractItem[] = [
  { source: "TSTC", tx: "SE16 / SE16N → TSTC", selection: "TCODE LIKE 'I%','MD%','CO%','MB%','QA%','SE%' (per scope)", fields: "TCODE, PGMNA, DYPNO", target: "data/tcode-directory.ts (codes + program)" },
  { source: "TSTCT", tx: "SE16N → TSTCT (SPRSL='E','L1')", selection: "all for extracted TCODEs", fields: "SPRSL, TCODE, TTEXT", target: "T-Code titles (he/en)" },
  { source: "DD02L", tx: "SE16N → DD02L (TABCLASS='TRANSP', AS4LOCAL='A')", selection: "by package/module", fields: "TABNAME, TABCLASS", target: "data/sapData.ts (ALL_TABLES headers)" },
  { source: "DD03L", tx: "SE16N → DD03L", selection: "TABNAME IN extracted tables", fields: "TABNAME, FIELDNAME, KEYFLAG, ROLLNAME, DATATYPE, LENG", target: "SAPField[] (keys/types/len)" },
  { source: "TADIR", tx: "SE16N → TADIR", selection: "DEVCLASS in PM/PP/QM packages", fields: "PGMID, OBJECT, OBJ_NAME, DEVCLASS", target: "object lineage + custom-code inventory" },
  { source: "SE93", tx: "SE93 export / TSTCP", selection: "extracted TCODEs", fields: "TCODE, type, program, variant", target: "lifecycle + tcode lineage" },
  { source: "DDLDEPENDENCY", tx: "SE16N (CDS base tables)", selection: "released I_*/C_* views in scope", fields: "DDLNAME, base tables", target: "data/cds-map.ts" },
  { source: "AGR_1251 / USOBT_C", tx: "SUIM / SE16N", selection: "auth objects per tcode (SU24)", fields: "OBJECT, FIELD, default values", target: "authorization intelligence" },
];

// ---- Parser/Mapper contract a future adapter implements ----
export interface ImportParsers {
  parseTSTC(rows: TSTC_Row[], texts: TSTCT_Row[]): { code: string; program?: string; title?: string }[];
  parseTables(headers: DD02L_Row[], fields: DD03L_Row[]): { name: string; fields: { name: string; key: boolean; type?: string; len?: string }[] }[];
  parseSe93(rows: SE93_Export[]): { code: string; program?: string; type: string }[];
  parseTadir(rows: TADIR_Row[]): { object: string; name: string; pkg?: string }[];
}

// Validation step: cross-check imported reality against NEO authored content →
// auto-upgrade trust Verified, flag mismatches (e.g. an "inferred" FM that does not
// exist in TADIR → confirmed RED; one that does → upgrade to Verified).
export interface ImportReport { matched: number; upgraded: number; mismatched: string[]; newObjects: string[] }

export const offlineImportParsers: ImportParsers = {
  parseTSTC() { return []; },
  parseTables() { return []; },
  parseSe93() { return []; },
  parseTadir() { return []; },
};
