/**
 * Geometry for entity-relationship diagrams.
 *
 * Split out of the renderer because this is the part that carries MEANING. A
 * fork drawn where a bar belongs does not look slightly wrong, it states a
 * different data model — "many materials per plant" instead of "one". That is a
 * factual error in a product whose whole promise is not guessing SAP data, so
 * it needs to be assertable in a test rather than eyeballed in a screenshot.
 *
 * Everything here is pure: numbers in, numbers out, no React and no DOM.
 */

import dagre from "dagre";
import type { Cardinality, Erd, ErdEntity } from "./erd";

export const HEADER_H = 30;
export const ROW_H = 21;
export const PAD_X = 11;
export const BADGE_W = 22;
const MIN_W = 150;
export const FONT = 12;

/** Rough advance width. Deliberately generous: a clipped field name is worse
 *  than a slightly wide box. */
export const tw = (s: string, size = FONT) => String(s ?? "").length * size * 0.62;

export function entitySize(e: ErdEntity) {
  let w = tw(e.name, 13) + PAD_X * 2;
  for (const a of e.attributes) {
    const badges = (a.pk ? BADGE_W + 4 : 0) + (a.fk ? BADGE_W + 4 : 0);
    w = Math.max(w, tw(a.name) + badges + tw(a.type ?? "", 11) + PAD_X * 2 + 18);
  }
  return {
    width: Math.max(MIN_W, Math.ceil(w)),
    height: HEADER_H + e.attributes.length * ROW_H + (e.attributes.length ? 6 : 0),
  };
}

/** Where a centre-to-centre line crosses a box border. */
export function clip(cx: number, cy: number, w: number, h: number, tx: number, ty: number) {
  const dx = tx - cx, dy = ty - cy;
  if (!dx && !dy) return { x: cx, y: cy };
  const sx = dx ? (w / 2) / Math.abs(dx) : Infinity;
  const sy = dy ? (h / 2) / Math.abs(dy) : Infinity;
  const s = Math.min(sx, sy);
  return { x: cx + dx * s, y: cy + dy * s };
}

/**
 * How far along the line a foot's marks can reach, measured from the entity
 * border. The renderer keeps relationship labels outside this band, because the
 * label plate is opaque and a hidden circle silently downgrades "zero or many"
 * to "many" — a different data model, not a cosmetic loss.
 */
export const FOOT_SPAN = 30;

/**
 * Vertical room a self-relationship needs above its entity.
 *
 * dagre knows nothing about the loop — the self-edge is excluded from the graph
 * because dagre cannot rank one — so it will happily place that entity flush
 * against the top margin and the loop is then drawn at a negative y and clipped
 * away entirely. The layout reserves the band instead.
 */
export const LOOP_H = 58;

export interface Line { x1: number; y1: number; x2: number; y2: number }
export interface Circle { cx: number; cy: number; r: number }

export interface FootGeometry {
  /** Three converging lines. Present only for the "many" cardinalities. */
  prongs: Line[];
  /** The "at least one" bar. Absent for the two "zero" cardinalities. */
  bar: Line | null;
  /** The optionality circle. Present only for the two "zero" cardinalities. */
  circle: Circle | null;
}

/**
 * One end of a relationship, in crow's foot notation.
 *
 * The fork's wide end touches the entity and converges away from it, because
 * "many" is a claim about THAT entity's rows. The bar and circle sit further
 * along the line so the marks never overlap.
 *
 * @param p     the point on the entity's border
 * @param ux,uy unit vector pointing AWAY from that entity, along the line
 */
export function footGeometry(card: Cardinality, p: { x: number; y: number }, ux: number, uy: number): FootGeometry {
  const nx = -uy, ny = ux;                       // perpendicular
  const at = (t: number) => ({ x: p.x + ux * t, y: p.y + uy * t });
  const off = (t: number, d: number) => ({ x: p.x + ux * t + nx * d, y: p.y + uy * t + ny * d });

  const many = card === "zero-or-many" || card === "one-or-many";
  const optional = card === "zero-or-one" || card === "zero-or-many";
  const minOne = card === "one" || card === "one-or-many" || card === "zero-or-one";

  const prongs: Line[] = [];
  if (many) {
    const apex = at(13);
    for (const d of [-7, 0, 7]) {
      const s = off(0, d);
      prongs.push({ x1: apex.x, y1: apex.y, x2: s.x, y2: s.y });
    }
  }

  let bar: Line | null = null;
  if (minOne) {
    const t = many ? 19 : card === "zero-or-one" ? 17 : 10;
    const a = off(t, 7), b = off(t, -7);
    bar = { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  }

  let circle: Circle | null = null;
  if (optional) {
    const c = at(many ? 26 : 8);
    circle = { cx: c.x, cy: c.y, r: 4 };
  }

  return { prongs, bar, circle };
}

export interface Placed { e: ErdEntity; x: number; y: number; w: number; h: number }

export interface ErdLayout {
  placed: Map<string, Placed>;
  width: number;
  height: number;
}

export function layoutErd(d: Erd): ErdLayout {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", nodesep: 46, ranksep: 168, marginx: 20, marginy: 20 });
  g.setDefaultEdgeLabel(() => ({}));

  const sizes = new Map<string, { width: number; height: number }>();
  for (const e of d.entities) {
    const s = entitySize(e);
    sizes.set(e.name, s);
    g.setNode(e.name, s);
  }
  // dagre cannot rank a self-edge; it is drawn as a loop instead.
  for (const r of d.relations) if (r.from !== r.to) g.setEdge(r.from, r.to);

  dagre.layout(g);

  // Everything shifts down when any entity carries a loop, rather than only the
  // looping entity: moving one box would make dagre's edge routing wrong.
  const shift = d.relations.some((r) => r.from === r.to) ? LOOP_H : 0;

  const placed = new Map<string, Placed>();
  for (const e of d.entities) {
    const n = g.node(e.name);
    const s = sizes.get(e.name)!;
    placed.set(e.name, { e, x: n?.x ?? 0, y: (n?.y ?? 0) + shift, w: s.width, h: s.height });
  }
  const gr = g.graph();
  return {
    placed,
    width: Math.max(320, Math.ceil(gr.width ?? 320) + 40),
    // Room under the diagram for the legend, and above it for any loop.
    height: Math.max(200, Math.ceil(gr.height ?? 200) + 40) + shift,
  };
}
