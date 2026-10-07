// Project NEO · Architecture Studio — the picture's geometry.
//
// PURE. No React, no DOM, no data import. The studio's views hand over groups
// of object ids and the relations between them; this file says where each
// object stands.
//
// WHY A NEW LAYOUT
//   The old single-layer map sorted the tables alphabetically into a grid and
//   drew every relation as a straight line from centre to centre, so related
//   tables stood far apart and the lines crossed through the boxes. Here the
//   picture follows the relations:
//     1. a view hands over GROUPS (a zone, a master object, the shared objects);
//     2. inside a group, each connected cluster is laid out by dagre, ranked
//        left to right with every relation oriented from the busier object to
//        the quieter one, so a hub stands at the head of its own cluster;
//     3. a hub's single-link tables, six or more of them, stand together as
//        one grid block beside it instead of one long column;
//     4. objects without a relation in the group share one grid;
//     5. clusters, then groups, are packed in masonry columns, the column count
//        chosen so the whole picture fits the canvas largest.
//   The x axis is mirrored at the end: the canvas reads right to left, so the
//   first group and every cluster's hub stand on the right.
//   ECC ↔ S/4 is a board (layoutBoard), the process a row of steps
//   (layoutProcess).
//
// DETERMINISM. Every list is sorted before it is placed; the same input
// always gives the same picture, on the server and in the browser.

import dagre from "dagre";

export interface Size { w: number; h: number }
export interface PNode { id: string; x: number; y: number; w: number; h: number; group: string }
export interface PGroup { id: string; title: string; count: number; x: number; y: number; w: number; h: number }
/** A hub's single-link tables, drawn as one block beside it. */
export interface PBlock { hub: string; members: string[]; x: number; y: number; w: number; h: number }
/**
 * in     a relation inside one cluster, drawn at rest
 * leaf   a hub to one of its block's tables; the block's own connector is
 *        drawn at rest, the single line only when one of the two is lit
 * cross  between clusters or groups, drawn only when one end is lit
 */
export type PEdgeKind = "in" | "leaf" | "cross";
export interface PEdge { id: string; a: string; b: string; kind: PEdgeKind }
/** The objects of a group that relate to nothing else in it, gathered under a caption. */
export interface PLoose { group: string; count: number; x: number; y: number; w: number; h: number }
/** LR: hubs head their clusters from the right, relations run sideways;
 *  TB: hubs head them from the top, relations run downward. */
export type Dir = "LR" | "TB";
export interface StudioLayout { nodes: PNode[]; edges: PEdge[]; groups: PGroup[]; blocks: PBlock[]; loose: PLoose[]; w: number; h: number; dir: Dir }
export interface GroupSpec { id: string; title: string; members: string[] }
type Adj = Map<string, Set<string>>;

const GAP = 24;          // between clusters inside a group
const GROUP_GAP = 32;    // between groups
const PAD = 18;          // inside a group's frame
const HEAD = 44;         // a titled group's header band
const BLOCK_MIN = 6;     // single-link tables that make a block
const BLOCK_PAD = 10;
const LOOSE_HEAD = 26;   // the caption over a group's unrelated objects
const LOOSE_PAD = 10;

const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

/* ------------------------------------------------------------------ packing */

/** Boxes placed in their given order, left to right, a new shelf whenever the
 *  next box would pass the target width. */
export function shelfPack(boxes: { id: string; w: number; h: number }[], targetW: number, gap: number) {
  const pos = new Map<string, { x: number; y: number }>();
  let x = 0, y = 0, rowH = 0, maxW = 0;
  for (const b of boxes) {
    if (x > 0 && x + b.w > targetW) { y += rowH + gap; x = 0; rowH = 0; }
    pos.set(b.id, { x, y });
    x += b.w + gap;
    rowH = Math.max(rowH, b.h);
    maxW = Math.max(maxW, x - gap);
  }
  return { pos, w: maxW, h: boxes.length ? y + rowH : 0 };
}

/**
 * Masonry: each box, in its given order, goes to the shortest column; the
 * column count (1 to 5) is the one at which the packed picture fits a canvas
 * of the given aspect (width / height) at the largest scale.
 */
export function masonryPack(boxes: { id: string; w: number; h: number }[], aspect: number, gap: number) {
  let best: { pos: Map<string, { x: number; y: number }>; w: number; h: number; k: number } | null = null;
  for (let cols = 1; cols <= Math.min(5, Math.max(1, boxes.length)); cols++) {
    const colH = new Array(cols).fill(0) as number[];
    const colW = new Array(cols).fill(0) as number[];
    const at: { id: string; c: number; y: number }[] = [];
    for (const b of boxes) {
      let c = 0;
      for (let i = 1; i < cols; i++) if (colH[i] < colH[c]) c = i;
      at.push({ id: b.id, c, y: colH[c] });
      colH[c] += b.h + gap;
      colW[c] = Math.max(colW[c], b.w);
    }
    const used = colW.map((w, i) => (w > 0 ? i : -1)).filter((i) => i >= 0);
    const x0 = new Map<number, number>();
    let x = 0;
    for (const i of used) { x0.set(i, x); x += colW[i] + gap; }
    const w = Math.max(0, x - gap);
    const h = Math.max(0, ...colH.map((v) => v - gap));
    const k = Math.min(aspect / Math.max(w, 1), 1 / Math.max(h, 1));
    if (!best || k > best.k * 1.0001) {
      const pos = new Map(at.map((p) => [p.id, { x: x0.get(p.c)!, y: p.y }]));
      best = { pos, w, h, k };
    }
  }
  return best ?? { pos: new Map(), w: 0, h: 0, k: 1 };
}

/* ------------------------------------------------------------- one cluster */

interface Placed { pos: Map<string, { x: number; y: number }>; w: number; h: number; blocks: PBlock[] }

/** The grid a block of single-link tables, or loose objects, is drawn in. */
function gridOf(ids: string[], size: (id: string) => Size, ratio: number) {
  const cw = Math.max(...ids.map((i) => size(i).w)) + 12;
  const ch = Math.max(...ids.map((i) => size(i).h)) + 10;
  const cols = Math.max(1, Math.min(ids.length, Math.ceil(Math.sqrt((ids.length * ch * ratio) / cw))));
  const rows = Math.ceil(ids.length / cols);
  const pos = new Map<string, { x: number; y: number }>();
  ids.forEach((id, i) => pos.set(id, { x: (i % cols) * cw + (cw - 12) / 2, y: Math.floor(i / cols) * ch + (ch - 10) / 2 }));
  return { pos, w: cols * cw - 12, h: rows * ch - 10 };
}

/** A connected cluster, by dagre: every relation from the busier object to
 *  the quieter one, and a hub's single-link tables gathered into a block.
 *  Centres are relative to the cluster's own top-left. */
export function layoutCluster(
  ids: string[],
  pairs: [string, string][],
  size: (id: string) => Size,
  degree: (id: string) => number,
  dir: Dir = "LR",
): Placed {
  if (ids.length === 1) {
    const s = size(ids[0]);
    return { pos: new Map([[ids[0], { x: s.w / 2, y: s.h / 2 }]]), w: s.w, h: s.h, blocks: [] };
  }
  const local = new Map<string, Set<string>>();
  for (const [a, b] of pairs) {
    (local.get(a) ?? local.set(a, new Set()).get(a)!).add(b);
    (local.get(b) ?? local.set(b, new Set()).get(b)!).add(a);
  }
  // blocks: a hub with six or more neighbours that link to nothing else
  const inBlock = new Map<string, string>();
  const blockOf = new Map<string, { members: string[]; grid: ReturnType<typeof gridOf> }>();
  for (const hub of [...ids].sort((a, b) => (local.get(b)?.size || 0) - (local.get(a)?.size || 0) || a.localeCompare(b))) {
    if (inBlock.has(hub)) continue;
    const leaves = [...(local.get(hub) || [])].filter((n) => (local.get(n)?.size || 0) === 1 && !inBlock.has(n) && !blockOf.has(n)).sort();
    if (leaves.length < BLOCK_MIN) continue;
    for (const l of leaves) inBlock.set(l, hub);
    // the block's grid leans the way the cluster grows: tall beside an LR hub, wide under a TB one
    blockOf.set(hub, { members: leaves, grid: gridOf(leaves, size, dir === "LR" ? 1.15 : 3.2) });
  }
  const g = new dagre.graphlib.Graph();
  g.setGraph(dir === "LR"
    ? { rankdir: "LR", nodesep: 10, ranksep: 40, marginx: 0, marginy: 0 }
    : { rankdir: "TB", nodesep: 14, ranksep: 44, marginx: 0, marginy: 0 });
  g.setDefaultEdgeLabel(() => ({}));
  const boxOf = (id: string): Size => {
    if (id.startsWith("__blk:")) { const b = blockOf.get(id.slice(6))!; return { w: b.grid.w + BLOCK_PAD * 2, h: b.grid.h + BLOCK_PAD * 2 }; }
    return size(id);
  };
  const vertices = [...ids.filter((id) => !inBlock.has(id)), ...[...blockOf.keys()].map((h) => `__blk:${h}`)];
  for (const v of vertices) { const s = boxOf(v); g.setNode(v, { width: s.w, height: s.h }); }
  for (const [a, b] of pairs) {
    if (inBlock.has(a) || inBlock.has(b)) continue;
    const da = degree(a), db = degree(b);
    const [from, to] = da > db || (da === db && a < b) ? [a, b] : [b, a];
    g.setEdge(from, to);
  }
  for (const hub of blockOf.keys()) g.setEdge(hub, `__blk:${hub}`);
  dagre.layout(g);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const v of vertices) {
    const p = g.node(v); const s = boxOf(v);
    minX = Math.min(minX, p.x - s.w / 2); maxX = Math.max(maxX, p.x + s.w / 2);
    minY = Math.min(minY, p.y - s.h / 2); maxY = Math.max(maxY, p.y + s.h / 2);
  }
  const pos = new Map<string, { x: number; y: number }>();
  const blocks: PBlock[] = [];
  for (const v of vertices) {
    const p = g.node(v);
    if (!v.startsWith("__blk:")) { pos.set(v, { x: p.x - minX, y: p.y - minY }); continue; }
    const hub = v.slice(6);
    const b = blockOf.get(hub)!; const s = boxOf(v);
    const left = p.x - minX - s.w / 2, top = p.y - minY - s.h / 2;
    for (const [id, c] of b.grid.pos) pos.set(id, { x: left + BLOCK_PAD + c.x, y: top + BLOCK_PAD + c.y });
    blocks.push({ hub, members: b.members, x: left, y: top, w: s.w, h: s.h });
  }
  return { pos, w: maxX - minX, h: maxY - minY, blocks };
}

/** Connected clusters of `members` over `adj`, biggest first, ids sorted. */
export function clustersOf(members: string[], adj: Adj): string[][] {
  const inside = new Set(members);
  const seen = new Set<string>();
  const out: string[][] = [];
  for (const id of [...members].sort()) {
    if (seen.has(id)) continue;
    const c: string[] = []; const st = [id]; seen.add(id);
    while (st.length) {
      const x = st.pop()!; c.push(x);
      for (const y of adj.get(x) || []) if (inside.has(y) && !seen.has(y)) { seen.add(y); st.push(y); }
    }
    out.push(c.sort());
  }
  return out.sort((a, b) => b.length - a.length || a[0].localeCompare(b[0]));
}

/* ---------------------------------------------------------- groups to page */

export interface LayoutOpts {
  /** the canvas's width over its height */
  aspect: number;
  /** right to left: the first group and every hub on the right */
  mirror?: boolean;
  /** the relations that shape the clusters, when not all of them should (the
   *  object views cluster each table with its own objects only) */
  layoutAdj?: Adj;
  /** the direction relations run inside a cluster (default LR) */
  dir?: Dir;
}

function mirrorAll(l: StudioLayout) {
  for (const n of l.nodes) n.x = l.w - n.x;
  for (const g of l.groups) g.x = l.w - g.x - g.w;
  for (const b of l.blocks) b.x = l.w - b.x - b.w;
  for (const b of l.loose) b.x = l.w - b.x - b.w;
}

function edgesOf(all: Set<string>, adj: Adj, kindOf: (a: string, b: string) => PEdgeKind): PEdge[] {
  const edges: PEdge[] = [];
  const seen = new Set<string>();
  for (const n of [...all].sort()) for (const m of adj.get(n) || []) {
    if (!all.has(m) || n === m) continue;
    const k = pairKey(n, m);
    if (seen.has(k)) continue;
    seen.add(k);
    const [a, b] = n < m ? [n, m] : [m, n];
    edges.push({ id: k, a, b, kind: kindOf(a, b) });
  }
  return edges;
}

/**
 * The studio's general layout: groups of objects, each group a framed panel of
 * its clusters, the panels packed in masonry columns to the canvas's aspect.
 * A single untitled group draws no frame, so a view without grouping is just
 * its clusters on the canvas.
 */
export function layoutGroups(groups: GroupSpec[], adj: Adj, size: (id: string) => Size, opts: LayoutOpts): StudioLayout {
  const shape = opts.layoutAdj ?? adj;
  const live = groups.filter((g) => g.members.length);
  const all = new Set(live.flatMap((g) => g.members));
  const degree = (id: string) => { let d = 0; for (const n of shape.get(id) || []) if (all.has(n)) d++; return d; };
  const framed = live.length > 1 || !!live[0]?.title;
  const clusterOf = new Map<string, number>();
  const blockHub = new Map<string, string>();
  let ci = 0;

  const built = live.map((g) => {
    const clusters = clustersOf(g.members, shape);
    const parts: { id: string; w: number; h: number; placed: Placed; loose?: number }[] = [];
    const loose: string[] = [];
    for (const c of clusters) {
      if (c.length === 1) { loose.push(c[0]); continue; }
      const set = new Set(c);
      const pairs = new Map<string, [string, string]>();
      for (const a of c) for (const b of shape.get(a) || []) if (set.has(b) && a !== b) pairs.set(pairKey(a, b), a < b ? [a, b] : [b, a]);
      const placed = layoutCluster(c, [...pairs.values()], size, degree, opts.dir ?? "LR");
      const cid = ci++;
      for (const n of c) clusterOf.set(n, cid);
      for (const b of placed.blocks) for (const m of b.members) blockHub.set(m, b.hub);
      parts.push({ id: `c${cid}`, w: placed.w, h: placed.h, placed });
    }
    if (loose.length) {
      // the unrelated objects: one captioned block, so they read as a fact of
      // the group ("no relation here") and not as cards that drifted off
      const grid = gridOf(loose, size, 1.4);
      for (const n of loose) clusterOf.set(n, ci++);   // each loose object its own cluster
      const pos = new Map([...grid.pos].map(([id, c]) => [id, { x: c.x + LOOSE_PAD, y: c.y + LOOSE_HEAD + LOOSE_PAD }]));
      const w = grid.w + LOOSE_PAD * 2, h = grid.h + LOOSE_HEAD + LOOSE_PAD * 2;
      parts.push({ id: `l${ci}`, w, h, placed: { pos, w, h, blocks: [] }, loose: loose.length });
    }
    // a lone group IS the picture: pack it to the canvas's own shape (less
    // its header); a group among others packs to a moderate landscape
    const inner = masonryPack(parts, live.length === 1 ? opts.aspect * 1.08 : 1.35, GAP);
    const pad = framed ? PAD : 0;
    const head = framed && g.title ? HEAD : 0;
    return { g, parts, inner, w: inner.w + pad * 2, h: inner.h + pad * 2 + head, pad, head };
  });

  const outer = masonryPack(built.map((b) => ({ id: b.g.id, w: b.w, h: b.h })), opts.aspect, GROUP_GAP);
  const nodes: PNode[] = [];
  const frames: PGroup[] = [];
  const blocks: PBlock[] = [];
  const looseOut: PLoose[] = [];
  for (const b of built) {
    const o = outer.pos.get(b.g.id)!;
    if (framed) frames.push({ id: b.g.id, title: b.g.title, count: b.g.members.length, x: o.x, y: o.y, w: b.w, h: b.h });
    for (const part of b.parts) {
      const p = b.inner.pos.get(part.id)!;
      const ox = o.x + b.pad + p.x, oy = o.y + b.pad + b.head + p.y;
      for (const [id, c] of part.placed.pos) {
        const s = size(id);
        nodes.push({ id, w: s.w, h: s.h, group: b.g.id, x: ox + c.x, y: oy + c.y });
      }
      for (const bl of part.placed.blocks) blocks.push({ ...bl, x: ox + bl.x, y: oy + bl.y });
      if (part.loose) looseOut.push({ group: b.g.id, count: part.loose, x: ox, y: oy, w: part.w, h: part.h });
    }
  }
  const inShape = (a: string, b: string) => !!shape.get(a)?.has(b);
  const edges = edgesOf(all, adj, (a, b) =>
    blockHub.get(a) === b || blockHub.get(b) === a ? "leaf"
      : clusterOf.get(a) === clusterOf.get(b) && inShape(a, b) ? "in"
        : "cross");
  const out: StudioLayout = { nodes: nodes.sort((a, b) => a.id.localeCompare(b.id)), edges, groups: frames, blocks, loose: looseOut, w: Math.max(outer.w, 1), h: Math.max(outer.h, 1), dir: opts.dir ?? "LR" };
  if (opts.mirror) mirrorAll(out);
  return out;
}

/** How large a picture of this shape is drawn on a canvas of `aspect`
 *  (width / height), up to a common factor: what the orientation and the
 *  packing choices compare. */
export const fitScore = (l: { w: number; h: number }, aspect: number) => Math.min(aspect / l.w, 1 / l.h);

/** The general layout in both directions; the one that fits the canvas
 *  larger is the picture (a small margin favours LR, the ERD's direction). */
export function layoutGroupsBest(groups: GroupSpec[], adj: Adj, size: (id: string) => Size, opts: LayoutOpts): StudioLayout {
  const lr = layoutGroups(groups, adj, size, { ...opts, dir: "LR" });
  const tb = layoutGroups(groups, adj, size, { ...opts, dir: "TB" });
  return fitScore(tb, opts.aspect) > fitScore(lr, opts.aspect) * 1.06 ? tb : lr;
}

/* ------------------------------------------------------------- the board */

/**
 * A board of columns (ECC ↔ S/4: one column per verdict). Each column's cards
 * stand in sub-columns of one shared height, and that height is the one at
 * which the whole board fits the canvas largest. Cards keep the order they
 * are given in (the view sorts them by zone, then code). No relation shapes a
 * board, so every relation is a cross edge, drawn when one end is lit.
 */
export function layoutBoard(columns: GroupSpec[], adj: Adj, size: (id: string) => Size, opts: LayoutOpts): StudioLayout {
  const live = columns.filter((c) => c.members.length);
  const cells = live.map((c) => ({
    cw: Math.max(...c.members.map((m) => size(m).w)) + 12,
    ch: Math.max(...c.members.map((m) => size(m).h)) + 10,
  }));
  const most = Math.max(1, ...live.map((c) => c.members.length));
  let best: { rows: number; k: number } | null = null;
  for (let rows = Math.min(4, most); rows <= most; rows++) {
    let w = 0, h = 0;
    live.forEach((c, i) => {
      const cols = Math.ceil(c.members.length / rows);
      w += cols * cells[i].cw - 12 + PAD * 2;
      h = Math.max(h, HEAD + PAD * 2 + Math.min(rows, c.members.length) * cells[i].ch - 10);
    });
    w += GROUP_GAP * (live.length - 1);
    const k = Math.min(opts.aspect / w, 1 / h);
    if (!best || k > best.k) best = { rows, k };
  }
  const rows = best?.rows ?? 1;
  const nodes: PNode[] = [];
  const frames: PGroup[] = [];
  let x = 0, H = 0;
  live.forEach((c, i) => {
    const { cw, ch } = cells[i];
    const cols = Math.ceil(c.members.length / rows);
    const fw = cols * cw - 12 + PAD * 2;
    const fh = HEAD + PAD * 2 + Math.min(rows, c.members.length) * ch - 10;
    c.members.forEach((id, j) => {
      const s = size(id);
      const col = Math.floor(j / rows), row = j % rows;
      nodes.push({ id, w: s.w, h: s.h, group: c.id, x: x + PAD + col * cw + (cw - 12) / 2, y: HEAD + PAD + row * ch + (ch - 10) / 2 });
    });
    frames.push({ id: c.id, title: c.title, count: c.members.length, x, y: 0, w: fw, h: fh });
    x += fw + GROUP_GAP;
    H = Math.max(H, fh);
  });
  for (const f of frames) f.h = H;
  const all = new Set(nodes.map((n) => n.id));
  const out: StudioLayout = { nodes: nodes.sort((a, b) => a.id.localeCompare(b.id)), edges: edgesOf(all, adj, () => "cross"), groups: frames, blocks: [], loose: [], w: Math.max(x - GROUP_GAP, 1), h: Math.max(H, 1), dir: "LR" };
  if (opts.mirror) mirrorAll(out);
  return out;
}

/* ----------------------------------------------------------- the process */

export interface FlowStep { label: string; code: string }
export interface ProcessColumn { step: number; label: string; code: string; inGraph: boolean; tables: string[]; row: number }

/**
 * A module's process, as its own picture: the steps in order, right to left,
 * each step's table at the head of a frame, and under it the tables related to
 * that step that no earlier step has already claimed. A step whose code is not
 * a table of this module keeps its place and its words; it simply has no card.
 *
 * Each frame is as tall as its own list. A long list stands in two or more
 * sub-columns instead of one tall one, and long processes wrap like lines of
 * text; the list height and the row count are the pair at which the whole
 * picture fits the canvas largest (`aspect` = the canvas's width / height).
 *
 * The order of the steps is the process, not a relation between their tables
 * (the data relates only 2 of the 15 consecutive pairs), so no edge joins one
 * step to the next; the stage draws the order as a sequence line.
 */
export function layoutProcess(
  steps: FlowStep[],
  isTable: (id: string) => boolean,
  adj: Adj,
  size: (id: string) => Size,
  aspect = 1.6,
): { layout: StudioLayout; columns: ProcessColumn[] } {
  const SUB_GAP = 30, FPAD = 14, COL_GAP = 28, HEAD_Y = 50, LIST_Y = 50, ROW_GAP = 10, BAND_GAP = 64;
  const claimed = new Set(steps.filter((s) => isTable(s.code)).map((s) => s.code));
  const cols = steps.map((s, i) => {
    const inGraph = isTable(s.code);
    const near = inGraph
      ? [...(adj.get(s.code) || [])].filter((n) => isTable(n) && !claimed.has(n)).sort()
      : [];
    for (const n of near) claimed.add(n);
    return { step: i + 1, label: s.label, code: s.code, inGraph, tables: near };
  });
  const all = cols.flatMap((c) => (c.inGraph ? [c.code, ...c.tables] : c.tables));
  const cw = Math.max(176, ...all.map((id) => size(id).w));
  const ch = Math.max(44, ...all.map((id) => size(id).h));
  const headH = (c: (typeof cols)[number]) => (c.inGraph ? size(c.code).h : 64);

  const frameOf = (c: (typeof cols)[number], per: number) => {
    const sub = Math.max(1, Math.ceil(c.tables.length / per));
    const rows = Math.min(per, c.tables.length);
    const w = sub * cw + (sub - 1) * SUB_GAP + FPAD * 2;
    const h = HEAD_Y + headH(c) + (rows ? LIST_Y - 24 + rows * (ch + ROW_GAP) : 0) + FPAD;
    return { sub, w, h };
  };
  const most = Math.max(1, ...cols.map((c) => c.tables.length));
  let best: { k: number; rows: number; per: number } | null = null;
  for (let rows = 1; rows <= Math.min(3, cols.length); rows++) {
    const perRow = Math.ceil(cols.length / rows);
    for (let per = Math.min(3, most); per <= most; per++) {
      let W = 0, H = 0;
      for (let r = 0; r < rows; r++) {
        const inRow = cols.slice(r * perRow, r * perRow + perRow).map((c) => frameOf(c, per));
        W = Math.max(W, inRow.reduce((a, f) => a + f.w, 0) + COL_GAP * (inRow.length - 1));
        H += Math.max(0, ...inRow.map((f) => f.h));
      }
      H += BAND_GAP * (rows - 1);
      const k = Math.min(aspect / W, 1 / H);
      if (!best || k > best.k * 1.02) best = { k, rows, per };
    }
  }
  const { rows, per } = best!;
  const perRow = Math.ceil(cols.length / rows);

  const nodes: PNode[] = [];
  const groups: PGroup[] = [];
  const columns: ProcessColumn[] = [];
  let top = 0, W = 0;
  const rowsOut: { frames: { c: (typeof cols)[number]; f: ReturnType<typeof frameOf> }[]; h: number }[] = [];
  for (let r = 0; r < rows; r++) {
    const frames = cols.slice(r * perRow, r * perRow + perRow).map((c) => ({ c, f: frameOf(c, per) }));
    rowsOut.push({ frames, h: Math.max(0, ...frames.map((x) => x.f.h)) });
    W = Math.max(W, frames.reduce((a, x) => a + x.f.w, 0) + COL_GAP * (frames.length - 1));
  }
  rowsOut.forEach(({ frames, h }, r) => {
    // step 1 of every row at the right edge, the rest to its left
    let right = W;
    for (const { c, f } of frames) {
      const x0 = right - f.w;
      const firstX = x0 + f.w - FPAD - cw / 2;   // the right-hand sub-column
      if (c.inGraph) {
        const s = size(c.code);
        nodes.push({ id: c.code, x: firstX, y: top + HEAD_Y + s.h / 2, w: s.w, h: s.h, group: `step${c.step}` });
      }
      const y0 = top + HEAD_Y + headH(c) + LIST_Y - 24;
      c.tables.forEach((t, i) => {
        const s = size(t);
        const sub = Math.floor(i / per), row = i % per;
        nodes.push({ id: t, x: firstX - sub * (cw + SUB_GAP), y: y0 + row * (ch + ROW_GAP) + s.h / 2, w: s.w, h: s.h, group: `step${c.step}` });
      });
      groups.push({ id: `step${c.step}`, title: c.label, count: c.tables.length + (c.inGraph ? 1 : 0), x: x0, y: top, w: f.w, h: f.h });
      columns.push({ step: c.step, label: c.label, code: c.code, inGraph: c.inGraph, tables: c.tables, row: r });
      right = x0 - COL_GAP;
    }
    top += h + BAND_GAP;
  });

  const on = new Set(nodes.map((n) => n.id));
  const head = new Map<string, string>();
  for (const c of columns) for (const t of c.tables) head.set(t, c.code);
  const edges = edgesOf(on, adj, (a, b) => (head.get(a) === b || head.get(b) === a ? "in" : "cross"));
  return {
    layout: { nodes: nodes.sort((a, b) => a.id.localeCompare(b.id)), edges, groups, blocks: [], loose: [], w: W, h: Math.max(1, top - BAND_GAP), dir: "LR" },
    columns,
  };
}
