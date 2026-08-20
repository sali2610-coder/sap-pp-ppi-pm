"use client";

/* ============================================================================
   PROJECT NEO · OBJECT RELATIONSHIP LANES
   ----------------------------------------------------------------------------
   THIS IS A PORT, NOT A REDESIGN.

   The old Architecture Studio graph (components/object-workspace.tsx, the
   Graph() function) is the source of truth for this visualisation, and the
   brief is explicit that it should be ported rather than reinterpreted. Every
   number below is lifted from it:

     W 760 · NW×NH 150×40 · rowH 60 · padY 44 · CAP 8
     colX { up: 130, down: W - 130 }
     yFor(i,n) = padY + (H - 2·padY) · (n === 1 ? 0.5 : i/(n-1))
     upstream edge   M x1,y  C mx,y  mx,cy  x2,cy
     downstream edge M x1,cy C mx,cy mx,y   x2,y
     dashes "6 5", stroke-dashoffset 0 → -110 over 3s, forever

   The data comes from kgraph() — the SAME function the old Studio calls — so
   the relationships, their direction and their cardinalities are byte-identical
   to what production draws. This is a visualisation swap and nothing else.

   WHAT IS DELIBERATELY NOT PORTED

     Colour. The old Studio hard-codes #fff cards, #0f172a ink and #94a3b8
     labels, which are invisible on NEO's warm dark ground. Those become NEO
     tokens so the graph works in both themes. The brief asks for the old
     graph's UX inside the new visual system, and this is that seam.

   WHY LANES ARE LTR ON AN RTL PAGE

     Upstream → object → downstream is a statement about DATA FLOW, not about
     language, and the arrowheads have to agree with the reading of the edge.
     The brief permits the graph its own spatial direction where that improves
     technical readability, so the SVG is authored left-to-right and the page
     around it stays RTL.
   ========================================================================== */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { kgraph, tableByName } from "@/lib/knowledge-graph";

/* Module hue as a NEO token, so dark mode is not a second implementation.
   The old Studio's literal orange/violet are replaced by the module identity
   colours the rest of NEO already uses. */
const MOD_VAR: Record<string, string> = {
  PM: "var(--mod-pm)",
  "PP-PI": "var(--mod-pppi)",
  PP: "var(--mod-pppi)",
};
const mc = (m: string) => MOD_VAR[m] || "var(--ink-3)";

/* Geometry — the old Studio's, unchanged. */
const W = 760;
const NW = 150;
const NH = 40;
const ROW_H = 60;
const PAD_Y = 44;
const CAP = 8;

export function ObjectLanes({ name }: { name: string }) {
  const router = useRouter();
  const g = useMemo(() => kgraph(name), [name]);
  const [exp, setExp] = useState(false);
  /** The node the pointer is on. Drives emphasis, never layout. */
  const [hot, setHot] = useState<string | null>(null);

  if (!g) return null;

  const up = exp ? g.upstream : g.upstream.slice(0, CAP);
  const down = exp ? g.downstream : g.downstream.slice(0, CAP);
  const upMore = g.upstream.length - up.length;
  const downMore = g.downstream.length - down.length;

  const cardUp = (n: string) =>
    g.edges.find((e) => e.from === n && e.to === g.center.tableName)?.card || "1:N";
  const cardDown = (n: string) =>
    g.edges.find((e) => e.from === g.center.tableName && e.to === n)?.card || "1:N";

  const H = Math.max(up.length, down.length, 1) * ROW_H + PAD_Y * 2;
  const cx = W / 2;
  const cy = H / 2;
  const colX = { up: 130, down: W - 130 };
  const yFor = (i: number, n: number) =>
    PAD_Y + (H - PAD_Y * 2) * (n === 1 ? 0.5 : i / (n - 1));

  const centreCol = "var(--brand)";
  const go = (n: string) => {
    if (tableByName(n)) router.push(`/neo/object/${encodeURIComponent(n)}/`);
  };

  /** Dim only on hover, and only to .5 — the brief is explicit that the default
   *  state must stay fully readable and that 80% of the graph must never look
   *  disabled. */
  const dim = (n: string) => (hot && hot !== n && hot !== g.center.tableName ? 0.5 : 1);

  const Node = ({
    x, y, label, module, exists, center,
  }: { x: number; y: number; label: string; module: string; exists: boolean; center?: boolean }) => {
    const col = center ? centreCol : mc(module);
    const on = hot === label;
    return (
      <g
        transform={`translate(${x - NW / 2},${y - NH / 2})`}
        style={{ cursor: exists ? "pointer" : "default", opacity: center ? 1 : dim(label) }}
        className="nol-n"
        data-on={on ? "1" : "0"}
        onMouseEnter={() => setHot(label)}
        onMouseLeave={() => setHot(null)}
        onClick={() => exists && !center && go(label)}
        tabIndex={exists && !center ? 0 : -1}
        onKeyDown={(e) => { if (exists && !center && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); go(label); } }}
        role={exists && !center ? "link" : undefined}
        aria-label={center ? `${label}, האובייקט הנוכחי` : `${label}, מודול ${module}`}
      >
        <rect
          width={NW} height={NH} rx={10}
          fill="var(--surface)"
          stroke={col}
          strokeWidth={center ? 2.5 : on ? 2.2 : 1.5}
        />
        {/* The leading accent bar the old node carries. */}
        <rect width={4} height={NH} rx={2} fill={col} />
        <text x={NW / 2 + 4} y={NH / 2 - 2} textAnchor="middle"
          style={{ font: "800 13px ui-monospace, monospace", fill: "var(--ink-1)" }}>{label}</text>
        <text x={NW / 2 + 4} y={NH / 2 + 11} textAnchor="middle"
          style={{ font: "700 8px sans-serif", fill: col }}>{center ? "CENTER" : module}</text>
      </g>
    );
  };

  const Pill = ({ mx, my, text, col }: { mx: number; my: number; text: string; col: string }) => (
    <>
      <rect x={mx - 15} y={my - 7} width={30} height={14} rx={4}
        fill="var(--surface)" stroke={col} strokeOpacity={0.4} />
      <text x={mx} y={my + 3} textAnchor="middle"
        style={{ font: "700 8px ui-monospace, monospace", fill: col }}>{text}</text>
    </>
  );

  return (
    <div className="nol">
      <div className="nol-stage">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-label={`תרשים קשרי ${g.center.tableName}: ${g.upstream.length} טבלאות במעלה הזרם, ${g.downstream.length} במורד הזרם`}
          style={{ minWidth: 560, maxHeight: 460 }}
        >
          {/* lane labels */}
          <text x={colX.up} y={20} textAnchor="middle" className="nol-lane">UPSTREAM ←</text>
          <text x={cx} y={20} textAnchor="middle" className="nol-lane">OBJECT</text>
          <text x={colX.down} y={20} textAnchor="middle" className="nol-lane">→ DOWNSTREAM</text>

          {/* upstream edges: source on the left, flowing INTO the centre */}
          {up.map((n, i) => {
            const y = yFor(i, up.length);
            const x1 = colX.up + NW / 2;
            const x2 = cx - NW / 2;
            const mx = (x1 + x2) / 2;
            const my = (y + cy) / 2;
            const col = mc(tableByName(n)?.module || "?");
            const on = hot === n;
            return (
              <g key={"u" + n} className="nol-e" data-on={on ? "1" : "0"} style={{ opacity: dim(n) }}>
                <path d={`M${x1},${y} C${mx},${y} ${mx},${cy} ${x2},${cy}`}
                  fill="none" stroke={col} strokeWidth={on ? 2.6 : 1.6}
                  strokeOpacity={on ? 1 : 0.6} strokeDasharray="6 5" className="nol-flow" />
                <path d={`M${x2 - 8},${cy - 4} L${x2},${cy} L${x2 - 8},${cy + 4}`}
                  fill="none" stroke={col} strokeWidth={1.6} />
                <Pill mx={mx} my={my} text={cardUp(n)} col={col} />
              </g>
            );
          })}

          {/* downstream edges: centre flowing OUT to the right. Coloured by the
              TARGET's module, exactly as the old graph does. */}
          {down.map((n, i) => {
            const y = yFor(i, down.length);
            const x1 = cx + NW / 2;
            const x2 = colX.down - NW / 2;
            const mx = (x1 + x2) / 2;
            const my = (y + cy) / 2;
            const col = mc(tableByName(n)?.module || "?");
            const on = hot === n;
            return (
              <g key={"d" + n} className="nol-e" data-on={on ? "1" : "0"} style={{ opacity: dim(n) }}>
                <path d={`M${x1},${cy} C${mx},${cy} ${mx},${y} ${x2},${y}`}
                  fill="none" stroke={col} strokeWidth={on ? 2.6 : 1.6}
                  strokeOpacity={on ? 1 : 0.6} strokeDasharray="6 5" className="nol-flow" />
                <path d={`M${x2 - 8},${y - 4} L${x2},${y} L${x2 - 8},${y + 4}`}
                  fill="none" stroke={col} strokeWidth={1.6} />
                <Pill mx={mx} my={my} text={cardDown(n)} col={col} />
              </g>
            );
          })}

          {/* nodes last, so no edge is ever drawn over a label */}
          {up.map((n, i) => (
            <Node key={n} x={colX.up} y={yFor(i, up.length)} label={n}
              module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />
          ))}
          {down.map((n, i) => (
            <Node key={n} x={colX.down} y={yFor(i, down.length)} label={n}
              module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />
          ))}
          <Node x={cx} y={cy} label={g.center.tableName} module={g.center.module} exists center />
        </svg>
      </div>

      <div className="nol-foot">
        <span className="nol-blast">
          רדיוס השפעה (Blast radius): <b className="nx-sap">{g.upstream.length}</b> מעלה
          {" · "}<b className="nx-sap">{g.downstream.length}</b> מטה
        </span>
        {(upMore > 0 || downMore > 0 || exp) && (
          <button type="button" className="nu-btn2 nol-more" onClick={() => setExp((v) => !v)}>
            {exp ? "הצג פחות" : `הצג הכל (+${upMore + downMore})`}
          </button>
        )}
      </div>
    </div>
  );
}
