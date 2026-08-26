"use client";

// Project NEO · where the object sits in the chain.
//
// The signature surface of the object page: the object sits physically in the
// middle and everything the dictionary connects to it is placed around it, so a
// relationship can be INSPECTED rather than read off a list. The list still
// exists below; this is the exploration surface, not a replacement for the
// record.
//
// WHAT WAS RAISED FROM THE PRODUCTION GRAPH
// (app/sap-infrastructure/page.tsx, read only: its `MiniRel` hub and its ERD)
//   · Parents above, children below, with both bands NAMED instead of left to
//     be inferred from position: מעלה הזרם / מורד הזרם.
//   · A travelling pulse on EVERY connector, not only on the selected one. The
//     old graph read as alive because its lines moved all the time; the
//     previous revision here animated a selection and nothing else, which is
//     what "סטטי מדי" was describing.
//   · The pulse runs in the direction the record states. Data flows parent to
//     child, so a parent pushes INTO this object and this object pushes into a
//     child. The animation is never allowed to contradict the record.
//   · The cardinality rides the line as a badge, verbatim.
//
// WHAT IS NEO'S RATHER THAN THE OLD SCREEN'S
//   The canvas is sized from the data. One band or two, one ring or two, and
//   the height follows: a table with three neighbours does not get a picture
//   built for fifteen. The hues are NEO's tokens in both themes, and the
//   readout under the picture still carries the verbatim JOIN.
//
// READING THE PICTURE
//   · upper band · tables THIS object points at. It carries the foreign key.
//   · lower band · tables that point AT this object. They carry the foreign key
//                  and hang off this object's primary key.
//   · line hue   · the stated cardinality (--rel-1-1 / --rel-n-1), or
//                  --rel-inferred when the blueprint recorded the relation
//                  WITHOUT a cardinality. That third case is not a third kind of
//                  relation; it is a gap, and it is drawn as one (dashed).
//   · node hue   · object class (--obj-*). The ring is the module (--mod-*).
//
// MOTION. Only `transform` and `opacity` are animated. The travelling pulse is
// a CSS translate between two endpoints handed in as custom properties, so no
// per-edge keyframes and no layout work. Everything stops under
// prefers-reduced-motion, and the picture is complete without any of it.
//
// This component imports TYPES ONLY from the server data layer. A value import
// would drag data/sapData into the browser bundle.

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowUpLeft, CornerDownLeft, Filter, GitBranch } from "lucide-react";
import type { Neighbour } from "./object-data";

type ModuleKey = "PM" | "PP-PI";

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const REL_VAR: Record<string, string> = {
  "1-1": "var(--rel-1-1)",
  "n-1": "var(--rel-n-1)",
  unstated: "var(--rel-inferred)",
};
const REL_HE: Record<string, string> = { "1-1": "1:1", "n-1": "N:1", unstated: "עוצמה לא מצוינת" };

/* ------------------------------------------------------------- geometry */

/* DENSITY. Measured against the old Studio, which the review is right about:
   it showed more structure in less space. The band ARCHITECTURE here was
   already correct (upstream above, object centred, downstream below, each band
   captioned), so nothing about the information architecture changed. What was
   wrong was the scale of everything in it.

   Before: node 140x46, centre 226x92 — a centre 3.2x the area of a node — and
   only 18.8% of the canvas carrying any node at all on EQUI. The graph read as
   a presentation slide because it was mostly empty.

   The centre still has to be obviously the subject, but it earns that by being
   the only card with a description, a class marker and a ring; it does not need
   to be three times the size. Dropping it to 176x66 leaves it 2.2x a node's
   area, which is dominance without bulk.

   Six columns rather than five, at a tighter gutter, is what puts more of the
   relationships on one screen — the specific thing the review asked for. */
const VW = 880;
const CX = VW / 2;
const CW = 176;
const CH = 66;
const NW = 126;
const NH = 38;

/** The band grid. Cards are laid in rows away from the centre rather than on an
 *  arc: an arc puts its extremes level with the middle card, which is exactly
 *  where the centre card is widest, and the two collide. Rows cannot collide.
 *  Six columns is what 880 holds at 126 + 14. */
const COLS = 6;
const GAP_X = 14;
const ROW_H = NH + 14;
/** Clearance between the centre card and the first row of a band. */
const CLEAR = 38;
/** Room reserved beyond the last row for the band caption. */
const BAND = 30;

/* CONNECTIONS ARE CURVES, NOT CHORDS.
   Straight lines between a wide centre card and a grid of satellites all
   converge on the same few pixels and cross each other at hard angles, which
   is what made the graph read as a wiring diagram. A cubic that leaves the
   centre vertically and arrives at the node vertically keeps the bundle
   parallel where it is densest, so the eye can follow one relationship out of
   a fan of fourteen.

   The control points are pulled along the BLOCK axis only, because the layout
   is banded (upstream above, downstream below): bending on that axis follows
   the direction the data already flows and never introduces a new crossing. */
type Pt = { x: number; y: number };

const CURVE = 0.45;

function curve(a: Pt, b: Pt): string {
  const dy = (b.y - a.y) * CURVE;
  return `M${a.x},${a.y} C${a.x},${a.y + dy} ${b.x},${b.y - dy} ${b.x},${b.y}`;
}

/** The same cubic, evaluated, so a label can sit ON the line it belongs to. */
function curvePoint(a: Pt, b: Pt, t: number): Pt {
  const dy = (b.y - a.y) * CURVE;
  const c1 = { x: a.x, y: a.y + dy };
  const c2 = { x: b.x, y: b.y - dy };
  const u = 1 - t;
  const w0 = u * u * u, w1 = 3 * u * u * t, w2 = 3 * u * t * t, w3 = t * t * t;
  return {
    x: w0 * a.x + w1 * c1.x + w2 * c2.x + w3 * b.x,
    y: w0 * a.y + w1 * c1.y + w2 * c2.y + w3 * b.y,
  };
}

/** Border point of an axis-aligned box centred on (cx,cy), along the direction
 *  of (tx,ty). Keeps every line ending on an edge, never under a card. */
function edgePoint(cx: number, cy: number, tx: number, ty: number, w: number, h: number) {
  const dx = tx - cx;
  const dy = ty - cy;
  if (!dx && !dy) return { x: cx, y: cy };
  const s = Math.min(dx ? w / 2 / Math.abs(dx) : Infinity, dy ? h / 2 / Math.abs(dy) : Infinity);
  return { x: cx + dx * s, y: cy + dy * s };
}

interface Placed {
  k: Neighbour;
  i: number;
  x: number;
  y: number;
  /** 0 = the row nearest the object. */
  row: number;
}

interface Scene {
  placed: Placed[];
  up: number;
  down: number;
  /** Canvas height and the y of the centre, both derived from which bands
   *  actually carry cards, so an empty band never reserves half a screen. */
  vh: number;
  cy: number;
  upRows: number;
  downRows: number;
}

/** How many rows a band of n cards needs, and how many cards each row holds.
 *  The row NEAREST the object is filled first and rows are balanced, so eight
 *  children read as 5 + 3 rather than 5 + 1 + 1 + 1. */
function rowsOf(n: number): number[] {
  if (n <= 0) return [];
  const rows = Math.ceil(n / COLS);
  const base = Math.floor(n / rows);
  const extra = n % rows;
  return Array.from({ length: rows }, (_, r) => base + (r < extra ? 1 : 0));
}

/** Deterministic and pure. The server render and the client render must agree
 *  exactly, so nothing here reads the DOM or the viewport. */
function place(list: Neighbour[]): Scene {
  const upList = list.filter((n) => n.dir === "parent");
  const downList = list.filter((n) => n.dir === "child");
  const upRows = rowsOf(upList.length);
  const downRows = rowsOf(downList.length);

  const reach = (rows: number[]) =>
    rows.length === 0 ? CH / 2 + 26 : CH / 2 + CLEAR + rows.length * ROW_H - 22 + BAND;
  const top = reach(upRows);
  const vh = top + reach(downRows);

  const out: Placed[] = [];
  let i = 0;
  const band = (group: Neighbour[], rows: number[], sign: -1 | 1) => {
    let at = 0;
    rows.forEach((count, r) => {
      const y = top + sign * (CH / 2 + CLEAR + r * ROW_H);
      for (let c = 0; c < count; c++) {
        const k = group[at++];
        out.push({
          k,
          i: i++,
          row: r,
          x: Math.round(CX + (c - (count - 1) / 2) * (NW + GAP_X)),
          y: Math.round(y),
        });
      }
    });
  };
  band(upList, upRows, -1);
  band(downList, downRows, 1);
  return {
    placed: out,
    up: upList.length,
    down: downList.length,
    vh,
    cy: top,
    upRows: upRows.length,
    downRows: downRows.length,
  };
}

/* ---------------------------------------------------------------- render */

export interface OrbitProps {
  name: string;
  he: string;
  obj: string;
  mods: ModuleKey[];
  neighbours: Neighbour[];
  /** Dictionary-wide totals, printed as the honest caption. */
  total: number;
  rank: number;
}

type DirFilter = "all" | "child" | "parent";

export function ObjectOrbit({ name, he, obj, mods, neighbours, total, rank }: OrbitProps) {
  const uid = useId().replace(/[:]/g, "");
  const [dir, setDir] = useState<DirFilter>("all");
  const [mod, setMod] = useState<ModuleKey | "all">("all");
  const [sel, setSel] = useState<string | null>(null);

  const shown = useMemo(
    () =>
      neighbours.filter(
        (n) => (dir === "all" || n.dir === dir) && (mod === "all" || n.edgeMods.includes(mod)),
      ),
    [neighbours, dir, mod],
  );
  const scene = useMemo(() => place(shown), [shown]);
  const placed = scene.placed;
  const active = useMemo(() => shown.find((n) => n.name === sel) || null, [shown, sel]);

  const counts = useMemo(
    () => ({
      all: neighbours.length,
      child: neighbours.filter((n) => n.dir === "child").length,
      parent: neighbours.filter((n) => n.dir === "parent").length,
    }),
    [neighbours],
  );

  const gradId = `og-${uid}`;
  const CY = scene.cy;
  const VH = scene.vh;

  /* THE OBJECT IS ALWAYS THE THING YOU SEE FIRST.

     Narrow screens pan this canvas rather than shrinking it, and a horizontal
     scroller opens at one of its EDGES — which edge depends on the writing
     direction, and this page is RTL. Either way the subject of the page starts
     off-screen, which is the one thing a picture called "where the object sits"
     cannot do. Measured and corrected in an effect, never during render, and
     expressed as a RELATIVE scroll so it is right under both direction models. */
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const core = el.querySelector(".no-core");
    if (!core) return;
    const c = core.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    const delta = c.left + c.width / 2 - (box.left + box.width / 2);
    if (Math.abs(delta) > 2) el.scrollBy({ left: delta, behavior: "auto" });
  }, [placed.length, VH]);

  /** Text that never scales below the point of legibility. The canvas is a
   *  scroll region rather than a shrink region, so a phone pans a full-size
   *  picture instead of squinting at a shrunk one. */
  const cap = { fontSize: 11.5, fontWeight: 700, fill: "var(--ink-3)" } as const;

  return (
    <div className="no-orbit" data-sel={sel ? "1" : "0"}>
      <div className="no-orbit-bar">
        <span className="no-orbit-title">
          <GitBranch size={14} strokeWidth={1.75} aria-hidden="true" />
          היכן האובייקט יושב בשרשרת
        </span>

        <div className="no-seg" role="group" aria-label="סינון לפי כיוון הקשר">
          {(
            [
              ["all", `הכול · ${counts.all}`],
              ["parent", `מעלה הזרם · ${counts.parent}`],
              ["child", `מורד הזרם · ${counts.child}`],
            ] as [DirFilter, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="nu-filter"
              aria-pressed={dir === id}
              data-on={dir === id ? "1" : undefined}
              onClick={() => setDir(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {mods.length > 1 ? (
          <div className="no-seg" role="group" aria-label="סינון לפי מודול">
            <button
              type="button"
              className="nu-filter"
              aria-pressed={mod === "all"}
              data-on={mod === "all" ? "1" : undefined}
              onClick={() => setMod("all")}
            >
              שני המודולים
            </button>
            {mods.map((m) => (
              // .nu-filter already draws its pressed state as a short MODULE
              // BAR (::before in ui.css), which is why this button hands it the
              // module hue and does not draw a marker of its own.
              <button
                key={m}
                type="button"
                className="nu-filter"
                style={{ "--m": MOD_VAR[m] } as React.CSSProperties}
                aria-pressed={mod === m}
                data-on={mod === m ? "1" : undefined}
                onClick={() => setMod(m)}
              >
                {m}
              </button>
            ))}
          </div>
        ) : null}

        <span className="no-orbit-note">
          <Filter size={12} strokeWidth={1.75} aria-hidden="true" />
          {placed.length} מתוך {counts.all} קשרים ממודלים
        </span>
      </div>

      <div className="no-orbit-scroll" ref={scrollRef}>
        <svg
          className="no-orbit-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          // The stylesheet pins a 60rem floor for a canvas that used to be a
          // fixed 980x640. This picture is sized from the data, so the floor is
          // sized from the picture: a small chain fits a phone without a
          // scrollbar, and a large one pans instead of shrinking to nothing.
          style={{ minInlineSize: `${Math.round(VW / 16)}rem` }}
          role="img"
          aria-label={`היכן ${name} יושב בשרשרת: ${scene.up} טבלאות במעלה הזרם, ${scene.down} במורד הזרם`}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={MOD_VAR[mods[0]]} />
              <stop offset="100%" stopColor={MOD_VAR[mods[mods.length - 1]]} />
            </linearGradient>
          </defs>

          {/* The horizon. One waterline through the object: it carries no data,
              it tells the eye the picture has an above and a below. Drawn with
              explicit attributes because the stylesheet's .no-ring rule only
              speaks about ellipses. */}
          {placed.length ? (
            <line
              className="no-ring"
              aria-hidden="true"
              x1={40}
              x2={VW - 40}
              y1={CY}
              y2={CY}
              stroke="var(--hairline)"
              strokeWidth={1}
              strokeDasharray="2 6"
            />
          ) : null}

          {/* Band captions. The direction of the chain, said in words, so the
              reader never has to infer it from which half a card landed in. */}
          {scene.up ? (
            <text x={CX} y={18} textAnchor="middle" style={cap}>
              מעלה הזרם · {scene.up} טבלאות שמחזיקות את המפתח הראשי
            </text>
          ) : null}
          {scene.down ? (
            <text x={CX} y={VH - 10} textAnchor="middle" style={cap}>
              מורד הזרם · {scene.down} טבלאות שמחזיקות מפתח זר אל האובייקט
            </text>
          ) : null}

          {/* Edges first, so no line ever crosses a label. */}
          <g className="no-edges">
            {placed.map(({ k, x, y, i, row }) => {
              const a = edgePoint(CX, CY, x, y, CW, CH);
              const b = edgePoint(x, y, CX, CY, NW, NH);
              const on = sel === k.name;
              // The pulse travels the way the record reads: a parent pushes
              // down into this object, this object pushes down into a child.
              const from = k.dir === "parent" ? b : a;
              const to = k.dir === "parent" ? a : b;
              const label = k.card || "–";
              const bw = Math.max(24, label.length * 7.2 + 12);
              // 62% of the way to the satellite rather than the midpoint: the
              // object card is the widest thing on the canvas and a midpoint
              // badge on a near-horizontal chord lands underneath it.
              const t = Math.min(0.82, 0.62 + row * 0.14);
              // The badge has to ride the CURVE, not the straight chord it
              // replaced, or it drifts off its own line on the longer spans.
              const mid = curvePoint(a, b, t);
              const mx = mid.x;
              const my = mid.y;
              return (
                <g
                  key={k.name}
                  className="no-edge"
                  data-on={on ? "1" : "0"}
                  data-kind={k.kind}
                  style={{ "--r": REL_VAR[k.kind] } as React.CSSProperties}
                >
                  {/* ONE child, deliberately. An SVG <title> with two JSX
                      expressions in it is two text nodes on the server and one
                      on the client, which React reports as a hydration
                      mismatch and then throws the subtree away. */}
                  <title>
                    {`${k.name} ${k.dir === "parent" ? "נמצאת במעלה הזרם של" : "נמצאת במורד הזרם של"} ${name}${
                      k.card ? ` · ${k.card}` : " · התיעוד לא רשם עוצמה לקשר הזה"
                    }`}
                  </title>
                  <path className="no-edge-l" d={curve(a, b)} />
                  {/* Alive by default. The stagger is a pure function of the
                      card's index, so the server and the client agree. */}
                  <circle
                    className="no-edge-p"
                    cx={from.x}
                    cy={from.y}
                    r={on ? 4 : 2.8}
                    style={
                      {
                        "--dx": `${to.x - from.x}px`,
                        "--dy": `${to.y - from.y}px`,
                        animationDelay: `${(i % 6) * 260}ms`,
                        opacity: on ? 1 : 0.62,
                      } as React.CSSProperties
                    }
                  />
                  {/* The cardinality badge, verbatim. A dash on a dashed
                      outline is the fourth case and it means the blueprint
                      wrote no strength at all. */}
                  <g style={{ pointerEvents: "none" }}>
                    <rect
                      x={mx - bw / 2}
                      y={my - 9}
                      width={bw}
                      height={17}
                      rx={8.5}
                      fill="var(--surface)"
                      stroke={k.card ? "var(--r)" : "var(--ink-3)"}
                      strokeWidth={1.1}
                      strokeDasharray={k.card ? undefined : "3 3"}
                      opacity={on ? 1 : 0.9}
                    />
                    <text
                      x={mx}
                      y={my + 3.5}
                      textAnchor="middle"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10.5,
                        fontWeight: 700,
                        direction: "ltr",
                        fill: k.card ? "var(--ink-1)" : "var(--ink-3)",
                      }}
                    >
                      {label}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* Satellites. Buttons, not links: a tap must be able to INSPECT the
              relation before it commits to a page. The readout carries the
              link. */}
          <g className="no-sats">
            {placed.map(({ k, x, y, i }) => (
              <g
                key={k.name}
                className="no-sat"
                data-on={sel === k.name ? "1" : "0"}
                data-dim={sel && sel !== k.name ? "1" : "0"}
                style={
                  {
                    "--o": k.obj,
                    "--m": MOD_VAR[k.mods[0]],
                    "--d": `${(k.dir === "child" ? 0 : 60) + i * 26}ms`,
                    transform: `translate(${x}px, ${y}px)`,
                  } as React.CSSProperties
                }
              >
                <foreignObject x={-NW / 2} y={-NH / 2} width={NW} height={NH}>
                  {/* .nu-card supplies the frame, the hover, the pressed ring
                      and the focus language; .no-sat-b only lays it out inside
                      the foreignObject, which needs a fixed 100%/100% box. */}
                  <button
                    type="button"
                    className="nu-card no-sat-b"
                    aria-pressed={sel === k.name}
                    onClick={() => setSel(sel === k.name ? null : k.name)}
                    onMouseEnter={() => setSel(k.name)}
                    onFocus={() => setSel(k.name)}
                    title={k.he || k.name}
                  >
                    <i className="no-sat-cls" aria-hidden="true" />
                    <b className="nx-sap">{k.name}</b>
                    <em>
                      {k.mods[0]}
                      {k.fields ? ` · ${k.fields} שדות` : ""}
                    </em>
                  </button>
                </foreignObject>
              </g>
            ))}
          </g>

          {/* The object itself. Deliberately the largest, heaviest thing on the
              canvas: it is the subject of the page. */}
          <g className="no-core" style={{ transform: `translate(${CX}px, ${CY}px)` }}>
            <rect
              className="no-core-r"
              x={-CW / 2}
              y={-CH / 2}
              width={CW}
              height={CH}
              rx={14}
              style={{ stroke: mods.length > 1 ? `url(#${gradId})` : MOD_VAR[mods[0]] } as React.CSSProperties}
            />
            <foreignObject x={-CW / 2} y={-CH / 2} width={CW} height={CH}>
              <span className="no-core-in" style={{ "--o": obj } as React.CSSProperties}>
                <i className="no-core-cls" aria-hidden="true" />
                <b className="nx-sap">{name}</b>
                <em>{he}</em>
              </span>
            </foreignObject>
          </g>
        </svg>
      </div>

      {/* The readout. Verbatim, per blueprint: two modules describing one edge
          in different words is a fact about the dictionary, not a duplicate. */}
      <div className="no-read" aria-live="polite">
        {active ? (
          <>
            <div className="no-read-h">
              <span className="no-read-dir" data-dir={active.dir}>
                {active.dir === "child" ? (
                  <>
                    <CornerDownLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                    <span className="nx-sap">{active.name}</span> מפנה אל <span className="nx-sap">{name}</span>
                    <span> · מורד הזרם</span>
                  </>
                ) : (
                  <>
                    <CornerDownLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                    <span className="nx-sap">{name}</span> מפנה אל <span className="nx-sap">{active.name}</span>
                    <span> · מעלה הזרם</span>
                  </>
                )}
              </span>
              <span className="no-rel" style={{ "--r": REL_VAR[active.kind] } as React.CSSProperties}>
                <i aria-hidden="true" />
                {active.card || REL_HE[active.kind]}
              </span>
              <Link className="nu-btn2 no-read-go" href={`/neo/object/${active.name}/`} prefetch={false}>
                פתח את {active.name}
                <ArrowUpLeft size={13} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
            {active.contested ? (
              <p className="no-read-warn">
                שני התכנונים רושמים את הקשר הזה בשני הכיוונים. כל אחד מציב צד אחר כבעל
                המפתח הראשי. שתי הרשומות נשמרות ומוצגות, ואף אחת לא נבחרה על פני השנייה.
              </p>
            ) : null}
            {active.he ? <p className="no-read-he">{active.he}</p> : null}
            <ul className="no-read-joins">
              {active.joins.map((j, n) => (
                <li key={`${j.mod}-${n}`} style={{ "--m": MOD_VAR[j.mod] } as React.CSSProperties}>
                  <span className="no-read-mod">
                    <i aria-hidden="true" />
                    {j.mod}
                  </span>
                  {j.join ? (
                    <code className="no-join">{j.join}</code>
                  ) : (
                    <span className="no-none">התיעוד אינו מחזיק ניסוח JOIN לקשר הזה</span>
                  )}
                  {j.desc ? <span className="no-read-desc">{j.desc}</span> : null}
                  {j.pk || j.fk ? (
                    <span className="no-read-keys">
                      {j.pk ? (
                        <em>
                          PK <b className="nx-sap">{j.pk}</b>
                        </em>
                      ) : null}
                      {j.fk ? (
                        <em>
                          FK <b className="nx-sap">{j.fk}</b>
                        </em>
                      ) : null}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="no-read-idle">
            בחר טבלה במפה כדי לראות את ניסוח ה־JOIN המדויק כפי שהתיעוד מחזיק אותו.
            {name} מדורגת {rank} מתוך {total} טבלאות לפי מספר הקשרים הממודלים.
          </p>
        )}
      </div>

      <ul className="no-legend" aria-label="מקרא הקשרים">
        {(["1-1", "n-1", "unstated"] as const).map((k) => (
          <li key={k} style={{ "--r": REL_VAR[k] } as React.CSSProperties} data-kind={k}>
            <i aria-hidden="true" />
            {k === "unstated" ? "קשר ללא עוצמה מצוינת בתיעוד" : REL_HE[k]}
          </li>
        ))}
        <li>התג על הקו הוא הניסוח המילולי של התיעוד. מקף על מסגרת מקווקוות פירושו שלא נרשמה עוצמה.</li>
      </ul>
    </div>
  );
}
