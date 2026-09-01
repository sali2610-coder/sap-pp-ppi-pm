/* ============================================================================
   PROJECT NEO · EVIDENCE FOUNDATION — the rule engine.
   ----------------------------------------------------------------------------
   PURE MODULE (type imports only; see types.ts header). Used by the three
   evidence tests AND by scripts/report-coverage.mjs, so a rule exists once.

   It generalises scripts/check-bapi-consistency.mjs ("verified requires a
   source", the 6–7 digit SAP Note format) to every catalog, and adds the rules
   the plan names: no dangling xref, no duplicate id, canonical id syntax, no
   placeholder text, no certainty language on an unverified claim, allowlisted
   URL domains, a successor wherever a status demands one.

   The id helpers below are a second copy of lib/evidence/canonical.ts. That is
   deliberate: a pure module cannot import a sibling by value (see types.ts).
   test/s4-status.test.ts asserts `validId` and `isValidId` agree.
   ========================================================================== */

import type {
  BestPracticeLike, CanonicalId, CanonicalKind, Edition, Evidence, RegistryEntry,
  S4Status, VerificationLevel, VerificationRecord,
} from "./types";
import type { Catalog, DepthLevel } from "./depth";

/* ------------------------------------------------------------ constants */

export type RuleId =
  | "no-source" | "status-no-edition-release" | "replacement-no-successor" | "fiori-no-id-or-url"
  | "cds-no-release-context" | "fm-released-no-official" | "dangling-xref" | "duplicate-id" | "bad-id-syntax"
  | "placeholder" | "certainty-language" | "url-domain" | "sap-note-format" | "alias-collision";

export const RULES: readonly RuleId[] = [
  "no-source", "status-no-edition-release", "replacement-no-successor", "fiori-no-id-or-url",
  "cds-no-release-context", "fm-released-no-official", "dangling-xref", "duplicate-id", "bad-id-syntax",
  "placeholder", "certainty-language", "url-domain", "sap-note-format", "alias-collision",
] as const;

export interface Universe { ids: Set<string>; aliases: Map<string, CanonicalId> }
export interface Problem { rule: RuleId; id: string; detail: string }

export const URL_ALLOWLIST: readonly string[] = [
  "help.sap.com", "api.sap.com", "fioriappslibrary.hana.ondemand.com", "fal.cloud.sap",
  "me.sap.com", "support.sap.com", "launchpad.support.sap.com",
] as const;

/** The only hosts an sap_official_verified claim may cite. */
export const OFFICIAL_DOMAINS: readonly string[] = [
  "help.sap.com", "api.sap.com", "fioriappslibrary.hana.ondemand.com", "fal.cloud.sap",
] as const;

/** Allowed only when the evidence is not sap_official_verified. */
export const TIER3_DOMAINS: readonly string[] = ["community.sap.com"] as const;

export const CERTAINTY_RE: readonly RegExp[] = [
  /\b(always|never|guaranteed|definitely|certainly|fully supported|officially)\b/i,
  /(תמיד|לעולם לא|בוודאות|ללא ספק|מובטח|נתמך במלואו|באופן רשמי)/,
] as const;

export const PLACEHOLDER_RE: RegExp = /\b(TODO|TBD|FIXME|lorem|xxx)\b|\?\?\?|בקרוב|למלא|placeholder|^\s*$/i;

/** Same rule as scripts/check-bapi-consistency.mjs. */
export const SAP_NOTE_RE: RegExp = /^\d{6,7}$/;

const NEEDS_SUCCESSOR: readonly S4Status[] = ["replaced", "deprecated", "not_available"] as const;
const OFFICIAL_SOURCE: readonly string[] = ["fiori_library", "sap_help"] as const;
const API_SOURCE: readonly string[] = ["sap_api_hub", "sap_help"] as const;

/* --------------------------------------------- id helpers (second copy) */

const KINDS: readonly CanonicalKind[] = [
  "table", "tx", "fm", "idoc:msg", "idoc:basic", "cds", "fiori",
  "enh:badi", "enh:exit", "enh:technique", "obj", "bp",
] as const;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SYNTAX: Record<CanonicalKind, RegExp> = {
  table: /^[A-Z0-9_\/]{2,30}$/,
  tx: /^[A-Z0-9_\/]{2,20}$/,
  fm: /^[A-Z0-9_\/]{3,30}$/,
  "idoc:msg": /^[A-Z0-9_]{3,30}$/,
  "idoc:basic": /^[A-Z0-9_]{3,28}\d{2}$/,
  cds: /^[A-Z][A-Za-z0-9_]{2,60}$/,
  fiori: /^[FW]\d{4}[A-Z]?$/,
  "enh:badi": /^[A-Z0-9_\/]{3,40}$/,
  "enh:exit": /^[A-Z0-9_\/]{3,40}$/,
  "enh:technique": SLUG,
  obj: SLUG,
  bp: SLUG,
};

function parse(id: string): { kind: CanonicalKind; name: string } | null {
  if (typeof id !== "string") return null;
  for (const kind of KINDS) {
    const p = `${kind}:`;
    if (id.startsWith(p)) { const name = id.slice(p.length); return name ? { kind, name } : null; }
  }
  return null;
}
const cleanFunc = (name: string): string =>
  (name || "").split(/\s*[/(]|\s+-\s/)[0].trim().replace(/[^A-Za-z0-9_]+$/, "");
const slugify = (s: string): string =>
  (s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function normalize(kind: CanonicalKind, raw: string): string {
  const s = (raw || "").trim();
  switch (kind) {
    case "fm": return cleanFunc(s);
    case "cds": return s;
    case "enh:technique": case "obj": case "bp": return slugify(s);
    default: return s.toUpperCase();
  }
}
/** Equivalent of canonical.ts isValidId (held equal by test). */
export const validId = (id: string): boolean => { const p = parse(id); return !!p && SYNTAX[p.kind].test(p.name); };

/* -------------------------------------------------------------- universe */

export function buildUniverse(parts: {
  manifest: { objects: readonly string[]; tcodes: readonly string[]; bapiFm: readonly string[]; idocs: readonly string[]; cds: readonly string[] };
  fioriIds: string[];
  exitNames: { name: string; kind: string }[];
  techniqueSlugs: string[];
  registry: RegistryEntry[];
  bpSlugs: string[];
}): Universe {
  const ids = new Set<string>();
  for (const n of parts.manifest.objects) ids.add(`table:${n}`);
  for (const n of parts.manifest.tcodes) ids.add(`tx:${n.toUpperCase()}`);
  for (const n of parts.manifest.bapiFm) ids.add(`fm:${n}`);
  for (const n of parts.manifest.idocs) ids.add(`idoc:msg:${n.toUpperCase()}`);
  for (const n of parts.manifest.cds) ids.add(`cds:${n}`);
  for (const n of parts.fioriIds) ids.add(`fiori:${n.toUpperCase()}`);
  for (const e of parts.exitNames) {
    const kind = e.kind === "BAdI" || e.kind === "Enhancement Spot" ? "enh:badi" : "enh:exit";
    ids.add(`${kind}:${e.name.toUpperCase()}`);
  }
  for (const s of parts.techniqueSlugs) ids.add(`enh:technique:${s}`);
  for (const r of parts.registry) ids.add(r.id);
  for (const s of parts.bpSlugs) ids.add(`bp:${s}`);
  return { ids, aliases: new Map() };
}

/** Exact id, then the kind-normalised form, then the alias map. */
export function resolveId(u: Universe, id: string): CanonicalId | null {
  if (u.ids.has(id)) return id as CanonicalId;
  const p = parse(id);
  if (p) {
    const norm = `${p.kind}:${normalize(p.kind, p.name)}`;
    if (u.ids.has(norm)) return norm as CanonicalId;
    const a = u.aliases.get(norm);
    if (a) return a;
  }
  return u.aliases.get(id) ?? null;
}

/** Registers every record's aliases on the universe; returns collisions. */
export function addAliases(u: Universe, records: VerificationRecord[]): Problem[] {
  const out: Problem[] = [];
  for (const r of records) {
    for (const raw of r.aliases || []) {
      const p = parse(r.id);
      const key = p ? `${p.kind}:${normalize(p.kind, raw)}` : raw;
      const prev = u.aliases.get(key);
      if (prev && prev !== r.id) out.push({ rule: "alias-collision", id: r.id, detail: `alias "${raw}" already maps to ${prev}` });
      else if (u.ids.has(key) && key !== r.id) out.push({ rule: "alias-collision", id: r.id, detail: `alias "${raw}" equals another record's id ${key}` });
      else u.aliases.set(key, r.id);
    }
  }
  return out;
}

/* --------------------------------------------------------------- helpers */

function levelOfEvidence(evidence: Evidence[]): VerificationLevel {
  if (!evidence || evidence.length === 0) return "verification_required";
  if (evidence.some((e) => (e.conflictingEvidence?.length ?? 0) > 0 || e.verificationLevel === "conflicting_sources")) return "conflicting_sources";
  const rank: Record<VerificationLevel, number> = {
    sap_official_verified: 5, repository_verified: 4, supported_secondary_source: 3,
    legacy_context_only: 2, verification_required: 1, conflicting_sources: 0,
  };
  let best: VerificationLevel = "verification_required";
  for (const e of evidence) if (rank[e.verificationLevel] > rank[best]) best = e.verificationLevel;
  return best;
}

const allEvidence = (list: Evidence[]): Evidence[] =>
  list.flatMap((e) => [e, ...(e.conflictingEvidence ? allEvidence(e.conflictingEvidence) : [])]);

function hostOf(url: string): string | null {
  try { return new URL(url).hostname.toLowerCase(); } catch { return null; }
}

function textRules(id: string, fields: { label: string; text: string | undefined }[], lowTier: boolean, out: Problem[]) {
  for (const f of fields) {
    if (f.text === undefined) continue;
    if (PLACEHOLDER_RE.test(f.text)) out.push({ rule: "placeholder", id, detail: `${f.label}: "${f.text.slice(0, 60)}"` });
    if (lowTier) {
      for (const re of CERTAINTY_RE) {
        const m = re.exec(f.text);
        if (m) { out.push({ rule: "certainty-language", id, detail: `${f.label}: "${m[0]}"` }); break; }
      }
    }
  }
}

function evidenceRules(id: string, evidence: Evidence[], out: Problem[]) {
  for (const e of allEvidence(evidence)) {
    if (e.url) {
      const host = hostOf(e.url);
      if (!host || (!URL_ALLOWLIST.includes(host) && !TIER3_DOMAINS.includes(host))) {
        out.push({ rule: "url-domain", id, detail: `host not allowlisted: ${e.url}` });
      } else if (TIER3_DOMAINS.includes(host) && e.verificationLevel === "sap_official_verified") {
        out.push({ rule: "url-domain", id, detail: `tier-3 host on an official claim: ${e.url}` });
      }
    }
    if (e.verificationLevel === "sap_official_verified") {
      const host = e.url ? hostOf(e.url) : null;
      if (!host || !OFFICIAL_DOMAINS.includes(host)) {
        out.push({ rule: "url-domain", id, detail: `sap_official_verified without an official url (${e.sourceTitle})` });
      }
    }
    for (const [label, num] of [["sapNote", e.sapNote], ["kba", e.kba]] as const) {
      if (num === undefined) continue;
      if (!SAP_NOTE_RE.test(num)) out.push({ rule: "sap-note-format", id, detail: `${label} "${num}" is not 6–7 digits` });
      const viaUrl = !!e.url && /me\.sap\.com\/notes/i.test(e.url);
      if (!viaUrl && !e.repoRef) out.push({ rule: "sap-note-format", id, detail: `${label} ${num} carries neither a me.sap.com/notes url nor a repoRef` });
    }
    if (e.sourceType === "repository" && !e.repoRef) {
      out.push({ rule: "no-source", id, detail: `repository evidence without repoRef (${e.sourceTitle})` });
    }
  }
}

/* --------------------------------------------------------------- records */

export function validateRecords(records: VerificationRecord[], u: Universe): Problem[] {
  const out: Problem[] = [];
  const seen = new Set<string>();
  const local: Universe = { ids: u.ids, aliases: new Map(u.aliases) };
  out.push(...addAliases(local, records));

  for (const r of records) {
    const id = r.id;
    if (seen.has(id)) out.push({ rule: "duplicate-id", id, detail: "id appears twice" });
    seen.add(id);

    if (!validId(id)) out.push({ rule: "bad-id-syntax", id, detail: "record id" });
    for (const x of r.xrefs || []) if (!validId(x)) out.push({ rule: "bad-id-syntax", id, detail: `xref ${x}` });
    const st = r.status;
    if (st?.successor && !validId(st.successor)) out.push({ rule: "bad-id-syntax", id, detail: `successor ${st.successor}` });

    const level = levelOfEvidence(r.evidence);
    const kind = parse(id)?.kind;

    // 1. no-source
    if (r.evidence.length === 0 && st && st.status !== "verification_required") {
      out.push({ rule: "no-source", id, detail: `status "${st.status}" without evidence` });
    }
    // 2. authored status needs edition + release
    if (st && !st.derivedFrom && !["not_applicable", "verification_required"].includes(st.status)) {
      if (!st.edition || !(st.release || "").trim()) out.push({ rule: "status-no-edition-release", id, detail: `authored "${st.status}"` });
    }
    // 3. replacement needs a resolving successor
    if (st && NEEDS_SUCCESSOR.includes(st.status) && st.source !== null) {
      if (!st.successor) out.push({ rule: "replacement-no-successor", id, detail: `"${st.status}" without successor` });
      else if (!resolveId(local, st.successor)) out.push({ rule: "replacement-no-successor", id, detail: `successor ${st.successor} does not resolve` });
    }
    // 4. fiori: id shape + official url, or verification_required
    if (kind === "fiori") {
      const name = parse(id)?.name || "";
      if (!SYNTAX.fiori.test(name)) out.push({ rule: "fiori-no-id-or-url", id, detail: "fiori id shape" });
      const official = r.evidence.some((e) => OFFICIAL_SOURCE.includes(e.sourceType) && !!e.url);
      if (!official && level !== "verification_required") out.push({ rule: "fiori-no-id-or-url", id, detail: `level ${level} without a library/help url` });
    }
    // 5. cds: release context on any decided status
    if (kind === "cds" && st && st.status !== "verification_required") {
      if (!(st.release || "").trim() || !st.edition) out.push({ rule: "cds-no-release-context", id, detail: `"${st.status}" without release/edition` });
    }
    // 6. fm: "released" needs the official API source
    if (kind === "fm" && st) {
      const claimsReleased = st.status === "released_api_available" ||
        (st.status === "unchanged" && !st.derivedFrom && /released|משוחרר/i.test(st.he));
      if (claimsReleased) {
        const ok = r.evidence.some((e) => API_SOURCE.includes(e.sourceType) && !!e.url && e.verificationLevel === "sap_official_verified");
        if (!ok || level !== "sap_official_verified") out.push({ rule: "fm-released-no-official", id, detail: `released claim at level ${level}` });
      }
    }
    // 8/9. text hygiene
    const lowTier = level === "verification_required" || level === "conflicting_sources";
    textRules(id, [
      ...r.evidence.map((e, i) => ({ label: `evidence[${i}].claim`, text: e.claim })),
      { label: "status.he", text: st?.he },
      { label: "status.recommendedAction", text: st?.recommendedAction },
      { label: "notes", text: r.notes },
    ], lowTier, out);
    // 10/11. urls + notes
    evidenceRules(id, r.evidence, out);
    // 13. dangling
    for (const x of r.xrefs || []) if (!resolveId(local, x)) out.push({ rule: "dangling-xref", id, detail: `xref ${x}` });
    if (st?.successor && !resolveId(local, st.successor)) out.push({ rule: "dangling-xref", id, detail: `successor ${st.successor}` });
  }
  return out;
}

/* -------------------------------------------------------------- registry */

export function validateRegistry(entries: RegistryEntry[], u: Universe): Problem[] {
  const out: Problem[] = [];
  const seen = new Set<string>();
  for (const e of entries) {
    if (seen.has(e.id)) out.push({ rule: "duplicate-id", id: e.id, detail: "registry id appears twice" });
    seen.add(e.id);
    if (!validId(e.id)) out.push({ rule: "bad-id-syntax", id: e.id, detail: "registry id" });
    textRules(e.id, [{ label: "he", text: e.he }], false, out);
    let resolving = 0;
    for (const m of e.members || []) {
      if (!validId(m)) out.push({ rule: "bad-id-syntax", id: e.id, detail: `member ${m}` });
      if (resolveId(u, m)) resolving++;
      else out.push({ rule: "dangling-xref", id: e.id, detail: `member ${m}` });
    }
    if (resolving === 0) out.push({ rule: "dangling-xref", id: e.id, detail: "registry entry has no resolving member" });
  }
  return out;
}

/* -------------------------------------------------------- best practices */

export function validateBestPractices(bps: BestPracticeLike[], u: Universe): Problem[] {
  const out: Problem[] = [];
  const seen = new Set<string>();
  for (const b of bps) {
    const id = `bp:${b.slug}`;
    if (seen.has(b.slug)) out.push({ rule: "duplicate-id", id, detail: "slug appears twice" });
    seen.add(b.slug);
    if (!validId(id)) out.push({ rule: "bad-id-syntax", id, detail: "slug" });
    const xrefs = [...b.xrefs, ...b.steps.flatMap((s) => s.xrefs || [])];
    for (const x of xrefs) {
      if (!validId(x)) out.push({ rule: "bad-id-syntax", id, detail: `xref ${x}` });
      else if (!resolveId(u, x)) out.push({ rule: "dangling-xref", id, detail: `xref ${x}` });
    }
    const level = levelOfEvidence(b.evidence);
    // A practice is advice; advice with no source is exactly what this layer forbids.
    if (b.evidence.length === 0) out.push({ rule: "no-source", id, detail: "best practice without evidence" });
    const st = b.status;
    if (st && !st.derivedFrom && !["not_applicable", "verification_required"].includes(st.status)) {
      if (!st.edition || !(st.release || "").trim()) out.push({ rule: "status-no-edition-release", id, detail: `authored "${st.status}"` });
    }
    if (st && NEEDS_SUCCESSOR.includes(st.status) && st.source !== null) {
      if (!st.successor || !resolveId(u, st.successor)) out.push({ rule: "replacement-no-successor", id, detail: `"${st.status}"` });
    }
    const lowTier = level === "verification_required" || level === "conflicting_sources";
    textRules(id, [
      { label: "he", text: b.he },
      { label: "summary", text: b.summary },
      { label: "context", text: b.context },
      ...b.steps.map((s, i) => ({ label: `steps[${i}]`, text: s.he })),
      ...(b.antiPatterns || []).map((s, i) => ({ label: `antiPatterns[${i}]`, text: s })),
      ...(b.checks || []).map((s, i) => ({ label: `checks[${i}]`, text: s })),
      ...b.evidence.map((e, i) => ({ label: `evidence[${i}].claim`, text: e.claim })),
      { label: "notes", text: b.notes },
    ], lowTier, out);
    evidenceRules(id, b.evidence, out);
    if (!(b.lastVerifiedAt || "").trim()) out.push({ rule: "placeholder", id, detail: "lastVerifiedAt empty" });
    if (!(b.reviewer || "").trim()) out.push({ rule: "placeholder", id, detail: "reviewer empty" });
  }
  return out;
}

/* -------------------------------------------------------------- coverage */

export interface CoverageRow {
  catalog: Catalog;
  total: number;
  depth: Record<DepthLevel, number>;
  verified: number;
  verificationRequired: number;
  conflicting: number;
  legacyOnly: number;
  s4Applicable: number;
  editionSpecific: number;
}

const VERIFIED: readonly VerificationLevel[] = ["sap_official_verified", "repository_verified", "supported_secondary_source"] as const;
const NOT_S4: readonly S4Status[] = ["not_applicable", "legacy_ecc_only", "verification_required"] as const;

export function coverageOf(
  catalog: Catalog,
  rows: { id: CanonicalId; depth: DepthLevel; level: VerificationLevel; status: S4Status; edition: Edition }[],
): CoverageRow {
  const row: CoverageRow = {
    catalog, total: rows.length,
    depth: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    verified: 0, verificationRequired: 0, conflicting: 0, legacyOnly: 0, s4Applicable: 0, editionSpecific: 0,
  };
  for (const r of rows) {
    row.depth[r.depth] += 1;
    if (VERIFIED.includes(r.level)) row.verified += 1;
    if (r.level === "verification_required") row.verificationRequired += 1;
    if (r.level === "conflicting_sources") row.conflicting += 1;
    if (r.status === "legacy_ecc_only") row.legacyOnly += 1;
    if (!NOT_S4.includes(r.status)) row.s4Applicable += 1;
    if (r.edition === "private-cloud" || r.edition === "public-cloud") row.editionSpecific += 1;
  }
  return row;
}
