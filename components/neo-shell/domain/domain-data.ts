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
import { MFG_AREAS } from "@/data/domain-model";
import { MRP_SECTIONS, MRP_TCODES, PLANNING_STRATEGIES, type PlanningStrategy } from "@/data/mrp-center";
import type { EccS4 } from "@/components/ecc-s4-block";
import { S4_STATUS_DOT, S4_STATUS_HE, S4_STATUS_WORD } from "@/lib/evidence/types";
import { bapiHref, objectHref, txHref } from "../reference/ref-links";
import { neoOf } from "../records/links";
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

  /** A deep guide the domain carries, or null. Today one: the legacy MRP / MPS
   *  planning centre on the MRP domain (see mrpGuide below). */
  guide: DomGuide | null;

  /** Sibling domains of the same module, for onward reading. */
  siblings: { slug: string; he: string; tables: number }[];
}

/** One topic of a carried guide, its identifiers gated like the domain's own. */
export interface DomGuideTopic {
  id: string;
  he: string;
  body: string;
  points: string[];
  tables: DomLink[];
  tcodes: DomLink[];
  s4: DomS4Row[];
}

export interface DomGuide {
  title: string;
  lede: string;
  tcodes: DomLink[];
  topics: DomGuideTopic[];
  strategies: PlanningStrategy[];
}

/** One plant area of the legacy domain model (data/domain-model.ts). Its links
 *  are the legacy addresses resolved to their NEO pages, or a plain value. */
export interface MfgAreaView {
  slug: string;
  he: string;
  title: string;
  modules: string[];
  description: string;
  flow: string[];
  objects: DomLink[];
  processes: DomLink[];
  incidents: DomLink[];
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

const MOD_HE: Record<string, string> = { PM: "PM · תחזוקת מפעל", "PP-PI": "PP-PI · ייצור תהליכי" };

const clean = (s?: string) => (s || "").trim();

/** The eight ECC↔S/4 fields, in the order a migration reader wants them: what
 *  survives, what moves, what is replaced, what is gone, then the new surfaces
 *  and the plan. The headings of the status fields come from the S/4HANA
 *  status dictionary (lib/evidence/types). These are headings over PROSE, not
 *  a verdict per record: the "deprecated" field holds text about both removed
 *  and not-strategic objects, so its heading keeps both words and is never
 *  merged into "הוסר" (content review, row 91). */
const S4_ROWS: { key: keyof EccS4; he: string; tone: DomS4Row["tone"] }[] = [
  { key: "unchanged", he: S4_STATUS_WORD.unchanged, tone: "stays" },
  { key: "changed", he: S4_STATUS_HE.changed, tone: "changes" },
  { key: "replaced", he: S4_STATUS_WORD.replaced, tone: "replaced" },
  { key: "deprecated", he: `${S4_STATUS_WORD.not_available} או ${S4_STATUS_WORD.deprecated}`, tone: "gone" },
  // Not status words: the source's own headings for these two fields, which
  // say that the app and the view are new in S/4HANA.
  { key: "fiori", he: "אפליקציית Fiori חדשה", tone: "new" },
  { key: "cds", he: "CDS View חדש", tone: "new" },
  { key: "simplification", he: S4_STATUS_HE.simplified, tone: "plan" },
  { key: "migration", he: "השפעת המעבר ובדיקות", tone: "plan" },
];

/** Every ECC↔S/4 field the record fills, labelled and toned. Shared by the
 *  domain and the centre detail pages, so one field reads one way on both. */
export const s4Rows = (e?: EccS4): DomS4Row[] =>
  !e ? [] : S4_ROWS.map((r) => ({ ...r, text: clean(e[r.key]) })).filter((r) => r.text);

/** The rows' tones as the S/4 status families (S4_STATUS_DOT), so a word has
 *  one colour on every surface. "gone" labels the record's `deprecated` row
 *  ("הוסר או לא אסטרטגי"), which the canonical mapper reads as not strategic:
 *  never the brand red, which is selection (gate 3, major 6). */
export const S4_TONE: Record<DomS4Row["tone"], string> = {
  stays: S4_STATUS_DOT.unchanged,
  changes: S4_STATUS_DOT.changed,
  replaced: S4_STATUS_DOT.replaced,
  gone: S4_STATUS_DOT.deprecated,
  new: S4_STATUS_DOT.s4_native,
  plan: "var(--ink-3)",
};

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

/* ---------------------------------------------------- carried legacy pages
   Content parity, rollout 2026-10. Two legacy pages had no NEO surface:
   /domain-model/ (data/domain-model.ts, seven plant areas) and /mrp/
   (data/mrp-center.ts, the MRP / MPS planning centre). Both are read here from
   their own modules, unchanged; only the links are resolved to NEO. */

/** The seven plant areas, in the source's order, for the domains hub. */
export function mfgAreas(): MfgAreaView[] {
  const link = (l: { label: string; href: string }): DomLink => ({ t: l.label, href: neoOf(l.href) });
  return MFG_AREAS.map((a) => ({
    slug: a.slug,
    he: a.he,
    title: a.title,
    modules: a.modules,
    description: a.description,
    flow: a.flow,
    objects: a.objects.map(link),
    processes: a.processes.map(link),
    incidents: a.incidents.map(link),
  }));
}

/** The domain /mrp/ redirects to carries the planning centre. */
export const MRP_GUIDE_DOMAIN = "pppi-mrp";

/** The legacy MRP / MPS centre: its nine topics with their ECC→S/4 lines, the
 *  planning-strategy reference table and the planning T-Codes. The title and
 *  lede are the legacy page header's (app/mrp/page.tsx:19), verbatim. */
function mrpGuide(): DomGuide {
  return {
    title: "מרכז תכנון — MRP / MPS",
    lede: "מדריך תכנון מעמיק: יסודות MRP, MRP Live מול קלאסי, MPS, PIR ותחזית, אסטרטגיות תכנון (10/11/20/40/50/70), Net-Change/Regenerative, MRP Areas, Lot-Sizing/מלאי בטחון, וגרסת ייצור — עם בלוקי ECC↔S/4.",
    tcodes: MRP_TCODES.map((t) => ({ t, href: txHref(t) })),
    topics: MRP_SECTIONS.map((s) => ({
      id: s.id,
      he: s.he,
      body: s.body,
      points: s.points,
      tables: (s.tables || []).map((t) => ({ t, href: objectHref(t) })),
      tcodes: (s.tcodes || []).map((t) => ({ t, href: txHref(t) })),
      s4: s4Rows(s.eccS4),
    })),
    strategies: PLANNING_STRATEGIES,
  };
}

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

    guide: d.slug === MRP_GUIDE_DOMAIN ? mrpGuide() : null,

    siblings: DOMAINS.filter((x) => x.module === d.module && x.slug !== d.slug)
      .map((x) => ({ slug: x.slug, he: x.he, tables: x.tables.length })),
  };
}
