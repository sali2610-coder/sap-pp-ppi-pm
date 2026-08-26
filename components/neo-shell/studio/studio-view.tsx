"use client";

/* ============================================================================
   PROJECT NEO · ARCHITECTURE STUDIO
   ----------------------------------------------------------------------------
   WHAT WAS INHERITED, AND WHY NOTHING WAS RE-DERIVED

     lib/studio-graph.ts is the old Studio's real value and it is reused whole.
     It is the only graph in this product that is HETEROGENEOUS — tables plus
     transactions, BAPIs, function modules, IDocs, CDS views and Fiori apps —
     which is exactly what separates Studio from the ERD, where the ERD is
     tables and their relations only. It also carries the swimlane layout, the
     eight business zones, the nine view modes and the S/4 verdict colours.

     So this file is a WORKSPACE over an existing capability layer. It does not
     re-derive a single relationship, zone or verdict.

   WHY THE OLD SCREEN STILL NEEDED REPLACING

     The capability was sound; the surface was a 861-line component carrying its
     own chrome, its own colours and its own control language. Inside NEO it
     read as a different product. This keeps the graph and rebuilds the room
     around it in NEO's system.

   THE THREE THINGS A GRAPH WORKSPACE HAS TO GET RIGHT

     1. The canvas gets the space. Chrome collapses; the graph does not.
     2. Selection is legible from the graph alone — the selected node rings,
        its neighbours stay full strength, everything else dims but REMAINS
        VISIBLE. Dropping unrelated nodes destroys the reader's map.
     3. Every control does something. A control that renders but does nothing
        is worse than an absent one, because it costs a click to learn that.

   MOTION IS PRECISION-LEVEL

     Camera moves and dim transitions only. No parallax, no scene choreography,
     no decorative particles. This is a working surface, and the brief's motion
     hierarchy puts it at the quiet end.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Crosshair, Expand, Filter, Maximize2, Minus, Plus, RotateCcw, Search, X,
} from "lucide-react";
import {
  KIND_META, MODES, S4_COLOR, ZONES, buildHetero, layoutSubset, layoutZoned,
  nodeTier, zoneOf, type LEdge, type LNode, type SKind, type SNode,
} from "@/lib/studio-graph";

type Mod = "PM" | "PP-PI";
const MODULES: Mod[] = ["PM", "PP-PI"];

const S4_HE: Record<string, string> = { kept: "ללא שינוי", replaced: "מוחלפת", removed: "הוסרה" };

export function StudioView() {
  const [mod, setMod] = useState<Mod>("PM");
  const [modeId, setModeId] = useState("tables");
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [zones, setZones] = useState<Set<string>>(new Set());
  const [full, setFull] = useState(false);

  /* Camera. Kept in state rather than in the DOM so reset and fit are one
     assignment, and so the transition is declarative. */
  const [cam, setCam] = useState({ x: 0, y: 0, k: 1 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  /* Read by the resize observer. A ref, not the state value, so the observer is
     not torn down and rebuilt on every selection. */
  const selRef = useRef<string | null>(null);
  /* Current layout, for the observer — same reason as selRef. */
  const laidRef = useRef<LNode[]>([]);

  useEffect(() => { selRef.current = sel; }, [sel]);

  const mode = MODES.find((m) => m.id === modeId) ?? MODES[0];
  const hetero = useMemo(() => buildHetero(mod as never), [mod]);

  /* Which nodes this mode is allowed to show. "full" modes lay every table out
     in its zone; "expand" modes start from the tables and pull in the related
     objects of the kinds the mode declares. */
  const visible = useMemo(() => {
    const kinds = new Set<SKind>(mode.kinds);
    const out = new Set<string>();
    for (const [id, n] of hetero.nodes) {
      if (!kinds.has(n.kind)) continue;
      if (mode.master && n.kind === "table" && zoneOf(id) !== "master") continue;
      if (zones.size && n.kind === "table" && !zones.has(zoneOf(id))) continue;
      out.add(id);
    }
    return out;
  }, [hetero, mode, zones]);

  const laid = useMemo(() => {
    if (!visible.size) return { nodes: [] as LNode[], edges: [] as LEdge[], bands: [], width: 0, height: 0 };
    return mode.behavior === "full"
      ? layoutZoned(visible, hetero)
      : { ...layoutSubset(visible, hetero), bands: [] as never[] };
  }, [visible, hetero, mode.behavior]);

  useEffect(() => { laidRef.current = laid.nodes; }, [laid.nodes]);

  /* Neighbours of the selection, for the dim/keep decision. */
  const near = useMemo(() => {
    if (!sel) return null;
    const s = new Set<string>([sel]);
    hetero.adj.get(sel)?.forEach((n) => s.add(n));
    return s;
  }, [sel, hetero]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    return laid.nodes
      .filter((n) => n.id.toLowerCase().includes(t) || (n.he || "").toLowerCase().includes(t))
      .slice(0, 8);
  }, [q, laid.nodes]);

  /* ---------------------------------------------------------- camera ops */

  const fit = useCallback(() => {
    const el = wrapRef.current;
    if (!el || !laid.nodes.length) return;
    /* MEASURE THE NODES, DO NOT TRUST laid.width.
       The layout's reported width is the column extent, which excludes the
       width of whatever sits in the last column — so "fit to screen" left the
       right-most nodes outside the canvas. Measured: 10 of 56 still off-screen
       after a fit. The true extent is the union of the node boxes. */
    let maxX = 0, maxY = 0;
    for (const n of laid.nodes) {
      if (n.x + n.w > maxX) maxX = n.x + n.w;
      if (n.y + n.h > maxY) maxY = n.y + n.h;
    }
    if (!maxX || !maxY) return;
    const PAD = 48;
    const k = Math.min((el.clientWidth - PAD) / maxX, (el.clientHeight - PAD) / maxY, 1.4);
    setCam({ k, x: (el.clientWidth - maxX * k) / 2, y: (el.clientHeight - maxY * k) / 2 });
  }, [laid.nodes]);

  const centerOn = useCallback((id: string) => {
    const el = wrapRef.current;
    const n = laid.nodes.find((x) => x.id === id);
    if (!el || !n) return;
    const k = Math.max(cam.k, 0.9);
    setCam({ k, x: el.clientWidth / 2 - (n.x + n.w / 2) * k, y: el.clientHeight / 2 - (n.y + n.h / 2) * k });
  }, [laid.nodes, cam.k]);

  const zoom = useCallback((f: number) => {
    const el = wrapRef.current;
    if (!el) return;
    setCam((c) => {
      const k = Math.min(2.4, Math.max(0.18, c.k * f));
      /* Zoom about the viewport centre, not the origin — otherwise the graph
         slides away from under the reader on every press. */
      const cx = el.clientWidth / 2, cy = el.clientHeight / 2;
      return { k, x: cx - ((cx - c.x) / c.k) * k, y: cy - ((cy - c.y) / c.k) * k };
    });
  }, []);

  /* Fit once the layout for a new module/mode exists. */
  useEffect(() => { const t = setTimeout(fit, 40); return () => clearTimeout(t); }, [fit, modeId, mod]);

  /* THE CANVAS RESIZES UNDER THE CAMERA, AND THE CAMERA HAS TO ANSWER.
     Selecting a node opens the context panel, which takes width from the
     canvas — measured 924px -> 652px — and the camera kept its old transform,
     so 15 of 56 nodes fell outside the viewport at the exact moment the reader
     selected something. One observer covers all three causes of a resize:
     the panel opening or closing, the window changing, and fullscreen. When
     something is selected we keep IT centred; otherwise we re-fit. */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let raf = 0;
    /* ONLY ACT ON A REAL SIZE CHANGE.
       ResizeObserver fires on its first observation and can fire again for
       sub-pixel reasons. Without this guard it re-ran fit()/recentre on every
       tick and overwrote the camera the reader had just set — measured as zoom
       and pan appearing completely frozen. */
    let lastW = el.clientWidth, lastH = el.clientHeight;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      if (Math.abs(w - lastW) < 2 && Math.abs(h - lastH) < 2) return;
      lastW = w; lastH = h;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        /* Preserve the reader's zoom. centerOn() deliberately zooms IN to at
           least 0.9 because it answers an explicit "focus this" — using it here
           would mean merely selecting a node silently magnified the graph. A
           resize should move the camera, not change its scale. */
        const id = selRef.current;
        if (!id) { fit(); return; }
        const el = wrapRef.current;
        const n = laidRef.current.find((x) => x.id === id);
        if (!el || !n) { fit(); return; }
        setCam((c) => ({
          k: c.k,
          x: el.clientWidth / 2 - (n.x + n.w / 2) * c.k,
          y: el.clientHeight / 2 - (n.y + n.h / 2) * c.k,
        }));
      });
    });
    ro.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [fit, centerOn]);

  const pick = useCallback((id: string) => { setSel(id); centerOn(id); }, [centerOn]);

  /* Fullscreen through the real API so the browser chrome behaves. */
  const toggleFull = useCallback(async () => {
    const el = wrapRef.current?.closest(".nst") as HTMLElement | null;
    if (!el) return;
    try {
      if (document.fullscreenElement) { await document.exitFullscreen(); }
      else { await el.requestFullscreen(); }
    } catch { /* denied by the browser: the layout flag below still applies */ }
    setFull((v) => !v);
  }, []);
  useEffect(() => {
    const on = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", on);
    return () => document.removeEventListener("fullscreenchange", on);
  }, []);

  const selNode: SNode | null = sel ? hetero.nodes.get(sel) ?? null : null;
  const selNeighbours = useMemo(() => {
    if (!sel) return [];
    return [...(hetero.adj.get(sel) ?? [])]
      .map((id) => hetero.nodes.get(id))
      .filter((n): n is SNode => !!n)
      .sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
  }, [sel, hetero]);

  const colorOf = (n: LNode) =>
    mode.colorBy === "s4" && n.s4 ? S4_COLOR[n.s4] : KIND_META[n.kind].c;

  return (
    <div className="nst" data-full={full ? "1" : "0"}>
      {/* ------------------------------------------------------------ top */}
      <header className="nst-top">
        <div className="nst-brand">
          <h1 className="nst-h1">Architecture Studio</h1>
          <p className="nst-sub">{laid.nodes.length} אובייקטים · {laid.edges.length} קשרים</p>
        </div>

        <div className="nst-search">
          <Search size={14} strokeWidth={2} aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חפש טבלה, טרנזקציה או אובייקט"
            aria-label="חיפוש בגרף"
          />
          {q ? <button type="button" className="nst-x" aria-label="נקה חיפוש" onClick={() => setQ("")}><X size={13} /></button> : null}
          {results.length ? (
            <ul className="nst-res" role="listbox">
              {results.map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => { pick(r.id); setQ(""); }}>
                    <b className="nx-sap" dir="ltr">{r.id}</b>
                    <span>{r.he}</span>
                    <i style={{ background: KIND_META[r.kind].c }} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Controls are GROUPED, not laid out as one long row of identical
            buttons — the specific complaint about the old screens. */}
        <div className="nst-tools">
          <span className="nst-grp" role="group" aria-label="תצוגה">
            <button type="button" onClick={fit} title="התאם למסך"><Expand size={15} /></button>
            <button type="button" onClick={() => { setCam({ x: 0, y: 0, k: 1 }); setSel(null); setZones(new Set()); }} title="אפס"><RotateCcw size={15} /></button>
            <button type="button" onClick={toggleFull} title={full ? "צא ממסך מלא" : "מסך מלא"}><Maximize2 size={15} /></button>
          </span>
          <span className="nst-grp" role="group" aria-label="זום">
            <button type="button" onClick={() => zoom(1 / 1.25)} title="התרחק"><Minus size={15} /></button>
            <b className="nst-k">{Math.round(cam.k * 100)}%</b>
            <button type="button" onClick={() => zoom(1.25)} title="התקרב"><Plus size={15} /></button>
          </span>
          <span className="nst-grp" role="group" aria-label="ניווט">
            <button type="button" onClick={() => sel && centerOn(sel)} disabled={!sel} title="מרכז את הנבחר"><Crosshair size={15} /></button>
          </span>
        </div>
      </header>

      <div className="nst-body">
        {/* ---------------------------------------------------------- side */}
        <aside className="nst-side" aria-label="תצוגות ומסננים">
          <div className="nst-mods">
            {MODULES.map((m) => (
              <button key={m} type="button" className="nst-mod" data-on={mod === m ? "1" : "0"}
                onClick={() => { setMod(m); setSel(null); }}>{m}</button>
            ))}
          </div>

          <h2 className="nst-side-h">תצוגה</h2>
          <ul className="nst-modes">
            {MODES.map((m) => (
              <li key={m.id}>
                <button type="button" className="nst-mode" data-on={modeId === m.id ? "1" : "0"}
                  onClick={() => { setModeId(m.id); setSel(null); }}>
                  {m.he}
                </button>
              </li>
            ))}
          </ul>

          <h2 className="nst-side-h"><Filter size={12} aria-hidden="true" />אזורים</h2>
          <ul className="nst-zones">
            {ZONES.map((z) => {
              const on = zones.has(z.id);
              return (
                <li key={z.id}>
                  <button type="button" className="nst-zone" data-on={on ? "1" : "0"}
                    aria-pressed={on}
                    onClick={() => setZones((s) => {
                      const n = new Set(s); n.has(z.id) ? n.delete(z.id) : n.add(z.id); return n;
                    })}>
                    <i style={{ background: z.c }} aria-hidden="true" />{z.he}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* -------------------------------------------------------- canvas */}
        <div
          className="nst-canvas"
          ref={wrapRef}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest(".nst-node")) return;
            drag.current = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y };
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current; if (!d) return;
            setCam((c) => ({ ...c, x: d.cx + (e.clientX - d.x), y: d.cy + (e.clientY - d.y) }));
          }}
          onPointerUp={() => { drag.current = null; }}
          onWheel={(e) => { if (e.ctrlKey || e.metaKey) { e.preventDefault(); zoom(e.deltaY < 0 ? 1.1 : 1 / 1.1); } }}
        >
          <div className="nst-stage" style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})` }}>
            <svg className="nst-edges" width={laid.width || 1} height={laid.height || 1} aria-hidden="true">
              {laid.edges.map((e) => {
                const lit = !near || (near.has(e.from) && near.has(e.to));
                return (
                  <polyline
                    key={e.id}
                    className="nst-edge"
                    data-lit={lit ? "1" : "0"}
                    points={e.points.map((p) => `${p.x},${p.y}`).join(" ")}
                  />
                );
              })}
            </svg>

            {laid.nodes.map((n) => {
              const on = sel === n.id;
              /* Unrelated nodes DIM. They never disappear — losing them would
                 destroy the reader's sense of where they are. */
              const dim = near ? !near.has(n.id) : false;
              return (
                <button
                  key={n.id}
                  type="button"
                  className="nst-node"
                  data-on={on ? "1" : "0"}
                  data-dim={dim ? "1" : "0"}
                  data-tier={nodeTier(n, hetero)}
                  style={{
                    left: n.x, top: n.y, width: n.w, height: n.h,
                    "--c": colorOf(n),
                  } as React.CSSProperties}
                  onClick={() => setSel(on ? null : n.id)}
                  onDoubleClick={() => pick(n.id)}
                  aria-pressed={on}
                >
                  <b className="nx-sap" dir="ltr">{n.label}</b>
                  <span>{n.he}</span>
                  {n.s4 ? <i className="nst-s4" style={{ background: S4_COLOR[n.s4] }} aria-hidden="true" /> : null}
                </button>
              );
            })}
          </div>

          {!laid.nodes.length ? (
            <p className="nst-empty">אין אובייקטים בתצוגה הזאת עם המסננים שנבחרו.</p>
          ) : null}
        </div>

        {/* ------------------------------------------------------- context */}
        {selNode ? (
          <aside className="nst-ctx" aria-label="פרטי האובייקט הנבחר">
            <header>
              <span className="nst-kind" style={{ background: KIND_META[selNode.kind].c }}>{KIND_META[selNode.kind].he}</span>
              <button type="button" className="nst-x" aria-label="סגור" onClick={() => setSel(null)}><X size={14} /></button>
            </header>
            <h2 className="nst-ctx-id nx-sap" dir="ltr">{selNode.id}</h2>
            <p className="nst-ctx-he">{selNode.he}</p>

            {selNode.s4 ? (
              <p className="nst-ctx-s4" style={{ "--s4": S4_COLOR[selNode.s4] } as React.CSSProperties}>
                <i aria-hidden="true" />
                <b>S/4HANA</b> {S4_HE[selNode.s4]}
              </p>
            ) : (
              <p className="nst-ctx-none">לא תועדה הכרעת מעבר לאובייקט הזה.</p>
            )}

            <h3 className="nst-ctx-h">קשרים · {selNeighbours.length}</h3>
            <ul className="nst-rel">
              {selNeighbours.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => pick(n.id)}>
                    <i style={{ background: KIND_META[n.kind].c }} aria-hidden="true" />
                    <b className="nx-sap" dir="ltr">{n.id}</b>
                    <span>{n.he}</span>
                  </button>
                </li>
              ))}
              {!selNeighbours.length ? <li className="nst-ctx-none">אין קשרים בתצוגה הזאת.</li> : null}
            </ul>
          </aside>
        ) : null}
      </div>

      {/* legend — colours mean something, so they are stated */}
      <footer className="nst-legend">
        {(mode.colorBy === "s4"
          ? Object.entries(S4_COLOR).map(([k, c]) => ({ c, he: S4_HE[k] }))
          : [...new Set(laid.nodes.map((n) => n.kind))].map((k) => ({ c: KIND_META[k as SKind].c, he: KIND_META[k as SKind].he }))
        ).map((x) => (
          <span key={x.he}><i style={{ background: x.c }} aria-hidden="true" />{x.he}</span>
        ))}
      </footer>
    </div>
  );
}
