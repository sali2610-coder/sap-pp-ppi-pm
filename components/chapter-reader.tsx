"use client";

/**
 * Shared chapter renderer for every reference book (book1-7,9,10,11).
 * - Collapsible chapter (keeps #ch-N + #sec-* anchor opening for scroll-spy,
 *   deep-links and exact resume).
 * - Renders sections via the shared SectionSpread (bilingual ‖ hebrew view).
 * - Places every figure INLINE at its logical position: figures are ordered by
 *   source page and dropped in after the section whose page-band contains them
 *   (page-proportional — sections carry no page number in the dataset, so this
 *   is the most confident mapping available). Figures outside the chapter page
 *   range fall to the chapter end and are marked low-confidence via data-figure.
 * - Reuses the premium FigureViewer through onOpenFigure (fullscreen/zoom/pan/
 *   filmstrip/keyboard/download preserved). Numbered captions + source page.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Layers, ZoomIn, Download } from "lucide-react";
import { SectionSpread, type Section } from "@/components/section-spread";
import { usePageMode } from "@/lib/reader-view";
import { playPing } from "@/lib/sound";
import { DUR, EASE } from "@/lib/motion";

export interface ChapterFigure { page: number; file: string; w: number; h: number }
export interface ReaderChapterData { n: number; title: string; pages: number[]; translated?: boolean; sections: Section[] }

/** figure placement: index buckets keyed by the section they render after,
 *  plus a tail for figures that cannot be mapped confidently. */
function placeFigures(ch: ReaderChapterData, ordered: ChapterFigure[]) {
  const start = ch.pages?.[0] ?? 0;
  const end = ch.pages?.[1] ?? 0;
  const span = end >= start && end > 0 ? end - start + 1 : 0;
  const S = Math.max(1, ch.sections.length);
  const buckets: Record<number, number[]> = {};
  const tail: number[] = [];
  ordered.forEach((f, i) => {
    if (span > 0 && f.page >= start && f.page <= end) {
      const si = Math.min(S - 1, Math.max(0, Math.floor(((f.page - start) / span) * S)));
      (buckets[si] ||= []).push(i);
    } else {
      tail.push(i); // outside range / missing page → low confidence
    }
  });
  return { buckets, tail };
}

function InlineFigure({ fig, n, label, confident, onOpen }: { fig: ChapterFigure; n: string; label: string; confident: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  return (
    <figure id={`fig-${n}`} data-figure={label} data-confident={confident ? "1" : "0"} data-lowres={fig.w > 0 && fig.w < 600 ? "1" : "0"} className="reader-figure mx-auto my-6 w-full max-w-2xl"
      /* §10 — never upscale beyond the source's natural width: low-res figures render
         crisp at true size, not stretched to the column width. */
      style={{ maxWidth: fig.w ? `min(42rem, ${fig.w}px)` : undefined }}>
      <button onClick={onOpen} aria-label={`הגדל ${label}`} className="group relative block w-full overflow-hidden rounded-xl border border-border/60 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md" style={{ aspectRatio: `${fig.w} / ${fig.h}` }}>
        {/* skeleton — reserved by aspect-ratio (zero CLS), fades out on decode */}
        {!loaded && <span className="neo-skel absolute inset-0 rounded-xl" aria-hidden />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <motion.img
          layoutId={reduce ? undefined : `figimg-${fig.file}`}
          src={fig.file} alt={`${label} · SAP figure p.${fig.page}`} loading="lazy" width={fig.w} height={fig.h}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 size-full object-contain"
          initial={false} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: DUR.base, ease: EASE.out }}
        />
        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-opacity duration-200 group-hover:bg-slate-900/10 group-hover:opacity-100">
          <span className="grid size-9 place-items-center rounded-full bg-white/90 text-ink-2 shadow-lg"><ZoomIn className="size-4" /></span>
        </span>
      </button>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 px-1 text-[11px] text-muted-foreground">
        <span className="font-bold text-ink-2">{label}</span>
        {fig.w > 0 && fig.w < 600 && <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700" title={`רזולוציית המקור מוגבלת (${fig.w}×${fig.h})`}>מקור ברזולוציה מוגבלת</span>}
        <span dir="ltr" className="text-ink-3">Source p.{fig.page}</span>
        <a href={fig.file} download onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 rounded px-1.5 py-0.5 font-semibold text-brand transition-colors hover:bg-brand-soft"><Download className="size-3" /> הורד</a>
      </figcaption>
    </figure>
  );
}

export function ChapterReader({ ch, figures = [], onOpenFigure, diagram }: { ch: ReaderChapterData; figures?: ChapterFigure[]; onOpenFigure?: (figs: ChapterFigure[], i: number) => void; diagram?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const pageMode = usePageMode();
  // Continuous reading (§3 Mode A) + P0 performance: the chapter is "open" by
  // default (one long scroll) BUT its heavy content (bilingual sections + inline
  // figures) is LAZY-MOUNTED via IntersectionObserver — mounted once when the
  // chapter comes within ~1400px of the viewport and then kept. This is what makes
  // a 500-section / 800-figure book open in <1s instead of mounting everything at
  // once. A reserved-height placeholder keeps the scrollbar + navigation stable,
  // and an explicit jump/hash mounts the target instantly.
  const [open, setOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const secRef = useRef<HTMLElement>(null);
  const render = pageMode || (open && mounted);
  useEffect(() => {
    const openIfHash = () => {
      if (typeof window === "undefined") return;
      const h = window.location.hash;
      if (h === `#ch-${ch.n}`) { setOpen(true); setMounted(true); return; }
      if (h.startsWith("#sec-") && ch.sections.some((s) => `#sec-${s.id}` === h)) { setOpen(true); setMounted(true); }
      if (h.startsWith("#fig-") && figures.length && h.startsWith(`#fig-${ch.n}`)) { setOpen(true); setMounted(true); }
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    // explicit jump (chapter selector / "בעמוד זה") — expand + mount the target now
    const onGoto = (e: Event) => { if (Number((e as CustomEvent).detail) === ch.n) { setOpen(true); setMounted(true); } };
    window.addEventListener("neo:reader:goto", onGoto);
    return () => { window.removeEventListener("hashchange", openIfHash); window.removeEventListener("neo:reader:goto", onGoto); };
  }, [ch.n, ch.sections, figures.length]);

  // lazy-mount when the chapter approaches the viewport (mount once, keep mounted)
  useEffect(() => {
    if (mounted || pageMode) return;
    const el = secRef.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setMounted(true); io.disconnect(); }
    }, { rootMargin: "1400px 0px 1400px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, pageMode]);

  const ordered = [...figures].sort((a, b) => a.page - b.page);
  const { buckets, tail } = placeFigures(ch, ordered);
  const openFig = (i: number) => onOpenFigure?.(ordered, i);
  const estHeight = Math.max(280, ch.sections.length * 300);

  return (
    <section ref={secRef} id={`ch-${ch.n}`} data-chapter={ch.n} className="glass scroll-mt-24 overflow-hidden rounded-2xl">
      <button onClick={() => { if (pageMode) return; playPing(); setOpen((v) => !v); }} className="flex w-full items-center gap-3 p-4 text-start">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-brand-foreground shadow-lg shadow-brand/30"><Layers className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block font-bold">{ch.n}. {ch.title}</span>
          <span className="flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
            <span>pp. {ch.pages[0]}–{ch.pages[1]}</span>
            <span>{ch.sections.length} sections</span>
            {ordered.length > 0 && <span>{ordered.length} figures</span>}
          </span>
        </span>
        <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${ch.translated ? "bg-status-done/15 text-status-done" : "bg-status-in-analysis/15 text-status-in-analysis"}`}>
          {ch.translated ? "EN · עברית" : "EN ✓ · עברית בהכנה"}
        </span>
        {!pageMode && <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />}
      </button>

      {/* reserved-height placeholder while the chapter is open but not yet lazy-mounted */}
      {open && !mounted && !pageMode && (
        <div style={{ minHeight: estHeight }} className="px-3 pb-4" aria-hidden>
          <div className="neo-skel h-full min-h-[280px] rounded-xl" />
        </div>
      )}

      <AnimatePresence initial={false}>
        {render && (
          <motion.div initial={false} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={reduce ? { duration: 0 } : { height: { duration: DUR.base, ease: EASE.out }, opacity: { duration: DUR.fast, ease: EASE.out } }} className="overflow-hidden px-3 pb-4">
            {diagram}
            <div className="paper relative rounded-xl p-4 sm:p-6">
              {ch.sections.map((s, si) => (
                <div key={s.id}>
                  <SectionSpread s={s} />
                  {(buckets[si] || []).map((i) => (
                    <InlineFigure key={i} fig={ordered[i]} n={`${ch.n}-${i + 1}`} label={`איור ${ch.n}.${i + 1}`} confident onOpen={() => openFig(i)} />
                  ))}
                </div>
              ))}
              {tail.map((i) => (
                <InlineFigure key={i} fig={ordered[i]} n={`${ch.n}-${i + 1}`} label={`איור ${ch.n}.${i + 1}`} confident={false} onOpen={() => openFig(i)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
