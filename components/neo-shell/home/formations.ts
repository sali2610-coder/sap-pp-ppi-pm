// Project NEO · Stage 2B — the field mathematics.
//
// 105 real merged SAP tables. ONE set of elements for the whole page: a section
// change never creates, destroys or reshuffles a dot, it only moves the dot that
// is already there. Every formation is a CLAIM ABOUT THE DATA:
//
//  -1 disperse   nothing known yet      the 105 arrive from the outside
//   0 gravity    module membership      two bodies + the real shared band as a
//                                       bridge, because that is what it is
//   1 coverage   documentation depth    one column per score, the empty low
//                                       columns left empty on purpose
//   2 shared     the shared band + ER   the band comes forward; every table the
//                                       dictionary links to one of them is
//                                       PULLED to its neighbour, not scattered
//   3 topics     19 real topic blocks   each topic becomes one visible object,
//                                       sized by the tables it documents
//   4 process    the modelled chains    the chain lines up; tables related to a
//                                       chain step sit with that step
//   5 migration  eccS4()                replaced pulled clean out of the kept
//                                       lattice, which resolves into the grid
//                                       the workspace itself is built on
//
// The order is the argument: disperse -> group -> relate -> attract -> objects
// -> workspace. Consecutive formations share their anchors, so no transition is
// ever a reset: a dot always leaves from where the previous claim left it.
//
// Pure functions, no DOM, no React.

import type { DensityTopic, HomeDot, HomeEdge } from "./home-data";

/** Golden angle — the only way a spiral of n points stays evenly dense. */
const G = 2.399963229728653;

/** Deterministic jitter. Seeded so the composition is byte-identical on every
 *  load and every machine; Math.random would make the page reshuffle itself. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A dot with every index the formations need, resolved once. */
export interface Prep {
  d: HomeDot;
  /** Global index in the (already sorted) dictionary order. */
  i: number;
  /** Index inside the membership band — drives the two spirals + the bridge. */
  j: number;
  /** Index inside the coverage-score group. */
  c: number;
  /** Rank by documented field count, densest first. */
  rank: number;
  /** Index inside the S/4 class group. */
  s: number;
  /** Index inside its own topic block. */
  tc: number;
  /** Position in the merged process chain, or -1 when the table is not on one. */
  flow: number;
  /** Which chain: 0 = PM, 1 = PP-PI, -1 = none. */
  chain: number;
  /** Length of that chain. */
  chainN: number;
  /** A table in the shared band this one is ER-linked to, or -1. Real relation,
   *  never a guess — this is what makes section 03 read as attraction. */
  sAttr: number;
  /** A table on a modelled chain this one is ER-linked to, or -1. */
  fAttr: number;
  /** How many ER relations it carries inside the 105. */
  deg: number;
  /** Depth plane: 0 front (sharp), 1 mid, 2 far (blurred). From the real
   *  documentation-coverage score, so depth encodes how much we actually know. */
  z: 0 | 1 | 2;
  r1: number;
  r2: number;
}

export interface Placed { x: number; y: number; s: number; o: number }

export interface FieldGeom {
  /** Inline-axis centre of each module body, as a fraction of the width
   *  measured from the INLINE-START edge (right in RTL). */
  pm: { fx: number; fy: number };
  pp: { fx: number; fy: number };
}

/** One topic block's slot in the section-03 composition. */
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

export interface Env {
  W: number;
  H: number;
  maxF: number;
  maxCov: number;
  maxTopic: number;
  geom: FieldGeom;
  /** Every prep, indexed by Prep.i — attraction resolves through this. */
  all: Prep[];
  topics: TopicSlot[];
}

/** Section 01 composition. The editorial column owns the inline-start half, so
 *  the two module bodies — and therefore the two gravity wells — live on the
 *  far half and nothing is ever stacked on top of anything. */
export const GEOM: FieldGeom = { pm: { fx: 0.64, fy: 0.27 }, pp: { fx: 0.79, fy: 0.70 } };
/** Narrow canvases put the copy above the bodies instead of beside them. */
export const GEOM_NARROW: FieldGeom = { pm: { fx: 0.30, fy: 0.62 }, pp: { fx: 0.70, fy: 0.80 } };

export function prepare(dots: HomeDot[], chains: string[][], edges: HomeEdge[]): Prep[] {
  const rnd = seeded(20260813);
  const rand = dots.map(() => [rnd(), rnd()] as const);

  const byFields = [...dots].sort((a, b) => b.f - a.f || a.n.localeCompare(b.n));
  const rankOf = new Map(byFields.map((d, i) => [d.n, i]));

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

  return dots.map((d, i) => {
    const j = (bandN[d.b] = (bandN[d.b] ?? 0) + 1) - 1;
    const c = (covN[d.d] = (covN[d.d] ?? 0) + 1) - 1;
    const s = (s4N[d.s] = (s4N[d.s] ?? 0) + 1) - 1;
    const tc = (topN[d.tp] = (topN[d.tp] ?? 0) + 1) - 1;
    const ch = chainAt.get(d.n);
    return {
      d, i, j, c, s, tc, rank: rankOf.get(d.n) ?? i,
      flow: ch ? ch.flow : -1,
      chain: ch ? ch.chain : -1,
      chainN: ch ? ch.n : 0,
      sAttr: d.b === 1 ? -1 : pick(adj[i], (k) => dots[k].b === 1),
      fAttr: chainAt.has(d.n) ? -1 : pick(adj[i], (k) => chainAt.has(dots[k].n)),
      deg: adj[i].length,
      z: (d.d >= 6 ? 0 : d.d === 5 ? 1 : 2) as 0 | 1 | 2,
      r1: rand[i][0], r2: rand[i][1],
    };
  });
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
    const cols = Math.min(4, Math.max(2, Math.ceil(Math.sqrt(list.length))));
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

/** Field-count → visual scale. Documentation depth is the only thing that makes
 *  a dot big, so "large" always means "we know more about this table". */
const depth = (f: number, maxF: number) => 0.62 + (f / maxF) * 0.92;

export function place(sec: number, p: Prep, env: Env): Placed {
  const { W, H, geom, maxF, maxCov } = env;
  const m = Math.min(W, H);
  const n = 105;
  const base = depth(p.d.f, maxF);

  switch (sec) {
    /* -1 · DISPERSE — the state the page is in before it knows anything. The
       105 sit far out and dim; the first formation is them arriving. */
    case -1: {
      const a = p.i * G;
      const rad = m * (0.72 + p.r1 * 0.55);
      return {
        x: W * 0.5 + Math.cos(a) * rad,
        y: H * 0.5 + Math.sin(a) * rad * 0.82,
        s: base * 0.42, o: 0,
      };
    }

    /* 0 · GRAVITY — module membership. Two bodies with real mass; the shared
       tables form the bridge between them, because that is what they are. */
    case 0: {
      if (p.d.b === 1) {
        const t = p.j / 18;
        const ax = geom.pm.fx * W; const ay = geom.pm.fy * H;
        const bx = geom.pp.fx * W; const by = geom.pp.fy * H;
        // quadratic bezier, control point bowed toward the inline-start edge
        const cx = (ax + bx) / 2 - m * 0.20; const cy = (ay + by) / 2;
        const u = 1 - t;
        return {
          x: u * u * ax + 2 * u * t * cx + t * t * bx + (p.r1 - 0.5) * 10,
          y: u * u * ay + 2 * u * t * cy + t * t * by + (p.r2 - 0.5) * 10,
          s: base * 1.12, o: 1,
        };
      }
      const g = p.d.b === 0 ? geom.pm : geom.pp;
      const a = p.j * G;
      const rad = m * (0.085 + 0.042 * Math.sqrt(p.j));
      return {
        x: g.fx * W + Math.cos(a) * rad,
        y: g.fy * H + Math.sin(a) * rad * 0.78,
        s: base, o: 0.9,
      };
    }

    /* 1 · COVERAGE — one column per documentation score. The columns are the
       same six axes section 02 lists, so a bar and a column are one statement.
       The empty low end is left empty: no table scores below three. */
    case 1: {
      const colX = 0.13 + (p.d.d / maxCov) * 0.72;
      const sub = p.c % 4; const row = Math.floor(p.c / 4);
      return {
        x: colX * W + (sub - 1.5) * (m * 0.026),
        y: H * 0.80 - row * (H * 0.050),
        s: 0.5 + (p.d.d / maxCov) * 0.78,
        o: 0.34 + (p.d.d / maxCov) * 0.62,
      };
    }

    /* 2 · SHARED + ATTRACTION — the shared band comes to the middle at full
       size. Every other table the dictionary links to one of them is pulled
       into its neighbour's orbit; only the genuinely unrelated stay outside. */
    case 2: {
      if (p.d.b === 1) {
        const a = p.j * G;
        const rad = m * (0.05 + 0.055 * Math.sqrt(p.j));
        return { x: W * 0.5 + Math.cos(a) * rad, y: H * 0.47 + Math.sin(a) * rad * 0.8, s: base * 1.7, o: 1 };
      }
      if (p.sAttr >= 0) {
        // Orbit the real neighbour. The pull is the point, so the satellite is
        // close, small and clearly subordinate to the table it hangs off.
        const host = place(2, env.all[p.sAttr], env);
        const a = p.i * G;
        const rad = m * (0.035 + p.r1 * 0.022);
        return {
          x: host.x + Math.cos(a) * rad,
          y: host.y + Math.sin(a) * rad * 0.86,
          s: 0.62 + base * 0.22, o: 0.72,
        };
      }
      const a = p.i * G;
      const rad = m * (0.60 + p.r1 * 0.16);
      return { x: W * 0.5 + Math.cos(a) * rad, y: H * 0.5 + Math.sin(a) * rad * 0.66, s: 0.46, o: 0.14 };
    }

    /* 3 · TOPICS — 19 real topic blocks, PM banded above PP-PI. Each block is
       one visible object whose size is the tables it documents, which is the
       whole claim of section 04: no two topics carry the same weight. */
    case 3: {
      const t = env.topics[p.d.tp];
      if (!t) return { x: W * 0.5, y: H * 0.5, s: 0.5, o: 0.2 };
      const bandTop = t.m === 0 ? 0.10 : 0.56;
      const bandH = 0.34;
      const cw = W / t.cols;
      const chh = (H * bandH) / t.rows;
      const cx = cw * (t.col + 0.5);
      const cy = H * bandTop + chh * (t.row + 0.5);
      const R = Math.min(cw, chh) * 0.40 * (0.45 + 0.55 * Math.sqrt(t.tables / env.maxTopic));
      const a = p.tc * G;
      const rad = t.n > 1 ? R * Math.sqrt((p.tc + 0.55) / t.n) : 0;
      return {
        x: cx + Math.cos(a) * rad,
        y: cy + Math.sin(a) * rad * 0.86,
        s: 0.56 + base * 0.36,
        o: 0.40 + 0.5 * (t.tables / env.maxTopic),
      };
    }

    /* 4 · PROCESS — the tables that are actually on a modelled chain line up in
       reading order. A table the dictionary links to a chain step is stacked
       with that step; only the unrelated frame the corridor. */
    case 4: {
      if (p.flow >= 0) {
        const t = p.chainN > 1 ? p.flow / (p.chainN - 1) : 0.5;
        return {
          x: W * 0.09 + t * W * 0.82,
          y: p.chain === 0 ? H * 0.27 : H * 0.71,
          s: 1.75, o: 1,
        };
      }
      if (p.fAttr >= 0) {
        const host = place(4, env.all[p.fAttr], env);
        const up = host.y < H * 0.5;
        const k = p.i % 5;
        return {
          x: host.x + (k - 2) * (m * 0.019),
          y: host.y + (up ? -1 : 1) * (m * 0.055 + Math.floor(p.i / 5) % 3 * m * 0.026),
          s: 0.66, o: 0.5,
        };
      }
      const top = p.i % 2 === 0;
      return {
        x: (p.i / n) * W * 1.04 - W * 0.02,
        y: top ? H * 0.02 + p.r1 * H * 0.05 : H * 0.92 + p.r1 * H * 0.05,
        s: 0.6, o: 0.24,
      };
    }

    /* 5 · MIGRATION — eccS4(). The handful the dictionary marks "replaced" is
       pulled clean out of the kept field, which resolves into an even lattice:
       the last thing the field says is that these are objects you can now open.
       The "removed" band is empty because the dictionary marks nothing removed,
       and the section says so in words. */
    default: {
      if (p.d.s === 2) return { x: W * 0.52, y: H * 0.06 + p.s * (H * 0.05), s: 2.1, o: 1 };
      if (p.d.s === 1) return { x: W * 0.16, y: H * 0.26 + p.s * (H * 0.10), s: 2.3, o: 1 };
      const cols = 10;
      const col = p.s % cols; const row = Math.floor(p.s / cols);
      return {
        x: W * 0.40 + col * (W * 0.056),
        y: H * 0.15 + row * (H * 0.068),
        s: 0.66, o: 0.30,
      };
    }
  }
}

/* ---------------------------------------------------------------- captions */

export type Tone = "pm" | "pp" | "ink";

/** A label the field carries for itself. Every one of these is a real count
 *  read off the dictionary — the field is never allowed to be a shape with no
 *  name, which is exactly the note the client raised. */
export interface Caption { id: string; x: number; y: number; t: string; s: string; tone: Tone }

export function captions(sec: number, env: Env, live: number[]): Caption[] {
  const { W, H, geom, all, topics } = env;
  const m = Math.min(W, H);
  const nf = new Intl.NumberFormat("he-IL");

  switch (sec) {
    case 0: {
      const shared = all.filter((p) => p.d.b === 1).length;
      const ax = geom.pm.fx * W; const ay = geom.pm.fy * H;
      const bx = geom.pp.fx * W; const by = geom.pp.fy * H;
      const cx = (ax + bx) / 2 - m * 0.20; const cy = (ay + by) / 2;
      return [{
        id: "bridge",
        x: 0.25 * ax + 0.5 * cx + 0.25 * bx,
        y: 0.25 * ay + 0.5 * cy + 0.25 * by,
        t: `${shared} משותפות`,
        s: "הגשר בין שני המודולים",
        tone: "ink",
      }];
    }
    case 1: {
      const byScore = new Map<number, number>();
      for (const p of all) byScore.set(p.d.d, (byScore.get(p.d.d) || 0) + 1);
      return [...byScore.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([score, count]) => ({
          id: `cov-${score}`,
          x: (0.13 + (score / env.maxCov) * 0.72) * W,
          y: H * 0.855,
          t: `${score}/${env.maxCov}`,
          s: `${count} טבלאות`,
          tone: "ink" as Tone,
        }));
    }
    case 2: {
      const shared = all.filter((p) => p.d.b === 1).length;
      const pulled = all.filter((p) => p.sAttr >= 0).length;
      return [
        { id: "core", x: W * 0.5, y: H * 0.47 - m * 0.30, t: `${shared} משותפות`, s: `${live[0]} קשרי ER מצוירים`, tone: "ink" },
        { id: "pull", x: W * 0.5, y: H * 0.47 + m * 0.30, t: `${pulled} נמשכות`, s: "שכנה ישירה במפת הקשרים", tone: "ink" },
      ];
    }
    case 3:
      return topics.map((t, i) => ({
        id: `tp-${i}`,
        x: (W / t.cols) * (t.col + 0.5),
        y: H * (t.m === 0 ? 0.10 : 0.56) + ((H * 0.34) / t.rows) * (t.row + 0.5)
          - Math.min(W / t.cols, (H * 0.34) / t.rows) * 0.42,
        t: String(t.idx).padStart(2, "0"),
        s: `${t.tables}`,
        tone: t.m === 0 ? "pm" : "pp",
      }));
    case 4: {
      const one = (chain: number, tone: Tone, label: string) => {
        const steps = all.filter((p) => p.chain === chain);
        const linked = all.filter((p) => p.fAttr >= 0 && all[p.fAttr].chain === chain).length;
        return {
          id: `flow-${chain}`,
          x: W * 0.09,
          y: (chain === 0 ? H * 0.27 : H * 0.71) - m * 0.10,
          t: `${label} · ${steps.length} שלבים`,
          s: `${linked} טבלאות תלויות`,
          tone,
        };
      };
      return [one(0, "pm", "PM"), one(1, "pp", "PP-PI")];
    }
    default: {
      const rep = all.filter((p) => p.d.s === 1).length;
      const kept = all.filter((p) => p.d.s === 0).length;
      const out: Caption[] = [
        { id: "kept", x: W * 0.40 + (W * 0.056) * 4.5, y: H * 0.08, t: `${nf.format(kept)} נשמרות`, s: "אין פעולת המרה ייעודית", tone: "ink" },
      ];
      if (rep > 0) out.push({ id: "rep", x: W * 0.16, y: H * 0.26 - m * 0.10, t: `${rep} מוחלפות`, s: "יוצאות מהשדה", tone: "ink" });
      return out;
    }
  }
}

/** Which wave a dot moves in. Formations do not move as one slab: the groups
 *  that make up the claim arrive one after another, so the eye can see the
 *  grouping happen instead of finding it already finished. */
export function wave(sec: number, p: Prep, env: Env): number {
  switch (sec) {
    case 0: return p.d.b === 1 ? 0 : p.d.b === 0 ? 1 : 2;
    case 1: return env.maxCov - p.d.d;
    case 2: return p.d.b === 1 ? 0 : p.sAttr >= 0 ? 1 : 2;
    case 3: return (env.topics[p.d.tp]?.m ?? 0) * 2 + (env.topics[p.d.tp]?.row ?? 0) * 0.5;
    case 4: return p.flow >= 0 ? p.flow * 0.34 : p.fAttr >= 0 ? 3 : 4;
    default: return p.d.s > 0 ? 0 : 1 + (p.s % 10) * 0.12;
  }
}

/** Which formations put a dot ON a piece of content, and are therefore allowed
 *  to hand it over to that content. Section index -> true. */
export const HANDOFF = new Set([2, 4, 5]);

/** Edges the field draws, per section. The relationship layer is never
 *  decoration: it appears only where the section is about relationships. */
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
