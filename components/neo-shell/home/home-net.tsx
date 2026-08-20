/* ============================================================================
   PROJECT NEO · THE ARCHITECTURE FIELD
   ----------------------------------------------------------------------------
   WHAT THIS IS, AND WHY IT REPLACES THREE RECTANGLES

     The membership story — 37 PM-only, 19 shared, 49 PP-PI-only — was being
     told as three proportional bars. The counts were right and the picture was
     honest, but a bar chart is not architecture, and the review is correct that
     the most important visual on the product's most important page cannot be
     three rectangles.

     So it is drawn as what it actually is: two fields of tables with a shared
     core between them, and the REAL ER relationships running through it.

   EVERY MARK IS A FACT

     node        one real table from the dictionary
     position    its band (PM-only / shared / PP-PI-only) decides its field
     radius      its documented field count, on a shared scale
     colour      its module band
     line        one real ER pair from HomeData.edges, both ends among the 105
     label       the table's own name, printed only where there is room

     Nothing is decorative and nothing is generated. If a table has no modelled
     relation it simply has no line, which is itself true.

   DETERMINISTIC BY CONSTRUCTION

     This renders on the server and again on the client, so it cannot use
     Math.random: the two passes would disagree and React would throw the
     subtree away. Scatter comes from a hash of the table's own NAME, which
     means the layout is stable across renders, stable across deploys, and the
     same table lands in the same place every time — which is what lets a
     reader recognise the shape.
   ========================================================================== */

import type { HomeDot, HomeEdge } from "./home-data";

/** FNV-1a. Small, fast, and identical on both sides of hydration. */
function hash(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0) / 0xffffffff;
}

const VW = 1200;
const VH = 640;

/** Field geometry. The shared core is a narrow column between two wide fields,
 *  because that is the shape of the fact: a small set of tables both
 *  dictionaries document, standing between two much larger bodies. */
const FIELD = {
  0: { x0: 70, x1: 420 },    // PM only
  1: { x0: 520, x1: 680 },   // shared core
  2: { x0: 780, x1: 1130 },  // PP-PI only
} as const;

export interface NetPoint { n: string; x: number; y: number; r: number; b: 0 | 1 | 2; he: string; f: number }

/** Lay the dictionary out once. Exported so a caller can reuse the SAME
 *  positions for a background layer and a foreground layer without the two
 *  drifting apart. */
export function layout(dots: HomeDot[]): NetPoint[] {
  const byBand: Record<number, HomeDot[]> = { 0: [], 1: [], 2: [] };
  for (const d of dots) byBand[d.b]?.push(d);
  const maxF = Math.max(1, ...dots.map((d) => d.f));

  const out: NetPoint[] = [];
  for (const b of [0, 1, 2] as const) {
    const list = byBand[b];
    const f = FIELD[b];
    const cols = b === 1 ? 2 : 5;
    const rows = Math.ceil(list.length / cols);
    list.forEach((d, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      // Jitter is a function of the NAME, so it is identical every render.
      const jx = (hash(d.n) - 0.5) * 46;
      const jy = (hash(d.n + "y") - 0.5) * 34;
      const gx = col / (cols - 1);
      const gy = rows === 1 ? 0.5 : row / (rows - 1);
      out.push({
        n: d.n,
        he: d.he,
        f: d.f,
        b,
        x: f.x0 + gx * (f.x1 - f.x0) + jx,
        y: 70 + gy * (VH - 140) + jy,
        // Radius carries the documented field count. sqrt so a table with four
        // times the fields reads as twice the mark, not sixteen times.
        r: 3.2 + Math.sqrt(d.f / maxF) * 7.4,
      });
    });
  }
  return out;
}

const BAND_VAR = ["var(--mod-pm)", "var(--nh-shared, var(--brand))", "var(--mod-pppi)"] as const;

export function HomeNet({
  dots, edges, labels = 0, className = "", faint = false,
}: {
  dots: HomeDot[];
  edges: HomeEdge[];
  /** How many of the largest tables print their name. 0 = a pure field. */
  labels?: number;
  className?: string;
  /** Background-layer mode: thinner, quieter, no labels, no interaction. */
  faint?: boolean;
}) {
  const pts = layout(dots);
  const idx = new Map(pts.map((p, i) => [i, p]));

  // The tables that earn a printed name are simply the largest ones. No
  // curation, so the label set cannot become an editorial claim.
  const named = new Set(
    [...pts].sort((a, b) => b.f - a.f).slice(0, labels).map((p) => p.n),
  );

  return (
    <svg
      className={`nhn ${className}`}
      viewBox={`0 0 ${VW} ${VH}`}
      role={faint ? "presentation" : "img"}
      aria-hidden={faint || undefined}
      aria-label={faint ? undefined
        : `שדה הארכיטקטורה: ${dots.filter((d) => d.b === 0).length} טבלאות PM בלבד, ${dots.filter((d) => d.b === 1).length} טבלאות ליבה משותפות, ${dots.filter((d) => d.b === 2).length} טבלאות PP-PI בלבד, ו-${edges.length} קשרי ER ממודלים ביניהן`}
      data-faint={faint ? "1" : "0"}
    >
      {/* RELATIONSHIPS FIRST, so no line is ever drawn across a table's name. */}
      <g className="nhn-edges">
        {edges.map((e, i) => {
          const a = idx.get(e.a);
          const b = idx.get(e.b);
          if (!a || !b) return null;
          // Bow the line away from the straight chord so a dense pair of fields
          // reads as a weave rather than a hatch.
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.08;
          const cross = a.b !== b.b;
          return (
            <path
              key={i}
              d={`M${a.x.toFixed(1)},${a.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`}
              className="nhn-e"
              data-cross={cross ? "1" : "0"}
              data-k={e.k}
            />
          );
        })}
      </g>

      <g className="nhn-nodes">
        {pts.map((p) => (
          <g key={p.n} className="nhn-n" data-b={p.b} style={{ "--c": BAND_VAR[p.b] } as React.CSSProperties}>
            <circle cx={p.x} cy={p.y} r={p.r} className="nhn-dot" />
            {!faint && named.has(p.n) ? (
              <text x={p.x} y={p.y - p.r - 5} textAnchor="middle" className="nhn-t">{p.n}</text>
            ) : null}
          </g>
        ))}
      </g>
    </svg>
  );
}
