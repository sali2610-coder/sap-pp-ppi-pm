"use client";

/* ============================================================================
   PROJECT NEO · ARCHITECTURE STUDIO — the stage
   ----------------------------------------------------------------------------
   The canvas the picture is drawn on, and its camera. Owns interaction only:
   what to draw comes from ./studio-views.ts, where to draw it from
   lib/studio-layout.ts.

   THE CAMERA IS WRITTEN, NOT RENDERED (the ERD's rule, erd-workspace.tsx)
     The transform lives in a ref and is painted straight onto the stage and
     the minimap; React renders only the zoom readout. A pan or a zoom never
     re-renders seventy cards.

   CRISP AT EVERY ZOOM
     `will-change: transform` is set only while the stage moves and removed
     150ms after it settles, so the browser re-rasterises the text at the scale
     it stops at. The old stage kept will-change on permanently, so text drawn
     at one scale was stretched to every other one.

   WHAT IS DRAWN AT REST, AND WHAT ONLY WHEN LIT
     A relation inside a cluster is drawn at rest. A relation across clusters
     or frames, and a hub's line to each table of its block, is drawn only
     while one of its ends is hovered or selected: the picture stays readable,
     and every relation is one pointer away. The panel counts all of them.
   ========================================================================== */

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import {
  ArrowRightLeft, Ban, Braces, Cable, Check, CircleHelp, Diff, LayoutGrid, Link2, Plug, Sigma, Table, Terminal,
  type LucideIcon,
} from "lucide-react";
import { motionIsReduced } from "../motion/preferences";
import { chord, clampView, ease, lerp, pathD, type View } from "../erd/graph";
import { S4_HE, S4_UNDECIDED_HE, type S4Class } from "@/lib/s4-class";
import type { PEdge, PNode, StudioLayout } from "@/lib/studio-layout";
import type { BuiltView, Graph, Kind } from "./studio-views";
import { KIND_HE, SHARED_ID } from "./studio-views";

export const KIND_ICON: Record<Kind, LucideIcon> = {
  table: Table, tcode: Terminal, bapi: Plug, fm: Braces, idoc: Cable, cds: Sigma, fiori: LayoutGrid,
};
export const S4_ICON: Record<S4Class, LucideIcon> = { 0: Check, 1: Diff, 2: ArrowRightLeft, 3: Ban };

export function KindGlyph({ kind, size = 14 }: { kind: Kind; size?: number }) {
  const I = KIND_ICON[kind];
  return <I size={size} strokeWidth={2} aria-hidden="true" className="nst-kg" />;
}
export function S4Glyph({ k, size = 14 }: { k: S4Class | undefined | null; size?: number }) {
  if (k === undefined || k === null) return <CircleHelp size={size} strokeWidth={2.2} aria-hidden="true" className="nst-s4g" data-k="none" />;
  const I = S4_ICON[k];
  return <I size={size} strokeWidth={2.4} aria-hidden="true" className="nst-s4g" data-k={k} />;
}
export const s4Word = (k: S4Class | undefined | null) => (k === undefined || k === null ? S4_UNDECIDED_HE : S4_HE[k]);

const PAD = 32;
const MAX_AUTO = 1.25;
// at the far-zoom threshold's upper edge, so a touch screen opens with names
const TOUCH_FLOOR = 0.75;
const FAR_IN = 0.7, FAR_OUT = 0.75;
const TWEEN = 380;

export interface StageApi {
  fit: () => void;
  zoomBy: (f: number) => void;
  zoomTo: (k: number) => void;
  /** centre an object; `dx` shifts the centre toward the stage's right, past a drawer on its left */
  centerOn: (id: string, dx?: number) => void;
  /** frame a set of objects (isolation), returning the camera it left */
  frame: (ids: string[]) => View;
  restore: (v: View) => void;
}

interface Props {
  G: Graph;
  viewId: string;
  built: BuiltView;
  sel: string | null;
  iso: boolean;
  /** the module, view and layers: a change re-frames the picture */
  frameKey: string;
  /** the dock floats over the stage's bottom-left when the panel is closed */
  dockInset: boolean;
  coarse: boolean;
  onSelect: (id: string | null) => void;
  onIsolate: (id: string) => void;
  onSize: (w: number, h: number) => void;
  onZoom: (pct: number) => void;
  /** an empty-canvas click: one Escape step */
  onBlank: () => void;
}

/** Elbow from border to border (the ERD's rule); a bracket when the two
 *  cards stand in one column (the process view's step and its tables).
 *  `lane` moves the elbow's vertical run sideways, so two parents that share
 *  a gap between columns each keep a rail of their own. */
function edgeD(a: PNode, b: PNode, lane = 0): string {
  if (Math.abs(a.x - b.x) < 1) {
    const x1 = a.x + a.w / 2, x2 = b.x + b.w / 2;
    const bx = Math.max(x1, x2) + 14;
    const r = Math.min(8, Math.abs(b.y - a.y) / 2);
    const vd = b.y > a.y ? 1 : -1;
    return `M${x1} ${a.y} L${bx - r} ${a.y} Q${bx} ${a.y} ${bx} ${a.y + r * vd} L${bx} ${b.y - r * vd} Q${bx} ${b.y} ${bx - r} ${b.y} L${x2} ${b.y}`;
  }
  return pathD(chord({ x: a.x, y: a.y }, { x: b.x, y: b.y }, a.w, a.h, b.w, b.h, lane));
}

/** The lanes: in each gap between two columns, the parents whose lines run
 *  there, top to bottom, each given its own offset (9px apart, centred). The
 *  parent is the end on the right, the reading start, where hubs stand. */
function lanesOf(edges: PEdge[], at: Map<string, PNode>): Map<string, number> {
  const gaps = new Map<string, { parent: string; y: number }[]>();
  const parentOf = new Map<string, { gap: string; parent: string }>();
  for (const e of edges) {
    const a = at.get(e.a), b = at.get(e.b);
    if (!a || !b || Math.abs(a.x - b.x) < 1) continue;
    const [p, c] = a.x > b.x ? [a, b] : [b, a];
    const gap = String(Math.round((p.x - p.w / 2 + c.x + c.w / 2) / 2 / 16));
    const list = gaps.get(gap) ?? gaps.set(gap, []).get(gap)!;
    if (!list.some((x) => x.parent === p.id)) list.push({ parent: p.id, y: p.y });
    parentOf.set(e.id, { gap, parent: p.id });
  }
  const off = new Map<string, number>();
  for (const [gap, list] of gaps) {
    list.sort((x, y) => x.y - y.y);
    list.forEach((x, i) => off.set(`${gap}|${x.parent}`, (i - (list.length - 1) / 2) * 9));
  }
  const out = new Map<string, number>();
  for (const [id, { gap, parent }] of parentOf) out.set(id, off.get(`${gap}|${parent}`) ?? 0);
  return out;
}

export const StudioStage = forwardRef<StageApi, Props>(function StudioStage(
  { G, viewId, built, sel, iso, frameKey, dockInset, coarse, onSelect, onIsolate, onSize, onZoom, onBlank },
  ref,
) {
  const layout: StudioLayout = built.layout;
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const mini = useRef<SVGRectElement>(null);
  const cam = useRef<View>({ x: 0, y: 0, k: 1 });
  const anim = useRef(0);
  const settle = useRef(0);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [far, setFar] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [showMini, setShowMini] = useState(false);
  const hoverT = useRef(0);
  const fitK = useRef(1);

  const byId = useMemo(() => new Map(layout.nodes.map((n) => [n.id, n])), [layout.nodes]);
  const bbox = useMemo(() => {
    if (!layout.nodes.length) return { x: 0, y: 0, w: 1, h: 1 };
    let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
    for (const n of layout.nodes) { a = Math.min(a, n.x - n.w / 2); b = Math.min(b, n.y - n.h / 2); c = Math.max(c, n.x + n.w / 2); d = Math.max(d, n.y + n.h / 2); }
    for (const g of layout.groups) { a = Math.min(a, g.x); b = Math.min(b, g.y); c = Math.max(c, g.x + g.w); d = Math.max(d, g.y + g.h); }
    return { x: a, y: b, w: c - a, h: d - b };
  }, [layout]);
  const bboxRef = useRef(bbox);
  useEffect(() => { bboxRef.current = bbox; }, [bbox]);
  // the card with the most relations in the picture: where a narrow screen opens
  const busiest = useMemo(() => {
    let best: PNode | null = null, most = -1;
    for (const n of layout.nodes) {
      let d = 0;
      for (const m of G.adj.get(n.id) || []) if (byId.has(m)) d++;
      if (d > most || (d === most && best && n.id < best.id)) { best = n; most = d; }
    }
    return best;
  }, [layout.nodes, G.adj, byId]);
  const busiestRef = useRef<PNode | null>(busiest);
  useEffect(() => { busiestRef.current = busiest; }, [busiest]);

  /* ------------------------------------------------------------ painting */

  const paint = useCallback(() => {
    const v = cam.current;
    const st = stage.current;
    if (st) {
      st.style.transform = `translate(${v.x}px, ${v.y}px) scale(${v.k})`;
      // moving: let the compositor carry it; settled: re-rasterise crisply
      st.style.willChange = "transform";
      window.clearTimeout(settle.current);
      settle.current = window.setTimeout(() => { if (stage.current) stage.current.style.willChange = "auto"; }, 150);
    }
    const el = host.current, m = mini.current, b = bboxRef.current;
    if (el && m && b.w > 1) {
      // the viewport, in picture coordinates
      m.setAttribute("x", String(-v.x / v.k));
      m.setAttribute("y", String(-v.y / v.k));
      m.setAttribute("width", String(Math.max(1, el.clientWidth / v.k)));
      m.setAttribute("height", String(Math.max(1, el.clientHeight / v.k)));
    }
    setFar((f) => (f ? v.k < FAR_OUT : v.k < FAR_IN));
    if (el) {
      const fits = b.w * v.k <= el.clientWidth + 1 && b.h * v.k <= el.clientHeight + 1;
      setShowMini(!fits || v.k > fitK.current * 1.1);
    }
  }, []);

  const clamp = useCallback((v: View): View => {
    const el = host.current;
    return clampView(v, bboxRef.current, el?.clientWidth || 800, el?.clientHeight || 600);
  }, []);

  const glide = useCallback((to: View) => {
    cancelAnimationFrame(anim.current);
    const end = clamp(to);
    onZoom(Math.round(end.k * 100));
    if (motionIsReduced()) { cam.current = end; paint(); return; }
    const from = { ...cam.current };
    const t0 = performance.now();
    const step = (t: number) => {
      const e = ease((t - t0) / TWEEN);
      cam.current = { x: lerp(from.x, end.x, e), y: lerp(from.y, end.y, e), k: lerp(from.k, end.k, e) };
      paint();
      if (e < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
  }, [clamp, onZoom, paint]);

  const jump = useCallback((to: View) => {
    cancelAnimationFrame(anim.current);
    cam.current = clamp(to);
    onZoom(Math.round(cam.current.k * 100));
    paint();
  }, [clamp, onZoom, paint]);

  /* --------------------------------------------------------------- framing */

  /* The shell's dock floats over the bottom-left of the screen. Where it
     overlaps the stage (the panel closed, or narrower than the dock), the
     framing keeps that strip clear; where it stands over the panel, the stage
     keeps its full height. Measured, not assumed. */
  const inset = useCallback(() => {
    const el = host.current!;
    let dock = 0;
    const d = dockInset ? document.querySelector(".nxk")?.getBoundingClientRect() : undefined;
    if (d && d.width > 0) {
      const r = el.getBoundingClientRect();
      if (d.right > r.left + 1 && d.left < r.right - 1 && d.top < r.bottom) dock = r.bottom - d.top + 8;
    }
    return { W: el.clientWidth, H: el.clientHeight, top: PAD, bottom: Math.max(PAD, dock), side: PAD };
  }, [dockInset]);

  /** Frame a box. `auto` frames from a module/view/layer change: the zoom is
   *  capped at 125%, and on a touch or narrow screen never drops under 75%;
   *  the camera then opens on the picture's busiest card, not an empty corner. */
  const frameBox = useCallback((b: { x: number; y: number; w: number; h: number }, auto: boolean, animate = true) => {
    const el = host.current;
    if (!el || b.w <= 1) return;
    const { W, H, top, bottom, side } = inset();
    const raw = Math.min((W - side * 2) / b.w, (H - top - bottom) / b.h);
    let k = Math.min(raw, MAX_AUTO);
    fitK.current = k;
    let x = (W - b.w * k) / 2 - b.x * k;
    let y = top + (H - top - bottom - b.h * k) / 2 - b.y * k;
    if (auto && coarse && k < TOUCH_FLOOR) {
      k = TOUCH_FLOOR;
      const busiest = busiestRef.current;
      if (busiest) {
        x = W / 2 - busiest.x * k;
        y = (top + H - bottom) / 2 - busiest.y * k;
      } else {
        x = W - side - (b.x + b.w) * k;
        y = top - b.y * k;
      }
    }
    (animate ? glide : jump)({ x, y, k });
  }, [coarse, glide, inset, jump]);

  const fit = useCallback(() => frameBox(bboxRef.current, false), [frameBox]);

  const centerOn = useCallback((id: string, dx = 0) => {
    const el = host.current, n = byId.get(id);
    if (!el || !n) return;
    const k = Math.max(cam.current.k, Math.min(1, fitK.current * 1.15));
    glide({ k, x: el.clientWidth / 2 + dx - n.x * k, y: el.clientHeight / 2 - n.y * k });
  }, [byId, glide]);

  useImperativeHandle(ref, () => ({
    fit,
    zoomBy: (f: number) => {
      const el = host.current; if (!el) return;
      const c = cam.current, k = c.k * f;
      const cx = el.clientWidth / 2, cy = el.clientHeight / 2;
      glide({ k, x: cx - ((cx - c.x) / c.k) * k, y: cy - ((cy - c.y) / c.k) * k });
    },
    zoomTo: (k: number) => {
      const el = host.current; if (!el) return;
      const c = cam.current;
      const cx = el.clientWidth / 2, cy = el.clientHeight / 2;
      glide({ k, x: cx - ((cx - c.x) / c.k) * k, y: cy - ((cy - c.y) / c.k) * k });
    },
    centerOn,
    frame: (ids: string[]) => {
      const before = { ...cam.current };
      const ns = ids.map((i) => byId.get(i)).filter((n): n is PNode => !!n);
      if (ns.length) {
        let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
        for (const n of ns) { a = Math.min(a, n.x - n.w / 2); b = Math.min(b, n.y - n.h / 2); c = Math.max(c, n.x + n.w / 2); d = Math.max(d, n.y + n.h / 2); }
        frameBox({ x: a, y: b, w: c - a, h: d - b }, false);
      }
      return before;
    },
    restore: (v: View) => glide(v),
  }), [byId, centerOn, fit, frameBox, glide]);

  /* The stage's size: reported up (the picture is packed to its shape) and
     answered here (a new size re-frames, a selection stays centred). */
  useEffect(() => {
    const el = host.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let lw = 0, lh = 0;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth, h = el.clientHeight;
      if (Math.abs(w - lw) < 2 && Math.abs(h - lh) < 2) return;
      lw = w; lh = h;
      setSize({ w, h });
      onSize(w, h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [onSize]);

  /* A new picture (module, view, layers, a new stage shape) is framed; a
     resize with a selection keeps the selection centred at the same zoom. */
  const selRef = useRef(sel);
  useEffect(() => { selRef.current = sel; }, [sel]);
  const framed = useRef("");
  useEffect(() => {
    if (!size || !layout.nodes.length) return;
    const key = `${frameKey}|${layout.w}x${layout.h}`;
    if (framed.current === key) {
      const id = selRef.current, n = id ? byId.get(id) : undefined;
      if (n) jump({ k: cam.current.k, x: size.w / 2 - n.x * cam.current.k, y: size.h / 2 - n.y * cam.current.k });
      else frameBox(bboxRef.current, true, false);
      return;
    }
    const first = !framed.current;
    framed.current = key;
    frameBox(bboxRef.current, true, !first);
  }, [size, frameKey, layout, byId, frameBox, jump]);

  /* --------------------------------------------------------------- input */

  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean; id: number } | null>(null);
  const pinch = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchD = useRef(0);
  const suppressClick = useRef(false);

  const zoomAt = useCallback((f: number, px: number, py: number) => {
    const c = cam.current;
    const k = c.k * f;
    jump({ k, x: px - ((px - c.x) / c.k) * k, y: py - ((py - c.y) / c.k) * k });
  }, [jump]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    // non-passive, so a modifier-wheel can zoom instead of the page
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
      else { const c = cam.current; jump({ k: c.k, x: c.x - e.deltaX, y: c.y - e.deltaY }); }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    // the camera alone moves the picture: a browser scroll of the clipped
    // stage (a focused card, find-in-page) is put straight back
    const onScroll = () => { if (el.scrollTop || el.scrollLeft) { el.scrollTop = 0; el.scrollLeft = 0; } };
    el.addEventListener("scroll", onScroll);
    return () => { el.removeEventListener("wheel", onWheel); el.removeEventListener("scroll", onScroll); };
  }, [jump, zoomAt]);

  const lit = hover ?? sel;
  const near = useMemo(() => {
    if (!lit) return null;
    const s = new Set([lit]);
    for (const n of G.adj.get(lit) || []) if (byId.has(n)) s.add(n);
    return s;
  }, [lit, G.adj, byId]);
  const selNear = useMemo(() => {
    if (!sel) return null;
    const s = new Set([sel]);
    for (const n of G.adj.get(sel) || []) if (byId.has(n)) s.add(n);
    return s;
  }, [sel, G.adj, byId]);

  const restEdges = layout.edges.filter((e) => e.kind === "in");
  const lanes = useMemo(() => lanesOf(layout.edges.filter((e) => e.kind === "in"), byId), [layout.edges, byId]);
  const litEdges = lit ? layout.edges.filter((e) => e.a === lit || e.b === lit) : [];
  const shared = built.shared;

  /* Reading order for the keyboard: rows top to bottom, each right to left. */
  const order = useMemo(
    () => [...layout.nodes].sort((a, b) => Math.round(a.y / 30) - Math.round(b.y / 30) || b.x - a.x),
    [layout.nodes],
  );

  const enter = (id: string) => {
    window.clearTimeout(hoverT.current);
    hoverT.current = window.setTimeout(() => setHover(id), 80);
  };
  const leave = () => { window.clearTimeout(hoverT.current); setHover(null); };

  const ready = !!size;
  const steps = built.columns;

  return (
    <div
      className="nst-stage-host"
      ref={host}
      data-far={far ? "1" : undefined}
      data-view={viewId}
      data-lit={lit ? (sel && !hover ? "sel" : "hover") : undefined}
      data-iso={iso ? "1" : undefined}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pinch.current.size === 2) {
          const [p, q] = [...pinch.current.values()];
          pinchD.current = Math.hypot(p.x - q.x, p.y - q.y);
          drag.current = null;
          return;
        }
        drag.current = { x: e.clientX, y: e.clientY, vx: cam.current.x, vy: cam.current.y, moved: false, id: e.pointerId };
      }}
      onPointerMove={(e) => {
        if (pinch.current.has(e.pointerId)) pinch.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pinch.current.size === 2) {
          const [p, q] = [...pinch.current.values()];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (pinchD.current > 0 && d > 0) {
            const r = host.current!.getBoundingClientRect();
            zoomAt(d / pinchD.current, (p.x + q.x) / 2 - r.left, (p.y + q.y) / 2 - r.top);
          }
          pinchD.current = d;
          return;
        }
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        const dx = e.clientX - d.x, dy = e.clientY - d.y;
        if (!d.moved && Math.hypot(dx, dy) < 6) return;
        if (!d.moved) { d.moved = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }
        jump({ k: cam.current.k, x: d.vx + dx, y: d.vy + dy });
      }}
      onPointerUp={(e) => {
        pinch.current.delete(e.pointerId);
        const d = drag.current;
        drag.current = null;
        if (d?.moved) { suppressClick.current = true; window.setTimeout(() => { suppressClick.current = false; }, 0); return; }
        if (d && !(e.target as HTMLElement).closest(".nst-node, .nst-mini, button, a")) onBlank();
      }}
      onPointerCancel={(e) => { pinch.current.delete(e.pointerId); drag.current = null; }}
      onKeyDown={(e) => {
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
        e.preventDefault();
        const s = e.shiftKey ? 240 : 80, c = cam.current;
        const dx = e.key === "ArrowLeft" ? s : e.key === "ArrowRight" ? -s : 0;
        const dy = e.key === "ArrowUp" ? s : e.key === "ArrowDown" ? -s : 0;
        glide({ k: c.k, x: c.x + dx, y: c.y + dy });
      }}
    >
      {!ready ? <p className="nst-wait">מסדר את התרשים לגודל המסך…</p> : null}

      <div className="nst-stage" ref={stage} data-ready={ready ? "1" : undefined} style={{ width: layout.w, height: layout.h }}>
        {/* frames: a zone, a verdict, a master object, a step */}
        {layout.groups.map((g) => {
          const step = steps?.find((c) => `step${c.step}` === g.id);
          const verdict = built.verdicts?.find((v) => (v.k === null ? "s4-none" : `s4-${v.k}`) === g.id);
          return (
            <section key={g.id} className="nst-frame" data-kind={step ? "step" : verdict ? "verdict" : g.id === SHARED_ID ? "shared" : "group"}
              style={{ left: g.x, top: g.y, width: g.w, height: g.h }} aria-label={g.title || undefined}>
              {step ? (
                <header className="nst-frame-h">
                  <span className="nst-step-n" aria-hidden="true">{step.step}</span>
                  <b className="nst-frame-t">{step.label}</b>
                </header>
              ) : g.title ? (
                <header className="nst-frame-h">
                  {verdict ? <S4Glyph k={verdict.k} /> : null}
                  <b className="nst-frame-t">{g.title}</b>
                  <span className="nst-frame-n" dir="ltr">{g.count}</span>
                </header>
              ) : null}
              {step && !step.inGraph ? (
                <div className="nst-gap">
                  <b className="nx-sap" dir="ltr">{step.code}</b>
                  <span>אין לו כרטיס במודול</span>
                  {(() => { const f = G.g.flow[step.step - 1]; return f?.href ? <a className="nu-link" href={f.href}>לדף הרשומה</a> : null; })()}
                </div>
              ) : null}
            </section>
          );
        })}

        {/* a group's unrelated objects, under their caption */}
        {layout.loose.map((b) => (
          <div key={`loose-${b.group}`} className="nst-loose" style={{ left: b.x, top: b.y, width: b.w, height: b.h }}>
            <span className="nst-loose-t">ללא קשר בתוך המסגרת · {b.count}</span>
          </div>
        ))}

        {/* blocks: a hub's single-link tables */}
        {layout.blocks.map((b) => (
          <div key={`blk-${b.hub}`} className="nst-block" style={{ left: b.x, top: b.y, width: b.w, height: b.h }} aria-hidden="true" />
        ))}

        <svg className="nst-edges" width={layout.w} height={layout.h} aria-hidden="true">
          <defs>
            <marker id="nst-seq-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="nst-seq-head" />
            </marker>
          </defs>
          {steps?.slice(1).map((c) => {
            const a = layout.groups.find((g) => g.id === `step${c.step - 1}`), b = layout.groups.find((g) => g.id === `step${c.step}`);
            if (!a || !b) return null;
            const ya = a.y + 22, yb = b.y + 22;
            // the same row: from this step's left edge to the next one's right edge;
            // a new row: down the left margin, across the gap between rows, into the next step
            const d = Math.abs(a.y - b.y) < 1
              ? `M${a.x} ${ya} L${b.x + b.w + 2} ${yb}`
              : `M${a.x} ${ya} H${a.x - 16} V${b.y - 32} H${b.x + b.w + 16} V${yb} H${b.x + b.w + 2}`;
            return <path key={`seq-${c.step}`} d={d} className="nst-seq" markerEnd="url(#nst-seq-arrow)" />;
          })}
          {layout.blocks.map((b) => {
            const h = byId.get(b.hub);
            if (!h) return null;
            const d = pathD(chord({ x: h.x, y: h.y }, { x: b.x + b.w / 2, y: b.y + b.h / 2 }, h.w, h.h, b.w, b.h, 0));
            return <path key={`bc-${b.hub}`} d={d} className="nst-edge" data-rest="1" />;
          })}
          {restEdges.map((e) => {
            const a = byId.get(e.a), b = byId.get(e.b);
            if (!a || !b) return null;
            const dim = near ? !(near.has(e.a) && near.has(e.b)) : false;
            return <path key={e.id} d={edgeD(a, b, lanes.get(e.id))} className="nst-edge" data-rest="1" data-dim={dim ? "1" : undefined} />;
          })}
          {litEdges.map((e: PEdge) => {
            const a = byId.get(e.a), b = byId.get(e.b);
            if (!a || !b) return null;
            return <path key={`lit-${e.id}`} d={edgeD(a, b, lanes.get(e.id))} className="nst-edge" data-on={sel === lit ? "sel" : "hover"} />;
          })}
        </svg>

        {order.map((n) => {
          const node = G.byId.get(n.id);
          if (!node) return null;
          const isTable = node.k === "table";
          const on = sel === n.id;
          const dim = iso ? !selNear?.has(n.id) : near ? !near.has(n.id) : false;
          const shareN = shared?.get(n.id);
          const name = node.he || node.en || "";
          return (
            <button
              key={n.id}
              type="button"
              className="nst-node"
              data-kind={node.k}
              data-tier={isTable ? node.t : undefined}
              data-on={on ? "1" : undefined}
              data-dim={dim ? "1" : undefined}
              style={{ left: n.x - n.w / 2, top: n.y - n.h / 2, width: n.w, height: n.h }}
              aria-pressed={on}
              aria-label={`${KIND_HE[node.k]} ${node.l}${name ? `, ${name}` : ""}${shareN ? `, משותף ל-${shareN} טבלאות` : ""}`}
              title={name || undefined}
              tabIndex={iso && dim ? -1 : 0}
              onPointerEnter={() => enter(n.id)}
              onPointerLeave={leave}
              onFocus={() => {
                const el = host.current, v = cam.current;
                if (!el) return;
                const sx = n.x * v.k + v.x, sy = n.y * v.k + v.y;
                if (sx < 40 || sy < 40 || sx > el.clientWidth - 40 || sy > el.clientHeight - 40) centerOn(n.id);
              }}
              onClick={() => { if (suppressClick.current) return; onSelect(on ? null : n.id); }}
              onDoubleClick={() => onIsolate(n.id)}
            >
              {isTable ? (
                <>
                  <b className="nst-id nx-sap" dir="ltr">{node.l}</b>
                  {name ? <span className="nst-he">{name}</span> : null}
                </>
              ) : (
                <b className="nst-id nx-sap" dir="ltr">
                  <KindGlyph kind={node.k} />
                  <span className="nst-ol">{node.l}</span>
                  {shareN ? <span className="nst-share" aria-hidden="true"><Link2 size={12} strokeWidth={2} />{shareN}</span> : null}
                </b>
              )}
            </button>
          );
        })}
      </div>

      {/* MINIMAP: only while the picture does not fit, or is zoomed past it */}
      {ready && layout.nodes.length ? (
        <svg
          className="nst-mini"
          data-show={showMini ? "1" : undefined}
          viewBox={`${bbox.x - 20} ${bbox.y - 20} ${bbox.w + 40} ${bbox.h + 40}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="מפת התמצאות: לחיצה מעבירה את התצוגה למקום"
          onPointerDown={(e) => {
            e.stopPropagation();
            const svg = e.currentTarget;
            const move = (cx: number, cy: number) => {
              const p = svg.createSVGPoint(); p.x = cx; p.y = cy;
              const m = svg.getScreenCTM(); if (!m) return;
              const q = p.matrixTransform(m.inverse());
              const el = host.current!; const c = cam.current;
              jump({ k: c.k, x: el.clientWidth / 2 - q.x * c.k, y: el.clientHeight / 2 - q.y * c.k });
            };
            move(e.clientX, e.clientY);
            svg.setPointerCapture(e.pointerId);
            const mv = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
            const up = () => { svg.removeEventListener("pointermove", mv); svg.removeEventListener("pointerup", up); };
            svg.addEventListener("pointermove", mv);
            svg.addEventListener("pointerup", up);
          }}
        >
          {layout.groups.map((g) => <rect key={g.id} x={g.x} y={g.y} width={g.w} height={g.h} className="nst-mini-f" />)}
          {layout.nodes.map((n) => <rect key={n.id} x={n.x - n.w / 2} y={n.y - n.h / 2} width={n.w} height={n.h} className="nst-mini-n" data-on={n.id === sel ? "1" : undefined} />)}
          <rect ref={mini} className="nst-mini-v" />
        </svg>
      ) : null}

    </div>
  );
});
