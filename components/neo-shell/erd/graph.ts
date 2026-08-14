// Project NEO · NEO ERD — graph geometry + neighbourhood maths.
//
// PURE. No React, no DOM, no data import. Everything here takes the build-time
// payload (components/neo-shell/erd/erd-data.ts) and answers geometry questions
// about it, so the workspace component owns interaction and nothing else.
//
// WHERE THIS COMES FROM
//   The border-intersection helper and the alternating bow are the SAME maths
//   components/neo-shell/erd/model.ts runs at build time (dagre coordinates ->
//   chord + quadratic control point). They are restated here because the focus
//   layout below produces NEW positions in the browser and its edges have to be
//   drawn by the identical rule — two different curve rules on one canvas would
//   read as two different diagrams.
//
// DETERMINISM IS THE POINT (§15)
//   Every list is sorted before it is placed. The focus layout is a pure
//   function of (selected table, depth, the payload) — the same selection always
//   produces the same picture, so nothing re-shuffles when you hover, filter or
//   pan. There is no physics, no randomness, no simulation tick.

import type { ErdPayloadEdge, ErdPayloadNode } from "./erd-data";

export interface Pt {
  x: number;
  y: number;
}

/** A quadratic chord between two node borders. */
export interface EdgeGeom {
  x1: number;
  y1: number;
  cx: number;
  cy: number;
  x2: number;
  y2: number;
}

export type PosMap = Map<string, Pt>;
export type GeomMap = Map<string, EdgeGeom>;

/* ------------------------------------------------------------ neighbourhood */

/** Undirected adjacency over the modelled relation set. */
export function adjacency(edges: ErdPayloadEdge[]): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  const add = (a: string, b: string) => {
    const s = adj.get(a) || new Set<string>();
    s.add(b);
    adj.set(a, s);
  };
  for (const e of edges) {
    add(e.p, e.c);
    add(e.c, e.p);
  }
  return adj;
}

export interface Levels {
  /** Directly linked tables. */
  l1: Set<string>;
  /** Linked to a directly linked table, and not already closer. */
  l2: Set<string>;
}

export function neighbourLevels(sel: string | null, adj: Map<string, Set<string>>): Levels {
  const l1 = new Set<string>();
  const l2 = new Set<string>();
  if (!sel) return { l1, l2 };
  for (const a of adj.get(sel) || []) l1.add(a);
  for (const a of l1) {
    for (const b of adj.get(a) || []) {
      if (b === sel || l1.has(b)) continue;
      l2.add(b);
    }
  }
  return { l1, l2 };
}

/* ---------------------------------------------------------------- geometry */

/** Intersection of the A->B segment with the axis-aligned box centred on A.
 *  Identical to model.ts `border` — a line always ends on a border, never under
 *  a card. */
export function border(ax: number, ay: number, bx: number, by: number, w: number, h: number): Pt {
  const dx = bx - ax;
  const dy = by - ay;
  if (dx === 0 && dy === 0) return { x: ax, y: ay };
  const sx = dx === 0 ? Infinity : w / 2 / Math.abs(dx);
  const sy = dy === 0 ? Infinity : h / 2 / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: ax + dx * s, y: ay + dy * s };
}

/** The canonical build-time positions, as a map. */
export function mapPositions(nodes: ErdPayloadNode[]): PosMap {
  return new Map(nodes.map((n) => [n.n, { x: n.x, y: n.y }]));
}

/** The canonical build-time edge geometry, as a map. */
export function mapGeom(edges: ErdPayloadEdge[]): GeomMap {
  return new Map(edges.map((e) => [e.i, { x1: e.x1, y1: e.y1, cx: e.cx, cy: e.cy, x2: e.x2, y2: e.y2 }]));
}

/** Chord + gentle bow for one pair of positions. `bow` separates edges that
 *  would otherwise overprint; it alternates side and grows in steps, exactly as
 *  the build-time layout does. */
export function chord(a: Pt, b: Pt, aw: number, ah: number, bw: number, bh: number, bow: number): EdgeGeom {
  const p1 = border(a.x, a.y, b.x, b.y, aw, ah);
  const p2 = border(b.x, b.y, a.x, a.y, bw, bh);
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x1: Math.round(p1.x),
    y1: Math.round(p1.y),
    x2: Math.round(p2.x),
    y2: Math.round(p2.y),
    cx: Math.round((p1.x + p2.x) / 2 + (-dy / len) * bow),
    cy: Math.round((p1.y + p2.y) / 2 + (dx / len) * bow),
  };
}

export const pathD = (g: EdgeGeom) => `M${g.x1} ${g.y1} Q${g.cx} ${g.cy} ${g.x2} ${g.y2}`;

/** Placement for the crow's-foot / key marker at one end of an edge. Local +x
 *  points from the node border INTO the edge, so a marker drawn once in local
 *  space is correct at both ends of every edge. */
export function capTransform(g: EdgeGeom, end: "p" | "c"): string {
  const x = end === "p" ? g.x1 : g.x2;
  const y = end === "p" ? g.y1 : g.y2;
  const a = (Math.atan2(g.cy - y, g.cx - x) * 180) / Math.PI;
  return `translate(${x} ${y}) rotate(${a.toFixed(2)})`;
}

/* ------------------------------------------------------------ focus layout */

/** The ego view: the selected table at the centre of its own neighbourhood,
 *  direct links on the inner ring, second-level links on the outer one.
 *
 *  Centred on the selected table's OWN map position rather than on the middle of
 *  the canvas — the picture reorganises around where you already were, so the
 *  camera barely has to move and the change stays legible (§15: alive, but
 *  predictable). Tables outside the neighbourhood keep their map position and
 *  are faded out by the workspace; they never get thrown somewhere new. */
export function egoPositions(
  sel: string,
  l1: Set<string>,
  l2: Set<string>,
  depth: 1 | 2,
  base: PosMap,
): PosMap {
  const out = new Map(base);
  const centre = base.get(sel);
  if (!centre) return out;
  out.set(sel, { ...centre });

  const ring1 = [...l1].sort((a, b) => a.localeCompare(b));
  const r1 = Math.min(430, Math.max(210, 150 + ring1.length * 13));
  ring1.forEach((n, i) => {
    const a = (-Math.PI / 2) + (i * 2 * Math.PI) / Math.max(1, ring1.length);
    out.set(n, { x: Math.round(centre.x + Math.cos(a) * r1 * 1.35), y: Math.round(centre.y + Math.sin(a) * r1) });
  });

  if (depth === 2 && l2.size) {
    // Second ring, ordered by the inner-ring table it hangs off, so the two
    // rings line up instead of crossing.
    const ring2 = [...l2].sort((a, b) => a.localeCompare(b));
    const r2 = r1 + Math.min(420, Math.max(190, 130 + ring2.length * 5));
    ring2.forEach((n, i) => {
      const a = (-Math.PI / 2) + (i * 2 * Math.PI) / Math.max(1, ring2.length);
      out.set(n, { x: Math.round(centre.x + Math.cos(a) * r2 * 1.35), y: Math.round(centre.y + Math.sin(a) * r2) });
    });
  }
  return out;
}

/** Edge geometry for an arbitrary position map. Parallel edges between the same
 *  neighbourhood get the alternating bow so they stay individually readable. */
export function computeGeom(pos: PosMap, size: Map<string, { w: number; h: number }>, edges: ErdPayloadEdge[]): GeomMap {
  const seen = new Map<string, number>();
  const out: GeomMap = new Map();
  for (const e of edges) {
    const a = pos.get(e.p);
    const b = pos.get(e.c);
    const sa = size.get(e.p);
    const sb = size.get(e.c);
    if (!a || !b || !sa || !sb) continue;
    const key = `${Math.round((a.y + b.y) / 40)}:${Math.round((a.x + b.x) / 40)}`;
    const i = seen.get(key) ?? 0;
    seen.set(key, i + 1);
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const bow = (i % 2 === 0 ? 1 : -1) * Math.min(26, len * 0.07) * (1 + Math.floor(i / 2) * 0.6);
    out.set(e.i, chord(a, b, sa.w, sa.h, sb.w, sb.h, bow));
  }
  return out;
}

/* ------------------------------------------------------------------ camera */

export interface View {
  x: number;
  y: number;
  k: number;
}

export const MIN_K = 0.14;
export const MAX_K = 2.6;
export const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, Number.isFinite(k) && k > 0 ? k : 1));

/** Tight bounding box of the node region for a position map. */
export function bboxOf(pos: PosMap, size: Map<string, { w: number; h: number }>, only?: Set<string>) {
  let a = Infinity;
  let b = Infinity;
  let c = -Infinity;
  let d = -Infinity;
  for (const [n, p] of pos) {
    if (only && !only.has(n)) continue;
    const s = size.get(n) || { w: 152, h: 54 };
    a = Math.min(a, p.x - s.w / 2);
    b = Math.min(b, p.y - s.h / 2);
    c = Math.max(c, p.x + s.w / 2);
    d = Math.max(d, p.y + s.h / 2);
  }
  if (!Number.isFinite(a)) return { x: 0, y: 0, w: 1, h: 1 };
  return { x: a, y: b, w: Math.max(1, c - a), h: Math.max(1, d - b) };
}

/** Bounds guard, ported verbatim in spirit from the Architecture Studio's
 *  `clampTr`: at least a margin of the NODE region stays inside the viewport on
 *  both axes, so no pan, zoom, minimap jump or focus move can ever leave the
 *  user staring at an empty canvas. */
export function clampView(
  v: View,
  bbox: { x: number; y: number; w: number; h: number },
  W: number,
  H: number,
): View {
  const k = clampK(v.k);
  const left = bbox.x * k;
  const right = (bbox.x + bbox.w) * k;
  const top = bbox.y * k;
  const bot = (bbox.y + bbox.h) * k;
  const mx = Math.min(160, (right - left) * 0.6 + 1, W * 0.5);
  const my = Math.min(160, (bot - top) * 0.6 + 1, H * 0.5);
  const x = Math.min(W - mx - left, Math.max(mx - right, v.x));
  const y = Math.min(H - my - top, Math.max(my - bot, v.y));
  return { k, x: Number.isFinite(x) ? x : 0, y: Number.isFinite(y) ? y : 0 };
}

/** Cubic ease-out. One easing for every camera move and every layout tween. */
export const ease = (p: number) => 1 - Math.pow(1 - p, 3);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
