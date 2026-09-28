/* ============================================================================
   PROJECT NEO · BUSINESS DOMAINS — data layer.
   ----------------------------------------------------------------------------
   SERVER ONLY, build time.

   39 functional domains of PM and PP-PI (data/domains.ts), 32 of them carrying a
   consultant-grade deep record (data/domain-detail.ts). Both are hand-verified
   reference content of the same class as the academy and the library, and until
   now neither reached a single NEO surface: the rail counted `DOMAINS.length`
   and then sent the reader to /neo/erd/, which lists tables.

   THE TWO RULES THIS FILE ENFORCES

   1. ONE SOURCE, TWO LAYERS, NEVER MERGED SILENTLY.
      `Domain` is the spine — flow, tables, T-Codes, BAPIs, learning points,
      troubleshooting. `DomainDetail` is the deep layer — purpose, master data,
      exits, BAdIs, QA scenarios, incidents, the CBC scenario, Fiori, migration
      and the structured ECC↔S/4 verdict. Seven domains have no deep layer. The
      page SAYS which of the two it is showing, so a thinner domain never reads
      as a fully documented one.

   2. EVERY IDENTIFIER IS GATED BEFORE IT BECOMES A LINK.
      Tables, T-Codes and BAPIs go through components/neo-shell/reference/
      ref-links, which answers with a destination only when the corresponding
      route actually generates that page. A name the project does not document
      is still printed — as a value, not as a dead link.
   ========================================================================== */

import { DOMAINS, type Domain } from "@/data/domains";
import { DOMAIN_DETAIL, type DomainDetail } from "@/data/domain-detail";
import type { EccS4 } from "@/components/ecc-s4-block";
import { bapiHref, objectHref, txHref } from "../reference/ref-links";
import type { ModuleKey } from "../types";

/* ------------------------------------------------------------------ types */

export interface DomLink { t: string; href: string | null }

export interface DomStep { step: string; he: string }

export interface DomTrouble { issue: string; fix: string }

/** One ECC→S/4 verdict line, already resolved to a label + tone so the view
 *  renders a list rather than eight hand-written conditionals. */
export interface DomS4Row {
  key: keyof EccS4;
  he: string;
  /** Which of the four semantic tones this line carries. */
  tone: "stays" | "changes" | "replaced" | "gone" | "new" | "plan";
  text: string;
}

export interface DomainView {
  slug: string;
  module: ModuleKey;
  moduleHe: string;
  title: string;
  he: string;
  summary: string;

  flow: DomStep[];
  tables: DomLink[];
  tcodes: DomLink[];
  bapis: DomLink[];
  learning: string[];
  trouble: DomTrouble[];

  /** true when data/domain-detail carries a deep record for this slug. */
  deep: boolean;
  purpose: string;
  diagram: string[];
  masterData: string[];
  objects: string[];
  funcs: DomLink[];
  exits: string[];
  badis: string[];
  qa: string[];
  incidents: string[];
  scenario: string;
  fiori: string[];
  migration: string;
  s4: DomS4Row[];

  /** Sibling domains of the same module, for onward reading. */
  siblings: { slug: string; he: string; tables: number }[];
}

export interface DomainCard {
  slug: string;
  module: ModuleKey;
  title: string;
  he: string;
  summary: string;
  tables: number;
  tcodes: number;
  steps: number;
  deep: boolean;
  /** true when the deep record carries any ECC↔S/4 line at all. */
  s4: boolean;
}

/* ---------------------------------------------------------------- helpers */

const MOD_HE: Record<string, string> = { PM: "תחזוקת מפעל · PM", "PP-PI": "תעשיות תהליכיות · PP-PI" };

const clean = (s?: string) => (s || "").trim();

/** The eight ECC↔S/4 fields, in the order a migration reader wants them: what
 *  survives, what moves, what is replaced, what is gone, then the new surfaces
 *  and the plan. The labels are the ones components/ecc-s4-block already uses,
 *  so the two renderings of the same dataset say the same words. */
const S4_ROWS: { key: keyof EccS4; he: string; tone: DomS4Row["tone"] }[] = [
  { key: "unchanged", he: "ללא שינוי", tone: "stays" },
  { key: "changed", he: "משתנה ב-S/4HANA", tone: "changes" },
  { key: "replaced", he: "מוחלף", tone: "replaced" },
  { key: "deprecated", he: "הוסר או אינו אסטרטגי", tone: "gone" },
  { key: "fiori", he: "יישום Fiori", tone: "new" },
  { key: "cds", he: "תצוגת CDS", tone: "new" },
  { key: "simplification", he: "פריט Simplification", tone: "plan" },
  { key: "migration", he: "השפעת המעבר ובדיקות", tone: "plan" },
];

const s4Rows = (e?: EccS4): DomS4Row[] =>
  !e ? [] : S4_ROWS.map((r) => ({ ...r, text: clean(e[r.key]) })).filter((r) => r.text);

/* ------------------------------------------------------------------ build */

const detailOf = (slug: string): DomainDetail | undefined => DOMAIN_DETAIL[slug];

export function domainCards(): DomainCard[] {
  return DOMAINS.map((d) => {
    const det = detailOf(d.slug);
    return {
      slug: d.slug,
      module: d.module as ModuleKey,
      title: d.title,
      he: d.he,
      summary: d.summary,
      tables: d.tables.length,
      tcodes: d.tcodes.length,
      steps: d.flow.length,
      deep: !!det,
      s4: s4Rows(det?.eccS4).length > 0,
    };
  });
}

export function domainTotals() {
  const cards = domainCards();
  const uniq = (a: string[]) => new Set(a).size;
  return {
    domains: cards.length,
    pm: cards.filter((c) => c.module === "PM").length,
    pppi: cards.filter((c) => c.module === "PP-PI").length,
    deep: cards.filter((c) => c.deep).length,
    withS4: cards.filter((c) => c.s4).length,
    tables: uniq(DOMAINS.flatMap((d) => d.tables)),
    tcodes: uniq(DOMAINS.flatMap((d) => d.tcodes)),
    bapis: uniq(DOMAINS.flatMap((d) => d.bapis)),
    steps: DOMAINS.reduce((a, d) => a + d.flow.length, 0),
    learning: DOMAINS.reduce((a, d) => a + d.learning.length, 0),
    trouble: DOMAINS.reduce((a, d) => a + d.trouble.length, 0),
  };
}

export const domainSlugs = (): string[] => DOMAINS.map((d) => d.slug);

export function domainView(slug: string): DomainView | null {
  const d: Domain | undefined = DOMAINS.find((x) => x.slug === slug);
  if (!d) return null;
  const det = detailOf(slug);

  return {
    slug: d.slug,
    module: d.module as ModuleKey,
    moduleHe: MOD_HE[d.module] || d.module,
    title: d.title,
    he: d.he,
    summary: d.summary,

    flow: d.flow,
    tables: d.tables.map((t) => ({ t, href: objectHref(t) })),
    tcodes: d.tcodes.map((t) => ({ t, href: txHref(t) })),
    bapis: d.bapis.map((t) => ({ t, href: bapiHref(t) })),
    learning: d.learning,
    trouble: d.trouble,

    deep: !!det,
    purpose: clean(det?.purpose),
    diagram: det?.diagram || [],
    masterData: det?.masterData || [],
    objects: det?.objects || [],
    funcs: (det?.funcs || []).map((t) => ({ t, href: bapiHref(t) })),
    exits: det?.exits || [],
    badis: det?.badis || [],
    qa: det?.qa || [],
    incidents: det?.incidents || [],
    scenario: clean(det?.scenario),
    fiori: det?.fiori || [],
    migration: clean(det?.migration),
    s4: s4Rows(det?.eccS4),

    siblings: DOMAINS.filter((x) => x.module === d.module && x.slug !== d.slug)
      .map((x) => ({ slug: x.slug, he: x.he, tables: x.tables.length })),
  };
}
