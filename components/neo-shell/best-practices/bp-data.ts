/* ============================================================================
   PROJECT NEO · /neo/best-practices — BUILD-TIME data.
   ----------------------------------------------------------------------------
   Runs on the SERVER only. The two routes call bpList() / bpDetail() once and
   hand a plain serialisable object to the server views, the same boundary
   every other /neo family keeps.

   HONESTY RULES
     · Every row is a record from data/best-practices. Nothing is authored
       here, and no count is a literal.
     · Every cross-reference resolves through the SAME gates the reference
       directories use (lib/evidence successorHref → ref-links): an id with no
       generated page renders as a value, never as a link, so the dead-link
       crawler cannot see an href with nothing behind it.
     · The practice's own S/4HANA standing is NOT invented: a record that
       carries no authored status claim is handed to evidenceBlock with an
       explicit verification_required claim, so the block says
       «נדרש אימות נוסף» instead of asserting a standing nobody wrote.
   ========================================================================== */

import { BEST_PRACTICES, bpBySlug, type BestPractice } from "@/data/best-practices";
import {
  ACTION_HE,
  VERIFICATION_DOT,
  VERIFICATION_HE,
  evidenceBlock,
  parseId,
  resolvesInApp,
  successorHref,
  type CanonicalId,
  type CanonicalKind,
  type EvidenceBlockData,
  type S4StatusClaim,
} from "@/lib/evidence";
import { MOD_HE } from "../mod-var";

export { bpSlugs } from "@/data/best-practices";

/* ------------------------------------------------------------- vocabulary */

/** UI names for the canonical id kinds. Vocabulary, not SAP data. */
const KIND_HE: Record<CanonicalKind, string> = {
  table: "טבלה",
  tx: "טרנזקציה",
  fm: "אובייקט פונקציה",
  "idoc:msg": "סוג הודעת IDoc",
  "idoc:basic": "IDoc Basic Type",
  cds: "תצוגת CDS",
  fiori: "יישום Fiori",
  "enh:badi": "BAdI",
  "enh:exit": "User Exit",
  "enh:technique": "טכניקת הרחבה",
  obj: "אובייקט עסקי",
  bp: "שיטת עבודה",
};

const moduleHeOf = (m: BestPractice["module"]): string =>
  m === "Cross" ? "חוצה מודולים" : MOD_HE[m] || m;

export const bpHref = (slug: string): string => `/neo/best-practices/${encodeURIComponent(slug)}/`;

/* --------------------------------------------------------------- the claim */

/** The derived claim handed to evidenceBlock for a record with NO authored
 *  status. It is deliberately verification_required: the practice's own
 *  S/4HANA standing was not asserted by anyone, and the block must say so
 *  rather than borrow a standing from the evidence list. */
function derivedClaim(): S4StatusClaim {
  return {
    status: "verification_required",
    he: "רשומת שיטת העבודה אינה נושאת תביעת מעמד S/4HANA עצמאית; קביעת המעמד ממתינה לאימות מול תיעוד SAP רשמי בשלב האיסוף.",
    edition: "on-premise",
    release: null,
    source: null,
    recommendedAction: ACTION_HE.verification_required,
  };
}

/* ------------------------------------------------------------------ shared */

const bpId = (slug: string): CanonicalId => `bp:${slug}`;

/** Every id the practice references, record-level first, deduplicated in
 *  order of appearance. The same union lib/evidence's recordFor() builds. */
const allXrefs = (b: BestPractice): CanonicalId[] =>
  [...new Set([...b.xrefs, ...b.steps.flatMap((s) => s.xrefs ?? [])])];

export interface BpXrefV {
  id: string;
  /** The bare technical name / slug, without the kind prefix. */
  name: string;
  kindHe: string;
  /** A generated page, or null → the view renders a value chip. */
  href: string | null;
  /** true when the id resolves in the app even without a page of its own
   *  (named exits, business objects, IDoc basic types). */
  resolved: boolean;
}

function xrefView(id: CanonicalId): BpXrefV {
  const p = parseId(id);
  return {
    id,
    name: p?.name ?? id,
    kindHe: p ? KIND_HE[p.kind] : "",
    href: successorHref(id),
    resolved: resolvesInApp(id),
  };
}

/* ------------------------------------------------------ the process profile */

/** The brief's per-process fields (design-audit continuation §11), in its
 *  order. Purpose, the steps, the official reference and the cross-links are
 *  rendered by their own sections; the thirteen lists below form the grid. */
const PROFILE_FIELDS: { key: keyof Omit<NonNullable<BestPractice["process"]>, "purpose" | "reference">; label: string }[] = [
  { key: "trigger", label: "טריגר" },
  { key: "preconditions", label: "תנאים מוקדמים" },
  { key: "masterData", label: "נתוני אב" },
  { key: "roles", label: "תפקידים" },
  { key: "transactions", label: "טרנזקציות ויישומי Fiori" },
  { key: "tables", label: "טבלאות ואובייקטים" },
  { key: "integrationPoints", label: "נקודות אינטגרציה" },
  { key: "outputs", label: "תוצרים" },
  { key: "exceptions", label: "חריגים" },
  { key: "controls", label: "בקרות" },
  { key: "kpis", label: "מדדים (KPI)" },
  { key: "eccToS4", label: "שינויים מ-ECC ל-S/4HANA" },
  { key: "migration", label: "השלכות הגירה" },
];

/** The 17 fields the brief lists per process: purpose, the 13 lists, the
 *  step-by-step flow, the official reference and the cross-links. */
export const PROFILE_TOTAL = PROFILE_FIELDS.length + 4;

export interface BpLineV { he: string; xrefs: BpXrefV[] }
export interface BpProfileFieldV { key: string; label: string; lines: BpLineV[] }
export interface BpReferenceV {
  title: string;
  url: string | null;
  levelHe: string;
  levelDot: string;
  official: boolean;
  note: string | null;
}
export interface BpProcessV {
  purpose: string;
  /** Only the fields the record fills, in the brief's order. */
  fields: BpProfileFieldV[];
  /** The labels of the fields the record leaves empty, in the same order. */
  gaps: string[];
  filled: number;
  total: number;
  reference: BpReferenceV | null;
}

/** How many of the brief's 17 fields the record fills. */
function profileCount(b: BestPractice): { filled: number; total: number } | null {
  const pr = b.process;
  if (!pr) return null;
  const lists = PROFILE_FIELDS.filter((f) => (pr[f.key]?.length ?? 0) > 0).length;
  const filled = lists + 1 /* purpose */ + (b.steps.length ? 1 : 0) + (pr.reference ? 1 : 0) + (allXrefs(b).length ? 1 : 0);
  return { filled, total: PROFILE_TOTAL };
}

function processView(b: BestPractice): BpProcessV | null {
  const pr = b.process;
  if (!pr) return null;
  const fields: BpProfileFieldV[] = [];
  const gaps: string[] = [];
  for (const f of PROFILE_FIELDS) {
    const lines = pr[f.key] ?? [];
    if (lines.length) fields.push({ key: f.key, label: f.label, lines: lines.map((l) => ({ he: l.he, xrefs: (l.xrefs ?? []).map(xrefView) })) });
    else gaps.push(f.label);
  }
  if (!b.steps.length) gaps.push("תהליך שלב אחר שלב");
  // A missing official reference already has a rendered place of its own in
  // the profile, so it is not repeated in the gap line.
  if (!allXrefs(b).length) gaps.push("קישורים צולבים");
  const c = profileCount(b)!;
  const r = pr.reference;
  return {
    purpose: pr.purpose,
    fields,
    gaps,
    filled: c.filled,
    total: c.total,
    reference: r
      ? {
          title: r.title,
          url: r.url ?? null,
          levelHe: VERIFICATION_HE[r.verificationLevel],
          levelDot: VERIFICATION_DOT[r.verificationLevel],
          official: r.verificationLevel === "sap_official_verified",
          note: r.note ?? null,
        }
      : null,
  };
}

const blockOf = (b: BestPractice): EvidenceBlockData =>
  evidenceBlock(
    bpId(b.slug),
    derivedClaim(),
    { hasHe: !!b.he, hasEn: !!b.en, structural: b.steps.length },
    "best-practices",
  );

/* ------------------------------------------------------------ the catalog */

export interface BpRow {
  slug: string;
  he: string;
  en: string;
  module: string;
  moduleHe: string;
  summary: string;
  href: string;
  steps: number;
  antiPatterns: number;
  checks: number;
  sources: number;
  /** Official SAP sources with a URL — 0 until the collection phase adds them. */
  officialWithUrl: number;
  xrefs: number;
  /** How many of the xrefs open a generated page. */
  xrefsLinked: number;
  /** How many resolve in the app at all (pages + page-less registries). */
  xrefsResolved: number;
  levelKey: string;
  levelHe: string;
  levelDot: string;
  depth: number;
  depthHe: string;
  needsVerification: boolean;
  /** Present for a process-catalog record: how many of the brief's 17
   *  per-process fields it fills. */
  profile: { filled: number; total: number } | null;
}

function rowOf(b: BestPractice): BpRow {
  const e = blockOf(b);
  const xr = allXrefs(b);
  return {
    profile: profileCount(b),
    slug: b.slug,
    he: b.he,
    en: b.en,
    module: b.module,
    moduleHe: moduleHeOf(b.module),
    summary: b.summary,
    href: bpHref(b.slug),
    steps: b.steps.length,
    antiPatterns: b.antiPatterns?.length ?? 0,
    checks: b.checks?.length ?? 0,
    sources: b.evidence.length,
    officialWithUrl: b.evidence.filter((ev) => ev.verificationLevel === "sap_official_verified" && !!ev.url).length,
    xrefs: xr.length,
    xrefsLinked: xr.filter((x) => successorHref(x) !== null).length,
    xrefsResolved: xr.filter((x) => resolvesInApp(x)).length,
    levelKey: e.level.key,
    levelHe: e.level.he,
    levelDot: e.level.dot,
    depth: e.depth.level,
    depthHe: e.depth.he,
    needsVerification: e.needsVerification,
  };
}

export function bpList(): BpRow[] {
  return BEST_PRACTICES.map(rowOf);
}

/* ------------------------------------------------------------- the record */

export interface BpStepV {
  n: number;
  he: string;
  xrefs: BpXrefV[];
}

export interface BpClaimV {
  title: string;
  /** The exact statement this source supports, from the record itself. */
  claim: string;
  levelHe: string;
  levelDot: string;
  url: string | null;
  repoRef: string | null;
  sapNote: string | null;
}

export interface BpDetail {
  slug: string;
  he: string;
  en: string;
  module: string;
  moduleHe: string;
  summary: string;
  context: string;
  href: string;
  steps: BpStepV[];
  antiPatterns: string[];
  checks: string[];
  xrefs: BpXrefV[];
  evidence: EvidenceBlockData;
  claims: BpClaimV[];
  /** Honest caveats the record carries, verbatim. */
  notes: string | null;
  lastVerifiedAt: string;
  reviewer: string;
  /** The process profile, when the record is a process-catalog entry. */
  process: BpProcessV | null;
}

export function bpDetail(slug: string): BpDetail | null {
  const b = bpBySlug(slug);
  if (!b) return null;
  return {
    process: processView(b),
    slug: b.slug,
    he: b.he,
    en: b.en,
    module: b.module,
    moduleHe: moduleHeOf(b.module),
    summary: b.summary,
    context: b.context,
    href: bpHref(b.slug),
    steps: b.steps.map((s, i) => ({
      n: i + 1,
      he: s.he,
      xrefs: (s.xrefs ?? []).map(xrefView),
    })),
    antiPatterns: b.antiPatterns ?? [],
    checks: b.checks ?? [],
    xrefs: allXrefs(b).map(xrefView),
    evidence: blockOf(b),
    claims: b.evidence.map((ev) => ({
      title: ev.sourceTitle,
      claim: ev.claim,
      levelHe: VERIFICATION_HE[ev.verificationLevel],
      levelDot: VERIFICATION_DOT[ev.verificationLevel],
      url: ev.url ?? null,
      repoRef: ev.repoRef ?? null,
      sapNote: ev.sapNote ?? null,
    })),
    notes: b.notes ?? null,
    lastVerifiedAt: b.lastVerifiedAt,
    reviewer: b.reviewer,
  };
}
