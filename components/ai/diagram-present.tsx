"use client";

/**
 * Presentation mode: a diagram walked one step at a time, full screen.
 *
 * Built for a room, not a desk. That drives every decision here — the step
 * ordering is the reading order of the process rather than the layout order,
 * the current node is the only thing at full contrast, and the keyboard map
 * matches what a presenter's remote actually sends (arrows, space, Page
 * Up/Down), so a clicker works without configuration.
 *
 * Autoplay pauses on any manual navigation. A slide advancing under a presenter
 * mid-sentence is worse than no autoplay at all.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft, ChevronRight, Maximize2, Minus, Pause, Play, Plus, X,
} from "lucide-react";
import type { Diagram } from "@/lib/ai/diagram";
import { presentationOrder } from "@/lib/ai/present-order";

const SHAPE_HE: Record<string, string> = {
  terminal: "התחלה / סיום",
  decision: "החלטה",
  process: "שלב",
  data: "נתונים",
  note: "הערה",
};

export function PresentationMode({ diagram, canvas, title, onClose }: {
  diagram: Diagram;
  /** The rendered SVG, so the deck and the page cannot drift apart. */
  canvas: (opts: { focusId: string | null; zoom: number }) => React.ReactNode;
  title?: string;
  onClose: () => void;
}) {
  const steps = useMemo(() => presentationOrder(diagram), [diagram]);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [presenter, setPresenter] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const clamp = useCallback((n: number) => Math.max(0, Math.min(steps.length - 1, n)), [steps.length]);
  // Any manual move stops autoplay: a deck advancing while the presenter is
  // still talking is worse than no autoplay.
  const go = useCallback((n: number) => { setPlaying(false); setI(clamp(n)); }, [clamp]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setI((cur) => {
        if (cur >= steps.length - 1) { setPlaying(false); return cur; }
        return cur + 1;
      });
    }, 4000);
    return () => clearInterval(t);
  }, [playing, steps.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // RTL note: ArrowLeft advances, because the content reads right-to-left
      // and a presenter's "forward" is toward the direction of reading.
      switch (e.key) {
        case "ArrowLeft": case "PageDown": case " ": e.preventDefault(); go(i + 1); break;
        case "ArrowRight": case "PageUp": e.preventDefault(); go(i - 1); break;
        case "Home": e.preventDefault(); go(0); break;
        case "End": e.preventDefault(); go(steps.length - 1); break;
        case "Escape": e.preventDefault(); onClose(); break;
        case "p": case "P": setPresenter((v) => !v); break;
        case "+": case "=": setZoom((z) => Math.min(3, z + 0.15)); break;
        case "-": setZoom((z) => Math.max(0.5, z - 0.15)); break;
        default: break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go, steps.length, onClose]);

  useEffect(() => { rootRef.current?.focus(); }, []);

  const step = steps[i];
  const pct = steps.length > 1 ? (i / (steps.length - 1)) * 100 : 100;
  const nameOf = (id: string) => diagram.nodes.find((n) => n.id === id)?.label ?? id;

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`מצב מצגת${title ? `: ${title}` : ""}`}
      className="fixed inset-0 z-[90] flex flex-col bg-surface outline-none"
    >
      {/* ------------------------------------------------------------ chrome */}
      <header className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
        <span className="text-[0.8125rem] font-bold text-ink-1">{title || "תרשים תהליך"}</span>
        <span className="tech text-[0.6875rem] text-ink-3">{i + 1} / {steps.length}</span>

        <div className="ms-auto flex items-center gap-1">
          <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.15))} aria-label="הקטן"
            className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><Minus className="size-4" /></button>
          <span className="tech w-10 text-center text-[0.6875rem] text-ink-3">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(3, z + 0.15))} aria-label="הגדל"
            className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><Plus className="size-4" /></button>

          <span className="mx-1 h-4 w-px bg-hairline" />

          <button onClick={() => setPlaying((v) => !v)} aria-pressed={playing}
            aria-label={playing ? "עצור הפעלה אוטומטית" : "הפעלה אוטומטית"}
            className={`rounded-lg p-1.5 transition hover:bg-surface-2 ${playing ? "text-brand" : "text-ink-3 hover:text-ink-1"}`}>
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button onClick={() => setPresenter((v) => !v)} aria-pressed={presenter}
            className={`rounded-lg px-2 py-1.5 text-[11px] font-bold transition hover:bg-surface-2 ${presenter ? "text-brand" : "text-ink-3 hover:text-ink-1"}`}>
            מצב מציג
          </button>
          <button onClick={() => rootRef.current?.requestFullscreen?.()} aria-label="מסך מלא"
            className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><Maximize2 className="size-4" /></button>
          <button onClick={onClose} aria-label="סגור"
            className="rounded-lg p-1.5 text-ink-3 transition hover:bg-surface-2 hover:text-ink-1"><X className="size-4" /></button>
        </div>
      </header>

      {/* progress */}
      <div className="h-[3px] w-full bg-surface-2" role="progressbar"
        aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={steps.length}>
        <div className="h-full bg-brand transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>

      {/* ------------------------------------------------------------ stage */}
      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 items-center justify-center overflow-auto p-6">
          {canvas({ focusId: step?.node.id ?? null, zoom })}
        </div>

        {presenter && step && (
          // Presenter notes: what this step is and where it leads. Deliberately
          // states only what the diagram itself encodes — inventing commentary
          // about an SAP step would put words in the book's mouth.
          <aside className="hidden w-[20rem] shrink-0 border-s border-hairline p-4 lg:block" aria-label="הערות מציג">
            <div className="mb-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-ink-3">
              {SHAPE_HE[step.node.shape] ?? "שלב"}
            </div>
            <h2 className="mb-3 text-[1.0625rem] font-extrabold leading-snug text-ink-1">{step.node.label}</h2>
            {step.prev.length > 0 && (
              <p className="mb-2 text-[0.8125rem] leading-relaxed text-ink-2">
                <span className="text-ink-3">מגיע מ־</span> {step.prev.map(nameOf).join(", ")}
              </p>
            )}
            {step.next.length > 0 && (
              <p className="mb-2 text-[0.8125rem] leading-relaxed text-ink-2">
                <span className="text-ink-3">ממשיך אל־</span> {step.next.map(nameOf).join(", ")}
              </p>
            )}
            {steps[i + 1] && (
              <p className="mt-4 rounded-xl bg-surface-2 px-3 py-2 text-[0.75rem] text-ink-3">
                הבא: {steps[i + 1].node.label}
              </p>
            )}
          </aside>
        )}
      </div>

      {/* ------------------------------------------------------------ footer */}
      <footer className="flex items-center gap-3 border-t border-hairline px-4 py-2.5">
        <button onClick={() => go(i - 1)} disabled={i === 0}
          className="inline-flex items-center gap-1 rounded-xl border border-hairline px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-2 transition hover:text-brand disabled:opacity-40">
          <ChevronRight className="size-4" /> הקודם
        </button>
        <div className="min-w-0 flex-1 truncate text-center text-[0.8125rem] font-semibold text-ink-1">
          {step?.node.label}
        </div>
        <button onClick={() => go(i + 1)} disabled={i >= steps.length - 1}
          className="inline-flex items-center gap-1 rounded-xl border border-hairline px-3 py-1.5 text-[0.8125rem] font-semibold text-ink-2 transition hover:text-brand disabled:opacity-40">
          הבא <ChevronLeft className="size-4" />
        </button>
      </footer>
    </div>
  );
}
