/**
 * Fiori Apps knowledge center (P3) — full per-app model.
 *
 * Enriches the existing curated Fiori set (data/centers/fiori.ts) into complete
 * app pages. Reuses the real curated fields (App ID, Role, Catalog, OData, CDS,
 * GUI tcodes) — no fabricated IDs. Authored sections are marked with an honest
 * trust level; nothing is claimed "official" without a stored source, and no SAP
 * Notes are invented. Technical references link to the existing registries.
 */
export type FioriType = "Transactional" | "Analytical" | "Fact Sheet";
export type Trust = "verified-docs" | "curated" | "needs-review";
export type Tri = "yes" | "no" | "unknown";

export interface FioriApp {
  id: string;                 // Fiori ID (e.g. F2731)
  slug: string;               // route slug
  name: string;               // English app name
  he: string;                 // Hebrew name
  module: string;             // PM / PP / PP-PI
  type: FioriType;
  // trust
  trust: Trust;
  source?: string;
  lastReviewed?: string;
  // business
  purpose: string;            // business purpose
  problem: string;            // what problem it solves
  process?: string;           // typical business process (short)
  explain: { beginner: string; consultant: string; technical: string };
  // security / provisioning
  role: string;               // Business Role
  catalog: string;            // Business Catalog
  authObjects?: string[];
  // technical
  odata?: string;
  cds?: string;
  guiTx: string[];            // backend transactions
  relatedTables?: string[];
  relatedObjects?: string[];  // BAPI/FM slugs
  spro?: string;
  // availability
  ecc: string;                // ECC availability note
  s4OnPrem: Tri;
  cloud: Tri;
  releaseInfo?: string;
  // ops
  commonErrors?: string[];
  troubleshooting?: string;
  cbc?: string;               // CBC implementation example
  notes?: { label: string; url?: string }[];  // only real stored sources
  similar?: string[];         // slugs of similar apps
}
