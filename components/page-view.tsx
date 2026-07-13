"use client";

/**
 * Page View — optional paginated reading mode (Phase 13.3 / item 6).
 * CSS multi-column inside a dir="ltr" horizontal-scroll frame (RTL-safe scroll
 * mechanics; text keeps its own dir). Figures/tables/code carry break-inside:
 * avoid so nothing is cut. Chapter select + prev/next + keyboard (← →) + swipe.
 * The scroll reader is untouched; this renders only when Page mode is chosen.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, BookMarked } from "lucide-react";

export function PageView({ chapters, accent, children }: { chapters: { n: number; title: string }[]; accent: string; children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const snapTimer = useRef<number>(0);

  const measure = useCallback(() => {
    const f = frameRef.current; if (!f) return;
    const w = f.clientWidth || 1;
    f.style.setProperty("--pw", `${w}px`);
    requestAnimationFrame(() => {
      const total = Math.max(1, Math.round(f.scrollWidth / w));
      setPages(total);
      setPage((p) => Math.min(p, total - 1));
    });
  }, []);

  useEffect(() => {
    const f = frameRef.current; if (!f) return;
    measure();
    const ro = new ResizeObserver(measure); ro.observe(f);
    window.addEventListener("resize", measure);
    const imgs = Array.from(f.querySelectorAll("img"));
    imgs.forEach((i) => i.addEventListener("load", measure));
    const t = window.setTimeout(measure, 450); // after fonts/images settle
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); imgs.forEach((i) => i.removeEventListener("load", measure)); window.clearTimeout(t); };
  }, [measure]);

  const go = useCallback((p: number) => {
    const f = frameRef.current; if (!f) return;
    const np = Math.min(pages - 1, Math.max(0, p));
    f.scrollTo({ left: np * f.clientWidth, behavior: "smooth" });
    setPage(np);
  }, [pages]);

  // free swipe → snap to nearest page when scrolling settles
  const onScroll = useCallback(() => {
    const f = frameRef.current; if (!f) return;
    const p = Math.round(f.scrollLeft / f.clientWidth);
    setPage(p);
    window.clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      const target = Math.round(f.scrollLeft / f.clientWidth) * f.clientWidth;
      if (Math.abs(f.scrollLeft - target) > 1) f.scrollTo({ left: target, behavior: "smooth" });
    }, 140);
  }, []);

  // keyboard — RTL forward = ArrowLeft
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); go(page + 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(page - 1); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [page, go]);

  const jumpCh = (n: number) => {
    const f = frameRef.current; const el = f?.querySelector<HTMLElement>(`[data-chapter="${n}"]`);
    if (!f || !el) return;
    go(Math.round(el.offsetLeft / f.clientWidth));
  };

  const pagerBtn = "grid size-9 place-items-center rounded-xl border border-hairline bg-surface text-ink-2 transition enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-35";

  return (
    <div>
      {/* page-mode toolbar */}
      <div className="sticky top-[3.5rem] z-30 mb-3 flex flex-wrap items-center gap-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2 shadow-sm backdrop-blur-md">
        <span className="flex items-center gap-1.5 text-xs font-extrabold text-ink-2"><BookMarked className="size-3.5" style={{ color: accent }} /> מצב עמודים</span>
        <select onChange={(e) => jumpCh(Number(e.target.value))} aria-label="קפוץ לפרק" className="max-w-[11rem] rounded-xl border border-hairline bg-surface px-2 py-1.5 text-xs font-bold text-ink-2 outline-none focus:border-brand/40">
          {chapters.map((ch) => <option key={ch.n} value={ch.n}>{ch.n}. {ch.title}</option>)}
        </select>
        <div className="ms-auto flex items-center gap-2">
          <button onClick={() => go(page - 1)} disabled={page === 0} aria-label="עמוד קודם" className={pagerBtn}><ChevronRight className="size-4.5" /></button>
          <span className="min-w-[4.5rem] text-center font-mono text-xs font-bold tabular-nums text-ink-2">{page + 1} / {pages}</span>
          <button onClick={() => go(page + 1)} disabled={page >= pages - 1} aria-label="עמוד הבא" className={pagerBtn}><ChevronLeft className="size-4.5" /></button>
        </div>
      </div>

      {/* paginated frame — ltr for scroll math, inner text keeps its own dir */}
      <div ref={frameRef} dir="ltr" onScroll={onScroll} className="neo-pageframe" style={{ scrollSnapType: "x mandatory" }}>
        <div className="neo-pagecols">{children}</div>
      </div>

      {/* page progress */}
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pages > 1 ? (page / (pages - 1)) * 100 : 100}%`, background: accent }} />
      </div>
      <p className="mt-1.5 text-center text-[11px] text-ink-3">מקשי חצים ↔ · החלקה · או הכפתורים למעבר בין עמודים</p>
    </div>
  );
}
