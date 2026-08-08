/**
 * What we actually know about a diagram node.
 *
 * A node label is prose the model wrote — "יצירת הזמנת תחזוקה (IW31)". It is
 * not a record, and there is no per-node database of business explanations,
 * ECC-versus-S/4 differences or IMG paths. Generating that text would be
 * inventing SAP facts, which is the one thing this product must never do.
 *
 * So this resolves a label against the registries the site already ships —
 * 1,849 T-Codes, 105 tables, 147 BAPIs, 39 CDS views — and reports only what is
 * genuinely there, with a link to the page that holds the authoritative detail.
 * Where we know nothing, the caller is expected to say so rather than fill the
 * space.
 */

export type SapKind = "tcode" | "table" | "bapi" | "cds";

/**
 * Resolves one identifier to a real page, or null. Injected rather than
 * imported: the live registry pulls the generated dataset through path aliases,
 * which makes the interesting part — which tokens we even attempt — untestable.
 * The component supplies the real lookup; tests supply a stub.
 */
export type Lookup = (token: string) => { href: string; kind: SapKind } | null;

export interface NodeReference {
  id: string;
  kind: SapKind;
  href: string;
}

export interface NodeFacts {
  /** SAP objects named in the label, resolved to real pages. */
  refs: NodeReference[];
  /** Identifier-shaped tokens we could NOT resolve. Reported, not hidden. */
  unresolved: string[];
}

/**
 * Tokens that look like an SAP identifier. Deliberately narrow: a false
 * positive becomes a dead link, and a link that goes nowhere is worse than no
 * link. Matches T-code shapes (IW31, ME21N), table/view shapes (MARA, AUFK),
 * BAPI/FM shapes (BAPI_ALM_ORDER_MAINTAIN) and namespaced objects.
 */
const CANDIDATE = /\b(?:\/[A-Z0-9]{2,10}\/)?[A-Z][A-Z0-9_]{2,39}\b/g;

/**
 * Words that look like identifiers but are not objects. Without this, "SAP",
 * "ECC" and "PM" all resolve to nothing and clutter the unresolved list.
 */
const NOT_AN_OBJECT = new Set([
  "SAP", "ECC", "ERP", "EHP", "ABAP", "HANA", "FIORI", "IMG", "SPRO",
  "PM", "PP", "QM", "MM", "SD", "FI", "CO", "WM", "EWM", "PPPI", "PPDS",
  "IDOC", "BAPI", "CDS", "API", "GUI", "UI", "PDF", "XML", "JSON", "URL",
  "AND", "OR", "NOT", "THE", "FOR", "WITH", "S4HANA", "S4", "R3",
]);

/**
 * @returns every SAP object the label names, plus the identifier-shaped tokens
 *          we could not resolve. Never throws; an unmatched label yields empty
 *          lists rather than a guess.
 */
export function nodeFacts(label: string, lookup: Lookup): NodeFacts {
  const refs: NodeReference[] = [];
  const unresolved: string[] = [];
  const seen = new Set<string>();

  for (const m of String(label || "").matchAll(CANDIDATE)) {
    const token = m[0].toUpperCase();
    if (seen.has(token) || NOT_AN_OBJECT.has(token)) continue;
    seen.add(token);

    const hit = lookup(token);
    if (hit) refs.push({ id: m[0], kind: hit.kind, href: hit.href });
    else unresolved.push(m[0]);
  }

  return { refs, unresolved };
}

/** Hebrew label for each kind, so the panel can group them. */
export const KIND_HE: Record<SapKind, string> = {
  tcode: "טרנזקציות",
  table: "טבלאות",
  bapi: "BAPI ומודולי פונקציה",
  cds: "תצוגות CDS",
};

/** Groups references by kind, preserving first-seen order within each group. */
export function groupRefs(refs: NodeReference[]): [SapKind, NodeReference[]][] {
  const order: SapKind[] = ["tcode", "table", "bapi", "cds"];
  const by = new Map<SapKind, NodeReference[]>();
  for (const r of refs) {
    if (!by.has(r.kind)) by.set(r.kind, []);
    by.get(r.kind)!.push(r);
  }
  return order.filter((k) => by.has(k)).map((k) => [k, by.get(k)!]);
}
