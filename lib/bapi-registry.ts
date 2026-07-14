// ============================================================================
// Phase 15.1 — Canonical BAPI / Function Module registry (single source of truth)
//
// One record per canonical object. Derived HONESTLY from the existing verified
// dataset (ALL_TABLES[].funcs — real objects referenced by real PM/PP-PI tables).
// NOTHING is invented: any field we don't actually know is left "unknown" and the
// record is marked verificationStatus:"requires-verification" / confidence:"derived".
// Enrichment + system/doc verification happens per-module in 15.2 (PM) and 15.3
// (PP-PI); pages must read from THIS registry, never from parallel lists.
// ============================================================================

import { ALL_TABLES } from "@/data/sapData";
import { cleanFunc, classifyFunc, type FuncKind } from "@/lib/object-intel";
import { PM_ENRICHMENT, PM_ADDITIONS } from "@/data/bapi-enrichment.pm";
import { PPPI_ENRICHMENT, PPPI_ADDITIONS } from "@/data/bapi-enrichment.pppi";

// The registry spans more than the two documented portals (cross-application
// objects like BAPI_TRANSACTION_COMMIT live in Basis). PM/PP-PI are the subset
// used by the derived records.
export type RegistryModule = "PM" | "PP-PI" | "MM" | "SD" | "FI" | "CO" | "QM" | "WM" | "EWM" | "CS" | "HR" | "Basis" | "Cross-Application";

export type TriState = "yes" | "no" | "unknown";
export type VerificationStatus =
  | "verified-system"        // inspected in the target SAP system (SE37 / BAPI Explorer)
  | "verified-docs"          // confirmed in official SAP Help / released-API catalog
  | "requires-verification"  // derived from project data; not yet system/doc-confirmed
  | "version-dependent"      // exists but behaviour differs by release
  | "internal-unsupported"   // internal FM — not a released/callable integration API
  | "invalid-name"           // this exact name is NOT a standard SAP object (verified absent)
  | "deprecated";            // superseded; an alternative is recommended
export type Confidence = "high" | "medium" | "low" | "derived";
export type OperationType = "Read" | "Create" | "Change" | "Delete" | "Post" | "Confirm" | "Mixed" | "Unknown";

export interface SapFuncObject {
  id: string;                       // stable slug = clean technical name
  technicalName: string;
  objectType: FuncKind;             // "BAPI" | "FM" | "IDoc" (regex-derived; flag in UI)
  primaryModule: RegistryModule;
  secondaryModules: RegistryModule[];
  businessProcess: string;          // auto-derived from the owning topic (needs curation)
  operationType: OperationType;     // heuristic from the name (needs curation)
  shortDescriptionHe: string;
  shortDescriptionEn: string;
  longDescriptionHe?: string;
  longDescriptionEn?: string;
  transactions: string[];           // from the owning tables
  tables: string[];                 // owning tables
  businessObject?: string;          // SWO1 BOR object — verify
  relatedObjects: string[];         // sequence / family members — curate in 15.2
  sequence?: string[];              // execution flow (e.g. CREATE → SAVE → COMMIT)
  requiresSave?: TriState;
  requiresCommit?: TriState;
  remoteEnabled?: TriState;
  releasedStatus?: string;
  eccSupport: TriState;
  s4OnPremSupport: TriState;
  cloudSupport: TriState;
  verificationStatus: VerificationStatus;
  verificationSource?: string;
  lastVerified?: string;
  confidence: Confidence;
  aliases: string[];                // raw name variants seen in the dataset
  keywords: string[];
  parameterSummary?: string;
  commonErrors?: string[];
  qaNotes?: string;
}

const stripProc = (t: string) => t.replace(/^\s*\d+\.\s*/, "").replace(/\s*\($/, "").trim();
const splitTc = (s: string) => (s || "").split(/[^A-Za-z0-9_]+/).map((c) => c.trim()).filter((c) => c.length >= 2 && /^[A-Z][A-Z0-9_]*$/i.test(c));

// heuristic operation type from the technical name — auto-derived, curate later
function deriveOp(name: string): OperationType {
  const n = name.toUpperCase();
  const has = (...k: string[]) => k.some((x) => n.includes(x));
  const read = has("GET", "READ", "DETAIL", "LIST", "EXPL", "SELECT", "FIND", "EXISTENCE", "CONVERT", "CONVERSION");
  const create = has("CREATE", "ADD", "_INS", "GENERATE");
  const change = has("CHANGE", "MODIFY", "UPDATE", "MAINTAIN", "SET", "PUT");
  const del = has("DELETE", "_DEL", "CANCEL");
  const post = has("SAVE", "POST", "COMMIT", "GOODSMVT", "MOVEMENT");
  const conf = has("CONF", "CONFIRM");
  const flags = [read, create, change, del, post, conf].filter(Boolean).length;
  if (flags > 1) return "Mixed";
  if (conf) return "Confirm";
  if (post) return "Post";
  if (del) return "Delete";
  if (create) return "Create";
  if (change) return "Change";
  if (read) return "Read";
  return "Unknown";
}

/**
 * Build the canonical registry from the current dataset. Every object is real
 * (referenced by a verified table) but UNVERIFIED as an integration interface —
 * hence requires-verification / confidence:derived until enriched in 15.2/15.3.
 */
export function deriveRegistry(): SapFuncObject[] {
  const map = new Map<string, {
    raw: Set<string>; modules: Map<RegistryModule, number>; procs: Set<string>;
    hes: Set<string>; tables: Set<string>; tcodes: Set<string>;
  }>();

  for (const t of ALL_TABLES) {
    for (const f of t.funcs || []) {
      const key = cleanFunc(f[0]);
      if (!key) continue;
      if (!map.has(key)) map.set(key, { raw: new Set(), modules: new Map(), procs: new Set(), hes: new Set(), tables: new Set(), tcodes: new Set() });
      const r = map.get(key)!;
      r.raw.add(f[0]);
      r.modules.set(t.module, (r.modules.get(t.module) || 0) + 1);
      r.tables.add(t.tableName);
      splitTc(t.tcodes).forEach((c) => r.tcodes.add(c.toUpperCase()));
      // description: prefer the structured he field, else the " - <he>" suffix on the raw name
      const he = (f[1] || "").trim() || (f[0].includes(" - ") ? f[0].split(" - ").slice(1).join(" - ").trim() : "");
      if (he) r.hes.add(he);
    }
  }

  const out: SapFuncObject[] = [];
  for (const [key, r] of map) {
    const mods = [...r.modules.entries()].sort((a, b) => b[1] - a[1]).map((e) => e[0]);
    const kind = classifyFunc(key);
    // internal FMs (non-BAPI, non-standard integration prefix) get a stricter status
    const looksInternal = kind === "FM" && !/^[A-Z]{2,}_/.test(key);
    out.push({
      id: key,
      technicalName: key,
      objectType: kind,
      primaryModule: mods[0],
      secondaryModules: mods.slice(1),
      businessProcess: [...r.procs][0] || "",   // topic-derived at page level; blank here
      operationType: deriveOp(key),
      shortDescriptionHe: [...r.hes][0] || "",
      shortDescriptionEn: "",
      transactions: [...r.tcodes].slice(0, 12),
      tables: [...r.tables],
      relatedObjects: [],
      eccSupport: "unknown",
      s4OnPremSupport: "unknown",
      cloudSupport: "unknown",
      verificationStatus: looksInternal ? "internal-unsupported" : "requires-verification",
      confidence: "derived",
      aliases: [...r.raw].filter((n) => n !== key),
      keywords: [key, ...(([...r.hes][0] || "").split(/\s+/).slice(0, 6))],
    });
  }
  return out.sort((a, b) => a.technicalName.localeCompare(b.technicalName));
}

// one-shot registry = derived base + curated enrichment overlay + verified additions
let _cache: SapFuncObject[] | null = null;
export function registry(): SapFuncObject[] {
  if (_cache) return _cache;
  const byId = new Map(deriveRegistry().map((o) => [o.id, o]));
  for (const [id, patch] of Object.entries({ ...PM_ENRICHMENT, ...PPPI_ENRICHMENT })) {  // curate/verify existing derived records
    const cur = byId.get(id);
    if (cur) byId.set(id, { ...cur, ...patch, id });
  }
  for (const add of [...PM_ADDITIONS, ...PPPI_ADDITIONS]) if (!byId.has(add.id)) byId.set(add.id, add); // verified objects absent from the table refs
  _cache = [...byId.values()].sort((a, b) => a.technicalName.localeCompare(b.technicalName));
  return _cache;
}
export function registryObject(id: string): SapFuncObject | undefined { return registry().find((o) => o.id === id); }
export function registryByModule(m: RegistryModule): SapFuncObject[] { return registry().filter((o) => o.primaryModule === m || o.secondaryModules.includes(m)); }
export function crossModuleObjects(): SapFuncObject[] { return registry().filter((o) => o.secondaryModules.length > 0); }
