"use client";

// Project NEO · Stage 2B — the object's relationship orbit.
//
// The signature surface of the object page: the object sits physically in the
// middle and everything the dictionary connects to it is placed around it, so a
// relationship can be INSPECTED rather than read off a list. The list still
// exists below — this is the exploration surface, not a replacement for the
// record.
//
// READING THE PICTURE
//   · upper arc  — tables THIS object points at. It carries the foreign key.
//   · lower arc  — tables that point AT this object. They carry the foreign key
//                  and hang off this object's primary key.
//   · line hue   — the stated cardinality (--rel-1-1 / --rel-n-1), or
//                  --rel-inferred when the blueprint recorded the relation
//                  WITHOUT a cardinality. That third case is not a third kind of
//                  relation; it is a gap, and it is drawn as one (dashed).
//   · node hue   — object class (--obj-*). The ring is the module (--mod-*).
//
// MOTION. Only `transform` and `opacity` are animated. The travelling pulse is
// a CSS translate between two endpoints handed in as custom properties, so no
// per-edge keyframes and no layout work. Everything stops under
// prefers-reduced-motion, and the picture is complete without any of it.
//
// This component imports TYPES ONLY from the server data layer. A value import
// would drag data/sapData into the browser bundle.

import Link from "next/link";
import { useId, useMemo, useState } from "react";
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

const VW = 980;
const VH = 640;
const CX = VW / 2;
const CY = VH / 2;
const CW = 218;
const CH = 84;
const NW = 132;
const NH = 44;

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
}

/** Deterministic and pure — the server render and the client render must agree
 *  exactly, so nothing here reads the DOM or the viewport. */
function place(list: Neighbour[]): Placed[] {
  const up = list.filter((n) => n.dir === "parent");
  const down = list.filter((n) => n.dir === "child");
  const out: Placed[] = [];
  let i = 0;

  const arc = (group: Neighbour[], sign: -1 | 1) => {
    const n = group.length;
    if (!n) return;
    // Two rings once an arc is crowded, so labels never collide. The inner ring
    // takes the odd indices, which keeps neighbouring cards off one another.
    const two = n > 7;
    group.forEach((k, j) => {
      const span = n === 1 ? 0 : 1;
      const t = n === 1 ? 0.5 : j / (n - 1);
      const spread = two ? 0.94 : 0.82;
      const a = (t - 0.5) * Math.PI * spread * span;
      const inner = two && j % 2 === 1;
      const rx = inner ? 268 : 386;
      const ry = inner ? 158 : 236;
      out.push({
        k,
        i: i++,
        x: CX + Math.sin(a) * rx,
        y: CY + sign * (Math.cos(a) * ry),
      });
    });
  };

  arc(up, -1);
  arc(down, 1);
  return out;
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
  const placed = useMemo(() => place(shown), [shown]);
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

  return (
    <div className="no-orbit" data-sel={sel ? "1" : "0"}>
      <div className="no-orbit-bar">
        <span className="no-orbit-title">
          <GitBranch size={14} strokeWidth={1.75} aria-hidden="true" />
          מפת הקשרים
        </span>

        <div className="no-seg" role="group" aria-label="סינון לפי כיוון הקשר">
          {(
            [
              ["all", `הכול · ${counts.all}`],
              ["child", `בנים · ${counts.child}`],
              ["parent", `אבות · ${counts.parent}`],
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

      <div className="no-orbit-scroll">
        <svg
          className="no-orbit-svg"
          viewBox={`0 0 ${VW} ${VH}`}
          role="img"
          aria-label={`מפת הקשרים של ${name} — ${placed.length} טבלאות מקושרות`}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={MOD_VAR[mods[0]]} />
              <stop offset="100%" stopColor={MOD_VAR[mods[mods.length - 1]]} />
            </linearGradient>
          </defs>

          {/* Two reference arcs. They carry no data — they are the horizon that
              tells the eye the picture has an above and a below. */}
          <g className="no-ring" aria-hidden="true">
            <ellipse cx={CX} cy={CY} rx={386} ry={236} />
            <ellipse cx={CX} cy={CY} rx={268} ry={158} />
          </g>

          {/* Edges first, so no line ever crosses a label. */}
          <g className="no-edges">
            {placed.map(({ k, x, y }) => {
              const a = edgePoint(CX, CY, x, y, CW, CH);
              const b = edgePoint(x, y, CX, CY, NW, NH);
              const on = sel === k.name;
              return (
                <g
                  key={k.name}
                  className="no-edge"
                  data-on={on ? "1" : "0"}
                  data-kind={k.kind}
                  style={{ "--r": REL_VAR[k.kind] } as React.CSSProperties}
                >
                  <line className="no-edge-l" x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
                  {on ? (
                    <circle
                      className="no-edge-p"
                      cx={a.x}
                      cy={a.y}
                      r={3.5}
                      style={{ "--dx": `${b.x - a.x}px`, "--dy": `${b.y - a.y}px` } as React.CSSProperties}
                    />
                  ) : null}
                  <text
                    className="no-edge-t"
                    x={(a.x + b.x) / 2}
                    y={(a.y + b.y) / 2 - 6}
                    textAnchor="middle"
                  >
                    {k.card || "?"}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Satellites. Buttons, not links: a tap must be able to INSPECT the
              relation before it commits to a page. The readout carries the
              link. */}
          <g className="no-sats">
            {placed.map(({ k, x, y }) => (
              <g
                key={k.name}
                className="no-sat"
                data-on={sel === k.name ? "1" : "0"}
                data-dim={sel && sel !== k.name ? "1" : "0"}
                style={
                  {
                    "--o": k.obj,
                    "--m": MOD_VAR[k.mods[0]],
                    "--d": `${(k.dir === "child" ? 0 : 60) + placed.findIndex((p) => p.k.name === k.name) * 26}ms`,
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
                    <em>{k.fields ? `${k.fields} שדות` : "—"}</em>
                  </button>
                </foreignObject>
              </g>
            ))}
          </g>

          {/* The object itself. Deliberately the largest, heaviest thing on the
              canvas — it is the subject of the page. */}
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

      {/* The readout. Verbatim, per blueprint — two modules describing one edge
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
                  </>
                ) : (
                  <>
                    <CornerDownLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                    <span className="nx-sap">{name}</span> מפנה אל <span className="nx-sap">{active.name}</span>
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
                שני התכנונים רושמים את הקשר הזה בשני הכיוונים — כל אחד מציב צד אחר כבעל
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
                    <span className="no-none">המילון אינו מחזיק ניסוח JOIN לקשר הזה</span>
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
            בחר טבלה במפה כדי לראות את ניסוח ה־JOIN המדויק כפי שהמילון מחזיק אותו.
            {name} מדורגת {rank} מתוך {total} טבלאות לפי מספר הקשרים הממודלים.
          </p>
        )}
      </div>

      <ul className="no-legend" aria-label="מקרא הקשרים">
        {(["1-1", "n-1", "unstated"] as const).map((k) => (
          <li key={k} style={{ "--r": REL_VAR[k] } as React.CSSProperties} data-kind={k}>
            <i aria-hidden="true" />
            {k === "unstated" ? "קשר ללא עוצמה מצוינת במילון" : REL_HE[k]}
          </li>
        ))}
      </ul>
    </div>
  );
}
