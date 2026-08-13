"use client";

// Project NEO · Stage 2B — the ERD / data-model workspace.
//
// A professional diagram surface over the REAL relation map: 105 documented
// tables, 106 modelled parent→child edges, every JOIN verbatim. The layout is
// solved at build time by components/neo-shell/erd/erd-data.ts, so this file
// owns interaction and nothing else — no layout engine, no WebGL, no canvas
// texture, no new dependency. Inline SVG and DOM.
//
// SCROLLING IS NEVER TAKEN FROM THE USER
//   · wheel zooms ONLY with Ctrl/Cmd held. Without a modifier the listener
//     returns immediately and the page scrolls exactly as it would with no
//     diagram on it. preventDefault is called in the modifier branch only.
//   · zoom is additionally reachable from explicit buttons and from + - 0.
//   · the stage declares `touch-action: none` so a finger drags the diagram,
//     which is a declared gesture region, not a hijacked scroll: the stage is a
//     bounded box and the page scrolls everywhere around it.
//
// PERFORMANCE
//   Pan and zoom write ONE `transform` attribute on ONE <g>, plus the minimap
//   viewport rect. React never re-renders during a drag — the pointer path
//   touches no state. Discrete events (select, filter, search) re-render, which
//   is what they are for.
//
// ACCESSIBILITY
//   The SVG is the picture. Every action it offers also exists as a real
//   keyboard control: the table list on the side is a list of buttons, the
//   stage answers + - 0, arrows and Escape, and the inspector is a live region.
//
// COLOUR, per the form rule in app/globals.css:
//   MODULE  --mod-*   node ring and the shared-table gradient ring. Never a dot.
//   OBJECT  --obj-*   the class marker on the node.
//   RELATION --rel-*  the edges, and nothing else.

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpLeft, Crosshair, Focus, Layers, Maximize2, Minus, Plus, Search, X,
} from "lucide-react";
import type { ErdPayload, ErdPayloadEdge, ErdPayloadNode } from "./erd-data";

type ModuleKey = "PM" | "PP-PI";
type Filter = "all" | "PM" | "PP-PI" | "shared";

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "אחזקת מפעל · PM", "PP-PI": "ייצור תהליכי · PP-PI" };
const REL_VAR: Record<string, string> = {
  "1-1": "var(--rel-1-1)",
  "n-1": "var(--rel-n-1)",
  unstated: "var(--rel-inferred)",
};
const REL_HE: Record<string, string> = { "1-1": "1:1", "n-1": "N:1", unstated: "עוצמה לא מצוינת" };

const MIN_K = 0.14;
const MAX_K = 2.4;
const PAD = 44;

const clampK = (k: number) => Math.min(MAX_K, Math.max(MIN_K, k));
const nf = new Intl.NumberFormat("he-IL");

export function ErdWorkspace({ data }: { data: ErdPayload }) {
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<SVGGElement>(null);
  const miniBox = useRef<SVGRectElement>(null);
  const view = useRef({ x: 0, y: 0, k: 1 });
  const anim = useRef(0);

  const [zoom, setZoom] = useState(100);
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const byName = useMemo(() => new Map(data.nodes.map((n) => [n.n, n])), [data.nodes]);

  /** Edges of the selected node, and the tables on the far end. */
  const focusSet = useMemo(() => {
    if (!sel) return { edges: new Set<string>(), near: new Set<string>() };
    const edges = new Set<string>();
    const near = new Set<string>();
    for (const e of data.edges) {
      if (e.p === sel) { edges.add(e.i); near.add(e.c); }
      else if (e.c === sel) { edges.add(e.i); near.add(e.p); }
    }
    return { edges, near };
  }, [sel, data.edges]);

  const visible = useCallback(
    (n: ErdPayloadNode) =>
      filter === "all" ||
      (filter === "shared" ? n.b === 1 : n.m.includes(filter as ModuleKey)),
    [filter],
  );

  const query = q.trim().toLowerCase();
  const hits = useMemo(() => {
    const pool = data.nodes.filter(visible);
    const list = query
      ? pool.filter((n) => n.n.toLowerCase().includes(query) || n.he.toLowerCase().includes(query))
      : pool;
    return [...list].sort((a, b) => b.d - a.d || a.n.localeCompare(b.n));
  }, [data.nodes, query, visible]);
  const hitSet = useMemo(() => new Set(query ? hits.map((n) => n.n) : []), [hits, query]);

  const active = sel ? byName.get(sel) || null : null;
  const activeEdges = useMemo(
    () => (sel ? data.edges.filter((e) => e.p === sel || e.c === sel) : []),
    [sel, data.edges],
  );

  /* ------------------------------------------------------------- viewport */

  const paint = useCallback(() => {
    const { x, y, k } = view.current;
    world.current?.setAttribute("transform", `translate(${x} ${y}) scale(${k})`);
    const st = stage.current;
    const mv = miniBox.current;
    if (st && mv) {
      mv.setAttribute("x", String(-x / k));
      mv.setAttribute("y", String(-y / k));
      mv.setAttribute("width", String(st.clientWidth / k));
      mv.setAttribute("height", String(st.clientHeight / k));
    }
  }, []);

  const calm = useCallback(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  /** Animated move to a target viewport. transform only; cancelled by any new
   *  gesture so a drag always wins over an in-flight transition. */
  const glide = useCallback(
    (to: { x: number; y: number; k: number }) => {
      cancelAnimationFrame(anim.current);
      const from = { ...view.current };
      if (calm()) {
        view.current = to;
        paint();
        setZoom(Math.round(to.k * 100));
        return;
      }
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 420);
        const e = 1 - Math.pow(1 - p, 3);
        view.current = {
          x: from.x + (to.x - from.x) * e,
          y: from.y + (to.y - from.y) * e,
          k: from.k + (to.k - from.k) * e,
        };
        paint();
        if (p < 1) anim.current = requestAnimationFrame(step);
        else setZoom(Math.round(to.k * 100));
      };
      anim.current = requestAnimationFrame(step);
    },
    [calm, paint],
  );

  const fit = useCallback(() => {
    const st = stage.current;
    if (!st) return;
    const k = clampK(Math.min((st.clientWidth - PAD * 2) / data.w, (st.clientHeight - PAD * 2) / data.h));
    glide({ k, x: (st.clientWidth - data.w * k) / 2, y: (st.clientHeight - data.h * k) / 2 });
  }, [data.w, data.h, glide]);

  const centre = useCallback(
    (name: string, k?: number) => {
      const st = stage.current;
      const n = byName.get(name);
      if (!st || !n) return;
      const kk = clampK(k ?? Math.max(view.current.k, 0.95));
      glide({ k: kk, x: st.clientWidth / 2 - n.x * kk, y: st.clientHeight / 2 - n.y * kk });
    },
    [byName, glide],
  );

  const zoomAt = useCallback(
    (mult: number, px?: number, py?: number) => {
      const st = stage.current;
      if (!st) return;
      cancelAnimationFrame(anim.current);
      const cx = px ?? st.clientWidth / 2;
      const cy = py ?? st.clientHeight / 2;
      const v = view.current;
      const k1 = clampK(v.k * mult);
      view.current = {
        k: k1,
        x: cx - (cx - v.x) * (k1 / v.k),
        y: cy - (cy - v.y) * (k1 / v.k),
      };
      paint();
      setZoom(Math.round(k1 * 100));
    },
    [paint],
  );

  /* ------------------------------------------------------- initial framing */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    // A deep link from an object page: /neo/erd/#AUFK opens on that table.
    const want = decodeURIComponent((window.location.hash || "").slice(1)).toUpperCase();
    const start = byName.get(want);
    const k = start ? 1 : clampK(Math.min((st.clientWidth - PAD * 2) / data.w, (st.clientHeight - PAD * 2) / data.h));
    view.current = start
      ? { k, x: st.clientWidth / 2 - start.x * k, y: st.clientHeight / 2 - start.y * k }
      : { k, x: (st.clientWidth - data.w * k) / 2, y: (st.clientHeight - data.h * k) / 2 };
    paint();
    setZoom(Math.round(k * 100));
    if (start) setSel(start.n);
    const ro = new ResizeObserver(() => paint());
    ro.observe(st);
    return () => ro.disconnect();
  }, [byName, data.w, data.h, paint]);

  /* --------------------------------------------------------------- wheel */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const onWheel = (e: WheelEvent) => {
      // No modifier ⇒ this is a page scroll and it is none of our business.
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const r = st.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
    };
    st.addEventListener("wheel", onWheel, { passive: false });
    return () => st.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  /* ----------------------------------------------------- pointer: pan/pinch */

  useEffect(() => {
    const st = stage.current;
    if (!st) return;
    const pts = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    let moved = 0;

    const down = (e: PointerEvent) => {
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) moved = 0;
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        pinch = Math.hypot(a.x - b.x, a.y - b.y);
      }
      st.setPointerCapture(e.pointerId);
      cancelAnimationFrame(anim.current);
    };

    const move = (e: PointerEvent) => {
      const prev = pts.get(e.pointerId);
      if (!prev) return;
      const now = { x: e.clientX, y: e.clientY };
      pts.set(e.pointerId, now);

      if (pts.size === 1) {
        const dx = now.x - prev.x;
        const dy = now.y - prev.y;
        moved += Math.abs(dx) + Math.abs(dy);
        view.current.x += dx;
        view.current.y += dy;
        paint();
        return;
      }
      if (pts.size === 2) {
        const [a, b] = [...pts.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch > 0) {
          const r = st.getBoundingClientRect();
          zoomAt(d / pinch, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
        }
        pinch = d;
        moved += 20;
      }
    };

    const up = (e: PointerEvent) => {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinch = 0;
      if (st.hasPointerCapture(e.pointerId)) st.releasePointerCapture(e.pointerId);
      st.dataset.drag = "0";
      // A drag is not a click. Only a still pointer selects.
      if (moved < 6) {
        const el = (e.target as Element | null)?.closest?.("[data-node]");
        const name = el?.getAttribute("data-node");
        if (name) setSel((s) => (s === name ? null : name));
        else if (e.target === st || (e.target as Element)?.tagName === "svg") setSel(null);
      }
    };

    const start = () => { st.dataset.drag = "1"; };

    st.addEventListener("pointerdown", down);
    st.addEventListener("pointerdown", start);
    st.addEventListener("pointermove", move);
    st.addEventListener("pointerup", up);
    st.addEventListener("pointercancel", up);
    return () => {
      st.removeEventListener("pointerdown", down);
      st.removeEventListener("pointerdown", start);
      st.removeEventListener("pointermove", move);
      st.removeEventListener("pointerup", up);
      st.removeEventListener("pointercancel", up);
    };
  }, [paint, zoomAt]);

  /* ------------------------------------------------------------- keyboard */

  const onKey = (e: React.KeyboardEvent) => {
    const step = 90;
    if (e.key === "+" || e.key === "=") { e.preventDefault(); zoomAt(1.22); }
    else if (e.key === "-" || e.key === "_") { e.preventDefault(); zoomAt(1 / 1.22); }
    else if (e.key === "0") { e.preventDefault(); fit(); }
    else if (e.key === "Escape") { setSel(null); }
    else if (e.key.startsWith("Arrow")) {
      e.preventDefault();
      cancelAnimationFrame(anim.current);
      if (e.key === "ArrowUp") view.current.y += step;
      if (e.key === "ArrowDown") view.current.y -= step;
      if (e.key === "ArrowLeft") view.current.x += step;
      if (e.key === "ArrowRight") view.current.x -= step;
      paint();
    }
  };

  /* -------------------------------------------------------------- minimap */

  const miniTo = (e: React.PointerEvent<SVGSVGElement>) => {
    const st = stage.current;
    const svg = e.currentTarget;
    if (!st) return;
    const r = svg.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * data.w;
    const y = ((e.clientY - r.top) / r.height) * data.h;
    const k = view.current.k;
    cancelAnimationFrame(anim.current);
    view.current = { k, x: st.clientWidth / 2 - x * k, y: st.clientHeight / 2 - y * k };
    paint();
  };

  const pick = (name: string) => {
    setSel(name);
    centre(name);
  };

  /* ---------------------------------------------------------------- render */

  return (
    <div className="ne" data-sel={sel ? "1" : "0"} data-q={query ? "1" : "0"}>
      <header className="ne-bar">
        <div className="ne-bar-id">
          <h1 className="ne-h1">מודל הנתונים</h1>
          <p className="ne-sub">
            {nf.format(data.stats.tables)} טבלאות · {nf.format(data.stats.edges)} קשרים ממודלים ·{" "}
            {nf.format(data.stats.shared)} משותפות לשני המודולים
          </p>
        </div>

        <div className="ne-seg" role="group" aria-label="סינון לפי מודול">
          {(
            [
              ["all", `הכול · ${data.stats.tables}`],
              ["PM", `PM · ${data.stats.pm}`],
              ["PP-PI", `PP-PI · ${data.stats.pppi}`],
              ["shared", `משותפות · ${data.stats.shared}`],
            ] as [Filter, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="ne-seg-b"
              data-mod={id}
              style={id === "PM" || id === "PP-PI" ? ({ "--m": MOD_VAR[id] } as React.CSSProperties) : undefined}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {id === "PM" || id === "PP-PI" ? <i aria-hidden="true" /> : null}
              {id === "shared" ? <Layers size={12} strokeWidth={1.75} aria-hidden="true" /> : null}
              {label}
            </button>
          ))}
        </div>

        <div className="ne-zoom" role="group" aria-label="תצוגה">
          <button type="button" className="ne-ico" onClick={() => zoomAt(1 / 1.22)} aria-label="התרחק">
            <Minus size={15} strokeWidth={1.9} aria-hidden="true" />
          </button>
          <output className="ne-zoom-v nx-sap" aria-live="off">{zoom}%</output>
          <button type="button" className="ne-ico" onClick={() => zoomAt(1.22)} aria-label="התקרב">
            <Plus size={15} strokeWidth={1.9} aria-hidden="true" />
          </button>
          <button type="button" className="ne-ico" onClick={fit} aria-label="התאם למסך">
            <Maximize2 size={15} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ne-ico"
            onClick={() => sel && centre(sel, 1.15)}
            disabled={!sel}
            aria-label="מרכז את הטבלה הנבחרת"
          >
            <Crosshair size={15} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="ne-body">
        {/* ------------------------------------------------------- THE STAGE */}
        <div
          className="ne-stage"
          ref={stage}
          tabIndex={0}
          onKeyDown={onKey}
          role="application"
          aria-label="קנבס מודל הנתונים. גרירה להזזה, Ctrl וגלגלת לזום, מקשים + − 0, חצים להזזה"
        >
          <svg className="ne-canvas" role="img" aria-label={`תרשים ER של ${data.stats.tables} טבלאות SAP`}>
            <defs>
              <linearGradient id="ne-both" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--mod-pm)" />
                <stop offset="100%" stopColor="var(--mod-pppi)" />
              </linearGradient>
            </defs>

            <g ref={world}>
              {/* EDGES */}
              <g className="ne-edges">
                {data.edges.map((e) => {
                  const p = byName.get(e.p);
                  const c = byName.get(e.c);
                  const off = !p || !c || !visible(p) || !visible(c);
                  const on = focusSet.edges.has(e.i);
                  return (
                    <g
                      key={e.i}
                      className="ne-edge"
                      data-on={on ? "1" : "0"}
                      data-off={off ? "1" : "0"}
                      data-kind={e.k}
                      style={{ "--r": REL_VAR[e.k] } as React.CSSProperties}
                    >
                      <path className="ne-edge-p" d={`M${e.x1} ${e.y1} Q${e.cx} ${e.cy} ${e.x2} ${e.y2}`} />
                      {/* Crow's-foot substitute: a solid cap on the PARENT end
                          (the primary key) and an open cap on the CHILD end
                          (the foreign key). Direction is readable without a
                          legend and without an arrowhead thicket. */}
                      <circle className="ne-cap ne-cap--pk" cx={e.x1} cy={e.y1} r={3.4} />
                      <circle className="ne-cap ne-cap--fk" cx={e.x2} cy={e.y2} r={3.4} />
                      {on ? (
                        <circle
                          className="ne-pulse"
                          cx={e.x1}
                          cy={e.y1}
                          r={3}
                          style={{ "--dx": `${e.x2 - e.x1}px`, "--dy": `${e.y2 - e.y1}px` } as React.CSSProperties}
                        />
                      ) : null}
                      <text className="ne-edge-t" x={e.cx} y={e.cy - 7} textAnchor="middle">
                        {e.cd || "?"}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* NODES */}
              <g className="ne-nodes">
                {data.nodes.map((n) => {
                  const off = !visible(n);
                  const on = sel === n.n;
                  const near = focusSet.near.has(n.n);
                  const hit = query ? hitSet.has(n.n) : false;
                  return (
                    <g
                      key={n.n}
                      className="ne-node"
                      data-node={n.n}
                      data-on={on ? "1" : "0"}
                      data-near={near ? "1" : "0"}
                      data-off={off ? "1" : "0"}
                      data-hit={hit ? "1" : "0"}
                      transform={`translate(${n.x} ${n.y})`}
                      style={
                        {
                          "--m": n.b === 1 ? "url(#ne-both)" : MOD_VAR[n.m[0]],
                          "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]],
                          "--o": n.o,
                        } as React.CSSProperties
                      }
                    >
                      <title>{`${n.n} — ${n.he}`}</title>
                      <rect className="ne-node-r" x={-n.w / 2} y={-n.h / 2} width={n.w} height={n.h} rx={9} />
                      <rect className="ne-node-cls" x={-n.w / 2 + 7} y={-9} width={4} height={18} rx={2} />
                      <text className="ne-node-n" x={-n.w / 2 + 18} y={-2}>{n.n}</text>
                      <text className="ne-node-k" x={-n.w / 2 + 18} y={14}>
                        {n.pk.length ? `PK ${n.pk[0]}${n.pk.length > 1 ? ` +${n.pk.length - 1}` : ""}` : `${n.f} שדות`}
                      </text>
                      <text className="ne-node-d" x={n.w / 2 - 9} y={-2} textAnchor="end">{n.d}</text>
                    </g>
                  );
                })}
              </g>
            </g>
          </svg>

          {/* MINIMAP */}
          <div className="ne-mini">
            <svg
              viewBox={`0 0 ${data.w} ${data.h}`}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="מפה מוקטנת של המודל"
              onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); miniTo(e); }}
              onPointerMove={(e) => { if (e.buttons) miniTo(e); }}
            >
              {data.edges.map((e) => (
                <line key={e.i} className="ne-mini-e" x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
              ))}
              {data.nodes.map((n) => (
                <rect
                  key={n.n}
                  className="ne-mini-n"
                  data-on={sel === n.n ? "1" : "0"}
                  data-off={visible(n) ? "0" : "1"}
                  x={n.x - n.w / 2}
                  y={n.y - n.h / 2}
                  width={n.w}
                  height={n.h}
                  style={{ "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]] } as React.CSSProperties}
                />
              ))}
              <rect ref={miniBox} className="ne-mini-v" x={0} y={0} width={10} height={10} />
            </svg>
          </div>

          <p className="ne-hint">
            <kbd>Ctrl</kbd> + גלגלת לזום · גרירה להזזה · <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd>
          </p>
        </div>

        {/* --------------------------------------------------- THE INSPECTOR */}
        <aside className="ne-insp" aria-label="פרטי הטבלה">
          <div className="ne-find">
            <label className="ne-search">
              <Search size={14} strokeWidth={1.75} aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(ev) => setQ(ev.target.value)}
                placeholder="חפש טבלה או תיאור"
                aria-label="חיפוש טבלה"
              />
              {q ? (
                <button type="button" className="ne-clear" onClick={() => setQ("")} aria-label="נקה חיפוש">
                  <X size={13} strokeWidth={2} aria-hidden="true" />
                </button>
              ) : null}
            </label>
            <p className="ne-find-n">{nf.format(hits.length)} טבלאות ברשימה</p>
            <ul className="ne-list">
              {hits.slice(0, 140).map((n) => (
                <li key={n.n}>
                  <button
                    type="button"
                    className="ne-list-b"
                    aria-pressed={sel === n.n}
                    style={{ "--ms": n.b === 1 ? "var(--mod-pm)" : MOD_VAR[n.m[0]], "--o": n.o } as React.CSSProperties}
                    onClick={() => pick(n.n)}
                  >
                    <i className="ne-list-bar" aria-hidden="true" />
                    <b className="nx-sap">{n.n}</b>
                    <em>{n.he || "—"}</em>
                    <span className="nx-sap">{n.d}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="ne-detail" aria-live="polite">
            {active ? (
              <>
                <header className="ne-det-h" style={{ "--o": active.o } as React.CSSProperties}>
                  <i aria-hidden="true" />
                  <b className="nx-sap">{active.n}</b>
                  <Link className="ne-open" href={`/neo/object/${active.n}/`} prefetch={false}>
                    עמוד האובייקט
                    <ArrowUpLeft size={13} strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                  <p>{active.he || "המילון אינו מחזיק תיאור עברי."}</p>
                </header>

                <ul className="ne-det-mods">
                  {active.m.map((m) => (
                    <li key={m} style={{ "--m": MOD_VAR[m] } as React.CSSProperties}>
                      <i aria-hidden="true" />
                      <b>{MOD_HE[m]}</b>
                      <em>{active.tp.filter((t) => t.m === m).map((t) => t.t).join(" · ") || "—"}</em>
                    </li>
                  ))}
                  <li className="ne-det-cls" style={{ "--o": active.o } as React.CSSProperties}>
                    <span aria-hidden="true" />
                    {active.z}
                  </li>
                </ul>

                <div className="ne-keys">
                  <div>
                    <h3>מפתח ראשי</h3>
                    {active.pk.length ? (
                      <ul className="ne-chips">
                        {active.pk.map((f) => (
                          <li key={f} className="nx-sap" data-k="PK">{f}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="ne-none">המילון אינו מסמן מפתח ראשי לטבלה הזו.</p>
                    )}
                  </div>
                  <div>
                    <h3>מפתחות זרים</h3>
                    {active.fk.length ? (
                      <ul className="ne-chips">
                        {active.fk.map((f) => (
                          <li key={f} className="nx-sap" data-k="FK">{f}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="ne-none">המילון אינו מסמן מפתח זר לטבלה הזו.</p>
                    )}
                  </div>
                </div>

                {active.tc.length ? (
                  <div className="ne-blk">
                    <h3>טרנזקציות</h3>
                    <ul className="ne-chips">
                      {active.tc.map((c) => (
                        <li key={c} className="nx-sap">{c}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="ne-blk">
                  <h3>{activeEdges.length} קשרים · ניסוח ה־JOIN כפי שנכתב</h3>
                  {activeEdges.length ? (
                    <ul className="ne-joins">
                      {activeEdges.map((e: ErdPayloadEdge) => {
                        const other = e.p === active.n ? e.c : e.p;
                        const isParent = e.p === active.n;
                        return (
                          <li key={e.i} style={{ "--r": REL_VAR[e.k] } as React.CSSProperties}>
                            <div className="ne-join-h">
                              <span className="ne-dir">{isParent ? "בן" : "אב"}</span>
                              <button type="button" className="ne-join-go nx-sap" onClick={() => pick(other)}>
                                {other}
                              </button>
                              <span className="ne-card">
                                <i aria-hidden="true" />
                                {e.cd || REL_HE[e.k]}
                              </span>
                              {e.ct ? <span className="ne-ct">כיוון שנוי במחלוקת</span> : null}
                            </div>
                            {e.j.map((j, i) => (
                              <div className="ne-join-s" key={i} style={{ "--m": MOD_VAR[j.m] } as React.CSSProperties}>
                                <span className="ne-join-m">
                                  <i aria-hidden="true" />
                                  {j.m}
                                </span>
                                {j.j ? <code>{j.j}</code> : <span className="ne-none">אין ניסוח JOIN במילון</span>}
                                {j.pk || j.fk ? (
                                  <span className="ne-join-k">
                                    {j.pk ? <em>PK <b className="nx-sap">{j.pk}</b></em> : null}
                                    {j.fk ? <em>FK <b className="nx-sap">{j.fk}</b></em> : null}
                                  </span>
                                ) : null}
                                {j.d ? <span className="ne-join-d">{j.d}</span> : null}
                              </div>
                            ))}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="ne-none">
                      המילון אינו מחזיק קשר ER ממודל לטבלה הזו. היא מתועדת, אך היא עומדת לבדה בתרשים.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="ne-idle">
                <h2>
                  <Focus size={15} strokeWidth={1.75} aria-hidden="true" />
                  בחר טבלה בתרשים
                </h2>
                <p>
                  לחיצה על טבלה מדגישה את הקשרים שלה ומציגה כאן את המפתחות ואת ניסוח ה־JOIN
                  המדויק כפי שהתכנון המקורי כתב אותו.
                </p>
                <dl className="ne-facts">
                  <div><dt>טבלאות</dt><dd className="nx-sap">{nf.format(data.stats.tables)}</dd></div>
                  <div><dt>רשומות מילון</dt><dd className="nx-sap">{nf.format(data.stats.rows)}</dd></div>
                  <div><dt>קשרים ממודלים</dt><dd className="nx-sap">{nf.format(data.stats.edges)}</dd></div>
                  <div><dt>עוצמה מצוינת</dt><dd className="nx-sap">{nf.format(data.stats.stated)}</dd></div>
                  <div><dt>ללא עוצמה</dt><dd className="nx-sap">{nf.format(data.stats.unstated)}</dd></div>
                  <div><dt>ללא קשר ממודל</dt><dd className="nx-sap">{nf.format(data.stats.isolated)}</dd></div>
                  <div><dt>כיוון שנוי במחלוקת</dt><dd className="nx-sap">{nf.format(data.stats.contested)}</dd></div>
                </dl>
                <ul className="ne-legend">
                  {(["1-1", "n-1", "unstated"] as const).map((k) => (
                    <li key={k} data-kind={k} style={{ "--r": REL_VAR[k] } as React.CSSProperties}>
                      <i aria-hidden="true" />
                      {k === "unstated" ? "קשר שנרשם ללא עוצמה" : REL_HE[k]}
                    </li>
                  ))}
                  <li className="ne-legend-k"><span className="ne-lg-pk" aria-hidden="true" />קצה מלא · צד המפתח הראשי</li>
                  <li className="ne-legend-k"><span className="ne-lg-fk" aria-hidden="true" />קצה חלול · צד המפתח הזר</li>
                </ul>
                <p className="ne-note">
                  {nf.format(data.stats.unstated)} מתוך {nf.format(data.stats.edges)} הקשרים נרשמו בתכנון
                  בלי עוצמה. הם מצוירים מקווקו ומסומנים ככאלה — לא הושלמה להם עוצמה שלא נכתבה.
                  {data.stats.contested
                    ? ` בנוסף, ${nf.format(data.stats.contested)} זוגות טבלאות נרשמו בשני הכיוונים: שני התכנונים חלוקים על צד המפתח הראשי, ושתי הרשומות נשמרות.`
                    : ""}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <p className="ne-credit">Project NEO · CBC Israel — פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}
