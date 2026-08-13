// Project NEO · Stage 2B — the shared SAP data-model layer.
//
// SERVER ONLY. Runs at build time. This module imports the generated SAP
// datasets at module scope, so it must never be pulled in from a "use client"
// file: both surfaces that consume it (the object page and the ERD workspace)
// do so from server components and hand the browser a small plain object.
//
// HONESTY RULE, inherited from nav-data.ts / home-data.ts and not relaxed:
// every node, edge, cardinality, JOIN and field below is read verbatim out of
// data/sapData.*. Nothing is inferred, nothing is completed, nothing is
// paraphrased. Where the blueprint is silent the shape carries an explicit
// "unstated" marker so the UI can say so out loud instead of guessing.
//
// THE ONE PIECE OF DERIVATION, stated plainly: a relation row is stored on
// whichever side the blueprint happened to write it, with a `role` of parent or
// child. Turning that into a directed parent→child edge is a re-reading of the
// same record, not new knowledge — `role: "parent"` means THIS table holds the
// PK, so the counterpart is the child. Two blueprints may write the same edge;
// they are merged into one edge that remembers BOTH statements.

import dagre from "dagre";
import { ALL_TABLES, PM_DATA, PPPI_DATA } from "@/data/sapData";
import { cdsForTable } from "@/data/cds-map";
import { zoneOf, ZONES, type Zone } from "@/lib/studio-graph";
import { moduleTables } from "@/lib/module-portal";
import type { SAPModuleData, SAPTable } from "@/lib/types";
import type { ModuleKey } from "../types";

export type { Zone };

/** Functional zone → object-class token. The SAME eight-zones-onto-seven-tokens
 *  mapping components/neo-shell/nav-data.ts and .../home/home-data.ts declare;
 *  it is restated here rather than imported because both of those modules pull
 *  the entire library and academy index at module scope, and this file is the
 *  foundation the object route and the ERD route both build on. If the mapping
 *  ever moves, it moves in all three. */
const ZONE_OBJ: Record<Zone, string> = {
  master: "var(--obj-master)",
  planning: "var(--obj-structure)",
  execution: "var(--obj-transaction)",
  logistics: "var(--obj-movement)",
  status: "var(--obj-status)",
  config: "var(--obj-config)",
  quality: "var(--obj-config)",
  other: "var(--obj-text)",
};

/** Object-class hue for a zone. Visualisation surfaces only. */
export const zoneVar = (z: Zone) => ZONE_OBJ[z];

export const ZONE_HE: Record<Zone, string> = Object.fromEntries(
  ZONES.map((z) => [z.id, z.he]),
) as Record<Zone, string>;

/* ------------------------------------------------------------------ types */

/** Relationship strength EXACTLY as the dictionary states it.
 *  `unstated` is not a third kind of relation — it is a relation the blueprint
 *  recorded without a cardinality, and the UI must show it as such. */
export type RelKind = "1-1" | "n-1" | "unstated";

/** One statement of a relation, as one blueprint wrote it. Kept per module so
 *  a shared table can show that PM and PP-PI describe the same edge in
 *  different words — which they do. */
export interface RelStatement {
  mod: ModuleKey;
  /** Verbatim cardinality string, "" when the blueprint left it blank. */
  card: string;
  /** Verbatim JOIN ON snippet. */
  join: string;
  /** Verbatim Hebrew description. */
  desc: string;
  /** Verbatim key fields, "" when the blueprint left them blank. */
  pk: string;
  fk: string;
}

export interface RelEdge {
  id: string;
  /** Table holding the primary key. */
  parent: string;
  /** Table holding the foreign key. */
  child: string;
  kind: RelKind;
  /** Every blueprint statement of this edge, in module order. */
  says: RelStatement[];
  /** Modules whose blueprint records this edge. */
  mods: ModuleKey[];
  /** true when the OPPOSITE edge is also recorded — i.e. the two blueprints
   *  disagree about which side holds the primary key. Measured, not assumed:
   *  it happens twice in the whole dictionary (AUFK↔JSTO and MAST↔STKO). Both
   *  directions are kept and flagged; picking a winner would be inventing a
   *  resolution the source does not contain. */
  contested: boolean;
}

export interface ModuleRow {
  mod: ModuleKey;
  topicIdx: number;
  topic: string;
  /** Transactions verbatim, as one string, and split into real codes. */
  tcodesRaw: string;
  tcodes: string[];
  fields: number;
  s4Note: string;
  s4AltTable: string;
  s4AltTcode: string;
  sumNote: string;
  fiori: string;
  guide: string;
  helpLbl: string;
  descHe: string;
  descEn: string;
  funcs: [string, string][];
  progs: [string, string][];
}

export interface FieldRow {
  tech: string;
  he: string;
  en: string;
  dt: string;
  len: string;
  key: string;
  /** Modules whose blueprint documents this field on this table. */
  mods: ModuleKey[];
}

export interface ErdNode {
  n: string;
  he: string;
  mods: ModuleKey[];
  zone: Zone;
  /** var(--obj-*) reference — object class, the data's own hue. */
  obj: string;
  fields: number;
  pk: string[];
  fk: string[];
  /** Edges touching this node. */
  deg: number;
}

/* ------------------------------------------------------------------ utils */

const uniq = <T,>(a: T[]) => [...new Set(a)];

/** Same splitter the rail and the Home data layer use — one tokenisation of the
 *  dictionary's free-text transaction column, never a second, divergent one. */
export const splitTcodes = (s: string): string[] =>
  (s || "")
    .split(/[,;\s/]+/)
    .map((x) => x.trim().toUpperCase())
    .filter((x) => /^[A-Z][A-Z0-9_]{1,}$/.test(x));

const clean = (s: string) => (s || "").replace(/\s+/g, " ").trim();

const kindOf = (card: string): RelKind => {
  const c = clean(card).toUpperCase().replace(/\s/g, "");
  if (c === "1:1") return "1-1";
  if (c === "N:1" || c === "1:N" || c === "N:M") return "n-1";
  return "unstated";
};

/** var(--rel-*) reference for a relation kind. `unstated` deliberately lands on
 *  --rel-inferred: the token exists for exactly this — a link the dictionary
 *  asserts without stating its strength. */
export const relVar = (k: RelKind) =>
  k === "1-1" ? "var(--rel-1-1)" : k === "n-1" ? "var(--rel-n-1)" : "var(--rel-inferred)";

export const REL_HE: Record<RelKind, string> = {
  "1-1": "1:1",
  "n-1": "N:1",
  unstated: "לא מצוין",
};

export const MOD_VAR: Record<ModuleKey, string> = {
  PM: "var(--mod-pm)",
  "PP-PI": "var(--mod-pppi)",
};

export const MOD_HE: Record<ModuleKey, string> = {
  PM: "אחזקת מפעל · PM",
  "PP-PI": "ייצור תהליכי · PP-PI",
};

/* ------------------------------------------------------------- the reading */

type Occ = { table: SAPTable; mod: ModuleKey };

let _occ: Map<string, Occ[]> | null = null;

/** Every dictionary row per table name. A table documented by both blueprints
 *  has more than one — that is the whole point of the shared set. */
export function occurrences(): Map<string, Occ[]> {
  if (_occ) return _occ;
  const map = new Map<string, Occ[]>();
  for (const m of [PM_DATA, PPPI_DATA] as SAPModuleData[]) {
    for (const t of moduleTables(m)) {
      const list = map.get(t.tableName) || [];
      list.push({ table: t, mod: m.module as ModuleKey });
      map.set(t.tableName, list);
    }
  }
  _occ = map;
  return map;
}

/** Every table name in the dictionary, ascending. Drives generateStaticParams,
 *  so a link into /neo/object can never outrun a generated page. */
export function tableNames(): string[] {
  return [...occurrences().keys()].sort((a, b) => a.localeCompare(b));
}

let _edges: RelEdge[] | null = null;

/** The full modelled relation set. Only edges whose BOTH ends are documented
 *  tables survive: a relation pointing at a table the dictionary does not hold
 *  is real, but it cannot be drawn as a link between two known things, and the
 *  object page lists it separately rather than inventing the far end. */
export function edges(): RelEdge[] {
  if (_edges) return _edges;
  const known = new Set(occurrences().keys());
  const byId = new Map<string, RelEdge>();

  for (const [, list] of occurrences()) {
    for (const { table, mod } of list) {
      for (const r of table.relations || []) {
        if (!r.table || r.table === table.tableName) continue;
        if (!known.has(r.table)) continue;
        const parent = r.role === "parent" ? table.tableName : r.table;
        const child = r.role === "parent" ? r.table : table.tableName;
        const id = `${parent}>${child}`;
        const say: RelStatement = {
          mod,
          card: clean(r.card || ""),
          join: clean(r.join || ""),
          desc: clean(r.desc || ""),
          pk: clean(r.pkField || ""),
          fk: clean(r.fkField || ""),
        };
        const prev = byId.get(id);
        if (!prev) {
          byId.set(id, { id, parent, child, kind: kindOf(say.card), says: [say], mods: [mod], contested: false });
          continue;
        }
        // Same edge, second statement. Keep both; the stated cardinality wins
        // over a blank one, and two blueprints never invent a third value.
        if (!prev.says.some((s) => s.mod === say.mod && s.join === say.join && s.card === say.card)) {
          prev.says.push(say);
        }
        if (prev.kind === "unstated" && say.card) prev.kind = kindOf(say.card);
        if (!prev.mods.includes(mod)) prev.mods.push(mod);
      }
    }
  }
  for (const e of byId.values()) e.contested = byId.has(`${e.child}>${e.parent}`);
  _edges = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  return _edges;
}

export interface DanglingRel extends RelStatement {
  /** The counterpart table the blueprint names but the dictionary does not
   *  document. */
  table: string;
  /** true when THIS table holds the PK. */
  isParent: boolean;
  kind: RelKind;
}

/** Relations the blueprint records whose counterpart table the dictionary does
 *  NOT document. Real records, and listed as such — never drawn as an edge to a
 *  node that would have to be invented. */
export function danglingFor(name: string): DanglingRel[] {
  const known = new Set(occurrences().keys());
  const out: DanglingRel[] = [];
  const seen = new Set<string>();
  for (const { table, mod } of occurrences().get(name) || []) {
    for (const r of table.relations || []) {
      if (!r.table || r.table === name || known.has(r.table)) continue;
      const key = `${r.table}|${r.role}|${clean(r.join || "")}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({
        table: r.table,
        isParent: r.role === "parent",
        kind: kindOf(r.card || ""),
        mod,
        card: clean(r.card || ""),
        join: clean(r.join || ""),
        desc: clean(r.desc || ""),
        pk: clean(r.pkField || ""),
        fk: clean(r.fkField || ""),
      });
    }
  }
  return out.sort((a, b) => a.table.localeCompare(b.table));
}

let _nodes: Map<string, ErdNode> | null = null;

export function nodes(): Map<string, ErdNode> {
  if (_nodes) return _nodes;
  const deg = new Map<string, number>();
  for (const e of edges()) {
    deg.set(e.parent, (deg.get(e.parent) || 0) + 1);
    deg.set(e.child, (deg.get(e.child) || 0) + 1);
  }
  const out = new Map<string, ErdNode>();
  for (const [name, list] of occurrences()) {
    const lead = list[0].table;
    const zone = zoneOf(name);
    const fieldRows = mergedFields(name);
    out.set(name, {
      n: name,
      he: lead.descriptionHe || lead.descriptionEn || "",
      mods: uniq(list.map((o) => o.mod)),
      zone,
      obj: zoneVar(zone),
      fields: fieldRows.length,
      pk: fieldRows.filter((f) => f.key === "PK").map((f) => f.tech),
      fk: fieldRows.filter((f) => f.key === "FK").map((f) => f.tech),
      deg: deg.get(name) || 0,
    });
  }
  _nodes = out;
  return out;
}

/** Union of the field rows every blueprint documents for a table, in first-seen
 *  order. A field documented by one module only is kept and marked — dropping
 *  it would hide real documentation, and merging silently would claim both
 *  blueprints said it. */
export function mergedFields(name: string): FieldRow[] {
  const list = occurrences().get(name) || [];
  const out: FieldRow[] = [];
  const at = new Map<string, FieldRow>();
  for (const { table, mod } of list) {
    for (const f of table.fields) {
      const key = f.tech.toUpperCase();
      const prev = at.get(key);
      if (prev) {
        if (!prev.mods.includes(mod)) prev.mods.push(mod);
        // Never overwrite a stated value with a blank one.
        if (!prev.dt && f.dt) prev.dt = f.dt;
        if (!prev.len && f.len) prev.len = f.len;
        if ((!prev.key || prev.key === "-") && f.key) prev.key = f.key;
        if (!prev.en && f.en) prev.en = f.en;
        if (!prev.he && f.he) prev.he = f.he;
        continue;
      }
      const row: FieldRow = {
        tech: f.tech,
        he: f.he || "",
        en: f.en || "",
        dt: f.dt || "",
        len: f.len || "",
        key: f.key || "",
        mods: [mod],
      };
      at.set(key, row);
      out.push(row);
    }
  }
  return out;
}

export function moduleRows(name: string): ModuleRow[] {
  const list = occurrences().get(name) || [];
  return list.map(({ table: t, mod }) => ({
    mod,
    topicIdx: t.topicIdx,
    topic: t.topicTitle || "",
    tcodesRaw: clean(t.tcodes),
    tcodes: uniq(splitTcodes(t.tcodes)),
    fields: t.fields.length,
    s4Note: clean(t.s4Note || ""),
    s4AltTable: clean(t.s4AltTable || ""),
    s4AltTcode: clean(t.s4AltTcode || ""),
    sumNote: clean(t.sumNote || ""),
    fiori: clean(t.fioriApp || ""),
    guide: clean(t.guideHe || ""),
    helpLbl: clean(t.helpLbl || ""),
    descHe: clean(t.descriptionHe || ""),
    descEn: clean(t.descriptionEn || ""),
    funcs: t.funcs || [],
    progs: t.progs || [],
  }));
}

/** CDS views the map records over this table. */
export function cdsFor(name: string) {
  return cdsForTable(name).map((v) => ({ view: v.view, he: v.he, tables: v.tables }));
}

/* ------------------------------------------------------------ ERD geometry */

export interface LaidNode extends ErdNode {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LaidEdge extends RelEdge {
  /** Straight chord between the two box borders, in layout units. */
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Quadratic control point — a gentle bow so parallel edges separate. */
  cx: number;
  cy: number;
}

export interface ErdLayout {
  nodes: LaidNode[];
  edges: LaidEdge[];
  w: number;
  h: number;
}

const NW = 152;
const NH = 54;

/** Intersection of the A→B segment with an axis-aligned box centred on A. Keeps
 *  every line ending on a border rather than under a card. */
function border(cxA: number, cyA: number, cxB: number, cyB: number, w: number, h: number) {
  const dx = cxB - cxA;
  const dy = cyB - cyA;
  if (dx === 0 && dy === 0) return { x: cxA, y: cyA };
  const sx = dx === 0 ? Infinity : (w / 2) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (h / 2) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: cxA + dx * s, y: cyA + dy * s };
}

let _layout: ErdLayout | null = null;

/** Deterministic build-time layout. dagre is already a project dependency (it
 *  lays out the Architecture Studio), so nothing new is introduced, and the
 *  browser receives finished coordinates rather than a layout engine.
 *
 *  rankdir LR measured squarest on this graph (2148x2434 against 5389x1108 for
 *  TB), which is what a pannable canvas and a minimap both want. */
export function erdLayout(): ErdLayout {
  if (_layout) return _layout;
  const ns = nodes();
  const es = edges();

  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", ranker: "network-simplex", ranksep: 150, nodesep: 22, edgesep: 14, marginx: 60, marginy: 60 });
  g.setDefaultEdgeLabel(() => ({}));
  for (const n of ns.keys()) g.setNode(n, { width: NW, height: NH });
  for (const e of es) g.setEdge(e.parent, e.child);
  dagre.layout(g);

  const laid: LaidNode[] = [];
  for (const n of ns.values()) {
    const p = g.node(n.n) as { x: number; y: number } | undefined;
    laid.push({ ...n, x: Math.round(p?.x ?? 0), y: Math.round(p?.y ?? 0), w: NW, h: NH });
  }
  const at = new Map(laid.map((n) => [n.n, n]));

  // Parallel edges between the same rank pair get a small alternating bow so
  // they stay individually selectable instead of overprinting.
  const bowSeen = new Map<string, number>();
  const laidEdges: LaidEdge[] = es.map((e) => {
    const a = at.get(e.parent)!;
    const b = at.get(e.child)!;
    const p1 = border(a.x, a.y, b.x, b.y, a.w, a.h);
    const p2 = border(b.x, b.y, a.x, a.y, b.w, b.h);
    const key = `${Math.round((a.y + b.y) / 40)}:${Math.round((a.x + b.x) / 40)}`;
    const i = bowSeen.get(key) ?? 0;
    bowSeen.set(key, i + 1);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const bow = (i % 2 === 0 ? 1 : -1) * Math.min(26, len * 0.07) * (1 + Math.floor(i / 2) * 0.6);
    return {
      ...e,
      x1: Math.round(p1.x),
      y1: Math.round(p1.y),
      x2: Math.round(p2.x),
      y2: Math.round(p2.y),
      cx: Math.round((p1.x + p2.x) / 2 + (-dy / len) * bow),
      cy: Math.round((p1.y + p2.y) / 2 + (dx / len) * bow),
    };
  });

  const gr = g.graph() as { width?: number; height?: number };
  _layout = { nodes: laid, edges: laidEdges, w: Math.round(gr.width ?? 0), h: Math.round(gr.height ?? 0) };
  return _layout;
}

/** Dictionary-wide totals, computed the same way every other NEO surface does. */
export function modelStats() {
  const ns = nodes();
  const es = edges();
  const shared = [...ns.values()].filter((n) => n.mods.length > 1);
  return {
    tables: ns.size,
    rows: ALL_TABLES.length,
    shared: shared.length,
    edges: es.length,
    stated: es.filter((e) => e.kind !== "unstated").length,
    unstated: es.filter((e) => e.kind === "unstated").length,
    isolated: [...ns.values()].filter((n) => n.deg === 0).length,
    contested: es.filter((e) => e.contested).length / 2,
  };
}
