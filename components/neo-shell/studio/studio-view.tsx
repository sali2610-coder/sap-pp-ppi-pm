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
import Link from "next/link";
import { useShellFocus } from "../focus";
import {
  ArrowRightLeft, Ban, Braces, Cable, Check, CircleHelp, Crosshair, Diff, Expand, Filter, LayoutGrid, Maximize2, Minus, Plug,
  Plus, Presentation, RotateCcw, Search, Sigma, Table, Terminal, X, Focus, type LucideIcon,
} from "lucide-react";
import { modVar } from "../mod-var";
import { S4_DOT, S4_HE, S4_ORDER, S4_UNDECIDED_HE, type S4Class } from "@/lib/s4-class";
import {
  KIND_META, MODES, ZONES, buildHetero, layoutSubset, layoutZoned,
  nodeTier, zoneOf, type LEdge, type LNode, type SKind, type SNode,
} from "@/lib/studio-graph";

type Mod = "PM" | "PP-PI";
const MODULES: Mod[] = ["PM", "PP-PI"];


/* OBJECT KIND IS A GLYPH, NOT A COLOUR (2026-10). The kind palette in
   lib/studio-graph is shared with the home page and the module map and is not
   touched; this surface simply stops painting it, so seven kinds and eight
   zones no longer compete as hues. The glyphs are the rail's own for the same
   catalogs. The S/4 verdict is the blueprint's own class (lib/s4-class.ts),
   in its own words, ללא שינוי / מותאם / הוחלף / הוסר, each with the glyph the
   status pill uses for that reading and the status token's colour; a table
   whose row decides nothing says "לא הוכרע במקור". */
const KIND_ICON: Record<SKind, LucideIcon> = {
  table: Table, tcode: Terminal, bapi: Plug, fm: Braces, idoc: Cable, cds: Sigma, fiori: LayoutGrid,
};
const S4_ICON: Record<S4Class, LucideIcon> = { 0: Check, 1: Diff, 2: ArrowRightLeft, 3: Ban };
const s4Word = (k: S4Class | undefined) => (k === undefined ? S4_UNDECIDED_HE : S4_HE[k]);

function KindGlyph({ kind, size = 12 }: { kind: SKind; size?: number }) {
  const I = KIND_ICON[kind];
  return <I size={size} strokeWidth={2} aria-hidden="true" className="nst-kg" />;
}
function S4Glyph({ k, size = 12 }: { k: S4Class | undefined; size?: number }) {
  if (k === undefined) return <CircleHelp size={size} strokeWidth={2.2} aria-hidden="true" className="nst-s4g" style={{ color: "var(--status-not-started)" }} />;
  const I = S4_ICON[k];
  return <I size={size} strokeWidth={2.4} aria-hidden="true" className="nst-s4g" style={{ color: S4_DOT[k] }} />;
}

/** The first layer of a module: the first zone (in ZONES order) that has at
 *  least one table in the module's graph. The studio opens on it (design
 *  audit S7-STU-1) instead of on every object at once. */
function firstZoneOf(module: Mod): Set<string> {
  const h = buildHetero(module as never);
  for (const z of ZONES) {
    for (const [id, n] of h.nodes) if (n.kind === "table" && zoneOf(id) === z.id) return new Set([z.id]);
  }
  return new Set();
}

export function StudioView() {
  const [mod, setMod] = useState<Mod>("PM");
  const [modeId, setModeId] = useState("tables");
  const [sel, setSel] = useState<string | null>(null);
  const [q, setQ] = useState("");
  /* A LAYERED START (design audit S7-STU-1). The studio used to open on all
     56 objects at 46%, where the labels were 10px. It now opens on ONE layer —
     the first zone that has objects in the module — and the reader widens to
     the next layer or to all of them with the controls below. The same zone
     filter the side panel already offers; only the starting value changed. */
  const [zones, setZones] = useState<Set<string>>(() => firstZoneOf("PM"));
  const [full, setFull] = useState(false);
  // Focus mode (design audit §3): shell hidden, the studio alone; Escape exits.
  const [shellFocus, setShellFocus] = useState(false);
  /* PRESENTATION MODE (design audit S6-3): focus + fullscreen + larger type
     (studio.css [data-present]). One switch; Esc or the same button ends it. */
  const [present, setPresent] = useState(false);
  const exitShellFocus = useCallback(() => { setShellFocus(false); setPresent(false); }, []);
  useShellFocus(shellFocus, exitShellFocus);

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
    /* The layouts place a node by its CENTRE (dagre's convention, and
       layoutZoned's), so a node's box is centre ± half its size. */
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of laid.nodes) {
      minX = Math.min(minX, n.x - n.w / 2); maxX = Math.max(maxX, n.x + n.w / 2);
      minY = Math.min(minY, n.y - n.h / 2); maxY = Math.max(maxY, n.y + n.h / 2);
    }
    const bw = maxX - minX, bh = maxY - minY;
    if (!(bw > 0) || !(bh > 0)) return;
    const PAD = 48;
    const raw = Math.min((el.clientWidth - PAD) / bw, (el.clientHeight - PAD) / bh, 1.4);
    // PRESENTATION (design audit S6-3): a fit never lands below 90%, so the
    // labels stay legible from across a room; the presenter pans to the rest.
    // Otherwise a fit never shrinks the smallest node below a 24px target
    // (WCAG 2.5.8): measured, a 390px canvas fitted 44px nodes to 15px. On a
    // narrow canvas the reader pans instead; wide screens fit above the floor.
    const floor = 24 / Math.min(...laid.nodes.map((n) => n.h));
    const k = present ? Math.max(raw, 0.9) : Math.max(raw, floor);
    setCam({ k, x: (el.clientWidth - bw * k) / 2 - minX * k, y: (el.clientHeight - bh * k) / 2 - minY * k });
  }, [laid.nodes, present]);

  const centerOn = useCallback((id: string) => {
    const el = wrapRef.current;
    const n = laid.nodes.find((x) => x.id === id);
    if (!el || !n) return;
    const k = Math.max(cam.k, 0.9);
    setCam({ k, x: el.clientWidth / 2 - n.x * k, y: el.clientHeight / 2 - n.y * k });
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
          x: el.clientWidth / 2 - n.x * c.k,
          y: el.clientHeight / 2 - n.y * c.k,
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
  const enterPresent = useCallback(() => {
    setPresent(true);
    setShellFocus(true);
    if (!document.fullscreenElement) void toggleFull();
  }, [toggleFull]);
  const exitPresent = useCallback(() => {
    setPresent(false);
    setShellFocus(false);
    if (document.fullscreenElement) void toggleFull();
  }, [toggleFull]);

  const selNode: SNode | null = sel ? hetero.nodes.get(sel) ?? null : null;
  const selNeighbours = useMemo(() => {
    if (!sel) return [];
    return [...(hetero.adj.get(sel) ?? [])]
      .map((id) => hetero.nodes.get(id))
      .filter((n): n is SNode => !!n)
      .sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
  }, [sel, hetero]);

  const s4Mode = mode.colorBy === "s4";
  /** Several kinds on stage: each node says which it is. */
  const mixed = mode.kinds.length > 1;

  /* The layer strip: which layer is on stage, how much of the module it is,
     and the two ways out — the next layer, or everything. Counted from the
     graph, never authored. */
  const zoneCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const [id, n] of hetero.nodes) if (n.kind === "table") { const z = zoneOf(id); m.set(z, (m.get(z) ?? 0) + 1); }
    return m;
  }, [hetero]);
  const layered = ZONES.filter((z) => (zoneCounts.get(z.id) ?? 0) > 0);
  const nextZone = layered.find((z) => !zones.has(z.id));
  const tablesTotal = [...zoneCounts.values()].reduce((a, b) => a + b, 0);
  const tablesShown = layered.filter((z) => !zones.size || zones.has(z.id)).reduce((a, z) => a + (zoneCounts.get(z.id) ?? 0), 0);

  return (
    <div className="nst" data-full={full ? "1" : "0"} data-present={present ? "1" : "0"}>
      {/* ------------------------------------------------------------ top */}
      <header className="nst-top">
        <div className="nst-brand">
          <h1 className="nst-h1">Architecture Studio</h1>
          <p className="nst-sub">{laid.nodes.length} אובייקטים · {laid.edges.length} קשרים</p>
          {/* WHAT THE STUDIO DOES THAT THE ERD DOES NOT (design audit S7-STU-1):
              one sentence, next to the title, so the two canvases are not
              taken for one another. */}
          <p className="nst-role">
            הסטודיו מסביר ארכיטקטורה בשכבות: אזורים, סוגי אובייקטים ומעמד S/4HANA.
            {" "}<Link href="/neo/erd/" prefetch={false}>מודל הנתונים (ERD)</Link> מראה את קשרי הטבלאות ומפתחותיהן.
          </p>
        </div>

        <div className="nst-search">
          <Search size={14} strokeWidth={2} aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="חיפוש טבלה, טרנזקציה או אובייקט"
            aria-label="חיפוש בגרף"
          />
          {q ? <button type="button" className="nst-x" aria-label="ניקוי החיפוש" onClick={() => setQ("")}><X size={13} /></button> : null}
          {results.length ? (
            <ul className="nst-res" role="listbox">
              {results.map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => { pick(r.id); setQ(""); }}>
                    <KindGlyph kind={r.kind} />
                    <b className="nx-sap" dir="ltr">{r.id}</b>
                    <span>{r.he}</span>
                    <em>{KIND_META[r.kind].he}</em>
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
            <button type="button" onClick={fit} title="התאמה למסך"><Expand size={15} /></button>
            <button type="button" onClick={() => { setCam({ x: 0, y: 0, k: 1 }); setSel(null); setZones(new Set()); }} title="איפוס"><RotateCcw size={15} /></button>
            <button type="button" onClick={present ? exitPresent : enterPresent} aria-pressed={present} aria-label={present ? "יציאה ממצב הצגה" : "מצב הצגה: מסך מלא וטקסט גדול, לחדר ישיבות"} title={present ? "יציאה ממצב הצגה · Esc" : "מצב הצגה"}><Presentation size={15} /></button>
            <button type="button" onClick={toggleFull} title={full ? "יציאה ממסך מלא" : "מסך מלא"}><Maximize2 size={15} /></button>
            <button type="button" onClick={() => setShellFocus((v) => !v)} aria-pressed={shellFocus} title={shellFocus ? "יציאה ממצב מיקוד · Esc" : "מצב מיקוד"}><Focus size={15} /></button>
          </span>
          <span className="nst-grp" role="group" aria-label="זום">
            <button type="button" onClick={() => zoom(1 / 1.25)} title="הקטנה"><Minus size={15} /></button>
            <b className="nst-k">{Math.round(cam.k * 100)}%</b>
            <button type="button" onClick={() => zoom(1.25)} title="הגדלה"><Plus size={15} /></button>
          </span>
          <span className="nst-grp" role="group" aria-label="ניווט">
            <button type="button" onClick={() => sel && centerOn(sel)} disabled={!sel} title="מיקוד באובייקט הנבחר"><Crosshair size={15} /></button>
          </span>
        </div>
      </header>

      {/* THE LAYER STRIP (design audit S7-STU-1): the studio opens on one
          layer and discloses the rest step by step. */}
      <div className="nst-layer" role="group" aria-label="שכבת התצוגה">
        <span className="nst-layer-t">
          {zones.size
            ? <>שכבה: <b>{layered.filter((z) => zones.has(z.id)).map((z) => z.he).join(" · ") || "—"}</b></>
            : <>כל השכבות</>}
          <em className="nst-layer-n">{tablesShown} מתוך {tablesTotal} טבלאות המודול</em>
        </span>
        {nextZone && zones.size ? (
          <button type="button" className="nu-btn2" onClick={() => setZones((s) => new Set([...s, nextZone.id]))}>
            הוספת השכבה הבאה · {nextZone.he} ({zoneCounts.get(nextZone.id)})
          </button>
        ) : null}
        {zones.size ? (
          <button type="button" className="nu-ghost" onClick={() => setZones(new Set())}>הצגת כל השכבות</button>
        ) : (
          <button type="button" className="nu-ghost" onClick={() => setZones(firstZoneOf(mod))}>חזרה לשכבה הראשונה</button>
        )}
      </div>

      <div className="nst-body">
        {/* ---------------------------------------------------------- side */}
        {shellFocus ? (
          <button type="button" className="nu-btn nx-focus-exit" onClick={exitShellFocus}><Focus size={14} /> יציאה ממצב מיקוד</button>
        ) : null}
        <aside className="nst-side" aria-label="תצוגות ומסננים">
          <div className="nst-mods">
            {MODULES.map((m) => (
              <button key={m} type="button" className="nst-mod" data-on={mod === m ? "1" : "0"} aria-pressed={mod === m}
                style={{ "--m": modVar(m) } as React.CSSProperties}
                onClick={() => { setMod(m); setSel(null); setZones(firstZoneOf(m)); }}>{m}</button>
            ))}
          </div>

          <h2 className="nst-side-h">תצוגה</h2>
          <ul className="nst-modes">
            {MODES.map((m) => (
              <li key={m.id}>
                <button type="button" className="nst-mode" data-on={modeId === m.id ? "1" : "0"} aria-pressed={modeId === m.id}
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
              const n = zoneCounts.get(z.id) ?? 0;
              return (
                <li key={z.id}>
                  <button type="button" className="nst-zone" data-on={on ? "1" : "0"}
                    aria-pressed={on}
                    disabled={!n && !on}
                    aria-label={`${z.he}: ${n} טבלאות במודול`}
                    onClick={() => setZones((s) => {
                      const next = new Set(s); if (next.has(z.id)) next.delete(z.id); else next.add(z.id); return next;
                    })}>
                    <span>{z.he}</span><b>{n}</b>
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
                // A line is lit only while a selection gives it a meaning; with
                // nothing selected every line is the same quiet ink.
                const lit = near ? (near.has(e.from) && near.has(e.to) ? "1" : "0") : undefined;
                return (
                  <polyline
                    key={e.id}
                    className="nst-edge"
                    data-lit={lit}
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
                  /* The layouts give a node's CENTRE; the box is drawn around it,
                     so a line meets the middle of a node and not its corner. */
                  style={{ left: n.x - n.w / 2, top: n.y - n.h / 2, width: n.w, height: n.h } as React.CSSProperties}
                  onClick={() => setSel(on ? null : n.id)}
                  onDoubleClick={() => pick(n.id)}
                  aria-pressed={on}
                  aria-label={`${KIND_META[n.kind].he} ${n.label}${n.he ? `, ${n.he}` : ""}${n.kind === "table" ? `. S/4HANA: ${s4Word(n.s4k)}` : ""}`}
                  title={s4Mode ? n.he : undefined}
                >
                  <b className="nx-sap" dir="ltr">{mixed ? <KindGlyph kind={n.kind} size={11} /> : null}{n.label}</b>
                  {s4Mode && n.kind === "table"
                    ? <span className={n.s4k === undefined ? "nst-node-s4 is-none" : "nst-node-s4"}><S4Glyph k={n.s4k} size={11} />{s4Word(n.s4k)}</span>
                    : <span>{n.he}</span>}
                </button>
              );
            })}
          </div>

          {!laid.nodes.length ? (
            <p className="nst-empty">לא נמצאו תוצאות התואמות לסינון שנבחר.</p>
          ) : null}
        </div>

        {/* ------------------------------------------------------- context */}
        {selNode ? (
          <aside className="nst-ctx" aria-label="פרטי האובייקט הנבחר">
            <header>
              <span className="nst-kind"><KindGlyph kind={selNode.kind} />{KIND_META[selNode.kind].he}</span>
              <button type="button" className="nst-x" aria-label="סגירה" onClick={() => setSel(null)}><X size={14} /></button>
            </header>
            <h2 className="nst-ctx-id nx-sap" dir="ltr">{selNode.id}</h2>
            <p className="nst-ctx-he">{selNode.he}</p>

            {selNode.kind === "table" ? (
              <p className="nst-ctx-s4">
                <S4Glyph k={selNode.s4k} />
                <b>S/4HANA</b> {s4Word(selNode.s4k)}
              </p>
            ) : (
              <p className="nst-ctx-none">לאובייקט זה לא קיימת הכרעת מעבר מתועדת.</p>
            )}

            <h3 className="nst-ctx-h">קשרים · {selNeighbours.length}</h3>
            <ul className="nst-rel">
              {selNeighbours.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => pick(n.id)} aria-label={`${KIND_META[n.kind].he} ${n.id}${n.he ? `, ${n.he}` : ""}`}>
                    <KindGlyph kind={n.kind} />
                    <b className="nx-sap" dir="ltr">{n.id}</b>
                    <span>{n.he}</span>
                  </button>
                </li>
              ))}
              {!selNeighbours.length ? <li className="nst-ctx-none">אין קשרים בתצוגה זו.</li> : null}
            </ul>
          </aside>
        ) : null}
      </div>

      {/* legend — colours mean something, so they are stated */}
      <footer className="nst-legend">
        {s4Mode
          ? <>
            {S4_ORDER.filter((k) => laid.nodes.some((n) => n.kind === "table" && n.s4k === k)).map((k) => (
              <span key={k}><S4Glyph k={k} />{S4_HE[k]}</span>
            ))}
            {laid.nodes.some((n) => n.kind === "table" && n.s4k === undefined)
              ? <span><S4Glyph k={undefined} />{S4_UNDECIDED_HE}</span>
              : null}
          </>
          : [...new Set(laid.nodes.map((n) => n.kind))].map((k) => (
            <span key={k}><KindGlyph kind={k} />{KIND_META[k].he}</span>
          ))}
        {/* The mandatory credit, on the workspace's own bottom line. */}
        <span className="nst-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</span>
      </footer>
    </div>
  );
}
