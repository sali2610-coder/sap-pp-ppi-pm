/* ============================================================================
   PROJECT NEO · /neo/knowledge — BUILD-TIME data.
   ----------------------------------------------------------------------------
   Runs on the SERVER only. The route calls this once and hands the result to a
   client surface as one plain serialisable object, the same way
   app/neo/layout.tsx hands over shellData() and /neo/tables hands over
   tablesData().

   TWO SOURCES, ONE CENTRE — AND THEY ARE NOT DUPLICATES
     The sidebar carried two "Knowledge Center" entries: "מרכז ידע" (33) under
     ידע ולמידה, and "מרכזי ידע" (89) under כלים. Measured before consolidating:
     ZERO overlap. Not one shared slug, not one shared Hebrew title, not one
     shared English title. They answer different questions:

       data/concepts.ts     33 TERMS   — what does this SAP concept mean?
       data/centers/*       89 TOPICS  — how do I actually carry this out?
                                         11 families, 569 sections.

     So the second entry could not be deleted as a duplicate, and the two could
     not be poured into one flat list either — a glossary term and a work topic
     are not the same kind of record and must not be ranked against each other.
     They arrive here as two named bodies of one centre, and the surface shows
     one at a time. Nothing was merged away and nothing was dropped.

   THE FIRST SOURCE
     data/concepts.ts — 33 hand-authored SAP concepts, each carrying a business
     explanation, a technical explanation, the ECC behaviour, the S/4HANA
     behaviour, worked examples and related concepts. Nothing here adds a
     concept, rewrites an explanation or fills a blank. A field the source
     leaves empty arrives here empty and the surface says so on screen.

   THE ONE DERIVED VALUE, AND WHY IT IS NOT AN INVENTION
     `s4Changed`. S/4HANA is the primary world, so the surface has to be able to
     answer "which of these actually change". It does that by reading the
     concept's OWN S/4 sentence: a concept whose s4 text opens with the words
     "ללא שינוי" is recorded as unchanged, and every other concept is left
     unclassified rather than asserted to change. The rule is stated on screen
     next to the filter, so the reader can see exactly what the flag means and
     is never asked to trust a hidden judgement.

   CROSS-REFERENCES ARE GATED
     A concept's `related` list and its `examples` are matched against real
     generated destinations — the concept slugs this file itself produces, the
     dictionary table names /neo/object generates from, and the canonical
     transaction registry /neo/transactions generates from. A token that matches
     none of them is rendered as a value, not as a link, so a cross-reference
     can never outrun a page (scripts/crawl-dead-links.mjs exits 1 on the first
     internal href in out/ with nothing behind it).
   ========================================================================== */

import { CONCEPTS } from "@/data/concepts";
import { CENTER_FAMILIES, centerTotals } from "@/components/neo-shell/centers/centers-data";
import { tableNames } from "@/components/neo-shell/erd/model";
import { registryCodes } from "@/lib/tx-registry";

/** A cross-reference that either resolves to a real page or admits it does not. */
export interface ConceptRef {
  /** What the source wrote, verbatim. */
  label: string;
  /** The bare identifier the label leads with — "EQUI" out of "EQUI (ציוד)". */
  code: string;
  /** Hebrew gloss the source put in brackets, when it put one there. */
  note: string;
  /** A real generated route, or "" when nothing in the project answers to it. */
  href: string;
  kind: "concept" | "table" | "tcode" | "none";
}

export interface ConceptRow {
  slug: string;
  /** English term — the concept's own title. */
  title: string;
  /** Hebrew name. */
  he: string;
  group: string;
  groupHe: string;
  biz: string;
  tech: string;
  ecc: string;
  s4: string;
  /** false only when the concept's own S/4 sentence opens with "ללא שינוי". */
  s4Changed: boolean;
  examples: ConceptRef[];
  related: ConceptRef[];
  href: string;
  /** Prebuilt lowercase search corpus — a keystroke is a substring test, never
   *  a string build across 33 rows. */
  hay: string;
}

export interface ConceptFacet { id: string; he: string; n: number }

/** One work topic from data/centers/*, flattened for the unified centre.
 *  `href` is family-scoped because a centre slug is unique only WITHIN its
 *  family — `pm-preventive` exists in both `blueprints` and `playbooks` and they
 *  are two different topics (9 sections vs 5). */
export interface CenterRow {
  slug: string;
  famId: string;
  famHe: string;
  he: string;
  title: string;
  sub: string;
  href: string;
  accent: string;
  module: string;
  tag: string;
  sections: number;
  /** true when the topic carries a validated ECC→S/4HANA verdict. */
  s4: boolean;
  s4Text: string;
  hay: string;
}

export interface KnowledgeData {
  rows: ConceptRow[];
  groups: ConceptFacet[];
  /** The 89 work topics — the second body of the same centre. */
  centers: CenterRow[];
  /** The 11 families, as facets over `centers`. */
  families: ConceptFacet[];
  totals: {
    concepts: number;
    s4Changed: number;
    s4Same: number;
    examples: number;
    links: number;
    groups: number;
    /** Work topics, their families and their sections. */
    centers: number;
    families: number;
    sections: number;
    centersS4: number;
    /** THE NUMBER THE SIDEBAR SHOWS. Counted here from the two real arrays so
     *  it can never be hardcoded and can never drift from what the page lists. */
    all: number;
  };
}

/** Group labels, in the source's own four buckets. */
const GROUP_HE: Record<string, string> = {
  Data: "ABAP Dictionary",
  Code: "קוד וממשקים",
  Enhancement: "הרחבות",
  "PM/PP": "תחזוקת מפעל ותכנון ייצור",
};

/** The exact wording rule the surface prints next to the filter. */
const SAYS_UNCHANGED = /^ללא\s+שינוי/;

/** "EQUI (ציוד)" → code "EQUI", note "ציוד". A token with no bracket keeps its
 *  whole text as the code. */
function splitExample(raw: string): { code: string; note: string } {
  const m = raw.match(/^([^(]+?)\s*\((.+)\)\s*$/);
  if (m) return { code: m[1].trim(), note: m[2].trim() };
  return { code: raw.trim(), note: "" };
}

let cached: KnowledgeData | null = null;

export function knowledgeData(): KnowledgeData {
  if (cached) return cached;

  const bySlug = new Map(CONCEPTS.map((c) => [c.slug, c]));
  const tables = new Set(tableNames());
  const tcodes = new Set(registryCodes());

  const resolve = (raw: string): ConceptRef => {
    const { code, note } = splitExample(raw);
    const c = bySlug.get(code);
    if (c) return { label: raw, code, note, href: `/neo/knowledge/${code}/`, kind: "concept" };
    const up = code.toUpperCase();
    if (tables.has(up)) return { label: raw, code: up, note, href: `/neo/object/${encodeURIComponent(up)}/`, kind: "table" };
    if (tcodes.has(up)) return { label: raw, code: up, note, href: `/neo/transactions/${encodeURIComponent(up)}/`, kind: "tcode" };
    return { label: raw, code, note, href: "", kind: "none" };
  };

  const rows: ConceptRow[] = CONCEPTS.map((c) => {
    const examples = (c.examples || []).map(resolve);
    const related = (c.related || []).map(resolve);
    const row: ConceptRow = {
      slug: c.slug,
      title: c.title,
      he: c.he,
      group: c.group,
      groupHe: GROUP_HE[c.group] || c.group,
      biz: c.biz || "",
      tech: c.tech || "",
      ecc: c.ecc || "",
      s4: c.s4 || "",
      s4Changed: !SAYS_UNCHANGED.test((c.s4 || "").trim()),
      examples,
      related,
      href: `/neo/knowledge/${c.slug}/`,
      hay: "",
    };
    row.hay = [c.he, c.title, c.slug, GROUP_HE[c.group] || c.group, c.biz, c.tech, c.ecc, c.s4, ...(c.examples || []), ...(c.related || [])]
      .join(" ")
      .toLowerCase();
    return row;
  });

  const groupOrder: string[] = [];
  for (const r of rows) if (!groupOrder.includes(r.group)) groupOrder.push(r.group);
  const groups: ConceptFacet[] = groupOrder.map((g) => ({
    id: g,
    he: GROUP_HE[g] || g,
    n: rows.filter((r) => r.group === g).length,
  }));

  /* ---- the second body: 89 work topics across 11 families ---- */
  const centers: CenterRow[] = CENTER_FAMILIES.flatMap((f) =>
    f.items.map((i) => {
      const s4Text = [i.eccS4?.changed, i.eccS4?.migration].filter(Boolean).join(" ").trim();
      return {
        slug: i.slug,
        famId: f.id,
        famHe: f.he,
        he: i.he,
        title: i.title,
        sub: i.sub,
        href: `/neo/centers/${f.id}/${i.slug}/`,
        accent: i.accent,
        module: i.module || "",
        tag: i.tag || "",
        sections: i.sections.length,
        s4: !!i.eccS4,
        s4Text,
        hay: [i.he, i.title, i.sub, f.he, i.module, i.tag, s4Text]
          .filter(Boolean).join(" ").toLowerCase(),
      };
    }),
  );
  const families: ConceptFacet[] = CENTER_FAMILIES.map((f) => ({ id: f.id, he: f.he, n: f.items.length }));
  const ct = centerTotals();

  cached = {
    rows,
    groups,
    centers,
    families,
    totals: {
      concepts: rows.length,
      s4Changed: rows.filter((r) => r.s4Changed).length,
      s4Same: rows.filter((r) => !r.s4Changed).length,
      examples: rows.reduce((a, r) => a + r.examples.length, 0),
      links: rows.reduce((a, r) => a + r.examples.filter((x) => x.href).length + r.related.filter((x) => x.href).length, 0),
      groups: groups.length,
      centers: centers.length,
      families: families.length,
      sections: ct.sections,
      centersS4: centers.filter((c) => c.s4).length,
      all: rows.length + centers.length,
    },
  };
  return cached;
}

/** The param list for /neo/knowledge/[slug]. Derived from the same array the
 *  directory lists from, so a card can never open a page that was not built. */
export const conceptSlugs = (): string[] => CONCEPTS.map((c) => c.slug);

export function conceptDetail(slug: string): ConceptRow | null {
  return knowledgeData().rows.find((r) => r.slug === slug) ?? null;
}
