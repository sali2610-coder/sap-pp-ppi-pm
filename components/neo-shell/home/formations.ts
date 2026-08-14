// Project NEO · Stage 2C — the field mathematics.
//
// 105 real merged SAP tables. ONE set of elements for the whole page: a section
// change never creates, destroys or reshuffles a dot, it only moves the dot that
// is already there.
//
// STAGE 2C — WHAT CHANGED AND WHY.
// The note was that the dots read as visual noise: many moving coloured points
// instead of a knowledge structure. The concept is not removed, it is rebuilt on
// three rules that are enforced by this file rather than promised by it:
//
//   1. NO RANDOMNESS. There is no RNG in this module any more, and no formation
//      uses jitter, a golden-angle spiral or a free orbit. Every dot lands in a
//      lattice slot whose index is a real index in the dictionary (its band, its
//      coverage score, its family, its topic, its chain position, its S/4 class).
//      A formation that cannot be built from such an index does not exist here.
//   2. EVERY FORMATION IS LEGIBLE FROZEN, AND IT SAYS WHAT IT PROVES. Each one
//      returns a LEAD caption naming the claim plus a caption per group carrying
//      that group's real count — see captions() below. If a formation could not
//      be named in one line it would not be in this switch.
//   3. NOTHING EVER VANISHES. The opacity floor across every formation is 0.34,
//      so a group can recede but never disappear; the only dots that reach 0 are
//      the ones handed over to a content element, and they re-emerge from that
//      same element (the FLIP in home-scene.tsx).
//
// THE SIX FORMATIONS, AND THE ONE FACT EACH ENCODES
//  -1 approach    the section-0 lattice, displaced off the far edge. The page
//                 opens by sliding its FIRST CLAIM in, not by gathering scatter.
//   0 membership  three blocks: PM only · both · PP-PI only. Proves that the
//                 dictionary's two module lists overlap, and by how much.
//   1 coverage    one column per documentation score, columns bottom-aligned on
//                 one baseline. Proves how deep the documentation actually goes,
//                 including the low columns that stay empty.
//   2 families    the shared tables become a row of heads; everything the ER map
//                 hangs off one of them stacks underneath it. Proves which
//                 shared tables carry dependents, and how many.
//   3 topics      one tidy block per real topic, PM banded above PP-PI. Proves
//                 that no two topics carry the same number of tables.
//   4 process     two rails, one per modelled chain, dependents stacked at each
//                 step. Proves how much of the dictionary sits on the process.
//   5 migration   the kept lattice, with the replaced tables extracted out of it
//                 to the reading edge. Proves how small the disruption is.
//
// CONTINUITY IS GEOMETRY, NOT A CROSS-FADE. Two lines are deliberately shared
// between formations so the eye can hold on to them: SPINE_Y carries the family
// head row in 2 and the first process rail in 4, and PLINTH_Y carries the
// "outside this claim" reservoir in both 2 and 4. The same dots occupy the same
// line for two different reasons, which is what makes the change read as one
// dataset re-forming instead of a new drawing.
//
// Pure functions, no DOM, no React, no Math.random.

import type { DensityTopic, HomeDot, HomeEdge } from "./home-data";

/** Canvas widths, matched one-for-one to the @container breakpoints in
 *  app/neo/home.css. CANVAS widths, not window widths: the rail owns up to
 *  22rem of the window, so the two must never be confused. */
export const NARROW = 760;
export const DOCK = 1050;

/** The two lines the formations share. Held here so 2 and 4 cannot drift. */
const SPINE_Y = 0.26;
const PLINTH_Y = 0.94;

/** A dot with every index the formations need, resolved once. Every field is an
 *  INDEX INTO REAL DATA — there is no decorative member on this record. */
export interface Prep {
  d: HomeDot;
  /** Global index in the (already sorted) dictionary order. */
  i: number;
  /** Index inside the membership band — drives the three blocks in formation 0. */
  j: number;
  /** Index inside the coverage-score group — drives the column in formation 1. */
  c: number;
  /** Index inside the S/4 class group — drives the lattice in formation 5. */
  s: number;
  /** Index inside its own topic block — drives formation 3. */
  tc: number;
  /** Position in the merged process chain, or -1 when the table is not on one. */
  flow: number;
  /** Which chain: 0 = PM, 1 = PP-PI, -1 = none. */
  chain: number;
  /** Length of that chain. */
  chainN: number;
  /** A table in the shared band this one is ER-linked to, or -1. Real relation,
   *  never a guess — this is what makes formation 2 a family and not a cloud. */
  sAttr: number;
  /** Index inside that family, and the family's size. */
  fam: number;
  famN: number;
  /** A table on a modelled chain this one is ER-linked to, or -1. */
  fAttr: number;
  /** Index inside that step's dependents, and how many there are. */
  dep: number;
  depN: number;
  /** Index inside formation 2's reservoir (linked to no shared table). */
  res: number;
  /** Index inside formation 4's reservoir (on no chain, linked to no step). */
  res4: number;
  /** Depth plane: 0 front (sharp), 1 mid, 2 far (blurred). From the real
   *  documentation-coverage score, so depth encodes how much we actually know. */
  z: 0 | 1 | 2;
}

export interface Placed { x: number; y: number; s: number; o: number }

/** One topic block's slot in the formation-3 composition. */
export interface TopicSlot {
  /** 0 = PM band, 1 = PP-PI band. */
  m: 0 | 1;
  col: number;
  row: number;
  cols: number;
  rows: number;
  /** Dots the field actually draws inside it. */
  n: number;
  /** Tables the dictionary counts for it (may exceed n: a table documented by
   *  both modules is drawn once, inside the first topic that documents it). */
  tables: number;
  idx: number;
  title: string;
}

/** Group sizes, counted once from the preps. Every formation sizes its lattice
 *  from these, so a lattice can never be wider than the group it holds. */
export interface Counts {
  /** By membership band: PM only · both · PP-PI only. */
  band: number[];
  /** By documentation score, 0..6. */
  cov: number[];
  /** By S/4 class: kept · replaced · removed. */
  s4: number[];
  /** Tables pulled into a shared table's family, and those left outside it. */
  pulled: number;
  loose: number;
  /** Tables hanging off a chain step, and those on neither. */
  dep: number;
  loose4: number;
  /** Modelled steps per chain. */
  chain: number[];
}

export interface Env {
  W: number;
  H: number;
  maxF: number;
  maxCov: number;
  maxTopic: number;
  /** Every prep, indexed by Prep.i — attraction resolves through this. */
  all: Prep[];
  topics: TopicSlot[];
  counts: Counts;
}

export function prepare(dots: HomeDot[], chains: string[][], edges: HomeEdge[]): Prep[] {
  const bandN: Record<number, number> = {};
  const covN: Record<number, number> = {};
  const s4N: Record<number, number> = {};
  const topN: Record<number, number> = {};

  const chainAt = new Map<string, { chain: number; flow: number; n: number }>();
  chains.forEach((c, k) => c.forEach((code, at) => {
    if (!chainAt.has(code)) chainAt.set(code, { chain: k, flow: at, n: c.length });
  }));

  // Adjacency over the real ER edges, then two attractor lookups. A table is
  // attracted to the neighbour the dictionary states, and to nothing else.
  const adj: number[][] = dots.map(() => []);
  for (const e of edges) { adj[e.a].push(e.b); adj[e.b].push(e.a); }
  const pick = (list: number[], ok: (i: number) => boolean) => {
    let best = -1;
    for (const k of list) {
      if (!ok(k)) continue;
      if (best < 0 || dots[k].f > dots[best].f) best = k;
    }
    return best;
  };

  const out: Prep[] = dots.map((d, i) => {
    const j = (bandN[d.b] = (bandN[d.b] ?? 0) + 1) - 1;
    const c = (covN[d.d] = (covN[d.d] ?? 0) + 1) - 1;
    const s = (s4N[d.s] = (s4N[d.s] ?? 0) + 1) - 1;
    const tc = (topN[d.tp] = (topN[d.tp] ?? 0) + 1) - 1;
    const ch = chainAt.get(d.n);
    return {
      d, i, j, c, s, tc,
      flow: ch ? ch.flow : -1,
      chain: ch ? ch.chain : -1,
      chainN: ch ? ch.n : 0,
      sAttr: d.b === 1 ? -1 : pick(adj[i], (k) => dots[k].b === 1),
      fam: 0, famN: 0,
      fAttr: chainAt.has(d.n) ? -1 : pick(adj[i], (k) => chainAt.has(dots[k].n)),
      dep: 0, depN: 0,
      res: 0, res4: 0,
      z: (d.d >= 6 ? 0 : d.d === 5 ? 1 : 2) as 0 | 1 | 2,
    };
  });

  // Second pass: the family / dependent / reservoir indices. These are what turn
  // "orbit your neighbour" into "stack under your neighbour" — a family reads as
  // a family because its members occupy consecutive slots in one column.
  const famAt = new Map<number, number>();
  for (const p of out) {
    if (p.sAttr < 0) continue;
    const k = famAt.get(p.sAttr) ?? 0;
    p.fam = k;
    famAt.set(p.sAttr, k + 1);
  }
  const depAt = new Map<number, number>();
  for (const p of out) {
    if (p.fAttr < 0) continue;
    const k = depAt.get(p.fAttr) ?? 0;
    p.dep = k;
    depAt.set(p.fAttr, k + 1);
  }
  let r2 = 0;
  let r4 = 0;
  for (const p of out) {
    if (p.sAttr >= 0) p.famN = famAt.get(p.sAttr) ?? 1;
    if (p.fAttr >= 0) p.depN = depAt.get(p.fAttr) ?? 1;
    if (p.d.b !== 1 && p.sAttr < 0) { p.res = r2; r2 += 1; }
    if (p.flow < 0 && p.fAttr < 0) { p.res4 = r4; r4 += 1; }
  }
  return out;
}

export function tally(all: Prep[]): Counts {
  const band = [0, 0, 0];
  const cov: number[] = [];
  const s4 = [0, 0, 0];
  const chain = [0, 0];
  let pulled = 0; let loose = 0; let dep = 0; let loose4 = 0;
  for (const p of all) {
    band[p.d.b] = (band[p.d.b] || 0) + 1;
    cov[p.d.d] = (cov[p.d.d] || 0) + 1;
    s4[p.d.s] = (s4[p.d.s] || 0) + 1;
    if (p.chain >= 0) chain[p.chain] = (chain[p.chain] || 0) + 1;
    if (p.d.b !== 1) { if (p.sAttr >= 0) pulled += 1; else loose += 1; }
    if (p.flow < 0) { if (p.fAttr >= 0) dep += 1; else loose4 += 1; }
  }
  return { band, cov, s4, pulled, loose, dep, loose4, chain };
}

/** The 19 real topics, laid out as two banded grids — PM above, PP-PI below —
 *  which is the same split the two lists in section 04 use. */
export function topicSlots(density: DensityTopic[], counts: number[]): TopicSlot[] {
  const of: Record<0 | 1, number[]> = { 0: [], 1: [] };
  density.forEach((t, i) => of[t.key === "PM" ? 0 : 1].push(i));
  const out: TopicSlot[] = density.map(() => ({
    m: 0, col: 0, row: 0, cols: 1, rows: 1, n: 0, tables: 0, idx: 0, title: "",
  }));
  ([0, 1] as const).forEach((m) => {
    const list = of[m];
    const cols = Math.min(5, Math.max(2, Math.ceil(Math.sqrt(list.length))));
    const rows = Math.max(1, Math.ceil(list.length / cols));
    list.forEach((di, k) => {
      out[di] = {
        m,
        col: k % cols,
        row: Math.floor(k / cols),
        cols,
        rows,
        n: counts[di] || 0,
        tables: density[di].tables,
        idx: density[di].idx,
        title: density[di].title,
      };
    });
  });
  return out;
}

/* ------------------------------------------------------------- the lattices
   One helper per formation, returning the block's centre and its lattice. Both
   place() and captions() read these, so a label can never end up naming a group
   that is not where the label says it is. */

interface Block { cx: number; cy: number; cols: number; rows: number; pitch: number }

const slot = (k: number, b: Block) => ({
  dx: ((k % b.cols) - (b.cols - 1) / 2) * b.pitch,
  dy: Math.floor(k / b.cols) * b.pitch,
});

/** Formation 0 lives beside the hero copy rather than under it: on a docked
 *  canvas the editorial column owns the reading half and the two module cards
 *  own the far edge, so the three blocks take the corridor between them. Below
 *  the dock breakpoint the cards become a corner dock and the corridor opens. */
function corridor(env: Env): [number, number] {
  return env.W >= DOCK ? [0.47, 0.70] : [0.08, 0.92];
}

const BAND_Y = [0.21, 0.50, 0.79];
const BAND_Y_TIGHT = [0.28, 0.52, 0.76];

function memberBlock(band: number, env: Env): Block {
  const { W, H } = env;
  const m = Math.min(W, H);
  const [a, b] = corridor(env);
  const bw = (b - a) * W;
  const n = Math.max(1, env.counts.band[band] || 1);
  const cols = Math.max(3, Math.round(Math.sqrt(n * 2.6)));
  const ys = W >= DOCK ? BAND_Y : BAND_Y_TIGHT;
  return {
    cx: ((a + b) / 2) * W,
    cy: ys[band] * H,
    cols,
    rows: Math.ceil(n / cols),
    pitch: Math.min(m * 0.040, bw / cols),
  };
}

/** Formation 1. One column per score, all of them standing on ONE baseline, so
 *  column height is directly comparable across the whole row. */
const COV_BASE = 0.80;

function covColumn(score: number, env: Env): Block {
  const { W, H, maxCov } = env;
  const m = Math.min(W, H);
  const n = Math.max(1, env.counts.cov[score] || 1);
  const lane = (W * 0.74) / (maxCov + 1);
  const cols = n > 26 ? 5 : n > 12 ? 4 : 3;
  return {
    cx: (0.13 + (score / maxCov) * 0.74) * W,
    cy: H * COV_BASE,
    cols,
    rows: Math.ceil(n / cols),
    pitch: Math.min(m * 0.030, (lane * 0.86) / cols),
  };
}

/** Formation 2. The shared tables become a row of family heads on the spine. */
function headX(j: number, env: Env): number {
  const n = Math.max(1, env.counts.band[1]);
  return (0.07 + (0.86 * (j + 0.5)) / n) * env.W;
}

/** The reservoir both 2 and 4 park their "outside this claim" group in: a tidy
 *  plinth on the block-end edge, filled from the bottom row upward. Dim, never
 *  gone — a table that is not part of the current claim is still in the set. */
function reservoir(n: number, env: Env): Block {
  const { W, H } = env;
  const m = Math.min(W, H);
  const cols = Math.max(8, Math.min(26, Math.round(Math.sqrt(Math.max(1, n) * 6))));
  return {
    cx: W * 0.5,
    cy: H * PLINTH_Y,
    cols,
    rows: Math.ceil(Math.max(1, n) / cols),
    pitch: Math.min((W * 0.84) / cols, m * 0.026),
  };
}

function topicBlock(t: TopicSlot, env: Env): Block {
  const { W, H } = env;
  const m = Math.min(W, H);
  const cw = (W * 0.94) / t.cols;
  const chh = (H * 0.34) / t.rows;
  const n = Math.max(1, t.n);
  const cols = Math.max(1, Math.round(Math.sqrt(n * 1.4)));
  const rows = Math.ceil(n / cols);
  return {
    cx: W * 0.03 + cw * (t.col + 0.5),
    cy: H * (t.m === 0 ? 0.10 : 0.56) + chh * (t.row + 0.5),
    cols,
    rows,
    pitch: Math.min(m * 0.026, (cw * 0.62) / cols, (chh * 0.56) / rows),
  };
}

/** Formation 4. Rail 0 sits on the SAME spine formation 2's head row used. */
const railY = (chain: number, H: number) => H * (chain === 0 ? SPINE_Y : 0.72);

function stepPos(q: Prep, env: Env) {
  const t = q.chainN > 1 ? q.flow / (q.chainN - 1) : 0.5;
  return { x: env.W * 0.10 + t * env.W * 0.80, y: railY(q.chain, env.H) };
}

/** Formation 5. The kept tables resolve into the same even lattice the
 *  workspace grid is built on; the replaced ones are lifted out of it. */
function keptLattice(env: Env): Block {
  const { W, H } = env;
  const m = Math.min(W, H);
  const n = Math.max(1, env.counts.s4[0]);
  const cols = Math.max(6, Math.min(16, Math.round(Math.sqrt(n * 2.2))));
  return {
    cx: W * 0.64,
    cy: H * 0.50,
    cols,
    rows: Math.ceil(n / cols),
    pitch: Math.min((W * 0.56) / cols, m * 0.052),
  };
}

const EXTRACT_X = 0.26;
const extractY = (cls: number, k: number, env: Env) =>
  env.H * (cls === 1 ? 0.28 : 0.66) + k * Math.min(env.H * 0.075, Math.min(env.W, env.H) * 0.062);

/* ------------------------------------------------------------------ placing */

/** Field-count → visual scale. Documentation depth is the only thing that makes
 *  a dot big, so "large" always means "we know more about this table". */
const depth = (f: number, maxF: number) => 0.62 + (f / maxF) * 0.92;

export function place(sec: number, p: Prep, env: Env): Placed {
  const { W, H, maxF, maxCov } = env;
  const m = Math.min(W, H);
  const base = depth(p.d.f, maxF);

  switch (sec) {
    /* -1 · APPROACH — formation 0, displaced off the far edge and transparent.
       The page's first move is therefore its first CLAIM sliding into place from
       one direction, not a hundred points converging out of a scatter. */
    case -1: {
      const q = place(0, p, env);
      return { x: q.x + m * 0.55, y: q.y, s: q.s * 0.86, o: 0 };
    }

    /* 0 · MEMBERSHIP — three blocks. PM only, both, PP-PI only, in that reading
       order down the canvas, each one a filled lattice whose area IS its count.
       Claim: the two module dictionaries overlap, and the overlap is a block you
       can see the size of. */
    case 0: {
      const b = memberBlock(p.d.b, env);
      const q = slot(p.j, b);
      return {
        x: b.cx + q.dx,
        y: b.cy + q.dy - ((b.rows - 1) * b.pitch) / 2,
        s: base * (p.d.b === 1 ? 1.22 : 0.98),
        o: p.d.b === 1 ? 1 : 0.88,
      };
    }

    /* 1 · COVERAGE — one column per documentation score, every column standing
       on one baseline and growing upward. The low columns stay empty because no
       table scores below three, and section 02 says so in words. */
    case 1: {
      const b = covColumn(p.d.d, env);
      const q = slot(p.c, b);
      return {
        x: b.cx + q.dx,
        y: b.cy - q.dy,
        s: 0.60 + (p.d.d / maxCov) * 0.75,
        o: 0.50 + (p.d.d / maxCov) * 0.50,
      };
    }

    /* 2 · FAMILIES — the shared tables line up on the spine as heads; every
       table the ER map hangs off one of them stacks in that head's column. The
       height of a column is literally how many dependents that table carries. */
    case 2: {
      if (p.d.b === 1) {
        return { x: headX(p.j, env), y: H * SPINE_Y, s: base * 1.45, o: 1 };
      }
      if (p.sAttr >= 0) {
        const lane = (W * 0.86) / Math.max(1, env.counts.band[1]);
        const cols = p.famN > 7 ? 2 : 1;
        const px = Math.min(lane * 0.42, m * 0.024);
        const py = Math.min(m * 0.028, H * 0.036);
        return {
          x: headX(env.all[p.sAttr].j, env) + ((p.fam % cols) - (cols - 1) / 2) * px,
          y: H * SPINE_Y + m * 0.058 + Math.floor(p.fam / cols) * py,
          s: 0.62 + base * 0.26,
          o: 0.82,
        };
      }
      const b = reservoir(env.counts.loose, env);
      const q = slot(p.res, b);
      return { x: b.cx + q.dx, y: b.cy - q.dy, s: 0.54, o: 0.38 };
    }

    /* 3 · TOPICS — one tidy block per real topic, PM banded above PP-PI, which
       is the same split the two lists in section 04 use. Block area is the
       tables the topic documents, so no two blocks are the same size. */
    case 3: {
      const t = env.topics[p.d.tp];
      if (!t) return { x: W * 0.5, y: H * 0.5, s: 0.5, o: 0.34 };
      const b = topicBlock(t, env);
      const q = slot(p.tc, b);
      return {
        x: b.cx + q.dx,
        y: b.cy + q.dy - ((b.rows - 1) * b.pitch) / 2,
        s: 0.58 + base * 0.34,
        o: 0.56 + 0.44 * (t.tables / env.maxTopic),
      };
    }

    /* 4 · PROCESS — two rails, one per modelled chain, in the dictionary's own
       step order. A table the ER map links to a step stacks with that step, so
       the rail shows both the chain AND its real weight. */
    case 4: {
      if (p.flow >= 0) {
        const q = stepPos(p, env);
        return { x: q.x, y: q.y, s: 1.7, o: 1 };
      }
      if (p.fAttr >= 0) {
        const host = env.all[p.fAttr];
        const q = stepPos(host, env);
        const cols = p.depN > 6 ? 2 : 1;
        const px = Math.min(m * 0.022, ((W * 0.80) / Math.max(2, host.chainN)) * 0.40);
        const py = Math.min(m * 0.026, H * 0.032);
        // Rail 0 grows down, rail 1 grows up: the two stacks meet in the middle
        // of the canvas instead of running off it.
        const dir = host.chain === 1 ? -1 : 1;
        return {
          x: q.x + ((p.dep % cols) - (cols - 1) / 2) * px,
          y: q.y + dir * (m * 0.058 + Math.floor(p.dep / cols) * py),
          s: 0.68,
          o: 0.66,
        };
      }
      const b = reservoir(env.counts.loose4, env);
      const q = slot(p.res4, b);
      return { x: b.cx + q.dx, y: b.cy - q.dy, s: 0.54, o: 0.36 };
    }

    /* 5 · MIGRATION — the tables the dictionary keeps resolve into one even
       lattice, and the handful it marks replaced is lifted clean out of it to
       the reading edge. The "removed" column is empty because the dictionary
       marks nothing removed, and section 06 says so out loud. */
    default: {
      if (p.d.s > 0) {
        return { x: W * EXTRACT_X, y: extractY(p.d.s, p.s, env), s: 2.0, o: 1 };
      }
      const b = keptLattice(env);
      const q = slot(p.s, b);
      return {
        x: b.cx + q.dx,
        y: b.cy + q.dy - ((b.rows - 1) * b.pitch) / 2,
        s: 0.70,
        o: 0.44,
      };
    }
  }
}

/* ---------------------------------------------------------------- captions */

export type Tone = "pm" | "pp" | "ink";

/** A label the field carries for itself.
 *  `lead` is the formation's own headline — the one line that says what the
 *  whole arrangement proves. Everything else is a group label carrying that
 *  group's real count. Every string here is read off the dictionary at paint
 *  time; the field is never allowed to be a shape with no name. */
export interface Caption {
  id: string;
  x: number;
  y: number;
  /** Lead: the claim, in words. Group: the count. */
  t: string;
  /** Lead: the counts. Group: what the count is of. */
  s: string;
  tone: Tone;
  lead?: boolean;
}

export function captions(sec: number, env: Env, live: number[]): Caption[] {
  const { W, H, all, topics, counts } = env;
  const m = Math.min(W, H);
  const nf = new Intl.NumberFormat("he-IL");
  const total = all.length;

  switch (sec) {
    case 0: {
      const b0 = memberBlock(0, env);
      const b1 = memberBlock(1, env);
      const b2 = memberBlock(2, env);
      const over = (b: Block) => b.cy - ((b.rows - 1) * b.pitch) / 2 - m * 0.045;
      return [
        {
          id: "lead", lead: true, tone: "ink",
          x: b0.cx, y: over(b0) - m * 0.052,
          t: "שלוש קבוצות שיוך", s: `${nf.format(total)} טבלאות מאוחדות`,
        },
        { id: "b0", x: b0.cx, y: over(b0), t: `${counts.band[0]}`, s: "PM בלבד", tone: "pm" },
        { id: "b1", x: b1.cx, y: over(b1), t: `${counts.band[1]}`, s: "בשני המודולים", tone: "ink" },
        { id: "b2", x: b2.cx, y: over(b2), t: `${counts.band[2]}`, s: "PP-PI בלבד", tone: "pp" },
      ];
    }

    case 1: {
      const out: Caption[] = [{
        id: "lead", lead: true, tone: "ink",
        x: W * 0.5, y: H * (COV_BASE + 0.115),
        t: "עומק תיעוד", s: `עמודה לכל ציון · מתוך ${env.maxCov} צירים`,
      }];
      counts.cov.forEach((n, score) => {
        if (!n) return;
        const b = covColumn(score, env);
        out.push({
          id: `cov-${score}`, tone: "ink",
          x: b.cx, y: H * (COV_BASE + 0.045),
          t: `${score}/${env.maxCov}`, s: `${n} טבלאות`,
        });
      });
      return out;
    }

    case 2: {
      const res = reservoir(counts.loose, env);
      return [
        {
          id: "lead", lead: true, tone: "ink",
          x: W * 0.5, y: H * SPINE_Y - m * 0.135,
          t: "משפחות טבלאות", s: `${counts.band[1]} ראשים · ${counts.pulled} תלויות`,
        },
        {
          id: "er", tone: "ink",
          x: W * 0.86, y: H * SPINE_Y - m * 0.062,
          t: `${live[0]}`, s: "קשרי ER מצוירים",
        },
        {
          id: "loose", tone: "ink",
          x: W * 0.5, y: res.cy - (res.rows - 1) * res.pitch - m * 0.042,
          t: `${counts.loose}`, s: "ללא קשר לאף משותפת",
        },
      ];
    }

    case 3: {
      const out: Caption[] = [{
        id: "lead", lead: true, tone: "ink",
        x: W * 0.5, y: H * 0.035,
        t: "גושי נושא", s: `${topics.length} נושאים · הגודל הוא מספר הטבלאות`,
      }];
      topics.forEach((t, i) => {
        const b = topicBlock(t, env);
        out.push({
          id: `tp-${i}`,
          x: b.cx,
          y: b.cy - ((b.rows - 1) * b.pitch) / 2 - m * 0.034,
          t: `${t.tables}`,
          s: `נושא ${String(t.idx).padStart(2, "0")}`,
          tone: t.m === 0 ? "pm" : "pp",
        });
      });
      return out;
    }

    case 4: {
      const res = reservoir(counts.loose4, env);
      const rail = (chain: number, tone: Tone, label: string) => {
        const linked = all.filter((p) => p.fAttr >= 0 && all[p.fAttr].chain === chain).length;
        return {
          id: `flow-${chain}`,
          x: W * 0.11,
          y: railY(chain, H) - m * 0.070,
          t: `${counts.chain[chain] || 0} שלבים`,
          s: `${label} · ${linked} תלויות`,
          tone,
        };
      };
      return [
        {
          id: "lead", lead: true, tone: "ink",
          x: W * 0.5, y: H * 0.035,
          t: "שתי שרשראות תהליך", s: `${counts.dep} טבלאות תלויות בשלב אמיתי`,
        },
        rail(0, "pm", "PM"),
        rail(1, "pp", "PP-PI"),
        {
          id: "loose4", tone: "ink",
          x: W * 0.5, y: res.cy - (res.rows - 1) * res.pitch - m * 0.042,
          t: `${counts.loose4}`, s: "מחוץ לציר התהליך",
        },
      ];
    }

    default: {
      const b = keptLattice(env);
      const out: Caption[] = [
        {
          id: "lead", lead: true, tone: "ink",
          x: b.cx, y: b.cy - ((b.rows - 1) * b.pitch) / 2 - m * 0.075,
          t: "סריג המעבר", s: `${nf.format(counts.s4[0])} נשמרות כפי שהן`,
        },
      ];
      if (counts.s4[1] > 0) {
        out.push({
          id: "rep", tone: "ink",
          x: W * EXTRACT_X, y: extractY(1, 0, env) - m * 0.062,
          t: `${counts.s4[1]}`, s: "מוחלפות · נשלפות מהסריג",
        });
      }
      if (counts.s4[2] > 0) {
        out.push({
          id: "rem", tone: "ink",
          x: W * EXTRACT_X, y: extractY(2, 0, env) - m * 0.062,
          t: `${counts.s4[2]}`, s: "מוסרות",
        });
      }
      return out;
    }
  }
}

/** Which wave a dot moves in. Formations do not move as one slab: the groups
 *  that make up the claim arrive one after another, in the reading order of the
 *  claim itself, so the eye watches the grouping happen instead of finding it
 *  already finished. */
export function wave(sec: number, p: Prep, env: Env): number {
  switch (sec) {
    // The overlap first, then each module's own block: the claim is the overlap.
    case 0: return p.d.b === 1 ? 0 : p.d.b === 0 ? 1 : 2;
    // Deepest documentation first, so the columns fill from the tall end.
    case 1: return env.maxCov - p.d.d;
    // Heads, then their families outward, then the reservoir.
    case 2: return p.d.b === 1 ? 0 : p.sAttr >= 0 ? 1 + Math.min(3, p.fam) * 0.2 : 3.4;
    // Band, then row: the topic grid resolves top to bottom.
    case 3: return (env.topics[p.d.tp]?.m ?? 0) * 2.2 + (env.topics[p.d.tp]?.row ?? 0) * 0.6;
    // Along the chain, in step order, then the dependents, then the reservoir.
    case 4: return p.flow >= 0 ? p.flow * 0.34 : p.fAttr >= 0 ? 3 : 4;
    // The extracted tables leave first; the lattice closes behind them.
    default: return p.d.s > 0 ? 0 : 1 + (p.s % 12) * 0.1;
  }
}

/** Which formations put a dot ON a piece of content, and are therefore allowed
 *  to hand it over to that content. Section index -> true. */
export const HANDOFF = new Set([2, 4, 5]);

/** Edges the field draws, per section. The relationship layer is never
 *  decoration: it appears only where the section is about relationships, and in
 *  every one of those formations the endpoints are lattice slots, so a line is
 *  always a short, legible run between two named things. */
export function edgeVisible(sec: number, a: Prep, b: Prep): boolean {
  if (sec === 2) return a.d.b === 1 || b.d.b === 1;
  if (sec === 4) return a.flow >= 0 || b.flow >= 0;
  if (sec === 0) return a.d.b === 1 && b.d.b === 1;
  return false;
}

/** How far, in px, a dot is displaced by the pointer, and how much it grows. */
export const LENS_R = 150;
export const LENS_PUSH = 22;
export const LENS_GROW = 0.9;
