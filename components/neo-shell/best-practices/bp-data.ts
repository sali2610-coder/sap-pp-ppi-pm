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
}

function rowOf(b: BestPractice): BpRow {
  const e = blockOf(b);
  const xr = allXrefs(b);
  return {
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
}

export function bpDetail(slug: string): BpDetail | null {
  const b = bpBySlug(slug);
  if (!b) return null;
  return {
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
