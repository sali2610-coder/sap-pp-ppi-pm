// Live SAP Connector — ARCHITECTURE & INTERFACES ONLY (Phase 7 #9).
// No live connection. Defines the contract for a future read-only connector that
// would enrich/verify NEO content from real SAP repository objects. When an SAP
// system (or sc4sap MCP) is connected, implement SapConnector and flip USE_LIVE.

export const USE_LIVE = false; // never live in the offline static build

// Real SAP source objects the connector would read (read-only):
export interface SapSourceMap {
  tstc: "Transaction codes (TSTC) → tcode-directory / transactions";
  tstct: "Transaction texts (TSTCT) → T-Code titles per language";
  dd02l: "Tables (DD02L) → object/table catalog (ALL_TABLES)";
  dd03l: "Table fields (DD03L) → SAPField list per table";
  se93: "Transaction → program/screen (TSTC/TSTCP) → tcode lineage";
  cdsMetadata: "CDS views + annotations (DDLDEPENDENCY/DD02B) → cds-map";
  fioriCatalogs: "Fiori Business Catalogs/Roles (/UI2, PFCG) → fiori-center";
  tadir: "Repository objects (TADIR) → object lineage";
  enhancements: "BAdIs/Exits (SXS_ATTR/MODSAP) → exits catalog";
}

export interface ConnectorRow { source: string; sapObject: string; neoTarget: string; status: "planned" }
export const CONNECTOR_MAP: ConnectorRow[] = [
  { source: "TSTC + TSTCT", sapObject: "Transaction codes + texts", neoTarget: "data/tcode-directory.ts · data/transactions.ts", status: "planned" },
  { source: "DD02L", sapObject: "Transparent tables", neoTarget: "data/sapData.ts (ALL_TABLES)", status: "planned" },
  { source: "DD03L", sapObject: "Table fields + keys", neoTarget: "SAPField[] per table", status: "planned" },
  { source: "SE93 / TSTCP", sapObject: "Tcode → program/screen", neoTarget: "lifecycle + lineage", status: "planned" },
  { source: "DDLDEPENDENCY", sapObject: "CDS views + base tables", neoTarget: "data/cds-map.ts", status: "planned" },
  { source: "/UI2 + PFCG", sapObject: "Fiori catalogs + roles", neoTarget: "data/centers/fiori.ts", status: "planned" },
  { source: "MODSAP / SXS_ATTR", sapObject: "User exits / BAdIs", neoTarget: "data/exits.ts", status: "planned" },
  { source: "TADIR + GetWhereUsed", sapObject: "Where-used / dependencies", neoTarget: "lib/cross-links.ts (impact)", status: "planned" },
];

// Contract a future adapter (RFC / sc4sap MCP / OData) would implement:
export interface SapConnector {
  listTransactions(): Promise<{ code: string; program?: string; text?: string }[]>;
  getTable(name: string): Promise<{ fields: { name: string; key: boolean; type: string }[] } | null>;
  whereUsed(object: string): Promise<string[]>;
  listCdsViews(): Promise<{ view: string; baseTables: string[] }[]>;
  listFioriCatalogs(): Promise<{ catalog: string; apps: string[] }[]>;
}

// Offline stub — returns nothing; real adapter would be injected when connected.
export const offlineConnector: SapConnector = {
  async listTransactions() { return []; },
  async getTable() { return null; },
  async whereUsed() { return []; },
  async listCdsViews() { return []; },
  async listFioriCatalogs() { return []; },
};
