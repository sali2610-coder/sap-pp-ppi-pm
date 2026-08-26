// Project NEO · Stage 2B — the SAP object page data layer.
//
// SERVER ONLY, build time. Every value below is read out of the project
// dataset through the SAME helpers the corresponding pages already render
// from — components/neo-shell/erd/model.ts for the data model, lib/module-portal
// for the process chain, data/troubleshooting for incidents, data/cds-map for
// CDS, data/library for the books.
//
// WHAT THIS FILE REFUSES TO DO
//   · invent a relation, a cardinality, a JOIN, a T-Code or a SAP Note
//   · complete a blank the blueprint left blank
//   · claim a book, an incident or an S/4 note covers a table when the only
//     verified link is at module level — that link is returned with an explicit
//     `scope: "module"` so the page can say which it is
// Where the dictionary holds nothing, the field comes back empty and the page
// prints the absence.

import { INCIDENTS, type Incident } from "@/data/troubleshooting";
import { getTableEnrichment, type TableEnrichment } from "@/data/table-enrichment";
import { LIBRARY } from "@/data/library";
import { processSteps } from "@/lib/module-portal";
import { RISK_HE, TRUST_HE, s4For } from "@/lib/s4";
import { BOOK_IDENTITY } from "@/lib/book-identity";
import { PM_DATA, PPPI_DATA } from "@/data/sapData";
import type { SAPModuleData } from "@/lib/types";
import type { ModuleKey } from "../types";
import {
  cdsFor, danglingFor, edges, mergedFields, moduleRows, nodes, occurrences,
  relVar, selfRelsFor, tableNames, ZONE_HE, zoneVar,
  type DanglingRel, type ErdNode, type FieldRow, type ModuleRow, type RelEdge,
  type RelKind, type SelfRel, type Zone,
} from "../erd/model";

export { tableNames, relVar, zoneVar, ZONE_HE };
export type { DanglingRel, FieldRow, ModuleRow, RelKind, SelfRel };

/* ------------------------------------------------------------------ types */

/** One modelled neighbour of the object, from the object's point of view. */
export interface Neighbour {
  name: string;
  he: string;
  /** var(--obj-*) — object class of the NEIGHBOUR. */
  obj: string;
  mods: ModuleKey[];
  /** "child" ⇒ the neighbour carries the FK and points at this object.
   *  "parent" ⇒ this object carries the FK and points at the neighbour. */
  dir: "child" | "parent";
  kind: RelKind;
  /** Verbatim cardinality, "" when the blueprint left it blank. */
  card: string;
  /** Verbatim JOIN snippets, one per blueprint that states this edge. */
  joins: { mod: ModuleKey; join: string; desc: string; pk: string; fk: string; card: string }[];
  /** Modules whose blueprint records the edge. */
  edgeMods: ModuleKey[];
  /** Fields the dictionary documents on the neighbour. */
  fields: number;
  /** true when the dictionary ALSO records the opposite direction — the two
   *  blueprints disagree about which side holds the primary key. Both are kept
   *  and both are shown. */
  contested: boolean;
}

export interface FlowPlace {
  mod: ModuleKey;
  steps: { code: string; label: string; exists: boolean; here: boolean }[];
  /** Position of this table in the chain, or -1 when it is not a chain step. */
  idx: number;
}

export interface BookRef {
  id: string;
  title: string;
  titleHe: string;
  module: string;
  chapters: number;
  pages: number;
  /** `/neo/books/<bookId>/` when lib/book-identity maps this shelf entry onto a
   *  spine app/neo/books/[bookId] actually generates, else null. */
  href: string | null;
}

/** The object's S/4HANA standing, resolved by lib/s4.ts — the project's own
 *  resolver, which prefers curated Simplification-List knowledge, falls back to
 *  a derivation from the blueprint's own S/4 column, and returns nothing at all
 *  rather than a guess. `trust` says which of the three happened. */
export interface S4Standing {
  /** true when the resolver rates the move high or medium risk. */
  impacted: boolean;
  risk: "high" | "medium" | "low" | "none";
  riskHe: string;
  trust: "verified" | "partial" | "needs";
  trustHe: string;
  /** What changes / why it matters, from the resolver. "" when it holds none. */
  changed: string;
  why: string;
  /** SAP Note / Simplification id, ONLY from the curated entry. */
  note: string;
  tcodes: string[];
  cds: string[];
}

export interface IncidentRef {
  slug: string;
  he: string;
  module: string;
  symptom: string;
  error: string;
  impact: string;
  rootCauses: string[];
  analyzeTcodes: string[];
  tables: string[];
  fix: string[];
  ecc: string;
  s4: string;
}

export interface ObjectView {
  name: string;
  he: string;
  en: string;
  zone: Zone;
  zoneHe: string;
  obj: string;
  mods: ModuleKey[];
  /** true when more than one blueprint documents this table — the real 19. */
  shared: boolean;
  /** Dictionary ROWS. A table can appear twice inside one module (AUFK does,
   *  in PM topics 7 and 12) so this is not the module count. */
  rows: ModuleRow[];
  fields: FieldRow[];
  pk: string[];
  fk: string[];
  neighbours: Neighbour[];
  dangling: DanglingRel[];
  /** Relations where this table IS its own parent — a hierarchy. Neither the
   *  ER graph nor the dangling list can hold one, so without this the PM
   *  blueprint's functional-location hierarchy (IFLOT.TPLMA → IFLOT.TPLNR)
   *  rendered on no surface at all. */
  selfRels: SelfRel[];
  /** Distinct T-Codes per module, and the dictionary's verbatim string. */
  tcodes: { mod: ModuleKey; raw: string; codes: string[] }[];
  funcs: { name: string; he: string; mods: ModuleKey[] }[];
  progs: { name: string; he: string; mods: ModuleKey[] }[];
  flow: FlowPlace[];
  cds: { view: string; he: string; tables: string[] }[];
  incidents: IncidentRef[];
  /** Books are indexed at MODULE level in data/library.ts — there is no
   *  table-to-chapter map in the project, and one is not invented here. */
  books: BookRef[];
  /** S/4HANA standing. Never null: when the project holds nothing the object
   *  comes back with trust "needs", which the page prints as a stated gap. */
  s4: S4Standing;
  /** Rank of this table by modelled degree, and the total, so the page can say
   *  how central it actually is instead of asserting importance. */
  rank: number;
  total: number;
  deg: number;
  /** THE TECHNICAL DEPTH LAYER — data/table-enrichment, 94 of the 105 blueprint
   *  tables. Deep functional purpose, the meaning of each key field, the foreign
   *  keys as relationships, access-path / index guidance, MATDOC-ACDOCA impact,
   *  performance notes and three worked examples (ABAP, SQL/CDS, debug), each
   *  with its DDIC / SAP Help source cited.
   *
   *  It exists precisely BECAUSE the generated blueprint does not carry these
   *  fields — data/sapData.* is produced by scripts/extract-xlsx.mjs and may
   *  never be hand-edited, so the depth lives alongside it, keyed by table name.
   *  null for the 11 blueprint tables with no entry, and the page states that
   *  rather than rendering a section that looks broken. */
  enrich: TableEnrichment | null;
}

/* ---------------------------------------------------------------- helpers */

const uniq = <T,>(a: T[]) => [...new Set(a)];

const MOD_DATA: Record<ModuleKey, SAPModuleData> = { PM: PM_DATA, "PP-PI": PPPI_DATA };

/** Books whose module matches. PP-PI also claims the PP shelf, exactly as
 *  components/neo-shell/home/home-data.ts counts them. */
function booksFor(mods: ModuleKey[]): BookRef[] {
  const want = new Set<string>();
  for (const m of mods) {
    if (m === "PM") want.add("PM");
    else {
      want.add("PP-PI");
      want.add("PP");
    }
  }
  return LIBRARY.filter((b) => want.has(b.module)).map((b) => ({
    id: b.id,
    title: b.title,
    titleHe: b.titleHe,
    module: b.module,
    chapters: b.chapters.length,
    pages: b.pages,
    href: SPINE_OF_SHELF[b.id] ? `/neo/books/${SPINE_OF_SHELF[b.id]}/` : null,
  }));
}

/** Shelf id -> spine id, inverted from lib/book-identity's own table. The hub
 *  route generates from the spines on disk, so a shelf entry with no spine gets
 *  no link rather than a broken one. */
const SPINE_OF_SHELF: Record<string, string> = Object.fromEntries(
  Object.values(BOOK_IDENTITY)
    .filter((b) => b.shelfId)
    .map((b) => [b.shelfId as string, b.bookId]),
);

/** The object's S/4HANA standing. The blueprint columns are read across every
 *  dictionary row of the table and the FIRST non-empty one wins — a table
 *  documented twice is one physical table, and the resolver takes one note. */
function standingOf(rows: ModuleRow[], name: string): S4Standing {
  const note = rows.map((r) => (r.s4Note || "").trim()).find(Boolean) || "";
  const alt = rows.map((r) => (r.s4AltTable || "").trim()).find(Boolean) || "";
  const st = s4For(name, note, alt);
  return {
    impacted: st.impacted,
    risk: st.risk,
    riskHe: RISK_HE[st.risk] || "",
    trust: st.trust,
    trustHe: TRUST_HE[st.trust] || "",
    changed: (st.impact?.changed || "").trim(),
    why: (st.impact?.why || "").trim(),
    note: (st.impact?.note || "").trim(),
    tcodes: uniq(st.impact?.tcodes || []),
    cds: uniq(st.impact?.cds || []),
  };
}

const incRef = (i: Incident): IncidentRef => ({
  slug: i.slug,
  he: i.he,
  module: i.module,
  symptom: i.symptom || "",
  error: i.error && i.error !== "—" ? i.error : "",
  impact: i.impact || "",
  rootCauses: i.rootCauses || [],
  analyzeTcodes: i.analyzeTcodes || [],
  tables: i.tables || [],
  fix: i.fix || [],
  ecc: i.ecc || "",
  s4: i.s4 || "",
});

let _rank: Map<string, number> | null = null;
function degreeRank(): Map<string, number> {
  if (_rank) return _rank;
  const list = [...nodes().values()].sort((a, b) => b.deg - a.deg || a.n.localeCompare(b.n));
  _rank = new Map(list.map((n, i) => [n.n, i + 1]));
  return _rank;
}

/* ------------------------------------------------------------------ build */

const cache = new Map<string, ObjectView>();

export function objectView(raw: string): ObjectView | null {
  const name = (raw || "").toUpperCase();
  const hit = cache.get(name);
  if (hit) return hit;

  const occ = occurrences().get(name);
  const node: ErdNode | undefined = nodes().get(name);
  if (!occ || !node) return null;

  const rows = moduleRows(name);
  const fields = mergedFields(name);
  const ns = nodes();

  // Neighbours: every modelled edge with this table on either end, re-read from
  // this table's point of view. Both directions, because a relation is stored
  // on whichever side the blueprint wrote it.
  const neighbours: Neighbour[] = [];
  for (const e of edges() as RelEdge[]) {
    const isParent = e.parent === name;
    const isChild = e.child === name;
    if (!isParent && !isChild) continue;
    const other = isParent ? e.child : e.parent;
    const on = ns.get(other);
    if (!on) continue;
    neighbours.push({
      name: other,
      he: on.he,
      obj: on.obj,
      mods: on.mods,
      dir: isParent ? "child" : "parent",
      kind: e.kind,
      card: e.says.find((s) => s.card)?.card || "",
      joins: e.says.map((s) => ({ mod: s.mod, join: s.join, desc: s.desc, pk: s.pk, fk: s.fk, card: s.card })),
      edgeMods: e.mods,
      fields: on.fields,
      contested: e.contested,
    });
  }
  // Children first (they hang off this table's PK), then by documentation depth
  // — the order the orbit reads in, and the order the JOIN list reads in.
  neighbours.sort(
    (a, b) =>
      (a.dir === b.dir ? 0 : a.dir === "child" ? -1 : 1) ||
      b.fields - a.fields ||
      a.name.localeCompare(b.name),
  );

  const funcMap = new Map<string, { name: string; he: string; mods: ModuleKey[] }>();
  const progMap = new Map<string, { name: string; he: string; mods: ModuleKey[] }>();
  for (const r of rows) {
    for (const [fn, he] of r.funcs) {
      const k = fn.trim();
      if (!k) continue;
      const prev = funcMap.get(k);
      if (prev) {
        if (!prev.mods.includes(r.mod)) prev.mods.push(r.mod);
      } else funcMap.set(k, { name: k, he: (he || "").trim(), mods: [r.mod] });
    }
    for (const [pn, he] of r.progs) {
      const k = (pn || "").trim();
      if (!k) continue;
      const prev = progMap.get(k);
      if (prev) {
        if (!prev.mods.includes(r.mod)) prev.mods.push(r.mod);
      } else progMap.set(k, { name: k, he: (he || "").trim(), mods: [r.mod] });
    }
  }

  const flow: FlowPlace[] = node.mods.map((mod) => {
    const steps = processSteps(MOD_DATA[mod]).map((s) => ({
      code: s.code,
      label: s.label,
      exists: s.exists,
      here: s.code === name,
    }));
    return { mod, steps, idx: steps.findIndex((s) => s.here) };
  });

  const view: ObjectView = {
    name,
    he: node.he,
    en: rows.find((r) => r.descEn)?.descEn || "",
    zone: node.zone,
    zoneHe: ZONE_HE[node.zone],
    obj: node.obj,
    mods: node.mods,
    shared: node.mods.length > 1,
    rows,
    fields,
    pk: node.pk,
    fk: node.fk,
    neighbours,
    dangling: danglingFor(name),
    selfRels: selfRelsFor(name),
    tcodes: rows.map((r) => ({ mod: r.mod, raw: r.tcodesRaw, codes: r.tcodes })),
    funcs: [...funcMap.values()],
    progs: [...progMap.values()],
    flow,
    cds: cdsFor(name),
    incidents: INCIDENTS.filter((i) => (i.tables || []).some((t) => t.toUpperCase() === name)).map(incRef),
    books: booksFor(node.mods),
    s4: standingOf(rows, name),
    rank: degreeRank().get(name) || 0,
    total: ns.size,
    deg: node.deg,
    enrich: getTableEnrichment(name) ?? null,
  };
  cache.set(name, view);
  return view;
}

/** Distinct modelled neighbours across the whole dictionary, used by the page
 *  header to state how central this object is without adjectives. */
export const objectSummary = (v: ObjectView) => ({
  neighbours: uniq(v.neighbours.map((n) => n.name)).length,
  children: v.neighbours.filter((n) => n.dir === "child").length,
  parents: v.neighbours.filter((n) => n.dir === "parent").length,
  joins: v.neighbours.reduce((a, n) => a + n.joins.filter((j) => j.join).length, 0),
  /** Distinct tables the two blueprints disagree about the direction of. */
  contested: uniq(v.neighbours.filter((n) => n.contested).map((n) => n.name)).length,
});
