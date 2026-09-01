/* ============================================================================
   PROJECT NEO · EVIDENCE FOUNDATION — canonical ids.
   ----------------------------------------------------------------------------
   PURE MODULE (type imports only; see types.ts header).

   One id shape for every catalog: `<kind>:<name>`. Code kinds are uppercase
   technical names, CDS keeps its CamelCase, slug kinds are lowercase dashed.
   The `fm` rule is the two-line cleanFunc from lib/object-intel.ts, copied
   verbatim because that module pulls @/data/sapData and cannot be imported
   here; test/s4-status.test.ts holds the two equal.
   ========================================================================== */

import type { CanonicalId, CanonicalKind } from "./types";

export const CANONICAL_KINDS: readonly CanonicalKind[] = [
  "table", "tx", "fm", "idoc:msg", "idoc:basic", "cds", "fiori",
  "enh:badi", "enh:exit", "enh:technique", "obj", "bp",
] as const;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ID_SYNTAX: Record<CanonicalKind, RegExp> = {
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

/** `<kind>:<name>` → parts, or null. Every kind ends with ":" in the id, so no
 *  kind is a prefix of another and the first match is the only match. */
export function parseId(id: string): { kind: CanonicalKind; name: string } | null {
  if (typeof id !== "string") return null;
  for (const kind of CANONICAL_KINDS) {
    const p = `${kind}:`;
    if (id.startsWith(p)) {
      const name = id.slice(p.length);
      return name ? { kind, name } : null;
    }
  }
  return null;
}

/** lib/object-intel.ts cleanFunc, verbatim: drop trailing " - <hebrew>",
 *  " (<variant>)" and " / " compounds, keep the leading clean identifier. */
const cleanFunc = (name: string): string =>
  (name || "").split(/\s*[/(]|\s+-\s/)[0].trim().replace(/[^A-Za-z0-9_]+$/, "");

const slugify = (s: string): string =>
  (s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** The raw variant of a name, normalised the way its kind is keyed. */
export function normalizeAlias(kind: CanonicalKind, raw: string): string {
  const s = (raw || "").trim();
  switch (kind) {
    case "fm": return cleanFunc(s);
    case "table": case "tx": case "idoc:msg": case "idoc:basic":
    case "enh:badi": case "enh:exit": case "fiori":
      return s.toUpperCase();
    case "cds": return s;
    case "enh:technique": case "obj": case "bp": return slugify(s);
  }
}

export function makeId(kind: CanonicalKind, raw: string): CanonicalId {
  return `${kind}:${normalizeAlias(kind, raw)}`;
}

export function isValidId(id: string): boolean {
  const p = parseId(id);
  return !!p && ID_SYNTAX[p.kind].test(p.name);
}

export const kindOf = (id: string): CanonicalKind | null => parseId(id)?.kind ?? null;
export const nameOf = (id: string): string => parseId(id)?.name ?? "";
