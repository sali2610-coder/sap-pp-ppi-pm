/* ============================================================================
   PROJECT NEO · EVIDENCE FOUNDATION — the app-side resolver.
   ----------------------------------------------------------------------------
   APP-SIDE ONLY (`@/` allowed). The one module that merges the verification
   overlays into what a builder derived, and the ONLY place an evidence href is
   emitted. Every link resolves through the same gated helpers in
   components/neo-shell/reference/ref-links.ts that the directories use, so the
   dead-link crawler can never see an href without a generated page behind it.
   Node tests do not load this file; `next build` and report-coverage do.
   ========================================================================== */

import { OVERLAYS, REGISTRY } from "@/data/verification";
import { BEST_PRACTICES, bpBySlug } from "@/data/best-practices";
import { FIORI_APPS } from "@/data/fiori/apps";
import { EXITS } from "@/data/exits";
import {
  bapiHref, cdsHref, enhHref, fioriHref, idocHref, objectHref, txHref,
} from "@/components/neo-shell/reference/ref-links";
import { makeId, nameOf, parseId } from "./canonical";
import { derivedLevel, levelOf, pickStatus } from "./s4-status";
import { depthInputFor, depthOf, successorOkFor, DEPTH_HE, type Catalog, type DepthInput } from "./depth";
import {
  S4_STATUS_DOT, S4_STATUS_HE, VERIFICATION_DOT, VERIFICATION_HE,
  type CanonicalId, type Edition, type EvidenceBlockData, type S4StatusClaim, type VerificationRecord,
} from "./types";

/* ------------------------------------------------------------- overlays */

let _aliases: Map<string, VerificationRecord> | null = null;
function aliasIndex(): Map<string, VerificationRecord> {
  if (_aliases) return _aliases;
  _aliases = new Map();
  for (const r of Object.values(OVERLAYS)) {
    const kind = parseId(r.id)?.kind;
    for (const raw of r.aliases || []) {
      _aliases.set(kind ? makeId(kind, raw) : raw, r);
    }
  }
  return _aliases;
}

/** Exact id, then the kind-normalised form, then the alias map. */
export function overlayFor(id: CanonicalId): VerificationRecord | undefined {
  const exact: VerificationRecord | undefined = OVERLAYS[id];
  if (exact) return exact;
  const p = parseId(id);
  if (p) {
    const norm = makeId(p.kind, p.name);
    const byNorm: VerificationRecord | undefined = OVERLAYS[norm];
    if (byNorm) return byNorm;
    const byAlias = aliasIndex().get(norm);
    if (byAlias) return byAlias;
  }
  return aliasIndex().get(id);
}

/** A best practice carries its own evidence; adapt it to the record shape so
 *  `bp:` ids flow through the same pipeline as every other catalog. */
function recordFor(id: CanonicalId): VerificationRecord | undefined {
  const p = parseId(id);
  if (p?.kind === "bp") {
    const b = bpBySlug(p.name);
    if (!b) return undefined;
    return {
      id,
      status: b.status,
      evidence: b.evidence,
      xrefs: [...b.xrefs, ...b.steps.flatMap((s) => s.xrefs ?? [])],
      reviewer: b.reviewer,
      lastVerifiedAt: b.lastVerifiedAt,
      notes: b.notes,
    };
  }
  return overlayFor(id);
}

/* ----------------------------------------------------------------- links */

const fioriSlugOf = (fioriId: string): string | null =>
  FIORI_APPS.find((a) => a.id.toUpperCase() === fioriId.toUpperCase())?.slug ?? null;

/** The ONLY place an evidence href is emitted. `null` = show as a value. */
export function successorHref(id: CanonicalId): string | null {
  const p = parseId(id);
  if (!p) return null;
  switch (p.kind) {
    case "table": return objectHref(p.name);
    case "tx": return txHref(p.name);
    case "fm": return bapiHref(p.name);
    case "idoc:msg": return idocHref(p.name);
    case "cds": return cdsHref(p.name);
    case "fiori": { const slug = fioriSlugOf(p.name); return slug ? fioriHref(slug) : null; }
    case "enh:technique": return enhHref(p.name);
    case "bp": return bpBySlug(p.name) ? `/neo/best-practices/${encodeURIComponent(p.name)}/` : null;
    // Named exits/BAdIs, business objects and IDoc basic types have no page.
    case "enh:badi": case "enh:exit": case "obj": case "idoc:basic": return null;
  }
}

/** Does this id resolve to something the app really documents? Pages resolve
 *  through the ref-links gates; the page-less kinds resolve through their
 *  registries. */
export function resolvesInApp(id: CanonicalId): boolean {
  const p = parseId(id);
  if (!p) return false;
  switch (p.kind) {
    case "enh:badi": case "enh:exit":
      return EXITS.some((e) => e.name.toUpperCase() === p.name.toUpperCase());
    case "obj": case "idoc:basic":
      return REGISTRY.some((r) => r.id === id);
    case "bp":
      return !!bpBySlug(p.name);
    default:
      return successorHref(id) !== null;
  }
}

/* -------------------------------------------------------- best practices */

/** Reverse index: the practices that concern this object. */
export function bestPracticesFor(id: CanonicalId): { slug: string; he: string; href: string }[] {
  return BEST_PRACTICES
    .filter((b) => b.xrefs.includes(id) || b.steps.some((s) => (s.xrefs ?? []).includes(id)))
    .map((b) => ({ slug: b.slug, he: b.he, href: `/neo/best-practices/${encodeURIComponent(b.slug)}/` }));
}

/* -------------------------------------------------------------- the block */

const maxIso = (dates: (string | undefined)[]): string | null => {
  let out: string | null = null;
  for (const d of dates) if (d && (!out || d > out)) out = d;
  return out;
};

/**
 * Merge the overlay (authored claim + evidence) into the builder's derived
 * claim and measure the record's depth. One Map lookup plus pure computation;
 * safe to call once per generated page.
 */
export function evidenceBlock(
  id: CanonicalId,
  derived: S4StatusClaim,
  facts: Partial<DepthInput>,
  catalog: Catalog,
): EvidenceBlockData {
  const rec = recordFor(id);
  const status = pickStatus(rec?.status, derived);
  const evidence = rec?.evidence ?? [];
  const level = evidence.length ? levelOf(evidence) : derivedLevel(status);

  const xrefs = [...new Set(rec?.xrefs ?? [])];
  const xrefsResolved = xrefs.filter((x) => resolvesInApp(x)).length;
  const officialWithUrl = evidence.filter((e) => e.verificationLevel === "sap_official_verified" && !!e.url).length;
  const lastVerifiedAt = rec?.lastVerifiedAt ?? maxIso(evidence.map((e) => e.lastVerifiedAt));

  const input = depthInputFor(catalog, {
    ...facts,
    status,
    level,
    evidence: evidence.length,
    officialWithUrl,
    xrefsResolved,
    xrefsTotal: xrefs.length,
    lastVerifiedAt,
    successorOk: successorOkFor(status),
  });
  const depth = depthOf(input);

  return {
    id,
    status: {
      key: status.status,
      label: S4_STATUS_HE[status.status],
      he: status.he,
      dot: S4_STATUS_DOT[status.status],
      edition: status.edition,
      release: status.release,
      action: status.recommendedAction,
      derived: status.source === null,
      successor: status.successor
        ? { id: status.successor, label: nameOf(status.successor), href: successorHref(status.successor) }
        : null,
    },
    level: { key: level, he: VERIFICATION_HE[level], dot: VERIFICATION_DOT[level] },
    sources: evidence.map((e) => ({
      title: e.sourceTitle,
      url: e.url ?? null,
      kind: e.sourceType,
      release: e.release ?? null,
      accessedAt: e.accessedAt,
      edition: e.edition satisfies Edition,
    })),
    lastVerifiedAt,
    reviewer: rec?.reviewer ?? null,
    conflicts: evidence.filter((e) => (e.conflictingEvidence?.length ?? 0) > 0).length,
    needsVerification: level === "verification_required" || status.status === "verification_required",
    depth: { level: depth, he: DEPTH_HE[depth] },
  };
}
