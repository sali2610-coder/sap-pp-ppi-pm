"use client";

/* ============================================================================
   PROJECT NEO · OBJECT RELATIONSHIP LANES
   ----------------------------------------------------------------------------
   A PORT OF THE OLD ARCHITECTURE STUDIO GRAPH, THEN POLISHED.

   The composition is the old Studio's Graph() (components/object-workspace.tsx)
   and is not re-litigated here: three lanes, a centred hub, horizontal cubic
   edges, cardinality pills, the dotted field, the blast-radius footer. The data
   is the SAME kgraph() the old Studio calls, so relationships, direction and
   cardinalities are identical to what production draws.

   THIS PASS CHANGED FOUR THINGS, ALL VISUAL

     1. SCALE. Nodes went 150x40 -> 176x54 and rows 60 -> 74 inside the same
        760-wide viewBox, so the graph claims about 17% more of the canvas and
        the labels are readable without zooming.

     2. EMPTY LANES COLLAPSE. AUFK has 0 upstream, so half the canvas was dead
        space with the hub marooned in the middle of it. When a lane is empty
        the hub moves into that lane's column and the surviving lane gets the
        room. The composition is now a function of the data.

     3. MOTION IS INTERACTION-ONLY. Every edge used to march its dashes forever,
        which on a fourteen-relation object is fourteen competing animations and
        the opposite of precision. Dashes now run only on the paths connected to
        whatever the reader is pointing at or has selected.

     4. NODES AND EDGES CARRY THEIR VALIDATED CONTEXT. A third line on the node
        is descriptionHe/descriptionEn, and the explanation strip reads the
        edge's own .desc. Both come from the dictionary; where it is silent the
        line is simply absent. Nothing here is generated.
   ========================================================================== */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { kgraph, tableByName } from "@/lib/knowledge-graph";

const MOD_VAR: Record<string, string> = {
  PM: "var(--mod-pm)",
  "PP-PI": "var(--mod-pppi)",
  PP: "var(--mod-pppi)",
};
const mc = (m: string) => MOD_VAR[m] || "var(--ink-3)";

/* Geometry. The old Studio's proportions, taken up ~17% so the graph reads at
   arm's length on a desktop canvas without becoming a slide again. */
const W = 760;
const NW = 176;
const NH = 54;
const ROW_H = 74;
const PAD_Y = 46;
const CAP = 8;

/** Trim a validated description to what a 176px card can actually hold. */
const clip = (s: string, n = 26) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

const descOf = (n: string) => {
  const t = tableByName(n);
  return (t?.descriptionHe || t?.descriptionEn || "").trim();
};

export function ObjectLanes({ name }: { name: string }) {
  const router = useRouter();
  const g = useMemo(() => kgraph(name), [name]);
  const [exp, setExp] = useState(false);
  /** Pointer target. Transient. */
  const [hot, setHot] = useState<string | null>(null);
  /** Click target. Sticky until dismissed, and what the strip reports. */
  const [sel, setSel] = useState<string | null>(null);

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

  /* THE COMPOSITION FOLLOWS THE DATA. With both lanes populated the hub sits
     centre. With one lane empty it moves into the vacated column, so the graph
     never draws a wide band of nothing. */
  const hasUp = up.length > 0;
  const hasDown = down.length > 0;
  /* When a lane is empty the CANVAS shrinks with it, rather than the hub simply
     sliding across and leaving a band of nothing behind. AUFK has no upstream
     at all, and at full width roughly a third of the diagram was dead space. */
  const VW = hasUp && hasDown ? W : W - 210;
  const cx = !hasUp ? 150 : !hasDown ? VW - 150 : VW / 2;
  const colX = { up: 132, down: VW - 132 };

  const yFor = (i: number, n: number) =>
    PAD_Y + (H - PAD_Y * 2) * (n === 1 ? 0.5 : i / (n - 1));

  /** The node the interaction is about: the click wins over the pointer. */
  const focus = sel || hot;
  const isLive = (n: string) => focus === n;
  /** Dim only during interaction, and never below .45 — an unrelated node must
   *  stay legible context, not look disabled. */
  const dim = (n: string) => (focus && focus !== n ? 0.45 : 1);

  const go = (n: string) => {
    if (tableByName(n)) router.push(`/neo/object/${encodeURIComponent(n)}/`);
  };

  const centreCol = "var(--brand)";

  const Node = ({
    x, y, label, module, exists, center,
  }: { x: number; y: number; label: string; module: string; exists: boolean; center?: boolean }) => {
    const col = center ? centreCol : mc(module);
    const on = isLive(label);
    const d = center ? (g.center.descriptionHe || g.center.descriptionEn || "") : descOf(label);
    return (
      <g
        transform={`translate(${x - NW / 2},${y - NH / 2})`}
        className="nol-n"
        data-on={on ? "1" : "0"}
        style={{ opacity: center ? 1 : dim(label), cursor: exists && !center ? "pointer" : "default" }}
        onMouseEnter={() => !center && setHot(label)}
        onMouseLeave={() => setHot(null)}
        onClick={() => { if (!center && exists) setSel((v) => (v === label ? null : label)); }}
        onDoubleClick={() => !center && exists && go(label)}
        tabIndex={exists && !center ? 0 : -1}
        role={exists && !center ? "button" : undefined}
        onKeyDown={(e) => {
          if (center || !exists) return;
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel((v) => (v === label ? null : label)); }
        }}
        aria-label={center ? `${label}, האובייקט הנוכחי` : `${label}, מודול ${module}${d ? `, ${d}` : ""}`}
      >
        <rect
          className="nol-card"
          width={NW} height={NH} rx={11}
          fill="var(--surface)"
          stroke={col}
          strokeWidth={center ? 2.6 : on ? 2.2 : 1.4}
        />
        <rect width={4} height={NH} rx={2} fill={col} />
        <text x={NW / 2 + 4} y={d ? 20 : 24} textAnchor="middle"
          style={{ font: "800 15px ui-monospace, monospace", fill: "var(--ink-1)" }}>{label}</text>
        <text x={NW / 2 + 4} y={d ? 33 : 38} textAnchor="middle"
          style={{ font: "700 9px sans-serif", fill: col, letterSpacing: ".04em" }}>
          {center ? "האובייקט הנוכחי" : module}
        </text>
        {/* Third line only where the dictionary actually holds a description. */}
        {d ? (
          <text x={NW / 2 + 4} y={45} textAnchor="middle"
            style={{ font: "500 9px sans-serif", fill: "var(--ink-3)" }}>{clip(d)}</text>
        ) : null}
      </g>
    );
  };

  const Edge = ({
    d, mx, my, col, card, other, arrow,
  }: { d: string; mx: number; my: number; col: string; card: string; other: string; arrow: string }) => {
    const on = isLive(other);
    return (
      <g className="nol-e" data-on={on ? "1" : "0"} style={{ opacity: dim(other) }}
        onMouseEnter={() => setHot(other)} onMouseLeave={() => setHot(null)}>
        <path d={d} fill="none" stroke={col} strokeWidth={on ? 2.6 : 1.5}
          strokeOpacity={on ? 1 : 0.55} strokeDasharray="6 5"
          className={on ? "nol-flow" : undefined} />
        <path d={arrow} fill="none" stroke={col} strokeWidth={on ? 2.2 : 1.5} strokeOpacity={on ? 1 : 0.7} />
        <rect x={mx - 16} y={my - 8} width={32} height={16} rx={5}
          fill="var(--surface)" stroke={col} strokeOpacity={on ? 0.9 : 0.45} strokeWidth={on ? 1.4 : 1} />
        <text x={mx} y={my + 4} textAnchor="middle"
          style={{ font: "700 9px ui-monospace, monospace", fill: on ? col : "var(--ink-2)" }}>{card}</text>
      </g>
    );
  };

  /* The explanation strip. Reports only what the dictionary holds: the two
     endpoints, the cardinality, the module, and the edge's own description
     where one was recorded. */
  const edgeFor = (n: string) =>
    g.edges.find((e) => (e.from === n && e.to === g.center.tableName) || (e.from === g.center.tableName && e.to === n));
  const fEdge = focus ? edgeFor(focus) : null;
  const fUp = focus ? g.upstream.includes(focus) : false;

  return (
    <div className="nol">
      <div className="nol-stage">
        <svg
          viewBox={`0 0 ${VW} ${H}`}
          width="100%"
          role="img"
          aria-label={`תרשים קשרי ${g.center.tableName}: ${g.upstream.length} טבלאות במעלה הזרם, ${g.downstream.length} במורד הזרם`}
          style={{ minWidth: 620, maxHeight: 520 }}
          onMouseLeave={() => setHot(null)}
        >
          {hasUp ? <text x={colX.up} y={20} textAnchor="middle" className="nol-lane">UPSTREAM ←</text> : null}
          <text x={cx} y={20} textAnchor="middle" className="nol-lane">OBJECT</text>
          {hasDown ? <text x={colX.down} y={20} textAnchor="middle" className="nol-lane">→ DOWNSTREAM</text> : null}

          {up.map((n, i) => {
            const y = yFor(i, up.length);
            const x1 = colX.up + NW / 2, x2 = cx - NW / 2;
            const mx = (x1 + x2) / 2, my = (y + cy(H)) / 2;
            const col = mc(tableByName(n)?.module || "?");
            return (
              <Edge key={"u" + n} other={n} col={col} card={cardUp(n)} mx={mx} my={my}
                d={`M${x1},${y} C${mx},${y} ${mx},${cy(H)} ${x2},${cy(H)}`}
                arrow={`M${x2 - 9},${cy(H) - 5} L${x2},${cy(H)} L${x2 - 9},${cy(H) + 5}`} />
            );
          })}

          {down.map((n, i) => {
            const y = yFor(i, down.length);
            const x1 = cx + NW / 2, x2 = colX.down - NW / 2;
            const mx = (x1 + x2) / 2, my = (y + cy(H)) / 2;
            const col = mc(tableByName(n)?.module || "?");
            return (
              <Edge key={"d" + n} other={n} col={col} card={cardDown(n)} mx={mx} my={my}
                d={`M${x1},${cy(H)} C${mx},${cy(H)} ${mx},${y} ${x2},${y}`}
                arrow={`M${x2 - 9},${y - 5} L${x2},${y} L${x2 - 9},${y + 5}`} />
            );
          })}

          {up.map((n, i) => (
            <Node key={n} x={colX.up} y={yFor(i, up.length)} label={n}
              module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />
          ))}
          {down.map((n, i) => (
            <Node key={n} x={colX.down} y={yFor(i, down.length)} label={n}
              module={tableByName(n)?.module || "?"} exists={!!tableByName(n)} />
          ))}
          <Node x={cx} y={cy(H)} label={g.center.tableName} module={g.center.module} exists center />
        </svg>
      </div>

      {/* CONTEXT STRIP — validated fields only. */}
      <div className="nol-ctx" data-on={focus ? "1" : "0"} aria-live="polite">
        {focus ? (
          <>
            <span className="nol-ctx-path nx-sap">
              {fUp ? `${focus} ← ${g.center.tableName}` : `${g.center.tableName} → ${focus}`}
            </span>
            <span className="nol-ctx-f"><em>יחס</em><b className="nx-sap">{fEdge?.card || "לא מצוין בתיעוד"}</b></span>
            <span className="nol-ctx-f"><em>מודול</em><b>{tableByName(focus)?.module || "לא ידוע"}</b></span>
            {fEdge?.desc ? <span className="nol-ctx-d">{fEdge.desc}</span> : null}
            {sel ? (
              <button type="button" className="nu-btn2 nol-open" onClick={() => go(sel)}>
                פתח את {sel}
              </button>
            ) : null}
          </>
        ) : (
          <span className="nol-ctx-idle">
            בחרו טבלה בתרשים כדי לראות את הקשר שלה אל {g.center.tableName} כפי שהתיעוד מתעד אותו.
          </span>
        )}
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

/** The hub's y. Split out so the edge builders and the node agree by
 *  construction rather than by two copies of the same expression. */
function cy(h: number) { return h / 2; }
