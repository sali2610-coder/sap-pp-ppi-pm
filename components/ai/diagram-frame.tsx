"use client";

/**
 * The shell every diagram lives in.
 *
 * Zoom, pan, export, print and full screen were built for the graph renderer and
 * only the graph renderer. Timelines, Gantt charts, swimlanes and sequence
 * diagrams had none of it — four of the nine types were second-class, which is
 * the "one unified engine" requirement failing rather than a missing nicety.
 *
 * So the chrome moved here and both renderers wrap themselves in it. A new
 * diagram type gets the whole toolbar by existing.
 *
 * The graph renderer keeps its own frame: it also owns node selection, a detail
 * panel, presentation mode and Learning Mode, which are graph-shaped and would
 * be meaningless on a Gantt chart. What is shared is what is genuinely common.
 */

import { useCallback, useRef, useState } from "react";
import { Maximize2, Minus, Plus, Printer, RotateCcw, X } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";

/** Tokens inlined so an exported file stands alone, away from the app's CSS. */
const EXPORT_TOKENS = [
  "--brand", "--brand-dark", "--brand-soft", "--surface", "--surface-2",
  "--hairline", "--ink-1", "--ink-2", "--ink-3", "--accent",
];

export type PrintProfile = "portrait" | "landscape" | "a3";

export function DiagramFrame({ title, ariaLabel, children, extraActions }: {
  title: string;
  ariaLabel?: string;
  children: React.ReactNode;
  /** Renderer-specific buttons, placed before the shared ones. */
  extraActions?: React.ReactNode;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [full, setFull] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);
  const dialogRef = useDialog<HTMLDivElement>(full, () => setFull(false));

  // Pan by dragging. Pointer events rather than mouse events so a trackpad, a
  // stylus and a touchscreen all behave the same without three code paths.
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  // Mirrored in state because the cursor and the transition depend on it, and a
  // ref read during render is neither reactive nor legal.
  const [dragging, setDragging] = useState(false);
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Never start a drag from a control or a focusable node — panning would
    // swallow the click that was meant to select something.
    if ((e.target as HTMLElement).closest("button, a, [tabindex]")) return;
    drag.current = { x: e.clientX, y: e.clientY, ox: pan.x, oy: pan.y };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [pan]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setPan({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) });
  }, []);

  const endDrag = useCallback(() => { drag.current = null; setDragging(false); }, []);

  const reset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  /** The rendered SVG, with tokens resolved so the file is self-contained. */
  const svgMarkup = useCallback(() => {
    const el = hostRef.current?.querySelector("svg");
    if (!el) return "";
    const clone = el.cloneNode(true) as SVGSVGElement;
    // Transient view state must not reach a file: zoom, pan and any highlight
    // are how the diagram is being LOOKED at, not what it is.
    clone.removeAttribute("style");
    clone.querySelectorAll("[opacity]").forEach((n) => n.setAttribute("opacity", "1"));
    const cs = getComputedStyle(document.documentElement);
    let s = new XMLSerializer().serializeToString(clone);
    for (const v of EXPORT_TOKENS) {
      s = s.split(`var(${v})`).join(cs.getPropertyValue(v).trim() || "#000");
      // `var(--x, fallback)` — keep the fallback rather than leaving the call.
      s = s.replace(new RegExp(`var\\(${v},\\s*([^)]+)\\)`, "g"), "$1");
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n${s}`;
  }, []);

  const download = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const exportSvg = () => {
    const m = svgMarkup();
    if (m) download(new Blob([m], { type: "image/svg+xml;charset=utf-8" }), `${title}.svg`);
  };

  const exportPng = (scale = 2) => {
    const m = svgMarkup();
    const el = hostRef.current?.querySelector("svg");
    if (!m || !el) return;
    const w = Number(el.getAttribute("width")) || el.clientWidth || 1200;
    const h = Number(el.getAttribute("height")) || el.clientHeight || 800;
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = w * scale; c.height = h * scale;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      // White, not transparent: a transparent PNG pasted into a slide deck
      // shows the deck's background through the diagram.
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob((b) => b && download(b, `${title}.png`));
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(m)}`;
  };

  /**
   * Print and PDF are the same path: the browser's print dialog offers "Save as
   * PDF" on every platform we target. Shipping a PDF library to duplicate that
   * would add weight for a worse result — no system fonts, no user page setup.
   */
  const printAt = (profile: PrintProfile) => {
    const markup = svgMarkup();
    if (!markup) return;
    const page = profile === "a3" ? "A3 landscape"
      : profile === "portrait" ? "A4 portrait" : "A4 landscape";
    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;inset:0;width:0;height:0;border:0;opacity:0";
    document.body.appendChild(frame);
    const doc = frame.contentDocument;
    if (!doc) { frame.remove(); return; }
    doc.open();
    doc.write(`<!doctype html><html dir="rtl"><head><meta charset="utf-8"><title>${title}</title>
      <style>
        @page { size: ${page}; margin: 12mm; }
        html,body { margin:0; padding:0; background:#fff; }
        body { display:flex; align-items:center; justify-content:center; min-height:100vh; }
        svg { width:100%; height:auto; max-height:100vh; }
        @media print { body { min-height:auto; } }
      </style></head><body>${markup}</body></html>`);
    doc.close();
    // Print after layout, or the sheet can come out blank.
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => frame.remove(), 1000);
    };
  };

  const btn = "rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1";
  const txt = "rounded-lg px-2 py-1.5 text-[11px] font-bold text-ink-3 transition hover:bg-surface-2 hover:text-brand";

  const toolbar = (
    <div className="flex flex-wrap items-center gap-1">
      {extraActions}
      <button onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))} aria-label="הקטן" className={btn}>
        <Minus className="size-3.5" />
      </button>
      <span className="tech min-w-[3ch] text-center text-[11px] font-bold text-ink-3">{Math.round(zoom * 100)}%</span>
      <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} aria-label="הגדל" className={btn}>
        <Plus className="size-3.5" />
      </button>
      <button onClick={reset} aria-label="אפס תצוגה" className={btn}><RotateCcw className="size-3.5" /></button>
      <span className="mx-1 h-4 w-px bg-hairline" />
      <button onClick={() => exportPng()} className={txt}>PNG</button>
      <button onClick={exportSvg} className={txt}>SVG</button>
      <button onClick={() => printAt("landscape")} aria-label="הדפס / PDF" className={btn}>
        <Printer className="size-3.5" />
      </button>
      <button onClick={() => printAt("portrait")} className={txt} title="A4 לאורך">A4↕</button>
      <button onClick={() => printAt("a3")} className={txt} title="A3 פוסטר">A3</button>
      {!full && (
        <button onClick={() => setFull(true)} aria-label="מסך מלא" className={btn}>
          <Maximize2 className="size-3.5" />
        </button>
      )}
    </div>
  );

  const stage = (
    <div
      ref={hostRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className="overflow-auto p-3"
      style={{ maxHeight: full ? undefined : "32rem", cursor: dragging ? "grabbing" : "grab" }}
    >
      <div style={{
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        transformOrigin: "top right",   // RTL: the diagram grows from the start edge
        transition: dragging ? "none" : "transform 120ms ease-out",
        width: "fit-content",
      }}>
        {children}
      </div>
    </div>
  );

  return (
    <>
      <figure className="my-4 overflow-hidden rounded-2xl border border-hairline bg-surface">
        <figcaption className="flex items-center justify-between gap-2 border-b border-hairline bg-surface-2/50 px-3 py-1.5">
          {/* Truncated rather than wrapped: on a narrow screen a long title
              otherwise takes three lines and pushes the toolbar off the card. */}
          <span className="min-w-0 truncate text-[11px] font-bold text-ink-3" title={title}>{title}</span>
          {toolbar}
        </figcaption>
        {stage}
      </figure>

      {full && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={ariaLabel || title}>
          <div aria-hidden onClick={() => setFull(false)} className="absolute inset-0 bg-ink-1/60 backdrop-blur-sm" />
          <div ref={dialogRef} tabIndex={-1}
            className="absolute inset-4 flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-2xl outline-none">
            <div className="flex items-center justify-between gap-2 border-b border-hairline px-3 py-2">
              {toolbar}
              <button onClick={() => setFull(false)} aria-label="סגור" className={btn}><X className="size-4" /></button>
            </div>
            <div className="flex-1 overflow-auto">{stage}</div>
          </div>
        </div>
      )}
    </>
  );
}
