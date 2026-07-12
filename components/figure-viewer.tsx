"use client";

/**
 * Project NEO — shared hi-res figure viewer (100% offline).
 * Pinch / wheel zoom (1–4×), drag-pan, double-click fit↔2×, prev/next filmstrip,
 * keyboard (Esc, ← →, + − 0), focus-trapped dialog, reduced-motion fade.
 * One component for every book so the figure experience never drifts.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { X, Download, ZoomIn, ZoomOut, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

export interface ViewerFigure { page: number; file: string; w: number; h: number }

export function FigureViewer({ figs, index, onIndex, onClose }: { figs: ViewerFigure[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const fig = figs[index];
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchBase = useRef<{ dist: number; scale: number } | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => { setScale(1); setTx(0); setTy(0); }, []);
  useEffect(() => { reset(); }, [index, reset]);

  const clamp = (s: number) => Math.min(4, Math.max(1, s));
  const zoomBy = useCallback((d: number) => setScale((s) => { const n = clamp(s + d); if (n <= 1) { setTx(0); setTy(0); } return n; }), []);
  const go = useCallback((i: number) => { if (i >= 0 && i < figs.length) onIndex(i); }, [figs.length, onIndex]);

  // keyboard — RTL: ← advances (next), → goes back (prev)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft") go(index + 1);
      else if (e.key === "ArrowRight") go(index - 1);
      else if (e.key === "+" || e.key === "=") zoomBy(0.5);
      else if (e.key === "-") zoomBy(-0.5);
      else if (e.key === "0") reset();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, go, onClose, reset, zoomBy]);

  // focus trap — keep Tab inside the dialog
  useEffect(() => {
    dialogRef.current?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!nodes || !nodes.length) return;
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const el = dialogRef.current;
    el?.addEventListener("keydown", trap);
    return () => el?.removeEventListener("keydown", trap);
  }, []);

  const onWheel = (e: React.WheelEvent) => { zoomBy(e.deltaY < 0 ? 0.35 : -0.35); };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchBase.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale };
    } else if (scale > 1) {
      drag.current = { x: e.clientX, y: e.clientY, tx, ty };
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (pointers.current.has(e.pointerId)) pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinchBase.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      setScale(clamp(pinchBase.current.scale * (dist / pinchBase.current.dist)));
      return;
    }
    if (drag.current) { setTx(drag.current.tx + (e.clientX - drag.current.x)); setTy(drag.current.ty + (e.clientY - drag.current.y)); }
  };
  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchBase.current = null;
    if (pointers.current.size === 0) { drag.current = null; if (scale <= 1) reset(); }
  };
  const onDouble = () => (scale > 1 ? reset() : setScale(2));

  if (!fig) return null;
  const btn = "inline-flex items-center gap-1.5 rounded-lg bg-white/12 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/25 disabled:opacity-30";

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={`איור · עמ׳ ${fig.page}`} tabIndex={-1}
      dir="rtl" className="neo-figviewer fixed inset-0 z-[70] flex flex-col bg-slate-950/92 outline-none backdrop-blur-sm" style={{ animation: "fadeUp .2s ease both" }}>
      {/* top bar */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-white">
        <span className="text-xs font-semibold tabular-nums" dir="ltr">Figure {index + 1} / {figs.length} · p.{fig.page}</span>
        <div className="flex items-center gap-1.5">
          <button className={btn} onClick={() => zoomBy(-0.5)} disabled={scale <= 1} aria-label="הקטן"><ZoomOut className="size-4" /></button>
          <span className="w-10 text-center font-mono text-xs tabular-nums">{Math.round(scale * 100)}%</span>
          <button className={btn} onClick={() => zoomBy(0.5)} disabled={scale >= 4} aria-label="הגדל"><ZoomIn className="size-4" /></button>
          <button className={btn} onClick={reset} disabled={scale === 1} aria-label="התאם למסך"><Maximize2 className="size-4" /></button>
          <a className={btn} href={fig.file} download onClick={(e) => e.stopPropagation()}><Download className="size-4" /> הורד</a>
          <button className={btn} onClick={onClose} aria-label="סגור"><X className="size-4" /> סגור</button>
        </div>
      </div>

      {/* stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2"
        onWheel={onWheel} onDoubleClick={onDouble} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        style={{ cursor: scale > 1 ? (drag.current ? "grabbing" : "grab") : "zoom-in", touchAction: "none" }}>
        {figs.length > 1 && (
          <>
            <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="הקודם" className="absolute right-2 z-10 grid size-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25 disabled:opacity-25"><ChevronRight className="size-6" /></button>
            <button onClick={() => go(index + 1)} disabled={index === figs.length - 1} aria-label="הבא" className="absolute left-2 z-10 grid size-11 place-items-center rounded-full bg-white/12 text-white transition hover:bg-white/25 disabled:opacity-25"><ChevronLeft className="size-6" /></button>
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={fig.file} alt={`SAP figure p.${fig.page}`} draggable={false} width={fig.w} height={fig.h}
          className="max-h-full max-w-full rounded-lg bg-white object-contain shadow-2xl motion-safe:transition-transform motion-safe:duration-150"
          style={{ transform: `translate(${tx}px, ${ty}px) scale(${scale})` }} />
      </div>

      {/* filmstrip */}
      {figs.length > 1 && (
        <div dir="rtl" className="chip-rail flex shrink-0 items-center gap-2 overflow-x-auto px-4 py-3">
          {figs.map((f, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`איור ${i + 1}`} aria-current={i === index}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-white transition ${i === index ? "border-white" : "border-white/20 opacity-60 hover:opacity-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.file} alt="" loading="lazy" className="size-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
