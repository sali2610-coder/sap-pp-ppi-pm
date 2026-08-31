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

   CORRECTION PASS (design/neo-correction-pass)

     - A cardinality the dictionary does not record is DRAWN AS ABSENT: a dashed
       chip holding "–", never a fabricated "1:N". The context strip already
       said "לא מצוין בתיעוד"; the diagram now agrees with it.
     - LaneNode/LaneEdge live at module scope. Defined inside the render body
       they were a new component type every render, so React remounted every
       node and edge subtree on each hover.
     - Lane captions are Hebrew; the centre hub wears its module colour, not
       brand red (globals.css: brand is never a module colour).
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

/* GEOMETRY — COMPACT.
   The previous pass took the old Studio's node up ~17% to make three lines of
   text fit. That was the wrong trade: a 176x54 card carrying name, module and a
   clipped Hebrew description is a CARD, and eight of them stacked read as a
   list of cards rather than as a graph. The brief is explicit — compact nodes,
   relationships readable at a glance, no bulky cards.
   So the third line comes OUT of the node (it already appears in full, unclipped,
   in the explanation strip under the diagram the moment you point at a node) and
   the box shrinks to what two lines actually need. Nine nodes now occupy roughly
   half the vertical space they did, which is what lets the EDGES breathe — and
   the edges are the subject. */
const W = 760;
const NW = 148;
const NH = 36;
const ROW_H = 50;
const PAD_Y = 38;
const CAP = 8;

const descOf = (n: string) => {
  const t = tableByName(n);
  return (t?.descriptionHe || t?.descriptionEn || "").trim();
};

/* The node and the edge are MODULE-SCOPE components on purpose: everything they
   need arrives as a prop, so their identity is stable across renders and a
   hover changes attributes instead of remounting subtrees (which restarted the
   CSS transitions and dropped keyboard focus). */

function LaneNode({
  x, y, label, module, exists, center, col, haloCol, on, dimVal, desc, setHot, toggleSel, open,
}: {
  x: number; y: number; label: string; module: string; exists: boolean; center?: boolean;
  col: string; haloCol?: string | null; on: boolean; dimVal: number; desc: string;
  setHot: (n: string | null) => void; toggleSel: (n: string) => void; open: (n: string) => void;
}) {
  return (
    <g
      transform={`translate(${x - NW / 2},${y - NH / 2})`}
      className="nol-n"
      data-on={on ? "1" : "0"}
      style={{ opacity: center ? 1 : dimVal, cursor: exists && !center ? "pointer" : "default" }}
      onMouseEnter={() => !center && setHot(label)}
      onMouseLeave={() => setHot(null)}
      onClick={() => { if (!center && exists) toggleSel(label); }}
      onDoubleClick={() => !center && exists && open(label)}
      tabIndex={exists && !center ? 0 : -1}
      role={exists && !center ? "button" : undefined}
      onKeyDown={(e) => {
        if (center || !exists) return;
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSel(label); }
      }}
      aria-label={center ? `${label}, האובייקט הנוכחי` : `${label}, מודול ${module}${desc ? `, ${desc}` : ""}`}
    >
      {/* THE CENTRE DOMINATES WITHOUT BEING BIGGER.
          Same box as every other node — the brief rules out size as the
          hierarchy device. Dominance comes from three things instead: a
          tinted FILL where the others are plain surface, a heavier ring, and
          a soft halo that takes the colour of whichever relationship is
          currently live. */}
      {center ? (
        <rect
          x={-5} y={-5} width={NW + 10} height={NH + 10} rx={15}
          fill="none"
          stroke={haloCol || col}
          strokeWidth={1.25}
          strokeOpacity={0.3}
          className="nol-halo"
        />
      ) : null}
      <rect
        className="nol-card"
        width={NW} height={NH} rx={9}
        fill={center ? `color-mix(in srgb, ${col} 12%, var(--surface))` : "var(--surface)"}
        stroke={col}
        strokeWidth={center ? 2.4 : on ? 2 : 1.2}
      />
      <rect width={3} height={NH} rx={1.5} fill={col} />
      <text x={NW / 2 + 3} y={15} textAnchor="middle"
        style={{ font: `${center ? 800 : 700} 14px ui-monospace, monospace`, fill: "var(--ink-1)" }}>{label}</text>
      <text x={NW / 2 + 3} y={29} textAnchor="middle"
        style={{ font: "700 10px sans-serif", fill: col, letterSpacing: ".05em" }}>
        {center ? "האובייקט הנוכחי" : module}
      </text>
    </g>
  );
}

function LaneEdge({
  d, mx, my, col, card, other, arrow, on, dimVal, setHot,
}: {
  d: string; mx: number; my: number; col: string; card: string | undefined; other: string;
  arrow: string; on: boolean; dimVal: number; setHot: (n: string | null) => void;
}) {
  return (
    <g className="nol-e" data-on={on ? "1" : "0"} data-card={card ? "stated" : "unstated"}
      style={{ opacity: dimVal }}
      onMouseEnter={() => setHot(other)} onMouseLeave={() => setHot(null)}>
      {/* A RESTING EDGE IS A LINE, A LIVE EDGE IS A FLOW.
          At rest the dash is gone: fourteen dashed curves at once read as
          noise, and a solid hairline is what lets the eye follow one
          relationship across the canvas. The dash appears only on the path
          being pointed at, which is the emphasis the brief asks for. */}
      <path d={d} fill="none" stroke={col} strokeWidth={on ? 2.4 : 1.25}
        strokeOpacity={on ? 1 : 0.4}
        strokeDasharray={on ? "6 5" : undefined}
        className={on ? "nol-flow" : undefined} />
      <path d={arrow} fill="none" stroke={col} strokeWidth={on ? 2 : 1.25} strokeOpacity={on ? 1 : 0.55} />
      {/* The cardinality FILLS when live. An outlined chip with 9px type on a
          hairline was the least readable thing on the diagram.
          WHERE THE DICTIONARY RECORDS NO CARDINALITY THE CHIP SAYS SO: dashed
          outline, "–", and it never fills — an absence is drawn as an absence,
          not defaulted to 1:N. The context strip spells it out in words. */}
      <rect x={mx - 17} y={my - 9} width={34} height={18} rx={9}
        fill={on && card ? col : "var(--surface)"}
        stroke={col} strokeOpacity={card ? (on ? 1 : 0.4) : 0.55} strokeWidth={1}
        strokeDasharray={card ? undefined : "3 3"} />
      <text x={mx} y={my + 4} textAnchor="middle"
        style={{
          font: "700 11px ui-monospace, monospace",
          fill: card ? (on ? "var(--surface)" : "var(--ink-2)") : "var(--ink-3)",
        }}>{card ?? "–"}</text>
    </g>
  );
}

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

  /** The recorded cardinality, or undefined where the dictionary is silent —
   *  never a fabricated default. */
  const cardUp = (n: string) =>
    g.edges.find((e) => e.from === n && e.to === g.center.tableName)?.card;
  const cardDown = (n: string) =>
    g.edges.find((e) => e.from === g.center.tableName && e.to === n)?.card;

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
  /** Dim only during interaction. .45 was not a fade — with everything sitting
   *  at that level the emphasised path never separated from the rest. .3 reads
   *  as a clear background layer while every label stays legible, which is the
   *  line the brief draws: unrelated nodes FADE, they do not disappear. */
  const dim = (n: string) => (focus && focus !== n ? 0.3 : 1);

  /** The centre belongs to every relationship, so it never dims — but it takes
   *  the focused node's hue as a halo. That is how a reader sees WHICH relation
   *  is live without the centre having to move or grow. */
  const focusCol = focus ? mc(tableByName(focus)?.module || "?") : null;

  const go = (n: string) => {
    if (tableByName(n)) router.push(`/neo/object/${encodeURIComponent(n)}/`);
  };
  const toggleSel = (n: string) => setSel((v) => (v === n ? null : n));

  /* The hub wears its own module colour. Brand red stays the global accent —
     it is never a module colour nor a data category (globals.css). */
  const centreCol = mc(g.center.module);

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
          style={{ minWidth: 620 }}
          onMouseLeave={() => setHot(null)}
        >
          {hasUp ? <text x={colX.up} y={20} textAnchor="middle" className="nol-lane">מעלה הזרם</text> : null}
          <text x={cx} y={20} textAnchor="middle" className="nol-lane">האובייקט</text>
          {hasDown ? <text x={colX.down} y={20} textAnchor="middle" className="nol-lane">מורד הזרם</text> : null}

          {up.map((n, i) => {
            const y = yFor(i, up.length);
            const x1 = colX.up + NW / 2, x2 = cx - NW / 2;
            const mx = (x1 + x2) / 2, my = (y + cy(H)) / 2;
            const col = mc(tableByName(n)?.module || "?");
            return (
              <LaneEdge key={"u" + n} other={n} col={col} card={cardUp(n)} mx={mx} my={my}
                on={isLive(n)} dimVal={dim(n)} setHot={setHot}
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
              <LaneEdge key={"d" + n} other={n} col={col} card={cardDown(n)} mx={mx} my={my}
                on={isLive(n)} dimVal={dim(n)} setHot={setHot}
                d={`M${x1},${cy(H)} C${mx},${cy(H)} ${mx},${y} ${x2},${y}`}
                arrow={`M${x2 - 9},${y - 5} L${x2},${y} L${x2 - 9},${y + 5}`} />
            );
          })}

          {up.map((n, i) => (
            <LaneNode key={n} x={colX.up} y={yFor(i, up.length)} label={n}
              module={tableByName(n)?.module || "?"} exists={!!tableByName(n)}
              col={mc(tableByName(n)?.module || "?")} on={isLive(n)} dimVal={dim(n)}
              desc={descOf(n)} setHot={setHot} toggleSel={toggleSel} open={go} />
          ))}
          {down.map((n, i) => (
            <LaneNode key={n} x={colX.down} y={yFor(i, down.length)} label={n}
              module={tableByName(n)?.module || "?"} exists={!!tableByName(n)}
              col={mc(tableByName(n)?.module || "?")} on={isLive(n)} dimVal={dim(n)}
              desc={descOf(n)} setHot={setHot} toggleSel={toggleSel} open={go} />
          ))}
          <LaneNode x={cx} y={cy(H)} label={g.center.tableName} module={g.center.module} exists center
            col={centreCol} haloCol={focusCol} on={false} dimVal={1}
            desc={(g.center.descriptionHe || g.center.descriptionEn || "").trim()}
            setHot={setHot} toggleSel={toggleSel} open={go} />
        </svg>
      </div>

      {/* CONTEXT STRIP — validated fields only. */}
      <div className="nol-ctx" data-on={focus ? "1" : "0"} aria-live="polite">
        {focus ? (
          <>
            {/* Two LTR table names around an arrow inside an RTL page reorder
                unless the run is pinned: dir="ltr" states the data-flow order
                explicitly, always source → target. */}
            <span className="nol-ctx-path nx-sap" dir="ltr">
              {fUp ? `${focus} → ${g.center.tableName}` : `${g.center.tableName} → ${focus}`}
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
