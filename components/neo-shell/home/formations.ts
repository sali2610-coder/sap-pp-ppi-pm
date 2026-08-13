// Project NEO · Stage 2A — the field mathematics.
//
// 105 real merged SAP tables, six formations. Every formation is a CLAIM ABOUT
// THE DATA, not decoration, and each one is the same 105 elements moved to a
// new place — never a new set of nodes:
//
//   0 gravity    module membership   two bodies + the real 19 as a bridge
//   1 coverage   documentation depth columns by how many of the six axes hold
//   2 shared     the real 19         the 19 come forward, the other 86 recede
//   3 density    documented fields   a skyline sorted by field count
//   4 process    the real chains     the FLOWS tables line up, the rest frame
//   5 migration  eccS4() classes     replaced pulled out of the kept field
//
// Pure functions, no DOM, no React. Kept apart from the scene so the geometry
// can be reasoned about (and, later, tested) without a browser.

import type { HomeDot } from "./home-data";

/** Golden angle — the only way a spiral of 49 points stays evenly dense. */
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

/** A dot with every index the six formations need, resolved once. */
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
  /** Position in the merged process chain, or -1 when the table is not on one. */
  flow: number;
  /** Which chain: 0 = PM, 1 = PP-PI, -1 = none. */
  chain: number;
  /** Length of that chain. */
  chainN: number;
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

/** Section 01 composition. The editorial column owns the inline-start half, so
 *  the two module bodies — and therefore the two gravity wells — live on the
 *  far half and nothing is ever stacked on top of anything. */
export const GEOM: FieldGeom = { pm: { fx: 0.64, fy: 0.27 }, pp: { fx: 0.79, fy: 0.70 } };
/** Narrow canvases put the copy above the bodies instead of beside them. */
export const GEOM_NARROW: FieldGeom = { pm: { fx: 0.30, fy: 0.62 }, pp: { fx: 0.70, fy: 0.80 } };

export function prepare(dots: HomeDot[], chains: string[][]): Prep[] {
  const rnd = seeded(20260813);
  const rand = dots.map(() => [rnd(), rnd()] as const);

  const byFields = [...dots].sort((a, b) => b.f - a.f || a.n.localeCompare(b.n));
  const rankOf = new Map(byFields.map((d, i) => [d.n, i]));

  const bandN: Record<number, number> = {};
  const covN: Record<number, number> = {};
  const s4N: Record<number, number> = {};

  return dots.map((d, i) => {
    const j = (bandN[d.b] = (bandN[d.b] ?? 0) + 1) - 1;
    const c = (covN[d.d] = (covN[d.d] ?? 0) + 1) - 1;
    const s = (s4N[d.s] = (s4N[d.s] ?? 0) + 1) - 1;
    let chain = -1;
    let flow = -1;
    for (let k = 0; k < chains.length; k += 1) {
      const at = chains[k].indexOf(d.n);
      if (at >= 0) { chain = k; flow = at; break; }
    }
    return {
      d, i, j, c, s, rank: rankOf.get(d.n) ?? i,
      flow, chain, chainN: chain >= 0 ? chains[chain].length : 0,
      z: (d.d >= 6 ? 0 : d.d === 5 ? 1 : 2) as 0 | 1 | 2,
      r1: rand[i][0], r2: rand[i][1],
    };
  });
}

/** Field-count → visual scale. Documentation depth is the only thing that makes
 *  a dot big, so "large" always means "we know more about this table". */
const depth = (f: number, maxF: number) => 0.62 + (f / maxF) * 0.92;

export function place(
  sec: number, p: Prep, W: number, H: number,
  maxF: number, maxCov: number, geom: FieldGeom,
): Placed {
  const m = Math.min(W, H);
  const n = 105;
  const base = depth(p.d.f, maxF);

  switch (sec) {
    /* 0 · GRAVITY — module membership. Two bodies with real mass; the 19 shared
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

    /* 1 · COVERAGE — one column per documentation score. The empty columns on
       the low end are left empty on purpose: no table scores below three. */
    case 1: {
      const colX = 0.12 + (p.d.d / maxCov) * 0.74;
      const sub = p.c % 4; const row = Math.floor(p.c / 4);
      return {
        x: colX * W + (sub - 1.5) * (m * 0.026),
        y: H * 0.15 + row * (H * 0.055),
        s: 0.5 + (p.d.d / maxCov) * 0.75,
        o: 0.34 + (p.d.d / maxCov) * 0.62,
      };
    }

    /* 2 · SHARED — the real 19 come to the front at full size; the other 86
       fall back to a wide, faint, out-of-focus ring. */
    case 2: {
      if (p.d.b === 1) {
        const a = p.j * G;
        const rad = m * (0.05 + 0.052 * Math.sqrt(p.j));
        return { x: W * 0.5 + Math.cos(a) * rad, y: H * 0.47 + Math.sin(a) * rad * 0.8, s: base * 1.75, o: 1 };
      }
      const a = p.i * G;
      const rad = m * (0.58 + p.r1 * 0.14);
      return { x: W * 0.5 + Math.cos(a) * rad, y: H * 0.5 + Math.sin(a) * rad * 0.66, s: 0.5, o: 0.16 };
    }

    /* 3 · DENSITY — a skyline. x is the rank, y is the documented field count,
       so the curve IS the dictionary's depth profile. */
    case 3: {
      const f = p.d.f / maxF;
      return {
        x: W * 0.05 + (p.rank / (n - 1)) * W * 0.90,
        y: H * 0.88 - f * H * 0.62,
        s: 0.6 + f * 1.15,
        o: 0.42 + f * 0.55,
      };
    }

    /* 4 · PROCESS — the tables that are actually on a modelled chain line up in
       reading order; everything else frames the corridor. */
    case 4: {
      if (p.flow >= 0) {
        const t = p.chainN > 1 ? p.flow / (p.chainN - 1) : 0.5;
        return {
          x: W * 0.08 + t * W * 0.84,
          y: p.chain === 0 ? H * 0.26 : H * 0.72,
          s: 1.7, o: 1,
        };
      }
      const top = p.i % 2 === 0;
      return {
        x: (p.i / n) * W * 1.04 - W * 0.02,
        y: top ? H * 0.03 + p.r1 * H * 0.06 : H * 0.91 + p.r1 * H * 0.06,
        s: 0.68, o: 0.34,
      };
    }

    /* 5 · MIGRATION — eccS4(). The handful the dictionary marks "replaced" is
       pulled clean out of the kept field. The "removed" band is empty because
       the dictionary marks nothing removed, and the section says so. */
    default: {
      if (p.d.s === 2) return { x: W * 0.5, y: H * 0.06 + p.s * (H * 0.05), s: 2.1, o: 1 };
      if (p.d.s === 1) return { x: W * 0.17, y: H * 0.28 + p.s * (H * 0.105), s: 2.3, o: 1 };
      const col = p.s % 10; const row = Math.floor(p.s / 10);
      return {
        x: W * 0.44 + col * (W * 0.052),
        y: H * 0.16 + row * (H * 0.064),
        s: 0.7, o: 0.38,
      };
    }
  }
}

/** How far, in px, a dot is displaced by the pointer, and how much it grows. */
export const LENS_R = 150;
export const LENS_PUSH = 22;
export const LENS_GROW = 0.9;
